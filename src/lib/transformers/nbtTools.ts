import { NbtPath } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import {
  compressWithInputState,
  decodeInputStateFromCompressed,
} from "lib/transformers/Compressed";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { SNBTToTag, TagToSNBT, writeKey } from "lib/transformers/SNBT";
import {
  parseEnvelope,
  splitInputBlobs,
  type EnvelopeKind,
} from "lib/transformers/inputParser";

const ARRAY_TYPES: readonly number[] = [
  Tag.TAG_BYTE_ARRAY,
  Tag.TAG_INT_ARRAY,
  Tag.TAG_LONG_ARRAY,
];

export type NbtBlobKind = EnvelopeKind | "value";

export interface NbtBlob {
  index: number;
  label: string;
  kind: NbtBlobKind;
  tag: Tag<IntegratedValue>;
}

export interface NbtExtraction {
  blobs: NbtBlob[];
  warnings: string[];
}

const firstLine = (text: string): string => {
  const line = text.split("\n").find((entry) => entry.trim() !== "") ?? "";
  const trimmed = line.trim();
  return trimmed.length > 60 ? `${trimmed.slice(0, 57)}...` : trimmed;
};

const looksLikeCommand = (blob: string): boolean =>
  /^\/(give|setblock|data)\b/.test(blob.trim()) ||
  /has the following (block data|entity data|contents):/i.test(blob);

export const extractNbtBlobs = (text: string): NbtExtraction => {
  const warnings: string[] = [];
  const blobs: NbtBlob[] = [];

  splitInputBlobs(text).forEach((blob, lineIndex) => {
    let tag: Tag<IntegratedValue> | undefined;
    let kind: NbtBlobKind = "value";
    try {
      const envelope = parseEnvelope(blob);
      if (envelope) {
        tag = envelope.tag;
        kind = envelope.kind;
      } else if (looksLikeCommand(blob)) {
        warnings.push(
          `Blob ${lineIndex + 1}: this command has no NBT to format`
        );
        return;
      } else {
        tag = SNBTToTag(blob);
      }
    } catch (error) {
      warnings.push(
        `Blob ${lineIndex + 1}: not valid SNBT (${
          error instanceof Error ? error.message : String(error)
        })`
      );
      return;
    }
    blobs.push({ index: blobs.length, label: firstLine(blob), kind, tag });
  });

  return { blobs, warnings };
};

export const buildNbtConstantAst = (blobs: NbtBlob[]): TypeAST.AST => {
  const constants: TypeAST.AST[] = blobs.map((blob) => ({
    type: "NBT",
    value: blob.tag.toJSON(),
  }));
  if (constants.length === 0) return { type: "Null" };
  if (constants.length === 1) return constants[0]!;
  return { type: "List", value: constants };
};

export const encodeNbtPaste = (blobs: NbtBlob[], paste: string): string =>
  compressWithInputState(buildNbtConstantAst(blobs), "snbt", {
    format: "snbt",
    mode: "raw",
    rawText: paste,
  });

export const decodeNbtPaste = (code: string): string | null => {
  try {
    const section = decodeInputStateFromCompressed(code, "snbt");
    return section?.mode === "raw" ? section.rawText : null;
  } catch {
    return null;
  }
};

export type NbtPathSegment =
  | { kind: "key"; key: string }
  | { kind: "index"; index: number };

export type NbtContainerKind = "compound" | "list" | "array";

export interface NbtTreeNode {
  id: string;
  segments: NbtPathSegment[];
  tag: Tag<IntegratedValue>;
  label: string;
  container: NbtContainerKind | null;
  children: NbtTreeNode[];
  path: string | null;
}

export const segmentId = (segments: NbtPathSegment[]): string =>
  JSON.stringify(segments);

const containerKindOf = (
  tag: Tag<IntegratedValue>
): NbtContainerKind | null => {
  const type = tag.getType();
  if (type === Tag.TAG_COMPOUND) return "compound";
  if (type === Tag.TAG_LIST) return "list";
  if (ARRAY_TYPES.includes(type)) return "array";
  return null;
};

