import db from "../../../db"
import MovieService from "../../../services/MovieService"

beforeEach(async () => {
  await db.init()
})

afterEach(async () => {
  await db.close()
})

describe('MovieService', () => {
  it('should show a empty list when there is no movies', async () => {
    const movies = await MovieService.list()
    expect(movies).toBeDefined()
    expect(movies).toHaveLength(0)
  })

  it('should create movies', async () => {
    const movie1 = await MovieService.create({ name: 'Shrek'})
    const movie2 = await MovieService.create({ name: 'Shrek 2'})

    expect(movie1.name).toBe('Shrek')
    expect(movie2.name).toBe('Shrek 2')
  })

  it('should not create movies without name', async () => {
    const fx = async () => await MovieService.create({ name: undefined })
    expect(fx).rejects.toThrow()
  })

  it('should list movies', async () => {
    const movies = await MovieService.list()
    expect(movies).toBeDefined()
    expect(movies).toHaveLength(2)
    expect(movies).toMatchSnapshot()
  })

  it('should list movies using pagination', async () => {
    let limit = 1
    let page = 1
    let movies = await MovieService.list(limit, page)
    expect(movies).toBeDefined()
    expect(movies).toHaveLength(1)

    page = 2
    movies = await MovieService.list(limit, page)
    expect(movies).toBeDefined()
    expect(movies).toHaveLength(1)

    page = 1
    limit = 2
    movies = await MovieService.list(limit, page)
    expect(movies).toBeDefined()
    expect(movies).toHaveLength(2)
  })

  it('should get a movie by its id', async () => {
    const movie = await MovieService.get(1)
    expect(movie.id).toBe(1)
    expect(movie.name).toBe('Shrek')
  })

  it('should not get a movie if its id is undefined', async () => {
    const fx = async () => await MovieService.get(undefined)
    expect(fx).rejects.toThrow()
  })

  it('should update a movie', async () => {
    const response = await MovieService.update(1, { name: 'Shrek 1'})
    const movie = await MovieService.get(1)
    expect(response).toBe(true)
    expect(movie.name).toBe('Shrek 1')
  })

  it('should not update movie without name', async () => {
    const fx = async () => await MovieService.update(1, { name: undefined })
    expect(fx).rejects.toThrow()
  })

  it('should not update movie without a valid id', async () => {
    const fx = async () => await MovieService.update(undefined, { name: 'Shrek 3' })
    expect(fx).rejects.toThrow()
  })
})