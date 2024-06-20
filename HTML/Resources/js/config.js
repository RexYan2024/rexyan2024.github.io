/***********************************
Creater:Rex
CreateDate:2020-11-05 10:38
Description:微驿仓全局通用配置
***********************************/

var fkconfig = {
	enabledAuthorize:false,
	debug:true,
	version:"2.0",
}
//NetSuite SuiteletW
fkconfig.NSSL ={
		//检查Token
		CheckToken:"https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1547&deploy=1&compid=TSTDRV1188705&h=ff53c1184af241d1fab9",
		//通用Search
		CommonSearchData:'https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1548&deploy=1&compid=TSTDRV1188705&h=958aa59339634eae17dd',
		//获取Cache
		//保持Cache
		SaveCache:'https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1544&deploy=1&compid=TSTDRV1188705&h=6b67b22f25e0de4f28e5',
		//PO单提交收货
		_01_Submit:"https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1546&deploy=1&compid=TSTDRV1188705&h=3ef700976587984a5401",
		//采购退货
		_02_Submit: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1550&deploy=1&compid=TSTDRV1188705&h=727c8fabbe4c28dcd2af",
		//销售出库
		_03_Submit: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1551&deploy=1&compid=TSTDRV1188705&h=7e33cc4fb1fdd7f29ea5",
		//销售退货入库
		_04_Submit: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1552&deploy=1&compid=TSTDRV1188705&h=9c902ce1fe6c07a0fb5a",
		//盘点单
		_05_Submit: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1553&deploy=1&compid=TSTDRV1188705&h=bfaea55974be2906eed8",
		//库存转移单
		_06_Submit_TO: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1560&deploy=1&compid=TSTDRV1188705&h=bb36930111f122befd3d",
		_06_Submit_IT: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1555&deploy=1&compid=TSTDRV1188705&h=d983e8cf6418706922b0",
		//库位转移
		_07_Submit: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1554&deploy=1&compid=TSTDRV1188705&h=b8afc0808b4840d25c5c",
		//工单完工入库
		_08_Submit: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2529&deploy=1&compid=TSTDRV1188705&h=78ed79a06fa372cda009",
	//20240115注释start
	// //检查Token
	// CheckToken:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=207&deploy=1&compid=8310403_SB1&h=75a9ed61fa0118a06e75",
	// //通用Search
	// CommonSearchData:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=199&deploy=1&compid=8310403_SB1&h=85d3c821776e674a59de",
	// //获取Cache
	// //保持Cache
	// SaveCache:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=200&deploy=1&compid=8310403_SB1&h=66a1eb3dd89fac4e8d54",
	// //PO单提交收货
	// _01_Submit:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=197&deploy=1&compid=8310403_SB1&h=29eee958ab6c17154ab6",
	// //采购退货
	// _02_Submit:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=203&deploy=1&compid=8310403_SB1&h=60282d894660c33809c8",
	// //销售出库
	// _03_Submit:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=201&deploy=1&compid=8310403_SB1&h=1eaa2df35bd05f4d6559",
	// //销售退货入库
	// _04_Submit:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=198&deploy=1&compid=8310403_SB1&h=3f0f9f292c4e587974f7",
	// //盘点单
	// _05_Submit: "https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=195&deploy=1&compid=8310403_SB1&h=bbd05489a2076159dffa",
	// //库存转移单
	// _06_Submit_TO:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=202&deploy=1&compid=8310403_SB1&h=4cd3f28aa29bdc43ac60",
	// _06_Submit_IT:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=196&deploy=1&compid=8310403_SB1&h=e4b6ccccf43f71fd7a7b",
	// //库位转移
	// _07_Submit:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=194&deploy=1&compid=8310403_SB1&h=ba60a81b4294f255fad3",
	// //工单完工入库
	// _08_Submit:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=204&deploy=1&compid=8310403_SB1&h=3ea67bece6b02cc623f8",
	//20240115注释end

	// //Packing提交
	// _08_Submit: "https://6198345-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=148&deploy=1&compid=6198345_SB1&h=67aaa8cd9fcc9707b486",
	// //其它出入库
	// _09_Submit: "https://6198345-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=147&deploy=1&compid=6198345_SB1&h=ff6d8e677097d3022225",
	// _10_Search: "https://6198345-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=155&deploy=1&compid=6198345_SB1&h=e221986a79d9b2467232",

	//获取库存
	_get_Inventory: "https://tstdrv1188705.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1549&deploy=1&compid=TSTDRV1188705&h=8f252a333e0e194fe5a3",
	// _get_Inventory:"https://8310403-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=206&deploy=1&compid=8310403_SB1&h=ac95ec39483cec8dc27e",

}
fkconfig.Pages={
	AuthorizeForbiden:"../Authorize/Forbiden.html",
}

function loadJs(url, callback) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	if (typeof(callback) != "undefined") {
		if (script.readyState) {
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			}
		} else {
			script.onload = function() {
				callback();
			}
		}
	}
	var scriptsrc=url;
	if(!fkconfig.debug) scriptsrc+="?v="+Date.parse(new Date());
	script.src =scriptsrc;
	document.getElementsByTagName('head')[0].appendChild(script)
	//document.body.appendChild(script);
}



!(function () {
	var _fkcommom={};
	_fkcommom.getQueryValue=function(variable){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
	}
	_fkcommom.getCookie=function (name){
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
	    if(arr=document.cookie.match(reg))
	 
	        return unescape(arr[2]);
	    else
	        return null;
	}
	_fkcommom.delCookie=function (name){
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=this.getCookie(name);
	    if(cval!=null)
	        document.cookie= name + "="+cval+";expires="+exp.toGMTString()+ ";path=/";
	},
	_fkcommom.setCookie=function (name,value){
		this.delCookie(name);
	    var Days = 30;
	    var exp = new Date();
	    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+ ";path=/";
	}
	var resetLanguage=function(language){
		if(fkText[fkText.config.language]){
		fkText.config.language = language;
		fkText.Default = fkText[fkText.config.language];
		fkTextDefault = fkText.Default;
		}
	}
var language = _fkcommom.getQueryValue("language");
if (language) {
	 _fkcommom.setCookie("language",language);
	resetLanguage(language);
}else{
	//如果没有在URL中获取到，则从cookie中获取
	language = _fkcommom.getCookie("language");
	if (language) {
		resetLanguage(language);
	}
}
})();


loadJs("../Resources/js/commom.js", function() {
	console.log("../Resources/js/commom.js",'loadJs done');
	fkcommom.authorize();
});
