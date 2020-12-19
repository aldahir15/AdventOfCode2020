const input = ``.split("\n\n").map(x => x.split("\n"));

const alphabet = "abcdefghijklmnopqrstuvwxyz";

// function main(input) { // part 1
//   let rules = input[0].map(x => x.split(": "));
//   let compare = input[1];
//   let rulesHash = {};
//   rules.map(x => {
//     const indx = x[0];
//     if (x[1].includes(`"`)) {
//       x[1] = x[1].split(`"`);
//       x[1] = x[1][1];
//     }
//     const vals = x[1].split(" | ").map(y => y.split(" "))
//     rulesHash[indx] = vals;
//   })

//   let allPossibilities = {};

//   let parsedString;

//   function dfs(indx) {
//     let val = rulesHash[indx];
//     let overall = [];
//     for (let i = 0; i < val.length; i++) {
//       let temp = [];
//       if (alphabet.indexOf(val[i][0]) != -1) {
//         return (val[i][0]);
//       } else {
//         for (let j = 0; j < val[i].length; j++) {
//           temp.push(dfs(val[i][j]));
//         }
//       }
//       overall.push(temp);
//       if (i != val.length - 1) overall.push("|")
//     }
//     return overall;
//   }


//   let res = (dfs(0)[0]);
//   function parseArr(arr, depth) {
//     // console.log(arr)
//     if (!(arr.constructor === Array)) {
//       return arr;
//     }

//     let finalStr = "";
//     for (let i = 0; i < arr.length; i++) {
//       const currArr = arr[i];
//       let retS;
//       if (currArr.constructor === Array && currArr[0].constructor === Array) {
//         retS = `(${parseArr(currArr, depth + 1)})`
//       } else {
//         retS = `${parseArr(currArr, depth + 1)}`;
//       }
//       finalStr += retS;
//     }

//     return finalStr + "";
//   }

//   const parsedStr = "^" + parseArr(res) + "$";
//   console.log("PARSED", parsedStr)
//   console.log(parsedStr);
//   let reg = new RegExp(parsedStr);
//   return compare.filter(x => x.match(reg)).length

// }

function main(input) {
  let rules = input[0].map(x => x.split(": "));
  let compare = input[1];
  let rulesHash = {};
  rules.map(x => {
    const indx = x[0];
    if (x[1].includes(`"`)) {
      x[1] = x[1].split(`"`);
      x[1] = x[1][1];
    }
    const vals = x[1].split(" ")
    rulesHash[indx] = vals;
  })


  let parsedString;
  let  seenHash = {}

  let res = (pattern(0,15));

  function pattern(key, depth) {
    const rule = rulesHash[key];

    if (depth === 0) return "";
    if (["a","b"].includes(rule[0])) return rule[0];
    retS = "(";
    rule.forEach(k => {
        if (k === "|") {
          retS += k;
        } else {
          retS += pattern(k, depth - 1);
        }
    })
    return retS + ")";
}

  const parsedStr = "^" + res + "$";
  let reg = new RegExp(parsedStr);
  return compare.filter(x => x.match(reg)).length

}


const output = main(input);
console.log(output);