import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Expertise from '@/components/sections/Expertise'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Certifications from '@/components/sections/Certifications'
import Vision from '@/components/sections/Vision'
import Contact from '@/components/sections/Contact'
import ChatBot from '@/components/chat/ChatBot'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'expertise', 'projects', 'experience', 'certifications', 'vision', 'contact']
      const scrollPosition = window.scrollY + 120

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

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar activeSection={activeSection} onNavClick={scrollToSection} />
      <main>
        <Hero onNavClick={scrollToSection} />
        <About />
        <Expertise />
        <Projects />
        <Experience />
        <Certifications />
        <Vision />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default App
