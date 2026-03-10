import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "MongoDB", level: 85, category: "Database", icon: "🍃" },
  { name: "Express.js", level: 82, category: "Backend", icon: "⚡" },
  { name: "React", level: 90, category: "Frontend", icon: "⚛️" },
  { name: "Node.js", level: 85, category: "Backend", icon: "🟢" },
  { name: "JavaScript", level: 92, category: "Language", icon: "🟨" },
  { name: "Python", level: 80, category: "Language", icon: "🐍" },
  { name: "C", level: 75, category: "Language", icon: "⚙️" },
  { name: "SQL", level: 78, category: "Database", icon: "🗄️" },
];

const PROJECTS = [
  {
    id: "01",
    title: "Mini E-Commerce Website",
    subtitle: "Full-Stack Shopping Platform",
    desc: "A complete e-commerce solution built with the MERN stack. Features product listings, cart management, user authentication, and a responsive storefront with real-time inventory updates.",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT", "Stripe"],
    color: "#e8c547",
    icon: "🛒",
    highlights: ["Product catalog with filters", "Cart & checkout flow", "Admin dashboard", "JWT auth"],
  },
  {
    id: "02",
    title: "Data Posting App",
    subtitle: "MERN Stack CRUD Application",
    desc: "A dynamic data management platform using MERN stack that allows users to create, read, update, and delete posts. Includes rich text editing, image uploads, and real-time updates via REST API.",
    tags: ["MongoDB", "Express", "React", "Node.js", "REST API", "Cloudinary"],
    color: "#5ec4a8",
    icon: "📊",
    highlights: ["Full CRUD operations", "Image upload support", "REST API backend", "Responsive design"],
  },
  {
    id: "03",
    title: "React Login Flow",
    subtitle: "Authentication UI System",
    desc: "A polished, production-ready authentication system built in React with login, registration, password reset, and protected route flows. Includes form validation, error handling, and smooth transitions.",
    tags: ["React", "React Router", "Context API", "Formik", "JWT", "CSS Modules"],
    color: "#a78bfa",
    icon: "🔐",
    highlights: ["Login & Register pages", "Protected routes", "Form validation", "Session management"],
  },
];

// const EXPERIENCE = [
//   { year: "2023 — Now", role: "Full Stack Developer", company: "Freelance", desc: "Building end-to-end web applications for clients using MERN stack. Delivered 3 production projects including e-commerce and data management platforms." },
//   { year: "2022 — 2023", role: "React Developer Intern", company: "Tech Startup", desc: "Developed reusable UI components, implemented authentication flows, and integrated REST APIs in a collaborative agile environment." },
// ];

