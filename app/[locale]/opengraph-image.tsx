import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const runtime = 'edge';
export const alt = 'Sendero Bike Trails';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BRAND_PRIMARY = '#e2b71f';
const BRAND_BG = '#1b1b1b';
const BRAND_FG = '#fff0bb';

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: `linear-gradient(135deg, ${BRAND_BG} 0%, #2a2a2a 100%)`,
          color: BRAND_FG,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: BRAND_PRIMARY,
            }}
          />
          <div style={{ fontSize: '28px', fontWeight: 600, color: BRAND_PRIMARY }}>
            Sendero Bike Trails
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            {t('title')}
          </div>
          <div
            style={{
              fontSize: '28px',
              lineHeight: 1.4,
              color: BRAND_FG,
              maxWidth: '900px',
            }}
          >
            {t('description')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '22px',
            color: BRAND_PRIMARY,
          }}
        >
          <div>Pereira · Eje Cafetero · Colombia</div>
          <div>senderobiketrails.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
