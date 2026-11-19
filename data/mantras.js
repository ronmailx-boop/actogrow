// Mantra library. Each entry: topic, feel (how the user feels), block (what stops them), en, he.
// he = masculine Hebrew, heF = feminine Hebrew.
// topic: confidence | calm | focus | selflove | courage | energy
// feel:  anxious | tired | doubtful | scattered
// block: fear | delay | critic | fatigue
// Original text written for Actogrow. Do not copy mantras from books or other apps.
const MANTRAS = [
  // confidence
  { topic: "confidence", feel: "doubtful", block: "fear", en: "I don't need to feel ready to begin.", he: "אני לא צריך להרגיש מוכן כדי להתחיל.", heF: "אני לא צריכה להרגיש מוכנה כדי להתחיל." },
  { topic: "confidence", feel: "doubtful", block: "critic", en: "My voice counts, even when it shakes.", he: "הקול שלי חשוב, גם כשהוא רועד.", heF: "הקול שלי חשוב, גם כשהוא רועד." },
  { topic: "confidence", feel: "anxious", block: "fear", en: "I have handled hard days before. I can handle this one.", he: "כבר עברתי ימים קשים. גם את היום הזה אעבור.", heF: "כבר עברתי ימים קשים. גם את היום הזה אעבור." },
  { topic: "confidence", feel: "anxious", block: "critic", en: "A mistake is an event, not who I am.", he: "טעות היא משהו שקרה, לא מי שאני.", heF: "טעות היא משהו שקרה, לא מי שאני." },
  { topic: "confidence", feel: "scattered", block: "critic", en: "I compare myself only to who I was yesterday.", he: "אני משווה את עצמי רק למי שהייתי אתמול.", heF: "אני משווה את עצמי רק למי שהייתי אתמול." },
  { topic: "confidence", feel: "tired", block: "fatigue", en: "I can be tired and still be capable.", he: "אני יכול להיות עייף ועדיין להצליח.", heF: "אני יכולה להיות עייפה ועדיין להצליח." },
  { topic: "confidence", feel: "doubtful", block: "delay", en: "I act first. Confidence follows.", he: "קודם אני פועל. הביטחון מגיע אחר כך.", heF: "קודם אני פועלת. הביטחון מגיע אחר כך." },
  { topic: "confidence", feel: "scattered", block: "fear", en: "I trust myself to figure it out as I go.", he: "אני סומך על עצמי שאמצא את הדרך תוך כדי.", heF: "אני סומכת על עצמי שאמצא את הדרך תוך כדי." },

  // calm
  { topic: "calm", feel: "anxious", block: "fear", en: "This moment is only this moment.", he: "הרגע הזה הוא רק הרגע הזה.", heF: "הרגע הזה הוא רק הרגע הזה." },
  { topic: "calm", feel: "anxious", block: "fear", en: "I am safe enough, right here, right now.", he: "אני מספיק בטוח, כאן ועכשיו.", heF: "אני מספיק בטוחה, כאן ועכשיו." },
  { topic: "calm", feel: "anxious", block: "critic", en: "My thoughts are weather. I am the sky.", he: "המחשבות שלי הן מזג אוויר. אני השמיים.", heF: "המחשבות שלי הן מזג אוויר. אני השמיים." },
  { topic: "calm", feel: "scattered", block: "delay", en: "One thing at a time. This thing, now.", he: "דבר אחד בכל פעם. הדבר הזה, עכשיו.", heF: "דבר אחד בכל פעם. הדבר הזה, עכשיו." },
  { topic: "calm", feel: "scattered", block: "fear", en: "Not every alarm in my head is a fire.", he: "לא כל אזעקה בראש שלי היא שריפה.", heF: "לא כל אזעקה בראש שלי היא שריפה." },
  { topic: "calm", feel: "tired", block: "fatigue", en: "Enough for today is enough.", he: "מה שעשיתי היום מספיק להיום.", heF: "מה שעשיתי היום מספיק להיום." },
  { topic: "calm", feel: "doubtful", block: "fear", en: "Uncertainty is uncomfortable, not dangerous.", he: "חוסר ודאות הוא לא נעים, אבל הוא לא מסוכן.", heF: "חוסר ודאות הוא לא נעים, אבל הוא לא מסוכן." },
  { topic: "calm", feel: "anxious", block: "delay", en: "The wave rises, and the wave passes.", he: "הגל עולה, והגל עובר.", heF: "הגל עולה, והגל עובר." },

  // focus
  { topic: "focus", feel: "scattered", block: "delay", en: "Start small. Start now.", he: "להתחיל קטן. להתחיל עכשיו.", heF: "להתחיל קטן. להתחיל עכשיו." },
  { topic: "focus", feel: "scattered", block: "delay", en: "Five minutes of doing beats an hour of planning.", he: "חמש דקות של עשייה שוות יותר משעה של תכנון.", heF: "חמש דקות של עשייה שוות יותר משעה של תכנון." },
  { topic: "focus", feel: "tired", block: "delay", en: "Slow is still moving.", he: "לאט זה עדיין להתקדם.", heF: "לאט זה עדיין להתקדם." },
  { topic: "focus", feel: "doubtful", block: "delay", en: "Done with courage beats perfect and never.", he: "עשוי באומץ עדיף על מושלם שלא קורה.", heF: "עשוי באומץ עדיף על מושלם שלא קורה." },
  { topic: "focus", feel: "scattered", block: "critic", en: "I choose the next simple step.", he: "אני בוחר את הצעד הפשוט הבא.", heF: "אני בוחרת את הצעד הפשוט הבא." },
  { topic: "focus", feel: "anxious", block: "delay", en: "I keep the promise I made to myself this morning.", he: "אני מקיים את ההבטחה שנתתי לעצמי הבוקר.", heF: "אני מקיימת את ההבטחה שנתתי לעצמי הבוקר." },
  { topic: "focus", feel: "tired", block: "fatigue", en: "Small steps still count as steps.", he: "גם צעדים קטנים הם צעדים.", heF: "גם צעדים קטנים הם צעדים." },
  { topic: "focus", feel: "scattered", block: "fatigue", en: "Clear beats clever.", he: "פשוט וברור עדיף על מסובך ומרשים.", heF: "פשוט וברור עדיף על מסובך ומרשים." },

  // selflove
  { topic: "selflove", feel: "doubtful", block: "critic", en: "I speak to myself like someone I respect.", he: "אני מדבר אל עצמי כמו אל מישהו שאני מכבד.", heF: "אני מדברת אל עצמי כמו אל מישהי שאני מכבדת." },
  { topic: "selflove", feel: "doubtful", block: "critic", en: "I deserve the same patience I give my friends.", he: "מגיעה לי אותה סבלנות שאני נותן לחברים שלי.", heF: "מגיעה לי אותה סבלנות שאני נותנת לחברות שלי." },
  { topic: "selflove", feel: "tired", block: "critic", en: "My worth is not measured by today's output.", he: "הערך שלי לא נמדד במה שהספקתי היום.", heF: "הערך שלי לא נמדד במה שהספקתי היום." },
  { topic: "selflove", feel: "tired", block: "fatigue", en: "Rest is part of my strength.", he: "מנוחה היא חלק מהכוח שלי.", heF: "מנוחה היא חלק מהכוח שלי." },
  { topic: "selflove", feel: "anxious", block: "critic", en: "I am allowed to take up space.", he: "מותר לי לתפוס מקום.", heF: "מותר לי לתפוס מקום." },
  { topic: "selflove", feel: "scattered", block: "critic", en: "I am learning, and learning looks messy.", he: "אני לומד, ולמידה נראית מבולגנת.", heF: "אני לומדת, ולמידה נראית מבולגנת." },
  { topic: "selflove", feel: "tired", block: "critic", en: "I forgive myself for needing rest.", he: "אני סולח לעצמי על כך שאני צריך מנוחה.", heF: "אני סולחת לעצמי על כך שאני צריכה מנוחה." },
  { topic: "selflove", feel: "doubtful", block: "fear", en: "I don't have to earn a calm moment.", he: "אני לא צריך להרוויח רגע של שקט.", heF: "אני לא צריכה להרוויח רגע של שקט." },

  // courage
  { topic: "courage", feel: "anxious", block: "fear", en: "I can feel nervous and walk in anyway.", he: "אני יכול להרגיש לחץ ולהיכנס בכל זאת.", heF: "אני יכולה להרגיש לחץ ולהיכנס בכל זאת." },
  { topic: "courage", feel: "anxious", block: "fear", en: "Fear means I'm growing, not that I should stop.", he: "פחד אומר שאני גדל, לא שאני צריך לעצור.", heF: "פחד אומר שאני גדלה, לא שאני צריכה לעצור." },
  { topic: "courage", feel: "doubtful", block: "fear", en: "Other people's doubt is not my instruction.", he: "הספק של אחרים הוא לא הוראה בשבילי.", heF: "הספק של אחרים הוא לא הוראה בשבילי." },
  { topic: "courage", feel: "doubtful", block: "delay", en: "One brave step is enough for today.", he: "צעד אמיץ אחד מספיק להיום.", heF: "צעד אמיץ אחד מספיק להיום." },
  { topic: "courage", feel: "anxious", block: "critic", en: "I can feel the fear without obeying it.", he: "אני יכול להרגיש את הפחד בלי לציית לו.", heF: "אני יכולה להרגיש את הפחד בלי לציית לו." },
  { topic: "courage", feel: "scattered", block: "fear", en: "Discomfort is the price of the life I want.", he: "אי נוחות היא המחיר של החיים שאני רוצה.", heF: "אי נוחות היא המחיר של החיים שאני רוצה." },
  { topic: "courage", feel: "doubtful", block: "critic", en: "Saying no to others can be saying yes to me.", he: "לומר לא לאחרים יכול להיות לומר כן לעצמי.", heF: "לומר לא לאחרים יכול להיות לומר כן לעצמי." },
  { topic: "courage", feel: "tired", block: "fear", en: "Brave does not mean loud.", he: "אמיץ לא חייב להיות רועש.", heF: "אמיצה לא חייבת להיות רועשת." },

  // energy
  { topic: "energy", feel: "tired", block: "fatigue", en: "I can begin with one breath.", he: "אני יכול להתחיל מנשימה אחת.", heF: "אני יכולה להתחיל מנשימה אחת." },
  { topic: "energy", feel: "tired", block: "delay", en: "Motion creates energy.", he: "תנועה יוצרת אנרגיה.", heF: "תנועה יוצרת אנרגיה." },
  { topic: "energy", feel: "tired", block: "fatigue", en: "A little today is more than nothing.", he: "קצת היום זה יותר מכלום.", heF: "קצת היום זה יותר מכלום." },
  { topic: "energy", feel: "scattered", block: "fatigue", en: "I spend my energy on what matters to me.", he: "אני משקיע את האנרגיה שלי במה שחשוב לי.", heF: "אני משקיעה את האנרגיה שלי במה שחשוב לי." },
  { topic: "energy", feel: "doubtful", block: "delay", en: "My future self is thanking me right now.", he: "העצמי שלי מהעתיד מודה לי עכשיו.", heF: "העצמי שלי מהעתיד מודה לי עכשיו." },
  { topic: "energy", feel: "anxious", block: "fatigue", en: "I refill before I give.", he: "אני ממלא את עצמי לפני שאני נותן.", heF: "אני ממלאת את עצמי לפני שאני נותנת." },
  { topic: "energy", feel: "tired", block: "critic", en: "Today I do what I can, and that is enough.", he: "היום אני עושה מה שאני יכול, וזה מספיק.", heF: "היום אני עושה מה שאני יכולה, וזה מספיק." },
  { topic: "energy", feel: "scattered", block: "delay", en: "I start before I feel like it.", he: "אני מתחיל עוד לפני שבא לי.", heF: "אני מתחילה עוד לפני שבא לי." }
].map((m, i) => ({ id: i, ...m }));
