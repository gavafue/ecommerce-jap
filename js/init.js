const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_2_CURRENCY = "https://gavafue.github.io/ecommerce-jap/Json/carritoampliado.json";

function eliminarstorage() {
  localStorage.removeItem("datos_usuario");
}
var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

function redireccionar(url) {
  window.location = url;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


});

function guardarDatos() {

  //Creo un objeto que contega los datos a guardar:

  let datos_usuario = {
    email: document.getElementById("email-login").value,
    avatar: "https://via.placeholder.com/90x95/09f/fff.png"
  };

  //Como necesito tener un string, en lugar de un objeto para guardarlo en localStorage, lo transformaré a JSON
  //Lo hago utilizando el método stringify() del objeto JSON, que recibe un objeto y lo devuelve como JSON:
  let datos_usuario_json = JSON.stringify(datos_usuario);

  //Por último, utilizo el método setItem() del objeto localStorage para almacenar el JSON a nivel local
  //Recibe 2 parametros: el primero será un string con el nombre que le pondremos al objeto (key)
  //y el segundo será el contenido. En este caso, en formato json.
  localStorage.setItem("datos_usuario", datos_usuario_json);
}

//Primero verifico si hay algo guardado con ese nombre
if (localStorage.getItem("datos_usuario")) {

  //.getItem() recibe por parametro el nombre (key) de un ítem y devuelve su contenido:
  datos_usuario_json = localStorage.getItem("datos_usuario");

  //Como lo que me devuelve es el json que guardé, lo transformo a objeto con .parse():
  datos_usuario = JSON.parse(datos_usuario_json);

  //Ya tengo el objeto, y lo muestro en pantalla con DOM:
  document.getElementById("saludobienvenida").innerHTML = "Bienvenido/a: " + datos_usuario.email;
  //mostrar avatar
  document.getElementById("avatarseleccionado").innerHTML = `<img src="${datos_usuario.avatar}" width=90>`;
}