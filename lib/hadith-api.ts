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
    id: "bukhari",
    name: "Sahih al-Bukhari",
    nameArabic: "صحيح البخاري",
    description:
      "The most authentic collection of hadith compiled by Imam al-Bukhari",
    totalHadiths: 7563,
    compiler: "Imam Muhammad al-Bukhari",
    compilationPeriod: "810-870 CE",
  },
  {
    id: "muslim",
    name: "Sahih Muslim",
    nameArabic: "صحيح مسلم",
    description: "The second most authentic collection compiled by Imam Muslim",
    totalHadiths: 7190,
    compiler: "Imam Muslim ibn al-Hajjaj",
    compilationPeriod: "817-875 CE",
  },
  {
    id: "abudawud",
    name: "Sunan Abu Dawud",
    nameArabic: "سنن أبي داود",
    description: "A comprehensive collection focusing on legal matters",
    totalHadiths: 5274,
    compiler: "Imam Abu Dawud",
    compilationPeriod: "817-889 CE",
  },
  {
    id: "tirmidhi",
    name: "Jami' at-Tirmidhi",
    nameArabic: "جامع الترمذي",
    description: "A comprehensive collection with detailed commentary",
    totalHadiths: 3956,
    compiler: "Imam at-Tirmidhi",
    compilationPeriod: "824-892 CE",
  },
  {
    id: "nasai",
    name: "Sunan an-Nasa'i",
    nameArabic: "سنن النسائي",
    description: "A collection known for its strict criteria",
    totalHadiths: 5761,
    compiler: "Imam an-Nasa'i",
    compilationPeriod: "829-915 CE",
  },
  {
    id: "ibnmajah",
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

function transformApiHadithWithArabic(
  englishData: any,
  arabicData: any,
  collectionName: string,
  hadithNumber: number
): Hadith {
  const englishHadith = englishData?.hadiths?.[0] || englishData;
  const arabicHadith = arabicData?.hadiths?.[0] || arabicData;

  const grade = englishHadith?.grades?.[0]?.grade || "Unknown";
  const gradeMap: Record<string, Hadith["grade"]> = {
    sahih: "Sahih",
    hasan: "Hasan",
    daif: "Da'if",
    mawdu: "Mawdu'",
  };

  return {
    id: `${collectionName}-${hadithNumber}`,
    text:
      englishHadith?.text ||
      englishHadith?.hadith ||
      "English text not available",
    textArabic:
      arabicHadith?.text || arabicHadith?.hadith || "النص العربي غير متوفر",
    narrator: englishHadith?.narrator || arabicHadith?.narrator || "Various",
    collection: collectionName,
    book: `Book ${
      englishHadith?.reference?.book || arabicHadith?.reference?.book || 1
    }`,
    chapter: englishHadith?.chapter || arabicHadith?.chapter || "Chapter",
    hadithNumber: hadithNumber.toString(),
    grade: gradeMap[grade.toLowerCase()] || "Unknown",
    reference: `${collectionName} ${hadithNumber}`,
  };
}

async function fetchHadithWithBothLanguages(
  collectionId: string,
  hadithNumber: number
): Promise<{ english: any; arabic: any } | null> {
  try {
    const englishUrl = `${BASE_URL}/editions/eng-${collectionId}/sections/${hadithNumber}.json`;
    const arabicUrl = `${BASE_URL}/editions/ara-${collectionId}/sections/${hadithNumber}.json`;

    console.log(`[v0] Fetching English: ${englishUrl}`);
    console.log(`[v0] Fetching Arabic: ${arabicUrl}`);

    const [englishResponse, arabicResponse] = await Promise.allSettled([
      fetchWithFallback(englishUrl),
      fetchWithFallback(arabicUrl),
    ]);

    const englishData =
      englishResponse.status === "fulfilled" ? englishResponse.value : null;
    const arabicData =
      arabicResponse.status === "fulfilled" ? arabicResponse.value : null;

    return { english: englishData, arabic: arabicData };
  } catch (error) {
    console.error(`[v0] Error fetching hadith with both languages:`, error);
    return null;
  }
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
      : ["bukhari", "muslim"];
    const allResults: Hadith[] = [];

    for (const collectionId of collections) {
      try {
        for (let sectionNum = 1; sectionNum <= 10; sectionNum++) {
          const bothLanguages = await fetchHadithWithBothLanguages(
            collectionId,
            sectionNum
          );

          if (bothLanguages?.english || bothLanguages?.arabic) {
            const englishData = bothLanguages.english;
            const arabicData = bothLanguages.arabic;

            const englishHadiths = englishData?.hadiths || [];
            const arabicHadiths = arabicData?.hadiths || [];

            const maxLength = Math.max(
              englishHadiths.length,
              arabicHadiths.length
            );

            for (let i = 0; i < maxLength; i++) {
              const englishHadith = englishHadiths[i];
              const arabicHadith = arabicHadiths[i];

              if (englishHadith || arabicHadith) {
                const englishText =
                  englishHadith?.text || englishHadith?.hadith || "";
                const arabicText =
                  arabicHadith?.text || arabicHadith?.hadith || "";

                const matchesQuery =
                  !query ||
                  englishText.toLowerCase().includes(query.toLowerCase()) ||
                  arabicText.includes(query) ||
                  (englishHadith?.narrator &&
                    englishHadith.narrator
                      .toLowerCase()
                      .includes(query.toLowerCase()));

                if (matchesQuery) {
                  const hadithNumber =
                    englishHadith?.hadithnumber ||
                    arabicHadith?.hadithnumber ||
                    sectionNum * 100 + i + 1;

                  const hadith: Hadith = {
                    id: `${collectionId}-${hadithNumber}`,
                    text: englishText || "English text not available",
                    textArabic: arabicText || "النص العربي غير متوفر",
                    narrator:
                      englishHadith?.narrator ||
                      arabicHadith?.narrator ||
                      "Various",
                    collection: collectionId,
                    book: `Book ${
                      englishHadith?.reference?.book ||
                      arabicHadith?.reference?.book ||
                      sectionNum
                    }`,
                    chapter:
                      englishHadith?.chapter ||
                      arabicHadith?.chapter ||
                      `Section ${sectionNum}`,
                    hadithNumber: hadithNumber.toString(),
                    grade: getGradeFromHadith(englishHadith || arabicHadith),
                    reference: `${collectionId} ${hadithNumber}`,
                  };

                  allResults.push(hadith);

                  if (allResults.length >= 50) break;
                }
              }
            }

            if (allResults.length >= 50) break;
          }
        }
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

function getGradeFromHadith(hadith: any): Hadith["grade"] {
  if (
    !hadith?.grades ||
    !Array.isArray(hadith.grades) ||
    hadith.grades.length === 0
  ) {
    return "Unknown";
  }

  const grade = hadith.grades[0]?.grade?.toLowerCase() || "unknown";
  const gradeMap: Record<string, Hadith["grade"]> = {
    sahih: "Sahih",
    hasan: "Hasan",
    daif: "Da'if",
    "da'if": "Da'if",
    mawdu: "Mawdu'",
    "mawdu'": "Mawdu'",
  };

  return gradeMap[grade] || "Unknown";
}

export async function getRandomHadith(): Promise<Hadith> {
  try {
    const collections = ["bukhari", "muslim", "abudawud"];
    const randomCollection =
      collections[Math.floor(Math.random() * collections.length)];
    const randomSection = Math.floor(Math.random() * 20) + 1; // Increased range

    console.log(
      `[v0] Getting random hadith from ${randomCollection}, section ${randomSection}`
    );

    const bothLanguages = await fetchHadithWithBothLanguages(
      randomCollection,
      randomSection
    );

    if (bothLanguages?.english || bothLanguages?.arabic) {
      const englishData = bothLanguages.english;
      const arabicData = bothLanguages.arabic;

      // Get hadiths from the section
      const englishHadiths = englishData?.hadiths || [];
      const arabicHadiths = arabicData?.hadiths || [];

      if (englishHadiths.length > 0 || arabicHadiths.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * Math.max(englishHadiths.length, arabicHadiths.length)
        );
        const englishHadith = englishHadiths[randomIndex];
        const arabicHadith = arabicHadiths[randomIndex];

        const hadithNumber =
          englishHadith?.hadithnumber ||
          arabicHadith?.hadithnumber ||
          randomSection * 100 + randomIndex + 1;

        return {
          id: `${randomCollection}-${hadithNumber}`,
          text:
            englishHadith?.text ||
            englishHadith?.hadith ||
            "English text not available",
          textArabic:
            arabicHadith?.text ||
            arabicHadith?.hadith ||
            "النص العربي غير متوفر",
          narrator:
            englishHadith?.narrator || arabicHadith?.narrator || "Various",
          collection: randomCollection,
          book: `Book ${
            englishHadith?.reference?.book ||
            arabicHadith?.reference?.book ||
            randomSection
          }`,
          chapter:
            englishHadith?.chapter ||
            arabicHadith?.chapter ||
            `Section ${randomSection}`,
          hadithNumber: hadithNumber.toString(),
          grade: getGradeFromHadith(englishHadith || arabicHadith),
          reference: `${randomCollection} ${hadithNumber}`,
        };
      }
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
