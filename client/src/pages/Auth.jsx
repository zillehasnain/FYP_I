import React, { useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import {
  Float,
  MeshDistortMaterial,
  PerspectiveCamera,
  Points,
  PointMaterial,
  TorusKnot,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from 'axios'; // Added axios
import * as THREE from "three";

// 3D Background - Particles and Core
const Scene3D = ({ isLogin, transitioning }) => {
  const [points] = useState(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  });

  useFrame((state) => {
    const targetZ = transitioning ? 15 : 5;
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <Points positions={points}>
        <PointMaterial
          transparent
          color={isLogin ? "#00ff88" : "#0088ff"}
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

      <Float speed={3} rotationIntensity={2}>
        <TorusKnot args={[1.5, 0.4, 128, 32]} scale={transitioning ? 0.5 : 1}>
          <MeshDistortMaterial
            color={isLogin ? "#00ff88" : "#0088ff"}
            speed={4}
            distort={0.4}
            wireframe
            emissive={isLogin ? "#00ff88" : "#0088ff"}
            emissiveIntensity={1.5}
          />
        </TorusKnot>
      </Float>
    </group>
  );
};

const Auth = () => {
  const API_URL = import.meta.env.VITE_API_URL || "https://brandburst.azurewebsites.net";
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  // States for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle switching between Login and Signup
  const handleSwitch = () => {
    setTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setTransitioning(false);
    }, 800);
  };

  // Logic for Login (Inbound)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", { email, password });
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      console.log("Login response:", res.data);
      localStorage.setItem('user', JSON.stringify(res.data.user)); 
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
      window.location.reload(); 
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("System Error: " + (err.response?.data?.error || "Connection failed. Is the server running on port 5001?"));
    }
  };

  // Logic for Register (Registry)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting register with:", { username, email, password });
      await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
      alert("Registry Successful. Please login now.");
      handleSwitch(); // Switch to login mode
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      alert("Protocol Error: " + (err.response?.data?.error || "Connection failed. Is the server running on port 5001?"));
    }
  };

  // Warp Animation on Page Load
  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => setTransitioning(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#020202] overflow-hidden relative selection:bg-emerald-500/30 font-sans">
      
      {/* 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
          <Scene3D isLogin={isLogin} transitioning={transitioning} />
          <Suspense fallback={null}>
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
              <Scanline opacity={0.1} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* UI OVERLAY */}
      <div className={`relative z-10 h-full flex flex-col p-12 transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}>
        
        {/* HEADER */}
        <header className="flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-4">
            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-emerald-500 transition-all text-white">
              ←
            </div>
            <span className="text-xs tracking-[0.5em] font-black text-gray-500 group-hover:text-white transition-colors uppercase">
              Return to Hub
            </span>
          </Link>

          <button onClick={handleSwitch} className="text-right outline-none">
            <p className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase">
              Current Protocol
            </p>
            <h2 className="text-xl font-black text-white hover:text-emerald-400 transition-colors uppercase italic">
              {isLogin ? "Switch: Create ID" : "Switch: Access Vault"}
            </h2>
          </button>
        </header>

        {/* MAIN FORM */}
        <main className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateY: -90 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg"
            >
              <form 
                onSubmit={isLogin ? handleLogin : handleRegister}
                className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[30px] md:rounded-[50px] shadow-2xl"
              >
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 uppercase italic">
                  {isLogin ? "Inbound" : "Registry"}
                </h3>
                <p className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-12">
                  {isLogin ? "Identity sync required" : "Initialize brand protocol"}
                </p>

                <div className="space-y-10">
                  {!isLogin && (
                    <div className="relative group">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="peer w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-blue-400 transition-all"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-2 text-gray-500 text-xs tracking-widest uppercase pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-blue-400">
                        User Name
                      </label>
                    </div>
                  )}
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="peer w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-emerald-400 transition-all"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-2 text-gray-500 text-xs tracking-widest uppercase pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-emerald-400">
                      Email
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="peer w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-emerald-400 transition-all"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-2 text-gray-500 text-xs tracking-widest uppercase pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-emerald-400">
                      Password
                    </label>
                  </div>

                  <button type="submit" className="w-full group relative py-6 bg-white text-black font-black uppercase tracking-widest text-sm overflow-hidden rounded-xl outline-none">
                    <div className={`absolute inset-0 ${isLogin ? "bg-emerald-500" : "bg-blue-500"} translate-y-full group-hover:translate-y-0 transition-transform duration-300`}></div>
                    <span className="relative z-10">
                      {isLogin ? "Execute Login Sequence" : "Establish Protocol"}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <footer className="flex justify-between items-end">
          <div className="text-gray-700 text-[10px] font-bold tracking-[0.2em] leading-relaxed">
            SYSTEM: BRANDBURST V1.0
            <br />
            LOC: PAKISTAN_REGION
            <br />
            STATUS: ENCRYPTED
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/30"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/10"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Auth;