/* =========================================
   Aurum Beauty - Front-end (CRUD agendamentos)
   Integração com Spring Boot:
     Controller: /agendamentos
   ========================================= */

const API_BASE = "http://localhost:8080"; // << ajuste a porta/host do seu backend
const LS_KEY = "aurum_fallback_agendamentos_v1";

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const els = {
  year: $("#year"),
  glow: $(".cursor-glow"),
  menuBtn: $("#menuBtn"),

  form: $("#bookingForm"),
  servico: $("#servico"),
  profissional: $("#profissional"),
  data: $("#data"),
  hora: $("#hora"),
  cliente: $("#cliente"),
  telefoneCliente: $("#telefoneCliente"),
  editingKey: $("#editingKey"),
  status: $("#status"),
  resetBtn: $("#resetBtn"),

  buscarData: $("#buscarData"),
  buscarBtn: $("#buscarBtn"),
  hojeBtn: $("#hojeBtn"),
  list: $("#appointmentsList"),
  listMeta: $("#listMeta"),
  limparCacheBtn: $("#limparCacheBtn"),
};

function isoLocalDateTime(dateStr, timeStr){
  // Spring Boot LocalDateTime: "YYYY-MM-DDTHH:mm"
  return `${dateStr}T${timeStr}`;
}

function formatPtBr(iso){
  // iso: YYYY-MM-DDTHH:mm (ou com segundos)
  const [datePart, timePartRaw] = iso.split("T");
  const timePart = (timePartRaw || "").slice(0,5);
  const [y,m,d] = datePart.split("-").map(Number);
  return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y} • ${timePart}`;
}

function setStatus(msg, kind=""){
  els.status.textContent = msg;
  els.status.className = "status " + (kind || "");
}

function todayStr(){
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  return `${yyyy}-${mm}-${dd}`;
}

/* ---------------------------
   Visual interactions
---------------------------- */
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty("--x", x + "%");
  document.documentElement.style.setProperty("--y", y + "%");
}, {passive:true});

// Parallax (mouse)
window.addEventListener("mousemove", (e) => {
  const cx = e.clientX / window.innerWidth - 0.5;
  const cy = e.clientY / window.innerHeight - 0.5;
  $$(".parallax").forEach(el => {
    const amt = Number(el.dataset.parallax || "0.03");
    el.style.transform = `translate(${cx * 40 * amt}px, ${cy * 40 * amt}px) scale(1.06)`;
  });
}, {passive:true});

// Magnetic buttons (mouse proximity)
function attachMagnetic(el){
  const strength = 14;
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    el.style.transform = `translate(${x/rect.width*strength}px, ${y/rect.height*strength}px)`;
  });
  el.addEventListener("mouseleave", () => el.style.transform = "");
}
$$(".magnetic").forEach(attachMagnetic);

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if(ent.isIntersecting){
      ent.target.classList.add("in");
      io.unobserve(ent.target);
    }
  });
}, {threshold: 0.12});
$$(".reveal").forEach(el => io.observe(el));


/* ---------------------------
   Navbar active section highlight
---------------------------- */
const navLinks = $$(".nav a[href^='#']").filter(a => a.getAttribute("href") !== "#agendar" || true);
const sections = ["#inicio","#servicos","#vitrine","#profissionais","#depoimentos","#agendar","#localizacao"]
  .map(id => $(id)).filter(Boolean);

const navIo = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if(!ent.isIntersecting) return;
    const id = "#" + ent.target.id;
    $$(".nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
  });
}, {threshold: 0.45});
sections.forEach(s => navIo.observe(s));

/* ---------------------------
   Counters (metrics)
---------------------------- */
function animateCount(el){
  const target = Number(el.dataset.count || "0");
  const duration = 900;
  const start = performance.now();
  const from = 0;

  function frame(t){
    const p = Math.min(1, (t-start)/duration);
    const eased = 1 - Math.pow(1-p, 3); // easeOutCubic
    const val = Math.round(from + (target-from)*eased);
    el.textContent = String(val);
    if(p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const countIo = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if(ent.isIntersecting){
      ent.target.querySelectorAll("[data-count]").forEach(animateCount);
      countIo.unobserve(ent.target);
    }
  });
}, {threshold: 0.25});

const metrics = $(".metrics");
if(metrics) countIo.observe(metrics);

/* ---------------------------
   Testimonials carousel
---------------------------- */
(function(){
  const track = $("#tTrack");
  const dotsWrap = $("#tDots");
  if(!track || !dotsWrap) return;

  const cards = $$(".t-card", track);
  let idx = 0;

  function setIdx(n){
    idx = (n + cards.length) % cards.length;
    track.style.transform = `translateX(${-idx * 100}%)`;
    $$(".dot", dotsWrap).forEach((d,i) => d.classList.toggle("on", i===idx));
  }

  // dots
  dotsWrap.innerHTML = cards.map((_,i)=>`<button class="dot" type="button" aria-label="Ir para depoimento ${i+1}"></button>`).join("");
  $$(".dot", dotsWrap).forEach((d,i)=> d.addEventListener("click", ()=> setIdx(i)));

  const prevBtn = $(".t-nav.prev");
  const nextBtn = $(".t-nav.next");
  prevBtn?.addEventListener("click", ()=> setIdx(idx-1));
  nextBtn?.addEventListener("click", ()=> setIdx(idx+1));

  // auto-advance (pausa no hover)
  let timer = null;
  function start(){
    stop();
    timer = setInterval(()=> setIdx(idx+1), 5000);
  }
  function stop(){
    if(timer) clearInterval(timer);
    timer = null;
  }
  const wrap = track.closest(".testimonials");
  wrap?.addEventListener("mouseenter", stop);
  wrap?.addEventListener("mouseleave", start);

  // swipe
  let x0 = null;
  wrap?.addEventListener("pointerdown", (e)=>{ x0 = e.clientX; wrap.setPointerCapture(e.pointerId); });
  wrap?.addEventListener("pointerup", (e)=>{
    if(x0 == null) return;
    const dx = e.clientX - x0;
    if(Math.abs(dx) > 40) setIdx(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  setIdx(0);
  start();
})();

/* ---------------------------
   Mobile menu
---------------------------- */
els.menuBtn.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  els.menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

$$(".nav a").forEach(a => {
  a.addEventListener("click", () => document.body.classList.remove("menu-open"));
});

/* ---------------------------
   Autopreencher serviço/profissional
---------------------------- */
$$("[data-fill-service]").forEach(btn => {
  btn.addEventListener("click", () => {
    const service = btn.dataset.fillService;
    els.servico.value = service;
    $("#agendar").scrollIntoView({behavior:"smooth", block:"start"});
    els.profissional.focus();
  });
});

$$("[data-fill-prof]").forEach(card => {
  card.addEventListener("click", () => {
    els.profissional.value = card.dataset.fillProf;

    // ✅ Preenche o serviço associado ao profissional
    if(card.dataset.fillService){
      els.servico.value = card.dataset.fillService;
    }else{
      // fallback: tenta deduzir pelo texto
      const txt = (card.dataset.fillProf || "").toLowerCase();
      if(txt.includes("corte")) els.servico.value = "Corte";
      else if(txt.includes("unha")) els.servico.value = "Unhas";
      else if(txt.includes("cilio") || txt.includes("cílios")) els.servico.value = "Cílios";
      else if(txt.includes("tranca") || txt.includes("trança")) els.servico.value = "Tranças";
    }

    $("#agendar").scrollIntoView({behavior:"smooth", block:"start"});
    // Se já setou serviço, leva pro campo seguinte (data)
    els.data.focus();
  });
});

/* ---------------------------
   Fallback local (caso API falhe)
---------------------------- */
function readLocal(){
  try{
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  }catch{
    return [];
  }
}
function writeLocal(items){
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}
function makeKey(cliente, isoDateTime){
  // chave para editar/deletar quando não há ID
  return `${cliente}__${isoDateTime}`;
}

/* ---------------------------
   API helpers
---------------------------- */
async function apiFetch(url, options){
  const res = await fetch(url, {
    headers: {"Content-Type":"application/json"},
    ...options
  });
  if(!res.ok){
    const text = await res.text().catch(()=>"");
    throw new Error(`${res.status} ${res.statusText}${text ? " • " + text : ""}`);
  }
  // POST/PUT retornam JSON; DELETE retorna vazio
  const ct = res.headers.get("content-type") || "";
  if(ct.includes("application/json")) return res.json();
  return null;
}

async function apiCreate(ag){
  return apiFetch(`${API_BASE}/agendamentos`, {method:"POST", body: JSON.stringify(ag)});
}

async function apiListByDay(dateStr){
  const url = new URL(`${API_BASE}/agendamentos`);
  url.searchParams.set("data", dateStr);
  return apiFetch(url.toString(), {method:"GET"});
}

async function apiDelete(cliente, isoDateTime){
  const url = new URL(`${API_BASE}/agendamentos`);
  url.searchParams.set("cliente", cliente);
  url.searchParams.set("dataHoraAgendamento", isoDateTime);
  return apiFetch(url.toString(), {method:"DELETE"});
}

async function apiUpdate(cliente, isoDateTime, ag){
  const url = new URL(`${API_BASE}/agendamentos`);
  url.searchParams.set("cliente", cliente);
  url.searchParams.set("dataHoraAgendamento", isoDateTime);
  return apiFetch(url.toString(), {method:"PUT", body: JSON.stringify(ag)});
}

/* ---------------------------
   UI: render list
---------------------------- */
function renderList(items){
  els.list.innerHTML = "";

  if(!items || items.length === 0){
    els.list.innerHTML = `<div class="item"><div><h4>Nenhum agendamento</h4><p class="muted">Escolha uma data e clique em <strong>Buscar</strong>.</p></div></div>`;
    els.listMeta.textContent = "0 agendamentos";
    return;
  }

  // Ordenar por data/hora
  const sorted = [...items].sort((a,b) => (a.dataHoraAgendamento || "").localeCompare(b.dataHoraAgendamento || ""));

  for(const ag of sorted){
    const iso = (ag.dataHoraAgendamento || "");
    const key = makeKey(ag.cliente, iso);

    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <div>
        <h4>${escapeHtml(ag.servico || "Serviço")} • ${escapeHtml(ag.profissional || "Profissional")}</h4>
        <p>
          <strong>${escapeHtml(ag.cliente || "Cliente")}</strong>
          <small>(${escapeHtml(ag.telefoneCliente || "—")})</small>
        </p>
        <p class="muted">${iso ? formatPtBr(iso) : "—"}</p>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-edit="${key}">Editar</button>
        <button class="icon-btn danger" data-del="${key}">Cancelar</button>
      </div>
    `;
    els.list.appendChild(el);

    el.querySelector("[data-edit]").addEventListener("click", () => startEdit(ag));
    el.querySelector("[data-del]").addEventListener("click", () => removeAg(ag));
  }

  els.listMeta.textContent = `${sorted.length} agendamento(s)`;
}

