'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollStore } from "@/store/useScrollStore";
import { SECTIONS } from "@/utils/constants";
import hiral1 from "@/app/assets/hiral1.jpeg";
import hiral2 from "@/app/assets/hiral2.jpg";
import hiral3 from "@/app/assets/hiral3.jpg";
import Image from "next/image";
import InteractiveSkills from "@/components/sections/InteractiveSkills";
import InteractiveContact from "../sections/InteractiveContact";

export default function SectionOverlay() {
  const currentSection = useScrollStore((state) => state.currentSection);
  const section = SECTIONS[currentSection];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <AnimatePresence mode="wait">
        {/* --- SECTION 0: INTRO --- */}
        {currentSection === 0 && <IntroContent key="intro" />}

        {/* --- SECTION 2: SKILLS (Full Screen Special Case) --- */}
        {currentSection === 2 && (
          <motion.div
            key="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full relative"
          >
            {/* The Skills Network Background */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
               <InteractiveSkills />
            </div>
          </motion.div>
        )}
        {currentSection === 3 && (
          <motion.div
            key="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full relative"
          >
            {/* The Skills Network Background */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
               <InteractiveContact />
            </div>
          </motion.div>
        )}

        {/* --- SECTIONS 1 & 3: STANDARD LAYOUT --- */}
        {(currentSection === 1)  && (
          <div key="standard" className="mx-auto h-full flex items-center justify-center px-8">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {section.title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {section.description}
              </motion.p>

              {currentSection === 1 && <ProjectsContent />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ... Keep IntroContent, ProjectsContent, ContactContent exactly as they were ...
function IntroContent() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      id: 0,
      title: "DEVELOPER",
      description:
        "Frontend Developer with strong Full-Stack abilities, crafting interactive experiences",
      image: hiral1,
    },
    {
      id: 1,
      title: "DESIGNER",
      description:
        "Creating beautiful, polished interfaces that users love to interact with",
      image: hiral2,
    },
    {
      id: 2,
      title: "CREATOR",
      description:
        "Building Web3 content that demystifies blockchain technology for developers",
      image: hiral3,
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex items-center justify-center relative"
    >
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center max-w-4xl px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center "
          >
            {/* Image at Top with Navigation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-8"
            >
              {/* Previous Button - Left of Image */}
              <motion.button
                onClick={handlePrevious}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute cursor-pointer left-[-80px] top-1/2 -translate-y-1/2 z-20 text-white/60 text-base font-medium transition-colors pointer-events-auto group"
                style={{ "--hover-color": "#1aa9da" } as any}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1aa9da")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                }
              >
                <span className="text-sm">Previous</span>
              </motion.button>

              {/* Next Button - Right of Image */}
              <motion.button
                onClick={handleNext}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute cursor-pointer right-[-80px] top-1/2 -translate-y-1/2 z-20 text-white/60 text-base font-medium transition-colors pointer-events-auto group"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1aa9da")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                }
              >
                <span className="text-sm">Next</span>
              </motion.button>

              <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute -inset-2 rounded-full blur-xl opacity-60"
                  style={{
                    background: `linear-gradient(to right, #1aa9da, #60d4f7, #1aa9da)`,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Circular Text on top-right */}
                <motion.div
                  className="absolute -top-3 -right-3 w-24 h-24 md:-top-8 md:-right-8 md:w-32 md:h-32 pointer-events-none -z-10"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full overflow-visible"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>

                    {/* Optional: The faint guide line circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="37"
                      fill="none"
                      stroke="#1aa9da"
                      strokeWidth="1"
                      opacity="0.3"
                    />

                    <text
                      className="font-bold uppercase"
                      fill="#1aa9da"
                      style={{ fontSize: "11.5px", letterSpacing: "0.1em" }}
                    >
                      <textPath
                        href="#circlePath"
                        startOffset="0%"
                        textLength="230"
                        lengthAdjust="spacingAndGlyphs"
                      >
                        • PORTFOLIO • SERVICES • DEVELOPER
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Image */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 backdrop-blur-sm"
                  style={{ borderColor: "rgba(26, 169, 218, 0.3)" }}
                >
                  <Image
                    src={slides[currentSlide].image}
                    alt="Hiral Vala"
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Big Title Text */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-7xl md:text-[80px] font-medium text-transparent bg-clip-text tracking-tight -translate-y-8"
              style={{
                backgroundImage: `linear-gradient(to right, #1aa9da, #60d4f7, #1aa9da)`,
                textShadow: "0 0 80px rgba(26, 169, 218, 0.4)",
              }}
            >
              {currentSlideData.title}
            </motion.h1>

            {/* Description Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl -translate-y-2 font-poppins!"
            >
              {currentSlideData.description}
            </motion.p>

            {/* Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-2 mt-8 translate-y-6"
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className="w-2 h-2 cursor-pointer rounded-full transition-all pointer-events-auto"
                  style={{
                    backgroundColor:
                      index === currentSlide
                        ? "#1aa9da"
                        : "rgba(26, 169, 218, 0.3)",
                    width: index === currentSlide ? "2rem" : "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    if (index !== currentSlide) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(26, 169, 218, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentSlide) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(26, 169, 218, 0.3)";
                    }
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ProjectsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 pointer-events-auto"
    >
      {[
        { name: "Project 1", desc: "Web App with React & Node" },
        { name: "Project 2", desc: "3D Visualization Tool" },
        { name: "Project 3", desc: "AI-Powered Dashboard" },
        { name: "Project 4", desc: "Mobile App with React Native" },
      ].map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            {project.name}
          </h3>
          <p className="text-gray-300">{project.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ContactContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 flex gap-6 justify-center pointer-events-auto"
    >
      {[
        { name: "Email", link: "mailto:your@email.com" },
        { name: "GitHub", link: "https://github.com" },
        { name: "LinkedIn", link: "https://linkedin.com" },
        { name: "Twitter", link: "https://twitter.com" },
      ].map((contact, i) => (
        <motion.a
          key={i}
          href={contact.link}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 border border-white/20 hover:bg-white/20 transition-colors text-white font-medium"
        >
          {contact.name}
        </motion.a>
      ))}
    </motion.div>
  );
}