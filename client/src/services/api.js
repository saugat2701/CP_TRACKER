/**
 * CP Task Manager - Centralized API Service Module
 * Handles all HTTP requests between the React frontend and Express backend.
 */

const API_BASE = "/api";

/**
 * Universal JSON response handler
 */
async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  let data = null;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `HTTP error ${response.status}: ${response.statusText}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * API Service Methods
 */
export const api = {
  // Health & Database status
  async checkHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse(res);
  },

  async retryDbConnection() {
    const res = await fetch(`${API_BASE}/health/reconnect`, {
      method: "POST",
    });
    return handleResponse(res);
  },

  // Problems CRUD
  async getProblems(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "" && val !== "All") {
        searchParams.append(key, val);
      }
    });

    const queryString = searchParams.toString();
    const url = queryString ? `${API_BASE}/problems?${queryString}` : `${API_BASE}/problems`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getProblemById(id) {
    const res = await fetch(`${API_BASE}/problems/${id}`);
    return handleResponse(res);
  },

  async createProblem(problemData) {
    const res = await fetch(`${API_BASE}/problems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(problemData),
    });
    return handleResponse(res);
  },

  async updateProblem(id, problemData) {
    const res = await fetch(`${API_BASE}/problems/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(problemData),
    });
    return handleResponse(res);
  },

  async deleteProblem(id) {
    const res = await fetch(`${API_BASE}/problems/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },

  // Statistics
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    return handleResponse(res);
  },

  // Revisions
  async getRevisions() {
    const res = await fetch(`${API_BASE}/revisions`);
    return handleResponse(res);
  },

  async markRevisionComplete(id) {
    const res = await fetch(`${API_BASE}/revisions/${id}/complete`, {
      method: "PUT",
    });
    return handleResponse(res);
  },

  async rescheduleRevision(id, revisionDate) {
    const res = await fetch(`${API_BASE}/revisions/${id}/reschedule`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revisionDate }),
    });
    return handleResponse(res);
  },

  // Demo seed and clear utilities
  async seedDemoProblems() {
    const res = await fetch(`${API_BASE}/problems/seed`, {
      method: "POST",
    });
    return handleResponse(res);
  },

  async clearAllProblems() {
    const res = await fetch(`${API_BASE}/problems/clear`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },
};

export default api;
