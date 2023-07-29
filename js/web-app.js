// List All Docs
function getDocs(){
    $("#docsLoading").html("<span><i class='fa fa-spin fa-spinner fa-lg'></i></span>");
    $("#docsList").html("");

    $.ajax({
    url : 'http://localhost/docm/public/api/docs',
    type : 'GET',

    dataType: 'json',
    success: function(data){
        console.log(data);

        if(data.message_type == 1){
            for (var i=0; i < data.docsList.length; i++) {
                $("#docsList").append("<li class='list-group-item d-flex justify-content-between lh-condensed'>"+
                  "<div>"+
                    "<h6 class='my-0'>"+data.docsList[i].doc_name+"</h6>"+
                    "<small class='text-muted'>"+data.docsList[i].doc_template+"</small>"+
                  "</div>"+
                  "<span class='text-muted'>ID: "+data.docsList[i].id+"</span>"+
                  "<span class='text-muted'>"+
                  "<button class='btn btn-sm btn-success' title='Download PDF' onclick='downLoadDoc("+data.docsList[i].id+")'>"+
                  "<i class='fa fa-download'></i></button> "+
                  "<button class='btn btn-sm btn-danger' title='Delete Document' onclick='deleteDoc("+data.docsList[i].id+")'>"+
                  "<i class='fa fa-trash'></i></button>"+ 
                  "</span>"+
                "</li>");
                $("#docsLoading").html("");
            }
        } else {
            $("#docsList").append("<li class='list-group-item d-flex justify-content-between lh-condensed'>"+
                  "<div>"+
                    "<h6 class='my-0'>"+data.message+"</h6>"+
                  "</div>"+
                "</li>");
                $("#docsLoading").html("");
        }

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });

}


// Create New Doc
function newDoc(){
    $("#docsLoading").html("<span><i class='fa fa-spin fa-spinner fa-lg'></i></span>");

    $.ajax({
    url : 'http://localhost/docm/public/api/new-doc',
    type : 'POST',
    data: {
        "name":$('#doc_name').val(),
        "template": $("#doc_template").val(),
        "resume": $("#doc_resume").val(),
        "_token": $('#csrf-token')[0].content
    },
    dataType: 'json',
    success: function(data){
        console.log(data);
        $("#docsLoading").html("");
        $("#doc_template").val("");
        $("#doc_resume").val("");
        $('#doc_name').val("");
        getDocs();
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });
    

}


// List Docs for Select Input on Fields Page
function getDocsForSelect(){
    $("#loadDocsSelect").html("<span><i class='fa fa-spin fa-spinner fa-lg'></i></span>");
    $("#doc_id").html("");

    $.ajax({
    url : 'http://localhost/docm/public/api/docs',
    type : 'GET',

    dataType: 'json',
    success: function(data){
        console.log(data);

        $("#doc_id").html("<option value=''>Select a Document</option>");
        if(data.message_type == 1){
            for (var i=0; i < data.docsList.length; i++) {
                $("#doc_id").append("<option value='"+data.docsList[i].id+"'>"+data.docsList[i].doc_name+"</option>");
                $("#loadDocsSelect").html("");
            }
        } else {
            $("#doc_id").html("<option value=''>"+data.message+"</option>");
            $("#loadDocsSelect").html("");
        }

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });

}


// List All Doc Fields
function getFields(){
    $("#docFieldsLoading").html("<span><i class='fa fa-spin fa-spinner fa-lg'></i></span>");
    $("#docFieldsList").html("");

    $.ajax({
    url : 'http://localhost/docm/public/api/fields',
    type : 'GET',

    dataType: 'json',
    success: function(data){
        console.log(data);

        if(data.message_type == 1){
            for (var i=0; i < data.docFieldsList.length; i++) {
                $("#docFieldsList").append("<li class='list-group-item d-flex justify-content-between lh-condensed'>"+
                  "<div>"+
                    "<h6 class='my-0'>"+data.docFieldsList[i].field_name+"</h6>"+
                    "<small class='text-muted'>"+data.docFieldsList[i].doc_name+"</small>"+
                  "</div>"+
                  "<span class='text-muted'>ID: "+data.docFieldsList[i].id+"</span>"+
                  "<span class='text-muted'>"+ 
                  "</span>"+
                "</li>");
                $("#docFieldsLoading").html("");
            }
        } else {
            $("#docFieldsList").append("<li class='list-group-item d-flex justify-content-between lh-condensed'>"+
                  "<div>"+
                    "<h6 class='my-0'>"+data.message+"</h6>"+
                  "</div>"+
                "</li>");
                $("#docFieldsLoading").html("");
        }

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });

}


// Create New Doc Field
function newDocField(){
    $("#docFieldsLoading").html("<span><i class='fa fa-spin fa-spinner fa-lg'></i></span>");

    $.ajax({
    url : 'http://localhost/docm/public/api/new-field',
    type : 'POST',
    data: {
        "doc_id":$('#doc_id').val(),
        "field_name": $("#field_name").val(),
        "field_description": $("#field_description").val(),
        "_token": $('#csrf-token')[0].content
    },
    dataType: 'json',
    success: function(data){
        console.log(data);
        $("#docFieldsLoading").html("");
        $("#doc_id").val("");
        $("#field_name").val("");
        $('#field_description').val("");
        getFields();
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });
    

}


// Generate and Download PDF Document
function downLoadDoc(id){
    $("#docsLoading").html("<span><i class='fa fa-spin fa-spinner fa-lg'></i></span>");

    $.ajax({
    url : 'http://localhost/docm/public/api/download-doc',
    type : 'GET',
    data: {
        "id":id
    },

    dataType: 'json',
    success: function(data){
        console.log(data);

        var doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(data.doc_name, 10, 10);

        if(data.message_type == 1){
            var y = 20;
            for (var i=0; i < data.docFieldsList.length; i++) {
                 doc.setFontSize(12);
                 doc.setTextColor(0, 0, 255);
                 doc.text(data.docFieldsList[i].field_name, 10, y);
                 y = y + 10; 
            }
        } else {
            doc.setFontSize(10);
            doc.setTextColor(255, 0, 0);
            doc.text(data.message, 10, 20);
        }

        $("#docsLoading").html("");
        doc.save('document-generated.pdf')

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });

}


// List All Doc Fields
function deleteDoc(id){
    $("#docsLoading").html("<span><i class='fa fa-spin fa-spinner fa-lg'></i></span>");
    $("#docsList").html("");

    $.ajax({
    url : 'http://localhost/docm/public/api/delete-doc',
    type : 'GET',
    data: {
        "id":id
    },

    dataType: 'json',
    success: function(data){
        console.log(data);

        if(data.message_type == 1){
            getDocs();
        }
        $("#docsLoading").html("");

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });

}