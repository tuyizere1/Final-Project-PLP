const cron = require('node-cron');
const db = require('../config/db');
const { sendSms } = require('../utils/smsService');

function startReminderJob() {
  // every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const [rows] = await db.execute("SELECT * FROM alerts WHERE status = 'pending' AND scheduled_for <= NOW() LIMIT 50");
      for (const alert of rows) {
        try {
          await sendSms(alert.phone, alert.message);
          await db.execute('UPDATE alerts SET status = ?, sent_at = NOW() WHERE id = ?', ['sent', alert.id]);
        } catch (err) {
          await db.execute('UPDATE alerts SET status = ? WHERE id = ?', ['failed', alert.id]);
        }
      }
    } catch (err) {
      console.error('ReminderJob error', err);
    }
  });
}

module.exports = { startReminderJob };

