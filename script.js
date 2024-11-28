const questions = [
    {
      question: 'What is the correct way to declare a variable in JavaScript?',
      answers: [
        'let x = 5;',
        'x = 5;',
        'variable x = 5;'
      ],
      correct: 0
    },
    {
      question: 'Which operator is used for strict equality comparison in JavaScript?',
      answers: [
        '==',
        '===',
        '=',
      ],
      correct: 1
    },
    {
      question: 'What does the "typeof" operator return for an array?',
      answers: [
        'array',
        'object',
        'undefined'
      ],
      correct: 1
    },
    {
      question: 'Which method is used to add new elements to the end of an array?',
      answers: [
        'push()',
        'append()',
        'addToEnd()'
      ],
      correct: 0
    },
    {
      question: 'Which keyword is used to prevent a variable from being redeclared?',
      answers: [
        'const',
        'let',
        'var'
      ],
      correct: 0
    },
    {
      question: 'What does the "NaN" stand for in JavaScript?',
      answers: [
        'Not a Null',
        'Not a Number',
        'Null and Null'
      ],
      correct: 1
    },
    {
      question: 'Which loop is used to iterate over the properties of an object?',
      answers: [
        'for loop',
        'while loop',
        'for...in loop'
      ],
      correct: 2
    },
    {
      question: 'Which function is used to convert a string to a number in JavaScript?',
      answers: [
        'parseInt()',
        'parseFloat()',
        'Number()'
      ],
      correct: 2
    },
    {
      question: 'What does the "this" keyword refer to in JavaScript?',
      answers: [
        'The parent function',
        'The global object',
        'The current object'
      ],
      correct: 2
    },
    {
      question: 'Which event occurs when the user clicks on an HTML element?',
      answers: [
        'onmouseover',
        'onchange',
        'onclick'
      ],
      correct: 2
    }
  ];

// get selectors for quiz and template
const quiz = document.querySelector('#quiz');
const template = document.querySelector('template');

const totalOfQuestions = questions.length;
const correctAnswers = new Set();
const showTotal = document.querySelector('#correctAnswers span');

showTotal.textContent = correctAnswers.size + ' of ' + totalOfQuestions;

// iterate on all the questions
for (const item of questions) {
    // clone tamplate node content
    const quizItem = template.content.cloneNode(true);

    // update h3 text content with a question
    quizItem.querySelector('h3').textContent = item.question;
    
    // iterate on all answers (we have three possible answers for each question)
    for (const answer of item.answers) {
        // get selector for dl dt block
        const dt = quizItem.querySelector('dl dt').cloneNode(true);

        // update span text content with an answer
        dt.querySelector('span').textContent = answer;

        // set dynamic name attribute for the input radio buttons based on the question
        dt.querySelector('input').setAttribute('name', 'question-' + questions.indexOf(item));
        
        // set dynamic value attribute for the input radio buttons based on the answer
        dt.querySelector('input').value = item.answers.indexOf(answer);

        // radio button change event listener
        dt.querySelector('input').onchange = (e) => {
          const isCorrect = e.target.value == item.correct;

          // clear the result to set the correct one again
          correctAnswers.delete(item);

          // check it correct, if so add it to the set list
          if (isCorrect) {
            correctAnswers.add(item);
          }

          showTotal.textContent = correctAnswers.size + ' of ' + totalOfQuestions;
        }

        // append a new answer using the internal loop
        quizItem.querySelector('dl').appendChild(dt);
    }

    // discard the first answer that was used only as a clone for the others
    quizItem.querySelector('dl dt').remove();

    // append the template node, i.e. a whole new question with all the possible answers
    quiz.appendChild(quizItem);
}