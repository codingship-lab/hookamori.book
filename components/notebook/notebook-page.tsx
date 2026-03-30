import { Suspense } from "react";
import type { CSSProperties } from "react";
import { BRAND_TABS, DIARY_FACTS, INTRO_TEXT } from "./data";
import { DateTitle } from "./date-title";
import { BrandTabs } from "./brand-tabs";
import styles from "./notebook.module.css";

function BrandTabsFallback() {
  const leftTabs = BRAND_TABS.filter((tab) => tab.side === "left");
  const rightTabs = BRAND_TABS.filter((tab) => tab.side === "right");

  return (
    <>
      <div className={`${styles.tabRail} ${styles.tabRailLeft}`} aria-hidden="true">
        {leftTabs.map((tab, index) => (
          <div
            className={`${styles.tabButton} ${styles[tab.accentClassName]} ${styles.tabPlaceholder}`}
            key={tab.id}
            style={{ "--tab-index": index } as CSSProperties}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </div>
        ))}
      </div>

      <div className={`${styles.tabRail} ${styles.tabRailRight}`} aria-hidden="true">
        {rightTabs.map((tab, index) => (
          <div
            className={`${styles.tabButton} ${styles[tab.accentClassName]} ${styles.tabPlaceholder}`}
            key={tab.id}
            style={{ "--tab-index": index } as CSSProperties}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function NotebookPage() {
  return (
    <div className={styles.scene}>
      <a className={styles.skipLink} href="#main-note">
        К содержанию
      </a>

      <main className={styles.stage}>
        <section className={styles.book} aria-labelledby="page-title">
          <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true" />
          <span className={styles.bookSpine} aria-hidden="true" />

          <Suspense fallback={<BrandTabsFallback />}>
            <BrandTabs tabs={BRAND_TABS} />
          </Suspense>

          <article className={styles.paper} id="main-note">
            <header className={styles.paperHeader}>
              <p className={styles.paperEyebrow}>Личный дневник</p>
              <h1 className={styles.paperTitle} id="page-title">
                Страница знакомства
              </h1>
            </header>

            <div className={styles.dateZone}>
              <DateTitle />
              <p className={styles.workLabel}>Моя работа</p>
            </div>

            <section className={styles.introduction} aria-labelledby="intro-title">
              <h2 className={styles.sectionTitle} id="intro-title">
                Коротко обо мне
              </h2>
              <p className={styles.introText}>{INTRO_TEXT}</p>
            </section>

            <section className={styles.detailsSection} aria-labelledby="details-title">
              <div className={styles.detailsHeader}>
                <h2 className={styles.sectionTitle} id="details-title">
                  Мои данные
                </h2>
                <p className={styles.detailsLead}>
                  Чтобы дальше было проще ориентироваться в общении, вот аккуратная
                  выжимка обо мне.
                </p>
              </div>

              <dl className={styles.detailsGrid}>
                {DIARY_FACTS.map((fact) => (
                  <div className={styles.detailCard} key={fact.label}>
                    <dt className={styles.detailLabel}>{fact.label}</dt>
                    <dd className={styles.detailValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>
        </section>
      </main>
    </div>
  );
}
