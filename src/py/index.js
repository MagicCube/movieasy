import DetailPluginApp from "./app/detail-plugin-app";
import ListPluginApp from "./app/list-plugin-app";

const path = window.location.pathname;
let app = null;
if (path.indexOf(".html") !== -1)
{
    if (path.startsWith("/r_") || path.startsWith("/m_"))
    {
        app = new DetailPluginApp();
    }
}
else if (path.startsWith("/mv") || path.startsWith("/tv"))
{
    app = new ListPluginApp();
}

if (app)
{
    app.run();
}
