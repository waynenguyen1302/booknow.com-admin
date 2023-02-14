import React, { useState } from 'react'
import './newRoom.scss'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import  DriveFolderUploadOutlinedIcon  from '@mui/icons-material/DriveFolderUploadOutlined'
import { roomInputs } from '../../formSource'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'

const NewRoom = () => {

  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([])
  const [hotelId, setHotelId] = useState(undefined);

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(",").map(room => ({number:room}));
    try {
      await axios.post(`${process.env.REACT_APP_URL}/rooms/${hotelId}`, {...info, roomNumbers})
    } catch (error) {
      console.log(error)
    }

  }
  
  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form action="">              

              {roomInputs.map((input) =>(
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id}
                    type={input.type} 
                    placeholder={input.placeholder}
                    onChange = {handleChange}
                  />
                </div>
              ))}     
              <div className="formInput" >
                  <label>Choose a hotel</label>
                  <select name="" id="hotelId" onChange={e => setHotelId(e.target.value)}>
                    {loading? "loading" : data && data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                  </select>
              </div>  
              <div className="formInput">
                  <label>Room Number</label>
                  <textarea onChange={e => setRooms(e.target.value)} placeholder='separate room numbers with a comma'></textarea>
                </div>      
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default NewRoom