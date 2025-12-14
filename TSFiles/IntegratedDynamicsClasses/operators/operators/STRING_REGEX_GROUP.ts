STRING_REGEX_GROUP: {
    internalName: "integrateddynamics:string_regex_group",
    nicknames: ["stringRegexGroup"],
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
    function: (regexString: string) => {
      return (groupIndex: TypeNumber) => {
        return (fullString: string) => {
          const regex = new RE2(regexString, "u");
          const match = regex.exec(fullString);
          if (match && match[parseInt(groupIndex.toDecimal())] !== undefined) {
            return match[parseInt(groupIndex.toDecimal())];
          } else {
            throw new Error(
              `No match found for group index ${groupIndex.toDecimal()} in regex "${regexString}" on string "${fullString}"`
            );
          }
        };
      };
    },
  },