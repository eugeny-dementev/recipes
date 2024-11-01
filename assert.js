export const assert = {
  is(value, reference, message) {
    if (value === reference) {
      return true;
    }

    throw new TypeError(message);
  },

  isString(value, message) {
    if (typeof value === 'string') {
      return;
    }

    throw new TypeError(message);
  },

  isBoolean(value, message) {
    if (typeof value === 'boolean') {
      return;
    }

    throw new TypeError(message);
  },

  isObject(value, message) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return;
    }

    throw new TypeError(message);
  },

  isFunction(value, message) {
    if (typeof value === 'function') {
      return;
    }

    throw new TypeError(message);
  },

  oneOf(value, values, message) {
    if (values.includes(value)) {
      return
    }

    throw new TypeError(message || `value should be on of ${values.join(',')} but it is: ${value}`);
  },

  isIn(value, dict, message) {
    if (dict.has(value)) {
      return;
    }

    throw new TypeError(message || 'value should exist in provided dictionary');
  },

  isInstanceOf(value, klass, message) {
    if (value instanceof klass) {
      return;
    }

    throw new TypeError(message);
  },

  isFalse(value, message) {
    if (value === false) {
      return
    }

    throw new TypeError(message);
  },
};
