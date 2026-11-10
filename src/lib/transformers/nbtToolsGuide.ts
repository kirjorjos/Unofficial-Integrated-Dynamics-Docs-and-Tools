export type NbtGuideOperator = "test" | "matchFirst" | "matchAll";

export interface NbtGuideExample {
  code: string;
  operator: NbtGuideOperator;
  note?: string;
}

export interface NbtGuideExampleLoad {
  code: string;
  operator: NbtGuideOperator;
  selectionName: string;
  nbt: string;
}

export interface NbtGuideSample {
  code: string;
  note?: string;
  examples: NbtGuideExample[];
}

export interface NbtGuideTable {
  headers: [string, string] | [string, string, string, string];
  rows: string[][];
}

export type NbtGuideBullet =
  | string
  | (string | { label: string; href: string })[];

export interface NbtGuideSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: NbtGuideBullet[];
  table?: NbtGuideTable;
  tokenTable?: boolean;
  samples?: NbtGuideSample[];
  examples?: NbtGuideExample[];
  nbt?: string;
}

const GUIDE_BASE_NBT =
  '{stats:{health:20,name:"Steve"},Inventory:[{Count:3,id:"minecraft:stone"},{Count:64,id:"minecraft:dirt"}],"my key":"value"}';

export const NBT_GUIDE_TOKEN_ROWS: readonly {
  tokens: string[];
  meaning: string;
}[] = [
  {
    tokens: ["$name"],
    meaning:
      "That selection's path, substituted in before validation: $a becomes .stats.health.",
  },
  {
    tokens: ["> 5", ">= 5", "< 5", "<= 5"],
    meaning:
      "Compares the value at that point to a number: 1b when it holds, else 0b.",
  },
  {
    tokens: ['== "Steve"'],
    meaning: "Compares the value to a string literal: 1b when equal, else 0b.",
  },
  {
    tokens: [".length"],
    meaning: "Entry count of the list or compound at that point.",
  },
  {
    tokens: ["[?(…)]"],
    meaning: "Keeps only the children the inner expression matches.",
  },
  {
    tokens: ["@"],
    meaning: "The node the surrounding filter is checking.",
  },
];

