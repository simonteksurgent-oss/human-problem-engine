document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("problemInput");
  const button = document.getElementById("searchButton");

  if (!input || !button) {
    console.error("Problem alanı bulunamadı.");
    return;
  }

  const result = document.createElement("section");
  result.id = "solutionResult";

  result.style.marginTop = "30px";
  result.style.padding = "20px";
  result.style.borderRadius = "16px";
  result.style.background = "#f1f5f9";
  result.style.border = "1px solid #cbd5e1";

  button.parentElement.insertAdjacentElement("afterend", result);

  button.addEventListener("click", analyzeProblem);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      analyzeProblem();
    }
  });

  function analyzeProblem() {
    const problem = input.value.trim();

    if (!problem) {
      showMessage(
        "Problem yazmalısın",
        "Örneğin: Paramı yönetemiyorum."
      );
      return;
    }

    const category = detectCategory(problem);
    const priority = detectPriority(problem);
    const analysis = analyzeText(problem);
    const solutions = generateSolutions(category);

    renderResult({
      problem,
      category,
      priority,
      analysis,
      solutions
    });
  }

  function detectCategory(problem) {
    const text = problem.toLowerCase();

    const categories = {
      "Para": [
        "para",
        "borç",
        "borc",
        "maaş",
        "gelir",
        "gider",
        "bütçe",
        "butce",
        "kredi",
        "fatura",
        "harcama"
      ],

      "İş ve Kariyer": [
        "iş",
        "kariyer",
        "meslek",
        "işsiz",
        "iş bul",
        "iş bulam",
        "maaş",
        "patron",
        "çalışma",
        "çalışam"
      ],

      "Zaman ve Verimlilik": [
        "zaman",
        "yetiş",
        "ertele",
        "geç kal",
        "program",
        "plan",
        "odaklan",
        "dikkat",
        "verimsiz"
      ],

      "Eğitim ve Öğrenme": [
        "ders",
        "öğren",
        "ögren",
        "sınav",
        "sinav",
        "okul",
        "üniversite",
        "ünivers",
        "eğitim",
        "egitim",
        "kitap"
      ],

      "Teknoloji": [
        "telefon",
        "bilgisayar",
        "internet",
        "wifi",
        "uygulama",
        "yazılım",
        "software",
        "kod",
        "web",
        "site",
        "teknoloji"
      ],

      "İlişkiler": [
        "eşim",
        "eş",
        "arkadaş",
        "aile",
        "sevgili",
        "ilişki",
        "ilişkim",
        "iletişim",
        "kavga"
      ],

      "Günlük Yaşam": [
        "ev",
        "alışveriş",
        "yemek",
        "temizlik",
        "taşın",
        "günlük",
        "yaşam"
      ]
    };

    let bestCategory = "Günlük Yaşam";
    let bestScore = 0;

    for (const category in categories) {
      let score = 0;

      categories[category].forEach((keyword) => {
        if (text.includes(keyword)) {
          score++;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    }

    return bestCategory;
  }

  function detectPriority(problem) {
    const text = problem.toLowerCase();

    const urgentWords = [
      "acil",
      "hemen",
      "çok zor",
      "çok kötü",
      "kriz",
      "bugün",
      "yarın",
      "son gün",
      "kaybettim",
      "kaybediyorum"
    ];

    const highWords = [
      "borç",
      "borc",
      "işsiz",
      "işimi kaybettim",
      "yetişemiyorum",
      "başaramıyorum"
    ];

    if (urgentWords.some(word => text.includes(word))) {
      return "Yüksek";
    }

    if (highWords.some(word => text.includes(word))) {
      return "Orta-Yüksek";
    }

    return "Normal";
  }

  function analyzeText(problem) {
    const text = problem.toLowerCase();

    if (
      text.includes("yönetemiyorum") ||
      text.includes("yonetemiyorum")
    ) {
      return "Problem, mevcut durumun kontrol edilemediğini gösteriyor. Öncelikle problemi parçalara ayırmak gerekiyor.";
    }

    if (
      text.includes("yapamıyorum") ||
      text.includes("yapamiyorum") ||
      text.includes("başaramıyorum") ||
      text.includes("basaramiyorum")
    ) {
      return "Problemin temelinde bir engel veya eksik kaynak olabilir. Önce engeli belirlemek gerekiyor.";
    }

    if (
      text.includes("bilmiyorum") ||
      text.includes("anlamıyorum") ||
      text.includes("anlamiyorum")
    ) {
      return "Problemin bilgi eksikliğiyle ilişkili olma ihtimali yüksek. Önce gerekli bilgiyi belirlemek gerekiyor.";
    }

    return "Problem tanımlandı. Şimdi kontrol edilebilir parçalara ayrılarak çözüm planı oluşturulabilir.";
  }

  function generateSolutions(category) {
    const solutions = {
      "Para": [
        "Gelirlerini listele.",
        "Zorunlu giderlerini ayır.",
        "Borç ve faturaları önceliklendir.",
        "Gereksiz harcamaları belirle.",
        "Haftalık bir bütçe sınırı oluştur."
      ],

      "İş ve Kariyer": [
        "Mevcut becerilerini listele.",
        "Eksik becerilerini belirle.",
        "CV ve portföyünü güncelle.",
        "Uygun iş fırsatlarını kategorilere ayır.",
        "Her gün ölçülebilir bir kariyer adımı at."
      ],

      "Zaman ve Verimlilik": [
        "Bugünkü tüm görevleri listele.",
        "Acil ve önemli işleri ayır.",
        "En önemli tek görevi seç.",
        "Görevi küçük parçalara böl.",
        "Belirli bir süre boyunca yalnızca o göreve odaklan."
      ],

      "Eğitim ve Öğrenme": [
        "Öğrenilecek konuyu belirle.",
        "Konuyu küçük başlıklara ayır.",
        "Güvenilir bir kaynak seç.",
        "Kısa günlük çalışma planı oluştur.",
        "Öğrendiklerini uygulayarak test et."
      ],

      "Teknoloji": [
        "Sorunun tam olarak nerede oluştuğunu belirle.",
        "Hata mesajını kaydet.",
        "İnternet ve cihaz bağlantısını kontrol et.",
        "Sorunu küçük parçalara ayır.",
        "Her değişiklikten sonra tekrar test et."
      ],

      "İlişkiler": [
        "Sorunun tam olarak ne olduğunu tanımla.",
        "Karşı tarafın bakış açısını anlamaya çalış.",
        "Varsayım yerine açık iletişim kullan.",
        "Tek bir problemi konuşmaya odaklan.",
        "Çözüm için karşılıklı uygulanabilir bir adım belirle."
      ],

      "Günlük Yaşam": [
        "Problemi tek cümleyle tanımla.",
        "Problemin nedenlerini listele.",
        "Kontrol edebileceğin kısmı ayır.",
        "En kolay uygulanabilir çözümü seç.",
        "Sonucu kontrol ederek gerekirse yeni bir çözüm dene."
      ]
    };

    return solutions[category] || solutions["Günlük Yaşam"];
  }

  function renderResult(data) {
    result.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Çözüm Analizi";

    const problem = document.createElement("p");
    problem.innerHTML =
      "<strong>Problemin:</strong> " +
      escapeHTML(data.problem);

    const category = document.createElement("p");
    category.innerHTML =
      "<strong>Kategori:</strong> " +
      escapeHTML(data.category);

    const priority = document.createElement("p");
    priority.innerHTML =
      "<strong>Öncelik:</strong> " +
      escapeHTML(data.priority);

    const analysisTitle = document.createElement("h3");
    analysisTitle.textContent = "Analiz";

    const analysis = document.createElement("p");
    analysis.textContent = data.analysis;

    const solutionTitle = document.createElement("h3");
    solutionTitle.textContent = "Önerilen Çözüm Planı";

    const list = document.createElement("ol");

    data.solutions.forEach((solution) => {
      const item = document.createElement("li");
      item.textContent = solution;
      item.style.marginBottom = "8px";
      list.appendChild(item);
    });

    result.appendChild(title);
    result.appendChild(problem);
    result.appendChild(category);
    result.appendChild(priority);
    result.appendChild(analysisTitle);
    result.appendChild(analysis);
    result.appendChild(solutionTitle);
    result.appendChild(list);
  }

  function showMessage(title, message) {
    result.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    result.appendChild(heading);
    result.appendChild(paragraph);
  }

  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
});
