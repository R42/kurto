define(['recent'], function(recent) {
  $('button[type=submit]').click(sendUpdate);

  function sendUpdate(e) {
    e.preventDefault();

    var input = $('input[name=url]');
    var ctrl = $('button[type=submit]').add(input);

    var url = input.val();
    if (! url)
      return;

    ctrl.attr('disabled', '');
    $.ajax({
      url: '/',
      type: 'POST',
      data: { url: url },
      error: alert.bind(null, 'Something\'s wrong Jimmy...'),
      success: [input.val.bind(input, ''), recent.update],
      complete: ctrl.removeAttr.bind(ctrl, 'disabled')
    });
  }
});
