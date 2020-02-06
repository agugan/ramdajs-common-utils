
import * as R from "ramda";

// We can create overidden versions for of this function with n-parameters
export const brands = (state, pNode, cNode) =>
  R.pathOr([], [pNode, cNode], state);

export const isPropPresent = (state, param) => R.pathOr(param, [param], state);

// Slices the given string with indexes provided
export const sliceFn = (startIndex, endIndex, stringToBeSliced) =>
  R.slice(startIndex, endIndex, stringToBeSliced);

// Returns a curried version of the slice function. Helps us in sending partial parameters as needed.
export const curriedSliceFn = R.curry(sliceFn);

/**
 * @returns "" if the Array is Empty  else substrings
 */

export const constructRef = (startIndex, endIndex, values) => {
  return R.compose(
    R.join(""),
    R.map(curriedSliceFn(startIndex)(endIndex))
  )(values);
};

/**
 * Check whether an array is empty or contains specified param
 * As a best practice, unless you are completely sure, Its better to 
 * convert all the elements in your array as well as the element to be  
 * found to either upperCase or lowerCase.
 */
export const isArrayContainsSpecifiedValOrEmpty = (array, specified) =>
  R.converge(R.or, [R.isEmpty, R.contains])(R.toUpper(specified))(
    propsToUppercase(array)
  );

  /**
 * Check whether an array is not empty and contains specified param
 * As a best practice, unless you are completely sure, Its better to 
 * convert all the elements in your array as well as the element to be  
 * found to either upperCase or lowerCase.
 */
export const isArrayContainsSpecifiedVal = (array, specified) =>
  R.converge(R.and, [R.chain(R.not,R.isEmpty), R.contains])(R.toUpper(specified))(
    propsToUppercase(array)
  );

// converts the array of values to upper case, should be strings.
export const propsToUppercase = R.map(R.toUpper);

// Converts a string to its uppercase
export const propToUppercase = R.toUpper;

// converts the array of values to upper case, should be strings.
export const propsToLowercase = R.map(R.toLower);

// Converts a string to its uppercase
export const propToLowercase = R.toLower;

// This is an customized function, which returns whether the selected key is present in the given list.
export const isPresent = (sname, list) => {
  return R.contains(sname, list);
};

/**
 * Takes two arguments, first its the split character and second is the stringToBeSplit.
 */
export const splitStringToArray: (input:any, input2: any) => any[]= (splitCharacter: string, stringToBeSplit: string) =>
  R.split(splitCharacter, stringToBeSplit);

/**
 * Curried version of split strings to array. Cannot add types to the result of curriedSliceFnMore on it here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/ramda/ramda-tests.ts#L103
 */
export const curriedSplitStringToArray = R.curry(splitStringToArray);

/**
 * Returns a Partial Function with "/" as the first actual parameter
 */

export const splitUrlParams = curriedSplitStringToArray("/");

/**
 * Returns a Partial Function with " " as the first actual parameter
 */
export const splitStringAtEmptySpaces = curriedSplitStringToArray(" ");

/**
 * Removes any empty space available at the tail end.
 */
export const tailEmptySpace = fn => R.tail(fn);

/**
 * Checks whether the array is empty.
 */
export const isArrayEmpty = arr => R.isEmpty(arr);

/**
 * Removes Empty string, null, undefined from the given array
 */
export const removeEmptyStringFromArray = strArray => R.without(["", null, undefined], strArray);

// Sorts a given array by a specified property
export const sortArrayByProp = (propery, array) =>
  R.sortBy(
    R.compose(
      Number.parseInt,
      R.prop(propery)
    ),
    array
  );

/**
 * Join the array of strings by a specified character
 */
export const joinArrayToString = (joinCharacter, arrayToJoin) =>
  R.join(joinCharacter, arrayToJoin);

/**
 * Curied version of joinArrayToString
 */
export const curriedJoinArrayToString = R.curry(joinArrayToString);

/**
 * Custom function which retuns a PartialFunction with '/' as the first parameter.
 */
export const joinUrlParams = curriedJoinArrayToString("/");

/**
 * Custom function which retuns a PartialFunction with '-' as the first parameter.
 */
export const joinUrlParamsV2 = curriedJoinArrayToString("-");



export const constructId = R.compose(
  joinUrlParamsV2,
  propsToLowercase,
  splitStringAtEmptySpaces,
  R.trim,
  R.replace(/\(([^)]+)\)/g, "")
);
/**
 * FlattenArray is used to flatten the nested arrays into single array
 * For ex: [7, 8 [9, [10,11[12],13], 14 ], 15] is flattened into  [7, 8, 9, 10, 11, 12, 13, 14, 15].
 */
export const flattenArray = <T>(arr: T[]) => R.flatten(arr);
