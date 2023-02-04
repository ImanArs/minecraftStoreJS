import { func } from "./utils.js";
// const { func } = require('./fetch')
console.log(func(1));

// const numbers = [1,1,2,3,3,2,3,4,5]
// console.log(numbers);

// const nums = numbers.filter((value, index, arr) => {
//     return arr.indexOf(value) === index
// }) 
// console.log(nums);

// var arr = [
//     {
//         id: 3,
//         name: 'A',
//         depth:0
//     },
//     {
//         id: 2,
//         name: 'C',
//         depth:1
//     },
//     {
//         id: 3,
//         name: 'B',
//         depth:1
//     },
//     {
//         id: 1,
//         name: 'Z'
//     },
//     {
//         id: 2,
//         name: 'F',
//         depth:0
//     }]
//     var cArr = arr.filter(a => a.depth == 0);
//     var zeroDepth = arr.filter(a => a.depth === undefined);
//     zeroDepth.forEach(z => cArr.push(z));
//     arr.forEach(a => 
//       {
//         if(a.depth == 1){
//         cArr.forEach(c => 
//         {
//           if(c.id == arr.id){
//             c.child = [];
//             c.child.push(arr);
//                 }
//             })
//         }
//     })
// console.log(cArr);
