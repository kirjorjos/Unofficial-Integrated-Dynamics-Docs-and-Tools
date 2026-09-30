import type { TransformerSettings } from "lib/transformers/transformerSettings";

export type SettingHelpKey = keyof TransformerSettings;

export interface SettingHelp {
  description: string;
  appliesTo?: string;
}

export const SETTING_HELP: Record<SettingHelpKey, SettingHelp> = {
  initialVariableId: {
    description: "The ID given to the first card in the output",
  },
  signatureDepth: {
    description:
      "Caps how many nested <...> generic levels a signature shows before collapsing to a bare type name. -1 keeps the full, unlimited resolution.",
    appliesTo: "Only applies to Expanded output.",
  },
  depthLabels: {
    description:
      "Renders the typeID# labels on type variables (the labeled a<List<b>> form) instead of plain Any.",
    appliesTo: "Only applies to Expanded output.",
  },
  arrowGlyph: {
    description: "Chooses the function-arrow glyph: unicode or ASCII ->.",
    appliesTo: "Only applies to Expanded output.",
  },
  signatureLayout: {
    description:
      "Shows each definition's signature on its own line, or inline with the definition.",
    appliesTo: "Only applies to Expanded output.",
  },
  inlinePlacement: {
    description:
      "When signatures are inline, places the signature after the definition or before it.",
    appliesTo:
      "Only applies to Expanded output, and only when Signature lines is Inline.",
  },
  statementLayout: {
    description:
      "Joins the ;-separated statements on one line, or puts each statement on its own line with no semicolons.",
    appliesTo: "Only applies to Code Line and Condensed output.",
  },
  referenceStyle: {
    description: "Renders card references as numeric variable IDs or as @refs.",
    appliesTo: "Only applies to Code Line, Condensed and Expanded output.",
  },
  expandedRefForm: {
    description:
      "For Expanded output, renders card references as numeric IDs or as @name-prefixed references.",
    appliesTo: "Only applies to Expanded output.",
  },
  wrap: {
    description:
      "Makes every text box either soft-wrap or scroll horizontally.",
  },
  comments: {
    description: "Keeps input comments.",
    appliesTo: "Only applies to Expanded output.",
  },
  declarationCards: {
    description:
      "Whether a unused operator declaration will result in card creation",
  },
  variableWrapper: {
    description:
      'Renders definition names in Variable("name") form instead of bare names.',
    appliesTo: "Only applies to Expanded output.",
  },
  lambdaParamSugar: {
    description:
      "Switches lambda definitions from the canonical x => ... form to the inc x = ... param sugar.",
    appliesTo: "Only applies to Expanded output.",
  },
  duplicateNames: {
    description:
      "How a name redefined with a different definition is handled: a hard error, or allowed with a warning.",
  },
  hardening: {
    description:
      "Which hardening logic the signature rendering uses: the In-game logic or the Full hardening logic.",
    appliesTo: "Only applies to Expanded output.",
  },
  hideOperatorWrappers: {
    description:
      "Hides Operator<...> wrappers where the operator-versus-function distinction is not load-bearing.",
    appliesTo: "Only applies to Expanded output.",
  },
  resolve: {
    description: "Resolve an Any's type where possible.",
    appliesTo: "Only applies to Expanded output.",
  },
  preferSourceNames: {
    description:
      "Renders operator values with the user provided nickname rahter than the canonical name.",
    appliesTo: "Only applies to Expanded output.",
  },
  materialize: {
    description:
      "Wraps the whole program in Materialize(...) before emitting, so reader values are baked in and the readers they came from are dropped.",
    appliesTo: "Only applies to SNBT output.",
  },
  outputShape: {
    description:
      "Emits one /give per variable card, or fills integral variable stores of 45 slots (9×5) with the last store holding the remainder.",
    appliesTo: "Only applies to SNBT output.",
  },
  layout: {
    description:
      "Writes each command on one line, or breaks the NBT over indented lines.",
    appliesTo: "Only applies to SNBT output.",
  },
  indentation: {
    description:
      "How many spaces each nesting level is indented in Readable layout.",
    appliesTo: "Only applies to SNBT output.",
  },
  cardIds: {
    description:
      "Keeps the variable and part ids the paste used, or renumbers them from the Initial variable ID.",
    appliesTo: "Only applies to SNBT output.",
  },
  missingParts: {
    description:
      "What a card that reads a part the paste does not contain does: fail, or keep going with a warning.",
    appliesTo: "Only applies to SNBT output.",
  },
  conflicts: {
    description:
      "What two pastes of one id that disagree do — a variable or a part defined twice with different contents. Fail, or keep the first and warn.",
    appliesTo: "Only applies to SNBT output.",
  },
};

export const settingHelpText = (key: SettingHelpKey): string => {
  const { description, appliesTo } = SETTING_HELP[key];
  return appliesTo ? `${description} ${appliesTo}` : description;
};
