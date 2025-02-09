import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  // ...other configurations...
}));
