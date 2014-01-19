define(function() {

  var $el = $('.spinner');

  var busy = false;

  unset();

  toggle.set = set;
  toggle.unset = unset;

  $(document).ajaxStart(set);
  $(document).ajaxStop(unset);

  return toggle;

  function toggle() {
    if (! busy) set();
    else unset();
  }

  function set() {
    $el.show();
    busy = true;
  }

  function unset() {
    $el.hide();
    busy = false;
  }
});
