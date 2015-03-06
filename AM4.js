
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
    var coursesByDept = {CS:"Computer Science CS", lastName:"Doe", age:50, eyeColor:"blue"};
    var coursesByReq = {Cognition:[], HistoricalStudies: [], LanguageAndLit: [], MathModeling:[], NaturalScience:[],
                       BasicQR: [], QROverlay: [], Religion: [], SBA: [], Art: [], FYW: []};
    var coursesByLevel = {AFR: [], AMST:[], ANTH:[], ARAB:[], };
    var coursesByTime = new Object();
    var thingy;

    function processCourses(allCourses){  
      
      for (i in allCourses) {
        
        var course = new Object();
        course.title = allCourses[i].gsx$title.$t;
        course.shortTitle = allCourses[i].gsx$course.$t;
        course.crn = allCourses[i].gsx$crn.$t;
        course.curEnroll = allCourses[i].gsx$currentenrollment.$t

        course.distReqs = allCourses[i].gsx$distributions.$t.replace("------------------------------\n", "");
        
        course.meetTimes = allCourses[i].gsx$meetingtimes.$t

        course.seatsAvail = allCourses[i].gsx$seatsavailable.$t
        course.days = allCourses[i].gsx$days.$t
        
        console.log(course);
        
        var distRe = course.distReqs
        
        //Fill courses by Req
        if (distRe.indexOf("Epistemology and Cognition") >= 0) {
          coursesByReq["Cognition"].push(course);
        }
        if (distRe.indexOf("Historical Studies") >= 0) {
          coursesByReq["HistoricalStudies"].push(course);
        }
        if (distRe.indexOf("Language and Literature") >= 0) {
          coursesByReq["LanguageAndLit"].push(course);
        }
        if (distRe.indexOf("Mathematical Modeling") >= 0) {
          coursesByReq["MathModeling"].push(course);
        }
        if (distRe.indexOf("Natural and Physical Science") >= 0) {
          coursesByReq["NaturalScience"].push(course);
        }
        if (distRe.indexOf("Basic QR") >= 0) {
          coursesByReq["BasicQR"].push(course);
        }
        if (distRe.indexOf("QR Overlay") >= 0) {
          coursesByReq["QROverlay"].push(course);
        }
        if (distRe.indexOf("Religion, Ethics and Moral Philosophy") >= 0) {
          coursesByReq["Religion"].push(course);
        }
        if (distRe.indexOf("Social and Behavioral Analysis") >= 0) {
          coursesByReq["SBA"].push(course);
        }
        if (distRe.indexOf("Arts, Music, Theatre, Film and Video") >= 0) {
          coursesByReq["Art"].push(course);
        }
        if (distRe.indexOf("First-Year Writing") >= 0) {
          coursesByReq["FYW"].push(course);
        }
        
        
        var short = course.shortTitle;
        
        if (short.indexOf("WRIT") >= 0) {
          coursesByDept["Cognition"].push(course);
        }
        if (short.indexOf("Historical Studies") >= 0) {
          coursesByDept["HistoricalStudies"].push(course);
        }
        if (short.indexOf("Language and Literature") >= 0) {
          coursesByDept["LanguageAndLit"].push(course);
        }
        if (short.indexOf("Mathematical Modeling") >= 0) {
          coursesByDept["MathModeling"].push(course);
        }
        if (short.indexOf("Natural and Physical Science") >= 0) {
          coursesByDept["NaturalScience"].push(course);
        }
        if (short.indexOf("Basic QR") >= 0) {
          coursesByDept["BasicQR"].push(course);
        }
        if (short.indexOf("QR Overlay") >= 0) {
          coursesByDept["QROverlay"].push(course);
        }
        if (short.indexOf("Religion, Ethics and Moral Philosophy") >= 0) {
          coursesByDept["Religion"].push(course);
        }
        if (short.indexOf("Social and Behavioral Analysis") >= 0) {
          coursesByDept["SBA"].push(course);
        }
        if (short.indexOf("Arts, Music, Theatre, Film and Video") >= 0) {
          coursesByDept["Art"].push(course);
        }
        if (short.indexOf("First-Year Writing") >= 0) {
          coursesByDept["FYW"].push(course);
        }
        
        
        
      
              
        
      }
      
      console.log(coursesByReq);
      
    }
  