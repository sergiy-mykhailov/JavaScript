# **GO** - Advanced
***

## 1. pointers
```go
var x int = 4     // 4           // определяем переменную
var p *int        // nil         // определяем указатель
fmt.Println(*p)   // ! ошибка, указатель не указывает на какой-либо объект
p = &x            // 0xc0420c058 // указатель получает адрес переменной
fmt.Println(*p)   // 4
*p = 25
fmt.Println(x)    // 25
```

### new(type)
Создает безымянные объекты - они также размещаются в памяти, но не имеют имени как переменные.
```go
p := new(int) 
fmt.Println(*p)       // 0 - значение по умолчанию
*p = 8                // изменяем значение
fmt.Println(*p)       // 8
```

### pointers and functions
```go
func changeValue(x *int){
    *x = (*x) * (*x)
}
func main() {
    d := 5
    fmt.Println(d)     // 5
    changeValue(&d)    // изменяем значение
    fmt.Println(d)     // 25 - значение изменилось!
}
```

## 2. types

```go
type mile int
type library []string
var myLibrary library = library{"Book1", "Book2", "Book3"}
```

### struct
```go
type person struct{
    name string
    age int
}
var tom person = person{"Tom", 23}
var alice person = person{age: 23, name: "Alice"}
undefined := person {}  // name - пустая строка, age - 0
// Указатели на структуры:
var tomPointer *person = &tom
tomPointer.age = 29
fmt.Println(tom.age)        // 29
(*tomPointer).age = 32
fmt.Println(tom.age)        // 32
// указатель на безымянный объект:
var tom *person = &person{name:"Tom", age:23}
var bob *person = new(person)
// указатель на поле:
var agePointer *int = &tom.age  // указатель на поле tom.age
*agePointer = 35            // изменяем значение поля
fmt.Println(tom.age)        //  35
```

```go
type contact struct{
    email string
}
type person struct{
    name string
    contact
}
var tom = person {
    name: "Tom",
    contact: contact {
        email: "tom@gmail.com",
    },
}
// вложенная структра того же типа:
type node struct{
    value int
    next *node
}
```

### methods
```go
type library []string
func (libValues library) print(){
    fmt.Println(libValues)
}
var lib library = library{ "Book1", "Book2", "Book3" }
lib.print()
```

### methods and pointers
```go
type person struct{
    name string
    age int
}
func (p *person) updateAge(newAge int){
    (*p).age = newAge
}
var tom = person { name: "Tom", age: 24 }
var tomPointer *person = &tom
fmt.Println(tom.age)        // 24
tomPointer.updateAge(33)    // 33
tom.updateAge(35)           // 35
```

## 3. package
Есть два типа пакетов:
- исполняемые (executable) - должен иметь имя main, должен содержать функцию main
- библиотеки (reusable).

```go
import "fmt"
import "./some/folder"
import "github.com/some/repo"
```
#### Create module
```bash
go mod init modulename // creates file go.mod
```

## 4. interface
```go
type Child interface{
    write(string)
}
type Parent interface{
    Child
}
```
Для соответствия подобному интерфейсу типы данных должны реализовать все его вложенные интерфейсы.

## 5. goroutines
```go
func someFunction() {}
go someFunction()
// вызовы анонимных функций:
go func(){}()
```

### Channels
```go
var intCh chan int = make(chan int)
go func(){
    intCh <- 5 // блокировка, пока данные не будут получены функцией main
}()
fmt.Println(<-intCh) // получение данных из канала
```
#### Небуфферизированные каналы
```go
func main() {
    intCh := make(chan int)
    go someFunction(5, intCh)  // вызов горутины
    fmt.Println(<-intCh)       // получение данных из канала
}
func someFunction(n int, ch chan int){
    ch <- n + 1     // отправка данных в канал
}
```

#### Буферизированные каналы
```go
func main() {
    intCh := make(chan int, 2) // емкость канала
    go someFunction(intCh)     // вызов горутины
	fmt.Println(<-intCh)       // 10
    fmt.Println(<-intCh)       // 3
}
func someFunction(ch chan int){
    intCh <- 10
    intCh <- 3
}
```
#### cap(chan), len(chan)
```go
intCh := make(chan int, 3)
intCh <- 10
fmt.Println(cap(intCh))     // 3
fmt.Println(len(intCh))     // 1
```

#### Определение канала только для отправки данных:
```go
var inCh chan<- int
```

#### Определение канала только для получения данных:
```go
var outCh <-chan int
```

#### Возвращение канала
```go
func main() {
    fmt.Println(<-createChan(5)) // 5
}
func createChan(n int) chan int{
    ch := make(chan int) // создаем канал
    go func(){
        ch <- n          // отправляем данные в канал
    }()                  // запускаем горутину
    return ch            // возвращаем канал
}
```


