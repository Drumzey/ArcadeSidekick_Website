var currentGameName = '';

var timedGames = [];
timedGames.push('quick_and_crash')
timedGames.push('cadash')
timedGames.push('neo_drift_out_new_technology')

var baseUrl = "https://nvsngzyuq3.execute-api.eu-west-2.amazonaws.com/Beta";
var latestXHTTP = '';

function GetLeaderboard(gameName)
{
	currentGameName = gameName;
	
    CallACOnlineWithBodyAndWait(baseUrl + '/getleaderboard2?gamename=' + gameName,
        'GET',
        null,
        function () 
		{
            SuccessfulGetLeaderboard();
        },
        function () 
		{
        
        },
        function () 
		{ 
		},
        'Loading Leaderboard.....');     
}

function CallACOnlineWithBodyAndWait(url, type, body, successCallback, failureCallback, completeCallBack) {
    try {

		var getRequest = $.ajax({
			url: url,
			type: type,			
			contentType: 'application/json',
			success: function () {
				latestXHTTP = getRequest;
				successCallback();
			},
			error: function (xhr, ajaxOptions, thrownerror) {				
				failureCallback();
			},
			complete: function () {
				completeCallBack();
			}
		});
    }
    catch (error)
    {
        //CreatePopup(errorOnlinePopup);
    }
}

function SuccessfulGetLeaderboard() {

    var scores = GetScores(latestXHTTP.responseText);    
    OrderScores(scores);    
    DisplayAllScores(scores);    
}

function GetScores(responseText)
{
    var response = JSON.parse(responseText);
    var scores = [];

    for (var prop in response) {
        if (response.hasOwnProperty(prop)) {
            if (response[prop] !== "0" && response[prop] !== 0) {
                scores.push([prop, response[prop]]);
            }
        }
    }

    return scores;
}

function OrderScores(scores)
{
	if (timedGames.indexOf(currentGameName) === -1) {
        scores.sort(function (a, b) {
            return b[1] - a[1];
        });
    }
    else {
        scores.sort(function (a, b) {
            return a[1] - b[1];
        });
    }
}

function DisplayAllScores(sortable) {

	var new_tbody = document.createElement('tbody');	
	new_tbody.setAttribute("id", "scoreTableBody");
	
	var old_tbody = document.getElementById('scoreTableBody');
	old_tbody.parentNode.replaceChild(new_tbody, old_tbody)

	var imagesrc = "img/banners/all/" + currentGameName.replace(/_/g, ' ') + ".png";
	$('#leaderboardMarquee').attr("src", imagesrc);      

    var positionArray = [];
    var userNameArray = [];
    var gameScoreArray = [];
    var myposition = 0;
    var colours = ["#FF0000", "#FFCB0E", "#FFFF00", "#72FF51", "#00CB51", "#00A8F5", "#B9BBE1", "#FFC300", "#F0F117", "#7CFF50"];

    for (var i = 0; i < sortable.length; i++) {
        var player = sortable[i][0];
        var score = sortable[i][1];

        if (timedGames.indexOf(currentGameName) !== -1) {
            score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
        }
        else {
            score = addComma(score.toString());
        }

        var positionInTable = (i + 1).toString();
        if (i + 1 === 1 || (positionInTable.endsWith("1") && !positionInTable.endsWith("11"))) {
            positionInTable += "st";
        }
        else if (i + 1 === 2 || (positionInTable.endsWith("2") && !positionInTable.endsWith("12"))) {
            positionInTable += "nd";
        }
        else if (i + 1 === 3 || (positionInTable.endsWith("3") && !positionInTable.endsWith("13"))) {
            positionInTable += "rd";
        }
        else {
            positionInTable += "th";
        }

		positionArray.push(positionInTable);
		userNameArray.push(player);
		gameScoreArray.push(score);
    }

	var table = document.getElementById("scoretable");
	
	for(var i = 0; i < positionArray.length; i++)
	{
		var colourIndex = i % 9;
        var colour = colours[colourIndex];
		
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		cell1.innerHTML = positionArray[i];
		cell2.innerHTML = userNameArray[i]; 
		cell3.innerHTML = gameScoreArray[i]; 	
		cell1.style="color:" + colour;		
		cell2.style="color:" + colour;		
		cell3.style="color:" + colour;		
	}		
	
	loadPopup();
}

var popupStatus = 0;

function loadPopup() {
 if(popupStatus == 0) {
 closeloading();
 $("#Popup").fadeIn(0500);
 $("#backgroundPopup").css("opacity", "0.7");
 $("#backgroundPopup").fadeIn(0001);
 popupStatus = 1;
 }
 }

 function closeloading() {
  $("div.loader").fadeOut('normal');
  }
 
function MillisecondsToMinutesSecondsMilliseconds(ms) {
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    secondsms = ms % (1000);
    millims = Math.floor(secondsms);
    return minutes + ":" + ("00" + sec).slice(-2) + "." + ("000" + millims).slice(-3);
}

function addComma(nStr) {
    nStr = nStr.replace(/,/g, '');
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    
    return x1 + x2;
}