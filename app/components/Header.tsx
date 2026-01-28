import { Form, Link } from "@remix-run/react";
import { Bean, Home, Plus, Menu, X, MessageSquare, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

type User = {
  id: string;
  name: string | null;
  image: string | null;
} | null;

type HeaderProps = {
  user?: User;
};

export function Header({ user }: HeaderProps) {
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

            {user && (
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
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/notes/new" className="hidden md:block">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    メモを書く
                  </Button>
                </Link>

                <div className="hidden md:flex items-center gap-3">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user.name}
                  </span>
                  <Form method="post" action="/auth/logout">
                    <Button variant="ghost" size="sm" type="submit">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </Form>
                </div>

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
              </>
            ) : (
              <Link to="/login">
                <Button size="sm">ログイン</Button>
              </Link>
            )}
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && user && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.name}
              </span>
            </div>
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
            <Form method="post" action="/auth/logout">
              <button
                type="submit"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogOut className="h-4 w-4" />
                ログアウト
              </button>
            </Form>
          </nav>
        )}
      </div>
    </header>
  );
}