// Animated skill bar
function SkillBar({ skill, visible }) {
  return (
    <div style={{
      background: "#111113",
      border: "1px solid #222228",
      borderRadius: 12,
      padding: "20px 22px",
      transition: "border-color 0.3s, transform 0.3s",
      cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = skill.color || "#e8c547"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#222228"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>{skill.icon}</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, color: "#e8e4d8", letterSpacing: "0.03em" }}>{skill.name}</span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#e8c547" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 3, background: "#222228", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #e8c547, #f0d060)",
          borderRadius: 4,
          width: visible ? `${skill.level}%` : "0%",
          transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
      <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase" }}>{skill.category}</div>
    </div>
  );
}

// Project card
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111113" : "#0d0d0f",
        border: `1px solid ${hovered ? project.color : "#222228"}`,
        borderRadius: 16,
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${project.color}18` : "none",
        cursor: "default",
      }}
    >
      {/* Glow bg */}
      <div style={{
        position: "absolute", top: -60, right: -60,
        width: 200, height: 200,
        background: `radial-gradient(circle, ${project.color}15, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: `${project.color}18`,
            border: `1px solid ${project.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>{project.icon}</div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: project.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 }}>Project {project.id}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#e8e4d8", letterSpacing: "-0.02em" }}>{project.title}</div>
          </div>
        </div>
        <div style={{
          fontSize: 18, color: hovered ? project.color : "#333",
          transition: "all 0.3s",
          transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
        }}>↗</div>
      </div>

      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: project.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>{project.subtitle}</div>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.75, marginBottom: 24 }}>{project.desc}</p>

      {/* Highlights */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
        {project.highlights.map(h => (
          <div key={h} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: project.color, flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#666" }}>{h}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map(t => (
          <span key={t} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#555",
            border: "1px solid #222228",
            borderRadius: 6,
            padding: "3px 9px",
            transition: "border-color 0.3s, color 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#222228"; e.currentTarget.style.color = "#555"; }}
          >{t}</span>
        ))}
      </div>
    </div>
  );
}

// Reveal hook
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// Section wrapper with reveal
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.1 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#08080a", minHeight: "100vh", fontFamily: "'Syne', sans-serif", color: "#e8e4d8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08080a; }
        ::-webkit-scrollbar-thumb { background: #e8c547; border-radius: 2px; }
        ::selection { background: #e8c54730; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1a1a1f" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #e8c547, #f0d060)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#08080a"
          }}>CM</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#e8e4d8" }}>CHENNAPATANAM MUNIPRASAD</span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: activeSection === link ? "#e8c547" : "#666",
                padding: "6px 14px", borderRadius: 6,
                transition: "color 0.3s, background 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#ffffff08"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >{link}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 40px 60px",
        maxWidth: 1100, margin: "0 auto",
        position: "relative",
      }}>
        {/* Decorative grid bg */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            {/* Status badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#0d1a0d", border: "1px solid #1a3a1a",
              borderRadius: 20, padding: "6px 14px", marginBottom: 32,
              animation: "fadeIn 0.6s ease forwards",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4ade80", letterSpacing: "0.1em" }}>Available for work</span>
            </div>

            <h1 style={{
              fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 800,
              lineHeight: 1.0, letterSpacing: "-0.04em",
              marginBottom: 24,
              opacity: 0,
              animation: "fadeUpIn 0.8s 0.2s forwards",
            }}>
              <span style={{ color: "#e8e4d8" }}>Full Stack</span><br />
              <span style={{ color: "#e8c547" }}>Developer</span><br />
              <span style={{ color: "#e8e4d8", fontStyle: "italic", fontWeight: 700 }}>&amp; Builder</span>
            </h1>

            <p style={{
              fontSize: 16, color: "#666", lineHeight: 1.8, maxWidth: 420, marginBottom: 40,
              opacity: 0, animation: "fadeUpIn 0.8s 0.4s forwards",
            }}>
              I build fast, scalable web applications using the <span style={{ color: "#e8c547" }}>MERN stack</span>. From database to UI — I own the full product lifecycle.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", opacity: 0, animation: "fadeUpIn 0.8s 0.6s forwards" }}>
              <button onClick={() => scrollTo("Projects")} style={{
                background: "#e8c547", color: "#08080a",
                border: "none", borderRadius: 8,
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
                letterSpacing: "0.05em", padding: "13px 28px",
                cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f0d060"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#e8c547"; e.currentTarget.style.transform = "translateY(0)"; }}
              >View Projects ↗</button>
              <button onClick={() => scrollTo("Contact")} style={{
                background: "none", color: "#888",
                border: "1px solid #222228", borderRadius: 8,
                fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13,
                padding: "13px 28px", cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#e8c547"; e.currentTarget.style.color = "#e8c547"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#222228"; e.currentTarget.style.color = "#888"; }}
              >Contact Me</button>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: 0, animation: "fadeIn 1s 0.5s forwards" }}>
            <div style={{ position: "relative" }}>
              {/* Main avatar card */}
              <div style={{
                width: 300, height: 360,
                background: "linear-gradient(145deg, #111113, #0d0d0f)",
                border: "1px solid #222228",
                borderRadius: 20,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                animation: "float 5s ease-in-out infinite",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(circle at 50% 30%, rgba(232,197,71,0.08), transparent 60%)",
                }} />
                <div style={{
                  width: 100, height: 100, borderRadius: "50%",
                  background: "linear-gradient(135deg, #e8c547, #f0d060)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 40, fontWeight: 800, color: "#08080a",
                  fontFamily: "'Syne', sans-serif",
                  marginBottom: 20, position: "relative", zIndex: 1,
                }}>CM</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#e8e4d8", zIndex: 1, textAlign:"center" }}>CHENNAPATNAM MUNIPRASAD</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#e8c547", letterSpacing: "0.12em", marginTop: 6, zIndex: 1 }}>MERN STACK DEV</div>
                <div style={{ display: "flex", gap: 12, marginTop: 24, zIndex: 1 }}>
                  {["⚛️", "🟢", "🍃", "🐍"].map((icon, i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: "#0a0a0c", border: "1px solid #222228",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16,
                    }}>{icon}</div>
                  ))}
                </div>
              </div>

              {/* Floating stat cards */}
              {[
                { label: "Projects", value: "3+", top: 30, right: -70, color: "#e8c547" },
                { label: "Stack", value: "MERN", bottom: 60, left: -70, color: "#5ec4a8" },
              ].map(card => (
                <div key={card.label} style={{
                  position: "absolute",
                  top: card.top, right: card.right,
                  bottom: card.bottom, left: card.left,
                  background: "#111113",
                  border: `1px solid ${card.color}40`,
                  borderRadius: 12,
                  padding: "12px 16px",
                  minWidth: 80,
                  animation: "float 4s ease-in-out infinite",
                  animationDelay: `${Math.random()}s`,
                }}>
                  <div style={{ fontWeight: 800, fontSize: 22, color: card.color, fontFamily: "'Syne', sans-serif" }}>{card.value}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeUpIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        `}</style>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: "1px solid #1a1a1f", borderBottom: "1px solid #1a1a1f", background: "#0d0d0f", padding: "16px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 48, animation: "marquee 18s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].flatMap(() =>
            ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "Python", "C", "SQL", "REST API", "JWT", "Git", "Figma"].map((item, i) => (
              <span key={`${item}-${i}`} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase", flexShrink: 0 }}>
                {item} <span style={{ color: "#e8c547", marginLeft: 48 }}>✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }} ref={skillsRef}>
        <Reveal>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: "#e8c547", textTransform: "uppercase", marginBottom: 12 }}>02 — Skills</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 60, color: "#e8e4d8" }}>
            Tech I work <span style={{ color: "#e8c547", fontStyle: "italic" }}>with</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 0.06}>
              <SkillBar skill={skill} visible={skillsVisible} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 40px", background: "#0b0b0d" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: "#e8c547", textTransform: "uppercase", marginBottom: 12 }}>03 — Projects</div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 60, color: "#e8e4d8" }}>
              Things I've <span style={{ color: "#5ec4a8", fontStyle: "italic" }}>built</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE
      <section id="experience" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: "#e8c547", textTransform: "uppercase", marginBottom: 12 }}>04 — Experience</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 60, color: "#e8e4d8" }}>
            Where I've <span style={{ color: "#a78bfa", fontStyle: "italic" }}>worked</span>
          </h2>
        </Reveal>
        <div style={{ maxWidth: 720 }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                display: "grid", gridTemplateColumns: "150px 1fr", gap: 40,
                padding: "36px 0",
                borderBottom: i < EXPERIENCE.length - 1 ? "1px solid #1a1a1f" : "none",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#e8c547", letterSpacing: "0.1em", paddingTop: 4 }}>{e.year}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4, color: "#e8e4d8" }}>{e.role}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#5ec4a8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{e.company}</div>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75 }}>{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section> */}

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 40px", background: "#0b0b0d", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: "#e8c547", textTransform: "uppercase", marginBottom: 12 }}>05 — Contact</div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20, color: "#e8e4d8" }}>
              Let's build<br /><span style={{ color: "#e8c547", fontStyle: "italic" }}>something great</span>
            </h2>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 48, lineHeight: 1.7 }}>
              Open to new opportunities, freelance projects, or just a good conversation about tech.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="mailto:you@email.com" style={{
              display: "inline-block",
              fontSize: "clamp(18px, 3vw, 28px)",
              fontWeight: 700,
              color: "#e8e4d8",
              textDecoration: "none",
              borderBottom: "2px solid #222228",
              paddingBottom: 6,
              marginBottom: 52,
              transition: "color 0.3s, border-color 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#e8c547"; e.currentTarget.style.borderColor = "#e8c547"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#e8e4d8"; e.currentTarget.style.borderColor = "#222228"; }}
            >ch.muniprasad06@gmail.com</a>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
             {[
  { name: "GitHub", url: "https://github.com/muniprasadchennapatnam" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ch-muni-prasad-51b8a8330/" },
  
].map(s => (
  <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
    style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      letterSpacing: "0.15em", textTransform: "uppercase",
      color: "#555", textDecoration: "none",
      border: "1px solid #222228", borderRadius: 8,
      padding: "10px 20px",
      transition: "all 0.3s",
    }}
    onMouseEnter={e => { e.currentTarget.style.color = "#e8c547"; e.currentTarget.style.borderColor = "#e8c547"; e.currentTarget.style.background = "#e8c54710"; }}
    onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#222228"; e.currentTarget.style.background = "none"; }}
  >{s.name} ↗</a>
))}
             
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "28px 40px",
        borderTop: "1px solid #1a1a1f",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#333", letterSpacing: "0.08em" }}>© 2026 CHENNAPATNAM MUNIPRASAD — All rights reserved</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#333", letterSpacing: "0.08em", fontStyle: "italic" }}>Built with React ⚛️</span>
      </footer>
    </div>
  );
}
