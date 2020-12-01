export default function changeDurationFormat(second) {
    if(second >3600){
        let hour = Math.floor(second/3600);
        let minutes = Math.ceil((second-(hour*3600))/60);
        return `${hour} Hrs ${minutes} Mins`
    }else{
        let minutes = Math.ceil(second/60);
        return `${minutes} Mins`
    }
}