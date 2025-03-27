import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './RETakeActions.css';
import { useNavigate } from 'react-router-dom';

const RETakeActions = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [takingAction, setTakingAction] = useState(false);
  const [files, setFiles] = useState([]);
  const [reply, setReply] = useState('');
  const [actionTaken, setActionTaken] = useState('');

  const handleActionChange = (event) => {

    if (event.target.value === 'Others') {
      setActionTaken('Others')
    }
    else {
      setReply(event.target.value);
    }
  };

  useEffect(() => {
    console.log(id);
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const requestData = storedRequests.find(req => req.id === id);
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
    const requestIndex = storedRequests.findIndex(req => req.id === parseInt(id));
    if (requestIndex !== -1) {
      storedRequests[requestIndex].acknowledged = 1;
      localStorage.setItem('requests', JSON.stringify(storedRequests));
    }
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
    const requestIndex = storedRequests.findIndex(req => req.id === id);
    if (requestIndex !== -1) {
      const request = storedRequests[requestIndex];

      // Update the reply and documents in the selectedREs object
      request.selectedREs = request.selectedREs.map(re => {
        if (re.reName === loggedInUser.userName) {
          return {
            ...re,
            reply,
            documents: files.map(file => file.name)
          };
        }
        return re;
      });

      // Remove the username from action_on
      request.action_on = request.action_on.filter(user => user !== loggedInUser.userName);

      // Add 'fiu' to action_on if not already present
      if (!request.action_on.includes('fiu')) {
        request.action_on.push('fiu');
      }

      // Update the request in localStorage
      storedRequests[requestIndex] = request;
      localStorage.setItem('requests', JSON.stringify(storedRequests));

      navigate('/re-inbox');
    }
  };


  const handleRFISubmit = (rfi) => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const requestIndex = storedRequests.findIndex(req => req.id === id);
    console.log(requestIndex);
    if (requestIndex !== -1) {
      const request = storedRequests[requestIndex];

      // Update the RFI reply and documents in the selectedREs object
      request.selectedREs = request.selectedREs.map(re => {
        if (re.reName === loggedInUser.userName) {
          return {
            ...re,
            RFI: re.RFI.map(rfiItem => {
              if (rfiItem.id === rfi.id) {
                return {
                  ...rfiItem,
                  re_reply: reply,
                  re_docs: files.map(file => file.name)
                };
              }
              return rfiItem;
            })
          };
        }
        return re;
      });

      // Remove the username from action_on
      request.action_on = request.action_on.filter(user => user !== loggedInUser.userName);

      // Add 'fiu' to action_on if not already present
      if (!request.action_on.includes('fiu')) {
        request.action_on.push('fiu');
      }

      // Update the request in localStorage
      storedRequests[requestIndex] = request;
      localStorage.setItem('requests', JSON.stringify(storedRequests));

      navigate('/re-inbox');
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }



  return (
    <div className="preview-section">
      <h2>
        Request Number : <b>{id}</b>
      </h2>

      <div className="preview-details">
        <div className="preview-item">
          <label>RE Type</label>
          <input type="text" value={data.selectedReType} disabled />
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
          <input value={data.endDate} disabled />
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
      <br />
      {data.selectedREs.filter(re => re.reName === loggedInUser.userName).map((re, reIndex) => (
        <div key={reIndex} style={{ margin: "20px", padding: "20px", border: "1px solid black" }}>
          {re.reName === loggedInUser.userName && (
            <div>
              {re.reply && (
                <div className="action-taken-section">
                  <h3>Reply</h3>
                  <input type="text" value={re.reply} disabled />
                  <h3>Documents Uploaded by RE</h3>
                  <table className="files-table">
                    <thead>
                      <tr>
                        <th>File Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {re.documents.map((file, index) => (
                        <tr key={index}>
                          <td>{file}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {re.RFI && re.RFI.length > 0 && (
                    <div>
                      <h4>Information Requested : </h4>
                      <ul>
                        {re.RFI.map((rfi, rfiIndex) => (
                          <li key={rfiIndex}>
                            {rfi.info_required}
                            {rfi.re_reply ? (
                              <div>
                                <h4>Reply</h4>
                                <input type="text" value={rfi.re_reply} disabled />
                                <h4>Documents Uploaded by RE</h4>
                                <table className="files-table">
                                  <thead>
                                    <tr>
                                      <th>File Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {rfi.re_docs.map((file, index) => (
                                      <tr key={index}>
                                        <td>{file}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div>
                                <label>Reply</label>
                                <div>
                                  <div className="reply-section">
                                    <label>Action Taken</label>
                                    <select value={reply} onChange={handleActionChange}>
                                      <option value="">Select Action</option>
                                      <option value="Freeze Account">Freeze Account</option>
                                      <option value="Unfreeze Account">Unfreeze Account</option>
                                      <option value="Debit Freeze">Debit Freeze</option>
                                      <option value="Debit Unfreeze">Debit Unfreeze</option>
                                      <option value="Others">Others</option>
                                    </select>
                                  </div>

                                  {actionTaken === 'Others' && (
                                    <div className="reply-section">
                                      <label>Reply</label>
                                      <textarea
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                      />
                                    </div>
                                  )}
                                </div>
                                <label>Upload Documents</label>
                                <input type="file" multiple onChange={handleFileChange} />
                                <button className="submit-btn" onClick={() => handleRFISubmit(rfi)}>
                                  Submit Reply
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {data.selectedREs.filter(re => re.reName === loggedInUser.userName)[0].reply === '' && <div className="action-section">
        <div>
          <div className="reply-section">
            <label>Action Taken</label>
            <select value={reply} onChange={handleActionChange}>
              <option value="">Select Action</option>
              <option value="Freeze Account">Freeze Account</option>
              <option value="Unfreeze Account">Unfreeze Account</option>
              <option value="Debit Freeze">Debit Freeze</option>
              <option value="Debit Unfreeze">Debit Unfreeze</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {actionTaken === 'Others' && (
            <div className="reply-section">
              <label>Reply</label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </div>
          )}
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
          Submit Reply
        </button>
      </div>}
    </div>
  );
};

export default RETakeActions;