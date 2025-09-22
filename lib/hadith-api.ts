export interface Hadith {
  id: string;
  text: string;
  textArabic: string;
  narrator: string;
  collection: string;
  book: string;
  chapter: string;
  hadithNumber: string;
  grade: "Sahih" | "Hasan" | "Da'if" | "Mawdu'" | "Unknown";
  reference: string;
  explanation?: string;
}

export interface HadithCollection {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  totalHadiths: number;
  compiler: string;
  compilationPeriod: string;
}

export interface ApiHadith {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  grades?: Array<{
    grade: string;
    grader: string;
  }>;
  reference?: {
    book: number;
    hadith: number;
  };
}

export interface ApiEdition {
  collection: Array<{
    name: string;
    hasbooks: boolean;
    hasChapters: boolean;
    collection: Array<{
      arabicnumber: number;
      hadithnumber: number;
      text: string;
      grades?: Array<{
        grade: string;
        grader: string;
      }>;
      reference?: {
        book: number;
        hadith: number;
      };
    }>;
  }>;
}

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

// Available editions mapping
export const hadithCollections: HadithCollection[] = [
  {
    id: "eng-bukhari",
    name: "Sahih al-Bukhari",
    nameArabic: "صحيح البخاري",
    description:
      "The most authentic collection of hadith compiled by Imam al-Bukhari",
    totalHadiths: 7563,
    compiler: "Imam Muhammad al-Bukhari",
    compilationPeriod: "810-870 CE",
  },
  {
    id: "eng-muslim",
    name: "Sahih Muslim",
    nameArabic: "صحيح مسلم",
    description: "The second most authentic collection compiled by Imam Muslim",
    totalHadiths: 7190,
    compiler: "Imam Muslim ibn al-Hajjaj",
    compilationPeriod: "817-875 CE",
  },
  {
    id: "eng-abudawud",
    name: "Sunan Abu Dawud",
    nameArabic: "سنن أبي داود",
    description: "A comprehensive collection focusing on legal matters",
    totalHadiths: 5274,
    compiler: "Imam Abu Dawud",
    compilationPeriod: "817-889 CE",
  },
  {
    id: "eng-tirmidhi",
    name: "Jami' at-Tirmidhi",
    nameArabic: "جامع الترمذي",
    description: "A comprehensive collection with detailed commentary",
    totalHadiths: 3956,
    compiler: "Imam at-Tirmidhi",
    compilationPeriod: "824-892 CE",
  },
  {
    id: "eng-nasai",
    name: "Sunan an-Nasa'i",
    nameArabic: "سنن النسائي",
    description: "A collection known for its strict criteria",
    totalHadiths: 5761,
    compiler: "Imam an-Nasa'i",
    compilationPeriod: "829-915 CE",
  },
  {
    id: "eng-ibnmajah",
    name: "Sunan Ibn Majah",
    nameArabic: "سنن ابن ماجه",
    description: "The sixth book of the Kutub al-Sittah",
    totalHadiths: 4341,
    compiler: "Imam Ibn Majah",
    compilationPeriod: "824-887 CE",
  },
];

