class AutomataFinito {
    constructor(estados, entradas, estadoInicial) {
        this.estados = estados;
        this.entradas = entradas;
    }
}
class Trancision {
    constructor(nombre, estados, aceptacion) {
        this.nombre = nombre;
        this.estado = estados;
        this.aceptacion = aceptacion;
    }
}
const transicionesA = new Trancision("A", [["A", "0"],["B", "1"]], true );
const transicionesB = new Trancision("B", [["C", "0"],["A", "1"]], false );
const transicionesC = new Trancision("C", [["B", "0"],["C", "1"]], false );
const transicionesD = new Trancision("D", [["D", "0"],["D", "1"]], true );
export const AF = new AutomataFinito("A", [transicionesA, transicionesB, transicionesC,transicionesD], ["0", "1"] );
