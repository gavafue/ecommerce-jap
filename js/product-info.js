//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    fetch(PRODUCT_INFO_URL)
    .then(respuesta => respuesta.json())

    .then(datos => {
        document.getElementById("productInfoContainer").innerHTML= `<div class="text-center p-4">
        <h2>${datos.name}</h2></div>
        <p>${datos.description}</p>
        <p>${datos.currency} ${datos.cost}</p>
        <img src="${datos.images[0]}" width="220px"></img>
        <img src="${datos.images[1]}" width="220px"></img>
        <img src="${datos.images[2]}" width="220px"></img>
        <img src="${datos.images[3]}" width="220px"></img>
       `;
        
    });
});