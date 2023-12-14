import{_ as e,o as a,c as i,e as n}from"./app--pQxNpRM.js";const t={},r=n(`<h1 id="backtracking" tabindex="-1"><a class="header-anchor" href="#backtracking" aria-hidden="true">#</a> Backtracking</h1><h2 id="_1-what-exactly-is-backtracking" tabindex="-1"><a class="header-anchor" href="#_1-what-exactly-is-backtracking" aria-hidden="true">#</a> 1. What exactly is backtracking</h2><p>Backtracking is an optimization that involves abandoning a &quot;path&quot; once it is determined that the path cannot lead to a solution. The idea is similar to binary search trees - if we are looking for a value x, and the root node has a value greater than x, then we know we can ignore the entire right subtree.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>To summarize the difference between exhaustive search and backtracking:

In an exhaustive search, we generate all possibilities and then check them for solutions. In backtracking, we prune paths that cannot lead to a solution, generating far fewer possibilities.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-implementation" tabindex="-1"><a class="header-anchor" href="#_2-implementation" aria-hidden="true">#</a> 2. Implementation:</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// let curr represent the thing you are building
// it could be an array or a combination of variables

function backtrack(curr){
    if (base case) {
        Increment or add to answer
        return;
    }
    
    for (iterate over input) {
        Modify curr
        backtrack(curr)
        Undo modification to curr
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),s=[r];function c(d,l){return a(),i("div",null,s)}const u=e(t,[["render",c],["__file","backtracking.html.vue"]]);export{u as default};
