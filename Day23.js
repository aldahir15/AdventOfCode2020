const input = `643719258`.split("").map(x => Number(x));

class Node {
  constructor(val, prev, next) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }

  addNext(node) {
    this.next = node;
  }

  addPrev(node) {
    this.prev = node;
  }
}

// function main(input, moves) { // Part 1
//   let i = 0;
//   let currIndx = 0;
//   while (i < moves) {
//     // console.log(i + 1, input);
//     const curr = input[currIndx];
//     let hold = input.splice(currIndx + 1, 3);
//     if (hold.length < 3) {
//       hold = hold.concat(input.splice(0, 3 - hold.length));
//     }

//     let findVal = curr - 1;
//     let foundIndx = input.indexOf(findVal);
//     while (foundIndx === -1) {
//       findVal -= 1;
//       foundIndx = input.indexOf(findVal);

//       if (findVal < 0) {
//         findVal = Math.max(...input.slice(0,currIndx).concat(input.slice(currIndx + 1)));
//         foundIndx = input.indexOf(findVal);
//       }
//     }

//     input.splice(foundIndx + 1, 0, ...hold);
//     currIndx = (input.indexOf(curr) + 1) % input.length;

//     i += 1;
//   }
//   return input;
// }

function main(initialNode, moves) { // part 2

  let nodeHash = {};
  let travN = initialNode;
  let j = 0;
  while (travN != initialNode || j === 0) {
    nodeHash[travN.val] = travN;
    travN = travN.next;
    j += 1;
  }

  let maxNode = initialNode.prev;
  let currNode = initialNode;
  
  let i = 0;
  while (i < moves) {
    // console.log(i + 1, "CURR:", currNode.val, "PREV:", currNode.prev.val, "NEXT:", currNode.next.val);
    
    const currV = currNode.val;
    const hold1 = currNode.next;
    const hold2 = hold1.next;
    const hold3 = hold2.next;
    
    hold1.prev = null; // Cutting out previous of holding nodes
    currNode.next = hold3.next;

    hold3.next.prev = currNode;
    hold3.next = null; // Cutting out next of holding nodes

    let hold = [hold1, hold2, hold3];

    let findVal = currV - 1;
    let findNode = currNode.next

    

    let holdVals = hold.map(x => x.val);

    // if (i === 500000) console.log("SOMEONE", i, currNode.prev.val, currNode.val, currNode.next.val);
    // if (i === 500000) console.log("SOMEONE", i, nodeHash[1].prev.val, nodeHash[1].val, nodeHash[1].next.val);

    while (holdVals.includes(findVal)) {
      findVal -= 1;
    } 

    findNode = nodeHash[findVal];

    let addToNode;
    if (findVal > 0 && findNode.val === findVal) {
      addToNode = findNode;
    } else {
      let currMax = 1000000;
      while (holdVals.includes(currMax)) {
        currMax -= 1;
      }

      addToNode = nodeHash[currMax];
    }

    const holdNext = addToNode.next;
    addToNode.next = hold1;
    hold1.prev = addToNode;
    hold3.next = holdNext;
    holdNext.prev = hold3;

    currNode = currNode.next;

    i += 1;
  }

  return nodeHash[1].next.val * nodeHash[1].next.next.val;
}

// Part 2 input -> 1,000,000
let max = Math.max(...input) + 1;
let initialNode;
let holdNode;
input.map((x,i) => {
  if (i === 0) {
    let currN = new Node(x);
    initialNode = currN;
    holdNode = currN;
  } else {
    let currN = new Node(x);
    currN.addPrev(holdNode);
    holdNode.addNext(currN);
    holdNode = currN;
  }
})

let valz = 10;
while (valz <= 1000000) {
  // console.log(valz);
  const t = new Node(valz);
  t.prev = holdNode;
  t.next = initialNode;

  holdNode.next = t;
  initialNode.prev = t;

  holdNode = t;
  valz += 1;
}

const output = main(initialNode, 10000000);
console.log(output);
