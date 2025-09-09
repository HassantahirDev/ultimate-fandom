import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-brand-primary">
              ScreenRant
            </Link>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-white">
                  Our Audience
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/movies" className="hover:text-white">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv" className="hover:text-white">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/gaming" className="hover:text-white">
                  Gaming
                </Link>
              </li>
              <li>
                <Link href="/comics" className="hover:text-white">
                  Comics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>Copyright © 2025 ScreenRant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
