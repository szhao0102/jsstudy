function fn(args) {
    return spawn(function* () {
      yield 1
      yield 2 
      yield 3
      return 4
    });
  }
function spawn(genF) {
    return new Promise(function(resolve, reject) {
      const gen = genF();
      function step(nextF) {
        let next;
        try {
          next = nextF();
        } catch(e) {
          return reject(e);
        }
        if(next.done) {
          return resolve(next.value);
        }
        Promise.resolve(next.value).then(function(v) {
          step(function() { return gen.next(v); });
        }, function(e) {
          step(function() { return gen.throw(e); });
        });
      }
      step(function() { return gen.next(undefined); });
    });
  }
const main = () => {
    fn().then(r => console.log(r))
}

// main()
function P() {
}
let p = new P()
const a = () => {
    console.log(Object.getPrototypeOf(p) === P.prototype)
    console.log(P.prototype)
}
a()