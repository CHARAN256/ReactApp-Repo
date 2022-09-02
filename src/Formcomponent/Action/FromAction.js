import Axios from "axios";

export let ActionResponse = {}

export function FromSubmit(UserInputs , PostCallback)
{
    try{
        Axios.post('https://rocky-fortress-40676.herokuapp.com/' , UserInputs).then(async (response) => {
           await PostCallback(response);
        })

    }
    catch(error){
        console.log('error',error)
    }
}

export async function GetStudentDetails(ID)
{
    try{
        await Axios.get('https://rocky-fortress-40676.herokuapp.com/' , {params:{studentID:ID}}).then((response) => {            
            ActionResponse = response.data;
        })
    }
    catch(error){
        console.log('error',error)
    }
}

export function FromUpdate(UserInputs , studentID , PostCallback)
{
    UserInputs.ObjID = studentID
    try{
        
        Axios.patch('https://rocky-fortress-40676.herokuapp.com/' , UserInputs).then( async(response) => {
            await PostCallback(response);
        })
    }
    catch(error){
        console.log('error',error)
    }
}