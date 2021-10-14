const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_2_CURRENCY = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function redireccionar(url){
  window.location = url;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});

function guardarDatos() {

  //Creo un objeto que contega los datos a guardar:
  localStorage.clear()
  let mis_datos = {
      nombre: document.getElementById("username").value  };

  //Como necesito tener un string, en lugar de un objeto para guardarlo en localStorage, lo transformaré a JSON
  //Lo hago utilizando el método stringify() del objeto JSON, que recibe un objeto y lo devuelve como JSON:
  let mis_datos_json = JSON.stringify(mis_datos);

  //Por último, utilizo el método setItem() del objeto localStorage para almacenar el JSON a nivel local
  //Recibe 2 parametros: el primero será un string con el nombre que le pondremos al objeto (key)
  //y el segundo será el contenido. En este caso, en formato json.
  localStorage.setItem("mis_datos", mis_datos_json);
}

function recuperarDatos() {

  //Primero verifico si hay algo guardado con ese nombre
  if (localStorage.getItem("mis_datos")) {

      //.getItem() recibe por parametro el nombre (key) de un ítem y devuelve su contenido:
      mis_datos_json = localStorage.getItem("mis_datos");

      //Como lo que me devuelve es el json que guardé, lo transformo a objeto con .parse():
      mis_datos = JSON.parse(mis_datos_json);

      //Ya tengo el objeto, y lo muestro en pantalla con DOM:
      document.getElementById("saludobienvenida").innerHTML = "Bienvenido/a: " + mis_datos.nombre;

  }else{
      document.getElementById("datos").innerHTML = "No hay datos almacenados";
  }

}
recuperarDatos()