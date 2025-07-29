const { WebhookClient } = require("dialogflow-fulfillment");

app.post("/webhook", (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add("¡Hola! Bienvenido a RC Turismo. ¿Qué querés saber?");
  }

  function actividades(agent) {
    agent.add("Podés conocer todas las actividades en: https://sites.google.com/view/riocoloradoturismo/actividades");
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Actividades Intent", actividades);

  agent.handleRequest(intentMap);
});
