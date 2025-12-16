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
    name: "Lampros tech",
    description: "Lampros Tech site is a fast, animated web app using Next.js and React. It manages content with Sanity, styles with Tailwind, and adds secure forms, emails, and cookies for a smooth, modern feel.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity", "GSAP", "Lenis", "JSON Web Tokens", "reCAPTCHA", "Nodemailer" ],
    image: p1, 
    codeLink: "https://github.com/Lampros-Tech/lampros-tech-site",
    viewLink: "http://lampros.tech/"
  },
  {
    id: 2,
    name: "Pharos",
    description: "Pharos is a Web3 raffle platform where users pool PYUSD to enter fair, on-chain draws for rare assets and experiences. Winners are picked transparently via Pyth Network's random number generator, with everything auditable on the blockchain for shared, democratized wins.",
    techStack: ["Next.js", "Framer Motion", "React Icons", "Hardhat", "Pythnetwork"],
    image: p2,
    codeLink: "https://github.com/lunaria05/pharos",
    viewLink: "http://pharos-mvp.vercel.app/"
  },
  {
    id: 3,
    name: "The Toolbox",
    description: "The Toolbox is a top supplier of high-quality industrial tools, equipment, and maintenance services in the Democratic Republic of Congo, featuring brands like SKF and Bosch, with fast delivery and 24/7 support across showrooms in Kolwezi, Lubumbashi, and Likasi.",
    techStack: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "Swiper"],
    image: p3,
    codeLink: "https://github.com/hackWiz29/toolbox",
    viewLink: "https://toolbox-mvp.vercel.app/"
  },
  {
    id: 4,
    name: "Arbirush",
    description: "Arbirush is a DeFi adventure game on Farcaster where players connect wallets to navigate blockchain gates, manage wealth, and compete on leaderboards in an interactive crypto experience.",
    techStack: ["Next.js", "Framer Motion", "farcaster", "Wagmi", "Howler.js", "TypeScript", "TanStack Query"],
    image: p4,
    codeLink: "https://github.com/prajapati-yash/arbiRush",
    viewLink: "https://farcaster.xyz/miniapps/Nmi9WzLEzCvT/arbirush"
  },
  {
    id: 5,
    name: "Agentic Content Generator",
    description: "The Agentic Content Generator is an intelligent multi-agent system designed to automate content creation, capable of transforming raw inputs like emails and documents into high-quality blog posts and social media updates.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MongoDB", "NextAuth.js"],
    image: p5,
    codeLink: "https://github.com/prajapati-yash/agentic-content-creator",
    viewLink: "https://agentic-content-generator.vercel.app/"
  },
  {
    id: 6,
    name: "Hermirror",
    description: "Her Mirror Life appears to be a women's lifestyle and empowerment platform focused on self-reflection, personal growth, and navigating daily life with authenticity.",
    techStack: ["Next.js", "TypeScript ", "Tailwind CSS"],
    image: p6,
    codeLink: "https://github.com/her-mirror/her-mirror",
    viewLink: "https://www.hermirror.life/"
  },
  {
    id: 7,
    name: "DCA Agent",
    description: "DCA Agent is a Farcaster miniapp that automates Dollar Cost Averaging (DCA) strategies, enabling users to set up recurring crypto investment plans on the Arbitrum network with customizable schedules and token options.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Wagmi", "Farcaster"],
    image: p7,
    codeLink: "https://github.com/DCA-MiniApp/dca-agent-frontend",
    viewLink: "https://farcaster.xyz/miniapps/vZnlrKa-yxuL/dca-agent"
  },
];
