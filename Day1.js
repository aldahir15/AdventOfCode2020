const input = ``.split("\n").map(x => Number(x));

function addsToVal(input) {

  // Part 1 
  // for (let i = 0; i < input.length; i++) {
  //   for (let j = i + 1; j < input.length; j++) {
  //     if (input[i] + input[j] === 2020) {
  //       return input[i] * input[j];
  //     }
  //   }
  // }

  // Part 2
  const hash = {};

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      hash[2020-input[i]-input[j]] = [i,j];
    }
  }  

  for (let k = 0; k < input.length; k++) {
    if (hash[input[k]] && (k != hash[input[k]][0] && k != hash[input[k]][1])) {
      return input[hash[input[k]][0]] * input[hash[input[k]][1]] * input[k];
    }
  }
  return null;
}

// addsToVal(input)