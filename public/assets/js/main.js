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
    "url": "/entry/get",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem('token'),
    },
    "data": {
      "type": "Debit"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    $("tr").remove(".debit-tr");
    for(var i=0;i<response.length; i++){
      showDebitData(response[i]);
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
    "url": "/entry/add",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem('token')
    },
    "data": JSON.stringify({
      "type": "Debit",
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
      "file_url": debitFile,
      "date": date
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    debitDataShowAPI();
  })
  .fail(function (xhr, textStatus, errorThrown) {
    console.log(textStatus);
  });;

  

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


function  showCreditData(creditData) {
  
  var row = "<tr class ='credit-tr'>";
  var creditSL = $(".credit-tr").length;
  row +=
    "<td>" +
    creditData['_id'] +
    "</td>" +
    "<td>" +
    creditData['company'] +
    "</td>" +
    "<td>" +
    creditData['coco'] +
    "</td>" +
    "<td>" +
    creditData['site'] +
    "</td>" +
    "<td>" +
    creditData['person'] +
    "</td>" +
    "<td>" +
    creditData['department'] +
    "</td>" +
    "<td>" +
    creditData['cause'] +
    "</td>" +
    "<td>" +
    creditData['carrier'] +
    "</td>" +
    "<td>" +
    creditData['referBy'] +
    "</td>" +
    "<td>" +
    creditData['amount'] +
    "</td>" +
    "<td>" +
    creditData['otherCost'] +
    "</td>" +
    "<td class='credit-total-sum'>" +
    creditData['total'] +
    "</td>" +
    "<td>" +
    creditData['dena'] +
    "</td>" +
    "<td>" +
    creditData['paona'] +
    "</td>" +
    "<td>" +
    creditData['vara'] +
    "</td>" +
    "<td>" +
    creditData['warning'] +
    "</td>" +
    "<td>" +
    creditData['note'] +
    "</td>" +
    "<td>" +
    creditData['editedBy'] +
    "</td>" +
    "<td>" +
    creditData['file_url'] +
    "</td>" +
    "<td>" +
    "<i class='fas fa-pen' style='cursor: pointer;'></i>" +
    "<i class='fas fa-trash-alt remove-item-credit' style='padding-left: 8px; cursor: pointer;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".credit-table .credit-tbody").append(row);
}





function creditDataShowAPI(){
  var settings = {
    "url": "/entry/get",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem('token'),
    },
    "data": {
      "type": "Credit"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    $("tr").remove(".credit-tr");
    for(var i=0;i<response.length; i++){
      showCreditData(response[i]);
    }
    
  });
}
creditDataShowAPI();



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
  var creditDena = $("#crDena").val();
  var creditPaona = $("#crPaona").val();
  var creditVara = $("#crVara").val();
  var creditWarning = $("#crWarning").val();
  var creditNote = $("#crNote").val();
  var creditEditor = $("#crEdited-By").val();
  var creditFile = $("#credit-file-upload").val();



  var settings = {
    "url": "/entry/add",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem('token')
    },
    "data": JSON.stringify({
      "type": "Credit",
      "company": creditCompany,
      "coco": creditCO_CO,
      "site": creditSite,
      "person": creditPerson_Car,
      "department": creditDepartment,
      "cause": creditCause,
      "carrier": creditCarrier,
      "referBy": creditRefer,
      "amount": creditAmount, 
      "otherCost": creditOtherCost ,
      "total": creditTotal,
      "dena": creditDena,
      "paona": creditPaona,
      "vara": creditVara,
      "warning": creditWarning,
      "note": creditNote,
      "editedBy": creditEditor,
      "file_url": creditFile,
      "date": "12/11/2020"
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    creditDataShowAPI();
  })
  .fail(function (xhr, textStatus, errorThrown) {
    console.log(textStatus);
  });

  

  // var creditTotal = 0;
  // var ISAresult = 0;
  // var ISAvalue = parseFloat($(".ISA-value-today").text());

  // var creditTableSum = $(".credit-total-sum");
  // for (var i = 0; i < creditSL; i++) {
  //   creditTotal = creditTotal + parseFloat(creditTableSum[i].innerHTML);
  //   ISAresult = ISAvalue + parseFloat(creditTableSum[i].innerHTML);
  // }
  // $("#credit-sum").html(creditTotal);

  // console.log(ISAvalue);
  // $(".ISA-value-today").html(ISAresult);

  // console.log($(".debit-amount-sum"));
});

