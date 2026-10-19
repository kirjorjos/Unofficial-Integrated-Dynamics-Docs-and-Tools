import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { astContentKey } from "lib/transformers/NetworkCards";
import { SNBTToCompoundTag, SNBTToTag } from "lib/transformers/SNBT";
import {
  cardToAST,
  decodeOperatorTag,
  decodeValueTag,
  getCardId,
  getCardType,
  hasApplication,
  hasCachedValue,
  isVariableCard,
} from "lib/transformers/cardAst";

const card = (snbt: string): CompoundTag => SNBTToCompoundTag(snbt);

const decodeCard = (snbt: string) => cardToAST(card(snbt));

describe("TestCardAst", () => {
  describe("CardRecognition", () => {
    it("testReadsTypeAndId", () => {
      const tag = card(
        '{_id:4,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:1}'
      );
      expect(getCardType(tag)).toBe("integrateddynamics:valuetype");
      expect(getCardId(tag)).toBe("4");
      expect(isVariableCard(tag)).toBe(true);
    });

    it("testKnowsAllFiveFacades", () => {
      for (const type of [
        "integrateddynamics:valuetype",
        "integrateddynamics:operator",
        "integrateddynamics:aspect",
        "integrateddynamics:proxy",
        "integrateddynamics:delay",
      ]) {
        expect(isVariableCard(card(`{_id:1,_type:"${type}"}`))).toBe(true);
      }
    });

    it("testRejectsATagWithoutARecognisedType", () => {
      expect(isVariableCard(card('{_id:1,_type:"minecraft:something"}'))).toBe(
        false
      );
      expect(isVariableCard(card("{_id:1}"))).toBe(false);
      expect(
        isVariableCard(card('{_type:"integrateddynamics:valuetype"}'))
      ).toBe(false);
    });

    it("testRecognisesAnApplicationAndACachedValue", () => {
      const application = card(
        '{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;13,14]}'
      );
      expect(hasApplication(application)).toBe(true);
      expect(hasCachedValue(application)).toBe(false);

      const cached = card(
        '{_id:21,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_filter",typeName:"integrateddynamics:integer",value:0,variableIds:[I;33,22]}'
      );
      expect(hasApplication(cached)).toBe(true);
      expect(hasCachedValue(cached)).toBe(true);
    });
  });

  describe("OperatorApplication", () => {
    it("testDecodesAnOperatorPlusItsVariableReferences", () => {
      const result = decodeCard(
        '{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;13,14]}'
      );
      expect(result.value).toEqual({
        type: "Curry",
        base: { type: "Operator", opName: "OPERATOR_APPLY" },
        args: [
          { type: "Variable", name: "@13" },
          { type: "Variable", name: "@14" },
        ],
      });
      expect(result.warnings).toEqual([]);
    });

    it("testKeepsAnOperatorThatIsNotTheApplyFamily", () => {
      const result = decodeCard(
        '{_id:35,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_equals_multiset",variableIds:[I;22,22]}'
      );
      expect(result.value?.type).toBe("Curry");
      expect((result.value as TypeAST.Curried).base).toEqual({
        type: "Operator",
        opName: "LIST_EQUALS_MULTISET",
      });
    });

    it("testDecodesAnOperatorWithNoVariablesToApply", () => {
      const result = decodeOperatorTag(
        SNBTToTag('"integrateddynamics:operator_apply_n"')
      );
      expect(result.value).toEqual({
        type: "Operator",
        opName: "OPERATOR_APPLY_N",
      });
    });

    it("testDecodesJavasSerializedCurryForm", () => {
      const result = decodeOperatorTag(
        card(
          '{serializer:"integrateddynamics:curry",value:{baseOperator:"integrateddynamics:operator_apply",values:[{value:"integrateddynamics:operator_apply",valueType:"integrateddynamics:operator"}]}}'
        )
      );
      expect(result.value).toEqual({
        type: "Curry",
        base: { type: "Operator", opName: "OPERATOR_APPLY" },
        args: [{ type: "Operator", opName: "OPERATOR_APPLY" }],
      });
      expect(result.warnings).toEqual([]);
    });

    it("testDecodesJavasSerializedPipeForm", () => {
      const result = decodeOperatorTag(
        card(
          '{serializer:"integrateddynamics:combined.pipe",value:{operators:[{v:"integrateddynamics:list_length"},{v:"integrateddynamics:arithmetic_modulus"}]}}'
        )
      );
      expect(result.warnings).toEqual([]);
      expect(result.value?.type).toBe("Pipe");
      const piped = result.value as TypeAST.Pipe;
      expect(piped.op1).toEqual({ type: "Operator", opName: "LIST_LENGTH" });
      expect(piped.op2).toEqual({
        type: "Operator",
        opName: "ARITHMETIC_MODULUS",
      });
    });

    it("testDecodesJavasSerializedFlipForm", () => {
      const result = decodeOperatorTag(
        card(
          '{serializer:"integrateddynamics:combined.flip",value:{operators:[{v:"integrateddynamics:arithmetic_modulus"}]}}'
        )
      );
      expect(result.warnings).toEqual([]);
      expect(result.value).toEqual({
        type: "Flip",
        arg: { type: "Operator", opName: "ARITHMETIC_MODULUS" },
      });
    });

    it("testDecodesJavasSerializedPipe2Form", () => {
      const result = decodeOperatorTag(
        card(
          '{serializer:"integrateddynamics:combined.pipe2",value:{operators:[{v:"integrateddynamics:list_length"},{v:"integrateddynamics:arithmetic_addition"},{v:"integrateddynamics:operator_map"}]}}'
        )
      );
      expect(result.warnings).toEqual([]);
      expect(result.value?.type).toBe("Pipe2");
    });

    it("testWarnsAboutASerializerItDoesNotKnow", () => {
      const result = decodeOperatorTag(
        card(
          '{serializer:"integrateddynamics:combined.conjunction",value:{operators:[{v:"integrateddynamics:p_conjunction"}]}}'
        )
      );
      expect(result.value).toBeUndefined();
      expect(result.warnings.join(" ")).toContain(
        'Unsupported operator serializer "integrateddynamics:combined.conjunction"'
      );
    });
  });

  describe("CachedValues", () => {
    it("testDecodesEachPrimitiveValueType", () => {
      expect(
        decodeValueTag("integrateddynamics:boolean", SNBTToTag("1b")).value
      ).toEqual({ type: "Boolean", value: true });
      expect(
        decodeValueTag("integrateddynamics:integer", SNBTToTag("1")).value
      ).toEqual({ type: "Integer", value: "1" });
      expect(
        decodeValueTag("integrateddynamics:double", SNBTToTag("1.5d")).value
      ).toEqual({ type: "Double", value: "1.5" });
      expect(
        decodeValueTag("integrateddynamics:long", SNBTToTag("1L")).value
      ).toEqual({ type: "Long", value: "1" });
      expect(
        decodeValueTag("integrateddynamics:string", SNBTToTag('"test"')).value
      ).toEqual({ type: "String", value: "test" });
    });

    it("testDecodesABlockValueVerbatim", () => {
      const result = decodeValueTag(
        "integrateddynamics:block",
        SNBTToCompoundTag('{Name:"minecraft:air"}')
      );
      expect(result.value).toEqual({
        type: "Block",
        value: { Name: "minecraft:air" },
      });
      expect(result.warnings).toEqual([]);
    });

    it("testDecodesAnNbtValue", () => {
      const result = decodeValueTag(
        "integrateddynamics:nbt",
        SNBTToCompoundTag("{v:2}")
      );
      expect(result.value).toEqual({ type: "NBT", value: { v: 2 } });
    });

    it("testDecodesAnItemstackContainingANestedCardAsAPlainItem", () => {
      const result = decodeCard(
        '{_id:37,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:itemstack",value:{Count:1,id:"integrateddynamics:variable",tag:{_id:36,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:general_identity"}}}'
      );
      expect(result.value?.type).toBe("Item");
      expect(result.warnings).toEqual([]);
      expect(JSON.stringify(result.value)).toContain(
        "integrateddynamics:variable"
      );
    });

    it("testDecodesAMaterializedListProxy", () => {
      const result = decodeCard(
        '{_id:17,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:integer",values:[0]}}}'
      );
      expect(result.warnings).toEqual([]);
      expect(result.value).toEqual({
        type: "List",
        value: [{ type: "Integer", value: "0" }],
      });
    });

    it("testDecodesAMaterializedProxyHoldingOperators", () => {
      const result = decodeCard(
        '{_id:4,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:operator",values:["integrateddynamics:operator_apply"]}},variableIds:[I;5,5]}'
      );
      expect(result.value?.type).toBe("List");

      const cached = decodeValueTag(
        "integrateddynamics:list",
        SNBTToCompoundTag(
          '{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:operator",values:["integrateddynamics:operator_apply"]}}'
        )
      );
      expect(cached.value).toEqual({
        type: "List",
        value: [{ type: "Operator", opName: "OPERATOR_APPLY" }],
      });
    });

    it("testWarnsInsteadOfSilentlyEmptyingAnInfiniteList", () => {
      const result = decodeValueTag(
        "integrateddynamics:list",
        SNBTToCompoundTag(
          '{proxyName:"integrateddynamics:lazybuilt",serialized:{value:{value:1,valueType:"integrateddynamics:integer"},operator:"integrateddynamics:arithmetic_addition",valueType:"integrateddynamics:integer"}}'
        )
      );
      expect(result.value).toBeUndefined();
      expect(result.warnings.join(" ")).toContain("Infinite (lazy) list");
    });

    it("testWarnsAboutAValueTypeItCannotDecode", () => {
      const result = decodeValueTag(
        "integrateddynamics:not_a_type",
        SNBTToTag("1")
      );
      expect(result.value).toBeUndefined();
      expect(result.warnings.join(" ")).toContain(
        "Could not decode a integrateddynamics:not_a_type value"
      );
    });
  });

  describe("TheFixturesCards", () => {
    it("testDecodesTheMaterializersRecipeCardWhichHasNoApplication", () => {
      const result = decodeCard(
        '{_id:103,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:recipe",value:{input:{"minecraft:itemstack":[{type:0b,val:[{condition:1,prototype:{Count:1b,id:"minecraft:air"}}]},{type:0b,val:[{condition:1,prototype:{Count:1b,id:"minecraft:air"}}]},{type:0b,val:[{condition:1,prototype:{Count:1b,id:"minecraft:air"}}]},{type:0b,val:[{condition:1,prototype:{Count:1b,id:"minecraft:air"}}]},{type:1b,val:{keys:["minecraft:warped_stems"],match:5,quantity:1L}}]},inputReusable:{"minecraft:itemstack":[B;0B,0B,0B,0B,0B]},output:{"minecraft:itemstack":[{Count:4b,id:"minecraft:warped_planks"}]}}}'
      );
      expect(result.value?.type).toBe("Recipe");
    });

    it("testDecodesTheVariableStoresCachedCurryValue", () => {
      const result = decodeCard(
        '{_id:40,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:{serializer:"integrateddynamics:curry",value:{baseOperator:"integrateddynamics:operator_apply",values:[{value:"integrateddynamics:operator_apply",valueType:"integrateddynamics:operator"}]}}}'
      );
      expect(result.warnings).toEqual([]);
      expect(result.value).toEqual({
        type: "Curry",
        base: { type: "Operator", opName: "OPERATOR_APPLY" },
        args: [{ type: "Operator", opName: "OPERATOR_APPLY" }],
      });
    });

    it("testDecodesTheDisplayPanelsCombinedPipeCache", () => {
      const result = decodeCard(
        '{_id:33,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:{serializer:"integrateddynamics:combined.pipe",value:{operators:[{v:{serializer:"integrateddynamics:curry",value:{baseOperator:{serializer:"integrateddynamics:combined.flip",value:{operators:[{v:"integrateddynamics:arithmetic_modulus"}]}},values:[{value:2,valueType:"integrateddynamics:integer"}]}}},{v:{serializer:"integrateddynamics:curry",value:{baseOperator:"integrateddynamics:relational_equals",values:[{value:0,valueType:"integrateddynamics:integer"}]}}}]}}}'
      );
      expect(result.warnings).toEqual([]);
      expect(result.value?.type).toBe("Pipe");
      expect(astContentKey(result.value!)).toContain("MODULUS");
      expect(astContentKey(result.value!)).toContain("RELATIONAL_EQUALS");
    });

    it("testReadsEachValuetypeCardsOwnBodyNotTheApplicationBesideIt", () => {
      const recipe = decodeCard(
        '{_id:77,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:recipe",value:{input:{"minecraft:itemstack":[{type:0b,val:[{condition:1,prototype:{Count:1b,id:"minecraft:air"}}]}]},inputReusable:{"minecraft:itemstack":[B;0B]},output:{"minecraft:itemstack":[]}},variableIds:[I;55,14]}'
      );
      const fluid = decodeCard(
        '{_id:104,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:fluidstack",value:{Amount:0,FluidName:"minecraft:empty"},variableIds:[I;55,14]}'
      );
      expect(recipe.value?.type).toBe("Recipe");
      expect(fluid.value?.type).toBe("Fluid");
    });

    it("testReportsAnAspectCardWithoutInventingAValue", () => {
      const result = decodeCard(
        '{_id:90,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_any_network_value",partId:15}'
      );
      expect(result.value).toBeUndefined();
      expect(result.warnings.join(" ")).toContain("part 15");
    });

    it("testApproximatesAProxyCardWithTheIdentityOperator", () => {
      const result = decodeCard(
        '{_id:2,_type:"integrateddynamics:proxy",partId:0}'
      );
      expect(result.value).toEqual({
        type: "Operator",
        opName: "GENERAL_IDENTITY",
      });
      expect(result.warnings.join(" ")).toContain("identity operator");
    });

    it("testReportsACardWhoseOwnFacadeIsMissingItsFields", () => {
      const operator = decodeCard(
        '{_id:7,_type:"integrateddynamics:operator"}'
      );
      expect(operator.value).toBeUndefined();
      expect(operator.warnings.join(" ")).toContain(
        "an operator card needs both operatorName and variableIds"
      );

      const valuetype = decodeCard(
        '{_id:7,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",variableIds:[I;5,5]}'
      );
      expect(valuetype.value).toBeUndefined();
      expect(valuetype.warnings.join(" ")).toContain(
        "a valuetype card needs both typeName and value"
      );
    });

    it("testReportsACardWithNoFacadeThisToolKnows", () => {
      const result = decodeCard('{_id:7,_type:"integrateddynamics:nonsense"}');
      expect(result.value).toBeUndefined();
      expect(result.warnings.join(" ")).toContain(
        "has no facade this tool knows (integrateddynamics:nonsense)"
      );
    });
  });
});
