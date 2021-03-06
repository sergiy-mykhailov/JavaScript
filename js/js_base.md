# **JavaScript - Base Level**
***

**JavaScript** - однопоточный, интерпретируемый, асинхронный язык с динамической типизацией.
JavaScript это прототипно-ориентированный, мультипарадигменный язык, который поддерживает объектно-ориентированный, императивный и декларативный (функциональное программирование) стили программирования.


# 1. Data types

## 7 встроенных типов:
  null, undefined, boolean, number, string, object и symbol(ES6)

```javascript
typeof 0              // number
typeof true           // boolean
typeof 'Hello'        // string
typeof Math           // object
typeof null           // object (ошибка в языке, сохраняется для совместимости, null – это отдельный тип данных)
typeof Symbol('Hi')   // symbol (New ES6)
typeof function(){}   // "function" (object Но typeof выделяет функции отдельно, возвращая для них "function")
```


# 2. Operators 

## 2.1 Arithmetic

### Остаток от деления (%)
```javascript
12 % 5  // вернёт 2
```

### Унарный минус (-)
Возвращает отрицательное значение своего операнда
```javascript
var x = 3;
-x // вернёт -3
```

### Унарный плюс (+)
Пытается конвертировать операнд в число
```javascript
+"3"   // вернёт 3.
+true  // вернёт 1.
```

### Инкремент (более короткая запись для i = i + 1):
```javascript
var i = 0;
alert( i++ );      // 0, Постфиксная форма, возвращает старое значение
alert( ++i );      // 2, Префиксная форма, возвращает новое значение
```

### Декремент (более короткая запись для i = i - 1):
```javascript
var i = 10;
alert( i-- );      // 10, Постфиксная форма, возвращает старое значение
alert( --i );      // 8, Префиксная форма, возвращает новое значение
```

### Совмещённые операторы
```javascript
var n = 2;
n += 5;     // теперь n=7 (работает как n = n + 5)
n *= 2;     // теперь n=14 (работает как n = n * 2)
```
Так можно сделать для операторов +,-,*,/,% и бинарных <<,>>,>>>,&,|,^

## 2.2. Assignment

```javascript
var a, b, c;

a = b = c = 2 + 2;

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

### Оператор "=" возвращает значение
```javascript
var a = 1;
var b = 2;

var c = 3 - (a = b + 1);

alert( a ); // 3
alert( c ); // 0
```

## 2.3. Comparison

Значения разных типов приводятся к числу при сравнении, за исключением строгого равенства === (!==).

### Операторы сравнения
> `<` `==` `!=`  `>=` `<=` `===` `!==` `>==` `<==` `!`

### Сравнение разных типов
```javascript
alert( '2' > 1 );     // true, сравнивается как 2 > 1
alert( '01' == 1 );   // true, сравнивается как 1 == 1
alert( false == 0 );  // true, false становится числом 0
alert( true == 1 );   // true, так как true становится числом 1.
2 == '2'              // True
2 === '2'             // False
undefined == null     // True
undefined === null    // False
false == ""           // true
false == []           // true
false == {}           // false
"" == 0               // true
"" == []              // true
"" == {}              // false
0 == []               // true
0 == {}               // false
0 == null             // false
```
[Чит-лист](http://dorey.github.io/JavaScript-Equality-Table/)

### Сравнение с null и undefined
1. Значения null и undefined равны == друг другу и не равны чему бы то ни было ещё
2. При преобразовании в число null становится 0, а undefined становится NaN.

```javascript
alert( null > 0 );        // false
alert( null == 0 );       // false
alert( null >= 0);         // true
alert( undefined > 0 );   // false
alert( undefined < 0 );   // false
alert( undefined == 0 );  // false
```

## 2.4. Логические операторы
Если значение не логического типа – то оно к нему приводится в целях вычислений.
#### || (ИЛИ)
*  если хотя бы один из аргументов true, то возвращает true, иначе – false
*  вычисляет операнды слева направо до первого «истинного»
*  возвращает то значение, на котором остановились вычисления
*  если все значения «ложные», то возвращает последнее
#### && (И)
*  возвращает true, если оба аргумента истинны, а иначе – false
*  вычисляет операнды слева направо до первого «ложного»
*  возвращает первое «ложное»
*  если все значения истинные – то возвращает последнее значение
#### ! (НЕ)
*  Сначала приводит аргумент к логическому типу true/false.
*  Затем возвращает противоположное значение.

## 2.5. Bitwise
Значение        | Оператор
----------------|-------------------
AND(и)          | & 
OR(или)         | (вертикальная черта) 
XOR(побитовое исключающее или) | ^ 
NOT(не) | ~ 
LEFT SHIFT(левый сдвиг) | << 
RIGHT SHIFT(правый сдвиг) | >> 
ZERO-FILL RIGHT SHIFT(правый сдвиг с заполнением нулями) | >>> 

## 2.6. Оператор запятая
**Оператор запятая (,)** вычисляет оба операнда и возвращает значение последнего операнда.
Данный оператор в основном используется внутри цикла for.

## 2.7. Оператор delete
```javascript
delete object.property
delete object['property']
delete array[index]
delete property // удаляет свойства глобального объекта, или,
                // используя инструкцию with, свойства объекта, на который ссылается инструкция
