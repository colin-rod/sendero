import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BottomEmailCapture from '@/components/BottomEmailCapture';

export default function QRPage() {
  const t = useTranslations('qr');

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-poster.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-lg mx-auto gap-8">
        <Image
          src="/Logo Dark.svg"
          alt="Sendero"
          width={80}
          height={80}
          priority
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-h2 md:text-h1 font-bold text-white">
            {t('headline')}
          </h1>
          <p className="text-lg text-white/80">
            {t('subheadline')}
          </p>
        </div>
        <BottomEmailCapture />
      </div>
    </main>
  );
}
