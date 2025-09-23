module.exports = {
  "*": {
    changeOrigin: true,
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['x-added'] = 'foobar';
    }
  }
};
