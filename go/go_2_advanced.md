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
#### Вложенная структура
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
// вложенная структура того же типа:
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
fmt.Println(cap(intCh))     // 3 - емкость канала
fmt.Println(len(intCh))     // 1 - кол-во элементов в канале
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

#### Закрытие канала
```go
intCh := make(chan int, 3)
intCh <- 10
val, opened := <-intCh // opened - true/false 
close(intCh) // close the channel
```

#### Синхронизация
```go
func someFunct(ch chan struct{}){
    defer close(ch) // закрываем канал после завершения горутины
    //...
}
structCh := make(chan struct{})
go someFunct(structCh)
//...    
<-structCh        // ожидаем закрытия канала structCh
//...
```

#### Передача потоков данных
```go
func main(){
    intCh := make(chan int)
    go someFunction(intCh)
    for num := range intCh{
        //... получение данных
    }
}
 
func someFunction(ch chan int){
    defer close(ch)
    for i := 1; i <= 100; i++{
        ch <- i //отправка данных
    }
}
```

### sync.Mutex

```go
func main() {
    ch := make(chan bool)       // канал
    var mutex sync.Mutex        // определяем мьютекс
    for i := 1; i < 5; i++{
        go work(i, ch, &mutex)
    }
    //... получение данных в цикле for
}
func work (number int, ch chan bool, mutex *sync.Mutex){
    mutex.Lock()    // блокируем доступ к переменной counter
    counter = 0
    //... работа с данными
    mutex.Unlock()  // деблокируем доступ
    ch <- true
}
```

### sync.WaitGroup
```go
var wg sync.WaitGroup 
wg.Add(2)       // в группе две горутины
work := func(id int) { 
    defer wg.Done() // уменьшает внутренний счетчик активных элементов на единицу
    //... операции 
}
go work(1) // вызываем горутины
go work(2) // вызываем горутины
wg.Wait()  // ожидаем завершения обоих горутин
//... операции 
```

## 6. Потоки и файлы
Поток данных в Go представлен байтовым срезом ([]byte),
из которого можно считывать байты или в который можно заносить данные.

### Создание файлов
```go
file, err := os.Create("hello.txt")     // создаем файл
if err != nil{                          // если возникла ошибка
    os.Exit(1)                          // выходим из программы
}
defer file.Close()                      // закрываем файл
file.Name()                             // hello.txt
```

### Открытие файлов
```go
// открытие файла
file, err := os.Open("hello.txt")
// открытие файла для чтения
f1, err := os.OpenFile("sometext.txt", os.O_RDONLY, 0666)
// открытие файла для записи
f2, err := os.OpenFile("common.txt", os.O_WRONLY, 0666)
```

### Чтение и запись файлов
```go
file, err := os.Open("hello.txt")
//... error handler
defer file.Close()
// Запись текста:
file.WriteString("text") 
// Запись бинарной информации:
data := []byte("Hello Bold!")
file.Write(data)
// Чтение бинарной информации
data2 := make([]byte, 64)
for {
    n, err := file.Read(data2)
    if err == io.EOF { break }  // если конец файла - выходим
    fmt.Print(string(data2[:n]))
}
// Вывод файла в консоль:
io.Copy(os.Stdout, file)
```

### Набор спецификаторов
- %t: для вывода значений типа boolean (true или false)
- %b: для вывода целых чисел в двоичной системе
- %c: для вывода символов, представленных числовым кодом
- %d: для вывода целых чисел в десятичной системе
- %o: для вывода целых чисел в восьмеричной системе
- %q: для вывода символов в одинарных кавычках
- %x: для вывода целых чисел в шестнадцатиричной системе, нижний регистр a-f
- %X: для вывода целых чисел в шестнадцатиричной системе, верхний регистр A-F
- %U: для вывода символов в формате кодов Unicode, например, U+1234
- %e: для вывода чисел с плавающей точкой в экспоненциальном представлении, например, -1.234456e+78
- %E: для вывода чисел с плавающей точкой в экспоненциальном представлении, например, -1.234456E+78
- %f: для вывода чисел с плавающей точкой, например, 123.456
- %F: то же самое, что и %f
- %g: для длинных чисел с плаващей точкой используется %e, для других - %f
- %G: для длинных чисел с плаващей точкой используется %E, для других - %F
- %s: для вывода строки
- %p: для вывода значения указателя - адреса в шестнадцатеричном представлении

**Для чисел:**
- %f: точность и ширина значения по умолчанию
- %9f: ширина - 9 символов и точность по умолчанию
- %.2f: ширина по умолчанию и точность - 2 символа
- %9.2f: ширина - 9 и точность - 2
- %9.f: ширина - 9 и точность - 0

**дефис** `-`, который дополняет значение пробелами не справа, как по умолчанию, а слева

### Fprint(), Fprintln(), Fprintf()
```go
file, err := os.Create("file.txt")
fmt.Fprint(file, "Сегодня ") // "Сегодня "
fmt.Fprintln(file, "хорошая погода") // "хорошая погода"\n
tom := person {name:"Tom", age: 24, weight: 68.5}
fmt.Fprintf(file, "%-10s %-10d %-10.3f\n", tom.name, tom.age, tom.weight) // "Tom        24         68.500"
```

### Println(), Print(), Printf()
```go
fmt.Print("Hello ")
fmt.Println("cold!")
fmt.Printf("%-10s %-10d %-10.3f\n", tom.name, tom.age, tom.weight)
```

### Fscan(), Fscanln(), Fscanf()
```go
file, err := os.Create("file.txt")
var name string
var age int
// чтение из файла
fmt.Fscan(file, &name)
fmt.Fscanln(file, &age)
fmt.Fscanf(file, "%s %d\n", &name, &age)
// чтение из консоли
fmt.Fscan(os.Stdin, &name)
fmt.Fscanln(os.Stdin, &age)
fmt.Fscanf(os.Stdin, "%s %d\n", &name, &age)
```

### Scan(), Scanln(), Scanf()
```go
// чтение из консоли (default)
fmt.Scan(&name)
fmt.Scanln(&age)
fmt.Scanf("%s %d\n", &name, &age)
fmt.Scan(&name, &age)
```
