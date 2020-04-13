function validarParentesis(exp){
    let cantidad = 0;
    for (let i=0; i<exp.length; i++){
        let token = exp[i];
        
        if ( token === '(' ) cantidad++;
        if ( token === ')' ) cantidad--;
    }
    if (cantidad > 0){
        return false;
    } else if (cantidad < 0) {
        return false
    }
    return true
}
function insertarOperadorExplicitoConcatenacion(exp) {
    let output = '';

    for (let i = 0; i < exp.length; i++) {
        const token = exp[i];
        output += token;

        if (token === '(' || token === '|') {
            continue;
        }

        if (i < exp.length - 1) {
            const lookahead = exp[i+1];

            if(lookahead === '*' || lookahead === '|' || lookahead === ')' || lookahead === '+') {
                continue;
            }

            output += '.';
        }
    }

    return output;
} 
function peek(stack) {
    return stack.length && stack[stack.length - 1];
}

const precedenciaDeOperador = {
    '|': 0,
    '.': 1,
    '*': 2,
    '+': 2,
}

function aPosfijo(exp) {
    let output = '';
    const operatorStack = [];

    for (const token of exp) {
        if (token === '.' || token === '|' || token === '*' || token === '+') {
            while(operatorStack.length && peek(operatorStack) !== '('
                  && precedenciaDeOperador[peek(operatorStack)] >= precedenciaDeOperador[token]) {
                output += operatorStack.pop();
            }
            operatorStack.push(token);
        } else if (token === '(' || token === ')') {
            if(token === '(') {
                operatorStack.push(token);
            } else {
                while(peek(operatorStack) !== '(') {
                    output += operatorStack.pop();
                }
                operatorStack.pop();
            }
        } else {
            output += token;
        }
    }

    while(operatorStack.length) {
        output += operatorStack.pop();
    }

    return output;
}

function crearEstado(isEnd) {
    return {
        isEnd,
        transition: {},
        epsilonTransitions: []
    };
}

function addEpsilonTransition(from, to) {
    from.epsilonTransitions.push(to);
    //from.epsilonTransitions.push({hacia: to, simbolo:"λ"});
}

function addTransition(from, to, symbol) {
    //from.transition = {hacia: to, simbolo:symbol};
    from.transition[symbol] = to;
}

function fromEpsilon() {
    const start = crearEstado(false);
    const end = crearEstado(true);
    addEpsilonTransition(start, end);
    
    return { start, end };
}

function fromSymbol(symbol) {
    const start = crearEstado(false);
    const end = crearEstado(true);
    addTransition(start, end, symbol);

    return { start, end };
}

function concatenar(first, second) {
    addEpsilonTransition(first.end, second.start);
    first.end.isEnd = false;

    return { start: first.start, end: second.end };
}

function union(first, second) {
    const start = crearEstado(false);
    addEpsilonTransition(start, first.start);
    addEpsilonTransition(start, second.start);

    const preEnd = crearEstado(true);
    addEpsilonTransition(first.end, preEnd);
    first.end.isEnd = false;
    addEpsilonTransition(second.end, preEnd);
    second.end.isEnd = false;
    //
    //const end = crearEstado(true);
    //addEpsilonTransition(preEnd, end);
    //
    return { start, preEnd };
}

function clausura(nfa) {
    const start = crearEstado(false);
    const end = crearEstado(true);

    addEpsilonTransition(start, end);
    addEpsilonTransition(start, nfa.start);

    addEpsilonTransition(nfa.end, end);
    addEpsilonTransition(nfa.end, nfa.start);
    nfa.end.isEnd = false;

    return { start, end };
}

function clausuraSinNulo(nfa) {
    const start = crearEstado(false);
    const end = crearEstado(true);

    addEpsilonTransition(start, nfa.start);

    addEpsilonTransition(nfa.end, end);
    addEpsilonTransition(nfa.end, nfa.start);
    nfa.end.isEnd = false;

    return { start, end };
}

function toNFA(postfixExp) {
	if(postfixExp === '') {
	    return fromEpsilon();
	}
	
	const stack = [];
    
	for (const token of postfixExp) {
		if(token === '*') {
   		    stack.push(clausura(stack.pop()));
        }else if(token === '+'){
            stack.push(clausuraSinNulo(stack.pop()));
        }else if (token === '|') {
   		    const right = stack.pop();
   		    const left = stack.pop();
   		    stack.push(union(left, right));
   		} else if (token === '.') {
   		    const right = stack.pop();
   		    const left = stack.pop();
   		    stack.push(concatenar(left, right));
   		} else {
   		    stack.push(fromSymbol(token));
   		}
   	}
    
	return stack.pop();
}

function cierreLambdaDe(state, visited) {
    if (state.epsilonTransitions.length) {
        for (const st of state.epsilonTransitions) {
            if (!visited.find(vs => vs === st)) {
                visited.push(st);
                cierreLambdaDe(st, visited);
            }
        }
    }
}

function cierreLambdaSet(estado, visitedRecorrido, todos) {
    if (estado.epsilonTransitions.length) {
        for (const st of estado.epsilonTransitions) {
            if (!visitedRecorrido.find(vs => vs === st)) {
                visitedRecorrido.push(st);
                let visited = [].push(st);//Para cierre
                cierreLambdaDe(st, visited)
                todos.push(visited);
                visited = [];
                cierreLambdaSet(st, visitedRecorrido, todos);    
            }
        }
    } else {
        todos.push(estado);   
    }
}

function addNextState(state, nextStates, visited) {
    if (state.epsilonTransitions.length) {
        for (const st of state.epsilonTransitions) {
            if (!visited.find(vs => vs === st)) {
                visited.push(st);
                addNextState(st, nextStates, visited);
            }
        }
    } else {
        nextStates.push(state);
    }
}

function search(nfa, word) {
    let currentStates = [];
    addNextState(nfa.start, currentStates, []);

    for (const symbol of word) {
        const nextStates = [];

        for (const state of currentStates) {
            const nextState = state.transition[symbol];
            if (nextState) {
                addNextState(nextState, nextStates, []);
            }
        }
        currentStates = nextStates;
    }

    return currentStates.find(s => s.isEnd) ? true : false;
}

const valor = insertarOperadorExplicitoConcatenacion('1*');
//console.log(valor);
const valor2 = aPosfijo(valor);
//console.log(valor2);
const este = toNFA(valor2);

const todos = [];
cierreLambdaSet(este.start, [], todos );
console.log(todos);

//const cierreLambda = [];
//const visited = [];
//cierreLambdaDe(este.start, cierreLambda, visited)
//console.info(cierreLambda);
//console.info(visited);

//console.info(este.start.epsilonTransitions[0].transition);
//const estesi = este.start.epsilonTransitions[0].transition;

//console.log(Object.keys(estesi));
/*console.info(search(este, ""));*/

//const postfijo = aPosfijo('abc');
//const nfa = toNFA(postfijo);

module.exports = {
    validarParentesis,
    insertarOperadorExplicitoConcatenacion,
    aPosfijo,
    toNFA,
    search
};