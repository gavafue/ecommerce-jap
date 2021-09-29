//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



// Funcion para añadir un nuevo comentario.
var arrayproductos

function comentar() {
    var comment_text = document.getElementById("comment_text").value;
    var puntuacion = document.getElementById("puntuacion").value;
    var stars = ""
    if (puntuacion == 0) {
        stars = `<span class="fa fa-star "></span>
         <span class="fa fa-star "></span>
         <span class="fa fa-star "></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>`
    }
    if (puntuacion == 1) {
        stars = `<span class="fa fa-star checked"></span>
         <span class="fa fa-star "></span>
         <span class="fa fa-star "></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>`
    }
    if (puntuacion == 2) {
        stars = `<span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star "></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>`
    }
    if (puntuacion == 3) {
        stars = `<span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>`
    }
    if (puntuacion == 4) {
        stars = `<span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star"></span>`
    }
    if (puntuacion == 5) {
        stars = `<span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>`
    }
    var probando = comment_text;
    var mis_datos_json = localStorage.getItem("mis_datos")
    var nickname = JSON.parse(mis_datos_json)
    document.getElementById("commentslist").innerHTML +=
        `<b>${nickname.nombre}</b> ${probando} <br>
    ${stars}<br>
    2020-02-21 15:05:22<hr>`
}

function showComments(array) {
    var contenedor = "";
    array.forEach(element => {
        var stars = ""
        if (element.score == 0) {
            stars = `<span class="fa fa-star "></span>
        <span class="fa fa-star "></span>
        <span class="fa fa-star "></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
        }
        if (element.score == 1) {
            stars = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star "></span>
        <span class="fa fa-star "></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
        }
        if (element.score == 2) {
            stars = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star "></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
        }
        if (element.score == 3) {
            stars = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
        }
        if (element.score == 4) {
            stars = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
        }
        if (element.score == 5) {
            stars = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
        }
        contenedor += `<div class="comment"><b>${element.user}</b> ${element.description}
  <div class="stars"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
${stars} <p>${element.dateTime}</p></div></div><hr>`
    });
    document.getElementById("commentslist").innerHTML = contenedor;
}




document.addEventListener("DOMContentLoaded", function (e) {
   
    getJSONData(PRODUCTS_URL).then(function (result) {
arrayproductos = result.data;
    })
    fetch(PRODUCT_INFO_URL)
        .then(respuesta => respuesta.json())

        .then(datos => {
            document.getElementById("productInfoContainer").innerHTML = `<div class="text-center p-4">
        <h2>${datos.name}</h2></div>
        <p style="text-align:justify;">${datos.description}</p>
        <p style="text-align:center;font-weight:bold;">${datos.currency} ${datos.cost}</p>
        <div style="margin:0 auto;width:90%;"><img src="${datos.images[0]}" width="220px"></img>
        <img src="${datos.images[1]}" width="220px"></img>
        <img src="${datos.images[2]}" width="220px"></img>
        <img src="${datos.images[3]}" width="220px"></img></div>
       <hr>`;
            datos.relatedProducts.forEach(element => {
                document.getElementById("productosRelacionados").innerHTML += `
                <div class="card" style="max-width: 200px !important;">
                <img src="${arrayproductos[element -1].imgSrc}" class="card-img-top" alt="Imagen del auto ${arrayproductos[(element) -1].name} ">
                <div class="card-body">
                  <h6 class="card-title">${arrayproductos[(element) -1].name}</h5>
                  <a href="#" class="btn btn-secondary btn-lg btn-block" style="font-size:12px">Visitar artículo.</a></p>
                </div>
              </div>       `
            });



        });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        showComments(result.data);
    });

});