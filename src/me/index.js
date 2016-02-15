import "./res/index.less";

import DetailPluginApp from "./app/detail-plugin-app";

let app = null;
if (window.location.pathname.indexOf(".html") !== -1)
{
    if (window.location.pathname.startsWith("/r_") || window.location.pathname.startsWith("/m_"))
    {
        app = new DetailPluginApp();
        app.run();
    }
}
