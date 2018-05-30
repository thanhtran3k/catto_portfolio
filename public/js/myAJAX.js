$(document).ready(function(){
	$('.delete-button').on('click', function(){
		var id = $(this).data('id');
		var url = '/admin/delete/'+id;

		//confirm
		if(confirm('Do you really want to delete?')){
			$.ajax({
				url: url,
				type: 'DELETE',
				success: function(result){
					window.location = '/admin';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
});