'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import DebugMode from './components/DebugMode';

const FloatingText = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold text-primary animate-bounce-slow"
    >
      {text}
    </motion.div>
  );
};

const RotatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
      
      // Smoothly move towards mouse position
      meshRef.current.position.x += (mousePosition.x * 2 - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (mousePosition.y * 2 - meshRef.current.position.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#E87D2C"
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
};

const CubeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingCube />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

const ScrollingText = () => {
  return (
    <div className="absolute top-4 left-0 w-full overflow-hidden whitespace-nowrap">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="text-2xl font-bold text-yellow-400"
      >
        ABOOT THE TOON! ABOOT THE TOON! ABOOT THE TOON! ABOOT THE TOON! ABOOT THE TOON!
      </motion.div>
    </div>
  );
};

const AnimatedLogo = () => {
  const images = [
    {
      src: "/newcastle-brown-ale-logo-E87D2C0DBD-seeklogo.com.png",
      alt: "Newcastle Brown Ale",
      description: "THE ORIGINAL FRAMEWORK OF THE TOON!"
    },
    {
      src: "/react.svg",
      alt: "React",
      description: "PAUL'S REACTING FASTER THAN A HOOK!"
    },
    {
      src: "/nextjs.svg",
      alt: "Next.js",
      description: "NEXT LEVEL CODING"
    },
    {
      src: "/typescript.svg",
      alt: "TypeScript",
      description: "PAUL'S TYPING FASTER THAN THE COMPILER!"
    },
    {
      src: "/tailwind.svg",
      alt: "Tailwind",
      description: "PAUL'S STYLING LIKE A PRO!"
    }
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ 
            scale: 0,
            rotate: -180,
            opacity: 0,
            x: -100,
            y: -100
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, 360, 720],
            opacity: 1,
            x: [-50, 50, -50],
            y: [0, -50, 0]
          }}
          exit={{ 
            scale: 0,
            rotate: 180,
            opacity: 0,
            x: 100,
            y: 100
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 165, 0, 0.5)",
                "0 0 40px rgba(255, 165, 0, 0.8)",
                "0 0 60px rgba(255, 165, 0, 1)",
                "0 0 40px rgba(255, 165, 0, 0.8)",
                "0 0 20px rgba(255, 165, 0, 0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full"
          />
          <Image
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            fill
            className="object-contain animate-pulse"
            priority
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -bottom-16 left-0 right-0 text-center text-xl font-bold text-yellow-400"
          >
            {images[currentImage].description}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const PaulMessage = () => {
  const messages = [
    "More grit than sandpaper",
    "Remember to debug the README",
    "IF NUM_COMMITS == NUM_READMES: print('I'll sinka cheeki brown to that')",
    "COMPILER? I BARELY KNOW HER!",
    "Top tip: Docker container makes the laptop constipated in a way it doesn't the desktop",
    "My hopes might be up but my API is down",
    "Senior Developer",
    "Less yappin more tappin",
    "CTRL + C, CTRL + V CTRL + C, CTRL + V",
    "Stack overflowin",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1,
        rotate: 0,
        y: [0, -20, 0]
      }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      className="text-6xl font-extrabold text-primary animate-bounce-slow"
    >
      {messages[currentMessage]}
    </motion.div>
  );
};

const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; speed: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          speed: 1 + Math.random() * 2
        }
      ].slice(-50));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {drops.map(drop => (
        <motion.div
          key={drop.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 1, 0] }}
          transition={{ 
            duration: 5 / drop.speed,
            ease: "linear"
          }}
          className="absolute text-green-500 font-mono text-sm"
          style={{ left: `${drop.x}%` }}
        >
          {Math.random().toString(36).substring(2, 15)}
        </motion.div>
      ))}
    </div>
  );
};

const VirusPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupCount, setPopupCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (popupCount < 5) {
        setShowPopup(true);
        setPopupCount(prev => prev + 1);
        setTimeout(() => setShowPopup(false), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [popupCount]);

  if (!showPopup) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-4 rounded-lg shadow-lg z-50"
    >
      <div className="text-white font-bold text-xl">
        VIRUS DETECTED! 🦠
      </div>
      <div className="text-white">
        Your computer has been infected with {popupCount} viruses!
      </div>
    </motion.div>
  );
};

const ExplodingText = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: [1, 1.5, 1],
        rotate: [0, 360, 720],
        y: [0, -50, 0],
        x: [-50, 50, -50]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="text-4xl font-bold text-primary"
    >
      {text}
    </motion.div>
  );
};

const LearningLinks = () => {
  const resources = [
    {
      name: "Boot.dev",
      url: "https://boot.dev",
      description: "Learn to code while Paul learns to code!"
    },
    {
      name: "HackTheBox",
      url: "https://www.hackthebox.com",
      description: "Break things (legally) like a pro!"
    },
    {
      name: "FreeCodeCamp",
      url: "https://www.freecodecamp.org",
      description: "Free as in beer, just like Newcastle Brown!"
    },
    {
      name: "Codecademy",
      url: "https://www.codecademy.com",
      description: "Interactive learning, just like Paul's code!"
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com",
      description: "Solve puzzles faster than Paul can debug!"
    },
    {
      name: "The Odin Project",
      url: "https://www.theodinproject.com",
      description: "Learn like a Viking (or a Geordie)!"
    },
    {
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      description: "The holy grail of web development docs!"
    },
    {
      name: "My Website lol",
      url: "https://jaedonmunton.pro",
      description: "Check out the creator's website!"
    }
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold text-yellow-400">LEARNING RESOURCES (BECAUSE WE ALL START SOMEWHERE!)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <motion.a
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 + index * 0.2 }}
            className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="text-blue-400 group-hover:text-blue-300 font-bold">
              {resource.name}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {resource.description}
            </div>
          </motion.a>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center text-sm text-gray-400 mt-4 italic"
      >
        Just for fun. Bitta banter. Keep it up buddy! <a href="https://jaedonmunton.pro" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Drop me a message</a> if you need help. I won't keep asking forever lol 😄
      </motion.div>
    </motion.div>
  );
};

const DebugPrompt = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed bottom-4 right-4 bg-black/50 p-4 rounded-lg border border-yellow-500 text-yellow-500 text-sm z-50"
    >
      <p>💻 Try the secret debug mode!</p>
      <p>Press <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-800 rounded">Shift</kbd> + <kbd className="px-2 py-1 bg-gray-800 rounded">D</kbd></p>
      <p className="text-xs mt-2">Type 'help' to see available commands. Refresh the page to reset.</p>
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      <DebugMode />
      <DebugPrompt />
      <CubeBackground />
      <MatrixRain />
      <ScrollingText />
      <VirusPopup />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 0.7 }}
        transition={{ duration: 1 }}
        className="text-center space-y-8 relative z-10 w-full max-w-[90vw] mx-auto"
      >
        <motion.h1 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"
        >
          GEORDIE NATION
        </motion.h1>
        
        <AnimatedLogo />
        
        <PaulMessage />
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <ExplodingText key={i} text="PAUL!" />
          ))}
        </div>

        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-2xl"
        >
          The Ultimate Fan Experience
        </motion.div>

        <div className="mt-8 space-y-4">
          <LearningLinks />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-gray-400 mt-4"
          >
            p.s. i accidentally left my API keys in .env...
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 