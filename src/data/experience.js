import djeemmLogo from '@/assets/logodjeemm.png'
import blackbenaiLogo from '@/assets/blackbenailogo.png'
import cosmolabLogo from '@/assets/CosmoLABHubLogo.png'

export const experiences = [
  {
    id: 'djeemm',
    role: 'IA Engineer & AI Product Lead',
    company: 'Djeemm',
    companyUrl: 'https://djeemm.com/',
    logo: djeemmLogo,
    period: '2026 — Present',
    location: 'Remote',
    description: [
      'Designed and built the AI engine for talent scoring and matching — the core intelligence of the platform.',
      'Led AI product strategy, defining the ML roadmap and aligning technical decisions with business goals.',
      'Developed NLP models for intelligent candidate-job matching, resume parsing, and skill extraction.',
      'Architected the data infrastructure powering real-time AI recommendations.',
    ],
    tags: ['AI Product Leadership', 'NLP', 'ML Architecture', 'System Design'],
    impact: 'Built the AI brain of an international recruitment platform.',
  },
  {
    id: 'blackbenai',
    role: 'Founder & CEO',
    company: 'BlackBenAI',
    companyUrl: 'https://blackbenai.com',
    logo: blackbenaiLogo,
    period: '2025 — Present',
    location: 'Cotonou, Benin',
    description: [
      'Founded and built BlackBenAI, a Beninese AI startup developing sovereign AI solutions for Africa.',
      'Led the development of 6+ production SaaS platforms including LegalEase AI, GreenMetrics, FineTune AI, EduShare, SaaS Builder, and AfriDataHub.',
      'Architected and deployed the full infrastructure stack (Docker, Nginx, PostgreSQL, Redis) across multiple VPS servers managing 50+ containers.',
      'Built production AI systems including LLM fine-tuning (LoRA/QLoRA), RAG (BM25), computer vision (YOLO), and AI chatbot solutions.',
      'Managed technical roadmap, product strategy, and company growth from concept to 12+ deployed projects.',
    ],
    tags: [
      'Founder',
      'AI Product Strategy',
      'Full-Stack Architecture',
      'DevOps & Infrastructure',
      'Team Leadership',
    ],
    impact:
      "Building Africa's sovereign AI infrastructure with 12+ production projects.",
  },
  {
    id: 'cosmolab',
    role: 'Data Scientist & Fullstack Developer',
    company: 'CosmoLAB Hub',
    companyUrl: 'https://cosmolabhub.space/',
    logo: cosmolabLogo,
    period: 'Apr 2024 — 2026',
    location: 'Benin (On-site)',
    description: [
      'Developed AI algorithms and data pipelines for innovative projects across multiple domains.',
      'Built full-stack applications integrating data science capabilities with modern web interfaces.',
      'Administered and optimized database systems for large-scale data processing.',
    ],
    tags: ['Data Science', 'Fullstack Development', 'AI Algorithms', 'Database Administration'],
    impact: 'Drove data-driven innovation across multiple projects.',
  },
  {
    id: 'freelance',
    role: 'Fullstack Developer',
    company: 'Freelance / Independent',
    companyUrl: null,
    period: '2023 — 2024',
    location: 'Togo (On-site)',
    description: [
      'Built and deployed production websites for businesses: Tasly Togo (healthcare) and Julie Soap (manufacturing).',
      'Delivered end-to-end solutions from client consultation to deployment and maintenance.',
      'Managed client relationships, requirements gathering, and project timelines independently.',
    ],
    tags: ['Web Development', 'Client Management', 'Fullstack', 'API Integration'],
    impact: 'Delivered production systems for real businesses.',
  },
  {
    id: 'teaching',
    role: 'Python Instructor',
    company: 'Volunteer Teaching Program',
    companyUrl: null,
    period: '2022 — 2023',
    location: 'Benin (Online)',
    description: [
      'Initiated over 100 young learners into programming through a free community education program.',
      'Developed curriculum and learning materials for Python programming fundamentals.',
      'Provided mentorship and personalized guidance to aspiring developers.',
    ],
    tags: ['Teaching', 'Python', 'Community Building', 'Mentorship'],
    impact: 'Introduced 100+ young Africans to programming.',
  },
]
