import express from 'express'
import MovieController from '../controllers/MovieController'

const router = express()

router.get('/', MovieController.list)
router.get('/:id', MovieController.findById)
router.post('/', MovieController.create)
router.put('/:id', MovieController.update)

export default router