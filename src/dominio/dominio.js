// Automatas
class AutomataFinito {
    constructor(estadoInicial, trancisiones, entradas) {
        this.estadoInicial = estadoInicial;
        this.trancisiones = trancisiones;
        this.entradas = entradas;        
    }
}
class Trancision {
    constructor(nombre, estados, aceptacion) {
        this.nombre = nombre;
        this.estados = estados;
        this.aceptacion = aceptacion;
    }
}
class Estado{
    constructor(nombre, entrada){
        this.nombre = nombre;
        this.entrada = entrada;
    }
}
const transicionesA = new Trancision("A", [new Estado("A", "0"),new Estado("B", "1")], true );
const transicionesB = new Trancision("B", [new Estado("C", "0"),new Estado("A", "1")], false );
const transicionesC = new Trancision("C", [new Estado("B", "0"),new Estado("C", "1")], false );
const transicionesD = new Trancision("D", [new Estado("D", "0"),new Estado("D", "1")], true );

const automata = new AutomataFinito("A", [transicionesA, transicionesB, transicionesC,transicionesD], ["0","1"] );
const automataVacio = new AutomataFinito("A", [], [] );
export default automataVacio;

//Expresion Regular


