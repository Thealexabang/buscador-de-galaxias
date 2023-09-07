const URL_busqueda = 'https://images-api.nasa.gov/search?q='
const inputBuscar = document.getElementById('inputBuscar');
const contenedor = document.getElementById('contenedor');

async function buscar(busqueda){
    try{
        const response = await fetch(URL_busqueda+busqueda);
        const nasa_data = await response.json();
        mostrar(nasa_data.collection.items);
    }catch(e){
        console.log(e);
    }
}

function mostrar(imagenes){
    contenedor.innerHTML='';
    let contenido = '';
    for(let i=0; i<(imagenes.length-4); i++){
        console.log(imagenes[i].data[0].description_508);
        if(imagenes[i].data[0].description_508){
            contenido+=`
            <div class='col'>
                <div class='card shadow-sm'>
                    <img class="bd-placeholder-img card-img-top" width="100%" height="225" src=${imagenes[i].links[0].href}>
                    <div class='card-body'>
                    <p class="card-text h4">${imagenes[i].data[0].title}</p>
                    <p class="card-text">${imagenes[i].data[0].description_508}</p>
                    <p class="card-text text-muted">${imagenes[i].data[0].date_created}</p>
                    </div>
                </div>
            </div>
            `
        }else{
            contenido+=`
            <div class='col'>
                <div class='card shadow-sm'>
                    <img class="bd-placeholder-img card-img-top" width="100%" height="225" src=${imagenes[i].links[0].href}>
                    <div class='card-body'>
                    <p class="card-text h4">${imagenes[i].data[0].title}</p>
                    <p class="card-text">${imagenes[i].data[0].description}</p>
                    <p class="card-text text-muted">${imagenes[i].data[0].date_created}</p>
                    </div>
                </div>
            </div>
            `
        }
        
    }
    contenedor.innerHTML=contenido;
}

document.getElementById('btnBuscar').addEventListener("click", ()=>{
    let busqueda = inputBuscar.value;
    buscar(busqueda);

});

