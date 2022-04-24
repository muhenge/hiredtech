$(document).ready(function () {

    var user = JSON.parse(localStorage.getItem('user'));   // ici on renvoi les informations concernants le user sous forme JSON
        $('#userCon').html('<span class="mb-0 text-sm  font-weight-bold">'+user.email+'</span>')

    document.getElementById('log').addEventListener('click',function (e) {
        e.preventDefault();
        localStorage.clear();
        location.href = "./login.html";
    })

    document.getElementById('createP').addEventListener('click',function (e) {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let domain_name = document.getElementById('domain_name').value;
        saveProject(name, domain_name);
    })
})

function saveProject(name, domain_name) {
    const url = "https://api-seo.cloudhost.cm/api/user/project/create";
      
    let body = {
        "name": name,
        "domain_name": domain_name,

    }

    $('.error_message').empty();
    $('.success_message').empty();

    let loading = $('#createP').html();
    $('#createP').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');

    var token = localStorage.getItem('access_token');
    // console.log(token)
    $.ajax({
        type: "post",
        url: url,
        data: body,
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },
        success: function (response) {

            $('.success_message').html('<p class="alert alert-success">'+response.message+'</p>');
            localStorage.setItem('app_key', response.app_key);
            $('#createP').html(loading);
            window.location.replace('./Project_liste.html')
        },
        error: function (error) {
            var  error_message = error.responseJSON;
            var html = '' ;

            $.each(error_message, function (key, val) { 
                if (key == "error") {

                    $.each(val, function (a, b) { 
                        // console.log(a, b)
                        html = html+'<span><strong>'+a+'</strong>: '+b+ '</span><br/>'
                    });
                }        
            });
            $('.error_message').html('<p class="alert alert-danger" >'+html+'</p>');
            $('#createP').html(loading);
        }
    });
}

if (localStorage.getItem('access_token') === null) {
   window.location.reload('./login.html')
}
