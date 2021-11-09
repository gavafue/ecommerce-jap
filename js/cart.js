//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var listadocarrito
let counter = 0;



function validaciones() {
  let elementosEnvio = document.getElementsByClassName("campos-form-envio");
  let elementosTarjeta = document.getElementsByClassName("campos-tarjeta-debito");
  let elementosBanco = document.getElementsByClassName("campos-cuenta-bancaria");
  let msg = "";
  let flag = true;

  /* Que los campos del formulario de envío no estén vacíos*/
  let cuentoEnvio = 0
  for (let i = 0; i < elementosEnvio.length; i++) {
    const element = elementosEnvio[i];
    if (element.value == "") {
      cuentoEnvio += 1;
    }
  }
  if (cuentoEnvio > 0) {
    flag = false;
    msg += "- No pueden haber campos vacíos en el formulario de envío <br>"
  }

  let mediopago = document.getElementById("selectorFormaPago");
  if (mediopago.options[mediopago.selectedIndex].value == 1) {
    /* Que los campos del formulario de Tarjeta de credito no estén vacíos*/
    let cuentoTarjeta = 0;
    for (let i = 0; i < elementosTarjeta.length; i++) {
      const element = elementosTarjeta[i];
      if (element.value == "") {
        cuentoTarjeta += 1;
      }
    }
    if (cuentoTarjeta > 0) {
      flag = false;
      msg += "- No pueden haber campos vacíos en el formulario de método de pago. <br>"
    }
  }
  if (mediopago.options[mediopago.selectedIndex].value == (2)) {
    /*Que los elementos del formulario banco no esten vacios */
    let cuentoBanco = 0;
    for (let i = 0; i < elementosBanco.length; i++) {
      const element = elementosBanco[i];
      if (element.value == "") {
        cuentoBanco += 1;
      }
    }
    if (cuentoBanco > 0) {
      flag = false;
      msg += "- No pueden haber campos vacíos en el formulario de método de pago. <br>"
    }
  }
  document.getElementById("feedback").classList.remove('d-none');
  document.getElementById("feedback").innerHTML = msg;
  return flag;
}



function formpago() {
  let mediopago = document.getElementById("selectorFormaPago");
  if (mediopago.options[mediopago.selectedIndex].value == 1) {
    document.getElementById("formcuentabancaria").classList.add('d-none');
    document.getElementById("formtarjeta").classList.remove('d-none');
  }
  if (mediopago.options[mediopago.selectedIndex].value == (2)) {
    document.getElementById("formtarjeta").classList.add('d-none');
    document.getElementById("formcuentabancaria").classList.remove('d-none');
  }
}





function calcTotal() {
  let totalUYU = 0;
  let totalUSD = 0;
  let subs = document.getElementsByClassName("subtotal");
  for (let i = 0; i < subs.length; i++) {
    if (listadocarrito[i].currency == "UYU") {
      totalUYU += parseInt(subs[i].innerHTML);
    } else {
      totalUSD += parseInt(subs[i].innerHTML);
    }
  }

  let tipoenvio
  var envio = document.getElementsByName('radioEnvio');
  for (i = 0; i < envio.length; i++) {
    if (envio[i].checked) {
      if (envio[i].value == "premium") {
        tipoenvio = 0.15;
      }
      if (envio[i].value == "express") {
        tipoenvio = 0.07;
      }
      if (envio[i].value == "standard") {
        tipoenvio = 0.05;
      }
    }
  }

  let totalcompra = totalUYU + (totalUSD * 40);
  let costenvio = Math.round(totalcompra * tipoenvio)
  let preciototal = totalcompra + costenvio;

  document.getElementById("costoenvio").innerHTML = costenvio;
  document.getElementById("totaluyu").innerHTML = totalUYU;
  document.getElementById("totalusd").innerHTML = totalUSD;
  document.getElementById("preciototal").innerHTML = preciototal;
}

function modificarSubtotal(preciounit, i) {
  let cantidad = parseInt(document.getElementById(`cantidad${i}`).value)
  let subtotal = preciounit * cantidad;
  document.getElementById(`subtotal${i}`).innerHTML = subtotal;
  calcTotal()
  calcEnvio()
}



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_2_CURRENCY).then(function (result) {
    if (result.status === "ok") {
      listadocarrito = result.data.articles;
    }

    for (let i = 0; i < listadocarrito.length; i++) {
      let element = listadocarrito[i];
      let sub = element.unitCost * element.count
      counter++;
      document.getElementById("listacarrito").innerHTML += `<tr id="item${[i]}">
            <th scope="row"></th>
            <td>${counter}</td>
            <td><img src="${element.src}"style="width:60px;"></td>
            <td>${element.name}</td>
            <td>${element.unitCost} ${element.currency}</td>
            <td>
            <div class="input-group mb-3 mx-auto" "><input type="Number" id="cantidad${[i]}" onchange="modificarSubtotal(${element.unitCost},${i})" class="mx-auto form-control" placeholder="Cantidad" value="${element.count}" aria-label="Username" aria-describedby="addon-wrapping" min="1";></div></td>
            <td><div class="row"><div class="col subtotal" id="subtotal${[i]}">${sub}</div><div class="col">${element.currency}</div></div></td>
            <td style="cursor:pointer;color:red !important;" onclick="eliminar(${[i]})">✘</td>
          </tr>  `;
      calcTotal();
    }
  });
});

function eliminar(i) {
  if (listadocarrito.length < 1) {
    document.getElementById("columnalistacarrito").innerHTML = `<div class="alert alert-warning" role="alert">
    <h4 class="alert-heading">¡El carrito está vacío!</h4>
    <hr>
    <p>En este momento cuentas con el carrito de compras vacío. ¡Añade un artículo navegando por nuestro sitio!</p>
    
  </div>`
  } else {
    listadocarrito.splice(i, 1);
    document.getElementById(`item${i}`).remove();
    calcTotal();
  }
}