import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#010101] pt-40 pb-20 border-t border-white/5 px-6 md:px-10 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
      
      {/* Large Stats */}
      <div className="text-center md:text-left">
        <h4 className="text-8xl md:text-[10rem] font-black italic text-emerald-500 leading-none mb-4">50K+</h4>
        <p className="text-gray-600 tracking-[0.5em] uppercase font-black text-xs">Vouchers Distributed in Pakistan</p>
      </div>

      {/* System Security Info */}
      <div className="flex flex-col items-center md:items-end text-center md:text-right">
        <Shield className="text-emerald-500 mb-6" size={50} strokeWidth={1} />
        <h5 className="text-xl font-black italic mb-4 uppercase tracking-tighter">Secure Vault Protocol</h5>
        
        {/* PK SOUTH moved to next line using <br /> */}
        <p className="text-gray-600 text-[10px] mb-8 uppercase font-black tracking-[0.2em] leading-loose">
          End-to-End Encryption Enabled <br /> 
          System Region: PK_SOUTH_01
        </p>

        <Link to="/auth">
          <button className="flex items-center gap-4 px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-emerald-500 transition-all shadow-xl active:scale-95">
            Sync My Identity <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>

    {/* Bottom Copyright */}
    <div className="mt-40 text-center border-t border-white/5 pt-10">
      <p className="text-[9px] text-gray-800 font-black tracking-[1.5em] uppercase">
        BrandBurst // Future Node // 2024
      </p>
    </div>
  </footer>
);

export default Footer;