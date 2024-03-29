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
                        <div class="col-md-6 col-lg-4 col-xs-12 mt-3" onclick="completeinfo()" ">
  <div class="card" style="min-width: 18rem; height:410px;">
    <div class="card-header text-center">
      ${element.name}
    </div>
    <img src="${element.imgSrc}" class="card-img-top" alt="Imagen del auto ${element.name}">
    <div class="card-body">
      <p class="card-text">${element.description}</p>
      
       <div style="display:flex;flex-direction: column;align-content: center;flex-wrap: wrap;"> <div class="justify-content-center badge badge-dark" style="font-size:20px;"> ${element.currency} ${element.cost}</div>
        <div class="text-muted" style="font-size:15px">` + element.soldCount + ` artículos vendidos</div></div>
    </div>
  </div>
</div>`
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