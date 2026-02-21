"use client";

import useSWR from "swr";
import Box from "@mui/material/Box";
import { MuiThemeProvider } from "@/components/mui-theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { FeedbackForm } from "@/components/feedback-form";
import { UserList } from "@/components/user-list";
import { fetchUsers } from "@/lib/api";

export default function Home() {
  const { data: users = [], isLoading, mutate } = useSWR("users", fetchUsers);

  return (
    <MuiThemeProvider>
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          transition: "background-color 0.3s ease",
        }}
      >
        <ThemeToggle />
        <Box sx={{ maxWidth: "42rem", mx: "auto", px: 2, pb: 12 }}>
          <HeroSection />
          <FeedbackForm onSuccess={() => mutate()} />
          <UserList users={users} isLoading={isLoading} />
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}
