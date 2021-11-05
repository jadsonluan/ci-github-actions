import { get, post, put } from "../../__utils__/rest"

describe('Movie Routes', () => {
  describe('POST /movies', () => {
    it('should create a movie given a name', async () => {
      const response = await post('/movies', { name: "Shrek" }, {})
      expect(response.statusCode).toBe(201)
      expect(response.body).toBeDefined()
      expect(response.body.movie.name).toBe('Shrek')
    })
  })

  describe('GET /movies', () => {
    it('should return a list of movies', async () => {
      const response = await get('/movies', {})
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('GET /movies/1', () => {
    it('should return a movie which its id is 1', async () => {
      const response = await get('/movies/1', {})
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body.id).toBe(1)
    })
  })

  describe('PUT /movies/1', () => {
    it('should update the movie which has id 1 given the request body', async () => {
      const response = await put('/movies/1', { name: 'Shrek 1' }, {})
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body.success).toBe(true)
    })
  })
})