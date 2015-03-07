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
    var coursesByDept = {AFR: [], AMST:[], ANTH:[], ARAB:[], ARTH:[], ARTS: [], ASTR: [], BIOC: [], BISC: [],
                         CAMS: [], CHEM:[], CHIN:[], CLCV:[], CLSC:[], CPLT:[], CS:[], ECON:[], EDUC: [],
                         ENG: [], ES: [], EXTD: [], FREN:[], GEOS:[], GER:[], GRK:[], HEBR: [], HNUR: [],
                         HIST: [], ITAS: [], JPN: [], KOR: [], LAT:[], LING:[], MER:[], MATH:[], MES:[], MUS:[],
                         NEUR: [], PEAC: [], PHIL: [], PHYS: [], POL: [], POL1:[], POL2:[], POL3:[], POL4:[],
                         PORT:[], PSYC:[], QR: [], REL:[], RUSS: [], SAS: [], SOC: [], SPAN: [], SUST:[],
                         SWA:[], THST:[], WGST:[], WRIT:[]};
    var coursesByReq = { "Epistemology and Cognition":[], "Historical Studies": [], "Language and Literature": [],
                        "Mathematical Modeling":[], "Natural and Physical Science":[], "Basic QR": [], "QR Overlay": [],
                        "Religion, Ethics and Moral Philosophy": [], "Social and Behavioral Analysis": [], 
                        "Arts, Music, Theatre, Film and Video": []};
    var coursesByLevel = new Object();
    var coursesByTime = new Object();

    var cleanCourses = new Object();
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
      
      console.log(cleanCourses);
      
    }


        
        
        //when search by dept
        //loop through crn looking for match for dept
        //if second condition
        //loop through subset array that matches 1st condition
        
  
//from the course example

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
    
//    for i in results { 
      //create element td, set innerHTML = results[i].className (or title or something
  //    wanna create one table row for the whole class, one column will b CRN number, one will be department 
      //vardiv = document.createElement 
       // divname.appendChild(results) 
  }
  
   
            
    
  console.log(results1);
  console.log(results2);

  results = $.intersection(results1, results2);
  console.log(results);
  
	
}



 function holdResults(results) {
        //creatives div with all the results - intersection of results 1 and 2 - in it.
        // how to test this w/o a "on Submit Button click" 
        var table = document.createElement('table');
        table.className = "RESULTS"; 
        
    for (i in results) {
            innerHTML = results[i].className
            var row = document.createElement('tr');
            tr.innerHTML = "<td>" + results[i].title + "</td> <td>" + results[i].shortTitle + "</td>               <td>" + results[i].crn + "</td> <td>" + results[i].curEnroll + "</td>"
            


$.intersection = function(results1, results2)
{
    return $.grep(results1, function(i)
    {
        return $.inArray(i, results2) > -1;
    });
};

