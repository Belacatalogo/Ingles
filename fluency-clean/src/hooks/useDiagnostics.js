import { useEffect, useState } from 'react';
import { diagnostics } from '../services/diagnostics.js';

export function useDiagnostics() {
  const [state, setState] = useState(() => diagnostics.snapshot());

  useEffect(() => diagnostics.subscribe(setState), []);

  return state;
}
