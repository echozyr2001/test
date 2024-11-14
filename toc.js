// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="setup.html">Setup</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> Foundations of Rust</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="foundations/first-project.html"><strong aria-hidden="true">1.1.</strong> 第一个项目</a></li><li class="chapter-item "><a href="foundations/basic-syntax.html"><strong aria-hidden="true">1.2.</strong> 基础语法</a></li><li class="chapter-item "><a href="foundations/ownership-and-references.html"><strong aria-hidden="true">1.3.</strong> 所有权与引用</a></li><li class="chapter-item "><a href="foundations/advanced-syntax.html"><strong aria-hidden="true">1.4.</strong> 进阶语法</a></li><li class="chapter-item "><a href="foundations/traits-and-generics.html"><strong aria-hidden="true">1.5.</strong> 特征与泛型</a></li><li class="chapter-item "><a href="foundations/closures-and-dynamic-dispatch.html"><strong aria-hidden="true">1.6.</strong> 闭包与动态分发</a></li><li class="chapter-item "><a href="foundations/interior-mutability.html"><strong aria-hidden="true">1.7.</strong> 内部可变性</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> Crate Engineering</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="crate-engineering.html"><strong aria-hidden="true">2.1.</strong> Crate</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Multitasking</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="introduction-to-multitasking.html"><strong aria-hidden="true">3.1.</strong> 多任务处理简介</a></li><li class="chapter-item "><a href="parallel-multitasking.html"><strong aria-hidden="true">3.2.</strong> 并行多任务处理</a></li><li class="chapter-item "><a href="asynchronous-multitasking.html"><strong aria-hidden="true">3.3.</strong> 异步多任务处理</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);