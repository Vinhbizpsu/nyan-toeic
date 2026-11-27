/* Local adaptive practice. No mock questions are drawn here. No network, no AI. */
function adaptiveObservations(){
 const out=new Map();
 function add(id,choice,flag,at,source){if(!qMap.has(id)||!validChoice(choice))return;const previous=out.get(id);if(!previous||at>=previous.at)out.set(id,{choice,flag:!!flag,at,source});}
 for(const [id,choice] of Object.entries(state.attempts))add(id,choice,state.lessonFlags[id]||state.saved[id]?.flag,0,'lesson');
 for(const r of Object.values(state.reports).sort((a,b)=>a.finishedAt-b.finishedAt))for(const x of r.items||[])add(x.qid,x.choice,x.flag,r.finishedAt||0,r.type);
 for(const [id,x] of Object.entries(state.adaptive.latest||{}))add(id,x.choice,x.flag,x.at,'adaptive');
 return out;
}
function adaptiveSeen(id,obs){return obs.has(id)||!!state.presented[id]||validChoice(state.exposure[id])||validChoice(state.reviewLatest[id]);}
function adaptiveGroups(obs=adaptiveObservations()){
 const groups=new Map(book.topics.map(t=>[t.id,{t,n:0,wrong:0,flag:0,due:0,pool:[],unseen:0}]));
 for(const [id,o] of obs){const g=groups.get(ruleRef(id)?.topic);if(!g)continue;g.n++;if(o.choice!==qMap.get(id).q.answer)g.wrong++;else if(o.flag)g.flag++;if(state.adaptive.latest[id]?.due<=Date.now())g.due++;}
 for(const [id,item] of qMap){if(id.startsWith('mock:'))continue;const g=groups.get(ruleRef(id)?.topic);if(!g)continue;g.pool.push(id);if(!adaptiveSeen(id,obs))g.unseen++;}
 return [...groups.values()].map(g=>({...g,priority:g.wrong*2+g.flag+g.due*.5}));
}
function adaptivePlan(tid=null,limit=10){
 const obs=adaptiveObservations(),groups=adaptiveGroups(obs),by=new Map(groups.map(g=>[g.t.id,g]));
 if(tid&&!by.has(tid))return [];
 // Prefer evidence of weakness, then new questions, then due review. Round-robin caps domination by one topic in mixed mode.
 const relevant=tid?[by.get(tid)]:groups.filter(g=>g.pool.length).sort((a,b)=>b.priority-a.priority||Number(a.n>0)-Number(b.n>0)||Number(!!state.studiedTopics[b.t.id])-Number(!!state.studiedTopics[a.t.id])||Number(a.t.id.split('.')[0])-Number(b.t.id.split('.')[0]));
 const lists=relevant.map(g=>g.pool.slice().sort((a,b)=>{
  const rank=id=>{const o=obs.get(id),l=state.adaptive.latest[id];if(!adaptiveSeen(id,obs))return 0;if(o&&(o.choice!==qMap.get(id).q.answer||o.flag))return 1;if(l&&l.due<=Date.now())return 2;return 3;};
  return rank(a)-rank(b)||((state.adaptive.latest[a]?.at||0)-(state.adaptive.latest[b]?.at||0))||a.localeCompare(b);
 }));
 const selected=[];if(tid)return lists[0].slice(0,limit);
 // First pass: up to six priority topics, two items each; then broaden if needed.
 const first=lists.slice(0,6);for(let k=0;k<2;k++)for(const list of first)if(list.length&&selected.length<limit)selected.push(list.shift());
 for(const list of lists)while(list.length&&selected.length<limit)selected.push(list.shift());
 return selected;
}
function adaptiveStart(tid=null,mode="adaptive",limit=10,explicitIds=null){
 const old=state.adaptive.session;
 if(old&&!old.done&&!confirm('Bắt đầu phiên mới sẽ thay thế phiên luyện thích ứng đang làm. Tiếp tục?'))return;
 const ids=explicitIds?explicitIds.filter(id=>qMap.has(id)&&!id.startsWith('mock:')).slice(0,limit):mode==='mastery'?v9FreshPlan(tid).slice(0,limit):adaptivePlan(tid,limit);if(!ids.length){say('Chưa có câu phù hợp.');return;}
 const obs=adaptiveObservations();state.adaptive.session={id:'adaptive-'+(globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2)),tid,mode,ids,pos:0,answers:{},flags:{},seen:Object.fromEntries(ids.map(id=>[id,adaptiveSeen(id,obs)])),before:Object.fromEntries(ids.map(id=>[id,obs.has(id)?{ok:obs.get(id).choice===qMap.get(id).q.answer,flag:obs.get(id).flag}:null])),startedAt:Date.now(),timeById:{},done:false};save();location.hash='adaptive/session';adaptiveScreen('session');window.scrollTo(0,0);
}
function adaptiveCard(){const groups=adaptiveGroups(),need=groups.filter(g=>g.priority>0).length;return '<section class="panel adaptive-home"><div class="eyebrow">NYAN · Lộ trình riêng</div><h2>Luyện theo năng lực của bạn</h2><p>'+ (need?need+' bài có tín hiệu cần ôn hoặc đến lịch xem lại.':'Chưa có đủ dữ liệu điểm yếu; bắt đầu bằng các kiến thức nền tảng.')+' Câu trong Test 1–12 được giữ riêng.</p><a class="btn" href="#adaptive">Mở luyện tập cá nhân</a></section>';}
function adaptiveScreen(mode){
 drawNav('adaptive','Luyện theo điểm yếu');const s=state.adaptive.session;
 if(mode==='session'&&s&&Array.isArray(s.ids)&&s.ids.length&&s.ids.every(id=>qMap.has(id))){
  if(s.done){const r=state.reports[s.id];if(r){location.hash='insights/'+s.id;return;}}
  const id=s.ids[s.pos],q=qMap.get(id)?.q;if(!q){location.hash='adaptive';return;}
  if(!state.presented[id]){state.presented[id]=true;save();}
  const answered=validChoice(s.answers[id]);const topic=topicsById.get(ruleRef(id).topic);
  main.innerHTML=pageHead('NYAN · Luyện thích ứng','Câu '+(s.pos+1)+' / '+s.ids.length,s.mode==='challenge'||s.mode==='mastery'?'Chọn đáp án trước khi chuyển câu; lời giải chỉ xuất hiện sau khi hoàn thành. Dấu phân vân không ảnh hưởng điểm.':'Chọn đáp án để xem lời giải. Đánh dấu phân vân không ảnh hưởng điểm.')+'<div class="panel adaptive-progress" '+(['challenge','mastery'].includes(s.mode)?'data-v9-blind':'')+'><div class="statrow"><span>'+esc(topic.id+' · '+topic.title)+'</span><b>'+ (s.seen[id]?'Đã ghi nhận gặp':'Chưa ghi nhận gặp')+'</b></div><div class="bar"><i style="width:'+100*Object.keys(s.answers).length/s.ids.length+'%"></i></div></div>'+questionHTML(id,'adaptive',{choice:s.answers[id],reveal:!['challenge','mastery'].includes(s.mode),marked:s.flags[id],label:'Luyện cá nhân · '+(s.pos+1)})+'<div class="actions"><a class="outline" href="#adaptive">Tạm dừng</a>'+makeBtn('adaptive-next',s.pos===s.ids.length-1?'Hoàn thành & xem báo cáo':'Câu tiếp theo','btn',answered?'':'disabled')+'</div>';return;
 }
 const obs=adaptiveObservations(),groups=adaptiveGroups(obs),needs=groups.filter(g=>g.priority>0).sort((a,b)=>b.priority-a.priority),count=groups.filter(g=>g.n>0).length, today=new Date().toLocaleDateString('vi-VN');
 const picks=(needs.length?needs:groups.filter(g=>g.n===0)).slice(0,8);
 main.innerHTML=pageHead('NYAN · '+today,'Luyện theo điểm yếu','Dựa trên lựa chọn thực tế, dấu phân vân và lịch sử lưu trên trình duyệt này. Không dự đoán điểm TOEIC.')+v9PracticeModes()+'<div class="panel adaptive-progress"><h2>'+esc(activeProfile.name)+'</h2><div class="insight-metrics"><div><strong>'+count+'/140</strong><span>Bài có dữ liệu</span></div><div><strong>'+needs.length+'</strong><span>Bài cần xem lại</span></div><div><strong>'+groups.reduce((n,g)=>n+g.unseen,0)+'</strong><span>Câu luyện chưa ghi nhận gặp</span></div></div><p class="muted">Ưu tiên câu sai, câu đúng nhưng phân vân và câu chưa gặp cùng chủ điểm. Lịch ôn: sai/đánh dấu → 1 ngày; đúng không đánh dấu → 3, 7, 14 ngày theo chuỗi đúng. Có thể luyện bất cứ lúc nào.</p><div class="actions">'+(s&&!s.done?'<a class="btn" href="#adaptive/session">Tiếp tục phiên đang làm</a>':'')+makeBtn('adaptive-start','Luyện 10 câu đề xuất',s&&!s.done?'outline':'btn')+'</div></div><h2>'+ (needs.length?'Ưu tiên hôm nay':'Bắt đầu từ nền tảng')+'</h2><div class="skill-grid">'+picks.map(g=>'<article class="panel"><h3>'+esc(g.t.id+' · '+g.t.title)+'</h3><p>'+g.n+' câu đã có dữ liệu · '+g.wrong+' sai · '+g.flag+' đúng nhưng phân vân</p><p class="muted">'+g.unseen+' / '+g.pool.length+' câu luyện chưa ghi nhận gặp. '+(g.n<3?'Mẫu ít, chưa đủ kết luận.':'')+'</p><div class="actions"><a class="outline" href="#textbook/'+g.t.id+'">Đọc lý thuyết</a>'+makeBtn('adaptive-start','Luyện bài này','btn','data-id="'+g.t.id+'"')+'</div></article>').join('')+'</div><section class="panel"><h2>Luyện theo bài bất kỳ</h2><label for="adaptive-topic">Chọn bài trong giáo trình</label><select id="adaptive-topic">'+book.topics.map(t=>'<option value="'+t.id+'">'+esc(t.id+' · '+t.title)+'</option>').join('')+'</select>'+makeBtn('adaptive-select','Bắt đầu bài đã chọn')+'</section><a class="outline" href="#insights">Lịch sử báo cáo</a>';
}
function adaptiveFinish(s){
 if(s.done)return;const now=Date.now();
 for(const id of s.ids){const correct=s.answers[id]===qMap.get(id).q.answer,flag=!!s.flags[id],old=state.adaptive.latest[id];const streak=correct&&!flag?(old?.streak||0)+1:0;const days=streak===0?1:streak===1?3:streak===2?7:14;state.adaptive.latest[id]={choice:s.answers[id],flag,at:now,streak,due:now+days*86400000};}
 if(['challenge','mastery'].includes(s.mode))for(const id of s.ids)updateSavedQuestion(id,{wrong:s.answers[id]!==qMap.get(id).q.answer,flag:!!s.flags[id]});
 s.done=true;recordReport(s.id,s.mode==='challenge'?'Challenge · Ẩn lời giải':s.mode==='mastery'?'Mastery · Câu chưa ghi nhận gặp':s.tid?'Luyện cá nhân · '+topicsById.get(s.tid).title:'Luyện cá nhân · Phiên đề xuất',s.ids,s.answers,s.flags,{type:'adaptive',timeById:s.timeById||{},mode:s.mode||'adaptive',seen:s.seen,before:s.before,duration:now-s.startedAt});save();location.hash='insights/'+s.id;
}
function adaptiveAction(button,action){
 if(action==='adaptive-start'){adaptiveStart(button.dataset.id||null);return true;}
 if(action==='adaptive-select'){adaptiveStart(main.querySelector('#adaptive-topic')?.value);return true;}
 const card=button.closest('[data-mode="adaptive"]');if(!card&&action!=='adaptive-next')return false;
 const s=state.adaptive.session;if(!s||s.done)return true;const id=s.ids[s.pos];
 if(action==='flag'){s.flags[id]=!s.flags[id];if(validChoice(s.answers[id])&&!['challenge','mastery'].includes(s.mode))updateSavedQuestion(id,{flag:s.flags[id]});save();adaptiveScreen('session');return true;}
 if(action==='answer'){const choice=Number(button.dataset.i);if(validChoice(s.answers[id])||!validChoice(choice))return true;s.answers[id]=choice;if(!validChoice(state.exposure[id]))state.exposure[id]=choice;state.reviewLatest[id]=choice;if(!['challenge','mastery'].includes(s.mode))updateSavedQuestion(id,{wrong:choice!==qMap.get(id).q.answer,flag:!!s.flags[id]});save();adaptiveScreen('session');return true;}
 if(action==='adaptive-next'){if(!validChoice(s.answers[id]))return true;if(s.pos===s.ids.length-1){if(s.ids.every(x=>validChoice(s.answers[x])))adaptiveFinish(s);}else{s.pos++;save();adaptiveScreen('session');window.scrollTo(0,0);}return true;}
 return true;
}
function adaptiveComparison(r){if(r.type!=='adaptive')return '';const paired=r.items.filter(x=>r.before?.[x.qid]);const old=paired.filter(x=>r.before[x.qid].ok).length,now=paired.filter(x=>x.choice===x.answer).length,fresh=r.items.filter(x=>!x.seenBefore);return '<section class="panel"><h2>So sánh trước và sau</h2><p>'+ (paired.length?'Cùng '+paired.length+' câu đã có dữ liệu: trước '+old+'/'+paired.length+', lần này '+now+'/'+paired.length+'.':'Chưa có câu đã làm trước đây để so sánh.')+'</p><p>Câu chưa ghi nhận gặp: '+fresh.filter(x=>x.choice===x.answer).length+'/'+fresh.length+' đúng.</p><p class="muted">Làm lại cùng câu có thể chịu ảnh hưởng ghi nhớ đáp án. Kết quả không phải mức tăng năng lực đã được xác nhận.</p><a class="btn" href="#adaptive">Luyện phiên tiếp theo</a></section>';}
