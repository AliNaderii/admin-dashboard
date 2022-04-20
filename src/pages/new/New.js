// styles
import './new.scss';
// tools
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
// icons
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Message from '../../components/error/Message';
// firebase tools
import { storage } from '../../firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { doc, addDoc, updateDoc } from 'firebase/firestore';

export default function New({
  formInputFields, title, databaseRef, initialState
}) {
  const { theme } = useTheme();
  const [file, setFile] = useState(null);
  const [userInputs, setUserInputs] = useState(initialState);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  console.log(userInputs);

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
        setError('Please select an image for profile');
        break;
      case (userFile.size > 100000):
        setError('Image size should be less than 100KB');
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
      setError('Please fill in all the fields');
      return;
    }
    // check if an image has been selected
    else if (!file) {
      setError('Please select an image');
      return;
    }

    try {
      setIsPending(true);
      const addDocResponse = await addDoc(databaseRef, userInputs);
      if (!addDocResponse) {
        throw new Error('Something went wrong');
      }

      const uploadPath = ref(
        storage,
        `avatars/${addDocResponse.id}/${file.name}` //change upload path
      );
      await uploadBytes(uploadPath, file);
      const imageUrl = await getDownloadURL(uploadPath);
      const singleDocRef = doc(databaseRef, addDocResponse.id);
      await updateDoc(singleDocRef, {
        photoUrl: imageUrl,
      });
      setIsPending(false);
      successMessageAndNavigate();
    }
    catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return (
    <div className={ theme === 'light' ? 'new-container' : 'new-container dark' }>
      <h2 className="new-title">{ title }</h2>
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
              onClick={ () => setError('') }
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
                      onFocus={ () => setError('') }
                    >
                      <option value=''>Select a category</option>
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
                    onFocus={ () => setError('') }
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
      { error && <Message message={ error } type='error' /> }
    </div>
  );
}