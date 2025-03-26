import React, { useState } from 'react';
import './FIURaiseRequest.css';
import { Link } from 'react-router-dom';

const FIURaiseRequest = ({loggedInUser}) => {
  const [selectedReType, setSelectedReType] = useState('');
  const [selectedRE, setSelectedRE] = useState('');
  const [selectedREs, setSelectedREs] = useState([]);
  const [reDropdownValues, setREDropdownValues] = useState([]);
  const [identifiers, setIdentifiers] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [showActionRequired, setshowActionRequired] = useState(true);
  const [selectedAction, setSelectedAction] = useState('');
  const [otherAction, setOtherAction] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [endDate, setEndDate] = useState('');
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const reData = {
    'Virtual Asset Service Provider': [
      'Test Virtual Asset Service Provider',
      'Manendra Jain',
    ],
    Bank: [
      'UCO Bank',
      'Azad Test',
      'Bank of Mewar',
      'IDBI Bank',
      'gru',
      'anukrititwo',
      'HSBC',
      'FIU Bank',
      'BrijeshCo',
      'HDFC Bank',
      'qwdqwedqwdq',
      'Yes Bank',
      'City Bank',
      'Standard Bank',
      'SBI Bank',
      'Test Bank',
      'Punjab Bank',
      'Kolapur Bank',
      'Axis Bank Ltd',
      'IndusInd Bank Test',
      'Bank of Mumbai',
      'Kota Bank',
      'Bank Of Srinagar',
      'SK Test',
      'Test Biju',
      'Test PNB',
      'UAT Test',
      'ugyifdg',
      'LTI Testing',
      'SBI INDIA TEST',
      'UCC test two',
      'Ranvijay Test',
      'Ranvijay Singh Bank test',
      'kushal',
      'PANKAJ BANK',
      'Test for Bank',
      'Anurag',
      'Reporting Entity testing bank',
      'Rohit bank',
      'test individual',
      'R.k associate bank',
      'Kotak',
      'AKL BANK',
      'SBI Bank for testing',
      'JKL BANK',
      'xkl Bank',
      'Rjc bank',
      'PwC Bank IPO',
      'TestBank',
      'AMU propeties',
      'hpe bank',
      'hpe test only only',
      'hpetestonlyyy',
      'ABC Bank',
      'SBI Bank for testing only',
      'for test bank',
      'Test Sanity',
      'THE VIRUDHUNAGAR DISTRICT CENTRAL CO-OPERATIVE BANK LTD',
      'JILA SAHAKARI KENDRIYA BANK MARYADIT GWALIOR',
      'THE NABADWIP COOPERATIVE CREDIT BANK LTD',
      'The Shirpur Peoples Co-op Bank Ltd',
      'SBI BANK TEST',
      'SEHORE NAGRIK SAHAKRI BANK LIMITED M P',
      'DQR Bank Test RE',
      'DEE & DEE FOREX PRIVATE LIMITED',
      'Test PAN Business',
      'UAT Demo',
      'TestAccount',
      'Banking DQR Testing',
      'Bank For Test Only',
      'Rahul IDAM Bank',
      'test rahul LOB RE',
      'Rahul',
      'Bankuattest',
      'Simply Grow Technologies Pvt Ltd',
      'Entity Test N',
      'test STQC RE_',
      'Lohati Business',
      'Saraswat Co-operative Bank Ltd.',
      'SBI Delhi',
      'Standard Chartered Bank',
      'ICICI Bank Limited',
      'Punjab National Bank',
      'Axis Bank Limited',
      'HDFC Bank Ltd',
      'Surat Peoples Coop Bank Limited',
      'Pallav',
      'Movzz Sevices Business',
      'Sunil address test',
    ],
    'Financial institute': [
      'Assured Finance',
      'Pallav Business',
      'HDFC Mutual Fund',
      'SUNDARAM FINANCE LIMITED',
      'GREENHOME KURIES PVT LTD',
      'True Beacon Global AIF',
      'Shree Worstex Limited',
      'DASHBOARD ACCOUNT AGGREGATION SERVICES PRIVATE LIMITED',
      'SHRICHAKRA FINANCE ANDCREDITS MADRAS PRIVATE LIMITED',
      'Prashanth Sekhar',
      'INDIA REISEBUERO PVT LTD',
      'EXIM SCRIPS DEALERS PRIVATE LIMITED',
      'SBI Card and Payment Services Limited (UAT)',
      'Roshni Nayak',
      'DHIMAHI FOREX PVT LTD.',
      'RAINEY TRADING PVT LTD',
      'Dibyajit Saha',
      'Eroute Technologies Private Limited',
      'Citicorp Finance (India) Limited',
      'Elphin Merchants Pvt Ltd',
      'Department Of Post Test',
      'Price Waterhouse and Coopers',
      'UCC test four',
    ],
    Casino: [
      'Casino UAT',
      'asdfasdfasdfasdfasddf',
      'Test Pass',
      'Ku Kusal',
      'Manav',
      'Test Aman BOA',
    ],
    Regulator: ['Defect ID', 'Dhiraj Das', 'Department of Posts'],
    Jeweller: [
      'test RE Gems & Jewel',
      'jain and sons',
      'Test DD FLow',
      'CHI CHI',
      'Test Individual RE',
      'Jk Jeweller Test',
      'UCC Five',
      'Mohit jwellers',
    ],
    'Real Estate': [
      'LnT Infotech',
      'Lucky Real Estateee',
      'Sharma and associates test',
      'primary user real estate',
      'primaryuserforrealestate',
      'VIPINA',
      'Axis bank testing',
      'Real Estate',
      'DQR Real Estate',
    ],
    Insurance: [
      'Max Life Insurance Company Limited',
      'HDFC Life Insurance Company Limited',
      'SBI LIFE INSURANCE CO LTD',
      'RE Flow - IDAM Business',
      'AT Technologies',
      'TEST Dev Team',
      'Insurance Test Ltd',
      'SuperTesting',
      'LIFE INSURANCE CORPORATION OF INDIA',
    ],
    'Mutual Fund': ['Test mutual fund', 'Anmol Bakshi', 'testmf'],
    'Card service operator': [
      'Test Card Service Operator PU',
      'Master Card Asia Pacific Ltd. (UAT)',
      'Card System testing',
    ],
    Depositories: [
      'Central Depositories Services Ltd',
      'PMU depositories test',
      'Test Depositories PU',
      'Depositories firm',
    ],
    'Department of Posts': [
      'TestDOP',
      'Test Department of Posts',
      'Test 2 Department of Posts',
      'TestDeptInd',
      'dptindtest',
      'test aks',
      'Test 01',
      'Test DOP',
    ],
    'Exchange House': [
      'Test Exchange House',
      'exchange testing',
      'Dimika Forex Private Limited',
      'PARIMALA SAMPATH',
      'chack de india forex pvt. ltd.',
    ],
    MTSS: [
      'TEST Bulk MTSS',
      'Western Union Financial Services Incorporated',
      'mtss testt api',
      'test re mtss',
      'MTSS123',
      'VALUE PLUS MONEY CHANGER PVT LTD',
      'Moneygram Payments Systems Inc',
    ],
    'Payment Aggregators and Payment Gateways': [
      'Test Aman',
      'Paayment tesing',
    ],
    'Property Registrar': ['VSP TRADERS', 'Property DQR'],
    'Brokerage Firms': [
      'JM Financial Services Ltd',
      'Paytm Money',
      'Sharekhan Ltd',
      'Rohittt',
      'PwC brokerage testing',
      'Dipika enterprises',
      'Marwadi',
      'NetWorth Research And Investment Advisor',
      'ASHISH VAID',
      'Ramesh',
      'Rajesh Baheti',
      'TRIVENI MANAGEMENT CONSULTANCY SERVICES LIMITED',
      'Brokerage Firms Test',
    ],
    
    'Dealers in Precious Metals and Stones': [
      'Test RE DPMS',
      'Test Flow DPMS',
      'test DPMS331',
      'DPMS Test New',
      'test dpms332',
      'DPMS PA',
      'Test DPMS New R',
      'test uat dpms1',
      'Test Name DPMS P',
      'Tesst Business',
    ],
    'Body of Associations': [
      'Test Flow Associations',
      'INDIA BULLION AND JEWELLERS ASSOCIATION LTD',
      'BOA Test2',
      'test boa1231',
      'Test DPMS demo',
    ],
    'Statutory Bodies': [
      'Test Statuatory Bodies',
      'Entity for Others',
      'NSIC Venture Capital Fund Limited - Scheme I - Self Reliant India Fund',
    ],
  };

  const retype = [
    'Virtual Asset Service Provider',
    'Bank',
    'Body of Associations',
    'Brokerage Firms',
    'Card service operator',
    'Casino',
    'Dealers in Precious Metals and Stones',
    'Department of Posts',
    'Depositories',
    'Exchange House',
    'Financial institute',
    'Insurance',
    'Jeweller',
    'MTSS',
    'Mutual Fund',
    'Payment Aggregators and Payment Gateways',
    'Property Registrar',
    'Real Estate',
    'Regulator',
    'Statutory Bodies',
    
  ];

  const handleReTypeSelect = (reType) => {
    console.log(reType.target.value,reData[reType.target.value] || []);
    setSelectedReType(reType.target.value);
    setREDropdownValues(reData[reType.target.value] || []);
  };


  // const handleReSelect = (re) => {
  //   setSelectedRE(re.target.value);
  // };

  const handleReSelect = (re) => {
    const value = re.target.value;
    setSelectedREs((prevSelectedREs) =>
      prevSelectedREs.includes(value)
        ? prevSelectedREs.filter((re) => re !== value)
        : [...prevSelectedREs, value]
    );
  };

  const idTypes = [
    'VPA (Virtual Payment Address)',
    'Account Number',
    'Mobile Number',
    'Wallet Address',
    'IFSC Code',
    'aadhar card',
    'pan',
    'driving license',
    'Name',
    'email',
    'Others'
  ];

  // const handleAddIdentifier = () => {
  //   setIdentifiers([...identifiers, { id: idCounter, idType: '', value: '' }]);
  //   setIdCounter(idCounter + 1);
  // };

  const handleAddIdentifier = () => {
    setIdentifiers([...identifiers, { id: idCounter, idType: '', value: '', otherValue: '' }]);
    setIdCounter(idCounter + 1);
  };

  const handleInputChange = (index, field, value) => {
    const newIdentifiers = [...identifiers];
    newIdentifiers[index][field] = value;
    setIdentifiers(newIdentifiers);
  };

  const handleDeleteIdentifier = (index) => {
    const newIdentifiers = identifiers.filter((_, i) => i !== index);
    setIdentifiers(newIdentifiers);
  };

  const handleSubmit = () => {
    console.log('Submitted Identifiers:', identifiers);
    setshowActionRequired(true);
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    setPreview(true);
  };


  // const handleFinalSubmit = () => {
  //   const data = {
  //     selectedReType,
  //     selectedREs,
  //     identifiers,
  //     selectedAction,
  //     otherAction,
  //     description,
  //     priority,
  //     endDate,
  //     files: files.map((file) => file.name),
  //   };
  //   const existingData = JSON.parse(localStorage.getItem('requests')) || [];
  //   existingData.push(data);
  //   localStorage.setItem('requests', JSON.stringify(existingData));
  //   console.log('Data saved to local storage:', data);
  // };
  const handleFinalSubmit = () => {
    // Retrieve the existing requests from localStorage
    const existingData = JSON.parse(localStorage.getItem('requests')) || [];
  
    // Generate a new ID for the request
    const newId = existingData.length > 0 ? existingData[existingData.length - 1].id + 1 : 1;
  
    // Format the selectedREs as an array of objects
    const formattedREs = selectedREs.map((re) => ({
      reName: re.replace(/\s+/g, ''), // Remove spaces from the RE name
      reply: '',
      documents: [],
      action: 're',
      name: re
    }));
    const action_on = selectedREs.map((re) => (re.replace(/\s+/g, '')));
  
    // Create the new request object
    const newRequest = {
      id: newId,
      role: loggedInUser.role,
      username: loggedInUser.userName,
      selectedReType,
      selectedREs: formattedREs,
      identifiers,
      selectedAction,
      otherAction,
      description,
      priority,
      endDate,
      files: files.map((file) => file.name),
      action_on 
    };
  
    // Add the new request to the existing data
    existingData.push(newRequest);
  
    // Save the updated data to localStorage
    localStorage.setItem('requests', JSON.stringify(existingData));
  
    console.log('Data saved to local storage:', newRequest);
  };

  return (
    <div className="fiu-raise-request">
      <div className="header">
        <h1>Please Raise a Request</h1>
      </div>

      {!preview ? (
        <>
          <div className="select-re-details">
            <div className="re-type-select">
              <label>RE Type</label>
              <select value={selectedReType} onChange={handleReTypeSelect}>
                <option value="">Select RE Type</option>
                {retype.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="re-type-select">
            <label>RE Type</label>
            <button
              onClick={()=> setOpenModal(true)}
              className="add-identifier-btn"
            >
              {selectedREs.length>0 ? `${selectedREs.length} RE Selected` : 'Select RE'}
            </button>
            </div>
            {openModal && <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "#00000080",
            }}>
              <div style={{
                width: "80%",
                maxWidth: "900px",
                border: "1px solid black",
                margin: "10px auto",
                textAlign: "center",
                borderRadius: "10px",
                height: "90vh",
                justifyContent: "center",
                background: "white",
                
              }}>
                <div className='re-select-header'>
                <label>RE</label>
                <button className="add-identifier-btn"
              onClick={()=> setOpenModal(false)}
            >
              Close
            </button>
                </div>
                {reDropdownValues.length > 0 && (
                  <div className="re-select">
                    
                    <div className="multi-select" style={{overflow: "auto"}}>
                      {reDropdownValues.map((re) => (
                        <div key={re}>
                          <input
                            type="checkbox"
                            value={re}
                            checked={selectedREs.includes(re)}
                            onChange={handleReSelect}
                          />
                          <label>{re}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>}
          </div>

          <div className="identifiers-section">
        <h2>Add Identifiers</h2>
        <table className="identifiers-table">
          <thead>
            <tr>
              <th>Srl No</th>
              <th>Id Type</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {identifiers.map((identifier, index) => (
              <tr key={identifier.id}>
                <td>{identifier.id}</td>
                <td style={{display:"flex", padding:"10px"}}>
                  <select
                    value={identifier.idType}
                    onChange={(e) =>
                      handleInputChange(index, 'idType', e.target.value)
                    }
                  >
                    <option value="">Select Id Type</option>
                    {idTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {identifier.idType === 'Others' && <input
                      type="text"
                      value={identifier.otherValue}
                      onChange={(e) =>
                        handleInputChange(index, 'otherValue', e.target.value)
                      }
                      placeholder="Specify other identifier"
                      required
                    />}
                </td>
                <td>
                  
                    <input
                      type="text"
                      value={identifier.value}
                      onChange={(e) =>
                        handleInputChange(index, 'value', e.target.value)
                      }
                      required
                    />
                </td>
                <td>
                  <button onClick={() => handleDeleteIdentifier(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-identifier-btn" onClick={handleAddIdentifier}>
          Add Identifier
        </button>
        {/* <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button> */}
      </div>

          <div className="action-requested-section">
            <h2>Action Requested</h2>
            <div className="action-details">
              <div className="action-select">
                <label>Action to be Performed</label>
                <select value={selectedAction} onChange={handleActionChange}>
                  <option value="">Select an action</option>
                  <option value="Freeze a account">Freeze a account</option>
                  <option value="Hold an account">Hold an account</option>
                  <option value="Freeze Transactions">
                    Freeze Transactions
                  </option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {selectedAction === 'Others' && (
                <div className="other-action">
                  <label>Others action to perform</label>
                  <input
                    type="text"
                    value={otherAction}
                    onChange={(e) => setOtherAction(e.target.value)}
                  />
                </div>
              )}

              <div className="description">
                <label>Description of the action</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="priority-select">
                <label>Priority</label>
                <select value={priority} onChange={handlePriorityChange}>
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="end-date">
                <label>End Date to Perform Action</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
          </div>

          <div className="upload-docs-section">
            <h2>Upload Supporting Docs</h2>
            <input type="file" multiple onChange={handleFileChange} />
            {files.length > 0 && (
              <table className="files-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                      <td>
                        <button onClick={() => handleDownload(file)}>
                          Download
                        </button>
                        <button onClick={() => handleDeleteFile(index)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <button className="preview-btn" onClick={handlePreview}>
            Preview
          </button>
        </>
      ) : (
        <div className="preview-section">
          <h2>Preview</h2>
          <div className="preview-details">
            <div className="preview-item">
              <label>RE Type</label>
              <input type="text" value={selectedReType} disabled />
            </div>
            <div className="preview-item">
              <label>RE</label>
              {selectedREs.map(value => <input type="text" value={value} disabled />)}
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
                  {identifiers.map((identifier) => (
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
              <input type="text" value={selectedAction} disabled />
            </div>
            {selectedAction === 'Others' && (
              <div className="preview-item">
                <label>Others action to perform</label>
                <input type="text" value={otherAction} disabled />
              </div>
            )}
            <div className="preview-item">
              <label>Description of the action</label>
              <textarea value={description} disabled />
            </div>
            <div className="preview-item">
              <label>Priority</label>
              <input type="text" value={priority} disabled />
            </div>
            <div className="preview-item">
              <label>End Date to Perform Action</label>
              <input type="date" value={endDate} disabled />
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
                  {files.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between", padding:"20px"}}>
          <button className="submit-btn" onClick={()=> setPreview(false)}>
            <Link> Back </Link>
          </button>
          <button className="submit-btn" onClick={handleFinalSubmit}>
            <Link to="/inbox">Submit</Link>
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FIURaiseRequest;
