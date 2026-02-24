/**
 * addWebsites.js — Enrichment script to add website URLs to entries missing them.
 * Generates standard URLs based on organization name patterns.
 * Run: node scripts/addWebsites.js
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'jewish.json');
const jd = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Known website mappings for well-known organizations
const knownWebsites = {
  'adelson-family-foundation': 'https://www.adelsonfoundation.org',
  'charles-bronfman-foundation': 'https://www.charlesbronfman.com',
  'klarman-family-foundation': 'https://www.klarmanfoundation.org',
  'maimonides-fund': 'https://www.maimonidesfund.org',
  'pritzker-foundation': 'https://www.pritzkergroup.com',
  'camp-young-judaea': 'https://www.youngjudaea.org',
  'solomon-schechter-day-schools': 'https://www.schechter.org',
  'baupost-group': 'https://www.baupost.com',
  'renaissance-technologies': 'https://www.rentec.com',
  'soros-fund-management': 'https://www.soros.com',
  'tiger-global-management': 'https://www.tigerglobal.com',
  'och-ziff-capital-management-sculptor-capital': 'https://www.sculptorcapital.com',
  '20th-century-fox-historic-founding': 'https://www.20thcenturystudios.com',
  'columbia-pictures-historic-founding': 'https://www.sonypictures.com/columbia',
  'mgm-studios-historic': 'https://www.mgm.com',
  'paramount-pictures-historic-founding': 'https://www.paramount.com',
  'universal-pictures-historic-founding': 'https://www.universalpictures.com',
  'warner-bros-pictures-historic-founding': 'https://www.warnerbros.com',
  'elektra-records': 'https://www.elektrarecords.com',
  'geffen-records': 'https://www.geffen.com',
  'a-m-records-historic': 'https://www.interscope.com',
  'alfred-a-knopf': 'https://www.knopfdoubleday.com',
  'haim-saban-saban-capital-group': 'https://www.sabancapital.com',
  'bear-stearns-historic': 'https://www.jpmorgan.com',
  'kuhn-loeb-co-historic': 'https://en.wikipedia.org/wiki/Kuhn,_Loeb_%26_Co.',
  'lehman-brothers-historic': 'https://en.wikipedia.org/wiki/Lehman_Brothers',
  'salomon-brothers-historic': 'https://en.wikipedia.org/wiki/Salomon_Brothers',
  'jewish-federation-of-greater-toronto': 'https://www.jewishtoronto.com',
  'jewish-federation-of-ottawa': 'https://www.jewishottawa.com',
  'friends-of-the-idf-canada': 'https://www.fidf.org',
  'jewish-national-fund-canada': 'https://www.jnf.ca',
  'bnai-brith-canada': 'https://www.bnaibrith.ca',
  'mount-sinai-hospital-toronto': 'https://www.mountsinai.on.ca',
  'israel-cancer-research-fund-canada': 'https://www.icrfcanada.org',
  'technion-canada': 'https://www.technioncanada.org',
  'baycrest-health-sciences': 'https://www.baycrest.org',
  'jewish-community-of-luxembourg': 'https://www.communaute-juive.lu',
  'shoah-foundation': 'https://sfi.usc.edu',
  'jewish-museum-berlin': 'https://www.jmberlin.de',
  'central-council-of-jews-in-germany': 'https://www.zentralratderjuden.de',
  'jewish-community-vienna': 'https://www.ikg-wien.at',
  'jewish-museum-vienna': 'https://www.jmw.at',
  'european-jewish-congress': 'https://www.eurojewcong.org',
  'world-jewish-congress': 'https://www.worldjewishcongress.org',
  'jewish-agency-for-israel': 'https://www.jewishagency.org',
  'keren-hayesod': 'https://www.kerenhayesod.com',
  'jewish-national-fund': 'https://www.jnf.org',
  'american-jewish-joint-distribution-committee': 'https://www.jdc.org',
  'beit-hatfutsot': 'https://www.bfriendsofhatfutsot.org',
  'yad-vashem': 'https://www.yadvashem.org',
  'hebrew-university-of-jerusalem': 'https://www.huji.ac.il',
  'tel-aviv-university': 'https://www.tau.ac.il',
  'technion-israel-institute-of-technology': 'https://www.technion.ac.il',
  'weizmann-institute-of-science': 'https://www.weizmann.ac.il',
  'ben-gurion-university-of-the-negev': 'https://in.bgu.ac.il',
  'bar-ilan-university': 'https://www.biu.ac.il',
  'university-of-haifa': 'https://www.haifa.ac.il',
  'reichman-university-idc-herzliya': 'https://www.runi.ac.il',
  'hadassah-medical-organization': 'https://www.hadassah.org',
  'sheba-medical-center': 'https://www.shebaonline.org',
  'clalit-health-services': 'https://www.clalit.co.il',
  'maccabi-healthcare-services': 'https://www.maccabi4u.co.il',
  'magen-david-adom': 'https://www.mdais.org',
  'birthright-israel': 'https://www.birthrightisrael.com',
  'american-israel-public-affairs-committee-aipac': 'https://www.aipac.org',
  'anti-defamation-league-adl': 'https://www.adl.org',
  'simon-wiesenthal-center': 'https://www.wiesenthal.com',
  'american-jewish-committee-ajc': 'https://www.ajc.org',
  'hillel-international': 'https://www.hillel.org',
  'chabad-lubavitch-world-headquarters': 'https://www.chabad.org',
  'orthodox-union-ou': 'https://www.ou.org',
  'jewish-federations-of-north-america': 'https://www.jewishfederations.org',
  'conference-of-presidents-of-major-american-jewish-organizations': 'https://www.conferenceofpresidents.org',
  'bnai-brith-international': 'https://www.bnaibrith.org',
  'hadassah-womens-zionist-organization': 'https://www.hadassah.org',
  'jewish-council-for-public-affairs': 'https://www.jewishpublicaffairs.org',
  'the-abraham-fund-initiatives': 'https://www.abrahamfund.org',
  'americans-for-peace-now': 'https://www.peacenow.org',
  'j-street': 'https://www.jstreet.org',
  'zionist-organization-of-america-zoa': 'https://www.zoa.org',
  'american-jewish-world-service-ajws': 'https://www.ajws.org',
  'national-council-of-jewish-women': 'https://www.ncjw.org',
  'jewish-war-veterans-of-the-usa': 'https://www.jwv.org',
  'united-jewish-appeal': 'https://www.ujafedny.org',
  'jewish-community-centers-association': 'https://www.jcca.org',
  'aleph-institute': 'https://www.aleph-institute.org',
  'jewish-theological-seminary': 'https://www.jtsa.edu',
  'hebrew-union-college': 'https://www.huc.edu',
  'yeshiva-university': 'https://www.yu.edu',
  'brandeis-university': 'https://www.brandeis.edu',
  'touro-university': 'https://www.touro.edu',
  'albert-einstein-college-of-medicine': 'https://www.einsteinmed.edu',
  'cedars-sinai-medical-center': 'https://www.cedars-sinai.org',
  'mount-sinai-health-system': 'https://www.mountsinai.org',
  'montefiore-medical-center': 'https://www.montefiore.org',
  'memorial-sloan-kettering-founding-connection': 'https://www.mskcc.org',
  'bloomberg-lp': 'https://www.bloomberg.com',
  'reuters-founding-connection': 'https://www.reuters.com',
  'the-new-york-times-company': 'https://www.nytco.com',
  'dreamworks-animation': 'https://www.dreamworks.com',
  'check-point-software-technologies': 'https://www.checkpoint.com',
  'wix-com': 'https://www.wix.com',
  'fiverr': 'https://www.fiverr.com',
  'mobileye': 'https://www.mobileye.com',
  'ironnource-now-unity': 'https://www.is.com',
  'monday-com': 'https://www.monday.com',
  'nice-systems': 'https://www.nice.com',
  'amdocs': 'https://www.amdocs.com',
  'elbit-systems': 'https://www.elbitsystems.com',
  'israel-aerospace-industries': 'https://www.iai.co.il',
  'rafael-advanced-defense-systems': 'https://www.rafael.co.il',
  'teva-pharmaceutical-industries': 'https://www.tevapharm.com',
  'given-imaging-medtronic': 'https://www.medtronic.com/covidien/en-us/products/capsule-endoscopy.html',
  'strauss-group': 'https://www.strauss-group.com',
  'netafim': 'https://www.netafim.com',
  'sodastream': 'https://www.sodastream.com',
  'the-jerusalem-post': 'https://www.jpost.com',
  'haaretz': 'https://www.haaretz.com',
  'times-of-israel': 'https://www.timesofisrael.com',
  'ynetnews': 'https://www.ynetnews.com',
  'channel-12-israel': 'https://www.mako.co.il',
  'kan-israeli-public-broadcasting': 'https://www.kan.org.il',
  'bezeq': 'https://www.bezeq.co.il',
  'partner-communications': 'https://www.partner.co.il',
  'cellcom': 'https://www.cellcom.co.il',
  'el-al-israel-airlines': 'https://www.elal.com',
  'israel-railways': 'https://www.rail.co.il',
  'egged': 'https://www.egged.co.il',
  'dan-bus-company': 'https://www.dan.co.il',
  'bank-hapoalim': 'https://www.bankhapoalim.com',
  'bank-leumi': 'https://www.leumi.co.il',
  'israel-discount-bank': 'https://www.discountbank.co.il',
  'mizrahi-tefahot-bank': 'https://www.mizrahi-tefahot.co.il',
  'israel-electric-corporation': 'https://www.iec.co.il',
  'mekorot-national-water-company': 'https://www.mekorot.co.il',
  'dead-sea-works-ice': 'https://www.icl-group.com',
  'israel-chemicals-icl-group': 'https://www.icl-group.com',
  'africa-israel-investments': 'https://www.africa-israel.com',
  'delek-group': 'https://www.delekgroup.com',
  'tower-semiconductor': 'https://www.towersemi.com',
  'sapiens-international': 'https://www.sapiens.com',
  'jewish-community-of-france-crif': 'https://www.crif.org',
  'alliance-israelite-universelle': 'https://www.aiu.org',
  'ose-france': 'https://www.ose-france.org',
  'jewish-community-of-rome': 'https://www.romaebraica.it',
  'jewish-community-of-milan': 'https://www.mosaico-cem.it',
  'board-of-deputies-of-british-jews': 'https://www.bod.org.uk',
  'jewish-leadership-council': 'https://www.thejlc.org',
  'community-security-trust': 'https://www.cst.org.uk',
  'united-synagogue-uk': 'https://www.theus.org.uk',
  'jewish-chronicle': 'https://www.thejc.com',
  'jewish-care-uk': 'https://www.jewishcare.org',
  'jews-free-school-jfs': 'https://www.jfs.brent.sch.uk',
  'liberal-judaism-uk': 'https://www.liberaljudaism.org',
  'movement-for-reform-judaism-uk': 'https://www.reformjudaism.org.uk',
  'limmud': 'https://www.limmud.org',
  'jewish-museum-london': 'https://www.jewishmuseum.org.uk',
  'wiener-holocaust-library': 'https://www.wienerholocaustlibrary.org',
  'norwood-charity': 'https://www.norwood.org.uk',
  'world-ort': 'https://www.ort.org',
  'executive-council-of-australian-jewry': 'https://www.ecaj.org.au',
  'new-south-wales-jewish-board-of-deputies': 'https://www.nswjbd.org',
  'zionist-federation-of-australia': 'https://www.zfa.com.au',
  'jewish-museum-of-australia': 'https://www.jewishmuseum.com.au',
  'south-african-jewish-board-of-deputies': 'https://www.sajbd.org',
  'south-african-zionist-federation': 'https://www.sazf.org',
  'jewish-agency-south-africa': 'https://www.jewishagency.org',
  'jewish-community-of-buenos-aires-amia': 'https://www.amia.org.ar',
  'daia-argentina': 'https://www.daia.org.ar',
  'confederacao-israelita-do-brasil': 'https://www.conib.org.br',
  'albert-einstein-hospital-brazil': 'https://www.einstein.br',
  'jewish-community-of-mexico': 'https://www.tribuna.com.mx',
  'alcoa-founding-connection': 'https://www.alcoa.com',
  'costco-wholesale': 'https://www.costco.com',
  'blackrock': 'https://www.blackrock.com',
  'citadel-llc': 'https://www.citadel.com',
  'berkshire-hathaway-connection': 'https://www.berkshirehathaway.com',
  'dell-technologies': 'https://www.dell.com',
  'oracle-corporation': 'https://www.oracle.com',
  'google-alphabet-founding-connection': 'https://www.google.com',
  'facebook-meta-founding-connection': 'https://www.meta.com',
  'starbucks-founding-connection': 'https://www.starbucks.com',
  'intel-israel': 'https://www.intel.com',
  'microsoft-israel': 'https://www.microsoft.com',
  'google-israel': 'https://www.google.com',
  'apple-israel': 'https://www.apple.com',
  'amazon-israel': 'https://www.amazon.com',
  'nvidia-israel': 'https://www.nvidia.com',
};

// For entries not in the known list, try to generate a website
function generateWebsite(entry) {
  const name = entry.name.toLowerCase();
  const id = entry.id;

  // Check known websites
  if (knownWebsites[id]) return knownWebsites[id];

  // Skip "Notable" collective entries and "(historic)" entries without known URLs
  if (name.startsWith('notable ')) return null;
  if (name.includes('(historic)') && !knownWebsites[id]) return null;
  
  // Skip community/demographic entries
  if (name.startsWith('lebanese jewish') || name.startsWith('jewish community of') && name.includes('historic')) return null;

  // Try to construct from name
  // Clean the name for URL generation
  let urlName = entry.name
    .replace(/\s*\(.*?\)\s*/g, '') // remove parenthetical
    .replace(/['']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '')
    .toLowerCase();

  // For foundations, try foundation pattern
  if (name.includes('foundation')) {
    const base = name.replace(/\s*foundation\s*/i, '').replace(/\s*the\s*/i, '').trim()
      .replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return 'https://www.' + base + 'foundation.org';
  }

  // For "Jewish Community of X" patterns
  if (name.match(/jewish community of/i)) {
    return null; // these rarely have standalone websites
  }

  // For funds/institutes
  if (name.includes('Fund') || name.includes('Institute')) {
    return 'https://www.' + urlName + '.org';
  }

  return null;
}

let updated = 0;
let skipped = 0;

for (const country in jd.countries) {
  for (const entry of jd.countries[country]) {
    if (entry.website) continue;
    
    const website = generateWebsite(entry);
    if (website) {
      entry.website = website;
      updated++;
    } else {
      skipped++;
    }
  }
}

fs.writeFileSync(dataPath, JSON.stringify(jd, null, 2));
console.log(`Website enrichment complete: ${updated} entries updated, ${skipped} entries skipped (no suitable URL)`);

// Show remaining missing
let stillMissing = 0;
for (const country in jd.countries) {
  for (const entry of jd.countries[country]) {
    if (!entry.website) stillMissing++;
  }
}
console.log(`Entries still missing websites: ${stillMissing}`);
