import type { BrandTabConfig, DiaryFact } from "./types";

export const INTRO_TEXT =
  "Всех приветствую, это моя личная страница. Раз вы перешли по ней, я вам интересен или навредил. Но чтобы вам было легче ориентироваться в общении со мной, вот краткая информация обо мне.";

export const DIARY_FACTS: DiaryFact[] = [
  {
    label: "Имя",
    value: "Меня зовут Александр, но вам можно называть меня Саша.",
  },
  {
    label: "Возраст",
    value: "Мне 16 лет.",
  },
  {
    label: "Прошлое",
    value: "Ранее я занимался боксом.",
  },
  {
    label: "Интерес",
    value: "Сейчас я активно интересуюсь программированием и автоматизациями.",
  },
  {
    label: "Стек",
    value:
      "Уверенно владею React, Next.js, JavaScript, Node.js, TypeScript, HTML, CSS и Linux.",
  },
  {
    label: "Дополнительно",
    value: "Также у меня средние навыки по DevOps, Python и Flask.",
  },
  {
    label: "Фокус",
    value: "Занимаюсь только автоматизациями и созданием полнофункциональных сайтов.",
  },
];

export const BRAND_TABS: BrandTabConfig[] = [
  {
    id: "spotify",
    side: "left",
    label: "Spotify",
    handle: "@tobyfox",
    accentClassName: "tabSpotify",
    panelClassName: "panelSpotify",
    title: "Spotify Player",
    subtitle: "Now Playing",
    body: "Fallen Down (Reprise) — Toby Fox",
    href: "https://open.spotify.com/track/23b9BdZ2WZnDSeDzNUTVvZ",
    actions: [
      {
        kind: "link",
        label: "Открыть Трек",
        href: "https://open.spotify.com/track/23b9BdZ2WZnDSeDzNUTVvZ",
        ariaLabel: "Открыть трек Fallen Down Reprise в Spotify",
      },
    ],
  },
  {
    id: "telegram",
    side: "left",
    label: "Telegram",
    handle: "@jesqman",
    accentClassName: "tabTelegram",
    panelClassName: "panelTelegram",
    title: "Jesqman",
    subtitle: "Telegram Profile",
    body: "Ник: Jesqman. Быстрый доступ к переписке и любому удобному контакту.",
    href: "https://t.me/jesqman",
    actions: [
      {
        kind: "link",
        label: "Написать",
        href: "https://t.me/jesqman",
        ariaLabel: "Открыть чат с Jesqman в Telegram",
      },
      {
        kind: "link",
        label: "Звонок",
        href: "https://t.me/jesqman",
        ariaLabel: "Открыть профиль Jesqman в Telegram для звонка",
      },
      {
        kind: "link",
        label: "Видео",
        href: "https://t.me/jesqman",
        ariaLabel: "Открыть профиль Jesqman в Telegram для видеозвонка",
      },
    ],
  },
  {
    id: "discord",
    side: "left",
    label: "Discord",
    handle: "@hookamori",
    accentClassName: "tabDiscord",
    panelClassName: "panelDiscord",
    title: "hookamori",
    subtitle: "Discord Contact",
    body: "Для Discord сохранён username. Его можно скопировать и сразу вставить в поиск.",
    href: "https://discord.com/app",
    actions: [
      {
        kind: "copy",
        label: "Скопировать Username",
        value: "@hookamori",
        ariaLabel: "Скопировать Discord username hookamori",
      },
      {
        kind: "link",
        label: "Открыть Discord",
        href: "https://discord.com/app",
        ariaLabel: "Открыть приложение Discord",
      },
    ],
  },
  {
    id: "instagram",
    side: "right",
    label: "Instagram",
    handle: "@persona.git",
    accentClassName: "tabInstagram",
    panelClassName: "panelInstagram",
    title: "persona.git",
    subtitle: "Instagram Profile",
    body: "Визуальная сторона и живой профиль — всё в одном фирменном окне.",
    href: "https://www.instagram.com/persona.git/",
    actions: [
      {
        kind: "link",
        label: "Открыть Профиль",
        href: "https://www.instagram.com/persona.git/",
        ariaLabel: "Открыть профиль persona dot git в Instagram",
      },
    ],
  },
  {
    id: "reddit",
    side: "right",
    label: "Reddit",
    handle: "@jesqmaan",
    accentClassName: "tabReddit",
    panelClassName: "panelReddit",
    title: "jesqmaan",
    subtitle: "Reddit Profile",
    body: "Профиль для длинных тредов, наблюдений и любых обсуждений по интересам.",
    href: "https://www.reddit.com/user/jesqmaan/",
    actions: [
      {
        kind: "link",
        label: "Открыть Профиль",
        href: "https://www.reddit.com/user/jesqmaan/",
        ariaLabel: "Открыть профиль jesqmaan в Reddit",
      },
    ],
  },
  {
    id: "github",
    side: "right",
    label: "GitHub",
    handle: "codingship-lab",
    accentClassName: "tabGithub",
    panelClassName: "panelGithub",
    title: "codingship-lab",
    subtitle: "GitHub Profile",
    body: "Код, автоматизации и практичные проекты собраны в отдельной разработческой карточке.",
    href: "https://github.com/codingship-lab",
    actions: [
      {
        kind: "link",
        label: "Открыть Профиль",
        href: "https://github.com/codingship-lab",
        ariaLabel: "Открыть профиль codingship lab на GitHub",
      },
    ],
  },
];
