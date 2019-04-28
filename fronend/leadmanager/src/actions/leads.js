import axios from "axios";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";
import { createMessage, returnErrors } from "./messages";
// this is use to set data end points with token
import { tokenConfig } from "./auth";

//GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/leads/", tokenConfig(getState))
    .then(res => {
      //this dispatch call to store
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err =>
      //this is  dispatch called to action
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE LEAD
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      //this dispatch call action of message
      dispatch(createMessage({ deleteLead: "Lead Deleted" }));
      //this dispatch is call reducer of Lead
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

//ADD LEAD
export const addLead = lead => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/leads/", lead, tokenConfig(getState))
    .then(res => {
      //this dispatch call action of message
      dispatch(createMessage({ addedLead: "Lead Added" }));
      //this dispatch is call reducer of Lead
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err => {
      //console.log(err.response.data)
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
