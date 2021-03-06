const fs = require('fs');
const { promisify } = require("util");
const puppeteer = require('puppeteer');

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


let page;
let browser;

const tc =  // TEST CONFIGURATION
  {
    folder: 'test',
    url:'http://localhost:4200',
    page_width: 1920,
    page_height: 1080,

    tests:[
      { id:1,
        name: 'select_hero_narco',
        action: 'click',
        selector: '#Narco'},
      { id:2,
        name: 'select_name_field',
        action: 'click',
        selector: '#hero-detail-name'},
      { id:3,
        name: 'type_name',
        action: 'type',
        selector: '#hero-detail-name',
        value: 'Batman'},
      { id:4,
        name: 'save_hero_detail',
        action: 'click',
        selector: '#hero-detail-save'},
      { id:5,
        name: 'got_to_initial_page',
        action: 'gotohome',
        selector: '#top-heroes' },
      { id:6,
        name: 'see_list_of_heroes',
        action: 'click',
        selector: '#menu_link_heroes' }

        //    await page.click("#menu_link_heroes");
    ]
  };

function imageFileName(test, folder) {
  return folder + "/" + test.id + "-" + test.name + ".png";
}

(async () => {

  try {
    await promisify(fs.readdir)(tc.folder);
  } catch(e){
    await promisify(fs.mkdir)(tc.folder);
  }

  const options = {
    headless: false,
    slowMo: 160,
    args: [`--window-size=${tc.page_width},${tc.page_width}`]
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: tc.page_width, height:tc.page_height });
  await page.goto(tc.url);
  await page.screenshot({path: tc.folder + '/0-landing_page.png'});

  for( const test of tc.tests ){
    await page.waitForSelector(test.selector);
    if (test.action === 'click'){
      await page.click(test.selector);
    } else if (test.action === 'type'){
      await page.type(test.selector,test.value);
    }  else if (test.action === 'gotohome'){
      await page.goto(tc.url);
      await page.waitForSelector(test.selector);
    }
    await page.screenshot({path:imageFileName(test, tc.folder)});
    await delay(1000);
  }
  await delay(10000);
  await browser.close();

})();
