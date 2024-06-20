/********************************
 ** Creater : Hitpoint Cloud
 ** CreateDate: 2020-11-13
 ** Desc:全局通用脚本
 ** V1.0
 *********************************/

//
var fkcommom = {}

fkcommom.init=function(){
	var headHTML = document.getElementsByTagName('head')[0].innerHTML;
	headHTML    += '<link rel="icon" href="../Resources/image/favicon.ico">';
	document.getElementsByTagName('head')[0].innerHTML = headHTML;
	
}
fkcommom.init();

fkcommom.cookie = {
	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if (arr = document.cookie.match(reg))

			return unescape(arr[2]);
		else
			return null;
	},
	delCookie: function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
	},
	setCookie: function(name, value) {
		this.delCookie(name);
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	},
}

fkcommom.url = {
	getQueryValue: function(variable) {
		
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				var result=decodeURI(pair[1]);
				return result;
			}
		}
		return (false);
	}
}

fkcommom.authorize = function() {
	var currentURL = location.href.toLowerCase();
	var authorizeForbidenPage = fkconfig.Pages.AuthorizeForbiden;
	authorizeForbidenPage = authorizeForbidenPage.toLowerCase();
	authorizeForbidenPage = authorizeForbidenPage.substr(authorizeForbidenPage.indexOf('/'))
	if (currentURL.indexOf(authorizeForbidenPage) == -1) {
		var authorize = function() {
			var token = fkcommom.url.getQueryValue("token");
			var timestamp = fkcommom.url.getQueryValue("timestamp");
			var username = fkcommom.url.getQueryValue("username");
			if (!token) {
				token = fkcommom.cookie.getCookie("token");
				timestamp = fkcommom.cookie.getCookie("timestamp");
				username = fkcommom.cookie.getCookie("username");
			} else {
				fkcommom.cookie.setCookie("token", token);
				fkcommom.cookie.setCookie("timestamp", timestamp);
				fkcommom.cookie.setCookie("username", username);
			}
			var data = {
				token: token,
				timestamp: timestamp,
				username: username,
				version:fkconfig.version
			}
			window.axios({
					url: fkconfig.NSSL.CheckToken,
					method: "post",
					data: data,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})
				.then(resp => {
					console.log("authorize", resp);
					if (resp.data.Code == "300") {
						fkcommom.cookie.setCookie("token", token);
						fkcommom.cookie.setCookie("timestamp", timestamp);
						fkcommom.cookie.setCookie("username", username);
					} else {
						if (fkconfig.enabledAuthorize) {
							location.href = fkconfig.Pages.AuthorizeForbiden; //"../Authorize/Forbiden.html";
						}
						
						console.error(resp.data.Msg, resp);
					}
				}).catch(err => {
					console.log('失败log', err);
					console.error('失败log', err);
				});
		}

		if (window.axios) {
			authorize();
		} else {
			loadJs("../Resources/js/axios.min.js", function() {
				authorize();
			});
		}
	}
};

fkcommom.hpuID=function(prefix,suffix){
	var id="";
	if(prefix) id+=prefix+"_";
	//日期
	var  myDate=new Date();
	id+=myDate.getTime()+"_";
	//随机数
	id+=Math.ceil(Math.random()*100000);
	if(suffix) id+="_"+suffix;
	return id;
}

