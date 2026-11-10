// 問題データ（answer は choices の正解のインデックス）
const questions = [
  {
    question: "1年は何か月ある？",
    choices: ["10か月", "11か月", "12か月", "13か月"],
    answer: 2,
  },
  {
    question: "日本の国土面積が最も大きい都道府県は？",
    choices: ["北海道", "岩手県", "長野県", "新潟県"],
    answer: 0,
  },
  {
    question: "水は何度で沸騰する？（標準的な気圧の場合）",
    choices: ["80℃", "90℃", "100℃", "120℃"],
    answer: 2,
  },
  {
    question: "太陽系で最も大きい惑星は？",
    choices: ["地球", "木星", "土星", "火星"],
    answer: 1,
  },
  {
    question: "信号機で「進め」を意味する色は？",
    choices: ["赤", "黄", "青（緑）", "白"],
    answer: 2,
  },
  {
    question: "日本で一番高い山は？",
    choices: ["北岳", "富士山", "槍ヶ岳", "阿蘇山"],
    answer: 1,
  },
  {
    question: "1週間は何日ある？",
    choices: ["5日", "6日", "7日", "8日"],
    answer: 2,
  },
  {
    question: "地球上で最も面積が大きい海洋は？",
    choices: ["大西洋", "インド洋", "北極海", "太平洋"],
    answer: 3,
  },
  {
    question: "サッカーの試合で、1チームがピッチに出られる人数は？",
    choices: ["9人", "10人", "11人", "12人"],
    answer: 2,
  },
  {
    question: "虹は一般的に何色といわれている？",
    choices: ["5色", "6色", "7色", "8色"],
    answer: 2,
  },
];

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const retryBtn = document.getElementById("retry");

let currentIndex = 0;
let score = 0;

// 問題を表示する
function showQuestion() {
  const q = questions[currentIndex];
  progressEl.textContent = `第${currentIndex + 1}問 / ${questions.length}問`;
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.hidden = true;
  choicesEl.innerHTML = "";

  q.choices.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(i));
    choicesEl.appendChild(btn);
  });
}

// 回答を判定してフィードバックを表示する
function selectAnswer(selected) {
  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice");
  buttons.forEach((b) => (b.disabled = true));
  buttons[q.answer].classList.add("correct");

  if (selected === q.answer) {
    score++;
    feedbackEl.textContent = "正解です！";
    feedbackEl.className = "feedback correct";
  } else {
    buttons[selected].classList.add("wrong");
    feedbackEl.textContent = `不正解です。正解は「${q.choices[q.answer]}」です。`;
    feedbackEl.className = "feedback wrong";
  }

  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";
  nextBtn.hidden = false;
}

// 最終スコアを表示する
function showResult() {
  quizEl.hidden = true;
  resultEl.hidden = false;
  scoreEl.textContent = `${questions.length}問中${score}問正解`;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultEl.hidden = true;
  quizEl.hidden = false;
  showQuestion();
});

showQuestion();
