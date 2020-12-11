//5

const input = ``.split(",");

function boardingPass(inp) {
  let [l,h,s,f,r] = [0,127,0,(x,y)=>h=Math.floor((x + y) / 2),(x,y)=>l=Math.ceil((x + y) / 2)];
  const funcs = {"F":f,"L":f,"B":r,"R":r}
  Array(10).fill().map((x,i) => {
    if (i === 7) [s,l,h,] = [h,0,7,funcs[inp[i]](h,l)]
    funcs[inp[i]](h,l);
    });
 return (s * 8) + h;
}

// function boardingPass(input) {
//   const [l, h, l2, h2] = [0, 127, 0, 7];
//   Array(8).map((x,i) => input[i] === "F" ? h = Math.floor((h + l) / 2) : l = Math.ceil((h + l) / 2));
//   Array(3).map((x,i) => input[i] === "L" ? h2 = Math.floor((h2 + l2) / 2) : l2 = Math.ceil((h2 + l2) / 2))

//  return (highest * 8) + highest2;
// }

// function iterateAll(input) {
//   let max = 0;

//   for (let i = 0; i < input.length; i++) {
//     const currInput = input[i];
//     const currVal = boardingPass(currInput);
//     if (currVal > max) max = currVal;
//   }

//   return max; // Part 1

//   let retArr = []
//   for (let i = 0; i < input.length; i++) {
//     const currInput = input[i];
//     const currVal = boardingPass(currInput);
//     retArr.push(currVal);
//   }

//   retArr = retArr.sort((a,b) => a - b);
//   retArr.map((x,i) => {
//     if (retArr[i - 1] != x - 1) {
//       console.log(retArr[i - 1],retArr[i + 1])
//     }
//   }) // Part 2
// }

// boardingPass("BBFFBBFRLL")

Math.max(...input.map(x => boardingPass(x)));
