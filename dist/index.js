var w=Object.create;var i=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var S=(e,s,t,n)=>{if(s&&typeof s=="object"||typeof s=="function")for(let o of g(s))!v.call(e,o)&&o!==t&&i(e,o,{get:()=>s[o],enumerable:!(n=y(s,o))||n.enumerable});return e};var f=(e,s,t)=>(t=e!=null?w(k(e)):{},S(s||!e||!e.__esModule?i(t,"default",{value:e,enumerable:!0}):t,e));var m=f(require("csv-stream")),p=require("fs/promises"),l=f(require("post-entity")),u=process.argv[2]||"tests/test.csv";if(u==="")throw new RangeError;var r={},b={delimiter:"	",endLine:`
`,columnOffset:0,escapeChar:'"',enclosedChar:'"'},q=m.createStream(b),a=`Using a list of words where the number after the comma is how frequently the word is used, please summarize the personality, interests, fears, and hopes of the person using these words from the list (and account for frequency): 

`;async function x(){(await(0,p.open)(u,"r")).createReadStream().pipe(q).on("data",function(t){if(t.retweet!=="False"||t.language!=="en")return;let n=l.process(t.tweet).filter(o=>o.type==="text").map(o=>o.raw.trim());for(let o of n){let d=o.split(" ");for(let h of d){let c=h.trim();c!==""&&(r[c]===void 0&&(r[c]=0),r[c]+=1)}}}).on("close",function(){let t=Object.keys(r);for(let n of t)r[n]!==1&&(a+=`${n}:${r[n]} `);console.log(a)})}x();
//# sourceMappingURL=index.js.map