import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Github } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "ログイン - まめめも" },
    { name: "description", content: "GitHubアカウントでログイン" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    return redirect("/notes");
  }
  return null;
}

export default function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">まめめも</CardTitle>
          <CardDescription>
            マメにメモして、振り返りや経歴書作成に活用
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" action="/auth/github">
            <Button type="submit" className="w-full" size="lg">
              <Github className="mr-2 h-5 w-5" />
              GitHubでログイン
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
