/* global hexo */
// 仅 `hexo server` 生效:hexo-server 返回 .txt/.md 时不带 charset,浏览器会把中文当成其他编码显示成乱码。
hexo.extend.filter.register('server_middleware', function (app) {
  app.use((req, res, next) => {
    if (/\.(txt|md)(\?|$)/.test(req.url)) {
      const set = res.setHeader.bind(res);
      res.setHeader = (name, value) => {
        if (String(name).toLowerCase() === 'content-type' && /^text\/(plain|markdown)$/.test(String(value))) {
          value = `${value}; charset=utf-8`;
        }
        return set(name, value);
      };
    }
    next();
  });
}, 1);
