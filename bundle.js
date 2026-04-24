/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){'use strict';(function(c,x){"object"===typeof exports&&"undefined"!==typeof module?x(exports):"function"===typeof define&&define.amd?define(["exports"],x):(c=c||self,x(c.React={}))})(this,function(c){function x(a){if(null===a||"object"!==typeof a)return null;a=V&&a[V]||a["@@iterator"];return"function"===typeof a?a:null}function w(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Y(){}function K(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Z(a,b,
e){var m,d={},c=null,h=null;if(null!=b)for(m in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(c=""+b.key),b)aa.call(b,m)&&!ba.hasOwnProperty(m)&&(d[m]=b[m]);var l=arguments.length-2;if(1===l)d.children=e;else if(1<l){for(var f=Array(l),k=0;k<l;k++)f[k]=arguments[k+2];d.children=f}if(a&&a.defaultProps)for(m in l=a.defaultProps,l)void 0===d[m]&&(d[m]=l[m]);return{$$typeof:y,type:a,key:c,ref:h,props:d,_owner:L.current}}function na(a,b){return{$$typeof:y,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===y}function oa(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?oa(""+a.key):b.toString(36)}function B(a,b,e,m,d){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;var h=!1;if(null===a)h=!0;else switch(c){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case y:case pa:h=!0}}if(h)return h=a,d=d(h),a=""===m?"."+
N(h,0):m,ca(d)?(e="",null!=a&&(e=a.replace(da,"$&/")+"/"),B(d,b,e,"",function(a){return a})):null!=d&&(M(d)&&(d=na(d,e+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(da,"$&/")+"/")+a)),b.push(d)),1;h=0;m=""===m?".":m+":";if(ca(a))for(var l=0;l<a.length;l++){c=a[l];var f=m+N(c,l);h+=B(c,b,e,f,d)}else if(f=x(a),"function"===typeof f)for(a=f.call(a),l=0;!(c=a.next()).done;)c=c.value,f=m+N(c,l++),h+=B(c,b,e,f,d);else if("object"===c)throw b=String(a),Error("Objects are not valid as a React child (found: "+
("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function C(a,b,e){if(null==a)return a;var c=[],d=0;B(a,c,"","",function(a){return b.call(e,a,d++)});return c}function qa(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=
0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}function O(a,b){var e=a.length;a.push(b);a:for(;0<e;){var c=e-1>>>1,d=a[c];if(0<D(d,b))a[c]=b,a[e]=d,e=c;else break a}}function p(a){return 0===a.length?null:a[0]}function E(a){if(0===a.length)return null;var b=a[0],e=a.pop();if(e!==b){a[0]=e;a:for(var c=0,d=a.length,k=d>>>1;c<k;){var h=2*(c+1)-1,l=a[h],f=h+1,g=a[f];if(0>D(l,e))f<d&&0>D(g,l)?(a[c]=g,a[f]=e,c=f):(a[c]=l,a[h]=e,c=h);else if(f<d&&0>D(g,e))a[c]=g,a[f]=e,c=f;else break a}}return b}
function D(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}function P(a){for(var b=p(r);null!==b;){if(null===b.callback)E(r);else if(b.startTime<=a)E(r),b.sortIndex=b.expirationTime,O(q,b);else break;b=p(r)}}function Q(a){z=!1;P(a);if(!u)if(null!==p(q))u=!0,R(S);else{var b=p(r);null!==b&&T(Q,b.startTime-a)}}function S(a,b){u=!1;z&&(z=!1,ea(A),A=-1);F=!0;var c=k;try{P(b);for(n=p(q);null!==n&&(!(n.expirationTime>b)||a&&!fa());){var m=n.callback;if("function"===typeof m){n.callback=null;
k=n.priorityLevel;var d=m(n.expirationTime<=b);b=v();"function"===typeof d?n.callback=d:n===p(q)&&E(q);P(b)}else E(q);n=p(q)}if(null!==n)var g=!0;else{var h=p(r);null!==h&&T(Q,h.startTime-b);g=!1}return g}finally{n=null,k=c,F=!1}}function fa(){return v()-ha<ia?!1:!0}function R(a){G=a;H||(H=!0,I())}function T(a,b){A=ja(function(){a(v())},b)}var y=Symbol.for("react.element"),pa=Symbol.for("react.portal"),ra=Symbol.for("react.fragment"),sa=Symbol.for("react.strict_mode"),ta=Symbol.for("react.profiler"),
ua=Symbol.for("react.provider"),va=Symbol.for("react.context"),wa=Symbol.for("react.forward_ref"),xa=Symbol.for("react.suspense"),ya=Symbol.for("react.memo"),za=Symbol.for("react.lazy"),V=Symbol.iterator,X={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,m){},enqueueSetState:function(a,b,c,m){}},ka=Object.assign,W={};w.prototype.isReactComponent={};w.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
this.updater.enqueueSetState(this,a,b,"setState")};w.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};Y.prototype=w.prototype;var t=K.prototype=new Y;t.constructor=K;ka(t,w.prototype);t.isPureReactComponent=!0;var ca=Array.isArray,aa=Object.prototype.hasOwnProperty,L={current:null},ba={key:!0,ref:!0,__self:!0,__source:!0},da=/\/+/g,g={current:null},J={transition:null};if("object"===typeof performance&&"function"===typeof performance.now){var Aa=performance;
var v=function(){return Aa.now()}}else{var la=Date,Ba=la.now();v=function(){return la.now()-Ba}}var q=[],r=[],Ca=1,n=null,k=3,F=!1,u=!1,z=!1,ja="function"===typeof setTimeout?setTimeout:null,ea="function"===typeof clearTimeout?clearTimeout:null,ma="undefined"!==typeof setImmediate?setImmediate:null;"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var H=!1,G=null,A=-1,ia=5,ha=
-1,U=function(){if(null!==G){var a=v();ha=a;var b=!0;try{b=G(!0,a)}finally{b?I():(H=!1,G=null)}}else H=!1};if("function"===typeof ma)var I=function(){ma(U)};else if("undefined"!==typeof MessageChannel){t=new MessageChannel;var Da=t.port2;t.port1.onmessage=U;I=function(){Da.postMessage(null)}}else I=function(){ja(U,0)};t={ReactCurrentDispatcher:g,ReactCurrentOwner:L,ReactCurrentBatchConfig:J,Scheduler:{__proto__:null,unstable_ImmediatePriority:1,unstable_UserBlockingPriority:2,unstable_NormalPriority:3,
unstable_IdlePriority:5,unstable_LowPriority:4,unstable_runWithPriority:function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=k;k=a;try{return b()}finally{k=c}},unstable_next:function(a){switch(k){case 1:case 2:case 3:var b=3;break;default:b=k}var c=k;k=b;try{return a()}finally{k=c}},unstable_scheduleCallback:function(a,b,c){var e=v();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?e+c:e):c=e;switch(a){case 1:var d=-1;break;case 2:d=250;break;case 5:d=
1073741823;break;case 4:d=1E4;break;default:d=5E3}d=c+d;a={id:Ca++,callback:b,priorityLevel:a,startTime:c,expirationTime:d,sortIndex:-1};c>e?(a.sortIndex=c,O(r,a),null===p(q)&&a===p(r)&&(z?(ea(A),A=-1):z=!0,T(Q,c-e))):(a.sortIndex=d,O(q,a),u||F||(u=!0,R(S)));return a},unstable_cancelCallback:function(a){a.callback=null},unstable_wrapCallback:function(a){var b=k;return function(){var c=k;k=b;try{return a.apply(this,arguments)}finally{k=c}}},unstable_getCurrentPriorityLevel:function(){return k},unstable_shouldYield:fa,
unstable_requestPaint:function(){},unstable_continueExecution:function(){u||F||(u=!0,R(S))},unstable_pauseExecution:function(){},unstable_getFirstCallbackNode:function(){return p(q)},get unstable_now(){return v},unstable_forceFrameRate:function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ia=0<a?Math.floor(1E3/a):5},unstable_Profiling:null}};c.Children={map:C,forEach:function(a,b,c){C(a,function(){b.apply(this,
arguments)},c)},count:function(a){var b=0;C(a,function(){b++});return b},toArray:function(a){return C(a,function(a){return a})||[]},only:function(a){if(!M(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};c.Component=w;c.Fragment=ra;c.Profiler=ta;c.PureComponent=K;c.StrictMode=sa;c.Suspense=xa;c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=t;c.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+
a+".");var e=ka({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=L.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(f in b)aa.call(b,f)&&!ba.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==l?l[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){l=Array(f);for(var g=0;g<f;g++)l[g]=arguments[g+2];e.children=l}return{$$typeof:y,type:a.type,key:d,ref:k,props:e,_owner:h}};c.createContext=function(a){a={$$typeof:va,
_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:ua,_context:a};return a.Consumer=a};c.createElement=Z;c.createFactory=function(a){var b=Z.bind(null,a);b.type=a;return b};c.createRef=function(){return{current:null}};c.forwardRef=function(a){return{$$typeof:wa,render:a}};c.isValidElement=M;c.lazy=function(a){return{$$typeof:za,_payload:{_status:-1,_result:a},_init:qa}};c.memo=function(a,b){return{$$typeof:ya,type:a,
compare:void 0===b?null:b}};c.startTransition=function(a,b){b=J.transition;J.transition={};try{a()}finally{J.transition=b}};c.unstable_act=function(a){throw Error("act(...) is not supported in production builds of React.");};c.useCallback=function(a,b){return g.current.useCallback(a,b)};c.useContext=function(a){return g.current.useContext(a)};c.useDebugValue=function(a,b){};c.useDeferredValue=function(a){return g.current.useDeferredValue(a)};c.useEffect=function(a,b){return g.current.useEffect(a,
b)};c.useId=function(){return g.current.useId()};c.useImperativeHandle=function(a,b,c){return g.current.useImperativeHandle(a,b,c)};c.useInsertionEffect=function(a,b){return g.current.useInsertionEffect(a,b)};c.useLayoutEffect=function(a,b){return g.current.useLayoutEffect(a,b)};c.useMemo=function(a,b){return g.current.useMemo(a,b)};c.useReducer=function(a,b,c){return g.current.useReducer(a,b,c)};c.useRef=function(a){return g.current.useRef(a)};c.useState=function(a){return g.current.useState(a)};
c.useSyncExternalStore=function(a,b,c){return g.current.useSyncExternalStore(a,b,c)};c.useTransition=function(){return g.current.useTransition()};c.version="18.2.0"});
})();


/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';(function(Q,mb){"object"===typeof exports&&"undefined"!==typeof module?mb(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],mb):(Q=Q||self,mb(Q.ReactDOM={},Q.React))})(this,function(Q,mb){function n(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
function nb(a,b){Ab(a,b);Ab(a+"Capture",b)}function Ab(a,b){$b[a]=b;for(a=0;a<b.length;a++)cg.add(b[a])}function cj(a){if(Zd.call(dg,a))return!0;if(Zd.call(eg,a))return!1;if(dj.test(a))return dg[a]=!0;eg[a]=!0;return!1}function ej(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function fj(a,b,c,d){if(null===
b||"undefined"===typeof b||ej(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function Y(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}function $d(a,b,c,d){var e=R.hasOwnProperty(b)?R[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==
b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])fj(b,c,e,d)&&(c=null),d||null===e?cj(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}function ac(a){if(null===a||"object"!==typeof a)return null;a=fg&&a[fg]||a["@@iterator"];return"function"===typeof a?a:null}function bc(a,b,
c){if(void 0===ae)try{throw Error();}catch(d){ae=(b=d.stack.trim().match(/\n( *(at )?)/))&&b[1]||""}return"\n"+ae+a}function be(a,b){if(!a||ce)return"";ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(m){var d=m}Reflect.construct(a,[],b)}else{try{b.call()}catch(m){d=m}a.call(b.prototype)}else{try{throw Error();
}catch(m){d=m}a()}}catch(m){if(m&&d&&"string"===typeof m.stack){for(var e=m.stack.split("\n"),f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{ce=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?bc(a):
""}function gj(a){switch(a.tag){case 5:return bc(a.type);case 16:return bc("Lazy");case 13:return bc("Suspense");case 19:return bc("SuspenseList");case 0:case 2:case 15:return a=be(a.type,!1),a;case 11:return a=be(a.type.render,!1),a;case 1:return a=be(a.type,!0),a;default:return""}}function de(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Bb:return"Fragment";case Cb:return"Portal";case ee:return"Profiler";case fe:return"StrictMode";
case ge:return"Suspense";case he:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case gg:return(a.displayName||"Context")+".Consumer";case hg:return(a._context.displayName||"Context")+".Provider";case ie:var b=a.render;a=a.displayName;a||(a=b.displayName||b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case je:return b=a.displayName||null,null!==b?b:de(a.type)||"Memo";case Ta:b=a._payload;a=a._init;try{return de(a(b))}catch(c){}}return null}function hj(a){var b=a.type;
switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(b);case 8:return b===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";
case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Ua(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}function ig(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===
b)}function ij(a){var b=ig(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Pc(a){a._valueTracker||(a._valueTracker=ij(a))}function jg(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ig(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Qc(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ke(a,b){var c=b.checked;return E({},b,{defaultChecked:void 0,defaultValue:void 0,
value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function kg(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ua(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function lg(a,b){b=b.checked;null!=b&&$d(a,"checked",b,!1)}function le(a,b){lg(a,b);var c=Ua(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?me(a,b.type,c):b.hasOwnProperty("defaultValue")&&me(a,b.type,Ua(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}function mg(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;
c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}function me(a,b,c){if("number"!==b||Qc(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Db(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=
!0)}else{c=""+Ua(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}function ne(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(n(91));return E({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ng(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(n(92));if(cc(c)){if(1<c.length)throw Error(n(93));
c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Ua(c)}}function og(a,b){var c=Ua(b.value),d=Ua(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function pg(a,b){b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function qg(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function oe(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?qg(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function rg(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||dc.hasOwnProperty(a)&&dc[a]?(""+b).trim():b+"px"}function sg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rg(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}function pe(a,b){if(b){if(jj[a]&&
(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(n(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(n(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(n(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(n(62));}}function qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;
default:return!0}}function re(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function tg(a){if(a=ec(a)){if("function"!==typeof se)throw Error(n(280));var b=a.stateNode;b&&(b=Rc(b),se(a.stateNode,a.type,b))}}function ug(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a}function vg(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;tg(a);if(b)for(a=0;a<b.length;a++)tg(b[a])}}function wg(a,b,c){if(te)return a(b,c);te=!0;try{return xg(a,b,c)}finally{if(te=
!1,null!==Eb||null!==Fb)yg(),vg()}}function fc(a,b){var c=a.stateNode;if(null===c)return null;var d=Rc(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;
if(c&&"function"!==typeof c)throw Error(n(231,b,typeof c));return c}function kj(a,b,c,d,e,f,g,h,k){gc=!1;Sc=null;lj.apply(mj,arguments)}function nj(a,b,c,d,e,f,g,h,k){kj.apply(this,arguments);if(gc){if(gc){var m=Sc;gc=!1;Sc=null}else throw Error(n(198));Tc||(Tc=!0,ue=m)}}function ob(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function zg(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,
null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Ag(a){if(ob(a)!==a)throw Error(n(188));}function oj(a){var b=a.alternate;if(!b){b=ob(a);if(null===b)throw Error(n(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Ag(e),a;if(f===d)return Ag(e),b;f=f.sibling}throw Error(n(188));}if(c.return!==d.return)c=e,d=f;
else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(n(189));}}if(c.alternate!==d)throw Error(n(190));}if(3!==c.tag)throw Error(n(188));return c.stateNode.current===c?a:b}function Bg(a){a=oj(a);return null!==a?Cg(a):null}function Cg(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Cg(a);if(null!==b)return b;a=a.sibling}return null}
function pj(a,b){if(Ca&&"function"===typeof Ca.onCommitFiberRoot)try{Ca.onCommitFiberRoot(Uc,a,void 0,128===(a.current.flags&128))}catch(c){}}function qj(a){a>>>=0;return 0===a?32:31-(rj(a)/sj|0)|0}function hc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&
4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Vc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=hc(h):(f&=g,0!==f&&(d=hc(f)))}else g=c&~e,0!==g?d=hc(g):0!==f&&(d=hc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&
(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-ta(b),e=1<<c,d|=a[c],b&=~e;return d}function tj(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function uj(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-ta(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=tj(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function ve(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dg(){var a=Wc;Wc<<=1;0===(Wc&4194240)&&(Wc=64);return a}function we(a){for(var b=[],c=0;31>c;c++)b.push(a);
return b}function ic(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-ta(b);a[b]=c}function vj(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-ta(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}function xe(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-ta(c),e=1<<d;e&b|a[d]&
b&&(a[d]|=b);c&=~e}}function Eg(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}function Fg(a,b){switch(a){case "focusin":case "focusout":Va=null;break;case "dragenter":case "dragleave":Wa=null;break;case "mouseover":case "mouseout":Xa=null;break;case "pointerover":case "pointerout":jc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":kc.delete(b.pointerId)}}function lc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,
nativeEvent:f,targetContainers:[e]},null!==b&&(b=ec(b),null!==b&&Gg(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}function wj(a,b,c,d,e){switch(b){case "focusin":return Va=lc(Va,a,b,c,d,e),!0;case "dragenter":return Wa=lc(Wa,a,b,c,d,e),!0;case "mouseover":return Xa=lc(Xa,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;jc.set(f,lc(jc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,kc.set(f,lc(kc.get(f)||null,a,b,
c,d,e)),!0}return!1}function Hg(a){var b=pb(a.target);if(null!==b){var c=ob(b);if(null!==c)if(b=c.tag,13===b){if(b=zg(c),null!==b){a.blockedOn=b;xj(a.priority,function(){yj(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=ye(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;
var d=new c.constructor(c.type,c);ze=d;c.target.dispatchEvent(d);ze=null}else return b=ec(c),null!==b&&Gg(b),a.blockedOn=c,!1;b.shift()}return!0}function Ig(a,b,c){Xc(a)&&c.delete(b)}function zj(){Ae=!1;null!==Va&&Xc(Va)&&(Va=null);null!==Wa&&Xc(Wa)&&(Wa=null);null!==Xa&&Xc(Xa)&&(Xa=null);jc.forEach(Ig);kc.forEach(Ig)}function mc(a,b){a.blockedOn===b&&(a.blockedOn=null,Ae||(Ae=!0,Jg(Kg,zj)))}function nc(a){if(0<Yc.length){mc(Yc[0],a);for(var b=1;b<Yc.length;b++){var c=Yc[b];c.blockedOn===a&&(c.blockedOn=
null)}}null!==Va&&mc(Va,a);null!==Wa&&mc(Wa,a);null!==Xa&&mc(Xa,a);b=function(b){return mc(b,a)};jc.forEach(b);kc.forEach(b);for(b=0;b<Ya.length;b++)c=Ya[b],c.blockedOn===a&&(c.blockedOn=null);for(;0<Ya.length&&(b=Ya[0],null===b.blockedOn);)Hg(b),null===b.blockedOn&&Ya.shift()}function Aj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=1,Be(a,b,c,d)}finally{z=e,Gb.transition=f}}function Bj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=4,Be(a,b,c,d)}finally{z=e,Gb.transition=
f}}function Be(a,b,c,d){if(Zc){var e=ye(a,b,c,d);if(null===e)Ce(a,b,d,$c,c),Fg(a,d);else if(wj(e,a,b,c,d))d.stopPropagation();else if(Fg(a,d),b&4&&-1<Cj.indexOf(a)){for(;null!==e;){var f=ec(e);null!==f&&Dj(f);f=ye(a,b,c,d);null===f&&Ce(a,b,d,$c,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else Ce(a,b,d,null,c)}}function ye(a,b,c,d){$c=null;a=re(d);a=pb(a);if(null!==a)if(b=ob(a),null===b)a=null;else if(c=b.tag,13===c){a=zg(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===
b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);$c=a;return null}function Lg(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;
case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;case "message":switch(Ej()){case De:return 1;case Mg:return 4;case ad:case Fj:return 16;case Ng:return 536870912;default:return 16}default:return 16}}function Og(){if(bd)return bd;
var a,b=Ee,c=b.length,d,e="value"in Za?Za.value:Za.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return bd=e.slice(a,1<d?1-d:void 0)}function cd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function dd(){return!0}function Pg(){return!1}function ka(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;
for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?dd:Pg;this.isPropagationStopped=Pg;return this}E(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=dd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=dd)},persist:function(){},isPersistent:dd});return b}function Gj(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Hj[a])?!!b[a]:!1}function Fe(a){return Gj}function Qg(a,b){switch(a){case "keyup":return-1!==Ij.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function Rg(a){a=a.detail;return"object"===typeof a&&
"data"in a?a.data:null}function Jj(a,b){switch(a){case "compositionend":return Rg(b);case "keypress":if(32!==b.which)return null;Sg=!0;return Tg;case "textInput":return a=b.data,a===Tg&&Sg?null:a;default:return null}}function Kj(a,b){if(Hb)return"compositionend"===a||!Ge&&Qg(a,b)?(a=Og(),bd=Ee=Za=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;
case "compositionend":return Ug&&"ko"!==b.locale?null:b.data;default:return null}}function Vg(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Lj[a.type]:"textarea"===b?!0:!1}function Mj(a){if(!Ia)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Wg(a,b,c,d){ug(d);b=ed(b,"onChange");0<b.length&&(c=new He("onChange","change",null,c,d),a.push({event:c,listeners:b}))}function Nj(a){Xg(a,
0)}function fd(a){var b=Ib(a);if(jg(b))return a}function Oj(a,b){if("change"===a)return b}function Yg(){oc&&(oc.detachEvent("onpropertychange",Zg),pc=oc=null)}function Zg(a){if("value"===a.propertyName&&fd(pc)){var b=[];Wg(b,pc,a,re(a));wg(Nj,b)}}function Pj(a,b,c){"focusin"===a?(Yg(),oc=b,pc=c,oc.attachEvent("onpropertychange",Zg)):"focusout"===a&&Yg()}function Qj(a,b){if("selectionchange"===a||"keyup"===a||"keydown"===a)return fd(pc)}function Rj(a,b){if("click"===a)return fd(b)}function Sj(a,b){if("input"===
a||"change"===a)return fd(b)}function Tj(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}function qc(a,b){if(ua(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!Zd.call(b,e)||!ua(a[e],b[e]))return!1}return!0}function $g(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function ah(a,b){var c=$g(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;
if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=$g(c)}}function bh(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?bh(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function ch(){for(var a=window,b=Qc();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;
b=Qc(a.document)}return b}function Ie(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}function Uj(a){var b=ch(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&bh(c.ownerDocument.documentElement,c)){if(null!==d&&Ie(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);
else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=ah(c,f);var g=ah(c,d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),
a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}function dh(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Je||null==Jb||Jb!==Qc(d)||(d=Jb,"selectionStart"in d&&Ie(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d=
{anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),rc&&qc(rc,d)||(rc=d,d=ed(Ke,"onSelect"),0<d.length&&(b=new He("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Jb)))}function gd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}function hd(a){if(Le[a])return Le[a];if(!Kb[a])return a;var b=Kb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in eh)return Le[a]=b[c];return a}function $a(a,
b){fh.set(a,b);nb(b,[a])}function gh(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;nj(d,b,void 0,a);a.currentTarget=null}function Xg(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,m=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;gh(e,h,m);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;m=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;
gh(e,h,m);f=k}}}if(Tc)throw a=ue,Tc=!1,ue=null,a;}function B(a,b){var c=b[Me];void 0===c&&(c=b[Me]=new Set);var d=a+"__bubble";c.has(d)||(hh(b,a,2,!1),c.add(d))}function Ne(a,b,c){var d=0;b&&(d|=4);hh(c,a,d,b)}function sc(a){if(!a[id]){a[id]=!0;cg.forEach(function(b){"selectionchange"!==b&&(Vj.has(b)||Ne(b,!1,a),Ne(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[id]||(b[id]=!0,Ne("selectionchange",!1,b))}}function hh(a,b,c,d,e){switch(Lg(b)){case 1:e=Aj;break;case 4:e=Bj;break;default:e=
Be}c=e.bind(null,b,c,a);e=void 0;!Oe||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}function Ce(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;
if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=pb(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}wg(function(){var d=f,e=re(c),g=[];a:{var h=fh.get(a);if(void 0!==h){var k=He,n=a;switch(a){case "keypress":if(0===cd(c))break a;case "keydown":case "keyup":k=Wj;break;case "focusin":n="focus";k=Pe;break;case "focusout":n="blur";k=Pe;break;case "beforeblur":case "afterblur":k=Pe;break;
case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=ih;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=Xj;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Yj;break;case jh:case kh:case lh:k=Zj;break;case mh:k=ak;break;case "scroll":k=bk;break;case "wheel":k=ck;break;case "copy":case "cut":case "paste":k=
dk;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=nh}var l=0!==(b&4),p=!l&&"scroll"===a,A=l?null!==h?h+"Capture":null:h;l=[];for(var v=d,q;null!==v;){q=v;var M=q.stateNode;5===q.tag&&null!==M&&(q=M,null!==A&&(M=fc(v,A),null!=M&&l.push(tc(v,M,q))));if(p)break;v=v.return}0<l.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:l}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===
a;k="mouseout"===a||"pointerout"===a;if(h&&c!==ze&&(n=c.relatedTarget||c.fromElement)&&(pb(n)||n[Ja]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?pb(n):null,null!==n&&(p=ob(n),n!==p||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){l=ih;M="onMouseLeave";A="onMouseEnter";v="mouse";if("pointerout"===a||"pointerover"===a)l=nh,M="onPointerLeave",A="onPointerEnter",v="pointer";p=null==k?h:Ib(k);q=null==
n?h:Ib(n);h=new l(M,v+"leave",k,c,e);h.target=p;h.relatedTarget=q;M=null;pb(e)===d&&(l=new l(A,v+"enter",n,c,e),l.target=q,l.relatedTarget=p,M=l);p=M;if(k&&n)b:{l=k;A=n;v=0;for(q=l;q;q=Lb(q))v++;q=0;for(M=A;M;M=Lb(M))q++;for(;0<v-q;)l=Lb(l),v--;for(;0<q-v;)A=Lb(A),q--;for(;v--;){if(l===A||null!==A&&l===A.alternate)break b;l=Lb(l);A=Lb(A)}l=null}else l=null;null!==k&&oh(g,h,k,l,!1);null!==n&&null!==p&&oh(g,p,n,l,!0)}}}a:{h=d?Ib(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===
k&&"file"===h.type)var ma=Oj;else if(Vg(h))if(ph)ma=Sj;else{ma=Qj;var va=Pj}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(ma=Rj);if(ma&&(ma=ma(a,d))){Wg(g,ma,c,e);break a}va&&va(a,h,d);"focusout"===a&&(va=h._wrapperState)&&va.controlled&&"number"===h.type&&me(h,"number",h.value)}va=d?Ib(d):window;switch(a){case "focusin":if(Vg(va)||"true"===va.contentEditable)Jb=va,Ke=d,rc=null;break;case "focusout":rc=Ke=Jb=null;break;case "mousedown":Je=!0;break;case "contextmenu":case "mouseup":case "dragend":Je=
!1;dh(g,c,e);break;case "selectionchange":if(ek)break;case "keydown":case "keyup":dh(g,c,e)}var ab;if(Ge)b:{switch(a){case "compositionstart":var da="onCompositionStart";break b;case "compositionend":da="onCompositionEnd";break b;case "compositionupdate":da="onCompositionUpdate";break b}da=void 0}else Hb?Qg(a,c)&&(da="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(da="onCompositionStart");da&&(Ug&&"ko"!==c.locale&&(Hb||"onCompositionStart"!==da?"onCompositionEnd"===da&&Hb&&(ab=Og()):(Za=e,Ee=
"value"in Za?Za.value:Za.textContent,Hb=!0)),va=ed(d,da),0<va.length&&(da=new qh(da,a,null,c,e),g.push({event:da,listeners:va}),ab?da.data=ab:(ab=Rg(c),null!==ab&&(da.data=ab))));if(ab=fk?Jj(a,c):Kj(a,c))d=ed(d,"onBeforeInput"),0<d.length&&(e=new gk("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=ab)}Xg(g,b)})}function tc(a,b,c){return{instance:a,listener:b,currentTarget:c}}function ed(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==
f&&(e=f,f=fc(a,c),null!=f&&d.unshift(tc(a,f,e)),f=fc(a,b),null!=f&&d.push(tc(a,f,e)));a=a.return}return d}function Lb(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}function oh(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,m=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==m&&(h=m,e?(k=fc(c,f),null!=k&&g.unshift(tc(c,k,h))):e||(k=fc(c,f),null!=k&&g.push(tc(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function rh(a){return("string"===
typeof a?a:""+a).replace(hk,"\n").replace(ik,"")}function jd(a,b,c,d){b=rh(b);if(rh(a)!==b&&c)throw Error(n(425));}function kd(){}function Qe(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}function jk(a){setTimeout(function(){throw a;})}function Re(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=
e.data,"/$"===c){if(0===d){a.removeChild(e);nc(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);nc(b)}function Ka(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}function sh(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}function pb(a){var b=a[Da];
if(b)return b;for(var c=a.parentNode;c;){if(b=c[Ja]||c[Da]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sh(a);null!==a;){if(c=a[Da])return c;a=sh(a)}return b}a=c;c=a.parentNode}return null}function ec(a){a=a[Da]||a[Ja];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Ib(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(n(33));}function Rc(a){return a[uc]||null}function bb(a){return{current:a}}function w(a,b){0>Mb||(a.current=Se[Mb],Se[Mb]=null,Mb--)}
function y(a,b,c){Mb++;Se[Mb]=a.current;a.current=b}function Nb(a,b){var c=a.type.contextTypes;if(!c)return cb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function ea(a){a=a.childContextTypes;return null!==a&&void 0!==a}function th(a,b,c){if(J.current!==cb)throw Error(n(168));
y(J,b);y(S,c)}function uh(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(n(108,hj(a)||"Unknown",e));return E({},c,d)}function ld(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||cb;qb=J.current;y(J,a);y(S,S.current);return!0}function vh(a,b,c){var d=a.stateNode;if(!d)throw Error(n(169));c?(a=uh(a,b,qb),d.__reactInternalMemoizedMergedChildContext=a,w(S),w(J),y(J,a)):w(S);
y(S,c)}function wh(a){null===La?La=[a]:La.push(a)}function kk(a){md=!0;wh(a)}function db(){if(!Te&&null!==La){Te=!0;var a=0,b=z;try{var c=La;for(z=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}La=null;md=!1}catch(e){throw null!==La&&(La=La.slice(a+1)),xh(De,db),e;}finally{z=b,Te=!1}}return null}function rb(a,b){Ob[Pb++]=nd;Ob[Pb++]=od;od=a;nd=b}function yh(a,b,c){na[oa++]=Ma;na[oa++]=Na;na[oa++]=sb;sb=a;var d=Ma;a=Na;var e=32-ta(d)-1;d&=~(1<<e);c+=1;var f=32-ta(b)+e;if(30<f){var g=e-e%5;
f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Ma=1<<32-ta(b)+e|c<<e|d;Na=f+a}else Ma=1<<f|c<<e|d,Na=a}function Ue(a){null!==a.return&&(rb(a,1),yh(a,1,0))}function Ve(a){for(;a===od;)od=Ob[--Pb],Ob[Pb]=null,nd=Ob[--Pb],Ob[Pb]=null;for(;a===sb;)sb=na[--oa],na[oa]=null,Na=na[--oa],na[oa]=null,Ma=na[--oa],na[oa]=null}function zh(a,b){var c=pa(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}function Ah(a,b){switch(a.tag){case 5:var c=
a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,la=a,fa=Ka(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,la=a,fa=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==sb?{id:Ma,overflow:Na}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=pa(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,la=a,fa=null,!0):!1;default:return!1}}function We(a){return 0!==
(a.mode&1)&&0===(a.flags&128)}function Xe(a){if(D){var b=fa;if(b){var c=b;if(!Ah(a,b)){if(We(a))throw Error(n(418));b=Ka(c.nextSibling);var d=la;b&&Ah(a,b)?zh(d,c):(a.flags=a.flags&-4097|2,D=!1,la=a)}}else{if(We(a))throw Error(n(418));a.flags=a.flags&-4097|2;D=!1;la=a}}}function Bh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;la=a}function pd(a){if(a!==la)return!1;if(!D)return Bh(a),D=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Qe(a.type,
a.memoizedProps));if(b&&(b=fa)){if(We(a)){for(a=fa;a;)a=Ka(a.nextSibling);throw Error(n(418));}for(;b;)zh(a,b),b=Ka(b.nextSibling)}Bh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(n(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){fa=Ka(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}fa=null}}else fa=la?Ka(a.stateNode.nextSibling):null;return!0}function Qb(){fa=la=null;D=!1}function Ye(a){null===
wa?wa=[a]:wa.push(a)}function xa(a,b){if(a&&a.defaultProps){b=E({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function Ze(){$e=Rb=qd=null}function af(a,b){b=rd.current;w(rd);a._currentValue=b}function bf(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Sb(a,b){qd=a;$e=Rb=null;a=a.dependencies;null!==a&&null!==a.firstContext&&
(0!==(a.lanes&b)&&(ha=!0),a.firstContext=null)}function qa(a){var b=a._currentValue;if($e!==a)if(a={context:a,memoizedValue:b,next:null},null===Rb){if(null===qd)throw Error(n(308));Rb=a;qd.dependencies={lanes:0,firstContext:a}}else Rb=Rb.next=a;return b}function cf(a){null===tb?tb=[a]:tb.push(a)}function Ch(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,cf(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Oa(a,d)}function Oa(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==
a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}function df(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Dh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Pa(a,b){return{eventTime:a,lane:b,
tag:0,payload:null,callback:null,next:null}}function eb(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(p&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return lk(a,c)}e=d.interleaved;null===e?(b.next=b,cf(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Oa(a,c)}function sd(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Eh(a,b){var c=a.updateQueue,d=a.alternate;
if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=b;c.lastBaseUpdate=b}function td(a,b,c,d){var e=
a.updateQueue;fb=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,m=k.next;k.next=null;null===g?f=m:g.next=m;g=k;var n=a.alternate;null!==n&&(n=n.updateQueue,h=n.lastBaseUpdate,h!==g&&(null===h?n.firstBaseUpdate=m:h.next=m,n.lastBaseUpdate=k))}if(null!==f){var l=e.baseState;g=0;n=m=k=null;h=f;do{var r=h.lane,p=h.eventTime;if((d&r)===r){null!==n&&(n=n.next={eventTime:p,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});a:{var x=
a,F=h;r=b;p=c;switch(F.tag){case 1:x=F.payload;if("function"===typeof x){l=x.call(p,l,r);break a}l=x;break a;case 3:x.flags=x.flags&-65537|128;case 0:x=F.payload;r="function"===typeof x?x.call(p,l,r):x;if(null===r||void 0===r)break a;l=E({},l,r);break a;case 2:fb=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else p={eventTime:p,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===n?(m=n=p,k=l):n=n.next=p,g|=r;h=h.next;if(null===h)if(h=
e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===n&&(k=l);e.baseState=k;e.firstBaseUpdate=m;e.lastBaseUpdate=n;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);ra|=g;a.lanes=g;a.memoizedState=l}}function Fh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(n(191,
e));e.call(d)}}}function ef(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:E({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}function Gh(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}function Hh(a,b,c){var d=!1,e=cb;var f=b.contextType;"object"===typeof f&&null!==f?f=qa(f):(e=ea(b)?qb:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==
d)?Nb(a,e):cb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=ud;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}function Ih(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&ud.enqueueReplaceState(b,
b.state,null)}function ff(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Jh;df(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=qa(f):(f=ea(b)?qb:J.current,e.context=Nb(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(ef(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&ud.enqueueReplaceState(e,e.state,null),td(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function vc(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(n(309));var d=c.stateNode}if(!d)throw Error(n(147,a));var e=
d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;b===Jh&&(b=e.refs={});null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(n(284));if(!c._owner)throw Error(n(290,a));}return a}function vd(a,b){a=Object.prototype.toString.call(b);throw Error(n(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Kh(a){var b=a._init;return b(a._payload)}function Lh(a){function b(b,
c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=gb(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&null===b.alternate&&
(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=gf(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===Bb)return l(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ta&&Kh(f)===b.type))return d=e(b,c.props),d.ref=vc(a,b,c),d.return=a,d;d=wd(c.type,c.key,c.props,null,a.mode,d);d.ref=vc(a,b,c);d.return=a;return d}function m(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==
c.containerInfo||b.stateNode.implementation!==c.implementation)return b=hf(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function l(a,b,c,d,f){if(null===b||7!==b.tag)return b=ub(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function u(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=gf(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case xd:return c=wd(b.type,b.key,b.props,null,a.mode,c),c.ref=vc(a,null,b),c.return=
a,c;case Cb:return b=hf(b,a.mode,c),b.return=a,b;case Ta:var d=b._init;return u(a,d(b._payload),c)}if(cc(b)||ac(b))return b=ub(b,a.mode,c,null),b.return=a,b;vd(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case xd:return c.key===e?k(a,b,c,d):null;case Cb:return c.key===e?m(a,b,c,d):null;case Ta:return e=c._init,r(a,b,e(c._payload),d)}if(cc(c)||
ac(c))return null!==e?null:l(a,b,c,d,null);vd(a,c)}return null}function p(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case xd:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case Cb:return a=a.get(null===d.key?c:d.key)||null,m(b,a,d,e);case Ta:var f=d._init;return p(a,b,c,f(d._payload),e)}if(cc(d)||ac(d))return a=a.get(c)||null,l(b,a,d,e,null);vd(b,d)}return null}function x(e,g,h,k){for(var n=
null,m=null,l=g,q=g=0,v=null;null!==l&&q<h.length;q++){l.index>q?(v=l,l=null):v=l.sibling;var A=r(e,l,h[q],k);if(null===A){null===l&&(l=v);break}a&&l&&null===A.alternate&&b(e,l);g=f(A,g,q);null===m?n=A:m.sibling=A;m=A;l=v}if(q===h.length)return c(e,l),D&&rb(e,q),n;if(null===l){for(;q<h.length;q++)l=u(e,h[q],k),null!==l&&(g=f(l,g,q),null===m?n=l:m.sibling=l,m=l);D&&rb(e,q);return n}for(l=d(e,l);q<h.length;q++)v=p(l,e,q,h[q],k),null!==v&&(a&&null!==v.alternate&&l.delete(null===v.key?q:v.key),g=f(v,
g,q),null===m?n=v:m.sibling=v,m=v);a&&l.forEach(function(a){return b(e,a)});D&&rb(e,q);return n}function F(e,g,h,k){var m=ac(h);if("function"!==typeof m)throw Error(n(150));h=m.call(h);if(null==h)throw Error(n(151));for(var l=m=null,q=g,v=g=0,A=null,t=h.next();null!==q&&!t.done;v++,t=h.next()){q.index>v?(A=q,q=null):A=q.sibling;var x=r(e,q,t.value,k);if(null===x){null===q&&(q=A);break}a&&q&&null===x.alternate&&b(e,q);g=f(x,g,v);null===l?m=x:l.sibling=x;l=x;q=A}if(t.done)return c(e,q),D&&rb(e,v),m;
if(null===q){for(;!t.done;v++,t=h.next())t=u(e,t.value,k),null!==t&&(g=f(t,g,v),null===l?m=t:l.sibling=t,l=t);D&&rb(e,v);return m}for(q=d(e,q);!t.done;v++,t=h.next())t=p(q,e,v,t.value,k),null!==t&&(a&&null!==t.alternate&&q.delete(null===t.key?v:t.key),g=f(t,g,v),null===l?m=t:l.sibling=t,l=t);a&&q.forEach(function(a){return b(e,a)});D&&rb(e,v);return m}function w(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Bb&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case xd:a:{for(var k=
f.key,m=d;null!==m;){if(m.key===k){k=f.type;if(k===Bb){if(7===m.tag){c(a,m.sibling);d=e(m,f.props.children);d.return=a;a=d;break a}}else if(m.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ta&&Kh(k)===m.type){c(a,m.sibling);d=e(m,f.props);d.ref=vc(a,m,f);d.return=a;a=d;break a}c(a,m);break}else b(a,m);m=m.sibling}f.type===Bb?(d=ub(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=wd(f.type,f.key,f.props,null,a.mode,h),h.ref=vc(a,d,f),h.return=a,a=h)}return g(a);case Cb:a:{for(m=f.key;null!==
d;){if(d.key===m)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=hf(f,a.mode,h);d.return=a;a=d}return g(a);case Ta:return m=f._init,w(a,d,m(f._payload),h)}if(cc(f))return x(a,d,f,h);if(ac(f))return F(a,d,f,h);vd(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=gf(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return w}function vb(a){if(a===wc)throw Error(n(174));return a}function jf(a,b){y(xc,b);y(yc,a);y(Ea,wc);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:oe(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=oe(b,a)}w(Ea);y(Ea,b)}function Tb(a){w(Ea);w(yc);w(xc)}function Mh(a){vb(xc.current);var b=vb(Ea.current);var c=oe(b,a.type);b!==c&&(y(yc,a),y(Ea,c))}function kf(a){yc.current===a&&
(w(Ea),w(yc))}function yd(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}function lf(){for(var a=0;a<mf.length;a++)mf[a]._workInProgressVersionPrimary=
null;mf.length=0}function V(){throw Error(n(321));}function nf(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!ua(a[c],b[c]))return!1;return!0}function of(a,b,c,d,e,f){wb=f;C=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;zd.current=null===a||null===a.memoizedState?mk:nk;a=c(d,e);if(zc){f=0;do{zc=!1;Ac=0;if(25<=f)throw Error(n(301));f+=1;N=K=null;b.updateQueue=null;zd.current=ok;a=c(d,e)}while(zc)}zd.current=Ad;b=null!==K&&null!==K.next;wb=0;N=K=C=null;Bd=!1;if(b)throw Error(n(300));
return a}function pf(){var a=0!==Ac;Ac=0;return a}function Fa(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===N?C.memoizedState=N=a:N=N.next=a;return N}function sa(){if(null===K){var a=C.alternate;a=null!==a?a.memoizedState:null}else a=K.next;var b=null===N?C.memoizedState:N.next;if(null!==b)N=b,K=a;else{if(null===a)throw Error(n(310));K=a;a={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null};null===N?C.memoizedState=
N=a:N=N.next=a}return N}function Bc(a,b){return"function"===typeof b?b(a):b}function qf(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(n(311));c.lastRenderedReducer=a;var d=K,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,m=f;do{var l=m.lane;if((wb&l)===l)null!==k&&(k=k.next={lane:0,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null}),d=m.hasEagerState?
m.eagerState:a(d,m.action);else{var u={lane:l,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};null===k?(h=k=u,g=d):k=k.next=u;C.lanes|=l;ra|=l}m=m.next}while(null!==m&&m!==f);null===k?g=d:k.next=h;ua(d,b.memoizedState)||(ha=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,C.lanes|=f,ra|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}function rf(a,b,c){b=sa();
c=b.queue;if(null===c)throw Error(n(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);ua(f,b.memoizedState)||(ha=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Nh(a,b,c){}function Oh(a,b,c){c=C;var d=sa(),e=b(),f=!ua(d.memoizedState,e);f&&(d.memoizedState=e,ha=!0);d=d.queue;sf(Ph.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==N&&
N.memoizedState.tag&1){c.flags|=2048;Cc(9,Qh.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(n(349));0!==(wb&30)||Rh(c,b,e)}return e}function Rh(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}function Qh(a,b,c,d){b.value=c;b.getSnapshot=d;Sh(b)&&Th(a)}function Ph(a,b,c){return c(function(){Sh(b)&&Th(a)})}function Sh(a){var b=a.getSnapshot;a=a.value;try{var c=
b();return!ua(a,c)}catch(d){return!0}}function Th(a){var b=Oa(a,1);null!==b&&ya(b,a,1,-1)}function Uh(a){var b=Fa();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:a};b.queue=a;a=a.dispatch=pk.bind(null,C,a);return[b.memoizedState,a]}function Cc(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.lastEffect=a.next=
a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Vh(a){return sa().memoizedState}function Cd(a,b,c,d){var e=Fa();C.flags|=a;e.memoizedState=Cc(1|b,c,void 0,void 0===d?null:d)}function Dd(a,b,c,d){var e=sa();d=void 0===d?null:d;var f=void 0;if(null!==K){var g=K.memoizedState;f=g.destroy;if(null!==d&&nf(d,g.deps)){e.memoizedState=Cc(b,c,f,d);return}}C.flags|=a;e.memoizedState=Cc(1|b,c,f,d)}function Wh(a,b){return Cd(8390656,8,a,b)}function sf(a,
b){return Dd(2048,8,a,b)}function Xh(a,b){return Dd(4,2,a,b)}function Yh(a,b){return Dd(4,4,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Dd(4,4,Zh.bind(null,b,a),c)}function tf(a,b){}function ai(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&nf(b,d[1]))return d[0];c.memoizedState=[a,
b];return a}function bi(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&nf(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ci(a,b,c){if(0===(wb&21))return a.baseState&&(a.baseState=!1,ha=!0),a.memoizedState=c;ua(c,b)||(c=Dg(),C.lanes|=c,ra|=c,a.baseState=!0);return b}function qk(a,b,c){c=z;z=0!==c&&4>c?c:4;a(!0);var d=uf.transition;uf.transition={};try{a(!1),b()}finally{z=c,uf.transition=d}}function di(){return sa().memoizedState}function rk(a,b,
c){var d=hb(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ei(a))fi(b,c);else if(c=Ch(a,b,c,d),null!==c){var e=Z();ya(c,a,d,e);gi(c,b,d)}}function pk(a,b,c){var d=hb(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ei(a))fi(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(ua(h,g)){var k=b.interleaved;null===k?(e.next=e,cf(b)):
(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(m){}finally{}c=Ch(a,b,e,d);null!==c&&(e=Z(),ya(c,a,d,e),gi(c,b,d))}}function ei(a){var b=a.alternate;return a===C||null!==b&&b===C}function fi(a,b){zc=Bd=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function gi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Ub(a,b){try{var c="",d=b;do c+=gj(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+
"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function vf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function wf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}function hi(a,b,c){c=Pa(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Ed||(Ed=!0,xf=d);wf(a,b)};return c}function ii(a,b,c){c=Pa(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};
c.callback=function(){wf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){wf(a,b);"function"!==typeof d&&(null===ib?ib=new Set([this]):ib.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}function ji(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new sk;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=tk.bind(null,a,b,c),b.then(a,a))}function ki(a){do{var b;
if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}function li(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Pa(-1,1),b.tag=2,eb(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function aa(a,b,c,d){b.child=null===a?mi(b,null,c,d):Vb(b,a.child,c,d)}function ni(a,b,c,d,e){c=c.render;var f=b.ref;Sb(b,e);d=of(a,b,c,d,f,
e);c=pf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&c&&Ue(b);b.flags|=1;aa(a,b,d,e);return b.child}function oi(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!yf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,pi(a,b,f,d,e);a=wd(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:qc;if(c(g,d)&&a.ref===
b.ref)return Qa(a,b,e)}b.flags|=1;a=gb(f,d);a.ref=b.ref;a.return=b;return b.child=a}function pi(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(qc(f,d)&&a.ref===b.ref)if(ha=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(ha=!0);else return b.lanes=a.lanes,Qa(a,b,e)}return zf(a,b,c,d,e)}function qi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},y(Ga,ba),ba|=c;
else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,y(Ga,ba),ba|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;y(Ga,ba);ba|=d}else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,y(Ga,ba),ba|=d;aa(a,b,e,c);return b.child}function ri(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function zf(a,
b,c,d,e){var f=ea(c)?qb:J.current;f=Nb(b,f);Sb(b,e);c=of(a,b,c,d,f,e);d=pf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&d&&Ue(b);b.flags|=1;aa(a,b,c,e);return b.child}function si(a,b,c,d,e){if(ea(c)){var f=!0;ld(b)}else f=!1;Sb(b,e);if(null===b.stateNode)Fd(a,b),Hh(b,c,d),ff(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,m=c.contextType;"object"===typeof m&&null!==m?m=qa(m):(m=ea(c)?qb:J.current,m=Nb(b,
m));var l=c.getDerivedStateFromProps,n="function"===typeof l||"function"===typeof g.getSnapshotBeforeUpdate;n||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==m)&&Ih(b,g,d,m);fb=!1;var r=b.memoizedState;g.state=r;td(b,d,g,e);k=b.memoizedState;h!==d||r!==k||S.current||fb?("function"===typeof l&&(ef(b,c,l,d),k=b.memoizedState),(h=fb||Gh(b,c,h,d,r,k,m))?(n||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||
("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=m,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Dh(a,b);h=b.memoizedProps;m=b.type===b.elementType?h:xa(b.type,h);g.props=
m;n=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=qa(k):(k=ea(c)?qb:J.current,k=Nb(b,k));var p=c.getDerivedStateFromProps;(l="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==n||r!==k)&&Ih(b,g,d,k);fb=!1;r=b.memoizedState;g.state=r;td(b,d,g,e);var x=b.memoizedState;h!==n||r!==x||S.current||fb?("function"===typeof p&&(ef(b,c,p,d),x=b.memoizedState),
(m=fb||Gh(b,c,m,d,r,x,k)||!1)?(l||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=
4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=m):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return Af(a,b,c,d,f,e)}function Af(a,b,c,d,e,f){ri(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&vh(b,c,!1),
Qa(a,b,f);d=b.stateNode;uk.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Vb(b,a.child,null,f),b.child=Vb(b,null,h,f)):aa(a,b,h,f);b.memoizedState=d.state;e&&vh(b,c,!0);return b.child}function ti(a){var b=a.stateNode;b.pendingContext?th(a,b.pendingContext,b.pendingContext!==b.context):b.context&&th(a,b.context,!1);jf(a,b.containerInfo)}function ui(a,b,c,d,e){Qb();Ye(e);b.flags|=256;aa(a,b,c,d);return b.child}function Bf(a){return{baseLanes:a,
cachePool:null,transitions:null}}function vi(a,b,c){var d=b.pendingProps,e=G.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(G,e&1);if(null===a){Xe(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==
f?(f.childLanes=0,f.pendingProps=g):f=Gd(g,d,0,null),a=ub(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=Bf(c),b.memoizedState=Cf,a):Df(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return vk(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=gb(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=gb(h,f):(f=
ub(f,g,c,null),f.flags|=2);f.return=b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?Bf(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=Cf;return d}f=a.child;a=f.sibling;d=gb(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function Df(a,b,c){b=Gd({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function Hd(a,b,c,d){null!==d&&Ye(d);Vb(b,a.child,null,c);a=Df(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}function vk(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=vf(Error(n(422))),Hd(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=Gd({mode:"visible",children:d.children},e,0,null);f=ub(f,e,g,null);f.flags|=2;d.return=
b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Vb(b,a.child,null,g);b.child.memoizedState=Bf(g);b.memoizedState=Cf;return f}if(0===(b.mode&1))return Hd(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;if(d)var h=d.dgst;d=h;f=Error(n(419));d=vf(f,d,void 0);return Hd(a,b,g,d)}h=0!==(g&a.childLanes);if(ha||h){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=
32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Oa(a,e),ya(d,a,e,-1))}Ef();d=vf(Error(n(421)));return Hd(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=wk.bind(null,a),e._reactRetry=b,null;a=f.treeContext;fa=Ka(e.nextSibling);la=b;D=!0;wa=null;null!==a&&(na[oa++]=Ma,na[oa++]=Na,na[oa++]=sb,Ma=a.id,Na=a.overflow,sb=b);b=Df(b,d.children);b.flags|=4096;return b}function wi(a,b,c){a.lanes|=b;var d=a.alternate;
null!==d&&(d.lanes|=b);bf(a.return,b,c)}function Ff(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}function xi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;aa(a,b,d.children,c);d=G.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&
wi(a,c,b);else if(19===a.tag)wi(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}y(G,d);if(0===(b.mode&1))b.memoizedState=null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===yd(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ff(b,!1,e,c,f);break;case "backwards":c=
null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===yd(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ff(b,!0,c,null,f);break;case "together":Ff(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}function Fd(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Qa(a,b,c){null!==a&&(b.dependencies=a.dependencies);ra|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(n(153));if(null!==
b.child){a=b.child;c=gb(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=gb(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}function xk(a,b,c){switch(b.tag){case 3:ti(b);Qb();break;case 5:Mh(b);break;case 1:ea(b.type)&&ld(b);break;case 4:jf(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;y(rd,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(G,G.current&
1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return vi(a,b,c);y(G,G.current&1);a=Qa(a,b,c);return null!==a?a.sibling:null}y(G,G.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return xi(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(G,G.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,qi(a,b,c)}return Qa(a,b,c)}function Dc(a,b){if(!D)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==
b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}function W(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,
d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}function yk(a,b,c){var d=b.pendingProps;Ve(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(b),null;case 1:return ea(b.type)&&(w(S),w(J)),W(b),null;case 3:d=b.stateNode;Tb();w(S);w(J);lf();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)pd(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&
256)||(b.flags|=1024,null!==wa&&(Gf(wa),wa=null));yi(a,b);W(b);return null;case 5:kf(b);var e=vb(xc.current);c=b.type;if(null!==a&&null!=b.stateNode)zk(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(n(166));W(b);return null}a=vb(Ea.current);if(pd(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Da]=b;d[uc]=f;a=0!==(b.mode&1);switch(c){case "dialog":B("cancel",d);B("close",d);break;case "iframe":case "object":case "embed":B("load",d);break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],d);break;case "source":B("error",d);break;case "img":case "image":case "link":B("error",d);B("load",d);break;case "details":B("toggle",d);break;case "input":kg(d,f);B("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};B("invalid",d);break;case "textarea":ng(d,f),B("invalid",d)}pe(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&
jd(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&jd(d.textContent,h,a),e=["children",""+h]):$b.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&B("scroll",d)}switch(c){case "input":Pc(d);mg(d,f,!0);break;case "textarea":Pc(d);pg(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=kd)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===
a&&(a=qg(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Da]=b;a[uc]=d;Ak(a,b,!1,!1);b.stateNode=a;a:{g=qe(c,d);switch(c){case "dialog":B("cancel",a);B("close",a);e=d;break;case "iframe":case "object":case "embed":B("load",a);e=d;break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],a);e=d;break;case "source":B("error",a);e=d;break;case "img":case "image":case "link":B("error",a);B("load",a);e=d;break;case "details":B("toggle",a);e=d;break;case "input":kg(a,d);e=ke(a,d);B("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=E({},d,{value:void 0});B("invalid",a);break;case "textarea":ng(a,d);e=ne(a,d);B("invalid",a);break;default:e=d}pe(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=
h[f];"style"===f?sg(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&zi(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&Fc(a,k):"number"===typeof k&&Fc(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&($b.hasOwnProperty(f)?null!=k&&"onScroll"===f&&B("scroll",a):null!=k&&$d(a,f,k,g))}switch(c){case "input":Pc(a);mg(a,d,!1);break;case "textarea":Pc(a);pg(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Ua(d.value));
break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?Db(a,!!d.multiple,f,!1):null!=d.defaultValue&&Db(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=kd)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}W(b);return null;case 6:if(a&&null!=b.stateNode)Bk(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===
b.stateNode)throw Error(n(166));c=vb(xc.current);vb(Ea.current);if(pd(b)){d=b.stateNode;c=b.memoizedProps;d[Da]=b;if(f=d.nodeValue!==c)if(a=la,null!==a)switch(a.tag){case 3:jd(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&jd(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Da]=b,b.stateNode=d}W(b);return null;case 13:w(G);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(D&&
null!==fa&&0!==(b.mode&1)&&0===(b.flags&128)){for(f=fa;f;)f=Ka(f.nextSibling);Qb();b.flags|=98560;f=!1}else if(f=pd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!f)throw Error(n(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(n(317));f[Da]=b}else Qb(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;W(b);f=!1}else null!==wa&&(Gf(wa),wa=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&
d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(G.current&1)?0===L&&(L=3):Ef()));null!==b.updateQueue&&(b.flags|=4);W(b);return null;case 4:return Tb(),yi(a,b),null===a&&sc(b.stateNode.containerInfo),W(b),null;case 10:return af(b.type._context),W(b),null;case 17:return ea(b.type)&&(w(S),w(J)),W(b),null;case 19:w(G);f=b.memoizedState;if(null===f)return W(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dc(f,!1);else{if(0!==L||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=
yd(a);if(null!==g){b.flags|=128;Dc(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,
f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;y(G,G.current&1|2);return b.child}a=a.sibling}null!==f.tail&&P()>Hf&&(b.flags|=128,d=!0,Dc(f,!1),b.lanes=4194304)}else{if(!d)if(a=yd(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dc(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!D)return W(b),null}else 2*P()-f.renderingStartTime>Hf&&1073741824!==c&&(b.flags|=
128,d=!0,Dc(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=b,f.tail=b.sibling,f.renderingStartTime=P(),b.sibling=null,c=G.current,y(G,d?c&1|2:c&1),b;W(b);return null;case 22:case 23:return ba=Ga.current,w(Ga),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(ba&1073741824)&&(W(b),b.subtreeFlags&6&&(b.flags|=8192)):W(b),null;case 24:return null;
case 25:return null}throw Error(n(156,b.tag));}function Ck(a,b,c){Ve(b);switch(b.tag){case 1:return ea(b.type)&&(w(S),w(J)),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Tb(),w(S),w(J),lf(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return kf(b),null;case 13:w(G);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(n(340));Qb()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return w(G),null;case 4:return Tb(),
null;case 10:return af(b.type._context),null;case 22:case 23:return ba=Ga.current,w(Ga),null;case 24:return null;default:return null}}function Wb(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){H(a,b,d)}else c.current=null}function If(a,b,c){try{c()}catch(d){H(a,b,d)}}function Dk(a,b){Jf=Zc;a=ch();if(Ie(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();
if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(M){c=null;break a}var g=0,h=-1,k=-1,m=0,t=0,u=a,r=null;b:for(;;){for(var p;;){u!==c||0!==e&&3!==u.nodeType||(h=g+e);u!==f||0!==d&&3!==u.nodeType||(k=g+d);3===u.nodeType&&(g+=u.nodeValue.length);if(null===(p=u.firstChild))break;r=u;u=p}for(;;){if(u===a)break b;r===c&&++m===e&&(h=g);r===f&&++t===d&&(k=g);if(null!==(p=u.nextSibling))break;u=r;r=u.parentNode}u=p}c=-1===h||-1===k?null:
{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Kf={focusedElem:a,selectionRange:c};Zc=!1;for(l=b;null!==l;)if(b=l,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,l=a;else for(;null!==l;){b=l;try{var x=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;case 1:if(null!==x){var w=x.memoizedProps,z=x.memoizedState,A=b.stateNode,v=A.getSnapshotBeforeUpdate(b.elementType===b.type?w:xa(b.type,w),z);A.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var q=
b.stateNode.containerInfo;1===q.nodeType?q.textContent="":9===q.nodeType&&q.documentElement&&q.removeChild(q.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163));}}catch(M){H(b,b.return,M)}a=b.sibling;if(null!==a){a.return=b.return;l=a;break}l=b.return}x=Ai;Ai=!1;return x}function Gc(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&If(b,c,f)}e=e.next}while(e!==d)}}
function Id(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Lf(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Bi(a){var b=a.alternate;null!==b&&(a.alternate=null,Bi(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Da],delete b[uc],delete b[Me],delete b[Ek],
delete b[Fk]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Ci(a){return 5===a.tag||3===a.tag||4===a.tag}function Di(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Ci(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&
2))return a.stateNode}}function Mf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=kd));else if(4!==d&&(a=a.child,null!==a))for(Mf(a,b,c),a=a.sibling;null!==a;)Mf(a,b,c),a=a.sibling}function Nf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);
else if(4!==d&&(a=a.child,null!==a))for(Nf(a,b,c),a=a.sibling;null!==a;)Nf(a,b,c),a=a.sibling}function jb(a,b,c){for(c=c.child;null!==c;)Ei(a,b,c),c=c.sibling}function Ei(a,b,c){if(Ca&&"function"===typeof Ca.onCommitFiberUnmount)try{Ca.onCommitFiberUnmount(Uc,c)}catch(h){}switch(c.tag){case 5:X||Wb(c,b);case 6:var d=T,e=za;T=null;jb(a,b,c);T=d;za=e;null!==T&&(za?(a=T,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):T.removeChild(c.stateNode));break;case 18:null!==T&&(za?
(a=T,c=c.stateNode,8===a.nodeType?Re(a.parentNode,c):1===a.nodeType&&Re(a,c),nc(a)):Re(T,c.stateNode));break;case 4:d=T;e=za;T=c.stateNode.containerInfo;za=!0;jb(a,b,c);T=d;za=e;break;case 0:case 11:case 14:case 15:if(!X&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?If(c,b,g):0!==(f&4)&&If(c,b,g));e=e.next}while(e!==d)}jb(a,b,c);break;case 1:if(!X&&(Wb(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=
c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){H(c,b,h)}jb(a,b,c);break;case 21:jb(a,b,c);break;case 22:c.mode&1?(X=(d=X)||null!==c.memoizedState,jb(a,b,c),X=d):jb(a,b,c);break;default:jb(a,b,c)}}function Fi(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Gk);b.forEach(function(b){var d=Hk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}function Aa(a,b,c){c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=
c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:T=h.stateNode;za=!1;break a;case 3:T=h.stateNode.containerInfo;za=!0;break a;case 4:T=h.stateNode.containerInfo;za=!0;break a}h=h.return}if(null===T)throw Error(n(160));Ei(f,g,e);T=null;za=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(m){H(e,b,m)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)Gi(b,a),b=b.sibling}function Gi(a,b,c){var d=a.alternate;c=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:Aa(b,a);
Ha(a);if(c&4){try{Gc(3,a,a.return),Id(3,a)}catch(F){H(a,a.return,F)}try{Gc(5,a,a.return)}catch(F){H(a,a.return,F)}}break;case 1:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);break;case 5:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);if(a.flags&32){var e=a.stateNode;try{Fc(e,"")}catch(F){H(a,a.return,F)}}if(c&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==d?d.memoizedProps:f,h=a.type,k=a.updateQueue;a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&lg(e,f);
qe(h,g);var m=qe(h,f);for(g=0;g<k.length;g+=2){var t=k[g],u=k[g+1];"style"===t?sg(e,u):"dangerouslySetInnerHTML"===t?zi(e,u):"children"===t?Fc(e,u):$d(e,t,u,m)}switch(h){case "input":le(e,f);break;case "textarea":og(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var p=f.value;null!=p?Db(e,!!f.multiple,p,!1):r!==!!f.multiple&&(null!=f.defaultValue?Db(e,!!f.multiple,f.defaultValue,!0):Db(e,!!f.multiple,f.multiple?[]:"",!1))}e[uc]=f}catch(F){H(a,a.return,
F)}}break;case 6:Aa(b,a);Ha(a);if(c&4){if(null===a.stateNode)throw Error(n(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(F){H(a,a.return,F)}}break;case 3:Aa(b,a);Ha(a);if(c&4&&null!==d&&d.memoizedState.isDehydrated)try{nc(b.containerInfo)}catch(F){H(a,a.return,F)}break;case 4:Aa(b,a);Ha(a);break;case 13:Aa(b,a);Ha(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(Of=P()));c&4&&Fi(a);break;case 22:t=
null!==d&&null!==d.memoizedState;a.mode&1?(X=(m=X)||t,Aa(b,a),X=m):Aa(b,a);Ha(a);if(c&8192){m=null!==a.memoizedState;if((a.stateNode.isHidden=m)&&!t&&0!==(a.mode&1))for(l=a,t=a.child;null!==t;){for(u=l=t;null!==l;){r=l;p=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Gc(4,r,r.return);break;case 1:Wb(r,r.return);var x=r.stateNode;if("function"===typeof x.componentWillUnmount){c=r;b=r.return;try{d=c,x.props=d.memoizedProps,x.state=d.memoizedState,x.componentWillUnmount()}catch(F){H(c,b,F)}}break;
case 5:Wb(r,r.return);break;case 22:if(null!==r.memoizedState){Hi(u);continue}}null!==p?(p.return=r,l=p):Hi(u)}t=t.sibling}a:for(t=null,u=a;;){if(5===u.tag){if(null===t){t=u;try{e=u.stateNode,m?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=u.stateNode,k=u.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=rg("display",g))}catch(F){H(a,a.return,F)}}}else if(6===u.tag){if(null===t)try{u.stateNode.nodeValue=
m?"":u.memoizedProps}catch(F){H(a,a.return,F)}}else if((22!==u.tag&&23!==u.tag||null===u.memoizedState||u===a)&&null!==u.child){u.child.return=u;u=u.child;continue}if(u===a)break a;for(;null===u.sibling;){if(null===u.return||u.return===a)break a;t===u&&(t=null);u=u.return}t===u&&(t=null);u.sibling.return=u.return;u=u.sibling}}break;case 19:Aa(b,a);Ha(a);c&4&&Fi(a);break;case 21:break;default:Aa(b,a),Ha(a)}}function Ha(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Ci(c)){var d=c;
break a}c=c.return}throw Error(n(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(Fc(e,""),d.flags&=-33);var f=Di(a);Nf(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Di(a);Mf(a,h,g);break;default:throw Error(n(161));}}catch(k){H(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function Ik(a,b,c){l=a;Ii(a,b,c)}function Ii(a,b,c){for(var d=0!==(a.mode&1);null!==l;){var e=l,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jd;if(!g){var h=e.alternate,k=null!==h&&null!==
h.memoizedState||X;h=Jd;var m=X;Jd=g;if((X=k)&&!m)for(l=e;null!==l;)g=l,k=g.child,22===g.tag&&null!==g.memoizedState?Ji(e):null!==k?(k.return=g,l=k):Ji(e);for(;null!==f;)l=f,Ii(f,b,c),f=f.sibling;l=e;Jd=h;X=m}Ki(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,l=f):Ki(a,b,c)}}function Ki(a,b,c){for(;null!==l;){b=l;if(0!==(b.flags&8772)){c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:X||Id(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!X)if(null===c)d.componentDidMount();
else{var e=b.elementType===b.type?c.memoizedProps:xa(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&Fh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=b.child.stateNode;break;case 1:c=b.child.stateNode}Fh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&
c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var m=b.alternate;if(null!==m){var t=m.memoizedState;if(null!==t){var p=t.dehydrated;null!==p&&nc(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163));}X||b.flags&512&&Lf(b)}catch(r){H(b,b.return,r)}}if(b===a){l=null;break}c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Hi(a){for(;null!==l;){var b=l;if(b===
a){l=null;break}var c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Ji(a){for(;null!==l;){var b=l;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Id(4,b)}catch(k){H(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){H(b,e,k)}}var f=b.return;try{Lf(b)}catch(k){H(b,f,k)}break;case 5:var g=b.return;try{Lf(b)}catch(k){H(b,g,k)}}}catch(k){H(b,b.return,k)}if(b===a){l=null;break}var h=b.sibling;
if(null!==h){h.return=b.return;l=h;break}l=b.return}}function Hc(){Hf=P()+500}function Z(){return 0!==(p&6)?P():-1!==Kd?Kd:Kd=P()}function hb(a){if(0===(a.mode&1))return 1;if(0!==(p&2)&&0!==U)return U&-U;if(null!==Jk.transition)return 0===Ld&&(Ld=Dg()),Ld;a=z;if(0!==a)return a;a=window.event;a=void 0===a?16:Lg(a.type);return a}function ya(a,b,c,d){if(50<Ic)throw Ic=0,Pf=null,Error(n(185));ic(a,c,d);if(0===(p&2)||a!==O)a===O&&(0===(p&2)&&(Md|=c),4===L&&kb(a,U)),ia(a,d),1===c&&0===p&&0===(b.mode&1)&&
(Hc(),md&&db())}function ia(a,b){var c=a.callbackNode;uj(a,b);var d=Vc(a,a===O?U:0);if(0===d)null!==c&&Li(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Li(c);if(1===b)0===a.tag?kk(Mi.bind(null,a)):wh(Mi.bind(null,a)),Kk(function(){0===(p&6)&&db()}),c=null;else{switch(Eg(d)){case 1:c=De;break;case 4:c=Mg;break;case 16:c=ad;break;case 536870912:c=Ng;break;default:c=ad}c=Ni(c,Oi.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}function Oi(a,b){Kd=-1;
Ld=0;if(0!==(p&6))throw Error(n(327));var c=a.callbackNode;if(Xb()&&a.callbackNode!==c)return null;var d=Vc(a,a===O?U:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Nd(a,d);else{b=d;var e=p;p|=2;var f=Pi();if(O!==a||U!==b)Ra=null,Hc(),xb(a,b);do try{Lk();break}catch(h){Qi(a,h)}while(1);Ze();Od.current=f;p=e;null!==I?b=0:(O=null,U=0,b=L)}if(0!==b){2===b&&(e=ve(a),0!==e&&(d=e,b=Qf(a,e)));if(1===b)throw c=Jc,xb(a,0),kb(a,d),ia(a,P()),c;if(6===b)kb(a,d);else{e=a.current.alternate;
if(0===(d&30)&&!Mk(e)&&(b=Nd(a,d),2===b&&(f=ve(a),0!==f&&(d=f,b=Qf(a,f))),1===b))throw c=Jc,xb(a,0),kb(a,d),ia(a,P()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(n(345));case 2:yb(a,ja,Ra);break;case 3:kb(a,d);if((d&130023424)===d&&(b=Of+500-P(),10<b)){if(0!==Vc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){Z();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Rf(yb.bind(null,a,ja,Ra),b);break}yb(a,ja,Ra);break;case 4:kb(a,d);if((d&4194240)===d)break;b=a.eventTimes;
for(e=-1;0<d;){var g=31-ta(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=P()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*Nk(d/1960))-d;if(10<d){a.timeoutHandle=Rf(yb.bind(null,a,ja,Ra),d);break}yb(a,ja,Ra);break;case 5:yb(a,ja,Ra);break;default:throw Error(n(329));}}}ia(a,P());return a.callbackNode===c?Oi.bind(null,a):null}function Qf(a,b){var c=Kc;a.current.memoizedState.isDehydrated&&(xb(a,b).flags|=256);a=Nd(a,b);2!==a&&(b=ja,ja=c,null!==b&&Gf(b));return a}function Gf(a){null===
ja?ja=a:ja.push.apply(ja,a)}function Mk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!ua(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}function kb(a,b){b&=~Sf;b&=~Md;a.suspendedLanes|=b;a.pingedLanes&=
~b;for(a=a.expirationTimes;0<b;){var c=31-ta(b),d=1<<c;a[c]=-1;b&=~d}}function Mi(a){if(0!==(p&6))throw Error(n(327));Xb();var b=Vc(a,0);if(0===(b&1))return ia(a,P()),null;var c=Nd(a,b);if(0!==a.tag&&2===c){var d=ve(a);0!==d&&(b=d,c=Qf(a,d))}if(1===c)throw c=Jc,xb(a,0),kb(a,b),ia(a,P()),c;if(6===c)throw Error(n(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;yb(a,ja,Ra);ia(a,P());return null}function Tf(a,b){var c=p;p|=1;try{return a(b)}finally{p=c,0===p&&(Hc(),md&&db())}}function zb(a){null!==
lb&&0===lb.tag&&0===(p&6)&&Xb();var b=p;p|=1;var c=ca.transition,d=z;try{if(ca.transition=null,z=1,a)return a()}finally{z=d,ca.transition=c,p=b,0===(p&6)&&db()}}function xb(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Ok(c));if(null!==I)for(c=I.return;null!==c;){var d=c;Ve(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&(w(S),w(J));break;case 3:Tb();w(S);w(J);lf();break;case 5:kf(d);break;case 4:Tb();break;case 13:w(G);break;
case 19:w(G);break;case 10:af(d.type._context);break;case 22:case 23:ba=Ga.current,w(Ga)}c=c.return}O=a;I=a=gb(a.current,null);U=ba=b;L=0;Jc=null;Sf=Md=ra=0;ja=Kc=null;if(null!==tb){for(b=0;b<tb.length;b++)if(c=tb[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}tb=null}return a}function Qi(a,b){do{var c=I;try{Ze();zd.current=Ad;if(Bd){for(var d=C.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Bd=
!1}wb=0;N=K=C=null;zc=!1;Ac=0;Uf.current=null;if(null===c||null===c.return){L=1;Jc=b;I=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var m=k,l=h,p=l.tag;if(0===(l.mode&1)&&(0===p||11===p||15===p)){var r=l.alternate;r?(l.updateQueue=r.updateQueue,l.memoizedState=r.memoizedState,l.lanes=r.lanes):(l.updateQueue=null,l.memoizedState=null)}var w=ki(g);if(null!==w){w.flags&=-257;li(w,g,h,f,b);w.mode&1&&ji(f,m,b);b=w;k=m;var x=b.updateQueue;
if(null===x){var z=new Set;z.add(k);b.updateQueue=z}else x.add(k);break a}else{if(0===(b&1)){ji(f,m,b);Ef();break a}k=Error(n(426))}}else if(D&&h.mode&1){var y=ki(g);if(null!==y){0===(y.flags&65536)&&(y.flags|=256);li(y,g,h,f,b);Ye(Ub(k,h));break a}}f=k=Ub(k,h);4!==L&&(L=2);null===Kc?Kc=[f]:Kc.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;b&=-b;f.lanes|=b;var A=hi(f,k,b);Eh(f,A);break a;case 1:h=k;var v=f.type,q=f.stateNode;if(0===(f.flags&128)&&("function"===typeof v.getDerivedStateFromError||
null!==q&&"function"===typeof q.componentDidCatch&&(null===ib||!ib.has(q)))){f.flags|=65536;b&=-b;f.lanes|=b;var B=ii(f,h,b);Eh(f,B);break a}}f=f.return}while(null!==f)}Ri(c)}catch(ma){b=ma;I===c&&null!==c&&(I=c=c.return);continue}break}while(1)}function Pi(){var a=Od.current;Od.current=Ad;return null===a?Ad:a}function Ef(){if(0===L||3===L||2===L)L=4;null===O||0===(ra&268435455)&&0===(Md&268435455)||kb(O,U)}function Nd(a,b){var c=p;p|=2;var d=Pi();if(O!==a||U!==b)Ra=null,xb(a,b);do try{Pk();break}catch(e){Qi(a,
e)}while(1);Ze();p=c;Od.current=d;if(null!==I)throw Error(n(261));O=null;U=0;return L}function Pk(){for(;null!==I;)Si(I)}function Lk(){for(;null!==I&&!Qk();)Si(I)}function Si(a){var b=Rk(a.alternate,a,ba);a.memoizedProps=a.pendingProps;null===b?Ri(a):I=b;Uf.current=null}function Ri(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=yk(c,b,ba),null!==c){I=c;return}}else{c=Ck(c,b);if(null!==c){c.flags&=32767;I=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;
else{L=6;I=null;return}}b=b.sibling;if(null!==b){I=b;return}I=b=a}while(null!==b);0===L&&(L=5)}function yb(a,b,c){var d=z,e=ca.transition;try{ca.transition=null,z=1,Sk(a,b,c,d)}finally{ca.transition=e,z=d}return null}function Sk(a,b,c,d){do Xb();while(null!==lb);if(0!==(p&6))throw Error(n(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(n(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;
vj(a,f);a===O&&(I=O=null,U=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Pd||(Pd=!0,Ni(ad,function(){Xb();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ca.transition;ca.transition=null;var g=z;z=1;var h=p;p|=4;Uf.current=null;Dk(a,c);Gi(c,a);Uj(Kf);Zc=!!Jf;Kf=Jf=null;a.current=c;Ik(c,a,e);Tk();p=h;z=g;ca.transition=f}else a.current=c;Pd&&(Pd=!1,lb=a,Qd=e);f=a.pendingLanes;0===f&&(ib=null);pj(c.stateNode,d);ia(a,P());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=
b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Ed)throw Ed=!1,a=xf,xf=null,a;0!==(Qd&1)&&0!==a.tag&&Xb();f=a.pendingLanes;0!==(f&1)?a===Pf?Ic++:(Ic=0,Pf=a):Ic=0;db();return null}function Xb(){if(null!==lb){var a=Eg(Qd),b=ca.transition,c=z;try{ca.transition=null;z=16>a?16:a;if(null===lb)var d=!1;else{a=lb;lb=null;Qd=0;if(0!==(p&6))throw Error(n(331));var e=p;p|=4;for(l=a.current;null!==l;){var f=l,g=f.child;if(0!==(l.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var m=
h[k];for(l=m;null!==l;){var t=l;switch(t.tag){case 0:case 11:case 15:Gc(8,t,f)}var u=t.child;if(null!==u)u.return=t,l=u;else for(;null!==l;){t=l;var r=t.sibling,w=t.return;Bi(t);if(t===m){l=null;break}if(null!==r){r.return=w;l=r;break}l=w}}}var x=f.alternate;if(null!==x){var y=x.child;if(null!==y){x.child=null;do{var C=y.sibling;y.sibling=null;y=C}while(null!==y)}}l=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,l=g;else b:for(;null!==l;){f=l;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Gc(9,
f,f.return)}var A=f.sibling;if(null!==A){A.return=f.return;l=A;break b}l=f.return}}var v=a.current;for(l=v;null!==l;){g=l;var q=g.child;if(0!==(g.subtreeFlags&2064)&&null!==q)q.return=g,l=q;else b:for(g=v;null!==l;){h=l;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Id(9,h)}}catch(ma){H(h,h.return,ma)}if(h===g){l=null;break b}var B=h.sibling;if(null!==B){B.return=h.return;l=B;break b}l=h.return}}p=e;db();if(Ca&&"function"===typeof Ca.onPostCommitFiberRoot)try{Ca.onPostCommitFiberRoot(Uc,
a)}catch(ma){}d=!0}return d}finally{z=c,ca.transition=b}}return!1}function Ti(a,b,c){b=Ub(c,b);b=hi(a,b,1);a=eb(a,b,1);b=Z();null!==a&&(ic(a,1,b),ia(a,b))}function H(a,b,c){if(3===a.tag)Ti(a,a,c);else for(;null!==b;){if(3===b.tag){Ti(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===ib||!ib.has(d))){a=Ub(c,a);a=ii(b,a,1);b=eb(b,a,1);a=Z();null!==b&&(ic(b,1,a),ia(b,a));break}}b=b.return}}function tk(a,
b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Z();a.pingedLanes|=a.suspendedLanes&c;O===a&&(U&c)===c&&(4===L||3===L&&(U&130023424)===U&&500>P()-Of?xb(a,0):Sf|=c);ia(a,b)}function Ui(a,b){0===b&&(0===(a.mode&1)?b=1:(b=Rd,Rd<<=1,0===(Rd&130023424)&&(Rd=4194304)));var c=Z();a=Oa(a,b);null!==a&&(ic(a,b,c),ia(a,c))}function wk(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Ui(a,c)}function Hk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);
break;case 19:d=a.stateNode;break;default:throw Error(n(314));}null!==d&&d.delete(b);Ui(a,c)}function Ni(a,b){return xh(a,b)}function Uk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function yf(a){a=
a.prototype;return!(!a||!a.isReactComponent)}function Vk(a){if("function"===typeof a)return yf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ie)return 11;if(a===je)return 14}return 2}function gb(a,b){var c=a.alternate;null===c?(c=pa(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=
a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function wd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)yf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Bb:return ub(c.children,e,f,b);case fe:g=8;e|=8;break;case ee:return a=pa(12,c,b,e|2),a.elementType=ee,a.lanes=f,a;case ge:return a=
pa(13,c,b,e),a.elementType=ge,a.lanes=f,a;case he:return a=pa(19,c,b,e),a.elementType=he,a.lanes=f,a;case Vi:return Gd(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case hg:g=10;break a;case gg:g=9;break a;case ie:g=11;break a;case je:g=14;break a;case Ta:g=16;d=null;break a}throw Error(n(130,null==a?a:typeof a,""));}b=pa(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function ub(a,b,c,d){a=pa(7,a,d,b);a.lanes=c;return a}function Gd(a,b,c,d){a=pa(22,a,d,b);a.elementType=
Vi;a.lanes=c;a.stateNode={isHidden:!1};return a}function gf(a,b,c){a=pa(6,a,null,b);a.lanes=c;return a}function hf(a,b,c){b=pa(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Wk(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=
0;this.eventTimes=we(0);this.expirationTimes=we(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=we(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=null}function Vf(a,b,c,d,e,f,g,h,k,m){a=new Wk(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=pa(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,
pendingSuspenseBoundaries:null};df(f);return a}function Xk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Cb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}function Wi(a){if(!a)return cb;a=a._reactInternals;a:{if(ob(a)!==a||1!==a.tag)throw Error(n(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(ea(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(n(171));
}if(1===a.tag){var c=a.type;if(ea(c))return uh(a,c,b)}return b}function Xi(a,b,c,d,e,f,g,h,k,m){a=Vf(c,d,!0,a,e,f,g,h,k);a.context=Wi(null);c=a.current;d=Z();e=hb(c);f=Pa(d,e);f.callback=void 0!==b&&null!==b?b:null;eb(c,f,e);a.current.lanes=e;ic(a,e,d);ia(a,d);return a}function Sd(a,b,c,d){var e=b.current,f=Z(),g=hb(e);c=Wi(c);null===b.context?b.context=c:b.pendingContext=c;b=Pa(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=eb(e,b,g);null!==a&&(ya(a,e,g,f),sd(a,e,g));return g}
function Td(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Yi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function Wf(a,b){Yi(a,b);(a=a.alternate)&&Yi(a,b)}function Yk(a){a=Bg(a);return null===a?null:a.stateNode}function Zk(a){return null}function Xf(a){this._internalRoot=a}function Ud(a){this._internalRoot=a}function Yf(a){return!(!a||1!==a.nodeType&&9!==
a.nodeType&&11!==a.nodeType)}function Vd(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Zi(){}function $k(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=Td(g);f.call(a)}}var g=Xi(b,d,a,0,null,!1,!1,"",Zi);a._reactRootContainer=g;a[Ja]=g.current;sc(8===a.nodeType?a.parentNode:a);zb();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=Td(k);
h.call(a)}}var k=Vf(a,0,!1,null,null,!1,!1,"",Zi);a._reactRootContainer=k;a[Ja]=k.current;sc(8===a.nodeType?a.parentNode:a);zb(function(){Sd(b,k,c,d)});return k}function Wd(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=Td(g);h.call(a)}}Sd(b,g,a,e)}else g=$k(c,b,a,e,d);return Td(g)}var cg=new Set,$b={},Ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Zd=Object.prototype.hasOwnProperty,
dj=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,eg={},dg={},R={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){R[a]=
new Y(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];R[b]=new Y(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){R[a]=new Y(a,2,!1,a.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){R[a]=new Y(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){R[a]=
new Y(a,3,!1,a.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(a){R[a]=new Y(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){R[a]=new Y(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){R[a]=new Y(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){R[a]=new Y(a,5,!1,a.toLowerCase(),null,!1,!1)});var Zf=/[\-:]([a-z])/g,$f=function(a){return a[1].toUpperCase()};"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=
a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!1,!1)});R.xlinkHref=new Y("xlinkHref",
1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!0,!0)});var Sa=mb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,xd=Symbol.for("react.element"),Cb=Symbol.for("react.portal"),Bb=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),hg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),
he=Symbol.for("react.suspense_list"),je=Symbol.for("react.memo"),Ta=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Vi=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var fg=Symbol.iterator,E=Object.assign,ae,ce=!1,cc=Array.isArray,Xd,zi=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,
c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{Xd=Xd||document.createElement("div");Xd.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Xd.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}}),Fc=function(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b},dc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,
borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,
strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},al=["Webkit","ms","Moz","O"];Object.keys(dc).forEach(function(a){al.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dc[b]=dc[a]})});var jj=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),ze=null,se=null,Eb=null,Fb=null,xg=function(a,b){return a(b)},yg=function(){},te=!1,Oe=!1;if(Ia)try{var Lc={};Object.defineProperty(Lc,
"passive",{get:function(){Oe=!0}});window.addEventListener("test",Lc,Lc);window.removeEventListener("test",Lc,Lc)}catch(a){Oe=!1}var lj=function(a,b,c,d,e,f,g,h,k){var m=Array.prototype.slice.call(arguments,3);try{b.apply(c,m)}catch(t){this.onError(t)}},gc=!1,Sc=null,Tc=!1,ue=null,mj={onError:function(a){gc=!0;Sc=a}},Ba=mb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,Jg=Ba.unstable_scheduleCallback,Kg=Ba.unstable_NormalPriority,xh=Jg,Li=Ba.unstable_cancelCallback,Qk=Ba.unstable_shouldYield,
Tk=Ba.unstable_requestPaint,P=Ba.unstable_now,Ej=Ba.unstable_getCurrentPriorityLevel,De=Ba.unstable_ImmediatePriority,Mg=Ba.unstable_UserBlockingPriority,ad=Kg,Fj=Ba.unstable_LowPriority,Ng=Ba.unstable_IdlePriority,Uc=null,Ca=null,ta=Math.clz32?Math.clz32:qj,rj=Math.log,sj=Math.LN2,Wc=64,Rd=4194304,z=0,Ae=!1,Yc=[],Va=null,Wa=null,Xa=null,jc=new Map,kc=new Map,Ya=[],Cj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
Gb=Sa.ReactCurrentBatchConfig,Zc=!0,$c=null,Za=null,Ee=null,bd=null,Yb={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},He=ka(Yb),Mc=E({},Yb,{view:0,detail:0}),bk=ka(Mc),ag,bg,Nc,Yd=E({},Mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:
a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==Nc&&(Nc&&"mousemove"===a.type?(ag=a.screenX-Nc.screenX,bg=a.screenY-Nc.screenY):bg=ag=0,Nc=a);return ag},movementY:function(a){return"movementY"in a?a.movementY:bg}}),ih=ka(Yd),bl=E({},Yd,{dataTransfer:0}),Xj=ka(bl),cl=E({},Mc,{relatedTarget:0}),Pe=ka(cl),dl=E({},Yb,{animationName:0,elapsedTime:0,pseudoElement:0}),Zj=ka(dl),el=E({},Yb,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),
dk=ka(el),fl=E({},Yb,{data:0}),qh=ka(fl),gk=qh,gl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",
112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},il=E({},Mc,{key:function(a){if(a.key){var b=gl[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=cd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?hl[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,
metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(a){return"keypress"===a.type?cd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?cd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Wj=ka(il),jl=E({},Yd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nh=ka(jl),kl=E({},Mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,
ctrlKey:0,shiftKey:0,getModifierState:Fe}),Yj=ka(kl),ll=E({},Yb,{propertyName:0,elapsedTime:0,pseudoElement:0}),ak=ka(ll),ml=E({},Yd,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),ck=ka(ml),Ij=[9,13,27,32],Ge=Ia&&"CompositionEvent"in window,Oc=null;Ia&&"documentMode"in document&&(Oc=document.documentMode);var fk=Ia&&"TextEvent"in
window&&!Oc,Ug=Ia&&(!Ge||Oc&&8<Oc&&11>=Oc),Tg=String.fromCharCode(32),Sg=!1,Hb=!1,Lj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},oc=null,pc=null,ph=!1;Ia&&(ph=Mj("input")&&(!document.documentMode||9<document.documentMode));var ua="function"===typeof Object.is?Object.is:Tj,ek=Ia&&"documentMode"in document&&11>=document.documentMode,Jb=null,Ke=null,rc=null,Je=!1,Kb={animationend:gd("Animation","AnimationEnd"),
animationiteration:gd("Animation","AnimationIteration"),animationstart:gd("Animation","AnimationStart"),transitionend:gd("Transition","TransitionEnd")},Le={},eh={};Ia&&(eh=document.createElement("div").style,"AnimationEvent"in window||(delete Kb.animationend.animation,delete Kb.animationiteration.animation,delete Kb.animationstart.animation),"TransitionEvent"in window||delete Kb.transitionend.transition);var jh=hd("animationend"),kh=hd("animationiteration"),lh=hd("animationstart"),mh=hd("transitionend"),
fh=new Map,$i="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
(function(){for(var a=0;a<$i.length;a++){var b=$i[a],c=b.toLowerCase();b=b[0].toUpperCase()+b.slice(1);$a(c,"on"+b)}$a(jh,"onAnimationEnd");$a(kh,"onAnimationIteration");$a(lh,"onAnimationStart");$a("dblclick","onDoubleClick");$a("focusin","onFocus");$a("focusout","onBlur");$a(mh,"onTransitionEnd")})();Ab("onMouseEnter",["mouseout","mouseover"]);Ab("onMouseLeave",["mouseout","mouseover"]);Ab("onPointerEnter",["pointerout","pointerover"]);Ab("onPointerLeave",["pointerout","pointerover"]);nb("onChange",
"change click focusin focusout input keydown keyup selectionchange".split(" "));nb("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));nb("onBeforeInput",["compositionend","keypress","textInput","paste"]);nb("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));nb("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));nb("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ec)),id="_reactListening"+Math.random().toString(36).slice(2),hk=/\r\n?/g,ik=/\u0000|\uFFFD/g,Jf=null,Kf=null,Rf="function"===typeof setTimeout?setTimeout:void 0,Ok="function"===typeof clearTimeout?
clearTimeout:void 0,aj="function"===typeof Promise?Promise:void 0,Kk="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof aj?function(a){return aj.resolve(null).then(a).catch(jk)}:Rf,Zb=Math.random().toString(36).slice(2),Da="__reactFiber$"+Zb,uc="__reactProps$"+Zb,Ja="__reactContainer$"+Zb,Me="__reactEvents$"+Zb,Ek="__reactListeners$"+Zb,Fk="__reactHandles$"+Zb,Se=[],Mb=-1,cb={},J=bb(cb),S=bb(!1),qb=cb,La=null,md=!1,Te=!1,Ob=[],Pb=0,od=null,nd=0,na=[],oa=0,sb=null,Ma=1,Na="",la=
null,fa=null,D=!1,wa=null,Jk=Sa.ReactCurrentBatchConfig,rd=bb(null),qd=null,Rb=null,$e=null,tb=null,lk=Oa,fb=!1,Jh=(new mb.Component).refs,ud={isMounted:function(a){return(a=a._reactInternals)?ob(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=eb(a,f,e);null!==b&&(ya(b,a,e,d),sd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==
c&&(f.callback=c);b=eb(a,f,e);null!==b&&(ya(b,a,e,d),sd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Z(),d=hb(a),e=Pa(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=eb(a,e,d);null!==b&&(ya(b,a,d,c),sd(b,a,d))}},Vb=Lh(!0),mi=Lh(!1),wc={},Ea=bb(wc),yc=bb(wc),xc=bb(wc),G=bb(0),mf=[],zd=Sa.ReactCurrentDispatcher,uf=Sa.ReactCurrentBatchConfig,wb=0,C=null,K=null,N=null,Bd=!1,zc=!1,Ac=0,nl=0,Ad={readContext:qa,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useInsertionEffect:V,
useLayoutEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,useMutableSource:V,useSyncExternalStore:V,useId:V,unstable_isNewReconciler:!1},mk={readContext:qa,useCallback:function(a,b){Fa().memoizedState=[a,void 0===b?null:b];return a},useContext:qa,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Cd(4194308,4,Zh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Cd(4194308,4,a,b)},useInsertionEffect:function(a,
b){return Cd(4,2,a,b)},useMemo:function(a,b){var c=Fa();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Fa();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=rk.bind(null,C,a);return[d.memoizedState,a]},useRef:function(a){var b=Fa();a={current:a};return b.memoizedState=a},useState:Uh,useDebugValue:tf,useDeferredValue:function(a){return Fa().memoizedState=
a},useTransition:function(){var a=Uh(!1),b=a[0];a=qk.bind(null,a[1]);Fa().memoizedState=a;return[b,a]},useMutableSource:function(a,b,c){},useSyncExternalStore:function(a,b,c){var d=C,e=Fa();if(D){if(void 0===c)throw Error(n(407));c=c()}else{c=b();if(null===O)throw Error(n(349));0!==(wb&30)||Rh(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;Wh(Ph.bind(null,d,f,a),[a]);d.flags|=2048;Cc(9,Qh.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Fa(),b=O.identifierPrefix;
if(D){var c=Na;var d=Ma;c=(d&~(1<<32-ta(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Ac++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=nl++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},nk={readContext:qa,useCallback:ai,useContext:qa,useEffect:sf,useImperativeHandle:$h,useInsertionEffect:Xh,useLayoutEffect:Yh,useMemo:bi,useReducer:qf,useRef:Vh,useState:function(a){return qf(Bc)},useDebugValue:tf,useDeferredValue:function(a){var b=sa();return ci(b,K.memoizedState,a)},
useTransition:function(){var a=qf(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Nh,useSyncExternalStore:Oh,useId:di,unstable_isNewReconciler:!1},ok={readContext:qa,useCallback:ai,useContext:qa,useEffect:sf,useImperativeHandle:$h,useInsertionEffect:Xh,useLayoutEffect:Yh,useMemo:bi,useReducer:rf,useRef:Vh,useState:function(a){return rf(Bc)},useDebugValue:tf,useDeferredValue:function(a){var b=sa();return null===K?b.memoizedState=a:ci(b,K.memoizedState,a)},useTransition:function(){var a=rf(Bc)[0],
b=sa().memoizedState;return[a,b]},useMutableSource:Nh,useSyncExternalStore:Oh,useId:di,unstable_isNewReconciler:!1},sk="function"===typeof WeakMap?WeakMap:Map,uk=Sa.ReactCurrentOwner,ha=!1,Cf={dehydrated:null,treeContext:null,retryLane:0};var Ak=function(a,b,c,d){for(c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=
c.return;c=c.sibling}};var yi=function(a,b){};var zk=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){a=b.stateNode;vb(Ea.current);e=null;switch(c){case "input":f=ke(a,f);d=ke(a,d);e=[];break;case "select":f=E({},f,{value:void 0});d=E({},d,{value:void 0});e=[];break;case "textarea":f=ne(a,f);d=ne(a,d);e=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(a.onclick=kd)}pe(c,d);var g;c=null;for(m in f)if(!d.hasOwnProperty(m)&&f.hasOwnProperty(m)&&null!=f[m])if("style"===
m){var h=f[m];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==m&&"children"!==m&&"suppressContentEditableWarning"!==m&&"suppressHydrationWarning"!==m&&"autoFocus"!==m&&($b.hasOwnProperty(m)?e||(e=[]):(e=e||[]).push(m,null));for(m in d){var k=d[m];h=null!=f?f[m]:void 0;if(d.hasOwnProperty(m)&&k!==h&&(null!=k||null!=h))if("style"===m)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(e||(e=[]),e.push(m,c)),c=k;else"dangerouslySetInnerHTML"===m?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(e=e||[]).push(m,k)):"children"===m?"string"!==typeof k&&"number"!==typeof k||(e=e||[]).push(m,""+k):"suppressContentEditableWarning"!==m&&"suppressHydrationWarning"!==m&&($b.hasOwnProperty(m)?(null!=k&&"onScroll"===m&&B("scroll",a),e||h===k||(e=[])):(e=e||[]).push(m,k))}c&&(e=e||[]).push("style",c);var m=e;if(b.updateQueue=m)b.flags|=4}};var Bk=function(a,
b,c,d){c!==d&&(b.flags|=4)};var Jd=!1,X=!1,Gk="function"===typeof WeakSet?WeakSet:Set,l=null,Ai=!1,T=null,za=!1,Nk=Math.ceil,Od=Sa.ReactCurrentDispatcher,Uf=Sa.ReactCurrentOwner,ca=Sa.ReactCurrentBatchConfig,p=0,O=null,I=null,U=0,ba=0,Ga=bb(0),L=0,Jc=null,ra=0,Md=0,Sf=0,Kc=null,ja=null,Of=0,Hf=Infinity,Ra=null,Ed=!1,xf=null,ib=null,Pd=!1,lb=null,Qd=0,Ic=0,Pf=null,Kd=-1,Ld=0;var Rk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||S.current)ha=!0;else{if(0===(a.lanes&c)&&0===(b.flags&
128))return ha=!1,xk(a,b,c);ha=0!==(a.flags&131072)?!0:!1}else ha=!1,D&&0!==(b.flags&1048576)&&yh(b,nd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;Fd(a,b);a=b.pendingProps;var e=Nb(b,J.current);Sb(b,c);e=of(null,b,d,a,e,c);var f=pf();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,ea(d)?(f=!0,ld(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,df(b),e.updater=ud,b.stateNode=
e,e._reactInternals=b,ff(b,d,a,c),b=Af(null,b,d,!0,f,c)):(b.tag=0,D&&f&&Ue(b),aa(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{Fd(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Vk(d);a=xa(d,a);switch(e){case 0:b=zf(null,b,d,a,c);break a;case 1:b=si(null,b,d,a,c);break a;case 11:b=ni(null,b,d,a,c);break a;case 14:b=oi(null,b,d,xa(d.type,a),c);break a}throw Error(n(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:xa(d,e),zf(a,b,d,e,c);
case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:xa(d,e),si(a,b,d,e,c);case 3:a:{ti(b);if(null===a)throw Error(n(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Dh(a,b);td(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Ub(Error(n(423)),b);b=ui(a,b,d,c,e);break a}else if(d!==e){e=
Ub(Error(n(424)),b);b=ui(a,b,d,c,e);break a}else for(fa=Ka(b.stateNode.containerInfo.firstChild),la=b,D=!0,wa=null,c=mi(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Qb();if(d===e){b=Qa(a,b,c);break a}aa(a,b,d,c)}b=b.child}return b;case 5:return Mh(b),null===a&&Xe(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Qe(d,e)?g=null:null!==f&&Qe(d,f)&&(b.flags|=32),ri(a,b),aa(a,b,g,c),b.child;case 6:return null===a&&Xe(b),null;case 13:return vi(a,b,c);case 4:return jf(b,
b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Vb(b,null,d,c):aa(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:xa(d,e),ni(a,b,d,e,c);case 7:return aa(a,b,b.pendingProps,c),b.child;case 8:return aa(a,b,b.pendingProps.children,c),b.child;case 12:return aa(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;y(rd,d._currentValue);d._currentValue=g;if(null!==f)if(ua(f.value,g)){if(f.children===
e.children&&!S.current){b=Qa(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Pa(-1,c&-c);k.tag=2;var m=f.updateQueue;if(null!==m){m=m.shared;var l=m.pending;null===l?k.next=k:(k.next=l.next,l.next=k);m.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bf(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===
f.tag){g=f.return;if(null===g)throw Error(n(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bf(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}aa(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Sb(b,c),e=qa(e),d=d(e),b.flags|=1,aa(a,b,d,c),b.child;case 14:return d=b.type,e=xa(d,b.pendingProps),e=xa(d.type,e),oi(a,b,d,e,c);case 15:return pi(a,
b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:xa(d,e),Fd(a,b),b.tag=1,ea(d)?(a=!0,ld(b)):a=!1,Sb(b,c),Hh(b,d,e),ff(b,d,e,c),Af(null,b,d,!0,a,c);case 19:return xi(a,b,c);case 22:return qi(a,b,c)}throw Error(n(156,b.tag));};var pa=function(a,b,c,d){return new Uk(a,b,c,d)},bj="function"===typeof reportError?reportError:function(a){console.error(a)};Ud.prototype.render=Xf.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(n(409));
Sd(a,b,null,null)};Ud.prototype.unmount=Xf.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;zb(function(){Sd(null,a,null,null)});b[Ja]=null}};Ud.prototype.unstable_scheduleHydration=function(a){if(a){var b=ol();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Ya.length&&0!==b&&b<Ya[c].priority;c++);Ya.splice(c,0,a);0===c&&Hg(a)}};var Dj=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=
hc(b.pendingLanes);0!==c&&(xe(b,c|1),ia(b,P()),0===(p&6)&&(Hc(),db()))}break;case 13:zb(function(){var b=Oa(a,1);if(null!==b){var c=Z();ya(b,a,1,c)}}),Wf(a,1)}};var Gg=function(a){if(13===a.tag){var b=Oa(a,134217728);if(null!==b){var c=Z();ya(b,a,134217728,c)}Wf(a,134217728)}};var yj=function(a){if(13===a.tag){var b=hb(a),c=Oa(a,b);if(null!==c){var d=Z();ya(c,a,b,d)}Wf(a,b)}};var ol=function(){return z};var xj=function(a,b){var c=z;try{return z=a,b()}finally{z=c}};se=function(a,b,c){switch(b){case "input":le(a,
c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Rc(d);if(!e)throw Error(n(90));jg(d);le(d,e)}}}break;case "textarea":og(a,c);break;case "select":b=c.value,null!=b&&Db(a,!!c.multiple,b,!1)}};(function(a,b,c){xg=a;yg=c})(Tf,function(a,b,c,d,e){var f=z,g=ca.transition;try{return ca.transition=null,z=1,a(b,c,d,e)}finally{z=f,ca.transition=
g,0===p&&Hc()}},zb);var pl={usingClientEntryPoint:!1,Events:[ec,Ib,Rc,ug,vg,Tf]};(function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sa.ReactCurrentDispatcher,findHostInstanceByFiber:Yk,
findFiberByHostInstance:a.findFiberByHostInstance||Zk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Uc=b.inject(a),Ca=b}catch(c){}a=b.checkDCE?!0:!1}}return a})({findFiberByHostInstance:pb,bundleType:0,version:"18.2.0-next-9e3b772b8-20220608",
rendererPackageName:"react-dom"});Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pl;Q.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yf(b))throw Error(n(200));return Xk(a,b,null,c)};Q.createRoot=function(a,b){if(!Yf(a))throw Error(n(299));var c=!1,d="",e=bj;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=Vf(a,1,!1,null,null,
c,!1,d,e);a[Ja]=b.current;sc(8===a.nodeType?a.parentNode:a);return new Xf(b)};Q.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(n(188));a=Object.keys(a).join(",");throw Error(n(268,a));}a=Bg(b);a=null===a?null:a.stateNode;return a};Q.flushSync=function(a){return zb(a)};Q.hydrate=function(a,b,c){if(!Vd(b))throw Error(n(200));return Wd(null,a,b,!0,c)};Q.hydrateRoot=function(a,b,c){if(!Yf(a))throw Error(n(405));
var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=bj;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=Xi(b,null,a,1,null!=c?c:null,e,!1,f,g);a[Ja]=b.current;sc(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,e);return new Ud(b)};Q.render=
function(a,b,c){if(!Vd(b))throw Error(n(200));return Wd(null,a,b,!1,c)};Q.unmountComponentAtNode=function(a){if(!Vd(a))throw Error(n(40));return a._reactRootContainer?(zb(function(){Wd(null,null,a,!1,function(){a._reactRootContainer=null;a[Ja]=null})}),!0):!1};Q.unstable_batchedUpdates=Tf;Q.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!Vd(c))throw Error(n(200));if(null==a||void 0===a._reactInternals)throw Error(n(38));return Wd(a,b,c,!1,d)};Q.version="18.2.0-next-9e3b772b8-20220608"});
})();


/**
 * @license lucide v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

(function(a,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(a=typeof globalThis<"u"?globalThis:a||self,n(a.lucide={}))})(this,function(a){"use strict";const n=(t,d,c=[])=>{const e=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(d).forEach(M=>{e.setAttribute(M,String(d[M]))}),c.length&&c.forEach(M=>{const l=n(...M);e.appendChild(l)}),e};var $0=([t,d,c])=>n(t,d,c);const Vy=t=>Array.from(t.attributes).reduce((d,c)=>(d[c.name]=c.value,d),{}),Sy=t=>typeof t=="string"?t:!t||!t.class?"":t.class&&typeof t.class=="string"?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"",Ay=t=>t.flatMap(Sy).map(d=>d.trim()).filter(Boolean).filter((d,c,e)=>e.indexOf(d)===c).join(" "),Ly=t=>t.replace(/(\w)(\w*)(_|-|\s*)/g,(d,c,e)=>c.toUpperCase()+e.toLowerCase()),m0=(t,{nameAttr:d,icons:c,attrs:e})=>{const M=t.getAttribute(d);if(M==null)return;const l=Ly(M),uy=c[l];if(!uy)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const Cy=Vy(t),[ky,Py,By]=uy,Hy={...Py,"data-lucide":M,...e,...Cy},wy=Ay(["lucide",`lucide-${M}`,Cy,e]);wy&&Object.assign(Hy,{class:wy});const Fy=$0([ky,Hy,By]);return t.parentNode?.replaceChild(Fy,t)},h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},u0=["svg",h,[["path",{d:"M3.5 13h6"}],["path",{d:"m2 16 4.5-9 4.5 9"}],["path",{d:"M18 7v9"}],["path",{d:"m14 12 4 4 4-4"}]]],C0=["svg",h,[["path",{d:"M3.5 13h6"}],["path",{d:"m2 16 4.5-9 4.5 9"}],["path",{d:"M18 16V7"}],["path",{d:"m14 11 4-4 4 4"}]]],H0=["svg",h,[["path",{d:"M21 14h-5"}],["path",{d:"M16 16v-3.5a2.5 2.5 0 0 1 5 0V16"}],["path",{d:"M4.5 13h6"}],["path",{d:"m3 16 4.5-9 4.5 9"}]]],w0=["svg",h,[["circle",{cx:"16",cy:"4",r:"1"}],["path",{d:"m18 19 1-7-6 1"}],["path",{d:"m5 8 3-3 5.5 3-2.36 3.5"}],["path",{d:"M4.24 14.5a5 5 0 0 0 6.88 6"}],["path",{d:"M13.76 17.5a5 5 0 0 0-6.88-6"}]]],V0=["svg",h,[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]]],S0=["svg",h,[["path",{d:"M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 8h12"}],["path",{d:"M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"}],["path",{d:"M6.6 15.6A2 2 0 1 0 10 17v-5"}]]],A0=["svg",h,[["path",{d:"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}],["path",{d:"m12 15 5 6H7Z"}]]],v=["svg",h,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}],["path",{d:"m9 13 2 2 4-4"}]]],o=["svg",h,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}],["path",{d:"M9 13h6"}]]],L0=["svg",h,[["path",{d:"M6.87 6.87a8 8 0 1 0 11.26 11.26"}],["path",{d:"M19.9 14.25a8 8 0 0 0-9.15-9.15"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.26 18.67 4 21"}],["path",{d:"m2 2 20 20"}],["path",{d:"M4 4 2 6"}]]],s=["svg",h,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}],["path",{d:"M12 10v6"}],["path",{d:"M9 13h6"}]]],f0=["svg",h,[["circle",{cx:"12",cy:"13",r:"8"}],["path",{d:"M12 9v4l2 2"}],["path",{d:"M5 3 2 6"}],["path",{d:"m22 6-3-3"}],["path",{d:"M6.38 18.7 4 21"}],["path",{d:"M17.64 18.67 20 21"}]]],k0=["svg",h,[["path",{d:"M11 21c0-2.5 2-2.5 2-5"}],["path",{d:"M16 21c0-2.5 2-2.5 2-5"}],["path",{d:"m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8"}],["path",{d:"M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z"}],["path",{d:"M6 21c0-2.5 2-2.5 2-5"}]]],P0=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["polyline",{points:"11 3 11 11 14 8 17 11 17 3"}]]],B0=["svg",h,[["path",{d:"M2 12h20"}],["path",{d:"M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"}],["path",{d:"M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"}],["path",{d:"M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1"}],["path",{d:"M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"}]]],F0=["svg",h,[["path",{d:"M12 2v20"}],["path",{d:"M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4"}],["path",{d:"M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"}],["path",{d:"M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1"}],["path",{d:"M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"}]]],D0=["svg",h,[["line",{x1:"21",x2:"3",y1:"6",y2:"6"}],["line",{x1:"17",x2:"7",y1:"12",y2:"12"}],["line",{x1:"19",x2:"5",y1:"18",y2:"18"}]]],Z0=["svg",h,[["rect",{width:"6",height:"16",x:"4",y:"2",rx:"2"}],["rect",{width:"6",height:"9",x:"14",y:"9",rx:"2"}],["path",{d:"M22 22H2"}]]],R0=["svg",h,[["rect",{width:"16",height:"6",x:"2",y:"4",rx:"2"}],["rect",{width:"9",height:"6",x:"9",y:"14",rx:"2"}],["path",{d:"M22 22V2"}]]],q0=["svg",h,[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2"}],["path",{d:"M17 22v-5"}],["path",{d:"M17 7V2"}],["path",{d:"M7 22v-3"}],["path",{d:"M7 5V2"}]]],T0=["svg",h,[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2"}],["path",{d:"M10 2v20"}],["path",{d:"M20 2v20"}]]],b0=["svg",h,[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2"}],["path",{d:"M4 2v20"}],["path",{d:"M14 2v20"}]]],x0=["svg",h,[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2"}],["path",{d:"M12 2v20"}]]],z0=["svg",h,[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"12",y:"7",rx:"2"}],["path",{d:"M22 2v20"}]]],U0=["svg",h,[["rect",{width:"6",height:"14",x:"6",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2"}],["path",{d:"M2 2v20"}]]],O0=["svg",h,[["rect",{width:"6",height:"10",x:"9",y:"7",rx:"2"}],["path",{d:"M4 22V2"}],["path",{d:"M20 22V2"}]]],G0=["svg",h,[["rect",{width:"6",height:"14",x:"3",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"15",y:"7",rx:"2"}],["path",{d:"M3 2v20"}],["path",{d:"M21 2v20"}]]],E0=["svg",h,[["line",{x1:"3",x2:"21",y1:"6",y2:"6"}],["line",{x1:"3",x2:"21",y1:"12",y2:"12"}],["line",{x1:"3",x2:"21",y1:"18",y2:"18"}]]],W0=["svg",h,[["line",{x1:"21",x2:"3",y1:"6",y2:"6"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12"}],["line",{x1:"17",x2:"3",y1:"18",y2:"18"}]]],I0=["svg",h,[["line",{x1:"21",x2:"3",y1:"6",y2:"6"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12"}],["line",{x1:"21",x2:"7",y1:"18",y2:"18"}]]],X0=["svg",h,[["rect",{width:"6",height:"16",x:"4",y:"6",rx:"2"}],["rect",{width:"6",height:"9",x:"14",y:"6",rx:"2"}],["path",{d:"M22 2H2"}]]],N0=["svg",h,[["rect",{width:"9",height:"6",x:"6",y:"14",rx:"2"}],["rect",{width:"16",height:"6",x:"6",y:"4",rx:"2"}],["path",{d:"M2 2v20"}]]],K0=["svg",h,[["path",{d:"M22 17h-3"}],["path",{d:"M22 7h-5"}],["path",{d:"M5 17H2"}],["path",{d:"M7 7H2"}],["rect",{x:"5",y:"14",width:"14",height:"6",rx:"2"}],["rect",{x:"7",y:"4",width:"10",height:"6",rx:"2"}]]],J0=["svg",h,[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2"}],["path",{d:"M2 20h20"}],["path",{d:"M2 10h20"}]]],j0=["svg",h,[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2"}],["path",{d:"M2 14h20"}],["path",{d:"M2 4h20"}]]],Q0=["svg",h,[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2"}],["path",{d:"M2 12h20"}]]],Y0=["svg",h,[["rect",{width:"14",height:"6",x:"5",y:"12",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2"}],["path",{d:"M2 22h20"}]]],_0=["svg",h,[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"6",rx:"2"}],["path",{d:"M2 2h20"}]]],aa=["svg",h,[["rect",{width:"10",height:"6",x:"7",y:"9",rx:"2"}],["path",{d:"M22 20H2"}],["path",{d:"M22 4H2"}]]],ha=["svg",h,[["rect",{width:"14",height:"6",x:"5",y:"15",rx:"2"}],["rect",{width:"10",height:"6",x:"7",y:"3",rx:"2"}],["path",{d:"M2 21h20"}],["path",{d:"M2 3h20"}]]],ta=["svg",h,[["path",{d:"M10 10H6"}],["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"}],["path",{d:"M8 8v4"}],["path",{d:"M9 18h6"}],["circle",{cx:"17",cy:"18",r:"2"}],["circle",{cx:"7",cy:"18",r:"2"}]]],da=["svg",h,[["path",{d:"M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"}],["path",{d:"M16 12h3"}]]],ca=["svg",h,[["path",{d:"M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"}],["path",{d:"M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"}]]],Ma=["svg",h,[["path",{d:"M12 22V8"}],["path",{d:"M5 12H2a10 10 0 0 0 20 0h-3"}],["circle",{cx:"12",cy:"5",r:"3"}]]],ea=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2"}],["path",{d:"M7.5 8 10 9"}],["path",{d:"m14 9 2.5-1"}],["path",{d:"M9 10h0"}],["path",{d:"M15 10h0"}]]],ia=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 15h8"}],["path",{d:"M8 9h2"}],["path",{d:"M14 9h2"}]]],na=["svg",h,[["path",{d:"M2 12 7 2"}],["path",{d:"m7 12 5-10"}],["path",{d:"m12 12 5-10"}],["path",{d:"m17 12 5-10"}],["path",{d:"M4.5 7h15"}],["path",{d:"M12 16v6"}]]],pa=["svg",h,[["path",{d:"M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4"}],["path",{d:"M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z"}],["path",{d:"M9 12v5"}],["path",{d:"M15 12v5"}],["path",{d:"M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1"}]]],la=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m14.31 8 5.74 9.94"}],["path",{d:"M9.69 8h11.48"}],["path",{d:"m7.38 12 5.74-9.94"}],["path",{d:"M9.69 16 3.95 6.06"}],["path",{d:"M14.31 16H2.83"}],["path",{d:"m16.62 12-5.74 9.94"}]]],va=["svg",h,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M6 8h.01"}],["path",{d:"M10 8h.01"}],["path",{d:"M14 8h.01"}]]],oa=["svg",h,[["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}],["path",{d:"M10 4v4"}],["path",{d:"M2 8h20"}],["path",{d:"M6 4v4"}]]],sa=["svg",h,[["path",{d:"M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"}],["path",{d:"M10 2c1 .5 2 2 2 5"}]]],ra=["svg",h,[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h2"}],["path",{d:"M20 8v11a2 2 0 0 1-2 2h-2"}],["path",{d:"m9 15 3-3 3 3"}],["path",{d:"M12 12v9"}]]],ga=["svg",h,[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"m9.5 17 5-5"}],["path",{d:"m9.5 12 5 5"}]]],ya=["svg",h,[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]]],$a=["svg",h,[["path",{d:"M3 3v18h18"}],["path",{d:"M7 12v5h12V8l-5 5-4-4Z"}]]],ma=["svg",h,[["path",{d:"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"}],["path",{d:"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"}],["path",{d:"M5 18v2"}],["path",{d:"M19 18v2"}]]],ua=["svg",h,[["path",{d:"M15 5H9"}],["path",{d:"M15 9v3h4l-7 7-7-7h4V9z"}]]],Ca=["svg",h,[["path",{d:"M15 6v6h4l-7 7-7-7h4V6h6z"}]]],Ha=["svg",h,[["path",{d:"M19 15V9"}],["path",{d:"M15 15h-3v4l-7-7 7-7v4h3v6z"}]]],wa=["svg",h,[["path",{d:"M18 15h-6v4l-7-7 7-7v4h6v6z"}]]],Va=["svg",h,[["path",{d:"M5 9v6"}],["path",{d:"M9 9h3V5l7 7-7 7v-4H9V9z"}]]],Sa=["svg",h,[["path",{d:"M6 9h6V5l7 7-7 7v-4H6V9z"}]]],Aa=["svg",h,[["path",{d:"M9 19h6"}],["path",{d:"M9 15v-3H5l7-7 7 7h-4v3H9z"}]]],La=["svg",h,[["path",{d:"M9 18v-6H5l7-7 7 7h-4v6H9z"}]]],fa=["svg",h,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["rect",{x:"15",y:"4",width:"4",height:"6",ry:"2"}],["path",{d:"M17 20v-6h-2"}],["path",{d:"M15 20h4"}]]],ka=["svg",h,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M17 10V4h-2"}],["path",{d:"M15 10h4"}],["rect",{x:"15",y:"14",width:"4",height:"6",ry:"2"}]]],r=["svg",h,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M20 8h-5"}],["path",{d:"M15 10V6.5a2.5 2.5 0 0 1 5 0V10"}],["path",{d:"M15 14h5l-5 6h5"}]]],Pa=["svg",h,[["path",{d:"M19 3H5"}],["path",{d:"M12 21V7"}],["path",{d:"m6 15 6 6 6-6"}]]],Ba=["svg",h,[["path",{d:"M17 7 7 17"}],["path",{d:"M17 17H7V7"}]]],Fa=["svg",h,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M11 4h4"}],["path",{d:"M11 8h7"}],["path",{d:"M11 12h10"}]]],Da=["svg",h,[["path",{d:"m7 7 10 10"}],["path",{d:"M17 7v10H7"}]]],Za=["svg",h,[["path",{d:"M12 2v14"}],["path",{d:"m19 9-7 7-7-7"}],["circle",{cx:"12",cy:"21",r:"1"}]]],Ra=["svg",h,[["path",{d:"M12 17V3"}],["path",{d:"m6 11 6 6 6-6"}],["path",{d:"M19 21H5"}]]],qa=["svg",h,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"m21 8-4-4-4 4"}],["path",{d:"M17 4v16"}]]],g=["svg",h,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 20V4"}],["path",{d:"M11 4h10"}],["path",{d:"M11 8h7"}],["path",{d:"M11 12h4"}]]],y=["svg",h,[["path",{d:"m3 16 4 4 4-4"}],["path",{d:"M7 4v16"}],["path",{d:"M15 4h5l-5 6h5"}],["path",{d:"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"}],["path",{d:"M20 18h-5"}]]],Ta=["svg",h,[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]]],ba=["svg",h,[["path",{d:"m9 6-6 6 6 6"}],["path",{d:"M3 12h14"}],["path",{d:"M21 19V5"}]]],xa=["svg",h,[["path",{d:"M8 3 4 7l4 4"}],["path",{d:"M4 7h16"}],["path",{d:"m16 21 4-4-4-4"}],["path",{d:"M20 17H4"}]]],za=["svg",h,[["path",{d:"M3 19V5"}],["path",{d:"m13 6-6 6 6 6"}],["path",{d:"M7 12h14"}]]],Ua=["svg",h,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]],Oa=["svg",h,[["path",{d:"M3 5v14"}],["path",{d:"M21 12H7"}],["path",{d:"m15 18 6-6-6-6"}]]],Ga=["svg",h,[["path",{d:"m16 3 4 4-4 4"}],["path",{d:"M20 7H4"}],["path",{d:"m8 21-4-4 4-4"}],["path",{d:"M4 17h16"}]]],Ea=["svg",h,[["path",{d:"M17 12H3"}],["path",{d:"m11 18 6-6-6-6"}],["path",{d:"M21 5v14"}]]],Wa=["svg",h,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]],Ia=["svg",h,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["rect",{x:"15",y:"4",width:"4",height:"6",ry:"2"}],["path",{d:"M17 20v-6h-2"}],["path",{d:"M15 20h4"}]]],Xa=["svg",h,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M17 10V4h-2"}],["path",{d:"M15 10h4"}],["rect",{x:"15",y:"14",width:"4",height:"6",ry:"2"}]]],$=["svg",h,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M20 8h-5"}],["path",{d:"M15 10V6.5a2.5 2.5 0 0 1 5 0V10"}],["path",{d:"M15 14h5l-5 6h5"}]]],Na=["svg",h,[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]]],Ka=["svg",h,[["path",{d:"m5 9 7-7 7 7"}],["path",{d:"M12 16V2"}],["circle",{cx:"12",cy:"21",r:"1"}]]],Ja=["svg",h,[["path",{d:"m18 9-6-6-6 6"}],["path",{d:"M12 3v14"}],["path",{d:"M5 21h14"}]]],ja=["svg",h,[["path",{d:"M7 17V7h10"}],["path",{d:"M17 17 7 7"}]]],m=["svg",h,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M11 12h4"}],["path",{d:"M11 16h7"}],["path",{d:"M11 20h10"}]]],Qa=["svg",h,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]],Ya=["svg",h,[["path",{d:"M5 3h14"}],["path",{d:"m18 13-6-6-6 6"}],["path",{d:"M12 7v14"}]]],_a=["svg",h,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M11 12h10"}],["path",{d:"M11 16h7"}],["path",{d:"M11 20h4"}]]],u=["svg",h,[["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}],["path",{d:"M15 4h5l-5 6h5"}],["path",{d:"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"}],["path",{d:"M20 18h-5"}]]],ah=["svg",h,[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]]],hh=["svg",h,[["path",{d:"m4 6 3-3 3 3"}],["path",{d:"M7 17V3"}],["path",{d:"m14 6 3-3 3 3"}],["path",{d:"M17 17V3"}],["path",{d:"M4 21h16"}]]],th=["svg",h,[["path",{d:"M12 6v12"}],["path",{d:"M17.196 9 6.804 15"}],["path",{d:"m6.804 9 10.392 6"}]]],dh=["svg",h,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"}]]],ch=["svg",h,[["circle",{cx:"12",cy:"12",r:"1"}],["path",{d:"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"}],["path",{d:"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"}]]],Mh=["svg",h,[["path",{d:"M2 10v3"}],["path",{d:"M6 6v11"}],["path",{d:"M10 3v18"}],["path",{d:"M14 8v7"}],["path",{d:"M18 5v13"}],["path",{d:"M22 10v3"}]]],eh=["svg",h,[["path",{d:"M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"}]]],ih=["svg",h,[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]]],nh=["svg",h,[["path",{d:"m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"}],["path",{d:"M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z"}]]],C=["svg",h,[["path",{d:"M4 4v16h16"}],["path",{d:"m4 20 7-7"}]]],ph=["svg",h,[["path",{d:"M9 12h.01"}],["path",{d:"M15 12h.01"}],["path",{d:"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"}],["path",{d:"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"}]]],lh=["svg",h,[["path",{d:"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"}],["path",{d:"M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"}],["path",{d:"M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"}],["path",{d:"M8 10h8"}],["path",{d:"M8 18h8"}]]],vh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],oh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M12 7v10"}],["path",{d:"M15.4 10a4 4 0 1 0 0 4"}]]],H=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"m9 12 2 2 4-4"}]]],sh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{d:"M12 18V6"}]]],rh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M7 12h5"}],["path",{d:"M15 9.4a4 4 0 1 0 0 5.2"}]]],gh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["line",{x1:"12",x2:"12.01",y1:"17",y2:"17"}]]],yh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M8 8h8"}],["path",{d:"M8 12h8"}],["path",{d:"m13 17-5-1h1a4 4 0 0 0 0-8"}]]],$h=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"12",x2:"12",y1:"16",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"8",y2:"8"}]]],mh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"m9 8 3 3v7"}],["path",{d:"m12 11 3-3"}],["path",{d:"M9 12h6"}],["path",{d:"M9 16h6"}]]],uh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]]],Ch=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"m15 9-6 6"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 15h.01"}]]],Hh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"12",x2:"12",y1:"8",y2:"16"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]]],wh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M8 12h4"}],["path",{d:"M10 16V9.5a2.5 2.5 0 0 1 5 0"}],["path",{d:"M8 16h7"}]]],Vh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M9 16h5"}],["path",{d:"M9 12h5a2 2 0 1 0 0-4h-3v9"}]]],Sh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{d:"M11 17V8h4"}],["path",{d:"M11 12h3"}],["path",{d:"M9 16h4"}]]],Ah=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{x1:"15",x2:"9",y1:"9",y2:"15"}],["line",{x1:"9",x2:"15",y1:"9",y2:"15"}]]],Lh=["svg",h,[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}]]],fh=["svg",h,[["path",{d:"M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"}],["path",{d:"M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"}],["rect",{width:"13",height:"8",x:"8",y:"6",rx:"1"}],["circle",{cx:"18",cy:"20",r:"2"}],["circle",{cx:"9",cy:"20",r:"2"}]]],kh=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m4.9 4.9 14.2 14.2"}]]],Ph=["svg",h,[["path",{d:"M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"}],["path",{d:"M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"}]]],Bh=["svg",h,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M6 12h.01M18 12h.01"}]]],Fh=["svg",h,[["line",{x1:"18",x2:"18",y1:"20",y2:"10"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14"}]]],Dh=["svg",h,[["path",{d:"M3 3v18h18"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]]],Zh=["svg",h,[["path",{d:"M3 3v18h18"}],["path",{d:"M13 17V9"}],["path",{d:"M18 17V5"}],["path",{d:"M8 17v-3"}]]],Rh=["svg",h,[["path",{d:"M3 3v18h18"}],["rect",{width:"4",height:"7",x:"7",y:"10",rx:"1"}],["rect",{width:"4",height:"12",x:"15",y:"5",rx:"1"}]]],qh=["svg",h,[["path",{d:"M3 3v18h18"}],["rect",{width:"12",height:"4",x:"7",y:"5",rx:"1"}],["rect",{width:"7",height:"4",x:"7",y:"13",rx:"1"}]]],Th=["svg",h,[["path",{d:"M3 3v18h18"}],["path",{d:"M7 16h8"}],["path",{d:"M7 11h12"}],["path",{d:"M7 6h3"}]]],bh=["svg",h,[["line",{x1:"12",x2:"12",y1:"20",y2:"10"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16"}]]],xh=["svg",h,[["path",{d:"M3 5v14"}],["path",{d:"M8 5v14"}],["path",{d:"M12 5v14"}],["path",{d:"M17 5v14"}],["path",{d:"M21 5v14"}]]],zh=["svg",h,[["path",{d:"M4 20h16"}],["path",{d:"m6 16 6-12 6 12"}],["path",{d:"M8 12h8"}]]],Uh=["svg",h,[["path",{d:"M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"}],["line",{x1:"10",x2:"8",y1:"5",y2:"7"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["line",{x1:"7",x2:"7",y1:"19",y2:"21"}],["line",{x1:"17",x2:"17",y1:"19",y2:"21"}]]],Oh=["svg",h,[["path",{d:"M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"}],["path",{d:"m11 7-3 5h4l-3 5"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}]]],Gh=["svg",h,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13"}],["line",{x1:"10",x2:"10",y1:"11",y2:"13"}],["line",{x1:"14",x2:"14",y1:"11",y2:"13"}]]],Eh=["svg",h,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13"}]]],Wh=["svg",h,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"6",x2:"6",y1:"11",y2:"13"}],["line",{x1:"10",x2:"10",y1:"11",y2:"13"}]]],Ih=["svg",h,[["path",{d:"M14 7h2a2 2 0 0 1 2 2v6c0 1-1 2-2 2h-2"}],["path",{d:"M6 7H4a2 2 0 0 0-2 2v6c0 1 1 2 2 2h2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}],["line",{x1:"10",x2:"10",y1:"7",y2:"13"}],["line",{x1:"10",x2:"10",y1:"17",y2:"17.01"}]]],Xh=["svg",h,[["rect",{width:"16",height:"10",x:"2",y:"7",rx:"2",ry:"2"}],["line",{x1:"22",x2:"22",y1:"11",y2:"13"}]]],Nh=["svg",h,[["path",{d:"M4.5 3h15"}],["path",{d:"M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"}],["path",{d:"M6 14h12"}]]],Kh=["svg",h,[["path",{d:"M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1"}],["path",{d:"M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66"}],["path",{d:"M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Jh=["svg",h,[["path",{d:"M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"}],["path",{d:"M5.341 10.62a4 4 0 1 0 5.279-5.28"}]]],jh=["svg",h,[["path",{d:"M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"}],["path",{d:"M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"}],["path",{d:"M12 4v6"}],["path",{d:"M2 18h20"}]]],Qh=["svg",h,[["path",{d:"M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"}],["path",{d:"M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"}],["path",{d:"M3 18h18"}]]],Yh=["svg",h,[["path",{d:"M2 4v16"}],["path",{d:"M2 8h18a2 2 0 0 1 2 2v10"}],["path",{d:"M2 17h20"}],["path",{d:"M6 8v9"}]]],_h=["svg",h,[["circle",{cx:"12.5",cy:"8.5",r:"2.5"}],["path",{d:"M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"}],["path",{d:"m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"}]]],at=["svg",h,[["path",{d:"M13 13v5"}],["path",{d:"M17 11.47V8"}],["path",{d:"M17 11h1a3 3 0 0 1 2.745 4.211"}],["path",{d:"m2 2 20 20"}],["path",{d:"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"}],["path",{d:"M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268"}],["path",{d:"M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"}],["path",{d:"M9 14.6V18"}]]],ht=["svg",h,[["path",{d:"M17 11h1a3 3 0 0 1 0 6h-1"}],["path",{d:"M9 12v6"}],["path",{d:"M13 12v6"}],["path",{d:"M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"}],["path",{d:"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"}]]],tt=["svg",h,[["path",{d:"M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["circle",{cx:"18",cy:"8",r:"3"}]]],dt=["svg",h,[["path",{d:"M18.8 4A6.3 8.7 0 0 1 20 9"}],["path",{d:"M9 9h.01"}],["circle",{cx:"9",cy:"9",r:"7"}],["rect",{width:"10",height:"6",x:"4",y:"16",rx:"2"}],["path",{d:"M14 19c3 0 4.6-1.6 4.6-1.6"}],["circle",{cx:"20",cy:"16",r:"2"}]]],ct=["svg",h,[["path",{d:"M18.4 12c.8 3.8 2.6 5 2.6 5H3s3-2 3-9c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"M15 8h6"}]]],Mt=["svg",h,[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"m2 2 20 20"}]]],et=["svg",h,[["path",{d:"M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"M15 8h6"}],["path",{d:"M18 5v6"}]]],it=["svg",h,[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}],["path",{d:"M4 2C2.8 3.7 2 5.7 2 8"}],["path",{d:"M22 8c0-2.3-.8-4.3-2-6"}]]],nt=["svg",h,[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"}]]],w=["svg",h,[["rect",{width:"13",height:"7",x:"3",y:"3",rx:"1"}],["path",{d:"m22 15-3-3 3-3"}],["rect",{width:"13",height:"7",x:"3",y:"14",rx:"1"}]]],V=["svg",h,[["rect",{width:"13",height:"7",x:"8",y:"3",rx:"1"}],["path",{d:"m2 9 3 3-3 3"}],["rect",{width:"13",height:"7",x:"8",y:"14",rx:"1"}]]],pt=["svg",h,[["rect",{width:"7",height:"13",x:"3",y:"3",rx:"1"}],["path",{d:"m9 22 3-3 3 3"}],["rect",{width:"7",height:"13",x:"14",y:"3",rx:"1"}]]],lt=["svg",h,[["rect",{width:"7",height:"13",x:"3",y:"8",rx:"1"}],["path",{d:"m15 2-3 3-3-3"}],["rect",{width:"7",height:"13",x:"14",y:"8",rx:"1"}]]],vt=["svg",h,[["circle",{cx:"18.5",cy:"17.5",r:"3.5"}],["circle",{cx:"5.5",cy:"17.5",r:"3.5"}],["circle",{cx:"15",cy:"5",r:"1"}],["path",{d:"M12 17.5V14l-3-3 4-3 2 3h2"}]]],ot=["svg",h,[["rect",{x:"14",y:"14",width:"4",height:"6",rx:"2"}],["rect",{x:"6",y:"4",width:"4",height:"6",rx:"2"}],["path",{d:"M6 20h4"}],["path",{d:"M14 10h4"}],["path",{d:"M6 14h2v6"}],["path",{d:"M14 4h2v6"}]]],st=["svg",h,[["circle",{cx:"12",cy:"11.9",r:"2"}],["path",{d:"M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"}],["path",{d:"m8.9 10.1 1.4.8"}],["path",{d:"M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"}],["path",{d:"m15.1 10.1-1.4.8"}],["path",{d:"M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"}],["path",{d:"M12 13.9v1.6"}],["path",{d:"M13.5 5.4c-1-.2-2-.2-3 0"}],["path",{d:"M17 16.4c.7-.7 1.2-1.6 1.5-2.5"}],["path",{d:"M5.5 13.9c.3.9.8 1.8 1.5 2.5"}]]],rt=["svg",h,[["path",{d:"M16 7h.01"}],["path",{d:"M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"}],["path",{d:"m20 7 2 .5-2 .5"}],["path",{d:"M10 18v3"}],["path",{d:"M14 17.75V21"}],["path",{d:"M7 18a6 6 0 0 0 3.84-10.61"}]]],gt=["svg",h,[["path",{d:"M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"}]]],yt=["svg",h,[["circle",{cx:"9",cy:"9",r:"7"}],["circle",{cx:"15",cy:"15",r:"7"}]]],$t=["svg",h,[["path",{d:"M3 3h18"}],["path",{d:"M20 7H8"}],["path",{d:"M20 11H8"}],["path",{d:"M10 19h10"}],["path",{d:"M8 15h12"}],["path",{d:"M4 3v14"}],["circle",{cx:"4",cy:"19",r:"2"}]]],mt=["svg",h,[["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["path",{d:"M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"}]]],ut=["svg",h,[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17"}],["line",{x1:"18",x2:"21",y1:"12",y2:"12"}],["line",{x1:"3",x2:"6",y1:"12",y2:"12"}]]],Ct=["svg",h,[["path",{d:"m17 17-5 5V12l-5 5"}],["path",{d:"m2 2 20 20"}],["path",{d:"M14.5 9.5 17 7l-5-5v4.5"}]]],Ht=["svg",h,[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17"}],["path",{d:"M20.83 14.83a4 4 0 0 0 0-5.66"}],["path",{d:"M18 12h.01"}]]],wt=["svg",h,[["path",{d:"m7 7 10 10-5 5V2l5 5L7 17"}]]],Vt=["svg",h,[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"}]]],St=["svg",h,[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}],["circle",{cx:"12",cy:"12",r:"4"}]]],At=["svg",h,[["circle",{cx:"11",cy:"13",r:"9"}],["path",{d:"M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95"}],["path",{d:"m22 2-1.5 1.5"}]]],Lt=["svg",h,[["path",{d:"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"}]]],ft=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"m8 13 4-7 4 7"}],["path",{d:"M9.1 11h5.7"}]]],kt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M8 8v3"}],["path",{d:"M12 6v7"}],["path",{d:"M16 8v3"}]]],Pt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"m9 9.5 2 2 4-4"}]]],Bt=["svg",h,[["path",{d:"M2 16V4a2 2 0 0 1 2-2h11"}],["path",{d:"M5 14H4a2 2 0 1 0 0 4h1"}],["path",{d:"M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12"}]]],S=["svg",h,[["path",{d:"M20 22h-2"}],["path",{d:"M20 15v2h-2"}],["path",{d:"M4 19.5V15"}],["path",{d:"M20 8v3"}],["path",{d:"M18 2h2v2"}],["path",{d:"M4 11V9"}],["path",{d:"M12 2h2"}],["path",{d:"M12 22h2"}],["path",{d:"M12 17h2"}],["path",{d:"M8 22H6.5a2.5 2.5 0 0 1 0-5H8"}],["path",{d:"M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8"}]]],Ft=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M12 13V7"}],["path",{d:"m9 10 3 3 3-3"}]]],Dt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"9",cy:"12",r:"1"}],["path",{d:"M8 12v-2a4 4 0 0 1 8 0v2"}],["circle",{cx:"15",cy:"12",r:"1"}]]],Zt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M16 8.2C16 7 15 6 13.8 6c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9C9 6 8 7 8 8.2c0 .6.3 1.2.7 1.6h0C10 11.1 12 13 12 13s2-1.9 3.3-3.1h0c.4-.4.7-1 .7-1.7z"}]]],Rt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"10",cy:"8",r:"2"}],["path",{d:"m20 13.7-2.1-2.1c-.8-.8-2-.8-2.8 0L9.7 17"}]]],qt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H14"}],["path",{d:"M20 8v14H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"14",cy:"8",r:"2"}],["path",{d:"m20 2-4.5 4.5"}],["path",{d:"m19 3 1 1"}]]],Tt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10"}],["path",{d:"M20 15v7H6.5a2.5 2.5 0 0 1 0-5H20"}],["rect",{width:"8",height:"5",x:"12",y:"6",rx:"1"}],["path",{d:"M18 6V4a2 2 0 1 0-4 0v2"}]]],bt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["polyline",{points:"10 2 10 10 13 7 16 10 16 2"}]]],xt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M9 10h6"}]]],zt=["svg",h,[["path",{d:"M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"}],["path",{d:"m16 12 2 2 4-4"}],["path",{d:"M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"}]]],Ut=["svg",h,[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}],["path",{d:"M6 8h2"}],["path",{d:"M6 12h2"}],["path",{d:"M16 8h2"}],["path",{d:"M16 12h2"}]]],Ot=["svg",h,[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}]]],Gt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M9 10h6"}],["path",{d:"M12 7v6"}]]],Et=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M8 7h6"}],["path",{d:"M8 11h8"}]]],Wt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M16 8V6H8v2"}],["path",{d:"M12 6v7"}],["path",{d:"M10 13h4"}]]],It=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2"}],["path",{d:"M18 2h2v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M12 13V7"}],["path",{d:"m9 10 3-3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]]],Xt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"M12 13V7"}],["path",{d:"m9 10 3-3 3 3"}]]],Nt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M15 13a3 3 0 1 0-6 0"}]]],Kt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}],["path",{d:"m14.5 7-5 5"}],["path",{d:"m9.5 7 5 5"}]]],Jt=["svg",h,[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"}]]],jt=["svg",h,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"}],["path",{d:"m9 10 2 2 4-4"}]]],Qt=["svg",h,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}],["line",{x1:"15",x2:"9",y1:"10",y2:"10"}]]],Yt=["svg",h,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}],["line",{x1:"12",x2:"12",y1:"7",y2:"13"}],["line",{x1:"15",x2:"9",y1:"10",y2:"10"}]]],_t=["svg",h,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"}],["path",{d:"m14.5 7.5-5 5"}],["path",{d:"m9.5 7.5 5 5"}]]],a4=["svg",h,[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}]]],h4=["svg",h,[["path",{d:"M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"}],["path",{d:"M8 8v1"}],["path",{d:"M12 8v1"}],["path",{d:"M16 8v1"}],["rect",{width:"20",height:"12",x:"2",y:"9",rx:"2"}],["circle",{cx:"8",cy:"15",r:"2"}],["circle",{cx:"16",cy:"15",r:"2"}]]],t4=["svg",h,[["path",{d:"M12 6V2H8"}],["path",{d:"m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"}],["path",{d:"M2 12h2"}],["path",{d:"M9 11v2"}],["path",{d:"M15 11v2"}],["path",{d:"M20 12h2"}]]],d4=["svg",h,[["path",{d:"M13.67 8H18a2 2 0 0 1 2 2v4.33"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M22 22 2 2"}],["path",{d:"M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586"}],["path",{d:"M9 13v2"}],["path",{d:"M9.67 4H12v2.33"}]]],c4=["svg",h,[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]]],M4=["svg",h,[["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"M21 19a2 2 0 0 1-2 2"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M9 3h1"}],["path",{d:"M9 21h1"}],["path",{d:"M14 3h1"}],["path",{d:"M14 21h1"}],["path",{d:"M3 9v1"}],["path",{d:"M21 9v1"}],["path",{d:"M3 14v1"}],["path",{d:"M21 14v1"}]]],e4=["svg",h,[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]]],i4=["svg",h,[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]]],A=["svg",h,[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"}]]],n4=["svg",h,[["path",{d:"M16 3h3v18h-3"}],["path",{d:"M8 21H5V3h3"}]]],p4=["svg",h,[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]]],l4=["svg",h,[["path",{d:"M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .164-.546c.028-.13.306-.13.335 0a3.2 3.2 0 0 0 .163.546 4 4 0 0 0 7.636-2.106 4 4 0 0 0 .556-6.588 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"m15.7 10.4-.9.4"}],["path",{d:"m9.2 13.2-.9.4"}],["path",{d:"m13.6 15.7-.4-.9"}],["path",{d:"m10.8 9.2-.4-.9"}],["path",{d:"m15.7 13.5-.9-.4"}],["path",{d:"m9.2 10.9-.9-.4"}],["path",{d:"m10.5 15.7.4-.9"}],["path",{d:"m13.1 9.2.4-.9"}]]],v4=["svg",h,[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18"}]]],o4=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 9v6"}],["path",{d:"M16 15v6"}],["path",{d:"M16 3v6"}],["path",{d:"M3 15h18"}],["path",{d:"M3 9h18"}],["path",{d:"M8 15v6"}],["path",{d:"M8 3v6"}]]],s4=["svg",h,[["path",{d:"M12 12h.01"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]]],r4=["svg",h,[["path",{d:"M12 11v4"}],["path",{d:"M14 13h-4"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"}],["path",{d:"M18 6v14"}],["path",{d:"M6 6v14"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]]],g4=["svg",h,[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]]],y4=["svg",h,[["rect",{x:"8",y:"8",width:"8",height:"8",rx:"2"}],["path",{d:"M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"}],["path",{d:"M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2"}]]],$4=["svg",h,[["path",{d:"m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"}],["path",{d:"M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"}]]],m4=["svg",h,[["path",{d:"M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2"}],["path",{d:"M14.12 3.88 16 2"}],["path",{d:"M22 13h-4v-2a4 4 0 0 0-4-4h-1.3"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4"}],["path",{d:"m2 2 20 20"}],["path",{d:"M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13"}],["path",{d:"M12 20v-8"}],["path",{d:"M6 13H2"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4"}]]],u4=["svg",h,[["path",{d:"M12.765 21.522a.5.5 0 0 1-.765-.424v-8.196a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"}],["path",{d:"M14.12 3.88 16 2"}],["path",{d:"M18 11a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v3a6.1 6.1 0 0 0 2 4.5"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4"}],["path",{d:"M6 13H2"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5"}],["path",{d:"m8 2 1.88 1.88"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"}]]],C4=["svg",h,[["path",{d:"m8 2 1.88 1.88"}],["path",{d:"M14.12 3.88 16 2"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"}],["path",{d:"M12 20v-9"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5"}],["path",{d:"M6 13H2"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4"}],["path",{d:"M22 13h-4"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4"}]]],H4=["svg",h,[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"}],["path",{d:"M10 6h4"}],["path",{d:"M10 10h4"}],["path",{d:"M10 14h4"}],["path",{d:"M10 18h4"}]]],w4=["svg",h,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2"}],["path",{d:"M9 22v-4h6v4"}],["path",{d:"M8 6h.01"}],["path",{d:"M16 6h.01"}],["path",{d:"M12 6h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 10h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M8 14h.01"}]]],V4=["svg",h,[["path",{d:"M4 6 2 7"}],["path",{d:"M10 6h4"}],["path",{d:"m22 7-2-1"}],["rect",{width:"16",height:"16",x:"4",y:"3",rx:"2"}],["path",{d:"M4 11h16"}],["path",{d:"M8 15h.01"}],["path",{d:"M16 15h.01"}],["path",{d:"M6 19v2"}],["path",{d:"M18 21v-2"}]]],S4=["svg",h,[["path",{d:"M8 6v6"}],["path",{d:"M15 6v6"}],["path",{d:"M2 12h19.6"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"}],["circle",{cx:"7",cy:"18",r:"2"}],["path",{d:"M9 18h5"}],["circle",{cx:"16",cy:"18",r:"2"}]]],A4=["svg",h,[["path",{d:"M10 3h.01"}],["path",{d:"M14 2h.01"}],["path",{d:"m2 9 20-5"}],["path",{d:"M12 12V6.5"}],["rect",{width:"16",height:"10",x:"4",y:"12",rx:"3"}],["path",{d:"M9 12v5"}],["path",{d:"M15 12v5"}],["path",{d:"M4 17h16"}]]],L4=["svg",h,[["path",{d:"M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"}],["path",{d:"M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"}],["path",{d:"M21 21v-2h-4"}],["path",{d:"M3 5h4V3"}],["path",{d:"M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3"}]]],f4=["svg",h,[["circle",{cx:"9",cy:"7",r:"2"}],["path",{d:"M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6"}],["path",{d:"M16 13H3"}],["path",{d:"M16 17H3"}]]],k4=["svg",h,[["path",{d:"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"}],["path",{d:"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"}],["path",{d:"M2 21h20"}],["path",{d:"M7 8v3"}],["path",{d:"M12 8v3"}],["path",{d:"M17 8v3"}],["path",{d:"M7 4h0.01"}],["path",{d:"M12 4h0.01"}],["path",{d:"M17 4h0.01"}]]],P4=["svg",h,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]]],B4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"m16 20 2 2 4-4"}]]],F4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]]],D4=["svg",h,[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"}],["path",{d:"M16 2v4"}],["path",{d:"M8 2v4"}],["path",{d:"M3 10h5"}],["path",{d:"M17.5 17.5 16 16.3V14"}],["circle",{cx:"16",cy:"16",r:"6"}]]],Z4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]]],R4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"}],["path",{d:"M3 10h18"}],["path",{d:"M15 22v-4a2 2 0 0 1 2-2h4"}]]],q4=["svg",h,[["path",{d:"M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"}],["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"}]]],T4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M10 16h4"}]]],b4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"M16 19h6"}]]],x4=["svg",h,[["path",{d:"M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"}],["path",{d:"M21 15.5V6a2 2 0 0 0-2-2H9.5"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h7"}],["path",{d:"M21 10h-5.5"}],["path",{d:"m2 2 20 20"}]]],z4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M10 16h4"}],["path",{d:"M12 14v4"}]]],U4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"M16 19h6"}],["path",{d:"M19 16v6"}]]],O4=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]]],G4=["svg",h,[["path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5"}],["path",{d:"M16 2v4"}],["path",{d:"M8 2v4"}],["path",{d:"M3 10h18"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m22 22-1.5-1.5"}]]],E4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"}],["path",{d:"M3 10h18"}],["path",{d:"m17 22 5-5"}],["path",{d:"m17 17 5 5"}]]],W4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m14 14-4 4"}],["path",{d:"m10 14 4 4"}]]],I4=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]]],X4=["svg",h,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16"}],["path",{d:"M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5"}],["path",{d:"M14.121 15.121A3 3 0 1 1 9.88 10.88"}]]],N4=["svg",h,[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"}],["circle",{cx:"12",cy:"13",r:"3"}]]],K4=["svg",h,[["path",{d:"M9 5v4"}],["rect",{width:"4",height:"6",x:"7",y:"9",rx:"1"}],["path",{d:"M9 15v2"}],["path",{d:"M17 3v2"}],["rect",{width:"4",height:"8",x:"15",y:"5",rx:"1"}],["path",{d:"M17 13v3"}],["path",{d:"M3 3v18h18"}]]],J4=["svg",h,[["path",{d:"M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z"}],["path",{d:"M17.75 7 15 2.1"}],["path",{d:"M10.9 4.8 13 9"}],["path",{d:"m7.9 9.7 2 4.4"}],["path",{d:"M4.9 14.7 7 18.9"}]]],j4=["svg",h,[["path",{d:"m8.5 8.5-1 1a4.95 4.95 0 0 0 7 7l1-1"}],["path",{d:"M11.843 6.187A4.947 4.947 0 0 1 16.5 7.5a4.947 4.947 0 0 1 1.313 4.657"}],["path",{d:"M14 16.5V14"}],["path",{d:"M14 6.5v1.843"}],["path",{d:"M10 10v7.5"}],["path",{d:"m16 7 1-5 1.367.683A3 3 0 0 0 19.708 3H21v1.292a3 3 0 0 0 .317 1.341L22 7l-5 1"}],["path",{d:"m8 17-1 5-1.367-.683A3 3 0 0 0 4.292 21H3v-1.292a3 3 0 0 0-.317-1.341L2 17l5-1"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Q4=["svg",h,[["path",{d:"m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z"}],["path",{d:"M14 6.5v10"}],["path",{d:"M10 7.5v10"}],["path",{d:"m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1"}],["path",{d:"m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1"}]]],Y4=["svg",h,[["path",{d:"M12 22v-4"}],["path",{d:"M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"}]]],_4=["svg",h,[["path",{d:"M10.5 5H19a2 2 0 0 1 2 2v8.5"}],["path",{d:"M17 11h-.5"}],["path",{d:"M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2"}],["path",{d:"m2 2 20 20"}],["path",{d:"M7 11h4"}],["path",{d:"M7 15h2.5"}]]],L=["svg",h,[["rect",{width:"18",height:"14",x:"3",y:"5",rx:"2",ry:"2"}],["path",{d:"M7 15h4M15 15h2M7 11h2M13 11h4"}]]],a5=["svg",h,[["path",{d:"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 14h.01"}],["rect",{width:"18",height:"8",x:"3",y:"10",rx:"2"}],["path",{d:"M5 18v2"}],["path",{d:"M19 18v2"}]]],h5=["svg",h,[["path",{d:"M10 2h4"}],["path",{d:"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 14h.01"}],["rect",{width:"18",height:"8",x:"3",y:"10",rx:"2"}],["path",{d:"M5 18v2"}],["path",{d:"M19 18v2"}]]],t5=["svg",h,[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"}],["circle",{cx:"7",cy:"17",r:"2"}],["path",{d:"M9 17h6"}],["circle",{cx:"17",cy:"17",r:"2"}]]],d5=["svg",h,[["rect",{width:"4",height:"4",x:"2",y:"9"}],["rect",{width:"4",height:"10",x:"10",y:"9"}],["path",{d:"M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2"}],["circle",{cx:"8",cy:"19",r:"2"}],["path",{d:"M10 19h12v-2"}]]],c5=["svg",h,[["path",{d:"M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"}],["path",{d:"M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z"}],["path",{d:"M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z"}]]],M5=["svg",h,[["circle",{cx:"7",cy:"12",r:"3"}],["path",{d:"M10 9v6"}],["circle",{cx:"17",cy:"12",r:"3"}],["path",{d:"M14 7v8"}]]],e5=["svg",h,[["path",{d:"m3 15 4-8 4 8"}],["path",{d:"M4 13h6"}],["circle",{cx:"18",cy:"12",r:"3"}],["path",{d:"M21 9v6"}]]],i5=["svg",h,[["path",{d:"m3 15 4-8 4 8"}],["path",{d:"M4 13h6"}],["path",{d:"M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4"}]]],n5=["svg",h,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["circle",{cx:"8",cy:"10",r:"2"}],["path",{d:"M8 12h8"}],["circle",{cx:"16",cy:"10",r:"2"}],["path",{d:"m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3"}]]],p5=["svg",h,[["path",{d:"M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"}],["path",{d:"M2 12a9 9 0 0 1 8 8"}],["path",{d:"M2 16a5 5 0 0 1 4 4"}],["line",{x1:"2",x2:"2.01",y1:"20",y2:"20"}]]],l5=["svg",h,[["path",{d:"M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"}],["path",{d:"M18 11V4H6v7"}],["path",{d:"M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4"}],["path",{d:"M22 11V9"}],["path",{d:"M2 11V9"}],["path",{d:"M6 4V2"}],["path",{d:"M18 4V2"}],["path",{d:"M10 4V2"}],["path",{d:"M14 4V2"}]]],v5=["svg",h,[["path",{d:"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"}],["path",{d:"M8 14v.5"}],["path",{d:"M16 14v.5"}],["path",{d:"M11.25 16.25h1.5L12 17l-.75-.75Z"}]]],o5=["svg",h,[["path",{d:"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"}],["path",{d:"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"}],["path",{d:"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"}],["path",{d:"M2 21v-4"}],["path",{d:"M7 9h.01"}]]],s5=["svg",h,[["path",{d:"M18 6 7 17l-5-5"}],["path",{d:"m22 10-7.5 7.5L13 16"}]]],r5=["svg",h,[["path",{d:"M20 6 9 17l-5-5"}]]],g5=["svg",h,[["path",{d:"M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"}],["path",{d:"M6 17h12"}]]],y5=["svg",h,[["path",{d:"M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"}],["path",{d:"M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"}],["path",{d:"M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"}],["path",{d:"M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"}]]],$5=["svg",h,[["path",{d:"m6 9 6 6 6-6"}]]],m5=["svg",h,[["path",{d:"m17 18-6-6 6-6"}],["path",{d:"M7 6v12"}]]],u5=["svg",h,[["path",{d:"m7 18 6-6-6-6"}],["path",{d:"M17 6v12"}]]],C5=["svg",h,[["path",{d:"m15 18-6-6 6-6"}]]],H5=["svg",h,[["path",{d:"m9 18 6-6-6-6"}]]],w5=["svg",h,[["path",{d:"m18 15-6-6-6 6"}]]],V5=["svg",h,[["path",{d:"m7 20 5-5 5 5"}],["path",{d:"m7 4 5 5 5-5"}]]],S5=["svg",h,[["path",{d:"m7 6 5 5 5-5"}],["path",{d:"m7 13 5 5 5-5"}]]],A5=["svg",h,[["path",{d:"m9 7-5 5 5 5"}],["path",{d:"m15 7 5 5-5 5"}]]],L5=["svg",h,[["path",{d:"m11 17-5-5 5-5"}],["path",{d:"m18 17-5-5 5-5"}]]],f5=["svg",h,[["path",{d:"m20 17-5-5 5-5"}],["path",{d:"m4 17 5-5-5-5"}]]],k5=["svg",h,[["path",{d:"m6 17 5-5-5-5"}],["path",{d:"m13 17 5-5-5-5"}]]],P5=["svg",h,[["path",{d:"m7 15 5 5 5-5"}],["path",{d:"m7 9 5-5 5 5"}]]],B5=["svg",h,[["path",{d:"m17 11-5-5-5 5"}],["path",{d:"m17 18-5-5-5 5"}]]],F5=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"4"}],["line",{x1:"21.17",x2:"12",y1:"8",y2:"8"}],["line",{x1:"3.95",x2:"8.54",y1:"6.06",y2:"14"}],["line",{x1:"10.88",x2:"15.46",y1:"21.94",y2:"14"}]]],D5=["svg",h,[["path",{d:"m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"}],["path",{d:"M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"}],["path",{d:"M18 22V5l-6-3-6 3v17"}],["path",{d:"M12 7v5"}],["path",{d:"M10 9h4"}]]],Z5=["svg",h,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M12 12H2v4h14"}],["path",{d:"M22 12v4"}],["path",{d:"M18 12h-.5"}],["path",{d:"M7 12v4"}],["path",{d:"M18 8c0-2.5-2-2.5-2-5"}],["path",{d:"M22 8c0-2.5-2-2.5-2-5"}]]],R5=["svg",h,[["path",{d:"M18 12H2v4h16"}],["path",{d:"M22 12v4"}],["path",{d:"M7 12v4"}],["path",{d:"M18 8c0-2.5-2-2.5-2-5"}],["path",{d:"M22 8c0-2.5-2-2.5-2-5"}]]],f=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],k=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 8v8"}],["path",{d:"m8 12 4 4 4-4"}]]],P=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 12H8"}],["path",{d:"m12 8-4 4 4 4"}]]],B=["svg",h,[["path",{d:"M2 12a10 10 0 1 1 10 10"}],["path",{d:"m2 22 10-10"}],["path",{d:"M8 22H2v-6"}]]],F=["svg",h,[["path",{d:"M12 22a10 10 0 1 1 10-10"}],["path",{d:"M22 22 12 12"}],["path",{d:"M22 16v6h-6"}]]],D=["svg",h,[["path",{d:"M2 8V2h6"}],["path",{d:"m2 2 10 10"}],["path",{d:"M12 2A10 10 0 1 1 2 12"}]]],Z=["svg",h,[["path",{d:"M22 12A10 10 0 1 1 12 2"}],["path",{d:"M22 2 12 12"}],["path",{d:"M16 2h6v6"}]]],R=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"m12 16 4-4-4-4"}]]],q=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 12-4-4-4 4"}],["path",{d:"M12 16V8"}]]],T=["svg",h,[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}],["path",{d:"m9 11 3 3L22 4"}]]],b=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]]],x=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 10-4 4-4-4"}]]],z=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m14 16-4-4 4-4"}]]],U=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m10 8 4 4-4 4"}]]],O=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m8 14 4-4 4 4"}]]],q5=["svg",h,[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]]],G=["svg",h,[["line",{x1:"8",x2:"16",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"16",y2:"16"}],["line",{x1:"12",x2:"12",y1:"8",y2:"8"}],["circle",{cx:"12",cy:"12",r:"10"}]]],T5=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{d:"M12 18V6"}]]],b5=["svg",h,[["path",{d:"M10.1 2.18a9.93 9.93 0 0 1 3.8 0"}],["path",{d:"M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7"}],["path",{d:"M21.82 10.1a9.93 9.93 0 0 1 0 3.8"}],["path",{d:"M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69"}],["path",{d:"M13.9 21.82a9.94 9.94 0 0 1-3.8 0"}],["path",{d:"M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7"}],["path",{d:"M2.18 13.9a9.93 9.93 0 0 1 0-3.8"}],["path",{d:"M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69"}],["circle",{cx:"12",cy:"12",r:"1"}]]],x5=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"1"}]]],z5=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M17 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M7 12h.01"}]]],U5=["svg",h,[["path",{d:"M7 10h10"}],["path",{d:"M7 14h10"}],["circle",{cx:"12",cy:"12",r:"10"}]]],O5=["svg",h,[["path",{d:"M12 2a10 10 0 0 1 7.38 16.75"}],["path",{d:"M12 8v8"}],["path",{d:"M16 12H8"}],["path",{d:"M2.5 8.875a10 10 0 0 0-.5 3"}],["path",{d:"M2.83 16a10 10 0 0 0 2.43 3.4"}],["path",{d:"M4.636 5.235a10 10 0 0 1 .891-.857"}],["path",{d:"M8.644 21.42a10 10 0 0 0 7.631-.38"}]]],E=["svg",h,[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M13.4 10.6 19 5"}]]],W=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]]],I=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}]]],G5=["svg",h,[["path",{d:"m2 2 20 20"}],["path",{d:"M8.35 2.69A10 10 0 0 1 21.3 15.65"}],["path",{d:"M19.08 19.08A10 10 0 1 1 4.92 4.92"}]]],X=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m5 5 14 14"}],["path",{d:"M13 13a3 3 0 1 0 0-6H9v2"}],["path",{d:"M9 17v-2.34"}]]],N=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9 17V7h4a3 3 0 0 1 0 6H9"}]]],K=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9"}]]],J=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 15h.01"}]]],j=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polygon",{points:"10 8 16 12 10 16 10 8"}]]],Q=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],Y=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 12V7"}],["path",{d:"M16 9a5 5 0 1 1-8 0"}]]],_=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M22 2 2 22"}]]],E5=["svg",h,[["line",{x1:"9",x2:"15",y1:"15",y2:"9"}],["circle",{cx:"12",cy:"12",r:"10"}]]],a1=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["rect",{width:"6",height:"6",x:"9",y:"9"}]]],h1=["svg",h,[["path",{d:"M18 20a6 6 0 0 0-12 0"}],["circle",{cx:"12",cy:"10",r:"4"}],["circle",{cx:"12",cy:"12",r:"10"}]]],t1=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"}]]],d1=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]],W5=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}]]],I5=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M11 9h4a2 2 0 0 0 2-2V3"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"M7 21v-4a2 2 0 0 1 2-2h4"}],["circle",{cx:"15",cy:"15",r:"2"}]]],X5=["svg",h,[["path",{d:"M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"}],["path",{d:"M19.65 15.66A8 8 0 0 1 8.35 4.34"}],["path",{d:"m14 10-5.5 5.5"}],["path",{d:"M14 17.85V10H6.15"}]]],N5=["svg",h,[["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"}],["path",{d:"m6.2 5.3 3.1 3.9"}],["path",{d:"m12.4 3.4 3.1 4"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"}]]],K5=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"m9 14 2 2 4-4"}]]],J5=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v4"}],["path",{d:"M21 14H11"}],["path",{d:"m15 10-4 4 4 4"}]]],j5=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M12 11h4"}],["path",{d:"M12 16h4"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 16h.01"}]]],Q5=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M9 14h6"}]]],Y5=["svg",h,[["path",{d:"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"}],["path",{d:"m17 10 4 4-4 4"}]]],c1=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5"}],["path",{d:"M16 4h2a2 2 0 0 1 1.73 1"}],["path",{d:"M8 18h1"}],["path",{d:"M18.4 9.6a2 2 0 0 1 3 3L17 17l-4 1 1-4Z"}]]],M1=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1"}],["path",{d:"M10.4 12.6a2 2 0 0 1 3 3L8 21l-4 1 1-4Z"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"}],["path",{d:"M4 13.5V6a2 2 0 0 1 2-2h2"}]]],_5=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M9 14h6"}],["path",{d:"M12 17v-6"}]]],ad=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M9 12v-1h6v1"}],["path",{d:"M11 17h2"}],["path",{d:"M12 11v6"}]]],hd=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"m15 11-6 6"}],["path",{d:"m9 11 6 6"}]]],td=["svg",h,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}]]],dd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 14.5 8"}]]],cd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 8 10"}]]],Md=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 9.5 8"}]]],ed=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12"}]]],id=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 10"}]]],nd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16.5 12"}]]],pd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]]],ld=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 14.5 16"}]]],vd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 12 16.5"}]]],od=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 9.5 16"}]]],sd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 8 14"}]]],rd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 7.5 12"}]]],gd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]]],yd=["svg",h,[["circle",{cx:"12",cy:"17",r:"3"}],["path",{d:"M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2"}],["path",{d:"m15.7 18.4-.9-.3"}],["path",{d:"m9.2 15.9-.9-.3"}],["path",{d:"m10.6 20.7.3-.9"}],["path",{d:"m13.1 14.2.3-.9"}],["path",{d:"m13.6 20.7-.4-1"}],["path",{d:"m10.8 14.3-.4-1"}],["path",{d:"m8.3 18.6 1-.4"}],["path",{d:"m14.7 15.8 1-.4"}]]],e1=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M12 12v9"}],["path",{d:"m8 17 4 4 4-4"}]]],$d=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M8 19v1"}],["path",{d:"M8 14v1"}],["path",{d:"M16 19v1"}],["path",{d:"M16 14v1"}],["path",{d:"M12 21v1"}],["path",{d:"M12 16v1"}]]],md=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 17H7"}],["path",{d:"M17 21H9"}]]],ud=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 14v2"}],["path",{d:"M8 14v2"}],["path",{d:"M16 20h.01"}],["path",{d:"M8 20h.01"}],["path",{d:"M12 16v2"}],["path",{d:"M12 22h.01"}]]],Cd=["svg",h,[["path",{d:"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"}],["path",{d:"m13 12-3 5h4l-3 5"}]]],Hd=["svg",h,[["path",{d:"M10.083 9A6.002 6.002 0 0 1 16 4a4.243 4.243 0 0 0 6 6c0 2.22-1.206 4.16-3 5.197"}],["path",{d:"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"}],["path",{d:"M11 20v2"}],["path",{d:"M7 19v2"}]]],wd=["svg",h,[["path",{d:"M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z"}],["path",{d:"M10.1 9A6 6 0 0 1 16 4a4.24 4.24 0 0 0 6 6 6 6 0 0 1-3 5.197"}]]],Vd=["svg",h,[["path",{d:"m2 2 20 20"}],["path",{d:"M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193"}],["path",{d:"M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07"}]]],Sd=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"m9.2 22 3-7"}],["path",{d:"m9 13-3 7"}],["path",{d:"m17 13-3 7"}]]],Ad=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 14v6"}],["path",{d:"M8 14v6"}],["path",{d:"M12 16v6"}]]],Ld=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M8 15h.01"}],["path",{d:"M8 19h.01"}],["path",{d:"M12 17h.01"}],["path",{d:"M12 21h.01"}],["path",{d:"M16 15h.01"}],["path",{d:"M16 19h.01"}]]],fd=["svg",h,[["path",{d:"M12 2v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"M20 12h2"}],["path",{d:"m19.07 4.93-1.41 1.41"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128"}],["path",{d:"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"}],["path",{d:"M11 20v2"}],["path",{d:"M7 19v2"}]]],kd=["svg",h,[["path",{d:"M12 2v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"M20 12h2"}],["path",{d:"m19.07 4.93-1.41 1.41"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128"}],["path",{d:"M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"}]]],i1=["svg",h,[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M12 12v9"}],["path",{d:"m16 16-4-4-4 4"}]]],Pd=["svg",h,[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}]]],Bd=["svg",h,[["path",{d:"M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}],["path",{d:"M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"}]]],Fd=["svg",h,[["path",{d:"M16.17 7.83 2 22"}],["path",{d:"M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"}],["path",{d:"m7.83 7.83 8.34 8.34"}]]],Dd=["svg",h,[["path",{d:"M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z"}],["path",{d:"M12 17.66L12 22"}]]],n1=["svg",h,[["path",{d:"m18 16 4-4-4-4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"m14.5 4-5 16"}]]],Zd=["svg",h,[["polyline",{points:"16 18 22 12 16 6"}],["polyline",{points:"8 6 2 12 8 18"}]]],Rd=["svg",h,[["polygon",{points:"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"}],["line",{x1:"12",x2:"12",y1:"22",y2:"15.5"}],["polyline",{points:"22 8.5 12 15.5 2 8.5"}],["polyline",{points:"2 15.5 12 8.5 22 15.5"}],["line",{x1:"12",x2:"12",y1:"2",y2:"8.5"}]]],qd=["svg",h,[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}],["polyline",{points:"7.5 4.21 12 6.81 16.5 4.21"}],["polyline",{points:"7.5 19.79 7.5 14.6 3 12"}],["polyline",{points:"21 12 16.5 14.6 16.5 19.79"}],["polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}],["line",{x1:"12",x2:"12",y1:"22.08",y2:"12"}]]],Td=["svg",h,[["path",{d:"M10 2v2"}],["path",{d:"M14 2v2"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"}],["path",{d:"M6 2v2"}]]],bd=["svg",h,[["path",{d:"M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"}],["path",{d:"M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"}],["path",{d:"M12 2v2"}],["path",{d:"M12 22v-2"}],["path",{d:"m17 20.66-1-1.73"}],["path",{d:"M11 10.27 7 3.34"}],["path",{d:"m20.66 17-1.73-1"}],["path",{d:"m3.34 7 1.73 1"}],["path",{d:"M14 12h8"}],["path",{d:"M2 12h2"}],["path",{d:"m20.66 7-1.73 1"}],["path",{d:"m3.34 17 1.73-1"}],["path",{d:"m17 3.34-1 1.73"}],["path",{d:"m11 13.73-4 6.93"}]]],xd=["svg",h,[["circle",{cx:"8",cy:"8",r:"6"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18"}],["path",{d:"M7 6h1v4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82"}]]],p1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 3v18"}]]],l1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"M15 3v18"}]]],zd=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7.5 3v18"}],["path",{d:"M12 3v18"}],["path",{d:"M16.5 3v18"}]]],Ud=["svg",h,[["rect",{width:"8",height:"8",x:"2",y:"2",rx:"2"}],["path",{d:"M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}],["path",{d:"M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}],["path",{d:"M10 18H5c-1.7 0-3-1.3-3-3v-1"}],["polyline",{points:"7 21 10 18 7 15"}],["rect",{width:"8",height:"8",x:"14",y:"14",rx:"2"}]]],Od=["svg",h,[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]]],Gd=["svg",h,[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}],["circle",{cx:"12",cy:"12",r:"10"}]]],Ed=["svg",h,[["path",{d:"M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"}],["path",{d:"m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"}],["path",{d:"M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"}],["path",{d:"m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"}]]],Wd=["svg",h,[["rect",{width:"14",height:"8",x:"5",y:"2",rx:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6 18h2"}],["path",{d:"M12 18h6"}]]],Id=["svg",h,[["path",{d:"M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z"}],["path",{d:"M20 16a8 8 0 1 0-16 0"}],["path",{d:"M12 4v4"}],["path",{d:"M10 4h4"}]]],Xd=["svg",h,[["path",{d:"m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98"}],["ellipse",{cx:"12",cy:"19",rx:"9",ry:"3"}]]],Nd=["svg",h,[["rect",{x:"2",y:"6",width:"20",height:"8",rx:"1"}],["path",{d:"M17 14v7"}],["path",{d:"M7 14v7"}],["path",{d:"M17 3v3"}],["path",{d:"M7 3v3"}],["path",{d:"M10 14 2.3 6.3"}],["path",{d:"m14 6 7.7 7.7"}],["path",{d:"m8 6 8 8"}]]],v1=["svg",h,[["path",{d:"M16 18a4 4 0 0 0-8 0"}],["circle",{cx:"12",cy:"11",r:"3"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["line",{x1:"8",x2:"8",y1:"2",y2:"4"}],["line",{x1:"16",x2:"16",y1:"2",y2:"4"}]]],Kd=["svg",h,[["path",{d:"M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["circle",{cx:"12",cy:"10",r:"2"}],["line",{x1:"8",x2:"8",y1:"2",y2:"4"}],["line",{x1:"16",x2:"16",y1:"2",y2:"4"}]]],Jd=["svg",h,[["path",{d:"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"}],["path",{d:"M10 21.9V14L2.1 9.1"}],["path",{d:"m10 14 11.9-6.9"}],["path",{d:"M14 19.8v-8.1"}],["path",{d:"M18 17.5V9.4"}]]],jd=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z"}]]],Qd=["svg",h,[["path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"}],["path",{d:"M8.5 8.5v.01"}],["path",{d:"M16 15.5v.01"}],["path",{d:"M12 12v.01"}],["path",{d:"M11 17v.01"}],["path",{d:"M7 14v.01"}]]],Yd=["svg",h,[["path",{d:"M2 12h20"}],["path",{d:"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"}],["path",{d:"m4 8 16-4"}],["path",{d:"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"}]]],_d=["svg",h,[["path",{d:"m12 15 2 2 4-4"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]],a3=["svg",h,[["line",{x1:"12",x2:"18",y1:"15",y2:"15"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]],h3=["svg",h,[["line",{x1:"15",x2:"15",y1:"12",y2:"18"}],["line",{x1:"12",x2:"18",y1:"15",y2:"15"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]],t3=["svg",h,[["line",{x1:"12",x2:"18",y1:"18",y2:"12"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]],d3=["svg",h,[["line",{x1:"12",x2:"18",y1:"12",y2:"18"}],["line",{x1:"12",x2:"18",y1:"18",y2:"12"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]],c3=["svg",h,[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]],M3=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.17 14.83a4 4 0 1 0 0-5.66"}]]],e3=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M14.83 14.83a4 4 0 1 1 0-5.66"}]]],i3=["svg",h,[["polyline",{points:"9 10 4 15 9 20"}],["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}]]],n3=["svg",h,[["polyline",{points:"15 10 20 15 15 20"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12"}]]],p3=["svg",h,[["polyline",{points:"14 15 9 20 4 15"}],["path",{d:"M20 4h-7a4 4 0 0 0-4 4v12"}]]],l3=["svg",h,[["polyline",{points:"14 9 9 4 4 9"}],["path",{d:"M20 20h-7a4 4 0 0 1-4-4V4"}]]],v3=["svg",h,[["polyline",{points:"10 15 15 20 20 15"}],["path",{d:"M4 4h7a4 4 0 0 1 4 4v12"}]]],o3=["svg",h,[["polyline",{points:"10 9 15 4 20 9"}],["path",{d:"M4 20h7a4 4 0 0 0 4-4V4"}]]],s3=["svg",h,[["polyline",{points:"9 14 4 9 9 4"}],["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4"}]]],r3=["svg",h,[["polyline",{points:"15 14 20 9 15 4"}],["path",{d:"M4 20v-7a4 4 0 0 1 4-4h12"}]]],g3=["svg",h,[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1"}],["path",{d:"M15 2v2"}],["path",{d:"M15 20v2"}],["path",{d:"M2 15h2"}],["path",{d:"M2 9h2"}],["path",{d:"M20 15h2"}],["path",{d:"M20 9h2"}],["path",{d:"M9 2v2"}],["path",{d:"M9 20v2"}]]],y3=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"}],["path",{d:"M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"}]]],$3=["svg",h,[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10"}]]],m3=["svg",h,[["path",{d:"m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"}],["path",{d:"m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"}],["path",{d:"M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"}],["path",{d:"m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"}],["path",{d:"M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"}]]],u3=["svg",h,[["path",{d:"M6 2v14a2 2 0 0 0 2 2h14"}],["path",{d:"M18 22V8a2 2 0 0 0-2-2H2"}]]],C3=["svg",h,[["path",{d:"M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"}]]],H3=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18"}]]],w3=["svg",h,[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"}],["path",{d:"M5 21h14"}]]],V3=["svg",h,[["path",{d:"m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"}],["path",{d:"M10 22v-8L2.25 9.15"}],["path",{d:"m10 14 11.77-6.87"}]]],S3=["svg",h,[["path",{d:"m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"}],["path",{d:"M5 8h14"}],["path",{d:"M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}],["path",{d:"m12 8 1-6h2"}]]],A3=["svg",h,[["circle",{cx:"12",cy:"12",r:"8"}],["line",{x1:"3",x2:"6",y1:"3",y2:"6"}],["line",{x1:"21",x2:"18",y1:"3",y2:"6"}],["line",{x1:"3",x2:"6",y1:"21",y2:"18"}],["line",{x1:"21",x2:"18",y1:"21",y2:"18"}]]],L3=["svg",h,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5v14a9 3 0 0 0 18 0V5"}]]],f3=["svg",h,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 12a9 3 0 0 0 5 2.69"}],["path",{d:"M21 9.3V5"}],["path",{d:"M3 5v14a9 3 0 0 0 6.47 2.88"}],["path",{d:"M12 12v4h4"}],["path",{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"}]]],k3=["svg",h,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 15 21.84"}],["path",{d:"M21 5V8"}],["path",{d:"M21 12L18 17H22L19 22"}],["path",{d:"M3 12A9 3 0 0 0 14.59 14.87"}]]],P3=["svg",h,[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]]],B3=["svg",h,[["path",{d:"M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"}],["line",{x1:"18",x2:"12",y1:"9",y2:"15"}],["line",{x1:"12",x2:"18",y1:"9",y2:"15"}]]],F3=["svg",h,[["circle",{cx:"12",cy:"4",r:"2"}],["path",{d:"M10.2 3.2C5.5 4 2 8.1 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4 0c0-4.9-3.5-9-8.2-9.8"}],["path",{d:"M3.2 14.8a9 9 0 0 0 17.6 0"}]]],D3=["svg",h,[["circle",{cx:"19",cy:"19",r:"2"}],["circle",{cx:"5",cy:"5",r:"2"}],["path",{d:"M6.48 3.66a10 10 0 0 1 13.86 13.86"}],["path",{d:"m6.41 6.41 11.18 11.18"}],["path",{d:"M3.66 6.48a10 10 0 0 0 13.86 13.86"}]]],Z3=["svg",h,[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"}],["path",{d:"M8 12h8"}]]],o1=["svg",h,[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"}],["path",{d:"M9.2 9.2h.01"}],["path",{d:"m14.5 9.5-5 5"}],["path",{d:"M14.7 14.8h.01"}]]],R3=["svg",h,[["path",{d:"M12 8v8"}],["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"}],["path",{d:"M8 12h8"}]]],q3=["svg",h,[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"}]]],T3=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M12 12h.01"}]]],b3=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M15 9h.01"}],["path",{d:"M9 15h.01"}]]],x3=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M8 16h.01"}]]],z3=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M8 8h.01"}],["path",{d:"M8 16h.01"}],["path",{d:"M16 16h.01"}]]],U3=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M8 8h.01"}],["path",{d:"M8 16h.01"}],["path",{d:"M16 16h.01"}],["path",{d:"M12 12h.01"}]]],O3=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M16 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M16 16h.01"}],["path",{d:"M8 8h.01"}],["path",{d:"M8 12h.01"}],["path",{d:"M8 16h.01"}]]],G3=["svg",h,[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 14h.01"}],["path",{d:"M15 6h.01"}],["path",{d:"M18 9h.01"}]]],E3=["svg",h,[["path",{d:"M12 3v14"}],["path",{d:"M5 10h14"}],["path",{d:"M5 21h14"}]]],W3=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 12h.01"}]]],I3=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M6 12c0-1.7.7-3.2 1.8-4.2"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M18 12c0 1.7-.7 3.2-1.8 4.2"}]]],X3=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"12",cy:"12",r:"5"}],["path",{d:"M12 12h.01"}]]],N3=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"2"}]]],K3=["svg",h,[["circle",{cx:"12",cy:"6",r:"1"}],["line",{x1:"5",x2:"19",y1:"12",y2:"12"}],["circle",{cx:"12",cy:"18",r:"1"}]]],J3=["svg",h,[["path",{d:"M15 2c-1.35 1.5-2.092 3-2.5 4.5M9 22c1.35-1.5 2.092-3 2.5-4.5"}],["path",{d:"M2 15c3.333-3 6.667-3 10-3m10-3c-1.5 1.35-3 2.092-4.5 2.5"}],["path",{d:"m17 6-2.5-2.5"}],["path",{d:"m14 8-1.5-1.5"}],["path",{d:"m7 18 2.5 2.5"}],["path",{d:"m3.5 14.5.5.5"}],["path",{d:"m20 9 .5.5"}],["path",{d:"m6.5 12.5 1 1"}],["path",{d:"m16.5 10.5 1 1"}],["path",{d:"m10 16 1.5 1.5"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],j3=["svg",h,[["path",{d:"M2 15c6.667-6 13.333 0 20-6"}],["path",{d:"M9 22c1.798-1.998 2.518-3.995 2.807-5.993"}],["path",{d:"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"}],["path",{d:"m17 6-2.5-2.5"}],["path",{d:"m14 8-1-1"}],["path",{d:"m7 18 2.5 2.5"}],["path",{d:"m3.5 14.5.5.5"}],["path",{d:"m20 9 .5.5"}],["path",{d:"m6.5 12.5 1 1"}],["path",{d:"m16.5 10.5 1 1"}],["path",{d:"m10 16 1.5 1.5"}]]],Q3=["svg",h,[["path",{d:"M2 8h20"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M6 16h12"}]]],Y3=["svg",h,[["path",{d:"M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"}],["path",{d:"M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"}],["path",{d:"M8 14v.5"}],["path",{d:"M16 14v.5"}],["path",{d:"M11.25 16.25h1.5L12 17l-.75-.75Z"}],["path",{d:"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"}]]],_3=["svg",h,[["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}]]],ac=["svg",h,[["path",{d:"M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"}],["circle",{cx:"12",cy:"12",r:"3"}]]],hc=["svg",h,[["path",{d:"M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"}],["path",{d:"M2 20h20"}],["path",{d:"M14 12v.01"}]]],tc=["svg",h,[["path",{d:"M13 4h3a2 2 0 0 1 2 2v14"}],["path",{d:"M2 20h3"}],["path",{d:"M13 20h9"}],["path",{d:"M10 12v.01"}],["path",{d:"M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"}]]],dc=["svg",h,[["circle",{cx:"12.1",cy:"12.1",r:"1"}]]],cc=["svg",h,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]]],Mc=["svg",h,[["circle",{cx:"12",cy:"5",r:"2"}],["path",{d:"m3 21 8.02-14.26"}],["path",{d:"m12.99 6.74 1.93 3.44"}],["path",{d:"M19 12c-3.87 4-10.13 4-14 0"}],["path",{d:"m21 21-2.16-3.84"}]]],ec=["svg",h,[["path",{d:"M10 11h.01"}],["path",{d:"M14 6h.01"}],["path",{d:"M18 6h.01"}],["path",{d:"M6.5 13.1h.01"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"}]]],ic=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"}],["path",{d:"M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"}],["path",{d:"M8.56 2.75c4.37 6 6 9.42 8 17.72"}]]],nc=["svg",h,[["path",{d:"M14 9c0 .6-.4 1-1 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9c.6 0 1 .4 1 1Z"}],["path",{d:"M18 6h4"}],["path",{d:"M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3"}],["path",{d:"m5 10-2 8"}],["path",{d:"M12 10v3c0 .6-.4 1-1 1H8"}],["path",{d:"m7 18 2-8"}],["path",{d:"M5 22c-1.7 0-3-1.3-3-3 0-.6.4-1 1-1h7c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1Z"}]]],pc=["svg",h,[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"}]]],lc=["svg",h,[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]]],vc=["svg",h,[["path",{d:"m2 2 8 8"}],["path",{d:"m22 2-8 8"}],["ellipse",{cx:"12",cy:"9",rx:"10",ry:"5"}],["path",{d:"M7 13.4v7.9"}],["path",{d:"M12 14v8"}],["path",{d:"M17 13.4v7.9"}],["path",{d:"M2 9v8a10 5 0 0 0 20 0V9"}]]],oc=["svg",h,[["path",{d:"M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23"}],["path",{d:"m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59"}]]],sc=["svg",h,[["path",{d:"M14.4 14.4 9.6 9.6"}],["path",{d:"M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"}],["path",{d:"m21.5 21.5-1.4-1.4"}],["path",{d:"M3.9 3.9 2.5 2.5"}],["path",{d:"M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"}]]],rc=["svg",h,[["path",{d:"M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46"}],["path",{d:"M6 8.5c0-.75.13-1.47.36-2.14"}],["path",{d:"M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76"}],["path",{d:"M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],gc=["svg",h,[["path",{d:"M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"}],["path",{d:"M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"}]]],yc=["svg",h,[["path",{d:"M7 3.34V5a3 3 0 0 0 3 3"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],["path",{d:"M12 2a10 10 0 1 0 9.54 13"}],["path",{d:"M20 6V4a2 2 0 1 0-4 0v2"}],["rect",{width:"8",height:"5",x:"14",y:"6",rx:"1"}]]],s1=["svg",h,[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],["circle",{cx:"12",cy:"12",r:"10"}]]],$c=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a7 7 0 1 0 10 10"}]]],mc=["svg",h,[["circle",{cx:"11.5",cy:"12.5",r:"3.5"}],["path",{d:"M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"}]]],uc=["svg",h,[["path",{d:"M6.399 6.399C5.362 8.157 4.65 10.189 4.5 12c-.37 4.43 1.27 9.95 7.5 10 3.256-.026 5.259-1.547 6.375-3.625"}],["path",{d:"M19.532 13.875A14.07 14.07 0 0 0 19.5 12c-.36-4.34-3.95-9.96-7.5-10-1.04.012-2.082.502-3.046 1.297"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Cc=["svg",h,[["path",{d:"M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"}]]],r1=["svg",h,[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]]],g1=["svg",h,[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]]],Hc=["svg",h,[["line",{x1:"5",x2:"19",y1:"9",y2:"9"}],["line",{x1:"5",x2:"19",y1:"15",y2:"15"}],["line",{x1:"19",x2:"5",y1:"5",y2:"19"}]]],wc=["svg",h,[["line",{x1:"5",x2:"19",y1:"9",y2:"9"}],["line",{x1:"5",x2:"19",y1:"15",y2:"15"}]]],Vc=["svg",h,[["path",{d:"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"}],["path",{d:"M22 21H7"}],["path",{d:"m5 11 9 9"}]]],Sc=["svg",h,[["path",{d:"M4 10h12"}],["path",{d:"M4 14h9"}],["path",{d:"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"}]]],Ac=["svg",h,[["path",{d:"m21 21-6-6m6 6v-4.8m0 4.8h-4.8"}],["path",{d:"M3 16.2V21m0 0h4.8M3 21l6-6"}],["path",{d:"M21 7.8V3m0 0h-4.8M21 3l-6 6"}],["path",{d:"M3 7.8V3m0 0h4.8M3 3l6 6"}]]],Lc=["svg",h,[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]]],fc=["svg",h,[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],kc=["svg",h,[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],Pc=["svg",h,[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]]],Bc=["svg",h,[["path",{d:"M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M17 18h1"}],["path",{d:"M12 18h1"}],["path",{d:"M7 18h1"}]]],Fc=["svg",h,[["path",{d:"M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"}],["path",{d:"M12 12v.01"}]]],Dc=["svg",h,[["polygon",{points:"13 19 22 12 13 5 13 19"}],["polygon",{points:"2 19 11 12 2 5 2 19"}]]],Zc=["svg",h,[["path",{d:"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"}],["path",{d:"M16 8 2 22"}],["path",{d:"M17.5 15H9"}]]],Rc=["svg",h,[["path",{d:"M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}],["path",{d:"M6 8h4"}],["path",{d:"M6 18h4"}],["path",{d:"m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}],["path",{d:"M14 8h4"}],["path",{d:"M14 18h4"}],["path",{d:"m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}]]],qc=["svg",h,[["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M12 2v4"}],["path",{d:"m6.8 15-3.5 2"}],["path",{d:"m20.7 7-3.5 2"}],["path",{d:"M6.8 9 3.3 7"}],["path",{d:"m20.7 17-3.5-2"}],["path",{d:"m9 22 3-8 3 8"}],["path",{d:"M8 22h8"}],["path",{d:"M18 18.7a9 9 0 1 0-12 0"}]]],Tc=["svg",h,[["path",{d:"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"}],["path",{d:"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"}],["path",{d:"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"}],["path",{d:"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"}],["path",{d:"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"}]]],bc=["svg",h,[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"10",cy:"20",r:"2"}],["path",{d:"M10 7V6"}],["path",{d:"M10 12v-1"}],["path",{d:"M10 18v-2"}]]],xc=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"3",cy:"17",r:"1"}],["path",{d:"M2 17v-3a4 4 0 0 1 8 0v3"}],["circle",{cx:"9",cy:"17",r:"1"}]]],zc=["svg",h,[["path",{d:"M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0"}]]],y1=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m8 18 4-4"}],["path",{d:"M8 10v8h8"}]]],Uc=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m14 12.5 1 5.5-3-1-3 1 1-5.5"}]]],Oc=["svg",h,[["path",{d:"M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}],["path",{d:"M7 16.5 8 22l-3-1-3 1 1-5.5"}]]],Gc=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 18v-1"}],["path",{d:"M12 18v-6"}],["path",{d:"M16 18v-3"}]]],Ec=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 18v-2"}],["path",{d:"M12 18v-4"}],["path",{d:"M16 18v-6"}]]],Wc=["svg",h,[["path",{d:"M14.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M3 13.1a2 2 0 0 0-1 1.76v3.24a2 2 0 0 0 .97 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01Z"}],["path",{d:"M7 17v5"}],["path",{d:"M11.7 14.2 7 17l-4.7-2.8"}]]],Ic=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m3 15 2 2 4-4"}]]],Xc=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m9 15 2 2 4-4"}]]],Nc=["svg",h,[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"8",cy:"16",r:"6"}],["path",{d:"M9.5 17.5 8 16.25V14"}]]],Kc=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m5 12-3 3 3 3"}],["path",{d:"m9 18 3-3-3-3"}]]],Jc=["svg",h,[["path",{d:"M10 12.5 8 15l2 2.5"}],["path",{d:"m14 12.5 2 2.5-2 2.5"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"}]]],$1=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"6",cy:"14",r:"3"}],["path",{d:"M6 10v1"}],["path",{d:"M6 17v1"}],["path",{d:"M10 14H9"}],["path",{d:"M3 14H2"}],["path",{d:"m9 11-.88.88"}],["path",{d:"M3.88 16.12 3 17"}],["path",{d:"m9 17-.88-.88"}],["path",{d:"M3.88 11.88 3 11"}]]],jc=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M9 10h6"}],["path",{d:"M12 13V7"}],["path",{d:"M9 17h6"}]]],Qc=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["rect",{width:"4",height:"6",x:"2",y:"12",rx:"2"}],["path",{d:"M10 12h2v6"}],["path",{d:"M10 18h4"}]]],Yc=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M12 18v-6"}],["path",{d:"m9 15 3 3 3-3"}]]],_c=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10.29 10.7a2.43 2.43 0 0 0-2.66-.52c-.29.12-.56.3-.78.53l-.35.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L6.5 18l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"}]]],a6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"10",cy:"12",r:"2"}],["path",{d:"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"}]]],h6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M2 15h10"}],["path",{d:"m9 18 3-3-3-3"}]]],t6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]]],d6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]]],c6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v6"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"4",cy:"16",r:"2"}],["path",{d:"m10 10-4.5 4.5"}],["path",{d:"m9 11 1 1"}]]],M6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["circle",{cx:"10",cy:"16",r:"2"}],["path",{d:"m16 10-4.5 4.5"}],["path",{d:"m15 11 1 1"}]]],e6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m16 13-3.5 3.5-2-2L8 17"}]]],i6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["rect",{width:"8",height:"5",x:"2",y:"13",rx:"1"}],["path",{d:"M8 13v-2a2 2 0 1 0-4 0v2"}]]],n6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["rect",{width:"8",height:"6",x:"8",y:"12",rx:"1"}],["path",{d:"M10 12v-2a2 2 0 1 1 4 0v2"}]]],p6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M3 15h6"}]]],l6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M9 15h6"}]]],v6=["svg",h,[["circle",{cx:"14",cy:"16",r:"2"}],["circle",{cx:"6",cy:"18",r:"2"}],["path",{d:"M4 12.4V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-7.5"}],["path",{d:"M8 18v-7.7L16 9v7"}]]],o6=["svg",h,[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2"}],["path",{d:"M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6"}],["path",{d:"m5 11-3 3"}],["path",{d:"m5 17-3-3h10"}]]],m1=["svg",h,[["path",{d:"m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"}],["path",{d:"M8 18h1"}],["path",{d:"M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z"}]]],u1=["svg",h,[["path",{d:"M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"}]]],s6=["svg",h,[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5"}],["path",{d:"M4.017 11.512a6 6 0 1 0 8.466 8.475"}],["path",{d:"M8 16v-6a6 6 0 0 1 6 6z"}]]],r6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M3 15h6"}],["path",{d:"M6 12v6"}]]],g6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M9 15h6"}],["path",{d:"M12 18v-6"}]]],y6=["svg",h,[["path",{d:"M12 17h.01"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"}]]],$6=["svg",h,[["path",{d:"M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M16 14a2 2 0 0 0-2 2"}],["path",{d:"M20 14a2 2 0 0 1 2 2"}],["path",{d:"M20 22a2 2 0 0 0 2-2"}],["path",{d:"M16 22a2 2 0 0 1-2-2"}]]],m6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["circle",{cx:"11.5",cy:"14.5",r:"2.5"}],["path",{d:"M13.3 16.3 15 18"}]]],u6=["svg",h,[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"m9 18-1.5-1.5"}],["circle",{cx:"5",cy:"14",r:"3"}]]],C6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 12h8"}],["path",{d:"M10 11v2"}],["path",{d:"M8 17h8"}],["path",{d:"M14 16v2"}]]],H6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 13h2"}],["path",{d:"M14 13h2"}],["path",{d:"M8 17h2"}],["path",{d:"M14 17h2"}]]],w6=["svg",h,[["path",{d:"M21 7h-3a2 2 0 0 1-2-2V2"}],["path",{d:"M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z"}],["path",{d:"M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15"}],["path",{d:"M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"}]]],V6=["svg",h,[["path",{d:"m10 18 3-3-3-3"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"}]]],S6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m8 16 2-2-2-2"}],["path",{d:"M12 18h4"}]]],A6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]]],L6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M2 13v-1h6v1"}],["path",{d:"M5 12v6"}],["path",{d:"M4 18h2"}]]],f6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M9 13v-1h6v1"}],["path",{d:"M12 12v6"}],["path",{d:"M11 18h2"}]]],k6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M12 12v6"}],["path",{d:"m15 15-3-3-3 3"}]]],P6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["rect",{width:"8",height:"6",x:"2",y:"12",rx:"1"}],["path",{d:"m10 15.5 4 2.5v-6l-4 2.5"}]]],B6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m10 11 5 3-5 3v-6Z"}]]],F6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 15h.01"}],["path",{d:"M11.5 13.5a2.5 2.5 0 0 1 0 3"}],["path",{d:"M15 12a5 5 0 0 1 0 6"}]]],D6=["svg",h,[["path",{d:"M11 11a5 5 0 0 1 0 6"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M4.268 21A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"}],["path",{d:"m7 10-3 2H2v4h2l3 2z"}]]],Z6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],R6=["svg",h,[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m8 12.5-5 5"}],["path",{d:"m3 12.5 5 5"}]]],q6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"m14.5 12.5-5 5"}],["path",{d:"m9.5 12.5 5 5"}]]],T6=["svg",h,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}]]],b6=["svg",h,[["path",{d:"M20 7h-3a2 2 0 0 1-2-2V2"}],["path",{d:"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"}],["path",{d:"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"}]]],x6=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 3v18"}],["path",{d:"M3 7.5h4"}],["path",{d:"M3 12h18"}],["path",{d:"M3 16.5h4"}],["path",{d:"M17 3v18"}],["path",{d:"M17 7.5h4"}],["path",{d:"M17 16.5h4"}]]],z6=["svg",h,[["path",{d:"M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"}],["path",{d:"m22 3-5 5"}],["path",{d:"m17 3 5 5"}]]],U6=["svg",h,[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}]]],O6=["svg",h,[["path",{d:"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"}],["path",{d:"M14 13.12c0 2.38 0 6.38-1 8.88"}],["path",{d:"M17.29 21.02c.12-.6.43-2.3.5-3.02"}],["path",{d:"M2 12a10 10 0 0 1 18-6"}],["path",{d:"M2 16h.01"}],["path",{d:"M21.8 16c.2-2 .131-5.354 0-6"}],["path",{d:"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"}],["path",{d:"M8.65 22c.21-.66.45-1.32.57-2"}],["path",{d:"M9 6.8a6 6 0 0 1 9 5.2v2"}]]],G6=["svg",h,[["path",{d:"M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"}],["path",{d:"M9 18h8"}],["path",{d:"M18 3h-3"}],["path",{d:"M11 3a6 6 0 0 0-6 6v11"}],["path",{d:"M5 13h4"}],["path",{d:"M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"}]]],E6=["svg",h,[["path",{d:"M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"}]]],W6=["svg",h,[["path",{d:"M2 16s9-15 20-4C11 23 2 8 2 8"}]]],I6=["svg",h,[["path",{d:"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"}],["path",{d:"M18 12v.5"}],["path",{d:"M16 17.93a9.77 9.77 0 0 1 0-11.86"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"}],["path",{d:"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"}]]],X6=["svg",h,[["path",{d:"M8 2c3 0 5 2 8 2s4-1 4-1v11"}],["path",{d:"M4 22V4"}],["path",{d:"M4 15s1-1 4-1 5 2 8 2"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],N6=["svg",h,[["path",{d:"M17 22V2L7 7l10 5"}]]],K6=["svg",h,[["path",{d:"M7 22V2l10 5-10 5"}]]],J6=["svg",h,[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15"}]]],j6=["svg",h,[["path",{d:"M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"}],["path",{d:"m5 22 14-4"}],["path",{d:"m5 18 14 4"}]]],Q6=["svg",h,[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]]],Y6=["svg",h,[["path",{d:"M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4"}],["path",{d:"M7 2h11v4c0 2-2 2-2 4v1"}],["line",{x1:"11",x2:"18",y1:"6",y2:"6"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],_6=["svg",h,[["path",{d:"M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"}],["line",{x1:"6",x2:"18",y1:"6",y2:"6"}],["line",{x1:"12",x2:"12",y1:"12",y2:"12"}]]],a8=["svg",h,[["path",{d:"M10 10 4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-1.272-2.542"}],["path",{d:"M10 2v2.343"}],["path",{d:"M14 2v6.343"}],["path",{d:"M8.5 2h7"}],["path",{d:"M7 16h9"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],h8=["svg",h,[["path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"}],["path",{d:"M8.5 2h7"}],["path",{d:"M7 16h10"}]]],t8=["svg",h,[["path",{d:"M10 2v7.31"}],["path",{d:"M14 9.3V1.99"}],["path",{d:"M8.5 2h7"}],["path",{d:"M14 9.3a6.5 6.5 0 1 1-4 0"}],["path",{d:"M5.52 16h12.96"}]]],d8=["svg",h,[["path",{d:"m3 7 5 5-5 5V7"}],["path",{d:"m21 7-5 5 5 5V7"}],["path",{d:"M12 20v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 2v2"}]]],c8=["svg",h,[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"}],["path",{d:"M12 20v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 2v2"}]]],M8=["svg",h,[["path",{d:"m17 3-5 5-5-5h10"}],["path",{d:"m17 21-5-5-5 5h10"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}]]],e8=["svg",h,[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}]]],i8=["svg",h,[["path",{d:"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M12 10v12"}],["path",{d:"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"}],["path",{d:"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"}]]],n8=["svg",h,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"}],["path",{d:"M12 7.5V9"}],["path",{d:"M7.5 12H9"}],["path",{d:"M16.5 12H15"}],["path",{d:"M12 16.5V15"}],["path",{d:"m8 8 1.88 1.88"}],["path",{d:"M14.12 9.88 16 8"}],["path",{d:"m8 16 1.88-1.88"}],["path",{d:"M14.12 14.12 16 16"}]]],p8=["svg",h,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]]],l8=["svg",h,[["path",{d:"M2 12h6"}],["path",{d:"M22 12h-6"}],["path",{d:"M12 2v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 20v2"}],["path",{d:"m19 9-3 3 3 3"}],["path",{d:"m5 15 3-3-3-3"}]]],v8=["svg",h,[["path",{d:"M12 22v-6"}],["path",{d:"M12 8V2"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}],["path",{d:"m15 19-3-3-3 3"}],["path",{d:"m15 5-3 3-3-3"}]]],o8=["svg",h,[["circle",{cx:"15",cy:"19",r:"2"}],["path",{d:"M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"}],["path",{d:"M15 11v-1"}],["path",{d:"M15 17v-2"}]]],s8=["svg",h,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"m9 13 2 2 4-4"}]]],r8=["svg",h,[["circle",{cx:"16",cy:"16",r:"6"}],["path",{d:"M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"}],["path",{d:"M16 14v2l1 1"}]]],g8=["svg",h,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M2 10h20"}]]],C1=["svg",h,[["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3"}],["path",{d:"m21.7 19.4-.9-.3"}],["path",{d:"m15.2 16.9-.9-.3"}],["path",{d:"m16.6 21.7.3-.9"}],["path",{d:"m19.1 15.2.3-.9"}],["path",{d:"m19.6 21.7-.4-1"}],["path",{d:"m16.8 15.3-.4-1"}],["path",{d:"m14.3 19.6 1-.4"}],["path",{d:"m20.7 16.8 1-.4"}]]],y8=["svg",h,[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["circle",{cx:"12",cy:"13",r:"1"}]]],$8=["svg",h,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M12 10v6"}],["path",{d:"m15 13-3 3-3-3"}]]],m8=["svg",h,[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"}],["circle",{cx:"13",cy:"12",r:"2"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8"}],["circle",{cx:"20",cy:"19",r:"2"}]]],u8=["svg",h,[["circle",{cx:"12",cy:"13",r:"2"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M14 13h3"}],["path",{d:"M7 13h3"}]]],C8=["svg",h,[["path",{d:"M11 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.5"}],["path",{d:"M13.9 17.45c-1.2-1.2-1.14-2.8-.2-3.73a2.43 2.43 0 0 1 3.44 0l.36.34.34-.34a2.43 2.43 0 0 1 3.45-.01v0c.95.95 1 2.53-.2 3.74L17.5 21Z"}]]],H8=["svg",h,[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]]],w8=["svg",h,[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["path",{d:"M8 10v4"}],["path",{d:"M12 10v2"}],["path",{d:"M16 10v6"}]]],V8=["svg",h,[["circle",{cx:"16",cy:"20",r:"2"}],["path",{d:"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2"}],["path",{d:"m22 14-4.5 4.5"}],["path",{d:"m21 15 1 1"}]]],S8=["svg",h,[["rect",{width:"8",height:"5",x:"14",y:"17",rx:"1"}],["path",{d:"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5"}],["path",{d:"M20 17v-2a2 2 0 1 0-4 0v2"}]]],A8=["svg",h,[["path",{d:"M9 13h6"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]]],L8=["svg",h,[["path",{d:"m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"}],["circle",{cx:"14",cy:"15",r:"1"}]]],f8=["svg",h,[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]]],k8=["svg",h,[["path",{d:"M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5"}],["path",{d:"M2 13h10"}],["path",{d:"m5 10-3 3 3 3"}]]],H1=["svg",h,[["path",{d:"M8.4 10.6a2 2 0 0 1 3 3L6 19l-4 1 1-4Z"}],["path",{d:"M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"}]]],P8=["svg",h,[["path",{d:"M12 10v6"}],["path",{d:"M9 13h6"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]]],B8=["svg",h,[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["circle",{cx:"12",cy:"13",r:"2"}],["path",{d:"M12 15v5"}]]],F8=["svg",h,[["circle",{cx:"11.5",cy:"12.5",r:"2.5"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M13.3 14.3 15 16"}]]],D8=["svg",h,[["circle",{cx:"17",cy:"17",r:"3"}],["path",{d:"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1"}],["path",{d:"m21 21-1.5-1.5"}]]],Z8=["svg",h,[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"}],["path",{d:"m8 16 3-3-3-3"}]]],R8=["svg",h,[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5"}],["path",{d:"M12 10v4h4"}],["path",{d:"m12 14 1.535-1.605a5 5 0 0 1 8 1.5"}],["path",{d:"M22 22v-4h-4"}],["path",{d:"m22 18-1.535 1.605a5 5 0 0 1-8-1.5"}]]],q8=["svg",h,[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3"}]]],T8=["svg",h,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M12 10v6"}],["path",{d:"m9 13 3-3 3 3"}]]],b8=["svg",h,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"m9.5 10.5 5 5"}],["path",{d:"m14.5 10.5-5 5"}]]],x8=["svg",h,[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]]],z8=["svg",h,[["path",{d:"M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z"}],["path",{d:"M2 8v11a2 2 0 0 0 2 2h14"}]]],U8=["svg",h,[["path",{d:"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"}],["path",{d:"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"}],["path",{d:"M16 17h4"}],["path",{d:"M4 13h4"}]]],O8=["svg",h,[["path",{d:"M12 12H5a2 2 0 0 0-2 2v5"}],["circle",{cx:"13",cy:"19",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}],["path",{d:"M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5"}]]],G8=["svg",h,[["polyline",{points:"15 17 20 12 15 7"}],["path",{d:"M4 18v-2a4 4 0 0 1 4-4h12"}]]],E8=["svg",h,[["line",{x1:"22",x2:"2",y1:"6",y2:"6"}],["line",{x1:"22",x2:"2",y1:"18",y2:"18"}],["line",{x1:"6",x2:"6",y1:"2",y2:"22"}],["line",{x1:"18",x2:"18",y1:"2",y2:"22"}]]],W8=["svg",h,[["path",{d:"M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7"}]]],I8=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]],X8=["svg",h,[["line",{x1:"3",x2:"15",y1:"22",y2:"22"}],["line",{x1:"4",x2:"14",y1:"9",y2:"9"}],["path",{d:"M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"}],["path",{d:"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"}]]],N8=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["rect",{width:"10",height:"8",x:"7",y:"8",rx:"1"}]]],K8=["svg",h,[["path",{d:"M2 7v10"}],["path",{d:"M6 5v14"}],["rect",{width:"12",height:"18",x:"10",y:"3",rx:"2"}]]],J8=["svg",h,[["path",{d:"M2 3v18"}],["rect",{width:"12",height:"18",x:"6",y:"3",rx:"2"}],["path",{d:"M22 3v18"}]]],j8=["svg",h,[["rect",{width:"18",height:"14",x:"3",y:"3",rx:"2"}],["path",{d:"M4 21h1"}],["path",{d:"M9 21h1"}],["path",{d:"M14 21h1"}],["path",{d:"M19 21h1"}]]],Q8=["svg",h,[["path",{d:"M7 2h10"}],["path",{d:"M5 6h14"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2"}]]],Y8=["svg",h,[["path",{d:"M3 2h18"}],["rect",{width:"18",height:"12",x:"3",y:"6",rx:"2"}],["path",{d:"M3 22h18"}]]],_8=["svg",h,[["line",{x1:"6",x2:"10",y1:"11",y2:"11"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"}]]],a7=["svg",h,[["line",{x1:"6",x2:"10",y1:"12",y2:"12"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14"}],["line",{x1:"15",x2:"15.01",y1:"13",y2:"13"}],["line",{x1:"18",x2:"18.01",y1:"11",y2:"11"}],["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}]]],h7=["svg",h,[["path",{d:"M8 6h10"}],["path",{d:"M6 12h9"}],["path",{d:"M11 18h7"}]]],t7=["svg",h,[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]]],d7=["svg",h,[["path",{d:"m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"}],["path",{d:"m16 16 6-6"}],["path",{d:"m8 8 6-6"}],["path",{d:"m9 7 8 8"}],["path",{d:"m21 11-8-8"}]]],c7=["svg",h,[["path",{d:"M6 3h12l4 6-10 13L2 9Z"}],["path",{d:"M11 3 8 9l4 13 4-13-3-6"}],["path",{d:"M2 9h20"}]]],M7=["svg",h,[["path",{d:"M9 10h.01"}],["path",{d:"M15 10h.01"}],["path",{d:"M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"}]]],e7=["svg",h,[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1"}],["path",{d:"M12 8v13"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"}]]],i7=["svg",h,[["path",{d:"M6 3v12"}],["path",{d:"M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}],["path",{d:"M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}],["path",{d:"M15 6a9 9 0 0 0-9 9"}],["path",{d:"M18 15v6"}],["path",{d:"M21 18h-6"}]]],n7=["svg",h,[["line",{x1:"6",x2:"6",y1:"3",y2:"15"}],["circle",{cx:"18",cy:"6",r:"3"}],["circle",{cx:"6",cy:"18",r:"3"}],["path",{d:"M18 9a9 9 0 0 1-9 9"}]]],w1=["svg",h,[["circle",{cx:"12",cy:"12",r:"3"}],["line",{x1:"3",x2:"9",y1:"12",y2:"12"}],["line",{x1:"15",x2:"21",y1:"12",y2:"12"}]]],p7=["svg",h,[["path",{d:"M12 3v6"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M12 15v6"}]]],l7=["svg",h,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]]],v7=["svg",h,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9"}]]],o7=["svg",h,[["circle",{cx:"12",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["circle",{cx:"18",cy:"6",r:"3"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"}],["path",{d:"M12 12v3"}]]],s7=["svg",h,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M5 9v6"}],["circle",{cx:"5",cy:"18",r:"3"}],["path",{d:"M12 3v18"}],["circle",{cx:"19",cy:"6",r:"3"}],["path",{d:"M16 15.7A9 9 0 0 0 19 9"}]]],r7=["svg",h,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M6 21V9a9 9 0 0 0 9 9"}]]],g7=["svg",h,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M5 9v12"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"m15 9-3-3 3-3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}]]],y7=["svg",h,[["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M6 9v12"}],["path",{d:"m21 3-6 6"}],["path",{d:"m21 9-6-6"}],["path",{d:"M18 11.5V15"}],["circle",{cx:"18",cy:"18",r:"3"}]]],$7=["svg",h,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M5 9v12"}],["path",{d:"m15 9-3-3 3-3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v3"}],["path",{d:"M19 15v6"}],["path",{d:"M22 18h-6"}]]],m7=["svg",h,[["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M6 9v12"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v3"}],["path",{d:"M18 15v6"}],["path",{d:"M21 18h-6"}]]],u7=["svg",h,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M18 6V5"}],["path",{d:"M18 11v-1"}],["line",{x1:"6",x2:"6",y1:"9",y2:"21"}]]],C7=["svg",h,[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}],["line",{x1:"6",x2:"6",y1:"9",y2:"21"}]]],H7=["svg",h,[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]]],w7=["svg",h,[["path",{d:"m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"}]]],V7=["svg",h,[["path",{d:"M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"}],["path",{d:"M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"}]]],S7=["svg",h,[["circle",{cx:"6",cy:"15",r:"4"}],["circle",{cx:"18",cy:"15",r:"4"}],["path",{d:"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"}],["path",{d:"M2.5 13 5 7c.7-1.3 1.4-2 3-2"}],["path",{d:"M21.5 13 19 7c-.7-1.3-1.5-2-3-2"}]]],A7=["svg",h,[["path",{d:"M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"}],["path",{d:"M2 12h8.5"}],["path",{d:"M20 6V4a2 2 0 1 0-4 0v2"}],["rect",{width:"8",height:"5",x:"14",y:"6",rx:"1"}]]],L7=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]]],f7=["svg",h,[["path",{d:"M12 13V2l8 4-8 4"}],["path",{d:"M20.561 10.222a9 9 0 1 1-12.55-5.29"}],["path",{d:"M8.002 9.997a5 5 0 1 0 8.9 2.02"}]]],k7=["svg",h,[["path",{d:"M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4"}],["path",{d:"M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"}],["path",{d:"M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"}],["path",{d:"M6 14v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"}],["path",{d:"M18 11v0a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"}]]],P7=["svg",h,[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"}],["path",{d:"M22 10v6"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5"}]]],B7=["svg",h,[["path",{d:"M22 5V2l-5.89 5.89"}],["circle",{cx:"16.6",cy:"15.89",r:"3"}],["circle",{cx:"8.11",cy:"7.4",r:"3"}],["circle",{cx:"12.35",cy:"11.65",r:"3"}],["circle",{cx:"13.91",cy:"5.85",r:"3"}],["circle",{cx:"18.15",cy:"10.09",r:"3"}],["circle",{cx:"6.56",cy:"13.2",r:"3"}],["circle",{cx:"10.8",cy:"17.44",r:"3"}],["circle",{cx:"5",cy:"19",r:"3"}]]],F7=["svg",h,[["path",{d:"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"}],["path",{d:"m16 19 2 2 4-4"}]]],D7=["svg",h,[["path",{d:"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"}],["path",{d:"m16 16 5 5"}],["path",{d:"m16 21 5-5"}]]],V1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 12h18"}],["path",{d:"M12 3v18"}]]],p=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}],["path",{d:"M9 3v18"}],["path",{d:"M15 3v18"}]]],Z7=["svg",h,[["circle",{cx:"12",cy:"9",r:"1"}],["circle",{cx:"19",cy:"9",r:"1"}],["circle",{cx:"5",cy:"9",r:"1"}],["circle",{cx:"12",cy:"15",r:"1"}],["circle",{cx:"19",cy:"15",r:"1"}],["circle",{cx:"5",cy:"15",r:"1"}]]],R7=["svg",h,[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]]],q7=["svg",h,[["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"19",cy:"5",r:"1"}],["circle",{cx:"5",cy:"5",r:"1"}],["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}],["circle",{cx:"19",cy:"19",r:"1"}],["circle",{cx:"5",cy:"19",r:"1"}]]],T7=["svg",h,[["path",{d:"M3 7V5c0-1.1.9-2 2-2h2"}],["path",{d:"M17 3h2c1.1 0 2 .9 2 2v2"}],["path",{d:"M21 17v2c0 1.1-.9 2-2 2h-2"}],["path",{d:"M7 21H5c-1.1 0-2-.9-2-2v-2"}],["rect",{width:"7",height:"5",x:"7",y:"7",rx:"1"}],["rect",{width:"7",height:"5",x:"10",y:"12",rx:"1"}]]],b7=["svg",h,[["path",{d:"m20 7 1.7-1.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L17 4v3Z"}],["path",{d:"m17 7-5.1 5.1"}],["circle",{cx:"11.5",cy:"12.5",r:".5",fill:"currentColor"}],["path",{d:"M6 12a2 2 0 0 0 1.8-1.2l.4-.9C8.7 8.8 9.8 8 11 8c2.8 0 5 2.2 5 5 0 1.2-.8 2.3-1.9 2.8l-.9.4A2 2 0 0 0 12 18a4 4 0 0 1-4 4c-3.3 0-6-2.7-6-6a4 4 0 0 1 4-4"}],["path",{d:"m6 16 2 2"}]]],x7=["svg",h,[["path",{d:"M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856"}],["path",{d:"M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288"}],["path",{d:"M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"}],["path",{d:"m8.5 16.5-1-1"}]]],z7=["svg",h,[["path",{d:"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"}],["path",{d:"m18 15 4-4"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]]],U7=["svg",h,[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{d:"m2 16 6 6"}],["circle",{cx:"16",cy:"9",r:"2.9"}],["circle",{cx:"6",cy:"5",r:"3"}]]],O7=["svg",h,[["path",{d:"M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"}],["path",{d:"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{d:"m2 15 6 6"}],["path",{d:"M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"}]]],S1=["svg",h,[["path",{d:"M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"}],["path",{d:"m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{d:"m2 13 6 6"}]]],G7=["svg",h,[["path",{d:"M18 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4"}],["path",{d:"M14 11V9a2 2 0 1 0-4 0v2"}],["path",{d:"M10 10.5V5a2 2 0 1 0-4 0v9"}],["path",{d:"m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"}]]],E7=["svg",h,[["path",{d:"M12 3V2"}],["path",{d:"M5 10a7.1 7.1 0 0 1 14 0"}],["path",{d:"M4 10h16"}],["path",{d:"M2 14h12a2 2 0 1 1 0 4h-2"}],["path",{d:"m15.4 17.4 3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18"}],["path",{d:"M5 14v7H2"}]]],W7=["svg",h,[["path",{d:"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]]],I7=["svg",h,[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"}],["path",{d:"m21 3 1 11h-2"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"}],["path",{d:"M3 4h8"}]]],X7=["svg",h,[["path",{d:"M12 2v8"}],["path",{d:"m16 6-4 4-4-4"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 18h.01"}]]],N7=["svg",h,[["path",{d:"m16 6-4-4-4 4"}],["path",{d:"M12 2v8"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 18h.01"}]]],K7=["svg",h,[["line",{x1:"22",x2:"2",y1:"12",y2:"12"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16"}]]],J7=["svg",h,[["path",{d:"M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"}],["path",{d:"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"}],["path",{d:"M4 15v-3a6 6 0 0 1 6-6h0"}],["path",{d:"M14 6h0a6 6 0 0 1 6 6v3"}]]],j7=["svg",h,[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]]],Q7=["svg",h,[["path",{d:"m5.2 6.2 1.4 1.4"}],["path",{d:"M2 13h2"}],["path",{d:"M20 13h2"}],["path",{d:"m17.4 7.6 1.4-1.4"}],["path",{d:"M22 17H2"}],["path",{d:"M22 21H2"}],["path",{d:"M16 13a4 4 0 0 0-8 0"}],["path",{d:"M12 5V2.5"}]]],Y7=["svg",h,[["path",{d:"M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z"}],["path",{d:"M7.5 12h9"}]]],_7=["svg",h,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"m17 12 3-2v8"}]]],aM=["svg",h,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"}]]],hM=["svg",h,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"}],["path",{d:"M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"}]]],tM=["svg",h,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M17 10v4h4"}],["path",{d:"M21 10v8"}]]],dM=["svg",h,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["path",{d:"M17 13v-3h4"}],["path",{d:"M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17"}]]],cM=["svg",h,[["path",{d:"M4 12h8"}],["path",{d:"M4 18V6"}],["path",{d:"M12 18V6"}],["circle",{cx:"19",cy:"16",r:"2"}],["path",{d:"M20 10c-2 2-3 3.5-3 6"}]]],MM=["svg",h,[["path",{d:"M6 12h12"}],["path",{d:"M6 20V4"}],["path",{d:"M18 20V4"}]]],eM=["svg",h,[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]]],iM=["svg",h,[["path",{d:"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"}],["path",{d:"M21 16v2a4 4 0 0 1-4 4h-5"}]]],nM=["svg",h,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["path",{d:"m12 13-1-1 2-2-3-3 2-2"}]]],pM=["svg",h,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["path",{d:"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"}],["path",{d:"m18 15-2-2"}],["path",{d:"m15 18-2-2"}]]],lM=["svg",h,[["line",{x1:"2",y1:"2",x2:"22",y2:"22"}],["path",{d:"M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35"}],["path",{d:"M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17"}]]],vM=["svg",h,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"}]]],oM=["svg",h,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}]]],sM=["svg",h,[["path",{d:"M11 8c2-3-2-3 0-6"}],["path",{d:"M15.5 8c2-3-2-3 0-6"}],["path",{d:"M6 10h.01"}],["path",{d:"M6 14h.01"}],["path",{d:"M10 16v-4"}],["path",{d:"M14 16v-4"}],["path",{d:"M18 16v-4"}],["path",{d:"M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"}],["path",{d:"M5 20v2"}],["path",{d:"M19 20v2"}]]],rM=["svg",h,[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}]]],gM=["svg",h,[["path",{d:"m9 11-6 6v3h9l3-3"}],["path",{d:"m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"}]]],yM=["svg",h,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]]],$M=["svg",h,[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],["polyline",{points:"9 22 9 12 15 12 15 22"}]]],mM=["svg",h,[["path",{d:"M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27"}],["path",{d:"M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28"}],["path",{d:"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26"}],["path",{d:"M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25"}],["path",{d:"M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75"}],["path",{d:"M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24"}],["path",{d:"M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28"}],["path",{d:"M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05"}],["path",{d:"m2 2 20 20"}]]],uM=["svg",h,[["path",{d:"M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18"}],["path",{d:"M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88"}],["path",{d:"M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36"}],["path",{d:"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87"}],["path",{d:"M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08"}],["path",{d:"M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57"}],["path",{d:"M4.93 4.93 3 3a.7.7 0 0 1 0-1"}],["path",{d:"M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"}]]],CM=["svg",h,[["path",{d:"M12 6v4"}],["path",{d:"M14 14h-4"}],["path",{d:"M14 18h-4"}],["path",{d:"M14 8h-4"}],["path",{d:"M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"}],["path",{d:"M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"}]]],HM=["svg",h,[["path",{d:"M10 22v-6.57"}],["path",{d:"M12 11h.01"}],["path",{d:"M12 7h.01"}],["path",{d:"M14 15.43V22"}],["path",{d:"M15 16a5 5 0 0 0-6 0"}],["path",{d:"M16 11h.01"}],["path",{d:"M16 7h.01"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 7h.01"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2"}]]],wM=["svg",h,[["path",{d:"M5 22h14"}],["path",{d:"M5 2h14"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"}]]],A1=["svg",h,[["path",{d:"M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0"}],["path",{d:"M12.14 11a3.5 3.5 0 1 1 6.71 0"}],["path",{d:"M15.5 6.5a3.5 3.5 0 1 0-7 0"}]]],L1=["svg",h,[["path",{d:"m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"}],["path",{d:"M17 7A5 5 0 0 0 7 7"}],["path",{d:"M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"}]]],VM=["svg",h,[["path",{d:"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"}],["path",{d:"m14 19 3 3v-5.5"}],["path",{d:"m17 22 3-3"}],["circle",{cx:"9",cy:"9",r:"2"}]]],SM=["svg",h,[["path",{d:"M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]]],AM=["svg",h,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9"}]]],LM=["svg",h,[["path",{d:"m11 16-5 5"}],["path",{d:"M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6.5"}],["path",{d:"M15.765 22a.5.5 0 0 1-.765-.424V13.38a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"}],["circle",{cx:"9",cy:"9",r:"2"}]]],fM=["svg",h,[["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5"}],["line",{x1:"19",x2:"19",y1:"2",y2:"8"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]]],kM=["svg",h,[["path",{d:"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"}],["path",{d:"m14 19.5 3-3 3 3"}],["path",{d:"M17 22v-5.5"}],["circle",{cx:"9",cy:"9",r:"2"}]]],PM=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]]],BM=["svg",h,[["path",{d:"M18 22H4a2 2 0 0 1-2-2V6"}],["path",{d:"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"}],["circle",{cx:"12",cy:"8",r:"2"}],["rect",{width:"16",height:"16",x:"6",y:"2",rx:"2"}]]],FM=["svg",h,[["path",{d:"M12 3v12"}],["path",{d:"m8 11 4 4 4-4"}],["path",{d:"M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"}]]],DM=["svg",h,[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}]]],f1=["svg",h,[["polyline",{points:"7 8 3 12 7 16"}],["line",{x1:"21",x2:"11",y1:"12",y2:"12"}],["line",{x1:"21",x2:"11",y1:"6",y2:"6"}],["line",{x1:"21",x2:"11",y1:"18",y2:"18"}]]],k1=["svg",h,[["polyline",{points:"3 8 7 12 3 16"}],["line",{x1:"21",x2:"11",y1:"12",y2:"12"}],["line",{x1:"21",x2:"11",y1:"6",y2:"6"}],["line",{x1:"21",x2:"11",y1:"18",y2:"18"}]]],ZM=["svg",h,[["path",{d:"M6 3h12"}],["path",{d:"M6 8h12"}],["path",{d:"m6 13 8.5 8"}],["path",{d:"M6 13h3"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10"}]]],RM=["svg",h,[["path",{d:"M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"}]]],qM=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]],TM=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 7h.01"}],["path",{d:"M17 7h.01"}],["path",{d:"M7 17h.01"}],["path",{d:"M17 17h.01"}]]],bM=["svg",h,[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]]],xM=["svg",h,[["line",{x1:"19",x2:"10",y1:"4",y2:"4"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20"}]]],zM=["svg",h,[["path",{d:"M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8"}],["polyline",{points:"16 14 20 18 16 22"}]]],UM=["svg",h,[["path",{d:"M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8H4"}],["polyline",{points:"8 22 4 18 8 14"}]]],OM=["svg",h,[["path",{d:"M12 9.5V21m0-11.5L6 3m6 6.5L18 3"}],["path",{d:"M6 15h12"}],["path",{d:"M6 11h12"}]]],GM=["svg",h,[["path",{d:"M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z"}],["path",{d:"M6 15v-2"}],["path",{d:"M12 15V9"}],["circle",{cx:"12",cy:"6",r:"3"}]]],EM=["svg",h,[["path",{d:"M6 5v11"}],["path",{d:"M12 5v6"}],["path",{d:"M18 5v14"}]]],WM=["svg",h,[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}]]],IM=["svg",h,[["path",{d:"M12.4 2.7c.9-.9 2.5-.9 3.4 0l5.5 5.5c.9.9.9 2.5 0 3.4l-3.7 3.7c-.9.9-2.5.9-3.4 0L8.7 9.8c-.9-.9-.9-2.5 0-3.4Z"}],["path",{d:"m14 7 3 3"}],["path",{d:"M9.4 10.6 2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4"}]]],XM=["svg",h,[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"}],["path",{d:"m21 2-9.6 9.6"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5"}]]],NM=["svg",h,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M6 8h4"}],["path",{d:"M14 8h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M2 12h20"}],["path",{d:"M6 12v4"}],["path",{d:"M10 12v4"}],["path",{d:"M14 12v4"}],["path",{d:"M18 12v4"}]]],KM=["svg",h,[["path",{d:"M 20 4 A2 2 0 0 1 22 6"}],["path",{d:"M 22 6 L 22 16.41"}],["path",{d:"M 7 16 L 16 16"}],["path",{d:"M 9.69 4 L 20 4"}],["path",{d:"M14 8h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"m2 2 20 20"}],["path",{d:"M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"}],["path",{d:"M6 8h.01"}],["path",{d:"M8 12h.01"}]]],JM=["svg",h,[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]]],jM=["svg",h,[["path",{d:"M12 2v5"}],["path",{d:"M6 7h12l4 9H2l4-9Z"}],["path",{d:"M9.17 16a3 3 0 1 0 5.66 0"}]]],QM=["svg",h,[["path",{d:"m14 5-3 3 2 7 8-8-7-2Z"}],["path",{d:"m14 5-3 3-3-3 3-3 3 3Z"}],["path",{d:"M9.5 6.5 4 12l3 6"}],["path",{d:"M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"}]]],YM=["svg",h,[["path",{d:"M9 2h6l3 7H6l3-7Z"}],["path",{d:"M12 9v13"}],["path",{d:"M9 22h6"}]]],_M=["svg",h,[["path",{d:"M11 13h6l3 7H8l3-7Z"}],["path",{d:"M14 13V8a2 2 0 0 0-2-2H8"}],["path",{d:"M4 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4v6Z"}]]],ae=["svg",h,[["path",{d:"M11 4h6l3 7H8l3-7Z"}],["path",{d:"M14 11v5a2 2 0 0 1-2 2H8"}],["path",{d:"M4 15h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4v-6Z"}]]],he=["svg",h,[["path",{d:"M8 2h8l4 10H4L8 2Z"}],["path",{d:"M12 12v6"}],["path",{d:"M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z"}]]],te=["svg",h,[["path",{d:"m12 8 6-3-6-3v10"}],["path",{d:"m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"}],["path",{d:"m6.49 12.85 11.02 6.3"}],["path",{d:"M17.51 12.85 6.5 19.15"}]]],de=["svg",h,[["line",{x1:"3",x2:"21",y1:"22",y2:"22"}],["line",{x1:"6",x2:"6",y1:"18",y2:"11"}],["line",{x1:"10",x2:"10",y1:"18",y2:"11"}],["line",{x1:"14",x2:"14",y1:"18",y2:"11"}],["line",{x1:"18",x2:"18",y1:"18",y2:"11"}],["polygon",{points:"12 2 20 7 4 7"}]]],ce=["svg",h,[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]]],P1=["svg",h,[["rect",{width:"18",height:"12",x:"3",y:"4",rx:"2",ry:"2"}],["line",{x1:"2",x2:"22",y1:"20",y2:"20"}]]],Me=["svg",h,[["path",{d:"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"}]]],ee=["svg",h,[["path",{d:"M7 22a5 5 0 0 1-2-4"}],["path",{d:"M7 16.93c.96.43 1.96.74 2.99.91"}],["path",{d:"M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"}],["path",{d:"M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}],["path",{d:"M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14v0z"}]]],ie=["svg",h,[["path",{d:"M7 22a5 5 0 0 1-2-4"}],["path",{d:"M3.3 14A6.8 6.8 0 0 1 2 10c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8a12 12 0 0 1-5-1"}],["path",{d:"M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}]]],ne=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]],pe=["svg",h,[["path",{d:"m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12"}],["path",{d:"M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z"}]]],le=["svg",h,[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"}],["path",{d:"m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"}],["path",{d:"m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"}]]],ve=["svg",h,[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"}]]],oe=["svg",h,[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1"}]]],se=["svg",h,[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]]],re=["svg",h,[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}],["path",{d:"M14 4h7"}],["path",{d:"M14 9h7"}],["path",{d:"M14 15h7"}],["path",{d:"M14 20h7"}]]],ge=["svg",h,[["rect",{width:"7",height:"18",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}]]],ye=["svg",h,[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}]]],$e=["svg",h,[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1"}]]],me=["svg",h,[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"}]]],ue=["svg",h,[["path",{d:"M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"}],["path",{d:"M2 22 17 7"}]]],Ce=["svg",h,[["path",{d:"M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3"}],["path",{d:"M18 6V3a1 1 0 0 0-1-1h-3"}],["rect",{width:"8",height:"12",x:"8",y:"10",rx:"1"}]]],He=["svg",h,[["rect",{width:"8",height:"18",x:"3",y:"3",rx:"1"}],["path",{d:"M7 3v18"}],["path",{d:"M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"}]]],we=["svg",h,[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]]],Ve=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m4.93 4.93 4.24 4.24"}],["path",{d:"m14.83 9.17 4.24-4.24"}],["path",{d:"m14.83 14.83 4.24 4.24"}],["path",{d:"m9.17 14.83-4.24 4.24"}],["circle",{cx:"12",cy:"12",r:"4"}]]],Se=["svg",h,[["path",{d:"M8 20V8c0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.5 2"}],["path",{d:"M6 12h4"}],["path",{d:"M14 12h2v8"}],["path",{d:"M6 20h4"}],["path",{d:"M14 20h4"}]]],Ae=["svg",h,[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5"}],["path",{d:"m2 2 20 20"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]]],Le=["svg",h,[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]]],fe=["svg",h,[["path",{d:"M3 3v18h18"}],["path",{d:"m19 9-5 5-4-4-3 3"}]]],ke=["svg",h,[["path",{d:"M9 17H7A5 5 0 0 1 7 7"}],["path",{d:"M15 7h2a5 5 0 0 1 4 8"}],["line",{x1:"8",x2:"12",y1:"12",y2:"12"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Pe=["svg",h,[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]]],Be=["svg",h,[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]]],Fe=["svg",h,[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]]],De=["svg",h,[["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}],["path",{d:"M13 6h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 18h8"}]]],Ze=["svg",h,[["path",{d:"m3 10 2.5-2.5L3 5"}],["path",{d:"m3 19 2.5-2.5L3 14"}],["path",{d:"M10 6h11"}],["path",{d:"M10 12h11"}],["path",{d:"M10 18h11"}]]],Re=["svg",h,[["path",{d:"M16 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M10 18H3"}],["path",{d:"M21 6v10a2 2 0 0 1-2 2h-5"}],["path",{d:"m16 16-2 2 2 2"}]]],qe=["svg",h,[["path",{d:"M3 6h18"}],["path",{d:"M7 12h10"}],["path",{d:"M10 18h4"}]]],Te=["svg",h,[["path",{d:"M11 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M16 18H3"}],["path",{d:"M21 12h-6"}]]],be=["svg",h,[["path",{d:"M21 15V6"}],["path",{d:"M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"}],["path",{d:"M12 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M12 18H3"}]]],xe=["svg",h,[["line",{x1:"10",x2:"21",y1:"6",y2:"6"}],["line",{x1:"10",x2:"21",y1:"12",y2:"12"}],["line",{x1:"10",x2:"21",y1:"18",y2:"18"}],["path",{d:"M4 6h1v4"}],["path",{d:"M4 10h2"}],["path",{d:"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"}]]],ze=["svg",h,[["path",{d:"M11 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M16 18H3"}],["path",{d:"M18 9v6"}],["path",{d:"M21 12h-6"}]]],Ue=["svg",h,[["path",{d:"M21 6H3"}],["path",{d:"M7 12H3"}],["path",{d:"M7 18H3"}],["path",{d:"M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"}],["path",{d:"M11 10v4h4"}]]],Oe=["svg",h,[["path",{d:"M16 12H3"}],["path",{d:"M16 18H3"}],["path",{d:"M10 6H3"}],["path",{d:"M21 18V8a2 2 0 0 0-2-2h-5"}],["path",{d:"m16 8-2-2 2-2"}]]],Ge=["svg",h,[["rect",{x:"3",y:"5",width:"6",height:"6",rx:"1"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"M13 6h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 18h8"}]]],Ee=["svg",h,[["path",{d:"M21 12h-8"}],["path",{d:"M21 6H8"}],["path",{d:"M21 18h-8"}],["path",{d:"M3 6v4c0 1.1.9 2 2 2h3"}],["path",{d:"M3 10v6c0 1.1.9 2 2 2h3"}]]],We=["svg",h,[["path",{d:"M12 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M12 18H3"}],["path",{d:"m16 12 5 3-5 3v-6Z"}]]],Ie=["svg",h,[["path",{d:"M11 12H3"}],["path",{d:"M16 6H3"}],["path",{d:"M16 18H3"}],["path",{d:"m19 10-4 4"}],["path",{d:"m15 10 4 4"}]]],Xe=["svg",h,[["line",{x1:"8",x2:"21",y1:"6",y2:"6"}],["line",{x1:"8",x2:"21",y1:"12",y2:"12"}],["line",{x1:"8",x2:"21",y1:"18",y2:"18"}],["line",{x1:"3",x2:"3.01",y1:"6",y2:"6"}],["line",{x1:"3",x2:"3.01",y1:"12",y2:"12"}],["line",{x1:"3",x2:"3.01",y1:"18",y2:"18"}]]],B1=["svg",h,[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56"}]]],Ne=["svg",h,[["path",{d:"M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5"}],["path",{d:"M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"}],["path",{d:"M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"}],["circle",{cx:"12",cy:"12",r:"10"}]]],Ke=["svg",h,[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]]],Je=["svg",h,[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["circle",{cx:"12",cy:"12",r:"7"}],["circle",{cx:"12",cy:"12",r:"3"}]]],je=["svg",h,[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["path",{d:"M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11"}],["path",{d:"M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Qe=["svg",h,[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["circle",{cx:"12",cy:"12",r:"7"}]]],F1=["svg",h,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 9.33-2.5"}]]],Ye=["svg",h,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]],D1=["svg",h,[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1"}]]],_e=["svg",h,[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]]],ai=["svg",h,[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}],["polyline",{points:"10 17 15 12 10 7"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12"}]]],hi=["svg",h,[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}],["polyline",{points:"16 17 21 12 16 7"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12"}]]],ti=["svg",h,[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}],["path",{d:"M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0"}]]],di=["svg",h,[["path",{d:"M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0"}],["path",{d:"M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"}],["path",{d:"M10 20h4"}],["circle",{cx:"16",cy:"20",r:"2"}],["circle",{cx:"8",cy:"20",r:"2"}]]],ci=["svg",h,[["path",{d:"m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"}],["path",{d:"m5 8 4 4"}],["path",{d:"m12 15 4 4"}]]],Mi=["svg",h,[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"m16 19 2 2 4-4"}]]],ei=["svg",h,[["path",{d:"M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M16 19h6"}]]],ii=["svg",h,[["path",{d:"M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"}],["path",{d:"m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"}]]],ni=["svg",h,[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M19 16v6"}],["path",{d:"M16 19h6"}]]],pi=["svg",h,[["path",{d:"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"}],["path",{d:"M20 22v.01"}]]],li=["svg",h,[["path",{d:"M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m22 22-1.5-1.5"}]]],vi=["svg",h,[["path",{d:"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"M20 14v4"}],["path",{d:"M20 22v.01"}]]],oi=["svg",h,[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{d:"m17 17 4 4"}],["path",{d:"m21 17-4 4"}]]],si=["svg",h,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}]]],ri=["svg",h,[["path",{d:"M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"}],["polyline",{points:"15,9 18,9 18,11"}],["path",{d:"M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"}],["line",{x1:"6",x2:"7",y1:"10",y2:"10"}]]],gi=["svg",h,[["rect",{width:"16",height:"13",x:"6",y:"4",rx:"2"}],["path",{d:"m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7"}],["path",{d:"M2 8v11c0 1.1.9 2 2 2h14"}]]],yi=["svg",h,[["path",{d:"M5.43 5.43A8.06 8.06 0 0 0 4 10c0 6 8 12 8 12a29.94 29.94 0 0 0 5-5"}],["path",{d:"M19.18 13.52A8.66 8.66 0 0 0 20 10a8 8 0 0 0-8-8 7.88 7.88 0 0 0-3.52.82"}],["path",{d:"M9.13 9.13A2.78 2.78 0 0 0 9 10a3 3 0 0 0 3 3 2.78 2.78 0 0 0 .87-.13"}],["path",{d:"M14.9 9.25a3 3 0 0 0-2.15-2.16"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],$i=["svg",h,[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}],["circle",{cx:"12",cy:"10",r:"3"}]]],mi=["svg",h,[["path",{d:"M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835"}]]],ui=["svg",h,[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]]],Ci=["svg",h,[["path",{d:"M8 22h8"}],["path",{d:"M12 11v11"}],["path",{d:"m19 3-7 8-7-8Z"}]]],Hi=["svg",h,[["polyline",{points:"15 3 21 3 21 9"}],["polyline",{points:"9 21 3 21 3 15"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]]],wi=["svg",h,[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]]],Vi=["svg",h,[["path",{d:"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"}],["path",{d:"M11 12 5.12 2.2"}],["path",{d:"m13 12 5.88-9.8"}],["path",{d:"M8 7h8"}],["circle",{cx:"12",cy:"17",r:"5"}],["path",{d:"M12 18v-2h-.5"}]]],Si=["svg",h,[["path",{d:"M9.26 9.26 3 11v3l14.14 3.14"}],["path",{d:"M21 15.34V6l-7.31 2.03"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Ai=["svg",h,[["path",{d:"m3 11 18-5v12L3 14v-3z"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6"}]]],Li=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"8",x2:"16",y1:"15",y2:"15"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]],fi=["svg",h,[["path",{d:"M6 19v-3"}],["path",{d:"M10 19v-3"}],["path",{d:"M14 19v-3"}],["path",{d:"M18 19v-3"}],["path",{d:"M8 11V9"}],["path",{d:"M16 11V9"}],["path",{d:"M12 11V9"}],["path",{d:"M2 15h20"}],["path",{d:"M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"}]]],ki=["svg",h,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],Pi=["svg",h,[["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"}],["path",{d:"m20 22-5-5"}]]],Bi=["svg",h,[["path",{d:"M10 9.5 8 12l2 2.5"}],["path",{d:"m14 9.5 2 2.5-2 2.5"}],["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22z"}]]],Fi=["svg",h,[["path",{d:"M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1"}],["path",{d:"M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1"}],["path",{d:"M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5"}],["path",{d:"M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1"}],["path",{d:"M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1"}],["path",{d:"M3.5 17.5 2 22l4.5-1.5"}],["path",{d:"M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5"}],["path",{d:"M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1"}]]],Di=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7"}]]],Zi=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]],Ri=["svg",h,[["path",{d:"M20.5 14.9A9 9 0 0 0 9.1 3.5"}],["path",{d:"m2 2 20 20"}],["path",{d:"M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7"}]]],qi=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],Ti=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]]],bi=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"m10 15-3-3 3-3"}],["path",{d:"M7 12h7a2 2 0 0 1 2 2v1"}]]],xi=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]]],zi=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]],Ui=["svg",h,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]],Oi=["svg",h,[["path",{d:"M10 7.5 8 10l2 2.5"}],["path",{d:"m14 7.5 2 2.5-2 2.5"}],["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}]]],Gi=["svg",h,[["path",{d:"M3 6V5c0-1.1.9-2 2-2h2"}],["path",{d:"M11 3h3"}],["path",{d:"M18 3h1c1.1 0 2 .9 2 2"}],["path",{d:"M21 9v2"}],["path",{d:"M21 15c0 1.1-.9 2-2 2h-1"}],["path",{d:"M14 17h-3"}],["path",{d:"m7 17-4 4v-5"}],["path",{d:"M3 12v-2"}]]],Ei=["svg",h,[["path",{d:"m5 19-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"}],["path",{d:"M9 10h6"}],["path",{d:"M12 7v6"}],["path",{d:"M9 17h6"}]]],Wi=["svg",h,[["path",{d:"M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7"}],["circle",{cx:"18",cy:"6",r:"3"}]]],Ii=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8"}]]],Xi=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M16 10h.01"}]]],Ni=["svg",h,[["path",{d:"M21 15V5a2 2 0 0 0-2-2H9"}],["path",{d:"m2 2 20 20"}],["path",{d:"M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10"}]]],Ki=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M12 7v6"}],["path",{d:"M9 10h6"}]]],Ji=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M8 12a2 2 0 0 0 2-2V8H8"}],["path",{d:"M14 12a2 2 0 0 0 2-2V8h-2"}]]],ji=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"m10 7-3 3 3 3"}],["path",{d:"M17 13v-1a2 2 0 0 0-2-2H7"}]]],Qi=["svg",h,[["path",{d:"M21 12v3a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h7"}],["path",{d:"M16 3h5v5"}],["path",{d:"m16 8 5-5"}]]],Yi=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M13 8H7"}],["path",{d:"M17 12H7"}]]],_i=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"M12 7v2"}],["path",{d:"M12 13h.01"}]]],an=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}],["path",{d:"m14.5 7.5-5 5"}],["path",{d:"m9.5 7.5 5 5"}]]],hn=["svg",h,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}]]],tn=["svg",h,[["path",{d:"M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"}]]],dn=["svg",h,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}]]],Z1=["svg",h,[["path",{d:"m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"}],["circle",{cx:"17",cy:"7",r:"5"}]]],cn=["svg",h,[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}]]],Mn=["svg",h,[["path",{d:"M6 18h8"}],["path",{d:"M3 22h18"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1"}],["path",{d:"M9 14h2"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"}]]],en=["svg",h,[["rect",{width:"20",height:"15",x:"2",y:"4",rx:"2"}],["rect",{width:"8",height:"7",x:"6",y:"8",rx:"1"}],["path",{d:"M18 8v7"}],["path",{d:"M6 19v2"}],["path",{d:"M18 19v2"}]]],nn=["svg",h,[["path",{d:"M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"}],["path",{d:"M12 13v8"}],["path",{d:"M12 3v3"}]]],pn=["svg",h,[["path",{d:"M8 2h8"}],["path",{d:"M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"}],["path",{d:"M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],ln=["svg",h,[["path",{d:"M8 2h8"}],["path",{d:"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"}],["path",{d:"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}]]],vn=["svg",h,[["polyline",{points:"4 14 10 14 10 20"}],["polyline",{points:"20 10 14 10 14 4"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]]],on=["svg",h,[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3"}]]],sn=["svg",h,[["path",{d:"M5 12h14"}]]],rn=["svg",h,[["path",{d:"m9 10 2 2 4-4"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]],gn=["svg",h,[["circle",{cx:"19",cy:"6",r:"3"}],["path",{d:"M22 12v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]],yn=["svg",h,[["path",{d:"M12 13V7"}],["path",{d:"m15 10-3 3-3-3"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]],$n=["svg",h,[["path",{d:"M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2"}],["path",{d:"M22 15V5a2 2 0 0 0-2-2H9"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}],["path",{d:"m2 2 20 20"}]]],mn=["svg",h,[["path",{d:"M10 13V7"}],["path",{d:"M14 13V7"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]],un=["svg",h,[["path",{d:"M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}]]],Cn=["svg",h,[["path",{d:"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"}],["path",{d:"M10 19v-3.96 3.15"}],["path",{d:"M7 19h5"}],["rect",{width:"6",height:"10",x:"16",y:"12",rx:"2"}]]],Hn=["svg",h,[["path",{d:"M5.5 20H8"}],["path",{d:"M17 9h.01"}],["rect",{width:"10",height:"16",x:"12",y:"4",rx:"2"}],["path",{d:"M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4"}],["circle",{cx:"17",cy:"15",r:"1"}]]],wn=["svg",h,[["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}],["rect",{x:"9",y:"7",width:"6",height:"6",rx:"1"}]]],Vn=["svg",h,[["path",{d:"m9 10 3-3 3 3"}],["path",{d:"M12 13V7"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]],Sn=["svg",h,[["path",{d:"m14.5 12.5-5-5"}],["path",{d:"m9.5 12.5 5-5"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["path",{d:"M12 17v4"}],["path",{d:"M8 21h8"}]]],An=["svg",h,[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]]],Ln=["svg",h,[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}]]],fn=["svg",h,[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]]],kn=["svg",h,[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z"}],["path",{d:"M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"}]]],Pn=["svg",h,[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z"}]]],Bn=["svg",h,[["path",{d:"M12 6v.343"}],["path",{d:"M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218"}],["path",{d:"M19 13.343V9A7 7 0 0 0 8.56 2.902"}],["path",{d:"M22 22 2 2"}]]],Fn=["svg",h,[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z"}]]],Dn=["svg",h,[["path",{d:"m2 2 4 11 2-5 5-2Z"}],["circle",{cx:"16",cy:"16",r:"6"}],["path",{d:"m11.8 11.8 8.4 8.4"}]]],Zn=["svg",h,[["path",{d:"m9 9 5 12 1.8-5.2L21 14Z"}],["path",{d:"M7.2 2.2 8 5.1"}],["path",{d:"m5.1 8-2.9-.8"}],["path",{d:"M14 4.1 12 6"}],["path",{d:"m6 12-1.9 2"}]]],Rn=["svg",h,[["path",{d:"m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"}],["path",{d:"m13 13 6 6"}]]],qn=["svg",h,[["rect",{x:"5",y:"2",width:"14",height:"20",rx:"7"}],["path",{d:"M12 6v4"}]]],R1=["svg",h,[["path",{d:"M5 3v16h16"}],["path",{d:"m5 19 6-6"}],["path",{d:"m2 6 3-3 3 3"}],["path",{d:"m18 16 3 3-3 3"}]]],Tn=["svg",h,[["polyline",{points:"5 11 5 5 11 5"}],["polyline",{points:"19 13 19 19 13 19"}],["line",{x1:"5",x2:"19",y1:"5",y2:"19"}]]],bn=["svg",h,[["polyline",{points:"13 5 19 5 19 11"}],["polyline",{points:"11 19 5 19 5 13"}],["line",{x1:"19",x2:"5",y1:"5",y2:"19"}]]],xn=["svg",h,[["path",{d:"M11 19H5V13"}],["path",{d:"M19 5L5 19"}]]],zn=["svg",h,[["path",{d:"M19 13V19H13"}],["path",{d:"M5 5L19 19"}]]],Un=["svg",h,[["path",{d:"M8 18L12 22L16 18"}],["path",{d:"M12 2V22"}]]],On=["svg",h,[["polyline",{points:"18 8 22 12 18 16"}],["polyline",{points:"6 8 2 12 6 16"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}]]],Gn=["svg",h,[["path",{d:"M6 8L2 12L6 16"}],["path",{d:"M2 12H22"}]]],En=["svg",h,[["path",{d:"M18 8L22 12L18 16"}],["path",{d:"M2 12H22"}]]],Wn=["svg",h,[["path",{d:"M5 11V5H11"}],["path",{d:"M5 5L19 19"}]]],In=["svg",h,[["path",{d:"M13 5H19V11"}],["path",{d:"M19 5L5 19"}]]],Xn=["svg",h,[["path",{d:"M8 6L12 2L16 6"}],["path",{d:"M12 2V22"}]]],Nn=["svg",h,[["polyline",{points:"8 18 12 22 16 18"}],["polyline",{points:"8 6 12 2 16 6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22"}]]],Kn=["svg",h,[["polyline",{points:"5 9 2 12 5 15"}],["polyline",{points:"9 5 12 2 15 5"}],["polyline",{points:"15 19 12 22 9 19"}],["polyline",{points:"19 9 22 12 19 15"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22"}]]],Jn=["svg",h,[["circle",{cx:"8",cy:"18",r:"4"}],["path",{d:"M12 18V2l7 4"}]]],jn=["svg",h,[["circle",{cx:"12",cy:"18",r:"4"}],["path",{d:"M16 18V2"}]]],Qn=["svg",h,[["path",{d:"M9 18V5l12-2v13"}],["path",{d:"m9 9 12-2"}],["circle",{cx:"6",cy:"18",r:"3"}],["circle",{cx:"18",cy:"16",r:"3"}]]],Yn=["svg",h,[["path",{d:"M9 18V5l12-2v13"}],["circle",{cx:"6",cy:"18",r:"3"}],["circle",{cx:"18",cy:"16",r:"3"}]]],_n=["svg",h,[["path",{d:"M9.31 9.31 5 21l7-4 7 4-1.17-3.17"}],["path",{d:"M14.53 8.88 12 2l-1.17 3.17"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],ap=["svg",h,[["polygon",{points:"12 2 19 21 12 17 5 21 12 2"}]]],hp=["svg",h,[["path",{d:"M8.43 8.43 3 11l8 2 2 8 2.57-5.43"}],["path",{d:"M17.39 11.73 22 2l-9.73 4.61"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],tp=["svg",h,[["polygon",{points:"3 11 22 2 13 21 11 13 3 11"}]]],dp=["svg",h,[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"}],["path",{d:"M12 12V8"}]]],cp=["svg",h,[["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"}],["path",{d:"M18 14h-8"}],["path",{d:"M15 18h-5"}],["path",{d:"M10 6h8v4h-8V6Z"}]]],Mp=["svg",h,[["path",{d:"M6 8.32a7.43 7.43 0 0 1 0 7.36"}],["path",{d:"M9.46 6.21a11.76 11.76 0 0 1 0 11.58"}],["path",{d:"M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"}],["path",{d:"M16.37 2a20.16 20.16 0 0 1 0 20"}]]],ep=["svg",h,[["path",{d:"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"}],["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["path",{d:"M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z"}]]],ip=["svg",h,[["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M15 2v20"}],["path",{d:"M15 7h5"}],["path",{d:"M15 12h5"}],["path",{d:"M15 17h5"}]]],np=["svg",h,[["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M9.5 8h5"}],["path",{d:"M9.5 12H16"}],["path",{d:"M9.5 16H14"}]]],pp=["svg",h,[["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M16 2v20"}]]],lp=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M12 2v4"}],["path",{d:"M16 2v4"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v2"}],["path",{d:"M20 12v2"}],["path",{d:"M20 18v2a2 2 0 0 1-2 2h-1"}],["path",{d:"M13 22h-2"}],["path",{d:"M7 22H6a2 2 0 0 1-2-2v-2"}],["path",{d:"M4 14v-2"}],["path",{d:"M4 8V6a2 2 0 0 1 2-2h2"}],["path",{d:"M8 10h6"}],["path",{d:"M8 14h8"}],["path",{d:"M8 18h5"}]]],vp=["svg",h,[["path",{d:"M8 2v4"}],["path",{d:"M12 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"16",height:"18",x:"4",y:"4",rx:"2"}],["path",{d:"M8 10h6"}],["path",{d:"M8 14h8"}],["path",{d:"M8 18h5"}]]],op=["svg",h,[["path",{d:"M12 4V2"}],["path",{d:"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939"}],["path",{d:"M19 10v3.343"}],["path",{d:"M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],sp=["svg",h,[["path",{d:"M12 4V2"}],["path",{d:"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"}],["path",{d:"M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"}]]],q1=["svg",h,[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],T1=["svg",h,[["path",{d:"M10 15V9"}],["path",{d:"M14 15V9"}],["path",{d:"M7.714 2h8.572L22 7.714v8.572L16.286 22H7.714L2 16.286V7.714z"}]]],b1=["svg",h,[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]],rp=["svg",h,[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}]]],gp=["svg",h,[["path",{d:"M3 3h6l6 18h6"}],["path",{d:"M14 3h7"}]]],yp=["svg",h,[["circle",{cx:"12",cy:"12",r:"3"}],["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}],["path",{d:"M10.4 21.9a10 10 0 0 0 9.941-15.416"}],["path",{d:"M13.5 2.1a10 10 0 0 0-9.841 15.416"}]]],$p=["svg",h,[["path",{d:"M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025"}],["path",{d:"m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009"}],["path",{d:"m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"}]]],mp=["svg",h,[["path",{d:"M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"}],["path",{d:"m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"}],["path",{d:"M12 3v6"}]]],up=["svg",h,[["path",{d:"m16 16 2 2 4-4"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}]]],Cp=["svg",h,[["path",{d:"M16 16h6"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}]]],Hp=["svg",h,[["path",{d:"M12 22v-9"}],["path",{d:"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"}],["path",{d:"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"}],["path",{d:"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"}]]],wp=["svg",h,[["path",{d:"M16 16h6"}],["path",{d:"M19 13v6"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}]]],Vp=["svg",h,[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5"}],["path",{d:"M20.27 17.27 22 19"}]]],Sp=["svg",h,[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"}],["path",{d:"m7.5 4.27 9 5.15"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12"}],["path",{d:"m17 13 5 5m-5 0 5-5"}]]],Ap=["svg",h,[["path",{d:"m7.5 4.27 9 5.15"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]]],Lp=["svg",h,[["path",{d:"m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"}],["path",{d:"m5 2 5 5"}],["path",{d:"M2 13h15"}],["path",{d:"M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"}]]],fp=["svg",h,[["rect",{width:"16",height:"6",x:"2",y:"2",rx:"2"}],["path",{d:"M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"}],["rect",{width:"4",height:"6",x:"8",y:"16",rx:"1"}]]],x1=["svg",h,[["path",{d:"M10 2v2"}],["path",{d:"M14 2v4"}],["path",{d:"M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z"}],["path",{d:"M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"}]]],kp=["svg",h,[["path",{d:"M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"}],["path",{d:"M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"}],["path",{d:"M14.5 17.5 4.5 15"}]]],Pp=["svg",h,[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"}]]],Bp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}],["path",{d:"m15 8-3 3-3-3"}]]],z1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M14 15h1"}],["path",{d:"M19 15h2"}],["path",{d:"M3 15h2"}],["path",{d:"M9 15h1"}]]],Fp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}],["path",{d:"m9 10 3-3 3 3"}]]],Dp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}]]],U1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"m16 15-3-3 3-3"}]]],O1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 14v1"}],["path",{d:"M9 19v2"}],["path",{d:"M9 3v2"}],["path",{d:"M9 9v1"}]]],G1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"m14 9 3 3-3 3"}]]],E1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]]],Zp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}],["path",{d:"m8 9 3 3-3 3"}]]],W1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 14v1"}],["path",{d:"M15 19v2"}],["path",{d:"M15 3v2"}],["path",{d:"M15 9v1"}]]],Rp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}],["path",{d:"m10 15-3-3 3-3"}]]],qp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}]]],Tp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"m9 16 3-3 3 3"}]]],I1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M14 9h1"}],["path",{d:"M19 9h2"}],["path",{d:"M3 9h2"}],["path",{d:"M9 9h1"}]]],bp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"m15 14-3 3-3-3"}]]],xp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}]]],zp=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}],["path",{d:"M9 15h12"}]]],Up=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h12"}],["path",{d:"M15 3v18"}]]],X1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M9 21V9"}]]],Op=["svg",h,[["path",{d:"m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"}]]],Gp=["svg",h,[["path",{d:"M8 21s-4-3-4-9 4-9 4-9"}],["path",{d:"M16 3s4 3 4 9-4 9-4 9"}]]],Ep=["svg",h,[["path",{d:"M9 9a3 3 0 1 1 6 0"}],["path",{d:"M12 12v3"}],["path",{d:"M11 15h2"}],["path",{d:"M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3"}],["path",{d:"M12 19v3"}]]],Wp=["svg",h,[["path",{d:"M5.8 11.3 2 22l10.7-3.79"}],["path",{d:"M4 3h.01"}],["path",{d:"M22 8h.01"}],["path",{d:"M15 2h.01"}],["path",{d:"M22 20h.01"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"}]]],Ip=["svg",h,[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]]],Xp=["svg",h,[["circle",{cx:"11",cy:"4",r:"2"}],["circle",{cx:"18",cy:"8",r:"2"}],["circle",{cx:"20",cy:"16",r:"2"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"}]]],Np=["svg",h,[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2"}],["path",{d:"M15 14h.01"}],["path",{d:"M9 6h6"}],["path",{d:"M9 10h6"}]]],N1=["svg",h,[["path",{d:"M12 20h9"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"}]]],Kp=["svg",h,[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"}],["path",{d:"m2.3 2.3 7.286 7.286"}],["circle",{cx:"11",cy:"11",r:"2"}]]],K1=["svg",h,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}]]],Jp=["svg",h,[["path",{d:"M12 20h9"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"}],["path",{d:"m15 5 3 3"}]]],jp=["svg",h,[["path",{d:"m15 5 4 4"}],["path",{d:"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"}],["path",{d:"m8 6 2-2"}],["path",{d:"m2 22 5.5-1.5L21.17 6.83a2.82 2.82 0 0 0-4-4L3.5 16.5Z"}],["path",{d:"m18 16 2-2"}],["path",{d:"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"}]]],Qp=["svg",h,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}],["path",{d:"m15 5 4 4"}]]],Yp=["svg",h,[["path",{d:"M3.5 8.7c-.7.5-1 1.4-.7 2.2l2.8 8.7c.3.8 1 1.4 1.9 1.4h9.1c.9 0 1.6-.6 1.9-1.4l2.8-8.7c.3-.8 0-1.7-.7-2.2l-7.4-5.3a2.1 2.1 0 0 0-2.4 0Z"}]]],_p=["svg",h,[["line",{x1:"19",x2:"5",y1:"5",y2:"19"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5"}]]],al=["svg",h,[["circle",{cx:"12",cy:"5",r:"1"}],["path",{d:"m9 20 3-6 3 6"}],["path",{d:"m6 8 6 2 6-2"}],["path",{d:"M12 10v4"}]]],hl=["svg",h,[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}],["path",{d:"M14.05 2a9 9 0 0 1 8 7.94"}],["path",{d:"M14.05 6A5 5 0 0 1 18 10"}]]],tl=["svg",h,[["polyline",{points:"18 2 22 6 18 10"}],["line",{x1:"14",x2:"22",y1:"6",y2:"6"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]],dl=["svg",h,[["polyline",{points:"16 2 16 8 22 8"}],["line",{x1:"22",x2:"16",y1:"2",y2:"8"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]],cl=["svg",h,[["line",{x1:"22",x2:"16",y1:"2",y2:"8"}],["line",{x1:"16",x2:"22",y1:"2",y2:"8"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]],Ml=["svg",h,[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22"}]]],el=["svg",h,[["polyline",{points:"22 8 22 2 16 2"}],["line",{x1:"16",x2:"22",y1:"8",y2:"2"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]],il=["svg",h,[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]],nl=["svg",h,[["line",{x1:"9",x2:"9",y1:"4",y2:"20"}],["path",{d:"M4 7c0-1.7 1.3-3 3-3h13"}],["path",{d:"M18 20c-1.7 0-3-1.3-3-3V4"}]]],pl=["svg",h,[["path",{d:"M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8"}],["path",{d:"M2 14h20"}],["path",{d:"M6 14v4"}],["path",{d:"M10 14v4"}],["path",{d:"M14 14v4"}],["path",{d:"M18 14v4"}]]],ll=["svg",h,[["path",{d:"M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912"}],["path",{d:"M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393"}],["path",{d:"M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z"}],["path",{d:"M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319"}]]],vl=["svg",h,[["path",{d:"M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"}],["rect",{width:"10",height:"7",x:"12",y:"13",rx:"2"}]]],ol=["svg",h,[["path",{d:"M8 4.5v5H3m-1-6 6 6m13 0v-3c0-1.16-.84-2-2-2h-7m-9 9v2c0 1.05.95 2 2 2h3"}],["rect",{width:"10",height:"7",x:"12",y:"13.5",ry:"2"}]]],sl=["svg",h,[["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83"}],["path",{d:"M22 12A10 10 0 0 0 12 2v10z"}]]],rl=["svg",h,[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1"}],["path",{d:"M16 11h0"}]]],gl=["svg",h,[["path",{d:"M14 3v11"}],["path",{d:"M14 9h-3a3 3 0 0 1 0-6h9"}],["path",{d:"M18 3v11"}],["path",{d:"M22 18H2l4-4"}],["path",{d:"m6 22-4-4"}]]],yl=["svg",h,[["path",{d:"M10 3v11"}],["path",{d:"M10 9H7a1 1 0 0 1 0-6h8"}],["path",{d:"M14 3v11"}],["path",{d:"m18 14 4 4H2"}],["path",{d:"m22 18-4 4"}]]],$l=["svg",h,[["path",{d:"M13 4v16"}],["path",{d:"M17 4v16"}],["path",{d:"M19 4H9.5a4.5 4.5 0 0 0 0 9H13"}]]],ml=["svg",h,[["path",{d:"M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4"}],["path",{d:"M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"}],["rect",{width:"16",height:"5",x:"4",y:"2",rx:"1"}]]],ul=["svg",h,[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"}],["path",{d:"m8.5 8.5 7 7"}]]],Cl=["svg",h,[["line",{x1:"2",x2:"22",y1:"2",y2:"22"}],["line",{x1:"12",x2:"12",y1:"17",y2:"22"}],["path",{d:"M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12"}],["path",{d:"M15 9.34V6h1a2 2 0 0 0 0-4H7.89"}]]],Hl=["svg",h,[["line",{x1:"12",x2:"12",y1:"17",y2:"22"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"}]]],wl=["svg",h,[["path",{d:"m2 22 1-1h3l9-9"}],["path",{d:"M3 21v-3l9-9"}],["path",{d:"m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"}]]],Vl=["svg",h,[["path",{d:"M15 11h.01"}],["path",{d:"M11 15h.01"}],["path",{d:"M16 16h.01"}],["path",{d:"m2 16 20 6-6-20A20 20 0 0 0 2 16"}],["path",{d:"M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"}]]],Sl=["svg",h,[["path",{d:"M2 22h20"}],["path",{d:"M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"}]]],Al=["svg",h,[["path",{d:"M2 22h20"}],["path",{d:"M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"}]]],Ll=["svg",h,[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"}]]],fl=["svg",h,[["polygon",{points:"6 3 20 12 6 21 6 3"}]]],kl=["svg",h,[["path",{d:"M9 2v6"}],["path",{d:"M15 2v6"}],["path",{d:"M12 17v5"}],["path",{d:"M5 8h14"}],["path",{d:"M6 11V8h12v3a6 6 0 1 1-12 0v0Z"}]]],Pl=["svg",h,[["path",{d:"m13 2-2 2.5h3L12 7"}],["path",{d:"M10 14v-3"}],["path",{d:"M14 14v-3"}],["path",{d:"M11 19c-1.7 0-3-1.3-3-3v-2h8v2c0 1.7-1.3 3-3 3Z"}],["path",{d:"M12 22v-3"}]]],Bl=["svg",h,[["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"}],["path",{d:"m2 22 3-3"}],["path",{d:"M7.5 13.5 10 11"}],["path",{d:"M10.5 16.5 13 14"}],["path",{d:"m18 3-4 4h6l-4 4"}]]],Fl=["svg",h,[["path",{d:"M12 22v-5"}],["path",{d:"M9 8V2"}],["path",{d:"M15 8V2"}],["path",{d:"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"}]]],Dl=["svg",h,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],Zl=["svg",h,[["path",{d:"M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2"}],["path",{d:"M18 6h.01"}],["path",{d:"M6 18h.01"}],["path",{d:"M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z"}],["path",{d:"M18 11.66V22a4 4 0 0 0 4-4V6"}]]],Rl=["svg",h,[["path",{d:"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"}],["polyline",{points:"8 10 12 14 16 10"}]]],ql=["svg",h,[["path",{d:"M16.85 18.58a9 9 0 1 0-9.7 0"}],["path",{d:"M8 14a5 5 0 1 1 8 0"}],["circle",{cx:"12",cy:"11",r:"1"}],["path",{d:"M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"}]]],Tl=["svg",h,[["path",{d:"M10 4.5V4a2 2 0 0 0-2.41-1.957"}],["path",{d:"M13.9 8.4a2 2 0 0 0-1.26-1.295"}],["path",{d:"M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158"}],["path",{d:"m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343"}],["path",{d:"M6 6v8"}],["path",{d:"m2 2 20 20"}]]],bl=["svg",h,[["path",{d:"M22 14a8 8 0 0 1-8 8"}],["path",{d:"M18 11v-1a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"}],["path",{d:"M14 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"}],["path",{d:"M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"}],["path",{d:"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]]],xl=["svg",h,[["path",{d:"M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"}],["path",{d:"M10 22 9 8"}],["path",{d:"m14 22 1-14"}],["path",{d:"M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"}]]],zl=["svg",h,[["path",{d:"M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z"}],["path",{d:"m22 22-5.5-5.5"}]]],Ul=["svg",h,[["path",{d:"M18 7c0-5.333-8-5.333-8 0"}],["path",{d:"M10 7v14"}],["path",{d:"M6 21h12"}],["path",{d:"M6 13h10"}]]],Ol=["svg",h,[["path",{d:"M18.36 6.64A9 9 0 0 1 20.77 15"}],["path",{d:"M6.16 6.16a9 9 0 1 0 12.68 12.68"}],["path",{d:"M12 2v4"}],["path",{d:"m2 2 20 20"}]]],Gl=["svg",h,[["path",{d:"M12 2v10"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04"}]]],El=["svg",h,[["path",{d:"M2 3h20"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"}],["path",{d:"m7 21 5-5 5 5"}]]],Wl=["svg",h,[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1"}]]],Il=["svg",h,[["path",{d:"M5 7 3 5"}],["path",{d:"M9 6V3"}],["path",{d:"m13 7 2-2"}],["circle",{cx:"9",cy:"13",r:"3"}],["path",{d:"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"}],["path",{d:"M16 16h2"}]]],Xl=["svg",h,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M12 9v11"}],["path",{d:"M2 9h13a2 2 0 0 1 2 2v9"}]]],Nl=["svg",h,[["path",{d:"M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"}]]],Kl=["svg",h,[["path",{d:"M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"}],["path",{d:"M12 2v20"}]]],Jl=["svg",h,[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3"}],["path",{d:"M21 21v.01"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7"}],["path",{d:"M3 12h.01"}],["path",{d:"M12 3h.01"}],["path",{d:"M12 16v.01"}],["path",{d:"M16 12h1"}],["path",{d:"M21 12v.01"}],["path",{d:"M12 21v-1"}]]],jl=["svg",h,[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"}]]],Ql=["svg",h,[["path",{d:"M13 16a3 3 0 0 1 2.24 5"}],["path",{d:"M18 12h.01"}],["path",{d:"M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"}],["path",{d:"M20 8.54V4a2 2 0 1 0-4 0v3"}],["path",{d:"M7.612 12.524a3 3 0 1 0-1.6 4.3"}]]],Yl=["svg",h,[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34"}],["path",{d:"M4 6h.01"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67"}],["path",{d:"M12 18h.01"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"m13.41 10.59 5.66-5.66"}]]],_l=["svg",h,[["path",{d:"M12 12h0.01"}],["path",{d:"M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z"}],["path",{d:"M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z"}],["path",{d:"M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2.7-2.8.7-4 0-1.1 1.8-2 3.4-2.5 4.3z"}]]],a9=["svg",h,[["path",{d:"M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"}]]],h9=["svg",h,[["path",{d:"M5 16v2"}],["path",{d:"M19 16v2"}],["rect",{width:"20",height:"8",x:"2",y:"8",rx:"2"}],["path",{d:"M18 12h0"}]]],t9=["svg",h,[["path",{d:"M4.9 16.1C1 12.2 1 5.8 4.9 1.9"}],["path",{d:"M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"}],["circle",{cx:"12",cy:"9",r:"2"}],["path",{d:"M16.2 4.8c2 2 2.26 5.11.8 7.47"}],["path",{d:"M19.1 1.9a9.96 9.96 0 0 1 0 14.1"}],["path",{d:"M9.5 18h5"}],["path",{d:"m8 22 4-11 4 11"}]]],d9=["svg",h,[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19"}]]],c9=["svg",h,[["path",{d:"M20.34 17.52a10 10 0 1 0-2.82 2.82"}],["circle",{cx:"19",cy:"19",r:"2"}],["path",{d:"m13.41 13.41 4.18 4.18"}],["circle",{cx:"12",cy:"12",r:"2"}]]],M9=["svg",h,[["path",{d:"M5 15h14"}],["path",{d:"M5 9h14"}],["path",{d:"m14 20-5-5 6-6-5-5"}]]],e9=["svg",h,[["path",{d:"M22 17a10 10 0 0 0-20 0"}],["path",{d:"M6 17a6 6 0 0 1 12 0"}],["path",{d:"M10 17a2 2 0 0 1 4 0"}]]],i9=["svg",h,[["path",{d:"M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"}],["path",{d:"M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"}],["path",{d:"M13.2 18a3 3 0 0 0-2.2-5"}],["path",{d:"M13 22H4a2 2 0 0 1 0-4h12"}],["path",{d:"M16 9h.01"}]]],n9=["svg",h,[["rect",{width:"12",height:"20",x:"6",y:"2",rx:"2"}],["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}]]],p9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M12 6.5v11"}],["path",{d:"M15 9.4a4 4 0 1 0 0 5.2"}]]],l9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 12h5"}],["path",{d:"M16 9.5a4 4 0 1 0 0 5.2"}]]],v9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 7h8"}],["path",{d:"M12 17.5 8 15h1a4 4 0 0 0 0-8"}],["path",{d:"M8 11h8"}]]],o9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"m12 10 3-3"}],["path",{d:"m9 7 3 3v7.5"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]]],s9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 13h5"}],["path",{d:"M10 17V9.5a2.5 2.5 0 0 1 5 0"}],["path",{d:"M8 17h7"}]]],r9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M8 15h5"}],["path",{d:"M8 11h5a2 2 0 1 0 0-4h-3v10"}]]],g9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M10 17V7h5"}],["path",{d:"M10 11h4"}],["path",{d:"M8 15h5"}]]],y9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M14 8H8"}],["path",{d:"M16 12H8"}],["path",{d:"M13 16H8"}]]],$9=["svg",h,[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{d:"M12 17.5v-11"}]]],J1=["svg",h,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}],["path",{d:"M12 12h.01"}],["path",{d:"M17 12h.01"}],["path",{d:"M7 12h.01"}]]],m9=["svg",h,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2"}]]],u9=["svg",h,[["rect",{width:"12",height:"20",x:"6",y:"2",rx:"2"}]]],C9=["svg",h,[["path",{d:"M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"}],["path",{d:"M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"}],["path",{d:"m14 16-3 3 3 3"}],["path",{d:"M8.293 13.596 7.196 9.5 3.1 10.598"}],["path",{d:"m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"}],["path",{d:"m13.378 9.633 4.096 1.098 1.097-4.096"}]]],H9=["svg",h,[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"}]]],w9=["svg",h,[["circle",{cx:"12",cy:"17",r:"1"}],["path",{d:"M21 7v6h-6"}],["path",{d:"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"}]]],V9=["svg",h,[["path",{d:"M21 7v6h-6"}],["path",{d:"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"}]]],S9=["svg",h,[["path",{d:"M3 2v6h6"}],["path",{d:"M21 12A9 9 0 0 0 6 5.3L3 8"}],["path",{d:"M21 22v-6h-6"}],["path",{d:"M3 12a9 9 0 0 0 15 6.7l3-2.7"}],["circle",{cx:"12",cy:"12",r:"1"}]]],A9=["svg",h,[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"}],["path",{d:"M16 16h5v5"}]]],L9=["svg",h,[["path",{d:"M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47"}],["path",{d:"M8 16H3v5"}],["path",{d:"M3 12C3 9.51 4 7.26 5.64 5.64"}],["path",{d:"m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64"}],["path",{d:"M21 12c0 1-.16 1.97-.47 2.87"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M22 22 2 2"}]]],f9=["svg",h,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]],k9=["svg",h,[["path",{d:"M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"}],["path",{d:"M5 10h14"}],["path",{d:"M15 7v6"}]]],P9=["svg",h,[["path",{d:"M17 3v10"}],["path",{d:"m12.67 5.5 8.66 5"}],["path",{d:"m12.67 10.5 8.66-5"}],["path",{d:"M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"}]]],B9=["svg",h,[["path",{d:"M4 7V4h16v3"}],["path",{d:"M5 20h6"}],["path",{d:"M13 4 8 20"}],["path",{d:"m15 15 5 5"}],["path",{d:"m20 15-5 5"}]]],F9=["svg",h,[["path",{d:"m17 2 4 4-4 4"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{d:"m7 22-4-4 4-4"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3"}],["path",{d:"M11 10h1v4"}]]],D9=["svg",h,[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]]],Z9=["svg",h,[["path",{d:"m17 2 4 4-4 4"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{d:"m7 22-4-4 4-4"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3"}]]],R9=["svg",h,[["path",{d:"M14 4c0-1.1.9-2 2-2"}],["path",{d:"M20 2c1.1 0 2 .9 2 2"}],["path",{d:"M22 8c0 1.1-.9 2-2 2"}],["path",{d:"M16 10c-1.1 0-2-.9-2-2"}],["path",{d:"m3 7 3 3 3-3"}],["path",{d:"M6 10V5c0-1.7 1.3-3 3-3h1"}],["rect",{width:"8",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M14 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}],["path",{d:"M20 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"}]]],q9=["svg",h,[["path",{d:"M14 4c0-1.1.9-2 2-2"}],["path",{d:"M20 2c1.1 0 2 .9 2 2"}],["path",{d:"M22 8c0 1.1-.9 2-2 2"}],["path",{d:"M16 10c-1.1 0-2-.9-2-2"}],["path",{d:"m3 7 3 3 3-3"}],["path",{d:"M6 10V5c0-1.7 1.3-3 3-3h1"}],["rect",{width:"8",height:"8",x:"2",y:"14",rx:"2"}]]],T9=["svg",h,[["polyline",{points:"7 17 2 12 7 7"}],["polyline",{points:"12 17 7 12 12 7"}],["path",{d:"M22 18v-2a4 4 0 0 0-4-4H7"}]]],b9=["svg",h,[["polyline",{points:"9 17 4 12 9 7"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4"}]]],x9=["svg",h,[["polygon",{points:"11 19 2 12 11 5 11 19"}],["polygon",{points:"22 19 13 12 22 5 22 19"}]]],z9=["svg",h,[["path",{d:"M17.75 9.01c-.52 2.08-1.83 3.64-3.18 5.49l-2.6 3.54-2.97 4-3.5-2.54 3.85-4.97c-1.86-2.61-2.8-3.77-3.16-5.44"}],["path",{d:"M17.75 9.01A7 7 0 0 0 6.2 9.1C6.06 8.5 6 7.82 6 7c0-3.5 2.83-5 5.98-5C15.24 2 18 3.5 18 7c0 .73-.09 1.4-.25 2.01Z"}],["path",{d:"m9.35 14.53 2.64-3.31"}],["path",{d:"m11.97 18.04 2.99 4 3.54-2.54-3.93-5"}],["path",{d:"M14 8c0 1-1 2-2.01 3.22C11 10 10 9 10 8a2 2 0 1 1 4 0"}]]],U9=["svg",h,[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}]]],O9=["svg",h,[["polyline",{points:"3.5 2 6.5 12.5 18 12.5"}],["line",{x1:"9.5",x2:"5.5",y1:"12.5",y2:"20"}],["line",{x1:"15",x2:"18.5",y1:"12.5",y2:"20"}],["path",{d:"M2.75 18a13 13 0 0 0 18.5 0"}]]],G9=["svg",h,[["path",{d:"M6 19V5"}],["path",{d:"M10 19V6.8"}],["path",{d:"M14 19v-7.8"}],["path",{d:"M18 5v4"}],["path",{d:"M18 19v-6"}],["path",{d:"M22 19V9"}],["path",{d:"M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"}]]],j1=["svg",h,[["path",{d:"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"}],["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814"}],["path",{d:"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"}]]],E9=["svg",h,[["path",{d:"M20 9V7a2 2 0 0 0-2-2h-6"}],["path",{d:"m15 2-3 3 3 3"}],["path",{d:"M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"}]]],W9=["svg",h,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]]],I9=["svg",h,[["path",{d:"M12 5H6a2 2 0 0 0-2 2v3"}],["path",{d:"m9 8 3-3-3-3"}],["path",{d:"M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"}]]],X9=["svg",h,[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}]]],N9=["svg",h,[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5c.4 0 .9-.1 1.3-.2"}],["path",{d:"M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12"}],["path",{d:"m2 2 20 20"}],["path",{d:"M21 15.3a3.5 3.5 0 0 0-3.3-3.3"}],["path",{d:"M15 5h-4.3"}],["circle",{cx:"18",cy:"5",r:"3"}]]],K9=["svg",h,[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]]],J9=["svg",h,[["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6.01 18H6"}],["path",{d:"M10.01 18H10"}],["path",{d:"M15 10v4"}],["path",{d:"M17.84 7.17a4 4 0 0 0-5.66 0"}],["path",{d:"M20.66 4.34a8 8 0 0 0-11.31 0"}]]],Q1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 12h18"}]]],Y1=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M21 9H3"}],["path",{d:"M21 15H3"}]]],j9=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M21 7.5H3"}],["path",{d:"M21 12H3"}],["path",{d:"M21 16.5H3"}]]],Q9=["svg",h,[["path",{d:"M4 11a9 9 0 0 1 9 9"}],["path",{d:"M4 4a16 16 0 0 1 16 16"}],["circle",{cx:"5",cy:"19",r:"1"}]]],Y9=["svg",h,[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]]],_9=["svg",h,[["path",{d:"M6 11h8a4 4 0 0 0 0-8H9v18"}],["path",{d:"M6 15h8"}]]],av=["svg",h,[["path",{d:"M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"}],["path",{d:"M21 14 10 2 3 14h18Z"}],["path",{d:"M10 2v16"}]]],hv=["svg",h,[["path",{d:"M7 21h10"}],["path",{d:"M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"}],["path",{d:"M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"}],["path",{d:"m13 12 4-4"}],["path",{d:"M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"}]]],tv=["svg",h,[["path",{d:"M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"}],["path",{d:"M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"}],["path",{d:"m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"}],["path",{d:"M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"}]]],dv=["svg",h,[["path",{d:"M4 10a7.31 7.31 0 0 0 10 10Z"}],["path",{d:"m9 15 3-3"}],["path",{d:"M17 13a6 6 0 0 0-6-6"}],["path",{d:"M21 13A10 10 0 0 0 11 3"}]]],cv=["svg",h,[["path",{d:"M13 7 9 3 5 7l4 4"}],["path",{d:"m17 11 4 4-4 4-4-4"}],["path",{d:"m8 12 4 4 6-6-4-4Z"}],["path",{d:"m16 8 3-3"}],["path",{d:"M9 21a6 6 0 0 0-6-6"}]]],Mv=["svg",h,[["path",{d:"M10 2v3a1 1 0 0 0 1 1h5"}],["path",{d:"M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6"}],["path",{d:"M18 22H4a2 2 0 0 1-2-2V6"}],["path",{d:"M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"}]]],ev=["svg",h,[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]]],_1=["svg",h,[["circle",{cx:"19",cy:"19",r:"2"}],["circle",{cx:"5",cy:"5",r:"2"}],["path",{d:"M5 7v12h12"}],["path",{d:"m5 19 6-6"}]]],iv=["svg",h,[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}],["path",{d:"M7 21h10"}],["path",{d:"M12 3v18"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"}]]],nv=["svg",h,[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M14 15H9v-5"}],["path",{d:"M16 3h5v5"}],["path",{d:"M21 3 9 15"}]]],pv=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M8 7v10"}],["path",{d:"M12 7v10"}],["path",{d:"M17 7v10"}]]],lv=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{cx:"12",cy:"12",r:"1"}],["path",{d:"M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5"}]]],vv=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 9h.01"}]]],ov=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M7 12h10"}]]],sv=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"m16 16-1.9-1.9"}]]],rv=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M7 8h8"}],["path",{d:"M7 12h10"}],["path",{d:"M7 16h6"}]]],gv=["svg",h,[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]]],yv=["svg",h,[["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}],["circle",{cx:"18.5",cy:"5.5",r:".5",fill:"currentColor"}],["circle",{cx:"11.5",cy:"11.5",r:".5",fill:"currentColor"}],["circle",{cx:"7.5",cy:"16.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"14.5",r:".5",fill:"currentColor"}],["path",{d:"M3 3v18h18"}]]],$v=["svg",h,[["path",{d:"M14 22v-4a2 2 0 1 0-4 0v4"}],["path",{d:"m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"}],["path",{d:"M18 5v17"}],["path",{d:"m4 6 8-4 8 4"}],["path",{d:"M6 5v17"}],["circle",{cx:"12",cy:"9",r:"2"}]]],mv=["svg",h,[["path",{d:"M5.42 9.42 8 12"}],["circle",{cx:"4",cy:"8",r:"2"}],["path",{d:"m14 6-8.58 8.58"}],["circle",{cx:"4",cy:"16",r:"2"}],["path",{d:"M10.8 14.8 14 18"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}]]],uv=["svg",h,[["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M8.12 8.12 12 12"}],["path",{d:"M20 4 8.12 15.88"}],["circle",{cx:"6",cy:"18",r:"3"}],["path",{d:"M14.8 14.8 20 20"}]]],Cv=["svg",h,[["path",{d:"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}],["path",{d:"m22 3-5 5"}],["path",{d:"m17 3 5 5"}]]],Hv=["svg",h,[["path",{d:"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}],["path",{d:"m17 8 5-5"}],["path",{d:"M17 3h5v5"}]]],wv=["svg",h,[["path",{d:"M15 12h-5"}],["path",{d:"M15 8h-5"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"}]]],Vv=["svg",h,[["path",{d:"M19 17V5a2 2 0 0 0-2-2H4"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"}]]],Sv=["svg",h,[["path",{d:"m8 11 2 2 4-4"}],["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]],Av=["svg",h,[["path",{d:"m13 13.5 2-2.5-2-2.5"}],["path",{d:"m21 21-4.3-4.3"}],["path",{d:"M9 8.5 7 11l2 2.5"}],["circle",{cx:"11",cy:"11",r:"8"}]]],Lv=["svg",h,[["path",{d:"m13.5 8.5-5 5"}],["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]],fv=["svg",h,[["path",{d:"m13.5 8.5-5 5"}],["path",{d:"m8.5 8.5 5 5"}],["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]],kv=["svg",h,[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]],Pv=["svg",h,[["path",{d:"M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0"}],["path",{d:"M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0"}]]],a2=["svg",h,[["path",{d:"m3 3 3 9-3 9 19-9Z"}],["path",{d:"M6 12h16"}]]],Bv=["svg",h,[["rect",{x:"14",y:"14",width:"8",height:"8",rx:"2"}],["rect",{x:"2",y:"2",width:"8",height:"8",rx:"2"}],["path",{d:"M7 14v1a2 2 0 0 0 2 2h1"}],["path",{d:"M14 7h1a2 2 0 0 1 2 2v1"}]]],Fv=["svg",h,[["path",{d:"m22 2-7 20-4-9-9-4Z"}],["path",{d:"M22 2 11 13"}]]],Dv=["svg",h,[["line",{x1:"3",x2:"21",y1:"12",y2:"12"}],["polyline",{points:"8 8 12 4 16 8"}],["polyline",{points:"16 16 12 20 8 16"}]]],Zv=["svg",h,[["line",{x1:"12",x2:"12",y1:"3",y2:"21"}],["polyline",{points:"8 8 4 12 8 16"}],["polyline",{points:"16 16 20 12 16 8"}]]],Rv=["svg",h,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"}],["path",{d:"M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"}],["path",{d:"M6 6h.01"}],["path",{d:"M6 18h.01"}],["path",{d:"m15.7 13.4-.9-.3"}],["path",{d:"m9.2 10.9-.9-.3"}],["path",{d:"m10.6 15.7.3-.9"}],["path",{d:"m13.6 15.7-.4-1"}],["path",{d:"m10.8 9.3-.4-1"}],["path",{d:"m8.3 13.6 1-.4"}],["path",{d:"m14.7 10.8 1-.4"}],["path",{d:"m13.4 8.3-.3.9"}]]],qv=["svg",h,[["path",{d:"M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"}],["path",{d:"M6 6h.01"}],["path",{d:"M6 18h.01"}],["path",{d:"m13 6-4 6h6l-4 6"}]]],Tv=["svg",h,[["path",{d:"M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5"}],["path",{d:"M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z"}],["path",{d:"M22 17v-1a2 2 0 0 0-2-2h-1"}],["path",{d:"M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z"}],["path",{d:"M6 18h.01"}],["path",{d:"m2 2 20 20"}]]],bv=["svg",h,[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18"}]]],xv=["svg",h,[["path",{d:"M20 7h-9"}],["path",{d:"M14 17H5"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]]],zv=["svg",h,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],Uv=["svg",h,[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5"}]]],Ov=["svg",h,[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]]],Gv=["svg",h,[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}],["polyline",{points:"16 6 12 2 8 6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15"}]]],Ev=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["line",{x1:"3",x2:"21",y1:"9",y2:"9"}],["line",{x1:"3",x2:"21",y1:"15",y2:"15"}],["line",{x1:"9",x2:"9",y1:"9",y2:"21"}],["line",{x1:"15",x2:"15",y1:"9",y2:"21"}]]],Wv=["svg",h,[["path",{d:"M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"}]]],Iv=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]]],Xv=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m4.243 5.21 14.39 12.472"}]]],Nv=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]]],Kv=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]],Jv=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 22V2"}]]],jv=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M9 12h6"}]]],Qv=["svg",h,[["path",{d:"m2 2 20 20"}],["path",{d:"M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"}],["path",{d:"M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"}]]],Yv=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M9 12h6"}],["path",{d:"M12 9v6"}]]],_v=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]]],h2=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m14.5 9.5-5 5"}],["path",{d:"m9.5 9.5 5 5"}]]],ao=["svg",h,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]]],ho=["svg",h,[["circle",{cx:"12",cy:"12",r:"8"}],["path",{d:"M12 2v7.5"}],["path",{d:"m19 5-5.23 5.23"}],["path",{d:"M22 12h-7.5"}],["path",{d:"m19 19-5.23-5.23"}],["path",{d:"M12 14.5V22"}],["path",{d:"M10.23 13.77 5 19"}],["path",{d:"M9.5 12H2"}],["path",{d:"M10.23 10.23 5 5"}],["circle",{cx:"12",cy:"12",r:"2.5"}]]],to=["svg",h,[["path",{d:"M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"}],["path",{d:"M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"}],["path",{d:"M12 10v4"}],["path",{d:"M12 2v3"}]]],co=["svg",h,[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"}]]],Mo=["svg",h,[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"}],["path",{d:"M3 6h18"}],["path",{d:"M16 10a4 4 0 0 1-8 0"}]]],eo=["svg",h,[["path",{d:"m15 11-1 9"}],["path",{d:"m19 11-4-7"}],["path",{d:"M2 11h20"}],["path",{d:"m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"}],["path",{d:"M4.5 15.5h15"}],["path",{d:"m5 11 4-7"}],["path",{d:"m9 11 1 9"}]]],io=["svg",h,[["circle",{cx:"8",cy:"21",r:"1"}],["circle",{cx:"19",cy:"21",r:"1"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"}]]],no=["svg",h,[["path",{d:"M2 22v-5l5-5 5 5-5 5z"}],["path",{d:"M9.5 14.5 16 8"}],["path",{d:"m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2"}]]],po=["svg",h,[["path",{d:"m4 4 2.5 2.5"}],["path",{d:"M13.5 6.5a4.95 4.95 0 0 0-7 7"}],["path",{d:"M15 5 5 15"}],["path",{d:"M14 17v.01"}],["path",{d:"M10 16v.01"}],["path",{d:"M13 13v.01"}],["path",{d:"M16 10v.01"}],["path",{d:"M11 20v.01"}],["path",{d:"M17 14v.01"}],["path",{d:"M20 11v.01"}]]],lo=["svg",h,[["path",{d:"m15 15 6 6m-6-6v4.8m0-4.8h4.8"}],["path",{d:"M9 19.8V15m0 0H4.2M9 15l-6 6"}],["path",{d:"M15 4.2V9m0 0h4.8M15 9l6-6"}],["path",{d:"M9 4.2V9m0 0H4.2M9 9 3 3"}]]],vo=["svg",h,[["path",{d:"M12 22v-7l-2-2"}],["path",{d:"M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"}],["path",{d:"m14 14-2 2"}]]],oo=["svg",h,[["path",{d:"M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"}],["path",{d:"m18 2 4 4-4 4"}],["path",{d:"M2 6h1.9c1.5 0 2.9.9 3.6 2.2"}],["path",{d:"M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"}],["path",{d:"m18 14 4 4-4 4"}]]],so=["svg",h,[["path",{d:"M18 7V4H6l6 8-6 8h12v-3"}]]],ro=["svg",h,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}],["path",{d:"M12 20v-8"}],["path",{d:"M17 20V8"}]]],go=["svg",h,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}]]],yo=["svg",h,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}],["path",{d:"M12 20v-8"}]]],$o=["svg",h,[["path",{d:"M2 20h.01"}]]],mo=["svg",h,[["path",{d:"M2 20h.01"}],["path",{d:"M7 20v-4"}],["path",{d:"M12 20v-8"}],["path",{d:"M17 20V8"}],["path",{d:"M22 4v16"}]]],uo=["svg",h,[["path",{d:"M10 9H4L2 7l2-2h6"}],["path",{d:"M14 5h6l2 2-2 2h-6"}],["path",{d:"M10 22V4a2 2 0 1 1 4 0v18"}],["path",{d:"M8 22h8"}]]],Co=["svg",h,[["path",{d:"M12 3v3"}],["path",{d:"M18.5 13h-13L2 9.5 5.5 6h13L22 9.5Z"}],["path",{d:"M12 13v8"}]]],Ho=["svg",h,[["path",{d:"M7 18v-6a5 5 0 1 1 10 0v6"}],["path",{d:"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"}],["path",{d:"M21 12h1"}],["path",{d:"M18.5 4.5 18 5"}],["path",{d:"M2 12h1"}],["path",{d:"M12 2v1"}],["path",{d:"m4.929 4.929.707.707"}],["path",{d:"M12 12v6"}]]],wo=["svg",h,[["polygon",{points:"19 20 9 12 19 4 19 20"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5"}]]],Vo=["svg",h,[["polygon",{points:"5 4 15 12 5 20 5 4"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19"}]]],So=["svg",h,[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["path",{d:"M8 20v2h8v-2"}],["path",{d:"m12.5 17-.5-1-.5 1h1z"}],["path",{d:"M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"}]]],Ao=["svg",h,[["rect",{width:"3",height:"8",x:"13",y:"2",rx:"1.5"}],["path",{d:"M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5"}],["rect",{width:"3",height:"8",x:"8",y:"14",rx:"1.5"}],["path",{d:"M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5"}],["rect",{width:"8",height:"3",x:"14",y:"13",rx:"1.5"}],["path",{d:"M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5"}],["rect",{width:"8",height:"3",x:"2",y:"8",rx:"1.5"}],["path",{d:"M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5"}]]],Lo=["svg",h,[["path",{d:"M22 2 2 22"}]]],fo=["svg",h,[["path",{d:"m8 14-6 6h9v-3"}],["path",{d:"M18.37 3.63 8 14l3 3L21.37 6.63a2.12 2.12 0 1 0-3-3Z"}]]],ko=["svg",h,[["line",{x1:"21",x2:"14",y1:"4",y2:"4"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22"}]]],t2=["svg",h,[["line",{x1:"4",x2:"4",y1:"21",y2:"14"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16"}]]],Po=["svg",h,[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2"}],["path",{d:"M12.667 8 10 12h4l-2.667 4"}]]],Bo=["svg",h,[["rect",{width:"7",height:"12",x:"2",y:"6",rx:"1"}],["path",{d:"M13 8.32a7.43 7.43 0 0 1 0 7.36"}],["path",{d:"M16.46 6.21a11.76 11.76 0 0 1 0 11.58"}],["path",{d:"M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"}]]],Fo=["svg",h,[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2"}],["path",{d:"M12 18h.01"}]]],Do=["svg",h,[["path",{d:"M22 11v1a10 10 0 1 1-9-10"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}],["path",{d:"M16 5h6"}],["path",{d:"M19 2v6"}]]],Zo=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9"}]]],Ro=["svg",h,[["path",{d:"M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"}],["circle",{cx:"10",cy:"13",r:"8"}],["path",{d:"M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"}],["path",{d:"M18 3 19.1 5.2"}],["path",{d:"M22 3 20.9 5.2"}]]],qo=["svg",h,[["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"m20 16-4-4 4-4"}],["path",{d:"m4 8 4 4-4 4"}],["path",{d:"m16 4-4 4-4-4"}],["path",{d:"m8 20 4-4 4 4"}]]],To=["svg",h,[["path",{d:"M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"}],["path",{d:"M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"}],["path",{d:"M4 18v2"}],["path",{d:"M20 18v2"}],["path",{d:"M12 4v9"}]]],bo=["svg",h,[["path",{d:"M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"}],["path",{d:"M7 21h10"}],["path",{d:"M19.5 12 22 6"}],["path",{d:"M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"}],["path",{d:"M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"}],["path",{d:"M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"}]]],xo=["svg",h,[["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"}]]],zo=["svg",h,[["path",{d:"M5 9c-1.5 1.5-3 3.2-3 5.5A5.5 5.5 0 0 0 7.5 20c1.8 0 3-.5 4.5-2 1.5 1.5 2.7 2 4.5 2a5.5 5.5 0 0 0 5.5-5.5c0-2.3-1.5-4-3-5.5l-7-7-7 7Z"}],["path",{d:"M12 18v4"}]]],Uo=["svg",h,[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}]]],d2=["svg",h,[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}],["path",{d:"M4 17v2"}],["path",{d:"M5 18H3"}]]],Oo=["svg",h,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["path",{d:"M12 6h.01"}],["circle",{cx:"12",cy:"14",r:"4"}],["path",{d:"M12 14h.01"}]]],Go=["svg",h,[["path",{d:"M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"}],["path",{d:"M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"}],["path",{d:"M17 15a3.5 3.5 0 0 0-.025-4.975"}]]],Eo=["svg",h,[["path",{d:"m6 16 6-12 6 12"}],["path",{d:"M8 12h8"}],["path",{d:"M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"}]]],Wo=["svg",h,[["path",{d:"m6 16 6-12 6 12"}],["path",{d:"M8 12h8"}],["path",{d:"m16 20 2 2 4-4"}]]],Io=["svg",h,[["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}],["path",{d:"M5 17A12 12 0 0 1 17 5"}]]],Xo=["svg",h,[["path",{d:"M16 3h5v5"}],["path",{d:"M8 3H3v5"}],["path",{d:"M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"}],["path",{d:"m15 9 6-6"}]]],No=["svg",h,[["path",{d:"M3 3h.01"}],["path",{d:"M7 5h.01"}],["path",{d:"M11 7h.01"}],["path",{d:"M3 7h.01"}],["path",{d:"M7 9h.01"}],["path",{d:"M3 11h.01"}],["rect",{width:"4",height:"4",x:"15",y:"5"}],["path",{d:"m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"}],["path",{d:"m13 14 8-2"}],["path",{d:"m13 19 8-2"}]]],Ko=["svg",h,[["path",{d:"M7 20h10"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"}]]],c2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M17 12h-2l-2 5-2-10-2 5H7"}]]],M2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m16 8-8 8"}],["path",{d:"M16 16H8V8"}]]],e2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m8 8 8 8"}],["path",{d:"M16 8v8H8"}]]],i2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 8v8"}],["path",{d:"m8 12 4 4 4-4"}]]],n2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m12 8-4 4 4 4"}],["path",{d:"M16 12H8"}]]],p2=["svg",h,[["path",{d:"M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"}],["path",{d:"m3 21 9-9"}],["path",{d:"M9 21H3v-6"}]]],l2=["svg",h,[["path",{d:"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}],["path",{d:"m21 21-9-9"}],["path",{d:"M21 15v6h-6"}]]],v2=["svg",h,[["path",{d:"M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"}],["path",{d:"m3 3 9 9"}],["path",{d:"M3 9V3h6"}]]],o2=["svg",h,[["path",{d:"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"}],["path",{d:"m21 3-9 9"}],["path",{d:"M15 3h6v6"}]]],s2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 12h8"}],["path",{d:"m12 16 4-4-4-4"}]]],r2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 16V8h8"}],["path",{d:"M16 16 8 8"}]]],g2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 8h8v8"}],["path",{d:"m8 16 8-8"}]]],y2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m16 12-4-4-4 4"}],["path",{d:"M12 16V8"}]]],$2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 8v8"}],["path",{d:"m8.5 14 7-4"}],["path",{d:"m8.5 10 7 4"}]]],m2=["svg",h,[["path",{d:"M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2"}],["path",{d:"M10 22H8"}],["path",{d:"M16 22h-2"}],["circle",{cx:"8",cy:"8",r:"2"}],["path",{d:"M9.414 9.414 12 12"}],["path",{d:"M14.8 14.8 18 18"}],["circle",{cx:"8",cy:"16",r:"2"}],["path",{d:"m18 6-8.586 8.586"}]]],u2=["svg",h,[["path",{d:"m9 11 3 3L22 4"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"}]]],C2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m9 12 2 2 4-4"}]]],H2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m16 10-4 4-4-4"}]]],w2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m14 16-4-4 4-4"}]]],V2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m10 8 4 4-4 4"}]]],S2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m8 14 4-4 4 4"}]]],A2=["svg",h,[["path",{d:"M10 9.5 8 12l2 2.5"}],["path",{d:"m14 9.5 2 2.5-2 2.5"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]],Jo=["svg",h,[["path",{d:"M10 9.5 8 12l2 2.5"}],["path",{d:"M14 21h1"}],["path",{d:"m14 9.5 2 2.5-2 2.5"}],["path",{d:"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"}],["path",{d:"M9 21h1"}]]],jo=["svg",h,[["path",{d:"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"}],["path",{d:"M9 21h1"}],["path",{d:"M14 21h1"}]]],L2=["svg",h,[["path",{d:"M8 7v7"}],["path",{d:"M12 7v4"}],["path",{d:"M16 7v9"}],["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M9 3h1"}],["path",{d:"M14 3h1"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"M21 9v1"}],["path",{d:"M21 14v1"}],["path",{d:"M21 19a2 2 0 0 1-2 2"}],["path",{d:"M14 21h1"}],["path",{d:"M9 21h1"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M3 14v1"}],["path",{d:"M3 9v1"}]]],f2=["svg",h,[["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"m12 12 4 10 1.7-4.3L22 16Z"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M9 3h1"}],["path",{d:"M9 21h2"}],["path",{d:"M14 3h1"}],["path",{d:"M3 9v1"}],["path",{d:"M21 9v2"}],["path",{d:"M3 14v1"}]]],k2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"16",y2:"16"}],["line",{x1:"12",x2:"12",y1:"8",y2:"8"}]]],P2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"12",cy:"12",r:"1"}]]],B2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 10h10"}],["path",{d:"M7 14h10"}]]],F2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"}],["path",{d:"M9 11.2h5.7"}]]],D2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 8h7"}],["path",{d:"M8 12h6"}],["path",{d:"M11 16h5"}]]],Z2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 7v7"}],["path",{d:"M12 7v4"}],["path",{d:"M16 7v9"}]]],R2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 7v10"}],["path",{d:"M11 7v10"}],["path",{d:"m15 7 2 10"}]]],q2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 16V8l4 4 4-4v8"}]]],T2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 8h10"}],["path",{d:"M7 12h10"}],["path",{d:"M7 16h10"}]]],b2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 12h8"}]]],x2=["svg",h,[["path",{d:"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}],["path",{d:"m12 12 4 10 1.7-4.3L22 16Z"}]]],z2=["svg",h,[["path",{d:"M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41"}],["path",{d:"M3 8.7V19a2 2 0 0 0 2 2h10.3"}],["path",{d:"m2 2 20 20"}],["path",{d:"M13 13a3 3 0 1 0 0-6H9v2"}],["path",{d:"M9 17v-2.3"}]]],U2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 17V7h4a3 3 0 0 1 0 6H9"}]]],i=["svg",h,[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"}]]],O2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m15 9-6 6"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 15h.01"}]]],G2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M7 7h10"}],["path",{d:"M10 7v10"}],["path",{d:"M16 17a2 2 0 0 1-2-2V7"}]]],E2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 12H9.5a2.5 2.5 0 0 1 0-5H17"}],["path",{d:"M12 7v10"}],["path",{d:"M16 7v10"}]]],W2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"m9 8 6 4-6 4Z"}]]],I2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],X2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 7v5"}],["path",{d:"M8 9a5.14 5.14 0 0 0 4 8 4.95 4.95 0 0 0 4-8"}]]],Qo=["svg",h,[["path",{d:"M7 12h2l2 5 2-10h4"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}]]],N2=["svg",h,[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"2"}],["circle",{cx:"8",cy:"8",r:"2"}],["path",{d:"M9.414 9.414 12 12"}],["path",{d:"M14.8 14.8 18 18"}],["circle",{cx:"8",cy:"16",r:"2"}],["path",{d:"m18 6-8.586 8.586"}]]],K2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M16 8.9V7H8l4 5-4 5h8v-1.9"}]]],J2=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["line",{x1:"9",x2:"15",y1:"15",y2:"9"}]]],j2=["svg",h,[["path",{d:"M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3"}],["path",{d:"M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20"}]]],Q2=["svg",h,[["path",{d:"M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3"}],["path",{d:"M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12"}]]],Yo=["svg",h,[["path",{d:"M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["path",{d:"M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["rect",{width:"8",height:"8",x:"14",y:"14",rx:"2"}]]],Y2=["svg",h,[["path",{d:"m7 11 2-2-2-2"}],["path",{d:"M11 13h4"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}]]],_2=["svg",h,[["path",{d:"M18 21a6 6 0 0 0-12 0"}],["circle",{cx:"12",cy:"11",r:"4"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]],a0=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"}]]],h0=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]]],_o=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]],as=["svg",h,[["path",{d:"M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"}]]],hs=["svg",h,[["path",{d:"M15.236 22a3 3 0 0 0-2.2-5"}],["path",{d:"M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4"}],["path",{d:"M18 13h.01"}],["path",{d:"M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"}]]],ts=["svg",h,[["path",{d:"M5 22h14"}],["path",{d:"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"}],["path",{d:"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"}]]],ds=["svg",h,[["path",{d:"M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"}]]],cs=["svg",h,[["path",{d:"M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43"}],["path",{d:"M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Ms=["svg",h,[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}]]],es=["svg",h,[["line",{x1:"18",x2:"18",y1:"20",y2:"4"}],["polygon",{points:"14,20 4,12 14,4"}]]],is=["svg",h,[["line",{x1:"6",x2:"6",y1:"4",y2:"20"}],["polygon",{points:"10,4 20,12 10,20"}]]],ns=["svg",h,[["path",{d:"M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"}],["path",{d:"M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"}],["circle",{cx:"20",cy:"10",r:"2"}]]],ps=["svg",h,[["path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"}],["path",{d:"M14 3v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 13h0"}],["path",{d:"M16 13h0"}],["path",{d:"M10 16s.8 1 2 1c1.3 0 2-1 2-1"}]]],ls=["svg",h,[["path",{d:"M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"}],["path",{d:"M15 3v4a2 2 0 0 0 2 2h4"}]]],vs=["svg",h,[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"}],["path",{d:"M2 7h20"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"}]]],os=["svg",h,[["rect",{width:"20",height:"6",x:"2",y:"4",rx:"2"}],["rect",{width:"20",height:"6",x:"2",y:"14",rx:"2"}]]],ss=["svg",h,[["rect",{width:"6",height:"20",x:"4",y:"2",rx:"2"}],["rect",{width:"6",height:"20",x:"14",y:"2",rx:"2"}]]],rs=["svg",h,[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12"}]]],gs=["svg",h,[["path",{d:"m4 5 8 8"}],["path",{d:"m12 5-8 8"}],["path",{d:"M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"}]]],ys=["svg",h,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 4h.01"}],["path",{d:"M20 12h.01"}],["path",{d:"M12 20h.01"}],["path",{d:"M4 12h.01"}],["path",{d:"M17.657 6.343h.01"}],["path",{d:"M17.657 17.657h.01"}],["path",{d:"M6.343 17.657h.01"}],["path",{d:"M6.343 6.343h.01"}]]],$s=["svg",h,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 3v1"}],["path",{d:"M12 20v1"}],["path",{d:"M3 12h1"}],["path",{d:"M20 12h1"}],["path",{d:"m18.364 5.636-.707.707"}],["path",{d:"m6.343 17.657-.707.707"}],["path",{d:"m5.636 5.636.707.707"}],["path",{d:"m17.657 17.657.707.707"}]]],ms=["svg",h,[["path",{d:"M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.9 4.9 1.4 1.4"}],["path",{d:"m17.7 17.7 1.4 1.4"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.3 17.7-1.4 1.4"}],["path",{d:"m19.1 4.9-1.4 1.4"}]]],us=["svg",h,[["path",{d:"M10 9a3 3 0 1 0 0 6"}],["path",{d:"M2 12h1"}],["path",{d:"M14 21V3"}],["path",{d:"M10 4V3"}],["path",{d:"M10 21v-1"}],["path",{d:"m3.64 18.36.7-.7"}],["path",{d:"m4.34 6.34-.7-.7"}],["path",{d:"M14 12h8"}],["path",{d:"m17 4-3 3"}],["path",{d:"m14 17 3 3"}],["path",{d:"m21 15-3-3 3-3"}]]],Cs=["svg",h,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]]],Hs=["svg",h,[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]]],ws=["svg",h,[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]]],Vs=["svg",h,[["path",{d:"m4 19 8-8"}],["path",{d:"m12 19-8-8"}],["path",{d:"M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"}]]],Ss=["svg",h,[["path",{d:"M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"}],["path",{d:"M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"}],["path",{d:"M 7 17h0.01"}],["path",{d:"m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"}]]],As=["svg",h,[["path",{d:"M10 21V3h8"}],["path",{d:"M6 16h9"}],["path",{d:"M10 9.5h7"}]]],Ls=["svg",h,[["path",{d:"M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"}],["path",{d:"M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"}],["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"m18 22-3-3 3-3"}],["path",{d:"m6 2 3 3-3 3"}]]],fs=["svg",h,[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19"}]]],ks=["svg",h,[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21"}]]],Ps=["svg",h,[["path",{d:"m18 2 4 4"}],["path",{d:"m17 7 3-3"}],["path",{d:"M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"}],["path",{d:"m9 11 4 4"}],["path",{d:"m5 19-3 3"}],["path",{d:"m14 4 6 6"}]]],Bs=["svg",h,[["path",{d:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"}]]],Fs=["svg",h,[["path",{d:"M12 21v-6"}],["path",{d:"M12 9V3"}],["path",{d:"M3 15h18"}],["path",{d:"M3 9h18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]],Ds=["svg",h,[["path",{d:"M12 15V9"}],["path",{d:"M3 15h18"}],["path",{d:"M3 9h18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]],Zs=["svg",h,[["path",{d:"M14 14v2"}],["path",{d:"M14 20v2"}],["path",{d:"M14 2v2"}],["path",{d:"M14 8v2"}],["path",{d:"M2 15h8"}],["path",{d:"M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"}],["path",{d:"M2 9h8"}],["path",{d:"M22 15h-4"}],["path",{d:"M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"}],["path",{d:"M22 9h-4"}],["path",{d:"M5 3v18"}]]],Rs=["svg",h,[["path",{d:"M15 3v18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M21 9H3"}],["path",{d:"M21 15H3"}]]],qs=["svg",h,[["path",{d:"M14 10h2"}],["path",{d:"M15 22v-8"}],["path",{d:"M15 2v4"}],["path",{d:"M2 10h2"}],["path",{d:"M20 10h2"}],["path",{d:"M3 19h18"}],["path",{d:"M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6"}],["path",{d:"M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2"}],["path",{d:"M8 10h2"}],["path",{d:"M9 22v-8"}],["path",{d:"M9 2v4"}]]],Ts=["svg",h,[["path",{d:"M12 3v18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}]]],bs=["svg",h,[["rect",{width:"10",height:"14",x:"3",y:"8",rx:"2"}],["path",{d:"M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"}],["path",{d:"M8 18h.01"}]]],xs=["svg",h,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18"}]]],zs=["svg",h,[["circle",{cx:"7",cy:"7",r:"5"}],["circle",{cx:"17",cy:"17",r:"5"}],["path",{d:"M12 17h10"}],["path",{d:"m3.46 10.54 7.08-7.08"}]]],Us=["svg",h,[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]]],Os=["svg",h,[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor"}]]],Gs=["svg",h,[["path",{d:"M4 4v16"}]]],Es=["svg",h,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}]]],Ws=["svg",h,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}],["path",{d:"M14 4v16"}]]],Is=["svg",h,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}],["path",{d:"M14 4v16"}],["path",{d:"M19 4v16"}]]],Xs=["svg",h,[["path",{d:"M4 4v16"}],["path",{d:"M9 4v16"}],["path",{d:"M14 4v16"}],["path",{d:"M19 4v16"}],["path",{d:"M22 6 2 18"}]]],Ns=["svg",h,[["circle",{cx:"17",cy:"4",r:"2"}],["path",{d:"M15.59 5.41 5.41 15.59"}],["circle",{cx:"4",cy:"17",r:"2"}],["path",{d:"M12 22s-4-9-1.5-11.5S22 12 22 12"}]]],Ks=["svg",h,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]]],Js=["svg",h,[["path",{d:"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"}],["path",{d:"m13.56 11.747 4.332-.924"}],["path",{d:"m16 21-3.105-6.21"}],["path",{d:"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"}],["path",{d:"m6.158 8.633 1.114 4.456"}],["path",{d:"m8 21 3.105-6.21"}],["circle",{cx:"12",cy:"13",r:"2"}]]],js=["svg",h,[["circle",{cx:"4",cy:"4",r:"2"}],["path",{d:"m14 5 3-3 3 3"}],["path",{d:"m14 10 3-3 3 3"}],["path",{d:"M17 14V2"}],["path",{d:"M17 14H7l-5 8h20Z"}],["path",{d:"M8 14v8"}],["path",{d:"m9 14 5 8"}]]],Qs=["svg",h,[["path",{d:"M3.5 21 14 3"}],["path",{d:"M20.5 21 10 3"}],["path",{d:"M15.5 21 12 15l-3.5 6"}],["path",{d:"M2 21h20"}]]],Ys=["svg",h,[["polyline",{points:"4 17 10 11 4 5"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19"}]]],t0=["svg",h,[["path",{d:"M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01v0a2.83 2.83 0 0 1 0-4L17 3"}],["path",{d:"m16 2 6 6"}],["path",{d:"M12 16H4"}]]],_s=["svg",h,[["path",{d:"M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"}],["path",{d:"M8.5 2h7"}],["path",{d:"M14.5 16h-5"}]]],ar=["svg",h,[["path",{d:"M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2"}],["path",{d:"M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2"}],["path",{d:"M3 2h7"}],["path",{d:"M14 2h7"}],["path",{d:"M9 16H4"}],["path",{d:"M20 16h-5"}]]],hr=["svg",h,[["path",{d:"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1"}],["path",{d:"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"}],["path",{d:"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"}],["path",{d:"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"}],["path",{d:"M9 7v10"}]]],tr=["svg",h,[["path",{d:"M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"}],["path",{d:"M7 22h1a4 4 0 0 0 4-4v-1"}],["path",{d:"M7 2h1a4 4 0 0 1 4 4v1"}]]],dr=["svg",h,[["path",{d:"M17 6H3"}],["path",{d:"M21 12H8"}],["path",{d:"M21 18H8"}],["path",{d:"M3 12v6"}]]],cr=["svg",h,[["path",{d:"M21 6H3"}],["path",{d:"M10 12H3"}],["path",{d:"M10 18H3"}],["circle",{cx:"17",cy:"15",r:"3"}],["path",{d:"m21 19-1.9-1.9"}]]],d0=["svg",h,[["path",{d:"M5 3a2 2 0 0 0-2 2"}],["path",{d:"M19 3a2 2 0 0 1 2 2"}],["path",{d:"M21 19a2 2 0 0 1-2 2"}],["path",{d:"M5 21a2 2 0 0 1-2-2"}],["path",{d:"M9 3h1"}],["path",{d:"M9 21h1"}],["path",{d:"M14 3h1"}],["path",{d:"M14 21h1"}],["path",{d:"M3 9v1"}],["path",{d:"M21 9v1"}],["path",{d:"M3 14v1"}],["path",{d:"M21 14v1"}],["line",{x1:"7",x2:"15",y1:"8",y2:"8"}],["line",{x1:"7",x2:"17",y1:"12",y2:"12"}],["line",{x1:"7",x2:"13",y1:"16",y2:"16"}]]],Mr=["svg",h,[["path",{d:"M17 6.1H3"}],["path",{d:"M21 12.1H3"}],["path",{d:"M15.1 18H3"}]]],er=["svg",h,[["path",{d:"M2 10s3-3 3-8"}],["path",{d:"M22 10s-3-3-3-8"}],["path",{d:"M10 2c0 4.4-3.6 8-8 8"}],["path",{d:"M14 2c0 4.4 3.6 8 8 8"}],["path",{d:"M2 10s2 2 2 5"}],["path",{d:"M22 10s-2 2-2 5"}],["path",{d:"M8 15h8"}],["path",{d:"M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"}],["path",{d:"M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"}]]],ir=["svg",h,[["path",{d:"M2 12h10"}],["path",{d:"M9 4v16"}],["path",{d:"m3 9 3 3-3 3"}],["path",{d:"M12 6 9 9 6 6"}],["path",{d:"m6 18 3-3 1.5 1.5"}],["path",{d:"M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]]],nr=["svg",h,[["path",{d:"M12 9a4 4 0 0 0-2 7.5"}],["path",{d:"M12 3v2"}],["path",{d:"m6.6 18.4-1.4 1.4"}],["path",{d:"M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}],["path",{d:"M4 13H2"}],["path",{d:"M6.34 7.34 4.93 5.93"}]]],pr=["svg",h,[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]]],lr=["svg",h,[["path",{d:"M17 14V2"}],["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"}]]],vr=["svg",h,[["path",{d:"M7 10v12"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"}]]],or=["svg",h,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"m9 12 2 2 4-4"}]]],sr=["svg",h,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M9 12h6"}]]],rr=["svg",h,[["path",{d:"M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M9 9h.01"}],["path",{d:"m15 9-6 6"}],["path",{d:"M15 15h.01"}]]],gr=["svg",h,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M9 12h6"}],["path",{d:"M12 9v6"}]]],yr=["svg",h,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"m9.5 14.5 5-5"}]]],$r=["svg",h,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"m9.5 14.5 5-5"}],["path",{d:"m9.5 9.5 5 5"}]]],mr=["svg",h,[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{d:"M13 5v2"}],["path",{d:"M13 17v2"}],["path",{d:"M13 11v2"}]]],ur=["svg",h,[["path",{d:"M10 2h4"}],["path",{d:"M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7"}],["path",{d:"M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2"}],["path",{d:"m2 2 20 20"}],["path",{d:"M12 12v-2"}]]],Cr=["svg",h,[["path",{d:"M10 2h4"}],["path",{d:"M12 14v-4"}],["path",{d:"M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"}],["path",{d:"M9 17H4v5"}]]],Hr=["svg",h,[["line",{x1:"10",x2:"14",y1:"2",y2:"2"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11"}],["circle",{cx:"12",cy:"14",r:"8"}]]],wr=["svg",h,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6"}],["circle",{cx:"8",cy:"12",r:"2"}]]],Vr=["svg",h,[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6"}],["circle",{cx:"16",cy:"12",r:"2"}]]],Sr=["svg",h,[["path",{d:"M21 4H3"}],["path",{d:"M18 8H6"}],["path",{d:"M19 12H9"}],["path",{d:"M16 16h-6"}],["path",{d:"M11 20H9"}]]],Ar=["svg",h,[["ellipse",{cx:"12",cy:"11",rx:"3",ry:"2"}],["ellipse",{cx:"12",cy:"12.5",rx:"10",ry:"8.5"}]]],Lr=["svg",h,[["path",{d:"M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16"}],["path",{d:"M2 14h12"}],["path",{d:"M22 14h-2"}],["path",{d:"M12 20v-6"}],["path",{d:"m2 2 20 20"}],["path",{d:"M22 16V6a2 2 0 0 0-2-2H10"}]]],fr=["svg",h,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M2 14h20"}],["path",{d:"M12 20v-6"}]]],kr=["svg",h,[["path",{d:"M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z"}],["path",{d:"M8 13v9"}],["path",{d:"M16 22v-9"}],["path",{d:"m9 6 1 7"}],["path",{d:"m15 6-1 7"}],["path",{d:"M12 6V2"}],["path",{d:"M13 2h-2"}]]],Pr=["svg",h,[["rect",{width:"18",height:"12",x:"3",y:"8",rx:"1"}],["path",{d:"M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3"}],["path",{d:"M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3"}]]],Br=["svg",h,[["path",{d:"m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 5h-1"}],["path",{d:"M16 18h-5"}],["path",{d:"M18 5a1 1 0 0 0-1 1v5.573"}],["path",{d:"M3 4h9l1 7.246"}],["path",{d:"M4 11V4"}],["path",{d:"M7 15h.01"}],["path",{d:"M8 10.1V4"}],["circle",{cx:"18",cy:"18",r:"2"}],["circle",{cx:"7",cy:"15",r:"5"}]]],Fr=["svg",h,[["path",{d:"M9.3 6.2a4.55 4.55 0 0 0 5.4 0"}],["path",{d:"M7.9 10.7c.9.8 2.4 1.3 4.1 1.3s3.2-.5 4.1-1.3"}],["path",{d:"M13.9 3.5a1.93 1.93 0 0 0-3.8-.1l-3 10c-.1.2-.1.4-.1.6 0 1.7 2.2 3 5 3s5-1.3 5-3c0-.2 0-.4-.1-.5Z"}],["path",{d:"m7.5 12.2-4.7 2.7c-.5.3-.8.7-.8 1.1s.3.8.8 1.1l7.6 4.5c.9.5 2.1.5 3 0l7.6-4.5c.7-.3 1-.7 1-1.1s-.3-.8-.8-1.1l-4.7-2.8"}]]],Dr=["svg",h,[["path",{d:"M2 22V12a10 10 0 1 1 20 0v10"}],["path",{d:"M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8"}],["path",{d:"M10 15h.01"}],["path",{d:"M14 15h.01"}],["path",{d:"M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z"}],["path",{d:"m9 19-2 3"}],["path",{d:"m15 19 2 3"}]]],Zr=["svg",h,[["path",{d:"M8 3.1V7a4 4 0 0 0 8 0V3.1"}],["path",{d:"m9 15-1-1"}],["path",{d:"m15 15 1-1"}],["path",{d:"M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"}],["path",{d:"m8 19-2 3"}],["path",{d:"m16 19 2 3"}]]],Rr=["svg",h,[["path",{d:"M2 17 17 2"}],["path",{d:"m2 14 8 8"}],["path",{d:"m5 11 8 8"}],["path",{d:"m8 8 8 8"}],["path",{d:"m11 5 8 8"}],["path",{d:"m14 2 8 8"}],["path",{d:"M7 22 22 7"}]]],c0=["svg",h,[["rect",{width:"16",height:"16",x:"4",y:"3",rx:"2"}],["path",{d:"M4 11h16"}],["path",{d:"M12 3v8"}],["path",{d:"m8 19-2 3"}],["path",{d:"m18 22-2-3"}],["path",{d:"M8 15h.01"}],["path",{d:"M16 15h.01"}]]],qr=["svg",h,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],Tr=["svg",h,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}]]],br=["svg",h,[["path",{d:"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"}],["path",{d:"M12 19v3"}]]],M0=["svg",h,[["path",{d:"M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"}],["path",{d:"M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"}],["path",{d:"M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"}],["path",{d:"M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"}]]],xr=["svg",h,[["path",{d:"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"}],["path",{d:"M12 22v-3"}]]],zr=["svg",h,[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"}],["path",{d:"M7 16v6"}],["path",{d:"M13 19v3"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"}]]],Ur=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["rect",{width:"3",height:"9",x:"7",y:"7"}],["rect",{width:"3",height:"5",x:"14",y:"7"}]]],Or=["svg",h,[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7"}],["polyline",{points:"16 17 22 17 22 11"}]]],Gr=["svg",h,[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}],["polyline",{points:"16 7 22 7 22 13"}]]],e0=["svg",h,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],Er=["svg",h,[["path",{d:"M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"}]]],Wr=["svg",h,[["path",{d:"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}]]],Ir=["svg",h,[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18"}],["path",{d:"M4 22h16"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z"}]]],Xr=["svg",h,[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{d:"M15 18H9"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{cx:"17",cy:"18",r:"2"}],["circle",{cx:"7",cy:"18",r:"2"}]]],Nr=["svg",h,[["path",{d:"m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"}],["path",{d:"M4.82 7.9 8 10"}],["path",{d:"M15.18 7.9 12 10"}],["path",{d:"M16.93 10H20a2 2 0 0 1 0 4H2"}]]],Kr=["svg",h,[["path",{d:"M7 21h10"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}]]],Jr=["svg",h,[["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",ry:"2"}],["polyline",{points:"17 2 12 7 7 2"}]]],jr=["svg",h,[["path",{d:"M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"}]]],Qr=["svg",h,[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]]],Yr=["svg",h,[["polyline",{points:"4 7 4 4 20 4 20 7"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20"}]]],_r=["svg",h,[["path",{d:"M12 2v1"}],["path",{d:"M15.5 21a1.85 1.85 0 0 1-3.5-1v-8H2a10 10 0 0 1 3.428-6.575"}],["path",{d:"M17.5 12H22A10 10 0 0 0 9.004 3.455"}],["path",{d:"m2 2 20 20"}]]],ag=["svg",h,[["path",{d:"M22 12a10.06 10.06 1 0 0-20 0Z"}],["path",{d:"M12 12v8a2 2 0 0 0 4 0"}],["path",{d:"M12 2v1"}]]],hg=["svg",h,[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20"}]]],tg=["svg",h,[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"}]]],dg=["svg",h,[["circle",{cx:"12",cy:"17",r:"1"}],["path",{d:"M3 7v6h6"}],["path",{d:"M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"}]]],cg=["svg",h,[["path",{d:"M3 7v6h6"}],["path",{d:"M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"}]]],Mg=["svg",h,[["path",{d:"M16 12h6"}],["path",{d:"M8 12H2"}],["path",{d:"M12 2v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 20v2"}],["path",{d:"m19 15 3-3-3-3"}],["path",{d:"m5 9-3 3 3 3"}]]],eg=["svg",h,[["path",{d:"M12 22v-6"}],["path",{d:"M12 8V2"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m15 5-3-3-3 3"}]]],ig=["svg",h,[["rect",{width:"8",height:"6",x:"5",y:"4",rx:"1"}],["rect",{width:"8",height:"6",x:"11",y:"14",rx:"1"}]]],i0=["svg",h,[["circle",{cx:"12",cy:"10",r:"1"}],["path",{d:"M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"}],["path",{d:"M6 17v.01"}],["path",{d:"M6 13v.01"}],["path",{d:"M18 17v.01"}],["path",{d:"M18 13v.01"}],["path",{d:"M14 22v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"}]]],ng=["svg",h,[["path",{d:"M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2"}]]],pg=["svg",h,[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]]],lg=["svg",h,[["path",{d:"m19 5 3-3"}],["path",{d:"m2 22 3-3"}],["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"}],["path",{d:"M7.5 13.5 10 11"}],["path",{d:"M10.5 16.5 13 14"}],["path",{d:"m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"}]]],vg=["svg",h,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"17 8 12 3 7 8"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15"}]]],og=["svg",h,[["circle",{cx:"10",cy:"7",r:"1"}],["circle",{cx:"4",cy:"20",r:"1"}],["path",{d:"M4.7 19.3 19 5"}],["path",{d:"m21 3-3 1 2 2Z"}],["path",{d:"M9.26 7.68 5 12l2 5"}],["path",{d:"m10 14 5 2 3.5-3.5"}],["path",{d:"m18 12 1-1 1 1-1 1Z"}]]],sg=["svg",h,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["polyline",{points:"16 11 18 13 22 9"}]]],rg=["svg",h,[["circle",{cx:"18",cy:"15",r:"3"}],["circle",{cx:"9",cy:"7",r:"4"}],["path",{d:"M10 15H6a4 4 0 0 0-4 4v2"}],["path",{d:"m21.7 16.4-.9-.3"}],["path",{d:"m15.2 13.9-.9-.3"}],["path",{d:"m16.6 18.7.3-.9"}],["path",{d:"m19.1 12.2.3-.9"}],["path",{d:"m19.6 18.7-.4-1"}],["path",{d:"m16.8 12.3-.4-1"}],["path",{d:"m14.3 16.6 1-.4"}],["path",{d:"m20.7 13.8 1-.4"}]]],gg=["svg",h,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11"}]]],yg=["svg",h,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11"}]]],n0=["svg",h,[["path",{d:"M2 21a8 8 0 0 1 13.292-6"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"m16 19 2 2 4-4"}]]],p0=["svg",h,[["path",{d:"M2 21a8 8 0 0 1 10.434-7.62"}],["circle",{cx:"10",cy:"8",r:"5"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m19.5 14.3-.4.9"}],["path",{d:"m16.9 20.8-.4.9"}],["path",{d:"m21.7 19.5-.9-.4"}],["path",{d:"m15.2 16.9-.9-.4"}],["path",{d:"m21.7 16.5-.9.4"}],["path",{d:"m15.2 19.1-.9.4"}],["path",{d:"m19.5 21.7-.4-.9"}],["path",{d:"m16.9 15.2-.4-.9"}]]],l0=["svg",h,[["path",{d:"M2 21a8 8 0 0 1 13.292-6"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M22 19h-6"}]]],v0=["svg",h,[["path",{d:"M2 21a8 8 0 0 1 13.292-6"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M19 16v6"}],["path",{d:"M22 19h-6"}]]],$g=["svg",h,[["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M2 21a8 8 0 0 1 10.434-7.62"}],["circle",{cx:"18",cy:"18",r:"3"}],["path",{d:"m22 22-1.9-1.9"}]]],o0=["svg",h,[["path",{d:"M2 21a8 8 0 0 1 11.873-7"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"m17 17 5 5"}],["path",{d:"m22 17-5 5"}]]],s0=["svg",h,[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]]],mg=["svg",h,[["circle",{cx:"10",cy:"7",r:"4"}],["path",{d:"M10.3 15H7a4 4 0 0 0-4 4v2"}],["circle",{cx:"17",cy:"17",r:"3"}],["path",{d:"m21 21-1.9-1.9"}]]],ug=["svg",h,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13"}]]],Cg=["svg",h,[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]]],r0=["svg",h,[["path",{d:"M18 21a8 8 0 0 0-16 0"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"}]]],Hg=["svg",h,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}]]],wg=["svg",h,[["path",{d:"m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"}],["path",{d:"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"}],["path",{d:"m2.1 21.8 6.4-6.3"}],["path",{d:"m19 5-7 7"}]]],Vg=["svg",h,[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{d:"M7 2v20"}],["path",{d:"M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]]],Sg=["svg",h,[["path",{d:"M12 2v20"}],["path",{d:"M2 5h20"}],["path",{d:"M3 3v2"}],["path",{d:"M7 3v2"}],["path",{d:"M17 3v2"}],["path",{d:"M21 3v2"}],["path",{d:"m19 5-7 7-7-7"}]]],Ag=["svg",h,[["path",{d:"M8 21s-4-3-4-9 4-9 4-9"}],["path",{d:"M16 3s4 3 4 9-4 9-4 9"}],["line",{x1:"15",x2:"9",y1:"9",y2:"15"}],["line",{x1:"9",x2:"15",y1:"9",y2:"15"}]]],Lg=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}],["path",{d:"m7.9 7.9 2.7 2.7"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}],["path",{d:"m13.4 10.6 2.7-2.7"}],["circle",{cx:"7.5",cy:"16.5",r:".5",fill:"currentColor"}],["path",{d:"m7.9 16.1 2.7-2.7"}],["circle",{cx:"16.5",cy:"16.5",r:".5",fill:"currentColor"}],["path",{d:"m13.4 13.4 2.7 2.7"}],["circle",{cx:"12",cy:"12",r:"2"}]]],fg=["svg",h,[["path",{d:"M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"}],["path",{d:"M16 8c4 0 6-2 6-6-4 0-6 2-6 6"}],["path",{d:"M17.41 3.6a10 10 0 1 0 3 3"}]]],kg=["svg",h,[["path",{d:"M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"}],["path",{d:"M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"}],["path",{d:"M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"}]]],Pg=["svg",h,[["path",{d:"m2 8 2 2-2 2 2 2-2 2"}],["path",{d:"m22 8-2 2 2 2-2 2 2 2"}],["path",{d:"M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2"}],["path",{d:"M16 10.34V6c0-.55-.45-1-1-1h-4.34"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],Bg=["svg",h,[["path",{d:"m2 8 2 2-2 2 2 2-2 2"}],["path",{d:"m22 8-2 2 2 2-2 2 2 2"}],["rect",{width:"8",height:"14",x:"8",y:"5",rx:"1"}]]],Fg=["svg",h,[["path",{d:"M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"}],["path",{d:"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"}],["path",{d:"m2 2 20 20"}]]],Dg=["svg",h,[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2"}]]],Zg=["svg",h,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"M2 8h20"}],["circle",{cx:"8",cy:"14",r:"2"}],["path",{d:"M8 12h8"}],["circle",{cx:"16",cy:"14",r:"2"}]]],Rg=["svg",h,[["path",{d:"M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"}],["path",{d:"M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"}]]],qg=["svg",h,[["circle",{cx:"6",cy:"12",r:"4"}],["circle",{cx:"18",cy:"12",r:"4"}],["line",{x1:"6",x2:"18",y1:"16",y2:"16"}]]],Tg=["svg",h,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"}]]],bg=["svg",h,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14"}]]],xg=["svg",h,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]]],zg=["svg",h,[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}]]],Ug=["svg",h,[["path",{d:"m9 12 2 2 4-4"}],["path",{d:"M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"}],["path",{d:"M22 19H2"}]]],Og=["svg",h,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"}],["path",{d:"M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21"}]]],g0=["svg",h,[["path",{d:"M17 14h.01"}],["path",{d:"M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"}]]],Gg=["svg",h,[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}]]],Eg=["svg",h,[["circle",{cx:"8",cy:"9",r:"2"}],["path",{d:"m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"}],["path",{d:"M8 21h8"}],["path",{d:"M12 17v4"}]]],y0=["svg",h,[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}],["path",{d:"m14 7 3 3"}],["path",{d:"M5 6v4"}],["path",{d:"M19 14v4"}],["path",{d:"M10 2v2"}],["path",{d:"M7 8H3"}],["path",{d:"M21 16h-4"}],["path",{d:"M11 3H9"}]]],Wg=["svg",h,[["path",{d:"M15 4V2"}],["path",{d:"M15 16v-2"}],["path",{d:"M8 9h2"}],["path",{d:"M20 9h2"}],["path",{d:"M17.8 11.8 19 13"}],["path",{d:"M15 9h0"}],["path",{d:"M17.8 6.2 19 5"}],["path",{d:"m3 21 9-9"}],["path",{d:"M12.2 6.2 11 5"}]]],Ig=["svg",h,[["path",{d:"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"}],["path",{d:"M6 18h12"}],["path",{d:"M6 14h12"}],["rect",{width:"12",height:"12",x:"6",y:"10"}]]],Xg=["svg",h,[["path",{d:"M3 6h3"}],["path",{d:"M17 6h.01"}],["rect",{width:"18",height:"20",x:"3",y:"2",rx:"2"}],["circle",{cx:"12",cy:"13",r:"5"}],["path",{d:"M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"}]]],Ng=["svg",h,[["circle",{cx:"12",cy:"12",r:"6"}],["polyline",{points:"12 10 12 12 13 13"}],["path",{d:"m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"}],["path",{d:"m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"}]]],Kg=["svg",h,[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]]],Jg=["svg",h,[["circle",{cx:"12",cy:"4.5",r:"2.5"}],["path",{d:"m10.2 6.3-3.9 3.9"}],["circle",{cx:"4.5",cy:"12",r:"2.5"}],["path",{d:"M7 12h10"}],["circle",{cx:"19.5",cy:"12",r:"2.5"}],["path",{d:"m13.8 17.7 3.9-3.9"}],["circle",{cx:"12",cy:"19.5",r:"2.5"}]]],jg=["svg",h,[["circle",{cx:"12",cy:"10",r:"8"}],["circle",{cx:"12",cy:"10",r:"3"}],["path",{d:"M7 22h10"}],["path",{d:"M12 22v-4"}]]],Qg=["svg",h,[["path",{d:"M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15"}],["path",{d:"M9 3.4a4 4 0 0 1 6.52.66"}],["path",{d:"m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05"}],["path",{d:"M20.3 20.3a4 4 0 0 1-2.3.7"}],["path",{d:"M18.6 13a4 4 0 0 1 3.357 3.414"}],["path",{d:"m12 6 .6 1"}],["path",{d:"m2 2 20 20"}]]],Yg=["svg",h,[["path",{d:"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"}],["path",{d:"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"}],["path",{d:"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"}]]],_g=["svg",h,[["circle",{cx:"12",cy:"5",r:"3"}],["path",{d:"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"}]]],ay=["svg",h,[["path",{d:"m2 22 10-10"}],["path",{d:"m16 8-1.17 1.17"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"}],["path",{d:"M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"}],["path",{d:"M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],hy=["svg",h,[["path",{d:"M2 22 16 8"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}]]],ty=["svg",h,[["circle",{cx:"7",cy:"12",r:"3"}],["path",{d:"M10 9v6"}],["circle",{cx:"17",cy:"12",r:"3"}],["path",{d:"M14 7v8"}],["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"}]]],dy=["svg",h,[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]]],cy=["svg",h,[["path",{d:"M12 20h.01"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}]]],My=["svg",h,[["path",{d:"M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"}],["path",{d:"M9.6 4.6A2 2 0 1 1 11 8H2"}],["path",{d:"M12.6 19.4A2 2 0 1 0 14 16H2"}]]],ey=["svg",h,[["path",{d:"M8 22h8"}],["path",{d:"M7 10h3m7 0h-1.343"}],["path",{d:"M12 15v7"}],["path",{d:"M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22"}]]],iy=["svg",h,[["path",{d:"M8 22h8"}],["path",{d:"M7 10h10"}],["path",{d:"M12 15v7"}],["path",{d:"M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"}]]],ny=["svg",h,[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2"}]]],py=["svg",h,[["path",{d:"m19 12-1.5 3"}],["path",{d:"M19.63 18.81 22 20"}],["path",{d:"M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z"}]]],ly=["svg",h,[["line",{x1:"3",x2:"21",y1:"6",y2:"6"}],["path",{d:"M3 12h15a3 3 0 1 1 0 6h-4"}],["polyline",{points:"16 16 14 18 16 20"}],["line",{x1:"3",x2:"10",y1:"18",y2:"18"}]]],vy=["svg",h,[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"}]]],oy=["svg",h,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],sy=["svg",h,[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]]],ry=["svg",h,[["path",{d:"M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"}],["path",{d:"M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"}],["path",{d:"M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"}],["path",{d:"m2 2 20 20"}]]],gy=["svg",h,[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]]],yy=["svg",h,[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]]],$y=["svg",h,[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]]];var my=Object.freeze({__proto__:null,AArrowDown:u0,AArrowUp:C0,ALargeSmall:H0,Accessibility:w0,Activity:V0,ActivitySquare:c2,AirVent:S0,Airplay:A0,AlarmCheck:v,AlarmClock:f0,AlarmClockCheck:v,AlarmClockMinus:o,AlarmClockOff:L0,AlarmClockPlus:s,AlarmMinus:o,AlarmPlus:s,AlarmSmoke:k0,Album:P0,AlertCircle:f,AlertOctagon:q1,AlertTriangle:e0,AlignCenter:D0,AlignCenterHorizontal:B0,AlignCenterVertical:F0,AlignEndHorizontal:Z0,AlignEndVertical:R0,AlignHorizontalDistributeCenter:q0,AlignHorizontalDistributeEnd:T0,AlignHorizontalDistributeStart:b0,AlignHorizontalJustifyCenter:x0,AlignHorizontalJustifyEnd:z0,AlignHorizontalJustifyStart:U0,AlignHorizontalSpaceAround:O0,AlignHorizontalSpaceBetween:G0,AlignJustify:E0,AlignLeft:W0,AlignRight:I0,AlignStartHorizontal:X0,AlignStartVertical:N0,AlignVerticalDistributeCenter:K0,AlignVerticalDistributeEnd:J0,AlignVerticalDistributeStart:j0,AlignVerticalJustifyCenter:Q0,AlignVerticalJustifyEnd:Y0,AlignVerticalJustifyStart:_0,AlignVerticalSpaceAround:aa,AlignVerticalSpaceBetween:ha,Ambulance:ta,Ampersand:da,Ampersands:ca,Anchor:Ma,Angry:ea,Annoyed:ia,Antenna:na,Anvil:pa,Aperture:la,AppWindow:oa,AppWindowMac:va,Apple:sa,Archive:ya,ArchiveRestore:ra,ArchiveX:ga,AreaChart:$a,Armchair:ma,ArrowBigDown:Ca,ArrowBigDownDash:ua,ArrowBigLeft:wa,ArrowBigLeftDash:Ha,ArrowBigRight:Sa,ArrowBigRightDash:Va,ArrowBigUp:La,ArrowBigUpDash:Aa,ArrowDown:Ta,ArrowDown01:fa,ArrowDown10:ka,ArrowDownAZ:r,ArrowDownAz:r,ArrowDownCircle:k,ArrowDownFromLine:Pa,ArrowDownLeft:Ba,ArrowDownLeftFromCircle:B,ArrowDownLeftFromSquare:p2,ArrowDownLeftSquare:M2,ArrowDownNarrowWide:Fa,ArrowDownRight:Da,ArrowDownRightFromCircle:F,ArrowDownRightFromSquare:l2,ArrowDownRightSquare:e2,ArrowDownSquare:i2,ArrowDownToDot:Za,ArrowDownToLine:Ra,ArrowDownUp:qa,ArrowDownWideNarrow:g,ArrowDownZA:y,ArrowDownZa:y,ArrowLeft:Ua,ArrowLeftCircle:P,ArrowLeftFromLine:ba,ArrowLeftRight:xa,ArrowLeftSquare:n2,ArrowLeftToLine:za,ArrowRight:Wa,ArrowRightCircle:R,ArrowRightFromLine:Oa,ArrowRightLeft:Ga,ArrowRightSquare:s2,ArrowRightToLine:Ea,ArrowUp:ah,ArrowUp01:Ia,ArrowUp10:Xa,ArrowUpAZ:$,ArrowUpAz:$,ArrowUpCircle:q,ArrowUpDown:Na,ArrowUpFromDot:Ka,ArrowUpFromLine:Ja,ArrowUpLeft:ja,ArrowUpLeftFromCircle:D,ArrowUpLeftFromSquare:v2,ArrowUpLeftSquare:r2,ArrowUpNarrowWide:m,ArrowUpRight:Qa,ArrowUpRightFromCircle:Z,ArrowUpRightFromSquare:o2,ArrowUpRightSquare:g2,ArrowUpSquare:y2,ArrowUpToLine:Ya,ArrowUpWideNarrow:_a,ArrowUpZA:u,ArrowUpZa:u,ArrowsUpFromLine:hh,Asterisk:th,AsteriskSquare:$2,AtSign:dh,Atom:ch,AudioLines:Mh,AudioWaveform:eh,Award:ih,Axe:nh,Axis3D:C,Axis3d:C,Baby:ph,Backpack:lh,Badge:Lh,BadgeAlert:vh,BadgeCent:oh,BadgeCheck:H,BadgeDollarSign:sh,BadgeEuro:rh,BadgeHelp:gh,BadgeIndianRupee:yh,BadgeInfo:$h,BadgeJapaneseYen:mh,BadgeMinus:uh,BadgePercent:Ch,BadgePlus:Hh,BadgePoundSterling:wh,BadgeRussianRuble:Vh,BadgeSwissFranc:Sh,BadgeX:Ah,BaggageClaim:fh,Ban:kh,Banana:Ph,Banknote:Bh,BarChart:bh,BarChart2:Fh,BarChart3:Dh,BarChart4:Zh,BarChartBig:Rh,BarChartHorizontal:Th,BarChartHorizontalBig:qh,Barcode:xh,Baseline:zh,Bath:Uh,Battery:Xh,BatteryCharging:Oh,BatteryFull:Gh,BatteryLow:Eh,BatteryMedium:Wh,BatteryWarning:Ih,Beaker:Nh,Bean:Jh,BeanOff:Kh,Bed:Yh,BedDouble:jh,BedSingle:Qh,Beef:_h,Beer:ht,BeerOff:at,Bell:nt,BellDot:tt,BellElectric:dt,BellMinus:ct,BellOff:Mt,BellPlus:et,BellRing:it,BetweenHorizonalEnd:w,BetweenHorizonalStart:V,BetweenHorizontalEnd:w,BetweenHorizontalStart:V,BetweenVerticalEnd:pt,BetweenVerticalStart:lt,Bike:vt,Binary:ot,Biohazard:st,Bird:rt,Bitcoin:gt,Blend:yt,Blinds:$t,Blocks:mt,Bluetooth:wt,BluetoothConnected:ut,BluetoothOff:Ct,BluetoothSearching:Ht,Bold:Vt,Bolt:St,Bomb:At,Bone:Lt,Book:Jt,BookA:ft,BookAudio:kt,BookCheck:Pt,BookCopy:Bt,BookDashed:S,BookDown:Ft,BookHeadphones:Dt,BookHeart:Zt,BookImage:Rt,BookKey:qt,BookLock:Tt,BookMarked:bt,BookMinus:xt,BookOpen:Ot,BookOpenCheck:zt,BookOpenText:Ut,BookPlus:Gt,BookTemplate:S,BookText:Et,BookType:Wt,BookUp:Xt,BookUp2:It,BookUser:Nt,BookX:Kt,Bookmark:a4,BookmarkCheck:jt,BookmarkMinus:Qt,BookmarkPlus:Yt,BookmarkX:_t,BoomBox:h4,Bot:c4,BotMessageSquare:t4,BotOff:d4,Box:e4,BoxSelect:M4,Boxes:i4,Braces:A,Brackets:n4,Brain:v4,BrainCircuit:p4,BrainCog:l4,BrickWall:o4,Briefcase:g4,BriefcaseBusiness:s4,BriefcaseMedical:r4,BringToFront:y4,Brush:$4,Bug:C4,BugOff:m4,BugPlay:u4,Building:w4,Building2:H4,Bus:S4,BusFront:V4,Cable:L4,CableCar:A4,Cake:k4,CakeSlice:f4,Calculator:P4,Calendar:I4,CalendarCheck:F4,CalendarCheck2:B4,CalendarClock:D4,CalendarDays:Z4,CalendarFold:R4,CalendarHeart:q4,CalendarMinus:b4,CalendarMinus2:T4,CalendarOff:x4,CalendarPlus:U4,CalendarPlus2:z4,CalendarRange:O4,CalendarSearch:G4,CalendarX:W4,CalendarX2:E4,Camera:N4,CameraOff:X4,CandlestickChart:K4,Candy:Q4,CandyCane:J4,CandyOff:j4,Cannabis:Y4,Captions:L,CaptionsOff:_4,Car:t5,CarFront:a5,CarTaxiFront:h5,Caravan:d5,Carrot:c5,CaseLower:M5,CaseSensitive:e5,CaseUpper:i5,CassetteTape:n5,Cast:p5,Castle:l5,Cat:v5,Cctv:o5,Check:r5,CheckCheck:s5,CheckCircle:T,CheckCircle2:b,CheckSquare:u2,CheckSquare2:C2,ChefHat:g5,Cherry:y5,ChevronDown:$5,ChevronDownCircle:x,ChevronDownSquare:H2,ChevronFirst:m5,ChevronLast:u5,ChevronLeft:C5,ChevronLeftCircle:z,ChevronLeftSquare:w2,ChevronRight:H5,ChevronRightCircle:U,ChevronRightSquare:V2,ChevronUp:w5,ChevronUpCircle:O,ChevronUpSquare:S2,ChevronsDown:S5,ChevronsDownUp:V5,ChevronsLeft:L5,ChevronsLeftRight:A5,ChevronsRight:k5,ChevronsRightLeft:f5,ChevronsUp:B5,ChevronsUpDown:P5,Chrome:F5,Church:D5,Cigarette:R5,CigaretteOff:Z5,Circle:W5,CircleAlert:f,CircleArrowDown:k,CircleArrowLeft:P,CircleArrowOutDownLeft:B,CircleArrowOutDownRight:F,CircleArrowOutUpLeft:D,CircleArrowOutUpRight:Z,CircleArrowRight:R,CircleArrowUp:q,CircleCheck:b,CircleCheckBig:T,CircleChevronDown:x,CircleChevronLeft:z,CircleChevronRight:U,CircleChevronUp:O,CircleDashed:q5,CircleDivide:G,CircleDollarSign:T5,CircleDot:x5,CircleDotDashed:b5,CircleEllipsis:z5,CircleEqual:U5,CircleFadingPlus:O5,CircleGauge:E,CircleHelp:W,CircleMinus:I,CircleOff:G5,CircleParking:N,CircleParkingOff:X,CirclePause:K,CirclePercent:J,CirclePlay:j,CirclePlus:Q,CirclePower:Y,CircleSlash:E5,CircleSlash2:_,CircleSlashed:_,CircleStop:a1,CircleUser:t1,CircleUserRound:h1,CircleX:d1,CircuitBoard:I5,Citrus:X5,Clapperboard:N5,Clipboard:td,ClipboardCheck:K5,ClipboardCopy:J5,ClipboardEdit:M1,ClipboardList:j5,ClipboardMinus:Q5,ClipboardPaste:Y5,ClipboardPen:M1,ClipboardPenLine:c1,ClipboardPlus:_5,ClipboardSignature:c1,ClipboardType:ad,ClipboardX:hd,Clock:gd,Clock1:dd,Clock10:cd,Clock11:Md,Clock12:ed,Clock2:id,Clock3:nd,Clock4:pd,Clock5:ld,Clock6:vd,Clock7:od,Clock8:sd,Clock9:rd,Cloud:Pd,CloudCog:yd,CloudDownload:e1,CloudDrizzle:$d,CloudFog:md,CloudHail:ud,CloudLightning:Cd,CloudMoon:wd,CloudMoonRain:Hd,CloudOff:Vd,CloudRain:Ad,CloudRainWind:Sd,CloudSnow:Ld,CloudSun:kd,CloudSunRain:fd,CloudUpload:i1,Cloudy:Bd,Clover:Fd,Club:Dd,Code:Zd,Code2:n1,CodeSquare:A2,CodeXml:n1,Codepen:Rd,Codesandbox:qd,Coffee:Td,Cog:bd,Coins:xd,Columns:p1,Columns2:p1,Columns3:l1,Columns4:zd,Combine:Ud,Command:Od,Compass:Gd,Component:Ed,Computer:Wd,ConciergeBell:Id,Cone:Xd,Construction:Nd,Contact:Kd,Contact2:v1,ContactRound:v1,Container:Jd,Contrast:jd,Cookie:Qd,CookingPot:Yd,Copy:c3,CopyCheck:_d,CopyMinus:a3,CopyPlus:h3,CopySlash:t3,CopyX:d3,Copyleft:M3,Copyright:e3,CornerDownLeft:i3,CornerDownRight:n3,CornerLeftDown:p3,CornerLeftUp:l3,CornerRightDown:v3,CornerRightUp:o3,CornerUpLeft:s3,CornerUpRight:r3,Cpu:g3,CreativeCommons:y3,CreditCard:$3,Croissant:m3,Crop:u3,Cross:C3,Crosshair:H3,Crown:w3,Cuboid:V3,CupSoda:S3,CurlyBraces:A,Currency:A3,Cylinder:L3,Database:P3,DatabaseBackup:f3,DatabaseZap:k3,Delete:B3,Dessert:F3,Diameter:D3,Diamond:q3,DiamondMinus:Z3,DiamondPercent:o1,DiamondPlus:R3,Dice1:T3,Dice2:b3,Dice3:x3,Dice4:z3,Dice5:U3,Dice6:O3,Dices:G3,Diff:E3,Disc:N3,Disc2:W3,Disc3:I3,DiscAlbum:X3,Divide:K3,DivideCircle:G,DivideSquare:k2,Dna:j3,DnaOff:J3,Dock:Q3,Dog:Y3,DollarSign:_3,Donut:ac,DoorClosed:hc,DoorOpen:tc,Dot:dc,DotSquare:P2,Download:cc,DownloadCloud:e1,DraftingCompass:Mc,Drama:ec,Dribbble:ic,Drill:nc,Droplet:pc,Droplets:lc,Drum:vc,Drumstick:oc,Dumbbell:sc,Ear:gc,EarOff:rc,Earth:s1,EarthLock:yc,Eclipse:$c,Edit:i,Edit2:K1,Edit3:N1,Egg:Cc,EggFried:mc,EggOff:uc,Ellipsis:g1,EllipsisVertical:r1,Equal:wc,EqualNot:Hc,EqualSquare:B2,Eraser:Vc,Euro:Sc,Expand:Ac,ExternalLink:Lc,Eye:kc,EyeOff:fc,Facebook:Pc,Factory:Bc,Fan:Fc,FastForward:Dc,Feather:Zc,Fence:Rc,FerrisWheel:qc,Figma:Tc,File:T6,FileArchive:bc,FileAudio:zc,FileAudio2:xc,FileAxis3D:y1,FileAxis3d:y1,FileBadge:Oc,FileBadge2:Uc,FileBarChart:Ec,FileBarChart2:Gc,FileBox:Wc,FileCheck:Xc,FileCheck2:Ic,FileClock:Nc,FileCode:Jc,FileCode2:Kc,FileCog:$1,FileCog2:$1,FileDiff:jc,FileDigit:Qc,FileDown:Yc,FileEdit:u1,FileHeart:_c,FileImage:a6,FileInput:h6,FileJson:d6,FileJson2:t6,FileKey:M6,FileKey2:c6,FileLineChart:e6,FileLock:n6,FileLock2:i6,FileMinus:l6,FileMinus2:p6,FileMusic:v6,FileOutput:o6,FilePen:u1,FilePenLine:m1,FilePieChart:s6,FilePlus:g6,FilePlus2:r6,FileQuestion:y6,FileScan:$6,FileSearch:u6,FileSearch2:m6,FileSignature:m1,FileSliders:C6,FileSpreadsheet:H6,FileStack:w6,FileSymlink:V6,FileTerminal:S6,FileText:A6,FileType:f6,FileType2:L6,FileUp:k6,FileVideo:B6,FileVideo2:P6,FileVolume:D6,FileVolume2:F6,FileWarning:Z6,FileX:q6,FileX2:R6,Files:b6,Film:x6,Filter:U6,FilterX:z6,Fingerprint:O6,FireExtinguisher:G6,Fish:I6,FishOff:E6,FishSymbol:W6,Flag:J6,FlagOff:X6,FlagTriangleLeft:N6,FlagTriangleRight:K6,Flame:Q6,FlameKindling:j6,Flashlight:_6,FlashlightOff:Y6,FlaskConical:h8,FlaskConicalOff:a8,FlaskRound:t8,FlipHorizontal:c8,FlipHorizontal2:d8,FlipVertical:e8,FlipVertical2:M8,Flower:n8,Flower2:i8,Focus:p8,FoldHorizontal:l8,FoldVertical:v8,Folder:x8,FolderArchive:o8,FolderCheck:s8,FolderClock:r8,FolderClosed:g8,FolderCog:C1,FolderCog2:C1,FolderDot:y8,FolderDown:$8,FolderEdit:H1,FolderGit:u8,FolderGit2:m8,FolderHeart:C8,FolderInput:H8,FolderKanban:w8,FolderKey:V8,FolderLock:S8,FolderMinus:A8,FolderOpen:f8,FolderOpenDot:L8,FolderOutput:k8,FolderPen:H1,FolderPlus:P8,FolderRoot:B8,FolderSearch:D8,FolderSearch2:F8,FolderSymlink:Z8,FolderSync:R8,FolderTree:q8,FolderUp:T8,FolderX:b8,Folders:z8,Footprints:U8,Forklift:O8,FormInput:J1,Forward:G8,Frame:E8,Framer:W8,Frown:I8,Fuel:X8,Fullscreen:N8,FunctionSquare:F2,GalleryHorizontal:J8,GalleryHorizontalEnd:K8,GalleryThumbnails:j8,GalleryVertical:Y8,GalleryVerticalEnd:Q8,Gamepad:a7,Gamepad2:_8,GanttChart:h7,GanttChartSquare:D2,Gauge:t7,GaugeCircle:E,Gavel:d7,Gem:c7,Ghost:M7,Gift:e7,GitBranch:n7,GitBranchPlus:i7,GitCommit:w1,GitCommitHorizontal:w1,GitCommitVertical:p7,GitCompare:v7,GitCompareArrows:l7,GitFork:o7,GitGraph:s7,GitMerge:r7,GitPullRequest:C7,GitPullRequestArrow:g7,GitPullRequestClosed:y7,GitPullRequestCreate:m7,GitPullRequestCreateArrow:$7,GitPullRequestDraft:u7,Github:H7,Gitlab:w7,GlassWater:V7,Glasses:S7,Globe:L7,Globe2:s1,GlobeLock:A7,Goal:f7,Grab:k7,GraduationCap:P7,Grape:B7,Grid:p,Grid2X2:V1,Grid2x2:V1,Grid2x2Check:F7,Grid2x2X:D7,Grid3X3:p,Grid3x3:p,Grip:q7,GripHorizontal:Z7,GripVertical:R7,Group:T7,Guitar:b7,Ham:x7,Hammer:z7,Hand:W7,HandCoins:U7,HandHeart:O7,HandHelping:S1,HandMetal:G7,HandPlatter:E7,Handshake:I7,HardDrive:K7,HardDriveDownload:X7,HardDriveUpload:N7,HardHat:J7,Hash:j7,Haze:Q7,HdmiPort:Y7,Heading:MM,Heading1:_7,Heading2:aM,Heading3:hM,Heading4:tM,Heading5:dM,Heading6:cM,Headphones:eM,Headset:iM,Heart:oM,HeartCrack:nM,HeartHandshake:pM,HeartOff:lM,HeartPulse:vM,Heater:sM,HelpCircle:W,HelpingHand:S1,Hexagon:rM,Highlighter:gM,History:yM,Home:$M,Hop:uM,HopOff:mM,Hospital:CM,Hotel:HM,Hourglass:wM,IceCream:L1,IceCream2:A1,IceCreamBowl:A1,IceCreamCone:L1,Image:PM,ImageDown:VM,ImageMinus:SM,ImageOff:AM,ImagePlay:LM,ImagePlus:fM,ImageUp:kM,Images:BM,Import:FM,Inbox:DM,Indent:k1,IndentDecrease:f1,IndentIncrease:k1,IndianRupee:ZM,Infinity:RM,Info:qM,Inspect:x2,InspectionPanel:TM,Instagram:bM,Italic:xM,IterationCcw:zM,IterationCw:UM,JapaneseYen:OM,Joystick:GM,Kanban:EM,KanbanSquare:Z2,KanbanSquareDashed:L2,Key:XM,KeyRound:WM,KeySquare:IM,Keyboard:JM,KeyboardMusic:NM,KeyboardOff:KM,Lamp:he,LampCeiling:jM,LampDesk:QM,LampFloor:YM,LampWallDown:_M,LampWallUp:ae,LandPlot:te,Landmark:de,Languages:ce,Laptop:Me,Laptop2:P1,LaptopMinimal:P1,Lasso:ie,LassoSelect:ee,Laugh:ne,Layers:ve,Layers2:pe,Layers3:le,Layout:X1,LayoutDashboard:oe,LayoutGrid:se,LayoutList:re,LayoutPanelLeft:ge,LayoutPanelTop:ye,LayoutTemplate:$e,Leaf:me,LeafyGreen:ue,Lectern:Ce,Library:we,LibraryBig:He,LibrarySquare:R2,LifeBuoy:Ve,Ligature:Se,Lightbulb:Le,LightbulbOff:Ae,LineChart:fe,Link:Be,Link2:Pe,Link2Off:ke,Linkedin:Fe,List:Xe,ListChecks:De,ListCollapse:Ze,ListEnd:Re,ListFilter:qe,ListMinus:Te,ListMusic:be,ListOrdered:xe,ListPlus:ze,ListRestart:Ue,ListStart:Oe,ListTodo:Ge,ListTree:Ee,ListVideo:We,ListX:Ie,Loader:Ke,Loader2:B1,LoaderCircle:B1,LoaderPinwheel:Ne,Locate:Qe,LocateFixed:Je,LocateOff:je,Lock:_e,LockKeyhole:Ye,LockKeyholeOpen:F1,LockOpen:D1,LogIn:ai,LogOut:hi,Lollipop:ti,Luggage:di,MSquare:q2,Magnet:ci,Mail:si,MailCheck:Mi,MailMinus:ei,MailOpen:ii,MailPlus:ni,MailQuestion:pi,MailSearch:li,MailWarning:vi,MailX:oi,Mailbox:ri,Mails:gi,Map:ui,MapPin:$i,MapPinOff:yi,MapPinned:mi,Martini:Ci,Maximize:wi,Maximize2:Hi,Medal:Vi,Megaphone:Ai,MegaphoneOff:Si,Meh:Li,MemoryStick:fi,Menu:ki,MenuSquare:T2,Merge:Pi,MessageCircle:Ui,MessageCircleCode:Bi,MessageCircleDashed:Fi,MessageCircleHeart:Di,MessageCircleMore:Zi,MessageCircleOff:Ri,MessageCirclePlus:qi,MessageCircleQuestion:Ti,MessageCircleReply:bi,MessageCircleWarning:xi,MessageCircleX:zi,MessageSquare:hn,MessageSquareCode:Oi,MessageSquareDashed:Gi,MessageSquareDiff:Ei,MessageSquareDot:Wi,MessageSquareHeart:Ii,MessageSquareMore:Xi,MessageSquareOff:Ni,MessageSquarePlus:Ki,MessageSquareQuote:Ji,MessageSquareReply:ji,MessageSquareShare:Qi,MessageSquareText:Yi,MessageSquareWarning:_i,MessageSquareX:an,MessagesSquare:tn,Mic:cn,Mic2:Z1,MicOff:dn,MicVocal:Z1,Microscope:Mn,Microwave:en,Milestone:nn,Milk:ln,MilkOff:pn,Minimize:on,Minimize2:vn,Minus:sn,MinusCircle:I,MinusSquare:b2,Monitor:An,MonitorCheck:rn,MonitorDot:gn,MonitorDown:yn,MonitorOff:$n,MonitorPause:mn,MonitorPlay:un,MonitorSmartphone:Cn,MonitorSpeaker:Hn,MonitorStop:wn,MonitorUp:Vn,MonitorX:Sn,Moon:fn,MoonStar:Ln,MoreHorizontal:g1,MoreVertical:r1,Mountain:Pn,MountainSnow:kn,Mouse:qn,MouseOff:Bn,MousePointer:Rn,MousePointer2:Fn,MousePointerBan:Dn,MousePointerClick:Zn,MousePointerSquareDashed:f2,Move:Kn,Move3D:R1,Move3d:R1,MoveDiagonal:bn,MoveDiagonal2:Tn,MoveDown:Un,MoveDownLeft:xn,MoveDownRight:zn,MoveHorizontal:On,MoveLeft:Gn,MoveRight:En,MoveUp:Xn,MoveUpLeft:Wn,MoveUpRight:In,MoveVertical:Nn,Music:Yn,Music2:Jn,Music3:jn,Music4:Qn,Navigation:tp,Navigation2:ap,Navigation2Off:_n,NavigationOff:hp,Network:dp,Newspaper:cp,Nfc:Mp,Notebook:pp,NotebookPen:ep,NotebookTabs:ip,NotebookText:np,NotepadText:vp,NotepadTextDashed:lp,Nut:sp,NutOff:op,Octagon:rp,OctagonAlert:q1,OctagonPause:T1,OctagonX:b1,Option:gp,Orbit:yp,Origami:$p,Outdent:f1,Package:Ap,Package2:mp,PackageCheck:up,PackageMinus:Cp,PackageOpen:Hp,PackagePlus:wp,PackageSearch:Vp,PackageX:Sp,PaintBucket:Lp,PaintRoller:fp,Paintbrush:kp,Paintbrush2:x1,PaintbrushVertical:x1,Palette:Pp,Palmtree:M0,PanelBottom:Dp,PanelBottomClose:Bp,PanelBottomDashed:z1,PanelBottomInactive:z1,PanelBottomOpen:Fp,PanelLeft:E1,PanelLeftClose:U1,PanelLeftDashed:O1,PanelLeftInactive:O1,PanelLeftOpen:G1,PanelRight:qp,PanelRightClose:Zp,PanelRightDashed:W1,PanelRightInactive:W1,PanelRightOpen:Rp,PanelTop:xp,PanelTopClose:Tp,PanelTopDashed:I1,PanelTopInactive:I1,PanelTopOpen:bp,PanelsLeftBottom:zp,PanelsLeftRight:l1,PanelsRightBottom:Up,PanelsTopBottom:Y1,PanelsTopLeft:X1,Paperclip:Op,Parentheses:Gp,ParkingCircle:N,ParkingCircleOff:X,ParkingMeter:Ep,ParkingSquare:U2,ParkingSquareOff:z2,PartyPopper:Wp,Pause:Ip,PauseCircle:K,PauseOctagon:T1,PawPrint:Xp,PcCase:Np,Pen:K1,PenBox:i,PenLine:N1,PenSquare:i,PenTool:Kp,Pencil:Qp,PencilLine:Jp,PencilRuler:jp,Pentagon:Yp,Percent:_p,PercentCircle:J,PercentDiamond:o1,PercentSquare:O2,PersonStanding:al,Phone:il,PhoneCall:hl,PhoneForwarded:tl,PhoneIncoming:dl,PhoneMissed:cl,PhoneOff:Ml,PhoneOutgoing:el,Pi:nl,PiSquare:G2,Piano:pl,Pickaxe:ll,PictureInPicture:ol,PictureInPicture2:vl,PieChart:sl,PiggyBank:rl,Pilcrow:$l,PilcrowLeft:gl,PilcrowRight:yl,PilcrowSquare:E2,Pill:ul,PillBottle:ml,Pin:Hl,PinOff:Cl,Pipette:wl,Pizza:Vl,Plane:Ll,PlaneLanding:Sl,PlaneTakeoff:Al,Play:fl,PlayCircle:j,PlaySquare:W2,Plug:Fl,Plug2:kl,PlugZap:Bl,PlugZap2:Pl,Plus:Dl,PlusCircle:Q,PlusSquare:I2,Pocket:Rl,PocketKnife:Zl,Podcast:ql,Pointer:bl,PointerOff:Tl,Popcorn:xl,Popsicle:zl,PoundSterling:Ul,Power:Gl,PowerCircle:Y,PowerOff:Ol,PowerSquare:X2,Presentation:El,Printer:Wl,Projector:Il,Proportions:Xl,Puzzle:Nl,Pyramid:Kl,QrCode:Jl,Quote:jl,Rabbit:Ql,Radar:Yl,Radiation:_l,Radical:a9,Radio:d9,RadioReceiver:h9,RadioTower:t9,Radius:c9,RailSymbol:M9,Rainbow:e9,Rat:i9,Ratio:n9,Receipt:$9,ReceiptCent:p9,ReceiptEuro:l9,ReceiptIndianRupee:v9,ReceiptJapaneseYen:o9,ReceiptPoundSterling:s9,ReceiptRussianRuble:r9,ReceiptSwissFranc:g9,ReceiptText:y9,RectangleEllipsis:J1,RectangleHorizontal:m9,RectangleVertical:u9,Recycle:C9,Redo:V9,Redo2:H9,RedoDot:w9,RefreshCcw:A9,RefreshCcwDot:S9,RefreshCw:f9,RefreshCwOff:L9,Refrigerator:k9,Regex:P9,RemoveFormatting:B9,Repeat:Z9,Repeat1:F9,Repeat2:D9,Replace:q9,ReplaceAll:R9,Reply:b9,ReplyAll:T9,Rewind:x9,Ribbon:z9,Rocket:U9,RockingChair:O9,RollerCoaster:G9,Rotate3D:j1,Rotate3d:j1,RotateCcw:W9,RotateCcwSquare:E9,RotateCw:X9,RotateCwSquare:I9,Route:K9,RouteOff:N9,Router:J9,Rows:Q1,Rows2:Q1,Rows3:Y1,Rows4:j9,Rss:Q9,Ruler:Y9,RussianRuble:_9,Sailboat:av,Salad:hv,Sandwich:tv,Satellite:cv,SatelliteDish:dv,Save:ev,SaveAll:Mv,Scale:iv,Scale3D:_1,Scale3d:_1,Scaling:nv,Scan:gv,ScanBarcode:pv,ScanEye:lv,ScanFace:vv,ScanLine:ov,ScanSearch:sv,ScanText:rv,ScatterChart:yv,School:$v,School2:i0,Scissors:uv,ScissorsLineDashed:mv,ScissorsSquare:N2,ScissorsSquareDashedBottom:m2,ScreenShare:Hv,ScreenShareOff:Cv,Scroll:Vv,ScrollText:wv,Search:kv,SearchCheck:Sv,SearchCode:Av,SearchSlash:Lv,SearchX:fv,Section:Pv,Send:Fv,SendHorizonal:a2,SendHorizontal:a2,SendToBack:Bv,SeparatorHorizontal:Dv,SeparatorVertical:Zv,Server:bv,ServerCog:Rv,ServerCrash:qv,ServerOff:Tv,Settings:zv,Settings2:xv,Shapes:Uv,Share:Gv,Share2:Ov,Sheet:Ev,Shell:Wv,Shield:ao,ShieldAlert:Iv,ShieldBan:Xv,ShieldCheck:Nv,ShieldClose:h2,ShieldEllipsis:Kv,ShieldHalf:Jv,ShieldMinus:jv,ShieldOff:Qv,ShieldPlus:Yv,ShieldQuestion:_v,ShieldX:h2,Ship:to,ShipWheel:ho,Shirt:co,ShoppingBag:Mo,ShoppingBasket:eo,ShoppingCart:io,Shovel:no,ShowerHead:po,Shrink:lo,Shrub:vo,Shuffle:oo,Sidebar:E1,SidebarClose:U1,SidebarOpen:G1,Sigma:so,SigmaSquare:K2,Signal:mo,SignalHigh:ro,SignalLow:go,SignalMedium:yo,SignalZero:$o,Signpost:Co,SignpostBig:uo,Siren:Ho,SkipBack:wo,SkipForward:Vo,Skull:So,Slack:Ao,Slash:Lo,SlashSquare:J2,Slice:fo,Sliders:t2,SlidersHorizontal:ko,SlidersVertical:t2,Smartphone:Fo,SmartphoneCharging:Po,SmartphoneNfc:Bo,Smile:Zo,SmilePlus:Do,Snail:Ro,Snowflake:qo,Sofa:To,SortAsc:m,SortDesc:g,Soup:bo,Space:xo,Spade:zo,Sparkle:Uo,Sparkles:d2,Speaker:Oo,Speech:Go,SpellCheck:Wo,SpellCheck2:Eo,Spline:Io,Split:Xo,SplitSquareHorizontal:j2,SplitSquareVertical:Q2,SprayCan:No,Sprout:Ko,Square:_o,SquareActivity:c2,SquareArrowDown:i2,SquareArrowDownLeft:M2,SquareArrowDownRight:e2,SquareArrowLeft:n2,SquareArrowOutDownLeft:p2,SquareArrowOutDownRight:l2,SquareArrowOutUpLeft:v2,SquareArrowOutUpRight:o2,SquareArrowRight:s2,SquareArrowUp:y2,SquareArrowUpLeft:r2,SquareArrowUpRight:g2,SquareAsterisk:$2,SquareBottomDashedScissors:m2,SquareCheck:C2,SquareCheckBig:u2,SquareChevronDown:H2,SquareChevronLeft:w2,SquareChevronRight:V2,SquareChevronUp:S2,SquareCode:A2,SquareDashedBottom:jo,SquareDashedBottomCode:Jo,SquareDashedKanban:L2,SquareDashedMousePointer:f2,SquareDivide:k2,SquareDot:P2,SquareEqual:B2,SquareFunction:F2,SquareGanttChart:D2,SquareKanban:Z2,SquareLibrary:R2,SquareM:q2,SquareMenu:T2,SquareMinus:b2,SquareMousePointer:x2,SquareParking:U2,SquareParkingOff:z2,SquarePen:i,SquarePercent:O2,SquarePi:G2,SquarePilcrow:E2,SquarePlay:W2,SquarePlus:I2,SquarePower:X2,SquareRadical:Qo,SquareScissors:N2,SquareSigma:K2,SquareSlash:J2,SquareSplitHorizontal:j2,SquareSplitVertical:Q2,SquareStack:Yo,SquareTerminal:Y2,SquareUser:a0,SquareUserRound:_2,SquareX:h0,Squircle:as,Squirrel:hs,Stamp:ts,Star:Ms,StarHalf:ds,StarOff:cs,Stars:d2,StepBack:es,StepForward:is,Stethoscope:ns,Sticker:ps,StickyNote:ls,StopCircle:a1,Store:vs,StretchHorizontal:os,StretchVertical:ss,Strikethrough:rs,Subscript:gs,Subtitles:L,Sun:Cs,SunDim:ys,SunMedium:$s,SunMoon:ms,SunSnow:us,Sunrise:Hs,Sunset:ws,Superscript:Vs,SwatchBook:Ss,SwissFranc:As,SwitchCamera:Ls,Sword:fs,Swords:ks,Syringe:Ps,Table:Ts,Table2:Bs,TableCellsMerge:Fs,TableCellsSplit:Ds,TableColumnsSplit:Zs,TableProperties:Rs,TableRowsSplit:qs,Tablet:xs,TabletSmartphone:bs,Tablets:zs,Tag:Us,Tags:Os,Tally1:Gs,Tally2:Es,Tally3:Ws,Tally4:Is,Tally5:Xs,Tangent:Ns,Target:Ks,Telescope:Js,Tent:Qs,TentTree:js,Terminal:Ys,TerminalSquare:Y2,TestTube:_s,TestTube2:t0,TestTubeDiagonal:t0,TestTubes:ar,Text:Mr,TextCursor:tr,TextCursorInput:hr,TextQuote:dr,TextSearch:cr,TextSelect:d0,TextSelection:d0,Theater:er,Thermometer:pr,ThermometerSnowflake:ir,ThermometerSun:nr,ThumbsDown:lr,ThumbsUp:vr,Ticket:mr,TicketCheck:or,TicketMinus:sr,TicketPercent:rr,TicketPlus:gr,TicketSlash:yr,TicketX:$r,Timer:Hr,TimerOff:ur,TimerReset:Cr,ToggleLeft:wr,ToggleRight:Vr,Tornado:Sr,Torus:Ar,Touchpad:fr,TouchpadOff:Lr,TowerControl:kr,ToyBrick:Pr,Tractor:Br,TrafficCone:Fr,Train:c0,TrainFront:Zr,TrainFrontTunnel:Dr,TrainTrack:Rr,TramFront:c0,Trash:Tr,Trash2:qr,TreeDeciduous:br,TreePalm:M0,TreePine:xr,Trees:zr,Trello:Ur,TrendingDown:Or,TrendingUp:Gr,Triangle:Wr,TriangleAlert:e0,TriangleRight:Er,Trophy:Ir,Truck:Xr,Turtle:Nr,Tv:Jr,Tv2:Kr,Twitch:jr,Twitter:Qr,Type:Yr,Umbrella:ag,UmbrellaOff:_r,Underline:hg,Undo:cg,Undo2:tg,UndoDot:dg,UnfoldHorizontal:Mg,UnfoldVertical:eg,Ungroup:ig,University:i0,Unlink:pg,Unlink2:ng,Unlock:D1,UnlockKeyhole:F1,Unplug:lg,Upload:vg,UploadCloud:i1,Usb:og,User:Cg,User2:s0,UserCheck:sg,UserCheck2:n0,UserCircle:t1,UserCircle2:h1,UserCog:rg,UserCog2:p0,UserMinus:gg,UserMinus2:l0,UserPlus:yg,UserPlus2:v0,UserRound:s0,UserRoundCheck:n0,UserRoundCog:p0,UserRoundMinus:l0,UserRoundPlus:v0,UserRoundSearch:$g,UserRoundX:o0,UserSearch:mg,UserSquare:a0,UserSquare2:_2,UserX:ug,UserX2:o0,Users:Hg,Users2:r0,UsersRound:r0,Utensils:Vg,UtensilsCrossed:wg,UtilityPole:Sg,Variable:Ag,Vault:Lg,Vegan:fg,VenetianMask:kg,Verified:H,Vibrate:Bg,VibrateOff:Pg,Video:Dg,VideoOff:Fg,Videotape:Zg,View:Rg,Voicemail:qg,Volume:zg,Volume1:Tg,Volume2:bg,VolumeX:xg,Vote:Ug,Wallet:Gg,Wallet2:g0,WalletCards:Og,WalletMinimal:g0,Wallpaper:Eg,Wand:Wg,Wand2:y0,WandSparkles:y0,Warehouse:Ig,WashingMachine:Xg,Watch:Ng,Waves:Kg,Waypoints:Jg,Webcam:jg,Webhook:Yg,WebhookOff:Qg,Weight:_g,Wheat:hy,WheatOff:ay,WholeWord:ty,Wifi:cy,WifiOff:dy,Wind:My,Wine:iy,WineOff:ey,Workflow:ny,Worm:py,WrapText:ly,Wrench:vy,X:oy,XCircle:d1,XOctagon:b1,XSquare:h0,Youtube:sy,Zap:gy,ZapOff:ry,ZoomIn:yy,ZoomOut:$y});const fy=({icons:t=my,nameAttr:d="data-lucide",attrs:c={}}={})=>{if(!Object.values(t).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const e=document.querySelectorAll(`[${d}]`);if(Array.from(e).forEach(M=>m0(M,{nameAttr:d,icons:t,attrs:c})),d==="data-lucide"){const M=document.querySelectorAll("[icon-name]");M.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(M).forEach(l=>m0(l,{nameAttr:"icon-name",icons:t,attrs:c})))}};a.AArrowDown=u0,a.AArrowUp=C0,a.ALargeSmall=H0,a.Accessibility=w0,a.Activity=V0,a.ActivitySquare=c2,a.AirVent=S0,a.Airplay=A0,a.AlarmCheck=v,a.AlarmClock=f0,a.AlarmClockCheck=v,a.AlarmClockMinus=o,a.AlarmClockOff=L0,a.AlarmClockPlus=s,a.AlarmMinus=o,a.AlarmPlus=s,a.AlarmSmoke=k0,a.Album=P0,a.AlertCircle=f,a.AlertOctagon=q1,a.AlertTriangle=e0,a.AlignCenter=D0,a.AlignCenterHorizontal=B0,a.AlignCenterVertical=F0,a.AlignEndHorizontal=Z0,a.AlignEndVertical=R0,a.AlignHorizontalDistributeCenter=q0,a.AlignHorizontalDistributeEnd=T0,a.AlignHorizontalDistributeStart=b0,a.AlignHorizontalJustifyCenter=x0,a.AlignHorizontalJustifyEnd=z0,a.AlignHorizontalJustifyStart=U0,a.AlignHorizontalSpaceAround=O0,a.AlignHorizontalSpaceBetween=G0,a.AlignJustify=E0,a.AlignLeft=W0,a.AlignRight=I0,a.AlignStartHorizontal=X0,a.AlignStartVertical=N0,a.AlignVerticalDistributeCenter=K0,a.AlignVerticalDistributeEnd=J0,a.AlignVerticalDistributeStart=j0,a.AlignVerticalJustifyCenter=Q0,a.AlignVerticalJustifyEnd=Y0,a.AlignVerticalJustifyStart=_0,a.AlignVerticalSpaceAround=aa,a.AlignVerticalSpaceBetween=ha,a.Ambulance=ta,a.Ampersand=da,a.Ampersands=ca,a.Anchor=Ma,a.Angry=ea,a.Annoyed=ia,a.Antenna=na,a.Anvil=pa,a.Aperture=la,a.AppWindow=oa,a.AppWindowMac=va,a.Apple=sa,a.Archive=ya,a.ArchiveRestore=ra,a.ArchiveX=ga,a.AreaChart=$a,a.Armchair=ma,a.ArrowBigDown=Ca,a.ArrowBigDownDash=ua,a.ArrowBigLeft=wa,a.ArrowBigLeftDash=Ha,a.ArrowBigRight=Sa,a.ArrowBigRightDash=Va,a.ArrowBigUp=La,a.ArrowBigUpDash=Aa,a.ArrowDown=Ta,a.ArrowDown01=fa,a.ArrowDown10=ka,a.ArrowDownAZ=r,a.ArrowDownAz=r,a.ArrowDownCircle=k,a.ArrowDownFromLine=Pa,a.ArrowDownLeft=Ba,a.ArrowDownLeftFromCircle=B,a.ArrowDownLeftFromSquare=p2,a.ArrowDownLeftSquare=M2,a.ArrowDownNarrowWide=Fa,a.ArrowDownRight=Da,a.ArrowDownRightFromCircle=F,a.ArrowDownRightFromSquare=l2,a.ArrowDownRightSquare=e2,a.ArrowDownSquare=i2,a.ArrowDownToDot=Za,a.ArrowDownToLine=Ra,a.ArrowDownUp=qa,a.ArrowDownWideNarrow=g,a.ArrowDownZA=y,a.ArrowDownZa=y,a.ArrowLeft=Ua,a.ArrowLeftCircle=P,a.ArrowLeftFromLine=ba,a.ArrowLeftRight=xa,a.ArrowLeftSquare=n2,a.ArrowLeftToLine=za,a.ArrowRight=Wa,a.ArrowRightCircle=R,a.ArrowRightFromLine=Oa,a.ArrowRightLeft=Ga,a.ArrowRightSquare=s2,a.ArrowRightToLine=Ea,a.ArrowUp=ah,a.ArrowUp01=Ia,a.ArrowUp10=Xa,a.ArrowUpAZ=$,a.ArrowUpAz=$,a.ArrowUpCircle=q,a.ArrowUpDown=Na,a.ArrowUpFromDot=Ka,a.ArrowUpFromLine=Ja,a.ArrowUpLeft=ja,a.ArrowUpLeftFromCircle=D,a.ArrowUpLeftFromSquare=v2,a.ArrowUpLeftSquare=r2,a.ArrowUpNarrowWide=m,a.ArrowUpRight=Qa,a.ArrowUpRightFromCircle=Z,a.ArrowUpRightFromSquare=o2,a.ArrowUpRightSquare=g2,a.ArrowUpSquare=y2,a.ArrowUpToLine=Ya,a.ArrowUpWideNarrow=_a,a.ArrowUpZA=u,a.ArrowUpZa=u,a.ArrowsUpFromLine=hh,a.Asterisk=th,a.AsteriskSquare=$2,a.AtSign=dh,a.Atom=ch,a.AudioLines=Mh,a.AudioWaveform=eh,a.Award=ih,a.Axe=nh,a.Axis3D=C,a.Axis3d=C,a.Baby=ph,a.Backpack=lh,a.Badge=Lh,a.BadgeAlert=vh,a.BadgeCent=oh,a.BadgeCheck=H,a.BadgeDollarSign=sh,a.BadgeEuro=rh,a.BadgeHelp=gh,a.BadgeIndianRupee=yh,a.BadgeInfo=$h,a.BadgeJapaneseYen=mh,a.BadgeMinus=uh,a.BadgePercent=Ch,a.BadgePlus=Hh,a.BadgePoundSterling=wh,a.BadgeRussianRuble=Vh,a.BadgeSwissFranc=Sh,a.BadgeX=Ah,a.BaggageClaim=fh,a.Ban=kh,a.Banana=Ph,a.Banknote=Bh,a.BarChart=bh,a.BarChart2=Fh,a.BarChart3=Dh,a.BarChart4=Zh,a.BarChartBig=Rh,a.BarChartHorizontal=Th,a.BarChartHorizontalBig=qh,a.Barcode=xh,a.Baseline=zh,a.Bath=Uh,a.Battery=Xh,a.BatteryCharging=Oh,a.BatteryFull=Gh,a.BatteryLow=Eh,a.BatteryMedium=Wh,a.BatteryWarning=Ih,a.Beaker=Nh,a.Bean=Jh,a.BeanOff=Kh,a.Bed=Yh,a.BedDouble=jh,a.BedSingle=Qh,a.Beef=_h,a.Beer=ht,a.BeerOff=at,a.Bell=nt,a.BellDot=tt,a.BellElectric=dt,a.BellMinus=ct,a.BellOff=Mt,a.BellPlus=et,a.BellRing=it,a.BetweenHorizonalEnd=w,a.BetweenHorizonalStart=V,a.BetweenHorizontalEnd=w,a.BetweenHorizontalStart=V,a.BetweenVerticalEnd=pt,a.BetweenVerticalStart=lt,a.Bike=vt,a.Binary=ot,a.Biohazard=st,a.Bird=rt,a.Bitcoin=gt,a.Blend=yt,a.Blinds=$t,a.Blocks=mt,a.Bluetooth=wt,a.BluetoothConnected=ut,a.BluetoothOff=Ct,a.BluetoothSearching=Ht,a.Bold=Vt,a.Bolt=St,a.Bomb=At,a.Bone=Lt,a.Book=Jt,a.BookA=ft,a.BookAudio=kt,a.BookCheck=Pt,a.BookCopy=Bt,a.BookDashed=S,a.BookDown=Ft,a.BookHeadphones=Dt,a.BookHeart=Zt,a.BookImage=Rt,a.BookKey=qt,a.BookLock=Tt,a.BookMarked=bt,a.BookMinus=xt,a.BookOpen=Ot,a.BookOpenCheck=zt,a.BookOpenText=Ut,a.BookPlus=Gt,a.BookTemplate=S,a.BookText=Et,a.BookType=Wt,a.BookUp=Xt,a.BookUp2=It,a.BookUser=Nt,a.BookX=Kt,a.Bookmark=a4,a.BookmarkCheck=jt,a.BookmarkMinus=Qt,a.BookmarkPlus=Yt,a.BookmarkX=_t,a.BoomBox=h4,a.Bot=c4,a.BotMessageSquare=t4,a.BotOff=d4,a.Box=e4,a.BoxSelect=M4,a.Boxes=i4,a.Braces=A,a.Brackets=n4,a.Brain=v4,a.BrainCircuit=p4,a.BrainCog=l4,a.BrickWall=o4,a.Briefcase=g4,a.BriefcaseBusiness=s4,a.BriefcaseMedical=r4,a.BringToFront=y4,a.Brush=$4,a.Bug=C4,a.BugOff=m4,a.BugPlay=u4,a.Building=w4,a.Building2=H4,a.Bus=S4,a.BusFront=V4,a.Cable=L4,a.CableCar=A4,a.Cake=k4,a.CakeSlice=f4,a.Calculator=P4,a.Calendar=I4,a.CalendarCheck=F4,a.CalendarCheck2=B4,a.CalendarClock=D4,a.CalendarDays=Z4,a.CalendarFold=R4,a.CalendarHeart=q4,a.CalendarMinus=b4,a.CalendarMinus2=T4,a.CalendarOff=x4,a.CalendarPlus=U4,a.CalendarPlus2=z4,a.CalendarRange=O4,a.CalendarSearch=G4,a.CalendarX=W4,a.CalendarX2=E4,a.Camera=N4,a.CameraOff=X4,a.CandlestickChart=K4,a.Candy=Q4,a.CandyCane=J4,a.CandyOff=j4,a.Cannabis=Y4,a.Captions=L,a.CaptionsOff=_4,a.Car=t5,a.CarFront=a5,a.CarTaxiFront=h5,a.Caravan=d5,a.Carrot=c5,a.CaseLower=M5,a.CaseSensitive=e5,a.CaseUpper=i5,a.CassetteTape=n5,a.Cast=p5,a.Castle=l5,a.Cat=v5,a.Cctv=o5,a.Check=r5,a.CheckCheck=s5,a.CheckCircle=T,a.CheckCircle2=b,a.CheckSquare=u2,a.CheckSquare2=C2,a.ChefHat=g5,a.Cherry=y5,a.ChevronDown=$5,a.ChevronDownCircle=x,a.ChevronDownSquare=H2,a.ChevronFirst=m5,a.ChevronLast=u5,a.ChevronLeft=C5,a.ChevronLeftCircle=z,a.ChevronLeftSquare=w2,a.ChevronRight=H5,a.ChevronRightCircle=U,a.ChevronRightSquare=V2,a.ChevronUp=w5,a.ChevronUpCircle=O,a.ChevronUpSquare=S2,a.ChevronsDown=S5,a.ChevronsDownUp=V5,a.ChevronsLeft=L5,a.ChevronsLeftRight=A5,a.ChevronsRight=k5,a.ChevronsRightLeft=f5,a.ChevronsUp=B5,a.ChevronsUpDown=P5,a.Chrome=F5,a.Church=D5,a.Cigarette=R5,a.CigaretteOff=Z5,a.Circle=W5,a.CircleAlert=f,a.CircleArrowDown=k,a.CircleArrowLeft=P,a.CircleArrowOutDownLeft=B,a.CircleArrowOutDownRight=F,a.CircleArrowOutUpLeft=D,a.CircleArrowOutUpRight=Z,a.CircleArrowRight=R,a.CircleArrowUp=q,a.CircleCheck=b,a.CircleCheckBig=T,a.CircleChevronDown=x,a.CircleChevronLeft=z,a.CircleChevronRight=U,a.CircleChevronUp=O,a.CircleDashed=q5,a.CircleDivide=G,a.CircleDollarSign=T5,a.CircleDot=x5,a.CircleDotDashed=b5,a.CircleEllipsis=z5,a.CircleEqual=U5,a.CircleFadingPlus=O5,a.CircleGauge=E,a.CircleHelp=W,a.CircleMinus=I,a.CircleOff=G5,a.CircleParking=N,a.CircleParkingOff=X,a.CirclePause=K,a.CirclePercent=J,a.CirclePlay=j,a.CirclePlus=Q,a.CirclePower=Y,a.CircleSlash=E5,a.CircleSlash2=_,a.CircleSlashed=_,a.CircleStop=a1,a.CircleUser=t1,a.CircleUserRound=h1,a.CircleX=d1,a.CircuitBoard=I5,a.Citrus=X5,a.Clapperboard=N5,a.Clipboard=td,a.ClipboardCheck=K5,a.ClipboardCopy=J5,a.ClipboardEdit=M1,a.ClipboardList=j5,a.ClipboardMinus=Q5,a.ClipboardPaste=Y5,a.ClipboardPen=M1,a.ClipboardPenLine=c1,a.ClipboardPlus=_5,a.ClipboardSignature=c1,a.ClipboardType=ad,a.ClipboardX=hd,a.Clock=gd,a.Clock1=dd,a.Clock10=cd,a.Clock11=Md,a.Clock12=ed,a.Clock2=id,a.Clock3=nd,a.Clock4=pd,a.Clock5=ld,a.Clock6=vd,a.Clock7=od,a.Clock8=sd,a.Clock9=rd,a.Cloud=Pd,a.CloudCog=yd,a.CloudDownload=e1,a.CloudDrizzle=$d,a.CloudFog=md,a.CloudHail=ud,a.CloudLightning=Cd,a.CloudMoon=wd,a.CloudMoonRain=Hd,a.CloudOff=Vd,a.CloudRain=Ad,a.CloudRainWind=Sd,a.CloudSnow=Ld,a.CloudSun=kd,a.CloudSunRain=fd,a.CloudUpload=i1,a.Cloudy=Bd,a.Clover=Fd,a.Club=Dd,a.Code=Zd,a.Code2=n1,a.CodeSquare=A2,a.CodeXml=n1,a.Codepen=Rd,a.Codesandbox=qd,a.Coffee=Td,a.Cog=bd,a.Coins=xd,a.Columns=p1,a.Columns2=p1,a.Columns3=l1,a.Columns4=zd,a.Combine=Ud,a.Command=Od,a.Compass=Gd,a.Component=Ed,a.Computer=Wd,a.ConciergeBell=Id,a.Cone=Xd,a.Construction=Nd,a.Contact=Kd,a.Contact2=v1,a.ContactRound=v1,a.Container=Jd,a.Contrast=jd,a.Cookie=Qd,a.CookingPot=Yd,a.Copy=c3,a.CopyCheck=_d,a.CopyMinus=a3,a.CopyPlus=h3,a.CopySlash=t3,a.CopyX=d3,a.Copyleft=M3,a.Copyright=e3,a.CornerDownLeft=i3,a.CornerDownRight=n3,a.CornerLeftDown=p3,a.CornerLeftUp=l3,a.CornerRightDown=v3,a.CornerRightUp=o3,a.CornerUpLeft=s3,a.CornerUpRight=r3,a.Cpu=g3,a.CreativeCommons=y3,a.CreditCard=$3,a.Croissant=m3,a.Crop=u3,a.Cross=C3,a.Crosshair=H3,a.Crown=w3,a.Cuboid=V3,a.CupSoda=S3,a.CurlyBraces=A,a.Currency=A3,a.Cylinder=L3,a.Database=P3,a.DatabaseBackup=f3,a.DatabaseZap=k3,a.Delete=B3,a.Dessert=F3,a.Diameter=D3,a.Diamond=q3,a.DiamondMinus=Z3,a.DiamondPercent=o1,a.DiamondPlus=R3,a.Dice1=T3,a.Dice2=b3,a.Dice3=x3,a.Dice4=z3,a.Dice5=U3,a.Dice6=O3,a.Dices=G3,a.Diff=E3,a.Disc=N3,a.Disc2=W3,a.Disc3=I3,a.DiscAlbum=X3,a.Divide=K3,a.DivideCircle=G,a.DivideSquare=k2,a.Dna=j3,a.DnaOff=J3,a.Dock=Q3,a.Dog=Y3,a.DollarSign=_3,a.Donut=ac,a.DoorClosed=hc,a.DoorOpen=tc,a.Dot=dc,a.DotSquare=P2,a.Download=cc,a.DownloadCloud=e1,a.DraftingCompass=Mc,a.Drama=ec,a.Dribbble=ic,a.Drill=nc,a.Droplet=pc,a.Droplets=lc,a.Drum=vc,a.Drumstick=oc,a.Dumbbell=sc,a.Ear=gc,a.EarOff=rc,a.Earth=s1,a.EarthLock=yc,a.Eclipse=$c,a.Edit=i,a.Edit2=K1,a.Edit3=N1,a.Egg=Cc,a.EggFried=mc,a.EggOff=uc,a.Ellipsis=g1,a.EllipsisVertical=r1,a.Equal=wc,a.EqualNot=Hc,a.EqualSquare=B2,a.Eraser=Vc,a.Euro=Sc,a.Expand=Ac,a.ExternalLink=Lc,a.Eye=kc,a.EyeOff=fc,a.Facebook=Pc,a.Factory=Bc,a.Fan=Fc,a.FastForward=Dc,a.Feather=Zc,a.Fence=Rc,a.FerrisWheel=qc,a.Figma=Tc,a.File=T6,a.FileArchive=bc,a.FileAudio=zc,a.FileAudio2=xc,a.FileAxis3D=y1,a.FileAxis3d=y1,a.FileBadge=Oc,a.FileBadge2=Uc,a.FileBarChart=Ec,a.FileBarChart2=Gc,a.FileBox=Wc,a.FileCheck=Xc,a.FileCheck2=Ic,a.FileClock=Nc,a.FileCode=Jc,a.FileCode2=Kc,a.FileCog=$1,a.FileCog2=$1,a.FileDiff=jc,a.FileDigit=Qc,a.FileDown=Yc,a.FileEdit=u1,a.FileHeart=_c,a.FileImage=a6,a.FileInput=h6,a.FileJson=d6,a.FileJson2=t6,a.FileKey=M6,a.FileKey2=c6,a.FileLineChart=e6,a.FileLock=n6,a.FileLock2=i6,a.FileMinus=l6,a.FileMinus2=p6,a.FileMusic=v6,a.FileOutput=o6,a.FilePen=u1,a.FilePenLine=m1,a.FilePieChart=s6,a.FilePlus=g6,a.FilePlus2=r6,a.FileQuestion=y6,a.FileScan=$6,a.FileSearch=u6,a.FileSearch2=m6,a.FileSignature=m1,a.FileSliders=C6,a.FileSpreadsheet=H6,a.FileStack=w6,a.FileSymlink=V6,a.FileTerminal=S6,a.FileText=A6,a.FileType=f6,a.FileType2=L6,a.FileUp=k6,a.FileVideo=B6,a.FileVideo2=P6,a.FileVolume=D6,a.FileVolume2=F6,a.FileWarning=Z6,a.FileX=q6,a.FileX2=R6,a.Files=b6,a.Film=x6,a.Filter=U6,a.FilterX=z6,a.Fingerprint=O6,a.FireExtinguisher=G6,a.Fish=I6,a.FishOff=E6,a.FishSymbol=W6,a.Flag=J6,a.FlagOff=X6,a.FlagTriangleLeft=N6,a.FlagTriangleRight=K6,a.Flame=Q6,a.FlameKindling=j6,a.Flashlight=_6,a.FlashlightOff=Y6,a.FlaskConical=h8,a.FlaskConicalOff=a8,a.FlaskRound=t8,a.FlipHorizontal=c8,a.FlipHorizontal2=d8,a.FlipVertical=e8,a.FlipVertical2=M8,a.Flower=n8,a.Flower2=i8,a.Focus=p8,a.FoldHorizontal=l8,a.FoldVertical=v8,a.Folder=x8,a.FolderArchive=o8,a.FolderCheck=s8,a.FolderClock=r8,a.FolderClosed=g8,a.FolderCog=C1,a.FolderCog2=C1,a.FolderDot=y8,a.FolderDown=$8,a.FolderEdit=H1,a.FolderGit=u8,a.FolderGit2=m8,a.FolderHeart=C8,a.FolderInput=H8,a.FolderKanban=w8,a.FolderKey=V8,a.FolderLock=S8,a.FolderMinus=A8,a.FolderOpen=f8,a.FolderOpenDot=L8,a.FolderOutput=k8,a.FolderPen=H1,a.FolderPlus=P8,a.FolderRoot=B8,a.FolderSearch=D8,a.FolderSearch2=F8,a.FolderSymlink=Z8,a.FolderSync=R8,a.FolderTree=q8,a.FolderUp=T8,a.FolderX=b8,a.Folders=z8,a.Footprints=U8,a.Forklift=O8,a.FormInput=J1,a.Forward=G8,a.Frame=E8,a.Framer=W8,a.Frown=I8,a.Fuel=X8,a.Fullscreen=N8,a.FunctionSquare=F2,a.GalleryHorizontal=J8,a.GalleryHorizontalEnd=K8,a.GalleryThumbnails=j8,a.GalleryVertical=Y8,a.GalleryVerticalEnd=Q8,a.Gamepad=a7,a.Gamepad2=_8,a.GanttChart=h7,a.GanttChartSquare=D2,a.Gauge=t7,a.GaugeCircle=E,a.Gavel=d7,a.Gem=c7,a.Ghost=M7,a.Gift=e7,a.GitBranch=n7,a.GitBranchPlus=i7,a.GitCommit=w1,a.GitCommitHorizontal=w1,a.GitCommitVertical=p7,a.GitCompare=v7,a.GitCompareArrows=l7,a.GitFork=o7,a.GitGraph=s7,a.GitMerge=r7,a.GitPullRequest=C7,a.GitPullRequestArrow=g7,a.GitPullRequestClosed=y7,a.GitPullRequestCreate=m7,a.GitPullRequestCreateArrow=$7,a.GitPullRequestDraft=u7,a.Github=H7,a.Gitlab=w7,a.GlassWater=V7,a.Glasses=S7,a.Globe=L7,a.Globe2=s1,a.GlobeLock=A7,a.Goal=f7,a.Grab=k7,a.GraduationCap=P7,a.Grape=B7,a.Grid=p,a.Grid2X2=V1,a.Grid2x2=V1,a.Grid2x2Check=F7,a.Grid2x2X=D7,a.Grid3X3=p,a.Grid3x3=p,a.Grip=q7,a.GripHorizontal=Z7,a.GripVertical=R7,a.Group=T7,a.Guitar=b7,a.Ham=x7,a.Hammer=z7,a.Hand=W7,a.HandCoins=U7,a.HandHeart=O7,a.HandHelping=S1,a.HandMetal=G7,a.HandPlatter=E7,a.Handshake=I7,a.HardDrive=K7,a.HardDriveDownload=X7,a.HardDriveUpload=N7,a.HardHat=J7,a.Hash=j7,a.Haze=Q7,a.HdmiPort=Y7,a.Heading=MM,a.Heading1=_7,a.Heading2=aM,a.Heading3=hM,a.Heading4=tM,a.Heading5=dM,a.Heading6=cM,a.Headphones=eM,a.Headset=iM,a.Heart=oM,a.HeartCrack=nM,a.HeartHandshake=pM,a.HeartOff=lM,a.HeartPulse=vM,a.Heater=sM,a.HelpCircle=W,a.HelpingHand=S1,a.Hexagon=rM,a.Highlighter=gM,a.History=yM,a.Home=$M,a.Hop=uM,a.HopOff=mM,a.Hospital=CM,a.Hotel=HM,a.Hourglass=wM,a.IceCream=L1,a.IceCream2=A1,a.IceCreamBowl=A1,a.IceCreamCone=L1,a.Image=PM,a.ImageDown=VM,a.ImageMinus=SM,a.ImageOff=AM,a.ImagePlay=LM,a.ImagePlus=fM,a.ImageUp=kM,a.Images=BM,a.Import=FM,a.Inbox=DM,a.Indent=k1,a.IndentDecrease=f1,a.IndentIncrease=k1,a.IndianRupee=ZM,a.Infinity=RM,a.Info=qM,a.Inspect=x2,a.InspectionPanel=TM,a.Instagram=bM,a.Italic=xM,a.IterationCcw=zM,a.IterationCw=UM,a.JapaneseYen=OM,a.Joystick=GM,a.Kanban=EM,a.KanbanSquare=Z2,a.KanbanSquareDashed=L2,a.Key=XM,a.KeyRound=WM,a.KeySquare=IM,a.Keyboard=JM,a.KeyboardMusic=NM,a.KeyboardOff=KM,a.Lamp=he,a.LampCeiling=jM,a.LampDesk=QM,a.LampFloor=YM,a.LampWallDown=_M,a.LampWallUp=ae,a.LandPlot=te,a.Landmark=de,a.Languages=ce,a.Laptop=Me,a.Laptop2=P1,a.LaptopMinimal=P1,a.Lasso=ie,a.LassoSelect=ee,a.Laugh=ne,a.Layers=ve,a.Layers2=pe,a.Layers3=le,a.Layout=X1,a.LayoutDashboard=oe,a.LayoutGrid=se,a.LayoutList=re,a.LayoutPanelLeft=ge,a.LayoutPanelTop=ye,a.LayoutTemplate=$e,a.Leaf=me,a.LeafyGreen=ue,a.Lectern=Ce,a.Library=we,a.LibraryBig=He,a.LibrarySquare=R2,a.LifeBuoy=Ve,a.Ligature=Se,a.Lightbulb=Le,a.LightbulbOff=Ae,a.LineChart=fe,a.Link=Be,a.Link2=Pe,a.Link2Off=ke,a.Linkedin=Fe,a.List=Xe,a.ListChecks=De,a.ListCollapse=Ze,a.ListEnd=Re,a.ListFilter=qe,a.ListMinus=Te,a.ListMusic=be,a.ListOrdered=xe,a.ListPlus=ze,a.ListRestart=Ue,a.ListStart=Oe,a.ListTodo=Ge,a.ListTree=Ee,a.ListVideo=We,a.ListX=Ie,a.Loader=Ke,a.Loader2=B1,a.LoaderCircle=B1,a.LoaderPinwheel=Ne,a.Locate=Qe,a.LocateFixed=Je,a.LocateOff=je,a.Lock=_e,a.LockKeyhole=Ye,a.LockKeyholeOpen=F1,a.LockOpen=D1,a.LogIn=ai,a.LogOut=hi,a.Lollipop=ti,a.Luggage=di,a.MSquare=q2,a.Magnet=ci,a.Mail=si,a.MailCheck=Mi,a.MailMinus=ei,a.MailOpen=ii,a.MailPlus=ni,a.MailQuestion=pi,a.MailSearch=li,a.MailWarning=vi,a.MailX=oi,a.Mailbox=ri,a.Mails=gi,a.Map=ui,a.MapPin=$i,a.MapPinOff=yi,a.MapPinned=mi,a.Martini=Ci,a.Maximize=wi,a.Maximize2=Hi,a.Medal=Vi,a.Megaphone=Ai,a.MegaphoneOff=Si,a.Meh=Li,a.MemoryStick=fi,a.Menu=ki,a.MenuSquare=T2,a.Merge=Pi,a.MessageCircle=Ui,a.MessageCircleCode=Bi,a.MessageCircleDashed=Fi,a.MessageCircleHeart=Di,a.MessageCircleMore=Zi,a.MessageCircleOff=Ri,a.MessageCirclePlus=qi,a.MessageCircleQuestion=Ti,a.MessageCircleReply=bi,a.MessageCircleWarning=xi,a.MessageCircleX=zi,a.MessageSquare=hn,a.MessageSquareCode=Oi,a.MessageSquareDashed=Gi,a.MessageSquareDiff=Ei,a.MessageSquareDot=Wi,a.MessageSquareHeart=Ii,a.MessageSquareMore=Xi,a.MessageSquareOff=Ni,a.MessageSquarePlus=Ki,a.MessageSquareQuote=Ji,a.MessageSquareReply=ji,a.MessageSquareShare=Qi,a.MessageSquareText=Yi,a.MessageSquareWarning=_i,a.MessageSquareX=an,a.MessagesSquare=tn,a.Mic=cn,a.Mic2=Z1,a.MicOff=dn,a.MicVocal=Z1,a.Microscope=Mn,a.Microwave=en,a.Milestone=nn,a.Milk=ln,a.MilkOff=pn,a.Minimize=on,a.Minimize2=vn,a.Minus=sn,a.MinusCircle=I,a.MinusSquare=b2,a.Monitor=An,a.MonitorCheck=rn,a.MonitorDot=gn,a.MonitorDown=yn,a.MonitorOff=$n,a.MonitorPause=mn,a.MonitorPlay=un,a.MonitorSmartphone=Cn,a.MonitorSpeaker=Hn,a.MonitorStop=wn,a.MonitorUp=Vn,a.MonitorX=Sn,a.Moon=fn,a.MoonStar=Ln,a.MoreHorizontal=g1,a.MoreVertical=r1,a.Mountain=Pn,a.MountainSnow=kn,a.Mouse=qn,a.MouseOff=Bn,a.MousePointer=Rn,a.MousePointer2=Fn,a.MousePointerBan=Dn,a.MousePointerClick=Zn,a.MousePointerSquareDashed=f2,a.Move=Kn,a.Move3D=R1,a.Move3d=R1,a.MoveDiagonal=bn,a.MoveDiagonal2=Tn,a.MoveDown=Un,a.MoveDownLeft=xn,a.MoveDownRight=zn,a.MoveHorizontal=On,a.MoveLeft=Gn,a.MoveRight=En,a.MoveUp=Xn,a.MoveUpLeft=Wn,a.MoveUpRight=In,a.MoveVertical=Nn,a.Music=Yn,a.Music2=Jn,a.Music3=jn,a.Music4=Qn,a.Navigation=tp,a.Navigation2=ap,a.Navigation2Off=_n,a.NavigationOff=hp,a.Network=dp,a.Newspaper=cp,a.Nfc=Mp,a.Notebook=pp,a.NotebookPen=ep,a.NotebookTabs=ip,a.NotebookText=np,a.NotepadText=vp,a.NotepadTextDashed=lp,a.Nut=sp,a.NutOff=op,a.Octagon=rp,a.OctagonAlert=q1,a.OctagonPause=T1,a.OctagonX=b1,a.Option=gp,a.Orbit=yp,a.Origami=$p,a.Outdent=f1,a.Package=Ap,a.Package2=mp,a.PackageCheck=up,a.PackageMinus=Cp,a.PackageOpen=Hp,a.PackagePlus=wp,a.PackageSearch=Vp,a.PackageX=Sp,a.PaintBucket=Lp,a.PaintRoller=fp,a.Paintbrush=kp,a.Paintbrush2=x1,a.PaintbrushVertical=x1,a.Palette=Pp,a.Palmtree=M0,a.PanelBottom=Dp,a.PanelBottomClose=Bp,a.PanelBottomDashed=z1,a.PanelBottomInactive=z1,a.PanelBottomOpen=Fp,a.PanelLeft=E1,a.PanelLeftClose=U1,a.PanelLeftDashed=O1,a.PanelLeftInactive=O1,a.PanelLeftOpen=G1,a.PanelRight=qp,a.PanelRightClose=Zp,a.PanelRightDashed=W1,a.PanelRightInactive=W1,a.PanelRightOpen=Rp,a.PanelTop=xp,a.PanelTopClose=Tp,a.PanelTopDashed=I1,a.PanelTopInactive=I1,a.PanelTopOpen=bp,a.PanelsLeftBottom=zp,a.PanelsLeftRight=l1,a.PanelsRightBottom=Up,a.PanelsTopBottom=Y1,a.PanelsTopLeft=X1,a.Paperclip=Op,a.Parentheses=Gp,a.ParkingCircle=N,a.ParkingCircleOff=X,a.ParkingMeter=Ep,a.ParkingSquare=U2,a.ParkingSquareOff=z2,a.PartyPopper=Wp,a.Pause=Ip,a.PauseCircle=K,a.PauseOctagon=T1,a.PawPrint=Xp,a.PcCase=Np,a.Pen=K1,a.PenBox=i,a.PenLine=N1,a.PenSquare=i,a.PenTool=Kp,a.Pencil=Qp,a.PencilLine=Jp,a.PencilRuler=jp,a.Pentagon=Yp,a.Percent=_p,a.PercentCircle=J,a.PercentDiamond=o1,a.PercentSquare=O2,a.PersonStanding=al,a.Phone=il,a.PhoneCall=hl,a.PhoneForwarded=tl,a.PhoneIncoming=dl,a.PhoneMissed=cl,a.PhoneOff=Ml,a.PhoneOutgoing=el,a.Pi=nl,a.PiSquare=G2,a.Piano=pl,a.Pickaxe=ll,a.PictureInPicture=ol,a.PictureInPicture2=vl,a.PieChart=sl,a.PiggyBank=rl,a.Pilcrow=$l,a.PilcrowLeft=gl,a.PilcrowRight=yl,a.PilcrowSquare=E2,a.Pill=ul,a.PillBottle=ml,a.Pin=Hl,a.PinOff=Cl,a.Pipette=wl,a.Pizza=Vl,a.Plane=Ll,a.PlaneLanding=Sl,a.PlaneTakeoff=Al,a.Play=fl,a.PlayCircle=j,a.PlaySquare=W2,a.Plug=Fl,a.Plug2=kl,a.PlugZap=Bl,a.PlugZap2=Pl,a.Plus=Dl,a.PlusCircle=Q,a.PlusSquare=I2,a.Pocket=Rl,a.PocketKnife=Zl,a.Podcast=ql,a.Pointer=bl,a.PointerOff=Tl,a.Popcorn=xl,a.Popsicle=zl,a.PoundSterling=Ul,a.Power=Gl,a.PowerCircle=Y,a.PowerOff=Ol,a.PowerSquare=X2,a.Presentation=El,a.Printer=Wl,a.Projector=Il,a.Proportions=Xl,a.Puzzle=Nl,a.Pyramid=Kl,a.QrCode=Jl,a.Quote=jl,a.Rabbit=Ql,a.Radar=Yl,a.Radiation=_l,a.Radical=a9,a.Radio=d9,a.RadioReceiver=h9,a.RadioTower=t9,a.Radius=c9,a.RailSymbol=M9,a.Rainbow=e9,a.Rat=i9,a.Ratio=n9,a.Receipt=$9,a.ReceiptCent=p9,a.ReceiptEuro=l9,a.ReceiptIndianRupee=v9,a.ReceiptJapaneseYen=o9,a.ReceiptPoundSterling=s9,a.ReceiptRussianRuble=r9,a.ReceiptSwissFranc=g9,a.ReceiptText=y9,a.RectangleEllipsis=J1,a.RectangleHorizontal=m9,a.RectangleVertical=u9,a.Recycle=C9,a.Redo=V9,a.Redo2=H9,a.RedoDot=w9,a.RefreshCcw=A9,a.RefreshCcwDot=S9,a.RefreshCw=f9,a.RefreshCwOff=L9,a.Refrigerator=k9,a.Regex=P9,a.RemoveFormatting=B9,a.Repeat=Z9,a.Repeat1=F9,a.Repeat2=D9,a.Replace=q9,a.ReplaceAll=R9,a.Reply=b9,a.ReplyAll=T9,a.Rewind=x9,a.Ribbon=z9,a.Rocket=U9,a.RockingChair=O9,a.RollerCoaster=G9,a.Rotate3D=j1,a.Rotate3d=j1,a.RotateCcw=W9,a.RotateCcwSquare=E9,a.RotateCw=X9,a.RotateCwSquare=I9,a.Route=K9,a.RouteOff=N9,a.Router=J9,a.Rows=Q1,a.Rows2=Q1,a.Rows3=Y1,a.Rows4=j9,a.Rss=Q9,a.Ruler=Y9,a.RussianRuble=_9,a.Sailboat=av,a.Salad=hv,a.Sandwich=tv,a.Satellite=cv,a.SatelliteDish=dv,a.Save=ev,a.SaveAll=Mv,a.Scale=iv,a.Scale3D=_1,a.Scale3d=_1,a.Scaling=nv,a.Scan=gv,a.ScanBarcode=pv,a.ScanEye=lv,a.ScanFace=vv,a.ScanLine=ov,a.ScanSearch=sv,a.ScanText=rv,a.ScatterChart=yv,a.School=$v,a.School2=i0,a.Scissors=uv,a.ScissorsLineDashed=mv,a.ScissorsSquare=N2,a.ScissorsSquareDashedBottom=m2,a.ScreenShare=Hv,a.ScreenShareOff=Cv,a.Scroll=Vv,a.ScrollText=wv,a.Search=kv,a.SearchCheck=Sv,a.SearchCode=Av,a.SearchSlash=Lv,a.SearchX=fv,a.Section=Pv,a.Send=Fv,a.SendHorizonal=a2,a.SendHorizontal=a2,a.SendToBack=Bv,a.SeparatorHorizontal=Dv,a.SeparatorVertical=Zv,a.Server=bv,a.ServerCog=Rv,a.ServerCrash=qv,a.ServerOff=Tv,a.Settings=zv,a.Settings2=xv,a.Shapes=Uv,a.Share=Gv,a.Share2=Ov,a.Sheet=Ev,a.Shell=Wv,a.Shield=ao,a.ShieldAlert=Iv,a.ShieldBan=Xv,a.ShieldCheck=Nv,a.ShieldClose=h2,a.ShieldEllipsis=Kv,a.ShieldHalf=Jv,a.ShieldMinus=jv,a.ShieldOff=Qv,a.ShieldPlus=Yv,a.ShieldQuestion=_v,a.ShieldX=h2,a.Ship=to,a.ShipWheel=ho,a.Shirt=co,a.ShoppingBag=Mo,a.ShoppingBasket=eo,a.ShoppingCart=io,a.Shovel=no,a.ShowerHead=po,a.Shrink=lo,a.Shrub=vo,a.Shuffle=oo,a.Sidebar=E1,a.SidebarClose=U1,a.SidebarOpen=G1,a.Sigma=so,a.SigmaSquare=K2,a.Signal=mo,a.SignalHigh=ro,a.SignalLow=go,a.SignalMedium=yo,a.SignalZero=$o,a.Signpost=Co,a.SignpostBig=uo,a.Siren=Ho,a.SkipBack=wo,a.SkipForward=Vo,a.Skull=So,a.Slack=Ao,a.Slash=Lo,a.SlashSquare=J2,a.Slice=fo,a.Sliders=t2,a.SlidersHorizontal=ko,a.SlidersVertical=t2,a.Smartphone=Fo,a.SmartphoneCharging=Po,a.SmartphoneNfc=Bo,a.Smile=Zo,a.SmilePlus=Do,a.Snail=Ro,a.Snowflake=qo,a.Sofa=To,a.SortAsc=m,a.SortDesc=g,a.Soup=bo,a.Space=xo,a.Spade=zo,a.Sparkle=Uo,a.Sparkles=d2,a.Speaker=Oo,a.Speech=Go,a.SpellCheck=Wo,a.SpellCheck2=Eo,a.Spline=Io,a.Split=Xo,a.SplitSquareHorizontal=j2,a.SplitSquareVertical=Q2,a.SprayCan=No,a.Sprout=Ko,a.Square=_o,a.SquareActivity=c2,a.SquareArrowDown=i2,a.SquareArrowDownLeft=M2,a.SquareArrowDownRight=e2,a.SquareArrowLeft=n2,a.SquareArrowOutDownLeft=p2,a.SquareArrowOutDownRight=l2,a.SquareArrowOutUpLeft=v2,a.SquareArrowOutUpRight=o2,a.SquareArrowRight=s2,a.SquareArrowUp=y2,a.SquareArrowUpLeft=r2,a.SquareArrowUpRight=g2,a.SquareAsterisk=$2,a.SquareBottomDashedScissors=m2,a.SquareCheck=C2,a.SquareCheckBig=u2,a.SquareChevronDown=H2,a.SquareChevronLeft=w2,a.SquareChevronRight=V2,a.SquareChevronUp=S2,a.SquareCode=A2,a.SquareDashedBottom=jo,a.SquareDashedBottomCode=Jo,a.SquareDashedKanban=L2,a.SquareDashedMousePointer=f2,a.SquareDivide=k2,a.SquareDot=P2,a.SquareEqual=B2,a.SquareFunction=F2,a.SquareGanttChart=D2,a.SquareKanban=Z2,a.SquareLibrary=R2,a.SquareM=q2,a.SquareMenu=T2,a.SquareMinus=b2,a.SquareMousePointer=x2,a.SquareParking=U2,a.SquareParkingOff=z2,a.SquarePen=i,a.SquarePercent=O2,a.SquarePi=G2,a.SquarePilcrow=E2,a.SquarePlay=W2,a.SquarePlus=I2,a.SquarePower=X2,a.SquareRadical=Qo,a.SquareScissors=N2,a.SquareSigma=K2,a.SquareSlash=J2,a.SquareSplitHorizontal=j2,a.SquareSplitVertical=Q2,a.SquareStack=Yo,a.SquareTerminal=Y2,a.SquareUser=a0,a.SquareUserRound=_2,a.SquareX=h0,a.Squircle=as,a.Squirrel=hs,a.Stamp=ts,a.Star=Ms,a.StarHalf=ds,a.StarOff=cs,a.Stars=d2,a.StepBack=es,a.StepForward=is,a.Stethoscope=ns,a.Sticker=ps,a.StickyNote=ls,a.StopCircle=a1,a.Store=vs,a.StretchHorizontal=os,a.StretchVertical=ss,a.Strikethrough=rs,a.Subscript=gs,a.Subtitles=L,a.Sun=Cs,a.SunDim=ys,a.SunMedium=$s,a.SunMoon=ms,a.SunSnow=us,a.Sunrise=Hs,a.Sunset=ws,a.Superscript=Vs,a.SwatchBook=Ss,a.SwissFranc=As,a.SwitchCamera=Ls,a.Sword=fs,a.Swords=ks,a.Syringe=Ps,a.Table=Ts,a.Table2=Bs,a.TableCellsMerge=Fs,a.TableCellsSplit=Ds,a.TableColumnsSplit=Zs,a.TableProperties=Rs,a.TableRowsSplit=qs,a.Tablet=xs,a.TabletSmartphone=bs,a.Tablets=zs,a.Tag=Us,a.Tags=Os,a.Tally1=Gs,a.Tally2=Es,a.Tally3=Ws,a.Tally4=Is,a.Tally5=Xs,a.Tangent=Ns,a.Target=Ks,a.Telescope=Js,a.Tent=Qs,a.TentTree=js,a.Terminal=Ys,a.TerminalSquare=Y2,a.TestTube=_s,a.TestTube2=t0,a.TestTubeDiagonal=t0,a.TestTubes=ar,a.Text=Mr,a.TextCursor=tr,a.TextCursorInput=hr,a.TextQuote=dr,a.TextSearch=cr,a.TextSelect=d0,a.TextSelection=d0,a.Theater=er,a.Thermometer=pr,a.ThermometerSnowflake=ir,a.ThermometerSun=nr,a.ThumbsDown=lr,a.ThumbsUp=vr,a.Ticket=mr,a.TicketCheck=or,a.TicketMinus=sr,a.TicketPercent=rr,a.TicketPlus=gr,a.TicketSlash=yr,a.TicketX=$r,a.Timer=Hr,a.TimerOff=ur,a.TimerReset=Cr,a.ToggleLeft=wr,a.ToggleRight=Vr,a.Tornado=Sr,a.Torus=Ar,a.Touchpad=fr,a.TouchpadOff=Lr,a.TowerControl=kr,a.ToyBrick=Pr,a.Tractor=Br,a.TrafficCone=Fr,a.Train=c0,a.TrainFront=Zr,a.TrainFrontTunnel=Dr,a.TrainTrack=Rr,a.TramFront=c0,a.Trash=Tr,a.Trash2=qr,a.TreeDeciduous=br,a.TreePalm=M0,a.TreePine=xr,a.Trees=zr,a.Trello=Ur,a.TrendingDown=Or,a.TrendingUp=Gr,a.Triangle=Wr,a.TriangleAlert=e0,a.TriangleRight=Er,a.Trophy=Ir,a.Truck=Xr,a.Turtle=Nr,a.Tv=Jr,a.Tv2=Kr,a.Twitch=jr,a.Twitter=Qr,a.Type=Yr,a.Umbrella=ag,a.UmbrellaOff=_r,a.Underline=hg,a.Undo=cg,a.Undo2=tg,a.UndoDot=dg,a.UnfoldHorizontal=Mg,a.UnfoldVertical=eg,a.Ungroup=ig,a.University=i0,a.Unlink=pg,a.Unlink2=ng,a.Unlock=D1,a.UnlockKeyhole=F1,a.Unplug=lg,a.Upload=vg,a.UploadCloud=i1,a.Usb=og,a.User=Cg,a.User2=s0,a.UserCheck=sg,a.UserCheck2=n0,a.UserCircle=t1,a.UserCircle2=h1,a.UserCog=rg,a.UserCog2=p0,a.UserMinus=gg,a.UserMinus2=l0,a.UserPlus=yg,a.UserPlus2=v0,a.UserRound=s0,a.UserRoundCheck=n0,a.UserRoundCog=p0,a.UserRoundMinus=l0,a.UserRoundPlus=v0,a.UserRoundSearch=$g,a.UserRoundX=o0,a.UserSearch=mg,a.UserSquare=a0,a.UserSquare2=_2,a.UserX=ug,a.UserX2=o0,a.Users=Hg,a.Users2=r0,a.UsersRound=r0,a.Utensils=Vg,a.UtensilsCrossed=wg,a.UtilityPole=Sg,a.Variable=Ag,a.Vault=Lg,a.Vegan=fg,a.VenetianMask=kg,a.Verified=H,a.Vibrate=Bg,a.VibrateOff=Pg,a.Video=Dg,a.VideoOff=Fg,a.Videotape=Zg,a.View=Rg,a.Voicemail=qg,a.Volume=zg,a.Volume1=Tg,a.Volume2=bg,a.VolumeX=xg,a.Vote=Ug,a.Wallet=Gg,a.Wallet2=g0,a.WalletCards=Og,a.WalletMinimal=g0,a.Wallpaper=Eg,a.Wand=Wg,a.Wand2=y0,a.WandSparkles=y0,a.Warehouse=Ig,a.WashingMachine=Xg,a.Watch=Ng,a.Waves=Kg,a.Waypoints=Jg,a.Webcam=jg,a.Webhook=Yg,a.WebhookOff=Qg,a.Weight=_g,a.Wheat=hy,a.WheatOff=ay,a.WholeWord=ty,a.Wifi=cy,a.WifiOff=dy,a.Wind=My,a.Wine=iy,a.WineOff=ey,a.Workflow=ny,a.Worm=py,a.WrapText=ly,a.Wrench=vy,a.X=oy,a.XCircle=d1,a.XOctagon=b1,a.XSquare=h0,a.Youtube=sy,a.Zap=gy,a.ZapOff=ry,a.ZoomIn=yy,a.ZoomOut=$y,a.createElement=$0,a.createIcons=fy,a.icons=my});
//# sourceMappingURL=lucide.min.js.map


function localGet(k){try{var v=localStorage.getItem('fluency_'+k);if(v===null)return null;try{return JSON.parse(v)}catch(e){return v}}catch(e){return null}}
function localSet(k,v){try{localStorage.setItem('fluency_'+k,typeof v==='string'?v:JSON.stringify(v));return true}catch(e){return false}}

function makeIcon(name){return function(p){p=p||{};var s=p.size||16,cn=p.className||'',st=p.style||{},d=window.lucide[name];if(!d)return null;function ra(o){var r={};Object.keys(o).forEach(function(k){r[k.replace(/-([a-z])/g,function(_,c){return c.toUpperCase()})]=o[k]});return r}function bld(n){if(!n)return null;var t=n[0],a=ra(n[1]||{}),k=(n[2]||[]).map(bld);return React.createElement(t,a,k.length?k:null)}var sa=ra(d[1]||{});sa.width=s;sa.height=s;sa.className=cn;sa.style=st;var k=(d[2]||[]).map(bld);return React.createElement('svg',sa,k.length?k:null)}}
var BookOpen=makeIcon("BookOpen");var Pencil=makeIcon("Pencil");var Headphones=makeIcon("Headphones");var Feather=makeIcon("Feather");var Flame=makeIcon("Flame");var Trophy=makeIcon("Trophy");var RotateCw=makeIcon("RotateCw");var Check=makeIcon("Check");var X=makeIcon("X");var ChevronRight=makeIcon("ChevronRight");var ChevronLeft=makeIcon("ChevronLeft");var Volume2=makeIcon("Volume2");var Sparkles=makeIcon("Sparkles");var Calendar=makeIcon("Calendar");var Home=makeIcon("Home");var Layers=makeIcon("Layers");var TrendingUp=makeIcon("TrendingUp");var Loader2=makeIcon("Loader2");var Lightbulb=makeIcon("Lightbulb");var GraduationCap=makeIcon("GraduationCap");var Award=makeIcon("Award");var Cloud=makeIcon("Cloud");var ArrowRight=makeIcon("ArrowRight");var Pause=makeIcon("Pause");var CheckCircle2=makeIcon("CheckCircle2");var Star=makeIcon("Star");var Moon=makeIcon("Moon");var Sunrise=makeIcon("Sunrise");var Eye=makeIcon("Eye");var EyeOff=makeIcon("EyeOff");var Play=makeIcon("Play");var Shuffle=makeIcon("Shuffle");var RefreshCw=makeIcon("RefreshCw");

var { useState, useEffect, useMemo, useCallback, useRef } = React;

// ============================================================
//   FLUENCY · Aprenda inglês com IA, do A1 ao C2
// ============================================================

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LEVEL_NAMES = {
  A1: "Iniciante",
  A2: "Básico",
  B1: "Intermediário",
  B2: "Intermediário Alto",
  C1: "Avançado",
  C2: "Proficiente"
};
const LEVEL_DESC = {
  A1: "Você está começando. Aprende palavras e frases do dia a dia.",
  A2: "Conversa sobre assuntos simples e familiares.",
  B1: "Se vira em viagens, trabalho básico, conversas do cotidiano.",
  B2: "Discute ideias complexas, lê notícias, entende filmes.",
  C1: "Fala com fluência, escreve com precisão, entende nuances.",
  C2: "Domínio quase nativo. Humor, sarcasmo, literatura."
};
const LESSONS_TO_ADVANCE = 20;
const DAY_FOCUS = {
  1: {
    key: "grammar",
    label: "Gramática",
    icon: Feather,
    pt: "Segunda-feira",
    hint: "Estruturas e regras"
  },
  2: {
    key: "reading",
    label: "Leitura",
    icon: BookOpen,
    pt: "Terça-feira",
    hint: "Textos e interpretação"
  },
  3: {
    key: "writing",
    label: "Escrita",
    icon: Pencil,
    pt: "Quarta-feira",
    hint: "Produção de texto"
  },
  4: {
    key: "listening",
    label: "Escuta",
    icon: Headphones,
    pt: "Quinta-feira",
    hint: "Compreensão oral"
  },
  5: {
    key: "review",
    label: "Revisão",
    icon: RotateCw,
    pt: "Sexta-feira",
    hint: "Mistura da semana"
  }
};
const FOCUS_LABEL = {
  grammar: "Gramática",
  reading: "Leitura",
  writing: "Escrita",
  listening: "Escuta",
  review: "Revisão"
};

// -----------------------------------------------------------
// Fallback lessons (used when AI call fails)
// Curated quality content so the user can always study.
// -----------------------------------------------------------

const FALLBACK_LESSONS = {
  grammar: {
    A1: {
      title: "O verbo 'to be' — sua primeira chave",
      subtitle: "I am, you are, she is…",
      estimatedMinutes: 15,
      intro: "O verbo 'to be' é a palavra mais importante do inglês. Ele significa 'ser' e 'estar' ao mesmo tempo. Hoje você domina suas formas.",
      sections: [{
        heading: "As formas do verbo",
        content: "Em inglês, 'to be' muda conforme o pronome:\n\n• I am (eu sou/estou)\n• You are (você é/está)\n• He / She / It is (ele, ela, isto é/está)\n• We are (nós somos/estamos)\n• They are (eles são/estão)\n\nNa fala do dia a dia usamos formas curtas: I'm, you're, he's, she's, we're, they're.",
        examples: [{
          en: "I am a student.",
          pt: "Eu sou estudante."
        }, {
          en: "She is happy today.",
          pt: "Ela está feliz hoje."
        }, {
          en: "They are my friends.",
          pt: "Eles são meus amigos."
        }]
      }, {
        heading: "Negativa e pergunta",
        content: "Para negar, coloque 'not' depois do verbo: I am not, she is not (isn't), we are not (aren't).\n\nPara perguntar, inverta: Am I…? Are you…? Is he…?",
        examples: [{
          en: "I am not tired.",
          pt: "Eu não estou cansado."
        }, {
          en: "Are you Brazilian?",
          pt: "Você é brasileiro?"
        }, {
          en: "Is she at home?",
          pt: "Ela está em casa?"
        }]
      }],
      exercises: [{
        type: "choice",
        question: "Complete: 'She ___ my sister.'",
        options: ["am", "is", "are"],
        answer: "is",
        explanation: "He/she/it sempre usa 'is'."
      }, {
        type: "choice",
        question: "Complete: 'We ___ at school.'",
        options: ["am", "is", "are"],
        answer: "are",
        explanation: "Plural (we/you/they) sempre usa 'are'."
      }, {
        type: "choice",
        question: "Qual a negativa de 'I am hungry'?",
        options: ["I not am hungry", "I am not hungry", "I don't am hungry"],
        answer: "I am not hungry",
        explanation: "Basta adicionar 'not' depois do verbo."
      }, {
        type: "translate",
        question: "Traduza: 'Ele é médico.'",
        options: [],
        answer: "He is a doctor",
        explanation: "Profissões em inglês levam artigo: 'a doctor'."
      }],
      vocabulary: [{
        word: "happy",
        pos: "adj",
        translation: "feliz",
        example: "I am happy today."
      }, {
        word: "tired",
        pos: "adj",
        translation: "cansado",
        example: "She is tired."
      }, {
        word: "hungry",
        pos: "adj",
        translation: "com fome",
        example: "Are you hungry?"
      }, {
        word: "friend",
        pos: "noun",
        translation: "amigo(a)",
        example: "He is my friend."
      }, {
        word: "student",
        pos: "noun",
        translation: "estudante",
        example: "We are students."
      }],
      tips: ["Na fala, use sempre as formas curtas (I'm, she's) — soam naturais.", "'To be' cobre 'ser' e 'estar'. O contexto diz qual sentido."],
      finalTip: "Com 'to be' dominado, você já forma centenas de frases em inglês."
    }
  },
  reading: {
    A1: {
      title: "A manhã de Anna",
      subtitle: "A simple daily routine",
      estimatedMinutes: 12,
      intro: "Ler textos curtos é o caminho mais rápido para sentir a língua. Leia devagar, tente entender sem traduzir tudo.",
      readingText: "Anna wakes up at seven o'clock. She drinks a cup of coffee and eats some bread with butter. At eight, she walks to work. Anna is a teacher. She loves her job because she loves children. After work, she goes to the park with her dog, Max. In the evening, she reads a book and goes to bed early.",
      sections: [{
        heading: "Estratégia de leitura",
        content: "Na primeira leitura, NÃO pare em cada palavra. Leia tudo para pegar a ideia geral. Depois leia de novo, mais devagar, prestando atenção em palavras que você não conhece.",
        examples: [{
          en: "wakes up",
          pt: "acorda"
        }, {
          en: "goes to bed",
          pt: "vai dormir"
        }]
      }],
      exercises: [{
        type: "choice",
        question: "A que horas Anna acorda?",
        options: ["Às 6h", "Às 7h", "Às 8h"],
        answer: "Às 7h",
        explanation: "'She wakes up at seven o'clock' = ela acorda às sete."
      }, {
        type: "choice",
        question: "Qual é a profissão de Anna?",
        options: ["Médica", "Professora", "Engenheira"],
        answer: "Professora",
        explanation: "'Anna is a teacher' = Anna é professora."
      }, {
        type: "choice",
        question: "Por que Anna ama o trabalho dela?",
        options: ["Porque é perto de casa", "Porque ganha bem", "Porque ama crianças"],
        answer: "Porque ama crianças",
        explanation: "'She loves her job because she loves children.'"
      }, {
        type: "translate",
        question: "Traduza: 'She reads a book.'",
        options: [],
        answer: "Ela lê um livro",
        explanation: "read = ler. No presente: she reads (adiciona -s na 3ª pessoa)."
      }],
      vocabulary: [{
        word: "wake up",
        pos: "phrase",
        translation: "acordar",
        example: "I wake up at 7."
      }, {
        word: "bread",
        pos: "noun",
        translation: "pão",
        example: "I eat bread every morning."
      }, {
        word: "work",
        pos: "noun/verb",
        translation: "trabalho/trabalhar",
        example: "She goes to work."
      }, {
        word: "dog",
        pos: "noun",
        translation: "cachorro",
        example: "My dog is big."
      }, {
        word: "evening",
        pos: "noun",
        translation: "noite (até dormir)",
        example: "In the evening, I read."
      }],
      tips: ["Leia o texto duas vezes — a segunda leitura rende muito mais.", "Use o contexto para adivinhar palavras novas antes de traduzir."],
      finalTip: "Cada texto que você lê em inglês é um tijolo na sua fluência."
    }
  },
  writing: {
    A1: {
      title: "Se apresentar em inglês",
      subtitle: "Hello, my name is…",
      estimatedMinutes: 15,
      intro: "Se apresentar é a primeira coisa que você vai fazer ao conhecer alguém. Hoje você vai aprender uma estrutura simples que funciona sempre.",
      sections: [{
        heading: "A estrutura básica",
        content: "Uma boa apresentação tem 4 partes:\n\n1. Cumprimento: Hello / Hi / Nice to meet you.\n2. Nome: My name is… / I'm…\n3. Origem: I am from… / I live in…\n4. Ocupação ou interesse: I am a… / I work as… / I like…",
        examples: [{
          en: "Hi, my name is Luis.",
          pt: "Oi, meu nome é Luis."
        }, {
          en: "I am from Brazil.",
          pt: "Eu sou do Brasil."
        }, {
          en: "I work in an office.",
          pt: "Eu trabalho num escritório."
        }]
      }, {
        heading: "Conectando as frases",
        content: "Para soar menos robótico, junte frases com 'and':\n\n'My name is Luis AND I am from Brazil.'\n\nE encerre com algo simpático: 'Nice to meet you!'",
        examples: [{
          en: "I am Ana and I live in São Paulo.",
          pt: "Eu sou a Ana e moro em São Paulo."
        }, {
          en: "Nice to meet you!",
          pt: "Prazer em conhecer você!"
        }]
      }],
      exercises: [{
        type: "choice",
        question: "Qual é a forma correta de começar uma apresentação?",
        options: ["My is name Luis", "My name is Luis", "I name is Luis"],
        answer: "My name is Luis",
        explanation: "A estrutura é: My name + is + nome."
      }, {
        type: "choice",
        question: "Como dizer 'Eu sou do Brasil'?",
        options: ["I from Brazil", "I am of Brazil", "I am from Brazil"],
        answer: "I am from Brazil",
        explanation: "Usamos 'from' para origem. 'I am from + país'."
      }, {
        type: "translate",
        question: "Traduza: 'Eu moro no Rio.'",
        options: [],
        answer: "I live in Rio",
        explanation: "live in + cidade. 'Live' é morar."
      }, {
        type: "choice",
        question: "Qual fecha bem uma apresentação?",
        options: ["Goodbye forever", "Nice to meet you", "See you never"],
        answer: "Nice to meet you",
        explanation: "É a forma padrão: 'Prazer em conhecer você'."
      }],
      vocabulary: [{
        word: "name",
        pos: "noun",
        translation: "nome",
        example: "My name is Ana."
      }, {
        word: "from",
        pos: "prep",
        translation: "de (origem)",
        example: "I am from Brazil."
      }, {
        word: "live",
        pos: "verb",
        translation: "morar/viver",
        example: "I live in a small city."
      }, {
        word: "work",
        pos: "verb",
        translation: "trabalhar",
        example: "I work in a bank."
      }, {
        word: "meet",
        pos: "verb",
        translation: "conhecer/encontrar",
        example: "Nice to meet you."
      }],
      tips: ["Pratique sua apresentação em voz alta algumas vezes.", "Decore uma apresentação 'pronta' de 3 frases — ela te salva em muitas situações."],
      finalTip: "Escreva sua própria apresentação agora e guarde — você vai usar muito."
    }
  },
  listening: {
    A1: {
      title: "Cumprimentos do dia a dia",
      subtitle: "Hi! How are you?",
      estimatedMinutes: 12,
      intro: "Treinar o ouvido é prática pura. Toque o áudio várias vezes. Primeiro, tente entender SEM ler. Depois confira a transcrição.",
      listeningText: "Hi Tom! How are you today? I am very well, thanks. And you? I am good. Are you busy tonight? No, I am free. Let's have dinner together. Great idea! See you at seven.",
      sections: [{
        heading: "Expressões úteis da fala",
        content: "Esses são os 'tijolos' de quase toda conversa em inglês:\n\n• How are you? (Como você está?)\n• I am well / I am good. (Estou bem.)\n• And you? (E você?)\n• See you! (Até mais!)",
        examples: [{
          en: "How are you?",
          pt: "Como você está?"
        }, {
          en: "I'm fine, thanks.",
          pt: "Estou bem, obrigado."
        }]
      }],
      exercises: [{
        type: "choice",
        question: "No diálogo, o que Tom responde para 'How are you?'",
        options: ["I am busy", "I am very well, thanks", "I am tired"],
        answer: "I am very well, thanks",
        explanation: "Tom diz que está bem e agradece."
      }, {
        type: "choice",
        question: "O que eles combinam de fazer à noite?",
        options: ["Almoçar juntos", "Ir ao cinema", "Jantar juntos"],
        answer: "Jantar juntos",
        explanation: "'Let's have dinner together' = vamos jantar juntos."
      }, {
        type: "choice",
        question: "A que horas eles vão se ver?",
        options: ["Às 6", "Às 7", "Às 8"],
        answer: "Às 7",
        explanation: "'See you at seven' = até as sete."
      }, {
        type: "translate",
        question: "Traduza: 'I am free tonight.'",
        options: [],
        answer: "Eu estou livre hoje à noite",
        explanation: "free = livre. tonight = hoje à noite."
      }],
      vocabulary: [{
        word: "well",
        pos: "adj/adv",
        translation: "bem",
        example: "I am well."
      }, {
        word: "busy",
        pos: "adj",
        translation: "ocupado",
        example: "Are you busy?"
      }, {
        word: "free",
        pos: "adj",
        translation: "livre",
        example: "I am free tonight."
      }, {
        word: "tonight",
        pos: "adv",
        translation: "hoje à noite",
        example: "See you tonight."
      }, {
        word: "together",
        pos: "adv",
        translation: "juntos",
        example: "Let's go together."
      }],
      tips: ["Ouça primeiro sem ler. É desconfortável, mas é assim que o ouvido se forma.", "Repita as frases em voz alta. Ouvir + falar = fixação dupla."],
      finalTip: "Não existe fluência sem ouvido treinado. Cinco minutos por dia já faz diferença."
    }
  },
  review: {
    A1: {
      title: "Revisão: o essencial do A1",
      subtitle: "Putting it all together",
      estimatedMinutes: 15,
      intro: "Hoje é dia de juntar as peças: verbo 'to be', vocabulário do cotidiano e apresentação pessoal. Quando uma aula de revisão fica fácil, é sinal que você está pronto para avançar.",
      sections: [{
        heading: "O que você já sabe",
        content: "Você já viu muita coisa:\n\n• Verbo to be: I am, you are, he/she/it is, we/they are\n• Perguntas: Are you…? Is she…?\n• Vocabulário básico: happy, tired, hungry, friend, student…\n• Apresentação: My name is…, I am from…, I live in…",
        examples: [{
          en: "I am Luis and I am from Brazil.",
          pt: "Eu sou Luis e sou do Brasil."
        }, {
          en: "Are you a student?",
          pt: "Você é estudante?"
        }]
      }, {
        heading: "Uma dica valiosa",
        content: "Se você já consegue entender esta frase sem tradutor, está pronto para ir além:\n\n'My friend Ana is from Portugal. She is very happy today because she is not busy.'",
        examples: [{
          en: "She is not busy.",
          pt: "Ela não está ocupada."
        }]
      }],
      exercises: [{
        type: "choice",
        question: "Complete: 'My friends ___ from Argentina.'",
        options: ["is", "are", "am"],
        answer: "are",
        explanation: "Friends = plural, então 'are'."
      }, {
        type: "translate",
        question: "Traduza: 'Meu nome é Carlos e eu sou do Brasil.'",
        options: [],
        answer: "My name is Carlos and I am from Brazil",
        explanation: "Junte: My name is + nome + and + I am from + país."
      }, {
        type: "choice",
        question: "Qual é a pergunta correta?",
        options: ["You are tired?", "Are you tired?", "Is you tired?"],
        answer: "Are you tired?",
        explanation: "Para perguntar, o verbo 'are' vem antes: Are you…?"
      }, {
        type: "choice",
        question: "O que significa 'She is not a student'?",
        options: ["Ela é estudante", "Ela não é estudante", "Ela será estudante"],
        answer: "Ela não é estudante",
        explanation: "'Is not' = negativa no presente."
      }],
      vocabulary: [{
        word: "also",
        pos: "adv",
        translation: "também",
        example: "I am a student. I am also a worker."
      }, {
        word: "very",
        pos: "adv",
        translation: "muito",
        example: "She is very happy."
      }, {
        word: "today",
        pos: "adv",
        translation: "hoje",
        example: "Today is a good day."
      }, {
        word: "because",
        pos: "conj",
        translation: "porque",
        example: "I am happy because it is Friday."
      }, {
        word: "but",
        pos: "conj",
        translation: "mas",
        example: "I am tired but happy."
      }],
      tips: ["Revisão não é repetição. É hora de ligar tudo o que você já viu.", "Tente escrever 3 frases sobre você usando tudo de hoje. É o melhor exercício."],
      finalTip: "Boa semana! Segunda tem gramática nova."
    }
  }
};
const getFallbackLesson = (level, focus) => {
  const bank = FALLBACK_LESSONS[focus] || FALLBACK_LESSONS.grammar;
  return bank[level] || bank.A1;
};

// -----------------------------------------------------------
// Storage helpers
// -----------------------------------------------------------

const sGet = async key => {
  try {
    const r = localGet(key);
    if (!r) return null;
    try {
      return JSON.parse(r.value);
    } catch {
      return r.value;
    }
  } catch {
    return null;
  }
};
const sSet = async (key, value) => {
  try {
    const v = typeof value === "string" ? value : JSON.stringify(value);
    localSet(key, v);
    return true;
  } catch {
    return false;
  }
};

// -----------------------------------------------------------
// Dates
// -----------------------------------------------------------

const pad = n => String(n).padStart(2, "0");
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const daysBetween = (a, b) => {
  const d1 = new Date(a + "T00:00:00");
  const d2 = new Date(b + "T00:00:00");
  return Math.round((d2 - d1) / 86400000);
};
const currentDay = () => new Date().getDay();
const prettyDate = () => {
  const d = new Date();
  const dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]}`;
};

// -----------------------------------------------------------
// AI lesson generation
// -----------------------------------------------------------

// -----------------------------------------------------------
// Full curriculum map A1→C2
// -----------------------------------------------------------
const CURRICULUM = {
  A1: {
    grammar: [
    // Ser e estar
    "Verbo 'to be' – afirmativa: I am, you are, he/she/it is", "Verbo 'to be' – negativa: I am not, she isn't", "Verbo 'to be' – perguntas: Are you? Is he? What is it?", "Verbo 'to be' – contrações e usos no cotidiano",
    // Pronomes e artigos
    "Pronomes pessoais sujeito: I, you, he, she, it, we, they", "Artigos indefinidos: a / an – quando usar cada um", "Artigo definido: the – quando usar e quando omitir", "Adjetivos possessivos: my, your, his, her, its, our, their",
    // Substantivos
    "Plural dos substantivos: regras com -s e -es", "Plural irregular: man/men, child/children, tooth/teeth", "Substantivos contáveis e incontáveis (introdução)",
    // Present Simple
    "Present Simple – afirmativa: I work, she works", "Present Simple – negativa: don't e doesn't", "Present Simple – perguntas com do e does", "Present Simple – respostas curtas: Yes, I do / No, she doesn't", "Advérbios de frequência: always, usually, often, sometimes, never",
    // Presente Contínuo
    "Present Continuous – I am eating, she is working", "Present Continuous – negativa e perguntas", "Diferença Present Simple vs Present Continuous",
    // Modais básicos
    "Can / Can't – habilidade e possibilidade", "Can / Could – pedidos educados", "Would like – fazer pedidos e expressar desejo",
    // Preposições e lugar
    "Preposições de lugar: in, on, at, under, next to, between", "Preposições de tempo: at (horas), on (dias), in (meses/anos)", "There is / There are – afirmativa, negativa e pergunta",
    // Números e quantidades
    "Números cardinais 1–100 e ordinais 1st–20th", "Horas: What time is it? It's half past three.", "Dias da semana, meses e estações do ano",
    // Imperativo e mais
    "Imperativo: Open the door! Don't run!", "Adjetivos descritivos: big/small, old/new, happy/sad", "Adjetivos de cor e forma",
    // Revisão
    "Revisão: to be + pronomes + artigos", "Revisão: present simple – rotina e hábitos", "Revisão: present continuous – ações em curso", "Revisão: can, would like, preposições", "Revisão: números, horas, datas", "Revisão geral A1 – parte 1", "Revisão geral A1 – parte 2", "Revisão geral A1 – parte 3"],
    reading: ["Texto: rotina matinal de Ana – vocabulário do dia a dia", "Texto: apresentação de família – pronomes e adjetivos", "Texto: cardápio de restaurante – números e alimentos", "Texto: anúncio de emprego simples – present simple", "Texto: e-mail de apresentação entre amigos", "Texto: descrição de uma cidade pequena", "Texto: lista de compras – contáveis e incontáveis", "Texto: diálogo numa loja – can/would like", "Texto: post de rede social sobre fim de semana", "Texto: horário de ônibus – preposições de tempo", "Texto: descrição de casa – there is/are + preposições", "Texto: agenda semanal – dias e horas", "Texto: perfil de personagem – adjetivos descritivos", "Texto: notinha de recado – imperativo e present simple", "Texto: diálogo sobre rotina – revisão geral A1"],
    writing: ["Se apresentar: My name is… I am from… I am… years old.", "Descrever sua rotina diária com present simple", "Escrever um e-mail simples de apresentação", "Descrever sua família com adjetivos", "Escrever um bilhete curto com imperativo", "Preencher um formulário básico (nome, idade, país)", "Escrever sobre o que você gosta e não gosta", "Descrever sua casa com there is/are", "Escrever sobre seu trabalho ou escola", "Cartão de aniversário simples", "Descrever sua cidade natal", "Lista de objetivos pessoais com would like", "Post de rede social sobre sua semana", "E-mail pedindo informações simples", "Parágrafo de revisão: sobre você mesmo"],
    listening: ["Diálogo: cumprimentos e apresentações – Hi, how are you?", "Diálogo: pedindo informações na rua", "Diálogo: no restaurante – fazer pedido", "Diálogo: comprar algo numa loja com can/would like", "Diálogo: perguntar e dizer horas", "Diálogo: falar sobre família e adjetivos", "Diálogo: planos para o fim de semana", "Diálogo: reservar um quarto de hotel", "Diálogo: no médico – sintomas básicos", "Diálogo: despedida e agradecimento", "Diálogo: falar sobre a rotina diária", "Diálogo: descrever onde você mora", "Diálogo: o que você pode/não pode fazer", "Diálogo: convidar alguém para fazer algo", "Diálogo de revisão A1: situação completa no cotidiano"],
    review: ["Revisão semana 1: to be + pronomes + artigos + adjetivos", "Revisão semana 2: present simple – hábitos e rotina", "Revisão semana 3: present continuous + can + would like", "Revisão semana 4: preposições + there is/are + números", "Revisão semana 5: plurais + contáveis/incontáveis + horas", "Revisão semana 6: imperativo + adjetivos descritivos", "Revisão semana 7: vocabulário temático A1", "Revisão final A1"]
  },
  A2: {
    grammar: [
    // Past Simple
    "Past Simple – verbos regulares: walked, played, watched", "Past Simple – verbos irregulares grupo 1: go/went, eat/ate, see/saw", "Past Simple – verbos irregulares grupo 2: have/had, do/did, come/came", "Past Simple – negativa: didn't + infinitivo", "Past Simple – perguntas: Did you? Where did she?", "Past Simple – respostas curtas e uso com expressões de tempo",
    // Futuro
    "Futuro com going to – planos e intenções", "Futuro com will – decisões no momento e previsões", "Diferença going to vs will", "Futuro com present continuous – planos confirmados",
    // Comparação
    "Comparativos de adjetivos: bigger, more beautiful", "Superlativos: the biggest, the most expensive", "Comparativo de igualdade: as… as",
    // Presente Perfeito
    "Present Perfect – have/has + particípio (introdução e formação)", "Present Perfect – ever / never / already / yet", "Present Perfect – for / since (duração)", "Present Perfect vs Past Simple – diferença fundamental",
    // Modais
    "Should / shouldn't – conselho e recomendação", "Must / mustn't – obrigação e proibição", "Have to / don't have to – necessidade e ausência", "May / might – possibilidade no presente/futuro",
    // Condicionais
    "Condicional tipo 0: If water reaches 100°C, it boils.", "Condicional tipo 1: If it rains, I will stay home.",
    // Quantificadores
    "Some / any – afirmativa, negativa e pergunta", "Much / many / a lot of / a few / a little", "Too / enough: too hot, not big enough",
    // Phrasal Verbs e Preposições
    "Phrasal verbs básicos: get up, turn on/off, look for, put on", "Preposições de movimento: to, from, along, past, across", "Adjetivos + preposição: good at, afraid of, interested in",
    // Conectivos
    "Conectivos básicos: and, but, or, so, because", "Conectivos de contraste: although, however", "Pronomes objeto: me, him, her, us, them",
    // Revisão
    "Revisão: past simple regular e irregular", "Revisão: futuro going to e will", "Revisão: present perfect – ever, never, already, yet", "Revisão: modais – should, must, have to, might", "Revisão: comparativos e superlativos", "Revisão: condicionais tipo 0 e 1", "Revisão: quantificadores e conectivos", "Revisão geral A2 – parte 1", "Revisão geral A2 – parte 2"],
    reading: ["Texto: relato de uma viagem passada – past simple", "Texto: notícia simples de jornal – passado e presente", "Texto: resenha de filme em linguagem simples", "Texto: receita culinária – imperativo e vocabulário", "Texto: post de blog sobre hobby", "Texto: e-mail de reclamação a hotel", "Texto: entrevista curta com celebridade", "Texto: guia turístico de cidade – present perfect", "Texto: descrição de rotina profissional", "Texto: folheto de evento cultural", "Texto: comparação entre duas cidades", "Texto: planos de férias – going to", "Texto: e-mail de resposta sobre emprego", "Texto: artigo simples sobre saúde e hábitos", "Texto de revisão A2: situação cotidiana completa"],
    writing: ["Escrever sobre um fim de semana passado", "E-mail informal para um amigo sobre novidades", "Descrever planos futuros com going to e will", "Comparar duas cidades ou países", "Escrever uma resenha curta de filme ou série", "Carta de agradecimento", "Escrever instruções: como chegar a algum lugar", "Descrever um problema e sugerir solução", "Diário de viagem – 1 dia", "E-mail solicitando informações sobre um curso", "Escrever sobre experiências: have you ever…?", "Post de blog sobre algo que você aprendeu", "E-mail de reclamação simples", "Descrição de pessoa famosa com comparativos", "Parágrafo de revisão A2: planos e experiências"],
    listening: ["Diálogo: contar como foi o fim de semana – past simple", "Diálogo: fazer planos com going to e will", "Diálogo: pedir e dar direções na cidade", "Diálogo: reclamação num hotel", "Diálogo: entrevista de emprego simples", "Diálogo: comparar produtos numa loja", "Diálogo: marcar uma consulta médica", "Diálogo: discutir planos de viagem", "Diálogo: experiências passadas – ever/never", "Diálogo: expressar opiniões sobre filmes", "Diálogo: conselhos – should/shouldn't", "Diálogo: obrigações e regras – must/have to", "Diálogo: possibilidades – might/may", "Diálogo: compras e comparativos", "Diálogo de revisão A2: conversa variada completa"],
    review: ["Revisão semana 1: past simple regular e irregular", "Revisão semana 2: futuro going to, will e present continuous", "Revisão semana 3: present perfect – ever/never/already/yet/for/since", "Revisão semana 4: modais – should, must, have to, might", "Revisão semana 5: comparativos, superlativos, as…as", "Revisão semana 6: condicionais 0 e 1", "Revisão semana 7: quantificadores, phrasal verbs, conectivos", "Revisão semana 8: vocabulário temático A2", "Revisão final A2"]
  },
  B1: {
    grammar: [
    // Tempos do passado
    "Past Continuous – I was sleeping when the phone rang.", "Past Continuous vs Past Simple – interação entre ações", "Past Perfect – I had already eaten when she arrived.", "Past Perfect vs Past Simple – sequência de eventos", "Past Perfect Continuous – I had been waiting for an hour.",
    // Present Perfect avançado
    "Present Perfect Continuous – I have been studying.", "Present Perfect: escolha entre Simple e Continuous",
    // Futuros
    "Futuro contínuo: I will be working at 9pm.", "Futuro perfeito: I will have finished by Friday.", "Futuro com present perfect: By 2030, we will have solved…",
    // Voz passiva
    "Voz passiva: presente e passado simples", "Voz passiva: present perfect e futuro", "Agente na voz passiva: by + agente",
    // Reported Speech
    "Reported speech – afirmativa: She said she was tired.", "Reported speech – perguntas: He asked where I lived.", "Reported speech – imperativo e modal", "Mudança de tempo verbal no reported speech",
    // Condicionais
    "Condicional tipo 2: If I had money, I would travel.", "Condicional tipo 3: If I had studied, I would have passed.", "Mixed conditional: If I had studied, I would be a doctor.",
    // Orações relativas
    "Orações relativas: who, which, that, where, whose", "Orações relativas restritivas vs não-restritivas",
    // Gerúndio e infinitivo
    "Gerúndio como sujeito: Swimming is good for you.", "Gerúndio após preposição: I'm good at cooking.", "Verbos + gerúndio: enjoy, avoid, suggest, keep", "Verbos + infinitivo: want, hope, decide, agree", "Verbos + gerúndio ou infinitivo com mudança de sentido",
    // Modais avançados
    "Modais de dedução no presente: must be, can't be, might be", "Modais de dedução no passado: must have, can't have, might have",
    // Conectivos avançados
    "Conectivos de contraste: however, nevertheless, despite, in spite of", "Conectivos de resultado: therefore, as a result, consequently", "Conectivos de adição: moreover, furthermore, in addition",
    // Phrasal verbs intermediários
    "Phrasal verbs intermediários – grupo 1: put off, carry out, bring up", "Phrasal verbs intermediários – grupo 2: take up, give up, look into", "Phrasal verbs intermediários – grupo 3: run out of, come across, set up",
    // Revisão
    "Revisão: tempos do passado – simple, continuous, perfect", "Revisão: voz passiva em todos os tempos", "Revisão: reported speech completo", "Revisão: condicionais 2, 3 e misto", "Revisão: orações relativas e conectivos avançados", "Revisão: modais de dedução", "Revisão: gerúndio e infinitivo", "Revisão geral B1 – parte 1", "Revisão geral B1 – parte 2"],
    reading: ["Artigo: tendências de trabalho remoto no mundo atual", "Artigo: mudanças climáticas – causas e soluções", "Entrevista: empreendedor jovem de sucesso", "Texto: análise de um problema social contemporâneo", "Conto curto em inglês com vocabulário B1", "Artigo de opinião sobre redes sociais e juventude", "Texto: benefícios de aprender idiomas para o cérebro", "Reportagem: estilo de vida sustentável na prática", "Texto: história de vida inspiradora com superação", "Artigo: saúde mental e hábitos na era digital", "Texto: futuro das cidades inteligentes", "Reportagem: diversidade cultural no ambiente de trabalho", "Artigo: impacto da IA no mercado de trabalho", "Texto narrativo: dilema moral de um personagem", "Leitura de revisão B1: artigo complexo com inferência"],
    writing: ["Ensaio de opinião: estrutura – tese, desenvolvimento, conclusão", "Parágrafo de opinião com argumentos e exemplos", "Ensaio: vantagens e desvantagens de um tema", "E-mail formal de solicitação", "E-mail formal de reclamação com pedido de resolução", "E-mail formal de resposta profissional", "Relatório simples: descrever dados de gráfico", "Texto narrativo: contar uma história pessoal com detalhes", "Review: avaliar produto/serviço com argumentação", "Carta de motivação: introdução e perfil pessoal", "Carta de motivação: habilidades e objetivos", "Texto: descrever um problema e propor soluções", "Blog post: experiência pessoal com reflexão", "Texto argumentativo: contra-argumento e refutação", "Parágrafo de revisão B1: escrita coerente e conectada"],
    listening: ["Diálogo: debate de opinião entre amigos sobre tema atual", "Diálogo: negociação simples no trabalho", "Podcast curto: notícia do dia explicada", "Diálogo: entrevista de emprego completa", "Diálogo: resolver um conflito profissional educadamente", "Apresentação informal sobre um tema de interesse", "Diálogo: discutir prós e contras de uma decisão importante", "Podcast: dicas de produtividade e organização", "Diálogo: relato de experiência de viagem com detalhes", "Reunião de trabalho informal – planejamento", "Diálogo: conselhos sobre saúde e bem-estar", "Podcast: tendências tecnológicas explicadas", "Diálogo: discussão sobre dilema ético cotidiano", "Entrevista: especialista explica tema de interesse geral", "Áudio de revisão B1: situação profissional e pessoal"],
    review: ["Revisão semana 1: past continuous e past perfect", "Revisão semana 2: present perfect continuous e futuros avançados", "Revisão semana 3: voz passiva completa", "Revisão semana 4: reported speech completo", "Revisão semana 5: condicionais 2, 3 e misto", "Revisão semana 6: orações relativas", "Revisão semana 7: gerúndio e infinitivo avançados", "Revisão semana 8: modais de dedução", "Revisão semana 9: conectivos e coesão textual", "Revisão semana 10: phrasal verbs intermediários", "Revisão final B1"]
  },
  B2: {
    grammar: [
    // Estruturas avançadas
    "Subjuntivo em inglês: I suggest that he be / It's vital that she attend", "Inversão para ênfase: Never have I seen such dedication.", "Inversão com condicionais: Were I to leave / Had I known", "Cleft sentences para ênfase: It was John who broke it.", "Pseudo-cleft: What I need is rest. What surprised me was…",
    // Voz passiva avançada
    "Voz passiva com modais: It must be done / should have been told", "Voz passiva com verbos de percepção: It is said that… / He is believed to…", "Get passive: She got promoted. The car got stolen.",
    // Reported Speech avançado
    "Reported speech com verbos de reporte variados: admit, deny, warn, insist", "Reported speech de perguntas indiretas em contextos formais",
    // Estruturas nominais
    "Orações nominais: The fact that… / What matters is…", "Nominalização básica: decide → decision, fail → failure", "Frases nominais complexas: a rapidly growing economy",
    // Particípios
    "Particípio presente como adjunto: Walking down the street, she saw…", "Particípio passado como adjunto: Exhausted by the trip, he slept.", "Cláusulas absolutas: The work done, they left.",
    // Verbos e colocações
    "Verbos de percepção + -ing vs infinitivo: I saw her running / run", "Estruturas de desejo: I wish + past simple / I wish + would", "I'd rather, I'd sooner, I'd prefer – preferência e hipótese", "Colocações avançadas grupo 1: make a decision, take action, do research", "Colocações avançadas grupo 2: reach a conclusion, draw attention, raise awareness",
    // Phrasal verbs avançados
    "Phrasal verbs avançados separáveis – grupo 1: bring about, carry out, rule out", "Phrasal verbs avançados inseparáveis – grupo 2: come across, look into, go through",
    // Registro e discurso
    "Registro formal vs informal: escolhas gramaticais e lexicais", "Hedging language: tend to, seem to, appear to, be likely to", "Discourse markers na fala: well, actually, you know, I mean, right", "Discourse markers na escrita: in contrast, on the other hand, to illustrate", "Conectivos avançados: notwithstanding, whereas, albeit, inasmuch as",
    // Artigos
    "Artigos avançados: uso com nomes próprios, instituições, refeições", "Omissão de artigos: contextos e padrões",
    // Revisão
    "Revisão: inversão e ênfase – estruturas avançadas", "Revisão: voz passiva avançada e get passive", "Revisão: reported speech com verbos de reporte variados", "Revisão: nominalização e frases nominais", "Revisão: particípios e cláusulas absolutas", "Revisão: colocações e phrasal verbs avançados", "Revisão: hedging, discourse markers, registro", "Revisão geral B2 – parte 1", "Revisão geral B2 – parte 2"],
    reading: ["Artigo acadêmico simplificado: impacto social da tecnologia", "Editorial de jornal: argumento político com subentendidos", "Ensaio literário sobre conto clássico de autor anglófono", "Reportagem investigativa: exploração de dados e causas", "Artigo: psicologia do comportamento humano em grupos", "Texto filosófico acessível: ética e dilemas modernos", "Crítica cultural: cinema contemporâneo e mensagens", "Texto: economia para não-economistas – desigualdade", "Artigo: inovação biotecnológica e questões éticas", "Entrevista longa com personalidade relevante do mundo das artes", "Artigo de opinião com argumento e contra-argumento", "Reportagem: crise climática – dados e soluções", "Texto: sociologia da identidade na era das redes sociais", "Análise de discurso: como líderes usam a linguagem", "Leitura de revisão B2: texto denso com inferência avançada"],
    writing: ["Ensaio argumentativo: estrutura acadêmica completa", "Proposta formal de projeto com objetivos e metodologia", "Relatório com análise de dados e gráficos", "Artigo de opinião para jornal: tom jornalístico", "Resumo executivo de documento complexo", "Carta de apresentação profissional completa e persuasiva", "Texto persuasivo: pitch de ideia ou proposta", "Análise crítica de texto jornalístico ou literário", "Texto comparativo: dois pontos de vista com síntese", "Resposta profissional a e-mail complexo com tom formal", "Ensaio: problema + análise + solução + conclusão", "Review acadêmica de artigo ou livro", "Texto de divulgação para público geral", "White paper: posição sobre tema controverso", "Parágrafo de revisão B2: coesão e sofisticação lexical"],
    listening: ["Palestra simplificada TED: inovação e mudança social", "Debate: globalização – prós e contras com argumentos complexos", "Podcast: tendências culturais e comportamentais", "Reunião de trabalho formal com decisões e ações", "Entrevista jornalística com especialista", "Diálogo: negociação comercial com linguagem de negócios", "Palestra universitária: trecho introdutório de aula", "Documentário: narração densa com vocabulário específico", "Podcast: história contemporânea e análise cultural", "Debate: ética em IA e tecnologia", "Apresentação de dados – relatório oral", "Conferência: discurso de abertura motivacional", "Podcast: saúde mental no ambiente corporativo", "Entrevista: empreendedor narra desafios e aprendizados", "Áudio de revisão B2: contexto profissional e acadêmico"],
    review: ["Revisão semana 1: estruturas de ênfase, inversão, cleft", "Revisão semana 2: voz passiva avançada + get passive", "Revisão semana 3: reported speech avançado", "Revisão semana 4: nominalização e frases nominais", "Revisão semana 5: particípios e cláusulas absolutas", "Revisão semana 6: colocações avançadas grupo 1 e 2", "Revisão semana 7: phrasal verbs avançados", "Revisão semana 8: hedging, discourse markers, registro", "Revisão semana 9: artigos avançados e omissão", "Revisão semana 10: desejo, preferência e hipótese", "Revisão final B2"]
  },
  C1: {
    grammar: ["Nominalização avançada: transform verb phrases into nouns in academic writing", "Fronting para ênfase: Rarely do we see such clarity.", "Inversão com advérbios negativos: No sooner had… than…, Hardly had…", "Inversão com condicionais formais: Should you require / Were this to happen", "Aspectos verbais: perfect vs continuous – nuances de significado", "Modalidade epistêmica: must, can't, may, might, could – graus de certeza", "Modalidade deôntica em contexto formal: shall, ought to, be supposed to", "Cláusulas absolutas avançadas: The negotiations completed, both parties signed.", "Orações reduzidas: Having arrived late, he missed the introduction.", "Adjetivos predicativos vs atributivos – distinções e colocações específicas", "Auxiliares para ênfase e contraste: I do believe / It is important / They did warn us.", "Voz passiva com get em contextos formais e informais", "Reported speech: estruturas ambíguas e verbos de reporte sofisticados", "Subjuntivo formal avançado em contextos jurídicos e acadêmicos", "Coesão textual: referência, substituição, elipse e conjunção", "Colocações acadêmicas: conduct research, challenge assumptions, shed light on", "Colocações profissionais: streamline processes, leverage strengths, foster innovation", "Phrasal verbs em registro formal: carry out → execute, put off → postpone", "Pontuação avançada: ponto e vírgula, travessão, dois-pontos em prosa formal", "Estruturas de hipótese: Suppose / Assuming that / Given that…", "Discourse markers em escrita acadêmica: as previously mentioned, it follows that", "Metáfora gramatical: transformar processos em coisas (análise de linguagem)", "Quantificadores em contexto formal: a proportion of, the majority of, a fraction of", "Orações relativas apositivas em prosa acadêmica", "Estruturas de preferência avançadas em contexto formal", "Revisão C1: nominalização + inversão + aspectos verbais", "Revisão C1: modalidade epistêmica e deôntica", "Revisão C1: coesão e coerência em textos longos", "Revisão C1: colocações acadêmicas e profissionais", "Revisão geral C1"],
    reading: ["Ensaio filosófico: ética, liberdade e determinismo", "Artigo científico: leitura de abstract e análise crítica", "Trecho de romance clássico anglófono com análise estilística", "Artigo de política internacional: análise de subentendidos", "Ensaio sociológico: identidade, raça e cultura", "Texto jurídico simplificado: estrutura e linguagem", "Artigo econômico com dados e posição argumentativa", "Crítica literária de obra contemporânea", "Discurso político para análise retórica", "Ensaio sobre linguagem, poder e construção da realidade", "Artigo: neurociência e aprendizagem humana", "Ensaio: globalização e erosão cultural", "Texto: bioética – dilemas da medicina moderna", "Artigo de mídia: como a imprensa constrói narrativas", "Leitura de revisão C1: texto acadêmico com análise completa"],
    writing: ["Ensaio acadêmico: tese + argumento + evidência + refutação + conclusão", "Abstract de artigo de pesquisa – estrutura e linguagem", "Proposta acadêmica formal: objetivos, método, impacto", "Crítica de livro ou artigo com posição sustentada", "Relatório de análise de mercado ou política", "Editorial com argumento forte e nuançado", "Texto de divulgação científica para público geral", "Carta de motivação para programa internacional de alto nível", "White paper: posição sobre tema complexo com dados", "Resenha acadêmica com análise crítica aprofundada", "Ensaio de contraste: duas visões opostas com síntese", "Texto formal: resposta a proposta ou relatório externo", "Análise de discurso: identificar estratégias retóricas", "Ensaio especulativo: e se… análise de cenário hipotético", "Parágrafo de revisão C1: precisão lexical e coesão sofisticada"],
    listening: ["Palestra acadêmica: sociologia urbana com vocabulário denso", "Debate formal com múltiplos pontos de vista conflitantes", "Podcast de jornalismo investigativo aprofundado", "Conferência: discurso de abertura com retórica elaborada", "Entrevista aprofundada com especialista em área técnica", "Audiência formal: testemunho, argumento e contra-argumento", "Documentário: narração com vocabulário especializado", "Seminário universitário: discussão em grupo com divergência", "Podcast: filosofia aplicada ao cotidiano", "Palestra: linguística e poder da comunicação", "Debate: inteligência artificial e futuro da humanidade", "Palestra: economia comportamental – vieses e decisões", "Podcast: saúde pública e políticas sociais", "Entrevista: artista ou escritor fala sobre processo criativo", "Áudio de revisão C1: contexto acadêmico e profissional avançado"],
    review: ["Revisão semana 1: nominalização e estruturas de ênfase avançadas", "Revisão semana 2: aspectos verbais e modalidade avançada", "Revisão semana 3: coesão, coerência e pontuação acadêmica", "Revisão semana 4: colocações acadêmicas e profissionais", "Revisão semana 5: orações reduzidas e cláusulas absolutas", "Revisão semana 6: discourse markers em escrita e fala", "Revisão semana 7: registro – formal, neutro, informal avançado", "Revisão semana 8: retórica – persuasão e argumentação", "Revisão semana 9: análise crítica de texto", "Revisão semana 10: produção escrita de alto nível", "Revisão final C1"]
  },
  C2: {
    grammar: ["Variação estilística: arcaísmos, formalidade extrema e linguagem literária", "Retórica avançada: anáfora, antítese, paralelismo, quiasmo", "Ambiguidade intencional em textos literários e poéticos", "Ironia, sarcasmo, understatement britânico e litotes", "Dialetos do inglês: britânico, americano, australiano, indiano – diferenças", "Linguagem figurada: metáfora morta, metonímia, sinédoque", "Intertextualidade: referências, alusões e paródia", "Sintaxe de longa distância e construções raras em prosa literária", "Inglês jurídico: shall, herein, whereas, notwithstanding, pursuant to", "Inglês científico: passiva, impessoalidade, hedging extremo", "Inglês de negócios de alto nível: due diligence, leverage, synergy", "Humor em inglês: puns, wordplay, wit e double entendre", "Estruturas poéticas: metro iâmbico, aliteração, enjambment", "Prosa literária: análise de ritmo, voz narrativa e ponto de vista", "Linguagem de mídia: manchetes, clickbait, eufemismo político", "Análise de discurso político: estratégias de persuasão e manipulação", "Pragmática: implicatura conversacional e pressuposição", "Deixis e referência anafórica em textos complexos", "Registro extremo: linguagem de luto, diplomacia e cerimônia", "Identidade linguística: code-switching, bilinguismo e hibridismo", "Revisão C2: retórica e estilo literário", "Revisão C2: pragmática e análise de discurso", "Revisão C2: variação de registro em contextos extremos", "Revisão C2: humor, ironia e subversão da linguagem", "Revisão final C2"],
    reading: ["Trecho de romance literário moderno com análise de voz e estilo", "Ensaio de David Foster Wallace: ironia e metaficção", "Artigo do The Economist: análise econômica e política completa", "Poema moderno: interpretação, análise métrica e semântica", "Trecho de peça teatral: Harold Pinter – subtexto e silêncio", "Artigo filosófico denso: argumentação e contra-argumentação", "Conto de autor canônico: Carver, Flannery O'Connor – análise", "Discurso histórico: Churchill ou MLK – análise retórica completa", "Artigo de crítica cultural: ironia, subversão e intertextualidade", "Texto experimental: stream of consciousness – Joyce ou Woolf", "Artigo de The New Yorker: longform journalism com análise", "Ensaio pessoal: voz íntima e construção de ethos", "Trecho de romance distópico: análise política e linguística", "Crônica jornalística: estilo, tom e construção da persona", "Leitura de revisão C2: texto nativo complexo com análise total"],
    writing: ["Ensaio literário de alto nível com análise estilística", "Artigo de opinião com ironia, sofisticação e voz própria", "Proposta acadêmica para banca internacional de alto nível", "Análise retórica completa de discurso famoso", "Texto criativo: conto curto com voz própria e densidade literária", "Crítica de arte ou música com linguagem especializada", "Texto de diplomacia: comunicado formal e carta aberta", "Manifesto cultural ou político com argumentação densa", "Análise de poema com argumentação crítica e evidência textual", "Ensaio pessoal estilo The New Yorker: narrativa + reflexão + análise", "Parodia ou pastiche de estilo literário reconhecível", "Texto especulativo de ficção científica curta", "Proposta de pesquisa interdisciplinar", "Texto de divulgação para audiência especializada", "Parágrafo de revisão C2: domínio de estilo e voz nativa"],
    listening: ["Palestra de filosofia com ritmo e vocabulário nativo denso", "Podcast britânico: cultura, humor e sátira social", "Debate político ao vivo com múltiplos sotaques e velocidade nativa", "Entrevista literária com escritor anglófono sobre processo criativo", "Stand-up comedy em inglês: análise cultural e linguística", "Documentário BBC: narração literária densa", "Discussão acadêmica informal em inglês nativo – vários sotaques", "This American Life: podcast de jornalismo narrativo americano", "Diálogo de filme de autor: subtexto, implicatura e não-dito", "Conferência TED avançada sem simplificação vocabular", "Podcast de comédia de ideias: wit e argumentação rápida", "Entrevista jornalística adversarial: estratégias de evasão e pressão", "Programa de rádio britânico: humor intelectual e referências culturais", "Audiolivro: trecho de romance contemporâneo lido pelo autor", "Áudio de revisão C2: variedade de estilos e sotaques nativos"],
    review: ["Revisão semana 1: retórica, figuras de linguagem e estilo literário", "Revisão semana 2: dialetos, variação e identidade linguística", "Revisão semana 3: pragmática, implicatura e análise de discurso", "Revisão semana 4: inglês técnico – jurídico, científico, corporativo", "Revisão semana 5: ironia, humor e subversão na linguagem", "Revisão semana 6: análise crítica de texto literário", "Revisão semana 7: produção escrita de nível literário", "Revisão semana 8: compreensão oral de falantes nativos", "Revisão semana 9: síntese de domínio C2", "Revisão final C2: proficiência de nível nativo"]
  }
};
const getTopicForLesson = (level, focus, lessonIndex) => {
  var _CURRICULUM$level;
  const topics = ((_CURRICULUM$level = CURRICULUM[level]) === null || _CURRICULUM$level === void 0 ? void 0 : _CURRICULUM$level[focus]) || [];
  if (topics.length === 0) return null;
  return topics[lessonIndex % topics.length];
};

// Count lessons per focus at this level
const getLessonIndexByFocus = (completedLessons, level, focus) => {
  return completedLessons.filter(l => l.level === level && l.skill === focus).length;
};
const buildPrompt = function (level, focus, completedAtLevel) {
  let completedLessons = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  const lessonIndex = getLessonIndexByFocus(completedLessons, level, focus);
  const topic = getTopicForLesson(level, focus, lessonIndex);
  const focusGuidance = {
    grammar: `Ensine o seguinte tópico gramatical: "${topic}". Explique com clareza, regras, exceções e exemplos progressivos. Seja preciso e completo para o nível ${level}.`,
    reading: `Crie um texto em inglês sobre o tema: "${topic}". Tamanho: 80 palavras (A1), 130 palavras (A2), 200 palavras (B1/B2), 280 palavras (C1/C2). Coloque o texto em 'readingText'. Depois explique vocabulário e estratégias de leitura.`,
    writing: `Ensine a habilidade de escrita: "${topic}". Mostre estrutura, exemplos e modelos de texto. Dê instruções claras para o aluno escrever sua própria versão.`,
    listening: `Gere um diálogo ou texto falado sobre: "${topic}". Coloque em 'listeningText'. Complexidade e tamanho compatíveis com o nível ${level}. Depois explique vocabulário e expressões-chave.`,
    review: `Faça uma revisão do tema: "${topic}". Recapitule os pontos essenciais vistos no nível ${level} até agora, com exercícios variados para consolidar o aprendizado.`
  };
  const extraField = focus === "listening" ? `\n  "listeningText": "Texto/diálogo em inglês natural aqui.",` : focus === "reading" ? `\n  "readingText": "Texto completo em inglês aqui.",` : "";
  const exerciseCount = ["B2", "C1", "C2"].includes(level) ? 6 : 5;
  const vocabCount = ["B2", "C1", "C2"].includes(level) ? 8 : 6;
  return `Você é professor de inglês para brasileiros. Aluno nível ${level} (${LEVEL_NAMES[level]}). Foco: ${FOCUS_LABEL[focus]}. Aula ${lessonIndex + 1} de ${focus} neste nível.

TÓPICO DESTA AULA: ${topic}

${focusGuidance[focus]}

Responda SÓ com JSON válido (sem backticks, sem texto fora do JSON). Estrutura:

{
  "title": "título direto referente ao tópico (máx 50 chars)",
  "subtitle": "short English phrase (máx 45 chars)",
  "estimatedMinutes": 20,
  "intro": "1-2 frases contextualizando o tópico em português.",
  "sections": [
    {
      "heading": "Nome da seção",
      "content": "Explicação clara e completa em português. Use \\n\\n para separar parágrafos. Inclua regras, exceções e dicas práticas.",
      "examples": [
        {"en": "English example sentence.", "pt": "Tradução em português."},
        {"en": "Another example.", "pt": "Outra tradução."},
        {"en": "Third example.", "pt": "Terceira tradução."}
      ]
    }
  ],
  "exercises": [
    {"type": "choice", "question": "Pergunta clara em português com frase em inglês se necessário.", "options": ["opção a","opção b","opção c"], "answer": "opção b", "explanation": "Explicação do porquê em português."},
    {"type": "fill", "question": "Complete a frase: 'She ___ (go) to school every day.'", "options": ["go","goes","going"], "answer": "goes", "explanation": "3ª pessoa do singular adiciona -s."},
    {"type": "translate", "question": "Traduza para o inglês: 'Frase em português aqui.'", "options": [], "answer": "English answer here", "explanation": "Explicação da tradução."}
  ],
  "vocabulary": [
    {"word": "palavra", "pos": "noun/verb/adj/adv/phrase", "translation": "tradução", "example": "Example sentence using the word."}
  ],
  "tips": [
    "Dica prática número 1 sobre como usar o conteúdo no dia a dia.",
    "Dica número 2 sobre erros comuns ou diferenças do português."
  ],${extraField}
  "finalTip": "Frase de encorajamento relacionada ao tópico."
}

REGRAS OBRIGATÓRIAS:
- EXATAMENTE 3 seções, cada uma com EXATAMENTE 3 examples
- EXATAMENTE ${exerciseCount} exercícios: mínimo 2 choice, 1 fill, 1 translate, resto choice ou fill
- EXATAMENTE ${vocabCount} itens de vocabulário relevantes ao tópico
- EXATAMENTE 2 tips
- Exercícios de choice têm SEMPRE 3 options
- JSON 100% válido: sem vírgula final, aspas duplas escapadas corretamente
- Conteúdo totalmente adequado ao nível ${level} — nem fácil demais, nem difícil demais
- Todo texto explicativo em PORTUGUÊS, exemplos e frases em INGLÊS`;
};
const extractJSON = text => {
  // Remove code fences if present
  let t = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  // Find outermost { ... }
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("No JSON object found");
  t = t.slice(start, end + 1);
  // Try parsing; if it fails, try to repair common issues
  try {
    return JSON.parse(t);
  } catch (e) {
    // Remove trailing commas before } or ]
    const repaired = t.replace(/,(\s*[}\]])/g, "$1");
    return JSON.parse(repaired);
  }
};
const callGeminiOnce = async (prompt, apiKey) => {
  var _data$candidates;
  const systemInstruction = "Você é um gerador de aulas de inglês. Responda APENAS com JSON válido, sem texto antes ou depois, sem blocos de código markdown.";
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{
          text: systemInstruction
        }]
      },
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        maxOutputTokens: 3000,
        temperature: 0.7
      }
    })
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Gemini API ${res.status}: ${errBody}`);
  }
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = ((_data$candidates = data.candidates) === null || _data$candidates === void 0 || (_data$candidates = _data$candidates[0]) === null || _data$candidates === void 0 || (_data$candidates = _data$candidates.content) === null || _data$candidates === void 0 || (_data$candidates = _data$candidates.parts) === null || _data$candidates === void 0 ? void 0 : _data$candidates.map(p => p.text || "").join("")) || "";
  if (!text) throw new Error("Resposta vazia da IA.");
  return extractJSON(text);
};
const callAI = async (prompt, apiKey) => {
  let lastErr;
  for (let i = 0; i < 3; i++) {
    try {
      return await callGeminiOnce(prompt, apiKey);
    } catch (e) {
      lastErr = e;
      console.warn(`Tentativa ${i + 1} falhou:`, e === null || e === void 0 ? void 0 : e.message);
    }
  }
  throw lastErr;
};

// -----------------------------------------------------------
// Global styles
// -----------------------------------------------------------

const GlobalStyles = () => /*#__PURE__*/React.createElement("style", null, `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

    :root {
      --bg: #F1E9DB;
      --bg-2: #E8DDC9;
      --paper: #FBF6EC;
      --ink: #1C1914;
      --ink-soft: #3D362C;
      --accent: #B53F1F;
      --accent-dark: #8A2E12;
      --accent-soft: #E9BDA7;
      --sage: #5C6B44;
      --gold: #B88A3E;
      --muted: #8A7E6B;
      --line: #CDBFA8;
      --line-soft: #DFD3BC;
    }
    html, body, #root { background: var(--bg); color: var(--ink); }
    .fx-display { font-family: 'Fraunces', 'Times New Roman', serif; font-optical-sizing: auto; font-variation-settings: "SOFT" 50, "WONK" 0; letter-spacing: -0.01em; }
    .fx-body { font-family: 'Instrument Sans', -apple-system, system-ui, sans-serif; }
    .fx-serif-italic { font-family: 'Fraunces', serif; font-style: italic; }

    .paper-grain {
      background-image:
        radial-gradient(circle at 25% 10%, rgba(181,63,31,0.04) 0, transparent 40%),
        radial-gradient(circle at 75% 80%, rgba(92,107,68,0.04) 0, transparent 40%),
        repeating-linear-gradient(0deg, rgba(28,25,20,0.012) 0, rgba(28,25,20,0.012) 1px, transparent 1px, transparent 3px);
    }
    .card-paper {
      background: var(--paper);
      border: 1px solid var(--line);
      box-shadow: 0 1px 0 rgba(28,25,20,0.04), 0 8px 24px -12px rgba(28,25,20,0.12);
    }
    .btn-primary {
      background: var(--ink); color: var(--paper);
      border: 1px solid var(--ink);
      transition: all .2s ease;
    }
    .btn-primary:hover { background: var(--accent-dark); border-color: var(--accent-dark); }
    .btn-ghost {
      background: transparent; color: var(--ink);
      border: 1px solid var(--line);
    }
    .btn-ghost:hover { background: var(--bg-2); }
    .chip {
      background: var(--bg-2); border: 1px solid var(--line);
      color: var(--ink-soft);
    }
    .divider-deco::before, .divider-deco::after {
      content: ""; flex: 1; height: 1px; background: var(--line);
    }
    .underline-wavy {
      text-decoration-line: underline;
      text-decoration-style: wavy;
      text-decoration-color: var(--accent);
      text-underline-offset: 4px;
      text-decoration-thickness: 1.5px;
    }
    .ink-border { border: 1px solid var(--ink); }
    .input-paper {
      background: var(--paper); border: 1px solid var(--line);
      padding: 10px 14px; border-radius: 2px;
      font-family: inherit; color: var(--ink);
      outline: none; transition: border-color .15s;
    }
    .input-paper:focus { border-color: var(--ink); }
    @keyframes inkRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .anim-rise { animation: inkRise .5s ease both; }
    @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(181,63,31,0.35); } 70% { box-shadow: 0 0 0 14px rgba(181,63,31,0); } 100% { box-shadow: 0 0 0 0 rgba(181,63,31,0); } }
    .pulse-ring { animation: pulseRing 2s infinite; }
    .flip-card { perspective: 1200px; }
    .flip-inner { position: relative; width: 100%; height: 100%; transition: transform .6s cubic-bezier(.4,.8,.3,1); transform-style: preserve-3d; }
    .flip-inner.flipped { transform: rotateY(180deg); }
    .flip-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .flip-back { transform: rotateY(180deg); }
    .scroll-hide::-webkit-scrollbar { display: none; }
    .scroll-hide { scrollbar-width: none; }

    /* Decorative serif flourish */
    .flourish { color: var(--accent); font-family: 'Fraunces', serif; font-style: italic; }
  `);

// -----------------------------------------------------------
// Onboarding
// -----------------------------------------------------------

const Onboarding = _ref => {
  let {
    onDone
  } = _ref;
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("A1");
  const [apiKey, setApiKey] = useState("");
  const testAndFinish = async () => {
    const key = apiKey.trim();
    if (!key) {
      setKeyError("Cole sua chave do Gemini para continuar.");
      return;
    }
    await sSet("geminiKey", key);
    const profile = {
      name: name.trim() || "Aluno",
      level,
      createdAt: todayKey(),
      lastStudyDate: null,
      streak: 0
    };
    await sSet("profile", profile);
    onDone(profile, key);
  };
  const finish = async () => {
    const profile = {
      name: name.trim() || "Aluno",
      level,
      createdAt: todayKey(),
      lastStudyDate: null,
      streak: 0
    };
    await sSet("profile", profile);
    onDone(profile, "");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen paper-grain flex flex-col items-center justify-center px-6 py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-lg anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mb-2",
    style: {
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body uppercase text-xs tracking-[0.3em]"
  }, "Fluency"), /*#__PURE__*/React.createElement(Sparkles, {
    size: 16
  })), /*#__PURE__*/React.createElement("h1", {
    className: "fx-display text-5xl md:text-6xl text-center leading-[0.95]",
    style: {
      fontWeight: 600
    }
  }, "Aprenda ingl\xEAs ", /*#__PURE__*/React.createElement("span", {
    className: "fx-serif-italic",
    style: {
      color: "var(--accent)"
    }
  }, "com prop\xF3sito"), "."), /*#__PURE__*/React.createElement("p", {
    className: "fx-body text-center mt-5 text-base",
    style: {
      color: "var(--ink-soft)"
    }
  }, "Uma aula por dia, de segunda a sexta. Quatro pilares. Seu ritmo."), /*#__PURE__*/React.createElement("div", {
    className: "card-paper mt-10 p-7 rounded-sm"
  }, step === 0 && /*#__PURE__*/React.createElement("div", {
    className: "anim-rise"
  }, /*#__PURE__*/React.createElement("label", {
    className: "fx-body text-xs uppercase tracking-[0.22em]",
    style: {
      color: "var(--muted)"
    }
  }, "Como devo te chamar?"), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    className: "input-paper w-full mt-3 fx-display text-2xl",
    placeholder: "Seu primeiro nome",
    value: name,
    onChange: e => setName(e.target.value),
    onKeyDown: e => e.key === "Enter" && setStep(1)
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end mt-6"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary px-5 py-2.5 rounded-sm fx-body text-sm flex items-center gap-2",
    onClick: () => setStep(1)
  }, "Pr\xF3ximo ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  })))), step === 1 && /*#__PURE__*/React.createElement("div", {
    className: "anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em] mb-1",
    style: {
      color: "var(--muted)"
    }
  }, "Seu n\xEDvel atual"), /*#__PURE__*/React.createElement("p", {
    className: "fx-serif-italic text-sm mb-4",
    style: {
      color: "var(--ink-soft)"
    }
  }, "Sem press\xE3o \u2014 voc\xEA pode subir ou descer depois."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, LEVELS.map(L => /*#__PURE__*/React.createElement("button", {
    key: L,
    onClick: () => setLevel(L),
    className: `w-full text-left px-4 py-3 rounded-sm transition border ${level === L ? "ink-border" : ""}`,
    style: {
      background: level === L ? "var(--bg-2)" : "var(--paper)",
      borderColor: level === L ? "var(--ink)" : "var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "fx-display text-lg",
    style: {
      fontWeight: 600
    }
  }, L), /*#__PURE__*/React.createElement("span", {
    className: "fx-body ml-3 text-sm",
    style: {
      color: "var(--ink-soft)"
    }
  }, LEVEL_NAMES[L])), level === L && /*#__PURE__*/React.createElement(Check, {
    size: 16,
    style: {
      color: "var(--accent)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs mt-1",
    style: {
      color: "var(--muted)"
    }
  }, LEVEL_DESC[L])))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between mt-6"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost px-4 py-2 rounded-sm fx-body text-sm",
    onClick: () => setStep(0)
  }, "Voltar"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary px-5 py-2.5 rounded-sm fx-body text-sm flex items-center gap-2",
    onClick: () => setStep(2)
  }, "Pr\xF3ximo ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  })))), step === 2 && /*#__PURE__*/React.createElement("div", {
    className: "anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em] mb-1",
    style: {
      color: "var(--muted)"
    }
  }, "Chave da IA (Gemini)"), /*#__PURE__*/React.createElement("p", {
    className: "fx-body text-sm mb-1",
    style: {
      color: "var(--ink-soft)"
    }
  }, "As aulas s\xE3o geradas pelo Google Gemini. \xC9 gr\xE1tis \u2014 crie sua chave em:"), /*#__PURE__*/React.createElement("a", {
    href: "https://aistudio.google.com/apikey",
    target: "_blank",
    className: "fx-body text-xs underline",
    style: {
      color: "var(--accent)"
    }
  }, "aistudio.google.com/apikey"), /*#__PURE__*/React.createElement("input", {
    className: "input-paper w-full mt-4 fx-body text-sm",
    placeholder: "Cole aqui: AIza...",
    value: apiKey,
    onChange: e => {
      setApiKey(e.target.value);
      setKeyError("");
    },
    onKeyDown: e => e.key === "Enter" && testAndFinish()
  }), /*#__PURE__*/React.createElement("p", {
    className: "fx-body text-xs mt-3",
    style: {
      color: "var(--muted)"
    }
  }, "A chave fica salva s\xF3 no seu navegador. N\xE3o compartilhamos com ningu\xE9m."), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between mt-6"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost px-4 py-2 rounded-sm fx-body text-sm",
    onClick: () => setStep(1)
  }, "Voltar"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary px-5 py-2.5 rounded-sm fx-body text-sm flex items-center gap-2",
    onClick: testAndFinish
  }, "Come\xE7ar ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mt-6 fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement(Cloud, {
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Seu progresso fica salvo na nuvem automaticamente."))));
};

// -----------------------------------------------------------
// Header
// -----------------------------------------------------------

const Header = _ref2 => {
  let {
    profile,
    streak,
    tab,
    setTab
  } = _ref2;
  const tabs = [{
    id: "today",
    label: "Hoje",
    Icon: Home
  }, {
    id: "lesson",
    label: "Aula",
    Icon: GraduationCap
  }, {
    id: "flashcards",
    label: "Flashcards",
    Icon: Layers
  }, {
    id: "progress",
    label: "Progresso",
    Icon: TrendingUp
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-30 paper-grain",
    style: {
      background: "var(--bg)",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-4 md:px-6 pt-3 pb-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fx-display text-2xl",
    style: {
      fontWeight: 800,
      letterSpacing: "-0.02em"
    }
  }, "Fluency"), /*#__PURE__*/React.createElement("span", {
    className: "flourish text-xl"
  }, "\xB7"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 chip px-2.5 py-1 rounded-full"
  }, /*#__PURE__*/React.createElement(Flame, {
    size: 13,
    style: {
      color: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs font-semibold"
  }, streak)), /*#__PURE__*/React.createElement("div", {
    className: "chip px-2.5 py-1 rounded-full"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fx-display text-xs",
    style: {
      fontWeight: 600
    }
  }, profile.level)))), /*#__PURE__*/React.createElement("nav", {
    className: "mt-3 -mx-4 md:-mx-6 px-4 md:px-6 flex gap-1 overflow-x-auto scroll-hide"
  }, tabs.map(_ref3 => {
    let {
      id,
      label,
      Icon
    } = _ref3;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setTab(id),
      className: `flex items-center gap-1.5 px-3 py-2 fx-body text-sm whitespace-nowrap transition relative`,
      style: {
        color: tab === id ? "var(--ink)" : "var(--muted)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 14
    }), /*#__PURE__*/React.createElement("span", null, label), tab === id && /*#__PURE__*/React.createElement("span", {
      className: "absolute left-2 right-2 -bottom-px h-[2px]",
      style: {
        background: "var(--ink)"
      }
    }));
  }))));
};

// -----------------------------------------------------------
// Today view
// -----------------------------------------------------------

const TodayView = _ref4 => {
  let {
    profile,
    completedAtLevel,
    lessonToday,
    openLesson,
    setTab,
    allCompleted,
    weekProgress
  } = _ref4;
  const dow = currentDay();
  const isWeekend = dow === 0 || dow === 6;
  const focus = DAY_FOCUS[dow];
  const FocusIcon = (focus === null || focus === void 0 ? void 0 : focus.icon) || Moon;
  const doneToday = !!lessonToday;
  const progressToNext = Math.min(100, Math.round(completedAtLevel / LESSONS_TO_ADVANCE * 100));
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-4 md:px-6 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.28em]",
    style: {
      color: "var(--muted)"
    }
  }, prettyDate()), /*#__PURE__*/React.createElement("h1", {
    className: "fx-display text-4xl md:text-5xl mt-2",
    style: {
      fontWeight: 600,
      lineHeight: 1.05
    }
  }, isWeekend ? /*#__PURE__*/React.createElement(React.Fragment, null, "Um bom ", /*#__PURE__*/React.createElement("span", {
    className: "fx-serif-italic",
    style: {
      color: "var(--accent)"
    }
  }, "descanso"), ", ", profile.name, ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Ol\xE1, ", profile.name, ". ", /*#__PURE__*/React.createElement("span", {
    className: "fx-serif-italic",
    style: {
      color: "var(--accent)"
    }
  }, "Hora de estudar.")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 card-paper rounded-sm anim-rise",
    style: {
      animationDelay: ".08s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 md:p-7"
  }, isWeekend ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement(Moon, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs uppercase tracking-[0.22em]"
  }, "Fim de semana")), /*#__PURE__*/React.createElement("h2", {
    className: "fx-display text-2xl md:text-3xl mt-2",
    style: {
      fontWeight: 600
    }
  }, "As aulas voltam na segunda."), /*#__PURE__*/React.createElement("p", {
    className: "fx-body mt-3",
    style: {
      color: "var(--ink-soft)"
    }
  }, "Aproveite para revisar seus ", /*#__PURE__*/React.createElement("strong", null, "flashcards"), " \u2014 manter o contato com o ingl\xEAs no fim de semana ajuda a fixar."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("flashcards"),
    className: "btn-primary px-4 py-2 rounded-sm fx-body text-sm flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Layers, {
    size: 14
  }), " Revisar flashcards"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("progress"),
    className: "btn-ghost px-4 py-2 rounded-sm fx-body text-sm"
  }, "Ver progresso"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement(FocusIcon, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs uppercase tracking-[0.22em]"
  }, focus.pt, " \xB7 Foco em ", focus.label)), /*#__PURE__*/React.createElement("h2", {
    className: "fx-display text-3xl md:text-4xl mt-2",
    style: {
      fontWeight: 600,
      lineHeight: 1.05
    }
  }, doneToday ? /*#__PURE__*/React.createElement(React.Fragment, null, "Aula conclu\xEDda. ", /*#__PURE__*/React.createElement("span", {
    className: "fx-serif-italic"
  }, "Belo trabalho.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Sua aula de ", /*#__PURE__*/React.createElement("span", {
    className: "underline-wavy"
  }, focus.label.toLowerCase()), " est\xE1 pronta.")), /*#__PURE__*/React.createElement("p", {
    className: "fx-body mt-3",
    style: {
      color: "var(--ink-soft)"
    }
  }, doneToday ? `Você já fez a aula de hoje (${lessonToday.title}). Quer revisar ou seguir para os flashcards?` : `Uma aula personalizada para o seu nível ${profile.level}, focada em ${focus.hint.toLowerCase()}.`), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-5"
  }, !doneToday && /*#__PURE__*/React.createElement("button", {
    onClick: openLesson,
    className: "btn-primary px-5 py-2.5 rounded-sm fx-body text-sm flex items-center gap-2 pulse-ring"
  }, /*#__PURE__*/React.createElement(Play, {
    size: 14
  }), " Come\xE7ar aula"), doneToday && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: openLesson,
    className: "btn-ghost px-4 py-2 rounded-sm fx-body text-sm flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Eye, {
    size: 14
  }), " Rever aula"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("flashcards"),
    className: "btn-primary px-4 py-2 rounded-sm fx-body text-sm flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Layers, {
    size: 14
  }), " Ir para flashcards"))))), !isWeekend && /*#__PURE__*/React.createElement("div", {
    className: "border-t px-6 md:px-7 py-4 flex items-center justify-between",
    style: {
      borderColor: "var(--line-soft)",
      background: "rgba(232,221,201,0.4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "Progresso no n\xEDvel ", profile.level), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-36 h-1.5 rounded-full overflow-hidden",
    style: {
      background: "var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full",
    style: {
      width: `${progressToNext}%`,
      background: "var(--accent)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--ink-soft)"
    }
  }, completedAtLevel, "/", LESSONS_TO_ADVANCE)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 anim-rise",
    style: {
      animationDelay: ".16s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.28em]",
    style: {
      color: "var(--muted)"
    }
  }, "Esta semana"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-px",
    style: {
      background: "var(--line)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-2"
  }, [1, 2, 3, 4, 5].map(d => {
    const f = DAY_FOCUS[d];
    const Ic = f.icon;
    const done = weekProgress[d];
    const isToday = d === dow;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      className: `card-paper rounded-sm p-3 flex flex-col items-center text-center relative ${isToday ? "ink-border" : ""}`,
      style: {
        opacity: done ? 1 : 0.92,
        borderColor: isToday ? "var(--ink)" : undefined
      }
    }, done && /*#__PURE__*/React.createElement(CheckCircle2, {
      size: 14,
      className: "absolute top-1.5 right-1.5",
      style: {
        color: "var(--sage)"
      }
    }), /*#__PURE__*/React.createElement(Ic, {
      size: 18,
      style: {
        color: done ? "var(--sage)" : "var(--ink-soft)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-xs mt-1.5",
      style: {
        fontWeight: 600
      }
    }, ["SEG", "TER", "QUA", "QUI", "SEX"][d - 1]), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-[10px] mt-0.5",
      style: {
        color: "var(--muted)"
      }
    }, f.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 anim-rise",
    style: {
      animationDelay: ".24s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.28em]",
    style: {
      color: "var(--muted)"
    }
  }, "Os quatro pilares"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-px",
    style: {
      background: "var(--line)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, [{
    icon: Feather,
    title: "Gramática",
    desc: "A estrutura."
  }, {
    icon: BookOpen,
    title: "Leitura",
    desc: "A exposição."
  }, {
    icon: Pencil,
    title: "Escrita",
    desc: "O domínio ativo."
  }, {
    icon: Headphones,
    title: "Escuta",
    desc: "O ouvido afinado."
  }].map((_ref5, i) => {
    let {
      icon: Ic,
      title,
      desc
    } = _ref5;
    return /*#__PURE__*/React.createElement("div", {
      key: title,
      className: "card-paper rounded-sm p-4"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 16,
      style: {
        color: "var(--accent)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-base mt-2",
      style: {
        fontWeight: 600
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "fx-serif-italic text-sm",
      style: {
        color: "var(--ink-soft)"
      }
    }, desc));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 text-center fx-body text-xs flex items-center justify-center gap-1.5",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement(Cloud, {
    size: 11
  }), " Progresso sincronizado"));
};

// -----------------------------------------------------------
// Lesson view
// -----------------------------------------------------------

const LessonView = _ref6 => {
  var _lessonData$exercises, _lessonData$sections, _lessonData$vocabular, _lessonData$exercises2, _lessonData$tips;
  let {
    profile,
    lessonData,
    loading,
    error,
    onRegenerate,
    onComplete,
    isCompleted,
    focusKey
  } = _ref6;
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const speakingIndexRef = useRef(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  useEffect(() => {
    setAnswers({});
    setRevealed({});
  }, [lessonData === null || lessonData === void 0 ? void 0 : lessonData.title]);
  const speak = function (text) {
    let index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    u.onstart = () => {
      setSpeakingIndex(index);
      speakingIndexRef.current = index;
    };
    u.onend = () => {
      setSpeakingIndex(null);
      speakingIndexRef.current = null;
    };
    u.onerror = () => {
      setSpeakingIndex(null);
      speakingIndexRef.current = null;
    };
    window.speechSynthesis.speak(u);
  };
  const stopSpeak = () => {
    var _window$speechSynthes;
    (_window$speechSynthes = window.speechSynthesis) === null || _window$speechSynthes === void 0 || _window$speechSynthes.cancel();
    setSpeakingIndex(null);
  };
  useEffect(() => {
    return () => {
      var _window$speechSynthes2;
      return (_window$speechSynthes2 = window.speechSynthesis) === null || _window$speechSynthes2 === void 0 ? void 0 : _window$speechSynthes2.cancel();
    };
  }, []);
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-3xl mx-auto px-4 md:px-6 py-16 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-2 chip px-3 py-1.5 rounded-full"
    }, /*#__PURE__*/React.createElement(Loader2, {
      className: "animate-spin",
      size: 14,
      style: {
        color: "var(--accent)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "fx-body text-xs uppercase tracking-[0.2em]",
      style: {
        color: "var(--ink-soft)"
      }
    }, "Preparando sua aula")), /*#__PURE__*/React.createElement("h2", {
      className: "fx-display text-3xl mt-6",
      style: {
        fontWeight: 600
      }
    }, "A tinta est\xE1 secando na p\xE1gina", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent)"
      }
    }, ".")), /*#__PURE__*/React.createElement("p", {
      className: "fx-serif-italic mt-2",
      style: {
        color: "var(--ink-soft)"
      }
    }, "Isso leva alguns segundos."));
  }
  if (error) {
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-3xl mx-auto px-4 md:px-6 py-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-paper rounded-sm p-6"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "fx-display text-xl",
      style: {
        fontWeight: 600
      }
    }, "Tivemos um trope\xE7o."), /*#__PURE__*/React.createElement("p", {
      className: "fx-body mt-2 text-sm",
      style: {
        color: "var(--ink-soft)"
      }
    }, "N\xE3o consegui gerar sua aula agora. Tente novamente \u2014 costuma funcionar na segunda."), /*#__PURE__*/React.createElement("button", {
      onClick: onRegenerate,
      className: "btn-primary mt-4 px-4 py-2 rounded-sm fx-body text-sm flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(RefreshCw, {
      size: 14
    }), " Tentar outra vez")));
  }
  if (!lessonData) return null;
  const focusMeta = DAY_FOCUS[currentDay()] || {
    label: FOCUS_LABEL[focusKey] || "Aula",
    icon: BookOpen
  };
  const FocusIcon = focusMeta.icon;
  const check = (i, val) => setAnswers(a => ({
    ...a,
    [i]: val
  }));
  const toggleReveal = i => setRevealed(r => ({
    ...r,
    [i]: !r[i]
  }));
  const allRevealed = (_lessonData$exercises = lessonData.exercises) === null || _lessonData$exercises === void 0 ? void 0 : _lessonData$exercises.every((_, i) => revealed[i]);
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-4 md:px-6 py-6 pb-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap",
    style: {
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement(FocusIcon, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs uppercase tracking-[0.22em]"
  }, FOCUS_LABEL[focusKey], " \xB7 n\xEDvel ", profile.level, " \xB7 \u2248 ", lessonData.estimatedMinutes || 15, " min"), lessonData._fallback ? /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1",
    style: {
      background: "#FEF3C7",
      border: "1px solid #F59E0B",
      color: "#92400E"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u26A0"), " Aula padr\xE3o (IA indispon\xEDvel)") : /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1",
    style: {
      background: "#D1FAE5",
      border: "1px solid #34D399",
      color: "#065F46"
    }
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 10
  }), " Gerada por IA")), /*#__PURE__*/React.createElement("h1", {
    className: "fx-display text-3xl md:text-4xl mt-2",
    style: {
      fontWeight: 600,
      lineHeight: 1.1
    }
  }, lessonData.title), lessonData.subtitle && /*#__PURE__*/React.createElement("div", {
    className: "fx-serif-italic mt-1",
    style: {
      color: "var(--ink-soft)"
    }
  }, lessonData.subtitle), lessonData.intro && /*#__PURE__*/React.createElement("p", {
    className: "fx-body mt-4 text-[15px] leading-relaxed",
    style: {
      color: "var(--ink-soft)"
    }
  }, lessonData.intro)), lessonData.readingText && /*#__PURE__*/React.createElement("div", {
    className: "mt-7 card-paper rounded-sm p-6 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em]",
    style: {
      color: "var(--muted)"
    }
  }, "Texto para leitura"), /*#__PURE__*/React.createElement("button", {
    onClick: () => speakingIndex === -99 ? stopSpeak() : speak(lessonData.readingText, -99),
    className: "flex items-center gap-1.5 fx-body text-xs chip px-2.5 py-1 rounded-full"
  }, speakingIndex === -99 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Pause, {
    size: 11
  }), " Parar") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Volume2, {
    size: 11
  }), " Ouvir"))), /*#__PURE__*/React.createElement("p", {
    className: "fx-display text-lg leading-[1.7]",
    style: {
      fontWeight: 400
    }
  }, lessonData.readingText)), lessonData.listeningText && /*#__PURE__*/React.createElement("div", {
    className: "mt-7 card-paper rounded-sm p-6 anim-rise",
    style: {
      background: "linear-gradient(180deg, var(--paper), #F6EEDB)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em] mb-3",
    style: {
      color: "var(--muted)"
    }
  }, "Primeiro, escute"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => speakingIndex === -100 ? stopSpeak() : speak(lessonData.listeningText, -100),
    className: "btn-primary rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0"
  }, speakingIndex === -100 ? /*#__PURE__*/React.createElement(Pause, {
    size: 20
  }) : /*#__PURE__*/React.createElement(Play, {
    size: 20,
    className: "translate-x-[1px]"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-lg",
    style: {
      fontWeight: 600
    }
  }, "\xC1udio da aula"), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "Toque para ouvir. Pode repetir quantas vezes quiser."))), /*#__PURE__*/React.createElement("details", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("summary", {
    className: "fx-body text-xs cursor-pointer flex items-center gap-1.5",
    style: {
      color: "var(--ink-soft)"
    }
  }, /*#__PURE__*/React.createElement(Eye, {
    size: 12
  }), " Ver transcri\xE7\xE3o (tente ouvir antes)"), /*#__PURE__*/React.createElement("p", {
    className: "fx-display text-[15px] leading-relaxed mt-3 pl-4 border-l-2",
    style: {
      borderColor: "var(--accent)"
    }
  }, lessonData.listeningText))), (_lessonData$sections = lessonData.sections) === null || _lessonData$sections === void 0 ? void 0 : _lessonData$sections.map((sec, idx) => {
    var _sec$examples;
    return /*#__PURE__*/React.createElement("section", {
      key: idx,
      className: "mt-8 anim-rise"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-lg",
      style: {
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent)"
      }
    }, "\xA7"), " ", sec.heading), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 h-px",
      style: {
        background: "var(--line)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-[15px] leading-relaxed whitespace-pre-wrap",
      style: {
        color: "var(--ink-soft)"
      }
    }, sec.content), ((_sec$examples = sec.examples) === null || _sec$examples === void 0 ? void 0 : _sec$examples.length) > 0 && /*#__PURE__*/React.createElement("div", {
      className: "mt-4 space-y-2"
    }, sec.examples.map((ex, j) => {
      const exId = `${idx}-${j}`;
      const active = speakingIndex === exId;
      return /*#__PURE__*/React.createElement("div", {
        key: j,
        className: "card-paper rounded-sm p-3 flex items-start gap-3"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => active ? stopSpeak() : speak(ex.en, exId),
        className: "mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
        style: {
          borderColor: active ? "var(--accent)" : "var(--line)",
          background: active ? "var(--accent)" : "transparent",
          color: active ? "var(--paper)" : "var(--ink)"
        }
      }, active ? /*#__PURE__*/React.createElement(Pause, {
        size: 12
      }) : /*#__PURE__*/React.createElement(Volume2, {
        size: 12
      })), /*#__PURE__*/React.createElement("div", {
        className: "flex-1 min-w-0"
      }, /*#__PURE__*/React.createElement("div", {
        className: "fx-display text-base",
        style: {
          fontWeight: 500
        }
      }, ex.en), /*#__PURE__*/React.createElement("div", {
        className: "fx-serif-italic text-sm mt-0.5",
        style: {
          color: "var(--muted)"
        }
      }, ex.pt)));
    })));
  }), ((_lessonData$vocabular = lessonData.vocabulary) === null || _lessonData$vocabular === void 0 ? void 0 : _lessonData$vocabular.length) > 0 && /*#__PURE__*/React.createElement("section", {
    className: "mt-10 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.28em]",
    style: {
      color: "var(--muted)"
    }
  }, "Vocabul\xE1rio de hoje"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-px",
    style: {
      background: "var(--line)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs chip px-2 py-0.5 rounded-full"
  }, lessonData.vocabulary.length)), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-2"
  }, lessonData.vocabulary.map((v, i) => {
    const vId = `v-${i}`;
    const active = speakingIndex === vId;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "card-paper rounded-sm p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-2"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-base",
      style: {
        fontWeight: 600
      }
    }, v.word), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-xs",
      style: {
        color: "var(--muted)"
      }
    }, v.pos, " \xB7 ", v.translation)), /*#__PURE__*/React.createElement("button", {
      onClick: () => active ? stopSpeak() : speak(v.word, vId),
      className: "flex-shrink-0",
      style: {
        color: active ? "var(--accent)" : "var(--ink-soft)"
      }
    }, /*#__PURE__*/React.createElement(Volume2, {
      size: 14
    }))), v.example && /*#__PURE__*/React.createElement("div", {
      className: "fx-serif-italic text-xs mt-2",
      style: {
        color: "var(--ink-soft)"
      }
    }, "\"", v.example, "\""));
  })), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs mt-2 flex items-center gap-1.5",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 11
  }), " Estas palavras viram flashcards automaticamente.")), ((_lessonData$exercises2 = lessonData.exercises) === null || _lessonData$exercises2 === void 0 ? void 0 : _lessonData$exercises2.length) > 0 && /*#__PURE__*/React.createElement("section", {
    className: "mt-10 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.28em]",
    style: {
      color: "var(--muted)"
    }
  }, "Exerc\xEDcios"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-px",
    style: {
      background: "var(--line)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, lessonData.exercises.map((ex, i) => {
    var _ex$options;
    const ans = answers[i];
    const rev = revealed[i];
    const isCorrect = ans && String(ans).trim().toLowerCase() === String(ex.answer).trim().toLowerCase();
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "card-paper rounded-sm p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-lg flex-shrink-0",
      style: {
        fontWeight: 600,
        color: "var(--accent)"
      }
    }, i + 1, "."), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-[15px]",
      style: {
        color: "var(--ink)"
      }
    }, ex.question), ex.type === "translate" || !((_ex$options = ex.options) !== null && _ex$options !== void 0 && _ex$options.length) ? /*#__PURE__*/React.createElement("input", {
      className: "input-paper w-full mt-3 fx-body text-[15px]",
      placeholder: "Sua resposta\u2026",
      value: ans || "",
      onChange: e => check(i, e.target.value)
    }) : /*#__PURE__*/React.createElement("div", {
      className: "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2"
    }, ex.options.map((opt, j) => {
      const selected = ans === opt;
      const showCorrect = rev && String(opt).trim().toLowerCase() === String(ex.answer).trim().toLowerCase();
      const showWrong = rev && selected && !showCorrect;
      return /*#__PURE__*/React.createElement("button", {
        key: j,
        onClick: () => check(i, opt),
        className: `text-left fx-body text-sm rounded-sm px-3 py-2 border transition`,
        style: {
          background: showCorrect ? "rgba(92,107,68,0.1)" : showWrong ? "rgba(181,63,31,0.1)" : selected ? "var(--bg-2)" : "var(--paper)",
          borderColor: showCorrect ? "var(--sage)" : showWrong ? "var(--accent)" : selected ? "var(--ink)" : "var(--line)",
          color: "var(--ink)"
        }
      }, opt);
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mt-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggleReveal(i),
      className: "btn-ghost px-3 py-1.5 rounded-sm fx-body text-xs flex items-center gap-1.5"
    }, rev ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EyeOff, {
      size: 11
    }), " Ocultar") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eye, {
      size: 11
    }), " Ver resposta")), ans && rev && (isCorrect ? /*#__PURE__*/React.createElement("span", {
      className: "fx-body text-xs flex items-center gap-1",
      style: {
        color: "var(--sage)"
      }
    }, /*#__PURE__*/React.createElement(Check, {
      size: 12
    }), " Correto") : /*#__PURE__*/React.createElement("span", {
      className: "fx-body text-xs flex items-center gap-1",
      style: {
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(X, {
      size: 12
    }), " Resposta: ", /*#__PURE__*/React.createElement("strong", null, ex.answer)))), rev && ex.explanation && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 fx-serif-italic text-sm pl-3 border-l-2",
      style: {
        color: "var(--ink-soft)",
        borderColor: "var(--gold)"
      }
    }, ex.explanation))));
  }))), ((_lessonData$tips = lessonData.tips) === null || _lessonData$tips === void 0 ? void 0 : _lessonData$tips.length) > 0 && /*#__PURE__*/React.createElement("section", {
    className: "mt-10 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Lightbulb, {
    size: 14,
    style: {
      color: "var(--gold)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.28em]",
    style: {
      color: "var(--muted)"
    }
  }, "Dicas")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, lessonData.tips.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "card-paper rounded-sm p-3 flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fx-display flex-shrink-0",
    style: {
      fontWeight: 700,
      color: "var(--gold)"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-[14px]",
    style: {
      color: "var(--ink-soft)"
    }
  }, t))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-10 card-paper rounded-sm p-6 text-center anim-rise"
  }, lessonData.finalTip && /*#__PURE__*/React.createElement("div", {
    className: "fx-serif-italic text-lg mb-4",
    style: {
      color: "var(--ink-soft)"
    }
  }, "\"", lessonData.finalTip, "\""), !isCompleted ? /*#__PURE__*/React.createElement("button", {
    onClick: onComplete,
    className: "btn-primary px-6 py-3 rounded-sm fx-body text-sm flex items-center gap-2 mx-auto"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 15
  }), " Concluir aula de hoje") : /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 fx-body text-sm",
    style: {
      color: "var(--sage)"
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16
  }), " Aula conclu\xEDda"), !allRevealed && /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs mt-3",
    style: {
      color: "var(--muted)"
    }
  }, "Dica: tente os exerc\xEDcios antes de revelar as respostas.")));
};

// -----------------------------------------------------------
// Flashcards
// -----------------------------------------------------------

const FlashcardsView = _ref7 => {
  let {
    flashcards,
    setFlashcards
  } = _ref7;
  const [deck, setDeck] = useState([]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [session, setSession] = useState({
    easy: 0,
    good: 0,
    hard: 0
  });
  const [finished, setFinished] = useState(false);
  const speak = t => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };
  useEffect(() => {
    // Build deck: due cards first, then least-seen
    const now = Date.now();
    const due = flashcards.filter(c => !c.nextReview || c.nextReview <= now);
    const rest = flashcards.filter(c => c.nextReview && c.nextReview > now).sort((a, b) => (a.seen || 0) - (b.seen || 0));
    const d = [...due, ...rest].slice(0, 25);
    // shuffle due portion
    for (let x = d.length - 1; x > 0; x--) {
      const j = Math.floor(Math.random() * (x + 1));
      [d[x], d[j]] = [d[j], d[x]];
    }
    setDeck(d);
    setI(0);
    setFlipped(false);
    setFinished(false);
    setSession({
      easy: 0,
      good: 0,
      hard: 0
    });
  }, [flashcards.length]);
  const current = deck[i];
  const mark = async level => {
    if (!current) return;
    const now = Date.now();
    const multipliers = {
      hard: 0.5,
      good: 2,
      easy: 4
    };
    const base = current.intervalDays || 1;
    const next = Math.max(1, Math.round(base * multipliers[level]));
    const updated = flashcards.map(c => c.id === current.id ? {
      ...c,
      intervalDays: next,
      nextReview: now + next * 86400000,
      seen: (c.seen || 0) + 1,
      lastLevel: level
    } : c);
    setFlashcards(updated);
    await sSet("flashcards", updated);
    setSession(s => ({
      ...s,
      [level]: s[level] + 1
    }));
    if (i + 1 >= deck.length) {
      setFinished(true);
    } else {
      setI(i + 1);
      setFlipped(false);
    }
  };
  const restart = () => {
    setI(0);
    setFlipped(false);
    setFinished(false);
    setSession({
      easy: 0,
      good: 0,
      hard: 0
    });
  };
  if (flashcards.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-3xl mx-auto px-4 md:px-6 py-16 text-center"
    }, /*#__PURE__*/React.createElement(Layers, {
      size: 32,
      className: "mx-auto",
      style: {
        color: "var(--muted)"
      }
    }), /*#__PURE__*/React.createElement("h2", {
      className: "fx-display text-3xl mt-4",
      style: {
        fontWeight: 600
      }
    }, "Seus flashcards v\xE3o aparecer aqui."), /*#__PURE__*/React.createElement("p", {
      className: "fx-body mt-2",
      style: {
        color: "var(--ink-soft)"
      }
    }, "A cada aula, o vocabul\xE1rio novo vira um flashcard automaticamente."));
  }
  if (finished) {
    const total = session.easy + session.good + session.hard;
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-3xl mx-auto px-4 md:px-6 py-12 text-center anim-rise"
    }, /*#__PURE__*/React.createElement(Trophy, {
      size: 32,
      className: "mx-auto",
      style: {
        color: "var(--gold)"
      }
    }), /*#__PURE__*/React.createElement("h2", {
      className: "fx-display text-4xl mt-4",
      style: {
        fontWeight: 600
      }
    }, "Sess\xE3o completa", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent)"
      }
    }, ".")), /*#__PURE__*/React.createElement("p", {
      className: "fx-serif-italic mt-2",
      style: {
        color: "var(--ink-soft)"
      }
    }, "Voc\xEA revisou ", total, " ", total === 1 ? "carta" : "cartas", "."), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 grid grid-cols-3 gap-2 max-w-md mx-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-paper rounded-sm p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-2xl",
      style: {
        fontWeight: 600,
        color: "var(--sage)"
      }
    }, session.easy), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-xs",
      style: {
        color: "var(--muted)"
      }
    }, "F\xE1cil")), /*#__PURE__*/React.createElement("div", {
      className: "card-paper rounded-sm p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-2xl",
      style: {
        fontWeight: 600
      }
    }, session.good), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-xs",
      style: {
        color: "var(--muted)"
      }
    }, "Sabia")), /*#__PURE__*/React.createElement("div", {
      className: "card-paper rounded-sm p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fx-display text-2xl",
      style: {
        fontWeight: 600,
        color: "var(--accent)"
      }
    }, session.hard), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-xs",
      style: {
        color: "var(--muted)"
      }
    }, "Dif\xEDcil"))), /*#__PURE__*/React.createElement("button", {
      onClick: restart,
      className: "btn-primary mt-6 px-5 py-2.5 rounded-sm fx-body text-sm flex items-center gap-2 mx-auto"
    }, /*#__PURE__*/React.createElement(RotateCw, {
      size: 14
    }), " Revisar de novo"));
  }
  if (!current) return null;
  const progress = i / deck.length * 100;
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto px-4 md:px-6 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em]",
    style: {
      color: "var(--muted)"
    }
  }, "Flashcard ", i + 1, " de ", deck.length), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-1 rounded-full overflow-hidden",
    style: {
      background: "var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full transition-all",
    style: {
      width: `${progress}%`,
      background: "var(--ink)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flip-card h-80 cursor-pointer",
    onClick: () => setFlipped(!flipped)
  }, /*#__PURE__*/React.createElement("div", {
    className: `flip-inner ${flipped ? "flipped" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flip-face card-paper rounded-sm p-6 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em]",
    style: {
      color: "var(--muted)"
    }
  }, "Ingl\xEAs"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      speak(current.word);
    },
    style: {
      color: "var(--ink-soft)"
    }
  }, /*#__PURE__*/React.createElement(Volume2, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center flex-1 text-center -mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-4xl md:text-5xl",
    style: {
      fontWeight: 600
    }
  }, current.word), current.pos && /*#__PURE__*/React.createElement("div", {
    className: "fx-serif-italic mt-2 text-sm",
    style: {
      color: "var(--muted)"
    }
  }, current.pos)), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs text-center",
    style: {
      color: "var(--muted)"
    }
  }, "Toque para ver a tradu\xE7\xE3o")), /*#__PURE__*/React.createElement("div", {
    className: "flip-face flip-back card-paper rounded-sm p-6 flex flex-col justify-between",
    style: {
      background: "linear-gradient(180deg, var(--paper), #F4E9D2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em]",
    style: {
      color: "var(--muted)"
    }
  }, "Portugu\xEAs"), /*#__PURE__*/React.createElement("div", {
    className: "text-center flex-1 flex flex-col justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-3xl md:text-4xl",
    style: {
      fontWeight: 600,
      color: "var(--accent)"
    }
  }, current.translation), current.example && /*#__PURE__*/React.createElement("div", {
    className: "fx-serif-italic mt-4 text-sm px-2",
    style: {
      color: "var(--ink-soft)"
    }
  }, "\"", current.example, "\"")), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs text-center",
    style: {
      color: "var(--muted)"
    }
  }, "Como foi?")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mt-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => mark("hard"),
    className: "card-paper rounded-sm py-3 fx-body text-sm transition hover:scale-[1.02]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-lg",
    style: {
      fontWeight: 600,
      color: "var(--accent)"
    }
  }, "Dif\xEDcil"), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "ver logo")), /*#__PURE__*/React.createElement("button", {
    onClick: () => mark("good"),
    className: "card-paper rounded-sm py-3 fx-body text-sm transition hover:scale-[1.02]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-lg",
    style: {
      fontWeight: 600
    }
  }, "Sabia"), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "2 dias")), /*#__PURE__*/React.createElement("button", {
    onClick: () => mark("easy"),
    className: "card-paper rounded-sm py-3 fx-body text-sm transition hover:scale-[1.02]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-lg",
    style: {
      fontWeight: 600,
      color: "var(--sage)"
    }
  }, "F\xE1cil"), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "4+ dias"))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-4 fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, flashcards.length, " flashcards no total \xB7 revis\xE3o espa\xE7ada"));
};

// -----------------------------------------------------------
// Progress view
// -----------------------------------------------------------

const ProgressView = _ref8 => {
  var _profile$createdAt;
  let {
    profile,
    completedLessons,
    flashcards,
    setProfile,
    apiKey,
    setApiKey
  } = _ref8;
  const total = completedLessons.length;
  const atLevel = completedLessons.filter(l => l.level === profile.level).length;
  const pct = Math.min(100, Math.round(atLevel / LESSONS_TO_ADVANCE * 100));
  const countsBySkill = completedLessons.reduce((a, l) => {
    a[l.skill] = (a[l.skill] || 0) + 1;
    return a;
  }, {});
  const masteredCards = flashcards.filter(c => (c.seen || 0) >= 3 && c.lastLevel !== "hard").length;
  const changeLevel = async L => {
    const next = {
      ...profile,
      level: L
    };
    await sSet("profile", next);
    setProfile(next);
  };
  const levelIdx = LEVELS.indexOf(profile.level);
  const nextLevel = LEVELS[Math.min(LEVELS.length - 1, levelIdx + 1)];

  // Activity by date (last 28 days)
  const days28 = [];
  for (let k = 27; k >= 0; k--) {
    const d = new Date();
    d.setDate(d.getDate() - k);
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    days28.push({
      key,
      studied: completedLessons.some(l => l.date === key),
      weekday: d.getDay()
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-4 md:px-6 py-6 pb-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.28em]",
    style: {
      color: "var(--muted)"
    }
  }, "Seu progresso"), /*#__PURE__*/React.createElement("h1", {
    className: "fx-display text-4xl md:text-5xl mt-1",
    style: {
      fontWeight: 600
    }
  }, "Voc\xEA est\xE1 ", /*#__PURE__*/React.createElement("span", {
    className: "fx-serif-italic",
    style: {
      color: "var(--accent)"
    }
  }, "indo longe"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 card-paper rounded-sm p-6 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em]",
    style: {
      color: "var(--muted)"
    }
  }, "N\xEDvel atual"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-3 mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-5xl",
    style: {
      fontWeight: 700
    }
  }, profile.level), /*#__PURE__*/React.createElement("div", {
    className: "fx-serif-italic text-lg",
    style: {
      color: "var(--ink-soft)"
    }
  }, LEVEL_NAMES[profile.level]))), /*#__PURE__*/React.createElement(Award, {
    size: 32,
    style: {
      color: "var(--gold)"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "fx-body text-sm mt-3",
    style: {
      color: "var(--ink-soft)"
    }
  }, LEVEL_DESC[profile.level]), /*#__PURE__*/React.createElement("div", {
    className: "mt-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between fx-body text-xs mb-1.5",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "At\xE9 ", nextLevel), /*#__PURE__*/React.createElement("span", null, atLevel, "/", LESSONS_TO_ADVANCE, " aulas")), /*#__PURE__*/React.createElement("div", {
    className: "h-2 rounded-full overflow-hidden",
    style: {
      background: "var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full transition-all",
    style: {
      width: `${pct}%`,
      background: "linear-gradient(90deg, var(--accent), var(--gold))"
    }
  }))), atLevel >= LESSONS_TO_ADVANCE && profile.level !== "C2" && /*#__PURE__*/React.createElement("button", {
    onClick: () => changeLevel(nextLevel),
    className: "btn-primary mt-4 px-4 py-2 rounded-sm fx-body text-sm flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 13
  }), " Avan\xE7ar para ", nextLevel)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-paper rounded-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5",
    style: {
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement(Flame, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs uppercase tracking-[0.2em]"
  }, "Ofensiva")), /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-3xl mt-1",
    style: {
      fontWeight: 700
    }
  }, profile.streak || 0), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "dias seguidos")), /*#__PURE__*/React.createElement("div", {
    className: "card-paper rounded-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5",
    style: {
      color: "var(--ink-soft)"
    }
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs uppercase tracking-[0.2em]"
  }, "Aulas")), /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-3xl mt-1",
    style: {
      fontWeight: 700
    }
  }, total), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "no total")), /*#__PURE__*/React.createElement("div", {
    className: "card-paper rounded-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5",
    style: {
      color: "var(--sage)"
    }
  }, /*#__PURE__*/React.createElement(Layers, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs uppercase tracking-[0.2em]"
  }, "Cartas")), /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-3xl mt-1",
    style: {
      fontWeight: 700
    }
  }, flashcards.length), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, masteredCards, " dominadas")), /*#__PURE__*/React.createElement("div", {
    className: "card-paper rounded-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5",
    style: {
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Star, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "fx-body text-xs uppercase tracking-[0.2em]"
  }, "Desde")), /*#__PURE__*/React.createElement("div", {
    className: "fx-display text-lg mt-1",
    style: {
      fontWeight: 700
    }
  }, ((_profile$createdAt = profile.createdAt) === null || _profile$createdAt === void 0 ? void 0 : _profile$createdAt.slice(5).replace("-", "/")) || "—"), /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs",
    style: {
      color: "var(--muted)"
    }
  }, "voc\xEA come\xE7ou"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 card-paper rounded-sm p-5 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em] mb-3",
    style: {
      color: "var(--muted)"
    }
  }, "\xDAltimos 28 dias"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-14 gap-1",
    style: {
      gridTemplateColumns: "repeat(14, 1fr)"
    }
  }, days28.map(_ref9 => {
    let {
      key,
      studied,
      weekday
    } = _ref9;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      title: key,
      className: "aspect-square rounded-sm",
      style: {
        background: studied ? "var(--accent)" : weekday === 0 || weekday === 6 ? "var(--line-soft)" : "var(--bg-2)",
        opacity: studied ? 1 : 0.6,
        border: "1px solid var(--line)"
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mt-3 fx-body text-[10px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2.5 h-2.5 rounded-sm",
    style: {
      background: "var(--accent)"
    }
  }), " estudou"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2.5 h-2.5 rounded-sm",
    style: {
      background: "var(--bg-2)",
      border: "1px solid var(--line)"
    }
  }), " dia \xFAtil"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2.5 h-2.5 rounded-sm",
    style: {
      background: "var(--line-soft)"
    }
  }), " fim de semana"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 card-paper rounded-sm p-5 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em] mb-3",
    style: {
      color: "var(--muted)"
    }
  }, "Por pilar"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, ["grammar", "reading", "writing", "listening", "review"].map(s => {
    const c = countsBySkill[s] || 0;
    const max = Math.max(1, ...Object.values(countsBySkill));
    const p = c / max * 100;
    const Icon = {
      grammar: Feather,
      reading: BookOpen,
      writing: Pencil,
      listening: Headphones,
      review: RotateCw
    }[s];
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 14,
      style: {
        color: "var(--ink-soft)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-sm w-24",
      style: {
        color: "var(--ink)"
      }
    }, FOCUS_LABEL[s]), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 h-2 rounded-full overflow-hidden",
      style: {
        background: "var(--line-soft)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full",
      style: {
        width: `${p}%`,
        background: "var(--ink-soft)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "fx-body text-xs w-8 text-right",
      style: {
        color: "var(--muted)"
      }
    }, c));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 card-paper rounded-sm p-5 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em] mb-3",
    style: {
      color: "var(--muted)"
    }
  }, "Ajustar n\xEDvel"), /*#__PURE__*/React.createElement("p", {
    className: "fx-body text-sm mb-3",
    style: {
      color: "var(--ink-soft)"
    }
  }, "Sentindo que as aulas est\xE3o f\xE1ceis ou dif\xEDceis? Mude seu n\xEDvel a qualquer momento."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, LEVELS.map(L => /*#__PURE__*/React.createElement("button", {
    key: L,
    onClick: () => changeLevel(L),
    className: `px-3 py-1.5 rounded-sm fx-display text-sm border transition`,
    style: {
      fontWeight: 600,
      background: profile.level === L ? "var(--ink)" : "var(--paper)",
      color: profile.level === L ? "var(--paper)" : "var(--ink)",
      borderColor: profile.level === L ? "var(--ink)" : "var(--line)"
    }
  }, L)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 card-paper rounded-sm p-5 anim-rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-body text-xs uppercase tracking-[0.22em] mb-1",
    style: {
      color: "var(--muted)"
    }
  }, "Chave da IA (Gemini)"), /*#__PURE__*/React.createElement("p", {
    className: "fx-body text-sm mb-3",
    style: {
      color: "var(--ink-soft)"
    }
  }, apiKey ? "✅ Chave configurada. A IA gera suas aulas." : "⚠️ Sem chave — usando aulas padrão."), /*#__PURE__*/React.createElement("input", {
    className: "input-paper w-full fx-body text-sm",
    placeholder: "Cole aqui: AIza...",
    defaultValue: apiKey,
    onChange: e => setApiKey(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary mt-3 px-4 py-2 rounded-sm fx-body text-sm flex items-center gap-2",
    onClick: async () => {
      await sSet("geminiKey", apiKey);
      alert("Chave salva!");
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 14
  }), " Salvar chave")), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 text-center fx-body text-xs flex items-center justify-center gap-1.5",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement(Cloud, {
    size: 11
  }), " Tudo salvo automaticamente \xB7 ol\xE1, ", profile.name));
};

// -----------------------------------------------------------
// Root App
// -----------------------------------------------------------

function App() {
  var _DAY_FOCUS$currentDay;
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [tab, setTab] = useState("today");
  const [lessonData, setLessonData] = useState(null);
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [lessonError, setLessonError] = useState(false);

  // Load state
  useEffect(() => {
    (async () => {
      const p = await sGet("profile");
      if (p) setProfile(p);
      const k = await sGet("geminiKey");
      if (k) setApiKey(k);
      const cl = await sGet("completedLessons");
      if (Array.isArray(cl)) setCompletedLessons(cl);
      const fc = await sGet("flashcards");
      if (Array.isArray(fc)) setFlashcards(fc);
      setReady(true);
    })();
  }, []);
  const focusKey = ((_DAY_FOCUS$currentDay = DAY_FOCUS[currentDay()]) === null || _DAY_FOCUS$currentDay === void 0 ? void 0 : _DAY_FOCUS$currentDay.key) || "grammar";
  const tKey = todayKey();
  const lessonToday = completedLessons.find(l => l.date === tKey);
  const completedAtLevel = completedLessons.filter(l => l.level === (profile === null || profile === void 0 ? void 0 : profile.level)).length;
  const weekProgress = useMemo(() => {
    const base = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    };
    const today = new Date();
    const day = today.getDay();
    // Monday of this week
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    for (let i = 0; i < 5; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      if (completedLessons.some(l => l.date === key)) base[i + 1] = true;
    }
    return base;
  }, [completedLessons]);
  const loadLesson = useCallback(async function () {
    let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!profile) return;
    setLoadingLesson(true);
    setLessonError(false);
    try {
      const lessonIdx = getLessonIndexByFocus(completedLessons, profile.level, focusKey);
      const topicSlug = (getTopicForLesson(profile.level, focusKey, lessonIdx) || "").slice(0, 40).replace(/[^a-zA-Z0-9]/g, "-");
      const cacheKey = `lesson_${profile.level}_${focusKey}_${lessonIdx}_${topicSlug}`;
      if (!force) {
        const cached = await sGet(cacheKey);
        if (cached) {
          setLessonData(cached);
          setLoadingLesson(false);
          return;
        }
      }
      const prompt = buildPrompt(profile.level, focusKey, completedAtLevel, completedLessons);
      if (apiKey) {
        try {
          const data = await callAI(prompt, apiKey);
          setLessonData(data);
          await sSet(cacheKey, data);
          return;
        } catch (aiErr) {
          console.warn("Gemini falhou, usando aula padrão:", aiErr === null || aiErr === void 0 ? void 0 : aiErr.message);
        }
      }
      // No apiKey or AI failed — use curated fallback
      const fb = getFallbackLesson(profile.level, focusKey);
      const fallback = {
        ...fb,
        _fallback: true
      };
      setLessonData(fallback);
      await sSet(cacheKey, fallback);
    } catch (e) {
      console.error(e);
      setLessonError(true);
    } finally {
      setLoadingLesson(false);
    }
  }, [profile, focusKey, tKey, completedAtLevel, apiKey]);
  const openLesson = async () => {
    setTab("lesson");
    if (!lessonData || lessonData._stale) await loadLesson();
  };
  const completeLesson = async () => {
    if (!lessonData || !profile) return;
    const id = `${tKey}_${focusKey}`;
    if (completedLessons.some(l => l.id === id)) {
      setTab("today");
      return;
    }
    const newEntry = {
      id,
      date: tKey,
      skill: focusKey,
      level: profile.level,
      title: lessonData.title
    };
    const updatedLessons = [...completedLessons, newEntry];
    setCompletedLessons(updatedLessons);
    await sSet("completedLessons", updatedLessons);

    // Add vocabulary to flashcards
    const existingWords = new Set(flashcards.map(f => f.word.toLowerCase()));
    const newCards = (lessonData.vocabulary || []).filter(v => v.word && !existingWords.has(v.word.toLowerCase())).map(v => ({
      id: `fc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      word: v.word,
      translation: v.translation,
      pos: v.pos,
      example: v.example,
      skill: focusKey,
      level: profile.level,
      createdAt: Date.now(),
      intervalDays: 1,
      nextReview: Date.now(),
      seen: 0
    }));
    const updatedCards = [...flashcards, ...newCards];
    setFlashcards(updatedCards);
    await sSet("flashcards", updatedCards);

    // Streak
    let streak = profile.streak || 0;
    if (profile.lastStudyDate) {
      const diff = daysBetween(profile.lastStudyDate, tKey);
      if (diff === 0) {/* same day, keep */} else if (diff === 1) streak += 1;else streak = 1;
    } else streak = 1;
    const nextProfile = {
      ...profile,
      streak,
      lastStudyDate: tKey
    };
    setProfile(nextProfile);
    await sSet("profile", nextProfile);
    setTab("today");
  };
  if (!ready) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlobalStyles, null), /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex items-center justify-center paper-grain"
    }, /*#__PURE__*/React.createElement(Loader2, {
      className: "animate-spin",
      size: 24,
      style: {
        color: "var(--accent)"
      }
    })));
  }
  if (!profile) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlobalStyles, null), /*#__PURE__*/React.createElement(Onboarding, {
      onDone: (p, k) => {
        setProfile(p);
        if (k) setApiKey(k);
      }
    }));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlobalStyles, null), /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen paper-grain"
  }, /*#__PURE__*/React.createElement(Header, {
    profile: profile,
    streak: profile.streak || 0,
    tab: tab,
    setTab: setTab
  }), tab === "today" && /*#__PURE__*/React.createElement(TodayView, {
    profile: profile,
    completedAtLevel: completedAtLevel,
    lessonToday: lessonToday,
    openLesson: openLesson,
    setTab: setTab,
    allCompleted: false,
    weekProgress: weekProgress
  }), tab === "lesson" && (!lessonData && !loadingLesson && !lessonError ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-4 md:px-6 py-16 text-center"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    size: 28,
    className: "mx-auto",
    style: {
      color: "var(--muted)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "fx-display text-3xl mt-3",
    style: {
      fontWeight: 600
    }
  }, "Gere sua aula de hoje."), /*#__PURE__*/React.createElement("p", {
    className: "fx-body mt-2",
    style: {
      color: "var(--ink-soft)"
    }
  }, "A IA vai preparar uma aula de ", FOCUS_LABEL[focusKey], " para o seu n\xEDvel ", profile.level, "."), /*#__PURE__*/React.createElement("button", {
    onClick: () => loadLesson(),
    className: "btn-primary mt-5 px-5 py-2.5 rounded-sm fx-body text-sm mx-auto flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 14
  }), " Gerar aula")) : /*#__PURE__*/React.createElement(LessonView, {
    profile: profile,
    lessonData: lessonData,
    loading: loadingLesson,
    error: lessonError,
    onRegenerate: () => loadLesson(true),
    onComplete: completeLesson,
    isCompleted: !!lessonToday,
    focusKey: focusKey
  })), tab === "flashcards" && /*#__PURE__*/React.createElement(FlashcardsView, {
    flashcards: flashcards,
    setFlashcards: setFlashcards
  }), tab === "progress" && /*#__PURE__*/React.createElement(ProgressView, {
    profile: profile,
    completedLessons: completedLessons,
    flashcards: flashcards,
    setProfile: setProfile,
    apiKey: apiKey,
    setApiKey: setApiKey
  })));
}

window.__AppComponent = App;
