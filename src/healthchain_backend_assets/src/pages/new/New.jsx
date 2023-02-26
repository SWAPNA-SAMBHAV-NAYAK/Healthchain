import "./New.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import React,{useState, useEffect} from "react";

const New = ({inputs,title}) => {

  const [imgFile, setImgFile] = useState("")
  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={
              imgFile ? URL.createObjectURL(imgFile) :"https://icon-library.com/icon/no-image-icon-0.html.html>No Image Icon # 317461"
              } alt="" 
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                 Upload Image: <FileUploadOutlinedIcon className="icon"/>
                </label>
                <input type="file" id="file"style={{display: 'none'}}
                onChange={(x) => setImgFile(x.target.files[0])}
                />
              </div>

              {inputs.map((x) =>(
                <div className="formInput" key={x.id}>
                <label>{x.label}</label>
                <input type={x.type} placeholder={x.placeholder} />
              </div>
              ))}
              
              
              <button>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New