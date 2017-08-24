
function saveNewphoto() {
  debugger;
  var imgData = {}
  var arr = []
      $('#populateData li').each(function(index, el) {
      imgData = {
        "albumId": localStorageDataTemp[albumId],
        "id": localStorageDataTemp[albumId]['imgData'].id+1,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": $(this).find('img').attr('src'),
        "thumbnailUrl": $(this).find('img').attr('src')
      }
      arr.push(imgData);
    });

    var localStorageData = JSON.parse(localStorage.getItem("albumData"));

    localStorageData.push({"albumInfo"."imgData": arr})
    storeToLocal(localStorageData);
  }

}




















function addphoto() {
  debugger;
  window.location.href = window.location.href + "#createphoto";
}

function modelShow() {
  debugger;
  $('#myModal').show()
  var closeBtn = $('#myModal .close');
  closeBtn.click(function(event) {
    $('#myModal').hide()
  });
}

function setCreatePage1(){
  debugger;
  $('#populateData').empty();
  $('#content').prepend('<div class="liContainerFooterTitle" ><button id="addPhoto">Add Photo</button></div>')
    $('#footer').append("<div class='liContainerFooterTitle' ><input type='button' id='btnSubmit' value='Save Album' /><input type='submit' id='btnCancel'value='Cancel' /></div>")
  $('#addPhoto').click(modelShow);
  $('#photoSave').click(appendPhoto);
  

}

function appendPhoto() {
  debugger;
  var name = $('#photoName').val();
  var url = $('#photoUrl').val();
  var ul_data = `

        <li>
          <div class="liContainer">
          <div class="liContainerBody">
            <div class="liContent"><img src="${url}">"></div>
            <div class="liContainerFooter">
              <div class="liContainerFooterNumberOfPics" >
                <p><strong>Photo Title: </strong><span class="title">${name}</span></p>
              </div>
            </div>
            </div>
          </div>
        </li>
             `;
  $("#populateData").append(ul_data);
  $('#myModal').hide();
}




























function createAlbum(){
  debugger;
  window.location.hash='#albums/create';
  $('#content').replaceWith("<div class='form-holder'>" +
        "<form name='input' action='#' method='post'>" +
        "<label>Album Title:</label> <input type='text' name='Album Name' id='albumName'/><br/><br/>" +
        "<label>Album Description:</label><input type='text' name='Album_description' id='albumDesc' /><br/><br/>" +
        "<div id='temp_photos'></div>"+
        "<label>Add Photos:</label><span id='addPhotos'>+</span><br>"+
        "<input type='submit' id='btnSubmit' value='Add Album' />" +
        "<input type='submit' id='btnCancel'value='Cancel' />" +
        "</form>" +
        "</div>");

var arr=[];

var buttonSubmit = document.querySelector('#btnSubmit');
var modal = document.getElementById('myModal');
var btn = document.getElementById("addPhotos");
var span = document.getElementsByClassName("close")[0];
var addingCount=0;
btn.onclick = function() {
    modal.style.display = "block";
    photoSave=document.querySelector('#photoSave');
    photoCancel=document.querySelector('#photoCancel');


    photoSave.onclick=function(){
        debugger;
          var pName=document.querySelector('#photoName');
          var pUrl=document.querySelector('#photoUrl');
          temoPhoto={
            photoTitle : photoName.value,
            photourl : photoUrl.value
          };
            if(addingCount)
        {
          $('#temp_photos').append("<label>Photo Title:</label>"+pName.value+"</br>"+"<label>Photo Title:</label>"+pUrl.value+"</br>");
        }

        $('#temp_photos').replaceWith("<label>Photo Title:</label>"+pName.value+"</br>"+"<label>Photo Title:</label>"+pUrl.value+"</br>"+"<div id='temp_photos'></div>"); 
            modal.style.display = "none";     
           arr.push(temoPhoto);
           addingCount++;
    }


    photoCancel.onclick=function(){
        modal.style.display = "none";

    }
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


buttonSubmit.onclick= function(){
  debugger;
var albumName = document.querySelector('#albumName');
var albumDesc = document.querySelector('#albumDesc');
console.log(albumName.value);
console.log(albumDesc.value);
var album=[];
var albumobj={};
albumobj.photos=[];
albumobj.albumname=albumName.value;
albumobj.albumdesc=albumDesc.value;
albumobj.photos=arr.slice;
persist(albumobj);
function persist(albumobj1)
  {
    debugger;

    if(window.localStorage.getItem("Albums_New"))
    {

    var storedAlbum=JSON.parse(localStorage.getItem("Albums_New"));
    storedAlbum.push(albumobj1);
    localStorage.setItem("Albums_New", JSON.stringify(storedAlbum));

    }
    else
    {
      album.push(albumobj1);
      window.localStorage.setItem("Albums_New", JSON.stringify(album));
    }
    
    

  } 

}
