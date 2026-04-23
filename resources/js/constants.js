/**
 * GawaiSeken Data-Driven Form Engine Configuration
 * Robust schema for dynamic form rendering and validation.
 */

export const RAM_OPTIONS = ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '24GB', '32GB', '64GB', '128GB', 'Other'];
export const STORAGE_OPTIONS = ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB', 'Other'];
export const CONNECTIVITY_OPTIONS = ['Wired', 'Wireless', 'Bluetooth', 'Cellular', 'WiFi Only', 'Other'];
export const POWER_SOURCE_OPTIONS = ['Baterai AA/AAA', 'Rechargeable (Built-in)', 'Direct AC', 'Other'];
export const SWITCH_TYPE_OPTIONS = ['Mechanical', 'Membrane', 'Optical', 'Other'];
export const CFW_STATUS_OPTIONS = ['Original (OFW)', 'Custom Firmware (CFW)', 'Jailbreak', 'Other'];

/**
 * Global Field Definitions
 * Centralized metadata for all possible product attributes.
 */
export const FIELD_DEFINITIONS = {
  brand: { label: 'Merek', type: 'select', placeholder: 'Pilih Merek', rules: { required: true } },
  type: { label: 'Tipe / Model', type: 'text', placeholder: 'Misal: iPhone 13 Pro', rules: { required: true } },
  price: { label: 'Harga Produk', type: 'currency', placeholder: '0', rules: { required: true, min: 1000 } },
  condition: { label: 'Kondisi', type: 'select', rules: { required: true } },
  
  ram: { label: 'RAM', type: 'select', unit: 'GB', options: RAM_OPTIONS, placeholder: 'Pilih RAM', rules: { required: true } },
  storage: { label: 'Penyimpanan', type: 'select', unit: 'GB/TB', options: STORAGE_OPTIONS, placeholder: 'Pilih Kapasitas', rules: { required: true } },
  battery_health: { label: 'Battery Health', type: 'number', unit: '%', placeholder: '90', rules: { min: 0, max: 100 } },
  screen_size: { label: 'Ukuran Layar', type: 'text', unit: 'Inch', placeholder: 'Misal: 6.7 atau 14' },
  
  shutter_count: { label: 'Shutter Count', type: 'number', placeholder: 'Misal: 15000', rules: { min: 0 } },
  connectivity: { label: 'Konektivitas', type: 'select', options: CONNECTIVITY_OPTIONS, placeholder: 'Pilih Koneksi' },
  power_source: { label: 'Sumber Daya', type: 'select', options: POWER_SOURCE_OPTIONS, placeholder: 'Pilih Sumber Daya' },
  switch_type: { label: 'Tipe Switch', type: 'select', options: SWITCH_TYPE_OPTIONS, placeholder: 'Mechanical/Membrane' },
  cfw_status: { label: 'Status Firmware', type: 'select', options: CFW_STATUS_OPTIONS, placeholder: 'Pilih Status' },
  
  // Extra specific fields
  is_battery_balanced: { label: 'Keseimbangan Baterai L/R', type: 'boolean', placeholder: 'Apakah baterai kiri & kanan masih awet seimbang?' },
  is_drift_free: { label: 'Drift Check (Analog)', type: 'boolean', placeholder: 'Analog tidak ghosting/drift' },
  has_original_lens: { label: 'Lensa Original', type: 'boolean', placeholder: 'Lensa bawaan masih ada' },
};

