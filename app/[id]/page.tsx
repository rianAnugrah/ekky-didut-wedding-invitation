

import { notFound } from "next/navigation"
import { fetchGuests } from "@/app/guests/actions"
import AttendForm from "./AttendForm"

interface Props {
  params: { id: string }
}

export default async function GuestPage({ params }: Props) {
  const guests = await fetchGuests()
  const guest = guests.find((g) => g.id === params.id)

  if (!guest) return notFound()

  return <AttendForm guest={guest} />
}
