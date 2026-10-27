import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import DbStatusBanner from "./components/DbStatusBanner";
import ProblemModal from "./components/ProblemModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

import DashboardPage from "./pages/DashboardPage";
import AllProblemsPage from "./pages/AllProblemsPage";
import RevisionPage from "./pages/RevisionPage";
import BookmarksPage from "./pages/BookmarksPage";

import api from "./services/api";
import "./App.css";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard' | 'problems' | 'revision' | 'bookmarks'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Core Data States from MongoDB
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState(null);
  const [revisions, setRevisions] = useState(null);
  const [dbStatus, setDbStatus] = useState({ database: "disconnected" });

  // UI / Loading / Error states
  const [loading, setLoading] = useState(true);
  const [errorBanner, setErrorBanner] = useState(null);

  // Filters state for problems
  const [filters, setFilters] = useState({
    search: "",
    platform: "All",
    difficulty: "All",
    status: "All",
    topic: "All",
    sortBy: "createdAt",
    order: "desc",
  });

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState(null);
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, problem: null });

  /**
   * Check Backend Health and DB Connection
   */
  const checkHealth = useCallback(async () => {
    try {
      const data = await api.checkHealth();
      setDbStatus(data);
      return data;
    } catch {
      setDbStatus({ database: "disconnected", status: "offline" });
      return null;
    }
  }, []);

  /**
   * Load problems, stats, and revisions from MongoDB
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setErrorBanner(null);

    const health = await checkHealth();

    // If database is disconnected, we show the status banner and don't flood errors
    if (!health || health.database !== "connected") {
      setLoading(false);
      return;
    }

    try {
      const [problemsRes, statsRes, revisionsRes] = await Promise.all([
        api.getProblems(filters),
        api.getStats(),
        api.getRevisions(),
      ]);

      setProblems(problemsRes.data || []);
      setStats(statsRes.data || null);
      setRevisions(revisionsRes.data || null);
    } catch (err) {
      console.error("Error loading MERN data:", err);
      setErrorBanner(err.message || "Failed to communicate with the database.");
    } finally {
      setLoading(false);
    }
  }, [filters, checkHealth]);

  // Initial load and filter changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  /**
   * Handle Create or Update Problem
   */
  const handleSaveProblem = async (formData) => {
    if (problemToEdit) {
      await api.updateProblem(problemToEdit._id, formData);
    } else {
      await api.createProblem(formData);
    }
    await loadData();
  };

  /**
   * Handle Delete Problem
   */
  const handleDeleteConfirm = async (problemId) => {
    try {
      await api.deleteProblem(problemId);
      setDeleteModalState({ isOpen: false, problem: null });
      await loadData();
    } catch (err) {
      alert(`Error deleting problem: ${err.message}`);
    }
  };

  /**
   * Toggle problem status (Solved -> Attempted -> Bookmarked -> Solved)
   */
  const handleToggleStatus = async (problem) => {
    const cycle = {
      Solved: "Attempted",
      Attempted: "Bookmarked",
      Bookmarked: "Solved",
    };
    const nextStatus = cycle[problem.status] || "Solved";

    try {
      await api.updateProblem(problem._id, { status: nextStatus });
      await loadData();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  /**
   * Toggle problem bookmark status directly (Solved/Attempted <-> Bookmarked)
   */
  const handleToggleBookmark = async (problem) => {
    const nextStatus = problem.status === "Bookmarked" ? "Solved" : "Bookmarked";
    try {
      await api.updateProblem(problem._id, { status: nextStatus });
      await loadData();
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  /**
   * Handle Revision completion
   */
  const handleCompleteRevision = async (problemId) => {
    try {
      await api.markRevisionComplete(problemId);
      await loadData();
    } catch (err) {
      console.error("Error marking revision complete:", err);
    }
  };

  /**
   * Handle Revision rescheduling
   */
  const handleRescheduleRevision = async (problemId, newDate) => {
    try {
      await api.rescheduleRevision(problemId, newDate);
      await loadData();
    } catch (err) {
      console.error("Error rescheduling revision:", err);
    }
  };

  /**
   * Seed demo problems for immediate testing
   */
  const handleSeedDemo = async () => {
    try {
      setLoading(true);
      await api.seedDemoProblems();
      await loadData();
    } catch (err) {
      alert(`Demo seeding failed: ${err.message}. Ensure MongoDB is active.`);
      setLoading(false);
    }
  };

  /**
   * Retry database reconnection
   */
  const handleRetryDb = async () => {
    try {
      await api.retryDbConnection();
      await loadData();
    } catch (err) {
      console.error("Retry DB failed:", err);
    }
  };

  // View Title helper
  const viewTitles = {
    dashboard: "Dashboard Overview",
    problems: "All Tracked Problems",
    revision: "Revision Queue",
    bookmarks: "Bookmarked Problems",
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        dueRevisionsCount={stats?.revisions?.due || 0}
        bookmarkedCount={stats?.bookmarkedCount || 0}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <div className="main-wrapper">
        {/* Top Header */}
        <TopNav
          title={viewTitles[currentView]}
          dbStatus={dbStatus}
          onRetryDb={handleRetryDb}
          onOpenAddModal={() => {
            setProblemToEdit(null);
            setIsModalOpen(true);
          }}
          onSeedDemo={handleSeedDemo}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        <main className="page-container">
          {/* Proactive Database Status Banner */}
          <DbStatusBanner dbStatus={dbStatus} onRetry={handleRetryDb} />

          {/* Error Banner */}
          {errorBanner && (
            <div className="alert-banner alert-danger">
              <span>⚠️ {errorBanner}</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={loadData}
              >
                Retry
              </button>
            </div>
          )}

          {/* View Routing */}
          {currentView === "dashboard" && (
            <DashboardPage
              stats={stats}
              revisions={revisions}
              onEditProblem={(prob) => {
                setProblemToEdit(prob);
                setIsModalOpen(true);
              }}
              onDeleteProblem={(prob) =>
                setDeleteModalState({ isOpen: true, problem: prob })
              }
              onToggleStatus={handleToggleStatus}
              onToggleBookmark={handleToggleBookmark}
              onCompleteRevision={handleCompleteRevision}
              onRescheduleRevision={handleRescheduleRevision}
              onNavigateToProblems={() => setCurrentView("problems")}
              onOpenAddModal={() => {
                setProblemToEdit(null);
                setIsModalOpen(true);
              }}
            />
          )}

          {currentView === "problems" && (
            <AllProblemsPage
              problems={problems}
              filters={filters}
              setFilters={setFilters}
              onResetFilters={() =>
                setFilters({
                  search: "",
                  platform: "All",
                  difficulty: "All",
                  status: "All",
                  topic: "All",
                  sortBy: "createdAt",
                  order: "desc",
                })
              }
              onEditProblem={(prob) => {
                setProblemToEdit(prob);
                setIsModalOpen(true);
              }}
              onDeleteProblem={(prob) =>
                setDeleteModalState({ isOpen: true, problem: prob })
              }
              onToggleStatus={handleToggleStatus}
              onToggleBookmark={handleToggleBookmark}
              onOpenAddModal={() => {
                setProblemToEdit(null);
                setIsModalOpen(true);
              }}
              loading={loading}
            />
          )}

          {currentView === "revision" && (
            <RevisionPage
              revisions={revisions}
              onCompleteRevision={handleCompleteRevision}
              onRescheduleRevision={handleRescheduleRevision}
              onOpenAddModal={() => {
                setProblemToEdit(null);
                setIsModalOpen(true);
              }}
              loading={loading}
            />
          )}

          {currentView === "bookmarks" && (
            <BookmarksPage
              problems={problems}
              onEditProblem={(prob) => {
                setProblemToEdit(prob);
                setIsModalOpen(true);
              }}
              onDeleteProblem={(prob) =>
                setDeleteModalState({ isOpen: true, problem: prob })
              }
              onToggleStatus={handleToggleStatus}
              onToggleBookmark={handleToggleBookmark}
              onOpenAddModal={() => {
                setProblemToEdit(null);
                setIsModalOpen(true);
              }}
              loading={loading}
            />
          )}
        </main>
      </div>

      {/* Add / Edit Problem Modal */}
      <ProblemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProblemToEdit(null);
        }}
        onSave={handleSaveProblem}
        problemToEdit={problemToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        problem={deleteModalState.problem}
        onClose={() => setDeleteModalState({ isOpen: false, problem: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
