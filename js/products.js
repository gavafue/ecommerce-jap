//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var arrayproductos

document.addEventListener("DOMContentLoaded", function (e) {
        fetch(PRODUCTS_URL)
            .then(respuesta => respuesta.json())

            .then(datos => {
                arrayproductos= datos;
                function mostrarProductos(array) {
                    var contenedor = "";
                    array.forEach(element => {
                        contenedor += `
                        <a class="list-group-item list-group-item-action" onclick="completeinfo()">
                        <div class="row">
                    <div class="col-3">
                        <img src="` + element.imgSrc + `" alt="` + element.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ element.name +`</h4>
                            <small class="text-muted">` + element.soldCount + ` artículos vendidos<br>
                            <span class="badge badge-dark" style="font-size:20px"> ${element.currency} ${element.cost}</span></small>
                            

                        </div>
                        <p class="mb-1">` + element.description + `</p>
                    </div>
                </div></a>`
                    });
                    document.getElementById("listadoproductos").innerHTML = contenedor;
                }
                mostrarProductos(datos);

                /*Cuando se hace click en el boton de orden ascendente */
                document.getElementById("ordAsc").addEventListener("click", function () {
                    document.getElementById("listadoproductos").innerHTML = "";
                    let result = [];
                    result = datos.sort(function (a, b) {
                        return a.cost - b.cost;
                    });
                    mostrarProductos(result)

                })


                /*cuando se hace click en el boton de orden descendente*/
                document.getElementById("ordDesc").addEventListener("click", function () {
                    document.getElementById("listadoproductos").innerHTML = "";
                    let result = [];
                    result = datos.sort(function (a, b) {
                        return b.cost - a.cost;
                    });
                    mostrarProductos(result)

                })


                /*cuando se hace click en el boton de relevancia*/
                document.getElementById("ordRel").addEventListener("click", function () {
                    document.getElementById("listadoproductos").innerHTML = "";
                    let result = [];
                    result = datos.sort(function (a, b) {
                        return b.soldCount - a.soldCount; /*hago resta entre vendidos para generar el valor*/
                    });
                    mostrarProductos(result)

                })

                /*filtro de precio*/
                let precioMaximo = undefined;
                let precioMinimo = undefined;
                document.getElementById("filtrarprecio").addEventListener("click", function () {
                    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
                    //de productos por categoría.
                    precioMinimo = document.getElementById("priceMin").value;
                    precioMaximo = document.getElementById("priceMax").value;

                    if ((precioMinimo != undefined) && (precioMinimo != "") && (parseInt(precioMinimo)) >= 0) {
                        precioMinimo = parseInt(precioMinimo);
                    } else {
                        precioMinimo = undefined;
                    }

                    if ((precioMaximo != undefined) && (precioMaximo != "") && (parseInt(precioMaximo)) >= 0) {
                        precioMaximo = parseInt(precioMaximo);
                    } else {
                        precioMaximo = undefined;
                    }

                    document.getElementById("listadoproductos").innerHTML = "";
                    let resultado = []
                    for (let element of datos) {
                        if (((precioMinimo == undefined) || (precioMinimo != undefined && parseInt(element.cost) >= precioMinimo)) &&
                            ((precioMaximo == undefined) || (precioMaximo != undefined && parseInt(element.cost) <= precioMaximo))) {
                           resultado.push(element);;
                        }
                        mostrarProductos(resultado);
                    }
                });
           
            })
            .catch(error => alert("Hubo un error: " + error));
    }

);


 /*al hacer click en productos, redirige*/
 function completeinfo(){
    window.location = "product-info.html";
 }