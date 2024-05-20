function rotateImage() {
    const img = document.getElementById('rotatingImage'); // Get the image element
    img.style.transform = 'rotate(360deg)'; // Apply rotation transform
}

// Event listener to rotate the image when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(rotateImage, 1000); // Rotate image after a delay (e.g., 1 second)
});

document.addEventListener('DOMContentLoaded', () => {
    const articleContainers = document.querySelectorAll('.article-container');

    if (articleContainers.length) {
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {entries.forEach(entry => {
      console.log(entry);
      if (entry.isIntersecting) {
        console.log('Adding opaque class');
        entry.target.classList.add('opaque');
      } else {
        console.log('Removing opaque class');
        entry.target.classList.remove('visible');
      }
     
});
    }, observerOptions);

    articleContainers.forEach(container => {
    observer.observe(container);
    });
  } else {
    console.error('Image heading container not found!');
  }
});


// Function to handle intersection changes
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is in the viewport
            entry.target.classList.add('visible');
        } else {
            // Element is out of the viewport
            entry.target.classList.remove('visible');
        }
    });
}

// Create a new Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5 // Trigger when 50% of the element is in viewport
});

// Select the elements you want to observe (elements with a specific class)
const elementsToObserve = document.querySelectorAll('.element-to-observe');

// Iterate over each element and start observing
elementsToObserve.forEach(element => {
    observer.observe(element);
});

const quizData = [
  {
      question: "What is Ayahuasca?",
      options: ["A. A type of Amazonian fruit", "B. A psychoactive brew made from plants", "C. A traditional dance of indigenous tribes", "D. An ancient form of martial arts"],
      answer: "B"
  },
  {
      question: "Which plant is a key ingredient in Ayahuasca?",
      options: ["A. Cannabis", "B. Coca leaves", "C. Banisteriopsis caapi vine", "D. Ginseng root"],
      answer: "C"
  },
  {
      question: "What is the main psychoactive compound in Ayahuasca?",
      options: ["A. THC (Tetrahydrocannabinol)", "B. LSD (Lysergic acid diethylamide)", "C. DMT (Dimethyltryptamine)", "D. Psilocybin"],
      answer: "C"
  },
  {
      question: "How is Ayahuasca traditionally used by indigenous tribes?",
      options: ["A. To treat physical injuries", "B. In spiritual ceremonies and healing rituals", "C. As a cooking ingredient", "D. None of the above"],
      answer: "B"
  },
  {
      question: "What effects are commonly reported by individuals who consume Ayahuasca?",
      options: ["A. Increased appetite", "B. Heightened spiritual experiences", "C. Reducing anxiety", "D. Improved memory"],
      answer: "B"
  },
  {
      question: "Which area of mental health research has shown interest in the therapeutic potential of Ayahuasca?",
      options: ["A. Treatment of diabetes", "B. Managing chronic pain", "C. Addressing addiction and depression", "D. Improving eyesight"],
      answer: "C"
  },
  {
      question: "What safety considerations are important before using Ayahuasca?",
      options: ["A. Check for contraindications with existing medications", "B. Ensure the presence of experienced facilitators or shamans", "C. Understand potential psychological effects", "D. All of the above"],
      answer: "D"
  },
  {
      question: "Ayahuasca is often referred to as:",
      options: ["A. The Vine of Dreams", "B. The Flower of Healing", "C. The Vine of the Soul", "D. The Leaf of Enlightenment"],
      answer: "C"
  }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function displayQuestion() {
  if (currentQuestion < quizData.length) {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    for (let i = 0; i < questionData.options.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = questionData.options[i].charAt(0); // Set value to the letter of the option
      radio.required = true;

      const optionText = document.createTextNode(questionData.options[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  } else {
    displayResult();
  }
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    displayQuestion();
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

