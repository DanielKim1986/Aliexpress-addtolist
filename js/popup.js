jQuery(document).ready(function () {
	chrome.storage.local.get('downloadList', function (result) {
		if(result.downloadList){
			var downloadCount = JSON.parse(result.downloadList);
			console.log(downloadCount);
			$('#url_count').text(downloadCount.length);
			var urlStatus = true;
			for(var i=0;i<downloadCount.length;i++){
				$('#result_table tr:last').after('<tr><td>'+(i+1)+'</td><td>'+downloadCount[i]+'</td></tr>');
			}
		}
	});
	$('#clr_btn').click(function(){
		$('#result_table').find("tr:gt(0)").remove();
		chrome.storage.local.remove('downloadList', function() {
		});
	});
	$('#cpy_btn').click(function(){
		chrome.storage.local.get('downloadList', function (result) {
			if(result.downloadList){
				var downloadCount = JSON.parse(result.downloadList);
				chrome.runtime.sendMessage({
					from:    'copy',
					data: downloadCount
				});
			}
		});
		
	});
});
 
