"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

type FieldType = "TEXT" | "LIST" | "RADIO";

interface FieldConfig {
  id: number;
  name: string;
  fieldType: FieldType;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required?: boolean;
  listOfValues1?: string[];
}

const CONFIG: FieldConfig[] = [
  {
    id: 1,
    name: "Full Name",
    fieldType: "TEXT",
    minLength: 1,
    maxLength: 100,
    defaultValue: "John Doe",
    required: true,
  },
  {
    id: 2,
    name: "Email",
    fieldType: "TEXT",
    minLength: 1,
    maxLength: 50,
    defaultValue: "hello@mail.com",
    required: true,
  },
  {
    id: 6,
    name: "Gender",
    fieldType: "LIST",
    defaultValue: "Male",
    required: true,
    listOfValues1: ["Male", "Female", "Others"],
  },
  {
    id: 7,
    name: "Love React?",
    fieldType: "RADIO",
    defaultValue: "Yes",
    required: true,
    listOfValues1: ["Yes", "No"],
  },
];

const defaultValues = {
  "Full Name": "John Doe",
  Email: "hello@mail.com",
  Gender: "Male",
  "Love React?": "Yes",
};

const LOCAL_STORAGE_KEY = "dynamic-signup-form";

const Page = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem(LOCAL_STORAGE_KEY)
        : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        reset(parsed);
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  }, [reset]);

  const onSubmit = (data: any) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
    alert("Form submitted: " + JSON.stringify(data, null, 2));
  };

  const renderField = (field: FieldConfig) => {
    const name = field.name as keyof typeof defaultValues;

    if (field.fieldType === "TEXT") {
      return (
        <Controller
          key={field.id}
          name={name}
          control={control}
          rules={{
            required: field.required ? `${field.name} is required` : false,
            minLength: field.minLength
              ? {
                  value: field.minLength,
                  message: `Minimum length is ${field.minLength}`,
                }
              : undefined,
            maxLength: field.maxLength
              ? {
                  value: field.maxLength,
                  message: `Maximum length is ${field.maxLength}`,
                }
              : undefined,
          }}
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              fullWidth
              label={field.name}
              margin="normal"
              error={!!errors[name]}
              helperText={errors[name]?.message as string | undefined}
            />
          )}
        />
      );
    }

    if (field.fieldType === "LIST") {
      return (
        <Controller
          key={field.id}
          name={name}
          control={control}
          rules={{
            required: field.required ? `${field.name} is required` : false,
          }}
          render={({ field: rhfField }) => (
            <FormControl fullWidth margin="normal" error={!!errors[name]}>
              <FormLabel>{field.name}</FormLabel>
              <Select
                {...rhfField}
                value={rhfField.value || field.defaultValue || ""}
              >
                {(field.listOfValues1 ?? []).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );
    }

    if (field.fieldType === "RADIO") {
      return (
        <Controller
          key={field.id}
          name={name}
          control={control}
          rules={{
            required: field.required ? `${field.name} is required` : false,
          }}
          render={({ field: rhfField }) => (
            <FormControl margin="normal" error={!!errors[name]}>
              <FormLabel>{field.name}</FormLabel>
              <RadioGroup
                {...rhfField}
                row
                value={rhfField.value || field.defaultValue || ""}
              >
                {(field.listOfValues1 ?? []).map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />
      );
    }

    return null;
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {CONFIG.map((field) => (
              <Grid key={field.id} size={{ xs: 12, sm: 12 }}>
                {renderField(field)}
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={() => reset(defaultValues)}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Page;
