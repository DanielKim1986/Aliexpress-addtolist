console.log("product.js")
function getBase64FromImageUrl(url) {
    
}
function addListProduct(){
	var product_list = [];
	if($("#list-items")){
		$("#list-items ul li .picRind").each(function(){
			product_list.push($(this).attr('href'));
		});
		console.log(product_list);
		if(product_list.length!=-1){
			chrome.extension.sendMessage({text:"list",data:product_list},function(reponse){
			});
		}
	}
}
function addProduct() {
		chrome.storage.local.get('author', function (result) {
			if(result.author=='success'){
				
			}
		});
		if($(".product-name")){
			var title = $(".product-name").text();
			var additional_images = [];
			var thumb_images = [];
			$(".image-thumb-list li span img").each(function(){
				additional_images.push($(this).attr("src"));
				thumb_images.push($(this).attr("src").replace("_50x50.jpg",""));
			});
			if(additional_images.length==0 &&thumb_images.length==0){
				$("#j-sku-list-1 li").each(function(){
					additional_images.push($(this).find("a img").attr("src"));
					thumb_images.push($(this).find("a img").attr("bigpic"));
				});
			}
			var price = "";
			var discount_price = "";
			var discount_left = "";
			var discount_rate = "";
			if($(".p-del-price-content").length){
				price = $(".p-del-price-content").text().trim();
				//discount_price = $(".p-price-content").text().trim();
				discount_price = $("#j-sku-discount-price").text().trim();
				console.log(discount_price);
				discount_rate = $(".p-discount-rate").text();
				discount_left = $(".p-eventtime-left").text();
			}else{
				price = $(".p-price-content").text().trim();
			}
			var product_options = "";
			product_options = $("#j-product-info-sku").html();
			var item_specs = {};
			var returnArray = {};
			$("#j-product-info-sku dl.p-property-item").each(function(index){
				var item_spec_name = $(this).find('dt.p-item-title').text().replace(":","").toLowerCase();
				console.log(item_spec_name);
				returnArray[item_spec_name] = [];
				var cur_index = index+1;
				$(this).find("ul").find("img").each(function(){
					returnArray[item_spec_name].push({
						price: 0,
						name: $(this).attr("title"),
						image: $(this).attr("src")
					});
				});
				$(this).find("ul").find("span").each(function(){
					returnArray[item_spec_name].push({
						price: 0,
						name: $(this).text(),
						image: ""
					});
				});
			});
			console.log(returnArray);

			var item_description = "";
			item_decription = $(".description-content").html();
			var product_id = $("input[name='objectId']").val();
			var country_code = $("input[name='countryCode']").val();
			$.ajax({
				url: 'https://freight.aliexpress.com/ajaxFreightCalculateService.htm?f=d&productid='+product_id+'&count=1&currencyCode=USD&sendGoodsCountry=CN&country='+country_code,
				type: 'GET',
				success: function (data) {
					console.log(JSON.parse(data.substring(1, data.length - 1)));
					var shipping = JSON.parse(data.substring(1, data.length - 1));
					var freight = shipping.freight;
					if(discount_price!=""){
						var result_string = '{"product":{"url":"'+location.href+'","title":"'+title+'","additional_images":"'+additional_images+'","thumb_images":"'+thumb_images+'","price":"'+price.replace(/(\r\n|\n|\r)/gm,"").split(' ')[1].replace('$','').replace('/','')+'","discount_price":"'+discount_price.replace(/(\r\n|\n|\r)/gm,"").split(' ')[1].replace('$','').replace('/','')+'","discount_rate":"'+discount_rate.split('%')[0]+'","discount_left":"'+discount_left+'","item_description":"'+encodeURIComponent(item_decription)+'","item_specs":' + JSON.stringify(item_specs) + ',"options":' + JSON.stringify(returnArray) + ',"freight":' + JSON.stringify(freight) + '}}';
					}else{
						var result_string = '{"product":{"url":"'+location.href+'","title":"'+title+'","additional_images":"'+additional_images+'","thumb_images":"'+thumb_images+'","price":"'+price.replace(/(\r\n|\n|\r)/gm,"").split(' ')[1].replace('$','').replace('/','')+'","discount_price":"","discount_rate":"'+discount_rate.split('%')[0]+'","discount_left":"'+discount_left+'","item_description":"'+encodeURIComponent(item_decription)+'","item_specs":' + JSON.stringify(item_specs) + ',"options":' + JSON.stringify(returnArray) + ',"freight":' + JSON.stringify(freight) + '}}';
					}
					console.log(JSON.parse(result_string));
					chrome.runtime.sendMessage({
						from:    'content',
						data: result_string
					});
				}
			});
		}
}
function sendProductList() {
		if($(".product-name")){
			var title = $(".product-name").text();
			var additional_images = [];
			var thumb_images = [];
			$(".image-thumb-list li span img").each(function(){
				additional_images.push($(this).attr("src"));
				thumb_images.push($(this).attr("src").replace("_50x50.jpg",""));
			});
			if(additional_images.length==0 &&thumb_images.length==0){
				$("#j-sku-list-1 li").each(function(){
					additional_images.push($(this).find("a img").attr("src"));
					thumb_images.push($(this).find("a img").attr("bigpic"));
				});
			}
			var price = "";
			var discount_price = "";
			var discount_left = "";
			var discount_rate = "";
			if($(".p-del-price-content").length){
				price = $(".p-del-price-content").text().trim();
				discount_price = $(".p-price-content").text().trim();
				discount_rate = $(".p-discount-rate").text();
				discount_left = $(".p-eventtime-left").text();
			}else{
				price = $(".p-price-content").text().trim();
			}
			var product_options = "";
			product_options = $("#j-product-info-sku").html();
			
			
			
			var item_specs = {};
			$(".product-property-list li").each(function(){
				item_specs[$(this).find('span.propery-title').text().replace(":","")] = $(this).find('span.propery-des').text();
			});
			var item_description = "";
			item_decription = $(".description-content").html();
			var product_id = $("input[name='objectId']").val();
			var country_code = $("input[name='countryCode']").val();
			$.ajax({
				url: 'https://freight.aliexpress.com/ajaxFreightCalculateService.htm?f=d&productid='+product_id+'&count=1&currencyCode=USD&sendGoodsCountry=CN&country='+country_code,
				type: 'GET',
				success: function (data) {
					console.log(JSON.parse(data.substring(1, data.length - 1)));
					var shipping = JSON.parse(data.substring(1, data.length - 1));
					var freight = shipping.freight;
					if(discount_price!=""){
						var result_string = '{"product":{"url":"'+location.href+'","title":"'+title+'","additional_images":"'+additional_images+'","thumb_images":"'+thumb_images+'","price":"'+price.replace(/(\r\n|\n|\r)/gm,"").split(' ')[1].replace('$','').replace('/','')+'","discount_price":"'+discount_price.replace(/(\r\n|\n|\r)/gm,"").split(' ')[1].replace('$','').replace('/','')+'","discount_rate":"'+discount_rate.split('%')[0]+'","discount_left":"'+discount_left+'","item_description":"'+encodeURIComponent(item_decription)+'","item_specs":' + JSON.stringify(item_specs) + ',"freight":' + JSON.stringify(freight) + '}}';
					}else{
						var result_string = '{"product":{"url":"'+location.href+'","title":"'+title+'","additional_images":"'+additional_images+'","thumb_images":"'+thumb_images+'","price":"'+price.replace(/(\r\n|\n|\r)/gm,"").split(' ')[1].replace('$','').replace('/','')+'","discount_price":"","discount_rate":"'+discount_rate.split('%')[0]+'","discount_left":"'+discount_left+'","item_description":"'+encodeURIComponent(item_decription)+'","item_specs":' + JSON.stringify(item_specs) + ',"freight":' + JSON.stringify(freight) + '}}';
					}
					console.log(JSON.parse(result_string));
					chrome.runtime.sendMessage({
						from:    'content',
						data: result_string
					});
					chrome.storage.local.get('urlList', function (result) {
							var removeStorageList = JSON.parse(result.urlList);
							console.log(removeStorageList);
							if(removeStorageList.length && removeStorageList.indexOf(location.href.replace("http:",""))>-1){
								var index = removeStorageList.indexOf(location.href.replace("http:",""));
								removeStorageList.splice(index, 1);
								chrome.storage.local.set({'urlList': JSON.stringify(removeStorageList)});
								console.log(removeStorageList);
								chrome.extension.sendMessage({text:"create"},function(reponse){
									window.close();
								});
							}

					});
				}
			});
		}
}
jQuery(document).ready(function () {
    var importButton = $('<a href="javascript:;" id="add-product-button" class="add-cart-btn" style="background-color: #a4c739;" data-widget-cid="widget-40">Add to Shop</a>');
    $(".product-action-main").append(importButton);
		var importListButton = $('<button id="add-list-button" class="add-cart-btn" style="background-color: #a4c739;width:100%;height:50px;" >Add List Product</button>');
		$("#gallery-item").append(importListButton);
		var image_link = chrome.extension.getURL("/icons/close_pop.png");
		$('#j-product-action-block').prepend("<div id='login_failed' class='login_failed' style='display:none;text-align: center;font-size: 20px;color: red;'>Wrong Email or Password</div>");
		$('#j-product-action-block').prepend("<div id='login_success' class='login_success' style='display:none;text-align: center;font-size: 20px;color: #a4c739;'>You have been successfully logged</div>");
		$('body').append('<div id="login-box" class="login-popup">\
          <form method="post" class="signin" action="#">\
            <fieldset class="textbox">\
            	<label class="username">\
                <span>Email</span>\
                <input id="username" name="username" value="" type="text" autocomplete="on" placeholder="Email">\
              </label>\
              <label class="password">\
                <span>Password</span>\
                <input id="password" name="password" value="" type="password" placeholder="Password">\
              </label>\
              <button class="submit form_button" type="button">Sign in</button>\
             </fieldset>\
          </form>\
				 </div>');
		$('body').append('<div id="mask"></div>');
		console.log(location.href);
		chrome.storage.local.get('urlList', function (result) {
			if(result){
				var storageList = JSON.parse(result.urlList);
				if(storageList.length && storageList.indexOf(location.href.replace("http:",""))>-1){
					window.scrollTo(0,document.body.scrollHeight);
					setTimeout(function(){ sendProductList(); }, 5000);
				}
			}
    });
    importButton.click(function() {
			chrome.storage.local.get('useraccount', function (result) {
				if(!result.useraccount){
					$("#login-box").css({"top": (importButton.offset().top-$('#login-box').height()-30) + "px", "left": importButton.offset().left + "px"});
					$('#mask').click(function(){
						$('.login-popup').fadeOut(300,function(){
							$('#mask').hide();  
						});
					});
					$('#mask').fadeIn(300);
					$('.login-popup').fadeIn(300);
				}else{
					addProduct();	
				}
			});
			$('.form_button').click(function(){
				if($('#username').val()&&$('#password').val()){
					var auth_string = '{"authorization":{"email":"'+$('#username').val()+'","password":"'+$('#password').val()+'"}}';
					console.log(JSON.parse(auth_string));
					chrome.runtime.sendMessage({from: "auth",data:auth_string}, function(response) {
					});
				}
			});
    });
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
			console.log(reqquest.status);
			if(request.status == "success"){
				console.log('success');
				chrome.storage.local.set({'useraccount': "success"});
				$('#mask').click();
				$('#login_success').show();
				setTimeout(function(){$('#login_success').hide(); }, 3000);
			}else if(request.status == "fail"){
				console.log('fail');
				$('#mask').click();
				$('#login_failed').show();
				setTimeout(function(){ $('#login_failed').hide(); }, 3000);
			}
		})
		importListButton.click(function(){
			addListProduct();
		});
});