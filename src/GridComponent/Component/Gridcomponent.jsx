import { useEffect , useState } from "react"
import * as action from '../Action/Gridaction'
import './Gridcomponent.css'
import moment from 'moment';
import { BsFillPencilFill , BsFillTrashFill , BsEyeFill , BsFilter} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'; 
import {Modal, ModalBody} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import Filter from '../../FilterComponent/Component/Filtercomponent'

let GridDetailsSize = 5
let TotalResponseSize = 30
let GridActionResponse = [] 
let TotalDocuments = 0
let selectedDetailDelete = ''
let FilterQuery = ''
let DisplayNoDetails = false;


function Gridcomponent()
{
    const [ShowLoadMore , updateShowLoadMore] = useState(false)
    const [gridDetails , updateGridDeatils] = useState([])
    const [modelState , updateModalState] = useState(false)
    const navigate= useNavigate(); 

    const callBack = (response) => {
        if(response.data.details != undefined && response.data.details.length > 0)
        {
            response.data.details.map((value,key)=>{
            value.DOB = moment(value.DOB).format("LL")
            })
            GridActionResponse = response.data.details
            TotalDocuments = GridActionResponse.length
            updateGridDeatils(GridActionResponse.slice(0,GridDetailsSize)) 
            DisplayNoDetails = false;
            updateShowLoadMore(true)
        }

        else
        {
            updateGridDeatils({})
            DisplayNoDetails = true;
            updateShowLoadMore(false)
        }
        
    }
 
    const setFilter = (FilterObj) => {
        FilterQuery =  FilterObj;
        TotalResponseSize = 30;
        GridDetailsSize = 5;
       action.GetGridDetails(callBack , TotalResponseSize , FilterObj)
    }

    const Sort = (Column , Order) => {
        if(Column != 'DOB')
        {
            let sorted = gridDetails.sort((value1 , value2) => {
                if (value1[Column].toLowerCase() < value2[Column].toLowerCase()) {
                    return  Order == 'Ascending'?-1:1;
                }
                if (value1[Column].toLowerCase() > value2[Column].toLowerCase()) {
                    return  Order == 'Descending'?-1:1;
                }
                return 0;
            })
            updateGridDeatils([...sorted]);
        }
        
        else
        {
            let sorted = gridDetails.sort((value1 , value2) => {
                let Date1 = new Date(value1[Column]).getTime();
                let Date2 = new Date(value2[Column]).getTime();

                if (Date1 < Date2) {
                    return  Order == 'Ascending'?-1:1;
                }
                if (Date1 > Date2) {
                    return  Order == 'Ascending'?1:-1;
                }
                return 0;
            })
            updateGridDeatils([...sorted]);
        }     
    
    }

    useEffect(()=>{
     action.GetGridDetails(callBack , TotalResponseSize);
    },[])

    return(
    <div className="container-grid">
        <Filter setFilter = {setFilter} />
    <table className="container-table">
        <thead>
            <tr className="table-row">

                <td  className="table-value">First Name
                <span onClick={() => Sort('FirstName' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('FirstName' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Last Name
                <span onClick={() => Sort('LastName' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('LastName' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Father Name
                <span onClick={() => Sort('FatherName' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('FatherName' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Mother Name
                <span onClick={() => Sort('MotherName' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('MotherName' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Date Of Birth
                <span onClick={() => Sort('DOB' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('DOB' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Age
                <span onClick={() => Sort('Age' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('Age' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Gender
                <span onClick={() => Sort('Gender' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('Gender' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Nationality
                <span onClick={() => Sort('Nationality' , 'Ascending')} className="arrow up"></span>
                <span onClick={() => Sort('Nationality' , 'Descending')} className="arrow down"></span>
                </td>

                <td  className="table-value">Action</td>
            </tr>
        </thead>
        <tbody>
        {
         gridDetails.length >= 1?gridDetails.map((val, key) => {return (
            <tr className="table-row" key={key}>
                <td className="table-value">{val.FirstName}</td>
                <td className="table-value">{val.LastName}</td>
                <td className="table-value">{val.FatherName}</td>
                <td className="table-value">{val.MotherName}</td>
                <td className="table-value">{val.DOB}</td>
                <td className="table-value">{val.Age}</td>
                <td className="table-value">{val.Gender}</td>
                <td className="table-value">{val.Nationality}</td>
                <td id="deletetag" className="table-value">
                <BsFillPencilFill onClick={() => { GridDetailsSize = 5; navigate('/?mode=edit&ID=' + val._id)}} className="action-icons" />
                <BsFillTrashFill onClick={() => { updateModalState(true) 
                    selectedDetailDelete = val._id} } className="action-icons" />
                <BsEyeFill onClick={() => { GridDetailsSize = 5; navigate('/?mode=view&ID=' + val._id)}} className="action-icons" />
                </td></tr>
            )
        }) : null
        }            
        </tbody>
    </table>
    <div className="button-classes">
    
    <Modal toggle={() => {updateModalState(false)}} modalTransition={{ timeout: 500 }} isOpen={modelState}>
        <ModalBody>
            
            <div className="popup-message">
            Are you sure, You want to Delete?
            </div>

            <div className="popup-head">
                <button onClick={() => {
                    updateModalState(false)
                    action.DeleteGridDetail(selectedDetailDelete , callBack , TotalResponseSize)}} className="popup-confirm">
                    Confirm
                </button>

                <button onClick={() => {updateModalState(false)
                selectedDetailDelete = ''}} className="popup-cancel">
                    Cancel
                </button>

            </div>
        </ModalBody>
    </Modal>

    <button className="button-more" hidden={(GridActionResponse.length > 5 && GridDetailsSize < TotalDocuments ) && ShowLoadMore? false : true} onClick={()=>{
        
        GridDetailsSize += 5;
        updateGridDeatils(GridActionResponse.slice(0,GridDetailsSize));    
        if(TotalResponseSize == GridDetailsSize)
        {
            TotalResponseSize += TotalResponseSize;
            action.GetGridDetails(callBack , TotalResponseSize , FilterQuery);
        }
    }}>Load More</button>
    
    <button className="button-less" hidden={GridActionResponse.length > 5 && GridDetailsSize != 5 ? false : true} onClick={()=>{
        GridDetailsSize -= 5;
        updateGridDeatils(GridActionResponse.slice(0,GridDetailsSize));
    }}>Load Less</button>

    <span hidden={!DisplayNoDetails}>No Details Found</span>

    </div>

    </div>
    )
}


export default Gridcomponent