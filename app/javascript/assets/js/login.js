$(document).ready(function () {

    document.getElementById('login').addEventListener('click',function (e) {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        Connection( email, password);
    })
})

function Connection(email, password) {
    const url = "https://api-seo.cloudhost.cm/api/auth/login";
    
    let body = {
        "email": email,
        "password": password
    }
    
    $('.error_message').empty();
    $('.success_message').empty();

    let restor = $('#login').html();
    $('#login').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');

    $.ajax({
        type: "post",
        url: url,
        data: body,
        dataType: "json",
        success: function (response) {  
            // console.log(response.message);
            localStorage.setItem('user', JSON.stringify(response.user))
            localStorage.setItem('access_token', response.access_token)
            $('.success_message').html('<p class="alert alert-success">Connexion...</p>');
            location.href = "./create_project.html";
            $('#login').html(restor);
        },
        error: function (error){
            // console.log(error)
            var  error_message = error.responseJSON;
            var html = '' ;
            
            $.each(error_message, function (key, val) {
                if (key == "error") {
                    html = html+'<span><strong>'+key+'</strong>: '+val+ '</span><br/>'
                } else {
                    for (let i = 0 ;i < val.length; i++) {
                        console.log(key, val[i]);
                        html = html+'<span><strong>'+key+'</strong>: '+val[i]+ '</span><br/>'
                    }
                }
                
            });

            $('.error_message').html('<p class="alert alert-danger">'+html+'</p>');
            $('#login').html(restor);
        }
    });
        
}