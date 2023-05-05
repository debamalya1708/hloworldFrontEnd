// function uploadVideo(){
//     event.preventDefault();
//     var title=document.querySelector('#video_title').value;
//     var thumbnail_image = document.querySelector('#thumbnail').value;
//     var video_file=document.querySelector('#video_file').value;
//     var category = document.querySelector('#category').value;
//     var language=document.querySelector('#language').value;
//     var description = document.querySelector('#desc').value;
//     var user ={};
//     var dic ={};

//     user["title"] = title;
//     user["thumbnail_image"] = thumbnail_image;
//     user["video_file"]=video_file;
//     user["category"] = category;
//     user["language"] = language;
//     user["description"] = description;
//     dic["video"]=user;
//     console.log(user);

// console.log(dic);
// var token=localStorage.getItem("user");
// $.ajax({
//     url: "http://localhost:8081/thumbnailImage/upload",
//     type: "POST",
//     data: JSON.stringify(dic),
//     crossorigin: true,
//     crossDomain: true,
//     headers: {
//         'Authorization':token
//      },
//     contentType:'application/json; charset=utf-8',
//   success: function (response) {

//       console.log(response)
//     //   alert("success");
//     //   console.log(request)
//     //   console.log(request.getResponseHeader('Authorization'));

//       // console.log(response.status.data.jti);
//     //   localStorage.setItem("user",request.getResponseHeader('Authorization'));
//       window.location.href = "home.html";
//   },
//   error: function(error){
//     alert("Something went wrong");
//   }
//   });
// }


$(document).ready(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    var token = localStorage.getItem("user");

    // upload();
    // function upload() {
    let formData = new FormData();
    formData.append("thumbnail_img", thumbnail.files[0]);
    // console.log(formData);
    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "http://localhost:8081/thumbnailImage/upload",
      data: formData,
      processData: false,
      headers: { "Authorization": "Bearer " + token },
      contentType: false,
      success: function (response) {
        let thumbnail_img = response;
        console.log(thumbnail_img);

        let formData = new FormData();
        formData.append("video_file", video.files[0]);
        console.log(formData.key);
        $.ajax({
          type: "POST",
          // headers: {"Authorization" : "Bearer "+token},
          enctype: 'multipart/form-data',
          url: "http://localhost:8081/file/movie/upload",
          data: formData,
          processData: false,
          contentType: false,
          headers: { "Authorization": "Bearer " + token },
          success: function (response) {
            let video_file = response;
            console.log(video_file);

            //////////All Submit///////////
            //
            // var formValues= $(this).serialize();
            // var obj = $(this).serializeArray().reduce((o,p) => ({...o, [p.name]: p.value}));
            // var obj1 = $('form').serializeJSON();
            var obj1 = {};
            // var uploaderName = document.querySelector('#uploader_name').value;
            var title = document.querySelector('#video_title').value;
            // var thumbnail_image = document.querySelector('#thumbnail').value;
            // var video_file = document.querySelector('#video_file').value;
            var category = document.querySelector('#category').value;
            var language = document.querySelector('#language').value;
            var description = document.querySelector('#desc').value;
            // var user = {};
            // var dic = {};

            obj1["title"] = title;
            obj1["category"] = category;
            obj1["language"] = language;
            obj1["description"] = description;
            obj1["thumbnailImg"] = thumbnail_img;
            obj1["videoFile"] = video_file;
            console.log(obj1);

            $.ajax({
              url: "http://localhost:8081/video/new",
              type: "POST",
              data: JSON.stringify(obj1),
              //dataType : 'json',
              headers: { "Authorization": "Bearer " + token },
              crossorigin: true,
              crossDomain: true,
              contentType: 'application/json; charset=utf-8',
              success: function (response) {
                console.log(response);
                window.location.href = "home.html";
              },
              error: function (error) {
                alert("Please Try Again...");
                console.log("Something went wrong", error);
              }
            });
          },
          error: function (e) {
            alert("Video Upload unsuccesful");
          }
        });

      },
      error: function (e) {
        alert("Image Upload unsuccesful");
      }
    });
  });
});


