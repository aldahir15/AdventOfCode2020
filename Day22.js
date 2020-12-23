const input = ``.split("\n\n").map(x => x.split(":\n")[1]).map(y => y.split("\n"));

let seenGameBefore = {};

function main(input, seen = {}, depth = 0, originalInput) {
  const gameBefore = String(originalInput[0]) + "/" + String(originalInput[1]);
  if (seenGameBefore[gameBefore]) return seenGameBefore[gameBefore];

  const player1 = input[0].map(x => Number(x));
  const player2 = input[1].map(x => Number(x));

  while (player1.length > 0 && player2.length > 0) {
    // console.log(player1);
    // console.log(player2);
    // console.log("_______")

    const deckT = String(player1) + "/" + String(player2);
    console.log(deckT);
    console.log("________", depth)
    if (seen[deckT]) {
      if (depth === 0) {
        return player1.reverse().map((x,i) => x * (i + 1)).reduce((y,acc) => y + acc);
      } else {
        const gameBefore = String(originalInput[0]) + "/" + String(originalInput[1]);
        seenGameBefore[gameBefore] = 1;
        return 1;
      }
    }

    seen[deckT] = true;
    const p1C = player1.shift();
    const p2C = player2.shift();

    if (player1.length >= p1C  && player2.length >= p2C) {
      const winner = main([player1.slice(0,p1C), player2.slice(0,p2C)],{}, depth + 1, [player1.slice(0,p1C), player2.slice(p2C)]);
      if (winner === 1) {
        player1.push(p1C);
        player1.push(p2C);
      } else {
        player2.push(p2C);
        player2.push(p1C);
      }
    } else {
      if (p1C > p2C) {
        // return;
        player1.push(p1C);
        player1.push(p2C);
      } else {
        // return;
        player2.push(p2C);
        player2.push(p1C);
      }
    }

  }

  console.log(player1)
  if (depth == 0) {
    // console.log(player1);
    console.log(player2);
    return player1.concat(player2).reverse().map((x,i) => x * (i + 1)).reduce((y,acc) => y + acc);
  } else {
    const gameBefore = String(originalInput[0]) + "/" + String(originalInput[1]);
    seenGameBefore[gameBefore] = player1.length > 0 ? 1 : 2;
    return player1.length > 0 ? 1 : 2;
  }
}

const output = main(input, {}, 0, input);
console.log(output)