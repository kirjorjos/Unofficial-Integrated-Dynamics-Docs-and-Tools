{
  description = "Playwright Development Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    nixpkgs-pw.url = "github:nixos/nixpkgs/4bc69b57b6fcb77304813077672217c4f677232f";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, nixpkgs-pw, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        pkgs-pw = import nixpkgs-pw { inherit system; };
        playwright = pkgs-pw.playwright-driver;
        webkit = playwright.components.webkit.overrideAttrs (oldAttrs: {
          buildInputs = oldAttrs.buildInputs ++ [ pkgs-pw.libmanette ];
        });
        browserNames = [
          "chromium"
          "chromium-headless-shell"
          "firefox"
          "webkit"
          "ffmpeg"
        ];
        browsers = pkgs-pw.linkFarm "playwright-browsers" (map (name:
          let
            browser = playwright.browsersJSON.${name};
          in
          {
            name = "${builtins.replaceStrings [ "-" ] [ "_" ] name}-${browser.revision}";
            path = if name == "webkit" then webkit else playwright.components.${name};
          }
        ) browserNames);
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs
            pkgs.python3
            browsers
          ];

          shellHook = ''
            export PLAYWRIGHT_BROWSERS_PATH=${browsers}
            export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
          '';
        };
      });
}
