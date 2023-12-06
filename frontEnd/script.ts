import axios from 'axios';

// Suponiendo que estos valores vienen de un formulario
const ciudad = 'TuCiudad';
const año = '2023';
const mes = '03';
const dia = '15';
const plan = 'TuPlan';

// Función para obtener la predicción del clima
async function obtenerPrediccionClima() {
    try {
        const urlClima = `http://localhost:3000/api/clima/prediccion/${ciudad}/${año}/${mes}/${dia}`;
        const respuestaClima = await axios.get(urlClima);
        const { temperatura_predicha, clima_general } = respuestaClima.data;

        return crearPlan(temperatura_predicha);
    } catch (error) {
        console.error('Error obteniendo la predicción del clima:', error);
    }
}

// Función para crear un plan basado en la temperatura predicha
async function crearPlan(temperatura_predicha: number) {
    try {
        const urlPlan = 'http://localhost:3000/api/chatgpt/crearplan/';
        const respuestaPlan = await axios.post(urlPlan, {
            Plan: plan,
            Temp: temperatura_predicha.toString(),
            ciudad
        });

        console.log('Respuesta del plan:', respuestaPlan.data);
    } catch (error) {
        console.error('Error creando el plan:', error);
    }
}

// Ejecutar la secuencia
obtenerPrediccionClima();
