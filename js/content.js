console.log("product.js");
$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">');
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
	$("#loading-success, #loading-success-text").hide();
	$("#loading-ajax, #loading-ajax-text").show();
	$("#upload_success").show();
	chrome.storage.local.get('downloadList', function (result) {
		if(result.downloadList){
			console.log(JSON.parse(result.downloadList));
			var downloadCount = JSON.parse(result.downloadList);
			var urlStatus = true;
			for(var i=0;i<downloadCount.length;i++){
				if(downloadCount[i]==location.href){
					urlStatus = false;
				}
			}
			if(urlStatus){
				downloadCount.push(location.href);
				chrome.storage.local.remove('downloadList', function() {
					chrome.storage.local.set({'downloadList': JSON.stringify(downloadCount)});
				});
				//chrome.storage.local.set({'downloadList': JSON.stringify(downloadList)});
			}
		}else{
			var downloadList = [];
			downloadList.push(location.href);
			chrome.storage.local.set({'downloadList': JSON.stringify(downloadList)});
		}
		setTimeout(function(){
			$("#loading-ajax, #loading-ajax-text").hide();
			$("#loading-success, #loading-success-text").show();
			setTimeout(function(){
				$("#upload_success").hide();
			}, 3000);		
		},2000);
	});
	/*
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
		var returnArray = {};
		$(".product-property-list li").each(function(){
			item_specs[$(this).find('span.propery-title').text().replace(":","")] = $(this).find('span.propery-des').text();
		});
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
	*/
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
		if(location.href.indexOf("aliexpress.com")!=-1){
			var importButton = $('<a href="javascript:;" id="add-product-button" class="add-cart-btn" style="background-color: #a4c739;" data-widget-cid="widget-40">Add to Shop</a>');
			$(".product-action-main").append(importButton);
			var importListButton = $('<button id="add-list-button" class="add-cart-btn" style="background-color: #a4c739;width:100%;height:50px;" >Add List Product</button>');
			$("#gallery-item").append(importListButton);
			var image_link = chrome.extension.getURL("/icons/close_pop.png");
			$('#j-product-action-block').prepend("<div id='login_failed' class='login_failed' style='display:none;text-align: center;font-size: 20px;color: red;'>Wrong Email or Password</div>");
			$('#j-product-action-block').prepend("<div id='login_success' class='login_success' style='display:none;text-align: center;font-size: 20px;color: #a4c739;'>You have been successfully logged</div>");
			$('body').append("<div id='upload_success' class='upload_success' style='display:none;border: 1px solid;text-align: center;margin-bottom: 20px;font-size: 20px;color: #a4c739;position: fixed;top: 10px;right: 10px;z-index: 99999;background: #fff;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);padding: 20px;'><i id=\"loading-ajax\" class='fa fa-spinner fa-pulse fa-3x fa-fw' style=\"font-size: 30px\"></i><i id=\"loading-success\" class=\"fa fa-check-circle\" aria-hidden=\"true\" style=\"font-size: 30px\"></i><div id='loading-ajax-text'>Product being imported</div><div id='loading-success-text'>Added to Queue Successfully</div></div>");
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
			importButton.click(function() {
				//var r = confirm("Do you want to send product data to server?");
				//if (r == true) {
						addProduct();	
						/*chrome.storage.local.get('useraccount', function (result) {
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
					});*/
					/*$('.form_button').click(function(){
						if($('#username').val()&&$('#password').val()){
							var auth_string = '{"authorization":{"email":"'+$('#username').val()+'","password":"'+$('#password').val()+'"}}';
							console.log(JSON.parse(auth_string));
							chrome.runtime.sendMessage({from: "auth",data:auth_string}, function(response) {
							});
						}
					});
				} else {
						return false;
				}*/
			});
			importListButton.click(function(){
				addListProduct();
			});
		}
		/*chrome.storage.local.get('urlList', function (result) {
			if(result){
				var storageList = JSON.parse(result.urlList);
				if(storageList.length && storageList.indexOf(location.href.replace("http:",""))>-1){
					window.scrollTo(0,document.body.scrollHeight);
					setTimeout(function(){ sendProductList(); }, 5000);
				}
			}
    });*/
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
			/*chrome.storage.local.set({'useraccount': "success"});
				$('#mask').click();
				$('#login_success').show();
				setTimeout(function(){$('#login_success').hide(); }, 3000);*/
				if(request.status == "imported"){
						$("#loading-ajax, #loading-ajax-text").hide();
						$("#loading-success, #loading-success-text").show();
						setTimeout(function(){
							$("#upload_success").hide();
						}, 3000);

				}
			/*if(request.status == "success"){
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
			}*/
		});
		if(location.href.indexOf("index.php?route=sale/order/info")!=-1){
			$('#content .page-header .container-fluid').append("<button id='order_all_aliexpress' style='margin-right: 10px;display:none;' class='btn pull-right btn-primary'>Order All AliExpress</button>");
			$('#content .page-header .container-fluid').append("<button id='order_all_banggood' style='margin-right: 10px;display:none;' class='btn pull-right btn-primary'>Order All Banggood</button>");
			$('#product_table_body tr').each(function(index){
					if($(this).find('#drurl').text()!=''){
						if($(this).find('#drurl').text().indexOf("aliexpress.com")!=-1) $("#order_all_aliexpress").show();
						if($(this).find('#drurl').text().indexOf("banggood.com")!=-1) $("#order_all_banggood").show();
					}
			});
			$('#order_all_aliexpress').click(function(){
				var email = "";var full_name = "";var phone = "";var address_1 = "";var address_2 = "";var county = "";var city = "";var postcode = ""; var state = "";
				email = $("#dremail").text();
				full_name = $("#drname").text();
				phone = $("#drmobile").text();
				address_1 = $("#draddress").text();
				//address_2 = $("#tab-payment #input-payment-address-2").val()
				county = $("#drcountry").text();
				city = $("#drcity").text();
				postcode = $("#drzip").text();
				state = $("#drstate").text();
				var order_info_aliexpress = [];
				order_info_aliexpress.push(email);
				order_info_aliexpress.push(full_name);
				order_info_aliexpress.push(phone);
				order_info_aliexpress.push(address_1);
				order_info_aliexpress.push(address_2);
				order_info_aliexpress.push(county);
				order_info_aliexpress.push(city);
				order_info_aliexpress.push(postcode);
				order_info_aliexpress.push(state);
				console.log(order_info_aliexpress);
				chrome.storage.local.remove('order_info_aliexpress', function() {
					chrome.storage.local.set({'order_info_aliexpress': JSON.stringify(order_info_aliexpress)});
				});
				var order_product_option_aliexpress = [];
				var test_index = 0;
				$('#product_table_body tr').each(function(index){
					if($(this).find('#drurl').text()!='' && $(this).find('#drurl').text().indexOf('aliexpress.com')!=-1){
						order_product_option_aliexpress[index] = {
						'Url': $(this).find('#drurl:first').text(),
						'Quantity': $(this).find('#drQuantity:first').text()? $(this).find('#drQuantity:first').text(): $(this).find("#drqua").text(),
						};
						var optionNameArr = [];
						var optionValueArr = [];
						$(this).find('.drOption1Name').each(function(nindex){
							optionNameArr.push($(this).text());
						});
						$(this).find('.drOption1Value').each(function(vindex){
							optionValueArr.push($(this).text());
						});
						for(var i=0;i<optionNameArr.length;i++){
							order_product_option_aliexpress[index][optionNameArr[i]]=optionValueArr[i];
						}
						test_index++;
					}
				});
				console.log(order_product_option_aliexpress);
				chrome.storage.local.remove('order_product_option_aliexpress', function() {
					chrome.storage.local.set({'order_product_option_aliexpress': JSON.stringify(order_product_option_aliexpress)});
					chrome.extension.sendMessage({from:"order_list",where:"",data:order_product_option_aliexpress[0]['Url']},function(reponse){
					});
				});
			});
			$('#order_all_banggood').click(function(){
				chrome.storage.local.remove('stock_status', function() {
				});
				var email = "";var full_name = "";var phone = "";var address_1 = "";var address_2 = "";var county = "";var city = "";var postcode = ""; var state = "";
				email = $("#dremail").text();
				full_name = $("#drname").text();
				phone = $("#drmobile").text();
				address_1 = $("#draddress").text();
				//address_2 = $("#tab-payment #input-payment-address-2").val()
				county = $("#drcountry").text();
				city = $("#drcity").text();
				postcode = $("#drzip").text();
				state = $("#drstate").text();
				var order_info_banggood = [];
				order_info_banggood.push(email);
				order_info_banggood.push(full_name);
				order_info_banggood.push(phone);
				order_info_banggood.push(address_1);
				order_info_banggood.push(address_2);
				order_info_banggood.push(county);
				order_info_banggood.push(city);
				order_info_banggood.push(postcode);
				order_info_banggood.push(state);
				console.log(order_info_banggood);
				chrome.storage.local.remove('order_info_banggood', function() {
					chrome.storage.local.set({'order_info_banggood': JSON.stringify(order_info_banggood)});
				});
				var order_product_option_banggood = [];
				var test_index = 0;
				$('#product_table_body tr').each(function(index){
					if($(this).find('#drurl').text()!='' && $(this).find('#drurl').text().indexOf('banggood.com')!=-1){
						order_product_option_banggood[test_index] = {
						'Url': $(this).find('#drurl:first').text(),
						'Quantity': $(this).find('#drQuantity:first').text()? $(this).find('#drQuantity:first').text(): $(this).find("#drqua").text(),
						};
						var optionNameArr = [];
						var optionValueArr = [];
						$(this).find('.drOption1Name').each(function(nindex){
							optionNameArr.push($(this).text());
						});
						$(this).find('.drOption1Value').each(function(vindex){
							optionValueArr.push($(this).text());
						});
						for(var i=0;i<optionNameArr.length;i++){
							order_product_option_banggood[test_index][optionNameArr[i]]=optionValueArr[i];
						}
						test_index++;
					}
				});
				console.log(order_product_option_banggood);
				chrome.storage.local.remove('order_product_option_banggood', function() {
					chrome.storage.local.set({'order_product_option_banggood': JSON.stringify(order_product_option_banggood)});
					chrome.extension.sendMessage({from:"order_list",where:"",data:order_product_option_banggood[0]['Url']},function(reponse){
					});
				});
			});
		}
		if(location.href.indexOf("aliexpress.com/item")!=-1){
			chrome.storage.local.get('order_product_option_aliexpress', function (result) {
				console.log(JSON.parse(result.order_product_option_aliexpress));
				var c_order_product_option = JSON.parse(result.order_product_option_aliexpress);
				if(c_order_product_option){
					var real_product;
					if(c_order_product_option.length){
						if(c_order_product_option[0]['Url']==location.href){
							real_product = c_order_product_option[0];
							$("#j-product-info-sku dl.p-property-item").each(function(index){
								var item_spec_name = $(this).find('dt.p-item-title').text().replace(":","");
								console.log(item_spec_name);
								var cur_index = index+1;
								$(this).find("ul").find("img").each(function(){
									console.log($(this).attr("title"));
									console.log(real_product[item_spec_name]);
									if($(this).attr("title").toLowerCase()==real_product[item_spec_name].toLowerCase()){
										var c = $(this).parent().attr("id");
										document.getElementById(c).click();
									}
								});
								$(this).find("ul").find("span").each(function(){
									if($(this).text().toLowerCase()==real_product[item_spec_name].toLowerCase()){
										var s = $(this).parent().attr("id");
										document.getElementById(s).click();
									}
									if($(this).attr('title')){
										if($(this).attr('title').toLowerCase()==real_product[item_spec_name].toLowerCase()){
											var s = $(this).parent().attr("id");
											document.getElementById(s).click();
										}
									}
								});
							});
							$('input[name="quantity"]').val(real_product['Quantity']);
							$('#nav-cart-num').click();
							if(c_order_product_option.length==1){
								var reload_url = $('.nav-cart-box a').attr('href');
								document.getElementById("j-add-cart-btn").click();
								chrome.storage.local.remove('order_product_option_aliexpress', function() {
									setTimeout(function(){ 
										location.href = "https:"+reload_url;
									}, 3000);
								});
							}else if(c_order_product_option.length>1){
								document.getElementById("j-add-cart-btn").click();
								chrome.storage.local.remove('order_product_option_aliexpress', function() {
									c_order_product_option.shift();
									console.log(c_order_product_option);
									console.log(c_order_product_option[0]['Color']);
									chrome.storage.local.set({'order_product_option_aliexpress': JSON.stringify(c_order_product_option)});
									chrome.extension.sendMessage({from:"order_list",where:"content",data:c_order_product_option[0]['Url']},function(reponse){
									});
								});
							}
						}
					}
				}
			});
		}
		if(location.href.indexOf("shoppingcart.aliexpress.com/shopcart/shopcartDetail.htm")!=-1){
			chrome.storage.local.get('order_info_aliexpress', function (result) {
				if(result.order_info_aliexpress){
					$('input[type="submit"]').each(function(){
						if($(this).attr('title')=='Buy All'){
							$(this).click();
						}
					});
				}
			});
		}
		if(location.href.indexOf("aliexpress.com/order/confirm_order")!=-1){
			country_arr = ["Afghanistan","Aaland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Ascension Island","Australia","Austria","Azerbaijan","Bahrain","Guernsey","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Virgin Islands (British)","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Canary Islands","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Cook Islands","Costa Rica","Cote D'Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France, Metropolitan","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","French Guiana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iraq","Ireland","Iran (Islamic Republic of)","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","South Korea","Kosovo, Republic of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macau","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nicaragua","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Moldova, Republic of","Reunion","Romania","Russian Federation","Rwanda","St. Barthelemy","St. Helena","Saint Kitts and Nevis","Saint Lucia","St. Martin (French part)","St. Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovak Republic","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia & South Sandwich Islands","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen Islands","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Heard and Mc Donald Islands","Thailand","Bahamas","Democratic Republic of Congo","Congo","Marshall Islands","Vatican City State (Holy See)","East Timor","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Virgin Islands (U.S.)","Uganda","Ukraine","United Arab Emirates","United Kingdom","Tanzania, United Republic of","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Wallis and Futuna Islands","Western Sahara","Yemen","Zambia","Zimbabwe"];
			country_shortarr = ["AF","ALA","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","ASC","AU","AT","AZ","BH","GGY","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","IO","VG","BG","BF","BI","KH","CM","CA","IC","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","EP","FK","FO","FJ","FI","FR","FR","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GN","GW","GY","GF","HT","HN","HK","HU","IS","IN","ID","IQ","IE","IR","IM","IL","IT","JM","JP","JEY","JO","KZ","KE","KI","KR","KS","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MG","MW","MY","MV","ML","MT","MQ","MR","MU","YT","MX","FM","MC","MN","MNE","MS","MA","MZ","MM","NA","NR","NI","NP","NL","AN","NC","NZ","NE","NG","NU","NF","KP","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","MD","RE","RO","RU","RW","BLM","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","SRB","SC","SL","SG","SK","SI","SB","SO","ZA","SGS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","HM","TH","BS","ZR","CG","MH","VA","TLS","TG","TK","TO","TT","TN","TR","TM","TC","TV","VI","UG","UA","AE","UK","TZ","US","UM","UY","UZ","VU","VE","VN","WF","EH","YE","ZM","ZW"];
			chrome.storage.local.get('order_info_aliexpress', function (result) {
				if(result.order_info_aliexpress){
					console.log($(".shipping-address .sa-form").css('display'));
					console.log(result.order_info_aliexpress);
					if($(".shipping-address .sa-form").css('display')=="none"){
						$(".sa-edit")[0].click();
						setTimeout(function(){ 
							var profile_info = JSON.parse(result.order_info_aliexpress);
							console.log(profile_info);
							var country_pos = country_arr.indexOf(profile_info[5]);
							if(country_pos!=-1){
								$("select[name='country']").val(country_shortarr[country_pos]);
							}else{
								$("select[name='country']").val("OTHER");
							} 
							var n = new Event("change");
							document.getElementsByName("country")[0].dispatchEvent(n);
							setTimeout(function(){
								var t = document.getElementsByClassName("sa-province-wrapper")[0];
								var r = $(".sa-province-wrapper").find("select");
								console.log($(r).is(":visible"));
								if($(r).is(":visible")){
									var p = $(".sa-province-wrapper").find("input");
									r.val(profile_info[8]);
									p.val(profile_info[8]);
									t.getElementsByTagName("select")[0].dispatchEvent(n)
									t.getElementsByTagName("input")[0].dispatchEvent(n);
								}else{
									$("input[name='province']").val(profile_info[8]);
								}
								
								setTimeout(function(){
									var t = document.getElementsByClassName("sa-city-wrapper")[0];
									var r = $('[name="city"]').parent().find("select");
									console.log($(r).is(":visible"));
									if($(r).is(":visible")){
										r.val(profile_info[6]);
										t.getElementsByTagName("select")[0].dispatchEvent(n);
										t.getElementsByTagName("input")[0].dispatchEvent(n);
									}else{
										$("input[name='city']").val(profile_info[6]);							
									}
									$("input[name='contactPerson']").val(profile_info[1]);
									$("input[name='address']").val(profile_info[3]);
									$("input[name='address2']").val(profile_info[4]);
									$("input[name='zip']").val(profile_info[7]);
									$("input[name='mobileNo']").val(profile_info[2]);
									chrome.storage.local.remove('order_info_aliexpress', function() {
										$('.sa-confirm')[0].click();
									});
								},4000);
							},4000);
						}, 1000);
					}else{
						setTimeout(function(){ 
							var profile_info = JSON.parse(result.order_info_aliexpress);
							console.log(profile_info);
							var country_pos = country_arr.indexOf(profile_info[5]);
							if(country_pos!=-1){
								$("select[name='country']").val(country_shortarr[country_pos]);
							}else{
								$("select[name='country']").val("OTHER");
							} 
							var n = new Event("change");
							document.getElementsByName("country")[0].dispatchEvent(n);
							setTimeout(function(){
								var t = document.getElementsByClassName("sa-province-wrapper")[0];
								var r = $(".sa-province-wrapper").find("select");
								console.log($(r).is(":visible"));
								if($(r).is(":visible")){
									var p = $(".sa-province-wrapper").find("input");
									r.val(profile_info[8]);
									p.val(profile_info[8]);
									t.getElementsByTagName("select")[0].dispatchEvent(n)
									t.getElementsByTagName("input")[0].dispatchEvent(n);
								}else{
									$("input[name='province']").val(profile_info[8]);
								}
								
								setTimeout(function(){
									var t = document.getElementsByClassName("sa-city-wrapper")[0];
									var r = $('[name="city"]').parent().find("select");
									console.log($(r).is(":visible"));
									if($(r).is(":visible")){
										r.val(profile_info[6]);
										t.getElementsByTagName("select")[0].dispatchEvent(n);
										t.getElementsByTagName("input")[0].dispatchEvent(n);
									}else{
										$("input[name='city']").val(profile_info[6]);							
									}
									$("input[name='contactPerson']").val(profile_info[1]);
									$("input[name='address']").val(profile_info[3]);
									$("input[name='address2']").val(profile_info[4]);
									$("input[name='zip']").val(profile_info[7]);
									$("input[name='mobileNo']").val(profile_info[2]);
									chrome.storage.local.remove('order_info_aliexpress', function() {
										$('a.sa-confirm').click();
									});
								},4000);
							},4000);
						}, 1000);
					}
				}
			});
		}
		if(location.href.indexOf("www.banggood.com/shopping_cart.php")!=-1){
			if($("div.cart_main").length!=0){
				chrome.storage.local.get('stock_status', function (result) {
					if(result.stock_status=="on"){
						$("div.cart_page_title").after("<div id='stockwarning' style='display:none;border:1px solid;text-align: center;margin-bottom: 20px;font-size: 20px;color: red;position: relative;top: 10px;right: 10px;z-index: 99999;background: #fff;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);padding: 20px;'><span>A product in this order has gone out of stock.</span></div>");
						$('#stockwarning').show();
					}
				});
			}
		
			chrome.storage.local.get('order_info_banggood', function (result) {
				if(result.order_info_banggood){
					if($("div.cart_main").length!=0){
						$("label.scartselect_ds").click();
						if($("div.address div.default").length){
							$("div.address div.default span").click();
							setTimeout(function(){
								if($("#add_address_form").length){
									var profile_info = JSON.parse(result.order_info_banggood);
									console.log(profile_info);
									var n = new Event("change");
									$(".bag_select_country div.active").click();
									setTimeout(function(){
										$(".bag_select_country div.country_box ul li").each(function(){
											if($(this).text().trim().toLowerCase()==profile_info[5].trim().toLowerCase()){
												$(this).click();
												setTimeout(function(){
													$(".bag_select_province div.active").click();
													setTimeout(function(){
														$(".bag_select_province div.country_box ul li").each(function(){
															if($(this).text().trim().toLowerCase()==profile_info[8].trim().toLowerCase()){
																$(this).click();
																$("#c_entry_firstname").val(profile_info[1].split(" ")[0]);
																$("#c_entry_lastname").val(profile_info[1].split(" ")[1]);
																$("#c_entry_street_address").val()
																$("#c_entry_street_address").val(profile_info[3]);
																$("#c_entry_street_address2").val(profile_info[4]);
																$("#add_ship_city").val(profile_info[6]);
																$("#c_entry_postcod").val(profile_info[7]);
																$("#address_telephone").val(profile_info[2].replace(/-/g , ""));
																$("#c_entry_postcod").click();
																$("#setDefaultAddress").click();
																chrome.storage.local.remove('order_info_banggood', function() {
																	$("#add_address_form span.formsubmit").click();
																});
															}
														});
													},1000);
												},2000);
											}
										});	
									},1000);
								}
							},3000);
						}else{
							location.href="javascript:Address_pannnel(); void 0";
							setTimeout(function(){
								if($("#add_address_form").length){
									var profile_info = JSON.parse(result.order_info_banggood);
									console.log(profile_info);
									var n = new Event("change");
									$(".bag_select_country div.active").click();
									setTimeout(function(){
										$(".bag_select_country div.country_box ul li").each(function(){
											if($(this).text().trim().toLowerCase()==profile_info[5].trim().toLowerCase()){
												$(this).click();
												setTimeout(function(){
													$(".bag_select_province div.active").click();
													setTimeout(function(){
														console.log(profile_info[8].trim().toLowerCase());
														$(".bag_select_province div.country_box ul li").each(function(){
															console.log($(this).text().trim().toLowerCase());
															if($(this).text().trim().toLowerCase()==profile_info[8].trim().toLowerCase()){
																$(this).click();
																$("#c_entry_firstname").val(profile_info[1].split(" ")[0]);
																$("#c_entry_lastname").val(profile_info[1].split(" ")[1]);
																$("#c_entry_street_address").val()
																$("#c_entry_street_address").val(profile_info[3]);
																$("#c_entry_street_address2").val(profile_info[4]);
																$("#add_ship_city").val(profile_info[6]);
																$("#c_entry_postcod").val(profile_info[7]);
																$("#address_telephone").val(profile_info[2].replace(/-/g , ""));
																$("#c_entry_postcod").click();
																$("#setDefaultAddress").click();
																chrome.storage.local.remove('order_info_banggood', function() {
																	$("#add_address_form span.formsubmit").click();
																});
															}
														});
													},1000);
												},2000);
											}
										});
									},1000);
								}
							},3000);
						}					
					}else{
						chrome.storage.local.get('stock_status', function (result) {
							if(result.stock_status=="on"){
								$("div.back").prepend("<div id='stockwarning' style='display:none;border:1px solid;text-align: center;margin-bottom: 20px;font-size: 20px;color: red;position: relative;top: 10px;right: 10px;z-index: 99999;background: #fff;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);padding: 20px;'><span>A product in this order has gone out of stock.</span></div>");
								$('#stockwarning').show();
								chrome.storage.local.remove('stock_status', function() {
								});
								chrome.storage.local.remove('order_info_banggood', function() {
								});
							}
						});
					}
				}
			});
		}
		if(location.href.indexOf("banggood.com")!=-1){
			if($('div.pro_cart_btn').length){
				$('div.pro_cart_btn').append('<div><input type="button" class="buynow btn_buy btn_add_to_list" style="background: #a4c739;border: 1px solid #677f1b;" value="Add to Shop"></div>');
				$('div.pro_cart_btn').prepend("<div id='upload_success' class='upload_success' style='display:none;border: 1px solid;text-align: center;margin-bottom: 20px;font-size: 20px;color: #a4c739;position: fixed;top: 10px;right: 10px;z-index: 99999;background: #fff;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);padding: 20px;'><i id=\"loading-ajax\" class='fa fa-spinner fa-pulse fa-3x fa-fw' style=\"font-size: 30px;display:block;width: 100%;\"></i><i id=\"loading-success\" class=\"fa fa-check-circle\" aria-hidden=\"true\" style=\"font-size: 30px;display:block;\"></i><div id='loading-ajax-text'>Product being imported</div><div id='loading-success-text'>Added to Queue Successfully</div></div>");
			}
			$(".btn_add_to_list").click(function(){
				$("#loading-success, #loading-success-text").hide();
				$("#loading-ajax, #loading-ajax-text").show();
				$("#upload_success").show();
				setTimeout(function(){
					$("#loading-ajax, #loading-ajax-text").hide();
					$("#loading-success, #loading-success-text").show();
					setTimeout(function(){
						$("#upload_success").hide();
					}, 3000);
				},2000);
				chrome.storage.local.get('downloadList', function (result) {
					if(result.downloadList){
						console.log(JSON.parse(result.downloadList));
						var downloadCount = JSON.parse(result.downloadList);
						var urlStatus = true;
						for(var i=0;i<downloadCount.length;i++){
							if(downloadCount[i]==location.href){
								urlStatus = false;
							}
						}
						if(urlStatus){
							downloadCount.push(location.href);
							chrome.storage.local.remove('downloadList', function() {
								chrome.storage.local.set({'downloadList': JSON.stringify(downloadCount)});
								$("#loading-ajax, #loading-ajax-text").hide();
								$("#loading-success, #loading-success-text").show();
								setTimeout(function(){
									$("#upload_success").hide();
								}, 3000);
							});
						}
					}else{
						var downloadList = [];
						downloadList.push(location.href);
						chrome.storage.local.set({'downloadList': JSON.stringify(downloadList)});
					}
				});
			});
			chrome.storage.local.get('order_product_option_banggood', function (result) {
				var c_order_product_option = JSON.parse(result.order_product_option_banggood);
				if(c_order_product_option){
					var real_product;
					if(c_order_product_option.length){
						if(c_order_product_option[0]['Url']==location.href){
							real_product = c_order_product_option[0];
							$(".pro_attr_box table tbody tr").each(function(index){
								var item_spec_name = $(this).find('th').text().replace(":","");
								var cur_index = index+1;
								$(this).find("td").find("ul").find("li").each(function(){
									if($(this).find('img').length){
										if($(this).find('img').attr('title').trim().toLowerCase()==real_product[item_spec_name].trim().toLowerCase()){
											$(this).click();
										}
									}else{
										if($(this).text().trim().toLowerCase()==real_product[item_spec_name].trim().toLowerCase()){
											$(this).click();
										}
									}
								});
							});
							console.log(real_product['Quantity']);
							$('#quantity').val(real_product['Quantity']);
							if(c_order_product_option.length==1){
								var reload_url = "https://www.banggood.com/shopping_cart.php";
								setTimeout(function(){ 
									var outstocks = $("#stockMsgCache div").attr("stocks");
									console.log(outstocks);
									if(parseInt(outstocks)>=parseInt(real_product['Quantity']))	{
										$(".btn_add").click();
									}else{
										console.log("123");
										chrome.storage.local.remove('stock_status', function() {
										});
										chrome.storage.local.set({'stock_status': "on"});
									}
									setTimeout(function(){ 
										chrome.storage.local.remove('order_product_option_banggood', function() {
											location.href = reload_url;
										});
									}, 3000);
								}, 1000);
							}else if(c_order_product_option.length>1){
								setTimeout(function(){ 
									var outstocks = $("#stockMsgCache div").attr("stocks").trim();
									console.log(outstocks);
									if(parseInt(outstocks) >= parseInt(real_product['Quantity']))	{
										$(".btn_add").click();
									}else{
										console.log("456");
										chrome.storage.local.remove('stock_status', function() {
										});
										chrome.storage.local.set({'stock_status': "on"});
									}
									setTimeout(function(){ 
										chrome.storage.local.remove('order_product_option_banggood', function() {
											c_order_product_option.shift();
											console.log(c_order_product_option);
											console.log(c_order_product_option[0]['Color']);
											chrome.storage.local.set({'order_product_option_banggood': JSON.stringify(c_order_product_option)});
											chrome.extension.sendMessage({from:"order_list",where:"content",data:c_order_product_option[0]['Url']},function(reponse){
											});
										});
									}, 3000);
								}, 1000);
							}
						}
					}
				}
			});
		}
			
});