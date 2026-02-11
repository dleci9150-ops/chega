import { findByToken } from './_store';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const auth = req.headers.authorization || '';
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Não autorizado' });

    const token = parts[1];
    const user = findByToken(token);
    if (!user) return res.status(401).json({ message: 'Token inválido' });

    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
