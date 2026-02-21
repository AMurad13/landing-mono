"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

type Mode = "light" | "dark";

interface ThemeModeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: "light",
  toggleMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

function buildTheme(mode: Mode) {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      background: {
        default: isLight ? "#FAF8F5" : "#050505",
        paper: isLight ? "#FFFFFF" : "#111116",
      },
      primary: {
        main: isLight ? "#1A1A1A" : "#A78BFA",
      },
      secondary: {
        main: isLight ? "#6B6B6B" : "#9CA3AF",
      },
      error: {
        main: "#E5484D",
      },
      success: {
        main: "#34D399",
      },
      text: {
        primary: isLight ? "#1A1A1A" : "#F0F0F0",
        secondary: isLight ? "#6B6B6B" : "#9CA3AF",
      },
      divider: isLight ? "#E8E4DF" : "#232329",
    },
    typography: {
      fontFamily: "'Geist', sans-serif",
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isLight ? "#FAF8F5" : "#050505",
            color: isLight ? "#1A1A1A" : "#EDEDED",
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          size: "small",
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: isLight ? "#FFFFFF" : "#18181E",
              borderRadius: 10,
              transition: "background-color 0.3s ease, border-color 0.3s ease",
              "& fieldset": {
                borderColor: isLight ? "#E8E4DF" : "#2E2E38",
              },
              "&:hover fieldset": {
                borderColor: isLight ? "#C5C0BA" : "#A78BFA",
              },
              "&.Mui-focused fieldset": {
                borderColor: isLight ? "#1A1A1A" : "#A78BFA",
                borderWidth: 1.5,
              },
            },
            "& .MuiInputLabel-root": {
              color: isLight ? "#999590" : "#7A7A88",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: isLight ? "#1A1A1A" : "#A78BFA",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none" as const,
            fontWeight: 500,
            borderRadius: 10,
            fontSize: "0.875rem",
          },
          containedPrimary: {
            backgroundColor: isLight ? "#1A1A1A" : "#A78BFA",
            color: isLight ? "#FFFFFF" : "#050505",
            "&:hover": {
              backgroundColor: isLight ? "#333333" : "#8B5CF6",
            },
            "&.Mui-disabled": {
              backgroundColor: isLight ? "#E8E4DF" : "#232329",
              color: isLight ? "#BFBAB5" : "#55556A",
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: isLight ? "#C5C0BA" : "#3E3E4A",
            "&.Mui-checked": {
              color: isLight ? "#1A1A1A" : "#A78BFA",
            },
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: isLight ? "#999590" : "#A78BFA",
          },
        },
      },
    },
  });
}

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = globalThis.localStorage?.getItem("theme-mode") as Mode | null;
    if (saved === "dark" || saved === "light") {
      setMode(saved);
    }
    setMounted(true);
  }, []);

  function toggleMode() {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      globalThis.localStorage?.setItem("theme-mode", next);
      return next;
    });
  }

  const theme = buildTheme(mode);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
