"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import type { ActionConfig, BrandTabConfig, ModalVariant } from "./types";
import styles from "./notebook.module.css";

const SpotifyPanel = dynamic(() => import("./spotify-panel"), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingState} aria-live="polite">
      Загрузка плеера…
    </div>
  ),
});

const VALID_MODAL_VARIANTS: ReadonlySet<ModalVariant> = new Set([
  "spotify",
  "telegram",
  "discord",
  "reddit",
  "instagram",
  "github",
]);

function parseVariant(value: string | null): ModalVariant | null {
  if (value && VALID_MODAL_VARIANTS.has(value as ModalVariant)) {
    return value as ModalVariant;
  }

  return null;
}

function buildUrlWithTab(
  pathname: string,
  searchParams: URLSearchParams,
  tab: ModalVariant | null,
) {
  const nextSearchParams = new URLSearchParams(searchParams.toString());

  if (tab) {
    nextSearchParams.set("tab", tab);
  } else {
    nextSearchParams.delete("tab");
  }

  const query = nextSearchParams.toString();

  return query ? `${pathname}?${query}` : pathname;
}

function trapTabKey(event: KeyboardEvent, container: HTMLElement | null) {
  if (!container || event.key !== "Tab") {
    return;
  }

  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        "button:not([disabled])",
        "a[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(", "),
    ),
  ).filter((element) => !element.hasAttribute("hidden"));

  if (focusable.length === 0) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeElement = document.activeElement;

  if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first.focus();
  }

  if (event.shiftKey && activeElement === first) {
    event.preventDefault();
    last.focus();
  }
}

function BrandIcon({ variant }: { variant: ModalVariant }) {
  switch (variant) {
    case "spotify":
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.16" />
          <path
            d="M9 13.4c4.8-1.5 9.9-1.2 14.3.9"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.4"
          />
          <path
            d="M10.6 17.1c3.8-1 8-.7 11.3.9"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.3"
          />
          <path
            d="M12.1 20.6c2.8-.7 5.8-.4 8.2.8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
          />
        </svg>
      );
    case "telegram":
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.16" />
          <path
            d="M24.8 9.4 7.7 16c-.8.3-.8 1.4 0 1.7l4.4 1.5 1.7 5.1c.2.7 1.1.9 1.6.4l2.5-2.4 4.8 3.4c.6.4 1.4.1 1.6-.6l3.1-14c.2-.9-.7-1.6-1.5-1.3Z"
            fill="currentColor"
          />
        </svg>
      );
    case "discord":
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.16" />
          <path
            d="M22.8 10.5a17 17 0 0 0-4.2-1.3l-.2.3c-.2.4-.5.9-.7 1.3a15.7 15.7 0 0 0-4.7 0 10 10 0 0 0-.7-1.3l-.2-.3a16.7 16.7 0 0 0-4.2 1.3c-2 2.8-2.6 5.6-2.3 8.5 1.3 1 2.6 1.6 3.9 2 .3-.4.6-.9.8-1.4-.4-.2-.8-.3-1.2-.6l.3-.2c2.4 1.1 5 1.1 7.4 0l.3.2-1.2.6c.2.5.5 1 .8 1.4 1.3-.4 2.6-1 3.9-2 .4-3.3-.7-6.1-2.3-8.5ZM13.2 18.1c-.8 0-1.4-.8-1.4-1.7s.6-1.7 1.4-1.7c.8 0 1.4.8 1.4 1.7s-.6 1.7-1.4 1.7Zm5.6 0c-.8 0-1.4-.8-1.4-1.7s.6-1.7 1.4-1.7c.8 0 1.4.8 1.4 1.7s-.6 1.7-1.4 1.7Z"
            fill="currentColor"
          />
        </svg>
      );
    case "reddit":
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.16" />
          <path
            d="M22 13.1c.9 0 1.7-.7 1.7-1.7s-.8-1.7-1.7-1.7c-.7 0-1.3.4-1.6 1L17 10l.7-3.3 2.3.5a2 2 0 1 0 .3-1.4l-3-.7a1 1 0 0 0-1.2.8l-.9 4.1a8.7 8.7 0 0 0-4.7 1.2 2 2 0 1 0-1.6 3.7 5 5 0 0 0-.1 1c0 3 3.4 5.4 7.5 5.4 4.2 0 7.6-2.4 7.6-5.4v-.3c.5-.3.8-.8.8-1.5 0-1-.7-1.7-1.7-1.7ZM13 17.4c-.6 0-1-.5-1-1 0-.6.4-1.1 1-1.1.5 0 1 .5 1 1 0 .6-.5 1.1-1 1.1Zm6 2.3c-.7.7-2 .9-3 .9s-2.3-.2-3-.9a.8.8 0 0 1 1.1-1.1c.3.3 1.1.5 1.9.5s1.6-.2 2-.5a.8.8 0 1 1 1 1.1Zm0-2.3c-.5 0-1-.5-1-1 0-.6.5-1.1 1-1.1s1 .5 1 1c0 .6-.5 1.1-1 1.1Z"
            fill="currentColor"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <rect
            x="6.6"
            y="6.6"
            width="18.8"
            height="18.8"
            rx="5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
          />
          <circle cx="16" cy="16" r="4.6" fill="none" stroke="currentColor" strokeWidth="2.3" />
          <circle cx="22.1" cy="9.9" r="1.5" fill="currentColor" />
        </svg>
      );
    case "github":
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.16" />
          <path
            d="M16 8.1a8.1 8.1 0 0 0-2.6 15.8c.4.1.5-.2.5-.4v-1.6c-2.2.5-2.7-1-2.7-1-.4-1-.9-1.2-.9-1.2-.8-.5 0-.5 0-.5.8 0 1.4.9 1.4.9.8 1.3 2 1 2.5.8.1-.6.3-1 .5-1.2-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.9-2.2 0-.2-.4-1.1.1-2.2 0 0 .7-.2 2.4.9a8 8 0 0 1 4.4 0c1.6-1.1 2.4-.9 2.4-.9.5 1.1.1 2 .1 2.2.6.6.9 1.4.9 2.2 0 3.1-1.9 3.8-3.7 4 .3.2.6.8.6 1.5v2.2c0 .2.1.5.5.4A8.1 8.1 0 0 0 16 8.1Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}

