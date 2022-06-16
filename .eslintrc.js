const config = {
  env: {
    es2021: true,
    node: true
  },
  extends: ["standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: "off",
    indent: 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'error'
  }
}

module.exports = config
