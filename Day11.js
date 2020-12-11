let input = ``;
input = input.split('\n');

// function main(input) { // Part 1
//   let state = {};
//   let lastState = input;

//   function goThrough(str) {
//     console.log("Entry",str)
//     let newArr = [];
//     for (let i = 0; i < str.length; i++) {
//       let newRow = [];
//       const currRow = str[i];
//       for (let j = 0; j < currRow.length; j++) {
//         const currSeat = currRow[j];
//         if (currSeat === "#") {
//           if (howMany(lastState, i, j, "#") >= 4) {
//             newRow.push("L");
//           } else {
//             newRow.push(currSeat);
//           }
//         } else if (currSeat === "L") {
//           if (howManyFree(lastState,i,j,["L","."]) === 8) {
//             newRow.push("#");
//           }  else {
//             newRow.push(currSeat);
//           }
//         } else {
//           newRow.push(currSeat);
//         }

//       }
//       // console.log("ROW", newRow)
//       newArr.push(newRow.join(""));
//     }
//     lastState = newArr;
//     if (state[newArr]) return howManyOccupied(newArr);
//     state[newArr] = true; 
//     // console.log("newARr", newArr)
//     return 0;
//   }

//   let val = goThrough(lastState);
//   while (val === 0) {
//     val = goThrough(lastState);
//   }
//   return val;
// }


// function howMany(lastState, i, j, action) {
//   let count = 0;
//   if (lastState[i - 1] && lastState[i - 1][j] === action) {
//       count += 1;
//     }
//     if (lastState[i - 1] && lastState[i - 1][j - 1] === action) {
//       count += 1;
//     }
//     if (lastState[i - 1] && lastState[i - 1][j + 1] === action) {
//       count += 1;
//     }
//     if (lastState[i + 1] && lastState[i + 1][j] === action) {
//       count += 1;
//     }
//     if (lastState[i + 1] && lastState[i + 1][j - 1] === action) {
//       count += 1;
//     }
//     if (lastState[i + 1] && lastState[i + 1][j + 1] === action) {
//       count += 1;
//     }
//     if (lastState[i][j - 1] === action) {
//       count += 1;
//     }
//     if (lastState[i][j + 1] === action) {
//       count += 1;
//     }
//     return count;
// } 

// function howManyFree(lastState, i, j, action) {
//   let count = 0;
//   if (!lastState[i - 1] || lastState[i - 1][j] != "#") {
//       count += 1;
//     }
//     if (!lastState[i - 1] || lastState[i - 1][j - 1] != "#") {
//       count += 1;
//     }
//     if (!lastState[i - 1] || lastState[i - 1][j + 1] != "#") {
//       count += 1;
//     }
//     if (!lastState[i + 1] || lastState[i + 1][j] != "#") {
//       count += 1;
//     }
//     if (!lastState[i + 1] || lastState[i + 1][j - 1] != "#") {
//       count += 1;
//     }
//     if (!lastState[i + 1] || lastState[i + 1][j + 1] != "#") {
//       count += 1;
//     }
//     if (lastState[i][j - 1] != "#") {
//       count += 1;
//     }
//     if (lastState[i][j + 1] != "#") {
//       count += 1;
//     }
//     return count;
// } 

// function howManyOccupied(input) {
//   let count = 0;
//   for (let i = 0; i < input.length; i++) {
//     const currRow = input[i];
//     for (let j = 0; j < currRow.length; j++) {
//       const currSeat = currRow[j];
//       if (currSeat === "#") count += 1;
//     }
//   }
//   return count;
// }
// main(input);



function main(input) { // Part 2
  let state = {};
  let lastState = input;

  function goThrough(str) {
    let newArr = [];
    for (let i = 0; i < str.length; i++) {
      let newRow = [];
      const currRow = str[i];
      for (let j = 0; j < currRow.length; j++) {
        const currSeat = currRow[j];
        if (currSeat === "#") {
          if (howMany(lastState, i, j, "#") >= 5) {
            newRow.push("L");
          } else {
            newRow.push(currSeat);
          }
        } else if (currSeat === "L") {
          if (howManyFree(lastState,i,j,["L","."]) === 8) {
            newRow.push("#");
          }  else {
            newRow.push(currSeat);
          }
        } else {
          newRow.push(currSeat);
        }

      }
      newArr.push(newRow.join(""));
    }
    lastState = newArr;
    if (state[newArr]) return howManyOccupied(newArr);
    state[newArr] = true; 
    return 0;
  }

  let val = goThrough(lastState);
  while (val === 0) {
    val = goThrough(lastState);
  }
  return val;
}


function howMany(lastState, i, j, action) {
  let count = 0;
  if (lastState[i - 1] && inPath(lastState,i,j,-1,0,"#")) {
      count += 1;
  }
  if (lastState[i - 1] && inPath(lastState,i,j,-1,-1,"#")) {
    count += 1;
  }
  if (lastState[i - 1] && inPath(lastState,i,j,-1,1,"#")) {
    count += 1;
  }
  if (lastState[i + 1] && inPath(lastState,i,j,1,0,"#")) {
    count += 1;
  }
  if (lastState[i + 1] && inPath(lastState,i,j,1,-1,"#")) {
    count += 1;
  }
  if (lastState[i + 1] && inPath(lastState,i,j,1,1,"#")) {
    count += 1;
  }
  if (inPath(lastState,i,j,0,-1,"#")) {
    count += 1;
  }
  if (inPath(lastState,i,j,0,1,"#")) {
    count += 1;
  }
  return count;
}

function howManyFree(lastState, i, j, action) {
  let count = 0;
  if (!lastState[i - 1] || inPath(lastState,i,j,-1,0,"L")) {
      count += 1;
  }
  if (!lastState[i - 1] || inPath(lastState,i,j,-1,-1,"L")) {
    count += 1;
  }
  if (!lastState[i - 1] || inPath(lastState,i,j,-1,1,"L")) {
    count += 1;
  }
  if (!lastState[i + 1] || inPath(lastState,i,j,1,0,"L")) {
    count += 1;
  }
  if (!lastState[i + 1] || inPath(lastState,i,j,1,-1,"L")) {
    count += 1;
  }
  if (!lastState[i + 1] || inPath(lastState,i,j,1,1,"L")) {
    count += 1;
  }
  if (inPath(lastState,i,j,0,-1,"L")) {
    count += 1;
  }
  if (inPath(lastState,i,j,0,1,"L")) {
    count += 1;
  }
  return count;
} 

function inPath(lastState, i,j, x,y, val) {
  if (val === "L") {
    let k = 1;
    while (i + (k * x) >= 0 && i + (k * x) < lastState.length &&
          j + (k * y) >= 0 && j + (k * y) < lastState[0].length) {
      if (lastState[i + (k * x)][j + (k * y)] === "L") {
        return true;
      } else if (lastState[i + (k * x)][j + (k * y)] === "#") {
        return false;
      }
      k += 1
    }
    return true;
  } else {
    let k = 1;
    while (i + (k * x) >= 0 && i + (k * x) < lastState.length &&
          j + (k * y) >= 0 && j + (k * y) < lastState[0].length) {
      if (lastState[i + (k * x)][j + (k * y)] === "#") {
        return true;
      } else if (lastState[i + (k * x)][j + (k * y)] === "L") {
        return false;
      }
      k += 1
    }
    return false;
  }
}

function howManyOccupied(input) {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const currRow = input[i];
    for (let j = 0; j < currRow.length; j++) {
      const currSeat = currRow[j];
      if (currSeat === "#") count += 1;
    }
  }
  return count;
}
main(input);