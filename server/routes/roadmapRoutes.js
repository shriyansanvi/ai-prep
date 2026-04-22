const express = require('express');
const router = express.Router();
const templates = require('../data/roadmapTemplates');

let roadmapStore = {};

router.post('/generate', (req, res) => {
  const { goal } = req.body;

  if (roadmapStore[goal]) {
    return res.json(roadmapStore[goal]);
  }

  const templateModules = templates[goal];

  if (!templateModules) {
    return res.status(404).json({ message: `No template found for: ${goal}` });
  }

  const newRoadmap = {
    _id: Math.random().toString(36).substr(2, 9),
    title: `${goal} Learning Path`,
    domain: goal,
    modules: templateModules.map(mod => ({
      title: mod.title,
      tasks: mod.tasks.map(task => ({ ...task, isDone: false })) // ✅ adds isDone to every task
    }))
  };

  roadmapStore[goal] = newRoadmap;
  res.json(newRoadmap);
});

router.put('/update', (req, res) => {
  const { id, mIdx, tIdx } = req.body;

  const goalKey = Object.keys(roadmapStore).find(key => roadmapStore[key]._id === id);

  if (!goalKey) {
    return res.status(404).json({ message: "Roadmap not found" });
  }

  const task = roadmapStore[goalKey].modules[mIdx].tasks[tIdx];
  task.isDone = !task.isDone;
  res.json(roadmapStore[goalKey]);
});

module.exports = router;