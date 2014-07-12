var dirtyFields = []
$(document).ready(function() {
  $('.guestRow').change(function() {
    dirtyFields.push($(this)[0].id);
  });
  $("#updateButton").click(function() {
      var uniqueDirtyFields = $.unique(dirtyFields);
      var $recordsToChange = $('<input type=hidden name=recordsToChange />').val(JSON.stringify(uniqueDirtyFields));
      $('#submitUpdate').append($recordsToChange).submit();
      return false;
  })
});