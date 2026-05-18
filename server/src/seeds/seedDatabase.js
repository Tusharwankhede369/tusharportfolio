import { About } from '../models/About.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Experience } from '../models/Experience.js';
import { Achievement } from '../models/Achievement.js';
import { Certification } from '../models/Certification.js';
import { Education } from '../models/Education.js';
import { Settings } from '../models/Settings.js';

async function clearPortfolioData() {
  await Promise.all([
    About.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Experience.deleteMany({}),
    Achievement.deleteMany({}),
    Certification.deleteMany({}),
    Education.deleteMany({}),
  ]);
}

const ABOUT_DOC = {
  name: 'Tushar Prabhakar Wankhede',
  title: 'Full Stack Developer | MERN Stack Specialist | AI/ML Enthusiast',
  tagline: 'Building intelligent web solutions with modern technologies',
  heroIntro: "Hi, I'm Tushar Prabhakar Wankhede",
  professionalSummary:
    'Passionate Full Stack Developer with expertise in MERN stack and AI/ML integration. Currently pursuing B.Tech in Computer Engineering from Suryodaya College of Engineering and Technology, Nagpur. Hands-on experience building scalable web applications during internship at Amplemind, where I developed NovaMart e-commerce platform managing 500+ products. Skilled in developing intelligent systems with AI-powered features, including Hospital Management System with OCR and RAG-based chatbot. Award-winning developer recognized for innovation in Computer Vision and Web Development. Committed to creating robust, user-centric solutions that solve real-world problems.',
  bio: 'Passionate Full Stack Developer with expertise in MERN stack and AI/ML integration. Currently pursuing B.Tech in Computer Engineering from Suryodaya College of Engineering and Technology, Nagpur. Hands-on experience building scalable web applications during internship at Amplemind, where I developed NovaMart e-commerce platform managing 500+ products.',
  photoUrl: '/uploads/profile.png',
  email: 'tusharwankhede369@gmail.com',
  phone: '+91-9322089873',
  location: 'Nagpur, Maharashtra, India',
  linkedInUrl: 'https://www.linkedin.com/in/tusharw-dev',
  githubUrl: 'https://github.com/Tusharwankhede369',
  resumeUrl: '/uploads/resume.pdf',
  heroRoles: ['Full Stack Developer', 'MERN Specialist', 'AI/ML Enthusiast'],
  yearsOfExperience: 0,
  projectsCompleted: 5,
  technologiesMastered: 32,
};

