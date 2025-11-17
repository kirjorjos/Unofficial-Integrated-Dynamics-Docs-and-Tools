export interface iOperatorRegistry {
	and: {
		internalName: "integrateddynamics:logical_and",
		nicknames: ["logicalAnd"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Boolean",
				},
				to: {
					type: "Function",
					from: {
						type: "Boolean",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "&&",
		interactName: "booleanAnd",
		function: Function,
	},
	or: {
		internalName: "integrateddynamics:logical_or",
		nicknames: ["logicalOr"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Boolean",
				},
				to: {
					type: "Function",
					from: {
						type: "Boolean",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "||",
		interactName: "booleanOr",
		function: Function,
	},
	not: {
		internalName: "integrateddynamics:logical_not",
		nicknames: ["logicalNot"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Boolean",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "!",
		interactName: "booleanNot",
		function: Function,
	},
	nand: {
		internalName: "integrateddynamics:logical_nand",
		nicknames: ["logicalNand"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Boolean",
				},
				to: {
					type: "Function",
					from: {
						type: "Boolean",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "!&&",
		interactName: "booleanNand",
		function: Function,
	},
	nor: {
		internalName: "integrateddynamics:logical_nor",
		nicknames: ["logicalNor"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Boolean",
				},
				to: {
					type: "Function",
					from: {
						type: "Boolean",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "!||",
		interactName: "booleanNor",
		function: Function,
	},
	add: {
		internalName: "integrateddynamics:arithmetic_addition",
		nicknames: ["arithmeticAddition"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Number",
					},
				},
			},
		symbol: "+",
		interactName: "numberAdd",
		function: Function,
	},
	subtract: {
		internalName: "integrateddynamics:arithmetic_subtraction",
		nicknames: ["arithmeticSubtraction"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Number",
					},
				},
			},
		symbol: "-",
		interactName: "numberSubtract",
		function: Function,
	},
	multiply: {
		internalName: "integrateddynamics:arithmetic_multiplication",
		nicknames: ["arithmeticMultiplication"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Number",
					},
				},
			},
		symbol: "*",
		interactName: "numberMultiply",
		function: Function,
	},
	divide: {
		internalName: "integrateddynamics:arithmetic_division",
		nicknames: ["arithmeticDivision"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Number",
					},
				},
			},
		symbol: "/",
		interactName: "numberDivide",
		function: Function,
	},
	max: {
		internalName: "integrateddynamics:arithmetic_maximum",
		nicknames: ["arithmeticMaximum"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Number",
					},
				},
			},
		symbol: "max",
		interactName: "numberMax",
		function: Function,
	},
	min: {
		internalName: "integrateddynamics:arithmetic_minimum",
		nicknames: ["arithmeticMinimum"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Number",
					},
				},
			},
		symbol: "min",
		interactName: "numberMin",
		function: Function,
	},
	increment: {
		internalName: "integrateddynamics:arithmetic_increment",
		nicknames: ["arithmeticIncrement"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Number",
				},
			},
		symbol: "++",
		interactName: "numberIncrement",
		function: Function,
	},
	decrement: {
		internalName: "integrateddynamics:arithmetic_decrement",
		nicknames: ["arithmeticDecrement"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Number",
				},
			},
		symbol: "--",
		interactName: "numberDecrement",
		function: Function,
	},
	modulus: {
		internalName: "integrateddynamics:arithmetic_modulus",
		nicknames: ["arithmeticModulus"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Number",
					},
				},
			},
		symbol: "%",
		interactName: "numberModulus",
		function: Function,
	},
	doubleSqrt: {
		internalName: "integrateddynamics:double_sqrt",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Double",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "sqrt",
		interactName: "doubleSqrt",
		function: Function,
	},
	doublePow: {
		internalName: "integrateddynamics:double_pow",
		nicknames: ["doublePow"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Double",
				},
				to: {
					type: "Function",
					from: {
						type: "Double",
					},
					to: {
						type: "Double",
					},
				},
			},
		symbol: "pow",
		interactName: "doublePow",
		function: Function,
	},
	"==": {
		internalName: "integrateddynamics:relational_equals",
		nicknames: ["relationalEquals"],
		parsedSignature: {
				type: "Function",
				from: { type: "Any", typeID: 1 },
				to: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "==",
		interactName: "anyEquals",
		function: Function,
	},
	">": {
		internalName: "integrateddynamics:relational_gt",
		nicknames: ["relationalGt"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: ">",
		interactName: "numberGreaterThan",
		function: Function,
	},
	"<": {
		internalName: "integrateddynamics:relational_lt",
		nicknames: ["relationalLt"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "<",
		interactName: "numberLessThan",
		function: Function,
	},
	"!=": {
		internalName: "integrateddynamics:relational_notequals",
		nicknames: ["relationalNotequals"],
		parsedSignature: {
				type: "Function",
				from: { type: "Any", typeID: 1 },
				to: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "!=",
		interactName: "anyNotEquals",
		function: Function,
	},
	">=": {
		internalName: "integrateddynamics:relational_ge",
		nicknames: ["relationalGe"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: ">=",
		interactName: "anyGreaterThanOrEquals",
		function: Function,
	},
	"<=": {
		internalName: "integrateddynamics:relational_le",
		nicknames: ["relationalLe"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Function",
					from: {
						type: "Number",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "<=",
		interactName: "anyLessThanOrEquals",
		function: Function,
	},
	binaryAnd: {
		internalName: "integrateddynamics:binary_and",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "&",
		interactName: "integerBinaryAnd",
		function: Function,
	},
	binaryOr: {
		internalName: "integrateddynamics:binary_or",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "|",
		interactName: "integerBinaryOr",
		function: Function,
	},
	binaryXor: {
		internalName: "integrateddynamics:binary_xor",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "^",
		interactName: "integerXor",
		function: Function,
	},
	binaryComplement: {
		internalName: "integrateddynamics:binary_complement",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "~",
		interactName: "integerComplement",
		function: Function,
	},
	"<<": {
		internalName: "integrateddynamics:binary_lshift",
		nicknames: ["binaryLshift"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "<<",
		interactName: "integerLeftShift",
		function: Function,
	},
	">>": {
		internalName: "integrateddynamics:binary_rshift",
		nicknames: ["binaryRshift"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: ">>",
		interactName: "integerRightShift",
		function: Function,
	},
	">>>": {
		internalName: "integrateddynamics:binary_rzshift",
		nicknames: ["binaryRzshift"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: ">>>",
		interactName: "integerUnsignedRightShift",
		function: Function,
	},
	stringLength: {
		internalName: "integrateddynamics:string_length",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "len",
		interactName: "stringLength",
		function: Function,
	},
	stringConcat: {
		internalName: "integrateddynamics:string_concat",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "String",
					},
				},
			},
		symbol: "+",
		interactName: "stringConcat",
		function: Function,
	},
	stringContains: {
		internalName: "integrateddynamics:string_contains",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "contains",
		interactName: "stringContains",
		function: Function,
	},
	containsRegex: {
		internalName: "integrateddynamics:string_contains_regex",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "contains_regex",
		interactName: "stringContainsRegex",
		function: Function,
	},
	matchesRegex: {
		internalName: "integrateddynamics:string_matches_regex",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "matches_regex",
		interactName: "stringMatchesRegex",
		function: Function,
	},
	stringIndexOf: {
		internalName: "integrateddynamics:string_index_of",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "index_of",
		interactName: "stringIndexOf",
		function: Function,
	},
	indexOfRegex: {
		internalName: "integrateddynamics:string_index_of_regex",
		nicknames: ["stringIndexOfRegex"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "index_of_regex",
		interactName: "stringIndexOfRegex",
		function: Function,
	},
	startsWith: {
		internalName: "integrateddynamics:string_starts_with",
		nicknames: ["stringStartsWith"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "starts_with",
		interactName: "stringStartsWith",
		function: Function,
	},
	endsWith: {
		internalName: "integrateddynamics:string_ends_with",
		nicknames: ["stringEndsWith"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "ends_with",
		interactName: "stringEndsWith",
		function: Function,
	},
	stringSplitOn: {
		internalName: "integrateddynamics:string_split_on",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: { type: "List", listType: { type: "String" } },
				},
			},
		symbol: "split_on",
		interactName: "stringSplitOn",
		function: Function,
	},
	stringSplitOnRegex: {
		internalName: "integrateddynamics:string_split_on_regex",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: { type: "List", listType: { type: "String" } },
				},
			},
		symbol: "split_on_regex",
		interactName: "stringSplitOnRegex",
		function: Function,
	},
	substring: {
		internalName: "integrateddynamics:string_substring",
		nicknames: ["stringSubstring"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: {
							type: "String",
						},
						to: {
							type: "String",
						},
					},
				},
			},
		symbol: "substring",
		interactName: "integerSubstring",
		function: Function,
	},
	stringRegexGroup: {
		internalName: "integrateddynamics:string_regex_group",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: {
							type: "String",
						},
						to: {
							type: "String",
						},
					},
				},
			},
		symbol: "regex_group",
		interactName: "stringRegexGroup",
		function: Function,
	},
	stringRegexGroups: {
		internalName: "integrateddynamics:string_regex_groups",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: { type: "List", listType: { type: "String" } },
				},
			},
		symbol: "regex_groups",
		interactName: "stringRegexGroups",
		function: Function,
	},
	stringRegexScan: {
		internalName: "integrateddynamics:string_regex_scan",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: {
							type: "String",
						},
						to: { type: "List", listType: { type: "String" } },
					},
				},
			},
		symbol: "regex_scan",
		interactName: "stringRegexScan",
		function: Function,
	},
	stringReplace: {
		internalName: "integrateddynamics:string_replace",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "String",
						},
						to: {
							type: "String",
						},
					},
				},
			},
		symbol: "replace",
		interactName: "stringReplace",
		function: Function,
	},
	stringReplaceRegex: {
		internalName: "integrateddynamics:string_replace_regex",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "String",
						},
						to: {
							type: "String",
						},
					},
				},
			},
		symbol: "replace_regex",
		interactName: "stringReplaceRegex",
		function: Function,
	},
	stringJoin: {
		internalName: "integrateddynamics:string_join",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "String" } },
					to: {
						type: "String",
					},
				},
			},
		symbol: "join",
		interactName: "stringJoin",
		function: Function,
	},
	name: {
		internalName: "integrateddynamics:string_name",
		nicknames: ["namedName", "toString"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Named",
				},
				to: {
					type: "String",
				},
			},
		symbol: "name",
		interactName: "namedName",
		function: Function,
	},
	uname: {
		internalName: "integrateddynamics:string_unique_name",
		nicknames: ["uniquelynamedUniquename"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "UniquelyNamed",
				},
				to: {
					type: "String",
				},
			},
		symbol: "uname",
		interactName: "uniquely_namedUniqueName",
		function: Function,
	},
	error: {
		internalName: "integrateddynamics:string_string_error",
		nicknames: ["string_error"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: { type: "Any", typeID: 1 },
			},
		symbol: "error",
		interactName: "stringStringError",
		function: Function,
	},
	round: {
		internalName: "integrateddynamics:number_round",
		nicknames: ["numberRound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "|| ||",
		interactName: "numberRound",
		function: Function,
	},
	ceil: {
		internalName: "integrateddynamics:number_ceil",
		nicknames: ["numberCeil"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "⌈ ⌉",
		interactName: "numberCeil",
		function: Function,
	},
	floor: {
		internalName: "integrateddynamics:number_floor",
		nicknames: ["numberFloor"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "⌊ ⌋",
		interactName: "numberFloor",
		function: Function,
	},
	compact: {
		internalName: "integrateddynamics:number_compact",
		nicknames: ["numberCompact"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Number",
				},
				to: {
					type: "String",
				},
			},
		symbol: "compact",
		interactName: "numberCompact",
		function: Function,
	},
	isNull: {
		internalName: "integrateddynamics:general_isnull",
		nicknames: ["nullableIsnull"],
		parsedSignature: {
				type: "Function",
				from: { type: "Any", typeID: 1 },
				to: {
					type: "Boolean",
				},
			},
		symbol: "o",
		interactName: "anyIsNull",
		function: Function,
	},
	isNotNull: {
		internalName: "integrateddynamics:general_isnotnull",
		nicknames: ["nullableIsnotnull"],
		parsedSignature: {
				type: "Function",
				from: { type: "Any", typeID: 1 },
				to: {
					type: "Boolean",
				},
			},
		symbol: "∅",
		interactName: "anyIsNotNull",
		function: Function,
	},
	listLength: {
		internalName: "integrateddynamics:list_length",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Integer",
				},
			},
		symbol: "| |",
		interactName: "listLength",
		function: Function,
	},
	listEmpty: {
		internalName: "integrateddynamics:list_empty",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Boolean",
				},
			},
		symbol: "∅",
		interactName: "listIsEmpty",
		function: Function,
	},
	listNotEmpty: {
		internalName: "integrateddynamics:list_notempty",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Boolean",
				},
			},
		symbol: "o",
		interactName: "listIsNotEmpty",
		function: Function,
	},
	get: {
		internalName: "integrateddynamics:list_get",
		nicknames: ["listElement"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: { type: "Any", typeID: 1 },
				},
			},
		symbol: "get",
		interactName: "listGet",
		function: Function,
	},
	getOrDefault: {
		internalName: "integrateddynamics:list_get_or_default",
		nicknames: ["listElementDefault", "get_or_default"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: { type: "Any", typeID: 1 },
					},
				},
			},
		symbol: "get_or_default",
		interactName: "listGetOrDefault",
		function: Function,
	},
	listContains: {
		internalName: "integrateddynamics:list_contains",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "contains",
		interactName: "listContains",
		function: Function,
	},
	listContainsPredicate: {
		internalName: "integrateddynamics:list_contains_p",
		nicknames: ["listContainsP"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Boolean",
						},
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "contains_p",
		interactName: "listContainsPredicate",
		function: Function,
	},
	listCount: {
		internalName: "integrateddynamics:list_count",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "count",
		interactName: "listCount",
		function: Function,
	},
	listCountPredicate: {
		internalName: "integrateddynamics:list_count_p",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Boolean",
						},
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "count_p",
		interactName: "listCountPredicate",
		function: Function,
	},
	append: {
		internalName: "integrateddynamics:list_append",
		nicknames: ["listAppend"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: { "type": "Any", typeID: 1 },
					to: { type: "List", listType: { type: "Any", typeID: 1 } },
				},
			},
		symbol: "append",
		interactName: "listAppend",
		function: Function,
	},
	listConcat: {
		internalName: "integrateddynamics:list_concat",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Any", typeID: 1 } },
					to: { type: "List", listType: { type: "Any", typeID: 1 } },
				},
			},
		symbol: "concat",
		interactName: "listConcat",
		function: Function,
	},
	lazybuilt: {
		internalName: "integrateddynamics:list_lazybuilt",
		nicknames: ["listLazybuilt"],
		parsedSignature: {
				type: "Function",
				from: { type: "Any", typeID: 1 },
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Function",
							from: { type: "Any", typeID: 1 },
							to: {
								type: "List",
								listType: { type: "Any", typeID: 1 },
							},
						},
					},
					to: { type: "List", listType: { type: "Any", typeID: 1 } },
				},
			},
		symbol: "lazybuilt",
		interactName: "anyLazyBuilt",
		function: Function,
	},
	head: {
		internalName: "integrateddynamics:list_head",
		nicknames: ["listHead"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: { type: "Any", typeID: 1 },
			},
		symbol: "head",
		interactName: "listHead",
		function: Function,
	},
	tail: {
		internalName: "integrateddynamics:list_tail",
		nicknames: ["listTail"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: { type: "List", listType: { type: "Any", typeID: 1 } },
			},
		symbol: "tail",
		interactName: "listTail",
		function: Function,
	},
	listUniqPredicate: {
		internalName: "integrateddynamics:list_uniq_p",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Function",
							from: { type: "Any", typeID: 1 },
							to: {
								type: "Boolean",
							},
						},
					},
					to: { type: "List", listType: { type: "Any", typeID: 1 } },
				},
			},
		symbol: "uniq_p",
		interactName: "listUniquePredicate",
		function: Function,
	},
	listUniq: {
		internalName: "integrateddynamics:list_uniq",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: { type: "List", listType: { type: "Any", typeID: 1 } },
			},
		symbol: "uniq",
		interactName: "listUnique",
		function: Function,
	},
	slice: {
		internalName: "integrateddynamics:list_slice",
		nicknames: ["listSlice"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: {
							type: "Integer",
						},
						to: { type: "List", listType: { type: "Any", typeID: 1 } },
					},
				},
			},
		symbol: "slice",
		interactName: "listSlice",
		function: Function,
	},
	intersection: {
		internalName: "integrateddynamics:list_intersection",
		nicknames: ["listIntersection"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Any", typeID: 1 } },
					to: { type: "List", listType: { type: "Any", typeID: 1 } },
				},
			},
		symbol: "∩",
		interactName: "listIntersection",
		function: Function,
	},
	equalsSet: {
		internalName: "integrateddynamics:list_equals_set",
		nicknames: ["listEqualsSet"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Any", typeID: 1 } },
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "=set=",
		interactName: "listEquals_set",
		function: Function,
	},
	equalsMultiset: {
		internalName: "integrateddynamics:list_equals_multiset",
		nicknames: ["listEqualsMultiset"],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Any", typeID: 1 } },
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Any", typeID: 1 } },
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "=multiset=",
		interactName: "listEquals_multiset",
		function: Function,
	},
	opaque: {
		internalName: "integrateddynamics:block_opaque",
		nicknames: ["BlockOpaque"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "opaque",
		interactName: "blockIsOpaque",
		function: Function,
	},
	blockItem: {
		internalName: "integrateddynamics:block_itemstack",
		nicknames: [
			"BlockItemstack",
			"block_item",
			"blockItemstack",
			"block_itemstack",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "Item",
				},
			},
		symbol: "itemstack",
		interactName: "blockItemStack",
		function: Function,
	},
	blockMod: {
		internalName: "integrateddynamics:block_mod",
		nicknames: ["BlockModname", "block_mod", "blockMod", "block_modname"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "String",
				},
			},
		symbol: "mod",
		interactName: "blockMod",
		function: Function,
	},
	breakSound: {
		internalName: "integrateddynamics:block_breaksound",
		nicknames: ["BlockBreaksound", "block_break_sound", "blockBreakSound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "String",
				},
			},
		symbol: "break_sound",
		interactName: "blockBreakSound",
		function: Function,
	},
	placeSound: {
		internalName: "integrateddynamics:block_placesound",
		nicknames: ["BlockPlacesound", "blockPlaceSound", "block_place_sound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "String",
				},
			},
		symbol: "place_sound",
		interactName: "blockPlaceSound",
		function: Function,
	},
	stepSound: {
		internalName: "integrateddynamics:block_stepsound",
		nicknames: ["BlockStepsound", "blockStepSound", "block_step_sound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "String",
				},
			},
		symbol: "step_sound",
		interactName: "blockStepSound",
		function: Function,
	},
	blockIsShearable: {
		internalName: "integrateddynamics:block_isshearable",
		nicknames: ["BlockIsshearable", "block_is_shearable", "blockIsShearable"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_shearable",
		interactName: "blockIsShearable",
		function: Function,
	},
	plantAge: {
		internalName: "integrateddynamics:block_plantage",
		nicknames: ["BlockPlantage", "block_plant_age", "blockPlantAge"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "plant_age",
		interactName: "blockPlantAge",
		function: Function,
	},
	blockByName: {
		internalName: "integrateddynamics:block_blockbyname",
		nicknames: ["BlockByName", "block_by_name"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Block",
				},
			},
		symbol: "block_by_name",
		interactName: "stringBlockByName",
		function: Function,
	},
	blockProperties: {
		internalName: "integrateddynamics:block_blockproperties",
		nicknames: ["BlockProperties", "block_properties"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "block_props",
		interactName: "blockProperties",
		function: Function,
	},
	blockWithProperties: {
		internalName: "integrateddynamics:block_blockfromproperties",
		nicknames: ["BlockWithProperties", "block_with_properties"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: {
						type: "Block",
					},
				},
			},
		symbol: "block_with_props",
		interactName: "blockWithProperties",
		function: Function,
	},
	blockPossibleProperties: {
		internalName: "integrateddynamics:block_blockpossibleproperties",
		nicknames: ["BlockPossibleProperties", "block_possible_properties"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "block_all_props",
		interactName: "blockPossibleProperties",
		function: Function,
	},
	blockTag: {
		internalName: "integrateddynamics:block_tag",
		nicknames: ["BlockTag"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Block",
				},
				to: { type: "List", listType: { type: "String" } },
			},
		symbol: "block_tag_names",
		interactName: "blockTags",
		function: Function,
	},
	blockTagStacks: {
		internalName: "integrateddynamics:string_blocktag",
		nicknames: ["BlockTagStacks", "block_tag_stacks"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: { type: "List", listType: { type: "Block" } },
			},
		symbol: "block_tag_values",
		interactName: "stringBlocksByTag",
		function: Function,
	},
	size: {
		internalName: "integrateddynamics:itemstack_size",
		nicknames: ["ItemstackSize", "itemstack_size", "itemstackSize"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "size",
		interactName: "itemstackSize",
		function: Function,
	},
	maxSize: {
		internalName: "integrateddynamics:itemstack_maxsize",
		nicknames: ["ItemstackMaxsize", "itemstack_max_size", "itemstackMaxSize"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "maxsize",
		interactName: "itemstackMaxSize",
		function: Function,
	},
	isStackable: {
		internalName: "integrateddynamics:itemstack_stackable",
		nicknames: [
			"ItemstackIsstackable",
			"itemstack_is_stackable",
			"itemstackIsStackable",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "stackable",
		interactName: "itemstackIsStackable",
		function: Function,
	},
	isDamageable: {
		internalName: "integrateddynamics:itemstack_damageable",
		nicknames: [
			"ItemstackIsdamageable",
			"itemstack_is_damageable",
			"itemstackIsDamageable",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "damageable",
		interactName: "itemstackIsDamageable",
		function: Function,
	},
	damage: {
		internalName: "integrateddynamics:itemstack_damage",
		nicknames: ["ItemstackDamage", "itemstack_damage", "itemstackDamage"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "damage",
		interactName: "itemstackDamage",
		function: Function,
	},
	maxDamage: {
		internalName: "integrateddynamics:itemstack_maxdamage",
		nicknames: [
			"ItemstackMaxdamage",
			"itemstack_max_damage",
			"itemstackMaxDamage",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "max_damage",
		interactName: "itemstackMaxDamage",
		function: Function,
	},
	enchanted: {
		internalName: "integrateddynamics:itemstack_enchanted",
		nicknames: [
			"ItemstackIsenchanted",
			"itemstack_is_enchanted",
			"itemstackIsEnchanted",
			"isEnchanted",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "enchanted",
		interactName: "itemstackIsEnchanted",
		function: Function,
	},
	enchantable: {
		internalName: "integrateddynamics:itemstack_enchantable",
		nicknames: [
			"ItemstackIsenchantable",
			"itemstack_is_enchantable",
			"itemstackIsEnchantable",
			"isEnchantable",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "enchantable",
		interactName: "itemstackIsEnchantable",
		function: Function,
	},
	repairCost: {
		internalName: "integrateddynamics:itemstack_repaircost",
		nicknames: [
			"ItemstackRepaircost",
			"itemstack_repair_cost",
			"itemstackRepairCost",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "repair_cost",
		interactName: "itemstackRepairCost",
		function: Function,
	},
	rarity: {
		internalName: "integrateddynamics:itemstack_rarity",
		nicknames: ["ItemstackRarity", "itemstack_rarity", "itemstackRarity"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "String",
				},
			},
		symbol: "rarity",
		interactName: "itemstackRarity",
		function: Function,
	},
	strengthVsBlock: {
		internalName: "integrateddynamics:itemstack_strength",
		nicknames: [
			"ItemstackStrengthVsBlock",
			"itemstack_strength_vs_block",
			"itemstackStrengthVsBlock",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "Block",
					},
					to: {
						type: "Double",
					},
				},
			},
		symbol: "strength",
		interactName: "itemstackStrength",
		function: Function,
	},
	canHarvestBlock: {
		internalName: "integrateddynamics:itemstack_canharvest",
		nicknames: [
			"ItemstackCanHarvestBlock",
			"itemstack_can_harvest_block",
			"itemstackCanHarvestBlock",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "Block",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "can_harvest",
		interactName: "itemstackCanHarvest",
		function: Function,
	},
	itemBlock: {
		internalName: "integrateddynamics:itemstack_block",
		nicknames: ["ItemstackBlock", "itemstack_block", "itemstackBlock"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Block",
				},
			},
		symbol: "block",
		interactName: "itemstackBlock",
		function: Function,
	},
	isFluidstack: {
		internalName: "integrateddynamics:itemstack_isfluidstack",
		nicknames: [
			"ItemstackIsfluidstack",
			"itemstack_is_fluidstack",
			"itemstackIsFluidstack",
			"itemHasFluid",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_fluidstack",
		interactName: "itemstackIsFluidStack",
		function: Function,
	},
	itemFluid: {
		internalName: "integrateddynamics:itemstack_fluidstack",
		nicknames: [
			"ItemstackFluidstack",
			"itemstack_fluidstack",
			"itemstackFluidstack",
			"itemFluidstack",
			"item_fluidstack",
			"itemFluid",
			"item_fluid",
			"itemstack_fluid",
			"itemstackFluid",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Fluid",
				},
			},
		symbol: "fluidstack",
		interactName: "itemstackFluidStack",
		function: Function,
	},
	fluidCapacity: {
		internalName: "integrateddynamics:itemstack_fluidstackcapacity",
		nicknames: [
			"ItemstackFluidstackcapacity",
			"itemstack_fluidstack_capacity",
			"itemstackFluidstackCapacity",
			"item_fluid_capacity",
			"itemFluidCapacity",
			"item_fluidstack_capacity",
			"itemFluidstackCapacity",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "fluidstack_capacity",
		interactName: "itemstackFluidCapacity",
		function: Function,
	},
	"=NBT=": {
		internalName: "integrateddynamics:itemstack_isnbtequal",
		nicknames: [
			"ItemstackIsdataequal",
			"itemstack_is_dataequal",
			"itemstackIsDataequal",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "Item",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "=NBT=",
		interactName: "itemstackIsNbtEqual",
		function: Function,
	},
	"=NoNBT=": {
		internalName: "integrateddynamics:itemstack_isitemequalnonbt",
		nicknames: [
			"ItemstackIsitemequalnodata",
			"itemstack_is_itemequalnodata",
			"itemstackIsItemequalnodata",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "Item",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "=NoNBT=",
		interactName: "itemstackIsEqualNonNbt",
		function: Function,
	},
	rawItemEquals: {
		internalName: "integrateddynamics:itemstack_israwitemequal",
		nicknames: [
			"ItemstackIsrawitemequal",
			"itemstack_is_rawitemequal",
			"itemstackIsRawitemequal",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "Item",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "=Raw=",
		interactName: "itemstackIsEqualRaw",
		function: Function,
	},
	itemMod: {
		internalName: "integrateddynamics:itemstack_mod",
		nicknames: ["ItemstackModname", "item_mod", "itemModname"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "String",
				},
			},
		symbol: "mod",
		interactName: "itemstackMod",
		function: Function,
	},
	fuelBurnTime: {
		internalName: "integrateddynamics:itemstack_burntime",
		nicknames: [
			"ItemstackFuelburntime",
			"item_fuel_burn_time",
			"itemFuelBurnTime",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "burn_time",
		interactName: "itemstackBurnTime",
		function: Function,
	},
	isFuel: {
		internalName: "integrateddynamics:itemstack_canburn",
		nicknames: [
			"ItemstackCanburn",
			"item_can_burn",
			"itemCanBurn",
			"item_is_fuel",
			"itemIsFuel",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "can_burn",
		interactName: "itemstackCanBurn",
		function: Function,
	},
	itemTagNames: {
		internalName: "integrateddynamics:itemstack_tag",
		nicknames: [
			"ItemstackTag",
			"itemstack_tag_names",
			"itemstackTagNames",
			"item_tag_names",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: { type: "List", listType: { type: "String" } },
			},
		symbol: "item_tag_names",
		interactName: "itemstackTags",
		function: Function,
	},
	itemTagValues: {
		internalName: "integrateddynamics:string_tag",
		nicknames: [
			"ItemstackTagStacks",
			"itemstack_tag_values",
			"itemstackTagValues",
			"item_tag_values",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: { type: "List", listType: { type: "Item" } },
			},
		symbol: "item_tag_values",
		interactName: "stringItemsByTag",
		function: Function,
	},
	itemWithSize: {
		internalName: "integrateddynamics:itemstack_withsize",
		nicknames: [
			"ItemstackWithsize",
			"itemstack_with_size",
			"itemstackWithSize",
			"item_with_size",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Item",
					},
				},
			},
		symbol: "with_size",
		interactName: "itemstackWithSize",
		function: Function,
	},
	isFeContainer: {
		internalName: "integrateddynamics:itemstack_isfecontainer",
		nicknames: [
			"ItemstackIsfecontainer",
			"itemstack_is_fe_container",
			"itemstackIsFecontainer",
			"item_is_fe_container",
			"itemIsFecontainer",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_fe_container",
		interactName: "itemstackIsFeContainer",
		function: Function,
	},
	storedFe: {
		internalName: "integrateddynamics:itemstack_storedfe",
		nicknames: [
			"ItemstackStoredfe",
			"itemstack_stored_fe",
			"itemstackStoredFe",
			"item_stored_fe",
			"itemStoredFe",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "stored_fe",
		interactName: "itemstackFeStored",
		function: Function,
	},
	feCapacity: {
		internalName: "integrateddynamics:itemstack_fecapacity",
		nicknames: [
			"ItemstackFecapacity",
			"itemstack_fe_capacity",
			"itemstackFeCapacity",
			"item_fe_capacity",
			"itemFeCapacity",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "capacity_fe",
		interactName: "itemstackFeCapacity",
		function: Function,
	},
	hasInventory: {
		internalName: "integrateddynamics:itemstack_hasinventory",
		nicknames: [
			"ItemstackHasinventory",
			"itemstack_has_inventory",
			"itemstackHasInventory",
			"item_has_inventory",
			"itemHasInventory",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "has_inventory",
		interactName: "itemstackHasInventory",
		function: Function,
	},
	inventorySize: {
		internalName: "integrateddynamics:itemstack_inventorysize",
		nicknames: [
			"ItemstackInventorysize",
			"itemstack_inventory_size",
			"itemstackInventorySize",
			"item_inventory_size",
			"itemInventorySize",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "inventory_size",
		interactName: "itemstackInventorySize",
		function: Function,
	},
	itemInventory: {
		internalName: "integrateddynamics:itemstack_inventory",
		nicknames: [
			"ItemstackInventory",
			"itemstack_inventory",
			"itemstackInventory",
			"item_inventory",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: { type: "List", listType: { type: "Item" } },
			},
		symbol: "inventory",
		interactName: "itemstackInventory",
		function: Function,
	},
	itemByName: {
		internalName: "integrateddynamics:itemstack_itembyname",
		nicknames: [
			"ItemstackByName",
			"itemstack_by_name",
			"itemstackByName",
			"item_by_name",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Item",
				},
			},
		symbol: "item_by_name",
		interactName: "stringItemByName",
		function: Function,
	},
	itemListCount: {
		internalName: "integrateddynamics:itemstack_itemlistcount",
		nicknames: [
			"ItemstackListCount",
			"itemstack_list_count",
			"itemstackListCount",
			"item_list_count",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "List",
					listType: { type: "Item" },
				},
				to: {
					type: "Function",
					from: { type: "Item" },
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "item_list_count",
		interactName: "listItemListCount",
		function: Function,
	},
	itemNBT: {
		internalName: "integrateddynamics:itemstack_nbt",
		nicknames: [
			"ItemstackData",
			"itemstack_data",
			"itemstackData",
			"item_data",
			"itemData",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT()",
		interactName: "itemstackNbt",
		function: Function,
	},
	hasNBT: {
		internalName: "integrateddynamics:itemstack_hasnbt",
		nicknames: [
			"ItemstackHasdata",
			"itemstack_has_data",
			"itemstackHasData",
			"item_has_data",
			"itemHasData",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "has_nbt",
		interactName: "itemstackHasNbt",
		function: Function,
	},
	itemNBTKeys: {
		internalName: "integrateddynamics:itemstack_datakeys",
		nicknames: [
			"ItemstackDataKeys",
			"itemstack_data_keys",
			"itemstackDataKeys",
			"item_data_keys",
			"itemDataKeys",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: { type: "List", listType: { type: "String" } },
			},
		symbol: "data_keys",
		interactName: "itemstackDataKeys",
		function: Function,
	},
	itemNBTValue: {
		internalName: "integrateddynamics:itemstack_datavalue",
		nicknames: [
			"ItemstackDataValue",
			"itemstack_data_value",
			"itemstackDataValue",
			"item_data_value",
			"itemDataValue",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "NBT"
					},
				},
			},
		symbol: "data_value",
		interactName: "itemstackDataValue",
		function: Function,
	},
	itemWithNBT: {
		internalName: "integrateddynamics:itemstack_withdata",
		nicknames: [
			"ItemstackWithData",
			"itemstack_with_data",
			"itemstackWithData",
			"item_with_data",
			"itemWithData",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "NBT"
						},
						to: {
							type: "Item"
						}
					},
				},
			},
		symbol: "with_data",
		interactName: "itemstackWithData",
		function: Function,
	},
	itemTooltip: {
		internalName: "integrateddynamics:itemstack_tooltip",
		nicknames: [
			"ItemstackTooltip",
			"itemstack_tooltip",
			"itemstackTooltip",
			"item_tooltip",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Item",
				},
				to: { type: "List", listType: { type: "String" } },
			},
		symbol: "tooltip",
		interactName: "itemstackTooltip",
		function: Function,
	},
	itemEntityTooltip: {
		internalName: "integrateddynamics:entity_entityitemtooltip",
		nicknames: [
			"ItemstackEntityTooltip",
			"itemstack_entity_tooltip",
			"itemstackEntityTooltip",
			"item_entity_tooltip",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Function",
					from: {
						type: "Item",
					},
					to: { type: "List", listType: { type: "String" } },
				},
			},
		symbol: "entity_item_tooltip",
		interactName: "entityEntityItemTooltip",
		function: Function,
	},
	isMob: {
		internalName: "integrateddynamics:entity_ismob",
		nicknames: ["EntityIsmob", "entity_is_mob", "entityIsMob"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_mob",
		interactName: "entityIsMob",
		function: Function,
	},
	isAnimal: {
		internalName: "integrateddynamics:entity_isanimal",
		nicknames: ["EntityIsanimal", "entity_is_animal", "entityIsAnimal"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_animal",
		interactName: "entityIsAnimal",
		function: Function,
	},
	isItem: {
		internalName: "integrateddynamics:entity_isitem",
		nicknames: ["EntityIsitem", "entity_is_item", "entityIsItem"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_item",
		interactName: "entityIsItem",
		function: Function,
	},
	isPlayer: {
		internalName: "integrateddynamics:entity_isplayer",
		nicknames: ["EntityIsplayer", "entity_is_player", "entityIsPlayer"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_player",
		interactName: "entityIsPlayer",
		function: Function,
	},
	isMinecart: {
		internalName: "integrateddynamics:entity_isminecart",
		nicknames: ["EntityIsminecart", "entity_is_minecart", "entityIsMinecart"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_minecart",
		interactName: "entityIsMinecart",
		function: Function,
	},
	entityItem: {
		internalName: "integrateddynamics:entity_item",
		nicknames: [
			"EntityItemstack",
			"entity_itemstack",
			"entityItemstack",
			"entity_item_stack",
			"entityItemStack",
			"entity_item",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Item",
				},
			},
		symbol: "item",
		interactName: "entityItem",
		function: Function,
	},
	entityHealth: {
		internalName: "integrateddynamics:entity_health",
		nicknames: [
			"EntityHealth",
			"entity_health",
			"entity_health_value",
			"entityHealthValue",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "health",
		interactName: "entityHealth",
		function: Function,
	},
	entityWidth: {
		internalName: "integrateddynamics:entity_width",
		nicknames: ["EntityWidth", "entity_width"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "width",
		interactName: "entityWidth",
		function: Function,
	},
	entityHeight: {
		internalName: "integrateddynamics:entity_height",
		nicknames: ["EntityHeight", "entity_height"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "height",
		interactName: "entityHeight",
		function: Function,
	},
	isBurning: {
		internalName: "integrateddynamics:entity_isburning",
		nicknames: ["EntityIsburning", "entity_is_burning", "entityIsBurning"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_burning",
		interactName: "entityEntityIsBurning",
		function: Function,
	},
	isWet: {
		internalName: "integrateddynamics:entity_iswet",
		nicknames: ["EntityIswet", "entity_is_wet", "entityIsWet"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_wet",
		interactName: "entityIsWet",
		function: Function,
	},
	isCrouching: {
		internalName: "integrateddynamics:entity_iscrouching",
		nicknames: [
			"EntityIscrouching",
			"entity_is_crouching",
			"entityIsCrouching",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_crouching",
		interactName: "entityIsCrouching",
		function: Function,
	},
	isEating: {
		internalName: "integrateddynamics:entity_iseating",
		nicknames: ["EntityIseating", "entity_is_eating", "entityIsEating"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_eating",
		interactName: "entityIsEating",
		function: Function,
	},
	entityArmor: {
		internalName: "integrateddynamics:entity_armorinventory",
		nicknames: [
			"EntityArmorinventory",
			"entity_armor_inventory",
			"entityArmorInventory",
			"entity_armor",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: { type: "List", listType: { type: "Item" } },
			},
		symbol: "armor_inventory",
		interactName: "entityArmorInventory",
		function: Function,
	},
	entityInventoryContents: {
		internalName: "integrateddynamics:entity_inventory",
		nicknames: [
			"EntityInventory",
			"entity_inventory",
			"entityInventory",
			"entity_inventory_contents",
			"entityInventoryContents",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: { type: "List", listType: { type: "Item" } },
			},
		symbol: "inventory",
		interactName: "entityInventory",
		function: Function,
	},
	entityModName: {
		internalName: "integrateddynamics:entity_mod",
		nicknames: ["EntityModname", "entity_mod_name", "entityModName"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "String",
				},
			},
		symbol: "mod",
		interactName: "entityMod",
		function: Function,
	},
	playerTargetBlock: {
		internalName: "integrateddynamics:entity_targetblock",
		nicknames: ["PlayerTargetblock", "player_target_block"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Block",
				},
			},
		symbol: "target_block",
		interactName: "entityTargetBlock",
		function: Function,
	},
	playerTargetEntity: {
		internalName: "integrateddynamics:entity_targetentity",
		nicknames: ["PlayerTargetentity", "player_target_entity"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Entity",
				},
			},
		symbol: "target_entity",
		interactName: "entityTargetEntity",
		function: Function,
	},
	playerHasGuiOpen: {
		internalName: "integrateddynamics:entity_hasguiopen",
		nicknames: ["PlayerHasguiopen", "player_has_gui_open"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "has_gui_open",
		interactName: "entityHasGuiOpen",
		function: Function,
	},
	heldItemMain: {
		internalName: "integrateddynamics:entity_helditem",
		nicknames: [
			"EntityHelditemMain",
			"entity_held_item_main",
			"entityHeldItemMain",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Item",
				},
			},
		symbol: "held_item_1",
		interactName: "entityHeldItem",
		function: Function,
	},
	heldItemOff: {
		internalName: "integrateddynamics:entity_helditemoffhand",
		nicknames: [
			"EntityHelditemOff",
			"entity_held_item_off",
			"entityHeldItemOff",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Item",
				},
			},
		symbol: "held_item_2",
		interactName: "entityHeldItemOffHand",
		function: Function,
	},
	entitysMounted: {
		internalName: "integrateddynamics:entity_mounted",
		nicknames: ["EntityMounted", "entitys_mounted"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: { type: "List", listType: { type: "Entity" } },
			},
		symbol: "mounted",
		interactName: "entityMounted",
		function: Function,
	},
	itemFrameContents: {
		internalName: "integrateddynamics:entity_itemframeconte)nts",
		nicknames: [
			"ItemframeContents",
			"itemframe_contents",
			"itemframeContents",
			"item_frame_contents",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Item",
				},
			},
		symbol: "itemframe_contents",
		interactName: "entityItemFrameContents",
		function: Function,
	},
	itemFrameRotation: {
		internalName: "integrateddynamics:entity_itemframerotation",
		nicknames: [
			"ItemframeRotation",
			"itemframe_rotation",
			"itemframeRotation",
			"item_frame_rotation",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "itemframe_rotation",
		interactName: "entityItemFrameRotation",
		function: Function,
	},
	entityHurtSound: {
		internalName: "integrateddynamics:entity_hurtsound",
		nicknames: ["EntityHurtsound", "entity_hurt_sound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "String",
				},
			},
		symbol: "hurtsound",
		interactName: "entityHurtSound",
		function: Function,
	},
	entityDeathSound: {
		internalName: "integrateddynamics:entity_deathsound",
		nicknames: ["EntityDeathsound", "entity_death_sound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "String",
				},
			},
		symbol: "deathsound",
		interactName: "entityDeathSound",
		function: Function,
	},
	entityAge: {
		internalName: "integrateddynamics:entity_age",
		nicknames: ["EntityAge", "entity_age"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "age",
		interactName: "entityAge",
		function: Function,
	},
	isChild: {
		internalName: "integrateddynamics:entity_ischild",
		nicknames: ["EntityIschild", "entity_is_child", "entityIsChild"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_child",
		interactName: "entityIsChild",
		function: Function,
	},
	canBreed: {
		internalName: "integrateddynamics:entity_canbreed",
		nicknames: ["EntityCanbreed", "entity_can_breed", "entityCanBreed"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "canbreed",
		interactName: "entityCanBreed",
		function: Function,
	},
	isInLove: {
		internalName: "integrateddynamics:entity_isinlove",
		nicknames: ["EntityIsinlove", "entity_is_in_love", "entityIsInLove"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_in_love",
		interactName: "entityIsInLove",
		function: Function,
	},
	canBreedWith: {
		internalName: "integrateddynamics:entity_canbreedwith",
		nicknames: [
			"EntityCanbreedwith",
			"entity_can_breed_with",
			"entityCanBreedWith",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Function",
					from: {
						type: "Entity",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "can_breed_with",
		interactName: "entityCanBreedWith",
		function: Function,
	},
	entityIsShearable: {
		internalName: "integrateddynamics:entity_isshearable",
		nicknames: [
			"EntityIsshearable",
			"entity_is_shearable",
			"entityIsShearable",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "is_shearable",
		interactName: "entityIsShearable",
		function: Function,
	},
	entityNBT: {
		internalName: "integrateddynamics:entity_nbt",
		nicknames: ["EntityNbt", "entity_nbt"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT()",
		interactName: "entityNbt",
		function: Function,
	},
	entityType: {
		internalName: "integrateddynamics:entity_entitytype",
		nicknames: ["EntityType", "entity_type"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "String",
				},
			},
		symbol: "entity_type",
		interactName: "entityType",
		function: Function,
	},
	entityItemList: {
		internalName: "integrateddynamics:entity_entityitems",
		nicknames: [
			"EntityItems",
			"entity_items",
			"entityItems",
			"entity_item_list",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: { type: "List", listType: { type: "Item" } },
			},
		symbol: "entity_items",
		interactName: "entityItems",
		function: Function,
	},
	entityFluids: {
		internalName: "integrateddynamics:entity_entityfluids",
		nicknames: ["EntityFluids", "entity_fluids"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: { type: "List", listType: { type: "Fluid" } },
			},
		symbol: "entity_fluids",
		interactName: "entityFluids",
		function: Function,
	},
	entityEnergyStored: {
		internalName: "integrateddynamics:entity_entityenergystored",
		nicknames: ["EntityEnergyStored", "entity_energy_stored"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "entity_stored_fe",
		interactName: "entityEnergy",
		function: Function,
	},
	entityEnergyCapacity: {
		internalName: "integrateddynamics:entity_entityenergycapacity",
		nicknames: ["EntityEnergyCapacity", "entity_energy_capacity"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Entity",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "entity_capacity_fe",
		interactName: "entityEnergyCapacity",
		function: Function,
	},
	fluidAmount: {
		internalName: "integrateddynamics:fluidstack_amount",
		nicknames: [
			"FluidstackAmount",
			"fluidstackAmount",
			"fluid_stack_amount",
			"fluidStackAmount",
			"fluid_stack_amount",
			"fluid_amount",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "amount",
		interactName: "fluidstackAmount",
		function: Function,
	},
	fluidBlock: {
		internalName: "integrateddynamics:fluidstack_block",
		nicknames: [
			"FluidstackBlock",
			"fluidstackBlock",
			"fluid_stack_block",
			"fluidStackBlock",
			"fluid_stack_block",
			"fluid_block",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Block",
				},
			},
		symbol: "block",
		interactName: "fluidstackBlock",
		function: Function,
	},
	fluidLightLevel: {
		internalName: "integrateddynamics:fluidstack_light_level",
		nicknames: [
			"FluidstackLightLevel",
			"fluidstackLightLevel",
			"fluid_stack_light_level",
			"fluidStackLightLevel",
			"fluid_stack_light_level",
			"fluid_light_level",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "light_level",
		interactName: "fluidstackLightLevel",
		function: Function,
	},
	fluidDensity: {
		internalName: "integrateddynamics:fluidstack_density",
		nicknames: [
			"FluidstackDensity",
			"fluidstackDensity",
			"fluid_stack_density",
			"fluidStackDensity",
			"fluid_stack_density",
			"fluid_density",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "density",
		interactName: "fluidstackDensity",
		function: Function,
	},
	fluidTemperature: {
		internalName: "integrateddynamics:fluidstack_temperature",
		nicknames: [
			"FluidstackTemperature",
			"fluidstackTemperature",
			"fluid_stack_temperature",
			"fluidStackTemperature",
			"fluid_stack_temperature",
			"fluid_temperature",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "temperature",
		interactName: "fluidstackTemperature",
		function: Function,
	},
	fluidViscosity: {
		internalName: "integrateddynamics:fluidstack_viscosity",
		nicknames: [
			"FluidstackViscosity",
			"fluidstackViscosity",
			"fluid_stack_viscosity",
			"fluidStackViscosity",
			"fluid_stack_viscosity",
			"fluid_viscosity",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "viscosity",
		interactName: "fluidstackViscosity",
		function: Function,
	},
	isLighterThanAir: {
		internalName: "integrateddynamics:fluidstack_lighter_than_air",
		nicknames: [
			"FluidstackIsLighterThanAir",
			"fluidstackIsLighterThanAir",
			"fluid_stack_is_lighter_than_air",
			"fluidStackIsLighterThanAir",
			"fluid_stack_is_lighter_than_air",
			"fluid_is_lighter_than_air",
			"fluidIsLighterThanAir",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "lighter_than_air",
		interactName: "fluidstackIsLighterThanAir",
		function: Function,
	},
	fluidRarity: {
		internalName: "integrateddynamics:fluidstack_rarity",
		nicknames: [
			"FluidstackRarity",
			"fluidstackRarity",
			"fluid_stack_rarity",
			"fluidStackRarity",
			"fluid_stack_rarity",
			"fluid_rarity",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "String",
				},
			},
		symbol: "rarity",
		interactName: "fluidstackRarity",
		function: Function,
	},
	fluidSoundBucketEmpty: {
		internalName: "integrateddynamics:fluidstack_sound_bucket_empty",
		nicknames: [
			"FluidstackSoundBucketEmpty",
			"fluidstackSoundBucketEmpty",
			"fluid_stack_sound_bucket_empty",
			"fluidStackSoundBucketEmpty",
			"fluid_stack_sound_bucket_empty",
			"fluid_sound_bucket_empty",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "String",
				},
			},
		symbol: "sound_bucket_empty",
		interactName: "fluidstackBucketEmptySound",
		function: Function,
	},
	fluidSoundFluidVaporize: {
		internalName: "integrateddynamics:fluidstack_sound_fluid_vaporize",
		nicknames: [
			"FluidstackSoundFluidVaporize",
			"fluidstackSoundFluidVaporize",
			"fluid_stack_sound_fluid_vaporize",
			"fluidStackSoundFluidVaporize",
			"fluid_stack_sound_fluid_vaporize",
			"fluid_sound_fluid_vaporize",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "String",
				},
			},
		symbol: "sound_fluid_vaporize",
		interactName: "fluidstackFluidVaporizeSound",
		function: Function,
	},
	fluidSoundBucketFill: {
		internalName: "integrateddynamics:fluidstack_sound_bucket_fill",
		nicknames: [
			"FluidstackSoundBucketFill",
			"fluidstackSoundBucketFill",
			"fluid_stack_sound_bucket_fill",
			"fluidStackSoundBucketFill",
			"fluid_stack_sound_bucket_fill",
			"fluid_sound_bucket_fill",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "String",
				},
			},
		symbol: "sound_bucket_fill",
		interactName: "fluidstackBucketFillSound",
		function: Function,
	},
	fluidBucket: {
		internalName: "integrateddynamics:fluidstack_bucket",
		nicknames: [
			"FluidstackBucket",
			"fluidstackBucket",
			"fluid_stack_bucket",
			"fluidStackBucket",
			"fluid_stack_bucket",
			"fluid_bucket",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Item",
				},
			},
		symbol: "bucket",
		interactName: "fluidstackBucket",
		function: Function,
	},
	rawFluidEquals: {
		internalName: "integrateddynamics:fluidstack_israwfluidequal",
		nicknames: [
			"FluidstackIsrawfluidequal",
			"fluidstackIsrawfluidequal",
			"fluid_stack_israwfluidequal",
			"fluidStackIsrawfluidequal",
			"fluid_stack_israwfluidequal",
			"fluid_israwfluidequal",
			"isRawFluidEqual",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Function",
					from: {
						type: "Fluid",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "=Raw=",
		interactName: "fluidstackIsRawEqual",
		function: Function,
	},
	fluidModName: {
		internalName: "integrateddynamics:fluidstack_mod",
		nicknames: [
			"FluidstackModname",
			"fluidstackModname",
			"fluid_stack_modname",
			"fluidStackModname",
			"fluid_stack_modname",
			"fluid_mod_name",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "String",
				},
			},
		symbol: "mod",
		interactName: "fluidstackMod",
		function: Function,
	},
	fluidNBT: {
		internalName: "integrateddynamics:fluidstack_nbt",
		nicknames: [
			"FluidstackData",
			"fluidstackData",
			"fluid_stack_data",
			"fluidStackData",
			"fluid_stack_data",
			"fluid_data",
			"fluidData",
			"fluid_NBT",
			"fluidStackNBT",
			"fluid_stack_NBT",
			"fluidstack_NBT",
			"fluidstackNBT",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT()",
		interactName: "fluidstackNbt",
		function: Function,
	},
	fluidWithAmount: {
		internalName: "integrateddynamics:fluidstack_with_amount",
		nicknames: [
			"FluidstackWithAmount",
			"fluidstackWithAmount",
			"fluid_stack_with_amount",
			"fluidStackWithAmount",
			"fluid_stack_with_amount",
			"fluid_with_amount",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Fluid",
					},
				},
			},
		symbol: "with_amount",
		interactName: "fluidstackWithAmount",
		function: Function,
	},
	fluidNBTKeys: {
		internalName: "integrateddynamics:fluidstack_datakeys",
		nicknames: [
			"FluidstackDataKeys",
			"fluidstackDataKeys",
			"fluid_stack_data_keys",
			"fluidStackDataKeys",
			"fluid_stack_data_keys",
			"fluid_data_keys",
			"fluidDataKeys",
			"fluid_NBT_keys",
			"fluidStackNBTKeys",
			"fluid_stack_NBT_keys",
			"fluidstack_NBT_keys",
			"fluidstackNBTKeys",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: { type: "List", listType: { type: "String" } },
			},
		symbol: "data_keys",
		interactName: "fluidstackDataKeys",
		function: Function,
	},
	fluidNBTValue: {
		internalName: "integrateddynamics:fluidstack_datavalue",
		nicknames: [
			"FluidstackDataValue",
			"fluidstackDataValue",
			"fluid_stack_data_value",
			"fluidStackDataValue",
			"fluid_stack_data_value",
			"fluid_data_value",
			"fluidDataValue",
			"fluid_NBT_value",
			"fluidStackNBTValue",
			"fluid_stack_NBT_value",
			"fluidstack_NBT_value",
			"fluidstackNBTValue",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "data_value",
		interactName: "fluidstackDataValue",
		function: Function,
	},
	fluidWithNBT: {
		internalName: "integrateddynamics:itemstack_withdata",
		nicknames: [
			"FluidstackWithData",
			"fluidstackWithData",
			"fluid_stack_with_data",
			"fluidStackWithData",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: {
					type: "Function",
					from: {
						type: "String"
					},
					to: {
						type: "Function",
						from: {
							type: "NBT",
						},
						to: {
							type: "Fluid",
						},
					},
				},
			},
		symbol: "with_data",
		interactName: "fluidstackWithData",
		function: Function,
	},
	fluidTag: {
		internalName: "integrateddynamics:fluidstack_tag",
		nicknames: [
			"FluidstackTag",
			"fluidstackTag",
			"fluidstackTagStacks",
			"fluidstackTagStack",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Fluid",
				},
				to: { type: "List", listType: { type: "String" } },
			},
		symbol: "fluid_tag_names",
		interactName: "fluidstackTags",
		function: Function,
	},
	fluidTagStacks: {
		internalName: "integrateddynamics:string_fluidtag",
		nicknames: [
			"FluidstackTagStacks",
			"fluidStackTagStacks",
			"fluid_stack_tag_stacks",
		],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: { type: "List", listType: { type: "Fluid" } },
			},
		symbol: "fluid_tag_values",
		interactName: "stringFluidsByTag",
		function: Function,
	},
	apply: {
		internalName: "integrateddynamics:operator_apply",
		nicknames: ["operatorApply"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: { type: "Any", typeID: 2 },
				},
				to: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: { type: "Any", typeID: 2 },
				},
			},
		symbol: "apply",
		interactName: "operatorApply",
		serializer: "integrateddynamics:curry",
		function: Function,
	},
	apply2: {
		internalName: "integrateddynamics:operator_apply2",
		nicknames: ["operatorApply_2"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Function",
						from: { type: "Any", typeID: 2 },
						to: { type: "Any", typeID: 3 },
					},
				},
				to: {
					type: "Function",
					from: {
						type: "Any",
						typeID: 1
					},
					to: {
						type: "Function",
						from: {
							type: "Any",
							typeID: 2
						},
						to: {
							type: "Any",
							typeID: 3
						},
					},
				},
			},
		symbol: "apply2",
		interactName: "operatorApply2",
		serializer: "integrateddynamics:curry",
		function: Function,
	},
	apply3: {
		internalName: "integrateddynamics:operator_apply3",
		nicknames: ["operatorApply_3"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Function",
						from: { type: "Any", typeID: 2 },
						to: {
							type: "Function",
							from: { type: "Any", typeID: 3 },
							to: { type: "Any", typeID: 4 },
						},
					},
				},
				to: {
					type: "Function",
					from: {
						type: "Any",
						typeID: 1
					},
					to: {
						type: "Function",
						from: {
							type: "Any",
							typeID: 2
						},
						to: {
							type: "Function",
							from: {
								type: "Any",
								typeID: 3
							},
							to: {
								type: "Any",
								typeID: 4
							},
						},
					},
				},
			},
		symbol: "apply3",
		interactName: "operatorApply3",
		serializer: "integrateddynamics:curry",
		function: Function,
	},
	applyn: {
		internalName: "integrateddynamics:operator_apply_n",
		nicknames: ["operatorApplyN"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: { type: "Any", typeID: 2 },
				},
				to: {
					type: "Function",
					from: {
						type: "List",
						listType: {
							type: "Any",
							typeID: 1
						}
					},
					to: { type: "Any", typeID: 3 },
				},
			},
		symbol: "apply_n",
		interactName: "operatorApply_n",
		serializer: "integrateddynamics:curry",
		function: Function,
	},
	apply0: {
		internalName: "integrateddynamics:operator_apply0",
		nicknames: ["operatorApply_0"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Any",
					typeID: 1,
				},
				to: { type: "Any", typeID: 1 },
			},
		symbol: "apply0",
		interactName: "operatorApply0",
		serializer: "integrateddynamics:curry",
		function: Function,
	},
	map: {
		internalName: "integrateddynamics:operator_map",
		nicknames: ["operatorMap"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: { type: "Any", typeID: 2 },
				},
				to: {
					type: "Function",
					from: {
						type: "List",
						listType: { type: "Any", typeID: 1}
					},
					to: {
						type: "List",
						listType: { type: "Any", typeID: 2}
					},
				},
			},
		symbol: "map",
		interactName: "operatorMap",
		function: Function,
	},
	filter: {
		internalName: "integrateddynamics:operator_filter",
		nicknames: ["operatorFilter"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
				to: {
					type: "Function",
					from: {
						type: "List",
						listType: {
							type: "Any",
							typeID: 1
						}
					},
					to: {
						type: "List",
						listType: {
							type: "Any",
							typeID: 1
						}
					},
				},
			},
		symbol: "filter",
		interactName: "operatorFilter",
		function: Function,
	},
	conjunction: {
		internalName: "integrateddynamics:operator_conjunction",
		nicknames: ["operatorConjunction"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Boolean",
						},
					},
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Boolean",
						},
					},
				},
			},
		symbol: ".&&.",
		interactName: "operatorConjunction",
		function: Function,
	},
	disjunction: {
		internalName: "integrateddynamics:operator_disjunction",
		nicknames: ["operatorDisjunction"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Boolean",
						},
					},
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: {
							type: "Boolean",
						},
					},
				},
			},
		symbol: ".||.",
		interactName: "operatorDisjunction",
		function: Function,
	},
	negation: {
		internalName: "integrateddynamics:operator_negation",
		nicknames: ["operatorNegation"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
				to: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "!.",
		interactName: "operatorNegation",
		function: Function,
	},
	pipe: {
		internalName: "integrateddynamics:operator_pipe",
		nicknames: ["operatorPipe"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: { type: "Any", typeID: 2 },
				},
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 2 },
						to: { type: "Any", typeID: 3 },
					},
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: { type: "Any", typeID: 3 },
					},
				},
			},
		symbol: ".",
		interactName: "operatorPipe",
		serializer: "integrateddynamics:combined.pipe",
		function: Function,
	},
	"pipe.2": {
		internalName: "integrateddynamics:operator_pipe2",
		nicknames: ["operatorPipe2", "pipe2"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: { type: "Any", typeID: 2 },
				},
				to: {
					type: "Function",
					from: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: { type: "Any", typeID: 3 },
					},
					to: {
						type: "Function",
						from: {
							type: "Function",
							from: { type: "Any", typeID: 2 },
							to: {
								type: "Function",
								from: { type: "Any", typeID: 3 },
								to: { type: "Any", typeID: 4 },
							},
						},
						to: {
							type: "Function",
							from: { type: "Any", typeID: 1 },
							to: { type: "Any", typeID: 4 },
						},
					},
				},
			},
		symbol: ".2",
		interactName: "operatorPipe2",
		serializer: "integrateddynamics:combined.pipe",
		function: Function,
	},
	flip: {
		internalName: "integrateddynamics:operator_flip",
		nicknames: ["operatorFlip"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Function",
						from: { type: "Any", typeID: 2 },
						to: { type: "Any", typeID: 3 },
					},
				},
				to: {
					type: "Function",
					from: { type: "Any", typeID: 2 },
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: { type: "Any", typeID: 3 },
					},
				},
			},
		symbol: "flip",
		interactName: "operatorFlip",
		serializer: "integrateddynamics:combined.flip",
		function: Function,
	},
	reduce: {
		internalName: "integrateddynamics:operator_reduce",
		nicknames: ["operatorReduce"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: { type: "Any", typeID: 1 },
					},
				},
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Any", typeID: 1 } },
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: { type: "Any", typeID: 1 },
					},
				},
			},
		symbol: "reduce",
		interactName: "operatorReduce",
		function: Function,
	},
	reduce1: {
		internalName: "integrateddynamics:operator_reduce1",
		nicknames: ["operatorReduce1"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: {
						type: "Function",
						from: { type: "Any", typeID: 1 },
						to: { type: "Any", typeID: 1 },
					},
				},
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Any", typeID: 1 } },
					to: { type: "Any", typeID: 1 },
				},
			},
		symbol: "reduce1",
		interactName: "operatorReduce1",
		function: Function,
	},
	opByName: {
		internalName: "integrateddynamics:operator_by_name",
		nicknames: ["operatorByName"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: { type: "Any", typeID: 1 },
					to: { type: "Any", typeID: 2 },
				},
			},
		symbol: "op_by_name",
		interactName: "stringOperatorByName",
		function: Function,
	},
	NBTSize: {
		internalName: "integrateddynamics:nbt_compound_size",
		nicknames: ["nbtCompoundSize"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "NBT{}.size",
		interactName: "nbtSize",
		function: Function,
	},
	NBTKeys: {
		internalName: "integrateddynamics:nbt_compound_keys",
		nicknames: ["nbtCompoundKeys"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: { type: "List", listType: { type: "String" } },
			},
		symbol: "NBT{}.keys",
		interactName: "nbtKeys",
		function: Function,
	},
	NBTHasKey: {
		internalName: "integrateddynamics:nbt_compound_haskey",
		nicknames: ["nbtCompoundHaskey"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "NBT{}.has_key",
		interactName: "nbtHasKey",
		function: Function,
	},
	NBTValueType: {
		internalName: "integrateddynamics:nbt_compound_type",
		nicknames: ["nbtCompoundValueType"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "String",
					},
				},
			},
		symbol: "NBT{}.type",
		interactName: "nbtType",
		function: Function,
	},
	compoundValueAny: {
		internalName: "integrateddynamics:nbt_compound_value_tag",
		nicknames: ["nbtCompoundValueTag"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "NBT{}.get_tag",
		interactName: "nbtGetTag",
		function: Function,
	},
	compoundValueBoolean: {
		internalName: "integrateddynamics:nbt_compound_value_boolean",
		nicknames: ["nbtCompoundValueBoolean"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "NBT{}.get_boolean",
		interactName: "nbtGetBoolean",
		function: Function,
	},
	compoundValueInteger: {
		internalName: "integrateddynamics:nbt_compound_value_integer",
		nicknames: ["nbtCompoundValueInteger"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Integer",
					},
				},
			},
		symbol: "NBT{}.get_integer",
		interactName: "nbtGetInteger",
		function: Function,
	},
	compoundValueLong: {
		internalName: "integrateddynamics:nbt_compound_value_long",
		nicknames: ["nbtCompoundValueLong"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Long",
					},
				},
			},
		symbol: "NBT{}.get_long",
		interactName: "nbtGetLong",
		function: Function,
	},
	compoundValueDouble: {
		internalName: "integrateddynamics:nbt_compound_value_double",
		nicknames: ["nbtCompoundValueDouble"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Double",
					},
				},
			},
		symbol: "NBT{}.get_double",
		interactName: "nbtGetDouble",
		function: Function,
	},
	compoundValueString: {
		internalName: "integrateddynamics:nbt_compound_value_string",
		nicknames: ["nbtCompoundValueString"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "String",
					},
				},
			},
		symbol: "NBT{}.get_string",
		interactName: "nbtGetString",
		function: Function,
	},
	compoundValueNBT: {
		internalName: "integrateddynamics:nbt_compound_value_compound",
		nicknames: ["nbtCompoundValueCompound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "NBT{}.get_compound",
		interactName: "nbtGetCompound",
		function: Function,
	},
	compoundValueListNBT: {
		internalName: "integrateddynamics:nbt_compound_value_list_tag",
		nicknames: ["nbtCompoundValueListTag", "nbtCompoundValueList"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: { type: "List", listType: { type: "NBT" } },
				},
			},
		symbol: "NBT{}.get_list_tag",
		interactName: "nbtGetListTag",
		function: Function,
	},
	compoundValueListByte: {
		internalName: "integrateddynamics:nbt_compound_value_list_byte",
		nicknames: ["nbtCompoundValueListByte"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: { type: "List", listType: { type: "Integer" } },
				},
			},
		symbol: "NBT{}.get_list_byte",
		interactName: "nbtGetListByte",
		function: Function,
	},
	compoundValueListInteger: {
		internalName: "integrateddynamics:nbt_compound_value_list_int",
		nicknames: ["nbtCompoundValueListInt"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: { type: "List", listType: { type: "Integer" } },
				},
			},
		symbol: "NBT{}.get_list_int",
		interactName: "nbtGetListInt",
		function: Function,
	},
	compoundValueListLong: {
		internalName: "integrateddynamics:nbt_compound_value_list_long",
		nicknames: ["nbtCompoundValueListLong"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: { type: "List", listType: { type: "Long" } },
				},
			},
		symbol: "NBT{}.get_list_long",
		interactName: "nbtGetListLong",
		function: Function,
	},
	NBTWithout: {
		internalName: "integrateddynamics:nbt_compound_without",
		nicknames: ["nbtCompoundWithout"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "NBT{}.without",
		interactName: "nbtWithout",
		function: Function,
	},
	NBTWithBoolean: {
		internalName: "integrateddynamics:nbt_compound_with_boolean",
		nicknames: ["nbtCompoundWithBoolean"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "Boolean",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_boolean",
		interactName: "nbtWithBoolean",
		function: Function
	},
	NBTWithShort: {
		internalName: "integrateddynamics:nbt_compound_with_short",
		nicknames: ["nbtCompoundWithShort"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "Integer",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_short",
		interactName: "nbtWithShort",
		function: Function
	},
	NBTWithInteger: {
		internalName: "integrateddynamics:nbt_compound_with_integer",
		nicknames: ["nbtCompoundWithInteger"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "Integer",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_integer",
		interactName: "nbtWithInteger",
		function: Function
	},
	NBTWithLong: {
		internalName: "integrateddynamics:nbt_compound_with_long",
		nicknames: ["nbtCompoundWithLong"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "Long",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_long",
		interactName: "nbtWithLong",
		function: Function
	},
	NBTWithDouble: {
		internalName: "integrateddynamics:nbt_compound_with_double",
		nicknames: ["nbtCompoundWithDouble"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "Double",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_double",
		interactName: "nbtWithDouble",
		function: Function
	},
	NBTWithFloat: {
		internalName: "integrateddynamics:nbt_compound_with_float",
		nicknames: ["nbtCompoundWithFloat"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "Double",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_float",
		interactName: "nbtWithFloat",
		function: Function
	},
	NBTWithString: {
		internalName: "integrateddynamics:nbt_compound_with_string",
		nicknames: ["nbtCompoundWithString"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "String",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_string",
		interactName: "nbtWithString",
		function: Function
	},
	NBTWithNBT: {
		internalName: "integrateddynamics:nbt_compound_with_tag",
		nicknames: ["nbtCompoundWithCompound"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: {
							type: "NBT",
						},
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_tag",
		interactName: "nbtWithTag",
		function: Function
	},
	NBTWithNBTList: {
		internalName: "integrateddynamics:nbt_compound_with_list_tag",
		nicknames: ["nbtCompoundWithListTag"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: { type: "List", listType: { type: "NBT" } },
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_tag_list",
		interactName: "nbtWithTagList",
		function: Function
	},
	NBTWithByteList: {
		internalName: "integrateddynamics:nbt_compound_with_list_byte",
		nicknames: ["nbtCompoundWithListByte"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: { type: "List", listType: { type: "Integer" } },
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_byte_list",
		interactName: "nbtWithByteList",
		function: Function
	},
	NBTWithIntegerList: {
		internalName: "integrateddynamics:nbt_compound_with_list_int",
		nicknames: ["nbtCompoundWithListInt"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: { type: "List", listType: { type: "Integer" } },
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_int_list",
		interactName: "nbtWithIntList",
		function: Function
	},
	NBTWithLongList: {
		internalName: "integrateddynamics:nbt_compound_with_list_long",
		nicknames: ["nbtCompoundWithListLong"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "String",
					},
					to: {
						type: "Function",
						from: { type: "List", listType: { type: "Long" } },
						to: {
							type: "NBT",
						},
					},
				},
			},
		symbol: "NBT{}.with_list_long",
		interactName: "nbtWithListLong",
		function: Function
	},
	NBTSubset: {
		internalName: "integrateddynamics:nbt_compound_subset",
		nicknames: ["nbtCompoundSubset"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "NBT{}.⊆",
		interactName: "nbtIsSubset",
		function: Function
	},
	NBTUnion: {
		internalName: "integrateddynamics:nbt_compound_union",
		nicknames: ["nbtCompoundUnion"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "NBT{}.∪",
		interactName: "nbtUnion",
		function: Function
	},
	NBTIntersection: {
		internalName: "integrateddynamics:nbt_compound_intersection",
		nicknames: ["nbtCompoundIntersection"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "NBT{}.∩",
		interactName: "nbtIntersection",
		function: Function
	},
	NBTMinus: {
		internalName: "integrateddynamics:nbt_compound_minus",
		nicknames: ["nbtCompoundMinus"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "NBT{}.∖",
		interactName: "nbtMinus",
		function: Function
	},
	nbtAsBoolean: {
		internalName: "integrateddynamics:nbt_as_boolean",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "NBT.as_boolean",
		interactName: "nbtAsBoolean",
		function: Function
	},
	nbtAsByte: {
		internalName: "integrateddynamics:nbt_as_byte",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "NBT.as_byte",
		interactName: "nbtAsByte",
		function: Function
	},
	nbtAsShort: {
		internalName: "integrateddynamics:nbt_as_short",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "NBT.as_short",
		interactName: "nbtAsShort",
		function: Function
	},
	nbtAsInt: {
		internalName: "integrateddynamics:nbt_as_int",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "NBT.as_int",
		interactName: "nbtAsInt",
		function: Function
	},
	nbtAsLong: {
		internalName: "integrateddynamics:nbt_as_long",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Long",
				},
			},
		symbol: "NBT.as_long",
		interactName: "nbtAsLong",
		function: Function
	},
	nbtAsDouble: {
		internalName: "integrateddynamics:nbt_as_double",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "NBT.as_double",
		interactName: "nbtAsDouble",
		function: Function
	},
	nbtAsFloat: {
		internalName: "integrateddynamics:nbt_as_float",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "NBT.as_float",
		interactName: "nbtAsFloat",
		function: Function
	},
	nbtAsString: {
		internalName: "integrateddynamics:nbt_as_string",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: {
					type: "String",
				},
			},
		symbol: "NBT.as_string",
		interactName: "nbtAsString",
		function: Function
	},
	nbtAsTagList: {
		internalName: "integrateddynamics:nbt_as_tag_list",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: { type: "List", listType: { type: "NBT" } },
			},
		symbol: "NBT.as_tag_list",
		interactName: "nbtAsTagList",
		function: Function
	},
	nbtAsByteList: {
		internalName: "integrateddynamics:nbt_as_byte_list",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "NBT",
				},
				to: { type: "List", listType: { type: "Integer" } },
			},
		symbol: "NBT.as_byte_list",
		interactName: "nbtAsByteList",
		function: Function
	},
	nbtAsIntList: {
		internalName: "integrateddynamics:nbt_as_int_list",
		nicknames: [],
		parsedSignature: {
			type: "Function",
			from: {
				type: "NBT",
			},
			to: { type: "List", listType: { type: "Integer" } },
		},
		symbol: "NBT.as_int_list",
		interactName: "nbtAsIntList",
		function: Function
	},
	nbtAsLongList: {
		internalName: "integrateddynamics:nbt_as_long_list",
		nicknames: [],
		parsedSignature:{
			type: "Function",
			from: {
				type: "NBT",
			},
			to: { type: "List", listType: { type: "Long" } },
		},
		symbol: "NBT.as_long_list",
		interactName: "nbtAsLongList",
		function: Function
	},
	nbtFromBoolean: {
		internalName: "integrateddynamics:nbt_from_boolean",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Boolean",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_boolean",
		interactName: "booleanAsNbt",
		function: Function
	},
	nbtFromShort: {
		internalName: "integrateddynamics:nbt_from_short",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_short",
		interactName: "shortAsNbt",
		function: Function
	},
	nbtFromByte: {
		internalName: "integrateddynamics:nbt_from_byte",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_byte",
		interactName: "byteAsNbt",
		function: Function
	},
	nbtFromInt: {
		internalName: "integrateddynamics:nbt_from_int",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_int",
		interactName: "integerAsNbt",
		function: Function
	},
	nbtFromLong: {
		internalName: "integrateddynamics:nbt_from_long",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Long",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_long",
		interactName: "longAsNbt",
		function: Function
	},
	nbtFromDouble: {
		internalName: "integrateddynamics:nbt_from_double",
		nicknames: [],
		parsedSignature: {
			type: "Function",
			from: {
				type: "Double",
			},
			to: {
				type: "NBT",
			},
		},
		symbol: "NBT.from_double",
		interactName: "doubleAsNbt",
		function: Function
	},
	nbtFromFloat: {
		internalName: "integrateddynamics:nbt_from_float",
		nicknames: [],
		parsedSignature: {
			type: "Function",
			from: {
				type: "Double",
			},
			to: {
				type: "NBT",
			},
		},
		symbol: "NBT.from_float",
		interactName: "floatAsNbt",
		function: Function
	},
	nbtFromString: {
		internalName: "integrateddynamics:nbt_from_string",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_string",
		interactName: "stringAsNbt",
		function: Function
	},
	nbtFromTagList: {
		internalName: "integrateddynamics:nbt_from_tag_list",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "NBT" } },
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_tag_list",
		interactName: "tagListAsNbt",
		function: Function
	},
	nbtFromByteList: {
		internalName: "integrateddynamics:nbt_from_byte_list",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Integer" } },
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_byte_list",
		interactName: "byteListAsNbt",
		function: Function
	},
	nbtFromIntList: {
		internalName: "integrateddynamics:nbt_from_int_list",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Integer" } },
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_int_list",
		interactName: "intListAsNbt",
		function: Function
	},
	nbtFromLongList: {
		internalName: "integrateddynamics:nbt_from_long_list",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: { type: "List", listType: { type: "Long" } },
				to: {
					type: "NBT",
				},
			},
		symbol: "NBT.from_long_list",
		interactName: "longListAsNbt",
		function: Function
	},
	nbtPathMatchFirst: {
		internalName: "integrateddynamics:nbt_path_match_first",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: {
						type: "NBT",
					},
				},
			},
		symbol: "NBT.path_match_first",
		interactName: "stringNbtPathMatchFirst",
		function: Function
	},
	nbtPathMatchAll: {
		internalName: "integrateddynamics:nbt_path_match_all",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: { type: "List", listType: { type: "NBT" } },
				},
			},
		symbol: "NBT.path_match_all",
		interactName: "stringNbtPathMatchAll",
		function: Function
	},
	NBTPathTest: {
		internalName: "integrateddynamics:nbt_path_test",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Function",
					from: {
						type: "NBT",
					},
					to: {
						type: "Boolean",
					},
				},
			},
		symbol: "NBT.path_test",
		interactName: "stringNbtPathTest",
		function: Function
	},
	ingredientsItems: {
		internalName: "integrateddynamics:ingredients_items",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: { type: "List", listType: { type: "Item" } },
			},
		symbol: "Ingr.items",
		interactName: "ingredientsItems",
		function: Function
	},
	ingredientsFluids: {
		internalName: "integrateddynamics:ingredients_fluids",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: { type: "List", listType: { type: "Fluid" } },
			},
		symbol: "Ingr.fluids",
		interactName: "ingredientsFluids",
		function: Function
	},
	ingredientsEnergies: {
		internalName: "integrateddynamics:ingredients_energies",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: { type: "List", listType: { type: "Long" } },
			},
		symbol: "Ingr.energies",
		interactName: "ingredientsEnergies",
		function: Function
	},
	ingredientsWithItem: {
		internalName: "integrateddynamics:ingredients_with_item",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: {
							type: "Item",
						},
						to: {
							type: "Ingredients",
						},
					},
				},
			},
		symbol: "Ingr.with_item",
		interactName: "ingredientsWithItem",
		function: Function
	},
	ingredientsWithFluid: {
		internalName: "integrateddynamics:ingredients_with_fluid",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: {
							type: "Fluid",
						},
						to: {
							type: "Ingredients",
						},
					},
				},
			},
		symbol: "Ingr.with_fluid",
		interactName: "ingredientsWithFluid",
		function: Function
	},
	ingredientsWithEnergy: {
		internalName: "integrateddynamics:ingredients_with_energy",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: {
					type: "Function",
					from: {
						type: "Integer",
					},
					to: {
						type: "Function",
						from: {
							type: "Long",
						},
						to: {
							type: "Ingredients",
						},
					},
				},
			},
		symbol: "Ingr.with_energy",
		interactName: "ingredientsWithEnergy",
		function: Function
	},
	ingredientsWithItems: {
		internalName: "integrateddynamics:ingredients_with_items",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Item" } },
					to: {
						type: "Ingredients",
					},
				},
			},
		symbol: "Ingr.with_items",
		interactName: "ingredientsWithItems",
		function: Function
	},
	ingredientsWithFluids: {
		internalName: "integrateddynamics:ingredients_with_fluids",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Fluid" } },
					to: {
						type: "Ingredients",
					},
				},
			},
		symbol: "Ingr.with_fluids",
		interactName: "ingredientsWithFluids",
		function: Function
	},
	ingredientsWithEnergies: {
		internalName: "integrateddynamics:ingredients_with_energies",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: {
					type: "Function",
					from: { type: "List", listType: { type: "Long" } },
					to: {
						type: "Ingredients",
					},
				},
			},
		symbol: "Ingr.with_energies",
		interactName: "ingredientsWithEnergies",
		function: Function
	},
	recipeInput: {
		internalName: "integrateddynamics:recipe_input",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Recipe",
				},
				to: {
					type: "Ingredients",
				},
			},
		symbol: "recipe_in",
		interactName: "recipeInput",
		function: Function
	},
	recipeOutput: {
		internalName: "integrateddynamics:recipe_output",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Recipe",
				},
				to: {
					type: "Ingredients",
				},
			},
		symbol: "recipe_out",
		interactName: "recipeOutput",
		function: Function
	},
	recipeWithInput: {
		internalName: "integrateddynamics:recipe_with_input",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Recipe",
				},
				to: {
					type: "Function",
					from: {
						type: "Ingredients",
					},
					to: {
						type: "Recipe",
					},
				},
			},
		symbol: "Recipe.with_in",
		interactName: "recipeWithInput",
		function: Function
	},
	recipeWithOutput: {
		internalName: "integrateddynamics:recipe_with_output",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Recipe",
				},
				to: {
					type: "Function",
					from: {
						type: "Ingredients",
					},
					to: {
						type: "Recipe",
					},
				},
			},
		symbol: "Recipe.with_out",
		interactName: "recipeWithOutput",
		function: Function
	},
	recipeWithInputOutput: {
		internalName: "integrateddynamics:recipe_with_input_output",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Ingredients",
				},
				to: {
					type: "Function",
					from: {
						type: "Ingredients",
					},
					to: {
						type: "Recipe",
					},
				},
			},
		symbol: "Recipe.with_io",
		interactName: "ingredientsWithInputOutput",
		function: Function
	},
	parseBoolean: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.boolean",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "Boolean",
				},
			},
		symbol: "parse_boolean",
		interactName: "stringParseAsBoolean",
		function: Function
	},
	parseDouble: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Any",
					typeID: 1,
				},
				to: {
					type: "Double",
				},
			},
		symbol: "parse_double",
		interactName: "stringParseAsDouble",
		function: Function
	},
	parseInteger: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Any",
					typeID: 1,
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "parse_integer",
		interactName: "stringParseAsInteger",
		function: Function
	},
	parseLong: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Any",
					typeID: 1,
				},
				to: {
					type: "Long",
				},
			},
		symbol: "parse_long",
		interactName: "stringParseAsLong",
		function: Function
	},
	parseNBT: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "String",
				},
				to: {
					type: "NBT",
				},
			},
		symbol: "parse_nbt",
		interactName: "stringParseAsNbt",
		function: Function
	},
	choice: {
		internalName: "integrateddynamics:general_choice",
		nicknames: ["generalChoice"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Boolean",
				},
				to: {
					type: "Function",
					from: {
						type: "Any",
						typeID: 1,
					},
					to: {
						type: "Function",
						from: {
							type: "Any",
							typeID: 1,
						},
						to: {
							type: "Any",
							typeID: 1,
						},
					},
				},
			},
		symbol: "?",
		interactName: "booleanChoice",
		function: Function
	},
	generalIdentity: {
		internalName: "integrateddynamics:general_identity",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Any",
					typeID: 1,
				},
				to: {
					type: "Any",
					typeID: 1,
				},
			},
		symbol: "id",
		interactName: "anyIdentity",
		function: Function
	},
	generalConstant: {
		internalName: "integrateddynamics:general_constant",
		nicknames: [],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Any",
					typeID: 1,
				},
				to: {
					type: "Function",
					from: {
						type: "Any",
						typeID: 2,
					},
					to: {
						type: "Any",
						typeID: 1,
					},
				},
			},
		symbol: "K",
		interactName: "anyConstant",
		function: Function
	},
	integerToDouble: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double",
		nicknames: ["intToDouble", "integerDouble"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "()",
		interactName: "integerIntegerToDouble",
		function: Function
	},
	integerToLong: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long",
		nicknames: ["intToLong", "integerLong"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Integer",
				},
				to: {
					type: "Long",
				},
			},
		symbol: "()",
		interactName: "integerIntegerToLong",
		function: Function
	},
	doubleToInteger: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer",
		nicknames: ["doubleToInt", "doubleInteger"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Double",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "()",
		interactName: "doubleDoubleToInteger",
		function: Function
	},
	doubleToLong: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long",
		nicknames: ["doubleToLong"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Double",
				},
				to: {
					type: "Long",
				},
			},
		symbol: "()",
		interactName: "doubleDoubleToLong",
		function: Function
	},
	longToInteger: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer",
		nicknames: ["longToInt", "longInteger"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Long",
				},
				to: {
					type: "Integer",
				},
			},
		symbol: "()",
		interactName: "longLongToInteger",
		function: Function
	},
	longToDouble: {
		internalName:
			"integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double",
		nicknames: ["longToDouble", "longDouble"],
		parsedSignature: {
				type: "Function",
				from: {
					type: "Long",
				},
				to: {
					type: "Double",
				},
			},
		symbol: "()",
		interactName: "longLongToDouble",
		function: Function
	},
};