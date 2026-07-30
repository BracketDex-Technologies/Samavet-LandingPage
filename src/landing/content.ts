export type LandingLanguage = 'en' | 'mr';

export const localizedCopy = {
  en: {
    brandLine: 'India’s Community Technology Platform',
    chat: 'Chat on WhatsApp',
    demo: 'Book Demo on WhatsApp',
    portal: 'Portal login',
    nav: ['ePawati', 'Event intelligence', 'Services', 'For communities', 'Contact'],
    heroEyebrow: 'Digital by Choice. Community by Heart.',
    heroTitle: ['Together in Tradition.', 'Stronger in Purpose.'],
    heroDescription: 'Samavet helps community organizations manage digital donation receipts and day-to-day festival operations — simply and transparently.',
    heroSignals: ['Trusted by communities across India'],
    receiptKicker: 'FROM PAPER TO EPAWATI',
    receiptTitle: 'Every offering deserves a clear record.',
    receiptDescription: 'Turn a contribution into a thoughtful digital receipt your community can share and revisit.',
    receiptBenefits: ['A receipt made for your organization', 'A clear digital record for every offering', 'Prepared for sharing through WhatsApp'],
    eventKicker: 'EVENT INTELLIGENCE',
    eventTitle: 'See the gathering as it happens.',
    eventDescription: 'Live headcount, analytics, and insights help organizers understand the rhythm of an event.',
    servicesKicker: 'BEYOND THE RECEIPT',
    servicesTitle: 'More ways Samavet supports your event.',
    audienceKicker: 'BUILT FOR COMMUNITY',
    audienceTitle: 'One platform. Many ways to gather.',
    audienceDescription: 'Samavet is shaped for the organizations that create meaningful occasions for people.',
    workflowKicker: 'A SIMPLE RHYTHM',
    workflowTitle: 'Make the work feel more connected.',
    conversionKicker: 'LET’S BUILD THE NEXT ONE WELL',
    conversionTitle: 'Bring your next offering online.',
    conversionDescription: 'Tell us what your organization needs. We will prepare a demo conversation around it.',
    formNotice: 'After you submit, your email app will open a prepared request to our team.',
    footerLine: 'Technology that holds community closer.',
  },
  mr: {
    brandLine: 'भारताचे समुदाय तंत्रज्ञान व्यासपीठ',
    chat: 'व्हॉट्सअॅपवर बोला',
    demo: 'व्हॉट्सअॅपवर डेमो बुक करा',
    portal: 'पोर्टल लॉगिन',
    nav: ['ई-पावती', 'इव्हेंट इंटेलिजन्स', 'सेवा', 'समुदायांसाठी', 'संपर्क'],
    heroEyebrow: 'डिजिटल पावत्या. समुदायासाठी मनापासून.',
    heroTitle: ['परंपरेत एकत्र.', 'उद्देशात अधिक मजबूत.'],
    heroDescription: 'समवेत गणेश मंडळे आणि समुदाय संस्थांना डिजिटल देणगी पावत्या तयार करण्यास आणि उत्सव व्यवस्थापन समन्वयित करण्यास मदत करते.',
    heroSignals: ['भारतभरातील समुदायांचा विश्वास'],
    receiptKicker: 'कागदापासून ई-पावतीपर्यंत',
    receiptTitle: 'प्रत्येक देणगीसाठी स्पष्ट नोंद महत्त्वाची आहे.',
    receiptDescription: 'देणगीचे रूपांतर अशा विचारपूर्वक डिजिटल पावतीत करा जी समुदाय सहज शेअर करू शकतो.',
    receiptBenefits: ['तुमच्या संस्थेसाठी योग्य पावती', 'प्रत्येक देणगीची स्पष्ट डिजिटल नोंद', 'व्हॉट्सअॅपवर शेअर करण्यासाठी तयार'],
    eventKicker: 'इव्हेंट इंटेलिजन्स',
    eventTitle: 'मेळावा जसा घडतो, तसा पाहा.',
    eventDescription: 'लाइव्ह हेडकाउंट, विश्लेषण आणि इनसाइट्स आयोजकांना कार्यक्रमाचा वेग समजून घेण्यास मदत करतात.',
    servicesKicker: 'पावतीपलीकडे',
    servicesTitle: 'तुमच्या कार्यक्रमासाठी समवेतकडून आणखी मदत.',
    audienceKicker: 'समुदायासाठी तयार केलेले',
    audienceTitle: 'एक व्यासपीठ. एकत्र येण्याचे अनेक मार्ग.',
    audienceDescription: 'लोकांसाठी अर्थपूर्ण प्रसंग घडवणाऱ्या संस्थांसाठी समवेत घडवले आहे.',
    workflowKicker: 'सोपे चक्र',
    workflowTitle: 'काम अधिक जोडलेले वाटू द्या.',
    conversionKicker: 'पुढचा उपक्रम उत्तम घडवूया',
    conversionTitle: 'तुमची पुढील देणगी प्रक्रिया ऑनलाइन करा.',
    conversionDescription: 'तुमच्या संस्थेला काय हवे आहे ते सांगा. त्यानुसार डेमो संवाद तयार करू.',
    formNotice: 'सबमिट केल्यानंतर आमच्या टीमसाठी तयार ईमेल विनंती तुमच्या ईमेल अॅपमध्ये उघडेल.',
    footerLine: 'समुदायांना अधिक जवळ आणणारे तंत्रज्ञान.',
  },
} as const;

