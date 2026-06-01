(function(){
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if(stored) root.setAttribute('data-theme', stored);
  function toggle(){
    const cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', cur);
    localStorage.setItem('theme', cur);
    themeToggle.textContent = cur === 'light' ? '🌙' : '☀️';
  }
  themeToggle.addEventListener('click', toggle);

  // Modal handling for project details
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  function openModal(html){ modalBody.innerHTML = html; modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); modalBody.innerHTML=''; }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

  document.querySelectorAll('[data-open]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-open');
      let content='';
      switch(id){
        case 'jasmine': content = `<h3>Jasmine Plant Protection System</h3><p>IoT crop protection using UV‑C sterilization and electrostatic pest control. Firmware on ESP32 + Arduino, remote monitoring with Blynk.</p>`; break;
        case 'hostel': content = `<h3>Hostel Management System</h3><p>PHP & MySQL multi‑role application with authentication, role‑based access control, and complaint tracking.</p>`; break;
        case 'rfid': content = `<h3>RFID Smart Classroom</h3><p>Embedded RFID authentication system with real‑time logging to a backend and admin dashboard.</p>`; break;
        case 'fuse': content = `<h3>Automated Fuse Damage Detection</h3><p>Transformer monitoring with fault detection and GPS‑based alerts over IoT network.</p>`; break;
        default: content = `<p>Project details coming soon.</p>`
      }
      openModal(content);
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
})();
