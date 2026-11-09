// Prototipo de línea de comandos del gestor de asientos del cine.
// Ejecutar con:  npm run console
//
// Prueba los cuatro escenarios pedidos:
//   1) Sala vacía
//   2) Sala parcialmente ocupada
//   3) Sala casi llena (solo asientos sueltos disponibles)
//   4) Sala completamente llena

import type { SeatMatrix } from "./seats";
import {
  createSeatMatrix,
  printSeatMap,
  reserveSeat,
  countSeats,
  findAdjacentSeats,
  describeAdjacentSeats,
} from "./seats";

/** Imprime un título de sección para separar bien cada escenario. */
function printTitle(title: string): void {
  console.log("");
  console.log("==================================================");
  console.log(title);
  console.log("==================================================");
}

/** Imprime cuántos asientos hay ocupados y disponibles. */
function printCounts(seats: SeatMatrix): void {
  const counts = countSeats(seats);
  console.log(
    "Ocupados: " + counts[0] + " | Disponibles: " + counts[1] +
      " | Total: " + (counts[0] + counts[1])
  );
}

/** Imprime el mapa de la sala, el recuento y la búsqueda de pareja contigua. */
function printReport(seats: SeatMatrix): void {
  printSeatMap(seats);
  printCounts(seats);
  console.log(describeAdjacentSeats(findAdjacentSeats(seats)));
}

/**
 * Ocupa todos los asientos de la sala EXCEPTO los indicados.
 * `freeSeats` es una lista de posiciones [fila, columna] que se quedan libres.
 */
function fillRoomExcept(seats: SeatMatrix, freeSeats: number[][]): void {
  for (let row = 0; row < seats.length; row++) {
    for (let column = 0; column < seats[row].length; column++) {
      let mustStayFree = false;

      for (let i = 0; i < freeSeats.length; i++) {
        if (freeSeats[i][0] === row && freeSeats[i][1] === column) {
          mustStayFree = true;
        }
      }

      if (!mustStayFree) {
        reserveSeat(seats, row, column);
      }
    }
  }
}

// --------------------------------------------------------------
// Escenario 1: sala vacía (todos los asientos disponibles)
// --------------------------------------------------------------
printTitle("ESCENARIO 1: sala vacía");
const emptyRoom = createSeatMatrix();
printReport(emptyRoom);

// --------------------------------------------------------------
// Escenario 2: sala parcialmente ocupada + reservas y validaciones
// --------------------------------------------------------------
printTitle("ESCENARIO 2: sala parcialmente ocupada");
const partialRoom = createSeatMatrix();

// Reservas válidas.
console.log(reserveSeat(partialRoom, 0, 0));
console.log(reserveSeat(partialRoom, 0, 1));
console.log(reserveSeat(partialRoom, 0, 2));
console.log(reserveSeat(partialRoom, 1, 4));
console.log(reserveSeat(partialRoom, 3, 5));

// Validaciones: asiento ya ocupado y posiciones que no existen.
console.log(reserveSeat(partialRoom, 0, 1));
console.log(reserveSeat(partialRoom, 8, 0));
console.log(reserveSeat(partialRoom, 0, 10));
console.log(reserveSeat(partialRoom, -1, 3));

console.log("");
printReport(partialRoom);

// Se reserva el par encontrado y se vuelve a buscar el siguiente.
const firstPair = findAdjacentSeats(partialRoom);
if (firstPair.length > 0) {
  console.log("");
  console.log("Reservando la pareja encontrada...");
  console.log(reserveSeat(partialRoom, firstPair[0][0], firstPair[0][1]));
  console.log(reserveSeat(partialRoom, firstPair[1][0], firstPair[1][1]));
  console.log("");
  printReport(partialRoom);
}

// --------------------------------------------------------------
// Escenario 3: sala casi llena, solo quedan asientos sueltos
// --------------------------------------------------------------
printTitle("ESCENARIO 3: sala casi llena (solo asientos sueltos)");
const almostFullRoom = createSeatMatrix();

// Ningún par de asientos libres queda junto en la misma fila.
fillRoomExcept(almostFullRoom, [
  [0, 3],
  [2, 7],
  [4, 0],
  [5, 5],
  [7, 9],
]);
printReport(almostFullRoom);

// --------------------------------------------------------------
// Escenario 4: sala completamente llena
// --------------------------------------------------------------
printTitle("ESCENARIO 4: sala completamente llena");
const fullRoom = createSeatMatrix();
fillRoomExcept(fullRoom, []);
printReport(fullRoom);

// Intentar reservar en una sala llena.
console.log(reserveSeat(fullRoom, 3, 3));
