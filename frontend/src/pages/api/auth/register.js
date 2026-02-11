// Dev-only mock registration endpoint
// Uses shared in-memory store at _store.js to persist users during dev

import { findByEmail, addUser } from './_store';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, password, role } = req.body || {};

    const errors = {};
    if (!name || !name.trim()) errors.name = 'Nome é obrigatório';
    if (!email) errors.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Email inválido';
    if (!phone) errors.phone = 'Telefone é obrigatório';
    if (!password) errors.password = 'Senha é obrigatória';
    else if (password.length < 8) errors.password = 'Senha deve ter no mínimo 8 caracteres';

    if (Object.keys(errors).length) {
      return res.status(400).json({ message: 'Dados inválidos', errors });
    }

    const exists = findByEmail(email);
    if (exists) return res.status(400).json({ message: 'Email já cadastrado' });

    const allowedRoles = ['cliente', 'funcionario', 'adm'];
    const finalRole = allowedRoles.includes(role) ? role : 'cliente';

    const user = addUser({ name: name.trim(), email: email.toLowerCase(), phone, password, role: finalRole });

    // simple fake token for dev usage
    const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');

    return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
