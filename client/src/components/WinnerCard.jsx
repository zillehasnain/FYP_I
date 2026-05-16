 import React from 'react';
import { motion } from 'framer-motion';

const WinnerCard = ({ name, brand, prize }) => (
  <motion.div 
    initial={{ x: 50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    className="bg-black text-white p-6 rounded-[30px] flex flex-col min-w-[220px] shadow-2xl border border-white/10"
  >
    <span className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mb-2">{brand}</span>
    <span className="text-2xl font-black italic mb-1">{prize}</span>
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Won by {name}</span>
    </div>
  </motion.div>
);

export default WinnerCard;