```

## 2.8. Оператор void
Оператор **void** определяет выражение, которое должно быть вычислено без возвращения результата
```javascript
void (expression)
void expression
```

## 2.9. Оператор in
```javascript
propNameOrNumber in objectName 
```
Оператор **in** возвращает true, если указанный объект имеет указанное свойство.
```javascript
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
0 in trees        // true
"length" in trees // true

var mycar = { make: "Honda", model: "Accord", year: 1998 };
"make" in mycar  // true
```

## 2.10. Приоритет операторов
Тип оператора |	Операторы
:-----------:|:---------:
свойство объекта | . []
вызов, создание экземпляра объекта | () new
отрицание, инкремент | ! ~ - + ++ -- typeof void delete
умножение, деление | * / %
сложение, вычитание | + -
побитовый сдвиг | << >> >>>
сравнение, вхождение | < <= > >= in instanceof
равенство | == != === !==
битовое-и | &
битовое-исключающее-или |^
битовое-или | &#124;
логическое-и | &&
логическое-или | &#124;&#124;
условный (тернарный) оператор | ?:
присваивание | = += -= *= /= %= <<= >>= >>>= &= ^= |=
запятая | ,


# 3. Main statements 

## 3.1. If

### Оператор If:
```
if (...) {
  ...
} else if (...) {
  ...
} else {
  ...
}
```

### Тернарный оператор '?':
```
переменная = условие ? значениеУсловиеВерно : значениеУсловиеНеверно
```

### В логическом контексте:
  *  Число **0**, пустая строка **""**, **null** и **undefined**, а также **NaN** являются **false**,
  *  Остальные значения – **true**.

## 3.2. switch
```javascript
switch(x) {
  case 'value1':  // if (x === 'value1')
    // ...
    break;

  case 'value2':  // if (x === 'value2')
    // ...
    break;

  default:
    // ...
    break;
}
```
Если break нет, то выполнение пойдёт ниже по следующим case, при этом остальные проверки игнорируются.

## 3.3. loops
### Цикл while
Пока условие верно – выполняется код из тела цикла:
```javascript
while (условие) {
  // код, тело цикла
}
```
### Цикл do..while
Цикл сначала выполняет тело, а затем проверяет условие:
```javascript
do {
  // тело цикла
} while (условие);
```
### Цикл for
```javascript
for (начало; условие; шаг) {
  // ... тело цикла ...
  break // Прерывание цикла
  continue // прекращает выполнение текущей итерации цикла
}
```
### Цикл for..in
Порядок перебора соответствует порядку объявления для нечисловых ключей, а числовые – сортируются (в современных браузерах).
```javascript
for (key in obj) {
  /* ... делать что-то с obj[key] ... */
}
```
### break/continue
```javascript
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    break; // // прекращает выполнение текущего цикла
    break outer; // прекращает выполнение цикла с меткой "outer"
    continue; // прекращает выполнение текущей итерации внутр.цикла
  }
}
```

## 3.4. try catch
```javascript
try {
   // .. пробуем выполнить код ..
} catch(e) {
   // .. перехватываем исключение ..
} finally {
   // .. выполняем всегда ..
}
```
Блок finally срабатывает при любом выходе из try..catch, в том числе и return.

#### Объект ошибки
  *  name - Тип ошибки. Например: "ReferenceError".
  *  message - текстовое сообщение о деталях ошибки.
  *  stack - содержит строку с информацией о последовательности вызовов, которая привела к ошибке. 


# 4. Hoisting

__Hoisting__ представляет процесс доступа к переменным до их определения.

Компиляция кода происходит в два прохода:
1. компилятор получает все объявления переменных, все идентификаторы.
2. выполнение кода

Следующий код вызовет ошибку ReferenceError: aa is not defined:
```javascript
console.log(aa);
```

Следующий код выведет значение "undefined":
```javascript
console.log(foo);   // undefined
var foo = "Tom";
```

Переменные a и b используются до опеределения. По умолчанию им присваиваются значения undefined. А если умножить undefined на undefined, то получим NaN:
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


# 5. Numbers 
[Numbers on MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number)

## 5.1. Converting

#### parseInt(string[, radix])
**parseInt()** принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.
* `string` - строка.
* `radix` - основание системы счисления. (Целое число между 2 и 36. По умолчанию: 10)

```JavaScript
parseInt("015", 10);            // 15
parseInt(" 0xF", 16);           // 15
parseInt("1111", 2);            // 15
parseInt("15px", 10);           // 15
parseInt("15e2", 10);           // 15
parseInt("Hello", 8);           // NaN
parseInt(-15.1, 10);            // -15
parseInt(0.00000000000434, 10); // 4
```

#### parseFloat(string)
**parseFloat()** принимает строку в качестве аргумента и возвращает десятичное число (число с плавающей точкой)
* `string` - строка.
```javascript
parseFloat("3.14");   // 3.14
parseFloat("314e-2"); // 3.14
parseFloat("2.5km");  // 2.5 
parseFloat("FF2");    // NaN
```

#### isNaN(value)
**isNaN()** определяет является ли литерал или переменная нечисловым значением (NaN) или нет.
* `value` - литерал или переменная.

```javascript
isNaN(NaN);       // true
isNaN(undefined); // true
isNaN({});        // true
isNaN(true);      // false
isNaN(null);      // false
isNaN(37);        // false
isNaN("37.37");   // false: "37.37" преобразуется в число 37.37 которое не NaN
isNaN("");        // false: пустая строка преобразуется в 0 которое не NaN
isNaN("37,5");    // true
isNaN(new Date());                // false
isNaN(new Date().toString());     // true
// Пример почему использование isNaN не всегда уместно:
isNaN("blabla")   // true: "blabla" преобразованно в число. 
```
**P.S.** Более надёжный метод для проверки: `Number.isNaN()`

#### isFinite(testValue)
**isFinite()** определяет, является ли переданное значение конечным числом.
* `testValue` - литерал или переменная.

```javascript
isFinite(Infinity);   // false
isFinite(NaN);        // false
isFinite(-Infinity);  // false
isFinite(0);          // true
isFinite(2e64);       // true
isFinite("0");        // true
Number.isFinite("0"); // false
```
**P.S.** Более надёжный метод для проверки: `Number.isFinite()`

## 5.2. Properties

* **Number.EPSILON** - Наименьший интервал между двумя представимыми числами.
* **Number.MAX_SAFE_INTEGER** - Максимальное целое число, которое можно безопасно использовать в JavaScript (253 - 1).
* **Number.MAX_VALUE** - Наибольшее представимое положительное число.
* **Number.MIN_SAFE_INTEGER** - Минимальное целое число, которое можно безопасно использовать в (-(253 - 1)).
* **Number.MIN_VALUE** - Наименьшее представимое положительное число — то есть, самое близкое к нулю положительное число (которое ещё не является нулём).
* **Number.NaN** - Специальное значение для представления «не числа».
* **Number.NEGATIVE_INFINITY** - Специальное значение для представления отрицательной бесконечности; возвращается при переполнении.
* **Number.POSITIVE_INFINITY** - Специальное значение для представления положительной бесконечности; возвращается при переполнении.
* **Number.prototype** - прототип объекта Number. 

## 5.3. Methods
* **Number.isNaN(value)** - Определяет, является ли переданнное значение значением NaN.
* **Number.isFinite(value)** - Определяет, является ли переданное значение конечным числом.
* **Number.isInteger(value)** - Определяет, является ли тип переданного значения «числом», а само число — целым значением.
* **Number.isSafeInteger(value)** - Определяет, является ли переданное значение безопасным целым числом (числом в диапазоне от -(253 - 1) до 253 - 1).
* **Number.parseFloat(string)** - Представляет собой тот же самый метод, что и метод parseFloat глобального объекта.
* **Number.parseInt(string[, radix])** - Представляет собой тот же самый метод, что и метод parseInt глобального объекта.
* **Number.prototype.toExponential([digits])** - Возвращает строку, представляющую число в экспоненциальной записи.
  * `digits` - Количество цифр после десятичной запятой.
* **Number.prototype.toFixed([digits])** - Возвращает строку, представляющую число в записи с фиксированной запятой.
  * `digits` - Количество цифр после десятичной запятой.
* **Number.prototype.toLocaleString([locales[, options]])** - Возвращает строку с языко-зависимым представлением числа.
  * `locales` - Строка с языковой меткой BCP 47, либо массив таких строк.
  * `options` - Объект с некоторыми или всеми из следующих свойств:
    * `localeMatcher` - Используемый алгоритм сопоставления локалей. Возможные значения "lookup", "best fit"; (Default: "best fit")
    * `style` - Используемый стиль форматирования. Возможные значения: "decimal", "currency", "percent" (Default: "decimal")
    * `currency` - Валюта, используемая при форматировании валют. Возможные значения: коды валют ISO 4217.
    * `currencyDisplay` - Отображение валюты. Возможные значения: "symbol", "code", "name" (Default: "symbol")
    * `useGrouping` - Определяет, использовать ли разделители групп разрядов (Default: true)
    * `minimumIntegerDigits` - Минимальное используемое количество цифр целой части числа. от 1 до 21 (Default: 1)
    * `minimumFractionDigits` - Минимальное используемое количество цифр дробной части числа. от 0 до 20  (Default: 0)
    * `maximumFractionDigits` - Максимальное используемое количество цифр дробной части числа. от 0 до 20 (Default: minimumFractionDigits)
    * `minimumSignificantDigits` - Минимальное используемое количество значащих цифр числа. от 1 до 21 (Default: 1)
    * `maximumSignificantDigits` - Максимальное используемое количество значащих цифр числа. от 1 до 21 (Default: minimumSignificantDigits)
* **Number.prototype.toPrecision([precision])** - Возвращает строку, представляющую число с указанной точностью в экспоненциальной записи, либо записи с фиксированной запятой.
  * `precision` - Количество значащих цифр.
* **Number.prototype.toSource()** - Возвращает объектный литерал, представляющий объект Number; вы можете использовать это значение для создания нового объекта.
* **Number.prototype.toString([radix])** - Возвращает строку, представляющую указанный объект по указанному основанию системы счисления.
  * `radix` - основание системы счисления.
* **Number.prototype.valueOf()** - Возвращает примитивное значение указанного объекта.

## 5.4 Other

#### What is the result of addition 1 to max value of integer?
```javascript
Number.MAX_VALUE === Number.MAX_VALUE + 1 // true
```

# 6. Strings
[Strings on MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String)

## 6.1 Properties
* `String.prototype` - прототип объекта String.
* `String.prototype.constructor` - Определяет функцию, создающую прототип этого объекта.
* `String.prototype.length` - Отражает длину строки.
* `N` - Используется для доступа к символу в позиции N

## 6.2 Methods

#### `String.fromCharCode(num1[, ...[, numN]])` 
Возвращает строку, созданную из указанной последовательности значений Юникода.
###### Параметры:
* `num1, ..., numN` - Последовательность чисел, являющихся значениями Юникода.

#### `String.fromCodePoint(num1[, ...[, numN]])`
Возвращает строку, созданную из указанной последовательности кодовых точек Юникода.
###### Параметры:  
* `num1, ..., numN` - Последовательность кодовых точек.

#### `String.raw()`
Возвращает строку, созданную из сырой шаблонной строки.  
```javascript
String.raw(callSite, ...substitutions);
String.raw`templateString`;
```
###### Параметры: 
* `callSite` - Правильно сформированный объект вызова, например { raw: 'string' }.
* `...substitutions` - Значения подстановок.
* `templateString` - Шаблонная строка, возможно с подстановками (`${...}`).
##### Example
```javascript
String.raw`Привет\n${2+3}!`
// output: 'Привет\n5!'
`Привет\n${2+3}!`
// output: 'Привет
// 5!'
```

#### `String.prototype.charAt(index)`
Возвращает символ по указанному индексу.

#### `String.prototype.charCodeAt(index)`
Возвращает число, представляющее значение символа в Юникоде по указанному индексу.

#### `String.prototype.codePointAt(index)`
Возвращает неотрицательное целое число, представляющее закодированную в UTF-16 кодовую точку значения по указанной позиции.

#### `String.prototype.concat(string2, string3[, ..., stringN])`
Объединяет текст двух строк и возвращает новую строку.
###### Параметры: 
* `string2...stringN` - Строки, объединяемые в эту строку. 

#### `String.prototype.includes(searchString[, position])`
Определяет, находится ли строка внутри другой строки.
###### Параметры
* `searchString` - Строка для поиска в данной строке.
* `position` - Позиция в строке, с которой начинать поиск строки  searchString. (Default: 0) 

#### `String.prototype.endsWith(searchString[, position])`
   Определяет, заканчивается ли строка символами другой строки.
   
#### `String.prototype.indexOf(searchValue[, fromIndex])`
   Возвращает индекс первого вхождения указанного значения в объекте String, на котором был вызван этот метод, или -1, если вхождений нет.

#### `String.prototype.lastIndexOf(searchValue[, fromIndex])`
   Возвращает индекс последнего вхождения указанного значения в объекте String, на котором был вызван этот метод, или -1, если вхождений нет.

#### `String.prototype.localeCompare(compareString[, locales[, options]])`
   Возвращает число, указывающее, находится ли образцовая строка до, после или на том же самом месте, что и указанная строка в порядке сортировки.
###### Параметры
* `compareString` - Строка, с которой сравнивается данная.
* `locales` - Строка с языковой меткой BCP 47, либо массив таких строк.
* `options` - Объект с некоторыми или всеми из следующих свойств:
  * `localeMatcher` - алгоритм сопоставления локалей ("lookup", "best fit").
  * `usage` - сравнение для сортировки или для поиска ("sort", "search")
  * `sensitivity` - какие различия в строках должны приводить к ненулевому результату ("base", "accent", "case", "variant")
  * `ignorePunctuation` - должна ли игнорироваться пунктуация (true, false)
  * `numeric` - должно ли использоваться числовое сравнение (true, false)
  * `caseFirst` - буквы какого регистра должны идти первыми ("upper", "lower", "false" )

#### `String.prototype.match(regexp)`
   Используется для сопоставления строке регулярного выражения.

#### `String.prototype.normalize(form)`
   Возвращает форму нормализации Юникода для строкового значения.
###### Параметры
* `form` - форма нормализации ("NFC", "NFD", "NFKC", "NFKD")

#### `String.prototype.repeat(count)`
   Возвращает строку. состоящую из элементов объекта, повторённых указанное количество раз.
   
#### `String.prototype.replace(regexp|substr, newSubStr|function[, flags])`
   Используется для сопоставления строке регулярного выражения и для замены совпавшей подстроки на новую подстроку.
###### Параметры
* `regexp|substr` - Строка/regexp, заменяемая на newSubStr
* `newSubStr` - Строка, заменяющая подстроку из первого параметра.
* `function` - Функция, вызываемая для создания новой подстроки
* `flags` - *не работает в ядре v8!* комбинацию флагов регулярного выражения.

#### `String.prototype.search([regexp])`
   Выполняет поиск совпадения регулярного выражжения со строкой.

#### `String.prototype.slice(beginSlice[, endSlice])`
   Извлекает часть строки и возвращает новую строку.

#### `String.prototype.split([separator[, limit]])`
   Разбивает объект String на массив строк, разделёных указанной строкой на подстроки.

#### `String.prototype.startsWith(searchString[, position])`
   Определяет, начинается ли строка символами другой строки.

#### `String.prototype.substr(start[, length])`
   Возвращает указанное количество символов в строке, начинающихся с указанной позиции.

#### `String.prototype.substring(indexA[, indexB])`
   Возвращает символы в строке между двумя индексами.
   
#### `String.prototype.toLocaleLowerCase()`
   Приводит символы в строке к нижнему регистру согласно текущей локали.

#### `String.prototype.toLocaleUpperCase()`
   Приводит символы в строке к верхнему регистру согласно текущей локали.

#### `String.prototype.toLowerCase()`
   Возвращает строковое значение с символами в нижнем регистре.

#### `String.prototype.toSource()`
   Возвращает литерал объекта, представляющий указанный объект;

#### `String.prototype.toString()`
   Возвращает строковое представление указаного объекта.

#### `String.prototype.toUpperCase()`
   Возвращает строковое значение с символами в верхнем регистре.

#### `String.prototype.trim()`
   Обрезает пробельные символы в начале и в конце строки. (ES 5).

#### `String.prototype.trimLeft()`
   Обрезает пробельные символы с левой стороны строки.

#### `String.prototype.trimRight()`
   Обрезает пробельные символы с правой стороны строки.

#### `String.prototype.valueOf()`
   Возвращает примитивное значение указанного объекта.

#### `String.prototype[@@iterator]()`
   Возвращает новый объект итератора Iterator, который итерируется по кодовым точкам строки и возвращает каждую кодовую точку в виде строкового значения.

# 7. Dates
[Dates on MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date)
## 7.1 Properties
* `Date.prototype` - прототип объекта Date.

## 7.2 Methods

### Конструктор объекта Date:
```
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);
```

### Методы класса Date
* `Date.now()` - Возвращает числовое значение, соответствующее текущему времени — количество миллисекунд,
   прошедших с 1 января 1970 года 00:00:00 по UTC.
* `Date.parse()` - Разбирает строковое представление даты и возвращает количество миллисекунд с 1 января 1970 года 00:00:00
   по местному времени.
* `Date.UTC()` - Принимает те же самые параметры, что и самый длиный вариант конструктора (то есть, от 2 до 7)
   и возвращает количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC. 

### Методы экземпляра объекта Date
* `Date.prototype.getDate()`
   Возвращает день месяца (1-31) указанной даты по местному времени.
* `Date.prototype.getDay()`
   Возвращает день недели (0-6) указанной даты по местному времени.
* `Date.prototype.getFullYear()`
   Возвращает год (4 цифры для 4-х значного года) указанной даты по местному времени.
* `Date.prototype.getHours()`
   Возвращает часы (0-23) указанной даты по местному времени.
* `Date.prototype.getMilliseconds()`
   Возвращает миллисекунды (0-999) указанной даты по местному времени.
* `Date.prototype.getMinutes()`
   Возвращает минуты (0-59) указанной даты по местному времени.
* `Date.prototype.getMonth()`
   Возвращает месяц (0-11) указанной даты по местному времени.
* `Date.prototype.getSeconds()`
   Возвращает секунды (0-59) указанной даты по местному времени.
* `Date.prototype.getTime()`
   Возвращает числовое значение указанной даты как количество миллисекунд, 
   прошедших с 1 января 1970 года 00:00:00 по UTC (отрицательное значение для даты до этого момента).
* `Date.prototype.setDate()`
   Устанавливает день месяца указанной даты по местному времени.
* `Date.prototype.setFullYear()`
   Устанавливает полный год (4 цифры для 4-х значного года) указанной даты по местному времени.
* `Date.prototype.setHours()`
   Устанавливает часы указанной даты по местному времени.
* `Date.prototype.setMilliseconds()`
   Устанавливает миллисекунды указанной даты по местному времени.
* `Date.prototype.setMinutes()`
   Устанавливает минуты указанной даты по местному времени.
* `Date.prototype.setMonth()`
   Устанавливает месяц указанной даты по местному времени.
* `Date.prototype.setSeconds()`
   Устанавливает секунды указанной даты по местному времени.
* `Date.prototype.setTime()`
   Устанавливает объект Date во время, представляемое количеством миллисекунд, 
   прошедших с 1 января 1970 года 00:00:00 по UTC (отрицательное значение устанавливает даты до этого момента).

## 7.3 Formats

* `Date.prototype.toDateString()`
    Возвращает часть, содержащую только дату объекта Date в качестве человеко-читаемой строки.
* `Date.prototype.toISOString()`
    Преобразует дату в строку, следуя расширенному формату ISO 8601.
* `Date.prototype.toJSON()`
    Возвращает строку, представляющую объект Date, используя метод toISOString(). 
    Предназначен для использования методом JSON.stringify().
* `Date.prototype.toLocaleDateString([locales [, options]])`
    Возвращает строку с датой, чьё представление зависит от системных настроек локали.
* `Date.prototype.toLocaleFormat(formatString)`
    Преобразует дату в строку, используя строку форматирования.
* `Date.prototype.toLocaleString([locales[, options]])`
    Возвращает строку, чьё представление зависит от настроек локали.
* `Date.prototype.toLocaleTimeString([locales[, options]])`
    Возвращает строку со временем, чьё представление зависит от системных настроек локали.
* `Date.prototype.toSource()`
    Возвращает строковое представление исходного кода эквивалентного объекта Date;
* `Date.prototype.toString()`
    Возвращает строковое представление указанного объекта Date.
* `Date.prototype.toTimeString()`
    Возвращает часть, содержащую только время объекта Date в качестве человеко-читаемой строки.
* `Date.prototype.toUTCString()`
    Преобразует дату в строку, используя часовой пояс UTC.
* `Date.prototype.valueOf()`
    Возвращает примитивное значение объекта Date.    

## 7.4 Timezones

* `Date.prototype.getTimezoneOffset()`
   Возвращает смещение часового пояса в минутах для текущей локали.
* `Date.prototype.getUTCDate()`
   Возвращает день месяца (1-31) указанной даты по всемирному координированному времени.
* `Date.prototype.getUTCDay()`
   Возвращает день недели (0-6) указанной даты по всемирному координированному времени.
* `Date.prototype.getUTCFullYear()`
   Возвращает год (4 цифры для 4-х значного года) указанной даты по всемирному координированному времени.
* `Date.prototype.getUTCHours()`
   Возвращает часы (0-23) указанной даты по всемирному координированному времени.
* `Date.prototype.getUTCMilliseconds()`
   Возвращает миллисекунды (0-999) указанной даты по всемирному координированному времени.
* `Date.prototype.getUTCMinutes()`
   Возвращает минуты (0-59) указанной даты по всемирному координированному времени.
* `Date.prototype.getUTCMonth()`
   Возвращает месяц (0-11) указанной даты по всемирному координированному времени.
* `Date.prototype.getUTCSeconds()`
   Возвращает секунды (0-59) указанной даты по всемирному координированному времени.
* `Date.prototype.setUTCDate()`
   Устанавливает день месяца указанной даты по всемирному координированному времени.
* `Date.prototype.setUTCFullYear()`
   Устанавливает полный год (4 цифры для 4-х значного года) указанной даты по всемирному координированному времени.
* `Date.prototype.setUTCHours()`
   Устанавливает часы указанной даты по всемирному координированному времени.
* `Date.prototype.setUTCMilliseconds()`
   Устанавливает миллисекунды указанной даты по всемирному координированному времени.
* `Date.prototype.setUTCMinutes()`
   Устанавливает минуты указанной даты по всемирному координированному времени.
* `Date.prototype.setUTCMonth()`
   Устанавливает месяц указанной даты по всемирному координированному времени.
* `Date.prototype.setUTCSeconds()`
   Устанавливает секунды указанной даты по всемирному координированному времени.

# 8. Arrays
[Arrays on MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date)
## 8.1 Properties
* `Array.prototype.length` - Отражает количество элементов в массиве.
    
## 8.2 Methods
### Методы класса
* `Array.from()` - Создаёт новый экземпляр Array из массивоподобного или итерируемого объекта.
* `Array.isArray()` - Возвращает true, если значение является массивом, иначе возвращает false.
* `Array.observe()` - Асинхронно наблюдает за изменениями в массиве, подобно методу Object.observe() для объектов. Метод предоставляет поток изменений в порядке их возникновения.
* `Array.of()` - Создаёт новый экземпляр Array с переменным количеством аргументов, независимо от числа или типа аргументов. 

### Методы экземпляра объекта
* `Array.prototype.copyWithin(target, start[, end = this.length])`
    Копирует последовательность элементов массива внутри массива.
* `Array.prototype.fill(value[, start = 0[, end = this.length]])`
    Заполняет все элементы массива от начального индекса до конечного индекса указанным значением.
* `Array.prototype.pop()`
    Удаляет последний элемент из массива и возвращает его.
* `Array.prototype.push(element1[, ..., elementN])`
    Добавляет один или более элементов в конец массива и возвращает новую длину массива.
* `Array.prototype.reverse()`
    Переворачивает порядок элементов в массиве — первый элемент становится последним, а последний — первым.
* `Array.prototype.shift()`
    Удаляет первый элемент из массива и возвращает его.
* `Array.prototype.splice(start, deleteCount[, item1[, item2[, ...]]])`
    Добавляет и/или удаляет элементы из массива.
* `Array.prototype.unshift([element1[, ...[, elementN]]])`
    Добавляет один или более элементов в начало массива и возвращает новую длину массива. 
* `Array.prototype.concat(value1[, value2[, ...[, valueN]]])`
    Возвращает новый массив, состоящий из данного массива, соединённого с другим массивом и/или значением (списком массивов/значений).
* `Array.prototype.includes(searchElement[, fromIndex = 0])`
    Определяет, содержится ли в массиве указанный элемент, возвращая, соответственно, true или false.
* `Array.prototype.join([separator])`
    Объединяет все элементы массива в строку.
* `Array.prototype.slice([begin[, end]])`
    Извлекает диапазон значений и возвращает его в виде нового массива.
* `Array.prototype.toSource()`
    Возвращает литеральное представление указанного массива; вы можете использовать это значение для создания нового массива. Переопределяет метод Object.prototype.toSource().
* `Array.prototype.toString()`
    Возвращает строковое представление массива и его элементов. Переопределяет метод Object.prototype.toString().
* `Array.prototype.toLocaleString()`
    Возвращает локализованное строковое представление массива и его элементов. Переопределяет метод Object.prototype.toLocaleString().
* `Array.prototype.indexOf(searchElement[, fromIndex = 0])`
    Возвращает первый (наименьший) индекс элемента внутри массива, равный указанному значению; или -1, если значение не найдено.
* `Array.prototype.lastIndexOf(searchElement[, fromIndex = arr.length])`
    Возвращает последний (наибольший) индекс элемента внутри массива, равный указанному значению; или -1, если значение не найдено. 
* `Array.prototype.forEach((item, index, array) => {} [, thisArg])`
    Вызывает функцию для каждого элемента в массиве.
* `Array.prototype.entries()`
    Возвращает новый объект итератора массива Array Iterator, содержащий пары ключ / значение для каждого индекса в массиве.
* `Array.prototype.every((item, index, array) => {} [, thisArg])`
    Возвращает true, если каждый элемент в массиве удовлетворяет условию проверяющей функции.
* `Array.prototype.some((item, index, array) => {} [, thisArg])`
    Возвращает true, если хотя бы один элемент в массиве удовлетворяет условию проверяющей функции.
* `Array.prototype.filter((item, index, array) => {} [, thisArg])`
    Создаёт новый массив со всеми элементами этого массива, для которых функция фильтрации возвращает true.
* `Array.prototype.find((item, index, array) => {} [, thisArg])`
    Возвращает искомое значение в массиве, если элемент в массиве удовлетворяет условию проверяющей функции или undefined, если такое значение не найдено.
* `Array.prototype.findIndex((item, index, array) => {} [, thisArg])`
    Возвращает искомый индекс в массиве, если элемент в массиве удовлетворяет условию проверяющей функции или -1, если такое значение не найдено.
* `Array.prototype.keys()`
    Возвращает новый итератор массива, содержащий ключи каждого индекса в массиве.
* `Array.prototype.map((item, index, array) => {} [, thisArg])`
    Создаёт новый массив с результатами вызова указанной функции на каждом элементе данного массива.
* `Array.prototype.reduce((item, index, array) => {} [, initialValue])`
    Применяет функцию к аккумулятору и каждому значению массива (слева-направо), сводя его к одному значению.
* `Array.prototype.reduceRight((item, index, array) => {} [, initialValue])`
    Применяет функцию к аккумулятору и каждому значению массива (справа-налево), сводя его к одному значению.
* `Array.prototype.values()`
    Возвращает новый объект итератора массива Array Iterator, содержащий значения для каждого индекса в массиве.
* `Array.prototype[@@iterator]()`
    Возвращает новый объект итератора массива Array Iterator, содержащий значения для каждого индекса в массиве. 

## 8.3 Sorting
##### `Array.prototype.sort([compareFunction])`
Сортирует элементы массива на месте и возвращает отсортированный массив.
###### Параметры   
* `compareFunction` - Указывает функцию, определяющую порядок сортировки. Если опущен, 
массив сортируется в соответствии со значениями кодовых точек каждого символа Unicode,
полученных путём преобразования каждого элемента в строку.

**Если функция сравнения compareFunction указана:**
* Если compareFunction(a, b) меньше 0, сортировка поставит a по меньшему индексу, чем b, то есть, a идёт первым.
* Если compareFunction(a, b) вернёт 0, сортировка оставит a и b неизменными по отношению друг к другу, но отсортирует их по отношению ко всем другим элементам.
* Если compareFunction(a, b) больше 0, сортировка поставит b по меньшему индексу, чем a.    

**Пример:**
```javascript
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers); // [1, 2, 3, 4, 5]
```

# 9. Functions
## 9.1 Closures
## 9.2 declaration
## 9.3 arguments array
## 9.4 invocation

# 10. Type conversion

### Численное преобразование
```javascript
var a = +"123";         // 123
var a = Number("123");  // 123
```
Значение     | Преобразуется в...
-------------|-------------------
undefined	   | NaN
null         | 0
true / false | 1 / 0
''           | 0
'25'         | 25
'abc'        | NaN

### Логическое преобразование
```javascript
alert( !!"0" ); // true
alert( !!" " ); // любые непустые строки, даже из пробелов - true!
```
Значение        | Преобразуется в...
----------------|-------------------
undefined, null	| false
Числа	          | Все true, кроме 0, NaN -- false.
Строки	        | Все true, кроме пустой строки "" -- false
Объекты	        | Всегда true

```javascript
alert( null >= 0 );       // true, т.к. null преобразуется к 0
alert( null > 0 );        // false (не больше), т.к. null преобразуется к 0
alert( null == 0 );       // false (и не равен!), т.к. == рассматривает null особо.
alert( undefined > 0 );   // false, т.к. undefined -> NaN
alert( undefined == 0 );  // false, т.к. это undefined (без преобразования)
alert( undefined < 0 );   // false, т.к. undefined -> NaN
```


# 11. Prototypes, Inharitance

## 11.1. ООП в функциональном стиле
```javascript
function ParentClass(param1, param2) {
  // локальные переменные и функции доступны только внутри
  var somePrivateProperty = 'value of private property';
  function privateMethod() {}
  
  // публичные доступны снаружи
  this.publicProperty = 'value of public property';
  this.publicMethod = function() {};
  
  // публичные геттеры, сеттеры
  this.getProperty = function() {
    return somePrivateProperty;
  };
  this.setProperty = function(newValue) {
    somePrivateProperty = newValue;
  };
  
  // публичный единый геттер-сеттер
  this.privateProperty = function(newValue) {
    if (!arguments.length) return somePrivateProperty;
    somePrivateProperty = newValue;
  };
 
  // условно защищённые приватные свойства и методы (для потомков)
  this._protectedProperty = 'protected value';
  this._protectedMethod = function() {};
}
 
