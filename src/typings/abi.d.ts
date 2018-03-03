/**
 * Application binary interface's item description
 * The typings based on solidity specification:
 * http://solidity.readthedocs.io/en/develop/abi-spec.html#json
 */
declare type AbiItemDescription = AbiFunctionDescription | AbiEventDescription

/** Application binary interface's function description */
declare interface AbiFunctionDescription {
  // The type of the function
  // The type can be omitted, defaulting to "function".
  type?: 'function' | 'constructor' | 'fallback'
  // The name of the function;
  // Constructor and fallback function never have name
  name: string
  // An array of objects
  // Fallback function doesn’t have inputs
  inputs?: AbiItemIO[]
  // An array of objects similar to inputs, can be omitted if function doesn’t
  // return anything.
  // Constructor and fallback function never have outputs
  outputs?: AbiItemIO[]
  // "true" if function accepts ether, defaults to false
  payable?: boolean
  // A string with one of the following values:
  // - pure (specified to not read blockchain state)
  // - view (specified to not modify the blockchain state)
  // - nonpayable
  // - payable (same as payable above).
  stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable'
  // "true" if function is either pure or view
  constant?: boolean
}

/** Type of an event description */
declare interface AbiEventDescription {
  // Type always "event"
  type: 'event'
  // The name of the event;
  name: string
  // An array of objects
  inputs: AbiEventIO[]
  // "true" if the event was declared as anonymous.
  anonymous: boolean
}

/** Type of input/output of an ABI item description */
declare interface AbiItemIO {
  // The name of the parameter
  name: string
  // The canonical type of the parameter (more below)
  type: string
  // Used for tuple types (more below)
  components?: AbiItemIO[]
}

/** Type of input/output of an ABI event description */
declare interface AbiEventIO extends AbiItemIO {
  // "true" if the field is part of the log’s topics, false if it one of the
  // log’s data segment.
  indexed?: boolean
}
