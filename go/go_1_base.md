# **GO**
***

**Go (golang)** — компилируемый, многопоточный язык программирования со строгой статической типизацией.

[GO standard packages](https://pkg.go.dev/std)

## 1. CLI commands

```shell
go run hello.go             # compile and run Go program
go build hello.go           # compile packages and dependencies
go get github.com/some/repo # fetch dependencies to current module and install them
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

## 4. Variables

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

## 5. Constants

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

## 6. Арифметические операции
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

