STRING_REGEX_GROUPS: {
    internalName: "integrateddynamics:string_regex_groups",
    nicknames: ["stringRegexGroups", "stringRegexGroups"],
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
    function: (regexString: string): TypeLambda<string, Array<string>> => {
      return (fullString: string): Array<string> => {
        const regex = new RE2(regexString, "u");
        const match = regex.exec(fullString);
        if (match) {
          return match as Array<string>;
        } else {
          throw new Error(
            `No match found for group in regex "${regexString}" on string "${fullString}"`
          );
        }
      };
    },
  },