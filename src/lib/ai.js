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
  sharedContext: "This is an article",
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
      throw new Error(
        `Your browser supports the Experimental Language Detector API, but it needs to download the model first. Download size might be too large so i won't attempt to help download it. Sage is considerate😊.`
      );
    }
    let detector;
    if (canDetect === "readily") {
      detector = await self.ai.languageDetector.create();
    } else {
      throw new Error(
        `Your browser supports the Experimental Language Detector API, but for some reason it can't be used at the moment (i.e insufficient disk space).`
      );
    }
    const result = await detector.detect(text);
    const { detectedLanguage, confidence } = result[0];
    return { detectedLanguage, confidence };
  } else {
    throw new Error(
      `Your browser does not support the Experimental Language Detector API. You won't be able to see our sage at work😔.`
    );
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
      throw new Error(
        `Your browser supports the Experimental Translator API, but it needs to download the model first. Download size might be too large so i won't attempt to help download it. Download it or try another language pair . Sage is considerate😊.`
      );
    }

    let translator;

    if (canDetect === "readily") {
      translator = await self.ai.translator.create({
        sourceLanguage: srcLang,
        targetLanguage: targetLang,
      });
    } else {
      throw new Error(
        `Your browser supports the Experimental Translator API, but for some reason it can't be used at the moment (i.e insufficient disk space).`
      );
    }

    const result = await translator.translate(text);

    return result;
  } else {
    throw new Error(
      `Your browser does not support the Experimental Translator API. You won't be able to see our sage at work😔.`
    );
  }
};

export const summarizeText = async (text) => {
  if ("ai" in self && "summarizer" in self.ai) {
    // The Summarizer API is supported.

    const summarizerModel = await self.ai.summarizer.capabilities();
    const canDetect = summarizerModel.available;

    if (canDetect === "no") {
      // The summarizer isn't usable.
      throw new Error(
        `Your browser supports the Experimental Summarizer API, but it needs to download the model first. Download size might be too large so i won't attempt to help download it. Sage is considerate😊.`
      );
    }
    let summarizer;

    if (canDetect === "readily") {
      summarizer = await self.ai.summarizer.create(options);
    } else {
      throw new Error(
        `Your browser supports the Experimental Summarizer API, but for some reason it can't be used at the moment (i.e insufficient disk space).`
      );
    }

    const result = await summarizer.summarize(text, {
      context: "This article is intended for a tech-savvy audience.",
    });

    return result;
  } else {
    throw new Error(
      `Your browser does not support the Experimental Summarizer API. You won't be able to see our sage at work😔.`
    );
  }
};
