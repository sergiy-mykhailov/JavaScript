# **GO**
***

**Go (golang)** — компилируемый, многопоточный язык программирования со строгой статической типизацией.

[GO standard packages](https://pkg.go.dev/std)

## 1. CLI commands

```shell
go run hello.go             # compile and run Go program
go build hello.go           # compile packages and dependencies
go get github.com/some/repo # fetch dependencies to current module and install them
go mod init modulename      # creates module
```

## 2. Структура программы

```go
package main
import "fmt"
 
func main() {
    fmt.Println("Hello Go!")
}
```

## 3. Data types

### Целочисленные типы
- **int8**: от -128 до 127 - 1 байт (8 бит)
- **int16**: от -32768 до 32767 - 2 байта (16 бит)
- **int32**: от -2147483648 до 2147483647 - 4 байта (32 бита)
- **int64**: от –9223372036854775808 до 9223372036854775807 - 8 байт (64 бита)
- **uint8**: от 0 до 255 - 1 байт
- **uint16**: от 0 до 65535 - 2 байта
- **uint32**: от 0 до 4294967295 - 4 байта
- **uint64**: от 0 до 18446744073709551615 - 8 байт
- **byte**: синоним uint8 - 1 байт
- **rune**: синоним int32 - 4 байта
- **int**: синоним int32/int64.
- **uint**: синоним uint32/uint64.

### Числа с плавающей точкой
- **float32**: 4 байта
- **float64**: 8 байт

### Комплексные числа
- **complex64**: вещественная и мнимая части представляют числа **float32**
- **complex128**: вещественная и мнимая части представляют числа **float64**

### Тип bool
- **bool**: true / false

### Строки
- **string**: `"string"`

### Значение по умолчанию
- числа - `0`
- bool - `false`
- string - `""`

## 4. Variables & Constants

### 4.1 Variables
```go
var hello string
hello = "Hello world"

var a, b, c string

var hello string = "Hello world"

var (
    name string = "Tom"
    age int = 27
)

name := "Tom"
```

### 4.2 Constants

```go
const pi float64 = 3.1415


const (
    pi float64 = 3.1415
    e float64 = 2.7182
)

const pi, e = 3.1415, 2.7182

const n = 5

const (
    a = 1 // 1
    b     // 1
    c     // 1
    d = 3 // 3
    f     // 3
)
```

## 5. Operations
### 5.1 Арифметические операции
```go
var c = a + b
var c = a - b
var c = a * b
var c int = 10 / 4      // 2
var c float32 = 10 / 4  // 2.5
var c int = 35 % 3      // 2 (35 - 33 = 2)
a++
b--
```

### 5.2 Условные выражения

`==` `>` `>=` `<` `<=` `!=` `!` `&&` `||`

### 5.3 Поразрядные операции
```go
var b int = 2 << 2;         // 10  на два разрядов влево = 1000 - 8
var c int = 16 >> 3;        // 10000 на три разряда вправо = 100 - 2
var a int = 5 | 2;          // 101 | 010 = 111  - 7
var b int = 6 & 2;          // 110 & 010 = 10  - 2
var c int = 5 ^ 2;          // 101 ^ 010 = 111 - 7
var d int = 5 &^ 6;         // 101 &^ 110 = 001 - 1
```

## 6. Array & Slice

### Array
```go
var numbers [5]int
var numbers2 [5]int = [5]int{1,2,3,4,5}
var numbers3 [5]int = [5]int{1,2}        // [1 2 0 0 0]
numbers4 := [5]int{1,2,3,4,5}            // [1 2 3 4 5]
numbers5 := [...]int{1,2,3}              // длина массива 3
numbers6 := [5]int{1,2,3,4,5}
numbers[0] = 87                          // [87 2 3 4 5]
colors := [3]string{2: "blue", 0: "red", 1: "green"}
colors[2] // blue
```

### Slice
```go
var users []string
var users []string = []string{"Tom", "Alice", "Kate"}
var users = []string{"Tom", "Alice", "Kate"}
users2 := []string{"Tom", "Alice", "Kate"}
var users []string = make([]string, 3) // ["" "" ""]
```

#### append(slice, value)
```go
numbers := []int{1,2,3}
numbers = append(numbers, 4) // [1 2 3 4]
```

#### s[i:j]
```go
numbers := [8]int{1,2,3,4,5,6,7,8}
numbers[2:6] // с 3-го по 6-й   // [3 4 5 6]
numbers[:4]  // с 1-го по 4-й   // [1 2 3 4]
numbers[3:]  // с 4-го до конца // [4 5 6 7 8]
```

#### deleting
```go
users := []string{"Bob", "Alice", "Kate", "Sam", "Tom", "Paul", "Mike", "Robert"}
//удаляем 4-й элемент
var n = 3
users = append(users[:n], users[n+1:]...)   
fmt.Println(users)      //["Bob", "Alice", "Kate", "Tom", "Paul", "Mike", "Robert"]
```



## 7. Условные конструкции

### if...else
```go
if a < b {
  //...
} else if a > b {
  //...
} else {
  //...
}
```

### switch
```go
a := 5
switch(a) {
    case 9: fmt.Println("a = 9")
    case 8: fmt.Println("a = 8")
    case 7: fmt.Println("a = 7")
    case 6, 5, 4: 
        fmt.Println("a = 6 или 5 или 4, но это не точно")
    default: 
        fmt.Println("значение переменной a не определено")
}
```

## 8. Loops
```go
for i := 1; i < 10; i++ {
  //...
  continue // переходим к следующей итерации
  break    // выходим из цикла
}
```
```go
var i = 1
for ; i < 10; {
    //...
    i++
}
```
```go
var i = 1
for i < 10 {
    //...
    i++
}
```
```go
var users = [3]string{"Tom", "Alice", "Kate"}
for index, value := range users {
    //...
}
```

## 9. Functions
_**Aргументы в функцию всегда передаются по значению**_

```go
func hello() {}
func add1(x int, y int) {}
func add2(x, y int, a, b, c float32) {}
func add3(x, y int) int {
  return x + y
}
```
#### Неопределенное количество параметров
```go
func add(numbers ...int) {} // add(1, 2, 3) or add(5, 6, 7, 2, 3)

var nums = []int{5, 6, 7, 2, 3}
add(nums...)
```

#### Именованные возвращаемые результаты
```go
func add(x, y int) (z int) {
    z = x + y
    return // will return z
}
```

#### Возвращение нескольких значений
```go
func add(x, y int, firstName, lastName string) (int , string) {
    var z int = x + y
    var fullName = firstName + " " + lastName
    return z, fullName
}
var age, name = add(4, 5, "Tom", "Simpson")
```

#### присвоить переменной функцию
```go
func add(x int, y int) int{
    return x + y
}
var f func(int, int) int = add
f(3, 4)
```

#### Функции как параметры других функций
```go
func add(x int, y int) int {}
func action(n1 int, n2 int, operation func(int, int) int) int {
  //...
  return operation(n1, n2)
}
action(10, 25, add)
```
#### Функция как результат другой функции
```go
func add(x int, y int) int {}
func selectFn(n int) (func(int, int) int) {
  //...
  if n==1 {
    return add
  }
}
selectFn(1)(2, 4)
```

#### Анонимные функции
```go
var f func(int, int) int = func(x, y int) int{ return x + y }
f := func(x, y int) int{ return x + y }
```
Анонимные функции имеют доступ к окружению, в котором они вызываются (замыкание)

#### Рекурсивные функции
```go
func someFunction(x int) int {
  //...
  return someFunction(x + 2)
}
```

## 10 defer, panic

### defer
**defer** позволяет выполнить определенную функцию в конце программы
```go
func main() {
    defer someFunc()
    //... other functionality
}
```
Если несколько функций вызываются с оператором defer, то те функции, которые вызываются раньше, будут выполняться позже всех.

### panic
**panic** позволяет сгенерировать ошибку и выйти из программы
```go
panic("something went wrong :(")
```

## 11 map
```go
var people = map[string]int{ 
    "Tom": 1,
    "Bob": 2,
    "Sam": 4,
    "Alice": 8,
}
```
#### Для проверки наличия элемента по определенному ключу:
```go
if val, ok := people["Tom"]; ok {}
```
#### Для перебора элементов:
```go
for key, value := range people {}
```

#### **make** создает пустую хеш-таблицу:
```go
people := make(map[string]int)
```
#### **delete(map, key)**
```go
delete(people, "Bob")
```
