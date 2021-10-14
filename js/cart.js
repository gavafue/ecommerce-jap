//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var listadocarrito
let counter = 0;

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
            <td><div class="input-group mb-3 mx-auto" style="width:30% !important;"><input type="Number" id="cantidad${[i]}" class="mx-auto form-control" placeholder="Cantidad" value="${element.count}" aria-label="Username" aria-describedby="addon-wrapping" min="0";></div></td>
            <td>${sub} ${element.currency}</td>
          </tr>  `;
        }


        document.getElementById("zonapago").innerHTML = `
       <div class="row"><div class="col"> <div class="table-responsive">
        <table class="table table-striped table-hover table-borderless table-sm table-dark ">
            <tbody>
                <tr>
                    <td class="col-8">Costo parcial UYU:</td>
                    <td class="col">Amet</td>
                </tr>
                <tr>

                    <td class="col-8">Costo parcial USD:</td>
                    <td class="col">Elit</td>

                </tr>
                <tr>

                    <td class="col-8">Total (UYU):</td>
                    <td class="col">Fugiat</td>
                </tr>
                
            </tbody>

        </table>
    </div>
</div>
<div class="col">
<form class="row mx-auto">
    <div class="form-row align-items-center mx-auto">
      <div class="col-auto my-1">
        <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
          <option selected>Seleccionar método de pago</option>
          <option value="1">Visa</option>
          <option value="2">Master</option>
          <option value="3">Transferencia</option>
        </select>
      </div>
      <div class="col-auto my-1">
        <div class="custom-control custom-checkbox mr-sm-2">
          <input type="checkbox" class="custom-control-input" id="customControlAutosizing">
          <label class="custom-control-label" for="customControlAutosizing">Recordar mi preferencia</label>
        </div>
      </div>
      <div class="col-auto my-1">
        <button type="submit" class="btn btn-info">Comprar</button>
      </div>
    </div>
  </form></div></div>`;
    });

});