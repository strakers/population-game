import type { Sex } from "../components/beings/Person";
import { boyNames, girlNames, surnames } from "./constants";

/**
 * Resolves a random number between the given options
 */
export function randomize(options: number, weightingFunction?: number | null): number;
export function randomize(options: any[], weightingFunction?: Function | null): any;
export function randomize(options: number|any[], weightingFunction: Function|number|null = null) {
  // get random number between
  if (typeof options === 'number' && (!weightingFunction || typeof weightingFunction === 'number')) {
    return randomNumber(options, weightingFunction);
  }

  if (!isArray(options)) {
    throw new TypeError("Incorrect argument type provided. Must be an array.");
  }

  let index = Math.floor(Math.random() * options.length);
  if (index === options.length) index--;
  if (weightingFunction && isFunction(weightingFunction)) {
    index = weightingFunction(index);
  }
  return options[index];
}

/**
 *
 */
export function randomNumber(max: number, min: number|null = null): number {
  const
    lower_limit = min || 0,
    upper_limit = max - lower_limit;
  return Math.floor(Math.random() * upper_limit) + lower_limit;
}

export function generateFirstName(byGender: Sex|null = null) {
  let names;
  if (byGender && ['M', 'F'].includes(byGender)) {
    names = byGender === 'M' ? boyNames : girlNames;
  }
  else {
    names = [...boyNames, ...girlNames];
  }

  return randomize(names);
}

export function generateSurname() {
  return randomize(surnames);
}

function isArray(value: any): value is any[] {
  return value.constructor === Array.prototype.constructor;
}

function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export default {
  randomize,
  generateFirstName,
};