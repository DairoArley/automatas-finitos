### Ejecute npm install
### Ejecute npm start


# automatas-finitos

 *FACULTAD DE INGENIERÍA*
#### Departamento de Ingeniería de Sistemas.

#### Universidad de Antioquia | Ingeniería de Sistemas
###### PRIMERA PRÁCTICA

__LABORATORIO DE TEORÍA DE LENGUAJES 20192__

Construya un programa de computador que permita el ingreso de expresiones regulares y
comprobación de hileras. Su programa debe tener las siguientes funcionalidades:
##### 1. Ingreso de expresiones regulares.
##### 2. Construir AF correspondiente a la expresión regular entrada.
##### 3. Mostrar el autómata finito generado.
##### 4. Ingreso y reconocimiento de una hilera de caracteres.
##### a. Al final debe mostrar si la hilera es correcta o no lo es.

**_Anotaciones:_**
1. Los símbolos de fin de secuencia, secuencia vacía y secuencia nula son elegidos por cada
equipo.
2. Los símbolos de operación serán representados de la siguiente manera:
a. Unión se representa con: |
b. Concatenación se representa con: .
c. Clausura se representa con: *
d. Clausura que no incluye secuencia nula se representa con: +

~~Ejemplo:~~
Algunas de las posibles expresiones regulares que debe permitir el programa son:
1. ((1|0.1)*|1)+
2. (GO|GOTO|TOO|ON)*.ON.TOO
3. (1*0.1*)+