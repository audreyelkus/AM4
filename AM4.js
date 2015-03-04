 console.log(gapi["auth"]);
gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
var resource = {
    
  "summary": "Appointment",
  "location": "Somewhere",
  "start": {
    "dateTime": "2011-12-16T10:00:00.000-07:00"
  },
  "end": {
    "dateTime": "2011-12-16T10:25:00.000-07:00"
  }
};
var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': resource
});
request.execute(function(resp) {
  console.log(resp);
});






// CODE FROM ENI    
// this code should go in a separate Javascript file  
  $.getJSON("https://spreadsheets.google.com/feeds/list/1035SQBywbuvWHoVof3G-VI0rapYJslaeYN5tTpNZq2M/od6/public/values?alt=json-in-script&gid=0&callback=?",
    function (response){
      console.log(response);
      items = response.feed.entry;
      if (response.feed) {
        console.log(response.feed.entry.length);
        processCourses(items);
      }

    });
    
    var cleanedCourses; // global variable
    function processCourses(allCourses){     
      // your code for getting the desirced information from each course
    }
  