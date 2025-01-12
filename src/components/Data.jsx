import Form from "./Form.jsx";
import Weather from "./Weather.jsx";
import {useState} from "react";

const Data = () => {
    const initValues = {city: ''}
    const [requestParam, setRequestParams] = useState(initValues);
    return (
        <div className={'col-sm-7 form'}>
            < Form setRequestParams = {setRequestParams}/>
            < Weather params = {requestParam}/>
        </div>
    );
};

export default Data;