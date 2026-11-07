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
  describe("StripAutoCurryVarNames", () => {
    it("isANoOpOnAnASTWithoutInjectedAutoNames", () => {
      const stripped = stripAutoCurryVarNames(intAst);
      expect(stripped).toEqual(intAst);
      expect((intAst as TypeAST.Curried).varName).toBeUndefined();
    });

    it("copiesAProxyAndItsWrappedCard", () => {
      const proxy = CondensedToAST("Proxy(5, 3)");
      expect(stripAutoCurryVarNames(proxy)).toEqual(proxy);
    });

    it("removesTheAutoNameInjectedByTheRoundTrip", () => {
      const roundTripped = CompressedToAST(ASTToCompressed(intAst));
      expect((roundTripped as TypeAST.Curried).varName).toBeDefined();
      const stripped = stripAutoCurryVarNames(roundTripped);
      expect((stripped as TypeAST.Curried).varName).toBeUndefined();
      expect(ASTToCondensed(stripped)).toBe("numberAdd(1, 2)");
    });

    it("keepsAUserSuppliedVarName", () => {
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

    it("removesAutoNamesFromNestedCurriesToo", () => {
      const raw = "numberAdd(numberAdd(1, 2), 3)";
      const roundTripped = CompressedToAST(
        ASTToCompressed(CondensedToAST(raw))
      );
      const stripped = stripAutoCurryVarNames(roundTripped);
      expect(ASTToCondensed(stripped)).toBe("numberAdd(numberAdd(1, 2), 3)");
    });
  });

  describe("CanonicalReferencesAreDeterministicAcrossCalls", () => {
    it("integerCurryStableRoundTripCanonical", () => {
      const first = canonicalReference("add(1, 2)");
      const second = canonicalReference("add(1, 2)");
      expect(first).toBe("numberAdd(1, 2)");
      expect(second).toBe(first);
    });

    it("stringArgCurryStableCanonicalRegressionUnamedStringsCounter", () => {
      const raw = 'stringConcat("a", "b")';
      const first = canonicalReference(raw);
      const second = canonicalReference(raw);
      expect(first).toBe(raw);
      expect(second).toBe(first);
    });

    it("roundTripCanonicalEqualsDecodeCanonicalSameBitstream", () => {
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

  describe("OverlayBehavior", () => {
    it("nonCanonicalCurryInputGetsASparseOverlayNotRawFallback", () => {
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

    it("canonicalStringArgCurryProducesAnEmptyOverlay", () => {
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