function startEdit(ag){
  const iso = ag.dataHoraAgendamento || "";
  const [dateStr, timeStrRaw=""] = iso.split("T");
  const timeStr = timeStrRaw.slice(0,5);

  els.servico.value = ag.servico || "";
  els.profissional.value = ag.profissional || "";
  els.data.value = dateStr || "";
  els.hora.value = timeStr || "";
  els.cliente.value = ag.cliente || "";
  els.telefoneCliente.value = ag.telefoneCliente || "";

  els.editingKey.value = makeKey(ag.cliente, iso);
  $("#saveBtn").querySelector("span").textContent = "Atualizar agendamento";
  setStatus("Modo edição: altere os campos e clique em Atualizar.", "good");
  els.cliente.focus();
}

function clearForm(){
  els.form.reset();
  els.editingKey.value = "";
  $("#saveBtn").querySelector("span").textContent = "Salvar agendamento";
  setStatus("");
}

els.resetBtn.addEventListener("click", clearForm);

/* ---------------------------
   CRUD actions
---------------------------- */
async function loadDay(dateStr){
  if(!dateStr){
    renderList([]);
    return;
  }

  setStatus("Buscando agendamentos…");
  try{
    const items = await apiListByDay(dateStr);
    renderList(items);
    setStatus("Agendamentos carregados da API ✅", "good");
  }catch(err){
    // fallback local (filtra por dia)
    const local = readLocal();
    const filtered = local.filter(a => (a.dataHoraAgendamento || "").startsWith(dateStr));
    renderList(filtered);
    setStatus("API indisponível. Mostrando fallback local ⚠️", "bad");
    console.warn(err);
  }
}

