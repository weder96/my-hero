import { observable, action, makeAutoObservable } from "mobx";

class MessageStore {
    public message: any;

    public constructor() {
        makeAutoObservable(this,{
            message: observable,
            exibirMensagensErro: action,
            exibirMensagensSucesso: action,
            exibirMensagensWarn: action,
            exibirMensagensInfo: action
        });
    } 
    
   /**
     * Método genérico responsável por mostrar as mensagens de erro
     * @param {Array} erros
     */
    exibirMensagensErro(erros: any) {
        this.message.show(
            erros.map((msg: any) => {
                return { life: 8000, severity: 'error', summary: 'Error', detail: msg };
            })
        );
    }

    /**
     * Método genérico responsável por mostrar as mensagens de sucesso
     * @param {Array} sucess
     */
    exibirMensagensSucesso(sucess: any) {
        this.message.show(
            sucess.map((msg: any) => {
                return { life: 8000, severity: 'success', summary: 'Sucesso' , detail: msg };
            })
        );
    }

     /**
     * Método genérico responsável por mostrar as mensagens de Info
     * @param {Array} info
     */
      exibirMensagensInfo(info: any) {
        this.message.show(
            info.map((msg: any) => {
                return { life: 8000, severity: 'info', summary: 'Info' , detail: msg };
            })
        );
    }

      /**
     * Método genérico responsável por mostrar as mensagens de warnning
     * @param {Array} warn
     */
       exibirMensagensWarn(warn: any) {
        this.message.show(
            warn.map((msg: any) => {
                return { life: 8000, severity: 'warn', summary: 'warnning' , detail: msg };
            })
        );
    }
}

const messageStore = new MessageStore();
export default messageStore;
