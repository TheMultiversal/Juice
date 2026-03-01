/**
 * expandData53.js – Add key individuals to 26 sparse Israel entries
 */
const fs = require('fs');
const path = require('path');
const pFile = path.join(__dirname, '..', 'data', 'people.json');
const jFile = path.join(__dirname, '..', 'data', 'jewish.json');
const pd = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const jd = JSON.parse(fs.readFileSync(jFile, 'utf8'));

function addPerson(id, name, bio) {
  if (!pd.people[id]) {
    pd.people[id] = { name, bio, notes: '', affiliations: [] };
    return true;
  }
  if (bio && bio.length > (pd.people[id].bio || '').length) pd.people[id].bio = bio;
  return false;
}

let newPeople = 0;
let updatedEntries = 0;

const individualsMap = {
  "habima-national-theatre": [
    {"id": "person-nahum-zemach", "name": "Nahum Zemach", "role": "Founder & First Artistic Director", "bio": "Founded Habima in Moscow in 1917 as a Hebrew-language theater company. Led the troupe through its early years before it relocated to British Mandate Palestine in 1928."},
    {"id": "person-hanna-rovina", "name": "Hanna Rovina", "role": "Leading Actress & 'First Lady of Hebrew Theatre'", "bio": "Iconic actress who became synonymous with Habima, starring in the landmark 1922 production of The Dybbuk. Received the Israel Prize in 1956."},
    {"id": "person-ilan-ronen", "name": "Ilan Ronen", "role": "Former Artistic Director", "bio": "Served as artistic director of Habima from 2004 to 2010, overseeing a period of artistic renewal and the renovation of the theater building in Tel Aviv."},
    {"id": "person-osnat-trabelsi", "name": "Osnat Trabelsi", "role": "General Director", "bio": "Appointed general director of Habima, managing the administrative and financial operations of Israel's national theater."}
  ],
  "innoviz-technologies": [
    {"id": "person-omer-keilaf", "name": "Omer Keilaf", "role": "Co-Founder & CEO", "bio": "Co-founded Innoviz Technologies in 2016 and has led the LiDAR sensor company through its SPAC merger and Nasdaq listing in 2021. Previously served in the IDF's elite intelligence Unit 8200."},
    {"id": "person-oren-rosenzweig", "name": "Oren Rosenzweig", "role": "Co-Founder & CTO", "bio": "Co-founded Innoviz and oversees its LiDAR technology development. Holds a Ph.D. in electrical engineering and previously worked at SiGe Semiconductor."},
    {"id": "person-oren-buskila", "name": "Oren Buskila", "role": "Co-Founder & VP R&D", "bio": "Co-founded Innoviz in 2016 after experience at Elbit Systems and other Israeli defense tech firms. Leads research and development of solid-state LiDAR systems."},
    {"id": "person-amit-steinberg", "name": "Amit Steinberg", "role": "Co-Founder", "bio": "Co-founded Innoviz Technologies in 2016. Brought experience in electro-optics and defense technology to the company's LiDAR sensor development."}
  ],
  "keren-kayemeth-leisrael-jewish-national-fund": [
    {"id": "person-theodor-herzl", "name": "Theodor Herzl", "role": "Conceptual Founder", "bio": "Proposed the creation of a national fund for land purchase at the Fifth Zionist Congress in 1901. Father of modern political Zionism and author of Der Judenstaat."},
    {"id": "person-johann-kremenezky", "name": "Johann Kremenezky", "role": "First President", "bio": "Austrian industrialist who served as the first president of JNF from its founding in 1901. Managed the fund's early land acquisition efforts in Ottoman Palestine."},
    {"id": "person-avraham-duvdevani", "name": "Avraham Duvdevani", "role": "Chairman", "bio": "Served as chairman of KKL-JNF, overseeing its reforestation, water, and environmental programs across Israel. Led efforts to plant millions of trees in the Negev and Galilee."},
    {"id": "person-yosef-weitz", "name": "Yosef Weitz", "role": "Director of Afforestation", "bio": "Led JNF's land and afforestation department for decades in the mid-20th century. Known as the 'father of the forests of Israel' for planting millions of trees across the country."}
  ],
  "ree-automotive": [
    {"id": "person-daniel-barel", "name": "Daniel Barel", "role": "Co-Founder & CEO", "bio": "Co-founded REE Automotive and has led the company since inception, guiding it through its 2021 Nasdaq listing. Pioneered REE's modular electric vehicle platform technology."},
    {"id": "person-ahishay-sardes", "name": "Ahishay Sardes", "role": "Co-Founder & CTO", "bio": "Co-founded REE Automotive and serves as chief technology officer. Developed the company's REEcorner technology that integrates drivetrain components into the wheel arch."},
    {"id": "person-josh-tech", "name": "Josh Tech", "role": "CFO", "bio": "Served as chief financial officer at REE Automotive, managing the company's financial strategy during its transition to a publicly traded company on Nasdaq."}
  ],
  "israel-innovation-authority": [
    {"id": "person-dror-bin", "name": "Dror Bin", "role": "CEO", "bio": "Served as CEO of the Israel Innovation Authority, steering government support programs for Israeli tech startups and R&D. Previously held senior positions in the Israeli defense industry."},
    {"id": "person-ami-appelbaum", "name": "Ami Appelbaum", "role": "Chairman", "bio": "Served as chairman of the Israel Innovation Authority's board. Also holds a professorship and has extensive experience in technology management and innovation policy."},
    {"id": "person-avi-hasson", "name": "Avi Hasson", "role": "Former Chief Scientist & First CEO", "bio": "Served as Israel's Chief Scientist at the Ministry of Economy and became the first CEO when the office was restructured into the Israel Innovation Authority in 2016."},
    {"id": "person-eli-groner", "name": "Eli Groner", "role": "Former Director General, Prime Minister's Office", "bio": "Played a key role in the establishment of the Israel Innovation Authority in 2016 as director general of the Prime Minister's Office, helping transition from the Office of the Chief Scientist."}
  ],
  "channel-12-keshet": [
    {"id": "person-avi-nir", "name": "Avi Nir", "role": "CEO, Keshet Media Group", "bio": "Long-serving CEO of Keshet Media Group, the franchise holder of Channel 12. Oversaw the network's rise to become Israel's most-watched television channel."},
    {"id": "person-yossi-vardy", "name": "Yossi Vardy", "role": "Co-Founder, Keshet Broadcasting", "bio": "Co-founded Keshet Broadcasting, the company behind Channel 2's news franchise which later became Channel 12 in 2017. A major figure in Israeli commercial broadcasting."},
    {"id": "person-guy-pines", "name": "Guy Pines", "role": "Head of News Division", "bio": "Led Channel 12's news division, making it one of the most-watched news programs in Israel. Oversaw major journalistic investigations and prime-time news broadcasts."},
    {"id": "person-amos-schocken", "name": "Amos Schocken", "role": "Board Member & Media Figure", "bio": "Israeli media executive involved in the broader landscape of Channel 12's corporate governance and Israeli media industry."}
  ],
  "orcam-technologies": [
    {"id": "person-amnon-shashua", "name": "Amnon Shashua", "role": "Co-Founder & Co-CEO", "bio": "Co-founded OrCam Technologies in 2010 alongside his work at Mobileye. Professor of computer science at Hebrew University and a pioneer in computer vision and AI."},
    {"id": "person-ziv-aviram", "name": "Ziv Aviram", "role": "Co-Founder & Co-CEO", "bio": "Co-founded OrCam Technologies in 2010, bringing entrepreneurial leadership to the assistive technology company. Previously co-founded Mobileye with Amnon Shashua."},
    {"id": "person-yonatan-wexler", "name": "Yonatan Wexler", "role": "VP R&D", "bio": "Led OrCam's research and development team, driving the AI and computer vision technology behind the OrCam MyEye wearable device for visually impaired users."}
  ],
  "walkme": [
    {"id": "person-dan-adika", "name": "Dan Adika", "role": "Co-Founder & CEO", "bio": "Co-founded WalkMe in 2011 and led the company through its 2021 Nasdaq IPO, achieving a valuation of over $2.5 billion. Grew the digital adoption platform to serve Fortune 500 companies globally."},
    {"id": "person-rafael-sweary", "name": "Rafael Sweary", "role": "Co-Founder & President", "bio": "Co-founded WalkMe in 2011 and served as president, overseeing business development and strategic partnerships. Previously founded and led several Israeli tech startups."},
    {"id": "person-eyal-cohen", "name": "Eyal Cohen", "role": "Co-Founder & CTO", "bio": "Co-founded WalkMe and served as chief technology officer, architecting the digital adoption platform's core technology and AI-driven guidance systems."},
    {"id": "person-rephael-duek", "name": "Rephael Duek", "role": "CFO", "bio": "Served as CFO of WalkMe, steering the company's financial operations through its Nasdaq IPO and managing its financial strategy as a public company. WalkMe was acquired by SAP in 2024."}
  ],
  "taro-pharmaceutical-israel": [
    {"id": "person-barrie-levitt", "name": "Barrie Levitt", "role": "Former Chairman & CEO", "bio": "Led Taro Pharmaceutical Industries for decades, building it into a major generic pharmaceutical company. Oversaw operations from its headquarters in Haifa Bay, Israel."},
    {"id": "person-uday-baldota", "name": "Uday Baldota", "role": "CEO", "bio": "Appointed CEO of Taro Pharmaceutical Industries, managing the company's global generic drug operations. Taro is a subsidiary of Sun Pharmaceutical Industries."},
    {"id": "person-dilip-shanghvi", "name": "Dilip Shanghvi", "role": "Controlling Shareholder (via Sun Pharma)", "bio": "Indian billionaire founder of Sun Pharmaceutical Industries, which acquired a controlling stake in Taro Pharmaceutical in 2010 after a prolonged takeover battle."},
    {"id": "person-tal-levitt", "name": "Tal Levitt", "role": "Former Director", "bio": "Served on Taro Pharmaceutical's board of directors, part of the Levitt family that founded and long controlled the Israeli-based generic drug manufacturer."}
  ],
  "candiru-saito-tech": [
    {"id": "person-eitan-achlow", "name": "Eitan Achlow", "role": "Co-Founder & CEO", "bio": "Co-founded Candiru (officially registered as Saito Tech Ltd) around 2014. Led the secretive Israeli spyware company that develops offensive cyber tools for government clients."},
    {"id": "person-yaakov-weizman", "name": "Yaakov Weizman", "role": "Co-Founder", "bio": "Co-founded Candiru and helped build its suite of cyber-espionage tools. The firm was sanctioned by the U.S. Commerce Department in November 2021."},
    {"id": "person-isaac-zack", "name": "Isaac Zack", "role": "Investor & Board Member", "bio": "Prominent investor in Israeli cyber-intelligence companies including Candiru and NSO Group. Co-founded Founders Group, an Israeli venture capital firm focused on cybersecurity."}
  ],
  "ide-technologies": [
    {"id": "person-avraham-ophir", "name": "Avraham Ophir", "role": "Former CEO", "bio": "Led IDE Technologies during its growth into one of the world's largest desalination companies. Oversaw construction of major reverse osmosis plants including the Sorek facility."},
    {"id": "person-miriam-talmor", "name": "Miriam Talmor", "role": "Former Executive", "bio": "Served in a senior leadership role at IDE Technologies, contributing to the company's global expansion in desalination and water treatment solutions."},
    {"id": "person-ehud-barak-ide", "name": "Ehud Barak", "role": "Former Board Involvement (ICL Group)", "bio": "Had connections to IDE Technologies through Israel Chemicals Ltd (ICL), which co-owned IDE alongside Delek Group before its restructuring."}
  ],
  "university-of-haifa": [
    {"id": "person-ron-robin", "name": "Ron Robin", "role": "President", "bio": "Served as president of the University of Haifa, overseeing its academic programs and research initiatives. A historian by training, he previously held academic posts in the United States."},
    {"id": "person-abba-hushi", "name": "Abba Hushi", "role": "Founding Visionary", "bio": "As mayor of Haifa, championed the establishment of a university in the city in the 1960s. The University of Haifa was founded in 1963 as a branch of the Hebrew University of Jerusalem."},
    {"id": "person-gustave-leven", "name": "Gustave Leven", "role": "Major Benefactor", "bio": "French-Jewish businessman and former CEO of Perrier who donated generously to the University of Haifa. The main library bears his name in recognition of his contributions."},
    {"id": "person-aaron-ben-zeev", "name": "Aaron Ben-Ze'ev", "role": "Former President", "bio": "Served as president of the University of Haifa from 2005 to 2013. A professor of philosophy known for his research on emotions and the philosophy of mind."}
  ],
  "weizmann-institute-of-science": [
    {"id": "person-chaim-weizmann", "name": "Chaim Weizmann", "role": "Founder", "bio": "Established the Daniel Sieff Research Institute in 1934, which became the Weizmann Institute in 1949. A renowned chemist and the first President of the State of Israel."},
    {"id": "person-alon-chen", "name": "Alon Chen", "role": "President", "bio": "Appointed president of the Weizmann Institute of Science in 2019, becoming the youngest person to hold the position. A neuroscientist known for research on stress and brain mechanisms."},
    {"id": "person-daniel-zajfman", "name": "Daniel Zajfman", "role": "Former President", "bio": "Served as president of the Weizmann Institute from 2006 to 2019. An atomic physicist whose research focused on molecular physics and storage ring technology."},
    {"id": "person-adi-shamir", "name": "Adi Shamir", "role": "Professor & Notable Faculty", "bio": "Israeli cryptographer and professor at the Weizmann Institute. Co-inventor of the RSA algorithm within RSA cryptography, and recipient of the 2002 Turing Award."},
    {"id": "person-michael-sela", "name": "Michael Sela", "role": "Former President & Immunologist", "bio": "Served as president of the Weizmann Institute from 1975 to 1985. Pioneered the development of Copaxone, a widely used treatment for multiple sclerosis."}
  ],
  "israel-military-industries-imi-systems": [
    {"id": "person-avi-felder", "name": "Avi Felder", "role": "Former CEO", "bio": "Served as CEO of IMI Systems, overseeing the state-owned defense company's munitions and defense technology divisions before its acquisition by Elbit Systems in 2018."},
    {"id": "person-bezalel-machlis", "name": "Bezalel Machlis", "role": "CEO, Elbit Systems", "bio": "As CEO of Elbit Systems, completed the acquisition of IMI Systems in 2018 for approximately $495 million, integrating IMI's munitions and defense capabilities into Elbit."},
    {"id": "person-uzi-gal", "name": "Uzi Gal", "role": "Weapons Designer", "bio": "Designed the iconic Uzi submachine gun in the late 1940s, manufactured by IMI. The Uzi became one of the most widely used submachine guns in the world and a symbol of Israeli defense innovation."}
  ],
  "nice-ltd": [
    {"id": "person-barak-eilam", "name": "Barak Eilam", "role": "CEO", "bio": "Appointed CEO of NICE Ltd in 2014 and transformed the company into a leading cloud platform for customer engagement and financial crime prevention. Grew annual revenue past $2 billion."},
    {"id": "person-haim-shani", "name": "Haim Shani", "role": "Former CEO & Co-Founder", "bio": "Co-founded NICE Systems (now NICE Ltd) in 1986 and served as CEO during its early growth. Built the company from an Israeli startup into a global enterprise software leader."},
    {"id": "person-david-shatel", "name": "David Shatel", "role": "Chairman of the Board", "bio": "Served as chairman of NICE Ltd's board of directors, providing strategic oversight as the company expanded its cloud and AI-driven product portfolio."},
    {"id": "person-ron-gutler", "name": "Ron Gutler", "role": "Former Chairman", "bio": "Long-time chairman of NICE Ltd's board, guiding the company's strategic direction during its expansion into cloud computing and workforce engagement management."}
  ],
  "orbotech-kla": [
    {"id": "person-shlomo-barak", "name": "Shlomo Barak", "role": "Co-Founder", "bio": "Co-founded Orbotech in 1981 in Yavne, Israel. Helped develop the company's pioneering automated optical inspection technology used in PCB and flat panel display manufacturing."},
    {"id": "person-asher-levy-orbotech", "name": "Asher Levy", "role": "Former CEO & President", "bio": "Led Orbotech as CEO and president, growing the company into a global leader in inspection and imaging solutions for the electronics industry."},
    {"id": "person-rick-wallace", "name": "Rick Wallace", "role": "CEO, KLA Corporation", "bio": "Served as CEO of KLA Corporation, which acquired Orbotech in 2019 for approximately $3.4 billion, integrating its inspection technology into KLA's semiconductor process control portfolio."},
    {"id": "person-amichai-steimberg", "name": "Amichai Steimberg", "role": "Former CEO", "bio": "Served as president and CEO of Orbotech from 2013 until its acquisition by KLA in 2019. Positioned the company for growth in advanced electronics and semiconductor markets."}
  ],
  "ministry-of-foreign-affairs": [
    {"id": "person-gideon-saar", "name": "Gideon Sa'ar", "role": "Minister of Foreign Affairs", "bio": "Appointed Israel's Minister of Foreign Affairs in the Netanyahu government. Previously served as Minister of Justice and founded the New Hope party."},
    {"id": "person-moshe-sharett", "name": "Moshe Sharett", "role": "First Foreign Minister", "bio": "Served as Israel's first Minister of Foreign Affairs from 1948 to 1956 and as the country's second Prime Minister. Helped establish Israel's diplomatic corps and foreign policy framework."},
    {"id": "person-abba-eban", "name": "Abba Eban", "role": "Former Foreign Minister", "bio": "Served as Israel's Foreign Minister from 1966 to 1974 and as ambassador to the UN and United States. Known as one of the most eloquent diplomats of the 20th century."},
    {"id": "person-golda-meir", "name": "Golda Meir", "role": "Former Foreign Minister & Prime Minister", "bio": "Served as Israel's Foreign Minister from 1956 to 1966 before becoming Prime Minister in 1969. One of the founders of the State of Israel and a towering figure in its diplomacy."}
  ],
  "habana-labs-intel": [
    {"id": "person-david-dahan", "name": "David Dahan", "role": "Co-Founder & CEO", "bio": "Co-founded Habana Labs in 2016 and led the AI chip startup until its acquisition by Intel in December 2019 for approximately $2 billion. Previously co-founded PrimeSense."},
    {"id": "person-ran-zilca", "name": "Ran Zilca", "role": "Co-Founder & CTO", "bio": "Co-founded Habana Labs and served as CTO, architecting the Gaudi AI training processor and Goya AI inference processor used in data center AI workloads."},
    {"id": "person-pat-gelsinger", "name": "Pat Gelsinger", "role": "Former CEO, Intel", "bio": "As Intel CEO, oversaw the integration of Habana Labs into Intel's data center AI strategy. The acquisition was Intel's largest in Israel and part of its push into AI hardware."},
    {"id": "person-naveen-rao", "name": "Naveen Rao", "role": "GM, Intel AI Products Group", "bio": "Led Intel's AI Products Group which integrated Habana Labs' Gaudi processors into Intel's AI chip lineup for data center training and inference applications."}
  ],
  "via-transportation": [
    {"id": "person-daniel-ramot", "name": "Daniel Ramot", "role": "Co-Founder & CEO", "bio": "Co-founded Via Transportation in 2012 and serves as CEO. Holds a Ph.D. in neuroscience from Princeton and has built Via into a global leader in transit-as-a-service technology."},
    {"id": "person-oren-shoval", "name": "Oren Shoval", "role": "Co-Founder & CTO", "bio": "Co-founded Via Transportation in 2012 and leads its technology development. Built the real-time routing algorithms that power Via's on-demand transit platform used in over 600 cities."},
    {"id": "person-dror-shinnaar", "name": "Dror Shinnaar", "role": "VP Engineering", "bio": "Led engineering at Via Transportation, developing the dynamic routing and ride-sharing optimization algorithms at the core of the company's public transit technology platform."}
  ],
  "the-times-of-israel": [
    {"id": "person-david-horovitz", "name": "David Horovitz", "role": "Founding Editor", "bio": "Founded The Times of Israel in 2012 and serves as its editor. Previously served as editor-in-chief of The Jerusalem Post from 2004 to 2011."},
    {"id": "person-seth-klarman", "name": "Seth Klarman", "role": "Founding Investor", "bio": "American billionaire hedge fund manager and CEO of Baupost Group who provided founding investment for The Times of Israel in 2012. A prominent supporter of Israeli media and civil society."},
    {"id": "person-amanda-borschel-dan", "name": "Amanda Borschel-Dan", "role": "Jewish World & Archaeology Editor", "bio": "Serves as a senior editor at The Times of Israel, leading coverage of Jewish world news and archaeology. Previously worked at other major Israeli English-language media outlets."},
    {"id": "person-stuart-winer", "name": "Stuart Winer", "role": "News Editor", "bio": "Long-serving news editor at The Times of Israel, overseeing daily news coverage and breaking stories since the publication's early years."}
  ],
  "appsflyer": [
    {"id": "person-oren-kaniel", "name": "Oren Kaniel", "role": "Co-Founder & CEO", "bio": "Co-founded AppsFlyer in 2011 and serves as CEO. Built the company into the world's leading mobile attribution and marketing analytics platform, serving over 12,000 brands globally."},
    {"id": "person-reshef-mann", "name": "Reshef Mann", "role": "Co-Founder & CTO", "bio": "Co-founded AppsFlyer in 2011 and serves as CTO. Architected the company's mobile attribution technology and privacy-preserving measurement solutions."},
    {"id": "person-brian-quinn", "name": "Brian Quinn", "role": "President & Managing Director", "bio": "Served as president of AppsFlyer, overseeing global business operations and expansion. Played a key role in growing the company's annual recurring revenue past $300 million."}
  ],
  "fiverr-international": [
    {"id": "person-micha-kaufman", "name": "Micha Kaufman", "role": "Co-Founder & CEO", "bio": "Co-founded Fiverr in 2010 and led the freelance marketplace through its 2019 NYSE IPO. Built the platform into one of the world's largest online marketplaces for freelance services."},
    {"id": "person-shai-wininger", "name": "Shai Wininger", "role": "Co-Founder", "bio": "Co-founded Fiverr in 2010, developing its original concept as a marketplace for $5 services. Later co-founded Lemonade, the insurtech company, and left Fiverr's active leadership."},
    {"id": "person-ofer-katz", "name": "Ofer Katz", "role": "CFO", "bio": "Served as CFO of Fiverr International, managing the company's finances through its NYSE IPO in 2019 and its subsequent growth as a public company."},
    {"id": "person-hila-klein", "name": "Hila Klein", "role": "VP Product", "bio": "Led product strategy at Fiverr, driving the evolution of the platform beyond its original gig-based model to include Fiverr Business and subscription-based services."}
  ],
  "tower-semiconductor": [
    {"id": "person-russell-ellwanger", "name": "Russell Ellwanger", "role": "CEO", "bio": "Served as CEO of Tower Semiconductor since 2005, growing the specialty foundry into a global leader in analog semiconductor manufacturing. Led the company through Intel's $5.4 billion acquisition attempt."},
    {"id": "person-oren-shirazi", "name": "Oren Shirazi", "role": "CFO & SVP Finance", "bio": "Long-serving CFO of Tower Semiconductor, overseeing the company's financial operations and investor relations through multiple growth phases and its Nasdaq listing."},
    {"id": "person-noel-hurley", "name": "Noel Hurley", "role": "COO", "bio": "Served as chief operating officer of Tower Semiconductor, managing global foundry operations across fabrication facilities in Israel, the US, and Japan."},
    {"id": "person-yigal-grandman", "name": "Yigal Grandman", "role": "Founder & Former Chairman", "bio": "Founded Tower Semiconductor in Migdal HaEmek, Israel, building it from a single fabrication plant into a specialty semiconductor foundry with global reach."}
  ],
  "gett": [
    {"id": "person-dave-waiser", "name": "Dave Waiser", "role": "Co-Founder & CEO", "bio": "Co-founded Gett (originally GetTaxi) in 2010 and served as CEO. Built the ride-hailing platform into a major mobility company operating across Israel, the UK, and Russia."},
    {"id": "person-roi-more", "name": "Roi More", "role": "Co-Founder & CTO", "bio": "Co-founded Gett in 2010 and served as CTO, building the ride-hailing technology platform. Previously worked in software development roles at Israeli tech companies."},
    {"id": "person-matteo-de-renzi", "name": "Matteo de Renzi", "role": "CEO (Post-Founder)", "bio": "Appointed CEO of Gett to lead the company's corporate transportation business strategy. Oversaw Gett's pivot toward B2B ground transportation management."},
    {"id": "person-scott-galit", "name": "Scott Galit", "role": "Board Member", "bio": "Served on Gett's board of directors, providing strategic guidance during the company's growth and fundraising rounds totaling over $700 million."}
  ],
  "teva-pharmaceutical-industries": [
    {"id": "person-eli-hurvitz", "name": "Eli Hurvitz", "role": "Former CEO & Chairman", "bio": "Led Teva as CEO from 1976 to 2002 and chairman until 2010, transforming it from a small Israeli firm into the world's largest generic pharmaceutical company. Received the Israel Prize in 2011."},
    {"id": "person-richard-francis", "name": "Richard Francis", "role": "CEO", "bio": "Appointed CEO of Teva Pharmaceutical Industries in 2023. Previously served as CEO of Sandoz, Novartis's generics division, bringing deep experience in the global generic drug industry."},
    {"id": "person-kare-schultz", "name": "Kare Schultz", "role": "Former CEO", "bio": "Served as CEO of Teva from 2017 to 2023, tasked with reducing the company's massive debt and restructuring operations after a costly acquisition spree. Cut over $3 billion in costs."},
    {"id": "person-israel-makov", "name": "Israel Makov", "role": "Former CEO", "bio": "Served as CEO of Teva from 2002 to 2007, continuing the company's aggressive global acquisition strategy including the purchase of IVAX Corporation for $7.4 billion."},
    {"id": "person-jeremy-levin", "name": "Jeremy Levin", "role": "Former CEO", "bio": "Served briefly as CEO of Teva from 2012 to 2013, attempting to shift the company's strategy toward specialty branded pharmaceuticals before being replaced by the board."}
  ],
  "yad-vashem": [
    {"id": "person-dani-dayan", "name": "Dani Dayan", "role": "Chairman", "bio": "Appointed chairman of Yad Vashem in 2021. Previously served as Israel's Consul General in New York and as chairman of the Yesha Council representing Israeli settlers."},
    {"id": "person-mordecai-paldiel", "name": "Mordecai Paldiel", "role": "Former Director, Righteous Among the Nations Department", "bio": "Led Yad Vashem's Righteous Among the Nations program for over two decades, overseeing the recognition of non-Jews who risked their lives to save Jews during the Holocaust."},
    {"id": "person-avner-shalev", "name": "Avner Shalev", "role": "Former Chairman", "bio": "Served as chairman of Yad Vashem from 1993 to 2021, overseeing the creation of the new museum complex designed by Moshe Safdie and the massive expansion of its digital archives."},
    {"id": "person-gideon-hausner", "name": "Gideon Hausner", "role": "Former Chairman & Eichmann Prosecutor", "bio": "Served as chairman of Yad Vashem's council from 1968 to 1990. Previously served as Attorney General of Israel and was the lead prosecutor in the 1961 Adolf Eichmann trial."},
    {"id": "person-yitzhak-arad-yv", "name": "Yitzhak Arad", "role": "Former Chairman", "bio": "Served as chairman of Yad Vashem from 1972 to 1993. A Holocaust survivor, historian, and former IDF brigadier general who authored major works on the Holocaust in the Soviet Union."}
  ]
};

