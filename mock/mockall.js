module.exports = {
  rules: [
    {
      pattern: /\/Maishoujie\/api\/data.do\?page=0$/,
      respondwith: 'goodsPageData.json'
    },
    {
      pattern: /\/Maishoujie\/api\/data.do\?page=1$/,
      respondwith: 'sortPageData.json'
    },
    {
      pattern: /\/Maishoujie\/api\/data.do\?page=2$/,
      respondwith: 'goodsPageDataRefresh.json'
    }
  ]
};
