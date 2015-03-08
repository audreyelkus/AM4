
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