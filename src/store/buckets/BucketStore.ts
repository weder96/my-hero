import { createContext } from 'react';
import { observable, action, makeAutoObservable } from "mobx";
import apiLocal from '../../services/api/apiLocal';

class BucketStore {
  
  public buckets: any = [] 
  public objects: any = []  
  public isMobile: boolean = false;
  public isCreate: boolean = false;
  public nameCreated: string = "";
  public practiceQuestion: any = []  
  public baseApiBucket: string = "/api/v1/profile";

  public constructor() {
      makeAutoObservable(this,{        
        buckets: observable,
        objects: observable,
        isMobile: observable,
        isCreate: observable,
        nameCreated: observable,
        practiceQuestion:  observable,
        findByBuckets: action,
        findObjectsByName: action,
        uploadFilesS3: action,
        createBucket: action,
      });
  }

  findByBuckets = () => {   
    let urlProfile = '/listBuckets'       
    apiLocal.get(this.baseApiBucket+ urlProfile)
    .then(res =>  this.buckets = res.data);
  };

  findObjectsByName = (nameBucket: string) => {         
    apiLocal.get(this.baseApiBucket+"/bucket/"+nameBucket)
    .then(res =>  this.objects = res.data);
  };

  uploadFilesS3 = (files: any, bucket: string, profileId: string) => {
    let url = "/image/upload";
    let formData = new FormData();
    formData.append('file', files);
    formData.append('bucket', bucket);
    apiLocal.post(this.baseApiBucket+"/"+profileId+"/"+url, formData,  { headers: { 'Content-Type': 'multipart/form-data'}})
            .then(res => {
              this.isMobile =  true;
            })
             
  }
  createBucket = ( bucket: string) => {
    let url = "createBucket";
    apiLocal.post(this.baseApiBucket+"/"+url, bucket)
            .then(res => {
              console.log('createBucket ', res)
              this.nameCreated =  bucket;
              this.isCreate =  true;
            })      
  } 

  setIsMobile = (change: boolean) => {
    this.isMobile = change;
  }

  setIsCreate = (change: boolean) => {
    this.isCreate = change;
  }

}

export default createContext(new BucketStore());

