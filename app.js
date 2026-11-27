'use strict';

const main = document.querySelector('main');
const sidebar = document.querySelector('#sidebar');
const crumb = document.querySelector('#crumb');
const stages = window.stages;
const lessons = window.lessons;
const mixed = window.mixedTest;
const platform = window.NyanPlatform;
const key = platform.key();
const activeProfile = platform.active();
const labels = 'ABCD';
const emptyState = () => ({attempts:{}, saved:{}, exam:null, history:[], lastLesson:null, retake:null, mockLatest:{}, reviewLatest:{}, reports:{}, exposure:{}, lessonFlags:{}, presented:{}, studiedTopics:{}, lastTopic:null, adaptive:{latest:{},session:null}});
function loadState(){
  try {
    const parsed = platform.storage.load(key);
    const loaded=Object.assign(emptyState(), parsed && typeof parsed === 'object' ? parsed : {});
    for(const k of ['attempts','saved','mockLatest','reviewLatest','reports','exposure','lessonFlags','presented','studiedTopics'])if(!loaded[k]||typeof loaded[k]!=='object'||Array.isArray(loaded[k]))loaded[k]={};
    if(!Array.isArray(loaded.history))loaded.history=[];
    if(!loaded.adaptive||typeof loaded.adaptive!=="object"||Array.isArray(loaded.adaptive))loaded.adaptive={latest:{},session:null};
    if(!loaded.adaptive.latest||typeof loaded.adaptive.latest!=="object"||Array.isArray(loaded.adaptive.latest))loaded.adaptive.latest={};
    const e=loaded.exam;
    if(e && !e.ids && e.answers && e.flags){e.ids=mixed.slice(0,30).map((_,i)=>"mock:"+i);e.testId=-1;}
    if(e && (!e.id || !Array.isArray(e.ids) || e.ids.length!==30 || !Number.isInteger(e.pos) || e.pos<0 || e.pos>=e.ids.length || !e.answers || !e.flags || typeof e.testId !== 'number')) loaded.exam=null;
    return loaded;
  } catch {return emptyState();}
}
let state = loadState();
let storageWarning = false;
function save(){
  try {nyanRewardMilestones();vuMilestones();} catch(e){console.warn("Cat reward check:",e);}
  try {platform.storage.save(key,state);queueMicrotask(nyanRewardNotice);}
  catch {storageWarning = true;}
}
const paths = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
  book:'<path d="M2.5 5c3.3-1.5 6.3-1 9.5 1.2C15.2 4 18.2 3.5 21.5 5v14c-3.8-1-6.5-.3-9.5 1.5C9 18.7 6.3 18 2.5 19zM12 6.2v14.3"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1"/>',
  check:'<path d="m4 12 5 5L20 6"/>', cross:'<path d="m6 6 12 12M18 6 6 18"/>',
  file:'<path d="M6 3h8l4.5 4.5V21H6zM14 3v5h4M9 12h6M9 16h5"/>',
  notebook:'<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M9 3v18M3 7h4M3 12h4M3 17h4M12 7h5"/>',
  bookmark:'<path d="M6 3.5h12v17l-6-4-6 4z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  layers:'<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  link:'<path d="M9.5 15.5 8 17a4 4 0 0 1-5.7-5.6l4-4A4 4 0 0 1 12 7m.1 10a4 4 0 0 0 5.6-.4l4-4a4 4 0 0 0-5.7-5.6l-1.5 1.5M8 15l8-8"/>',
  text:'<path d="m2 19 5.5-14L13 19M4.1 14h6.8M16 10c5-2 6 2 4 4-1.6 1.6-5.5.4-5.5 3.3 0 2.6 3.5 2.7 5.7.3M20.5 13v6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  chevron:'<path d="m7 10 5 5 5-5"/>',right:'<path d="m9 6 6 6-6 6"/>',back:'<path d="m15 5-7 7 7 7"/>',
  search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',flag:'<path d="M5 21V4c4-3 7 2 13 0v11c-6 2-9-3-13 0"/>',
  pen:'<path d="M4 20l4.5-1L20 7.5 16.5 4 5 15.5zM14.5 6l3.5 3.5"/>',
  circle:'<circle cx="12" cy="12" r="8"/>',done:'<circle cx="12" cy="12" r="9"/><path d="m7.5 12 3 3 6-6"/>',
  monitor:'<rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  home:'<path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',moon:'<path d="M20.9 13.4A9 9 0 0 1 10.6 3.1 9 9 0 1 0 20.9 13.4z"/>',
  chart:'<path d="M4 20h16M6 16v-4M12 16V5M18 16V9"/>'
};
const ic = name => '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">'+(paths[name] || '')+'</svg>';
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lessonById = new Map(lessons.map(l=>[l.id,l]));
const qMap = new Map();
for(const l of lessons) l.questions.forEach((q,i)=>qMap.set(l.id+':'+i,{q,lesson:l,i}));
mixed.forEach((q,i)=>qMap.set('mock:'+i,{q,lesson:null,i}));
for(const q of [...window.nyanPracticeV8,...window.nyanPracticeV9,...window.nyanExamV8])qMap.set(q.id,{q,lesson:null,i:null,topic:q.topic});

