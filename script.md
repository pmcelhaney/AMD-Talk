#AMD Be Lazy, Not Sloppy

## What 5 things do I wan to cover?
1. Why we need AMD (why IIFEs and namespaces are bad).
2. How AMD works
3. Concatenating
4. Implementations & Adoption
5. Plugins (CSS, text, etc.)


## Three problems we need to solve in 2012.

There are three problems that we as JavaScript need to solve in 2012. 

- The first is **global pollution** [Al Gore]. That's the easy one. JavaScript
  has a global object -- the window object, in the case of browsers -- and by 
  default, that's where variables go. It's shared by all of the scripts on a
  page, so we want to avoid polluting it. We don't want to put variables in
  the global namespace because we can't be sure we're not clobbering variables
  from another script. 
  
  Unfortunately, we have to use some global variables so that scripts can 
  communicate with one another.
  
- The next problem is **our scripts are too big** [mega block]. A script
  should have a single purpose, it should be reusable every time we need to do
  the one specific thing that script is designed to do. It allows us to *snap
  pieces of code together like legos*, using *design patterns* such as
  *strategy*. As stated in the *single responsibility principle*, a script
  should have *one reason to change*. That means a script should be so tiny
  it defines a *single function* or a single configuration object.
  
  Unfortunately, lots of tiny scripts are bad for the browser, because it
  can only download up to eight scripts in parallel. We'll come back to
  that. 
  
  [Slide of a long list of `<script>` tags.]
  
- We need to **resolve dependencies**. If we're going to have a bunch of tiny
  scripts, we manually figure out what scripts have to be included on the
  page, in what order. We need each script to make sure that any other scripts
  it depends on is loaded first. Basically, we need an @import or #include or
  require() statement. We already have it in Node, and it's coming in JS.Next,
  but it's going to be a while before we can use it in the browser.
  
  
 
## Review: What we're doing now

[Slide of two functions with same-named local variable.]

First, a quick review on global variables. If you declare a variable using the
var statement inside of a function, the variable is local to that function.
It's not visible outside of that function, and if you declare a variable with
the same name inside a different function, there won't be any collision. The
two can coexist happily.

[Slide of a function inside of a function.]

And we can put a function inside of a function. A variable in the outer 
function is visible to inner function. 

So if we want to make sure all of our variables in a file are only visible
inside that file, and not attached to the global namespace, we can do this:

[IIFE]

It's just a function that wraps the whole file. It's called right after it's
declared, and its only purpose is to contain variables so they aren't 
polluting the global namespace. Told you that was easy.

We still need to put *something* in the global namespace, so that we can 
share information between files. But now we can be deliberate about it, by
adding to the window object.

[IIFE -- updated to add window.carousel = { ... }]

That's not a perfect solution, because you can't be sure that's not another
script on the page that defines an object named carousel, in which case one
would clobber the other, and you have broken code, and it's not immediately
obvious why. There's also no obvious way to fix it, because if you change
the name of the variable in one script, you're breaking all of the other
code that uses that script.

[IIFE -- updated to add window.CLTJS.carousel = { ... }]
 
So to get around this problem, we have made up namespaces under the host
object. You pick a name that's unique to your company or organization or
framework, and attach all of your objects to it. That way, your scripts
can coexist with other scripts under a different namespace. But it's kind
of clunky, and still doesn't solve the problem of using two different 
versions of the same component on a page.

[IIFE -- updated to put window.CLTJS.carousel in the arguments]

Another good pattern is to pass the global variables in as arguments
to the IIFE, so that a script isn't tightly coupled to the global 
objects it depends on. So, for example, if CLTJS got renamed to MECKJS,
or you want to use ALLY.carousel instead of CLTJS.carousel, that's only
one line of code that needs to change.

It also declares all of those dependencies up front, which is a good
thing. You don't have to go digging through the script to figure that
out. 

Except that there's a list of local names up at the top and a list of
global names at the bottom, and a whole lot of code  in the middle.  

[Primitive version of define]

Here's a simple way to fix that. Basically, take the IIFE pattern and
formalize it into a function with a callback. (Take a few minutes
explaining how this version of the define function works.)

This is very close to the way AMD works.

[More proper define with a partial implementation]

This is an actual AMD module. The difference is it doesn't create 
any global variables. Instead, it returns a value that represents 
a module. That value gets associated with a name, which is the first
argument of define(). 

By convention, the name of the file that defines a module corresponds
to the name of the module itself, similar to Java classes. And if
that's the case, define() can resolve dependencies automatically. If
a dependency hasn't already been defined, it can go grab the script
that defines the module first.

[Leave out the name]

Most AMD loaders are smart enough that if you leave out the name of
the module, it will automatically add a name based on the 
filename. In fact, you *should* leave the name out in practice.

[Leave out the depedencies]

The dependencies are also optional. If a module doesn't have any 
dependencies, you can leave that part out.

[define(name?, dependencies?, definitionFunction)]

Here's the signature for the define function.

Now let's look at a few real world examples of AMD modules (repetition!).

- return a function
- return a string
- return nothing
- load jquery
- load a specific version of jQuery
- load a css file with !css
- load text with !text
- load a plain old javascript file
- load a template (e.g. markdown)


Dependencies are automatically resolved.
R.js automatically resolves concatenates with dependencies.
almond.js is an optimized, minimal loader.

*Use a BMI calculator as the example. Dependencies are height and weight. BMI = scale.weight().inKilograms() / Math.pow( measuringTape.height().inMeters(), 2) 
*Or something more trivial, like adding a rainbow border to every mention of Charlotte JS


# Review the three problems we're trying to solve.


# Who's using AMD?

RequireJS
Curl
Dojo(?)
All the libraries that use / support it.
All the module libraries that are popping up.


# Protips

Use require() to dynamically load a dependency for polyfills, etc.
Use plugins like css! and text! 
Require a plain JS file with js!
Make your own plugins.


<h3>Me</h3>
<ul>
    <li>PatrickMcElhaney.com</li>
    <li>@patrick_mc</li>
    <li>http://github.com/pmcelhaney</li>
    <li>http://ux.stackexchange.com/</li>
</ul>

<h3>AMD</h3>
<ul>
    <!-- I should put avatars here -->
    <li>http://<strong>requirejs.org</strong>/docs/whyamd.html</li>
    <li>James Burke - @jrburke</li> 
    <li>Jonn Hann - @unscriptable (curl.js)</li>
    <li>https://groups.google.com/group/<strong>amd-implement</strong></li>
</ul>


# Ideas 

!atleast plugin (e.g. jQuery at least 1.5.1 -- if 1.7.2 is loaded, don't load another version)

