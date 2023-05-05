window.addEventListener("load", function () {
    check();
}, false);
function check() {
    var token = localStorage.getItem("user");
    $.ajax({
        url: "http://localhost:8081/user/check",
        type: "GET",
        contentType: 'application/json',
        headers: {"Authorization" : "Bearer "+token},
        // headers: {
        //     'Authorization': token
        // },
        success: function (response) {
            // console.log(response.data);
            // response = response
            document.querySelector("#views_val").innerText = response.name
            document.querySelector("#date_val").innerText = response.contact
            document.querySelector("#category_val").innerText = response.email
            document.getElementById("profile").style.display = "initial";
            document.getElementById("upload").style.display = "none";
            document.querySelector("#uploader_name").value = response.name
            
            content="";
            let table = document.getElementById('table');
            for(var i=response.videos.length-1;i>=0;i--){
              let obj = response.videos[i];
              // console.log(obj);
              let row = document.createElement('tr');
              let video = document.createElement('td');
              let title = document.createElement('td');
              let created_on = document.createElement('td');
              let views = document.createElement('td');
              let actionbutton = document.createElement('tr');
              let br = document.createElement('tr');
              let viewbutton = document.createElement('td');
              let updatebutton = document.createElement('td');
              let removebutton = document.createElement('td');
  
              video.innerHTML = `<img src="${response.videos[i].thumbnailImg}" width="30" height="50" class="card-img-top" alt="...">`
              title.innerHTML = response.videos[i].title;
              created_on.innerHTML = response.videos[i].createdAt;
              views.innerHTML = response.videos[i].views;
              viewbutton.innerHTML = `<button id='view' name= ${obj.id} onclick='viewSingleVideo(${obj.id})'><i class="fa fa-play" aria-hidden="true"></i></button>`
              updatebutton.innerHTML = `<button id= 'update' name= ${obj.id} onclick='updateFunction(${obj.id})' data-bs-toggle="modal" data-bs-target="#registerModal"><i class="fa fa-edit" aria-hidden="true"></i></button>`
              removebutton.innerHTML = `<button id='remove' name= ${obj.id} onclick='removeFunction(${obj.id})'><i class="fa fa-trash" aria-hidden="true"></i></button>`
              br.innerHTML = `<hr class="mb-3" />`
  
  
              row.appendChild(video)
              row.appendChild(title)
              row.appendChild(created_on)
              row.appendChild(views)
              actionbutton.appendChild(viewbutton)
              actionbutton.appendChild(updatebutton)
              // actionbutton.appendChild(removebutton)
              row.appendChild(actionbutton)
              // <hr class="mb-3" />
  
              table.appendChild(row)
              table.appendChild(br)
  
  
      }
  
            // for(var i=response.videos.length-1;i>=0;i--){
            //   var img = response.videos[i].thumbnail_image;
            //   var title = response.videos[i].title;
            //   var userName = response.name;
            //   var date=response.videos[i].created_at.slice(0, 10);
            //   var views = response.videos[i].views;
            //   var id = response.videos[i].id;
            //   console.log(id);
            //   if(userName==null)
            //   {
            //     userName=" "
            //   }
      
            //   // content+='<div class="col-md-4 mt-3"><div class="card"><div class="card-body"><div class="card-img-actions"> <img src="'+img+'" class="card-img img-fluid" width="90" height="350" alt=""> </div></div><div class="card-body text-center"><div class="mb-2"><h3 class="font-weight-semibold mb-2"> <a href="#" class="text-default mb-2" data-abc="true">'+title+'</a> </h3> <a href="#" class="text-muted" data-abc="true">'+category+'</a></div><h5 class="mb-0 font-weight-semibold">IMDb: '+ratings+'</h5><button type="button" class="btn bg-cart"><i class="fa fa-cart-plus mr-2"></i>Watch Now</button></div></div></div>'
            //   content+=`<div class="col">
            //                     <div class="card" style="width: 18rem;">
            //                     <div class = "imgCard" onclick='viewSingleVideo(${response.videos[i].id})'>
            //                       <img src="${img}" class="card-img-top" alt="...">
            //                       </div>
            //                       <div class="card-body">
            //                         <h6 class="card-title" >${title}</h6>
                                 
            //                         <h6 id="views" class="card-title">${views} views •  ${date}</h6>
            //                       </div>
            //                     </div>
            //                   </div>`
                             
      
            // }
            
      // $("#cInfo").html(content);
        },
        error: function (error) {

            console.log("Something went wrong", error);
            window.open("home.html", "_self");

        }
    });

}

function logOut(){
  localStorage.removeItem("user");
  window.open("home.html", "_self");

}

