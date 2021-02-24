const componentLogging = require("./component.logging.js");
(async()=>{

    componentLogging.config.add("GROUPA");
    componentLogging.config.add("GROUPB");
    componentLogging.config.add("GROUPC");
    componentLogging.config.add("GROUPD");
    componentLogging.config.add("GROUPE");

    componentLogging.write("GROUPA","something happened 1");
    componentLogging.write("GROUPA","something happened 2");
    componentLogging.write("GROUPB","something happened 100");
    componentLogging.write("GROUPA","something happened 3");

    componentLogging.write("GROUPB","something happened 4");
    componentLogging.write("GROUPB","something happened 5");
    componentLogging.write("GROUPB","something happened 6");

    componentLogging.write("GROUPA","something happened 13");
    componentLogging.write("GROUPA","something happened 14");
    componentLogging.write("GROUPA","something happened 15");

    componentLogging.write("GROUPC","something happened 7");
    componentLogging.write("GROUPC","something happened 8");
    componentLogging.write("GROUPC","something happened 9");

    componentLogging.write("GROUPD","something happened 10");
    componentLogging.write("GROUPD","something happened 11");
    componentLogging.write("GROUPD","something happened 12");

    componentLogging.write("GROUPE","something happened 16");

})().catch((err)=>{
    console.error(err);
});