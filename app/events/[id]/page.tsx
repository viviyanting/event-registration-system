//【PAGE(Server)-活動詳細頁】
import EventDetailClient from "./EventDetailClient";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetailClient eventId={id} />;
}

