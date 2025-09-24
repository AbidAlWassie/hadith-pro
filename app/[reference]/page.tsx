import { hadithCollections } from "@/lib/hadith-api";
import { redirect } from "next/navigation";

interface ReferencePageProps {
  params: Promise<{
    reference: string;
  }>;
}

export default async function ReferencePage({ params }: ReferencePageProps) {
  const { reference } = await params;

  // Check if this is a hadith reference format like "bukhari:3984"
  if (reference.includes(":")) {
    const [collection, hadithNumber] = reference.split(":");

    // Validate collection exists
    const collectionInfo = hadithCollections.find(
      (c) => c.id === collection.toLowerCase()
    );
    if (!collectionInfo) {
      redirect("/browse");
    }

    // For now, redirect to chapter 1 - in a real app you'd look up the actual chapter
    // This is a simplified implementation
    const chapter = Math.max(
      1,
      Math.floor(Number.parseInt(hadithNumber) / 100) || 1
    );

    redirect(`/browse/${collection.toLowerCase()}/${chapter}/${hadithNumber}`);
  }

  // If not a hadith reference, redirect to browse
  redirect("/browse");
}
