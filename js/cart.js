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
            document.getElementById("listacarrito").innerHTML +=`<tr>
            <th scope="row">${counter}</th>
            <td><img src="${element.src}"style="width:60px;"></td>
            <td>${element.name}</td>
            <td>${element.unitCost} ${element.currency}</td>
            <td><div class="input-group mb-3 mx-auto" style="width:30% !important;"><input type="Number" id="cantidad${[i]}" class="mx-auto form-control" placeholder="Cantidad" value="${element.count}" aria-label="Username" aria-describedby="addon-wrapping" min="0";></div></td>
            <td>${sub} ${element.currency}</td>
          </tr>  `;
        }




    });

});