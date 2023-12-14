import React, { useCallback, useState, useEffect } from 'react';


const AuthContext = React.createContext({
  token: '',
  userName: '',
  isLoggedIn: false,
  role: '',
  companyName: '',
  login: (token) => {},
  logout: () => {},
  dashboard:false,
  company:false,
  manageRoles:false,
  forms:false,
  recruiter:false,
  referral:false,
  cms:false,
  payment: false,
  applications: false,
  invoices: false,
  notifications: false,
  needHelp:false
});


const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedUserName = localStorage.getItem('userName');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userName');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userName: storedUserName
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialUserName;

  let logoutTimer;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUserName = tokenData.userName;
  }

  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialUserName);
  const [role, setrole] = useState(localStorage.getItem('role'));
  const [companyName, setCompanyName] = useState('');
  const [dashboard, setdashboard] = useState(false);
  const [company, setcompany] = useState(false);
  const [forms, setforms] = useState(false);
  const [recruiter, setrecruiter] = useState(false);
  const [referral, setreferral] = useState(false);
  const [cms, setcms] = useState(false);
  const [manageRoles, setmanageRoles] = useState(false);
  const [payment, setpayment] = useState(false);
  const [applications, setapplications] = useState(false);
  const [invoices, setinvoices] = useState(false);
  const [notifications, setnotifications] = useState(false);
  const [needHelp, setneedHelp] = useState(false);

  const userIsLoggedIn = !!token;
  localStorage.setItem("isLoggedIn", userIsLoggedIn);
  const logoutHandler = useCallback(() => {
    setToken(null);
    setrole('');
    setCompanyName('')
    setdashboard(false);
    setcompany(false);
    setmanageRoles(false);
    setrecruiter(false);
    setreferral(false);
    setcms(false);
    setpayment(false);
    setapplications(false);
    setinvoices(false);
    setnotifications(false);
    setneedHelp(false);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmailId');
    localStorage.removeItem('companyName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('applications')
    localStorage.removeItem("dashboard");
    localStorage.removeItem("company");
    localStorage.removeItem("manageRoles");
    localStorage.removeItem("forms");
    localStorage.removeItem("recruiter");
    localStorage.removeItem("referral");
    localStorage.removeItem("cms");
    localStorage.removeItem("payment");
    localStorage.removeItem('needHelp');
    localStorage.removeItem("invoices");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

  }, []);

  const loginHandler = (token, expirationTime,userName,userId,email,role,companyName, dashboard, company, manageRoles, forms, recruiter,referral,cms,payment, applications,invoices,notifications,needHelp) => {
    setToken(token);
    setUserName(userName);
    setrole(role);
    setCompanyName(companyName)
    setdashboard(dashboard);
    setcompany(company);
    setmanageRoles(manageRoles);
    setrecruiter(recruiter);
    setreferral(referral);
    setcms(cms);
    setpayment(payment);
    setapplications(applications);
    setinvoices(invoices);
    setnotifications(notifications);
    setneedHelp(needHelp);
    setforms(forms);
   
    localStorage.setItem('token',token);
    localStorage.setItem('expirationTime',expirationTime);
    localStorage.setItem('userName',userName);
    localStorage.setItem('userId',userId);
    localStorage.setItem("userEmailId", email);
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("role", role);
    localStorage.setItem("applications",applications);
    localStorage.setItem("dashboard",dashboard);
    localStorage.setItem("company",company);
    localStorage.setItem("manageRoles",manageRoles);
    localStorage.setItem("forms",forms);
    localStorage.setItem("recruiter",recruiter);
    localStorage.setItem("referral",referral);
    localStorage.setItem("cms",cms);
    localStorage.setItem("payment",payment);
    localStorage.setItem("payment",payment);
    localStorage.setItem("invoices", invoices);
    localStorage.setItem("notifications", notifications);
    localStorage.setItem("needHelp", needHelp);
    

    logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(expirationTime))
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);


  const contextValue = {
    token: token,
    userName: userName,
    isLoggedIn: userIsLoggedIn,
    role: role,
    companyName: companyName,
    login: loginHandler,
    logout: logoutHandler,
    dashboard: dashboard,
    company: company,
    manageRoles: manageRoles,
    forms: forms,
    recruiter: recruiter,
    referral: referral,
    cms: cms,
    payment: payment,
    applications,
    invoices,
    notifications,
    needHelp,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};






export default AuthContext;