function  showAccountData(accountData) {
  var row = "<tr class ='add-account-tr'>";
  var accountSL = $(".add-account-tr").length;
  row +=
  
    "<td>" +
    accountSL +
    "</td>" +
    "<td>" +
    accountData['full_name'] +
    "</td>" +
    "<td>" +
    accountData['id'] +
    "</td>" +
    "<td>" +
    accountData['nid'] +
    "</td>" +
    "<td>" +
    accountData['blood_group'] +
    "</td>" +
    "<td>" +
    accountData['father_name'] +
    "</td>" +
    "<td>" +
    accountData['mother_name'] +
    "</td>" +
    "<td>" +
    accountData['parmanent_address'] +
    "</td>" +
    "<td>" +
    accountData['present_address'] +
    "</td>" +
    "<td>" +
    accountData['opening_date'] +
    "</td>" +
    "<td>" +
    accountData['closing_date'] +
    "</td>" +
    "<td>" +
    accountData['note'] +
    "</td>" +
    "<td>" +
    accountData['picture_url'] +
    "</td>" +
    "<td>" +
    accountData['created_by'] +
    "</td>" +
    "<td>" +
    "<i class='fas fa-pen' style='cursor: pointer;'></i>" +
    "<i class='fas fa-trash-alt remove-item-account' style='padding-left: 8px; cursor: pointer;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".add-account-table .add-account-tbody").append(row);
}

accountDataShowAPI();

function accountDataShowAPI(){
  var settings = {
    "url": "/account/get",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem('token'),
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    $("tr").remove(".add-account-tr");
    for(var i=0;i<response.length; i++){
      showAccountData(response[i]);
    }
    
  });
}

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

  console.log("Full name: "+accountFullname);

  var settings = {
    "url": "/account/add",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token"),
    },
    "data": JSON.stringify({
        "full_name": accountFullname,
        "id": accountID,
        "nid": accountNID,
        "blood_group": accountBloodGroup,
        "father_name": accountFatersName,
        "mother_name": accountMothersName,
        "parmanent_address": accountPermanentAddress,
        "present_address": accountPresentAddress,
        "opening_date": accountOpeningDate,
        "closing_date": accountClosingDate,
        "note": accountNote,
        "picture_url": accountPicture,
        "created_by": accountCreator,
        "date": "12/11/2020"
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    accountDataShowAPI();
  })
  .fail(function (xhr, textStatus, errorThrown) {
    console.log(textStatus);
  });
});



//Search API

function showSearchData(searchData) {
  var row = "<tr class ='search-data-tr'>";
  var searchSL = $(".search-data-tr").length;
  row +=
  
    "<td>" +
    searchSL +
    "</td>" +
    "<td>" +
    searchData['type'] +
    "</td>" +
    "<td>" +
    searchData['company'] +
    "</td>" +
    "<td>" +
    searchData['coco'] +
    "</td>" +
    "<td>" +
    searchData['site'] +
    "</td>" +
    "<td>" +
    searchData['person'] +
    "</td>" +
    "<td>" +
    searchData['department'] +
    "</td>" +
    "<td>" +
    searchData['cause'] +
    "</td>" +
    "<td>" +
    searchData['carrier'] +
    "</td>" +
    "<td>" +
    searchData['referBy'] +
    "</td>" +
    "<td>" +
    searchData['amount'] +
    "</td>" +
    "<td>" +
    searchData['otherCost'] +
    "</td>" +
    "<td class='credit-total-sum'>" +
    searchData['total'] +
    "</td>" +
    "<td>" +
    searchData['dena'] +
    "</td>" +
    "<td>" +
    searchData['paona'] +
    "</td>" +
    "<td>" +
    searchData['vara'] +
    "</td>" +
    "<td>" +
    searchData['vara'] + 
    "</td>" +
    "<td>" +
    searchData['warning'] +
    "</td>" +
    "<td>" +
    searchData['note'] +
    "</td>" +
    "<td>" +
    searchData['file_url'] +
    "</td>" +
    "<td>" +
    searchData['editedBy'] +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".search-data-table .search-data-tbody").append(row);
}


function showSearchDataAPI() {
  
var settings = {
  "url": "/entry/getall",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": sessionStorage.getItem("token"),
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
  $("tr").remove(".search-data-tr");
    for(var i=0;i<response.length; i++){
      showSearchData(response[i]);
    }
});
}

showSearchDataAPI();