// 各种ts操作的方法

/**
 * 元祖类型推断，返回的是一个可以被推断的元祖类型
 */
export function tuplify<T extends unknown[]>(...elements: T) {
  return elements;
}