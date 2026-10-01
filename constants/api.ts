// TODO EXAM: Use the API base URL provided by the instructor.
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export function getApiUrl(path: string) {
  if (!/^https?:\/\//i.test(API_BASE_URL)) {
    throw new Error('Set the instructor-provided API base URL in constants/api.ts.');
  }

  return `${API_BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

// Expected endpoints:
// POST /login
// GET /students
// GET /students/{id}
// GET /profile
// TODO EXAM: Confirm request/response fields against the instructor's API documentation.
