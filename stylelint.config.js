/* eslint-disable import/no-nodejs-modules, import/no-commonjs */

module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-media-use-custom-media', 'stylelint-prettier'],

  rules: {
    'prettier/prettier': true,
    'comment-empty-line-before': 'never',
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'max-empty-lines': 1,
    'selector-type-case': 'lower',
    'shorthand-property-no-redundant-values': true,
    // 'declaration-property-unit-whitelist': {
    //   '/^font/': ['rem'],
    //   'line-height': ['em', 'rem'],
    //   '/^margin/': ['rem'],
    //   '/^padding/': ['rem'],
    //   '/(min-|max-)?height/': ['rem', 'em', '%', 'fr', 'vh', 'vw'],
    //   '/(min-|max-)?width/': ['rem', 'em', '%', 'fr', 'vh', 'vw'],
    //   'border-radius': ['rem', '%', 'px'],
    //   '/^border(.*width)?$/': ['px', 'rem', 'em'],
    // },

    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,

    'csstools/media-use-custom-media': [
      'always',
      {
        importFrom: ['./src/theme.css'],
      },
    ],
  },
  ignoreFiles: ['node_modules', 'build', '*.js'],
}
