import { render } from '@testing-library/react';
import { JsonLd } from '@/components/seo/JsonLd';

describe('JsonLd', () => {
  it('renders a single script tag for a single object', () => {
    const data = { '@type': 'Organization', name: 'Test' };
    const { container } = render(<JsonLd data={data} />);
    const scripts = container.querySelectorAll('script');
    expect(scripts).toHaveLength(1);
  });

  it('renders multiple script tags for an array of objects', () => {
    const data = [
      { '@type': 'Organization', name: 'Test' },
      { '@type': 'WebSite', url: 'https://example.com' },
    ];
    const { container } = render(<JsonLd data={data} />);
    const scripts = container.querySelectorAll('script');
    expect(scripts).toHaveLength(2);
  });

  it('sets type="application/ld+json" on each script', () => {
    const data = { '@type': 'Organization', name: 'Test' };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script');
    expect(script!.getAttribute('type')).toBe('application/ld+json');
  });

  it('serializes the data as JSON in the script content', () => {
    const data = { '@type': 'Organization', name: 'Test Org' };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script');
    expect(script!.innerHTML).toContain('"Test Org"');
  });

  it('renders empty fragment for empty array', () => {
    const { container } = render(<JsonLd data={[]} />);
    const scripts = container.querySelectorAll('script');
    expect(scripts).toHaveLength(0);
  });
});
