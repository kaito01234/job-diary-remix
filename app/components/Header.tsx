import { Link } from "@remix-run/react";
import { Bean, Home, Plus, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Bean className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                まめめも
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              >
                <Home className="h-4 w-4" />
                ホーム
              </Link>
              <Link
                to="/notes"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                メモ一覧
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/notes/new" className="hidden md:block">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                メモを書く
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              ホーム
            </Link>
            <Link
              to="/notes"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-4 w-4" />
              メモ一覧
            </Link>
            <Link
              to="/notes/new"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plus className="h-4 w-4" />
              メモを書く
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
