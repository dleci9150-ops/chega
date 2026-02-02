import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>VAMOS - Limpeza Profissional em Porto Alegre</title>
        <meta name="description" content="Agende limpeza profissional online. Precos transparentes, profissionais verificados e suporte 24/7." />
      </Head>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold">
                      Servico Premium
                    </span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    Casa limpa.<br />Vida leve.
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Agende uma limpeza profissional rapida e personalizada. Profissionais verificados, precos transparentes e lembretes automaticos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/agendar">
                      <a className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-center">
                        Agendar Agora
                      </a>
                    </Link>
                    <Link href="/servicos">
                      <a className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 font-semibold py-3 px-8 rounded-lg transition-colors text-center">
                        Ver Servicos
                      </a>
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 pt-4">
                    Atendimento em Porto Alegre * Suporte 24/7
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 7h6v9a1 1 0 01-1 1H10a1 1 0 01-1-1V7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 11h2v2h-2z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Por que escolher VAMOS?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Somos a plataforma mais confiavel para conectar voce com profissionais de limpeza de qualidade.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Profissionais Verificados
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Todos os profissionais sao verificados e treinados para garantir qualidade do servico.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Precos Transparentes
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhuma cobranca oculta. Voce sabe exatamente quanto vai pagar antecipadamente.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Agende em Minutos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Reserva rapida e facil. Receba confirmacao instantanea e lembretes automaticos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-gray-50 dark:bg-slate-800 py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Como Funciona
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Escolha o Servico', desc: 'Selecione o tipo de limpeza desejada' },
                  { step: '2', title: 'Agende a Data', desc: 'Escolha o melhor dia e horario' },
                  { step: '3', title: 'Pague Online', desc: 'Pagamento seguro e rapido' },
                  { step: '4', title: 'Aproveite', desc: 'Desfrute de um lar limpo e organizado' }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-600 dark:bg-blue-900 py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Pronto para uma casa limpa?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Agende sua primeira limpeza hoje e receba um desconto especial.
              </p>
              <Link href="/agendar">
                <a className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition-colors text-lg">
                  Agendar Agora
                </a>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
