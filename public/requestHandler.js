$(document).ready(function(){

    // handle submit item request
    $('#formTodo').on('submit', function(){
        let todo = {item: $('#formTodo input').val()};
        $.ajax({
            type: 'POST',
            url: '/save-new-item',
            data: todo,
            success: function() {
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

    $('#signUpBtn').on('click', () => {
        $.ajax({
            type: 'POST',
            url: '/redirect-to-sign-up',
            success: function(newUrl) {
                if (newUrl.redirect) {
                    location.assign(newUrl.redirect);
                }
            }
        })
    })

    $('#newUserBtn').on('click', () => {
        $.ajax({
            type: 'POST',
            url: '/new-user',
            data: {
                username: $('#uname').val(),
                email: $('#mail').val(),
                password: $('#psw1').val()
            },
            success: (newUrl) => {
                if (newUrl.redirect) {
                    location.assign(newUrl.redirect);
                }
            }
        })
    })

    $('#loginBtn').on('click', () => {
        $.ajax({
            type: 'POST',
            url: '/user-login',
            data: {
                username: $('#unameLogin').val(),
                password: $('#psw').val()
            },
            dataType: 'json',
            success: (newUrl) => {
                if (typeof newUrl.redirect == 'string') {
                    window.location = data.redirect
                }
            }
        })
    })
})