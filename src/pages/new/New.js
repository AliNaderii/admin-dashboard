// styles
import './new.scss';
// tools
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
// icons
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Message from '../../components/message/Message';
// custom hooks
import { useFirestore } from '../../hooks/useFirestore';

export default function New({
  formInputFields, title, databaseRef, initialState
}) {
  const { theme } = useTheme();
  const [file, setFile] = useState(null);
  const [userInputs, setUserInputs] = useState(initialState);
  const [inputError, setInputError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const { addData, isPending, error } = useFirestore(databaseRef);
  const navigate = useNavigate();

  // show message && navigate to previous page
  const successMessageAndNavigate = () => {
    setShowMessage(true);
    setTimeout(() => navigate(-1), 1500);
  };

  // check user file selection
  const handleFile = (e) => {
    const userFile = e.target.files[0];
    // validate the file 
    switch (true) {
      case (!userFile.type.includes('image')):
        setInputError('Please select an image for profile');
        break;
      case (userFile.size > 150000):
        setInputError('Image size should be less than 150KB');
        break;
      default:
        setFile(userFile);
    }
  };

  // handle form inputs
  const handleUserInputs = (e) => {
    setUserInputs(prevState => {
      const value = e.target.value;

      return {
        ...prevState,
        [e.target.name]: value
      };
    });
  };

  // submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if all the fields are filled 
    if (Object.values(userInputs).includes('')) {
      setInputError('Please fill in all the fields');
      return;
    }
    // check if an image has been selected
    else if (!file) {
      setInputError('Please select an image');
      return;
    }

    await addData(userInputs, file);
    successMessageAndNavigate();
  };

  return (
    <div className={ theme === 'light' ? 'new-container' : 'new-container dark' }>
      <h2 className="title">{ title }</h2>
      <div className="form-container">
        <div className="img">
          <img src={ file ?
            URL.createObjectURL(file)
            :
            "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" }
            alt="placeholder" />
        </div>

        <form className="form" onSubmit={ handleSubmit }>
          <div className="form-group file-input">
            <label htmlFor="file">
              Image: <DriveFolderUploadOutlinedIcon className='icon' />
            </label>
            <input
              name='image'
              type="file"
              id='file'
              onChange={ handleFile }
              onClick={ () => setInputError('') }
            />
          </div>

          { formInputFields.map(input => {
            if (input.type === 'select') {
              return (
                (
                  <div className="form-group select" key={ input.id }>
                    <label htmlFor={ input.id }>{ input.label }</label>
                    <select
                      name={ input.name }
                      id={ input.id }
                      onChange={ handleUserInputs }
                      onFocus={ () => setInputError('') }
                    >
                      <option value=''>Select a Category</option>
                      <option value='Computers'>Computers</option>
                      <option value='Home & Kitchen'>Home & Kitchen</option>
                      <option value='Sports and outdoor'>Sports and outdoor</option>
                      <option value='Clothing'>Clothing</option>
                    </select>
                  </div>
                )
              );
            } else {
              return (
                <div className="form-group" key={ input.id }>
                  <label htmlFor={ input.id }>{ input.label }</label>
                  <input
                    id={ input.id }
                    name={ input.name }
                    type={ input.type }
                    placeholder={ input.placeholder }
                    onChange={ handleUserInputs }
                    onFocus={ () => setInputError('') }
                  />
                </div>
              );
            }
          }) }
          <button
            className='form-button'
            type='submit'
          >
            Send
          </button>
        </form>
      </div>
      { isPending && <Message message='Please wait' type='pending' /> }
      { showMessage && <Message message='Added successfuly' type='success' /> }
      { (error || inputError) && <Message message={ error || inputError } type='error' /> }
    </div>
  );
}