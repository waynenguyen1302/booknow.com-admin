import React, { useState } from 'react'
import './new.scss'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import  DriveFolderUploadOutlinedIcon  from '@mui/icons-material/DriveFolderUploadOutlined'
import axios from 'axios'
import { userInputs } from '../../formSource'

const New = () => {

  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const handleChange = (e) => {
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset","upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dwwhvoqui/image/upload", data)
      
      const {url} = uploadRes.data

      const newUser = {
        ...info, 
        img: url,
      }

      await axios.post(`${process.env.REACT_APP_URL}/auth/register`, newUser)

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
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://media.istockphoto.com/id/1396577496/vector/coming-soon-no-photo-no-video-available-image-loading-screen-vector-illustration.jpg?s=612x612&w=is&k=20&c=ADRxuvW5IWknOkyclbV0dN27ghKlPD--1xuTsD4dDDY="} alt="not available" />
          </div>
          <div className="right">
            <form action="">
              <div className="formInput">
                <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className='icon' />
                </label>
                <input type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{display:"none"}}/>
              </div>

              {userInputs.map((input) =>(
                <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input 
                  onChange={handleChange}
                  type={input.type} 
                  placeholder={input.placeholder}
                  id={input.id}
                />
              </div>
              ))}             
              <button onClick ={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default New