export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // In dev mock, just accept logout and return OK
  return res.status(200).json({ message: 'Desconectado' });
}
