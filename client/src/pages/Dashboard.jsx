import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Gift, Clock, ExternalLink, ArrowLeft, X, ShieldCheck, User, Mail, Database } from 'lucide-react';
import Voucher3D from '../components/Voucher3D';
import VaultBG from '../components/VaultBG';
import axios from 'axios';

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [myVouchers, setMyVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    const fetchVaultData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        navigate('/auth');
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/user/dashboard/${storedUser.id}`);
        setMyVouchers(res.data.vouchers);
        setUserProfile(res.data);
      } catch (err) {
        console.error("Vault Connection Failure");
      }
    };
    fetchVaultData();
  }, [navigate, API_URL]);

  if (!userProfile) return <div className="h-screen bg-black flex items-center justify-center text-emerald-500 font-black italic animate-pulse">DECRYPTING VAULT...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans relative overflow-x-hidden">
      
      {/* 1. 3D BACKGROUND */}
      <VaultBG />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-center mb-16">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Exit to Hub</span>
          </Link>
          <div className="text-right">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Vault </h2>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.4em]">Region: Pakistan_Core</p>
          </div>
        </header>

        {/* --- UPDATED IDENTITY DETAILS --- */}
        <div className="flex-1 text-center md:text-left z-10 mb-16">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-3 block italic">
            Authorized Identity Node
          </span>
          
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
            {userProfile.username}
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {/* 1. PULSING STATUS MESSAGE */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 rounded-xl backdrop-blur-md group hover:bg-emerald-500/20 transition-all"
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              </div>
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                System: Connected & Stable
              </span>
            </motion.div>

            {/* 2. ENCRYPTED SECURITY LEVEL */}
            <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-5 py-2.5 rounded-xl backdrop-blur-md group hover:bg-blue-500/20 transition-all">
              <ShieldCheck size={14} className="text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">
                Clearance: Elite User
              </span>
            </div>

            {/* 3. TERMINAL STYLE ID (Beneath or alongside) */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl group hover:border-white/20 transition-all">
              <Database size={14} className="text-gray-500" />
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.2em]">
                Node_ID: {userProfile._id?.slice(-12).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
       
        <div className="flex gap-6 mb-16">
          {/* Points Card */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-emerald-500 rounded-[40px] p-10 flex flex-col justify-center items-center text-black flex-1"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2">Total Intelligence Score</span>
            <h2 className="text-7xl font-black italic tracking-tighter leading-none mb-4">{userProfile.points}</h2>
            <div className="flex items-center gap-2 bg-black/10 px-4 py-1 rounded-full font-bold text-[10px] uppercase">
               <Clock size={12} /> Points Synced
            </div>
          </motion.div>
        </div>

        {/* --- VOUCHER GRID --- */}
        <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
          <h3 className="text-xl font-black italic uppercase tracking-[0.2em] flex items-center gap-3">
              <Gift className="text-emerald-500" size={24} /> My Digital Loot
          </h3>
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{myVouchers.length} Nodes Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {myVouchers.length > 0 ? (
            myVouchers.map((v, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="relative p-[1px] rounded-[35px] bg-gradient-to-br from-white/20 to-transparent border border-white/10 overflow-hidden group shadow-2xl"
              >
                <div className="bg-[#080808] p-8 rounded-[34px] h-full flex flex-col justify-between backdrop-blur-md">
                   <div>
                      <div className="flex justify-between items-start mb-6">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400`}>{v.brand}</span>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                      </div>
                      <h4 className="text-4xl font-black italic mb-2 tracking-tighter uppercase">{v.discount}</h4>
                      <p className="text-gray-600 text-[10px] font-mono tracking-[0.2em] mb-10 opacity-50">{v.code}</p>
                   </div>
                   
                   <button 
                     onClick={() => setSelectedVoucher(v)}
                     className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black text-white transition-all flex items-center justify-center gap-2"
                   >
                     Redeem Asset <ExternalLink size={12} />
                   </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[40px] opacity-40">
               <p className="text-xs font-black uppercase tracking-[0.5em]">No loot detected in vault. Play a quiz to earn rewards.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- REDEMPTION MODAL --- */}
      <AnimatePresence>
        {selectedVoucher && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4"
          >
            <div className="max-w-4xl w-full relative flex flex-col items-center">
                <button 
                  onClick={() => setSelectedVoucher(null)}
                  className="absolute -top-12 md:top-0 right-0 text-white/40 hover:text-white transition-all"
                >
                  <X size={32} />
                </button>
                <div className="text-center mb-6">
                  <ShieldCheck className="mx-auto text-emerald-500 mb-4" size={40} />
                  <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Verified Loot</h2>
                </div>
                <Voucher3D 
                    code={selectedVoucher.code} 
                    brand={selectedVoucher.brand} 
                    color="#10b981" 
                />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;