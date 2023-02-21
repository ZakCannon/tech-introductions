const a = {
    i: 2,
    toString: () => {
        return a.i++
    }
}

if (a === 2 && a === 3) {
    console.log('How on earth did you get here?');
}

console.log("The code did actually run")