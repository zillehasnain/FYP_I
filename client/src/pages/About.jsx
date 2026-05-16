import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Users, Globe, ArrowRight, Cpu, Database, Code } from 'lucide-react';

// 3D Background - The "Network Core"
const About3D = () => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={1} />
    <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshDistortMaterial
          color="#10b981"
          speed={3}
          distort={0.4}
          wireframe
          emissive="#10b981"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
  </Canvas>
);

const About = () => {
  const stats = [
    { label: "Partner Nodes", val: "50+", icon: <Globe size={20} /> },
    { label: "Active Quizzers", val: "100k+", icon: <Users size={20} /> },
    { label: "Rewards Issued", val: "500k", icon: <Zap size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- SECTION 1: HERO --- */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center p-6">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <About3D />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10"
        >
          <span className="text-emerald-500 font-black tracking-[0.6em] text-[10px] uppercase mb-6 block italic">System Intelligence // About Us</span>
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase mb-6 leading-none">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">PROTOCOL</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg tracking-[0.2em] leading-relaxed uppercase font-bold px-4">
            Revolutionizing brand engagement in Pakistan through immersive 3D technology and gamified rewards.
          </p>
        </motion.div>
        
        <div className="absolute bottom-10 animate-bounce opacity-20">
            <p className="text-[8px] font-black tracking-[0.5em] text-white uppercase italic">Scroll to decrypt</p>
        </div>
      </section>

      {/* --- SECTION 2: MISSION --- */}
      <section className="py-40 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black italic mb-8 uppercase tracking-tighter">Our Mission</h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 font-medium">
              In a world of static advertisements, <span className="text-white font-black italic">BrandBurst</span> was built to reward the curious. We believe that brand loyalty shouldn't be bought—it should be earned through interaction.
            </p>
            <p className="text-gray-500 text-base leading-relaxed tracking-wide">
              Based in Pakistan, we connect futuristic partner nodes like <span className="text-blue-400 italic font-bold">Nexus</span> and <span className="text-amber-500 italic font-bold">Aura</span> with users who value speed, intelligence, and exclusive digital loot.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 20, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="bg-white/[0.02] border border-white/10 p-10 rounded-[40px] flex items-center justify-between group transition-all duration-500"
              >
                <div className="flex items-center gap-8">
                  <div className="text-emerald-500 scale-125">{stat.icon}</div>
                  <div>
                    <h4 className="text-4xl font-black italic mb-1">{stat.val}</h4>
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">{stat.label}</p>
                  </div>
                </div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-emerald-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TECHNOLOGY (THE MERN STACK) --- */}
      <section className="py-40 bg-white text-black text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-10 uppercase">Engineered for Speed</h2>
          <p className="max-w-4xl mx-auto font-bold text-sm md:text-lg uppercase tracking-widest leading-loose mb-20 opacity-60">
            Our architecture uses a high-performance MERN stack. MongoDB Atlas for secure data vaulting, React for immersive 3D rendering, and Node.js for real-time voucher processing.
          </p>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
              {[
                { name: "MongoDB", icon: <Database size={30}/> },
                { name: "Express", icon: <ShieldCheck size={30}/> },
                { name: "React", icon: <Code size={30}/> },
                { name: "Node.js", icon: <Cpu size={30}/> }
              ].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 group">
                      <div className="p-6 rounded-full border-2 border-black/5 group-hover:bg-black group-hover:text-white transition-all">
                        {tech.icon}
                      </div>
                      <span className="text-xs font-black tracking-[0.4em] uppercase">{tech.name}</span>
                  </div>
              ))}
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 4: THE CALL TO ACTION --- */}
      <section className="py-60 px-6 text-center relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-[20vw] font-black italic pointer-events-none uppercase">
          JOIN_US
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative z-10"
        >
          <ShieldCheck size={80} className="mx-auto mb-12 text-emerald-500" strokeWidth={1} />
          <h3 className="text-5xl md:text-7xl font-black italic mb-8 uppercase tracking-tighter">Ready to join the network?</h3>
          <p className="text-gray-600 uppercase tracking-[0.5em] font-bold text-xs mb-16">Establishing secure link to Pakistan node...</p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <Link to="/auth">
                  <button className="px-12 py-6 bg-emerald-500 text-black font-black uppercase italic tracking-[0.2em] text-sm rounded-2xl hover:scale-110 transition-transform shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                      Sync Identity
                  </button>
              </Link>
              <Link to="/" className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-2">
                  Return to Hub
              </Link>
          </div>
        </motion.div>
      </section>

      {/* --- FINAL FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-[9px] text-gray-800 font-black tracking-[2em] uppercase">
           BrandBurst Protocol // All Rights Reserved // 2024
         </p>
      </footer>
    </div>
  );
};

export default About;