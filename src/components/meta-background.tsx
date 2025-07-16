'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const FLOATING_ELEMENTS = [
  { type: 'emoji', content: '⚛️' },
  { type: 'emoji', content: '🐛' },
  { type: 'emoji', content: '☕' },
  { type: 'emoji', content: '🔥' },
  { type: 'emoji', content: '💬' },
  { type: 'emoji', content: '👑' },
  { type: 'emoji', content: '💻' },
  { type: 'emoji', content: '📁' },
  { type: 'emoji', content: '📱' },
  { type: 'emoji', content: '☁️' },
  { type: 'emoji', content: '💡' },
  { type: 'emoji', content: '⚙️' },
  { type: 'quote', content: 'console.log("here")' },
  { type: 'quote', content: 'git blame life' },
  { type: 'quote', content: 'works on my machine' },
  { type: 'quote', content: 'cache invalidation?' },
  { type: 'quote', content: 'is it a feature?' },
  { type: 'quote', content: 'restarting...' },
  { type: 'code', content: 'const x = 42;' },
  { type: 'code', content: '<div>Hello</div>' },
  { type: 'code', content: '</>' },
  { type: 'key', content: 'Ctrl' },
  { type: 'key', content: 'C' },
  { type: 'key', content: 'V' },
  { type: 'badge', content: 'Bug Killer' },
  { type: 'mindmap', content: 'Logic' },
  { type: 'mindmap', content: 'UI/UX' },
  { type: 'mindmap', content: 'Refactor' },
  { type: 'icon', content: 'react' },
  { type: 'icon', content: 'js' },
  { type: 'icon', content: 'firebase' },
  { type: 'icon', content: 'brain' },
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

