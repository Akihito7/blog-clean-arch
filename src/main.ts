import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useGlobalConfig } from './config/global-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT ?? 3000;
  
  useGlobalConfig(app);

  await app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));

}
bootstrap();
