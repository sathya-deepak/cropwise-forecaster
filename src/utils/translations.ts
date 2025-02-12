import { SupportedLanguage } from '@/contexts/LanguageContext';

export const translations = {
  en: {
    // Index page
    title: "Crop Prediction System",
    subtitle: "Make data-driven decisions for your farming needs",
    quickPrediction: "Quick Prediction",
    detailedAnalysis: "Detailed Analysis",
    dataDriven: "Data-Driven",
    dataDrivenDesc: "Make informed decisions based on scientific data and analysis",
    comprehensive: "Comprehensive",
    comprehensiveDesc: "Consider multiple factors affecting crop growth",
    easyToUse: "Easy to Use",
    easyToUseDesc: "Simple interface for quick and detailed predictions",
    
    // Predict page
    backToHome: "Back to Home",
    weatherCondition: "Weather Condition",
    temperature: "Temperature (°C)",
    soilType: "Soil Type",
    fieldCondition: "Field Condition",
    getPrediction: "Get Crop Prediction",
    predictionResult: "Prediction Result",
    monthYear: "Month and Year",
    selectMonth: "Select month",
    selectYear: "Select year",
    
    // DetailedPredict page
    detailedTitle: "Detailed Crop Analysis",
    analyzeCrop: "Analyze Crop Suitability",
    suitabilityScore: "Suitability Score",
    expectedYield: "Expected Yield",
    keyConditions: "Key Conditions",
    
    // CropEconomics page
    economicsTitle: "Crop Economics Analysis",
    setupCost: "Setup Cost",
    maintenanceCost: "Maintenance Cost",
    marketPrice: "Market Price",
    timeToHarvest: "Time to Harvest",
    financialAnalysis: "Financial Analysis",
    costs: "Costs",
    revenue: "Revenue",
    totalCost: "Total Cost",
    expectedRevenue: "Expected Revenue",
    expectedProfit: "Expected Profit",
    roiAnalysis: "ROI Analysis",
    months: "months",
    
    // Chatbot translations
    typeMessage: "Type your message...",
    farmingAssistant: "Farming Assistant",
    welcomeMessage: "Hello! I'm your farming assistant. How can I help you today?",
    error: "Error",
    errorMessage: "Failed to generate response. Please try again.",
    weatherAdvice: "For optimal crop growth, monitor local weather forecasts daily. Consider installing a small weather station in your field for precise measurements. Protect crops from extreme weather conditions using appropriate measures like shade nets or windbreakers.",
    pestAdvice: "Regular crop monitoring is essential. Use integrated pest management (IPM) techniques. Consider natural predators and resistant varieties. Only use pesticides as a last resort and follow proper safety guidelines.",
    waterAdvice: "Implement efficient irrigation practices. Use soil moisture sensors to optimize water usage. Consider drip irrigation for water conservation. Water early morning or late evening to minimize evaporation.",
    fertilizerAdvice: "Conduct regular soil tests to determine nutrient needs. Use organic fertilizers when possible. Apply fertilizers in split doses for better absorption. Maintain proper soil pH for optimal nutrient uptake.",
    generalAdvice: "For best results, maintain regular crop monitoring, follow recommended practices, and keep detailed records of your farming activities. Would you like specific advice about weather, pests, irrigation, or fertilizers?"
  },
  hi: {
    // Index page
    title: "फसल पूर्वानुमान प्रणाली",
    subtitle: "अपनी कृषि आवश्यकताओं के लिए डेटा-संचालित निर्णय लें",
    quickPrediction: "त्वरित पूर्वानुमान",
    detailedAnalysis: "विस्तृत विश्लेषण",
    dataDriven: "डेटा-संचालित",
    dataDrivenDesc: "वैज्ञानिक डेटा और विश्लेषण के आधार पर सूचित निर्णय लें",
    comprehensive: "व्यापक",
    comprehensiveDesc: "फसल विकास को प्रभावित करने वाले कई कारकों पर विचार करें",
    easyToUse: "उपयोग में आसान",
    easyToUseDesc: "त्वरित और विस्तृत पूर्वानुमान के लिए सरल इंटरफ़ेस",
    
    // Predict page
    backToHome: "होम पर वापस जाएं",
    weatherCondition: "मौसम की स्थिति",
    temperature: "तापमान (°C)",
    soilType: "मिट्टी का प्रकार",
    fieldCondition: "खेत की स्थिति",
    getPrediction: "फसल पूर्वानुमान प्राप्त करें",
    predictionResult: "पूर्वानुमान परिणाम",
    monthYear: "महीना और वर्ष",
    selectMonth: "महीना चुनें",
    selectYear: "वर्ष चुनें",
    
    // DetailedPredict page
    detailedTitle: "विस्तृत फसल विश्लेषण",
    analyzeCrop: "फसल उपयुक्तता का विश्लेषण करें",
    suitabilityScore: "उपयुक्तता स्कोर",
    expectedYield: "अपेक्षित उपज",
    keyConditions: "प्रमुख स्थितियां",
    
    // CropEconomics page
    economicsTitle: "फसल अर्थशास्त्र विश्लेषण",
    setupCost: "सेटअप लागत",
    maintenanceCost: "रखरखाव लागत",
    marketPrice: "बाजार मूल्य",
    timeToHarvest: "कटाई का समय",
    financialAnalysis: "वित्तीय विश्लेषण",
    costs: "लागत",
    revenue: "राजस्व",
    totalCost: "कुल लागत",
    expectedRevenue: "अपेक्षित राजस्व",
    expectedProfit: "अपेक्षित लाभ",
    roiAnalysis: "आरओआई विश्लेषण",
    months: "महीने",
    
    // Chatbot translations
    typeMessage: "अपना संदेश टाइप करें...",
    farmingAssistant: "कृषि सहायक",
    welcomeMessage: "नमस्ते! मैं आपका कृषि सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
    error: "त्रुटि",
    errorMessage: "प्रतिक्रिया जनरेट करने में विफल। कृपया पुनः प्रयास करें।",
    weatherAdvice: "फसल की इष्टतम वृद्धि के लिए, स्थानीय मौसम की भविष्यवाणी पर दैनिक नज़र रखें। सटीक मापन के लिए अपने खेत में एक छोटा मौसम स्टेशन स्थापित करने पर विचार करें।",
    pestAdvice: "नियमित फसल निगरानी आवश्यक है। एकीकृत कीट प्रबंधन (IPM) तकनीकों का उपयोग करें। प्राकृतिक शिकारियों और प्रतिरोधी किस्मों पर विचार करें।",
    waterAdvice: "कुशल सिंचाई प्रथाओं को लागू करें। पानी के उपयोग को अनुकूलित करने के लिए मिट्टी की नमी सेंसर का उपयोग करें। पानी के संरक्षण के लिए ड्रिप सिंचाई पर विचार करें।",
    fertilizerAdvice: "पोषक तत्वों की आवश्यकता निर्धारित करने के लिए नियमित मिट्टी परीक्षण करें। जब संभव हो जैविक उर्वरकों का उपयोग करें।",
    generalAdvice: "सर्वोत्तम परिणामों के लिए, नियमित फसल निगरानी बनाए रखें। क्या आप मौसम, कीट, सिंचाई या उर्वरकों के बारे में विशिष्ट सलाह चाहेंगे?"
  },
  te: {
    // Index page
    title: "పంట అంచనా వ్యవస్థ",
    subtitle: "మీ వ్యవసాయ అవసరాలకు డేటా ఆధారిత నిర్ణయాలు తీసుకోండి",
    quickPrediction: "త్వరిత అంచనా",
    detailedAnalysis: "వివరణాత్మక విశ్లేషణ",
    dataDriven: "డేటా ఆధారిత",
    dataDrivenDesc: "శాస్త్రీయ డేటా మరియు విశ్లేషణ ఆధారంగా సమాచార నిర్ణయాలు తీసుకోండి",
    comprehensive: "సమగ్రమైన",
    comprehensiveDesc: "పంట పెరుగుదలను ప్రభావితం చేసే అనేక కారకాలను పరిగణించండి",
    easyToUse: "ఉపయోగించడానికి సులభం",
    easyToUseDesc: "త్వరిత మరియు వివరణాత్మక అంచనాల కోసం సరళమైన ఇంటర్ఫేస్",
    
    // Predict page
    backToHome: "హోమ్‌కి తిరిగి వెళ్ళు",
    weatherCondition: "వాతావరణ పరిస్థితి",
    temperature: "ఉష్ణోగ్రత (°C)",
    soilType: "నేల రకం",
    fieldCondition: "పొలం పరిస్థితి",
    getPrediction: "పంట అంచనా పొందండి",
    predictionResult: "అంచనా ఫలితం",
    monthYear: "నెల మరియు సంవత్సరం",
    selectMonth: "నెలను ఎంచుకోండి",
    selectYear: "సంవత్సరాన్ని ఎంచుకోండి",
    
    // DetailedPredict page
    detailedTitle: "వివరణాత్మక పంట విశ్లేషణ",
    analyzeCrop: "పంట అనుకూలత విశ్లేషణ",
    suitabilityScore: "అనుకూలత స్కోరు",
    expectedYield: "ఊహించిన దిగుబడి",
    keyConditions: "ముఖ్య పరిస్థితులు",
    
    // CropEconomics page
    economicsTitle: "పంట ఆర్థిక విశ్లేషణ",
    setupCost: "సెటప్ ఖర్చు",
    maintenanceCost: "నిర్వహణ ఖర్చు",
    marketPrice: "మార్కెట్ ధర",
    timeToHarvest: "పంట కోతకు సమయం",
    financialAnalysis: "ఆర్థిక విశ్లేషణ",
    costs: "ఖర్చులు",
    revenue: "ఆదాయం",
    totalCost: "మొత్తం ఖర్చు",
    expectedRevenue: "అంచనా ఆదాయం",
    expectedProfit: "అంచనా లాభం",
    roiAnalysis: "ROI విశ్లేషణ",
    months: "నెలలు",
    
    // Chatbot translations
    typeMessage: "మీ సందేశాన్ని టైప్ చేయండి...",
    farmingAssistant: "వ్యవసాయ సహాయకుడు",
    welcomeMessage: "నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడిని. నేను మీకు ఎలా సహాయం చేయగలను?",
    error: "లోపం",
    errorMessage: "ప్రతిస్పందనను రూపొందించడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    weatherAdvice: "పంట యొక్క అనుకూల వృద్ధి కోసం, స్థానిక వాతావరణ సూచనలను రోజువారీగా పర్యవేక్షించండి.",
    pestAdvice: "క్రమం తప్పకుండా పంట పర్యవేక్షణ అవసరం. సమగ్ర పురుగు నిర్వహణ (IPM) పద్ధతులను ఉపయోగించండి.",
    waterAdvice: "సమర్థవంతమైన నీటిపారుదల పద్ధతులను అమలు చేయండి. నీటి వినియోగాన్ని అనుకూలీకరించడానికి నేల తేమ సెన్సార్లను ఉపయోగించండి.",
    fertilizerAdvice: "పోషక అవసరాలను నిర్ధారించడానికి క్రమం తప్పకుండా నేల పరీక్షలు నిర్వహించండి.",
    generalAdvice: "ఉత్తమ ఫలితాల కోసం, క్రమం తప్పకుండా పంట పర్యవేక్షణను కొనసాగించండి. మీరు వాతావరణం, పురుగులు, నీటిపారుదల లేదా ఎరువుల గురించి నిర్దిష్ట సలహా కావాలా?"
  },
  ta: {
    // Index page
    title: "பயிர் கணிப்பு அமைப்பு",
    subtitle: "உங்கள் விவசாய தேவைகளுக்கான தரவு சார்ந்த முடிவுகளை எடுக்கவும்",
    quickPrediction: "விரைவான கணிப்பு",
    detailedAnalysis: "விரிவான பகுப்பாய்வு",
    dataDriven: "தரவு சார்ந்த",
    dataDrivenDesc: "அறிவியல் தரவு மற்றும் பகுப்பாய்வின் அடிப்படையில் தகவலறிந்த முடிவுகளை எடுக்கவும்",
    comprehensive: "விரிவான",
    comprehensiveDesc: "பயிர் வளர்ச்சியை பாதிக்கும் பல காரணிகளை கருத்தில் கொள்ளுங்கள்",
    easyToUse: "பயன்படுத்த எளிதானது",
    easyToUseDesc: "விரைவான மற்றும் விரிவான கணிப்புகளுக்கான எளிய இடைமுகம்",
    
    // Predict page
    backToHome: "முகப்புக்குத் திரும்பு",
    weatherCondition: "வானிலை நிலை",
    temperature: "வெப்பநிலை (°C)",
    soilType: "மண் வகை",
    fieldCondition: "வயல் நிலை",
    getPrediction: "பயிர் கணிப்பைப் பெறுக",
    predictionResult: "கணிப்பு முடிவு",
    monthYear: "மாதம் மற்றும் ஆண்டு",
    selectMonth: "மாதத்தைத் தேர்ந்தெடுக்கவும்",
    selectYear: "ஆண்டைத் தேர்ந்தெடுக்கவும்",
    
    // DetailedPredict page
    detailedTitle: "விரிவான பயிர் பகுப்பாய்வு",
    analyzeCrop: "பயிர் பொருத்தத்தை பகுப்பாய்வு செய்க",
    suitabilityScore: "பொருத்த மதிப்பெண்",
    expectedYield: "எதிர்பார்க்கப்படும் மகசூல்",
    keyConditions: "முக்கிய நிலைமைகள்",
    
    // CropEconomics page
    economicsTitle: "பயிர் பொருளாதார பகுப்பாய்வு",
    setupCost: "அமைப்பு செலவு",
    maintenanceCost: "பராமரிப்பு செலவு",
    marketPrice: "சந்தை விலை",
    timeToHarvest: "அறுவடைக்கான காலம்",
    financialAnalysis: "நிதி பகுப்பாய்வு",
    costs: "செலவுகள்",
    revenue: "வருவாய்",
    totalCost: "மொத்த செலவு",
    expectedRevenue: "எதிர்பார்க்கப்படும் வருவாய்",
    expectedProfit: "எதிர்பார்க்கப்படும் லாபம்",
    roiAnalysis: "ROI பகுப்பாய்வு",
    months: "மாதங்கள்",
    
    // Chatbot translations
    typeMessage: "உங்கள் செய்தியை தட்டச்சு செய்யவும்...",
    farmingAssistant: "விவசாய உதவியாளர்",
    welcomeMessage: "வணக்கம்! நான் உங்கள் விவசாய உதவியாளர். நான் எப்படி உதவ முடியும்?",
    error: "பிழை",
    errorMessage: "பதிலை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    weatherAdvice: "பயிர் வளர்ச்சிக்கு உகந்த வானிலை முன்னறிவிப்புகளை தினசரி கண்காணிக்கவும்.",
    pestAdvice: "வழக்கமான பயிர் கண்காணிப்பு அவசியம். ஒருங்கிணைந்த பூச்சி மேலாண்மை (IPM) நுட்பங்களைப் பயன்படுத்தவும்.",
    waterAdvice: "திறமையான நீர்ப்பாசன முறைகளை செயல்படுத்தவும். நீர் பயன்பாட்டை உகந்ததாக்க மண் ஈரப்பத உணர்விகளைப் பயன்படுத்தவும்.",
    fertilizerAdvice: "ஊட்டச்சத்து தேவைகளை தீர்மானிக்க வழக்கமான மண் சோதனைகளை நடத்தவும்.",
    generalAdvice: "சிறந்த முடிவுகளுக்கு, வழக்கமான பயிர் கண்காணிப்பை பராமரிக்கவும். வானிலை, பூச்சிகள், நீர்ப்பாசனம் அல்லது உரங்கள் பற்றிய குறிப்பிட்ட ஆலோசனை வேண்டுமா?"
  }
};

export const getTranslation = (language: SupportedLanguage) => {
  console.log('Getting translation for language:', language);
  return translations[language] || translations.en;
};
