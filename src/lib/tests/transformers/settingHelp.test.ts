import { DEFAULT_TRANSFORMER_SETTINGS } from "lib/transformers/transformerSettings";
import {
  SETTING_HELP,
  settingHelpText,
  type SettingHelpKey,
} from "lib/transformers/settingHelp";

describe("TestSettingHelp", () => {
  it("testCoversEveryTransformerSetting", () => {
    expect(Object.keys(SETTING_HELP).sort()).toEqual(
      Object.keys(DEFAULT_TRANSFORMER_SETTINGS).sort()
    );
  });

  it("testGivesEverySettingANonEmptyDescription", () => {
    for (const key of Object.keys(SETTING_HELP) as SettingHelpKey[]) {
      expect(SETTING_HELP[key].description.trim().length).toBeGreaterThan(0);
    }
  });

  it("testAppendsTheApplicabilitySentenceOnlyWhenTheSettingHasOne", () => {
    expect(settingHelpText("signatureDepth")).toContain(
      "Only applies to Expanded output."
    );
    expect(settingHelpText("initialVariableId")).not.toContain("Only applies");
    expect(settingHelpText("initialVariableId")).toBe(
      SETTING_HELP.initialVariableId.description
    );
  });
});
