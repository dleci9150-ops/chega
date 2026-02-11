import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Leidy Cleaner - Limpeza Profissional em Porto Alegre</title>
        <meta name="description" content="Serviços de limpeza profissional" />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: '120px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>

            {/* HERO com Gradiente */}
            <section style={{ 
              textAlign: 'center', 
              marginBottom: '80px',
              padding: '60px 20px',
              background: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
              borderRadius: '12px',
              color: '#fff'
            }}>
              <h1 style={{ fontSize: '52px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>
                🧹 Limpeza Profissional em Porto Alegre
              </h1>
              <p style={{ fontSize: '20px', color: '#e6f3e6', marginBottom: '40px', fontWeight: '400' }}>
                Serviços de limpeza com profissionais verificados, garantia 100% e preços justos
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/HourCheckout" style={{
                  padding: '16px 40px',
                  backgroundColor: '#05a84f',
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-block',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}>
                  💰 Comprar Horas
                </Link>
                <Link href="/agendar" style={{
                  padding: '16px 40px',
                  backgroundColor: '#fff',
                  color: '#16a34a',
                  fontSize: '17px',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-block',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}>
                  📅 Agendar Agora
                </Link>
              </div>
              
              {/* Stats rapidos */}
              <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '50px', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '32px', fontWeight: '700', margin: '0' }}>2500+</p>
                  <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Limpezas Realizadas</p>
                </div>
                <div>
                  <p style={{ fontSize: '32px', fontWeight: '700', margin: '0' }}>98%</p>
                  <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Taxa de Satisfação</p>
                </div>
                <div>
                  <p style={{ fontSize: '32px', fontWeight: '700', margin: '0' }}>500+</p>
                  <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Clientes Felizes</p>
                </div>
              </div>
            </section>

            {/* COMO FUNCIONA */}
            <section style={{ marginBottom: '80px' }}>
              <h2 style={{ fontSize: '40px', fontWeight: '700', textAlign: 'center', marginBottom: '50px', color: '#000' }}>
                Como Funciona
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
                {[
                  { i: '1️⃣', step: 'Escolher', desc: 'Veja nossos serviços e profissionais' },
                  { i: '2️⃣', step: 'Agendar', desc: 'Reserve o melhor horário para você' },
                  { i: '3️⃣', step: 'Pagar', desc: 'Pagamento seguro e rápido' },
                  { i: '4️⃣', step: 'Pronto!', desc: 'Sua casa fica impecável' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: '40px 25px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '2px solid #dcfce7',
                    transition: 'transform 0.3s',
                    cursor: 'pointer'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '15px' }}>{item.i}</div>
                    <p style={{ fontWeight: '700', color: '#000', fontSize: '18px', margin: '0 0 8px 0' }}>{item.step}</p>
                    <p style={{ fontWeight: '400', color: '#666', fontSize: '14px', margin: '0' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SERVIÇOS (simplificado: 3 tipos) */}
            <section style={{ marginBottom: '80px' }}>
              <h2 style={{ fontSize: '40px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#000' }}>
                Nossos Serviços (por hora)
              </h2>
              <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Oferecemos 3 tipos principais de limpeza. O serviço é cobrado por hora—entre em contato para orçamento.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {[
                  { icon: '🧼', name: 'Normal', desc: 'Limpeza residencial regular, manutenção semanal/mensal.' },
                  { icon: '🔨', name: 'Pós-obra', desc: 'Remoção de resíduos, limpeza pesada e finalização após obras.' },
                  { icon: '📦', name: 'Organização', desc: 'Arrumação, organização de ambientes e otimização de espaços.' }
                ].map((svc, i) => (
                  <div key={i} style={{
                    padding: '28px 22px',
                    border: '1px solid #e6e6e6',
                    borderRadius: '12px',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}>
                    <div style={{ fontSize: '44px', marginBottom: '12px' }}>{svc.icon}</div>
                    <p style={{ fontWeight: '800', color: '#000', fontSize: '18px', margin: '0 0 8px 0' }}>{svc.name}</p>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0 0 14px 0' }}>{svc.desc}</p>
                    <p style={{ fontSize: '14px', color: '#16a34a', fontWeight: '700', margin: '0' }}>Serviço por hora — preço sob demanda</p>
                  </div>
                ))}
              </div>
            </section>

            {/* DIFERENCIAIS */}
            <section style={{ marginBottom: '80px', backgroundColor: '#f0fdf4', padding: '60px 40px', borderRadius: '12px', border: '2px solid #dcfce7' }}>
              <h2 style={{ fontSize: '40px', fontWeight: '700', textAlign: 'center', marginBottom: '50px', color: '#000' }}>
                ⭐ Por Que Nos Escolher
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                {[
                  { emoji: '✅', title: 'Profissionais Verificados', desc: 'Equipe qualificada e confiável' },
                  { emoji: '🌱', title: 'Eco-Friendly', desc: 'Produtos sustentáveis' },
                  { emoji: '🛡️', title: 'Garantia 100%', desc: 'Satisfação garantida' },
                  { emoji: '💰', title: 'Preços Justos', desc: 'Melhor custo/benefício' },
                  { emoji: '⏰', title: 'Flexível', desc: 'Horários convenientes' },
                  { emoji: '📞', title: 'Suporte 24/7', desc: 'Sempre disponível' }
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '36px', margin: '0 0 10px 0' }}>{item.emoji}</p>
                    <p style={{ fontWeight: '700', color: '#000', fontSize: '17px', margin: '0 0 5px 0' }}>{item.title}</p>
                    <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA FINAL */}
            <section style={{ 
              textAlign: 'center', 
              marginBottom: '40px',
              padding: '50px 30px',
              background: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
              borderRadius: '12px',
              color: '#fff'
            }}>
              <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px', color: '#fff' }}>
                Pronto para uma casa limpa?
              </h2>
              <p style={{ fontSize: '18px', marginBottom: '30px', color: '#e6f3e6' }}>
                Agende agora e ganhe 10% de desconto na primeira limpeza!
              </p>
              <Link href="/agendar" style={{
                padding: '18px 50px',
                backgroundColor: '#fff',
                color: '#16a34a',
                fontSize: '18px',
                fontWeight: '700',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-block',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s'
              }}>
                📅 Agendar Agora →
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
