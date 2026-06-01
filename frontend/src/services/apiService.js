const BASE_URL = "http://localhost:8000";

export const checkSymptom = async (message) => {
  const res = await fetch(`${BASE_URL}/symptom/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  return data;
};

export const getNearbyHospitals = async (lat, lng) => {
  const res = await fetch(`${BASE_URL}/hospital/nearby`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latitude: lat, longitude: lng })
  });
  const data = await res.json();
  return data;
};

export const addMedicine = async (name, dosage, time) => {
  const res = await fetch(`${BASE_URL}/medicine/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, dosage, time })
  });
  const data = await res.json();
  return data;
};

export const getMedicines = async () => {
  const res = await fetch(`${BASE_URL}/medicine/list`);
  const data = await res.json();
  return data;
};

export const saveRecord = async (record) => {
  const res = await fetch(`${BASE_URL}/records/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record)
  });
  const data = await res.json();
  return data;
};

export const triggerSOS = async (lat, lng, contact) => {
  const res = await fetch(`${BASE_URL}/sos/trigger`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      contact_number: contact
    })
  });
  const data = await res.json();
  return data;
};

export const getHealthTip = async () => {
  const res = await fetch(`${BASE_URL}/health-tip`);
  const data = await res.json();
  return data;
};