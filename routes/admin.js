import express from 'express';
import projectController from '../controllers/projectController.js';

const router = express.Router();

router.get('/', async (_, res) => {
router.get('/', async (req, res) => {
  const { data: projects, error } = await require('../supabase/client')
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).send('Error loading admin panel');

  res.render('admin/dashboard', { projects });
});

router.get('/create', (_, res) => {
  res.render('admin/create');
});
});
router.post('/create', projectController.createProject);

// UPDATE
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await require('../supabase/client')
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).send('Project not found');
  res.render('admin/edit', { project: data });
});
router.post('/edit/:id', projectController.updateProject);

// DELETE
router.post('/delete/:id', projectController.deleteProject);

module.exports = router;
