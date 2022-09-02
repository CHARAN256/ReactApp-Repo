import './Formcomponent.css'
import { useState , useEffect } from 'react';
import moment from 'moment';
import * as action from '../Action/FromAction'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'; 

let pagemode = ''
let studentID = ''

// <Label/> tag texts to be rendered in case of student details creation
const saveModelabels = { 
  FirstNamelabel : 'Please enter your First name :' , 
  LastNamelabel : 'Please enter your Last name :' , 
  FatherNamelabel : "Please enter your Father's name :" , 
  MotherNamelabel : "Please enter your Mother's name :" , 
  DOBlabel:'Please enter DOB (mm/dd/yyyy) :' , 
  Agelabel:'Please enter your age :' ,
  Genderlabel: 'Select your gender :' , 
  Nationalitylabel : 'Select nationality :' }; 

// <Label/> tag texts to be rendered on student details view form    
const viewModelabels = { 
  FirstNamelabel : 'Your First name :' , 
  LastNamelabel : ' Your Last name :' , 
  FatherNamelabel : "Your Father's name :" , 
  MotherNamelabel : "Your Mother's name :" , 
  DOBlabel:'Your DOB:' , 
  Agelabel:'Your age :' ,
  Genderlabel: 'Your gender :' , 
  Nationalitylabel : 'Your nationality :' }; 

//<Label/> tag texts to be rendered for validation messages    
const validationmessages = {
    FirstNamelabel : 'First name needed' , 
    LastNamelabel : ' Last name needed' , 
    FatherNamelabel : "Father's name needed" , 
    MotherNamelabel : "Mother's name needed" , 
    DOBlabel:'Enter your DOB' , 
    Agelabel:'Enter your age' ,
    Genderlabel: 'Choose your gender' , 
    Nationalitylabel : 'Select your nationality'
  };  


