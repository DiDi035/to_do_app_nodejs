
// handle current user
let currUser = " ";

$(document).ready(function(){
    // handle submit item request
    $('#formTodo').on('submit', function(){
        let todo = {item: $('#formTodo input').val()};
        $.ajax({
            type: 'POST',
            url: '/save-new-item',
            data: todo,
            success: function(data) {
                // reload the page after handling the POST request
                location.reload();
            }
        })
    })   

    // handle delete item request
    $('li').on('click', function() {
        let stringItem = $(this).text();
        $(this).remove();
        $.ajax({
            type: 'DELETE',
            url: '/delete-item/' + stringItem,
            success: function() {
                $("#formTodo input").val(stringItem);                
            }
        })
    })
})