(async()=>{
    const componentLogging = require("./component.logging.js");
    componentLogging.write("component.logging","something happened 1");
    componentLogging.write("component.logging","something happened 2");
})().catch((err)=>{
    console.error(err);
});