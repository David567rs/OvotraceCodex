// app/auth/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    // Este Stack envolverá automáticamente
    // login.tsx, forgot-password.tsx, reset-password.tsx, etc.
    <Stack
      screenOptions={{
        headerShown: false, // oculta cabeceras nativas
      }}
    />
  );
}
