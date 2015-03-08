//
//
//
//console.log(gapi["auth"]);
//gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
//      handleAuthResult);
//var resource = {
//    
//  "summary": "Appointment",
//  "location": "Somewhere",
//  "start": {
//    "dateTime": "2011-12-16T10:00:00.000-07:00"
//  },
//  "end": {
//    "dateTime": "2011-12-16T10:25:00.000-07:00"
//  }
//};
//var request = gapi.client.calendar.events.insert({
//  'calendarId': 'primary',
//  'resource': resource
//});
//request.execute(function(resp) {
//  console.log(resp);
//});
//



// Make an API call to create an event.  Give feedback to user.
function createEvent(eventData) {
// First create resource that will be send to server.
  var resource = {
      "summary": eventData.eventTitle,
      "start": {
        "dateTime": new Date(eventData.date + " " + eventData.startTime).toISOString()
      },
      "end": {
        "dateTime": new Date(eventData.date + " " + eventData.endTime).toISOString()
        }
      };
  // create the request
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': resource
  });

  // execute the request and do something with response
  request.execute(function(resp) {
    console.log(resp);
    alert("Your event was added to the calendar.");
  });
}
       


//var everythingLoaded = setInterval(function() {
//  if (/loaded|complete/.test(document.readyState)) {
//    clearInterval(everythingLoaded);
//    init(); // this is the function that gets called when everything is loaded
//  }
//}, 10);
