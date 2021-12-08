# **GO** - pro
***

## 1. Network

### net.Dial()
Tипы протоколов:
- **tcp, tcp4, tcp6**: протокол TCP. tcp по умолчанию представляет tcp4
- **udp, udp4, udp6**: протокол UDP. udp по умолчанию представляет udp4
- **ip, ip4, ip6**: протокол IP. ip по умолчанию представляет ip4
- **unix, unixgram, unixpacket**: сокеты Unix

```go
httpRequest:="GET / HTTP/1.1\nHost: golang.org\n\n" // данные
conn, err := net.Dial("tcp", "golang.org:80") // установка соединения
defer conn.Close()
n, err = conn.Write([]byte(httpRequest)) // передача данных (интерфейс io.Write)
io.Copy(os.Stdout, conn) // получение данных
```

### Сервер. Обработка подключений
```go
message := "Hello, I am a server"   // отправляемое сообщение
listener, err := net.Listen("tcp", ":4545")
defer listener.Close()

for { 
    conn, err := listener.Accept() // принимает входящее подключение
    //... error handler with break
    conn.Write([]byte(message))    // отправка данных
    input := make([]byte, 1024)
    n, err := conn.Read(input)     // получение данных
    conn.Close()                   // закрывает подключение
} 
```

### Timeout
```go
conn, err := net.Dial("tcp", "127.0.0.1:4545")
conn.SetDeadline(time.Now().Add(time.Second * 25))     // устанавливает таймаут на все операции ввода-вывода
conn.SetReadDeadline(time.Now().Add(time.Second * 15)) // устанавливает таймаут на операции ввода в поток
conn.SetWriteDeadline(time.Now().Add(time.Second * 5)) // устанавливает таймаут на операции вывода из потока
```

### HTTP
- http.Get(): отправляет запрос GET
- http.Head(): отправляет запрос HEAD
- http.Post(): отправляет запрос POST
- http.PostForm(): отправляет форму в запросе POST

```go
resp, err := http.Get("https://google.com")
defer resp.Body.Close()
io.Copy(os.Stdout, resp.Body)
```

### http.Client
```go
client := http.Client{
    Timeout    // устанавливает таймаут для запроса
    Jar        // устанавливает куки, отправляемые в запросе
    Transport  // определяет механиз выполнения запроса
} 
resp, err := client.Get("https://google.com")
// Request:
client := &http.Client{}
req, err := http.NewRequest("GET", "https://google.com", nil)
req.Header.Add("Accept", "text/html")   // добавляем заголовок Accept
resp, err := client.Do(req) // отправка запроса
```

## 2. Databases

### Открытие подключения
```go
connStr := "user=postgres password=mypass dbname=productdb sslmode=disable"
db, err := sql.Open("postgres", connStr)
```

### Exec()
```go
result, err := db.Exec("insert into Products (model) values ($1)", "iPhone X")
result, err := db.Exec("update Products set price = $1 where id = $2", 69000, 1)
result, err := db.Exec("delete from Products where id = $1", 2)
result.LastInsertId() // возвращает id последней строки, которая была добавлена/обновлена/удалена
result.RowsAffected() // возвращает количество затронутых строк
```

### Query()
```go
rows, err := db.Query("select * from Products where price > $1", 70000)
defer rows.Close() // закрывает подключение
for rows.Next() {
    var id int
    var name string
    rows.Scan(&id, &name)
}
```

### QueryRow()
```go
row, err := db.QueryRow("select * from Products where id = $1", 2) // возвращает одну строку в виде объекта *Row
err = row.Scan(&prod.id, &prod.model)
```