const examRevision='v8';
const mockTests=window.nyanExamFormsV8.map((form,i)=>({id:i,title:'Test '+(i+1),ids:form.map(n=>'mock:'+n),focus:'30 câu riêng · phối hợp cấu trúc, từ loại và từ vựng'}));
const examTitle=e=>(!Number.isInteger(e.testId)||e.testId<0)?'Đề tổng hợp cũ':'Test '+(e.testId+1)+(e.revision===examRevision?'':' · bản cũ');
const answered = l => l.questions.filter((q,i)=>Number.isInteger(state.attempts[l.id+':'+i])).length;
const completed = l => answered(l)===l.questions.length;
function savedKeys(){return Object.keys(state.saved).filter(id=>qMap.has(id));}
function navLink(url,icon,title,selected,tail=''){
  return '<a href="#'+url+'" class="navitem '+(selected?'active':'')+'" '+(selected?'aria-current="page"':'')+'>'+ic(icon)+esc(title)+tail+'</a>';
}
function drawNav(page,title){ ui91Nav(page,title); }
// Theme is stored independently; the original learning state key is untouched.
const themeKey=platform.themeKey();
const themeQuick=document.querySelector('#theme-quick');
const colorPreference=matchMedia('(prefers-color-scheme: dark)');
let themeChoice='system';
try {const savedTheme=localStorage.getItem(themeKey);if(['light','dark','system'].includes(savedTheme))themeChoice=savedTheme;} catch {}
function applyTheme(){
  const dark=themeChoice==='dark'||(themeChoice==='system'&&colorPreference.matches);
  document.documentElement.dataset.theme=dark?'dark':'light';
  document.querySelector('meta[name="theme-color"]').content=dark?'#17251f':'#f6f3e8';
  const next=dark?'sáng':'tối';
  themeQuick.innerHTML=ic(dark?'sun':'moon')+'<span>'+ (dark?'Sáng':'Tối')+'</span>';
  themeQuick.setAttribute('aria-label','Chuyển nhanh sang giao diện '+next);
  themeQuick.title='Chuyển sang giao diện '+next;
}
themeQuick.addEventListener('click',()=>{themeChoice=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem(themeKey,themeChoice);}catch{}applyTheme();});
colorPreference.addEventListener('change',applyTheme);
applyTheme();
requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('theme-ready')));
const menu=document.querySelector('#menu-toggle');
const shell=document.querySelector('.shell');
const skip=document.querySelector('.skip');
const shade=document.querySelector('#shade');
menu.innerHTML=ic('menu');
function closeMenu(){
  sidebar.classList.remove('open');
  sidebar.removeAttribute('role');
  sidebar.removeAttribute('aria-modal');
  shade.hidden=true;
  shell.inert=false;document.querySelector('#ui91-bottom').inert=false;
  skip.inert=false;
  menu.setAttribute('aria-expanded','false');
}
function dismissMenu(){
  closeMenu();
  menu.focus();
}
menu.addEventListener('click',()=>{
  sidebar.classList.add('open');
  sidebar.setAttribute('role','dialog');
  sidebar.setAttribute('aria-modal','true');
  shade.hidden=false;
  menu.setAttribute('aria-expanded','true');
  sidebar.querySelector('.close-menu').focus();
  shell.inert=true;document.querySelector('#ui91-bottom').inert=true;
  skip.inert=true;
});
shade.onclick=dismissMenu;
skip.addEventListener('click',event=>{
  event.preventDefault();
  main.focus();
});
sidebar.addEventListener('click',event=>{
  if(!sidebar.classList.contains('open')) return;
  if(event.target.closest('.close-menu')) dismissMenu();
  else if(event.target.closest('a')){
    closeMenu();
    main.focus();
  }
});
sidebar.addEventListener('keydown',event=>{
  if(!sidebar.classList.contains('open')) return;
  if(event.key==='Escape'){dismissMenu();return;}
  if(event.key!=='Tab') return;
  const links=[...sidebar.querySelectorAll('button,a[href],summary')].filter(el=>el.getClientRects().length);
  const first=links[0],last=links[links.length-1];
  if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
  if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
});
matchMedia('(max-width:760px)').addEventListener('change',()=>{
  if(sidebar.classList.contains('open')){closeMenu();main.focus();}
  else if(sidebar.contains(document.activeElement) && menu.offsetWidth) menu.focus();
});
function say(message){document.querySelector('#announce').textContent=message;}
const pageHead=(over,title,desc='')=>'<header class="pagehead"><div class="eyebrow">'+esc(over)+'</div><h1>'+esc(title)+'</h1>'+(desc?'<p>'+esc(desc)+'</p>':'')+'</header>';
const back=(link,title)=>'<a class="back" href="#'+link+'">'+ic('back')+esc(title)+'</a>';
const makeBtn=(action,label,klass='btn',attrs='')=>'<button class="'+klass+'" type="button" data-act="'+action+'" '+attrs+'>'+label+'</button>';
const lessonUrl = (l,t='start') => '#lesson/'+l.id+'/'+t;
function stageCard(stage,items,n,open=false){
  const rows=items.map(l=>{const progress=answered(l);return '<a class="lesson-link" href="'+lessonUrl(l)+'">'+ic(completed(l)?'done':'circle')+'<span>'+esc(l.title)+'</span><span class="end">'+(progress?progress+'/'+l.questions.length+' câu':'Mở bài')+'</span></a>';}).join('');
  return '<details class="stage" '+(open?'open':'')+'><summary><span class="st-icon '+stage.tone+'">'+ic(stage.icon)+'</span><div class="st-content"><div class="st-kicker">Chặng '+String(n+1).padStart(2,'0')+' · '+items.length+' chủ điểm</div><h3>'+esc(stage.title)+'</h3><p>'+esc(stage.desc)+'</p></div><span class="chev">'+ic('chevron')+'</span></summary><div class="stage-rows">'+rows+'</div></details>';
}
function progressPanels(){
  const done=lessons.filter(completed).length, total=lessons.length;
  const attempted=lessons.reduce((a,l)=>a+answered(l),0), correct=lessons.reduce((a,l)=>a+l.questions.filter((q,i)=>state.attempts[l.id+':'+i]===q.answer).length,0);
  const last=state.history.at(-1);
  return '<aside class="sidepanels"><section class="panel"><div class="inline-between"><h2>Tiến độ luyện tập</h2>'+ic('chart')+'</div><div class="progress-stat"><strong>'+done+'</strong><span>/ '+total+' nhóm luyện</span></div><div class="bar" role="progressbar" aria-label="Chủ điểm hoàn thành" aria-valuenow="'+done+'" aria-valuemax="'+total+'" aria-valuemin="0"><i style="width:'+100*done/Math.max(total,1)+'%"></i></div><div class="statrow"><span>Đã trả lời</span><b>'+attempted+' câu</b></div><div class="statrow"><span>Lý thuyết đã đánh dấu</span><b>'+book.topics.filter(t=>state.studiedTopics[t.id]).length+'/140</b></div><div class="statrow"><span>Đúng lần đầu</span><b>'+correct+' câu</b></div><a class="panel-link" href="#review">Sổ ôn tập · '+savedKeys().length+' câu</a></section><section class="panel goal"><img class="goal-mascot" src="./assets/nyan-happy.svg" alt="" width="56" height="56"><div class="inline-between"><div class="eyebrow">Mục tiêu Part 5</div>'+ic('target')+'</div><div class="goalnum">'+v9State().goal+' <small>/ 30 câu</small></div><p>'+(last?'Lần làm đề gần nhất: '+last.score+'/30'+' câu đúng.':'Kiểm tra độ chính xác bằng một đề trộn các chủ điểm.')+'</p><a class="textlink" href="#exam/list">Mở Test 1–12</a></section></aside>';
}
function home(){
  drawNav('home','Trang chủ');
  const l=lessonById.get(state.lastLesson)||lessons[0];
  main.innerHTML='<section class="hero"><button type="button" class="hero-cat" aria-label="Nựng mèo NYAN" title="Nhấn để nựng NYAN"><img src="./assets/nyan-study.svg" alt="" draggable="false"><img class="hero-cat-happy" src="./assets/nyan-study-happy.svg" alt="" draggable="false"><span class="hero-cat-hearts" aria-hidden="true">♥ <i>♥</i> ♥</span></button><div class="hero-content"><div class="eyebrow">NYAN TOEIC · HỌC CÙNG NYAN</div><h1>TOEIC Part 5</h1><p>Hoàn thành câu · Ngữ pháp và từ vựng</p><p class="hero-note">Hiểu từng lỗi sai, tiến bộ từng ngày.</p><div class="hero-actions"><a class="btn" href="'+'#textbook/'+(topicsById.has(state.lastTopic)?state.lastTopic:'1.1')+'">'+ic('book')+(state.lastTopic?'Tiếp tục đọc giáo trình':'Bắt đầu học lý thuyết')+'</a><a class="hero-link" href="#catalog">Xem mục lục</a></div></div></section>'+
    ui91Home()+nyanRewardHomeHTML();
}
let filter='all',query='';
const normalize = s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/\s+/g,' ').trim();
function rememberCatalog(){
  history.replaceState({filter,query},'');
}
function catalogResults(){
  const needle=normalize(query.trim());
  const html=stages.map((s,i)=>{
    const items=lessons.filter(l=>l.stage===s.id && (filter==='all'||(filter==='ongoing'?answered(l)>0 && !completed(l):completed(l))) && normalize([l.title,l.summary,s.title,...l.rules.map(r=>r.title)].join(' ')).includes(needle));
    return items.length?stageCard(s,items,i,true):'';
  }).join('');
  document.querySelector('#results').innerHTML=html||'<div class="empty">Chưa có bài phù hợp. Hãy đổi từ khóa hoặc bộ lọc.</div>';
}
function catalog(){
  drawNav('catalog','Mục lục bài học');
  main.innerHTML=pageHead('Part 5','Luyện theo chủ điểm','24 nhóm luyện tập hiện có. Mục lục giáo trình 10 chương được tổ chức riêng.')+'<section class="panel"><h2>Luyện theo 140 bài giáo trình</h2><p>Chọn bài cụ thể, mở lý thuyết hoặc luyện trực tiếp.</p><a class="btn" href="#knowledge">Chọn bài cần luyện</a></section><h2>24 nhóm luyện tổng hợp</h2><a class="outline" href="#catalog">Mở giáo trình 10 chương</a>'+ 
  '<label class="searchbox">'+ic('search')+'<input id="search-input" aria-label="Tìm chủ điểm" placeholder="Tìm chủ điểm, ví dụ: mệnh đề, giới từ…" value="'+esc(query)+'"></label>'+
  '<div class="tabs" aria-label="Lọc bài học">'+[['all','Tất cả'],['ongoing','Đang học'],['done','Hoàn thành']].map(([id,t])=>makeBtn('filter',t,id===filter?'selected':'','data-id="'+id+'" aria-pressed="'+(id===filter)+'"')).join('')+'</div><div id="results" class="stage-list"></div>';
  catalogResults();document.querySelector('#search-input').oninput=e=>{query=e.target.value;rememberCatalog();catalogResults();};
}
const quickLine=(label,txt)=>'<p><strong>'+esc(label)+'</strong> '+esc(txt)+'</p>';
function answerFeedback(q,selection){
  const ok=selection===q.answer;
  return '<section class="feedback"><h3 class="'+(ok?'':'miss')+'">'+(ok?'Chính xác':selection===null?'Chưa trả lời · Đáp án đúng':'Đáp án đúng')+' · '+labels[q.answer]+'. '+esc(q.options[q.answer])+'</h3><p lang="en" class="en">'+esc(q.stem.replace('___',q.options[q.answer]))+'</p>'+quickLine('Dịch nghĩa',q.vi)+quickLine('Căn cứ chọn',q.reason)+'<details><summary>Phân tích bốn lựa chọn</summary><ul>'+q.explain.map((x,i)=>'<li><b>'+labels[i]+'. '+esc(q.options[i])+'</b> · '+esc(x)+'</li>').join('')+'</ul></details></section>';
}
function questionHTML(id,mode='lesson',opts={}){
  const item=qMap.get(id),q=item.q;
  const choice=opts.choice,show=(Number.isInteger(choice)||choice===null)&&opts.reveal,marked=opts.marked;
  const num=opts.label||'Câu hỏi';
  return '<article class="question" id="q-'+id.replace(':','-')+'" data-question="'+esc(id)+'" data-mode="'+mode+'"><div class="qtop"><span class="small-kicker">'+esc(num)+'</span>'+(opts.level?'<span class="pill">'+esc(opts.level)+'</span>':'')+'</div><p class="phrase" lang="en">'+esc(q.stem).replace('___','<span class="blank">_____</span>')+'</p><div class="options">'+q.options.map((o,i)=>{
    const correct=show&&i===q.answer, wrong=show&&i===choice&&i!==q.answer;
    return '<button type="button" data-act="answer" data-i="'+i+'" class="option '+(correct?'correct':wrong?'wrong':i===choice?'chosen':'')+'" '+(show||mode==='review'||mode==='result'?'disabled':'')+' aria-pressed="'+(choice===i)+'"><span class="optkey">'+labels[i]+'</span><span lang="en">'+esc(o)+'</span>'+(correct?ic('check'):wrong?ic('cross'):'')+'</button>';
  }).join('')+'</div>'+(['review','result'].includes(mode)?'':'<div class="question-tools">'+makeBtn('flag',ic('flag')+' '+(marked?'Đã đánh dấu phân vân':'Mình đang phân vân'),'flag','aria-pressed="'+Boolean(marked)+'"')+'</div>')+(show?answerFeedback(q,choice)+(opts.hideRule?'':ruleLink(id,opts.reportId||'')):'')+'</article>';
}
function lessonQuestion(l,i){
  const id=l.id+':'+i;
  return questionHTML(id,'lesson',{choice:state.attempts[id],reveal:true,marked:state.saved[id]?.flag,label:i?'Câu luyện '+i:'Câu khởi động',level:i?(qMap.get(id).q.source==='original-nyan'?'Củng cố':(['','Dễ','Trung bình','Khó','Nâng cao'][i]||'Luyện tập')):'Thử sức'});
}
function sourceBlock(l){
  return l.sourceNote?'<aside class="source-list"><b>Đối chiếu nguồn</b><p>'+esc(l.sourceNote)+'</p>'+(l.sourceUrl?'<a class="extern" rel="noopener" target="_blank" href="'+esc(l.sourceUrl)+'">Mở nguồn đối chiếu</a>':'')+'</aside>':'';
}
function lesson(id,tab='start',ruleId,reportId){
  const l=lessonById.get(id);if(!l){notFound();return;}
  if(tab==='theory'){const n=/^r\d+$/.test(ruleId||'')?Number(ruleId.slice(1)):1;const t=mappedTopic(id,n)||mappedTopic(id,1);textbookTopic(t,{legacyId:id,ruleId,reportId});return;}
  if(!['start','theory','practice'].includes(tab))tab='start';
  const s=stages.find(s=>s.id===l.stage);
  drawNav(l.stage==='ets'?'ets':'lesson','Bài học');state.lastLesson=l.id;state.lastTab=tab;save();
  const tabs=[['start','Khởi động'],['theory','Lý thuyết & ví dụ'],['practice','Luyện tập']];
  let body='';
  if(tab==='start'){
    body=lessonQuestion(l,0)+'<div class="actions"><a class="btn" href="'+lessonUrl(l,'theory')+'">Xem lý thuyết & ví dụ</a><a class="outline" href="'+lessonUrl(l,'practice')+'">Làm bài luyện</a></div>';
  }else{
    body=l.questions.slice(1).map((q,i)=>lessonQuestion(l,i+1)).join('');
    const report=lessonReport(l);
    if(report)body=reportHTML(report)+body;
    if(completed(l)){
      const right=l.questions.filter((q,i)=>state.attempts[l.id+':'+i]===q.answer).length;
      const next=lessons[lessons.indexOf(l)+1];
      body+='<div class="lesson-score"><strong>Hoàn thành chủ điểm · '+right+'/'+l.questions.length+' câu đúng lần đầu</strong></div><div class="actions">'+(next?'<a class="btn" href="'+lessonUrl(next)+'">Sang chủ điểm kế tiếp</a>':'')+'<a class="outline" href="#review">Mở sổ ôn tập</a></div>';
    }else if(!Number.isInteger(state.attempts[id+':0']))body+='<a class="outline" href="'+lessonUrl(l)+'">Làm câu khởi động</a>';
  }
  main.innerHTML='<div class="lessonframe">'+back(l.stage==='ets'?'ets':'practice',l.stage==='ets'?'Đối chiếu ETS':'Luyện theo chủ điểm')+pageHead(s.title,l.title,l.summary)+'<nav class="tabs" aria-label="Các phần bài học">'+tabs.map(([val,t])=>'<a class="tablink '+(tab===val?'selected':'')+'" '+(tab===val?'aria-current="page"':'')+' href="'+lessonUrl(l,val)+'">'+t+'</a>').join('')+'</nav>'+body+'</div>';
}
function ets(){
  drawNav('ets','Đối chiếu ETS');
  const s=stages.find(x=>x.id==='ets');
  main.innerHTML='<div class="lessonframe">'+pageHead('Chặng 05','Đối chiếu ETS 2025–2026','Ưu tiên nguồn năm 2026. Câu luyện trong NYAN TOEIC là câu tự biên soạn, không phải bản sao đề thi thật.')+
    '<section class="panel ets-priority"><div class="eyebrow">Nguồn ưu tiên · 2026</div><h2>Đề thực tế công bố nửa đầu năm 2026</h2><p>Ủy ban TOEIC Hàn Quốc (YBM) công bố Reading ngày 29/06/2026, đợt 18. Xem video và lời giải gốc từ trang chính thức. Chưa đối chiếu trực tiếp từng câu trong video ở bản này.</p><a class="outline" rel="noopener" target="_blank" href="https://www.toeicstory.co.kr/2599">Mở công bố chính thức</a></section>'+stageCard(s,lessons.filter(l=>l.stage==='ets'),4,true)+'<section class="source-list"><h2 class="section-title">Nguồn và phạm vi đối chiếu</h2><ul>'+window.etsSources.map(src=>'<li><a rel="noopener" target="_blank" class="extern" href="'+esc(src.url)+'">'+esc(src.label)+'</a><br>'+esc(src.note)+'</li>').join('')+'</ul></section></div>';
}

