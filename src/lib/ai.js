export const languageTagToHumanReadable = (languageTag) => {
  const displayNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });
  return displayNames.of(languageTag);
};

export const AVAILABLE_LANGUAGES = {
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  ru: "Russian",
  tr: "Turkish",
  fr: "French",
};

const options = {
  sharedContext: "This is a scientific article",
  type: "tl;dr",
  format: "markdown",
  length: "medium",
};

export const detectLanguage = async (text) => {
  if ("ai" in self && "languageDetector" in self.ai) {
    // The Language Detector API is available.
    const languageModel = await self.ai.languageDetector.capabilities();
    const canDetect = languageModel.available;
    if (canDetect === "no") {
      // The language detector isn't usable.
      console.log("add text that detector is unavailable");
      return;
    }
    let detector;
    if (canDetect === "readily") {
      detector = await self.ai.languageDetector.create();
    } else {
      console.log(
        "add model need to be downloaded and file size maybe too large"
      );
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector.ready;
    }

    const result = await detector.detect(text);
    const { detectedLanguage, confidence } = result[0];
    return { detectedLanguage, confidence };
  } else {
    console.log("add text that detector is unavailable");
    console.log("Language Detector API is not available.");
  }
};

export const translateText = async (text, srcLang, targetLang) => {
  if ("ai" in self && "translator" in self.ai) {
    // The Translator API is supported.

    const translatorModel = await self.ai.translator.capabilities();
    const canDetect = translatorModel.languagePairAvailable(
      srcLang,
      targetLang
    );
    if (canDetect === "no") {
      // The translator translate isn't usable.
      console.log("add text that translate is unavailable");
      return;
    }

    const translator =
      canDetect === "readily"
        ? await self.ai.translator.create({
            sourceLanguage: srcLang,
            targetLanguage: targetLang,
          })
        : await self.ai.translator.create({
            sourceLanguage: srcLang,
            targetLanguage: targetLang,
            monitor(m) {
              m.addEventListener("downloadprogress", (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });

    const result = await translator.translate(text);

    return result;
  } else {
    console.log("add text that translate is unavailable");
    console.log("Translator API is not available.");
  }
};

export const summarizeText = async (text) => {
  if ("ai" in self && "summarizer" in self.ai) {
    // The Summarizer API is supported.

    const summarizerModel = await self.ai.summarizer.capabilities();
    const canDetect = summarizerModel.available;

    if (canDetect === "no") {
      // The language summarizer isn't usable.
      console.log("add text that summarizer is unavailable");
      return;
    }
    const summarizer =
      canDetect === "readily"
        ? await self.ai.summarizer.create(options)
        : console.log("download madly heavy");
    // : (
    //   const summarizer = await self.ai.create(options);
    //     summarizer.create({
    //       monitor(m) {
    //         m.addEventListener("downloadprogress", (e) => {
    //           console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
    //         });
    //       },
    //     });
    // await summarizer.ready;
    //   )

    const result = await summarizer.summarize(text, {
      context: "This article is intended for a tech-savvy audience.",
    });

    return result;
  } else {
    console.log("add text that summarize is unavailable");
    console.log("Summarizer API is not available.");
  }
};

// export const promptForAction = async (text, detectedLang) => {
// Show UI prompt for user to choose action
// Return 'summarize' or 'translate'
// };
