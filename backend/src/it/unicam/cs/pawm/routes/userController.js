const express= require('express')
const router = express.Router()
router.use(express.json())

const userList = 
[{
    id: 1,
    name: 'name1'
}, 
{
    id: 2,
    name: 'name2'

}]
//rotte
router.get('/allUsers', (req, res) => res.send(JSON.stringify(userList)))

router.get('/:userId', (req, res) => {
    const user = userList.find(user => user.id === parseInt(req.params.userId))
    if (!user) res.status(404).send('User not found')
    res.send(JSON.stringify(user))
});

router.get('/:name', (req, res) => {
    const user = userList.find(user => user.name === req.params.name)
    if (!user) res.status(404).send('User not found')
    res.send(JSON.stringify(user))
});

router.post('/users', (req, res) => res.send(JSON.stringify[
    userList.push(req.body),
    res.sendStatus(201)
]))
//modulo da esportare per le rotte, richiamato in index.js
module.exports = router