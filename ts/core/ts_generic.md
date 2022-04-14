# Generics
***

## Function using type parameters
```typescript
function func1<T>(items: T[], callback: (item: T) => T): T[] {}
```

## Interface with multiple types
```typescript
interface Pair<T1, T2> {
  first: T1;
  second: T2;
}
```

## Constrained type parameter
```typescript
interface Lengthwise {
    length: number;
}
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length); //no error
    return arg;
}
```

### Default type parameter
```typescript
function func1<T = ConstrainedType>(): T {}
```

## Constrained and default type parameter
```typescript
function func1<T extends ConstrainedType = ConstrainedType>(): T {}
```

## Using Type Parameters in Generic Constraints
```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // no error
getProperty(x, "m"); // error!
```

## Using Class Types in Generics
```typescript
class ZooKeeper {
  nametag: string = "Mikle";
}
class Animal {
  numLegs: number = 4;
}
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
```
