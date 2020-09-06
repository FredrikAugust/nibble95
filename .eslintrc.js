module.exports = {
  env: {
      browser: true,
      es2020: true,
  },
  extends: [
      'plugin:react/recommended',
      'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaFeatures: {
          jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
  },
  plugins: [
      'react',
      '@typescript-eslint',
  ],
  settings: {
      'import/resolver': {
          node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
      },
  },
  rules: {
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'import/extensions': [
          'error',
          'ignorePackages',
          {
              js: 'never',
              jsx: 'never',
              ts: 'never',
              tsx: 'never',
          },
      ],
      indent: ['error', 4, { SwitchCase: 1 }],
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
  },
};
