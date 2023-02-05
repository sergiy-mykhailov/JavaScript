# SQL architecture

## Database normalization
### 1NF - First Normal Form
* Each record needs to be unique (no duplicated rows or columns)
* Each table cell should contain a single value (no arrays or lists)
* Values stored in a column should be of the same domain
* All the columns in a table should have unique names.
* And the order in which data is stored, does not matter.

#### Not normalized 1NF:
| Employee | Age | Role                   |
|:--------:|:---:|:-----------------------|
|   Mark   | 31  | front, back            |
|   Will   | 32  | front, back, team-lead |
|   Anna   | 33  | QA                     |


#### Normalized 1NF:
| Employee | age  | Role      |
|:--------:|:----:|:----------|
|   Mark   |  31  | front     |
|   Mark   |  31  | back      |
|   Will   |  32  | front     |
|   Will   |  32  | back      |
|   Will   |  32  | team-lead |
|   Anna   |  33  | QA        |

### 2NF - Second Normal Form
* The table must be already in 1 NF
* There must be a primary key for identification
* All non-key columns of the tables must depend on the PRIMARY KEY
* The partial dependencies are removed and placed in a separate table

#### Not normalized 2NF:
| Employee | age  | Role      |
|:--------:|:----:|:----------|
|   Mark   |  31  | front     |
|   Mark   |  31  | back      |
|   Will   |  32  | front     |
|   Will   |  32  | back      |
|   Will   |  32  | team-lead |
|   Anna   |  33  | QA        |

#### Normalized 2NF:
###### Table "employee":
| id  | Employee | age  |
|:---:|:--------:|:----:|
|  1  |   Mark   |  31  |
|  2  |   Will   |  32  |
|  3  |   Anna   |  33  |
###### Table "role":
| id  | Role       |
|:---:|:-----------|
|  1  | front      |
|  2  | back       |
|  3  | team-lead  |
|  4  | QA         |
###### Table "employee_to_role":
| id  | employee_id | role_id |
|:---:|:-----------:|:-------:|
|  1  |      1      |    1    |
|  2  |      1      |    2    |
|  3  |      2      |    1    |
|  4  |      2      |    2    |
|  5  |      2      |    3    |
|  6  |      3      |    4    |

### 3NF - Third Normal Form
* A Table is already in 2 NF
* There is no transitive functional dependency
* Non-Primary key columns shouldn’t depend on the other non-Primary key columns

#### Not normalized 3NF:
| id  | Employee |  team   | team_description |
|:---:|:--------:|:-------:|:-----------------|
|  1  |   Mark   | team 1  | financial        |
|  2  |   Will   | team 2  | pharmacology     |
|  3  |   Anna   | team 3  | delivery         |

#### Normalized 3NF:
###### Table "employee":
| id  | Employee | team_id |
|:---:|:--------:|:-------:|
|  1  |   Mark   |    1    |
|  2  |   Will   |    2    |
|  3  |   Anna   |    3    |
###### Table "team":
| id  |  name   | description  |
|:---:|:-------:|:-------------|
|  1  | team 1  | financial    |
|  2  | team 2  | pharmacology |
|  3  | team 3  | delivery     |

### BCNF - Boyce Codd Normal Form
* A Table is already in 3 NF
* For any dependency A → B, A cannot be a non-prime attribute, if B is a prime attribute

#### Not normalized BCNF:
| student_id | subject | professor |
|:----------:|:-------:|:---------:|
|     1      |  Java   | prof.java |
|     1      |   GO    |  prof.go  |
|     2      |   SQL   | prof.sql  |
|     3      |   GO    |  prof.go  |
|     4      |  Java   | prof.java |

#### Normalized BCNF:
###### Table "professor":
| id  |  professor  | subject  |
|:---:|:-----------:|:--------:|
|  1  |  prof.java  |   Java   |
|  2  |   prof.go   |    GO    |
|  3  |  prof.sql   |   SQL    |
###### Table "student_to_professor":
| student_id | professor_id |
|:----------:|:------------:|
|     1      |      1       |
|     1      |      2       |
|     2      |      3       |
|     3      |      2       |
|     4      |      1       |

### 4NF - Fourth Normal Form
* A Table is already in BCNF
* It doesn't have Multi-Valued Dependency.

#### Not normalized 4NF:
###### Table "franchisee_book_location":
| Franchisee ID | Book               | Location |
|:-------------:|:-------------------|:---------|
|       1       | Beginning MySQL... | Florida  |
|       1       | Beginning MySQL... | Texas    |
|       1       | The Relational...  | Florida  |
|       1       | The Relational...  | Texas    |
|       2       | Beginning MySQL... | Florida  |
|       2       | Beginning MySQL... | Texas    |
|       2       | The Relational...  | Florida  |
|       2       | The Relational...  | Texas    |
|       3       | Beginning MySQL... | Texas    |

#### Normalized 4NF:
###### Table "franchisee_book"
| Franchisee ID | Book               |
|:-------------:|:-------------------|
|       1       | Beginning MySQL... |
|       1       | The Relational...  |
|       2       | Beginning MySQL... |
|       2       | The Relational...  |
|       3       | Beginning MySQL... | 

###### Table "franchisee_location"
| Franchisee ID | Location  |
|:-------------:|:----------|
|       1       | Florida   |
|       1       | Texas     |
|       2       | Florida   |
|       2       | Texas     |
|       3       | Texas     |

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