export const audienceGroups = {
  en: [
    ['Trusts', 'Keep offerings and people connected.'],
    ['Temples', 'Make every contribution easier to acknowledge.'],
    ['Ganesh mandals', 'Coordinate receipts, teams, and occasion work.'],
    ['NGOs', 'Bring donor and event activity into a clearer view.'],
    ['Social organizations', 'Give everyday community work a digital rhythm.'],
  ],
  mr: [
    ['ट्रस्ट', 'देणग्या आणि लोकांना जोडून ठेवा.'],
    ['मंदिरे', 'प्रत्येक देणगीची दखल घेणे सोपे करा.'],
    ['गणेश मंडळे', 'पावत्या, टीम आणि उत्सवातील कामे एकत्र सांभाळा.'],
    ['एनजीओ', 'देणगीदार आणि कार्यक्रमांची स्पष्ट माहिती मिळवा.'],
    ['सामाजिक संस्था', 'दैनंदिन समुदाय कामांना डिजिटल लय द्या.'],
  ],
} as const;

export const supportingServices = {
  en: [
    ['ePawati', 'Digital Vargani Slips', 'Create your familiar Vargani slip digitally and send the same branded receipt to every donor on WhatsApp.'],
    ['Live analytics', 'Event Intelligence', 'See registrations, attendance, donations and reach through one clear real-time view.'],
    ['Facebook & YouTube', '24×7 Live Streaming', 'Bring every aarti, utsav and community moment to devotees wherever they are.'],
    ['Production studio', 'Podcast & Media', 'Turn stories, teachings and community voices into thoughtful, broadcast-ready media.'],
  ],
  mr: [
    ['ई-पावती', 'डिजिटल वर्गणी पावत्या', 'परिचित वर्गणी पावती डिजिटल करा आणि प्रत्येक देणगीदाराला व्हॉट्सअॅपवर त्याच ब्रँडची पावती पाठवा.'],
    ['लाइव्ह अॅनालिटिक्स', 'इव्हेंट इंटेलिजन्स', 'नोंदणी, उपस्थिती, देणग्या आणि पोहोच एका स्पष्ट रिअल-टाइम दृश्यात पहा.'],
    ['फेसबुक आणि यूट्यूब', '२४×७ लाईव्ह स्ट्रीमिंग', 'प्रत्येक आरती, उत्सव आणि समुदायाचा क्षण भक्तांपर्यंत ते जिथे असतील तिथे पोहोचवा.'],
    ['प्रॉडक्शन स्टुडिओ', 'पॉडकास्ट आणि मीडिया', 'कथा, शिकवण आणि समुदायाचे आवाज विचारपूर्वक, प्रसारणासाठी तयार माध्यमात रूपांतरित करा.'],
  ],
} as const;

export const workflowSteps = {
  en: [
    ['Set the occasion', 'Bring your organization, people, and receipt style together.'],
    ['Record the offering', 'Create a clear digital receipt when a contribution is received.'],
    ['Understand the day', 'Review the activity and event signals that matter to your team.'],
  ],
  mr: [
    ['प्रसंग तयार करा', 'तुमची संस्था, लोक आणि पावतीचा प्रकार एकत्र आणा.'],
    ['देणगी नोंदवा', 'देणगी मिळाल्यावर स्पष्ट डिजिटल पावती तयार करा.'],
    ['दिवस समजून घ्या', 'टीमसाठी महत्त्वाचे उपक्रम आणि इव्हेंट सिग्नल पाहा.'],
  ],
} as const;
