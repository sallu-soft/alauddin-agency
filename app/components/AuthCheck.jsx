'use client'
export  const isLoggedIn = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : false;
console.log(auth.user)