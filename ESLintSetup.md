# ESLint + Prettier Setup (Flat Config, ESLint v9)

This project uses **ESLint v9** with the **flat config format** and **Prettier** for code formatting.

---

## 1️⃣ Install dependencies

```bash
npm install --save-dev eslint prettier eslint-plugin-prettier
```

---

## 2️⃣  ESLint Configuration

File: `eslint.config.mjs`

```js

import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { prettier: prettierPlugin },
    languageOptions: { globals: globals.browser },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules
    }
  }
]);
```

**Notes:**

- Uses the flat config system (eslint.config.mjs).

- ...js.configs.recommended.rules applies ESLint’s recommended rules.

- ...prettierPlugin.configs.recommended.rules applies Prettier’s rules inside ESLint.

- Runs in a browser environment.

---

### 3️⃣ Prettier Configuration

File: prettier.config.cjs

```js
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 80
};
```

---

## 4️⃣ VS Code Integration

Create .vscode/settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript"]
}
```

---

## 5️⃣ Commands

```bash
# Run ESLint:

npx eslint .

# Auto-fix problems:

npx eslint . --fix

# Format all files with Prettier:

npx prettier --write .
```

---

✅ You now have:

- ESLint to catch problems

- Prettier to auto-format code

- A clean, modern vanilla JavaScript setup


---