const PROJECTS = [
  {
    name: 'Hospital Management System',
    description:
      'AI-powered comprehensive hospital management system with intelligent features for streamlining healthcare operations.',
    longDescription:
      'Built an AI-based Hospital Management System to replace manual workflows and improve coordination between departments. Features include appointment scheduling, intelligent bed allocation, pharmacy and billing management, automated payroll processing, and lab report analysis. Implemented Tesseract OCR to extract data from PDF lab reports and classify medical values as Normal/High/Low. Integrated an AI chatbot using FastAPI, RAG, and FAISS for 24/7 patient query handling.',
    technologies: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'FastAPI',
      'Python',
      'Tesseract OCR',
      'RAG',
      'FAISS',
      'JWT',
      'MongoDB Atlas',
    ],
    category: 'Full Stack + AI/ML',
    thumbnailUrl: '/uploads/projects/hospital-management.jpg',
    images: [],
    features: [
      'Appointment scheduling and management system',
      'Intelligent bed allocation across departments',
      'Pharmacy inventory and prescription management',
      'Automated billing and invoice generation',
      'Payroll management for hospital staff',
      'Lab Report Analyzer using Tesseract OCR for PDF data extraction',
      'Medical value classification (Normal/High/Low) for faster diagnosis',
      'AI Chatbot using RAG and FAISS for 24/7 patient query support',
      'Role-based access control for Doctor, Nurse, Admin, Patient',
      'JWT authentication for secure data access',
      'Multi-service architecture (Node.js + FastAPI)',
      'Cloud deployment with MongoDB Atlas',
    ],
    challenges: [
      'Integrating OCR with medical terminology recognition',
      'Building accurate medical value classification system',
      'Implementing RAG-based chatbot for healthcare queries',
      'Managing complex RBAC across multiple user types',
    ],
    impact: 'Reduced manual paperwork, improved inter-department coordination, enabled 24/7 patient support',
    demoUrl: 'https://hms-frontend-i2q8.onrender.com/login',
    repoUrl: 'https://github.com/Tusharwankhede369/Hospital-Management-System',
    startDate: new Date('2026-02-01'),
    endDate: new Date('2026-05-01'),
    status: 'Completed',
    featured: true,
    published: true,
    order: 1,
  },
  {
    name: 'NovaMart E-commerce Platform',
    description:
      'Production-ready full-stack e-commerce platform built during internship at Amplemind. Manages 500+ products with real-time inventory synchronization.',
    longDescription:
      'Developed NovaMart during my internship at Amplemind — a complete e-commerce solution handling complex product variations and real-time inventory management. Implemented robust JWT authentication with role-based access control. Optimized MongoDB schemas and created efficient indexes for handling large product catalogs.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Redux Toolkit', 'Axios', 'JWT', 'Bootstrap', 'Render'],
    category: 'Full Stack',
    thumbnailUrl: '/uploads/projects/novamart.jpg',
    images: [],
    features: [
      'Product catalog management with 500+ products',
      'Complex product variations (size, color, specs)',
      'Real-time inventory synchronization across platform',
      'Shopping cart with persistent sessions',
      'Secure checkout and payment integration',
      'Order tracking and management',
      'Admin dashboard for inventory control',
      'JWT-based authentication and authorization',
      'Role-based access control (Admin, Customer)',
      'Optimized MongoDB schemas and indexes',
      'Redux Toolkit for efficient state management',
      'RESTful API architecture',
      'Responsive design with Bootstrap',
      'Deployed on Render cloud platform',
    ],
    challenges: [
      'Managing real-time inventory across multiple concurrent users',
      'Optimizing database queries for 500+ product catalog',
      'Implementing secure payment flows',
      'Handling complex product variation logic',
    ],
    impact: 'Successfully deployed production e-commerce platform with reliable uptime',
    demoUrl: '',
    repoUrl: 'https://github.com/Tusharwankhede369',
    startDate: new Date('2025-09-01'),
    endDate: new Date('2026-02-01'),
    status: 'Completed',
    featured: true,
    published: true,
    order: 2,
  },
  {
    name: 'Glow Care - E-commerce Platform',
    description:
      'Feature-rich MERN stack e-commerce platform for beauty and skincare products with advanced search, filtering, admin dashboard, and real-time order tracking.',
    longDescription:
      'Built a complete e-commerce platform from scratch using MERN stack. Features include comprehensive product listing with search and category filtering, shopping cart functionality, secure checkout, and real-time order tracking. Developed an intuitive admin dashboard for inventory management, order processing, and customer analytics.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Tailwind CSS', 'Axios'],
    category: 'Full Stack',
    thumbnailUrl: '/uploads/projects/glowcare.jpg',
    images: [],
    features: [
      'Product listing with advanced search functionality',
      'Category-based filtering system',
      'Shopping cart with session persistence',
      'Secure checkout process',
      'Real-time order tracking for customers',
      'Admin dashboard with analytics',
      'Inventory management system',
      'JWT-based authentication',
      'Responsive design with Tailwind CSS',
      'Optimized MongoDB queries',
    ],
    challenges: ['Scaling search and filters for large catalogs', 'Secure session handling at scale'],
    impact: 'End-to-end shopping experience from discovery to delivery tracking',
    demoUrl: 'https://glow-care-5.onrender.com/login',
    repoUrl: 'https://github.com/Tusharwankhede369/Glow-care',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-09-01'),
    status: 'Completed',
    featured: true,
    published: true,
    order: 3,
  },
  {
    name: 'Full Body Posture Detection',
    description:
      'Award-winning Computer Vision project using AI to detect and analyze full body posture in real-time. Winner of Best Final Year Project Award 2025.',
    longDescription:
      'Developed an innovative Computer Vision solution for real-time full body posture detection and analysis. Used MediaPipe for pose estimation and TensorFlow for posture classification. Won Best Final Year Project Award among 50+ competing projects at Suryodaya College of Engineering.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'NumPy', 'Computer Vision'],
    category: 'AI/ML',
    thumbnailUrl: '/uploads/projects/posture-detection.jpg',
    images: [],
    features: [
      'Real-time full body pose detection using MediaPipe',
      'Posture classification with TensorFlow',
      'Live feedback on posture correctness',
      'Angle calculation for joint positions',
      'Visual feedback overlay on video stream',
    ],
    achievements: ['Best Final Year Project Award 2025', 'Selected among 50+ projects'],
    challenges: ['Real-time performance on consumer hardware', 'Robust pose estimation in varied lighting'],
    impact: 'Applications in fitness training, physiotherapy, and ergonomic monitoring',
    demoUrl: '',
    repoUrl: 'https://github.com/Tusharwankhede369',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2025-04-01'),
    status: 'Completed',
    featured: true,
    published: true,
    order: 4,
  },
  {
    name: 'SEO Analytics Tool',
    description:
      'SEO analytics platform with keyword tracking and performance dashboard. Top 10 at Central India Hackathon 2025 among 300+ teams.',
    longDescription:
      'Built during Central India Hackathon 2025 — keyword tracking, performance dashboards with charts, and actionable SEO insights.',
    technologies: ['Node.js', 'React.js', 'MongoDB', 'Chart.js', 'REST APIs'],
    category: 'Full Stack',
    thumbnailUrl: '/uploads/projects/seo-analytics.jpg',
    images: [],
    features: [
      'Keyword rank tracking',
      'Competitor analysis and comparison',
      'Performance dashboard with interactive charts',
      'SEO score calculation and reporting',
      'Historical data tracking and trends',
    ],
    achievements: ['Top 10 at Central India Hackathon 2025', 'Competed against 300+ teams'],
    challenges: ['Time-boxed hackathon delivery', 'Reliable data ingestion'],
    impact: 'Helps businesses improve online visibility',
    demoUrl: '',
    repoUrl: 'https://github.com/Tusharwankhede369/CenralIndia_Frontend',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-03-15'),
    status: 'Completed',
    featured: false,
    published: true,
    order: 5,
  },
];

