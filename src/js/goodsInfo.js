require('../css/goodsInfo.less');
require('./goodsCover.js');
require('jquery');


function getId(){
	var optionList = window.location.search.slice('1').split(';'),
		idNum;
	optionList.forEach(function(ele,index){
		if(ele.indexOf('id') !== -1){
			idNum = ele.slice(3);
		}
	})
	return idNum;
}

function getGoodsInfo(cb){
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

getGoodsInfo(createList);
function createList(datalist){
	console.log(datalist);
	var idNum = getId(),
		data = datalist.list,
		len = datalist.list.length,
		priceAry = [],
		str = '',
		liStr = '',
		minPrice = '',
		maxPrice = '',
		spect = '';
	for(var i = 0 ; i < len ; i ++){
		if(idNum == data[i].id){
			//首页图片
			$('.infor_one_img').html('<img src = "'+ data[i].imgurl[0]+'">');
			//商品名称
			$('.one_name').add($('.infor_th p')).html(data[i].name);
			//价格
			var priceLen = data[i].spectList.length;
			for(var j = 0 ; j < priceLen ; j ++){
				priceAry.push(+(data[i].spectList[j].price));
			}
			priceAry.sort();
			minPrice = priceAry[0];
			maxPrice = priceAry[priceLen - 1];
			$('.one_price').html('￥'+minPrice+' ~ ￥'+ maxPrice);
			//商品详情图片
			data[i].imgurl.forEach(function(ele,index){
				str += '<img src = "'+ ele +'">';
			})
			$('.infor_th').html(str);
			//商品规格
			data[i].spectList.forEach(function(ele,index){
				liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'">'+ ele.spect +'</li>';
			})
			$('.buy_spect_wrap ul').html(liStr);
			$('.price_value').html($('.one_price').html());
			return;
		}
	}
}

// function bindEvent(){
// 	$('.infor_two').add($('.infor_fo')).on('click',function(){
// 		$('.buy_wrap').css('display','block');
// 		$('html').add($('body').css({height: '100%',overflow: 'hidden'}));
//     })
//     $('.buy_gray').on('click',function(){
//     	$('.buy_wrap').css('display','none');
//     	$('html').add($('body').css({height:'100%',overflow:'visible'}));
//     })
// }

// bindEvent();

function bindEvent() {
    $('.infor_two').add($('.infor_fo')).on('click',function () {
        
        $('.buy_wrap').css('display','block');
        $('html').add($('body').css({height: '100%',overflow: 'hidden'}));
    })
    $('.buy_gray').click(function () {
        $('html').add($('body').css({height: 'auto',overflow: 'visible'}));
        $('.buy_wrap').css('display','none');
        
    })  
}
bindEvent();
