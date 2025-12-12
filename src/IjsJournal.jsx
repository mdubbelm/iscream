import React, { useState, useEffect } from 'react';

const FLAVORS = ['Vanille','Chocolade','Aardbei','Pistache','Stracciatella','Citroen','Mango','Kokos','Karamel','Cookie','Hazelnoot','Tiramisu','Yoghurt','Frambozen','Speculoos','Stroopwafel'];

const BADGES = [
  { id: 'first', name: 'Eerste Lik', icon: '🍦', desc: '1 check-in', need: d => d.checkins.length >= 1 },
  { id: 'triple', name: 'Hattrick', icon: '🎯', desc: '3 check-ins', need: d => d.checkins.length >= 3 },
  { id: 'ten', name: 'Liefhebber', icon: '💕', desc: '10 check-ins', need: d => d.checkins.length >= 10 },
  { id: 'summer', name: 'Zomerliefde', icon: '☀️', desc: '20 check-ins', need: d => d.checkins.length >= 20 },
  { id: 'explorer', name: 'Ontdekker', icon: '🗺️', desc: '5 ijszaken bezocht', need: d => new Set(d.checkins.map(c=>c.sid)).size >= 5 },
  { id: 'taster', name: 'Proever', icon: '👅', desc: '10 smaken geprobeerd', need: d => new Set(d.checkins.flatMap(c=>c.fl)).size >= 10 },
  { id: 'vegan', name: 'Plantaardig', icon: '🌱', desc: '5 vegan ijsjes', need: d => d.checkins.filter(c=>c.vg).length >= 5 },
  { id: 'fan', name: 'Superfan', icon: '⭐', desc: 'Geef een 5-ster rating', need: d => d.checkins.some(c=>c.rt===5) },
];

