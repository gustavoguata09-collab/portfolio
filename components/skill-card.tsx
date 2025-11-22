'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

interface SkillCardProps {
  skill: {
    name: string
    icon: string
    color: string
  }
}

export default function SkillCard({ skill }: SkillCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="group p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
        <div className={`icon-${skill.icon} w-16 h-16`} />
        <span className="text-center font-medium text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </span>
      </Card>
    </motion.div>
  )
}
