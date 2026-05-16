import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, Plus, Trash2, Edit3, CheckCircle2, Percent, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [allBrands, setAllBrands] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [brandData, setBrandData] = useState({
        name: '', brandId: '', category: 'Fashion Node', accentColor: '#10b981',
        image: '', maxDiscount: 15,
        quizzes: [{ q: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });

    useEffect(() => { fetchBrands(); }, []);

    const fetchBrands = async () => {
        const res = await axios.get(`${API_URL}/api/brands`);
        setAllBrands(res.data);
    };

    // --- DYNAMIC QUIZ LOGIC ---

    const addQuestion = () => {
        // FORCE LIMIT: 10 Questions
        if (brandData.quizzes.length < 10) {
            setBrandData({
                ...brandData,
                quizzes: [...brandData.quizzes, { q: '', options: ['', '', '', ''], correctAnswer: 0 }]
            });
        } else {
            alert("PROTOCOL LIMIT: A brand cannot have more than 10 question nodes.");
        }
    };

    const removeQuestion = (index) => {
        if (brandData.quizzes.length > 1) {
            const updatedQuizzes = brandData.quizzes.filter((_, i) => i !== index);
            setBrandData({ ...brandData, quizzes: updatedQuizzes });
        }
    };

    const updateQuizField = (qIndex, field, value, optIndex = null) => {
        const updatedQuizzes = [...brandData.quizzes];
        if (field === 'q') updatedQuizzes[qIndex].q = value;
        else if (field === 'option') updatedQuizzes[qIndex].options[optIndex] = value;
        else if (field === 'correctAnswer') updatedQuizzes[qIndex].correctAnswer = value;
        setBrandData({ ...brandData, quizzes: updatedQuizzes });
    };

    const handleAction = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/api/admin/update-brand/${isEditing}`, brandData);
                alert("PROTOCOL UPDATED: Node Reconfigured.");
            } else {
                await axios.post(`${API_URL}/api/admin/add-brand`, brandData);
                alert("PROTOCOL DEPLOYED: New Node Live.");
            }
            setIsEditing(null);
            resetForm();
            fetchBrands();
        } catch (err) { alert("Deployment Error"); }
    };

    const resetForm = () => {
        setBrandData({ name: '', brandId: '', category: 'Fashion Node', accentColor: '#10b981', image: '', maxDiscount: 15, quizzes: [{ q: '', options: ['', '', '', ''], correctAnswer: 0 }] });
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 text-emerald-500 mb-12">
                    <ShieldAlert size={40} />
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase">Overlord Panel</h1>
                </div>

                <form onSubmit={handleAction} className="space-y-10">
                    {/* BRAND METADATA */}
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-xl">
                        <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 text-center">Identity Configuration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="BRAND NAME" value={brandData.name} className="bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500 uppercase font-bold" onChange={(e) => setBrandData({...brandData, name: e.target.value})} required/>
                            <input type="text" placeholder="ID (e.g. aura)" value={brandData.brandId} className="bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500 font-mono" onChange={(e) => setBrandData({...brandData, brandId: e.target.value.toLowerCase()})} required/>
                            <input type="text" placeholder="IMAGE URL" value={brandData.image} className="md:col-span-2 bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500" onChange={(e) => setBrandData({...brandData, image: e.target.value})} required/>
                            
                            <div className="relative group">
                                <Percent size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"/>
                                <input type="number" placeholder="MAX DISCOUNT %" value={brandData.maxDiscount} className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500" onChange={(e) => setBrandData({...brandData, maxDiscount: e.target.value})} required/>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-black border border-white/10 p-4 rounded-2xl">
                                <span className="text-[10px] font-black uppercase text-gray-500">Accent</span>
                                <input type="color" value={brandData.accentColor} className="w-full h-8 bg-transparent cursor-pointer" onChange={(e) => setBrandData({...brandData, accentColor: e.target.value})}/>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Node Category</label>
                                <select 
                                    value={brandData.category} 
                                    className="bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500 text-sm font-bold uppercase tracking-widest cursor-pointer"
                                    onChange={(e) => setBrandData({...brandData, category: e.target.value})}
                                >
                                    <option value="Fashion Node">Fashion Node</option>
                                    <option value="Cyber Node">Cyber Node</option>
                                    <option value="Fuel Node">Fuel Node</option>
                                    <option value="Gear Node">Gear Node</option>
                                </select>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Accent Color</label>
                                <input 
                                    type="color" 
                                    value={brandData.accentColor} 
                                    className="w-full h-[54px] bg-black border border-white/10 p-2 rounded-2xl cursor-pointer" 
                                    onChange={(e) => setBrandData({...brandData, accentColor: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* QUIZ BUILDER */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em]">Question Nodes ({brandData.quizzes.length})</h2>
                            <button 
                                type="button" 
                                onClick={addQuestion} 
                                disabled={brandData.quizzes.length >= 10}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full font-black text-[10px] transition-all ${
                                    brandData.quizzes.length >= 10 
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : 'bg-emerald-500 text-black hover:scale-105'
                                }`}
                            >
                                <Plus size={14}/> {brandData.quizzes.length >= 10 ? "LIMIT REACHED" : "ADD QUESTION"}
                            </button>
                        </div>

                        <AnimatePresence>
                            {brandData.quizzes.map((quiz, qIdx) => (
                                <motion.div key={qIdx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/[0.02] border border-white/5 p-8 rounded-[35px] relative group">
                                    <button type="button" onClick={() => removeQuestion(qIdx)} className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 size={18}/>
                                    </button>

                                    <div className="mb-6">
                                        <input type="text" placeholder={`Question ${qIdx + 1}`} value={quiz.q} className="w-full bg-transparent border-b border-white/10 py-3 text-xl font-bold outline-none focus:border-emerald-500 transition-all" onChange={(e) => updateQuizField(qIdx, 'q', e.target.value)} required/>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {quiz.options.map((opt, oIdx) => (
                                            <div key={oIdx} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${quiz.correctAnswer === oIdx ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/5 bg-black/40'}`}>
                                                <input type="radio" name={`correct-${qIdx}`} checked={quiz.correctAnswer === oIdx} onChange={() => updateQuizField(qIdx, 'correctAnswer', oIdx)} className="w-4 h-4 accent-emerald-500 cursor-pointer"/>
                                                <input type="text" placeholder={`Option ${oIdx + 1}`} value={opt} className="bg-transparent w-full outline-none text-sm font-medium" onChange={(e) => updateQuizField(qIdx, 'option', e.target.value, oIdx)} required/>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <button type="submit" className="w-full bg-emerald-500 text-black py-6 rounded-3xl font-black text-xl uppercase italic hover:bg-white transition-all shadow-2xl">
                        {isEditing ? "Sync Protocol Changes" : "Initialize Node Deployment"}
                    </button>
                    {isEditing && <button onClick={() => {setIsEditing(null); resetForm();}} className="w-full text-gray-500 text-[10px] font-black tracking-widest uppercase">Abort Edit</button>}
                </form>

                {/* MANAGEMENT LIST */}
                <div className="mt-32 border-t border-white/5 pt-20">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-center">Active Nexus Nodes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {allBrands.map(brand => (
                            <div key={brand._id} className="bg-white/[0.03] border border-white/10 p-6 rounded-[30px] flex justify-between items-center group hover:border-emerald-500/50 transition-all">
                                <div className="flex items-center gap-4">
                                    <img src={brand.image} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0" alt="" />
                                    <div>
                                        <h4 className="font-black italic text-lg uppercase">{brand.name}</h4>
                                        <p className="text-[10px] text-emerald-500 font-bold uppercase">{brand.maxDiscount}% Limit</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setIsEditing(brand._id); setBrandData(brand); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-4 bg-white/5 rounded-2xl hover:bg-emerald-500 hover:text-black transition-all">
                                        <Edit3 size={18}/>
                                    </button>
                                    <button onClick={async () => { if(window.confirm("Terminate Node?")) { await axios.delete(`${API_URL}/api/admin/delete-brand/${brand._id}`); fetchBrands(); } }} className="p-4 bg-white/5 rounded-2xl hover:bg-red-500 transition-all">
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;