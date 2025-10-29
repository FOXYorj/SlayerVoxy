// Basit toast
const toastEl = document.getElementById('toast');
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2400);
}

// Kullanıcı oturumu (Local + Google)
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

// Google callback
window.handleCredentialResponse = (response) => {
  const data = parseJwt(response.credential || '');
  if (!data) {
    showToast('Google oturum açılamadı');
    return;
  }
  user.name = data.name || user.name;
  user.picture = data.picture || '';
  user.isGoogle = true;
  updateUserChip();
  showToast(`Hoş geldin, ${user.name}`);
};

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