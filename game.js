const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
	{
		question: '기후 변화가 꿀벌에게 나쁜 주된 이유는 무엇입니까?',
		explain: '123',
		choice1: '꿀벌은 내열성이 낮습니다',
		choice2: '꿀벌에게 해로운 질병의 증가로 이어진다.',
		choice3: '꿀벌이 살고 생존할 수 있는 곳을 제한합니다.',
		choice4: '1, 2, 3 다',
		answer: 4,
	},
	{
		question: '꿀벌이 책임지는 작물의 비율은 얼마입니까?',
		explain: '123',
		choice1: '50%',
		choice2: '90%',
		choice3: '77%',
		choice4: '32%',
		answer: 2,
	},
	{
		question: '현재 꿀벌을 해치고 있는 침입종은 무엇입니까?',
		explain: '123',
		choice1: '벌집꼬마밑빠진벌레',
		choice2: '장수말벌',
		choice3: '참새',
		choice4: '곰',
		answer: 1,
	},
	{
		question: '꿀벌이 세계 식량 생산을 담당하는 비율은 얼마입니까?',
		explain: '123',
		choice1: '22%',
		choice2: '10%',
		choice3: '35%',
		choice4: '17%',
		answer: 3,
	}
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

		return window.location.assign('end.html')
	}

	questionCounter++
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
	progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
	currentQuestion = availableQuestions[questionsIndex]
	question.innerText = currentQuestion.question

	choices.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	availableQuestions.splice(questionsIndex, 1)

	acceptingAnswers = true
}

choices.forEach(choice => {
	choice.addEventListener('click', e => {
		if(!acceptingAnswers) return

			acceptingAnswers = false
		const selectedChoice = e.target
		const selectedAnswer = selectedChoice.dataset['number']

		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'


		if(!currentQuestion.answer){
			document.getElementById("reaction").style.backgroundImage = "url('thumbsup.gif')";
			
		}else{
			document.getElementById("reaction").style.backgroundImage = "url('thumbsdown.gif')";
			
		}

		if(classToApply === 'correct') {
			incrementScore(SCORE_POINTS)
			action("correct");	
		}else{
			action("incorrect");
		}
		//selectedChoice.parentElement.classList.add(classToApply)

		// setTimeout(() => {
		// 	selectedChoice.parentElement.classList.remove(classToApply)
		// 	getNewQuestion()
		// }, 1000)

		//반응코드
		
	})
})

function action(result){
	if(result == "correct"){
		reaction.innerHTML = "맞았습니다!!";
		reaction.style.backgroundImage = "url('thumbsup.gif')";		
	}else{
		reaction.innerHTML = "틀렸습니다!!";
		reaction.style.backgroundImage = "url('thumbsdown.gif')";	
	}
	reaction.style.display = "block";
}

document.getElementById("reaction").onclick = function(){
	this.style.display = "none";
	getNewQuestion();
}


incrementScore = num => {
	score +=num
	scoreText.innerText = score
}

startGame()






