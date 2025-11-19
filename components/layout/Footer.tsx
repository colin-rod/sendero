import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-primary-600">
                Sendero
              </h3>
              <p className="text-sm text-muted-foreground">
                Beginner-friendly hike & bike tours in Colombia's Coffee Region.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Contact</h4>
              <p className="text-sm text-muted-foreground">
                Questions? We'd love to hear from you.
              </p>
              <a
                href="https://www.instagram.com/sendero_bike_tours/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Follow us on Instagram
                <span className="ml-1" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Sendero. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
