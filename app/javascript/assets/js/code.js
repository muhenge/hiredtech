$(document).ready(function () {

    document.getElementById('submit').addEventListener('click', function (e) {
        e.preventDefault();
        let code = document.getElementById('code').value;

        verifyEmail(code);
    })
})

function verifyEmail(code) {
    const url = "https://api-seo.cloudhost.cm/api/auth/verify-email";

    let body = {
        "code": code
    }

    $('.error_message').empty();
    $('.success_message').empty();

    let restor = $('#submit').html();
    $('#submit').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');

    $.ajax({
        type: "post",
        url: url,
        data: body,
        dataType: "json",
        success: function (response) {
            location.href = "./login.html";
            $('#submit').html(restor);
        },
        error: function (error){
            var  error_message = error.responseJSON;
            
            $('.error_message').html('<p class="alert alert-danger" >Please enter your code</p>');
            $('#submit').html(restor);
        }
    });
}