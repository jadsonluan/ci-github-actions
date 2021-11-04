import DatabaseManager from "../db/DatabaseManager";
import Movie from "../entities/Movie";

class MovieService extends DatabaseManager {
  async get(id?: number | string): Promise<Movie> {
    if (!id) {
      throw Error("id not provided");
    }
  
    if (typeof (id) === 'string') id = Number(id)
  
    return this.getMovie().findOne(id)
  }
  
  async create(data: Movie): Promise<Movie> {
    if (!data.name) {
      throw Error("name not provided");
    }
  
    const createdEntity = this.getMovie().create(data)
    return this.getMovie().save(createdEntity)
  }
  
  async list(limit = 10, page = 1): Promise<Movie[]> {
    if (limit < 0) limit = 10
    if (page <= 0) page = 1
    return this.getMovie().find({ skip: (page - 1) * limit, take: limit });
  }
  
  async update(id, data: Movie): Promise<boolean> {
    if (!id) {
      throw Error("id not provided");
    }
  
    if (!data.name) throw Error("name not provided");
  
    try {
      await this.getMovie().save({ id, ...data })
      return true
    } catch (error) {
      return false
    }
  }
}

export default new MovieService()