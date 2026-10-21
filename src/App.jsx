import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Menu,
  Send,
  X,
} from "lucide-react";
import "./App.css";

const NAV_ITEMS = [
  { label: "Work", href: "#work", index: "01" },
  { label: "Projects", href: "#projects", index: "02" },
  { label: "About", href: "#about", index: "03" },
  { label: "Chat", href: "#chat", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
];

const SKILLS = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "JavaScript",
  "HTML5 & CSS3",
  "Bootstrap",
  "Node.js",
  "MongoDB",
  "Git",
  "Figma",
  "Postman",
  "Python",
  "Responsive design",
];

const EDUCATION = [
  {
    degree: "BS Software Engineering",
    school: "Capital University of Science and Technology, Islamabad",
    year: "2022",
  },
  {
    degree: "F.Sc Pre-Engineering",
    school: "Jinnah Muslim School and College, Islamabad",
    year: "2018",
  },
];

const WORK_ITEMS = [
  {
    id: "ybtech",
    number: "01",
    title: "YbTech",
    subtitle: "Websites built to feel effortless.",
    category: "Web development · React · Tailwind",
    year: "2022—24",
    theme: "blue",
    storyLabel: "The role",
    resultsLabel: "What I did",
    description:
      "At YbTech, I worked alongside designers and backend developers to build responsive, high-performance websites. I turned designs into reusable React components and shipped dynamic features that kept the front end clean, fast, and easy to maintain.",
    results: [
      "Built and maintained responsive websites with React.js, Tailwind CSS, and JavaScript",
      "Created reusable components and dynamic features that improved page performance",
      "Collaborated closely with designers and backend developers to sharpen the user experience",
    ],
    tags: ["React.js", "Tailwind CSS", "JavaScript", "Responsive UI"],
  },
  {
    id: "aqg",
    number: "02",
    title: "Question Generator",
    subtitle: "Turning raw text into exam-ready questions.",
    category: "Final year project · NLP · Python",
    year: "2022",
    theme: "lime",
    storyLabel: "The project",
    resultsLabel: "What I built",
    description:
      "My final-year project: a desktop application that uses natural language processing to turn source text into exam-style questions. It was built to make assessment faster and more consistent for educators — and to explore how much structure you can pull out of plain text.",
    results: [
      "Built a desktop application in Python using natural language processing",
      "Generated exam-style questions automatically from supplied text",
      "Designed a focused interface for generating and reviewing questions",
    ],
    tags: ["Python", "NLP", "Desktop app", "Problem solving"],
  },
  {
    id: "pk2100",
    number: "03",
    title: "PK2100",
    subtitle: "A front-end foundation, built one component at a time.",
    category: "Frontend development · Bootstrap · UI",
    year: "2021",
    theme: "pink",
    storyLabel: "The role",
    resultsLabel: "What I learned",
    description:
      "At PK2100 Technology and Business Solutions, I built UI components and interactive layouts using HTML, CSS, and Bootstrap. Working with senior developers taught me how production front ends come together — and how to debug, optimize, and keep a layout responsive.",
    results: [
      "Created UI components and interactive layouts with HTML, CSS, and Bootstrap",
      "Debugged and optimized front-end code alongside senior developers",
      "Strengthened my understanding of responsive design and client-side logic",
    ],
    tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
  },
];

const PROJECTS = [
  {
    id: "portfolio-3d",
    number: "01",
    title: "3D-Portfolio Website",
    subtitle: "A personal site with depth — literally.",
    category: "Personal project · React · Three.js",
    year: "Live project",
    theme: "mint",
    storyLabel: "The project",
    resultsLabel: "What I built",
    description:
      "A modern, responsive 3D portfolio built with React, TailwindCSS, and Three.js.",
    results: [
      "Built a responsive 3D portfolio in the browser",
      "Used React, TailwindCSS, and Three.js",
    ],
    tags: ["React", "TailwindCSS", "Three.js"],
    liveUrl: "https://3d-portfolio-gamma-snowy.vercel.app/",
    image: "/projects/portfoliowebsite.png",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-commerce Website",
    subtitle: "A restaurant storefront, from menu to checkout.",
    category: "E-commerce · MERN · Restaurant",
    year: "Live project",
    theme: "crimson",
    storyLabel: "The project",
    resultsLabel: "What I built",
    description:
      "A modern, responsive e-commerce restaurant website built with React, Node.js, MongoDB, and Express.js.",
    results: [
      "Built a responsive restaurant e-commerce storefront",
      "Used React, Material UI, Node.js, MongoDB, and Express.js",
    ],
    tags: ["React.js", "MaterialUI", "MongoDB", "Express.js"],
    liveUrl: "https://owner.tapandeat.co/",
    image: "/projects/project5.png",
  },
  {
    id: "notes-app",
    number: "03",
    title: "Notes App",
    subtitle: "Real-time notes, built on the MERN stack.",
    category: "Full-stack · Real-time · MERN",
    year: "Live project",
    theme: "burgundy",
    storyLabel: "The project",
    resultsLabel: "What I built",
    description:
      "A modern, responsive real-time notes application built with React, Node.js, MongoDB, and Express.js.",
    results: [
      "Built a real-time notes application",
      "Used React, Node.js, MongoDB, Express.js, and DaisyUI",
    ],
    tags: ["React.js", "Node.js", "MongoDB", "DaisyUI"],
    liveUrl: "https://thinkboard-mern-8xlc.onrender.com/",
    image: "/projects/project3.png",
  },
  {
    id: "learning-platform",
    number: "04",
    title: "Learning Platform",
    subtitle: "A full-stack platform for robotics and drones.",
    category: "Learning platform · MERN",
    year: "Live project",
    theme: "pistachio",
    storyLabel: "The project",
    resultsLabel: "What I built",
    description:
      "A modern, responsive full-stack learning platform for robotics and drones.",
    results: [
      "Built a full-stack learning platform for robotics and drones",
      "Used React, Node.js, MongoDB, and Express.js",
    ],
    tags: ["React.js", "Node.js", "MongoDB", "Express.js"],
    liveUrl: "https://robo-drone.onrender.com/",
    image: "/projects/project2.png",
  },
  {
    id: "repair-website",
    number: "05",
    title: "Electronic Repair Website",
    subtitle: "An electronic repair site with service booking.",
    category: "Service booking · React · Express",
    year: "Live project",
    theme: "mint",
    storyLabel: "The project",
    resultsLabel: "What I built",
    description:
      "A modern, responsive electronic repair website where customers can book repair services.",
    results: [
      "Built a responsive electronic repair website with service booking",
      "Used React, Ant Design, and Express.js",
    ],
    tags: ["React.js", "Ant Design", "Express.js"],
    liveUrl: "https://www.mragain.nl/",
    image: "/projects/project4.png",
  },
  {
    id: "database-converter",
    number: "06",
    title: "Database Schema Converter",
    subtitle: "Translate schemas between databases.",
    category: "Developer tool · React · Gemini AI",
    year: "Live project",
    theme: "crimson",
    storyLabel: "The project",
    resultsLabel: "What I built",
    description:
      "A modern, responsive application for converting between different database schemas, such as MySQL and MongoDB.",
    results: [
      "Built a tool that converts between database schemas such as MySQL and MongoDB",
      "Used React, Node.js, MongoDB, Gemini AI, and Font Awesome",
    ],
    tags: ["React.js", "Node.js", "MongoDB", "Gemini AI"],
    liveUrl: "https://db-eight-ebon.vercel.app/",
    image: "/projects/landing.png",
    imageFit: "contain",
  },
];

