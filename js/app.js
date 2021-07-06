//Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor para los resultados
const resultado = document.querySelector("#resultado");

/* para sacar el año */
const max = new Date ().getFullYear();
/* console.log(max) */
const min = max - 11



//Generar un objeto con la busqueda
const datosBusqueda = {
    marca:"",
    year:"",
    minimo:"",
    maximo:"",
    puertas:"",
    transmision:"",
    color:"",
}

//Eventos
document.addEventListener("DOMContentLoaded", ()=> {
    mostrarAutos(autos); //muestra los autos al cargar

    //llena las opciones de años
    llenarSelect()
})

/////Event Listener para los select de busqueda////
//el "change" es el evento cuando cambia el campo del select

marca.addEventListener("change", e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();

}); 

year.addEventListener("change", e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();


});

minimo.addEventListener("change", e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();

});

maximo.addEventListener("change", e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();

});

puertas.addEventListener("change", e => {
    datosBusqueda.puertas = parseInt ( e.target.value ); //para convertir el string en number

    filtrarAuto();

});

transmision.addEventListener("change", e => {
    datosBusqueda.transmision = e.target.value;
    
    filtrarAuto();

});

color.addEventListener("change", e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();

    console.log(datosBusqueda)
});


//Funciones
function mostrarAutos(autos){
    limpiarHTML(); //Elimina el HTML previo

    autos.forEach ( auto =>{

        const { marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement("p")
        autoHTML.textContent =  `
        ${marca}  ${modelo} - ${year} - ${puertas} puertas -Transmisión: ${transmision}
        - Precio: ${precio} - color ${color}
        `;

        //insertar en el html
        resultado.appendChild(autoHTML)
    })

}

//limpiar HTML
function limpiarHTML(){
    //mientras haya algo
    while(resultado.firstChild){
        //vamos limpiando y despues arriba en mostrar autos va iterando y mostrando
        resultado.removeChild(resultado.firstChild)
    }
}

//Genera los años del select
function llenarSelect(){
    for ( let i = max; i>= min; i--){
        const opcion = document.createElement("option");
        opcion.value= i;
        opcion.textContent = i;
        year.appendChild(opcion) //Agrega las opciones del año al select
    }
   

}

//Funcion que filtra en base a la busqueda
//funciones de alto nivel, toman como parametro otra funcion
function filtrarAuto(){
    console.log("filtrando..")
    //soportan chaining o encadenamiento

    const resultado = autos.filter( filtrarMarca ). filter( filtrarYear ). filter( filtrarMinimo ).filter ( filtrarMaximo)
.filter ( filtrarPuertas ) .filter ( filtrarTrasmision) .filter (filtrarColor)
    
    console.log(resultado);

    //funcion de mostrar autos arriba definida

    if ( resultado.length ){
        mostrarAutos(resultado);
    } else {
        noResultado();
    }

}

function noResultado (){
    limpiarHTML ();

    //genero div con texto 
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent ="No hay resultados, intenta otros terminos de busqueda";
    resultado.appendChild(noResultado)

}
//estas funciones las voy a usar en el filter de filtrarAuto


function filtrarMarca(auto){
    //saco la marca de datosbusqueda, si existe el valor filtro, si no traigo todos
    const { marca } = datosBusqueda
    if( marca ){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const { year } = datosBusqueda;

    //en los forms casi siempre los numeros vienen como string
    /* console.log( typeof year)
    console.log( typeof auto.year ) */

    if( year ){
        return auto.year === parseInt(year); //convertirlo en numero podemos ponerlo aca o arriba en el event
    }
    return auto;

}

function filtrarMinimo (auto){
    const { minimo } = datosBusqueda;

    if (minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo (auto){
    const { maximo } = datosBusqueda;

    if (maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas (auto) {
    const { puertas } = datosBusqueda;

    if (puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTrasmision (auto) {
    const { transmision } = datosBusqueda;

    if (transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor (auto) {
    const { color } = datosBusqueda;

    if (color){
        return auto.color === color;
    }
    return auto;
}
