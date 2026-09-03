import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { CondensedToAST, ASTToCondensed } from "lib/transformers/Condensed";
import {
  stripAutoCurryVarNames,
  computeCondensedOverlay,
  applyCondensedOverlay,
} from "lib/transformers/inputState";

const canonicalReference = (raw: string): string =>
  ASTToCondensed(
    stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(CondensedToAST(raw)))
    )
  );

const intAst: TypeAST.Curried = {
  type: "Curry",
  base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
  args: [
    { type: "Integer", value: "1" },
    { type: "Integer", value: "2" },
  ],
};

describe("TestCurryCanonicalStabilization", () => {
  describe("stripAutoCurryVarNames", () => {
    it("is a no-op on an AST without injected auto names", () => {
      const stripped = stripAutoCurryVarNames(intAst);
      expect(stripped).toEqual(intAst);
      expect((intAst as TypeAST.Curried).varName).toBeUndefined();
    });

    it("removes the auto name injected by the round-trip", () => {
      const roundTripped = CompressedToAST(ASTToCompressed(intAst));
      expect((roundTripped as TypeAST.Curried).varName).toBeDefined();
      const stripped = stripAutoCurryVarNames(roundTripped);
      expect((stripped as TypeAST.Curried).varName).toBeUndefined();
      expect(ASTToCondensed(stripped)).toBe("numberAdd(1, 2)");
    });

    it("keeps a user-supplied varName", () => {
      const named: TypeAST.Curried = {
        type: "Curry",
        varName: "myName",
        base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
        args: [
          { type: "Integer", value: "1" },
          { type: "Integer", value: "2" },
        ],
      };
      const decoded = CompressedToAST(ASTToCompressed(named));
      expect((decoded as TypeAST.Curried).varName).toBe("myName");
      expect((stripAutoCurryVarNames(decoded) as TypeAST.Curried).varName).toBe(
        "myName"
      );
    });

    it("removes auto names from nested curries too", () => {
      const raw = "numberAdd(numberAdd(1, 2), 3)";
      const roundTripped = CompressedToAST(
        ASTToCompressed(CondensedToAST(raw))
      );
      const stripped = stripAutoCurryVarNames(roundTripped);
      expect(ASTToCondensed(stripped)).toBe("numberAdd(numberAdd(1, 2), 3)");
    });
  });

  describe("canonical references are deterministic across calls", () => {
    it("integer curry: stable round-trip canonical", () => {
      const first = canonicalReference("add(1, 2)");
      const second = canonicalReference("add(1, 2)");
      expect(first).toBe("numberAdd(1, 2)");
      expect(second).toBe(first);
    });

    it("string-arg curry: stable canonical (regression: unamedStrings counter)", () => {
      const raw = 'stringConcat("a", "b")';
      const first = canonicalReference(raw);
      const second = canonicalReference(raw);
      expect(first).toBe(raw);
      expect(second).toBe(first);
    });

    it("round-trip canonical equals decode canonical (same bitstream)", () => {
      const raw = 'stringConcat("a", "b")';
      const code = ASTToCompressed(CondensedToAST(raw));
      const encodeSide = ASTToCondensed(
        stripAutoCurryVarNames(
          CompressedToAST(ASTToCompressed(CondensedToAST(raw)))
        )
      );
      const decodeSide = ASTToCondensed(
        stripAutoCurryVarNames(CompressedToAST(code))
      );
      expect(decodeSide).toBe(encodeSide);
      expect(decodeSide).toBe(raw);
    });
  });

  describe("overlay behavior", () => {
    it("non-canonical curry input gets a sparse overlay, not raw fallback", () => {
      const raw = "add(1, 2)";
      const canonical = canonicalReference(raw);
      expect(canonical).toBe("numberAdd(1, 2)");
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(overlay.mode).toBe(0);
      if (overlay.mode === 0) {
        expect(overlay.spellingOverrides).toEqual([[0, "add"]]);
      }
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });

    it("canonical string-arg curry produces an empty overlay", () => {
      const raw = 'stringConcat("a", "b")';
      const canonical = canonicalReference(raw);
      expect(canonical).toBe(raw);
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(overlay.mode).toBe(0);
      if (overlay.mode === 0) {
        expect(overlay.gapOverrides).toEqual([]);
        expect(overlay.spellingOverrides).toEqual([]);
        expect(overlay.hasTrailingGap).toBe(false);
      }
    });
  });
});
