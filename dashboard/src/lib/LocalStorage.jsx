"use client";

const Local = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  },
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log(error);
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
};

export default Local;
