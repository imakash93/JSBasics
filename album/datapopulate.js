$(function () {
  debugger;

var btn = document.getElementById("myBtn");
 var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

 var jason = 'https://jsonplaceholder.typicode.com';
  if (!localStorage.getItem("albumData")) {
  var local = [];
      $.ajax({
        url: jason + '/albums',
        method: 'GET',
        async: false
      }).then(function(data) {
          var data = data.slice(0,7);
          $.each(data, function(i, obj) {
            $.ajax({
              url: jason + '/albums/'+obj.id+'/photos',
              method: 'GET'
            }).then(function(photos) {
              local.push({"albumInfo": data[i], "imgData": photos});

              if (i+1 >= data.length) {
                storeToLocal(local);
                window.location.href = window.location.href ;
              }
            })
          });
      });
    }


  init();
  console.log(JSON.parse(localStorage.getItem("albumData")));

});




function storeToLocal(data) {
  //debugger;
   console.log(data);

  if (typeof(Storage) !== "undefined") {

      localStorage.setItem("albumData", JSON.stringify(data));

  } else {
      document.getElementById("result").innerHTML = " Web Storage not supported";
  }
}

function appendAlbumData() {
  //debugger;
  var localStorageData = JSON.parse(localStorage.getItem("albumData"));
  $('#footer').append('<button onclick="clearLocal()">Reset All data</button>')
  $.each(localStorageData, function(i, data){

    var ul_data = `

                    <li>
              <div class="liContainer">
              <div class="liContainerBody" albumid="${i}">
               <div class="liContainerHead">
                  <div class="liContainerEditDelete">
                    <span class="liContainerEdit">
                      <input type="button" class="edit" name="liContainerEdit
                      " value="E" >
                    </span>
                    <span class="liContainerDelete">
                      <input type="button" onclick="deleteAlbum(${i}, this)" class="delete" id="del1" name="liContainerDelete" value="X">
                    </span>
                  </div>
                </div>
                <div class="liContent"><img src="${data['imgData'][0]['thumbnailUrl']}"></div>
                <div class="liContainerFooter">
                  <div id="liContainerFooterTitle" >

                    <span id="title"><strong>Album name:</strong> ${data['albumInfo']['title']}</span>
                  </div>
                  <div id="liContainerFooterNumberOfPics" >
                    <span id="NumberOfPics">No Of Pics :${data['imgData'].length}</span>
                  </div>
                </div>
                </div>
              </div>
            </li>
   `;
    $("#populateData").append(ul_data);

  });
}


function appendPhotoData(albumId) {
  //debugger;
  $('#populateData').empty();
  $('#header').empty();
   $('#footer').empty();
  var localStorageData = JSON.parse(localStorage.getItem("albumData"));
  $('#header').append('<button onclick="modelShow()">ADD PHOTO</button>');
  $('#footer').append('<button onclick="saveData()">save</button>');
  $.each(localStorageData[albumId]['imgData'], function(i, data){
     if (data)  {
      var ul_data = `<li tempId="${data.id}">
              <div class="liContainer">
              <div class="liContainerBody">
               <div class="liContainerHead">
                  <div class="liContainerEditDelete">
                    <span class="liContainerEdit">
                    </span>
                    <span class="liContainerDelete">
                      <input type="button" onclick="deletePhoto(${albumId}, ${i}, this)"   name="liContainerDelete" value="X">
                      <input type="button" onclick="editPhoto(this)" name="liContainerDeleteEdit" value="E">
                    </span>
                  </div>
                </div>
                <div class="liContent"><img src="${data.url}"></div>
                <div class="liContainerFooter">
                  <div class="liContainerFooterTitle" >
                  </div>
                  <div class="liContainerFooterNumberOfPics">
                    <p>
                      <strong>Id: </strong><span class="id">${data.id}</span><br>
                      <strong>Album Id: </strong><span class="albumId">${data.albumId}</span><br>
                      <strong>Photo Title: </strong><span class="title">${data.title}</span>
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </li>`;
      $("#populateData").append(ul_data);
    }
  });
  $('#photoSave').click(addphotosingle);
}

