function showPie() {
      (function(d3) {
        'use strict';

     $( document ).ready(function() {

	var showData = $('#show-data');
	swap=0;
	$("#toggleButton").html("Merge");
	var newData = [];
	var thisData;
	$.getJSON('gradeA.json', function (data) {
		thisData = {
                    "Name": "A",
                    "count": Object.keys(data.setElements).length

                  }
                  newData.push(thisData);

	});

	$.getJSON('gradeB.json', function (data) {
		thisData = {
                    "Name": "B",
                    "count": Object.keys(data.setElements).length

                  }
                  newData.push(thisData);

	});
	$.getJSON('gradeC.json', function (data) {
		thisData = {
                    "Name": "C",
                    "count": Object.keys(data.setElements).length

                  }
                  newData.push(thisData);

	});


	$.getJSON('gradeD.json', function (data) {
     	

                
                  thisData = {
                    "Name": "D",
                    "count": Object.keys(data.setElements).length
                  }
                  newData.push(thisData);
                		//}

        if (firstin){
		set_svg();
		firstin = false;
	   }


        //var width = 360;
        //var height = 360;
        radius = Math.min(width, height) / 2;

        color = d3.scaleOrdinal(d3.schemeCategory20b);

        arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

        var pie = d3.pie()
          .value(function(d) { return d.count; })
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
       	.on("start", dragstartedx)
       	.on("drag", draggedx)
       	.on("end", dragendedx))

		.attr('transform', 'translate(' + (width / 2) + ',' + 	(height / 2) + ')');


chartCount++;

function dragstartedx(d) {
  //alert("start");
}


function draggedx(d) {	
	
	var x = d3.event.x;
	var y = d3.event.y;
	


if (swap==0) {
		d3.select("svg").selectAll(myPath)
			.attr('transform', 'translate(' + x + ',' + 	y + ')');
	} else{
		d3.select(this)	
		.attr('transform', 'translate(' + x + ',' + 	y + ')');
	}

}



function dragendedx(d) {
 
	if (swap==1) {
	
		
		showVennC();
		
		d3.select("svg").selectAll(myPath)
		
			.attr('transform', 'translate(' + 0 + ',' + 	0 + 	')');
	}
}

function showVennC(){


group.append("circle")
    .attr("cx", 550)
    .attr("cy", 200)
    .attr("r", 120)
    .style("fill", "steelblue")
    .style("fill-opacity", ".5");

}

	 

	

	
});//end get JSON data
	 })//end document.ready.function


      })(window.d3);

}//end function showPie