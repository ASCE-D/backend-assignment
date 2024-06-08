
export class Movie {
  constructor(
    public id: number,
    public title: string,
    public releaseDate: Date,
    public description: string,
    public genre: string,
    public rating: number,
  ) {}
}