function renderActions(
  actions: ActionConfig[],
  onCopy: (value: string) => void,
) {
  return actions.map((action) => {
    if (action.kind === "copy") {
      return (
        <button
          className={`${styles.modalAction} ${styles.modalActionGhost}`}
          key={`${action.kind}-${action.label}`}
          onClick={() => onCopy(action.value)}
          type="button"
          aria-label={action.ariaLabel}
        >
          {action.label}
        </button>
      );
    }

    return (
      <a
        className={styles.modalAction}
        href={action.href}
        key={`${action.kind}-${action.label}`}
        target="_blank"
        rel="noreferrer"
        aria-label={action.ariaLabel}
      >
        {action.label}
      </a>
    );
  });
}

function renderPanelContent(
  tab: BrandTabConfig,
  copiedLabel: string | null,
  onCopy: (value: string) => void,
) {
  if (tab.id === "spotify") {
    return (
      <>
        <div className={styles.modalHeader}>
          <div className={styles.modalBadge}>
            <BrandIcon variant={tab.id} />
          </div>
          <div className={styles.modalHeading}>
            <p className={styles.modalEyebrow}>{tab.subtitle}</p>
            <h2 className={styles.modalTitle} id={`${tab.id}-title`}>
              {tab.title}
            </h2>
            <p className={styles.modalDescription} id={`${tab.id}-description`}>
              {tab.body}
            </p>
          </div>
        </div>
        <SpotifyPanel />
        <div className={styles.modalActions}>{renderActions(tab.actions, onCopy)}</div>
      </>
    );
  }

  if (tab.id === "telegram") {
    return (
      <>
        <div className={styles.telegramHero}>
          <div className={styles.telegramAvatar}>J</div>
          <div className={styles.telegramMeta}>
            <p className={styles.modalEyebrow}>{tab.subtitle}</p>
            <h2 className={styles.modalTitle} id={`${tab.id}-title`}>
              Jesqman
            </h2>
            <p className={styles.telegramHandle}>{tab.handle}</p>
          </div>
          <div className={styles.telegramLogoBadge}>
            <BrandIcon variant={tab.id} />
          </div>
        </div>
        <p className={styles.modalDescription} id={`${tab.id}-description`}>
          {tab.body}
        </p>
        <div className={styles.modalActions}>{renderActions(tab.actions, onCopy)}</div>
      </>
    );
  }

  return (
    <>
      <div className={styles.modalHeader}>
        <div className={styles.modalBadge}>
          <BrandIcon variant={tab.id} />
        </div>
        <div className={styles.modalHeading}>
          <p className={styles.modalEyebrow}>{tab.subtitle}</p>
          <h2 className={styles.modalTitle} id={`${tab.id}-title`}>
            {tab.title}
          </h2>
          <p className={styles.modalHandle}>{tab.handle}</p>
        </div>
      </div>
      <p className={styles.modalDescription} id={`${tab.id}-description`}>
        {tab.body}
      </p>
      <div className={styles.modalActions}>{renderActions(tab.actions, onCopy)}</div>
      <p className={styles.copyStatus} aria-live="polite">
        {copiedLabel}
      </p>
    </>
  );
}

