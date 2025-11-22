'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const openGmailFallback = (name: string, email: string, message: string) => {
    const subject = encodeURIComponent(`Contato de ${name} - Portfólio`)
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)
    const gmailUrl = `mailto:gustavoguata09@gmail.com?subject=${subject}&body=${body}`
    window.location.href = gmailUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.method === 'gmail') {
          // Se usar Gmail, abrir o app de email
          setToastMessage('Abrindo seu app de email...')
          setToastType('success')
          setShowToast(true)
          setTimeout(() => {
            openGmailFallback(formData.name, formData.email, formData.message)
            setShowToast(false)
          }, 1000)
        } else {
          // Se usar Resend, mostrar mensagem de sucesso
          setToastMessage('Mensagem enviada com sucesso!')
          setToastType('success')
          setShowToast(true)
          setTimeout(() => setShowToast(false), 3000)
        }
        setFormData({ name: '', email: '', message: '' })
      } else {
        setToastMessage('Erro ao enviar. Tente novamente.')
        setToastType('error')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      }
    } catch (error) {
      console.error('Erro:', error)
      setToastMessage('Erro ao enviar. Tente novamente.')
      setToastType('error')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    {
      name: 'Email',
      value: 'gustavoguata09@gmail.com',
      icon: Mail,
      href: 'mailto:gustavoguata09@gmail.com',
      color: 'hover:text-purple-500',
    },
    {
      name: 'WhatsApp',
      value: '+55 91 98613-6199',
      icon: Phone,
      href: 'https://wa.me/5591986136199',
      color: 'hover:text-green-500',
    },
    {
      name: 'GitHub',
      value: 'Guhzin7x',
      icon: Github,
      href: 'https://github.com/Guhzin7x',
      color: 'hover:text-slate-400',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
          >
            Vamos Trabalhar Juntos?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance"
          >
            Estou aberto para novos projetos, parcerias e oportunidades. Não hesite em entrar em contato!
          </motion.p>

          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-4 text-left"
          >
            <div>
              <Label htmlFor="name" className="text-white">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-zinc-900 border-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-zinc-900 border-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-white">Mensagem</Label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full min-h-[120px] px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-600/60 transition-all"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </motion.form>

          {/* Social Links with enhanced interactions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-6 pt-8 flex-wrap"
          >
            {contactLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 10, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-xl border-2 border-purple-500/40 text-foreground/80 transition-all hover:border-purple-500/80 hover:bg-purple-500/10 ${link.color}`}
                  title={link.name}
                >
                  <Icon size={28} />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={`px-6 py-3 rounded-lg shadow-lg ${
              toastType === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}>
              <p className="text-sm font-medium">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
