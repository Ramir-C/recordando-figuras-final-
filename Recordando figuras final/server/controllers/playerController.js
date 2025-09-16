const Player = require("../models/playerModel");

// arreglo temporal para guardar jugadores en memoria
let players = [];

// Crear un nuevo jugador
const createPlayer = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const newPlayer = new Player(players.length + 1, name, 0);
  players.push(newPlayer);

  res.status(201).json(newPlayer);
};

// Obtener todos los jugadores
const getPlayers = (req, res) => {
  res.json(players);
};

// Actualizar el puntaje de un jugador
const updateScore = (req, res) => {
  const { id } = req.params;
  const { score } = req.body;

  const player = players.find((p) => p.id == id);
  if (!player) {
    return res.status(404).json({ error: "Jugador no encontrado" });
  }

  player.score = score;
  res.json(player);
};

module.exports = {
  createPlayer,
  getPlayers,
  updateScore,
};

