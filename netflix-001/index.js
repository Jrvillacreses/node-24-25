// API REST

// IMPORTS EN JAVA
const express = require('express'); //API REST -> NODE JS CON EXPRESS
const { Pool } = require("pg") // HABLAR BD PG DE AWS

// INSTANCIAR LOS OBJETOS QUE NECESITO
const app = express();
const port = 3000;

app.get("/usuarios/", (req, res) => {
        // req -> no lo necesito
        // res -> lo necesito
        res.send('Has solicitado una lista de usuarios')
});

app.get("/usuarios/:id", (req, res)=> {
    const userId= req.params.id;
    res.send(`El ID del usuario es: ${userId}`)
});

 //CONSULTA SELECT * FROM USUARIOS
app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`)
});

/*
app.post("/usuarios/", (req, res) => {}); //LOGIN PELICULAS POR CATEGORIOS
                            // ADD, INSERT
app.delete("/usuarios/", (req, res) => {}); // ELIMINAR
app.put("/usuarios/", (req, res) => {}); // ACTUALIZAR */