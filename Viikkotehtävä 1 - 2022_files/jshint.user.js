// ==UserScript==
// @name     JSHint
// @description	  Suorittaa sivuun linkitetyille lokaaleille skripteille JSHintin tarkistuksen
// @version  1.1
// @include       file:///*.html
// @include       file:///*.xhtml
// @include       http://users.jyu.fi/*
// @include       http://appro.mit.jyu.fi/tiea2120/vt/zip/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jshint/2.13.1/jshint.min.js
// @grant    none
// @namespace http://appro.mit.jyu.fi/tools/
// ==/UserScript==
"use strict";

window.addEventListener("load", function() {
    function print_err(file, errors) {

        for(let err of errors) {
            console.error(file, err.id, err.reason, "(", err.line, ",", err.character, ")", " : ", err.evidence);
        }
    
    }
    let scripts = document.getElementsByTagName("script");
    let options = {
        "curly": true,
        "asi": false,
        "esversion": 11,
        "funcscope": true,
        "validthis": true,
        "devel": true,
        "browser": true,
        "strict": "global",
        "nonstandard": true,
        "jquery": true,
        "moz": true,
        "node": true,
        "sub": true,
        "loopfunc": true,
	"varstmt": true
      };

    let predef = {
        "HTMLInspector": true,
        "JSHINT": true,
        "data": true,
        "log": true,
        "ReactDOM": true,
        "React": true,
        "kalevala": true
      };

    for(let script of scripts) {
      // hypätään yli laajennoksien lisäilyt. Esim. Selenium
      if ( script.src.indexOf("moz-extension") == 0 ) {
        continue;
      }
      if ( script.textContent.trim() ) {
//            JSHINT( script.textContent, options, predef);
  //          print_err("", JSHINT.errors);
        }

      if ( script.src && script.getAttribute("src").indexOf("http") != 0 ) {  
        fetch( script.src )
        .then((response) => {
          return response.text();
        })
        .then((data) => {
            JSHINT( data, options, predef );
            print_err( script.getAttribute("src"), JSHINT.errors);
        });
    }

      }
  });
