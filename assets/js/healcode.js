$(document).ready(function() {
  var scheduleWidgetMarkup = '<healcode-widget data-type="schedules" data-widget-partner="mb" data-widget-id="c41849b" data-widget-version="0.1"></healcode-widget>';
  var customLinkMarkup = '<healcode-widget data-type="account-link" data-version="0.2" data-site-id="8516" data-inner-html="LOGIN LINK"></healcode-widget>';
  var enrollmentWidgetMarkup = '<healcode-widget data-type="enrollments" data-widget-partner="mb" data-widget-id="2711425ca8b" data-widget-version="0.1"></healcode-widget>';

  $('body').on('click', '#schedule-add', function(e) {
    e.preventDefault();
    $('#widget-container').html(scheduleWidgetMarkup);
  });

  $('body').on('click', '#link-add', function(e) {
    e.preventDefault();
    $('#widget-container').html(customLinkMarkup);
  });

  $('body').on('click', '#enrollment-add', function(e) {
    e.preventDefault();
    $('#widget-container').html(enrollmentWidgetMarkup);
  });
});