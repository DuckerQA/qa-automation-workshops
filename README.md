✅ Next Steps

- Adjust tests to follow the AAA principle (Arrange–Act–Assert)
- Create Page Object Model (POM)
- Create Models
- Implement Faker/Factories
- Add test tags

- Add .gitignore

- Configure Prettier and ESLint

- Set up Husky (pre-commit hooks)

## TIPS

## 📁 Add `.gitignore`

Create a `.gitignore` file and include:

```bash
node_modules/
playwright-report/
test-results/
package-lock.json
```

## 🎨 Configure Prettier

### Install Prettier

Install Prettier

```bash
npm i -D prettier
```

Create .prettierignore

```bash
node_modules/
playwright-report/
test-results/
package-lock.json
```

Create .prettierrc.json

```bash
{
  "singleQuote": true,
  "endOfLine": "auto",
  "semi": true,
  "tabWidth": 2,
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": ["^@playwright/test", "^@?\\w", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

🧹 3. Configure ESLint
Initialize ESLint

```bash
npm init @eslint/config@latest
```

Recommended answers:

```bash
Use ESLint to: check syntax and find problems
Modules: JavaScript modules (import/export)
Framework: None
TypeScript: Yes
Environment: Node
Config file format: TypeScript
Install dependencies: Yes
```

Install additional ESLint packages

```bash
npm install -D eslint-plugin-playwright
npm install -D eslint-plugin-prettier eslint-config-prettier
```

ESLint config (eslint.config.ts)

```bash
import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-console': 'warn',
      'no-var': 'error',
      'playwright/no-nested-steps': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error'
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'no-console': 'warn',
      'no-var': 'error'
    }
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.spec.ts', 'tests/**/*.spec.js', 'e2e/**/*.spec.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-page-pause': 'error',
      'playwright/no-element-handle': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
);
```

Add formatting scripts to package.json

```bash
"scripts": {
  "format": "npx prettier --write .",
  "lint": "npx eslint . --max-warnings=0"
}
```

## 🧩 Create TypeScript configuration (tsconfig.json)

```bash
{
  "compilerOptions": {
    "target": "ESNext",
    "strict": true,
    "module": "CommonJS",
    "sourceMap": true,
    "esModuleInterop": true
  }
}
```

## 🔧 Prettier + ESLint compatibility

```bash
npm install -D eslint-config-prettier
npm install -D eslint-plugin-prettier
```

## 🔤 Import sorting library

```bash
npm install -D @trivago/prettier-plugin-sort-imports
```

## 🐶 Husky (pre-commit hooks)

### Install Husky

```bash
npm install husky --save-dev
```

Initialize Husky

```bash
npx husky init
echo "npm run lint" > .husky/pre-commit
```

Update .husky/pre-commit with:

```bash
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run format:check
npm run tsc:check
```
