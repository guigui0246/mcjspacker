declare type CommandProto = {
  toTemplate(): [ValidParam1, ValidParam2[]];
};

type Context = {
  [prop: string]: Context;
  [Symbol.toStringTag]: () => string;
  [Symbol.toPrimitive]: () => string;
  (...args: unknown[]): Context;
};

/** @deprecated Arbitrary command strings are supported, but not recommended. */
type OtherCommand = (string & {});

type CommandType = (
  "help" |
  "give" |
  "tp" |
  OtherCommand
)

type FullCommand = `${CommandType}${string}`;

type ValidParam1 = TemplateStringsArray | string | CommandProto;
type ValidParam2 = ((...args: [ValidParam1, ...ValidParam2[]]) => any) | CommandProto | string;