export const PRODUCT_SCHEMA = {
  smartphone: {
    id: 1,
    label: 'Smartphone',
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['ram', 'storage', 'battery_health', 'screen_size'] },
    ],
    brands: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Infinix', 'Poco', 'Asus', 'Sony', 'Huawei', 'Google', 'OnePlus', 'Advan', 'Other'],
    default_items: ['Box', 'Charger', 'Kabel Data', 'Earphone', 'Softcase', 'Nota Pembelian']
  },
  tablet: {
    id: 2,
    label: 'Tablet',
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['ram', 'storage', 'battery_health', 'screen_size', 'connectivity'] },
    ],
    brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Lenovo', 'Microsoft', 'Oppo', 'Realme', 'Advan', 'Axioo', 'Other'],
    default_items: ['Box', 'Charger', 'Kabel Data', 'Stylus', 'Keyboard Case', 'Nota Pembelian']
  },
  laptop: {
    id: 3,
    label: 'Laptop',
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['ram', 'storage', 'screen_size'] },
    ],
    brands: ['Apple', 'Asus', 'Lenovo', 'HP', 'Dell', 'Acer', 'MSI', 'Microsoft', 'Huawei', 'Xiaomi', 'Razer', 'Gigabyte', 'Axioo', 'Other'],
    default_items: ['Box', 'Adaptor / Charger', 'Tas / Sleeve', 'Nota Pembelian']
  },
  wearable: {
    id: 4,
    label: 'Wearable',
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['battery_health', 'screen_size', 'connectivity'] },
    ],
    brands: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Garmin', 'Amazfit', 'Fitbit', 'Suunto', 'Other'],
    default_items: ['Box', 'Magnetic Charger', 'Strap Cadangan', 'Nota Pembelian']
  },
  audio: {
    id: 5,
    label: 'Audio',
    sub_types: [
      { label: 'TWS', value: 'tws', extra_fields: ['is_battery_balanced', 'battery_health'] },
      { label: 'Headphone', value: 'headphone', extra_fields: ['connectivity'] },
      { label: 'Speaker', value: 'speaker', extra_fields: ['connectivity'] },
    ],
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['connectivity'] },
    ],
    brands: ['Sony', 'Bose', 'Sennheiser', 'JBL', 'Audio-Technica', 'Marshall', 'Apple', 'Samsung', 'Jabra', 'Soundcore', 'Other'],
    default_items: ['Box', 'Charging Case', 'Kabel USB', 'Eartips Cadangan', 'Pouch', 'Nota Pembelian']
  },
  gaming: {
    id: 6,
    label: 'Gaming',
    sub_types: [
      { label: 'Console', value: 'console', extra_fields: ['storage', 'cfw_status'] },
      { label: 'Handheld', value: 'handheld', extra_fields: ['storage', 'screen_size', 'cfw_status', 'is_drift_free'] },
      { label: 'Controller', value: 'controller', extra_fields: ['connectivity', 'is_drift_free'] },
    ],
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['storage', 'connectivity'] },
    ],
    brands: ['Sony', 'Microsoft', 'Nintendo', 'Valve', 'Asus', 'MSI', 'Lenovo', 'Logitech', 'Razer', 'Other'],
    default_items: ['Box', 'Controller', 'Kabel HDMI', 'Power Cable', 'Dock', 'Nota Pembelian']
  },
  networking: {
    id: 7,
    label: 'Networking',
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['connectivity'] },
    ],
    brands: ['TP-Link', 'D-Link', 'Tenda', 'Mikrotik', 'Cisco', 'Ubiquiti', 'Huawei', 'ZTE', 'Other'],
    default_items: ['Box', 'Adaptor', 'Kabel LAN', 'Antena', 'Nota Pembelian']
  },
  powermanagement: {
    id: 8,
    label: 'Power Management',
    sub_types: [
      { label: 'Power Bank', value: 'powerbank', extra_fields: ['battery_health', 'storage'] },
      { label: 'UPS', value: 'ups', extra_fields: ['power_source'] },
      { label: 'Charger', value: 'charger', extra_fields: ['power_source'] },
    ],
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['power_source'] },
    ],
    brands: ['Anker', 'Baseus', 'Acmic', 'APC', 'ICA', 'Eaton', 'Aukey', 'Other'],
    default_items: ['Box', 'Kabel Power', 'Nota Pembelian']
  },
  peripherals: {
    id: 9,
    label: 'Peripherals',
    sub_types: [
      { label: 'Mouse', value: 'mouse', extra_fields: ['connectivity'] },
      { label: 'Keyboard', value: 'keyboard', extra_fields: ['connectivity', 'switch_type'] },
      { label: 'Webcam', value: 'webcam', extra_fields: ['connectivity'] },
      { label: 'Microphone', value: 'microphone', extra_fields: ['connectivity'] },
    ],
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['connectivity'] },
    ],
    brands: ['Logitech', 'Razer', 'Corsair', 'SteelSeries', 'Keychron', 'VortexSeries', 'Fantech', 'Rexus', 'Other'],
    default_items: ['Box', 'Dongle Wireless', 'Kabel USB', 'Keycap Puller', 'Nota Pembelian']
  },
  camera: {
    id: 10,
    label: 'Camera',
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['shutter_count', 'storage', 'battery_health', 'screen_size', 'connectivity', 'has_original_lens'] },
    ],
    brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Lumix', 'Olympus', 'GoPro', 'DJI', 'Other'],
    default_items: ['Box', 'Lensa Kit', 'Baterai', 'Charger', 'Strap', 'Nota Pembelian']
  },
  storage: {
    id: 11,
    label: 'Storage',
    sub_types: [
      { label: 'External SSD', value: 'ext_ssd', extra_fields: ['storage', 'connectivity'] },
      { label: 'External HDD', value: 'ext_hdd', extra_fields: ['storage', 'connectivity'] },
      { label: 'Flashdisk', value: 'flashdisk', extra_fields: ['storage'] },
      { label: 'MicroSD / SD Card', value: 'sd_card', extra_fields: ['storage'] },
    ],
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['storage'] },
    ],
    brands: ['Samsung', 'SanDisk', 'Seagate', 'WD', 'Toshiba', 'Kingston', 'Adata', 'Lexar', 'Other'],
    default_items: ['Box', 'Kabel Data', 'Pouch', 'Adapter SD', 'Nota Pembelian']
  },
  office: {
    id: 12,
    label: 'Office & Monitor',
    sub_types: [
      { label: 'Monitor', value: 'monitor', extra_fields: ['screen_size', 'connectivity'] },
      { label: 'Printer', value: 'printer', extra_fields: ['connectivity'] },
      { label: 'Scanner', value: 'scanner', extra_fields: ['connectivity'] },
      { label: 'Projector', value: 'projector', extra_fields: ['connectivity'] },
    ],
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['connectivity'] },
    ],
    brands: ['LG', 'Samsung', 'Asus', 'Dell', 'HP', 'Epson', 'Canon', 'ViewSonic', 'BenQ', 'Other'],
    default_items: ['Box', 'Kabel Power', 'Kabel HDMI/VGA', 'Nota Pembelian']
  },
  photography_acc: {
    id: 13,
    label: 'Fotografi & Videografi',
    sub_types: [
      { label: 'Lensa', value: 'lens', extra_fields: ['brand'] },
      { label: 'Gimbal / Stabilizer', value: 'gimbal', extra_fields: ['battery_health'] },
      { label: 'Tripod / Monopod', value: 'tripod', extra_fields: [] },
      { label: 'Flash / Lighting', value: 'lighting', extra_fields: ['power_source'] },
    ],
    sections: [
      { id: 'main', label: 'Informasi Utama', fields: ['brand', 'type'] },
      { id: 'specs', label: 'Spesifikasi Teknis', fields: ['connectivity'] },
    ],
    brands: ['Sony', 'Canon', 'Nikon', 'Fujifilm', 'DJI', 'Zhiyun', 'Godox', 'Sigma', 'Tamron', 'Other'],
    default_items: ['Box', 'Pouch', 'Baterai', 'Kabel Charger', 'Nota Pembelian']
  }
};