export default function IjsJournal() {
  const [view, setView] = useState('home');
  const [data, setData] = useState({ shops: [], checkins: [], wish: [], xfl: [] });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ sid: '', fl: [], rt: 4, nt: '', vg: false, date: new Date().toISOString().split('T')[0] });
  const [shopForm, setShopForm] = useState({ nm: '', ct: '' });
  const [addingShop, setAddingShop] = useState(false);
  const [newFl, setNewFl] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [wishInput, setWishInput] = useState('');

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // For Claude artifacts, use window.storage
        // For standalone app, replace with localStorage or your preferred storage
        if (window.storage) {
          const r = await window.storage.get('ijsjournal');
          if (r?.value) setData(JSON.parse(r.value));
        } else {
          const stored = localStorage.getItem('ijsjournal');
          if (stored) setData(JSON.parse(stored));
        }
      } catch(e) {
        console.log('Starting fresh');
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Save data helper
  const save = async (newData) => {
    setData(newData);
    try {
      if (window.storage) {
        await window.storage.set('ijsjournal', JSON.stringify(newData));
      } else {
        localStorage.setItem('ijsjournal', JSON.stringify(newData));
      }
    } catch(e) {
      console.error('Failed to save:', e);
    }
  };

  // Helper functions
  const allFl = [...FLAVORS, ...data.xfl];
  const fmtDate = iso => new Date(iso).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const getShop = (sid) => data.shops.find(s => s.id === sid);
  const deleteItem = data.checkins.find(c => c.id === deleteId);
  const earned = BADGES.filter(b => b.need(data));

  // Actions
  const addShop = () => {
    if (!shopForm.nm.trim()) return;
    const shop = { id: Date.now()+'', nm: shopForm.nm.trim(), ct: shopForm.ct.trim() };
    save({ ...data, shops: [...data.shops, shop] });
    setForm({ ...form, sid: shop.id });
    setShopForm({ nm: '', ct: '' });
    setAddingShop(false);
  };

  const addFlavor = () => {
    if (!newFl.trim() || allFl.includes(newFl.trim())) return;
    const f = newFl.trim();
    save({ ...data, xfl: [...data.xfl, f] });
    setForm({ ...form, fl: [...form.fl, f] });
    setNewFl('');
  };

  const checkin = () => {
    if (!form.sid || !form.fl.length) return;
    const shop = getShop(form.sid);
    const c = { 
      id: Date.now()+'', 
      sid: form.sid, 
      snm: shop?.nm||'?', 
      fl: form.fl, 
      rt: form.rt, 
      nt: form.nt.trim(), 
      vg: form.vg, 
      dt: form.date 
    };
    const newCheckins = [c, ...data.checkins].sort((a,b) => new Date(b.dt) - new Date(a.dt));
    save({ ...data, checkins: newCheckins });
    setForm({ sid: '', fl: [], rt: 4, nt: '', vg: false, date: new Date().toISOString().split('T')[0] });
    setView('home');
  };

  const confirmDelete = () => {
    save({ ...data, checkins: data.checkins.filter(c => c.id !== deleteId) });
    setDeleteId(null);
  };

  const addWish = (f) => { 
    if (f && !data.wish.includes(f)) save({ ...data, wish: [...data.wish, f] }); 
  };
  
  const delWish = f => save({ ...data, wish: data.wish.filter(x => x !== f) });

  // Styles
  const s = {
    app: { maxWidth: 500, margin: '0 auto', paddingBottom: 100, minHeight: '100vh', background: 'linear-gradient(180deg,#fef6f9,#fdf4eb,#f0fafa)', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', padding: '24px 16px', background: 'linear-gradient(135deg,#FFB5C5,#FFC09F,#A0E7E5)', borderRadius: '0 0 24px 24px' },
    logo: { margin: 0, color: '#fff', fontSize: 28, fontWeight: 700 },
    nav: { display: 'flex', justifyContent: 'space-around', background: '#fff', margin: 12, borderRadius: 16, padding: 4, position: 'sticky', top: 8, zIndex: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    navBtn: { border: 'none', background: 'transparent', borderRadius: 12, padding: 8, fontSize: 20, cursor: 'pointer' },
    navActive: { background: 'linear-gradient(135deg,#FFB5C5,#FFC09F)' },
    main: { padding: '0 16px' },
    card: { background: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.04)' },
    statGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 },
    statBox: { background: '#fff', borderRadius: 12, padding: 12, textAlign: 'center' },
    statNum: { display: 'block', fontSize: 24, fontWeight: 700, color: '#FF8BA7' },
    statLabel: { fontSize: 10, color: '#999', textTransform: 'uppercase' },
    title: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
    label: { display: 'block', fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', marginBottom: 8 },
    input: { width: '100%', padding: 12, border: '2px solid #eee', borderRadius: 12, fontSize: 16, boxSizing: 'border-box', marginBottom: 8 },
    btn: { border: 'none', borderRadius: 12, padding: '12px 20px', fontWeight: 600, cursor: 'pointer' },
    btnPrimary: { background: 'linear-gradient(135deg,#FFB5C5,#FFC09F)', color: '#fff' },
    btnDanger: { background: '#ef4444', color: '#fff' },
    btnGray: { background: '#f3f4f6', color: '#666' },
    tag: { display: 'inline-block', background: '#FFE5EC', color: '#E8A4B8', padding: '4px 10px', borderRadius: 20, fontSize: 12, marginRight: 4, marginBottom: 4 },
    flavorBtn: { border: '2px solid #eee', background: '#fff', borderRadius: 20, padding: '6px 12px', fontSize: 14, marginRight: 4, marginBottom: 4, cursor: 'pointer' },
    flavorActive: { borderColor: '#FFB5C5', background: '#FFF5F7' },
    shopBtn: { border: '2px solid #eee', background: '#fff', borderRadius: 12, padding: 12, textAlign: 'left', cursor: 'pointer', marginBottom: 8 },
    shopActive: { borderColor: '#FFB5C5', background: '#FFF5F7' },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 },
    modalBox: { background: '#fff', borderRadius: 20, padding: 24, maxWidth: 320, width: '100%', textAlign: 'center' },
    badge: { borderRadius: 16, padding: 16, textAlign: 'center' },
    badgeEarned: { background: 'linear-gradient(135deg,#FFE5EC,#FFF0E5)' },
    badgeLocked: { background: '#f3f4f6', opacity: 0.5 },
  };

  // Loading state
  if (loading) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontSize:60}}>
        🍦
      </div>
    );
  }

  return (
    <div style={s.app}>
      
      {/* Delete Confirmation Modal */}
      {deleteId && deleteItem && (
        <div style={s.modal}>
          <div style={s.modalBox}>
            <div style={{fontSize:48,marginBottom:12}}>🗑️</div>
            <h3 style={{margin:'0 0 8px',fontSize:18}}>Verwijderen?</h3>
            <p style={{color:'#666',fontSize:14,margin:'0 0 4px'}}>{deleteItem.snm} - {deleteItem.fl.join(', ')}</p>
            <p style={{color:'#999',fontSize:12,margin:'0 0 20px'}}>{fmtDate(deleteItem.dt)}</p>
            <div style={{display:'flex',gap:12}}>
              <button style={{...s.btn,...s.btnGray,flex:1}} onClick={()=>setDeleteId(null)}>Annuleer</button>
              <button style={{...s.btn,...s.btnDanger,flex:1}} onClick={confirmDelete}>Verwijder</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={s.header}>
        <h1 style={s.logo}>🍦 IjsJournal</h1>
      </header>

      {/* Navigation */}
      <nav style={s.nav}>
        {[['home','🏠'],['checkin','➕'],['history','📖'],['shops','🏪'],['wish','⭐'],['badges','🏆']].map(([v,i])=>(
          <button key={v} onClick={()=>setView(v)} style={{...s.navBtn,...(view===v?s.navActive:{})}}>{i}</button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={s.main}>

        {/* HOME VIEW */}
        {view==='home' && (
          <div>
            <div style={s.statGrid}>
              {[['Check-ins',data.checkins.length],['Zaken',new Set(data.checkins.map(c=>c.sid)).size],['Smaken',new Set(data.checkins.flatMap(c=>c.fl)).size]].map(([l,n])=>(
                <div key={l} style={s.statBox}>
                  <span style={s.statNum}>{n}</span>
                  <span style={s.statLabel}>{l}</span>
                </div>
              ))}
            </div>
            
            {data.checkins.length > 0 ? (
              <div>
                <h2 style={{fontSize:16,fontWeight:700,marginBottom:8}}>Recent</h2>
                {data.checkins.slice(0,3).map(c=>{
                  const shop = getShop(c.sid);
                  return (
                    <div key={c.id} style={s.card}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                        <div><b>{c.snm}</b>{shop?.ct && <span style={{color:'#999'}}> · {shop.ct}</span>}</div>
                        <span style={{color:'#999',fontSize:12}}>{fmtDate(c.dt)}</span>
                      </div>
                      <div style={{marginBottom:6}}>{c.fl.map(f=><span key={f} style={s.tag}>{f}</span>)}{c.vg && <span>🌱</span>}</div>
                      <div style={{fontSize:18}}>{'🍨'.repeat(c.rt)}{'⚪'.repeat(5-c.rt)}</div>
                    </div>
                  );
                })}
                <button onClick={()=>setView('history')} style={{background:'none',border:'none',color:'#FF8BA7',width:'100%',padding:8,cursor:'pointer'}}>Bekijk alles →</button>
              </div>
            ) : (
              <div style={{textAlign:'center',padding:40}}>
                <div style={{fontSize:60}}>🍦</div>
                <p style={{color:'#999',margin:'16px 0'}}>Nog geen check-ins!</p>
                <button onClick={()=>setView('checkin')} style={{...s.btn,...s.btnPrimary}}>Start</button>
              </div>
            )}
          </div>
        )}

        {/* CHECK-IN VIEW */}
        {view==='checkin' && (
          <div>
            <h2 style={s.title}>Check-in</h2>
            
            <div style={{marginBottom:20}}>
              <label style={s.label}>Datum</label>
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} style={s.input}/>
            </div>
            
            <div style={{marginBottom:20}}>
              <label style={s.label}>IJszaak</label>
              {!addingShop ? (
                <>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                    {data.shops.map(sh=>(
                      <button key={sh.id} onClick={()=>setForm({...form,sid:sh.id})} style={{...s.shopBtn,...(form.sid===sh.id?s.shopActive:{})}}>
                        <b style={{display:'block'}}>{sh.nm}</b>
                        {sh.ct && <span style={{fontSize:12,color:'#999'}}>{sh.ct}</span>}
                      </button>
                    ))}
                  </div>
                  <button onClick={()=>setAddingShop(true)} style={{width:'100%',padding:10,border:'2px dashed #ddd',borderRadius:12,background:'transparent',color:'#999',marginTop:8,cursor:'pointer'}}>+ Nieuwe zaak</button>
                </>
              ) : (
                <div style={{...s.card,marginTop:8}}>
                  <input placeholder="Naam *" value={shopForm.nm} onChange={e=>setShopForm({...shopForm,nm:e.target.value})} style={s.input}/>
                  <input placeholder="Stad" value={shopForm.ct} onChange={e=>setShopForm({...shopForm,ct:e.target.value})} style={s.input}/>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>setAddingShop(false)} style={{...s.btn,...s.btnGray,flex:1}}>Annuleer</button>
                    <button onClick={addShop} style={{...s.btn,...s.btnPrimary,flex:1}}>Voeg toe</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{marginBottom:20}}>
              <label style={s.label}>Smaak(en)</label>
              <div>{allFl.map(f=>(
                <button key={f} onClick={()=>setForm({...form,fl:form.fl.includes(f)?form.fl.filter(x=>x!==f):[...form.fl,f]})} style={{...s.flavorBtn,...(form.fl.includes(f)?s.flavorActive:{})}}>{f}</button>
              ))}</div>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <input placeholder="Eigen smaak..." value={newFl} onChange={e=>setNewFl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addFlavor()} style={{...s.input,flex:1,marginBottom:0}}/>
                <button onClick={addFlavor} style={{...s.btn,...s.btnGray}}>+</button>
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={s.label}>Rating</label>
              <div style={{display:'flex',gap:4,justifyContent:'center'}}>
                {[1,2,3,4,5].map(n=>(
                  <button key={n} onClick={()=>setForm({...form,rt:n})} style={{background:'none',border:'none',fontSize:32,cursor:'pointer'}}>{n<=form.rt?'🍨':'⚪'}</button>
                ))}
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                <input type="checkbox" checked={form.vg} onChange={e=>setForm({...form,vg:e.target.checked})} style={{width:20,height:20}}/>
                🌱 Vegan
              </label>
            </div>

            <div style={{marginBottom:20}}>
              <label style={s.label}>Notities</label>
              <textarea placeholder="Hoe was het?" value={form.nt} onChange={e=>setForm({...form,nt:e.target.value})} rows={2} style={{...s.input,resize:'vertical'}}/>
            </div>

            <button onClick={checkin} disabled={!form.sid||!form.fl.length} style={{...s.btn,...s.btnPrimary,width:'100%',fontSize:18,padding:16,opacity:(!form.sid||!form.fl.length)?0.5:1}}>Check-in! 🍦</button>
          </div>
        )}

        {/* HISTORY VIEW */}
        {view==='history' && (
          <div>
            <h2 style={s.title}>Logboek</h2>
            {data.checkins.length===0 ? (
              <p style={{textAlign:'center',color:'#999',padding:40}}>Nog geen check-ins</p>
            ) : data.checkins.map(c=>{
              const shop = getShop(c.sid);
              return (
                <div key={c.id} style={s.card}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                    <div>
                      <b style={{fontSize:17}}>{c.snm}</b>{shop?.ct && <span style={{color:'#999'}}> · {shop.ct}</span>}
                      <span style={{display:'block',fontSize:13,color:'#888'}}>{fmtDate(c.dt)}</span>
                    </div>
                    <button onClick={()=>setDeleteId(c.id)} style={{background:'none',border:'none',fontSize:20,opacity:0.4,cursor:'pointer',padding:4}}>🗑️</button>
                  </div>
                  <div style={{marginBottom:6}}>{c.fl.map(f=><span key={f} style={s.tag}>{f}</span>)}{c.vg && <span>🌱</span>}</div>
                  <div style={{fontSize:18}}>{'🍨'.repeat(c.rt)}{'⚪'.repeat(5-c.rt)}</div>
                  {c.nt && <p style={{marginTop:10,padding:10,background:'#f9f9f9',borderRadius:10,fontSize:14,fontStyle:'italic',color:'#666'}}>{c.nt}</p>}
                </div>
              );
            })}
          </div>
        )}

        {/* SHOPS VIEW */}
        {view==='shops' && (
          <div>
            <h2 style={s.title}>IJszaken</h2>
            {data.shops.map(sh=>{
              const visits = data.checkins.filter(c=>c.sid===sh.id);
              const avg = visits.length ? (visits.reduce((a,c)=>a+c.rt,0)/visits.length).toFixed(1) : null;
              const last = visits.length ? fmtDate(visits[0].dt) : null;
              return (
                <div key={sh.id} style={s.card}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div><b>{sh.nm}</b>{sh.ct && <span style={{color:'#999'}}> · {sh.ct}</span>}</div>
                    {avg && <span style={{color:'#FF8BA7',fontWeight:600}}>🍨 {avg}</span>}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:12}}>
                    <span style={{color:'#A0E7E5'}}>{visits.length} bezoek{visits.length!==1?'en':''}</span>
                    {last && <span style={{color:'#999'}}>Laatst: {last}</span>}
                  </div>
                </div>
              );
            })}
            <div style={{...s.card,marginTop:20}}>
              <h3 style={{margin:'0 0 12px',fontSize:15}}>Nieuwe zaak</h3>
              <input placeholder="Naam *" value={shopForm.nm} onChange={e=>setShopForm({...shopForm,nm:e.target.value})} style={s.input}/>
              <input placeholder="Stad" value={shopForm.ct} onChange={e=>setShopForm({...shopForm,ct:e.target.value})} style={s.input}/>
              <button onClick={addShop} style={{...s.btn,...s.btnPrimary}}>Toevoegen</button>
            </div>
          </div>
        )}

        {/* WISHLIST VIEW */}
        {view==='wish' && (
          <div>
            <h2 style={s.title}>Wishlist</h2>
            <p style={{color:'#888',fontSize:14,marginTop:-12,marginBottom:16}}>Smaken die je nog wilt proberen</p>
            
            <div style={{...s.card,marginBottom:16}}>
              <div style={{display:'flex',gap:8}}>
                <input placeholder="Smaak toevoegen..." value={wishInput} onChange={e=>setWishInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&wishInput.trim()){addWish(wishInput.trim());setWishInput('');}}} style={{...s.input,flex:1,marginBottom:0}}/>
                <button onClick={()=>{if(wishInput.trim()){addWish(wishInput.trim());setWishInput('');}}} style={{...s.btn,...s.btnPrimary}}>+</button>
              </div>
              <p style={{fontSize:11,color:'#999',margin:'12px 0 8px'}}>Of kies:</p>
              <div>{allFl.filter(f=>!data.wish.includes(f)).slice(0,8).map(f=>(
                <button key={f} onClick={()=>addWish(f)} style={{...s.flavorBtn,fontSize:12,padding:'4px 10px'}}>{f}</button>
              ))}</div>
            </div>

            {data.wish.length > 0 ? data.wish.map(f=>(
              <div key={f} style={{...s.card,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontWeight:500}}>{f}</span>
                <button onClick={()=>delWish(f)} style={{...s.btn,background:'#A0E7E5',color:'#fff',padding:'8px 16px',fontSize:13}}>✓ Gehad!</button>
              </div>
            )) : (
              <div style={{textAlign:'center',padding:40}}>
                <div style={{fontSize:48}}>⭐</div>
                <p style={{color:'#999'}}>Je wishlist is leeg</p>
              </div>
            )}
          </div>
        )}

        {/* BADGES VIEW */}
        {view==='badges' && (
          <div>
            <h2 style={s.title}>Badges</h2>
            <p style={{textAlign:'center',color:'#999',marginBottom:16}}>{earned.length} / {BADGES.length} verdiend</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {BADGES.map(b=>(
                <div key={b.id} style={{...s.badge,...(b.need(data)?s.badgeEarned:s.badgeLocked)}}>
                  <div style={{fontSize:40}}>{b.icon}</div>
                  <div style={{fontWeight:600,marginTop:4}}>{b.name}</div>
                  <div style={{fontSize:11,color:'#888',marginTop:2}}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
