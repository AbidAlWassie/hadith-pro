import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const mainCollections = [
  {
    id: "bukhari",
    title: "Sahih al-Bukhari",
    titleArabic: "صحيح البخاري",
    description: "The most authentic collection of hadith",
    hadithCount: 7563,
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    href: "/browse/bukhari",
  },
  {
    id: "muslim",
    title: "Sahih Muslim",
    titleArabic: "صحيح مسلم",
    description: "Second most authentic hadith collection",
    hadithCount: 5362,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    href: "/browse/muslim",
  },
  {
    id: "tirmidhi",
    title: "Jami' at-Tirmidhi",
    titleArabic: "جامع الترمذي",
    description: "Comprehensive collection with detailed commentary",
    hadithCount: 3956,
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    href: "/browse/tirmidhi",
  },
  {
    id: "abudawud",
    title: "Sunan Abu Dawud",
    titleArabic: "سنن أبي داود",
    description: "Focus on legal and practical matters",
    hadithCount: 4800,
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    href: "/browse/abudawud",
  },
];

const otherCollections = [
  {
    id: "nasai",
    title: "Sunan an-Nasa'i",
    titleArabic: "سنن النسائي",
    hadithCount: 5761,
    href: "/browse/nasai",
  },
  {
    id: "ibnmajah",
    title: "Sunan Ibn Majah",
    titleArabic: "سنن ابن ماجه",
    hadithCount: 4341,
    href: "/browse/ibnmajah",
  },
  {
    id: "nawawi40",
    title: "An-Nawawi's 40 Hadith",
    titleArabic: "الأربعون النووية",
    hadithCount: 42,
    href: "/browse/nawawi40",
  },
  {
    id: "riyadussalihin",
    title: "Riyad as-Salihin",
    titleArabic: "رياض الصالحين",
    hadithCount: 1896,
    href: "/browse/riyadussalihin",
  },
];

export function HadithCollections() {
  return (
    <div className="space-y-8">
      {/* Main Collections */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Major Hadith Collections
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mainCollections.map((collection) => (
            <Link key={collection.id} href={collection.href}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                            {collection.title}
                          </h3>
                          <p
                            className="text-muted-foreground text-sm font-medium"
                            dir="rtl"
                          >
                            {collection.titleArabic}
                          </p>
                        </div>
                        <Badge variant="secondary" className={collection.color}>
                          {collection.hadithCount.toLocaleString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {collection.description}
                      </p>
                      <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Browse Collection
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Other Collections */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Other Collections
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherCollections.map((collection) => (
            <Link key={collection.id} href={collection.href}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {collection.title}
                    </h4>
                    <p className="text-xs text-muted-foreground" dir="rtl">
                      {collection.titleArabic}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {collection.hadithCount.toLocaleString()} hadith
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
