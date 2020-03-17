(function() {

  $.mobile.utils = {
    showWaitBox: function(theme, mesg) {
      var lmtv;
      lmtv = $.mobile.loadingMessageTextVisible;
      $.mobile.loadingMessageTextVisible = true;
      $.mobile.loading( 'show', { theme: "e", text: "Loading...", textVisible: "true"});
      return $.mobile.loadingMessageTextVisible = lmtv;
    },
    hideWaitBox: function() {
      return $.mobile.loading( 'hide' );
    },
    reloadPage: function(opts) {
      var defaults;
      if (opts == null) {
        opts = {};
      }
      defaults = {
        allowSamePageTransition: true,
        transition: 'none',
        showLoadMsg: false,
        reloadPage: true
      };
      return $.mobile.changePage(window.location.href, $.extend(defaults, opts));
    }
  };

}).call(this);