const PLAIN_CHILD_NAME = /^[a-zA-Z_0-9]+$/;

export const isPlainChildName = (key: string): boolean =>
  PLAIN_CHILD_NAME.test(key);

const escapePathKey = (key: string): string =>
  key.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const pathSegmentText = (segment: NbtPathSegment): string => {
  if (segment.kind === "index") return `[${segment.index}]`;
  return isPlainChildName(segment.key)
    ? `.${segment.key}`
    : `["${escapePathKey(segment.key)}"]`;
};

export const pathForSegments = (segments: NbtPathSegment[]): string =>
  segments.length === 0 ? "$" : segments.map(pathSegmentText).join("");

const buildNode = (
  tag: Tag<IntegratedValue>,
  segments: NbtPathSegment[],
  label: string
): NbtTreeNode => {
  const container = containerKindOf(tag);
  const node: NbtTreeNode = {
    id: segmentId(segments),
    segments,
    tag,
    label,
    container,
    children: [],
    path: pathForSegments(segments),
  };

  if (container === "compound") {
    for (const [key, child] of Object.entries((tag as CompoundTag).data)) {
      node.children.push(
        buildNode(
          child as Tag<IntegratedValue>,
          [...segments, { kind: "key", key }],
          key
        )
      );
    }
  } else if (container === "list") {
    (tag as ListTag)
      .getArray()
      .valueOf()
      .forEach((child, index) => {
        node.children.push(
          buildNode(
            child,
            [...segments, { kind: "index", index }],
            String(index)
          )
        );
      });
  }

  return node;
};

export const buildNbtTree = (tag: Tag<IntegratedValue>): NbtTreeNode =>
  buildNode(tag, [], "");

export const findNbtNode = (
  root: NbtTreeNode,
  segments: NbtPathSegment[]
): NbtTreeNode | undefined => {
  let current: NbtTreeNode | undefined = root;
  for (const segment of segments) {
    current = current?.children.find((child) =>
      segment.kind === "index"
        ? child.segments[child.segments.length - 1]!.kind === "index" &&
          (child.segments[child.segments.length - 1] as { index: number })
            .index === segment.index
        : child.segments[child.segments.length - 1]!.kind === "key" &&
          (child.segments[child.segments.length - 1] as { key: string }).key ===
            segment.key
    );
    if (current === undefined) return undefined;
  }
  return current;
};

export const formatNbtValue = (tag: Tag<IntegratedValue>): string =>
  TagToSNBT(tag, { layout: "minimize" });

export const formatNbtKey = (key: string): string => writeKey(key);

export const formatNbtTag = (tag: Tag<IntegratedValue>): string =>
  TagToSNBT(tag, { layout: "readable", indentation: 2 });

const SELECTION_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

export const isValidSelectionName = (name: string): boolean =>
  SELECTION_NAME.test(name);

export type MinimizedPath = { path: string } | { error: string };

const canonicalMatches = (tag: Tag<IntegratedValue>): string =>
  formatNbtValue(tag);

const countsOf = (values: string[]): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
};

const equalMultisets = (left: string[], right: string[]): boolean => {
  if (left.length !== right.length) return false;
  const leftCounts = countsOf(left);
  const rightCounts = countsOf(right);
  for (const [value, count] of leftCounts) {
    if (rightCounts.get(value) !== count) return false;
  }
  return true;
};

export interface PathVerification {
  ok: boolean;
  extra: number;
  invalid?: boolean;
}

export const verifyPathMatches = (
  root: NbtTreeNode,
  path: string,
  nodes: NbtTreeNode[]
): PathVerification => {
  let expression;
  try {
    expression = NbtPath.parse(path);
  } catch {
    return { ok: false, extra: 0, invalid: true };
  }
  const matched = expression!
    .match(root.tag)
    .getMatches()
    .map(canonicalMatches);
  const expected = nodes.map((node) => canonicalMatches(node.tag));
  if (equalMultisets(matched, expected)) return { ok: true, extra: 0 };
  return { ok: false, extra: Math.max(0, matched.length - expected.length) };
};