fkcommom.axios = function(axiosobj,that) {
	return new Promise(function(resolve, reject) {
		var _request = function(axiosobj) {
			//var blData=axiosobj.data;
			if(!axiosobj["method"])  axiosobj.method = "post";
			if(!axiosobj["url"])   axiosobj.url = fkconfig.NSSL.CommonSearchData;
			if (axiosobj.method == "get") {
				axiosobj.params["token"] = fkcommom.cookie.getCookie("token");
				axiosobj.params["timestamp"] = fkcommom.cookie.getCookie("timestamp");
				axiosobj.params["username"] = fkcommom.cookie.getCookie("username");
				axiosobj.params["version"] = fkconfig.version;
			} else {
				axiosobj.data["token"] = fkcommom.cookie.getCookie("token");
				axiosobj.data["timestamp"] = fkcommom.cookie.getCookie("timestamp");
				axiosobj.data["username"] = fkcommom.cookie.getCookie("username");
				axiosobj.data["version"] = fkconfig.version;
			}
			//add by rex 2021-03-04 start
			//通用缓存过滤
			
			if(axiosobj.data.search_id=="customsearch_hc_wms_cache_data"){
				axiosobj.data.extra_filter.push("AND");
				axiosobj.data.extra_filter.push([
					"custrecord_hc_wms_common_cache_owner",
					"is",
					fkcommom.cookie.getCookie("username"),
				]);
			}
			console.log("通用缓存过滤",axiosobj);
			//add by rex 2021-03-04 end

			if (!axiosobj.headers) axiosobj.headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
			};

			console.log('commom 开始发送axios请求NetSuite Suitelet 脚本',axiosobj);
			window.axios(axiosobj).then(resp => {
				console.log('commom 请求结束',resp);
				const data = resp.data;
				if (data.Code == 1000) {
					var currentURL = location.href.toLowerCase();
					var authorizeForbidenPage = fkconfig.Pages.AuthorizeForbiden;
					authorizeForbidenPage = authorizeForbidenPage.toLowerCase();
					authorizeForbidenPage = authorizeForbidenPage.substr(authorizeForbidenPage.indexOf('/'))
					if (currentURL.indexOf(authorizeForbidenPage) == -1) {
						if (fkconfig.enabledAuthorize) {
							location.href = fkconfig.Pages.AuthorizeForbiden;
						}
					}
					reject(new Error(data.Msg));
				} else {
               if(axiosobj.url == fkconfig.NSSL.CommonSearchData && data.Code != 300)
					 {
						 if(that) that.upFinished = true;
					 }
					resolve(resp);
				}
			}).catch(err => {
				console.log('commom 请求出错',resp);
				reject(err);
			});
		}
		if (window.axios) {
			_request(axiosobj);
		} else {
			loadJs("../Resources/js/axios.min.js", function() {
				_request(axiosobj);
			});
		}
	});
}

//add rex 2021-03-03 设置Title
fkcommom.setTitle=function (title){
	if(!title)  title="";
	document.getElementsByTagName("title")[0].text=title;
}
//loading
fkcommom.initLoading=function(){
    var newNode=document.createElement("div");
    var strDOM="";
    strDOM+='<div class="van-overlay" style="z-index:10;background:#fff !important;" ><div class="wrapper" style="display: flex;align-items: center;justify-content: center;height: 100%;"><div class="van-loading van-loading--spinner van-loading--vertical"><span class="van-loading__spinner van-loading__spinner--spinner" style=" width: 50px; height: 50px;"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="van-loading__text"><button disabled="disabled" title="加载中" class="van-button van-button--default van-button--large van-button--disabled" style="border: none; font-size: 15px;"><div class="van-button__content"></div></button></span></div></div></div>';
    newNode.innerHTML=strDOM;
    document.body.appendChild(newNode);
}

window.onbeforeunload = function () {
    fkcommom.initLoading();
};

//源生方法拓展
window.Array.prototype.removeByItemP=function(p,v){
	for(var i=0;i<this.length;i++){
		if(this[i][p]==v){
			this.splice(i,1);
			i--;
		}
	}
}

window.Array.prototype.groupBy=function(p){
	let g=[];
	for(var i=0;i<this.length;i++){
		
		let isFind=false;
		for(var j=0;j<g.length;j++){
			if(this[i][p]==g[j].Name){
				isFind=true;
				g[j].Data.push(this[i]);
				break;
			}
		}
		if(!isFind){
			g.push({
				Name:this[i][p],
				Data:[this[i]]
			});
		}
		
	}
	return g;
}



