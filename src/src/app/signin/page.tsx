"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  return (
    <main className="h-full">
      <LoginForm />
    </main>
  );
}

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    try {
      const response = await signIn("credentials", {
        redirect: false,
        id,
        password,
        callbackUrl,
      });
      if (response?.error) {
        console.log(response.error);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              ログイン
            </h1>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ID
                </label>
                <input
                  required
                  type="text"
                  id="id"
                  value={id}
                  onChange={(event) => setId(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  パスワード
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                ログイン
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
