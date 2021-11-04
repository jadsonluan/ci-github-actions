import { Request, Response, NextFunction } from 'express';
import MovieService from "../services/MovieService";

async function findById(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params

  if (!id) {
    throw Error("id not provided");
  }

  const movie = await MovieService.get(id)
  res.status(200).send(movie)
}

async function create(req: Request, res: Response, _next: NextFunction) {
  const movie = req.body

  try {
    const created = await MovieService.create(movie);
    res.status(201).send({ movie: created })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

async function list(req: Request, res: Response, _next: NextFunction) {
  const { page, limit } = req.query
  try {
    const movies = await MovieService.list(Number(limit), Number(page));
    res.status(200).send(movies)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

async function update(req: Request, res: Response, _next: NextFunction) {
  const { movie } = req.body
  const { id } = req.params

  console.log(id)

  try {
    const updated = await MovieService.update(id, movie);
    res.status(201).send({ movie: updated })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

export default {
  create,
  findById,
  list,
  update
}