const LanguageIcons: { [key: string]: React.FC<any> } = {
    react: (props) => (
      <svg {...props} viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    js: (props) => (
        <svg {...props} viewBox="0 0 24 24"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.82-2.22-2.123-3.345-.81-.675-1.636-1.26-2.437-1.785.12-.135.255-.27.39-.42.63-.705.945-1.425.945-2.16 0-.75-.33-1.44-.99-2.07-.645-.63-1.44-.945-2.385-.945-1.02 0-1.86.345-2.52 1.035-.66.69-.99 1.515-.99 2.475 0 1.035.33 1.89.99 2.565.66.675 1.515 1.012 2.565 1.012.705 0 1.32-.165 1.845-.495.24-.15.465-.345.675-.585.525.465 1.11.99 1.755 1.575.81.675 1.635 1.26 2.475 1.755.255.15.51.285.765.405.09.045.18.06.27.06.24 0 .465-.09.66-.27.195-.18.285-.405.285-.675 0-.195-.06-.39-.18-.585zm-9.015-3.525c-.27-.285-.405-.63-.405-1.035 0-.42.135-.78.405-1.08.27-.3.615-.45 1.035-.45.42 0 .78.15 1.08.45.3.3.45.66.45 1.08 0 .405-.15.75-.45 1.035-.3.285-.66.435-1.08.435-.42 0-.765-.15-1.035-.435zM4.78 18.284c-.18-1.095-.824-2.22-2.128-3.344-.81-.676-1.637-1.26-2.437-1.786.12-.134.255-.27.39-.42.63-.705.945-1.425.945-2.16 0-.75-.33-1.44-.99-2.07-.645-.63-1.44-.945-2.385-.945-1.02 0-1.86.345-2.52 1.035-.66.69-.99 1.515-.99 2.475 0 1.035.33 1.89.99 2.565.66.675 1.514 1.013 2.564 1.013.706 0 1.32-.165 1.846-.495.24-.15.465-.345.675-.585.525.465 1.11.99 1.755 1.575.81.675 1.635 1.26 2.475 1.755.255.15.51.285.765.405.09.045.18.06.27.06.24 0 .465-.09.66-.27.195-.18.285-.405.285-.675 0-.195-.06-.39-.18-.585zM1.96 14.76c-.27-.284-.405-.63-.405-1.036 0-.42.135-.78.405-1.08.27-.3.615-.45 1.035-.45.42 0 .78.15 1.08.45.3.3.45.66.45 1.08 0 .405-.15.75-.45 1.035-.3.285-.66.436-1.08.436-.42 0-.765-.15-1.035-.435z" fill="currentColor"/></svg>
    ),
    firebase: (props) => (
      <svg {...props} viewBox="0 0 24 24"><path d="M3.01 9.62a.55.55 0 0 1-.2-1.02L6.1 6.22a.55.55 0 0 1 .19-.04l12.42 3.2a.55.55 0 0 1 .18.87l-3.3 2.37a.55.55 0 0 1-.4-.01l-4.1-2.58a.55.55 0 0 0-.58.07l-3.79 3.23a.55.55 0 0 1-.61.1zM18.8 9.94l-12.4-3.2a.55.55 0 0 0-.19.04L3.2 9.4a.55.55 0 0 0 .2 1.02l.6-.1a.55.55 0 0 1 .62-.1l3.78-3.22a.55.55 0 0 1 .58-.08l4.1 2.58a.55.55 0 0 0 .4.01l3.3-2.37a.55.55 0 0 0-.18-.87zM3.82 20.35a.55.55 0 0 1-.36-1l7.82-10.43a.55.55 0 0 1 .9.05l5.47 13.2a.55.55 0 0 1-.95.4l-2.93-7.07a.55.55 0 0 0-.96-.03L8.7 20.18a.55.55 0 0 1-.58.23l-4.3-.06z" fill="currentColor"/></svg>
    ),
    brain: (props) => (
      <svg {...props} viewBox="0 0 24 24"><path d="M12 2a9.5 9.5 0 0 0-9.5 9.5c0 2.22 1.54 4.54 2.5 5.56V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h3v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3.94c.96-1.02 2.5-3.34 2.5-5.56A9.5 9.5 0 0 0 12 2zm-3.5 12.5a1 1 0 1 1 1-1a1 1 0 0 1-1 1zm2-4a1 1 0 1 1 1-1a1 1 0 0 1-1 1zm3 0a1 1 0 1 1 1-1a1 1 0 0 1-1 1zm2.5 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1z" fill="currentColor"/></svg>
    )
};

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
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;

    const generateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = 6;
      const rows = 5;
      const size = 60; 

      const shuffled = [...FLOATING_ELEMENTS].sort(() => 0.5 - Math.random());
      const result: any[] = [];

      for (let i = 0; i < cols * rows && i < shuffled.length; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const left = col * (width / cols) + Math.random() * ((width / cols) - size);
        const top = row * (height / rows) + Math.random() * ((height / rows) - size);

        result.push({
          id: i,
          ...shuffled[i],
          style: {
            top: `${(top / height) * 100}%`,
            left: `${(left / width) * 100}%`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${Math.random() * 0.5 + 0.7}) rotate(${Math.random() * 60 - 30}deg)`
          },
        });
      }
      return result;
    };
    
    const handleResize = () => {
        setElements(generateGrid());
    }

    handleResize();
    window.addEventListener('resize', handleResize);

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

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    }
  }, [isMounted, commandIndex]);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let stars: Star[] = [];

    const handleResize = () => {
        if (!canvas || !ctx) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(new Star(ctx));
        }
    }
    handleResize();

    const render = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.draw();
            star.update();
        });
        animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    window.addEventListener('resize', handleResize);
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
    }
  }, [isMounted]);

  const getElementComponent = (el: any) => {
    const classBase = 'absolute animate-[float_linear_infinite]';
    const glowClass = 'drop-shadow-[0_0_5px_var(--meta-glow-color)]';
    
    switch (el.type) {
      case 'icon':
        const Icon = LanguageIcons[el.content];
        if (!Icon) return null;
        return <Icon className={cn(classBase, glowClass, 'h-10 w-10 text-primary/80')} style={el.style} />;
      case 'emoji':
        return <span className={cn(classBase, 'text-4xl')} style={el.style}>{el.content}</span>;
      case 'quote':
        return <span className={cn(classBase, 'rounded bg-black/30 px-2 py-1 text-sm font-mono text-white/50 backdrop-blur-sm')} style={el.style}>{el.content}</span>;
      case 'code':
        return <span className={cn(classBase, 'rounded bg-black/50 border border-primary/20 px-2 py-1 text-sm font-mono text-primary/70 backdrop-blur-sm')} style={el.style}>{el.content}</span>;
      case 'key':
        return <kbd className={cn(classBase, 'rounded border border-white/20 bg-white/10 px-2 py-1 text-sm font-sans text-white/60')} style={el.style}>{el.content}</kbd>;
      case 'badge':
        return <span className={cn(classBase, glowClass, 'rounded-full bg-primary/70 px-3 py-1 text-xs font-bold text-primary-foreground animate-[spin_20s_linear_infinite]')} style={el.style}>{el.content}</span>;
      case 'mindmap':
        return <span className={cn(classBase, 'rounded-lg border border-dashed border-white/30 bg-black/20 px-3 py-1 text-sm text-white/70')} style={el.style}>{el.content}</span>;
      default:
        return <span className={cn(classBase, 'text-4xl')} style={el.style}>{el.content}</span>;
    }
  };
  
  return (
    <div className="fixed inset-0 -z-10 h-dvh w-dvw overflow-hidden">
      {isMounted && (
        <>
            <div
                className="absolute inset-0 h-full w-full opacity-50"
                style={{
                backgroundImage:
                    'repeating-linear-gradient(var(--grid-glow-color) 0 1px, transparent 1px 100px), repeating-linear-gradient(90deg, var(--grid-glow-color) 0 1px, transparent 1px 100px)',
                animation: 'grid-pan 60s linear infinite',
                }}
            />
            
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            <div className="absolute bottom-4 right-4 h-[30vmin] w-[30vmin] opacity-70">
                <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-primary/20" />
                <div className="absolute inset-0 h-full w-full animate-[spin_50s_linear_infinite_reverse] rounded-full border border-accent/20" />
                
                <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full animate-[spin_45s_linear_infinite] fill-primary/30"
                >
                    <defs>
                        <path
                            id="circle"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                    </defs>
                    <text letterSpacing="0.2" fontSize="5">
                        <textPath xlinkHref="#circle">
                            HAAS · HAAS · HAAS · HAAS · HAAS · HAAS · HAAS · HAAS · HAAS · HAAS · HAAS · HAAS ·
                        </textPath>
                    </text>
                </svg>
            </div>
            
            <div className="relative h-full w-full">
              <div className="absolute top-4 left-4 font-mono text-3xl text-primary/40 drop-shadow-[0_0_8px_var(--meta-glow-color)]">
                HAAS
              </div>
              {elements.map((el) => (
                  <div key={el.id}>
                      {getElementComponent(el)}
                  </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 font-mono text-sm text-[var(--meta-glow-color)]">
                <span>&gt; {currentCommand}</span>
                <span className="inline-block h-4 w-2 animate-[blink-caret_1s_step-end_infinite] border-r-2 border-[var(--meta-glow-color)]"></span>
            </div>
        </>
      )}
    </div>
  );
}
