/**
 * Booking Controller
 * Gerencia todas as operações relacionadas a agendamentos
 */

const BookingService = require('../services/BookingService');
const db = require('../db');

class BookingController {
  /**
   * Criar novo agendamento
   */
  async createBooking(req, res) {
    try {
      const { userId, serviceId, date, time, address, phone, price, notes } = req.body;

      if (!userId || !serviceId || !date || !time || !address || !phone) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando: userId, serviceId, date, time, address, phone' });
      }

      // Persistir no banco (DB abstraction: Postgres via DATABASE_URL or SQLite local)
      const result = await db.run(
        `INSERT INTO bookings (user_id, service_id, date, time, address, phone, price, notes, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
        userId,
        serviceId,
        date,
        time,
        address,
        phone,
        price || 0,
        notes || '',
        'pending'
      );

      // Buscar agendamento criado
      const bookingId = result.lastID || result.rows?.[0]?.id;
      const booking = await db.get('SELECT * FROM bookings WHERE id = ?', bookingId);

      res.status(201).json({ success: true, booking, message: 'Agendamento criado com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obter agendamentos do usuário
   */
  async getUserBookings(req, res) {
    try {
      const { userId } = req.params;
      const bookings = await BookingService.findByUserId(userId);

      res.json({ success: true, bookings });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Atualizar agendamento
   */
  async updateBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { date, services, notes } = req.body;

      // Validar se a nova data está disponível
      if (date) {
        const isAvailable = await this.checkAvailability(date);
        if (!isAvailable) {
          return res.status(400).json({ error: 'Data não disponível' });
        }
      }

      // Atualizar agendamento
      // const updatedBooking = await BookingService.update(bookingId, {...});

      // Enviar notificação de alteração
      // await sendReschedulingNotification(updatedBooking);

      res.json({ success: true, message: 'Agendamento atualizado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Cancelar agendamento
   */
  async cancelBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { reason } = req.body;

      // Cancelar agendamento
      // await BookingService.updateStatus(bookingId, 'cancelled');

      // Notificar equipa e cliente
      // await sendCancellationNotification(bookingId, reason);

      res.json({ success: true, message: 'Agendamento cancelado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Verificar disponibilidade de data
   */
  async checkAvailability(date) {
    // Implementar lógica de verificação
    return true;
  }
}

module.exports = new BookingController();
