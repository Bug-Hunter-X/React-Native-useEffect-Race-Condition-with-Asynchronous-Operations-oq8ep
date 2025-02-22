# React Native useEffect Race Condition

This repository demonstrates a common race condition in React Native applications that can occur when using the `useEffect` hook with asynchronous operations.  The issue arises when an asynchronous operation initiated within a `useEffect` hook completes *after* the component has unmounted. This can lead to warnings, unexpected behavior, or even crashes.

## Problem

The `bug.js` file shows an example of this problem where the `fetchData` function simulates an asynchronous API call. If the component unmounts before the `fetchData` promise resolves, the subsequent `setState` call may cause errors.  The problem is exacerbated if the component mounts and unmounts frequently.

## Solution

The `bugSolution.js` file presents a solution using the `AbortController` API to manage the asynchronous request.  This allows us to cleanly cancel the request if the component unmounts before it completes, preventing potential errors.  Alternatively, you can use `useRef` to track the component's mounted state.