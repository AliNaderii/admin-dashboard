// tools
import { useCallback, useEffect, useState } from "react";
// firebase tools
import { onSnapshot } from "firebase/firestore";
export const useData = (databaseRef) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getData = useCallback(() => {
    setIsPending(true);
    onSnapshot(databaseRef, (snapshot) => {
      let fetchedData = [];
      snapshot.docs.forEach(
        doc => fetchedData.push({ ...doc.data(), id: doc.id })
      );
      setData([...fetchedData]);
      setError(null);
      setIsPending(false);
    },
      (error) => {
        setError('Could not fetch the data');
        setIsPending(false);
      });
  }, [databaseRef]);

  useEffect(() => {
    getData();
  }, [databaseRef, getData]);

  return { data, error, isPending };
};