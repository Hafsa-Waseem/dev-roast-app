'use client';

import { useState, useEffect, useRef } from 'react';

const FLOATING_ELEMENTS = ['⚛️', '🐛', '☕', '🔥', '💬', '👑'];
const FLOATING_QUOTES = [
  'console.log("here")',
  'git blame life',
  'works on my machine',
  'cache invalidation?',
  'is it a feature?',
  'restarting...',
];
const TERMINAL_COMMANDS = [
  'npm install hope',
  'git push --force-with-lease',
  'brew update && brew upgrade',
  'docker-compose up -d',
  'kubectl get pods --all-namespaces',
  'rm -rf /node_modules',
  'SELECT * FROM users WHERE 1=1;',
  'Running tests... 0 passed.',
];

// Helper to get random position and animation duration
const getRandomStyle = () => {
  const top = `${Math.random() * 90}vh`;
  const left = `${Math.random() * 90}vw`;
  const animationDuration = `${Math.random() * 15 + 10}s`; // 10s to 25s
  const animationDelay = `${Math.random() * 5}s`;
  return { top, left, animationDuration, animationDelay };
};

// Shooting Star class for canvas
class Star {
  x: number;
  y: number;
  len: number;
  speed: number;
  size: number;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = Math.random() * ctx.canvas.width;
    this.y = Math.random() * ctx.canvas.height;
    this.len = Math.random() * 80 + 10;
    this.speed = Math.random() * 5 + 1;
    this.size = Math.random() * 1 + 0.1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.len, this.y - this.len);
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random()})`;
    this.ctx.lineWidth = this.size;
    this.ctx.stroke();
  }

  update() {
    this.x += this.speed;
    this.y -= this.speed;
    if (this.x > this.ctx.canvas.width || this.y < 0) {
      this.x = Math.random() * this.ctx.canvas.width;
      this.y = this.ctx.canvas.height;
    }
  }
}

export function MetaBackground() {
  const [elements, setElements] = useState<any[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate floating elements
    const generatedElements = [...FLOATING_ELEMENTS, ...FLOATING_QUOTES].map((content, i) => ({
      id: i,
      content,
      style: getRandomStyle(),
      isEmoji: i < FLOATING_ELEMENTS.length,
    }));
    setElements(generatedElements);

    // Terminal typing effect
    let charIndex = 0;
    const interval = setInterval(() => {
      const command = TERMINAL_COMMANDS[commandIndex];
      setCurrentCommand(command.substring(0, charIndex + 1));
      charIndex++;
      if (charIndex > command.length) {
        charIndex = 0;
        setCommandIndex((prevIndex) => (prevIndex + 1) % TERMINAL_COMMANDS.length);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [commandIndex]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let stars: Star[] = [];
    for (let i = 0; i < 3; i++) {
        stars.push(new Star(ctx));
    }
    
    let animationFrameId: number;
    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.draw();
            star.update();
        });
        animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        for (let i = 0; i < 3; i++) {
            stars.push(new Star(ctx));
        }
    }
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      {/* Animated Grid */}
      <div
        className="absolute inset-0 h-full w-full opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(var(--grid-glow-color) 0 1px, transparent 1px 100px), repeating-linear-gradient(90deg, var(--grid-glow-color) 0 1px, transparent 1px 100px)',
          animation: 'grid-pan 60s linear infinite',
        }}
      />

      {/* Canvas for Shooting Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Floating Elements */}
      {elements.map(({ id, content, style, isEmoji }) => (
        <span
          key={id}
          className={`absolute animate-[float_linear_infinite] ${
            isEmoji
              ? 'text-4xl'
              : 'rounded bg-black/30 px-2 py-1 text-sm font-mono text-white/50 backdrop-blur-sm'
          }`}
          style={style}
        >
          {content}
        </span>
      ))}

      {/* Typing Terminal Line */}
      <div className="absolute bottom-4 left-4 font-mono text-sm text-[var(--meta-glow-color)]">
        <span>&gt; {currentCommand}</span>
        <span className="inline-block h-4 w-2 animate-[blink-caret_1s_step-end_infinite] border-r-2 border-[var(--meta-glow-color)]"></span>
      </div>
    </div>
  );
}
