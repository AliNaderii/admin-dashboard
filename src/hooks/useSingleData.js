// tools
import { useEffect, useState } from "react";
// firestore tools
import { getDoc, doc } from "firebase/firestore";

export const useSingleData = (databaseRef, id) => {
  const [singleData, setSingleData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const getSingleData = async () => {
      setIsPending(true);
      setError(null);

      if (!isCancelled) {
        try {
          const singleDocRef = doc(databaseRef, id);
          const response = await getDoc(singleDocRef);
          if (!response) {
            throw new Error('Something went wrong');
          }
          setIsPending(false);
          setSingleData({ ...response.data() });
        }
        catch (err) {
          setError('Could not fetch the doc');
          setIsPending(false);
        }
      }
    };

    getSingleData();

    return () => setIsCancelled(true);
  }, [databaseRef, id, isCancelled]);

  return { singleData, isPending, error };
};