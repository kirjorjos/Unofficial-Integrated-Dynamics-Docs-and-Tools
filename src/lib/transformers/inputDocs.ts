export type DocEmphasis = "required" | "optional";

export interface DocSpan {
  text: string;
  emphasis?: DocEmphasis;
}

export interface DocSyntaxLine {
  spans: DocSpan[];
  note?: string;
}

export type InputDocOutputFormat = "visual";

export interface InputDocExample {
  kind: "concrete" | "structural";
  text: string;
  caption?: string;
  output?: InputDocOutputFormat;
}

export const inputDocExampleInput = (example: InputDocExample): string =>
  example.caption ? `-- ${example.caption}\n${example.text}` : example.text;

export interface DocLegendEntry {
  emphasis: DocEmphasis | "plain";
  label: string;
  description: string;
}

export interface DocLink {
  label: string;
  href: string;
}

export interface InputDocSection {
  heading: string;
  summary?: string;
  bullets?: string[];
  legend?: DocLegendEntry[];
  syntax?: DocSyntaxLine[];
  examples?: InputDocExample[];
  links?: DocLink[];
}

export type InputDocTabId =
  | "overview"
  | "expanded"
  | "codeline"
  | "condensed"
  | "visual";

export interface InputDocTab {
  id: InputDocTabId;
  label: string;
  sections: InputDocSection[];
}

export const INPUT_DOC_FORMAT_TAB_IDS = [
  "expanded",
  "codeline",
  "condensed",
] as const;

export type InputDocFormatTabId = (typeof INPUT_DOC_FORMAT_TAB_IDS)[number];

const plain = (text: string): DocSpan => ({ text });
const required = (text: string): DocSpan => ({ text, emphasis: "required" });
const optional = (text: string): DocSpan => ({ text, emphasis: "optional" });

const operatorLink = (key: string, label: string): DocLink => ({
  label,
  href: `#operator-${key}`,
});

const readerLink = (shortName: string, label: string): DocLink => ({
  label,
  href: `#readers-${shortName}`,
});

const readerAspectLink = (
  shortName: string,
  aspectKey: string,
  label: string
): DocLink => ({
  label,
  href: `#reader-${shortName}-${aspectKey.toLowerCase().replace(/_/g, "-")}`,
});

