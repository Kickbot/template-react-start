//eslint-env node
module.exports = {
  root: true,
  plugins: ['import', 'react', 'jsx-a11y', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/all',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  env: {
    es6: true,
    'shared-node-browser': true,
    // node: false,
    browser: true,
    jest: false,
  },
  globals: {
    history: 'off',
    location: 'off',
  },

  settings: {
    react: { version: '16.8' },
    'import/resolver': { node: { paths: ['src'] } },
  },
  rules: {
    // links in comments easily break this rule
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-undef': 2,
    'no-console': 'warn',
    'one-var': 0,
    'react/jsx-child-element-spacing': 1,
    'react/default-props-match-prop-types': [2, { allowRequiredDefaults: true }],
    'react/destructuring-assignment': [0, { ignoreClassFields: true }],
    'react/forbid-component-props': 0,
    'react/forbid-foreign-prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-curly-newline': 1,
    'react/jsx-handler-names': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-indent': 0,
    'react/jsx-max-depth': 0,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': [2, { allowBind: false, allowFunctions: true, allowArrowFunctions: true }],
    'react/jsx-no-literals': 0,
    'react/jsx-no-target-blank': 1,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-default-props': 0,
    'react/jsx-sort-props': 0,
    'react/no-danger': 2,
    'react/no-deprecated': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-multi-comp': 0,
    'react/no-redundant-should-component-update': 2,
    'react/no-render-return-value': 2,
    'react/no-set-state': 0,
    'react/no-string-refs': 2,
    'react/no-unused-state': 1,
    'react/no-unescaped-entities': 1,
    'react/prefer-stateless-function': [1, { ignorePureComponents: true }],
    'react/prop-types': [1, { ignore: ['className', 'children'], skipUndeclared: false }],
    'react/react-in-jsx-scope': 2,
    'react/require-default-props': 0,
    'react/sort-prop-types': 1,
    'react/state-in-constructor': 0,
    'react/void-dom-elements-no-children': 2,
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'instance-variables',
          'instance-methods',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/label-has-for': [2, { allowChildren: true }],
    'jsx-a11y/no-noninteractive-tabindex': 1,
    'jsx-a11y/no-static-element-interactions': 1,

    'import/default': 2,
    'import/no-absolute-path': 2,
    'import/no-amd': 2,
    'import/no-commonjs': 2,
    'import/no-cycle': 2,
    'import/no-dynamic-require': 2,
    'import/no-named-as-default': 0,
    'import/no-nodejs-modules': 2,
    'import/no-self-import': 2,
    'import/no-relative-parent-imports': 0,
    'import/no-unassigned-import': [2, { allow: ['**/*.css'] }],
    'import/no-unresolved': 2,
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/no-webpack-loader-syntax': 2,
    'import/unambiguous': 2,

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['**/__tests__/*.js', '**/__mocks__/*.js', '**/*.test.js'],
      env: { jest: true },
    },
    {
      files: ['*.config.js'],
      env: { node: true },
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'import/no-amd': 0,
        'import/no-commonjs': 0,
        'import/no-nodejs-modules': 0,
      },
    },
  ],
}