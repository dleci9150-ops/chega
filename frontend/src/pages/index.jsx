import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import PersonalizationPanel from '../components/UI/PersonalizationPanel'

export default function Home(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Leidy Cleaner</h1>
            <p className="muted">Agende serviços de limpeza com facilidade. Personalize aparência e preferências.</p>
            <div className="mt-6">
              <a href="/agendar" className="btn-accent inline-block px-4 py-2 rounded-md">Agendar Agora</a>
            </div>
          </div>
          <div>
            <PersonalizationPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