// window.Object.prototype.fkClone=function(){
// 	var str=JSON.stringify(this);
// 	return JSON.parse(str);
// }

fkcommom.clone=function(obj){
		var str=JSON.stringify(obj);
		return JSON.parse(str);
}

var fkcommon = fkcommom; //笔误纠正下

fkcommom.iframe={
	autoRemoveCache:true,
	heritage:false,
	activeiframe:'',
	activeid:'',
	activefunc:function(){},
	receiveData:[],
	receive:function(id,f){
		fkcommom.iframe.receiveData.push({id:id,f:f});
	},
	//该方法在父页面调用
	show:function(id,url,data){
		if(fkcommom.iframe.autoRemoveCache){
			if(url.indexOf('?')>-1){
				url+="&";
			}else{
				url+="?";
			}
			var timestamp = (new Date()).valueOf();
			url+="v="+timestamp;
		}
		fkcommom.iframe.heritage=data;
		activeid=id;
		id="fkcommom_iframe_"+id;
		var hpiframe=document.getElementById(id);
		if(!hpiframe){
			var newNode=document.createElement("div");
			var dom="";
			dom+='<iframe  id="'+id+'" style="position: fixed;top:0px;left:0px;width:100%;height: 100%;z-index:10"  frameborder=0 name="'+id+'" scrolling=auto src="'+url+'"></iframe>'
			newNode.innerHTML=dom;
			document.body.appendChild(newNode);
			hpiframe=document.getElementById(id);
		}else{
			hpiframe.style.display="block";
		}
		fkcommom.iframe.activeiframe=hpiframe;
	},
	
	closePage:function(data,execfunc){
		console.log("parent",data);
		fkcommom.iframe.activeiframe.style.display="none";
		
		let rd=fkcommom.iframe.receiveData;
		for(var i=0;i<rd.length;i++){
			if(rd[i].id==activeid){
				activefunc=rd[i].f;
				activefunc(data,execfunc);
				break;
			}
		}
		
	},
	disposalPage:function(data,execfunc){
		//fkcommom.iframe.closePage(data,execfunc);
		fkcommom.iframe.activeiframe.parentNode.removeChild(fkcommom.iframe.activeiframe);
		
	},
	//该方法在子页面调用
	returnData:function(data){
		console.log("child",data);
		if(parent){
			parent.fkcommom.iframe.closePage(data,true);
		}else{
			console.error("未检测到parent");
		}
	},
	cancel:function(){
		console.log("child","取消");
		if(parent){
			parent.fkcommom.iframe.closePage(false,false);
		}else{
			console.error("未检测到parent");
		}
	},
	disposal:function(){
		console.log("child","销毁");
		if(parent){
			parent.fkcommom.iframe.disposalPage(false,false);
		}else{
			console.error("未检测到parent");
		}
	},
	getData:function(){
		var data=null;
		console.log("child","获取父页面传递数据");
		if(parent){
			data=parent.fkcommom.iframe.heritage;
			console.log("child","获取父页面传递数据",data);
		}else{
			console.error("未检测到parent");
		}
		return data;
	}
}


fkcommom.localStorage={}
fkcommom.localStorage.get=function(key){
	let result = window.localStorage.getItem(key);
	return result;
}
fkcommom.localStorage.set=function(key,value){
	window.localStorage.setItem(key,value);
}


/*********************************************************************
**** 业务方法 Start
*********************************************************************/

//通过区域，行号，列 获取 bin
fkcommom.mergeBin=function(area,line,column){
	let bin="";
	bin+=area;
	
	if(line){
		line = line.padStart(2,'0');
	}

	bin+=line;
	if(column && column!=""){
		bin+=":";
	}
	bin+=column;
	
	return bin;
}

