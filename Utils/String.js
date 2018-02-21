export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (l, i) => i === 0 ? l.toLowerCase() : l.toUpperCase())
    .replace(/\s+/g, '');
}
