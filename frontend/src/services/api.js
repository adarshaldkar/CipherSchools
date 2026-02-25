const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}

async function parseResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(
      `Server returned an unexpected response (${res.status}). Please try again later.`
    );
  }
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || `Request failed with status ${res.status}`);
  }
  return json;
}

export async function fetchAssignments() {
  const res = await fetch(`${BASE_URL}/api/assignments`);
  const json = await parseResponse(res);
  return json.data;
}

export async function fetchAssignmentById(id) {
  const res = await fetch(`${BASE_URL}/api/assignments/${id}`);
  const json = await parseResponse(res);
  return json.data;
}

export async function executeQuery(query) {
  const res = await fetch(`${BASE_URL}/api/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await parseResponse(res);
  return json.data;
}

export async function getHint(assignmentId, query) {
  const res = await fetch(`${BASE_URL}/api/hint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignmentId, query }),
  });
  const json = await parseResponse(res);
  return json.hint;
}

export async function signupUser(name, email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const json = await parseResponse(res);
  return json.data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await parseResponse(res);
  return json.data;
}

export async function googleAuthUser(credential) {
  const res = await fetch(`${BASE_URL}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential }),
  });
  const json = await parseResponse(res);
  return json.data;
}

export async function fetchCurrentUser() {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: getAuthHeader(),
  });
  const json = await parseResponse(res);
  return json.data;
}
