import { getDisplayPanelAlignment } from "pages-lib/visualTransformerLogic";

describe("LogicProgrammerVisualOutput - Display Panel Alignment", () => {
  describe("getDisplayPanelAlignment", () => {
    it("returns 'left' for Operator type", () => {
      expect(getDisplayPanelAlignment("Operator")).toBe("left");
    });

    it("returns 'left' for Pipe type", () => {
      expect(getDisplayPanelAlignment("Pipe")).toBe("left");
    });

    it("returns 'left' for Integer type", () => {
      expect(getDisplayPanelAlignment("Integer")).toBe("left");
    });

    it("returns 'left' for Double type", () => {
      expect(getDisplayPanelAlignment("Double")).toBe("left");
    });

    it("returns 'left' for Number type", () => {
      expect(getDisplayPanelAlignment("Number")).toBe("left");
    });

    it("returns 'center' for String type", () => {
      expect(getDisplayPanelAlignment("String")).toBe("center");
    });

    it("returns 'center' for Boolean type", () => {
      expect(getDisplayPanelAlignment("Boolean")).toBe("center");
    });

    it("returns 'center' for List type", () => {
      expect(getDisplayPanelAlignment("List")).toBe("center");
    });

    it("returns 'center' for Entity type", () => {
      expect(getDisplayPanelAlignment("Entity")).toBe("center");
    });

    it("returns 'center' for ItemStack type", () => {
      expect(getDisplayPanelAlignment("ItemStack")).toBe("center");
    });

    it("returns 'center' for FluidStack type", () => {
      expect(getDisplayPanelAlignment("FluidStack")).toBe("center");
    });
  });
});
