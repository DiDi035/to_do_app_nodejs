$(document).ready(function(){
    $('#formTodo').on('submit', function(){
        let todo = {item: $('#formTodo input').val()};
        $.ajax({
            type: 'POST',
            url: '/lisu-to-do-app',
            data: todo,
            success: function() {
                // reload the page after handling the POST request
                location.reload();
            }
        })
    })   

    $('li').on('click', function() {
        let stringItem = $(this).text();
        let item = stringItem.replace(' ', '-');
        $(this).remove();
        $.ajax({
            type: 'DELETE',
            url: '/lisu-to-do-app/' + item,
            success: function() {
                $("#formTodo input").val(stringItem);                
            }
        })
    })
})