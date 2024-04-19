import React,{useState, useEffect} from 'react'
import '../OrderList.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import axios from 'axios';
import CompletedOrderForm from "./CompletedOrderForm";
import CompletedOrderTable from './CompletedOrderTable';
axios.defaults.baseURL = "http://localhost:8070/";

const CompletedOrderList = () => {

    const [items, setItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({});


    const handleClosePopup = () => setShowPopup(false);


    useEffect(() => {
        getOrderList();  // load data initially
    }, []);

    const getOrderList = async () => {
        try {
            const response = await axios.get("/op/completedOrderList");
            const responseData = response.data;
            setItems(responseData);

        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting order list");
            }
        }

    };


    const handleSearchOnClick = async (filterData) => {
        try {
            const response = await axios.post("/op/CompletedOrderList", filterData);
            setItems(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting filtered data");
            }
        }
    }

    const handleView = (item) =>{
        setFormData({
            orderId: item._id,
            fruit: item.fruit,
            category: item.category,
            quality: item.quality,
            quantity: item.quantity,
            customer: item.customerName,
            placedDate: item.placedDate,
            dueDate: item.dueDate,
            opId: item.opId,
            opName: item.opName,
        })
        setShowPopup(true);
    };

    return (
        <main className='main' id='main'>
            <div className="body" id='body'>
                <div className="card recent-sales overflow-auto">

                    {/* ---------------------------table filter---------------------- */}
                    <div className="card-body">
                        <div className="page-header">
                            <div className="add-item d-flex">

                              {/* --------------------------table name ---------------------------*/}
                                <div className="card-title">Completed Orders
                                </div>
                            </div>

                          {/*---------------- pdf,excel report generating icon and refresh -------------------*/}
                            <ul className="table-top-head">
                                <li>
                                    <div className="button-container">
                                        <a href="#">
                                            <img src={Pdf} alt="Pdf Icon" className="icon"/>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="button-container">
                                        <a href="#">
                                            <img src={Excel} alt="Excel Icon" className="icon"/>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="button-container">
                                        <a href="#" onClick={() => getOrderList()}>
                                            <img src={Refresh} alt="Refresh Icon" className="icon"/>
                                        </a>
                                    </div>
                                </li>
                            </ul>

                          {/* --------------------imported search bar and table data ------------------------*/}
                        </div>
                        <div className="w-100">
                            <div className="w-25"></div>
                            <div className="text-end" style={{marginRight:'30px'}}>
                                <SearchBar enableFilterType={true}
                                     filterColumns={
                                         [
                                            {
                                                name: "Fruit Type",
                                                tag: "fruit"
                                            },
                                            {
                                                name: "Fruit Category",
                                                tag: "category"
                                            },
                                            {
                                                name: "Quality",
                                                tag: "quality"
                                            },
                                            {
                                                name: "Placed Date",
                                                tag: "placedDate"
                                            },
                                            {
                                                name: "Due Date",
                                                tag: "dueDate"
                                            },
                                            {
                                                name: "Order Processor",
                                                tag: "opName"
                                            }
                                         ]
                                     }
                                     handleSearch={handleSearchOnClick}
                                />
                            </div>
                            <div className="scrollable-content-x">
                                <CompletedOrderTable items={items} handleView={handleView}/>
                            </div>
                        </div>
                        <div>
                            <CompletedOrderForm
                                show={showPopup}
                                onHide={handleClosePopup}
                                formData={formData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default CompletedOrderList;
