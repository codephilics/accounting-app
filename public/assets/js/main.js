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
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
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
      entryDataShowAPI();
      showSearchDataAPI();
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

// Show debit data
function showDebitData(debitData) {
  var row = "<tr class ='debit-tr'>";

  var debitSL = $(".debit-tr").length + 1;
  row +=
    "<td>" +
    debitSL +
    "</td>" +
    "<td>" +
    debitData["company"] +
    "</td>" +
    "<td>" +
    debitData["coco"] +
    "</td>" +
    "<td>" +
    debitData["site"] +
    "</td>" +
    "<td>" +
    debitData["person"] +
    "</td>" +
    "<td>" +
    debitData["department"] +
    "</td>" +
    "<td>" +
    debitData["cause"] +
    "</td>" +
    "<td>" +
    debitData["carrier"] +
    "</td>" +
    "<td>" +
    debitData["referBy"] +
    "</td>" +
    "<td>" +
    debitData["amount"] +
    "</td>" +
    "<td>" +
    debitData["otherCost"] +
    "</td>" +
    "<td class='debit-total-sum'>" +
    debitData["total"] +
    "</td>" +
    "<td>" +
    debitData["dena"] +
    "</td>" +
    "<td>" +
    debitData["paona"] +
    "</td>" +
    "<td>" +
    debitData["vara"] +
    "</td>" +
    "<td>" +
    debitData["warning"] +
    "</td>" +
    "<td>" +
    debitData["note"] +
    "</td>" +
    "<td>" +
    debitData["editedBy"] +
    "</td>" +
    "<td>" +
    " <i class='fas fa-pen' id='debit-edit-button' onClick = 'debitEditButton(\"" +
    debitData["_id"] +
    '", "' +
    debitData["company"] +
    '", "' +
    debitData["coco"] +
    '", "' +
    debitData["site"] +
    '", "' +
    debitData["person"] +
    '", "' +
    debitData["department"] +
    '", "' +
    debitData["cause"] +
    '", "' +
    debitData["carrier"] +
    '", "' +
    debitData["referBy"] +
    '", "' +
    debitData["amount"] +
    '", "' +
    debitData["otherCost"] +
    '", "' +
    debitData["total"] +
    '", "' +
    debitData["dena"] +
    '", "' +
    debitData["paona"] +
    '", "' +
    debitData["vara"] +
    '", "' +
    debitData["warning"] +
    '", "' +
    debitData["note"] +
    '", "' +
    debitData["editedBy"] +
    "\")' data-toggle='modal' data-target='#debit-edit-modal' style='cursor: pointer; color: #43a2d9;'></i>" +
    "<i class='fas fa-trash-alt' onClick = 'deleteEntryApi(\"" +
    debitData["_id"] +
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
    
    var preCreditTotal=0, preDebitTotal=0;
    var creditTotal = 0, debitTotal = 0;
    for (var i = 0; i < response.length; i++) {
      if (date == response[i]["date"]) {
        if (response[i]["type"] == "Debit") {
          showDebitData(response[i]);
          debitTotal+=response[i]["total"];
        } else {
          showCreditData(response[i]);
          creditTotal+=response[i]["total"];
        }
      }
      if(previousDay == response[i]["date"]){
        console.log("Pre : "+response[i]["total"]);
        if (response[i]["type"] == "Debit") {
          preDebitTotal+=response[i]["total"];      
        } else {
          preCreditTotal+=response[i]["total"];
        }
      }

    }

    // var debitSL = $(".debit-tr").length;
    // var creditSL = $(".credit-tr").length;
    // var total = 0;
    // var creditTotal = 0;
    // var ISAresult = 0;
    // var ISAvalue = parseFloat($(".ISA-value-today").text());

    // var debitTableSum = $(".debit-total-sum");
    // for (var i = 0; i < debitSL; i++) {
    //   total = total + parseFloat(debitTableSum[i].innerHTML);
    // }
    $("#debit-sum").html(debitTotal);

    // var ISAresult2 = 0;
    // var lastISAValue = parseFloat($(".ISA-value-last-day").text());
    $(".ISA-value-last-day-headline").html(preCreditTotal - preDebitTotal);


    // var creditTableSum = $(".credit-total-sum");
    // for (var i = 0; i < creditSL; i++) {
    //   creditTotal = creditTotal + parseFloat(creditTableSum[i].innerHTML);
    // }
    // creditTotal = creditTotal + lastISAValue;
    $("#credit-sum").html(creditTotal);

    // ISAresult2 = creditTotal - total;
    $(".ISA-value-today").html(creditTotal-debitTotal);
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
  var debitAmount = $("#dAmount").val();
  var debitOtherCost = $("#dOther-Cost").val();
  var debitTotal = $("#dTotal").val();
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
      amount: debitAmount,
      otherCost: debitOtherCost,
      total: debitTotal,
      dena: debitDena,
      paona: debitPaona,
      vara: debitVara,
      warning: debitWarning,
      note: debitNote,
      editedBy: debitEditor,
      date: date,
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      entryDataShowAPI();
      showSearchDataAPI();
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
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
  row +=
    "<td>" +
    creditSL +
    "</td>" +
    "<td>" +
    creditData["company"] +
    "</td>" +
    "<td>" +
    creditData["coco"] +
    "</td>" +
    "<td>" +
    creditData["site"] +
    "</td>" +
    "<td>" +
    creditData["person"] +
    "</td>" +
    "<td>" +
    creditData["department"] +
    "</td>" +
    "<td>" +
    creditData["cause"] +
    "</td>" +
    "<td>" +
    creditData["carrier"] +
    "</td>" +
    "<td>" +
    creditData["referBy"] +
    "</td>" +
    "<td>" +
    creditData["amount"] +
    "</td>" +
    "<td>" +
    creditData["otherCost"] +
    "</td>" +
    "<td class='credit-total-sum'>" +
    creditData["total"] +
    "</td>" +
    "<td>" +
    creditData["dena"] +
    "</td>" +
    "<td>" +
    creditData["paona"] +
    "</td>" +
    "<td>" +
    creditData["vara"] +
    "</td>" +
    "<td>" +
    creditData["warning"] +
    "</td>" +
    "<td>" +
    creditData["note"] +
    "</td>" +
    "<td>" +
    creditData["editedBy"] +
    "</td>" +
    "<td>" +
    " <i class='fas fa-pen' id='credit-edit-button' onClick = 'creditEditButton(\"" +
    creditData["_id"] +
    '", "' +
    creditData["company"] +
    '", "' +
    creditData["coco"] +
    '", "' +
    creditData["site"] +
    '", "' +
    creditData["person"] +
    '", "' +
    creditData["department"] +
    '", "' +
    creditData["cause"] +
    '", "' +
    creditData["carrier"] +
    '", "' +
    creditData["referBy"] +
    '", "' +
    creditData["amount"] +
    '", "' +
    creditData["otherCost"] +
    '", "' +
    creditData["total"] +
    '", "' +
    creditData["dena"] +
    '", "' +
    creditData["paona"] +
    '", "' +
    creditData["vara"] +
    '", "' +
    creditData["warning"] +
    '", "' +
    creditData["note"] +
    '", "' +
    creditData["editedBy"] +
    "\")' data-toggle='modal' data-target='#credit-edit-modal' style='cursor: pointer; color: #43a2d9;'></i>" +
    "<i class='fas fa-trash-alt' onClick = 'deleteEntryApi(\"" +
    creditData["_id"] +
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
  var creditAmount = $("#crAmount").val();
  var creditOtherCost = $("#crOther-Cost").val();
  var creditTotal = $("#crTotal").val();
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
      amount: creditAmount,
      otherCost: creditOtherCost,
      total: creditTotal,
      dena: creditDena,
      paona: creditPaona,
      vara: creditVara,
      warning: creditWarning,
      note: creditNote,
      editedBy: creditEditor,
      date: date,
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      entryDataShowAPI();
      showSearchDataAPI();
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
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
}

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
    $("tr").remove(".add-account-tr");
    for (var i = 0; i < response.length; i++) {
      showAccountData(response[i]);
    }
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

  var searchBalance =
    searchData["amount"] +
    searchData["dena"] -
    (searchData["total"] + searchData["paona"]);

  row +=
    "<td>" +
    searchSL +
    "</td>" +
    "<td>" +
    searchData["type"] +
    "</td>" +
    "<td>" +
    searchData["company"] +
    "</td>" +
    "<td>" +
    searchData["coco"] +
    "</td>" +
    "<td id='site-data'>" +
    searchData["site"] +
    "</td>" +
    "<td>" +
    searchData["person"] +
    "</td>" +
    "<td>" +
    searchData["department"] +
    "</td>" +
    "<td>" +
    searchData["cause"] +
    "</td>" +
    "<td>" +
    searchData["carrier"] +
    "</td>" +
    "<td>" +
    searchData["referBy"] +
    "</td>" +
    "<td id='search-amount'>" +
    searchData["amount"] +
    "</td>" +
    "<td>" +
    searchData["otherCost"] +
    "</td>" +
    "<td id='search-total'>" +
    searchData["total"] +
    "</td>" +
    "<td id='search-dena'>" +
    searchData["dena"] +
    "</td>" +
    "<td id='search-paona'>" +
    searchData["paona"] +
    "</td>" +
    "<td>" +
    searchData["vara"] +
    "</td>" +
    "<td>" +
    searchBalance +
    "</td>" +
    "<td>" +
    searchData["warning"] +
    "</td>" +
    "<td>" +
    searchData["note"] +
    "</td>" +
    "<td>" +
    searchData["editedBy"] +
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
  var site = new Set();
  var personWhoWillGet = new Set();
  var department = new Set();
  var cause = new Set();
  var carrier = new Set();
  var referBy = new Set();
  var editBy = new Set();
  var amount = new Set();

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    site.add(row["site"].toLowerCase());
    personWhoWillGet.add(row["person"].toLowerCase());
    department.add(row["department"].toLowerCase());
    cause.add(row["cause"].toLowerCase());
    carrier.add(row["carrier"].toLowerCase());
    referBy.add(row["referBy"].toLowerCase());
    editBy.add(row["editedBy"].toLowerCase());
    amount.add(row["amount"]);
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

  for (let value of editBy) {
    $("#edited-filter").append($("<option>").text(value).val(value));
  }

  for (let value of amount) {
    $("#amount-filter").append($("<option>").text(value).val(value));
  }
}

