import express, { response } from 'express'
import {v4 as uuid4} from 'uuid'

const app = express()
app.use(express.json())
/**
 * Dados da conta do liente
 * id: uuid
 * name: string
 * NIF: string
 * statement - extrato: []
 */

//customers - clientes
const customers = []

function verifyIfExistsAccountNif(request, response, next) {
    const {nif} = request.headers
    const customer = customers.find(customer => customer.nif === nif)
    if (!customer) {
        return response.status(400).json({error: 'Customer not found'})
    }

    request.customer = customer
    return next()
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

app.post('/account', (request, response) => {
    const {nif, name} = request.body

    const customerAlreadyExists = customers.some(
        (customer) => customer.nif === nif
    )

    if (customerAlreadyExists) {
        return response.status(400).json({error: "Customre Already Exists!"})
    }

    customers.push({
        id: uuid4(),
        nif,
        name,
        statement: []
    })

    return response.status(201).send()
})

app.get('/statement/',  verifyIfExistsAccountNif, (request, response) => {
    const {customer} = request
    return response.json(customer.statement)
})

app.post('/deposit', verifyIfExistsAccountNif, (request, response) => {
    const {description, amount} = request.body
    const {customer} = request

    const statementOperation = {
        description,
        amount,
        createdAt: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)

    response.status(200).send()
})

app.post('/withdraw', verifyIfExistsAccountNif, (request, response) => {
    const {amount} = request.body

    const {customer} = request

    const balance = getBalance(customer.statement)

    if (balance < amount) {
        return response.status(400).json({error: 'Insuficient founds!'})
    }
    const statementOperation = {
        amount,
        createdAt: new Date(),
        type: 'debit'
    }

    customer.statement.push(statementOperation)

    return response.status(200).send()
    
})

app.get('/statement/date',  verifyIfExistsAccountNif, (request, response) => {
    const {customer} = request
    const {date} = request.query

    const dateFormat = new Date(date + " 00:00")//hack para pegar o dia inteiro

    const statement = customer.statement.filter((statement) => statement.createdAt.toDateString() === new Date(dateFormat).toDateString())

    if (!statement) {
        return response.status(400).json({error: 'date not found'})
    }

    return response.json(statement)
})

app.put('/account', verifyIfExistsAccountNif, (request, response) => {
    const {name} = request.body
    const {customer} = request

    customer.name = name

    return response.status(201).send()
})

app.get('/account', verifyIfExistsAccountNif, (request, response) => {
    const {customer} = request
    return response.json(customer)
})

app.delete('/account', verifyIfExistsAccountNif, (request, response) => {
    const {customer} = request

    customers.splice(customer, 1)

    return response.status(200).json(customers)
})

app.get('/balance', verifyIfExistsAccountNif, (request, response) => {
    const {customer} = request

    const balance = getBalance(customer.statement)

    return response.json(balance)
})

app.listen(3333, function() {
    console.log('running....');
})