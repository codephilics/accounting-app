$(function () {
  $('input,textarea').focus(function () {
      $(this).data('placeholder', $(this).attr('placeholder'))
             .attr('placeholder', '');
  }).blur(function () {
      $(this).attr('placeholder', $(this).data('placeholder'));
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").css(
        "background-image",
        "url(" + e.target.result + ")"
      );
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});

  $('#serach-access-button').on("click", function (){
    var pass = $('.password-input').val();

    if(pass == "123"){
      $('.searchPortal').css("display","block");
      $('.search-password').css("display","none");

    }else{
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Wrong Password",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  });


$("#signin").click( function (){
    console.log("Sign in clicked");

    var settings = {
      url: "/auth/login",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: $("#user-name").val(),
        password: $("#password").val(),
      }),
    };
  
    $.ajax(settings)
      .done(function (response) {
        console.log(response);
        sessionStorage.setItem('token',response);
        window.location.replace("/home");
      })
      .fail(function (xhr, textStatus, errorThrown) {
        console.log(textStatus);
      });
});

if (window.location.pathname == "/home"){
  isAuthenticate();  
}


function isAuthenticate() {
  var settings = {
    "url": "/auth/info",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": sessionStorage.getItem('token')
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  })
  .fail(function (xhr, textStatus, errorThrown) {
    console.log(textStatus);
    window.location.replace("/");
  });
}


 