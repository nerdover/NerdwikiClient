export function toKebabCase(str: string) {
  let kebabCase = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char.toUpperCase() === char && char.toLowerCase() !== char) {
      if (i > 0) {
        kebabCase += '-';
      }
      kebabCase += char.toLowerCase();
    } else if (char === ' ' || char === '_' || char === '-') {
      kebabCase += '-';
    } else {
      kebabCase += char;
    }
  }
  return kebabCase;
}
