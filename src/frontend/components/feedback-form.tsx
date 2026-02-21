"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import { createUser } from "@/lib/api";
import { SendIcon, CheckIcon } from "lucide-react";

interface FormErrors {
  name?: string;
  commentary?: string;
  isLiked?: string;
}

interface FeedbackFormProps {
  onSuccess: () => void;
}

export function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [commentary, setCommentary] = useState("");
  const [isLiked, setIsLiked] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Введите имя";
    } else if (name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!commentary.trim()) {
      newErrors.commentary = "Введите комментарий";
    } else if (commentary.trim().length < 5) {
      newErrors.commentary = "Комментарий должен содержать минимум 5 символов";
    }

    if (!isLiked) {
      newErrors.isLiked = "Выберите вариант";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await createUser({
        name: name.trim(),
        commentary: commentary.trim(),
        answer: isLiked === "yes",
      });

      setName("");
      setCommentary("");
      setIsLiked("");
      setErrors({});
      setShowSuccess(true);
      onSuccess();
      setTimeout(() => setShowSuccess(false), 2500);
    } catch {
      setErrors({ name: "Ошибка отправки. Попробуйте ещё раз." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "32rem",
        mx: "auto",
        borderRadius: "12px",
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        p: { xs: 3, sm: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        transition: "all 0.3s ease",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 0 30px rgba(167, 139, 250, 0.05)"
            : "none",
      }}
    >
      <TextField
        label="Name"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />

      <TextField
        label="Commentary"
        placeholder="Ваш комментарий"
        value={commentary}
        onChange={(e) => {
          setCommentary(e.target.value);
          if (errors.commentary)
            setErrors((prev) => ({ ...prev, commentary: undefined }));
        }}
        error={!!errors.commentary}
        helperText={errors.commentary}
        multiline
        rows={3}
        fullWidth
      />

      <FormControl error={!!errors.isLiked}>
        <FormLabel
          sx={{
            color: "text.primary",
            fontSize: "0.875rem",
            fontWeight: 500,
            "&.Mui-focused": { color: "text.primary" },
          }}
        >
          {"Вам нравится эта форма?"}
        </FormLabel>
        <RadioGroup
          row
          value={isLiked}
          onChange={(e) => {
            setIsLiked(e.target.value);
            if (errors.isLiked)
              setErrors((prev) => ({ ...prev, isLiked: undefined }));
          }}
          sx={{ gap: 2, mt: 0.5 }}
        >
          <FormControlLabel
            value="yes"
            control={<Radio size="small" />}
            label="Да"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.875rem",
                color: "text.primary",
              },
            }}
          />
          <FormControlLabel
            value="no"
            control={<Radio size="small" />}
            label="Нет"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.875rem",
                color: "text.primary",
              },
            }}
          />
        </RadioGroup>
        {errors.isLiked && <FormHelperText>{errors.isLiked}</FormHelperText>}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        fullWidth
        sx={{ height: 42, gap: 1 }}
      >
        {isSubmitting ? (
          <>
            <CircularProgress size={16} color="inherit" />
            {"Отправка..."}
          </>
        ) : showSuccess ? (
          <>
            <CheckIcon className="size-4" />
            {"Отправлено"}
          </>
        ) : (
          <>
            <SendIcon className="size-4" />
            {"Отправить"}
          </>
        )}
      </Button>
    </Box>
  );
}
