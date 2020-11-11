$(function () {
  $("input,textarea")
    .focus(function () {
      $(this)
        .data("placeholder", $(this).attr("placeholder"))
        .attr("placeholder", "");
    })
    .blur(function () {
      $(this).attr("placeholder", $(this).data("placeholder"));
    });
});

$(function () {
  $("#serach-access-button").on("click", function () {
    var pass = $(".password-input").val();
    if (pass == "123") {
      $(".searchPortal").css("display", "block");
      $(".search-password").css("display", "none");
    } else {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Wrong Password",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  });

  $(".password-input").keypress(function (e) {
    var key = e.which;
    if (key == 13) {
      $("#serach-access-button").click();
      return false;
    }
  });
});

$("#signin").click(function () {
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
      sessionStorage.setItem("token", response);
      window.location.replace("/home");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      });
    
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Wrong Credentials'
      });
    });
});

if (window.location.pathname == "/home") {
  isNotAuthenticate();
} else if (window.location.pathname == "/") {
  isAuthenticate();
}

function isNotAuthenticate() {
  var settings = {
    url: "/auth/info",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      accountDataShowAPI();
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
      window.location.replace("/");
    });
}

function isAuthenticate() {
  var settings = {
    url: "/auth/info",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      window.location.replace("/home");
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
}

function isNull(data) {
  if(data){
    return data;
  }else{
    return "";
  }
}

// Show debit data
function showDebitData(debitData) {
  var row = "<tr class ='debit-tr'>";

  var debitTableTotal = isNull(debitData["amount"]) + isNull(debitData["otherCost"]);
  var debitSL = $(".debit-tr").length + 1;
  row +=
    "<td>" +
    debitSL +
    "</td>" +
    "<td>" +
    isNull(debitData["company"])+
    "</td>" +
    "<td>" +
    isNull(debitData["coco"])  +
    "</td>" +
    "<td>" +
    isNull(debitData["site"])  +
    "</td>" +
    "<td>" +
    isNull(debitData["person"])  +
    "</td>" +
    "<td>" +
    isNull(debitData["department"])  +
    "</td>" +
    "<td>" +
    isNull(debitData["cause"])  +
    "</td>" +
    "<td>" +
    isNull(debitData["carrier"])  +
    "</td>" +
    "<td>" +
    isNull(debitData["referBy"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["quantity"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["amount"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["otherCost"]) +
    "</td>" +
    "<td class='debit-total-sum'>" +
    debitTableTotal +
    "</td>" +
    "<td>" +
    isNull(debitData["dena"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["paona"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["vara"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["warning"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["note"]) +
    "</td>" +
    "<td>" +
    isNull(debitData["editedBy"]) +
    "</td>" +
    "<td>" +
    " <i class='fas fa-pen' id='debit-edit-button' onClick = 'debitEditButton(\"" +
    isNull(debitData["_id"]) +
    '", "' +
    isNull(debitData["company"]) +
    '", "' +
    isNull(debitData["coco"]) +
    '", "' +
    isNull(debitData["site"]) +
    '", "' +
    isNull(debitData["person"]) +
    '", "' +
    isNull(debitData["department"]) +
    '", "' +
    isNull(debitData["cause"]) +
    '", "' +
    isNull(debitData["carrier"]) +
    '", "' +
    isNull(debitData["referBy"]) +
    '", "' +
    isNull(debitData["amount"]) +
    '", "' +
    isNull(debitData["otherCost"]) +
    '", "' +
    isNull(debitData["total"]) +
    '", "' +
    isNull(debitData["dena"]) +
    '", "' +
    isNull(debitData["paona"]) +
    '", "' +
    isNull(debitData["vara"]) +
    '", "' +
    isNull(debitData["warning"]) +
    '", "' +
    isNull(debitData["note"]) +
    '", "' +
    isNull(debitData["editedBy"]) +
    "\")' data-toggle='modal' data-target='#debit-edit-modal' style='cursor: pointer; color: #43a2d9;'></i>" +
    "<i class='fas fa-trash-alt' onClick = 'deleteEntryApi(\"" +
    isNull(debitData["_id"]) +
    "\")' style='padding-left: 8px; cursor: pointer; color: red;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".debit-table .debit-tbody").append(row);
}

var entryData = {};

function entryDataShowAPI() {
  var settings = {
    url: "/entry/get",
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    entryData = response;
    $("tr").remove(".debit-tr");
    $("tr").remove(".credit-tr");
    date = $(".entryDate").val();
    date = reformDateFormat(date);
    previousDay = getPreviousDay(date);
    
    var pDate = new Date(previousDay);

    var preCreditTotal=0, preDebitTotal=0;
    var creditTotal = 0, debitTotal = 0;
    for (var i = 0; i < response.length; i++) {
      if (date == response[i]["date"]) {
        if (response[i]["type"] == "Debit") {
          showDebitData(response[i]);
          debitTotal=debitTotal+response[i]["amount"]+response[i]["otherCost"];
        } else {
          showCreditData(response[i]);
          creditTotal=creditTotal+response[i]["amount"]+response[i]["otherCost"];
        }

      }
      var d =  new Date(response[i]["date"]);
      if(pDate.getTime() >= d.getTime()){
        console.log("Pre : "+response[i]["total"]);
        if (response[i]["type"] == "Debit") {
          preDebitTotal=preDebitTotal+response[i]["amount"]+response[i]["otherCost"];      
        } else {
          preCreditTotal=preCreditTotal+response[i]["amount"]+response[i]["otherCost"];
        }
      }

    }

    $("#debit-sum").html(debitTotal);

    var preTotal = preCreditTotal - preDebitTotal;
    $(".ISA-value-last-day-headline").html(preTotal);


    $("#credit-sum").html(creditTotal+preTotal);
    $(".ISA-value-last-day").html(preTotal);
    $(".ISA-value-today").html(creditTotal-debitTotal+preTotal);
  });
}

function dateFilterEntryData() {
  $("tr").remove(".debit-tr");
  $("tr").remove(".credit-tr");
  for (var i = 0; i < entryData.length; i++) {
    date = $(".entryDate").val();
    date = reformDateFormat(date);
    if (date.length != 0 && date == entryData[i]["date"]) {
      if (entryData[i]["type"] == "Debit") {
        showDebitData(entryData[i]);
      } else {
        showCreditData(entryData[i]);
      }
    }
  }
}

// debit table insertation
$("#dEdited-By").keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    $("#debit-submit").click();
    return false;
  }
});

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
  var debitQuantity = $("#dQuantity").val();
  var debitAmount = $("#dAmount").val();
  var debitOtherCost = $("#dOther-Cost").val();
  var debitDena = $("#dDena").val();
  var debitPaona = $("#dPaona").val();
  var debitVara = $("#dVara").val();
  var debitWarning = $("#dWarning").val();
  var debitNote = $("#dNote").val();
  var debitEditor = $("#dEdited-By").val();
  var date = $(".entryDate").val(); 
  date = reformDateFormat(date);
  var settings = {
    url: "/entry/add",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: JSON.stringify({
      type: "Debit",
      company: debitCompany,
      coco: debitCO_CO,
      site: debitSite,
      person: debitPerson_Car,
      department: debitDepartment,
      cause: debitCause,
      carrier: debitCarrier,
      referBy: debitRefer,
      quantity : debitQuantity,
      amount: debitAmount,
      otherCost: debitOtherCost,
      dena: debitDena,
      paona: debitPaona,
      vara: debitVara,
      warning: debitWarning,
      note: debitNote,
      editedBy: debitEditor,
      date: date,
      time: new Date().toLocaleTimeString()
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      entryDataShowAPI();
      showSearchDataAPI();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Successfully Recorded',
        showConfirmButton: false,
        timer: 1500
      });
      $('#debitForm').modal('hide');
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
      Swal.fire({
        icon: "error",
        title: "Wrong Data Entry",
        text: "Enter Your Entries Correctly",
        showConfirmButton: false,
        timer: 3000,
      });
    });
});

function deleteEntryApi(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      var settings = {
        url: "/entry/remove",
        method: "DELETE",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        data: JSON.stringify({ id: id }),
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
        console.log("Deleted Entry");
        entryDataShowAPI();
        showSearchDataAPI();
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

function showCreditData(creditData) {
  var row = "<tr class ='credit-tr'>";
  var creditSL = $(".credit-tr").length + 1;
  var creditTableTotal = isNull(creditData["amount"]) + isNull(creditData["otherCost"]);

  row +=
    "<td>" +
    creditSL +
    "</td>" +
    "<td>" +
    isNull(creditData["company"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["coco"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["site"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["person"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["department"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["cause"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["carrier"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["referBy"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["quantity"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["amount"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["otherCost"]) +
    "</td>" +
    "<td class='credit-total-sum'>" +
    creditTableTotal +
    "</td>" +
    "<td>" +
    isNull(creditData["dena"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["paona"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["vara"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["warning"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["note"]) +
    "</td>" +
    "<td>" +
    isNull(creditData["editedBy"]) +
    "</td>" +
    "<td>" +
    " <i class='fas fa-pen' id='credit-edit-button' onClick = 'creditEditButton(\"" +
    isNull(creditData["_id"]) +
    '", "' +
    isNull(creditData["company"]) +
    '", "' +
    isNull(creditData["coco"]) +
    '", "' +
    isNull(creditData["site"]) +
    '", "' +
    isNull(creditData["person"]) +
    '", "' +
    isNull(creditData["department"]) +
    '", "' +
    isNull(creditData["cause"]) +
    '", "' +
    isNull(creditData["carrier"]) +
    '", "' +
    isNull(creditData["referBy"]) +
    '", "' +
    isNull(creditData["amount"]) +
    '", "' +
    isNull(creditData["otherCost"]) +
    '", "' +
    isNull(creditData["total"]) +
    '", "' +
    isNull(creditData["dena"]) +
    '", "' +
    isNull(creditData["paona"]) +
    '", "' +
    isNull(creditData["vara"]) +
    '", "' +
    isNull(creditData["warning"]) +
    '", "' +
    isNull(creditData["note"]) +
    '", "' +
    isNull(creditData["editedBy"]) +
    "\")' data-toggle='modal' data-target='#credit-edit-modal' style='cursor: pointer; color: #43a2d9;'></i>" +
    "<i class='fas fa-trash-alt' onClick = 'deleteEntryApi(\"" +
    isNull(creditData["_id"]) +
    "\")' style='padding-left: 8px; cursor: pointer; color: red;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".credit-table .credit-tbody").append(row);
}

// credit table insertation

$("#crEdited-By").keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    $("#credit-submit").click();
    return false;
  }
});

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
  var creditQuantity = $("#crQuantity").val();
  var creditAmount = $("#crAmount").val();
  var creditOtherCost = $("#crOther-Cost").val();
  var creditDena = $("#crDena").val();
  var creditPaona = $("#crPaona").val();
  var creditVara = $("#crVara").val();
  var creditWarning = $("#crWarning").val();
  var creditNote = $("#crNote").val();
  var creditEditor = $("#crEdited-By").val();
  var date = $(".entryDate").val();
  date = reformDateFormat(date);
  var settings = {
    url: "/entry/add",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: JSON.stringify({
      type: "Credit",
      company: creditCompany,
      coco: creditCO_CO,
      site: creditSite,
      person: creditPerson_Car,
      department: creditDepartment,
      cause: creditCause,
      carrier: creditCarrier,
      referBy: creditRefer,
      quantity: creditQuantity,
      amount: creditAmount,
      otherCost: creditOtherCost,
      dena: creditDena,
      paona: creditPaona,
      vara: creditVara,
      warning: creditWarning,
      note: creditNote,
      editedBy: creditEditor,
      date: date,
      time: new Date().toLocaleTimeString()
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      entryDataShowAPI();
      showSearchDataAPI();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Successfully Recorded',
        showConfirmButton: false,
        timer: 1500
      });
      $('#creditForm').modal('hide');
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
      Swal.fire({
        icon: "error",
        title: "Wrong Data Entry",
        text: "Enter Your Entries Correctly",
        showConfirmButton: false,
        timer: 3000,
      });
      
    });
});


function showAccountData(accountData) {
  var row = "<tr class ='add-account-tr'>";
  var accountSL = $(".add-account-tr").length + 1;
  row +=
    "<td>" +
    accountSL +
    "</td>" +
    "<td>" +
    accountData["full_name"] +
    "</td>" +
    "<td>" +
    accountData["id"] +
    "</td>" +
    "<td>" +
    accountData["nid"] +
    "</td>" +
    "<td>" +
    accountData["blood_group"] +
    "</td>" +
    "<td>" +
    accountData["father_name"] +
    "</td>" +
    "<td>" +
    accountData["mother_name"] +
    "</td>" +
    "<td>" +
    accountData["parmanent_address"] +
    "</td>" +
    "<td>" +
    accountData["present_address"] +
    "</td>" +
    "<td>" +
    accountData["opening_date"] +
    "</td>" +
    "<td>" +
    accountData["closing_date"] +
    "</td>" +
    "<td>" +
    accountData["note"] +
    "</td>" +
    "<td>" +
    accountData["created_by"] +
    "</td>" +
    "<td>" +
    "<i class='fas fa-pen' id='account-edit-button' onClick = 'accountEditButton(\"" +
    accountData["_id"] +
    '", "' +
    accountData["full_name"] +
    '", "' +
    accountData["id"] +
    '", "' +
    accountData["nid"] +
    '", "' +
    accountData["blood_group"] +
    '", "' +
    accountData["father_name"] +
    '", "' +
    accountData["mother_name"] +
    '", "' +
    accountData["parmanent_address"] +
    '", "' +
    accountData["present_address"] +
    '", "' +
    accountData["opening_date"] +
    '", "' +
    accountData["closing_date"] +
    '", "' +
    accountData["note"] +
    '", "' +
    accountData["created_by"] +
    "\")' data-toggle='modal' data-target='#edit-AccountForm' style='cursor: pointer; color: #43a2d9;'></i>" +
    "<i class='fas fa-trash-alt' onClick = 'deleteAccountAPI(\"" +
    accountData["_id"] +
    "\")' style='padding-left: 8px; cursor: pointer; color: red;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);
  $(".add-account-table .add-account-tbody").append(row);
  
  $("#dCompany").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dCO_CO").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dSite").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dPerson-Car-Who-will-Get").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dDepartment").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dCause").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dCarrier-Driver").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dRefer-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#dEdited-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));

  $("#crCompany").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crCO_CO").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crSite").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crPerson-Car-Who-will-Get").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crDepartment").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crCause").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crCarrier-Driver").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crRefer-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#crEdited-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));

  $("#d-edit-Company").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-CO_CO").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-Site").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-Person-Car-Who-will-Get").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-Department").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-Cause").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-Carrier-Driver").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-Refer-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#d-edit-Edited-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  
  $("#c-edit-Company").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-CO_CO").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-Site").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-Person-Car-Who-will-Get").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-Department").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-Cause").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-Carrier-Driver").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-Refer-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
  $("#c-edit-Edited-By").append($("<option>").text(accountData["full_name"]).val(accountData["full_name"]));
}
var accountData = [];
function accountDataShowAPI() {
  var settings = {
    url: "/account/get",
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    accountData = response;
    $("tr").remove(".add-account-tr");
    for (var i = 0; i < response.length; i++) {
      showAccountData(response[i]);
    }
    
    entryDataShowAPI();
    showSearchDataAPI();
  });
}

