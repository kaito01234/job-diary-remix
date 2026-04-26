import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Bean, Calendar, FileText, Github, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getOptionalUser } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "まめめも - マメにメモする習慣" },
    {
      name: "description",
      content: "日々の仕事をマメにメモして、振り返りや経歴書作成に活用",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getOptionalUser(request);
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  if (!user) {
    return <LandingPage />;
  }

  return <Dashboard />;
}

function LandingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <Bean className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          まめめも
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          マメにメモして、振り返りや経歴書作成に活用
        </p>

        <div className="space-y-4 max-w-md mx-auto">
          <Link to="/login" className="block">
            <Button size="lg" className="w-full">
              <Github className="h-5 w-5 mr-2" />
              GitHubでログイン
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">サッとメモ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Twitter感覚で、今やっていることをサッとメモ。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">振り返り</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              過去のメモを振り返って、成長を実感。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">経歴書生成</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              メモからAIが経歴書を自動生成（近日公開）
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              メモを書く
            </CardTitle>
            <CardDescription>今やっていることをサッとメモ</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/notes/new">
              <Button className="w-full">メモを書く</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              メモ一覧
            </CardTitle>
            <CardDescription>過去のメモを振り返る</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/notes">
              <Button variant="outline" className="w-full">
                一覧を見る
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              日記・経歴書生成
            </CardTitle>
            <CardDescription>メモから自動生成（AI機能）</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              近日公開
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
