# node-fixmyjs

[![Build Status](https://secure.travis-ci.org/goatslacker/node-fixmyjs.png)](http://travis-ci.org/goatslacker/node-fixmyjs)


This is the nodejs package for `jshint-autofix`

Meant to automatically fix your lint errors in a non-destructive way.

## How to Install

    sudo npm install fixmyjs -g

## API

    $ fixmyjs

    Usage: fixmyjs [options]

    Options:

      -h, --help                output usage information
      -c, --config [.jshintrc]  Load your own config file
      -d, --diff                Similar to dry-run
      -r, --dry-run             Performs a dry-run and shows you a diff
      -p, --patch               Output a patch file to stdout
