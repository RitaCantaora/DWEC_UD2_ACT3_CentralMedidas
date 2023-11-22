class CentralMedidas {

    medidas = [];

    insertaMedidas(ciudad, valores) {
        this.medidas.push(new Array(31));
        this.medidas[this.medidas.length - 1][0] = ciudad;
        for (var i = 0; i < valores.length; i++) {
            this.medidas[this.medidas.length - 1][i + 1] = valores[i];

        }
    }

    insertaAleatorio(ciudad) {
        this.medidas.push(new Array(31));
        this.medidas[this.medidas.length - 1][0] = ciudad;
        for (var i = 0; i < 30; i++) {
            this.medidas[this.medidas.length - 1][i + 1] = (Math.floor(Math.random() * 51) - 10);

        }
    }

    mediaMedidas(ciudad) {
        for (var i = 0; i < this.medidas.length; i++) {
            if (this.medidas[i][0] == ciudad) {
                var total = 0;
                for (var j = 1; j < this.medidas[i].length; j++) {
                    total += this.medidas[i][j];
                }

            }
        }
        return total / 30
    }

    mediaMedidasTotal() {

        var sumaTotal = 0;
        var numCiudades = this.medidas.length;

        for (var i = 0; i < this.medidas.length; i++) {
            for (var j = 1; j < this.medidas[i].length; j++) {
                sumaTotal += this.medidas[i][j];
            }
        }

        return Math.round(sumaTotal / (30 * numCiudades));
    }

    eliminaCiudad(ciudad) {
        var pos = 0;
        for (var i = 0; i < this.medidas.length; i++) {
            if (this.medidas[i][0] == ciudad) {
                this.medidas.splice(pos, 1);
                return true;
            }

        }
        return false;
    }

    existeCiudad(ciudad) {
        for (var i = 0; i < this.medidas.length; i++) {
            if (this.medidas[i][0].toUpperCase() == ciudad.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    temperaturaMediaTodasCiudades() {
        let sumaTotal = 0;
        let totalMediciones = 0;

        for (let i = 0; i < this.medidas.length; i++) {
            for (let j = 1; j < this.medidas[i].length; j++) {
                sumaTotal += this.medidas[i][j];
                totalMediciones++;
            }
           
        }

        return sumaTotal / totalMediciones; 
    }


     borrarCiudad(ciudad) {
        for (let i = 0; i < this.medidas.length; i++) {
            if (this.medidas[i][0].toUpperCase() == ciudad.toUpperCase()) {
                this.medidas.splice(i, 1); 
                return true;
            }
           
        }
        return false; 
    }
}

central = new CentralMedidas();
central.insertaMedidas("Santander", [5, 6, -10, 40, 31, 14, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6, 10, 40, 31, -1, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6]);
central.insertaMedidas("Oviedo", [5, -6, 10, 40, 31, 1, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6, 10, 40, 31, -1, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6]);
central.insertaAleatorio("Madrid");

console.log("Temperatura media en Santander:", central.mediaMedidas("Santander"));
console.log("Temperatura media en Madrid:", central.mediaMedidas("Madrid"));
console.log("Temperatura media total:", central.mediaMedidasTotal());
console.log("Eliminar Madrid:", central.eliminaCiudad("Madrid"));
console.table(central.medidas);

function generaTablaHTML() {
    let htmlTable = '<table border="1"><thead>' +
    '<tr>' +
    '<th>Ciudad</th>' +
    '<th colspan="' + (central.medidas[0].length-1) + '">Temperaturas</th>' +'<th>Media</th>' +
    '</tr>'+ 
    '</thead>' +
    '<tbody>' +
    '<tr>' +
    '</tr>';

    for (var i = 0; i < central.medidas.length; i++) {
        htmlTable += '<tr>';
        htmlTable += '<td>' + central.medidas[i][0] + '</td>';
        let sum = 0;
        for (var j = 1; j < central.medidas[i].length; j++) {
            htmlTable += '<td>' + central.medidas[i][j] + '</td>';
            sum += central.medidas[i][j];
        }
       
        htmlTable += '<td>' +(sum/central.medidas[i].length-1).toFixed(2) + '</td>';
        htmlTable += '</tr>';
    }

    htmlTable += '</tbody>' +
        '</table>';

    let divTabla = document.getElementById('tabla');
    divTabla.innerHTML = htmlTable;

    const tempMedia = document.getElementById('temperatura-media');
    const valor = central.temperaturaMediaTodasCiudades();
    tempMedia.innerHTML = 'Temperatura media ' + valor;
}

window.addEventListener('load', generaTablaHTML);

function insertaMedidas() {
      
  var ciudad = document.getElementById("ciudad").value;
  var medida = document.getElementById("medidas").value;
  var medidas = medida.split(',').map(Number);
}

function convertirAMayusculas() {
    

    const inputCiudad = document.getElementById('ciudad');
    var ciudad = inputCiudad.value.toUpperCase(); 
    
    const inputManual = document.getElementById('manual');
    if (inputManual.checked){
        const inputMedia = document.getElementById('media');
        var medidas = inputMedia.value;
        var mediaMedidas=medidas.split(',')
    
        central.insertaMedidas(ciudad, mediaMedidas);
    }
    else {
        //  generar de manera automatica  
        central.insertaAleatorio(ciudad)
    }
    
    generaTablaHTML();


}   

function boton (){
    const inputMedia = document.getElementById('media');
    const inputManual = document.getElementById('manual');
    if(inputManual.checked) {
        inputMedia.disabled = false;
    }
    else {
        inputMedia.disabled = true;
        inputMedia.value = '';
    }
}
     function botonGuardar(){
       
        const inputCiudad = document.getElementById("ciudad");
        var ciudad = inputCiudad.value.toUpperCase(); 
        
       
        if(central.existeCiudad(ciudad)==true){

            let mensajeError = document.getElementById('errorCiudadExiste');
            mensajeError.style.display = 'block';
        
        }
else{
        const inputManual = document.getElementById('manual');
    if (inputManual.checked){
        const inputMedia = document.getElementById('media');

        
        var medidas = inputMedia.value;
        var mediaMedidas=medidas.split(',')
        if(mediaMedidas.length==30 ) {

    
            central.insertaMedidas(ciudad, mediaMedidas);
        }
        else{

            let mensajeError = document.getElementById('errorMedida');
            mensajeError.style.display = 'block'; 
        }
    }


     else {
        //  generar de manera automatica  
        central.insertaAleatorio(ciudad)
    }

       
     generaTablaHTML();

        }
    }

function botonBorrar() {
    const inputCiudad = document.getElementById('ciudad').value.toUpperCase();
    if (central.borrarCiudad(inputCiudad)) {
       
    } else {
       
        let mensajeError = document.getElementById('errorCiudad');
        mensajeError.style.display = 'block';

        generaTablaHTML();
    } 
 
}
      
      