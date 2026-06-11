import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResearchDevCard = ({ project, index, onImageClick }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const images = project.images;
  const activeImage = images[activeImageIdx];

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Alternates layout side: Left vs Right
  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center justify-between w-full py-16 border-b border-zinc-700/50 last:border-0`}
      data-aos={isLeft ? "fade-right" : "fade-left"}
      data-aos-duration="1000"
      data-aos-once="true"
    >
      {/* STYLE BLOCK FOR KEYFRAMES */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotation-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotation-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}} />

      {/* LENS VIEWPORT COLUMN (CLEAN CIRCLE) */}
      <div className="flex flex-col items-center justify-center shrink-0 w-full max-w-[420px]">
        {/* Main circular image container - Gray Background & Border */}
        <div 
          className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center bg-zinc-700 overflow-hidden cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-zinc-600 hover:border-[#FFBA00] transition-colors duration-700"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onImageClick(activeImage, project.title)}
          title="Click to expand view"
        >
          {/* Subtle slow rotating outer bevel outlines */}
          <div 
            className="absolute inset-2 rounded-full border border-dashed border-[#FFBA00]/10 pointer-events-none"
            style={{ animation: 'rotation-slow 35s linear infinite' }}
          />
          <div 
            className="absolute inset-4 rounded-full border border-dashed border-zinc-500/20 pointer-events-none"
            style={{ animation: 'rotation-reverse-slow 45s linear infinite' }}
          />

          {/* Inner image container - Gray Background */}
          <div className="w-[86%] h-[86%] rounded-full overflow-hidden relative bg-zinc-800 border border-zinc-700/80">
            
            {/* Project Image */}
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImageIdx}
                src={activeImage} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Hover magnifying overlay */}
            <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
              <div className="w-10 h-10 rounded-full border border-[#FFBA00] flex items-center justify-center text-[#FFBA00] mb-2 scale-75 group-hover:scale-100 transition-transform duration-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFBA00] uppercase">Examine Project</span>
              <span className="text-[8px] font-mono text-zinc-300 mt-0.5">Click to view original</span>
            </div>
          </div>

          {/* Quick arrow controls on hover */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 w-7 h-7 rounded-full bg-zinc-900/80 hover:bg-[#FFBA00] hover:text-black text-[#FFBA00] border border-zinc-700/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
            title="Previous Image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 w-7 h-7 rounded-full bg-zinc-900/80 hover:bg-[#FFBA00] hover:text-black text-[#FFBA00] border border-zinc-700/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
            title="Next Image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mini circular thumbnails row */}
        <div className="flex gap-4 mt-6 items-center">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImageIdx(idx)}
              className={`relative w-12 h-12 rounded-full overflow-hidden bg-zinc-850 border transition-all duration-500 shadow-md group/thumb ${
                activeImageIdx === idx 
                  ? 'border-[#FFBA00] scale-110 shadow-[0_0_10px_rgba(255,186,0,0.4)]' 
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
              title={`Frame 0${idx + 1}`}
            >
              <img 
                src={img} 
                alt="Thumbnail" 
                className="w-full h-full object-cover opacity-60 group-hover/thumb:opacity-90 transition-opacity"
              />
              {activeImageIdx === idx && (
                <div className="absolute inset-0 border border-dashed border-[#FFBA00]/60 rounded-full pointer-events-none animate-[spin_10s_linear_infinite]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* LAB REPORT DETAILS COLUMN */}
      <div className="flex-grow w-full lg:max-w-xl text-left">
        {/* Tech Header Line */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="px-3 py-1 rounded bg-[#FFBA00]/10 border border-[#FFBA00]/25 text-xs font-mono font-bold tracking-wider text-[#FFBA00]">
            {project.tag}
          </span>
          <span className="text-[10px] font-mono text-zinc-400">
            SYSTEM STATE: <span className="text-emerald-400 font-bold">VERIFIED</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          <span className="text-[10px] font-mono text-zinc-400">
            REF: {project.code}
          </span>
        </div>

        {/* Main Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
          <span className="hover:text-[#FFBA00] transition-colors duration-300 leading-tight">
            {project.title.replace(/^[^\w]*/, '').replace(/^Research & Development – /, '')}
          </span>
        </h3>

        {/* Detailed Scientific Report style card - Gray backgrounds */}
        <div className="relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-700/80 backdrop-blur-sm shadow-inner mb-6">
          <div className="absolute top-0 right-6 -translate-y-1/2 px-2.5 py-0.5 bg-zinc-800 border border-zinc-700 text-[9px] font-mono text-zinc-400 rounded uppercase">
            Telemetry Assessment
          </div>
          
          <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider mb-2 font-bold">
            Development & Analysis Logs:
          </h4>
          <p className="text-zinc-300 text-sm leading-relaxed font-semibold">
            {project.achievement}
          </p>

          {/* Mini Tech Log Box */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-400">
            <div>
              <span className="text-zinc-500 block uppercase">Telemetry Target:</span>
              <span className="text-zinc-300 font-bold block overflow-hidden text-ellipsis whitespace-nowrap">
                {project.targetComponent}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase">Deployment Stage:</span>
              <span className="text-[#FFBA00] font-bold block">
                PRODUCTION STABLE
              </span>
            </div>
          </div>
        </div>

        {/* Skills Tech Tags */}
        <div>
          <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-3 font-black">
            Acquired Expertise & Tooling:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, sIdx) => (
              <span 
                key={sIdx}
                className="px-3 py-1.5 rounded-lg bg-zinc-700 border border-zinc-650 text-xs font-semibold text-zinc-300 hover:border-[#FFBA00] hover:text-[#FFBA00] transition-all duration-300 flex items-center gap-1.5 shadow-sm"
              >
                <span className="w-1 h-1 rounded-full bg-[#FFBA00]" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResearchDev = () => {
  const [lightbox, setLightbox] = useState({ isOpen: false, imgUrl: '', title: '' });

  const openLightbox = (imgUrl, title) => {
    setLightbox({ isOpen: true, imgUrl, title });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, imgUrl: '', title: '' });
  };

  const rdProjects = [
    {
      title: "Research & Development – AI-Powered Plant Disease Detection System",
      achievement: "Conducted research and development on AI-based plant disease detection and presented the solution to an esteemed German Professor.",
      skills: ["Artificial Intelligence", "Computer Vision", "Research Methodology", "Technical Presentation", "Problem Solving"],
      images: [
        "/rd/S2C AGRI 1.jpg",
        "/rd/S2C AGRI 2.jpg",
        "/rd/S2C AGRI 3.jpg"
      ],
      tag: "Computer Vision / AgTech",
      code: "RD-S2C-AGRI",
      zoomLevel: "1.8X",
      focalLength: "35mm",
      targetComponent: "Plant Leaf Health Classifier"
    },
    {
      title: "Research & Development – Multi-Agent AI System",
      achievement: "Designed and developed an AI Agent system capable of coordinating 20+ worker agents for automated data collection.",
      skills: ["AI Agents", "Multi-Agent Systems", "Automation", "Data Processing", "System Design"],
      images: [
        "/rd/agentic ai for s2c 1.jpg",
        "/rd/agentic ai for s2c 2.jpg",
        "/rd/agentic ai for s2c 3.jpg"
      ],
      tag: "Agentic Systems / Automation",
      code: "RD-AGENT-CO",
      zoomLevel: "2.4X",
      focalLength: "50mm",
      targetComponent: "Multi-Agent Orchestrator"
    },
    {
      title: "Research & Development – Dual Axis MPPT Prototype",
      achievement: "Designed and developed a Dual Axis Maximum Power Point Tracking (MPPT) prototype for renewable energy applications.",
      skills: ["Renewable Energy Systems", "MPPT Algorithms", "Embedded Systems", "Hardware Prototyping", "Research & Development"],
      images: [
        "/rd/mppt 1.jpeg",
        "/rd/mppt 2.jpeg"
      ],
      tag: "Embedded / CleanTech",
      code: "RD-MPPT-PV",
      zoomLevel: "1.0X",
      focalLength: "28mm",
      targetComponent: "Dual-Axis Solar Tracker"
    }
  ];

  return (
    <section 
      id="rd"
      className="bg-zinc-800 pt-28 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"
    >
      {/* Ambient glowing circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#FFBA00]/3 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-[450px] h-[450px] rounded-full bg-[#FFBA00]/2 filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title Header */}
        <div data-aos="fade-up" data-aos-duration="800" data-aos-once="true" className="text-center mb-24">
          <div className="inline-block border border-zinc-700 rounded-full px-5 py-1.5 text-xs font-mono font-black text-[#FFBA00] mb-6 shadow-md bg-zinc-900/40 uppercase tracking-widest">
            Laboratories
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            Research & <span className="text-[#FFBA00]">Development</span>
          </h2>
          <div className="w-16 h-1 bg-[#FFBA00] mx-auto rounded-full mb-6" />
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
            Engineering hardware and software prototypes through rigorous research, algorithm design, and structured system analysis.
          </p>
        </div>

        {/* Project entries stack */}
        <div className="flex flex-col gap-8 md:gap-4">
          {rdProjects.map((project, idx) => (
            <ResearchDevCard 
              key={idx}
              project={project}
              index={idx}
              onImageClick={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 w-full h-full z-[999999] bg-zinc-900/95 backdrop-blur-md flex flex-col justify-center items-center p-4 cursor-zoom-out animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            type="button"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-[#FFBA00] hover:text-black transition-colors border border-zinc-700 z-50"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Image Frame */}
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightbox.imgUrl} 
              alt={lightbox.title} 
              className="max-w-[95%] max-h-[90%] object-contain rounded-xl border border-zinc-700 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Title description bar */}
          <div className="mt-6 text-center z-10 px-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[#FFBA00] text-lg font-black tracking-tight">
              {lightbox.title.replace(/^Research & Development – /, '')}
            </h3>
            <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest mt-1">Click anywhere outside to exit viewport</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchDev;
