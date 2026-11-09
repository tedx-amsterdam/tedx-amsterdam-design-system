'use client';

import React, { useEffect, useRef } from 'react';
import { startAgendaClock } from '../utils/agenda-clock';

/** Marks the running item of the Agenda just before it, in Amsterdam time. Agenda renders it when it has a `date`; it renders nothing visible itself. */
export function AgendaClock(): React.ReactElement {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const list = marker.current?.previousElementSibling;
    return list instanceof HTMLElement ? startAgendaClock(list) : undefined;
  }, []);
  return <span ref={marker} hidden />;
}
