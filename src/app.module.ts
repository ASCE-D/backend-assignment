
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie/services/movie.service';
import { MovieEntity } from './adapters/db/movie.entity';
import { TypeOrmMovieRepository } from './adapters/db/typeorm-movie.repository';
import { MovieController } from './adapters/http/movie.controller';
import { MOVIE_REPOSITORY } from './movie/repositories/movie.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-south-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.ugeszlrdsjfuvyzhvfoq',
      password: 'n1m5l8RtgGvt52dY',
      database: 'postgres',
      entities: [MovieEntity],
      synchronize: true,
    })
    ,
    TypeOrmModule.forFeature([MovieEntity]),
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: MOVIE_REPOSITORY,
      useClass: TypeOrmMovieRepository,
    },
  ],
})
export class AppModule {}