export const INPUT_DOC_TABS: InputDocTab[] = [
  {
    id: "overview",
    label: "Overview",
    sections: [
      {
        heading: "What these docs cover",
        summary:
          "These tabs describe every input each of the transformers accepts. The form is detected automatically from what you type, so choose an output format and click transform when you're ready.",
      },
      {
        heading: "Shared vs Unique syntax",
        summary:
          "Most things are shared, but not everything. The main differnces are definitions and argument grouping.",
      },
      {
        heading: "Names and references",
        summary:
          "Every form's own tab shows how definitions and references are written there.",
        bullets: [
          "Expanded declares variable names with varName = someValue, and @name resolves to the variable ID for an earlier definition.",
          "Code Line has no definitions: at the top level it is statements separated by semicolons, and @<statement number> resolves to the variable ID of the final card from an earlier statement.",
          "Condensed has no definitions and no references at the moment.",
          'In Expanded a name that needs quoting is wrapped as Variable("name") both where it is defined and where it is used, and Operator("name") looks up an operator value by name in every form.',
          "Materialize(expression) wraps an expression in a materializer. You may use Static(...) and Dynamic(...) to explicitly specify if something is abstracted to an expected paramater of the materalized operator if you want. By default, reader values are dynamic and everything else is static.",
        ],
      },
      {
        heading: "The settings panel",
        summary:
          "The settings panel allows you to control how the output looks within the form you choose, and also has some options for input.  Each setting has a hover tooltip for a description.",
      },
      {
        heading: "Required vs optional",
        summary: "Every structural skeleton is colour-coded:",
        legend: [
          {
            emphasis: "required",
            label: "required",
            description: "Needed data to be able to transform",
          },
          {
            emphasis: "optional",
            label: "optional",
            description: "Extra data you may choose to add",
          },
          {
            emphasis: "plain",
            label: "plain",
            description: "Normal syntax",
          },
        ],
      },
      {
        heading: "Reading the examples",
        summary:
          "Each transformer information tab has syntax examples, and runnable examples. You can click the runnable examples run them through the transformer and see what they produce",
      },
      {
        heading: "Comments",
        summary:
          "-- starts a comment that runs to the end of the line. All three text forms accept them, and a trailing comment belongs to the expression it follows. Turn on Preserve comments to keep them in Expanded output; Code Line and Condensed output don't currently re-emit them.",
      },
    ],
  },
  {
    id: "expanded",
    label: "Expanded",
    sections: [
      {
        heading: "Definitions",
        summary:
          "One definition per line. A name is given to an expression with =, and can carry a type signature written with ::.",
        syntax: [
          {
            spans: [required("name"), plain(" = "), required("expression")],
            note: "Give a name to an expression",
          },
          {
            spans: [
              required("name"),
              plain(" :: "),
              required("Type"),
              plain(" = "),
              required("expression"),
            ],
            note: "Typed definition",
          },
        ],
        examples: [
          { kind: "concrete", text: "x = 5" },
          {
            kind: "concrete",
            text: "a = 5\nb = add(a, 1)",
            caption: "refer to an earlier definition by name",
          },
        ],
      },
      {
        heading: "Application",
        summary:
          "A call is the operator name followed by its arguments. The expression part of an assignment can be either Code Line or Condensed form.",
        syntax: [
          {
            spans: [
              required("operator"),
              plain("("),
              required("arg1"),
              plain(", "),
              required("arg2"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("operator"),
              plain(" "),
              required("arg1"),
              plain(" "),
              required("arg2"),
            ],
          },
        ],
        examples: [
          { kind: "concrete", text: "a = add(1, 2)", caption: "parenthesized" },
          {
            kind: "concrete",
            text: "a = numberAdd 1 2",
            caption: "space-separated",
          },
        ],
        links: [operatorLink("ARITHMETIC_ADDITION", "add / numberAdd")],
      },
      {
        heading: "Type signatures",
        summary:
          "A signature is checked against the expression's real signature. In a typed definition the type must be one of the in-game types (Any, Integer, Long, Double, Number, String, Boolean, Null, NBT, Block, Item, Fluid, Entity, Ingredients, Recipe, Operator or List). You can give an Any a name by either directly using the name, or Any<name>.  In a similar syntax to Any<name>, List<type> is also valid.",
        syntax: [
          {
            spans: [
              required("name"),
              plain(" = "),
              required("expression"),
              plain(" :: "),
              required("Type"),
            ],
            note: "the signature may also follow the expression",
          },
          {
            spans: [required("name"), plain(" :: "), required("signature")],
            note: "standalone line; the name must already be defined, or be an inbuilt operator seen in the reference pages",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "x :: Integer = 5",
            caption: "typed definition",
          },
          {
            kind: "concrete",
            text: "x = 5 :: Integer",
            caption: "signature after the expression",
          },
          {
            kind: "structural",
            text: "name :: A -> B",
            caption: "A and B are generic slots",
          },
          {
            kind: "concrete",
            text: "pipe :: Operator -> (Operator -> Operator)",
            caption: "standalone signature of an inbuilt operator",
          },
        ],
        links: [operatorLink("OPERATOR_PIPE", "pipe")],
      },
      {
        heading: "Values",
        summary:
          "Numbers, strings, lists and NBT objects are written the same way in both Code Line and Condensed, meaning they're the same for an Expanded expression.",
        syntax: [
          {
            spans: [
              required("5"),
              plain(" / "),
              required("5l"),
              plain(" / "),
              required("3.0"),
            ],
            note: "integer, long (l suffix) and double (needs a decimal point)",
          },
          {
            spans: [
              required('"text"'),
              plain(" / "),
              required("'text'"),
              plain(" / "),
              required('"""text"""'),
            ],
            note: "double, single or triple quoted; \\ escapes the next character.",
          },
          {
            spans: [
              plain("["),
              required("value"),
              plain(", "),
              required("value"),
              plain("]"),
            ],
            note: "list",
          },
          {
            spans: [
              plain("{"),
              required('"key"'),
              plain(": "),
              required("value"),
              plain(", ...}"),
            ],
            note: "NBT object; keys are quoted JSON strings, values nest (a list or another object), and {} is valid",
          },
        ],
        examples: [
          { kind: "concrete", text: "picked = 2l", caption: "long" },
          { kind: "concrete", text: "ratio = 3.0", caption: "double" },
          {
            kind: "concrete",
            text: 'note = """say "hi" to the world"""',
            caption: "triple-quoted string",
          },
          {
            kind: "concrete",
            text: 'chosen = ["c:armor", "c:tools"]',
            caption: "list",
          },
          {
            kind: "concrete",
            text: "emptyTag = {}",
            caption: "empty NBT object",
          },
          {
            kind: "concrete",
            text: 'tag = {"display":{"Name":"Stone"},"Damage":0}',
            caption: "nested NBT object",
          },
          {
            kind: "concrete",
            text: 'tag = {"Colors":[1,2,3],"Items":["a"]}',
            caption: "lists inside an NBT object",
          },
        ],
      },
      {
        heading: "In-game values",
        summary:
          "Blocks, items, fluids and entities are written as a constructor call: the type name, a quoted id, then an optional size and an optional tag object for items and entities or properties object for blocks. The type name is case-insensitive, a tag object may be given without a size, and Operator looks up an operator value by nickname, official name or display name. In Code Line and Condensed a fluid is written with its id only.",
        syntax: [
          {
            spans: [
              required("Item"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {tag}"),
              plain(")"),
            ],
            note: 'e.g. Item("minecraft:stone", 64, {"display":{"Name":"Stone"}})',
          },
          {
            spans: [
              required("Block"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {properties}"),
              plain(")"),
            ],
            note: 'e.g. Block("minecraft:oak_log", 1, {"axis":"x"})',
          },
          {
            spans: [
              required("Fluid"),
              plain("("),
              required('"id"'),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Entity"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {tag}"),
              plain(")"),
            ],
            note: 'e.g. Entity("minecraft:cow", 1)',
          },
          {
            spans: [
              required("Operator"),
              plain("("),
              required('"name"'),
              plain(")"),
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'stone = Item("minecraft:stone", 1)',
            caption: "item with a size",
          },
          {
            kind: "concrete",
            text: 'named = Item("minecraft:stone", {"display":{"Name":"Stone"}})',
            caption: "tag object without a size",
          },
          {
            kind: "concrete",
            text: 'stack = Block("minecraft:stone", 64)',
            caption: "block with a size",
          },
          {
            kind: "concrete",
            text: 'cow = Entity("minecraft:cow", 1)',
          },
          {
            kind: "concrete",
            text: 'water = Fluid("minecraft:water")',
          },
          {
            kind: "concrete",
            text: 'orOperator = Operator("integrateddynamics:logical_or")',
            caption: "official name, nickname and display name all work",
          },
        ],
        links: [operatorLink("LOGICAL_OR", "logical_or")],
      },
      {
        heading: "Readers",
        summary:
          "A reader call names a reader, an optional part id, an aspect, optional aspect settings and an optional simulated result. Reader names are case-insensitive and the aspect may be written as its enum key or its display name.",
        syntax: [
          {
            spans: [
              required("ReaderName"),
              optional("(partID)"),
              plain("."),
              required("aspectName"),
              plain("("),
              optional("{settings}, simulatedOutput"),
              plain(")"),
            ],
            note: "dotted form; () is the same as leaving the part id out",
          },
          {
            spans: [
              required("shortNameReader"),
              plain("("),
              required('"aspect"'),
              optional(", {settings}, simulatedOutput"),
              plain(")"),
            ],
            note: "the reader's short name with a Reader suffix",
          },
          {
            spans: [
              required("reader"),
              plain("("),
              required('"reader"'),
              plain(", "),
              required('"aspect"'),
              optional(", {settings}, simulatedOutput"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("readers"),
              plain("."),
              required("shortName"),
              plain("."),
              required("aspect"),
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'slotOne = InventoryReader(0).slotItem({"slot":1})',
            caption: "part id 0, aspect settings",
          },
          {
            kind: "concrete",
            text: 'slotByDisplayName = inventoryReader("Slot Item")',
            caption: "short name and aspect display name",
          },
          {
            kind: "concrete",
            text: 'slotGeneric = reader("inventory", "slot_item")',
            caption: "generic form",
          },
          {
            kind: "concrete",
            text: "slotShort = readers.inventory.slotItem",
            caption: "readers.<shortName> form",
          },
        ],
        links: [
          readerLink("inventory", "Inventory reader"),
          readerAspectLink(
            "inventory",
            "OBJECT_ITEM_STACK_SLOT",
            "Slot Item aspect"
          ),
        ],
      },
      {
        heading: "Quoted names and references",
        summary:
          'A plain name is an identifier of letters, digits and underscores: it cannot contain spaces or punctuation and cannot be an operator nickname such as add or apply, because that would hide the operator. A name that is not a plain identifier is written as Variable("..."), both where it is defined and where it is used. @name refers to the variable ID of an earlier definition.',
        syntax: [
          {
            spans: [required("name"), plain(" = "), required("expression")],
            note: "plain identifier, e.g. picked",
          },
          {
            spans: [
              required('Variable("name")'),
              plain(" = "),
              required("expression"),
            ],
            note: "declare a name that needs quoting",
          },
          {
            spans: [plain("@"), required("name")],
            note: "last card of an earlier definition, e.g. @step0",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'Variable("my cool variable") = 5\nfinal = numberAdd(Variable("my cool variable"), 1)',
            caption: "quoted name defined and used",
          },
          {
            kind: "concrete",
            text: "step0 = 319\nstep1 = 236\nfinal = apply(apply(map, NetworkReader.variableValueById), [@step0, @step1])",
            caption: "@name inside a list",
          },
        ],
      },
      {
        heading: "Lambdas",
        summary:
          "A lambda is written param => expression, or as a definition whose parameters name its arguments.",
        syntax: [
          {
            spans: [required("param"), plain(" => "), required("expression")],
          },
          {
            spans: [
              required("name"),
              plain(" "),
              required("param..."),
              plain(" = "),
              required("expression"),
            ],
            note: "definition form; the parameters become the lambda's arguments",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "inc = x => numberAdd x 1",
            caption: "arrow form",
          },
          {
            kind: "concrete",
            text: "inc x = numberAdd x 1",
            caption: "same thing, definition form",
          },
          {
            kind: "concrete",
            text: "getGenome path bee = nbtPathMatchAll path (itemNBT bee)",
            caption: "two parameters",
          },
        ],
        links: [operatorLink("ARITHMETIC_ADDITION", "add / numberAdd")],
      },
      {
        heading: "Materializing readers",
        summary:
          "Materialize(expression) puts a materializer around the expression. Readers inside it are abstracted into the lambda's parameters instead of being read by the card, and the materializer's result is that lambda. Dynamic(expression) makes an expression a parameter in its own right, and Static(expression) pins an expression so its readers stay inside the card. Parameters are named after the readers they came from and follow the order those readers first appear in; an identical reader used more than once shares one parameter. A Materialize inside another Materialize is consumed by the inner one, which leaves it static for the outer one.",
        syntax: [
          {
            spans: [
              required("Materialize"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "the readers in the expression become the lambda's parameters",
          },
          {
            spans: [
              required("Dynamic"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "give an expression a parameter of its own, even without a reader in it",
          },
          {
            spans: [
              required("Static"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "keep an expression fixed so its readers are not abstracted",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "slotCount = Materialize(InventoryReader(0).inventoryCount)",
            caption: "the materializer's result is a lambda over the reader",
          },
          {
            kind: "concrete",
            text: "total = Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))",
            caption:
              "the reader becomes the parameter, the 2 is built into the card",
          },
          {
            kind: "concrete",
            text: "fixed = Materialize(Static(InventoryReader(0).inventoryCount))",
            caption: "Static keeps the reader inside the card",
          },
          {
            kind: "concrete",
            text: "extra = Materialize(numberAdd(Dynamic(1), InventoryReader(0).inventoryCount))",
            caption: "Dynamic adds a parameter that has no reader in it",
          },
        ],
        links: [
          readerLink("inventory", "Inventory reader"),
          readerAspectLink(
            "inventory",
            "INTEGER_COUNT",
            "Inventory Count aspect"
          ),
          operatorLink("ARITHMETIC_ADDITION", "add / numberAdd"),
        ],
      },
      {
        heading: "Comments",
        summary: "A comment can sit on its own line or trail a definition.",
        examples: [
          { kind: "concrete", text: "-- note\nx = 5", caption: "own line" },
          { kind: "concrete", text: "x = 5 -- note", caption: "trailing" },
        ],
      },
      {
        heading: "Putting it together",
        summary:
          "Definitions can be written in any order and refer to each other by name.",
        examples: [
          {
            kind: "concrete",
            text: 'stack = Item("minecraft:stone", 64)\nslot = InventoryReader(0).slotItem({"slot":1})\nmatches = eq(slot, stack)',
            caption: "a small program",
          },
          {
            kind: "concrete",
            text: "step0 = 319\nstep1 = 236\ntotal :: Number = numberAdd(step0, step1)\nresult = numberAdd(total, 1)",
            caption: "typed definition used by a later definition",
          },
        ],
        links: [operatorLink("ARITHMETIC_ADDITION", "add / numberAdd")],
      },
    ],
  },
  {
    id: "codeline",
    label: "Code Line",
    sections: [
      {
        heading: "Application",
        summary:
          "Write the operator first, then its arguments separated by spaces. Parentheses may be used to make sub-calls as arguments as shown in Grouping.",
        syntax: [
          {
            spans: [
              required("operator"),
              plain(" "),
              required("arg1"),
              plain(" "),
              required("arg2"),
            ],
          },
        ],
        examples: [
          { kind: "concrete", text: "add 2 3" },
          { kind: "concrete", text: "apply add 1 2" },
        ],
        links: [operatorLink("OPERATOR_APPLY", "apply")],
      },
      {
        heading: "Grouping",
        summary:
          "Wrap a sub-expression in parentheses to use its result as an argument.",
        syntax: [{ spans: [plain("("), required("expression"), plain(")")] }],
        examples: [{ kind: "concrete", text: "add 2 (multiply 3 4)" }],
        links: [operatorLink("ARITHMETIC_MULTIPLICATION", "multiply")],
      },
      {
        heading: "Values",
        summary:
          "A value is the simplest possible argument: a number, a quoted string, true, false or null a [ ... ] list or { ... } NBT object.",
        syntax: [
          {
            spans: [
              required("5"),
              plain(" / "),
              required("5l"),
              plain(" / "),
              required("3.0"),
            ],
            note: "integer, long (l suffix) and double (needs a decimal point)",
          },
          {
            spans: [
              required('"text"'),
              plain(" / "),
              required("'text'"),
              plain(" / "),
              required('"""text"""'),
            ],
            note: "double, single or triple quoted; \\ escapes the next character, and -- inside a string is not a comment",
          },
          {
            spans: [
              plain("["),
              required("value"),
              plain(", "),
              required("value"),
              plain("]"),
            ],
            note: "list",
          },
          {
            spans: [
              plain("{"),
              required('"key"'),
              plain(": "),
              required("value"),
              plain(", ...}"),
            ],
          },
        ],
        examples: [
          { kind: "concrete", text: "5l", caption: "long" },
          { kind: "concrete", text: "3.0", caption: "double" },
          {
            kind: "concrete",
            text: '["c:armor", "c:tools"]',
            caption: "list",
          },
          {
            kind: "concrete",
            text: 'add {"a":1} 1',
            caption: "NBT object as an argument",
          },
          {
            kind: "concrete",
            text: "'it\\'s \"quoted\"'",
            caption: "single-quoted string with an escape",
          },
          {
            kind: "concrete",
            text: '"""say "hi" to the world"""',
            caption: "triple-quoted string",
          },
        ],
      },
      {
        heading: "In-game values",
        summary:
          "Blocks, items, fluids and entities are written as a constructor call: the type name, a quoted id, then an optional size or amount and an optional tag or properties object. The type name is case-insensitive, a tag object may be given without a size, and in Code Line a fluid takes an amount.",
        syntax: [
          {
            spans: [
              required("Item"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {tag}"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Block"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {properties}"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Fluid"),
              plain("("),
              required('"id"'),
              optional(", amount"),
              optional(", {tag}"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Entity"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {tag}"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Operator"),
              plain("("),
              required('"name"'),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Variable"),
              plain("("),
              required('"name"'),
              plain(")"),
            ],
            note: "a reference whose name needs quoting",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'itemNBT Item("minecraft:stone", 1)',
            caption: "constructor in an argument position",
          },
          {
            kind: "concrete",
            text: 'itemNBT Item("minecraft:stone", 64, {"display":{"Name":"Stone"}})',
            caption: "with a tag object",
          },
          {
            kind: "concrete",
            text: 'itemNBT Fluid("minecraft:water", 1000)',
            caption: "fluid with an amount",
          },
          {
            kind: "concrete",
            text: 'itemNBT Entity("minecraft:cow", 1)',
          },
        ],
      },
      {
        heading: "Operator names",
        summary:
          "An operator is written by any of its names: a nickname such as add, its official name, or its display name. apply, pipe and flip are ordinary operators written the same way, and fliped operators have a shorthand, flip<Nickname>, to obtain the flipped form.",
        examples: [
          { kind: "concrete", text: "booleanOr true false" },
          {
            kind: "concrete",
            text: "flipListContainsPredicate",
            caption: "implicit flip: flip + the operator's nickname",
          },
        ],
        links: [
          operatorLink("LOGICAL_OR", "booleanOr"),
          operatorLink("OPERATOR_APPLY", "apply"),
          operatorLink("OPERATOR_PIPE", "pipe"),
          operatorLink("OPERATOR_FLIP", "flip"),
        ],
      },
      {
        heading: "Readers",
        summary:
          "A reader call names a reader, an optional part id, an aspect, optional aspect settings and an optional simulated result. Reader names are case-insensitive and the aspect may be written as its enum key or its display name.",
        syntax: [
          {
            spans: [
              required("ReaderName"),
              optional("(partID)"),
              plain("."),
              required("aspectName"),
              plain("("),
              optional("{settings}, simulatedOutput"),
              plain(")"),
            ],
            note: "dotted form; () is the same as leaving the part id out",
          },
          {
            spans: [
              required("shortNameReader"),
              plain("("),
              required('"aspect"'),
              optional(", {settings}, simulatedOutput"),
              plain(")"),
            ],
            note: "the reader's short name with a Reader suffix",
          },
          {
            spans: [
              required("reader"),
              plain("("),
              required('"reader"'),
              plain(", "),
              required('"aspect"'),
              optional(", {settings}, simulatedOutput"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("readers"),
              plain("."),
              required("shortName"),
              plain("."),
              required("aspect"),
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "itemNBT InventoryReader(0).slotItem",
            caption: "dotted form, part id 0",
          },
          {
            kind: "concrete",
            text: 'itemNBT inventoryReader("Slot Item")',
            caption: "short name and aspect display name",
          },
          {
            kind: "concrete",
            text: 'itemNBT reader("inventory", "slot_item")',
            caption: "generic form",
          },
          {
            kind: "concrete",
            text: "itemNBT readers.inventory.slotItem",
            caption: "readers.<shortName> form",
          },
        ],
        links: [
          readerLink("inventory", "Inventory reader"),
          readerAspectLink(
            "inventory",
            "OBJECT_ITEM_STACK_SLOT",
            "Slot Item aspect"
          ),
        ],
      },
      {
        heading: "Lambdas",
        summary:
          "A lambda is written param -> expression, param => expression, or \\param.expression.",
        examples: [
          { kind: "concrete", text: "x -> numberAdd x 1" },
          { kind: "concrete", text: "x => numberAdd x 1" },
          { kind: "concrete", text: "\\x.numberAdd x 1" },
        ],
      },
      {
        heading: "Materializing readers",
        summary:
          "Materialize(expression) puts a materializer around the expression. Readers inside it are abstracted into the lambda's parameters instead of being read by the card, and the materializer's result is that lambda. Dynamic(expression) makes an expression a parameter in its own right, and Static(expression) pins an expression so its readers stay inside the card. The wrapper is written the same way as in Condensed; a Code Line expression inside the brackets keeps the line Code Line, while a parenthesized call inside them makes it Condensed, so Materialize(numberAdd 1 2) is Code Line and Materialize(numberAdd(1, 2)) is Condensed.",
        syntax: [
          {
            spans: [
              required("Materialize"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "the readers in the expression become the lambda's parameters",
          },
          {
            spans: [
              required("Dynamic"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "give an expression a parameter of its own, even without a reader in it",
          },
          {
            spans: [
              required("Static"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "keep an expression fixed so its readers are not abstracted",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "apply Materialize(numberAdd InventoryReader(0).inventoryCount 2) 3",
            caption: "apply the materialized lambda to a value",
          },
          {
            kind: "concrete",
            text: "pipe Materialize(numberAdd InventoryReader(0).inventoryCount 2) arithmeticIncrement",
            caption: "use the materialized lambda as an argument",
          },
          {
            kind: "concrete",
            text: "Materialize(numberAdd InventoryReader(0).inventoryCount 2)",
            caption: "on its own",
          },
          {
            kind: "concrete",
            text: "Materialize(Static(add InventoryReader(0).inventoryCount 2))",
            caption: "Static keeps the reader inside the card",
          },
          {
            kind: "concrete",
            text: "Materialize(numberAdd Dynamic(1) InventoryReader(0).inventoryCount)",
            caption: "Dynamic adds a parameter that has no reader in it",
          },
        ],
        links: [
          readerLink("inventory", "Inventory reader"),
          readerAspectLink(
            "inventory",
            "INTEGER_COUNT",
            "Inventory Count aspect"
          ),
          operatorLink("ARITHMETIC_ADDITION", "add / numberAdd"),
          operatorLink("OPERATOR_APPLY", "apply"),
          operatorLink("OPERATOR_PIPE", "pipe"),
        ],
      },
      {
        heading: "Statements",
        summary:
          "Separate statements with a semicolon; the last statement is the program's result.",
        syntax: [
          {
            spans: [
              required("expression"),
              plain(" ; "),
              required("expression"),
            ],
          },
        ],
        examples: [{ kind: "concrete", text: "5; add 5 1" }],
      },
      {
        heading: "References",
        summary:
          "Inside a multi-statement input, @<statement number> refers to variable ID of the last card of an earlier statement, where statements are 0-indexed.",
        examples: [
          {
            kind: "concrete",
            text: "319; 236; map NetworkReader.variableValueById [@0, @1]",
            caption: "@0 and @1 are the two earlier statements",
          },
        ],
      },
      {
        heading: "Comments",
        summary:
          "A trailing comment belongs to the expression it follows, so move it to its own line to attach it to an earlier argument.",
        examples: [
          {
            kind: "concrete",
            text: "add 2 3 -- note",
            caption: "the comment belongs to the 3",
          },
          {
            kind: "concrete",
            text: "add 2 -- note\n3",
            caption: "the comment belongs to the 2",
          },
        ],
      },
    ],
  },
  {
    id: "condensed",
    label: "Condensed",
    sections: [
      {
        heading: "Calls",
        summary:
          "Write the operator name followed by its arguments in parentheses, comma-separated.",
        syntax: [
          {
            spans: [
              required("operatorName"),
              plain("("),
              required("arg1"),
              plain(", "),
              required("arg2"),
              plain(")"),
            ],
          },
        ],
        examples: [
          { kind: "concrete", text: "add(2, 3)" },
          { kind: "concrete", text: "apply(add, 1, 2)" },
          { kind: "concrete", text: 'stringConcat("a", "b")' },
        ],
        links: [
          operatorLink("OPERATOR_APPLY", "apply"),
          operatorLink("STRING_CONCAT", "stringConcat"),
        ],
      },
      {
        heading: "Nesting",
        summary:
          "Calls nest directly; no extra grouping characters are needed.",
        syntax: [
          {
            spans: [
              required("outer"),
              plain("("),
              required("inner"),
              plain("(x), y)"),
            ],
          },
        ],
        examples: [{ kind: "concrete", text: "add(add(1, 2), 3)" }],
      },
      {
        heading: "Values",
        summary:
          "The same values as the other text forms apply in Condensed: numbers, quoted strings, true, false, null, [ ... ] lists, and { ... } NBT objects.",
        syntax: [
          {
            spans: [
              required("5"),
              plain(" / "),
              required("5l"),
              plain(" / "),
              required("3.0"),
            ],
            note: "integer, long (l suffix) and double (needs a decimal point)",
          },
          {
            spans: [
              required('"text"'),
              plain(" / "),
              required("'text'"),
              plain(" / "),
              required('"""text"""'),
            ],
            note: "double, single or triple quoted; \\ escapes the next character",
          },
          {
            spans: [
              plain("["),
              required("value"),
              plain(", "),
              required("value"),
              plain("]"),
            ],
            note: "list",
          },
          {
            spans: [
              plain("{"),
              required('"key"'),
              plain(": "),
              required("value"),
              plain(", ...}"),
            ],
            note: "NBT object; keys are quoted and values nest",
          },
        ],
        examples: [
          { kind: "concrete", text: "numberAdd(3.0, 1.5)", caption: "doubles" },
          {
            kind: "concrete",
            text: "booleanOr(true, false)",
            caption: "booleans",
          },
          {
            kind: "concrete",
            text: 'eq(["c:armor"], ["c:tools"])',
            caption: "lists",
          },
          {
            kind: "concrete",
            text: 'add({"a":1}, 1)',
            caption: "NBT object",
          },
        ],
      },
      {
        heading: "In-game values",
        summary:
          "Blocks, items, fluids and entities are written as a constructor call: the type name, a quoted id, then an optional size and an optional tag or properties object. The type name is case-insensitive and a fluid takes only its id. Operator looks up an operator value by nickname, official name or display name.",
        syntax: [
          {
            spans: [
              required("Item"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {tag}"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Block"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {properties}"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Fluid"),
              plain("("),
              required('"id"'),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Entity"),
              plain("("),
              required('"id"'),
              optional(", size"),
              optional(", {tag}"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("Operator"),
              plain("("),
              required('"name"'),
              plain(")"),
            ],
          },
        ],
        examples: [
          { kind: "concrete", text: 'Block("minecraft:stone", 64)' },
          {
            kind: "concrete",
            text: 'Entity("minecraft:cow", 1)',
          },
          {
            kind: "concrete",
            text: 'Fluid("minecraft:water")',
          },
          {
            kind: "concrete",
            text: 'Operator("integrateddynamics:logical_or")',
            caption: "official name, nickname and display name all work",
          },
          {
            kind: "concrete",
            text: 'itemNBT(Item("minecraft:stone", 1))',
            caption: "constructor as a call argument",
          },
        ],
        links: [operatorLink("LOGICAL_OR", "logical_or")],
      },
      {
        heading: "Operator names",
        summary:
          "An operator is written by any of its names: a nickname such as add, its official name, or its display name, followed by its arguments in parentheses.",
        examples: [
          {
            kind: "concrete",
            text: "pipe(arithmeticIncrement, arithmeticIncrement)",
          },
        ],
        links: [
          operatorLink("OPERATOR_APPLY", "apply"),
          operatorLink("OPERATOR_PIPE", "pipe"),
          operatorLink("OPERATOR_FLIP", "flip"),
          operatorLink("LOGICAL_OR", "booleanOr"),
        ],
      },
      {
        heading: "Readers",
        summary:
          "A reader call names a reader, an optional part id, an aspect, optional aspect settings and an optional simulated result. Reader names are case-insensitive and the aspect may be written as its enum key or its display name.",
        syntax: [
          {
            spans: [
              required("ReaderName"),
              optional("(partID)"),
              plain("."),
              required("aspectName"),
              plain("("),
              optional("{settings}, simulatedOutput"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("shortNameReader"),
              plain("("),
              required('"aspect"'),
              optional(", {settings}, simulatedOutput"),
              plain(")"),
            ],
            note: "the reader's short name with a Reader suffix",
          },
          {
            spans: [
              required("reader"),
              plain("("),
              required('"reader"'),
              plain(", "),
              required('"aspect"'),
              optional(", {settings}, simulatedOutput"),
              plain(")"),
            ],
          },
          {
            spans: [
              required("readers"),
              plain("."),
              required("shortName"),
              plain("."),
              required("aspect"),
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'InventoryReader(0).slotItem({"slot":1})',
            caption: "part id 0, aspect settings",
          },
          {
            kind: "concrete",
            text: 'inventoryReader("Slot Item", {"slot":0})',
            caption: "short name and aspect display name",
          },
          {
            kind: "concrete",
            text: 'reader("inventory", "slot_item")',
            caption: "generic form",
          },
          {
            kind: "concrete",
            text: "itemNBT(readers.inventory.slotItem)",
            caption: "readers.<shortName> form",
          },
        ],
        links: [
          readerLink("inventory", "Inventory reader"),
          readerAspectLink(
            "inventory",
            "OBJECT_ITEM_STACK_SLOT",
            "Slot Item aspect"
          ),
        ],
      },
      {
        heading: "Lambdas",
        summary:
          "A lambda is written param -> expression, param => expression, or \\param.expression.",
        examples: [
          {
            kind: "concrete",
            text: "pipe(x -> numberAdd(x, 1), arithmeticIncrement)",
          },
          {
            kind: "concrete",
            text: "pipe(x => numberAdd(x, 1), arithmeticIncrement)",
          },
          {
            kind: "concrete",
            text: "pipe(\\x.numberAdd(x, 1), arithmeticIncrement)",
          },
        ],
      },
      {
        heading: "Materializing readers",
        summary:
          "Materialize(expression) puts a materializer around the expression. Readers inside it are abstracted into the lambda's parameters instead of being read by the card, and the materializer's result is that lambda. Dynamic(expression) makes an expression a parameter in its own right, and Static(expression) pins an expression so its readers stay inside the card. Parameters are named after the readers they came from and follow the order those readers first appear in; an identical reader used more than once shares one parameter. A Materialize inside another Materialize is consumed by the inner one, which leaves it static for the outer one.",
        syntax: [
          {
            spans: [
              required("Materialize"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "the readers in the expression become the lambda's parameters",
          },
          {
            spans: [
              required("Dynamic"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "give an expression a parameter of its own, even without a reader in it",
          },
          {
            spans: [
              required("Static"),
              plain("("),
              required("expression"),
              plain(")"),
            ],
            note: "keep an expression fixed so its readers are not abstracted",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))",
            caption:
              "the reader becomes the parameter, the 2 is built into the card",
          },
          {
            kind: "concrete",
            text: "Materialize(Static(InventoryReader(0).inventoryCount))",
            caption: "Static keeps the reader inside the card",
          },
          {
            kind: "concrete",
            text: "Materialize(numberAdd(Dynamic(1), InventoryReader(0).inventoryCount))",
            caption: "Dynamic adds a parameter that has no reader in it",
          },
        ],
        links: [
          readerLink("inventory", "Inventory reader"),
          readerAspectLink(
            "inventory",
            "INTEGER_COUNT",
            "Inventory Count aspect"
          ),
          operatorLink("ARITHMETIC_ADDITION", "add / numberAdd"),
        ],
      },
      {
        heading: "Statements",
        summary: "Separate statements with a semicolon.",
        syntax: [
          {
            spans: [
              required("expression"),
              plain(" ; "),
              required("expression"),
            ],
          },
        ],
        examples: [{ kind: "concrete", text: "add(1, 2); multiply(3, 4)" }],
      },
      {
        heading: "Comments",
        summary: "A trailing comment runs to the end of the line.",
        examples: [{ kind: "concrete", text: 'add(1, 2) -- "note"' }],
      },
    ],
  },
  {
    id: "visual",
    label: "Visual",
    sections: [
      {
        heading: "Reading the visual output",
        bullets: [
          "Each step is an in-game card you place.",
          "Every card has a hover tooltip showing its type and signature.",
          "Naming the cards in game needs a labeller; think of them as variable names in another language.",
          "A red X overlay on a display panel points at the input that is wrong.  You can hover over the red X to see what the error is.",
          "The left display panel is what shows in game, the right display panel uses extra logic in this project to lean more towards showing what's truely expected.",
          "A materializer step shows the lambda being built: the card you are materializing sits on top, the variable slot the lambda's parameter fills is on the left, and the resulting lambda card is on the right. Each reader it abstracted then gets its own card and an apply step that feeds it to that lambda.",
        ],
      },
      {
        heading: "Try it",
        summary:
          "Clicking the example loads it and switches the output to Visual on its own, so the cards it produces are shown straight away.",
        examples: [
          {
            kind: "concrete",
            text: "apply add 1 2",
            caption: "a small Code Line program",
            output: "visual",
          },
        ],
      },
    ],
  },
];

/** Tab lookup by id. */
export const inputDocTab = (id: InputDocTabId): InputDocTab =>
  INPUT_DOC_TABS.find((tab) => tab.id === id)!;

/** All concrete examples belonging to the parseable format tabs. */
export const inputDocFormatExamples = (): {
  tabId: InputDocFormatTabId;
  examples: InputDocExample[];
}[] =>
  INPUT_DOC_FORMAT_TAB_IDS.map((tabId) => ({
    tabId,
    examples: inputDocTab(tabId).sections.flatMap(
      (section) =>
        section.examples?.filter((example) => example.kind === "concrete") ?? []
    ),
  }));
