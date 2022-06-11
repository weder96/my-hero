import { createContext } from 'react';
import { observable, action, makeAutoObservable } from "mobx";
import apiLocal from '../../services/api/apiLocal';

class BucketStore {
  
  public practice: any = []  
  public practiceQuestion: any = []  
  public baseApiCourse: string = "/listBuckets";

  public constructor() {
      makeAutoObservable(this,{        
        practice: observable,
        practiceQuestion:  observable,
        findByBuckets: action
      });
  }

  findByBuckets = () => {          
    apiLocal.get(this.baseApiCourse)
    .then(res =>  this.practice = res.data);
  };
}

export default createContext(new BucketStore());

