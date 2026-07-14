import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#09090B",
  bgCard: "#111113",
  bgCardHover: "#18181B",
  border: "#27272A",
  cyan: "#22D3EE",
  blue: "#3B82F6",
  purple: "#A855F7",
  white: "#FAFAFA",
  gray: "#A1A1AA",
  grayDark: "#71717A",
};

const gradientText = {
  background: "linear-gradient(90deg, #22D3EE, #3B82F6, #A855F7)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const glowBar = (pct) => ({
  height: "3px",
  borderRadius: "9999px",
  background: `linear-gradient(90deg, #22D3EE, #3B82F6, #A855F7)`,
  width: `${pct}%`,
  transition: "width 1s ease",
});

const styles = {
  root: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    background: COLORS.bg,
    color: COLORS.white,
    minHeight: "100vh",
    lineHeight: 1.6,
    overflowX: "hidden",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "rgba(9,9,11,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "0 2rem",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {
    padding: "100px 2rem 60px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.15em",
    color: COLORS.cyan,
    textTransform: "uppercase",
    marginBottom: "12px",
    fontWeight: 500,
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 700,
    marginBottom: "16px",
    lineHeight: 1.15,
  },
  card: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "24px",
    transition: "border-color 0.2s, background 0.2s",
  },
  pill: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "9999px",
    border: `1px solid ${COLORS.border}`,
    fontSize: "11px",
    color: COLORS.gray,
    marginRight: "6px",
    marginBottom: "6px",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    border: `1px solid ${COLORS.border}`,
    background: "transparent",
    color: COLORS.white,
    transition: "background 0.2s, border-color 0.2s",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #22D3EE22, #3B82F622)",
    border: `1px solid ${COLORS.cyan}`,
    color: COLORS.cyan,
  },
};

const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Projects", "Education", "Certifications", "Contact"];

