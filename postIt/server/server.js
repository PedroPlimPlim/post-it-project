const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Armazenar as posições de post-its (armazenamento na memória, pode ser substituído por um banco de dados)
let postIts = {};

app.put('/postit/:id', (req, res) => {
  const id = req.params.id;
  const { position } = req.body;
  
  postIts[id] = position; // Salva a posição (bando de dados vai entrar aqui)
  console.log(`Post-it ${id} updated position:`, position);
  
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
