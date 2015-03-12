//Cleans the course data from a json file into a new object
//Susie Carovillano

// .getJSON code from Eni with some tweaking
// this code should go in a separate Javascript file  
//gets course catalog information in JSON file
  $.getJSON("https://spreadsheets.google.com/feeds/list/1035SQBywbuvWHoVof3G-VI0rapYJslaeYN5tTpNZq2M/od6/public/values?alt=json-in-script&gid=0&callback=?",
    function (response){
      console.log(response);
      items = response.feed.entry;
      if (response.feed) {
        console.log(response.feed.entry.length);
        processCourses(items);
      }

    });
    
    var cleanCourses = new Object();
  
    function processCourses(allCourses){  
      for (i in allCourses) {
        var course = new Object();
        course.title = allCourses[i].gsx$title.$t;
        course.shortTitle = allCourses[i].gsx$course.$t;
        course.crn = allCourses[i].gsx$crn.$t;
        course.curEnroll = allCourses[i].gsx$currentenrollment.$t;
        // REGEX to replace all dashes and new line characters with empty strings
        course.distReqs = allCourses[i].gsx$distributions.$t.replace(/-/g, "").replace(/\n/g, ",").replace(/,,/g, ", ");
        //Regex to replace all new line characters with commas
        course.meetTimes = allCourses[i].gsx$meetingtimes.$t.replace(/\n/g, ", ");
        console.log(course.meetTimes);
        course.seatsAvail = allCourses[i].gsx$seatsavailable.$t;
        course.days = allCourses[i].gsx$days.$t;
        //add courses to Object based on crn number
        var crn = course.crn;
        cleanCourses[crn] = course; 
      }      //end of for loop
    } //end of processCourses