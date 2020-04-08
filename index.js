const express = require('express');

const server = express();

server.use(express.json());

const projects = [ {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }];

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.get('/projects/:index', (req, res) => {
    const { index } = req.params;
    return res.json(projects[index]);
})

server.post('/projects', (req, res) => {
    const { id } = req.body;

    const { title } = req.body;
    
    var project = {id: id, title: title};
    projects.push(project);

    return res.json({projects});
})

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const index = projects.findIndex(project => project.id === id);

    projects[index].title = title;

    return res.json({projects});
})

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const index = projects.findIndex(project => project.id === id);

    projects.splice(index, 1);

    return res.send();
})

server.listen(3000);