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

$('#search_button').bind('click', holdResults);

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
      results[i].crn + "</td> <td>" + results[i].curEnroll + "</td>"
    resultTable.appendChild(row);
    } 
   $("#results").append(resultTable);
 }