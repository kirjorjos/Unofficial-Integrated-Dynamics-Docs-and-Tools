STRING_REGEX_SCAN: {
    internalName: "integrateddynamics:string_regex_scan",
    nicknames: ["stringRegexScan"],
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
    function: (regexString: string) => {
      return (groupIndex: TypeNumber): TypeLambda<string, Array<String>> => {
        return (fullString: string): Array<string> => {
          const regex = new RE2(regexString, "gu");
          let results = [];
          let match;
          regex.lastIndex = 0;

          while ((match = regex.exec(fullString)) !== null) {
            const groupValue = match[parseInt(groupIndex.toDecimal())];
            if (groupValue !== undefined && groupValue !== null) {
              results.push(groupValue);
            }
          }

          return results;
        };
      };
    },
  },