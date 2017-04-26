	
	var width = 160;
	var height = 160;
	var outradius = Math.min(width, height) / 2;
	var inradius = outradius / 1.25;
	var boxWidth = 600;  
  	var boxHeight = 400;
	var firstin = true;
	var group;
	var svg;
	var arc;
	var color;
	var chartCount = 0;
	var path = [];	
	var radius;



function set_svg() {
	 

	svg = d3.select('#Chart')
  		.append('svg')
    		.attr('class', 'svg')
  		.attr('width', 1500)
  		.attr('height', 600);
	group = svg.append("g")
	.attr('transform', 'translate(' + (width / 2) + ',' + 	(height / 2) + ')');

	console.log("group is defined");
	
	

}

	
  	   
function resetchart()
{
    	d3.select("svg").remove();
	firstin= true;
	chartCount=0;
}

function showChart() {


	$( document ).ready(function() {

	var showData = $('#show-data');
	

	$.getJSON('data.json', function (data) {
     	console.log(data);
      
	var newData = [];
	var nextData = [];
	for (var key in data.items[0]) {
 		// console.log(key)
  		var thisData = {
    			"Name": key,
   	 		"Value": data.items[0][key]
 	 	}
  		newData.push(thisData);
		nextData.push(thisData);	
	}

	console.log(thisData.Value);


if (firstin){
	set_svg();
	firstin = false;
}

color = d3.scale.category10();

arc = d3.svg.arc()	
  		.outerRadius(outradius)
  		.innerRadius(inradius);
	
var pie = d3.layout.pie()
  		.value(function(d, i) {
   			console.log(d)
    			return d.Value;
  		})
  		.sort(null);
		
 
var myPath = ".path"+chartCount;
var myArc   = ".arc"+chartCount;


path[chartCount] = group.selectAll('.arc')
  		.data(pie(newData))
  		.enter()
  		.append('g')
		.attr("class", function (){return "arc"+chartCount;});


path[chartCount].append("path")
  		.attr('d', arc)
 	 	.attr('fill', function(d, i) {
    			return color(d.data.Name);
  		})
		.attr("class",function(){return "path"+chartCount;})
		.call(d3.drag()
       	.on("start", dragstarted)
       	.on("drag", dragged)
       	.on("end", dragended))

.attr('transform', 'translate(' + (width / 2) + ',' + 	(height / 2) + ')');


function dragstarted(d) {
  //alert("start");
}

chartCount++;

function dragged(d) {	
	
	var x = d3.event.x;
	var y = d3.event.y;
	d3.select("svg").selectAll(myPath)
		
	.attr('transform', 'translate(' + x + ',' + 	y + ')');
}



function dragended(d) {
  //alert("ended");
}   


var items = data.items.map(function (item) {
        return item.male + ': ' + item.female ;
	  
});

     

showData.empty();

if (items.length) {
   	var content = '<li>' + items.join('</li><li>') + '</li>';
     var list = $('<ul />').html(content);
        	   
}

      	
});
	

    showData.text('Loading the JSON file.');
 });


}