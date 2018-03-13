require('../css/index.less');
require('jquery');
var dataList;

function getGoodsList(cb){
	$.ajax({
		type : 'GET',
		url : 'http://localhost:8080/api/goodsList.json',
		dataType : 'json',
		timeout : 8000,
		success : function(data){
			cb(data);
			dataList = data;
		},
		error : function(data){
			alert('商品列表未获取成功');
		}
	})
}

getGoodsList(createList);
function createList(data){
	var str = '';
	data.list.forEach(function(ele,index){
		console.log(data)
		str += '<a href = "http://localhost:8080/goodsInfo.html?id='+ ele.id +'"><div class="goods_item">\
	                <img src="' + ele.imgurl[0] +'" alt="">\
	                <p class="item_name">'+ ele.name +'</p>\
	                <p class="item_price">\
	                    ¥'+ ele.spectList[0].price +'\
	                </p>\
	            </div></a>'
	})
	$('.tab_content').html(str);
}