$(document).ready(function () {
  // var isFileDialogOpened = false;
  // var uploadFileType = "";

  // window.addEventListener("focus", function () {
  //   if (isFileDialogOpened) {
  //     isFileDialogOpened = false;
  //     setTimeout(() => {
  //       uploadFiles();
  //     }, 500);
  //   }
  // });

  // $("#thumbnail_box").click(function () {
  //   isFileDialogOpened = true;
  //   uploadFileType = "thumbnail";
  // });

  // $("#video_box").click(function () {
  //   isFileDialogOpened = true;
  //   uploadFileType = "video";
  // });

  // function uploadFiles() {
  //   // alert(uploadFileType);

  //   if (uploadFileType == "thumbnail") {
  //     if (document.querySelector("#thumbnail").files.length > 0) {
  //       // alert("Thumbnail selected");
  //       var url = window.URL.createObjectURL(
  //         document.querySelector("#thumbnail").files[0]
  //       );
  //       document.querySelector("#thumbnail").parentNode.firstElementChild.src =
  //         url;
  //         document.querySelector("#thumbnail").parentNode.children[1].lastElementChild.innerText = "Thumbnail Uploaded";
  //       // console.log(document.querySelector("#thumbnail").files[0]);
  //     } else {
  //       // alert("No Thumbnail selected");
  //       document.querySelector("#thumbnail").parentNode.firstElementChild.src =
  //         "";
  //         document.querySelector("#thumbnail").parentNode.children[1].lastElementChild.innerText = "Upload Thumbnail";
  //     }
  //   } else if (uploadFileType == "video") {
  //     if (document.querySelector("#video").files.length > 0) {
  //       // alert("video selected");
  //       var url = window.URL.createObjectURL(
  //         document.querySelector("#video").files[0]
  //       );
  //       document.querySelector("#video").parentNode.firstElementChild.src = url;
  //       document.querySelector("#video").parentNode.children[1].lastElementChild.innerText = "Video Uploaded";
  //       // console.log(document.querySelector('#video').files[0]);
  //     } else {
  //       // alert("No video selected");
  //       document.querySelector("#video").parentNode.firstElementChild.src = "";
  //       document.querySelector("#video").parentNode.children[1].lastElementChild.innerText = "Upload Video";
  //     }
  //   }
  // }

  // $("#upload_video_btn").click(function () {
  //   var isAnonymous = false;
  //   var uploader = "";

  //   document.querySelector("#uploader_name").classList.remove("err");
  //   document.querySelector("#video_title").classList.remove("err");
  //   document.querySelector("#desc").classList.remove("err");

  //   $("#err_mssg").text("");

  //   if ($("#anonymous").is(":checked")) {
  //     isAnonymous = true;
  //     uploader = "";
  //   } else {
  //     uploader = $("#uploader_name").val().trim();
  //     if (uploader.length <= 0) {
  //       document.querySelector("#uploader_name").classList.add("err");
  //       $("#err_mssg").text("Please Enter a Valid Name");
  //       return;
  //     }
  //   }

  // var videoTitle = $("#video_title").val().trim();
  // if (videoTitle.length <= 0) {
  //   document.querySelector("#video_title").classList.add("err");
  //   $("#err_mssg").text("Please Enter a Title for the Video");
  //   return;
  // } else if (videoTitle.length < 10) {
  //   document.querySelector("#video_title").classList.add("err");
  //   $("#err_mssg").text("The Video Title is too short (Min: 10 Chars)");
  //   return;
  // } else if (videoTitle.length > 100) {
  //   document.querySelector("#video_title").classList.add("err");
  //   $("#err_mssg").text("The Video Title is too Long (Max: 100 Chars)");
  //   return;
  // }

  // if (document.querySelector("#thumbnail").files.length <= 0) {
  //   $("#err_mssg").text("Please Upload Video Thumbnail");
  //   return;
  // }

  // if (document.querySelector("#video").files.length <= 0) {
  //   $("#err_mssg").text("Please Upload the Video");
  //   return;
  // }

  // var category = $("#category").val();
  // if (category == 0) {
  //   $("#err_mssg").text("Please Select the Video Category");
  //   return;
  // }

  // var language = $("#language").val();
  // if (language == 0) {
  //   $("#err_mssg").text("Please Select the Video Language");
  //   return;
  // }

  // var desc = $("#desc").val().trim();
  // if (desc.length <= 0) {
  //   document.querySelector("#desc").classList.add("err");
  //   $("#err_mssg").text("Please Enter a Description for the Video");
  //   return;
  // } else if (desc.length < 50) {
  //   document.querySelector("#desc").classList.add("err");
  //   $("#err_mssg").text("The Video Description is too short (Min: 50 Chars)");
  //   return;
  // }

  // uploadVideo(
  //   isAnonymous,
  //   uploader,
  //   videoTitle,
  //   category,
  //   language,
  //   desc
  // );
  // });

  var entered_name = "";
  $("#anonymous").change(function () {
    document.querySelector("#uploader_name").classList.remove("err");
    if ($(this).is(":checked")) {
      entered_name = $("#uploader_name").val();
      $("#uploader_name").prop("disabled", true);
      $("#uploader_name").val("Anonymous User");
    } else {
      $("#uploader_name").prop("disabled", false);
      $("#uploader_name").val(entered_name);
    }
  });

  // function uploadVideo(
  //   isAnonymous,
  //   uploader_name,
  //   videoTitle,
  //   category,
  //   language,
  //   desc
  // ) {
  //   let formData = new FormData();
  //   formData.append(
  //     "thumbnail_img",
  //     document.querySelector("#thumbnail").files[0]
  //   );
  //   // console.log(formData);
  //   $.ajax({
  //     type: "POST",
  //     enctype: "multipart/form-data",
  //     url: "http://localhost:8081/thumbnailImage/upload",
  //     data: formData,
  //     processData: false,
  //     contentType: false,
  //     success: function (response) {
  //       let thumbnail_img = response;
  //       console.log(thumbnail_img);

  //       let formData = new FormData();
  //       formData.append(
  //         "video_file",
  //         document.querySelector("#video").files[0]
  //       );
  //       console.log(formData.key);
  //       $.ajax({
  //         type: "POST",
  //         enctype: "multipart/form-data",
  //         url: "http://localhost:8081/video/upload",
  //         data: formData,
  //         processData: false,
  //         contentType: false,
  //         success: function (response) {
  //           let video_file = response;
  //           console.log(video_file);

  //           var today = new Date();
  //           var dd = String(today.getDate()).padStart(2, "0");
  //           var mm = String(today.getMonth() + 1).padStart(2, "0");
  //           var yyyy = today.getFullYear();

  //           today = yyyy + "-" + mm + "-" + dd;

  //           //////////All Submit///////////
  //           //
  //           // var formValues= $(this).serialize();
  //           // var obj = $(this).serializeArray().reduce((o,p) => ({...o, [p.name]: p.value}));
  //           var obj1 = new Object();
  //           obj1["thumbnail_img"] = thumbnail_img;
  //           obj1["video_file"] = video_file;
  //           obj1["views"] = 0;
  //           obj1["category"] = category;
  //           obj1["description"] = desc;
  //           obj1["language"] = language;
  //           obj1["name"] = uploader_name;
  //           obj1["title"] = videoTitle;
  //           obj1["upload_date"] = today;

  //           console.log(obj1);

  //           $.ajax({
  //             url: "http://localhost:8081/home/newVideo",
  //             type: "POST",
  //             data: JSON.stringify(obj1),
  //             //dataType : 'json',
  //             crossorigin: true,
  //             crossDomain: true,
  //             contentType: "application/json; charset=utf-8",
  //             success: function (response) {
  //               console.log(response);
  //               alert("Video Uploaded Successfully");
  //               window.location.href = "/";
  //             },
  //             error: function (error) {
  //               alert("Please Try Again...");
  //               console.log("Something went wrong", error);
  //             },
  //           });
  //         },
  //         error: function (e) {
  //           alert("Video Upload unsuccesful");
  //         },
  //       });
  //     },
  //     error: function (e) {
  //       alert("Image Upload unsuccesful");
  //     },
  //   });
  // }

  function getAllCategories() {
    $.ajax({
      url: "http://localhost:8081/category/all",
      type: "GET",
      dataType: "json",
      crossorigin: true,
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        response = response
        for (var i = 0; i < response.length; i++) {
          var title = response[i].name;

          var option = document.createElement("option");
          option.value = title;
          option.text = title;
          document.querySelector("#category").appendChild(option);
        }
      },
      error: function (error) {
        // alert("Something went wrong", error);
      },
    });
  }

  getAllCategories();

  function getAllLanguages() {
    $.ajax({
      url: "http://localhost:8081/language/all",
      type: "GET",
      dataType: "json",
      crossorigin: true,
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        response = response
        for (var i = 0; i < response.length; i++) {
          var title = response[i].name;
          var option = document.createElement("option");
          option.value = title;
          option.text = title;
          document.querySelector("#language").appendChild(option);
        }
      },
      error: function (error) { },
    });
  }

  getAllLanguages();
});
