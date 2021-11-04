import DatabaseManager from "../db/DatabaseManager";
import Movie from "../entities/Movie";


async function get(id?: number | string): Promise<Movie> {
  if (!id) {
    throw Error("id not provided");
  }

  if (typeof (id) === 'string') id = Number(id)

  return DatabaseManager.getMovie().findOne(id)
}

async function create(data: Movie): Promise<Movie> {
  if (!data.name) {
    throw Error("name not provided");
  }

  const createdEntity = DatabaseManager.getMovie().create(data)
  console.log(createdEntity)
  return DatabaseManager.getMovie().save(createdEntity)
}

async function list(limit = 10, page = 1): Promise<Movie[]> {
  if (limit < 0) limit = 10
  if (page <= 0) page = 1
  return DatabaseManager.getMovie().find({ skip: (page - 1) * limit, take: limit });
}

async function update(id, data: Movie): Promise<boolean> {
  if (!id) {
    throw Error("id not provided");
  }

  if (!data.name) return false;

  try {
    DatabaseManager.getMovie().save({ id, ...data })
    return true
  } catch (error) {
    return false
  }
}

export default {
  create,
  get,
  list,
  update
}