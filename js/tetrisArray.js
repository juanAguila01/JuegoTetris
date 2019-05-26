let frame = window.requestAnimationFrame ||
            window.mosRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mosRequestAnimationFrame;

var stage = document.getElementById('stage');
var stage2 = document.querySelectorAll('#stage2 > .row > .cell');
var start = document.getElementById('start');
// var joystick = navigator.getGamepads()[0];
// var btn = joystick.buttons;
console.log(stage2);
var mapTetris = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];
// var mapFiguraSiguiente = [
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// ];
var figuraTetris = setFiguraTetris();
var siguienteFigura = setFiguraTetris();
var figuraTetrisRow1;
var figuraTetrisColumn1;
var figuraTetrisRow2;
var figuraTetrisColumn2;
var figuraTetrisRow3;
var figuraTetrisColumn3;
var figuraTetrisRow4;
var figuraTetrisColumn4;

var rotarEle = '';
var rotarZig = '';
var rotarLinea = '';
var rotarTe = '';
var rotaLaFigura = false;

var ROWS = mapTetris.length;
var COLUMNS = mapTetris[0].length;
var SIZE = 25;
var OCUPADA = 1;

//cronometro
var cronometro = 0;
var fps = 0;
var cronometro2 = 0;
var fps2 = 0;
var cronometro3 = 0;
var fps3 = 0;

var datos = {
    left : false,
    right : false,
    down : false,
    rotar : false
};
let UP = 38;
let DOWN = 40;
let RIGHT = 39;
let LEFT = 37;
let filaOcupada;
let desapareceFila = false;
let contadorFilasDesaperecidas = 0;
let moverx = 1;
let movery = 1;
let padKey = false;

// console.log(joystick);

//tomo los valores de las row y columns de cada celda ocupada
for (let row = 0; row < ROWS; row++) {
    for (let columns = 0; columns < COLUMNS; columns++) {
        switch (figuraTetris[row][columns]) {
            case 2:
            figuraTetrisRow1 = row;
            figuraTetrisColumn1 = columns;
            break;
            case 3:
            figuraTetrisRow2 = row;
            figuraTetrisColumn2 = columns;
            break;
            case 4:
            figuraTetrisRow3 = row;
            figuraTetrisColumn3 = columns;
            break;
            case 5:
            figuraTetrisRow4 = row;
            figuraTetrisColumn4 = columns;
            break;
        } 
    }
}

for (let row = 0; row < ROWS; row++) {
    for (let columns = 0; columns < COLUMNS; columns++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        stage.appendChild(cell);
        cell.style.top = row * SIZE + 'px';
        cell.style.left = columns * SIZE + 'px';
    }
}