els.buscarBtn.addEventListener("click", () => loadDay(els.buscarData.value));
els.hojeBtn.addEventListener("click", () => {
  els.buscarData.value = todayStr();
  loadDay(els.buscarData.value);
});

els.limparCacheBtn.addEventListener("click", () => {
  localStorage.removeItem(LS_KEY);
  setStatus("Fallback local limpo.", "good");
  loadDay(els.buscarData.value);
});

els.form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dateStr = els.data.value;
  const timeStr = els.hora.value;
  const iso = isoLocalDateTime(dateStr, timeStr);

  const ag = {
    servico: els.servico.value,
    profissional: els.profissional.value.trim(),
    dataHoraAgendamento: iso,
    cliente: els.cliente.value.trim(),
    telefoneCliente: els.telefoneCliente.value.trim()
  };

  // Validações simples
  if(!ag.profissional || !ag.cliente){
    setStatus("Preencha profissional e cliente.", "bad");
    return;
  }

  const key = els.editingKey.value;

  try{
    if(key){
      // editar: precisamos do cliente+dataHora original (key)
      const [oldCliente, oldIso] = key.split("__");
      await apiUpdate(oldCliente, oldIso, ag);
      setStatus("Agendamento atualizado na API ✅", "good");
    }else{
      await apiCreate(ag);
      setStatus("Agendamento criado na API ✅", "good");
    }
    // recarrega o dia selecionado
    els.buscarData.value = dateStr;
    await loadDay(dateStr);
    clearForm();
  }catch(err){
    // fallback local
    const local = readLocal();

    if(key){
      const idx = local.findIndex(a => makeKey(a.cliente, a.dataHoraAgendamento) === key);
      if(idx >= 0) local[idx] = ag;
      else local.push(ag);
      setStatus("API indisponível. Atualizei no fallback local ⚠️", "bad");
    }else{
      local.push(ag);
      setStatus("API indisponível. Salvei no fallback local ⚠️", "bad");
    }
    writeLocal(local);
    els.buscarData.value = dateStr;
    await loadDay(dateStr);
    clearForm();
    console.warn(err);
  }
});