function notFound(){
  drawNav('home','Không tìm thấy bài');
  main.innerHTML = pageHead('Part 5','Không tìm thấy bài học') + back('catalog','Trở về mục lục');
}

// ── Sổ ôn tập ────────────────────────────────────────────────────
let reviewFilter = {stage:'all', kind:'all'};

function reviewEntryHTML(id){
  const item = qMap.get(id);
  if(!item) return '';
  const q = item.q;
  const entry = state.saved[id] || {};
  const choice = Object.hasOwn(state.reviewLatest,id) ? state.reviewLatest[id] : Object.hasOwn(state.mockLatest,id) ? state.mockLatest[id] : state.attempts[id];
  const hasChoice = Number.isInteger(choice)||choice===null;

  // Nhãn trạng thái
  const tags = [];
  if(entry.wrong) tags.push('<span class="pill">Câu sai</span>');
  if(entry.flag)  tags.push('<span class="pill gold">Phân vân</span>');

  // Nguồn gốc câu
  const isMock = id.startsWith('mock:');
  const sourceLabel = isMock
    ? 'Đề tổng hợp · câu '+(Number(id.split(':')[1])+1)
    : (item.lesson ? item.lesson.title : item.topic?'Luyện cá nhân · '+item.topic:'');
  const sourceLink = isMock ? '' : (item.lesson
    ? '<a class="textlink tiny" href="'+lessonUrl(item.lesson,'practice')+'">Mở bài gốc</a>'
    : '');

  // Câu hỏi đã reveal đáp án
  const qHTML = questionHTML(id, 'review', {
    reveal: hasChoice,
    choice: hasChoice ? choice : undefined,
    label: sourceLabel
  });

  return '<div class="review-entry" data-review-id="'+esc(id)+'">'
    +'<div class="review-header"><div class="pillrow">'+tags.join('')+'</div>'
    +sourceLink
    +'<button class="soft icon-btn tiny" type="button" data-act="remove" data-id="'+esc(id)+'" aria-label="Xóa khỏi sổ ôn">Xóa</button></div>'
    +(hasChoice?'<p class="muted tiny">Lời giải theo lần trả lời gần nhất được lưu; kết quả lần đầu không thay đổi.</p>':'')
    +qHTML
    +(!hasChoice?'<p class="muted tiny">Chưa trả lời. Mở chế độ luyện lại để làm câu này.</p>':'')
    +'</div>';
}

function review(){
  drawNav('review','Sổ ôn tập');

  const allIds = savedKeys();
  const total   = allIds.length;
  const wrongs  = allIds.filter(id => state.saved[id]?.wrong).length;
  const flags   = allIds.filter(id => state.saved[id]?.flag).length;

  // Tạo danh sách chặng có câu
  const stageIds = ['all', ...stages.map(s=>s.id)];
  const stageLabels = {all:'Tất cả', foundation:'Cấu trúc câu', verbs:'Động từ', clauses:'Mệnh đề', lexicon:'Từ vựng', ets:'Đối chiếu ETS'};
  // Thêm nhóm đề tổng hợp nếu có câu mock trong sổ
  const hasMock = allIds.some(id=>id.startsWith('mock:'));
  if(hasMock && !stageIds.includes('mock')) stageIds.push('mock');
  stageLabels['mock'] = 'Đề tổng hợp';
  if(allIds.some(id=>(id.startsWith('v8:')||id.startsWith('v9:'))))stageIds.push('adaptive');
  stageLabels['adaptive']='Luyện cá nhân';

  // Lọc theo chặng và trạng thái
  const filtered = allIds.filter(id=>{
    const item = qMap.get(id);
    if(!item) return false;
    const isMock = id.startsWith('mock:');
    const stageMatch = reviewFilter.stage === 'all'
      || (reviewFilter.stage === 'mock' ? isMock : reviewFilter.stage==='adaptive'?(id.startsWith('v8:')||id.startsWith('v9:')):(!isMock && item.lesson?.stage === reviewFilter.stage));
    const kindMatch = reviewFilter.kind === 'all'
      || (reviewFilter.kind === 'wrong' ? state.saved[id]?.wrong : state.saved[id]?.flag);
    return stageMatch && kindMatch;
  });

  // Thanh bộ lọc chặng
  const stageTabs = stageIds
    .filter(sid => sid === 'all' || allIds.some(id => {
      const isMock = id.startsWith('mock:');
      return sid === 'mock' ? isMock : sid==='adaptive'?(id.startsWith('v8:')||id.startsWith('v9:')):(!isMock && qMap.get(id)?.lesson?.stage === sid);
    }))
    .map(sid => '<button type="button" data-act="rv-stage" data-id="'+sid+'" class="'+(reviewFilter.stage===sid?'selected':'')+'" aria-pressed="'+(reviewFilter.stage===sid)+'">'+esc(stageLabels[sid]||sid)+'</button>')
    .join('');

  const kindTabs = [['all','Tất cả'],['wrong','Câu sai'],['flag','Phân vân']]
    .map(([id,t]) => '<button type="button" data-act="rv-kind" data-id="'+id+'" class="'+(reviewFilter.kind===id?'selected':'')+'" aria-pressed="'+(reviewFilter.kind===id)+'">'+t+'</button>')
    .join('');

  // Thống kê đầu trang
  const statBar = total
    ? '<div class="pillrow" style="margin:6px 0 18px"><span class="small-kicker" style="margin-right:6px">SỔ ÔN</span>'
      +'<span class="pill">'+total+' câu</span>'
      +(wrongs  ? '<span class="pill">'+wrongs+' câu sai</span>' : '')
      +(flags   ? '<span class="pill gold">'+flags+' phân vân</span>' : '')
      +'</div>'
    : '';

  // Nội dung danh sách
  let listHTML;
  if(total === 0){
    listHTML = '<div class="empty nyan-empty"><img src="./assets/nyan-rest.svg" alt="" width="96" height="96"><div><p><b>Sổ ôn trống.</b></p><p>Khi bạn chọn sai hoặc đánh dấu phân vân, câu đó sẽ được lưu tự động vào đây.</p><a class="btn" href="#catalog">Mở bài tập theo chủ điểm</a></div></div>';
  } else if(filtered.length === 0){
    listHTML = '<div class="empty"><p>Không có câu nào khớp bộ lọc hiện tại.</p><button class="soft" type="button" data-act="rv-reset">Xóa bộ lọc</button></div>';
  } else {
    listHTML = '<div class="retry-list">'+filtered.map(reviewEntryHTML).join('')+'</div>'
      +'<div class="actions" style="margin-top:16px">'
      +'<a class="btn" href="#review/retake">'+ic('layers')+' Luyện lại '+filtered.length+' câu</a>'
      +'</div>';
  }

  main.innerHTML = pageHead('Part 5','Sổ ôn tập')
    + statBar
    + '<div class="tabs" aria-label="Lọc theo chặng">'+stageTabs+'</div>'
    + '<div class="tabs" aria-label="Lọc theo trạng thái" style="margin-top:-11px">'+kindTabs+'</div>'
    + listHTML;
}

// ── Luyện lại câu sai / phân vân ─────────────────────────────────
function retakeFilteredIds(){
  // Lấy danh sách câu theo bộ lọc hiện tại của sổ ôn
  return savedKeys().filter(id=>{
    const item = qMap.get(id);
    if(!item) return false;
    const isMock = id.startsWith('mock:');
    const stageMatch = reviewFilter.stage === 'all'
      || (reviewFilter.stage === 'mock' ? isMock : reviewFilter.stage==='adaptive'?(id.startsWith('v8:')||id.startsWith('v9:')):(!isMock && item.lesson?.stage === reviewFilter.stage));
    const kindMatch = reviewFilter.kind === 'all'
      || (reviewFilter.kind === 'wrong' ? state.saved[id]?.wrong : state.saved[id]?.flag);
    return stageMatch && kindMatch;
  });
}