function ChildClass(param3, param4) {
  // универсальный вызов с передачей любых аргументов
  ParentClass.apply(this, arguments);
  
  // собственные свойства
  this.childPublicProperty = 'child public value';
  
  // переопределение родительского свойства
  this._protectedProperty = 'new protected value';
  
  // переопределение(расширение) родительского метода
  var parentProtected = this._protectedMethod;
  this._protectedMethod = function(args) {
    parentProtected.apply(this, args);
    // ...
  };
}
  
var instanceClass = new ChildClass('value1', 'value2');
instanceClass.publicProperty = 'new value';
instanceClass.publicMethod();
instanceClass.childPublicProperty = 'other value';
```

## 11.2. ООП в прототипном стиле
```javascript
// 1. конструктор Parent
function ParentClass(param1) {
  this.param1 = param1;
  this.param2 = 0;
}
  
// 2. методы в прототипе Parent
ParentClass.prototype.publicMethod = function() {};
ParentClass.prototype.otherPublicMethod = function() {};
  
// 3. конструктор Child
function ChildClass(param1) {
  this.param1 = param1;
  this.someProperty = 'value';
}
  
// 4. Наследование
ChildClass.prototype = Object.create(ParentClass.prototype);
ChildClass.prototype.constructor = ChildClass;
  