const SKILLS = [
  { name: 'Python', category: 'Programming Languages', proficiency: 85, iconEmoji: '🐍', order: 1 },
  { name: 'JavaScript', category: 'Programming Languages', proficiency: 90, iconEmoji: '⚡', order: 2 },
  { name: 'C++', category: 'Programming Languages', proficiency: 75, iconEmoji: '⚙️', order: 3 },
  { name: 'C', category: 'Programming Languages', proficiency: 70, iconEmoji: '©️', order: 4 },
  { name: 'React.js', category: 'Frontend', proficiency: 90, iconEmoji: '⚛️', order: 5 },
  { name: 'Redux Toolkit', category: 'Frontend', proficiency: 85, iconEmoji: '🔄', order: 6 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 88, iconEmoji: '🎨', order: 7 },
  { name: 'Bootstrap', category: 'Frontend', proficiency: 85, iconEmoji: '📱', order: 8 },
  { name: 'HTML/CSS', category: 'Frontend', proficiency: 95, iconEmoji: '🌐', order: 9 },
  { name: 'Axios', category: 'Frontend', proficiency: 88, iconEmoji: '📡', order: 10 },
  { name: 'Node.js', category: 'Backend', proficiency: 90, iconEmoji: '💚', order: 11 },
  { name: 'Express.js', category: 'Backend', proficiency: 88, iconEmoji: '🚂', order: 12 },
  { name: 'FastAPI', category: 'Backend', proficiency: 80, iconEmoji: '⚡', order: 13 },
  { name: 'REST APIs', category: 'Backend', proficiency: 90, iconEmoji: '🔌', order: 14 },
  { name: 'JWT', category: 'Backend', proficiency: 85, iconEmoji: '🔐', order: 15 },
  { name: 'MongoDB', category: 'Databases', proficiency: 88, iconEmoji: '🍃', order: 16 },
  { name: 'PostgreSQL', category: 'Databases', proficiency: 75, iconEmoji: '🐘', order: 17 },
  { name: 'MySQL', category: 'Databases', proficiency: 75, iconEmoji: '🐬', order: 18 },
  { name: 'RAG', category: 'AI/ML', proficiency: 75, iconEmoji: '🤖', order: 19 },
  { name: 'FAISS', category: 'AI/ML', proficiency: 70, iconEmoji: '🔍', order: 20 },
  { name: 'OCR (Tesseract)', category: 'AI/ML', proficiency: 80, iconEmoji: '📄', order: 21 },
  { name: 'TensorFlow', category: 'AI/ML', proficiency: 75, iconEmoji: '🧠', order: 22 },
  { name: 'OpenCV', category: 'AI/ML', proficiency: 78, iconEmoji: '👁️', order: 23 },
  { name: 'Git/GitHub', category: 'Tools', proficiency: 90, iconEmoji: '🔧', order: 24 },
  { name: 'Postman', category: 'Tools', proficiency: 85, iconEmoji: '📮', order: 25 },
  { name: 'Render', category: 'Tools', proficiency: 80, iconEmoji: '☁️', order: 26 },
  { name: 'RBAC', category: 'Concepts', proficiency: 85, iconEmoji: '🔒', order: 27 },
  { name: 'OOP', category: 'Concepts', proficiency: 82, iconEmoji: '📦', order: 28 },
  { name: 'System Design', category: 'Concepts', proficiency: 75, iconEmoji: '🏗️', order: 29 },
  { name: 'API Design', category: 'Concepts', proficiency: 88, iconEmoji: '🔗', order: 30 },
  { name: 'Microservices', category: 'Concepts', proficiency: 70, iconEmoji: '🧩', order: 31 },
  { name: 'Data Modeling', category: 'Concepts', proficiency: 80, iconEmoji: '📊', order: 32 },
];

