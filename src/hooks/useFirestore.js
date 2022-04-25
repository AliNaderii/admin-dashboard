// firebase tools
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../firebase";
// tools
import { useState } from 'react';

export const useFirestore = (databaseRef) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const uploadPathFolder = databaseRef._path.segments[0];

  // add data function
  const addData = async (inputs, file) => {
    setIsPending(true);
    setError(null);

    try {
      // add data to database
      const response = await addDoc(databaseRef, inputs);
      if (!response) {
        throw new Error('Something went worng');
      }

      // add image to storage
      const uploadPath = ref(
        storage,
        `${uploadPathFolder}/${response.id}/${file.name}`
      );
      await uploadBytes(uploadPath, file);

      // get download link and update the added data
      const imageUrl = await getDownloadURL(uploadPath);
      const singleDocRef = doc(databaseRef, response.id);
      await updateDoc(singleDocRef, {
        photoUrl: imageUrl
      });
      setIsPending(false);
    }
    catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { addData, isPending, error };
};