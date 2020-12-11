 const input = ``.split("\n"); // INPUT HERE
function validCount(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    const currItem = arr[i];
    const firstPart = currItem.split(":");
    firstPart[0] = firstPart[0].split(" ");
    if (isValid(firstPart)) count += 1;
  }

  return count;
}

// Part 1
function isValid(arr) {
  const first = arr[0];
  const string = arr[1];

  const char = first[1];
  let count = 0;

  for (let j = 0; j < string.length; j++) {
    const currChar = string[j];
    if (currChar === char) count += 1;
  }

  const range = first[0].split("-");
  const lowerBound = Number(range[0]);
  const higherBound = Number(range[1]); 

  if (count >= lowerBound && count <= higherBound) {
    return true;
  }
  return false;
}

// Part 2
function isValid(arr) {
  const first = arr[0];
  const string = arr[1];

  const char = first[1];
  let count = 0;

  const range = first[0].split("-");
  const lowerBound = Number(range[0]);
  const higherBound = Number(range[1]);

  if (string[lowerBound] === char) count += 1;
  if (string[higherBound] === char) count += 1;

  if (count === 1) return true;
  // console.log(arr, "FALSE");
  return false;
}

// validCount(input);