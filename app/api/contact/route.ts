import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Email options
  const mailOptions = {
    from: email,
    to: 'Franciscoherrera001@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: message,
    html: `<div>
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>`
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
