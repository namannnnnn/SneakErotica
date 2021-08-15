import express from 'express';
import path from 'path';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import userRoutes from '../backend/routes/userRoutes.js';
import orderRoutes from '../backend/routes/orderRoutes.js';
import uploadRoutes from '../backend/routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.get('/', (req, res) => {
  res.send('API is running of shophere...');
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `SERVER IS IN ${process.env.NODE_ENV} MODE UP ON ${PORT} !!!!!`.green.bold
  )
);
