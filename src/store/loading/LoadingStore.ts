import { observable, action, makeAutoObservable } from "mobx";

class LoadingStore {
    public loading: number = 0;

    public constructor() {
        makeAutoObservable(this,{
            loading: observable,
            incrementLoading: action,
            decrementLoading: action
        });
    } 
    
    public incrementLoading = () => {
        this.loading++;
        document.body.classList.add('loading-indicator');        
    };

    public decrementLoading = () => {
        this.loading--;        
        if(this.loading <= 0){
            this.loading = 0;
            document.body.classList.remove('loading-indicator');
        }
    };
}

const appStore = new LoadingStore();
export default appStore;
