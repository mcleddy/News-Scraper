$(function(){
    //delete article button
    $('.deleteArticleButton').on("click"(function(event){
        event.preventDefault();
        let articleId=$(this).data('id');

        $.ajax("/api/delete/article/"+ articleId, {
            type:"PUT"
        }).then(function(){
            $('#articleDeleteModal').modal('show');
        })
    }));

    ///comments button
    $('.commentsButton').on('click', function(event){
        event.preventDefault();
        let articleId=$(this).data('id');
            $('.commentModalBody').empty();
            $('.commentModalTitle').empty();

            //update modal content
            $.ajax("/api/comments/"+articleId, {
                type: "GET"
            }).then(function(result){
                $('.commentModalTitle').append(`<h2>${result.title}</h2>`);
                $('.savecommentButton').attr("data-id", result._id)
                console.log("ajax call:"+result);

                let newCard=$(`
                <div class="card">
                <div class="card-header">
                    ${result.comment.title}
                </div>
                <div class="card-body commentCardBody">
                    <p class="card-text">${result.comment.body}</p>
                    <button type="button" class="btn btn-danger deletecommentButton" data-id="">Delete comment</button> 
                </div>
                </div>
                `);
                console.log("new card"+newCard);
                $('.commentModalBody').append(newCard);
            }).then(
                $('#commentModal').modal('show')
            )
    });
    //save a comment
    $('.savecommentButton').on("click", function(event){
        console.lof($(this));
        let articleId=$(this).data('id');
        console.log("article id" +articleId);
        $.ajax('/api/create/comments/' +articleId, {
            type:"POST",
            data:{
                title: $('#titleInput').val(),
                body: $('#bodyInput').val,
                _articleId: articleId
            }
        }).then(function(result){
            let commentAdded=$('<p class="commentAlert">Your comment is saved</p>');
            $('.alertDiv').append(commentAdded);
            $('#titleInput').val(' ');
            $('#bodyInput').val(' ');
        })
    });
});