import { HadithCard } from "@/components/hadith-card";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHadithById, hadithCollections } from "@/lib/hadith-api";
import { ArrowLeft, BookOpen, Calendar, Clock, Star, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface HadithDetailPageProps {
  params: Promise<{
    collection: string;
    chapter: string;
    hadith: string;
  }>;
}

export default async function HadithDetailPage({
  params,
}: HadithDetailPageProps) {
  const { collection, chapter, hadith } = await params;

  const hadithId = `${collection}-${hadith}`;

  // Fetch the hadith data
  const hadithData = await getHadithById(hadithId);

  if (!hadithData) {
    notFound();
  }

  // Find collection metadata
  const collectionInfo = hadithCollections.find((c) => c.id === collection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/browse"
            className="hover:text-foreground transition-colors"
          >
            Browse
          </Link>
          <span>•</span>
          <Link
            href={`/browse/${collection}`}
            className="hover:text-foreground transition-colors"
          >
            {collectionInfo?.name || collection}
          </Link>
          <span>•</span>
          <Link
            href={`/browse/${collection}/${chapter}`}
            className="hover:text-foreground transition-colors"
          >
            {chapter.replace(/-/g, " ")}
          </Link>
          <span>•</span>
          <span className="text-foreground font-medium">
            Hadith #{hadithData.hadithNumber}
          </span>
        </div>

        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Link href={`/browse/${collection}/${chapter}`}>
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Chapter
            </Button>
          </Link>
        </div>

        {/* Collection Information Card */}
        {collectionInfo && (
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl text-foreground flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    {collectionInfo.name}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground font-arabic">
                    {collectionInfo.nameArabic}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {collectionInfo.description}
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {collectionInfo.totalHadiths.toLocaleString()} Hadiths
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Compiled by:</span>
                  <span className="font-medium text-foreground">
                    {collectionInfo.compiler}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Period:</span>
                  <span className="font-medium text-foreground">
                    {collectionInfo.compilationPeriod}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Hadith Display */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Hadith #{hadithData.hadithNumber}
            </h1>
            <p className="text-muted-foreground">
              From {hadithData.collection} • {hadithData.book} •{" "}
              {hadithData.chapter}
            </p>
          </div>

          {/* Featured Hadith Card */}
          <HadithCard
            hadith={hadithData}
            variant="featured"
            showExplanation={true}
          />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hadith Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Hadith Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Collection:</span>
                  <p className="font-medium text-foreground">
                    {hadithData.collection}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Book:</span>
                  <p className="font-medium text-foreground">
                    {hadithData.book}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Chapter:</span>
                  <p className="font-medium text-foreground">
                    {hadithData.chapter}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Number:</span>
                  <p className="font-medium text-foreground font-mono">
                    #{hadithData.hadithNumber}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Grade:</span>
                  <Badge className={getGradeColor(hadithData.grade)}>
                    {hadithData.grade}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Reference:</span>
                  <p className="font-medium text-foreground font-mono">
                    {hadithData.reference}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Narrator Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Narrator Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Primary Narrator:
                  </span>
                  <p className="text-lg font-semibold text-foreground">
                    {hadithData.narrator}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    About the Chain of Transmission:
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    This hadith was transmitted through a chain of reliable
                    narrators, with {hadithData.narrator} being the primary
                    narrator. The authenticity grade of "{hadithData.grade}"
                    indicates the scholarly assessment of this transmission
                    chain.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation to Related Hadiths */}
        <Card className="bg-gradient-to-r from-muted/20 to-muted/10">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Explore More
              </h3>
              <p className="text-muted-foreground">
                Continue your study with more hadiths from this collection
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={`/browse/${collection}`}>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <BookOpen className="h-4 w-4" />
                    Browse Collection
                  </Button>
                </Link>
                <Link href={`/browse/${collection}/${chapter}`}>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Chapter
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Star className="h-4 w-4" />
                    Browse All
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// Helper function for grade colors
function getGradeColor(grade: string) {
  switch (grade.toLowerCase()) {
    case "sahih":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
    case "hasan":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
    case "da'if":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
    case "mawdu'":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800";
  }
}
