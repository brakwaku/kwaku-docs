import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore';

const EditDocs = ({ database }) => {
  const params = useParams();

  const [docsDesc, setDocsDesc] = useState('');
  const isMounted = useRef();

  const getQuillData = (value) => {
    setDocsDesc(value);
  };

  const collectionRef = collection(database, 'docsData');

  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      updateDoc(document, {
        docsDesc: docsDesc,
      })
        .then(() => {
          alert('Saved');
        })
        .catch(() => {
          alert('Cannot Save');
        });
    }, 1000);
    return () => clearTimeout(updateDocsData);
  }, [docsDesc]);

  const getData = () => {
    const document = doc(collectionRef, params.id);
    onSnapshot(document, (docs) => {
      console.log(docs.data().docsDesc);
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    getData();
  }, []);

  return (
    <div>
      <h1>EditDocs</h1>

      <ReactQuill value={docsDesc} onChange={getQuillData} />
    </div>
  );
};

export default EditDocs;
