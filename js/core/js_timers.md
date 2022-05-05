# Timeouts, Interval
***

## setTimeout
`var timeoutID = setTimeout(func, [, delay, param1, param2, ...]);`
```javascript
const func1 = () => console.log('func1')
setTimeout(func1, 1000)                   // "func1" after 1s
const timerId = setTimeout(func1, 2000)   // no output
clearTimeout(timerId)
```

## setInterval
`var intervalID = setInterval(func, delay[, param1, param2, ...]);`
```javascript
const func2 = () => console.log('func2')
const timerId2 = setInterval(func2, 1000)   // "func2" every 1s
setTimeout(() => clearInterval(timerId2), 5000)   // clear interval after 5s
```

## setImmediate
`var immediateID = setImmediate(func, [param1, param2, ...]);`
Ставит функцию в очередь на выполнение без задержки.
Реализован только в IE10+ и на платформе Node.JS.

```javascript
const func3 = () => console.log('func3')
var immediateID = setImmediate(func3)
clearImmediate(immediateID)
```
