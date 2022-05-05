# Data types
***

## types

### primitive types:
  undefined, boolean, number, string, bigint и symbol(ES6)

### non-primitive types:
  null, object

### Examples
```javascript
typeof null           // object (ошибка в языке, сохраняется для совместимости, null – это отдельный тип данных)
typeof Math           // object
typeof {}             // object
typeof function(){}   // "function" (object Но typeof выделяет функции отдельно, возвращая для них "function")
// primitive types:
typeof undefined      // undefined
typeof true           // boolean
typeof 0              // number
typeof 'Hello'        // string
typeof 19241924124n   // bigint
typeof Symbol('Hi')   // symbol (New ES6)
```


## Type conversion

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

### Type coercion
```javascript
true + false             // 1 + 0 -> 1
12 / "6"                 // 12 / 6 ->
"number" + 15 + 3        // "number15" + 3 -> 'number153'
15 + 3 + "number"        // 18 + "number" -> '18number'
[1] > null               // '1' > 0  ->  1 > 0  ->  true
"foo" + + "bar"          // "foo" + (+"bar")  ->  "foo" + NaN  ->  'fooNaN'
'true' == true           // NaN == 1 -> false
false == 'false'         //  0 == NaN -> false
null == ''               // false
!!"false" == !!"true"    // true == true -> true
['x'] == 'x';            // 'x' == 'x' -> true 
[] + null + 1            // '' + null + 1  ->  'null' + 1  ->  'null1'
[1,2,3] == [1,2,3]       // false
{}+[]+{}+[1]             // +[]+{}+[1] -> 0+{}+[1] -> 0+'[object Object]'+[1] -> '0[object Object]1'
!+[]+[]+![]              // (!+[])+[]+(![]) -> !0+[]+false -> true+''+false -> 'truefalse'
new Date(0) - 0          // 0 - 0 (triggers numeric conversion) -> 0
new Date(0) + 0          // ( triggers string concatenation) -> 'Thu Jan 01 1970 02:00:00(EET)0'
```