async function fetchWithFallback(url: string): Promise<any> {
  try {
    console.log(`[v0] Fetching: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`[v0] API Response structure:`, Object.keys(data));
    return data;
  } catch (error) {
    console.error(`[v0] Error fetching ${url}:`, error);
    throw error;
  }
}

function transformApiHadith(
  apiHadith: any,
  collectionName: string,
  hadithNumber: number
): Hadith {
  const grade = apiHadith.grades?.[0]?.grade || "Unknown";
  const gradeMap: Record<string, Hadith["grade"]> = {
    sahih: "Sahih",
    hasan: "Hasan",
    daif: "Da'if",
    mawdu: "Mawdu'",
  };

  return {
    id: `${collectionName}-${hadithNumber}`,
    text: apiHadith.text || apiHadith.hadith || "Text not available",
    textArabic: apiHadith.arab || apiHadith.arabic || "",
    narrator: apiHadith.narrator || "Various",
    collection: collectionName,
    book: `Book ${apiHadith.reference?.book || 1}`,
    chapter: apiHadith.chapter || "Chapter",
    hadithNumber: hadithNumber.toString(),
    grade: gradeMap[grade.toLowerCase()] || "Unknown",
    reference: `${collectionName} ${hadithNumber}`,
  };
}

export async function searchHadiths(
  query: string,
  filters?: {
    collection?: string;
    grade?: string[];
    narrator?: string[];
  }
): Promise<Hadith[]> {
  try {
    const collections = filters?.collection
      ? [filters.collection]
      : ["eng-bukhari", "eng-muslim"];
    const allResults: Hadith[] = [];

    for (const collectionId of collections) {
      try {
        // Try different possible endpoints
        const urls = [
          `${BASE_URL}/editions/${collectionId}.json`,
          `${BASE_URL}/editions/${collectionId}.min.json`,
        ];

        let data = null;
        for (const url of urls) {
          try {
            data = await fetchWithFallback(url);
            break;
          } catch (error) {
            console.log(`[v0] Failed to fetch ${url}, trying next...`);
          }
        }

        if (!data) continue;

        console.log(
          `[v0] Processing ${collectionId} data structure:`,
          Object.keys(data)
        );

        // Handle different API response structures
        let hadiths: any[] = [];

        if (data.hadiths && Array.isArray(data.hadiths)) {
          hadiths = data.hadiths;
        } else if (data.collection && Array.isArray(data.collection)) {
          hadiths = data.collection;
        } else if (Array.isArray(data)) {
          hadiths = data;
        }

        const filteredHadiths = hadiths
          .filter((hadith: any) => {
            const text = hadith.text || hadith.hadith || "";
            return !query || text.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 20)
          .map((hadith: any, index: number) =>
            transformApiHadith(hadith, collectionId, index + 1)
          );

        allResults.push(...filteredHadiths);
      } catch (error) {
        console.error(`[v0] Error fetching from ${collectionId}:`, error);
      }
    }

    // Apply grade filter
    let filteredResults = allResults;
    if (filters?.grade && filters.grade.length > 0) {
      filteredResults = filteredResults.filter((hadith) =>
        filters.grade!.includes(hadith.grade)
      );
    }

    console.log(`[v0] Returning ${filteredResults.length} search results`);
    return filteredResults.slice(0, 50);
  } catch (error) {
    console.error("[v0] Error searching hadiths:", error);
    return [];
  }
}

export async function getRandomHadith(): Promise<Hadith> {
  try {
    const collections = ["eng-bukhari", "eng-muslim", "eng-abudawud"];
    const randomCollection =
      collections[Math.floor(Math.random() * collections.length)];

    const randomHadithNumber = Math.floor(Math.random() * 1000) + 1;

    try {
      // Try to fetch a specific hadith first
      const specificUrl = `${BASE_URL}/editions/${randomCollection}/${randomHadithNumber}.json`;
      const specificData = await fetchWithFallback(specificUrl);

      if (specificData && (specificData.text || specificData.hadith)) {
        return transformApiHadith(
          specificData,
          randomCollection,
          randomHadithNumber
        );
      }
    } catch (error) {
      console.log(
        `[v0] Specific hadith fetch failed, trying collection approach`
      );
    }

    // Fallback: try to get the whole collection and pick randomly
    const collectionUrl = `${BASE_URL}/editions/${randomCollection}.json`;
    const data = await fetchWithFallback(collectionUrl);

    console.log(`[v0] Collection data structure:`, Object.keys(data));

    // Handle different possible API response structures
    let hadiths: any[] = [];

    if (data.hadiths && Array.isArray(data.hadiths)) {
      hadiths = data.hadiths;
    } else if (data.collection && Array.isArray(data.collection)) {
      hadiths = data.collection;
    } else if (Array.isArray(data)) {
      hadiths = data;
    } else if (data.metadata && data.hadiths) {
      hadiths = data.hadiths;
    }

    console.log(`[v0] Found ${hadiths.length} hadiths`);

    if (hadiths.length > 0) {
      const randomIndex = Math.floor(Math.random() * hadiths.length);
      const randomHadith = hadiths[randomIndex];
      return transformApiHadith(
        randomHadith,
        randomCollection,
        randomIndex + 1
      );
    }

    throw new Error("No hadiths found in API response");
  } catch (error) {
    console.error("[v0] Error getting random hadith:", error);
    return {
      id: "fallback-1",
      text: 'The Prophet (ﷺ) said, "The deeds are considered by the intentions, and a person will get the reward according to his intention."',
      textArabic:
        "إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      narrator: "Umar ibn al-Khattab",
      collection: "Sahih al-Bukhari",
      book: "Book of Revelation",
      chapter: "How the Divine Inspiration started",
      hadithNumber: "1",
      grade: "Sahih",
      reference: "Bukhari 1:1",
    };
  }
}

export async function getHadithById(id: string): Promise<Hadith | null> {
  try {
    const [collection, hadithNumber] = id.split("-");
    if (!collection || !hadithNumber) return null;

    const data = await fetchWithFallback(
      `${BASE_URL}/editions/${collection}/${hadithNumber}`
    );

    if (data.hadithnumber) {
      return transformApiHadith(
        data,
        collection,
        Number.parseInt(hadithNumber)
      );
    }

    return null;
  } catch (error) {
    console.error("[v0] Error getting hadith by ID:", error);
    return null;
  }
}

export async function getAvailableEditions(): Promise<any> {
  try {
    return await fetchWithFallback(`${BASE_URL}/editions`);
  } catch (error) {
    console.error("[v0] Error getting editions:", error);
    return {};
  }
}
