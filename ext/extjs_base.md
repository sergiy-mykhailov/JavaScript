
# Ext.js - Base Level

## 1. Components
## 2. Layouts and Containers
## 3. Presenting Data
## 4. Handling Events
## 5. Data Forms
## 6. Data Binding
## 7. Application architecture
## 8. Reading Docs


***


## 9. Other

### Система классов в Ext JS

#### Определение классов 

##### Method Ext.define ([Ext.define](http://docs.sencha.com/extjs/6.5.3/modern/Ext.html#method-define)):
```
Ext.define(className, members, onClassCreated);
```
##### Parameters:
* **className** (*String*) - имя класса в виде строки
* **members** (*Object*) - представляет коллекцию членов класса в виде пар ключ-значение
* **onClassCreated** (*Function*) - необязательный параметр. Представляет функцию обратного вызова, которая вызывается после создания объекта данного класса

##### Members ([Ext.Class](http://docs.sencha.com/extjs/6.5.3/modern/Ext.Class.html)):
* **alias** - устанавливает псевдоним нового класса
* **alternateClassName** - определяет альтернативные имена для нового класса
* **cachedConfig**
* **config** - определяет свойства, у этих свойств создаются методы get/set/applay/reset
* **extend** - определяет наследование от классов
* **inheritableStatics** - наследует статические члены родительского класса, если таковые определены
* **mixins** - добавляет к текущему классу функциональность миксин-классов
* **override**
* **platformConfig**
* **privates**
* **requires**
* **self**
* **singleton** - создает одиночный объект нового класса
* **statics** - определяет статические члены класса
* **uses** -  импортирует классы, которые будут использоваться вместе с новым классом
* **xtype** (for Ext.Component only) -  определяет параметр xtype для нового класса
