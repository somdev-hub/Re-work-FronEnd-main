
import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {
  statusChangePageRerender: false,
  claim_rerender: false,
  recruiter_setting: false,
  recruiterNotification_update: false,
  company_setting: false,
  companyNotification_update: false,
  admin_setting: false,
  adminNotification_update: false,
  companyPendingJob_edit: false,
  companyLiveCandidateStatus_update: false,
  adminApproveCandidate_state: false,
  jobsActionArray: [],
  candidateApplicationArray:[]
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    recruiterStatusChanged(state) {
      state.statusChangePageRerender = !state.statusChangePageRerender;
    },
    onClaimJobRerenderPage(state) {
      state.claim_rerender = !state.claim_rerender;
    },
    recruiterSetting(state) {
      state.recruiter_setting = !state.recruiter_setting;
    },
    recruiterNotificationUpdate(state) {
      state.recruiterNotification_update = !state.recruiterNotification_update;
    },
    companySetting(state) {
      state.company_setting = !state.company_setting;
    },
    companyNotificationUpdate(state) {
      state.companyNotification_update = !state.companyNotification_update;
    },
    adminSetting(state) {
      state.admin_setting = !state.admin_setting;
    },
    adminNotificationUpdate(state) {
      state.adminNotification_update = !state.adminNotification_update;
    },
    companyPendingJobEdit(state) {
      state.companyPendingJob_edit = !state.companyPendingJob_edit;
    },
    companyLiveCandidateStatusUpdate(state) {
      state.companyLiveCandidateStatus_update =
        !state.companyLiveCandidateStatus_update;
    },
    adminApproveCandidate(state) {
      state.adminApproveCandidate_state =
        !! state.adminApproveCandidate_state;
    },
    jobsAction(state, action) {
      state.jobsActionArray.push(action.payload.jobId);
    },
    candidateApplicationAction(state, action) {
   state.candidateApplicationArray.push(action.payload.applicationId);
    }
  },
});

const store = configureStore({
    reducer : { counter: counterSlice.reducer}
});

export const counterActions = counterSlice.actions;

export default store;