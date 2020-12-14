const input = ``.split("\n");

// function main(input) {
//   let direction = "E";
//   let directions = ["N", "E", "S", "W"];
//   let up = 0;
//   let right = 0;
//   let hash = 
//   {"L": -1, 
//   "R": 1,
//   "N": 0,
//   "E": 1,
//   "S": 2,
//   "W": 3};

//   for (let i = 0; i < input.length; i++) {
//     const curr = input[i];

//     const key = curr[0];
//     const val = Number(curr.slice(1))

//     if (key === "L" || key === "R") {
//       const turns = val / 90;

//       let newPos = ((hash[key] * turns) + hash[direction]) % 4;
//       if (newPos < 0) newPos = 4 - Math.abs(newPos); 
//       // console.log(direction, "----", key, val, up, right, "_", newPos)
//       direction = directions[newPos];
//     }
//     if (key === "F") {
//       if (direction === "E") {
//         right += val;
//       } else if (direction === "N") {
//         up += val;
//       } else if (direction === "S") {
//         up -= val;
//       } else if (direction === "W") {
//         right -= val;
//       }
//     }
//     if (key === "E") {
//       right += val;
//     } else if (key === "N") {
//       up += val;
//     } else if (key === "S") {
//       up -= val;
//     } else if (key === "W") {
//       right -= val;
//     }
//   }
//   // console.log(right, up, direction);
//   return Math.abs(up) + Math.abs(right);
// }

// main(input);

function main(input) {
  let directionR = "E";
  let directionU = "N";
  let directions = ["N", "E", "S", "W"];
  let wayPointU = 1;
  let wayPointR = 10;
  let up = 0;
  let right = 0;
  let hash = 
  {"L": -1, 
  "R": 1,
  "N": 0,
  "E": 1,
  "S": 2,
  "W": 3};
  console.log(directionR, directionU, "----", up, right, "_")
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];

    const key = curr[0];
    const val = Number(curr.slice(1))

    if (key === "L" || key === "R") {
      const turns = val / 90;

      let newPos1 = ((hash[key] * turns) + hash[directionR]) % 4;
      if (newPos1 < 0) newPos1 = 4 - Math.abs(newPos1); 

      let newPos2 = ((hash[key] * turns) + hash[directionU]) % 4;
      if (newPos2 < 0) newPos2 = 4 - Math.abs(newPos2)      
      if ([0,2].includes(newPos1)) {
        directionU = directions[newPos1];
      } else {
        directionR = directions[newPos1];
      }
      if ([0,2].includes(newPos2)) {
        directionU = directions[newPos2];
      } else {
        directionR = directions[newPos2];
      }

      if (turns % 2 != 0) {
        const temp1 = wayPointR;
        const temp2 = wayPointU;
        wayPointR = temp2;
        wayPointU = temp1;
      }
      // direction = directions[newPos1];
    }
    if (key === "F") {
      if (directionR === "E") {
        right += wayPointR * (val);
      }
      if (directionU === "N") {
        up += wayPointU * (val);
      }
      if (directionU === "S") {
        up -= wayPointU * (val);
      } 
      if (directionR === "W") {
        right -= wayPointR * (val)
      }
    }
    if (key === "E") {
      if (directionR === "E") {
        wayPointR += val;
      } else {
        wayPointR -= val;
      }
    } else if (key === "N") {
      if (directionU === "N") {
        wayPointU += val;
      } else {
        wayPointU -= val;
      }
    } else if (key === "S") {
      if (directionU === "S") {
        wayPointU += val;
      } else {
        wayPointU -= val;
      }
    } else if (key === "W") {
      if (directionR === "W") {
        wayPointR += val;
      } else {
        wayPointR -= val;
      }
    }
    console.log(directionR, directionU, "----", key, val, up, right, "_", wayPointU, wayPointR)
  }
  // console.log(right, up, direction);
  return Math.abs(up) + Math.abs(right);
}

main(input);


//193
//226509