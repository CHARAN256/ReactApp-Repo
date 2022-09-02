import Popup from 'reactjs-popup';
import { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import DatePicker from "react-datepicker";
import '../Component/Filtercomponent.css'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; 



const Filtercomponent = (props) => {

const naviagte = useNavigate();    
const FilterDefaultObject = {
    'FirstName' : '' , 
    'FatherName' : '' , 
    'LastName' : "" , 
    'MotherName': "" , 
    'DOB':'' , 
    'Age':0 ,
    'Gender': '' , 
    'Nationality' : ''
}

const [FilterValues , UpdateFilterValues] = useState(FilterDefaultObject);
const [DisplayPopup , UpdatePopupDisplay] = useState(false)
//{close => (<div></div>)}
return(
<div>    
<button onClick={() => naviagte('/')} className='new-details'>Create New Student Details</button>
<Popup disabled={DisplayPopup} position={'left center'} trigger={<div className="filter-class"><BsFilter></BsFilter></div>}>
{close => (
<div>

<div className='filter-top'>
                <div className="popup-container">

                    <div className='popup-right'>

                    <div className="popup-label">       
                    <div className="popup-label-col">First Name</div>
                    <div className="popup-label-col">Last Name</div>
                    <div className="popup-label-col">Father Name</div>
                    <div className="popup-label-col">Nationality</div>

                    </div>

                    <div className="popup-input">
                    <input onChange={(event) => {UpdateFilterValues({...FilterValues , FirstName : event.target.value })}} value={FilterValues.FirstName} className="popup-input-col"></input>
                    <input onChange={(event) => {UpdateFilterValues({...FilterValues , LastName : event.target.value })}} value={FilterValues.LastName} className="popup-input-col"></input>
                    <input onChange={(event) => {UpdateFilterValues({...FilterValues , FatherName : event.target.value })}} value={FilterValues.FatherName} className="popup-input-col"></input>
                    <select onChange={(event) => {UpdateFilterValues({...FilterValues , Nationality : event.target.value })}} value={FilterValues.Nationality} className="select-input">
                        <option>Select Nationality</option>
                        <option>Indian</option>
                        <option>Non-Indian</option>
                    </select>                       
                    </div>    

                    </div>

                    <div className='popup-left'>

                    <div className="popup-label">                    
                    <div className="popup-label-col">Age</div>
                    <div className="popup-label-col">DOB</div>
                    <div className="popup-label-col">Mother Name</div>
                    <div className="popup-label-col">Gender</div>                    
                    </div>

                    <div className="popup-input">
                    <div className='age-class'>   
                    <input min={0} max={80} step={1} onChange={(event) => {UpdateFilterValues({...FilterValues , Age : event.target.value })}} value={FilterValues.Age} type='range' className="popup-input-col age-left"></input>
                    <span className='age-right'>{FilterValues.Age}</span>
                    </div>
                    <DatePicker onChange={(date) => {UpdateFilterValues({...FilterValues , DOB : date})}} value={FilterValues.DOB?moment(FilterValues.DOB).format('LL') : ''} className="popup-input-col-datepicker" showYearDropdown isClearable/>
                    <input onChange={(event) => {UpdateFilterValues({...FilterValues , MotherName : event.target.value })}} value={FilterValues.MotherName} className="popup-input-col"></input>
                    <select onChange={(event) => {UpdateFilterValues({...FilterValues , Gender : event.target.value })}} value={FilterValues.Gender} className="select-input">
                        <option>Select Gender</option>
                        <option>M</option>
                        <option>F</option>
                        <option>Other</option>
                    </select>          
                    </div>    

                    </div>
                </div>
            </div>
        <div className='filter-bottom'>
        <button onClick={ () => {props.setFilter(FilterValues); close()}} className='filter-apply'>Apply Filter</button>
        <button onClick={ () => { UpdateFilterValues(FilterDefaultObject); props.setFilter('Reset'); close();}} className='filter-reset'>Reset Filter</button>
        </div> 

</div>
)}
           
        </Popup>
        
        </div>    )
}

export default Filtercomponent