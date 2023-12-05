//Generar recomendacion

function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // Resetea la altura
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Ajusta a la altura del contenido
}


document.getElementById('sendBtn').addEventListener('click', async function() {
    const ingredients = document.getElementById('ingredientInput').value;

    if (ingredients.trim() === "") {
        alert("Por favor, ingresa su plan");
        return;
    }

    // Mostrar el indicador de carga
    document.getElementById('loadingIndicator').style.display = 'block';

    // Objeto con los datos a enviar
    const payload = {
        ingredients: ingredients.split(',').map(item => item.trim())  // Esto crea un array de ingredientes
    };

    try {
        const response = await fetch(`http://localhost:3000/api/recetas`, {
            method: 'POST', // Método POST
            headers: {
                'Content-Type': 'application/json' // Indicamos que vamos a enviar datos en formato JSON
            },
            body: JSON.stringify(payload) // Convertimos el objeto a JSON para enviarlo
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const data = await response.json();
        const recipeTextarea = document.getElementById('recipeOutput');
        recipeTextarea.value = data.message;
        adjustTextareaHeight(recipeTextarea);

       
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Ocultar el indicador de carga
        document.getElementById('loadingIndicator').style.display = 'none';
    }
});


//guardar receta

document.getElementById('saveBtn').addEventListener('click', async function() {
    const recipe = document.getElementById('recipeOutput').value;

    if (recipe.trim() === "") {
        alert("No hay receta para guardar.");
        return;
    }

    // Crear la estructura de datos para enviar en el cuerpo de la petición
    let payload = {
        recipeOutput: {
            name: recipe
        },
        dateCreated: new Date().toISOString(), // fecha y hora actuales en formato ISO
        id: "",  //  agregar el valor 
        userId: "",  //  agregar el valor 
        ingredients: ""  //  agregar el valor 
    };

    try {
        const response = await fetch(`http://localhost:8080/api/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // Convertir el objeto a JSON para enviarlo
        });

        const data = await response.json();
        document.getElementById('responseMsg').innerText = data.message;
    } catch (error) {
        console.error("Error:", error);
    }
});


document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('recipeOutput').value = "";
    document.getElementById('responseMsg').innerText = "";
});
