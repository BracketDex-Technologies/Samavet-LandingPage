export type LandingLanguage = 'en' | 'mr';

export const localizedCopy = {
  en: {
    brandLine: 'India’s Community Technology Platform',
    heroEyebrow: 'Built for communities that bring people together',
    heroTagline: 'Digital receipts. Community by heart.',
    heroTrust: 'Made for community organizations.',
    heroTitle: ['Together in tradition.', 'Stronger in purpose.'],
    heroDescription: 'Samavet helps Ganesh mandals and community organizations issue digital donation receipts and coordinate festival operations.',
    demo: 'Book a demo',
    chat: 'Chat on WhatsApp',
    portal: 'Portal login',
    audienceKicker: 'SAMAVET COMMUNITY',
    audienceTitle: 'Who is Samavet for?',
    audienceIntro: 'Designed first for Ganesh mandals, with room for every community organization.',
    epawatiTitle: ['ePawati', '— Digital donation receipts'],
    epawatiDescription: 'Issue and share donation receipts from one organized workspace, then keep the information easy for your team to review.',
    capabilitiesTitle: 'Everything you need, in one place.',
    capabilitiesKicker: 'THE PLATFORM',
    workflowTitle: 'How Samavet works',
    workflowKicker: 'A SIMPLE RHYTHM',
    finalTitle: 'Ready to simplify your festival operations?',
    finalDescription: 'Let’s talk on WhatsApp.',
    finalKicker: 'LET’S TALK',
    feedbackPrompt: 'Was this helpful?',
    feedbackThanks: 'Thank you for sharing your feedback.',
    feedbackYes: 'Yes',
    feedbackNo: 'No',
  },
  mr: {
    brandLine: 'भारताचे समुदाय तंत्रज्ञान व्यासपीठ',
    heroEyebrow: 'समुदायांना एकत्र आणणाऱ्यांसाठी',
    heroTagline: 'डिजिटल पावत्या. समुदायासाठी.',
    heroTrust: 'समुदाय संस्थांसाठी तयार केलेले.',
    heroTitle: ['परंपरेत एकत्र.', 'उद्देशात अधिक सक्षम.'],
    heroDescription: 'समवेत गणेश मंडळे आणि समुदाय संस्थांना डिजिटल देणगी पावत्या देण्यास व उत्सवातील कामांचे नियोजन करण्यास मदत करते.',
    demo: 'डेमो बुक करा',
    chat: 'व्हॉट्सअॅपवर बोला',
    portal: 'पोर्टल लॉगिन',
    audienceKicker: 'समवेत समुदाय',
    audienceTitle: 'समवेत कोणासाठी आहे?',
    audienceIntro: 'प्रथम गणेश मंडळांसाठी; तसेच प्रत्येक समुदाय संस्थेसाठी.',
    epawatiTitle: ['ई-पावती', '— डिजिटल देणगी पावत्या'],
    epawatiDescription: 'एका व्यवस्थित कार्यक्षेत्रातून देणगी पावत्या तयार करा व शेअर करा; नंतर टीमसाठी माहिती सहजपणे पाहता येईल.',
    capabilitiesTitle: 'तुमच्या कामासाठी एकाच ठिकाणी सर्वकाही.',
    capabilitiesKicker: 'प्लॅटफॉर्म',
    workflowTitle: 'समवेत कसे काम करते',
    workflowKicker: 'सोप्या पद्धतीने',
    finalTitle: 'तुमच्या उत्सवाचे काम अधिक सोपे करायचे आहे?',
    finalDescription: 'व्हॉट्सअॅपवर बोलूया.',
    finalKicker: 'बोलूया',
    feedbackPrompt: 'ही माहिती उपयुक्त होती का?',
    feedbackThanks: 'तुमच्या अभिप्रायाबद्दल धन्यवाद.',
    feedbackYes: 'होय',
    feedbackNo: 'नाही',
  },
} as const;

export const audienceGroups = {
  en: [
    ['Ganesh mandals', 'Coordinate collections, teams, and festival work.'],
    ['Trusts', 'Keep donation records and member activity organized.'],
    ['Temples', 'Support receipts and community coordination.'],
    ['NGOs', 'Bring donor and team activity into one workflow.'],
    ['Social organizations', 'Plan everyday community work with clarity.'],
  ],
  mr: [
    ['गणेश मंडळे', 'देणगी संकलन, टीम आणि उत्सवातील कामे एकत्र सांभाळा.'],
    ['ट्रस्ट', 'देणगी नोंदी आणि सदस्यांची कामे व्यवस्थित ठेवा.'],
    ['मंदिरे', 'पावत्या आणि समुदाय समन्वयासाठी मदत.'],
    ['एनजीओ', 'देणगीदार आणि टीमची कामे एका कार्यपद्धतीत आणा.'],
    ['सामाजिक संस्था', 'दैनंदिन समुदाय कामांचे नियोजन स्पष्टपणे करा.'],
  ],
} as const;

export const epawatiBenefits = {
  en: [
    ['Digital receipts', 'Create a clear record for every contribution.'],
    ['Receipt templates', 'Use templates that suit your organization.'],
    ['WhatsApp-oriented sharing', 'Share receipt links with donors from your workspace.'],
  ],
  mr: [
    ['डिजिटल पावत्या', 'प्रत्येक देणगीची स्पष्ट नोंद तयार करा.'],
    ['पावती टेम्पलेट्स', 'तुमच्या संस्थेसाठी योग्य टेम्पलेट्स वापरा.'],
    ['व्हॉट्सअॅप शेअरिंग', 'तुमच्या कार्यक्षेत्रातून देणगीदारांसोबत पावती लिंक शेअर करा.'],
  ],
} as const;

export const capabilities = {
  en: [
    ['Members & teams', 'Manage members, roles, and collection teams from one place.'],
    ['Receipt templates', 'Create receipt templates that suit each organization.'],
    ['Receipt sharing', 'Prepare and share digital receipt links through WhatsApp.'],
    ['Dashboards & reports', 'Review collection activity with clear dashboards and reports.'],
    ['Tasks & expenses', 'Coordinate work and record festival expenses as they happen.'],
  ],
  mr: [
    ['सदस्य आणि टीम', 'सदस्य, भूमिका आणि संकलन टीम एकाच ठिकाणी सांभाळा.'],
    ['पावती टेम्पलेट्स', 'प्रत्येक संस्थेसाठी योग्य पावती टेम्पलेट तयार करा.'],
    ['पावती शेअरिंग', 'व्हॉट्सअॅपद्वारे डिजिटल पावती लिंक तयार करा व शेअर करा.'],
    ['डॅशबोर्ड आणि अहवाल', 'स्पष्ट डॅशबोर्ड आणि अहवालातून संकलनाचे काम पाहा.'],
    ['कामे आणि खर्च', 'उत्सवातील कामे समन्वयित करा आणि खर्च नोंदवा.'],
  ],
} as const;

export const workflowSteps = {
  en: [
    ['Set up', 'Create your organization, add members, and choose receipt templates.'],
    ['Collect & manage', 'Record donations, assign work, and track expenses.'],
    ['Share & review', 'Share receipts and review activity from clear reports.'],
  ],
  mr: [
    ['सेट अप करा', 'संस्था तयार करा, सदस्य जोडा आणि पावती टेम्पलेट निवडा.'],
    ['संकलन व व्यवस्थापन', 'देणग्या नोंदवा, कामे द्या आणि खर्च पाहा.'],
    ['शेअर व आढावा', 'पावत्या शेअर करा आणि स्पष्ट अहवालातून कामाचा आढावा घ्या.'],
  ],
} as const;
