// Camera path keyframes for each section
export const SECTIONS = [
  { id: 'hero', label: 'Hero', range: [0, 0.15] },
  { id: 'about', label: 'About', range: [0.15, 0.30] },
  { id: 'skills', label: 'Skills', range: [0.30, 0.45] },
  { id: 'experience', label: 'Experience', range: [0.45, 0.60] },
  { id: 'projects', label: 'Projects', range: [0.60, 0.75] },
  { id: 'services', label: 'Services', range: [0.75, 0.90] },
  { id: 'contact', label: 'Contact', range: [0.90, 1.0] },
];

// Camera positions along the scroll path (Z: 28 to -32)
export const CAMERA_PATH = [
  // 1. Earth (Hero): fly-in start
  { position: [0, 2, 28], lookAt: [0, 0, 0], fov: 60 },
  // 2. Mars (About): fly past Earth, approach Mars
  { position: [5, 1, 18], lookAt: [-6, -1, 10], fov: 55 },
  // 3. Jupiter (Skills): approach Jupiter
  { position: [-4, 0.5, 8], lookAt: [6.5, -2, 1], fov: 50 },
  // 4. Saturn (Experience): fly past Saturn rings
  { position: [4, 1, -2], lookAt: [-5.5, 2.5, -9], fov: 55 },
  // 5. Uranus (Projects): fly past Uranus
  { position: [-3, 0.5, -12], lookAt: [5, -1, -21], fov: 50 },
  // 6. Neptune (Services): approach Neptune
  { position: [3, 1, -24], lookAt: [0, -1.5, -35], fov: 55 },
  // 7. Moon (Contact): final landing approach
  { position: [0, -0.5, -32], lookAt: [0, -1.5, -40], fov: 50 },
];

// Color palette from Obsidian Flux
export const COLORS = {
  primary: '#aec6ff',
  primaryContainer: '#0070f3',
  secondary: '#dbb8ff',
  secondaryContainer: '#6807ba',
  tertiary: '#00ddd6',
  tertiaryContainer: '#008480',
  surface: '#131313',
  background: '#000000',
  onSurface: '#e5e2e1',
  onSurfaceVariant: '#c1c6d7',
  outline: '#8b90a0',
};

// Three.js color values (hex integers)
export const COLORS_HEX = {
  primary: 0xaec6ff,
  primaryContainer: 0x0070f3,
  secondary: 0xdbb8ff,
  secondaryContainer: 0x6807ba,
  tertiary: 0x00ddd6,
  background: 0x000000,
  white: 0xffffff,
  particle: 0x8b5cf6,
};

// Total scroll height multiplier (number of viewport heights)
export const SCROLL_PAGES = 8.5;

// Skills data
export const SKILLS = {
  frontend: {
    title: 'Frontend',
    color: 'primary',
    items: [
      { name: 'React / Next.js', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'TypeScript', level: 'Proficient' },
    ],
  },
  backend: {
    title: 'Backend',
    color: 'secondary',
    items: [
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'MongoDB / SQL', level: 'Advanced' },
      { name: 'RESTful APIs', level: 'Expert' },
    ],
  },
  interactive: {
    title: '3D & Interactive',
    color: 'tertiary',
    items: [
      { name: 'Three.js / R3F', level: 'Advanced' },
      { name: 'WebGL Shaders', level: 'Intermediate' },
      { name: 'GSAP Animations', level: 'Expert' },
    ],
  },
};

// Experience data
export const EXPERIENCE = [
  {
    role: 'Lead MERN & 3D Developer',
    company: 'Stitch Web Design',
    period: '2024 - Present',
    description: 'Spearheaded immersive 3D marketing solutions and robust React ecosystems. Reduced page load overhead by 40% and improved UX flow.',
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Nexus Tech',
    period: '2023 - 2024',
    description: 'Designed secure database architectures, developed RESTful endpoints in Node.js, and implemented interactive front-end maps.',
  },
  {
    role: 'Freelance Web Creator',
    company: 'Independent',
    period: '2021 - 2023',
    description: 'Created custom portfolio websites and animations for creative agencies and tech startups using GSAP and Three.js.',
  },
];

// Projects data
export const PROJECTS = [
  {
    id: 1,
    title: '3D Product Configurator',
    description: 'Interactive 3D product visualization with real-time material switching and AR preview capabilities.',
    tags: ['Three.js', 'React', 'WebGL'],
    category: '3D',
    gradient: 'linear-gradient(135deg, #0070f3 0%, #6807ba 100%)',
  },
  {
    id: 2,
    title: 'Full-Stack E-Commerce',
    description: 'Scalable MERN e-commerce platform with Stripe integration, real-time inventory, and admin dashboard.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    category: 'Full-Stack',
    gradient: 'linear-gradient(135deg, #6807ba 0%, #00ddd6 100%)',
  },
  {
    id: 3,
    title: 'Real-Time Chat App',
    description: 'WebSocket-powered messaging platform with end-to-end encryption, file sharing, and video calls.',
    tags: ['Socket.io', 'React', 'Node.js'],
    category: 'Full-Stack',
    gradient: 'linear-gradient(135deg, #00ddd6 0%, #0070f3 100%)',
  },
  {
    id: 4,
    title: 'Immersive Portfolio',
    description: 'This very website — a cinematic 3D scroll experience built with React Three Fiber and GSAP.',
    tags: ['R3F', 'GSAP', 'Three.js'],
    category: '3D',
    gradient: 'linear-gradient(135deg, #aec6ff 0%, #dbb8ff 100%)',
  },
];

// Services data
export const SERVICES = [
  {
    title: '3D Interactive Design',
    icon: '🎮',
    description: 'Creating high-fidelity web experiences using React Three Fiber, Custom Shaders, and WebGL optimization for 60fps renders.',
  },
  {
    title: 'MERN Stack Applications',
    icon: '⚡',
    description: 'Building fully scalable, responsive, and secure full-stack applications with high reliability, robust APIs, and state management.',
  },
  {
    title: 'Creative Motion & GSAP',
    icon: '🎬',
    description: 'Designing fine-tuned interactive transitions, landing page animations, and scroll-driven stories with pixel perfection.',
  },
];

// Social links
export const SOCIALS = [
  { name: 'LinkedIn', icon: 'linkedin', url: '#' },
  { name: 'GitHub', icon: 'github', url: '#' },
  { name: 'Twitter', icon: 'twitter', url: '#' },
];

// Contact info
export const CONTACT_INFO = {
  name: 'Utkarsh Joshi',
  email: 'utkarsh.joshi.2423@gmail.com',
  role: 'MERN Stack Developer & 3D Web Experience Creator',
};
