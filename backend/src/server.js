require('dotenv').config();
const app = require('./app');
const migrate = require('./migrate');

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await migrate();
    app.listen(PORT, () => {
      console.log(`Task Manager API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
