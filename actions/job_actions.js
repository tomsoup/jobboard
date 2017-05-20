import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import {
  FETCH_JOBS
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

export const fetchJobs = (region) => async (dispatch) => {
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({
      type: FETCH_JOBS, payload: data
    });
  } catch (error) {
    console.error(error);
  }
};
