var y=Object.create;var i=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,C=Object.prototype.hasOwnProperty;var O=(e,o,t,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of k(o))!C.call(e,r)&&r!==t&&i(e,r,{get:()=>o[r],enumerable:!(s=v(o,r))||s.enumerable});return e};var f=(e,o,t)=>(t=e!=null?y(S(e)):{},O(o||!e||!e.__esModule?i(t,"default",{value:e,enumerable:!0}):t,e));var p=f(require("csv-stream")),l=require("fs/promises"),u=f(require("post-entity")),d=require("stopword"),w=process.argv[2]||"",b=parseInt(process.argv[3]||"5");if(w==="")throw new RangeError;var n={},q={delimiter:"	",endLine:`
`,columnOffset:0,escapeChar:'"',enclosedChar:'"'},x=p.createStream(q),m=`Using a list of words where the number after the comma is how frequently the word is used, please summarize the personality, interests, fears, and hopes of the person using these words from the list (and account for frequency): 

`,z=/[^a-z\-]/g;async function L(){(await(0,l.open)(w,"r")).createReadStream().pipe(x).on("data",function(t){if(t.retweet!=="False"||t.language!=="en")return;let s=t.tweet.toLowerCase(),r=u.process(s).filter(c=>c.type==="text").map(c=>c.raw.trim());for(let c of r){let h=(0,d.removeStopwords)(c.split(" "));for(let g of h){let a=g.trim().replace(z,"");a!==""&&(n[a]===void 0&&(n[a]=0),n[a]+=1)}}}).on("close",function(){let t=Object.keys(n);for(let s of t)n[s]<b||(m+=`${s}:${n[s]} `);console.log(m)})}L();
//# sourceMappingURL=index.js.map