function setCreatePage(){
  //debugger;
  $('#populateData').empty();
  $('#content').prepend('<div class="liContainerFooterTitle" ><button id="addPhoto">Add Photo</button></div>')
  $('#content').prepend('<div class="liContainerFooterTitle" ><input type="Text" id="albumName" placeholder="Album Name"></div>')
  $('#footer').empty();
  $('#footer').append("<div class='liContainerFooterTitle' ><input type='button' id='btnSubmit' value='Save Album' /><input type='submit' id='btnCancel'value='Cancel' /></div>")
  $('#addPhoto').click(modelShow);
  $('#photoSave').click(appendPhoto);
  $('#btnSubmit').click(saveNewAlbum);

}

function appendPhoto() {
  //debugger;
  var name = $('#photoName').val();
  var url = $('#photoUrl').val();
  var ul_data = `<li>
                  <div class="liContainer">
                  <div class="liContainerBody">
                    <div class="liContainerHead">
                       <div class="liContainerEditDelete">
                         <span class="liContainerDelete">
                            </span>
                       </div>
                    </div>
                    <div class="liContent"><img src="${url}"></div>
                    <div class="liContainerFooter">
                      <div class="liContainerFooterNumberOfPics" >
                        <p>
                          <strong>Photo Title: </strong><span class="title">${name}</span>
                        </p>
                      </div>
                    </div>
                    </div>
                  </div>
                </li>`;
  $("#populateData").append(ul_data);
  $('#myModal').hide();
}

function addphotosingle(){
  //debugger;
    console.log('addphotosingle');
    var name = $('#photoName').val();
    var url = $('#photoUrl').val();
    var id = parseInt($('#populateData li:last-child .id').text(), 10) + 1;
    var albumId = $('#populateData li:last-child .albumId').text();
    var ul_data = `<li class="new">
                    <div class="liContainer">
                    <div class="liContainerBody">
                      <div class="liContent"><img src="${url}"></div>
                      <div class="liContainerFooter">
                        <div class="liContainerFooterNumberOfPics" >
                          <p>
                            <strong>Id: </strong><span class="id">${id}</span><br>
                            <strong>Album Id: </strong><span class="albumId">${albumId}</span><br>
                            <strong>Photo Title: </strong><span class="title">${name}</span>
                          </p>
                        </div>
                      </div>
                      </div>
                    </div>
                  </li>`;
    $("#populateData").append(ul_data);
    $('#myModal').hide();
}


function saveNewAlbum() {
  //debugger;
  var imgData = {}
  var arr = []
  if ($('#albumName').val() == ""){
    alert('Album Name Can not be empty');
  } else {
    var aData = {
      "userId": localStorageDataTemp[localStorageDataTemp.length-1].albumInfo.id+1,
      "id": localStorageDataTemp[localStorageDataTemp.length-1].albumInfo.id+1,
      "title": $('#albumName').val()
    }
    $('#populateData li').each(function(index, el) {
      imgData = {
        "albumId": localStorageDataTemp[localStorageDataTemp.length-1].albumInfo.id+1,
        "id": localStorageDataTemp[localStorageDataTemp.length-1].albumInfo.id+1,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": $(this).find('img').attr('src'),
        "thumbnailUrl": $(this).find('img').attr('src')
      }
      arr.push(imgData);
    });

    var localStorageData = JSON.parse(localStorage.getItem("albumData"));

    localStorageData.push({"albumInfo": aData, "imgData": arr})
    storeToLocal(localStorageData);

  }

}

function modelShow() {
  //debugger;
  $('#myModal').show()
  var closeBtn = $('#myModal .close');
  closeBtn.click(function(event) {
    $('#myModal').hide()
  });
}



function hashChangeHandler(){
  //debugger;
  var hash = window.location.hash;
  var params = hash.split('/');;
  console.log('splitted d url');
  if(hash.indexOf('#create') !== -1){
    setCreatePage();
  } else if(hash.indexOf('#edit') !== -1) {
    appendPhotoData(params[1]);
  } else {
    appendAlbumData();
  }
}


function editAlbum(){
  //debugger;
  window.location.href = window.location.href + "#edit/" +
  $(this).closest('[albumId]').attr('albumId');
}

function addAlbum() {
  //debugger;
  $('#content').empty();
  window.location.href = window.location.href + "#create"
}

