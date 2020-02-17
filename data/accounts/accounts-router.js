const express = require('express');
const db = require('../dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    
    db.select('*')
        .from('accounts')
        .limit(req.headers.limit)
        .orderBy('name')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'There was an error retrieving accounts.'});
        });
});

router.post('/', (req, res) => {
    db.insert(req.bodym, 'id') // will create an error in sql3
        .from('accounts')
        .then(account => {
            console.log(account);
            res.status(201).json(account[0]);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'There was an error adding accounts.'});
        });
});

router.get('/:id', (req, res) => {
    getById(req.params.id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'There was an error retrieving account information.'});
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
        .where({id})
        .update(req.body)
        .then(account => {
            res.status(202).json(account);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'There was an error retrieving account information.'});
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
        .where({id})
        .del()
        .then(response => {
            res.status(400).json(response);
        })
        .catch(error => {
            res.status(500).json({ error : 'There was an error deleting the record.'})
        });
});



module.exports = router;

function getById(id) {
    return db('accounts')
        .where({ id })
        .first();
};