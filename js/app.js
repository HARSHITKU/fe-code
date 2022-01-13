const baseURL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json';
let selectedSearchType = 'Email Address';
$(document).ready(function () {
  // Hiding the loader initially
  $("#loader").hide();
  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    email = $('input[type="text"]').val().toLowerCase();
    phone = $('input[type="tel"]').val().toLowerCase();
    var x, y;
    emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    phoneRegEx = /^\d{10}$/;
    x = email.match(emailRegEx) ? true : false;
    y = phone.match(phoneRegEx) ? true : false;
    if (x === true) {
      // showing the loader when the API call starts
      $("#loader").show();
      $(".features").hide();
      $(".above-the-fold").hide();
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
      const proxyurl = "";
      const url = baseURL + '?email=' + email;
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          window.location.href = "result.html";
          // Hiding the loader as soon as we get the response from the API
          $("#loader").hide();
        })
        .catch((e) => console.log(e));
    // Adding error state on the input box only if the regex is not matching & current active button is of the same input
    } else if (x !== true && selectedSearchType === 'Email Address') {
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
      $(".error-msg").text("Please enter a valid email address");
    } 
    if(y){
      $("#loader").show();
      $(".features").hide();
      $(".above-the-fold").hide();
      document.querySelector('input[type="tel"]').parentNode.classList.remove("error");
      const proxyurl = "";
      const url = baseURL + '?phone=' + phone;
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          window.location.href = "result.html";
          // Hiding the loader as soon as we get the response from the API
          $("#loader").hide();
        })
        .catch((e) => console.log(e));
    // Adding error state on the input box only if the regex is not matching & current active button is of the same input
    }else if(!y && selectedSearchType === 'Phone Number'){
      document.querySelector('input[type="tel"]').parentNode.classList.add("error");
      $(".error-msg").text("Please enter a valid phone number");
    }
  });

  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (x === true) {
        $("#loader").show();
        $(".features").hide();
        $(".above-the-fold").hide();
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
            $("#loader").hide();
          })
          .catch((e) => console.log(e));
      // Adding error state on the input box only if the regex is not matching & current active button is of the same input
      }else if (x !== true && selectedSearchType === 'Email Address') {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
        $(".error-msg").text("Please enter a valid email address");
      } 
    }
  });
  $('input[type="tel"]').keypress(function (event) {
    phone = $('input[type="tel"]').val().toLowerCase();
    phoneRegEx = /^\d{10}$/;
    if (phone.match(phoneRegEx)) {
      y = true;
      document.querySelector('input[type="tel"]').parentNode.classList.remove("error");
    } else {
      y = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (y) {
        $("#loader").show();
        $(".features").hide();
        $(".above-the-fold").hide();
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=' + phone;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
            $("#loader").hide();
          })
          .catch((e) => console.log(e));
      // Adding error state on the input box only if the regex is not matching & current active button is of the same input
      }else if(!y && selectedSearchType === 'Phone Number'){
        document.querySelector('input[type="tel"]').parentNode.classList.add("error");
        $(".error-msg").text("Please enter a valid phone number");
      }
    }
  });
});

// New Feature: Function to load input boxes dynamically

function enableSearchType(event, searchType) {
  let i, loadSearchType, allButtons;
  // Getting all the input boxes with the class 'search-input-type' and iterating through them to load it based
  // on the selected search type
  loadSearchType = document.getElementsByClassName("search-input-type");
  for (i = 0; i < loadSearchType.length; i++) {
    loadSearchType[i].style.display = "none";
  }
  allButtons = document.getElementsByClassName("action-button");
  for (i = 0; i < allButtons.length; i++) {
    allButtons[i].className = allButtons[i].className.replace(" active", "");
  }
  document.getElementById(searchType).style.display = "block";
  // Accessing the current active button
  selectedSearchType = event.currentTarget.innerHTML;
  // Based on the active button, I am removing the error state from the other input
  selectedSearchType === "Email Address" ?
    document.querySelector('input[type="tel"]').parentNode.classList.remove("error") : document.querySelector('input[type="text"]').parentNode.classList.remove("error");
  // Adding active classes dynamically
  event.currentTarget.className += " active";
}