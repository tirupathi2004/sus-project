exports.recommend = (req, res) => {
  const query = req.body.query?.toLowerCase() || "";
  const response = { challenges: [], courses: [] };
  if (query.includes("dynamic programming") || query.includes("dp"))
    response.challenges.push({ id: "dp", title: "Intro to Dynamic Programming" });
  if (query.includes("recursion"))
    response.challenges.push({ id: "recursion", title: "Recursion Challenges" });
  if (query.includes("graph"))
    response.challenges.push({ id: "graph", title: "Graph Traversal Problems" });
  res.json(response);
};