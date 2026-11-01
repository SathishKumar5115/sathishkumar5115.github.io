import { describe, expect, it } from 'vitest';
import { findPlaceholders, visibleText } from '../../scripts/placeholders.mjs';

describe('placeholder detection', () => {
  it('finds bracketed draft copy, including ones with a colon', () => {
    expect(findPlaceholders('A [Tool name] and [One line: the problem.] here')).toEqual(['[Tool name]', '[One line: the problem.]']);
  });
  it('ignores code-like brackets', () => {
    expect(findPlaceholders('arr[0] and ["a", "b"] and [] and [1, 2]')).toEqual([]);
  });
  it('ignores script, style and code blocks', () => {
    expect(findPlaceholders(visibleText('<script>var a=[Foo]</script><pre>[Bar]</pre><p>ok</p>'))).toEqual([]);
  });
});
