var boton = document.getElementById("btnSubmit");
var btnGenero = document.getElementById("btnGenero");
var btnNacionalidad = document.getElementById("btnNacionalidad");
var btnLimpiar = document.getElementById("btnLimpiar");
var btnHome = document.getElementById("btnHome");
const URL = "https://jsonplaceholder.typicode.com/users";
const URLgenero = "https://api.genderize.io/?name=";
const URLnacionalidad = "https://api.nationalize.io/?name=";
const URLnombreNacionalidad = 'https://restcountries.com/v3.1/alpha/';
var peticionHttp ;


//funciones de los botones

boton.addEventListener("click", function(e)
{
   e.preventDefault();

   Ajax();
   realizarPeticionHttpAsync(URL, "GET", funcActuadora);

}
);

btnGenero.addEventListener("click", function(){

    var nombreElegido = document.getElementById("nameUser").value;
    console.log
    verGenero(URLgenero + nombreElegido, "GET", funcGenero);
}
);

btnNacionalidad.addEventListener("click", function(){

    var nombreElegido = document.getElementById("nameUser").value;
    console.log(nombreElegido);
    verNacionalidad(URLnacionalidad + nombreElegido, "GET", funcNacionalidad);
}
);

btnHome.addEventListener("click",function(){
    volverInicio();
});

btnLimpiar.addEventListener("click", function(){
    limpiarCampos();
});

function Ajax() {

    if(window.XMLHttpRequest){
        peticionHttp = new XMLHttpRequest();
    }
    else 
    {
        peticionHttp = new ActiveXObject();
    }
}


//Funciones para ver nacionalidad

function verNacionalidad(URLnacionalidad, metodo, funcNacionalidad)
{
    peticionHttp.onreadystatechange = funcNacionalidad;

    peticionHttp.open(metodo, URLnacionalidad, true);
    peticionHttp.send(null);
}

function funcNacionalidad()
{
    console.log("status en nacionalidad:" + peticionHttp.readyState);

    if(peticionHttp.readyState ==4)
    {
        if(peticionHttp.status ==200)
        {

            var nombreNacionalidad = JSON.parse(peticionHttp.responseText);

            var paisDelNombre = nombreNacionalidad.country[0];

            var isoPais = paisDelNombre.country_id;

            verNombreIso(URLnombreNacionalidad + isoPais, "GET", nombreDeISO);

        }
        else if(peticionHttp.status==404)
        {
            document.write("no se encontro el archivo");
        }
    }


//funciones para comparar la ISO del pais con otra API y conocer el nombre completo del pais

function verNombreIso(URLnombreNacionalidad, metodo, nombreDeIso)
{
    peticionHttp.onreadystatechange = nombreDeISO;

    peticionHttp.open(metodo, URLnombreNacionalidad, true);
    peticionHttp.send(null);
}


}
function nombreDeISO() {
    console.log("status nombre de nacionalidad : " + peticionHttp.readyState);

    if(peticionHttp.readyState==4)
    {
        if(peticionHttp.status == 200)
        {

            var divNacionalidad = document.getElementById("avisoNacionalidad");
            var nombrePais = JSON.parse(peticionHttp.responseText);
            console.log(nombrePais[0].name.common);
            divNacionalidad.textContent = "Hay mas probabilidades de que el nombre sea de: " + nombrePais[0].name.common;
        }
        else
        if(peticionHttp.status == 404)
        {
            document.write("archivo no encontrado");
        }
    }
}



//Funciones par ver el genero

function verGenero(URLgenero, metodo, funcGenero){

    peticionHttp.onreadystatechange = funcGenero;

    peticionHttp.open(metodo, URLgenero, true);
    peticionHttp.send(null);
}

function funcGenero(){
    console.log("status en genero:" + peticionHttp.readyState);

    if(peticionHttp.readyState == 4){
        if(peticionHttp.status == 200){
            var nombreElegido = JSON.parse(peticionHttp.responseText);
            if(nombreElegido.gender == "male")
            {
                var iconoGenero = document.getElementById("iconGenero");
                iconoGenero.innerHTML = '<i id="iconMasculino" class="fa-solid fa-person"></i>';
                nombreElegido.gender = "Masculino  ";
            }
            else{
                var iconoGenero = document.getElementById("iconGenero");
                iconoGenero.innerHTML = '<i id="iconFemenino" class="fa-solid fa-person-dress"></i>'
                nombreElegido.gender = "Femenino  ";
            }

            var divGenero = document.getElementById("avisoGenero");
            divGenero.textContent = "El genero es " + nombreElegido.gender;

            console.log("genero " + nombreElegido.gender);
        }

        else
    if(peticionHttp.status == 404)
        {
            alert("no se encontro el archivo");
        }
    }

}


//Funciones para corroborar el Login

function realizarPeticionHttpAsync(URL, metodo, funcionActuadora) {
    peticionHttp.onreadystatechange = funcionActuadora;

    peticionHttp.open(metodo, URL, true);
    peticionHttp.send(null);
}




function funcActuadora() {
    console.log("status:" + peticionHttp.readyState);

    const idUser = document.getElementById("idUser").value;
    const passUser = document.getElementById("password").value;


    if (peticionHttp.readyState == 4) {
        if (peticionHttp.status == 200) 
            {
            var response = JSON.parse(peticionHttp.responseText);

            for(var i = 0 ; response.length > i; i++){

                console.log("" + i);
                if(response[i].email == idUser){
                    var errorUser = document.getElementById("errorUser");
                    errorUser.textContent = "";
                    if(response[i].address.geo.lat == passUser)
                    {
                        console.log("usuario y contraseña correcta");
                        cambiarDePantalla(idUser, passUser,response[i]);
                        break;
                    }
                    else{
                        var errorPass = document.getElementById("errorPass");
                        errorPass.textContent = "Contraseña incorrecta"
                        break;
                    }
                }
                else{
                    var errorUser = document.getElementById("errorUser");
                    errorUser.textContent = "Usuario no encontrado"
                }

            };
            } 
            else 
            if (peticionHttp.status == 404) 
            {
                
            alert("no se encontro el archivo");
            }
    }
}

//funcion para cambiar de pantalla

function cambiarDePantalla(idUser, passUser, item){

    var div = document.getElementById("inicio");
    var divLogin = document.getElementById("login");
    var h3bienvenida = document.getElementById("h3Bienvenida");

    h3bienvenida.textContent = "Bienvenid@ " + item.username;
    if (item.email == idUser && item.address.geo.lat == passUser) {
        div.classList.add('show');
        divLogin.classList.add('hidde');
    }
    else {
        div.classList.remove('show');
        divLogin.classList.remove('hidde')
    }          
}

//funcion para volver al inicio

function volverInicio()
{
    window.location.href = 'index.html';
}

function limpiarCampos()
{
    var divGenero = document.getElementById("avisoGenero");
    divGenero.textContent ="";

    var iconoGenero = document.getElementById("iconGenero");
    iconoGenero.innerHTML = '';

    var divNacionalidad = document.getElementById("avisoNacionalidad");
    divNacionalidad.textContent = '';

    var nombreElegido = document.getElementById("nameUser").value;
    nombreElegido = '';
}