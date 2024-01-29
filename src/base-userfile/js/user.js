(($) => {
  // コンテンツデータの複製
  mtapp.duplicateContent();
  /**
   * 管理画面サイト名
   * @type {{parent: string}}
   */
  const SITE_LABEL = {
    parent: '親サイト',
  };
  /**
   * 各設定値の共通変数
   * @type {{host: string, multiFieldVersion: number, debug: boolean, URL: {local: string, develop: string, production: string}}}
   */
  const CONSTANT = {
    host: window.location.host,
    multiFieldVersion: 2,
    debug: mtappVars.debug_mode === '1',
    URL: {
      local: 'localhost',
      develop: 'dev.example.com',
      production: 'production.example.com',
    },
  };
  /**
   * 現在のサイト情報取得
   * @type {{siteScreen: string, siteId, siteName}}
   */
  const getSiteData = {
    siteId: mtappVars.blog_id,
    siteName: mtappVars.site.name,
    siteScreen: mtappVars.screen_id,
  };

})(jQuery);