function retake(){
  drawNav('review','Luyện lại');

  // Khởi tạo hoặc khôi phục phiên luyện
  if(!state.retake || !state.retake.ids || state.retake.ids.length === 0){
    const ids = retakeFilteredIds();
    if(ids.length === 0){
      main.innerHTML = pageHead('Luyện lại','Không có câu nào để luyện')
        +'<div class="empty"><p>Sổ ôn trống hoặc bộ lọc không có câu phù hợp.</p><a class="btn" href="#review">Quay lại sổ ôn</a></div>';
      return;
    }
    state.retake = {ids, pos:0, results:{}};
    save();
  }

  const {ids, pos, results} = state.retake;
  const total = ids.length;

  // Màn hình tổng kết
  if(pos >= total){
    const correct = ids.filter(id=>results[id]===true).length;
    const pct = Math.round(100*correct/total);
    const summary = ids.map((id,i)=>{
      const item = qMap.get(id); if(!item) return '';
      const ok = results[id];
      const isMock = id.startsWith('mock:');
      const src = isMock ? 'Đề tổng hợp · câu '+(Number(id.split(':')[1])+1) : (item.lesson?.title|| (item.topic?'Luyện cá nhân · '+item.topic:''));
      return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--line)">'
        +ic(ok?'done':'cross')+'<span style="flex:1;font-size:.9rem">'+esc(src)+'</span>'
        +(ok?'<span class="pill" style="font-size:.75rem">Đúng</span>':'<span class="pill" style="background:#fbe8e3;color:#8c4f3c;font-size:.75rem">Sai</span>')
        +'</div>';
    }).join('');

    main.innerHTML = pageHead('Luyện lại','Kết quả luyện lại')
      +'<div class="panel" style="max-width:640px">'
      +'<div style="text-align:center;padding:12px 0 18px">'
      +'<div style="font:normal 3.2rem/1 Georgia,serif;color:var(--forest)">'+correct+'<small style="font-size:1.4rem;color:var(--muted)">/'+total+'</small></div>'
      +'<p style="margin:6px 0 0;color:var(--muted)">câu đúng · '+pct+'%</p></div>'
      +'<div>'+summary+'</div>'
      +'<div class="actions" style="margin-top:18px">'
      +'<a class="btn" href="#review">'+ic('bookmark')+' Về sổ ôn</a>'
      +makeBtn('rt-restart',ic('layers')+' Luyện lại','outline')
      +'</div></div>';
    return;
  }

  const id = ids[pos];
  const item = qMap.get(id);
  if(!item){
    // Câu không còn tồn tại — bỏ qua
    state.retake.pos++;
    save();
    retake();
    return;
  }
  const q = item.q;
  const answered = state.retake.results.hasOwnProperty(id);
  const choice = answered ? state.retake.results[id+'_choice'] : undefined;
  const reveal = answered;

  // Thanh tiến độ
  const done = ids.filter(id=>Object.hasOwn(results,id)).length;
  const pctBar = Math.round(100*done/total);
  const isMock = id.startsWith('mock:');
  const sourceLabel = isMock
    ? 'Đề tổng hợp · câu '+(Number(id.split(':')[1])+1)
    : (item.lesson?.title||(item.topic?'Luyện cá nhân · '+item.topic:''));

  // Kiểm tra cần hỏi "đã nắm vững" không
  // (đúng + có flag → hiện nút xác nhận)
  const justCorrect = answered && results[id] === true;
  const hasFlag = state.saved[id]?.flag;
  const showMasterBtn = justCorrect && hasFlag;

  // Nút điều hướng
  const navBtns = '<div class="actions" style="margin-top:14px">'
    +(pos > 0 ? makeBtn('rt-prev',ic('back')+' Câu trước','outline') : '')
    +(answered
      ? (showMasterBtn
          ? makeBtn('rt-master',ic('done')+' Đã nắm vững, xóa khỏi sổ','soft')+'&nbsp;'+makeBtn('rt-keep',ic('bookmark')+' Giữ lại trong sổ','outline')
          : makeBtn('rt-next',(pos<total-1?'Câu tiếp theo '+ic('right'):'Xem kết quả '+ic('right')),'btn'))
      : '')
    +'</div>';

  const qHTML = questionHTML(id, 'retake', {
    reveal,
    marked: state.saved[id]?.flag,
    choice: Number.isInteger(choice) ? choice : undefined,
    label: sourceLabel
  });

  main.innerHTML = '<div class="lessonframe">'
    +back('review','Sổ ôn tập')
    +'<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px">'
    +'<span class="small-kicker">Câu '+(pos+1)+' / '+total+'</span>'
    +'<div class="bar" role="progressbar" aria-label="Tiến độ luyện lại" aria-valuenow="'+done+'" aria-valuemax="'+total+'" style="flex:1;max-width:260px"><i style="width:'+pctBar+'%"></i></div>'
    +'</div>'
    + qHTML
    + navBtns
    +'</div>';
}

