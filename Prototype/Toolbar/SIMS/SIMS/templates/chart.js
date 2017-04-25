	
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
	var swap=0;//0=drag,1=merge
	


function set_svg() {
	 

	svg = d3.select('#Chart')
  		.append('svg')
    		.attr('class', 'svg')
  		.attr('width', 1500)
  		.attr('height', 600);
	group = svg.append("g")
.attr('transform', 'translate(' + (width / 2) + ',' + 	(height / 2) + ')');


}

	
  	   
function resetchart()
{
    	d3.select("svg").remove();
	firstin= true;
	chartCount=0;
}

function toggle()
{
	
	
	if (swap==0){		
		swap=1;
		$("#toggleButton").html("Drag");
	} else{
		swap=0;
		$("#toggleButton").html("Merge");
	}

}

function showChart() {

	var newData = [];
	var nextData = [];
	swap=0;

	$( document ).ready(function() {


	$("#toggleButton").html("Merge");

	var showData = $('#show-data');
	$.getJSON( 'males.json', function (response) {


		//alert(Object.keys(response.setElements).length);
	var thisData1 = {
    			"Name": "male",
   	 		"Value": Object.keys(response.setElements).length
 	}
  	newData.push(thisData1);
	nextData.push(thisData1);
	
	});


	$.getJSON( 'females.json', function (data) {

	
	thisData = {
    			"Name": "female",
   	 		"Value": Object.keys(data.setElements).length
 	}
  	newData.push(thisData);
	nextData.push(thisData);	 

	//alert(Object.keys(data.setElements).length);

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
   			//console.log(d)
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
  
}

chartCount++;

function dragged(d) {	
	var x = d3.event.x;
	var y = d3.event.y;
	if (swap==0) {
		
		d3.select("svg").selectAll(myPath)
		
		.attr('transform', 'translate(' + x + ',' + 	y + ')');
	} else {
	d3.select(this)
.attr('transform', 'translate(' + x + ',' + 	y + ')');
	}

}



function dragended(d) {
  	if (swap==1) {

		
		
		showVennD();
		
		d3.select("svg").selectAll(myPath)
		
			.attr('transform', 'translate(' + 0 + ',' + 	0 + 	')');
	
	 

	}  

}

function showVennD(){


group.append("circle")
    .attr("cx", 350)
    .attr("cy", 200)
    .attr("r", 120)
    .style("fill", "red")
    .style("fill-opacity", ".5"); 
}

     

showData.empty();


      	
}, 'jsonp');
	

    //showData.text('Loading the JSON file.');
 });


}