import { validateCredentials } from './_store';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email e senha são obrigatórios' });

    const user = validateCredentials(email, password);
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

    const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');
    return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
