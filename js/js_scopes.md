# **Scopes**
***

# Global object
`Window` - for browser
`Global` - for Node
`WorkerGlobalScope` - for workers

# Hoisting

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

# Event loop

**Event loop:**
- Heap
- Stack
- Queue

## Stack
Вызов любой функции создаёт контекст выполнения (Execution Context). 
При вызове вложенной функции создаётся новый контекст, а старый сохраняется в Stack.
```javascript
function f(b) { /* ... */ } // context #3
function g(x) { f(x) }      // context #2
g(21);                      // context #1
```
**Stack content:**
- context #3
- context #2
- context #1

## Heap
Неструктурированная область памяти

## Queue
Queue — список задач, подлежащих обработке.
Когда стек полностью освобождается, самая первая задача извлекается из очереди и обрабатывается.
Вызов функции создаёт новый контекст выполнения и заносится в стек.
Обработка задачи заканчивается, когда стек снова становится пустым. 
Следующая задача извлекается из очереди и начинается её обработка.

Вызов `setTimeout` добавит событие в очередь по прошествии времени, указанного во втором аргументе вызова. 
Если очередь событий на тот момент будет пуста, то событие обработается сразу же, 
в противном случае событию функции `setTimeout` придётся ожидать завершения обработки остальных событий в очереди.

### macrotask queue
- setTimeout
- browser events
- script
- DOM changes

### microtask queue
- Promise (then/catch/finally)
- `queueMicrotask(func)` - помещает func в очередь микрозадач.

### Алгоритм
1. Выбрать и исполнить старейшую задачу из очереди макрозадач (например, «script»).
2. Исполнить **все** микрозадачи: Пока очередь микрозадач не пуста - Выбрать из очереди и исполнить старейшую микрозадачу
3. Отрисовать изменения страницы, если они есть.
4. Если очередь макрозадач пуста – подождать, пока появится макрозадача.
5. Перейти к шагу 1.
