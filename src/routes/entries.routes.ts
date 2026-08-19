import { Router } from 'express';
import { getAllEntries, getEntriesByHabitId, createEntry, deleteEntry } from '../controllers/entries.controller';

const router = Router({ mergeParams: true }); // mergeParams: true allows the router to access parameters from the parent route for obtain the habitId in the entries routes.

router.get('/entries', getAllEntries);
router.get('/:id/entries', getEntriesByHabitId);
router.post('/:id/entries', createEntry);
router.delete('/:id/entries', deleteEntry);

export default router;