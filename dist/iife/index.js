(()=>{var B=Object.create;var p=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var u=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var f=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var R=(e,t,i,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of $(t))!N.call(e,s)&&s!==i&&p(e,s,{get:()=>t[s],enumerable:!(n=Z(t,s))||n.enumerable});return e};var x=(e,t,i)=>(i=e!=null?B(j(e)):{},R(t||!e||!e.__esModule?p(i,"default",{value:e,enumerable:!0}):i,e));var C=f((H,w)=>{var g=u("events").EventEmitter,z=u("util");w.exports=c;function c(e){g.call(this),this.delimiter=e&&e.delimiter||",",this.endLine=e&&e.endLine||`
`,this.enclosedChar=e&&e.enclosedChar||"",this.escapeChar=e&&e.escapeChar||"",this.columnOffset=e&&e.columnOffset||0,this._defaultColumns=e?!!e.columns:!1,this.columns=e?e.columns||[]:[],this._currentColumn=0,this._index=0,this._line={},this._text="",this._enclosing=null}z.inherits(c,g);c.prototype.end=function(e){e&&this.parse(e),(this._text||Object.getOwnPropertyNames(this._line).length)&&(this._text[this._text.length-1]==="\r"&&(this._text=this._text.slice(0,this._text.length-1)),this.emit("column",this.columns[this._currentColumn],this._text),this._line[this.columns[this._currentColumn]]=this._text,this.emit("data",this._line)),this.emit("end")};c.prototype.parse=function(e){for(var t=0;t<e.length;t++){var i=e[t];this.escapeChar===i&&this._enclosing&&e[t+1]===this.enclosedChar?(t++,this._text=this._text+e[t]):this.enclosedChar===i?this._enclosing=!this._enclosing:this.delimiter===i?this._enclosing?this._text=this._text+i:(this._index<this.columnOffset||(this._index===this.columnOffset&&!this._defaultColumns?this.columns[this._currentColumn]=this._text:(this.emit("column",this.columns[this._currentColumn],this._text),this._line[this.columns[this._currentColumn]]=this._text)),this._text="",this._currentColumn++):this.endLine===i?this._enclosing?this._text=this._text+i:(this._text[this._text.length-1]==="\r"&&(this._text=this._text.slice(0,this._text.length-1)),this._index<this.columnOffset||(this._index===this.columnOffset&&!this._defaultColumns?(this.columns[this._currentColumn]=this._text,this.emit("header",this.columns)):(this.emit("column",this.columns[this._currentColumn],this._text),this._line[this.columns[this._currentColumn]]=this._text,this.emit("data",this._line))),this._index++,this._currentColumn=0,this._line={},this._text=""):this._text=this._text+i}}});var b=f(v=>{var y=u("stream"),F=u("util"),M=C();v.createStream=function(e){return new h(e||{})};function h(e){var t=this;y.call(this),this.writable=!0,this.readable=!0,this._paused=!1,this._ended=!1,this._destroyed=!1,this._endCallWhenPause=!1,this._buffer=new Buffer(0),this._encoding=void 0,this._parser=new M(e),this._parser.on("data",function(i){if(t._ended)throw new Error("Must not emit data event after emittion of end event.");t.emit("data",i)}),this._parser.on("column",function(i,n){t.emit("column",i,n)}),this._parser.on("header",function(i){t.emit("header",i)}),this._parser.on("end",function(){t._ended=!0,t.readable=!1,t.emit("end")})}F.inherits(h,y);h.prototype.write=function(e,t){if(this._encoding=t||this._encoding,this._ended)throw new Error("Cannot write after end has been called.");return e&&(this._buffer=Buffer.concat([this._buffer,e],this._buffer.length+e.length)),this._paused?!1:(this._parser.parse(this._buffer.toString(this._encoding)),this._buffer=new Buffer(0),!this._paused)};h.prototype.end=function(e,t){(this._buffer||e)&&(this.write(e,t)?(this.writable=!1,this._parser.end(),this._destroyed||this.destroy()):this._endCallWhenPause=!0)};h.prototype.destroy=function(){this._buffer=null,this._destroyed=!0,this.emit("close")};h.prototype.pause=function(){this._paused=!0};h.prototype.resume=function(){this._paused=!1,this._buffer&&this._buffer.length>0&&!this._endCallWhenPause&&this.write(),this._endCallWhenPause&&this.end(),this.emit("drain")}});var O=f((J,E)=>{var _={types:[{name:"hashtag",regexp:/#\w+/g},{name:"cashtag",regexp:/\$[A-Z]+/g},{name:"mention",regexp:/@\w+/g},{name:"link",regexp:/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig}],entities:function(e,t){if(!e&&e!=="")throw new Error("Entities requires a non-empty string.");if(t=t||_.types,!t)throw new Error("No types found.");var i=[];return t.forEach(function(n){for(var s;(s=n.regexp.exec(e))!==null;)i.push({type:n.name,index:s.index,raw:s[0]})}),i.sort(function(n,s){return n.index>s.index})},process:function(e,t){var i=_.entities(e,t),n=[],s=e,o=0;return i.forEach(function(a){var r=a.index-o,m=r+a.raw.length,d=s.slice(0,r);d&&n.push({type:"text",raw:d,index:o}),n.push(a),s=s.slice(m),o+=m}),n.push({type:"text",raw:s,index:o}),n}};E.exports=_});var S=f((K,q)=>{q.exports=O()});var k=x(b()),L=u("fs/promises"),W=x(S()),A=process.argv[2]||"tests/test.csv";if(A==="")throw new RangeError;var l={},U={delimiter:"	",endLine:`
`,columnOffset:0,escapeChar:'"',enclosedChar:'"'},V=k.createStream(U),P=`Using a list of words where the number after the comma is how frequently the word is used, please summarize the personality, interests, fears, and hopes of the person using these words from the list (and account for frequency): 

`;async function D(){(await(0,L.open)(A,"r")).createReadStream().pipe(V).on("data",function(i){if(i.retweet!=="False"||i.language!=="en")return;let n=W.process(i.tweet).filter(s=>s.type==="text").map(s=>s.raw.trim());for(let s of n){let o=s.split(" ");for(let a of o){let r=a.trim();r!==""&&(l[r]===void 0&&(l[r]=0),l[r]+=1)}}}).on("close",function(){let i=Object.keys(l);for(let n of i)l[n]!==1&&(P+=`${n}:${l[n]} `);console.log(P)})}D();})();
/*! Bundled license information:

csv-stream/lib/parser.js:
  (*!
   * csv-stream
   * Copyright(c) 2012 HipSnip Limited
   * Author Rémy Loubradou <remyloubradou@gmail.com>
   * MIT Licensed
   *)

csv-stream/index.js:
  (*!
   * csv-stream
   * Copyright(c) 2012 HipSnip Limited
   * Author Rémy Loubradou <remyloubradou@gmail.com>
   * MIT Licensed
   *)
*/
//# sourceMappingURL=index.js.map