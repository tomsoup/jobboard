import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';


const INDEED_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUREY_PARAMS = {
  publisher: '2246660842297592',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10, //miles
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUREY_PARAMS, l: zip });
  return `${INDEED_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({
      type: FETCH_JOBS, payload: data
    });
    callback();
  } catch (error) {
    console.error(error);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS
  };
};