const EXPERIENCE = {
  company: 'Amplemind',
  role: 'Software Developer Intern',
  location: 'Nagpur, India',
  employmentType: 'onsite',
  startDate: new Date('2025-09-01'),
  endDate: new Date('2026-02-28'),
  current: false,
  description:
    'Developed full-stack e-commerce solutions and implemented secure authentication systems.',
  technologies: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Redux Toolkit', 'JWT', 'Axios', 'Render'],
  responsibilities: [
    'Built NovaMart, a full-stack e-commerce platform using Node.js, Express.js, MongoDB, and React.js, managing 500+ products and variations with real-time inventory synchronization',
    'Implemented JWT-based authentication and role-based access control (RBAC), ensuring secure access across different user roles',
    'Designed optimized MongoDB schemas and indexes to improve product filtering and query performance',
    'Collaborated with frontend team to integrate React.js, Redux Toolkit, and Axios with backend REST APIs',
    'Deployed the application on Render with reliable performance monitoring',
  ],
  metrics: [
    { label: 'Products', value: '500+' },
    { label: 'Stack', value: 'MERN · JWT' },
    { label: 'Duration', value: '6 months' },
  ],
  order: 1,
  published: true,
};

const ACHIEVEMENTS = [
  {
    title: 'Best Final Year Project Award',
    description:
      "Won Best Final Year Project Award for 'Full Body Posture Detection using Computer Vision' — selected among 50+ competing projects.",
    organization: 'Suryodaya College of Engineering and Technology',
    date: new Date('2025-04-01'),
    awardType: 'Academic Excellence',
    icon: '🏆',
    statHighlight: '50+ projects',
    order: 1,
    published: true,
    visible: true,
  },
  {
    title: 'Top 10 - Central India Hackathon',
    description:
      'Achieved Top 10 position among 300+ competing teams at Central India Hackathon 2025 with an SEO Analytics Tool.',
    organization: 'Central India Hackathon 2025',
    date: new Date('2025-03-15'),
    awardType: 'Competition',
    icon: '🥇',
    statHighlight: 'Top 10 / 300+',
    order: 2,
    published: true,
    visible: true,
  },
  {
    title: '3rd Prize - Paper Presentation',
    description:
      'Secured 3rd Prize in Technical Paper Presentation at Suryodaya College of Engineering.',
    organization: 'Suryodaya College of Engineering and Technology',
    date: new Date('2025-02-01'),
    awardType: 'Academic Excellence',
    icon: '🥉',
    statHighlight: '3rd Prize',
    order: 3,
    published: true,
    visible: true,
  },
];

