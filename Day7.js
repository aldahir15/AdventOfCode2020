let input = ``.split("\n");

function parseBags(input) {
  let obj = {};
  for (let i = 0; i < input.length; i++) {
    const currI = input[i].split("contain")
    const currBag = currI[0].split("bag")[0];
    let hasBags;
    if (currI[1] != " no other bags.") hasBags = currI[1].split(",").map(x=> x.split("bag")[0].slice(2).trim());
    obj[currBag.trim()] = hasBags;
  }
  return obj;
}

function allShinyGold(input) {
  let [allO,count] = [parseBags(input),0];

  function dfs(key) {
    const futureKeys = allO[key];
    if (!futureKeys) return false;
    if (futureKeys.includes("shiny gold")) return true;
    for (let i = 0; i < futureKeys.length; i++) {
      const currK = futureKeys[i];
      if (dfs(currK)) return true;
    }
  }
  Object.keys(allO).map(x => (dfs(x)) ? count += 1 : 0);
  return count;
}
allShinyGold(input)

// function parseBags2(input) {
//   let obj = {};

//   for (let i = 0; i < input.length; i++) {
//     const currInput = input[i].split("contain")
//     const currBag = currInput[0].split("bag")[0];

//     let hasBags;
//     if (currInput[1] != " no other bags.") {
//       hasBags = currInput[1].split(",").map(x=> x.split("bag")[0].trim()); 
//     }
//     obj[currBag.trim()] = hasBags;
//   }

//   return obj;
// }

// function allShinyGold2(input) {
//   const allO = parseBags2(input);
//   const shinyGold = allO["shiny gold"];

//   function dfs(key) {
//     const keys = allO[key];
//     console.log(key, keys)
//     if (!keys || keys.length === 0) {
//       return 0;
//     }

//     let currA = 0;

//     for (let i = 0; i < keys.length; i++) {
//       const k = keys[i];
//       const num = Number(k.slice(0,1));
//       const nextBag = k.slice(2);

//       currA += (num + num * dfs(nextBag));
//     }
//     return currA;
//   }
//   return dfs("shiny gold");
// }

// allShinyGold2(input)
