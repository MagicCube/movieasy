import "../res/index.less"

import dm from "../../dm";

export default class ListPluginApp extends mx.Application
{
    constructor()
    {
        super();
        this.$popup = null;
        this.showDelay = 500;
        this.timer = null;

        setTimeout(() => {
            this.removeAds();
        }, 500);
    }

    run()
    {
        $("a.thumbnail").attr("title", "");
        $("#main-container").on("mouseover", ".mone.prel", e => {
            if (this.timer)
            {
                window.clearTimeout(this.timer);
                this.timer = null;
            }
            const $target = $(e.currentTarget);
            const title = $(e.currentTarget).find("h5 a").text();
            this.timer = window.setTimeout(this.showMoviePopup.bind(this, title, $target), this.showDelay);
        }).on("mouseout", ".mone.prel", e => {
            this.hidePopup();
        });
    }

    initPopup()
    {
        if (!this.$popup)
        {
            this.$popup = $(`
                <div class="me-movie-popup">
                    <h1><a target="_blank"></a></h1>
                    <ul class="info">
                        <li><strong>地区:</strong> <span class="countries"></span></li>
                        <li><strong>类型:</strong> <span class="genres"></span></li>
                        <li><strong>导演:</strong> <span class="directors"></span></li>
                        <li><strong>主演:</strong> <span class="casts"></span></li>
                        <li><strong>简介:</strong> <span class="summary"></span></li>
                    </ul>
                </div>
            `);
            $(document.body).append(this.$popup);
            this.removeAds();
        }
    }

    showPopup($target)
    {
        this.initPopup();
        const pos = $target.offset();
        this.$popup.css({
            display: "block",
            left: pos.left + $target.width() + 15,
            top: pos.top
        });
    }

    hidePopup()
    {
        if (this.$popup)
        {
            this.$popup.hide();
        }
    }

    renderPopup(movie)
    {
        this.$popup.find("h1 a").text(movie.title + " (" + movie.year + ")").attr("href", movie.alt);
        this.$popup.find(".countries").text(movie.countries.join(", "));
        this.$popup.find(".genres").text(movie.genres.join(", "));
        this.$popup.find(".directors").text(movie.directors.map(people => people.name).join(", "));
        this.$popup.find(".casts").text(movie.casts.map(people => people.name).join(", "));
        this.$popup.find(".summary").text(movie.summary);
    }

    showMoviePopup(title, $target)
    {
        dm.service.searchMovie(title).then(subject => {
            dm.service.getMovie(subject.id).then(movie => {
                console.log(movie);
                this.showPopup($target);
                this.renderPopup(movie);
            }, this.hidePopup);
        }, this.hidePopup);
    }



    removeAds()
    {
        $("#tanx-popwin-outermm_43673937_12566574_48120532,#tanxssp_con_mm_43673937_12566574_48100943").remove();
    }
}
