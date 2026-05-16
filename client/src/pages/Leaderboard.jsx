import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trophy, Crown, Star, ShieldCheck, TrendingUp } from "lucide-react";
import RankAvatar from "../components/RankAvatar";

const Leaderboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/leaderboard`);
        setPlayers(res.data);
      } catch (err) {
        console.error("Leaderboard Offline");
      }
    };
    fetchLeaderboard();
  }, [API_URL]);

  const rankColors = ["#fbbf24", "#94a3b8", "#cd7f32"]; // Gold, Silver, Bronze

  // Only take the Top 3 for the Podium
  const topThree = players.slice(0, 3);
  // Reorder them so Rank 1 is in the center [Rank 2, Rank 1, Rank 3]
  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-4">
            Hall of Fame
          </h1>
          <div className="flex items-center justify-center gap-3 mb-20">
            <TrendingUp className="text-emerald-500" size={18} />
            <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px]">
              Real-time Global Rankings
            </p>
          </div>
        </motion.div>

        {/* --- THE PODIUM SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-end justify-center gap-4 max-w-5xl mx-auto mb-32 h-fit md:h-[650px] relative">
          {/* RANK 2 (Left) */}
          {players[1] && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center group"
            >
              <RankAvatar color="#94a3b8" />
              <div className="w-full bg-white/[0.05] border-t-4 border-slate-400 h-[220px] rounded-t-[40px] flex flex-col items-center pt-8 px-4 shadow-2xl">
                <span className="text-4xl font-black italic opacity-10 mb-2">
                  02
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight truncate w-full text-center">
                  {players[1].username}
                </h3>
                <p className="mt-2 text-emerald-500 font-bold text-[10px] tracking-widest">
                  {players[1].points} PTS
                </p>
              </div>
            </motion.div>
          )}

          {/* RANK 1 (Center - The Tallest) */}
          {players[0] && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center relative z-20 group"
            >
              {/* UNIT: CROWN + DIAMOND GROUPED TOGETHER */}
              <div className="relative mb-[-20px] flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-10 z-30" // Pulls crown closer to the diamond
                >
                  <Crown
                    className="text-yellow-400 drop-shadow-[0_0_15px_#fbbf24]"
                    size={50}
                  />
                </motion.div>

                <RankAvatar color="#fbbf24" size="large" />
              </div>

              {/* PODIUM BASE */}
              <div className="w-full bg-gradient-to-b from-white/[0.12] to-transparent border-t-4 border-yellow-400 h-[320px] rounded-t-[60px] flex flex-col items-center pt-10 px-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <span className="text-5xl font-black italic opacity-10 mb-2 leading-none">
                  01
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tighter truncate w-full text-center">
                  {players[0].username}
                </h3>
                <div className="mt-4 bg-emerald-500 text-black px-5 py-1.5 rounded-full font-black text-[10px] shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  {players[0].points} PTS
                </div>
              </div>
            </motion.div>
          )}
          {/* RANK 3 (Right) */}
          {players[2] && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center group"
            >
              <RankAvatar color="#cd7f32" />
              <div className="w-full bg-white/[0.05] border-t-4 border-orange-700 h-[180px] rounded-t-[40px] flex flex-col items-center pt-8 px-4 shadow-2xl">
                <span className="text-4xl font-black italic opacity-10 mb-2">
                  03
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight truncate w-full text-center">
                  {players[2].username}
                </h3>
                <p className="mt-2 text-emerald-500 font-bold text-[10px] tracking-widest">
                  {players[2].points} PTS
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* --- THE REMAINING LIST (Ranks 4-10) --- */}
        <div className="bg-white/[0.02] rounded-[40px] border border-white/10 overflow-hidden max-w-4xl mx-auto shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-white/[0.03] flex justify-between px-10">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic">
              Protocol / Identity
            </span>
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic">
              Calculated Score
            </span>
          </div>

          {players.slice(3).map((player, i) => (
            <motion.div
              key={player._id}
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="flex justify-between items-center p-8 border-b border-white/5 transition-all group"
            >
              <div className="flex items-center gap-8 text-left">
                <span className="text-2xl font-black italic text-gray-800 group-hover:text-gray-600 w-10 transition-colors">
                  0{i + 4}
                </span>
                <div>
                  <h4 className="font-black uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                    {player.username}
                  </h4>
                  <div className="flex items-center gap-2 text-[8px] text-gray-600 font-bold uppercase tracking-widest">
                    <ShieldCheck size={10} /> Sync_Verified
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black italic tracking-tighter text-white group-hover:text-emerald-500 transition-colors">
                  {player.points}
                </span>
                <span className="text-[10px] text-gray-600 uppercase font-black ml-2">
                  PTS
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SYSTEM FOOTER */}
        <div className="mt-32 py-10 border-t border-white/5 opacity-30">
          <p className="text-[9px] font-black tracking-[1.2em] uppercase leading-loose text-gray-500">
            Network: Pakistan_Core // Secure_Link_Stable
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
