import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Timer, ChevronRight, Trophy, Zap, ShieldCheck, X, AlertCircle } from 'lucide-react';
import axios from 'axios';

// 3D Background that reacts to the brand color
const QuizBackground = ({ color }) => (
  <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color={color} intensity={2} />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial color={color} speed={3} distort={0.4} wireframe />
          </Sphere>
        </Float>
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  </div>
);

const QuizRoom = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [maxDiscount, setMaxDiscount] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [finalCalculatedDiscount, setFinalCalculatedDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  
  //must be logged in to access quiz room
  useEffect(() => {
  const user = localStorage.getItem('user');
  if (!user) {
    alert("Protocol Error: You must be logged in to claim rewards.");
    navigate('/auth');
  }
}, [navigate]);

  // Brand Theme Config
  const themes = {
    nexus: { color: "#3b82f6", bg: "bg-blue-500", border: "border-blue-500/30" },
    aura: { color: "#f59e0b", bg: "bg-amber-500", border: "border-amber-500/30" },
    zest: { color: "#f97316", bg: "bg-orange-500", border: "border-orange-500/30" },
    velo: { color: "#10b981", bg: "bg-emerald-500", border: "border-emerald-500/30" },
    default: { color: "#10b981", bg: "bg-emerald-500", border: "border-emerald-500/30" }
  };
  const theme = themes[brandId] || themes.default;

  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchBrandQuiz = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/brands/${brandId}`);
        setQuizData(res.data.quizzes);
        setMaxDiscount(res.data.maxDiscount);
      } catch (err) {
        console.error("Transmission Error");
      }
    };
    fetchBrandQuiz();
  }, [brandId, API_URL]);

  useEffect(() => {
    if (timeLeft > 0 && !showReward) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showReward) {
      // Auto-submit when time expires (counts as incorrect for current question)
      alert("Time's up! Quiz auto-submitted.");
      processAnswer(-1); // -1 means none of the options match (incorrect)
    }
  }, [timeLeft, showReward]);

  // CORE LOGIC: Calculate discount based on correct answers
  const processAnswer = async (selectedIndex) => {
    let newCorrectCount = correctCount;
    
    // Check if the selected answer is correct
    if (selectedIndex === quizData[currentQuestion].correctAnswer) {
      newCorrectCount += 1;
      setCorrectCount(newCorrectCount);
    }

    // Move to next question or submit quiz
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Final question answered - calculate and save loot
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        alert("Session Expired. Please login to claim loot.");
        navigate('/auth');
        return;
      }

      try {
        // CALCULATION: (Correct Answers / Total Questions) * Max Discount
        const totalQuestions = quizData.length;
        const earnedDiscount = (newCorrectCount / totalQuestions) * maxDiscount;
        const roundedDiscount = earnedDiscount.toFixed(1); // e.g. 7.5
        const discountString = `${roundedDiscount}% OFF`;
        
        setFinalCalculatedDiscount(discountString);

        // Save to backend
        const response = await axios.post(`${API_URL}/api/user/save-loot`, {
          userId: user.id,
          brandId: brandId,
          discountAmount: discountString,
          color: theme.color
        });

        setGeneratedCode(response.data.voucher.code);
        setShowReward(true);
      } catch (err) {
        console.error("Transmission Error:", err);
        alert("Failed to generate voucher. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (quizData.length === 0) {
    return <div className="h-screen bg-black flex items-center justify-center text-emerald-500 font-black animate-pulse uppercase tracking-[1em]">Establishing Link...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col font-sans relative overflow-hidden">
      <QuizBackground color={theme.color} />

      {/* NAV BAR */}
      <nav className="relative z-10 flex justify-between items-center p-6 md:p-10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-black ${theme.bg}`}>
            {currentQuestion + 1}
          </div>
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter">{brandId} CHALLENGE</h2>
            <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.4em]">Protocol Node Active</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Time Left</span>
            <div className={`font-black italic flex items-center gap-2 ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
              <Timer size={14} /> 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          </div>
          <Link to="/" className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
            <X size={18} />
          </Link>
        </div>
      </nav>

      {/* QUIZ CORE */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {!showReward ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`w-full max-w-3xl bg-black/40 backdrop-blur-3xl border ${theme.border} p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl`}
            >
              <div className="w-full bg-white/5 h-1 rounded-full mb-12 overflow-hidden">
                <motion.div 
                   className={`h-full ${theme.bg}`}
                   initial={{ width: 0 }}
                   animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                />
              </div>

              <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-12 leading-tight">
                {quizData[currentQuestion].q}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizData[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => processAnswer(i)}
                    disabled={isLoading}
                    className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all text-left"
                  >
                    <span className="text-lg font-bold">{opt}</span>
                    <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* REWARD REVEAL */
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-5xl font-black italic mb-4">VAULT DECRYPTED</h2>
              
              <div className="flex justify-center gap-12 mb-10">
                  <div className="text-center border-r border-white/10 pr-12">
                      <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Accuracy</p>
                      <p className="text-4xl font-black italic">{((correctCount / quizData.length) * 100).toFixed(0)}%</p>
                  </div>
                  <div className="text-center">
                      <p className="text-[10px] text-emerald-500 uppercase font-black mb-1">Earned Loot</p>
                      <p className="text-4xl font-black italic text-emerald-500">{finalCalculatedDiscount}</p>
                  </div>
              </div>

              {/* The Voucher Card */}
              <div className="p-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-[40px] mb-12">
                  <div className="bg-black p-10 rounded-[38px] border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase mb-2">Unique Access Token</p>
                      <code className="text-3xl font-mono font-black text-white">{generatedCode}</code>
                  </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link to="/dashboard">
                  <button className={`px-10 py-4 ${theme.bg} text-black font-black uppercase italic rounded-full hover:scale-110 transition-transform`}>
                    Go to Vault
                  </button>
                </Link>
                <Link to="/">
                   <button className="px-10 py-4 border border-white/10 font-black uppercase rounded-full hover:bg-white hover:text-black transition-all">Hub</button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* TERMINAL FOOTER */}
      <footer className="p-10 flex justify-between items-end opacity-20 pointer-events-none">
        <div className="text-[8px] font-black uppercase tracking-[0.4em] leading-relaxed">
          Security: SSL_ENCRYPTED<br />
          System Region: PK_SOUTH_01
        </div>
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">BrandBurst</h1>
      </footer>
    </div>
  );
};

export default QuizRoom;