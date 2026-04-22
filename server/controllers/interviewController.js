// Mocking a DB storage for now
let solvedProblems = []; 

exports.logProblem = (req, res) => {
  const { title, difficulty, topic } = req.body;
  const newProblem = { id: Date.now(), title, difficulty, topic, date: new Date() };
  solvedProblems.push(newProblem);
  res.status(201).json(newProblem);
};

exports.getProblems = (req, res) => {
  res.status(200).json(solvedProblems);
};