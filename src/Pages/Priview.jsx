import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './Priview.css';

const Preview = ({ loggedInUser }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [infoRequest, setInfoRequest] = useState('');
  const [showInfoRequestInput, setShowInfoRequestInput] = useState(false);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const requestData = storedRequests.find(req => req.id === parseInt(id));
    setData(requestData);
  }, [id,showInfoRequestInput]);

  console.log(loggedInUser.userName);
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Request Number: FIU_${id}`, 10, 10);
    doc.text(`RE Type: ${data.selectedReType}`, 10, 20);
    doc.text('Identifiers:', 10, 30);
    data.identifiers.forEach((identifier, index) => {
      doc.text(
        `${index + 1}. ${identifier.idType}: ${identifier.value}`,
        10,
        40 + index * 10
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
    data.selectedREs.forEach((re, reIndex) => {
      doc.text(`RE: ${re.reName}`, 10, 140 + reIndex * 20);
      if (re.reply) {
        doc.text(`Reply: ${re.reply}`, 10, 150 + reIndex * 20);
        doc.text('Documents Uploaded by RE:', 10, 160 + reIndex * 20);
        re.documents.forEach((file, fileIndex) => {
          doc.text(`${fileIndex + 1}. ${file}`, 10, 170 + reIndex * 20 + fileIndex * 10);
        });
      }
    });
    doc.save(`FIU_Notice_${id}.pdf`);
  };

  const handleRequestMoreInfo = (reName) => {
    setShowInfoRequestInput(reName);
  };

  const handleSubmitRequest = (reName) => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const requestIndex = storedRequests.findIndex(req => req.id === parseInt(id));
    if (requestIndex !== -1) {
      const request = storedRequests[requestIndex];

      // Remove the username from action_on
      request.action_on = request.action_on.filter(user => user !== loggedInUser.userName);

      // Add the reName to action_on
      request.action_on.push(reName);

      // Add the RFI to the selectedREs object
      request.selectedREs = request.selectedREs.map(re => {
        if (re.reName === reName) {
          return {
            ...re,
            RFI: [
              ...(re.RFI || []),
              {
                id: re.RFI ? re.RFI.length + 1 : 1,
                info_required: infoRequest,
                re_reply: '',
                re_docs: []
              }
            ]
          };
        }
        return re;
      });

      // Update the request in localStorage
      storedRequests[requestIndex] = request;
      localStorage.setItem('requests', JSON.stringify(storedRequests));

      setShowInfoRequestInput(false);
      setInfoRequest('');
    }
  };

  const handleCloseRequest = () => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const requestIndex = storedRequests.findIndex(req => req.id === parseInt(id));
    if (requestIndex !== -1) {
      const request = storedRequests[requestIndex];

      // Clear the action_on array
      request.action_on = [];
      request.close_request = 1;

      // Update the request in localStorage
      storedRequests[requestIndex] = request;
      localStorage.setItem('requests', JSON.stringify(storedRequests));

      setData(request);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  const handleNoFurtherInfo = (reName) => {
    console.log(reName, loggedInUser.userName);
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const requestIndex = storedRequests.findIndex(req => req.id === parseInt(id));
    if (requestIndex !== -1) {
      const request = storedRequests[requestIndex];

      // Remove the username from action_on
      request.action_on = request.action_on.filter(user => user !== loggedInUser.userName);

      // Update the request in localStorage
      storedRequests[requestIndex] = request;
      localStorage.setItem('requests', JSON.stringify(storedRequests));

      setData(request);
    }
  };

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
      {loggedInUser.role==='FIU' &&  data.selectedREs.map((re, reIndex) => (
        <div key={reIndex} style={{ margin: "20px", padding: "20px", border: "1px solid black" }}>
          <div><b>RE Name : </b><b>{re.reName}</b></div>
          <div>
            {re.reply ? (
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
                {re.RFI && re.RFI.length > 0 ? (
                  <div>
                    <h3>Questions Requested</h3>
                    <ul>
                      {re.RFI.map((rfi, rfiIndex) => (
                        <li key={rfiIndex}>
                          {rfi.info_required}
                          {rfi.re_reply ? (
                            <div>
                              <h4>Reply</h4>
                              <p>{rfi.re_reply}</p>
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
                            <button>Reminder</button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {data.action_on.includes(loggedInUser.userName) && (
                  <>
                    <button onClick={() => handleRequestMoreInfo(re.reName)}>Request More Information</button>
                    <button onClick={() => handleNoFurtherInfo(re.reName)}>No Further Information Required</button>
                  </>
                )}
                {showInfoRequestInput && (
                  <div>
                    <label>Request More Information</label>
                    <input
                      type="text"
                      value={infoRequest}
                      onChange={(e) => setInfoRequest(e.target.value)}
                    />
                    <button onClick={() => handleSubmitRequest(showInfoRequestInput)}>Submit Request</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Status: Action Not Taken</p>
                <button>Reminder</button>
              </div>
            )}
          </div>
        </div>
      ))}
      {console.log(loggedInUser.role)}
      {loggedInUser.role==='RE' && data.selectedREs.filter(re => re.reName === loggedInUser.userName).map((re, reIndex) => (
        <div key={reIndex} style={{ margin: "20px", padding: "20px", border: "1px solid black" }}>

          <div>
            {re.reply ? (
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
                {re.RFI && re.RFI.length > 0 ? (
                  <div>
                    <h3>Questions Requested</h3>
                    <ul>
                      {re.RFI.map((rfi, rfiIndex) => (
                        <li key={rfiIndex}>
                          {rfi.info_required}
                          {rfi.re_reply ? (
                            <div>
                              <h4>Reply</h4>
                              <p>{rfi.re_reply}</p>
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
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                
                
              </div>
            ) : (
              <div>
              </div>
            )}
          </div>
        </div>
      ))}

      {data.close_request !== 1 && <button onClick={handleCloseRequest}>Close This Request</button>}
    </div>
  );
}


export default Preview