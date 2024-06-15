import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './Routes';
import { GlobalErrorHandler } from './Errors/globalErrorHandler';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);



app.use(GlobalErrorHandler);

app.use((req, res) => {
  if (req.url === '/') {
    res.status(200).json({
      message: 'Hey welcome to car-rental reservation server',
    });
  }
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});

export default app;
