class ExpresionRegularMinima {
  constructor(expresion) {
    this.ligaIzquierda = null;
    this.ligaDerecha = null;
    this.expresion = expresion;
  }
}

class ExpresionRegularCompleja {
  constructor(expresion) {
    this.cabeza = expresion;
  }
  preorden(raiz) {
    if (raiz != null) {
      console.info(raiz.expresion);
      this.preorden(raiz.ligaIzquierda);
      this.preorden(raiz.ligaDerecha);
    }
  }
  union(primero, segundo) {

  }
}
const expr = new ExpresionRegularCompleja("a+b");
console.info(expr.cabeza);