function Formcomponent()
{
  //useState hooks declaration for various form operations
  const [UserInputValues , updateUserInputs] = useState({
    'FirstName' : '' , 
    'FatherName' : '' , 
    'LastName' : "" , 
    'MotherName': "" , 
    'DOB':'' , 
    'Age':'' ,
    'Gender': '' , 
    'Nationality' : ''
  })
  const [label , updateFormLabels] = useState(saveModelabels);
  const [message , updateValidationMessages] = useState({FirstNamelabel : '' , 
  FatherNamelabel : '' , 
  LastNamelabel : "" , 
  MotherNamelabel : "" , 
  DOBlabel:'' , 
  Agelabel:'' ,
  Genderlabel: '' , 
  Nationalitylabel : ''})

  const navigate= useNavigate(); 

  useEffect(()=>{
       
    pagemode = new URLSearchParams(window.location.search).get("mode");
    studentID = new URLSearchParams(window.location.search).get("ID");

     if(pagemode === 'view')
     {
      updateFormLabels(viewModelabels)
      
      action.GetStudentDetails(studentID).then(()=>{
        updateUserInputs(action.ActionResponse)
      })
     }
    
     if(pagemode === 'edit')
     {
      action.GetStudentDetails(studentID).then(()=>{
        updateUserInputs(action.ActionResponse)
      })
     }
     

  },[])


  const HandleSubmit = () => {
    let validationMessageObject = {}
    let UserInputMissing = false
    
    for( let key in UserInputValues)
    {
      let value = UserInputValues[key]
      if(value == '' || value == "Select gender")
      {
        UserInputMissing = true
        validationMessageObject[key + 'label'] = validationmessages[key + 'label']
      }
    }
    
    updateValidationMessages(validationMessageObject)

    if(UserInputMissing == false)
    {
      const PostCallback = (response) =>
      {
          navigate('/grid')
      }

      action.FromSubmit(UserInputValues , PostCallback)
      
    }
    
  }

  const HandleUpdate = () => {
    let validationMessage = {}
    let UserInputMissing = false
    
    for( let key in UserInputValues)
    {
      let value = UserInputValues[key]
      if(value == '' || value == "Select gender")
      {
        UserInputMissing = true
        var keyvalue = key + 'label'
        validationMessage[keyvalue] = validationmessages[keyvalue]
      }
    }
    
    updateValidationMessages(validationMessage)

    if(UserInputMissing == false)
    {
      const PostCallback = (response) =>
      {
          navigate('/grid')
      }

      action.FromUpdate(UserInputValues , studentID, PostCallback)
      
    }
  }
    
 
return(
<div>
  <div className='container'>
    <div className='form-left'> 
    <span className='heading'> PERSONAL DETAILS: </span> 
      <div className='input-section'>
      <label className='label-class'>{label.FirstNamelabel}</label>
      <input value={UserInputValues.FirstName} disabled={pagemode == 'view'?true:false} id="first-name" onChange={(event) => {updateUserInputs({...UserInputValues , FirstName:event.target.value})}} className='input-class'></input>
      <label className='label-class validation-label'>{message.FirstNamelabel}</label>
      </div>
      
      <div className='input-section'>
      <label className='label-class'>{label.FatherNamelabel}</label>
      <input value={UserInputValues.FatherName} disabled={pagemode == 'view'?true:false} id="father-name" onInput={(event) => {updateUserInputs({...UserInputValues , FatherName: event.target.value})}} 
      className='input-class'></input>
      <label className='label-class validation-label'>{message.FatherNamelabel}</label>
      </div>

      <div className='input-section'>
      <label className={pagemode == 'view'? 'label-class-disabled':'label-class'}>{label.DOBlabel}</label>
      <DatePicker 
      disabled={pagemode == 'view'?true:false}
      showYearDropdown 
      onChange={(date) => { 
        updateUserInputs({...UserInputValues , DOB : date })}}
      isClearable
      value={ UserInputValues.DOB?moment(UserInputValues.DOB).format('LL') : ''}
      />
      <label className='label-class validation-label'>{message.DOBlabel}</label>
      </div>

      <div className='input-section'>
      <label className='label-class'>{label.Genderlabel}</label>
      <select value={UserInputValues.Gender} disabled={pagemode == 'view'?true:false} id="gender" 
      onChange={(event) => {updateUserInputs({...UserInputValues,Gender:event.target.value})}} 
      type="dropdown" className='input-class'>
        <option>Select gender</option>
        <option>M</option>
        <option>F</option>
        <option>Other</option>
      </select>
      <label className='label-class validation-label'>{message.Genderlabel}</label>
      </div>

    </div>

    <div className='form-right'>
    <button onClick={() => navigate('/grid')} className='grid-class'>View Student Details</button>
      <div className='input-section left-input'>
      <label className='label-class'>{label.LastNamelabel}</label>
      <input value={UserInputValues.LastName} disabled={pagemode == 'view'?true:false} id="last-name"
       onChange={(event) => {updateUserInputs({...UserInputValues , LastName:event.target.value})}} className='input-class'></input>
      <label className='label-class validation-label'>{message.LastNamelabel}</label>
      </div>
      
      <div className='input-section'>
      <label className='label-class'>{label.MotherNamelabel}</label>
      <input value={UserInputValues.MotherName} disabled={pagemode == 'view'?true:false} id="mother-name" 
      onChange={(event) => {updateUserInputs({...UserInputValues , MotherName:event.target.value})}} className='input-class'></input>
      <label className='label-class validation-label'>{message.MotherNamelabel}</label>
      </div>

      <div className='input-section'>
      <label className='label-class'>{label.Agelabel}</label>
      <input type='number' value={UserInputValues.Age} disabled={pagemode == 'view'?true:false} id="age" 
      onChange={(event) => {updateUserInputs({...UserInputValues , Age:event.target.value})}}  className='input-class'></input>
      <label className='label-class validation-label'>{message.Agelabel}</label>
      </div>

      <div className='input-section'>
      <label className='label-class'>{label.Nationalitylabel}</label>
      <div className='checkbox-class'> 
        <label className='nation-label'>
          <input checked={UserInputValues.Nationality == "Indian"?true:false} disabled={pagemode == 'view'?true:false} id="Indian" onChange={(event) => {
            if(event.target.checked)updateUserInputs({...UserInputValues,Nationality:'Indian'})}
            } type="checkbox"/> 
          Indian
        </label>
  
        <label>
            <input checked={UserInputValues.Nationality == "Non-Indian"?true:false} disabled={pagemode == 'view'?true:false} id="non-Indian" 
            onChange={(event) => {
              if(event.target.checked)updateUserInputs({...UserInputValues,Nationality:'Non-Indian'})}
              }
            type="checkbox"/> 
          Non-Indian
        </label>

      </div> 
      <label hidden={false} className='label-class validation-label'>{message.Nationalitylabel}</label>
      </div>

    </div>
    </div>

    <div>
      <button hidden={pagemode == 'view' || pagemode == 'edit'?true:false} onClick={HandleSubmit} className='submit-button'>Submit</button>
      <button hidden={pagemode == '' || pagemode == 'view' || pagemode == undefined?true:false} onClick={HandleUpdate} className='submit-button'>Update</button>
    </div>
</div>  
)

}

export default Formcomponent