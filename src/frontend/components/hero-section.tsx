"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        pt: 12,
        pb: 8,
        px: 2,
        textAlign: "center",
      }}
    >
      <Chip
        size="small"
        label={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "success.main",
              }}
            />
            {"Принимаем отзывы"}
          </Box>
        }
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          color: "text.secondary",
          fontSize: "0.75rem",
          letterSpacing: "0.02em",
          height: 30,
        }}
      />
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "text.primary",
          maxWidth: "40rem",
          textWrap: "balance",
          lineHeight: 1.1,
        }}
      >
        {"Поделитесь мнением"}
      </Typography>
      <Typography
        sx={{
          maxWidth: "28rem",
          color: "text.secondary",
          fontSize: "1rem",
          lineHeight: 1.6,
          textWrap: "pretty",
        }}
      >
        {"Заполните форму ниже и посмотрите, что думают другие. Ваш ответ появится в ленте мгновенно."}
      </Typography>
    </Box>
  );
}
