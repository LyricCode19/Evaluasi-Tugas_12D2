console.log("📦 Script Tugas1Scroll.js berhasil dimuat!");

document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 DOM siap!");

  const tugasList = document.getElementById('daftarTugas');
  console.log("📃 Element daftarTugas:", tugasList);

  if (!tugasList) {
    console.warn("⚠️ Element #daftarTugas tidak ditemukan!");
    return;
  }

  const originalItems = Array.from(tugasList.children);

  function cloneItems() {
    for (let i = 0; i < 2; i++) {
      originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        tugasList.appendChild(clone);
      });
    }
  }

  function loopScrollCheck() {
    const totalHeight = tugasList.scrollHeight;
    const oneThird = totalHeight / 3;
    if (tugasList.scrollTop < oneThird) {
      tugasList.scrollTop += oneThird;
    } else if (tugasList.scrollTop > oneThird * 2) {
      tugasList.scrollTop -= oneThird;
    }
  }

  function highlightClosestItem() {
    const rect = tugasList.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    let closest = null;
    let minDist = Infinity;

    tugasList.querySelectorAll('li').forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const dist = Math.abs(centerY - itemCenter);

      if (dist < minDist) {
        minDist = dist;
        closest = item;
      }
    });

    tugasList.querySelectorAll('li').forEach(item => item.classList.remove('aktif'));
    if (closest) closest.classList.add('aktif');
  }

  cloneItems();
  setTimeout(() => {
    const totalHeight = tugasList.scrollHeight;
    tugasList.scrollTop = totalHeight / 3;
    highlightClosestItem();
  }, 100);

  tugasList.addEventListener('scroll', () => {
    loopScrollCheck();
    highlightClosestItem();
  });
});
