const Component = require("component");
(async()=>{
    const componentLogging = require("./component.logging.js");
    const component = new Component("TEST")
    const { componentRequestHandler } = await component.require("component.request.handler", { gitUsername: "marchuanv" });
    if (!componentRequestHandler){
        throw "Test Failed";
    }
    componentLogging.write("component.logging","something happened 1");
    componentLogging.write("component.logging","something happened 2");
})().catch((err)=>{
    console.error(err);
});