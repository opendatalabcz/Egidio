import {Nullable} from "../types/common";
import {isObjectNull, isObjectNullOrUndefined} from "../predicates/object-predicates";
import {createAppendedErrorDescriptionString} from "./common-assertions";

export function requireType(value: any, type: string, description?: string) {
  if (typeof value !== type) {
    const appendedDescription = createAppendedErrorDescriptionString(description)
    throw new Error(`Required ${type}, got ${typeof value}!${appendedDescription}`)
  }
}

export function requireNotNull<T>(value: Nullable<T>, description?: string): T {
  if (isObjectNull(value)) {
    const appendedDescription = createAppendedErrorDescriptionString(description)
    throw new Error(`Required instance not to be null!${appendedDescription}`)
  }
  return value
}

export function requireDefinedNotNull<T>(value?: Nullable<T>, description?: string): T {
  if (isObjectNullOrUndefined(value)) {
    const appendedDescription = createAppendedErrorDescriptionString(description)
    throw new Error(`Required instance not to be null!${appendedDescription}`)
  }
  return value
}
