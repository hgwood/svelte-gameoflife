// Inspired by https://github.com/charlee/react-gameoflife/blob/master/src/Game.js

export function makeEmptyBoard(width, height, gen = () => false) {
  let board = [];
  for (let y = 0; y < height; y++) {
    board[y] = [];
    for (let x = 0; x < width; x++) {
      board[y][x] = gen();
    }
  }
  return board;
}

export function makeCells(board) {
  console.log("makeCells");
  let cells = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      cells.push({ x, y });
    }
  }
  return cells;
}

export function runIteration(board) {
  let newBoard = makeEmptyBoard(board[0].length, board.length);

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      let neighbors = calculateNeighbors(board, x, y);
      if (board[y][x]) {
        if (neighbors === 2 || neighbors === 3) {
          newBoard[y][x] = true;
        } else {
          newBoard[y][x] = false;
        }
      } else {
        if (!board[y][x] && neighbors === 3) {
          newBoard[y][x] = true;
        }
      }
    }
  }
  return newBoard;
}

export function calculateNeighbors(board, x, y) {
  let neighbors = 0;
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
  ];
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    let y1 = y + dir[0];
    let x1 = x + dir[1];

    if (
      x1 >= 0 &&
      x1 < board[0].length &&
      y1 >= 0 &&
      y1 < board.length &&
      board[y1][x1]
    ) {
      neighbors++;
    }
  }

  return neighbors;
}
