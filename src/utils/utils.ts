import moment from "moment";

export const formatedDate =(inputDate:string) => {
    return moment(inputDate).format('DD-MM-YYYY HH:mm:ss');
}