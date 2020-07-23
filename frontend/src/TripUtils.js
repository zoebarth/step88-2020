import { fetchJson } from './fetchJson.js';

export const createTrip = async (email, tripData) => {
  const url = `/api/v1/createTrip?email=${email}&tripData=${JSON.stringify(tripData)}`;
  return await fetchJson(url);
};

export const getTrip = async (tripId) => {
  const url = `/api/v1/readTrip?tripId=${tripId}`;
  return await fetchJson(url);
};

export const updateTrip = async (tripId, tripData) => {
  const url = `/api/v1/updateTrip?tripId=${tripId}&tripData=${JSON.stringify(
    tripData
  )}`;
  return await fetchJson(url);
};

export const getAllUserTrips = async (email) => {
  const url = `/api/v1/readAllUserTrips?email=${email}`;
  return await fetchJson(url);
};
