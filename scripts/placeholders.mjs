// A bracketed phrase such as "[One line: ...]" or "[Tool name]" is draft copy. It must not ship.
export function findPlaceholders(text) {
  return text.match(/\[[A-Za-z][^\][<>"'`{}\n]*\]/g) ?? [];
}

export function visibleText(html) {
  return html
    .replace(/<(script|style|pre|code)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}
