import { Router } from 'express';
import { getHabits, getHabitsById, postHabit, updateHabit, deleteHabit } from '../controllers/habits.controller';

const router = Router();

router.get('/', getHabits);
router.get('/:id', getHabitsById);

router.post('/', postHabit);
router.patch('/:id', updateHabit);
router.delete('/:id', deleteHabit);

export default router;