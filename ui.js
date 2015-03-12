//
//Susie Carovillano

var results =  new Array();

//bind search button to search function
$('#search_button').bind('click', search);

function search()
{ 
  var results1 = new Array();
  var results2 = new Array();
  var results3 = new Array();
  
  var dept = document.getElementById('department');
  var deptChoice = dept.options[dept.selectedIndex].text;
  if (deptChoice.indexOf("ALL")>= 0) deptChoice = "";
  
  var dist = document.getElementById('distributions');
  var distChoice = dist.options[dist.selectedIndex].text;
  if (distChoice.indexOf("ALL")>= 0) distChoice = "";
  
  var times = document.getElementById('times');
  var timeChoice = times.options[times.selectedIndex].text;
  if (timeChoice.indexOf("ALL")>= 0) timeChoice = "";
  
  console.log(deptChoice);
  console.log(distChoice);
  
  for(i in cleanCourses) {
    if (cleanCourses[i].shortTitle.indexOf(deptChoice) >= 0) {
      results1.push(cleanCourses[i]);
    }
    
    if (cleanCourses[i].distReqs.indexOf(distChoice) >= 0) {
      results2.push(cleanCourses[i]);
    }
    
    if (cleanCourses[i].meetTimes.indexOf(timeChoice) >= 0) {
      results3.push(cleanCourses[i]);
    }
  }
  
  console.log("1");
  console.log(results1);
  console.log("2");
  console.log(results2);
  console.log("3");
  console.log(results3);

  var resultsStep = $.intersection(results1, results2); //filters by dist and department
  results = $.intersection(resultsStep, results3); //filters by time
  
  console.log("meets all filters");
  console.log(results);
  
  //puts results on html page
  holdResults();
} //end of search()

$.intersection = function(results1, results2)
{
    return $.grep(results1, function(i)
    {
        return $.inArray(i, results2) > -1;
    });
};


function holdResults() {
    //clear prior results
  $("#results").html("");
    
  //creatives div with all the results - intersection of results 1 and 2 - in it.
  var resultTable = document.createElement('table');
  console.log("hi!!")   
  resultTable.className = "table-striped"; 
          
  console.log(results);
  console.log(resultTable);
  
  for (i = 0; i < results.length; i++) {
    console.log(i);
    var row = document.createElement('tr');
    row.innerHTML = "<td>" + results[i].title + "</td> <td>" + results[i].shortTitle + "</td> <td>" +
      results[i].crn + "</td> <td>" + results[i].meetTimes + "</td>"
    resultTable.appendChild(row);
    } 
   $("#results").append(resultTable);
 }