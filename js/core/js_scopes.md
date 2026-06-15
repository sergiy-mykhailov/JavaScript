# Scopes


## Scope types
```javascript
// Global Scope:
let globalScopeVariable = 'Global Scope';

// Local Scope or Function Scope:
function greet() {
  let functionalScopeVariable = 'Local Scope or Function Scope'
}

// Block Scope:
if (globalScopeVariable) {
  let blockScopeVariable = 'Block Scope'
}
```

## Global object
`Window` - for browser
`Global` - for Node
`WorkerGlobalScope` - for workers


## Hoisting

__Hoisting__ представляет процесс доступа к переменным до их определения.

Компиляция кода происходит в два прохода:
1. компилятор получает все объявления переменных, все идентификаторы. (var, function...)
2. выполнение кода

Следующий код вызовет ошибку ReferenceError: `aa` is not defined:
```javascript
console.log(aa);
```

Следующий код выведет значение "undefined":
```javascript
console.log(foo);   // undefined
var foo = "Tom";
```

Переменные a и b используются до определения. По умолчанию им присваиваются значения undefined. А если умножить undefined на undefined, то получим NaN:
```javascript
var c = a * b;
var a = 7;
var b = 3;
console.log(c); // NaN
```

Все то же самое относится и к использованию функций:
```javascript
display();
 
function display(){
    console.log("Hello Hoisting");
}
```

Когда функция определяется в виде переменной, получим ошибку TypeError: display is not a function:
```javascript
display();
 
var display = function (){
    console.log("Hello Hoisting");
}
```
