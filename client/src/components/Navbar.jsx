import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, LayoutDashboard, Info, Home as HomeIcon, 
  Zap, Star, Terminal, Box, ShieldAlert 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Navigation Links
  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon size={16} /> },
    { name: "Nexus", path: "/nexus", icon: <Box size={16} /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Star size={16} /> },
    {/* { name: "Intel Hub", path: "/intel", icon: <Terminal size={16} /> }, */},
    { name: "The Protocol", path: "/about", icon: <Info size={16} /> },
    { name: "My Vault", path: "/dashboard", icon: <LayoutDashboard size={16} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex justify-between items-center">
        
        {/* --- LOGO --- */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap size={18} fill="black" stroke="black" />
          </div>
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-xl md:text-2xl font-black italic tracking-tighter bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
          >
            BRANDBURST
          </motion.h1>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:text-emerald-400 flex items-center gap-2 ${
                location.pathname === link.path ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <span className="opacity-50">{link.icon}</span>
              {link.name}
            </Link>
          ))}
          
          {/* ONLY VISIBLE IF LOGGED IN AS ADMIN */}
          {user?.role === 'admin' && (
            <Link to="/admin-overlord" className="flex items-center gap-2 text-emerald-400 font-black hover:text-white transition-all">
              <ShieldAlert size={16} className="animate-pulse" /> 
              <span className="text-[9px] tracking-widest uppercase">Overlord</span>
            </Link>
          )}
          
          <Link to="/auth">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-2"
            >
              Access Vault
            </motion.button>
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-[#080808] border-b border-white/10 overflow-hidden lg:hidden shadow-2xl"
          >
            <div className="flex flex-col p-10 gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-black italic uppercase tracking-widest flex items-center gap-6 ${
                    location.pathname === link.path ? 'text-emerald-400' : 'text-white'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${location.pathname === link.path ? 'bg-emerald-500 text-black' : 'bg-white/5 text-emerald-500'}`}>
                    {link.icon}
                  </div>
                  {link.name}
                </Link>
              ))}
              
              {/* ONLY VISIBLE IF LOGGED IN AS ADMIN */}
              {user?.role === 'admin' && (
                <Link to="/admin-overlord" onClick={() => setIsOpen(false)} className="flex items-center gap-6 text-emerald-400 font-black uppercase tracking-widest">
                  <div className="p-3 rounded-xl bg-white/5 text-emerald-500">
                    <ShieldAlert size={20} className="animate-pulse" />
                  </div>
                  <span>Overlord</span>
                </Link>
              )}
              
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-emerald-500 text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-lg shadow-emerald-500/20">
                  EXECUTE LOGIN
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;