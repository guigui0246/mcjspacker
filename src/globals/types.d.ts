type Context = {
  [prop: string]: Context;
  [Symbol.toStringTag]: () => string;
  [Symbol.toPrimitive]: () => string;
  (...args: unknown[]): Context;
};

type CommandType = (
  "help" |
  "ban" |
  (string & {})
)

type FullCommand = `${CommandType}${string}`;
