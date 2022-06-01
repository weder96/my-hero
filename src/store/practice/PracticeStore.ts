import { createContext } from 'react';
import { observable, action, makeAutoObservable } from "mobx";
import apiLocal from '../../services/api/apiLocal';

class PracticeStore {
  
  public practice: any = []  
  public practiceQuestion: any = []  
  public baseApiCourse: string = "/posts";

  public constructor() {
      makeAutoObservable(this,{        
        practice: observable,
        practiceQuestion:  observable,
        findByPracticeById: action,
        findByPracticeByIdQuestion: action
      });
  }

  findByPracticeById = () => {          
    apiLocal.get(this.baseApiCourse)
    .then(res =>  this.practice = res.data);
  };

  findByPracticeByIdQuestion = (id: number) => {          
    apiLocal.get(this.baseApiCourse+'/practice/'+id)
    .then(res =>  this.practiceQuestion = res.data);
  };

}

export default createContext(new PracticeStore());

