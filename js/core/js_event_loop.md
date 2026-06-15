# Event loop

## 1. Event Loop in the Browser (Brief Overview)

The **Event Loop** is a mechanism that allows JavaScript to perform non-blocking asynchronous operations, despite being a single-threaded language (executing one command at a time).

### Key Components:

* **Call Stack:** The place where the current synchronous code is executed.
* **Web APIs:** Browser features (timers, network requests, DOM events) that work in the background.
* **Microtask Queue:** A VIP queue for high-priority, lightweight asynchronous tasks.
* **Macrotask Queue (Task Queue):** A queue for scheduled or heavier tasks.

### The Cycle (Algorithm):

1. Execute all synchronous code currently in the **Call Stack**.
2. **Completely** empty the **Microtask Queue** (if new microtasks are added during this step, they are also executed immediately).
3. The browser updates the rendering (if necessary).
4. Take and execute exactly **one** task from the **Macrotask Queue**.
5. Repeat the cycle (check the Call Stack, then Microtasks, etc.).

---

## 2. Browser Queues and Priorities

| Queue | What goes into it | Priority | Execution Behavior |
| --- | --- | --- | --- |
| **Microtasks** | `Promise.then / .catch / .finally`, `queueMicrotask()`, `MutationObserver` | **High** | Executes **all** tasks in the queue until it is completely empty. |
| **Macrotasks** | `setTimeout`, `setInterval`, I/O events, UI interactions (clicks, inputs), rendering | **Low** | Executes only **one** task per cycle step. |

---

## 3. Browser Code Example

### Code:

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. Macrotask: Timer 1');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask: Promise 1');
  
  Promise.resolve().then(() => {
    console.log('4. Microtask: Promise 2 (inside Promise 1)');
  });
  
  setTimeout(() => {
    console.log('5. Macrotask: Timer 2 (inside Promise 1)');
  }, 0);
});

console.log('6. End');

```

### Console Output Order:

```text
1. Start
6. End
3. Microtask: Promise 1
4. Microtask: Promise 2 (inside Promise 1)
2. Macrotask: Timer 1
5. Macrotask: Timer 2 (inside Promise 1)

```

---

## 4. Event Loop in Node.js (Brief Overview)

In Node.js, the Event Loop is based on the **libuv** library and is highly optimized for I/O operations (file system, network). Unlike the browser, it consists of distinct **phases**.

### Key Components (Main Phases):

1. **Timers:** Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2. **Pending Callbacks:** Executes I/O callbacks deferred to the next loop iteration (e.g., system-level TCP errors).
3. **Poll:** Retrieves new I/O events; executes I/O related callbacks.
4. **Check:** Executes `setImmediate()` callbacks.
5. **Close Callbacks:** Executes close events (e.g., `socket.on('close', ...)`).

---

## 5. Node.js Queues and Priorities

Node.js has two "VIP" queues that bypass the standard Event Loop phases. They are executed **immediately after the current operation finishes**, before the Event Loop moves to the next phase.

| Queue | What goes into it | Priority | When it executes |
| --- | --- | --- | --- |
| **`process.nextTick`** | `process.nextTick()` callbacks | **Highest (Priority #1)** | Immediately after the current synchronous code/callback, before any Promises. |
| **Microtasks** | Promises (`.then/.catch`) | **High (Priority #2)** | Immediately after the `process.nextTick` queue is completely empty. |
| **Event Loop Phases** | `setTimeout`, `setImmediate`, I/O callbacks | **Normal (Priority #3)** | Sequentially, according to the current active phase of the Event Loop. |

---

## 6. Node.js Code Example

### Code:

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. Timer (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (Microtask)');
});

process.nextTick(() => {
  console.log('4. process.nextTick');
});

console.log('5. End');

```

### Console Output Order:

```text
1. Start
5. End
4. process.nextTick
3. Promise (Microtask)
2. Timer (setTimeout)

```

---

## 7. Browser vs Node.js

| Feature          | Browser | Node.js |
|------------------| --- | --- |
| **Architecture** | Simple (Call Stack + 2 main queues) | Complex / Phase-based (Call Stack + multi-level queues) |
| **Priority #1**  |  -  | `nextTick` Queue |
| **Priority #2**  | Microtask Queue | Microtask Queue |
| **Priority #3**  | Macrotask Queue | Event Loop Phases |
| **Environment-Specific Tools** | `requestAnimationFrame`, DOM Events | `process.nextTick()`, `setImmediate()` |
| **Queue Execution Behavior** | One Macrotask -> All Microtasks | Checks `nextTick` and Microtasks **immediately after every** executed callback within any given phase. |