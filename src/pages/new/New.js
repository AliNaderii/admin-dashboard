// styles
import './new.scss';
// tools
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
// components
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
// icons
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

export default function New({ inputs, title }) {
  const [file, setFile] = useState('');
  const { theme } = useTheme();


  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={ theme === 'light' ? 'new' : 'new dark' }>
      <Sidebar />
      <div className="new-container">
        <Navbar />
        <h2 className="new-title">{ title }</h2>
        <div className="form-container">
          <div className="img">
            <img src={ file ?
              URL.createObjectURL(file)
              :
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" }
              alt="placeholder" />
          </div>

          <form className="form">

            <div className="form-group file-input">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className='icon' />
              </label>
              <input type="file" id='file' onChange={ handleChange } />
            </div>

            { inputs.map(input => (
              <div className="form-group" key={ input.id }>
                <label htmlFor="">{ input.label }</label>
                <input
                  type={ input.type }
                  placeholder={ input.placeholder }
                />
              </div>
            )) }

            <button className='form-button'>Send</button>
          </form>

        </div>
      </div>
    </div>
  );
}