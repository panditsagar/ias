import Link from "next/link";
import { CaretRight, House } from "@phosphor-icons/react/dist/ssr";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-sans font-medium text-slate-500">
        <li>
          <div className="flex items-center">
            <Link
              href="/"
              className="text-slate-400 hover:text-amber-800 transition-colors duration-200 flex items-center hover:scale-105 active:scale-95 transform"
            >
              <House className="h-4 w-4" weight="regular" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index}>
              <div className="flex items-center">
                <CaretRight className="h-3.5 w-3.5 text-slate-350 shrink-0" weight="bold" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="ml-1.5 sm:ml-2 text-slate-500 hover:text-amber-800 hover:underline transition-colors duration-200 capitalize hover:scale-[1.01] active:scale-[0.99] transform"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="ml-1.5 sm:ml-2 text-slate-800 font-semibold line-clamp-1 capitalize select-none" aria-current="page">
                    {item.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
