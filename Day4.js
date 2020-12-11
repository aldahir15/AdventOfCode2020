// Try Hard Mini Mode
const keys = {"byr": (val) => (Number(val) >= 1920 && Number(val) <= 2002),
  "iyr": (val) => (Number(val) >= 2010 && Number(val) <= 2020),
  "eyr": (val) => (Number(val) >= 2020 && Number(val) <= 2030),
  "hgt": (val) => {
    const [measurement,hgtNum] = [val.slice(-2), val.slice(0,-2)];
    if (measurement === "in") return (hgtNum >= 59 && hgtNum <= 76);
    if (measurement === "cm") return (hgtNum >= 150 && hgtNum <= 193);
  },
  "hcl": (val) => (val[0] === "#" && containsAlpha("0123456789abcdef", val.slice(1))),
  "ecl": (val) => (["amb","blu","brn","gry","grn","hzl","oth"].indexOf(val) != -1),
  "pid": (val) => (val.length === 9 && containsAlpha("0123456789", val))};
const isValid = (input) => input.filter(currInput => {
    const [currID, val] = [currInput.slice(0,3), currInput.slice(4)];
    // if (necessary[currID]) count -= 1; // Part 1
    return (keys[currID] && keys[currID](val)); // Part 2
  }).length === 7;
const containsAlpha = (alphabet, val) => val.split("").every(char => alphabet.indexOf(char) != -1);
const countValid = (input) => input.filter(currInput => isValid(currInput)).length;



// //4 
// function isValid(input) {
//   const keys = ["byr", "iyr","eyr","hgt","hcl","ecl","pid"];
//   const necessary = Object.assign(...keys.map(v => ({ [v]: true })))
//   let count = keys.length;

//   for (let i = 0; i < input.length; i++) {
//     const currID = input[i].slice(0,3);
//     // if (necessary[currID]) count -= 1; Part 1
//     //Part 2
//     const val = input[i].slice(4);
//     const num = Number(val);
//     switch(currID) {
//       case "byr":
//         if (num >= 1920 && num <= 2002) count -= 1;
//         break;
//       case "iyr":
//         if (num >= 2010 && num <= 2020) count -= 1;
//         break;
//       case "eyr":
//         if (num >= 2020 && num <= 2030) count -= 1;
//         break;
//       case "hgt":
//         const measurement = val.slice(-2);
//         const hgtNum = Number(val.slice(0,-2));
//         if (measurement === "in") {
//           if (hgtNum >= 59 && hgtNum <= 76) count -= 1
//         } else if (measurement === "cm") {
//           if (hgtNum >= 150 && hgtNum <= 193) count -= 1;
//         }
//         break;
//       case "hcl":
//         if (val[0] === "#" && containsAlpha("0123456789abcdef", val.slice(1))) count -= 1;
//         break;
//       case "ecl":
//         if ("amb blu brn gry grn hzl oth".split(" ").indexOf(val) != -1) count -=1;
//         break;
//       case "pid":
//         if (val.length === 9 && containsAlpha("0123456789", val)) count -=1
//         break;
//     }
//   }

//   if (count === 0) return true;
//   return false;
// }

// function containsAlpha(alphabet, val) {
//   return val.split("").every(char => alphabet.indexOf(char) != -1);
// }

// function countValid(input) {
//   let count = 0;
//   for (let j = 0; j < input.length; j++) {
//     if (isValid(input[j])) count += 1;
//   }
//   return count;
// }


const input = ``
// LETS CONVERT TO OBJECTS!
let newInput = [];
let lastIndx = 0;
for (let i = 0; i < input.length; i++) {
  const char = input[i];
  if (char === "\n" && input[i + 1] === "\n") {
    let currSubS = input.slice(lastIndx,i);
    lastIndx = i + 2;
    newInput.push(currSubS);
  }
}
newInput.push(input.slice(lastIndx));
newInput = newInput.map(input => input.split("\n").join(" ").split(" "))
countValid(newInput);
