// Gestor de asientos de cine.
//
// Reglas del proyecto:
//  - La sala se representa SOLO con un arreglo bidimensional (matriz).
//  - 0 = asiento disponible, 1 = asiento ocupado.
//  - No se usan objetos ni clases: todo son arreglos, números y textos.

// Tamaño de la sala pequeña del cine.
export const ROWS = 8;
export const COLUMNS = 10;

// Valores posibles de cada asiento.
export const AVAILABLE = 0;
export const OCCUPIED = 1;

// Una sala es una matriz de números: seats[fila][columna].
export type SeatMatrix = number[][];

/**
 * Crea la sala con todos los asientos disponibles (0).
 * Devuelve una matriz de `rows` filas por `columns` columnas.
 */
export function createSeatMatrix(
  rows: number = ROWS,
  columns: number = COLUMNS
): SeatMatrix {
  const seats: SeatMatrix = [];

  for (let row = 0; row < rows; row++) {
    const currentRow: number[] = [];
    for (let column = 0; column < columns; column++) {
      currentRow.push(AVAILABLE);
    }
    seats.push(currentRow);
  }

  return seats;
}

/**
 * Comprueba si una posición (fila, columna) existe dentro de la sala.
 * Devuelve true solo si ambos números son enteros y están en rango.
 */
export function isValidPosition(
  seats: SeatMatrix,
  row: number,
  column: number
): boolean {
  if (!Number.isInteger(row) || !Number.isInteger(column)) {
    return false;
  }
  if (row < 0 || row >= seats.length) {
    return false;
  }
  if (column < 0 || column >= seats[row].length) {
    return false;
  }
  return true;
}

/**
 * Imprime en consola el estado actual de la sala.
 *  - "X" = asiento ocupado
 *  - "L" = asiento libre
 * Incluye los números de columna arriba y de fila a la izquierda.
 */
export function printSeatMap(seats: SeatMatrix): void {
  // Cabecera con los números de columna.
  let header = "     ";
  for (let column = 0; column < seats[0].length; column++) {
    header += column + "  ";
  }
  console.log(header);
  console.log("     " + "---".repeat(seats[0].length));

  // Una línea por fila: número de fila + estado de cada asiento.
  for (let row = 0; row < seats.length; row++) {
    let line = " " + row + " | ";
    for (let column = 0; column < seats[row].length; column++) {
      line += (seats[row][column] === OCCUPIED ? "X" : "L") + "  ";
    }
    console.log(line);
  }
}

/**
 * Reserva el asiento indicado (lo cambia de 0 a 1).
 * Validaciones:
 *  - la posición debe existir en la sala;
 *  - el asiento no debe estar ya ocupado.
 * Devuelve un mensaje que indica si la operación tuvo éxito o falló.
 */
export function reserveSeat(
  seats: SeatMatrix,
  row: number,
  column: number
): string {
  if (!isValidPosition(seats, row, column)) {
    return "Error: el asiento (fila " + row + ", columna " + column +
      ") no existe. Filas válidas: 0-" + (seats.length - 1) +
      ", columnas válidas: 0-" + (seats[0].length - 1) + ".";
  }

  if (seats[row][column] === OCCUPIED) {
    return "Error: el asiento (fila " + row + ", columna " + column +
      ") ya está ocupado.";
  }

  seats[row][column] = OCCUPIED;
  return "Reserva confirmada: asiento (fila " + row + ", columna " + column + ").";
}

/**
 * Cuenta los asientos de toda la sala.
 * Devuelve un arreglo [ocupados, disponibles].
 */
export function countSeats(seats: SeatMatrix): number[] {
  let occupied = 0;
  let available = 0;

  for (let row = 0; row < seats.length; row++) {
    for (let column = 0; column < seats[row].length; column++) {
      if (seats[row][column] === OCCUPIED) {
        occupied++;
      } else {
        available++;
      }
    }
  }

  return [occupied, available];
}

/**
 * Busca dos asientos libres contiguos horizontalmente (misma fila).
 * Recorre la sala de arriba abajo y de izquierda a derecha y devuelve
 * el PRIMER par que encuentre, como arreglo de dos posiciones:
 *   [[fila, columna], [fila, columna + 1]]
 * Si no hay ningún par disponible, devuelve un arreglo vacío [].
 */
export function findAdjacentSeats(seats: SeatMatrix): number[][] {
  let row = 0;

  while (row < seats.length) {
    let column = 0;

    // Se para en columna - 1 porque comparamos cada asiento con el siguiente.
    while (column < seats[row].length - 1) {
      if (seats[row][column] === AVAILABLE && seats[row][column + 1] === AVAILABLE) {
        return [
          [row, column],
          [row, column + 1],
        ];
      }
      column++;
    }

    row++;
  }

  return [];
}

/**
 * Devuelve un texto claro con el resultado de findAdjacentSeats,
 * pensado para el personal de taquilla.
 */
export function describeAdjacentSeats(pair: number[][]): string {
  if (pair.length === 0) {
    return "No hay dos asientos contiguos disponibles en la misma fila.";
  }

  return "Asientos contiguos encontrados: fila " + pair[0][0] +
    ", columnas " + pair[0][1] + " y " + pair[1][1] + ".";
}