const parseJavaInt = (text: string): number | null => {
  if (!/^[-+]?[0-9]+$/.test(text)) return null;
  const value = Number(text);
  if (!Number.isInteger(value)) return null;
  if (value < -2147483648 || value > 2147483647) return null;
  return value;
};

const UNION_SAFE_NAME = /^[^,\]]+$/;

const finalize = (
  candidate: string,
  root: NbtTreeNode,
  nodes: NbtTreeNode[]
): MinimizedPath => {
  const verification = verifyPathMatches(root, candidate, nodes);
  if (verification.ok) return { path: candidate };
  if (verification.invalid) {
    return {
      error: `The generated path "${candidate}" is not a valid 1.19.2 path.`,
    };
  }
  if (verification.extra > 0) {
    return {
      error: `The shortest path also matches ${verification.extra} other ${
        verification.extra === 1 ? "node" : "nodes"
      }, so it was not used.`,
    };
  }
  return {
    error: "The shortest path does not match exactly the selected nodes.",
  };
};

const minimizeSiblings = (
  parentPath: string,
  nodes: NbtTreeNode[]
): { candidate: string } | { error: string } => {
  const lastSegments = nodes.map(
    (node) => node.segments[node.segments.length - 1]!
  );

  if (lastSegments.every((segment) => segment.kind === "index")) {
    const indices = [
      ...new Set(
        (lastSegments as { kind: "index"; index: number }[]).map(
          (segment) => segment.index
        )
      ),
    ].sort((a, b) => a - b);

    if (indices.length >= 2) {
      const step = indices[1]! - indices[0]!;
      const isRun = indices.every(
        (value, index) => index === 0 || value === indices[index - 1]! + step
      );
      if (isRun && step > 0) {
        return {
          candidate:
            step === 1
              ? `${parentPath}[${indices[0]}:${indices[indices.length - 1]}]`
              : `${parentPath}[${indices[0]}:${indices[indices.length - 1]}:${step}]`,
        };
      }
    }

    return { candidate: `${parentPath}[${indices.join(",")}]` };
  }

  if (lastSegments.every((segment) => segment.kind === "key")) {
    const keys = [
      ...new Set(
        (lastSegments as { kind: "key"; key: string }[]).map(
          (segment) => segment.key
        )
      ),
    ];
    const impossible = keys.find(
      (key) => !UNION_SAFE_NAME.test(key) || parseJavaInt(key) !== null
    );
    if (impossible !== undefined) {
      return {
        error: `The key "${impossible}" cannot be written in a [a,b] union (1.19.2 splits the union on commas and reads numeric names as indexes).`,
      };
    }
    return { candidate: `${parentPath}[${keys.join(",")}]` };
  }

  return {
    error:
      "These selections mix keys and list indexes, so one path cannot match exactly them.",
  };
};

export const minimizeNamedPath = (
  root: NbtTreeNode,
  nodes: NbtTreeNode[]
): MinimizedPath => {
  if (nodes.length === 0) {
    return { error: "Select a key in the tree and name it first." };
  }

  if (nodes.length === 1) {
    const path = nodes[0]!.path;
    if (path === null) {
      return {
        error: "This node cannot be addressed by a 1.19.2 path.",
      };
    }
    return { path };
  }

  const parentIds = new Set(
    nodes.map((node) => segmentId(node.segments.slice(0, -1)))
  );
  if (parentIds.size > 1) {
    return {
      error:
        "These selections do not share a parent, so one path cannot match exactly them.",
    };
  }

  const parentSegments = nodes[0]!.segments.slice(0, -1);
  const parent = findNbtNode(root, parentSegments);
  if (parent === undefined) {
    return { error: "The selections' parent is not in the active blob." };
  }

  const parentPath = pathForSegments(parentSegments);
  const selectedIds = new Set(nodes.map((node) => node.id));
  if (
    parent.children.length > 0 &&
    parent.children.every((child) => selectedIds.has(child.id))
  ) {
    return finalize(`${parentPath}.*`, root, nodes);
  }

  const result = minimizeSiblings(parentPath, nodes);
  if ("error" in result) return result;
  return finalize(result.candidate, root, nodes);
};

