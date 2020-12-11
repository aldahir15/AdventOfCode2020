// 3
const input = ``.split(",");


function countOfTrees(input, slope = [3,1]) {
  let [x,y,count] = [0,0,0];
  while (y < input.length) {
    if (input[y][x] === "#") count += 1;
    [x,y] = [(x + slope[0]) % input[0].length, y + slope[1]];
  }
  return count;
}

[[1,1],[3,1],[5,1],[7,1],[1,2]].map(slope => countOfTrees(input,slope)).reduce((a,b) => a * b);