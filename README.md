# Cinema Seat Manager

Prototipo de línea de comandos, en TypeScript, para gestionar las reservas de asientos de una sala pequeña de cine (8 filas × 10 asientos por fila).

La sala se representa **solo con un arreglo bidimensional** (sin objetos ni clases):

- `0` → asiento disponible
- `1` → asiento ocupado

## Cómo ejecutarlo

```bash
npm install
npm run console
```

Para comprobar los tipos:

```bash
npm run typecheck
```

## Estructura

| Archivo | Qué contiene |
| --- | --- |
| `src/seats.ts` | Las funciones del gestor de asientos |
| `src/main.ts` | Los escenarios de prueba que se muestran en consola |

## Funciones (`src/seats.ts`)

| Función | Qué hace |
| --- | --- |
| `createSeatMatrix()` | Crea la matriz de 8 filas × 10 columnas con todos los asientos disponibles (`0`). |
| `printSeatMap(seats)` | Imprime la sala en consola: `X` ocupado, `L` libre, con números de fila y de columna. |
| `reserveSeat(seats, row, column)` | Reserva un asiento (`0` → `1`). Comprueba que la posición exista y que no esté ya ocupado; devuelve un mensaje de éxito o de error. |
| `countSeats(seats)` | Devuelve `[ocupados, disponibles]` de toda la sala. |
| `findAdjacentSeats(seats)` | Busca dos asientos libres contiguos en la misma fila y devuelve el **primer** par (`[[fila, col], [fila, col + 1]]`). Si no hay ninguno, devuelve `[]`. |
| `describeAdjacentSeats(pair)` | Convierte el resultado anterior en un mensaje claro para el personal de taquilla. |

## Escenarios de prueba (`src/main.ts`)

1. **Sala vacía:** todos los asientos disponibles.
2. **Sala parcialmente ocupada:** reservas correctas, reserva de un asiento ya ocupado y posiciones inexistentes; después se reserva el par contiguo encontrado.
3. **Sala casi llena:** solo quedan 5 asientos sueltos, así que no hay pareja contigua.
4. **Sala completamente llena:** sin asientos disponibles; se intenta reservar y falla con un mensaje claro.

## Notas

- La búsqueda de asientos contiguos es solo **horizontal** (misma fila). Un asiento libre al final de una fila y otro al principio de la siguiente no cuentan como pareja.
- No se incluye la interfaz web opcional.
