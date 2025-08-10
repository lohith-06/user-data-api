require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/dbConfig');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
