export interface HospitalEntry {
  name: string;
  city: string;
  region: string;
  type: "public" | "private";
}

export const hospitalData: HospitalEntry[] = [
  // Vietnam - Hanoi (Public)
  { name: "Bach Mai Hospital", city: "Hanoi", region: "Vietnam", type: "public" },
  { name: "Mai Huong Hospital", city: "Hanoi", region: "Vietnam", type: "public" },
  { name: "Saint Paul Hospital", city: "Hanoi", region: "Vietnam", type: "public" },
  { name: "Thanh Nhan Hospital", city: "Hanoi", region: "Vietnam", type: "public" },
  { name: "Viet Duc Hospital", city: "Hanoi", region: "Vietnam", type: "public" },
  { name: "Vietnam National Children's Hospital", city: "Hanoi", region: "Vietnam", type: "public" },
  { name: "108 Hospital (Army Central Hospital 108)", city: "Hanoi", region: "Vietnam", type: "public" },
  // Vietnam - Hanoi (Private)
  { name: "L'Hopital Francais de Hanoi", city: "Hanoi", region: "Vietnam", type: "private" },
  // Vietnam - Quang Ninh
  { name: "Vietnam-Sweden Hospital", city: "Quang Ninh", region: "Vietnam", type: "public" },
  // Vietnam - Thai Nguyen
  { name: "Thai Nguyen Central General Hospital", city: "Thai Nguyen", region: "Vietnam", type: "public" },
  // Vietnam - Central
  { name: "Hue Central Hospital", city: "Hue", region: "Vietnam", type: "public" },
  { name: "Da Nang Hospital", city: "Da Nang", region: "Vietnam", type: "public" },
  // Vietnam - Ho Chi Minh City (Public)
  { name: "Cho Ray Hospital", city: "Ho Chi Minh City", region: "Vietnam", type: "public" },
  { name: "175 Central Military Hospital", city: "Ho Chi Minh City", region: "Vietnam", type: "public" },
  // Vietnam - Ho Chi Minh City (Private)
  { name: "City International Hospital", city: "Ho Chi Minh City", region: "Vietnam", type: "private" },
  { name: "Gia An 115 Hospital", city: "Ho Chi Minh City", region: "Vietnam", type: "private" },
  { name: "Franco-Vietnamese Hospital", city: "Ho Chi Minh City", region: "Vietnam", type: "private" },
  { name: "Prima Saigon Medical Center", city: "Ho Chi Minh City", region: "Vietnam", type: "private" },

  // Thailand - Bangkok
  { name: "Bangkok General Hospital", city: "Bangkok", region: "Thailand", type: "public" },
  { name: "Bangkok Hospital", city: "Bangkok", region: "Thailand", type: "private" },
  { name: "Bumrungrad International Hospital", city: "Bangkok", region: "Thailand", type: "private" },
  { name: "Chulalongkorn Hospital", city: "Bangkok", region: "Thailand", type: "public" },
  { name: "King Chulalongkorn Memorial Hospital", city: "Bangkok", region: "Thailand", type: "public" },
  { name: "Mahidol University Hospital", city: "Bangkok", region: "Thailand", type: "public" },
  { name: "Phramongkutklao Hospital", city: "Bangkok", region: "Thailand", type: "public" },
  { name: "Ramathibodi Hospital", city: "Bangkok", region: "Thailand", type: "public" },
  { name: "Samitivej Hospital", city: "Bangkok", region: "Thailand", type: "private" },
  { name: "Siriraj Hospital", city: "Bangkok", region: "Thailand", type: "public" },
  { name: "St. Louis Hospital", city: "Bangkok", region: "Thailand", type: "private" },
  { name: "Thonburi Hospital", city: "Bangkok", region: "Thailand", type: "private" },
  { name: "Vejthani Hospital", city: "Bangkok", region: "Thailand", type: "private" },
  { name: "Vibhavadi Hospital", city: "Bangkok", region: "Thailand", type: "private" },
  { name: "Yanhee International Hospital", city: "Bangkok", region: "Thailand", type: "private" },
];

// Flat list for backward compat
export const mockHospitals = hospitalData.map((h) => h.name);
