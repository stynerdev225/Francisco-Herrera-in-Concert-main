"use client"

import { useLanguage } from '@/context/LanguageContext'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Rotating Background at the Top */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
        <h1 className="text-[8rem] md:text-[15rem] font-bold text-white/10 whitespace-nowrap animate-bg-marquee">
          CONTACT • FRANCISCO • CONTACT • FRANCISCO •
        </h1>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 relative inline-block">
            Get In Touch
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Artist Image */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-0 shadow-xl overflow-hidden">
              <img
                src="https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/1.Tio.png"
                alt="Artist portrait"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
              <form
                className="space-y-6"
                action="/api/contact"
                method="POST"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: formData.get('name'),
                      email: formData.get('email'),
                      message: formData.get('message')
                    }),
                  });
                  const result = await response.json();
                  if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                  } else {
                    alert('Failed to send message');
                  }
                }}
              >
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Your Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Your Message</label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white h-40 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-red-500/20"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-6 text-white">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Location</h4>
                    <p className="text-white/80">San Francisco, CA</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-white/80">Franciscoherrera001@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-white/80">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Background Below the Cards */}
      <div className="absolute inset-x-0 bottom-0 flex items-center overflow-hidden pointer-events-none">
        <h1 className="text-[8rem] md:text-[15rem] font-bold text-white/10 whitespace-nowrap animate-bg-marquee">
          JOIN US IN CONCERT • JOIN US IN CONCERT •
        </h1>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes bg-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-bg-marquee {
          animation: bg-marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}