const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'noticias_db',
  port: 3308
});

db.connect(err => {
  if (err) {
    console.log("❌ Error conexión:", err);
  } else {
    console.log("✅ Conectado a MySQL en puerto 3308");
  }
});

// OBTENER TODAS LAS NOTICIAS 
app.get('/noticias', (req, res) => {
  db.query("SELECT * FROM noticias ORDER BY id DESC", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// PUBLICAR NOTICIA 
app.post('/noticias', (req, res) => {
  const { titulo, descripcion } = req.body;
  const sql = "INSERT INTO noticias (titulo, descripcion) VALUES (?, ?)";
  db.query(sql, [titulo, descripcion], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ mensaje: "Guardado", id: result.insertId });
    }
  });
});

// ELIMINAR NOTICIA (Botón Eliminar)
app.delete('/noticias/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM noticias WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ mensaje: "Noticia eliminada correctamente" });
    }
  });
});

// EDITAR NOTICIA (Botón Editar)
app.put('/noticias/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;
  const sql = "UPDATE noticias SET titulo = ?, descripcion = ? WHERE id = ?";
  db.query(sql, [titulo, descripcion, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ mensaje: "Noticia actualizada correctamente" });
    }
  });
});

// NEWSLETTER (SOLO GMAIL)
app.post('/newsletter', (req, res) => {
const { email } = req.body;
if (!email || !email.endsWith('@gmail.com')) {
return res.status(400).json({ error: "Solo Gmail" });
}
db.query("INSERT INTO newsletter (email) VALUES (?)", [email], (err) => {
if (err) res.status(500).send(err);
else res.json({ mensaje: "Suscrito" });
});
});

app.get('/newsletter', (req, res) => {

  const sql = "SELECT * FROM newsletter";

  db.query(sql, (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }

  });

});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/registro', (req, res) => {

  const { username, email, password } = req.body;

  const sql = "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)";

  db.query(sql, [username, email, password], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error al registrar");
    } else {
      res.json({ message: "Usuario registrado" });
    }

  });

});

app.post('/login', (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {

      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(401).send("Credenciales incorrectas");
      }

    }

  });

});


app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});