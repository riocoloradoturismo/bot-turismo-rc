const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => {
  const twiml = new MessagingResponse();
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add('Hola! Soy RC Turismo, ¿en qué puedo ayudarte?');
  }

  function fallback(agent) {
    agent.add('No entendí eso, ¿podés repetir?');
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // Aquí podés agregar más intents personalizados

  agent.handleRequest(intentMap)
    .then(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error en el webhook');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot RC Turismo corriendo en puerto ${PORT}`);
});