// GĐ5D/GĐ5E: practice tests 1–12; persisted choices use stable question IDs.
const validChoice = x => Number.isInteger(x) && x>=0 && x<4;
const examCount = e => e.ids.filter(id=>validChoice(e.answers[id])).length;
const flagCount = e => e.ids.filter(id=>e.flags[id]===true).length;
function bestScoreForTest(testId){
  const scores=state.history.filter(h=>h.testId===testId&&h.revision===examRevision).map(h=>h.score);
  return scores.length?Math.max(...scores):null;
}
function newExam(testIndex=0){
  const selected=mockTests[testIndex] || mockTests[0];
  state.exam={id:globalThis.crypto?.randomUUID?.() || Date.now()+'-'+Math.random().toString(36).slice(2),testId:selected.id,revision:examRevision,pos:0,ids:[...selected.ids],seen:Object.fromEntries(selected.ids.map(id=>[id,validChoice(state.attempts[id])||validChoice(state.exposure[id])||Object.hasOwn(state.mockLatest,id)||Boolean(state.presented[id])])),answers:{},flags:{},startedAt:Date.now(),timeById:{},targetMinutes:v9State().examMinutes,submitted:false};
  save(); examScreen();
}
function examHistory(){
  if(!state.history.length)return '';
  return '<section class="panel exam-history"><h2>Lịch sử luyện đề</h2><p class="muted">Theo dõi điểm từng test 30 câu.</p>'+state.history.slice().reverse().map(h=>'<div class="statrow"><span>'+esc(examTitle(h))+' · '+esc(new Date(h.finishedAt).toLocaleString('vi-VN'))+'</span><b>'+esc(h.score)+'/30 · '+esc(formatDuration(h.duration))+'</b>'+(state.reports[h.id]?'<a class="textlink" href="#insights/'+esc(h.id)+'">Báo cáo</a>':'')+'</div>').join('')+'</section>';
}
function formatDuration(ms){const sec=Math.max(0,Math.floor((Number(ms)||0)/1000));return Math.floor(sec/60)+' phút '+String(sec%60).padStart(2,'0')+' giây';}
function examRules(compact=false){
  return '<section class="panel test-rules" aria-label="Quy chế luyện Test"><div class="eyebrow">Luyện sự quyết đoán</div><h2>Quy chế làm Test</h2><p>Hãy đưa ra lựa chọn tốt nhất dựa trên kiến thức của bạn. Nếu chưa chắc chắn, chọn đáp án rồi đánh dấu phân vân để ôn lại sau. Đừng bỏ qua câu hỏi chỉ vì chưa chắc.</p><ol><li><b>Chọn một đáp án A–D trước khi chuyển câu.</b> Không được nhảy qua câu chưa trả lời, kể cả dùng bảng số câu.</li><li>Đánh dấu phân vân không thay đổi điểm: chọn đúng vẫn được 1 điểm; chọn sai vẫn tính sai.</li><li>Có thể quay lại câu đã làm và đổi đáp án trước khi nộp. Không hiện lời giải trong khi làm bài.</li><li>Trả lời đủ 30 câu mới nộp bài; sau đó xem báo cáo từng câu và mở kiến thức cần ôn.</li></ol><p class="muted tiny">Mục tiêu thời gian gợi ý: 10–12 phút/30 câu, điều chỉnh theo năng lực. Đây là quy chế luyện tập riêng của NYAN TOEIC, không phải quy chế thi ETS chính thức. '+(compact?'Tiến độ được lưu tự động.':'Kết quả được lưu riêng theo hồ sơ hiện tại.')+'</p></section>';
}
function firstUnanswered(e){const i=e.ids.findIndex(id=>!validChoice(e.answers[id]));return i<0?e.ids.length:i;}
function canMoveExam(e,n){return Number.isInteger(n)&&n>=0&&n<e.ids.length&&(n===e.pos||(validChoice(e.answers[e.ids[e.pos]])&&(n<e.pos||n<=firstUnanswered(e))));}
function examNavigationHint(e){return validChoice(e.answers[e.ids[e.pos]])?'Có thể chuyển câu; dấu phân vân không ảnh hưởng điểm.':'Hãy chọn một đáp án A–D để mở khóa chuyển câu.';}
function testPicker(){
  return '<section class="test-picker-wrap"><div class="pagehead compact"><div class="eyebrow">Luyện đề tổng hợp</div><h2>Chọn một test để bắt đầu</h2><p>Bộ hiện tại có 360 câu hoạt động: 10 đề trước được giữ nguyên, bổ sung Test 11–12 với 60 câu tự biên soạn. Không lặp nguyên văn giữa các đề. Kết quả bộ đề cũ trước V8 được lưu riêng. Quy chế luyện tập được trình bày phía trên. Tiến độ tự lưu trên trình duyệt.</p></div><div class="test-picker">'+mockTests.map(test=>{const attempts=state.history.filter(h=>h.testId===test.id&&h.revision===examRevision); const best=bestScoreForTest(test.id); const last=attempts.at(-1); return '<article class="panel test-card"><div class="inline-between"><div><div class="small-kicker">Test '+(test.id+1)+'</div><h3>'+esc(test.title)+'</h3></div><span class="pill gold">30 câu</span></div><p class="muted">'+esc(test.focus)+'</p><div class="statrow"><span>Đã làm</span><b>'+attempts.length+' lần</b></div><div class="statrow"><span>Điểm cao nhất</span><b>'+(best===null?'Chưa có':best+'/30')+'</b></div><div class="statrow"><span>Lần gần nhất</span><b>'+(last?last.score+'/30':'—')+'</b></div><div class="actions"><button class="btn" type="button" data-act="exam-start" data-i="'+test.id+'">Bắt đầu Test '+(test.id+1)+'</button></div></article>'; }).join('')+'</div></section>';
}
function examScreen(listOnly=false){
  drawNav('exam','Luyện đề · Test 1–12');
  const e=state.exam;
  const head=pageHead('Part 5 · Test 1–12','Luyện đề 30 câu','12 test tổng hợp · 360 câu riêng biệt. Không phải đề ETS chính thức. Điểm số chỉ phản ánh mức độ chính xác trên bộ câu của NYAN TOEIC, không quy đổi trực tiếp sang điểm TOEIC chính thức.');
  if(!e||listOnly){main.innerHTML=head+(e&&!e.submitted?'<div class="panel"><a class="btn" href="#exam">Tiếp tục đề đang làm</a></div>':'')+examRules()+v9ExamSettings()+testPicker()+examHistory();return;}
  if(e.submitted){examResult(head,e);return;}
  const first=firstUnanswered(e);if(e.pos>first){e.pos=first;save();}
  const selectedTest=e.revision===examRevision?mockTests[e.testId]:{title:'Đề cũ',focus:'Phiên bản trước V8'};
  const total=e.ids.length;
  const count=examCount(e),flags=flagCount(e),pos=e.pos,id=e.ids[pos];
  if(!state.presented[id]){state.presented[id]=true;save();}
  main.innerHTML=head+'<div class="exam-grid"><section>'+v9ExamClock(e)+'<div class="exam-status"><span><b>'+esc(examTitle(e))+'</b> · '+esc(selectedTest.focus||'Tổng hợp 30 câu')+'</span><span><b>'+count+'/'+total+'</b> đã trả lời · '+flags+' phân vân</span></div><div class="bar" role="progressbar" aria-label="Tiến độ làm đề" aria-valuenow="'+count+'" aria-valuemin="0" aria-valuemax="'+total+'"><i style="width:'+count/total*100+'%"></i></div>'+questionHTML(id,'exam',{choice:e.answers[id],marked:e.flags[id],label:examTitle(e)+' · Câu '+(pos+1)+' / '+total})+'<div class="actions exam-actions">'+makeBtn('exam-prev',ic('back')+' Câu trước','outline',!canMoveExam(e,pos-1)?'disabled':'')+makeBtn('exam-next','Câu tiếp '+ic('right'),'btn',!canMoveExam(e,pos+1)?'disabled':'')+'</div><p class="exam-hint" role="status">'+esc(examNavigationHint(e))+'</p></section><aside class="panel exam-nav"><h2>Điều hướng câu hỏi</h2><div class="jump" aria-label="Chuyển câu">'+e.ids.map((q,i)=>makeBtn('exam-jump',String(i+1)+(e.flags[q]?' <span aria-hidden="true">⚑</span>':''),(validChoice(e.answers[q])?'answered ':'')+(e.flags[q]?'flagged ':'')+(i===pos?'here':''),'data-i="'+i+'" aria-label="Câu '+(i+1)+', '+(validChoice(e.answers[q])?'đã trả lời':'chưa trả lời')+(e.flags[q]?', phân vân':'')+'" '+(i===pos?'aria-current="step"':'')+(!canMoveExam(e,i)?' disabled':''))).join('')+'</div><p class="exam-legend">✓ Nền xanh: đã trả lời · ⚑ phân vân · viền đậm: câu hiện tại</p>'+makeBtn('exam-submit','Nộp bài','btn exam-submit',count<total?'disabled':'')+'<p class="muted tiny">Chỉ nộp khi đủ 30 đáp án. Bài làm tự lưu; bạn có thể quay lại sau.</p>'+makeBtn('exam-reset','Hủy bài đang làm','outline exam-submit')+'<a class="textlink" href="#exam/list">Quay lại danh sách Test 1–12</a><details class="exam-rules-inline"><summary>Xem lại quy chế</summary>'+examRules(true)+'</details></aside></div>';
}
function submitExam(){
  const e=state.exam;if(!e||e.submitted)return;
  const count=examCount(e);
  const total=e.ids.length;
  if(count<total){say('Cần trả lời đủ '+total+' câu trước khi nộp.');e.pos=firstUnanswered(e);save();examScreen();return;}
  if(!window.confirm('Bạn muốn nộp bài và xem báo cáo chi tiết?'))return;
  const score=e.ids.filter((id)=>e.answers[id]===qMap.get(id)?.q.answer).length;
  const finishedAt=Date.now();
  e.submitted=true;e.score=score;e.finishedAt=finishedAt;e.duration=Math.max(0,finishedAt-e.startedAt);
  for(const id of e.ids){
    const item=qMap.get(id); if(!item) continue;
    const choice=validChoice(e.answers[id])?e.answers[id]:null;
    if(validChoice(choice)&&!validChoice(state.exposure[id]))state.exposure[id]=choice;
    state.mockLatest[id]=choice;
    state.reviewLatest[id]=choice;
    updateSavedQuestion(id,{wrong:choice!==item.q.answer,flag:Boolean(state.saved[id]?.flag||e.flags[id])});
  }
  storeExamReport(e);
  if(!state.history.some(h=>h.id===e.id))state.history.push({id:e.id,testId:e.testId,revision:e.revision||"legacy",score,answered:count,flags:flagCount(e),finishedAt,duration:e.duration});
  nyanAward('exam:'+e.id,'Hoàn thành '+examTitle(e));
  resultFilter='needs';save();examScreen();main.focus({preventScroll:true});window.scrollTo(0,0);say('Đã nộp '+examTitle(e)+'. '+score+' trên '+total+' câu đúng.');
}
let resultFilter='needs';
function examResult(head,e){
  const report=storeExamReport(e);
  main.innerHTML=head+nyanExamRewardHTML(e.id)+v9TimingHTML(report)+examReportHTML(report)+reportHTML(report)+'<div class="actions"><a class="btn" href="#exam/list">Chọn Test khác</a><a class="outline" href="#review">Mở sổ ôn tập</a></div>'+examHistory();
}
function examReportHTML(r){
  const all=r.items,n=all.length,correct=all.filter(x=>x.choice===x.answer).length,wrong=all.filter(x=>x.choice!==null&&x.choice!==x.answer).length,blank=all.filter(x=>x.choice===null).length,marked=all.filter(x=>x.flag&&x.choice===x.answer).length;
  const views=[['needs','Cần ôn',wrong+blank+marked],['wrong','Sai / bỏ trống',wrong+blank],['flag','Phân vân',all.filter(x=>x.flag).length],['all','Tất cả',n]];
  const visible=all.filter(x=>resultFilter==='all'||(resultFilter==='wrong'?x.choice!==x.answer:resultFilter==='flag'?x.flag:x.choice!==x.answer||x.flag));
  return '<section class="panel exam-report-top"><div class="eyebrow">NYAN Insights · Báo cáo bài làm</div><h2>'+esc(r.title)+' · '+esc(activeProfile.name)+'</h2><div class="exam-report-metrics">'+[['Điểm',correct+'/'+n,'score'],['Sai',wrong,'miss'],['Bỏ trống',blank,''],['Đúng nhưng phân vân',marked,'flag']].map(([t,v,c])=>'<div class="'+c+'"><strong>'+v+'</strong><span>'+t+'</span></div>').join('')+'</div><p class="muted">'+(Number.isFinite(r.duration)?'Thời gian: '+esc(formatDuration(r.duration))+' · ':'')+'Đánh dấu phân vân không cộng hoặc trừ điểm. Câu sai có đánh dấu vẫn tính sai.</p><a class="textlink" href="#insights/'+esc(r.id)+'">Mở báo cáo đã lưu</a></section><section class="exam-review" aria-label="Lời giải từng câu"><h2>Chi tiết từng câu</h2><p class="muted">Xem lựa chọn của bạn, lý do đúng/sai và bài giáo trình cần ôn.</p><div class="tabs report-filters" aria-label="Lọc lời giải">'+views.map(([v,t,count])=>makeBtn('report-filter',t+' ('+count+')','tablink '+(resultFilter===v?'selected':''),'data-report="'+esc(r.id)+'" data-id="'+v+'" aria-pressed="'+(resultFilter===v)+'"')).join('')+'</div><div class="exam-solutions">'+(visible.length?visible.map(x=>examReviewItem(r,x)).join(''):'<div class="empty">Không có câu trong nhóm này. Chọn Tất cả để xem toàn bộ lời giải.</div>')+'</div></section>';
}
function examReviewItem(r,x){
  const item=qMap.get(x.qid);if(!item)return '';const q=item.q,ok=x.choice===x.answer,blank=x.choice===null,needs=!ok||x.flag;
  const choice=validChoice(x.choice)?labels[x.choice]+'. '+q.options[x.choice]:'Chưa chọn';
  return '<article class="panel exam-review-item '+(ok?'review-ok':'review-miss')+'" id="report-q-'+x.num+'" tabindex="-1"><header class="inline-between"><h3>Câu '+x.num+'</h3><div class="pillrow"><span class="review-status '+(ok?'status-ok':'status-miss')+'">'+(ok?'Đúng':blank?'Bỏ trống':'Sai')+'</span>'+(x.flag?'<span class="pill gold">⚑ Phân vân</span>':'')+'</div></header><div class="exam-choice-summary"><div><span>Bạn chọn</span><b class="'+(ok?'status-ok':'status-miss')+'">'+esc(choice)+'</b></div><div><span>Đáp án đúng</span><b class="status-ok">'+esc(labels[x.answer]+'. '+q.options[x.answer])+'</b></div></div>'+v9ItemTiming(r,x)+questionHTML(x.qid,'result',{choice:x.choice,reveal:true,label:'Câu '+x.num,hideRule:true})+(!ok&&!blank?'<div class="chosen-explanation"><b>Vì sao đáp án bạn chọn không phù hợp?</b><p>'+esc(q.explain[x.choice])+'</p></div>':'')+(needs?'<div class="exam-study-links"><b>Kiến thức cần ôn cho câu này</b>'+ruleLink(x.qid,r.id,x.num)+vuRelated(x.qid)+'</div>':'')+'</article>';
}
function ruleRef(id){
 const item=qMap.get(id);if(!item)return null;
 if(item.topic)return {topic:item.topic,lesson:null,rule:null,n:null};
 const ref=item.lesson?[item.lesson.id,window.nyanRuleMap[item.lesson.id]?.[item.i]]:window.nyanMockMap[item.i];
 const lesson=lessonById.get(ref?.[0]);const rule=lesson?.rules[ref?.[1]-1];
 const topic=item.lesson?book.questionMap[item.lesson.id]?.[item.i]:book.mockMap[item.i];
 return rule?{lesson,rule,n:ref[1],topic:topic||mappedTopic(lesson.id,ref[1]),related:!item.lesson&&item.i<30}:null;
}
function ruleLink(id,reportId='',questionNum=null){
 const r=ruleRef(id);if(!r)return '';
 const t=topicsById.get(r.topic);if(!t)return '';
 return '<a class="rule-link" href="#textbook/'+t.id+(reportId?'/report/'+esc(reportId)+(questionNum?'/'+questionNum:''):'')+'">'+ic('book')+esc('Ôn kiến thức: '+t.id+' · '+t.title)+ic('right')+'</a>';
}
function recordReport(id,title,ids,answers,flags,extra={}){
 const report={id,title,finishedAt:Date.now(),items:ids.map((qid,i)=>({qid,num:i+1,choice:validChoice(answers[qid])?answers[qid]:null,flag:Boolean(flags[qid]),answer:qMap.get(qid).q.answer,seenBefore:extra.seen?Boolean(extra.seen[qid]):null})),...extra};delete report.seen;
 state.reports[id]=report;save();return report;
}
function lessonReport(l){const ids=l.questions.slice(1).map((_,i)=>l.id+':'+(i+1));if(!ids.every(id=>validChoice(state.attempts[id])))return null;
 const id='lesson-'+l.id;return state.reports[id]||recordReport(id,l.title+' · Luyện chủ điểm',ids,state.attempts,state.lessonFlags,{type:'lesson'});}
