let input = ``;

input = input.split('\n').map(x => Number(x));

// function main(input) { // Part 1
//   input = input.sort((a,b) => a - b);
//   let [count1, count3, currN] = [0,0,0];
//   input.map(n => {
//     if (n - currN === 1) {
//       count1 += 1;
//     } else if (n - currN === 3) {
//       count3 += 1; 
//     }
//     currN = n;
//   })
//   return (count1) * (count3 + 1);
// }

function main(input) { // Part 2
  input = input.sort((a,b) => a - b);
  input.unshift(0);
  let hash = Object.fromEntries(input.map((x,i) => [x,i]));
  let memo = {};
  const max = input[input.length - 1];

  function dfs(i) {
    if (input[i] === max) return 1;
    if (memo[i]) return memo[i];

    let count = 0;
    for (let j = 1; j <= 3; j++) {
      const nextN = input[i] + j; // Possible next number
      if (hash[nextN] != undefined) {
        count += dfs(hash[nextN]);
      }
    }
    memo[i] = count;
    return count;
  }

  return dfs(0);
}


main(input)