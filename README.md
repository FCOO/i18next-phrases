# i18next-phrases
[i18next]:http://i18next.com


## Description
Extend i18next to load translations as { namespace: { key: { lang1: value1, lang2: value2 } } }

## Installation
### bower
`bower install https://github.com/FCOO/i18next-phrases.git --save`

## Demo
http://FCOO.github.io/i18next-phrases/demo/ 

## Usage
Default 1-dim json-structure for [i18next] is `lang->namespace->key`:

    { 
        lang1: { 
            namespace1: { 
                key1: value1-1-1,
                key2: value1-1-2
             },
            namespace2: { 
                key1: value1-2-1,
                key2: value1-2-2
             }
        },
        lang2: { 
            namespace1: { 
                key1: value2-1-1,
                key2: value2-1-2
            },
            namespace2: { 
                key1: value2-2-1,
                key2: value2-2-2
             }
        }
    }

To make adding translation easier two new formats are supported: 

### phrase: `namespace->key->lang`
    {
        namespace1: {
            key1: {
                lang1: value1-1-1,
                lang2: value2-1-1
            },
            key2: {
                lang1: value1-1-2,
                lang2: value2-1-2
            }
        },
        namespace2: {
            key1: {
                lang1: value1-2-1,
                lang2: value2-2-1
            },
            key2: {
                lang1: value1-2-2,
                lang2: value2-2-2
            }
        }
    }
    

### key-phrase: `key->namespace->lang`
    {
        key1: {
            namespace1: {
                lang1: value1-1-1,
                lang2: value2-1-1
            },
            namespace2: {
                lang1: value1-2-1,
                lang2: value2-2-1
            }
        },
        key2: {
            namespace1: {
                lang1: value1-1-2,
                lang2: value2-1-2
            },
            namespace2: {
                lang1: value1-2-2,
                lang2: value2-2-2
            }
        }
    }



## Methods
The following methods are added to [i18next].

### `i18next.addPhrase( [namespace,] key, langValues) `
`key {string}` can be a combined namespace:key string. 
`langValues = { [lang: value]xN }`

### `i18next.addPhrases( [namespace,] keyLangValues )`
`keyLangValues = { key: { [lang: value]xN }, key2: { [lang: value]xN } }`

### `i18next.addBundlePhrases( namespaceKeyLangValues )`
    namespaceKeyLangValues = {
        namespace1: { 
            key1: { [lang: value]xN }, 
            key2: { [lang: value]xN }
        }, 
        namespace2:{
            ...
        }
    }

### `i18next.loadPhrases( jsonFileName, callback )`
`callback = function( err ) //err == null on succes`

### `i18next.addKeyPhrase( key, namespace, langValues )`
`langValues = { [lang: value]xN }`

### `i18next.addKeyPhrases( key, namespaceLangValues ) `
`namespaceLangValues = { namespace1: { [lang: value]xN }, namespace2: { [lang: value]xN } }`

### `i18next.addBundleKeyPhrases( keyNamespaceLangValues ) `
    keyNamespaceLangValues = { 
        key1: { 
            namespace1: { [lang: value]xN }, 
            namespace2: { [lang: value]xN }
        }, 
        key2:{
            ...
        }
    }`

### `i18next.loadKeyPhrases( jsonFileName, callback )`
`callback = function( err ) //err == null on succes`

### `i18next.sentence( langValues, options ) - return {string}`
`langValues = { {lang: value}xN }`
A single translation of a phrase. No key used or added. 
E.g.

    i18next.sentence({ da:'Dette er på dansk', en:'This is ín English'})

### `i18next.s( langValues, options ) - return {string}`
Same as `i18next.sentence`



## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/i18next-phrases/LICENSE).

Copyright (c) 2017 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk

