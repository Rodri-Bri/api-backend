const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");

app.use(cors());

let notes = [
  {
    userId: 1,
    title: "NOTA 1",
    body: "ESTO ES UNA NOTA",
  },
  {
    userId: 2,
    title: "NOTA 2",
    body: "ESTO ES UNA NOTA",
  },
  {
    userId: 3,
    title: "NOTA 3",
    body: "ESTO ES UNA NOTA",
  },
  {
    userId: 4,
    title: "NOTA 3",
    body: "ESTO ES UNA NOTA",
  },
];

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/info", (request, response) => {
  let tam = notes.length;
  let date = new Date();
  response.send(`<h3>Phonebook has info for ${tam} people</h3> ${date}`);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: `name missing`,
    });
  }

  const note = {
    userId: generateId(),
    title: body.title,
    body: body.body,
  };

  notes = notes.concat(note);

  response.json(note);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// let notes = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendick",
//     number: "39-23-6423122",
//   },
// ];

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// app.use(requestLogger);

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// app.get("/api/persons", (request, response) => {
//   response.json(notes);
// });

// app.get("/info", (request, response) => {
//   let tam = notes.length;
//   let date = new Date();
//   response.send(`<h3>Phonebook has info for ${tam} people</h3> ${date}`);
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find((note) => note.id === id);
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

// app.post("/api/persons", (request, response) => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

//   const body = request.body;
//   if (!body.name) {
//     return response.status(400).json({
//       error: `name missing`,
//     });
//   }

//   if (!body.number) {
//     return response.status(400).json({
//       error: `number missing`,
//     });
//   }

//   let booleano = false;
//   notes.map((note) => {
//     if (note.name === body.name) {
//       return (booleano = true);
//     }
//   });

//   if (booleano == true) {
//     return response.status(400).json({
//       error: `repeated name`,
//     });
//   }

//   const note = {
//     id: generateId(),
//     name: body.name,
//     number: body.number,
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
