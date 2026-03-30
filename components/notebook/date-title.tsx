"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { formatDiaryDate } from "@/utils/format-diary-date";
import styles from "./notebook.module.css";

function millisecondsUntilTomorrow(date: Date) {
  const tomorrow = new Date(date);
  tomorrow.setHours(24, 0, 0, 0);

  return tomorrow.getTime() - date.getTime();
}

export function DateTitle() {
  const [label, setLabel] = useState<string | null>(null);

  const syncDateLabel = useEffectEvent(() => {
    setLabel(formatDiaryDate(new Date()));
  });

  useEffect(() => {
    let timeoutId: number | undefined;

    const scheduleRefresh = () => {
      const now = new Date();
      syncDateLabel();

      timeoutId = window.setTimeout(() => {
        scheduleRefresh();
      }, millisecondsUntilTomorrow(now) + 1000);
    };

    scheduleRefresh();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <p className={styles.dateLabel} suppressHydrationWarning>
      {label ?? " "}
    </p>
  );
}
