class ServiceAgent
{
    getMovie(id)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.douban.com/v2/movie/subject/" + id
            }).success(resolve)
              .fail(reject);
        });
    }

    getMovieComments(id)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://movie.douban.com/subject/" + id + "/comments"
            }).success(res => {
                const $content = $(res);
                const $article = $content.find(".article");
                $article.find("#paginator").remove();
                resolve($article);
            }).fail(reject);
        });
    }

    searchMovie(keyword, count = 1)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.douban.com/v2/movie/search",
                data: { q: keyword, count },
            }).success(result => {
                if (result.count === 1)
                {
                    const subject = result.subjects[0];
                    resolve(subject);
                }
            }).fail(() => {
                reject();
            });
        });
    }
}

const serviceAgent = new ServiceAgent();
export default serviceAgent;
