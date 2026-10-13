import Image from 'next/image';

export function Signature({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/anfragen/signature-julian.png"
      alt=""
      aria-hidden="true"
      width={1540}
      height={594}
      className={`-ml-[10px] h-auto w-[84px] mix-blend-multiply ${className}`}
    />
  );
}
