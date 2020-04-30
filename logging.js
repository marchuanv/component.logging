const utils = require("utils");
let rootSection;
let leafSection;
let logs = [];
let timeoutId;

function Section({ name, level, parent, child, logs, latestLogDate }) {
  this.name = name;
  this.level = level || "";
  this.parent = parent;
  this.child = child;
  this.logs = logs || [];
  this.latestLogDate = latestLogDate;

  this.clone = () => {
    const clone = new Section(this);
    clone.logs = [];
    return clone;
  };

}

const config = (sectionNames) => {
  let prevSection;
  for(let i = 0; i < sectionNames.length; i++){
    if (prevSection){
      const newSection = new Section({ name: sectionNames[i], level: prevSection.level + " ",  parent: prevSection });
      prevSection.child = newSection;
      prevSection = newSection;
    } else {
      rootSection = new Section({ name: sectionNames[i] });
      prevSection = rootSection;
    }
  };
  leafSection = prevSection;
};

const enumerateSections = (callback, fromRoot = true ) => {
  let section = fromRoot === true? rootSection: leafSection;
  while(section) {
    if (callback(section)===true){
      return section;
    } else {
      section = fromRoot === true? section.child: section.parent;
    }
  };
};

const findSection = (name) => {
  return enumerateSections((section)=> section.name === name);
};

const write = (source, message, data=null) => {
  logs.push({date: new Date(), source, message, data: utils.getJSONString(data) });
  if (timeoutId){
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {

    const sortedLogs = logs.sort((a, b) => {
        a = new Date(a.dateModified);
        b = new Date(b.dateModified);
        return a>b ? -1 : a<b ? 1 : 0;
    });
    
    const sections = [];
    let prevSection;
    for(const log of sortedLogs){
      let section = findSection(log.source);
      if (section){
        if (!prevSection || (prevSection && prevSection.name !== section.name) ){
            section = section.clone();
            section.latestLogDate = log.date;
            sections.push(section);
        }
        prevSection = section;
      }
    };

    for(const log of sortedLogs){
      let section = sections.find(sec => sec.name === log.source && log.date.getTime() <= sec.latestLogDate.getTime() );
      if (section){
        section.logs.push(log);
      }
    };
 
    for(const section of sections){
      if (section.logs.length > 0){
        console.log(`${section.level}-----------------------------------------------------------------------------------------------------------------------`);
        console.log(`${section.level}- ${section.name}`);
        for(const log of section.logs){
          console.log(`${section.level}  - ${log.message}`);
        };
        console.log("");
      }
    };

  }, 2000);
};

module.exports = { config, write };
