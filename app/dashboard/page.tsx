import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RSVPstatus as PrismaRsvpStatus } from "../generated/prisma/enums";
// import type { RSVPstatus } from "../generated/prisma/enums";

export function countByStatus(rsvps: { status: PrismaRsvpStatus }[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const r of rsvps) {
    if (r.status === "going") goingCount += 1;
    else if (r.status === "maybe") maybeCount += 1;
    else if (r.status === "not_going") notGoingCount += 1;
  }

  return { goingCount, maybeCount, notGoingCount };
}

export default async function dashboardPage(){

    const rows = await prisma.event.findMany({
    // where: { owner_uid: userid },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      title: true,
      event_date: true,
      location: true,
      rsvps: { select: { status: true } },
    },
    });

    const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.event_date ? e.event_date.toISOString() : null,
    location: e.location,
    ...countByStatus(e.rsvps),
    }));



    return(
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-wrap justify-between items-center bg-background border-2 border-border rounded-2xl p-4 py-4 ">
                <div>
                    <h1 className="text-2xl">Create Event</h1>
                    <p className="text-muted-foreground">Click the button to create a new event</p>
                    {/* <Button></Button> */}
                </div>
                <Button asChild variant="default" className="tracking-wide text-sm" >
                    <Link href={"/events/create"}>Create</Link>
                </Button>
            </div>


            {/* {Event list} */}

            {events.length === 0 ? (
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>No events yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create your first event to start collecting RSVPs.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 bg-background">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Button size="sm" asChild>
                    <Link href={`/events/${event.id}`}>Open</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge>Going: {event.goingCount}</Badge>
                  <Badge variant="secondary"> Maybe: {event.maybeCount}</Badge>
                  <Badge variant="outline">
                    {" "}
                    Not Going: {event.notGoingCount}
                  </Badge>
                </div>
                <p>
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleString()
                    : "No date selected"}

                  {event.location ? ` - ${event.location}` : ""}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}




        </div>
    )
}