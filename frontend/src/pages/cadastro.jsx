import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { MainLayout } from '@/components/Layout'

export default function Cadastro() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'cliente' })
  const [errors, setErrors] = useState({})

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name) newErrors.name = 'Nome obrigatório'
    if (!form.email) newErrors.email = 'Email obrigatório'
    if (!form.password || form.password.length < 8) newErrors.password = 'Senha mínima 8 caracteres'
    setErrors(newErrors)
    if (Object.keys(newErrors).length) return

    setLoading(true)
    try {
      const { data } = await axios.post('/api/auth/register', { ...form })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Conta criada')
      window.location.href = '/dashboard'
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro')
    } finally { setLoading(false) }
  }

  return (
    <>
      <Head>
        <title>Cadastro - Leidy Cleaner</title>
      </Head>
      <MainLayout>
        <main className="min-h-screen flex items-center justify-center py-16">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm">Nome</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm">Telefone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm">Tipo de Conta</label>
                <select name="role" value={form.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                  <option value="cliente">Cliente</option>
                  <option value="funcionario">Funcionário</option>
                  <option value="adm">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm">Senha</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-2">{loading ? 'Cadastrando...' : 'Criar conta'}</button>
            </form>

            <p className="mt-4 text-sm">Já tem conta? <Link href="/login" className="text-secondary-600">Entrar</Link></p>
          </div>
        </main>
      </MainLayout>
    </>
  )
}
