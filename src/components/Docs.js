import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

const Docs = ({ database }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [docsData, setDocsData] = useState([]);

  const collectionRef = collection(database, 'docsData');
  const isMounted = useRef();
  const navigate = useNavigate();

  const addData = () => {
    addDoc(collectionRef, {
      title: title,
    })
      .then(() => {
        alert('Data Added');
        handleClose();
      })
      .catch(() => {
        alert('Cannot add data');
      });
  };

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  const getID = (id) => {
    navigate(`/editDocs/${id}`);
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    getData();
  }, []);

  return (
    <div className="docs-main">
      <h1>Kwaku Docs</h1>

      <button className="add-docs" onClick={handleOpen}>
        Add a Document
      </button>

      <div className="grid-main">
        {docsData.map((doc) => {
          return (
            <div
              className="grid-child"
              key={doc.id}
              onClick={() => getID(doc.id)}
            >
              <p>{doc.title}</p>
            </div>
          );
        })}
      </div>

      <CustomModal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        addData={addData}
      />
    </div>
  );
};

export default Docs;
