const db = require('../config/db');

async function scheduleAlertForNextDate(user_id, phone, message, dateStr) {
  const scheduled_for = new Date(dateStr); // ideally set time (e.g., 09:00)
  // set send time at 09:00 on that day
  scheduled_for.setHours(9,0,0,0);
  await db.execute(
    'INSERT INTO alerts (user_id, phone, message, scheduled_for, status) VALUES (?, ?, ?, ?, ?)',
    [user_id, phone, message, scheduled_for, 'pending']
  );
}

module.exports = { scheduleAlertForNextDate };