var filters = {
  type: null,
  site: null,
  person: null,
  department: null,
  cause: null,
  carrier: null,
  refer: null,
  edited: null,
  search_amount: null,
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
  changeFilter.call(this, "search_amount");
});

// future use for a text input filter
// $('.search-portal-search-button').on('click', function() {
//     $('.search-data-tr').hide().filter(function() {
//         return $(this).data('search_amount') == $('#amount-filter').val().trim();
//     }).show();
// });

// print Button

$("#print-button").on("click", function () {
  $(".search-results").printThis();
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
    var isValid =
      startDate != "" && endDate != "" ? startDate <= endDate : true;
    return isValid;
  };

  var bindValidator = function () {
    var bstpValidate = jqForm.data("bootstrapValidator");
    var validateFields = {
      startDate: {
        validators: {
          notEmpty: { message: "This field is required." },
          callback: {
            message: "Start Date must less than or equal to End Date.",
            callback: function (startDate, validator, $field) {
              return checkDateRange(startDate, $("#" + endDateId).val());
            },
          },
        },
      },
      endDate: {
        validators: {
          notEmpty: { message: "This field is required." },
          callback: {
            message: "End Date must greater than or equal to Start Date.",
            callback: function (endDate, validator, $field) {
              return checkDateRange($("#" + startDateId).val(), endDate);
            },
          },
        },
      },
      customize: {
        validators: {
          customize: { message: "customize." },
        },
      },
    };
    if (!bstpValidate) {
      jqForm.bootstrapValidator({
        excluded: [":disabled"],
      });
    }

    jqForm.bootstrapValidator(
      "addField",
      startDateId,
      validateFields.startDate
    );
    jqForm.bootstrapValidator("addField", endDateId, validateFields.endDate);
  };

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
  bindDateRangeValidation($("#form"), "startDate", "endDate");
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