import { useState, useEffect, useRef } from "react";
import prayanLogo from "@/assets/prayan-logo.png";
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<'intro' | 'forge' | 'outro'>('intro');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: Array<{ x: number; y: number; size: number; speedY: number; speedX: number; type: 'fire' | 'ice'; alpha: number; rotation: number; }> = [];
    for (let i = 0; i < 40; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 3 + 1, speedY: Math.random() * 1.5 + 0.5, speedX: (Math.random() - 0.5) * 0.5, type: Math.random() > 0.5 ? 'fire' : 'ice', alpha: Math.random() * 0.5 + 0.2, rotation: Math.random() * Math.PI * 2, });
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY; p.x += p.speedX; p.rotation += 0.01;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
        if (p.type === 'fire') {
          ctx.shadowColor = '#ff6b35'; ctx.shadowBlur = 10;
          ctx.fillStyle = `rgba(255, 100, 40, ${p.alpha})`;
          ctx.beginPath(); ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, p.size * 0.5); ctx.lineTo(-p.size * 0.6, p.size * 0.5);
          ctx.closePath(); ctx.fill();
        } else {
          ctx.shadowColor = '#4aa3ff'; ctx.shadowBlur = 8;
          ctx.fillStyle = `rgba(120, 200, 255, ${p.alpha})`;
          ctx.beginPath(); ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.5, 0); ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.5, 0); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    const introTimer = setTimeout(() => setStage('forge'), 800);
    const forgeTimer = setTimeout(() => setStage('outro'), 2800);
    const completeTimer = setTimeout(() => onComplete(), 3600);
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(introTimer); clearTimeout(forgeTimer); clearTimeout(completeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);
  return (
    <div className={`fixed inset-0 z-50 overflow-hidden bg-[#1a120b] transition-opacity duration-800 ${stage === 'outro' ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #8b7355 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'screen' }} />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className={`relative transition-all duration-1000 ${stage === 'intro' ? 'scale-50 opacity-0' : stage === 'forge' ? 'scale-100 opacity-100' : 'scale-110 opacity-100'}`}>
          {stage === 'forge' && (
            <>
              <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.3s' }} />
            </>
          )}
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={prayanLogo} alt="PRAYAN'26 Logo" className="w-28 h-28 md:w-40 md:h-40 object-contain" />
            </div>
          </div>
        </div>
        <div className={`mt-10 text-center transition-all duration-1000 ${stage === 'intro' ? 'opacity-0 translate-y-8' : stage === 'forge' ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
          <h1 className="font-cinzel-decorative text-4xl md:text-6xl text-[#c4a962] tracking-[0.15em]">PRAYAN'26</h1>
          <p className="mt-3 font-cinzel text-xs md:text-sm text-[#c4a962]/60 tracking-[0.2em]">IGNIS ET GLACIES</p>
          <p className="mt-1 text-xs font-cinzel text-[#c4a962]/40 italic">Fire & Ice Awaits</p>
        </div>
      </div>
    </div>
  );
};
export default SplashScreen;