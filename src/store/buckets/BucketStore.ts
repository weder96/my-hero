import { createContext } from 'react';
import { observable, action, makeAutoObservable } from "mobx";
import apiLocal from '../../services/api/apiLocal';

class BucketStore {
  
  public buckets: any = [] 
  public objects: any = []  
  public isMobile: boolean = false;
  public practiceQuestion: any = []  
  public baseApiBucket: string = "/listBuckets";

  public constructor() {
      makeAutoObservable(this,{        
        buckets: observable,
        objects: observable,
        isMobile: observable,
        practiceQuestion:  observable,
        findByBuckets: action,
        findObjectsByName: action,
        uploadFilesS3: action,
      });
  }

  findByBuckets = () => {          
    apiLocal.get(this.baseApiBucket)
    .then(res =>  this.buckets = res.data);
  };

  findObjectsByName = (nameBucket: string) => {          
    apiLocal.get(nameBucket)
    .then(res =>  this.objects = res.data);
  };

  setIsMobile = (change: boolean) => {
    this.isMobile = change;
  }

  uploadFilesS3 = (files: any, bucket: string) => {
    let url = "save-file";
    let formData = new FormData();
    formData.append('file', files);
    formData.append('bucket', bucket);
    apiLocal.post(url, formData,  { headers: { 'Content-Type': 'multipart/form-data'}})
            .then(res => {
              console.log('res', res)
              this.isMobile =  true;
            })
             
  } 
}

export default createContext(new BucketStore());

