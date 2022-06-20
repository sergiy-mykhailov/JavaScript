# JavaScript test tasks

## addOne()()().getValue()
### Task
Write a function: addOne()
```javascript
console.log(addOne()()().getValue())  // expected result: 3
console.log(addOne()().getValue())    // expected result: 2
console.log(addOne().getValue())      // expected result: 1
```
### Answer
```javascript
const addOne = () => {
  let value = 1

  const func = () => {
    value++
    return func
  }
  func.getValue = () => value

  return func
}
```

## sum(1)(2)(3)
### Task
Write a function: sum()
```javascript
console.log(String(sum(1)(2)))             // 3
console.log(String(sum(1)(2)(3)))          // 6
console.log(String(sum(5)(-1)(2)))         // 6
console.log(String(sum(6)(-1)(-2)(-3)))    // 0
console.log(String(sum(0)(1)(2)(3)(4)(5))) // 15
```
### Answer
```javascript
const sum = (firstValue) => {
  let result = firstValue

  const func = (value) => {
    result += value
    return func
  }
  func.toString = () => result

  return func
}
```

## currying
### Task
Write a function: curry()
```javascript
function sum(a, b, c) {
  return a + b + c;
}
let curriedSum = curry(sum);
console.log( curriedSum(1, 2, 3) ); // 6
console.log( curriedSum(1)(2,3) );  // 6
console.log( curriedSum(1)(2)(3) ); // 6
```
### Answer
```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}
```

## getMaxSubSum()
### Task
Write a function: getMaxSubSum()
```javascript
console.log(getMaxSubSum([-1, 2, 3, -9]))       // 5 (2, 3)
console.log(getMaxSubSum([2, -1, 2, 3, -9]))    // 6 (2, -1, 2, 3)
console.log(getMaxSubSum([-1, 2, 3, -9, 11]))   // 11 (11)
console.log(getMaxSubSum([-2, -1, 1, 2]))       // 3 (1, 2)
console.log(getMaxSubSum([100, -9, 2, -3, 5]))  // 100 (100)
console.log(getMaxSubSum([1, 2, 3]))            // 6 (1, 2, 3)
```
### Answer
```javascript
const getMaxSubSum = (arr) => {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    partialSum += item;
    maxSum = Math.max(maxSum, partialSum);

    if (partialSum < 0) {
      partialSum = 0;
    }
  }

  return maxSum;
}
```

## Bubble sorting
### Task
Write a function: bubbleSort()
```javascript
console.log( bubbleSort([86,7,1,65,9,3,3,6,3,8,0,7,-8,55]) );
console.log( bubbleSort([1,2,3]) );
console.log( bubbleSort([1,0,2,9,7,2,0,10,0]) );
```
### Answer
```javascript
function bubbleSort(arr) {
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }

  return arr;
}
```
