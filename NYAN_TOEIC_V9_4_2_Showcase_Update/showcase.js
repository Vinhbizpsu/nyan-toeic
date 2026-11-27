/* NYAN V9.4.1: explicitly labelled local showcase, not administrator access. */
const nyanShowcaseNames=new Set(['nyan-demo','nyan-showcase']);
function nyanShowcaseEligible(){return activeProfile.id!=='default'&&activeProfile.role==='learner'&&nyanShowcaseNames.has(activeProfile.name.trim().toLowerCase());}
function nyanShowcaseEnabled(){return nyanShowcaseEligible()&&state.showcase?.version===1;}
function nyanShowcaseFresh(){return !Object.keys(state.attempts).length&&!Object.keys(state.reports).length&&!Object.keys(state.studiedTopics).length&&!Object.keys(state.exposure).length&&!Object.keys(state.presented).length&&!state.history.length&&!state.exam&&!state.retake&&!state.adaptive.session&&!Object.keys(state.adaptive.latest).length&&!Object.keys(state.v9?.words||{}).length&&!Object.keys(state.v9?.rewards?.owned||{}).length;}
function nyanShowcaseEnable(){
 if(!nyanShowcaseEligible()||nyanShowcaseEnabled()||!nyanShowcaseFresh())return;
 if(!confirm('Bật hồ sơ trưng bày? Kết quả tự tạo chỉ là dữ liệu minh họa, không phải thành tích học thật. Không thể chuyển hồ sơ này thành hồ sơ học thật.'))return;
 state.showcase={version:1,enabledAt:Date.now()};save();renderRoute();
}
function nyanShowcaseSync(){
 if(!nyanShowcaseEnabled())return;
 const now=Date.now(),at=state.showcase.enabledAt||now,due=now+14*86400000;
 const v=v9State(),u=vu(),rewards=nyanRewards();
 for(const t of book.topics)state.studiedTopics[t.id] ||= at;
 for(const [id,item] of qMap){const a=item.q.answer;if(!validChoice(a))continue;
  if(item.lesson)state.attempts[id]=a;
  state.exposure[id]=a;state.reviewLatest[id]=a;state.presented[id]=true;
  if(!item.lesson)state.mockLatest[id]=a;
  state.adaptive.latest[id]={choice:a,flag:false,at,due,streak:3,showcase:true};
  if(state.saved[id]?.wrong){delete state.saved[id].wrong;if(!state.saved[id].flag)delete state.saved[id];}
  delete state.lessonFlags[id];
 }
 const items=ids=>ids.map((qid,i)=>({qid,num:i+1,choice:qMap.get(qid).q.answer,answer:qMap.get(qid).q.answer,flag:false,seenBefore:null}));
 for(const l of lessons){const ids=l.questions.slice(1).map((_,i)=>l.id+':'+(i+1)).filter(id=>qMap.has(id));if(ids.length){const id='lesson-'+l.id;state.reports[id]={id,title:l.title+' · Minh họa',type:'lesson',finishedAt:at,items:items(ids),showcase:true};}}
 // Rebuild generated test summaries from current forms. No invented test timing or actual activity claim.
 for(const [id,r] of Object.entries(state.reports))if(r.showcase&&r.type==='exam')delete state.reports[id];
 state.history=state.history.filter(h=>!h.showcase);
 for(const test of mockTests){const ids=test.ids.filter(id=>qMap.has(id));if(!ids.length||ids.length!==test.ids.length)continue;const id='showcase-test-'+test.id;
  state.reports[id]={id,title:test.title+' · Minh họa',type:'exam',revision:examRevision,finishedAt:at,items:items(ids),showcase:true};
  state.history.push({id,testId:test.id,revision:examRevision,score:ids.length,answered:ids.length,flags:0,finishedAt:at,duration:0,showcase:true});
 }
 for(const w of v9Words()){u.seen[w.id]=at;u.checks[w.id]={streak:3,days:['2000-01-01','2000-01-02'],correct:3,total:3,showcase:true};v.words[w.id]={at,streak:3,due,showcase:true};}
 for(const id of Object.keys(ui91CatNames))v.cats[id] ||= at;
 for(const c of nyanRareCats)rewards.owned[c.id] ||= {at,label:'Mở khóa minh họa',showcase:true};
 ui91().welcomed=true;
}
function nyanShowcaseBanner(){
 let banner=document.querySelector('#nyan-showcase-banner');
 if(!nyanShowcaseEnabled()){banner?.remove();return;}
 if(!banner){banner=document.createElement('aside');banner.id='nyan-showcase-banner';banner.className='nyan-showcase-banner';banner.setAttribute('role','note');document.querySelector('.topbar').after(banner);}
 banner.textContent=activeProfile.name+' · HỒ SƠ MINH HỌA — Toàn bộ nội dung và mèo được mở tự động; điểm số không phải thành tích học thật.';
}
