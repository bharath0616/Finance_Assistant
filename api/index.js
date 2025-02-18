import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js';
import calcRouter from './routes/calc.route.js';
import userCredRouter from './routes/userCred.route.js';
import portfolioRouter from './routes/portfolio.route.js';
import holdingsRouter from './routes/holdings.route.js';
import chatRoutes from './routes/chat.route.js';
import contactRoutes from './routes/contact.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err) => {
    console.log(err);
})
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
}
);

app.use('/api/auth', authRouter);
app.use('/api/calc', calcRouter);
app.use('/api/userCred', userCredRouter); 
app.use('/api/stocks', portfolioRouter);
app.use('/api/chat', chatRoutes);   
app.use('/api/holdings', holdingsRouter);   
app.use('/api', contactRoutes);    

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Servor error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


