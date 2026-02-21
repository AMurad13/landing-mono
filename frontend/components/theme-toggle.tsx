"use client";

import IconButton from "@mui/material/IconButton";
import { SunIcon, MoonIcon } from "lucide-react";
import { useThemeMode } from "@/components/mui-theme-provider";

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton
      onClick={toggleMode}
      aria-label="Toggle theme"
      size="small"
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 50,
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        color: "text.primary",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "action.hover",
          borderColor: "text.secondary",
        },
      }}
    >
      {mode === "light" ? (
        <MoonIcon className="size-4" />
      ) : (
        <SunIcon className="size-4" />
      )}
    </IconButton>
  );
}
