/**
 * Object utility functions
 * Common operations for object manipulation
 */

/**
 * Deep clones an object
 * @param obj - Object to clone
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }
  
  const clonedObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  
  return clonedObj;
}

/**
 * Safely gets a nested property from an object using a path string
 * @param obj - The object to get the value from
 * @param path - Path to the property (e.g., 'user.address.city')
 * @param defaultValue - Default value if path doesn't exist
 */
export function getNestedValue<T, D = undefined>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: D
): T | D {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue as D;
    }
    result = result[key];
  }
  
  return (result === undefined) ? (defaultValue as D) : (result as T);
}

/**
 * Creates a new object with only the specified keys
 * @param obj - Original object
 * @param keys - Keys to include in the new object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T, 
  keys: K[]
): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
}

/**
 * Creates a new object excluding the specified keys
 * @param obj - Original object
 * @param keys - Keys to exclude from the new object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T, 
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

/**
 * Checks if an object is empty
 * @param obj - Object to check
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Merges two objects deeply
 * @param target - Target object
 * @param source - Source object
 */
export function deepMerge<T extends object, S extends object>(
  target: T,
  source: S
): T & S {
  const output = { ...target } as T & S;
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key as keyof S])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key as keyof S] });
        } else {
          output[key as keyof (T & S)] = deepMerge(
            target[key as keyof T] as object,
            source[key as keyof S] as object
          ) as any;
        }
      } else {
        Object.assign(output, { [key]: source[key as keyof S] });
      }
    });
  }
  
  return output;
}

/**
 * Helper: Checks if value is an object
 */
function isObject(item: any): item is object {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}
