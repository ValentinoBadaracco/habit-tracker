import { Router } from 'express';
import { getHabits, getHabitsById, postHabit, updateHabit, deleteHabit } from '../controllers/habits.controller';
import entriesRouter from './entries.routes';

const router = Router();

router.get('/', getHabits);
router.get('/:id', getHabitsById);
router.post('/', postHabit);
router.patch('/:id', updateHabit);
router.delete('/:id', deleteHabit);

router.use('/:id/entries', entriesRouter);

export default router;