function NavBar({ active, onNav }) {
  return (
    <nav style={styles.nav}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "linear-gradient(135deg,#22D3EE,#A855F7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: "#fff",
        }}>PS</span>
        <span style={{ fontSize: "13px", fontWeight: 600, color: COLORS.white }}>Pawan Shinde</span>
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {NAV_LINKS.map(n => (
          <button key={n} onClick={() => onNav(n)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "12px", padding: "4px 8px", borderRadius: 6,
              color: active === n ? COLORS.cyan : COLORS.gray,
              fontWeight: active === n ? 600 : 400,
              transition: "color 0.2s",
            }}>{n}</button>
        ))}
        <button
        style={{
          ...styles.btn,
          ...styles.btnPrimary,
          marginLeft: "8px",
          padding: "5px 12px",
          fontSize: "11px",
        }}
      >
        <a
          href="Pawan_Shinde_Robotics_Resume.pdf"
          download
          style={{ color: "white", textDecoration: "none" }}
        >
          Resume
        </a>
      </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const phrases = ["Autonomous Mobile Robot Engineer", "ROS 2 Developer", "SLAM & Navigation Specialist"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const phrase = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === phrase.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIdx.current--;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 40 : 60);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 2rem 60px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "20%", right: "5%", width: "420px", height: "420px",
        borderRadius: "50%", background: "radial-gradient(circle, #22D3EE08 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: "40%", left: "60%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, #A855F708 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", border: `1px solid ${COLORS.border}`, borderRadius: "9999px", padding: "4px 12px", fontSize: "11px", color: COLORS.cyan, marginBottom: "24px", letterSpacing: "0.1em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.cyan, display: "inline-block" }} />
            AVAILABLE · ROBOTICS SWE
          </div>
          <p style={{ fontSize: "18px", color: COLORS.gray, marginBottom: "8px" }}>Hi, I'm</p>
          <h1 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Pawan Shinde
            <br />
            <span style={gradientText}>Robotics Software<br />Engineer</span>
          </h1>
          <div style={{ fontSize: "14px", color: COLORS.cyan, fontFamily: "monospace", marginBottom: "20px", height: "22px" }}>
            &gt; {typed}<span style={{ opacity: Math.sin(Date.now() / 400) > 0 ? 1 : 0 }}>|</span>
          </div>
          <p style={{ fontSize: "15px", color: COLORS.gray, maxWidth: "480px", marginBottom: "32px", lineHeight: 1.7 }}>
            Junior Robotics Software Engineer with industry experience developing autonomous mobile robots using ROS 2, C++, Python, Nav2, Gazebo, SLAM, AMCL and Linux.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#projects" style={{ ...styles.btn, ...styles.btnPrimary }}>View Projects →</a>
            <a href="Pawan_Shinde_Robotics_Resume.pdf"style={{ ...styles.btn, ...styles.btnPrimary }} download class="btn btn-secondary">Download Resume</a>
            <a href="#contact" style={styles.btn}>✉ Contact Me</a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative", width: "280px", height: "280px" }}>
            <div style={{ position: "absolute", inset: 0, border: `1px solid ${COLORS.cyan}40`, borderRadius: "16px", transform: "rotate(8deg)" }} />
            <div style={{ position: "absolute", inset: "10px", border: `1px solid ${COLORS.purple}40`, borderRadius: "12px", transform: "rotate(-4deg)" }} />
            <div style={{
              position: "absolute", inset: "20px",
              background: "linear-gradient(135deg, #111113, #1a1a2e)",
              borderRadius: "10px", border: `1px solid ${COLORS.border}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px"
            }}>
              <div style={{ width: "80px", height: "50px", border: `2px solid ${COLORS.cyan}`, borderRadius: "8px", position: "relative" }}>
                <div style={{ position: "absolute", bottom: "-12px", left: "50%", transform: "translateX(-50%)", width: "50px", height: "10px", borderLeft: `2px solid ${COLORS.cyan}`, borderRight: `2px solid ${COLORS.cyan}`, borderBottom: `2px solid ${COLORS.cyan}`, borderRadius: "0 0 4px 4px" }} />
                <div style={{ position: "absolute", top: "-6px", left: "50%", transform: "translateX(-50%)", width: "10px", height: "10px", borderRadius: "50%", background: COLORS.cyan, boxShadow: `0 0 8px ${COLORS.cyan}` }} />
              </div>
              <div style={{ fontSize: "10px", color: COLORS.cyan, fontFamily: "monospace", letterSpacing: "0.1em" }}>● ROS2</div>
              <div style={{ width: "100px", height: "2px", background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)` }} />
              <div style={{ display: "flex", gap: "8px" }}>
                {["SLAM", "Nav2", "AMCL"].map(t => (
                  <span key={t} style={{ fontSize: "9px", color: COLORS.gray, border: `1px solid ${COLORS.border}`, borderRadius: "4px", padding: "2px 6px" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { n: "6+", label: "MONTHS INDUSTRY\nEXPERIENCE" },
    { n: "8.68", label: "CGPA — B.TECH AMR" },
    { n: "2", label: "END-TO-END ROS 2\nPROJECTS" },
    { n: "10+", label: "ROS 2 PACKAGES USED" },
  ];
  return (
    <section id="about" style={styles.section}>
      <p style={styles.eyebrow}>01 — ABOUT</p>
      <h2 style={styles.sectionTitle}>About <span style={gradientText}>Me</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px", alignItems: "start" }}>
        <div>
          <p style={{ color: COLORS.gray, fontSize: "15px", marginBottom: "16px", lineHeight: 1.75 }}>
            I'm a Robotics Software Engineer focused on building reliable autonomy stacks for Autonomous Mobile Robots. My core craft sits at the intersection of ROS 2, Navigation2, Gazebo simulation, and the SLAM + AMCL pipeline that makes a robot understand where it is and how to move.
          </p>
          <p style={{ color: COLORS.gray, fontSize: "15px", marginBottom: "16px", lineHeight: 1.75 }}>
            During my internship at Kody Technolab, I shipped production-grade ROS 2 nodes in C++ and Python — from URDF/Xacro modeling and sensor-fused Gazebo simulation to full Nav2 deployments tuned with NavFn, DWB and Costmap2D. I love the layers where math meets motion: TF2 trees, particle filters, behavior trees, and the small parameter changes that turn a fragile demo into a robot that actually works.
          </p>
          <p style={{ color: COLORS.gray, fontSize: "15px", lineHeight: 1.75 }}>
            Right now, I'm especially obsessed with solving the symmetric-corridor localization problem — a real-world warehouse AMR failure mode where standard AMCL gives up. My variance-based adaptive AMCL approach makes localization context-aware, and validating it in Gazebo taught me that great robotics software is mostly great engineering hygiene.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {stats.map(s => (
            <div key={s.n} style={{ ...styles.card, textAlign: "left" }}>
              <div style={{ fontSize: "2rem", fontWeight: 700, ...gradientText, marginBottom: "6px" }}>{s.n}</div>
              <div style={{ fontSize: "10px", color: COLORS.grayDark, letterSpacing: "0.08em", lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SKILL_GROUPS = [
  {
    title: "Programming", count: 2,
    skills: [{ name: "C++", pct: 88 }, { name: "Python", pct: 98 }]
  },
  {
    title: "Robotics", count: 7,
    skills: [
      { name: "ROS 2 (Humble)", pct: 92 }, { name: "Navigation2 (Nav2)", pct: 88 },
      { name: "ros2_control", pct: 68 }, { name: "Gazebo", pct: 85 },
      { name: "RViz", pct: 88 }, { name: "URDF/Xacro", pct: 84 }, { name: "TF2", pct: 84 },
    ]
  },
  {
    title: "Localization", count: 5,
    skills: [
      { name: "SLAM Toolbox", pct: 86 }, { name: "Cartographer", pct: 78 },
      { name: "AMCL", pct: 68 }, { name: "EKF", pct: 72 }, { name: "Sensor Fusion", pct: 76 },
    ]
  },
  {
    title: "Navigation", count: 4,
    skills: [
      { name: "NavFn Planner", pct: 84 }, { name: "DWB Controller", pct: 82 },
      { name: "Costmap2D", pct: 84 }, { name: "Behavior Trees", pct: 74 },
    ]
  },
  {
    title: "Perception", count: 4,
    skills: [
      { name: "2D LiDAR", pct: 86 }, { name: "IMU", pct: 78 },
      { name: "Depth Camera", pct: 74 }, { name: "Point Cloud", pct: 78 },
    ]
  },
  {
    title: "Development", count: 4,
    skills: [
      { name: "Git", pct: 86 }, { name: "Docker", pct: 68 },
      { name: "Ubuntu", pct: 98 }, { name: "VS Code", pct: 92 },
    ]
  },
];

function SkillsSection() {
  return (
    <section id="skills" style={{ ...styles.section, background: "#0a0a0c" }}>
      <p style={styles.eyebrow}>02 — SKILLS</p>
      <h2 style={styles.sectionTitle}>Technical <span style={gradientText}>Stack</span></h2>
      <p style={{ color: COLORS.gray, fontSize: "14px", marginBottom: "40px" }}>The toolbox behind every robot I ship — from low-level UART comms to behavior trees and adaptive localization.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {SKILL_GROUPS.map(g => (
          <div key={g.title} style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span style={{ fontWeight: 600, fontSize: "15px" }}>{g.title}</span>
              <span style={{ fontSize: "10px", color: COLORS.grayDark, letterSpacing: "0.1em" }}>{g.count} SKILLS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {g.skills.map(s => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "13px", color: COLORS.gray }}>{s.name}</span>
                    <span style={{ fontSize: "12px", color: COLORS.cyan }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: "3px", background: COLORS.border, borderRadius: "9999px" }}>
                    <div style={glowBar(s.pct)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const bullets = [
    "Designed and deployed custom ROS 2 nodes in C++ and Python for a differential drive AMR — robot monitoring, battery management over UART with an STM32 controller, and autonomous navigation control.",
    "Engineered custom ROS 2 interfaces (messages, services, actions) enabling modular communication between navigation, monitoring and hardware-abstraction layers.",
    "Built a sensor-fused differential drive robot in Gazebo using URDF/Xacro with 2D LiDAR, IMU and Depth Camera plugins, replicating real-world perception pipelines.",
    "Implemented the full autonomy pipeline — SLAM Toolbox for mapping, AMCL for localization, Nav2 for planning — tuning NavFn, DWB and Costmap2D for navigation reliability.",
    "Automated full robot bringup (simulation, mapping, localization, navigation) using modular ROS 2 launch files, improving team reproducibility.",
    "Investigated production localization failures in symmetric corridor environments and contributed engineering solutions evaluated via structured Gazebo experiments.",
  ];
  const tags = ["ROS 2", "C++", "Python", "Nav2", "SLAM Toolbox", "AMCL", "Gazebo", "URDF", "UART", "STM32"];

  return (
    <section id="experience" style={styles.section}>
      <p style={styles.eyebrow}>03 — EXPERIENCE</p>
      <h2 style={styles.sectionTitle}>Where I've <span style={gradientText}>Built</span></h2>
      <div style={{ ...styles.card, borderLeft: `3px solid ${COLORS.cyan}`, borderRadius: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
          <div>
            <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>Robotics Software Engineering Intern</h3>
            <div style={{ color: COLORS.cyan, fontSize: "13px", fontWeight: 500 }}>Kody Technolab Pvt. Ltd.</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: COLORS.gray }}>🗓 Jan 2026 – Jun 2026</div>
            <div style={{ fontSize: "12px", color: COLORS.grayDark }}>📍 Ahmedabad, India</div>
          </div>
        </div>
        <ul style={{ paddingLeft: "16px", margin: "20px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ fontSize: "13px", color: COLORS.gray, lineHeight: 1.6 }}>{b}</li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
          {tags.map(t => <span key={t} style={styles.pill}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    id: "01",
    title: "Variance-Based Adaptive AMCL Localization",
    subtitle: "for Symmetric Corridor Environments",
    github:"https://github.com/pawanshinde7218/adaptive-amcl-corridor-navigation",
    readmore:"https://github.com/pawanshinde7218/adaptive-amcl-corridor-navigation/blob/main/README.md",
    tags: ["ROS 2", "Python", "Nav2", "AMCL", "SLAM Toolbox", "Gazebo", "+3"],
    problem: "Standard AMCL particle filters fail in symmetric long-corridor environments due to ambiguous LiDAR scan distributions — a known production failure mode in warehouse AMR deployments.",
    solution: "A variance-based ROS 2 Python node that analyzes 2D LiDAR scans to classify the environment as symmetric or asymmetric, then dynamically retunes AMCL via ROS 2 services for context-aware localization.",
    color: COLORS.cyan,
  },
  {
    id: "02",
    title: "Full-Stack Autonomous Mobile Robot",
    subtitle: "Modeling, Mapping, Localization & Navigation",
    github:
      "https://github.com/pawanshinde7218/ros2-amr-navigation",
    readmore:"https://github.com/pawanshinde7218/ros2-amr-navigation/blob/main/README.md",
    tags: ["ROS 2", "C++", "Python", "Nav2", "SLAM Toolbox", "AMCL", "+1"],
    problem: "Build an end-to-end AMR stack — from accurate robot modeling and physics-based simulation to autonomous navigation in a custom environment.",
    solution: "A modular ROS 2 pipeline with differential-drive URDF/Xacro modeling, sensor-emulated Gazebo simulation, SLAM Toolbox mapping, AMCL localization and Nav2 planning — all launchable with a single command.",
    color: COLORS.purple,
  },
];

function ProjectsSection() {
  return (
    <section id="projects" style={{ ...styles.section, background: "#0a0a0c" }}>
      <p style={styles.eyebrow}>04 — PROJECTS</p>

      <h2 style={styles.sectionTitle}>
        Featured <span style={gradientText}>Work</span>
      </h2>

      <p
        style={{
          color: COLORS.gray,
          fontSize: "14px",
          marginBottom: "40px",
        }}
      >
        Two end-to-end ROS 2 robotics projects — one explores adaptive AMCL
        localization in symmetric corridor environments, while the other
        implements the complete AMR navigation stack from robot modeling to
        autonomous navigation.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            style={{
              ...styles.card,
              border: `1px solid ${p.color}30`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "10px",
                color: p.color,
                border: `1px solid ${p.color}50`,
                borderRadius: "9999px",
                padding: "2px 8px",
                letterSpacing: "0.1em",
              }}
            >
              ⭐ FEATURED
            </div>

            <div
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                color: COLORS.grayDark,
                marginBottom: "12px",
              }}
            >
              · /projects/
              {p.id === "01"
                ? "adaptive-amcl.launch.py"
                : "amr-navigation.launch.py"}
            </div>

            <div
              style={{
                height: "120px",
                background: `linear-gradient(135deg, ${p.color}15, ${COLORS.purple}10)`,
                borderRadius: "8px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${p.color}20`,
              }}
            >
              <div style={{ fontSize: "32px" }}>
                {p.id === "01" ? "📡" : "🤖"}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginBottom: "14px",
              }}
            >
              {p.tags.map((t) => (
                <span key={t} style={styles.pill}>
                  {t}
                </span>
              ))}
            </div>

            <div
              style={{
                fontSize: "10px",
                color: p.color,
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}
            >
              PROJECT {p.id}
            </div>

            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "2px",
              }}
            >
              {p.title}
            </h3>

            <p
              style={{
                fontSize: "12px",
                color: COLORS.grayDark,
                marginBottom: "14px",
              }}
            >
              {p.subtitle}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  background: "#0f0f11",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#EF4444",
                    letterSpacing: "0.1em",
                    marginBottom: "6px",
                  }}
                >
                  PROBLEM
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    color: COLORS.gray,
                    lineHeight: 1.5,
                  }}
                >
                  {p.problem}
                </p>
              </div>

              <div
                style={{
                  background: "#0f0f11",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#22C55E",
                    letterSpacing: "0.1em",
                    marginBottom: "6px",
                  }}
                >
                  SOLUTION
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    color: COLORS.gray,
                    lineHeight: 1.5,
                  }}
                >
                  {p.solution}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.btn,
                  fontSize: "12px",
                  padding: "6px 12px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🐙 GitHub
              </a>

              <a
                href={p.readmore}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.btn,
                  fontSize: "12px",
                  padding: "6px 12px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                📖 Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  const edu = [
    { degree: "B.Tech — Automation & Robotics", school: "Savitribai Phule Pune University", grade: "CGPA 8.68 / 10", date: "Jun 2026" },
    { degree: "HSC (Higher Secondary)", school: "Super Thirty Junior College", grade: "95.00 %", date: "Mar 2021" },
    { degree: "SSC (Secondary)", school: "Vidya Vikas Madhyamic Vidyalay", grade: "83.60 %", date: "Mar 2019" },
  ];
  return (
    <section id="education" style={styles.section}>
      <p style={styles.eyebrow}>05 — EDUCATION</p>
      <h2 style={styles.sectionTitle}>Academic <span style={gradientText}>Journey</span></h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {edu.map((e, i) => (
          <div key={i} style={{ ...styles.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${COLORS.cyan}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>✓</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "15px" }}>{e.degree}</div>
                <div style={{ fontSize: "13px", color: COLORS.grayDark }}>{e.school}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.cyan }}>{e.grade}</div>
              <div style={{ fontSize: "12px", color: COLORS.grayDark }}>🗓 {e.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection() {
  const certs = [
    { icon: "🛡", title: "Robotics Internship Completion Certificate", issuer: "Kody Technolab Pvt. Ltd." },
    { icon: "</>", title: "Python Programming", issuer: "Infosys Springboard" },
  ];
  return (
    <section id="certifications" style={{ ...styles.section, background: "#0a0a0c" }}>
      <p style={styles.eyebrow}>06 — CERTIFICATIONS</p>
      <h2 style={styles.sectionTitle}>Continuous <span style={gradientText}>Learning</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {certs.map((c, i) => (
          <div key={i} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: 36, height: 36, borderRadius: "8px", background: `linear-gradient(135deg, ${COLORS.cyan}20, ${COLORS.purple}20)`, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{c.icon}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "13px" }}>{c.title}</div>
              <div style={{ fontSize: "12px", color: COLORS.grayDark }}>{c.issuer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "PAWAN SHINDE", email: "", subject: "", message: "" });
  const contacts = [
    { icon: "✉", label: "EMAIL", value: "pawanshinde1130@gmail.com" },
    { icon: "📞", label: "PHONE", value: "+91 8999387495" },
    { icon: "📍", label: "LOCATION", value: "Pune, India" },
    { icon: "💼", label: "LINKEDIN", value: "pawan-shinde-ps12" },
    { icon: "🐙", label: "GITHUB", value: "pawanshinde7218" },
  ];
  return (
    <section id="contact" style={styles.section}>
      <p style={styles.eyebrow}>07 — CONTACT</p>
      <h2 style={styles.sectionTitle}>Let's Build <span style={gradientText}>Robots</span></h2>
      <p style={{ color: COLORS.gray, fontSize: "14px", marginBottom: "40px" }}>Hiring for a robotics role, collaborating on an AMR side-quest, or just curious about adaptive AMCL? Drop me a line — I read every message.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {contacts.map(c => (
            <div key={c.label} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px" }}>
              <div style={{ width: 32, height: 32, borderRadius: "8px", background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: "9px", color: COLORS.grayDark, letterSpacing: "0.1em" }}>{c.label}</div>
                <div style={{ fontSize: "13px", color: COLORS.white }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #111113, #12101a)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label style={{ fontSize: "10px", color: COLORS.grayDark, letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>NAME</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ width: "100%", background: "#0a0a0c", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.white, fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "10px", color: COLORS.grayDark, letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>EMAIL</label>
              <input placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ width: "100%", background: "#0a0a0c", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.white, fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "10px", color: COLORS.grayDark, letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>SUBJECT</label>
            <input placeholder="Robotics SWE Opportunity" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
              style={{ width: "100%", background: "#0a0a0c", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.white, fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "10px", color: COLORS.grayDark, letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>MESSAGE</label>
            <textarea placeholder="Tell me about the role, the robots, the timeline..." rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ width: "100%", background: "#0a0a0c", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.white, fontSize: "13px", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>
          <button style={{ ...styles.btn, ...styles.btnPrimary, width: "auto" }}>✈ Send Message</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "20px 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: COLORS.grayDark }}>
      <span>© 2026 Pawan Shinde. All rights reserved.</span>
      <span>Made with ❤️ using React + Tailwind</span>
      <div style={{ display: "flex", gap: "12px" }}>
        <a href="#" style={{ color: COLORS.grayDark, textDecoration: "none" }}>🐙</a>
        <a href="#" style={{ color: COLORS.grayDark, textDecoration: "none" }}>💼</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");

  const scrollTo = (section) => {
    setActiveSection(section);
    const el = document.getElementById(section.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.root}>
      <NavBar active={activeSection} onNav={scrollTo} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}