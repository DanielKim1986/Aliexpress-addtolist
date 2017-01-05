function createTab(){
	chrome.storage.local.get('urlList', function (result) {
			var listUrl = JSON.parse(result.urlList);
			chrome.tabs.create({
				 url: "http:"+listUrl[0]
			 });
	});
}

chrome.runtime.onMessage.addListener(function (msg, sender,sendResponse) {
  if ((msg.from === 'content') && (msg.data)) {
		$.ajax({
			//url: 'http://dualup.com/ecommerce/uni_api.php?new_product=1',
			//url: 'http://scraper/uni_api.php',
			url: 'http://emoneyhosting.com/inventory/uni_api.php',
			type: 'post',
			dataType: 'text',
			success: function (data) {
				console.log(data);
				chrome.tabs.sendMessage(sender.tab.id, {status:"imported"},function(response){
				});
			},
			data: {
				data: msg.data
			}
		});
  }else if((msg.from == 'copy') && msg.data){
		 console.log(msg.data);
		 var cpy_str = '';
		 for(var i=0;i<msg.data.length;i++){
			cpy_str+= msg.data[i]+'\n';
		 }
		  var input = document.createElement('textarea');
			document.body.appendChild(input);
			input.value = cpy_str;
			input.focus();
			input.select();
			document.execCommand('Copy');
			input.remove();
	}else if((msg.text == 'list')){
		 console.log(msg.data);
		 var urlList = msg.data;
		 chrome.storage.local.set({'urlList': JSON.stringify(urlList)});
		 createTab();
	}else if((msg.from == 'create') &&(msg.data)){
		chrome.tabs.create({"url":msg.data,'active':false},function(tab){
			setTimeout(function(){
				chrome.tabs.remove(tab.id);
			},20000);
		});
	}else if((msg.text == 'create')){
		createTab();
	}else if(msg.from=='auth' && msg.data){
		console.log(sender.tab.id);
		var tabid = sender.tab.id;
		//sendResponse({status:"success"});
		$.ajax({
			url: 'https://videowaveapp.com/web/',
			type: 'post',
			dataType: 'text',
			success: function (data) {
				console.log(data['response']);
				if(data['response']=="success"){
					chrome.tabs.sendMessage(tabid, {status:"success"},function(response){
					});
				}else{
					chrome.tabs.sendMessage(tabid, {status:"fail"},function(response){
					});
				}
			},
			fail: function(data){
					chrome.tabs.sendMessage(tabid, {status:"fail"},function(response){
					});
			},
			data: {
				data: msg.data
			}
		});
	}else if(msg.from=='order_list' && msg.data){
		console.log(msg.data);
		if(msg.where=='content'){
			chrome.tabs.update(sender.tab.id,{url:msg.data});
		}else{
			chrome.tabs.create({ url: msg.data });
		}
	}
});


