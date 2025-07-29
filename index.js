const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  let userMessage;

  // Si viene de Dialogflow
  if (req.body.queryResult) {
    userMessage = req.body.queryResult.queryText;
  }
  // Si viene de Twilio
  else if (req.body.Body) {
    userMessage = req.body.Body;
  }

  console.log("Mensaje recibido:", userMessage);

  let respuesta = "";

  if (!userMessage) {
    respuesta = "No entendí tu mensaje. Por favor, intentá de nuevo.";
  } else if (/alojamiento/i.test(userMessage)) {
    respuesta = "Podés ver los alojamientos aquí: https://sites.google.com/view/riocoloradoturismo/alojamientos";
  } else if (/actividades|qué puedo hacer/i.test(userMessage)) {
    respuesta = "Acá podés ver qué actividades hay: https://sites.google.com/view/riocoloradoturismo/actividades";
  } else if (/mapa|mapas/i.test(userMessage)) {
    respuesta = "Consultá los mapas y folletos: https://sites.google.com/view/riocoloradoturismo/mapas-folletos";
  } else if (/consulta|consultas/i.test(userMessage)) {
    respuesta = "Podés ver toda la información general aquí: https://sites.google.com/view/riocoloradoturismo/inicio";
  } else {
    respuesta = "No entendí tu mensaje. Podés escribir: alojamientos, actividades, mapas u otras consultas.";
  }

  // Si viene desde Twilio, se responde como texto plano
  if (req.body.Body) {
    res.set("Content-Type", "text/plain");
    return res.send(respuesta);
  }

  // Si es desde Dialogflow, se responde con fulfillment
  return res.json({
    fulfillmentText: respuesta,
  });
});

app.listen(PORT, () => {
  console.log(`Bot RC Turismo corriendo en puerto ${PORT}`);
});
