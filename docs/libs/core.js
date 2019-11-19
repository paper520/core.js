
/*!
* @yelloxing/core.js - 🐠 A modern JavaScript utility library delivering modularity, performance, & extras.
* git+https://github.com/yelloxing/core.js.git
*
* author 心叶
*
* version 0.3.3
*
* build Wed Aug 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Tue Nov 19 2019 23:25:32 GMT+0800 (GMT+08:00)
*/

"use strict";function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true}catch(e){return false}}function _construct(Parent,args,Class){if(isNativeReflectConstruct()){_construct=Reflect.construct}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance}}return _construct.apply(null,arguments)}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}(function(){"use strict";var _dictionary;var MAX_SAFE_INTEGER=9007199254740991;function isLength(value){return typeof value=="number"&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER}function isArrayLike(value){return value!=null&&typeof value!="function"&&isLength(value.length)}var toString=Object.prototype.toString;function getType(value){if(value==null){return value===undefined?"[object Undefined]":"[object Null]"}return toString.call(value)}function isString(value){var type=_typeof(value);return type==="string"||type==="object"&&value!=null&&!Array.isArray(value)&&getType(value)==="[object String]"}function isArraySpec(value){return isArrayLike(value)&&!isString(value)}var concat=function concat(newArray,values){for(var i=0;i<values.length;i++){if(isArraySpec(values[i])){if(values[i].length>1){concat(newArray,values[i])}else if(values[i].length===1){concat(newArray,values[i][0])}}else{newArray.push(values[i])}}};function concat$1(){var newArray=[];for(var _len=arguments.length,values=new Array(_len),_key=0;_key<_len;_key++){values[_key]=arguments[_key]}concat(newArray,values);return newArray}function eq(value,other){return value===other||value!==value&&other!==other}function indexOf(array,value,fromIndex){if(!isArrayLike(array)){return-1}if(!isLength(fromIndex)||fromIndex<0){fromIndex=0}for(;fromIndex<array.length;fromIndex++){if(eq(array[fromIndex],value)){return fromIndex}}return-1}function lastIndexOf(array,value,fromIndex){if(!isArrayLike(array)){return-1}if(!isLength(fromIndex)||fromIndex>array.length-1){fromIndex=array.length-1}for(;fromIndex>-1;fromIndex--){if(eq(array[fromIndex],value)){return fromIndex}}return-1}function unique(array){if(!isArraySpec(array)){return array}if(array.length===0){return[]}if(array.length===1){return[array[0]]}var newArray=[],help=_construct(Array,_toConsumableArray(array));while(help.length>0){newArray.push(help[0]);var value=help[0],j=-1;for(var i=1;i<help.length;i++){if(!eq(value,help[i])){help[j+1]=help[i];j+=1}}help.length=j+1}return newArray}function isSymbol(value){var type=_typeof(value);return type==="symbol"||type==="object"&&value!==null&&getType(value)==="[object Symbol]"}var symbolToString=Symbol.prototype.toString;var hasOwnProperty=Object.prototype.hasOwnProperty;var INFINITY=1/0;function toString$1(value){if(value==null){return""}if(typeof value==="string"){return value}if(isString(value)){return value+""}if(Array.isArray(value)){var _temp=[];for(var i=0;i<value.length;i++){_temp[i]=toString$1(value[i])}return"[".concat(_temp,"]")}if(isSymbol(value)){return symbolToString?symbolToString.call(value):""}var temp="";for(var key in value){if(hasOwnProperty.call(value,key))temp+=',"'+toString$1(key)+'":'+toString$1(value[key])}if(temp!==""){temp=temp.replace(/^,/,"");return"{"+temp+"}"}var result="".concat(value);return result==="0"&&1/value===-INFINITY?"-0":result}function isArray(value,notStrict){if(notStrict){return isArraySpec(value)}return Array.isArray(value)}function isObject(value){var type=_typeof(value);return value!=null&&(type==="object"||type==="function")}function isBoolean(value){return value===true||value===false||value!==null&&_typeof(value)==="object"&&getType(value)==="[object Boolean]"}function isPlainObject(value){if(value===null||_typeof(value)!=="object"||getType(value)!="[object Object]"){return false}if(Object.getPrototypeOf(value)===null){return true}var proto=value;while(Object.getPrototypeOf(proto)!==null){proto=Object.getPrototypeOf(proto)}return Object.getPrototypeOf(value)===proto}function isElement(value){return value!==null&&_typeof(value)==="object"&&(value.nodeType===1||value.nodeType===9||value.nodeType===11)&&!isPlainObject(value)}function isText(value){return value!==null&&_typeof(value)==="object"&&value.nodeType===3&&!isPlainObject(value)}function isFunction(value){if(!isObject(value)){return false}var type=getType(value);return type==="[object Function]"||type==="[object AsyncFunction]"||type==="[object GeneratorFunction]"||type==="[object Proxy]"}function isError(value){if(value===null||_typeof(value)!=="object"){return false}var type=getType(value);return type==="[object Error]"||type==="[object DOMException]"||typeof value.message==="string"&&typeof value.name==="string"&&!isPlainObject(value)}function isNull(value){return value===null}function isNumber(value){return typeof value==="number"||value!==null&&_typeof(value)==="object"&&getType(value)==="[object Number]"}function isUndefined(value){return value===undefined}function max(array,valback){if(!isArrayLike(array)||array.length<1){return undefined}if(valback){var maxIndex=0,maxValue=valback(array[0],0),temp;for(var index=1;index<array.length;index++){temp=valback(array[index],index);if(temp>maxValue){maxValue=temp;maxIndex=index}}return array[maxIndex]}else{var _maxIndex=0;for(var _index=1;_index<array.length;_index++){if(array[_index]>array[_maxIndex]){_maxIndex=_index}}return array[_maxIndex]}}function min(array,valback){if(!isArrayLike(array)||array.length<1){return undefined}if(valback){var minIndex=0,minValue=valback(array[0],0),temp;for(var index=1;index<array.length;index++){temp=valback(array[index],index);if(temp<minValue){minValue=temp;minIndex=index}}return array[minIndex]}else{var _minIndex=0;for(var _index2=1;_index2<array.length;_index2++){if(array[_index2]<array[_minIndex]){_minIndex=_index2}}return array[_minIndex]}}function isKey(value,object){if(Array.isArray(value)){return false}var type=_typeof(value);if(type=="number"||type=="boolean"||value==null||isSymbol(value)){return true}return object!==null&&value in Object(object)||/^\w*$/.test(value)}function stringToPath(value){return value.replace(/\[/g,".").replace(/\]/g,"").replace(/"/g,"").replace(/'/g,"").split(".")}function castPath(value,object){if(Array.isArray(value)){return value}return isKey(value,object)?[value]:stringToPath(value)}var INFINITY$1=1/0;function toKey(value){if(typeof value==="string"||isSymbol(value)){return value}var result="".concat(value);return result==="0"&&1/value===-INFINITY$1?"-0":result}function baseGet(object,path){path=castPath(path,object);var index=0;for(;index<path.length&&object!==null;index++){object=object[toKey(path[index])]}return index&&index===path.length?object:undefined}function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result}function baseAssignValue(object,key,value){if(key=="__proto__"){Object.defineProperty(object,key,{configurable:true,enumerable:true,value:value,writable:true})}else{object[key]=value}}function assignValue(object,key,value){baseAssignValue(object,key,value)}function baseSet(object,path,value,customizer){if(!isObject(object)){return object}path=castPath(path,object);var nested=object;for(var index=0;index<path.length;index++){var key=toKey(path[index]);var newValue=value;if(index+1!=path.length){var objValue=nested[key];if(!isObject(objValue)){newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue={}}}else{newValue=objValue}}assignValue(nested,key,newValue);nested=nested[key]}return object}function set(object,path,value,customizer){customizer=typeof customizer==="function"?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer)}function split(str,splitStr){str=toString$1(str);var resultArray=[],temp=str.split(splitStr);for(var i=0;i<temp.length;i++){temp[i]=temp[i].trim();if(temp[i]!=""){resultArray.push(temp[i])}}return resultArray}var $timers=[];var $interval=13;var $speeds=400;var $timerId=null;function animation(doback,duration,callback){var clock={timer:function timer(tick,duration,callback){if(!tick){throw new Error("Tick is required!")}duration=duration||$speeds;var id=(new Date).valueOf()+"_"+(Math.random()*1e3).toFixed(0);$timers.push({id:id,createTime:new Date,tick:tick,duration:duration,callback:callback});clock.start();return id},start:function start(){if(!$timerId){$timerId=window.setInterval(clock.tick,$interval)}},tick:function tick(){var createTime,flag,tick,callback,timer,duration,passTime,timers=$timers;$timers=[];$timers.length=0;for(flag=0;flag<timers.length;flag++){timer=timers[flag];createTime=timer.createTime;tick=timer.tick;duration=timer.duration;callback=timer.callback;passTime=(+new Date-createTime)/duration;passTime=passTime>1?1:passTime;tick(passTime);if(passTime<1&&timer.id){$timers.push(timer)}else if(callback){callback(passTime)}}if($timers.length<=0){clock.stop()}},stop:function stop(){if($timerId){window.clearInterval($timerId);$timerId=null}}};var id=clock.timer(function(deep){doback(deep)},duration,callback);return function(){var i;for(i in $timers){if($timers[i].id==id){$timers[i].id=undefined;return}}}}function initConfig(init,data){for(var key in data){try{init[key]=data[key]}catch(e){throw new Error("Illegal property value！")}}return init}function Hermite(config){config=initConfig({u:.5},config);var MR,a,b;var hermite=function hermite(x){if(MR){var sx=(x-a)/(b-a),sx2=sx*sx,sx3=sx*sx2;var sResult=sx3*MR[0]+sx2*MR[1]+sx*MR[2]+MR[3];return sResult*(b-a)}else throw new Error("You shoud first set the position!")};hermite.setP=function(x1,y1,x2,y2,s1,s2){if(x1<x2){a=x1;b=x2;var p3=config.u*s1,p4=config.u*s2;y1/=x2-x1;y2/=x2-x1;MR=[2*y1-2*y2+p3+p4,3*y2-3*y1-2*p3-p4,p3,y1]}else throw new Error("The point x-position should be increamented!");return hermite};return hermite}var dictionary=(_dictionary={48:[0,")"],49:[1,"!"],50:[2,"@"],51:[3,"#"],52:[4,"$"],53:[5,"%"],54:[6,"^"],55:[7,"&"],56:[8,"*"],57:[9,"("],65:["a","A"],66:["b","B"],67:["c","C"],68:["d","D"],69:["e","E"],70:["f","F"],71:["g","G"],72:["h","H"],73:["i","I"],74:["j","J"],75:["k","K"],76:["l","L"],77:["m","M"],78:["n","N"],79:["o","O"],80:["p","P"],81:["q","Q"],82:["r","R"],83:["s","S"],84:["t","T"],85:["u","U"],86:["v","V"],87:["w","W"],88:["x","X"],89:["y","Y"],90:["z","Z"],37:"left",38:"up",39:"right",40:"down",33:"page up",34:"page down",35:"end",36:"home",16:"shift",17:"ctrl",18:"alt",91:"command left",93:"command right",9:"tab",20:"caps lock",32:"spacebar",8:"delete",13:"enter",27:"esc",46:"delete",45:"insert",144:"number lock",145:"screen lock",12:"clear"},_defineProperty(_dictionary,"45","insert"),_defineProperty(_dictionary,112,"f1"),_defineProperty(_dictionary,113,"f2"),_defineProperty(_dictionary,114,"f3"),_defineProperty(_dictionary,115,"f4"),_defineProperty(_dictionary,116,"f5"),_defineProperty(_dictionary,117,"f6"),_defineProperty(_dictionary,118,"f7"),_defineProperty(_dictionary,119,"f8"),_defineProperty(_dictionary,120,"f9"),_defineProperty(_dictionary,121,"f10"),_defineProperty(_dictionary,122,"f11"),_defineProperty(_dictionary,123,"f12"),_defineProperty(_dictionary,189,["-","_"]),_defineProperty(_dictionary,187,["=","+"]),_defineProperty(_dictionary,219,["[","{"]),_defineProperty(_dictionary,221,["]","}"]),_defineProperty(_dictionary,220,["\\","|"]),_defineProperty(_dictionary,186,[";",":"]),_defineProperty(_dictionary,222,["'",'"']),_defineProperty(_dictionary,188,[",","<"]),_defineProperty(_dictionary,190,[".",">"]),_defineProperty(_dictionary,191,["/","?"]),_defineProperty(_dictionary,192,["`","~"]),_dictionary);var help_key=["shift","ctrl","alt"];function keyString(event){event=event||window.event;console.log(event);var keycode=event.keyCode||event.which;var key=dictionary[keycode]||keycode;if(!key)return;if(key.constructor!==Array)key=[key,key];var shift=event.shiftKey?"shift+":"",alt=event.altKey?"alt+":"",ctrl=event.ctrlKey?"ctrl+":"";var resultKey="";if(help_key.indexOf(key[0])>=0){key[0]=key[1]=""}var lockPress=event.code=="Key"+event.key&&!shift;resultKey=(ctrl+shift+alt+(lockPress?key[1]:key[0])).replace(/\+$/,"")||"ctrl";return resultKey}function _move(d,a,b,c){c=c||0;var sqrt=Math.sqrt(a*a+b*b+c*c);return[1,0,0,0,0,1,0,0,0,0,1,0,a*d/sqrt,b*d/sqrt,c*d/sqrt,1]}function _rotate(deg){var sin=Math.sin(deg),cos=Math.cos(deg);return[cos,sin,0,0,-sin,cos,0,0,0,0,1,0,0,0,0,1]}function _scale(xTimes,yTimes,zTimes,cx,cy,cz){cx=cx||0;cy=cy||0;cz=cz||0;return[xTimes,0,0,0,0,yTimes,0,0,0,0,zTimes,0,cx-cx*xTimes,cy-cy*yTimes,cz-cz*zTimes,1]}function _transform(a1,b1,c1,a2,b2,c2){if(typeof a1==="number"&&typeof b1==="number"){if(typeof c1!=="number"){c1=0;a2=a1;b2=b1;c2=1}else if(typeof a2!=="number"||typeof b2!=="number"||typeof c2!=="number"){a2=a1;b2=b1;c2=c1;a1=0;b1=0;c1=0}if(a1==a2&&b1==b2&&c1==c2)throw new Error("It's not a legitimate ray!");var sqrt1=Math.sqrt((a2-a1)*(a2-a1)+(b2-b1)*(b2-b1)),cos1=sqrt1!=0?(b2-b1)/sqrt1:1,sin1=sqrt1!=0?(a2-a1)/sqrt1:0,b=(a2-a1)*sin1+(b2-b1)*cos1,c=c2-c1,sqrt2=Math.sqrt(b*b+c*c),cos2=sqrt2!=0?c/sqrt2:1,sin2=sqrt2!=0?b/sqrt2:0;return[[cos1,cos2*sin1,sin1*sin2,0,-sin1,cos1*cos2,cos1*sin2,0,0,-sin2,cos2,0,b1*sin1-a1*cos1,c1*sin2-a1*sin1*cos2-b1*cos1*cos2,-a1*sin1*sin2-b1*cos1*sin2-c1*cos2,1],[cos1,-sin1,0,0,cos2*sin1,cos2*cos1,-sin2,0,sin1*sin2,cos1*sin2,cos2,0,a1,b1,c1,1]]}else{throw new Error("a1 and b1 is required!")}}var _multiply=function _multiply(matrix4,param){var newParam=[];for(var i=0;i<4;i++){for(var j=0;j<param.length/4;j++){newParam[j*4+i]=matrix4[i]*param[j*4]+matrix4[i+4]*param[j*4+1]+matrix4[i+8]*param[j*4+2]+matrix4[i+12]*param[j*4+3]}}return newParam};function Matrix4(initMatrix4){var matrix4=initMatrix4||[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];var matrix4Obj={move:function move(dis,a,b,c){matrix4=_multiply(_move(dis,a,b,c),matrix4);return matrix4Obj},rotate:function rotate(deg,a1,b1,c1,a2,b2,c2){var matrix4s=_transform(a1,b1,c1,a2,b2,c2);matrix4=_multiply(_multiply(_multiply(matrix4s[1],_rotate(deg)),matrix4s[0]),matrix4);return matrix4Obj},scale:function scale(xTimes,yTimes,zTimes,cx,cy,cz){matrix4=_multiply(_scale(xTimes,yTimes,zTimes,cx,cy,cz),matrix4);return matrix4Obj},multiply:function multiply(newMatrix4,flag){matrix4=flag?_multiply(matrix4,newMatrix4):_multiply(newMatrix4,matrix4);return matrix4Obj},use:function use(x,y,z,w){z=z||0;w=w||1;var temp=_multiply(matrix4,[x,y,z,w]);temp[0]=+temp[0].toFixed(7);temp[1]=+temp[1].toFixed(7);temp[2]=+temp[2].toFixed(7);temp[3]=+temp[3].toFixed(7);return temp},value:function value(){return matrix4}};return matrix4Obj}function tree(_config){var config=_config||{},alltreedata,rootid;var update=function update(){var beforeDis=[],size=0,maxDeep=0;(function positionCalc(pNode,deep){if(deep>maxDeep)maxDeep=deep;var flag;for(flag=0;flag<pNode.children.length;flag++){positionCalc(alltreedata[pNode.children[flag]],deep+1)}alltreedata[pNode.id].left=deep+.5;if(flag==0){if(beforeDis[deep]==undefined)beforeDis[deep]=-.5;if(beforeDis[deep-1]==undefined)beforeDis[deep-1]=-.5;alltreedata[pNode.id].top=beforeDis[deep]+1;var pTop=beforeDis[deep]+1+(alltreedata[pNode.pid].children.length-1)*.5;if(pTop-1<beforeDis[deep-1])alltreedata[pNode.id].top=beforeDis[deep-1]+1-(alltreedata[pNode.pid].children.length-1)*.5}else{alltreedata[pNode.id].top=(alltreedata[pNode.children[0]].top+alltreedata[pNode.children[flag-1]].top)*.5}if(alltreedata[pNode.id].top<=beforeDis[deep]){var needUp=beforeDis[deep]+1-alltreedata[pNode.id].top;(function doUp(_pid,_deep){alltreedata[_pid].top+=needUp;if(beforeDis[_deep]<alltreedata[_pid].top)beforeDis[_deep]=alltreedata[_pid].top;var _flag;for(_flag=0;_flag<alltreedata[_pid].children.length;_flag++){doUp(alltreedata[_pid].children[_flag],_deep+1)}})(pNode.id,deep)}beforeDis[deep]=alltreedata[pNode.id].top;if(alltreedata[pNode.id].top+.5>size)size=alltreedata[pNode.id].top+.5})(alltreedata[rootid],0);return{node:alltreedata,root:rootid,size:size,deep:maxDeep+1}};var toInnerTree=function toInnerTree(initTree){var tempTree={};var temp=config.root(initTree),id,rid;id=rid=config.id(temp);tempTree[id]={data:temp,pid:null,id:id,children:[]};(function createTree(pdata,pid){var children=config.child(pdata,initTree),flag;for(flag=0;children&&flag<children.length;flag++){id=config.id(children[flag]);tempTree[pid].children.push(id);tempTree[id]={data:children[flag],pid:pid,id:id,children:[]};createTree(children[flag],id)}})(temp,id);return[rid,tempTree]};var tree=function tree(initTree){var treeData=toInnerTree(initTree);alltreedata=treeData[1];rootid=treeData[0];return update()};tree.root=function(rootback){config.root=rootback;return tree};tree.child=function(childback){config.child=childback;return tree};tree.id=function(idback){config.id=idback;return tree};return tree}var __={concat:concat$1,indexOf:indexOf,lastIndexOf:lastIndexOf,unique:unique,eq:eq,toString:toString$1,isObject:isObject,isSymbol:isSymbol,isString:isString,isBoolean:isBoolean,isElement:isElement,isText:isText,isFunction:isFunction,isError:isError,isNull:isNull,isNumber:isNumber,isUndefined:isUndefined,isArray:isArray,max:max,min:min,get:get,set:set,split:split,animation:animation,Hermite:Hermite,keyString:keyString,Matrix4:Matrix4,tree:tree};if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&_typeof(module.exports)==="object"){module.exports=__}else{var $__=window.__;__.noConflict=function(deep){if(window.__===__){window.__=$__}return __};window.__=__}})();