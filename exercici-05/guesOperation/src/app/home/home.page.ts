import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  num:number;
  num1:number = this.randomNum(0,100);
  num2:number = this.randomNum(0,100);
  sum:number;
  
  result:string;
  resultArray:string[]=["Resposta correcta", "T'has quedat curt!", "T'has passat de llarg!"];

  check:boolean=false;
  fail:boolean=false;
  
  sound:any;
  audio=new Audio();
  audioTime:any;

  constructor() {}

  randomNum(a, b){
    return Math.round(Math.random() * (b - a) + parseInt(a, 10));
  }

  checkAnswer(){
    this.calculateSum();

    if(this.sum == this.num){
      this.result=this.resultArray[0];
      this.check=true;
      this.fail=false;
      this.sound="../../assets/sounds/correct.mp3";
    }
    else if(this.sum > this.num){
      this.result=this.resultArray[1];
      this.fail=true;
      //TODO: upload de sound file fail.mp3
    }
    else if(this.sum < this.num){
      this.result=this.resultArray[2];
      this.fail=true;
      //TODO: upload de sound file fail.mp3
    }

    this.play(this.sound);
  }

  calculateSum() {
    this.sum=this.num1+this.num2;
  }

  play(sound:any) {
    this.pauseAudio(sound);

    this.audio.src=sound;
    this.audio.load();
    this.audio.play();

    this.audioTime=setTimeout(() =>{
      sound.playing=false;
    }, sound.duration*1000);
  }

  private pauseAudio(selectedSound: any){
    clearTimeout(this.audioTime);

    this.audio.pause();
  }
}