const wordInput = document.getElementById("word-input");
const relationType = document.getElementById("relation-type");
const analyzeBtn = document.getElementById("analyze-btn");
const resultsContainer = document.getElementById("results-container");

let semanticData = {};

async function loadData() {
  try {
    const response = await fetch("../data/semanticData.json");
    semanticData = await response.json();
  } catch (error) {
    console.error("فشل تحميل قاعدة البيانات:", error);
    resultsContainer.innerHTML = `<p style="color:red">تعذّر تحميل البيانات.</p>`;
  }
}

function analyzeWord() {
  const word = wordInput.value.trim();
  const selectedRelation = relationType.value;
  resultsContainer.innerHTML = "";

  if (!semanticData[word]) {
    resultsContainer.innerHTML = `
      <div class="result-card" style="grid-column:1 / -1">
        <h2 class="card-title">النتيجة</h2>
        <p>الكلمة "<strong>${word}</strong>" غير موجودة في قاعدة البيانات.</p>
      </div>`;
    return;
  }

  if (selectedRelation === "all") {
    displayRelation("synonym", semanticData[word].synonym);
    displayRelation("antonym", semanticData[word].antonym);
  } else {
    displayRelation(selectedRelation, semanticData[word][selectedRelation]);
  }
}

function displayRelation(type, words) {
  let title = type === "synonym" ? "الترادف (مرادفات)" : "التضاد (أضداد)";
  let desc = type === "synonym"
    ? "كلمات مختلفة تدل على نفس المعنى"
    : "كلمات تعبر عن معانٍ متقابلة";

  const card = document.createElement("div");
  card.className = "result-card";
  card.innerHTML = `
    <h2 class="card-title">${title}</h2>
    <p>${desc}</p>
    <ul class="word-list">${words.map(w => `<li>${w}</li>`).join("")}</ul>
  `;
  resultsContainer.appendChild(card);
}

analyzeBtn.addEventListener("click", analyzeWord);
wordInput.addEventListener("keypress", e => {
  if (e.key === "Enter") analyzeWord();
});

window.addEventListener("load", async () => {
  await loadData();
  wordInput.value = "سعيد";
  analyzeWord();
});
