const db = require('../config/db');
const { scheduleAlertForNextDate } = require('./alertsController');

async function createVaccination(req, res, next) {
  try {
    const { user_id, vaccine_name, dose_number, vaccination_date, next_due_date, administered_by, notes } = req.body;
    const [result] = await db.execute(
      `INSERT INTO vaccinations (user_id, vaccine_name, dose_number, vaccination_date, next_due_date, administered_by, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, vaccine_name, dose_number, vaccination_date || null, next_due_date || null, administered_by, notes]
    );
    // schedule reminder if next_due_date provided
    if (next_due_date) {
      const [userRow] = await db.execute('SELECT phone FROM users WHERE id = ?', [user_id]);
      if (userRow[0] && userRow[0].phone) {
        await scheduleAlertForNextDate(user_id, userRow[0].phone, `Reminder: next ${vaccine_name} due on ${next_due_date}`, next_due_date);
      }
    }
    res.json({ message: 'Vaccination recorded', id: result.insertId });
  } catch (err) {
    next(err);
  }
}

module.exports = { createVaccination };

