import { notFound } from "next/navigation";
import { fetchGuests } from "@/app/guests/actions";
import AttendForm from "./AttendForm";
import Container from "./Container";
import TimeLine from "@/components/Timeline";

export default async function GuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const guests = await fetchGuests();
    const guest = guests.find((g) => g.id === id);

    if (!guest) return notFound();

    return (
      <Container>
        <TimeLine guest={guest} />
        <AttendForm guest={guest} />
      </Container>
    );
  } catch (error) {
    console.error("Error fetching guest:", error);
    return <div>Error loading guest information. Please try again later.</div>;
  }
}
