jQuery(function($) {
 
 $("a.popup").click(function() {	 
  loading();
  GetLeaderboard(this.id);
  return false;
 });

 $("div.close").hover(
 function() {
 $('span.popup_tooltip').show();
 },
 function () {
 $('span.popup_tooltip').hide();
 }
 );

 $("div.close").click(function() {
 disablePopup();
 });

 $(this).keyup(function(event) {
 if (event.which == 27) {
 disablePopup();
 }
 });

 $("div#backgroundPopup").click(function() {
 disablePopup();
 });

 function loading() {
 $("div.loader").show();
 }

 function disablePopup() {
 if(popupStatus == 1) {
 $("#Popup").fadeOut("normal");
 $("#backgroundPopup").fadeOut("normal");
 popupStatus = 0;
 }
 }
});
