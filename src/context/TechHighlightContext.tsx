import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface TechHighlightContextType {
  selectedTech: string | null;
  setSelectedTech: (tech: string | null) => void;
  hoveredTech: string | null;
  setHoveredTech: (tech: string | null) => void;
  activeInspectProjectId: number | null;
  openInspectDrawer: (projectId: number) => void;
  closeInspectDrawer: () => void;
  isTechMatch: (techList: string[], targetTech?: string | null) => boolean;
}

const TechHighlightContext = createContext<TechHighlightContextType | undefined>(undefined);

// Normalizes strings for resilient partial matching (e.g. "Next.js" matches "Next.js 16")
const normalizeTech = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9]/g, '');

export const TechHighlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTech, setSelectedTechState] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activeInspectProjectId, setActiveInspectProjectId] = useState<number | null>(null);

  const setSelectedTech = useCallback((tech: string | null) => {
    setSelectedTechState((prev) => (prev === tech ? null : tech));
  }, []);

  const openInspectDrawer = useCallback((projectId: number) => {
    setActiveInspectProjectId(projectId);
  }, []);

  const closeInspectDrawer = useCallback(() => {
    setActiveInspectProjectId(null);
  }, []);

  const isTechMatch = useCallback(
    (techList: string[], targetTech = selectedTech || hoveredTech): boolean => {
      if (!targetTech) return true;
      const targetNorm = normalizeTech(targetTech);
      return techList.some((t) => {
        const itemNorm = normalizeTech(t);
        return itemNorm.includes(targetNorm) || targetNorm.includes(itemNorm);
      });
    },
    [selectedTech, hoveredTech]
  );

  const value = useMemo(
    () => ({
      selectedTech,
      setSelectedTech,
      hoveredTech,
      setHoveredTech,
      activeInspectProjectId,
      openInspectDrawer,
      closeInspectDrawer,
      isTechMatch,
    }),
    [
      selectedTech,
      setSelectedTech,
      hoveredTech,
      setHoveredTech,
      activeInspectProjectId,
      openInspectDrawer,
      closeInspectDrawer,
      isTechMatch,
    ]
  );

  return <TechHighlightContext.Provider value={value}>{children}</TechHighlightContext.Provider>;
};

export const useTechHighlight = (): TechHighlightContextType => {
  const ctx = useContext(TechHighlightContext);
  if (!ctx) {
    throw new Error('useTechHighlight must be used within a TechHighlightProvider');
  }
  return ctx;
};
