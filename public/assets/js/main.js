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


$("#debit-file-upload").change(function () {
  var filepath = this.value;
  var m = filepath.match(/([^\/\\]+)$/);
  var filename = m[1];
  $("#debit-filename").html(filename);
});

$("#credit-file-upload").change(function () {
  var filepath = this.value;
  var m = filepath.match(/([^\/\\]+)$/);
  var filename = m[1];
  $("#credit-filename").html(filename);
});

// Show debit data
function  showDebitData(debitData) {
  
  var row = "<tr class ='debit-tr'>";

  var debitSL = $(".debit-tr").length;
  function updateDebitSL(currentDebitSL) {
    currentDebitSL = debitSL;

    return currentDebitSL;
  }
  row +=
    "<td>" +
    updateDebitSL(debitSL) +
    "</td>" +
    "<td>" +
    debitData['company'] +
    "</td>" +
    "<td>" +
    debitData['coco'] +
    "</td>" +
    "<td>" +
    debitData['site'] +
    "</td>" +
    "<td>" +
    debitData['person'] +
    "</td>" +
    "<td>" +
    debitData['department'] +
    "</td>" +
    "<td>" +
    debitData['cause'] +
    "</td>" +
    "<td>" +
    debitData['carrier'] +
    "</td>" +
    "<td>" +
    debitData['referBy'] +
    "</td>" +
    "<td>" +
    debitData['amount'] +
    "</td>" +
    "<td>" +
    debitData['otherCost'] +
    "</td>" +
    "<td class='debit-total-sum'>" +
    debitData['total'] +
    "</td>" +
    "<td>" +
    debitData['dena'] +
    "</td>" +
    "<td>" +
    debitData['paona'] +
    "</td>" +
    "<td>" +
    debitData['vara'] +
    "</td>" +
    "<td>" +
    debitData['warning'] +
    "</td>" +
    "<td>" +
    debitData['note'] +
    "</td>" +
    "<td>" +
    debitData['editedBy'] +
    "</td>" +
    "<td>" +
    debitData['file_url'] +
    "</td>" +
    "<td>" +
    "<i class='fas fa-pen edit-item-debit' data-toggle='modal' data-target='#debit-edit-modal' style='cursor: pointer;'></i>" +
    "<i class='fas fa-trash-alt remove-item-debit' style='padding-left: 8px; cursor: pointer;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".debit-table .debit-tbody").append(row);
}

function debitDataShowAPI(){
  var settings = {
    "url": "/debit/get",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem('token'),
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);

    for(var i=0;i<response.length; i++){
      showDebitData(response[i]);
      console.log(response[i]);
    }
    
  });
}
debitDataShowAPI();

