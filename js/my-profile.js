//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //Autorellando campos perfil
    document.getElementById("emailProfile").value = datos_usuario.email;
    if (datos_usuario.nombre) {
        document.getElementById("nameProfile").value = datos_usuario.nombre;
    }
    if (datos_usuario.apellido) {
        document.getElementById("surnameProfile").value = datos_usuario.apellido;
    }
    if (datos_usuario.telefono) {
        document.getElementById("contactProfile").value = datos_usuario.telefono;
    }
    if (datos_usuario.edad) {
        document.getElementById("ageProfile").value = datos_usuario.edad;
    }
    document.getElementById("avatarseleccionado").innerHTML = `<img src="${datos_usuario.avatar}" width=90>`;
});



function probando() {
    var avatarimg
    var avatar = document.getElementsByName('avatarselect');
    for (i = 0; i < avatar.length; i++) {
        if (avatar[i].checked) {

            if (avatar[i].value == "option1") {
                avatarimg = "img/avatar1.png";
            }
            if (avatar[i].value == "option2") {
                avatarimg = "img/avatar2.png";
            }
            if (avatar[i].value == "option3") {
                avatarimg = "img/avatar3.png";
            }
            if (avatar[i].value == "option4") {
                avatarimg = "img/avatar4.png";
            }
        }
    }


    datos_usuario.nombre = document.getElementById("nameProfile").value;
    datos_usuario.email = document.getElementById("emailProfile").value;
    datos_usuario.apellido = document.getElementById("surnameProfile").value;
    datos_usuario.telefono = document.getElementById("contactProfile").value;
    datos_usuario.edad = document.getElementById("ageProfile").value;
    if(avatarimg !=null & avatarimg !=""){ datos_usuario.avatar = avatarimg;}

    localStorage.setItem("datos_usuario", JSON.stringify(datos_usuario));

}