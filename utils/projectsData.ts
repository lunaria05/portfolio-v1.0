import p1 from "@/app/assets/Projects/project1.png"
import p2 from "@/app/assets/Projects/project2.png"
import p3 from "@/app/assets/Projects/project3.png"
import p4 from "@/app/assets/Projects/project4.png"
import p5 from "@/app/assets/Projects/project5.png"
import p6 from "@/app/assets/Projects/project6.png"
import p7 from "@/app/assets/Projects/project7.png"
import p8 from "@/app/assets/Projects/project8.png"
import { StaticImageData } from "next/image"

export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  image: string | StaticImageData;
  codeLink: string;
  viewLink: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: "AI-Powered Task Manager",
    description: "A smart task management application that uses AI to prioritize your tasks, suggest optimal scheduling, and provide productivity insights. Built with modern tech stack for seamless user experience.",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: p1, // Replace with your actual image path
    codeLink: "https://github.com/yourusername/ai-task-manager",
    viewLink: "https://ai-task-manager.vercel.app"
  },
  {
    id: 2,
    name: "NFT Marketplace",
    description: "Decentralized marketplace for buying, selling, and trading NFTs. Features include wallet integration, real-time bidding, and IPFS storage for metadata. Fully responsive design with Web3 functionality.",
    techStack: ["React", "Solidity", "Ethers.js", "IPFS", "Hardhat", "The Graph"],
    image: p2,
    codeLink: "https://github.com/yourusername/nft-marketplace",
    viewLink: "https://nft-marketplace-demo.netlify.app"
  },
  {
    id: 3,
    name: "Real-time Collaboration Tool",
    description: "A Figma-like collaborative whiteboard where teams can brainstorm, sketch, and plan together in real-time. Includes features like cursor tracking, live updates, and version control.",
    techStack: ["React", "Socket.io", "Node.js", "MongoDB", "Canvas API", "Redis"],
    image: p3,
    codeLink: "https://github.com/yourusername/collab-tool",
    viewLink: "https://collab-tool.vercel.app"
  },
  {
    id: 4,
    name: "E-Commerce Dashboard",
    description: "Comprehensive admin dashboard for managing e-commerce operations. Analytics, inventory management, order tracking, and customer insights all in one place with beautiful data visualizations.",
    techStack: ["Next.js", "Chart.js", "Stripe", "Tailwind CSS", "Firebase", "TypeScript"],
    image: p4,
    codeLink: "https://github.com/yourusername/ecommerce-dashboard",
    viewLink: "https://ecommerce-dashboard-demo.vercel.app"
  },
  {
    id: 5,
    name: "Video Streaming Platform",
    description: "Netflix-inspired streaming platform with user authentication, video playback, recommendations, and watchlists. Optimized for performance with adaptive bitrate streaming.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "HLS"],
    image: p5,
    codeLink: "https://github.com/yourusername/streaming-platform",
    viewLink: "https://streaming-platform-demo.netlify.app"
  },
  {
    id: 6,
    name: "Fitness Tracking App",
    description: "Mobile-first fitness application that tracks workouts, nutrition, and progress. Features include workout plans, calorie tracking, and social challenges with friends.",
    techStack: ["React Native", "Firebase", "Redux", "TypeScript", "Chart.js"],
    image: p6,
    codeLink: "https://github.com/yourusername/fitness-app",
    viewLink: "https://fitness-app-demo.app"
  }
];
