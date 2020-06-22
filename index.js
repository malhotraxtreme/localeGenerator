const express = require('express');
const translate = require('@vitalets/google-translate-api');
var bodyParser = require('body-parser')



const languages = ['da', 'de', 'en', 'en', 'es', 'fr', 'fr', 'it', 'nl', 'pl' , 'pt', 'ru', 'sv' ,'zh-CN',  'zh-TW', 'no', 'cs', 'hu', 'fi', 'ja' ];
const app = express();
const PORT = "3000";
// app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout'}));
// app.set('views', path.join(__dirname,'views'));
// app.set('view engine', 'hbs');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile('views/page.html', { root: __dirname });

});




app.post('/translate', (req, res) => {

    console.log(req.body);

    var pre = req.body.pre;
    var tranlsationStr = req.body.translate;
    var post = req.body.post;

    var respArr = [];

    // console.log("This is the str > ",tranlsationStr, typeof(tranlsationStr));
    // console.log("This is the str > ",pre, typeof(pre));
    // console.log("This is the str > ",post, typeof(post));


    let pr = new Promise( () => {

        for(let i=0;i<languages.length;i++){
            translate(tranlsationStr, { from: 'en', to: languages[i] }).then(async rest => {
                await sleep(i*300);
                console.log("Call "+i);
                respArr.push(rest.text);

                if(i==languages.length-1){
                    // console.log(respArr);
                    res.json({resp:respArr, languages:languages});
                }

            }).catch(err => {
                console.error(err);
            });
        }

    });


    //console.log(respArr);



    //res.json(respArr);

});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   











app.listen(PORT, () => {
    console.log("Runnning now on Port : " + PORT)
});