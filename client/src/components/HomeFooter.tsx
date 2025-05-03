import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog/Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Terms & Privacy</h3>
            <ul>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com" target="_blank" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://www.twitter.com" target="_blank" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Omsah&lt;code&gt; — All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
