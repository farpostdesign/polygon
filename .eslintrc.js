module.exports = {
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-trailing-spaces': 2,
        'keyword-spacing': 2,
        'space-before-function-paren': [
            2,
            {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        'no-inline-comments': 2,
        'no-useless-constructor': 1,
        'no-var': 1,
        'padded-blocks': 0,
        'sort-keys': 0,
        'quote-props': 0,
        'spaced-comment': [2, 'always' ],
        'vars-on-top': 2,
        'no-empty': 2,
        'no-undef': 2,
        'no-undefined': 2,
        'comma-dangle': [ 2, 'never' ],
        'quotes': [ 2, 'single' ],
        'semi': [ 2, 'always' ],
        'guard-for-in': 2,
        'no-eval': 2,
        'no-with': 2,
        'valid-typeof': 2,
        'no-unused-vars': 2,
        'no-continue': 1,
        'no-extra-semi': 1,
        'no-unreachable': 1,
        'no-unused-expressions': 1,
        'no-magic-numbers': 1,
        'react/prefer-es6-class': 1,

        // Project specific rules
        'react/react-in-jsx-scope': 0
    }
};