const CHAT_WELCOME =
  "Hi, I'm Ali's digital twin. I can answer questions about his experience, stack, and projects. What would you like to know?";

const CHAT_SUGGESTIONS = [
  "What is your stack?",
  "Tell me about YbTech.",
  "What projects have you built?",
  "Why should I hire you?",
];

const CV_ANSWERS = {
  greeting:
    "Hey! Ask me anything about Ali's experience, skills, projects, education, or how to get in touch.",
  about: `Ali Waqas is a software engineer based in Islamabad, Pakistan. He's a front-end-focused MERN developer who builds responsive, high-performance web apps with React, Next.js, Tailwind CSS, and JavaScript. He cares about clean interfaces, reusable components, and the details that make a product feel effortless. He also has six live portfolio projects, including full-stack MERN builds.`,
  ybtech: `At YbTech (07/2022–08/2024), Ali worked as a web developer. He built and maintained responsive websites with React.js, Tailwind CSS, and JavaScript, created reusable components, and shipped dynamic features that improved page performance. He worked closely with designers and backend developers.`,
  pk2100: `At PK2100 Technology and Business Solutions (07/2021–09/2021), Ali was a frontend developer. He built UI components and interactive layouts with HTML, CSS, and Bootstrap, then debugged and optimized front-end code alongside senior developers.`,
  project: `For his final-year project, Ali built an Automatic Question Generator using NLP. It turns source text into exam-style questions and includes a desktop interface for generating and reviewing them. He built it in Python.`,
  projects: `Ali's portfolio includes six live projects:\n\n• 3D-Portfolio Website — React, TailwindCSS, Three.js\n• E-commerce Website — React, Material UI, MongoDB, Express.js\n• Notes App — React, Node.js, MongoDB, DaisyUI\n• Learning Platform — a full-stack robotics and drones platform\n• Electronic Repair Website — React, Ant Design, Express.js\n• Database Schema Converter — React, Node.js, MongoDB, Gemini AI\n\nEach one has a live-demo link in the Projects section.`,
  portfolio3d: `The 3D-Portfolio Website is a modern, responsive personal portfolio built with React, TailwindCSS, and Three.js. A live demo is linked in the Projects section.`,
  ecommerce: `The E-commerce Website is a responsive restaurant storefront built with React, Material UI, MongoDB, and Express.js. A live demo is linked in the Projects section.`,
  notes: `The Notes App is a real-time notes application built with React, Node.js, MongoDB, Express.js, and DaisyUI. A live demo is linked in the Projects section.`,
  learning: `The Learning Platform is a full-stack platform for learning about robotics and drones, built with React, Node.js, MongoDB, and Express.js. A live demo is linked in the Projects section.`,
  repair: `The Electronic Repair Website is a responsive site where customers can book repair services. It was built with React, Ant Design, and Express.js, and a live demo is linked in the Projects section.`,
  database: `The Database Schema Converter converts between database schemas such as MySQL and MongoDB. It uses React, Node.js, MongoDB, Gemini AI, and Font Awesome, with a live demo linked in the Projects section.`,
  education: `BS Software Engineering — Capital University of Science and Technology, Islamabad (2022).\nF.Sc Pre-Engineering — Jinnah Muslim School and College, Islamabad (2018).`,
  availability: `Ali is currently open to front-end and MERN roles, including remote work. The quickest way to start a conversation is aliwaqas55488@gmail.com.`,
  contact: `Email: aliwaqas55488@gmail.com\nPhone: +92 323 1529432\nPortfolio: ali-waqas.vercel.app`,
  location: `Ali is based in Islamabad, Pakistan, and is open to remote work.`,
  hire: `Ali brings a front-end-first mindset and real production experience: two roles at YbTech and PK2100, a strong React / Next.js / Tailwind foundation, and a habit of building reusable, performance-minded components. He sweats the details that make an interface feel effortless — and he's actively growing into full-stack work.`,
  experience: `Ali has two professional roles:\n\n• Web Developer at YbTech (07/2022–08/2024) — responsive React/Tailwind sites, reusable components, and performance work.\n• Frontend Developer at PK2100 (07/2021–09/2021) — HTML/CSS/Bootstrap UI, debugging, and responsive layouts.`,
  years: `Ali has around two years of professional experience across YbTech (2022–2024) and PK2100 (2021).`,
  skills: `Core stack: React.js, Next.js, Tailwind CSS, JavaScript, HTML5/CSS3, and Bootstrap. Also Git, Figma, Postman, Python, and responsive design. He's building out Node.js and MongoDB on the backend.`,
  frontend: `Front-end is Ali's strongest area: React.js, Next.js, Tailwind CSS, JavaScript, HTML5, CSS3, Bootstrap, and responsive design. He focuses on clean, reusable components and performance.`,
  backend: `Ali's backend experience is still growing. He's working with Node.js and MongoDB and has a foundation in Python from his NLP project. His professional roles have been front-end focused, while his portfolio includes full-stack MERN projects.`,
  react: `React.js is Ali's primary front-end library. He's used it to build reusable components and dynamic, responsive interfaces in professional projects.`,
  next: `Yes — Next.js is part of Ali's front-end toolkit, alongside React.js and Tailwind CSS.`,
  tailwind: `Yes — Tailwind CSS is one of Ali's core tools. He used it at YbTech to build responsive, reusable interfaces.`,
  python: `Ali used Python for his final-year NLP project, the Automatic Question Generator. It's a solid foundation, though his professional work has been front-end focused.`,
  weakness: `Ali's CV doesn't list a weakness, but his clearest growth area is backend development. He's actively building with Node.js and MongoDB alongside a strong front-end foundation.`,
  current: `Ali's CV doesn't list a current project. He's currently open to front-end and MERN roles — email aliwaqas55488@gmail.com to talk.`,
  resume: `This chat is Ali's CV in conversational form. Ask about his experience, stack, projects, education, availability, or contact details — or email aliwaqas55488@gmail.com for the PDF.`,
  social: `LinkedIn and GitHub aren't listed on Ali's CV. You can reach him at aliwaqas55488@gmail.com or see his portfolio at ali-waqas.vercel.app.`,
  salary: `Salary expectations aren't listed in Ali's CV. Email aliwaqas55488@gmail.com to discuss the role and details.`,
  help: `I can answer questions about Ali's work experience, technical stack, projects, final-year project, education, availability, and contact details.`,
  bot: `I'm a small CV chatbot built into Ali's portfolio. I answer from his CV — nothing else.`,
  fallback: `I don't have that detail in Ali's CV. Try asking about his experience, stack, projects, final-year project, education, availability, or contact details.`,
};

