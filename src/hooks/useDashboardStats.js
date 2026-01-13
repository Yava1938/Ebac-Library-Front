import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "../services/dashboardService";
import { events } from "../services/events";

const STORAGE_KEY = "dashboard_stats";

const DEFAULT_STATS = {
  books: 0,
  authors: 0,
  users: 0,
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isValidStats = (data) =>
    data &&
    typeof data.books === "number" &&
    typeof data.authors === "number" &&
    typeof data.users === "number";

  const loadStats = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (!forceRefresh) {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (isValidStats(parsed)) {
            setStats(parsed);
            setLoading(false);
            return;
          }
        }
      }

      data = await dashboardService.fetchStats(forceRefresh);

      if (!isValidStats(data)) {
        data = DEFAULT_STATS;
      }

      setStats(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      setError("No se pudo cargar la información del dashboard");
      setStats(DEFAULT_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();

    const handler = () => loadStats(true); 
    const unsubscribe = events.on("refreshDashboard", handler);

    return () => unsubscribe();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    refresh: () => loadStats(true), 
  };
};