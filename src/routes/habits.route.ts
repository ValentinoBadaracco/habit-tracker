import { Router } from 'express';
import { getHabits, postHabit, patchHabit, deleteHabit } from '../controllers/habits.controller';

const router = Router();

router.get('/', getHabits);
router.post('/', postHabit);
router.patch('/:id', patchHabit);
router.delete('/:id', deleteHabit);

export default router;