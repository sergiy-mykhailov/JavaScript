# **String**
***

[Strings on MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String)

# Properties
* `String.prototype` - прототип объекта String.
* `String.prototype.constructor` - Определяет функцию, создающую прототип этого объекта.
* `String.prototype.length` - Отражает длину строки.
* `N` - Используется для доступа к символу в позиции N

# Шаблонная строка
```javascript
var person = 'Mike';
var age = 28;
function myTag(strings, personExp, ageExp) {
  // strings[0]:  "That "
  // strings[1]:  " is a "
  // personExp:   "Mike"
  // ageExp:      28
  return `${strings[0]}${personExp}${strings[1]}${ageStr}`;
}
var output = myTag`That ${ person } is a ${ age }`;
```

# Methods

## `String.fromCharCode(num1[, ...[, numN]])` 
Возвращает строку, созданную из указанной последовательности значений Юникода.
###### Параметры:
* `num1, ..., numN` - Последовательность чисел, являющихся значениями Юникода.

## `String.fromCodePoint(num1[, ...[, numN]])`
Возвращает строку, созданную из указанной последовательности кодовых точек Юникода.
###### Параметры:  
* `num1, ..., numN` - Последовательность кодовых точек.

## `String.raw()`
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
String.raw`Привет\n${2+3}!` // output: 'Привет\n5!'
`Привет\n${2+3}!`           // output: 'Привет
                            // 5!'
const tag = (strings) => strings.raw[0];
tag`line 1 \\n line 2`;     // выводит "line 1 \\n line 2",
```

## `String.prototype.charAt(index)`
Возвращает символ по указанному индексу.

## `String.prototype.charCodeAt(index)`
Возвращает число, представляющее значение символа в Юникоде по указанному индексу.

## `String.prototype.codePointAt(index)`
Возвращает неотрицательное целое число, представляющее закодированную в UTF-16 кодовую точку значения по указанной позиции.

## `String.prototype.concat(string2, string3[, ..., stringN])`
Объединяет текст двух строк и возвращает новую строку.
###### Параметры: 
* `string2...stringN` - Строки, объединяемые в эту строку. 

## `String.prototype.includes(searchString[, position])`
Определяет, находится ли строка внутри другой строки.
###### Параметры
* `searchString` - Строка для поиска в данной строке.
* `position` - Позиция в строке, с которой начинать поиск строки  searchString. (Default: 0) 

## `String.prototype.endsWith(searchString[, position])`
   Определяет, заканчивается ли строка символами другой строки.
   
## `String.prototype.indexOf(searchValue[, fromIndex])`
   Возвращает индекс первого вхождения указанного значения в объекте String, на котором был вызван этот метод, или -1, если вхождений нет.

## `String.prototype.lastIndexOf(searchValue[, fromIndex])`
   Возвращает индекс последнего вхождения указанного значения в объекте String, на котором был вызван этот метод, или -1, если вхождений нет.

## `String.prototype.localeCompare(compareString[, locales[, options]])`
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

## `String.prototype.match(regexp)`
   Используется для сопоставления строке регулярного выражения.

## `String.prototype.normalize(form)`
   Возвращает форму нормализации Юникода для строкового значения.
###### Параметры
* `form` - форма нормализации ("NFC", "NFD", "NFKC", "NFKD")

## `String.prototype.repeat(count)`
   Возвращает строку. состоящую из элементов объекта, повторённых указанное количество раз.

## `String.prototype.replace(regexp|substr, newSubStr|function[, flags])`
   Используется для сопоставления строке регулярного выражения и для замены совпавшей подстроки на новую подстроку.
###### Параметры
* `regexp|substr` - Строка/regexp, заменяемая на newSubStr
* `newSubStr` - Строка, заменяющая подстроку из первого параметра.
* `function` - Функция, вызываемая для создания новой подстроки
* `flags` - *не работает в ядре v8!* комбинацию флагов регулярного выражения.

## `String.prototype.search([regexp])`
   Выполняет поиск совпадения регулярного выражжения со строкой.

## `String.prototype.slice(beginSlice[, endSlice])`
   Извлекает часть строки и возвращает новую строку.

## `String.prototype.split([separator[, limit]])`
   Разбивает объект String на массив строк, разделёных указанной строкой на подстроки.

## `String.prototype.startsWith(searchString[, position])`
   Определяет, начинается ли строка символами другой строки.

## `String.prototype.substr(start[, length])`
   Возвращает указанное количество символов в строке, начинающихся с указанной позиции.

## `String.prototype.substring(indexA[, indexB])`
   Возвращает символы в строке между двумя индексами.
   
## `String.prototype.toLocaleLowerCase()`
   Приводит символы в строке к нижнему регистру согласно текущей локали.

## `String.prototype.toLocaleUpperCase()`
   Приводит символы в строке к верхнему регистру согласно текущей локали.

## `String.prototype.toLowerCase()`
   Возвращает строковое значение с символами в нижнем регистре.

## `String.prototype.toSource()`
   Возвращает литерал объекта, представляющий указанный объект;

## `String.prototype.toString()`
   Возвращает строковое представление указаного объекта.

## `String.prototype.toUpperCase()`
   Возвращает строковое значение с символами в верхнем регистре.

## `String.prototype.trim()`
   Обрезает пробельные символы в начале и в конце строки. (ES 5).

## `String.prototype.trimLeft()`
   Обрезает пробельные символы с левой стороны строки.

## `String.prototype.trimRight()`
   Обрезает пробельные символы с правой стороны строки.

## `String.prototype.valueOf()`
   Возвращает примитивное значение указанного объекта.

## `String.prototype[@@iterator]()`
   Возвращает новый объект итератора Iterator, который итерируется по кодовым точкам строки и возвращает каждую кодовую точку в виде строкового значения.