// debit table insertation
$("#debit-submit").on("click", function (event) {
  event.preventDefault();
  var debitCompany = $("#dCompany").val();
  var debitCO_CO = $("#dCO_CO").val();
  var debitSite = $("#dSite").val();
  var debitPerson_Car = $("#dPerson-Car-Who-will-Get").val();
  var debitDepartment = $("#dDepartment").val();
  var debitCause = $("#dCause").val();
  var debitCarrier = $("#dCarrier-Driver").val();
  var debitRefer = $("#dRefer-By").val();
  var debitAmount = $("#dAmount").val();
  var debitOtherCost = $("#dOther-Cost").val();
  var debitTotal = $("#dTotal").val();
  var debitDena = $("#dDena").val();
  var debitPaona = $("#dPaona").val();
  var debitVara = $("#dVara").val();
  var debitWarning = $("#dWarning").val();
  var debitNote = $("#dNote").val();
  var debitEditor = $("#dEdited-By").val();
  var debitFile = $("#debit-file-upload").val();
  var date = "12/11/2020";
  
  var settings = {
    "url": "/debit/add",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem('token')
    },
    "data": JSON.stringify({
      "company": debitCompany,
      "coco": debitCO_CO,
      "site": debitSite,
      "person": debitPerson_Car,
      "department": debitDepartment,
      "cause": debitCause,
      "carrier": debitCarrier,
      "referBy": debitRefer,
      "amount": debitAmount, 
      "otherCost": debitOtherCost ,
      "total": debitTotal,
      "dena": debitDena,
      "paona": debitPaona,
      "vara": debitVara,
      "warning": debitWarning,
      "note": debitNote,
      "editedBy": debitEditor,
      "file_url": "https://avatars3.githubusercontent.com/u/21359492?s=60&v=4",
      "date": "12/11/2020"
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    debitDataShowAPI();
  })
  .fail(function (xhr, textStatus, errorThrown) {
    console.log(textStatus);
  });;

  

  // var row = "<tr class ='debit-tr'>";

  // var debitSL = $(".debit-tr").length;
  // function updateDebitSL(currentDebitSL) {
  //   currentDebitSL = debitSL;

  //   return currentDebitSL;
  // }
  // row +=
  //   "<td>" +
  //   updateDebitSL(debitSL) +
  //   "</td>" +
  //   "<td>" +
  //   debitCompany +
  //   "</td>" +
  //   "<td>" +
  //   debitCO_CO +
  //   "</td>" +
  //   "<td>" +
  //   debitSite +
  //   "</td>" +
  //   "<td>" +
  //   debitPerson_Car +
  //   "</td>" +
  //   "<td>" +
  //   debitDepartment +
  //   "</td>" +
  //   "<td>" +
  //   debitCause +
  //   "</td>" +
  //   "<td>" +
  //   debitCarrier +
  //   "</td>" +
  //   "<td>" +
  //   debitRefer +
  //   "</td>" +
  //   "<td>" +
  //   debitAmount +
  //   "</td>" +
  //   "<td>" +
  //   debitOtherCost +
  //   "</td>" +
  //   "<td class='debit-total-sum'>" +
  //   debitTotal +
  //   "</td>" +
  //   "<td>" +
  //   debitDena +
  //   "</td>" +
  //   "<td>" +
  //   debitPaona +
  //   "</td>" +
  //   "<td>" +
  //   debitVara +
  //   "</td>" +
  //   "<td>" +
  //   debitWarning +
  //   "</td>" +
  //   "<td>" +
  //   debitNote +
  //   "</td>" +
  //   "<td>" +
  //   debitEditor +
  //   "</td>" +
  //   "<td>" +
  //   debitFile +
  //   "</td>" +
  //   "<td>" +
  //   "<i class='fas fa-pen edit-item-debit' data-toggle='modal' data-target='#debit-edit-modal' style='cursor: pointer;'></i>" +
  //   "<i class='fas fa-trash-alt remove-item-debit' style='padding-left: 8px; cursor: pointer;'></i>" +
  //   "</td>";
  // row += "</tr>";

  // console.debug(row);

  // $(".debit-table .debit-tbody").append(row);

  // var total = 0;
  // var ISAresult = 0;
  // var ISAvalue = parseFloat($(".ISA-value-today").text());

  // var debitTableSum = $(".debit-total-sum");
  // for (var i = 0; i < debitSL; i++) {
  //   total = total + parseFloat(debitTableSum[i].innerHTML);
  //   ISAresult = ISAvalue - parseFloat(debitTableSum[i].innerHTML);
  // }
  // $("#debit-sum").html(total);

  // console.log(ISAvalue);
  // $(".ISA-value-today").html(ISAresult);
  // console.log($(".debit-amount-sum"));

  // console.log($(".debit-tr"));

  // $(".debit-tr").on("click", ".remove-item-debit", function () {
  //   console.log("hello");
  //   $(this).closest("tr").remove();
  //   debitSL--;
  //   console.log(debitSL);
  //   updateDebitSL(debitSL);
  // });


});



// credit table insertation

