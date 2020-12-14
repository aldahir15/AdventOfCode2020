const input = ``.split("\n").map(x => x.split(" = "));

// .split("mask = ").slice("map = ").map(x => x.split("\n")).slice(1).map(x => x.map((y,i) => {
//   if (i === 0) return y;
//   return y.split(" = ");
// }))

// function main(input) {
//   if (input[input.length - 1][0] === "") input = input.slice(0, -1);
//   console.log("INPUT", input);

//   let mask = input[0][1];
//   const vals = input.slice(1);
//   const bitVals = vals.map(x => {
//     if (x[0] === "mask") return x;
//     return [x[0], Number(x[1]).toString(2).padStart(mask.length, 0) ]
//   });
//   let mainHash = {};

//   for (let i = 0; i < bitVals.length; i++) {
//     if (bitVals[i][0] === "mask") {
//       console.log(bitVals[i])
//       mask = bitVals[i][1];
//       continue;
//     }
//     const key = bitVals[i][0];
//     const bit = bitVals[i][1];
//     console.log(mask, bit)
//     let newbits = "";

//     for (let j = 0; j < mask.length; j++) {
//       const maskCurr = mask;
//       const bitCurr = bit;

//       if (maskCurr[j] === "X") {
//         // console.log("YES", bitCurr[j])
//         newbits += bitCurr[j];
//       } else {
//         newbits += maskCurr[j];
//       }
//     }
//     // console.log(newbits)
//     mainHash[key] = newbits
//   }

//   console.log(mainHash)
//   const keys = Object.values(mainHash).map(x => parseInt(x, 2));
//   console.log(keys.reduce((x,acc) => x + acc))
//   return keys.reduce((x,acc) => x + acc);
// }


function main(input) {
  if (input[input.length - 1][0] === "") input = input.slice(0, -1);
  console.log("INPUT", input);

  let mask = input[0][1];
  const vals = input.slice(1);
  const bitVals = vals.map(x => {
    if (x[0] === "mask") return x;
    return [x[0].split("[")[1].slice(0,-1), Number(x[1]) ]
  });
  let mainHash = {};

  for (let i = 0; i < bitVals.length; i++) {
    if (bitVals[i][0] === "mask") {
      console.log(bitVals[i])
      mask = bitVals[i][1];
      continue;
    }

    let key = bitVals[i][0];
    const keyBit = Number(key).toString(2).padStart(mask.length, 0);
    const bit = bitVals[i][1];
    console.log(mask, bit)
    let newbits = "";

    for (let j = 0; j < mask.length; j++) {
      const maskCurr = mask;
      const bitCurr = keyBit;

      if (maskCurr[j] === "X") {
        newbits += "X";
      } else if (maskCurr[j] === "1") {
        newbits += "1";
      } else if (maskCurr[j] === "0") {
        newbits += bitCurr[j]; 
      }
    }
    modifyAdresses(newbits, bit);
  }

  function modifyAdresses(address, val, indx = 0) {

    let stack = [address];

    while (stack.length > 0) {
      let curr = stack.pop();

      const index = curr.indexOf("X");
      if (index != -1) {
        ["0","1"].forEach(x => {
          curr = curr.slice(0,index) + x + curr.slice(index + 1);
          stack.push(curr);
        })
      } else {
        const actualNum = parseInt(curr, 2);
        mainHash[actualNum] = val;      
    }
    }
  }


  console.log(mainHash)
  const keys = Object.values(mainHash);
  console.log(keys.reduce((x,acc) => x + acc))
  return keys.reduce((x,acc) => x + acc);
}

main(input);
