import express, { response } from 'express'

const app = express()

app.use(express.json())

app.get('/courses', function(request, response) {
    const {name} = request.query//query - paginacao, filtro (sao opcional)
    console.log(name);
    response.json(["curso 1", "curso 2", "curso 3"])
})

app.post('/courses', (request, response) => {
    const {name, email} = request.body
    console.log(name, email);
    response.json(["curso 1", "curso 2", "curso 3", "curso 4"])
})

app.put('/courses/:id', (request, response) => {
    const {id} = request.params//route params - buscar, editar e actualizar
    console.log(id);
    response.json(["curso 6", "curso 2", "curso 3", "curso 4"])
})

app.patch('/courses/:id', (request, response) => {
    
    response.json(["curso 6", "curso 7", "curso 2", "curso 3", "curso 4"])
})

app.delete('/courses/:id', (request, response) => {
    response.json(["curso 6", "curso 2", "curso 4"])
})

app.listen(3333, function() {
    console.log('running....');
})