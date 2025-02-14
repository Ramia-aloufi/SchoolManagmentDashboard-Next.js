"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { user} =  useUser()
    const router = useRouter();

    useEffect(() => {
        const role = user?.publicMetadata.role

        if(role){
            router.push(`/${role}`)
        }
    },[user,router])
  return (
    <div className="h-screen flex items-center justify-center bg-SkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="font-semibold">School</h1>
          <h2>Signin to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Username</Clerk.Label>
            <Clerk.Input type="text" required  className="p-2 rounded-md ring-1 ring-gray-300" />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Password</Clerk.Label>
            <Clerk.Input type="password" required  className="p-2 rounded-md ring-1 ring-gray-300" />
            <Clerk.FieldError className="text-xs  text-red-400" />
          </Clerk.Field>
          <SignIn.Action submit className="bg-blue-500 text-white my-1 text-sm">Sign in</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div> 
  );
}
