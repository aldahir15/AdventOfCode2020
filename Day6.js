//6
let input = ``;
const newInput = (input.split(",,").map(x => x.split(",")));


function howMany(input) {
  let obj = {};
  input.map(cI => [...cI].map(nI => obj[nI] ? obj[nI] += 1 : obj[nI] = 1))
  // return Object.keys(obj).length; //Part 1
  return Object.keys(obj).filter(x => obj[x] >= input.length).length; // Part 2
}
newInput.map(x => howMany(x)).reduce((a,b) => a + b);