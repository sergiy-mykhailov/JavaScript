# Data structure
***

## Stack
**Stack** - упорядоченная последовательность данных (LIFO)

Операции стека:
- push(data) добавляет данные в конец.
- pop() удаляет последние добавленные данные.

## Queue
**Queue** - упорядоченная последовательность данных (FIFO)

Операции стека:
- push(data) добавляет данные в конец.
- shift() удаляет первые добавленные данные.

## Map
The Map object holds key-value pairs and remembers the original insertion order of the keys. 
Any value (both objects and primitive values) may be used as either a key or a value. 

```javascript
const myMap = new Map([['key1', 'value1'], ['key2', 'value2']])
myMap.set(3, 3000)
myMap.set(true, 'value4')
myMap.size              // 4
myMap.get('key1')       // 'value1'
myMap.has(3)            // true
myMap.delete(3)
myMap.clear()
myMap.size              // 0
```

## Map vs WeakMap
**WeakMap** — коллекция пар ключ-значение. В качестве ключей могут быть использованы только объекты, 
а значения могут быть произвольных типов.
### Особенности:
- В качестве ключей могут быть использованы только объекты
- WeakMaps имеют “weak” («слабые») обращения к ключам объекта, не препятствие сборщику мусора, когда мы больше не имеем объекта-ключа.
- ключи WeakMap не перечисляемы (то есть нет метода, который возвращает список ключей)

## Set
**Set** позволяют вам сохранять уникальные значения любого типа, как примитивы, так и другие типы объектов.

```javascript
var mySet = new Set([1, 2]);
mySet.add(1); // Set { 1 }
mySet.add(5); // Set { 1, 5 }
mySet.add(5); // Set { 1, 5 }
mySet.add("text"); // Set { 1, 5, 'some text' }
var o = { a: 1, b: 2 };
mySet.add(o);
mySet.size;     // 5
mySet.has(5);   // true
mySet.has(3);   // false
mySet.has(o);   // true
mySet.delete(5); // удаляет 5 из set
mySet.has(5);    // false, 5 было удалено
```

## Set vs WeakSet
**WeakSet** - коллекция, элементами которой могут быть только объекты. 
### Особенности:
- элементами - только объекты.
- Ссылки на объекты в WeakSet являются слабыми. Каждый объект может быть добавлен в WeakSet только один раз.
- WeakSet не итерируем, так как нет возможности получить список текущих хранимых в WeakSet объектов.

## Objects vs. Maps
| Map                                      | Object                                                                             |
|:-----------------------------------------|:-----------------------------------------------------------------------------------|
| does not contain any keys by default     | has a prototype, so it contains default keys that could collide with your own keys |
| keys can be any value                    | keys must be either a `String` or a `Symbol`                                       |
| has original insertion order             | -                                                                                  |
| has `size` property - number of items    | -                                                                                  |
| iterable                                 | not iterable                                                                       |
| optimized for add\remove key-value pairs | not optimized                                                                      |
| No serialization                         | `JSON.stringify()` and `JSON.parse()`                                              |

## Tree vs Graph
| Graph                                                   | Tree                                                                                       |
|:--------------------------------------------------------|:-------------------------------------------------------------------------------------------|
| can have a bidirectional path between two nodes         | can have only one path between two nodes.                                                  |
| no root node                                            | The root is the topmost node in the tree data structure. It does not have any parent node. |
| can have a loop structure                               | cannot have a loop structure                                                               |
| more complex (loop structure)                           | 	less complex                                                                              |
| BFS (Breadth-First Search) and DFS (Depth First Search) | pre-order, in-order, and post-order                                                        |
| network-like model structure                            | hierarchical-like model structure.                                                         |
| has many neighbors                                      | has one parent, many children                                                              |

### BFS (Breadth-First Search) Algorithm
- Step 1: Define a Queue
- Step 2: Select the root node of the Graph as a starting point for the traversal
- Step 3: Visit all the adjacent node of the root node and inserted them into the Queue.
- Step 4: If the node inserted in the queue has its adjacent nodes than insert them also in the queue from the rear point or else delete the node.
- Step 5: Repeat Step 3 and 4 until the queue becomes empty or the node is founded.

### DFS (Depth First Search) Algorithm
- Step 1: Start Traversing with the head node.
- Step 2: Visit the adjacent node and push it into the stack.
- Step 3: Repeat Step 2 until reach the leaf node.
- Step 4: Once reached to the leaf node pop it from the stack.
- Step 5: Pop all the nodes that have been push into the stack and have no further adjacent node to visit (backtracking).
