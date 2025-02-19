import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
      },
    },
  );
  console.log('mail-microservice is running on port ', process.env.PORT);
  await app.listen();
}
bootstrap();
