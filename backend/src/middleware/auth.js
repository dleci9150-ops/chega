/**
 * Authentication Middleware
 * Verifica token JWT
 */

const jwt = require('jsonwebtoken');

// ✅ CORRIGIDO: Gerar token com expiração
const generateToken = (userId, role = 'customer') => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'seu-secret-key-aqui',
    { expiresIn: '24h' } // ✅ CORRIGIDO: Token expira em 24h
  );
};

// ✅ CORRIGIDO: Gerar refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'seu-refresh-secret-key',
    { expiresIn: '7d' } // ✅ CORRIGIDO: Refresh expira em 7d
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // ✅ CORRIGIDO: Verificar token com JWT real
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'seu-secret-key-aqui'
    );
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
    }
    res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

/**
 * Verificar role do usuário
 */
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permissão negada' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
  generateToken,     // ✅ NOVO
  generateRefreshToken, // ✅ NOVO
};
