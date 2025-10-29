export const initialCanadianTaxes: { [key: string]: number } = {
    'Alberta (AB)': 5,
    'British Columbia (BC)': 12,
    'Manitoba (MB)': 12,
    'New Brunswick (NB)': 15,
    'Newfoundland and Labrador (NL)': 15,
    'Northwest Territories (NT)': 5,
    'Nova Scotia (NS)': 15,
    'Nunavut (NU)': 5,
    'Ontario (ON)': 13,
    'Prince Edward Island (PE)': 15,
    'Quebec (QC)': 15,
    'Saskatchewan (SK)': 11,
    'Yukon (YT)': 5,
};

export const initialUsTaxes: { [key: string]: number } = {
    'Alabama (AL)': 4,
    'Alaska (AK)': 0,
    'Arizona (AZ)': 6,
    'Arkansas (AR)': 7,
    'California (CA)': 7,
    'Colorado (CO)': 3,
    'Connecticut (CT)': 6,
    'Delaware (DE)': 0,
    'Florida (FL)': 6,
    'Georgia (GA)': 4,
    'Hawaii (HI)': 4,
    'Idaho (ID)': 6,
    'Illinois (IL)': 6,
    'Indiana (IN)': 7,
    'Iowa (IA)': 6,
    'Kansas (KS)': 7,
    'Kentucky (KY)': 6,
    'Louisiana (LA)': 4,
    'Maine (ME)': 6,
    'Maryland (MD)': 6,
    'Massachusetts (MA)': 6,
    'Michigan (MI)': 6,
    'Minnesota (MN)': 7,
    'Mississippi (MS)': 7,
    'Missouri (MO)': 4,
    'Montana (MT)': 0,
    'Nebraska (NE)': 6,
    'Nevada (NV)': 7,
    'New Hampshire (NH)': 0,
    'New Jersey (NJ)': 7,
    'New Mexico (NM)': 5,
    'New York (NY)': 4,
    'North Carolina (NC)': 5,
    'North Dakota (ND)': 5,
    'Ohio (OH)': 6,
    'Oklahoma (OK)': 5,
    'Oregon (OR)': 0,
    'Pennsylvania (PA)': 6,
    'Rhode Island (RI)': 7,
    'South Carolina (SC)': 6,
    'South Dakota (SD)': 5,
    'Tennessee (TN)': 7,
    'Texas (TX)': 6,
    'Utah (UT)': 5,
    'Vermont (VT)': 6,
    'Virginia (VA)': 4,
    'Washington (WA)': 7,
    'West Virginia (WV)': 6,
    'Wisconsin (WI)': 5,
    'Wyoming (WY)': 4,
};

/**
 * Gets the tax rate for a given province or state abbreviation.
 * @param provinceOrStateAbbr - The 2-letter abbreviation (e.g., "ON", "CA").
 * @returns The tax rate as a percentage, or 0 if not found.
 */
export const getTaxRate = (provinceOrStateAbbr: string): number => {
  if (!provinceOrStateAbbr) return 0;
  
  const allTaxes = { ...initialCanadianTaxes, ...initialUsTaxes };
  const upperAbbr = `(${provinceOrStateAbbr.toUpperCase()})`;
  
  const key = Object.keys(allTaxes).find(k => k.toUpperCase().includes(upperAbbr));
  
  return key ? allTaxes[key] : 0;
};
