$(function () {
    $('#scrape-articles-btn').on("click", function (event) {
        $('.articlesScrapedBody').empty();

        $.ajax("/api/all", {
            type: "GET"
        }).then(function (response) {

            let oldLength = response;
            console.log(oldLength);

            $.ajax("/api/scrape", {
                type: "POST"
            }).then(function (response) {

                $.ajax("/api/reduce", {
                    type: "DELETE"
                }).then(function (response) {
                    let newText = $("<div>");
                    let newLength = response.length;
                    console.log(newLength);
                    let numberChanged = parseInt(newLength) - parseInt(oldLength);

                    if (numberChanged == 0) {
                        newText.text("Scraper has updated!")
                        $('.articlesScrapedBody').append(newText)
                        $('#scrapedArticlesModal').modal('show');
                    }
                    else {
                        newText.text(numberChanged + "new articles")
                        $('.articlesScrapedBody').append(newText)
                        $('#scrapedArticlesModal').modal('show');
                    }
                })
            })

        })
    });

    //clear 
    $(document).on("click", "#clear-articles-btn", function(){

        event.preventDefault();
        $.ajax("/api/clear", {
            type: "GET"
        }).then(function(response){
            $('#clearArticlesModal').modal('show');
        })
    });

    //close the modal
    $(".closeModalButton").on("click", function(event){
        $.ajax("/", {
            type: "GET"
        }).then(function(){
            location.reload();
        })
    });
    //save article button
    $(".saveArticleButton").on("click", function(event){
        $.ajax("/api/save/article/"+ articleId,{
            type: "PUT"
        }).then(function(){
            $('#articleSavedModal').modal('show');
        })
    });
})