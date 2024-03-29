/**
 * You are given a 2D matrix containing different characters,
 * you need to find if there exists any cycle consisting of
 * the same character in the matrix.
 *
 * A cycle is a path in the matrix that starts and ends at the
 * same cell and has four  or more cells. From a given cell,
 * you can move to one of the cells adjacent to it - in one
 * of the four directions (up, down, left, or right), if it
 * has the same character value of the current cell.
 *
 *
 * Example:
 *  [[a, a, a, a],
 *   [b, a, c, a],
 *   [b, a, c, a],
 *   [c, a, a, a]]
 * There is a cycle of a's.
 *
 * Example:
 *  [[a, a, a, a],
 *   [a, b, b, a],
 *   [a, b, a, a],
 *   [a, a, a, c]]
 * There is a cycle of a's.
 *
 * Example:
 *  [[a, b, e, b],
 *   [b, b, c, b],
 *   [b, c, c, d],
 *   [d, c, d, d]]
 * There is no cycle.
 */

/**
 * Solution:
 * 1) Make a boolean matrix to track visited cells.
 * 2) We have found a cycle when these two conditions are true:
 * -  we /never/ initiate a recursive call to visit a the cell we just came from (the parent cell)
 * -  we are visiting a cell that has already been visited
 */

// const cycleInMatrix = arr => {
//   const visited = arr.map(subarr => subarr.map(e => false));
//   for (let r = 0; r < arr.length; r++) {
//     for (let c = 0; c < arr[0].length; c++) {
//       if (!visited[r][c]) {
//         if (checkCycle(arr[r][c], arr, visited, r, c, -1, -1)) return true;
//       }
//     }
//   }
//   return false;
// };

// const checkCycle = (startChar, arr, visited, r, c, prevR, prevC) => {
//   if (r < 0 || r >= arr.length || c < 0 || c >= arr[0].length) {
//     return false;
//   }
//   if (arr[r][c] !== startChar) {
//     return false; // not the same character; not a valid space
//   }

//   if (visited[r][c]) return true; // found a cycle

//   visited[r][c] = true; // visit this cell

//   // only initiate a DFS call to a cell that is not the parent cell
//   // the nested if statements can also be written on a single line
//   if (r - 1 !== prevR) {
//     if (checkCycle(startChar, arr, visited, r - 1, c, r, c)) return true;
//   }
//   if (r + 1 !== prevR) {
//     if (checkCycle(startChar, arr, visited, r + 1, c, r, c)) return true;
//   }
//   if (c - 1 !== prevC) {
//     if (checkCycle(startChar, arr, visited, r, c - 1, r, c)) return true;
//   }
//   if (c + 1 !== prevC) {
//     if (checkCycle(startChar, arr, visited, r, c + 1, r, c)) return true;
//   }

//   return false; // never encountered a visited cell
// };

const cycleInMatrix = (arr) => {
  const visited = arr.map(subarr => subarr.map(e => false));
  
  for (let r = 0; r < arr.length; r++) {
    for (let c = 0; c < arr[0].length; c++) {
      if (!visited[r][c]) {
        if (hasCycle(arr, visited, arr[r][c], [r, c], [r, c])) {
          // console.log(`Cycle found at start coordinate ${[r, c]}`)
          return true;
        }
      }
    }
  }

  return false;
};

const hasCycle = (arr, visited, char, curr, prev = [-1, -1]) => {
  // We have a cycle if:
  // 1) We traverse to the same cell we started at
  // 2) We never traverse back to the cell we just came from

  const [r, c] = curr;
  if (arr?.[r]?.[c] === undefined) return false; // out of bounds
  if (arr[r][c] !== char) return false; // different character
  if (visited[r][c]) return true; // found a cycle!

  // visit this space
  visited[r][c] = true;

  // visit adjacent cells (but NOT the cell we just came from)
  // example.
  // We came from [5][4] and are not [4][4]. Do NOT go to [r + 1][c] because r + 1 === prevR

  const [prevR, prevC] = prev;

  if (r - 1 !== prevR)
    if (hasCycle(arr, visited, char, [r - 1, c], [r, c])) return true;
  if (r + 1 !== prevR)
    if (hasCycle(arr, visited, char, [r + 1, c], [r, c])) return true;
  if (c - 1 !== prevC) 
    if (hasCycle(arr, visited, char, [r, c - 1], [r, c])) return true;
  if (c + 1 !== prevC)
    if (hasCycle(arr, visited, char, [r, c + 1], [r, c])) return true;

  return false; // never found a cycle
};

// if a matrix has a cycle, we will eventually end up at the original cell while traversing
// but we should not re-visit the same cell we just came from - that would give us a false positive
// 1) traverse the island, store the starting cell (root)
// 2) as we traverse, clear the cells with a null
// 3) DO NOT traverse back to a cellt that we just came from
// 4) If, at any point, we arrive at the starting cell, this island has a cycle!


console.log(cycleInMatrix([
  ['a', 'a', 'a', 'a'],
  ['b', 'a', 'c', 'a'],
  ['b', 'a', 'c', 'a'],
  ['c', 'a', 'a', 'a']
])); // true

console.log(cycleInMatrix([
  ['a', 'a', '_', '_'],
  ['a', 'a', '_', '_'],
  ['_', '_', '_', '_'],
  ['_', '_', '_', '_']
])); // true

console.log(cycleInMatrix([
  ['a', 'a', 'a', 'a'],
  ['a', 'a', 'a', 'a'],
  ['a', 'a', 'a', 'a'],
  ['a', 'a', 'a', 'a']
])); // true

console.log(cycleInMatrix([
  ['a', 'a', 'a', '_'],
  ['_', '_', 'a', '_'],
  ['a', 'a', 'a', '_'],
  ['_', '_', '_', '_']
])); // false

console.log(cycleInMatrix([
  ['a', 'a', '_', 'a'],
  ['_', 'a', 'a', 'a'],
  ['a', 'a', '_', '_'],
  ['_', 'a', 'a', 'a']
])); // false