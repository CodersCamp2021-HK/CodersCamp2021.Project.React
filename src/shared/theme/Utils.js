/** @typedef {{ [x: string]: ThemeType | string }} ThemeType */

/**
 * @template T
 * @typedef {{ readonly [P in keyof T]: DeepReadonly<T[P]> }} DeepReadonly
 */

/**
 * @template {ThemeType} T
 * @param {T} theme
 * @param {string?} prefix
 * @returns {{theme: DeepReadonly<T>, variables: Readonly<Record<string, string>> }}
 */
function transformToCssVariablesThemeImpl(theme, prefix = '-') {
  const cssVarsTheme = /** @type {T} */ ({});
  const variables = /** @type {Record<string, string>} */ ({});
  for (const [key, value] of Object.entries(theme)) {
    const varName = `${prefix}-${key}`;
    if (typeof value === 'object') {
      const { theme: nestedTheme, variables: nestedVars } = transformToCssVariablesThemeImpl(value, varName);
      // @ts-ignore
      cssVarsTheme[key] = nestedTheme;
      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        variables[nestedKey] = nestedValue;
      }
    } else {
      variables[varName] = value;
      // @ts-ignore
      cssVarsTheme[key] = `var(${varName})`;
    }
  }

  return { theme: cssVarsTheme, variables };
}

/**
 * @template {ThemeType} T
 * @param {T} theme
 * @returns {{theme: DeepReadonly<T>, variables: Readonly<Record<string, string>> }}
 */
function transformToCssVariablesTheme(theme) {
  return transformToCssVariablesThemeImpl(theme);
}

export { transformToCssVariablesTheme };
