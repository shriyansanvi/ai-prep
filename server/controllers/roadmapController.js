const templates = require('../data/roadmapTemplates');
const Roadmap = require('../models/Roadmap');

exports.generateRoadmap = async (req, res) => {
  const { goal } = req.body;
  try {
    let existing = await Roadmap.findOne({ domain: goal });
    if (existing) return res.status(200).json(existing);

    const selectedTemplate = templates[goal];
    // Ensure this part includes the new fields
const newPath = new Roadmap({
  title: `${goal} Learning Path`,
  domain: goal,
  modules: selectedTemplate.map(mod => ({
    title: mod.title,
    tasks: mod.tasks.map(t => ({ 
      name: t.name, 
      time: t.time, 
      desc: t.desc, 
      info: t.info,      // <--- MAKE SURE THIS IS HERE
      resource: t.resource, // <--- MAKE SURE THIS IS HERE
      isDone: false 
    }))
  }))
});

    const saved = await newPath.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  const { id, mIdx, tIdx } = req.body;
  try {
    const roadmap = await Roadmap.findById(id);
    roadmap.modules[mIdx].tasks[tIdx].isDone = !roadmap.modules[mIdx].tasks[tIdx].isDone;
    await roadmap.save();
    res.status(200).json(roadmap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};