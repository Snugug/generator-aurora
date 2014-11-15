# generator-Aurora [![Build Status](https://secure.travis-ci.org/Snugug/generator-aurora.png?branch=master)](https://travis-ci.org/Snugug/generator-aurora)

> [Yeoman](http://yeoman.io) generator for Drupal's [Aurora](https://drupal.org/project/aurora) theme

## All active development has moved to generator-drupal-theme.

This generator has been changed to just call the [generator-drupal-theme](https://github.com/frontend-united/generator-drupal-theme), and nothing more. It can still be used, but please file any issues on that repo.



```bash
____________________________________________________________________________________________
 ____________________________________________________________________________________________
  ____________________________________________________________________________________________
   __/\\\\\\\\\______/\\\____/\\\___/\\/\\\\\\\_______/\\\\\______/\\/\\\\\\\____/\\\\\\\\\____
    _\////////\\\____\/\\\___\/\\\__\/\\\/////\\\____/\\\///\\\___\/\\\/////\\\__\////////\\\___
     ___/\\\\\\\\\\___\/\\\___\/\\\__\/\\\___\///____/\\\__\//\\\__\/\\\___\///_____/\\\\\\\\\\__
      __/\\\/////\\\___\/\\\___\/\\\__\/\\\__________\//\\\__/\\\___\/\\\___________/\\\/////\\\__
       _\//\\\\\\\\/\\__\//\\\\\\\\\___\/\\\___________\///\\\\\/____\/\\\__________\//\\\\\\\\/\\_
        __\////////\//____\/////////____\///______________\/////______\///____________\////////\//__
```

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-Aurora from npm, run:

```
$ npm install -g generator-aurora
```

Finally, initiate the generator:

```
$ yo aurora
```

Install (or update/reset) extras after theme install:

```
$ yo aurora:extras
```

### Features

For a full list of features, check out the [Aurora Documentation](http://snugug.github.io/Aurora/). Currently we have both Grunt and Gulp support, although we are doing some more testing to ensure both work flawlessly, and with all the tasks you need. If you find any issues, please add them to the issue queue.

### generator-drupal-theme vs. generator-aurora

Currently, these two generators have 100% feature parity as far as Aurora is concerned. Once development is fininished on [generator-drupal-theme](https://github.com/frontend-united/generator-drupal-theme) we will be focusing primarily on generator-drupal-theme, as it will be more generic. But until that point, feel free to use either.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
