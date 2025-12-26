import express from 'express';
import postRoutes from './src/routes/postRoutes.js';
import dotenv from 'dotenv/config';

const app = express();
app.use(express.json());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serviço rodando na porta ${PORT}`);
});