export type NbtPathOperator = "test" | "matchFirst" | "matchAll";

export const NBT_PATH_OPERATOR_KEYS: Record<NbtPathOperator, TypeOperatorKey> =
  {
    test: "NBT_PATH_TEST",
    matchFirst: "NBT_PATH_MATCH_FIRST",
    matchAll: "NBT_PATH_MATCH_ALL",
  };

export const NBT_PATH_OPERATOR_CALLS: Record<NbtPathOperator, string> = {
  test: "nbtPathTest",
  matchFirst: "nbtPathMatchFirst",
  matchAll: "nbtPathMatchAll",
};

const quoteExpandedString = (text: string): string =>
  `"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

export const buildCallString = (
  operator: NbtPathOperator,
  path: string
): string =>
  `${NBT_PATH_OPERATOR_CALLS[operator]}(${quoteExpandedString(path)})`;

export const buildPreviewAst = (
  operator: NbtPathOperator,
  path: string
): TypeAST.AST => ({
  type: "Curry",
  base: { type: "Operator", opName: NBT_PATH_OPERATOR_KEYS[operator] },
  args: [{ type: "String", value: path }],
});

export const buildExpandedSource = (
  operator: NbtPathOperator,
  path: string
): string =>
  `path = ${NBT_PATH_OPERATOR_CALLS[operator]} ${quoteExpandedString(path)}`;

export type TemplateResult =
  | { ok: true; path: string }
  | { ok: false; error: string };

const PATH_NAME_PATTERN = /\$([A-Za-z_][A-Za-z0-9_]*)/g;

const findUnsupportedConstruct = (text: string): string | null => {
  let index = 0;
  let quote: '"' | "'" | null = null;
  let filterDepth = 0;

  while (index < text.length) {
    const char = text[index]!;

    if (quote !== null) {
      if (char === "\\") {
        index += 2;
        continue;
      }
      if (char === quote) quote = null;
      index++;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      index++;
      continue;
    }

    if (filterDepth === 0 && text.startsWith("[?(", index)) {
      filterDepth = 1;
      index += 3;
      continue;
    }

    if (char === "&" && text[index + 1] === "&") return "&&";
    if (char === "|" && text[index + 1] === "|") return "||";
    if (char === "!") return "!";

    if (filterDepth > 0) {
      if (char === "(") filterDepth++;
      else if (char === ")") filterDepth--;
      index++;
      continue;
    }

    if (char === "(" || char === ")") return char;

    index++;
  }

  return null;
};

export const substituteTemplate = (
  template: string,
  nameToPath: Record<string, string>
): TemplateResult => {
  const unknown: string[] = [];
  const substituted = template.replace(
    PATH_NAME_PATTERN,
    (match, name: string) => {
      const path = nameToPath[name];
      if (path === undefined) {
        if (!unknown.includes(name)) unknown.push(name);
        return match;
      }
      return path;
    }
  );

  if (unknown.length > 0) {
    return { ok: false, error: `Unknown path name "$${unknown[0]}"` };
  }

  const unsupported = findUnsupportedConstruct(substituted);
  if (unsupported !== null) {
    return {
      ok: false,
      error: `1.19.2 NBT paths do not support "${unsupported}"`,
    };
  }

  try {
    NbtPath.parse(substituted);
  } catch (error) {
    return {
      ok: false,
      error: `Not a valid 1.19.2 NBT path (${
        error instanceof Error ? error.message : String(error)
      })`,
    };
  }

  return { ok: true, path: substituted };
};
