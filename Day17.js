const input = `#.#.##.#
#.####.#
...##...
#####.##
#....###
##..##..
#..####.
#...#.#.`.split("\n").map(x => x.split(""));

// PART 1
// function main(input) {

//   input = [input];

//   function cycle(input) {
//     let returnArr = []

//     let newI = input.slice(0);
//     let rowC = newI[0][0].map(x => ".");
//     for (let i = 0; i < newI.length; i++) {
//       const dim = newI[i];
//       newI[i].unshift(rowC.slice(0));
//       newI[i].push(rowC.slice(0));
//     }

//     for (let i = 0; i < newI.length; i++) {
//       const dim = newI[i];
//       for (let j = 0; j < dim.length; j++) {
//         const row = dim[j];
//         newI[i][j].unshift(".");
//         newI[i][j].push(".");
//       }
//     }
    
//     const sizeA = newI[0].map(p => p.map( q => "."));
//     newI.unshift(sizeA.slice(0));
//     newI.push(sizeA.slice(0));

//     returnArr = newI.slice(0).map(l => l.slice(0).map(w => w.slice(0)));
//     console.log(returnArr);

//     for (let i = 0; i < newI.length; i++) {
//       const currDimension = newI[i];
//       for (let k = 0; k < currDimension.length; k++) {
//         const currRow = currDimension[k];
//         for (let j = 0; j < currRow.length; j++) {
//           const currN = currRow[j];
 
//           let numReturn = evaluatePos([i, k,j], newI);
//           // console.log([i, k,j], numReturn)
//           if (newI[i][k][j] === "#" && (numReturn != 2 && numReturn != 3)) {
//             returnArr[i][k][j] = ".";
//           } else if (newI[i][k][j] === "." && (numReturn === 3)) {
//             returnArr[i][k][j] = "#";
//           }
//        }
//       }
//     }
//     return returnArr;
//   }

//   function evaluatePos(posArr, input) {
//     let count = 0;
//     const [x,y,z] = posArr;
//     [-1,0,1].map(i => {
//       [-1,0,1].map(j => {
//         [-1,0,1].map(k => {
//           if (i === 0 && j === 0 && k === 0) {

//           } else {
//             if (input[x + i] && input[x + i][y + j] && input[x + i][y + j][z + k] === "#") {
//               count += 1;
//             }
//           }
//         })
//       })
//     })
//     return count;
//   }

//   // cycle(input);

//   for (let i = 0; i <= 5; i++) {
//     input = cycle(input);
//   }

//   let finalCount = 0;
//   input.map(x => {
//     x.map(y => {
//       y.map(z => {
//         if (z === "#") finalCount += 1;
//       })
//     })
//   })
//   console.log("FINS")
//   return finalCount;
//   // console.log(input);
// }

function main(input) {

  input = [[input]];

  function cycle(input) {
    let returnArr = []

    let newI = input.slice(0).map(x => x.slice(0).map(y => y.slice(0).map(z => z.slice(0))));
    // let fullD = newI[0].map(x => x.slice(0).map(y => y.slice(0).map(z => "." )))
    let row1 = newI[0][0].map(x => x.slice(0).map(y => y.slice(0)).map(w => ".") );
    let rowC = newI[0][0][0].map(x => ".");


    for (let i = 0; i < newI.length; i++) {
      const dim = newI[i];

      newI[i].unshift(row1.slice(0));
      newI[i].push(row1.slice(0));
    }


    for (let i = 0; i < newI.length; i++) {
      const dim = newI[i];
      for (let j = 0;  j < dim.length; j++) {
        const dim2 = dim[j];
        newI[i][j].unshift(rowC.slice(0));
        newI[i][j].push(rowC.slice(0));
      }
    }

    for (let i = 0; i < newI.length; i++) {
      const dim = newI[i];
      for (let j = 0; j < dim.length; j++) {
        const row = dim[j];
        for (let k = 0; k < row.length; k++) {
          const copy = newI[i][j][k].slice(0);
          copy.unshift(".");
          copy.push(".");
          newI[i][j][k] = copy;
        }
      }
    }
    
    const sizeA = newI[0].map(x => x.slice(0).map(y => y.slice(0).map(z => "." )))

    newI.unshift(sizeA.slice(0));
    newI.push(sizeA.slice(0));

    returnArr = newI.slice(0).map(l => l.slice(0).map(w => w.slice(0).map(q => q.slice(0))));

    for (let i = 0; i < newI.length; i++) {
      const currDimension = newI[i];
      for (let k = 0; k < currDimension.length; k++) {
        const currRow = currDimension[k];
        for (let j = 0; j < currRow.length; j++) {
          const currN = currRow[j];
          for (let h = 0; h < currN.length; h++) {
            let numReturn = evaluatePos([i, k, j, h], newI);
            if (newI[i][k][j][h] === "#" && (numReturn != 2 && numReturn != 3)) {
              returnArr[i][k][j][h] = ".";
            } else if (newI[i][k][j][h] === "." && (numReturn === 3)) {
              returnArr[i][k][j][h] = "#";
            }
          }
       }
      }
    }
    return returnArr;
  }

  function evaluatePos(posArr, input) {
    let count = 0;
    const [x,y,z,h] = posArr;
    [-1,0,1].map(i => {
      [-1,0,1].map(j => {
        [-1,0,1].map(k => {
          [-1,0,1].map(d => {
            if (i === 0 && j === 0 && k === 0 && d === 0) {

            } else {
              if (input[x + i] && 
                input[x + i][y + j] &&
                input[x + i][y + j][z + k] &&
                input[x + i][y + j][z + k][h + d] === "#") {
                count += 1;
              }
            }
          })
        })
      })
    })
    return count;
  }


  for (let i = 0; i <= 5; i++) {
    input = cycle(input);
  }

  let finalCount = 0;
  input.map(x => {
    x.map(y => {
      y.map(z => {
        z.map(p => {
          if (p === "#") finalCount += 1;
        })
      })
    })
  })
  return finalCount;
}

const output = main(input);
console.log(output);
