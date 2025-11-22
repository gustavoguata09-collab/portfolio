'use client'

import { motion } from 'framer-motion'
import SkillCard from '@/components/skill-card'

export default function Skills() {
  // EDITAR: ADICIONE OU REMOVA ESPECIALIDADES AQUI
  const skills = [
    { name: 'HTML', icon: 'html', color: 'from-orange-500 to-red-600' },
    { name: 'CSS', icon: 'css', color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', icon: 'nodejs', color: 'from-green-500 to-emerald-500' },
    { name: 'MySQL', icon: 'mysql', color: 'from-blue-600 to-blue-800' },
    { name: 'Git', icon: 'git', color: 'from-orange-600 to-red-600' },
    { name: 'React', icon: 'react', color: 'from-cyan-400 to-blue-500' },
    { name: 'Tailwind', icon: 'tailwind', color: 'from-cyan-400 to-blue-500' },
    { name: 'GitHub', icon: 'github', color: 'from-slate-600 to-slate-800' },
    { name: 'TypeScript', icon: 'typescript', color: 'from-blue-600 to-blue-800' },
    { name: 'Sass', icon: 'sass', color: 'from-pink-500 to-rose-500' },
    { name: 'Figma', icon: 'figma', color: 'from-purple-500 to-pink-500' },
    { name: 'Next.js', icon: 'nextjs', color: 'from-slate-900 to-slate-700' },
    { name: 'API REST', icon: 'api', color: 'from-cyan-400 to-blue-500' },
    { name: 'UI Design', icon: 'ui', color: 'from-blue-500 to-indigo-500' },
    { name: 'UX Design', icon: 'ux', color: 'from-purple-600 to-pink-600' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section id="skills" className="py-20 px-4 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance"
        >
          Especialidades
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