const CV_ANSWER_RULES = [
  {
    match: ["hello", "hi", "hey", "salaam", "salam"],
    answer: CV_ANSWERS.greeting,
  },
  {
    match: [
      "who are you",
      "who is ali",
      "about yourself",
      "about ali",
      "tell me about yourself",
      "introduce yourself",
      "what do you do",
      "summary",
      "overview",
      "name",
    ],
    answer: CV_ANSWERS.about,
  },
  { match: ["ybtech", "yb tech"], answer: CV_ANSWERS.ybtech },
  { match: ["pk2100", "pk 2100", "pk-2100"], answer: CV_ANSWERS.pk2100 },
  {
    match: [
      "3d portfolio",
      "3d-portfolio",
      "3d website",
      "three js",
      "threejs",
      "three.js",
    ],
    answer: CV_ANSWERS.portfolio3d,
  },
  {
    match: [
      "e-commerce",
      "ecommerce",
      "e commerce",
      "restaurant",
      "tapandeat",
      "tap and eat",
    ],
    answer: CV_ANSWERS.ecommerce,
  },
  {
    match: ["notes app", "note app", "notes", "thinkboard", "real-time notes", "realtime notes"],
    answer: CV_ANSWERS.notes,
  },
  {
    match: ["learning platform", "robotics", "robots", "drones", "drone", "robo"],
    answer: CV_ANSWERS.learning,
  },
  {
    match: ["electronic repair", "repair website", "mragain", "repair"],
    answer: CV_ANSWERS.repair,
  },
  {
    match: [
      "database schema",
      "schema converter",
      "database converter",
      "database",
      "mysql",
      "gemini",
    ],
    answer: CV_ANSWERS.database,
  },
  {
    match: [
      "question generator",
      "final year",
      "final-year",
      "fyp",
      "nlp",
      "biggest project",
      "main project",
    ],
    answer: CV_ANSWERS.project,
  },
  {
    match: [
      "education",
      "study",
      "studied",
      "degree",
      "university",
      "college",
      "cust",
      "fsc",
      "school",
    ],
    answer: CV_ANSWERS.education,
  },
  {
    match: ["available", "availability", "open to", "looking for", "remote"],
    answer: CV_ANSWERS.availability,
  },
  {
    match: [
      "contact",
      "email",
      "phone",
      "reach",
      "get in touch",
      "call",
      "website",
    ],
    answer: CV_ANSWERS.contact,
  },
  {
    match: ["where", "based", "location", "live", "city", "islamabad"],
    answer: CV_ANSWERS.location,
  },
  {
    match: [
      "why should i hire",
      "why hire",
      "why you",
      "strength",
      "strengths",
      "good fit",
      "good at",
      "best candidate",
      "different",
    ],
    answer: CV_ANSWERS.hire,
  },
  { match: ["linkedin", "github", "social"], answer: CV_ANSWERS.social },
  {
    match: ["salary", "rate", "compensation", "pay"],
    answer: CV_ANSWERS.salary,
  },
  {
    match: ["years of experience", "how many years"],
    answer: CV_ANSWERS.years,
  },
  { match: ["react js", "reactjs", "react"], answer: CV_ANSWERS.react },
  { match: ["next js", "nextjs", "next"], answer: CV_ANSWERS.next },
  { match: ["tailwind css", "tailwind"], answer: CV_ANSWERS.tailwind },
  {
    match: [
      "node js",
      "nodejs",
      "node",
      "mongodb",
      "mongo db",
      "backend",
      "back-end",
      "full stack",
      "full-stack",
      "fullstack",
      "mern",
    ],
    answer: CV_ANSWERS.backend,
  },
  { match: ["python"], answer: CV_ANSWERS.python },
  {
    match: ["front-end", "front end", "frontend", "ui", "interface"],
    answer: CV_ANSWERS.frontend,
  },
  {
    match: [
      "skill",
      "skills",
      "stack",
      "technology",
      "technologies",
      "tech",
      "tools",
      "toolkit",
      "javascript",
      "html",
      "css",
      "bootstrap",
      "git",
      "figma",
      "postman",
      "responsive",
    ],
    answer: CV_ANSWERS.skills,
  },
  {
    match: [
      "experience",
      "work history",
      "worked",
      "work",
      "career",
      "companies",
      "job history",
      "roles",
    ],
    answer: CV_ANSWERS.experience,
  },
  {
    match: ["projects", "portfolio", "built", "build"],
    answer: CV_ANSWERS.projects,
  },
  { match: ["project"], answer: CV_ANSWERS.project },
  { match: ["resume", "cv"], answer: CV_ANSWERS.resume },
  {
    match: ["what can you do", "help", "questions"],
    answer: CV_ANSWERS.help,
  },
  {
    match: ["who made you", "built you", "robot", "chatbot", "ai"],
    answer: CV_ANSWERS.bot,
  },
  {
    match: ["weakness", "improve", "growth area", "learning"],
    answer: CV_ANSWERS.weakness,
  },
  {
    match: ["currently", "working on", "right now"],
    answer: CV_ANSWERS.current,
  },
];

