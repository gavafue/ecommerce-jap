//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var contenedor = "";
document.addEventListener("DOMContentLoaded", function (e) {
        fetch(PRODUCTS_URL)
            .then(respuesta => respuesta.json())

            .then(datos => {
                datos.forEach(element => {
                    contenedor += `<div class="cajita"><div class="imagen" style="background:url(${element.imgSrc})"><div class="vendidos">${element.soldCount} vendidos</div></div><span>${element.name}</span><p>${element.description}</p><div class="precio">${element.currency} ${element.cost}</div></div>`
                });
                document.getElementById("listadoproductos").innerHTML = contenedor;

            })
            .catch(error => alert("Hubo un error: " + error));
    }

);