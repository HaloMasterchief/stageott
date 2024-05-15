// routes/myListRoutes.ts
import express from 'express';
import myListController from '../controllers/myListController';

const router = express.Router();

router.post('/:userId/add', myListController.addToMyList);
router.delete('/:userId/remove/:contentId', myListController.removeFromMyList);
router.get('/:userId/list', myListController.listMyItems);

export { router as myListRoutes };
