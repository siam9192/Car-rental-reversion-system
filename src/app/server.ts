import mongoose from 'mongoose';
import config from './config';
import app from './app';

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log('server is running on port ' ,config.port);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