type BrandTabsProps = {
  tabs: BrandTabConfig[];
};

export function BrandTabs({ tabs }: BrandTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<Record<ModalVariant, HTMLButtonElement | null>>({
    spotify: null,
    telegram: null,
    discord: null,
    reddit: null,
    instagram: null,
    github: null,
  });
  const lastTriggerRef = useRef<ModalVariant | null>(null);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const tabsById = useMemo(() => {
    return Object.fromEntries(tabs.map((tab) => [tab.id, tab])) as Record<
      ModalVariant,
      BrandTabConfig
    >;
  }, [tabs]);
  const activeTab = parseVariant(searchParams.get("tab"));
  const activeConfig = activeTab ? tabsById[activeTab] : null;
  const leftTabs = tabs.filter((tab) => tab.side === "left");
  const rightTabs = tabs.filter((tab) => tab.side === "right");

  const setTab = (nextTab: ModalVariant | null) => {
    const href = buildUrlWithTab(pathname, new URLSearchParams(searchParams.toString()), nextTab);

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  };

  const closeModal = () => {
    setCopiedLabel(null);
    setTab(null);
  };

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(`Скопировано: ${value}`);
    } catch {
      setCopiedLabel("Не удалось скопировать username.");
    }
  };

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!activeTab) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    trapTabKey(event, modalRef.current);
  });

  useEffect(() => {
    if (!activeTab) {
      document.body.style.removeProperty("overflow");
      if (lastTriggerRef.current) {
        triggerRefs.current[lastTriggerRef.current]?.focus();
        lastTriggerRef.current = null;
      }
      return;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTab]);

  useEffect(() => {
    if (!copiedLabel) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedLabel(null);
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copiedLabel]);

  const openModal = (variant: ModalVariant) => {
    lastTriggerRef.current = variant;
    setCopiedLabel(null);
    setTab(variant);
  };

  return (
    <>
      <div className={`${styles.tabRail} ${styles.tabRailLeft}`}>
        {leftTabs.map((tab, index) => (
          <button
            type="button"
            className={`${styles.tabButton} ${styles[tab.accentClassName]}`}
            key={tab.id}
            style={{ "--tab-index": index } as CSSProperties}
            onClick={() => openModal(tab.id)}
            aria-label={`Открыть вкладку ${tab.label}`}
            ref={(node) => {
              triggerRefs.current[tab.id] = node;
            }}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={`${styles.tabRail} ${styles.tabRailRight}`}>
        {rightTabs.map((tab, index) => (
          <button
            type="button"
            className={`${styles.tabButton} ${styles[tab.accentClassName]}`}
            key={tab.id}
            style={{ "--tab-index": index } as CSSProperties}
            onClick={() => openModal(tab.id)}
            aria-label={`Открыть вкладку ${tab.label}`}
            ref={(node) => {
              triggerRefs.current[tab.id] = node;
            }}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeConfig ? (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            className={`${styles.modalPanel} ${styles[activeConfig.panelClassName]}`}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${activeConfig.id}-title`}
            aria-describedby={`${activeConfig.id}-description`}
          >
            <button
              className={styles.closeButton}
              onClick={() => closeModal()}
              type="button"
              aria-label="Закрыть модальное окно"
              ref={closeButtonRef}
            >
              <span aria-hidden="true">×</span>
            </button>

            {renderPanelContent(activeConfig, copiedLabel, handleCopy)}
          </section>
        </div>
      ) : null}
    </>
  );
}
