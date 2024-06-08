
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
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
      entities: [MovieEntity],
      synchronize: true,
    }),
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
