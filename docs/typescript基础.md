# TypeScript 类型基础

## 基础类型 「小写」

- ES6 当中的基础类型: Number, String, Boolean, Array, Function, Object, Symbol
- Ts 当中的额外类型: Void, Any, Never, 元祖, 枚举, 各种高级类型

### 基础类型 ( `number` )

> 如果变量有固定的值，那么ts可以推断出来「根据编辑器来查看是否可以推断出来」

```ts
let num: number = 1231313;
let hexNum: number = 0xf00d;
```

### 枚举

> 一般用于一个固定的参数集合，1，2，3。如果没有赋值，则按照顺序递增，例如 Sum = 7，那么 Mon = 8

```ts
enum Days {
  Sun = 7,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
```

## `interface` 

> 如果一个对象的类型是某个interface，那么这个对象需要实现这个interface，否则ts会报错。

### 属性类型

- 只读属性：在对象的外部修改这个属性会报错
- 必选属性：对象一定要实现这个属性
- 可选属性：对象不一定要实现这个属性
- 动态属性：额外的，未知的，可动态增加的属性 「注意这个属性可能跟其他属性的类型有冲突，所以属性类型只能是any，也就是说它要包括其他的所有的类型」

```ts
interface Person {
  // 只读属性，在对象的外部修改这个属性会报错
  readonly id: number
  // 必选属性，对象一定要实现这个属性
  age: number
  // 可选属性，对象不一定要实现这个属性
  uname?: string
  // 额外的，未知的，可动态增加的属性
  [propName: string]: any
}

// 实现
let yangfengyi: Person = {
  id: 30,
  age: 20
}

// 可选属性，如果没有的话，这里会报错
yangfengyi['xxx'] = '1231313'
```

## 数组与元祖

> 数组是类型一致的数组，元祖是类型不一致的数组

### 数组

- 定义方法1

  ```ts
  let arr1: number[] = [1, 2, 3];
  ```

- 定义方法2

  ```ts
  let arr2: Array<number> = [1, 2, 3];
  ```

- 定义方法3

  ```ts
  let arr3 = new Array<number>(4);
  console.log(arr3.length);// 4
  ```

- 定义方法4

  ```ts
  interface NumberArray = {
    [index: number]: number;
  }
  let arr4: NumberArray = [1, 2, 3];
  ```

### 类数组（`arguments`）的类型

> 获取原生的数据类型 `IArguments`，可以推断

```ts
function sum() {
  let args: IArguments = arguments;
}
```

### 元祖

```ts
let tupleArr: [number, string, boolean] = [1, '3', false]
```

### 元祖和数组的区别

> 当一个函数返回一个元祖的时候，我们通过结构的方法获取元祖某个值的时候，这个值的类型是一个元祖所有类型的联合类型

```ts
function useFetch() {
  const res: number = 1231313;
  const name: string = 'adfaf';

  return [ res, name ];
}

const [ res, name ] = useFetch()
// ! 这里的 res 和 name 都被推断为 string | number
```

- 解决方法1，通过const，将返回值重写为元祖

```ts
return [ res, name ] as const;
```

- 解决方法2，使用一个函数，返回一个元祖

```ts
function tuplify<T extends unknown[]>(...elements: T) {
  return elements;
}
```

## 函数定义

- 不要混淆ES6和TS当中 `=>`

  ```ts
  let myName: (x: number, y: number) => number = (
    x: number,
    y: number
  ) => {
    return x + y
  }
  ```

- 函数的默认值放到后面

  ```ts
  function buildName1(firstName: string, lastName: string = '12313') {
    return firstName + lastName
  }
  ```

- 剩余参数

  ```ts
  function push(arr: any[], ...items: any[]) {}
  ```

- 可选参数 （必须要放到后面）

  ```ts
  function buildName1(firstName: string, lastName?: string) {
    return firstName + lastName
  }
  ```