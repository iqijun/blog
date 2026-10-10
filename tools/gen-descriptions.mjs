// 通过基元律动(tokenrhythm.studio)的 OpenAI 兼容接口,为缺少 description 的文章批量生成摘要,写回 front matter。
// 接口文档: https://tokenrhythm.studio/docs/api-integration
// 用法:
//   TOKENRHYTHM_API_KEY=sk_... node tools/gen-descriptions.mjs [--dry] [--limit=N] [file.md ...]
// 可选环境变量:
//   TOKENRHYTHM_MODEL     模型名,默认 qwen3.8-flash(可用模型见 GET /v1/models)
//   TOKENRHYTHM_BASE_URL  默认 https://tokenrhythm.studio/v1
//   TOKENRHYTHM_EXTRA_BODY  追加到请求体的 JSON,例如尝试关闭思考:'{"thinking":{"type":"disabled"}}'
//                           (文档未说明平台是否支持该字段,需实测)
// 不带文件参数时处理 source/_posts 下所有没有 description 的文章。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MODEL = process.env.TOKENRHYTHM_MODEL || 'qwen3.8-flash';
const BASE_URL = (process.env.TOKENRHYTHM_BASE_URL || 'https://tokenrhythm.studio/v1').replace(/\/$/, '');
const EXTRA_BODY = JSON.parse(process.env.TOKENRHYTHM_EXTRA_BODY || '{}');
const dir = 'source/_posts';
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const limit = Number((args.find(a => a.startsWith('--limit=')) || '').split('=')[1]) || Infinity;
const explicit = args.filter(a => a.endsWith('.md'));
const key = process.env.TOKENRHYTHM_API_KEY;

if (!key && !dry) {
  console.error('缺少 TOKENRHYTHM_API_KEY');
  process.exit(1);
}

const files = explicit.length
  ? explicit
  : readdirSync(dir).filter(f => f.endsWith('.md')).map(f => join(dir, f));

const clean = s => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

async function summarize(title, body) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000, // 推理模型的思考过程也计入上限,太小会导致正文为空(finish_reason=length)
      stream: false,
      ...EXTRA_BODY,
      messages: [{
        role: 'user',
        content: `为下面这篇博客写一段中文摘要:60~100 字,概括核心内容,不要以"本文"开头,不要换行,不要引号。只输出摘要本身。\n\n标题:${title}\n\n正文:\n${body.slice(0, 6000)}`
      }]
    })
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const json = await res.json();
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error(`响应里没有内容 (finish_reason=${json.choices?.[0]?.finish_reason}, usage=${JSON.stringify(json.usage)})`);
  return { desc: text.trim().replace(/\s+/g, ' '), usage: json.usage };
}

let done = 0;
for (const file of files) {
  if (done >= limit) break;
  const text = readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m || /^description:/m.test(m[1])) continue;
  const title = (m[1].match(/^title:\s*(.*)$/m) || [])[1] || file;
  const body = clean(m[2]);
  if (body.length < 30) continue;
  done++;
  if (dry) { console.log(`[dry] ${file}`); continue; }
  try {
    const { desc, usage } = await summarize(title, body);
    const fm = `${m[1]}\ndescription: ${JSON.stringify(desc)}`;
    writeFileSync(file, text.replace(m[1], () => fm));
    console.log(`ok   ${file}: ${desc}`);
    // 判断思考是否关闭:看 completion_tokens(或 completion_tokens_details.reasoning_tokens)是否远大于摘要本身长度
    console.log(`     usage: ${JSON.stringify(usage)}`);
  } catch (e) {
    console.error(`fail ${file}: ${e.message}`);
  }
}
console.log(`${dry ? '[dry] would process' : 'processed'} ${done} posts`);
