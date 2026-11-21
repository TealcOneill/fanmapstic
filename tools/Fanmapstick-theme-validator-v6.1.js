#!/usr/bin/env node
// BEVM theme validator (made from BEVM v6.1; generated from Fanmapstick-v6.1.html, do not edit by hand).
// Usage:  node Fanmapstick-theme-validator-v6.1.js my-theme.bevmtheme.json
// It runs the same checks BEVM runs when a theme file is installed. Exit code 0 = valid, 1 = problem (the message says what to fix).
// Needs only Node.js. It reads the file, prints a summary or the first problem, and changes nothing.
'use strict';
const isObj=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
const GN0=['plain','grass','dirt','sand','snow','gravel','water','stone'];
const AU_SHAPES=[['circle','Circle'],['triangle','Triangle'],['square','Square'],['pentagon','Pentagon'],['star','Six-point star']];
const TH_MAX_ITEMS=10,TH_MAX_PARTS=8,TH_MAX_TEX=8,TH_PRIMS=['sphere','box','cylinder'],TH_RESERVED=['hills','pits','default-road'];
// Top-down area (square feet) of an item at base size: the largest single part seen from above (round parts as circles, boxes as rectangles). Themes carry this number (topAreaFt2) so BEVM can size spawn counts without measuring.
const calcTopArea=parts=>Math.round(Math.max(...(parts.some(p=>!p.overhang)?parts.filter(p=>!p.overhang):parts).map(p=>p.prim==='box'?p.size[0]*p.size[2]:Math.PI*Math.pow(Math.max(p.size[0],p.size[2])/2,2)))*100)/100;
function validateTheme(d){const bad=m=>{throw new Error('Theme problem: '+m)};
 const obj=(x,w)=>{if(!isObj(x))bad(w+' must be an object.');return x},only=(x,keys,w)=>{for(const k of Object.keys(x))if(!keys.includes(k))bad(w+' has an unknown field "'+String(k).slice(0,30)+'".')};
 const slug=(v,w)=>{if(typeof v!=='string'||!/^[a-z0-9][a-z0-9-]{0,39}$/.test(v))bad(w+' must be 1-40 characters: lowercase letters, numbers and dashes.');return v};
 const str=(v,w,n)=>{if(typeof v!=='string'||!v.trim()||v.length>n||/[\u0000-\u001f\u007f<>]/.test(v))bad(w+' must be text of 1-'+n+' characters without < or >.');return v.trim()};
 const num=(v,w,a,b)=>{if(typeof v!=='number'||!isFinite(v)||v<a||v>b)bad(w+' must be a number from '+a+' to '+b+'.');return v};
 const vec=(v,w,a,b)=>{if(!Array.isArray(v)||v.length!==3)bad(w+' must be three numbers [x, y, z].');return v.map((n,i)=>num(n,w+'['+i+']',a,b))};
 const hex=(v,w)=>{if(typeof v!=='string'||!/^#[0-9a-fA-F]{6}$/.test(v))bad(w+' must be a color like #8a8a8a.');return v.toLowerCase()};
 obj(d,'The theme');if(d.app!=='BEVM'||d.kind!=='theme')bad('this is not a BEVM theme file.');if(d.schema!==1)bad('unsupported theme format number (this BEVM reads format 1).');
 only(d,['app','kind','schema','id','name','description','items','groundTexture','textures'],'The theme');
 const TXN=GN0.slice(),TXS=[]; // texture names this theme may use: the built-in ones plus its own (v4.4)
 if(d.textures!==undefined){if(!Array.isArray(d.textures)||d.textures.length>TH_MAX_TEX)bad('textures must be a list of up to '+TH_MAX_TEX+'.');
  for(const [j,t] of d.textures.entries()){const w='Texture '+(j+1);obj(t,w);only(t,['id','name','colors','pattern','size','contrast','detail','drift'],w);const id=slug(t.id,w+' id');if(TXN.includes(id))bad(w+' id "'+id+'" is a built-in texture name or is used twice.');
   if(!Array.isArray(t.colors)||t.colors.length!==3)bad(w+' colors must be three colors [dark, middle, light].');if(!GN0.includes(t.pattern))bad(w+' pattern must be one of: '+GN0.join(', ')+' (it borrows that texture\'s noise pattern).');
   TXN.push(id);TXS.push({id,name:str(t.name===undefined?t.id:t.name,w+' name',30),colors:t.colors.map((c,i)=>hex(c,w+' color '+(i+1))),pattern:t.pattern,size:t.size===undefined?1:num(t.size,w+' size',.3,3),contrast:t.contrast===undefined?1:num(t.contrast,w+' contrast',0,3),detail:t.detail===undefined?.5:num(t.detail,w+' detail',0,1),drift:t.drift===undefined?.3:num(t.drift,w+' drift',0,1)})}}
 const o={app:'BEVM',kind:'theme',schema:1,id:slug(d.id,'Theme id'),name:str(d.name,'Theme name',60),items:[]};if(TXS.length)o.textures=TXS;if(d.description!==undefined)o.description=str(d.description,'Description',500);if(d.groundTexture!==undefined){if(!TXN.includes(d.groundTexture))bad('groundTexture must be one of: '+TXN.join(', ')+'.');o.groundTexture=d.groundTexture}
 if(!Array.isArray(d.items)||d.items.length<1||d.items.length>TH_MAX_ITEMS)bad('a theme needs 1 to '+TH_MAX_ITEMS+' item types.');
 const chn=(v,w)=>{if(v===undefined||v===null)return null;if(!Array.isArray(v)||v.length!==2||!v.every(Number.isInteger)||v[0]<1||v[1]<v[0]||v[1]>1000000)bad(w+' chance must be two whole numbers [n, d] meaning n in d (for example [1, 1000]), with 1 <= n <= d <= 1,000,000. Leave it out for always.');return v.slice()};
 const rg2=(v,w,a,b,df)=>{if(v===undefined)return df;if(Array.isArray(v)){if(v.length!==2)bad(w+' must be a number or a range [min, max].');const m=v.map((x,i)=>num(x,w+'['+i+']',a,b));if(m[0]>m[1])bad(w+' range minimum is above its maximum.');return m}return num(v,w,a,b)};
 const seen=new Set();
 for(let [n,it] of d.items.entries()){const w='Item '+(n+1);if(isObj(it)&&it.abn!==undefined&&it.abnormalities===undefined){it={...it,abnormalities:it.abn};delete it.abn} // a validated theme (embedded in a save) stores abnormalities as abn; accept it back
  obj(it,w);only(it,['id','name','single','parts','footprintFt','scaleRange','topAreaFt2','extras','abnormalities','aura','path','terrain','description'],w);
  const id=slug(it.id,w+' id');if(TH_RESERVED.includes(id)||seen.has(id))bad(w+' id "'+id+'" is reserved or used twice.');seen.add(id);
  const r={id,name:str(it.name,w+' name',60),single:str(it.single===undefined?it.name:it.single,w+' single name',60)};if(it.description!==undefined)r.description=str(it.description,w+' description',300);
  if(it.terrain!==undefined){if(it.path!==undefined||(it.parts!==undefined&&!(Array.isArray(it.parts)&&!it.parts.length))||it.abnormalities!==undefined||it.aura!==undefined||(it.extras!==undefined&&!(Array.isArray(it.extras)&&!it.extras.length)))bad(w+' is a terrain item, so it has no parts, path, abnormalities, aura or extras.');
   const q=obj(it.terrain,w+' terrain'),tw=w+' terrain';only(q,['deformsTerrain','usesTexture','texture','footprint','profile','heightTiles','bodyHeightFt','chance'],tw);
   if(typeof q.deformsTerrain!=='boolean'||typeof q.usesTexture!=='boolean')bad(tw+' needs deformsTerrain and usesTexture, each true or false.');
   const dfm=q.deformsTerrain,ut=q.usesTexture;if(!dfm&&!ut)bad(tw+' an item that does not deform the terrain must use a texture (its solid body takes the texture color).');
   if(q.texture!==undefined&&!ut)bad(tw+' texture only applies when usesTexture is true.');if(q.texture!==undefined&&!TXN.includes(q.texture))bad(tw+' texture must be one of: '+TXN.join(', ')+'.');
   const fp=obj(q.footprint,tw+' footprint');only(fp,['shape','sizeFt','aspect'],tw+' footprint');if(fp.shape!=='ellipse'&&fp.shape!=='rectangle')bad(tw+' footprint shape must be "ellipse" or "rectangle".');if(fp.sizeFt===undefined)bad(tw+' footprint needs sizeFt.');
   const size=rg2(fp.sizeFt,tw+' footprint sizeFt',.5,5000),asp=rg2(fp.aspect,tw+' footprint aspect',.2,10,1);
   const pr=q.profile===undefined?{}:obj(q.profile,tw+' profile');only(pr,['flatTop','edge'],tw+' profile');
   if(!dfm&&q.profile!==undefined)bad(tw+' profile only applies to items that deform the terrain.');if(pr.edge!==undefined&&pr.edge!=='rounded'&&pr.edge!=='sheer')bad(tw+' profile edge must be "rounded" or "sheer".');
   const tr={deformsTerrain:dfm,usesTexture:ut};if(ut)tr.texture=q.texture===undefined?'plain':q.texture;tr.footprint={shape:fp.shape,sizeFt:size,aspect:asp};
   if(dfm){if(q.bodyHeightFt!==undefined)bad(tw+' bodyHeightFt only applies to items that do not deform the terrain.');if(q.heightTiles===undefined)bad(tw+' needs heightTiles (it deforms the terrain).');
    tr.profile={flatTop:pr.flatTop===undefined?0:num(pr.flatTop,tw+' profile flatTop',0,.95),edge:pr.edge===undefined?'rounded':pr.edge};tr.heightTiles=rg2(q.heightTiles,tw+' heightTiles',-100,100)}
   else{if(q.heightTiles!==undefined)bad(tw+' heightTiles only applies to items that deform the terrain.');if(q.bodyHeightFt===undefined)bad(tw+' needs bodyHeightFt (it does not deform the terrain).');tr.bodyHeightFt=rg2(q.bodyHeightFt,tw+' bodyHeightFt',.1,5000)}
   const ch=chn(q.chance,tw);if(ch)tr.chance=ch;r.terrain=tr;const av=x=>Array.isArray(x)?(x[0]+x[1])/2:x;
   r.parts=[];r.footprintFt=1;r.scaleRange=[1,1];r.topAreaFt2=Math.max(.01,(fp.shape==='ellipse'?Math.PI:4)*av(size)*av(size)*av(asp));r.extras=[];o.items.push(r);continue}
  if(it.path!==undefined){if((it.parts!==undefined&&!(Array.isArray(it.parts)&&!it.parts.length))||it.abnormalities!==undefined||it.aura!==undefined||(it.extras!==undefined&&!(Array.isArray(it.extras)&&!it.extras.length)))bad(w+' is a path, so it has no parts, abnormalities, aura or extras.');
   const q=obj(it.path,w+' path'),pw=w+' path';only(q,['kind','advanced','widthFt','minBendRadiusFt','windiness','heightTiles','texture'],pw);
   if(q.kind!=='road'&&q.kind!=='stream')bad(pw+' kind must be "road" or "stream" (paths only join paths of the same kind).');if(q.advanced!==undefined&&typeof q.advanced!=='boolean')bad(pw+' advanced must be true or false.');
   const adv=q.advanced===true,dh=q.kind==='road'?(adv?[2,4]:0):(adv?[-5,-3]:[-2,-1]); // default heights: road flat, advanced road raised, stream sunken, river (advanced stream) deeper
   if(q.widthFt===undefined)bad(pw+' needs widthFt.');if(q.minBendRadiusFt===undefined)bad(pw+' needs minBendRadiusFt.');
   if(q.texture!==undefined&&!TXN.includes(q.texture))bad(pw+' texture must be one of: '+TXN.join(', ')+'.');
   r.path={kind:q.kind,advanced:adv,widthFt:rg2(q.widthFt,pw+' widthFt',.5,2000,1),minBendRadiusFt:num(q.minBendRadiusFt,pw+' minBendRadiusFt',.5,100000),windiness:q.windiness===undefined?.5:num(q.windiness,pw+' windiness',0,1),heightTiles:rg2(q.heightTiles,pw+' heightTiles',-100,100,dh),texture:q.texture===undefined?(q.kind==='road'?'dirt':'water'):q.texture};
   r.parts=[];r.footprintFt=1;r.scaleRange=[1,1];r.topAreaFt2=1;r.extras=[];o.items.push(r);continue}
  if(!Array.isArray(it.parts)||it.parts.length<1||it.parts.length>TH_MAX_PARTS)bad(w+' needs 1 to '+TH_MAX_PARTS+' parts.');
  r.parts=it.parts.map((p,j)=>{const pw=w+' part '+(j+1);obj(p,pw);only(p,['prim','size','pos','color','noise','taper','overhang','name'],pw);
   if(!TH_PRIMS.includes(p.prim))bad(pw+' shape must be one of: '+TH_PRIMS.join(', ')+'.');
   if(p.overhang!==undefined&&typeof p.overhang!=='boolean')bad(pw+' overhang must be true or false.');
   if(p.taper!==undefined&&p.prim!=='cylinder')bad(pw+' taper only applies to cylinders.');
   return {...(p.name!==undefined?{name:str(p.name,pw+' name',30)}:{}),prim:p.prim,size:vec(p.size,pw+' size',.1,500),pos:vec(p.pos,pw+' pos',-500,500),color:hex(p.color,pw+' color'),noise:p.noise===undefined?0:num(p.noise,pw+' noise',0,1),...(p.prim==='cylinder'?{taper:p.taper===undefined?1:num(p.taper,pw+' taper',0,1.5)}:{}),overhang:p.overhang===true}});
  const ext=Math.max(...r.parts.map(p=>Math.hypot(p.pos[0],p.pos[2])+Math.max(p.size[0],p.size[2])/2));
  r.footprintFt=it.footprintFt===undefined?Math.round(ext*100)/100:num(it.footprintFt,w+' footprintFt',.1,500);
  r.scaleRange=it.scaleRange===undefined?[.7,1.5]:(Array.isArray(it.scaleRange)&&it.scaleRange.length===2?it.scaleRange.map((v,i)=>num(v,w+' scaleRange['+i+']',.3,3)):bad(w+' scaleRange must be [min, max].'));
  if(r.scaleRange[0]>r.scaleRange[1])bad(w+' scaleRange minimum is above its maximum.');
  r.topAreaFt2=it.topAreaFt2===undefined?calcTopArea(r.parts):num(it.topAreaFt2,w+' topAreaFt2',.01,1000000);
  r.extras=[];if(it.extras!==undefined){if(!Array.isArray(it.extras)||it.extras.length>3)bad(w+' extras must be a list of up to 3.');
   const eid=new Set();for(const e of it.extras){obj(e,w+' extra');only(e,['id','kind','label','color'],w+' extra');if(e.kind!=='glow')bad(w+' extra kind must be "glow" (the only kind supported so far).');
    const x={id:slug(e.id,w+' extra id'),kind:'glow',label:str(e.label,w+' extra label',40),color:hex(e.color,w+' extra color')};if(eid.has(x.id))bad(w+' extra id used twice.');eid.add(x.id);r.extras.push(x)}}
  if(it.abnormalities!==undefined){const A=obj(it.abnormalities,w+' abnormalities'),aw=w+' abnormalities';only(A,['hidden','noShadow','small','big','floating','light','colorVariation'],aw);r.abn={};
   const ent=(k,keys)=>{if(A[k]===undefined)return null;const e=obj(A[k],aw+' '+k);only(e,['chance'].concat(keys),aw+' '+k);return e};let e;
   if(e=ent('hidden',[]))r.abn.hidden={chance:chn(e.chance,aw+' hidden')};
   if(e=ent('noShadow',[]))r.abn.noShadow={chance:chn(e.chance,aw+' noShadow')};
   if(e=ent('small',['value']))r.abn.small={chance:chn(e.chance,aw+' small'),value:rg2(e.value,aw+' small value',.05,.95,.5)};
   if(e=ent('big',['value']))r.abn.big={chance:chn(e.chance,aw+' big'),value:rg2(e.value,aw+' big value',1.05,10,2)};
   if(e=ent('floating',['heightFt']))r.abn.floating={chance:chn(e.chance,aw+' floating'),heightFt:rg2(e.heightFt,aw+' floating heightFt',0,1000,5)};
   if(e=ent('light',['radiusFt','tint']))r.abn.light={chance:chn(e.chance,aw+' light'),radiusFt:rg2(e.radiusFt,aw+' light radiusFt',.5,3000,20),tint:e.tint===undefined?'#ffe9b0':hex(e.tint,aw+' light tint')};
   if(e=ent('colorVariation',['value']))r.abn.colorVariation={chance:chn(e.chance,aw+' colorVariation'),value:rg2(e.value,aw+' colorVariation value',1,100000,30)}}
  if(it.aura!==undefined){const a=obj(it.aura,w+' aura'),aw=w+' aura';only(a,['chance','shape','scale','scaleX','scaleY','rotation','offsetXFt','offsetYFt','opacity','noise','tint'],aw);
   r.aura={chance:chn(a.chance,aw),shape:a.shape===undefined?'circle':(AU_SHAPES.some(x=>x[0]===a.shape)?a.shape:bad(aw+' shape must be one of: '+AU_SHAPES.map(x=>x[0]).join(', ')+'.')),scale:rg2(a.scale,aw+' scale',.1,10,1),scaleX:rg2(a.scaleX,aw+' scaleX',.1,10,1),scaleY:rg2(a.scaleY,aw+' scaleY',.1,10,1),rotation:rg2(a.rotation,aw+' rotation',0,360,0),offsetXFt:rg2(a.offsetXFt,aw+' offsetXFt',-500,500,0),offsetYFt:rg2(a.offsetYFt,aw+' offsetYFt',-500,500,0),opacity:rg2(a.opacity,aw+' opacity',.05,1,.45),noise:rg2(a.noise,aw+' noise',0,1,0),tint:a.tint===undefined?'#8ec5ff':hex(a.tint,aw+' tint')}}
  o.items.push(r)}
 return o}
// A short plain-text description of a validated theme (used by Check Theme File and the standalone validator).
function themeSummary(d){const L=[d.name+'  (id '+d.id+')'];if(d.description)L.push(d.description);if(d.groundTexture)L.push('Ground texture: '+d.groundTexture);
 if(d.textures&&d.textures.length)L.push('Custom textures: '+d.textures.map(t=>t.name+' ('+t.id+')').join(', '));
 L.push(d.items.length+' item type'+(d.items.length===1?'':'s')+':');
 for(const i of d.items)L.push(' - '+i.name+': '+(i.path?'path, '+i.path.kind+(i.path.advanced?' (advanced)':''):i.terrain?'terrain item, '+(i.terrain.deformsTerrain?'deforms the ground':'solid body'):'object, '+i.parts.length+' part'+(i.parts.length===1?'':'s')));
 return L.join('\n')}

if(require.main===module){
 const fs=require('fs'),f=process.argv[2];
 if(!f){console.error('Usage: node Fanmapstick-theme-validator-v6.1.js theme.json');process.exit(2)}
 try{const txt=fs.readFileSync(f,'utf8');if(txt.length>1000000)throw new Error('Theme problem: the file is larger than 1 MB.');let j;try{j=JSON.parse(txt)}catch(_){throw new Error('Theme problem: the file is not valid JSON.')}
  const d=validateTheme(j);console.log('VALID (BEVM v6.1 rules)\n'+themeSummary(d));process.exit(0)}
 catch(e){console.error('INVALID: '+(e&&e.message||e));process.exit(1)}
}
module.exports={validateTheme,themeSummary};