function deleteAccountAPI(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      var settings = {
        url: "/account/remove",
        method: "DELETE",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        data: JSON.stringify({ id: id }),
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
        accountDataShowAPI();
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

// add account table insertation

$("#acCreated-By").keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    $("#create-account-button").click();
    return false;
  }
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
  var accountCreator = $("#acCreated-By").val();

  console.log("Full name: " + accountFullname);

  var settings = {
    url: "/account/add",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: JSON.stringify({
      full_name: accountFullname,
      id: accountID,
      nid: accountNID,
      blood_group: accountBloodGroup,
      father_name: accountFatersName,
      mother_name: accountMothersName,
      parmanent_address: accountPermanentAddress,
      present_address: accountPresentAddress,
      opening_date: accountOpeningDate,
      closing_date: accountClosingDate,
      note: accountNote,
      created_by: accountCreator,
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      accountDataShowAPI();
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
});

//Search API

function showSearchData(searchData) {
  var row =
    "<tr class ='search-data-tr' data-type='" +
    searchData["type"].toLowerCase() +
    "' data-site='" +
    searchData["site"].toLowerCase() +
    "' data-person='" +
    searchData["person"].toLowerCase() +
    "' data-department='" +
    searchData["department"].toLowerCase() +
    "' data-cause='" +
    searchData["cause"].toLowerCase() +
    "' data-carrier='" +
    searchData["carrier"].toLowerCase() +
    "' data-refer='" +
    searchData["referBy"].toLowerCase() +
    "' data-edited='" +
    searchData["editedBy"].toLowerCase() +
    "' data-search_amount='" +
    searchData["amount"] +
    "'>";
  var searchSL = $(".search-data-tr").length + 1;

  

  
  var drAmount = isNull(searchData["amount"]);
  var crAmount = isNull(searchData["amount"]);
  if(searchData["type"]=='Debit'){
    crAmount = 0;
  }else{
    drAmount = 0;
  }

  

  var searchBalance =
  crAmount +
  isNull(searchData["dena"]) -
  (isNull(searchData["total"]) + isNull(searchData["paona"]));

  var searchTableTotal = drAmount + crAmount + isNull(searchData["otherCost"]);

  row +=
    "<td>" +
    searchSL +
    "</td>" +
    "<td>" +
    isNull(searchData["type"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["company"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["coco"]) +
    "</td>" +
    "<td id='site-data'>" +
    isNull(searchData["site"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["person"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["department"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["cause"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["carrier"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["referBy"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["quantity"]) +
    "</td>" +
    "<td id='0'>" +
    drAmount +
    "</td>" +
    "<td id='0'>" +
    crAmount +
    "</td>" +
    "<td>" +
    isNull(searchData["otherCost"]) +
    "</td>" +
    "<td id='search-total'>" +
    searchTableTotal +
    "</td>" +
    "<td id='search-dena'>" +
    isNull(searchData["dena"]) +
    "</td>" +
    "<td id='search-paona'>" +
    isNull(searchData["paona"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["vara"]) +
    "</td>" +
    "<td>" +
    searchBalance +
    "</td>" +
    "<td>" +
    isNull(searchData["warning"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["note"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["date"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["time"]) +
    "</td>" +
    "<td>" +
    isNull(searchData["editedBy"]) +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".search-data-table .search-data-tbody").append(row);

  var siteOption = searchData["site"];

  // siteOptionShow(siteOption);
}

// Filter Options Functions

function showSearchDataAPI() {
  var settings = {
    url: "/entry/getall",
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("tr").remove(".search-data-tr");
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();

    startDate = reformDateFormat(startDate);
    endDate = reformDateFormat(endDate);

    var s = new Date(startDate);
    var e = new Date(endDate);



    for (var i = 0; i < response.length; i++) {
      // response[i]['amount'] = response[i]['amount'].toString();
      var date = new Date(response[i]["date"]);
      if(date.getTime() >= s.getTime() && date.getTime() <= e.getTime()){
        showSearchData(response[i]);
      }
    }
    filterDataFormat(response);
  });
}

// Set

function filterDataFormat(data) {
  var company = new Set();
  var coco = new Set ();
  var site = new Set();
  var personWhoWillGet = new Set();
  var department = new Set();
  var cause = new Set();
  var carrier = new Set();
  var referBy = new Set();
  var amount = new Set();

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    company.add(row["company"]);
    coco.add(row["coco"]);
    site.add(row["site"]);
    personWhoWillGet.add(row["person"]);
    department.add(row["department"]);
    cause.add(row["cause"]);
    carrier.add(row["carrier"]);
    referBy.add(row["referBy"]);
    amount.add(row["amount"]);
  }
  for (let value of company) {
    $("#company-filter").append($("<option>").text(value).val(value));
  }
  for (let value of coco) {
    $("#coco-filter").append($("<option>").text(value).val(value));
  }
  for (let value of site) {
    $("#site-filter").append($("<option>").text(value).val(value));
  }

  for (let value of personWhoWillGet) {
    $("#person-car-filter").append($("<option>").text(value).val(value));
  }

  for (let value of department) {
    $("#department-filter").append($("<option>").text(value).val(value));
  }

  for (let value of cause) {
    $("#cause-filter").append($("<option>").text(value).val(value));
  }

  for (let value of carrier) {
    $("#carrier-filter").append($("<option>").text(value).val(value));
  }

  for (let value of referBy) {
    $("#refer-filter").append($("<option>").text(value).val(value));
  }

  for (let value of amount) {
    $("#amount-filter").append($("<option>").text(value).val(value));
  }
}

var filters = {
  type: null,
  company: null,
  coco: null,
  site: null,
  person: null,
  department: null,
  cause: null,
  carrier: null,
  refer: null,
  edited: null,
  amount: null,
};

function updateFilters() {
  $(".search-data-tr")
    .hide()
    .filter(function () {
      var self = $(this),
        result = true; // not guilty until proven guilty

      Object.keys(filters).forEach(function (filter) {
        if (
          filters[filter] &&
          filters[filter] != "None" &&
          filters[filter] != "Any"
        ) {
          result = result && filters[filter] === self.data(filter);
        }
      });

      return result;
    })
    .show();
}

function changeFilter(filterName) {  
  filters[filterName] = this.value;
  updateFilters();
}

$("#type-filter").on("change", function () {
  changeFilter.call(this, "type");
});

$("#company-filter").on("change", function () {
  changeFilter.call(this, "company");
});

$("#coco-filter").on("change", function () {
  changeFilter.call(this, "coco");
});

$("#site-filter").on("change", function () {
  changeFilter.call(this, "site");
});

$("#person-car-filter").on("change", function () {
  changeFilter.call(this, "person");
});

$("#department-filter").on("change", function () {
  changeFilter.call(this, "department");
});

$("#cause-filter").on("change", function () {
  changeFilter.call(this, "cause");
});

$("#carrier-filter").on("change", function () {
  changeFilter.call(this, "carrier");
});

$("#refer-filter").on("change", function () {
  changeFilter.call(this, "refer");
});

$("#edited-filter").on("change", function () {
  changeFilter.call(this, "edited");
});

$("#amount-filter").on("change", function () {
  changeFilter.call(this, "amount");
});

// future use for a text input filter
// $('.search-portal-search-button').on('click', function() {
//     $('.search-data-tr').hide().filter(function() {
//         return $(this).data('search_amount') == $('#amount-filter').val().trim();
//     }).show();
// });

// print Button

$("#print-button").on("click", function () {
  $(".search-data-table").printThis();
});



function debitEditButton(
  id,
  company,
  coco,
  site,
  person,
  department,
  cause,
  carrier,
  referBy,
  amount,
  otherCost,
  total,
  dena,
  paona,
  vara,
  warning,
  note,
  editedBy
) {
  console.log(id);
  $("#d-edit-ID").val(id);
  $("#d-edit-Company").val(company);
  $("#d-edit-CO_CO").val(coco);
  $("#d-edit-Site").val(site);
  $("#d-edit-Person-Car-Who-will-Get").val(person);
  $("#d-edit-Department").val(department);
  $("#d-edit-Cause").val(cause);
  $("#d-edit-Carrier-Driver").val(carrier);
  $("#d-edit-Refer-By").val(referBy);
  $("#d-edit-Amount").val(amount);
  $("#d-edit-Other-Cost").val(otherCost);
  $("#d-edit-Total").val(total);
  $("#d-edit-Dena").val(dena);
  $("#d-edit-Paona").val(paona);
  $("#d-edit-Vara").val(vara);
  $("#d-edit-Warning").val(warning);
  $("#d-edit-Note").val(note);
  $("#d-edit-Edited-By").val(editedBy);
}

function creditEditButton(
  id,
  company,
  coco,
  site,
  person,
  department,
  cause,
  carrier,
  referBy,
  amount,
  otherCost,
  total,
  dena,
  paona,
  vara,
  warning,
  note,
  editedBy
) {
  console.log(id);
  $("#c-edit-ID").val(id);
  $("#c-edit-Company").val(company);
  $("#c-edit-CO_CO").val(coco);
  $("#c-edit-Site").val(site);
  $("#c-edit-Person-Car-Who-will-Get").val(person);
  $("#c-edit-Department").val(department);
  $("#c-edit-Cause").val(cause);
  $("#c-edit-Carrier-Driver").val(carrier);
  $("#c-edit-Refer-By").val(referBy);
  $("#c-edit-Amount").val(amount);
  $("#c-edit-Other-Cost").val(otherCost);
  $("#c-edit-Total").val(total);
  $("#c-edit-Dena").val(dena);
  $("#c-edit-Paona").val(paona);
  $("#c-edit-Vara").val(vara);
  $("#c-edit-Warning").val(warning);
  $("#c-edit-Note").val(note);
  $("#c-edit-Edited-By").val(editedBy);
}

// account edit update

function accountEditButton(
  id,
  fullName,
  cid,
  nid,
  bloodGroup,
  fathersName,
  mothersName,
  permanentAddress,
  presentAddress,
  openingDate,
  closingDate,
  note,
  createdBy
) {
  console.log(id);
  $("#ac-edit-ID").val(id);
  $("#ac-edit-Full-Name").val(fullName);
  $("#ac-edit-CID").val(cid);
  $("#ac-edit-NID").val(nid);
  $("#ac-edit-Blood-Group").val(bloodGroup);
  $("#ac-edit-Fathers-Name").val(fathersName);
  $("#ac-edit-Mothers-Name").val(mothersName);
  $("#ac-edit-Permanent-Address").val(permanentAddress);
  $("#ac-edit-Present-Address").val(presentAddress);
  $("#ac-edit-Opening-Date").val(openingDate);
  $("#ac-edit-Closing-Date").val(closingDate);
  $("#ac-edit-Note").val(note);
  $("#ac-edit-Created-By").val(createdBy);
}


// Calender
$(function () {
  if (!sessionStorage.getItem("date")) {
    sessionStorage.setItem("date", Date.now());
    console.log(Date.now());
  }
  $("#datepicker")
    .datepicker({
      dateFormat: "dd/mm/y",
      onSelect: function () {
        sessionStorage.setItem("date", $(".entryDate").val());
        // dateFilterEntryData();
        entryDataShowAPI();
      },
    })
    // .datepicker("setDate", 1601971446313);
    .datepicker("setDate", parseInt(sessionStorage.getItem("date")));
});

// search calendar

var bindDateRangeValidation = function (f, s, e) {
  if (!(f instanceof jQuery)) {
    console.log("Not passing a jQuery object");
  }

  var jqForm = f,
    startDateId = s,
    endDateId = e;

  var checkDateRange = function (startDate, endDate) {
    var isValid = startDate != "" && endDate != "" ? startDate <= endDate : true;
    return isValid;
  };

  // var bindValidator = function () {
  //   var bstpValidate = jqForm.data("bootstrapValidator");
  //   var validateFields = {
  //     startDate: {
  //       validators: {
  //         notEmpty: { message: "This field is required." },
  //         callback: {
  //           message: "Start Date must less than or equal to End Date.",
  //           callback: function (startDate, validator, $field) {
  //             return checkDateRange(startDate, $("#" + endDateId).val());
  //           },
  //         },
  //       },
  //     },
  //     endDate: {
  //       validators: {
  //         notEmpty: { message: "This field is required." },
  //         callback: {
  //           message: "End Date must greater than or equal to Start Date.",
  //           callback: function (endDate, validator, $field) {
  //             return checkDateRange($("#" + startDateId).val(), endDate);
  //           },
  //         },
  //       },
  //     },
  //     customize: {
  //       validators: {
  //         customize: { message: "customize." },
  //       },
  //     },
  //   };
  //   if (!bstpValidate) {
  //     jqForm.bootstrapValidator({
  //       excluded: [":disabled"],
  //     });
  //   }

  //   jqForm.bootstrapValidator(
  //     "addField",
  //     startDateId,
  //     validateFields.startDate
  //   );
  //   jqForm.bootstrapValidator("addField", endDateId, validateFields.endDate);
  // };

  var hookValidatorEvt = function () {
    var dateBlur = function (e, bundleDateId, action) {
      jqForm.bootstrapValidator("revalidateField", e.target.id);
    };

    $("#" + startDateId).on("dp.change dp.update blur", function (e) {
      $("#" + endDateId)
        .data("DateTimePicker")
        .setMinDate(e.date);
      dateBlur(e, endDateId);
    });

    $("#" + endDateId).on("dp.change dp.update blur", function (e) {
      $("#" + startDateId)
        .data("DateTimePicker")
        .setMaxDate(e.date);
      dateBlur(e, startDateId);
    });
  };

  bindValidator();
  hookValidatorEvt();
};

// logout

$("#logout").on("click", function () {
  console.log("Logout click");
  sessionStorage.removeItem("token");
  window.location.replace("/");
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Logout Successful',
    showConfirmButton: false,
    timer: 1500
  });
});

function test() {
  console.log("Date picked");
}

$(function () {
  var ed = new Date();
  var sd = new Date(ed.getTime()-432000000);
  
  $("#startDate").datetimepicker({
    pickTime: false,
    format: "DD/MM/YY",
    defaultDate: sd,
    maxDate: ed,
  }).on("change", function() {
    showSearchDataAPI();
  });

  $("#endDate").datetimepicker({
    pickTime: false,
    format: "DD/MM/YY",
    defaultDate: ed,
    minDate: sd,
  }).on("change", function() {
    showSearchDataAPI();
  });

  //passing 1.jquery form object, 2.start date dom Id, 3.end date dom Id
  // bindDateRangeValidation($("#form"), "startDate", "endDate");
});

// Record API Integration

$("#debit-edit-update").on("click", function () {
  var debitEditID = $("#d-edit-ID").val();
  var debitEditCompany = $("#d-edit-Company").val();
  var debitEditCoco = $("#d-edit-CO_CO").val();
  var debitEditSite = $("#d-edit-Site").val();
  var debitEditPerson = $("#d-edit-Person-Car-Who-will-Get").val();
  var debitEditDepartment = $("#d-edit-Department").val();
  var debitEditCause = $("#d-edit-Cause").val();
  var debitEditCarrier = $("#d-edit-Carrier-Driver").val();
  var debitEditReferby = $("#d-edit-Refer-By").val();
  var debitEditAmount = $("#d-edit-Amount").val();
  var debitEditOtherCost = $("#d-edit-Other-Cost").val();
  var debitEditTotal = $("#d-edit-Total").val();
  var debitEditDena = $("#d-edit-Dena").val();
  var debitEditPaona = $("#d-edit-Paona").val();
  var debitEditVara = $("#d-edit-Vara").val();
  var debitEditWarning = $("#d-edit-Warning").val();
  var debitEditNote = $("#d-edit-Note").val();
  var debitEditEditedby = $("#d-edit-Edited-By").val();

  var settings = {
    url: "/entry/update",
    method: "PUT",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: JSON.stringify({
      _id: debitEditID,
      company: debitEditCompany,
      coco: debitEditCoco,
      site: debitEditSite,
      person: debitEditPerson,
      department: debitEditDepartment,
      cause: debitEditCause,
      carrier: debitEditCarrier,
      referBy: debitEditReferby,
      amount: debitEditAmount,
      otherCost: debitEditOtherCost,
      total: debitEditTotal,
      dena: debitEditDena,
      paona: debitEditPaona,
      vara: debitEditVara,
      warning: debitEditWarning,
      note: debitEditNote,
      editedBy: debitEditEditedby,
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    entryDataShowAPI();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Successfully Updated',
      showConfirmButton: false,
      timer: 1500
    });
  });
});

$("#credit-edit-update").on("click", function () {
  var creditEditID = $("#c-edit-ID").val();
  var creditEditCompany = $("#c-edit-Company").val();
  var creditEditCoco = $("#c-edit-CO_CO").val();
  var creditEditSite = $("#c-edit-Site").val();
  var creditEditPerson = $("#c-edit-Person-Car-Who-will-Get").val();
  var creditEditDepartment = $("#c-edit-Department").val();
  var creditEditCause = $("#c-edit-Cause").val();
  var creditEditCarrier = $("#c-edit-Carrier-Driver").val();
  var creditEditReferby = $("#c-edit-Refer-By").val();
  var creditEditAmount = $("#c-edit-Amount").val();
  var creditEditOtherCost = $("#c-edit-Other-Cost").val();
  var creditEditTotal = $("#c-edit-Total").val();
  var creditEditDena = $("#c-edit-Dena").val();
  var creditEditPaona = $("#c-edit-Paona").val();
  var creditEditVara = $("#c-edit-Vara").val();
  var creditEditWarning = $("#c-edit-Warning").val();
  var creditEditNote = $("#c-edit-Note").val();
  var creditEditEditedby = $("#c-edit-Edited-By").val();

  var settings = {
    url: "/entry/update",
    method: "PUT",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: JSON.stringify({
      _id: creditEditID,
      company: creditEditCompany,
      coco: creditEditCoco,
      site: creditEditSite,
      person: creditEditPerson,
      department: creditEditDepartment,
      cause: creditEditCause,
      carrier: creditEditCarrier,
      referBy: creditEditReferby,
      amount: creditEditAmount,
      otherCost: creditEditOtherCost,
      total: creditEditTotal,
      dena: creditEditDena,
      paona: creditEditPaona,
      vara: creditEditVara,
      warning: creditEditWarning,
      note: creditEditNote,
      editedBy: creditEditEditedby,
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    entryDataShowAPI();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Successfully Updated',
      showConfirmButton: false,
      timer: 1500
    });
  });
});

$("#account-edit-update").on("click", function () {
  var accountEditID = $("#ac-edit-ID").val();
  var accountEditFullName = $("#ac-edit-Full-Name").val();
  var accountEditCID = $("#ac-edit-CID").val();
  var accountEditNID = $("#ac-edit-NID").val();
  var accountEditBloodGroup = $("#ac-edit-Blood-Group").val();
  var accountEditFathersName = $("#ac-edit-Fathers-Name").val();
  var accountEditMothersName = $("#ac-edit-Mothers-Name").val();
  var accounrEditPermanentAddress = $("#ac-edit-Permanent-Address").val();
  var accountEditPresentAddress = $("#ac-edit-Present-Address").val();
  var accountEditOpeningDate = $("#ac-edit-Opening-Date").val();
  var accountEditClosingDate = $("#ac-edit-Closing-Date").val();
  var accountEditNote = $("#ac-edit-Note").val();
  var AccountEditCreatedby = $("#ac-edit-Created-By").val();

  var settings = {
    url: "/account/update",
    method: "PUT",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: JSON.stringify({
      _id: accountEditID,
      full_name: accountEditFullName,
      id: accountEditCID,
      nid: accountEditNID,
      blood_group: accountEditBloodGroup,
      father_name: accountEditFathersName,
      mother_name: accountEditMothersName,
      parmanent_address: accounrEditPermanentAddress,
      present_address: accountEditPresentAddress,
      opening_date: accountEditOpeningDate,
      closing_date: accountEditClosingDate,
      note: accountEditNote,
      created_by: AccountEditCreatedby,
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    accountDataShowAPI();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Successfully Updated',
      showConfirmButton: false,
      timer: 1500
    });
  });
});


// Custom date format

function reformDateFormat(date){
  var dd=date.substr(0, 2);
  var mm = date.substr(3,2);
  var yy = date.substr(6,3);
  var fDate = mm+"/"+dd+"/"+yy;
  return fDate;
}

function  getPreviousDay(data) {
  var date = new Date(data);
  date.setDate(date.getDate() - 1)

  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yy = date.getFullYear();
  yy = yy-2000;
  
  var pDate = "";

  if(mm < 10){
    pDate += "0"+mm.toString();
  }else{
    pDate += mm.toString();
  }

  if(dd < 10){
    pDate += "/0"+dd.toString();
  }else{
    pDate += "/"+dd.toString();
  }
  
  if(yy < 10){
    pDate += "/0"+yy.toString();
  }else{
    pDate += "/"+yy.toString();
  }
  return pDate;
}