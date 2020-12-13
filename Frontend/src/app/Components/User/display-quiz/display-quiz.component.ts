import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription,timer} from 'rxjs';
import { correctAnswers } from 'src/app/Class/answer';
import { Question } from 'src/app/Class/question';
import { State } from 'src/app/Class/state';
import { QuizStateService } from 'src/app/services/admin/quiz-state.service';
import { VerifyAnswerService } from 'src/app/services/admin/verify-answer.service';
import { QuestionsService } from 'src/app/services/user/questions.service';



@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  // quizId:any;
  // questionList:any;


  score: number = 0;
  questions = new Question();
  answerArray: correctAnswers[] = [];
  list: any = [];
  typeName: any;
  questionId: any;
  quizId: any;
  categoryId: any;
  QuestionList: any;
  countDown!: Subscription;
  counter = 1800;
  tick = 1000;
  newQuizId: any;
  ans: any;
  correctans: any;
  a!:string;
 
  constructor(private route:ActivatedRoute,private r:Router,private service:QuestionsService,
    private verifyAnswerService: VerifyAnswerService,
    private quizStateService: QuizStateService) { 
  
      this.route.paramMap.subscribe((p: ParamMap) => {
        this.quizId = p.get("id");
        console.log("quiz id is : " + this.quizId);
        this.storeQuizId(this.quizId);
      });
      this.getQuestion(this.quizId);
  }

  ngOnInit(): void {
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
  }

  getQuestion(quizId: number) {
    console.log("in fun");
    this.categoryId = sessionStorage.getItem("categoryId");
    return this.service.displayQuestion(quizId, this.categoryId)
      .subscribe(
        data => {
          // console.log(data);
          this.QuestionList = data;
          console.log(this.QuestionList, "Qusetion lIst")
          Object.keys(this.QuestionList).map((ele) => {
            this.QuestionList[ele] = { ...this.QuestionList[ele], found: null, selectedOption: null }
            console.log(this.QuestionList.questionId);
          })

          console.log(this.QuestionList.length, "Array xyzfhgfh");
          sessionStorage.removeItem("categoryId");
        }
      );
  }
  // found: boolean;
  // queId: number;
  cans: any;
  flag: boolean = true;
  queId1: any;
  result: any;
  //  state = new State(this.result,1,this.queId1, this.newQuizId);

  //   addState(){
  //     alert("in state fun");
  //     this.quizStateService.addState(this.state).subscribe(state=>{
  //       console.log(state , "state data11");
  //       alert(state);
  //     })
  //   }

  storeQuizId(id: any) {
    this.newQuizId = id;
  }
  question(Qid: any, Aid: any, index: any) {
    //this.addState();
    console.log();


    this.queId1 = Qid;
    this.result = Aid;
    console.log("Question id is : " + Qid);
    console.log("Answer id is : " + Aid);
    var obj = new correctAnswers(Qid, Aid);


    const state = new State(Aid, 1, Qid, this.newQuizId);

    this.quizStateService.addState(state).subscribe(state => {
      console.log(state, "state data11");
      alert(state);
    })

    // this.found =true;
    // console.log(this.QuestionList[Qid]);
    // let index = this.QuestionList.findIndex(ele => ele.id === Qid);
    // this.QuestionList[Qid].found = true;
    this.QuestionList[index] = { ...this.QuestionList[index], found: true, selectedOption: Aid }

    console.log(this.QuestionList, "hello");

    if (this.answerArray.length == 0) {

      this.answerArray.push(obj);

    }
    else {
      for (let i = 0; i < this.answerArray.length; i++) {
        alert(this.answerArray[i].id + "" + Qid);

        if (this.answerArray[i].id === Qid) {
          this.answerArray[i].userAnswer = obj.userAnswer;
          this.flag = false
          break;
        }

      }
      if (this.flag == true) {
        this.answerArray.push(obj);

      }
    }



    console.log("answer array : ", this.answerArray);

    return this.verifyAnswerService.verifyAnswer(Qid).subscribe(data => {
      // this.a="";
      this.ans = data;
      this.verifyAnswerService.answer = data;
      console.log("Array Is ", data);

      console.log("answer is" + this.ans[0].answer);
      this.a = this.ans[0].answer;


      if (Aid === this.ans[0].answer) {
        //  this.score=this.score+1;


        this.flag = false;

        console.log(++this.score + "score is");


        alert("Right answer");
        console.log("Right Ans" + this.ans[0].answer);
      }
    });
  }

}
