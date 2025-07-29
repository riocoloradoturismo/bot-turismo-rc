const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const body = req.body;

  const query = body.queryResult.queryText.toLowerCase();
  let responseText = "";

  if (query.includes("alojamiento") || query.includes("alojamientos")) {
    responseText = "Podés ver los alojamientos en este enlace: https://sites.google.com/view/riocoloradoturismo/alojamientos";
  } else if (query.includes("actividad") || query.includes("hacer")) {
    responseText = "Conocé todas las actividades disponibles en: https://sites.google.com/view/riocoloradoturismo/actividades";
  } else if (query.includes("mapa") || query.includes("folleto")) {
    responseText = "Accedé a mapas y folletos desde aquí: https://sites.google.com/view/riocoloradoturismo/mapas-folletos";
  } else if (query.includes("consulta") || query.includes("duda")) {
    responseText = "Podés hacer tu consulta general en: https://sites.google.com/view/riocoloradoturismo/inicio";
  } else if (query.includes("encuesta")) {
    responseText = "Por favor, completá esta encuesta para ayudarnos a mejorar: https://docs.google.com/forms/d/e/1FAIpQLScW31w-fpZSnJ-BQdX9RYBIX-zKfUUzNifyG70jAvW51oQXFw/viewform?usp=header";
  } else {
    responseText = "¡Hola! Soy RC Turismo. Podés consultar sobre:\n- Alojamientos\n- Actividades (decime '¿qué puedo hacer?')\n- Mapas\n- Otras consultas\n- O escribí 'encuesta' para colaborar.";
  }

  res.json({
    fulfillmentText: responseText,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot RC Turismo corriendo en puerto ${PORT}`);
});
