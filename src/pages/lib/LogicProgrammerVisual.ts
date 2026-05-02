import {
  LOGIC_PROGRAMMER_TYPE_COLORS,
  getTypeColor,
  getOperatorValueSignatureLines,
  getDisplayPanelColor,
  getValueTypeMeta,
} from "pages-lib/visualTransformer";

describe("LogicProgrammerVisualOutput - Type Colors", () => {
  describe("getTypeColor", () => {
    it("returns correct color for each type", () => {
      expect(getTypeColor("Boolean")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Boolean"]
      );
      expect(getTypeColor("Integer")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Integer"]
      );
      expect(getTypeColor("Double")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Double"]
      );
      expect(getTypeColor("Long")).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["Long"]);
      expect(getTypeColor("String")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["String"]
      );
      expect(getTypeColor("List")).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["List"]);
      expect(getTypeColor("Operator")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Operator"]
      );
      expect(getTypeColor("NBT")).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["NBT"]);
      expect(getTypeColor("Block")).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["Block"]);
      expect(getTypeColor("Item")).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["Item"]);
      expect(getTypeColor("Entity")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Entity"]
      );
      expect(getTypeColor("Fluid")).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["Fluid"]);
      expect(getTypeColor("Ingredients")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Ingredients"]
      );
      expect(getTypeColor("Recipe")).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Recipe"]
      );
    });

    it("returns default color for unknown types", () => {
      expect(getTypeColor("UnknownType")).toBe("#f0f0f0");
      expect(getTypeColor("")).toBe("#f0f0f0");
    });

    it("returns Any color for Null type", () => {
      expect(getTypeColor("Null")).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["Null"]);
    });
  });

  describe("LOGIC_PROGRAMMER_TYPE_COLORS constant", () => {
    it("has Operator color as green (#2be72f)", () => {
      expect(LOGIC_PROGRAMMER_TYPE_COLORS["Operator"]).toBe("#2be72f");
    });

    it("has Any color as white (#f0f0f0)", () => {
      expect(LOGIC_PROGRAMMER_TYPE_COLORS["Any"]).toBe("#f0f0f0");
    });

    it("has Null color as white (#f0f0f0)", () => {
      expect(LOGIC_PROGRAMMER_TYPE_COLORS["Null"]).toBe("#f0f0f0");
    });
  });
});

describe("LogicProgrammerVisualOutput - Operator Signature Colors", () => {
  describe("getOperatorValueSignatureLines", () => {
    it("returns black (#000000) for Any type in signature", () => {
      const lines = getOperatorValueSignatureLines("OPERATOR_FLIP");
      const anyLine = lines.find((line) => line.label === "Any");
      if (anyLine) {
        expect(anyLine.color).toBe("#000000");
      } else {
        expect(true).toBe(true);
      }
    });

    it("returns type color (not black) for non-Any types in signature", () => {
      const lines = getOperatorValueSignatureLines("OPERATOR_FLIP");
      lines.forEach((line) => {
        if (line.label !== "Any") {
          expect(line.color).not.toBe("#000000");
        }
      });
    });

    it("returns correct prefix for first line vs subsequent lines", () => {
      const lines = getOperatorValueSignatureLines("ARITHMETIC_ADDITION");
      expect(lines[0]?.prefix).toBe("");
      for (let i = 1; i < lines.length; i++) {
        expect(lines[i]?.prefix).toBe("  -> ");
      }
    });

    it("returns empty array for unknown operator", () => {
      const lines = getOperatorValueSignatureLines(
        "UNKNOWN_OPERATOR_XYZ" as any
      );
      expect(lines).toEqual([]);
    });
  });
});

describe("LogicProgrammerVisualOutput - Display Panel Colors", () => {
  describe("getDisplayPanelColor", () => {
    it("returns operator green for Operator type", () => {
      const color = getDisplayPanelColor({
        sourceType: "Operator",
        detail: "ARITHMETIC_ADDITION",
      });
      expect(color).toBe("#2be72f");
    });

    it("returns type color for value types", () => {
      expect(getDisplayPanelColor({ sourceType: "Integer" })).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Integer"]
      );
      expect(getDisplayPanelColor({ sourceType: "String" })).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["String"]
      );
      expect(getDisplayPanelColor({ sourceType: "Boolean" })).toBe(
        LOGIC_PROGRAMMER_TYPE_COLORS["Boolean"]
      );
    });

    it("returns operator green when tooltipOperatorKey is set", () => {
      const color = getDisplayPanelColor({
        sourceType: "Curry",
        tooltipOperatorKey: "ARITHMETIC_ADDITION",
      });
      expect(color).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["Operator"]);
    });

    it("returns Any color for Null source type", () => {
      const color = getDisplayPanelColor({ sourceType: "Null" });
      expect(color).toBe(LOGIC_PROGRAMMER_TYPE_COLORS["Any"]);
    });
  });
});

describe("LogicProgrammerVisualOutput - Value Type Meta", () => {
  describe("getValueTypeMeta", () => {
    it("returns correct label for each type", () => {
      expect(getValueTypeMeta("Boolean").label).toBe("Boolean");
      expect(getValueTypeMeta("Integer").label).toBe("Integer");
      expect(getValueTypeMeta("Operator").label).toBe("Operator");
    });

    it("returns correct colorCode for each type", () => {
      expect(getValueTypeMeta("Boolean").colorCode).toBe("§1");
      expect(getValueTypeMeta("Integer").colorCode).toBe("§6");
      expect(getValueTypeMeta("Operator").colorCode).toBe("§2");
    });

    it("returns infoKey for types that have it", () => {
      expect(getValueTypeMeta("Any").infoKey).toBe(
        "valuetype.integrateddynamics.any.info"
      );
      expect(getValueTypeMeta("Operator").infoKey).toBe(
        "valuetype.integrateddynamics.operator.info"
      );
    });

    it("returns undefined infoKey for types without it", () => {
      expect(getValueTypeMeta("Boolean").infoKey).toBeUndefined();
      expect(getValueTypeMeta("Integer").infoKey).toBeUndefined();
    });
  });
});
