require('dotenv').config();
console.log('Environment Variables:', process.env);

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const reviewRoutes = require('./routes/reviews');
const commentRoutes = require('./routes/comments');

console.log(authRoutes);
console.log(itemRoutes);
console.log(reviewRoutes);
console.log(commentRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
});
