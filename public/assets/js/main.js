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
  isAuthenticate();
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
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
      window.location.replace("/");
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
    "<i class='fas fa-pen' id='debit-edit-button' onClick = 'debitEditButton(\"" +
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

function debitDataShowAPI() {
  var settings = {
    url: "/entry/get",
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: {
      type: "Debit",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("tr").remove(".debit-tr");
    for (var i = 0; i < response.length; i++) {
      showDebitData(response[i]);
    }

    var debitSL = $(".debit-tr").length;
    var total = 0;
    var ISAresult = 0;
    var ISAvalue = parseFloat($(".ISA-value-today").text());

    var debitTableSum = $(".debit-total-sum");
    for (var i = 0; i < debitSL; i++) {
      total = total + parseFloat(debitTableSum[i].innerHTML);
    }
    $("#debit-sum").html(total);

    ISAresult = ISAvalue - total;
    $(".ISA-value-today").html(ISAresult);
  });
}
debitDataShowAPI();

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
  var date = "12/11/2020";

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
      debitDataShowAPI();
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(textStatus);
    });

  // $(".debit-tr").on("click", ".remove-item-debit", function () {
  //   console.log("hello");
  //   $(this).closest("tr").remove();
  //   debitSL--;
  //   console.log(debitSL);
  //   updateDebitSL(debitSL);
  // });
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
        debitDataShowAPI();
        creditDataShowAPI();
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
    "<i class='fas fa-pen' id='credit-edit-button' data-toggle='modal' data-target='#credit-edit-modal' style='cursor: pointer; color: #43a2d9;'></i>" +
    "<i class='fas fa-trash-alt' onClick = 'deleteEntryApi(\"" +
    creditData["_id"] +
    "\")' style='padding-left: 8px; cursor: pointer; color: red;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".credit-table .credit-tbody").append(row);
}

function creditDataShowAPI() {
  var settings = {
    url: "/entry/get",
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    data: {
      type: "Credit",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("tr").remove(".credit-tr");
    for (var i = 0; i < response.length; i++) {
      showCreditData(response[i]);
    }

    var creditSL = $(".credit-tr").length;
    var creditTotal = 0;
    var ISAresult = 0;
    var ISAvalue = parseFloat($(".ISA-value-today").text());
    var lastISAValue = parseFloat($(".ISA-value-last-day").text());
    $(".ISA-value-last-day-headline").html(lastISAValue);

    console.log(lastISAValue);

    var creditTableSum = $(".credit-total-sum");
    for (var i = 0; i < creditSL; i++) {
      creditTotal = creditTotal + parseFloat(creditTableSum[i].innerHTML);
    }
    creditTotal = creditTotal + lastISAValue;
    $("#credit-sum").html(creditTotal);

    ISAresult = ISAvalue + creditTotal;
    $(".ISA-value-today").html(ISAresult);
  });
}
creditDataShowAPI();

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
      date: "12/11/2020",
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response);
      creditDataShowAPI();
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
    "<i class='fas fa-pen' id='account-edit-button' data-toggle='modal' data-target='#account-edit-modal' style='cursor: pointer; color: #43a2d9;'></i>" +
    "<i class='fas fa-trash-alt' onClick = 'deleteAccountAPI(\"" +
    accountData["_id"] +
    "\")' style='padding-left: 8px; cursor: pointer; color: red;'></i>" +
    "</td>";
  row += "</tr>";

  console.debug(row);

  $(".add-account-table .add-account-tbody").append(row);
}

accountDataShowAPI();

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
      date: "12/11/2020",
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
    "' data-searchAmount='" +
    searchData["amount"] +
    "'>";
  var searchSL = $(".search-data-tr").length + 1;
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
    "<td>" +
    searchData["amount"] +
    "</td>" +
    "<td>" +
    searchData["otherCost"] +
    "</td>" +
    "<td class='credit-total-sum'>" +
    searchData["total"] +
    "</td>" +
    "<td>" +
    searchData["dena"] +
    "</td>" +
    "<td>" +
    searchData["paona"] +
    "</td>" +
    "<td>" +
    searchData["vara"] +
    "</td>" +
    "<td>" +
    searchData["vara"] +
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

showSearchDataAPI();

var filters = {
  type: null,
  site: null,
  person: null,
  department: null,
  cause: null,
  carrier: null,
  refer: null,
  edited: null,
  searchAmount: null,
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

$("#carrier-driver-filter").on("change", function () {
  changeFilter.call(this, "carrier");
});

$("#refer-filter").on("change", function () {
  changeFilter.call(this, "refer");
});

$("#edited-filter").on("change", function () {
  changeFilter.call(this, "edited");
});

$("#amount-filter").on("change", function () {
  changeFilter.call(this, "searchAmount");
});

// future use for a text input filter
// $('.search-portal-search-button').on('click', function() {
//     $('.search-data-tr').hide().filter(function() {
//         return $(this).data('search_amount') == $('#amount-filter').val().trim();
//     }).show();
// });

$("#print-button").on("click", function () {
  $.print(".search-results");
});

console.log($(".debit-table").length);

function debitEditButton(company, coco, site, person, department, cause, carrier, referBy, amount, otherCost, total, dena, paona, vara, warning, note, editedBy) {

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
  $("#d-edit-Total").val( total);
  $("#d-edit-Dena").val(dena);
  $("#d-edit-Paona").val(paona);
  $("#d-edit-Vara").val(vara);
  $("#d-edit-Warning").val(warning);
  $("#d-edit-Note").val(note);
  $("#d-edit-Edited-By").val(editedBy);
  
}