//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //Autorellando campos perfil
 document.getElementById("emailProfile").value = datos_usuario.email;
 document.getElementById("nameProfile").value = datos_usuario.nombre;
 document.getElementById("surnameProfile").value = datos_usuario.apellido;
 document.getElementById("contactProfile").value = datos_usuario.telefono;
 document.getElementById("avatarseleccionado").innerHTML = `<img src="${datos_usuario.avatar}" width=90>`;
});



function probando() {
    var avatarimg
    var avatar = document.getElementsByName('avatarselect');
    for (i = 0; i < avatar.length; i++) {
        if (avatar[i].checked) {

            if (avatar[i].value == "option1") {
                avatarimg = "/img/avatars/1.png";
            }
            if (avatar[i].value == "option2") {
                avatarimg = "/img/avatars/2.png";
            }
            if (avatar[i].value == "option3") {
                avatarimg = "/img/avatars/3.png";
            }
            if (avatar[i].value == "option4") {
                avatarimg = "/img/avatars/4.png";
            }
        }
    }
    
    let datos_usuario_2 = {
        nombre: document.getElementById("nameProfile").value,
        email: document.getElementById("emailProfile").value,
        apellido: document.getElementById("surnameProfile").value,
        telefono: document.getElementById("contactProfile").value,
        avatar: avatarimg
    };

    localStorage.setItem("datos_usuario", JSON.stringify(datos_usuario_2));

}
