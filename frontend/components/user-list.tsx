"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { ThumbsUpIcon, ThumbsDownIcon, UserIcon } from "lucide-react";
import type { User } from "@/lib/api";

interface UserListProps {
  users: User[];
  isLoading: boolean;
}

export function UserList({ users, isLoading }: UserListProps) {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: "32rem",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mt: 8,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "text.primary",
            letterSpacing: "-0.01em",
          }}
        >
          {"Пользователи сайта:"}
        </Typography>
        <Box sx={{ height: "1px", flex: 1, bgcolor: "divider" }} />
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "text.secondary",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {users.length}
        </Typography>
      </Box>

      {isLoading && users.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={24} />
        </Box>
      ) : users.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            py: 8,
            color: "text.secondary",
          }}
        >
          <UserIcon className="size-8" style={{ opacity: 0.4 }} />
          <Typography sx={{ fontSize: "0.875rem" }}>
            {"Пока нет пользователей. Будьте первым!"}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, position: "relative" }}>
          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0,0,0,0.25)",
                zIndex: 10,
                borderRadius: "12px",
                backdropFilter: "blur(2px)",
              }}
            >
              <CircularProgress size={20} />
            </Box>
          )}
          {[...users].reverse().map((user, index) => (
            <Box
              key={user._id ?? index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                borderRadius: "12px",
                border: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                p: 2,
                transition: "border-color 0.2s ease, background-color 0.3s ease",
                "&:hover": {
                  borderColor: "text.secondary",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  bgcolor: "action.selected",
                  color: "text.primary",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "text.primary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Chip
                    size="small"
                    icon={
                      user.answer ? (
                        <ThumbsUpIcon className="size-3" />
                      ) : (
                        <ThumbsDownIcon className="size-3" />
                      )
                    }
                    label={user.answer ? "Да" : "Нет"}
                    sx={{
                      height: 22,
                      fontSize: "0.75rem",
                      bgcolor: user.answer
                        ? "rgba(70, 167, 88, 0.12)"
                        : "rgba(229, 72, 77, 0.12)",
                      color: user.answer ? "#46A758" : "#E5484D",
                      "& .MuiChip-icon": {
                        color: "inherit",
                        ml: "6px",
                      },
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    lineHeight: 1.6,
                  }}
                >
                  {user.commentary}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
