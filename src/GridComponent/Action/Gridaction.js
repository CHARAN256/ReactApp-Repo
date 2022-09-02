import axios from 'axios'

export function GetGridDetails(callBack , size , FilterObj){

    try{
        let paramObj = {responseSize:size}
        if(FilterObj != undefined)
        {
            paramObj.FilterObj = FilterObj
        }
        axios.get('https://rocky-fortress-40676.herokuapp.com/' , {params:paramObj}).then(async (response) => {
        console.log('response',response);   
        await callBack(response);
        })
    }
    catch(error){
        console.log('error',error)
    }

}

export function DeleteGridDetail(selectedID , callBack , size){

    try{
        axios.delete('https://rocky-fortress-40676.herokuapp.com/' , {params:{ObjID:selectedID , responseSize:size}}).then(async (response) => {   
        await callBack(response);
        })
    }
    catch(error){
        console.log('error',error)
    }

}