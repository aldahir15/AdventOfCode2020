const input = `1,0,18,10,19,6`.split(",");

function main(input, iter) {
  let hash = {};
  let lastNum = input[input.length - 1];
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (!hash[curr]) {
      hash[curr] = [i + 1];
    } else {
      hash[curr].push(i + 1);
    }
  }

  let i = input.length;
  while (i <= iter) {
    console.log(i, lastNum);
    if (hash[lastNum].length <= 1) {
      lastNum = 0;
      if (hash[0]) {
        hash[0].push(i + 1);
        if (hash[0].length > 2) {
          hash[0] = hash[0].slice(-2);
        }
      } else {
        hash[0] = [i + 1];
      }
    } else {
      const arrT = hash[lastNum];
      lastNum = arrT[arrT.length - 1] - arrT[arrT.length - 2];
      if (hash[lastNum]) {
        hash[lastNum].push(i + 1);
        if (hash[lastNum].length > 2) {
          hash[lastNum] = hash[lastNum].slice(-2);
        }
      } else {
        hash[lastNum] = [i + 1];
      }
    }

    i += 1;
    if (i === iter) return lastNum;
  }

}

const output = main(input, 30000000);
console.log(output);
//10613991 after a long time