async function removeAg(ag){
  const iso = ag.dataHoraAgendamento || "";
  if(!iso) return;

  const ok = confirm(`Cancelar agendamento de ${ag.cliente} em ${formatPtBr(iso)}?`);
  if(!ok) return;

  try{
    await apiDelete(ag.cliente, iso);
    setStatus("Agendamento cancelado na API ✅", "good");
    await loadDay((els.buscarData.value || "").trim());
  }catch(err){
    // fallback local remove
    const local = readLocal();
    const key = makeKey(ag.cliente, iso);
    const next = local.filter(a => makeKey(a.cliente, a.dataHoraAgendamento) !== key);
    writeLocal(next);
    setStatus("API indisponível. Removi do fallback local ⚠️", "bad");
    await loadDay((els.buscarData.value || "").trim());
    console.warn(err);
  }
}

/* ---------------------------
   Utils
---------------------------- */
function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* ---------------------------
   Init
---------------------------- */
els.year.textContent = new Date().getFullYear();

// Sugestão: iniciar com hoje
els.buscarData.value = todayStr();
loadDay(els.buscarData.value);

// Preencher data/hora com próximos 30 min
(function initDefaults(){
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth()+1).padStart(2,"0");
  const dd = String(now.getDate()).padStart(2,"0");
  const hh = String(now.getHours()).padStart(2,"0");
  const mi = String(now.getMinutes()).padStart(2,"0");
  els.data.value = `${yyyy}-${mm}-${dd}`;
  els.hora.value = `${hh}:${mi}`;
})();


/* ===== Interações extra (tilt + nav active) ===== */
(function enhanceInteractions(){
  const tiltEls = Array.from(document.querySelectorAll("[data-tilt]"));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function onMove(e){
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rotY = (x - 0.5) * 10;   // -5..5
    const rotX = (0.5 - y) * 10;   // -5..5
    el.style.transform = `translateY(-2px) rotateX(${clamp(rotX,-7,7)}deg) rotateY(${clamp(rotY,-7,7)}deg)`;
  }
  function onLeave(e){
    const el = e.currentTarget;
    el.style.transform = "";
  }

  tiltEls.forEach(el=>{
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });

  // Active section highlight
  const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (sections.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(!en.isIntersecting) return;
        const id = "#" + en.target.id;
        navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

    sections.forEach(s => io.observe(s));
  }
})();
