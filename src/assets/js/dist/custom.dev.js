"use strict";

(function ($) {
  "use strict";

  $.fn.angularFunction = function () {
    $(document).on('click', '#readmore', function (e) {
      e.preventDefault();
      $("#full_des").addClass('open');
      $("#short_des").addClass('close');
    });
    $(document).on('click', '#viewless', function (e) {
      e.preventDefault();
      $("#full_des").removeClass('open');
      $("#short_des").removeClass('close');
    });
    $(document).on('click', '#search_icons', function (e) {
      // e.preventDefault();
      $('#search_boxs').toggleClass('open');
    });
    $(document).on('click', '#search_icons2', function (e) {
      // e.preventDefault();
      $('#search_boxs2').toggleClass('open');
    });
    $(document).on('click', '.link', function (e) {
      e.preventDefault();
      window.open(this.text, '_blank');
    }); // $(document).on('click', 'body', function (e) {
    //     console.log('Class body');
    //     if ($('.contact_forms').hasClass("open")) {
    //         console.log('Class if');
    //         $(".contact_forms").toggleClass('open');
    //     }
    // });

    $(document).on('click', '#contact_icon', function (e) {
      e.preventDefault();
      $(".contact_forms").toggleClass('open');
    });
    $(document).on('click', '#closes', function (e) {
      e.preventDefault();
      $(".contact_forms").toggleClass('open');
    });
    $(document).on('click', '.contactUsMenu', function (e) {
      e.preventDefault();
      $(".contact_forms").addClass('open');
    });
    $(document).ready(function () {
      $(document).on('click', '#uparrow', function () {
        $("#page").animate({
          scrollTop: 0
        }, 400);
      });
    });
    $(document).on('click', '.action-left', function () {
      $("#fileUpload").trigger("click");
    });
  };
})(jQuery);

$(window).angularFunction();

function getActionsFromMessage(msg) {
  var matcher = new RegExp("{{(.*?)}}", 'gm');
  var actions = msg.match(matcher);
  return actions != undefined ? actions : [];
}

function pageToTop() {
  $("#addPage").animate({
    scrollTop: 0
  }, 400);
}

function removeMenu() {
  $('.contact_forms').hasClass("open"); // console.log('Class 000  ', $('.contact_forms').hasClass("open"));
}

function uploadFile() {
  $("#fileUpload").trigger("click");
}

function removeSearch() {
  $(".search_boxs").removeClass('open');
  $(".search_boxs2").removeClass('open');
}