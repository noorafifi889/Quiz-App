class Question {
  constructor(id, text, choice, correctAnswer) {
    this.id = id;
    this.text = text;
    this.choice = choice;
    this.correctAnswer = correctAnswer.trim();
    this.userAnswer = null;
  }
  //validation answer
  isCorrect() {
  return (
    this.userAnswer && this.correctAnswer.trim() === this.userAnswer.trim()
  );
  }
}

class Quiz {
  constructor() {
    this.questions = [];
  }
  addQuestion(question) {
    this.questions.push(question);
  }
  //reset quiz
  reset() {
    this.questions.forEach((q) => (q.userAnswer = null));
  }
  // score quiz
  getScore() {
    return this.questions.filter((q) => q.isCorrect()).length;
  }
}

const quiz = new Quiz();

quiz.addQuestion(
  new Question(
    1,
    "Which of the following is an example of social engineering?",
    [
      "B. Updating the operating system",
      "A. Sending a fake link via email",
      "C. Using antivirus software",
    ],
    "A. Sending a fake link via email"
  )
);
quiz.addQuestion(
  new Question(
    2,
    "CSS stands for Cascading Style Sheets",
    ["A. true", "B. false"],
    "A. true"
  )
);
quiz.addQuestion(
  new Question(
    3,
    "Which HTML tag is used to create a hyperlink?",
    ["A. <a>", "B. <link>", "C. <href>"],
    "A. <a>"
  )
);
quiz.addQuestion(
  new Question(
    4,
    "In JavaScript, what does document.getElementById('demo') do?",
    [
      "A. Gets the HTML element with id='demo' ",
      "B. Creates a new element with id='demo'",
      "C. Deletes the element with id='demo'",
    ],
    "A. Gets the HTML element with id='demo' "
  )
);
quiz.addQuestion(
  new Question(
    5,
    "Which CSS property is used to change the text color?",
    ["A. font-style ", "B. color", "C. background-color"],
    "B. color"
  )
);
quiz.addQuestion(
  new Question(
    6,
    "Which JavaScript method writes output to the console?",
    ["A. console.log()", "B. document.write()", "C. alert()"],
    "A. console.log()"
  )
);
quiz.addQuestion(
  new Question(
    7,
    "Which HTML attribute specifies an image source?",
    ["A. src", "B. href", "C. link"],
    "A. src"
  )
);
quiz.addQuestion(
  new Question(
    8,
    "Which CSS property makes text bold?",
    ["A. font-weight", "B. text-style", "C. font-style"],
    "A. font-weight"
  )
);
quiz.addQuestion(
  new Question(
    9,
    "HTML stands for HyperText Markup Language.",
    ["A. True", "B. False"],
    "A. True"
  )
);
quiz.addQuestion(
  new Question(
    10,
    "CSS is used for programming logic in web pages.",
    ["A. True", "B. False"],
    "B. False"
  )
);

class Storage {
  #key;

  constructor(key) {
    this.#key = key; // key that i will store info
  }

  getList() {
    const stored = localStorage.getItem(this.#key);
    return stored ? JSON.parse(stored) : [];
  }
  saveList(item) {
    localStorage.setItem(this.#key, JSON.stringify(item));
  }
  clear() {
    localStorage.removeItem(this.#key);
  }
}

const questionContainer = document.getElementById("container-question");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const scoreResult = document.getElementById("result");

const storage = new Storage("answer");

const savedAnswers = storage.getList();
if (savedAnswers.length) {
  quiz.questions.forEach((q, i) => {
    q.userAnswer = savedAnswers[i];
  });
}

function renderQuiz() {
  questionContainer.innerHTML = "";
  quiz.questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("box");

    const numberQustion = document.createElement("p");
    numberQustion.classList.add("number-qustion");
    numberQustion.textContent = `Question ${index + 1}`;

    const questionText = document.createElement("p");
    questionText.textContent = q.text;
    questionText.classList.add("questionName");

    div.appendChild(numberQustion);
    div.appendChild(questionText);

    q.choice.forEach((choice, i) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + index;
      input.id = `q${index}-choice${i}`;
      input.value = choice;
      if (q.userAnswer === choice) input.checked = true;

      input.onchange = () => {
        q.userAnswer = choice;

        storage.saveList(quiz.questions.map((q) => q.userAnswer));
      };

      const label = document.createElement("label");
      label.textContent = choice;
      label.setAttribute("for", input.id);

      div.appendChild(input);
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    questionContainer.appendChild(div);
  });
}

renderQuiz();

resetBtn.addEventListener("click", () => {
  quiz.reset();
  storage.clear();
  renderQuiz();
  scoreResult.textContent = "";
});

submitBtn.addEventListener("click", () => {
  const score = quiz.getScore();
  const total = quiz.questions.length;
  scoreResult.textContent = `Score ${score} out of ${total}`;
  scoreResult.textContent += score / total >= 0.7 ? " :) Passed" : " :( Failed";

  quiz.questions.forEach((q, index) => {
    const div = questionContainer.children[index];
    div.style.backgroundColor = q.isCorrect() ? "#d4edda" : "#f8d7da";
  });

  // مسح التخزين بعد انهاء الامتحان
  storage.clear();
});
