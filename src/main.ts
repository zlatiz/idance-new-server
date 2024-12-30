import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://idance-alpha.vercel.app', 'https://idance.bg', 'https://www.idance.bg', 'idance.bg', 'http://localhost:3001', 'localhost:3001', 'localhost'],
    credentials: true
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