function init(){
  //debugger;
  window.addEventListener('hashchange', hashChangeHandler);
  hashChangeHandler();
  $('#content').on('click', 'div[albumId] .edit', editAlbum);
  // $('#content').on('click', 'div[albumId] .delete', deleteAlbum);
  $('#myBtn').on('click', addAlbum);
}


var localStorageDataTemp = JSON.parse(localStorage.getItem("albumData"));
var temp;

function deletePhoto(albumId, objIndex, el) {
  //debugger;

  if(localStorageDataTemp[albumId]['imgData'].length == 1){
    alert("you can not delete the last photo");

  }
  if (confirm("Are You Sure you want to delete this image ?")){
    //delete localStorageDataTemp[albumId]['imgData'].splice(objIndex,1);
    $(el).closest('li').remove();
    //localStorageDataTemp = localStorageDataTemp;
    //temp = localStorageDataTemp;
  }
}

function deleteAlbum(objIndex, el) {
  //debugger;
  var localStorageDataTemp = JSON.parse(localStorage.getItem("albumData"));
  console.log(localStorageDataTemp[objIndex]['imgData'].length);

  if (confirm("Are You Sure you want to delete this Album ?")){
    if(localStorageDataTemp[objIndex]['imgData'].length !==0){

        alert("can not delete contain photos");
        if(confirm("äre you sure u want to delete album with photos")){
           var localStorageData = JSON.parse(localStorage.getItem("albumData"));
    // console.log(localStorageData);
    delete localStorageData.splice(objIndex,1);
    console.log(localStorageData);
    $(el).closest('li').remove();
    storeToLocal(localStorageData);
    console.log(localStorageData.length);
    if (localStorageData.length == 0){
      console.log('ok')
    }
        }
  return;
    }

  }
}

function clearLocal() {
  //debugger;
  if (confirm("Are You Sure you want to delete All Data ?")){
    localStorage.clear()
    console.log("data cleared");
  }
}

function editPhoto(el) {
  debugger;
  var url = $(el).closest('li').find('img').attr('src');
  var name = $(el).closest('li').find('.title').text();
  var thiss = $(el).closest('li');
  // $('#photoToEdit').val($(el).closest('li').attr(tempid));
  $('#myModalEdit').show();
  $('#photoNameEdit').val(name);
  $('#photoUrlEdit').val(url);
  $('#photoToEdit').val(thiss.attr('tempid'));
  $('#myModalEdit .close').click(function(){
      $('#myModalEdit').hide();
  });
  $('#photoCancelEdit' ).click(function(){
      $('#myModalEdit').hide();
  });

}
$(document).ready(function() {
  $('#photoSaveEdit').click(function(event) {
    var photoToEditId = $('#photoToEdit').val();
    $('[tempid='+photoToEditId+']').find('img').attr('src', $('#photoUrlEdit').val());
    $('[tempid='+photoToEditId+']').find('.title').text($('#photoNameEdit').val());
    console.log( $('#photoUrlEdit').val());
    console.log($('#photoNameEdit').val());
    modleClose();
  });
  function modleClose() {
    $('#myModalEdit').hide();
    // $('#photoNameEdit').val(' ');
    // $('#photoUrlEdit').val(' ');
  }
});

function saveData() {
  //debugger;
  var imgData = {}
  var arr = []
  var hash = window.location.hash;
  var params = hash.split('/');
  // if(temp){
  //   storeToLocal(temp);
  // }
  var localStorageData = JSON.parse(localStorage.getItem("albumData"));
  localStorageData[params[1]]['imgData'] = [];
  debugger;
  console.log("----------------------");
  var cAlbum = $('#populateData li:last-child .albumId').text();
  console.log(localStorageData[params[1]]['imgData']);
  $('#populateData li').each(function(index, el) {
    imgData = {
      "albumId" : parseInt(params[1], 10),
      "id" : parseInt($(this).find('.id').text(), 10),
      "thumbnailUrl": $(this).find('img').attr('src'),
      "title" : $(this).find('.title').text(),
      "url": $(this).find('img').attr('src')
    }
    localStorageData[params[1]]['imgData'].push(imgData);
  });
  console.log("==================k");
  console.log(localStorageData[params[1]]['imgData']);
  storeToLocal(localStorageData);
  window.location.reload();
}
