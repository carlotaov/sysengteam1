	var bar  = [];
	var x_axis = [];
	var y_axis = [];
	//var chartCount = 0;

function showBar() {


	$( document ).ready(function() {

	var showData = $('#show-data');
	
	if (firstin){
		set_svg();
		firstin = false;
	}

	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);


d3.tsv("data.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);


//start here
  x_axis[chartCount] = group.append("g")
      .attr("class", function(){ return "axis axis--x"+chartCount;})	
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  y_axis[chartCount] = group.append("g")
      .attr("class", function(){ return "axis axis--y"+chartCount;})
	 .call(d3.axisLeft(y).ticks(10, "%"))
    	 .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  bar[chartCount] = group.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function() { return "bar"+chartCount; })
	 .style("fill","steelblue")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
.call(d3.drag()
       	.on("start", bardragstarted)
       	.on("drag", bardragged)
       	.on("end", bardragended))

      .attr("height", function(d) { return height - y(d.frequency); });
});


chartCount++;     



function bardragged(d) {	
	
	var x = d3.event.x;
	var y = d3.event.y;
	var drag_x = ".axis--x"+chartCount;
	var drag_y = ".axis--y"+chartCount;
	var drag_bar = ".bar"+chartCount;

	d3.select("svg").selectAll(drag_x)		
	.attr('transform', 'translate(' + x + ',' + 	(y + height) + ')');

	d3.select("svg").selectAll(drag_y)		
	.attr('transform', 'translate(' + x + ',' + 	y + ')');

	d3.select("svg").selectAll(drag_bar)		
	.attr('transform', 'translate(' + x + ',' + 	y + ')');
	
	

}

function bardragstarted(d) {
  //alert("ended");
}   

function bardragended(d) {
  //alert("ended");
}   



showData.empty();


      	

	

    showData.text('Loading the JSON file.');
 });


}

