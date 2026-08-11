document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("problemInput");
  const button = document.getElementById("searchButton");

  if (!input || !button) {
    console.error("Problem input veya çözüm butonu bulunamadı.");
    return;
  }

  // Çözüm alanını oluştur
  const result = document.createElement("section");
  result.id = "solutionResult";
  result.style.marginTop = "24px";

  button.parentElement.insertAdjacentElement("afterend", result);

  button.addEventListener("click", findSolution);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      findSolution();
    }
  });

  function findSolution() {
    const problem = input.value.trim();

    if (!problem) {
      showResult(
        "Bir problem yazmalısın.",
        "Örneğin: Paramı yönetemiyorum."
      );
      return;
    }

    const category = detectCategory(problem);
    const solutions = getSolutions(category);

    showResult(
      `Problem kategorisi: ${category}`,
      solutions
    );
  }

  function detectCategory(problem) {
    const text = problem.toLowerCase();

    if (
      text.includes("para") ||
      text.includes("borç") ||
      text.includes("borc") ||
      text.includes("maaş") ||
      text.includes("maaşım") ||
      text.includes("gelir")
    ) {
      return "Para";
    }

    if (
      text.includes("iş") ||
      text.includes("kariyer") ||
      text.includes("meslek") ||
      text.includes("işsiz")
    ) {
      return "İş ve Kariyer";
    }

    if (
      text.includes("zaman") ||
      text.includes("yetiş") ||
      text.includes("ertele")
    ) {
      return "Zaman";
    }

    if (
      text.includes("ders") ||
      text.includes("öğren") ||
      text.includes("sınav") ||
      text.includes("eğitim")
    ) {
      return "Eğitim";
    }

    if (
      text.includes("telefon") ||
      text.includes("bilgisayar") ||
      text.includes("internet") ||
      text.includes("uygulama") ||
      text.includes("teknoloji")
    ) {
      return "Teknoloji";
    }

    return "Günlük Yaşam";
  }

  function getSolutions(category) {
    const solutions = {
      "Para": [
        "1. Gelir ve giderlerini listele.",
        "2. Zorunlu giderleri ayır.",
        "3. Gereksiz harcamaları belirle.",
        "4. Borçların varsa öncelik sırasını oluştur.",
        "5. Küçük ve uygulanabilir bir bütçe planı oluştur."
      ],

      "İş ve Kariyer": [
        "1. Mevcut becerilerini listele.",
        "2. Eksik olan becerileri belirle.",
        "3. Güncel iş ilanlarını incele.",
        "4. CV ve portföyünü güncelle.",
        "5. Her gün belirli sayıda başvuru veya bağlantı oluştur."
      ],

      "Zaman": [
        "1. Bugünkü görevlerini listele.",
        "2. Acil ve önemli işleri ayır.",
        "3. En önemli tek görevi seç.",
        "4. Telefon ve dikkat dağıtıcıları azalt.",
        "5. Görevi küçük parçalara bölerek başla."
      ],

      "Eğitim": [
        "1. Öğrenmek istediğin konuyu netleştir.",
        "2. Konuyu küçük başlıklara böl.",
        "3. Güvenilir bir kaynak seç.",
        "4. Her gün kısa bir çalışma süresi belirle.",
        "5. Öğrendiklerini uygulayarak test et."
      ],

      "Teknoloji": [
        "1. Sorunun tam olarak nerede oluştuğunu belirle.",
        "2. Hata mesajı varsa kaydet.",
        "3. Sistem, uygulama ve bağlantı durumunu kontrol et.",
        "4. Sorunu küçük parçalara ayır.",
        "5. Çözümü test ederek ilerle."
      ],

      "Günlük Yaşam": [
        "1. Problemi tek cümlede tanımla.",
        "2. Problemin nedenini belirlemeye çalış.",
        "3. Kontrol edebileceğin kısmı ayır.",
        "4. En kolay uygulanabilir çözümü seç.",
        "5. Sonucu kontrol et ve gerekiyorsa yeni bir çözüm dene."
      ]
    };

    return solutions[category] || solutions["Günlük Yaşam"];
  }

  function showResult(title, content) {
    result.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = title;
    result.appendChild(heading);

    if (Array.isArray(content)) {
      const list = document.createElement("ul");

      content.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });

      result.appendChild(list);
    } else {
      const paragraph = document.createElement("p");
      paragraph.textContent = content;
      result.appendChild(paragraph);
    }
  }
});
