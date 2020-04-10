const express = require('express');

const server = express();

server.use(express.json());

const projects = [ {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }];

function requestCount(req, res, next) {
    console.count('Requisições até o momento');
    next();
}

function checkProjectExists(req, res, next) {
    const { id } = req.params;

    const project = projects.find(project => project.id === id);

    if(!project){
        res.status(400).json({error: 'Id dos not existis'})
    }
    return next();
}

server.use(requestCount);

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.get('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const index = projects.findIndex(project => project.id === id);

    return res.json(projects[index]);
})

server.post('/projects', (req, res) => {
    const { id } = req.body;

    const { title } = req.body;
    
    var project = {id: id, title: title, tasks:[]};
    projects.push(project);

    return res.json({projects});
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const { title } = req.body;

    const index = projects.findIndex(project => project.id === id);

    projects[index].tasks.push(title);

    return res.json({projects});
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const index = projects.findIndex(project => project.id === id);

    projects[index].title = title;

    return res.json({projects});
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const index = projects.findIndex(project => project.id === id);

    projects.splice(index, 1);

    return res.send();
})

server.listen(3000);