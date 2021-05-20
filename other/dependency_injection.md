# Dependency Injection

**Внедрение зависимости (Dependency injection)** — процесс предоставления внешней зависимости программному компоненту.
Является специфичной формой «инверсии управления» (Inversion of control), когда она применяется к управлению зависимостями.

```typescript
import { Engine } from './Engine';
class Car {
    private engine: Engine;
    public constructor (engine: Engine) {
        this.engine = engine;
    }
    
    public startEngine(): void {
        this.engine.fireCylinders();
    }
}
```

Car получил или внедрил экземпляр Engine из более высокого уровня управления в его конструкторе.
Инъекция зависимостей — акт передачи зависимости в другой класс или функцию.
