module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:cypress/recommended',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [
    'cypress'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