function normalizeChatInput(value) {
  return ` ${value
    .toLowerCase()
    .replace(/[^a-z0-9+#\-\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

function getCvAnswer(input) {
  const query = normalizeChatInput(input);
  if (!query.trim()) return CV_ANSWERS.fallback;

  const has = (...terms) => terms.some((term) => query.includes(` ${term} `));
  const rule = CV_ANSWER_RULES.find(({ match }) => has(...match));
  return rule ? rule.answer : CV_ANSWERS.fallback;
}

function App() {
  const reducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(!reducedMotion);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const timer = window.setTimeout(() => setIsLoading(false), 1550);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const shouldLock = menuOpen || Boolean(selectedProject);
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, selectedProject]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 981px)");
    const closeMenuOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener?.("change", closeMenuOnDesktop);
    return () =>
      desktopQuery.removeEventListener?.("change", closeMenuOnDesktop);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Cursor />
      <ScrollProgress />

      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      <div className="site-shell">
        <Header
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
        />

        <main id="main">
          <Hero ready={!isLoading} />
          <Marquee />
          <Work onSelect={setSelectedProject} />
          <Projects onSelect={setSelectedProject} />
          <Quote />
          <About />
          <ChatSection />
          <Contact />
        </main>

        <Footer />
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={closeMenu} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>
    </>
  );
}

function Preloader() {
  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="preloader-top">
        <span>AW / PORTFOLIO</span>
        <span>2026</span>
      </div>

      <div className="preloader-center">
        <motion.span
          className="preloader-mark"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          aw<span>©</span>
        </motion.span>
      </div>

      <div className="preloader-bottom">
        <span>Software engineer</span>
        <div className="preloader-track">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
        <span>Islamabad, PK</span>
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function Cursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, {
    stiffness: 700,
    damping: 44,
    mass: 0.25,
  });
  const smoothY = useSpring(cursorY, {
    stiffness: 700,
    damping: 44,
    mass: 0.25,
  });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setIsFinePointer(query.matches);

    updatePointer();
    query.addEventListener?.("change", updatePointer);

    const onPointerMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      const interactive = event.target.closest(
        "a, button, [data-cursor], input, textarea",
      );
      setIsHovering(Boolean(interactive));
      setCursorLabel(interactive?.dataset?.cursor === "view" ? "View" : "");
    };

    const resetCursor = () => {
      setIsHovering(false);
      setCursorLabel("");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", resetCursor);
    window.addEventListener("scroll", resetCursor, { passive: true });

    return () => {
      query.removeEventListener?.("change", updatePointer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", resetCursor);
      window.removeEventListener("scroll", resetCursor);
    };
  }, [cursorX, cursorY]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      className={`cursor${isHovering ? " is-hovering" : ""}${
        cursorLabel ? " has-label" : ""
      }`}
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    >
      <span>{cursorLabel}</span>
    </motion.div>
  );
}

function Header({ menuOpen, onMenuToggle }) {
  return (
    <header className={`site-header${menuOpen ? " menu-active" : ""}`}>
      <a className="logo" href="#top" aria-label="awc — Ali Waqas, back to top">
        aw<span>©</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} className="nav-link" href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <span className="availability">
          <span className="status-dot" />
          Available for work
        </span>
        <a className="header-cta" href="#contact">
          Let&apos;s talk
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }) {
  return (
    <motion.div
      className="mobile-menu"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="mobile-menu-inner">
        <span className="mobile-menu-label">Menu</span>
        <nav aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={onClose}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
            >
              <span>{item.index}</span>
              {item.label}
              <ArrowUpRight size={30} strokeWidth={1.5} />
            </motion.a>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <a href="mailto:aliwaqas55488@gmail.com">aliwaqas55488@gmail.com</a>
          <div>
            <a
              href="https://ali-waqas.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
            <a href="tel:+923231529432">Call</a>
            <a href="mailto:aliwaqas55488@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ ready }) {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [3, 9]);

  const lineVariants = {
    hidden: { y: "105%" },
    visible: (i) => ({
      y: "0%",
      transition: {
        delay: 0.1 + i * 0.09,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.div
            className="hero-eyebrow"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <span className="eyebrow-dot" />
            Ali Waqas · Software engineer
          </motion.div>

          <motion.h1
            style={reducedMotion ? undefined : { y: headlineY }}
            aria-label="Digital, with feeling and motion."
          >
            <span className="headline-line">
              <motion.span
                custom={0}
                variants={lineVariants}
                initial={reducedMotion ? false : "hidden"}
                animate={ready ? "visible" : "hidden"}
              >
                DIGITAL
              </motion.span>
            </span>
            <span className="headline-line">
              <motion.span
                custom={1}
                variants={lineVariants}
                initial={reducedMotion ? false : "hidden"}
                animate={ready ? "visible" : "hidden"}
              >
                <em>with</em> FEELING
              </motion.span>
            </span>
            <span className="headline-line">
              <motion.span
                custom={2}
                variants={lineVariants}
                initial={reducedMotion ? false : "hidden"}
                animate={ready ? "visible" : "hidden"}
              >
                &amp; MOTION<span className="headline-period">.</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            className="hero-bottom"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.65,
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p>
              I&apos;m a front-end-focused developer who turns clean designs
              into fast, responsive web experiences — with a soft spot for the
              tiny details that make an interface feel right.
            </p>
            <div className="hero-buttons">
              <Magnetic>
                <a className="button button--primary" href="#work">
                  See my work
                  <ArrowDown size={17} strokeWidth={2.5} />
                </a>
              </Magnetic>
              <a className="text-link" href="#about">
                More about me
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          style={reducedMotion ? undefined : { y: artY, rotate: artRotate }}
          initial={
            reducedMotion ? false : { opacity: 0, scale: 0.88, rotate: -5 }
          }
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroArt />
        </motion.div>
      </div>

      <motion.div
        className="hero-footer"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 0.95, duration: 0.6 }}
      >
        <a href="#work" className="scroll-cue">
          <span className="scroll-cue-icon">
            <ArrowDown size={15} />
          </span>
          Scroll to explore
        </a>
        <span>Islamabad, PK · Open to remote work</span>
      </motion.div>
    </section>
  );
}

function HeroArt() {
  return (
    <div className="hero-art">
      <div className="hero-art-top">
        <span>AW / 001</span>
        <span className="hero-art-pill">Islamabad, PK</span>
      </div>

      <div className="hero-art-center">
        <Mascot />
        <span className="orbit-dot orbit-dot--one" />
        <span className="orbit-dot orbit-dot--two" />
        <span className="hero-spark hero-spark--one">✦</span>
        <span className="hero-spark hero-spark--two">✦</span>
      </div>

      <div className="hero-art-bottom">
        <span>Frontend</span>
        <span>Full-stack</span>
        <span>Problem solver</span>
      </div>

      <a
        className="hero-sticker"
        href="#contact"
      >
        <span>Open for</span>
        <strong>good projects</strong>
        <ArrowUpRight size={18} />
      </a>

      <span className="hero-art-star" aria-hidden="true">
        ✦
      </span>
    </div>
  );
}

function Mascot() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 14 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 14 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const onMove = (event) => {
      if (!ref.current) return;
      const bounds = ref.current.getBoundingClientRect();
      const offsetX = event.clientX - (bounds.left + bounds.width / 2);
      const offsetY = event.clientY - (bounds.top + bounds.height / 2);
      const max = 9;
      x.set(Math.max(-max, Math.min(max, offsetX / 35)));
      y.set(Math.max(-max, Math.min(max, offsetY / 35)));
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion, x, y]);

  return (
    <div className="mascot" ref={ref} aria-hidden="true">
      <div className="mascot-eye">
        <motion.span style={{ x: smoothX, y: smoothY }} />
      </div>
      <div className="mascot-eye">
        <motion.span style={{ x: smoothX, y: smoothY }} />
      </div>
      <span className="mascot-cheek mascot-cheek--left" />
      <span className="mascot-cheek mascot-cheek--right" />
      <span className="mascot-smile" />
    </div>
  );
}

function Marquee() {
  const items = [
    "Creative development",
    "Motion design",
    "Art direction",
    "Digital experiences",
    "Brand systems",
    "Good energy",
  ];
  const allItems = [...items, ...items];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
            <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ index, label, inverse = false }) {
  return (
    <div className={`section-label${inverse ? " section-label--inverse" : ""}`}>
      <span>{index}</span>
      <i />
      <span>{label}</span>
    </div>
  );
}

function Work({ onSelect }) {
  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <Reveal>
        <SectionLabel index="01" label="Experience & work" />
      </Reveal>

      <div className="work-heading">
        <Reveal>
          <h2 className="work-title" id="work-title">
            WORK &amp;
            <br />
            <em>experience</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="work-intro">
            Two roles, one final-year project, and a lot of time spent making
            interfaces feel right. Here&apos;s the short version.
          </p>
        </Reveal>
      </div>

      <div className="project-list">
        {WORK_ITEMS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onSelect }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.button
        className={`project project--${project.theme}`}
        type="button"
        onClick={() => onSelect(project)}
        data-cursor="view"
        aria-label={`View the ${project.title} story`}
        whileTap={{ scale: 0.995 }}
      >
        <div className="project-top">
          <span className="project-number">({project.number})</span>
          <span className="project-category">{project.category}</span>
          <span className="project-year">{project.year}</span>
        </div>

        <div className="project-art">
          <ProjectArt project={project.id} />
          <span className="project-hover-hint">
            View story
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="project-meta">
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
          <span className="project-arrow">
            <ArrowUpRight size={24} strokeWidth={1.8} />
          </span>
        </div>
      </motion.button>
    </Reveal>
  );
}

function Projects({ onSelect }) {
  return (
    <section
      className="projects section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <Reveal>
        <SectionLabel index="02" label="Selected projects" />
      </Reveal>

      <div className="projects-heading">
        <Reveal>
          <h2 className="projects-title" id="projects-title">
            BUILT TO
            <br />
            <em>ship.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="projects-intro">
            Six live builds — MERN apps, a 3D portfolio, and tools that solve
            specific problems. Open any card for the details and a live demo.
          </p>
        </Reveal>
      </div>

      <div className="project-grid">
        {PROJECTS.map((project) => (
          <Reveal key={project.id}>
            <ProjectTile project={project} onSelect={onSelect} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectTile({ project, onSelect }) {
  return (
    <motion.button
      className={`project-tile project-tile--${project.theme}`}
      type="button"
      onClick={() => onSelect(project)}
      data-cursor="view"
      aria-label={`Open ${project.title} project details`}
      whileTap={{ scale: 0.995 }}
    >
      <div className="project-tile-media">
        <img
          className={project.imageFit === "contain" ? "project-tile-image--contain" : ""}
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          width="1914"
          height="1044"
        />
        <span className="project-tile-badge">
          <span className="project-tile-dot" />
          Live demo
        </span>
      </div>

      <div className="project-tile-body">
        <div className="project-tile-top">
          <span>({project.number})</span>
          <span>{project.category}</span>
        </div>
        <div className="project-tile-heading">
          <h3>{project.title}</h3>
          <span className="project-tile-arrow" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={1.9} />
          </span>
        </div>
        <p>{project.subtitle}</p>
        <div className="project-tile-tags">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function ProjectArt({ project, modal = false }) {
  if (project === "ybtech") {
    return (
      <div
        className={`art-scene art-yb${modal ? " art-scene--modal" : ""}`}
        aria-hidden="true"
      >
        <span className="scene-eyebrow">YBTECH · WEB DEVELOPER · 2022—24</span>
        <div className="yb-orbit">YB</div>

        <div className="yb-window">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span>ybtech.com</span>
          </div>
          <div className="yb-site">
            <div className="yb-nav">
              <strong>YBTECH</strong>
              <span>WORK · SERVICES · CONTACT</span>
              <i>↗</i>
            </div>
            <div className="yb-hero">
              <div>
                <span className="tiny-label">DIGITAL PRODUCTS</span>
                <h4>
                  BUILD
                  <br />
                  BETTER<span>.</span>
                </h4>
              </div>
              <p>Fast, thoughtful websites for ambitious teams.</p>
            </div>
            <div className="yb-cards">
              <span>
                <i>01</i>React
              </span>
              <span>
                <i>02</i>Tailwind
              </span>
              <span>
                <i>03</i>JavaScript
              </span>
            </div>
          </div>
        </div>

        <div className="yb-code">
          <span>
            <b>const</b> build = () =&gt; {"{"}
          </span>
          <span>&nbsp;&nbsp;return cleanUI + speed;</span>
          <span>{"}"}</span>
        </div>

        <span className="scene-sticker scene-sticker--orange">
          REACT
          <br />+ TAILWIND
        </span>
      </div>
    );
  }

  if (project === "aqg") {
    return (
      <div
        className={`art-scene art-aqg${modal ? " art-scene--modal" : ""}`}
        aria-hidden="true"
      >
        <span className="scene-eyebrow">FINAL YEAR PROJECT · NLP · 2022</span>
        <span className="aqg-word">AQG</span>

        <div className="aqg-window">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span>question-generator.exe</span>
          </div>
          <div className="aqg-body">
            <div className="aqg-meta">
              <span>GENERATED QUESTION</span>
              <span>01 / 10</span>
            </div>
            <p className="aqg-question">
              What is the primary role of natural language processing in
              automated assessment?
            </p>
            <div className="aqg-options">
              <span>
                <i>A</i> Generating questions from text
              </span>
              <span>
                <i>B</i> Designing interfaces
              </span>
              <span>
                <i>C</i> Compressing images
              </span>
            </div>
            <span className="aqg-button">
              Generate more <b>✦</b>
            </span>
          </div>
        </div>

        <span className="aqg-tag">TEXT IN → QUESTIONS OUT</span>
        <span className="scene-sticker scene-sticker--orange">
          NLP
          <br />
          INSIDE
        </span>
        <span className="aqg-star">✦</span>
      </div>
    );
  }

  return (
    <div
      className={`art-scene art-pk${modal ? " art-scene--modal" : ""}`}
      aria-hidden="true"
    >
      <span className="scene-eyebrow">PK2100 · FRONTEND DEVELOPER · 2021</span>
      <span className="pk-word">
        PK<span>2100</span>
      </span>

      <div className="pk-browser">
        <div className="window-bar">
          <i />
          <i />
          <i />
          <span>pk2100.com</span>
        </div>
        <div className="pk-page">
          <div className="pk-page-top">
            <strong>PK2100</strong>
            <span>MENU +</span>
          </div>
          <div className="pk-page-copy">
            <span>TECHNOLOGY &amp; BUSINESS</span>
            <h4>
              SMARTER
              <br />
              SOLUTIONS.
            </h4>
            <i>Let&apos;s build →</i>
          </div>
          <div className="pk-grid">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="pk-phone">
        <span className="pk-notch" />
        <span className="pk-phone-kicker">PK2100</span>
        <strong>
          BIG
          <br />
          IDEAS,
          <br />
          SMALL
          <br />
          SCREENS.
        </strong>
        <i>RESPONSIVE ✓</i>
      </div>

      <span className="pk-badge">BUILT TO ADAPT</span>
      <span className="scene-sticker scene-sticker--blue">
        BOOTSTRAP
        <br />+ CSS
      </span>
    </div>
  );
}

function Quote() {
  return (
    <section className="quote-band" aria-label="Design philosophy">
      <Reveal>
        <div className="quote-inner">
          <span className="quote-glyph" aria-hidden="true">
            “
          </span>
          <blockquote>
            Good interfaces don&apos;t just look clean. They{" "}
            <em>feel effortless.</em>
          </blockquote>
          <div className="quote-by">
            <span className="quote-avatar">AW</span>
            <div>
              <strong>Ali Waqas</strong>
              <span>Software Engineer</span>
            </div>
          </div>
        </div>
      </Reveal>
      <span className="quote-star" aria-hidden="true">
        ✦
      </span>
    </section>
  );
}

function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <Reveal>
        <SectionLabel index="03" label="A little about me" />
      </Reveal>

      <div className="about-grid">
        <Reveal className="portrait-wrap">
          <div className="portrait-frame">
            <img
              className="portrait"
              src="/ali-waqas-portrait.jpg"
              alt="Stylized portrait of Ali Waqas surrounded by colorful hanging lamps"
              width="951"
              height="1106"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="portrait-sticker">
            THAT&apos;S
            <br />
            ME
            <span>↗</span>
          </span>
          <span className="portrait-stamp">100% HUMAN · 0% ROBOT</span>
        </Reveal>

        <div className="about-copy">
          <Reveal>
            <h2 id="about-title">
              Frontend first.
              <br />
              Full-stack next.
              <br />
              <em>Allergic to messy UI.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="about-text">
              <p>
                I&apos;m a detail-oriented MERN stack developer with strong
                front-end expertise in React, Next.js, Tailwind CSS, and
                JavaScript. I build responsive, high-performance applications
                with clean interfaces — and I&apos;m steadily going deeper into
                Node.js and MongoDB.
              </p>
              <p>
                I&apos;ve worked with YbTech and PK2100 Technology and Business
                Solutions, collaborating with designers and backend developers
                to ship polished front ends. I care about reusable components,
                clean code, and the small details that make a product feel
                effortless.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="stats">
              <div className="stat">
                <strong>
                  02<span>+</span>
                </strong>
                <p>
                  years of professional
                  <br />
                  web experience
                </p>
              </div>
              <div className="stat">
                <strong>02</strong>
                <p>
                  companies
                  <br />
                  worked with
                </p>
              </div>
              <div className="stat">
                <strong>14</strong>
                <p>
                  tools in the
                  <br />
                  developer kit
                </p>
              </div>
              <div className="stat">
                <strong>01</strong>
                <p>
                  final-year project
                  <br />
                  built with NLP
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="skills">
              <span className="skills-label">Things I work with</span>
              <div className="skill-pills">
                {SKILLS.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="education">
              <span className="skills-label">Education</span>
              <div className="education-list">
                {EDUCATION.map((item) => (
                  <div className="education-item" key={item.degree}>
                    <div>
                      <strong>{item.degree}</strong>
                      <span>{item.school}</span>
                    </div>
                    <span className="education-year">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="about-availability">
              <span className="status-dot" />
              Currently open to front-end and MERN roles
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  const reducedMotion = useReducedMotion();
  const [messages, setMessages] = useState([
    { id: 0, role: "bot", text: CHAT_WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [shortcutLabel] = useState(() => {
    const platform =
      navigator.userAgentData?.platform ||
      navigator.platform ||
      navigator.userAgent;
    return /Mac|iPhone|iPad|iPod/i.test(platform) ? "⌘K" : "Ctrl K";
  });

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const replyTimer = useRef(null);
  const focusTimer = useRef(null);
  const nextId = useRef(0);

  const focusChat = useCallback(() => {
    const panel = panelRef.current;
    if (panel) {
      const panelTop = panel.getBoundingClientRect().top + window.scrollY;
      const offset = Math.max(
        88,
        (window.innerHeight - panel.offsetHeight) / 2,
      );
      window.scrollTo({
        top: Math.max(0, panelTop - offset),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }

    window.clearTimeout(focusTimer.current);
    focusTimer.current = window.setTimeout(
      () => inputRef.current?.focus({ preventScroll: true }),
      reducedMotion ? 0 : 380,
    );
  }, [reducedMotion]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        focusChat();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [focusChat]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(
    () => () => {
      window.clearTimeout(replyTimer.current);
      window.clearTimeout(focusTimer.current);
    },
    [],
  );

  const sendMessage = useCallback(
    (raw) => {
      const text = raw.trim();
      if (!text || isTyping) return;

      const userMessage = {
        id: (nextId.current += 1),
        role: "user",
        text,
      };
      setMessages((current) => [...current, userMessage]);
      setInput("");
      setIsTyping(true);

      const reply = getCvAnswer(text);
      const botMessage = {
        id: (nextId.current += 1),
        role: "bot",
        text: reply,
      };
      replyTimer.current = window.setTimeout(() => {
        setMessages((current) => [...current, botMessage]);
        setIsTyping(false);
      }, 620);
    },
    [isTyping],
  );

  return (
    <section className="chat-section" id="chat" aria-labelledby="chat-title">
      <div className="chat-grid">
        <div className="chat-copy">
          <Reveal>
            <SectionLabel index="04" label="Ask my digital twin" />
          </Reveal>

          <Reveal delay={0.05}>
            <span className="chat-status">
              <span className="chat-online-dot" aria-hidden="true" />
              Available for work
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="chat-title" id="chat-title">
              Don&apos;t read
              <br />
              my resume.
              <em>Chat with it.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.13}>
            <p className="chat-intro">
              I&apos;m Ali — a front-end-focused software engineer building
              responsive web applications with React, Next.js, and Tailwind CSS.
              This little digital twin knows my CV, so ask it anything.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="chat-actions">
              <a className="button chat-primary" href="#work">
                View my work
                <ArrowDown size={16} />
              </a>
              <button
                className="chat-shortcut"
                type="button"
                onClick={focusChat}
                aria-label={`Focus the CV chat (${shortcutLabel})`}
              >
                Press <kbd>{shortcutLabel}</kbd>
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal className="chat-panel-wrap" delay={0.1}>
          <div className="chat-panel" ref={panelRef}>
            <div className="chat-panel-header">
              <div className="chat-identity">
                <span className="chat-avatar" aria-hidden="true">
                  <Bot size={18} />
                </span>
                <div>
                  <strong>Ali Waqas</strong>
                  <span className="chat-subtitle">
                    <span className="chat-online-dot" aria-hidden="true" />
                    Digital twin · online
                  </span>
                </div>
              </div>
              <span className="chat-panel-tag">CV chat</span>
            </div>

            <div
              className="chat-log"
              ref={logRef}
              role="log"
              aria-label="Conversation with Ali's CV chatbot"
              aria-live="polite"
              aria-relevant="additions text"
              tabIndex={0}
            >
              {messages.map((message) => (
                <div
                  className={`chat-message chat-message--${message.role}`}
                  key={message.id}
                >
                  {message.role === "bot" && (
                    <span className="chat-message-avatar" aria-hidden="true">
                      <Bot size={13} />
                    </span>
                  )}
                  <p>{message.text}</p>
                </div>
              ))}

              {isTyping && (
                <div
                  className="chat-typing"
                  role="status"
                  aria-label="Ali's digital twin is typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <div className="chat-footer">
              <div
                className="chat-suggestions"
                role="group"
                aria-label="Suggested questions"
              >
                {CHAT_SUGGESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={isTyping}
                  >
                    {question}
                  </button>
                ))}
              </div>

              <form
                className="chat-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
              >
                <label className="sr-only" htmlFor="cv-chat-input">
                  Ask a question about Ali&apos;s CV
                </label>
                <input
                  id="cv-chat-input"
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask anything about my skills, experience, and projects..."
                  autoComplete="off"
                  maxLength={400}
                  aria-keyshortcuts="Meta+K Control+K"
                  aria-describedby="cv-chat-note"
                />
                <button
                  className="chat-send"
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || isTyping}
                >
                  <Send size={17} />
                </button>
              </form>

              <p className="chat-note" id="cv-chat-note">
                Answers generated from Ali&apos;s CV. Press {shortcutLabel} to
                jump here.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      className="contact section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-top">
        <Reveal>
          <SectionLabel index="05" label="Say hello" inverse />
        </Reveal>
        <Reveal delay={0.06}>
          <span className="contact-availability">
            <span className="status-dot" />
            Open to opportunities
          </span>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="contact-title" id="contact-title">
          <span>LET&apos;S BUILD</span>
          <span className="contact-title-italic">something</span>
          <span>
            UNFORGETTABLE<span className="contact-period">.</span>
          </span>
        </h2>
      </Reveal>

      <div className="contact-actions">
        <Reveal delay={0.08}>
          <Magnetic strength={0.18}>
            <a className="email-button" href="mailto:aliwaqas55488@gmail.com">
              aliwaqas55488@gmail.com
              <span>
                <ArrowUpRight size={24} />
              </span>
            </a>
          </Magnetic>
        </Reveal>
        <Reveal delay={0.14}>
          <p>
            Have a role or a project in mind?
            <br />
            I&apos;d love to hear about it.
          </p>
        </Reveal>
      </div>

      <div className="contact-bottom">
        <div className="social-links">
          <a href="mailto:aliwaqas55488@gmail.com">
            Email <ArrowUpRight size={14} />
          </a>
          <a href="tel:+923231529432">
            +92 323 1529432 <ArrowUpRight size={14} />
          </a>
          <a
            href="https://ali-waqas.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            Portfolio <ArrowUpRight size={14} />
          </a>
        </div>
        <a className="back-to-top" href="#top">
          Back to top <ArrowUp size={15} />
        </a>
      </div>

      <span className="contact-star" aria-hidden="true">
        ✦
      </span>
    </section>
  );
}

function Footer() {
  const localTime = useLocalTime();

  return (
    <footer className="footer">
      <a className="footer-logo" href="#top" aria-label="awc — back to top">
        aw<span>©</span>
      </a>
      <p>
        Designed &amp; built by Ali Waqas.
        <br />
        One component at a time.
      </p>
      <div className="footer-right">
        <span>Islamabad, PK — {localTime}</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}

function useLocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Karachi",
      }).format(new Date());
      setTime(formatted);
    };

    updateTime();
    const interval = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return time || "--:--";
}

function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();

      if (event.key === "Tab" && modalRef.current) {
        const focusable = [
          ...modalRef.current.querySelectorAll(
            'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((element) => element.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close project details"
        >
          <X size={20} />
        </button>

        <div
          className={`modal-hero modal-hero--${project.theme}${
            project.image ? " modal-hero--screenshot" : ""
          }${project.imageFit === "contain" ? " modal-hero--contain" : ""}`}
        >
          {project.image ? (
            <img
              className="modal-project-image"
              src={project.image}
              alt={`${project.title} screenshot`}
            />
          ) : (
            <ProjectArt project={project.id} modal />
          )}
          <span className="modal-index">({project.number})</span>
        </div>

        <div className="modal-content">
          <div className="modal-title-row">
            <div>
              <p className="modal-category">{project.category}</p>
              <h2 id="project-modal-title">{project.title}</h2>
              <p className="modal-subtitle">{project.subtitle}</p>
            </div>
            <span className="modal-year">{project.year}</span>
          </div>

          <div className="modal-body-grid">
            <div>
              <h3>{project.storyLabel || "The story"}</h3>
              <p>{project.description}</p>
            </div>
            {project.results?.length ? (
              <div>
                <h3>{project.resultsLabel || "The good stuff"}</h3>
                <ul>
                  {project.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="modal-footer">
            <div className="modal-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="modal-actions">
              {project.liveUrl ? (
                <>
                  <a
                    className="button button--primary"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live demo
                    <ArrowUpRight size={17} />
                  </a>
                  <a className="text-link" href="#contact" onClick={onClose}>
                    Let&apos;s talk
                    <ArrowUpRight size={15} />
                  </a>
                </>
              ) : (
                <a
                  className="button button--primary"
                  href="#contact"
                  onClick={onClose}
                >
                  Let&apos;s work together
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });
  const reducedMotion = useReducedMotion();

  const onPointerMove = (event) => {
    if (reducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={reducedMotion ? undefined : { x: smoothX, y: smoothY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, className = "", delay = 0, y = 28 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default App;
