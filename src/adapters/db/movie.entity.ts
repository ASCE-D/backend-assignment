
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column({ type: 'float' })
  rating: number;
}
