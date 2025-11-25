import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-border bg-gray-800 text-white">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-h3 text-primary-400">
                Sendero Bike Trails
              </h3>
              <p className="text-body text-gray-300">
                Beginner-friendly hike & bike tours in Colombia's Coffee Region.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-h4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-body text-gray-300">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-h4 text-white">Contact</h4>
              <p className="text-body text-gray-300">
                Questions? We'd love to hear from you.
              </p>
              <a
                href="https://www.instagram.com/sendero_bike_trails/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-body text-primary-400 hover:text-primary-300 transition-colors"
              >
                Follow us on Instagram
                <span className="ml-1" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-body text-gray-400">
            <p>&copy; {new Date().getFullYear()} Sendero Bike Trails. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
