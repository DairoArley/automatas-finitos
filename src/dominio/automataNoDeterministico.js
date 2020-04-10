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

            if(lookahead === '*' || lookahead === '|' || lookahead === ')') {
                continue;
            }

            output += '.';
        }
    }

    return output;
};

function peek(stack) {
    return stack.length && stack[stack.length - 1];
}

const operatorPrecedence = {
    '|': 0,
    '.': 1,
    '*': 2
}

function aPosfijo(exp) {
    let output = '';
    const operatorStack = [];

    for (const token of exp) {
        if (token === '.' || token === '|' || token === '*') {
            while(operatorStack.length && peek(operatorStack) !== '('
                  && operatorPrecedence[peek(operatorStack)] >= operatorPrecedence[token]) {
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

function createState(isEnd) {
    return {
        isEnd,
        transition: {},
        epsilonTransitions: []
    };
}

function addEpsilonTransition(from, to) {
    from.epsilonTransitions.push(to);
}

function addTransition(from, to, symbol) {
    from.transition[symbol] = to;
}

function fromEpsilon() {
    const start = createState(false);
    const end = createState(true);
    addEpsilonTransition(start, end);
    
    return { start, end };
}

function fromSymbol(symbol) {
    const start = createState(false);
    const end = createState(true);
    addTransition(start, end, symbol);

    return { start, end };
}

function concat(first, second) {
    addEpsilonTransition(first.end, second.start);
    first.end.isEnd = false;

    return { start: first.start, end: second.end };
}

function union(first, second) {
    const start = createState(false);
    addEpsilonTransition(start, first.start);
    addEpsilonTransition(start, second.start);

    const end = createState(true);
    addEpsilonTransition(first.end, end);
    first.end.isEnd = false;
    addEpsilonTransition(second.end, end);
    second.end.isEnd = false;

    return { start, end };
}

function closure(nfa) {
    const start = createState(false);
    const end = createState(true);

    addEpsilonTransition(start, end);
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
   		    stack.push(closure(stack.pop()));
   		} else if (token === '|') {
   		    const right = stack.pop();
   		    const left = stack.pop();
   		    stack.push(union(left, right));
   		} else if (token === '.') {
   		    const right = stack.pop();
   		    const left = stack.pop();
   		    stack.push(concat(left, right));
   		} else {
   		    stack.push(fromSymbol(token));
   		}
   	}
    
	return stack.pop();
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


/*function createMatcher(exp) {
    const postfixExp = toPostfix(insertExplicitConcatOperator(exp));
    const nfa = toNFA(postfixExp);

    return (word) => search(nfa, word);
}

const match = createMatcher('a*b');
match(''); // false
match('b'); // true
match('ab'); // true*/

const postfixExp = aPosfijo(insertarOperadorExplicitoConcatenacion('(a|b)*a'));

const nfa = toNFA(postfixExp);

console.info(postfixExp);

