let token = localStorage.getItem('access_token');

const projectName = window.location.href.split('?')[1];
const UUID = window.location.href.split('?')[2];
const ID = window.location.href.split('?')[3]
const domain = window.location.href.split('?')[4]
const titleHome = document.getElementById('name');


window.onload = () => {
    const tb = document.getElementById('p-content');

    //const UUID = window.location.href.split('?')[1];
    //const domain = window.location.href.split('?')[3];
    document.getElementById('project-title').innerText = projectName
    document.getElementById('title-project').innerText = projectName.toString()
    document.getElementById('basic-addon3').innerText = `${domain}/`
    document.getElementById('project_uuid').setAttribute('disabled','disabled')
    document.getElementById('project-id').setAttribute('disabled', 'disabled')
    $("#project_uuid").val(UUID)


    //const ID = window.location.href.split('?')[2];

    const url = `https://api-seo.cloudhost.cm/api/user/project/${UUID}`
    let restorthree = $('#spinner-pages').html();
    $('#spinner-pages').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },

        success: function (response) {
            response.project.pages.map( page => {
                console.log(page)
                const key_list = page.meta_keywords.split(',')
                //console.log(key_list)
                let update = document.createElement('button');
                update.innerText = 'Update Page';
                let deletePage = document.createElement('button');
                deletePage.innerText = 'Delete Page';
                let show = document.createElement('button');
                const successBtn = 'btn btn-success btn-sm'.split(' ');
                const dangerBtn = 'btn btn-danger btn-sm'.split(' ');
                const hidden = document.createElement('input');
                hidden.setAttribute('type', 'hidden')
                hidden.setAttribute('id',`${page.id}`)
                hidden.setAttribute('class','hidden')
                modal = document.getElementById('for-hidden')
                modal.appendChild(hidden)
                update.classList.add(...successBtn);
                deletePage.classList.add(...dangerBtn);
                update.setAttribute('type', 'button');
                update.setAttribute('id', `${page.id}`);
                deletePage.setAttribute('id', `${page.id}`);
                deletePage.setAttribute('type', 'button');
                update.setAttribute('onclick', "setInitConfPage('"+page.url+"','"+page.meta_description+"','"+key_list+"','"+page.meta_title+"')");
                deletePage.setAttribute('onclick', "deleteMethod("+page.id+")")
                update.setAttribute('data-toggle','modal');
                update.setAttribute('data-target','#exampleModal');
                
                const page_tr = document.createElement('tr');
                const page_td = document.createElement('td');
                const page_td_meta = document.createElement('td');
                const page_td_key = document.createElement('td');
                const page_td_title = document.createElement('td');
                const page_td_action = document.createElement('td');
                page_td.classList.add('table-user');
                page_td_meta.classList.add('table-user');
                page_td_key.classList.add('table-user');
                page_td_title.classList.add('table-user');
                page_td_action.classList.add('table-user');
                const page_text = document.createElement('span');
                const meta_description = document.createElement('span');
                const meta_title = document.createElement('span');
                for(let key of key_list) {
                    const meta_keyword = document.createElement('span');
                    meta_keywords_classes = 'badge badge-lg badge-default ml-2'.split(' ');
                    meta_keyword.classList.add(...meta_keywords_classes)
                    meta_keyword.innerText = key;
                    page_td_key.appendChild(meta_keyword);
                }
                page_text.innerText = page.url;
                meta_description.innerText = page.meta_description;
                meta_title.innerText = page.meta_title;
                page_td.appendChild(page_text);
                page_td_meta.appendChild(meta_description);
                page_td_title.appendChild(meta_title);
                page_td_action.appendChild(update);
                page_td_action.appendChild(deletePage);
                page_tr.appendChild(page_td);
                page_tr.appendChild(page_td_meta);
                page_tr.appendChild(page_td_key);
                page_tr.appendChild(page_td_title);
                page_tr.appendChild(page_td_action);
                tb.appendChild(page_tr);
            })
            $('#spinner-pages').html(restorthree)
        },
        error : function() {
            alert(e.error)
        }
    });


}



const setInitConfPage = ( url, page_description, page_keywords, page_title ) => {
    const pageArr = page_keywords.split(',');
    console.log(pageArr)
    const ID = window.location.href.split('?')[2];
    document.getElementById('page').value = url;
    document.getElementById('meta-description').value = page_description;
    const pageSpan = document.createElement('span');
    pageSpan.classList.add('tag','badge','badge-primary');
    let tagList = "";
    for (let page of pageArr) {
        tagList += page +",";
    }
    document.getElementById('update-keywords').setAttribute('value', `${tagList}`)
    document.getElementById('meta-title').value = page_title;
    document.getElementById('project-id').value = ID
    page_keywords
}

document.getElementById('page-update-form').addEventListener('submit', (e) => {
    e.preventDefault();
    page_id = document.querySelector('.hidden').id
    const ID = window.location.href.split('?')[2];

    const url = `https://api-seo.cloudhost.cm/api/user/pages/update/${page_id}`
    let body = {
        url: document.getElementById('page').value,
        meta_description:  document.getElementById('meta-description').value,
        meta_keywords:  document.getElementById('update-keywords').value.split(','),
        meta_title: document.getElementById('meta-title').value,
        project_id: document.getElementById('project-id').value = ID
    }
    let ress = $('#updateP').html();
    $('#updateP').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');
    $.ajax({
        type: "put",
        url: url,
        data: body,
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            
            alert(response.messages)
            location.reload(true)
            $('#updateP').html(ress)
        },
        error : function(error) {
            alert(error.messages)
        }
    })
})


const deleteMethod = (id) => {
    const url =`https://api-seo.cloudhost.cm/api/user/pages/delete/${id}`
    const data = {
        id : id.toString()
    }
    $.ajax({
        type: "delete",
        url: url,
        data: data,
        headers: {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            location.reload(true)
        },
        error : function(error) {

        }
    });
}



document.getElementById('config-f').addEventListener('submit', (e) => {
    e.preventDefault();
    const keys = [];
    const k = document.querySelector('.bootstrap-tagsinput').children
    keys.push(k)

    let data = {
        project_uuid : document.getElementById('project_uuid').value,
        url_page : $("#url_page").val(),
        meta_title : $("#meta_title").val(),
        meta_description : $("#meta_description").val(),
        meta_keywords : $("#meta_keywords").val(),
        og_description: $("#og_description").val(),
        og_image: $("#og_image").val(),
        og_site_name: $("#og_site_name").val(),
        og_title: $("#og_title").val(),
        og_url: $("#og_url").val(),
        og_twitter_image_alt: $("#twitter-img").val(),
    }

    console.log(data)

    const msg = document.querySelector('.message');
    let restor = $('#conf-btn').html();
    $('#conf-btn').html('<i class="fa fa-spin fa-spinner fa-2x"></i>');
    const url = "https://api-seo.cloudhost.cm/api/user/pages/create"
    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        headers: {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            console.log(response)
            $('#conf-btn').html(restor);
            msg.innerText = response.message
            msg.classList.add('text-center', 'alert','alert-success')
            //setTimeout(() => {location.reload()},2500)
        },
        error : function(error) {
            msg.innerText = 'Failed to add a page, check if you filled all requirements';
            msg.classList.add('text-center', 'alert','alert-danger')
            //setTimeout(() => {location.reload()},2500)
        }
    });
})


