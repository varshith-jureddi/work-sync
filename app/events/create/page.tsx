// import { Form } from "radix-ui"
import { Form, FormField, FormMessage } from "@/components/ui/form"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createEventAction } from "@/lib/events"

export default function CreatePage(){
    return(
        <div className="mx-auto w-full max-w-2xl">
            <Card className="bg-background">
                <CardHeader>
                    Create Evenrt
                </CardHeader>
                <CardContent>
                    <Form action={createEventAction}>
                        <FormField>
                            <Label htmlFor="title">Title</Label>
                            <Input
                            id="title"
                            name="title"
                            placeholder="Meenting..."
                            required>
                            </Input>
                        </FormField>
                        <FormField>
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Textarea 
                            id="description"
                            name="description"
                            placeholder="discussion about the project..."
                            >
                            </Textarea>
                        </FormField>
                        <FormField>
                            <Label htmlFor="location">
                                Location
                            </Label>
                            <Input
                            id="location"
                            name="location"
                            placeholder="Location Details">
                            </Input>
                        </FormField>

                        <FormField>
                            <Label htmlFor="datentime">Date and Time</Label>
                            <Input
                            id="datentime"
                            name="datentime"
                            type="datetime-local">
                            </Input>
                            <FormMessage>
                                Optional,can add later
                            </FormMessage>
                        </FormField>
                        <div className="flex gap-3">
                            <Button type="submit">Create Event</Button>
                            <Button type="button" variant={"outline"}>
                                <Link href={"/dashboard"} >Cancel</Link>   
                            </Button>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}