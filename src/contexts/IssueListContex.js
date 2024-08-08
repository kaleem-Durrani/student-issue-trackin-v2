import React, { createContext, useState, useEffect, useContext } from "react";
import studentApis from "../api/studentApis";
import adminApis from "../api/adminApis";
import departmentAdminApis from "../api/departmentAdminApis";
import useApi from "../hooks/useApi";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const IssueListContext = createContext();

export const useIssueList = () => useContext(IssueListContext);

export const IssueListProvider = ({ children }) => {
  const [issueList, setIssueList] = useState(null);
  const { user } = useAuth();

  // console.log(user, user?.adminType);

  let selectedApi;
  if (!user?.adminType) {
    selectedApi = studentApis.getStudentIssues;
  } else if (user.adminType === "mainAdmin") {
    selectedApi = adminApis.getAllIssues;
  } else if (user.adminType !== "mainAdmin") {
    selectedApi = departmentAdminApis.getDepartmentIssues;
  }

  // Initialize a single useApi hook
  const issueListApi = useApi(selectedApi);

  const fetchIssueList = async () => {
    // Determine which API to call based on the user type
    await issueListApi.request();
  };

  useEffect(() => {
    if (issueListApi.data) {
      // toast.success(issueListApi.data.message);
      setIssueList(issueListApi.data.issues);
      return;
    }

    if (issueListApi.error) {
      // toast.error(
      //   issueListApi.responseProblem,
      //   issueListApi.errorStatus,
      //   ": ",
      //   issueListApi.error
      // );
      return;
    }
  }, [issueListApi.data, issueListApi.error]);

  const refreshIssueList = async () => {
    await fetchIssueList();
  };

  const resetIssueList = () => {
    // console.log("clearing issue list");
    setIssueList(null);
    // console.log("issue list cleared");
  };

  return (
    <IssueListContext.Provider
      value={{
        resetIssueList,
        issueList,
        fetchIssueList,
        refreshIssueList,
        loading: issueListApi.loading,
        isError: issueListApi.isError,
        error: issueListApi.error,
        responseProblem: issueListApi.responseProblem,
        errorStatus: issueListApi.errorStatus,
      }}
    >
      {children}
    </IssueListContext.Provider>
  );
};
