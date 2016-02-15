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
