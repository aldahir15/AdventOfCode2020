let input = ``;
input = input.split('\n').map(x => Number(x));

// function main(input) { // Part 1
//   for (let i = 25; i < input.length; i++) {
//     if (!within(input.slice(i - 25,i),input[i])) return input[i]
//   }
// }

// function within(arr, num) {
//   const hash = Object.fromEntries(arr.map(x=>[num-x,true]));
//   return arr.some(num => hash[num] != undefined);
// }

// main(input);

//21806024

function main(input, num) { // Part 2
  let [i,j,hash,sum] = [0,0,{[input[0]]: true},input[0]];
  while (i < input.length) {
    if (sum === num && j != 0) {
      return Math.max(...Object.keys(hash)) + Math.min(...Object.keys(hash))}
    hash[input[j]] = true
    if (sum < num) {
      j+= 1;
      sum += input[j];
    } else {
      delete hash[input[i]];
      sum -= input[i];
      i += 1;
    }
  }
}

main(input, 21806024)
//2986195