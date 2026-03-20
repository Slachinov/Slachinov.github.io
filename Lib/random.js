let seed = 42;


function setSeed(s) {
  seed = s;
}


function rand() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}


function gauss(mu = 0, sigma = 1) {
  let u1 = 1 - rand();
  let u2 = 1 - rand();


  let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);


  return z0 * sigma + mu;
}


function choices(arr, k = 1) {
  let result = [];
  for (let i = 0; i < k; i++) {
    result.push(arr[Math.floor(rand() * arr.length)]);
  }
  return result;
}


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}


// Python-like object
const random = {
  seed: setSeed,
  random: rand,
  gauss,
  choices,
  shuffle
};


export default random;