module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "comma-dangle": ["error", "only-multiline"],
    "curly": "off",
    "indent": "off",
    "sort-imports": [0, {
        "ignoreCase": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
    "spaced-comment": "off",
    "space-before-blocks": ["error", "never"],
    "no-tabs": "off",
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "anonymous": "never",
      "asyncArrow": "always"
    }],
    "keyword-spacing": ["error", {
      "before": false,
      "after": false,
      "overrides": {
        "return": {"after": true},
        "this": {"before": true},
        "import": {"after": true},
        "from": {"before": true, "after": true},
        "as": {"before": true, "after": true},
        "case": {"after": true}
      }
    }],
    "operator-linebreak": [2, "before", {"overrides": {"?": "after" } }],
    "object-property-newline": [0],
    "block-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "new-cap": "off",
    "padded-blocks": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
/*
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
*/
