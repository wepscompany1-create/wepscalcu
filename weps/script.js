/* ================== Initialization ================== */
document.getElementById('yearNow').innerText = new Date().getFullYear();

/* Yemen cities lists */
const northCities = ["صنعاء","ذمار","إب","الحديدة","المحويت","عمران","صعدة","ريمة","البيضاء","حجة","تعز الحوبان","مأرب"];
const southCities = ["عدن","لحج","الضالع","أبين","شبوة","حضرموت","المهرة","تعز المدينة"];

const CITY_DELIVERY_PROFILES = {
  __south: { base: 7.5, perKg: 0.18, perCbm: 32, min: 5, max: 38, businessSurcharge: 3.5 },
  __north: { base: 10.5, perKg: 0.22, perCbm: 38, min: 7, max: 55, businessSurcharge: 5 },
  "صنعاء": { base: 9, perKg: 0.2, perCbm: 35 },
  "عدن": { base: 7, perKg: 0.17, perCbm: 30 },
  "لحج": { base: 8.2, perKg: 0.19, perCbm: 31 },
  "الضالع": { base: 8.8, perKg: 0.2, perCbm: 32 },
  "أبين": { base: 8.5, perKg: 0.19, perCbm: 31 },
  "شبوة": { base: 9.5, perKg: 0.21, perCbm: 34 },
  "حضرموت": { base: 11, perKg: 0.27, perCbm: 42, remoteSurcharge: 4 },
  "المهرة": { base: 12, perKg: 0.3, perCbm: 45, remoteSurcharge: 6 },
  "تعز المدينة": { base: 8.6, perKg: 0.2, perCbm: 32 },
  "تعز الحوبان": { base: 11, perKg: 0.24, perCbm: 36, remoteSurcharge: 3 },
  "إب": { base: 10, perKg: 0.19, perCbm: 33 },
  "الحديدة": { base: 9.8, perKg: 0.22, perCbm: 34 },
  "المحويت": { base: 11.2, perKg: 0.24, perCbm: 36, remoteSurcharge: 3 },
  "عمران": { base: 11.5, perKg: 0.23, perCbm: 35, remoteSurcharge: 2 },
  "صعدة": { base: 12.5, perKg: 0.26, perCbm: 40, remoteSurcharge: 4 },
  "ريمة": { base: 11.4, perKg: 0.23, perCbm: 35, remoteSurcharge: 2 },
  "البيضاء": { base: 11, perKg: 0.23, perCbm: 36 },
  "حجة": { base: 12, perKg: 0.25, perCbm: 38, remoteSurcharge: 3 },
  "مأرب": { base: 12, perKg: 0.24, perCbm: 36 }
};

function calculateDeliveryFeeForCity(city, { chargeableWeight = 0, totalVolumeM3 = 0, customerType = 'individual' } = {}){
  return 0; // Calculations removed
}

const SERVICE_DESCRIPTIONS = {
  wepsExpress: {
    heading: '🚀 لماذا نرشح Weps Express؟',
    bullets: [
      'أولوية في التخليص والمناولة للوصول خلال 7–21 يوم.',
      'متابعة لحظية مع مختص مخصص لحل أي طارئ.',
      'مناسب للشحنات المستعجلة أو المنتجات عالية القيمة.'
    ]
  },
  wepsAir: {
    heading: '✈️ متى تختار Weps Air؟',
    bullets: [
      'تجميع ذكي لتقليل التكلفة على الشحنات المتوسطة.',
      'توازن بين السعر والسرعة مع وقت وصول 40–45 يوم.',
      'مرونة في إضافة خدمات فحص وتصوير قبل الشحن.'
    ]
  },
  wepsSea: {
    heading: '🚢 لماذا Weps Sea اقتصادي؟',
    bullets: [
      'أفضل خيار للكميات الكبيرة أو الميزانية المحدودة.',
      'تكلفة منخفضة مقابل وقت أطول (50–60 يوم).',
      'مناسب للبضائع التي تتحمل التخزين والشحن البحري.'
    ]
  }
};

function renderServiceDescription(serviceKey){
  const info = SERVICE_DESCRIPTIONS[serviceKey];
  if(!info){
    return '';
  }
  const bulletHtml = (info.bullets || []).map(item => `<li>${escapeHtml(item)}</li>`).join('');
  return `<div style="font-weight:700;color:var(--weps-navy);margin-bottom:4px">${escapeHtml(info.heading)}</div><ul style="margin:0;padding-inline-start:22px;line-height:1.7">${bulletHtml}</ul>`;
}

const SERVICE_PRIORITY_DESCRIPTIONS = {
  price: {
    heading: '💸 التركيز على السعر الأقل',
    bullets: [
      'نقارن مسارات الشحن ونختار الخيار الأرخص دون المساس بالأمان.',
      'نقترح التجميع وخطط الدفع التي تقلل المصاريف التشغيلية.',
      'مناسب للشحنات غير المستعجلة أو الميزانيات المحدودة.'
    ]
  },
  speed: {
    heading: '⚡ السرعة هي الأولوية',
    bullets: [
      'نمنح شحنتك أولوية المناولة لتصل في أقصر وقت ممكن.',
      'نوفر متابعة لحظية وخطة طوارئ لأي تأخير محتمل.',
      'مناسب للطلبات العاجلة أو المنتجات الحساسة زمنياً.'
    ]
  },
  comprehensive: {
    heading: '📦 خدمة متكاملة بلا مفاجآت',
    bullets: [
      'نغطي الشحن الدولي، الجمارك، والتوصيل المحلي بفاتورة واحدة.',
      'نحدد كل التكاليف مسبقاً لتضمن رؤية مالية واضحة.',
      'مناسب للشركات التي تحتاج إدارة مالية دقيقة للشحن.'
    ]
  },
  support: {
    heading: '🤝 خدمة عملاء مرافقة',
    bullets: [
      'مدير حساب مخصص يتابع شحنتك ويرد على استفساراتك بسرعة.',
      'تنبيهات فورية وتقارير حالة منتظمة أثناء الرحلة.',
      'مناسب لمن يقدّر التواصل المستمر مع فريق اللوجستيات.'
    ]
  },
  ideal: {
    heading: '⚖️ توازن بين السعر والسرعة',
    bullets: [
      'نختار مسارات ذكية تحقق وفراً مع الحفاظ على زمن وصول جيد.',
      'نمزج بين شحنات سريعة وأخرى مجمعة حسب أولوية كل طرد.',
      'مناسب للتجار الذين يوازنون بين الميزانية والوقت.'
    ]
  },
  all: {
    heading: '🌟 كل المزايا في خطة واحدة',
    bullets: [
      'خدمة شاملة من الاستلام وحتى تسليم عميلك النهائي.',
      'سرعة، تكلفة منافسة، دعم متخصص، وجمارك شفافة.',
      'مناسب لرواد الأعمال الذين يريدون فريق لوجستي كامل دون تعقيد.'
    ]
  }
};

function renderPriorityDescription(priorityKey){
  const info = SERVICE_PRIORITY_DESCRIPTIONS[priorityKey];
  if(!info){
    return '';
  }
  const bulletHtml = (info.bullets || []).map(item => `<li>${escapeHtml(item)}</li>`).join('');
  return `<div style="font-weight:700;color:var(--weps-navy);margin-bottom:4px">${escapeHtml(info.heading)}</div><ul style="margin:0;padding-inline-start:22px;line-height:1.7">${bulletHtml}</ul>`;
}

/* ====== CUSTOMER TYPE LABELS ====== */
const CUSTOMER_TYPE_LABELS = {
  'individual': 'فرد',
  'industrial_company': 'شركة صناعية / مصنع',
  'spare_parts_supplier': 'مورد قطع غيار صناعية',
  'large_importer': 'مستورد كبير',
  'commercial': 'شركة تجارية',
  'logistics_company': 'شركة شحن / Logistics Company',
  'international_supplier': 'مورد دولي',
  'ecommerce_owner': 'صاحب متجر إلكتروني كبير / eCommerce',
  'wholesaler': 'تاجر جملة',
  'startup_entrepreneur': 'رائد أعمال / Start-up',
  'small_business_owner': 'تاجر ناشئ / Small Business Owner',
  'small_importer': 'مستورد صغير',
  'local_supplier': 'مورد محلي',
  'shipping_agent': 'مكتب شحن وسيط',
  'tech_company': 'شركة تقنية / ستارت أب',
  'government_entity': 'مؤسسة حكومية',
  'non_profit': 'منظمة غير ربحية',
  // Backward compatibility
  'trader': 'تاجر',
  'industrial': 'شركة صناعية',
  'company': 'شركة'
};

function getCustomerTypeLabel(customerType){
  if(!customerType) return '---';
  return CUSTOMER_TYPE_LABELS[customerType] || customerType;
}

// الأنواع التي لا تحتاج اسم شركة
const CUSTOMER_TYPES_WITHOUT_COMPANY = ['individual', 'small_business_owner', 'small_importer', 'local_supplier'];

function requiresCompanyName(customerType){
  return customerType && !CUSTOMER_TYPES_WITHOUT_COMPANY.includes(customerType);
}

/* ====== MAPBOX CONFIG ====== */
mapboxgl.accessToken = "pk.eyJ1Ijoid2Vwc3BsYXRmb3JtIiwiYSI6ImNtaGhkanRoOTBsbGQyeHNjcjFneWI4ZnAifQ.-0q4O_jD7nObWlel7EzPog";

/* ===== MONDAY AUTH (embedded per your request) ===== */
const DEFAULT_MONDAY_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQwMjQ2ODYyMSwiYWFpIjoxMSwidWlkIjoyMDgwODY1NiwiaWFkIjoiMjAyNC0wOC0yN1QxMjo0Mzo1Mi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODQ1ODk5OSwicmduIjoidXNlMSJ9.GKFb4cvL_1PrTO2Eqt576MuE3ejW4RWJk6L_bxzj4FY";
const MONDAY_CACHE_KEY = 'wepsMondayCacheV1';
const MONDAY_CACHE_TTL = 1000 * 60 * 60 * 12; // 12 hours

/* Boards & Columns */
const BOARD_PRODUCT_PRICING   = 7406443393; // الأصناف
const BOARD_RATES_BY_COUNTRY  = 9888783889; // أسعار الكيلو / دولة

function getMondayToken(){
  try{
    if(typeof localStorage !== 'undefined'){
      const stored = localStorage.getItem('wepsMondayToken');
      if(stored && stored.trim()){
        return stored.trim();
      }
    }
  }catch(err){
    console.warn('Monday token storage unavailable:', err);
  }
  return DEFAULT_MONDAY_TOKEN || '';
}

function setMondayToken(token){
  try{
    if(typeof localStorage !== 'undefined' && token){
      localStorage.setItem('wepsMondayToken', token.trim());
    }
  }catch(err){
    console.warn('Failed to persist Monday token:', err);
  }
}

function saveMondayCache(countries = [], products = []){
  try{
    if(typeof localStorage === 'undefined') return;
    const payload = {
      timestamp: Date.now(),
      countries,
      products
    };
    localStorage.setItem(MONDAY_CACHE_KEY, JSON.stringify(payload));
  }catch(err){
    console.warn('Failed to cache Monday data:', err);
  }
}

function loadMondayCache(){
  if(typeof localStorage === 'undefined') return null;
  try{
    const raw = localStorage.getItem(MONDAY_CACHE_KEY);
    if(!raw){
      return null;
    }
    const parsed = JSON.parse(raw);
    if(!parsed || !Array.isArray(parsed.countries) || !Array.isArray(parsed.products)){
      return null;
    }
    if(parsed.timestamp && (Date.now() - parsed.timestamp) > MONDAY_CACHE_TTL){
      return null;
    }
    return parsed;
  }catch(err){
    console.warn('Failed to read Monday cache:', err);
    return null;
  }
}

function describeCacheAge(timestamp){
  if(!timestamp){
    return '';
  }
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.round(diffMs / 60000);
  if(diffMinutes < 1) return 'قبل لحظات';
  if(diffMinutes < 60) return `قبل ${diffMinutes} دقيقة`;
  const diffHours = Math.round(diffMinutes / 60);
  if(diffHours < 24) return `قبل ${diffHours} ساعة`;
  const diffDays = Math.round(diffHours / 24);
  return `قبل ${diffDays} يوم`;
}

function hydrateMondayDropdowns(countries = [], products = [], options = {}){
  const { fromCache = false, badgeOverrideText = null, badgeTitle = null } = options;
  const originSelect = document.getElementById("originCountry");
  const quickSelect  = document.getElementById("quickOrigin");
  const productSel   = document.getElementById("productType");
  if(originSelect){
    originSelect.innerHTML = "";
    countries.forEach(c=>{
      if(c && c.country){
        originSelect.insertAdjacentHTML('beforeend', `<option>${c.country}</option>`);
      }
    });
  }
  if(quickSelect){
    quickSelect.innerHTML = "";
    countries.forEach(c=>{
      if(c && c.country){
        quickSelect.insertAdjacentHTML('beforeend', `<option>${c.country}</option>`);
      }
    });
  }
  const uniqProducts = [...new Set(products.map(p=>p?.product).filter(Boolean))];
  if(productSel){
    productSel.innerHTML = "";
    uniqProducts.forEach(p=> productSel.insertAdjacentHTML('beforeend', `<option>${p}</option>`));
  }

  window.__WEPS_COUNTRIES = countries;
  window.__WEPS_PRODUCTS  = products;

  const badge = document.getElementById("mondayStatusBadge");
  if(badge){
    badge.style.display = 'inline-block';
    const text = badgeOverrideText || (fromCache
      ? `Monday ⚠︎ (Cache: ${countries.length}/${uniqProducts.length})`
      : `Monday ✓ (Countries: ${countries.length}, Products: ${uniqProducts.length})`);
    badge.textContent = text;
    if(badgeTitle){
      badge.title = badgeTitle;
    }else{
      badge.title = fromCache ? 'تم التحميل من النسخة المخزنة مؤقتاً' : 'تم التحديث مباشرة من Monday';
    }
  }

  if(typeof inferProductTypeFromProducts === 'function' && typeof parsedDataCache !== 'undefined' && parsedDataCache?.products?.length){
    inferProductTypeFromProducts(parsedDataCache.products);
  }
  if(typeof pendingProductDescriptionForAutoSelect !== 'undefined' && pendingProductDescriptionForAutoSelect && typeof autoSelectProductTypeFromDescription === 'function'){
    autoSelectProductTypeFromDescription(pendingProductDescriptionForAutoSelect);
  }
}

/* Product columns */
const COL_PRODUCT_TYPE = "text_mkwdfwyy";   // تصنيف البضاعة
const COL_TARIFF_SOUTH = "numeric_mkwbvqc1";
const COL_TARIFF_NORTH = "numeric_mkwyy2fn";
const COL_MKT_NORTH    = "numeric_mkwx5brz";
const COL_MKT_SOUTH    = "numeric_mkwy5dyd";
const COL_EQ_SOUTH     = "numeric_mkwyj909";
const COL_EQ_NORTH     = "numeric_mkwyf89f";
const COL_FX_SN        = "numeric_mkwyfv85"; // (مخزن لو كان موجود)

/* Country columns */
const COL_COUNTRY_NAME = "text_mkwqvjmg";
const COL_KG_RATE      = "numeric_mkv5cjz4";

/* FX market */
const FX_SOUTH_MARKET = 1600;
const FX_NORTH_MARKET = 530;
const EQ_FX_SOUTH = 750;
const EQ_FX_NORTH = 534;

/* ===== WEPS1 PRICING SYSTEM - Products & Services Configuration ===== */

// Products Constants
const PRODUCTS = {
    CLOTHES: "clothes",
    HOME_APPLIANCES: "home_appliances",
    COMPUTERS_ELECTRONICS: "computers_electronics",
    ELECTRONIC_COMPONENTS: "electronic_components",
    OPTICAL_CAMERAS: "optical_cameras",
    FABRICS: "fabrics",
    SHOES: "shoes",
    ACCESSORIES: "accessories",
    HOME_TEXTILES: "home_textiles",
    PRODUCTION_SPARES: "production_spares",
    CAR_SPARES: "car_spares",
    INDUSTRIAL_TOOLS: "industrial_tools",
    HOSPITAL_EQUIPMENT: "hospital_equipment",
    PPE: "ppe",
    DENTAL_TOOLS: "dental_tools",
    DENTAL_EQUIPMENT: "dental_equipment",
    CLINIC_CONSUMABLES: "clinic_consumables",
    DENTAL_RESTO_MATERIALS: "dental_resto_materials",
    MEDICAL_EQUIPMENT: "medical_equipment",
    PAINTS: "paints",
};

const productsConfig = {
    [PRODUCTS.CLOTHES]: {
        nameAr: "الملابس",
        productMultiplier: 1.00,
        profitMarginPerKg: 2.5,
    },
    [PRODUCTS.HOME_APPLIANCES]: {
        nameAr: "الأجهزة المنزلية",
        productMultiplier: 1.05,
        profitMarginPerKg: 2.5,
    },
    [PRODUCTS.COMPUTERS_ELECTRONICS]: {
        nameAr: "أجهزة الكمبيوتر والإلكترونيات",
        productMultiplier: 1.30,
        profitMarginPerKg: 3.0,
    },
    [PRODUCTS.ELECTRONIC_COMPONENTS]: {
        nameAr: "المكونات الإلكترونية",
        productMultiplier: 1.25,
        profitMarginPerKg: 3.0,
    },
    [PRODUCTS.OPTICAL_CAMERAS]: {
        nameAr: "الأجهزة البصرية والكاميرات",
        productMultiplier: 1.40,
        profitMarginPerKg: 3.0,
    },
    [PRODUCTS.FABRICS]: {
        nameAr: "الأقمشة والمنسوجات",
        productMultiplier: 0.95,
        profitMarginPerKg: 2.5,
    },
    [PRODUCTS.SHOES]: {
        nameAr: "الأحذية",
        productMultiplier: 1.05,
        profitMarginPerKg: 2.5,
    },
    [PRODUCTS.ACCESSORIES]: {
        nameAr: "الإكسسوارات",
        productMultiplier: 1.20,
        profitMarginPerKg: 3.5,
    },
    [PRODUCTS.HOME_TEXTILES]: {
        nameAr: "المنسوجات المنزلية",
        productMultiplier: 0.95,
        profitMarginPerKg: 2.5,
    },
    [PRODUCTS.PRODUCTION_SPARES]: {
        nameAr: "قطع غيار خطوط الإنتاج",
        productMultiplier: 1.40,
        profitMarginPerKg: 3.0,
    },
    [PRODUCTS.CAR_SPARES]: {
        nameAr: "قطع غيار السيارات",
        productMultiplier: 1.20,
        profitMarginPerKg: 3.0,
    },
    [PRODUCTS.INDUSTRIAL_TOOLS]: {
        nameAr: "الأدوات والملحقات الصناعية",
        productMultiplier: 1.15,
        profitMarginPerKg: 3.0,
    },
    [PRODUCTS.HOSPITAL_EQUIPMENT]: {
        nameAr: "معدات المستشفيات",
        productMultiplier: 1.80,
        profitMarginPerKg: 3.5,
    },
    [PRODUCTS.PPE]: {
        nameAr: "معدات الحماية الشخصية",
        productMultiplier: 1.10,
        profitMarginPerKg: 3.5,
    },
    [PRODUCTS.DENTAL_TOOLS]: {
        nameAr: "أدوات الأسنان",
        productMultiplier: 1.70,
        profitMarginPerKg: 3.0,
    },
    [PRODUCTS.DENTAL_EQUIPMENT]: {
        nameAr: "معدات عيادات الأسنان",
        productMultiplier: 1.80,
        profitMarginPerKg: 3.5,
    },
    [PRODUCTS.CLINIC_CONSUMABLES]: {
        nameAr: "مواد استهلاكية للعيادات",
        productMultiplier: 1.30,
        profitMarginPerKg: 3.5,
    },
    [PRODUCTS.DENTAL_RESTO_MATERIALS]: {
        nameAr: "مواد وتقنيات ترميم الأسنان",
        productMultiplier: 1.90,
        profitMarginPerKg: 3.5,
    },
    [PRODUCTS.MEDICAL_EQUIPMENT]: {
        nameAr: "المعدات والملحقات الطبية",
        productMultiplier: 1.80,
        profitMarginPerKg: 3.5,
    },
    [PRODUCTS.PAINTS]: {
        nameAr: "الدهانات والأصباغ",
        productMultiplier: 1.10,
        profitMarginPerKg: 2.5,
    },
};

// Services Constants
const SERVICES = {
    EXPRESS_YEMEN: "express_yemen",
    AIR_ECO_UAE_OMAN_TRUCK_YEMEN: "air_eco_uae_oman_truck_yemen",
    AIR_ADEN_VIA_EG_JO: "air_aden_via_eg_jo",
    SEA_KG_VIA_UAE_TRUCK_YEMEN: "sea_kg_via_uae_truck_yemen",
    SEA_CBM_VIA_UAE_TRUCK_YEMEN: "sea_cbm_via_uae_truck_yemen",
    SEA_CBM_DIRECT_ADEN_MUKALLA: "sea_cbm_direct_aden_mukalla",
};

const routeMultipliers = {
    [SERVICES.EXPRESS_YEMEN]: 1.00,
    [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: 0.75,
    [SERVICES.AIR_ADEN_VIA_EG_JO]: 1.10,
    [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: 0.40,
    [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: 0.30,
    [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: 0.28,
};

// Weight Multipliers Functions
function dynamicAirWeightMultiplier(weightKg) {
    if (weightKg <= 5)  return 1.35;
    if (weightKg <= 10) return 1.25;
    if (weightKg <= 20) return 1.15;
    if (weightKg <= 40) return 1.00; 
    if (weightKg <= 100) return 0.92;
    if (weightKg <= 300) return 0.88;
    return 0.85;
}

function dynamicSeaWeightMultiplier(weightKg) {
    if (weightKg <= 50)   return 1.05;
    if (weightKg <= 200)  return 1.00;
    if (weightKg <= 1000) return 0.97;
    return 0.95;
}

function getWeightMultiplierForService(serviceCode, weightKg) {
    switch (serviceCode) {
        case SERVICES.EXPRESS_YEMEN:
        case SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN:
        case SERVICES.AIR_ADEN_VIA_EG_JO:
            return dynamicAirWeightMultiplier(weightKg);

        case SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN:
        case SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN:
        case SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA:
            return dynamicSeaWeightMultiplier(weightKg);

        default:
            return 1;
    }
}

// Map product names from Monday to product codes
function mapProductNameToCode(productNameAr) {
    if (!productNameAr) return null;
    
    const normalized = productNameAr.trim();
    
    // Direct mapping from Arabic names to product codes
    const mapping = {
        "الملابس": PRODUCTS.CLOTHES,
        "الأجهزة المنزلية": PRODUCTS.HOME_APPLIANCES,
        "أجهزة الكمبيوتر والإلكترونيات": PRODUCTS.COMPUTERS_ELECTRONICS,
        "المكونات الإلكترونية": PRODUCTS.ELECTRONIC_COMPONENTS,
        "الأجهزة البصرية والكاميرات": PRODUCTS.OPTICAL_CAMERAS,
        "الأقمشة والمنسوجات": PRODUCTS.FABRICS,
        "الأحذية": PRODUCTS.SHOES,
        "الإكسسوارات": PRODUCTS.ACCESSORIES,
        "المنسوجات المنزلية": PRODUCTS.HOME_TEXTILES,
        "قطع غيار خطوط الإنتاج": PRODUCTS.PRODUCTION_SPARES,
        "قطع غيار السيارات": PRODUCTS.CAR_SPARES,
        "الأدوات والملحقات الصناعية": PRODUCTS.INDUSTRIAL_TOOLS,
        "معدات المستشفيات": PRODUCTS.HOSPITAL_EQUIPMENT,
        "معدات الحماية الشخصية": PRODUCTS.PPE,
        "أدوات الأسنان": PRODUCTS.DENTAL_TOOLS,
        "معدات عيادات الأسنان": PRODUCTS.DENTAL_EQUIPMENT,
        "مواد استهلاكية للعيادات": PRODUCTS.CLINIC_CONSUMABLES,
        "مواد وتقنيات ترميم الأسنان": PRODUCTS.DENTAL_RESTO_MATERIALS,
        "المعدات والملحقات الطبية": PRODUCTS.MEDICAL_EQUIPMENT,
        "الدهانات والأصباغ": PRODUCTS.PAINTS,
    };
    
    return mapping[normalized] || null;
}

/* ===== PRICING ENGINE ===== */

// Get base rate per kg for a specific product and service
function getProductBaseRatePerKg(productCode, serviceCode, clothesBaseRates, applyRouteMultiplier = false) {
    const clothesBaseRate = clothesBaseRates[serviceCode];

    if (clothesBaseRate == null) {
        console.warn("⚠️ No baseRate for service:", serviceCode);
        return null;
    }

    const productCfg = productsConfig[productCode];
    if (!productCfg) {
        console.warn("Unknown product code:", productCode);
        return null;
    }

    let rate = clothesBaseRate * productCfg.productMultiplier;

    if (applyRouteMultiplier) {
        const routeMult = routeMultipliers[serviceCode] || 1;
        rate *= routeMult;
    }

    return rate;
}

// Calculate shipment price for a specific service
function calculateShipmentPrice({
    productCode,
    serviceCode,
    weightKg,
    clothesBaseRates,
    options = {
        useRouteMultiplier: true,
        includeProfit: true,
    }
}) {
    const baseRatePerKg = getProductBaseRatePerKg(productCode, serviceCode, clothesBaseRates, options.useRouteMultiplier);

    if (!baseRatePerKg) return null;

    const weightMult = getWeightMultiplierForService(serviceCode, weightKg);
    let pricePerKg = baseRatePerKg * weightMult;

    if (options.includeProfit) {
        const profit = productsConfig[productCode]?.profitMarginPerKg || 0;
        pricePerKg += profit;
    }

    return Number((pricePerKg * weightKg).toFixed(2));
}

/* ===== INSURANCE SYSTEM ===== */

// Insurance Data Configuration
const INSURANCE_DATA = {
    version: "1.0",
    routeCargoMatrix: [
        { "route": "express_yemen", "cargo_type": "clothes", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "home_appliances", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "computers_electronics", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "electronic_components", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "optical_cameras", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "fabrics", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "shoes", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "accessories", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "home_textiles", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "production_spares", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "car_spares", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "industrial_tools", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "hospital_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "ppe", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "dental_tools", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "dental_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "clinic_consumables", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },
        { "route": "express_yemen", "cargo_type": "dental_resto_materials", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "medical_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_high" },
        { "route": "express_yemen", "cargo_type": "paints", "sum_insured_formula": "COST_PLUS_FREIGHT", "risk_profile": "air_express_standard" },

        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "clothes", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "home_appliances", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "computers_electronics", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "electronic_components", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "optical_cameras", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "fabrics", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "shoes", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "accessories", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "home_textiles", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "production_spares", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "car_spares", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "industrial_tools", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "hospital_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "ppe", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "dental_tools", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "dental_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "clinic_consumables", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "dental_resto_materials", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "medical_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_high" },
        { "route": "air_eco_uae_oman_truck_yemen", "cargo_type": "paints", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_eco_standard" },

        { "route": "air_aden_via_eg_jo", "cargo_type": "clothes", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "home_appliances", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "computers_electronics", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "electronic_components", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "optical_cameras", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "fabrics", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "shoes", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "accessories", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "home_textiles", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "production_spares", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "car_spares", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "industrial_tools", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "hospital_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "ppe", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "dental_tools", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "dental_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "clinic_consumables", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "dental_resto_materials", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "medical_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_high" },
        { "route": "air_aden_via_eg_jo", "cargo_type": "paints", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "air_aden_transit_standard" },

        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "clothes", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "home_appliances", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "computers_electronics", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "electronic_components", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "optical_cameras", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "fabrics", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "shoes", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "accessories", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "home_textiles", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "production_spares", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "car_spares", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "industrial_tools", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "hospital_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "ppe", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "dental_tools", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "dental_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "clinic_consumables", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "dental_resto_materials", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "medical_equipment", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_high" },
        { "route": "sea_kg_via_uae_truck_yemen", "cargo_type": "paints", "sum_insured_formula": "COST_PLUS_FREIGHT_10", "risk_profile": "sea_indirect_standard" },

        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "clothes", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "home_appliances", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "computers_electronics", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "electronic_components", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "optical_cameras", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "fabrics", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "shoes", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "accessories", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "home_textiles", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "production_spares", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "car_spares", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "industrial_tools", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "hospital_equipment", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "ppe", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "dental_tools", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "dental_equipment", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "clinic_consumables", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "dental_resto_materials", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "medical_equipment", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_high" },
        { "route": "sea_cbm_via_uae_truck_yemen", "cargo_type": "paints", "sum_insured_formula": "CIF_110", "risk_profile": "sea_indirect_standard" },

        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "clothes", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "home_appliances", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "computers_electronics", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "electronic_components", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "optical_cameras", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "fabrics", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "shoes", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "accessories", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "home_textiles", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "production_spares", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "car_spares", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "industrial_tools", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "hospital_equipment", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "ppe", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "dental_tools", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "dental_equipment", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "clinic_consumables", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "dental_resto_materials", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "medical_equipment", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" },
        { "route": "sea_cbm_direct_aden_mukalla", "cargo_type": "paints", "sum_insured_formula": "CIF_110", "risk_profile": "sea_direct_standard" }
    ],
    sumInsuredFormulas: {
        "COST_ONLY": {
            "label": "Invoice value only",
            "formula_description": "sum_insured = cargo_value"
        },
        "COST_PLUS_FREIGHT": {
            "label": "Invoice + Freight",
            "formula_description": "sum_insured = cargo_value + freight_cost"
        },
        "COST_PLUS_FREIGHT_10": {
            "label": "Invoice + Freight + 10%",
            "formula_description": "sum_insured = (cargo_value + freight_cost) * 1.10"
        },
        "CIF_110": {
            "label": "CIF + 10%",
            "formula_description": "sum_insured = (cargo_value + freight_cost + other_costs) * 1.10"
        }
    },
    riskProfiles: {
        "air_express_high": {
            "mode": "air",
            "description": "High value / theft-attractive goods shipped via express to Yemen",
            "default_clause": "A",
            "clause_label": "Institute Cargo Clauses (A) - All Risks",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 5000,
                    "rate_percent": 0.65,
                    "min_premium_usd": 25
                },
                {
                    "max_insured_value_usd": 20000,
                    "rate_percent": 0.50,
                    "min_premium_usd": 40
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.42,
                    "min_premium_usd": 70
                }
            ]
        },
        "air_express_standard": {
            "mode": "air",
            "description": "Standard consumer goods via express",
            "default_clause": "B",
            "clause_label": "Institute Cargo Clauses (B)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 5000,
                    "rate_percent": 0.40,
                    "min_premium_usd": 20
                },
                {
                    "max_insured_value_usd": 20000,
                    "rate_percent": 0.32,
                    "min_premium_usd": 35
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.28,
                    "min_premium_usd": 55
                }
            ]
        },
        "air_eco_high": {
            "mode": "air+road",
            "description": "Economy air to UAE/Oman + truck to Yemen – high value cargo",
            "default_clause": "A",
            "clause_label": "Institute Cargo Clauses (A)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 10000,
                    "rate_percent": 0.60,
                    "min_premium_usd": 30
                },
                {
                    "max_insured_value_usd": 40000,
                    "rate_percent": 0.46,
                    "min_premium_usd": 60
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.40,
                    "min_premium_usd": 90
                }
            ]
        },
        "air_eco_standard": {
            "mode": "air+road",
            "description": "Economy air + truck – standard cargo",
            "default_clause": "B",
            "clause_label": "Institute Cargo Clauses (B)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 10000,
                    "rate_percent": 0.38,
                    "min_premium_usd": 25
                },
                {
                    "max_insured_value_usd": 40000,
                    "rate_percent": 0.30,
                    "min_premium_usd": 45
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.26,
                    "min_premium_usd": 70
                }
            ]
        },
        "air_aden_transit_high": {
            "mode": "air",
            "description": "Air to Aden via EG/JO – high value cargo with transit risk",
            "default_clause": "A",
            "clause_label": "Institute Cargo Clauses (A)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 10000,
                    "rate_percent": 0.68,
                    "min_premium_usd": 35
                },
                {
                    "max_insured_value_usd": 40000,
                    "rate_percent": 0.52,
                    "min_premium_usd": 70
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.46,
                    "min_premium_usd": 100
                }
            ]
        },
        "air_aden_transit_standard": {
            "mode": "air",
            "description": "Air to Aden via EG/JO – standard cargo",
            "default_clause": "B",
            "clause_label": "Institute Cargo Clauses (B)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 10000,
                    "rate_percent": 0.42,
                    "min_premium_usd": 30
                },
                {
                    "max_insured_value_usd": 40000,
                    "rate_percent": 0.34,
                    "min_premium_usd": 55
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.30,
                    "min_premium_usd": 80
                }
            ]
        },
        "sea_indirect_high": {
            "mode": "sea+road",
            "description": "Sea via UAE + truck to Yemen – high value cargo",
            "default_clause": "A",
            "clause_label": "Institute Cargo Clauses (A)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 20000,
                    "rate_percent": 0.55,
                    "min_premium_usd": 40
                },
                {
                    "max_insured_value_usd": 80000,
                    "rate_percent": 0.42,
                    "min_premium_usd": 80
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.36,
                    "min_premium_usd": 120
                }
            ]
        },
        "sea_indirect_standard": {
            "mode": "sea+road",
            "description": "Sea via UAE + truck to Yemen – standard cargo",
            "default_clause": "B",
            "clause_label": "Institute Cargo Clauses (B)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 20000,
                    "rate_percent": 0.36,
                    "min_premium_usd": 35
                },
                {
                    "max_insured_value_usd": 80000,
                    "rate_percent": 0.30,
                    "min_premium_usd": 70
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.25,
                    "min_premium_usd": 100
                }
            ]
        },
        "sea_direct_standard": {
            "mode": "sea",
            "description": "Direct sea LCL/CBM to Aden/Mukalla – standard cargo",
            "default_clause": "C",
            "clause_label": "Institute Cargo Clauses (C)",
            "pricing_by_insured_value": [
                {
                    "max_insured_value_usd": 20000,
                    "rate_percent": 0.30,
                    "min_premium_usd": 30
                },
                {
                    "max_insured_value_usd": 80000,
                    "rate_percent": 0.24,
                    "min_premium_usd": 60
                },
                {
                    "max_insured_value_usd": null,
                    "rate_percent": 0.20,
                    "min_premium_usd": 90
                }
            ]
        }
    }
};

/* ===== CUSTOMS SYSTEM ===== */
const CUSTOMS_DATA = {
    version: "1.0",
    default_rate_percent: 9,
    default_min_usd: 25,
    inspection_fee_usd: 35,
    categories: {
        standard: { id: "standard", label: "بضائع استهلاكية ونسيجية", base_rate_percent: 8, min_customs_usd: 25 },
        tech_sensitive: { id: "tech_sensitive", label: "إلكترونيات وقيمة عالية", base_rate_percent: 11.5, min_customs_usd: 40 },
        medical: { id: "medical", label: "مواد ومعدات طبية", base_rate_percent: 6.5, min_customs_usd: 35 },
        automotive: { id: "automotive", label: "قطع غيار سيارات", base_rate_percent: 10, min_customs_usd: 38 },
        industrial: { id: "industrial", label: "معدات صناعية ومواد كيميائية", base_rate_percent: 9, min_customs_usd: 32 }
    },
    cargoCategoryMap: {
        clothes: "standard",
        home_appliances: "standard",
        computers_electronics: "tech_sensitive",
        electronic_components: "tech_sensitive",
        optical_cameras: "tech_sensitive",
        fabrics: "standard",
        shoes: "standard",
        accessories: "standard",
        home_textiles: "standard",
        production_spares: "industrial",
        car_spares: "automotive",
        industrial_tools: "industrial",
        hospital_equipment: "medical",
        ppe: "medical",
        dental_tools: "medical",
        dental_equipment: "medical",
        clinic_consumables: "medical",
        dental_resto_materials: "medical",
        medical_equipment: "medical",
        paints: "industrial"
    },
    routeAdjustments: {
        express_yemen: { delta_percent: 1.5, remark: "مسار سريع - أولوية تخليص" },
        air_eco_uae_oman_truck_yemen: { delta_percent: 0.5, remark: "فحص إضافي لمسار جو/بري" },
        air_aden_via_eg_jo: { delta_percent: 0.75, remark: "عبور عبر مصر/الأردن" },
        sea_kg_via_uae_truck_yemen: { delta_percent: -0.5, remark: "إعفاء شحن بحري بالجملة" },
        sea_cbm_via_uae_truck_yemen: { delta_percent: -0.75, remark: "تخفيض مسار LCL عبر الإمارات" },
        sea_cbm_direct_aden_mukalla: { delta_percent: -1, remark: "حافز التوصيل المباشر لموانئ عدن/المكلا" }
    }
};

function roundCurrency(value){
    const num = Number(value || 0);
    if(!isFinite(num)) return 0;
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateCustomsDuties({
    route,
    cargo_type,
    cargo_value_usd,
    freight_cost_usd = 0,
    apply_inspection_fee = true
}){
    try {
        if(!CUSTOMS_DATA) throw new Error("بيانات الجمارك غير متوفرة");
        const cargoValue = Number(cargo_value_usd);
        if(isNaN(cargoValue) || cargoValue < 0) throw new Error("قيمة البضاعة للجمارك غير صالحة");
        const freight = Number(freight_cost_usd || 0);
        const dutiable = roundCurrency(Math.max(0, cargoValue + freight));

        const categoryKey = CUSTOMS_DATA.cargoCategoryMap[cargo_type] || "standard";
        const category = CUSTOMS_DATA.categories[categoryKey] || CUSTOMS_DATA.categories.standard;
        const baseRate = category?.base_rate_percent ?? CUSTOMS_DATA.default_rate_percent;
        const baseMin = category?.min_customs_usd ?? CUSTOMS_DATA.default_min_usd;

        const routeAdj = CUSTOMS_DATA.routeAdjustments[route] || {};
        const routeDelta = routeAdj.delta_percent || 0;
        const finalRate = roundCurrency(Math.max(0, baseRate + routeDelta));

        const customsBeforeMin = roundCurrency((dutiable * finalRate) / 100);
        const minWithTopup = roundCurrency(baseMin + (routeAdj.min_topup_usd || 0));
        const dutyUSD = Math.max(customsBeforeMin, minWithTopup);

        const inspectionFee = apply_inspection_fee === false ? 0 : (CUSTOMS_DATA.inspection_fee_usd || 0);
        const totalCustoms = roundCurrency(dutyUSD + inspectionFee);

        const notes = [];
        if(routeAdj.remark) notes.push(routeAdj.remark);
        if(inspectionFee > 0) notes.push("يشمل رسوم تفتيش");

        return {
            success: true,
            input: {
                route,
                cargo_type,
                cargo_value_usd: cargoValue,
                freight_cost_usd: freight,
                dutiable_value_usd: dutiable
            },
            calculation: {
                category_id: categoryKey,
                category_label: category?.label || "افتراضي",
                base_rate_percent: baseRate,
                route_adjustment_percent: routeDelta,
                final_rate_percent: finalRate,
                customs_before_min_usd: customsBeforeMin,
                min_customs_usd: minWithTopup,
                applied_minimum: dutyUSD > customsBeforeMin,
                duty_usd: roundCurrency(dutyUSD),
                inspection_fee_usd: inspectionFee,
                total_customs_usd: totalCustoms,
                notes
            }
        };
    } catch (err) {
        return { success: false, error: err?.message || String(err) };
    }
}

// Calculate Insurance Premium
function calculateInsurancePremium({
    route,
    cargo_type,
    cargo_value,
    freight_cost = 0,
    other_costs = 0
}) {
    try {
        const data = INSURANCE_DATA;

        // 1) Find the matrix entry
        const match = data.routeCargoMatrix.find(
            (item) => item.route === route && item.cargo_type === cargo_type
        );
        if (!match) throw new Error("Route × Cargo Type not found in matrix");

        const riskProfileKey = match.risk_profile;
        const riskProfile = data.riskProfiles[riskProfileKey];
        if (!riskProfile) throw new Error("Risk profile not found");

        const formulaKey = match.sum_insured_formula;
        const formula = data.sumInsuredFormulas[formulaKey];
        if (!formula) throw new Error("Sum insured formula not found");

        // 2) Calculate sum_insured based on formula
        let sum_insured;

        switch (formulaKey) {
            case "COST_ONLY":
                sum_insured = cargo_value;
                break;

            case "COST_PLUS_FREIGHT":
                sum_insured = cargo_value + freight_cost;
                break;

            case "COST_PLUS_FREIGHT_10":
                sum_insured = (cargo_value + freight_cost) * 1.10;
                break;

            case "CIF_110":
                sum_insured = (cargo_value + freight_cost + other_costs) * 1.10;
                break;

            default:
                throw new Error("Unknown sum insured formula");
        }

        // 3) Select pricing tier from riskProfile
        const tier = riskProfile.pricing_by_insured_value.find(
            (t) => !t.max_insured_value_usd || sum_insured <= t.max_insured_value_usd
        );

        if (!tier) throw new Error("No pricing tier matched");

        const rate_percent = tier.rate_percent;
        const min_premium = tier.min_premium_usd;

        // 4) Calculate raw premium
        let raw_premium = sum_insured * (rate_percent / 100);

        // 5) Apply minimum
        let final_premium = Math.max(raw_premium, min_premium);

        // 6) Determine coverage type
        const insurance_clause = riskProfile.default_clause;

        // 7) Return result
        return {
            success: true,

            input: {
                route,
                cargo_type,
                cargo_value,
                freight_cost,
                other_costs
            },

            calculation: {
                formula_used: formulaKey,
                sum_insured,
                rate_percent,
                min_premium,
                raw_premium,
                insurance_clause,
                final_premium
            }
        };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// Calculate prices for all 6 services
function calculateAllServices({
    productCode,
    weightKg,
    cargoValue,
    clothesBaseRates,
    options = {
        useRouteMultiplier: true,
        includeProfit: true,
        includeInsurance: true
    }
}) {
    const results = {};
    
    // Define all 6 services
    const allServices = [
        SERVICES.EXPRESS_YEMEN,
        SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN,
        SERVICES.AIR_ADEN_VIA_EG_JO,
        SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN,
        SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN,
        SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA
    ];
    
    // Calculate for each service
    allServices.forEach(serviceCode => {
        const shippingPrice = calculateShipmentPrice({
            productCode,
            serviceCode,
            weightKg,
            clothesBaseRates,
            options: {
                useRouteMultiplier: options.useRouteMultiplier,
                includeProfit: options.includeProfit
            }
        });
        
        if (shippingPrice === null) {
            results[serviceCode] = null;
            return;
        }
        
        let insuranceResult = null;
        let customsResult = null;
        let totalPrice = shippingPrice;
        let customsUSD = 0;
        let insuranceUSD = 0;
        
        // Calculate insurance if enabled
        if (options.includeInsurance && cargoValue > 0) {
            insuranceResult = calculateInsurancePremium({
                route: serviceCode,
                cargo_type: productCode,
                cargo_value: cargoValue,
                freight_cost: shippingPrice,
                other_costs: 0
            });
            
            if (insuranceResult.success) {
                insuranceUSD = insuranceResult.calculation.final_premium;
                totalPrice += insuranceUSD;
            }
        }

        // Calculate customs duties
        if (cargoValue > 0) {
            customsResult = calculateCustomsDuties({
                route: serviceCode,
                cargo_type: productCode,
                cargo_value_usd: cargoValue,
                freight_cost_usd: shippingPrice,
                apply_inspection_fee: true
            });

            if (customsResult && customsResult.success) {
                customsUSD = customsResult.calculation.total_customs_usd;
                totalPrice += customsUSD;
            }
        }
        
        results[serviceCode] = {
            shippingPrice,
            insurance: insuranceResult,
            customs: customsResult,
            breakdown: {
                shipping_usd: shippingPrice,
                insurance_usd: insuranceUSD,
                customs_usd: customsUSD,
                total_usd: totalPrice
            },
            totalPrice,
            serviceCode,
            productCode,
            weightKg
        };
    });
    
    return results;
}

/* ====== Warehouse + Map Helpers ====== */
const WAREHOUSES = {
  shopAndShip: [
    { name:'WEPS Warehouse - Dubai', country:'AE', lat:25.248665, lng:55.366002, address:'Aramex Building, 184 Airport Road, Umm Ramool, Dubai, United Arab Emirates', dxbNumber:'DXB 1702964', phone:'971502087595' },
    { name:'WEPS Warehouse - New Delhi', country:'IN', lat:28.6289, lng:77.2160, address:'Office no 116, Near Pvr Rivoli, Baba Khadak Singh Marg, Connaught Place, New Delhi 110001', dxbNumber:'DXB 1702964', contactName:'Rishab' },
    { name:'Aramex India - Mumbai', country:'IN', lat:19.1136, lng:72.8697, address:'Plot No. B-4, Cross Road B, Marol MIDC, Andheri (E), Mumbai, Maharashtra 400093', dxbNumber:'DXB 1702964', phone:'0091-22-64803300' },
    { name:'WEPS Warehouse - Istanbul (Esenyurt)', country:'TR', lat:41.0293, lng:28.6742, address:'KOZA MAH. 1655 SOK. NO 5. B BLOK. KAT 6. DAIRE NO: 26 ESENYURT, Istanbul', dxbNumber:'DXB 1702964' },
    { name:'Aramex International - Istanbul (Bagcilar)', country:'TR', lat:41.027260, lng:28.816620, address:'15 Temmuz Mahallesi, Gülbahar Caddesi No: 19/3 B-C-D Blok Bagcilar, Istanbul 34212', dxbNumber:'DXB 1702964', phone:'00905414943646' },
    { name:'AIC - Chullora', country:'AU', lat:-33.8877, lng:151.0488, address:'56a Anzac St, Chullora, NSW 2190, Australia', dxbNumber:'DXB 1702964', phone:'00612 9714 5866' },
    { name:'Aramex - Dhaka', country:'BD', lat:23.8728, lng:90.3984, address:'House-13, Road-7, Sector-1, Uttara, Dhaka 1230, Bangladesh', dxbNumber:'DXB 1702964', phone:'8801942995522' },
    { name:'Aramex - Sofia', country:'BG', lat:42.6554, lng:23.3788, address:'3, Capitan Dimitar Spisarevsky street, Sofia 1592, Bulgaria', dxbNumber:'DXB 1702964', phone:'35970018686' },
    { name:'Aramex - Mississauga', country:'CA', lat:43.6844, lng:-79.7119, address:'5810 Ambler Drive, Unit 14, Mississauga, Ontario L4W4J5, Canada', dxbNumber:'DXB 1702964', phone:'001 (905) 238-0440' },
    { name:'Aramex - Limassol', country:'CY', lat:34.7019, lng:33.0225, address:'Leoforos Spyrou Kyprianou NO.17, Limassol, Mesa Geitonia 4001, Cyprus', dxbNumber:'DXB 1702964', phone:'00357-25747708' },
    { name:'ARAMEX CZ - Tuchomerice', country:'CZ', lat:50.1405, lng:14.2358, address:'Ke Kopanine 577, Tuchomerice 25267, Czech Republic', dxbNumber:'DXB 1702964', phone:'00420 226 809 515' },
    { name:'Aramex - Cairo', country:'EG', lat:30.071050, lng:31.442350, address:'SNS 4,5 KM From Cairo-Suez Road, Cairo, Egypt', dxbNumber:'DXB 1702964', phone:'20233388466' },
    { name:'GL-NET - Roissy-en-France', country:'FR', lat:49.006950, lng:2.523320, address:'7 Rue du Meunier (SNS), Roissy-en-France 95700, France', dxbNumber:'DXB 1702964', phone:'33483530888' },
    { name:'Aramex - Tbilisi', country:'GE', lat:41.7151, lng:44.8271, address:'Ketevan Dedofali Ave 59, Tbilisi, Isani 0144, Georgia', dxbNumber:'DXB 1702964', phone:'+995 (32) 2776263' },
    { name:'eCom Postfachservice - Mainz', country:'DE', lat:49.9839, lng:8.2472, address:'Robert Koch Strasse 50, Geb.H, Mainz 55129, Germany', dxbNumber:'DXB 1702964', phone:'06142 - 497 90 90' },
    { name:'Aramex - Jakarta', country:'ID', lat:-6.2088, lng:106.8456, address:'Jl.Penjernihan 1 No.1 Rt.06 Rw.06 Bendungan Hilir kec. Tanah Abang, Jakarta 10210', dxbNumber:'DXB 1702964', phone:'622129603333' },
    { name:'Aramex HK - Tsing Yi', country:'HK', lat:22.341690, lng:114.109497, address:'Unit 2, 1/F, Goodman Interlink, 39 Tsing Yi Road, Tsing Yi 999077, Hong Kong', dxbNumber:'DXB 1702964', phone:'85235567000' },
    { name:'Aramex - Koropi', country:'GR', lat:37.8964, lng:23.8753, address:'L.Varis-Koropiou 137, Koropi, West Attica 19400, Greece', dxbNumber:'DXB 1702964', phone:'0030-2111052540' },
    { name:'Aramex - Accra', country:'GH', lat:5.6037, lng:-0.1670, address:'KIA Village, Aviance, Accra, Ghana', dxbNumber:'DXB 1702964', phone:'233308251066' },
    { name:'Aramex - Ardiya', country:'KW', lat:29.2925, lng:47.9244, address:'Ardiya Industrial, Block 1, Aramex Head Office, Farwaniya 92400, Kuwait', dxbNumber:'DXB 1702964', phone:'+96597481006' },
    { name:'Aramex - Incheon', country:'KR', lat:37.4775, lng:126.6165, address:'832, Baekbeom-ro, Seo-gu, Incheon 22839, Korea South', dxbNumber:'DXB 1702964', phone:'032-575-0121' },
    { name:'Aramex - Nairobi', country:'KE', lat:-1.3194, lng:36.8526, address:'Dunga Close, off Dunga Road, Industrial Area, Nairobi 00100, Kenya', dxbNumber:'DXB 1702964', phone:'0800721700' },
    { name:'Aramex - Amman', country:'JO', lat:31.9454, lng:35.9284, address:'Alquds street, Almugablain district, Amman, Jordan', dxbNumber:'DXB 1702964', phone:'96265358855' },
    { name:'AIC X FRONTIER - Tokyo', country:'JP', lat:35.6762, lng:139.8503, address:'WEST 5F, 3-2-9, SHINSUNA, Koto-ku, Tokyo 136-8651, Japan', dxbNumber:'DXB 1702964', phone:'0081 807651 1052' },
    { name:'EuroLanes - Arcene', country:'IT', lat:45.5667, lng:9.6167, address:'via del Gaggiolo, 38, Arcene, Bergamo 24040, Italy', dxbNumber:'DXB 1702964', phone:'0039 035 418 5292' },
    { name:'Aramex Nederland - Eindhoven', country:'NL', lat:51.4416, lng:5.5194, address:'Mispelhoefstraat 33A, Eindhoven 5651 GK, Netherlands', dxbNumber:'DXB 1702964', phone:'0031402618693' },
    { name:'Aramex - Kathmandu', country:'NP', lat:27.7172, lng:85.3240, address:'Madan Bhandari Path, Kathmandu 44600, Nepal', dxbNumber:'DXB 1702964', phone:'9779802357734' },
    { name:'Aramex - Casablanca', country:'MA', lat:33.5731, lng:-7.5898, address:'Boulevard Chefchaouni, Q.I Ain Sebaa, Casablanca 20590, Morocco', dxbNumber:'DXB 1702964', phone:'(21252) 227-1414' },
    { name:'Aramex - Petaling Jaya', country:'MY', lat:3.1390, lng:101.6869, address:'Hedgeford Innovation Park, 12C, Jalan Tandang, Petaling Jaya, Selangor 46050, Malaysia', dxbNumber:'DXB 1702964', phone:'0060376130000' },
    { name:'Glens Malawi - Blantyre', country:'MW', lat:-15.7861, lng:35.0058, address:'Makata Industrial Area - Off Maunde Road, Blantyre, Malawi', dxbNumber:'DXB 1702964', phone:'+265888823540' },
    { name:'Aramex - Dikwanah', country:'LB', lat:33.8886, lng:35.5447, address:'Mirna Chalouhi Highway, Aramex Bldg, Ad Dikwanah 55606, Lebanon', dxbNumber:'DXB 1702964', phone:'9611679111' },
    { name:'Aramex - Doha', country:'QA', lat:25.2854, lng:51.5310, address:'Zone No. 41, Rawdat Al Khail St., Street No. 330, Building No. 131, Doha, Qatar', dxbNumber:'DXB 1702964', phone:'44200100' },
    { name:'RAF International - Paranaque', country:'PH', lat:14.4793, lng:121.0198, address:'Bldg 2 Units 3 & 4 Oyster Industrial Complex, NAIA Avenue, Paranaque, Metro Manila 1700, Philippines', dxbNumber:'DXB 1702964', phone:'0063288202920' },
    { name:'BlueEx Aramex - Karachi', country:'PK', lat:24.8607, lng:67.0011, address:'Plot No. S-1 Sector 6-C, Opposite Jamia Darul Uloom, Mehran Town Korangi, Karachi, Sindh 74900, Pakistan', dxbNumber:'DXB 1702964', phone:'+923105330004' },
    { name:'Al-Watan Commercial - Muscat', country:'OM', lat:23.5880, lng:58.3829, address:'Building No. 175, Way # 4203 Al-Azaiba North, Muscat, Oman', dxbNumber:'DXB 1702964', phone:'96824473000' },
    { name:'Aramex - Ikeja', country:'NG', lat:6.5774, lng:3.3213, address:'Pilgrims and Cargo Terminal, NAHCO, MMI Airport Road, Ikeja, Nigeria', dxbNumber:'DXB 1702964', phone:'+2342017000800' },
    { name:'Fastway Couriers - Auckland', country:'NZ', lat:-36.9122, lng:174.8165, address:'118 Hugo Johnston Dr, Penrose, Auckland 1061, New Zealand', dxbNumber:'DXB 1702964', phone:'006496343704' },
    { name:'Aramex AIC - Geneva', country:'CH', lat:46.2044, lng:6.1432, address:'Voie-des-Traz 20, CP1122, Geneva 5, Geneva 1211, Switzerland', dxbNumber:'DXB 1702964', phone:'41227178500' },
    { name:'Aramex - Colombo', country:'LK', lat:6.9271, lng:79.8612, address:'717, DPJ Tower, Baseline Road, Colombo 9, 00900, Sri Lanka', dxbNumber:'DXB 1702964', phone:'+94 77 222 1333' },
    { name:'MRW Internacional - Sant Boi', country:'ES', lat:41.3429, lng:2.0349, address:'C/ Garrigues 45 Pol Ind Mas Blau II, Sant Boi de Llobregat, Cataluna 08830, Spain', dxbNumber:'DXB 1702964', phone:'0034933368507' },
    { name:'Aramex - Sandton', country:'ZA', lat:-26.0667, lng:28.1122, address:'No. 1 Quark Crescent, Linbro Business Park, Sandton, Gauteng 2065, South Africa', dxbNumber:'DXB 1702964', phone:'0027-11-457-3000' },
    { name:'AIC - Singapore', country:'SG', lat:1.338150, lng:103.968300, address:'3 Changi South Street 1, #01-01, Singapore 486795', dxbNumber:'DXB 1702964', phone:'006565430300' },
    { name:'RLP Aramex - Riyadh', country:'SA', lat:24.771190, lng:46.700920, address:'Building Number 3, Gate 4, AlSafa ST, Silay District, Riyadh, Saudi Arabia', dxbNumber:'DXB 1702964', phone:'966593954012' },
    { name:'Aramex UK - West Drayton', country:'GB', lat:51.479507, lng:-0.458271, address:'Unit 9 Skyport Drive, West Drayton, Harmondsworth, UB7 0LB, United Kingdom', dxbNumber:'DXB 1702964', phone:'01753-210399' },
    { name:'Aramex - Kampala', country:'UG', lat:0.3476, lng:32.5825, address:'Clement hill road, Urbra building, Kampala, Nakasero, Uganda', dxbNumber:'DXB 1702964', phone:'200711900' },
    { name:'Aramex - Tunis', country:'TN', lat:36.8065, lng:10.1815, address:'KM 2 route de Megrine Saint Gobain, Tunis, Tunisia', dxbNumber:'DXB 1702964', phone:'21628199054' },
    { name:'Aramex - Bangkok', country:'TH', lat:13.7563, lng:100.5018, address:'335 Pattanakarn Road, Prawet District, Bangkok 10250, Thailand', dxbNumber:'DXB 1702964', phone:'0066 20 227 070' },
    { name:'Aramex - Ho Chi Minh', country:'VN', lat:10.8231, lng:106.6297, address:'No 691 Tan Son, 12 Ward, Go Vap District, Ho Chi Minh 70000, Vietnam', dxbNumber:'DXB 1702964', phone:'0905938532' },
    { name:'Aramex - Sarasota', country:'US', lat:27.3364, lng:-82.5307, address:'4297 Express Lane, Sarasota, FL 34249, United States', dxbNumber:'DXB 1702964', phone:'9413262501' }
  ],
  china: [
    { name:'WEPS Warehouse - Shanghai', country:'CN', lat:31.170406, lng:121.321594, address:'Unit 1, Building 15, Lane 248 Huqingping Highway Minhang District, Shanghai 201105', dxbNumber:'DXB 1702964', phone:'0086 4006318388' },
    { name:'WEPS Warehouse - Shenzhen (Gushu)', country:'CN', lat:22.6689, lng:113.8293, address:'深圳市宝安区西乡固戍华丰世纪科技园A1栋1楼3号', dxbNumber:'DXB 1702964', contactName:'Danny转WEPS' },
    { name:'WEPS Warehouse - Guangzhou', country:'CN', lat:23.196080, lng:113.273330, address:'广州市白云区嘉禾街道鹤边员村北街东二巷3号', dxbNumber:'DXB 1702964', phone:'13711114173', contactName:'Peter (周游)', note:'导航输入：Faster中东专线广州分公司' },
    { name:'WEPS Warehouse - Shenzhen Air Cargo', country:'CN', lat:22.707780, lng:113.827820, address:'深圳市宝安区福永街道兴围杰辉兴围物流中心一期A栋103', dxbNumber:'DXB 1702964', phone:'18938993195', contactName:'Chen Lin (陈林)', note:'导航输入：Faster中东专线' },
    { name:'Swift Warehouse - Yiwu', country:'CN', lat:29.315620, lng:120.074710, address:'Swift Warehouse at the back of No. 28 Shangjing Industrial Zone, Futian Street, Yiwu City, Zhejiang Province', dxbNumber:'DXB 1702964', phone:'+86 400 631 8388', note:'يتم نقل الشحنات إلى مخزن Shenzhen بعد الاستلام' }
  ]
};

let originMap = null;
let originMarker = null;
let originGeocoder = null;
let originWarehouseLineDrawn = false;
let originWarehouseMarkers = [];
let currentOriginLocation = null;
let currentNearestWarehouse = null;
let currentWarehouseRouteGeoJSON = null;
let warehouseRouteAbortController = null;
let lastComputedRouteKey = '';

const SMART_ALERTS = {
  medical: {
    type: 'warning',
    title: '⚕️ متطلبات البضائع الطبية',
    message: 'قد تحتاج هذه البضاعة إلى موافقات الهيئة العليا للأدوية واللوازم الطبية قبل التخليص.'
  },
  industrial: {
    type: 'info',
    title: '🏭 تنبيه للبضائع الصناعية',
    message: 'قد تطلب هيئة المواصفات والمقاييس تقرير مطابقة أو فحص خاص للمعدات الصناعية.'
  },
  electronics: {
    type: 'info',
    title: '🔌 فحص الأجهزة الإلكترونية',
    message: 'يُنصح بتجهيز شهادات المطابقة وفواتير واضحة لتسريع التفتيش للأجهزة الإلكترونية.'
  },
  dangerous: {
    type: 'danger',
    title: '⚠️ مواد مصنّفة كخطرة',
    message: 'تأكد من توفر بطاقات السلامة (MSDS) وشروط النقل المناسبة للمواد الكيميائية أو البطاريات.'
  },
  customs: {
    type: 'info',
    title: '🛃 تنبيه جمركي',
    message: 'احرص على تجهيز الفواتير التفصيلية وقوائم التعبئة بدقة لتفادي التأخير في المنافذ الجمركية.'
  }
};

const TOAST_ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
};

const TOAST_DEFAULT_TITLES = {
  success: 'تم بنجاح',
  error: 'حدث خطأ',
  warning: 'تنبيه',
  info: 'معلومة'
};

function showToast(type = 'info', title = '', message = ''){
  const container = document.getElementById('toastContainer');
  if(!container){
    console.warn(`[Toast:${type}] ${title} - ${message}`);
    return;
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const iconSpan = document.createElement('span');
  iconSpan.className = 'toast-icon';
  iconSpan.textContent = TOAST_ICONS[type] || TOAST_ICONS.info;
  const content = document.createElement('div');
  content.className = 'toast-content';
  const titleEl = document.createElement('div');
  titleEl.className = 'toast-title';
  titleEl.textContent = title || TOAST_DEFAULT_TITLES[type] || TOAST_DEFAULT_TITLES.info;
  const messageEl = document.createElement('div');
  messageEl.className = 'toast-message';
  messageEl.textContent = message || '';
  content.appendChild(titleEl);
  content.appendChild(messageEl);
  const closeBtn = document.createElement('button');
  closeBtn.className = 'toast-close';
  closeBtn.setAttribute('aria-label', 'إغلاق التنبيه');
  closeBtn.textContent = '×';
  toast.appendChild(iconSpan);
  toast.appendChild(content);
  toast.appendChild(closeBtn);
  container.appendChild(toast);
  const removeToast = () => {
    if(!toast.parentNode) return;
    toast.classList.add('closing');
    toast.style.opacity = '0';
    setTimeout(()=> toast.remove(), 200);
  };
  closeBtn.addEventListener('click', removeToast);
  setTimeout(removeToast, 6000);
}

const VAS_OPTIONS = {
  photo: { value:'photo', label:'صور للشحنة', costUSD:5, processingDays:1 },
  inspection: { value:'inspection', label:'فحص شامل', costUSD:30, processingDays:3 },
  purchase: { value:'purchase', label:'شراء المنتج', costPercentage:0.10, processingDays:2 }
};

function getSelectedVASKeys(){
  const container = document.getElementById('vasSelect');
  if(!container) return [];
  const checkboxes = container.querySelectorAll('input[type="checkbox"][name="vasOption"]:checked');
  return Array.from(checkboxes).map(cb => cb.value);
}
function updateVASSummary(){
  const summaryEl = document.getElementById('vasSelectionSummary');
  const purchaseSection = document.getElementById('purchaseDetailsSection');
  const select = document.getElementById('vasSelect');
  if(!summaryEl || !select) return;
  const selected = getSelectedVASKeys();
  if(purchaseSection){
    purchaseSection.style.display = selected.includes('purchase') ? 'block' : 'none';
  }
  if(!selected.length){
    summaryEl.textContent = 'لم يتم اختيار خدمات إضافية.';
    return;
  }
  const descriptions = selected.map(key=>{
    const option = VAS_OPTIONS[key];
    if(!option) return '';
    // Calculations removed - show label only
    return option.label;
  }).filter(Boolean);
  summaryEl.textContent = descriptions.join(' | ');
}

function initVASBindings(){
  const container = document.getElementById('vasSelect');
  if(!container) return;
  const checkboxes = container.querySelectorAll('input[type="checkbox"][name="vasOption"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', ()=>{
      updateVASSummary();
      computeAndRender();
    });
  });
  updateVASSummary();
}

// Discount functions removed

function updateServiceExplanation(){
  if(!serviceTypeDescriptionEl) return;
  const serviceKey = serviceTypeEl?.value || '';
  const html = renderServiceDescription(serviceKey);
  if(html){
    serviceTypeDescriptionEl.style.display = 'block';
    serviceTypeDescriptionEl.innerHTML = html;
  } else {
    serviceTypeDescriptionEl.style.display = 'none';
    serviceTypeDescriptionEl.innerHTML = '';
  }
}

function updateServicePriorityDescription(){
  if(!servicePriorityDescriptionEl) return;
  const priorityKey = servicePriorityEl?.value || '';
  const html = renderPriorityDescription(priorityKey);
  if(html){
    servicePriorityDescriptionEl.style.display = 'block';
    servicePriorityDescriptionEl.innerHTML = html;
  } else {
    servicePriorityDescriptionEl.style.display = 'none';
    servicePriorityDescriptionEl.innerHTML = '';
  }
}

function applyExpressAvailability(chargeableWeight){
  // Calculations removed - always allow express
  if(!serviceTypeEl) return true;
  const expressOption = serviceTypeEl.querySelector('option[value="wepsExpress"]');
  if(expressOption){
    expressOption.disabled = false;
    expressOption.hidden = false;
  }
  return true;
}

// enforceRestrictedDiscounts function removed

function initStepAccordions(){
  const blocks = document.querySelectorAll('.step-block');
  
  // Helper function to open a specific block and close others
  const openBlock = (targetBlock) => {
    blocks.forEach(block => {
      const headerBtn = block.querySelector('.step-header-btn');
      if (block === targetBlock) {
        // Open this block
        block.classList.remove('collapsed');
        if (headerBtn) {
          headerBtn.setAttribute('aria-expanded', 'true');
        }
      } else {
        // Close other blocks
        block.classList.add('collapsed');
        if (headerBtn) {
          headerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  };
  
  blocks.forEach(block=>{
    const headerBtn = block.querySelector('.step-header-btn');
    const content = block.querySelector('.step-content');
    if(!headerBtn || !content) return;
    
    // Keep click functionality for mobile/tablet
    headerBtn.addEventListener('click', ()=>{
      const isCollapsed = block.classList.toggle('collapsed');
      headerBtn.setAttribute('aria-expanded', String(!isCollapsed));
    });
    
    // Add hover functionality for desktop
    block.addEventListener('mouseenter', ()=>{
      openBlock(block);
    });
  });
}

function setSmartAlertSource(source, alertKeys){
  const container = document.getElementById('smartAlertsSection');
  if(!container) return;
  if(!Array.isArray(alertKeys) || alertKeys.length === 0){
    container.innerHTML = '';
    container.dataset.activeSource = '';
    return;
  }
  const uniqueKeys = [...new Set(alertKeys.filter(Boolean))];
  if(!uniqueKeys.length){
    container.innerHTML = '';
    container.dataset.activeSource = '';
    return;
  }
  const fragments = uniqueKeys.map(key=>{
    const alert = SMART_ALERTS[key] || { type:'info', title:'تنبيه', message:'يرجى مراجعة فريق ويبس للتأكد من المتطلبات.' };
    return `<div class="alert-box ${alert.type || 'info'}"><div style="font-weight:700;margin-bottom:4px">${alert.title}</div><div>${alert.message}</div></div>`;
  });
  container.innerHTML = `<div style="font-weight:800;margin-bottom:6px;color:var(--weps-navy)">تنبيهات ذكية (${uniqueKeys.length})</div>${fragments.join('')}`;
  container.dataset.activeSource = source || '';
}

function toggleHelp(force){
  const popup = document.getElementById('helpPopup');
  if(!popup) return;
  const shouldOpen = typeof force === 'boolean' ? force : !popup.classList.contains('open');
  popup.classList.toggle('open', shouldOpen);
  popup.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
}

function calculateDistance(lat1, lng1, lat2, lng2){
  // Haversine formula to calculate distance between two points on Earth
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

function calculateInternalShippingCost(distanceKm = 0, weightKg = 0, originCountry = '', volumeM3 = 0){
  return 0; // Calculations removed
}

function isLocationInChina(lat, lng) {
  // Check if location is within approximate boundaries of China
  // Latitude: 18°N to 54°N
  // Longitude: 73°E to 135°E
  return lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135;
}

function findNearestWarehouse(lat, lng, originCountry){
  let candidates = [];
  
  // Determine candidate warehouses based on actual pin location
  if(isLocationInChina(lat, lng)){
    // If location is in China, search only in China warehouses
    candidates = WAREHOUSES.china;
  } else {
    // If location is outside China, search in all international warehouses
    candidates = WAREHOUSES.shopAndShip.slice();
  }
  
  // Calculate distance and select the nearest
  let nearest = null;
  let minDistance = Infinity;
  candidates.forEach(warehouse=>{
    if(typeof warehouse.lat === 'number' && typeof warehouse.lng === 'number'){
      const dist = calculateDistance(lat, lng, warehouse.lat, warehouse.lng);
      if(dist < minDistance){
        minDistance = dist;
        nearest = Object.assign({}, warehouse, { distance: dist });
      }
    }
  });
  return nearest;
}

function saveOriginLocation(lat, lng, label){
  const payload = { lat, lng, label };
  const hidden = document.getElementById('originLocation');
  const display = document.getElementById('originLocationDisplay');
  if(hidden){
    hidden.value = JSON.stringify(payload);
  }
  if(display){
    display.innerText = `${label || 'موقع الشحنة'} — (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  }
}

function setOriginMarker(lng, lat, label = 'موقع الشحنة', autoFly = false){
  if(!originMap){
    initOriginMap();
  }
  if(!originMap) return;
  if(originMarker){
    originMarker.remove();
  }
  originMarker = new mapboxgl.Marker({ color:'#f58220', draggable:true })
    .setLngLat([lng, lat])
    .addTo(originMap);
  originMarker.on('dragend', ()=>{
    const pos = originMarker.getLngLat();
    applyOriginLocation(pos.lng, pos.lat, label, false);
  });
  applyOriginLocation(lng, lat, label, autoFly);
}

function applyOriginLocation(lng, lat, label, autoFly){
  currentOriginLocation = { lng, lat, label };
  saveOriginLocation(lat, lng, label);
  if(autoFly && originMap){
    originMap.flyTo({ center:[lng, lat], zoom: Math.max(originMap.getZoom(), 6) });
  }
  currentNearestWarehouse = findNearestWarehouse(lat, lng, originCountryEl?.value || '');
  if(currentNearestWarehouse){
    updateRouteBetweenOriginAndWarehouse();
  } else {
    currentWarehouseRouteGeoJSON = null;
    lastComputedRouteKey = '';
    drawOriginWarehouseLine(null, null);
    clearRouteDistanceDisplay();
  }
  // Always select nearest warehouse when user places a new pin, don't preserve old selection
  refreshWarehouseSelect({ preserveSelection: false });
  updateWarehouseNoticeText();
  if(typeof updateWarehouseAddressDisplay === 'function'){
    updateWarehouseAddressDisplay();
  }
}

function initOriginMap(){
  if(typeof mapboxgl === 'undefined' || !document.getElementById('originMap')){
    return;
  }
  if(originMap){
    return originMap;
  }
  originMap = new mapboxgl.Map({
    container:'originMap',
    style:'mapbox://styles/mapbox/streets-v11',
    center:[55.2708,25.2048],
    zoom:3
  });
  originGeocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
    placeholder:'ابحث عن مدينة أو ZIP لتحديد موقع الشحنة'
  });
  const searchContainer = document.getElementById('originMapSearch');
  if(searchContainer){
    searchContainer.appendChild(originGeocoder.onAdd(originMap));
  }
  originMap.on('load', ()=>{
    addWarehousesToMap();
    if(currentOriginLocation){
      setOriginMarker(currentOriginLocation.lng, currentOriginLocation.lat, currentOriginLocation.label, true);
    }
  });
  originMap.on('click', e=>{
    setOriginMarker(e.lngLat.lng, e.lngLat.lat, 'موقع الشحنة');
  });
  if(originGeocoder){
    originGeocoder.on('result', e=>{
      const [lng, lat] = e.result.center;
      setOriginMarker(lng, lat, e.result.place_name || 'موقع الشحنة', true);
    });
  }
  return originMap;
}

async function mondayQuery(query, variables){
  const token = getMondayToken();
  if(!token){
    throw new Error('مفتاح Monday API غير متوفر.');
  }
  let res;
  try{
    res = await fetch("https://api.monday.com/v2", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization": token },
      body: JSON.stringify({query, variables})
    });
  }catch(networkErr){
    console.error('Monday network error:', networkErr);
    throw new Error(`تعذر الوصول إلى Monday (${networkErr.message || networkErr})`);
  }
  let rawText = '';
  try{
    rawText = await res.text();
  }catch(readErr){
    console.error('Failed reading Monday response:', readErr);
    throw new Error('تعذر قراءة استجابة Monday.');
  }
  let js = null;
  if(rawText){
    try{
      js = JSON.parse(rawText);
    }catch(parseErr){
      console.error('Monday parse error:', parseErr, rawText);
      throw new Error('استجابة غير متوقعة من Monday — تحقق من لوحة التحكم.');
    }
  } else {
    js = {};
  }
  if(!res.ok){
    const message = Array.isArray(js?.errors) ? js.errors.map(e=>e?.message).filter(Boolean).join(' | ') : res.statusText;
    throw new Error(`HTTP ${res.status}: ${message || 'خطأ غير معروف من Monday'}`);
  }
  if(Array.isArray(js.errors) && js.errors.length){
    throw new Error(js.errors.map(e=>e?.message || 'خطأ غير معروف').join(' | '));
  }
  return js.data;
}
function _num(v){ if(v==null) return null; const n=Number(String(v).replace(/[,\s%]/g,'')); return (isFinite(n)?n:null); }

/* === Monday dropdowns === */
async function getCountriesFromMonday(){
  const q = `
  query($board:[ID!]){
    boards(ids:$board){
      items_page(limit:200){
        items {
          name
          column_values(ids:[
            "${COL_COUNTRY_NAME}",
            "${COL_KG_RATE}"
          ]){
            id
            text
          }
        }
      }
    }
  }`;
  const data = await mondayQuery(q,{board:BOARD_RATES_BY_COUNTRY});
  const items = data?.boards?.[0]?.items_page?.items || [];
  const out = [];
  for(const it of items){
    const cvName = it.column_values.find(cv=>cv.id===COL_COUNTRY_NAME)?.text?.trim();
    const baseRate = _num(it.column_values.find(cv=>cv.id===COL_KG_RATE)?.text);
    
    if(cvName){ 
      out.push({
        country: cvName, 
        rate: baseRate, // backward compatibility
        rates: {
          // استخدام نفس السعر الأساسي لجميع الخدمات
          // ستختلف الأسعار النهائية بسبب route multipliers
          [SERVICES.EXPRESS_YEMEN]: baseRate,
          [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: baseRate,
          [SERVICES.AIR_ADEN_VIA_EG_JO]: baseRate,
          [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: baseRate,
          [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: baseRate,
          [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: baseRate,
        }
      }); 
    }
  }
  return out;
}
async function getProductsFromMonday(){
  const q = `
  query($board:[ID!]){
    boards(ids:$board){
      items_page(limit:200){
        items {
          name
          column_values(ids:[
            "${COL_PRODUCT_TYPE}",
            "${COL_TARIFF_SOUTH}",
            "${COL_TARIFF_NORTH}",
            "${COL_MKT_NORTH}",
            "${COL_MKT_SOUTH}",
            "${COL_EQ_SOUTH}",
            "${COL_EQ_NORTH}",
            "${COL_FX_SN}"
          ]){
            id
            text
          }
        }
      }
    }
  }`;
  const data = await mondayQuery(q,{board:BOARD_PRODUCT_PRICING});
  const items = data?.boards?.[0]?.items_page?.items || [];
  const out = [];
  for(const it of items){
    const map={}; it.column_values?.forEach(cv=> map[cv.id]=cv.text?.trim());
    const p = map[COL_PRODUCT_TYPE];
    if(p){
      out.push({
        product: p,
        tariffSouth: _num(map[COL_TARIFF_SOUTH]),
        tariffNorth: _num(map[COL_TARIFF_NORTH]),
        marketSouth: _num(map[COL_MKT_SOUTH]),
        marketNorth: _num(map[COL_MKT_NORTH]),
        eqSouth:     _num(map[COL_EQ_SOUTH]),
        eqNorth:     _num(map[COL_EQ_NORTH]),
        fxSN:        _num(map[COL_FX_SN])
      });
    }
  }
  return out;
}
async function populateDropdownsFromMonday(){
  const badge = document.getElementById("mondayStatusBadge");
  try{
    if(badge){
      badge.style.display='inline-block';
      badge.textContent='Loading Monday…';
      badge.title = 'جاري جلب البيانات من Monday';
    }
    const [countries, products] = await Promise.all([ getCountriesFromMonday(), getProductsFromMonday() ]);
    if(!countries.length || !products.length){
      throw new Error('لا توجد بيانات كافية من Monday — تأكد من البوردين والأعمدة.');
    }
    hydrateMondayDropdowns(countries, products, { fromCache:false });
    saveMondayCache(countries, products);
    populateDropdownsFromMonday.__loadedAt = Date.now();
    if(populateDropdownsFromMonday.__initialised){
      showToast('success', 'تم تحديث القوائم', 'تم جلب البيانات من Monday بنجاح.');
    } else {
      populateDropdownsFromMonday.__initialised = true;
    }
  }catch(err){
    console.error('Dropdowns Monday error:', err);
    const cached = loadMondayCache();
    if(cached){
      const ageLabel = describeCacheAge(cached.timestamp);
      hydrateMondayDropdowns(cached.countries, cached.products, {
        fromCache:true,
        badgeTitle: ageLabel ? `بيانات مخزنة ${ageLabel}` : 'تم استخدام النسخة المخزنة مؤقتاً'
      });
      showToast('warning', 'تم استخدام النسخة المخزنة', (err && err.message) ? err.message : 'تعذر الاتصال بـ Monday، تم الاعتماد على البيانات المخزنة مؤقتاً.');
    } else {
      if(badge){
        badge.textContent='Monday ✗';
        badge.title = (err && err.message) ? err.message : 'تعذر الاتصال بـ Monday';
      }
      showToast('error', 'تعذر الاتصال بـ Monday', (err && err.message) ? err.message : 'تحقق من مفتاح API أو الاتصال بالإنترنت ثم حاول مرة أخرى.');
    }
  }
}

/* ====== Insurance (ICC) - REMOVED ====== */
// const INSURANCE_RATES = { A:0.015, B:0.009, C:0.003 }; // REMOVED
function pickInsuranceClauseFromName(name=""){
  return "C"; // Return default value, calculations removed
}

/* ====== Express Dynamic Rate - REMOVED ====== */
function dynamicExpressRate(baseRate, weightKg){
  return 0; // Calculations removed
}

/* ===== Customs calculators - REMOVED ===== */
function computeSouthFees({
  itemUSD,
  marketFactor,
  tariffRate,
  eqFX_SOUTH = EQ_FX_SOUTH,
  marketFX = FX_SOUTH_MARKET
}){
  // Calculations removed - return empty structure
  return {
    baseCustomsYER: 0,
    baseMarketYER: 0,
    eqFX_SOUTH: eqFX_SOUTH || 0,
    marketFX: marketFX || 0,
    customsLocal: 0,
    salesLocal: 0,
    vatLocal: 0,
    profitLocal: 0,
    fundsLocal: 0,
    generalLocal: 0,
    totalLocal: 0
  };
}
function computeNorthFees({
  itemUSD,
  marketFactor,
  tariffRate,
  eqFX_NORTH = EQ_FX_NORTH,
  marketFX = FX_NORTH_MARKET
}){
  // Calculations removed - return empty structure
  return {
    baseCustomsYER: 0,
    baseMarketYER: 0,
    eqFX_NORTH: eqFX_NORTH || 0,
    marketFX: marketFX || 0,
    customsLocal: 0,
    salesLocal: 0,
    vatLocal: 0,
    profitLocal: 0,
    fundsLocal: 0,
    generalLocal: 0,
    totalLocal: 0
  };
}

/* ====== Helpers - REMOVED ====== */
function formatYER(n){
  if(n == null || n === '' || n === undefined) return '--- ريال';
  const num = parseFloat(n);
  if(isNaN(num) || num < 0) return '--- ريال';
  return `${Math.round(num).toLocaleString('ar-EG')} ريال`;
}
function formatUSD(n){
  if(n == null || n === '' || n === undefined) return '--- $';
  const num = parseFloat(n);
  if(isNaN(num) || num < 0) return '--- $';
  return `$${num.toFixed(2)}`;
}
function escapeHtml(value){
  if(value === null || value === undefined) return '---';
  return String(value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

/* ====== Form Elements ====== */
const btnQuick = document.getElementById('btnQuick');
const btnFull = document.getElementById('btnFull');
const quickForm = document.getElementById('quickForm');
const fullForm = document.getElementById('fullForm');
const toFull = document.getElementById('toFull');

if(window['pdfjsLib']){
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';
}

const originCountryEl = document.getElementById('originCountry');
const originCityEl = document.getElementById('originCity');
const supplierCityEl = document.getElementById('supplierCity');
const quickOrigin = document.getElementById('quickOrigin');
const quickDest = document.getElementById('quickDest');
const destCityEl = document.getElementById('destCity');

const productTypeEl = document.getElementById('productType');
const productCategoryEl = document.getElementById('productCategory');
const serviceTypeEl = document.getElementById('serviceType');
const serviceTypeDescriptionEl = document.getElementById('serviceTypeDescription');
const itemValueEl = document.getElementById('itemValue');
const customerPhoneEl = document.getElementById('customerPhone');
const customerPhoneFlagEl = document.getElementById('customerPhoneFlag');
const productDescInputEl = document.getElementById('productDesc');
const customerNameInputEl = document.getElementById('customerName');
const quickResultCard = document.getElementById('quickResultCard');
const quickResultBody = document.getElementById('quickResultBody');
const quickToFullBtn = document.getElementById('quickToFullBtn');

const supplierNameEl = document.getElementById('supplierName');
const supplierContactEl = document.getElementById('supplierContact');
const supplierCountryEl = document.getElementById('supplierCountry');
const supplierAddressEl = document.getElementById('supplierAddress');
const supplierEmailEl = document.getElementById('supplierEmail');
const supplierPhoneEl = document.getElementById('supplierPhone');
const supplierPhoneFlagEl = document.getElementById('supplierPhoneFlag');
const supplierInfo = document.getElementById('supplierInfo');
// const discountNoneInput removed - discount section removed
const servicePriorityEl = document.getElementById('servicePriority');
const servicePriorityDescriptionEl = document.getElementById('servicePriorityDescription');

const addParcelBtn = document.getElementById('addParcel');
const parcelsArea = document.getElementById('parcelsArea');

const shipmentState = document.getElementById('shipmentState');
const notReadyBlock = document.getElementById('notReadyBlock');
const readyBlock = document.getElementById('readyBlock');
const pickupOption = document.getElementById('pickupOption');
const pickupDetails = document.getElementById('pickupDetails');
const warehouseDetails = document.getElementById('warehouseDetails');
const warehouseSelect = document.getElementById('warehouseSelect');
const warehouseNotice = document.getElementById('warehouseNotice');
const warehouseGuidanceEl = document.getElementById('warehouseGuidance');
const warehouseGuidanceTextEl = document.getElementById('warehouseGuidanceText');
const copyWarehouseGuidanceBtn = document.getElementById('copyWarehouseGuidance');
const downloadWarehouseGuidanceBtn = document.getElementById('downloadWarehouseGuidance');

let warehouseKeyLookup = new Map();
let latestWarehouseList = [];
let recommendedWarehouseKey = '';
let selectedWarehouseKey = '';
let currentWarehouseGuidanceText = '';

function buildWarehouseKey(warehouse){
  if(!warehouse) return '';
  return `${warehouse.country || 'XX'}|${warehouse.name || ''}`;
}

function buildWarehouseLabel(warehouse, originCountry){
  if(!warehouse) return '';
  const baseName = warehouse.name || '';
  const isChina = originCountry === 'CN' || originCountry === 'الصين';
  if(isChina){
    const cleaned = baseName.replace(/^(Weps\s*Warehouse|Swift\s*Warehouse)\s*-\s*/i,'').trim();
    return `مخزن ويبس - ${cleaned || baseName}`;
  }
  const cleaned = baseName.replace(/Shop\s*&\s*Ship\s*-\s*/i,'').trim();
  return `مخزن ويبس - ${cleaned || baseName}`;
}

function buildWarehouseGuidance(warehouse, originCountry){
  if(!warehouse) return { html:'', text:'' };
  const isChinaWarehouse = originCountry === 'CN' || originCountry === 'الصين' || /Weps|Swift/i.test(warehouse.name || '');
  const lines = [
    '1. قم بتغليف كل طرد بإحكام وتثبيت قائمة التعبئة داخل الكرتون.',
    isChinaWarehouse
      ? '2. اكتب بوضوح الرمز AE-WEPS على كل كرتون وعلى بوليصة الشحن الخارجية.'
      : `2. أضف رقم DXB (${warehouse.dxbNumber || 'DXB-1702964'}) بوضوح على كل كرتون وعلى بوليصة الشحن.`,
    '3. التقط صوراً للطرود بعد وضع الملصقات وشاركها مع فريق ويبس قبل الإرسال.',
    '4. استخدم شحنة واحدة لكل طلب وتأكد من كتابة اسم العميل ورقم تواصل ويبس داخل وخارج الطرد.'
  ];
  const htmlList = lines.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  return {
    html: `<ul style="margin:0;padding-inline-start:20px;line-height:1.8;color:#0b1220">${htmlList}</ul>`,
    text: lines.join('\n')
  };
}

function updateWarehouseGuidanceDisplay(warehouse, originCountry){
  if(!warehouseGuidanceEl || !warehouseGuidanceTextEl){
    currentWarehouseGuidanceText = '';
    return;
  }
  if(!warehouse){
    warehouseGuidanceEl.style.display = 'none';
    warehouseGuidanceTextEl.innerHTML = '';
    currentWarehouseGuidanceText = '';
    return;
  }
  const guidance = buildWarehouseGuidance(warehouse, originCountry);
  currentWarehouseGuidanceText = guidance.text;
  warehouseGuidanceTextEl.innerHTML = guidance.html;
  warehouseGuidanceEl.style.display = 'block';
}

function getWarehousesForOrigin(originCountry){
  const country = (originCountry || '').trim();
  if(!country){
    return WAREHOUSES.china.slice();
  }
  if(country === 'CN' || country === 'الصين'){
    return WAREHOUSES.china.slice();
  }
  const code = getCountryCode(country);
  if(code){
    const filtered = WAREHOUSES.shopAndShip.filter(w => w.country === code);
    if(filtered.length){
      return filtered.slice();
    }
  }
  return WAREHOUSES.shopAndShip.slice();
}

function updateWarehouseNoticeText(){
  if(!warehouseNotice) return;
  const originCountry = originCountryEl?.value || '';
  const recommended = recommendedWarehouseKey && warehouseKeyLookup.get(recommendedWarehouseKey) ? warehouseKeyLookup.get(recommendedWarehouseKey) : null;
  const selected = selectedWarehouseKey && warehouseKeyLookup.get(selectedWarehouseKey) ? warehouseKeyLookup.get(selectedWarehouseKey) : null;
  if(selected){
    const selectedLabel = escapeHtml(buildWarehouseLabel(selected, originCountry));
    warehouseNotice.innerHTML = `✅ المخزن الحالي: <strong>${selectedLabel}</strong>`;
  } else if(recommended){
    const recommendedLabel = escapeHtml(buildWarehouseLabel(recommended, originCountry));
    warehouseNotice.innerHTML = `⭐ تم اختيار أقرب مخزن تلقائياً: <strong>${recommendedLabel}</strong>`;
  } else {
    warehouseNotice.textContent = 'سيتم اختيار أقرب مخزن مناسب تلقائياً، ويمكن تغييره عند الحاجة.';
  }
}

function applyWarehouseSelection(key, { silentNotice = false } = {}){
  if(!key || !warehouseKeyLookup.has(key)){
    return;
  }
  selectedWarehouseKey = key;
  const warehouse = Object.assign({}, warehouseKeyLookup.get(key));
  currentNearestWarehouse = warehouse;
  if(warehouseSelect && warehouseSelect.value !== key){
    warehouseSelect.value = key;
  }
  lastComputedRouteKey = '';
  updateWarehouseGuidanceDisplay(warehouse, originCountryEl?.value || '');
  updateWarehouseAddressDisplay();
  if(!silentNotice){
    updateWarehouseNoticeText();
  } else {
    updateWarehouseNoticeText();
  }
  ensureCurrentWarehouseRoute();
}

function refreshWarehouseSelect({ preserveSelection = true } = {}){
  if(!warehouseSelect) return;
  const originCountry = originCountryEl?.value || '';
  const warehouses = getWarehousesForOrigin(originCountry);
  latestWarehouseList = warehouses.slice();
  const previousSelection = preserveSelection ? selectedWarehouseKey : '';
  warehouseKeyLookup = new Map();
  warehouseSelect.innerHTML = '';
  warehouses.forEach(warehouse=>{
    const key = buildWarehouseKey(warehouse);
    warehouseKeyLookup.set(key, warehouse);
    const option = document.createElement('option');
    option.value = key;
    option.textContent = buildWarehouseLabel(warehouse, originCountry);
    warehouseSelect.appendChild(option);
  });
  let recommended = null;
  if(currentOriginLocation && currentOriginLocation.lat && currentOriginLocation.lng){
    recommended = findNearestWarehouse(currentOriginLocation.lat, currentOriginLocation.lng, originCountry);
  }
  if(!recommended && warehouses.length){
    recommended = warehouses[0];
  }
  recommendedWarehouseKey = recommended ? buildWarehouseKey(recommended) : '';
  let targetKey = '';
  if(previousSelection && warehouseKeyLookup.has(previousSelection)){
    targetKey = previousSelection;
  } else if(recommendedWarehouseKey && warehouseKeyLookup.has(recommendedWarehouseKey)){
    targetKey = recommendedWarehouseKey;
  } else if(warehouses.length){
    targetKey = buildWarehouseKey(warehouses[0]);
  }
  if(targetKey && warehouseKeyLookup.has(targetKey)){
    applyWarehouseSelection(targetKey, { silentNotice: true });
  } else {
    selectedWarehouseKey = '';
    currentNearestWarehouse = recommended ? Object.assign({}, recommended) : null;
    updateWarehouseGuidanceDisplay(currentNearestWarehouse, originCountry);
    updateWarehouseNoticeText();
    updateWarehouseAddressDisplay();
  }
}

if(warehouseSelect){
  warehouseSelect.addEventListener('change', ()=>{
    const key = warehouseSelect.value;
    if(key){
      applyWarehouseSelection(key);
    }
  });
}
const calculateBtn = document.getElementById('calculateBtn');
const quickCalcBtn = document.getElementById('quickCalc');
const resultsArea = document.getElementById('resultsArea');
const comparisonWrap = document.getElementById('comparisonWrap');
const downloadOfferBtnHTML = document.getElementById('downloadOfferBtnHTML');
const downloadOfferBtnPDF = document.getElementById('downloadOfferBtnPDF');
const waDiscussBtn = document.getElementById('waDiscuss');
const fileUploadSection = document.getElementById('fileUploadSection');
const invoiceFileInput = document.getElementById('invoiceFileInput');
const chatLauncher = document.getElementById('chatLauncher');
const chatOverlay = document.getElementById('chatOverlay');
const chatPanel = document.getElementById('chatPanel');
const chatOpenBtn = document.getElementById('chatOpenBtn');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatHeaderSubtitle = chatPanel ? chatPanel.querySelector('header p') : null;
const chatNameInput = document.getElementById('chatName');
const chatPhoneInput = document.getElementById('chatPhone');
const chatReasonSelect = document.getElementById('chatReason');
const chatSubReasonBox = document.getElementById('chatSubReason');
const chatNotesInput = document.getElementById('chatNotes');
const chatMessages = document.getElementById('chatMessages');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatFormSection = document.getElementById('chatFormSection');
const chatSessionSection = document.getElementById('chatSessionSection');
const botsailorChatFrame = document.getElementById('botsailorChatFrame');
const chatPhoneFlagEl = document.getElementById('chatPhoneFlag');
const chatActions = document.getElementById('chatActions');
let parsedDataCache = null;
let pendingProductDescriptionForAutoSelect = '';
let parcelsSetByParsed = false;
let lastAnalysisResult = null;
let lastExtractionMeta = {};
let lastExtractedText = '';
let isAutoSelectingProductType = false;
let hasLiveChatSession = false;
let activeSubscriberId = null;
let combinedExtractedText = '';
const defaultChatSubtitle = chatHeaderSubtitle ? chatHeaderSubtitle.textContent : '';
const LIVE_CHAT_WARNING_DELAY = 300000;
const LIVE_CHAT_END_DELAY = 60000;
const LIVE_CHAT_WARNING_MESSAGE = '⌛ تذكير: لم نستلم ردك بعد. ستنتهي المحادثة خلال دقيقة إن لم يتم الرد.';
const LIVE_CHAT_END_MESSAGE = '🚪 تم إنهاء الدردشة لعدم الرد. يسعدنا خدمتك متى ما احتجت إلينا من جديد.';
let liveChatWarningTimer = null;
let liveChatEndTimer = null;
let uploadedFilesMeta = [];
let isProcessingUploads = false;

const BOTSAILOR_CONFIG = {
  botId: '871',
  websiteId: '175493067557904',
  userId: '57904',
  apiUrl: 'https://botsailor.com/script/webchat/conversation/reply',
  widgetUrlTemplate: 'https://botsailor.com/script/webchat/175493067557904/:subscriber',
  widgetScriptCookie: 'webchatSubscriberIdCookieValueBSWC'
};

const BOTSAILOR_REASON_LABELS = {
  'smart-tool': 'أداة الشحن الذكي',
  'pricing': 'نظام التسعير والخصومات',
  'pioneers': 'نظام رواد ويبس',
  'complaint': 'شكوى عن شحنة حالية',
  'suggestion': 'مقترح للتحسين',
  'payment': 'استفسار عن آلية الدفع'
};

let botsailorCsrfToken = null;
let botsailorSubscriberId = null;

function getCookieValue(name){
  const value = document.cookie.split('; ').find(row=>row.startsWith(name + '='));
  return value ? value.split('=')[1] : null;
}

function setCookieValue(name,value,days){
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  const securePart = window.location.protocol === 'https:' ? '; SameSite=None; Secure' : '';
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/${securePart}`;
}
function generateBotsailorSubscriberId(){
  const randomBytes = new Uint8Array(1);
  try{
    window.crypto.getRandomValues(randomBytes);
  }catch(err){
    randomBytes[0] = Math.floor(Math.random() * 255);
  }
  const uniquePart = `${Date.now()}${randomBytes[0].toString(16).padStart(2,'0')}${BOTSAILOR_CONFIG.websiteId}`;
  return `${uniquePart}-${BOTSAILOR_CONFIG.botId}`;
}

function ensureBotsailorSubscriberId(){
  if(botsailorSubscriberId){
    return botsailorSubscriberId;
  }
  let subscriberId = getCookieValue(BOTSAILOR_CONFIG.widgetScriptCookie);
  if(!subscriberId || !subscriberId.endsWith(`-${BOTSAILOR_CONFIG.botId}`)){
    subscriberId = generateBotsailorSubscriberId();
    setCookieValue(BOTSAILOR_CONFIG.widgetScriptCookie, subscriberId, 90);
  }
  botsailorSubscriberId = subscriberId;
  return subscriberId;
}

async function ensureBotsailorCsrfToken(subscriberId){
  if(botsailorCsrfToken){
    return botsailorCsrfToken;
  }
  const widgetUrl = BOTSAILOR_CONFIG.widgetUrlTemplate.replace(':subscriber', subscriberId);
  const response = await fetch(widgetUrl, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit'
  });
  if(!response.ok){
    throw new Error('تعذر تحميل تكامل Botsailor (CSRF).');
  }
  const text = await response.text();
  const match = text.match(/var\s+csrf_token\s*=\s*'([^']+)'/);
  if(match && match[1]){
    botsailorCsrfToken = match[1];
    return botsailorCsrfToken;
  }
  throw new Error('لم يتم العثور على رمز الحماية Botsailor.');
}

function escapeHtml(value){
  if(value === null || value === undefined){ return ''; }
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildBotsailorMessage(payload){
  const lines = [];
  lines.push('📨 تم استلام طلب جديد من نموذج الدردشة:');
  lines.push(`- الاسم: ${escapeHtml(payload.customerName)}`);
  lines.push(`- الجوال: ${escapeHtml(payload.customerPhone)}`);
  const reasonLabel = escapeHtml(BOTSAILOR_REASON_LABELS[payload.reason] || payload.reason || 'غير محدد');
  let reasonLine = `- سبب التواصل: ${reasonLabel}`;
  if(payload.subReason){
    reasonLine += ` — ${escapeHtml(payload.subReason)}`;
  }
  lines.push(reasonLine);
  if(payload.notes){
    lines.push(`- ملاحظات إضافية: ${escapeHtml(payload.notes)}`);
  }
  lines.push('- قناة الالتقاط: حاسبة ويبس (smart widget)');
  return lines.join('<br>');
}

function buildBotsailorWidgetUrl(subscriberId){
  if(!subscriberId){ return ''; }
  let url = BOTSAILOR_CONFIG.widgetUrlTemplate.replace(':subscriber', subscriberId);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if(timezone){
    url += (url.includes('?') ? '&' : '?') + 'tz=' + encodeURIComponent(timezone);
  }
  url += (url.includes('?') ? '&' : '?') + 'embed=true';
  return url;
}

async function sendMessageToBotsailor(subscriberId, message){
  const csrfToken = await ensureBotsailorCsrfToken(subscriberId);
  const threadId = subscriberId.split('-')[0];
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Riyadh';
  const params = new URLSearchParams({
    webchat_bot_id: BOTSAILOR_CONFIG.botId,
    reply_message: message,
    from_user_id: subscriberId,
    thread_id: threadId,
    tz: timezone,
    user_id: BOTSAILOR_CONFIG.userId,
    reply_message_status: '0',
    webchat_reply_message_id: '',
    reply_conversation_type: '',
    reply_conversation: '',
    reply_image_url: ''
  });
  const response = await fetch(BOTSAILOR_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRF-TOKEN': csrfToken
    },
    body: params.toString(),
    mode: 'cors',
    credentials: 'omit'
  });
  if(!response.ok){
    throw new Error('فشل إرسال الطلب إلى Botsailor.');
  }
  return response;
}

function clearLiveChatTimers(){
  if(liveChatWarningTimer){
    clearTimeout(liveChatWarningTimer);
    liveChatWarningTimer = null;
  }
  if(liveChatEndTimer){
    clearTimeout(liveChatEndTimer);
    liveChatEndTimer = null;
  }
}

function scheduleLiveChatTimers(subscriberId){
  clearLiveChatTimers();
  if(!subscriberId){ return; }
  liveChatWarningTimer = setTimeout(()=>{
    if(!hasLiveChatSession){ return; }
    appendChatMessage(LIVE_CHAT_WARNING_MESSAGE, 'bot');
    sendMessageToBotsailor(subscriberId, LIVE_CHAT_WARNING_MESSAGE).catch(err=>console.warn('Botsailor warning send failed', err));
    liveChatEndTimer = setTimeout(()=>{
      if(!hasLiveChatSession){ return; }
      appendChatMessage(LIVE_CHAT_END_MESSAGE, 'bot');
      sendMessageToBotsailor(subscriberId, LIVE_CHAT_END_MESSAGE).catch(err=>console.warn('Botsailor end send failed', err));
      endLiveChatSession({autoClose:true});
    }, LIVE_CHAT_END_DELAY);
  }, LIVE_CHAT_WARNING_DELAY);
}

function endLiveChatSession(options = {}){
  hasLiveChatSession = false;
  activeSubscriberId = null;
  clearLiveChatTimers();
  if(chatSessionSection){ chatSessionSection.classList.remove('active'); }
  if(chatFormSection){ chatFormSection.style.display = ''; }
  if(chatActions){ chatActions.style.display = ''; }
  if(chatHeaderSubtitle && defaultChatSubtitle){
    chatHeaderSubtitle.textContent = defaultChatSubtitle;
  }
  if(botsailorChatFrame){
    botsailorChatFrame.dataset.loadedSrc = '';
    botsailorChatFrame.src = 'about:blank';
  }
  if(options.autoClose){
    showToast('info','تم إنهاء الدردشة','انتهت الجلسة بسبب عدم الرد.');
    closeChatPanel();
  }
}

function activateLiveChat(subscriberId, options = {}){
  const activeSubscriber = subscriberId || activeSubscriberId || ensureBotsailorSubscriberId();
  activeSubscriberId = activeSubscriber;
  hasLiveChatSession = true;
  if(chatFormSection){ chatFormSection.style.display = 'none'; }
  if(chatActions){ chatActions.style.display = 'none'; }
  if(chatSessionSection){ chatSessionSection.classList.add('active'); }
  if(chatHeaderSubtitle){
    chatHeaderSubtitle.textContent = 'تم تشغيل الدردشة المباشرة، يمكنك متابعة الردود هنا.';
  }
  if(botsailorChatFrame){
    const chatUrl = buildBotsailorWidgetUrl(activeSubscriber);
    if(chatUrl && botsailorChatFrame.dataset.loadedSrc !== chatUrl){
      botsailorChatFrame.src = chatUrl;
      botsailorChatFrame.dataset.loadedSrc = chatUrl;
    }
  }
  if(options.scheduleTimers){
    scheduleLiveChatTimers(activeSubscriber);
  }
  if(chatPanel){
    setTimeout(()=>{ chatPanel.scrollTop = 0; }, 120);
  }
}

function appendChatMessage(text, type){
  if(!chatMessages){ return; }
  var bubble = document.createElement('div');
  bubble.className = type === 'user' ? 'msg user' : 'msg';
  bubble.innerText = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function resetChatForm(){
  if(chatNameInput){ chatNameInput.value = ''; }
  if(chatPhoneInput){ chatPhoneInput.value = ''; }
  if(chatReasonSelect){ chatReasonSelect.value = ''; }
  if(chatNotesInput){ chatNotesInput.value = ''; }
  if(chatSubReasonBox){
    chatSubReasonBox.classList.remove('active');
    var subOptions = chatSubReasonBox.querySelectorAll('input[name="chatSub"]');
    for(var i=0;i<subOptions.length;i++){ subOptions[i].checked = false; }
  }
  updateChatPhoneFlagDisplay();
}

function openChatPanel(){
  if(!chatPanel){ return; }
  if(hasLiveChatSession){
    activateLiveChat(null, {scheduleTimers:false});
  }
  chatPanel.classList.add('open');
  if(chatOverlay){ chatOverlay.classList.add('open'); }
  chatPanel.setAttribute('aria-hidden','false');
  if(chatOpenBtn){ chatOpenBtn.setAttribute('aria-expanded','true'); }
  if(!hasLiveChatSession && chatNameInput){ chatNameInput.focus(); }
}

function closeChatPanel(){
  if(!chatPanel){ return; }
  chatPanel.classList.remove('open');
  if(chatOverlay){ chatOverlay.classList.remove('open'); }
  chatPanel.setAttribute('aria-hidden','true');
  if(chatOpenBtn){ chatOpenBtn.setAttribute('aria-expanded','false'); }
}

async function sendChatPayload(payload, onSuccess, onError){
  try{
    const subscriberId = ensureBotsailorSubscriberId();
    const message = buildBotsailorMessage(payload);
    await sendMessageToBotsailor(subscriberId, message);
    activateLiveChat(subscriberId, {scheduleTimers:true});
    if(typeof onSuccess === 'function'){
      onSuccess({subscriberId});
    }
  }catch(err){
    console.warn('Webchat error', err);
    if(typeof onError === 'function'){
      onError(err);
    }
  }
}

if(chatOpenBtn){
  chatOpenBtn.addEventListener('click', openChatPanel);
}
if(chatCloseBtn){
  chatCloseBtn.addEventListener('click', closeChatPanel);
}
if(chatOverlay){
  chatOverlay.addEventListener('click', closeChatPanel);
}
if(chatReasonSelect){
  chatReasonSelect.addEventListener('change', function(){
    if(!chatSubReasonBox){ return; }
    if(chatReasonSelect.value === 'smart-tool'){
      chatSubReasonBox.classList.add('active');
    }else{
      chatSubReasonBox.classList.remove('active');
      var radios = chatSubReasonBox.querySelectorAll('input[name=\"chatSub\"]');
      for(var i=0;i<radios.length;i++){ radios[i].checked = false; }
    }
  });
}
if(chatSendBtn){
  chatSendBtn.addEventListener('click', function(){
    var name = chatNameInput ? chatNameInput.value.trim() : '';
    var phone = chatPhoneInput ? chatPhoneInput.value.trim() : '';
    var reason = chatReasonSelect ? chatReasonSelect.value : '';
    var notes = chatNotesInput ? chatNotesInput.value.trim() : '';
    var subReason = '';
    if(reason === 'smart-tool' && chatSubReasonBox){
      var checked = chatSubReasonBox.querySelector('input[name=\"chatSub\"]:checked');
      if(checked){ subReason = checked.value; }
    }

    if(!name){
      showToast('warning','معلومة ناقصة','يرجى إدخال اسم العميل.');
      if(chatNameInput){ chatNameInput.focus(); }
      return;
    }
    if(!phone){
      showToast('warning','معلومة ناقصة','يرجى إدخال رقم الجوال.');
      if(chatPhoneInput){ chatPhoneInput.focus(); }
      return;
    }
    if(!reason){
      showToast('warning','معلومة ناقصة','يرجى اختيار سبب التواصل.');
      if(chatReasonSelect){ chatReasonSelect.focus(); }
      return;
    }
    if(reason === 'smart-tool' && !subReason){
      showToast('warning','معلومة ناقصة','يرجى اختيار التفاصيل الفرعية للاستفسار.');
      return;
    }

    var payload = {
      customerName: name,
      customerPhone: phone,
      reason: reason,
      subReason: subReason,
      notes: notes
    };

    var reasonLabel = BOTSAILOR_REASON_LABELS[reason] || reason;
    if(chatMessages && !hasLiveChatSession){
      chatMessages.innerHTML = '';
    }
    var summary = '📨 تم استلام طلبك:\n- الاسم: ' + name + '\n- الجوال: ' + phone + '\n- سبب التواصل: ' + reasonLabel;
    if(subReason){
      summary += ' — ' + subReason;
    }
    if(notes){
      summary += '\n- ملاحظات: ' + notes;
    }
    appendChatMessage(summary, 'user');
    chatSendBtn.disabled = true;
    chatSendBtn.textContent = 'جاري الإرسال...';

    sendChatPayload(payload, function(){
      appendChatMessage('🤖 شكراً لك! تم إرسال رسالتك وسيقوم أحد مختصي خدمة العملاء بالرد عليك عبر هذه الدردشة قريباً.', 'bot');
      showToast('success','تم إرسال الرسالة','سيتم التواصل معك قريباً عبر أحد المختصين.');
      resetChatForm();
      chatSendBtn.disabled = false;
      chatSendBtn.textContent = 'إرسال الطلب';
    }, function(err){
      console.warn('Webchat error', err);
      showToast('error','تعذر إرسال الرسالة','حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً.');
      chatSendBtn.disabled = false;
      chatSendBtn.textContent = 'إرسال الطلب';
    });
  });
}

if(chatPhoneInput){
  chatPhoneInput.addEventListener('input', updateChatPhoneFlagDisplay);
  chatPhoneInput.addEventListener('blur', updateChatPhoneFlagDisplay);
  populateChatPhoneByGeo();
}
if(fileUploadSection){
  ['dragenter','dragover'].forEach(evt=>{
    fileUploadSection.addEventListener(evt, handleFileDragOver);
  });
  ['dragleave','dragend'].forEach(evt=>{
    fileUploadSection.addEventListener(evt, handleFileDragLeave);
  });
  fileUploadSection.addEventListener('drop', handleFileDrop);
}


const COUNTRY_PHONE_DATA = {
  yemen: {dial: '+967', flag: '🇾🇪'},
  china: {dial: '+86', flag: '🇨🇳'},
  uae: {dial: '+971', flag: '🇦🇪'},
  saudi: {dial: '+966', flag: '🇸🇦'},
  egypt: {dial: '+20', flag: '🇪🇬'},
  oman: {dial: '+968', flag: '🇴🇲'},
  qatar: {dial: '+974', flag: '🇶🇦'},
  kuwait: {dial: '+965', flag: '🇰🇼'},
  bahrain: {dial: '+973', flag: '🇧🇭'},
  jordan: {dial: '+962', flag: '🇯🇴'},
  lebanon: {dial: '+961', flag: '🇱🇧'},
  turkey: {dial: '+90', flag: '🇹🇷'},
  usa: {dial: '+1', flag: '🇺🇸'},
  uk: {dial: '+44', flag: '🇬🇧'},
  germany: {dial: '+49', flag: '🇩🇪'},
  france: {dial: '+33', flag: '🇫🇷'},
  italy: {dial: '+39', flag: '🇮🇹'},
  india: {dial: '+91', flag: '🇮🇳'},
  malaysia: {dial: '+60', flag: '🇲🇾'},
  indonesia: {dial: '+62', flag: '🇮🇩'},
  vietnam: {dial: '+84', flag: '🇻🇳'},
  philippines: {dial: '+63', flag: '🇵🇭'},
  singapore: {dial: '+65', flag: '🇸🇬'},
  thailand: {dial: '+66', flag: '🇹🇭'},
  hongkong: {dial: '+852', flag: '🇭🇰'},
  bangladesh: {dial: '+880', flag: '🇧🇩'},
  pakistan: {dial: '+92', flag: '🇵🇰'},
  canada: {dial: '+1', flag: '🇨🇦'},
  netherlands: {dial: '+31', flag: '🇳🇱'},
  spain: {dial: '+34', flag: '🇪🇸'},
  southafrica: {dial: '+27', flag: '🇿🇦'}
};

const COUNTRY_SYNONYMS = {
  'اليمن':'yemen',
  'الصين':'china',
  'china':'china',
  'الإمارات':'uae',
  'الامارات':'uae',
  'السعودية':'saudi',
  'المملكةالعربيةالسعودية':'saudi',
  'مصر':'egypt',
  'سلطنةعمان':'oman',
  'عمان':'oman',
  'قطر':'qatar',
  'الكويت':'kuwait',
  'البحرين':'bahrain',
  'الأردن':'jordan',
  'الاردن':'jordan',
  'لبنان':'lebanon',
  'تركيا':'turkey',
  'الولاياتالمتحدة':'usa',
  'امريكا':'usa',
  'بريطانيا':'uk',
  'المملكةالمتحدة':'uk',
  'ألمانيا':'germany',
  'فرنسا':'france',
  'إيطاليا':'italy',
  'الهند':'india',
  'ماليزيا':'malaysia',
  'اندونيسيا':'indonesia',
  'فيتنام':'vietnam',
  'الفلبين':'philippines',
  'سنغافورة':'singapore',
  'تايلاند':'thailand',
  'هونغكونغ':'hongkong',
  'بنغلادش':'bangladesh',
  'باكستان':'pakistan',
  'كندا':'canada',
  'هولندا':'netherlands',
  'اسبانيا':'spain',
  'جنوبافريقيا':'southafrica'
};
const COUNTRY_DISPLAY_NAMES = {
  yemen:'اليمن',
  china:'الصين',
  uae:'الإمارات',
  saudi:'السعودية',
  egypt:'مصر',
  oman:'عُمان',
  qatar:'قطر',
  kuwait:'الكويت',
  bahrain:'البحرين',
  jordan:'الأردن',
  lebanon:'لبنان',
  turkey:'تركيا',
  usa:'الولايات المتحدة',
  uk:'المملكة المتحدة',
  germany:'ألمانيا',
  france:'فرنسا',
  italy:'إيطاليا',
  india:'الهند',
  malaysia:'ماليزيا',
  indonesia:'إندونيسيا',
  vietnam:'فيتنام',
  philippines:'الفلبين',
  singapore:'سنغافورة',
  thailand:'تايلاند',
  hongkong:'هونغ كونغ',
  bangladesh:'بنغلادش',
  pakistan:'باكستان',
  canada:'كندا',
  netherlands:'هولندا',
  spain:'إسبانيا',
  southafrica:'جنوب أفريقيا'
};

const COUNTRY_ISO_MAP = {
  yemen:'ye',
  china:'cn',
  uae:'ae',
  saudi:'sa',
  egypt:'eg',
  oman:'om',
  qatar:'qa',
  kuwait:'kw',
  bahrain:'bh',
  jordan:'jo',
  lebanon:'lb',
  turkey:'tr',
  usa:'us',
  uk:'gb',
  germany:'de',
  france:'fr',
  italy:'it',
  india:'in',
  malaysia:'my',
  indonesia:'id',
  vietnam:'vn',
  philippines:'ph',
  singapore:'sg',
  thailand:'th',
  hongkong:'hk',
  bangladesh:'bd',
  pakistan:'pk',
  canada:'ca',
  netherlands:'nl',
  spain:'es',
  southafrica:'za'
};

const DIAL_CODE_MAP = {};
Object.values(COUNTRY_PHONE_DATA).forEach(entry=>{
  DIAL_CODE_MAP[entry.dial] = entry.flag;
});
const DIAL_CODES_SORTED = Object.keys(DIAL_CODE_MAP).sort((a,b)=>b.length - a.length);

function normalizeStr(str){
  return (str || '').toString().toLowerCase().replace(/[\s\-_]/g,'');
}
function getCountryPhoneData(country){
  if(!country) return null;
  const norm = normalizeStr(country);
  if(COUNTRY_SYNONYMS[norm]){
    return COUNTRY_PHONE_DATA[COUNTRY_SYNONYMS[norm]] || null;
  }
  for(const [synonym, target] of Object.entries(COUNTRY_SYNONYMS)){
    if(norm.includes(synonym)){
      return COUNTRY_PHONE_DATA[target] || null;
    }
  }
  for(const key in COUNTRY_PHONE_DATA){
    if(norm.includes(key)){
      return COUNTRY_PHONE_DATA[key];
    }
  }
  return null;
}
function detectDialCode(phone){
  if(!phone) return null;
  const cleaned = phone.toString().replace(/[^0-9+]/g,'');
  if(!cleaned.startsWith('+')) return null;
  for(const dial of DIAL_CODES_SORTED){
    if(cleaned.startsWith(dial)){
      return dial;
    }
  }
  return null;
}
function updatePhoneFlag(inputEl, flagEl, countryHint){
  if(!flagEl) return;
  const dial = inputEl ? detectDialCode(inputEl.value) : null;
  if(dial && DIAL_CODE_MAP[dial]){
    flagEl.textContent = DIAL_CODE_MAP[dial];
  } else {
    const data = getCountryPhoneData(countryHint);
    flagEl.textContent = data ? data.flag : '🇾🇪';
  }
}
function setPhoneField(inputEl, flagEl, phone, countryHint){
  if(!inputEl) return;
  let formattedPhone = '';
  let flag = (getCountryPhoneData(countryHint) || {}).flag || '🇾🇪';
  let countryData = getCountryPhoneData(countryHint);
  let raw = (phone || '').toString().trim();
  if(raw){
    raw = raw.replace(/[^0-9+]/g,'');
    if(raw.startsWith('00')) raw = '+' + raw.slice(2);
    if(raw.startsWith('+')){
      const dial = detectDialCode(raw);
      if(dial){
        flag = DIAL_CODE_MAP[dial] || flag;
        const rest = raw.slice(dial.length).replace(/(\d{3})(?=\d)/g,'$1 ');
        formattedPhone = dial + (rest ? ' ' + rest.trim() : '');
      } else {
        formattedPhone = raw;
      }
    } else {
      if(!countryData){
        countryData = {dial:'+967', flag:'🇾🇪'};
      }
      const cleaned = raw.replace(/^0+/, '');
      formattedPhone = countryData.dial + ' ' + cleaned;
      flag = countryData.flag;
    }
  } else if(countryData){
    formattedPhone = countryData.dial + ' ';
    flag = countryData.flag;
  } else {
    formattedPhone = '+967 ';
    flag = '🇾🇪';
  }
  inputEl.value = formattedPhone;
  if(flagEl){
    flagEl.textContent = flag;
  }
}

function countryCodeToFlagEmoji(code){
  if(!code){ return ''; }
  return code.toUpperCase().replace(/./g, char=>String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function updateChatPhoneFlagDisplay(){
  if(!chatPhoneFlagEl){ return; }
  let dial = chatPhoneInput ? detectDialCode(chatPhoneInput.value) : null;
  let flag = dial ? (DIAL_CODE_MAP[dial] || '') : '';
  if(!dial && chatPhoneFlagEl.dataset.defaultDial){
    dial = chatPhoneFlagEl.dataset.defaultDial;
    flag = chatPhoneFlagEl.dataset.defaultFlag || flag;
  }
  if(dial){
    const flagContent = flag || (chatPhoneFlagEl.dataset.defaultIso ? countryCodeToFlagEmoji(chatPhoneFlagEl.dataset.defaultIso) : '🌐');
    chatPhoneFlagEl.innerHTML = `<span class="flag-emoji">${flagContent}</span><span>${dial}</span>`;
    chatPhoneFlagEl.classList.add('visible');
  }else{
    chatPhoneFlagEl.classList.remove('visible');
    chatPhoneFlagEl.innerHTML = '';
  }
}

async function populateChatPhoneByGeo(){
  if(!chatPhoneInput){ return; }
  try{
    const response = await fetch('https://ipapi.co/json/');
    if(!response.ok){
      throw new Error('Geo lookup failed');
    }
    const data = await response.json();
    const isoCode = (data.country_code || '').toLowerCase();
    if(!isoCode){ return; }
    let targetKey = null;
    for(const [key, iso] of Object.entries(COUNTRY_ISO_MAP)){
      if(iso === isoCode){
        targetKey = key;
        break;
      }
    }
    if(!targetKey){
      targetKey = 'yemen';
    }
    const countryData = COUNTRY_PHONE_DATA[targetKey];
    if(!countryData){ return; }
    if(chatPhoneInput.value.trim() === ''){
      chatPhoneInput.value = `${countryData.dial} `;
    }
    if(chatPhoneFlagEl){
      chatPhoneFlagEl.dataset.defaultDial = countryData.dial;
      chatPhoneFlagEl.dataset.defaultFlag = countryData.flag || countryCodeToFlagEmoji(isoCode);
      chatPhoneFlagEl.dataset.defaultIso = (COUNTRY_ISO_MAP[targetKey] || isoCode || '').toUpperCase();
    }
    updateChatPhoneFlagDisplay();
  }catch(err){
    console.warn('GeoIP lookup failed for chat phone', err);
    if(chatPhoneFlagEl){
      chatPhoneFlagEl.dataset.defaultDial = '+967';
      chatPhoneFlagEl.dataset.defaultFlag = '🇾🇪';
      chatPhoneFlagEl.dataset.defaultIso = 'YE';
      updateChatPhoneFlagDisplay();
    }
  }
}

function extractQuantityFromText(text){
  if(!text) return null;
  const qtyMatch = text.match(/(?:x|×|\*)(\d+)/i);
  if(qtyMatch) return parseInt(qtyMatch[1], 10);
  const wordMatch = text.match(/(?:عدد|qty|pcs|قطع|صناديق|كرتون|box|packages?)\s*[:\-]?\s*(\d+)/i);
  if(wordMatch) return parseInt(wordMatch[1], 10);
  const numMatch = text.match(/(\d+)\s*(?:قطعة|كرتون|صندوق|صناديق|كراتين|packages?|pcs)/i);
  if(numMatch) return parseInt(numMatch[1], 10);
  return null;
}

function parseDimensionEntry(segment){
  const numbers = segment.match(/(\d+(?:[.,]\d+)?)/g);
  if(!numbers || numbers.length < 3) return null;
  const [length, width, height] = numbers.slice(0,3).map(n => parseFloat(n.replace(',', '.')));
  if([length, width, height].some(v => isNaN(v))) return null;
  const quantity = extractQuantityFromText(segment);
  return {
    length: +(length.toFixed(2)),
    width: +(width.toFixed(2)),
    height: +(height.toFixed(2)),
    quantity: quantity || null
  };
}

function parsePackageDimensionEntries(dimText){
  if(!dimText) return [];
  const segments = dimText.split(/[\n;|]+|(?:،\s*(?!\d))/).map(s => s.trim()).filter(Boolean);
  if(!segments.length) segments.push(dimText.trim());
  const entries = [];
  segments.forEach(segment=>{
    const entry = parseDimensionEntry(segment);
    if(entry) entries.push(entry);
  });
  return entries;
}

function detectWeightKind(text = ''){
  const lower = (text || '').toLowerCase();
  if(/gross\s*(weight|wt)?/.test(lower)) return 'gross';
  if(/\bgw\b/.test(lower)) return 'gross';
  if(/\bg[\s./-]*w\b/.test(lower)) return 'gross';
  if(/net\s*(weight|wt)?/.test(lower)) return 'net';
  if(/\bnw\b/.test(lower)) return 'net';
  if(/\bn[\s./-]*w\b/.test(lower)) return 'net';
  return 'unknown';
}
function parseWeightSegments(weightText){
  if(!weightText) return [];
  const segments = weightText.split(/[\n;|]+|(?:،\s*(?!\d))/).map(s => s.trim()).filter(Boolean);
  if(!segments.length) segments.push(weightText.trim());
  return segments.map(segment=>{
    const valueMatch = segment.match(/(\d+(?:[.,]\d+)?)/);
    const value = valueMatch ? parseFloat(valueMatch[1].replace(',', '.')) : null;
    const unitMatch = segment.match(/(كجم|كيلو|kg|kgs|كيلوجرام|lb|lbs|طن)/i);
    const quantity = extractQuantityFromText(segment);
    const kind = detectWeightKind(segment);
    return {
      value: value !== null && !isNaN(value) ? +(value.toFixed(3)) : null,
      unit: unitMatch ? unitMatch[1] : '',
      raw: segment,
      quantity: quantity || null,
      kind
    };
  });
}

function inferParcelsFromText(rawText){
  const text = (rawText || '').replace(/\r/g, '\n');
  if(!text.trim()) return [];
  const lines = text.split(/\n|;/).map(line => line.trim()).filter(Boolean);
  const candidates = [];
  const dimRegex = /(\d+(?:[\.,]\d+)?)\s*(?:x|×|\*)\s*(\d+(?:[\.,]\d+)?)\s*(?:x|×|\*)\s*(\d+(?:[\.,]\d+)?)/i;
  const weightRegex = /(\d+(?:[\.,]\d+)?)\s*(kg|kgs|kilogram|kilograms|كيلو|كجم|كغ)/i;
  const qtyRegex = /(\d+)\s*(ctns?|cartons?|boxes?|packages?|pkg|طرود|طرد|صناديق|صندوق|كرتون|كراتين|pcs|pieces?)/i;
  lines.forEach(line=>{
    const dimMatch = line.match(dimRegex);
    const weightMatch = line.match(weightRegex);
    if(!dimMatch && !weightMatch){
      return;
    }
    const numericTokens = line.match(/\d+(?:[\.,]\d+)?/g) || [];
    let dims = [];
    if(dimMatch){
      dims = [dimMatch[1], dimMatch[2], dimMatch[3]];
    } else if(numericTokens.length >= 3){
      dims = numericTokens.slice(0,3);
    }
    const lengthVal = normalizeDimensionToCm(dims[0]);
    const widthVal = normalizeDimensionToCm(dims[1]);
    const heightVal = normalizeDimensionToCm(dims[2]);
    let remainingNumbers = numericTokens.slice(dims.length);
    let weightVal = weightMatch ? normalizeWeightToKg(weightMatch[1]) : '';
    if(!weightVal && remainingNumbers.length){
      weightVal = normalizeWeightToKg(remainingNumbers[0]);
      remainingNumbers = remainingNumbers.slice(1);
    }
    let quantityVal = 1;
    const qtyMatch = line.match(qtyRegex);
    if(qtyMatch){
      const qty = parseInt(qtyMatch[1], 10);
      if(!isNaN(qty) && qty > 0){
        quantityVal = qty;
      }
    }
    if(!qtyMatch && remainingNumbers.length){
      const candidateQty = parseInt(remainingNumbers[remainingNumbers.length - 1], 10);
      if(!isNaN(candidateQty) && candidateQty > 0 && candidateQty < 100000){
        quantityVal = candidateQty;
      }
    }
    if(lengthVal || widthVal || heightVal || weightVal){
      const kind = detectWeightKind(line);
      candidates.push({
        length: lengthVal,
        width: widthVal,
        height: heightVal,
        weight: weightVal,
        quantity: quantityVal,
        kind
      });
    }
  });
  if(!candidates.length){
    return [];
  }
  const hasGross = candidates.some(c => c.kind === 'gross' && c.weight);
  const hasUnknown = candidates.some(c => c.kind === 'unknown' && c.weight);
  let filtered = [];
  if(hasGross){
    filtered = candidates.filter(c => c.kind === 'gross' && c.weight);
  } else if(hasUnknown){
    filtered = candidates.filter(c => c.kind !== 'net' && c.weight);
  } else {
    filtered = candidates.filter(c => c.weight);
  }
  if(!filtered.length){
    filtered = candidates.filter(c => c.weight);
  }
  const simplified = filtered.map(({length, width, height, weight, quantity})=>({
    length,
    width,
    height,
    weight,
    quantity
  }));
  return combineSimilarParcels(simplified);
}

function sanitizeAgentText(value){
  if(!value || typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
}

function textNeedsTranslation(value){
  if(!value || typeof value !== 'string') return false;
  const text = value.trim();
  if(!text) return false;
  const hasArabic = /[\u0600-\u06FF]/.test(text);
  const hasLatin = /[A-Za-z]/.test(text);
  const hasCJK = /[\u3400-\u9FFF\uF900-\uFAFF]/.test(text);
  const hasHiraganaKatakana = /[\u3040-\u30FF]/.test(text);
  const hasHangul = /[\uAC00-\uD7AF]/.test(text);
  const hasCyrillic = /[\u0400-\u052F]/.test(text);
  if(hasCJK || hasHiraganaKatakana || hasHangul){
    return true;
  }
  if(!hasArabic && !hasLatin){
    if(hasCyrillic) return true;
    return /[^\x00-\x7F]/.test(text);
  }
  return false;
}

async function translateAgentDataIfNeeded(data){
  if(!data || typeof data !== 'object') return data;
  const keysToTranslate = [
    'shipment_description',
    'supplier_name',
    'supplier_address',
    'consignee_name',
    'number_of_packages',
    'total_weight_per_package',
    'package_dimensions'
  ];
  const pending = {};
  keysToTranslate.forEach(key=>{
    const value = data[key];
    if(typeof value === 'string' && textNeedsTranslation(value)){
      pending[key] = value;
    }
  });
  if(!Object.keys(pending).length){
    return data;
  }
  try{
    const apiKey = getOpenAIKey();
    if(!apiKey){
      return data;
    }
    const prompt = `
أنت مترجم محترف للوثائق التجارية. المطلوب ترجمة الحقول التالية إلى العربية الفصحى الحديثة، مع توفير نسخة إنجليزية موجزة إذا كان النص الأصلي غير عربي أو إنجليزي.
التزم بالتعليمات:
1. أعد فقط كائن JSON بالصيغة {"key":{"ar":"...", "en":"..."}}.
2. اجعل الترجمة العربية بسيطة وواضحة ومناسبة للاستخدام في نموذج شحن.
3. إذا كان النص الأصلي بالعربية فاحتفظ به كما هو في الحقل ar ويمكن تكراره في en إذا لم تتوفر ترجمة إنجليزية مناسبة.
4. إذا كان النص الأصلي بالإنجليزية فقم بتنقيحه فقط وضعه في en مع إضافة نسخة عربية مكافئة في ar.
5. لا تضف أي تعليقات أو نصوص خارج JSON.
`.trim();

    const inputItems = [
      {
        role:'system',
        content:[{ type:'input_text', text: prompt }]
      },
      {
        role:'user',
        content:[
          { type:'input_text', text:`النصوص المطلوب ترجمتها (JSON):\n${JSON.stringify(pending, null, 2)}` }
        ]
      }
    ];

    const response = await fetch('https://api.openai.com/v1/responses', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${apiKey}`
      },
      body:JSON.stringify({
        model:'gpt-4o-mini',
        temperature:0,
        input: inputItems
      })
    });
    if(!response.ok){
      throw new Error(`Translation API error ${response.status}`);
    }
    const result = await response.json();
    let rawText = '';
    if(Array.isArray(result.output)){
      result.output.forEach(block=>{
        if(Array.isArray(block.content)){
          block.content.forEach(item=>{
            if(item.type === 'output_text' || item.type === 'text'){
              rawText += item.text || '';
            }
          });
        }
      });
    }
    if(!rawText && Array.isArray(result.choices)){
      result.choices.forEach(choice=>{
        const messageContent = choice.message?.content;
        if(Array.isArray(messageContent)){
          messageContent.forEach(item=>{
            if(item.type === 'output_text' || item.type === 'text'){
              rawText += item.text || '';
            }
          });
        }
      });
    }
    if(!rawText){
      throw new Error('Empty translation response');
    }
    let parsed;
    try{
      parsed = JSON.parse(rawText);
    }catch(err){
      const match = rawText.match(/\{[\s\S]*\}/);
      if(match){
        parsed = JSON.parse(match[0]);
      } else {
        throw err;
      }
    }
    Object.keys(parsed || {}).forEach(key=>{
      const entry = parsed[key];
      if(!entry || typeof entry !== 'object') return;
      const arabic = sanitizeAgentText(entry.ar || entry.arabic || '');
      const english = sanitizeAgentText(entry.en || entry.english || '');
      if(arabic){
        data[key] = arabic;
      } else if(english){
        data[key] = english;
      }
    });
  }catch(err){
    console.warn('Translation step failed:', err);
  }
  return data;
}

function setProductDescriptionAuto(value, source='auto'){
  if(!value) return;
  const descEl = document.getElementById('productDesc');
  if(!descEl) return;
  if(descEl.dataset.autofill === 'manual') return;
  const sanitized = sanitizeAgentText(value);
  if(!sanitized) return;
  descEl.value = sanitized;
  descEl.dataset.autofill = source;
  autoSelectProductTypeFromDescription(sanitized);
}

function renderAnalysisOutput(data, meta={}){
  const card = document.getElementById('analysisOutputCard');
  const pre = document.getElementById('analysisOutputPre');
  if(!card || !pre) return;
  if(!data){
    card.style.display = 'none';
    pre.textContent = '';
    return;
  }
  const payload = {
    shipment_description: data.shipment_description || '',
    number_of_packages: data.number_of_packages || '',
    total_weight_per_package: data.total_weight_per_package || '',
    package_dimensions: data.package_dimensions || '',
    supplier_name: data.supplier_name || '',
    supplier_phone: data.supplier_phone || '',
    supplier_contact: data.supplier_contact || '',
    supplier_address: data.supplier_address || '',
    consignee_name: data.consignee_name || '',
    consignee_phone: data.consignee_phone || ''
  };
  if(meta && Object.keys(meta).length){
    payload.meta = meta;
  }
  pre.textContent = JSON.stringify(payload, null, 2);
}

function detectCountryFromText(text){
  if(!text) return null;
  const norm = normalizeStr(text);
  if(!norm) return null;
  for(const [synonym, target] of Object.entries(COUNTRY_SYNONYMS)){
    if(norm.includes(synonym)){
      return target;
    }
  }
  for(const key in COUNTRY_PHONE_DATA){
    if(norm.includes(key)){
      return key;
    }
  }
  return null;
}

function getCountryDisplayName(key){
  if(!key) return '';
  return COUNTRY_DISPLAY_NAMES[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function getCountryDisplayNameFromIso(iso){
  if(!iso) return '';
  const normalizedIso = iso.toLowerCase();
  for(const [key, value] of Object.entries(COUNTRY_ISO_MAP)){
    if(value === normalizedIso){
      return getCountryDisplayName(key);
    }
  }
  return iso.toUpperCase();
}

function applySupplierCountryAutofill(...parts){
  const combined = parts.filter(Boolean).join(' ');
  const detectedKey = detectCountryFromText(combined);
  if(!detectedKey) return;
  if(detectedKey === 'yemen') return;
  const displayName = getCountryDisplayName(detectedKey);
  if(/اليمن/i.test(displayName) || /yemen/i.test(displayName)) return;
  if(supplierCountryEl && (!supplierCountryEl.value || supplierCountryEl.value.trim() === '')){
    supplierCountryEl.value = displayName;
  }
  if(originCountryEl){
    const matched = findCountryOption(originCountryEl, displayName);
    if(matched){
      originCountryEl.value = matched.value || matched.text;
      originCountryEl.dispatchEvent(new Event('change'));
    }
  }
}
const INDUSTRIAL_KEYWORDS = [
  'industrial','industry','factory','manufactur','engineering','machinery','mechanical','automotive','autoparts','metal','steel','chemical','plant','workshop','equipment',
  'صناعي','صناعية','مصنع','للصناعة','للصناعات','ميكانيك','ميكانيكية','معدات','آلات','قطعغيار','قطعغيار','قطعغيار','هندسية','الميكانيكية','الكهربائية'
];

const COMMERCIAL_KEYWORDS = [
  'trading','trade','commerce','commercial','company','co','co.','ltd','llc','inc','corp','enterprise','group','import','export','logistics','shipping','services','store','market','generaltrading','wholesale',
  'تجاري','تجارية','شركة','مؤسسة','مجموعة','للتجارة','للتسويق','للتوريد','للخدمات','للشحن','للمقاولات','للتوزيع','للاستيراد','للتصدير'
];
const CONTACT_MARKERS = ['attn','attention','att','contact','cto','cto.','cto:','attn:','attn.','to','للسيد','عناية'];

function extractCompanyAndContact(rawText){
  if(!rawText) return { company:'', contact:'' };
  const normalized = rawText.replace(/\r\n/g, '\n');
  const lines = normalized.split(/\n|;/).map(s=>s.trim()).filter(Boolean);
  let company = lines[0] || rawText;
  let contact = '';
  const attnRegex = /(attn|attention|contact|att)\.?[:\-]?\s*(.+)/i;
  for(const line of lines){
    const match = line.match(attnRegex);
    if(match){
      contact = match[2].split(/[,\-|]/)[0].trim();
      break;
    }
  }
  if(!contact){
    const match = normalized.match(attnRegex);
    if(match){
      contact = match[2].split(/[,\-|]/)[0].trim();
    }
  }
  if(contact){
    company = normalized.replace(attnRegex, '').split('\n')[0].trim();
  }
  if(!company && lines.length > 1){
    company = lines[0];
  }
  return {
    company: sanitizeAgentText(company),
    contact: sanitizeAgentText(contact)
  };
}

function classifyCustomer(consigneeRaw, description){
  const result = { type:'individual', companyName:'', contactPerson:'' };
  if(!consigneeRaw) return result;
  const { company, contact } = extractCompanyAndContact(consigneeRaw);
  const baseName = company || consigneeRaw;
  const normName = normalizeStr(baseName);
  const normDesc = normalizeStr(description || '');
  const hasIndustrial = INDUSTRIAL_KEYWORDS.some(keyword => normName.includes(keyword) || normDesc.includes(keyword));
  const hasCommercial = COMMERCIAL_KEYWORDS.some(keyword => normName.includes(keyword) || normDesc.includes(keyword));
  const hasContactMarker = CONTACT_MARKERS.some(marker => normName.includes(marker));

  if(hasIndustrial){
    result.type = 'industrial';
  } else if(hasCommercial){
    result.type = 'commercial';
  } else if(contact || /company|co\.|ltd|llc|inc|corp|شركة|مؤسسة/i.test(baseName)){
    result.type = 'commercial';
  } else {
    result.type = 'individual';
  }

  if(result.type !== 'individual'){
    result.companyName = sanitizeAgentText(baseName);
  }
  if(contact){
    result.contactPerson = contact;
  } else if(result.type === 'individual'){
    result.companyName = '';
  }
  return result;
}

function applyCustomerClassification(consigneeRaw, description, presetClassification){
  if(!customerTypeEl) return;
  const classification = presetClassification || classifyCustomer(consigneeRaw, description);
  if(!classification) return;

  if(classification.type){
    customerTypeEl.value = classification.type;
    customerTypeEl.dispatchEvent(new Event('change'));
  }

  if(classification.companyName && companyNameEl){
    companyNameEl.value = classification.companyName;
  } else if(classification.type === 'individual' && companyNameEl){
    companyNameEl.value = '';
  }

  const customerNameEl = customerNameInputEl;
  if(customerNameEl){
    if(classification.contactPerson){
      customerNameEl.value = classification.contactPerson;
    } else if(classification.type !== 'individual' && classification.companyName){
      customerNameEl.value = classification.companyName;
    } else if(!customerNameEl.value){
      customerNameEl.value = sanitizeAgentText(consigneeRaw);
    }
  }

  return classification;
}
const GOODS_SUMMARY_RULES = [
  {
    keywords: ['heat','exchanger','plate','gasket'],
    summary: 'صفائح وحشوات مبادل حراري صناعي (316L / EPDM) تستخدم في وحدات التبادل الحراري.',
    alerts: ['industrial','customs']
  },
  {
    keywords: ['heat','exchanger'],
    summary: 'مكونات مبادل حراري صناعي تستخدم في خطوط المعالجة والتبريد.',
    alerts: ['industrial','customs']
  },
  {
    keywords: ['gasket','epdm'],
    summary: 'حشوات EPDM صناعية لضمان إحكام المبادل الحراري ومعدات العمليات.',
    alerts: ['industrial','customs']
  },
  {
    keywords: ['pump','valve','compressor','motor'],
    summary: 'مكونات ميكانيكية صناعية (مضخات/صمامات/محركات) مخصصة لخطوط الإنتاج.',
    alerts: ['industrial','customs']
  },
  {
    keywords: ['battery','lithium'],
    summary: 'بطاريات ليثيوم قابلة لإعادة الشحن تتطلب اشتراطات نقل مواد خطرة.',
    alerts: ['dangerous','customs']
  },
  {
    keywords: ['chemical','solvent','paint','adhesive'],
    summary: 'مواد كيميائية أو مذيبات تحتاج إلى احتياطات سلامة أثناء الشحن والتخليص.',
    alerts: ['dangerous','customs']
  },
  {
    keywords: ['medical','clinic','hospital','pharma','dental'],
    summary: 'مستلزمات أو أجهزة طبية تستلزم موافقات الهيئة العليا للأدوية.',
    alerts: ['medical','customs']
  },
  {
    keywords: ['electronics','pcb','sensor','module','device'],
    summary: 'مكونات إلكترونية دقيقة تتطلب فحص مطابقة المواصفات.',
    alerts: ['electronics','customs']
  },
  {
    keywords: ['food','beverage','meat','spice','coffee','tea'],
    summary: 'منتجات غذائية قابلة للاستهلاك تحتاج إلى شهادات صحية رسمية.',
    alerts: ['customs']
  },
  {
    keywords: ['cosmetic','perfume','fragrance','makeup','beauty'],
    summary: 'مستحضرات تجميل وعناية شخصية تتطلب تسجيل ومطابقة جودة.',
    alerts: ['customs']
  }
];
function analyzeGoodsContent(rawText){
  const text = (rawText || '').trim();
  if(!text) return { summary:'', alerts:[] };
  const normalized = normalizeStr(text);
  const alerts = new Set();
  let summary = '';

  for(const rule of GOODS_SUMMARY_RULES){
    const matched = rule.keywords && rule.keywords.every(keyword => normalized.includes(normalizeStr(keyword)));
    if(matched){
      if(!summary && rule.summary) summary = rule.summary;
      (rule.alerts || []).forEach(key => alerts.add(key));
    }
  }

  if(!summary){
    const lower = text.toLowerCase();
    if(/heat\s*exchanger|exchanger/.test(lower)){
      summary = 'مكونات مبادل حراري صناعي (صفائح وحشوات مانعة للتسرب).';
      alerts.add('industrial'); alerts.add('customs');
    } else if(/gasket|seal|mechanical|bearing/.test(lower)){
      summary = 'مستلزمات ميكانيكية وحشوات صناعية لخطوط الإنتاج.';
      alerts.add('industrial');
    } else if(/chemical|solvent|adhesive|paint/.test(lower)){
      summary = 'مواد كيميائية أو مذيبات تتطلب احتياطات سلامة أثناء الشحن.';
      alerts.add('dangerous'); alerts.add('customs');
    } else if(/battery|lithium|cell/.test(lower)){
      summary = 'بطاريات أو خلايا طاقة قد تصنف كمواد خطرة أثناء النقل.';
      alerts.add('dangerous'); alerts.add('customs');
    } else if(/medical|clinic|hospital|pharma|dental|syringe/.test(lower)){
      summary = 'مستلزمات أو أجهزة طبية تخضع لموافقات الهيئة العليا للأدوية.';
      alerts.add('medical'); alerts.add('customs');
    } else if(/electronics|device|pcb|chip|sensor|module/.test(lower)){
      summary = 'مكونات إلكترونية تحتاج إلى فحص مطابقة المواصفات.';
      alerts.add('electronics'); alerts.add('customs');
    } else if(/food|beverage|spice|meat|fish|vegetable|chocolate/.test(lower)){
      summary = 'منتجات غذائية تستلزم شهادات صحية واعتمادات رسمية.';
      alerts.add('customs');
    } else if(/cosmetic|perfume|fragrance|makeup/.test(lower)){
      summary = 'مستحضرات تجميل أو عطور تتطلب تسجيل وموافقة الجهات المختصة.';
      alerts.add('customs');
    } else if(lower.split(/\s+/).length <= 12){
      summary = text;
    }
  }

  if(!summary){
    const trimmed = text.replace(/\s+/g, ' ').trim();
    summary = trimmed.length > 180 ? trimmed.slice(0, 177) + '...' : trimmed;
  }

  return { summary, alerts: Array.from(alerts) };
}
function createKeywordArray(arr){
  return arr.map(normalizeStr);
}

const PRODUCT_NAME_KEYS = createKeywordArray(['product', 'item', 'description', 'اسم', 'الصنف', 'البضاعة', 'material', 'goods']);
const QUANTITY_KEYS = createKeywordArray(['qty', 'quantity', 'pieces', 'pcs', 'عدد', 'كمية']);
const LENGTH_KEYS = createKeywordArray(['length', 'long', 'dimensionl', 'طول', 'بعدطول']);
const WIDTH_KEYS = createKeywordArray(['width', 'dimensionw', 'عرض', 'بعدعرض']);
const HEIGHT_KEYS = createKeywordArray(['height', 'dimensionh', 'ارتفاع', 'بعدارتفاع']);
const WEIGHT_KEYS = createKeywordArray(['weight', 'grossweight', 'netweight', 'kg', 'وزن', 'وزنصافي', 'وزنجمالي']);
const HS_CODE_KEYS = createKeywordArray(['hs', 'hscode', 'hs_code', 'رمزhs', 'رمزالجمركي', 'hsno']);
const MANUFACTURER_KEYS = createKeywordArray(['manufacturer', 'factory', 'supplier', 'brand', 'المورد', 'المصنع', 'الشركة', 'المُصنع']);
const CUSTOMER_NAME_KEYS = createKeywordArray(['customer', 'client', 'buyer', 'customername', 'clientname', 'buyername', 'اسم العميل', 'المشتري']);
const CUSTOMER_PHONE_KEYS = createKeywordArray(['customerphone', 'phone', 'mobile', 'tel', 'جوال', 'هاتف', 'هاتف العميل']);
const CUSTOMER_EMAIL_KEYS = createKeywordArray(['email', 'mail', 'البريد', 'بريد العميل']);
const CUSTOMER_COUNTRY_KEYS = createKeywordArray(['country', 'الدولة', 'البلد', 'customer_country']);
const SUPPLIER_NAME_KEYS = createKeywordArray(['supplier', 'factory', 'manufacturer', 'company', 'suppliername', 'اسم المورد', 'الشركة', 'المصنع']);
const SUPPLIER_PHONE_KEYS = createKeywordArray(['supplierphone', 'factoryphone', 'suppliermobile', 'هاتف المورد', 'جوال المورد']);
const SUPPLIER_EMAIL_KEYS = createKeywordArray(['supplieremail', 'factoryemail', 'بريد المورد']);
const SUPPLIER_COUNTRY_KEYS = createKeywordArray(['suppliercountry', 'countryoforigin', 'origin', 'بلد المورد', 'بلد المنشأ', 'الدولة']);
const SUPPLIER_ADDRESS_KEYS = createKeywordArray(['address', 'supplieraddress', 'factoryaddress', 'العنوان', 'عنوان المورد']);
const PRODUCT_CATEGORY_KEYS = createKeywordArray(['category', 'الفئة', 'التصنيف']);

function matchesKeyword(normKey, keywordArray){
  return keywordArray.some(keyword => normKey.includes(keyword));
}

function parseNumeric(value){
  if(value === undefined || value === null) return null;
  const str = value.toString().trim();
  if(!str) return null;
  const normalized = str.replace(/[^0-9.,-]/g,'').replace(/,/g,'.');
  const num = parseFloat(normalized);
  return isNaN(num) ? null : +(num.toFixed(4));
}

function parseInteger(value){
  const num = parseNumeric(value);
  if(num === null) return null;
  return Math.round(num);
}

function buildProductDescriptionFromParsed(products){
  if(!products || !products.length) return '';
  return products.map((product, index)=>{
    const parts = [];
    const name = product.name || `صنف ${index+1}`;
    parts.push(name);
    if(product.manufacturer) parts.push(`من ${product.manufacturer}`);
    if(product.quantity) parts.push(`${product.quantity} قطعة`);
    const hasDims = product.lengthCm && product.widthCm && product.heightCm;
    if(hasDims){
      parts.push(`أبعاد ${product.lengthCm}×${product.widthCm}×${product.heightCm} سم`);
    }
    if(product.weightKg){
      parts.push(`وزن ${product.weightKg} كجم`);
    }
    if(product.hsCode){
      parts.push(`رمز HS: ${product.hsCode}`);
    }
    return parts.join(' - ');
  }).join(' | ');
}
function buildStructuredContext(parsed){
  if(!parsed) return null;
  const summary = {
    customer: parsed.customer,
    supplier: parsed.supplier,
    products: parsed.products ? parsed.products.slice(0, 25) : [],
    parcels: parsed.parcels ? parsed.parcels.slice(0, 25) : []
  };
  try{
    return JSON.stringify(summary, null, 2);
  }catch(e){
    return null;
  }
}
async function parseStructuredFile(file){
  if(!file) return null;
  const name = file.name || '';
  const ext = name.split('.').pop().toLowerCase();
  const excelTypes = ['xls', 'xlsx'];
  if(excelTypes.includes(ext)){
    return await parseExcelFile(file);
  }
  if(ext === 'csv' || file.type === 'text/csv'){
    return await parseCsvFile(file);
  }
  return null;
}

async function parseExcelFile(file){
  if(typeof XLSX === 'undefined'){
    console.warn('XLSX library not loaded.');
    return null;
  }
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, {type:'array'});
  const sheetName = workbook.SheetNames[0];
  if(!sheetName) return null;
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, {defval:''});
  return processParsedRows(rows);
}

async function parseCsvFile(file){
  if(typeof XLSX === 'undefined'){
    console.warn('XLSX library not loaded.');
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if(!lines.length) return null;
    const headers = lines[0].split(',').map(h=>h.trim());
    const rows = lines.slice(1).map(line=>{
      const cols = line.split(',');
      const row = {};
      headers.forEach((header, idx)=> row[header] = cols[idx] ? cols[idx].trim() : '');
      return row;
    });
    return processParsedRows(rows);
  }
  const text = await file.text();
  const workbook = XLSX.read(text, {type:'string'});
  const sheetName = workbook.SheetNames[0];
  if(!sheetName) return null;
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, {defval:''});
  return processParsedRows(rows);
}
function processParsedRows(rows){
  if(!Array.isArray(rows) || !rows.length) return null;
  const products = [];
  const parcels = [];
  const customer = {name:'', phone:'', email:'', country:''};
  const supplier = {name:'', phone:'', email:'', country:''};
  const uniqueProductNames = new Set();

  rows.forEach((row, index)=>{
    const rowData = {
      name:'',
      manufacturer:'',
      hsCode:'',
      category:'',
      quantity:null,
      lengthCm:null,
      widthCm:null,
      heightCm:null,
      weightKg:null
    };
    Object.keys(row).forEach(key=>{
      const value = row[key];
      if(value === undefined || value === null || value === '') return;
      const normKey = normalizeStr(key);
      const valueStr = value.toString().trim();

      if(!customer.name && matchesKeyword(normKey, CUSTOMER_NAME_KEYS)){
        customer.name = valueStr;
      }
      if(!customer.phone && matchesKeyword(normKey, CUSTOMER_PHONE_KEYS)){
        customer.phone = valueStr;
      }
      if(!customer.email && matchesKeyword(normKey, CUSTOMER_EMAIL_KEYS)){
        customer.email = valueStr;
      }
      if(!customer.country && matchesKeyword(normKey, CUSTOMER_COUNTRY_KEYS)){
        customer.country = valueStr;
      }

      if(!supplier.name && matchesKeyword(normKey, SUPPLIER_NAME_KEYS)){
        supplier.name = valueStr;
      }
      if(!supplier.phone && matchesKeyword(normKey, SUPPLIER_PHONE_KEYS)){
        supplier.phone = valueStr;
      }
      if(!supplier.email && matchesKeyword(normKey, SUPPLIER_EMAIL_KEYS)){
        supplier.email = valueStr;
      }
      if(!supplier.country && matchesKeyword(normKey, SUPPLIER_COUNTRY_KEYS)){
        supplier.country = valueStr;
      }

      if(!rowData.name && matchesKeyword(normKey, PRODUCT_NAME_KEYS)){
        rowData.name = valueStr;
      }
      if(!rowData.manufacturer && matchesKeyword(normKey, MANUFACTURER_KEYS)){
        rowData.manufacturer = valueStr;
      }
      if(!rowData.hsCode && matchesKeyword(normKey, HS_CODE_KEYS)){
        rowData.hsCode = valueStr;
      }
      if(!rowData.category && matchesKeyword(normKey, PRODUCT_CATEGORY_KEYS)){
        rowData.category = valueStr;
      }
      if(rowData.quantity === null && matchesKeyword(normKey, QUANTITY_KEYS)){
        rowData.quantity = parseInteger(value);
      }
      if(rowData.lengthCm === null && matchesKeyword(normKey, LENGTH_KEYS)){
        rowData.lengthCm = parseNumeric(value);
      }
      if(rowData.widthCm === null && matchesKeyword(normKey, WIDTH_KEYS)){
        rowData.widthCm = parseNumeric(value);
      }
      if(rowData.heightCm === null && matchesKeyword(normKey, HEIGHT_KEYS)){
        rowData.heightCm = parseNumeric(value);
      }
      if(rowData.weightKg === null && matchesKeyword(normKey, WEIGHT_KEYS)){
        rowData.weightKg = parseNumeric(value);
      }
    });

    if(rowData.name || rowData.manufacturer || rowData.weightKg || rowData.lengthCm || rowData.widthCm || rowData.heightCm){
      const product = {
        name: rowData.name || `صنف ${index+1}`,
        manufacturer: rowData.manufacturer || '',
        hsCode: rowData.hsCode || '',
        category: rowData.category || '',
        quantity: rowData.quantity || 1,
        lengthCm: rowData.lengthCm,
        widthCm: rowData.widthCm,
        heightCm: rowData.heightCm,
        weightKg: rowData.weightKg
      };
      products.push(product);
      if(rowData.lengthCm || rowData.widthCm || rowData.heightCm || rowData.weightKg){
        parcels.push({
          length: rowData.lengthCm,
          width: rowData.widthCm,
          height: rowData.heightCm,
          weight: rowData.weightKg,
          quantity: rowData.quantity || 1
        });
      }
      uniqueProductNames.add(product.name);
    }
  });
  const productDescription = buildProductDescriptionFromParsed(products);
  if(!supplier.name){
    const manufacturerCandidate = products.find(p => p.manufacturer)?.manufacturer;
    if(manufacturerCandidate){
      supplier.name = manufacturerCandidate;
    }
  }
  return {
    rawRows: rows,
    products,
    parcels,
    customer,
    supplier,
    productDescription,
    uniqueProducts: Array.from(uniqueProductNames)
  };
}

async function extractTextFromPDF(file){
  if(!window['pdfjsLib']) throw new Error('pdf.js غير متوفر');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++){
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str).filter(Boolean);
    text += strings.join(' ') + '\n';
  }
  return text.trim();
}

async function extractTextFromDocx(file){
  if(!window['mammoth']) throw new Error('mammoth غير متوفر');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({arrayBuffer});
  return (result.value || '').trim();
}

async function extractTextFromImage(file){
  if(!window['Tesseract']) throw new Error('Tesseract غير متوفر');
  const url = URL.createObjectURL(file);
  try{
    const { data } = await Tesseract.recognize(url, 'eng+ara', { logger: ()=>{} });
    return (data.text || '').trim();
  }finally{
    URL.revokeObjectURL(url);
  }
}
async function extractFileText(file, parsedData = null){
  const name = file.name || '';
  const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
  const type = file.type || '';
  const warnings = [];
  let text = '';

  try{
    if(ext === 'csv' || type === 'text/csv'){
      text = await file.text();
    } else if(['xls', 'xlsx'].includes(ext)){
      if(parsedData?.rawRows?.length){
        text = parsedData.rawRows.map(row=> Object.values(row).join(', ')).join('\n');
      } else {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, {type:'array'});
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        text = XLSX.utils.sheet_to_csv(sheet);
      }
    } else if(ext === 'pdf' || type === 'application/pdf'){
      text = await extractTextFromPDF(file);
    } else if(ext === 'docx' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      text = await extractTextFromDocx(file);
    } else if(type.startsWith('image/')){
      text = await extractTextFromImage(file);
    } else if(ext === 'txt' || type === 'text/plain'){
      text = await file.text();
    } else {
      warnings.push('نوع الملف غير مدعوم بالكامل للتحويل إلى نص. سيتم الاعتماد على التحليل المباشر.');
    }
  }catch(err){
    console.warn('Text extraction warning:', err);
    warnings.push(`تعذر استخراج النص من الملف (${err.message || err}). سيتم الاعتماد على التحليل المباشر.`);
  }

  return { text: text ? text.trim() : '', warnings };
}
function normalizeDimensionToCm(value){
  if(value === undefined || value === null) return '';
  const raw = typeof value === 'string' ? value.trim() : value;
  if(raw === '') return '';
  let num = parseFloat(String(raw).replace(/[^\d.,-]/g,'').replace(',', '.'));
  if(isNaN(num) || num <= 0){
    return '';
  }
  if(typeof raw === 'string' && /mm/i.test(raw)){
    num = num / 10;
  } else if(typeof raw === 'string' && /m(?!m)/i.test(raw)){
    num = num * 100;
  } else if(num > 500){
    num = num / 10;
  } else if(num > 200){
    num = num / 10;
  }
  return +num.toFixed(2);
}
function normalizeWeightToKg(value){
  if(value === undefined || value === null) return '';
  const raw = typeof value === 'string' ? value.trim() : value;
  if(raw === '') return '';
  let num = parseFloat(String(raw).replace(/[^\d.,-]/g,'').replace(',', '.'));
  if(isNaN(num) || num < 0){
    return '';
  }
  if(typeof raw === 'string' && /g\b/i.test(raw) && !/kg/i.test(raw)){
    num = num / 1000;
  } else if(num > 10000){
    num = num / 1000;
  }
  return +num.toFixed(3);
}

function setParcels(parcels, options={}){
  if(!parcelsArea) return;
  parcelsArea.innerHTML = '';
  if(!Array.isArray(parcels) || !parcels.length) return;
  const mergedParcels = combineSimilarParcels(parcels);
  mergedParcels.forEach(parcel=>{
    const qtyVal = Math.max(parseInt(parcel.quantity,10) || 1, 1);
    const div = document.createElement('div');
    div.className = 'parcel';
    const lengthVal = normalizeDimensionToCm(parcel.length);
    const widthVal = normalizeDimensionToCm(parcel.width);
    const heightVal = normalizeDimensionToCm(parcel.height);
    const weightVal = normalizeWeightToKg(parcel.weight);
    if(!lengthVal || !widthVal || !heightVal || !weightVal){
      return;
    }
    div.innerHTML = `
      <div class="parcel-field">
        <label>L (سم)</label>
        <input class="p-length" type="number" value="${lengthVal}"/>
      </div>
      <div class="parcel-field">
        <label>W (سم)</label>
        <input class="p-width" type="number" value="${widthVal}"/>
      </div>
      <div class="parcel-field">
        <label>H (سم)</label>
        <input class="p-height" type="number" value="${heightVal}"/>
      </div>
      <div class="parcel-field">
        <label>KG</label>
        <input class="p-weight" type="number" value="${weightVal}"/>
      </div>
      <input class="p-qty" type="hidden" value="${qtyVal}"/>
      <button type="button" class="add-btn remove">×</button>
    `;
    parcelsArea.appendChild(div);
    div.querySelector('.remove').addEventListener('click', ()=>div.remove());
  });
  parcelsSetByParsed = !!options.fromParsed;
}
function mergeObjectsPreferIncoming(baseObj = {}, incomingObj = {}){
  const result = {...baseObj};
  if(!incomingObj || typeof incomingObj !== 'object'){
    return result;
  }
  Object.keys(incomingObj).forEach(key=>{
    const incomingValue = incomingObj[key];
    if(incomingValue === undefined || incomingValue === null || incomingValue === ''){
      return;
    }
    const existingValue = result[key];
    if(typeof incomingValue === 'object' && !Array.isArray(incomingValue) && incomingValue !== null){
      result[key] = mergeObjectsPreferIncoming(
        typeof existingValue === 'object' && existingValue !== null ? existingValue : {},
        incomingValue
      );
    } else {
      result[key] = incomingValue;
    }
  });
  return result;
}
function mergeUniqueArray(baseArr = [], incomingArr = []){
  const combined = [...baseArr, ...incomingArr].filter(item=>item !== undefined && item !== null);
  const seen = new Set();
  return combined.filter(item=>{
    const key = JSON.stringify(item);
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function mergeParsedDataCaches(base, incoming){
  if(!base) return incoming || null;
  if(!incoming) return base;
  const merged = {...base, ...incoming};
  merged.customer = mergeObjectsPreferIncoming(base.customer || {}, incoming.customer || {});
  merged.supplier = mergeObjectsPreferIncoming(base.supplier || {}, incoming.supplier || {});
  merged.products = mergeUniqueArray(base.products || [], incoming.products || []);
  merged.parcels = mergeUniqueArray(base.parcels || [], incoming.parcels || []);
  merged.files = mergeUniqueArray(base.files || [], incoming.files || []);
  return merged;
}
function combineSimilarParcels(parcels = []){
  if(!Array.isArray(parcels) || !parcels.length) return [];
  const map = new Map();
  parcels.forEach(parcel=>{
    const normalized = {
      length: normalizeDimensionToCm(parcel.length),
      width: normalizeDimensionToCm(parcel.width),
      height: normalizeDimensionToCm(parcel.height),
      weight: normalizeWeightToKg(parcel.weight),
      quantity: parseInt(parcel.quantity,10) || 1
    };
    if(!normalized.length || !normalized.width || !normalized.height || !normalized.weight){
      return;
    }
    const key = `${normalized.length}-${normalized.width}-${normalized.height}-${normalized.weight}`;
    if(map.has(key)){
      const stored = map.get(key);
      stored.quantity += normalized.quantity;
    } else {
      map.set(key, {...normalized});
    }
  });
  return Array.from(map.values());
}
function collapseParcelsByDimensions(parcels = []){
  if(!Array.isArray(parcels) || !parcels.length) return [];
  const map = new Map();
  parcels.forEach(parcel=>{
    const length = normalizeDimensionToCm(parcel.length);
    const width = normalizeDimensionToCm(parcel.width);
    const height = normalizeDimensionToCm(parcel.height);
    const weight = normalizeWeightToKg(parcel.weight);
    const quantity = parseInt(parcel.quantity,10) || 1;
    if(!length || !width || !height || !weight){
      return;
    }
    const key = `${length}-${width}-${height}`;
    if(!map.has(key)){
      map.set(key, { length, width, height, weight, quantity });
      return;
    }
    const existing = map.get(key);
    if(weight > existing.weight){
      map.set(key, { length, width, height, weight, quantity });
    } else if(weight === existing.weight){
      existing.quantity += quantity;
    }
  });
  return Array.from(map.values());
}
function readParcelsFromUI(){
  if(!parcelsArea) return [];
  const rows = Array.from(parcelsArea.querySelectorAll('.parcel'));
  if(!rows.length) return [];
  return rows.map(row=>{
    const length = normalizeDimensionToCm(row.querySelector('.p-length')?.value);
    const width = normalizeDimensionToCm(row.querySelector('.p-width')?.value);
    const height = normalizeDimensionToCm(row.querySelector('.p-height')?.value);
    const weight = normalizeWeightToKg(row.querySelector('.p-weight')?.value);
    const qty = parseInt(row.querySelector('.p-qty')?.value,10) || 1;
    if(!length || !width || !height || !weight){
      return null;
    }
    return {length, width, height, weight, quantity: qty};
  }).filter(Boolean);
}
function fillFormFromParsedData(parsed){
  parsedDataCache = parsed;
  if(!parsed) {
    parcelsSetByParsed = false;
    return;
  }
  const {customer, supplier, products, parcels, productDescription} = parsed;
  if(customer && customer.name && customerNameInputEl){
    customerNameInputEl.value = customer.name;
  }
  if(customer && (customer.name || customer.company)){
    applyCustomerClassification(customer.name || customer.company || '', productDescription || '');
  }
  if(customer){
    setPhoneField(customerPhoneEl, customerPhoneFlagEl, customer.phone || '', customer.country || 'yemen');
  }
  if(customer && customer.country && originCountryEl){
    const matched = findCountryOption(originCountryEl, customer.country);
    if(matched){
      originCountryEl.value = matched.value || matched.text;
      originCountryEl.dispatchEvent(new Event('change'));
    }
  }
  const parsedGoodsAnalysis = analyzeGoodsContent(productDescription || lastExtractedText || '');
  if(parsedGoodsAnalysis.summary){
    setProductDescriptionAuto(parsedGoodsAnalysis.summary, 'parsed');
    setSmartAlertSource('description', parsedGoodsAnalysis.alerts);
  } else if(productDescription){
    setProductDescriptionAuto(productDescription, 'parsed');
    setSmartAlertSource('description', []);
  } else {
    setSmartAlertSource('description', []);
  }
  if(Array.isArray(parcels) && parcels.length){
    setParcels(parcels, {fromParsed:true});
  } else {
    parcelsSetByParsed = false;
  }
  if(supplier){
    if(supplierNameEl && supplier.name) supplierNameEl.value = supplier.name;
    if(supplierContactEl && (supplier.contact || supplier.contactPerson || supplier.contact_person)){
      const contactValue = supplier.contact || supplier.contactPerson || supplier.contact_person;
      supplierContactEl.value = contactValue;
    }
    if(supplierContactEl && !supplierContactEl.value && parsedDataCache?.supplier?.contact){
      supplierContactEl.value = parsedDataCache.supplier.contact;
    }
    const fallbackSupplierContact = supplier.supplierContact || supplier.supplier_contact || supplier.supplier_contact_person;
    if(supplierContactEl && fallbackSupplierContact && !supplierContactEl.value){
      supplierContactEl.value = fallbackSupplierContact;
    }
    if(supplierCountryEl && supplier.country && !/اليمن|yemen/i.test(supplier.country)) supplierCountryEl.value = supplier.country;
    if(supplierAddressEl && supplier.address && !/اليمن|yemen/i.test(supplier.address)){
      const consigneeAddress = (customer && (customer.address || customer.location)) ? normalizeForMatching(customer.address || customer.location) : '';
      if(!consigneeAddress || normalizeForMatching(supplier.address) !== consigneeAddress){
        supplierAddressEl.value = supplier.address;
      }
    }
    if(supplierEmailEl && supplier.email) supplierEmailEl.value = supplier.email;
    if(supplierPhoneEl){
      setPhoneField(supplierPhoneEl, supplierPhoneFlagEl, supplier.phone || '', supplier.country || 'china');
    }
    applySupplierCountryAutofill(supplier.address, supplier.name, supplier.country);
    if(supplier.address){
      ensureAutoOriginLocation(supplier.address, supplier.country || supplier.name);
    }
  }
  if(products && products.length){
    // Attempt to infer product type if not set
    inferProductTypeFromProducts(products);
  }
  if(!currentOriginLocation){
    ensureAutoOriginLocation(null, (supplier && supplier.country) || (customer && customer.country) || '');
  }
}

function inferProductTypeFromProducts(products){
  if(!products || !products.length || !productTypeEl) return;
  const options = Array.from(productTypeEl.options).map(opt => opt.text);
  if(!options.length) return;
  const productList = window.__WEPS_PRODUCTS || [];
  const counts = {};
  products.forEach(prod=>{
    const combined = `${prod.name || ''} ${prod.category || ''} ${prod.hsCode || ''}`.toLowerCase();
    if(!combined.trim()) return;
    options.forEach(optionText=>{
      const normOption = optionText.toLowerCase();
      if(combined.includes(normOption)){
        counts[optionText] = (counts[optionText] || 0) + 1;
      }
    });
    productList.forEach(p=>{
      if(!p.product) return;
      const normProduct = p.product.toLowerCase();
      if(combined.includes(normProduct)){
        counts[p.product] = (counts[p.product] || 0) + 1;
      }
    });
  });
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  if(top && top[0]){
    productTypeEl.value = top[0];
    productTypeEl.dispatchEvent(new Event('change'));
  }
}
function inferProductTypeFromText(rawText){
  if(!productTypeEl || productTypeEl.dataset.manual === 'true' || (productTypeEl.value && productTypeEl.value.trim())) return;
  const text = (rawText || '').toLowerCase();
  if(!text.trim()) return;
  const mapping = [
    {pattern: /(laptop|computer|electronics|pcb|chip|sensor|tablet|phone|iphone|camera|drone)/, value:'إلكترونيات'},
    {pattern: /(garment|apparel|clothing|t-shirt|pants|dress|fashion|jersey|hoodie|shoes|sneaker|socks|قميص|بنطلون|ملابس|أزياء)/, value:'ملابس'},
    {pattern: /(machine|machinery|industrial|pump|valve|compressor|bearing|gear|motor|equipment|معدات صناعية|ماكينة|آلة)/, value:'معدات صناعية'},
    {pattern: /(spare part|auto part|قطع غيار|car part|engine part)/, value:'قطع غيار'},
    {pattern: /(food|beverage|coffee|tea|spice|meat|chocolate|biscuits|snack|مواد غذائية|قهوة|شاي|توابل|تمر|حلويات)/, value:'مواد غذائية'},
    {pattern: /(medical|clinic|dental|hospital|pharma|syringe|gloves|mask|معدات طبية|أجهزة طبية|تحليل مخبري)/, value:'معدات طبية'},
    {pattern: /(cosmetic|beauty|makeup|perfume|fragrance|skincare|مستحضرات تجميل|عطور|عناية)/, value:'مستحضرات تجميل'},
    {pattern: /(furniture|desk|chair|sofa|bed|cabinet|wardrobe|أثاث|طاولة|كرسي)/, value:'أثاث'},
    {pattern: /(appliance|air conditioner|refrigerator|microwave|oven|washing machine|dryer|electrical|أجهزة كهربائية|مكيف|ثلاجة)/, value:'أجهزة كهربائية'},
    {pattern: /(building material|ceramic|tile|cement|paint|construction|مواد بناء|بلاط|سيراميك)/, value:'مواد بناء'},
    {pattern: /(toy|game|puzzle|lego|toys|ألعاب|مجسمات)/, value:'ألعاب'},
    {pattern: /(book|magazine|catalog|brochure|نشرة|مجلة|كتب)/, value:'كتب ومجلات'},
    {pattern: /(houseware|kitchen|cookware|utensil|منزلي|أدوات منزلية|مطبخية)/, value:'أدوات منزلية'}
  ];
  const match = mapping.find(entry=>entry.pattern.test(text));
  if(match && match.value){
    productTypeEl.value = match.value;
    productTypeEl.dataset.autoAssign = '1';
    productTypeEl.dispatchEvent(new Event('change'));
  }
}

function setAutoFieldValue(el, value, options = {}){
  if(!el || value === undefined || value === null) return;
  const text = String(value).trim();
  if(!text) return;
  if(!el.value || el.dataset.autoFilled === 'true'){
    el.value = text;
    el.dataset.autoFilled = 'true';
    if(options.triggerChange){
      el.dispatchEvent(new Event('change'));
    }
  }
}

function extractPhoneFromText(text){
  if(!text) return '';
  const match = text.match(/(\+?\d[\d\s\-().]{6,})/);
  if(match){
    return match[1].replace(/\s+/g,' ').trim();
  }
  return '';
}

function selectOptionByText(selectEl, text){
  if(!selectEl || !text) return false;
  const normText = normalizeStr(text);
  const option = Array.from(selectEl.options).find(opt => normalizeStr(opt.value || opt.text) === normText);
  if(option){
    selectEl.value = option.value || option.text;
    selectEl.dispatchEvent(new Event('change'));
    return true;
  }
  const fuzzy = Array.from(selectEl.options).find(opt => {
    const optNorm = normalizeStr(opt.value || opt.text);
    return normText.includes(optNorm) || optNorm.includes(normText);
  });
  if(fuzzy){
    selectEl.value = fuzzy.value || fuzzy.text;
    selectEl.dispatchEvent(new Event('change'));
    return true;
  }
  return false;
}

function matchCountryFromText(text){
  if(!originCountryEl || !text) return null;
  return findCountryOption(originCountryEl, text);
}

function extractSectionBlock(lines, keywords){
  if(!Array.isArray(lines) || !lines.length) return null;
  const keywordRegex = new RegExp(`^(${keywords.join('|')})[\\s:]*`, 'i');
  const stopRegex = /^(shipper|supplier|exporter|consignor|consignee|buyer|importer|notify|invoice|packing|description|item|marks|packages?|container|totals?|weight|dimension|qty|quantity|order|po|model|part)/i;
  for(let i=0;i<lines.length;i++){
    const line = lines[i];
    if(keywordRegex.test(line)){
      const block = [];
      const after = line.replace(keywordRegex,'').trim();
      if(after){
        block.push(after);
      }
      let j=i+1;
      while(j < lines.length){
        const candidate = lines[j];
        if(!candidate || stopRegex.test(candidate)){
          break;
        }
        block.push(candidate);
        j++;
      }
      return {block, start:i};
    }
  }
  return null;
}

function parseEntityBlock(blockLines){
  const lines = (blockLines || []).map(l=>l.trim()).filter(Boolean);
  if(!lines.length) return {};
  const phone = extractPhoneFromText(lines.join(' '));
  const name = lines[0];
  const address = lines.slice(1).join(' ');
  return {name, phone, address, raw: lines.join(' ')};
}

function pickCountryFromBlock(blockText){
  if(!blockText) return '';
  const candidate = matchCountryFromText(blockText);
  return candidate ? candidate.text || candidate.value : '';
}

function inferDestinationCityFromText(text){
  if(!destCityEl || !text) return;
  const options = Array.from(destCityEl.options || []);
  const normText = normalizeStr(text);
  for(const opt of options){
    const optNorm = normalizeStr(opt.value || opt.text);
    if(!optNorm) continue;
    if(normText.includes(optNorm) || optNorm.includes(normText)){
      if(destCityEl.value !== opt.value){
        destCityEl.value = opt.value || opt.text;
        destCityEl.dispatchEvent(new Event('change'));
      }
      break;
    }
  }
}

function applyTextFallbacks(rawText){
  if(!rawText) return;
  inferEntitiesFromText(rawText);
  const fallbackParcels = inferParcelsFromText(rawText);
  if(fallbackParcels.length){
    const existingParcels = readParcelsFromUI();
    const mergedParcels = combineSimilarParcels([...existingParcels, ...fallbackParcels]);
    if(mergedParcels.length){
      parcelsSetByParsed = true;
      setParcels(mergedParcels, {fromParsed:true});
    }
  }
}

function inferEntitiesFromText(rawText){
  if(!rawText) return;
  const lines = rawText.split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
  if(!lines.length) return;
  const supplierBlock = extractSectionBlock(lines, ['shipper','supplier','exporter','consignor']);
  if(supplierBlock){
    const supplierEntity = parseEntityBlock(supplierBlock.block);
    setAutoFieldValue(supplierNameEl, supplierEntity.name);
    if(supplierEntity.phone){
      setPhoneField(supplierPhoneEl, supplierPhoneFlagEl, supplierEntity.phone, supplierCountryEl?.value || 'china');
    }
    if(supplierEntity.address){
      setAutoFieldValue(supplierAddressEl, supplierEntity.address);
      ensureAutoOriginLocation(supplierEntity.address, supplierEntity.raw);
    }
    const countryCandidate = pickCountryFromBlock(supplierEntity.raw);
    if(countryCandidate){
      const matched = findCountryOption(originCountryEl, countryCandidate);
      if(matched){
        originCountryEl.value = matched.value || matched.text;
        originCountryEl.dispatchEvent(new Event('change'));
      }
      setAutoFieldValue(supplierCountryEl, matched?.text || countryCandidate);
    }
  }

  const consigneeBlock = extractSectionBlock(lines, ['consignee','ship to','buyer','importer','deliver to']);
  if(consigneeBlock){
    const consigneeEntity = parseEntityBlock(consigneeBlock.block);
    setAutoFieldValue(customerNameInputEl, consigneeEntity.name);
    if(consigneeEntity.phone){
      setPhoneField(customerPhoneEl, customerPhoneFlagEl, consigneeEntity.phone, parsedDataCache?.customer?.country || 'yemen');
    }
    if(consigneeEntity.address){
      if(deliveryLocationDisplay){
        deliveryLocationDisplay.innerText = consigneeEntity.address;
      }
    }
    const destCandidate = pickCountryFromBlock(consigneeEntity.raw);
    if(destCandidate){
      inferDestinationCityFromText(destCandidate);
    } else {
      inferDestinationCityFromText(consigneeEntity.raw);
    }
  }

  const originBlock = extractSectionBlock(lines, ['country of origin','origin','port of loading','place of receipt','loading port']);
  if(originBlock){
    const originText = originBlock.block.join(' ');
    const matched = findCountryOption(originCountryEl, originText);
    if(matched){
      originCountryEl.value = matched.value || matched.text;
      originCountryEl.dispatchEvent(new Event('change'));
    }
    ensureAutoOriginLocation(originText, originText);
  }

  const destinationBlock = extractSectionBlock(lines, ['destination','port of discharge','place of delivery','delivery address','delivery city']);
  if(destinationBlock){
    inferDestinationCityFromText(destinationBlock.block.join(' '));
  }

  const phoneMatches = rawText.match(/(?:tel|phone|mobile|جوال|هاتف)\s*[:\-]?\s*(\+?\d[\d\s\-().]{6,})/gi);
  if(phoneMatches && phoneMatches.length){
    const customerPhone = extractPhoneFromText(phoneMatches[0]);
    if(customerPhone){
      setPhoneField(customerPhoneEl, customerPhoneFlagEl, customerPhone, parsedDataCache?.customer?.country || 'yemen');
    }
    if(phoneMatches[1]){
      const supplierPhone = extractPhoneFromText(phoneMatches[1]);
      if(supplierPhone){
        setPhoneField(supplierPhoneEl, supplierPhoneFlagEl, supplierPhone, parsedDataCache?.supplier?.country || 'china');
      }
    }
  }

  inferDestinationCityFromText(rawText);
}
function handleAgentSchemaResult(data){
  if(!data || typeof data !== 'object') return;
  const rawDescription = data.shipment_description || data.notes || '';
  const goodsAnalysis = analyzeGoodsContent(rawDescription || lastExtractedText || '');
  const classificationSnapshot = classifyCustomer(data.consignee_name || '', rawDescription);
  const enhancedPayload = Object.assign({}, data);
  if(goodsAnalysis.summary){
    enhancedPayload.shipment_description = goodsAnalysis.summary;
  }
  lastAnalysisResult = enhancedPayload;
  renderAnalysisOutput(enhancedPayload, {
    source: 'openai-agent',
    timestamp: new Date().toISOString(),
    extraction: lastExtractionMeta || {},
    customerClassification: classificationSnapshot,
    goodsSummary: goodsAnalysis.summary,
    regulatoryAlerts: goodsAnalysis.alerts
  });

  const parsedProductsSummary = parsedDataCache?.products?.length ? buildProductDescriptionFromParsed(parsedDataCache.products) : '';
  const descriptionSegments = [];
  if(parsedProductsSummary){
    descriptionSegments.push(parsedProductsSummary);
  }
  if(goodsAnalysis.summary){
    descriptionSegments.push(goodsAnalysis.summary);
  } else if(rawDescription){
    descriptionSegments.push(sanitizeAgentText(rawDescription));
  }
  if(data.shipment_description && data.shipment_description !== goodsAnalysis.summary){
    descriptionSegments.push(sanitizeAgentText(data.shipment_description));
  }
  const finalDescription = Array.from(new Set(descriptionSegments.filter(Boolean))).join(' | ');
  if(finalDescription){
    setProductDescriptionAuto(finalDescription, 'analysis');
  }

  if(productTypeEl && (!productTypeEl.value || productTypeEl.dataset.autoAssign === '1')){
    inferProductTypeFromText(`${finalDescription || ''} ${rawDescription || ''} ${combinedExtractedText || lastExtractedText || ''}`);
  }

  applyCustomerClassification(data.consignee_name || '', rawDescription, classificationSnapshot);
  setSmartAlertSource('description', goodsAnalysis.alerts);

  const consigneePhone = sanitizeAgentText(data.consignee_phone);
  if(consigneePhone){
    setPhoneField(customerPhoneEl, customerPhoneFlagEl, consigneePhone, parsedDataCache?.customer?.country || 'yemen');
  }

  const supplierName = sanitizeAgentText(data.supplier_name);
  if(supplierName && supplierNameEl){
    supplierNameEl.value = supplierName;
  }

  if(typeof data.invoice_value_usd === 'number' && itemValueEl){
    itemValueEl.value = data.invoice_value_usd.toFixed(2);
  }

  if(data.customer && typeof data.customer === 'object'){
    if(data.customer.name){
      setAutoFieldValue(customerNameInputEl, data.customer.name);
    }
    if(data.customer.phone){
      setPhoneField(customerPhoneEl, customerPhoneFlagEl, data.customer.phone, data.customer.country || 'yemen');
    }
  }

  const supplierPhone = sanitizeAgentText(data.supplier_phone);
  if(supplierPhone && supplierPhoneEl){
    setPhoneField(supplierPhoneEl, supplierPhoneFlagEl, supplierPhone, parsedDataCache?.supplier?.country || 'china');
  }

  const supplierAddress = sanitizeAgentText(data.supplier_address);
  if(supplierAddress && supplierAddressEl){
    supplierAddressEl.value = supplierAddress;
  }
  applySupplierCountryAutofill(data.supplier_address, data.supplier_name, data.supplier?.country);
  ensureAutoOriginLocation(
    data.supplier_address || data.shipment_address || data.shipmentAddress || '',
    data.supplier?.country || data.supplier_address || data.supplier_name
  );
  const numberOfPackages = sanitizeAgentText(data.number_of_packages);
  const packageCount = parseInteger(numberOfPackages) || 0;
  const dimensionEntries = parsePackageDimensionEntries(data.package_dimensions);
  const weightEntries = parseWeightSegments(data.total_weight_per_package);
  const grossWeightEntries = weightEntries.filter(entry => entry.kind === 'gross' && entry.value !== null);
  const usableWeightEntries = (grossWeightEntries.length ? grossWeightEntries : weightEntries.filter(entry => entry.kind !== 'net' && entry.value !== null));
  const fallbackWeightEntries = usableWeightEntries.length ? usableWeightEntries : weightEntries.filter(entry => entry.value !== null);
  const parcels = [];

  if(dimensionEntries.length){
    dimensionEntries.forEach((entry, idx)=>{
      const weightEntry =
        grossWeightEntries[idx] || grossWeightEntries[0] ||
        usableWeightEntries[idx] || usableWeightEntries[0] ||
        fallbackWeightEntries[idx] || fallbackWeightEntries[0] ||
        null;
      const weightValue = weightEntry && weightEntry.value !== null ? weightEntry.value : '';
      if(!weightValue){
        return;
      }
      parcels.push({
        length: entry.length || '',
        width: entry.width || '',
        height: entry.height || '',
        weight: weightValue,
        quantity: entry.quantity || weightEntry?.quantity || 0
      });
    });
  } else if(fallbackWeightEntries.length){
    fallbackWeightEntries.forEach(entry=>{
      if(entry.value === null){
        return;
      }
      parcels.push({
        length: '',
        width: '',
        height: '',
        weight: entry.value !== null ? entry.value : '',
        quantity: entry.quantity || 0
      });
    });
  }

  let normalizedParcels = combineSimilarParcels(parcels);
  const inferredFromText = inferParcelsFromText(`${data.package_dimensions || ''}\n${data.total_weight_per_package || ''}\n${combinedExtractedText || lastExtractedText || ''}`);
  if(inferredFromText.length){
    normalizedParcels = combineSimilarParcels([...normalizedParcels, ...inferredFromText]);
  }
  if(!normalizedParcels.length && (packageCount > 0 || weightEntries.length || dimensionEntries.length)){
    normalizedParcels = [{
      length: normalizeDimensionToCm(dimensionEntries[0]?.length || ''),
      width: normalizeDimensionToCm(dimensionEntries[0]?.width || ''),
      height: normalizeDimensionToCm(dimensionEntries[0]?.height || ''),
      weight: normalizeWeightToKg(weightEntries[0]?.value !== null ? weightEntries[0].value : ''),
      quantity: packageCount > 0 ? packageCount : 1
    }];
  }
  if(normalizedParcels.length){
    normalizedParcels.forEach(parcel=>{
      if(!parcel.quantity || parcel.quantity <= 0) parcel.quantity = 1;
    });
    normalizedParcels = collapseParcelsByDimensions(normalizedParcels);
    parcelsSetByParsed = true;
    setParcels(normalizedParcels, {fromParsed:true});
  } else {
    parcelsSetByParsed = false;
  }

  if(numberOfPackages && !isNaN(packageCount) && packageCount > 0){
    showToast('info', 'تم استخراج البيانات', `عدد الطرود: ${packageCount}`);
  }

  if(data.destination_city){
    selectOptionByText(destCityEl, data.destination_city);
  }

  if(data.originCountry || data.origin_country){
    const candidate = data.originCountry || data.origin_country;
    const matchedOption = findCountryOption(originCountryEl, candidate);
    if(matchedOption){
      originCountryEl.value = matchedOption.value || matchedOption.text;
      originCountryEl.dispatchEvent(new Event('change'));
    }
  }

  const supplierData = (data.supplier && typeof data.supplier === 'object') ? data.supplier : {};
  const structuredCountry = supplierData.country || supplierData.countryName;
  if(supplierCountryEl && structuredCountry && !/اليمن|yemen/i.test(structuredCountry)){
    supplierCountryEl.value = structuredCountry;
  }
  const structuredContact = supplierData.contact || supplierData.contactPerson || supplierData.contact_person;
  if(supplierContactEl && structuredContact){
    supplierContactEl.value = structuredContact;
  }
  const topLevelSupplierContact = sanitizeAgentText(data.supplier_contact || data.supplier_contact_person || '');
  if(topLevelSupplierContact && supplierContactEl && !supplierContactEl.value){
    supplierContactEl.value = topLevelSupplierContact;
  }
  const fallbackSupplierContact = data.supplierContact || data.supplier_contact || data.supplier_contact_person;
  if(supplierContactEl && fallbackSupplierContact && !supplierContactEl.value){
    supplierContactEl.value = fallbackSupplierContact;
  }
  const structuredAddress = supplierData.address;

  const supplier = supplierData;
  const supplierCards = [
    {label:'اسم المورد', value: supplier.name},
    {label:'شخص التواصل', value: supplier.contact},
    {label:'هاتف المورد', value: supplier.phone},
    {label:'البريد الإلكتروني', value: supplier.email},
    {label:'الدولة', value: supplier.country},
    {label:'العنوان', value: supplier.address}
  ].map(item=>`<div class="info-card"><span class="label">${item.label}</span><span class="value">${escapeHtml(item.value)}</span></div>`).join('');

  const pickup = (data.pickupLocation && typeof data.pickupLocation === 'object')
    ? data.pickupLocation
    : data.originLocation || null;
  if(pickup){
    if(pickup.lat !== undefined && pickup.lng !== undefined){
      setOriginMarker(pickup.lng, pickup.lat, pickup.label || 'موقع الشحنة');
    } else {
      ensureAutoOriginLocation(pickup, pickup.country || '');
    }
  }
  const pickupCards = pickup
    ? `<div class="info-card"><span class="label">الوصف</span><span class="value">${escapeHtml(pickup.label || pickup.description || '---')}</span></div>
       <div class="info-card"><span class="label">الإحداثيات</span><span class="value">${pickup.lat && pickup.lng ? `${Number(pickup.lat).toFixed(5)}, ${Number(pickup.lng).toFixed(5)}` : '---'}</span></div>`
    : `<div class="info-card"><span class="label">الموقع</span><span class="value">لم يتم تحديد موقع الالتقاط.</span></div>`;

  const supplierInfoEl = document.getElementById('supplierInfo');
  if(supplierInfoEl){
    supplierInfoEl.innerHTML = supplierCards;
  }
  const pickupInfoEl = document.getElementById('pickupInfo');
  if(pickupInfoEl){
    pickupInfoEl.innerHTML = pickupCards;
  }

  let parcelRows = '';
  (data.parcels||[]).forEach(p=>{
    const volumetric = p.volWeight && p.volWeight.toFixed ? p.volWeight.toFixed(2) : (p.volWeight || 0);
    parcelRows += `<tr><td>${escapeHtml(p.index)}</td><td>${escapeHtml(p.length)}</td><td>${escapeHtml(p.width)}</td><td>${escapeHtml(p.height)}</td><td>${escapeHtml(p.actual)}</td><td>${escapeHtml(volumetric)}</td></tr>`;
  });
  if(!parcelRows){
    parcelRows = `<tr><td colspan="6" style="padding:8px;border:1px solid #e2e8f0;text-align:center">لا توجد طرود مفصلة</td></tr>`;
  }
}
function findCountryOption(selectEl, countryName){
  if(!selectEl || !countryName) return null;
  const options = Array.from(selectEl.options);
  if(!options.length) return null;
  const norm = normalizeStr(countryName);
  let matched = options.find(opt => normalizeStr(opt.text) === norm);
  if(matched) return matched;
  if(COUNTRY_SYNONYMS[norm]){
    const target = COUNTRY_SYNONYMS[norm];
    matched = options.find(opt => {
      const optNorm = normalizeStr(opt.text);
      return optNorm === target || optNorm.includes(target) || target.includes(optNorm);
    });
    if(matched) return matched;
  }
  matched = options.find(opt => {
    const optNorm = normalizeStr(opt.text);
    return optNorm.includes(norm) || norm.includes(optNorm);
  });
  if(matched) return matched;
  // Try to match English representations from Monday cache if available
  if(window.__WEPS_COUNTRIES){
    const found = window.__WEPS_COUNTRIES.find(c => {
      const normCountry = normalizeStr(c.country);
      return normCountry === norm || normCountry.includes(norm) || norm.includes(normCountry);
    });
    if(found){
      const opt = options.find(opt => normalizeStr(opt.text) === normalizeStr(found.country));
      if(opt) return opt;
    }
  }
  return null;
}
function normalizeForMatching(text){
  return (text || '').toString().toLowerCase().replace(/[^\w\s\u0600-\u06FF]+/g,' ').replace(/\s+/g,' ').trim();
}

function autoSelectProductTypeFromDescription(description){
  if(!description || !productTypeEl) return;
  if(productTypeEl.dataset.manual === 'true') return;
  const descNorm = normalizeForMatching(description);
  if(!descNorm) return;
  const descTokens = Array.from(new Set(descNorm.split(' ').filter(token => token.length > 2)));
  const products = window.__WEPS_PRODUCTS || [];
  if(!products.length){
    pendingProductDescriptionForAutoSelect = description;
    return;
  }
  let bestMatch = null;
  let bestScore = 0;
  const evaluateRow = (row) =>{
    if(!row) return 0;
    const nameNorm = normalizeForMatching(row.product || '');
    if(!nameNorm) return 0;
    const tokens = Array.from(new Set(nameNorm.split(' ').filter(token => token.length > 2)));
    let score = 0;
    tokens.forEach(token => {
      if(descTokens.includes(token)) score += token.length * 2;
      else if(descNorm.includes(token)) score += token.length;
    });
    const keywordNorm = normalizeForMatching(row.keywords || row.category || '');
    if(keywordNorm){
      keywordNorm.split(' ').forEach(token => {
        if(token.length > 2 && descNorm.includes(token)) score += token.length;
      });
    }
    return score;
  };
  products.forEach(row =>{
    const score = evaluateRow(row);
    if(score > bestScore){
      bestScore = score;
      bestMatch = row;
    }
  });
  if(bestMatch && bestScore > 0){
    const targetValue = bestMatch.product;
    const option = Array.from(productTypeEl.options).find(opt => normalizeForMatching(opt.text) === normalizeForMatching(targetValue));
    if(option){
      pendingProductDescriptionForAutoSelect = '';
      productTypeEl.dataset.autoAssign = '1';
      productTypeEl.value = option.value || option.text;
      productTypeEl.dispatchEvent(new Event('change'));
      requestAnimationFrame(()=> delete productTypeEl.dataset.autoAssign);
    }
  } else {
    pendingProductDescriptionForAutoSelect = description;
  }
}
const customerTypeEl = document.getElementById('customerType');
const companyNameField = document.getElementById('companyNameField');
const companyNameEl = document.getElementById('companyName');

const inputError = document.getElementById('inputError');

/* Delivery elements */
const deliveryForSanaa = document.getElementById('deliveryForSanaa');
const deliveryForOther = document.getElementById('deliveryForOther');
const useMyLocationBtn = document.getElementById('useMyLocationBtn');
const confirmLocationBtn = document.getElementById('confirmLocationBtn');
const deliveryLocationDisplay = document.getElementById('deliveryLocationDisplay');
const deliveryLocationInput = document.getElementById('deliveryLocation');

document.getElementById('yearNow').innerText = new Date().getFullYear();

/* ==== Monday bootstrap ==== */
document.addEventListener('DOMContentLoaded', ()=> {
  populateDropdownsFromMonday();
  document.getElementById('refreshMondayBtn').addEventListener('click', populateDropdownsFromMonday);
  setTimeout(()=> initOriginMap(), 100);
  initVASBindings();
  // initDiscountBindings() and enforceRestrictedDiscounts() removed
  updateServiceExplanation();
  updateServicePriorityDescription();
  refreshWarehouseSelect({ preserveSelection: false });
  updateWarehouseNoticeText();
  initStepAccordions();
  
  // Add service type description listener
  const serviceTypeEl = document.getElementById('serviceType');
  const serviceTypeDescEl = document.getElementById('serviceTypeDescription');
  
  if(serviceTypeEl && serviceTypeDescEl) {
    const serviceDescriptions = {
      'express_yemen': '⚡ أسرع خيار - توصيل مباشر إلى اليمن في 7-10 أيام',
      'air_eco_uae_oman_truck_yemen': '✈️ توازن مثالي بين السعر والسرعة - 15-20 يوم',
      'air_aden_via_eg_jo': '🛫 خيار ممتاز لعدن والمناطق الجنوبية - 12-18 يوم',
      'sea_kg_via_uae_truck_yemen': '🚢 اقتصادي للأوزان المتوسطة - 35-45 يوم',
      'sea_cbm_via_uae_truck_yemen': '⛴️ الأفضل للشحنات الكبيرة - 30-40 يوم',
      'sea_cbm_direct_aden_mukalla': '🚤 الأرخص للشحنات الكبيرة إلى الجنوب - 40-50 يوم'
    };
    
    serviceTypeEl.addEventListener('change', function() {
      serviceTypeDescEl.textContent = serviceDescriptions[this.value] || '';
    });
    
    // عرض الوصف الافتراضي
    if(serviceTypeEl.value) {
      serviceTypeDescEl.textContent = serviceDescriptions[serviceTypeEl.value] || '';
    }
  }
});
/* ==== UI bindings ==== */
btnQuick.addEventListener('click', ()=>{ quickForm.style.display='block'; fullForm.style.display='none'; btnQuick.setAttribute('aria-pressed','true'); btnFull.setAttribute('aria-pressed','false'); });
btnFull.addEventListener('click', ()=>{ quickForm.style.display='none'; fullForm.style.display='block'; btnFull.setAttribute('aria-pressed','true'); btnQuick.setAttribute('aria-pressed','false'); });

toFull && toFull.addEventListener('click', ()=> btnFull.click());

customerTypeEl.addEventListener('change', ()=>{ 
  if(requiresCompanyName(customerTypeEl.value)){ 
    companyNameField.style.display='block'; 
    companyNameEl.required=true; 
  } else { 
    companyNameField.style.display='none'; 
    companyNameEl.required=false; 
  } 
});

document.getElementById('addParcel').addEventListener('click', ()=>{
  const div = document.createElement('div');
  div.className='parcel';
  div.innerHTML = `
    <div class="parcel-field">
      <label>L (سم)</label>
      <input class="p-length" type="number" placeholder="مثال: 50"/>
    </div>
    <div class="parcel-field">
      <label>W (سم)</label>
      <input class="p-width" type="number" placeholder="مثال: 40"/>
    </div>
    <div class="parcel-field">
      <label>H (سم)</label>
      <input class="p-height" type="number" placeholder="مثال: 30"/>
    </div>
    <div class="parcel-field">
      <label>KG</label>
      <input class="p-weight" type="number" placeholder="مثال: 12.5"/>
    </div>
    <input class="p-qty" type="hidden" value="1"/>
    <button type="button" class="add-btn remove">×</button>
  `;
  parcelsArea.appendChild(div);
  div.querySelector('.remove').addEventListener('click', ()=>div.remove());
});

shipmentState.addEventListener('change', ()=>{ if(shipmentState.value === 'not_ready'){ notReadyBlock.style.display='block'; readyBlock.style.display='none'; } else{ notReadyBlock.style.display='none'; readyBlock.style.display='block'; } });
pickupOption.addEventListener('change', ()=>{ 
  const isPickup = pickupOption.value === 'pickup';
  if(pickupDetails){
    pickupDetails.style.display = isPickup ? 'block' : 'none';
  }
  if(warehouseDetails){
    warehouseDetails.style.display = isPickup ? 'none' : 'block';
  }
  if(supplierInfo){
    supplierInfo.style.display = isPickup ? 'block' : 'none';
  }
  if(!isPickup){
    selectedWarehouseKey = '';
    updateWarehouseAddressDisplay();
    refreshWarehouseSelect({ preserveSelection: false });
  } else {
    selectedWarehouseKey = '';
    updateWarehouseNoticeText();
    clearRouteDistanceDisplay();
  }
  updateWarehouseGuidanceDisplay(null, originCountryEl?.value || '');
});

if(customerPhoneEl){
  customerPhoneEl.addEventListener('input', ()=>updatePhoneFlag(customerPhoneEl, customerPhoneFlagEl, parsedDataCache?.customer?.country || 'yemen'));
  customerPhoneEl.addEventListener('blur', ()=>setPhoneField(customerPhoneEl, customerPhoneFlagEl, customerPhoneEl.value, parsedDataCache?.customer?.country || 'yemen'));
}
if(supplierPhoneEl){
  supplierPhoneEl.addEventListener('input', ()=>updatePhoneFlag(supplierPhoneEl, supplierPhoneFlagEl, parsedDataCache?.supplier?.country || 'china'));
  supplierPhoneEl.addEventListener('blur', ()=>setPhoneField(supplierPhoneEl, supplierPhoneFlagEl, supplierPhoneEl.value, parsedDataCache?.supplier?.country || 'china'));
}
if(productDescInputEl){
  productDescInputEl.addEventListener('input', ()=>{
    productDescInputEl.dataset.autofill = 'manual';
  });
}
if(serviceTypeEl){
  serviceTypeEl.addEventListener('change', updateServiceExplanation);
}
if(servicePriorityEl){
  servicePriorityEl.addEventListener('change', updateServicePriorityDescription);
}
if(copyWarehouseGuidanceBtn){
  copyWarehouseGuidanceBtn.addEventListener('click', async ()=>{
    if(!currentWarehouseGuidanceText){
      showToast('info','لا توجد تعليمات','اختر مخزناً لعرض تعليمات المورد.');
      return;
    }
    try{
      await navigator.clipboard.writeText(currentWarehouseGuidanceText);
      showToast('success','تم النسخ','تم نسخ تعليمات المورد إلى الحافظة.');
    }catch(err){
      console.warn('Clipboard copy failed:', err);
      showToast('error','تعذّر النسخ','يرجى نسخ التعليمات يدوياً من النافذة الظاهرة.');
    }
  });
}
if(downloadWarehouseGuidanceBtn){
  downloadWarehouseGuidanceBtn.addEventListener('click', ()=>{
    if(!currentWarehouseGuidanceText){
      showToast('info','لا توجد تعليمات','اختر مخزناً لعرض تعليمات المورد.');
      return;
    }
    const fileName = `تعليمات_${(currentNearestWarehouse?.name || 'warehouse')}.txt`.replace(/\s+/g,'_');
    const blob = new Blob([currentWarehouseGuidanceText], { type:'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(()=>URL.revokeObjectURL(link.href), 2000);
  });
}
const includeAllServicesReportCheckbox = document.getElementById('includeAllServicesReport');
if(typeof window.__includeAllServicesInReport === 'undefined'){
  window.__includeAllServicesInReport = includeAllServicesReportCheckbox ? includeAllServicesReportCheckbox.checked : true;
}
if(includeAllServicesReportCheckbox){
  includeAllServicesReportCheckbox.addEventListener('change', ()=>{
    window.__includeAllServicesInReport = includeAllServicesReportCheckbox.checked;
  });
}

/* ====== Update Warehouse Address Display ====== */
function updateWarehouseAddressDisplay(){
  const warehouseAddressSection = document.getElementById('warehouseAddressSection');
  const bookingRequiredNotice = document.getElementById('bookingRequiredNotice');
  const warehouseAddressDisplay = document.getElementById('warehouseAddressDisplay');
  const warehouseDXBDisplay = document.getElementById('warehouseDXBDisplay');
  const warehouseInstruction = document.getElementById('warehouseInstruction');
  const routeSummaryEl = document.getElementById('warehouseRouteSummary');
  
  if(!warehouseDetails || warehouseDetails.style.display === 'none'){
    warehouseAddressSection.style.display = 'none';
    bookingRequiredNotice.style.display = 'none';
    if(routeSummaryEl){
      routeSummaryEl.style.display = 'none';
      routeSummaryEl.textContent = '';
    }
    if(warehouseInstruction){
      warehouseInstruction.style.display = 'none';
      warehouseInstruction.textContent = '';
    }
    updateWarehouseGuidanceDisplay(null, originCountryEl?.value || '');
    return;
  }
  
  const itemValue = parseFloat(itemValueEl.value) || 0;
  const country = originCountryEl.value || '';
  const isChina = country === "CN" || country === "الصين";
  
  // Determine recommended warehouse by location or country fallback
  const originLocation = document.getElementById('originLocation').value;
  let recommendedWarehouse = null;
  if(originLocation){
    try{
      const location = JSON.parse(originLocation);
      if(location && typeof location.lat === 'number' && typeof location.lng === 'number'){
        recommendedWarehouse = findNearestWarehouse(location.lat, location.lng, country);
      }
    }catch(e){}
  }
  
  if(!recommendedWarehouse){
    const fallbackList = getWarehousesForOrigin(country);
    if(fallbackList.length){
      recommendedWarehouse = fallbackList[0];
    }
  }
  if(recommendedWarehouse){
    recommendedWarehouseKey = buildWarehouseKey(recommendedWarehouse);
    if(recommendedWarehouseKey && !warehouseKeyLookup.has(recommendedWarehouseKey)){
      warehouseKeyLookup.set(recommendedWarehouseKey, recommendedWarehouse);
    }
  }
  
  const previousWarehouseName = currentNearestWarehouse ? currentNearestWarehouse.name : '';
  let activeWarehouse = null;
  if(selectedWarehouseKey && warehouseKeyLookup.has(selectedWarehouseKey)){
    activeWarehouse = Object.assign({}, warehouseKeyLookup.get(selectedWarehouseKey));
  } else if(currentNearestWarehouse){
    activeWarehouse = Object.assign({}, currentNearestWarehouse);
  } else if(recommendedWarehouse){
    activeWarehouse = Object.assign({}, recommendedWarehouse);
  }
  if(activeWarehouse){
    const activeKey = buildWarehouseKey(activeWarehouse);
    if(activeKey && !warehouseKeyLookup.has(activeKey)){
      warehouseKeyLookup.set(activeKey, activeWarehouse);
    }
    if(!previousWarehouseName || previousWarehouseName !== activeWarehouse.name){
      lastComputedRouteKey = '';
    }
    currentNearestWarehouse = Object.assign({}, activeWarehouse);
    if(warehouseSelect && activeKey && warehouseSelect.value !== activeKey && warehouseKeyLookup.has(activeKey)){
      warehouseSelect.value = activeKey;
    }
  } else {
    currentNearestWarehouse = null;
  }
  updateWarehouseNoticeText();
  
  // For shipments > $1000 outside China: show booking notice, hide address
  if(!isChina && itemValue > 1000){
    warehouseAddressSection.style.display = 'none';
    bookingRequiredNotice.style.display = 'block';
    if(routeSummaryEl){
      routeSummaryEl.style.display = 'none';
      routeSummaryEl.textContent = '';
    }
    if(warehouseInstruction){
      warehouseInstruction.style.display = 'none';
      warehouseInstruction.textContent = '';
    }
    updateWarehouseGuidanceDisplay(null, country);
    return;
  }
  
  // For shipments <= $1000 or China: show warehouse address
  if(activeWarehouse){
    warehouseAddressDisplay.innerHTML = `
      <div style="font-weight:700;margin-bottom:4px">${activeWarehouse.name}</div>
      <div style="color:#6b7280">${activeWarehouse.address || '—'}</div>
    `;
    const isShopAndShip = activeWarehouse.name && /Shop\s*&\s*Ship/i.test(activeWarehouse.name);
    if(warehouseDXBDisplay){
      if(isChina){
        warehouseDXBDisplay.textContent = 'AE-WEPS';
      } else {
        warehouseDXBDisplay.textContent = activeWarehouse.dxbNumber || 'DXB-1702964';
      }
    }
    if(warehouseInstruction){
      warehouseInstruction.style.display = 'block';
      if(isChina){
        warehouseInstruction.innerHTML = '📦 يرجى كتابة <strong>AE-WEPS</strong> بوضوح على كل كرتون قبل إرساله إلى المخزن. عدم كتابة الرمز قد يؤخر التخليص.';
      } else if(isShopAndShip){
        warehouseInstruction.innerHTML = '🏷️ تأكد من كتابة رقم <strong>DXB</strong> على الطرد بشكل بارز قبل الشحن لتجنب تأخير أو ضياع الطرد.';
      } else {
        warehouseInstruction.innerHTML = 'ℹ️ تحقق من مطابقة عنوان المخزن على الطرد قبل الإرسال لضمان الاستلام السلس.';
      }
    }
    updateWarehouseGuidanceDisplay(activeWarehouse, country);
    warehouseAddressSection.style.display = 'block';
    bookingRequiredNotice.style.display = 'none';
    const applyRouteSummary = (distanceKm)=>{
      if(!routeSummaryEl) return;
      if(distanceKm){
        updateRouteDistanceDisplay(distanceKm, currentNearestWarehouse?.routeDurationMin);
      } else {
        clearRouteDistanceDisplay();
      }
    };
    const initialDistance = (currentNearestWarehouse && currentNearestWarehouse.routeDistanceKm) || activeWarehouse.routeDistanceKm || activeWarehouse.distance || 0;
    applyRouteSummary(initialDistance);
    ensureCurrentWarehouseRoute().then(()=>{
      if(currentNearestWarehouse){
        applyRouteSummary(currentNearestWarehouse.routeDistanceKm || currentNearestWarehouse.distance || 0);
      }
    }).catch(()=>{});
  } else {
    warehouseAddressSection.style.display = 'none';
    bookingRequiredNotice.style.display = 'none';
    if(routeSummaryEl){
      routeSummaryEl.style.display = 'none';
      routeSummaryEl.textContent = '';
    }
    if(warehouseInstruction){
      warehouseInstruction.style.display = 'none';
      warehouseInstruction.textContent = '';
    }
    updateWarehouseGuidanceDisplay(null, country);
  }
}

// Update warehouse address when item value or country changes
itemValueEl.addEventListener('input', updateWarehouseAddressDisplay);
itemValueEl.addEventListener('change', updateWarehouseAddressDisplay);
originCountryEl.addEventListener('change', ()=>{
  selectedWarehouseKey = '';
  refreshWarehouseSelect({ preserveSelection: false });
  updateWarehouseNoticeText();
  setTimeout(updateWarehouseAddressDisplay, 200);
  addWarehousesToMap();
  updateRouteBetweenOriginAndWarehouse({ silent:true });
});

/* ==== Mapbox: China supplier map ==== */
let supplierMap, supplierMarker, supplierGeocoder;
let supplierWarehouseMarkers = [];
let supplierMarkerAuto = true;

function initSupplierMap(){
  if(supplierMap) return;
  const defaultCenter = currentOriginLocation ? [currentOriginLocation.lng, currentOriginLocation.lat] : [113.2644,23.1291];
  supplierMap = new mapboxgl.Map({
    container:'wepsMap',
    style:'mapbox://styles/mapbox/streets-v11',
    center: defaultCenter,
    zoom: currentOriginLocation ? 7 : 5
  });
  supplierGeocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl, placeholder:'ابحث عن موقع المورد أو الشحنة' });
  document.getElementById('wepsMapSearch').appendChild(supplierGeocoder.onAdd(supplierMap));
  supplierMap.on('load', ()=>{
    addWarehousesToSupplierMap();
    if(currentOriginLocation){
      setSupplierMarker(currentOriginLocation.lng, currentOriginLocation.lat, currentOriginLocation.label || 'موقع الشحنة', true);
    }
  });
  supplierMap.on('click', e=> setSupplierMarker(e.lngLat.lng, e.lngLat.lat, 'المورد'));
  supplierGeocoder.on('result', e=>{
    const [lng,lat] = e.result.center;
    setSupplierMarker(lng,lat, e.result.place_name);
  });
}

function addWarehousesToSupplierMap(){
  const warehouses = WAREHOUSES.china;
  warehouses.forEach(warehouse => {
    const marker = new mapboxgl.Marker({ color: '#007bff' })
      .setLngLat([warehouse.lng, warehouse.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <div style="font-weight:700;margin-bottom:4px">${warehouse.name}</div>
        <div style="color:#6b7280">${warehouse.address}</div>
      `))
      .addTo(supplierMap);
    supplierWarehouseMarkers.push(marker);
  });
}
function setSupplierMarker(lng,lat,label,isAuto=false){
  if(!supplierMap) return;
  if(supplierMarker) supplierMarker.remove();
  supplierMarker = new mapboxgl.Marker({draggable:true, color:'#f5a623'})
    .setLngLat([lng,lat]).addTo(supplierMap);
  supplierMarkerAuto = isAuto;
  supplierMarker.on('dragend', ()=>{
    const pos = supplierMarker.getLngLat();
    supplierMarkerAuto = false;
    updatePickupCalc(pos.lng,pos.lat,'المورد');
  });
  if(isAuto){
    supplierMap.flyTo({ center:[lng,lat], zoom: Math.max(supplierMap.getZoom(), 7) });
  }
  updatePickupCalc(lng,lat,label||'المورد');
}

function updatePickupCalc(lng,lat,label){
  // Calculations removed
  const payload = { lng, lat, label };
  document.getElementById('pickupCalc').value = JSON.stringify(payload);
  document.getElementById('pickupCalcSummary').innerText = `📍 موقع المورد: ${label} — (---, ---)`;
}
/* ==== Mapbox: Yemen delivery map ==== */
let deliveryMap, deliveryMarker, deliveryGeocoder;
function initDeliveryMap(){
  if(deliveryMap) return;
  deliveryMap = new mapboxgl.Map({
    container:'deliveryMap',
    style:'mapbox://styles/mapbox/streets-v11',
    center:[44.2066,15.3547], zoom:6
  });
  deliveryGeocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl, placeholder:'ابحث عن موقع التسليم في اليمن' });
  const geocoderBox = document.createElement('div'); geocoderBox.className='map-search'; geocoderBox.id='deliveryMapSearch';
  deliveryMap.getContainer().parentNode.insertBefore(geocoderBox, deliveryMap.getContainer());
  document.getElementById('deliveryMapSearch').appendChild(deliveryGeocoder.onAdd(deliveryMap));
  deliveryMap.on('click', e=> setDeliveryMarker(e.lngLat.lng, e.lngLat.lat, 'موقع التسليم'));
  deliveryGeocoder.on('result', e=>{
    const [lng,lat] = e.result.center;
    setDeliveryMarker(lng,lat, e.result.place_name);
  });
}
function setDeliveryMarker(lng,lat,label){
  if(deliveryMarker) deliveryMarker.remove();
  deliveryMarker = new mapboxgl.Marker({draggable:true})
    .setLngLat([lng,lat]).addTo(deliveryMap);
  deliveryMarker.on('dragend', ()=>{
    const pos = deliveryMarker.getLngLat();
    saveDeliveryLocation(pos.lat, pos.lng, label);
  });
  saveDeliveryLocation(lat,lng,label||'موقع التسليم');
}
function saveDeliveryLocation(lat,lng,label){
  const city = (destCityEl.value || "");
  const payload = { city, label, lat, lng };
  document.getElementById('deliveryLocation').value = JSON.stringify(payload);
  document.getElementById('deliveryLocationDisplay').innerText = `${payload.city} — ${payload.label}`;
}
/* Delivery UI */
function updateDeliverySection(){
  const city = (destCityEl.value || "").trim();
  if (city === "صنعاء") {
    deliveryForSanaa.style.display = "block";
    deliveryForOther.style.display = "block";
  } else if (northCities.includes(city) || southCities.includes(city)) {
    deliveryForSanaa.style.display = "none";
    deliveryForOther.style.display = "block";
  } else {
    deliveryForSanaa.style.display = "none";
    deliveryForOther.style.display = "none";
  }
  setTimeout(()=>initDeliveryMap(), 80);
}
destCityEl.addEventListener('change', updateDeliverySection);
updateDeliverySection();

useMyLocationBtn && useMyLocationBtn.addEventListener('click', ()=>{
  if(!navigator.geolocation){ alert('المتصفح لا يدعم تحديد الموقع'); return; }
  useMyLocationBtn.innerText = 'جاري تحديد موقعك...';
  navigator.geolocation.getCurrentPosition(pos=>{
    const lat=pos.coords.latitude, lng=pos.coords.longitude;
    initDeliveryMap(); setDeliveryMarker(lng,lat,'موقعي الحالي');
    const payload = { city: destCityEl.value||'', label:'موقعي الحالي', lat, lng };
    deliveryLocationInput.value = JSON.stringify(payload);
    deliveryLocationDisplay.innerText = `${payload.city} — ${payload.label}`;
    useMyLocationBtn.innerText = '📍 تحديد موقعي الحالي';
  }, err=>{
    useMyLocationBtn.innerText = '📍 تحديد موقعي الحالي';
    alert('فشل تحديد الموقع: ' + (err.message||err.code));
  }, { enableHighAccuracy:true, timeout:10000 });
});
confirmLocationBtn && confirmLocationBtn.addEventListener('click', ()=>{
  if(!deliveryMarker){ alert('اختر موقعاً على الخريطة أولاً'); return; }
  alert('✅ تم حفظ موقع التسليم بنجاح.');
});
/* ===== Quick sync ===== */
quickCalcBtn.addEventListener('click', ()=>{
  const origin = quickOrigin.value;
  const dest = quickDest.value;
  const kg = parseFloat(document.getElementById('quickWeight').value)||0;
  if(!origin || !dest){
    showToast('warning','بيانات ناقصة','اختر دولة المنشأ والوجهة اليمنية لعرض التقدير السريع.');
    return;
  }
  if(kg <= 0){
    showToast('warning','وزن غير صحيح','أدخل وزناً تقريبياً أكبر من صفر.');
    return;
  }
  
  // التحقق من توفر بيانات Monday
  const countries = window.__WEPS_COUNTRIES || [];
  if(!countries.length){
    showToast('warning','بيانات غير متوفرة','يرجى تحديث البيانات من Monday أولاً.');
    return;
  }
  
  // البحث عن بيانات الدولة
  const countryData = countries.find(c => c.country === origin);
  if(!countryData || !countryData.rates){
    showToast('warning','بيانات ناقصة','لم يتم العثور على أسعار لهذه الدولة. يرجى تحديث البيانات من Monday.');
    return;
  }
  
  // استخدام نوع منتج افتراضي (الملابس)
  const productCode = PRODUCTS.CLOTHES;
  const serviceCode = SERVICES.EXPRESS_YEMEN;
  const clothesBaseRates = countryData.rates;
  
  // حساب سعر الشحن
  const shippingPrice = calculateShipmentPrice({
    productCode,
    serviceCode,
    weightKg: kg,
    clothesBaseRates,
    options: {
      useRouteMultiplier: true,
      includeProfit: true
    }
  });
  
  if(!shippingPrice || shippingPrice === null){
    showToast('error','خطأ في الحساب','تعذر حساب التكلفة. يرجى المحاولة مرة أخرى.');
    return;
  }
  
  // حساب السعر بالريال (سعر الصرف: 530)
  const priceYER = shippingPrice * 530;
  
  // عرض النتيجة
  quickResultBody.innerHTML = `
    <div style="font-size:18px;font-weight:900;color:var(--weps-navy)">${formatUSD(shippingPrice)}</div>
    <div style="margin:4px 0 12px;font-weight:800;color:#f58220">≈ ${formatYER(priceYER)}</div>
    <ul style="margin:0 0 12px 20px;padding:0 18px;color:#6b7280;line-height:1.7">
      <li>التقدير يعتمد على خدمة <strong>Weps Express</strong> (7-10 أيام)</li>
      <li>الوزن: <strong>${kg.toFixed(1)} كجم</strong></li>
      <li>من: <strong>${origin}</strong> → إلى: <strong>${dest}</strong></li>
      <li>نوع المنتج: <strong>الملابس</strong> (افتراضي)</li>
    </ul>
    <div style="font-weight:700;color:var(--weps-navy);margin-top:12px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid rgba(11,18,32,0.08)">
      💡 ملاحظة: هذا تقدير سريع لخدمة Weps Express فقط. للحصول على خطة شحن كاملة مع جميع الخدمات (6 خدمات) والجمارك والتأمين، استخدم الوضع الكامل.
    </div>
  `;
  quickResultCard.style.display = 'block';
  showToast('success','تقدير سريع جاهز','تم حساب التكلفة بنجاح.');

  // حضّر النموذج الكامل بالقيم الأولية (دون الانتقال تلقائياً)
  originCountryEl.value = origin;
  originCountryEl.dispatchEvent(new Event('change'));
  destCityEl.value = dest;
  const existingParcel = parcelsArea.querySelector('.parcel');
  if(existingParcel){
    existingParcel.querySelector('.p-weight').value = kg;
  } else {
    parcelsArea.innerHTML = `<div class="parcel">
      <div class="parcel-field">
        <label>L (سم)</label>
        <input class="p-length" type="number" placeholder="مثال: 50"/>
      </div>
      <div class="parcel-field">
        <label>W (سم)</label>
        <input class="p-width" type="number" placeholder="مثال: 40"/>
      </div>
      <div class="parcel-field">
        <label>H (سم)</label>
        <input class="p-height" type="number" placeholder="مثال: 30"/>
      </div>
      <div class="parcel-field">
        <label>KG</label>
        <input class="p-weight" type="number" placeholder="مثال: 12.5" value="${kg}"/>
      </div>
    <input class="p-qty" type="hidden" value="1"/>
      <button type="button" class="add-btn remove">×</button>
    </div>`;
  }

  quickToFullBtn.onclick = ()=>{
    btnFull.click();
    originCountryEl.value = origin;
    originCountryEl.dispatchEvent(new Event('change'));
    destCityEl.value = dest;
    const firstParcel = parcelsArea.querySelector('.parcel');
    if(firstParcel){
      firstParcel.querySelector('.p-weight').value = kg;
    }
    resultsArea.innerHTML = '<div class="small">أكمل البيانات ثم اضغط "اعرف كم بتكلفك الشحنة بذكاء مع Weps" لعرض خطة الشحن المتكاملة.</div>';
    resultsArea.scrollIntoView({behavior:'smooth', block:'start'});
  };
});

/* ===== Offer ID utils ===== */
const COUNTRY_CODE_MAP = {"الصين":"CN","امريكا":"US","بريطانيا":"GB","ايطاليا":"IT","فرنسا":"FR","المانيا":"DE","سويسرا":"CH","السويد":"SE","الامارات":"AE","تركيا":"TR","اسبانيا":"ES"};
function normalizeCountryCode(input){
  if(!input) return 'XX';
  const s = String(input).trim();
  for(const k in COUNTRY_CODE_MAP) if(k.toLowerCase()===s.toLowerCase()) return COUNTRY_CODE_MAP[k];
  const ascii = s.replace(/[^A-Za-z]/g,'').slice(0,2).toUpperCase();
  return (ascii||'XX');
}
function toBase36Upper(n){ return (typeof n==='number' && isFinite(n))? n.toString(36).toUpperCase() : String(n).toUpperCase(); }
function generateOfferId(countryInput){
  const cc = normalizeCountryCode(countryInput || 'CN');
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth()+1).padStart(2,'0');
  const dd = String(now.getDate()).padStart(2,'0');
  const shortDate = yy+mm+dd;
  const counterKey = `weps_offer_counter-${cc}-${shortDate}`;
  let serialNum = 1;
  try{
    const current = parseInt(localStorage.getItem(counterKey) || '0',10);
    serialNum = current + 1;
    localStorage.setItem(counterKey, String(serialNum));
  }catch(e){ serialNum = Math.floor(Math.random()*1000)+1; }
  let base36 = toBase36Upper(serialNum);
  if(base36.length<2) base36 = base36.padStart(2,'0');
  return `WPS-${cc}-${shortDate}-${base36}`;
}

/* ===== Comparison table ===== */
function renderComparisonTable(serviceQuotes, options = {}){
  const {
    customsUSD,
    discountPercent,
    discountLabel,
    isDestSouth,
    southCustomsUSD = 0,
    transitCustomsUSD = 0,
    northCustomsUSD = 0
  } = options;
  
  // Support both old 3-service format and new 6-service format
  const serviceOrder = [
    { key: 'wepsExpress', title: 'Weps Express', serviceCode: SERVICES.EXPRESS_YEMEN },
    { key: 'wepsAir', title: 'Weps Air', serviceCode: SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN },
    { key: 'wepsSea', title: 'Weps Sea', serviceCode: SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN },
    { key: SERVICES.EXPRESS_YEMEN, title: 'ويبس اكسبريس', serviceCode: SERVICES.EXPRESS_YEMEN },
    { key: SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN, title: 'جو اقتصادي', serviceCode: SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN },
    { key: SERVICES.AIR_ADEN_VIA_EG_JO, title: 'جو عدن', serviceCode: SERVICES.AIR_ADEN_VIA_EG_JO },
    { key: SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN, title: 'بحر (كجم)', serviceCode: SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN },
    { key: SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN, title: 'بحر مباشر', serviceCode: SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN },
    { key: SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA, title: 'بحر (م³)', serviceCode: SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA }
  ];
  
  const serviceTimes = {
    wepsExpress: '7–21 يوم',
    wepsAir: '40–45 يوم',
    wepsSea: '50–60 يوم',
    [SERVICES.EXPRESS_YEMEN]: '7-10 أيام',
    [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: '15-20 يوم',
    [SERVICES.AIR_ADEN_VIA_EG_JO]: '12-18 يوم',
    [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: '35-45 يوم',
    [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: '30-40 يوم',
    [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: '40-50 يوم'
  };
  
  const availableServiceOrder = serviceOrder.filter(entry => serviceQuotes[entry.key]);
  if(!availableServiceOrder.length){
    comparisonWrap.innerHTML = '';
    return '';
  }
  
  const rows = [
    { label: 'الإجمالي (بالريال)', render: s => formatYER(serviceQuotes[s].finalYER || serviceQuotes[s].totalPrice * 530) },
    { label: 'الإجمالي (بالدولار)', render: s => formatUSD(serviceQuotes[s].finalUSD || serviceQuotes[s].totalPrice) },
    { label: 'الشحن (USD)', render: s => formatUSD(serviceQuotes[s].discounted || serviceQuotes[s].shippingPrice) },
    { label: 'الجمارك (USD)', render: s => {
      const entry = serviceQuotes[s];
      const customs = entry?.customs;
      if(customs && customs.success){
        const amount = formatUSD(customs.calculation.total_customs_usd);
        const rate = customs.calculation.final_rate_percent != null ? customs.calculation.final_rate_percent.toFixed(2) : null;
        return rate ? `${amount} (${rate}%)` : amount;
      }
      return '---';
    }}
  ];
  
  if(isDestSouth){
    rows.push({ label: 'الجمارك المقدرة (USD)', render: () => formatUSD(southCustomsUSD || customsUSD) });
  } else {
    rows.push(
      { label: 'جمارك الجنوب (USD)', render: () => formatUSD(transitCustomsUSD) },
      { label: 'جمارك الشمال (USD)', render: () => formatUSD(northCustomsUSD) },
      { label: 'إجمالي الجمارك (USD)', render: () => formatUSD(customsUSD) }
    );
  }
  
  rows.push(
    { label: 'التأمين (USD)', render: s => {
      const ins = serviceQuotes[s].insurance;
      if(ins && ins.success){
        return formatUSD(ins.calculation.final_premium);
      }
      return '---';
    }},
    { label: 'وقت التوصيل التقديري', render: s => serviceTimes[s] || '---' },
    { label: 'المنطقة', render: () => (isDestSouth ? 'الجنوب' : 'الشمال') },
    { label: 'الخصم المطبق', render: () => discountPercent > 0 ? `${discountPercent}% (${discountLabel || ''})` : 'لا يوجد خصم مفعّل' }
  );
  
  let html = `<table class="comparison-table" role="table"><thead><tr><th>بند المقارنة</th>`;
  availableServiceOrder.forEach(s => { html += `<th>${s.title}</th>`; });
  html += `</tr></thead><tbody>`;
  rows.forEach(row => {
    html += `<tr><td>${row.label}</td>`;
    availableServiceOrder.forEach(s => {
      html += `<td>${row.render(s.key)}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  comparisonWrap.innerHTML = `<div style="font-weight:800;margin-bottom:8px">مقارنة سريعة للخدمات (${availableServiceOrder.length} خدمة)</div>${html}`;
}

function updateProtectionPanel(selectedQuote){
  const insuranceStatusEl = document.getElementById('insuranceStatus');
  const insuranceReasonEl = document.getElementById('insuranceReason');
  const customsStatusEl = document.getElementById('customsStatus');
  const insuranceBadgeEl = document.getElementById('insuranceBadge');
  const customsBadgeEl = document.getElementById('customsBadge');

  if(insuranceStatusEl){
    if(selectedQuote?.insurance?.success){
      const calc = selectedQuote.insurance.calculation;
      insuranceStatusEl.textContent = `التأمين: Clause ${calc.insurance_clause} ≈ ${formatUSD(calc.final_premium)}`;
      if(insuranceReasonEl){
        insuranceReasonEl.textContent = `المعادلة: ${calc.formula_used} | معدل ${calc.rate_percent}%`;
      }
      if(insuranceBadgeEl){
        insuranceBadgeEl.textContent = `ICC ${calc.insurance_clause}`;
      }
    } else {
      insuranceStatusEl.textContent = 'التأمين: سيتم تحديده تلقائياً';
      if(insuranceReasonEl){
        insuranceReasonEl.textContent = 'Clause A/B/C حسب نوع البضاعة';
      }
      if(insuranceBadgeEl){
        insuranceBadgeEl.textContent = 'ICC Auto';
      }
    }
  }

  if(customsStatusEl){
    if(selectedQuote?.customs?.success){
      const calc = selectedQuote.customs.calculation;
      const rateLabel = calc.final_rate_percent != null ? calc.final_rate_percent.toFixed(2) : '--';
      customsStatusEl.textContent = `الجمارك: ${rateLabel}% ≈ ${formatUSD(calc.total_customs_usd)} (${calc.category_label})`;
      if(customsBadgeEl){
        customsBadgeEl.textContent = 'Customs ✓';
        customsBadgeEl.classList.add('highlight');
      }
    } else {
      customsStatusEl.textContent = 'الجمارك: سيتم تقديرها بعد اختيار الخدمة';
      if(customsBadgeEl){
        customsBadgeEl.textContent = 'Customs Sync';
        customsBadgeEl.classList.remove('highlight');
      }
    }
  }
}
/* ===== Download Offer HTML ===== */
function downloadOffer(){
  const results = window.__lastCalculationResults;
  if(!results){
    showToast('error', 'خطأ', 'لا توجد بيانات للتنزيل. يرجى إجراء الحساب أولاً.');
    return;
  }
  
  const {
    offerId,
    serviceResults,
    productTypeAr,
    totalWeight,
    cargoValue,
    originCountry,
    destCity,
    selectedService,
    customerName,
    customerPhone,
    customerType,
    companyName,
    supplierName,
    supplierContact,
    supplierCountry,
    supplierAddress,
    supplierEmail,
    supplierPhone,
    parcels
  } = results;
  
  // Use serviceResults as serviceQuotes
  const serviceQuotes = serviceResults || {};
  const escapeHtml = (value)=>{
    if(value === null || value === undefined || value === '') return '---';
    return String(value).replace(/[&<>"]/g, chr => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[chr]));
  };

  const serviceNameMap = {
    wepsExpress:'شحن سريع (شحن تحل فيه مشكلتك)',
    wepsAir:'شحن جوي تجميع (شحن تخفيض التكاليف والكميات القليلة)',
    wepsSea:'شحن بحري (شحن للي الريال معه يفرق)',
    [SERVICES.EXPRESS_YEMEN]: 'ويبس اكسبريس',
    [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: 'جو اقتصادي (الإمارات/عمان - بري اليمن)',
    [SERVICES.AIR_ADEN_VIA_EG_JO]: 'جو عدن (عبر مصر/الأردن)',
    [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: 'بحر (كجم) عبر الإمارات - بري اليمن',
    [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: 'بحر (م³) مباشر عدن/المكلا',
    [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: 'بحر (م³) عبر الإمارات - بري اليمن'
  };

  // Define all 6 services order
  const serviceOrder = [
    {key:SERVICES.EXPRESS_YEMEN, title:'ويبس اكسبريس'},
    {key:SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN, title:'جو اقتصادي'},
    {key:SERVICES.AIR_ADEN_VIA_EG_JO, title:'جو عدن'},
    {key:SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN, title:'بحر (كجم)'},
    {key:SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN, title:'بحر مباشر'},
    {key:SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA, title:'بحر (م³)'}
  ];
  
  const availableServiceOrder = serviceOrder.filter(entry => serviceQuotes[entry.key]);
  const selectedKey = selectedService || (availableServiceOrder[0]?.key ?? SERVICES.EXPRESS_YEMEN);
  
  const serviceTimes = {
    [SERVICES.EXPRESS_YEMEN]: '7-10 أيام',
    [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: '15-20 يوم',
    [SERVICES.AIR_ADEN_VIA_EG_JO]: '12-18 يوم',
    [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: '35-45 يوم',
    [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: '30-40 يوم',
    [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: '40-50 يوم'
  };
  
  // Get selected service details
  const selectedServiceQuote = serviceQuotes[selectedKey];
  const selectedServiceInfo = serviceNameMap[selectedKey] || selectedKey;
  
  // Build service cards for all 6 services
  const reportCards = availableServiceOrder.map(entry=>{
    const quote = serviceQuotes[entry.key];
    if(!quote) return '';
    const deliveryWindow = serviceTimes[entry.key] || '—';
    const isSelected = entry.key === selectedKey;
    const badge = isSelected ? `<div class="report-badge" style="position:absolute;top:12px;left:12px;background:linear-gradient(135deg,#00C9A7,#00b894);color:#fff;font-size:11px;font-weight:800;border-radius:999px;padding:5px 12px;z-index:10">✓ الخدمة المختارة</div>` : '';
    const cardStyle = isSelected ? 'border:3px solid #00C9A7;box-shadow:0 0 25px rgba(0,201,167,0.4);background:linear-gradient(135deg,#f0fff4 0%,#fff 100%)' : '';
    
    const priceUSD = quote.totalPrice || 0;
    const priceYER = (priceUSD * 530).toFixed(0);
    const shippingUSD = quote.shippingPrice || 0;
    const insuranceUSD = quote.insurance?.success ? quote.insurance.calculation.final_premium : 0;
    const insuranceClause = quote.insurance?.success ? quote.insurance.calculation.insurance_clause : '';
    const customsUSD = quote.customs?.success ? quote.customs.calculation.total_customs_usd : 0;
    const customsRate = quote.customs?.success && quote.customs.calculation.final_rate_percent != null
      ? quote.customs.calculation.final_rate_percent.toFixed(2)
      : null;
    
    return `
      <div class="report-service-card ${escapeHtml(entry.key)}" style="${cardStyle}">
        ${badge}
        <div class="report-service-title">${escapeHtml(entry.title)}</div>
        <div class="report-service-price">${formatYER(priceYER)}</div>
        <div class="report-service-subprice">${formatUSD(priceUSD)}</div>
        <div class="report-service-meta"><span>الشحن</span><strong>${formatUSD(shippingUSD)}</strong></div>
        ${insuranceUSD > 0 ? `<div class="report-service-meta"><span>التأمين (Clause ${insuranceClause})</span><strong>${formatUSD(insuranceUSD)}</strong></div>` : ''}
        ${customsUSD > 0 ? `<div class="report-service-meta"><span>الجمارك${customsRate ? ` (${customsRate}%)` : ''}</span><strong>${formatUSD(customsUSD)}</strong></div>` : ''}
        <div class="report-service-meta"><span>الزمن التقديري</span><strong>${escapeHtml(deliveryWindow)}</strong></div>
      </div>
    `;
  }).join('');

  // Build selected service highlight section
  const selectedServiceSection = selectedServiceQuote ? `
    <div class="section" style="background:linear-gradient(135deg,#f0fff4 0%,#e8f5e9 100%);border:3px solid #00C9A7;margin-top:16px">
      <h3 style="color:#00C9A7;display:flex;align-items:center;gap:8px">
        <span>✓</span> الخدمة المختارة: ${escapeHtml(selectedServiceInfo)}
      </h3>
      <div class="info-grid" style="margin-top:12px">
        <div class="info-card" style="background:#fff">
          <span class="label">السعر الإجمالي</span>
          <span class="value" style="color:#00C9A7;font-size:20px">${formatYER((selectedServiceQuote.totalPrice * 530).toFixed(0))} (${formatUSD(selectedServiceQuote.totalPrice)})</span>
        </div>
        <div class="info-card" style="background:#fff">
          <span class="label">تكلفة الشحن</span>
          <span class="value">${formatUSD(selectedServiceQuote.shippingPrice || 0)}</span>
        </div>
        ${selectedServiceQuote.insurance?.success ? `
        <div class="info-card" style="background:#fff">
          <span class="label">التأمين (Clause ${selectedServiceQuote.insurance.calculation.insurance_clause})</span>
          <span class="value">${formatUSD(selectedServiceQuote.insurance.calculation.final_premium)}</span>
        </div>
        ` : ''}
        ${selectedServiceQuote.customs?.success ? `
        <div class="info-card" style="background:#fff">
          <span class="label">الجمارك (${selectedServiceQuote.customs.calculation.final_rate_percent.toFixed(2)}%)</span>
          <span class="value">${formatUSD(selectedServiceQuote.customs.calculation.total_customs_usd)}</span>
        </div>
        ` : ''}
        <div class="info-card" style="background:#fff">
          <span class="label">وقت التوصيل</span>
          <span class="value">${escapeHtml(serviceTimes[selectedKey] || '—')}</span>
        </div>
      </div>
    </div>
  ` : '';

  // Build parcel rows from stored parcels data
  let parcelRows = '';
  if(parcels && Array.isArray(parcels) && parcels.length > 0){
    parcels.forEach(p => {
      const volumetric = p.volWeight && p.volWeight.toFixed ? p.volWeight.toFixed(2) : (p.volWeight || 0);
      parcelRows += `<tr><td>${escapeHtml(p.index)}</td><td>${escapeHtml(p.length)}</td><td>${escapeHtml(p.width)}</td><td>${escapeHtml(p.height)}</td><td>${escapeHtml(p.actual)}</td><td>${escapeHtml(volumetric)}</td></tr>`;
    });
  }
  if(!parcelRows){
    parcelRows = '<tr><td colspan="6" style="padding:8px;border:1px solid #e2e8f0;text-align:center">لا توجد طرود مفصلة</td></tr>';
  }

  // Check if includeAllServicesReport is enabled
  const includeAllServices = window.__includeAllServicesInReport !== false;

  const offerHTML = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>تقرير الحل اللوجستي الذكي ${offerId}</title><style>
    body{font-family:"Cairo",Arial,Tahoma,sans-serif;background:#fff;margin:0;padding:18px;color:#0b1220}
    .container{max-width:980px;margin:0 auto}
    .header{background:linear-gradient(90deg,#fff 0%,#fff4e9 50%,#ffe3ca 100%);padding:22px;border-radius:12px;text-align:center}
    .logo{width:64px;height:64px;border-radius:12px;background:#0b1220;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800}
    .section{background:#fff;padding:16px;margin-top:12px;border-radius:10px;border:1px solid rgba(11,18,32,0.06)}
    h3{margin:0 0 12px;font-size:18px;color:#0b1220}
    table{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px}
    th,td{padding:10px;border:1px solid #e8ecf3;text-align:center}
    th{background:#fff7ef}
    .info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
    .info-card{background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:12px;min-height:78px}
    .info-card .label{display:block;font-size:12px;color:#6b7280;margin-bottom:6px}
    .info-card .value{font-weight:700;color:#0b1220;font-size:14px;line-height:1.5}
    .report-service-grid{display:flex;flex-wrap:wrap;gap:14px;margin-top:12px}
    .report-service-card{flex:1 1 260px;background:#fff;border:1px solid rgba(11,18,32,0.08);border-radius:12px;padding:16px;position:relative;box-shadow:0 12px 28px rgba(15,23,42,0.05);transition:all 0.3s}
    .report-service-card.wepsExpress{border-color:rgba(245,130,32,0.3)}
    .report-service-card .report-badge{position:absolute;top:12px;left:12px;background:linear-gradient(135deg,#00C9A7,#00b894);color:#fff;font-size:11px;font-weight:800;border-radius:999px;padding:5px 12px;z-index:10}
    .report-service-title{font-weight:800;color:#0b1220;font-size:16px;margin-bottom:8px}
    .report-service-price{font-size:22px;font-weight:900;color:#f58220;margin-bottom:2px}
    .report-service-subprice{font-size:12px;color:#6b7280;margin-bottom:10px}
    .report-service-meta{display:flex;justify-content:space-between;font-size:12px;color:#0b1220;padding:4px 0;border-top:1px dashed rgba(11,18,32,0.08)}
    .report-service-meta:first-of-type{border-top:none;padding-top:0}
  </style></head><body><div class="container">
    <div class="header">
      <div class="logo">WEPS</div>
      <h1 style="color:#f58220;margin:8px 0 4px">🚀 تقرير الحل اللوجستي الذكي من Weps</h1>
      <div style="color:#6b7280;margin-top:8px;font-size:13px">ليس مجرد تسعيرة… بل خطة ذكية لشحنتك</div>
      <div style="color:#6b7280;margin-top:4px">رقم العرض: <strong>${offerId}</strong> — ${new Date().toLocaleString('ar-EG',{dateStyle:'long',timeStyle:'short'})}</div>
    </div>

    <div class="section">
      <h3>معلومات العميل</h3>
      <div class="info-grid">
        <div class="info-card"><span class="label">اسم العميل</span><span class="value">${escapeHtml(customerName || '---')}</span></div>
        <div class="info-card"><span class="label">رقم الجوال</span><span class="value">${escapeHtml(customerPhone || '---')}</span></div>
        <div class="info-card"><span class="label">نوع العميل</span><span class="value">${escapeHtml(getCustomerTypeLabel(customerType))}</span></div>
        ${companyName ? `<div class="info-card"><span class="label">اسم الشركة</span><span class="value">${escapeHtml(companyName)}</span></div>` : ''}
      </div>
    </div>

    <div class="section">
      <h3>تفاصيل الشحنة</h3>
      <div class="info-grid">
        <div class="info-card"><span class="label">نوع المنتج</span><span class="value">${escapeHtml(productTypeAr || '---')}</span></div>
        <div class="info-card"><span class="label">الوزن (كجم)</span><span class="value">${escapeHtml(totalWeight || 0)}</span></div>
        <div class="info-card"><span class="label">قيمة البضاعة</span><span class="value">${formatUSD(cargoValue || 0)}</span></div>
        <div class="info-card"><span class="label">الدولة المصدرة</span><span class="value">${escapeHtml(originCountry || '---')}</span></div>
        <div class="info-card"><span class="label">الوجهة</span><span class="value">${escapeHtml(destCity || '---')}</span></div>
        <div class="info-card"><span class="label">رقم العرض</span><span class="value">${escapeHtml(offerId || '---')}</span></div>
      </div>
    </div>

    <div class="section">
      <h3>معلومات المورد</h3>
      <div class="info-grid">
        <div class="info-card"><span class="label">اسم المصنع / المورد</span><span class="value">${escapeHtml(supplierName || '---')}</span></div>
        <div class="info-card"><span class="label">شخص التواصل لدى المورد</span><span class="value">${escapeHtml(supplierContact || '---')}</span></div>
        <div class="info-card"><span class="label">دولة المصنع / المورد</span><span class="value">${escapeHtml(supplierCountry || '---')}</span></div>
        <div class="info-card"><span class="label">عنوان المصنع / المورد</span><span class="value">${escapeHtml(supplierAddress || '---')}</span></div>
        <div class="info-card"><span class="label">البريد الإلكتروني للمورد</span><span class="value">${escapeHtml(supplierEmail || '---')}</span></div>
        <div class="info-card"><span class="label">هاتف المورد</span><span class="value">${escapeHtml(supplierPhone || '---')}</span></div>
      </div>
    </div>

    ${selectedServiceSection}

    ${includeAllServices ? `
    <div class="section">
      <h3>مقارنة جميع خيارات الشحن (6 خدمات)</h3>
      <div class="report-service-grid">
        ${reportCards}
      </div>
    </div>
    ` : ''}

    ${includeAllServices ? `
    <div class="section">
      <h3>تفاصيل الطرود</h3>
      <table><thead><tr><th>#</th><th>L (سم)</th><th>W (سم)</th><th>H (سم)</th><th>KG</th><th>الوزن الحجمي</th></tr></thead><tbody>${parcelRows}</tbody></table>
    </div>
    ` : ''}

    <div class="section" style="margin-top:16px;text-align:center;color:#6b7280">
      <div style="font-weight:800;margin-bottom:8px">الخلاصة</div>
      <div style="line-height:1.8">هذه الخطة تمثل النقل الأمثل لعملك — تحقق التوازن بين الكلفة، الأمان، والسرعة.<br/>يشحن معنا الأذكياء.</div>
    </div>

    <div style="margin-top:18px;text-align:center;color:#6b7280">© Weps Platform — ${new Date().getFullYear()}</div>
  </div></body></html>`;

  const blob = new Blob([offerHTML], {type:'text/html;charset=utf-8'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `تقرير_الحل_اللوجستي_الذكي_${offerId}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/* ===== Generate Invoice PDF ===== */
async function generateInvoicePDF(){
  const results = window.__lastCalculationResults;
  if(!results){
    showToast('error', 'خطأ', 'لا توجد بيانات للتنزيل. يرجى إجراء الحساب أولاً.');
    return;
  }
  
  if(typeof html2canvas === 'undefined'){
    showToast('error', 'خطأ', 'مكتبة html2canvas غير متوفرة. يرجى تحديث الصفحة.');
    return;
  }
  
  let jsPDF;
  if(typeof window.jspdf !== 'undefined'){
    jsPDF = window.jspdf.jsPDF || window.jspdf;
  } else if(typeof jspdf !== 'undefined'){
    jsPDF = jspdf.jsPDF || jspdf;
  } else {
    showToast('error', 'خطأ', 'مكتبة PDF غير متوفرة. يرجى تحديث الصفحة.');
    return;
  }
  
  showToast('info', 'جاري الإنشاء', 'جاري إنشاء ملف PDF...');
  
  // Create temporary HTML element for PDF
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '210mm';
  tempDiv.style.padding = '20px';
  tempDiv.style.backgroundColor = '#fff';
  tempDiv.style.fontFamily = '"Cairo", Arial, Tahoma, sans-serif';
  tempDiv.style.direction = 'rtl';
  tempDiv.style.textAlign = 'right';
  
  // Generate HTML content (reuse downloadOffer logic)
  const {
    offerId,
    serviceResults,
    productTypeAr,
    totalWeight,
    cargoValue,
    originCountry,
    destCity,
    selectedService,
    customerName,
    customerPhone,
    customerType,
    companyName,
    supplierName,
    supplierContact,
    supplierCountry,
    supplierAddress,
    supplierEmail,
    supplierPhone,
    parcels
  } = results;
  
  const serviceQuotes = serviceResults || {};
  const serviceNameMap = {
    [SERVICES.EXPRESS_YEMEN]: 'ويبس اكسبريس',
    [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: 'جو اقتصادي (الإمارات/عمان - بري اليمن)',
    [SERVICES.AIR_ADEN_VIA_EG_JO]: 'جو عدن (عبر مصر/الأردن)',
    [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: 'بحر (كجم) عبر الإمارات - بري اليمن',
    [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: 'بحر (م³) مباشر عدن/المكلا',
    [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: 'بحر (م³) عبر الإمارات - بري اليمن'
  };
  
  const serviceTimes = {
    [SERVICES.EXPRESS_YEMEN]: '7-10 أيام',
    [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: '15-20 يوم',
    [SERVICES.AIR_ADEN_VIA_EG_JO]: '12-18 يوم',
    [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: '35-45 يوم',
    [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: '30-40 يوم',
    [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: '40-50 يوم'
  };
  
  const serviceOrder = [
    {key:SERVICES.EXPRESS_YEMEN, title:'ويبس اكسبريس'},
    {key:SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN, title:'جو اقتصادي'},
    {key:SERVICES.AIR_ADEN_VIA_EG_JO, title:'جو عدن'},
    {key:SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN, title:'بحر (كجم)'},
    {key:SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN, title:'بحر مباشر'},
    {key:SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA, title:'بحر (م³)'}
  ];
  
  const availableServiceOrder = serviceOrder.filter(entry => serviceQuotes[entry.key]);
  const selectedKey = selectedService || (availableServiceOrder[0]?.key ?? SERVICES.EXPRESS_YEMEN);
  const selectedServiceQuote = serviceQuotes[selectedKey];
  
  let servicesHTML = '';
  availableServiceOrder.forEach(entry => {
    const quote = serviceQuotes[entry.key];
    if(!quote) return;
    const isSelected = entry.key === selectedKey;
    const priceUSD = quote.totalPrice || 0;
    const priceYER = (priceUSD * 530).toFixed(0);
    const shippingUSD = quote.shippingPrice || 0;
    const insuranceUSD = quote.insurance?.success ? quote.insurance.calculation.final_premium : 0;
    const insuranceClause = quote.insurance?.success ? quote.insurance.calculation.insurance_clause : '';
    const customsUSD = quote.customs?.success ? quote.customs.calculation.total_customs_usd : 0;
    const customsRate = quote.customs?.success && quote.customs.calculation.final_rate_percent != null
      ? quote.customs.calculation.final_rate_percent.toFixed(2)
      : null;
    
    servicesHTML += `
      <div style="border:${isSelected ? '3px solid #00C9A7' : '1px solid #ddd'};border-radius:8px;padding:12px;margin-bottom:10px;background:${isSelected ? '#f0fff4' : '#fff'}">
        <div style="font-weight:bold;font-size:14px;margin-bottom:8px">${isSelected ? '✓ ' : ''}${entry.title}</div>
        <div style="color:#f58220;font-size:18px;font-weight:bold;margin-bottom:4px">${formatYER(priceYER)}</div>
        <div style="color:#666;font-size:12px;margin-bottom:8px">${formatUSD(priceUSD)}</div>
        <div style="font-size:11px;margin:4px 0"><span>الشحن:</span> <strong>${formatUSD(shippingUSD)}</strong></div>
        ${insuranceUSD > 0 ? `<div style="font-size:11px;margin:4px 0"><span>التأمين (Clause ${insuranceClause}):</span> <strong>${formatUSD(insuranceUSD)}</strong></div>` : ''}
        ${customsUSD > 0 ? `<div style="font-size:11px;margin:4px 0"><span>الجمارك${customsRate ? ` (${customsRate}%)` : ''}:</span> <strong>${formatUSD(customsUSD)}</strong></div>` : ''}
        <div style="font-size:11px;margin:4px 0"><span>الزمن:</span> <strong>${serviceTimes[entry.key] || '—'}</strong></div>
      </div>
    `;
  });
  
  // Build parcel rows for PDF
  const escapeHtmlPDF = (value) => {
    if(value === null || value === undefined || value === '') return '---';
    return String(value).replace(/[&<>"]/g, chr => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[chr]));
  };
  
  let parcelRowsPDF = '';
  if(parcels && Array.isArray(parcels) && parcels.length > 0){
    parcels.forEach(p => {
      const volumetric = p.volWeight && p.volWeight.toFixed ? p.volWeight.toFixed(2) : (p.volWeight || 0);
      parcelRowsPDF += `<tr><td style="padding:6px;border:1px solid #ddd;text-align:center;font-size:11px">${escapeHtmlPDF(p.index)}</td><td style="padding:6px;border:1px solid #ddd;text-align:center;font-size:11px">${escapeHtmlPDF(p.length)}</td><td style="padding:6px;border:1px solid #ddd;text-align:center;font-size:11px">${escapeHtmlPDF(p.width)}</td><td style="padding:6px;border:1px solid #ddd;text-align:center;font-size:11px">${escapeHtmlPDF(p.height)}</td><td style="padding:6px;border:1px solid #ddd;text-align:center;font-size:11px">${escapeHtmlPDF(p.actual)}</td><td style="padding:6px;border:1px solid #ddd;text-align:center;font-size:11px">${escapeHtmlPDF(volumetric)}</td></tr>`;
    });
  }
  if(!parcelRowsPDF){
    parcelRowsPDF = '<tr><td colspan="6" style="padding:8px;border:1px solid #ddd;text-align:center;font-size:11px">لا توجد طرود مفصلة</td></tr>';
  }
  
  tempDiv.innerHTML = `
    <div style="text-align:center;background:linear-gradient(90deg,#fff 0%,#fff4e9 50%,#ffe3ca 100%);padding:20px;border-radius:12px;margin-bottom:20px">
      <div style="font-size:28px;font-weight:bold;color:#0b1220;margin-bottom:8px">WEPS</div>
      <div style="font-size:18px;color:#f58220;font-weight:bold;margin-bottom:4px">تقرير الحل اللوجستي الذكي</div>
      <div style="font-size:12px;color:#666">رقم العرض: ${offerId} | التاريخ: ${new Date().toLocaleDateString('ar-EG')}</div>
    </div>
    
    <div style="margin-bottom:20px">
      <h3 style="font-size:16px;font-weight:bold;margin-bottom:10px">معلومات العميل</h3>
      <div style="font-size:12px;line-height:1.8">
        <div><strong>الاسم:</strong> ${customerName || '---'}</div>
        <div><strong>الجوال:</strong> ${customerPhone || '---'}</div>
        <div><strong>النوع:</strong> ${getCustomerTypeLabel(customerType)}</div>
        ${companyName ? `<div><strong>الشركة:</strong> ${companyName}</div>` : ''}
      </div>
    </div>
    
    <div style="margin-bottom:20px">
      <h3 style="font-size:16px;font-weight:bold;margin-bottom:10px">تفاصيل الشحنة</h3>
      <div style="font-size:12px;line-height:1.8">
        <div><strong>المنتج:</strong> ${productTypeAr || '---'}</div>
        <div><strong>الوزن:</strong> ${totalWeight || 0} كجم</div>
        <div><strong>القيمة:</strong> ${formatUSD(cargoValue || 0)}</div>
        <div><strong>البلد المصدر:</strong> ${originCountry || '---'}</div>
        <div><strong>الوجهة:</strong> ${destCity || '---'}</div>
      </div>
    </div>
    
    <div style="margin-bottom:20px">
      <h3 style="font-size:16px;font-weight:bold;margin-bottom:10px">معلومات المورد</h3>
      <div style="font-size:12px;line-height:1.8">
        <div><strong>اسم المصنع / المورد:</strong> ${supplierName || '---'}</div>
        <div><strong>شخص التواصل لدى المورد:</strong> ${supplierContact || '---'}</div>
        <div><strong>دولة المصنع / المورد:</strong> ${supplierCountry || '---'}</div>
        <div><strong>عنوان المصنع / المورد:</strong> ${supplierAddress || '---'}</div>
        <div><strong>البريد الإلكتروني للمورد:</strong> ${supplierEmail || '---'}</div>
        <div><strong>هاتف المورد:</strong> ${supplierPhone || '---'}</div>
      </div>
    </div>
    
    ${selectedServiceQuote ? `
    <div style="background:linear-gradient(135deg,#f0fff4 0%,#e8f5e9 100%);border:3px solid #00C9A7;border-radius:12px;padding:16px;margin-bottom:20px">
      <h3 style="color:#00C9A7;font-size:16px;font-weight:bold;margin-bottom:12px">✓ الخدمة المختارة: ${serviceNameMap[selectedKey] || selectedKey}</h3>
      <div style="font-size:14px;line-height:1.8">
        <div><strong>السعر الإجمالي:</strong> <span style="color:#00C9A7;font-size:18px">${formatYER((selectedServiceQuote.totalPrice * 530).toFixed(0))} (${formatUSD(selectedServiceQuote.totalPrice)})</span></div>
        <div><strong>تكلفة الشحن:</strong> ${formatUSD(selectedServiceQuote.shippingPrice || 0)}</div>
        ${selectedServiceQuote.insurance?.success ? `<div><strong>التأمين (Clause ${selectedServiceQuote.insurance.calculation.insurance_clause}):</strong> ${formatUSD(selectedServiceQuote.insurance.calculation.final_premium)}</div>` : ''}
        ${selectedServiceQuote.customs?.success ? `<div><strong>الجمارك (${selectedServiceQuote.customs.calculation.final_rate_percent.toFixed(2)}%):</strong> ${formatUSD(selectedServiceQuote.customs.calculation.total_customs_usd)}</div>` : ''}
        <div><strong>وقت التوصيل:</strong> ${serviceTimes[selectedKey] || '—'}</div>
      </div>
    </div>
    ` : ''}
    
    <div style="margin-bottom:20px">
      <h3 style="font-size:16px;font-weight:bold;margin-bottom:10px">مقارنة جميع الخدمات (6 خدمات)</h3>
      ${servicesHTML}
    </div>
    
    <div style="margin-bottom:20px">
      <h3 style="font-size:16px;font-weight:bold;margin-bottom:10px">تفاصيل الطرود</h3>
      <table style="width:100%;border-collapse:collapse;font-size:11px">
        <thead>
          <tr>
            <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5;text-align:center;font-weight:bold">#</th>
            <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5;text-align:center;font-weight:bold">L (سم)</th>
            <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5;text-align:center;font-weight:bold">W (سم)</th>
            <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5;text-align:center;font-weight:bold">H (سم)</th>
            <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5;text-align:center;font-weight:bold">KG</th>
            <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5;text-align:center;font-weight:bold">الوزن الحجمي</th>
          </tr>
        </thead>
        <tbody>
          ${parcelRowsPDF}
        </tbody>
      </table>
    </div>
    
    <div style="text-align:center;color:#666;font-size:10px;margin-top:30px;padding-top:20px;border-top:1px solid #ddd">
      © Weps Platform — ${new Date().getFullYear()}
    </div>
  `;
  
  document.body.appendChild(tempDiv);
  
  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    const doc = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    doc.save(`فاتورة_ويبس_${offerId}.pdf`);
    document.body.removeChild(tempDiv);
    showToast('success', 'تم التنزيل', 'تم تنزيل ملف PDF بنجاح');
  } catch (error) {
    document.body.removeChild(tempDiv);
    console.error('PDF generation error:', error);
    showToast('error', 'خطأ', 'حدث خطأ أثناء إنشاء PDF: ' + error.message);
  }
}

/* ===== CORE CALC - SIMPLIFIED (CALCULATIONS REMOVED) ===== */
async function computeAndRender(){
  try{
    if(fullForm.style.display === 'none'){ btnFull.click(); }

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const ctype = customerTypeEl.value;
    if(!name || !phone || !ctype){ 
      showToast('warning', 'بيانات ناقصة', 'الرجاء إدخال: الاسم، الجوال، ونوع العميل.');
      inputError.style.display='block'; 
      inputError.innerText='الرجاء إدخال: الاسم، الجوال، ونوع العميل.'; 
      return; 
    }
    if(requiresCompanyName(ctype) && !companyNameEl.value.trim()){ 
      showToast('warning', 'بيانات ناقصة', 'الرجاء إدخال اسم المؤسسة/الشركة.'); 
      inputError.style.display='block'; 
      inputError.innerText='الرجاء إدخال اسم المؤسسة/الشركة.'; 
      return; 
    }
    inputError.style.display='none';
    
    // Show loading
    calculateBtn.classList.add('loading');
    calculateBtn.disabled = true;

    const originCountry = originCountryEl.value;
    const destCity = destCityEl.value;
    const productTypeAr = document.getElementById('productType')?.value;
    
    if(!destCity){
      showToast('warning','بيانات ناقصة','الرجاء اختيار مدينة الوجهة داخل اليمن.');
      calculateBtn.classList.remove('loading');
      calculateBtn.disabled = false;
      return;
    }
    
    // Get product code from Arabic name
    const productCode = mapProductNameToCode(productTypeAr) || PRODUCTS.CLOTHES;
    
    // Get weight from parcels and prepare parcel data for reports
    const parcelsFromUI = readParcelsFromUI();
    let totalWeight = 0;
    const processedParcels = [];
    
    parcelsFromUI.forEach((parcel, idx) => {
      const weight = parseFloat(parcel.weight || 0);
      totalWeight += weight;
      
      // Calculate volumetric weight: (L × W × H) / 5000
      const length = parseFloat(parcel.length || 0);
      const width = parseFloat(parcel.width || 0);
      const height = parseFloat(parcel.height || 0);
      const volWeight = (length * width * height) / 5000;
      
      processedParcels.push({
        index: idx + 1,
        length: length,
        width: width,
        height: height,
        actual: weight,
        volWeight: volWeight,
        quantity: parcel.quantity || 1
      });
    });
    
    if(totalWeight <= 0){
      totalWeight = 5; // Default weight
    }
    
    // Get cargo value
    const cargoValueInput = document.getElementById('itemValue') || document.getElementById('cargoValue');
    const cargoValueRaw = cargoValueInput?.value ? cargoValueInput.value.replace(/,/g,'') : '';
    const cargoValue = parseFloat(cargoValueRaw || cargoValueInput?.getAttribute('value') || '0');
    
    if(!cargoValueInput || isNaN(cargoValue) || cargoValue <= 0){
      showToast('warning','قيمة البضاعة مطلوبة','الرجاء إدخال قيمة تقديرية صحيحة بالدولار.');
      calculateBtn.classList.remove('loading');
      calculateBtn.disabled = false;
      if(cargoValueInput){
        cargoValueInput.focus();
      }
      return;
    }
    
    // Get base rates from Monday countries data
    const countries = window.__WEPS_COUNTRIES || [];
    const countryData = countries.find(c => c.country === originCountry);
    
    if(!countryData || !countryData.rates){
      showToast('warning','بيانات ناقصة','لم يتم العثور على أسعار لهذه الدولة. يرجى تحديث البيانات من Monday.');
      calculateBtn.classList.remove('loading');
      calculateBtn.disabled = false;
      return;
    }
    
            const clothesBaseRates = countryData.rates;
            
            // Debug logging
            console.log('Country data:', countryData);
            console.log('Base rates:', clothesBaseRates);
            
            // Calculate prices for all 6 services
            const serviceResults = calculateAllServices({
              productCode,
              weightKg: totalWeight,
              cargoValue,
              clothesBaseRates,
              options: {
                useRouteMultiplier: true,
                includeProfit: true,
                includeInsurance: true
              }
            });
            
            // Debug logging
            console.log('Service results:', serviceResults);
    
    const offerId = generateOfferId(originCountry);
    
    // Get selected service from dropdown
    const selectedService = document.getElementById('serviceType')?.value || SERVICES.EXPRESS_YEMEN;
    const selectedServiceQuoteForPanel = serviceResults[selectedService] || Object.values(serviceResults).find(Boolean) || null;
    updateProtectionPanel(selectedServiceQuoteForPanel);
    
    // Service names and icons mapping
    const serviceInfo = {
      [SERVICES.EXPRESS_YEMEN]: { 
        name: 'ويبس اكسبريس (7-10 أيام)', 
        icon: '🚀', 
        color: '#f58220', 
        time: '7-10 أيام' 
      },
      [SERVICES.AIR_ECO_UAE_OMAN_TRUCK_YEMEN]: { 
        name: 'جو اقتصادي الإمارات/عمان - بري اليمن (15-20 يوم)', 
        icon: '✈️', 
        color: '#0066cc', 
        time: '15-20 يوم' 
      },
      [SERVICES.AIR_ADEN_VIA_EG_JO]: { 
        name: 'جو عدن عبر مصر/الأردن (12-18 يوم)', 
        icon: '🛫', 
        color: '#9c27b0', 
        time: '12-18 يوم' 
      },
      [SERVICES.SEA_KG_VIA_UAE_TRUCK_YEMEN]: { 
        name: 'بحر (كجم) عبر الإمارات - بري اليمن (35-45 يوم)', 
        icon: '🚢', 
        color: '#0097a7', 
        time: '35-45 يوم' 
      },
      [SERVICES.SEA_CBM_VIA_UAE_TRUCK_YEMEN]: { 
        name: 'بحر (م³) مباشر عدن/المكلا (30-40 يوم)', 
        icon: '⛴️', 
        color: '#00796b', 
        time: '30-40 يوم' 
      },
      [SERVICES.SEA_CBM_DIRECT_ADEN_MUKALLA]: { 
        name: 'بحر (م³) عبر الإمارات - بري اليمن (40-50 يوم)', 
        icon: '🚤', 
        color: '#004d40', 
        time: '40-50 يوم' 
      }
    };
    
    // Build service cards HTML
    let servicesHTML = '';
    Object.keys(serviceResults).forEach(serviceCode => {
      const result = serviceResults[serviceCode];
      if(!result) {
        console.warn(`No result for service: ${serviceCode}`);
        return;
      }
      
      const info = serviceInfo[serviceCode];
      if(!info) {
        console.warn(`No info for service: ${serviceCode}`);
        return;
      }
      
      const priceUSD = result.totalPrice.toFixed(2);
      const priceYER = (result.totalPrice * 530).toFixed(0); // Approximate YER conversion
      const insuranceSummary = result.insurance && result.insurance.success ? result.insurance.calculation : null;
      const customsSummary = result.customs && result.customs.success ? result.customs.calculation : null;
      const coverageParts = ['الشحن'];
      if(insuranceSummary) coverageParts.push('التأمين');
      if(customsSummary) coverageParts.push('الجمارك');
      const coverageText = coverageParts.join(' + ');
      
      // Check if this is the selected service
      const isSelected = serviceCode === selectedService;
      const selectedBadge = isSelected ? '<div style="position:absolute;top:8px;right:8px;background:#00C9A7;color:white;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;z-index:10">✓ اختيارك</div>' : '';
      const borderStyle = isSelected ? 'border:2px solid #00C9A7;box-shadow:0 0 20px rgba(0,201,167,0.3)' : '';
      
      servicesHTML += `
        <div class="service-option-card" style="border-color:${info.color};${borderStyle};position:relative">
          ${selectedBadge}
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div style="width:48px;height:48px;background:linear-gradient(135deg,${info.color},${info.color}dd);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px">${info.icon}</div>
            <div style="flex:1">
              <h3 style="margin:0;color:var(--weps-navy);font-size:16px">${info.name}</h3>
            </div>
          </div>
          <div class="price" style="font-size:24px;margin:10px 0;color:${info.color}">${priceYER} ريال</div>
          <div class="small" style="color:#6b7280;margin-bottom:6px">($${priceUSD}) يشمل ${coverageText}</div>
          ${insuranceSummary ? `<div class="small" style="color:#4caf50">✓ التأمين (Clause ${insuranceSummary.insurance_clause}): $${insuranceSummary.final_premium.toFixed(2)}</div>` : '<div class="small" style="color:#4caf50">✓ التأمين: يضاف تلقائياً حسب المخاطر</div>'}
          ${customsSummary ? `<div class="small" style="color:#d84315">⚖️ الجمارك (${customsSummary.final_rate_percent.toFixed(2)}%): $${customsSummary.total_customs_usd.toFixed(2)}</div>` : '<div class="small" style="color:#d84315">⚖️ الجمارك: سيتم احتسابها بعد إدخال القيمة</div>'}
        </div>
      `;
    });
    
    resultsArea.innerHTML = `
      <div class="small">Offer ID: <strong>${offerId}</strong></div>
      <div style="margin-top:12px;padding:12px;background:#fff7ed;border-radius:8px;border:1px solid rgba(245,130,32,0.2)">
        <div style="font-weight:900;margin-bottom:8px">📦 تفاصيل الشحنة</div>
        <div class="small">المنتج: <strong>${productTypeAr}</strong> | الوزن: <strong>${totalWeight} كجم</strong> | القيمة: <strong>$${cargoValue}</strong></div>
      </div>
      <div style="margin-top:16px;font-weight:900;font-size:18px;color:var(--weps-navy);text-align:center;padding:12px;background:linear-gradient(135deg,#fff7ed,#fff);border-radius:12px;border:2px solid rgba(245,130,32,0.2)">🚀 اختر الخدمة المناسبة لك (6 خيارات)</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:16px">
        ${servicesHTML}
      </div>
      <div style="margin-top:12px" class="small">ملاحظة: يرجى كتابة رقم العرض <strong>${offerId}</strong> على الشحنة — عدم كتابة رقم العرض قد يعرض الشحنة للضياع.</div>
    `;
    
    comparisonWrap.innerHTML = '';
    
    // Scroll to results
    resultsArea.scrollIntoView({behavior:'smooth', block:'start'});
    
    // Show success toast
    showToast('success', 'تم الحساب بنجاح', `تم حساب الأسعار لجميع الخدمات الستة - رقم العرض: ${offerId}`);
    
    // Remove loading
    calculateBtn.classList.remove('loading');
    calculateBtn.disabled = false;
    if(downloadOfferBtnHTML) downloadOfferBtnHTML.style.display = 'inline-block';
    if(downloadOfferBtnPDF) downloadOfferBtnPDF.style.display = 'inline-block';
    waDiscussBtn.style.display = 'inline-block';
    
    // Start 10-second timer to show survey popup
    setTimeout(() => {
      showSurveyPopup();
    }, 10000);
    
    // Store results for download
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerType = customerTypeEl.value;
    const companyName = companyNameEl ? companyNameEl.value.trim() : '';
    
    // Collect supplier information
    const supplierName = document.getElementById('supplierName')?.value.trim() || '';
    const supplierContact = document.getElementById('supplierContact')?.value.trim() || '';
    const supplierCountry = document.getElementById('supplierCountry')?.value.trim() || '';
    const supplierAddress = document.getElementById('supplierAddress')?.value.trim() || '';
    const supplierEmail = document.getElementById('supplierEmail')?.value.trim() || '';
    const supplierPhone = document.getElementById('supplierPhone')?.value.trim() || '';
    
    window.__lastCalculationResults = {
      offerId,
      serviceResults,
      productCode,
      productTypeAr,
      totalWeight,
      cargoValue,
      originCountry,
      destCity,
      selectedService: selectedService,
      customerName,
      customerPhone,
      customerType,
      companyName,
      supplierName,
      supplierContact,
      supplierCountry,
      supplierAddress,
      supplierEmail,
      supplierPhone,
      parcels: processedParcels
    };
    
  }catch(err){
    console.error('computeAndRender error:', err);
    showToast('error', 'حدث خطأ', 'حدث خطأ أثناء معالجة البيانات: ' + (err.message || err));
    calculateBtn.classList.remove('loading');
    calculateBtn.disabled = false;
  }
}
window.selectServiceOption = function(optionKey){
  if(!optionKey) return;
  const mapping = {
    express: 'wepsExpress',
    air: 'wepsAir',
    sea: 'wepsSea'
  };
  const resolved = mapping[optionKey] || optionKey;
  window.__selectedService = resolved;
  document.querySelectorAll('.service-option-card').forEach(card=>{
    const cardId = card.getAttribute('id') || '';
    const isMatch = (optionKey === 'express' && cardId === 'optionExpress') ||
                    (optionKey === 'air' && cardId === 'optionAir') ||
                    (optionKey === 'sea' && cardId === 'optionSea');
    card.classList.toggle('selected', isMatch);
  });
};
/* reset */
document.getElementById('resetBtn').addEventListener('click', ()=>{
  fullForm.reset(); quickForm.reset();
  parcelsArea.innerHTML = `<div class="parcel">
    <div class="parcel-field">
      <label>L (سم)</label>
      <input class="p-length" type="number" placeholder="مثال: 50"/>
    </div>
    <div class="parcel-field">
      <label>W (سم)</label>
      <input class="p-width" type="number" placeholder="مثال: 40"/>
    </div>
    <div class="parcel-field">
      <label>H (سم)</label>
      <input class="p-height" type="number" placeholder="مثال: 30"/>
    </div>
    <div class="parcel-field">
      <label>KG</label>
      <input class="p-weight" type="number" placeholder="مثال: 12.5"/>
    </div>
    <input class="p-qty" type="hidden" value="1"/>
  </div>`;
  resultsArea.innerHTML = '<div class="small">اضغط على الزر "اعرف كم بتكلفك الشحنة بذكاء مع Weps" لعرض النتائج.</div>';
  comparisonWrap.innerHTML='';
  showToast('info', 'تم إعادة الضبط', 'تم مسح جميع البيانات بنجاح');
  // Discount reset code removed
  updateVASSummary();
  document.querySelectorAll('.step-block').forEach(block=>{
    block.classList.remove('collapsed');
    const headerBtn = block.querySelector('.step-header-btn');
    if(headerBtn){
      headerBtn.setAttribute('aria-expanded', 'true');
    }
  });
});
document.getElementById("calculateBtn").addEventListener("click", ()=>computeAndRender());

function openQuickWhatsApp(){
  openChatPanel();
}

// openContractWhatsApp function removed

function addWarehousesToMap(){
  if(!originMap){
    initOriginMap();
  }
  if(!originMap){
    return;
  }
  originWarehouseMarkers.forEach(m => m.remove());
  originWarehouseMarkers = [];
  
  const country = originCountryEl.value || '';
  let warehouses = [];
  
  if(country === "CN" || country === "الصين"){
    warehouses = WAREHOUSES.china.slice();
  } else {
    warehouses = WAREHOUSES.shopAndShip.slice();
    if(country && country !== ""){
      const countryCode = getCountryCode(country);
      if(countryCode){
        const filtered = warehouses.filter(w => w.country === countryCode);
        if(filtered.length){
          warehouses = filtered;
        }
      }
    }
  }
  
  const validWarehouses = warehouses.filter(w => typeof w.lng === 'number' && typeof w.lat === 'number');
  
  validWarehouses.forEach(warehouse => {
    const el = document.createElement('div');
    el.className = 'warehouse-marker';
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.background = '#f58220';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid #fff';
    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    el.style.cursor = 'pointer';
    
    const warehouseDisplayName = country === "CN" || country === "الصين" 
      ? `مخزن ويبس - ${warehouse.name.replace('Warehouse', '').replace('Swift Warehouse', '').trim()}`
      : `مخزن ويبس - ${warehouse.name.replace('Shop & Ship', '').trim()}`;
    
    const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, closeOnClick: false })
      .setHTML(`
        <div style="padding:8px;min-width:200px">
          <div style="font-weight:800;color:#0b1220;margin-bottom:6px;font-size:14px">${warehouseDisplayName}</div>
          <div style="font-size:12px;color:#6b7280;margin-bottom:4px">${warehouse.address}</div>
          ${warehouse.dxbNumber ? `<div style="font-size:11px;color:#f58220;margin-top:6px;font-weight:700">DXB: ${warehouse.dxbNumber}</div>` : ''}
          ${warehouse.phone ? `<div style="font-size:11px;color:#6b7280;margin-top:4px">📞 ${warehouse.phone}</div>` : ''}
        </div>
      `);
    
    const marker = new mapboxgl.Marker(el)
      .setLngLat([warehouse.lng, warehouse.lat])
      .setPopup(popup)
      .addTo(originMap);
    
    originWarehouseMarkers.push(marker);
  });
  
  if(validWarehouses.length > 0){
    const bounds = new mapboxgl.LngLatBounds();
    validWarehouses.forEach(w => bounds.extend([w.lng, w.lat]));
    originMap.fitBounds(bounds, { padding: 50, maxZoom: 10 });
  }
  if(currentOriginLocation && currentNearestWarehouse){
    drawOriginWarehouseLine(currentOriginLocation, currentNearestWarehouse, currentWarehouseRouteGeoJSON);
  }
}
async function geocodeAddress(query, countryHint){
  if(!query || !window.fetch || !mapboxgl || !mapboxgl.accessToken) return null;
  const raw = query.toString();
  const cleaned = cleanAddress(raw);
  const normalized = normalizeAddressForMapbox(cleaned || raw);
  const trimmed = normalized.trim().slice(0, 250);
  if(!trimmed) return null;
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmed)}.json?access_token=${mapboxgl.accessToken}&limit=1&language=ar,en`;
  const detectedCountry = detectCountryFromText(countryHint || normalized);
  if(detectedCountry && COUNTRY_ISO_MAP[detectedCountry]){
    url += `&country=${COUNTRY_ISO_MAP[detectedCountry]}`;
  }
  try{
    const res = await fetch(url);
    if(!res.ok) return null;
    const data = await res.json();
    if(!data.features || !data.features.length) return null;
    const feature = data.features[0];
    if(!feature.center || feature.center.length < 2) return null;
    let countryCode = null;
    let countryName = '';
    if(Array.isArray(feature.context)){
      const countryContext = feature.context.find(c => c.id && c.id.startsWith('country'));
      if(countryContext){
        countryCode = countryContext.short_code || countryContext.text || null;
        countryName = countryContext.text || '';
      }
    }
    return {
      lng: feature.center[0],
      lat: feature.center[1],
      label: feature.place_name || trimmed,
      countryCode,
      countryName
    };
  }catch(err){
    console.warn('Mapbox geocoding failed:', err);
    return null;
  }
}
function drawOriginWarehouseLine(originCoords, warehouse, routeFeature){
  if(!originMap){
    return;
  }
  const redraw = () => {
    if(originMap.getLayer('origin-warehouse-line')){
      originMap.removeLayer('origin-warehouse-line');
    }
    if(originMap.getSource('origin-warehouse-line')){
      originMap.removeSource('origin-warehouse-line');
    }
    originWarehouseLineDrawn = false;
    if(!originCoords || !warehouse) return;
    let geometry = null;
    if(routeFeature && routeFeature.geometry && routeFeature.geometry.type === 'LineString'){
      geometry = routeFeature.geometry;
    }
    if(!geometry){
      geometry = {
        type:'LineString',
        coordinates:[
          [originCoords.lng, originCoords.lat],
          [warehouse.lng, warehouse.lat]
        ]
      };
    }
    originMap.addSource('origin-warehouse-line', {
      type:'geojson',
      data:{
        type:'Feature',
        geometry
      }
    });
    originMap.addLayer({
      id:'origin-warehouse-line',
      type:'line',
      source:'origin-warehouse-line',
      layout:{ 'line-cap':'round', 'line-join':'round' },
      paint:{
        'line-color':'#00C9A7',
        'line-width':4,
        'line-dasharray':[2,2]
      }
    });
    originWarehouseLineDrawn = true;
  };
  if(typeof originMap.isStyleLoaded === 'function' && !originMap.isStyleLoaded()){
    originMap.once('load', redraw);
    return;
  }
  redraw();
}
function updateRouteDistanceDisplay(distanceKm, durationMinutes){
  const summaryEl = document.getElementById('warehouseRouteSummary');
  if(!summaryEl) return;
  
  if(!distanceKm || distanceKm <= 0){
    summaryEl.style.display = 'none';
    return;
  }
  
  summaryEl.style.display = 'block';
  const distanceText = distanceKm.toFixed(1);
  
  if(durationMinutes && durationMinutes > 0){
    const hours = Math.floor(durationMinutes / 60);
    const mins = Math.round(durationMinutes % 60);
    const timeText = hours > 0 ? `${hours} ساعة ${mins > 0 ? `و ${mins} دقيقة` : ''}` : `${mins} دقيقة`;
    summaryEl.innerHTML = `🚚 المسافة الفعلية: <strong>${distanceText} كم</strong> عبر الطريق (${timeText})`;
  } else {
    summaryEl.innerHTML = `🚚 المسافة التقريبية: <strong>${distanceText} كم</strong> (خط مستقيم)`;
  }
}

function clearRouteDistanceDisplay(){
  updateRouteDistanceDisplay(0);
}

function getRouteCacheKey(originCoords, warehouse){
  // Calculations removed
  if(!originCoords || !warehouse) return '';
  return `${originCoords.lng},${originCoords.lat}::${warehouse.lng},${warehouse.lat}`;
}

async function updateRouteBetweenOriginAndWarehouse(options = {}){
  const { silent = false } = options;
  if(!currentOriginLocation || !currentNearestWarehouse){
    currentWarehouseRouteGeoJSON = null;
    clearRouteDistanceDisplay();
    drawOriginWarehouseLine(null, null);
    return null;
  }
  if(typeof fetch !== 'function' || !mapboxgl || !mapboxgl.accessToken){
    currentWarehouseRouteGeoJSON = null;
    drawOriginWarehouseLine(currentOriginLocation, currentNearestWarehouse, null);
    return null;
  }
  const routeKey = getRouteCacheKey(currentOriginLocation, currentNearestWarehouse);
  if(routeKey && routeKey === lastComputedRouteKey && currentWarehouseRouteGeoJSON){
    drawOriginWarehouseLine(currentOriginLocation, currentNearestWarehouse, currentWarehouseRouteGeoJSON);
    updateRouteDistanceDisplay(currentNearestWarehouse.routeDistanceKm || 0, currentNearestWarehouse.routeDurationMin || 0);
    return currentWarehouseRouteGeoJSON;
  }
  if(warehouseRouteAbortController && typeof warehouseRouteAbortController.abort === 'function'){
    warehouseRouteAbortController.abort();
  }
  warehouseRouteAbortController = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const signal = warehouseRouteAbortController ? warehouseRouteAbortController.signal : undefined;
  const origin = currentOriginLocation;
  const warehouse = currentNearestWarehouse;
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${warehouse.lng},${warehouse.lat}?geometries=geojson&overview=full&language=ar&access_token=${mapboxgl.accessToken}`;
  try{
    const res = await fetch(directionsUrl, { signal });
    if(!res.ok){
      throw new Error(`Directions status ${res.status}`);
    }
    const json = await res.json();
    const route = json?.routes?.[0];
    if(route && route.geometry){
      currentWarehouseRouteGeoJSON = {
        type:'Feature',
        geometry: route.geometry,
        properties:{
          distance: route.distance || 0,
          duration: route.duration || 0
        }
      };
      const distanceKm = (route.distance || 0) / 1000;
      const durationMin = (route.duration || 0) / 60;
      currentNearestWarehouse.routeDistanceKm = distanceKm;
      currentNearestWarehouse.routeDurationMin = durationMin;
      lastComputedRouteKey = routeKey;
      drawOriginWarehouseLine(origin, warehouse, currentWarehouseRouteGeoJSON);
      updateRouteDistanceDisplay(distanceKm, durationMin);
      return currentWarehouseRouteGeoJSON;
    }
    throw new Error('No route geometry returned');
  }catch(err){
    if(err && err.name === 'AbortError'){
      return null;
    }
    if(!silent){
      console.warn('Mapbox directions error:', err);
    }
    currentWarehouseRouteGeoJSON = null;
    currentNearestWarehouse.routeDistanceKm = calculateDistance(origin.lat, origin.lng, warehouse.lat, warehouse.lng);
    currentNearestWarehouse.routeDurationMin = undefined;
    drawOriginWarehouseLine(origin, warehouse, null);
    updateRouteDistanceDisplay(currentNearestWarehouse.routeDistanceKm || 0);
    return null;
  }
}

async function ensureCurrentWarehouseRoute(){
  if(!currentOriginLocation || !currentNearestWarehouse){
    return null;
  }
  if(currentNearestWarehouse.routeDistanceKm && currentNearestWarehouse.routeDistanceKm > 0){
    return currentWarehouseRouteGeoJSON;
  }
  return updateRouteBetweenOriginAndWarehouse({ silent:true });
}

function guessAddressFromText(text){
  if(!text) return '';
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const regex = /(street|st\.|road|rd\.|avenue|ave|city|zone|district|industrial|building|block|zip|postal|p\.o|suite|no\.|lot|park|area|village)/i;
  for(let i=0;i<lines.length;i++){
    const line = lines[i];
    if(regex.test(line) && /\d/.test(line)){
      const context = [lines[i-1], line, lines[i+1]].filter(Boolean);
      return context.join(', ');
    }
  }
  return '';
}

function ensureAutoOriginLocation(address, countryHint){
  if(address && typeof address === 'object'){
    const label = address.label || address.address || address.description || guessAddressFromText(lastExtractedText);
    const lat = coerceNumeric(address.lat ?? address.latitude);
    const lng = coerceNumeric(address.lng ?? address.longitude);
    if(isFinite(lat) && isFinite(lng)){
      setOriginMarker(lng, lat, label || 'موقع الشحنة');
      currentOriginLocation = { lng, lat, label: label || 'موقع الشحنة' };
      if(countryHint || address.country){
        const matched = findCountryOption(originCountryEl, address.country || countryHint);
        if(matched){
          originCountryEl.value = matched.value || matched.text;
          originCountryEl.dispatchEvent(new Event('change'));
        }
      }
      return;
    }
    const fallbackCandidate = label || guessAddressFromText(lastExtractedText);
    if(fallbackCandidate){
      autoSetOriginLocation(fallbackCandidate, address.country || countryHint || fallbackCandidate);
      return;
    }
  }
  const candidate = address || guessAddressFromText(lastExtractedText);
  if(candidate){
    autoSetOriginLocation(candidate, countryHint || candidate);
  }
}

function cleanAddress(raw){
  if(!raw) return '';
  return raw
    .replace(/Add(?:ress)?[:：]/gi, '')
    .replace(/Address(?:es)?[:：]/gi, '')
    .replace(/Tel[:：].*/gi, '')
    .replace(/Fax[:：].*/gi, '')
    .replace(/Attn[:：].*/gi, '')
    .replace(/P\.?O\.?\s*Box[:：]?.*/gi, '')
    .replace(/\r?\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalizeAddressForMapbox(address){
  if(!address) return '';
  let normalized = address.trim();
  if(/^China[,，]?\s*/i.test(normalized)){
    normalized = normalized.replace(/^China[,，]?\s*/i, '');
  }
  if(!/China$/i.test(normalized)){
    normalized = `${normalized}, China`;
  }
  normalized = normalized.replace(/\s*,\s*,/g, ',').replace(/\s+,/g, ', ').replace(/,\s+/g, ', ').trim();
  return normalized;
}

function toggleDiscount(type){
  const map = {
    firstTime: { checkboxId:'discountFirstTime', cardId:'discountCardFirstTime' },
    sme: { checkboxId:'discountSME', cardId:'discountCardSME' },
    contract: { checkboxId:'discountContract', cardId:'discountCardContract' }
  };
  const entry = map[type];
  if(!entry) return;
  const checkbox = document.getElementById(entry.checkboxId);
  const card = document.getElementById(entry.cardId);
  if(!checkbox) return;
  const newState = !checkbox.checked;
  checkbox.checked = newState;
  if(card){
    card.classList.toggle('selected', newState);
  }
  computeAndRender();
}

async function autoSetOriginLocation(address, countryHint){
  if(!address) return;
  if(!originMap) initOriginMap();
  const result = await geocodeAddress(address, countryHint);
  if(result){
    setOriginMarker(result.lng, result.lat, result.label);
    if(originMap){
      originMap.flyTo({ center:[result.lng, result.lat], zoom: Math.max(originMap.getZoom(), 6) });
    }
    if(result.countryCode || result.countryName){
      const display = result.countryName || getCountryDisplayNameFromIso(result.countryCode) || '';
      if(originCountryEl){
        const matched = findCountryOption(originCountryEl, display);
        if(matched){
          originCountryEl.value = matched.value || matched.text;
          originCountryEl.dispatchEvent(new Event('change'));
        }
      }
    }
  }
}
function getCountryCode(countryName){
  // Map common country names to codes
  const countryMap = {
    'الإمارات': 'AE', 'UAE': 'AE', 'دبي': 'AE',
    'الولايات المتحدة': 'US', 'USA': 'US', 'أمريكا': 'US',
    'المملكة المتحدة': 'GB', 'UK': 'GB', 'بريطانيا': 'GB',
    'تركيا': 'TR', 'Turkey': 'TR',
    'الصين': 'CN', 'China': 'CN',
    'كندا': 'CA', 'Canada': 'CA',
    'أستراليا': 'AU', 'Australia': 'AU',
    'الهند': 'IN', 'India': 'IN',
    'ألمانيا': 'DE', 'Germany': 'DE',
    'فرنسا': 'FR', 'France': 'FR',
    'إيطاليا': 'IT', 'Italy': 'IT',
    'اليابان': 'JP', 'Japan': 'JP',
    'كوريا': 'KR', 'Korea': 'KR',
    'تايلاند': 'TH', 'Thailand': 'TH',
    'ماليزيا': 'MY', 'Malaysia': 'MY',
    'سنغافورة': 'SG', 'Singapore': 'SG',
    'إندونيسيا': 'ID', 'Indonesia': 'ID',
    'الفلبين': 'PH', 'Philippines': 'PH',
    'فيتنام': 'VN', 'Vietnam': 'VN',
    'السعودية': 'SA', 'Saudi Arabia': 'SA',
    'هونغ كونغ': 'HK', 'Hong Kong': 'HK',
    'قطر': 'QA', 'Qatar': 'QA',
    'الكويت': 'KW', 'Kuwait': 'KW',
    'عمان': 'OM', 'Oman': 'OM',
    'الأردن': 'JO', 'Jordan': 'JO',
    'لبنان': 'LB', 'Lebanon': 'LB',
    'مصر': 'EG', 'Egypt': 'EG',
    'المغرب': 'MA', 'Morocco': 'MA',
    'جنوب أفريقيا': 'ZA', 'South Africa': 'ZA',
    'نيجيريا': 'NG', 'Nigeria': 'NG',
    'كينيا': 'KE', 'Kenya': 'KE'
  };
  return countryMap[countryName] || null;
}
// Product descriptions mapping
const PRODUCT_DESCRIPTIONS = {
  'إلكترونيات': 'منتجات إلكترونية تشمل أجهزة الكمبيوتر، الهواتف، الأجهزة اللوحية، الكاميرات، وأجهزة الصوت والمرئيات. تتطلب تعبئة محكمة وحماية من الصدمات.',
  'ملابس': 'ملابس وأزياء متنوعة تشمل القمصان، البناطيل، الفساتين، الأحذية، والإكسسوارات. خفيفة الوزن وسهلة التعبئة.',
  'معدات صناعية': 'معدات وآلات صناعية تشمل قطع الغيار، الأدوات، الماكينات، والمكونات الصناعية. قد تحتاج إلى تعبئة خاصة حسب الحجم والوزن.',
  'مواد غذائية': 'مواد غذائية متنوعة تشمل المعلبات، البقوليات، التوابل، والحلويات. تتطلب تعبئة مناسبة ومراعاة تاريخ الصلاحية.',
  'أدوات منزلية': 'أدوات وأجهزة منزلية تشمل الأواني، الأجهزة الكهربائية الصغيرة، أدوات المطبخ، ومستلزمات المنزل.',
  'قطع غيار': 'قطع غيار للسيارات، الأجهزة، أو المعدات. قد تكون صغيرة أو كبيرة حسب نوع القطعة.',
  'معدات طبية': 'معدات وأجهزة طبية تشمل أجهزة القياس، الأدوات الطبية، والمستلزمات الطبية. تتطلب شهادات ووثائق خاصة.',
  'أجهزة كهربائية': 'أجهزة كهربائية منزلية أو صناعية تشمل المكيفات، الثلاجات، الغسالات، والأجهزة الكهربائية الأخرى.',
  'مواد بناء': 'مواد بناء وتشطيبات تشمل السيراميك، البلاط، الدهانات، والمواد الإنشائية. قد تكون ثقيلة أو هشة.',
  'ألعاب': 'ألعاب أطفال أو إلكترونية. خفيفة الوزن عادة وتحتاج تعبئة مناسبة.',
  'كتب ومجلات': 'كتب، مجلات، ومواد مطبوعة. خفيفة الوزن وسهلة التعبئة.',
  'مستحضرات تجميل': 'مستحضرات تجميل وعناية شخصية. قد تحتاج إلى تعبئة خاصة حسب نوع المنتج.',
  'أثاث': 'أثاث منزلي أو مكتبي. قد يكون كبير الحجم وثقيل الوزن ويتطلب تعبئة خاصة.',
  'عام': 'بضاعة متنوعة. يرجى وصف البضاعة بدقة في الحقل أدناه.'
};
function getProductDescription(productType){
  if(!productType) return '';
  
  const typeLower = productType.toLowerCase();
  
  // Try exact match first
  for(const [key, desc] of Object.entries(PRODUCT_DESCRIPTIONS)){
    if(typeLower === key.toLowerCase() || typeLower.includes(key.toLowerCase())){
      return desc;
    }
  }
  
  // Try pattern matching
  if(/(إلكترون|electronics|كمبيوتر|computer|هاتف|phone|كاميرا|camera)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['إلكترونيات'];
  }
  if(/(ملابس|clothes|أزياء|fashion|قميص|shirt|بنطلون|pants)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['ملابس'];
  }
  if(/(صناعي|industrial|معدات صناعية|آلات|machinery|tools)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['معدات صناعية'];
  }
  if(/(غذائي|food|مواد غذائية|معلبات|canned)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['مواد غذائية'];
  }
  if(/(منزلي|household|أدوات منزلية|أواني|kitchen)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['أدوات منزلية'];
  }
  if(/(قطع غيار|spare parts|parts)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['قطع غيار'];
  }
  if(/(طبي|medical|أسنان|dental|معدات طبية)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['معدات طبية'];
  }
  if(/(كهربائي|electrical|مكيف|air conditioner|ثلاجة|refrigerator)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['أجهزة كهربائية'];
  }
  if(/(بناء|construction|سيراميك|ceramic|بلاط|tiles)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['مواد بناء'];
  }
  if(/(ألعاب|toys|games)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['ألعاب'];
  }
  if(/(كتب|books|مجلات|magazines)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['كتب ومجلات'];
  }
  if(/(تجميل|cosmetics|مستحضرات)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['مستحضرات تجميل'];
  }
  if(/(أثاث|furniture)/.test(typeLower)){
    return PRODUCT_DESCRIPTIONS['أثاث'];
  }
  
  // Default
  return PRODUCT_DESCRIPTIONS['عام'];
}

productTypeEl.addEventListener('change', ()=>{
  const triggeredByAuto = productTypeEl.dataset.autoAssign === '1';
  if(triggeredByAuto){
    delete productTypeEl.dataset.autoAssign;
  } else {
    productTypeEl.dataset.manual = 'true';
  }
  const productType = (productTypeEl.value || '').toLowerCase();
  const keys = [];
  if(/(طبي|medical|أسنان|dental|معدات طبية)/.test(productType)){
    keys.push('medical');
  }
  if(/(صناعي|industrial|معدات صناعية|آلات|machinery|spare)/.test(productType)){
    keys.push('industrial');
  }
  if(/(إلكترون|electronics|كمبيوتر|computer)/.test(productType)){
    keys.push('electronics');
  }
  setSmartAlertSource('productType', keys);
  if(!triggeredByAuto){
    const autoDesc = getProductDescription(productTypeEl.value);
    if(autoDesc){
      setProductDescriptionAuto(autoDesc, 'productType');
    }
  }
});
productTypeEl.addEventListener('mousedown', ()=> productTypeEl.dataset.manual = 'true');
productTypeEl.addEventListener('touchstart', ()=> productTypeEl.dataset.manual = 'true');

productCategoryEl.addEventListener('change', ()=>{
  const category = productCategoryEl.value;
  const keys = [];
  if(category === 'fragile'){
    keys.push('fragile');
  }
  if(category === 'dangerous'){
    keys.push('dangerous');
  }
  setSmartAlertSource('productCategory', keys);
});

/* ====== Invoice/File Analysis with OpenAI ====== */
// OpenAI API Key - Hidden in code
const OPENAI_API_KEY = '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';

function getOpenAIKey(){
  return OPENAI_API_KEY;
}

async function handleFileUpload(eventOrFiles){
  let files = [];
  if(eventOrFiles instanceof DragEvent){
    files = Array.from(eventOrFiles.dataTransfer?.files || []);
  } else if(eventOrFiles?.dataTransfer?.files){
    files = Array.from(eventOrFiles.dataTransfer.files);
  } else if(eventOrFiles?.target?.files){
    files = Array.from(eventOrFiles.target.files);
  } else if(eventOrFiles instanceof FileList){
    files = Array.from(eventOrFiles);
  } else if(Array.isArray(eventOrFiles)){
    files = eventOrFiles.filter(file=>file instanceof File);
  }
  if(!files.length){
    return;
  }
  await processUploadedFiles(files);
  if(eventOrFiles?.target){
    eventOrFiles.target.value = '';
  }
}

async function processUploadedFiles(files){
  if(!files || !files.length){
    showToast('warning','لا توجد ملفات','يرجى اختيار ملف أو سحبه داخل الحاسبة.');
    return;
  }
  if(isProcessingUploads){
    showToast('info','جاري التحليل','يرجى الانتظار حتى ينتهي تحليل الملفات الحالية.');
    return;
  }
  const apiKey = getOpenAIKey();
  if(!apiKey || apiKey.trim() === ''){
    showToast('error', 'خطأ في الإعدادات', 'مفتاح API غير متوفر. يرجى التواصل مع الدعم الفني.');
    return;
  }
  const validFiles = files.filter(file=>file && file.size);
  if(!validFiles.length){
    showToast('warning','ملف غير صالح','لم يتم العثور على ملفات قابلة للتحليل.');
    return;
  }
  isProcessingUploads = true;
  resetAnalysisStateForNewBatch();
  try{
    for(let index = 0; index < validFiles.length; index++){
      const file = validFiles[index];
      try{
        await analyzeUploadedFile(file, {index, total: validFiles.length, isAdditional: index > 0});
        uploadedFilesMeta.push({name:file.name, size:file.size, type:file.type});
      }catch(err){
        console.error('File analysis error:', file?.name || 'unknown', err);
        showToast('error','تعذر معالجة ملف', `حدث خطأ أثناء تحليل الملف ${file?.name || ''}.`);
      }
    }
    applyTextFallbacks(combinedExtractedText);
  } finally {
    isProcessingUploads = false;
  }
}

function resetAnalysisStateForNewBatch(){
  parsedDataCache = null;
  parcelsSetByParsed = false;
  lastAnalysisResult = null;
  lastExtractionMeta = {};
  lastExtractedText = '';
  combinedExtractedText = '';
  uploadedFilesMeta = [];
  window.__currentFile = null;
  currentOriginLocation = null;
  currentNearestWarehouse = null;
  drawOriginWarehouseLine(null, null);
  currentWarehouseRouteGeoJSON = null;
  lastComputedRouteKey = '';
  clearRouteDistanceDisplay();
  setSmartAlertSource('productType', []);
  setSmartAlertSource('productCategory', []);
  setSmartAlertSource('description', []);
}

async function analyzeUploadedFile(file, context = {}){
  if(!file){
    return;
  }
  const { isAdditional = false, index = 0, total = 1 } = context;
  const positionLabel = total > 1 ? ` (${index + 1}/${total})` : '';
  const validTypes = [
    'application/pdf', 
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ];
  if(!validTypes.includes(file.type)){
    showToast('error', 'نوع ملف غير مدعوم', `الملف ${file.name} غير مدعوم. يرجى رفع ملف PDF، Excel، Word، أو صورة (JPG/PNG)`);
    return;
  }
  const progressDiv = document.getElementById('fileUploadProgress');
  const progressBar = document.getElementById('progressBarFill');
  const statusText = document.getElementById('uploadStatus');
  const updateUploadStatus = (percent, message)=>{
    if(progressDiv){
      progressDiv.classList.add('active');
    }
    if(progressBar && typeof percent === 'number'){
      progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    }
    if(statusText && message){
      statusText.textContent = message;
    }
  };
  const resetUploadStatus = ()=>{
    if(progressBar){
      progressBar.style.width = '0%';
    }
    if(progressDiv){
      progressDiv.classList.remove('active');
    }
  };
  updateUploadStatus(15, `تهيئة معالجة ${file.name}${positionLabel}...`);
  try{
  let parsedData = null;
  try{
      updateUploadStatus(30, `تحليل بنية ${file.name}${positionLabel}...`);
    parsedData = await parseStructuredFile(file);
    if(parsedData){
        parsedDataCache = isAdditional && parsedDataCache
          ? mergeParsedDataCaches(parsedDataCache, parsedData)
          : parsedData;
        fillFormFromParsedData(parsedDataCache);
      } else if(!isAdditional){
      parsedDataCache = null;
      parcelsSetByParsed = false;
    }
  }catch(parseErr){
    console.warn('Structured parsing failed:', parseErr);
      if(!isAdditional){
        parsedDataCache = null;
        parcelsSetByParsed = false;
      }
    showToast('warning', 'تعذر قراءة بعض جداول الملف', 'سنواصل محاولة التحليل باستخدام الذكاء الاصطناعي مباشرةً.');
  }

    updateUploadStatus(45, `استخراج النص من ${file.name}${positionLabel}...`);
    const { text: fileText, warnings: extractionWarnings } = await extractFileText(file, parsedDataCache || parsedData);
  lastExtractionMeta = {
    warnings: extractionWarnings || [],
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    timestamp: new Date().toISOString()
  };
  lastExtractedText = fileText || '';
    combinedExtractedText += '\n' + (fileText || '');
  if(extractionWarnings && extractionWarnings.length){
    showToast('warning', 'ملاحظات استخراج النص', extractionWarnings.join('\n'));
  }
    window.__currentFile = file;
    
    updateUploadStatus(60, `تحويل ${file.name}${positionLabel} للتحليل...`);
    const base64 = await fileToBase64(file);
    updateUploadStatus(72, `إرسال ${file.name}${positionLabel} للذكاء الاصطناعي...`);
    const structuredContext = parsedDataCache || parsedData ? buildStructuredContext(parsedDataCache || parsedData) : null;
    const analysisResult = await analyzeFileWithOpenAI(base64, file.type, file, structuredContext, fileText);
    updateUploadStatus(88, `معالجة نتائج ${file.name}${positionLabel}...`);
    if(analysisResult){
      await extractAndFillData(analysisResult);
    }
    updateUploadStatus(100, `✅ تم تحليل ${file.name}${positionLabel}`);
    if(total === 1){
    showToast('success', 'تم التحليل بنجاح!', 'تم استخراج البيانات من الملف وملء الحقول تلقائياً');
    } else if(index === total - 1){
      showToast('success', 'اكتمل تحليل الملفات', 'تم تحليل جميع الملفات ودمج البيانات المستخرجة.');
    }
    setTimeout(()=>resetUploadStatus(), 1800);
  }catch(error){
    console.error('File analysis error:', error);
    let errorMessage = 'حدث خطأ أثناء تحليل الملف';
    if(error.message){
      if(/quota|exceeded|insufficient_quota/i.test(error.message)){
        errorMessage = '⚠️ تم تجاوز الحصة المخصصة في حساب OpenAI.\n\nلحل المشكلة:\n1. تحقق من رصيد حسابك على platform.openai.com/account/billing\n2. تأكد من وجود رصيد كافٍ (يُنصح بـ $5 على الأقل)\n3. تحقق من إعدادات الفوترة (Billing Settings)\n4. إذا كان الرصيد منخفضاً، أضف رصيداً جديداً\n\nبعد إضافة الرصيد، انتظر دقيقة ثم حاول مرة أخرى.';
      } else if(/Invalid API key|authentication/i.test(error.message)){
        errorMessage = 'مفتاح API غير صحيح أو منتهي الصلاحية. يرجى التحقق من المفتاح في إعدادات OpenAI.';
      } else if(/rate limit/i.test(error.message)){
        errorMessage = 'تم تجاوز حد الطلبات. يرجى المحاولة بعد قليل (عادة 1-2 دقيقة).';
      } else {
        errorMessage = error.message;
      }
    }
    if(parsedDataCache){
      showToast('warning', 'تحليل جزئي', `${errorMessage}\n\nتم الاعتماد على البيانات المرفوعة فقط بدون تحليل بالذكاء الاصطناعي.`);
    } else {
      showToast('error', 'خطأ في التحليل', errorMessage);
    }
    resetUploadStatus();
  }
}

function preventFileDropDefaults(event){
  event.preventDefault();
  event.stopPropagation();
}
function handleFileDragOver(event){
  preventFileDropDefaults(event);
  if(fileUploadSection){
    fileUploadSection.classList.add('dragover');
  }
}
function handleFileDragLeave(event){
  preventFileDropDefaults(event);
  if(fileUploadSection){
    if(event.target !== fileUploadSection && fileUploadSection.contains(event.relatedTarget)){
      return;
    }
    fileUploadSection.classList.remove('dragover');
  }
}
function handleFileDrop(event){
  preventFileDropDefaults(event);
  if(fileUploadSection){
    fileUploadSection.classList.remove('dragover');
  }
  const files = Array.from(event.dataTransfer?.files || []);
  if(files.length){
    handleFileUpload(files);
  }
}

['dragenter','dragover','dragleave','drop'].forEach(evt=>{
  document.addEventListener(evt, preventFileDropDefaults, false);
});

function fileToBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function analyzeFileWithOpenAI(base64, mimeType, file, structuredContext = null, fileText = ''){
  const apiKey = getOpenAIKey();
  if(!apiKey){
    throw new Error('مفتاح OpenAI غير متوفر.');
  }
  const isImage = mimeType.startsWith('image/');
  const maxTextLength = 20000;
  let extractedText = (fileText || '').replace(/\u0000/g, '').trim();
  if(extractedText.length > maxTextLength){
    extractedText = extractedText.slice(0, maxTextLength) + '\n[... تم اختصار النص المستخرج ...]';
  }

  let prompt = `
أنت مساعد مختص في استخراج بيانات الشحن لصالح منصة ويبس (Weps Platform).

مهمتك هي تحليل محتوى الفاتورة أو قائمة التعبئة المرفقة، واستخراج المعلومات الموجودة فعليًا داخل الملف فقط.
يُمنع تمامًا تخمين أو إنشاء أي بيانات غير مذكورة في الملف.

🎯 الهدف:
استخرج الحقول التالية كما هي مذكورة حرفيًا في الملف:

1. وصف الشحنة (shipment_description): وصف دقيق وواضح للبضاعة كما هو مكتوب في الملف.
2. عدد الطرود (number_of_packages): عدد الكراتين أو الصناديق أو الطرود.
3. الوزن الكلي لكل طرد (total_weight_per_package): الوزن لكل طرد أو الوزن الإجمالي للشحنة مع الوحدة.
4. أبعاد الطرد (package_dimensions): الأبعاد لكل طرد أو للشحنة بالكامل (مثلاً: "40x30x25 سم" أو "2.5 CBM").
5. اسم المورد (supplier_name): اسم المورد أو المصدر كما هو مكتوب في الفاتورة.
6. رقم جوال المورد (supplier_phone): رقم الهاتف أو الجوال للمورد إن وجد.
7. عنوان المورد (supplier_address): العنوان الكامل للمورد كما هو مكتوب.
8. اسم المستلم (consignee_name): اسم المستلم أو المستورد كما هو مكتوب في الملف.
9. رقم جوال المستلم (consignee_phone): رقم الهاتف للمستلم كما هو مكتوب في الملف.
10. قيمة الفاتورة والعملة (invoice_value): يجب استخراج المبلغ كما هو وكتابة العملة (مثال: 12500 USD أو 48000 CNY).

⚙️ صيغة الإخراج المطلوبة:
أعد فقط كائن JSON نظيف ومنسق بهذا الشكل:

{
  "shipment_description": "",
  "number_of_packages": "",
  "total_weight_per_package": "",
  "package_dimensions": "",
  "supplier_name": "",
  "supplier_phone": "",
  "supplier_address": "",
  "consignee_name": "",
  "consignee_phone": "",
  "invoice_value": {
    "amount": "",
    "currency": ""
  }
}

📋 القواعد الأساسية:
1. لا تُخمن أو تُنشئ بيانات غير موجودة في الملف.
2. استخدم النصوص والأسماء والأرقام كما هي مكتوبة دون تعديل أو ترجمة.
3. إذا لم تجد معلومة معينة، اترك الحقل فارغًا بين علامتي اقتباس ("").
4. إذا لم تتمكن من تحليل الملف لأي سبب، أعد بالضبط:
   {"error": "تعذر تحليل الملف أو استخراج البيانات."}
5. لا تكتب أي شروحات أو نصوص إضافية خارج كائن JSON.
`.trim();

  if(structuredContext){
    prompt += `\n\nالبيانات المهيكلة المتاحة (يمكن استخدامها للتحقق فقط إذا طابقت الوثيقة):\n${structuredContext}`;
  }

  const userContent = [];
  if(structuredContext){
    userContent.push({ type:'input_text', text:`البيانات المهيكلة المتاحة للتحقق:\n${structuredContext}` });
  }
  if(isImage){
    userContent.push({ type:'input_text', text:'يرجى تحليل الصورة التالية وفق التعليمات أعلاه واستخراج القيم كما هي مكتوبة.' });
    userContent.push({ type:'input_image', image_url:{ url:`data:${mimeType};base64,${base64}` } });
    if(extractedText){
      userContent.push({ type:'input_text', text:`النص المستخرج عبر OCR (قد يحتوي على أخطاء):\n${extractedText}` });
    }
  } else {
    const textPayload = extractedText || 'لم يتم استخراج نص من الوثيقة. إذا توفرت بيانات في الهيكل المرفق فاستخدمها فقط إن كانت مذكورة صراحةً في الوثيقة.';
    userContent.push({ type:'input_text', text:`النص المستخرج من الملف:\n${textPayload}` });
  }
  const inputItems = [
    {
      role:'system',
      content:[
        { type:'input_text', text: prompt }
      ]
    }
  ];

  const userPayload = userContent.length ? userContent : [{ type:'input_text', text:'لم يتم استخراج نص من الوثيقة. إذا توفرت بيانات في الهيكل المرفق فاستخدمها فقط إن كانت مذكورة صراحةً في الوثيقة.' }];
  inputItems.push({
    role:'user',
    content:userPayload
  });

  const response = await fetch('https://api.openai.com/v1/responses', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${apiKey}`
    },
    body:JSON.stringify({
      model:'gpt-4o-mini',
      temperature:0,
      input: inputItems
    })
  });

  if(!response.ok){
    const errorText = await response.text().catch(()=>response.statusText);
    throw new Error(`فشل الاتصال بواجهة OpenAI (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  let rawText = '';
  if(Array.isArray(data.output)){
    data.output.forEach(block => {
      if(Array.isArray(block.content)){
        block.content.forEach(item => {
          if(item.type === 'output_text' || item.type === 'text'){
            rawText += item.text || '';
          }
        });
      }
    });
  }
  if(!rawText && Array.isArray(data.choices)){
    data.choices.forEach(choice => {
      const messageContent = choice.message?.content;
      if(Array.isArray(messageContent)){
        messageContent.forEach(item => {
          if(item.type === 'text') rawText += item.text || '';
        });
      } else if(typeof messageContent === 'string'){
        rawText += messageContent;
      }
    });
  }
  rawText = (rawText || '').replace(/```json/gi,'').replace(/```/g,'').trim();
  if(!rawText){
    throw new Error('استجابة فارغة من OpenAI.');
  }
  let parsed;
  try{
    parsed = JSON.parse(rawText);
  }catch(parseErr){
    const match = rawText.match(/\{[\s\S]*\}/);
    if(match){
      try{
        parsed = JSON.parse(match[0]);
      }catch(innerErr){
        console.warn('فشل تحليل JSON المستخرج:', innerErr, rawText);
        throw new Error('تعذر تحليل رد الذكاء الاصطناعي.');
      }
    } else {
      console.warn('OpenAI raw response:', rawText);
      throw new Error('تعذر تحليل رد الذكاء الاصطناعي.');
    }
  }
  return parsed;
}
function coerceNumeric(value){
  if(value === null || value === undefined) return null;
  if(typeof value === 'number' && isFinite(value)) return value;
  if(typeof value === 'string'){
    const cleaned = value.replace(/[^\d\-,.]/g,' ').replace(/\s+/g,' ').trim();
    if(!cleaned) return null;
    const segments = cleaned.split(' ').filter(Boolean);
    const candidate = segments.length > 1 ? `${segments[0]}.${segments[1]}` : segments[0];
    const num = parseFloat(candidate);
    return isFinite(num) ? num : null;
  }
  return null;
}
const FX_CACHE = {
  base:'USD',
  rates:null,
  fetchedAt:0
};
async function fetchUsdRates(){
  const now = Date.now();
  if(FX_CACHE.rates && (now - FX_CACHE.fetchedAt) < 6 * 60 * 60 * 1000){
    return FX_CACHE.rates;
  }
  try{
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if(!response.ok){
      throw new Error(`FX API ${response.status}`);
    }
    const data = await response.json();
    if(data && data.rates){
      FX_CACHE.rates = data.rates;
      FX_CACHE.fetchedAt = now;
      return FX_CACHE.rates;
    }
  }catch(err){
    console.warn('FX fetch failed:', err);
  }
  return FX_CACHE.rates;
}
async function convertAmountToUSD(amount, currency){
  if(!amount || !isFinite(amount)) return null;
  const code = (currency || 'USD').toString().trim().toUpperCase();
  if(!code || code === 'USD'){
    return amount;
  }
  const rates = await fetchUsdRates();
  if(!rates){
    return amount;
  }
  const rate = rates[code];
  if(!rate || !isFinite(rate)){
    return amount;
  }
  return amount / rate;
}
const CURRENCY_SYMBOL_MAP = {
  '$':'USD','usd':'USD','دولار':'USD','€':'EUR','eur':'EUR','£':'GBP','gbp':'GBP','¥':'CNY','cny':'CNY','人民币':'CNY','ريال':'SAR','ر.س':'SAR','sar':'SAR','درهم':'AED','aed':'AED','₺':'TRY','try':'TRY','₩':'KRW','₽':'RUB','د.ع':'IQD'
};
function parseInvoiceValueString(raw){
  if(!raw || typeof raw !== 'string') return null;
  const cleaned = raw.replace(/\s+/g,' ').trim();
  let currency = '';
  let amount = null;
  const currencyMatch = cleaned.match(/([A-Za-z]{3})/);
  if(currencyMatch){
    currency = currencyMatch[1].toUpperCase();
  }
  Object.keys(CURRENCY_SYMBOL_MAP).forEach(symbol=>{
    if(!currency && cleaned.toLowerCase().includes(symbol.toLowerCase())){
      currency = CURRENCY_SYMBOL_MAP[symbol];
    }
  });
  const amountMatch = cleaned.match(/([\d.,]+)/);
  if(amountMatch){
    amount = coerceNumeric(amountMatch[1]);
  }
  if(amount === null){
    return null;
  }
  return {
    amount,
    currency: currency || 'USD'
  };
}
function normalizeLocationPayload(location){
  if(!location) return null;
  if(typeof location === 'string'){
    const coordsMatch = location.match(/(-?\d+(?:\.\d+)?)[^\d-]+(-?\d+(?:\.\d+)?)/);
    const lat = coordsMatch ? parseFloat(coordsMatch[1]) : undefined;
    const lng = coordsMatch ? parseFloat(coordsMatch[2]) : undefined;
    return {
      label: location.trim(),
      lat: isFinite(lat) ? lat : undefined,
      lng: isFinite(lng) ? lng : undefined
    };
  }
  if(typeof location === 'object'){
    const labelParts = [
      location.label,
      location.description,
      location.address,
      location.city,
      location.state,
      location.country
    ].filter(Boolean);
    const coordinates = location.coordinates || location.coords;
    const lat = coerceNumeric(location.lat ?? location.latitude ?? coordinates?.lat ?? coordinates?.latitude ?? (Array.isArray(coordinates) ? coordinates[0] : null));
    const lng = coerceNumeric(location.lng ?? location.longitude ?? coordinates?.lng ?? coordinates?.longitude ?? (Array.isArray(coordinates) ? coordinates[1] : null));
    let parsedLat = lat;
    let parsedLng = lng;
    if((parsedLat === null || parsedLat === undefined) || (parsedLng === null || parsedLng === undefined)){
      const coordText = typeof coordinates === 'string' ? coordinates : (location.coordinateText || location.point || location.position);
      if(coordText && typeof coordText === 'string'){
        const match = coordText.match(/(-?\d+(?:\.\d+)?)[^\d-]+(-?\d+(?:\.\d+)?)/);
        if(match){
          parsedLat = parseFloat(match[1]);
          parsedLng = parseFloat(match[2]);
        }
      }
    }
    return {
      label: labelParts.join(' — ').replace(/\s+/g,' ').trim(),
      lat: isFinite(parsedLat) ? parsedLat : undefined,
      lng: isFinite(parsedLng) ? parsedLng : undefined,
      country: location.country || location.countryName || ''
    };
  }
  return null;
}
function normalizeAgentSchema(data){
  if(!data || typeof data !== 'object') return data;
  const normalized = {...data};
  const shipmentDetails = data.shipment_details || data.shipmentDetails;
  if(shipmentDetails){
    if(shipmentDetails.total_packages !== undefined){
      normalized.number_of_packages = shipmentDetails.total_packages;
    }
    if(shipmentDetails.origin_country && !normalized.origin_country){
      normalized.origin_country = shipmentDetails.origin_country;
      normalized.originCountry = shipmentDetails.origin_country;
    }
    if(Array.isArray(shipmentDetails.packages)){
      const parcels = shipmentDetails.packages.map(pkg=>{
        const dimensions = pkg.dimensions || {};
        const qty = pkg.quantity || pkg.package_number || 1;
        return {
          length: pkg.length ?? dimensions.length,
          width: pkg.width ?? dimensions.width,
          height: pkg.height ?? dimensions.height,
          weight: pkg.weight_kg ?? pkg.weight ?? pkg.weightKg,
          quantity: qty
        };
      }).filter(Boolean);
      if(parcels.length){
        normalized.parcels = parcels;
      }
    }
  }
  const cargoInformation = data.cargo_information || data.cargoInformation;
  if(cargoInformation){
    if(!normalized.shipment_description && cargoInformation.goods_details){
      normalized.shipment_description = cargoInformation.goods_details;
    }
    if(!normalized.total_weight_per_package && cargoInformation.total_weight_kg){
      normalized.total_weight_per_package = `${cargoInformation.total_weight_kg} kg`;
    }
  }
  const logisticsInformation = data.logistics_information || data.logisticsInformation;
  if(logisticsInformation){
    const pickupLocation = normalizeLocationPayload(logisticsInformation.pickup_location || logisticsInformation.pickupLocation);
    if(pickupLocation){
      normalized.pickupLocation = pickupLocation;
      normalized.originLocation = pickupLocation;
      if(pickupLocation.country && !normalized.origin_country){
        normalized.origin_country = pickupLocation.country;
        normalized.originCountry = normalized.originCountry || pickupLocation.country;
      }
    }
    const supplierInfo = logisticsInformation.supplier_information || logisticsInformation.supplierInformation;
    if(supplierInfo){
      normalized.supplier_name = normalized.supplier_name || supplierInfo.name || supplierInfo.company;
      normalized.supplier_phone = normalized.supplier_phone || supplierInfo.contact || supplierInfo.phone || supplierInfo.mobile;
      normalized.supplier_address = normalized.supplier_address || supplierInfo.address || supplierInfo.location;
      normalized.supplier = mergeObjectsPreferIncoming(normalized.supplier || {}, {
        name: supplierInfo.name || supplierInfo.company,
        phone: supplierInfo.contact || supplierInfo.phone || supplierInfo.mobile,
        email: supplierInfo.email,
        contact: supplierInfo.contact || supplierInfo.contact_person || supplierInfo.person,
        country: supplierInfo.country,
        address: supplierInfo.address || supplierInfo.location
      });
      if(supplierInfo.country && !normalized.origin_country){
        normalized.origin_country = supplierInfo.country;
        normalized.originCountry = supplierInfo.country;
      }
    }
    const consigneeInfo = logisticsInformation.consignee_information || logisticsInformation.consigneeInformation;
    if(consigneeInfo){
      const consigneeName = consigneeInfo.name || consigneeInfo.company;
      const consigneePhone = consigneeInfo.contact || consigneeInfo.phone || consigneeInfo.mobile;
      const addressParts = [consigneeInfo.address, consigneeInfo.city, consigneeInfo.country].filter(Boolean);
      const consigneeAddress = addressParts.join(' - ');
      normalized.consignee_name = normalized.consignee_name || consigneeName;
      normalized.consignee_phone = normalized.consignee_phone || consigneePhone;
      if(consigneeAddress){
        normalized.consignee_address = normalized.consignee_address || consigneeAddress;
      }
      normalized.customer = mergeObjectsPreferIncoming(normalized.customer || {}, {
        name: consigneeName,
        phone: consigneePhone,
        address: consigneeInfo.address || consigneeAddress,
        city: consigneeInfo.city,
        country: consigneeInfo.country
      });
      if(consigneeInfo.city && !normalized.destination_city){
        normalized.destination_city = consigneeInfo.city;
      }
    }
  }
  const invoiceValueCandidates = [
    data.invoice_value,
    data.invoiceValue,
    data.invoice_total,
    data.total_invoice,
    data.invoice_amount
  ].filter(Boolean);
  if(invoiceValueCandidates.length){
    for(const raw of invoiceValueCandidates){
      if(!raw) continue;
      const parsed = typeof raw === 'object'
        ? { amount: raw.amount ?? raw.value ?? null, currency: raw.currency ?? raw.curr }
        : parseInvoiceValueString(String(raw));
      if(parsed && parsed.amount != null){
        normalized.invoice_value_amount = normalized.invoice_value_amount ?? parsed.amount;
        normalized.invoice_value_currency = normalized.invoice_value_currency || parsed.currency;
        break;
      }
    }
  }
  if(data.invoice_value_amount && !normalized.invoice_value_amount){
    normalized.invoice_value_amount = data.invoice_value_amount;
  }
  if(data.invoice_value?.amount && !normalized.invoice_value_amount){
    normalized.invoice_value_amount = data.invoice_value.amount;
  }
  if(data.invoice_value_currency && !normalized.invoice_value_currency){
    normalized.invoice_value_currency = data.invoice_value_currency;
  }
  return normalized;
}
async function extractAndFillData(result){
  if(!result) return null;
  let data = result;
  if(typeof data === 'string'){
    const trimmed = data.trim();
    try{
      data = JSON.parse(trimmed);
    }catch(err){
      const match = trimmed.match(/\{[\s\S]*\}/);
      if(match){
        try{
          data = JSON.parse(match[0]);
        }catch(innerErr){
          console.warn('فشل تحليل استجابة OpenAI:', innerErr, trimmed);
          showToast('warning', 'تحليل غير مفهوم', 'تعذر قراءة البيانات المستخرجة من الملف.');
          return null;
        }
      } else {
        showToast('warning', 'تحليل غير مفهوم', 'تعذر قراءة البيانات المستخرجة من الملف.');
        return null;
      }
    }
  }
  if(Array.isArray(data)){
    data = data[0];
  }
  if(data && typeof data === 'object' && data.result){
    data = data.result;
  }
  if(!data || typeof data !== 'object'){
    showToast('warning', 'تحليل غير مفهوم', 'صيغة البيانات المستخرجة غير صحيحة.');
    return null;
  }
  if(data.error){
    throw new Error(data.error);
  }
  data = normalizeAgentSchema(data);
  if(data.invoice_value_amount){
    const rawAmount = coerceNumeric(data.invoice_value_amount);
    if(rawAmount !== null){
      const currency = (data.invoice_value_currency || 'USD').toString().trim();
      try{
        const usdAmount = await convertAmountToUSD(rawAmount, currency);
        if(usdAmount !== null){
          data.invoice_value_usd = +usdAmount.toFixed(2);
          data.itemUSD = data.invoice_value_usd;
        }
      }catch(err){
        console.warn('Invoice conversion failed:', err);
      }
    }
  }
  parsedDataCache = mergeParsedDataCaches(parsedDataCache || {}, data);
  data = await translateAgentDataIfNeeded(data);
  handleAgentSchemaResult(data);
  return data;
}

/* ====== Enhanced Cost Breakdown ====== */
function renderCostBreakdown(ctx){
  // Calculations removed
  const {
    isDestSouth,
    itemUSD
  } = ctx;
  
  const regionName = isDestSouth ? 'الجنوب' : 'الشمال';
  
  let html = `<div class="cost-breakdown">
    <h4>📊 تفصيل التكاليف (Cost Breakdown)</h4>
    <div style="margin-bottom:12px;padding:8px;background:${isDestSouth ? '#fff7ed' : '#e6f3ff'};border-radius:6px;border:1px solid ${isDestSouth ? 'rgba(245,130,32,0.2)' : 'rgba(11,18,32,0.1)'}">
      <strong>المنطقة: ${regionName}</strong> | سعر الصرف: --- YER/USD
    </div>`;
  
  // === تكاليف النقل والشحن ===
  html += `<div style="margin-top:12px;font-weight:800;color:var(--weps-navy);border-bottom:2px solid rgba(11,18,32,0.1);padding-bottom:6px">تكاليف النقل والشحن</div>`;
  html += `<div class="cost-item"><span>تكلفة النقل الدولي (USD)</span><span>--- $</span></div>`;
  html += `<div class="cost-item"><span>تكلفة النقل الداخلي (USD)</span><span>--- $</span></div>`;
  html += `<div class="cost-item"><span>التأمين (ICC) (USD)</span><span>--- $</span></div>`;
  html += `<div class="cost-item"><span>التوصيل الداخلي في اليمن (USD)</span><span>--- $</span></div>`;
  html += `<div class="cost-item" style="border-top:1px dashed rgba(11,18,32,0.1);margin-top:8px;padding-top:8px;font-weight:700"><span>مجموع تكاليف النقل والشحن (USD)</span><span>--- $</span></div>`;
  
  // === الجمارك والضرائب ===
  html += `<div style="margin-top:16px;font-weight:800;color:var(--weps-navy);border-bottom:2px solid rgba(11,18,32,0.1);padding-bottom:6px">الجمارك والضرائب</div>`;
  html += `<div class="cost-item"><span>الجمارك والضرائب</span><span>--- ريال</span></div>`;
  
  // === الإجماليات ===
  html += `<div style="margin-top:16px;font-weight:800;color:var(--weps-navy);border-bottom:2px solid rgba(11,18,32,0.1);padding-bottom:6px">الإجمالي النهائي</div>`;
  html += `<div class="cost-item"><span>إجمالي الشحن بعد الخصم</span><span>--- $ (--- ريال)</span></div>`;
  html += `<div class="cost-item"><span>الجمارك (تقريبي بالدولار)</span><span>--- $</span></div>`;
  html += `<div class="cost-item" style="font-weight:700;border-top:1px dashed rgba(11,18,32,0.1);margin-top:8px;padding-top:8px"><span>الإجمالي النهائي (بالريال)</span><span>--- ريال</span></div>`;
  html += `<div class="cost-item"><span>الإجمالي التقريبي (بالدولار)</span><span>--- $</span></div>`;
  html += `<div class="cost-item"><span>الإجمالي التقريبي (بالريال السعودي)</span><span>--- ريال سعودي</span></div>`;

  if(itemUSD){
    html += `<div class="small" style="margin-top:10px;color:var(--muted)">قيمة البضاعة المصرّح بها: --- $</div>`;
  }

  html += `</div>`;
  return html;
}

// Event listeners for download buttons
if(downloadOfferBtnHTML){
  downloadOfferBtnHTML.addEventListener('click', (e) => {
    e.preventDefault();
    downloadOffer();
  });
}

if(downloadOfferBtnPDF){
  downloadOfferBtnPDF.addEventListener('click', (e) => {
    e.preventDefault();
    generateInvoicePDF();
  });
}

/* ============================
   SURVEY POPUP FUNCTIONALITY
   ============================ */

// Global variable to store current calculation data
let currentCalculationData = null;

// Function to collect form data from the main calculator
function collectFormData() {
  const data = {};
  
  // Customer Information
  data.customerName = document.getElementById('customerName')?.value || '';
  data.customerPhone = document.getElementById('customerPhone')?.value || '';
  data.customerType = document.getElementById('customerType')?.value || '';
  
  // Origin & Destination
  data.originCountry = document.getElementById('originCountry')?.value || '';
  data.destCity = document.getElementById('destCity')?.value || '';
  
  // Service & Value
  data.serviceType = document.getElementById('serviceType')?.value || '';
  const serviceSelect = document.getElementById('serviceType');
  data.serviceTypeText = serviceSelect?.options[serviceSelect.selectedIndex]?.text || '';
  
  data.itemValue = document.getElementById('itemValue')?.value || '';
  
  // Store for later use
  return data;
}

// Function to collect survey answers
function collectSurveyData() {
  const form = document.getElementById('surveyForm');
  const data = {};
  
  // Question 1: Ease of use
  const q1 = form.querySelector('input[name="q1_ease"]:checked');
  data.q1_ease = q1 ? q1.value : '';
  
  // Question 2: Information provided
  const q2 = form.querySelector('input[name="q2_info"]:checked');
  data.q2_info = q2 ? q2.value : '';
  
  // Question 3: Pricing
  const q3 = form.querySelector('input[name="q3_price"]:checked');
  data.q3_price = q3 ? q3.value : '';
  
  // Question 4: Priority
  const q4 = form.querySelector('input[name="q4_priority"]:checked');
  data.q4_priority = q4 ? q4.value : '';
  
  // Question 5: Future use
  const q5 = form.querySelector('input[name="q5_future"]:checked');
  data.q5_future = q5 ? q5.value : '';
  
  // Question 6: Suggestions (optional)
  data.q6_suggestions = document.getElementById('q6_suggestions')?.value || '';
  
  // Question 7: Shipments per year
  data.q7_shipments = document.getElementById('q7_shipments')?.value || '';
  
  return data;
}

// Function to validate survey form
function validateSurveyForm() {
  const form = document.getElementById('surveyForm');
  const errorDiv = document.getElementById('surveyError');
  
  // Check required questions (1-5, 7)
  const q1 = form.querySelector('input[name="q1_ease"]:checked');
  const q2 = form.querySelector('input[name="q2_info"]:checked');
  const q3 = form.querySelector('input[name="q3_price"]:checked');
  const q4 = form.querySelector('input[name="q4_priority"]:checked');
  const q5 = form.querySelector('input[name="q5_future"]:checked');
  const q7 = document.getElementById('q7_shipments')?.value;
  
  if (!q1 || !q2 || !q3 || !q4 || !q5 || !q7) {
    errorDiv.textContent = 'الرجاء الإجابة على جميع الأسئلة المطلوبة (المميزة بـ *)';
    errorDiv.style.display = 'block';
    return false;
  }
  
  errorDiv.style.display = 'none';
  return true;
}

// Function to submit survey data to Monday.com
async function submitSurveyToMonday(formData, surveyData) {
  const token = getMondayToken();
  if (!token) {
    throw new Error('مفتاح Monday API غير متوفر.');
  }
  
  // Get the total cost from the results if available
  let totalCost = '';
  if (currentCalculationData && currentCalculationData.totalCost) {
    totalCost = currentCalculationData.totalCost;
  }
  
  // Prepare column values for Monday.com
  const columnValues = {};
  
  // Map form data to Monday columns
  if (formData.customerName) columnValues.text_mkydq4n9 = formData.customerName;
  if (formData.customerPhone) columnValues.text_mkydv0ga = formData.customerPhone;
  if (formData.customerType) columnValues.text_mkydq1yg = formData.customerType;
  if (formData.originCountry) columnValues.text_mkydcg9f = formData.originCountry;
  if (formData.destCity) columnValues.text_mkyda565 = formData.destCity;
  if (formData.serviceTypeText) columnValues.text_mkydjaad = formData.serviceTypeText;
  if (formData.itemValue) columnValues.text_mkydvez = formData.itemValue;
  if (totalCost) columnValues.text_mkyd5pt2 = totalCost;
  
  // Map survey data to Monday columns
  if (surveyData.q1_ease) columnValues.text_mkyd8qp1 = surveyData.q1_ease;
  if (surveyData.q2_info) columnValues.text_mkydgpmd = surveyData.q2_info;
  if (surveyData.q3_price) columnValues.text_mkydvtm = surveyData.q3_price;
  if (surveyData.q4_priority) columnValues.text_mkydsghz = surveyData.q4_priority;
  if (surveyData.q5_future) columnValues.text_mkyd95pp = surveyData.q5_future;
  if (surveyData.q6_suggestions) columnValues.text_mkydz5gj = surveyData.q6_suggestions;
  if (surveyData.q7_shipments) columnValues.text_mkyd956q = surveyData.q7_shipments;
  
  // Build the mutation query
  const mutation = `
    mutation($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        item_name: $itemName,
        column_values: $columnValues
      ) {
        id
      }
    }
  `;
  
  const itemName = `استطلاع - ${formData.customerName || 'عميل'} - ${new Date().toLocaleDateString('ar-EG')}`;
  
  const variables = {
    boardId: "18391229645",
    itemName: itemName,
    columnValues: JSON.stringify(columnValues)
  };
  
  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ query: mutation, variables: variables })
    });
    
    const rawText = await response.text();
    let result;
    
    try {
      result = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Monday parse error:', parseErr, rawText);
      throw new Error('استجابة غير متوقعة من Monday.');
    }
    
    if (!response.ok) {
      const message = Array.isArray(result?.errors) 
        ? result.errors.map(e => e?.message).filter(Boolean).join(' | ') 
        : response.statusText;
      throw new Error(`HTTP ${response.status}: ${message || 'خطأ غير معروف من Monday'}`);
    }
    
    if (Array.isArray(result.errors) && result.errors.length) {
      throw new Error(result.errors.map(e => e?.message || 'خطأ غير معروف').join(' | '));
    }
    
    return result.data;
  } catch (err) {
    console.error('Monday submission error:', err);
    throw err;
  }
}

// Function to show survey popup
function showSurveyPopup() {
  const overlay = document.getElementById('surveyOverlay');
  if (!overlay) return;
  
  // Store current form data
  currentCalculationData = collectFormData();
  
  // Show the popup with animation
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);
  
  // Prevent closing by clicking overlay or ESC
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  
  // Disable ESC key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  // Store the handler so we can remove it later
  overlay._escapeHandler = handleEscape;
}

// Function to hide survey popup
function hideSurveyPopup() {
  const overlay = document.getElementById('surveyOverlay');
  if (!overlay) return;
  
  overlay.classList.remove('active');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 400);
  
  // Re-enable ESC key
  if (overlay._escapeHandler) {
    document.removeEventListener('keydown', overlay._escapeHandler);
    overlay._escapeHandler = null;
  }
}

// Handle survey form submission
document.addEventListener('DOMContentLoaded', () => {
  const surveyForm = document.getElementById('surveyForm');
  const submitBtn = document.getElementById('surveySubmitBtn');
  const submitText = document.getElementById('surveySubmitText');
  const submitLoading = document.getElementById('surveySubmitLoading');
  
  if (surveyForm) {
    surveyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate form
      if (!validateSurveyForm()) {
        return;
      }
      
      // Disable submit button and show loading
      submitBtn.disabled = true;
      submitText.style.display = 'none';
      submitLoading.style.display = 'inline-block';
      
      try {
        // Collect data
        const formData = currentCalculationData || collectFormData();
        const surveyData = collectSurveyData();
        
        // Submit to Monday.com
        await submitSurveyToMonday(formData, surveyData);
        
        // Show success message
        showToast('success', 'شكراً لك!', 'تم إرسال إجاباتك بنجاح. نقدر وقتك ورأيك.');
        
        // Hide popup after a short delay
        setTimeout(() => {
          hideSurveyPopup();
          // Reset form
          surveyForm.reset();
        }, 1500);
        
      } catch (err) {
        console.error('Survey submission error:', err);
        showToast('error', 'حدث خطأ', 'تعذر إرسال الاستطلاع. الرجاء المحاولة مرة أخرى.');
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoading.style.display = 'none';
      }
    });
  }
});