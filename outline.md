## What 5 things do I wan to cover?
1. Why we need AMD (why IIFEs and namespaces are bad).
2. How AMD works
3. Concatenating
4. Implementations & Adoption
5. Plugins (CSS, text, etc.)

## It's 1999...

Y2K is about to go down, Prince (symbol) is paryting, we're writing sloppy JavaScript

What was so bad?

1. Polluting the global namespace.
2. Downloading too many scripts.
3. Dependencies must be resolved first.

We can fix that with IIFEs. (function () { ... })()
But we have to "export" something. (function () { window.C = ...; })()
And we still have a namespace problem.
We can declare our own namespace (YAHOO, ALLY, jQuery).
But that's just sweeping things under the rug.
We should pass dependencies into the IIFE. (function (a,b) { window.C = ... })(A, B)
We should lazy-load our scripts. (function (a,b) { window.C = a + b })( load(A), load(B) )
We could have a function that formalizes this pattern. protodefine = function (scripts, iife) { /* lazy load each script */ /* call iife with the lazy-loaded arguments */ }
That's essentially what define does. define(['A', 'B'], function(a, b) { return a + b; })
Note that a and b don't have to be objects. They can be numbers, strings, functions...
Show a few examples of simple modules (repetition!).

Dependencies are automatically resolved.
R.js automatically resolves concatenates with dependencies.
almond.js is an optimized, minimal loader.

*Use a BMI calculator as the example. Dependencies are height and weight. BMI = scale.weight().inKilograms() / Math.pow( measuringTape.height().inMeters(), 2) 


# Who's using AMD?

RequireJS
Curl
Dojo(?)
All the libraries that use / support it.


# Protips

Use require() to dynamically load a dependency for polyfills, etc.
Use plugins like css! and text! 
Require a plain JS file with js!
Make your own plugins.


