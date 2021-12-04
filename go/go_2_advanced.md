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


