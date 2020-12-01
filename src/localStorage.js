export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('oway_travel');
        if(serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState);
    }catch (err) {
        return undefined;
    }
}
export const saveState = (state) => {
    //console.log("saving State",state);
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('oway_travel', serializedState);
    }catch (err) {
        // Ignored wirte err
        console.log("Setting in Local Storage Failed")
    }
}