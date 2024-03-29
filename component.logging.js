const utils = require("utils");

function Section({ name, level, parent, child, logs, index }) {
  this.name = name;
  this.level = level || "";
  this.parent = parent;
  this.child = child;
  this.logs = logs || [];
  this.index = index;
  this.clone = () => {
    const clone = new Section(this);
    clone.logs = [];
    return clone;
  };
}

function Logger({ componentName }) {
  let childSection;
  const sectionName = componentName;
  if (!rootSection){
    rootSection = new Section({ name: sectionName });
  }
  if (!childSection){
    childSection = leafSection || rootSection;
  }
  if (rootSection.name !== sectionName){
    const newSection = new Section({ name: sectionName, level: childSection.level + " ",  parent: childSection });
    childSection.child = newSection;
    childSection = newSection;
  }
  leafSection = childSection;
  this.source = componentName;
}

Logger.prototype.write = function(message, data = null) {
  setTimeout(()=> {
    index = index + 1;
    logs.push({index, source: this.source, message, data: utils.getJSONString(data) });
    if (timeoutId){
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      const sortedLogs = logs.sort((a, b) => b - a);
      
      const sections = [];
      let prevSection;
      for(const log of sortedLogs){
        let section = findSection(log.source);
        if (section){
          if (!prevSection || (prevSection && prevSection.name !== section.name) ){
            section = section.clone();
            sections.push(section);
            section.index = log.index;
          } else {
            const filteredSections = sections.filter(x=>x.name === log.source);
            section = filteredSections.sort((secA, secB) => secB.index - secA.index)[0];
            section.index = log.index;
          }
          prevSection = section;
        }
      };

      for(const section of sections){
        for(const log of sortedLogs){
          if (log.index <= section.index && log.source === section.name && log.index <= section.index && !log.added) {
            log.added = true;
            section.logs.push(log);
          }
        };
      };
  
      for(const section of sections){
        if (section.logs.length > 0){
          console.log(`${section.level}-----------------------------------------------------------------------------------------------------------------------`);
          console.log(`${section.level}- ${section.name}`);
          for(const log of section.logs){
            console.log(`${section.level}  - ${log.message}`, log.data );
          };
          console.log("");
        }
      };

      logs =[];
      index = 0;

    }, 5000);
  },1000);
}

let rootSection;
let leafSection;
let logs = [];
let timeoutId;
let index = 0;

const findSection = (name) => {
  return enumerateSections(( section )=> section.name === name);
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

module.exports = { Logger };