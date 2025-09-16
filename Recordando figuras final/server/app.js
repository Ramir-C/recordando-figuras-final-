const express = require("express");
const bodyParser = require("body-parser");
const playerController = require("./controllers/playerController"); // 👈 importante
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rutas
app.use(express.static("public"));
app.post("/players", playerController.createPlayer);
app.get("/players", playerController.getPlayers);
app.put("/players/:id", playerController.updateScore);
app.get("/", (req, res) => {
res.send("Servidor funcionando 🚀. Prueba /players para ver los datos.");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


