import { postJson } from './api.js';
document.getElementById('vaccineForm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = { user_id: ..., vaccine_name: ..., next_due_date: ... };
  const result = await postJson('/api/vaccinations', data);
  alert(result.message);
});


