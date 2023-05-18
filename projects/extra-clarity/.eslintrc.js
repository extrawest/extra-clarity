module.exports = {
  "extends": "../../.eslintrc.json",
  "ignorePatterns": [
    "!**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "./tsconfig.lib.json",
          "./tsconfig.spec.json"
        ],
        "tsconfigRootDir": __dirname,
        "createDefaultProgram": true
      },
      "rules": {
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "ec",
            "style": "kebab-case"
          }
        ]
      }
    },
    {
      "files": [
        "*.html"
      ],
      "rules": {}
    }
  ]
}
