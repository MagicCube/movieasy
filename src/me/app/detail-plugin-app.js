import dm from "../../dm";

export default class DetailPluginApp extends mx.Application
{
    constructor()
    {
        super();
        this.movie = null;
    }

    getMovie()
    {
        return new Promise((resolve, reject) => {
            let q = null;
            if (window.location.pathname.startsWith("/m_"))
            {
                q = $(".cl a").text();
            }
            else if (window.location.pathname.startsWith("/r_"))
            {
                q = $("h2").text();
            }
            else
            {
                reject();
                return;
            }
            dm.service.searchMovie(q).then(subject => {
                dm.service.getMovie(subject.id).then(movie => {
                    resolve(movie);
                }, reject);
            }, reject);
        });
    }

    highlight1080p()
    {
        const $rows = $(".related table tr");
        for (let i = 1; i < $rows.length; i++)
        {
            const row = $rows[i];
            const $cell = $(row.cells[1]);
            if ($cell.text().includes("1080"))
            {
                $(row).css("backgroundColor", "rgb(255, 242, 153)");
            }
        }
    }

    run()
    {
        this.highlight1080p();
        this.getMovie().then(movie => {
            console.log(movie);
            this.movie = movie;
            this.render();
        });
    }



    render()
    {
        const $detail = $("ul.detail");

        $detail.append(`<li class="clearfix"><strong>豆瓣:</strong><div><a href="${this.movie.alt}" target="_blank" style="color:#337ab7;">查看详情</a></div></li>`);
        $detail.append(`<li class="clearfix"><strong>简介:</strong><div>${this.movie.summary}</div></li>`);
    }
}
