import { ChapterBrowser } from "@/components/chapter-browser";
import { Header } from "@/components/header";
import { hadithCollections } from "@/lib/hadith-api";
import { notFound } from "next/navigation";

interface ChapterPageProps {
  params: {
    collection: string;
    chapter: string;
  };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const collection = hadithCollections.find((c) => c.id === params.collection);

  if (!collection) {
    notFound();
  }

  const chapterNumber = Number.parseInt(params.chapter);
  if (isNaN(chapterNumber) || chapterNumber < 1) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent text-balance">
              {collection.name} - Chapter {chapterNumber}
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse hadiths from this chapter
            </p>
          </div>

          <ChapterBrowser
            collection={collection}
            chapterNumber={chapterNumber}
          />
        </div>
      </main>
    </div>
  );
}
