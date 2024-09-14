# Hypermedia for Strapi (Work in progress)

If you like HTMX and Hypermedia things, you are at the right place.

I have for plan to create an hypermedia system on top of Strapi

The concept is very simple, the api endpoint is accessible at the root of the app and the json response is transfered to a template engine (TWIG only at this time)

# Install the plugin

- Clone this repo in your plugins directory on strapi.

- Register the plugin in your plugins.js file on the config directory

```js
// ./config/plugins.js
module.exports = () => ({
    'hypermedia': {
        enabled: true,
        resolve: './src/plugins/hypermedia'
    },
});
```

Now if you try to go to the root of your strapi you show an error from the template engine. Just complete your available files :

- In the **/src** directory add a **views** directory with an **index.html.twig** file

## Use it
That's all, you just have the template engine errors guide you on what to do.

if you have an api route /api/entity, you can access the same api from /entity
To decorate the data you have to create a /api/entity.html.twig

If you want to decorate a route like /api/entity/1 you have to create
/api/entity/id.html.twig


## Template
In yours templates you can retrieve the initial strapi json response with this instruction

```twig
{{ debug }}
```

To retrieve data or metadata you have to use
```twig
{{ data }}
{{ meta }}
```

Example of a loop foreach
```twig
<ul>
{% for item in data %}
    <li>{{item.attributes.title}}</li>
{% endfor %}
</ul>
```

For more information about twig : https://twig.symfony.com


## Note
This project is very young, open issues or do pull requests
Sorry, i wrote this readme at the speed of light, if you show this note your are a prime user/tester.

If you like this project, say it, if you don't, say it too if you have time to lost.