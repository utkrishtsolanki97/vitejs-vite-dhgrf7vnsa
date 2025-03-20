import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './RETakeActions.css';
import { useNavigate } from 'react-router-dom';

const RETakeActions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [takingAction, setTakingAction] = useState(false);
  const [reply, setReply] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const requestData = storedRequests[id];
    setData(requestData);
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Request Number: FIU_${id}`, 10, 10);
    doc.text(`RE Type: ${data.selectedReType}`, 10, 20);
    doc.text(`RE: ${data.selectedRE}`, 10, 30);
    doc.text('Identifiers:', 10, 40);
    data.identifiers.forEach((identifier, index) => {
      doc.text(
        `${index + 1}. ${identifier.idType}: ${identifier.value}`,
        10,
        50 + index * 10
      );
    });
    doc.text(`Action to be Performed: ${data.selectedAction}`, 10, 70);
    if (data.selectedAction === 'Others') {
      doc.text(`Others action to perform: ${data.otherAction}`, 10, 80);
    }
    doc.text(`Description of the action: ${data.description}`, 10, 90);
    doc.text(`Priority: ${data.priority}`, 10, 100);
    doc.text(`End Date to Perform Action: ${data.endDate}`, 10, 110);
    doc.text('Uploaded Files:', 10, 120);
    data.files.forEach((file, index) => {
      doc.text(`${index + 1}. ${file}`, 10, 130 + index * 10);
    });
    doc.save(`FIU_Notice_${id}.pdf`);
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    storedRequests[id].acknowledged = 1;
    localStorage.setItem('requests', JSON.stringify(storedRequests));
  };

  const handleTakeAction = () => {
    setTakingAction(true);
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleSubmit = () => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    storedRequests[id].reply = reply;
    storedRequests[id].documents_uploaded_by_re = files.map(
      (file) => file.name
    );
    storedRequests[id].action_taken = 1;
    localStorage.setItem('requests', JSON.stringify(storedRequests));
    navigate('/re-inbox');
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="preview-section">
      <h2>
        Request Number : <b>FIU_{id}</b>
      </h2>

      <div className="preview-details">
        <div className="preview-item">
          <label>RE Type</label>
          <input type="text" value={data.selectedReType} disabled />
        </div>
        <div className="preview-item">
          <label>RE</label>
          <input type="text" value={data.selectedRE} disabled />
        </div>
        <div className="preview-item">
          <h3>Identifiers</h3>
          <table className="identifiers-table">
            <thead>
              <tr>
                <th>Srl No</th>
                <th>Id Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.identifiers.map((identifier) => (
                <tr key={identifier.id}>
                  <td>{identifier.id}</td>
                  <td>
                    <input type="text" value={identifier.idType} disabled />
                  </td>
                  <td>
                    <input type="text" value={identifier.value} disabled />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="preview-item">
          <label>Action to be Performed</label>
          <input type="text" value={data.selectedAction} disabled />
        </div>
        {data.selectedAction === 'Others' && (
          <div className="preview-item">
            <label>Others action to perform</label>
            <input type="text" value={data.otherAction} disabled />
          </div>
        )}
        <div className="preview-item">
          <label>Description of the action</label>
          <textarea value={data.description} disabled />
        </div>
        <div className="preview-item">
          <label>Priority</label>
          <input type="text" value={data.priority} disabled />
        </div>
        <div className="preview-item">
          <label>End Date to Perform Action</label>
          <input type="date" value={data.endDate} disabled />
        </div>
        <div className="preview-item">
          <h3>Uploaded Files</h3>
          <table className="files-table">
            <thead>
              <tr>
                <th>File Name</th>
              </tr>
            </thead>
            <tbody>
              {data.files.map((file, index) => (
                <tr key={index}>
                  <td>{file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="download-pdf-btn" onClick={handleDownloadPDF}>
        Download as PDF
      </button>
      {!acknowledged && (
        <button className="acknowledge-btn" onClick={handleAcknowledge}>
          Acknowledge
        </button>
      )}
      {acknowledged && !takingAction && (
        <button className="take-action-btn" onClick={handleTakeAction}>
          Take Action
        </button>
      )}
      {takingAction && (
        <div className="action-section">
          <div className="reply-section">
            <label>Reply</label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </div>
          <div className="upload-docs-section">
            <h3>Upload Supporting Docs</h3>
            <input type="file" multiple onChange={handleFileChange} />
            {files.length > 0 && (
              <table className="files-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            <Link to="/re-inbox">Submit</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default RETakeActions;
