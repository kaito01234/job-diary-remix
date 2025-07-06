import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { FileText, Home, Plus } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Job Diary
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
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
                <FileText className="h-4 w-4" />
                日記一覧
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/notes/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                新しい日記
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}