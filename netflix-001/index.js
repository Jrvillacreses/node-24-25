// API REST
/*
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


app.post("/usuarios/", (req, res) => {}); //LOGIN PELICULAS POR CATEGORIOS
                            // ADD, INSERT
app.delete("/usuarios/", (req, res) => {}); // ELIMINAR
app.put("/usuarios/", (req, res) => {}); // ACTUALIZAR */

// IMPORTS EN JAVA
const express = require("express"); // API REST -> NODE JS CON EXPRESS
const { Pool } = require("pg");      // HABLAR BD PG DE AWS

// INSTANCIAR LOS OBJETOS QUE NECESITAMOS
const app = express();
const port = 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
    user: "postgres",
    host: "netflix-01.cupetnmlumhn.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "LUCASLUCAS", // Considera usar variables de entorno para gestionar contraseñas
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // Cambia a false si tienes problemas de certificados pero trata de evitarlo por seguridad
      // ca: fs.readFileSync('/path/to/server-ca.pem').toString(),
      // Es posible que AWS RDS requiera parámetros SSL específicos o archivos CA.
      // Comprueba la documentación de AWS RDS para obtener los detalles exactos.
    },
  });
  
// Ruta para buscar películas
app.get("/peliculas", async (req, res) => {
        const { titulo } = req.query; // Obtener el título desde la URL
    
        if (!titulo) {
            return res.status(400).json({ error: "Debes proporcionar un título para buscar" });
        }
    
        try {
            // Consulta SQL para buscar películas
            const { rows } = await pool.query(
                "SELECT * FROM peliculas WHERE titulo ILIKE $1",
                [`%${titulo}%`] // Búsqueda parcial con insensibilidad a mayúsculas/minúsculas
            );
    
            if (rows.length === 0) {
                return res.status(404).json({ mensaje: "No se encontraron películas con ese título" });
            }
    
            res.json(rows); // Devolver los resultados en formato JSON
        } catch (error) {
            console.error("Error al buscar películas:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    });
    app.get("/peliculas", async (req, res)=>{
        const {rows} = await pool.query(
            "SELECT * FROM peliculas;"
        );
        res.json(rows);
        // res.send("Bienvenido a mi API DISNEY");
    });

// Ruta para insertar una nueva película
app.post("/peliculas", async (req, res) => {
        const { titulo, director, anio } = req.body;
    
        // Validar que se proporcionen todos los campos
        if (!titulo || !director || !anio) {
            return res.status(400).json({ error: "Debes proporcionar título, director y año" });
        }
    
        try {
            // Consulta SQL para insertar la película
            const result = await pool.query(
                "INSERT INTO peliculas (titulo, director, anio) VALUES ($1, $2, $3) RETURNING *",
                [titulo, director, anio]
            );
    
            res.status(201).json({
                mensaje: "Película insertada con éxito",
                pelicula: result.rows[0], // Devolver la película recién insertada
            });
        } catch (error) {
            console.error("Error al insertar película:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    });
    

  app.get("/peliculas", async (req, res)=>{
    const {rows} = await pool.query(
        "SELECT * FROM peliculas;"
    );
    res.json(rows);
    // res.send("Bienvenido a mi API DISNEY");
});
    

    // CONSULTAR -> SELECT * FROM USUARIOS, PELICULAS
    app.get("/usuarios/", (req, res) =>{
        // req -> no lo necesito
        // res -> sí
        res.send('Has solicitado una lista de usuarios');
    }); 

    app.get("/usuarios/:id", (req, res) =>{
        const userId = req.params.id;
        res.send(`El ID del usuario es: ${userId}`);
    });

    // ----
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
      });
    // LOGIN, PELÍCULAS POR CATEGORÍAS
        // ADD -> INSERT
        //     app.post("/usuarios/", (req, res)); 
    // ELIMINAR -> DELETE                            
        // app.delete("/usuarios/", (req, res)); 
    // MODIFICAR -> UPDATE
        // app.put("/usuarios/", (req, res));    