export const NBT_GUIDE_SECTIONS: readonly NbtGuideSection[] = [
  {
    id: "what-this-tool-does",
    heading: "What this tool does",
    paragraphs: [
      "Paste an SNBT blob, inspect it as a formatted tree, click the key you care about, name one or more selections, and read the exact NBT path string the path operators expect.",
    ],
    bullets: [
      "nbtPathMatchFirst takes an exact path built from one named selection.",
      "nbtPathMatchAll takes a minimal exact path built across several named selections.",
      "nbtPathTest takes a validated test path. A logic template is provided to assist in assembling.",
    ],
  },
  {
    id: "snbt-input",
    heading: "SNBT input",
    paragraphs: ["SNBT is the text form of NBT."],
    bullets: [
      [
        "Any format the game gives should be valid input. If you find one doesn't work, please open an issue on the ",
        {
          label: "GitHub issue tracker",
          href: "https://github.com/kirjorjos/Unofficial-Integrated-Dynamics-Docs-and-Tools/issues",
        },
        ".",
      ],
      "With more than one blob, use the Blob selector; the first blob is active by default.",
      "A blob that cannot be parsed is skipped with a warning under the input, allowing the other blobs to still load.",
      "The paste is stored in the URL (?nbt=…) and restored on reload. Clearing the input removes the parameter.",
    ],
    samples: [
      {
        code: '{stats:{health:20,name:"Steve"}}',
        note: "A bare compound.",
        examples: [
          {
            code: ".stats.name",
            operator: "test",
            note: "the name entry inside stats",
          },
        ],
      },
      {
        code: `/give @p minecraft:stone{display:{Name:'"Stone"'}}`,
        note: "Command text.",
        examples: [
          {
            code: ".display.Name",
            operator: "test",
            note: "the display name of the item",
          },
        ],
      },
    ],
  },
  {
    id: "tree-and-selection",
    heading: "The tree and selection",
    nbt: GUIDE_BASE_NBT,
    paragraphs: [
      "The tree formats the blob similar to JSON.stringify(value, null, 2) for ease of mental parsing. Empty containers are written {}. Type suffixes are preserved: 1b, 5s, 1L, 1.5f, 1.0d, quoted strings, and [B;…], [I;…] and [L;…].",
      "The tree is read-only: clicking a row selects it and shows its path under Selection.",
    ],
    bullets: [
      "Byte, int and long arrays are shown as one literal; their elements are not addressable.",
      "Select a value or key to add, give it a name, and press Add to add to the selection list. Names must be unique.",
      "Named entries can be renamed inline or removed.",
    ],
    examples: [
      {
        code: ".stats.health",
        operator: "test",
        note: "a compound child",
      },
      {
        code: ".Inventory[0].Count",
        operator: "test",
        note: "a list element",
      },
      {
        code: '["my key"]',
        operator: "test",
        note: "a key that needs quotes",
      },
    ],
  },
  {
    id: "path-syntax",
    heading: "Path syntax",
    nbt: GUIDE_BASE_NBT,
    paragraphs: [
      "A path is a chain of segments. $ is the root and may be left out when the path starts there.",
    ],
    table: {
      headers: ["Syntax", "Matches"],
      rows: [
        ["$", "the root of the blob"],
        [".key", "a compound child with a plain name"],
        [
          '["key"]',
          "a compound child with any name (quotes and backslashes escaped)",
        ],
        ["[n]", "the list element at index n"],
        ["[start:end]", "a list slice; [start:end:step] adds a step"],
        ["[a,b]", "several sibling names or indices"],
        [".length", "the number of entries in a list or compound"],
        ["* or .*", "every child"],
        ["..", "the parent"],
        ["@", "the current node inside a filter"],
        ["[?(…)]", "the children for which the inner expression holds"],
        ["> n, >= n, < n, <= n", "numeric comparison"],
        ['== "text"', "string equality"],
      ],
    },
    bullets: [
      "Segments compose left to right: .stats.health, .Inventory[0].Count, .stats[health,name] and .Inventory[0:2].",
      "&&, ||, ! and grouping parentheses are not supported.",
      "Arrays are addressed as a whole; their elements are not individually addressable.",
    ],
    examples: [
      ".stats.health",
      ".Inventory[0:2]",
      ".stats[health,name]",
      ".Inventory[?(@.Count > 10)]",
      ".stats.health > 5",
    ].map((code) => ({ code, operator: "test" as const })),
  },
  {
    id: "operators",
    heading: "The three operators",
    nbt: GUIDE_BASE_NBT,
    paragraphs: [
      "The page generates only the partial application: the operator and its path string. Make sure you pick the operator before copying.",
      "Each example below sets its own operator when it is clicked.",
    ],
    table: {
      headers: ["Call", "Signature", "Returns", "Use it when"],
      rows: [
        [
          "nbtPathTest",
          "String → NBT → Boolean",
          "true when the path matches anything, false otherwise",
          "you need a condition",
        ],
        [
          "nbtPathMatchFirst",
          "String → NBT → NBT",
          "the first matching node",
          "you need one value",
        ],
        [
          "nbtPathMatchAll",
          "String → NBT → NBT",
          "all matching nodes",
          "you need several values, including a minimized sibling selection",
        ],
      ],
    },
    examples: [
      {
        code: ".stats.health > 5",
        operator: "test",
        note: "nbtPathTest",
      },
      {
        code: ".stats.health",
        operator: "matchFirst",
        note: "nbtPathMatchFirst: also selects and names the node selection1",
      },
      {
        code: ".stats[health,name]",
        operator: "matchAll",
        note: "nbtPathMatchAll: a static reference, built from two named selections",
      },
    ],
  },
  {
    id: "logic-templates",
    heading: "Logic templates",
    nbt: GUIDE_BASE_NBT,
    paragraphs: [
      "Logic templates only apply to nbtPathTest. $name is replaced by the path of a named selection, and a template with no $name is just a path. An invalid template shows an inline error, keeps the last valid preview on screen, and disables Copy logic.",
    ],
    tokenTable: true,
    bullets: [
      "&&, ||, ! and grouping parentheses are not part of the grammar.",
      "The $name forms are shown in the table below.",
    ],
    examples: [
      { code: ".stats.health > 5", operator: "test" },
      { code: '.stats.health == "full"', operator: "test" },
      { code: ".stats.health.length", operator: "test" },
    ],
  },
  {
    id: "outputs-and-sharing",
    heading: "Outputs and sharing",
    bullets: [
      "Copy path copies the string to use in-game.",
      "Copy logic copies a representation of applying the path/test string to the operator.",
      "Open in transformer opens the Transformers page with a full chain to the applied NBT operator chosen.",
    ],
  },
];
