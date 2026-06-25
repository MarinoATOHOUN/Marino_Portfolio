import { Github, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.04] bg-[#060608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <span className="text-lg font-bold tracking-tight text-white/80">
              MA<span className="text-blue-400">.</span>
            </span>
            <p className="mt-1 text-xs text-gray-600 max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Mail, href: 'mailto:marinoatohoun@gmail.com', key: 'email' },
              { icon: Github, href: 'https://github.com/MarinoATOHOUN', key: 'github' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/marino-atohoun', key: 'linkedin' },
              { icon: MessageCircle, href: 'https://wa.me/22959037170', key: 'whatsapp' },
              { icon: Phone, href: 'tel:+2290159037170', key: 'phone' },
            ].map(({ icon: Icon, href, key }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-400 transition-colors rounded-lg hover:bg-white/[0.04]"
                aria-label={t(`footer.socialLinks.${key}`)}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-gray-700">
            &copy; {year} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
