import { ASTToSnbt, snbtInputToAST } from "lib/transformers/snbtFormat";

const variable = "/give @p integrateddynamics:variable";
const cardAt = (text: string, index: number): string =>
  text.split("\n")[index]!.replace(variable, "");

describe("TestASTToSnbt", () => {
  it("testWritesAValueCardUnderTheValuesOwnTypeName", () => {
    expect(ASTToSnbt({ type: "Integer", value: "5" })).toBe(
      `${variable}{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}`
    );
  });

  it("testDoesNotFallBackToTheOperatorTypeName", () => {
    expect(ASTToSnbt({ type: "String", value: "hi" })).toContain(
      'typeName:"integrateddynamics:string",value:"hi"'
    );
    expect(ASTToSnbt({ type: "Boolean", value: true })).toContain(
      'typeName:"integrateddynamics:boolean",value:1b'
    );
    expect(ASTToSnbt({ type: "Double", value: "5.5" })).toContain(
      'typeName:"integrateddynamics:double",value:5.5d'
    );
  });

  it("testWritesAnOperatorUsedAsAValueInJavasBareForm", () => {
    expect(
      cardAt(ASTToSnbt({ type: "Operator", opName: "ARITHMETIC_ADDITION" }), 0)
    ).toBe(
      '{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}'
    );
  });

  it("testWritesAnAppliedOperatorAsACardOverItsArgumentIds", () => {
    const text = ASTToSnbt({
      type: "Curry",
      base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
      args: [
        { type: "Variable", name: "@4" },
        { type: "Variable", name: "@5" },
      ],
    });
    expect(text).toBe(
      `${variable}{_id:0,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;4,5]}`
    );
  });

  it("testNamesEachDefinitionByItsCardIdAndKeepsItsReferences", () => {
    const text = ASTToSnbt({
      type: "NetworkCards",
      definitions: [
        { name: "4", node: { type: "Integer", value: "5" } },
        {
          name: "5",
          node: {
            type: "Curry",
            base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
            args: [{ type: "Variable", name: "@4" }],
          },
        },
      ],
    });
    expect(text.split("\n")).toHaveLength(2);
    expect(cardAt(text, 0)).toBe(
      '{_id:4,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}'
    );
    expect(cardAt(text, 1)).toBe(
      '{_id:5,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;4]}'
    );
  });

  it("testRoundTripsTheValuesItWritesThroughThePasteReader", () => {
    expect(snbtInputToAST(ASTToSnbt({ type: "Integer", value: "5" }))).toEqual({
      type: "Integer",
      value: "5",
    });
    expect(snbtInputToAST(ASTToSnbt({ type: "String", value: "hi" }))).toEqual({
      type: "String",
      value: "hi",
    });
    expect(snbtInputToAST(ASTToSnbt({ type: "Boolean", value: true }))).toEqual(
      { type: "Boolean", value: true }
    );
  });
});
