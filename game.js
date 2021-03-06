const question = document.querySelector("#question"); 
const choices = Array.from(document.querySelectorAll(".choice-text")); 
const progressText = document.querySelector("#progressText"); 
const scoreText = document.querySelector("#scoreText"); 
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 4 + 2?',
        choice1: '2',
        choice2: '22',
        choice3: '11',
        choice4: '6',
        answer: 4,
    },
    {
        question: 'When did Nigeria gain  it\'s independence?',
        choice1: '1998',
        choice2: '1955',
        choice3: '1960',
        choice4: '1963',
        answer: 4,
    },
    {
        question: 'What is ComplusTech major project?',
        choice1: 'Chiurch+',
        choice2: 'Church+',
        choice3: 'Church Plus',
        choice4: 'Churchplus',
        answer: 3,
    },
    {
        question: 'Who was the first ever Software Developer?',
        choice1: 'Alan Turing',
        choice2: 'Scott Adams',
        choice3: 'Alfred Aho',
        choice4: 'Michael Abrash',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() === availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
       const number = choice.dataset['number'] 
       choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number'] 

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

// Andrew Mead check him out on YouTube.

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame ()