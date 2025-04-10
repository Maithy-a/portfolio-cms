import express from 'express';
import { getProjects } from '../controllers/projectController.js';

const router = express.Router();

// GET homepage
router.get('/', getProjects);

export default router;
