
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MovieService } from '../../movie/services/movie.service';
import { Movie } from '../../movie/entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get('/sort')
  async getMoviesSortedByRating(): Promise<Movie[]> {
    return this.movieService.sortByRating();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Movie> {
    return this.movieService.findById(id);
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @Post('/multi')
  async createM(@Body() payload: { movies: Movie[] }): Promise<boolean> {
    try {
      const { movies } = payload;
      console.log(movies); // Optional: Log movies to verify the payload

      // Iterate over each movie and create it using the movieService
      for (const movie of movies) {
        await this.movieService.create(movie);
      }

      return true;
    } catch (error) {
      console.error('Error creating movies:', error);
      return false;
    }
  }

  @Get('genre/:genre')
  async getMoviesByGenre(@Param('genre') genre: string): Promise<Movie[]> {
    return this.movieService.findByGenre(genre);
  }

  @Patch(':id/rate')
  async rateMovie(
    @Param('id') id: number,
    @Body('rating') rating: number,
  ): Promise<Movie> {
    return this.movieService.rateMovie(id, rating);
  }
}
