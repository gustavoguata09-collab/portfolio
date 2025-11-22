import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfólio <onboarding@resend.dev>',
            to: 'gustavoguata09@gmail.com',
            subject: `Nova mensagem de ${name}`,
            html: `
              <h2>Nova mensagem do portfólio</h2>
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mensagem:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `,
          }),
        })

        if (response.ok) {
          console.log('Email enviado via Resend com sucesso')
          return NextResponse.json(
            { 
              success: true,
              message: 'Mensagem enviada com sucesso!',
              method: 'resend'
            },
            { status: 200 }
          )
        }
      } catch (resendError) {
        console.error('Erro ao enviar via Resend:', resendError)
      }
    }

    console.log('Resend não configurado, usando fallback Gmail')
    return NextResponse.json(
      { 
        success: true,
        message: 'Redirecionando para Gmail...',
        method: 'gmail',
        data: { name, email, message }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar email:', error)
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    )
  }
}
