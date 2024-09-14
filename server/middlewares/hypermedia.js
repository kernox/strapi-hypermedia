/**
 * Author: Alexis Gilard
 * Contact: alexis.gilard@gmail.com
 */
const Twig = require('twig')

const exceptions = /\.(js|css|png|jpg|gif)$/i
const strapiRoutes = /^\/(admin|api|i18n|content-manager|content-type-builder|upload)/
const strapiRoutesExceptAPI = /^\/(admin|i18n|content-manager|content-type-builder|upload)/

module.exports = async (ctx, next) => {    

    //Retrieve /api route from the root
    
    if(!ctx.url.match(strapiRoutes) && ctx.url !="/" && !ctx.url.match(exceptions)){     
        const target = '/api' + ctx.url;
        console.log(`${ctx.url} call ${target}`);
        ctx.url = target;
    }

    await next()
        

    const viewPath = (ctx.url == 'index.html') ? './src/views/' + ctx.url + '.twig' : './src/views' + ctx.url.replace(/\/\d$/, '/id') + '.html.twig';

    console.log('Load twig template at', viewPath)

        if(!ctx.url.match(strapiRoutesExceptAPI) && !ctx.url.match(exceptions)){
            ctx.type = 'text/html';
    
            const {data, meta} = ctx.response.body;
            ctx.response.body = await render(viewPath, data, meta, JSON.stringify(ctx.response.body))
        }   


}

function render(view, data, meta, debug){
    return new Promise((resolve, reject) => {

        Twig.renderFile(view, {data, meta, debug}, (err, html) => {

            if(err){
                resolve(err.message)
            }

            resolve(html)
        })
    })
}