import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fireDragon from "@/assets/fire-dragon.jpeg";
import iceDragon from "@/assets/ice-dragon.png";
import prayanLogo from "@/assets/prayan-logo.png";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const events = [
  { name: "EVENT", desc: "48-hour coding marathon", icon: "⚔️" },
  { name: "EVENT", desc: "Battle of the machines", icon: "🐉" },
  { name: "EVENT", desc: "Competitive programming", icon: "🔥" },
  { name: "EVENT", desc: "Industry expert sessions", icon: "👑" },
  { name: "EVENT", desc: "Esports tournament", icon: "🏰" },
  { name: "EVENT", desc: "Machine learning showdown", icon: "❄️" },
];

const sponsors = [
  "sponsors",
  "sponsors",
  "sponsors",
  "sponsors",
  "sponsors",
  "sponsors",
];

const realmText = "The Realm Awaits";
const realmBody =
  "In the grand tradition of the ancient houses, PRAYAN\u201926 summons the brightest minds to compete, create, and conquer. From the fiery forges of innovation to the icy peaks of intellect \u2014 choose your allegiance and claim your throne.";

const MainSite = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fireBgRef = useRef<HTMLDivElement>(null);
  const iceBgRef = useRef<HTMLDivElement>(null);
  const iceRevealRef = useRef<HTMLElement>(null);
  const [isIceVisible, setIsIceVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Fire Background Parallax & Fade
      gsap.to(fireBgRef.current, {
        scrollTrigger: {
          trigger: "section:first-of-type",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        scale: 1.1,
        ease: "none",
      });

      // Ice Background Fade In and Parallax
      gsap.fromTo(
        iceBgRef.current,
        { opacity: 0, scale: 1.05 },
        {
          scrollTrigger: {
            trigger: "section:first-of-type",
            start: "40% top",
            end: "bottom top",
            scrub: true,
          },
          opacity: 1,
          scale: 1,
          ease: "none",
        }
      );

      // Section triggers for "The Realm Awaits"
      ScrollTrigger.create({
        trigger: iceRevealRef.current,
        start: "top 80%",
        onEnter: () => setIsIceVisible(true),
        // No reverse here to keep letters frozen as per original design, 
        // but could add onLeaveBack if needed
      });

      // Character/Word animations for "The Realm Awaits" can be done here too,
      // but keeping existing CSS animations for now to maintain the look.

      // Event cards entrance
      gsap.from(".herald-card", {
        scrollTrigger: {
          trigger: "#events",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">

      {/* ── FIXED PARALLAX BACKGROUNDS ── */}
      <div
        ref={fireBgRef}
        className="fixed inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${fireDragon})`,
          opacity: 0.6, // Dimmed from 1
          backfaceVisibility: "hidden", // Sharpness during scaling
          imageRendering: "crisp-edges", // Pixel-perfect attempt
        }}
      />
      <div
        ref={iceBgRef}
        className="fixed inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${iceDragon})`,
          opacity: 0,
          backfaceVisibility: "hidden", // Sharpness during scaling
          imageRendering: "crisp-edges", // Pixel-perfect attempt
        }}
      />
      {/* Permanent dark overlay for dimming/readibility */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none bg-black/40"
      />

      {/* Permanent subtle dark vignette — edges only, center stays clear */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsla(220,30%,4%,0.7) 100%)",
        }}
      />

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-gold/20"
        style={{ backgroundColor: "hsla(0,0%,5%,0.75)" }}
      >
        {/* keep existing nav content */}
      </nav>

      {/* ══════════════════════════════════════════
          HERO — FIRE
      ══════════════════════════════════════════ */}
      <section className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="hero-title text-5xl md:text-8xl lg:text-9xl">
            PRAYAN'26
          </h1>
          <div className="section-divider-gold w-48 mx-auto my-6" />
          <p className="text-xl md:text-2xl font-cinzel tracking-[0.4em] uppercase text-foreground/80">
            Techno Culture Fest
          </p>
          <p className="mt-3 text-base md:text-lg font-cinzel tracking-wider text-muted-foreground italic">
            "When Fire Meets Ice, Legends Are Born"
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#events" className="btn-fire">Explore Events</a>
            <a href="#register" className="btn-gold">Register Now</a>
          </div>
        </div>
        {/* Scroll cue — centered */}
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 animate-float pointer-events-none">
          <span className="font-cinzel text-[0.6rem] tracking-[0.45em] uppercase text-muted-foreground/50">✦ Scroll ✦</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="opacity-40">
            <path d="M1 1L6 7L11 1" stroke="hsl(43,80%,50%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ICE PARALLAX REVEAL — "THE REALM AWAITS"
          Full viewport, zero background, text floats
          directly over the ice dragon image
      ══════════════════════════════════════════ */}
      <section
        ref={iceRevealRef}
        className="relative z-10 h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "none" }}
      >
        {/* Floating ice crystal particles */}
        {isIceVisible &&
          Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              className="ice-particle"
              style={{
                left: `${(i * 41 + i * i * 2 + 3) % 94}%`,
                top: `${(i * 57 + i * 5 + 8) % 85}%`,
                animationDelay: `${(i * 0.28) % 3.5}s`,
                animationDuration: `${3.5 + (i * 0.35) % 4}s`,
                width: `${3 + (i * 6) % 11}px`,
                height: `${3 + (i * 6) % 11}px`,
              }}
            />
          ))}

        {/* Pulsing ice aura — behind text, no dark fill */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-opacity duration-1500 ${isIceVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="ice-aura" />
        </div>

        {/* ── TEXT — no wrapper background ── */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          {/* Title: letter-by-letter shatter-freeze */}
          <h2 className="font-cinzel-decorative tracking-[0.2em] text-4xl md:text-6xl lg:text-7xl mb-0 select-none leading-tight">
            {realmText.split("").map((char, i) => (
              <span
                key={i}
                className="frozen-letter"
                style={{
                  animationDelay: isIceVisible ? `${i * 0.065}s` : "9999s",
                  animationPlayState: isIceVisible ? "running" : "paused",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          {/* Animated ice divider */}
          <div
            className="section-divider-ice mx-auto my-7"
            style={{
              width: isIceVisible ? "160px" : "0px",
              transition: "width 1.4s cubic-bezier(0.22,1,0.36,1) 1.1s",
            }}
          />

          {/* Body: word-by-word frost drift */}
          <p className="font-cinzel text-base md:text-lg lg:text-xl leading-relaxed tracking-wide select-none">
            {realmBody.split(" ").map((word, i, arr) => (
              <span
                key={i}
                className="frozen-word"
                style={{
                  animationDelay: isIceVisible ? `${1.1 + i * 0.05}s` : "9999s",
                  animationPlayState: isIceVisible ? "running" : "paused",
                }}
              >
                {word}{i < arr.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVENTS — Heraldic Scrolls
      ══════════════════════════════════════════ */}
      <section
        id="events"
        className="relative z-10 py-28 px-4"
        style={{
          background:
            "linear-gradient(to bottom, hsla(220,20%,5%,0.82) 0%, hsla(220,20%,6%,0.90) 100%)",
        }}
      >
        <div className="container mx-auto">
          {/* Section heading */}
          <div className="text-center mb-20">
            <p className="font-cinzel text-xs tracking-[0.5em] uppercase text-gold/60 mb-3">— House Proclamation —</p>
            <h2 className="text-3xl md:text-5xl text-gold-gradient tracking-wider font-cinzel-decorative mb-4">
              The Grand Events
            </h2>
            <div className="section-divider-gold w-40 mx-auto" />
          </div>

          {/* Heraldic event cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <div
                key={event.name}
                className="herald-card group"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {/* Corner runes */}
                <span className="herald-corner tl">✦</span>
                <span className="herald-corner tr">✦</span>
                <span className="herald-corner bl">✦</span>
                <span className="herald-corner br">✦</span>

                {/* Top crest bar */}
                <div className="herald-crest-bar" />

                {/* Shield icon */}
                <div className="herald-shield">
                  <span className="text-2xl">{event.icon}</span>
                </div>

                {/* Content */}
                <div className="pt-6 pb-2 px-2 text-center">
                  <h3 className="font-cinzel font-bold tracking-[0.2em] uppercase text-base text-gold-gradient mb-1">
                    {event.name}
                  </h3>
                  <div className="w-10 h-px bg-gold/30 mx-auto my-3" />
                  <p className="font-cormorant italic text-muted-foreground text-lg leading-snug mb-6">
                    {event.desc}
                  </p>
                  <button className="herald-btn">
                    <span>⚜</span> Enter Lists <span>⚜</span>
                  </button>
                </div>

                {/* Bottom crest bar */}
                <div className="herald-crest-bar mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPONSORS
      ══════════════════════════════════════════ */}
      <section
        id="sponsors"
        className="relative z-10 py-28 px-4"
        style={{
          background:
            "linear-gradient(to bottom, hsla(220,20%,6%,0.90) 0%, hsla(220,25%,5%,0.88) 100%)",
        }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center text-gold-gradient mb-4 tracking-wider font-cinzel-decorative">
            Our Noble Sponsors
          </h2>
          <div className="section-divider-ice w-32 mx-auto mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor}
                className="flex items-center justify-center p-8 border border-gold/15 hover:border-ice/40 hover:glow-ice transition-all duration-500"
                style={{ background: "hsla(220,20%,8%,0.45)", backdropFilter: "blur(8px)" }}
              >
                <span className="font-cinzel text-sm md:text-base tracking-widest text-muted-foreground text-center">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          REGISTRATION
      ══════════════════════════════════════════ */}
      <section
        id="register"
        className="relative z-10 py-28 px-4"
        style={{
          background:
            "linear-gradient(to bottom, hsla(220,25%,5%,0.88) 0%, hsla(220,30%,4%,0.95) 100%)",
        }}
      >
        <div className="relative z-10 container mx-auto max-w-xl text-center">
          <h2 className="text-3xl md:text-5xl text-ice-gradient mb-4 tracking-wider font-cinzel-decorative">
            Claim Your Place
          </h2>
          <div className="section-divider-ice w-32 mx-auto mb-8" />
          <p className="text-lg text-foreground/70 mb-10 font-cinzel">
            Winter is coming. Secure your spot before the gates close.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {["Your Name", "Your Email", "College Name"].map((ph, i) => (
              <input
                key={i}
                type={ph === "Your Email" ? "email" : "text"}
                placeholder={ph}
                className="w-full px-5 py-3 bg-card/60 border border-gold/20 font-cinzel text-sm tracking-wider text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ice/50 transition-colors backdrop-blur-sm"
              />
            ))}
            <button type="submit" className="btn-ice w-full mt-4">
              Enter the Realm
            </button>
          </form>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer
        className="relative z-10 py-12 px-4 border-t border-gold/10"
        style={{ background: "hsl(220 25% 4%)" }}
      >
        <div className="container mx-auto text-center">
          <img src={prayanLogo} alt="PRAYAN'26" className="w-16 h-16 mx-auto mb-4 opacity-60" />
          <p className="font-cinzel-decorative text-gold-gradient text-lg tracking-[0.3em] mb-2">
            PRAYAN'26
          </p>
          <p className="text-sm text-muted-foreground font-cinzel tracking-wider">
            © 2026 Techno Culture Fest. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2 font-cinzel tracking-wider">
            "Fire cannot kill a dragon."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainSite;
