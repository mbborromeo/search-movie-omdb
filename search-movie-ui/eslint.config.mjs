import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      react: pluginReact
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  // {
  //   extends: [
  //     'plugin:react/recommended',
  //     'plugin:prettier/recommended'
  //   ]
  // },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  },
  {
    settings: {
      react: {
        version: 'detect' // Automatically detect the React version
      }
    }
  }
];
