import supabase from '../supabase/client.js';

// CREATE
export const createProject = async (req, res) => {
  const { title, description, image_url, link } = req.body;

  const { error } = await supabase
    .from('projects')
    .insert([{ title, description, image_url, link }]);

  if (error) {
    console.error(error);
    return res.status(500).send('Failed to create project');
  }

  res.redirect('/admin');
};

// READ (for homepage)
export const getProjects = async (res) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return res.status(500).send('Failed to fetch projects');
  }

  res.render('index', { projects: data });
};

// UPDATE
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, link } = req.body;

  const { error } = await supabase
    .from('projects')
    .update({ title, description, image_url, link })
    .eq('id', id);

  if (error) {
    console.error(error);
    return res.status(500).send('Failed to update project');
  }

  res.redirect('/admin');
};

// DELETE
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    return res.status(500).send('Failed to delete project');
  }

  res.redirect('/admin');
};
