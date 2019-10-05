/**
 * Saluda a una persona
 * 
 * @param {string} nombre El nombre de la persona que queremos saludar
 */
function saludarA(nombre) {
    console.log(`Hola ${nombre}`);
}

function preguntarComoEsta() {
    console.log("¿Como estas?")
}

function despedirnosDe() {
    console.log(`Hasta luego`)
}

setTimeout(despedirnosDe, 2000);
saludarA("Facundo");
preguntarComoEsta();