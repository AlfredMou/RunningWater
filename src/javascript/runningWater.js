(function($){
	if($ instanceof Object){
		var blockNumber=0,windowLoaded=false;
		//添加块的模板
		$(window).on("load",function(){
			windowLoaded=true;
		})
		var defaultView = "<div class='water-running-block' style='visibility:hidden;'><img src='{image}'><div class='message-content'><h4>{header}</h4><p class=''>{context}</p></div></div>";
		
		function handleStyle(x,y){
			return "left:"+x+"px;top:"+y+"px;";
		}
		//流水布局单位块对象
		function RunningWater(obj){
			this.itemHtml=obj.htmlModel||defaultView;
		}
		//处理html文本主要对html模板的占位符进行填充
		RunningWater.prototype.append=function(data){
 			if(! data instanceof Object){
 				throw new Error("data is not a Object:data={image:value,header:value,context:value}");
 			}
 			var model=this.itemHtml,
 				context;

 			if(typeof data.image ==="string"){
				model=model.replace(/{image}/ig,data.image);
 			}

 			if(typeof data.header==="string"){
 				model=model.replace(/{header}/ig,data.header);
 			}
 			if($.type(data.header)==="object"){
 				context=data.header;
 				for(var item in context){
 					model=model.replace(new RegExp("{"+item+"}","ig"),context[item]);
 				}
 			}
 			//对单一的context进行处理
 			if(typeof data.context==="string"||typeof data.context==="number"){
 				model=model.replace(/{context}/ig,data.context);
 			}
 			//对context是对象的进行处理
 			if(data.context instanceof Object&& !data.context instanceof Array){
 				context=data.context;
 				for(var item in context){
 					model=model.replace(new RegExp("{"+item+"}","ig"),context[item]);
 				}
 				//throw new Error("暂时不支持多文本添加");
 			}
 			//对context是数组的进行处理
 			if(data.context instanceof Array){
 				var regExp=/\[([\S\s]+)\]/ig,objStr,
 					handle;
 				var handleAfter="";
 				
 				context=data.context;
 				//console.log(model);
 				if(regExp.exec(model)===null){
 					throw new Error("Object RunningWater Function append:'定义了context数据为数组对象，未在模板中指定替换对象'")
 				}
 				regExp.exec(model);
 				handle = regExp.exec(model)[1];
 				model=model.replace(/\[[\S\s]+\]/ig,"{stance}");
 				for(var i = 0,len=context.length;i<len;i++){
 					objStr=handle;
 					//处理数组中如果包含的是对象
 					if($.type(context[i])==="object"){	
						for(var item in context[i]){
	 						objStr=objStr.replace(new RegExp("{"+item+"}","ig"),context[i][item]);
	 					}
	 					handleAfter=handleAfter+objStr;
 					}
 					//处理数组中如果包含的是基本类型
 					if(typeof context[i]==="number"||typeof context[i]==="string"){
 						handleAfter=handleAfter+handle.replace(new RegExp("{value}","ig"),context[i]);
 					}
 					//处理数组中如果包含的是数组
 					if(context[i] instanceof Array){
 						for(var n=0,childLen=context[i].length;n<childLen;n++){
							objStr=objStr.replace(new RegExp("{["+n+"]}","ig"),context[i][n]);
 						}
 						handleAfter=handleAfter+objStr;
 					}
 				}
 			    model=model.replace(/{stance}/ig,handleAfter);
 				//throw new Error("暂时不支持多文本添加");
 			}
 			return model;
		}

		//流水布局列表对象
		function RunningWaterList(obj){
			this.num = 0;//添加块的数目
			this.rowNum=5||obj.num;//单行块的数目
			this.xList=[];//各块x坐标的列表，由包含列表的块的宽度确定固定
			this.yList=[];//最低层块的y坐标
			this.blockDistance=obj.blockDistance||20;//y方向的块间距
			this.rowWidth=obj.listWidth||obj.element.width();//获取单行宽度
			this.oneXwidth=this.rowWidth/this.rowNum;//获取各块间距
			console.log(this.oneXwidth);
			this.element = obj.element;//容器元素
			this.RunningWater=new RunningWater(obj);//所使用的runningWater对象
			this.element.addClass('water-running');//为容器添加class
			//处理初始块的坐标点x ，y
			if(obj.xList){
				this.xList=obj.xList.slice(0);
				for(var i=0;i<this.rowNum;i++){ 
					this.yList.push(0);
				}
			}else{
				for(var i=0;i<this.rowNum;i++){ 
					this.xList.push(i*this.oneXwidth);
					this.yList.push(0);
				}
			}
			
		}
		function appendBlocksTolist(List){
			var appendHtml="";
			
			//生成并添加加载块的html
			if(! List instanceof Array){
 				throw new Error("Function appendBlocks need a array of data object");
 			}
 			for(var i=0,len=List.length;i<len;i++){
 				appendHtml=appendHtml+this.RunningWater.append(List[i]);
 			}
 			this.element.append(appendHtml);

 			computeBlockXY.apply(this);

 			showAllBlock.apply(this);

 			adjustListHeight.apply(this);

 			//最后确定目前的流水块数
			this.num=this.element.children().length;
		}
		//为列表添加流水块
		RunningWaterList.prototype.appendBlocks = function(List){
			var that=this;
			if(windowLoaded){
				appendBlocksTolist.call(this,list);
			}else{
				$(window).on("load",function(){
					appendBlocksTolist.call(that,List);
				})
			}
			
		};

		//初始化列表
		RunningWaterList.prototype.init = function(){
			this.element.children().css({
				visibility: 'hidden'
			});
 			computeBlockXY.apply(this);

 			showAllBlock.call(this,0);

 			adjustListHeight.apply(this);

 			//最后确定目前的流水块数
			this.num=this.element.children().length;
		};

		//计算流水块的xy坐标
		function computeBlockXY(){
			var lastY,lastX,domHeight,domHandle,blockImg,
			 	blockIndex=this.num,
				lastIndex=0,
			    computeDomList = this.element.children().slice(blockIndex);
				//imageObj=new Image();

			for(var i=0,len=computeDomList.length;i<len;i++){
				lastIndex=getMinIndex(this.yList);
				lastY=this.yList[lastIndex];
				lastX=this.xList[lastIndex];
				$(computeDomList[i]).css({top:lastY+"px",left:lastX});
				blockImg=$(computeDomList[i]).find('img').eq(0).attr("src");
				// imageObj.src=blockImg;
				// if(imageObj.readyState=="complete"){
				this.yList[lastIndex]=lastY+$(computeDomList[i]).height()+this.blockDistance;
				// }else{
				// 	this.yList[lastIndex]=lastY+$(computeDomList[i]).height()+210;
				// }
			}
		};

		//获取到数组中最小值得下标
		function getMinIndex(list){
			if(!list instanceof Array){
				throw new Error("Function getMinIndex:need a argument of array");
			}
			var minIndex=list.length-1;
			for (var i = list.length - 2; i >= 0; i--) {
				if(list[i]<=list[minIndex]){
					minIndex=i;
				};
			};
			return minIndex;
		}

		//显示所有的块
		function showAllBlock(start){
			var blockIndex=start||this.num;
			var computeDomList = this.element.children().slice(blockIndex);
			for(var i=0,len=computeDomList.length;i<len;i++){
				$(computeDomList[i]).css({visibility:"visible"});
			}
		};
		//重新计算列表块的高
		function adjustListHeight(){
			this.element.css({height:Math.max.apply(Math, this.yList)+"px"});
		};
		//参数处理
		function handleArgumentObj(obj){
			var handleAfter=obj||{};
			handleAfter.element=$(this);
			return handleAfter;
		}
		$.fn.runningWater=function(obj,callBack){
			var objHandleAfter,list;
			if(this.length===0){
				throw new  Error("未获得有效的dom对象")
			}
			objHandleAfter=handleArgumentObj.call(this,obj);
			list  = new RunningWaterList(objHandleAfter);
			// list.init();

			if(windowLoaded){
				list.init();
				if(callBack instanceof Function){
					callBack();
				}
			}else{
				$(window).on("load",function(){
					list.init();
					if(callBack instanceof Function){
						callBack();
					}
					showAllBlock.call(list,0);
				});
			}
			
			// if(callBack instanceof Function){
			// 	callBack();
			// }
			
			return list;
		}
	}else{
		throw new Error("本流水布局插件依赖于jq框架请先加载jq框架");
	}
})(jQuery);