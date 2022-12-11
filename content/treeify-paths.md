---
title: "treeify-paths"
author: OhKay.
date: 2020-08-14T18:46:11-06:00
toc: true
description: Converts a list of paths into a directory-like tree structure
tags: [javascript, node-js, npm, typescript, typescript-bindings]
categories: [software]
---

## Introduction

Useful when converting a list of file names into a nested UL/LI tree. Perfect for site maps, and directory listings.

Provide a **list of file names**:

- blog/all.html
- blog/2036/overflows.html

And recieve a **directory-like tree**:

- blog
  - all.html
  - 2036
    - overflows.html

## Installation

Install it with NPM:

```bash
npm install --save treeify-paths
```

Import with modern syntax:

```javascript
import treeifyPaths from "treeify-paths";
```

_Or_ if you are not using NPM, install the library by downloading the [source file](https://raw.githubusercontent.com/khtdr/treeify-paths/master/dist/treeify-paths.js) directly and including it in your project:

```bash
curl -o treeify-paths.js "https://raw.githubusercontent.com/khtdr/treeify-paths/blob/master/dist/treeify-paths.js"
```

Load with classic syntax:

```javascript
let treeify_paths = require("./treeify-paths").default;
```

The library itself is written in [a few lines of typescript](https://raw.githubusercontent.com/khtdr/treeify-paths/master/treeify-paths.ts).

## Example Usage

This module provides a function `treeifyPaths` that takes a list of file names and returns a directory-like tree.

```typescript
type Tree :{
  path :string     // full path to this node
  name :string     // name of this leaf
  children :Tree[] // sub tree of trees and leaves
}
treeifyPaths(paths :string[]) => :Tree
```

This example produces prints the following output:

```javascript
import treeifyPaths from 'treeify-paths';
console.log(JSON.stringify(treeifyPaths([
  'about.html',
  'careers',
  'careers/job-1.html',
  'careers/job-2.html',
  'to/some/page.aspx',
]), null, 3);
```

    {
        "path": "",
        "name": "",
        "children": [
            {
                "path": "about.html",
                "name": "about.html",
                "children": []
            },
            {
                "path": "careers",
                "name": "careers",
                "children": [
                    {
                        "path": "careers/job-1.html",
                        "name": "job-1.html",
                        "children": []
                    },
                    {
                        "path": "careers/job-2.html",
                        "name": "job-2.html",
                        "children": []
                    }
                ]
            },
            {
                "path": "to",
                "name": "",
                "children": [
                    {
                        "path": "to/some",
                        "name": "",
                        "children": [
                            {
                                "path": "to/some/page.aspx",
                                "name": "page.aspx",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }

**Online Interactive Examples**

- [Live example](https://runkit.com/khtdr/treeify-paths)
- [Download example](https://runkit.com/downloads/khtdr/treeify-paths/1.0.0.zip)

## Testing

The mocha [tests have many examples](https://github.com/khtdr/treeify-paths/blob/master/tests.js)

```bash
> treeify-paths@1.0.2 pretest khtdr/treeify-paths
> tsc lib.ts && mv lib.js treeify-paths.js

> treeify-paths@1.0.2 test khtdr/treeify-paths
> mocha tests.js

  treeifyPaths([...arguments])
    arguments: none
      ✓ should return an empty object
    arguments: empty list
      ✓ should return an empty object
    arguments: list with a single file
      ✓ should return a single file
      ✓ should return with nested children
    arguments: multiple file names
      ✓ should return with nested children
      ✓ should alphabetize
      ✓ should ignore duplicates

  7 passing (8ms)
```

> The full source code and examples are available at: [khtdr/treeify-paths](https://github.com/khtdr/treeify-paths)
