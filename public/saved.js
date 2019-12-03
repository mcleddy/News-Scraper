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

    ///notes button
    $('.notesButton').on('click', function(event){
        event.preventDefault();
        let articleId=$(this).data('id');
            $('.noteModalBody').empty();
            $('.noteModalTitle').empty();

            //update modal content
            $.ajax("/api/notes/"+articleId, {
                type: "GET"
            }).then(function(result){
                $('.noteModalTitle').append(`<h2>${result.title}</h2>`);
                $('.saveNoteButton').attr("data-id", result._id)
                console.log("ajax call:"+result);

                let newCard=$(`
                <div class="card">
                <div class="card-header">
                    ${result.note.title}
                </div>
                <div class="card-body noteCardBody">
                    <p class="card-text">${result.note.body}</p>
                    <button type="button" class="btn btn-danger deleteNoteButton" data-id="">Delete Note</button> 
                </div>
                </div>
                `);
                console.log("new card"+newCard);
                $('.noteModalBody').append(newCard);
            }).then(
                $('#noteModal').modal('show')
            )
    });
    //save a note
    $('.saveNoteButton').on("click", function(event){
        console.lof($(this));
        let articleId=$(this).data('id');
        console.log("article id" +articleId);
        $.ajax('/api/create/notes/' +articleId, {
            type:"POST",
            data:{
                title: $('#titleInput').val(),
                body: $('#bodyInput').val,
                _articleId: articleId
            }
        }).then(function(result){
            let noteAdded=$('<p class="noteAlert">Your Note is saved</p>');
            $('.alertDiv').append(noteAdded);
            $('#titleInput').val(' ');
            $('#bodyInput').val(' ');
        })
    });
});