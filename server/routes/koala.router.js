const { response } = require('express');
const express = require('express');
const { read } = require('fs');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
// this is the /koalas GET route
koalaRouter.get(`/`, (req, res) => {
    console.log(`Received a GET /koalas request`);
    // build the SQL query
    let queryText = `SELECT * FROM "koalas"`;

    // send the query to the SQL database
    pool
        .query(queryText)
        .then((response) => {
            // the response here is a bunch of koalas
            let koalas = response.rows;
            console.log(`This should be a bunch of koalas:`, koalas);
            // send the koalas to the client
            res.send(koalas);
        })
        .catch((error) => {
            console.log(`There was an error in the GET /koalas route:`, error);
            // let the client know that there was an error on the server
            res.sendStatus(500);
        });
});

// POST
//adds a new koala to the list of koalas
//request body must be a koala object with name, gender, age, readytotransfer, notes
koalaRouter.post('/', (req, res) => {
    console.log(`in post /koalas`);
    let newKoala = req.body;
    console.log('Adding koala', newKoala);

    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES($1, $2, $3, $4, $5);`;

    // // PUT
    // router.put('/:id', (req, res) => {
    //     let id = req.params.id;

    //     let newKoala = req.body.newKoala;

    //     console.log(id);
    //     console.log(newKoala);

    //     let queryText = `
    //     UPDATE "koalas"
    //     SET "ready_to_transfer" = TRUE
    //     WHERE "id" = $1
    //     `
    //     let values = [id];

    //     pool.query(queryText, values).then(result => {
    //         res.sendStatus(204);

    //     }).catch(err => {
    //         console.log('Error with GET query', err);
    //         res.sendStatus(500);
    //     })
    // })
    pool
        .query(queryText, [
            newKoala.name,
            newKoala.gender,
            newKoala.age,
            newKoala.readyForTransfer,
            newKoala.notes,
        ])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error adding new book`, error);
            res.sendStatus(500);
        });
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    let readyForTransfer = req.body.readyForTransfer;

    console.log(id);
    console.log(readyForTransfer);

    let queryText = `
        UPDATE "koalas"
        SET "ready_to_transfer" = $2
        WHERE "id" = $1
         `

    let values = [id, readyForTransfer];

    pool.query(queryText, values).then(result => {
        res.sendStatus(204);

    }).catch(err => {
        console.log('Error with GET query', err);
        res.sendStatus(500);
    })
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    let id = req.params.id
    console.log(id);
    // pool.query...
    let queryText = `	
    DELETE FROM "koalas"
  WHERE "id" = $1;
    `
    let values = [id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(204);

    }).catch(err => {
        console.log('Error with GET query', err);
        res.sendStatus(500);
    })

});

module.exports = koalaRouter;
