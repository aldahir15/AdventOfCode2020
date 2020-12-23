import {hopcroftKarp} from 'hopcroft-karp'

const input=``.split("\n");

function main(input) {
  input = input.map(x => x.split(" (contains "));
  input = input.map(x => [x[0].split(" "), x[1].slice(0,-1).split(", ")])
  let weightHash = {};
  let allIngredients = [];
  let seenIngrdients = {};
  let seenAllergens = {};


  function iter() { 
    for(let i = 0; i < input.length; i++) {
      const sentence = input[i];
      const gibberish = sentence[0];
      const ingrdients = sentence[1];
      allIngredients = allIngredients.concat(gibberish);
      let gibbLen = gibberish.length;
      let ingrLen = ingrdients.length;

        for (let j = 0; j < ingrdients.length; j++) {
          const ingr = ingrdients[j];
          if (weightHash[ingr]) {
            weightHash[ingr].push(gibberish)
          } else {
            weightHash[ingr] = [];
            weightHash[ingr].push(gibberish)
          }
        }
      }
    }
  iter()  
  // console.log(weightHash);
  let taken = {};

  const keys = Object.keys(weightHash);
  keys.map(k => {
    if (weightHash[k].length === 1) {
      weightHash[k] = weightHash[k][0]
    } else {
      weightHash[k] = intersection(...weightHash[k])
    }

    weightHash[k].map(x => {
      taken[x] = true;
    })

  })

  let count = 0;

  allIngredients.map(ingr => {
    if (!taken[ingr]) count += 1;
  })
  console.log(taken);

  const newH = hopcroftKarp(weightHash)
  console.log(newH)
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  console.log(Object.keys(newH).sort().map(x => newH[x]).join(","));
  // console.log("HOPF")


  return count;
  
}

const output = main(input);
console.log(output);

function intersection() {
  var result = [];
  var lists;

  if(arguments.length === 1) {
    lists = arguments[0];
  } else {
    lists = arguments;
  }

  for(var i = 0; i < lists.length; i++) {
    var currentList = lists[i];
    for(var y = 0; y < currentList.length; y++) {
        var currentValue = currentList[y];
      if(result.indexOf(currentValue) === -1) {
        var existsInAll = true;
        for(var x = 0; x < lists.length; x++) {
          if(lists[x].indexOf(currentValue) === -1) {
            existsInAll = false;
            break;
          }
        }
        if(existsInAll) {
          result.push(currentValue);
        }
      }
    }
  }

  return result;
}