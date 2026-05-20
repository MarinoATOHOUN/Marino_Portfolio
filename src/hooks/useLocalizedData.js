import { useTranslation } from 'react-i18next'
import { experiences as enExperiences } from '@/data/experience'
import { projects as enProjects, techProjects as enTechProjects } from '@/data/projects'
import { skillCategories as enSkillCategories } from '@/data/skills'
import { expertise as enExpertise } from '@/data/skills'

function getTranslated(t, i18n, path, fallback) {
  return i18n.exists(path) ? t(path) : fallback
}

function getTranslatedArray(t, i18n, path, fallback) {
  return i18n.exists(path) ? t(path, { returnObjects: true }) : fallback
}

export function useLocalizedData() {
  const { t, i18n } = useTranslation()

  const experiences = enExperiences.map((exp, i) => ({
    ...exp,
    role: getTranslated(t, i18n, `experience.entries.${i}.role`, exp.role),
    company: getTranslated(t, i18n, `experience.entries.${i}.company`, exp.company),
    location: getTranslated(t, i18n, `experience.entries.${i}.location`, exp.location),
    period: getTranslated(t, i18n, `experience.entries.${i}.period`, exp.period),
    description: getTranslatedArray(t, i18n, `experience.entries.${i}.items`, exp.description),
    tags: getTranslatedArray(t, i18n, `experience.entries.${i}.tags`, exp.tags),
    impact: getTranslated(t, i18n, `experience.entries.${i}.impact`, exp.impact),
  }))

  const projects = enProjects.map((proj, i) => ({
    ...proj,
    title: getTranslated(t, i18n, `projects.list.${i}.title`, proj.title),
    tagline: getTranslated(t, i18n, `projects.list.${i}.tagline`, proj.tagline),
    description: getTranslated(t, i18n, `projects.list.${i}.description`, proj.description),
    fullDescription: getTranslated(t, i18n, `projects.list.${i}.fullDescription`, proj.fullDescription),
    problem: getTranslated(t, i18n, `projects.list.${i}.problem`, proj.problem),
    solution: getTranslated(t, i18n, `projects.list.${i}.solution`, proj.solution),
    impact: getTranslated(t, i18n, `projects.list.${i}.impact`, proj.impact),
    role: getTranslated(t, i18n, `projects.list.${i}.role`, proj.role),
    vision: getTranslated(t, i18n, `projects.list.${i}.vision`, proj.vision),
    metrics: getTranslatedArray(t, i18n, `projects.list.${i}.metrics`, proj.metrics),
    stack: Array.isArray(getTranslatedArray(t, i18n, `projects.list.${i}.stack`, proj.stack))
      ? getTranslatedArray(t, i18n, `projects.list.${i}.stack`, proj.stack)
      : proj.stack,
  }))

  const techProjects = enTechProjects.map((tp, i) => ({
    ...tp,
    title: getTranslated(t, i18n, `projects.techProjects.${i}.title`, tp.title),
    description: getTranslated(t, i18n, `projects.techProjects.${i}.description`, tp.description),
    stack: getTranslatedArray(t, i18n, `projects.techProjects.${i}.stack`, tp.stack),
  }))

  const skillCategories = enSkillCategories.map((cat, i) => ({
    ...cat,
    title: getTranslated(t, i18n, `expertise.skillCategories.${i}.title`, cat.title),
    skills: getTranslatedArray(t, i18n, `expertise.skillCategories.${i}.skills`, cat.skills),
  }))

  const expertise = enExpertise.map((exp, i) => ({
    ...exp,
    area: getTranslated(t, i18n, `expertise.depths.${i}.area`, exp.area),
    description: getTranslated(t, i18n, `expertise.depths.${i}.description`, exp.description),
  }))

  return { experiences, projects, techProjects, skillCategories, expertise }
}
