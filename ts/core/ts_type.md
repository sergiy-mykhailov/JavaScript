# Types
***

# Primitive types

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

# Object type literals

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

# Union and intersection types

### Union type
```typescript
let myUnionVariable: number | string;
```

### Intersection type
```typescript
let myIntersectionType: Foo & Bar;
```

# Arrays and tuples
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

# Functions

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

# Generics
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

# Partial and mapped types
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

# Conditional types
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

