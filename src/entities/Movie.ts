import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'movies'})
class Movie {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string
}

export default Movie