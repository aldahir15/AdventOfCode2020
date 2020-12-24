const Honeycomb = require('honeycomb-grid')
const Hex = Honeycomb.extendHex({ orientation: 'pointy', color: "white" })
const Grid = Honeycomb.defineGrid(Hex)
const grid = Grid.hexagon({ radius: 500 });
console.log(grid.length)
let allNodeMap = new Map();
let neighborMap = new Map();
grid.map((x,i) => {
  console.log(i, "out of", grid.length)
  let currX = x.x;
  let currY = x.y;

  
  let carti = Hex().cartesianToCube(x)
  let q = carti.q;
  let r = carti.r;
  let s = carti.s;


  allNodeMap.set(`${q},${r},${s}`, x);

  let neigh = [];
  [[1,0,-1],[0,1,-1],[-1,1,0],[-1,0,1],[0,-1,1],[1,-1,0]].map(arr => {
    const node = `${q + arr[0]},${r + arr[1]},${s + arr[2]}`;
    neigh.push(node);
  }) 
  neighborMap.set(x, neigh);
  x.color = "white"
})
const input = ``.split("\n");

function main(input) {
  let locationBlack = new Map();
  input.map(x => {
    flip(x, locationBlack);
  })

  part2(100, locationBlack);

  let count = 0;
  let seen = {};
  function countBlack() {
    grid.map((x,i) => {
      if (x.color === "black") count += 1;
    })
  }

  countBlack();
  console.log("STOP", count);
  return count;

}

const output = main(input);
console.log(output);

function part2(iter, locationBlack) {
  let i = 0;
  while (i < iter) {
    console.log("LOADING", i + 1)
    let hold = new Map();
    let iterArr = Array.from( locationBlack.keys() );
    iterArr.map(x => {
      let n = neighborMap.get(x);
      n = n.map(node => allNodeMap.get(node));
      n.push(x);
      n.map(z => {
        if (z.color === "black") {
          let neighbors = neighborMap.get(z);
          neighbors = neighbors.map(node => allNodeMap.get(node))
          let filteredNeighbors = neighbors.filter(y => y && y.color === "black");
          if (filteredNeighbors.length === 0 || filteredNeighbors.length > 2) {
            hold.set(z, true);
          }
        } else if (z.color === "white") {
          let neighbors = neighborMap.get(z);
          neighbors = neighbors.map(node => allNodeMap.get(node))
          let filteredNeighbors = neighbors.filter(y => y && y.color === "black");
          if (filteredNeighbors.length === 2) {
            hold.set(z, true)
          }
        }
      })
    })
    Array.from( hold.keys() ).map(x => {
      if (x.color === "white") {
        x.color = "black";
        locationBlack.set(x, true)
      } else if (x.color === "black") {
        x.color = "white";
        locationBlack.delete(x)
      }
    })
    i += 1;
  }
}

function flip(string, locationBlack) {
  let currStr = string;
  let currNode = {x: 0, y: 0};

  while (currStr.length > 0) {
    let carti = Hex().cartesianToCube(currNode)
    let q = carti.q;
    let r = carti.r;
    let s = carti.s;

    let potentialTwo = currStr.slice(0,2);

    if (potentialTwo === "ne") {
      // const neighbor = grid.neighborsOf(Hex(currNode.x, currNode.y), "NE")[0]
      const neighbor = allNodeMap.get(`${q + 1},${r - 1},${s}`)
      currNode = neighbor;
      currStr = currStr.slice(2);
    } else if (potentialTwo === "nw") {
      // const neighbor = grid.neighborsOf(Hex(currNode.x, currNode.y), "NW")[0]
      const neighbor = allNodeMap.get(`${q},${r - 1},${s + 1}`)
      currNode = neighbor;
      currStr = currStr.slice(2);
    } else if (potentialTwo === "se") {
      // const neighbor = grid.neighborsOf(Hex(currNode.x, currNode.y), "SE")[0]
      const neighbor = allNodeMap.get(`${q},${r + 1},${s - 1}`)
      currNode = neighbor;
      currStr = currStr.slice(2);
    } else if (potentialTwo === "sw") {
      // const neighbor = grid.neighborsOf(Hex(currNode.x, currNode.y), "SW")[0]
      const neighbor = allNodeMap.get(`${q - 1},${r + 1},${s}`)
      currNode = neighbor;
      currStr = currStr.slice(2);
    } else if (currStr[0] === "e") {
      // const neighbor = grid.neighborsOf(Hex(currNode.x, currNode.y), "E")[0]
      const neighbor = allNodeMap.get(`${q + 1},${r},${s - 1}`)
      currNode = neighbor;
      currStr = currStr.slice(1);
    } else if (currStr[0] === "w") {
      // const neighbor = grid.neighborsOf(Hex(currNode.x, currNode.y), "W")[0]
      const neighbor = allNodeMap.get(`${q - 1},${r},${s + 1}`)
      currNode = neighbor;
      currStr = currStr.slice(1);
    }
  }
  let actualPoint = grid.get(Hex(currNode.x, currNode.y));
  if (actualPoint.color === "white") {
    actualPoint.color = "black";
    locationBlack.set(actualPoint, true)
  } else {
    actualPoint.color = "white";
    locationBlack.delete(actualPoint)

  }
}