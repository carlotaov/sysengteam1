$(document).ready(function () {
  	$('#get-data').click(function () {
    		var showData = $('#show-data');
		
	    	//$.getJSON('data.json', function (data) {
	   	//$.getJSON('http://team-two-end-points.azurewebsites.net/api/REST/hello', function (data) {
	    	$.getJSON('http://team-two-end-points.azurewebsites.net/api/REST/hello', function (data) {
     
		
		console.log(data);

		//alert(JSON.stringify(data));

  		var items = [];
		
 		 $.each( data, function( key, val ) {
   			 items.push( "<li id='" + JSON.stringify(key) + "'>" + JSON.stringify(val) + "</li>" );	
			

 		 });

		
 
		 $( "<ul/>", {
    		"class": "my-new-list",
    		html: items.join( "" )
  		}).appendTo( "body" );
		

      		showData.empty();
		
    	    });

	    showData.text('Loading the JSON file.');
        });
});