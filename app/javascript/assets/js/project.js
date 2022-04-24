$(document).ready(function () {
    
    var user = JSON.parse(localStorage.getItem('user'));   // ici on renvoi les informations concernants le user sous forme JSON
        $('#userCon').html('<span class="mb-0 text-sm  font-weight-bold">'+user.email+'</span>')

        projectList(); // affiche le resultat

    document.getElementById('log').addEventListener('click',function (e) {
        e.preventDefault();
        // console.log("bonjour")
        localStorage.clear();
        location.href = "./login.html";
    })
});

let projects = []
function setCurrentProject(id){
    
   projects.forEach( project => {
       if(project.id === id) {

           document.getElementById("project_id").value = id
           document.getElementById('name').value = project.name
           document.getElementById('domain_name').value = project.domain_name
           return;
       }
   })
}
let token = localStorage.getItem('access_token');

const formUpdate = document.getElementById('update-form')

formUpdate.addEventListener('submit', (e) => {
    e.preventDefault()
    let project_id = document.getElementById("project_id").value;
    const url = `https://api-seo.cloudhost.cm/api/user/project/update/${project_id}`

    const data = {
        name : document.getElementById('name').value,
        domain_name: document.getElementById('domain_name').value,
    }
    const msg = document.querySelector('.message')
    let restor = $('#spinner').html();
    $('#spinner').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');


    $.ajax({
        type: "put",
        url: url,
        data: data,
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            console.log(response)
            //
            $('#spinner').html(restor);

            if (response.messages === 'ERROR! you cannot update your project after 48 hours') {
                msg.innerText = response.messages;
                msg.classList.add('text-center', 'alert','alert-danger')
            }
            msg.innerText = response.messages;
            msg.classList.add('text-center', 'alert','alert-success')
            setTimeout(() => {location.reload()},2500)
        },
        error: function(error) {
            msg.innerText = error.messages;
            msg.classList.add('alert', 'alert-danger')
        }
    });
});

function projectList() {
    const url = "https://api-seo.cloudhost.cm/api/user/project/all";
    const restorTwo = $('#spinner-projects').html();
    $('#spinner-projects').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },

        success: function (response) {


            projects = response.project
            projects.sort().map( project => {
                projectId = project.id;
                project_uuid = project.uuid
                project_domain = project.domain_name
                project_name = project.name
                project_key = project.app_key
                let body = "`" +

                '<tr class="odd" data-id="'+project.uuid+'">'+

                    '<td >'+project.name+'</td>'+
                    '<td>'+project.domain_name+'</td>'+

                    '<td class="text-right">'+
                    
                      '<a href="#!" class="table-action" data-toggle="tooltip" data-original-title="Edit project">'+
                        '<button type="button" onclick="setCurrentProject('+projectId+')" class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">'+
                          '<i class="fas fa-pencil-alt"></i>'+
                          'Update'+
                          '</button>'+
                     ' </a>'+

                    '<button type="button" onclick="getProject(\''+project_name.toString()+'\',\''+project_uuid+'\', '+projectId+',\''+project_domain+'\')" class="btn btn-primary btn-sm">'+
                    '<i class="fas fa-pencil-alt"></i>'+
                    'Configure'+
                    '</button>'+
                    '<button type="button" onclick="getAppKey(\''+project_key+'\')" class="btn btn-secondary btn-sm">'+
                    '<i class="fas fa-cog"></i>'+
                    'App Key'+
                    '</button>'+
                    ' </a>'+
                        '<button type="button" class="btn btn-danger btn-sm" onclick="deleteProject('+projectId+')">'+
                          '<i class="fas fa-trash"></i>'+
                          'Delete'+
                        '</button>'+
                    '</td>'+

                  '</tr>' ;

                $('#list-project-user').append(body)

            })
            $('#spinner-projects').html(restorTwo)
        }, 
        error: function (error) {

        }
    });
}

const getAppKey = (key)=>{
        window.location.replace(`./api_key.html?${key}`)

        // const url = `https://api-seo.cloudhost.cm/api/user/project/${uuid}`;

        // $.ajax({
        //     type: "get",
        //     url: url,
        //     dataType: "json",
        //     headers: {
        //         "Authorization": "Bearer "+token
        //     },
        //     success: function (response) {
        //         console.log(response.project.app_key)
        //         window.localStorage.setItem('app-key',`${response.project.app_key}`)
                //document.getElementById('Textarea').value = `<script id="seo-plugin" src="https://cdn.jsdelivr.net/gh/muhenge/seo-js/index.js?${response.project.app_key}"></script>`;
           // }
        // })


}
const getProject = (uuid, id,domain,name) => {
    window.location.replace(`./config_project.html?${uuid}?${id}?${domain}?${name}`)
}

const setConfig =  (uuid) =>{
    $("#conf_proj_id").val(uuid)
    const pro = document.getElementById('project_uuid')
    const p_uuid = $("#conf_proj_id").val()
    pro.setAttribute('value', `${p_uuid}`)
}

document.getElementById('config-btn').addEventListener('click',  (e) => {

    let dataConf = {
        project_uuid : $("#conf_proj_id").val(),
        url_page : $("#url_page").val(),
        meta_keywords : $("#meta_keywords").val(),
        meta_description : $("#meta_description").val(),
        meta_title : $("#meta_title").val()
    }

    const url = "https://api-seo.cloudhost.cm/api/user/pages/create"
    $.ajax({
        type: "post",
        url: url,
        data: dataConf,
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            alert('created');
            window.location.replace(`./Project_liste.html`)
        },
        error : function(error) {}
    });
})

function edit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").Value = selectedRow.cells[0].innerHTML;
    document.getElementById("domain_name").Value = selectedRow.cells[1].innerHTML;
    document.getElementById("meta_description").Value = selectedRow.cells[2].innerHTML;
    document.getElementById("meta_keywords").Value = selectedRow.cells[3].innerHTML;
    document.getElementById("meta_title").Value = selectedRow.cells[4].innerHTML;
}

// document.getElementById('edit-btn').addEventListener('click', async (e) => {
    
//     e.preventDefault();
                    
//     //const url = `https://api-seo.cloudhost.cm/api/user/project/update/${id}`
// })

function deleteProject(id) {
    const url = `https://api-seo.cloudhost.cm/api/user/project/delete/${id}`;
    $.ajax({
        type: "delete",
        url: url,
        // data: "data",
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            location.reload();
        }
    });
}