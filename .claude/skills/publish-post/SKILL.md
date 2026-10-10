---
name: publish-post
description: 发布博客文章 — 为 source/_posts 下的文章补全 front matter、调用 tools/gen-descriptions.mjs 生成摘要、本地构建校验,然后提交并推送触发 CI 部署。用户说"发布文章""发博客""publish post"或给出一篇要发布的 md 时使用。
---

# 发布博客文章

目标文章:用户指定的 md 文件;未指定时用 `git status --short source/_posts` 找新增/修改的文章,多篇时先让用户确认范围。

## 步骤

1. **补全 front matter**(文件不存在则先按用户内容创建到 `source/_posts/<标题>.md`)。格式必须是:

   ```yaml
   ---
   title: 文章标题
   date: YYYY-MM-DD HH:mm:ss      # 缺失时用当前时间
   categories: 单个分类名           # 沿用已有分类,先 grep '^categories:' source/_posts/*.md 参考
   tags:
     - 标签1
     - 标签2
   ---
   ```

   - tags / categories 一律用 YAML 列表,**不要用 `a | b`**(Hexo 会把它当成一个标签)。
   - 不要加 `url:` 字段(那是旧站遗留)。
   - 已有字段不要改动;分类和标签拿不准时问用户,不要乱编。

2. **生成摘要**:文章已有 `description` 则跳过。否则运行:

   ```bash
   node tools/gen-descriptions.mjs source/_posts/<文件>.md
   ```

   - 需要环境变量 `TOKENRHYTHM_API_KEY`。没有就告诉用户,让用户用 `! TOKENRHYTHM_API_KEY=... node tools/gen-descriptions.mjs <文件>` 自己跑,或跳过摘要(首页会回退为截取正文)。**不要把 key 写进任何文件。**
   - 跑完把生成的 `description` 展示给用户看,不满意就直接改。

3. **本地校验**:`npx hexo generate`,确认无报错。随后 `git checkout -- public`,因为 `public/` 被 git 跟踪,构建会弄脏它,不能提交。

4. **提交**:只 `git add` 本次的文章文件(不要 `git add -A`)。提交信息如 `post: <标题>`,按会话里的 attribution 提示加结尾。

5. **推送前必须确认**:推送到 master 会触发 CI 并公开发布。向用户展示 `git log -1 --stat` 和目标分支,得到明确同意后再 `git push`。若当前在 worktree 分支上,先说明需要合并到 master 才会部署,不要擅自合并。

## 注意

- 推送后 CI 会跑 `hexo generate` 并部署到 `iqijun/iqijun.github.io`,通常几分钟生效。
- 摘要会把正文前 6000 字发给基元律动(tokenrhythm.studio)的接口;文章含私密内容时先告知用户。