function storeExamReport(e){return state.reports[e.id]||recordReport(e.id,examTitle(e),e.ids,e.answers,e.flags,{type:'exam',revision:e.revision||'legacy',duration:e.duration,timeById:e.timeById||{},seen:e.seen,finishedAt:e.finishedAt||Date.now()});}
function reportHTML(r){
 if(!r||!Array.isArray(r.items))return '';
 const all=r.items,n=all.length,correct=all.filter(x=>x.choice===x.answer),blank=all.filter(x=>x.choice===null),wrong=all.filter(x=>x.choice!==null&&x.choice!==x.answer),uncertain=correct.filter(x=>x.flag),groups=new Map();
 for(const x of all){const ref=ruleRef(x.qid);if(!ref)continue;const k=ref.topic;if(!groups.has(k))groups.set(k,{ref,items:[]});groups.get(k).items.push(x);}
 const exposureSummary=r.type==='exam'&&all.some(x=>x.seenBefore!==null)?'<div class="exposure-summary"><b>Đánh giá câu chưa từng ghi nhận</b><p>'+all.filter(x=>x.seenBefore===false&&x.choice===x.answer).length+'/'+all.filter(x=>x.seenBefore===false).length+' đúng · '+all.filter(x=>x.seenBefore===true&&x.choice===x.answer).length+'/'+all.filter(x=>x.seenBefore===true).length+' đúng ở nhóm đã gặp. Chỉ dựa trên lịch sử lưu tại thiết bị; không đo được việc học ở nguồn khác.</p></div>':'';
 const issues=[...groups.values()].map(g=>({...g,needs:g.items.filter(x=>x.choice!==x.answer||x.flag)})).filter(g=>g.needs.length).sort((a,b)=>b.needs.length-a.needs.length||b.needs.length/b.items.length-a.needs.length/a.items.length);
 return '<section class="insights panel"><div class="insight-head"><div><div class="eyebrow">NYAN Insights · Báo cáo cá nhân</div><h2>'+esc(r.title)+'</h2><p>'+esc(activeProfile.name)+' · '+esc(new Date(r.finishedAt).toLocaleString('vi-VN'))+'</p></div><img src="./assets/nyan-happy.svg" alt="" width="78" height="78"></div><div class="insight-metrics">'+[['Đúng',correct.length+'/'+n],['Sai',wrong.length],['Bỏ trống',blank.length],['Đúng · phân vân',uncertain.length]].map(([label,v])=>'<div><strong>'+esc(v)+'</strong><span>'+label+'</span></div>').join('')+'</div>'+(r.type==='exam'&&Number.isFinite(r.duration)?'<p class="muted">Thời gian từ lúc bắt đầu: '+esc(formatDuration(r.duration))+'</p>':'')+'<p class="muted tiny">Chẩn đoán theo câu đã làm, không suy đoán chắc chắn nguyên nhân. Mẫu ít câu chỉ là tín hiệu để ôn tập. '+(r.type==='exam'?(r.revision===examRevision?'Bộ đề hiện tại không lặp câu nguyên văn giữa các test; câu cũ hoặc lần luyện lại vẫn có thể đã gặp. ':'Kết quả thuộc bộ đề trước V8; không so sánh trực tiếp với bộ mới. ')+(all.some(x=>x.seenBefore!==null)?'Đã gặp trước: '+all.filter(x=>x.seenBefore).length+'/'+n+'.':'Lần làm cũ không có dữ liệu tiếp xúc trước.'):(r.type==='adaptive'?'Báo cáo phiên luyện cá nhân; điểm không quy đổi sang điểm TOEIC.':'Báo cáo dựa trên kết quả luyện chủ điểm được lưu lần đầu.'))+'</p>'+exposureSummary+'<h3>Điểm cần ôn</h3>'+ (issues.length?issues.map(g=>{const {ref,needs,items}=g;return '<article class="issue"><div class="inline-between"><h4>'+esc(ref.topic+' · '+topicsById.get(ref.topic).title)+'</h4><span class="pill gold">'+needs.length+'/'+items.length+' cần ôn</span></div><div class="bar"><i style="width:'+100*items.filter(x=>x.choice===x.answer).length/items.length+'%"></i></div><p class="muted tiny">'+'Bài giáo trình · '+items.length+' câu quan sát</p>'+needs.map(x=>{const q=qMap.get(x.qid).q;return '<details><summary>Câu '+x.num+' · '+(x.choice===null?'Bỏ trống':x.choice===x.answer?'Đúng nhưng phân vân':'Sai · '+labels[x.choice])+ '</summary><p lang="en">'+esc(q.stem)+'</p><p>'+esc(x.choice===null?'Chưa có lựa chọn để phân tích.':q.explain[x.choice])+'</p><p><b>Đáp án:</b> '+esc(q.options[q.answer])+' · '+esc(q.reason)+'</p>'+ruleLink(x.qid,r.id)+vuRelated(x.qid)+'</details>';}).join('')+ruleLink(needs[0].qid,r.id)+makeBtn('adaptive-start','Luyện theo bài · ưu tiên câu mới','btn','data-id="'+esc(ref.topic)+'"')+makeBtn('insight-practice','Luyện lại '+needs.length+' câu','outline','data-report="'+esc(r.id)+'" data-rule="'+esc(ref.topic)+'"')+'</article>';}).join(''):'<p>Không có câu sai, bỏ trống hoặc phân vân trong lần làm này. Tiếp tục kiểm tra bằng câu mới.</p>')+'<div class="actions"><a class="outline" href="#insights">Lịch sử báo cáo</a><a class="btn" href="#review">Ôn lại câu đã lưu</a></div></section>';
}
function skillDashboard(reports){
 const latest=new Map();
 for(const r of reports.slice().sort((a,b)=>a.finishedAt-b.finishedAt))for(const x of r.items||[])if(qMap.has(x.qid))latest.set(x.qid,x);
 const groups=new Map();
 for(const x of latest.values()){const ref=ruleRef(x.qid);if(!ref)continue;const g=groups.get(ref.topic)||{topic:topicsById.get(ref.topic),items:[]};g.items.push(x);groups.set(ref.topic,g);}
 if(!latest.size)return '';
 const sorted=[...groups.values()].sort((a,b)=>{const rate=g=>g.items.filter(x=>x.choice!==x.answer||x.flag).length/g.items.length;return rate(b)-rate(a)||b.items.length-a.items.length;});
 return '<section class="panel skill-dashboard"><div class="eyebrow">Hồ sơ năng lực</div><h2>Điểm cần cải thiện qua các báo cáo</h2><p>'+latest.size+' câu khác nhau · dùng kết quả báo cáo gần nhất của mỗi câu, không tính lặp nhiều lần. Không phải đánh giá toàn bộ năng lực TOEIC.</p><div class="skill-grid">'+sorted.map(g=>{const n=g.items.length,ok=g.items.filter(x=>x.choice===x.answer).length,need=g.items.filter(x=>x.choice!==x.answer||x.flag).length;return '<article class="skill-card"><h3>'+esc(g.topic.id+' · '+g.topic.title)+'</h3><div class="statrow"><span>Đúng '+ok+'/'+n+'</span><b>'+need+' cần ôn</b></div><div class="bar"><i style="width:'+100*ok/n+'%"></i></div><p class="muted tiny">'+(n<3?'Ít dữ liệu · chưa đủ kết luận':need===0?'Chưa thấy lỗi trong mẫu này':'Ưu tiên ôn theo câu đã gặp')+'</p><a class="textlink" href="'+'#textbook/'+g.topic.id+'">Mở lý thuyết</a></article>';}).join('')+'</div></section>';
}
function insightsScreen(id,questionNum=null){drawNav('insights','Lịch sử & báo cáo bài làm');if(id&&state.reports[id]){const r=state.reports[id];if(questionNum&&['exam','adaptive'].includes(r.type)&&!r.items.some(x=>x.num===Number(questionNum)&&(x.choice!==x.answer||x.flag)))resultFilter='all';else if(questionNum)resultFilter='needs';main.innerHTML=pageHead('Hồ sơ cá nhân','Báo cáo chi tiết')+v9TimingHTML(r)+(['exam','adaptive'].includes(r.type)?examReportHTML(r):'')+adaptiveComparison(r)+reportHTML(r);if(questionNum)requestAnimationFrame(()=>{const q=document.getElementById('report-q-'+Number(questionNum));q?.scrollIntoView({block:'start'});q?.focus({preventScroll:true});});return;}
 const reports=Object.values(state.reports).sort((a,b)=>b.finishedAt-a.finishedAt);main.innerHTML=pageHead('Hồ sơ cá nhân','Lịch sử & báo cáo bài làm','Lịch sử của '+activeProfile.name+' trên trình duyệt này.')+'<p><a class="outline" href="#results">Xem tiến độ & năng lực</a></p>'+(reports.length?'<div class="panel report-list">'+reports.map(r=>'<a class="lesson-link" href="#insights/'+esc(r.id)+'"><span>'+esc(r.title)+'<br><small class="muted">'+esc(new Date(r.finishedAt).toLocaleString('vi-VN'))+'</small></span><b>'+r.items.filter(x=>x.choice===x.answer).length+'/'+r.items.length+'</b>'+ic('right')+'</a>').join('')+'</div>':'<div class="empty">Chưa có báo cáo. Hoàn thành 10 câu luyện chủ điểm hoặc nộp một test để xem phân tích.</div>');}
