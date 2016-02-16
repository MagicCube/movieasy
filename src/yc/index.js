if (window.location.search.startsWith("?download="))
{
    const url = decodeURIComponent(window.location.search.substr(10));
    createDownloadTask(url);
}


function createDownloadTask(url)
{
    console.log(url);
    $(() => {
        const $siteNew = $(".task_nav .site_new");
        if ($siteNew.length === 1)
        {
            setTimeout(() => {
                $siteNew[0].click();

                setTimeout(() => {
                    const textarea = $("#pop-newtask-multi-url")[0];
                    if (textarea)
                    {
                        textarea.value = url;
                        var event = new Event("keyup");
                        textarea.dispatchEvent(event);

                        setTimeout(() => {
                            $(".btn_filetype")[0].click();
                        }, 500);
                    }
                }, 500);
            });
        }
    });
}
