// js/translations.js
const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      beneficiaries: "Beneficiaries",
      medical_network: "Medical Network",
      about: "About Us",
      contact: "Contact Us",
      careers: "Careers",
      find_provider: "Find a Provider",
      resources: "Resources",
      submit_claim: "Submit a Claim"
    },
     footer_nav: {
      Services: "Services",
      QuickLinks: "Home",
      AllRigahtsReserved: "MedSure Medical Services. All rights reserved."
    },
    // Homepage
    home: {
      hero_title: "Your Trusted Healthcare Partner",
      hero_subtitle: "Comprehensive medical services and support for your wellbeing",
      metrics_title: "MedSure in figures",
      carousel: {
        family_coverage: "Comprehensive Family Coverage",
        family_coverage_desc: "Protect your loved ones with our comprehensive insurance plans",
        expert_consultation: "Expert Medical Consultation",
        expert_consultation_desc: "Access to qualified healthcare professionals whenever you need them",
        hospital_network: "Network of Quality Hospitals",
        hospital_network_desc: "Access to top-tier medical facilities across the region",
        medical_tech: "Advanced Medical Technology",
        medical_tech_desc: "Cutting-edge healthcare technology and digital health solutions"
      }
    },
    // Common
    common: {
      read_more: "Read More",
      learn_more: "Learn More",
      get_started: "Get Started",
      contact_us: "Contact Us"
    }
  },
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      beneficiaries: "المستفيدين",
      medical_network: "شبكة مقدمي الخدمة",
      about: "من نحن",
      contact: "اتصل بنا",
      careers: "وظائف",
      find_provider: "بحث عن مقدم خدمه",
      resources: "موارد",
      submit_claim: "تقديم مطالبة"
    },
    footer_nav: {
      Services: "الخدمات",
      QuickLinks: "روابط سريعة",
      AllRigahtsReserved: "ميدشور للخدمات الطبية. جميع الحقوق محفوظة."
    },
    // Homepage
    home: {
      hero_title: "شريككم الموثوق في الرعاية الصحية",
      hero_subtitle: "خدمات طبية شاملة ودعم لرفاهيتكم",
      metrics_title: "ميدشور في أرقام",
      carousel: {
        family_coverage: "تغطية شاملة للعائلة",
        family_coverage_desc: "احمِ أحباءك بخطط تأمين شاملة",
        expert_consultation: "استشارات طبية متخصصة",
        expert_consultation_desc: "تواصل مع أطباء مؤهلين متى احتجت لذلك",
        hospital_network: "شبكة مستشفيات متميزة",
        hospital_network_desc: "وصول إلى منشآت طبية متميزة في جميع أنحاء المنطقة",
        medical_tech: "تكنولوجيا طبية متطورة",
        medical_tech_desc: "حلول رعاية صحية رقمية وتقنيات طبية متقدمة"
      }
    },
    // Common
    common: {
      read_more: "اقرأ المزيد",
      learn_more: "تعرف أكثر",
      get_started: "ابدأ الآن",
      contact_us: "اتصل بنا"
    }
  }
};

function translate(key, lang = 'en') {
  const keys = key.split('.');
  let value = translations[lang] || translations['en'];
  
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  
  return value || key;
}

function updateTranslations(lang) {
  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translate(key, lang);
    
    if (element.tagName === 'INPUT' && element.placeholder) {
      element.placeholder = translation;
    } else if (element.hasAttribute('data-i18n-html')) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });
  
  // Update HTML direction and language
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', lang === 'ar');
}