function accountWarnings(){return '<aside class="account-warnings"><h3>Lưu ý trước khi sử dụng</h3><ul><li>Tài khoản và tiến độ chỉ lưu trên trình duyệt và địa chỉ website hiện tại. Không tự đồng bộ sang thiết bị, trình duyệt hoặc địa chỉ khác.</li><li>Xóa dữ liệu trình duyệt, dùng chế độ ẩn danh hoặc cài lại trình duyệt có thể làm mất tài khoản và tiến độ.</li><li>Có thể đặt lại mật khẩu người học chỉ bằng tên đăng nhập, không xác minh danh tính. Bất kỳ ai dùng cùng trình duyệt và biết tên đăng nhập đều có thể đổi mật khẩu. Không dùng mật khẩu quan trọng hoặc lưu dữ liệu nhạy cảm.</li><li>Đây là tài khoản cục bộ, chỉ giúp tách hồ sơ khi sử dụng thông thường. Người có quyền truy cập thiết bị hoặc công cụ trình duyệt vẫn có thể xem hoặc sửa dữ liệu.</li><li>Nếu dùng chung máy, hãy đăng xuất sau khi học. Chưa có chức năng sao lưu, xuất hoặc nhập dữ liệu.</li></ul></aside>';}
function profilesScreen(mode='login'){
 drawNav('profiles','Tài khoản');
 if(activeProfile.id!=='default'){
  main.innerHTML='<div class="account-layout"><section class="panel account-panel"><img class="account-cat" src="./assets/nyan-happy.svg" alt="" width="96" height="96"><div class="eyebrow">NYAN LOCAL ACCOUNT</div><h1>Xin chào, '+esc(activeProfile.name)+'!</h1><p>Tiến độ, sổ ôn tập và báo cáo được lưu riêng cho tài khoản này.</p><div class="actions"><a class="btn" href="#home">Tiếp tục học</a><button class="outline" id="account-logout">Đăng xuất</button></div></section>'+accountWarnings()+'</div>';
  main.querySelector('#account-logout').onclick=()=>{try{save();platform.logout();location.hash='profiles';location.reload();}catch{say('Không thể đăng xuất.');}};return;
 }
 if(mode==='recover'){recoverScreen();return;}
 const register=mode==='register',old=platform.legacyProfiles();
 main.innerHTML='<div class="account-layout"><section class="panel account-panel"><div class="account-intro"><img class="account-cat" src="./assets/nyan-study.svg" alt="" width="108" height="108"><div><div class="eyebrow">NYAN TOEIC · HỌC CÙNG NYAN</div><h1>'+(register?'Tạo tài khoản':'Chào mừng trở lại!')+'</h1><p>'+(register?'Tạo hồ sơ riêng ngay trên thiết bị này.':'Đăng nhập để tiếp tục hành trình học của bạn.')+'</p></div></div><nav class="tabs" aria-label="Tài khoản"><a class="tablink '+(!register?'selected':'')+'" href="#profiles/login">Đăng nhập</a><a class="tablink '+(register?'selected':'')+'" href="#profiles/register">Đăng ký</a></nav><form id="account-form" class="account-form"><label for="account-user">Tên đăng nhập</label><input id="account-user" autocomplete="username" maxlength="30" required placeholder="Ví dụ: nyan123" autocapitalize="none" spellcheck="false"><label for="account-pass">Mật khẩu</label><div class="password-wrap"><input id="account-pass" type="password" autocomplete="'+(register?'new-password':'current-password')+'" required maxlength="128" '+(register?'minlength="8"':'')+'><button type="button" id="password-toggle" class="outline" aria-pressed="false">Hiện</button></div>'+(register?'<p class="muted tiny">Tên 3–30 ký tự không dấu, không phân biệt chữ hoa/thường; không được trùng trên trình duyệt này. Mật khẩu ít nhất 8 ký tự.</p><label for="account-confirm">Nhập lại mật khẩu</label><input type="password" id="account-confirm" autocomplete="new-password" minlength="8" maxlength="128" required><label for="legacy-profile">Dữ liệu học hiện có (không bắt buộc)</label><select id="legacy-profile"><option value="">Bắt đầu hồ sơ mới</option><option value="default">Giữ bản sao tiến độ khách hiện tại</option>'+old.map(p=>'<option value="'+esc(p.id)+'">Dùng hồ sơ V4: '+esc(p.name)+'</option>').join('')+'</select><p class="muted tiny">Chỉ chọn hồ sơ cũ nếu đó là dữ liệu của bạn. Hồ sơ V4 chưa có mật khẩu.</p>':'')+'<button class="btn" type="submit">'+(register?'Tạo tài khoản':'Đăng nhập')+'</button><p id="account-error" class="account-error" role="alert"></p></form>'+(!register?'<a class="textlink" href="#profiles/recover">Quên mật khẩu?</a>':'')+'<a class="account-guest" href="#home">Tiếp tục với tư cách khách '+ic('right')+'</a><p class="muted tiny">Miễn phí · Không cần email · Không kết nối máy chủ tài khoản</p></section>'+accountWarnings()+'</div>';
 const pass=main.querySelector('#account-pass'),toggle=main.querySelector('#password-toggle');toggle.onclick=()=>{const show=pass.type==='password';pass.type=show?'text':'password';toggle.textContent=show?'Ẩn':'Hiện';toggle.setAttribute('aria-pressed',String(show));};
 const form=main.querySelector('#account-form');form.onsubmit=async e=>{e.preventDefault();const submit=form.querySelector('[type=submit]'),err=form.querySelector('#account-error');err.textContent='';if(register&&pass.value!==form.querySelector('#account-confirm').value){err.textContent='Hai mật khẩu không khớp.';return;}submit.disabled=true;submit.textContent='Đang xử lý…';try{save();const name=form.querySelector('#account-user').value;if(register)await platform.register(name,pass.value,form.querySelector('#legacy-profile').value);else await platform.login(name,pass.value);location.hash=!register&&name.trim().toLowerCase()==='admin'?'admin':'home';location.reload();}catch(e){err.textContent=e.message||'Không thể xử lý tài khoản.';submit.disabled=false;submit.textContent=register?'Tạo tài khoản':'Đăng nhập';}};
}

function recoverScreen(){
 main.innerHTML='<div class="account-layout"><section class="panel account-panel"><div class="account-intro"><img class="account-cat" src="./assets/nyan-study.svg" alt="" width="96" height="96"><div><div class="eyebrow">NYAN LOCAL ACCOUNT</div><h1>Quên mật khẩu?</h1><p>Đặt mật khẩu mới cho hồ sơ người học đã lưu trên trình duyệt này.</p></div></div><form id="recover-form" class="account-form"><label for="recover-user">Tên đăng nhập</label><input id="recover-user" autocomplete="username" maxlength="30" required autocapitalize="none" spellcheck="false"><label for="recover-pass">Mật khẩu mới</label><div class="password-wrap"><input id="recover-pass" type="password" autocomplete="new-password" required minlength="8" maxlength="128"><button type="button" id="recover-toggle" class="outline" aria-pressed="false">Hiện</button></div><label for="recover-confirm">Nhập lại mật khẩu mới</label><input id="recover-confirm" type="password" autocomplete="new-password" required minlength="8" maxlength="128"><p class="muted tiny">Không xác minh danh tính. Chỉ thực hiện với tài khoản của bạn. Admin không hỗ trợ cách khôi phục này. Tiến độ học không bị xóa.</p><button class="btn" type="submit">Đặt lại mật khẩu</button><p id="recover-error" class="account-error" role="alert"></p></form><a class="textlink" href="#profiles/login">Quay lại đăng nhập</a></section>'+accountWarnings()+'</div>';
 const form=main.querySelector('#recover-form'),pass=form.querySelector('#recover-pass'),toggle=form.querySelector('#recover-toggle');
 toggle.onclick=()=>{const show=pass.type==='password';pass.type=show?'text':'password';toggle.textContent=show?'Ẩn':'Hiện';toggle.setAttribute('aria-pressed',String(show));};
 form.onsubmit=async e=>{e.preventDefault();const submit=form.querySelector('[type=submit]'),err=form.querySelector('#recover-error');err.textContent='';if(pass.value!==form.querySelector('#recover-confirm').value){err.textContent='Hai mật khẩu không khớp.';return;}if(!confirm('Bạn đang đặt lại mật khẩu cho tài khoản của mình trên trình duyệt này?'))return;submit.disabled=true;submit.textContent='Đang xử lý…';try{await platform.recoverPassword(form.querySelector('#recover-user').value,pass.value);form.reset();const panel=form.closest('section');panel.innerHTML='<div class="eyebrow">NYAN LOCAL ACCOUNT</div><h1>Đã đổi mật khẩu!</h1><p>Tiến độ học tập vẫn được giữ nguyên. Hãy đăng nhập bằng mật khẩu mới.</p><a class="btn" href="#profiles/login">Đăng nhập</a>'; }catch(e){err.textContent=e.message||'Không thể đặt lại mật khẩu.';submit.disabled=false;submit.textContent='Đặt lại mật khẩu';}};
}

