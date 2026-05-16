import React from 'react';

const StatBox = ({ label, val, icon, colorClass = "text-emerald-500" }) => (
  <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[30px] flex items-center justify-between hover:bg-white/[0.05] transition-all group">
    <div>
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-3xl font-black italic">{val}</h4>
    </div>
    <div className={`${colorClass} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
  </div>
);

export default StatBox;