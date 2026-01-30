/**
 * User Model
 * Schema de usuários
 */

const bcrypt = require('bcrypt');

class User {
  constructor(data) {
    this.id = data.id || Math.random().toString(36).substr(2, 9);
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    // ✅ CORRIGIDO: Hash de senha com bcrypt
    this.password = data.password; // Será hashado antes de salvar
    this.address = data.address;
    this.profileImage = data.profileImage;
    this.role = data.role || 'customer'; // 'customer', 'admin', 'team'
    this.isActive = data.isActive !== false;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // ✅ CORRIGIDO: Método para hash de senha
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    return this.password;
  }

  // ✅ CORRIGIDO: Método para verificar senha
  async verifyPassword(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  }

  toJSON() {
    const { password, ...user } = this;
    return user;
  }
}

module.exports = User;
