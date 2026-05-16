import React, { useState, useEffect } from 'react';
import { Terminal, Shield, HelpCircle, Phone, Book } from 'lucide-react';

const IntelHub = () => {
    const [text, setText] = useState("");
    const fullText = "SYSTEM PROTOCOL v1.0.4: ACCESSING INTEL DATABASE... CONNECTING TO PAKISTAN_CENTRAL_NODE... READY.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const faqs = [
        { q: "How are rewards issued?", a: "Rewards are decrypted instantly upon successful quiz completion and saved to your Digital Vault." },
        { q: "Is the discount valid nationwide?", a: "Yes. All partner dummy brands support nationwide redemption at their respective digital outlets." },
        { q: "How can my brand join the Nexus?", a: "Contact our System Admin via the secure line below for node integration." }
    ];

    return (
        <div className="min-h-screen bg-[#020202] text-emerald-500 pt-40 px-6 font-mono relative">
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>
            
            <div className="max-w-4xl mx-auto border border-emerald-500/30 p-8 md:p-12 bg-black/80 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                <div className="flex items-center gap-4 mb-12 border-b border-emerald-500/20 pb-6">
                    <Terminal size={30} />
                    <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase">{text}<span className="animate-pulse">_</span></h1>
                </div>

                <div className="grid gap-12">
                    <section>
                        <h2 className="flex items-center gap-3 text-white mb-6 uppercase tracking-widest text-sm font-bold">
                            <Book size={18} /> Operation Guide
                        </h2>
                        <p className="text-emerald-500/70 leading-relaxed mb-4">1. AUTHENTICATE YOUR IDENTITY IN THE VAULT SECTION.</p>
                        <p className="text-emerald-500/70 leading-relaxed mb-4">2. SELECT AN ACTIVE BRAND NODE FROM THE NEXUS DIRECTORY.</p>
                        <p className="text-emerald-500/70 leading-relaxed">3. COMPLETE THE CHALLENGE TO UNLOCK ENCRYPTED VOUCHERS.</p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-white mb-8 uppercase tracking-widest text-sm font-bold">
                            <HelpCircle size={18} /> Decrypted FAQ
                        </h2>
                        <div className="space-y-8">
                            {faqs.map((f, i) => (
                                <div key={i} className="border-l-2 border-emerald-500/20 pl-6">
                                    <h3 className="text-emerald-400 font-bold mb-2 uppercase tracking-tighter">{f.q}</h3>
                                    <p className="text-emerald-700 text-sm">{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-col md:flex-row gap-8 pt-8 border-t border-emerald-500/20">
                        <div className="flex items-center gap-3">
                            <Phone size={18} />
                            <span className="text-xs uppercase font-bold text-white tracking-[0.2em]">Secure Line: +92-BURST-01</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield size={18} />
                            <span className="text-xs uppercase font-bold text-white tracking-[0.2em]">Status: SSL_SECURE</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default IntelHub;