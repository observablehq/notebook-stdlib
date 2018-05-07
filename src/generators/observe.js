import noop from "../noop";
import that from "../that";

export default function(initialize) {
  let stale = false;
  let value;
  let resolve;
  const dispose = initialize(change);

  function change(x) {
    if (resolve) resolve(x), resolve = null;
    else stale = true;
    return value = x;
  }

  function next() {
    return {done: false, value: stale
        ? (stale = false, Promise.resolve(value))
        : new Promise(_ => (resolve = _))};
  }

  return {
    [Symbol.iterator]: that,
    throw: noop,
    return: dispose == null ? noop : dispose,
    next
  };
}
