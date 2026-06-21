import { Badge } from "@/components/ui/badge";
// import { Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    //Home page - 1
    // <div className="flex flex-col gap-12">
    //   <h1 className="text-9xl text-foreground font-bold text-shadow-lg mb-4">
    //     EVENT
    //     <br/>
    //     MANAGER
    //   </h1>
    //   <div className="grid grid-cols-4 w-full mx-auto gap-4">
    //     <div className="card p-4 bg-(--surface)/0 aspect-square border-2 border-(--surface-elevated) backdrop-blur-3xl rounded-2xl flex justify-center items-center">
    //       <div className="text-3xl font-bold">
    //       Create <br/>Events
    //       </div>
    //     </div>
    //     <div className="card p-4 bg-(--surface)/0 aspect-square border-2 border-(--surface-elevated) backdrop-blur-3xl rounded-2xl flex justify-center items-center">
    //     <div className="text-3xl font-bold">
    //       Send <br/>Invites
    //       </div>
    //     </div>
    //     <div className="card p-4 bg-(--surface)/0 aspect-square border-2 border-(--surface-elevated) backdrop-blur-3xl rounded-2xl flex justify-center items-center">
    //         <div className="text-3xl font-bold">
    //       View <br/>Invites
    //       </div>
    //     </div>
    //     <div className="card p-4 bg-(--surface)/0 aspect-square border-2 border-(--surface-elevated) backdrop-blur-3xl rounded-2xl flex justify-center items-center">
    //     <div className="text-3xl font-bold">
    //       ADDED <br/>RSVP <br/>feature
    //       </div>
    //     </div>
    //   </div>
    // </div>

    //Home page - 2
    <div className="flex flex-1 flex-col gap-8">
      <section className="space-y-4">
        <Badge variant="secondary" className="w-fit">
          Next.js 16 + Postgres
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Plan events and track RSVPs fast
        </h1>
        <p className="max-w-2xl text-[var(--muted-foreground)]">
          Create events, share a unique invite link, and watch attendee status
          update in real-time with Going, Maybe, and Not going counts.
        </p>
        <div className="flex flex-wrap gap-3">
          {/* <Button asChild>
            <Link href="/auth/sign-up">Create account</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/sign-in">Sign in</Link>
          </Button> */}
          <Button variant="outline" asChild>
            <Link href="/dashboard">Open dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Create events</CardTitle>
            <CardDescription>
              Set title, date, and details in seconds.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Share invite links</CardTitle>
            <CardDescription>
              Generate a unique event token per event.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Track attendance</CardTitle>
            <CardDescription>
              See attendee list and response totals at a glance.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[var(--muted-foreground)]">
            Going, Maybe, and Not going are always up-to-date.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
