namespace TypeRawSignatureAST {
	type RawSignatureNode = RawSignatureDefiniteValue | RawSignatureAny;

	type RawSignatureFunction = {
		type: "Function";
		from: RawSignatureNode;
		to: RawSignatureNode;
	};

	type RawSignatureList = {
		type: "List";
		listType: RawSignatureDefiniteValue | RawSignatureAny;
	};

	type RawSignatureAny = {
		type: "Any";
		typeID: number;
	};

	type RawSignatureDefiniteValue =
		| {
				type:
					| "Integer"
					| "Long"
					| "Double"
					| "Number"
					| "Boolean"
					| "String"
					| "Number"
					| "Item"
					| "Block"
					| "Fluid"
					| "NBT"
					| "Ingredients"
					| "Recipe"
					| "UniquelyNamed"
					| "Named"
					| "Entity";
			}
		| RawSignatureList
		| RawSignatureFunction
		| RawSignatureUniquelyNamed
		| RawSignatureNamed;

	type RawSignatureUniquelyNamed = {
		type: "UniquelyNamed";
	};

	type RawSignatureNamed = {
		type: "Named";
	};
}