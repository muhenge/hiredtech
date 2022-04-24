// register
$(document).ready(function () {

    document.getElementById('register').addEventListener('click',function (e) {
        e.preventDefault();
        let firstname = document.getElementById('firstname').value;
        let lastname = document.getElementById('lastname').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let password_confirmation = document.getElementById('password_confirmation').value;
     
        CreateAccount(firstname, lastname, email, password, password_confirmation);
    })
})

function CreateAccount (firstname, lastname, email, password, password_confirmation) {
    const url = "https://api-seo.cloudhost.cm/api/auth/register" ;

    let body = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation
    }

    $('.error_message').empty();
    $('.success_message').empty();

    let restor = $('#register').html();
    $('#register').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');

    $.ajax({
        type: "post",
        url: url,
        data: body,
        dataType: "json",
        success: function (response) {
                // console.log(response.message);
            $('.success_message').html('<p class="alert alert-success">'+response.message+'</p>');
            location.href = "./code.html";
            $('#register').html(restor);
            
        },
        error: function (error){
            
            var  error_message = error.responseJSON;
            var html = '' ;

            $.each(error_message, function (key, val) { 
                for (let i = 0 ;i < val.length; i++) {
                    console.log(key, val[i]);
  
                    html = html+'<span><strong>'+key+'</strong>: '+val[i]+ '</span><br/>'
                }       
            });
            $('.error_message').html('<p class="alert alert-danger" >'+html+'</p>');
            $('#register').html(restor);
        }
    });

// code de verification des champs
// function ValidityState(candidates){
  //     let result = true;

  //     for (let i = 0; i < candidates.lenght ; i++) {
  //         candidates[i].addEventListener('blur', (e) => {
  //             ValidityState([candidates[i]]);
  //         });

  //         if (candidates[i].value === '' || candidates[i].value === null) {
  //             candidates[i].closest(".form-group").classList.add('has-danger');
  //             result = result*false;
  //         } else {
  //             candidates[i].closest(".form-group").classList.remove('has-danger');
  //             result = result*true;
  //         }
          
  //     }
  //     if (result) {
  //         return true;
  //     } else {
  //         return false;
  //     }
  //  }


}