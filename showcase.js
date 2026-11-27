/* V9.4.3: local showcase, never admin or real test performance. */
function nyanShowcaseEnabled(){return activeProfile.id!=='default'&&activeProfile.role==='learner'&&(activeProfile.name.trim().toLowerCase()==='nyantoeic'||(['nyan-demo','nyan-showcase'].includes(activeProfile.name.trim().toLowerCase())&&state.showcase?.version===1));}
function nyanShowcaseSync(){
 if(!nyanShowcaseEnabled())return;
 state.showcase ||= {version:1,enabledAt:Date.now()};
 const now=Date.now(),at=state.showcase.enabledAt||now,due=now+14*86400000;
 const v=v9State(),u=vu(),rewards=nyanRewards();
 for(const t of book.topics)state.studiedTopics[t.id] ||= at;
 for(const [id,item] of qMap){const a=item.q.answer;if(!validChoice(a))continue;
  if(item.lesson)state.attempts[id]=a;
  state.exposure[id]=a;state.reviewLatest[id]=a;state.presented[id]=true;
  if(!item.lesson)state.mockLatest[id]=a;
  state.adaptive.latest[id]={choice:a,flag:false,at,due,streak:3,showcase:true};
  delete state.saved[id];delete state.lessonFlags[id];
 }
 const items=ids=>ids.map((qid,i)=>({qid,num:i+1,choice:qMap.get(qid).q.answer,answer:qMap.get(qid).q.answer,flag:false,seenBefore:null}));
 for(const l of lessons){const ids=l.questions.slice(1).map((_,i)=>l.id+':'+(i+1)).filter(id=>qMap.has(id));if(ids.length){const id='lesson-'+l.id;state.reports[id]={id,title:l.title+' · Minh họa',type:'lesson',finishedAt:at,items:items(ids),showcase:true};}}
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
 if(ui91().daily.checks)for(const k of ['theory','practice','words','review'])ui91().daily.checks[k]=true;
}
function nyanShowcaseBanner(){
 let banner=document.querySelector('#nyan-showcase-banner');
 if(!nyanShowcaseEnabled()){banner?.remove();return;}
 if(!banner){banner=document.createElement('aside');banner.id='nyan-showcase-banner';banner.className='nyan-showcase-banner';banner.setAttribute('role','note');document.querySelector('.topbar').after(banner);}
 banner.textContent=activeProfile.name+' · HỒ SƠ MINH HỌA V9.4.4 — Mở tự động nội dung và mèo; điểm số không phải thành tích học thật.';
}
