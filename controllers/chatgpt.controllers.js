import  Configuration  from 'openai';
import  OpenAIApi from 'openai';

export const createPlan = async (request, response) => {
  let plan = request.body;
  console.log(plan);  

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Actua como un coordinador de actividades en ${plan.ciudad}, ten presente que deseamos ${plan.Plan}, generanos actividades relacionadas que se puedan hacer comprendiendo que la tenperatura ese dia sera de: ${plan.Temp} grados, indicanos nombres de lugares reconocidos en la ciudad si es el caso`,
      }
    ],
    temperature: 0.7,
    // max_tokens: 1000
    
  };
  console.log(data)
  
  try {
    const openaiResponse = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
    const responseData = await openaiResponse.json();
    const respuesta_generada = responseData.choices[0].message.content;
    let mensajeAdicional = " Si deseas, puedes usar la funcionalidad de distancia en nuestro panel ingresando los nombres de los lugares indicados y darle calcular.";
    let mensajeSalida =respuesta_generada +mensajeAdicional

    response.json({ message: mensajeSalida });
    console.log(mensajeSalida);
  } catch (e) {
    console.error("Error al hacer la petición a OpenAI:", error);
    response.status(500).send("Error al comunicarse con OpenAI");
  }
};
