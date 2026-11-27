<script setup>
definePageMeta({ layout: "auth" })
useHead({ title: "Log in | PALDO" })
</script>

<template>
  <div class="auth-box">
    <div class="auth-heading">
      <span class="section-mark" />
      <div><p>WELCOME TO PALDO</p><h2>Good to see you again</h2></div>
    </div>
    <div class="segmented">
      <NuxtLink to="/login" class="active" aria-current="page">Login</NuxtLink>
      <NuxtLink to="/register">Register</NuxtLink>
    </div>
    <LoginForm />
  </div>
</template>
