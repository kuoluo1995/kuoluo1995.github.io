/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+c+cpp+css-extras+git+java+javastacktrace+javadoclike+markdown+json+jsonp+json5+liquid+livescript+js-templates+jsdoc+sql+scss+js-extras+sass+javadoc+yaml&plugins=line-numbers+toolbar+previewers+show-language+copy-to-clipboard */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function (g) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i, a = 0, C = {
            manual: g.Prism && g.Prism.manual,
            disableWorkerMessageHandler: g.Prism && g.Prism.disableWorkerMessageHandler,
            util: {
                encode: function (e) {
                    return e instanceof M ? new M(e.type, C.util.encode(e.content), e.alias) : Array.isArray(e) ? e.map(C.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                }, type: function (e) {
                    return Object.prototype.toString.call(e).slice(8, -1)
                }, objId: function (e) {
                    return e.__id || Object.defineProperty(e, "__id", {value: ++a}), e.__id
                }, clone: function n(e, t) {
                    var r, a, i = C.util.type(e);
                    switch (t = t || {}, i) {
                        case"Object":
                            if (a = C.util.objId(e), t[a]) return t[a];
                            for (var o in r = {}, t[a] = r, e) e.hasOwnProperty(o) && (r[o] = n(e[o], t));
                            return r;
                        case"Array":
                            return a = C.util.objId(e), t[a] ? t[a] : (r = [], t[a] = r, e.forEach(function (e, a) {
                                r[a] = n(e, t)
                            }), r);
                        default:
                            return e
                    }
                }
            },
            languages: {
                extend: function (e, a) {
                    var n = C.util.clone(C.languages[e]);
                    for (var t in a) n[t] = a[t];
                    return n
                }, insertBefore: function (n, e, a, t) {
                    var r = (t = t || C.languages)[n], i = {};
                    for (var o in r) if (r.hasOwnProperty(o)) {
                        if (o == e) for (var l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
                        a.hasOwnProperty(o) || (i[o] = r[o])
                    }
                    var s = t[n];
                    return t[n] = i, C.languages.DFS(C.languages, function (e, a) {
                        a === s && e != n && (this[e] = i)
                    }), i
                }, DFS: function e(a, n, t, r) {
                    r = r || {};
                    var i = C.util.objId;
                    for (var o in a) if (a.hasOwnProperty(o)) {
                        n.call(a, o, a[o], t || o);
                        var l = a[o], s = C.util.type(l);
                        "Object" !== s || r[i(l)] ? "Array" !== s || r[i(l)] || (r[i(l)] = !0, e(l, n, o, r)) : (r[i(l)] = !0, e(l, n, null, r))
                    }
                }
            },
            plugins: {},
            highlightAll: function (e, a) {
                C.highlightAllUnder(document, e, a)
            },
            highlightAllUnder: function (e, a, n) {
                var t = {
                    callback: n,
                    selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                };
                C.hooks.run("before-highlightall", t);
                for (var r, i = e.querySelectorAll(t.selector), o = 0; r = i[o++];) C.highlightElement(r, !0 === a, t.callback)
            },
            highlightElement: function (e, a, n) {
                for (var t, r = "none", i = e; i && !c.test(i.className);) i = i.parentNode;
                i && (r = (i.className.match(c) || [, "none"])[1].toLowerCase(), t = C.languages[r]), e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r, e.parentNode && (i = e.parentNode, /pre/i.test(i.nodeName) && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r));
                var o = {element: e, language: r, grammar: t, code: e.textContent}, l = function (e) {
                    o.highlightedCode = e, C.hooks.run("before-insert", o), o.element.innerHTML = o.highlightedCode, C.hooks.run("after-highlight", o), C.hooks.run("complete", o), n && n.call(o.element)
                };
                if (C.hooks.run("before-sanity-check", o), o.code) if (C.hooks.run("before-highlight", o), o.grammar) if (a && g.Worker) {
                    var s = new Worker(C.filename);
                    s.onmessage = function (e) {
                        l(e.data)
                    }, s.postMessage(JSON.stringify({language: o.language, code: o.code, immediateClose: !0}))
                } else l(C.highlight(o.code, o.grammar, o.language)); else l(C.util.encode(o.code)); else C.hooks.run("complete", o)
            },
            highlight: function (e, a, n) {
                var t = {code: e, grammar: a, language: n};
                return C.hooks.run("before-tokenize", t), t.tokens = C.tokenize(t.code, t.grammar), C.hooks.run("after-tokenize", t), M.stringify(C.util.encode(t.tokens), t.language)
            },
            matchGrammar: function (e, a, n, t, r, i, o) {
                for (var l in n) if (n.hasOwnProperty(l) && n[l]) {
                    if (l == o) return;
                    var s = n[l];
                    s = "Array" === C.util.type(s) ? s : [s];
                    for (var g = 0; g < s.length; ++g) {
                        var c = s[g], u = c.inside, h = !!c.lookbehind, f = !!c.greedy, d = 0, m = c.alias;
                        if (f && !c.pattern.global) {
                            var p = c.pattern.toString().match(/[imuy]*$/)[0];
                            c.pattern = RegExp(c.pattern.source, p + "g")
                        }
                        c = c.pattern || c;
                        for (var y = t, v = r; y < a.length; v += a[y].length, ++y) {
                            var k = a[y];
                            if (a.length > e.length) return;
                            if (!(k instanceof M)) {
                                if (f && y != a.length - 1) {
                                    if (c.lastIndex = v, !(x = c.exec(e))) break;
                                    for (var b = x.index + (h ? x[1].length : 0), w = x.index + x[0].length, A = y, P = v, O = a.length; A < O && (P < w || !a[A].type && !a[A - 1].greedy); ++A) (P += a[A].length) <= b && (++y, v = P);
                                    if (a[y] instanceof M) continue;
                                    N = A - y, k = e.slice(v, P), x.index -= v
                                } else {
                                    c.lastIndex = 0;
                                    var x = c.exec(k), N = 1
                                }
                                if (x) {
                                    h && (d = x[1] ? x[1].length : 0);
                                    w = (b = x.index + d) + (x = x[0].slice(d)).length;
                                    var j = k.slice(0, b), S = k.slice(w), E = [y, N];
                                    j && (++y, v += j.length, E.push(j));
                                    var _ = new M(l, u ? C.tokenize(x, u) : x, m, x, f);
                                    if (E.push(_), S && E.push(S), Array.prototype.splice.apply(a, E), 1 != N && C.matchGrammar(e, a, n, y, v, !0, l), i) break
                                } else if (i) break
                            }
                        }
                    }
                }
            },
            tokenize: function (e, a) {
                var n = [e], t = a.rest;
                if (t) {
                    for (var r in t) a[r] = t[r];
                    delete a.rest
                }
                return C.matchGrammar(e, n, a, 0, 0, !1), n
            },
            hooks: {
                all: {}, add: function (e, a) {
                    var n = C.hooks.all;
                    n[e] = n[e] || [], n[e].push(a)
                }, run: function (e, a) {
                    var n = C.hooks.all[e];
                    if (n && n.length) for (var t, r = 0; t = n[r++];) t(a)
                }
            },
            Token: M
        };

        function M(e, a, n, t, r) {
            this.type = e, this.content = a, this.alias = n, this.length = 0 | (t || "").length, this.greedy = !!r
        }

        if (g.Prism = C, M.stringify = function (e, a) {
            if ("string" == typeof e) return e;
            if (Array.isArray(e)) return e.map(function (e) {
                return M.stringify(e, a)
            }).join("");
            var n = {
                type: e.type,
                content: M.stringify(e.content, a),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: a
            };
            if (e.alias) {
                var t = Array.isArray(e.alias) ? e.alias : [e.alias];
                Array.prototype.push.apply(n.classes, t)
            }
            C.hooks.run("wrap", n);
            var r = Object.keys(n.attributes).map(function (e) {
                return e + '="' + (n.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            }).join(" ");
            return "<" + n.tag + ' class="' + n.classes.join(" ") + '"' + (r ? " " + r : "") + ">" + n.content + "</" + n.tag + ">"
        }, !g.document) return g.addEventListener && (C.disableWorkerMessageHandler || g.addEventListener("message", function (e) {
            var a = JSON.parse(e.data), n = a.language, t = a.code, r = a.immediateClose;
            g.postMessage(C.highlight(t, C.languages[n], n)), r && g.close()
        }, !1)), C;
        var e = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return e && (C.filename = e.src, C.manual || e.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(C.highlightAll) : window.setTimeout(C.highlightAll, 16) : document.addEventListener("DOMContentLoaded", C.highlightAll))), C
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: !0,
        inside: {
            tag: {pattern: /^<\/?[^\s>\/]+/i, inside: {punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/}},
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: {punctuation: [/^=/, {pattern: /^(\s*)["']|["']$/, lookbehind: !0}]}
            },
            punctuation: /\/?>/,
            "attr-name": {pattern: /[^\s>\/]+/, inside: {namespace: /^[^\s>\/:]+:/}}
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
        var s = {};
        s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var n = {"included-cdata": {pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s}};
        n["language-" + e] = {pattern: /[\s\S]+/, inside: Prism.languages[e]};
        var i = {};
        i[a] = {
            pattern: RegExp("(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(/__/g, a), "i"),
            lookbehind: !0,
            greedy: !0,
            inside: n
        }, Prism.languages.insertBefore("markup", "cdata", i)
    }
}), Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
!function (s) {
    var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/, inside: {rule: /@[\w-]+/}},
        url: {
            pattern: RegExp("url\\((?:" + t.source + "|[^\n\r()]*)\\)", "i"),
            inside: {function: /^url/i, punctuation: /^\(|\)$/}
        },
        selector: RegExp("[^{}\\s](?:[^{};\"']|" + t.source + ")*?(?=\\s*\\{)"),
        string: {pattern: t, greedy: !0},
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/
    }, s.languages.css.atrule.inside.rest = s.languages.css;
    var e = s.languages.markup;
    e && (e.tag.addInlined("style", "css"), s.languages.insertBefore("inside", "attr-value", {
        "style-attr": {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
                "attr-name": {pattern: /^\s*style/i, inside: e.tag.inside},
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": {pattern: /.+/i, inside: s.languages.css}
            },
            alias: "language-css"
        }
    }, e.tag))
}(Prism);
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0}],
    string: {pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0},
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: !0,
        inside: {punctuation: /[.\\]/}
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function"
    },
    parameter: [{
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
    }, {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: !0,
        inside: {
            "template-punctuation": {pattern: /^`|`$/, alias: "string"},
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                    "interpolation-punctuation": {pattern: /^\${|}$/, alias: "punctuation"},
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend("clike", {
    "class-name": {
        pattern: /(\b(?:enum|struct)\s+)\w+/,
        lookbehind: !0
    },
    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
    number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
}), Prism.languages.insertBefore("c", "string", {
    macro: {
        pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        alias: "property",
        inside: {
            string: {pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/, lookbehind: !0},
            directive: {
                pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
}), delete Prism.languages.c.boolean;
Prism.languages.cpp = Prism.languages.extend("c", {
    "class-name": {
        pattern: /(\b(?:class|enum|struct)\s+)\w+/,
        lookbehind: !0
    },
    keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    number: {
        pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
        greedy: !0
    },
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:true|false)\b/
}), Prism.languages.insertBefore("cpp", "string", {
    "raw-string": {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: "string",
        greedy: !0
    }
});
Prism.languages.css.selector = {
    pattern: Prism.languages.css.selector,
    inside: {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+/,
        class: /\.[-:.\w]+/,
        id: /#[-:.\w]+/,
        attribute: {
            pattern: /\[(?:[^[\]"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*\]/,
            greedy: !0,
            inside: {
                punctuation: /^\[|\]$/,
                "case-sensitivity": {pattern: /(\s)[si]$/i, lookbehind: !0, alias: "keyword"},
                namespace: {pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/, lookbehind: !0, inside: {punctuation: /\|$/}},
                attribute: {pattern: /^(\s*)[-\w\xA0-\uFFFF]+/, lookbehind: !0},
                value: [/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, {
                    pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/,
                    lookbehind: !0
                }],
                operator: /[|~*^$]?=/
            }
        },
        "n-th": [{
            pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
            lookbehind: !0,
            inside: {number: /[\dn]+/, operator: /[+-]/}
        }, {pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0}],
        punctuation: /[()]/
    }
}, Prism.languages.insertBefore("css", "property", {
    variable: {
        pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
        lookbehind: !0
    }
}), Prism.languages.insertBefore("css", "function", {
    operator: {pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0},
    hexcode: /#[\da-f]{3,8}/i,
    entity: /\\[\da-f]{1,8}/i,
    unit: {pattern: /(\d)(?:%|[a-z]+)/, lookbehind: !0},
    number: /-?[\d.]+/
});
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: {pattern: /^.*\$ git .*$/m, inside: {parameter: /\s--?\w+/m}},
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m
};
!function (e) {
    var t = /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|var|null|exports|module|open|opens|provides|requires|to|transitive|uses|with)\b/,
        a = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
    e.languages.java = e.languages.extend("clike", {
        "class-name": [a, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
        keyword: t,
        function: [e.languages.clike.function, {pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0}],
        number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
        operator: {pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0}
    }), e.languages.insertBefore("java", "class-name", {
        annotation: {
            alias: "punctuation",
            pattern: /(^|[^.])@\w+/,
            lookbehind: !0
        },
        namespace: {
            pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(\.[a-z]\w*)+/,
            lookbehind: !0,
            inside: {punctuation: /\./}
        },
        generics: {
            pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
            inside: {"class-name": a, keyword: t, punctuation: /[<>(),.:]/, operator: /[?&|]/}
        }
    })
}(Prism);
Prism.languages.javastacktrace = {
    summary: {
        pattern: /^[\t ]*(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+(?:\:.*)?$/m,
        inside: {
            keyword: {pattern: /^(\s*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m, lookbehind: !0},
            string: {pattern: /^(\s*)"[^"]*"/, lookbehind: !0},
            exceptions: {
                pattern: /^(:?\s*)[\w$.]+(?=:|$)/,
                lookbehind: !0,
                inside: {"class-name": /[\w$]+(?=$|:)/, namespace: /[a-z]\w*/, punctuation: /[.:]/}
            },
            message: {pattern: /(:\s*)\S.*/, lookbehind: !0, alias: "string"},
            punctuation: /[:]/
        }
    },
    "stack-frame": {
        pattern: /^[\t ]*at [\w$.]+(?:<init>)?\([^()]*\)/m,
        inside: {
            keyword: {pattern: /^(\s*)at/, lookbehind: !0},
            source: [{
                pattern: /(\()\w+.\w+:\d+(?=\))/,
                lookbehind: !0,
                inside: {file: /^\w+\.\w+/, punctuation: /:/, "line-number": {pattern: /\d+/, alias: "number"}}
            }, {pattern: /(\()[^()]*(?=\))/, lookbehind: !0, inside: {keyword: /^(?:Unknown Source|Native Method)$/}}],
            "class-name": /[\w$]+(?=\.(?:<init>|[\w$]+)\()/,
            function: /(?:<init>|[\w$]+)(?=\()/,
            namespace: /[a-z]\w*/,
            punctuation: /[.()]/
        }
    },
    more: {
        pattern: /^[\t ]*\.{3} \d+ [a-z]+(?: [a-z]+)*/m,
        inside: {punctuation: /\.{3}/, number: /\d+/, keyword: /\b[a-z]+(?: [a-z]+)*\b/}
    }
};
!function (p) {
    var a = p.languages.javadoclike = {
        parameter: {
            pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
            lookbehind: !0
        }, keyword: {pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m, lookbehind: !0}, punctuation: /[{}]/
    };
    Object.defineProperty(a, "addSupport", {
        value: function (a, e) {
            "string" == typeof a && (a = [a]), a.forEach(function (a) {
                !function (a, e) {
                    var n = "doc-comment", t = p.languages[a];
                    if (t) {
                        var r = t[n];
                        if (!r) {
                            var i = {
                                "doc-comment": {
                                    pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                                    alias: "comment"
                                }
                            };
                            r = (t = p.languages.insertBefore(a, "comment", i))[n]
                        }
                        if (r instanceof RegExp && (r = t[n] = {pattern: r}), Array.isArray(r)) for (var o = 0, s = r.length; o < s; o++) r[o] instanceof RegExp && (r[o] = {pattern: r[o]}), e(r[o]); else e(r)
                    }
                }(a, function (a) {
                    a.inside || (a.inside = {}), a.inside.rest = e
                })
            })
        }
    }), a.addSupport(["java", "javascript", "php"], a)
}(Prism);
!function (d) {
    function n(n, e) {
        return n = n.replace(/<inner>/g, "(?:\\\\.|[^\\\\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))"), e && (n = n + "|" + n.replace(/_/g, "\\*")), RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n + ")")
    }

    var e = "(?:\\\\.|``.+?``|`[^`\r\\n]+`|[^\\\\|\r\\n`])+",
        t = "\\|?__(?:\\|__)+\\|?(?:(?:\r?\n|\r)|$)".replace(/__/g, e),
        a = "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\r?\n|\r)";
    d.languages.markdown = d.languages.extend("markup", {}), d.languages.insertBefore("markdown", "prolog", {
        blockquote: {pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation"},
        table: {
            pattern: RegExp("^" + t + a + "(?:" + t + ")*", "m"),
            inside: {
                "table-data-rows": {
                    pattern: RegExp("^(" + t + a + ")(?:" + t + ")*$"),
                    lookbehind: !0,
                    inside: {"table-data": {pattern: RegExp(e), inside: d.languages.markdown}, punctuation: /\|/}
                },
                "table-line": {
                    pattern: RegExp("^(" + t + ")" + a + "$"),
                    lookbehind: !0,
                    inside: {punctuation: /\||:?-{3,}:?/}
                },
                "table-header-row": {
                    pattern: RegExp("^" + t + "$"),
                    inside: {
                        "table-header": {pattern: RegExp(e), alias: "important", inside: d.languages.markdown},
                        punctuation: /\|/
                    }
                }
            }
        },
        code: [{
            pattern: /(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,
            lookbehind: !0,
            alias: "keyword"
        }, {pattern: /``.+?``|`[^`\r\n]+`/, alias: "keyword"}, {
            pattern: /^```[\s\S]*?^```$/m,
            greedy: !0,
            inside: {
                "code-block": {pattern: /^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m, lookbehind: !0},
                "code-language": {pattern: /^(```).+/, lookbehind: !0},
                punctuation: /```/
            }
        }],
        title: [{
            pattern: /\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: {punctuation: /==+$|--+$/}
        }, {pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: "important", inside: {punctuation: /^#+|#+$/}}],
        hr: {pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation"},
        list: {pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation"},
        "url-reference": {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
                variable: {pattern: /^(!?\[)[^\]]+/, lookbehind: !0},
                string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                punctuation: /^[\[\]!:]|[<>]/
            },
            alias: "url"
        },
        bold: {
            pattern: n("__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__", !0),
            lookbehind: !0,
            greedy: !0,
            inside: {content: {pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {}}, punctuation: /\*\*|__/}
        },
        italic: {
            pattern: n("_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_", !0),
            lookbehind: !0,
            greedy: !0,
            inside: {content: {pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {}}, punctuation: /[*_]/}
        },
        strike: {
            pattern: n("(~~?)(?:(?!~)<inner>)+?\\2", !1),
            lookbehind: !0,
            greedy: !0,
            inside: {content: {pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {}}, punctuation: /~~?/}
        },
        url: {
            pattern: n('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])', !1),
            lookbehind: !0,
            greedy: !0,
            inside: {
                variable: {pattern: /(\[)[^\]]+(?=\]$)/, lookbehind: !0},
                content: {pattern: /(^!?\[)[^\]]+(?=\])/, lookbehind: !0, inside: {}},
                string: {pattern: /"(?:\\.|[^"\\])*"(?=\)$)/}
            }
        }
    }), ["url", "bold", "italic", "strike"].forEach(function (e) {
        ["url", "bold", "italic", "strike"].forEach(function (n) {
            e !== n && (d.languages.markdown[e].inside.content.inside[n] = d.languages.markdown[n])
        })
    }), d.hooks.add("after-tokenize", function (n) {
        "markdown" !== n.language && "md" !== n.language || !function n(e) {
            if (e && "string" != typeof e) for (var t = 0, a = e.length; t < a; t++) {
                var i = e[t];
                if ("code" === i.type) {
                    var r = i.content[1], o = i.content[3];
                    if (r && o && "code-language" === r.type && "code-block" === o.type && "string" == typeof r.content) {
                        var l = "language-" + r.content.trim().split(/\s+/)[0].toLowerCase();
                        o.alias ? "string" == typeof o.alias ? o.alias = [o.alias, l] : o.alias.push(l) : o.alias = [l]
                    }
                } else n(i.content)
            }
        }(n.tokens)
    }), d.hooks.add("wrap", function (n) {
        if ("code-block" === n.type) {
            for (var e = "", t = 0, a = n.classes.length; t < a; t++) {
                var i = n.classes[t], r = /language-(.+)/.exec(i);
                if (r) {
                    e = r[1];
                    break
                }
            }
            var o = d.languages[e];
            if (o) {
                var l = n.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&");
                n.content = d.highlight(l, o, e)
            } else if (e && "none" !== e && d.plugins.autoloader) {
                var s = "md-" + (new Date).valueOf() + "-" + Math.floor(1e16 * Math.random());
                n.attributes.id = s, d.plugins.autoloader.loadLanguages(e, function () {
                    var n = document.getElementById(s);
                    n && (n.innerHTML = d.highlight(n.textContent, d.languages[e], e))
                })
            }
        }
    }), d.languages.md = d.languages.markdown
}(Prism);
Prism.languages.json = {
    property: {pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0},
    string: {pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0},
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: {pattern: /\bnull\b/, alias: "keyword"}
};
Prism.languages.jsonp = Prism.languages.extend("json", {punctuation: /[{}[\]();,.]/}), Prism.languages.insertBefore("jsonp", "punctuation", {function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/});
!function (n) {
    var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
    n.languages.json5 = n.languages.extend("json", {
        property: [{
            pattern: RegExp(e.source + "(?=\\s*:)"),
            greedy: !0
        }, {pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*:)/, alias: "unquoted"}],
        string: {pattern: e, greedy: !0},
        number: /[+-]?(?:NaN|Infinity|0x[a-fA-F\d]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/
    })
}(Prism);
Prism.languages.liquid = {
    keyword: /\b(?:comment|endcomment|if|elsif|else|endif|unless|endunless|for|endfor|case|endcase|when|in|break|assign|continue|limit|offset|range|reversed|raw|endraw|capture|endcapture|tablerow|endtablerow)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
    operator: {
        pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
        lookbehind: !0
    },
    function: {
        pattern: /(^|[\s;|&])(?:append|prepend|capitalize|cycle|cols|increment|decrement|abs|at_least|at_most|ceil|compact|concat|date|default|divided_by|downcase|escape|escape_once|first|floor|join|last|lstrip|map|minus|modulo|newline_to_br|plus|remove|remove_first|replace|replace_first|reverse|round|rstrip|size|slice|sort|sort_natural|split|strip|strip_html|strip_newlines|times|truncate|truncatewords|uniq|upcase|url_decode|url_encode|include|paginate)(?=$|[\s;|&])/,
        lookbehind: !0
    }
};
Prism.languages.livescript = {
    comment: [{pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0}, {pattern: /(^|[^\\])#.*/, lookbehind: !0}],
    "interpolated-string": {
        pattern: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/,
        lookbehind: !0,
        greedy: !0,
        inside: {
            variable: {pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m, lookbehind: !0},
            interpolation: {
                pattern: /(^|[^\\])#\{[^}]+\}/m,
                lookbehind: !0,
                inside: {"interpolation-punctuation": {pattern: /^#\{|\}$/, alias: "variable"}}
            },
            string: /[\s\S]+/
        }
    },
    string: [{pattern: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0}, {
        pattern: /<\[[\s\S]*?\]>/,
        greedy: !0
    }, /\\[^\s,;\])}]+/],
    regex: [{
        pattern: /\/\/(\[.+?]|\\.|(?!\/\/)[^\\])+\/\/[gimyu]{0,5}/,
        greedy: !0,
        inside: {comment: {pattern: /(^|[^\\])#.*/, lookbehind: !0}}
    }, {pattern: /\/(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}/, greedy: !0}],
    keyword: {
        pattern: /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m,
        lookbehind: !0
    },
    "keyword-operator": {
        pattern: /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?:nt| not)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m,
        lookbehind: !0,
        alias: "operator"
    },
    boolean: {pattern: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m, lookbehind: !0},
    argument: {pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m, lookbehind: !0, alias: "variable"},
    number: /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
    identifier: /[a-z_](?:-?[a-z]|[\d_])*/i,
    operator: [{
        pattern: /( )\.(?= )/,
        lookbehind: !0
    }, /\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?!?|[|=?])?|>[>=?]?|-(?:->?|>)?|\+\+?|@@?|%%?|\*\*?|!(?:~?=|--?>|~?~>)?|~(?:~?>|=)?|==?|\^\^?|[\/?]/],
    punctuation: /[(){}\[\]|.,:;`]/
}, Prism.languages.livescript["interpolated-string"].inside.interpolation.inside.rest = Prism.languages.livescript;
!function (u) {
    var e = u.languages.javascript["template-string"], n = e.pattern.source, a = e.inside.interpolation,
        i = a.inside["interpolation-punctuation"], r = a.pattern.source;

    function t(e, t) {
        if (u.languages[e]) return {
            pattern: RegExp("((?:" + t + ")\\s*)" + n),
            lookbehind: !0,
            greedy: !0,
            inside: {
                "template-punctuation": {pattern: /^`|`$/, alias: "string"},
                "embedded-code": {pattern: /[\s\S]+/, alias: e}
            }
        }
    }

    function o(e, t, n) {
        var r = {code: e, grammar: t, language: n};
        return u.hooks.run("before-tokenize", r), r.tokens = u.tokenize(r.code, r.grammar), u.hooks.run("after-tokenize", r), r.tokens
    }

    function d(e) {
        var t = {};
        t["interpolation-punctuation"] = i;
        var n = u.tokenize(e, t);
        if (3 === n.length) {
            var r = [1, 1];
            r.push.apply(r, o(n[1], u.languages.javascript, "javascript")), n.splice.apply(n, r)
        }
        return new u.Token("interpolation", n, a.alias, e)
    }

    function c(a, e, i) {
        var t = u.tokenize(a, {interpolation: {pattern: RegExp(r), lookbehind: !0}}), f = 0, y = {},
            n = o(t.map(function (e) {
                if ("string" == typeof e) return e;
                for (var t, n = e.content; -1 !== a.indexOf((r = f++, t = "___" + i.toUpperCase() + "_" + r + "___"));) ;
                return y[t] = n, t;
                var r
            }).join(""), e, i), v = Object.keys(y);
        return f = 0, function e(t) {
            for (var n = 0; n < t.length; n++) {
                if (f >= v.length) return;
                var r = t[n];
                if ("string" == typeof r || "string" == typeof r.content) {
                    var a = v[f], i = "string" == typeof r ? r : r.content, o = i.indexOf(a);
                    if (-1 !== o) {
                        ++f;
                        var s = i.substring(0, o), p = d(y[a]), l = i.substring(o + a.length), g = [];
                        if (s && g.push(s), g.push(p), l) {
                            var u = [l];
                            e(u), g.push.apply(g, u)
                        }
                        "string" == typeof r ? (t.splice.apply(t, [n, 1].concat(g)), n += g.length - 1) : r.content = g
                    }
                } else {
                    var c = r.content;
                    Array.isArray(c) ? e(c) : e([c])
                }
            }
        }(n), new u.Token(i, n, "language-" + i, a)
    }

    u.languages.javascript["template-string"] = [t("css", "\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)"), t("html", "\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?="), t("svg", "\\bsvg"), t("markdown", "\\b(?:md|markdown)"), t("graphql", "\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)"), e].filter(Boolean);
    var s = {javascript: !0, js: !0, typescript: !0, ts: !0, jsx: !0, tsx: !0};

    function f(e) {
        return "string" == typeof e ? e : Array.isArray(e) ? e.map(f).join("") : f(e.content)
    }

    u.hooks.add("after-tokenize", function (e) {
        e.language in s && !function e(t) {
            for (var n = 0, r = t.length; n < r; n++) {
                var a = t[n];
                if ("string" != typeof a) {
                    var i = a.content;
                    if (Array.isArray(i)) if ("template-string" === a.type) {
                        var o = i[1];
                        if (3 === i.length && "string" != typeof o && "embedded-code" === o.type) {
                            var s = f(o), p = o.alias, l = Array.isArray(p) ? p[0] : p, g = u.languages[l];
                            if (!g) continue;
                            i[1] = c(s, g, l)
                        }
                    } else e(i); else "string" != typeof i && e([i])
                }
            }
        }(e.tokens)
    })
}(Prism);
!function (a) {
    var e = a.languages.javascript, n = "{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}",
        s = "(@(?:param|arg|argument|property)\\s+(?:" + n + "\\s+)?)";
    a.languages.jsdoc = a.languages.extend("javadoclike", {
        parameter: {
            pattern: RegExp(s + "[$\\w\\xA0-\\uFFFF.]+(?=\\s|$)"),
            lookbehind: !0,
            inside: {punctuation: /\./}
        }
    }), a.languages.insertBefore("jsdoc", "keyword", {
        "optional-parameter": {
            pattern: RegExp(s + "\\[[$\\w\\xA0-\\uFFFF.]+(?:=[^[\\]]+)?\\](?=\\s|$)"),
            lookbehind: !0,
            inside: {
                parameter: {pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/, lookbehind: !0, inside: {punctuation: /\./}},
                code: {pattern: /(=)[\s\S]*(?=\]$)/, lookbehind: !0, inside: e, alias: "language-javascript"},
                punctuation: /[=[\]]/
            }
        },
        "class-name": [{
            pattern: RegExp("(@[a-z]+\\s+)" + n),
            lookbehind: !0,
            inside: {punctuation: /[.,:?=<>|{}()[\]]/}
        }, {
            pattern: /(@(?:augments|extends|class|interface|memberof!?|this)\s+)[A-Z]\w*(?:\.[A-Z]\w*)*/,
            lookbehind: !0,
            inside: {punctuation: /\./}
        }],
        example: {
            pattern: /(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
            lookbehind: !0,
            inside: {code: {pattern: /^(\s*(?:\*\s*)?).+$/m, lookbehind: !0, inside: e, alias: "language-javascript"}}
        }
    }), a.languages.javadoclike.addSupport("javascript", a.languages.jsdoc)
}(Prism);
Prism.languages.sql = {
    comment: {pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0},
    variable: [{pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0}, /@[\w.$]+/],
    string: {pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0},
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};
Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0
    },
    atrule: {pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/, inside: {rule: /@[\w-]+/}},
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
        pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
        inside: {parent: {pattern: /&/, alias: "important"}, placeholder: /%[-\w]+/, variable: /\$[-\w]+|#\{\$[-\w]+\}/}
    },
    property: {pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/, inside: {variable: /\$[-\w]+|#\{\$[-\w]+\}/}}
}), Prism.languages.insertBefore("scss", "atrule", {
    keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
        pattern: /( +)(?:from|through)(?= )/,
        lookbehind: !0
    }]
}), Prism.languages.insertBefore("scss", "important", {variable: /\$[-\w]+|#\{\$[-\w]+\}/}), Prism.languages.insertBefore("scss", "function", {
    placeholder: {
        pattern: /%[-\w]+/,
        alias: "selector"
    },
    statement: {pattern: /\B!(?:default|optional)\b/i, alias: "keyword"},
    boolean: /\b(?:true|false)\b/,
    null: {pattern: /\bnull\b/, alias: "keyword"},
    operator: {pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/, lookbehind: !0}
}), Prism.languages.scss.atrule.inside.rest = Prism.languages.scss;
!function (a) {
    a.languages.insertBefore("javascript", "function-variable", {
        "method-variable": {
            pattern: RegExp("(\\.\\s*)" + a.languages.javascript["function-variable"].pattern.source),
            lookbehind: !0,
            alias: ["function-variable", "method", "function", "property-access"]
        }
    }), a.languages.insertBefore("javascript", "function", {
        method: {
            pattern: RegExp("(\\.\\s*)" + a.languages.javascript.function.source),
            lookbehind: !0,
            alias: ["function", "property-access"]
        }
    }), a.languages.insertBefore("javascript", "constant", {
        "known-class-name": [{
            pattern: /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
            alias: "class-name"
        }, {pattern: /\b(?:[A-Z]\w*)Error\b/, alias: "class-name"}]
    }), a.languages.javascript.keyword.unshift({
        pattern: /\b(?:as|default|export|from|import)\b/,
        alias: "module"
    }, {pattern: /\bnull\b/, alias: ["null", "nil"]}, {
        pattern: /\bundefined\b/,
        alias: "nil"
    }), a.languages.insertBefore("javascript", "operator", {
        spread: {pattern: /\.{3}/, alias: "operator"},
        arrow: {pattern: /=>/, alias: "operator"}
    }), a.languages.insertBefore("javascript", "punctuation", {
        "property-access": {
            pattern: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
            lookbehind: !0
        },
        "maybe-class-name": {pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/, lookbehind: !0},
        dom: {
            pattern: /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/,
            alias: "variable"
        },
        console: {pattern: /\bconsole(?=\s*\.)/, alias: "class-name"}
    });
    for (var e = ["function", "function-variable", "method", "method-variable", "property-access"], t = 0; t < e.length; t++) {
        var n = e[t], r = a.languages.javascript[n];
        "RegExp" === a.util.type(r) && (r = a.languages.javascript[n] = {pattern: r});
        var s = r.inside || {};
        (r.inside = s)["maybe-class-name"] = /^[A-Z][\s\S]*/
    }
}(Prism);
!function (e) {
    e.languages.sass = e.languages.extend("css", {
        comment: {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
            lookbehind: !0
        }
    }), e.languages.insertBefore("sass", "atrule", {
        "atrule-line": {
            pattern: /^(?:[ \t]*)[@+=].+/m,
            inside: {atrule: /(?:@[\w-]+|[+=])/m}
        }
    }), delete e.languages.sass.atrule;
    var t = /\$[-\w]+|#\{\$[-\w]+\}/,
        a = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {pattern: /(\s+)-(?=\s)/, lookbehind: !0}];
    e.languages.insertBefore("sass", "property", {
        "variable-line": {
            pattern: /^[ \t]*\$.+/m,
            inside: {punctuation: /:/, variable: t, operator: a}
        },
        "property-line": {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
            inside: {
                property: [/[^:\s]+(?=\s*:)/, {pattern: /(:)[^:\s]+/, lookbehind: !0}],
                punctuation: /:/,
                variable: t,
                operator: a,
                important: e.languages.sass.important
            }
        }
    }), delete e.languages.sass.property, delete e.languages.sass.important, e.languages.insertBefore("sass", "punctuation", {
        selector: {
            pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
            lookbehind: !0
        }
    })
}(Prism);
!function (a) {
    var e = {
        code: {
            pattern: /(^(\s*(?:\*\s*)*)).*[^*\s].+$/m,
            lookbehind: !0,
            inside: a.languages.java,
            alias: "language-java"
        }
    };
    a.languages.javadoc = a.languages.extend("javadoclike", {}), a.languages.insertBefore("javadoc", "keyword", {
        "class-name": [{
            pattern: /(@(?:exception|throws|see|link|linkplain|value)\s+(?:[a-z\d]+\.)*)[A-Z](?:\w*[a-z]\w*)?(?:\.[A-Z](?:\w*[a-z]\w*)?)*/,
            lookbehind: !0,
            inside: {punctuation: /\./}
        }, {pattern: /(@param\s+)<[A-Z]\w*>/, lookbehind: !0, inside: {punctuation: /[.<>]/}}],
        namespace: {
            pattern: /(@(?:exception|throws|see|link|linkplain)\s+)(?:[a-z\d]+\.)+/,
            lookbehind: !0,
            inside: {punctuation: /\./}
        },
        "code-section": [{
            pattern: /(\{@code\s+)(?:[^{}]|\{[^{}]*\})+?(?=\s*\})/,
            lookbehind: !0,
            inside: e
        }, {pattern: /(<(code|tt)>\s*)[\s\S]+?(?=\s*<\/\2>)/, lookbehind: !0, inside: e}],
        tag: a.languages.markup.tag
    }), a.languages.javadoclike.addSupport("java", a.languages.javadoc)
}(Prism);
Prism.languages.yaml = {
    scalar: {
        pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
        lookbehind: !0,
        alias: "string"
    },
    comment: /#.*/,
    key: {
        pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
        lookbehind: !0,
        alias: "atrule"
    },
    directive: {pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important"},
    datetime: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
        lookbehind: !0,
        alias: "number"
    },
    boolean: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
        alias: "important"
    },
    null: {pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im, lookbehind: !0, alias: "important"},
    string: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}|\s*#))/m,
        lookbehind: !0,
        greedy: !0
    },
    number: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0
    },
    tag: /![^\s]+/,
    important: /[&*][\w]+/,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
}, Prism.languages.yml = Prism.languages.yaml;
!function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var l = "line-numbers", c = /\n(?!$)/g, m = function (e) {
            var t = a(e)["white-space"];
            if ("pre-wrap" === t || "pre-line" === t) {
                var n = e.querySelector("code"), r = e.querySelector(".line-numbers-rows"),
                    s = e.querySelector(".line-numbers-sizer"), i = n.textContent.split(c);
                s || ((s = document.createElement("span")).className = "line-numbers-sizer", n.appendChild(s)), s.style.display = "block", i.forEach(function (e, t) {
                    s.textContent = e || "\n";
                    var n = s.getBoundingClientRect().height;
                    r.children[t].style.height = n + "px"
                }), s.textContent = "", s.style.display = "none"
            }
        }, a = function (e) {
            return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
        };
        window.addEventListener("resize", function () {
            Array.prototype.forEach.call(document.querySelectorAll("pre." + l), m)
        }), Prism.hooks.add("complete", function (e) {
            if (e.code) {
                var t = e.element, n = t.parentNode;
                if (n && /pre/i.test(n.nodeName) && !t.querySelector(".line-numbers-rows")) {
                    for (var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t; i; i = i.parentNode) if (s.test(i.className)) {
                        r = !0;
                        break
                    }
                    if (r) {
                        t.className = t.className.replace(s, " "), s.test(n.className) || (n.className += " line-numbers");
                        var l, a = e.code.match(c), o = a ? a.length + 1 : 1,
                            u = new Array(o + 1).join("<span></span>");
                        (l = document.createElement("span")).setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = u, n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element.appendChild(l), m(n), Prism.hooks.run("line-numbers", e)
                    }
                }
            }
        }), Prism.hooks.add("line-numbers", function (e) {
            e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
        }), Prism.plugins.lineNumbers = {
            getLine: function (e, t) {
                if ("PRE" === e.tagName && e.classList.contains(l)) {
                    var n = e.querySelector(".line-numbers-rows"), r = parseInt(e.getAttribute("data-start"), 10) || 1,
                        s = r + (n.children.length - 1);
                    t < r && (t = r), s < t && (t = s);
                    var i = t - r;
                    return n.children[i]
                }
            }
        }
    }
}();
!function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var r = [], i = {}, a = function () {
        };
        Prism.plugins.toolbar = {};
        var t = Prism.plugins.toolbar.registerButton = function (t, a) {
            var e;
            e = "function" == typeof a ? a : function (t) {
                var e;
                return "function" == typeof a.onClick ? ((e = document.createElement("button")).type = "button", e.addEventListener("click", function () {
                    a.onClick.call(this, t)
                })) : "string" == typeof a.url ? (e = document.createElement("a")).href = a.url : e = document.createElement("span"), a.className && e.classList.add(a.className), e.textContent = a.text, e
            }, t in i ? console.warn('There is a button with the key "' + t + '" registered already.') : r.push(i[t] = e)
        }, e = Prism.plugins.toolbar.hook = function (n) {
            var t = n.element.parentNode;
            if (t && /pre/i.test(t.nodeName) && !t.parentNode.classList.contains("code-toolbar")) {
                var e = document.createElement("div");
                e.classList.add("code-toolbar"), t.parentNode.insertBefore(e, t), e.appendChild(t);
                var o = document.createElement("div");
                o.classList.add("toolbar"), document.body.hasAttribute("data-toolbar-order") && (r = document.body.getAttribute("data-toolbar-order").split(",").map(function (t) {
                    return i[t] || a
                })), r.forEach(function (t) {
                    var e = t(n);
                    if (e) {
                        var a = document.createElement("div");
                        a.classList.add("toolbar-item"), a.appendChild(e), o.appendChild(a)
                    }
                }), e.appendChild(o)
            }
        };
        t("label", function (t) {
            var e = t.element.parentNode;
            if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
                var a, n, o = e.getAttribute("data-label");
                try {
                    n = document.querySelector("template#" + o)
                } catch (t) {
                }
                return n ? a = n.content : (e.hasAttribute("data-url") ? (a = document.createElement("a")).href = e.getAttribute("data-url") : a = document.createElement("span"), a.textContent = o), a
            }
        }), Prism.hooks.add("complete", e)
    }
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && self.document && Function.prototype.bind) {
        var r, s, o = {
                gradient: {
                    create: (r = {}, s = function (e) {
                        if (r[e]) return r[e];
                        var s = e.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/), i = s && s[1],
                            t = s && s[2],
                            a = e.replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g, "").split(/\s*,\s*/);
                        return 0 <= t.indexOf("linear") ? r[e] = function (e, s, i) {
                            var t = "180deg";
                            return /^(?:-?\d*\.?\d+(?:deg|rad)|to\b|top|right|bottom|left)/.test(i[0]) && (t = i.shift()).indexOf("to ") < 0 && (0 <= t.indexOf("top") ? t = 0 <= t.indexOf("left") ? "to bottom right" : 0 <= t.indexOf("right") ? "to bottom left" : "to bottom" : 0 <= t.indexOf("bottom") ? t = 0 <= t.indexOf("left") ? "to top right" : 0 <= t.indexOf("right") ? "to top left" : "to top" : 0 <= t.indexOf("left") ? t = "to right" : 0 <= t.indexOf("right") ? t = "to left" : e && (0 <= t.indexOf("deg") ? t = 90 - parseFloat(t) + "deg" : 0 <= t.indexOf("rad") && (t = Math.PI / 2 - parseFloat(t) + "rad"))), s + "(" + t + "," + i.join(",") + ")"
                        }(i, t, a) : 0 <= t.indexOf("radial") ? r[e] = function (e, s, i) {
                            if (i[0].indexOf("at") < 0) {
                                var t = "center", a = "ellipse", r = "farthest-corner";
                                if (/\bcenter|top|right|bottom|left\b|^\d+/.test(i[0]) && (t = i.shift().replace(/\s*-?\d+(?:rad|deg)\s*/, "")), /\bcircle|ellipse|closest|farthest|contain|cover\b/.test(i[0])) {
                                    var n = i.shift().split(/\s+/);
                                    !n[0] || "circle" !== n[0] && "ellipse" !== n[0] || (a = n.shift()), n[0] && (r = n.shift()), "cover" === r ? r = "farthest-corner" : "contain" === r && (r = "clothest-side")
                                }
                                return s + "(" + a + " " + r + " at " + t + "," + i.join(",") + ")"
                            }
                            return s + "(" + i.join(",") + ")"
                        }(0, t, a) : r[e] = t + "(" + a.join(",") + ")"
                    }, function () {
                        new Prism.plugins.Previewer("gradient", function (e) {
                            return this.firstChild.style.backgroundImage = "", this.firstChild.style.backgroundImage = s(e), !!this.firstChild.style.backgroundImage
                        }, "*", function () {
                            this._elt.innerHTML = "<div></div>"
                        })
                    }),
                    tokens: {
                        gradient: {
                            pattern: /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
                            inside: {function: /[\w-]+(?=\()/, punctuation: /[(),]/}
                        }
                    },
                    languages: {
                        css: !0,
                        less: !0,
                        sass: [{
                            lang: "sass",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }, {
                            lang: "sass",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, angle: {
                    create: function () {
                        new Prism.plugins.Previewer("angle", function (e) {
                            var s, i, t = parseFloat(e), a = e.match(/[a-z]+$/i);
                            if (!t || !a) return !1;
                            switch (a = a[0]) {
                                case"deg":
                                    s = 360;
                                    break;
                                case"grad":
                                    s = 400;
                                    break;
                                case"rad":
                                    s = 2 * Math.PI;
                                    break;
                                case"turn":
                                    s = 1
                            }
                            return i = 100 * t / s, i %= 100, this[(t < 0 ? "set" : "remove") + "Attribute"]("data-negative", ""), this.querySelector("circle").style.strokeDasharray = Math.abs(i) + ",500", !0
                        }, "*", function () {
                            this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
                        })
                    },
                    tokens: {angle: /(?:\b|\B-|(?=\B\.))\d*\.?\d+(?:deg|g?rad|turn)\b/i},
                    languages: {
                        css: !0,
                        less: !0,
                        markup: {
                            lang: "markup",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
                        },
                        sass: [{
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }, {
                            lang: "sass",
                            before: "operator",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, color: {
                    create: function () {
                        new Prism.plugins.Previewer("color", function (e) {
                            return this.style.backgroundColor = "", this.style.backgroundColor = e, !!this.style.backgroundColor
                        })
                    },
                    tokens: {
                        color: {
                            pattern: /\B#(?:[0-9a-f]{3}){1,2}\b|\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B|\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
                            inside: {function: /[\w-]+(?=\()/, punctuation: /[(),]/}
                        }
                    },
                    languages: {
                        css: !0,
                        less: !0,
                        markup: {
                            lang: "markup",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
                        },
                        sass: [{
                            lang: "sass",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }, {
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, easing: {
                    create: function () {
                        new Prism.plugins.Previewer("easing", function (e) {
                            var s = (e = {
                                linear: "0,0,1,1",
                                ease: ".25,.1,.25,1",
                                "ease-in": ".42,0,1,1",
                                "ease-out": "0,0,.58,1",
                                "ease-in-out": ".42,0,.58,1"
                            }[e] || e).match(/-?\d*\.?\d+/g);
                            if (4 !== s.length) return !1;
                            s = s.map(function (e, s) {
                                return 100 * (s % 2 ? 1 - e : e)
                            }), this.querySelector("path").setAttribute("d", "M0,100 C" + s[0] + "," + s[1] + ", " + s[2] + "," + s[3] + ", 100,0");
                            var i = this.querySelectorAll("line");
                            return i[0].setAttribute("x2", s[0]), i[0].setAttribute("y2", s[1]), i[1].setAttribute("x2", s[2]), i[1].setAttribute("y2", s[3]), !0
                        }, "*", function () {
                            this._elt.innerHTML = '<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /></svg>'
                        })
                    },
                    tokens: {
                        easing: {
                            pattern: /\bcubic-bezier\((?:-?\d*\.?\d+,\s*){3}-?\d*\.?\d+\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i,
                            inside: {function: /[\w-]+(?=\()/, punctuation: /[(),]/}
                        }
                    },
                    languages: {
                        css: !0,
                        less: !0,
                        sass: [{
                            lang: "sass",
                            inside: "inside",
                            before: "punctuation",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }, {
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, time: {
                    create: function () {
                        new Prism.plugins.Previewer("time", function (e) {
                            var s = parseFloat(e), i = e.match(/[a-z]+$/i);
                            return !(!s || !i) && (i = i[0], this.querySelector("circle").style.animationDuration = 2 * s + i, !0)
                        }, "*", function () {
                            this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
                        })
                    },
                    tokens: {time: /(?:\b|\B-|(?=\B\.))\d*\.?\d+m?s\b/i},
                    languages: {
                        css: !0,
                        less: !0,
                        markup: {
                            lang: "markup",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
                        },
                        sass: [{
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }, {
                            lang: "sass",
                            before: "operator",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }
            }, i = /(?:^|\s)token(?=$|\s)/, e = /(?:^|\s)active(?=$|\s)/g, t = /(?:^|\s)flipped(?=$|\s)/g,
            n = function (e, s, i, t) {
                this._elt = null, this._type = e, this._clsRegexp = RegExp("(?:^|\\s)" + e + "(?=$|\\s)"), this._token = null, this.updater = s, this._mouseout = this.mouseout.bind(this), this.initializer = t;
                var a = this;
                i || (i = ["*"]), Array.isArray(i) || (i = [i]), i.forEach(function (e) {
                    "string" != typeof e && (e = e.lang), n.byLanguages[e] || (n.byLanguages[e] = []), n.byLanguages[e].indexOf(a) < 0 && n.byLanguages[e].push(a)
                }), n.byType[e] = this
            };
        for (var a in n.prototype.init = function () {
            this._elt || (this._elt = document.createElement("div"), this._elt.className = "prism-previewer prism-previewer-" + this._type, document.body.appendChild(this._elt), this.initializer && this.initializer())
        }, n.prototype.isDisabled = function (e) {
            do {
                if (e.hasAttribute && e.hasAttribute("data-previewers")) return -1 === (e.getAttribute("data-previewers") || "").split(/\s+/).indexOf(this._type)
            } while (e = e.parentNode);
            return !1
        }, n.prototype.check = function (e) {
            if (!i.test(e.className) || !this.isDisabled(e)) {
                do {
                    if (i.test(e.className) && this._clsRegexp.test(e.className)) break
                } while (e = e.parentNode);
                e && e !== this._token && (this._token = e, this.show())
            }
        }, n.prototype.mouseout = function () {
            this._token.removeEventListener("mouseout", this._mouseout, !1), this._token = null, this.hide()
        }, n.prototype.show = function () {
            if (this._elt || this.init(), this._token) if (this.updater.call(this._elt, this._token.textContent)) {
                this._token.addEventListener("mouseout", this._mouseout, !1);
                var e = function (e) {
                    var s = e.getBoundingClientRect(), i = s.left, t = s.top,
                        a = document.documentElement.getBoundingClientRect();
                    return i -= a.left, {
                        top: t -= a.top,
                        right: innerWidth - i - s.width,
                        bottom: innerHeight - t - s.height,
                        left: i,
                        width: s.width,
                        height: s.height
                    }
                }(this._token);
                this._elt.className += " active", 0 < e.top - this._elt.offsetHeight ? (this._elt.className = this._elt.className.replace(t, ""), this._elt.style.top = e.top + "px", this._elt.style.bottom = "") : (this._elt.className += " flipped", this._elt.style.bottom = e.bottom + "px", this._elt.style.top = ""), this._elt.style.left = e.left + Math.min(200, e.width / 2) + "px"
            } else this.hide()
        }, n.prototype.hide = function () {
            this._elt.className = this._elt.className.replace(e, "")
        }, n.byLanguages = {}, n.byType = {}, n.initEvents = function (e, s) {
            var i = [];
            n.byLanguages[s] && (i = i.concat(n.byLanguages[s])), n.byLanguages["*"] && (i = i.concat(n.byLanguages["*"])), e.addEventListener("mouseover", function (e) {
                var s = e.target;
                i.forEach(function (e) {
                    e.check(s)
                })
            }, !1)
        }, Prism.plugins.Previewer = n, Prism.hooks.add("before-highlight", function (r) {
            for (var n in o) {
                var l = o[n].languages;
                if (r.language && l[r.language] && !l[r.language].initialized) {
                    var e = l[r.language];
                    Array.isArray(e) || (e = [e]), e.forEach(function (e) {
                        var s, i, t, a;
                        e = (!0 === e ? (s = "important", i = r.language) : (s = e.before || "important", i = e.inside || e.lang, t = e.root || Prism.languages, a = e.skip), r.language), !a && Prism.languages[e] && (Prism.languages.insertBefore(i, s, o[n].tokens, t), r.grammar = Prism.languages[e], l[r.language] = {initialized: !0})
                    })
                }
            }
        }), Prism.hooks.add("after-highlight", function (e) {
            (n.byLanguages["*"] || n.byLanguages[e.language]) && n.initEvents(e.element, e.language)
        }), o) o[a].create()
    }
}();
!function () {
    if ("undefined" != typeof self && self.Prism && self.document) if (Prism.plugins.toolbar) {
        var l = {
            html: "HTML",
            xml: "XML",
            svg: "SVG",
            mathml: "MathML",
            css: "CSS",
            clike: "C-like",
            js: "JavaScript",
            abap: "ABAP",
            abnf: "Augmented Backus–Naur form",
            apacheconf: "Apache Configuration",
            apl: "APL",
            arff: "ARFF",
            asciidoc: "AsciiDoc",
            adoc: "AsciiDoc",
            asm6502: "6502 Assembly",
            aspnet: "ASP.NET (C#)",
            autohotkey: "AutoHotkey",
            autoit: "AutoIt",
            shell: "Bash",
            basic: "BASIC",
            bnf: "Backus–Naur form",
            rbnf: "Routing Backus–Naur form",
            csharp: "C#",
            cs: "C#",
            dotnet: "C#",
            cpp: "C++",
            cil: "CIL",
            coffee: "CoffeeScript",
            cmake: "CMake",
            csp: "Content-Security-Policy",
            "css-extras": "CSS Extras",
            django: "Django/Jinja2",
            jinja2: "Django/Jinja2",
            "dns-zone-file": "DNS zone file",
            "dns-zone": "DNS zone file",
            dockerfile: "Docker",
            ebnf: "Extended Backus–Naur form",
            ejs: "EJS",
            erb: "ERB",
            fsharp: "F#",
            gcode: "G-code",
            gedcom: "GEDCOM",
            glsl: "GLSL",
            gml: "GameMaker Language",
            gamemakerlanguage: "GameMaker Language",
            graphql: "GraphQL",
            hs: "Haskell",
            hcl: "HCL",
            http: "HTTP",
            hpkp: "HTTP Public-Key-Pins",
            hsts: "HTTP Strict-Transport-Security",
            ichigojam: "IchigoJam",
            inform7: "Inform 7",
            javadoc: "JavaDoc",
            javadoclike: "JavaDoc-like",
            javastacktrace: "Java stack trace",
            jq: "JQ",
            jsdoc: "JSDoc",
            "js-extras": "JS Extras",
            "js-templates": "JS Templates",
            json: "JSON",
            jsonp: "JSONP",
            json5: "JSON5",
            latex: "LaTeX",
            tex: "TeX",
            context: "ConTeXt",
            lilypond: "LilyPond",
            ly: "LilyPond",
            emacs: "Lisp",
            elisp: "Lisp",
            "emacs-lisp": "Lisp",
            lolcode: "LOLCODE",
            md: "Markdown",
            "markup-templating": "Markup templating",
            matlab: "MATLAB",
            mel: "MEL",
            n1ql: "N1QL",
            n4js: "N4JS",
            n4jsd: "N4JS",
            "nand2tetris-hdl": "Nand To Tetris HDL",
            nasm: "NASM",
            nginx: "nginx",
            nsis: "NSIS",
            objectivec: "Objective-C",
            ocaml: "OCaml",
            opencl: "OpenCL",
            parigp: "PARI/GP",
            objectpascal: "Object Pascal",
            pcaxis: "PC-Axis",
            px: "PC-Axis",
            php: "PHP",
            phpdoc: "PHPDoc",
            "php-extras": "PHP Extras",
            plsql: "PL/SQL",
            powershell: "PowerShell",
            properties: ".properties",
            protobuf: "Protocol Buffers",
            py: "Python",
            q: "Q (kdb+ database)",
            jsx: "React JSX",
            tsx: "React TSX",
            renpy: "Ren'py",
            rest: "reST (reStructuredText)",
            rb: "Ruby",
            sas: "SAS",
            sass: "Sass (Sass)",
            scss: "Sass (Scss)",
            "shell-session": "Shell session",
            soy: "Soy (Closure Template)",
            "splunk-spl": "Splunk SPL",
            sql: "SQL",
            tap: "TAP",
            toml: "TOML",
            tt2: "Template Toolkit 2",
            ts: "TypeScript",
            "t4-cs": "T4 Text Templates (C#)",
            t4: "T4 Text Templates (C#)",
            "t4-vb": "T4 Text Templates (VB)",
            "t4-templating": "T4 templating",
            vbnet: "VB.Net",
            vhdl: "VHDL",
            vim: "vim",
            "visual-basic": "Visual Basic",
            vb: "Visual Basic",
            wasm: "WebAssembly",
            wiki: "Wiki markup",
            xeoracube: "XeoraCube",
            xojo: "Xojo (REALbasic)",
            xquery: "XQuery",
            yaml: "YAML",
            yml: "YAML"
        };
        Prism.plugins.toolbar.registerButton("show-language", function (e) {
            var a = e.element.parentNode;
            if (a && /pre/i.test(a.nodeName)) {
                var s,
                    t = a.getAttribute("data-language") || l[e.language] || ((s = e.language) ? (s.substring(0, 1).toUpperCase() + s.substring(1)).replace(/s(?=cript)/, "S") : s);
                if (t) {
                    var o = document.createElement("span");
                    return o.textContent = t, o
                }
            }
        })
    } else console.warn("Show Languages plugin loaded before Toolbar plugin.")
}();
!function () {
    if ("undefined" != typeof self && self.Prism && self.document) if (Prism.plugins.toolbar) {
        var r = window.ClipboardJS || void 0;
        r || "function" != typeof require || (r = require("clipboard"));
        var i = [];
        if (!r) {
            var o = document.createElement("script"), e = document.querySelector("head");
            o.onload = function () {
                if (r = window.ClipboardJS) for (; i.length;) i.pop()()
            }, o.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js", e.appendChild(o)
        }
        Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (e) {
            var t = document.createElement("button");
            return t.textContent = "Copy", r ? o() : i.push(o), t;

            function o() {
                var o = new r(t, {
                    text: function () {
                        return e.code
                    }
                });
                o.on("success", function () {
                    t.textContent = "Copied!", n()
                }), o.on("error", function () {
                    t.textContent = "Press Ctrl+C to copy", n()
                })
            }

            function n() {
                setTimeout(function () {
                    t.textContent = "Copy"
                }, 5e3)
            }
        })
    } else console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.")
}();
