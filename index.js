const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const msg = req.body.queryResult.queryText;
  let response = "No entendí tu consulta 🤔";

  if (msg.includes("alojamiento")) {
    response = "🛏️ Alojamiento: https://sites.google.com/view/riocoloradoturismo/alojamientos";
  } else if (msg.includes("actividad")) {
    response = "🎯 Actividades: https://sites.google.com/view/riocoloradoturismo/actividades";
  } else if (msg.includes("mapa")) {
    response = "🗺️ Mapas: https://sites.google.com/view/riocoloradoturismo/mapas-folletos";
  } else if (msg.includes("consulta")) {
    response = "ℹ️ Más info: https://sites.google.com/view/riocoloradoturismo/inicio";
  } else if (msg.includes("hablar")) {
    const ahora = new Date();
    const dia = ahora.getDay();
    const hora = ahora.getHours() + ahora.getMinutes() / 60;
    const esLaboral = dia >= 1 && dia <= 5 && hora >= 6.5 && hora <= 13;
    const esFinde = (dia === 0 || dia === 6) && hora >= 11 && hora <= 19;
    response = esLaboral || esFinde
      ? "👩‍💼 Un agente se comunicará con vos en breve."
      : "⏱️ Horario de atención:\nLunes a Viernes: 6:30 a 13:00\nSábados, Domingos y Feriados: 11:00 a 19:00";
  } else if (msg.includes("encuesta")) {
    response = "📋 Encuesta:\nhttps://docs.google.com/forms/d/e/1FAIpQLScW31w-fpZSnJ-BQdX9RYBIX-zKfUUzNifyG70jAvW51oQXFw/viewform";
  }

  res.json({ fulfillmentText: response });
});

app.listen(3000, () => console.log("Bot RC Turismo corriendo en puerto 3000"));
