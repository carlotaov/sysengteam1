function showPie() {
      (function(d3) {
        'use strict';

     $( document ).ready(function() {

	var showData = $('#show-data');
	

	$.getJSON('piedata.json', function (data) {
     	console.log(data);
 

                var newData = [];
                for (var key in data.data[0]) {
                 // console.log(key)
                  var thisData = {
                    "Name": key,
                    "count": data.data[0][key]
                  }
                  newData.push(thisData);
                }

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
	d3.select("svg").selectAll(myPath)
		
	.attr('transform', 'translate(' + x + ',' + 	y + ')');
}



function dragendedx(d) {
  //alert("ended");
}   


	
});//end get JSON data
	 })//end document.ready.function


      })(window.d3);

}//end function showPie