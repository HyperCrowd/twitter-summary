import*as c from"csv-stream";import{open as p}from"node:fs/promises";import*as i from"post-entity";var a=process.argv[2]||"",l=parseInt(process.argv[3]||"5");if(a==="")throw new RangeError;var e={},u={delimiter:"	",endLine:`
`,columnOffset:0,escapeChar:'"',enclosedChar:'"'},d=c.createStream(u),r=`Using a list of words where the number after the comma is how frequently the word is used, please summarize the personality, interests, fears, and hopes of the person using these words from the list (and account for frequency): 

`;async function h(){(await p(a,"r")).createReadStream().pipe(d).on("data",function(t){if(t.retweet!=="False"||t.language!=="en")return;let o=i.process(t.tweet).filter(s=>s.type==="text").map(s=>s.raw.trim());for(let s of o){let f=s.split(" ");for(let m of f){let n=m.trim();n!==""&&(e[n]===void 0&&(e[n]=0),e[n]+=1)}}}).on("close",function(){let t=Object.keys(e);for(let o of t)e[o]<l||(r+=`${o}:${e[o]} `);console.log(r)})}h();
//# sourceMappingURL=index.js.map