//根据Item获取对应的库存详情，根据10模块改写。
fkcommom.getItemInventroyDetail=function(item,f){
	fkcommom.axios({
			url: fkconfig.NSSL._10_Search,
			data: {
				"locationId": fkcommom.cookie.getCookie("locationId"),
				"searchText": item,
			}
		})
		.then(resp => {
			if(resp.data.Code==300){
				console.log(item,'货品对应的库存数据：', resp.data.Data);
				
			}else{
				//this.$toast.fail("货品获取失败");
				console.log('失败log', resp);
			}
			if(f) f(resp.data.Data);
		}).catch(err => {
			console.log('失败log', err);
		});
}

fkcommom.getItemInventroyDetail2=function(item){
	
	return new Promise(function(resolve, reject) {
	
	fkcommom.axios({
			url: fkconfig.NSSL._10_Search,
			data: {
				"locationId": fkcommom.cookie.getCookie("locationId"),
				"searchText": item,
			}
		})
		.then(resp => {
			if(resp.data.Code==300){
				console.log(item,'货品对应的库存数据：', resp.data.Data);
				resolve(resp.data.Data);
			}else{
				//this.$toast.fail("货品获取失败");
				console.log('货品对应的库存数据--失败', resp);
				
				reject(resp);
			}
			
		}).catch(err => {
			console.log('失败货品对应的库存数据--失败', err);
			reject(resp);
		});
	});
}

//通过货品+location获取对应的库位
fkcommom.getDefaultBin=function(isOutBin,locationId,itemId,f){
	if(isOutBin){
		fkcommom.axios({
				url: fkconfig.NSSL._get_Inventory,
				data: {
					"locationId": fkcommom.cookie.getCookie("locationId"),
					"searchText": itemId,
				}
			})
			.then(resp => {
				console.log("货品仓库默认库位",resp.data.Data);
				var data=resp.data.Data;
				var binNum=0;
				var tempBin="";
				for(var i=0;i<data.length;i++){
					var item=data[i];
					
					tempBin=item.binNumber;
					
					if(tempBin=="") continue;
					binNum++;
					if(binNum>=2){
						tempBin="";
						break;
					}
				}
				
				
				if(tempBin!=""){
					bins=tempBin.split(':');
					var zoneRow=bins[0];
					var zone=zoneRow;
					var row="";
					var column="";
					if(bins.length>1) column=bins[1];
					
						var tempValue=zoneRow.substring(zoneRow.length-2);
						var _value=parseInt(tempValue);
						if (!isNaN(_value)){
							zone=zoneRow.substring(0,zoneRow.length-2);
							row=tempValue;
						}
					
					f({
						defaultFlag:true,
						bin:tempBin,
						zone:zone,
						row:row,
						column:column,
						binArray:data
					});
				}else{
					console.log("当前货品没有找到默认库位");
					f({
						defaultFlag:false,
						binArray:data
					});
				}
			});
	}else{
		fkcommom.axios({
				data: {
					search_id: "customsearch_hc_wms_item_list_1",
					extra_filter: [["binnumber.location" , "anyof" , locationId], "AND" , ["internalid" , "anyof" , itemId]]
				}
			})
			.then(resp => {
				console.log("货品仓库默认库位",resp.data.Data);
				var data=resp.data.Data;
				var binNum=0;
				var tempBin="";
				for(var i=0;i<data.length;i++){
					var item=data[i];
					
					tempBin=item.defaultbinNumber;
					break;
				}
				
				
				if(tempBin!=""){
					bins=tempBin.split(':');
					var zoneRow=bins[0];
					var zone=zoneRow;
					var row="";
					var column="";
					if(bins.length>1) column=bins[1];
					
						var tempValue=zoneRow.substring(zoneRow.length-2);
						var _value=parseInt(tempValue);
						if (!isNaN(_value)){
							zone=zoneRow.substring(0,zoneRow.length-2);
							row=tempValue;
						}
					
					f({
						bin:tempBin,
						zone:zone,
						row:row,
						column:column
					});
				}else{
					console.log("当前货品没有找到默认库位");
					f(false);
				}
			});
	}
	
}


/*********************************************************************
**** 业务方法 End
*********************************************************************/