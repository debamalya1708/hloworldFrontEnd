window.addEventListener("load",function(event) {
    onClickAllVideos();
  },false);
  window.addEventListener("load",function(){
    onClickEvent();
  },false);
  window.addEventListener("load",function(event) {
    onClickEventPrint();
  },false);

  window.addEventListener("load",function(){
    check();
  },false);
function check(){
  var token=localStorage.getItem("user");
  $.ajax({
    url: "http://localhost:3000/api/v1/members",
    type: "GET",
    // headers: {"Authorization" : "Bearer "+token},
    contentType: 'application/json',
   headers: {
      'Authorization':token
   },
    //data: JSON.stringify(obj1),
    // dataType : 'json',
    // crossorigin: true,
    // crossDomain: true,
    // contentType:'application/json; charset=utf-8',
    success: function (response) {
      // console.log(response.data);
      document.getElementById("profile").style.display = "initial";
      document.getElementById("upload").style.display = "none";
      document.getElementById("profile").innerText = response.data.name;
    },
  error: function(error){
    console.log("Something went wrong", error);

    }
  });

}
function onClickAllVideos(){
    var category = getParameterByName("category");
  // console.log(category);
    // console.log("AllVideoSection");
    $.ajax({
      url: "http://localhost:3000/api/v1/all/category/"+category,
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        console.log(response);
        response = response.data
        document.querySelector("#categoryDisplay").innerText = category
        
        content="";
        for(var i=response.length-1;i>=0;i--){
            var img = response[i].thumbnail_image;
            var title = response[i].title;
            var userName = response[i].user.name;
            var date=response[i].created_at.slice(0, 10);
            var views = response[i].views;
            var id = response[i].id;
            // console.log(id);
            if(userName==null)
            {
              userName=" "
            }
    
            // content+='<div class="col-md-4 mt-3"><div class="card"><div class="card-body"><div class="card-img-actions"> <img src="'+img+'" class="card-img img-fluid" width="90" height="350" alt=""> </div></div><div class="card-body text-center"><div class="mb-2"><h3 class="font-weight-semibold mb-2"> <a href="#" class="text-default mb-2" data-abc="true">'+title+'</a> </h3> <a href="#" class="text-muted" data-abc="true">'+category+'</a></div><h5 class="mb-0 font-weight-semibold">IMDb: '+ratings+'</h5><button type="button" class="btn bg-cart"><i class="fa fa-cart-plus mr-2"></i>Watch Now</button></div></div></div>'
            content+=`<div class="col">
                              <div class="card" style="width: 18rem;">
                              <div class = "imgCard" onclick='viewSingleVideo(${response[i].id})'>
                                <img src="${img}" class="card-img-top" alt="...">
                                </div>
                                <div class="card-body">
                                  <h6 class="card-title" >${title}</h6>
                                  <p class="card-text" onclick='viewSpecifiedNamedVideo("${userName}")'>${userName}</p>
                                  <h6 id="views" class="card-title">${views} views •  ${date}</h6>
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

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function profile(){
  window.location.href = "profile.html";
}

function onClickEventPrint(){
    // console.log("category");
    $.ajax({
      url: "http://localhost:3000/api/v1/category",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        response = response.data
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
      url: "http://localhost:3000/api/v1/languages",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        response = response.data
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

  function viewSingleCategory(name){
    // console.log('category video view');
    window.location.href = "Category.html?category="+name;
    // console.log(name);
    }

    function viewSingleLanguage(name){
        // console.log('language video view');
        window.location.href = "Language.html?language="+name;
        // console.log(name);
        }
  