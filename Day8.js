const input = ``.split("\n");


// function infL(input) {
//   // console.log(input);
//   let seenObj = {};

//   let indx = 0;
//   let count = 0;
//   let iter = 0;

//   let pastInstruct = 0;
//   while (indx < input.length) {
//     iter += 1;
//     if (iter >= 10000) {
//       return null;
//     }
//     if (seenObj[indx]) {
//       seenObj[indx] += 1;  
//     } else {
//       seenObj[indx] = 1;
//     }
//     pastInstruct = input[indx]

//     const type = input[indx].slice(0,3);
//     const val = Number(input[indx].slice(4));

//     if (type === "acc") {
//       count += val;
//       indx += 1;
//     } else if (type === "jmp") {
//       indx += val;
//     } else if (type === "nop") {
//       indx += 1;
//     }

//   }
//   console.log("DONE", count);
//   return true;
// }

for (let i = 0; i < input.length; i++) {
  const currI = input[i];
  const type = input[i].slice(0,3);
  if (type === "jmp") {
    let newI = input.slice(0);
    newI[i] = "nop +0";
    if (infL(newI)) console.log(i, input[i]);
  }
}
// infL(input);

function infL(input) {
  // console.log(input);
  let seenObj = {};

  let indx = 0;
  let count = 0;

  let pastInstruct = 0;
  let pastInstructType = "";
  while (indx < input.length) {
    if (seenObj[indx] && seenObj[indx][pastInstruct] > 10) {
    console.log(seenObj)
    console.log(pastInstruct);
    return pastInstruct;
    } 

    if (seenObj[indx] && seenObj[indx][pastInstruct]) {
      seenObj[indx][pastInstruct] += 1;
    }
    else if (seenObj[indx]) {
      seenObj[indx][pastInstruct] = 1;
    } else {
      seenObj[indx] = {[pastInstruct]: 1}
    }

    pastInstruct = indx

    const type = input[indx].slice(0,3);
    const val = Number(input[indx].slice(4));

    pastInstructType = type;

    if (type === "acc") {
      count += val;
      indx += 1;
    } else if (type === "jmp") {
      indx += val;
    } else if (type === "nop") {
      indx += 1;
    }

  }
  console.log("DONE", count);
}

function goThrough(input) {
  let indx = 0;
  let count = 0;
  while (indx < input.length) {

    const type = input[indx].slice(0,3);
    const val = Number(input[indx].slice(4));

    if (type === "acc") {
      count += val;
      indx += 1;
    } else if (type === "jmp") {
      indx += val;
    } else if (type === "nop") {
      indx += 1;
    }

  }

  return count;
}

const badIndex = infL(input);
console.log(input[badIndex])
const newInput = input.slice(0);
newInput[badIndex] = "nop +0";
goThrough(newInput)


//286 jmp +165