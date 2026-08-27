import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

// with expiry 
// import { useState, useEffect } from "react";

// export default function useLocalStorage(key, initial, expiryMs) {
//   const [state, setState] = useState(() => {
//     try {
//       const raw = localStorage.getItem(key);
//       if (!raw) return initial;

//       const saved = JSON.parse(raw);

//       if (saved.expiresAt && Date.now() > saved.expiresAt) {
//         localStorage.removeItem(key);
//         return initial;
//       }

//       return saved.value;
//     } catch {
//       return initial;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(
//       key,
//       JSON.stringify({
//         value: state,
//         expiresAt: expiryMs ? Date.now() + expiryMs : null,
//       })
//     );
//   }, [key, state, expiryMs]);

//   return [state, setState];
// }