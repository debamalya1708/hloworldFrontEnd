window.addEventListener("load",function(event) {
    allVideos();
  },false);

  window.addEventListener("load",function(event) {
    categoryLoad();
  },false);
  
  window.addEventListener("load",function(){
    languageLoad();
  },false);
  
  window.addEventListener("load",function(){
    cardCategories();
  },false);

  window.addEventListener("load",function(){
    cardLanguagess();
  },false);

  window.addEventListener("load",function(){
    check();
  },false);
function check(){
  var token=localStorage.getItem("user");
  $.ajax({
    url: "http://localhost:8081/user/check",
    type: "GET",
    headers: {"Authorization" : "Bearer "+token},
    contentType: 'application/json',
    success: function (response) {
      document.getElementById("dp").style.display = "initial";
      document.getElementById("upload").style.display = "none";
      // document.getElementById("profile").innerText = response.name;
    },
  error: function(error){
    console.log("Something went wrong", error);

    }
  });

}

function allVideos(){
    // console.log("AllVideoSection");
    $.ajax({
      url: "http://localhost:8081/video/all",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        console.log(response);
        response = response
        content="";
        for(var i=response.length-1;i>=0;i--){
          var img = response[i].thumbnailImg;
          var title = response[i].title;
          var userName = response[i].uploader.name;
          var date=response[i].createdAt;
          var views = response[i].views;
          var likes = response[i].likes;
          // if(response[i].likes!=null){
          //   var likes = response[i].likes;
          // }
          
          var id = response[i].id;
          // console.log(id);
          if(userName==null)
          {
            userName=" "
          }
  
          // content+='<div class="col-md-4 mt-3"><div class="card"><div class="card-body"><div class="card-img-actions"> <img src="'+img+'" class="card-img img-fluid" width="90" height="350" alt=""> </div></div><div class="card-body text-center"><div class="mb-2"><h3 class="font-weight-semibold mb-2"> <a href="#" class="text-default mb-2" data-abc="true">'+title+'</a> </h3> <a href="#" class="text-muted" data-abc="true">'+category+'</a></div><h5 class="mb-0 font-weight-semibold">IMDb: '+ratings+'</h5><button type="button" class="btn bg-cart"><i class="fa fa-cart-plus mr-2"></i>Watch Now</button></div></div></div>'
          content+=`<div class="col">
                            <div class="card" style="width: 18rem;">
                            <div class = "imgCard">
                              <img src="${img}" onclick='viewSingleVideo(${response[i].id})' class="card-img-top" alt="...">
                              </div>
                              <div class="card-body" style="display:flex;">
                              <div class="profile_image" id="dp" >
              <div class="co">
                  <img class="rounded-circle z-depth-3" id="profilePic" alt="100x100" style="height: 40px;width: 40px;"
                    src="https://res.cloudinary.com/dq5jpef6l/image/upload/v1668422989/poem_u47bzi.jpg">
                </div>
                <div class="name"><div class="val" id="views_val" style="font-size: 22px;"></div></div>
          </div>
                                  <div class="text">
                                    <h6 class="card-title" >${title}</h6>
                                    <p class="card-text" onclick='viewSpecifiedNamedVideo("${userName}")'>${userName}</p>
                                    <h6 id="views" class="card-title">${views} views •  ${likes} likes • ${date}</h6>
                                  </div>
                                </div>
                            </div>
                          </div>`
                         
  
        }
        
  $("#riju").html(content);
      },
    error: function(error){
        alert("Something went wrong", error);
      }
    });
  }

  ////////////////////////////// view single video//////////////////////////////////////
function viewSingleVideo(id){
    // console.log('video view');
  window.location.href = "video.html?id="+id;
  // console.log(id);
  }

  /////////////////////////////////////////language   category///////////////////////////////////
function cardLanguagess(){
  // console.log("category");
  $.ajax({
    url: "http://localhost:8081/language/all",
    type: "GET",
    //data: JSON.stringify(obj1),
    dataType : 'json',
    crossorigin: true,
    crossDomain: true,
    contentType:'application/json; charset=utf-8',
    success: function (response) {
      // console.log(response);
      // response = response.data
      content="";
      for (var i = 0; i < response.length; i++) {
        var name = response[i].name
        // onclick='viewSingleLanguage("${title}")'
        content+=`<div class="card_category" onclick='viewSingleLanguage("${name}")' style="width: auto;">
              <div class = "imgCard_cat">
                <img src="Music.jpg" class="img_card" alt="...">
                </div>
                  <h1 class="card-title_cat">${name}</h1>
              </div>`


        
      }
      $("#language").html(content);
    },
  error: function(error){
      alert("Something went wrong", error);
    }
  });
}
{/* <div class = "imgCard_cat" >
                  <img src="${img}" class="img_card" alt="...">
                  </div> */}

  ///////////////////card category///////////////////
  function cardCategories(){
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
        // console.log(response);
        // response = response.data
        content="";
        for (var i = 0; i < response.length; i++) {
          var name = response[i].name
          // console.log(response[i].name);
          var img = response[i].image
          // onclick='viewSingleCategory("${title}")'
          content+=`<div class="card_category"  onclick='viewSingleCategory("${name}")' style="width: auto;">
          <div class = "imgCard_cat">
          <img src="Language.png" class="img_card" alt="...">
          </div>
                    <h1 class="card-title_cat" '>${name}</h1>
                </div>`
        }
        $("#category").html(content);
      },
    error: function(error){
        alert("Something went wrong", error);
      }
    });
  }




  function categoryLoad(){
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

  function logIn(){
    event.preventDefault();
    var contact=document.querySelector('#contactLogIn').value;
    var password = document.querySelector('#passwordLogIn').value;
    var user ={};
    
    user["userName"] = contact;
    user["password"] = password;

    $.ajax({
      url: "http://localhost:8081/user/login",
      type: "POST",
      data: JSON.stringify(user),
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
    success: function (response, textStatus,request) {

        localStorage.setItem("user",response.response);
        window.location.href = "home.html";
    },
    error: function(error){
      alert("Invalid credentials, Check again!");
    }
    });
}

function register(){
  event.preventDefault();
    var email=document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var name = document.querySelector('#name').value;
    var contact = document.querySelector('#contact').value;
    var user ={};
    
    user["email"] = email;
    user["password"] = password;
    user["name"] = name;
    user["contact"] = contact;

    $.ajax({
      url: "http://localhost:8081/user/register",
      type: "POST",
      data: JSON.stringify(user),
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
    success: function (response, textStatus,request) {
        localStorage.setItem("user",response.response);
        window.location.href = "home.html";
    },
    error: function(error){
      alert("Something went wrong");
    }
    });
}


function profile(){
  window.location.href = "profile.html";
}



  function languageLoad(){
    $.ajax({
      url: "http://localhost:8081/language/all",
      type: "GET",
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        var ele = document.getElementById('lang');
        for (var i = 0; i < response.length; i++) {
          ele.innerHTML = ele.innerHTML +
          `<li ><a class="dropdown-item" onclick='viewSingleLanguage("${response[i].name}")'   href="#">${response[i].name}</a></li>
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
    
  }

  ///////////////////////////////////////category click///////////////////////////////////////
function viewSingleCategory(name){
  window.location.href = "category.html?category="+name;
  }
  
  ////////////////////////////////Language Click///////////////////////////////////////////
  
  function viewSingleLanguage(name){
  window.location.href = "language.html?language="+name;
  }
  