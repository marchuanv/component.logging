const logging = require("./logging.js");
(async()=>{

    logging.config(["GROUPA", "GROUPB", "GROUPC", "GROUPD"]);

    setTimeout(()=>{
        logging.write("GROUPA","something happened 1");
        logging.write("GROUPA","something happened 2");
        logging.write("GROUPB","something happened 100");
        logging.write("GROUPA","something happened 3");
    },100);

    setTimeout(()=>{
        logging.write("GROUPB","something happened 4");
        logging.write("GROUPB","something happened 5");
        logging.write("GROUPB","something happened 6");
    },200);

    setTimeout(()=>{
        logging.write("GROUPA","something happened 13");
        logging.write("GROUPA","something happened 14");
        logging.write("GROUPA","something happened 15");
    },300);

    setTimeout(()=>{
        logging.write("GROUPC","something happened 7");
        logging.write("GROUPC","something happened 8");
        logging.write("GROUPC","something happened 9");
    },400);

    setTimeout(()=>{
        logging.write("GROUPD","something happened 10");
        logging.write("GROUPD","something happened 11");
        logging.write("GROUPD","something happened 12");
    },500);

    setTimeout(()=>{
        logging.write("GROUPE","something happened 16");
    },600);


})().catch((err)=>{
    console.error(err);
});