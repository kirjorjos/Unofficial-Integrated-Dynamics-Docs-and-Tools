export type DocEmphasis = "required" | "optional";

export interface DocSpan {
  text: string;
  emphasis?: DocEmphasis;
  code?: boolean;
}

export const docText = (spans: DocSpan[]): string =>
  spans.map((span) => span.text).join("");

export type DocText = DocSpan[];

export interface DocSyntaxLine {
  spans: DocSpan[];
  note?: DocText;
}

export type InputDocOutputFormat = "visual" | "snbt";

export interface InputDocExample {
  kind: "concrete" | "structural";
  text: string;
  caption?: DocText;
  output?: InputDocOutputFormat;
}

export interface DocLegendEntry {
  emphasis: DocEmphasis | "plain";
  label: DocText;
  description: DocText;
  color?: string;
}

export interface DocLink {
  label: DocText;
  href: string;
}

export interface InputDocSection {
  heading: DocText;
  summary?: DocText;
  bullets?: DocText[];
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
  | "snbt"
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

export const inputDocExampleInput = (example: InputDocExample): string =>
  example.caption
    ? `-- ${docText(example.caption)}\n${example.text}`
    : example.text;

const displayAndCardSection = (): InputDocSection => ({
  heading: [{ text: "Display and Card" }],
  summary: [
    { text: "Two identifiers that only do something when the output is " },
    { text: "SNBT", code: true },
    {
      text: '. Display(expression) says "put this in a display panel"; Card(paste) or Cards(paste) "unwraps" something you pasted, extracting the cards in the parts rather than interpreting the parts themselves.',
    },
  ],
  bullets: [
    [
      {
        text: "Both must stand alone as a whole line, the value of a definition, or directly inside Materialize; buried inside a call they are rejected.",
      },
    ],
    [
      {
        text: "Display emits the panel first, where the identifier sits, and then the cards the expression needs.",
      },
    ],
    [
      {
        text: "Materialize and Display nest in either order and mean the same thing: the materialized card in a display panel.",
      },
    ],
  ],
  syntax: [
    {
      spans: [
        { text: "Display", emphasis: "required" },
        { text: "(" },
        { text: "expression", emphasis: "required" },
        { text: ")" },
      ],
      note: [
        {
          text: "the display panel first, then the cards the expression needs",
        },
      ],
    },
    {
      spans: [
        { text: "Card", emphasis: "required" },
        { text: "(" },
        { text: "paste", emphasis: "required" },
        { text: ")" },
      ],
      note: [
        {
          text: "Cards is accepted too, and either spelling is written back as Card",
        },
      ],
    },
  ],
});

export const INPUT_DOC_TABS: InputDocTab[] = [
  {
    id: "overview",
    label: "Overview",
    sections: [
      {
        heading: [{ text: "What these docs cover" }],
        summary: [
          {
            text: "These tabs describe every input each of the transformers accepts. The form is detected automatically from what you type, so choose an output format and click transform when you're ready. ",
          },
          { text: "SNBT", code: true },
          {
            text: " is different: it takes in-game output rather than an expression.",
          },
        ],
      },
      {
        heading: [{ text: "Shared vs Unique syntax" }],
        summary: [
          {
            text: "Most things are shared, but not everything. The main differences are definitions and argument grouping.",
          },
        ],
      },
      {
        heading: [{ text: "Names and references" }],
        summary: [
          {
            text: "Every form's own tab shows how definitions and references are written there.",
          },
        ],
        bullets: [
          [
            { text: "Expanded", code: true },
            {
              text: " declares variable names with varName = someValue, and @name resolves to the variable ID for an earlier definition.",
            },
          ],
          [
            { text: "Code Line", code: true },
            {
              text: " has no definitions: at the top level it is statements separated by semicolons, and @<statement number> resolves to the variable ID of the final card from an earlier statement.",
            },
          ],
          [
            { text: "Condensed", code: true },
            { text: " has no definitions and no references at the moment." },
          ],
          [
            { text: "In " },
            { text: "Expanded", code: true },
            {
              text: ' a name that needs quoting is wrapped as Variable("name") both where it is defined and where it is used, and Operator("name") looks up an operator value by name in every form.',
            },
          ],
          [
            {
              text: "Materialize(expression) wraps an expression in a materializer. You may use Static(...) and Dynamic(...) to explicitly specify if something is abstracted to an expected parameter of the materialized operator if you want. By default, reader values are dynamic and everything else is static.",
            },
          ],
        ],
      },
      {
        heading: [{ text: "The settings panel" }],
        summary: [
          {
            text: "The settings panel allows you to control how the output looks within the form you choose, and also has some options for input.  Each setting has a hover tooltip for a description.",
          },
        ],
      },
      {
        heading: [{ text: "Required vs optional" }],
        summary: [{ text: "Every structural skeleton is colour-coded:" }],
        legend: [
          {
            emphasis: "required",
            label: [{ text: "required" }],
            description: [{ text: "Needed data to be able to transform" }],
          },
          {
            emphasis: "optional",
            label: [{ text: "optional" }],
            description: [{ text: "Extra data you may choose to add" }],
          },
          {
            emphasis: "plain",
            label: [{ text: "plain" }],
            description: [{ text: "Normal syntax" }],
          },
        ],
      },
      {
        heading: [{ text: "Reading the examples" }],
        summary: [
          {
            text: "Each information tab shows syntax skeletons and runnable examples. Clicking a runnable example runs it through the transformer and shows what it produces; a long command is shown shortened and clicking it loads the full text.",
          },
        ],
        legend: [
          {
            emphasis: "plain",
            color: "#15c40b",
            label: [{ text: "shortened" }],
            description: [
              { text: "a long example, shown with its middle removed" },
            ],
          },
        ],
      },
      {
        heading: [{ text: "Comments" }],
        summary: [
          {
            text: "-- starts a comment that runs to the end of the line. All three text forms accept them, and a trailing comment belongs to the expression it follows. Turn on ",
          },
          { text: "Preserve comments", code: true },
          { text: " to keep them in " },
          { text: "Expanded", code: true },
          { text: " output; " },
          { text: "Code Line", code: true },
          { text: " and " },
          { text: "Condensed", code: true },
          { text: " output don't currently re-emit them." },
        ],
      },
    ],
  },
  {
    id: "expanded",
    label: "Expanded",
    sections: [
      {
        heading: [{ text: "Definitions" }],
        summary: [
          {
            text: "One definition per line. A name is given to an expression with =, and can carry a type signature written with ::.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "name", emphasis: "required" },
              { text: " = " },
              { text: "expression", emphasis: "required" },
            ],
            note: [{ text: "Give a name to an expression" }],
          },
          {
            spans: [
              { text: "name", emphasis: "required" },
              { text: " :: " },
              { text: "Type", emphasis: "required" },
              { text: " = " },
              { text: "expression", emphasis: "required" },
            ],
            note: [{ text: "Typed definition" }],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "x = 5",
          },
          {
            kind: "concrete",
            text: "a = 5\nb = add(a, 1)",
            caption: [{ text: "refer to an earlier definition by name" }],
          },
        ],
      },
      {
        heading: [{ text: "Application" }],
        summary: [
          {
            text: "A call is the operator name followed by its arguments. The expression part of an assignment can be either ",
          },
          { text: "Code Line", code: true },
          { text: " or " },
          { text: "Condensed", code: true },
          { text: " form." },
        ],
        syntax: [
          {
            spans: [
              { text: "operator", emphasis: "required" },
              { text: "(" },
              { text: "arg1", emphasis: "required" },
              { text: ", " },
              { text: "arg2", emphasis: "required" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "operator", emphasis: "required" },
              { text: " " },
              { text: "arg1", emphasis: "required" },
              { text: " " },
              { text: "arg2", emphasis: "required" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "a = add(1, 2)",
            caption: [{ text: "parenthesized" }],
          },
          {
            kind: "concrete",
            text: "a = numberAdd 1 2",
            caption: [{ text: "space-separated" }],
          },
        ],
        links: [
          {
            label: [{ text: "add / numberAdd" }],
            href: "#operator-ARITHMETIC_ADDITION",
          },
        ],
      },
      {
        heading: [{ text: "Type signatures" }],
        summary: [
          {
            text: "A signature is checked against the expression's real signature. In a typed definition the type must be one of the in-game types (Any, Integer, Long, Double, Number, String, Boolean, Null, NBT, Block, Item, Fluid, Entity, Ingredients, Recipe, Operator or List). You can give an Any a name by either directly using the name, or Any<name>.  In a similar syntax to Any<name>, List<type> is also valid.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "name", emphasis: "required" },
              { text: " = " },
              { text: "expression", emphasis: "required" },
              { text: " :: " },
              { text: "Type", emphasis: "required" },
            ],
            note: [{ text: "the signature may also follow the expression" }],
          },
          {
            spans: [
              { text: "name", emphasis: "required" },
              { text: " :: " },
              { text: "signature", emphasis: "required" },
            ],
            note: [
              {
                text: "standalone line; the name must already be defined, or be an inbuilt operator seen in the reference pages",
              },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "x :: Integer = 5",
            caption: [{ text: "typed definition" }],
          },
          {
            kind: "concrete",
            text: "x = 5 :: Integer",
            caption: [{ text: "signature after the expression" }],
          },
          {
            kind: "structural",
            text: "name :: A -> B",
            caption: [{ text: "A and B are generic slots" }],
          },
          {
            kind: "concrete",
            text: "pipe :: Operator -> (Operator -> Operator)",
            caption: [{ text: "standalone signature of an inbuilt operator" }],
          },
        ],
        links: [{ label: [{ text: "pipe" }], href: "#operator-OPERATOR_PIPE" }],
      },
      {
        heading: [{ text: "Values" }],
        summary: [
          {
            text: "Numbers, strings, lists and NBT objects are written the same way in both ",
          },
          { text: "Code Line", code: true },
          { text: " and " },
          { text: "Condensed", code: true },
          { text: ", meaning they're the same for an " },
          { text: "Expanded", code: true },
          { text: " expression." },
        ],
        syntax: [
          {
            spans: [
              { text: "5", emphasis: "required" },
              { text: " / " },
              { text: "5l", emphasis: "required" },
              { text: " / " },
              { text: "3.0", emphasis: "required" },
            ],
            note: [
              {
                text: "integer, long (l suffix) and double (needs a decimal point)",
              },
            ],
          },
          {
            spans: [
              { text: '"text"', emphasis: "required" },
              { text: " / " },
              { text: "'text'", emphasis: "required" },
              { text: " / " },
              { text: '"""text"""', emphasis: "required" },
            ],
            note: [
              {
                text: "double, single or triple quoted; \\ escapes the next character.",
              },
            ],
          },
          {
            spans: [
              { text: "[" },
              { text: "value", emphasis: "required" },
              { text: ", " },
              { text: "value", emphasis: "required" },
              { text: "]" },
            ],
            note: [{ text: "list" }],
          },
          {
            spans: [
              { text: "{" },
              { text: '"key"', emphasis: "required" },
              { text: ": " },
              { text: "value", emphasis: "required" },
              { text: ", ...}" },
            ],
            note: [
              {
                text: "NBT object; keys are quoted JSON strings, values nest (a list or another object), and {} is valid",
              },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "picked = 2l",
            caption: [{ text: "long" }],
          },
          {
            kind: "concrete",
            text: "ratio = 3.0",
            caption: [{ text: "double" }],
          },
          {
            kind: "concrete",
            text: 'note = """say "hi" to the world"""',
            caption: [{ text: "triple-quoted string" }],
          },
          {
            kind: "concrete",
            text: 'chosen = ["c:armor", "c:tools"]',
            caption: [{ text: "list" }],
          },
          {
            kind: "concrete",
            text: "emptyTag = {}",
            caption: [{ text: "empty NBT object" }],
          },
          {
            kind: "concrete",
            text: 'tag = {"display":{"Name":"Stone"},"Damage":0}',
            caption: [{ text: "nested NBT object" }],
          },
          {
            kind: "concrete",
            text: 'tag = {"Colors":[1,2,3],"Items":["a"]}',
            caption: [{ text: "lists inside an NBT object" }],
          },
        ],
      },
      {
        heading: [{ text: "In-game values" }],
        summary: [
          {
            text: "Blocks, items, fluids and entities are written as a constructor call: the type name, a quoted id, then an optional size and an optional tag object for items and entities or properties object for blocks. The type name is case-insensitive, a tag object may be given without a size, and Operator looks up an operator value by nickname, official name or display name. In ",
          },
          { text: "Code Line", code: true },
          { text: " and " },
          { text: "Condensed", code: true },
          { text: " a fluid is written with its id only." },
        ],
        syntax: [
          {
            spans: [
              { text: "Item", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {tag}", emphasis: "optional" },
              { text: ")" },
            ],
            note: [
              {
                text: 'e.g. Item("minecraft:stone", 64, {"display":{"Name":"Stone"}})',
              },
            ],
          },
          {
            spans: [
              { text: "Block", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {properties}", emphasis: "optional" },
              { text: ")" },
            ],
            note: [
              { text: 'e.g. Block("minecraft:oak_log", 1, {"axis":"x"})' },
            ],
          },
          {
            spans: [
              { text: "Fluid", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Entity", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {tag}", emphasis: "optional" },
              { text: ")" },
            ],
            note: [{ text: 'e.g. Entity("minecraft:cow", 1)' }],
          },
          {
            spans: [
              { text: "Operator", emphasis: "required" },
              { text: "(" },
              { text: '"name"', emphasis: "required" },
              { text: ")" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'stone = Item("minecraft:stone", 1)',
            caption: [{ text: "item with a size" }],
          },
          {
            kind: "concrete",
            text: 'named = Item("minecraft:stone", {"display":{"Name":"Stone"}})',
            caption: [{ text: "tag object without a size" }],
          },
          {
            kind: "concrete",
            text: 'stack = Block("minecraft:stone", 64)',
            caption: [{ text: "block with a size" }],
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
            caption: [
              { text: "official name, nickname and display name all work" },
            ],
          },
        ],
        links: [
          { label: [{ text: "logical_or" }], href: "#operator-LOGICAL_OR" },
        ],
      },
      {
        heading: [{ text: "Readers" }],
        summary: [
          {
            text: "A reader call names a reader, an optional part id, an aspect, optional aspect settings and an optional simulated result. Reader names are case-insensitive and the aspect may be written as its enum key or its display name.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "ReaderName", emphasis: "required" },
              { text: "(partID)", emphasis: "optional" },
              { text: "." },
              { text: "aspectName", emphasis: "required" },
              { text: "(" },
              { text: "{settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
            note: [
              {
                text: "dotted form; () is the same as leaving the part id out",
              },
            ],
          },
          {
            spans: [
              { text: "shortNameReader", emphasis: "required" },
              { text: "(" },
              { text: '"aspect"', emphasis: "required" },
              { text: ", {settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
            note: [{ text: "the reader's short name with a Reader suffix" }],
          },
          {
            spans: [
              { text: "reader", emphasis: "required" },
              { text: "(" },
              { text: '"reader"', emphasis: "required" },
              { text: ", " },
              { text: '"aspect"', emphasis: "required" },
              { text: ", {settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "readers", emphasis: "required" },
              { text: "." },
              { text: "shortName", emphasis: "required" },
              { text: "." },
              { text: "aspect", emphasis: "required" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'slotOne = InventoryReader(0).slotItem({"slot":1})',
            caption: [{ text: "part id 0, aspect settings" }],
          },
          {
            kind: "concrete",
            text: 'slotByDisplayName = inventoryReader("Slot Item")',
            caption: [{ text: "short name and aspect display name" }],
          },
          {
            kind: "concrete",
            text: 'slotGeneric = reader("inventory", "slot_item")',
            caption: [{ text: "generic form" }],
          },
          {
            kind: "concrete",
            text: "slotShort = readers.inventory.slotItem",
            caption: [{ text: "readers.<shortName> form" }],
          },
        ],
        links: [
          { label: [{ text: "Inventory reader" }], href: "#readers-inventory" },
          {
            label: [{ text: "Slot Item aspect" }],
            href: "#reader-inventory-object-item-stack-slot",
          },
        ],
      },
      {
        heading: [{ text: "Quoted names and references" }],
        summary: [
          {
            text: 'A plain name is an identifier of letters, digits and underscores: it cannot contain spaces or punctuation and cannot be an operator nickname such as add or apply, because that would hide the operator. A name that is not a plain identifier is written as Variable("..."), both where it is defined and where it is used. @name refers to the variable ID of an earlier definition.',
          },
        ],
        syntax: [
          {
            spans: [
              { text: "name", emphasis: "required" },
              { text: " = " },
              { text: "expression", emphasis: "required" },
            ],
            note: [{ text: "plain identifier, e.g. picked" }],
          },
          {
            spans: [
              { text: 'Variable("name")', emphasis: "required" },
              { text: " = " },
              { text: "expression", emphasis: "required" },
            ],
            note: [{ text: "declare a name that needs quoting" }],
          },
          {
            spans: [{ text: "@" }, { text: "name", emphasis: "required" }],
            note: [{ text: "last card of an earlier definition, e.g. @step0" }],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'Variable("my cool variable") = 5\nfinal = numberAdd(Variable("my cool variable"), 1)',
            caption: [{ text: "quoted name defined and used" }],
          },
          {
            kind: "concrete",
            text: "step0 = 319\nstep1 = 236\nfinal = apply(apply(map, NetworkReader.variableValueById), [@step0, @step1])",
            caption: [{ text: "@name inside a list" }],
          },
        ],
      },
      {
        heading: [{ text: "Lambdas" }],
        summary: [
          {
            text: "A lambda is written param => expression, or as a definition whose parameters name its arguments.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "param", emphasis: "required" },
              { text: " => " },
              { text: "expression", emphasis: "required" },
            ],
          },
          {
            spans: [
              { text: "name", emphasis: "required" },
              { text: " " },
              { text: "param...", emphasis: "required" },
              { text: " = " },
              { text: "expression", emphasis: "required" },
            ],
            note: [
              {
                text: "definition form; the parameters become the lambda's arguments",
              },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "inc = x => numberAdd x 1",
            caption: [{ text: "arrow form" }],
          },
          {
            kind: "concrete",
            text: "inc x = numberAdd x 1",
            caption: [{ text: "same thing, definition form" }],
          },
          {
            kind: "concrete",
            text: "getGenome path bee = nbtPathMatchAll path (itemNBT bee)",
            caption: [{ text: "two parameters" }],
          },
        ],
        links: [
          {
            label: [{ text: "add / numberAdd" }],
            href: "#operator-ARITHMETIC_ADDITION",
          },
        ],
      },
      {
        heading: [{ text: "Materializing readers" }],
        summary: [
          {
            text: "Materialize(expression) puts a materializer around the expression. Readers inside it are abstracted into the lambda's parameters instead of being read by the card, and the materializer's result is that lambda. Dynamic(expression) makes an expression a parameter in its own right, and Static(expression) pins an expression so its readers stay inside the card. Parameters are named after the readers they came from and follow the order those readers first appear in; an identical reader used more than once shares one parameter. A Materialize inside another Materialize is consumed by the inner one, which leaves it static for the outer one.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "Materialize", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "the readers in the expression become the lambda's parameters",
              },
            ],
          },
          {
            spans: [
              { text: "Dynamic", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "give an expression a parameter of its own, even without a reader in it",
              },
            ],
          },
          {
            spans: [
              { text: "Static", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "keep an expression fixed so its readers are not abstracted",
              },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "slotCount = Materialize(InventoryReader(0).inventoryCount)",
            caption: [
              { text: "the materializer's result is a lambda over the reader" },
            ],
          },
          {
            kind: "concrete",
            text: "total = Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))",
            caption: [
              {
                text: "the reader becomes the parameter, the 2 is built into the card",
              },
            ],
          },
          {
            kind: "concrete",
            text: "fixed = Materialize(Static(InventoryReader(0).inventoryCount))",
            caption: [{ text: "Static keeps the reader inside the card" }],
          },
          {
            kind: "concrete",
            text: "extra = Materialize(numberAdd(Dynamic(1), InventoryReader(0).inventoryCount))",
            caption: [
              { text: "Dynamic adds a parameter that has no reader in it" },
            ],
          },
        ],
        links: [
          { label: [{ text: "Inventory reader" }], href: "#readers-inventory" },
          {
            label: [{ text: "Inventory Count aspect" }],
            href: "#reader-inventory-integer-count",
          },
          {
            label: [{ text: "add / numberAdd" }],
            href: "#operator-ARITHMETIC_ADDITION",
          },
        ],
      },
      displayAndCardSection(),
      {
        heading: [{ text: "Comments" }],
        summary: [
          { text: "A comment can sit on its own line or trail a definition." },
        ],
        examples: [
          {
            kind: "concrete",
            text: "-- note\nx = 5",
            caption: [{ text: "own line" }],
          },
          {
            kind: "concrete",
            text: "x = 5 -- note",
            caption: [{ text: "trailing" }],
          },
        ],
      },
      {
        heading: [{ text: "Putting it together" }],
        summary: [
          {
            text: "Definitions can be written in any order and refer to each other by name.",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'stack = Item("minecraft:stone", 64)\nslot = InventoryReader(0).slotItem({"slot":1})\nmatches = eq(slot, stack)',
            caption: [{ text: "a small program" }],
          },
          {
            kind: "concrete",
            text: "step0 = 319\nstep1 = 236\ntotal :: Number = numberAdd(step0, step1)\nresult = numberAdd(total, 1)",
            caption: [{ text: "typed definition used by a later definition" }],
          },
        ],
        links: [
          {
            label: [{ text: "add / numberAdd" }],
            href: "#operator-ARITHMETIC_ADDITION",
          },
        ],
      },
    ],
  },
  {
    id: "codeline",
    label: "Code Line",
    sections: [
      {
        heading: [{ text: "Application" }],
        summary: [
          {
            text: "Write the operator first, then its arguments separated by spaces. Parentheses may be used to make sub-calls as arguments as shown in Grouping.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "operator", emphasis: "required" },
              { text: " " },
              { text: "arg1", emphasis: "required" },
              { text: " " },
              { text: "arg2", emphasis: "required" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "add 2 3",
          },
          {
            kind: "concrete",
            text: "apply add 1 2",
          },
        ],
        links: [
          { label: [{ text: "apply" }], href: "#operator-OPERATOR_APPLY" },
        ],
      },
      {
        heading: [{ text: "Grouping" }],
        summary: [
          {
            text: "Wrap a sub-expression in parentheses to use its result as an argument.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "add 2 (multiply 3 4)",
          },
        ],
        links: [
          {
            label: [{ text: "multiply" }],
            href: "#operator-ARITHMETIC_MULTIPLICATION",
          },
        ],
      },
      {
        heading: [{ text: "Values" }],
        summary: [
          {
            text: "A value is the simplest possible argument: a number, a quoted string, true, false or null a [ ... ] list or { ... } NBT object.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "5", emphasis: "required" },
              { text: " / " },
              { text: "5l", emphasis: "required" },
              { text: " / " },
              { text: "3.0", emphasis: "required" },
            ],
            note: [
              {
                text: "integer, long (l suffix) and double (needs a decimal point)",
              },
            ],
          },
          {
            spans: [
              { text: '"text"', emphasis: "required" },
              { text: " / " },
              { text: "'text'", emphasis: "required" },
              { text: " / " },
              { text: '"""text"""', emphasis: "required" },
            ],
            note: [
              {
                text: "double, single or triple quoted; \\ escapes the next character, and -- inside a string is not a comment",
              },
            ],
          },
          {
            spans: [
              { text: "[" },
              { text: "value", emphasis: "required" },
              { text: ", " },
              { text: "value", emphasis: "required" },
              { text: "]" },
            ],
            note: [{ text: "list" }],
          },
          {
            spans: [
              { text: "{" },
              { text: '"key"', emphasis: "required" },
              { text: ": " },
              { text: "value", emphasis: "required" },
              { text: ", ...}" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "5l",
            caption: [{ text: "long" }],
          },
          {
            kind: "concrete",
            text: "3.0",
            caption: [{ text: "double" }],
          },
          {
            kind: "concrete",
            text: '["c:armor", "c:tools"]',
            caption: [{ text: "list" }],
          },
          {
            kind: "concrete",
            text: 'add {"a":1} 1',
            caption: [{ text: "NBT object as an argument" }],
          },
          {
            kind: "concrete",
            text: "'it\\'s \"quoted\"'",
            caption: [{ text: "single-quoted string with an escape" }],
          },
          {
            kind: "concrete",
            text: '"""say "hi" to the world"""',
            caption: [{ text: "triple-quoted string" }],
          },
        ],
      },
      {
        heading: [{ text: "In-game values" }],
        summary: [
          {
            text: "Blocks, items, fluids and entities are written as a constructor call: the type name, a quoted id, then an optional size or amount and an optional tag or properties object. The type name is case-insensitive, a tag object may be given without a size, and in ",
          },
          { text: "Code Line", code: true },
          { text: " a fluid takes an amount." },
        ],
        syntax: [
          {
            spans: [
              { text: "Item", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {tag}", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Block", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {properties}", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Fluid", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", amount", emphasis: "optional" },
              { text: ", {tag}", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Entity", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {tag}", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Operator", emphasis: "required" },
              { text: "(" },
              { text: '"name"', emphasis: "required" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Variable", emphasis: "required" },
              { text: "(" },
              { text: '"name"', emphasis: "required" },
              { text: ")" },
            ],
            note: [{ text: "a reference whose name needs quoting" }],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'itemNBT Item("minecraft:stone", 1)',
            caption: [{ text: "constructor in an argument position" }],
          },
          {
            kind: "concrete",
            text: 'itemNBT Item("minecraft:stone", 64, {"display":{"Name":"Stone"}})',
            caption: [{ text: "with a tag object" }],
          },
          {
            kind: "concrete",
            text: 'itemNBT Fluid("minecraft:water", 1000)',
            caption: [{ text: "fluid with an amount" }],
          },
          {
            kind: "concrete",
            text: 'itemNBT Entity("minecraft:cow", 1)',
          },
        ],
      },
      {
        heading: [{ text: "Operator names" }],
        summary: [
          {
            text: "An operator is written by any of its names: a nickname such as add, its official name, or its display name. apply, pipe and flip are ordinary operators written the same way, and flipped operators have a shorthand, flip<Nickname>, to obtain the flipped form.",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "booleanOr true false",
          },
          {
            kind: "concrete",
            text: "flipListContainsPredicate",
            caption: [
              { text: "implicit flip: flip + the operator's nickname" },
            ],
          },
        ],
        links: [
          { label: [{ text: "booleanOr" }], href: "#operator-LOGICAL_OR" },
          { label: [{ text: "apply" }], href: "#operator-OPERATOR_APPLY" },
          { label: [{ text: "pipe" }], href: "#operator-OPERATOR_PIPE" },
          { label: [{ text: "flip" }], href: "#operator-OPERATOR_FLIP" },
        ],
      },
      {
        heading: [{ text: "Readers" }],
        summary: [
          {
            text: "A reader call names a reader, an optional part id, an aspect, optional aspect settings and an optional simulated result. Reader names are case-insensitive and the aspect may be written as its enum key or its display name.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "ReaderName", emphasis: "required" },
              { text: "(partID)", emphasis: "optional" },
              { text: "." },
              { text: "aspectName", emphasis: "required" },
              { text: "(" },
              { text: "{settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
            note: [
              {
                text: "dotted form; () is the same as leaving the part id out",
              },
            ],
          },
          {
            spans: [
              { text: "shortNameReader", emphasis: "required" },
              { text: "(" },
              { text: '"aspect"', emphasis: "required" },
              { text: ", {settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
            note: [{ text: "the reader's short name with a Reader suffix" }],
          },
          {
            spans: [
              { text: "reader", emphasis: "required" },
              { text: "(" },
              { text: '"reader"', emphasis: "required" },
              { text: ", " },
              { text: '"aspect"', emphasis: "required" },
              { text: ", {settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "readers", emphasis: "required" },
              { text: "." },
              { text: "shortName", emphasis: "required" },
              { text: "." },
              { text: "aspect", emphasis: "required" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "itemNBT InventoryReader(0).slotItem",
            caption: [{ text: "dotted form, part id 0" }],
          },
          {
            kind: "concrete",
            text: 'itemNBT inventoryReader("Slot Item")',
            caption: [{ text: "short name and aspect display name" }],
          },
          {
            kind: "concrete",
            text: 'itemNBT reader("inventory", "slot_item")',
            caption: [{ text: "generic form" }],
          },
          {
            kind: "concrete",
            text: "itemNBT readers.inventory.slotItem",
            caption: [{ text: "readers.<shortName> form" }],
          },
        ],
        links: [
          { label: [{ text: "Inventory reader" }], href: "#readers-inventory" },
          {
            label: [{ text: "Slot Item aspect" }],
            href: "#reader-inventory-object-item-stack-slot",
          },
        ],
      },
      {
        heading: [{ text: "Lambdas" }],
        summary: [
          {
            text: "A lambda is written param -> expression, param => expression, or \\param.expression.",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "x -> numberAdd x 1",
          },
          {
            kind: "concrete",
            text: "x => numberAdd x 1",
          },
          {
            kind: "concrete",
            text: "\\x.numberAdd x 1",
          },
        ],
      },
      {
        heading: [{ text: "Materializing readers" }],
        summary: [
          {
            text: "Materialize(expression) puts a materializer around the expression. Readers inside it are abstracted into the lambda's parameters instead of being read by the card, and the materializer's result is that lambda. Dynamic(expression) makes an expression a parameter in its own right, and Static(expression) pins an expression so its readers stay inside the card. The wrapper is written the same way as in ",
          },
          { text: "Condensed", code: true },
          { text: "; a " },
          { text: "Code Line", code: true },
          { text: " expression inside the brackets keeps the line " },
          { text: "Code Line", code: true },
          { text: ", while a parenthesized call inside them makes it " },
          { text: "Condensed", code: true },
          { text: ", so Materialize(numberAdd 1 2) is " },
          { text: "Code Line", code: true },
          { text: " and Materialize(numberAdd(1, 2)) is " },
          { text: "Condensed", code: true },
          { text: "." },
        ],
        syntax: [
          {
            spans: [
              { text: "Materialize", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "the readers in the expression become the lambda's parameters",
              },
            ],
          },
          {
            spans: [
              { text: "Dynamic", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "give an expression a parameter of its own, even without a reader in it",
              },
            ],
          },
          {
            spans: [
              { text: "Static", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "keep an expression fixed so its readers are not abstracted",
              },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "apply Materialize(numberAdd InventoryReader(0).inventoryCount 2) 3",
            caption: [{ text: "apply the materialized lambda to a value" }],
          },
          {
            kind: "concrete",
            text: "pipe Materialize(numberAdd InventoryReader(0).inventoryCount 2) arithmeticIncrement",
            caption: [{ text: "use the materialized lambda as an argument" }],
          },
          {
            kind: "concrete",
            text: "Materialize(numberAdd InventoryReader(0).inventoryCount 2)",
            caption: [{ text: "on its own" }],
          },
          {
            kind: "concrete",
            text: "Materialize(Static(add InventoryReader(0).inventoryCount 2))",
            caption: [{ text: "Static keeps the reader inside the card" }],
          },
          {
            kind: "concrete",
            text: "Materialize(numberAdd Dynamic(1) InventoryReader(0).inventoryCount)",
            caption: [
              { text: "Dynamic adds a parameter that has no reader in it" },
            ],
          },
        ],
        links: [
          { label: [{ text: "Inventory reader" }], href: "#readers-inventory" },
          {
            label: [{ text: "Inventory Count aspect" }],
            href: "#reader-inventory-integer-count",
          },
          {
            label: [{ text: "add / numberAdd" }],
            href: "#operator-ARITHMETIC_ADDITION",
          },
          { label: [{ text: "apply" }], href: "#operator-OPERATOR_APPLY" },
          { label: [{ text: "pipe" }], href: "#operator-OPERATOR_PIPE" },
        ],
      },
      {
        heading: [{ text: "Statements" }],
        summary: [
          {
            text: "Separate statements with a semicolon; the last statement is the program's result.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "expression", emphasis: "required" },
              { text: " ; " },
              { text: "expression", emphasis: "required" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "5; add 5 1",
          },
        ],
      },
      {
        heading: [{ text: "References" }],
        summary: [
          {
            text: "Inside a multi-statement input, @<statement number> refers to variable ID of the last card of an earlier statement, where statements are 0-indexed.",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "319; 236; map NetworkReader.variableValueById [@0, @1]",
            caption: [{ text: "@0 and @1 are the two earlier statements" }],
          },
        ],
      },
      displayAndCardSection(),
      {
        heading: [{ text: "Comments" }],
        summary: [
          {
            text: "A trailing comment belongs to the expression it follows, so move it to its own line to attach it to an earlier argument.",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "add 2 3 -- note",
            caption: [{ text: "the comment belongs to the 3" }],
          },
          {
            kind: "concrete",
            text: "add 2 -- note\n3",
            caption: [{ text: "the comment belongs to the 2" }],
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
        heading: [{ text: "Calls" }],
        summary: [
          {
            text: "Write the operator name followed by its arguments in parentheses, comma-separated.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "operatorName", emphasis: "required" },
              { text: "(" },
              { text: "arg1", emphasis: "required" },
              { text: ", " },
              { text: "arg2", emphasis: "required" },
              { text: ")" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "add(2, 3)",
          },
          {
            kind: "concrete",
            text: "apply(add, 1, 2)",
          },
          {
            kind: "concrete",
            text: 'stringConcat("a", "b")',
          },
        ],
        links: [
          { label: [{ text: "apply" }], href: "#operator-OPERATOR_APPLY" },
          {
            label: [{ text: "stringConcat" }],
            href: "#operator-STRING_CONCAT",
          },
        ],
      },
      {
        heading: [{ text: "Nesting" }],
        summary: [
          {
            text: "Calls nest directly; no extra grouping characters are needed.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "outer", emphasis: "required" },
              { text: "(" },
              { text: "inner", emphasis: "required" },
              { text: "(x), y)" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "add(add(1, 2), 3)",
          },
        ],
      },
      {
        heading: [{ text: "Values" }],
        summary: [
          { text: "The same values as the other text forms apply in " },
          { text: "Condensed", code: true },
          {
            text: ": numbers, quoted strings, true, false, null, [ ... ] lists, and { ... } NBT objects.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "5", emphasis: "required" },
              { text: " / " },
              { text: "5l", emphasis: "required" },
              { text: " / " },
              { text: "3.0", emphasis: "required" },
            ],
            note: [
              {
                text: "integer, long (l suffix) and double (needs a decimal point)",
              },
            ],
          },
          {
            spans: [
              { text: '"text"', emphasis: "required" },
              { text: " / " },
              { text: "'text'", emphasis: "required" },
              { text: " / " },
              { text: '"""text"""', emphasis: "required" },
            ],
            note: [
              {
                text: "double, single or triple quoted; \\ escapes the next character",
              },
            ],
          },
          {
            spans: [
              { text: "[" },
              { text: "value", emphasis: "required" },
              { text: ", " },
              { text: "value", emphasis: "required" },
              { text: "]" },
            ],
            note: [{ text: "list" }],
          },
          {
            spans: [
              { text: "{" },
              { text: '"key"', emphasis: "required" },
              { text: ": " },
              { text: "value", emphasis: "required" },
              { text: ", ...}" },
            ],
            note: [{ text: "NBT object; keys are quoted and values nest" }],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "numberAdd(3.0, 1.5)",
            caption: [{ text: "doubles" }],
          },
          {
            kind: "concrete",
            text: "booleanOr(true, false)",
            caption: [{ text: "booleans" }],
          },
          {
            kind: "concrete",
            text: 'eq(["c:armor"], ["c:tools"])',
            caption: [{ text: "lists" }],
          },
          {
            kind: "concrete",
            text: 'add({"a":1}, 1)',
            caption: [{ text: "NBT object" }],
          },
        ],
      },
      {
        heading: [{ text: "In-game values" }],
        summary: [
          {
            text: "Blocks, items, fluids and entities are written as a constructor call: the type name, a quoted id, then an optional size and an optional tag or properties object. The type name is case-insensitive and a fluid takes only its id. Operator looks up an operator value by nickname, official name or display name.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "Item", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {tag}", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Block", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {properties}", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Fluid", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Entity", emphasis: "required" },
              { text: "(" },
              { text: '"id"', emphasis: "required" },
              { text: ", size", emphasis: "optional" },
              { text: ", {tag}", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "Operator", emphasis: "required" },
              { text: "(" },
              { text: '"name"', emphasis: "required" },
              { text: ")" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'Block("minecraft:stone", 64)',
          },
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
            caption: [
              { text: "official name, nickname and display name all work" },
            ],
          },
          {
            kind: "concrete",
            text: 'itemNBT(Item("minecraft:stone", 1))',
            caption: [{ text: "constructor as a call argument" }],
          },
        ],
        links: [
          { label: [{ text: "logical_or" }], href: "#operator-LOGICAL_OR" },
        ],
      },
      {
        heading: [{ text: "Operator names" }],
        summary: [
          {
            text: "An operator is written by any of its names: a nickname such as add, its official name, or its display name, followed by its arguments in parentheses.",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "pipe(arithmeticIncrement, arithmeticIncrement)",
          },
        ],
        links: [
          { label: [{ text: "apply" }], href: "#operator-OPERATOR_APPLY" },
          { label: [{ text: "pipe" }], href: "#operator-OPERATOR_PIPE" },
          { label: [{ text: "flip" }], href: "#operator-OPERATOR_FLIP" },
          { label: [{ text: "booleanOr" }], href: "#operator-LOGICAL_OR" },
        ],
      },
      {
        heading: [{ text: "Readers" }],
        summary: [
          {
            text: "A reader call names a reader, an optional part id, an aspect, optional aspect settings and an optional simulated result. Reader names are case-insensitive and the aspect may be written as its enum key or its display name.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "ReaderName", emphasis: "required" },
              { text: "(partID)", emphasis: "optional" },
              { text: "." },
              { text: "aspectName", emphasis: "required" },
              { text: "(" },
              { text: "{settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "shortNameReader", emphasis: "required" },
              { text: "(" },
              { text: '"aspect"', emphasis: "required" },
              { text: ", {settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
            note: [{ text: "the reader's short name with a Reader suffix" }],
          },
          {
            spans: [
              { text: "reader", emphasis: "required" },
              { text: "(" },
              { text: '"reader"', emphasis: "required" },
              { text: ", " },
              { text: '"aspect"', emphasis: "required" },
              { text: ", {settings}, simulatedOutput", emphasis: "optional" },
              { text: ")" },
            ],
          },
          {
            spans: [
              { text: "readers", emphasis: "required" },
              { text: "." },
              { text: "shortName", emphasis: "required" },
              { text: "." },
              { text: "aspect", emphasis: "required" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: 'InventoryReader(0).slotItem({"slot":1})',
            caption: [{ text: "part id 0, aspect settings" }],
          },
          {
            kind: "concrete",
            text: 'inventoryReader("Slot Item", {"slot":0})',
            caption: [{ text: "short name and aspect display name" }],
          },
          {
            kind: "concrete",
            text: 'reader("inventory", "slot_item")',
            caption: [{ text: "generic form" }],
          },
          {
            kind: "concrete",
            text: "itemNBT(readers.inventory.slotItem)",
            caption: [{ text: "readers.<shortName> form" }],
          },
        ],
        links: [
          { label: [{ text: "Inventory reader" }], href: "#readers-inventory" },
          {
            label: [{ text: "Slot Item aspect" }],
            href: "#reader-inventory-object-item-stack-slot",
          },
        ],
      },
      {
        heading: [{ text: "Lambdas" }],
        summary: [
          {
            text: "A lambda is written param -> expression, param => expression, or \\param.expression.",
          },
        ],
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
        heading: [{ text: "Materializing readers" }],
        summary: [
          {
            text: "Materialize(expression) puts a materializer around the expression. Readers inside it are abstracted into the lambda's parameters instead of being read by the card, and the materializer's result is that lambda. Dynamic(expression) makes an expression a parameter in its own right, and Static(expression) pins an expression so its readers stay inside the card. Parameters are named after the readers they came from and follow the order those readers first appear in; an identical reader used more than once shares one parameter. A Materialize inside another Materialize is consumed by the inner one, which leaves it static for the outer one.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "Materialize", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "the readers in the expression become the lambda's parameters",
              },
            ],
          },
          {
            spans: [
              { text: "Dynamic", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "give an expression a parameter of its own, even without a reader in it",
              },
            ],
          },
          {
            spans: [
              { text: "Static", emphasis: "required" },
              { text: "(" },
              { text: "expression", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "keep an expression fixed so its readers are not abstracted",
              },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))",
            caption: [
              {
                text: "the reader becomes the parameter, the 2 is built into the card",
              },
            ],
          },
          {
            kind: "concrete",
            text: "Materialize(Static(InventoryReader(0).inventoryCount))",
            caption: [{ text: "Static keeps the reader inside the card" }],
          },
          {
            kind: "concrete",
            text: "Materialize(numberAdd(Dynamic(1), InventoryReader(0).inventoryCount))",
            caption: [
              { text: "Dynamic adds a parameter that has no reader in it" },
            ],
          },
        ],
        links: [
          { label: [{ text: "Inventory reader" }], href: "#readers-inventory" },
          {
            label: [{ text: "Inventory Count aspect" }],
            href: "#reader-inventory-integer-count",
          },
          {
            label: [{ text: "add / numberAdd" }],
            href: "#operator-ARITHMETIC_ADDITION",
          },
        ],
      },
      {
        heading: [{ text: "Statements" }],
        summary: [{ text: "Separate statements with a semicolon." }],
        syntax: [
          {
            spans: [
              { text: "expression", emphasis: "required" },
              { text: " ; " },
              { text: "expression", emphasis: "required" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "add(1, 2); multiply(3, 4)",
          },
        ],
      },
      displayAndCardSection(),
      {
        heading: [{ text: "Comments" }],
        summary: [{ text: "A trailing comment runs to the end of the line." }],
        examples: [
          {
            kind: "concrete",
            text: 'add(1, 2) -- "note"',
          },
        ],
      },
    ],
  },
  {
    id: "snbt",
    label: "SNBT",
    sections: [
      {
        heading: [{ text: "What you paste" }],
        summary: [
          { text: "Paste what the game gives you: F3+I, the chat output of " },
          { text: "data get", code: true },
          { text: ", or a " },
          { text: "/give", code: true },
          { text: " line this tool gave you. The output is the " },
          { text: "/give", code: true },
          {
            text: " list that recreates it, and clicking an example runs it and switches the output to ",
          },
          { text: "SNBT", code: true },
          { text: "." },
        ],
        bullets: [
          [
            { text: "F3+I on a block gives a " },
            { text: "/setblock", code: true },
            { text: " line; on an entity it gives a compound with " },
            { text: "Pos", code: true },
            { text: ", " },
            { text: "UUID", code: true },
            { text: " and " },
            { text: "Item", code: true },
            { text: "." },
          ],
          [
            { text: "data get", code: true },
            {
              text: " gives the block's internal name, then its data: id, coordinates and slot holes.",
            },
          ],
        ],
      },
      {
        heading: [{ text: "Envelopes" }],
        summary: [
          {
            text: "The wrapper around the NBT says what it is, and the item id says what the payload is.",
          },
        ],
        syntax: [
          {
            spans: [
              { text: "/setblock", emphasis: "required" },
              { text: " x y z " },
              { text: "block-id", emphasis: "required" },
              { text: "[state]", emphasis: "optional" },
              { text: "{nbt}", emphasis: "required" },
            ],
            note: [{ text: "F3+I on a block" }],
          },
          {
            spans: [
              { text: "/give", emphasis: "required" },
              { text: " targets " },
              { text: "item-id", emphasis: "required" },
              { text: "{nbt}", emphasis: "required" },
            ],
            note: [
              { text: "What this tool emits, and what F3+I gives on an item" },
            ],
          },
          {
            spans: [{ text: "{nbt}", emphasis: "required" }],
            note: [
              { text: "A bare compound, identified from its own " },
              { text: "_id", code: true },
              { text: " / " },
              { text: "Pos", code: true },
              { text: " / " },
              { text: "UUID", code: true },
              { text: " / " },
              { text: "Item", code: true },
            ],
          },
          {
            spans: [
              {
                text: "Server has the following block data: ",
                emphasis: "optional",
              },
              { text: "{nbt}", emphasis: "required" },
            ],
            note: [
              { text: "Example " },
              { text: "data get", code: true },
              { text: " output" },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: '/give @p integrateddynamics:variable{_id:4,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}',
            output: "snbt",
          },
          {
            kind: "concrete",
            text: '/setblock -7 -59 -1 integrateddynamics:cable{partContainer:{parts:[{__partType:"integrateddynamics:display_panel",__side:"east",id:1,inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:7,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;3,3]}}]}]}}',
            output: "snbt",
          },
          {
            kind: "concrete",
            text: 'Block at 0, 64, 0 has the following block data: {id:"minecraft:chest",Items:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:7,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;3,3]}}]}',
            output: "snbt",
          },
          {
            kind: "concrete",
            text: '{Pos:[-8.62d,-60.0d,6.26d],UUID:[I;315053452,587874627,-1669597599,-1936039897],Item:{Count:1b,id:"integrateddynamics:variable",tag:{_id:7,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;3,3]}}}',
            output: "snbt",
          },
        ],
      },
      {
        heading: [
          { text: "The " },
          { text: "/give", code: true },
          { text: " output" },
        ],
        summary: [
          { text: "Every card, and the parts its readers need, comes out as " },
          { text: "/give", code: true },
          { text: " commands. Card ids start at " },
          { text: "Initial variable ID", code: true },
          { text: "; " },
          { text: "Output shape", code: true },
          { text: " can pack the cards into stores instead." },
        ],
        bullets: [
          [
            { text: "Duplicate conflicts", code: true },
            {
              text: " decides what happens when two pastes define one variable differently: error, or keep the first and warn.",
            },
          ],
          [
            { text: "Missing parts", code: true },
            {
              text: " decides what happens when a card reads a part the paste does not contain.",
            },
          ],
          [
            {
              text: "Interface parts are never emitted, and a part pasted twice counts once.",
            },
          ],
          [
            { text: "Card and part ids are renumbered from " },
            { text: "Initial variable ID", code: true },
            { text: " unless " },
            { text: "Variable IDs", code: true },
            { text: " keeps them." },
          ],
          [
            {
              text: "A reader you write is given a part id; a pasted card keeps the part id from the paste.",
            },
          ],
          [
            {
              text: "A program decoded from a pasted part comes out as that part first and bare, then the cards it held: an expression needs a card per step and a panel's state ",
            },
            { text: "inventory", code: true },
            {
              text: " has one slot. A variable store is the exception, its cards stay inside.",
            },
          ],
        ],
        syntax: [
          {
            spans: [
              {
                text: "/give @p integrateddynamics:variable",
                emphasis: "required",
              },
              { text: "{_id, _type, …}", emphasis: "required" },
            ],
            note: [{ text: "one command per card" }],
          },
          {
            spans: [
              {
                text: "/give @p integrateddynamics:variablestore",
                emphasis: "required",
              },
              { text: "{inventory:[…]}", emphasis: "required" },
            ],
            note: [
              {
                text: "a store holds up to 45 cards (9x5); the last store holds the rest",
              },
            ],
          },
          {
            spans: [
              {
                text: "/give @p integrateddynamics:part_display_panel",
                emphasis: "required",
              },
              {
                text: "{id, aspectProperties, enabled, updateInterval, inventory:[…]}",
                emphasis: "required",
              },
            ],
            note: [
              {
                text: "a panel, with the state fields the game reads and the cards it held",
              },
            ],
          },
          {
            spans: [
              {
                text: "/give @p integrateddynamics:part_<part>_reader",
                emphasis: "required",
              },
              {
                text: "{id, aspectProperties:[…], inventory:[…]}",
                emphasis: "required",
              },
            ],
            note: [
              {
                text: "the part its aspect card reads, with the aspect's settings",
              },
            ],
          },
          {
            spans: [
              {
                text: "/give @p integrateddynamics:part_<part>_writer",
                emphasis: "required",
              },
              { text: "{id, inventory:[…]}", emphasis: "required" },
            ],
            note: [
              {
                text: "a writer, exporter or importer, with the cards it held",
              },
            ],
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: '/setblock -7 -60 -1 integrateddynamics:variablestore[facing=west]{connected:{map:[{key:0,value:0b},{key:1,value:1b},{key:2,value:0b},{key:3,value:1b},{key:4,value:0b},{key:5,value:0b}],valueType:"java.lang.Boolean"},inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:4,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:operator",values:["integrateddynamics:operator_apply"]}},variableIds:[I;5,5]}},{Count:1b,Slot:1b,id:"integrateddynamics:variable",tag:{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:operator_apply_n"}},{Count:1b,Slot:2b,id:"integrateddynamics:variable",tag:{_id:5,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:operator_apply"}},{Count:1b,Slot:3b,id:"integrateddynamics:variable",tag:{_id:9,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:nbt",value:{v:2}}},{Count:1b,Slot:4b,id:"integrateddynamics:variable",tag:{_id:40,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:{serializer:"integrateddynamics:curry",value:{baseOperator:"integrateddynamics:operator_apply",values:[{value:"integrateddynamics:operator_apply",valueType:"integrateddynamics:operator"}]}}}},{Count:1b,Slot:6b,id:"integrateddynamics:variable",tag:{_id:7,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:{serializer:"integrateddynamics:curry",value:{baseOperator:"integrateddynamics:operator_apply",values:[{value:"integrateddynamics:operator_apply",valueType:"integrateddynamics:operator"}]}}}},{Count:1b,Slot:8b,id:"integrateddynamics:variable",tag:{_id:11,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",variableIds:[I;10]}},{Count:1b,Slot:9b,id:"integrateddynamics:variable",tag:{_id:13,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}},{Count:1b,Slot:10b,id:"integrateddynamics:variable",tag:{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;13,14]}},{Count:1b,Slot:11b,id:"integrateddynamics:variable",tag:{_id:43,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;36,14]}},{Count:1b,Slot:12b,id:"integrateddynamics:variable",tag:{_id:20,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_concat",variableIds:[I;16,17]}},{Count:1b,Slot:13b,id:"integrateddynamics:variable",tag:{_id:17,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:integer",values:[0]}}}},{Count:1b,Slot:14b,id:"integrateddynamics:variable",tag:{_id:12,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.boolean",variableIds:[I;10]}},{Count:1b,Slot:15b,id:"integrateddynamics:variable",tag:{_id:6,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply_n",variableIds:[I;5,4]}},{Count:1b,Slot:16b,id:"integrateddynamics:variable",tag:{_id:23,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}},{Count:1b,Slot:17b,id:"integrateddynamics:variable",tag:{_id:35,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_equals_multiset",variableIds:[I;22,22]}},{Count:1b,Slot:18b,id:"integrateddynamics:variable",tag:{_id:39,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:relational_equals",typeName:"integrateddynamics:operator",value:{serializer:"integrateddynamics:curry",value:{baseOperator:"integrateddynamics:operator_apply",values:[{value:"integrateddynamics:operator_apply",valueType:"integrateddynamics:operator"}]}},variableIds:[I;22,22]}},{Count:1b,Slot:19b,id:"integrateddynamics:variable",tag:{_id:42,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;30,14]}},{Count:1b,Slot:20b,id:"integrateddynamics:variable",tag:{_id:55,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_pipe",variableIds:[I;53,54]}},{Count:1b,Slot:21b,id:"integrateddynamics:variable",tag:{_id:30,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}},{Count:1b,Slot:22b,id:"integrateddynamics:variable",tag:{_id:36,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}},{Count:1b,Slot:23b,id:"integrateddynamics:variable",tag:{_id:44,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:operator_apply2"}},{Count:1b,Slot:24b,id:"integrateddynamics:variable",tag:{_id:46,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:operator_apply3"}},{Count:1b,Slot:25b,id:"integrateddynamics:variable",tag:{_id:45,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_flip",variableIds:[I;44]}},{Count:1b,Slot:26b,id:"integrateddynamics:variable",tag:{_id:19,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_concat",variableIds:[I;16,16]}},{Count:1b,Slot:27b,id:"integrateddynamics:variable",tag:{_id:41,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_flip",variableIds:[I;46]}},{Count:1b,Slot:28b,id:"integrateddynamics:variable",tag:{_id:18,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_concat",variableIds:[I;17,16]}},{Count:1b,Slot:29b,id:"integrateddynamics:variable",tag:{_id:52,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply0",variableIds:[I;51]}},{Count:1b,Slot:30b,id:"integrateddynamics:variable",tag:{_id:51,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:operator_apply0"}},{Count:1b,Slot:31b,id:"integrateddynamics:variable",tag:{_id:62,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:integer",values:[0,1,2,3,4]}}}},{Count:1b,Slot:32b,id:"integrateddynamics:variable",tag:{_id:59,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_pipe",variableIds:[I;58,53]}},{Count:1b,Slot:33b,id:"integrateddynamics:variable",tag:{_id:61,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;60,48]}},{Count:1b,Slot:34b,id:"integrateddynamics:variable",tag:{_id:14,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:1}},{Count:1b,Slot:36b,id:"integrateddynamics:variable",tag:{_id:33,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:{serializer:"integrateddynamics:combined.pipe",value:{operators:[{v:{serializer:"integrateddynamics:curry",value:{baseOperator:{serializer:"integrateddynamics:combined.flip",value:{operators:[{v:"integrateddynamics:arithmetic_modulus"}]}},values:[{value:2,valueType:"integrateddynamics:integer"}]}}},{v:{serializer:"integrateddynamics:curry",value:{baseOperator:"integrateddynamics:relational_equals",values:[{value:0,valueType:"integrateddynamics:integer"}]}}}]}}}},{Count:1b,Slot:37b,id:"integrateddynamics:variable",tag:{_id:50,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_lazybuilt",variableIds:[I;14,15]}},{Count:1b,Slot:38b,id:"integrateddynamics:variable",tag:{_id:37,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:itemstack",value:{Count:1,id:"integrateddynamics:variable",tag:{_id:36,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:general_identity"}}}},{Count:1b,Slot:40b,id:"integrateddynamics:variable",tag:{_id:38,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_lazybuilt",variableIds:[I;37,36]}},{Count:1b,Slot:41b,id:"integrateddynamics:variable",tag:{_id:22,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_lazybuilt",variableIds:[I;14,15]}},{Count:1b,Slot:43b,id:"integrateddynamics:variable",tag:{_id:67,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:itemstack",value:{Count:1,id:"integrateddynamics:labeller"}}},{Count:1b,Slot:44b,id:"integrateddynamics:variable",tag:{_id:10,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:string",value:"test"}}]}',
            output: "snbt",
          },
        ],
      },
      {
        heading: [{ text: "Layout", code: true }, { text: " and materialize" }],
        summary: [
          {
            text: "Pick one line to copy-paste, or indent the NBT to read it at a glance; ",
          },
          { text: "Indentation", code: true },
          {
            text: " sets how far. Materialize bakes reader values into the cards, so a reader's card carries its cached value instead of the aspect it read.",
          },
        ],
        bullets: [
          [
            {
              text: "A materialized card needs its cached value; a card that has none keeps its application and says so.",
            },
          ],
          [
            {
              text: "Dropping the readers is what Materialize is for; a writer or exporter has side effects and is kept regardless.",
            },
          ],
        ],
      },
      {
        heading: [{ text: "Display and Card" }],
        summary: [
          { text: "These are written in an expression format (" },
          { text: "Expanded", code: true },
          { text: ", " },
          { text: "Code Line", code: true },
          { text: " or " },
          { text: "Condensed", code: true },
          { text: ") and only do something when the output is " },
          { text: "SNBT", code: true },
          {
            text: '. They are how you say "put this program in a display panel" or "unwrap this paste into cards"; they are the one part of the ',
          },
          { text: "SNBT", code: true },
          { text: " output that does not come from a paste." },
        ],
        bullets: [
          [
            {
              text: "Display gives the panel first, then the cards the expression needs; the cards cannot go inside it, because a panel's state ",
            },
            { text: "inventory", code: true },
            { text: " has one slot and the game drops what does not fit." },
          ],
          [
            {
              text: "Card unwraps a paste into the cards it holds and nothing else; it takes a panel, writer, exporter, importer or store, but not a reader, which holds no card.",
            },
          ],
          [
            {
              text: "Both must stand alone: a whole line, a definition's value, or directly inside Materialize; buried inside a call they are rejected, because there is no single panel to put the rest in.",
            },
          ],
        ],
        syntax: [
          {
            spans: [
              { text: "Display", emphasis: "required" },
              { text: "(" },
              { text: "expr", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "the display panel first, then the cards the expression needs",
              },
            ],
          },
          {
            spans: [
              { text: "Card", emphasis: "required" },
              { text: "(" },
              { text: "paste", emphasis: "required" },
              { text: ")" },
            ],
            note: [
              {
                text: "Cards is accepted too, and either spelling is written back as Card",
              },
            ],
          },
        ],
      },
      {
        heading: [{ text: "The 256 character limit" }],
        summary: [
          {
            text: "256 is the client chat box's limit, so a longer command cannot be typed there even though it is valid. Any command over it is marked inline with its length and a reminder to use a command block, which takes at most 32,767 characters; the marker is stripped again when the paste is read back.",
          },
        ],
      },
    ],
  },
  {
    id: "visual",
    label: "Visual",
    sections: [
      {
        heading: [{ text: "Reading the visual output" }],
        bullets: [
          [{ text: "Each step is an in-game card you place." }],
          [
            {
              text: "Every card has a hover tooltip showing its type and signature.",
            },
          ],
          [
            {
              text: "Naming the cards in game needs a labeller; think of them as variable names in another language.",
            },
          ],
          [
            {
              text: "A red X overlay on a display panel points at the input that is wrong.  You can hover over the red X to see what the error is.",
            },
          ],
          [
            {
              text: "The left display panel is what shows in game, the right display panel uses extra logic in this project to lean more towards showing what's truly expected.",
            },
          ],
          [
            {
              text: "A materializer step shows the lambda being built: the card you are materializing sits on top, the variable slot the lambda's parameter fills is on the left, and the resulting lambda card is on the right. Each reader it abstracted then gets its own card and an apply step that feeds it to that lambda.",
            },
          ],
        ],
      },
      {
        heading: [{ text: "Try it" }],
        summary: [
          {
            text: "Clicking the example loads it and switches the output to Visual on its own, so the cards it produces are shown straight away.",
          },
        ],
        examples: [
          {
            kind: "concrete",
            text: "apply add 1 2",
            caption: [
              { text: "a small " },
              { text: "Code Line", code: true },
              { text: " program" },
            ],
            output: "visual",
          },
        ],
      },
    ],
  },
];

export const inputDocTab = (id: InputDocTabId): InputDocTab =>
  INPUT_DOC_TABS.find((tab) => tab.id === id)!;

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
