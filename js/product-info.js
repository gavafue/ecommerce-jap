//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var arrayproductos

// Funcion para añadir un nuevo comentario.


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
//Funcion que recibe array de donde mostrar comentarios
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
   //LLamado a Json de array de productos para poder usar datos en los relacionados
    getJSONData(PRODUCTS_URL).then(function (result) {
arrayproductos = result.data;
    })

    //Llamado a la información específica de un producto
    fetch(PRODUCT_INFO_URL)
        .then(respuesta => respuesta.json())

        .then(datos => {

            // Muestra datos en #productInfoContainer
            document.getElementById("productInfoContainer").innerHTML = `<div class="text-center p-4">
        <h2>${datos.name}</h2></div>
        <p style="text-align:justify;">${datos.description}</p>
        <p style="text-align:center;font-weight:bold;">${datos.currency} ${datos.cost}</p>
        <div class="col-9" style="margin:0 auto;">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        
   <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${datos.images[1]}" class="d-block w-100" alt="Primera imagen de ${datos.name}">
          </div>
          <div class="carousel-item">
            <img src="${datos.images[2]}" class="d-block w-100" alt="Segunda imagen de ${datos.name}">
          </div>
          <div class="carousel-item">
            <img src="${datos.images[3]}" class="d-block w-100" alt="Tercera imagen de ${datos.name}">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previo</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Siguiente</span>
        </a>
      </div></div>
       <hr>`;

// Recorro el arreglo "relatedProduct" del arreglo "datos" y con los valores que me devuelve(indices)
//busco informacion en el arreglo "arrayproducts"
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
//Llama a Json de Comentarios y aplica función showComments()
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        showComments(result.data);
    });

});