// Get Israel entries
const ilEntries = jd.countries['Israel'] || [];

// Build index for fast lookup
const ilIndex = {};
ilEntries.forEach((e, i) => { ilIndex[e.id] = i; });

for (const [entryId, individuals] of Object.entries(individualsMap)) {
  const idx = ilIndex[entryId];
  if (idx === undefined) {
    console.log('ENTRY NOT FOUND:', entryId);
    continue;
  }

  const entry = ilEntries[idx];
  const existingIds = new Set((entry.individuals || []).map(i => i.id));

  if (!entry.individuals) entry.individuals = [];

  let addedToEntry = 0;
  for (const ind of individuals) {
    // Add to people.json
    if (addPerson(ind.id, ind.name, ind.bio)) newPeople++;

    // Add to entry individuals if not already present
    if (!existingIds.has(ind.id)) {
      entry.individuals.push({
        id: ind.id,
        name: ind.name,
        role: ind.role,
        bio: ind.bio
      });
      existingIds.add(ind.id);
      addedToEntry++;
    }
  }

  if (addedToEntry > 0) {
    updatedEntries++;
    console.log(`  ${entryId}: +${addedToEntry} individuals (total: ${entry.individuals.length})`);
  }
}

// Save
fs.writeFileSync(pFile, JSON.stringify(pd, null, 2));
fs.writeFileSync(jFile, JSON.stringify(jd, null, 2));

// Verify
const totalPeople = Object.keys(pd.people).length;
let totalEntries = 0;
for (const c in jd.countries) totalEntries += jd.countries[c].length;

console.log(`\n=== expandData53 RESULTS ===`);
console.log(`Entries updated: ${updatedEntries}`);
console.log(`New people added: ${newPeople}`);
console.log(`Total people in DB: ${totalPeople}`);
console.log(`Total entries: ${totalEntries}`);

// Verify all targeted entries now have individuals
let sparse = 0;
for (const entryId of Object.keys(individualsMap)) {
  const idx = ilIndex[entryId];
  if (idx !== undefined) {
    const cnt = (ilEntries[idx].individuals || []).length;
    if (cnt <= 1) { console.log(`STILL SPARSE: ${entryId} (${cnt})`); sparse++; }
  }
}
console.log(`Still sparse: ${sparse}`);
