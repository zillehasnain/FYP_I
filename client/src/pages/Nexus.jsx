import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Box, Shirt, Cpu, Coffee, Zap } from 'lucide-react';
import BrandCard from '../components/BrandCard';

const Nexus = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    // The categories you select in Admin
    const categories = [
        { name: "All", icon: <Box size={16}/> },
        { name: "Fashion Node", icon: <Shirt size={16}/> },
        { name: "Cyber Node", icon: <Cpu size={16}/> },
        { name: "Fuel Node", icon: <Coffee size={16}/> },
        { name: "Gear Node", icon: <Zap size={16}/> }
    ];

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/brands`);
                setBrands(res.data);
            } catch (err) {
                console.error("Database connection failed");
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, [API_URL]);

    // Logic: Filter by Category AND Search Name
    const filteredBrands = brands.filter(b => {
        const matchesFilter = activeFilter === "All" || b.category === activeFilter;
        const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col md:flex-row pt-20">
            
            {/* --- SIDEBAR --- */}
            <aside className="w-full md:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-black/40 backdrop-blur-xl">
                <div>
                    <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase mb-8 italic">System Filters</h2>
                    <div className="space-y-3">
                        {categories.map(cat => (
                            <button 
                                key={cat.name}
                                onClick={() => setActiveFilter(cat.name)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeFilter === cat.name 
                                    ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                                    : 'bg-white/5 text-gray-500 hover:bg-white/10'
                                }`}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-[8px] font-black text-emerald-500/50 uppercase tracking-[0.3em] mb-2">Protocol Status</p>
                    <p className="text-xs font-bold italic">Nexus Link: 100% Stable</p>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 p-8 md:p-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
                    <div>
                        <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-2">The Nexus</h1>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">Active Partner Directory</p>
                    </div>

                    {/* GLITCH SEARCH BAR */}
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="SEARCH NODES..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-full py-5 pl-14 pr-8 outline-none focus:border-emerald-500 transition-all uppercase text-[10px] font-black tracking-widest"
                        />
                    </div>
                </div>

                {/* --- BRAND GRID --- */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="aspect-[4/5] bg-white/5 rounded-[40px] animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredBrands.length > 0 ? (
                                filteredBrands.map((brand) => (
                                    <motion.div
                                        key={brand._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <BrandCard 
                                            id={brand.brandId}
                                            name={brand.name}
                                            tag={brand.category}
                                            img={brand.image}
                                            accent={brand.accentColor}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-40 text-center border border-dashed border-white/5 rounded-[50px]">
                                    <p className="text-gray-600 font-black italic tracking-[0.5em] uppercase">No Nodes Detected In This Category</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Nexus;