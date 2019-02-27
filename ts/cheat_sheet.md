# **TypeScript - Cheat Sheet**
***

# 1. Usage

## Install:
```bash
npm install typescript
```
## Run:
```bash
tsc
```

# 2. Primitive types

Description                  | Type
:----------------------------|:----
Any type (explicitly untyped)|`any`
void type (undefined or null, use for function returns only)|`void`
Undefined type|`undefined`
Null type|`null`
never type|`never`
unknown type |`unknown`
String (including ES6 multi-line string templates)|`string`
Number|`number`
Boolean|`boolean`
object (may be an Object or non-primitive)|`object`

# 3. Named types (interface, class, enum)

### Interface
```typescript
interface Child extends Parent, SomeClass {
  property: Type;
  optionalProp?: Type;
  optionalMethod?(arg1: Type): ReturnType;
}
```

### Class
```typescript
class Child extends Parent implements Child, OtherChild {
  property: Type;
  defaultProperty: Type = 'default value';
  private _privateProperty: Type;
  private readonly _privateReadonlyProperty: Type;
  static staticProperty: Type;
  constructor(arg1: Type) {
    super(arg1);
  }
  private _privateMethod(): Type {}
  methodProperty: (arg1: Type) => ReturnType;
  overloadedMethod(arg1: Type): ReturnType;
  overloadedMethod(arg1: OtherType): ReturnType;
  overloadedMethod(arg1: CommonT): CommonReturnT {}
  static staticMethod(): ReturnType {}
  subclassedMethod(arg1: Type): ReturnType {
    super.subclassedMethod(arg1);
  }
}
```

### Enum
```typescript
enum Options {
  FIRST,
  EXPLICIT = 1,
  BOOLEAN = Options.FIRST | Options.EXPLICIT
}
enum Colors {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}
```

# 4. Object type literals

### Object with implicit Any properties
```typescript
{ foo; bar; }
```

### Object with optional property
```typescript
{ required: Type; optional?: Type; }
```

### Hash map
```typescript
{ [key: string]: Type; }
```

# 5. Union and intersection types

### Union type
```typescript
let myUnionVariable: number | string;
```

### Intersection type
```typescript
let myIntersectionType: Foo & Bar;
```

# 6. Arrays and tuples
### Array of strings
```typescript
string[]
Array<string>
```

### Array of functions that return strings
```typescript
{ (): string; }[]
Array<() => string>
```

### Tuples
```typescript
let myTuple: [ string, number, boolean? ];
myTuple = [ 'test', 42 ];
```

# 7. Functions

### Function 	
```typescript
{ (arg1: Type, argN: Type): Type; } 
(arg1: Type, argN: Type) => Type;
 ```
### Constructor 
```typescript
{ new (): ConstructedType; }
new () => ConstructedType;
```
### Function type with optional param
```typescript
(arg1: Type, optional?: Type) => ReturnType
```
### Function type with rest param
```typescript
(arg1: Type, ...allOtherArgs: Type[]) => ReturnType
```
### Function type with static property 
```typescript
{ (): Type; staticProp: Type; }
```
### Default argument 
```typescript
function fn(arg1: Type = 'default'): ReturnType {}
```
### Arrow function 
```typescript
(arg1: Type): ReturnType => {}
(arg1: Type): ReturnType => Expression
```
### this typing 
```typescript
function fn(this: Foo)
```

# 8. Generics
### Function using type parameters
```typescript
<T>(items: T[], callback: (item: T) => T): T[]
```

### Interface with multiple types
```typescript
interface Pair<T1, T2> {
  first: T1;
  second: T2;
}
```

### Constrained type parameter
```typescript
<T extends ConstrainedType>(): T
```

### Default type parameter
```typescript
<T = ConstrainedType>(): T
```

### Constrained and default type parameter
```typescript
<T extends ConstrainedType = ConstrainedType>(): T
```

# 9. Partial and mapped types
### Partial type
```typescript
Partial<{ x: number; y: number; z: number; }>
// is equivalent to
{ x?: number; y?: number; z?: number; }
```

### Readonly type
```typescript
Readonly<{ x: number; y: number; z: number; }>
// is equivalent to
{
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
```

### Pick type
```typescript
Pick<{ x: number; y: number; z: number; }, 'x' | 'y'>
// is equivalent to
{ x: number; y: number; }
```

### Record type
```typescript
Record<'x' | 'y' | 'z', number>
// is equivalent to
{ x: number; y: number; z: number; }
```

# 10. Conditional types
### Conditional types
```typescript
declare function createLabel<T extends number | string>(idOrName: T): T extends number ? Id : Name;
```

### Exclude
```typescript
type Excluded = Exclude<string | number, string>;
// is equivelant to
number
```

### Extract
```typescript
type Extracted = Extract<string | number, string>;
// is equivelant to
string
```

### NonNullable
```typescript
type NonNull = NonNullable<string | number | void>;
// is equivalent to
string | number
```

### ReturnType
```typescript
type ReturnValue = ReturnType<() => string>;
// is equivalent to
string
```

### InstanceType
```typescript
class Renderer() {}
type Instance = InstanceType<typeof Renderer>;
// is equivalent to
Renderer
```

# 11. Other
### Type of a variable
```typescript
typeof varName
```
