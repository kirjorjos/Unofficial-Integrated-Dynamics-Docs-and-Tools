import {
  applySnbtOverlay,
  computeSnbtOverlay,
  tokenizeSnbt,
} from "lib/transformers/inputState";

const cardLine = (tag: string): string =>
  `/give @p integrateddynamics:variable{${tag}}`;

const canonicalOf = (raw: string): string => {
  const tokens = tokenizeSnbt(raw).tokens;
  let out = "";
  tokens.forEach((token, index) => {
    const previous = tokens[index - 1];
    if (previous?.type === "bare" && token.type === "bare") out += " ";
    out += token.value;
  });
  return out;
};

const restores = (raw: string, canonical: string): void => {
  const overlay = computeSnbtOverlay(raw, canonical);
  expect(applySnbtOverlay(canonical, overlay)).toBe(raw);
};

describe("TestSnbtOverlay", () => {
  describe("TokenizeSnbt", () => {
    it("testTokenizesACompoundWithSeparatorsAndGaps", () => {
      const stream = tokenizeSnbt("{a: 1b}");
      expect(stream.tokens.map((t) => t.type)).toEqual([
        "brace",
        "bare",
        "separator",
        "bare",
        "brace",
      ]);
      expect(stream.tokens.map((t) => t.value)).toEqual([
        "{",
        "a",
        ":",
        "1b",
        "}",
      ]);
      expect(stream.gaps).toEqual(["", "", "", " ", ""]);
      expect(stream.trailingGap).toBe("");
    });

    it("testCapturesLeadingAndTrailingWhitespaceWithoutTrimming", () => {
      const stream = tokenizeSnbt(" \n\t{a:1}\r\n ");
      expect(stream.tokens.map((t) => t.value)).toEqual([
        "{",
        "a",
        ":",
        "1",
        "}",
      ]);
      expect(stream.gaps[0]).toBe(" \n\t");
      expect(stream.trailingGap).toBe("\r\n ");
    });

    it("testKeepsSignedAndSuffixedNumbersAsOneToken", () => {
      expect(tokenizeSnbt("[I;1,-2,3]").tokens.map((t) => t.value)).toEqual([
        "[",
        "I",
        ";",
        "1",
        ",",
        "-2",
        ",",
        "3",
        "]",
      ]);
    });

    it("testHandlesDoubleSingleAndTripleQuotedStringsWithEscapes", () => {
      expect(
        tokenizeSnbt(`{a:"x\\"y",b:'z',c:"""w"""} `).tokens.map((t) => t.value)
      ).toEqual([
        "{",
        "a",
        ":",
        '"x\\"y"',
        ",",
        "b",
        ":",
        "'z'",
        ",",
        "c",
        ":",
        '"""w"""',
        "}",
      ]);
    });

    it("testKeepsTheSpellingOfATokenVerbatim", () => {
      expect(tokenizeSnbt("{a:1B}").tokens[3]!.value).toBe("1B");
      expect(tokenizeSnbt("{a:1b}").tokens[3]!.value).toBe("1b");
    });

    it("testRejectsAnUnterminatedString", () => {
      expect(() => tokenizeSnbt('{a:"x}')).toThrow(/Unterminated/);
    });
  });

  describe("ComputeSnbtOverlay", () => {
    it("testStoresASparseOverlayForALongPasteThatOnlyDiffersInWhitespace", () => {
      const raw = cardLine(
        '  _id:4,  _type: "integrateddynamics:valuetype",  typeName: "integrateddynamics:integer",  value:5'
      );
      const canonical = canonicalOf(raw);
      const overlay = computeSnbtOverlay(raw, canonical);
      expect(overlay.mode).toBe(0);
      expect(applySnbtOverlay(canonical, overlay)).toBe(raw);
    });

    it("testRoundTripsAPrettyPrintedPasteByteExactly", () => {
      const pretty = [
        "/give @p integrateddynamics:variable{",
        "  _id: 4,",
        '  _type: "integrateddynamics:valuetype",',
        '  typeName: "integrateddynamics:integer",',
        "  value: 5",
        "}",
      ].join("\n");
      restores(pretty, canonicalOf(pretty));
    });

    it("testRecordsASpellingDifference", () => {
      const raw = cardLine(
        '_id:4,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5'
      );
      const canonical = cardLine(
        "_id:4,_type:'integrateddynamics:valuetype',typeName:'integrateddynamics:integer',value:5"
      );
      const overlay = computeSnbtOverlay(raw, canonical);
      expect(overlay.mode).toBe(0);
      if (overlay.mode !== 0) return;
      expect(overlay.spellingOverrides.length).toBeGreaterThan(0);
      restores(raw, canonical);
    });

    it("testFallsBackToTheRawTextWhenTheTokenStreamsDiffer", () => {
      const raw = `/setblock 0 0 0 minecraft:air{}`;
      const overlay = computeSnbtOverlay(raw, "{_id:4}");
      expect(overlay.mode).toBe(1);
      restores(raw, "{_id:4}");
    });

    it("testRoundTripsIdenticalTexts", () => {
      const text = cardLine('_id:4,_type:"a"');
      restores(text, text);
    });

    it("testRestoresAPasteWithADifferentEnvelope", () => {
      const raw = `/setblock 0 0 0 integrateddynamics:cable{partContainer:{parts:[]}}`;
      restores(raw, cardLine('_id:4,_type:"a"'));
    });
  });
});
