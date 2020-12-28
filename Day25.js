const input = `10604480
4126658`.split("\n");

//4968512
function main(input) {
  let subjectNum = 7;
  const cardPublicKey = Number(input[0]);
  const doorPublicKey = Number(input[1]);

  let currCardNum = 1;
  let currDoorNum = 1;
  
  let cardLoopSize = 0;
  let doorLoopSize= 0;

  while (currCardNum != cardPublicKey) {
    currCardNum = (currCardNum * subjectNum) % 20201227;
    cardLoopSize += 1;
  }

  while (currDoorNum != doorPublicKey) {
    currDoorNum = (currDoorNum * subjectNum) % 20201227;
    doorLoopSize += 1;
  }

  // console.log(cardLoopSize, doorLoopSize, doorPublicKey);
  
  let curr = 1;
  let i = 0;
  while (i < cardLoopSize) {
    if (curr === 14897079 ) console.log("HUHHHHHH")
    curr = (curr * doorPublicKey) % 20201227;
    i += 1;
  }

  let curr2 = 1;
  let j = 0;
  while (j < doorLoopSize) {
    curr2 = (curr2 * cardPublicKey) % 20201227;
    j += 1;
  }

  console.log(curr, curr2, doorPublicKey, doorLoopSize, cardPublicKey, cardLoopSize)
  return curr === curr2;
}

const output = main(input);
console.log(output);