// 5. методы в прототипе Child
ChildClass.prototype.childPublicMethod = function() {};
  
// 6. переопределение(расширение) родительского метода
ChildClass.prototype.publicMethod = function() {
  // вызвать метод родителя, передав ему текущие аргументы
  ParentClass.prototype.publicMethod.apply(this, arguments);
  // ...
}
```

## 11.2. ООП в ES6
```javascript
class ParentClass {
  // конструктор
  constructor(param1) {
    this.someProperty = param1;
  }
  
  // методы
  someMethod() {};
  
  // геттер
  get property() {
    return this.someProperty;
  }
  
  // сеттер
  set property(newValue) {
    this.someProperty = newValue;
  }
  
  // Статические свойства
  static getCurrentDate() {
    return new Date();
  }
}
  
class ChildClass extends ParentClass {
  // конструктор
  constructor(...args) {
    super(...args);
    this.param2 = 'value';
  }
  
  // переопределение
  someMethod() {
    super.someMethod();
    // ...
  }
}
```


# 12. Math Object

# 13. Scopes

# 14. Objects

#### `Object.assign(target, ...sources)`
Создаёт новый объект путём копирования значений всех собственных перечислимых свойств из одного 
или более исходных объектов в целевой объект.

#### Объект-Дескриптор
Объект, чьи собственные перечисляемые свойства представляют собой дескрипторы для создаваемых или изменяемых свойств.
###### Параметры:
* `configurable` - Равен true только в том случае, если тип этого дескриптора свойства может 
быть изменён и если свойство может быть удалено из содержащего его объекта. (Default: false).
* `enumerable` - Равен true только в том случае, если это свойство можно увидеть через перечисление 
свойств содержащего его объекта.(Default: false).
* `value` - Значение, ассоциированное со свойством. Может быть любым допустимым значением JavaScript 
(числом, объектом, функцией и т.д.). (Default: undefined).
* `writable` - Равен true только в том случае, если значение, ассоциированное со свойством, 
может быть изменено с помощью оператора присваивания. (Default: false).
* `get` - Функция, используемая как геттер свойства, либо undefined, если свойство не имеет геттера.
Возвращаемое значение функции будет использоваться как значение свойства. (Default: undefined).
* `set` - Функция, используемая как сеттер свойства, либо undefined, если свойство не имеет сеттера.
Функция принимает единственным аргументом новое значение, присваиваемое свойству. (Default: undefined).
 
#### `Object.create(proto[, propertiesObject])`
Создаёт новый объект с указанными объектом прототипа и свойствами.
###### Параметры:
* `proto` - Объект, который станет прототипом вновь созданного объекта.
* `propertiesObject` - Объект-Дескриптор

#### `Object.defineProperties(obj, props)`
определяет новые или изменяет существующие свойства, непосредственно на объекте, возвращая этот объект.
###### Параметры:
* `obj` - Объект, на котором определяются новые или изменяются существующие свойства.
* `props` - Объект-Дескриптор

##### `Object.defineProperty(obj, prop, descriptor)` 
определяет новое или изменяет существующее свойство непосредственно на объекте, возвращая этот объект.
###### Параметры:

* `obj` - Объект, на котором определяется свойство.
* `prop` - Имя определяемого или изменяемого свойства.
* `descriptor` - Объект-Дескриптор. 

# 15. Timeouts, Intervals
## 15.1. Timeouts
## 15.2. Intervals





