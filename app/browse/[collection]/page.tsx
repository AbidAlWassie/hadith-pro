import { CollectionBrowser } from "@/components/collection-browser";
import { Header } from "@/components/header";
import { hadithCollections } from "@/lib/hadith-api";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  params: {
    collection: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = hadithCollections.find((c) => c.id === params.collection);

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent text-balance">
              {collection.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-arabic">
              {collection.nameArabic}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              {collection.description}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>Compiled by {collection.compiler}</span>
              <span>•</span>
              <span>{collection.compilationPeriod}</span>
              <span>•</span>
              <span>{collection.totalHadiths.toLocaleString()} Hadiths</span>
            </div>
          </div>

          <CollectionBrowser collection={collection} />
        </div>
      </main>
    </div>
  );
}
