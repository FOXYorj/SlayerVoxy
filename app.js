// Basit toast
const toastEl = document.getElementById('toast');
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2400);
}

// Kullanıcı oturumu (Local)
const defaultUser = { name: 'erayy0143', picture: '', isGoogle: false };
const user = { ...defaultUser };

function updateUserChip() {
  const chip = document.getElementById('userChip');
  const signIn = document.getElementById('googleSignIn');
  const avatar = chip?.querySelector('img');
  const nameEl = chip?.querySelector('span');
  if (!chip || !signIn) return;

  nameEl.textContent = user.name || 'Kullanıcı';
  if (user.picture) {
    avatar.src = user.picture;
    avatar.hidden = false;
  } else {
    avatar.hidden = true;
  }

  chip.hidden = false;
  signIn.hidden = !!user.isGoogle;
}

// Google JWT parse (lightweight)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Site ayarları
document.addEventListener('DOMContentLoaded', function() {
  // Ayarlar butonunu aktifleştir
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.querySelectorAll('#closeSettings');
  const saveSettings = document.getElementById('saveSettings');
  const siteSize = document.getElementById('siteSize');
  const themeSelect = document.getElementById('themeSelect');
  
  // Ayarlar butonuna tıklandığında
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      settingsModal.showModal();
    });
  }
  
  // Ayarlar modalını kapatma
  if (closeSettings) {
    closeSettings.forEach(btn => {
      btn.addEventListener('click', function() {
        settingsModal.close();
      });
    });
  }
  
  // Ayarları kaydetme
  if (saveSettings) {
    saveSettings.addEventListener('click', function() {
      // Site boyutunu ayarla
      const selectedSize = siteSize.value;
      document.documentElement.setAttribute('data-size', selectedSize);
      
      // Temayı ayarla
      const selectedTheme = themeSelect.value;
      document.documentElement.setAttribute('data-theme', selectedTheme);
      
      // Ayarları localStorage'a kaydet
      localStorage.setItem('siteSize', selectedSize);
      localStorage.setItem('siteTheme', selectedTheme);
      
      // Modalı kapat
      settingsModal.close();
      
      // Bildirim göster
      showToast('Ayarlar kaydedildi!');
    });
  }
  
  // Sayfa yüklendiğinde kaydedilmiş ayarları uygula
  const savedSize = localStorage.getItem('siteSize');
  const savedTheme = localStorage.getItem('siteTheme');
  
  if (savedSize) {
    document.documentElement.setAttribute('data-size', savedSize);
    if (siteSize) siteSize.value = savedSize;
  }
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeSelect) themeSelect.value = savedTheme;
  }
});
// Google giriş kaldırıldı

// Profil modalı
const profileModal = document.getElementById('profileModal');
const nameInput = document.getElementById('profileName');
document.getElementById('userChip')?.addEventListener('click', () => {
  if (!profileModal) return;
  nameInput.value = user.name || '';
  profileModal.hidden = false;
});
document.getElementById('closeProfile')?.addEventListener('click', () => {
  profileModal.hidden = true;
});
document.getElementById('saveProfile')?.addEventListener('click', () => {
  user.name = nameInput.value?.trim() || user.name;
  user.isGoogle = false; // manuel güncelleme
  updateUserChip();
  profileModal.hidden = true;
  showToast('Profil güncellendi');
});

// İlk durum
document.addEventListener('DOMContentLoaded', () => {
  updateUserChip();
});