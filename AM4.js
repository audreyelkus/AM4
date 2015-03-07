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
    
// global variables
var cleanCourses = new Object();

function processCourses(allCourses){  
  for (i in allCourses) {
        
        var course = new Object();
        course.title = allCourses[i].gsx$title.$t;
        course.shortTitle = allCourses[i].gsx$course.$t;
        course.crn = allCourses[i].gsx$crn.$t;
        course.curEnroll = allCourses[i].gsx$currentenrollment.$t;

                 
        // REGEX WORKS
        course.distReqs = allCourses[i].gsx$distributions.$t.replace(/-/g, "").replace(/\n/g, "");
       
        course.meetTimes = allCourses[i].gsx$meetingtimes.$t;

        course.seatsAvail = allCourses[i].gsx$seatsavailable.$t;
        course.days = allCourses[i].gsx$days.$t;
        
        console.log(course);
        
        var crn = course.crn;
        
        cleanCourses[crn] = course;
        
      }
      
      console.log(cleanCourses);
      
    }

$('#department').bind('click', search);
$('#distributions').bind('click', search);

function search()
{
  var results =  new Array();
  var results1 = new Array();
  var results2 = new Array();
  
  
  var dept = document.getElementById('department');
  var deptChoice = dept.options[dept.selectedIndex].text;
  
  var dist = document.getElementById('distributions');
  var distChoice = dist.options[dist.selectedIndex].text;
  
  console.log(deptChoice);
  console.log(distChoice);
  
  for(i in cleanCourses) {
    
   if (cleanCourses[i].shortTitle.indexOf(deptChoice) >= 0) {
      results1.push(cleanCourses[i]);
    }
    
    if (cleanCourses[i].distReqs.indexOf(distChoice) >= 0) {
      results2.push(cleanCourses[i]);
    }
    
    
  }
  
  console.log(results1);
  console.log(results2);

  results = $.intersection(results1, results2);
  console.log(results);
  
	
}

$.intersection = function(results1, results2)
{
    return $.grep(results1, function(i)
    {
        return $.inArray(i, results2) > -1;
    });
};

