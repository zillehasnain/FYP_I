import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Hero3D from '../components/Hero3D';
import BrandCard from '../components/BrandCard';
import InfiniteRibbon from '../components/InfiniteRibbon';
import Footer from '../components/Footer';

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/brands`);
        setBrands(res.data);
      } catch (err) {
        console.error("Nexus Link Failure");
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [API_URL]);

  const tickerNames = brands.length > 0 ? brands.map(b => b.name) : ["INITIALIZING", "NODES", "WAITING"];

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <section className="relative h-[85vh] flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 opacity-40"><Hero3D /></div>
        <div className="z-10">
          <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase">Quiz the <br/> Future.</h2>
          <p className="text-emerald-500 font-bold tracking-[0.5em] uppercase text-xs mt-4 text-center">Data-Driven Rewards Hub</p>
        </div>
      </section>

      <InfiniteRibbon brands={tickerNames} />

      <section className="py-40 px-10">
        <h3 className="text-5xl font-black italic mb-20 text-center uppercase">Active Nodes</h3>
        
        {loading ? (
          <div className="text-center animate-pulse text-emerald-500 font-mono">SCANNING NETWORK...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {brands.length > 0 ? (
              brands.slice(0, 4).map((brand) => (
                <BrandCard 
                    key={brand._id} 
                    id={brand.brandId} 
                    name={brand.name} 
                    tag={brand.category} 
                    img={brand.image} 
                    accent={`group-hover:shadow-[${brand.accentColor}]/40`} 
                />
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-600 border border-dashed border-white/10 p-20 rounded-[40px]">
                NO ACTIVE NODES. ACCESS OVERLORD PANEL TO DEPLOY BRANDS.
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;