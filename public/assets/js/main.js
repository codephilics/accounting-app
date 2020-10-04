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
    for (var i = 0; i < response.length; i++) {
      date = $(".entryDate").val();
      if (date.length != 0 && date == response[i]["date"]) {
        if (response[i]["type"] == "Debit") {
          showDebitData(response[i]);
        } else {
          showCreditData(response[i]);
        }
      }
    }

    var debitSL = $(".debit-tr").length;
    var creditSL = $(".credit-tr").length;
    var total = 0;
    var creditTotal = 0;
    var ISAresult = 0;
    var ISAvalue = parseFloat($(".ISA-value-today").text());

    var debitTableSum = $(".debit-total-sum");
    for (var i = 0; i < debitSL; i++) {
      total = total + parseFloat(debitTableSum[i].innerHTML);
    }
    $("#debit-sum").html(total);

    ISAresult = ISAvalue - total;
    $(".ISA-value-today").html(ISAresult);

    var ISAresult2 = 0;
    var ISAvalue2 = parseFloat($(".ISA-value-today").text());
    var lastISAValue = parseFloat($(".ISA-value-last-day").text());
    $(".ISA-value-last-day-headline").html(lastISAValue);

    console.log(lastISAValue);

    var creditTableSum = $(".credit-total-sum");
    for (var i = 0; i < creditSL; i++) {
      creditTotal = creditTotal + parseFloat(creditTableSum[i].innerHTML);
    }
    creditTotal = creditTotal + lastISAValue;
    $("#credit-sum").html(creditTotal);

    ISAresult2 = ISAvalue2 + creditTotal;
    $(".ISA-value-today").html(ISAresult2);
  });
}

function dateFilterEntryData() {
  $("tr").remove(".debit-tr");
  $("tr").remove(".credit-tr");
  for (var i = 0; i < entryData.length; i++) {
    date = $(".entryDate").val();
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
    "<i class='fas fa-pen' style='cursor: pointer; color: #43a2d9;'></i>" +
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
    searchData["type"] +
    "' data-site='" +
    searchData["site"] +
    "' data-person='" +
    searchData["person"] +
    "' data-department='" +
    searchData["department"] +
    "' data-cause='" +
    searchData["cause"] +
    "' data-carrier='" +
    searchData["carrier"] +
    "' data-refer='" +
    searchData["referBy"] +
    "' data-edited='" +
    searchData["editedBy"] +
    "' data-search_amount='" +
    searchData["amount"] +
    "'>";
  var searchSL = $(".search-data-tr").length + 1;

  var searchAmount = parseFloat($("#search-amount").text());
  var searchTotal = parseFloat($("#search-total").text());
  var searchDena = parseFloat($("#search-dena").text());
  var searchPaona = parseFloat($("#search-paona").text());

  var searchBalance = searchAmount + searchDena - (searchTotal + searchPaona);
  // console.log(searchBalance);
  // console.log(searchAmount);
  // console.log(searchTotal);
  // console.log(searchDena);
  // console.log(searchPaona);

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
    "<td>" +
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
}

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
    for (var i = 0; i < response.length; i++) {
      showSearchData(response[i]);
    }
  });
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

document.getElementById("print-button").addEventListener("click", function () {
  var printContents = document.getElementsByClassName("search-results")
    .innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
});

// $("#print-button").on("click", function () {
//   $.print(".search-results");
// });

// Calender
$(function () {
  if (!sessionStorage.getItem("date")) {
    sessionStorage.setItem("date", new Date());
  }
  $("#datepicker")
    .datepicker({
      dateFormat: "dd-mm-yy",
      duration: "fast",
      onSelect: function () {
        sessionStorage.setItem("date", $(".entryDate").val());
        dateFilterEntryData();
      },
    })
    .datepicker("setDate", sessionStorage.getItem("date"));
});

function debitEditButton(
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
