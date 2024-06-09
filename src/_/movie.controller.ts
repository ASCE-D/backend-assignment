import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get('/genre/:genre')
  async findByGenre(@Param('genre') genre: string): Promise<Movie[]> {
    return this.movieService.findByGenre(genre);
  }

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.createMovie(createMovieDto);
  }

  @Post('/rate/:id')
  async rateMovie(
    @Param('id') id: number,
    @Body() ratingDto: { rating: number },
  ): Promise<Movie> {
    return this.movieService.rateMovie(id, ratingDto.rating);
  }

  @Get('/sorted/rating')
  async findSortedByRating(): Promise<Movie[]> {
    return this.movieService.findSortedByRating();
  }
}