////////////////////////////// view single video//////////////////////////////////////
function viewSingleVideo(id){
  // console.log('video view');
window.location.href = "video.html?id="+id;
// console.log(id);
}
var update_video_id =0
var update_video_views =0
function updateFunction(id){
  $.ajax({
    url: "http://localhost:3000/api/v1/all/"+id,
    type: "GET",
    crossorigin: true,
    crossDomain: true,
    contentType:'application/json; charset=utf-8',

  success: function (response) {
      // console.log(response);
      response = response.data;
      var user_name
      if(response.uploder == '')
      {
         user_name="Anonymous"
      }
      else{
         user_name=response.user.name
      }
      document.querySelector("#model_video_title").value = response.title
      document.querySelector("#model_thumbnail").value = response.thumbnail_image
      document.querySelector("#model_video_file").value = response.video_file
      document.querySelector("#modal_category").value = response.category
      document.querySelector("#modal_language").value = response.language
      document.querySelector("#model_desc").value = response.description
      document.querySelector("#model_video_id").value = response.id
      document.querySelector("#model_video_views").value = response.views
      document.querySelector("#model_video_uploader").value = user_name 
      update_video_views = response.views
      update_video_id = response.id
      

  },
  error: function(error){
      console.log("Something went wrong", error);
    }
  });
}


window.addEventListener("load",function(){
  getAllCategories();
},false);

window.addEventListener("load",function(){
  getAllLanguages();
},false);

  function getAllCategories() {
    $.ajax({
      url: "http://localhost:8081/category/all",
      type: "GET",
      dataType: "json",
      crossorigin: true,
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
          // response = response.data
          // console.log(response)
        for (var i = 0; i < response.length; i++) {
          var title = response[i].name;

          var option = document.createElement("option");
          option.value = title;
          option.text = title;
          document.querySelector("#modal_category").appendChild(option);
        }
      },
      error: function (error) {
        // alert("Something went wrong", error);
      },
    });
  }

  // getAllCategories();

  function getAllLanguages() {
    $.ajax({
      url: "http://localhost:8081/language/all",
      type: "GET",
      dataType: "json",
      crossorigin: true,
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
          // response = response.data
        for (var i = 0; i < response.length; i++) {
          var title = response[i].name;
          var option = document.createElement("option");
          option.value = title;
          option.text = title;
          document.querySelector("#modal_language").appendChild(option);
        }
      },
      error: function (error) {},
    });
  }

  // getAllLanguages();

  function updateVideo(){
    event.preventDefault();
    var uploader=document.querySelector('#model_video_uploader').value;
    var title=document.querySelector('#model_video_title').value;
    var thumbnail_image = document.querySelector('#model_thumbnail').value;
    var video_file=document.querySelector('#model_video_file').value;
    var category = document.querySelector('#modal_category').value;
    var language=document.querySelector('#modal_language').value;
    var description = document.querySelector('#model_desc').value;
    
    var user ={};
    var dic ={};
    
    user["title"] = title;
    user["uploder"]=uploader;
    user["thumbnail_image"] = thumbnail_image;
    user["video_file"]=video_file;
    user["category"] = category;
    user["language"] = language;
    user["description"] = description;
    // user["views"] = update_video_views;
    
    dic["video"]=user;
    // console.log(user);

// console.log(dic);
var token=localStorage.getItem("user");
$.ajax({
    url: "http://localhost:3000/api/v1/videos/"+update_video_id,
    type: "PUT",
    data: JSON.stringify(dic),
    crossorigin: true,
    crossDomain: true,
    headers: {
        'Authorization':token
     },
    contentType:'application/json; charset=utf-8',
  success: function (response) {

      // console.log(response)
      // alert("success");
    //   console.log(request)
    //   console.log(request.getResponseHeader('Authorization'));
      
      // console.log(response.status.data.jti);
    //   localStorage.setItem("user",request.getResponseHeader('Authorization'));
      window.location.href = "profile.html";
  },
  error: function(error){
    alert("Something went wrong");
  }
  });
  }

  function onClickEventPrint(){
    // console.log("category");
    $.ajax({
      url: "http://localhost:8081/category/all",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        // response = response.data
        var ele = document.getElementById('sel');
        for (var i = 0; i < response.length; i++) {
          ele.innerHTML = ele.innerHTML +
          `<li ><a class="dropdown-item" onclick='viewSingleCategory("${response[i].name}")'   href="#">${response[i].name}</a></li>
          <li><hr class="dropdown-divider"></li>`;

        }
      },
    error: function(error){
        alert("Something went wrong", error);
      }
    });
  }
  function onClickEvent(){
  // console.log("language");
    $.ajax({
      url: "http://localhost:8081/language/all",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        // response = response.data
        var ele = document.getElementById('lang');
        for (var i = 0; i < response.length; i++) {
          ele.innerHTML = ele.innerHTML +
          `<li ><a class="dropdown-item" onclick='viewSingleLanguage("${response[i].name}")' href="#">${response[i].name}</a></li>
          <li><hr class="dropdown-divider"></li>`;
        }
      },
    error: function(error){
        alert("Something went wrong", error);
      }
    });
  }


  function loginCall(){
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "initial";
    
  }
  function signUpCall(){
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "initial";
    // document.getElementById("modalImage").style.display = "none";
    
    
  }

  ///////////////////////////////////////category click///////////////////////////////////////
function viewSingleCategory(name){
  // console.log('category video view');
  window.location.href = "category.html?category="+name;
  // console.log(name);
  }
  
  ////////////////////////////////Language Click///////////////////////////////////////////
  
  function viewSingleLanguage(name){
  // console.log('language video view');
  window.location.href = "language.html?language="+name;
  // console.log(name);
  }
  
  window.addEventListener("load",function(event) {
    onClickEventPrint();
  },false);
  
  window.addEventListener("load",function(){
    onClickEvent();
  },false);
