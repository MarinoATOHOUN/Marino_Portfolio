import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Mail, MapPin, Phone, Github, Linkedin, ExternalLink, Code, Database, Brain, Award, GraduationCap, Music, Plane, Film, Dumbbell } from 'lucide-react'
import profilePicture from './assets/profile_picture.png'
import './App.css'


function App() {
  const [activeSection, setActiveSection] = useState('home')
  // Gestion du thème jour/nuit
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'education', 'hobbies', 'contact']
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const skills = {
    'Science des Données': ['Pipelines de données', 'Analyse prédictive', 'Big Data', 'Visualisation de données', 'Web Scraping', 'Text Mining'],
    'Programmation et Outils': ['Python', 'Django', 'SQL (PostgreSQL & MySQL)', 'Microsoft Power BI', 'Tableau (Excel)', 'API REST'],
    'Intelligence Artificielle': ['Deep Learning', 'Apprentissage supervisé', 'Déploiement de modèle d\'IA', 'NLP', 'Computer Vision', 'YOLO'],
    'Spécialisations': ['Traitement du langage naturel', 'Détection d\'objets', 'Vision par ordinateur', 'LLM Fine-tuning', 'Real-time Processing']
  }

  const projects = [
    {
      title: 'Fire Detection',
      description: 'Modèle de détection automatique des débuts d\'incendie à partir d\'images et vidéos. Système d\'IA temps réel pour la prévention des risques et la sécurité des infrastructures.',
      skills: ['YOLO', 'Image Recognition', 'Safety AI', 'Deep Learning'],
      period: '2025',
      link: 'https://github.com/MarinoATOHOUN',
    },
    {
      title: 'Sign Language Recognition',
      description: 'Modèle d\'IA traduisant les gestes du langage des signes en texte en temps réel via caméra. Solution d\'accessibilité numérique pour personnes sourdes et malentendantes.',
      skills: ['YOLO', 'Deep Learning', 'Real-Time Processing', 'Computer Vision'],
      period: '2025',
      link: 'https://github.com/MarinoATOHOUN',
    },
    {
      title: 'Intrusion Detection',
      description: 'Système d\'analyse vidéo intelligent pour caméras de surveillance détectant les intrusions. Solution de sécurité et monitoring intelligent basée sur l\'IA.',
      skills: ['YOLO', 'Computer Vision', 'Surveillance', 'Deep Learning'],
      period: '2025',
      link: 'https://github.com/MarinoATOHOUN',
    },
    {
      title: 'GuardClause',
      description: 'Système d\'analyse automatique des termes et conditions de sites web. Aide les utilisateurs à identifier les points critiques et clauses importantes via NLP.',
      skills: ['NLP', 'Python', 'Web Scraping', 'Text Mining'],
      period: '2025',
      link: 'https://github.com/MarinoATOHOUN',
    },
    {
      title: 'TrafficInsight AI',
      description: 'Projet novateur visant à prédire la densité du trafic dans des environnements urbains futuristes. Utilisation de techniques avancées d\'intelligence artificielle (IA) pour comprendre et anticiper les conditions de circulation.',
      skills: ['Intelligence Artificielle', 'Analyse prédictive'],
      period: 'Mai 2024',
      link: 'https://github.com/MarinoATOHOUN/TrafficInsight-AI',
    },
    {
      title: 'DiabeteX Predictor',
      description: 'Union de la science des données et de la santé. Utilisation du dataset Kaggle \'Diabetes\' pour développer un modèle d\'IA anticipant le diabète. Vise à améliorer les diagnostics préventifs et à favoriser une meilleure gestion de la santé.',
      skills: ['Big data', 'Analyse des données', 'Visualisation de données'],
      period: 'Mars 2024',
      link: 'https://github.com/MarinoATOHOUN/DiabeteX-Predictor',
    },
    {
      title: 'Explore the universe',
      description: 'Gestion d\'informations sur les galaxies, étoiles, planètes, lunes et soleils. Projet de base de données avec données fictives.',
      skills: ['PostgreSQL', 'SQL', 'Administration de bases de données'],
      period: '2024',
      link: 'https://github.com/MarinoATOHOUN/Universe-database',
    },
    {
      title: 'Programme Python de gestion de contacts',
      description: 'Gère une liste de contacts stockée dans un fichier CSV. Permet d\'ajouter, mettre à jour, supprimer, rechercher ou afficher des contacts. Adaptable pour d\'autres types de données.',
      skills: ['Python', 'Collecte de données', 'Conception d\'algorithmes'],
      period: '2024',
      link: 'https://github.com/MarinoATOHOUN/contact_saver',
    },
    { 
      "title": "AkomptaAI", 
      "description": "Application SaaS d'intelligence artificielle pour la comptabilité et gestion financière. Automatisation des processus financiers via ML et reconnaissance vocale, avec interface web moderne responsive.", 
      "skills": ["Python", "Intelligence Artificielle", "Django", "React", "Développement Full-Stack", "ML", "TailwindCSS"], 
      "period": "2024-2025", 
      "link": "https://github.com/MarinoATOHOUN/AkomptaAI" 
    }, 
    { 
      "title": "Marino_Portfolio", 
      "description": "Portfolio personnel présentant les projets et compétences en développement web. Interface moderne et responsive pour mettre en valeur les réalisations professionnelles.", 
      "skills": ["JavaScript", "Développement Frontend", "Portfolio Web", "UI/UX", "Design Web"], 
      "period": "2025", 
      "link": "https://github.com/MarinoATOHOUN/Marino_Portfolio" 
    }, 
    { "title": "Interface_Chat_IA", 
      "description": "Interface de chat utilisant l'intelligence artificielle pour des conversations interactives. Application web moderne avec intégration d'API IA pour des échanges naturels.", 
      "skills": ["JavaScript", "Intelligence Artificielle", "API Integration", "Interface Utilisateur", "Chat Bot"], 
      "period": "2025", 
      "link": "https://github.com/MarinoATOHOUN/Interface_Chat_IA" 
    }, 
    { "title": "EduShare", 
      "description": "Plateforme participative open-source pour partage gratuit de documents PDF (cours, révisions, publications). Inclut une API publique pour chercheurs et développeurs, base de données éducative fiable et support de modèles d'IA responables.", 
      "skills": ["Django", "Full-Stack Development", "API REST", "PostgreSQL", "Plateforme Éducative"], 
      "period": "2025", 
      "link": "https://github.com/MarinoATOHOUN/EduShare" 
    },
    { 
      "title": "SATCAP CO2", 
      "description": "Système de traitement de données satellitaires pour l'étude des gaz à effet de serre. Inclut des algorithmes d'analyse géospatiale, modèles prédictifs IA et plateforme web interactive de visualisation de données.", 
      "skills": ["API Development", "Traitement d'Images", "Données Satellitaires", "Géospatial", "Data Science"], 
      "period": "2024-2025", 
      "link": "https://github.com/MarinoATOHOUN/SatCapAPI" 
    },
    { 
      "title": "SATCAP Ocean", 
      "description": "Détection et classification de déchets aquatiques utilisant la vision par ordinateur. Système en temps réel pour la surveillance environnementale et les initiatives de nettoyage maritime.", 
      "skills": ["YOLOv8", "Computer Vision", "Environmental AI", "Real-Time Processing"], 
      "period": "2024-2025", 
      "link": "https://github.com/MarinoATOHOUN/SatCapOcean" 
    },
    { 
      "title": "SATCAP CO2 - ChatBot", 
      "description": "Chatbot intelligent spécialisé pour conversations sur l'impact environnemental des gaz à effet de serre. LLM fin-tuné avec NLP avancé pour interactions fluides sur les enjeux climatiques.", 
      "skills": ["NLP", "LLM Fine-tuning", "Web Development", "AI Conversation", "Climate AI"], 
      "period": "2024-2025", 
      "link": "https://github.com/MarinoATOHOUN" 
    }, 
    { 
      "title": "WebSiteTaslyTogo", 
      "description": "Site web pour Tasly Togo, présentant les services et produits de l'entreprise avec une interface moderne et professionnelle.", 
      "skills": ["Python", "Développement Web", "Site Vitrine", "Flask", "Design Web"], 
      "period": "2024", 
      "link": "https://github.com/MarinoATOHOUN/WebSiteTaslyTogo" 
    }
  ]

  const certifications = [
    {
      title: 'Scikit-learn pour le machine learning',
      issuer: 'LinkedIn',
      date: 'Juin 2024',
      link: 'https://www.linkedin.com/learning/certificates/233488829575153682e6aa8a6ee10741c11115aa2f034936f54af8e3d7c75aca?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BAAqnx1HtR263jc0vJWGLFg%3D%3D'
    },
    {
      title: 'Se préparer au métier d\'analyste de données par Microsoft et LinkedIn',
      issuer: 'LinkedIn',
      date: 'Mai 2024',
      link: 'https://www.linkedin.com/learning/certificates/96c3944c45421870d70d17fdbf2f38cf18f519bb778a609ea681bba43bc7593f?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BAAqnx1HtR263jc0vJWGLFg%3D%3D'
    },
    {
      title: 'Python Intermediate',
      issuer: 'Sololearn',
      date: 'Novembre 2023',
      link: 'https://api2.sololearn.com/v2/certificates/CC-FAOVUGMP/image/png'
    },
    {
      title: 'SQL Intermediate',
      issuer: 'Sololearn',
      date: 'Novembre 2023',
      link: 'https://api2.sololearn.com/v2/certificates/CC-XMGBGWXF/image/png'
    },
    {
      title: 'Tech for Everyone',
      issuer: 'Sololearn',
      date: 'Novembre 2023',
      link: 'https://api2.sololearn.com/v2/certificates/CC-T9DBI78K/image/png'
    },
    {
      title: 'Introduction to JavaScript',
      issuer: 'Sololearn',
      date: 'Novembre 2023',
      link: 'https://api2.sololearn.com/v2/certificates/CC-TMD0N6TO/image/png'
    },
    {
      title: 'Introduction to HTML',
      issuer: 'Sololearn',
      date: 'Novembre 2023',
      link: 'https://api2.sololearn.com/v2/certificates/CC-NXDJIYNH/image/png'
    },
    {
      title: 'Data Programming',
      issuer: 'Sololearn',
      date: 'Novembre 2023',
      link: 'https://api2.sololearn.com/v2/certificates/CC-2QZEPXTG/image/png'
    },
    {
      title: 'Python Developer',
      issuer: 'Sololearn',
      date: 'Novembre 2023',
      link: 'https://api2.sololearn.com/v2/certificates/CC-XXBHCZM2/image/png'
    },
    {
      title: 'Scientific Computing with Python',
      issuer: 'FreeCodeCamp',
      date: 'February 2024',
      link: 'https://freecodecamp.org/certification/marino_atohoun/scientific-computing-with-python-v7'
    },
    {
      title: 'Data Analysis With Python',
      issuer: 'FreeCodeCamp',
      date: 'February 2024',
      link: 'https://freecodecamp.org/certification/marino_atohoun/data-analysis-with-python-v7'
    },
    {
      title: 'Initiez-vous à Linux',
      issuer: 'OpenClassrooms',
      date: 'Mai 2023',
      link: 'https://openclassrooms.com/fr/course-certificates/1746307242'
    },
    {
      title: 'Initiez vous à l\'Intelligence Artificielle',
      issuer: 'OpenClassrooms',
      date: 'Mai 2023',
      link: 'https://openclassrooms.com/fr/course-certificates/2015564943'
    },
    {
      title: 'Introduction to R',
      issuer: 'DataCamp',
      date: 'Novembre 2023',
      link: ''
    },
    {
      title: 'Se préparer au métier d’analyste de données par Microsoft et LinkedIn',
      issuer: 'Microsoft et LinkedIn',
      date: 'Mai 2024',
      link: 'https://freecodecamp.org/certification/marino_atohoun/data-analysis-with-python-v7'
    },
    {
      title: 'College Algebra with Python',
      issuer: 'FreeCodeCamp',
      date: 'Mars 2024',
      link: 'https://www.freecodecamp.org/certification/marino_atohoun/college-algebra-with-python-v8'
    }
  ]

  const education = [
    {
      degree: 'Licence 1 en Génie Logiciel avec une spécialisation en DataScience',
      institution: 'IFRI (Institut de Formation et de Recherche en Informatique)',
      period: 'Nov. 2022 - Juil. 2023'
    },
    {
      degree: 'Baccalauréat Scientifique (Série D)',
      institution: 'College d\'enseignement Général de Davie',
      period: '2022'
    }
  ]

  const hobbies = [
    { name: 'Musique', icon: Music },
    { name: 'Sport', icon: Dumbbell },
    { name: 'Cinéma', icon: Film },
    { name: 'Voyage', icon: Plane }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-[#1d293d]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#2d3a47] z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Marino ATOHOUN</h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex space-x-6">
                {['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'education', 'hobbies', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors ${
                      activeSection === section ? 'text-blue-600 dark:text-[#2b7fff] font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#2b7fff]'
                    }`}
                  >
                    {section === 'home' ? 'Accueil' : 
                     section === 'about' ? 'À propos' :
                     section === 'experience' ? 'Expérience' :
                     section === 'projects' ? 'Projets' :
                     section === 'skills' ? 'Compétences' :
                     section === 'certifications' ? 'Certifications' :
                     section === 'education' ? 'Formation' :
                     section === 'hobbies' ? 'Loisirs' :
                     section === 'contact' ? 'Contact' : section}
                  </button>
                ))}
              </div>
              {/* Switch jour/nuit */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-300">{isDark ? 'Nuit' : 'Jour'}</span>
                <Switch checked={isDark} onCheckedChange={setIsDark} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Mahouli Marino
                <span className="block text-blue-600 dark:text-[#2b7fff]">ATOHOUN</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Data Scientist | Data Analyst | Développeur Python
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                Passionné par l'intelligence artificielle et l'analyse de données, mon objectif est d'accumuler des compétences solides pour mener à bien des projets innovants et mettre mon expertise au service d'entreprises ambitieuses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={() => scrollToSection('projects')} className="bg-blue-600 hover:bg-blue-700">
                  Voir mes projets
                </Button>
                <Button variant="outline" onClick={() => scrollToSection('contact')}>
                  Me contacter
                </Button>
                <a href="https://drive.google.com/file/d/1pBYwFen9hsZHiS94CHSvmQso2cDLeLKf/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white">
                    Mon CV
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img 
                    src={profilePicture} 
                    alt="Mahouli Marino ATOHOUN" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 dark:bg-[#2b7fff] text-white p-4 rounded-full shadow-lg">
                  <Code size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white dark:bg-[#1d293d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">À Propos</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Je suis un professionnel passionné par la science des données, l'analyse et le développement Python. Mon parcours est guidé par une soif constante d'apprentissage et une volonté de résoudre des problèmes complexes grâce à des solutions basées sur les données et l'IA.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Je suis minutieux dans mon travail et je crois fermement en l'importance d'une communication claire et efficace pour la réussite des projets.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Communication</Badge>
                <Badge variant="secondary">Minutieux</Badge>
                <Badge variant="secondary">Passionné</Badge>
                <Badge variant="secondary">Apprentissage continu</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Database className="w-12 h-12 text-blue-600 dark:text-[#2b7fff] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Science</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Analyse et visualisation de données</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 text-blue-600 dark:text-[#2b7fff] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">IA & ML</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Intelligence artificielle et apprentissage automatique</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 bg-gray-50 dark:bg-[#151e2e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Expérience Professionnelle</h2>
          
          <a href='https://djeemm.com/' target='_blank' rel='noopener noreferrer' className='block hover:opacity-90 transition-opacity'>
            <Card className="max-w-4xl mx-auto mb-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl dark:text-white">IA Engineer & AI Product Lead</CardTitle>
                    <CardDescription className="text-lg font-medium text-blue-600 dark:text-[#2b7fff]">Djeemm</CardDescription>
                  </div>
                  <Badge>2026 - Aujourd'hui</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">En remote</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Conception et développement du moteur IA de scoring et matching des talents. Pilotage du système IA de sélection et matching pour le recrutement international, conception de l'architecture data et IA, développement des modèles NLP et intégration dans le workflow produit.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Intelligence Artificielle</Badge>
                  <Badge variant="outline">NLP</Badge>
                  <Badge variant="outline">Architecture Data</Badge>
                  <Badge variant="outline">Product Leadership</Badge>
                </div>
              </CardContent>
            </Card>
          </a>

          <a href='https://cosmolabhub.space/' target='_blank' rel='noopener noreferrer' className='block hover:opacity-90 transition-opacity'>
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl dark:text-white">Data Scientist & Fullstack Developer</CardTitle>
                    <CardDescription className="text-lg font-medium text-blue-600 dark:text-[#2b7fff]">CosmoLAB Hub</CardDescription>
                  </div>
                  <Badge>Avril 2024 - 2026</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">Bénin (Sur site)</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Conception d'algorithmes et administration de bases de données dans un environnement innovant axé sur la science des données.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Conception d'algorithmes</Badge>
                  <Badge variant="outline">Administration de bases de données</Badge>
                  <Badge variant="outline">Science des données</Badge>
                </div>
              </CardContent>
            </Card>
          </a>

          <Card className="max-w-4xl mx-auto my-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl dark:text-white">Développeur Web</CardTitle>
                  <CardDescription className="text-lg font-medium text-blue-600 dark:text-[#2b7fff]">Freelance / Indépendant</CardDescription>
                </div>
                <Badge>2023 - 2024</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Togo (Sur site)</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <b> Tasly Togo (Médecine) – Lomé, Togo :</b> Conception et développement du site web de l’entreprise. <br />
                <b> Julie Soap (Fabrication de savon) – Lomé, Togo :</b> Conception et développement du site web de l’entreprise.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Développement Web</Badge>
                <Badge variant="outline">Intégration API</Badge>
                <Badge variant="outline">Développement Frontend</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-4xl mx-auto my-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl dark:text-white">Formateur Python</CardTitle>
                  <CardDescription className="text-lg font-medium text-blue-600 dark:text-[#2b7fff]">Bénévolat</CardDescription>
                </div>
                <Badge>2022 - 2023</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Bénin (En ligne)</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Dans le cadre d'une initiation à la programmation offerte gratuitement aux
                jeunes, j'ai été formateur en python où j'ai initié une centaine de jeunes
                programmeurs au langage de programmation python.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Initiation à la programmation</Badge>
                <Badge variant="outline">Maitrise Python</Badge>
                <Badge variant="outline">Pédagogie</Badge>
                <Badge variant="outline">Communication</Badge>
                <Badge variant="outline">Suivi des apprenants</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-white dark:bg-[#1d293d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Projets</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl dark:text-white">{project.title}</CardTitle>
                      <Badge variant="secondary">{project.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-gray-50 dark:bg-[#151e2e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Compétences</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 px-4 bg-white dark:bg-[#1d293d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-blue-600 dark:text-[#2b7fff] mt-1" />
                      <div>
                        <CardTitle className="text-lg dark:text-white">{cert.title}</CardTitle>
                        <CardDescription>{cert.issuer} • {cert.date}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 bg-gray-50 dark:bg-[#151e2e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Formation</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-[#2b7fff] mt-1" />
                    <div>
                      <CardTitle className="text-lg dark:text-white">{edu.degree}</CardTitle>
                      <CardDescription>{edu.institution} • {edu.period}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="py-16 px-4 bg-white dark:bg-[#1d293d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Loisirs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {hobbies.map((hobby, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <hobby.icon className="w-12 h-12 text-blue-600 dark:text-[#2b7fff] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{hobby.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-900 dark:bg-[#141d2d] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 dark:text-white">Contactez-moi</h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Intéressé par une collaboration ? N'hésitez pas à me contacter pour discuter de vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>mahouliatohoun502@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Cotonou, Bénin</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <a href='https://www.linkedin.com/in/marino-atohoun' variant="outline" className="border-white text-white">
              <Linkedin className="w-8 h-8 mr-2" />
            </a>
            <a href='https://github.com/MarinoATOHOUN' variant="outline" className="border-white text-white">
              <Github className="w-8 h-8 mr-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-[#141d2d] text-gray-300 dark:text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Mahouli Marino ATOHOUN. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

