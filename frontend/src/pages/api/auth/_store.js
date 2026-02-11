// Shared in-memory store for dev auth endpoints
let users = [];

function generateId() {
  return String(users.length + 1);
}

export function findByEmail(email) {
  if (!email) return null;
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function addUser({ name, email, phone, password, role = 'cliente' }) {
  const id = generateId();
  const user = { id, name, email: email.toLowerCase(), phone, password, role };
  users.push(user);
  return user;
}

export function validateCredentials(email, password) {
  const user = findByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}

export function findByToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [email] = decoded.split(':');
    return findByEmail(email);
  } catch (e) {
    return null;
  }
}
