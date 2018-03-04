/**
 * Type of values of an object
 */
declare type ValueOf < Obj extends {} > = Obj[keyof Obj]
