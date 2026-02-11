import Link from "next/link";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-black/60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => (
          <li key={`${item.href}-${idx}`} className="flex items-center gap-2">
            <Link className="hover:text-black" href={item.href}>
              {item.name}
            </Link>
            {idx < items.length - 1 ? <span className="text-black/30">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
