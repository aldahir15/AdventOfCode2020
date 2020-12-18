const input = ``.split("\n");

function main(input) {
  input = input.map(x => x.split("").filter(y => y != " ").join(""));
  // console.log(input);
  return input.map(x => dfsMath(x)).reduce((y,acc) => y + acc);
}

// function dfsMath(input) {
//   let nums = "0123456789";
//   let evaluation = 0;
//   let i = 0;
//   while (i < input.length){
//     const currChar = input[i];
//     if (nums.indexOf(currChar) != -1) { // if its a number
//       if (input[i + 1] === "+") {
//         if (input[i + 2] === "(") {
//           let tmpS = "";
//           let j = i + 3;
//           let offSet = 1;
//           while (offSet != 0) {
//             if (input[j] === "(") offSet += 1;
//             if (input[j] === ")") offSet -= 1;
//             if (offSet === 0) break;
//             tmpS += input[j];
//             j += 1;
//           }

//           evaluation += Number(currChar) + dfsMath(tmpS);
//           i = j + 1;
//         } else {
//           evaluation += eval(`${evaluation}` + input.slice(i,i+3));
//           i += 3;
//         }
//       } else if (input[i + 1] === "*") {
//         if (input[i + 2] === "(") {
//           let tmpS = "";
//           let j = i + 3;
//           let offSet = 1;
//           while (offSet != 0) {
//             if (input[j] === "(") offSet += 1;
//             if (input[j] === ")") offSet -= 1;
//             if (offSet === 0) break;
//             tmpS += input[j];
//             j += 1;
//           }

//           evaluation += Number(currChar) * dfsMath(tmpS);
//           i = j + 1;
//         } else {
//           evaluation += eval(`${evaluation}` + input.slice(i,i+3));
//           i += 3;
//         }
//       } else if (input[i + 1] === undefined) {
//         evaluation += Number(currChar);
//         i += 1;
//       }
//     } else if (currChar === "(") {
//       let tmpS = "";
//       let j = i + 1;
//       let offSet = 1;
//       while (offSet != 0) {
//         if (input[j] === "(") offSet += 1;
//         if (input[j] === ")") offSet -= 1;
//         if (offSet === 0) break;
//         tmpS += input[j];
//         j += 1;
//       }
//       evaluation += dfsMath(tmpS);
//       i = j + 1;
//     } else if (currChar === "+") {
//       let res;
//       if (input[i + 1] === "(") {
//         let tmpS = "";
//         let j = i + 2;
//         let offSet = 1;
//         while (offSet != 0) {
//           if (input[j] === "(") offSet += 1;
//           if (input[j] === ")") offSet -= 1;
//           if (offSet === 0) break;
//           tmpS += input[j];
//           j += 1;
//         }

//         res = dfsMath(tmpS)
//         i = j + 1;
//       } else {
//         res = Number(input[i + 1]);
//         i += 2;
//       }
//       evaluation += res;
//     } else if (currChar === "*") {
//       let res;
//       if (input[i + 1] === "(") {
//         let tmpS = "";
//         let j = i + 2;
//         let offSet = 1;
//         while (offSet != 0) {
//           if (input[j] === "(") offSet += 1;
//           if (input[j] === ")") offSet -= 1;
//           if (offSet === 0) break;
//           tmpS += input[j];
//           j += 1;
//         }

//         res = dfsMath(tmpS)
//         i = j + 1;
//       } else {
//         res = Number(input[i + 1]);
//         i += 2;
//       }
//       evaluation *= res;
//     }
//   }
//   return evaluation;
// }

function dfsMath(input) { // Part 2
  let nums = "0123456789";
  let evaluation = 0;
  let i = 0;
  while (i < input.length){
    const currChar = input[i];
    if (nums.indexOf(currChar) != -1) { // if its a number
      if (input[i + 1] === "+") {
        if (input[i + 2] === "(") {
          let tmpS = "";
          let j = i + 3;
          let offSet = 1;
          while (offSet != 0) {
            if (input[j] === "(") offSet += 1;
            if (input[j] === ")") offSet -= 1;
            if (offSet === 0) break;
            tmpS += input[j];
            j += 1;
          }

          evaluation += Number(currChar) + dfsMath(tmpS);
          i = j + 1;
        } else {
          evaluation += eval(`${evaluation}` + input.slice(i,i+3));
          i += 3;
        }
      } else if (input[i + 1] === "*") {
        evaluation += Number(currChar) * dfsMath(input.slice(i + 2));
        break;
      } else if (input[i + 1] === undefined) {
        evaluation += Number(currChar);
        i += 1;
      }
    } else if (currChar === "(") {
      let tmpS = "";
      let j = i + 1;
      let offSet = 1;
      while (offSet != 0) {
        if (input[j] === "(") offSet += 1;
        if (input[j] === ")") offSet -= 1;
        if (offSet === 0) break;
        tmpS += input[j];
        j += 1;
      }
      evaluation += dfsMath(tmpS);
      i = j + 1;
    } else if (currChar === "+") {
      let res;
      if (input[i + 1] === "(") {
        let tmpS = "";
        let j = i + 2;
        let offSet = 1;
        while (offSet != 0) {
          if (input[j] === "(") offSet += 1;
          if (input[j] === ")") offSet -= 1;
          if (offSet === 0) break;
          tmpS += input[j];
          j += 1;
        }

        res = dfsMath(tmpS)
        i = j + 1;
      } else {
        res = Number(input[i + 1]);
        i += 2;
      }
      evaluation += res;
    } else if (currChar === "*") {
      evaluation *= dfsMath(input.slice(i + 1))
      break;
    }
  }
  return evaluation;
}

const output = main(input);
console.log(output);
