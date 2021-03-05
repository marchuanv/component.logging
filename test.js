(async()=>{
    const componentLogging = require("./component.logging.js");
    const component = require("component");
    await component.require("component.request.handler", { gitUsername: "marchuanv" });

    componentLogging.write("component.logging","something happened 1");
    componentLogging.write("component.logging","something happened 2");
})().catch((err)=>{
    console.error(err);
});