let tetris = {
    teclas : function(){
        document.addEventListener('keydown', tetris.presionar, false);
        document.addEventListener('keyup', tetris.soltar, false);
    },
    presionar : function (tecla){
        tecla.preventDefault();
        switch (tecla.keyCode) {
            case 40: datos.down = true;break;
            case 39: datos.right = true;break;
            case 37: datos.left = true;break;
            case 13: 
            console.log(figuraTetris[figuraTetrisRow1][figuraTetrisColumn1]);
            for (let columns = 0; columns < COLUMNS; columns++){
                if(figuraTetris[0][columns] === 2){
                    rotaLaFigura = false;
                    console.log('tiene un dos');
                }else{
                    rotaLaFigura = true;
                }
            }
            if (rotaLaFigura) {
                datos.rotar = true;
            }
            break;
        }
    },
    soltar : function(tecla){
        tecla.preventDefault();
        switch (tecla.keyCode) {
            case 40: datos.down = false;break;
            case 39: datos.right = false;break;
            case 37: datos.left = false;break;
            case 13: datos.rotar = false;break;
        }
    },
    tiempo : function(){
        console.log(siguienteFigura);
        /*Esto es un temporizador que cada segundo le suma uno a la variable cronometro y se lo resta
        funciona para que las piezas no bajen extremadamente rapido. */
        fps += 1;
        if (fps == 60) {
            //una ves cumplida la condicion esta se vuelve a 0.
            fps -= 60;
            //se le suma un segundo a cronometro.
            cronometro +=1;
        }
        if (cronometro == 1) {
            /*cuando cronometro tenga un segundo se activa el codigo de bajada de figuras y se le resta
             un segundo a cronometro para que vuelva a esperar un segundo la proxima vez.*/
            cronometro -=1;
            //modifico los valores de las variables column y row de la figura.
            if((figuraTetrisRow1 === ROWS -1) || (figuraTetrisRow2 === ROWS -1) || (figuraTetrisRow3 === ROWS -1) || (figuraTetrisRow4 === ROWS -1) || (mapTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === 1) || (mapTetris[figuraTetrisRow2 + 1][figuraTetrisColumn2] === 1) || (mapTetris[figuraTetrisRow3 + 1][figuraTetrisColumn3] === 1) || (mapTetris[figuraTetrisRow4 + 1][figuraTetrisColumn4] === 1)){
                /* este if comprueva dos cosas:
                    *primero que la figuar este tocando el final del mapa
                    *segundo que abajo de la figura ayaun espacio ocupado
                si estos casos se dan entonces la figura es pintada en el mapa. */
                mapTetris[figuraTetrisRow1][figuraTetrisColumn1] = 1;
                mapTetris[figuraTetrisRow2][figuraTetrisColumn2] = 1;
                mapTetris[figuraTetrisRow3][figuraTetrisColumn3] = 1;
                mapTetris[figuraTetrisRow4][figuraTetrisColumn4] = 1;
                //se asigna una nueva figura aleatoria a nuesta variable figuraTetris.
                    rotarEle = ''; // se reinicia la variable de rotacion todas las que hay.
                    rotarLinea = '';
                    rotarZig = '';
                    rotarTe = '';
                    figuraTetris = siguienteFigura;
                    siguienteFigura = setFiguraTetris();
                    //se asignan los valor en tiempo real de cada row y column de cada parte de la figura.
                for (let row = 0; row < ROWS; row++) {
                    for (let columns = 0; columns < COLUMNS; columns++) {
                        switch (figuraTetris[row][columns]) {
                            case 2:
                            figuraTetrisRow1 = row;
                            figuraTetrisColumn1 = columns;
                            break;
                            case 3:
                            figuraTetrisRow2 = row;
                            figuraTetrisColumn2 = columns;
                            break;
                            case 4:
                            figuraTetrisRow3 = row;
                            figuraTetrisColumn3 = columns;
                            break;
                            case 5:
                            figuraTetrisRow4 = row;
                            figuraTetrisColumn4 = columns;
                            break;
                        } 
                    }
                }    
            }else{ 
                figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                figuraTetrisRow1 += movery;
                figuraTetrisRow2 += movery;
                figuraTetrisRow3 += movery;
                figuraTetrisRow4 += movery;
                figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;  
                if (desapareceFila) {
                    //en caso de no aver colision la figura avanza un espacio hacia abajo.
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisRow1 -= movery;
                    figuraTetrisRow2 -= movery;
                    figuraTetrisRow3 -= movery;
                    figuraTetrisRow4 -= movery;
                    console.log(figuraTetrisRow1,figuraTetrisColumn1,figuraTetris);
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                }
            }
        }
        
        
        /*aqui indicamos lo que nuestras figuar hacen cuando se preciona la flecha hacia la derecha
        estas se mueven un espacio hacia la derecha gracias a que el dato se vuelve falso al
        precionarlo pero si lo mantienes precionado la figuar avanza rapido hacia la derecha.*/
        if (datos.right) {
            if ((figuraTetrisColumn1 == COLUMNS -1) || (figuraTetrisColumn2 == COLUMNS -1) || (figuraTetrisColumn3 == COLUMNS -1) || (figuraTetrisColumn4 == COLUMNS -1) || (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 1) || (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 1] === 1) || (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 1] === 1) || (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 1] === 1)){
                //codigo para realizar cuando se detenga
            }else{
                figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                figuraTetrisColumn1 += moverx;
                figuraTetrisColumn2 += moverx;
                figuraTetrisColumn3 += moverx;
                figuraTetrisColumn4 += moverx;
                figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
            }
        }
        /*qui indicamos lo que nuestras figuar hacen cuando se preciona la flecha hacia la izquierda
        estas se mueven un espacio hacia la izquierda gracias a que el dato se vuelve falso al
        precionarlo pero si lo mantienes precionado la figuar avanza rapido hacia la izquierda.*/
        if (datos.left) {
            if ((figuraTetrisColumn1 == 0) || (figuraTetrisColumn2 == 0) || (figuraTetrisColumn3 == 0) || (figuraTetrisColumn4 == 0) || (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] == 1) || (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 1] == 1) || (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 - 1] == 1) || (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] == 1)){

            }else{
                figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                figuraTetrisColumn4 -= moverx;
                figuraTetrisColumn3 -= moverx;
                figuraTetrisColumn2 -= moverx;
                figuraTetrisColumn1 -= moverx;
                figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
            }
            
        }
        /*qui indicamos lo que nuestras figuar hacen cuando se preciona la flecha hacia abajo
        estas bajan mas rapido para agilizar la partida */
        if (datos.down) {
                if ((figuraTetrisRow1 === ROWS -1) || (figuraTetrisRow2 === ROWS -1) || (figuraTetrisRow3 === ROWS -1) || (figuraTetrisRow4 === ROWS -1) || (mapTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === 1) || (mapTetris[figuraTetrisRow2 + 1][figuraTetrisColumn2] === 1) || (mapTetris[figuraTetrisRow3 + 1][figuraTetrisColumn3] === 1) || (mapTetris[figuraTetrisRow4 + 1][figuraTetrisColumn4] === 1)) {
                    datos.down = false;
                }else{
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisRow1 += movery;
                    figuraTetrisRow2 += movery;
                    figuraTetrisRow3 += movery;
                    figuraTetrisRow4 += movery;
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                }
                
        }
        /*aqui tenemos todas las rotaciones de nuestras figuras. */
        
        // let rotarEle = 'primeraRotacion';
        // let rotarEle = 'segundaRotacion';
        // let rotarEle = 'terceraRotacion';
        if (datos.rotar /*&& rotaLaFigura*/) {
            //ELE
            /*verifica si la figura dibujada coincide con la ELE y busca todas las posibles 
            posiciones de la figura para rotarla en la forma correcta */
            if (((figuraTetris[figuraTetrisRow1 +1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1 - 1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])) || (rotarEle === 'primeraRotacion') || (rotarEle === 'segundaRotacion') || (rotarEle === 'terceraRotacion')) {
                //la ele.
                //FALTA AÑADIR LAS COLISIONES QUE IMPIDEN QUE LA FIGURA SE ROTE EN 
                //CIERTAS CIRSCUNSTANCIAS.
                console.log('ele');
                if ((figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 + 2] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4]) && (mapTetris[figuraTetrisRow3 + 1][figuraTetrisColumn3] === 0) && (mapTetris[figuraTetrisRow3 - 1][figuraTetrisColumn3] === 0) && (mapTetris[figuraTetrisRow4 + 1][figuraTetrisColumn4] === 0) && (mapTetris[figuraTetrisRow4 - 1][figuraTetrisColumn4] === 0)/*estos son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisColumn1 +=1;
                    figuraTetrisRow2 -=1;
                    figuraTetrisColumn2 +=2;
                    figuraTetrisRow4 +=1;
                    figuraTetrisColumn4 -=1;
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5; 
                    rotarEle = 'primeraRotacion';

                }else if ((figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])/*aqui van las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                    if((figuraTetrisColumn1 === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 2] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 2] === 0)){
                        //AQUI VA EL CAMBIO QUE SE PRODUCE CUANDO LA FIGURA ESTA UN ESPACIO LEJOS DE LA 
                        //ORILLA IZQUIERDA.
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 +=1;
                        figuraTetrisRow2 +=1;
                        figuraTetrisColumn3 +=2;
                        figuraTetrisColumn4 +=2;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }else if((mapTetris[figuraTetrisRow3][figuraTetrisColumn3 - 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 1] === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 1] === 0)){
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 +=1;
                        figuraTetrisColumn1 -=1;
                        figuraTetrisRow2 +=1;
                        figuraTetrisColumn2 -=1;
                        figuraTetrisColumn3 +=1;
                        figuraTetrisColumn4 +=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    } 
                    rotarEle = 'segundaRotacion';
                }else if ((figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 2] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 + 2] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4]) && (mapTetris[figuraTetrisRow1 - 1][figuraTetrisColumn1] === 0) && (mapTetris[figuraTetrisRow2 - 1][figuraTetrisColumn2] === 0) && (mapTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === 0) && (mapTetris[figuraTetrisRow2 + 1][figuraTetrisColumn1] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisRow1 -=1;
                    figuraTetrisColumn1 +=1;
                    figuraTetrisRow3 +=1;
                    figuraTetrisColumn3 -=2;
                    figuraTetrisColumn4 -=1;
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                }else{
                    //devo cambiar las condiciones si esque quiero hacer el giro estando en la orilla derecha ya que la figuar 
                    //se cambiara mobiendoce un poco mas lejos de lo normal a la izquierda.
                    //a demas de que las condiciones se cumplan tambien debo fijarme queninguna de las casillas que 
                    //ocupare esten ocupadas en el mapa.pero lo dejare para cuando aya terminado la funcion de rotar.
                    console.log('repite');
                    if ((figuraTetrisColumn1 === (COLUMNS - 1) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 2] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 2] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 - 1] === 0))/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisColumn1 -=2;
                        figuraTetrisColumn2 -=2;
                        figuraTetrisRow3 -=1;
                        figuraTetrisRow4 -=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;   
                    }else if((mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 +1] === 0)/*este es el formato de las condiciones de colision para impedir que la figura gire cuando no debe acerlo*/){
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisColumn1 -=1;
                        figuraTetrisColumn2 -=1;
                        figuraTetrisRow3 -=1;
                        figuraTetrisColumn3 +=1;
                        figuraTetrisRow4 -=1;
                        figuraTetrisColumn4 +=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }
                    rotarEle = 'terceraRotacion'; 
                }
            }
            //LINEA
            /*verifica si la figura dibujada coincide con la LINEA y busca todas las posibles 
            posiciones de la figura para rotarla en la forma correcta */
            if (((figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 3][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])) || (rotarLinea === 'primeraRotacion')){
                //la linea.
                //FALTA AÑADIR LAS COLISIONES QUE IMPIDEN QUE LA FIGURA SE ROTE EN 
                //CIERTAS CIRSCUNSTANCIAS.
                console.log('linea');
                if ((figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 2] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 3] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4]) && (mapTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === 0) && (mapTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1] === 0) && (mapTetris[figuraTetrisRow2 + 1][figuraTetrisColumn2] === 0) && (mapTetris[figuraTetrisRow2 + 2][figuraTetrisColumn2] === 0) && (mapTetris[figuraTetrisRow3 - 1][figuraTetrisColumn3] === 0) && (mapTetris[figuraTetrisRow3 + 1][figuraTetrisColumn3] === 0) && (mapTetris[figuraTetrisRow3 + 2][figuraTetrisColumn3] === 0) && (mapTetris[figuraTetrisRow4 - 1][figuraTetrisColumn4] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisRow1 -=1;
                    figuraTetrisColumn1 +=2;
                    figuraTetrisColumn2 +=1;
                    figuraTetrisRow3 +=1;
                    figuraTetrisRow4 +=2;
                    figuraTetrisColumn4 -=1;
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                } else {
                    //en caso de que este en la orilla derecha.
                    if ((figuraTetrisColumn1 === COLUMNS - 1) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 2] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 3] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 - 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 - 2] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 2] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 +=1;
                        figuraTetrisColumn1 -=3;
                        figuraTetrisColumn2 -=2;
                        figuraTetrisRow3 -=1;
                        figuraTetrisColumn3 -=1;
                        figuraTetrisRow4 -=2;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }else if ((figuraTetrisColumn1 === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 2] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 3] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 2] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 2] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        //en caso de que este en la orilla izquierda.
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 +=1;
                        figuraTetrisColumn2 +=1;
                        figuraTetrisRow3 -=1;
                        figuraTetrisColumn3 +=2;
                        figuraTetrisRow4 -=2;
                        figuraTetrisColumn4 +=3;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }else if ((figuraTetrisColumn1 === 1) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 2] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 2] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 2] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        //en caso de que este a un espacion de la orilla derecha
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 +=1;
                        figuraTetrisColumn1 -=1;
                        figuraTetrisRow3 -=1;
                        figuraTetrisColumn3 +=1;
                        figuraTetrisRow4 -=2;
                        figuraTetrisColumn4 +=2;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }else if((mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 + 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 2] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 - 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 - 2] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 2] === 0)/*estas son las coliciones que impiden que la figura gire si hay piezas rodeadola*/){
                        //el caso normal, es decir cualquiera menos los demas.
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 +=1;
                        figuraTetrisColumn1 -=2;
                        figuraTetrisColumn2 -=1;
                        figuraTetrisRow3 -=1;
                        figuraTetrisRow4 -=2;
                        figuraTetrisColumn4 +=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }
                rotarLinea = 'primeraRotacion';
                }
            }
            //LA TE.
            /*verifica si la figura dibujada coincide con la TE y busca todas las posibles 
            posiciones de la figura para rotarla en la forma correcta */
            if ((((figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 2] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])) || (rotarTe === 'primeraRotacion') || (rotarTe === 'segundaRotacion') || (rotarTe === 'terceraRotacion')) && (figuraTetrisRow1 > 0)) {
                //La te.
                //FALTA AÑADIR LAS COLISIONES QUE IMPIDEN QUE LA FIGURA SE ROTE EN 
                //CIERTAS CIRSCUNSTANCIAS.
                console.log('te');
                if ((figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 - 1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])/*aqui van las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                    if ((figuraTetrisColumn1 === COLUMNS - 1) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 2] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        //EN CASO DE QUE ESTE PEGADO A LA ORILLA DERECHA.
                        //SE DEBE MOVER DE OTRA FORMA PARA NO QUEDAR CON ALGUNA PARTE AFUERA.
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisColumn1 -=1;
                        figuraTetrisColumn2 -=1;
                        figuraTetrisColumn3 -=1;
                        figuraTetrisRow4 -=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }else if((mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/){
                        //EN CUALQUIER OTRO CASO.
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow4 -= 1;
                        figuraTetrisColumn4 += 1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }
                    rotarTe = 'primeraRotacion';
                } else if((figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 - 1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4]) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 - 1] === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow3 + 1][figuraTetrisColumn3] === 0) && (mapTetris[figuraTetrisRow4 + 1][figuraTetrisColumn4] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/){
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisColumn2 +=1;
                    figuraTetrisColumn3 +=1;
                    figuraTetrisRow4 +=1;
                    figuraTetrisColumn4 -=1;
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    rotarTe = 'segundaRotacion';
                } else if((figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])){
                    if ((figuraTetrisColumn1 === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 2] === 0) && (mapTetris[figuraTetrisRow3][figuraTetrisColumn3 + 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 1] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 += 1;
                        figuraTetrisColumn2 +=1;
                        figuraTetrisColumn3 +=1;
                        figuraTetrisColumn4 +=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    } else if((mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 + 1] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow1 += 1;
                        figuraTetrisColumn1 -=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }
                }else if((mapTetris[figuraTetrisRow1 - 1][figuraTetrisColumn1] === 0) && (mapTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === 0) && (mapTetris[figuraTetrisRow2 - 1][figuraTetrisColumn2] === 0) && (mapTetris[figuraTetrisRow3 + 1][figuraTetrisColumn3] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola, el true esta puesto solo para que no mande error.*/){
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisRow1 -= 1;
                    figuraTetrisColumn1 +=1;
                    figuraTetrisColumn2 -=1;
                    figuraTetrisColumn3 -=1;
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    rotarTe = 'terceraRotacion';
                }
            }
            //EL ZIG-ZAG.
            /*verifica si la figura dibujada coincide con el ZIGZAG y busca todas las posibles 
            posiciones de la figura para rotarla en la forma correcta */
            if ((((figuraTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 - 1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])) || (rotarZig === 'primeraRotacion')) && (figuraTetrisRow1 > 0)) {
                //el zig zag.
                console.log('zig-zag');
                if ((figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1] === figuraTetris[figuraTetrisRow2][figuraTetrisColumn2]) && (figuraTetris[figuraTetrisRow1 + 1][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow3][figuraTetrisColumn3]) && (figuraTetris[figuraTetrisRow1 + 2][figuraTetrisColumn1 + 1] === figuraTetris[figuraTetrisRow4][figuraTetrisColumn4])) {
                    if ((figuraTetrisColumn3 === COLUMNS -1) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow2][figuraTetrisColumn2 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 2] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisRow2 -=1;
                        figuraTetrisColumn2 +=1;
                        figuraTetrisColumn3 -=2;
                        figuraTetrisRow4 -=1;
                        figuraTetrisColumn4 -=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    } else if ((mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 1] === 0) && (mapTetris[figuraTetrisRow1][figuraTetrisColumn1 + 2] === 0) && (mapTetris[figuraTetrisRow4][figuraTetrisColumn4 - 1] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/) {
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                        figuraTetrisColumn1 +=1;
                        figuraTetrisRow2 -=1;
                        figuraTetrisColumn2 +=2;
                        figuraTetrisColumn3 -=1;
                        figuraTetrisRow4 -=1;
                        figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                        figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                        figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                        figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    }
                } else if ((mapTetris[figuraTetrisRow1 - 1][figuraTetrisColumn1] === 0) && (mapTetris[figuraTetrisRow2 + 1][figuraTetrisColumn2] === 0) && (mapTetris[figuraTetrisRow3 - 1][figuraTetrisColumn3] === 0) && (mapTetris[figuraTetrisRow3 - 2][figuraTetrisColumn3] === 0)/*estas son las coliciones que impiden que la figura gire si si hay piezas rodeadola*/){
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 0;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 0;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 0;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 0;
                    figuraTetrisRow1 -= 1;
                    figuraTetrisColumn2 -=1;
                    figuraTetrisRow3 -= 1;
                    figuraTetrisColumn3 +=2;
                    figuraTetrisColumn4 +=1;
                    figuraTetris[figuraTetrisRow1][figuraTetrisColumn1] = 2;
                    figuraTetris[figuraTetrisRow2][figuraTetrisColumn2] = 3;
                    figuraTetris[figuraTetrisRow3][figuraTetrisColumn3] = 4;
                    figuraTetris[figuraTetrisRow4][figuraTetrisColumn4] = 5;
                    rotarZig = 'primeraRotacion';
                }
            }
            /* cambia el valor de datos.rotar a falso al momento de apretarlo justo luego de terminar de leer el codigo para impedir que la figura rota extremadamente rapido, y conseguir que solo rote una vez por cada que apretes el boton.*/
            datos.rotar = false;
        }
        /*aqui indicamos que datos.right se vuelve falso apenas lo precionamos para impedir que una ves
        presionado la figura avence super rapido hacia la derecha. */
       
        if(datos.right){
            datos.right = false;
        }
        /*aqui indicamos que datos.left se vuelve falso apenas lo precionamos para impedir que una ves
        presionado la figura avence super rapido hacia la izquierda. */
        if(datos.left){
            datos.left = false;
        }
        /* aqui llamamos al render cada ves que termina de hacer las modificacionesa corespondientes 
        al mapa completo y a las figuar, el render se encarga de dibujar el mapa correctamente. */
        tetris.render();
        /* aqui llamamos a nuestro metodo tiempo el cual sera llamado 60 veces por segundo. */
        frame(tetris.tiempo);
    },
    render : function(){
        var fila,columna;
        //Limpiamos todo el mapa.
        if(stage.hasChildNodes()){
            for (let row = 0; row < ROWS; row++) {
                for (let columns = 0; columns < COLUMNS; columns++) {
                    stage.removeChild(stage.firstChild);
                }
            }
        }
        for (let row = 0; row < 40; row++) {
            stage2[row].style.backgroundImage = 'none';
            stage2[row].style.border = 'solid 1px palevioletred';
        }
        //Redibujamos el mapa con los valor actualizados 60 veces por segundo.
        for (let row = 0; row < ROWS; row++) {
            for (let columns = 0; columns < COLUMNS; columns++) {
                //creamos las celdas y las agregamos a nuestro stage, en HTML.
                let cell = document.createElement('div');
                cell.setAttribute('class', 'cell');
                stage.appendChild(cell);
                // if(row == 0 && columns == 0){
                //     cell.style.borderTop = 'solid 1px black';
                //     cell.style.borderBottom = 'solid 1px black';
                // }else if(row == )
                //si la celda del mapaTetris esta ocupada la pintamos de verde.
                switch (mapTetris[row][columns]) {
                    case OCUPADA: 
                    // cell.style.backgroundColor = 'green'; 
                    // cell.style.borderColor = 'green';
                    // cell.style.backgroundImage = 'url(../img/piedra.jpg)';
                    cell.style.backgroundImage = 'url(img/piedra.jpg)';
                    cell.style.backgroundRepeat = 'no-repeat';
                    cell.style.backgroundSize = '30px 30px';
                    cell.style.border = 'none';
                    break;
                    case 6: 
                    if (columns  == 0) {
                        cell.style.borderLeft = 'solid 4px yellow';
                        cell.style.borderTop = 'solid 4px yellow';
                        cell.style.borderBottom = 'solid 4px yellow';
                    }else if(columns == COLUMNS -1){
                        cell.style.borderRight = 'solid 4px yellow';
                        cell.style.borderTop = 'solid 4px yellow';
                        cell.style.borderBottom = 'solid 4px yellow';
                    }else{
                        cell.style.borderTop = 'solid 4px yellow';
                        cell.style.borderBottom = 'solid 4px yellow';
                    }
                    
                    break;
                }
                //pintamos nuestra figuraTetris, de color rojo.
                switch (figuraTetris[row][columns]) {
                    case 2: 
                    // cell.style.backgroundColor = 'red';
                    // cell.style.borderColor = 'red';
                    // cell.style.backgroundImage = 'url(../img/oro.jpg)';
                    cell.style.backgroundImage = 'url(img/oro.jpg)';
                    cell.style.backgroundRepeat = 'no-repeat';
                    cell.style.backgroundSize = '30px 30px';
                    cell.style.border = 'none';
                     break;
                    case 3: 
                    // cell.style.backgroundColor = 'red'; 
                    // cell.style.borderColor = 'red';
                    // cell.style.backgroundImage = 'url(../img/oro.jpg)';
                    cell.style.backgroundImage = 'url(img/oro.jpg)'
                    cell.style.backgroundRepeat = 'no-repeat';
                    cell.style.backgroundSize = '30px 30px';
                    cell.style.border = 'none';
                    break;
                    case 4: 
                    // cell.style.backgroundColor = 'red';
                    // cell.style.borderColor = 'red'; 
                    // cell.style.backgroundImage = 'url(../img/oro.jpg)';
                    cell.style.backgroundImage = 'url(img/oro.jpg)'
                    cell.style.backgroundRepeat = 'no-repeat';
                    cell.style.backgroundSize = '30px 30px';
                    cell.style.border = 'none';
                    break;
                    case 5: 
                    // cell.style.backgroundColor = 'red';
                    // cell.style.borderColor = 'red'; 
                    // cell.style.backgroundImage = 'url(../img/oro.jpg)';
                    cell.style.backgroundImage = 'url(img/oro.jpg)'
                    cell.style.backgroundRepeat = 'no-repeat';
                    cell.style.backgroundSize = '30px 30px';
                    cell.style.border = 'none';
                    break;
                }

                switch (siguienteFigura[row][columns]) {
                    case 2:
                        fila = row * 10;
                        columna = columns;
                        // stage2[fila+columna].style.backgroundImage = 'url(../img/oro.jpg)';
                        stage2[fila+columna].style.backgroundImage = 'url(img/oro.jpg)';
                        stage2[fila+columna].style.backgroundRepeat = 'no-repeat';
                        stage2[fila+columna].style.backgroundSize = '30px 30px';
                        stage2[fila+columna].style.border = 'none';
                        break;
                    case 3:
                        fila = row * 10;
                        columna = columns;
                        // stage2[fila+columna].style.backgroundImage = 'url(../img/oro.jpg)';
                        stage2[fila+columna].style.backgroundImage = 'url(img/oro.jpg)';
                        stage2[fila+columna].style.backgroundRepeat = 'no-repeat';
                        stage2[fila+columna].style.backgroundSize = '30px 30px';
                        stage2[fila+columna].style.border = 'none';
                        break;
                    case 4:
                        fila = row * 10;
                        columna = columns;
                        // stage2[fila+columna].style.backgroundImage = 'url(../img/oro.jpg)';
                        stage2[fila+columna].style.backgroundImage = 'url(img/oro.jpg)';
                        stage2[fila+columna].style.backgroundRepeat = 'no-repeat';
                        stage2[fila+columna].style.backgroundSize = '30px 30px';
                        stage2[fila+columna].style.border = 'none';
                        break;
                    case 5:
                        fila = row * 10;
                        columna = columns;
                        // stage2[fila+columna].style.backgroundImage = 'url(../img/oro.jpg)';
                        stage2[fila+columna].style.backgroundImage = 'url(img/oro.jpg)';
                        stage2[fila+columna].style.backgroundRepeat = 'no-repeat';
                        stage2[fila+columna].style.backgroundSize = '30px 30px';
                        stage2[fila+columna].style.border = 'none';
                        break;
                
                    
                }
                //posicionamos correctamente cada una de las celdas con position: absolute.
                cell.style.top = row * SIZE + 'px';
                cell.style.left = columns * SIZE + 'px';
            }
        }
        forstament :    for (let row = 0; row < ROWS; row++) {
                    if (desapareceFila){
                        break forstament;
                    }
            for (let columns = 0; columns < COLUMNS; columns += 10){
                //Comprobamos que alguna linea del mapa esta completa para eliminarla
                if ((mapTetris[row][columns] === 1)&&(mapTetris[row][columns+1] === 1)&&(mapTetris[row][columns+2] === 1)&&(mapTetris[row][columns+3] === 1)&&(mapTetris[row][columns+4] === 1)&&(mapTetris[row][columns+5] === 1)&&(mapTetris[row][columns+6] === 1)&&(mapTetris[row][columns+7] === 1)&&(mapTetris[row][columns+8] === 1)&&(mapTetris[row][columns+9] === 1)) {
                    console.log('hola');
                    //volvemos toda la fila a 0.
                    mapTetris[row][columns] = 6;
                    mapTetris[row][columns +1] = 6;
                    mapTetris[row][columns +2] = 6;
                    mapTetris[row][columns +3] = 6;
                    mapTetris[row][columns +4] = 6;
                    mapTetris[row][columns +5] = 6;
                    mapTetris[row][columns +6] = 6;
                    mapTetris[row][columns +7] = 6;
                    mapTetris[row][columns +8] = 6;
                    mapTetris[row][columns +9] = 6;
                    //almacenamos la fila que esta llena.
                    filaOcupada = row;
                    //ponemos esta variable a true para en el siguiente if comenzar la desaparicion de
                    //la fila.
                    desapareceFila = true;
                    /* frenamos la busqueda una ves encontrada una fila para que no aya problemas si hay mas de una fila llena. */
                    break forstament;
                }
            }
        }
        if (desapareceFila) {
            console.log(filaOcupada);
            //al final devolver a falase.
            fps2 += 1;
            if (fps2 == 40) {
                //una ves cumplida la condicion esta se vuelve a 0.
                fps2 -= 40;
                //se le suma un segundo a cronometro.
                cronometro2 +=1;
            }
            if (cronometro2 == 1){
                cronometro2 -= 1;
                for (let col = 0; col < COLUMNS; col++) {
                    mapTetris[filaOcupada][col] = 0;
                    
                }
                for (filaOcupada; filaOcupada >= 0; filaOcupada--) {
                    console.log('chao');
                    for (let columns = 0; columns < COLUMNS; columns++) {
                        if (mapTetris[filaOcupada][columns] === 1) {
                            // console.log('chao');
                            mapTetris[filaOcupada][columns] = 0;
                            filaOcupada += 1;
                            mapTetris[filaOcupada][columns] = 1;
                        }
                    }
                }
                
                desapareceFila = false;
            }
            
        }
    }
};
tetris.teclas();
// tetris.tiempo();

start.addEventListener('click', tetris.tiempo, false);