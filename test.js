const Component = require("component");
(async()=>{
    const component = new Component("TEST")
    const { componentRequestHandler } = await component.require("component.request.handler", { gitUsername: "marchuanv" });
    if (!componentRequestHandler){
        throw "Test Failed";
    }
})().catch((err)=>{
    console.error(err);
});