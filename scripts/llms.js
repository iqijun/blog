/* global hexo */
// 构建时生成 /llms.txt(文章目录)和 /llms-full.txt(全文 Markdown),并为每篇文章输出 .md 源文件副本。
// 规范: https://llmstxt.org

const stripHtml = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function summary(post) {
  const d = post.description || post.summary;
  if (d) return String(d).replace(/\s+/g, ' ').trim();
  return stripHtml(post.content || '').slice(0, 100);
}

function sortedPosts(locals) {
  return locals.posts.sort('-date').toArray();
}

hexo.extend.generator.register('llms', function (locals) {
  const site = this.config;
  const base = site.url.replace(/\/$/, '');
  const posts = sortedPosts(locals);
  const link = p => encodeURI(`${base}/${p.path.replace(/index\.html$/, '')}`)
    .replace(/\[/g, '%5B').replace(/\]/g, '%5D');

  const index = [
    `# ${site.title}`,
    '',
    `> ${site.subtitle || site.title}。内容以编程、工具和个人理财的学习笔记为主,中文写作。`,
    '',
    '## 文章',
    '',
    ...posts.map(p => `- [${p.title}](${link(p)}): ${summary(p)}`),
    '',
    '## 其他',
    '',
    `- [全文合集](${base}/llms-full.txt): 所有文章的 Markdown 全文`,
    `- [RSS](${base}/atom.xml)`,
    `- [站点地图](${base}/sitemap.xml)`,
    ''
  ].join('\n');

  const full = [
    `# ${site.title}`,
    '',
    ...posts.map(p => [
      `## ${p.title}`,
      '',
      `- URL: ${link(p)}`,
      `- 日期: ${p.date.format('YYYY-MM-DD')}`,
      p.tags.length ? `- 标签: ${p.tags.map(t => t.name).join(', ')}` : '',
      '',
      p._content.trim(),
      '',
      '---',
      ''
    ].filter(l => l !== null).join('\n'))
  ].join('\n');

  const mdCopies = posts.map(p => ({
    path: `${p.path.replace(/index\.html$/, '').replace(/\/?$/, '/')}index.md`,
    data: () => `# ${p.title}\n\n${p._content.trim()}\n`
  }));

  return [
    { path: 'llms.txt', data: index },
    { path: 'llms-full.txt', data: full },
    ...mdCopies
  ];
});
