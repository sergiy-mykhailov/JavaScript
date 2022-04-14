# Interface

```typescript
interface ParentA {
  aa: number;
}
interface ParentB {
  bb: string;
  cc: string;
}
interface Child extends ParentA, ParentB {
  aa: number;
  bb: string;
  ff: boolean;
  optionalProp?: Type;
  optionalMethod?(arg1: Type): ReturnType;
}
```
