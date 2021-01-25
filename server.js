const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "october23",
  database: "moviePlanner_db",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

//   VIEWS ROUTES
app.get("/", (req, res) => {
  //   res.send("All my movies will go here.");
  connection.query(`SELECT * FROM movies`, (err, data) => {
    res.render("index", { movies: data });
  });
});

app.get("/movies/new", (req, res) => {
  res.send("A form to create a new movie will go here.");
});

app.get("/movies/:id", (req, res) => {
  //
  const movieId = req.params.id;
  connection.query(
    `SELECT * FROM movies WHERE id = ?`,
    [movieId],
    (err, data) => {
      console.log(data);
      res.render("single-movie", data[0]);
    }
  );
});

app.get("/movies/:id/edit", (req, res) => {
  res.send("A form to update the movie will go here.");
});

// API ROUTES

app.post("api/movies", (req, res) => {
//   res.send(
//     "After creating a new movie in the database, I will return a response."
//   );
connection.query(`INSERT INTO movies (movie) VALUES (?);`, [req.body.movie], (err, result) => {
    
})
});

app.put("/api/movies/:id", (res, req) => {
  res.send("After updating a movie by ID, I will return a response.");
});

app.delete("/api/movies/:id", (req, res) => {
  res.send("After deleting a movie by ID, I will return a response.");

  const movieId = req.params.id;

  connection.query(
    `DELETE FROM movies WHERE id = ?;`,
    [movieId],
    (err, result) => {
      res.join(result);
    }
  );
});

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
