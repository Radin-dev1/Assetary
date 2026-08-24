import Image from "next/image";

export function LogoMark({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-block shrink-0 overflow-hidden rounded-[7px] ${className}`}>
      <Image src="/logo/assetary-mark.svg" alt="" width={size} height={size} priority />
    </span>
  );
}

export function Logo({ className = "", markSize = 28 }: { className?: string; markSize?: number }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={markSize} />
      <span className="text-lg font-semibold tracking-tight lowercase">assetary</span>
    </span>
  );
}