/**
 * Data-Driven Helper Functions
 */

export const getCategoryById = (id) => {
  return Object.values(PRODUCT_SCHEMA).find(cat => cat.id === parseInt(id));
};

/**
 * Returns a structured list of fields for a category, including metadata.
 */
export const getFieldsByCategory = (categoryId, currentForm = {}) => {
  const category = getCategoryById(categoryId);
  if (!category) return [];

  // 1. Get base fields from sections
  let sections = category.sections.map(section => ({
    ...section,
    fields: section.fields.map(fieldKey => ({
      key: fieldKey,
      ...FIELD_DEFINITIONS[fieldKey]
    }))
  }));

  // 2. Handle Sub-Type Specific Fields
  const subTypeKey = currentForm.specifications?.sub_type;
  if (subTypeKey && category.sub_types) {
    const subType = category.sub_types.find(st => st.value === subTypeKey);
    if (subType?.extra_fields) {
      // Find or create 'Technical Specs' section
      let specSection = sections.find(s => s.id === 'specs');
      if (!specSection) {
        specSection = { id: 'specs', label: 'Spesifikasi Teknis', fields: [] };
        sections.push(specSection);
      }

      subType.extra_fields.forEach(fieldKey => {
        // Avoid duplicates
        if (!specSection.fields.find(f => f.key === fieldKey)) {
          specSection.fields.push({
            key: fieldKey,
            ...FIELD_DEFINITIONS[fieldKey]
          });
        }
      });
    }
  }

  // 3. Handle Conditional Logic (e.g., Wireless -> Power Source)
  const connectivity = currentForm.specifications?.connectivity;
  if ((connectivity === 'Wireless' || connectivity === 'Bluetooth')) {
    let specSection = sections.find(s => s.id === 'specs');
    if (specSection && !specSection.fields.find(f => f.key === 'power_source')) {
      specSection.fields.push({
        key: 'power_source',
        ...FIELD_DEFINITIONS['power_source']
      });
    }
  }

  return sections;
};

export const PRODUCT_CONDITIONS = [
  { value: 'new', label: 'Baru / BNIB' },
  { value: 'second_like_new', label: 'Bekas Mulus (Like New)' },
  { value: 'second_good', label: 'Bekas Normal (Lecet Pemakaian)' },
  { value: 'minus', label: 'Minus (Ada fungsi rusak)' },
];