function adminScreen(){
 drawNav('admin','Quản trị tài khoản');
 if(!platform.isAdmin()){main.innerHTML=pageHead('NYAN TOEIC','Không có quyền quản trị','Chỉ tài khoản Admin cục bộ trên localhost được mở mục này.')+'<a class="btn" href="#profiles">Tài khoản</a>';return;}
 let accounts;try{accounts=platform.listAccounts();}catch(e){main.innerHTML=pageHead('Admin','Không đọc được tài khoản',e.message);return;}
 main.innerHTML=pageHead('NYAN LOCAL ADMIN','Quản trị tài khoản','Chỉ hiển thị tài khoản lưu trong trình duyệt và địa chỉ website này.')+
 '<section class="panel admin-notice"><h2>Phạm vi quản trị</h2><p>Không có máy chủ, không quản trị từ xa. Mật khẩu gốc và mã băm không được hiển thị. Có thể đặt lại mật khẩu; phiên đang mở ở tab khác không tự bị đăng xuất. Không xóa dữ liệu học tập.</p>'+(accounts.some(a=>a.role==='admin'&&a.initialPassword)?'<p><b>Mật khẩu Admin ban đầu rất yếu. Hãy đổi ngay trước khi dùng chung thiết bị.</b></p>':'')+'</section>'+
 '<div class="admin-grid">'+accounts.map(a=>'<article class="panel admin-card"><div class="inline-between"><h2>'+esc(a.name)+'</h2><span class="pill">'+(a.role==='admin'?'Admin':'Free')+'</span></div><p>Tên đăng nhập: '+esc(a.username)+'</p><div class="statrow"><span>Câu đã trả lời</span><b>'+a.attempts+'</b></div><div class="statrow"><span>Lượt làm đề</span><b>'+a.history+'</b></div><div class="statrow"><span>Báo cáo</span><b>'+a.reports+'</b></div><div class="statrow"><span>Câu trong sổ ôn</span><b>'+a.saved+'</b></div>'+(a.unreadable?'<p>Không đọc được tiến độ.</p>':'')+'<details class="admin-reset"><summary>'+ (a.role==='admin'?'Đổi mật khẩu Admin':'Đặt lại mật khẩu')+'</summary><form class="account-form" data-account="'+esc(a.id)+'"><label>Mật khẩu mới<input type="password" name="password" minlength="8" maxlength="128" autocomplete="new-password" required></label><label>Nhập lại mật khẩu<input type="password" name="confirm" minlength="8" maxlength="128" autocomplete="new-password" required></label><button class="btn" type="submit">Lưu mật khẩu mới</button><p class="account-error" role="status"></p></form></details></article>').join('')+'</div>';
 main.querySelectorAll('.admin-reset form').forEach(form=>form.onsubmit=async e=>{e.preventDefault();const msg=form.querySelector('[role=status]'),btn=form.querySelector('button');const password=form.elements.password.value;if(password!==form.elements.confirm.value){msg.textContent='Hai mật khẩu không khớp.';return;}if(!confirm('Đặt lại mật khẩu tài khoản này? Tiến độ học được giữ nguyên.'))return;btn.disabled=true;try{await platform.resetPassword(form.dataset.account,password);form.reset();msg.textContent='Đã cập nhật mật khẩu.';const note=main.querySelector('.admin-notice b');if(form.dataset.account===activeProfile.id&&note)note.remove();}catch(e){msg.textContent=e.message;}finally{btn.disabled=false;}});
}
function renderRoute(){
  const [page='home', id, tab, ruleId, reportId] = location.hash.slice(1).split('/');
  switch(page){
    case '': case 'home': home(); break;
    case 'studio': v9Studio(); break;
    case 'daily': ui91Daily(); break;
    case 'learn': case 'train': case 'revise': case 'results': case 'challenge': case 'due': case 'saved-theory': case 'glossary': case 'guide': case 'cats': case 'settings': ui91Screen(page); break;
    case 'knowledge': v9Knowledge(); break;
    case 'reading-corner': vuReading(); break;
    case 'notebook': vuNotebook(); break;
    case 'vocabulary': v9Vocabulary(id); if(id==='saved') {const c=main.querySelector('#v9-word-saved'); if(c){c.checked=true;c.dispatchEvent(new Event('change'));}} break;
    case 'analyzer': v9Analyzer(); break;
    case 'search': v9Search(); break;
    case 'catalog': textbookCatalog(); break;
    case 'textbook': if(id)textbookTopic(id,{reportId:tab==='report'?ruleId:null,returnNum:tab==='report'?reportId:null});else textbookCatalog(); break;
    case 'adaptive': adaptiveScreen(id); break;
    case 'practice':
      filter=history.state?.filter || 'all';
      query=history.state?.query || '';
      catalog(); break;
    case 'lesson': lesson(id,tab,ruleId,reportId); break;
    case 'profiles': profilesScreen(id); break;
    case 'admin': adminScreen(); break;
    case 'insights': resultFilter='needs';insightsScreen(id,tab==='q'?ruleId:null); break;
    case 'ets': ets(); break;
    case 'exam': examScreen(id==='list'); break;
    case 'review':
      if(id === 'retake'){
        retake();
      } else {
        if(state.retake && state.retake.pos>=state.retake.ids.length){state.retake=null;save();}
        review();
      }
      break;
    default: notFound();
  }
}
function updateSavedQuestion(id, patch){
  const entry = {...state.saved[id], ...patch};
  if(entry.wrong || entry.flag) state.saved[id] = entry;
  else delete state.saved[id];
}
main.addEventListener('click', event => {
  const button = event.target.closest('button[data-act]');
  if(!button) return;
  const action = button.dataset.act;
  queueMicrotask(v9TimingReset);
  if(vuAction(button,action))return;
  if(ui91Action(button,action))return;
  if(v9Action(button,action))return;
  if(adaptiveAction(button,action))return;
  if(action==='book-mark'){const id=button.dataset.id;if(!topicsById.has(id))return;if(state.studiedTopics[id])delete state.studiedTopics[id];else state.studiedTopics[id]=Date.now();save();button.setAttribute('aria-pressed',String(Boolean(state.studiedTopics[id])));button.textContent=state.studiedTopics[id]?'Đã đánh dấu học · bỏ đánh dấu':'Đánh dấu đã học';say('Đã cập nhật tiến độ lý thuyết.');return;}
  if(action==='insight-practice'){const r=state.reports[button.dataset.report];if(!r)return;const ids=r.items.filter(x=>{const ref=ruleRef(x.qid);return ref&&ref.topic===button.dataset.rule&&(x.choice!==x.answer||x.flag);}).map(x=>x.qid);if(!ids.length)return;if(state.retake&&state.retake.pos<state.retake.ids.length&&!confirm('Thay thế phiên luyện lại đang làm?'))return;state.retake={ids,pos:0,results:{}};save();location.hash='review/retake';return;}
  if(action==='report-filter'){if(!['needs','wrong','flag','all'].includes(button.dataset.id))return;const r=state.reports[button.dataset.report];if(!r)return;resultFilter=button.dataset.id;if(location.hash.startsWith('#insights/'))insightsScreen(r.id);else examScreen();main.querySelector('[data-act="report-filter"][data-id="'+resultFilter+'"]')?.focus({preventScroll:true});return;}
  if(action.startsWith('exam-') || button.closest('[data-mode="exam"]')){
    const e=state.exam;
    if(action==='exam-start'){const n=Number(button.dataset.i)||0;if(e&&!e.submitted){if(e.testId===n&&e.revision===examRevision){location.hash='exam';examScreen();return;}if(!confirm('Bắt đầu test khác sẽ thay thế bài đang làm. Tiếp tục?'))return;}resultFilter='needs';newExam(n);if(location.hash!=='#exam')location.hash='exam';window.scrollTo(0,0);return;}
    if(!e||e.submitted)return;
    const id=e.ids[e.pos];
    if(action==='exam-submit'){submitExam();return;}
    if(action==='exam-reset'){if(window.confirm('Hủy bài đang làm? Lịch sử và sổ ôn tập vẫn được giữ.')){state.exam=null;save();examScreen();}return;}
    if(['exam-prev','exam-next','exam-jump'].includes(action)){const n=action==='exam-prev'?e.pos-1:action==='exam-next'?e.pos+1:Number(button.dataset.i);if(!canMoveExam(e,n)){say(examNavigationHint(e));return;}e.pos=n;}
    else if(action==='answer'){const n=Number(button.dataset.i);if(validChoice(n))e.answers[id]=n;}
    else if(action==='flag'){if(e.flags[id])delete e.flags[id];else e.flags[id]=true;}
    else return;
    save();examScreen();
    if(action==='answer')main.querySelector('[data-act="answer"][data-i="'+e.answers[id]+'"]')?.focus({preventScroll:true});
    else if(action==='flag')main.querySelector('[data-act="flag"]')?.focus({preventScroll:true});
    else {main.querySelector('.question')?.scrollIntoView({block:'nearest'});main.querySelector('.question .option')?.focus({preventScroll:true});}
    return;
  }

  if(action === 'filter'){
    filter = button.dataset.id;
    rememberCatalog();
    catalog();
    main.querySelector('button[data-id="'+filter+'"]')?.focus({preventScroll:true});
    return;
  }
  if(action === 'rv-stage'){
    reviewFilter.stage = button.dataset.id;
    review();
    main.querySelector('button[data-act="rv-stage"][data-id="'+reviewFilter.stage+'"]')?.focus({preventScroll:true});
    return;
  }
  if(action === 'rv-kind'){
    reviewFilter.kind = button.dataset.id;
    review();
    main.querySelector('button[data-act="rv-kind"][data-id="'+reviewFilter.kind+'"]')?.focus({preventScroll:true});
    return;
  }
  if(action === 'rv-reset'){
    reviewFilter = {stage:'all', kind:'all'};
    review();
    return;
  }
  if(action === 'remove'){
    const removeId = button.dataset.id;
    if(removeId && state.saved[removeId]){
      delete state.saved[removeId];
      save();
      say('Đã xóa câu khỏi sổ ôn tập.');
      review();
    }
    return;
  }
  if(action === 'rt-restart'){state.retake=null;save();retake();return;}
  if(action === 'rt-prev'){
    if(state.retake && state.retake.pos > 0){
      state.retake.pos--;
      save();
      retake();
    }
    return;
  }
  if(action === 'rt-next'){
    if(state.retake){
      state.retake.pos++;
      save();
      retake();
      window.scrollTo(0,0);
    }
    return;
  }
  if(action === 'rt-master'){
    // Người học xác nhận đã nắm vững — xóa cả flag và wrong
    if(state.retake){
      const curId = state.retake.ids[state.retake.pos];
      if(curId){
        delete state.saved[curId];
        save();
        say('Đã xóa câu khỏi sổ ôn tập.');
        state.retake.pos++;
        save();
        retake();
        window.scrollTo(0,0);
      }
    }
    return;
  }
  if(action === 'rt-keep'){
    // Người học chọn tiếp tục lưu — chỉ chuyển sang câu tiếp
    if(state.retake){
      state.retake.pos++;
      save();
      retake();
      window.scrollTo(0,0);
    }
    return;
  }
  // Xử lý chọn đáp án trong màn hình luyện lại
  const retakeCard = button.closest('[data-question][data-mode="retake"]');
  if(retakeCard && action === 'flag'){
    const rtId=retakeCard.dataset.question;
    updateSavedQuestion(rtId,{flag:!state.saved[rtId]?.flag});
    save(); retake(); main.querySelector('.flag')?.focus({preventScroll:true});
    return;
  }
  if(retakeCard && action === 'answer'){
    const rtId = retakeCard.dataset.question;
    if(!state.retake || state.retake.results.hasOwnProperty(rtId)) return;
    const choice = Number(button.dataset.i);
    const rtItem = qMap.get(rtId);
    if(!rtItem || !validChoice(choice)) return;
    const correct = choice === rtItem.q.answer;
    state.retake.results[rtId] = correct;
    state.retake.results[rtId+'_choice'] = choice;
    state.reviewLatest[rtId]=choice;
    if(correct){
      // Đúng → xóa wrong (nếu có), giữ flag nguyên
      if(state.saved[rtId]?.wrong){
        const entry = {...state.saved[rtId]};
        delete entry.wrong;
        if(entry.flag) state.saved[rtId] = entry;
        else delete state.saved[rtId];
      }
      say(state.saved[rtId]?.flag ? 'Chính xác! Câu có dấu phân vân — bạn có thể xác nhận đã nắm vững.' : 'Chính xác! Đã xóa khỏi sổ ôn.');
    } else {
      // Sai → giữ nguyên trong sổ, cập nhật wrong
      updateSavedQuestion(rtId, {wrong:true});
      say('Chưa đúng. Câu này tiếp tục ở trong sổ ôn.');
    }
    save();
    const anchor = retakeCard.getBoundingClientRect().top;
    retake();
    const replacement = document.getElementById(retakeCard.id);
    if(replacement){
      window.scrollBy(0, replacement.getBoundingClientRect().top - anchor);
      const ft = replacement.querySelector('.feedback h3');
      if(ft){ft.tabIndex=-1; ft.focus({preventScroll:true});}
    }
    return;
  }
  const card = button.closest('[data-question][data-mode="lesson"]');
  if(!card) return;
  const id = card.dataset.question;
  const item = qMap.get(id);
  if(!item || !item.lesson) return;
  if(action === 'answer'){
    if(Number.isInteger(state.attempts[id])) return;
    const choice = Number(button.dataset.i);
    if(!Number.isInteger(choice) || choice < 0 || choice >= item.q.options.length) return;
    state.attempts[id] = choice;
    if(!validChoice(state.exposure[id]))state.exposure[id]=choice;
    state.reviewLatest[id]=choice;
    if(choice !== item.q.answer) updateSavedQuestion(id,{wrong:true});
    say(choice === item.q.answer ? 'Chính xác.' : 'Đã lưu câu sai vào sổ ôn tập.');
  }else if(action === 'flag'){
    updateSavedQuestion(id,{flag:!state.saved[id]?.flag});
    state.lessonFlags[id]=Boolean(state.saved[id]?.flag);
    say(state.saved[id]?.flag ? 'Đã đánh dấu phân vân.' : 'Đã bỏ dấu phân vân.');
  }else return;
  save();
  if(action==='answer' && item.i>0 && item.lesson.questions.slice(1).every((q,i)=>validChoice(state.attempts[item.lesson.id+':'+(i+1)]))){const report=lessonReport(item.lesson);if(report){location.hash='insights/'+report.id;return;}}
  // Keep the viewport anchored to the question while feedback and progress update.
  const anchor = card.getBoundingClientRect().top;
  renderRoute();
  const replacement = document.getElementById(card.id);
  if(replacement){
    window.scrollBy(0,replacement.getBoundingClientRect().top-anchor);
    const focusTarget = replacement.querySelector(action === 'answer' ? '.feedback h3' : '.flag');
    if(focusTarget){
      if(action === 'answer') focusTarget.tabIndex = -1;
      focusTarget.focus({preventScroll:true});
    }
  }
});
function focusRoute(){const el=document.getElementById('book-target');if(el){el.focus({preventScroll:true});el.scrollIntoView({block:'start'});}else window.scrollTo(0,0);}
window.addEventListener('hashchange', () => {
  closeMenu();
  renderRoute();
  main.focus({preventScroll:true});
  focusRoute();
});
save();renderRoute();focusRoute();v9InitPwa();v9InstallTiming();ui91Init();
