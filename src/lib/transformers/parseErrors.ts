export const INTERNAL_BUG_MESSAGE =
  "This is an internal bug, please report to the github";

export type ParseErrorType =
  | "structural"
  | "unknownIdentifier"
  | "invalidArity"
  | "invalidEscape"
  | "internal";

export class ParseError extends Error {
  readonly type: ParseErrorType;

  constructor(type: ParseErrorType, message: string) {
    super(message);
    this.name = "ParseError";
    this.type = type;
  }
}

export class StructuralParseError extends ParseError {
  constructor(message: string) {
    super("structural", message);
    this.name = "StructuralParseError";
  }
}

export class UnknownIdentifierParseError extends ParseError {
  constructor(message: string) {
    super("unknownIdentifier", message);
    this.name = "UnknownIdentifierParseError";
  }
}

export class InvalidArityParseError extends ParseError {
  constructor(message: string) {
    super("invalidArity", message);
    this.name = "InvalidArityParseError";
  }
}

export class InvalidEscapeParseError extends ParseError {
  constructor(message: string) {
    super("invalidEscape", message);
    this.name = "InvalidEscapeParseError";
  }
}

export class InternalParseError extends ParseError {
  readonly detail: string;

  constructor(detail: string) {
    super("internal", INTERNAL_BUG_MESSAGE);
    this.name = "InternalParseError";
    this.detail = detail;
    console.error("[InternalParseError]", detail);
  }
}
