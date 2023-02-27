// function loopCountDown() {
//     for (let i = 3; i >= 0; i--) {
//         setTimeout(function() {
//             console.log(i || "Lift-off!");
//         }, (3 - i) * 1000);
//     }
// }
//
// loopCountDown();


function countDown(i) {
    if (i <= 0) {
        console.log("Lift off!");
        return;
    }
    console.log(i);
    setTimeout(() => countDown(i-1), 1000);
}

countDown(10);