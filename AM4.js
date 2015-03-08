/* PART 1 - Authorization and login.

// Global variables, the values come from the Developer Console
//Put your OWN clientID and apiKey

      
      
/* Function invoked when the client javascript library is loaded HEY GUYS THIS IS CODE FROME ENI MAYBE IT WILL MAKE THINGS WORK*/


var clientId = 'http://goo.gl/fbsS';
var apiKey = 'AIzaSyDRnbG6oZX51L5TlAe1XS4ch8kOg-0tpDI';
var scopes = 'https://www.googleapis.com/auth/calendar';


function handleClientLoad() {
  console.log("Inside handleClientLoad ...");
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,100);
}

/* API function to check whether the app is authorized. */
function checkAuth() {
  console.log("Inside checkAuth ...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, 
                      handleAuthResult);
}

/* Invoked by different functions to handle the result of authentication checks.*/
function handleAuthResult(authResult) {
    console.log("Inside handleAuthResult ...");
    var authorizeButton = document.getElementById('authorize-button');
    var addButton = document.getElementById('addToCalendar');
    if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          addButton.style.visibility = 'visible'; 
          //load the calendar client library
          gapi.client.load('calendar', 'v3', function(){ 
            console.log("Calendar library loaded.");
          });
    } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
}

/* Event handler that deals with clicking on the Authorize button.*/
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, 
                        handleAuthResult);
    return false;
}

/* End of PART 1 - Authentication Process. */       


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




// working on regex ok so here's her example







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
//    var coursesByDept = {AFR: [], AMST:[], ANTH:[], ARAB:[], ARTH:[], ARTS: [], ASTR: [], BIOC: [], BISC: [],
//                         CAMS: [], CHEM:[], CHIN:[], CLCV:[], CLSC:[], CPLT:[], CS:[], ECON:[], EDUC: [],
//                         ENG: [], ES: [], EXTD: [], FREN:[], GEOS:[], GER:[], GRK:[], HEBR: [], HNUR: [],
//                         HIST: [], ITAS: [], JPN: [], KOR: [], LAT:[], LING:[], MER:[], MATH:[], MES:[], MUS:[],
//                         NEUR: [], PEAC: [], PHIL: [], PHYS: [], POL: [], POL1:[], POL2:[], POL3:[], POL4:[],
//                         PORT:[], PSYC:[], QR: [], REL:[], RUSS: [], SAS: [], SOC: [], SPAN: [], SUST:[],
//                         SWA:[], THST:[], WGST:[], WRIT:[]};
//    var coursesByReq = { "Epistemology and Cognition":[], "Historical Studies": [], "Language and Literature": [],
//                        "Mathematical Modeling":[], "Natural and Physical Science":[], "Basic QR": [], "QR Overlay": [],
//                        "Religion, Ethics and Moral Philosophy": [], "Social and Behavioral Analysis": [], 
//                        "Arts, Music, Theatre, Film and Video": []};
//    var coursesByLevel = new Object();
//    var coursesByTime = new Object();

    var cleanCourses = new Object();
    var results =  new Array();
  
    var thingy;

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
      
//      console.log(cleanCourses);
      
    } //end of processCourses

  
//from the course example

$('#department').bind('click', search);
$('#distributions').bind('click', search);

function search()
{
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
} //end of search()

$.intersection = function(results1, results2)
{
    return $.grep(results1, function(i)
    {
        return $.inArray(i, results2) > -1;
    });
};



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
