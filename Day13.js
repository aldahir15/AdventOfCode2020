const input = ``.split("\n");

// function main(input) {
//   const start = Number(input[0]);
//   const vals = input[1].split(",").filter(x => x != "x").map(x => Number(x));

//   let minVal = Infinity;
//   let minKey;

//   for (let i = 0; i < vals.length; i++) {
//     const currV = vals[i];
//     // console.log(start, currV)
//     let mult = Math.ceil(start/currV);
//     // console.log(mult)
//     if (minVal > ((mult * currV) - start)) {
//       minVal = ((mult * currV) - start);
//       minKey = currV;
//     }
//   }
//   return minVal * minKey;
// }

function main(input) {
  let mainHash = {};
  let vals = input[1].split(",").map((x,i) => {
    if (x === "x") return x;
    mainHash[x] = i;
    return Number(x);
  }).filter(x => x != "x");

  let grow = 0;
  let addBy = 1;

  for (let i = 0; i < vals.length; i++) {
    const currV = vals[i];
    const currVIndex = mainHash[currV];
    while (true) {
      if ((grow + currVIndex) % currV === 0) {
        addBy *= currV;
        break;
      } else {
        grow += addBy;
      }
    }
  }

  return grow;
}