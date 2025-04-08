import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TerminalScreenProps {
  setIsActive: (value: boolean) => void;
}

const TerminalScreen = ({ setIsActive }: TerminalScreenProps) => {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const commands = {
    'help': 'Available commands: help, clear, matrix, paul, beer, exit',
    'clear': () => setOutput([]),
    'matrix': () => {
      const matrix = Array(20).fill(0).map(() => 
        Array(40).fill(0).map(() => 
          Math.random() > 0.5 ? '1' : '0'
        ).join('')
      );
      setOutput(prev => [...prev, ...matrix]);
    },
    'paul': () => {
      const asciiPaul = [
        "██████╗  █████╗ ██╗   ██╗██╗",
        "██╔════╝ ██╔══██╗██║   ██║██║",
        "██║  ███╗███████║██║   ██║██║",
        "██║   ██║██╔══██║██║   ██║██║",
        "╚██████╔╝██║  ██║╚██████╔╝███████╗",
        "╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝",
        "Gallantry: Extended Edition"
      ];
      setOutput(prev => [...prev, ...asciiPaul]);
    },
    'beer': () => {
      const asciiBeer = [
        "   .~~~~.",
        "   i====i_",
        "   |cccc|_)",
        "   |cccc|",
        "   `-==-'",
        "  NEWCASTLE BROWN ALE"
      ];
      setOutput(prev => [...prev, ...asciiBeer]);
    }
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      setOutput(prev => [...prev, `> ${input}`]);
      
      if (command === 'exit') {
        setIsActive(false);
        return;
      }
      
      if (commands[command as keyof typeof commands]) {
        const cmd = commands[command as keyof typeof commands];
        if (typeof cmd === 'function') {
          cmd();
        } else {
          setOutput(prev => [...prev, cmd as string]);
        }
      } else {
        setOutput(prev => [...prev, `Command not found: ${command}`]);
      }
      
      setInput('');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black text-green-500 font-mono p-4 overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={outputRef} className="h-[calc(100vh-4rem)] overflow-y-auto mb-4">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="flex items-center">
          <span className="text-yellow-500">debug@geordie-nation:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-green-500 flex-1 ml-2"
            autoFocus
            spellCheck="false"
          />
          <span className={`w-2 h-6 bg-green-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </div>
  );
};

const DebugMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsActive(prev => !prev);
        setShowTerminal(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {showTerminal && <TerminalScreen setIsActive={setIsActive} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DebugMode; 