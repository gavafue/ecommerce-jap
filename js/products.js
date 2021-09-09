//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var contenedor = "";



document.addEventListener("DOMContentLoaded", function (e) {
        fetch(PRODUCTS_URL)
            .then(respuesta => respuesta.json())

            .then(datos => {
                datos.forEach(element => {
                    contenedor += `<div class="cajita">
                    <div class="imagen" style="background:url(${element.imgSrc})">
                    <div class="vendidos">${element.soldCount} vendidos</div></div>
                    <span>${element.name}</span>
                    <p>${element.description}</p>
                    <div class="precio">${element.currency} ${element.cost}</div></div>`
                });
                document.getElementById("listadoproductos").innerHTML = contenedor;


                /*Cuando se hace click en el boton de orden ascendente */
                document.getElementById("ordAsc").addEventListener("click", function () {
                    document.getElementById("listadoproductos").innerHTML = "";
                    let result = [];
                    result = datos.sort(function (a, b) {
                        return a.cost - b.cost;
                    });
                    let resultado = ""
                    for (let element of result) {
                        resultado += `<div class="cajita">
                    <div class="imagen" style="background:url(${element.imgSrc})">
                    <div class="vendidos">${element.soldCount} vendidos</div></div>
                    <span>${element.name}</span>
                    <p>${element.description}</p>
                    <div class="precio">${element.currency} ${element.cost}</div></div>`;
                    }
                    document.getElementById("listadoproductos").innerHTML = resultado;

                })


                /*cuando se hace click en el boton de orden descendente*/
                document.getElementById("ordDesc").addEventListener("click", function () {
                    document.getElementById("listadoproductos").innerHTML = "";
                    let result = [];
                    result = datos.sort(function (a, b) {
                        return b.cost - a.cost;
                    });
                    let resultado = ""
                    for (let element of result) {
                        resultado += `<div class="cajita">
                    <div class="imagen" style="background:url(${element.imgSrc})">
                    <div class="vendidos">${element.soldCount} vendidos</div></div>
                    <span>${element.name}</span>
                    <p>${element.description}</p>
                    <div class="precio">${element.currency} ${element.cost}</div></div>`;
                    }
                    document.getElementById("listadoproductos").innerHTML = resultado;

                })


                /*cuando se hace click en el boton de relevancia*/
                document.getElementById("ordRel").addEventListener("click", function () {
                    document.getElementById("listadoproductos").innerHTML = "";
                    let result = [];
                    result = datos.sort(function (a, b) {
                        return b.soldCount - a.soldCount; /*hago resta entre vendidos para generar el valor*/
                    });
                    let resultado = ""
                    for (let element of result) {
                        resultado += `<div class="cajita">
                    <div class="imagen" style="background:url(${element.imgSrc})">
                    <div class="vendidos">${element.soldCount} vendidos</div></div>
                    <span>${element.name}</span>
                    <p>${element.description}</p>
                    <div class="precio">${element.currency} ${element.cost}</div></div>`;
                    }
                    document.getElementById("listadoproductos").innerHTML = resultado;

                })

                /*filtro de precio*/
                let precioMaximo = undefined;
                let precioMinimo = undefined;
                document.getElementById("filtrarprecio").addEventListener("click", function(){
                    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
                    //de productos por categoría.
                    precioMinimo = document.getElementById("priceMin").value;
                    precioMaximo = document.getElementById("priceMax").value;
            
                    if ((precioMinimo != undefined) && (precioMinimo != "") && (parseInt(precioMinimo)) >= 0){
                        precioMinimo = parseInt(precioMinimo);
                    }
                    else{
                        precioMinimo = undefined;
                    }
            
                    if ((precioMaximo != undefined) && (precioMaximo != "") && (parseInt(precioMaximo)) >= 0){
                        precioMaximo = parseInt(precioMaximo);
                    }
                    else{
                        precioMaximo = undefined;
                    }

                    document.getElementById("listadoproductos").innerHTML = "";
                    let resultado = ""
                    for (let element of datos) {
                        if (((precioMinimo == undefined) || (precioMinimo != undefined && parseInt(element.cost) >= precioMinimo)) &&
            ((precioMaximo == undefined) || (precioMaximo != undefined && parseInt(element.cost) <= precioMaximo))){
                            resultado += `<div class="cajita">
                    <div class="imagen" style="background:url(${element.imgSrc})">
                    <div class="vendidos">${element.soldCount} vendidos</div></div>
                    <span>${element.name}</span>
                    <p>${element.description}</p>
                    <div class="precio">${element.currency} ${element.cost}</div></div>`;
                        }

                        document.getElementById("listadoproductos").innerHTML = resultado;
                    }



                });
            })
            .catch(error => alert("Hubo un error: " + error));
    }

);