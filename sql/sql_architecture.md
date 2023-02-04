# SQL architecture

## Database normalization
### 1NF - First Normal Form
* Each record needs to be unique (no duplicated rows or columns)
* Each table cell should contain a single value (no arrays or lists)
* Values stored in a column should be of the same domain
* All the columns in a table should have unique names.
* And the order in which data is stored, does not matter.

### 2NF - Second Normal Form
* The table must be already in 1 NF
* There must be a primary key for identification
* All non-key columns of the tables must depend on the PRIMARY KEY
* The partial dependencies are removed and placed in a separate table

### 3NF - Third Normal Form
* A Table is already in 2 NF
* There is no transitive functional dependency
* Non-Primary key columns shouldn’t depend on the other non-Primary key columns

### BCNF - Boyce Codd Normal Form
* A Table is already in 3 NF
* For any dependency A → B, A cannot be a non-prime attribute, if B is a prime attribute

### 4NF - Fourth Normal Form

### 5NF - Fifth Normal Form

### 6NF - Sixth Normal Form


## N + 1 problem
```sql
-- this:
SELECT * FROM hat WHERE catID = 1;
SELECT * FROM hat WHERE catID = 2;
SELECT * FROM hat WHERE catID = 3;
SELECT * FROM hat WHERE catID = 4;
SELECT * FROM hat WHERE catID = 5;
-- change to this:
SELECT * FROM hat WHERE catID IN (1, 2, 3, 4, 5)
```


## Требования ACID
### Atomicity — Атомарность
Атомарность гарантирует, что никакая транзакция не будет зафиксирована в системе частично. 
Будут либо выполнены все её подоперации, либо не выполнено ни одной. 
### Consistency — Согласованность
Транзакция, достигающая своего нормального завершения и тем самым фиксирующая свои результаты, сохраняет согласованность базы данных.
### Isolation — Изолированность
Во время выполнения транзакции параллельные транзакции не должны оказывать влияния на её результат.
### Durability — Прочность
Независимо от проблем на нижних уровнях (к примеру, обесточивание системы или сбои в оборудовании) 
изменения, сделанные успешно завершённой транзакцией, должны остаться сохранёнными после возвращения системы в работу.

