document.addEventListener("DOMContentLoaded", function(event) {
    //Do work
	$(document).ready(function () {


		$('#get-data').click(function () {
			var showData = $('#show-data');


		$.getJSON("{{ url_for('static', filename='data.json') }}", function (data) {
			console.log(data);

		var newData = [];
		for (var key in data.items[0]) {
			// console.log(key)
			var thisData = {
					"Name": key,
				"Value": data.items[0][key]
			}
			newData.push(thisData)
		}

		console.log(thisData.Value);

		var width = 360;
		var height = 360;
		var outradius = Math.min(width, height) / 2;
		var inradius = outradius / 1.25;

		var color = d3.scale.category10();

		var svg = d3.select('#Chart')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + (width / 2) + ',' + 	(height / 2) + ')');
		var arc = d3.svg.arc()
		.outerRadius(outradius)
		.innerRadius(inradius);
		var pie = d3.layout.pie()
		.value(function(d, i) {
		 console.log(d)
			return d.Value;
		})
		.sort(null);
		var path = svg.selectAll('path')
		.data(pie(newData))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function(d, i) {
			return color(d.data.Name);
		});

			var items = data.items.map(function (item) {
			return item.male + ': ' + item.female ;

		  });



		  showData.empty();

		  if (items.length) {
			var content = '<li>' + items.join('</li><li>') + '</li>';
			var list = $('<ul />').html(content);
			showData.append(list);

		  }


		});

		showData.text('Loading the JSON file.');
	  });


	});

});