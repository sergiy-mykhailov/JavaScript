# Enum

## Examples
```typescript
enum Options {
  FIRST,                                        // 0
  EXPLICIT = 1,                                 // 1
  BOOLEAN = Options.FIRST | Options.EXPLICIT    // 1
}
enum Colors {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}
enum Direction {
    Up = 1, // 1
    Down,   // 2
    Left,   // 3
    Right,  // 4
}
enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length,
}
```

## Enums at compile time
```typescript
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}
type LogLevelStrings = keyof typeof LogLevel;
// equivalent to:
// type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

enum EntityStatuses {
  ACTIVE = 'active',
  DRAFT = 'draft',
  PENDING = 'pending',
}
type StatusesKeys = keyof typeof EntityStatuses;                   // "ACTIVE" | "DRAFT" | "PENDING"
type StatusesValues = EntityStatuses[keyof typeof EntityStatuses]; // "active" | "draft" | "pending"
```

## const enums
```typescript
const enum Direction {
    Left,
    Right,
}
let directions = [Direction.Left, Direction.Right];

console.log(Direction)  // ReferenceError: const enums can only be used in property or index access
console.log(directions) // [0, 1]
```

## Objects vs Enums
```typescript
const enum EDirection {
  Left,
  Right,
}
const ODirection = {
  Left: 0,
  Right: 1,
} as const;
EDirection.Up; // value: 0
ODirection.Up; // value: 0

// Using the enum as a parameter:
function walk(dir: EDirection) {}

// Using the object as a parameter:
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}
```
