/****************************************************************************
    i18next-phrases.js, 

    (c) 2017, FCOO

    https://github.com/FCOO/i18next-phrases
    https://github.com/FCOO

****************************************************************************/

/****************************************************************************
    Default 1-dim json-structure for i18next is 
        { lang1: { 
            namespace: { key: value1 }
          },
          lang2: { 
            namespace: { key: value2 }
          }
        }

    To make adding translation easier two new formats are supported: 

    1: phrase: namespace->key->lang
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
    
    2: key-phrase: key->namespace->lang
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
****************************************************************************/

(function ($, i18next/*, window, document, undefined*/) {
    "use strict";

    /***********************************************************************
    addPhrase( [namespace,] key, langValues) 
    - key {string} can be a combined namespace:key string. 
    - langValues = { [lang: value]xN }
    ***********************************************************************/
    i18next.addPhrase = function( namespace, key, langValues ){
        var nsSeparator = this.options.nsSeparator,
            _this = this;

        if (arguments.length == 2){
            //No namespace
            namespace  = this.options.defaultNS[0];
            key        = arguments[0];     
            langValues = arguments[1];
        }

        if (key.indexOf(nsSeparator) > -1){
            key = key.split(nsSeparator)[1];
            namespace = key.split(nsSeparator)[0];
        }

        $.each( langValues, function( lang, value ){
            _this.addResource(lang, namespace, key, value);
        });
        return this;
    };

    /***********************************************************************
    addPhrases( [namespace,] keyLangValues )
    - keyLangValues = { key: [lang: value]xN }, key2: [lang: value]xN } }
    ***********************************************************************/
    i18next.addPhrases = function( namespace, keyLangValues ){
        var _this = this;
        if (arguments.length == 1){
            //no namespace, only keyLangValues
            namespace     = this.options.defaultNS[0];
            keyLangValues = arguments[0];
        }
        $.each( keyLangValues, function( key, langValues ){
            _this.addPhrase( namespace, key, langValues );
        });
        return this;
    };

    /***********************************************************************
    addBundlePhrases( namespaceKeyLangValues  )
    - namespaceKeyLangValues = {
          namespace1: { 
              key1: { [lang: value]xN }, 
              key2: { [lang: value]xN }
          }, 
          namespace2:{
              ...
          }
      }
    ***********************************************************************/
    i18next.addBundlePhrases = function( namespaceKeyLangValues ){
        var _this = this;
        $.each( namespaceKeyLangValues, function( namespace, keyLangValues ){
            _this.addPhrases( namespace, keyLangValues );
        });
        return this;
    };

    /***********************************************************************
    i18next.loadPhrases( jsonFileName, callback );
    ***********************************************************************/
    i18next.loadPhrases = function( jsonFileName, callback ){
        var jqxhr = $.getJSON( jsonFileName ),
            _this = this;
        if (callback)
            jqxhr.fail( callback );

        jqxhr.done( function( data ) {
            _this.addBundlePhrases( data );
            if (callback)
              callback( null );
        });
    };
    
    /***********************************************************************
    i18next.addKeyPhrase = function( key, namespace, langValues )
    - langValues = { [lang: value]xN }
    ***********************************************************************/
    i18next.addKeyPhrase = function( key, namespace, langValues ){
        return this.addPhrase( namespace, key, langValues );
    };

    /***********************************************************************
    i18next.addKeyPhrases = function( key, namespaceLangValues )
    - namespaceLangValues = { 
          namespace1: { [lang: value]xN }, 
          namespace2: { [lang: value]xN } }, 
      }
    ***********************************************************************/
    i18next.addKeyPhrases = function( key, namespaceLangValues ){
        var _this = this;
        $.each( namespaceLangValues, function( namespace, langValues ){
            _this.addKeyPhrase( key, namespace, langValues );
        });
        return this;
    };

    /***********************************************************************
    addBundleKeyPhrases( keyNamespaceLangValues  )
    keyNamespaceLangValues = { 
        key1: { 
            namespace1: { [lang: value]xN }, 
            namespace2: { [lang: value]xN }
        }, 
        key2:{
            ...
        }
    }`
    ***********************************************************************/
    i18next.addBundleKeyPhrases = function( keyNamespaceLangValues ){
        var _this = this;
        $.each( keyNamespaceLangValues, function( key, namespaceLangValues ){
            _this.addKeyPhrases( key, namespaceLangValues );
        });
        return this;
    };

    /***********************************************************************
    i18next.loadKeyPhrases = function( jsonFileName, callback )
    ***********************************************************************/
    i18next.loadKeyPhrases = function( jsonFileName, callback ){
        var jqxhr = $.getJSON( jsonFileName );
        if (callback)
            jqxhr.fail( callback );

        jqxhr.done( function( data ) {
            $.each( data, function( namespace, keyLangValues ) {
                i18next.addKeyPhrases( namespace, keyLangValues );
            });
            if (callback)
              callback( null );
        });
    
    };
    
    
    /***********************************************************************
    sentence ( langValues, options )
    - langValues = { [lang: value]xN }
    A single translation of a sentence. No key used or added
    ***********************************************************************/
    i18next.sentence = function( langValues, options ){ 
        var nsTemp = '__TEMP__',
            keyTemp = '__KEY__',
            _this = this,
            nsSeparator = this.options.nsSeparator;
        
        //Remove any data from nsTemp
//        $.each( languages, function( index, lang ){
//            _this.removeResourceBundle(lang, nsTemp);
//        });
        this.addPhrase( nsTemp, keyTemp, langValues );
        var result = this.t(nsTemp + nsSeparator + keyTemp, options );

        //Remove the key again
        $.each( langValues, function( lang ){
            _this.removeResourceBundle(lang, nsTemp);
        });

        return result;
    };

    /***********************************************************************
    s ( langValues, options )
    - langValues = { [lang: value]xN }
    ***********************************************************************/
    i18next.s = function( langValues, options ){
        return this.sentence( langValues, options );
    };


}(jQuery, this.i18next, this, document));