// src/components/BrandCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BrandCard = ({ id, name, tag, img, accent }) => (
  <Link to={`/quiz/${id}`}>
    <motion.div
      whileHover={{ y: -15 }}
      className={`group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 bg-black cursor-pointer transition-all duration-700 hover:shadow-2xl`}
    >
      <img src={img} className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white z-10">
        <div className="w-10 h-[2px] bg-emerald-500 mb-6" />
        <h4 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">{name}</h4>
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500 group-hover:text-white">{tag}</p>
      </div>
    </motion.div>
  </Link>
);

export default BrandCard;