export default (value) => value instanceof Object
  && !(value instanceof Array)
  && !(value instanceof Function);
