const questions = [
    {
        question: 'Ai la nguoi giau nhat?',
        answers: [
            'Bill Gate',
            'Toi',
            'ABC',
            'ECF'
        ],
        correct: 0
    },
    {
        question: 'Tinh nao lon nhat VN?',
        answers: [
            'HN',
            'HCM',
            'Nghe An',
            'Can Tho'
        ],
        correct: 2   
    },
];



class altp{
    constructor(){
        this.ui = new ui();
        this.ui.showScreen('welcomeScreen');
        this.currentQuestion = 0;
        this.currentAnswer = null;
        
        this.ui.onStartBtnClick( () => {
            this.start();
        });
        this.bgSound =new AmThanh("background.mp3");
        this.rightSound = new AmThanh('right.mp3');
        this.wrongSound = new AmThanh('wrong.mp3');
        this.waitAnswerSound = new AmThanh('wait_answer.mp3');
        this.questionBgSound = new AmThanh('question_bg.mp3');
    }

    start(){
        this.ui.showScreen('questionScreen')
        this.bgSound.start( () => {
            this.questionBgSound.start();
        });

        this.ui.showQuestion(questions[this.currentQuestion]);
        this.ui.onClickAnswer( (answer) => {
            this.currentAnswer = answer;
            this.ui.setSelectedAnswer(answer);
            this.bgSound.stop();
            this.questionBgSound.stop();
            this.waitAnswerSound.start( () => {
                this.checkAnswer();
            })
        })
    }

    checkAnswer(){
        if (this.currentAnswer == questions[this.currentQuestion].correct) {
            this.rightSound.start(()=> {
                this.ui.resetAnswerStyle();
                if (this.currentQuestion >=1){
                    this.ui.showScreen('WinScreen');
                    document.getElementById('Score2').innerHTML = this.currentQuestion + 1;
                    this.bgSound.start( () =>{
                        this.reset();
                        this.ui.resetAnswerStyle();
                    });
                }else{
                    this.currentQuestion++;
                    document.getElementById('Score').innerHTML = this.currentQuestion;
                    this.start();
                }

            });

        }
        else {
            this.ui.showResult(this.currentAnswer, questions[this.currentQuestion].correct);
            this.wrongSound.start( () =>{
                this.ui.showScreen('GameOverScreen');
                document.getElementById('Score1').innerHTML = this.currentQuestion;
                this.bgSound.start( () =>{
                    this.reset();
                    this.ui.resetAnswerStyle();
                });
                
            });
            
        }
    }

    reset(){
        this.currentQuestion = 0;
        document.getElementById('Score').innerHTML = 0
        this.ui.showScreen('welcomeScreen');
    }
}

var game = new altp();