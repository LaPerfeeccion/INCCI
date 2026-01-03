import React, { useRef, useState, useEffect } from 'react'
import emailjs from 'emailjs-com'

export default function ContactForm() {
  const formRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // variables Vite
  const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_INTERNAL = import.meta.env.VITE_EMAILJS_TEMPLATE_INTERNAL
  const TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY
  const TO_EMAIL = import.meta.env.VITE_TO_EMAIL

  useEffect(() => {
    if (!USER_ID || !SERVICE_ID) {
      console.warn('❌ EmailJS env variables missing')
      return
    }
    emailjs.init(USER_ID)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const form = formRef.current
    const fd = new FormData(form)
    const params = {}

    for (const [key, value] of fd.entries()) {
      params[key] = value
    }

    // 🔑 variables que usan los templates
    params.to_email = TO_EMAIL
    params.name = params.from_name
    params.email = params.reply_to
    params.title = params.subject

    try {
      // 📩 correo interno
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_INTERNAL,
        params,
        USER_ID
      )

      // 📬 auto-reply usuario
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_AUTOREPLY,
        params,
        USER_ID
      )

      form.reset()
      setSent(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      alert('Error al enviar el mensaje')
    } finally {
      setSending(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
      <input type="hidden" name="to_email" value={TO_EMAIL} />

      <input
        name="from_name"
        placeholder="Tu nombre"
        required
      />

      <input
        type="email"
        name="reply_to"
        placeholder="Tu email"
        required
      />

      <input
        name="subject"
        placeholder="Asunto"
        required
      />

      <textarea
        name="message"
        placeholder="Escribe tu mensaje"
        rows="6"
        required
      />

      <button type="submit" disabled={sending}>
        {sending ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      {sent && (
        <p style={{ marginTop: '10px' }}>
          ✅ Mensaje enviado correctamente
        </p>
      )}
    </form>
  )
}
