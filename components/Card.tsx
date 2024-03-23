export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return <div className={className}>{children}</div>;
}
