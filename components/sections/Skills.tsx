'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGithub,
  SiVercel,
  SiPostman,
  SiNodedotjs,
  SiMongodb,
  SiWeb3Dotjs,
  SiGoogleanalytics,
  SiGoogletagmanager,
} from 'react-icons/si';
import { FaServer } from 'react-icons/fa';
import { IconType } from 'react-icons';

// Helper function to calculate x and y positions based on angle and radius
const calculatePosition = (angle: number, radius: number) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: Math.cos(radian) * radius,
    y: Math.sin(radian) * radius,
  };
};

// Skill interface
interface Skill {
  name: string;
  icon: IconType;
  angle: number;
}

// Orbit interface
interface Orbit {
  name: string;
  radius: number;
  skills: Skill[];
}

// Skills data organized by orbits
const orbitsData: Orbit[] = [
  {
    name: 'Inner Orbit (Core)',
    radius: 80,
    skills: [
      { name: 'React.js', icon: SiReact, angle: 0 },
      { name: 'Next.js', icon: SiNextdotjs, angle: 90 },
      { name: 'JavaScript', icon: SiJavascript, angle: 180 },
      { name: 'TypeScript', icon: SiTypescript, angle: 270 },
    ],
  },
  {
    name: 'Middle Orbit (Frontend/Tools)',
    radius: 150,
    skills: [
      { name: 'HTML5', icon: SiHtml5, angle: 30 },
      { name: 'CSS3', icon: SiCss3, angle: 90 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, angle: 150 },
      { name: 'GitHub', icon: SiGithub, angle: 210 },
      { name: 'Vercel', icon: SiVercel, angle: 270 },
      { name: 'Postman', icon: SiPostman, angle: 330 },
    ],
  },
  {
    name: 'Outer Orbit (Backend/Web3)',
    radius: 220,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, angle: 0 },
      { name: 'MongoDB', icon: SiMongodb, angle: 60 },
      { name: 'REST APIs', icon: FaServer, angle: 120 },
      { name: 'Web3', icon: SiWeb3Dotjs, angle: 180 },
      { name: 'Google Analytics', icon: SiGoogleanalytics, angle: 240 },
      { name: 'Google Tag Manager', icon: SiGoogletagmanager, angle: 300 },
    ],
  },
];

// Skill Card Component
const SkillCard = ({
  skill,
  position,
}: {
  skill: Skill;
  position: { x: number; y: number };
}) => {
  const Icon = skill.icon;

  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      whileHover={{ scale: 1.2 }}
    >
      <motion.div
        className="group relative w-12 h-12 md:w-14 md:h-14 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#1aa9da] hover:shadow-[0_0_20px_rgba(26,169,218,0.5)]"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      >
        <Icon className="text-xl md:text-2xl text-white group-hover:text-[#1aa9da] transition-colors duration-300" />

        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
          <span className="text-xs text-white/80 bg-black/60 px-2 py-1 rounded">
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Skills Component
const Skills = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 w-full max-w-3xl mx-auto pointer-events-auto"
    >
      {/* Orbit Container */}
      <div className="relative w-full aspect-square max-h-[600px]">
        {/* Background: Concentric circles and crosshairs */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crosshairs */}
          <line
            x1="0"
            y1="300"
            x2="600"
            y2="300"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="600"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />

          {/* Concentric circles */}
          {[100, 187, 275].map((radius, index) => (
            <circle
              key={index}
              cx="300"
              cy="300"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}

          {/* Center dot */}
          <circle
            cx="300"
            cy="300"
            r="6"
            fill="rgba(26,169,218,0.5)"
            stroke="#1aa9da"
            strokeWidth="2"
          />
        </svg>

        {/* Skills positioned on orbits */}
        <div className="absolute inset-0">
          {orbitsData.map((orbit, orbitIndex) => (
            <div key={orbitIndex}>
              {orbit.skills.map((skill, skillIndex) => {
                // Calculate responsive radius
                const baseRadius = orbit.radius;
                // On mobile (assumed container width ~400px for calculation)
                // We'll use CSS to scale the container, so positions stay proportional
                const position = calculatePosition(skill.angle, baseRadius);

                return (
                  <SkillCard
                    key={`${orbitIndex}-${skillIndex}`}
                    skill={skill}
                    position={position}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
