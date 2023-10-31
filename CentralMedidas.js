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
}

    central = new CentralMedidas();
central.insertaMedidas("Santander",[5, -6, -10, 40, 31, 1, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6, 10, 40, 31, -1, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6]);
central.insertaMedidas("Oviedo", [5, -6, 10, 40, 31, 1, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6, 10, 40, 31, -1, 23, 12, 14, 23, 40, 10, 29, 34, 5, 6]);
central.insertaAleatorio("Madrid");

console.log("Temperatura media en Santander:", central.mediaMedidas("Santander"));
console.log("Temperatura media en Madrid:", central.mediaMedidas("Madrid"));
console.log("Temperatura media total:", central.mediaMedidasTotal());
console.log("Eliminar Madrid:", central.eliminaCiudad("Madrid"));
console.log( central.medidas);




