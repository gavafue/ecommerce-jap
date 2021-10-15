//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var listadocarrito
let counter = 0;

function compraCorrecta() {
  let mediopago = document.getElementById("inlineFormCustomSelect");
  if (mediopago.options[mediopago.selectedIndex].value == 0) {
    alert("¡Selecciona el medio de pago antes de continuar!");

  } else {
    let nombre = JSON.parse(mis_datos_json).nombre;
    document.getElementById("exampleModalCenterTitle").innerHTML = "¡Felicitaciones " + nombre + "!";
    document.getElementById("contenidoAlertacompra").innerHTML = `¡Haz realizado una combra satisfactoriamente por el valor de <b>${document.getElementById("preciototal").innerHTML} UYU </b> los cuales se han abonado con el medio de pago: <b>${mediopago.options[mediopago.selectedIndex].text}</b>. Recuerda que cuentas con <b>2 días hábiles</b> para poder realizar reclamos de facturación.`;
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
  let preciototal = totalUYU + (totalUSD * 40)
  document.getElementById("totaluyu").innerHTML = totalUYU;
  document.getElementById("totalusd").innerHTML = totalUSD;
  document.getElementById("preciototal").innerHTML = preciototal;
}

function modificarSubtotal(preciounit, i) {
  let cantidad = parseInt(document.getElementById(`cantidad${i}`).value)
  let subtotal = preciounit * cantidad;
  document.getElementById(`subtotal${i}`).innerHTML = subtotal;
  calcTotal()
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
      document.getElementById("listacarrito").innerHTML += `<tr>
            <th scope="row">${counter}</th>
            <td><img src="${element.src}"style="width:60px;"></td>
            <td>${element.name}</td>
            <td>${element.unitCost} ${element.currency}</td>
            <td>
            <div class="input-group mb-3 mx-auto" style="width:30% !important;"><input type="Number" id="cantidad${[i]}" onchange="modificarSubtotal(${element.unitCost},${i})" class="mx-auto form-control" placeholder="Cantidad" value="${element.count}" aria-label="Username" aria-describedby="addon-wrapping" min="0";></div></td>
            <td><div class="row"><div class="col subtotal" id="subtotal${[i]}">${sub}</div><div class="col">${element.currency}</div></div></td>
          </tr>  `;
      calcTotal();
    }
  });

});