const CERTIFICATIONS = [
  {
    name: 'Cloud Computing',
    issuer: 'NPTEL - Ministry of Education, Govt. of India',
    issueDate: new Date('2025-04-01'),
    pdfUrl: '/uploads/certificates/nptel-cloud-computing.pdf',
    logoUrl: '/uploads/logos/nptel.png',
    description: 'Cloud computing fundamentals, architectures, and deployment models',
    order: 1,
    published: true,
    visible: true,
  },
  {
    name: 'Reinforcement Learning',
    issuer: 'NPTEL - Ministry of Education, Govt. of India',
    issueDate: new Date('2025-04-01'),
    pdfUrl: '/uploads/certificates/nptel-reinforcement-learning.pdf',
    logoUrl: '/uploads/logos/nptel.png',
    description: 'Q-Learning, policy gradients, and Deep RL foundations',
    order: 2,
    published: true,
    visible: true,
  },
  {
    name: 'AWS APAC Solutions Architecture Virtual Experience',
    issuer: 'Forage',
    issueDate: new Date('2024-12-01'),
    credentialUrl: 'https://www.theforage.com/simulations/aws/apac-solutions-architecture-virtual-experience',
    pdfUrl: '/uploads/certificates/aws-solutions-architecture.pdf',
    logoUrl: '/uploads/logos/aws.png',
    description: 'Virtual experience on AWS cloud architecture and solutions design',
    order: 3,
    published: true,
    visible: true,
  },
  {
    name: 'Web Development Masterclass',
    issuer: 'Udemy',
    issueDate: new Date('2025-09-01'),
    pdfUrl: '/uploads/certificates/web-dev-masterclass.pdf',
    logoUrl: '/uploads/logos/udemy.png',
    description: 'Full-stack web foundations with HTML, CSS, JavaScript, and Node.js',
    order: 4,
    published: true,
    visible: true,
  },
  {
    name: 'Bootstrap for Beginners',
    issuer: 'Udemy',
    issueDate: new Date('2025-07-01'),
    pdfUrl: '/uploads/certificates/bootstrap-beginners.pdf',
    logoUrl: '/uploads/logos/udemy.png',
    description: 'Responsive web design with Bootstrap',
    order: 5,
    published: true,
    visible: true,
  },
];

const EDUCATION = [
  {
    institution: 'Suryodaya College of Engineering and Technology',
    degree: 'Bachelor of Technology',
    field: 'Computer Engineering',
    grade: '7.1 CGPA',
    university: 'Nagpur University',
    location: 'Nagpur, India',
    startDate: new Date('2021-12-01'),
    endDate: new Date('2025-06-01'),
    current: false,
    highlights: [
      'Best Final Year Project Award 2025',
      'Specialized in Full Stack Development and AI/ML',
      'Active participant in technical competitions and hackathons',
    ],
    order: 1,
  },
  {
    institution: 'Ujjwal High School and Junior College',
    degree: 'Higher Secondary Certificate (HSC)',
    field: 'Science (PCM)',
    grade: '69.83%',
    university: '',
    location: 'Nagpur, India',
    startDate: new Date('2020-07-01'),
    endDate: new Date('2021-06-01'),
    current: false,
    highlights: [],
    order: 2,
  },
];

/**
 * Seeds portfolio collections when About is missing, or when FORCE_SEED_DB=true (destructive for portfolio data only).
 */
export async function ensurePortfolioSeed() {
  const force = process.env.FORCE_SEED_DB === 'true';
  const existingAbout = await About.findOne();
  if (existingAbout && !force) {
    console.log('[seed] Portfolio already initialized. Set FORCE_SEED_DB=true to wipe & re-seed content.');
    return;
  }

  console.log('[seed] Seeding portfolio collections (About, Projects, Skills, …)…');
  await clearPortfolioData();

  await About.create(ABOUT_DOC);
  await Project.insertMany(PROJECTS);
  await Skill.insertMany(SKILLS);
  await Experience.create(EXPERIENCE);
  await Achievement.insertMany(ACHIEVEMENTS);
  await Certification.insertMany(CERTIFICATIONS);
  await Education.insertMany(EDUCATION);

  let settings = await Settings.findOne();
  if (!settings) {
    await Settings.create({
      resumePdfUrl: '/uploads/resume.pdf',
      seo: {
        metaTitle: 'Tushar Prabhakar Wankhede · Full Stack Developer',
        metaDescription: ABOUT_DOC.professionalSummary.slice(0, 155),
        keywords: 'MERN, React, Node.js, AI, Portfolio, Nagpur',
      },
      socialLinks: {
        linkedIn: ABOUT_DOC.linkedInUrl,
        github: ABOUT_DOC.githubUrl,
        email: `mailto:${ABOUT_DOC.email}`,
      },
    });
  } else {
    settings.resumePdfUrl = settings.resumePdfUrl || '/uploads/resume.pdf';
    await settings.save();
  }

  console.log('[seed] Portfolio seed completed successfully.');
}

/** CLI: node src/seeds/runSeed.js or npm run seed */
export async function runForceSeedFromCli() {
  process.env.FORCE_SEED_DB = 'true';
  await ensurePortfolioSeed();
}