$("#credit-submit").on("click", function (event) {
  event.preventDefault();
  var creditCompany = $("#crCompany").val();
  var creditCO_CO = $("#crCO_CO").val();
  var creditSite = $("#crSite").val();
  var creditPerson_Car = $("#crPerson-Car-Who-will-Get").val();
  var creditDepartment = $("#crDepartment").val();
  var creditCause = $("#crCause").val();
  var creditCarrier = $("#crCarrier-Driver").val();
  var creditRefer = $("#crRefer-By").val();
  var creditAmount = $("#crAmount").val();
  var creditOtherCost = $("#crOther-Cost").val();
  var creditTotal = $("#crTotal").val();
  var creditDue = $("#crDue").val();
  var creditInvest = $("#crInvest").val();
  var creditNote = $("#crNote").val();
  var creditEditor = $("#crEdited-By").val();
  var creditFile = $("#credit-file-upload").val();

  var row = "<tr class ='credit-tr'>";
  var creditSL = $(".credit-tr").length;
  row +=
    "<td>" +
    creditSL +
    "</td>" +
    "<td>" +
    creditCompany +
    "</td>" +
    "<td>" +
    creditCO_CO +
    "</td>" +
    "<td>" +
    creditSite +
    "</td>" +
    "<td>" +
    creditPerson_Car +
    "</td>" +
    "<td>" +
    creditDepartment +
    "</td>" +
    "<td>" +
    creditCause +
    "</td>" +
    "<td>" +
    creditCarrier +
    "</td>" +
    "<td>" +
    creditRefer +
    "</td>" +
    "<td>" +
    creditAmount +
    "</td>" +
    "<td>" +
    creditOtherCost +
    "</td>" +
    "<td class='credit-total-sum'>" +
    creditTotal +
    "</td>" +
    "<td>" +
    creditDue +
    "</td>" +
    "<td>" +
    creditInvest +
    "</td>" +
    "<td>" +
    creditNote +
    "</td>" +
    "<td>" +
    creditEditor +
    "</td>" +
    "<td>" +
    creditFile +
    "</td>" +
    "<td>" +
    "<i class='fas fa-pen' style='cursor: pointer;'></i>" +
    "<i class='fas fa-trash-alt remove-item-credit' style='padding-left: 8px; cursor: pointer;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".credit-table .credit-tbody").append(row);

  var creditTotal = 0;
  var ISAresult = 0;
  var ISAvalue = parseFloat($(".ISA-value-today").text());

  var creditTableSum = $(".credit-total-sum");
  for (var i = 0; i < creditSL; i++) {
    creditTotal = creditTotal + parseFloat(creditTableSum[i].innerHTML);
    ISAresult = ISAvalue + parseFloat(creditTableSum[i].innerHTML);
  }
  $("#credit-sum").html(creditTotal);

  console.log(ISAvalue);
  $(".ISA-value-today").html(ISAresult);

  console.log($(".debit-amount-sum"));
});

$("#create-account-button").on("click", function (event) {
  event.preventDefault();
  var accountFullname = $("#acFull-Name").val();
  var accountID = $("#acID").val();
  var accountNID = $("#acNID").val();
  var accountBloodGroup = $("#acBlood-Group").val();
  var accountFatersName = $("#acFathers-Name").val();
  var accountMothersName = $("#acMothers-Name").val();
  var accountPermanentAddress = $("#acPermanent-Address").val();
  var accountPresentAddress = $("#acPresent-Address").val();
  var accountOpeningDate = $("#acOpening-Date").val();
  var accountClosingDate = $("#acClosing-Date").val();
  var accountNote = $("#acNote").val();
  var accountPicture = $("#imagePreview").val();
  var accountCreator = $("#acCreated-By").val();

  var row = "<tr class ='add-account-tr'>";
  var accountSL = $(".add-account-tr").length;
  row +=
    "<td>" +
    accountSL +
    "</td>" +
    "<td>" +
    accountFullname +
    "</td>" +
    "<td>" +
    accountID +
    "</td>" +
    "<td>" +
    accountNID +
    "</td>" +
    "<td>" +
    accountBloodGroup +
    "</td>" +
    "<td>" +
    accountFatersName +
    "</td>" +
    "<td>" +
    accountMothersName +
    "</td>" +
    "<td>" +
    accountPermanentAddress +
    "</td>" +
    "<td>" +
    accountPresentAddress +
    "</td>" +
    "<td>" +
    accountOpeningDate +
    "</td>" +
    "<td>" +
    accountClosingDate +
    "</td>" +
    "<td>" +
    accountNote +
    "</td>" +
    "<td>" +
    "<img class='profileCellImage' width='100%' height='50%' src='http://dummyimage.com/68x68/000/fff' />" +
    "</td>" +
    "<td>" +
    accountCreator +
    "</td>" +
    "<td>" +
    "<i class='fas fa-pen' style='cursor: pointer;'></i>" +
    "<i class='fas fa-trash-alt remove-item-account' style='padding-left: 8px; cursor: pointer;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".add-account-table .add-account-tbody").append(row);
});