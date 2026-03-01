import { default as canada } from 'svg-country-flags/svg/ca.svg';
import { default as usa } from 'svg-country-flags/svg/us.svg';
import { default as mexico } from 'svg-country-flags/svg/mx.svg';
import { default as tt } from 'svg-country-flags/svg/tt.svg';
import { default as jamaica } from 'svg-country-flags/svg/jm.svg';
import { default as nz } from 'svg-country-flags/svg/nz.svg';
import { default as india } from 'svg-country-flags/svg/in.svg';
import { default as korea } from 'svg-country-flags/svg/kr.svg';
import { default as japan } from 'svg-country-flags/svg/jp.svg';
import { default as guyana } from 'svg-country-flags/svg/gy.svg';
import { default as bahamas } from 'svg-country-flags/svg/bs.svg';
import { default as barbados } from 'svg-country-flags/svg/bb.svg';
import { default as uk } from 'svg-country-flags/svg/gb.svg';
import { default as france } from 'svg-country-flags/svg/fr.svg';
import { default as italy } from 'svg-country-flags/svg/it.svg';
import { default as greece } from 'svg-country-flags/svg/gr.svg';
import { default as russia } from 'svg-country-flags/svg/ru.svg';
import { default as china } from 'svg-country-flags/svg/cn.svg';
import { default as pakistan } from 'svg-country-flags/svg/pk.svg';
import { default as nigeria } from 'svg-country-flags/svg/ng.svg';
import { default as ethiopia } from 'svg-country-flags/svg/et.svg';
import { default as sa } from 'svg-country-flags/svg/sa.svg';
import { default as kenya } from 'svg-country-flags/svg/ke.svg';
import { default as uganda } from 'svg-country-flags/svg/ug.svg';
import { default as afghanistan } from 'svg-country-flags/svg/af.svg';
import { default as iran } from 'svg-country-flags/svg/ir.svg';
import { default as australia } from 'svg-country-flags/svg/au.svg';
import { default as dominican } from 'svg-country-flags/svg/do.svg';
import { default as congo } from 'svg-country-flags/svg/cd.svg';

const flagList: Record<string, string> = {
  canada, usa, mexico, tt, jamaica, guyana,
  bahamas, barbados, uk, france,
  italy, greece, russia, china, japan,
  korea, india, pakistan, nigeria, ethiopia,
  sa, kenya, uganda, afghanistan,
  iran, nz, australia, dominican, congo,
}

export const countryList:string[] = [
  "Canada", "United States of America", "Mexico", "Trinidad and Tobago", "Jamaica", "Guyana",
  "Bahamas", "Barbados", "United Kingdom", "France",
  "Italy", "Greece", "Russia", "China", "Japan",
  "Korea", "India", "Pakistan", "Nigeria", "Ethiopia",
  "South Africa", "Kenya", "Uganda", "Afghanistan",
  "Iran", "New Zealand", "Australia", "Dominican Republic", "Republic of Congo",
];

export const wordsBlacklistedFromCountryNames:string[] = [
  'of', 'the', 'republic', 'and',
];

export function getFlag(name: string): string {
  if (!Object.hasOwn(flagList, name)) return '';
  return flagList[name];
}

export const processCountryNameExceptions = (name: string, parts: string[], slug: string): string => {
  if (!name || !parts.length) return '';
  // return parts.includes('trinidad') ? 'trinidad' : slug;
  return slug;
}

