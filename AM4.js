
//from the course example


function search()
{
	//First, clear the classes:
	document.getElementById('coursesPossible').innerHTML= '   ';
	if (((document.getElementById("department").selectedIndex) == 0) || 
		((document.getElementById("distributions").selectedIndex) == 0)) {
		$.getJSON("courses.json", function (data) {
    		var items = [];
    		$.each(data, function(key, val) {
    			items.push('<p class="singleCourse"><input type = "checkbox" class = "indentElement"class = "selected" id = "' 
						+ key + '" value = "' + val.Course + '">' 
    					  	+ val.CRN + ': ' + val.Course + ': ' + val.Title + ': ' + " Prof. " 
						+ val.Instructors + " : " + val.Days + ': ' + val.Times[0] + '-' 
						+ val.Times[1] + '</p>'); 
    			});
		$('<form/>', {'class': 'myCourses', 'class': 'indentElement', 'id': 'courseList', html: items.join('')
			}).appendTo(document.getElementById('coursesPossible'));
	});	
		document.getElementById('department').options.selectedIndex = -1;
		document.getElementById('distributions').options.selectedIndex = -1;
	} else {
	if ((document.getElementById("department").selectedIndex) > 0) {
		searchHelper('department', 'departments.json');
	} 
	if ((document.getElementById("distributions").selectedIndex) > 0) {
		searchHelper('distributions', 'distributions.json');
	}
	}	
}
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

        
        //when search by dept
        //loop through crn looking for match for dept
        //if second condition
        //loop through subset array that matches 1st condition
        
        
        
      }
      
      console.log(cleanCourses);
      
      
      //search functionality
      //if (x.search("Modeling")) { console.log(coursesByReq["MathModeling"]);};
      
      
      
    }
  