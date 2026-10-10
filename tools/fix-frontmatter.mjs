// 将 front matter 中以 `|` 分隔的 tags / categories 转成 YAML 列表。
// 用法: node tools/fix-frontmatter.mjs [--dry]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'source/_posts';
const dry = process.argv.includes('--dry');
let changed = 0;

for (const name of readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const file = join(dir, name);
  const text = readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;
  const fm = m[1];
  const next = fm.replace(/^(tags|categories):[ \t]*(.*\|.*)$/gm, (_, key, val) => {
    const items = val.split('|').map(s => s.trim()).filter(Boolean);
    return `${key}:\n` + items.map(i => `  - ${JSON.stringify(i)}`).join('\n');
  });
  if (next === fm) continue;
  changed++;
  if (!dry) writeFileSync(file, text.replace(fm, () => next));
}
console.log(`${dry ? '[dry] ' : ''}updated ${changed} posts`);
