export type ModalVariant =
  | "spotify"
  | "telegram"
  | "discord"
  | "reddit"
  | "instagram"
  | "github";

export type ActionConfig =
  | {
      kind: "link";
      label: string;
      href: string;
      ariaLabel: string;
    }
  | {
      kind: "copy";
      label: string;
      value: string;
      ariaLabel: string;
    };

export type BrandTabConfig = {
  id: ModalVariant;
  side: "left" | "right";
  label: string;
  handle: string;
  accentClassName: string;
  panelClassName: string;
  title: string;
  subtitle: string;
  body: string;
  href?: string;
  actions: ActionConfig[];
};

export type DiaryFact = {
  label: string;
  value: string;
};
