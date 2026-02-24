const fs = require('fs');
const path = require('path');
const data = {
  countries: {
    "United States": [
      {
        id: "american-jewish-committee",
        name: "American Jewish Committee",
        type: "advocacy organization",
        description: "One of the oldest Jewish advocacy groups, founded in 1906, focusing on civil rights and international affairs.",
        website: "https://www.ajc.org/",
        individuals: [
          { name: "David Harris", role: "CEO" },
          { name: "Simon Wolf", role: "Founder (1906)" }
        ]
      },
      {
        id: "anti-defamation-league",
        name: "Anti-Defamation League",
        type: "organization",
        description: "Founded in 1913 to stop the defamation of the Jewish people and secure justice and fair treatment for all.",
        website: "https://www.adl.org/",
        individuals: [
          { name: "Jonathan Greenblatt", role: "CEO" },
          { name: "Sigmund Livingston", role: "Founder" }
        ]
      },
      {
        id: "aipac",
        name: "AIPAC (American Israel Public Affairs Committee)",
        type: "lobbying group",
        description: "Pro-Israel lobby group to strengthen relations between the United States and Israel.",
        website: "https://www.aipac.org/",
        individuals: [
          { name: "Howard Kohr", role: "Executive Director" }
        ]
      },
      {
        id: "jewish-federations-of-north-america",
        name: "Jewish Federations of North America",
        type: "federation",
        description: "Umbrella organization for Jewish federations across the U.S. and Canada, focused on philanthropy and community services.",
        website: "https://www.jewishfederations.org/",
        individuals: [
          { name: "Eric Fingerhut", role: "President & CEO" }
        ]
      },
      {
        id: "chabad-lubavitch",
        name: "Chabad-Lubavitch",
        type: "religious movement",
        description: "Global Hasidic movement known for outreach, education, and community centers worldwide.",
        website: "https://www.chabad.org/",
        individuals: [
          { name: "Menachem Mendel Schneerson", role: "Rebbe (leader until 1994)" }
        ]
      },
      {
        id: "hillel-international",
        name: "Hillel International",
        type: "student organization",
        description: "Jewish campus organization serving students at colleges and universities.",
        website: "https://www.hillel.org/",
        individuals: [
          { name: "Eric Fingerhut", role: "President & CEO" }
        ]
      },
      {
        id: "jewish-national-fund-jnf-usa",
        name: "Jewish National Fund (JNF-USA)",
        type: "non-profit",
        description: "Fundraising organization supporting development projects in Israel, originally founded to buy and develop land.",
        website: "https://www.jnf.org/",
        individuals: [
          { name: "Russell Robinson", role: "President & CEO" }
        ]
      },
      {
        id: "zionist-organization-of-america",
        name: "Zionist Organization of America",
        type: "political organization",
        description: "Oldest pro-Israel organization in the U.S., established in 1897.",
        website: "https://zoa.org/",
        individuals: [
          { name: "Morton Klein", role: "President" }
        ]
      },
      {
        id: "jewish-agency-for-israel-usa",
        name: "Jewish Agency for Israel (USA offices)",
        type: "non-profit",
        description: "Organization promoting immigration to Israel and supporting Israelis worldwide.",
        website: "https://www.jewishagency.org/",
        individuals: [
          { name: "Amirá Ayalon", role: "CEO" }
        ]
      },
      {
        id: "hadassah-womens-zionist-organization-of-america",
        name: "Hadassah, The Women’s Zionist Organization of America",
        type: "volunteer organization",
        description: "America’s largest Jewish women's organization, supporting health care, education, and advocacy in Israel and the U.S.",
        website: "https://www.hadassah.org/",
        individuals: [
          { name: "Rhonda Haas Glantz", role: "National President" }
        ]
      }
    ],
    "Israel": [
      {
        id: "ministry-of-religious-services",
        name: "Ministry of Religious Services",
        type: "government agency",
        description: "Israeli government ministry responsible for religious services, synagogues, and kosher certification.",
        website: "https://www.gov.il/en/departments/ministry_of_religious_services",
        individuals: [
          { name: "Yaakov Avitan", role: "Minister (as of 2024)" }
        ]
      },
      {
        id: "jewish-agency-for-israel",
        name: "Jewish Agency for Israel",
        type: "non-profit",
        description: "Coordinates immigration (aliyah) and works to strengthen Jewish identity globally.",
        website: "https://www.jewishagency.org/",
        individuals: [
          { name: "Amirá Ayalon", role: "CEO" }
        ]
      },
      {
        id: "keren-kayemeth-leisrael-jewish-national-fund",
        name: "Keren Kayemeth LeIsrael (Jewish National Fund)",
        type: "non-profit",
        description: "Organization for development of land and forestry projects in Israel from its founding in 1901.",
        website: "https://www.jnf.org/",
        individuals: [
          { name: "Russell Robinson", role: "President & CEO (JNF-USA)" }
        ]
      },
      {
        id: "world-zionist-organization",
        name: "World Zionist Organization",
        type: "international organization",
        description: "Founded in 1897 by Theodor Herzl to promote Zionism; still involved in education, immigration, and settlement.",
        website: "https://www.wzo.org.il/",
        individuals: [
          { name: "Yaakov Hagoel", role: "Acting Chairman" }
        ]
      },
      {
        id: "hebrew-university-of-jerusalem",
        name: "Hebrew University of Jerusalem",
        type: "education",
        description: "One of Israel's leading academic institutions, founded in 1918 and opened in 1925.",
        website: "https://www.huji.ac.il/",
        individuals: [
          { name: "Asher Cohen", role: "President" }
        ]
      },
      {
        id: "bar-ilan-university",
        name: "Bar-Ilan University",
        type: "education",
        description: "Public research university incorporating Jewish studies into its curriculum.",
        website: "https://www.biu.ac.il/",
        individuals: [
          { name: "Arie Zaban", role: "President" }
        ]
      },
      {
        id: "technion-israel-institute-of-technology",
        name: "Technion , Israel Institute of Technology",
        type: "education",
        description: "Israel’s premier science and engineering university, located in Haifa.",
        website: "https://www.technion.ac.il/",
        individuals: [
          { name: "Uri Sivan", role: "President" }
        ]
      },
      {
        id: "yad-vashem",
        name: "Yad Vashem",
        type: "museum/organization",
        description: "Israel’s official memorial to the victims of the Holocaust located on Mount Herzl in Jerusalem.",
        website: "https://www.yadvashem.org/",
        individuals: [
          { name: "Dani Dayan", role: "Chairman" }
        ]
      }
    ],
    "United Kingdom": [
      {
        id: "board-of-deputies-of-british-jews",
        name: "Board of Deputies of British Jews",
        type: "representative body",
        description: "The main representative organisation of British Jews, founded in 1760.",
        website: "https://www.bod.org.uk/",
        individuals: [
          { name: "Michael Wegier", role: "President" }
        ]
      },
      {
        id: "jewish-leadership-council",
        name: "Jewish Leadership Council",
        type: "umbrella organization",
        description: "Brings together major UK Jewish organisations to coordinate strategy and advocacy.",
        website: "https://www.thejlc.org/",
        individuals: [
          { name: "Jeremy Newmark", role: "Former CEO" }
        ]
      },
      {
        id: "united-synagogue",
        name: "United Synagogue",
        type: "religious body",
        description: "The largest synagogue body in the UK, representing Orthodox communities.",
        website: "https://www.theus.org.uk/",
        individuals: [
          { name: "Freda Lewis-Hall", role: "President" }
        ]
      }
    ]
  }
};

// write data to jewish.json if run directly
if (require.main === module) {
  const file = path.join(__dirname, '..', 'data', 'jewish.json');
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('wrote', file);
}

module.exports = data;