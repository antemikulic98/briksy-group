type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: Props) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      )}
      <Tag
        className={`mt-3 font-bold tracking-tight ${
          Tag === "h1" ? "text-4xl leading-tight md:text-5xl" : "text-3xl md:text-4xl"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
