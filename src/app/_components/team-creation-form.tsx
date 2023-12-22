"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ImSpinner2 } from "react-icons/im";
import * as React from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Your team name must be at least 2 characters.",
  }),
});

export function TeamCreationForm() {
  const { update } = useSession();
  const router = useRouter();

  const { mutate, isIdle } = api.team.create.useMutation({
    onSuccess: () => {
      void update().then(() => void router.push("/"));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    void mutate({ name: values.name });
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Create your team</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input className="mt-2 h-12" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full py-6">
            {isIdle ? (
              "Create"
            ) : (
              <ImSpinner2 className="h-10 w-10 animate-spin p-1" />
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
