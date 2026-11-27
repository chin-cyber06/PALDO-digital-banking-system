<script setup>
definePageMeta({ layout: "auth" })
useHead({ title: "Create account | PALDO" })
</script>

<template>
  <div class="auth-box">
    <div class="auth-heading">
      <span class="section-mark" />
      <div><p>WELCOME TO PALDO</p><h2>Create your account</h2></div>
    </div>
    <div class="segmented">
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/register" class="active" aria-current="page">Register</NuxtLink>
    </div>
    <RegisterForm />
  </div>
</template>
