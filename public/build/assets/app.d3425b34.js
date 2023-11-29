var Te = "top",
    ze = "bottom",
    je = "right",
    Ae = "left",
    ts = "auto",
    Sr = [Te, ze, je, Ae],
    Tn = "start",
    ar = "end",
    Zd = "clippingParents",
    Ca = "viewport",
    jn = "popper",
    ef = "reference",
    wl = Sr.reduce(function (e, t) {
        return e.concat([t + "-" + Tn, t + "-" + ar]);
    }, []),
    xa = [].concat(Sr, [ts]).reduce(function (e, t) {
        return e.concat([t, t + "-" + Tn, t + "-" + ar]);
    }, []),
    tf = "beforeRead",
    nf = "read",
    rf = "afterRead",
    of = "beforeMain",
    sf = "main",
    lf = "afterMain",
    af = "beforeWrite",
    cf = "write",
    uf = "afterWrite",
    df = [tf, nf, rf, of, sf, lf, af, cf, uf];
function vt(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
}
function Je(e) {
    if (e == null) return window;
    if (e.toString() !== "[object Window]") {
        var t = e.ownerDocument;
        return (t && t.defaultView) || window;
    }
    return e;
}
function An(e) {
    var t = Je(e).Element;
    return e instanceof t || e instanceof Element;
}
function Ye(e) {
    var t = Je(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement;
}
function Ta(e) {
    if (typeof ShadowRoot > "u") return !1;
    var t = Je(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot;
}
function $m(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function (n) {
        var r = t.styles[n] || {},
            i = t.attributes[n] || {},
            o = t.elements[n];
        !Ye(o) ||
            !vt(o) ||
            (Object.assign(o.style, r),
            Object.keys(i).forEach(function (s) {
                var a = i[s];
                a === !1
                    ? o.removeAttribute(s)
                    : o.setAttribute(s, a === !0 ? "" : a);
            }));
    });
}
function Mm(e) {
    var t = e.state,
        n = {
            popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
            },
            arrow: { position: "absolute" },
            reference: {},
        };
    return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
            Object.keys(t.elements).forEach(function (r) {
                var i = t.elements[r],
                    o = t.attributes[r] || {},
                    s = Object.keys(
                        t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]
                    ),
                    a = s.reduce(function (c, u) {
                        return (c[u] = ""), c;
                    }, {});
                !Ye(i) ||
                    !vt(i) ||
                    (Object.assign(i.style, a),
                    Object.keys(o).forEach(function (c) {
                        i.removeAttribute(c);
                    }));
            });
        }
    );
}
const Aa = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: $m,
    effect: Mm,
    requires: ["computeStyles"],
};
function pt(e) {
    return e.split("-")[0];
}
var Sn = Math.max,
    To = Math.min,
    cr = Math.round;
function Nl() {
    var e = navigator.userAgentData;
    return e != null && e.brands
        ? e.brands
              .map(function (t) {
                  return t.brand + "/" + t.version;
              })
              .join(" ")
        : navigator.userAgent;
}
function ff() {
    return !/^((?!chrome|android).)*safari/i.test(Nl());
}
function ur(e, t, n) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    var r = e.getBoundingClientRect(),
        i = 1,
        o = 1;
    t &&
        Ye(e) &&
        ((i = (e.offsetWidth > 0 && cr(r.width) / e.offsetWidth) || 1),
        (o = (e.offsetHeight > 0 && cr(r.height) / e.offsetHeight) || 1));
    var s = An(e) ? Je(e) : window,
        a = s.visualViewport,
        c = !ff() && n,
        u = (r.left + (c && a ? a.offsetLeft : 0)) / i,
        f = (r.top + (c && a ? a.offsetTop : 0)) / o,
        h = r.width / i,
        v = r.height / o;
    return {
        width: h,
        height: v,
        top: f,
        right: u + h,
        bottom: f + v,
        left: u,
        x: u,
        y: f,
    };
}
function ka(e) {
    var t = ur(e),
        n = e.offsetWidth,
        r = e.offsetHeight;
    return (
        Math.abs(t.width - n) <= 1 && (n = t.width),
        Math.abs(t.height - r) <= 1 && (r = t.height),
        { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
}
function pf(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && Ta(n)) {
        var r = t;
        do {
            if (r && e.isSameNode(r)) return !0;
            r = r.parentNode || r.host;
        } while (r);
    }
    return !1;
}
function Ot(e) {
    return Je(e).getComputedStyle(e);
}
function Fm(e) {
    return ["table", "td", "th"].indexOf(vt(e)) >= 0;
}
function ln(e) {
    return ((An(e) ? e.ownerDocument : e.document) || window.document)
        .documentElement;
}
function ns(e) {
    return vt(e) === "html"
        ? e
        : e.assignedSlot || e.parentNode || (Ta(e) ? e.host : null) || ln(e);
}
function Zc(e) {
    return !Ye(e) || Ot(e).position === "fixed" ? null : e.offsetParent;
}
function zm(e) {
    var t = /firefox/i.test(Nl()),
        n = /Trident/i.test(Nl());
    if (n && Ye(e)) {
        var r = Ot(e);
        if (r.position === "fixed") return null;
    }
    var i = ns(e);
    for (
        Ta(i) && (i = i.host);
        Ye(i) && ["html", "body"].indexOf(vt(i)) < 0;

    ) {
        var o = Ot(i);
        if (
            o.transform !== "none" ||
            o.perspective !== "none" ||
            o.contain === "paint" ||
            ["transform", "perspective"].indexOf(o.willChange) !== -1 ||
            (t && o.willChange === "filter") ||
            (t && o.filter && o.filter !== "none")
        )
            return i;
        i = i.parentNode;
    }
    return null;
}
function Si(e) {
    for (var t = Je(e), n = Zc(e); n && Fm(n) && Ot(n).position === "static"; )
        n = Zc(n);
    return n &&
        (vt(n) === "html" || (vt(n) === "body" && Ot(n).position === "static"))
        ? t
        : n || zm(e) || t;
}
function Oa(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Kr(e, t, n) {
    return Sn(e, To(t, n));
}
function jm(e, t, n) {
    var r = Kr(e, t, n);
    return r > n ? n : r;
}
function hf() {
    return { top: 0, right: 0, bottom: 0, left: 0 };
}
function mf(e) {
    return Object.assign({}, hf(), e);
}
function gf(e, t) {
    return t.reduce(function (n, r) {
        return (n[r] = e), n;
    }, {});
}
var Bm = function (t, n) {
    return (
        (t =
            typeof t == "function"
                ? t(Object.assign({}, n.rects, { placement: n.placement }))
                : t),
        mf(typeof t != "number" ? t : gf(t, Sr))
    );
};
function Vm(e) {
    var t,
        n = e.state,
        r = e.name,
        i = e.options,
        o = n.elements.arrow,
        s = n.modifiersData.popperOffsets,
        a = pt(n.placement),
        c = Oa(a),
        u = [Ae, je].indexOf(a) >= 0,
        f = u ? "height" : "width";
    if (!(!o || !s)) {
        var h = Bm(i.padding, n),
            v = ka(o),
            y = c === "y" ? Te : Ae,
            _ = c === "y" ? ze : je,
            E =
                n.rects.reference[f] +
                n.rects.reference[c] -
                s[c] -
                n.rects.popper[f],
            P = s[c] - n.rects.reference[c],
            m = Si(o),
            p = m ? (c === "y" ? m.clientHeight || 0 : m.clientWidth || 0) : 0,
            g = E / 2 - P / 2,
            w = h[y],
            C = p - v[f] - h[_],
            T = p / 2 - v[f] / 2 + g,
            O = Kr(w, T, C),
            k = c;
        n.modifiersData[r] =
            ((t = {}), (t[k] = O), (t.centerOffset = O - T), t);
    }
}
function Um(e) {
    var t = e.state,
        n = e.options,
        r = n.element,
        i = r === void 0 ? "[data-popper-arrow]" : r;
    i != null &&
        ((typeof i == "string" &&
            ((i = t.elements.popper.querySelector(i)), !i)) ||
            !pf(t.elements.popper, i) ||
            (t.elements.arrow = i));
}
const vf = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: Vm,
    effect: Um,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
};
function dr(e) {
    return e.split("-")[1];
}
var Hm = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Wm(e) {
    var t = e.x,
        n = e.y,
        r = window,
        i = r.devicePixelRatio || 1;
    return { x: cr(t * i) / i || 0, y: cr(n * i) / i || 0 };
}
function eu(e) {
    var t,
        n = e.popper,
        r = e.popperRect,
        i = e.placement,
        o = e.variation,
        s = e.offsets,
        a = e.position,
        c = e.gpuAcceleration,
        u = e.adaptive,
        f = e.roundOffsets,
        h = e.isFixed,
        v = s.x,
        y = v === void 0 ? 0 : v,
        _ = s.y,
        E = _ === void 0 ? 0 : _,
        P = typeof f == "function" ? f({ x: y, y: E }) : { x: y, y: E };
    (y = P.x), (E = P.y);
    var m = s.hasOwnProperty("x"),
        p = s.hasOwnProperty("y"),
        g = Ae,
        w = Te,
        C = window;
    if (u) {
        var T = Si(n),
            O = "clientHeight",
            k = "clientWidth";
        if (
            (T === Je(n) &&
                ((T = ln(n)),
                Ot(T).position !== "static" &&
                    a === "absolute" &&
                    ((O = "scrollHeight"), (k = "scrollWidth"))),
            (T = T),
            i === Te || ((i === Ae || i === je) && o === ar))
        ) {
            w = ze;
            var $ =
                h && T === C && C.visualViewport
                    ? C.visualViewport.height
                    : T[O];
            (E -= $ - r.height), (E *= c ? 1 : -1);
        }
        if (i === Ae || ((i === Te || i === ze) && o === ar)) {
            g = je;
            var D =
                h && T === C && C.visualViewport
                    ? C.visualViewport.width
                    : T[k];
            (y -= D - r.width), (y *= c ? 1 : -1);
        }
    }
    var z = Object.assign({ position: a }, u && Hm),
        V = f === !0 ? Wm({ x: y, y: E }) : { x: y, y: E };
    if (((y = V.x), (E = V.y), c)) {
        var U;
        return Object.assign(
            {},
            z,
            ((U = {}),
            (U[w] = p ? "0" : ""),
            (U[g] = m ? "0" : ""),
            (U.transform =
                (C.devicePixelRatio || 1) <= 1
                    ? "translate(" + y + "px, " + E + "px)"
                    : "translate3d(" + y + "px, " + E + "px, 0)"),
            U)
        );
    }
    return Object.assign(
        {},
        z,
        ((t = {}),
        (t[w] = p ? E + "px" : ""),
        (t[g] = m ? y + "px" : ""),
        (t.transform = ""),
        t)
    );
}
function Km(e) {
    var t = e.state,
        n = e.options,
        r = n.gpuAcceleration,
        i = r === void 0 ? !0 : r,
        o = n.adaptive,
        s = o === void 0 ? !0 : o,
        a = n.roundOffsets,
        c = a === void 0 ? !0 : a,
        u = {
            placement: pt(t.placement),
            variation: dr(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: i,
            isFixed: t.options.strategy === "fixed",
        };
    t.modifiersData.popperOffsets != null &&
        (t.styles.popper = Object.assign(
            {},
            t.styles.popper,
            eu(
                Object.assign({}, u, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: s,
                    roundOffsets: c,
                })
            )
        )),
        t.modifiersData.arrow != null &&
            (t.styles.arrow = Object.assign(
                {},
                t.styles.arrow,
                eu(
                    Object.assign({}, u, {
                        offsets: t.modifiersData.arrow,
                        position: "absolute",
                        adaptive: !1,
                        roundOffsets: c,
                    })
                )
            )),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-placement": t.placement,
        }));
}
const Pa = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: Km,
    data: {},
};
var $i = { passive: !0 };
function Ym(e) {
    var t = e.state,
        n = e.instance,
        r = e.options,
        i = r.scroll,
        o = i === void 0 ? !0 : i,
        s = r.resize,
        a = s === void 0 ? !0 : s,
        c = Je(t.elements.popper),
        u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return (
        o &&
            u.forEach(function (f) {
                f.addEventListener("scroll", n.update, $i);
            }),
        a && c.addEventListener("resize", n.update, $i),
        function () {
            o &&
                u.forEach(function (f) {
                    f.removeEventListener("scroll", n.update, $i);
                }),
                a && c.removeEventListener("resize", n.update, $i);
        }
    );
}
const ba = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: Ym,
    data: {},
};
var Gm = { left: "right", right: "left", bottom: "top", top: "bottom" };
function so(e) {
    return e.replace(/left|right|bottom|top/g, function (t) {
        return Gm[t];
    });
}
var Qm = { start: "end", end: "start" };
function tu(e) {
    return e.replace(/start|end/g, function (t) {
        return Qm[t];
    });
}
function La(e) {
    var t = Je(e),
        n = t.pageXOffset,
        r = t.pageYOffset;
    return { scrollLeft: n, scrollTop: r };
}
function Da(e) {
    return ur(ln(e)).left + La(e).scrollLeft;
}
function qm(e, t) {
    var n = Je(e),
        r = ln(e),
        i = n.visualViewport,
        o = r.clientWidth,
        s = r.clientHeight,
        a = 0,
        c = 0;
    if (i) {
        (o = i.width), (s = i.height);
        var u = ff();
        (u || (!u && t === "fixed")) && ((a = i.offsetLeft), (c = i.offsetTop));
    }
    return { width: o, height: s, x: a + Da(e), y: c };
}
function Xm(e) {
    var t,
        n = ln(e),
        r = La(e),
        i = (t = e.ownerDocument) == null ? void 0 : t.body,
        o = Sn(
            n.scrollWidth,
            n.clientWidth,
            i ? i.scrollWidth : 0,
            i ? i.clientWidth : 0
        ),
        s = Sn(
            n.scrollHeight,
            n.clientHeight,
            i ? i.scrollHeight : 0,
            i ? i.clientHeight : 0
        ),
        a = -r.scrollLeft + Da(e),
        c = -r.scrollTop;
    return (
        Ot(i || n).direction === "rtl" &&
            (a += Sn(n.clientWidth, i ? i.clientWidth : 0) - o),
        { width: o, height: s, x: a, y: c }
    );
}
function Ra(e) {
    var t = Ot(e),
        n = t.overflow,
        r = t.overflowX,
        i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function _f(e) {
    return ["html", "body", "#document"].indexOf(vt(e)) >= 0
        ? e.ownerDocument.body
        : Ye(e) && Ra(e)
        ? e
        : _f(ns(e));
}
function Yr(e, t) {
    var n;
    t === void 0 && (t = []);
    var r = _f(e),
        i = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
        o = Je(r),
        s = i ? [o].concat(o.visualViewport || [], Ra(r) ? r : []) : r,
        a = t.concat(s);
    return i ? a : a.concat(Yr(ns(s)));
}
function Sl(e) {
    return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height,
    });
}
function Jm(e, t) {
    var n = ur(e, !1, t === "fixed");
    return (
        (n.top = n.top + e.clientTop),
        (n.left = n.left + e.clientLeft),
        (n.bottom = n.top + e.clientHeight),
        (n.right = n.left + e.clientWidth),
        (n.width = e.clientWidth),
        (n.height = e.clientHeight),
        (n.x = n.left),
        (n.y = n.top),
        n
    );
}
function nu(e, t, n) {
    return t === Ca ? Sl(qm(e, n)) : An(t) ? Jm(t, n) : Sl(Xm(ln(e)));
}
function Zm(e) {
    var t = Yr(ns(e)),
        n = ["absolute", "fixed"].indexOf(Ot(e).position) >= 0,
        r = n && Ye(e) ? Si(e) : e;
    return An(r)
        ? t.filter(function (i) {
              return An(i) && pf(i, r) && vt(i) !== "body";
          })
        : [];
}
function eg(e, t, n, r) {
    var i = t === "clippingParents" ? Zm(e) : [].concat(t),
        o = [].concat(i, [n]),
        s = o[0],
        a = o.reduce(function (c, u) {
            var f = nu(e, u, r);
            return (
                (c.top = Sn(f.top, c.top)),
                (c.right = To(f.right, c.right)),
                (c.bottom = To(f.bottom, c.bottom)),
                (c.left = Sn(f.left, c.left)),
                c
            );
        }, nu(e, s, r));
    return (
        (a.width = a.right - a.left),
        (a.height = a.bottom - a.top),
        (a.x = a.left),
        (a.y = a.top),
        a
    );
}
function yf(e) {
    var t = e.reference,
        n = e.element,
        r = e.placement,
        i = r ? pt(r) : null,
        o = r ? dr(r) : null,
        s = t.x + t.width / 2 - n.width / 2,
        a = t.y + t.height / 2 - n.height / 2,
        c;
    switch (i) {
        case Te:
            c = { x: s, y: t.y - n.height };
            break;
        case ze:
            c = { x: s, y: t.y + t.height };
            break;
        case je:
            c = { x: t.x + t.width, y: a };
            break;
        case Ae:
            c = { x: t.x - n.width, y: a };
            break;
        default:
            c = { x: t.x, y: t.y };
    }
    var u = i ? Oa(i) : null;
    if (u != null) {
        var f = u === "y" ? "height" : "width";
        switch (o) {
            case Tn:
                c[u] = c[u] - (t[f] / 2 - n[f] / 2);
                break;
            case ar:
                c[u] = c[u] + (t[f] / 2 - n[f] / 2);
                break;
        }
    }
    return c;
}
function fr(e, t) {
    t === void 0 && (t = {});
    var n = t,
        r = n.placement,
        i = r === void 0 ? e.placement : r,
        o = n.strategy,
        s = o === void 0 ? e.strategy : o,
        a = n.boundary,
        c = a === void 0 ? Zd : a,
        u = n.rootBoundary,
        f = u === void 0 ? Ca : u,
        h = n.elementContext,
        v = h === void 0 ? jn : h,
        y = n.altBoundary,
        _ = y === void 0 ? !1 : y,
        E = n.padding,
        P = E === void 0 ? 0 : E,
        m = mf(typeof P != "number" ? P : gf(P, Sr)),
        p = v === jn ? ef : jn,
        g = e.rects.popper,
        w = e.elements[_ ? p : v],
        C = eg(An(w) ? w : w.contextElement || ln(e.elements.popper), c, f, s),
        T = ur(e.elements.reference),
        O = yf({
            reference: T,
            element: g,
            strategy: "absolute",
            placement: i,
        }),
        k = Sl(Object.assign({}, g, O)),
        $ = v === jn ? k : T,
        D = {
            top: C.top - $.top + m.top,
            bottom: $.bottom - C.bottom + m.bottom,
            left: C.left - $.left + m.left,
            right: $.right - C.right + m.right,
        },
        z = e.modifiersData.offset;
    if (v === jn && z) {
        var V = z[i];
        Object.keys(D).forEach(function (U) {
            var le = [je, ze].indexOf(U) >= 0 ? 1 : -1,
                de = [Te, ze].indexOf(U) >= 0 ? "y" : "x";
            D[U] += V[de] * le;
        });
    }
    return D;
}
function tg(e, t) {
    t === void 0 && (t = {});
    var n = t,
        r = n.placement,
        i = n.boundary,
        o = n.rootBoundary,
        s = n.padding,
        a = n.flipVariations,
        c = n.allowedAutoPlacements,
        u = c === void 0 ? xa : c,
        f = dr(r),
        h = f
            ? a
                ? wl
                : wl.filter(function (_) {
                      return dr(_) === f;
                  })
            : Sr,
        v = h.filter(function (_) {
            return u.indexOf(_) >= 0;
        });
    v.length === 0 && (v = h);
    var y = v.reduce(function (_, E) {
        return (
            (_[E] = fr(e, {
                placement: E,
                boundary: i,
                rootBoundary: o,
                padding: s,
            })[pt(E)]),
            _
        );
    }, {});
    return Object.keys(y).sort(function (_, E) {
        return y[_] - y[E];
    });
}
function ng(e) {
    if (pt(e) === ts) return [];
    var t = so(e);
    return [tu(e), t, tu(t)];
}
function rg(e) {
    var t = e.state,
        n = e.options,
        r = e.name;
    if (!t.modifiersData[r]._skip) {
        for (
            var i = n.mainAxis,
                o = i === void 0 ? !0 : i,
                s = n.altAxis,
                a = s === void 0 ? !0 : s,
                c = n.fallbackPlacements,
                u = n.padding,
                f = n.boundary,
                h = n.rootBoundary,
                v = n.altBoundary,
                y = n.flipVariations,
                _ = y === void 0 ? !0 : y,
                E = n.allowedAutoPlacements,
                P = t.options.placement,
                m = pt(P),
                p = m === P,
                g = c || (p || !_ ? [so(P)] : ng(P)),
                w = [P].concat(g).reduce(function (b, q) {
                    return b.concat(
                        pt(q) === ts
                            ? tg(t, {
                                  placement: q,
                                  boundary: f,
                                  rootBoundary: h,
                                  padding: u,
                                  flipVariations: _,
                                  allowedAutoPlacements: E,
                              })
                            : q
                    );
                }, []),
                C = t.rects.reference,
                T = t.rects.popper,
                O = new Map(),
                k = !0,
                $ = w[0],
                D = 0;
            D < w.length;
            D++
        ) {
            var z = w[D],
                V = pt(z),
                U = dr(z) === Tn,
                le = [Te, ze].indexOf(V) >= 0,
                de = le ? "width" : "height",
                Q = fr(t, {
                    placement: z,
                    boundary: f,
                    rootBoundary: h,
                    altBoundary: v,
                    padding: u,
                }),
                oe = le ? (U ? je : Ae) : U ? ze : Te;
            C[de] > T[de] && (oe = so(oe));
            var S = so(oe),
                L = [];
            if (
                (o && L.push(Q[V] <= 0),
                a && L.push(Q[oe] <= 0, Q[S] <= 0),
                L.every(function (b) {
                    return b;
                }))
            ) {
                ($ = z), (k = !1);
                break;
            }
            O.set(z, L);
        }
        if (k)
            for (
                var M = _ ? 3 : 1,
                    K = function (q) {
                        var ee = w.find(function (Ce) {
                            var hn = O.get(Ce);
                            if (hn)
                                return hn.slice(0, q).every(function (Os) {
                                    return Os;
                                });
                        });
                        if (ee) return ($ = ee), "break";
                    },
                    Y = M;
                Y > 0;
                Y--
            ) {
                var F = K(Y);
                if (F === "break") break;
            }
        t.placement !== $ &&
            ((t.modifiersData[r]._skip = !0),
            (t.placement = $),
            (t.reset = !0));
    }
}
const Ef = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: rg,
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
};
function ru(e, t, n) {
    return (
        n === void 0 && (n = { x: 0, y: 0 }),
        {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x,
        }
    );
}
function iu(e) {
    return [Te, je, ze, Ae].some(function (t) {
        return e[t] >= 0;
    });
}
function ig(e) {
    var t = e.state,
        n = e.name,
        r = t.rects.reference,
        i = t.rects.popper,
        o = t.modifiersData.preventOverflow,
        s = fr(t, { elementContext: "reference" }),
        a = fr(t, { altBoundary: !0 }),
        c = ru(s, r),
        u = ru(a, i, o),
        f = iu(c),
        h = iu(u);
    (t.modifiersData[n] = {
        referenceClippingOffsets: c,
        popperEscapeOffsets: u,
        isReferenceHidden: f,
        hasPopperEscaped: h,
    }),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-reference-hidden": f,
            "data-popper-escaped": h,
        }));
}
const wf = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: ig,
};
function og(e, t, n) {
    var r = pt(e),
        i = [Ae, Te].indexOf(r) >= 0 ? -1 : 1,
        o =
            typeof n == "function"
                ? n(Object.assign({}, t, { placement: e }))
                : n,
        s = o[0],
        a = o[1];
    return (
        (s = s || 0),
        (a = (a || 0) * i),
        [Ae, je].indexOf(r) >= 0 ? { x: a, y: s } : { x: s, y: a }
    );
}
function sg(e) {
    var t = e.state,
        n = e.options,
        r = e.name,
        i = n.offset,
        o = i === void 0 ? [0, 0] : i,
        s = xa.reduce(function (f, h) {
            return (f[h] = og(h, t.rects, o)), f;
        }, {}),
        a = s[t.placement],
        c = a.x,
        u = a.y;
    t.modifiersData.popperOffsets != null &&
        ((t.modifiersData.popperOffsets.x += c),
        (t.modifiersData.popperOffsets.y += u)),
        (t.modifiersData[r] = s);
}
const Nf = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: sg,
};
function lg(e) {
    var t = e.state,
        n = e.name;
    t.modifiersData[n] = yf({
        reference: t.rects.reference,
        element: t.rects.popper,
        strategy: "absolute",
        placement: t.placement,
    });
}
const Ia = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: lg,
    data: {},
};
function ag(e) {
    return e === "x" ? "y" : "x";
}
function cg(e) {
    var t = e.state,
        n = e.options,
        r = e.name,
        i = n.mainAxis,
        o = i === void 0 ? !0 : i,
        s = n.altAxis,
        a = s === void 0 ? !1 : s,
        c = n.boundary,
        u = n.rootBoundary,
        f = n.altBoundary,
        h = n.padding,
        v = n.tether,
        y = v === void 0 ? !0 : v,
        _ = n.tetherOffset,
        E = _ === void 0 ? 0 : _,
        P = fr(t, { boundary: c, rootBoundary: u, padding: h, altBoundary: f }),
        m = pt(t.placement),
        p = dr(t.placement),
        g = !p,
        w = Oa(m),
        C = ag(w),
        T = t.modifiersData.popperOffsets,
        O = t.rects.reference,
        k = t.rects.popper,
        $ =
            typeof E == "function"
                ? E(Object.assign({}, t.rects, { placement: t.placement }))
                : E,
        D =
            typeof $ == "number"
                ? { mainAxis: $, altAxis: $ }
                : Object.assign({ mainAxis: 0, altAxis: 0 }, $),
        z = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        V = { x: 0, y: 0 };
    if (!!T) {
        if (o) {
            var U,
                le = w === "y" ? Te : Ae,
                de = w === "y" ? ze : je,
                Q = w === "y" ? "height" : "width",
                oe = T[w],
                S = oe + P[le],
                L = oe - P[de],
                M = y ? -k[Q] / 2 : 0,
                K = p === Tn ? O[Q] : k[Q],
                Y = p === Tn ? -k[Q] : -O[Q],
                F = t.elements.arrow,
                b = y && F ? ka(F) : { width: 0, height: 0 },
                q = t.modifiersData["arrow#persistent"]
                    ? t.modifiersData["arrow#persistent"].padding
                    : hf(),
                ee = q[le],
                Ce = q[de],
                hn = Kr(0, O[Q], b[Q]),
                Os = g
                    ? O[Q] / 2 - M - hn - ee - D.mainAxis
                    : K - hn - ee - D.mainAxis,
                Pm = g
                    ? -O[Q] / 2 + M + hn + Ce + D.mainAxis
                    : Y + hn + Ce + D.mainAxis,
                Ps = t.elements.arrow && Si(t.elements.arrow),
                bm = Ps
                    ? w === "y"
                        ? Ps.clientTop || 0
                        : Ps.clientLeft || 0
                    : 0,
                Hc = (U = z == null ? void 0 : z[w]) != null ? U : 0,
                Lm = oe + Os - Hc - bm,
                Dm = oe + Pm - Hc,
                Wc = Kr(y ? To(S, Lm) : S, oe, y ? Sn(L, Dm) : L);
            (T[w] = Wc), (V[w] = Wc - oe);
        }
        if (a) {
            var Kc,
                Rm = w === "x" ? Te : Ae,
                Im = w === "x" ? ze : je,
                mn = T[C],
                Ii = C === "y" ? "height" : "width",
                Yc = mn + P[Rm],
                Gc = mn - P[Im],
                bs = [Te, Ae].indexOf(m) !== -1,
                Qc = (Kc = z == null ? void 0 : z[C]) != null ? Kc : 0,
                qc = bs ? Yc : mn - O[Ii] - k[Ii] - Qc + D.altAxis,
                Xc = bs ? mn + O[Ii] + k[Ii] - Qc - D.altAxis : Gc,
                Jc =
                    y && bs ? jm(qc, mn, Xc) : Kr(y ? qc : Yc, mn, y ? Xc : Gc);
            (T[C] = Jc), (V[C] = Jc - mn);
        }
        t.modifiersData[r] = V;
    }
}
const Sf = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: cg,
    requiresIfExists: ["offset"],
};
function ug(e) {
    return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function dg(e) {
    return e === Je(e) || !Ye(e) ? La(e) : ug(e);
}
function fg(e) {
    var t = e.getBoundingClientRect(),
        n = cr(t.width) / e.offsetWidth || 1,
        r = cr(t.height) / e.offsetHeight || 1;
    return n !== 1 || r !== 1;
}
function pg(e, t, n) {
    n === void 0 && (n = !1);
    var r = Ye(t),
        i = Ye(t) && fg(t),
        o = ln(t),
        s = ur(e, i, n),
        a = { scrollLeft: 0, scrollTop: 0 },
        c = { x: 0, y: 0 };
    return (
        (r || (!r && !n)) &&
            ((vt(t) !== "body" || Ra(o)) && (a = dg(t)),
            Ye(t)
                ? ((c = ur(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
                : o && (c.x = Da(o))),
        {
            x: s.left + a.scrollLeft - c.x,
            y: s.top + a.scrollTop - c.y,
            width: s.width,
            height: s.height,
        }
    );
}
function hg(e) {
    var t = new Map(),
        n = new Set(),
        r = [];
    e.forEach(function (o) {
        t.set(o.name, o);
    });
    function i(o) {
        n.add(o.name);
        var s = [].concat(o.requires || [], o.requiresIfExists || []);
        s.forEach(function (a) {
            if (!n.has(a)) {
                var c = t.get(a);
                c && i(c);
            }
        }),
            r.push(o);
    }
    return (
        e.forEach(function (o) {
            n.has(o.name) || i(o);
        }),
        r
    );
}
function mg(e) {
    var t = hg(e);
    return df.reduce(function (n, r) {
        return n.concat(
            t.filter(function (i) {
                return i.phase === r;
            })
        );
    }, []);
}
function gg(e) {
    var t;
    return function () {
        return (
            t ||
                (t = new Promise(function (n) {
                    Promise.resolve().then(function () {
                        (t = void 0), n(e());
                    });
                })),
            t
        );
    };
}
function vg(e) {
    var t = e.reduce(function (n, r) {
        var i = n[r.name];
        return (
            (n[r.name] = i
                ? Object.assign({}, i, r, {
                      options: Object.assign({}, i.options, r.options),
                      data: Object.assign({}, i.data, r.data),
                  })
                : r),
            n
        );
    }, {});
    return Object.keys(t).map(function (n) {
        return t[n];
    });
}
var ou = { placement: "bottom", modifiers: [], strategy: "absolute" };
function su() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
    return !t.some(function (r) {
        return !(r && typeof r.getBoundingClientRect == "function");
    });
}
function rs(e) {
    e === void 0 && (e = {});
    var t = e,
        n = t.defaultModifiers,
        r = n === void 0 ? [] : n,
        i = t.defaultOptions,
        o = i === void 0 ? ou : i;
    return function (a, c, u) {
        u === void 0 && (u = o);
        var f = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, ou, o),
                modifiersData: {},
                elements: { reference: a, popper: c },
                attributes: {},
                styles: {},
            },
            h = [],
            v = !1,
            y = {
                state: f,
                setOptions: function (m) {
                    var p = typeof m == "function" ? m(f.options) : m;
                    E(),
                        (f.options = Object.assign({}, o, f.options, p)),
                        (f.scrollParents = {
                            reference: An(a)
                                ? Yr(a)
                                : a.contextElement
                                ? Yr(a.contextElement)
                                : [],
                            popper: Yr(c),
                        });
                    var g = mg(vg([].concat(r, f.options.modifiers)));
                    return (
                        (f.orderedModifiers = g.filter(function (w) {
                            return w.enabled;
                        })),
                        _(),
                        y.update()
                    );
                },
                forceUpdate: function () {
                    if (!v) {
                        var m = f.elements,
                            p = m.reference,
                            g = m.popper;
                        if (!!su(p, g)) {
                            (f.rects = {
                                reference: pg(
                                    p,
                                    Si(g),
                                    f.options.strategy === "fixed"
                                ),
                                popper: ka(g),
                            }),
                                (f.reset = !1),
                                (f.placement = f.options.placement),
                                f.orderedModifiers.forEach(function (D) {
                                    return (f.modifiersData[D.name] =
                                        Object.assign({}, D.data));
                                });
                            for (
                                var w = 0;
                                w < f.orderedModifiers.length;
                                w++
                            ) {
                                if (f.reset === !0) {
                                    (f.reset = !1), (w = -1);
                                    continue;
                                }
                                var C = f.orderedModifiers[w],
                                    T = C.fn,
                                    O = C.options,
                                    k = O === void 0 ? {} : O,
                                    $ = C.name;
                                typeof T == "function" &&
                                    (f =
                                        T({
                                            state: f,
                                            options: k,
                                            name: $,
                                            instance: y,
                                        }) || f);
                            }
                        }
                    }
                },
                update: gg(function () {
                    return new Promise(function (P) {
                        y.forceUpdate(), P(f);
                    });
                }),
                destroy: function () {
                    E(), (v = !0);
                },
            };
        if (!su(a, c)) return y;
        y.setOptions(u).then(function (P) {
            !v && u.onFirstUpdate && u.onFirstUpdate(P);
        });
        function _() {
            f.orderedModifiers.forEach(function (P) {
                var m = P.name,
                    p = P.options,
                    g = p === void 0 ? {} : p,
                    w = P.effect;
                if (typeof w == "function") {
                    var C = w({ state: f, name: m, instance: y, options: g }),
                        T = function () {};
                    h.push(C || T);
                }
            });
        }
        function E() {
            h.forEach(function (P) {
                return P();
            }),
                (h = []);
        }
        return y;
    };
}
var _g = rs(),
    yg = [ba, Ia, Pa, Aa],
    Eg = rs({ defaultModifiers: yg }),
    wg = [ba, Ia, Pa, Aa, Nf, Ef, Sf, vf, wf],
    $a = rs({ defaultModifiers: wg });
const Cf = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            popperGenerator: rs,
            detectOverflow: fr,
            createPopperBase: _g,
            createPopper: $a,
            createPopperLite: Eg,
            top: Te,
            bottom: ze,
            right: je,
            left: Ae,
            auto: ts,
            basePlacements: Sr,
            start: Tn,
            end: ar,
            clippingParents: Zd,
            viewport: Ca,
            popper: jn,
            reference: ef,
            variationPlacements: wl,
            placements: xa,
            beforeRead: tf,
            read: nf,
            afterRead: rf,
            beforeMain: of,
            main: sf,
            afterMain: lf,
            beforeWrite: af,
            write: cf,
            afterWrite: uf,
            modifierPhases: df,
            applyStyles: Aa,
            arrow: vf,
            computeStyles: Pa,
            eventListeners: ba,
            flip: Ef,
            hide: wf,
            offset: Nf,
            popperOffsets: Ia,
            preventOverflow: Sf,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
/*!
 * Bootstrap v5.2.3 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const Ng = 1e6,
    Sg = 1e3,
    Cl = "transitionend",
    Cg = (e) =>
        e == null
            ? `${e}`
            : Object.prototype.toString
                  .call(e)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase(),
    xg = (e) => {
        do e += Math.floor(Math.random() * Ng);
        while (document.getElementById(e));
        return e;
    },
    xf = (e) => {
        let t = e.getAttribute("data-bs-target");
        if (!t || t === "#") {
            let n = e.getAttribute("href");
            if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
            n.includes("#") &&
                !n.startsWith("#") &&
                (n = `#${n.split("#")[1]}`),
                (t = n && n !== "#" ? n.trim() : null);
        }
        return t;
    },
    Tf = (e) => {
        const t = xf(e);
        return t && document.querySelector(t) ? t : null;
    },
    Ct = (e) => {
        const t = xf(e);
        return t ? document.querySelector(t) : null;
    },
    Tg = (e) => {
        if (!e) return 0;
        let { transitionDuration: t, transitionDelay: n } =
            window.getComputedStyle(e);
        const r = Number.parseFloat(t),
            i = Number.parseFloat(n);
        return !r && !i
            ? 0
            : ((t = t.split(",")[0]),
              (n = n.split(",")[0]),
              (Number.parseFloat(t) + Number.parseFloat(n)) * Sg);
    },
    Af = (e) => {
        e.dispatchEvent(new Event(Cl));
    },
    xt = (e) =>
        !e || typeof e != "object"
            ? !1
            : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"),
    en = (e) =>
        xt(e)
            ? e.jquery
                ? e[0]
                : e
            : typeof e == "string" && e.length > 0
            ? document.querySelector(e)
            : null,
    Cr = (e) => {
        if (!xt(e) || e.getClientRects().length === 0) return !1;
        const t =
                getComputedStyle(e).getPropertyValue("visibility") ===
                "visible",
            n = e.closest("details:not([open])");
        if (!n) return t;
        if (n !== e) {
            const r = e.closest("summary");
            if ((r && r.parentNode !== n) || r === null) return !1;
        }
        return t;
    },
    tn = (e) =>
        !e ||
        e.nodeType !== Node.ELEMENT_NODE ||
        e.classList.contains("disabled")
            ? !0
            : typeof e.disabled < "u"
            ? e.disabled
            : e.hasAttribute("disabled") &&
              e.getAttribute("disabled") !== "false",
    kf = (e) => {
        if (!document.documentElement.attachShadow) return null;
        if (typeof e.getRootNode == "function") {
            const t = e.getRootNode();
            return t instanceof ShadowRoot ? t : null;
        }
        return e instanceof ShadowRoot
            ? e
            : e.parentNode
            ? kf(e.parentNode)
            : null;
    },
    Ao = () => {},
    Ci = (e) => {
        e.offsetHeight;
    },
    Of = () =>
        window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
            ? window.jQuery
            : null,
    Ls = [],
    Ag = (e) => {
        document.readyState === "loading"
            ? (Ls.length ||
                  document.addEventListener("DOMContentLoaded", () => {
                      for (const t of Ls) t();
                  }),
              Ls.push(e))
            : e();
    },
    Qe = () => document.documentElement.dir === "rtl",
    Ze = (e) => {
        Ag(() => {
            const t = Of();
            if (t) {
                const n = e.NAME,
                    r = t.fn[n];
                (t.fn[n] = e.jQueryInterface),
                    (t.fn[n].Constructor = e),
                    (t.fn[n].noConflict = () => (
                        (t.fn[n] = r), e.jQueryInterface
                    ));
            }
        });
    },
    wt = (e) => {
        typeof e == "function" && e();
    },
    Pf = (e, t, n = !0) => {
        if (!n) {
            wt(e);
            return;
        }
        const r = 5,
            i = Tg(t) + r;
        let o = !1;
        const s = ({ target: a }) => {
            a === t && ((o = !0), t.removeEventListener(Cl, s), wt(e));
        };
        t.addEventListener(Cl, s),
            setTimeout(() => {
                o || Af(t);
            }, i);
    },
    Ma = (e, t, n, r) => {
        const i = e.length;
        let o = e.indexOf(t);
        return o === -1
            ? !n && r
                ? e[i - 1]
                : e[0]
            : ((o += n ? 1 : -1),
              r && (o = (o + i) % i),
              e[Math.max(0, Math.min(o, i - 1))]);
    },
    kg = /[^.]*(?=\..*)\.|.*/,
    Og = /\..*/,
    Pg = /::\d+$/,
    Ds = {};
let lu = 1;
const bf = { mouseenter: "mouseover", mouseleave: "mouseout" },
    bg = new Set([
        "click",
        "dblclick",
        "mouseup",
        "mousedown",
        "contextmenu",
        "mousewheel",
        "DOMMouseScroll",
        "mouseover",
        "mouseout",
        "mousemove",
        "selectstart",
        "selectend",
        "keydown",
        "keypress",
        "keyup",
        "orientationchange",
        "touchstart",
        "touchmove",
        "touchend",
        "touchcancel",
        "pointerdown",
        "pointermove",
        "pointerup",
        "pointerleave",
        "pointercancel",
        "gesturestart",
        "gesturechange",
        "gestureend",
        "focus",
        "blur",
        "change",
        "reset",
        "select",
        "submit",
        "focusin",
        "focusout",
        "load",
        "unload",
        "beforeunload",
        "resize",
        "move",
        "DOMContentLoaded",
        "readystatechange",
        "error",
        "abort",
        "scroll",
    ]);
function Lf(e, t) {
    return (t && `${t}::${lu++}`) || e.uidEvent || lu++;
}
function Df(e) {
    const t = Lf(e);
    return (e.uidEvent = t), (Ds[t] = Ds[t] || {}), Ds[t];
}
function Lg(e, t) {
    return function n(r) {
        return (
            Fa(r, { delegateTarget: e }),
            n.oneOff && x.off(e, r.type, t),
            t.apply(e, [r])
        );
    };
}
function Dg(e, t, n) {
    return function r(i) {
        const o = e.querySelectorAll(t);
        for (let { target: s } = i; s && s !== this; s = s.parentNode)
            for (const a of o)
                if (a === s)
                    return (
                        Fa(i, { delegateTarget: s }),
                        r.oneOff && x.off(e, i.type, t, n),
                        n.apply(s, [i])
                    );
    };
}
function Rf(e, t, n = null) {
    return Object.values(e).find(
        (r) => r.callable === t && r.delegationSelector === n
    );
}
function If(e, t, n) {
    const r = typeof t == "string",
        i = r ? n : t || n;
    let o = $f(e);
    return bg.has(o) || (o = e), [r, i, o];
}
function au(e, t, n, r, i) {
    if (typeof t != "string" || !e) return;
    let [o, s, a] = If(t, n, r);
    t in bf &&
        (s = ((_) =>
            function (E) {
                if (
                    !E.relatedTarget ||
                    (E.relatedTarget !== E.delegateTarget &&
                        !E.delegateTarget.contains(E.relatedTarget))
                )
                    return _.call(this, E);
            })(s));
    const c = Df(e),
        u = c[a] || (c[a] = {}),
        f = Rf(u, s, o ? n : null);
    if (f) {
        f.oneOff = f.oneOff && i;
        return;
    }
    const h = Lf(s, t.replace(kg, "")),
        v = o ? Dg(e, n, s) : Lg(e, s);
    (v.delegationSelector = o ? n : null),
        (v.callable = s),
        (v.oneOff = i),
        (v.uidEvent = h),
        (u[h] = v),
        e.addEventListener(a, v, o);
}
function xl(e, t, n, r, i) {
    const o = Rf(t[n], r, i);
    !o || (e.removeEventListener(n, o, Boolean(i)), delete t[n][o.uidEvent]);
}
function Rg(e, t, n, r) {
    const i = t[n] || {};
    for (const o of Object.keys(i))
        if (o.includes(r)) {
            const s = i[o];
            xl(e, t, n, s.callable, s.delegationSelector);
        }
}
function $f(e) {
    return (e = e.replace(Og, "")), bf[e] || e;
}
const x = {
    on(e, t, n, r) {
        au(e, t, n, r, !1);
    },
    one(e, t, n, r) {
        au(e, t, n, r, !0);
    },
    off(e, t, n, r) {
        if (typeof t != "string" || !e) return;
        const [i, o, s] = If(t, n, r),
            a = s !== t,
            c = Df(e),
            u = c[s] || {},
            f = t.startsWith(".");
        if (typeof o < "u") {
            if (!Object.keys(u).length) return;
            xl(e, c, s, o, i ? n : null);
            return;
        }
        if (f) for (const h of Object.keys(c)) Rg(e, c, h, t.slice(1));
        for (const h of Object.keys(u)) {
            const v = h.replace(Pg, "");
            if (!a || t.includes(v)) {
                const y = u[h];
                xl(e, c, s, y.callable, y.delegationSelector);
            }
        }
    },
    trigger(e, t, n) {
        if (typeof t != "string" || !e) return null;
        const r = Of(),
            i = $f(t),
            o = t !== i;
        let s = null,
            a = !0,
            c = !0,
            u = !1;
        o &&
            r &&
            ((s = r.Event(t, n)),
            r(e).trigger(s),
            (a = !s.isPropagationStopped()),
            (c = !s.isImmediatePropagationStopped()),
            (u = s.isDefaultPrevented()));
        let f = new Event(t, { bubbles: a, cancelable: !0 });
        return (
            (f = Fa(f, n)),
            u && f.preventDefault(),
            c && e.dispatchEvent(f),
            f.defaultPrevented && s && s.preventDefault(),
            f
        );
    },
};
function Fa(e, t) {
    for (const [n, r] of Object.entries(t || {}))
        try {
            e[n] = r;
        } catch {
            Object.defineProperty(e, n, {
                configurable: !0,
                get() {
                    return r;
                },
            });
        }
    return e;
}
const Mt = new Map(),
    Rs = {
        set(e, t, n) {
            Mt.has(e) || Mt.set(e, new Map());
            const r = Mt.get(e);
            if (!r.has(t) && r.size !== 0) {
                console.error(
                    `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                        Array.from(r.keys())[0]
                    }.`
                );
                return;
            }
            r.set(t, n);
        },
        get(e, t) {
            return (Mt.has(e) && Mt.get(e).get(t)) || null;
        },
        remove(e, t) {
            if (!Mt.has(e)) return;
            const n = Mt.get(e);
            n.delete(t), n.size === 0 && Mt.delete(e);
        },
    };
function cu(e) {
    if (e === "true") return !0;
    if (e === "false") return !1;
    if (e === Number(e).toString()) return Number(e);
    if (e === "" || e === "null") return null;
    if (typeof e != "string") return e;
    try {
        return JSON.parse(decodeURIComponent(e));
    } catch {
        return e;
    }
}
function Is(e) {
    return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Tt = {
    setDataAttribute(e, t, n) {
        e.setAttribute(`data-bs-${Is(t)}`, n);
    },
    removeDataAttribute(e, t) {
        e.removeAttribute(`data-bs-${Is(t)}`);
    },
    getDataAttributes(e) {
        if (!e) return {};
        const t = {},
            n = Object.keys(e.dataset).filter(
                (r) => r.startsWith("bs") && !r.startsWith("bsConfig")
            );
        for (const r of n) {
            let i = r.replace(/^bs/, "");
            (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
                (t[i] = cu(e.dataset[r]));
        }
        return t;
    },
    getDataAttribute(e, t) {
        return cu(e.getAttribute(`data-bs-${Is(t)}`));
    },
};
class xi {
    static get Default() {
        return {};
    }
    static get DefaultType() {
        return {};
    }
    static get NAME() {
        throw new Error(
            'You have to implement the static method "NAME", for each component!'
        );
    }
    _getConfig(t) {
        return (
            (t = this._mergeConfigObj(t)),
            (t = this._configAfterMerge(t)),
            this._typeCheckConfig(t),
            t
        );
    }
    _configAfterMerge(t) {
        return t;
    }
    _mergeConfigObj(t, n) {
        const r = xt(n) ? Tt.getDataAttribute(n, "config") : {};
        return {
            ...this.constructor.Default,
            ...(typeof r == "object" ? r : {}),
            ...(xt(n) ? Tt.getDataAttributes(n) : {}),
            ...(typeof t == "object" ? t : {}),
        };
    }
    _typeCheckConfig(t, n = this.constructor.DefaultType) {
        for (const r of Object.keys(n)) {
            const i = n[r],
                o = t[r],
                s = xt(o) ? "element" : Cg(o);
            if (!new RegExp(i).test(s))
                throw new TypeError(
                    `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${s}" but expected type "${i}".`
                );
        }
    }
}
const Ig = "5.2.3";
class lt extends xi {
    constructor(t, n) {
        super(),
            (t = en(t)),
            t &&
                ((this._element = t),
                (this._config = this._getConfig(n)),
                Rs.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
        Rs.remove(this._element, this.constructor.DATA_KEY),
            x.off(this._element, this.constructor.EVENT_KEY);
        for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
    }
    _queueCallback(t, n, r = !0) {
        Pf(t, n, r);
    }
    _getConfig(t) {
        return (
            (t = this._mergeConfigObj(t, this._element)),
            (t = this._configAfterMerge(t)),
            this._typeCheckConfig(t),
            t
        );
    }
    static getInstance(t) {
        return Rs.get(en(t), this.DATA_KEY);
    }
    static getOrCreateInstance(t, n = {}) {
        return (
            this.getInstance(t) || new this(t, typeof n == "object" ? n : null)
        );
    }
    static get VERSION() {
        return Ig;
    }
    static get DATA_KEY() {
        return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
        return `.${this.DATA_KEY}`;
    }
    static eventName(t) {
        return `${t}${this.EVENT_KEY}`;
    }
}
const is = (e, t = "hide") => {
        const n = `click.dismiss${e.EVENT_KEY}`,
            r = e.NAME;
        x.on(document, n, `[data-bs-dismiss="${r}"]`, function (i) {
            if (
                (["A", "AREA"].includes(this.tagName) && i.preventDefault(),
                tn(this))
            )
                return;
            const o = Ct(this) || this.closest(`.${r}`);
            e.getOrCreateInstance(o)[t]();
        });
    },
    $g = "alert",
    Mg = "bs.alert",
    Mf = `.${Mg}`,
    Fg = `close${Mf}`,
    zg = `closed${Mf}`,
    jg = "fade",
    Bg = "show";
class os extends lt {
    static get NAME() {
        return $g;
    }
    close() {
        if (x.trigger(this._element, Fg).defaultPrevented) return;
        this._element.classList.remove(Bg);
        const n = this._element.classList.contains(jg);
        this._queueCallback(() => this._destroyElement(), this._element, n);
    }
    _destroyElement() {
        this._element.remove(), x.trigger(this._element, zg), this.dispose();
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = os.getOrCreateInstance(this);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
                    throw new TypeError(`No method named "${t}"`);
                n[t](this);
            }
        });
    }
}
is(os, "close");
Ze(os);
const Vg = "button",
    Ug = "bs.button",
    Hg = `.${Ug}`,
    Wg = ".data-api",
    Kg = "active",
    uu = '[data-bs-toggle="button"]',
    Yg = `click${Hg}${Wg}`;
class ss extends lt {
    static get NAME() {
        return Vg;
    }
    toggle() {
        this._element.setAttribute(
            "aria-pressed",
            this._element.classList.toggle(Kg)
        );
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = ss.getOrCreateInstance(this);
            t === "toggle" && n[t]();
        });
    }
}
x.on(document, Yg, uu, (e) => {
    e.preventDefault();
    const t = e.target.closest(uu);
    ss.getOrCreateInstance(t).toggle();
});
Ze(ss);
const j = {
        find(e, t = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(t, e));
        },
        findOne(e, t = document.documentElement) {
            return Element.prototype.querySelector.call(t, e);
        },
        children(e, t) {
            return [].concat(...e.children).filter((n) => n.matches(t));
        },
        parents(e, t) {
            const n = [];
            let r = e.parentNode.closest(t);
            for (; r; ) n.push(r), (r = r.parentNode.closest(t));
            return n;
        },
        prev(e, t) {
            let n = e.previousElementSibling;
            for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.previousElementSibling;
            }
            return [];
        },
        next(e, t) {
            let n = e.nextElementSibling;
            for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.nextElementSibling;
            }
            return [];
        },
        focusableChildren(e) {
            const t = [
                "a",
                "button",
                "input",
                "textarea",
                "select",
                "details",
                "[tabindex]",
                '[contenteditable="true"]',
            ]
                .map((n) => `${n}:not([tabindex^="-"])`)
                .join(",");
            return this.find(t, e).filter((n) => !tn(n) && Cr(n));
        },
    },
    Gg = "swipe",
    xr = ".bs.swipe",
    Qg = `touchstart${xr}`,
    qg = `touchmove${xr}`,
    Xg = `touchend${xr}`,
    Jg = `pointerdown${xr}`,
    Zg = `pointerup${xr}`,
    ev = "touch",
    tv = "pen",
    nv = "pointer-event",
    rv = 40,
    iv = { endCallback: null, leftCallback: null, rightCallback: null },
    ov = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)",
    };
class ko extends xi {
    constructor(t, n) {
        super(),
            (this._element = t),
            !(!t || !ko.isSupported()) &&
                ((this._config = this._getConfig(n)),
                (this._deltaX = 0),
                (this._supportPointerEvents = Boolean(window.PointerEvent)),
                this._initEvents());
    }
    static get Default() {
        return iv;
    }
    static get DefaultType() {
        return ov;
    }
    static get NAME() {
        return Gg;
    }
    dispose() {
        x.off(this._element, xr);
    }
    _start(t) {
        if (!this._supportPointerEvents) {
            this._deltaX = t.touches[0].clientX;
            return;
        }
        this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
    }
    _end(t) {
        this._eventIsPointerPenTouch(t) &&
            (this._deltaX = t.clientX - this._deltaX),
            this._handleSwipe(),
            wt(this._config.endCallback);
    }
    _move(t) {
        this._deltaX =
            t.touches && t.touches.length > 1
                ? 0
                : t.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
        const t = Math.abs(this._deltaX);
        if (t <= rv) return;
        const n = t / this._deltaX;
        (this._deltaX = 0),
            n &&
                wt(
                    n > 0
                        ? this._config.rightCallback
                        : this._config.leftCallback
                );
    }
    _initEvents() {
        this._supportPointerEvents
            ? (x.on(this._element, Jg, (t) => this._start(t)),
              x.on(this._element, Zg, (t) => this._end(t)),
              this._element.classList.add(nv))
            : (x.on(this._element, Qg, (t) => this._start(t)),
              x.on(this._element, qg, (t) => this._move(t)),
              x.on(this._element, Xg, (t) => this._end(t)));
    }
    _eventIsPointerPenTouch(t) {
        return (
            this._supportPointerEvents &&
            (t.pointerType === tv || t.pointerType === ev)
        );
    }
    static isSupported() {
        return (
            "ontouchstart" in document.documentElement ||
            navigator.maxTouchPoints > 0
        );
    }
}
const sv = "carousel",
    lv = "bs.carousel",
    an = `.${lv}`,
    Ff = ".data-api",
    av = "ArrowLeft",
    cv = "ArrowRight",
    uv = 500,
    br = "next",
    Mn = "prev",
    Bn = "left",
    lo = "right",
    dv = `slide${an}`,
    $s = `slid${an}`,
    fv = `keydown${an}`,
    pv = `mouseenter${an}`,
    hv = `mouseleave${an}`,
    mv = `dragstart${an}`,
    gv = `load${an}${Ff}`,
    vv = `click${an}${Ff}`,
    zf = "carousel",
    Mi = "active",
    _v = "slide",
    yv = "carousel-item-end",
    Ev = "carousel-item-start",
    wv = "carousel-item-next",
    Nv = "carousel-item-prev",
    jf = ".active",
    Bf = ".carousel-item",
    Sv = jf + Bf,
    Cv = ".carousel-item img",
    xv = ".carousel-indicators",
    Tv = "[data-bs-slide], [data-bs-slide-to]",
    Av = '[data-bs-ride="carousel"]',
    kv = { [av]: lo, [cv]: Bn },
    Ov = {
        interval: 5e3,
        keyboard: !0,
        pause: "hover",
        ride: !1,
        touch: !0,
        wrap: !0,
    },
    Pv = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean",
    };
class Ti extends lt {
    constructor(t, n) {
        super(t, n),
            (this._interval = null),
            (this._activeElement = null),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this._swipeHelper = null),
            (this._indicatorsElement = j.findOne(xv, this._element)),
            this._addEventListeners(),
            this._config.ride === zf && this.cycle();
    }
    static get Default() {
        return Ov;
    }
    static get DefaultType() {
        return Pv;
    }
    static get NAME() {
        return sv;
    }
    next() {
        this._slide(br);
    }
    nextWhenVisible() {
        !document.hidden && Cr(this._element) && this.next();
    }
    prev() {
        this._slide(Mn);
    }
    pause() {
        this._isSliding && Af(this._element), this._clearInterval();
    }
    cycle() {
        this._clearInterval(),
            this._updateInterval(),
            (this._interval = setInterval(
                () => this.nextWhenVisible(),
                this._config.interval
            ));
    }
    _maybeEnableCycle() {
        if (!!this._config.ride) {
            if (this._isSliding) {
                x.one(this._element, $s, () => this.cycle());
                return;
            }
            this.cycle();
        }
    }
    to(t) {
        const n = this._getItems();
        if (t > n.length - 1 || t < 0) return;
        if (this._isSliding) {
            x.one(this._element, $s, () => this.to(t));
            return;
        }
        const r = this._getItemIndex(this._getActive());
        if (r === t) return;
        const i = t > r ? br : Mn;
        this._slide(i, n[t]);
    }
    dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t) {
        return (t.defaultInterval = t.interval), t;
    }
    _addEventListeners() {
        this._config.keyboard &&
            x.on(this._element, fv, (t) => this._keydown(t)),
            this._config.pause === "hover" &&
                (x.on(this._element, pv, () => this.pause()),
                x.on(this._element, hv, () => this._maybeEnableCycle())),
            this._config.touch &&
                ko.isSupported() &&
                this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
        for (const r of j.find(Cv, this._element))
            x.on(r, mv, (i) => i.preventDefault());
        const n = {
            leftCallback: () => this._slide(this._directionToOrder(Bn)),
            rightCallback: () => this._slide(this._directionToOrder(lo)),
            endCallback: () => {
                this._config.pause === "hover" &&
                    (this.pause(),
                    this.touchTimeout && clearTimeout(this.touchTimeout),
                    (this.touchTimeout = setTimeout(
                        () => this._maybeEnableCycle(),
                        uv + this._config.interval
                    )));
            },
        };
        this._swipeHelper = new ko(this._element, n);
    }
    _keydown(t) {
        if (/input|textarea/i.test(t.target.tagName)) return;
        const n = kv[t.key];
        n && (t.preventDefault(), this._slide(this._directionToOrder(n)));
    }
    _getItemIndex(t) {
        return this._getItems().indexOf(t);
    }
    _setActiveIndicatorElement(t) {
        if (!this._indicatorsElement) return;
        const n = j.findOne(jf, this._indicatorsElement);
        n.classList.remove(Mi), n.removeAttribute("aria-current");
        const r = j.findOne(
            `[data-bs-slide-to="${t}"]`,
            this._indicatorsElement
        );
        r && (r.classList.add(Mi), r.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
        const t = this._activeElement || this._getActive();
        if (!t) return;
        const n = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
        this._config.interval = n || this._config.defaultInterval;
    }
    _slide(t, n = null) {
        if (this._isSliding) return;
        const r = this._getActive(),
            i = t === br,
            o = n || Ma(this._getItems(), r, i, this._config.wrap);
        if (o === r) return;
        const s = this._getItemIndex(o),
            a = (y) =>
                x.trigger(this._element, y, {
                    relatedTarget: o,
                    direction: this._orderToDirection(t),
                    from: this._getItemIndex(r),
                    to: s,
                });
        if (a(dv).defaultPrevented || !r || !o) return;
        const u = Boolean(this._interval);
        this.pause(),
            (this._isSliding = !0),
            this._setActiveIndicatorElement(s),
            (this._activeElement = o);
        const f = i ? Ev : yv,
            h = i ? wv : Nv;
        o.classList.add(h), Ci(o), r.classList.add(f), o.classList.add(f);
        const v = () => {
            o.classList.remove(f, h),
                o.classList.add(Mi),
                r.classList.remove(Mi, h, f),
                (this._isSliding = !1),
                a($s);
        };
        this._queueCallback(v, r, this._isAnimated()), u && this.cycle();
    }
    _isAnimated() {
        return this._element.classList.contains(_v);
    }
    _getActive() {
        return j.findOne(Sv, this._element);
    }
    _getItems() {
        return j.find(Bf, this._element);
    }
    _clearInterval() {
        this._interval &&
            (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(t) {
        return Qe() ? (t === Bn ? Mn : br) : t === Bn ? br : Mn;
    }
    _orderToDirection(t) {
        return Qe() ? (t === Mn ? Bn : lo) : t === Mn ? lo : Bn;
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = Ti.getOrCreateInstance(this, t);
            if (typeof t == "number") {
                n.to(t);
                return;
            }
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
                    throw new TypeError(`No method named "${t}"`);
                n[t]();
            }
        });
    }
}
x.on(document, vv, Tv, function (e) {
    const t = Ct(this);
    if (!t || !t.classList.contains(zf)) return;
    e.preventDefault();
    const n = Ti.getOrCreateInstance(t),
        r = this.getAttribute("data-bs-slide-to");
    if (r) {
        n.to(r), n._maybeEnableCycle();
        return;
    }
    if (Tt.getDataAttribute(this, "slide") === "next") {
        n.next(), n._maybeEnableCycle();
        return;
    }
    n.prev(), n._maybeEnableCycle();
});
x.on(window, gv, () => {
    const e = j.find(Av);
    for (const t of e) Ti.getOrCreateInstance(t);
});
Ze(Ti);
const bv = "collapse",
    Lv = "bs.collapse",
    Ai = `.${Lv}`,
    Dv = ".data-api",
    Rv = `show${Ai}`,
    Iv = `shown${Ai}`,
    $v = `hide${Ai}`,
    Mv = `hidden${Ai}`,
    Fv = `click${Ai}${Dv}`,
    Ms = "show",
    Un = "collapse",
    Fi = "collapsing",
    zv = "collapsed",
    jv = `:scope .${Un} .${Un}`,
    Bv = "collapse-horizontal",
    Vv = "width",
    Uv = "height",
    Hv = ".collapse.show, .collapse.collapsing",
    Tl = '[data-bs-toggle="collapse"]',
    Wv = { parent: null, toggle: !0 },
    Kv = { parent: "(null|element)", toggle: "boolean" };
class ri extends lt {
    constructor(t, n) {
        super(t, n), (this._isTransitioning = !1), (this._triggerArray = []);
        const r = j.find(Tl);
        for (const i of r) {
            const o = Tf(i),
                s = j.find(o).filter((a) => a === this._element);
            o !== null && s.length && this._triggerArray.push(i);
        }
        this._initializeChildren(),
            this._config.parent ||
                this._addAriaAndCollapsedClass(
                    this._triggerArray,
                    this._isShown()
                ),
            this._config.toggle && this.toggle();
    }
    static get Default() {
        return Wv;
    }
    static get DefaultType() {
        return Kv;
    }
    static get NAME() {
        return bv;
    }
    toggle() {
        this._isShown() ? this.hide() : this.show();
    }
    show() {
        if (this._isTransitioning || this._isShown()) return;
        let t = [];
        if (
            (this._config.parent &&
                (t = this._getFirstLevelChildren(Hv)
                    .filter((a) => a !== this._element)
                    .map((a) => ri.getOrCreateInstance(a, { toggle: !1 }))),
            (t.length && t[0]._isTransitioning) ||
                x.trigger(this._element, Rv).defaultPrevented)
        )
            return;
        for (const a of t) a.hide();
        const r = this._getDimension();
        this._element.classList.remove(Un),
            this._element.classList.add(Fi),
            (this._element.style[r] = 0),
            this._addAriaAndCollapsedClass(this._triggerArray, !0),
            (this._isTransitioning = !0);
        const i = () => {
                (this._isTransitioning = !1),
                    this._element.classList.remove(Fi),
                    this._element.classList.add(Un, Ms),
                    (this._element.style[r] = ""),
                    x.trigger(this._element, Iv);
            },
            s = `scroll${r[0].toUpperCase() + r.slice(1)}`;
        this._queueCallback(i, this._element, !0),
            (this._element.style[r] = `${this._element[s]}px`);
    }
    hide() {
        if (
            this._isTransitioning ||
            !this._isShown() ||
            x.trigger(this._element, $v).defaultPrevented
        )
            return;
        const n = this._getDimension();
        (this._element.style[n] = `${
            this._element.getBoundingClientRect()[n]
        }px`),
            Ci(this._element),
            this._element.classList.add(Fi),
            this._element.classList.remove(Un, Ms);
        for (const i of this._triggerArray) {
            const o = Ct(i);
            o && !this._isShown(o) && this._addAriaAndCollapsedClass([i], !1);
        }
        this._isTransitioning = !0;
        const r = () => {
            (this._isTransitioning = !1),
                this._element.classList.remove(Fi),
                this._element.classList.add(Un),
                x.trigger(this._element, Mv);
        };
        (this._element.style[n] = ""),
            this._queueCallback(r, this._element, !0);
    }
    _isShown(t = this._element) {
        return t.classList.contains(Ms);
    }
    _configAfterMerge(t) {
        return (t.toggle = Boolean(t.toggle)), (t.parent = en(t.parent)), t;
    }
    _getDimension() {
        return this._element.classList.contains(Bv) ? Vv : Uv;
    }
    _initializeChildren() {
        if (!this._config.parent) return;
        const t = this._getFirstLevelChildren(Tl);
        for (const n of t) {
            const r = Ct(n);
            r && this._addAriaAndCollapsedClass([n], this._isShown(r));
        }
    }
    _getFirstLevelChildren(t) {
        const n = j.find(jv, this._config.parent);
        return j.find(t, this._config.parent).filter((r) => !n.includes(r));
    }
    _addAriaAndCollapsedClass(t, n) {
        if (!!t.length)
            for (const r of t)
                r.classList.toggle(zv, !n), r.setAttribute("aria-expanded", n);
    }
    static jQueryInterface(t) {
        const n = {};
        return (
            typeof t == "string" && /show|hide/.test(t) && (n.toggle = !1),
            this.each(function () {
                const r = ri.getOrCreateInstance(this, n);
                if (typeof t == "string") {
                    if (typeof r[t] > "u")
                        throw new TypeError(`No method named "${t}"`);
                    r[t]();
                }
            })
        );
    }
}
x.on(document, Fv, Tl, function (e) {
    (e.target.tagName === "A" ||
        (e.delegateTarget && e.delegateTarget.tagName === "A")) &&
        e.preventDefault();
    const t = Tf(this),
        n = j.find(t);
    for (const r of n) ri.getOrCreateInstance(r, { toggle: !1 }).toggle();
});
Ze(ri);
const du = "dropdown",
    Yv = "bs.dropdown",
    Dn = `.${Yv}`,
    za = ".data-api",
    Gv = "Escape",
    fu = "Tab",
    Qv = "ArrowUp",
    pu = "ArrowDown",
    qv = 2,
    Xv = `hide${Dn}`,
    Jv = `hidden${Dn}`,
    Zv = `show${Dn}`,
    e_ = `shown${Dn}`,
    Vf = `click${Dn}${za}`,
    Uf = `keydown${Dn}${za}`,
    t_ = `keyup${Dn}${za}`,
    Vn = "show",
    n_ = "dropup",
    r_ = "dropend",
    i_ = "dropstart",
    o_ = "dropup-center",
    s_ = "dropdown-center",
    _n = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    l_ = `${_n}.${Vn}`,
    ao = ".dropdown-menu",
    a_ = ".navbar",
    c_ = ".navbar-nav",
    u_ = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    d_ = Qe() ? "top-end" : "top-start",
    f_ = Qe() ? "top-start" : "top-end",
    p_ = Qe() ? "bottom-end" : "bottom-start",
    h_ = Qe() ? "bottom-start" : "bottom-end",
    m_ = Qe() ? "left-start" : "right-start",
    g_ = Qe() ? "right-start" : "left-start",
    v_ = "top",
    __ = "bottom",
    y_ = {
        autoClose: !0,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle",
    },
    E_ = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)",
    };
class ht extends lt {
    constructor(t, n) {
        super(t, n),
            (this._popper = null),
            (this._parent = this._element.parentNode),
            (this._menu =
                j.next(this._element, ao)[0] ||
                j.prev(this._element, ao)[0] ||
                j.findOne(ao, this._parent)),
            (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
        return y_;
    }
    static get DefaultType() {
        return E_;
    }
    static get NAME() {
        return du;
    }
    toggle() {
        return this._isShown() ? this.hide() : this.show();
    }
    show() {
        if (tn(this._element) || this._isShown()) return;
        const t = { relatedTarget: this._element };
        if (!x.trigger(this._element, Zv, t).defaultPrevented) {
            if (
                (this._createPopper(),
                "ontouchstart" in document.documentElement &&
                    !this._parent.closest(c_))
            )
                for (const r of [].concat(...document.body.children))
                    x.on(r, "mouseover", Ao);
            this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                this._menu.classList.add(Vn),
                this._element.classList.add(Vn),
                x.trigger(this._element, e_, t);
        }
    }
    hide() {
        if (tn(this._element) || !this._isShown()) return;
        const t = { relatedTarget: this._element };
        this._completeHide(t);
    }
    dispose() {
        this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
        (this._inNavbar = this._detectNavbar()),
            this._popper && this._popper.update();
    }
    _completeHide(t) {
        if (!x.trigger(this._element, Xv, t).defaultPrevented) {
            if ("ontouchstart" in document.documentElement)
                for (const r of [].concat(...document.body.children))
                    x.off(r, "mouseover", Ao);
            this._popper && this._popper.destroy(),
                this._menu.classList.remove(Vn),
                this._element.classList.remove(Vn),
                this._element.setAttribute("aria-expanded", "false"),
                Tt.removeDataAttribute(this._menu, "popper"),
                x.trigger(this._element, Jv, t);
        }
    }
    _getConfig(t) {
        if (
            ((t = super._getConfig(t)),
            typeof t.reference == "object" &&
                !xt(t.reference) &&
                typeof t.reference.getBoundingClientRect != "function")
        )
            throw new TypeError(
                `${du.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
            );
        return t;
    }
    _createPopper() {
        if (typeof Cf > "u")
            throw new TypeError(
                "Bootstrap's dropdowns require Popper (https://popper.js.org)"
            );
        let t = this._element;
        this._config.reference === "parent"
            ? (t = this._parent)
            : xt(this._config.reference)
            ? (t = en(this._config.reference))
            : typeof this._config.reference == "object" &&
              (t = this._config.reference);
        const n = this._getPopperConfig();
        this._popper = $a(t, this._menu, n);
    }
    _isShown() {
        return this._menu.classList.contains(Vn);
    }
    _getPlacement() {
        const t = this._parent;
        if (t.classList.contains(r_)) return m_;
        if (t.classList.contains(i_)) return g_;
        if (t.classList.contains(o_)) return v_;
        if (t.classList.contains(s_)) return __;
        const n =
            getComputedStyle(this._menu)
                .getPropertyValue("--bs-position")
                .trim() === "end";
        return t.classList.contains(n_) ? (n ? f_ : d_) : n ? h_ : p_;
    }
    _detectNavbar() {
        return this._element.closest(a_) !== null;
    }
    _getOffset() {
        const { offset: t } = this._config;
        return typeof t == "string"
            ? t.split(",").map((n) => Number.parseInt(n, 10))
            : typeof t == "function"
            ? (n) => t(n, this._element)
            : t;
    }
    _getPopperConfig() {
        const t = {
            placement: this._getPlacement(),
            modifiers: [
                {
                    name: "preventOverflow",
                    options: { boundary: this._config.boundary },
                },
                { name: "offset", options: { offset: this._getOffset() } },
            ],
        };
        return (
            (this._inNavbar || this._config.display === "static") &&
                (Tt.setDataAttribute(this._menu, "popper", "static"),
                (t.modifiers = [{ name: "applyStyles", enabled: !1 }])),
            {
                ...t,
                ...(typeof this._config.popperConfig == "function"
                    ? this._config.popperConfig(t)
                    : this._config.popperConfig),
            }
        );
    }
    _selectMenuItem({ key: t, target: n }) {
        const r = j.find(u_, this._menu).filter((i) => Cr(i));
        !r.length || Ma(r, n, t === pu, !r.includes(n)).focus();
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = ht.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u")
                    throw new TypeError(`No method named "${t}"`);
                n[t]();
            }
        });
    }
    static clearMenus(t) {
        if (t.button === qv || (t.type === "keyup" && t.key !== fu)) return;
        const n = j.find(l_);
        for (const r of n) {
            const i = ht.getInstance(r);
            if (!i || i._config.autoClose === !1) continue;
            const o = t.composedPath(),
                s = o.includes(i._menu);
            if (
                o.includes(i._element) ||
                (i._config.autoClose === "inside" && !s) ||
                (i._config.autoClose === "outside" && s) ||
                (i._menu.contains(t.target) &&
                    ((t.type === "keyup" && t.key === fu) ||
                        /input|select|option|textarea|form/i.test(
                            t.target.tagName
                        )))
            )
                continue;
            const a = { relatedTarget: i._element };
            t.type === "click" && (a.clickEvent = t), i._completeHide(a);
        }
    }
    static dataApiKeydownHandler(t) {
        const n = /input|textarea/i.test(t.target.tagName),
            r = t.key === Gv,
            i = [Qv, pu].includes(t.key);
        if ((!i && !r) || (n && !r)) return;
        t.preventDefault();
        const o = this.matches(_n)
                ? this
                : j.prev(this, _n)[0] ||
                  j.next(this, _n)[0] ||
                  j.findOne(_n, t.delegateTarget.parentNode),
            s = ht.getOrCreateInstance(o);
        if (i) {
            t.stopPropagation(), s.show(), s._selectMenuItem(t);
            return;
        }
        s._isShown() && (t.stopPropagation(), s.hide(), o.focus());
    }
}
x.on(document, Uf, _n, ht.dataApiKeydownHandler);
x.on(document, Uf, ao, ht.dataApiKeydownHandler);
x.on(document, Vf, ht.clearMenus);
x.on(document, t_, ht.clearMenus);
x.on(document, Vf, _n, function (e) {
    e.preventDefault(), ht.getOrCreateInstance(this).toggle();
});
Ze(ht);
const hu = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    mu = ".sticky-top",
    zi = "padding-right",
    gu = "margin-right";
class Al {
    constructor() {
        this._element = document.body;
    }
    getWidth() {
        const t = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - t);
    }
    hide() {
        const t = this.getWidth();
        this._disableOverFlow(),
            this._setElementAttributes(this._element, zi, (n) => n + t),
            this._setElementAttributes(hu, zi, (n) => n + t),
            this._setElementAttributes(mu, gu, (n) => n - t);
    }
    reset() {
        this._resetElementAttributes(this._element, "overflow"),
            this._resetElementAttributes(this._element, zi),
            this._resetElementAttributes(hu, zi),
            this._resetElementAttributes(mu, gu);
    }
    isOverflowing() {
        return this.getWidth() > 0;
    }
    _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"),
            (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(t, n, r) {
        const i = this.getWidth(),
            o = (s) => {
                if (
                    s !== this._element &&
                    window.innerWidth > s.clientWidth + i
                )
                    return;
                this._saveInitialAttribute(s, n);
                const a = window.getComputedStyle(s).getPropertyValue(n);
                s.style.setProperty(n, `${r(Number.parseFloat(a))}px`);
            };
        this._applyManipulationCallback(t, o);
    }
    _saveInitialAttribute(t, n) {
        const r = t.style.getPropertyValue(n);
        r && Tt.setDataAttribute(t, n, r);
    }
    _resetElementAttributes(t, n) {
        const r = (i) => {
            const o = Tt.getDataAttribute(i, n);
            if (o === null) {
                i.style.removeProperty(n);
                return;
            }
            Tt.removeDataAttribute(i, n), i.style.setProperty(n, o);
        };
        this._applyManipulationCallback(t, r);
    }
    _applyManipulationCallback(t, n) {
        if (xt(t)) {
            n(t);
            return;
        }
        for (const r of j.find(t, this._element)) n(r);
    }
}
const Hf = "backdrop",
    w_ = "fade",
    vu = "show",
    _u = `mousedown.bs.${Hf}`,
    N_ = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: "body",
    },
    S_ = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)",
    };
class Wf extends xi {
    constructor(t) {
        super(),
            (this._config = this._getConfig(t)),
            (this._isAppended = !1),
            (this._element = null);
    }
    static get Default() {
        return N_;
    }
    static get DefaultType() {
        return S_;
    }
    static get NAME() {
        return Hf;
    }
    show(t) {
        if (!this._config.isVisible) {
            wt(t);
            return;
        }
        this._append();
        const n = this._getElement();
        this._config.isAnimated && Ci(n),
            n.classList.add(vu),
            this._emulateAnimation(() => {
                wt(t);
            });
    }
    hide(t) {
        if (!this._config.isVisible) {
            wt(t);
            return;
        }
        this._getElement().classList.remove(vu),
            this._emulateAnimation(() => {
                this.dispose(), wt(t);
            });
    }
    dispose() {
        !this._isAppended ||
            (x.off(this._element, _u),
            this._element.remove(),
            (this._isAppended = !1));
    }
    _getElement() {
        if (!this._element) {
            const t = document.createElement("div");
            (t.className = this._config.className),
                this._config.isAnimated && t.classList.add(w_),
                (this._element = t);
        }
        return this._element;
    }
    _configAfterMerge(t) {
        return (t.rootElement = en(t.rootElement)), t;
    }
    _append() {
        if (this._isAppended) return;
        const t = this._getElement();
        this._config.rootElement.append(t),
            x.on(t, _u, () => {
                wt(this._config.clickCallback);
            }),
            (this._isAppended = !0);
    }
    _emulateAnimation(t) {
        Pf(t, this._getElement(), this._config.isAnimated);
    }
}
const C_ = "focustrap",
    x_ = "bs.focustrap",
    Oo = `.${x_}`,
    T_ = `focusin${Oo}`,
    A_ = `keydown.tab${Oo}`,
    k_ = "Tab",
    O_ = "forward",
    yu = "backward",
    P_ = { autofocus: !0, trapElement: null },
    b_ = { autofocus: "boolean", trapElement: "element" };
class Kf extends xi {
    constructor(t) {
        super(),
            (this._config = this._getConfig(t)),
            (this._isActive = !1),
            (this._lastTabNavDirection = null);
    }
    static get Default() {
        return P_;
    }
    static get DefaultType() {
        return b_;
    }
    static get NAME() {
        return C_;
    }
    activate() {
        this._isActive ||
            (this._config.autofocus && this._config.trapElement.focus(),
            x.off(document, Oo),
            x.on(document, T_, (t) => this._handleFocusin(t)),
            x.on(document, A_, (t) => this._handleKeydown(t)),
            (this._isActive = !0));
    }
    deactivate() {
        !this._isActive || ((this._isActive = !1), x.off(document, Oo));
    }
    _handleFocusin(t) {
        const { trapElement: n } = this._config;
        if (t.target === document || t.target === n || n.contains(t.target))
            return;
        const r = j.focusableChildren(n);
        r.length === 0
            ? n.focus()
            : this._lastTabNavDirection === yu
            ? r[r.length - 1].focus()
            : r[0].focus();
    }
    _handleKeydown(t) {
        t.key === k_ && (this._lastTabNavDirection = t.shiftKey ? yu : O_);
    }
}
const L_ = "modal",
    D_ = "bs.modal",
    at = `.${D_}`,
    R_ = ".data-api",
    I_ = "Escape",
    $_ = `hide${at}`,
    M_ = `hidePrevented${at}`,
    Yf = `hidden${at}`,
    Gf = `show${at}`,
    F_ = `shown${at}`,
    z_ = `resize${at}`,
    j_ = `click.dismiss${at}`,
    B_ = `mousedown.dismiss${at}`,
    V_ = `keydown.dismiss${at}`,
    U_ = `click${at}${R_}`,
    Eu = "modal-open",
    H_ = "fade",
    wu = "show",
    Fs = "modal-static",
    W_ = ".modal.show",
    K_ = ".modal-dialog",
    Y_ = ".modal-body",
    G_ = '[data-bs-toggle="modal"]',
    Q_ = { backdrop: !0, focus: !0, keyboard: !0 },
    q_ = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean",
    };
class pr extends lt {
    constructor(t, n) {
        super(t, n),
            (this._dialog = j.findOne(K_, this._element)),
            (this._backdrop = this._initializeBackDrop()),
            (this._focustrap = this._initializeFocusTrap()),
            (this._isShown = !1),
            (this._isTransitioning = !1),
            (this._scrollBar = new Al()),
            this._addEventListeners();
    }
    static get Default() {
        return Q_;
    }
    static get DefaultType() {
        return q_;
    }
    static get NAME() {
        return L_;
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
        this._isShown ||
            this._isTransitioning ||
            x.trigger(this._element, Gf, { relatedTarget: t })
                .defaultPrevented ||
            ((this._isShown = !0),
            (this._isTransitioning = !0),
            this._scrollBar.hide(),
            document.body.classList.add(Eu),
            this._adjustDialog(),
            this._backdrop.show(() => this._showElement(t)));
    }
    hide() {
        !this._isShown ||
            this._isTransitioning ||
            x.trigger(this._element, $_).defaultPrevented ||
            ((this._isShown = !1),
            (this._isTransitioning = !0),
            this._focustrap.deactivate(),
            this._element.classList.remove(wu),
            this._queueCallback(
                () => this._hideModal(),
                this._element,
                this._isAnimated()
            ));
    }
    dispose() {
        for (const t of [window, this._dialog]) x.off(t, at);
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    handleUpdate() {
        this._adjustDialog();
    }
    _initializeBackDrop() {
        return new Wf({
            isVisible: Boolean(this._config.backdrop),
            isAnimated: this._isAnimated(),
        });
    }
    _initializeFocusTrap() {
        return new Kf({ trapElement: this._element });
    }
    _showElement(t) {
        document.body.contains(this._element) ||
            document.body.append(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            (this._element.scrollTop = 0);
        const n = j.findOne(Y_, this._dialog);
        n && (n.scrollTop = 0),
            Ci(this._element),
            this._element.classList.add(wu);
        const r = () => {
            this._config.focus && this._focustrap.activate(),
                (this._isTransitioning = !1),
                x.trigger(this._element, F_, { relatedTarget: t });
        };
        this._queueCallback(r, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
        x.on(this._element, V_, (t) => {
            if (t.key === I_) {
                if (this._config.keyboard) {
                    t.preventDefault(), this.hide();
                    return;
                }
                this._triggerBackdropTransition();
            }
        }),
            x.on(window, z_, () => {
                this._isShown && !this._isTransitioning && this._adjustDialog();
            }),
            x.on(this._element, B_, (t) => {
                x.one(this._element, j_, (n) => {
                    if (
                        !(
                            this._element !== t.target ||
                            this._element !== n.target
                        )
                    ) {
                        if (this._config.backdrop === "static") {
                            this._triggerBackdropTransition();
                            return;
                        }
                        this._config.backdrop && this.hide();
                    }
                });
            });
    }
    _hideModal() {
        (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            this._element.removeAttribute("role"),
            (this._isTransitioning = !1),
            this._backdrop.hide(() => {
                document.body.classList.remove(Eu),
                    this._resetAdjustments(),
                    this._scrollBar.reset(),
                    x.trigger(this._element, Yf);
            });
    }
    _isAnimated() {
        return this._element.classList.contains(H_);
    }
    _triggerBackdropTransition() {
        if (x.trigger(this._element, M_).defaultPrevented) return;
        const n =
                this._element.scrollHeight >
                document.documentElement.clientHeight,
            r = this._element.style.overflowY;
        r === "hidden" ||
            this._element.classList.contains(Fs) ||
            (n || (this._element.style.overflowY = "hidden"),
            this._element.classList.add(Fs),
            this._queueCallback(() => {
                this._element.classList.remove(Fs),
                    this._queueCallback(() => {
                        this._element.style.overflowY = r;
                    }, this._dialog);
            }, this._dialog),
            this._element.focus());
    }
    _adjustDialog() {
        const t =
                this._element.scrollHeight >
                document.documentElement.clientHeight,
            n = this._scrollBar.getWidth(),
            r = n > 0;
        if (r && !t) {
            const i = Qe() ? "paddingLeft" : "paddingRight";
            this._element.style[i] = `${n}px`;
        }
        if (!r && t) {
            const i = Qe() ? "paddingRight" : "paddingLeft";
            this._element.style[i] = `${n}px`;
        }
    }
    _resetAdjustments() {
        (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
    }
    static jQueryInterface(t, n) {
        return this.each(function () {
            const r = pr.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof r[t] > "u")
                    throw new TypeError(`No method named "${t}"`);
                r[t](n);
            }
        });
    }
}
x.on(document, U_, G_, function (e) {
    const t = Ct(this);
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
        x.one(t, Gf, (i) => {
            i.defaultPrevented ||
                x.one(t, Yf, () => {
                    Cr(this) && this.focus();
                });
        });
    const n = j.findOne(W_);
    n && pr.getInstance(n).hide(), pr.getOrCreateInstance(t).toggle(this);
});
is(pr);
Ze(pr);
const X_ = "offcanvas",
    J_ = "bs.offcanvas",
    Rt = `.${J_}`,
    Qf = ".data-api",
    Z_ = `load${Rt}${Qf}`,
    ey = "Escape",
    Nu = "show",
    Su = "showing",
    Cu = "hiding",
    ty = "offcanvas-backdrop",
    qf = ".offcanvas.show",
    ny = `show${Rt}`,
    ry = `shown${Rt}`,
    iy = `hide${Rt}`,
    xu = `hidePrevented${Rt}`,
    Xf = `hidden${Rt}`,
    oy = `resize${Rt}`,
    sy = `click${Rt}${Qf}`,
    ly = `keydown.dismiss${Rt}`,
    ay = '[data-bs-toggle="offcanvas"]',
    cy = { backdrop: !0, keyboard: !0, scroll: !1 },
    uy = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean",
    };
class nn extends lt {
    constructor(t, n) {
        super(t, n),
            (this._isShown = !1),
            (this._backdrop = this._initializeBackDrop()),
            (this._focustrap = this._initializeFocusTrap()),
            this._addEventListeners();
    }
    static get Default() {
        return cy;
    }
    static get DefaultType() {
        return uy;
    }
    static get NAME() {
        return X_;
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
        if (
            this._isShown ||
            x.trigger(this._element, ny, { relatedTarget: t }).defaultPrevented
        )
            return;
        (this._isShown = !0),
            this._backdrop.show(),
            this._config.scroll || new Al().hide(),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            this._element.classList.add(Su);
        const r = () => {
            (!this._config.scroll || this._config.backdrop) &&
                this._focustrap.activate(),
                this._element.classList.add(Nu),
                this._element.classList.remove(Su),
                x.trigger(this._element, ry, { relatedTarget: t });
        };
        this._queueCallback(r, this._element, !0);
    }
    hide() {
        if (!this._isShown || x.trigger(this._element, iy).defaultPrevented)
            return;
        this._focustrap.deactivate(),
            this._element.blur(),
            (this._isShown = !1),
            this._element.classList.add(Cu),
            this._backdrop.hide();
        const n = () => {
            this._element.classList.remove(Nu, Cu),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._config.scroll || new Al().reset(),
                x.trigger(this._element, Xf);
        };
        this._queueCallback(n, this._element, !0);
    }
    dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
        const t = () => {
                if (this._config.backdrop === "static") {
                    x.trigger(this._element, xu);
                    return;
                }
                this.hide();
            },
            n = Boolean(this._config.backdrop);
        return new Wf({
            className: ty,
            isVisible: n,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: n ? t : null,
        });
    }
    _initializeFocusTrap() {
        return new Kf({ trapElement: this._element });
    }
    _addEventListeners() {
        x.on(this._element, ly, (t) => {
            if (t.key === ey) {
                if (!this._config.keyboard) {
                    x.trigger(this._element, xu);
                    return;
                }
                this.hide();
            }
        });
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = nn.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
                    throw new TypeError(`No method named "${t}"`);
                n[t](this);
            }
        });
    }
}
x.on(document, sy, ay, function (e) {
    const t = Ct(this);
    if ((["A", "AREA"].includes(this.tagName) && e.preventDefault(), tn(this)))
        return;
    x.one(t, Xf, () => {
        Cr(this) && this.focus();
    });
    const n = j.findOne(qf);
    n && n !== t && nn.getInstance(n).hide(),
        nn.getOrCreateInstance(t).toggle(this);
});
x.on(window, Z_, () => {
    for (const e of j.find(qf)) nn.getOrCreateInstance(e).show();
});
x.on(window, oy, () => {
    for (const e of j.find("[aria-modal][class*=show][class*=offcanvas-]"))
        getComputedStyle(e).position !== "fixed" &&
            nn.getOrCreateInstance(e).hide();
});
is(nn);
Ze(nn);
const dy = new Set([
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
    ]),
    fy = /^aria-[\w-]*$/i,
    py = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    hy =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    my = (e, t) => {
        const n = e.nodeName.toLowerCase();
        return t.includes(n)
            ? dy.has(n)
                ? Boolean(py.test(e.nodeValue) || hy.test(e.nodeValue))
                : !0
            : t.filter((r) => r instanceof RegExp).some((r) => r.test(n));
    },
    Jf = {
        "*": ["class", "dir", "id", "lang", "role", fy],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
    };
function gy(e, t, n) {
    if (!e.length) return e;
    if (n && typeof n == "function") return n(e);
    const i = new window.DOMParser().parseFromString(e, "text/html"),
        o = [].concat(...i.body.querySelectorAll("*"));
    for (const s of o) {
        const a = s.nodeName.toLowerCase();
        if (!Object.keys(t).includes(a)) {
            s.remove();
            continue;
        }
        const c = [].concat(...s.attributes),
            u = [].concat(t["*"] || [], t[a] || []);
        for (const f of c) my(f, u) || s.removeAttribute(f.nodeName);
    }
    return i.body.innerHTML;
}
const vy = "TemplateFactory",
    _y = {
        allowList: Jf,
        content: {},
        extraClass: "",
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: "<div></div>",
    },
    yy = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string",
    },
    Ey = {
        entry: "(string|element|function|null)",
        selector: "(string|element)",
    };
class wy extends xi {
    constructor(t) {
        super(), (this._config = this._getConfig(t));
    }
    static get Default() {
        return _y;
    }
    static get DefaultType() {
        return yy;
    }
    static get NAME() {
        return vy;
    }
    getContent() {
        return Object.values(this._config.content)
            .map((t) => this._resolvePossibleFunction(t))
            .filter(Boolean);
    }
    hasContent() {
        return this.getContent().length > 0;
    }
    changeContent(t) {
        return (
            this._checkContent(t),
            (this._config.content = { ...this._config.content, ...t }),
            this
        );
    }
    toHtml() {
        const t = document.createElement("div");
        t.innerHTML = this._maybeSanitize(this._config.template);
        for (const [i, o] of Object.entries(this._config.content))
            this._setContent(t, o, i);
        const n = t.children[0],
            r = this._resolvePossibleFunction(this._config.extraClass);
        return r && n.classList.add(...r.split(" ")), n;
    }
    _typeCheckConfig(t) {
        super._typeCheckConfig(t), this._checkContent(t.content);
    }
    _checkContent(t) {
        for (const [n, r] of Object.entries(t))
            super._typeCheckConfig({ selector: n, entry: r }, Ey);
    }
    _setContent(t, n, r) {
        const i = j.findOne(r, t);
        if (!!i) {
            if (((n = this._resolvePossibleFunction(n)), !n)) {
                i.remove();
                return;
            }
            if (xt(n)) {
                this._putElementInTemplate(en(n), i);
                return;
            }
            if (this._config.html) {
                i.innerHTML = this._maybeSanitize(n);
                return;
            }
            i.textContent = n;
        }
    }
    _maybeSanitize(t) {
        return this._config.sanitize
            ? gy(t, this._config.allowList, this._config.sanitizeFn)
            : t;
    }
    _resolvePossibleFunction(t) {
        return typeof t == "function" ? t(this) : t;
    }
    _putElementInTemplate(t, n) {
        if (this._config.html) {
            (n.innerHTML = ""), n.append(t);
            return;
        }
        n.textContent = t.textContent;
    }
}
const Ny = "tooltip",
    Sy = new Set(["sanitize", "allowList", "sanitizeFn"]),
    zs = "fade",
    Cy = "modal",
    ji = "show",
    xy = ".tooltip-inner",
    Tu = `.${Cy}`,
    Au = "hide.bs.modal",
    Lr = "hover",
    js = "focus",
    Ty = "click",
    Ay = "manual",
    ky = "hide",
    Oy = "hidden",
    Py = "show",
    by = "shown",
    Ly = "inserted",
    Dy = "click",
    Ry = "focusin",
    Iy = "focusout",
    $y = "mouseenter",
    My = "mouseleave",
    Fy = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: Qe() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: Qe() ? "right" : "left",
    },
    zy = {
        allowList: Jf,
        animation: !0,
        boundary: "clippingParents",
        container: !1,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: !1,
        offset: [0, 0],
        placement: "top",
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template:
            '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus",
    },
    jy = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
    };
class Tr extends lt {
    constructor(t, n) {
        if (typeof Cf > "u")
            throw new TypeError(
                "Bootstrap's tooltips require Popper (https://popper.js.org)"
            );
        super(t, n),
            (this._isEnabled = !0),
            (this._timeout = 0),
            (this._isHovered = null),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this._templateFactory = null),
            (this._newContent = null),
            (this.tip = null),
            this._setListeners(),
            this._config.selector || this._fixTitle();
    }
    static get Default() {
        return zy;
    }
    static get DefaultType() {
        return jy;
    }
    static get NAME() {
        return Ny;
    }
    enable() {
        this._isEnabled = !0;
    }
    disable() {
        this._isEnabled = !1;
    }
    toggleEnabled() {
        this._isEnabled = !this._isEnabled;
    }
    toggle() {
        if (!!this._isEnabled) {
            if (
                ((this._activeTrigger.click = !this._activeTrigger.click),
                this._isShown())
            ) {
                this._leave();
                return;
            }
            this._enter();
        }
    }
    dispose() {
        clearTimeout(this._timeout),
            x.off(this._element.closest(Tu), Au, this._hideModalHandler),
            this._element.getAttribute("data-bs-original-title") &&
                this._element.setAttribute(
                    "title",
                    this._element.getAttribute("data-bs-original-title")
                ),
            this._disposePopper(),
            super.dispose();
    }
    show() {
        if (this._element.style.display === "none")
            throw new Error("Please use show on visible elements");
        if (!(this._isWithContent() && this._isEnabled)) return;
        const t = x.trigger(this._element, this.constructor.eventName(Py)),
            r = (
                kf(this._element) || this._element.ownerDocument.documentElement
            ).contains(this._element);
        if (t.defaultPrevented || !r) return;
        this._disposePopper();
        const i = this._getTipElement();
        this._element.setAttribute("aria-describedby", i.getAttribute("id"));
        const { container: o } = this._config;
        if (
            (this._element.ownerDocument.documentElement.contains(this.tip) ||
                (o.append(i),
                x.trigger(this._element, this.constructor.eventName(Ly))),
            (this._popper = this._createPopper(i)),
            i.classList.add(ji),
            "ontouchstart" in document.documentElement)
        )
            for (const a of [].concat(...document.body.children))
                x.on(a, "mouseover", Ao);
        const s = () => {
            x.trigger(this._element, this.constructor.eventName(by)),
                this._isHovered === !1 && this._leave(),
                (this._isHovered = !1);
        };
        this._queueCallback(s, this.tip, this._isAnimated());
    }
    hide() {
        if (
            !this._isShown() ||
            x.trigger(this._element, this.constructor.eventName(ky))
                .defaultPrevented
        )
            return;
        if (
            (this._getTipElement().classList.remove(ji),
            "ontouchstart" in document.documentElement)
        )
            for (const i of [].concat(...document.body.children))
                x.off(i, "mouseover", Ao);
        (this._activeTrigger[Ty] = !1),
            (this._activeTrigger[js] = !1),
            (this._activeTrigger[Lr] = !1),
            (this._isHovered = null);
        const r = () => {
            this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute("aria-describedby"),
                x.trigger(this._element, this.constructor.eventName(Oy)));
        };
        this._queueCallback(r, this.tip, this._isAnimated());
    }
    update() {
        this._popper && this._popper.update();
    }
    _isWithContent() {
        return Boolean(this._getTitle());
    }
    _getTipElement() {
        return (
            this.tip ||
                (this.tip = this._createTipElement(
                    this._newContent || this._getContentForTemplate()
                )),
            this.tip
        );
    }
    _createTipElement(t) {
        const n = this._getTemplateFactory(t).toHtml();
        if (!n) return null;
        n.classList.remove(zs, ji),
            n.classList.add(`bs-${this.constructor.NAME}-auto`);
        const r = xg(this.constructor.NAME).toString();
        return (
            n.setAttribute("id", r),
            this._isAnimated() && n.classList.add(zs),
            n
        );
    }
    setContent(t) {
        (this._newContent = t),
            this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t) {
        return (
            this._templateFactory
                ? this._templateFactory.changeContent(t)
                : (this._templateFactory = new wy({
                      ...this._config,
                      content: t,
                      extraClass: this._resolvePossibleFunction(
                          this._config.customClass
                      ),
                  })),
            this._templateFactory
        );
    }
    _getContentForTemplate() {
        return { [xy]: this._getTitle() };
    }
    _getTitle() {
        return (
            this._resolvePossibleFunction(this._config.title) ||
            this._element.getAttribute("data-bs-original-title")
        );
    }
    _initializeOnDelegatedTarget(t) {
        return this.constructor.getOrCreateInstance(
            t.delegateTarget,
            this._getDelegateConfig()
        );
    }
    _isAnimated() {
        return (
            this._config.animation ||
            (this.tip && this.tip.classList.contains(zs))
        );
    }
    _isShown() {
        return this.tip && this.tip.classList.contains(ji);
    }
    _createPopper(t) {
        const n =
                typeof this._config.placement == "function"
                    ? this._config.placement.call(this, t, this._element)
                    : this._config.placement,
            r = Fy[n.toUpperCase()];
        return $a(this._element, t, this._getPopperConfig(r));
    }
    _getOffset() {
        const { offset: t } = this._config;
        return typeof t == "string"
            ? t.split(",").map((n) => Number.parseInt(n, 10))
            : typeof t == "function"
            ? (n) => t(n, this._element)
            : t;
    }
    _resolvePossibleFunction(t) {
        return typeof t == "function" ? t.call(this._element) : t;
    }
    _getPopperConfig(t) {
        const n = {
            placement: t,
            modifiers: [
                {
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements,
                    },
                },
                { name: "offset", options: { offset: this._getOffset() } },
                {
                    name: "preventOverflow",
                    options: { boundary: this._config.boundary },
                },
                {
                    name: "arrow",
                    options: { element: `.${this.constructor.NAME}-arrow` },
                },
                {
                    name: "preSetPlacement",
                    enabled: !0,
                    phase: "beforeMain",
                    fn: (r) => {
                        this._getTipElement().setAttribute(
                            "data-popper-placement",
                            r.state.placement
                        );
                    },
                },
            ],
        };
        return {
            ...n,
            ...(typeof this._config.popperConfig == "function"
                ? this._config.popperConfig(n)
                : this._config.popperConfig),
        };
    }
    _setListeners() {
        const t = this._config.trigger.split(" ");
        for (const n of t)
            if (n === "click")
                x.on(
                    this._element,
                    this.constructor.eventName(Dy),
                    this._config.selector,
                    (r) => {
                        this._initializeOnDelegatedTarget(r).toggle();
                    }
                );
            else if (n !== Ay) {
                const r =
                        n === Lr
                            ? this.constructor.eventName($y)
                            : this.constructor.eventName(Ry),
                    i =
                        n === Lr
                            ? this.constructor.eventName(My)
                            : this.constructor.eventName(Iy);
                x.on(this._element, r, this._config.selector, (o) => {
                    const s = this._initializeOnDelegatedTarget(o);
                    (s._activeTrigger[o.type === "focusin" ? js : Lr] = !0),
                        s._enter();
                }),
                    x.on(this._element, i, this._config.selector, (o) => {
                        const s = this._initializeOnDelegatedTarget(o);
                        (s._activeTrigger[o.type === "focusout" ? js : Lr] =
                            s._element.contains(o.relatedTarget)),
                            s._leave();
                    });
            }
        (this._hideModalHandler = () => {
            this._element && this.hide();
        }),
            x.on(this._element.closest(Tu), Au, this._hideModalHandler);
    }
    _fixTitle() {
        const t = this._element.getAttribute("title");
        !t ||
            (!this._element.getAttribute("aria-label") &&
                !this._element.textContent.trim() &&
                this._element.setAttribute("aria-label", t),
            this._element.setAttribute("data-bs-original-title", t),
            this._element.removeAttribute("title"));
    }
    _enter() {
        if (this._isShown() || this._isHovered) {
            this._isHovered = !0;
            return;
        }
        (this._isHovered = !0),
            this._setTimeout(() => {
                this._isHovered && this.show();
            }, this._config.delay.show);
    }
    _leave() {
        this._isWithActiveTrigger() ||
            ((this._isHovered = !1),
            this._setTimeout(() => {
                this._isHovered || this.hide();
            }, this._config.delay.hide));
    }
    _setTimeout(t, n) {
        clearTimeout(this._timeout), (this._timeout = setTimeout(t, n));
    }
    _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(t) {
        const n = Tt.getDataAttributes(this._element);
        for (const r of Object.keys(n)) Sy.has(r) && delete n[r];
        return (
            (t = { ...n, ...(typeof t == "object" && t ? t : {}) }),
            (t = this._mergeConfigObj(t)),
            (t = this._configAfterMerge(t)),
            this._typeCheckConfig(t),
            t
        );
    }
    _configAfterMerge(t) {
        return (
            (t.container =
                t.container === !1 ? document.body : en(t.container)),
            typeof t.delay == "number" &&
                (t.delay = { show: t.delay, hide: t.delay }),
            typeof t.title == "number" && (t.title = t.title.toString()),
            typeof t.content == "number" && (t.content = t.content.toString()),
            t
        );
    }
    _getDelegateConfig() {
        const t = {};
        for (const n in this._config)
            this.constructor.Default[n] !== this._config[n] &&
                (t[n] = this._config[n]);
        return (t.selector = !1), (t.trigger = "manual"), t;
    }
    _disposePopper() {
        this._popper && (this._popper.destroy(), (this._popper = null)),
            this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = Tr.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u")
                    throw new TypeError(`No method named "${t}"`);
                n[t]();
            }
        });
    }
}
Ze(Tr);
const By = "popover",
    Vy = ".popover-header",
    Uy = ".popover-body",
    Hy = {
        ...Tr.Default,
        content: "",
        offset: [0, 8],
        placement: "right",
        template:
            '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: "click",
    },
    Wy = { ...Tr.DefaultType, content: "(null|string|element|function)" };
class ja extends Tr {
    static get Default() {
        return Hy;
    }
    static get DefaultType() {
        return Wy;
    }
    static get NAME() {
        return By;
    }
    _isWithContent() {
        return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
        return { [Vy]: this._getTitle(), [Uy]: this._getContent() };
    }
    _getContent() {
        return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = ja.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u")
                    throw new TypeError(`No method named "${t}"`);
                n[t]();
            }
        });
    }
}
Ze(ja);
const Ky = "scrollspy",
    Yy = "bs.scrollspy",
    Ba = `.${Yy}`,
    Gy = ".data-api",
    Qy = `activate${Ba}`,
    ku = `click${Ba}`,
    qy = `load${Ba}${Gy}`,
    Xy = "dropdown-item",
    Fn = "active",
    Jy = '[data-bs-spy="scroll"]',
    Bs = "[href]",
    Zy = ".nav, .list-group",
    Ou = ".nav-link",
    eE = ".nav-item",
    tE = ".list-group-item",
    nE = `${Ou}, ${eE} > ${Ou}, ${tE}`,
    rE = ".dropdown",
    iE = ".dropdown-toggle",
    oE = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: !1,
        target: null,
        threshold: [0.1, 0.5, 1],
    },
    sE = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array",
    };
class ls extends lt {
    constructor(t, n) {
        super(t, n),
            (this._targetLinks = new Map()),
            (this._observableSections = new Map()),
            (this._rootElement =
                getComputedStyle(this._element).overflowY === "visible"
                    ? null
                    : this._element),
            (this._activeTarget = null),
            (this._observer = null),
            (this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0,
            }),
            this.refresh();
    }
    static get Default() {
        return oE;
    }
    static get DefaultType() {
        return sE;
    }
    static get NAME() {
        return Ky;
    }
    refresh() {
        this._initializeTargetsAndObservables(),
            this._maybeEnableSmoothScroll(),
            this._observer
                ? this._observer.disconnect()
                : (this._observer = this._getNewObserver());
        for (const t of this._observableSections.values())
            this._observer.observe(t);
    }
    dispose() {
        this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t) {
        return (
            (t.target = en(t.target) || document.body),
            (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
            typeof t.threshold == "string" &&
                (t.threshold = t.threshold
                    .split(",")
                    .map((n) => Number.parseFloat(n))),
            t
        );
    }
    _maybeEnableSmoothScroll() {
        !this._config.smoothScroll ||
            (x.off(this._config.target, ku),
            x.on(this._config.target, ku, Bs, (t) => {
                const n = this._observableSections.get(t.target.hash);
                if (n) {
                    t.preventDefault();
                    const r = this._rootElement || window,
                        i = n.offsetTop - this._element.offsetTop;
                    if (r.scrollTo) {
                        r.scrollTo({ top: i, behavior: "smooth" });
                        return;
                    }
                    r.scrollTop = i;
                }
            }));
    }
    _getNewObserver() {
        const t = {
            root: this._rootElement,
            threshold: this._config.threshold,
            rootMargin: this._config.rootMargin,
        };
        return new IntersectionObserver((n) => this._observerCallback(n), t);
    }
    _observerCallback(t) {
        const n = (s) => this._targetLinks.get(`#${s.target.id}`),
            r = (s) => {
                (this._previousScrollData.visibleEntryTop = s.target.offsetTop),
                    this._process(n(s));
            },
            i = (this._rootElement || document.documentElement).scrollTop,
            o = i >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = i;
        for (const s of t) {
            if (!s.isIntersecting) {
                (this._activeTarget = null), this._clearActiveClass(n(s));
                continue;
            }
            const a =
                s.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (o && a) {
                if ((r(s), !i)) return;
                continue;
            }
            !o && !a && r(s);
        }
    }
    _initializeTargetsAndObservables() {
        (this._targetLinks = new Map()), (this._observableSections = new Map());
        const t = j.find(Bs, this._config.target);
        for (const n of t) {
            if (!n.hash || tn(n)) continue;
            const r = j.findOne(n.hash, this._element);
            Cr(r) &&
                (this._targetLinks.set(n.hash, n),
                this._observableSections.set(n.hash, r));
        }
    }
    _process(t) {
        this._activeTarget !== t &&
            (this._clearActiveClass(this._config.target),
            (this._activeTarget = t),
            t.classList.add(Fn),
            this._activateParents(t),
            x.trigger(this._element, Qy, { relatedTarget: t }));
    }
    _activateParents(t) {
        if (t.classList.contains(Xy)) {
            j.findOne(iE, t.closest(rE)).classList.add(Fn);
            return;
        }
        for (const n of j.parents(t, Zy))
            for (const r of j.prev(n, nE)) r.classList.add(Fn);
    }
    _clearActiveClass(t) {
        t.classList.remove(Fn);
        const n = j.find(`${Bs}.${Fn}`, t);
        for (const r of n) r.classList.remove(Fn);
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = ls.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
                    throw new TypeError(`No method named "${t}"`);
                n[t]();
            }
        });
    }
}
x.on(window, qy, () => {
    for (const e of j.find(Jy)) ls.getOrCreateInstance(e);
});
Ze(ls);
const lE = "tab",
    aE = "bs.tab",
    Rn = `.${aE}`,
    cE = `hide${Rn}`,
    uE = `hidden${Rn}`,
    dE = `show${Rn}`,
    fE = `shown${Rn}`,
    pE = `click${Rn}`,
    hE = `keydown${Rn}`,
    mE = `load${Rn}`,
    gE = "ArrowLeft",
    Pu = "ArrowRight",
    vE = "ArrowUp",
    bu = "ArrowDown",
    yn = "active",
    Lu = "fade",
    Vs = "show",
    _E = "dropdown",
    yE = ".dropdown-toggle",
    EE = ".dropdown-menu",
    Us = ":not(.dropdown-toggle)",
    wE = '.list-group, .nav, [role="tablist"]',
    NE = ".nav-item, .list-group-item",
    SE = `.nav-link${Us}, .list-group-item${Us}, [role="tab"]${Us}`,
    Zf =
        '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    Hs = `${SE}, ${Zf}`,
    CE = `.${yn}[data-bs-toggle="tab"], .${yn}[data-bs-toggle="pill"], .${yn}[data-bs-toggle="list"]`;
class hr extends lt {
    constructor(t) {
        super(t),
            (this._parent = this._element.closest(wE)),
            this._parent &&
                (this._setInitialAttributes(this._parent, this._getChildren()),
                x.on(this._element, hE, (n) => this._keydown(n)));
    }
    static get NAME() {
        return lE;
    }
    show() {
        const t = this._element;
        if (this._elemIsActive(t)) return;
        const n = this._getActiveElem(),
            r = n ? x.trigger(n, cE, { relatedTarget: t }) : null;
        x.trigger(t, dE, { relatedTarget: n }).defaultPrevented ||
            (r && r.defaultPrevented) ||
            (this._deactivate(n, t), this._activate(t, n));
    }
    _activate(t, n) {
        if (!t) return;
        t.classList.add(yn), this._activate(Ct(t));
        const r = () => {
            if (t.getAttribute("role") !== "tab") {
                t.classList.add(Vs);
                return;
            }
            t.removeAttribute("tabindex"),
                t.setAttribute("aria-selected", !0),
                this._toggleDropDown(t, !0),
                x.trigger(t, fE, { relatedTarget: n });
        };
        this._queueCallback(r, t, t.classList.contains(Lu));
    }
    _deactivate(t, n) {
        if (!t) return;
        t.classList.remove(yn), t.blur(), this._deactivate(Ct(t));
        const r = () => {
            if (t.getAttribute("role") !== "tab") {
                t.classList.remove(Vs);
                return;
            }
            t.setAttribute("aria-selected", !1),
                t.setAttribute("tabindex", "-1"),
                this._toggleDropDown(t, !1),
                x.trigger(t, uE, { relatedTarget: n });
        };
        this._queueCallback(r, t, t.classList.contains(Lu));
    }
    _keydown(t) {
        if (![gE, Pu, vE, bu].includes(t.key)) return;
        t.stopPropagation(), t.preventDefault();
        const n = [Pu, bu].includes(t.key),
            r = Ma(
                this._getChildren().filter((i) => !tn(i)),
                t.target,
                n,
                !0
            );
        r && (r.focus({ preventScroll: !0 }), hr.getOrCreateInstance(r).show());
    }
    _getChildren() {
        return j.find(Hs, this._parent);
    }
    _getActiveElem() {
        return this._getChildren().find((t) => this._elemIsActive(t)) || null;
    }
    _setInitialAttributes(t, n) {
        this._setAttributeIfNotExists(t, "role", "tablist");
        for (const r of n) this._setInitialAttributesOnChild(r);
    }
    _setInitialAttributesOnChild(t) {
        t = this._getInnerElement(t);
        const n = this._elemIsActive(t),
            r = this._getOuterElement(t);
        t.setAttribute("aria-selected", n),
            r !== t && this._setAttributeIfNotExists(r, "role", "presentation"),
            n || t.setAttribute("tabindex", "-1"),
            this._setAttributeIfNotExists(t, "role", "tab"),
            this._setInitialAttributesOnTargetPanel(t);
    }
    _setInitialAttributesOnTargetPanel(t) {
        const n = Ct(t);
        !n ||
            (this._setAttributeIfNotExists(n, "role", "tabpanel"),
            t.id &&
                this._setAttributeIfNotExists(
                    n,
                    "aria-labelledby",
                    `#${t.id}`
                ));
    }
    _toggleDropDown(t, n) {
        const r = this._getOuterElement(t);
        if (!r.classList.contains(_E)) return;
        const i = (o, s) => {
            const a = j.findOne(o, r);
            a && a.classList.toggle(s, n);
        };
        i(yE, yn), i(EE, Vs), r.setAttribute("aria-expanded", n);
    }
    _setAttributeIfNotExists(t, n, r) {
        t.hasAttribute(n) || t.setAttribute(n, r);
    }
    _elemIsActive(t) {
        return t.classList.contains(yn);
    }
    _getInnerElement(t) {
        return t.matches(Hs) ? t : j.findOne(Hs, t);
    }
    _getOuterElement(t) {
        return t.closest(NE) || t;
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = hr.getOrCreateInstance(this);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
                    throw new TypeError(`No method named "${t}"`);
                n[t]();
            }
        });
    }
}
x.on(document, pE, Zf, function (e) {
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
        !tn(this) && hr.getOrCreateInstance(this).show();
});
x.on(window, mE, () => {
    for (const e of j.find(CE)) hr.getOrCreateInstance(e);
});
Ze(hr);
const xE = "toast",
    TE = "bs.toast",
    cn = `.${TE}`,
    AE = `mouseover${cn}`,
    kE = `mouseout${cn}`,
    OE = `focusin${cn}`,
    PE = `focusout${cn}`,
    bE = `hide${cn}`,
    LE = `hidden${cn}`,
    DE = `show${cn}`,
    RE = `shown${cn}`,
    IE = "fade",
    Du = "hide",
    Bi = "show",
    Vi = "showing",
    $E = { animation: "boolean", autohide: "boolean", delay: "number" },
    ME = { animation: !0, autohide: !0, delay: 5e3 };
class as extends lt {
    constructor(t, n) {
        super(t, n),
            (this._timeout = null),
            (this._hasMouseInteraction = !1),
            (this._hasKeyboardInteraction = !1),
            this._setListeners();
    }
    static get Default() {
        return ME;
    }
    static get DefaultType() {
        return $E;
    }
    static get NAME() {
        return xE;
    }
    show() {
        if (x.trigger(this._element, DE).defaultPrevented) return;
        this._clearTimeout(),
            this._config.animation && this._element.classList.add(IE);
        const n = () => {
            this._element.classList.remove(Vi),
                x.trigger(this._element, RE),
                this._maybeScheduleHide();
        };
        this._element.classList.remove(Du),
            Ci(this._element),
            this._element.classList.add(Bi, Vi),
            this._queueCallback(n, this._element, this._config.animation);
    }
    hide() {
        if (!this.isShown() || x.trigger(this._element, bE).defaultPrevented)
            return;
        const n = () => {
            this._element.classList.add(Du),
                this._element.classList.remove(Vi, Bi),
                x.trigger(this._element, LE);
        };
        this._element.classList.add(Vi),
            this._queueCallback(n, this._element, this._config.animation);
    }
    dispose() {
        this._clearTimeout(),
            this.isShown() && this._element.classList.remove(Bi),
            super.dispose();
    }
    isShown() {
        return this._element.classList.contains(Bi);
    }
    _maybeScheduleHide() {
        !this._config.autohide ||
            this._hasMouseInteraction ||
            this._hasKeyboardInteraction ||
            (this._timeout = setTimeout(() => {
                this.hide();
            }, this._config.delay));
    }
    _onInteraction(t, n) {
        switch (t.type) {
            case "mouseover":
            case "mouseout": {
                this._hasMouseInteraction = n;
                break;
            }
            case "focusin":
            case "focusout": {
                this._hasKeyboardInteraction = n;
                break;
            }
        }
        if (n) {
            this._clearTimeout();
            return;
        }
        const r = t.relatedTarget;
        this._element === r ||
            this._element.contains(r) ||
            this._maybeScheduleHide();
    }
    _setListeners() {
        x.on(this._element, AE, (t) => this._onInteraction(t, !0)),
            x.on(this._element, kE, (t) => this._onInteraction(t, !1)),
            x.on(this._element, OE, (t) => this._onInteraction(t, !0)),
            x.on(this._element, PE, (t) => this._onInteraction(t, !1));
    }
    _clearTimeout() {
        clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
        return this.each(function () {
            const n = as.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u")
                    throw new TypeError(`No method named "${t}"`);
                n[t](this);
            }
        });
    }
}
is(as);
Ze(as);
function ep(e, t) {
    return function () {
        return e.apply(t, arguments);
    };
}
const { toString: tp } = Object.prototype,
    { getPrototypeOf: Va } = Object,
    Ua = ((e) => (t) => {
        const n = tp.call(t);
        return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    It = (e) => ((e = e.toLowerCase()), (t) => Ua(t) === e),
    cs = (e) => (t) => typeof t === e,
    { isArray: Ar } = Array,
    ii = cs("undefined");
function FE(e) {
    return (
        e !== null &&
        !ii(e) &&
        e.constructor !== null &&
        !ii(e.constructor) &&
        rn(e.constructor.isBuffer) &&
        e.constructor.isBuffer(e)
    );
}
const np = It("ArrayBuffer");
function zE(e) {
    let t;
    return (
        typeof ArrayBuffer < "u" && ArrayBuffer.isView
            ? (t = ArrayBuffer.isView(e))
            : (t = e && e.buffer && np(e.buffer)),
        t
    );
}
const jE = cs("string"),
    rn = cs("function"),
    rp = cs("number"),
    Ha = (e) => e !== null && typeof e == "object",
    BE = (e) => e === !0 || e === !1,
    co = (e) => {
        if (Ua(e) !== "object") return !1;
        const t = Va(e);
        return (
            (t === null ||
                t === Object.prototype ||
                Object.getPrototypeOf(t) === null) &&
            !(Symbol.toStringTag in e) &&
            !(Symbol.iterator in e)
        );
    },
    VE = It("Date"),
    UE = It("File"),
    HE = It("Blob"),
    WE = It("FileList"),
    KE = (e) => Ha(e) && rn(e.pipe),
    YE = (e) => {
        const t = "[object FormData]";
        return (
            e &&
            ((typeof FormData == "function" && e instanceof FormData) ||
                tp.call(e) === t ||
                (rn(e.toString) && e.toString() === t))
        );
    },
    GE = It("URLSearchParams"),
    QE = (e) =>
        e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ki(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > "u") return;
    let r, i;
    if ((typeof e != "object" && (e = [e]), Ar(e)))
        for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
    else {
        const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
            s = o.length;
        let a;
        for (r = 0; r < s; r++) (a = o[r]), t.call(null, e[a], a, e);
    }
}
function ip(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
        i;
    for (; r-- > 0; ) if (((i = n[r]), t === i.toLowerCase())) return i;
    return null;
}
const op = (() =>
        typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
            ? self
            : typeof window < "u"
            ? window
            : global)(),
    sp = (e) => !ii(e) && e !== op;
function kl() {
    const { caseless: e } = (sp(this) && this) || {},
        t = {},
        n = (r, i) => {
            const o = (e && ip(t, i)) || i;
            co(t[o]) && co(r)
                ? (t[o] = kl(t[o], r))
                : co(r)
                ? (t[o] = kl({}, r))
                : Ar(r)
                ? (t[o] = r.slice())
                : (t[o] = r);
        };
    for (let r = 0, i = arguments.length; r < i; r++)
        arguments[r] && ki(arguments[r], n);
    return t;
}
const qE = (e, t, n, { allOwnKeys: r } = {}) => (
        ki(
            t,
            (i, o) => {
                n && rn(i) ? (e[o] = ep(i, n)) : (e[o] = i);
            },
            { allOwnKeys: r }
        ),
        e
    ),
    XE = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    JE = (e, t, n, r) => {
        (e.prototype = Object.create(t.prototype, r)),
            (e.prototype.constructor = e),
            Object.defineProperty(e, "super", { value: t.prototype }),
            n && Object.assign(e.prototype, n);
    },
    ZE = (e, t, n, r) => {
        let i, o, s;
        const a = {};
        if (((t = t || {}), e == null)) return t;
        do {
            for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
                (s = i[o]),
                    (!r || r(s, e, t)) && !a[s] && ((t[s] = e[s]), (a[s] = !0));
            e = n !== !1 && Va(e);
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t;
    },
    e0 = (e, t, n) => {
        (e = String(e)),
            (n === void 0 || n > e.length) && (n = e.length),
            (n -= t.length);
        const r = e.indexOf(t, n);
        return r !== -1 && r === n;
    },
    t0 = (e) => {
        if (!e) return null;
        if (Ar(e)) return e;
        let t = e.length;
        if (!rp(t)) return null;
        const n = new Array(t);
        for (; t-- > 0; ) n[t] = e[t];
        return n;
    },
    n0 = (
        (e) => (t) =>
            e && t instanceof e
    )(typeof Uint8Array < "u" && Va(Uint8Array)),
    r0 = (e, t) => {
        const r = (e && e[Symbol.iterator]).call(e);
        let i;
        for (; (i = r.next()) && !i.done; ) {
            const o = i.value;
            t.call(e, o[0], o[1]);
        }
    },
    i0 = (e, t) => {
        let n;
        const r = [];
        for (; (n = e.exec(t)) !== null; ) r.push(n);
        return r;
    },
    o0 = It("HTMLFormElement"),
    s0 = (e) =>
        e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, i) {
            return r.toUpperCase() + i;
        }),
    Ru = (
        ({ hasOwnProperty: e }) =>
        (t, n) =>
            e.call(t, n)
    )(Object.prototype),
    l0 = It("RegExp"),
    lp = (e, t) => {
        const n = Object.getOwnPropertyDescriptors(e),
            r = {};
        ki(n, (i, o) => {
            t(i, o, e) !== !1 && (r[o] = i);
        }),
            Object.defineProperties(e, r);
    },
    a0 = (e) => {
        lp(e, (t, n) => {
            if (rn(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
                return !1;
            const r = e[n];
            if (!!rn(r)) {
                if (((t.enumerable = !1), "writable" in t)) {
                    t.writable = !1;
                    return;
                }
                t.set ||
                    (t.set = () => {
                        throw Error(
                            "Can not rewrite read-only method '" + n + "'"
                        );
                    });
            }
        });
    },
    c0 = (e, t) => {
        const n = {},
            r = (i) => {
                i.forEach((o) => {
                    n[o] = !0;
                });
            };
        return Ar(e) ? r(e) : r(String(e).split(t)), n;
    },
    u0 = () => {},
    d0 = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
    Ws = "abcdefghijklmnopqrstuvwxyz",
    Iu = "0123456789",
    ap = { DIGIT: Iu, ALPHA: Ws, ALPHA_DIGIT: Ws + Ws.toUpperCase() + Iu },
    f0 = (e = 16, t = ap.ALPHA_DIGIT) => {
        let n = "";
        const { length: r } = t;
        for (; e--; ) n += t[(Math.random() * r) | 0];
        return n;
    };
function p0(e) {
    return !!(
        e &&
        rn(e.append) &&
        e[Symbol.toStringTag] === "FormData" &&
        e[Symbol.iterator]
    );
}
const h0 = (e) => {
        const t = new Array(10),
            n = (r, i) => {
                if (Ha(r)) {
                    if (t.indexOf(r) >= 0) return;
                    if (!("toJSON" in r)) {
                        t[i] = r;
                        const o = Ar(r) ? [] : {};
                        return (
                            ki(r, (s, a) => {
                                const c = n(s, i + 1);
                                !ii(c) && (o[a] = c);
                            }),
                            (t[i] = void 0),
                            o
                        );
                    }
                }
                return r;
            };
        return n(e, 0);
    },
    N = {
        isArray: Ar,
        isArrayBuffer: np,
        isBuffer: FE,
        isFormData: YE,
        isArrayBufferView: zE,
        isString: jE,
        isNumber: rp,
        isBoolean: BE,
        isObject: Ha,
        isPlainObject: co,
        isUndefined: ii,
        isDate: VE,
        isFile: UE,
        isBlob: HE,
        isRegExp: l0,
        isFunction: rn,
        isStream: KE,
        isURLSearchParams: GE,
        isTypedArray: n0,
        isFileList: WE,
        forEach: ki,
        merge: kl,
        extend: qE,
        trim: QE,
        stripBOM: XE,
        inherits: JE,
        toFlatObject: ZE,
        kindOf: Ua,
        kindOfTest: It,
        endsWith: e0,
        toArray: t0,
        forEachEntry: r0,
        matchAll: i0,
        isHTMLForm: o0,
        hasOwnProperty: Ru,
        hasOwnProp: Ru,
        reduceDescriptors: lp,
        freezeMethods: a0,
        toObjectSet: c0,
        toCamelCase: s0,
        noop: u0,
        toFiniteNumber: d0,
        findKey: ip,
        global: op,
        isContextDefined: sp,
        ALPHABET: ap,
        generateString: f0,
        isSpecCompliantForm: p0,
        toJSONObject: h0,
    };
function H(e, t, n, r, i) {
    Error.call(this),
        Error.captureStackTrace
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = new Error().stack),
        (this.message = e),
        (this.name = "AxiosError"),
        t && (this.code = t),
        n && (this.config = n),
        r && (this.request = r),
        i && (this.response = i);
}
N.inherits(H, Error, {
    toJSON: function () {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: N.toJSONObject(this.config),
            code: this.code,
            status:
                this.response && this.response.status
                    ? this.response.status
                    : null,
        };
    },
});
const cp = H.prototype,
    up = {};
[
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL",
].forEach((e) => {
    up[e] = { value: e };
});
Object.defineProperties(H, up);
Object.defineProperty(cp, "isAxiosError", { value: !0 });
H.from = (e, t, n, r, i, o) => {
    const s = Object.create(cp);
    return (
        N.toFlatObject(
            e,
            s,
            function (c) {
                return c !== Error.prototype;
            },
            (a) => a !== "isAxiosError"
        ),
        H.call(s, e.message, t, n, r, i),
        (s.cause = e),
        (s.name = e.name),
        o && Object.assign(s, o),
        s
    );
};
const m0 = null;
function Ol(e) {
    return N.isPlainObject(e) || N.isArray(e);
}
function dp(e) {
    return N.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function $u(e, t, n) {
    return e
        ? e
              .concat(t)
              .map(function (i, o) {
                  return (i = dp(i)), !n && o ? "[" + i + "]" : i;
              })
              .join(n ? "." : "")
        : t;
}
function g0(e) {
    return N.isArray(e) && !e.some(Ol);
}
const v0 = N.toFlatObject(N, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
});
function us(e, t, n) {
    if (!N.isObject(e)) throw new TypeError("target must be an object");
    (t = t || new FormData()),
        (n = N.toFlatObject(
            n,
            { metaTokens: !0, dots: !1, indexes: !1 },
            !1,
            function (E, P) {
                return !N.isUndefined(P[E]);
            }
        ));
    const r = n.metaTokens,
        i = n.visitor || f,
        o = n.dots,
        s = n.indexes,
        c = (n.Blob || (typeof Blob < "u" && Blob)) && N.isSpecCompliantForm(t);
    if (!N.isFunction(i)) throw new TypeError("visitor must be a function");
    function u(_) {
        if (_ === null) return "";
        if (N.isDate(_)) return _.toISOString();
        if (!c && N.isBlob(_))
            throw new H("Blob is not supported. Use a Buffer instead.");
        return N.isArrayBuffer(_) || N.isTypedArray(_)
            ? c && typeof Blob == "function"
                ? new Blob([_])
                : Buffer.from(_)
            : _;
    }
    function f(_, E, P) {
        let m = _;
        if (_ && !P && typeof _ == "object") {
            if (N.endsWith(E, "{}"))
                (E = r ? E : E.slice(0, -2)), (_ = JSON.stringify(_));
            else if (
                (N.isArray(_) && g0(_)) ||
                ((N.isFileList(_) || N.endsWith(E, "[]")) && (m = N.toArray(_)))
            )
                return (
                    (E = dp(E)),
                    m.forEach(function (g, w) {
                        !(N.isUndefined(g) || g === null) &&
                            t.append(
                                s === !0
                                    ? $u([E], w, o)
                                    : s === null
                                    ? E
                                    : E + "[]",
                                u(g)
                            );
                    }),
                    !1
                );
        }
        return Ol(_) ? !0 : (t.append($u(P, E, o), u(_)), !1);
    }
    const h = [],
        v = Object.assign(v0, {
            defaultVisitor: f,
            convertValue: u,
            isVisitable: Ol,
        });
    function y(_, E) {
        if (!N.isUndefined(_)) {
            if (h.indexOf(_) !== -1)
                throw Error("Circular reference detected in " + E.join("."));
            h.push(_),
                N.forEach(_, function (m, p) {
                    (!(N.isUndefined(m) || m === null) &&
                        i.call(t, m, N.isString(p) ? p.trim() : p, E, v)) ===
                        !0 && y(m, E ? E.concat(p) : [p]);
                }),
                h.pop();
        }
    }
    if (!N.isObject(e)) throw new TypeError("data must be an object");
    return y(e), t;
}
function Mu(e) {
    const t = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0",
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
        return t[r];
    });
}
function Wa(e, t) {
    (this._pairs = []), e && us(e, this, t);
}
const fp = Wa.prototype;
fp.append = function (t, n) {
    this._pairs.push([t, n]);
};
fp.toString = function (t) {
    const n = t
        ? function (r) {
              return t.call(this, r, Mu);
          }
        : Mu;
    return this._pairs
        .map(function (i) {
            return n(i[0]) + "=" + n(i[1]);
        }, "")
        .join("&");
};
function _0(e) {
    return encodeURIComponent(e)
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
}
function pp(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || _0,
        i = n && n.serialize;
    let o;
    if (
        (i
            ? (o = i(t, n))
            : (o = N.isURLSearchParams(t)
                  ? t.toString()
                  : new Wa(t, n).toString(r)),
        o)
    ) {
        const s = e.indexOf("#");
        s !== -1 && (e = e.slice(0, s)),
            (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
    }
    return e;
}
class y0 {
    constructor() {
        this.handlers = [];
    }
    use(t, n, r) {
        return (
            this.handlers.push({
                fulfilled: t,
                rejected: n,
                synchronous: r ? r.synchronous : !1,
                runWhen: r ? r.runWhen : null,
            }),
            this.handlers.length - 1
        );
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null);
    }
    clear() {
        this.handlers && (this.handlers = []);
    }
    forEach(t) {
        N.forEach(this.handlers, function (r) {
            r !== null && t(r);
        });
    }
}
const Fu = y0,
    hp = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1,
    },
    E0 = typeof URLSearchParams < "u" ? URLSearchParams : Wa,
    w0 = typeof FormData < "u" ? FormData : null,
    N0 = typeof Blob < "u" ? Blob : null,
    S0 = (() => {
        let e;
        return typeof navigator < "u" &&
            ((e = navigator.product) === "ReactNative" ||
                e === "NativeScript" ||
                e === "NS")
            ? !1
            : typeof window < "u" && typeof document < "u";
    })(),
    C0 = (() =>
        typeof WorkerGlobalScope < "u" &&
        self instanceof WorkerGlobalScope &&
        typeof self.importScripts == "function")(),
    ft = {
        isBrowser: !0,
        classes: { URLSearchParams: E0, FormData: w0, Blob: N0 },
        isStandardBrowserEnv: S0,
        isStandardBrowserWebWorkerEnv: C0,
        protocols: ["http", "https", "file", "blob", "url", "data"],
    };
function x0(e, t) {
    return us(
        e,
        new ft.classes.URLSearchParams(),
        Object.assign(
            {
                visitor: function (n, r, i, o) {
                    return ft.isNode && N.isBuffer(n)
                        ? (this.append(r, n.toString("base64")), !1)
                        : o.defaultVisitor.apply(this, arguments);
                },
            },
            t
        )
    );
}
function T0(e) {
    return N.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
        t[0] === "[]" ? "" : t[1] || t[0]
    );
}
function A0(e) {
    const t = {},
        n = Object.keys(e);
    let r;
    const i = n.length;
    let o;
    for (r = 0; r < i; r++) (o = n[r]), (t[o] = e[o]);
    return t;
}
function mp(e) {
    function t(n, r, i, o) {
        let s = n[o++];
        const a = Number.isFinite(+s),
            c = o >= n.length;
        return (
            (s = !s && N.isArray(i) ? i.length : s),
            c
                ? (N.hasOwnProp(i, s) ? (i[s] = [i[s], r]) : (i[s] = r), !a)
                : ((!i[s] || !N.isObject(i[s])) && (i[s] = []),
                  t(n, r, i[s], o) && N.isArray(i[s]) && (i[s] = A0(i[s])),
                  !a)
        );
    }
    if (N.isFormData(e) && N.isFunction(e.entries)) {
        const n = {};
        return (
            N.forEachEntry(e, (r, i) => {
                t(T0(r), i, n, 0);
            }),
            n
        );
    }
    return null;
}
const k0 = { "Content-Type": void 0 };
function O0(e, t, n) {
    if (N.isString(e))
        try {
            return (t || JSON.parse)(e), N.trim(e);
        } catch (r) {
            if (r.name !== "SyntaxError") throw r;
        }
    return (n || JSON.stringify)(e);
}
const ds = {
    transitional: hp,
    adapter: ["xhr", "http"],
    transformRequest: [
        function (t, n) {
            const r = n.getContentType() || "",
                i = r.indexOf("application/json") > -1,
                o = N.isObject(t);
            if (
                (o && N.isHTMLForm(t) && (t = new FormData(t)), N.isFormData(t))
            )
                return i && i ? JSON.stringify(mp(t)) : t;
            if (
                N.isArrayBuffer(t) ||
                N.isBuffer(t) ||
                N.isStream(t) ||
                N.isFile(t) ||
                N.isBlob(t)
            )
                return t;
            if (N.isArrayBufferView(t)) return t.buffer;
            if (N.isURLSearchParams(t))
                return (
                    n.setContentType(
                        "application/x-www-form-urlencoded;charset=utf-8",
                        !1
                    ),
                    t.toString()
                );
            let a;
            if (o) {
                if (r.indexOf("application/x-www-form-urlencoded") > -1)
                    return x0(t, this.formSerializer).toString();
                if (
                    (a = N.isFileList(t)) ||
                    r.indexOf("multipart/form-data") > -1
                ) {
                    const c = this.env && this.env.FormData;
                    return us(
                        a ? { "files[]": t } : t,
                        c && new c(),
                        this.formSerializer
                    );
                }
            }
            return o || i
                ? (n.setContentType("application/json", !1), O0(t))
                : t;
        },
    ],
    transformResponse: [
        function (t) {
            const n = this.transitional || ds.transitional,
                r = n && n.forcedJSONParsing,
                i = this.responseType === "json";
            if (t && N.isString(t) && ((r && !this.responseType) || i)) {
                const s = !(n && n.silentJSONParsing) && i;
                try {
                    return JSON.parse(t);
                } catch (a) {
                    if (s)
                        throw a.name === "SyntaxError"
                            ? H.from(
                                  a,
                                  H.ERR_BAD_RESPONSE,
                                  this,
                                  null,
                                  this.response
                              )
                            : a;
                }
            }
            return t;
        },
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: ft.classes.FormData, Blob: ft.classes.Blob },
    validateStatus: function (t) {
        return t >= 200 && t < 300;
    },
    headers: { common: { Accept: "application/json, text/plain, */*" } },
};
N.forEach(["delete", "get", "head"], function (t) {
    ds.headers[t] = {};
});
N.forEach(["post", "put", "patch"], function (t) {
    ds.headers[t] = N.merge(k0);
});
const Ka = ds,
    P0 = N.toObjectSet([
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent",
    ]),
    b0 = (e) => {
        const t = {};
        let n, r, i;
        return (
            e &&
                e
                    .split(
                        `
`
                    )
                    .forEach(function (s) {
                        (i = s.indexOf(":")),
                            (n = s.substring(0, i).trim().toLowerCase()),
                            (r = s.substring(i + 1).trim()),
                            !(!n || (t[n] && P0[n])) &&
                                (n === "set-cookie"
                                    ? t[n]
                                        ? t[n].push(r)
                                        : (t[n] = [r])
                                    : (t[n] = t[n] ? t[n] + ", " + r : r));
                    }),
            t
        );
    },
    zu = Symbol("internals");
function Dr(e) {
    return e && String(e).trim().toLowerCase();
}
function uo(e) {
    return e === !1 || e == null ? e : N.isArray(e) ? e.map(uo) : String(e);
}
function L0(e) {
    const t = Object.create(null),
        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
    return t;
}
function D0(e) {
    return /^[-_a-zA-Z]+$/.test(e.trim());
}
function Ks(e, t, n, r, i) {
    if (N.isFunction(r)) return r.call(this, t, n);
    if ((i && (t = n), !!N.isString(t))) {
        if (N.isString(r)) return t.indexOf(r) !== -1;
        if (N.isRegExp(r)) return r.test(t);
    }
}
function R0(e) {
    return e
        .trim()
        .toLowerCase()
        .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function I0(e, t) {
    const n = N.toCamelCase(" " + t);
    ["get", "set", "has"].forEach((r) => {
        Object.defineProperty(e, r + n, {
            value: function (i, o, s) {
                return this[r].call(this, t, i, o, s);
            },
            configurable: !0,
        });
    });
}
class fs {
    constructor(t) {
        t && this.set(t);
    }
    set(t, n, r) {
        const i = this;
        function o(a, c, u) {
            const f = Dr(c);
            if (!f) throw new Error("header name must be a non-empty string");
            const h = N.findKey(i, f);
            (!h ||
                i[h] === void 0 ||
                u === !0 ||
                (u === void 0 && i[h] !== !1)) &&
                (i[h || c] = uo(a));
        }
        const s = (a, c) => N.forEach(a, (u, f) => o(u, f, c));
        return (
            N.isPlainObject(t) || t instanceof this.constructor
                ? s(t, n)
                : N.isString(t) && (t = t.trim()) && !D0(t)
                ? s(b0(t), n)
                : t != null && o(n, t, r),
            this
        );
    }
    get(t, n) {
        if (((t = Dr(t)), t)) {
            const r = N.findKey(this, t);
            if (r) {
                const i = this[r];
                if (!n) return i;
                if (n === !0) return L0(i);
                if (N.isFunction(n)) return n.call(this, i, r);
                if (N.isRegExp(n)) return n.exec(i);
                throw new TypeError("parser must be boolean|regexp|function");
            }
        }
    }
    has(t, n) {
        if (((t = Dr(t)), t)) {
            const r = N.findKey(this, t);
            return !!(
                r &&
                this[r] !== void 0 &&
                (!n || Ks(this, this[r], r, n))
            );
        }
        return !1;
    }
    delete(t, n) {
        const r = this;
        let i = !1;
        function o(s) {
            if (((s = Dr(s)), s)) {
                const a = N.findKey(r, s);
                a && (!n || Ks(r, r[a], a, n)) && (delete r[a], (i = !0));
            }
        }
        return N.isArray(t) ? t.forEach(o) : o(t), i;
    }
    clear(t) {
        const n = Object.keys(this);
        let r = n.length,
            i = !1;
        for (; r--; ) {
            const o = n[r];
            (!t || Ks(this, this[o], o, t, !0)) && (delete this[o], (i = !0));
        }
        return i;
    }
    normalize(t) {
        const n = this,
            r = {};
        return (
            N.forEach(this, (i, o) => {
                const s = N.findKey(r, o);
                if (s) {
                    (n[s] = uo(i)), delete n[o];
                    return;
                }
                const a = t ? R0(o) : String(o).trim();
                a !== o && delete n[o], (n[a] = uo(i)), (r[a] = !0);
            }),
            this
        );
    }
    concat(...t) {
        return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
        const n = Object.create(null);
        return (
            N.forEach(this, (r, i) => {
                r != null &&
                    r !== !1 &&
                    (n[i] = t && N.isArray(r) ? r.join(", ") : r);
            }),
            n
        );
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
        return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n)
            .join(`
`);
    }
    get [Symbol.toStringTag]() {
        return "AxiosHeaders";
    }
    static from(t) {
        return t instanceof this ? t : new this(t);
    }
    static concat(t, ...n) {
        const r = new this(t);
        return n.forEach((i) => r.set(i)), r;
    }
    static accessor(t) {
        const r = (this[zu] = this[zu] = { accessors: {} }).accessors,
            i = this.prototype;
        function o(s) {
            const a = Dr(s);
            r[a] || (I0(i, s), (r[a] = !0));
        }
        return N.isArray(t) ? t.forEach(o) : o(t), this;
    }
}
fs.accessor([
    "Content-Type",
    "Content-Length",
    "Accept",
    "Accept-Encoding",
    "User-Agent",
    "Authorization",
]);
N.freezeMethods(fs.prototype);
N.freezeMethods(fs);
const At = fs;
function Ys(e, t) {
    const n = this || Ka,
        r = t || n,
        i = At.from(r.headers);
    let o = r.data;
    return (
        N.forEach(e, function (a) {
            o = a.call(n, o, i.normalize(), t ? t.status : void 0);
        }),
        i.normalize(),
        o
    );
}
function gp(e) {
    return !!(e && e.__CANCEL__);
}
function Oi(e, t, n) {
    H.call(this, e == null ? "canceled" : e, H.ERR_CANCELED, t, n),
        (this.name = "CanceledError");
}
N.inherits(Oi, H, { __CANCEL__: !0 });
function $0(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status)
        ? e(n)
        : t(
              new H(
                  "Request failed with status code " + n.status,
                  [H.ERR_BAD_REQUEST, H.ERR_BAD_RESPONSE][
                      Math.floor(n.status / 100) - 4
                  ],
                  n.config,
                  n.request,
                  n
              )
          );
}
const M0 = ft.isStandardBrowserEnv
    ? (function () {
          return {
              write: function (n, r, i, o, s, a) {
                  const c = [];
                  c.push(n + "=" + encodeURIComponent(r)),
                      N.isNumber(i) &&
                          c.push("expires=" + new Date(i).toGMTString()),
                      N.isString(o) && c.push("path=" + o),
                      N.isString(s) && c.push("domain=" + s),
                      a === !0 && c.push("secure"),
                      (document.cookie = c.join("; "));
              },
              read: function (n) {
                  const r = document.cookie.match(
                      new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
                  );
                  return r ? decodeURIComponent(r[3]) : null;
              },
              remove: function (n) {
                  this.write(n, "", Date.now() - 864e5);
              },
          };
      })()
    : (function () {
          return {
              write: function () {},
              read: function () {
                  return null;
              },
              remove: function () {},
          };
      })();
function F0(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function z0(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function vp(e, t) {
    return e && !F0(t) ? z0(e, t) : t;
}
const j0 = ft.isStandardBrowserEnv
    ? (function () {
          const t = /(msie|trident)/i.test(navigator.userAgent),
              n = document.createElement("a");
          let r;
          function i(o) {
              let s = o;
              return (
                  t && (n.setAttribute("href", s), (s = n.href)),
                  n.setAttribute("href", s),
                  {
                      href: n.href,
                      protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                      host: n.host,
                      search: n.search ? n.search.replace(/^\?/, "") : "",
                      hash: n.hash ? n.hash.replace(/^#/, "") : "",
                      hostname: n.hostname,
                      port: n.port,
                      pathname:
                          n.pathname.charAt(0) === "/"
                              ? n.pathname
                              : "/" + n.pathname,
                  }
              );
          }
          return (
              (r = i(window.location.href)),
              function (s) {
                  const a = N.isString(s) ? i(s) : s;
                  return a.protocol === r.protocol && a.host === r.host;
              }
          );
      })()
    : (function () {
          return function () {
              return !0;
          };
      })();
function B0(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || "";
}
function V0(e, t) {
    e = e || 10;
    const n = new Array(e),
        r = new Array(e);
    let i = 0,
        o = 0,
        s;
    return (
        (t = t !== void 0 ? t : 1e3),
        function (c) {
            const u = Date.now(),
                f = r[o];
            s || (s = u), (n[i] = c), (r[i] = u);
            let h = o,
                v = 0;
            for (; h !== i; ) (v += n[h++]), (h = h % e);
            if (((i = (i + 1) % e), i === o && (o = (o + 1) % e), u - s < t))
                return;
            const y = f && u - f;
            return y ? Math.round((v * 1e3) / y) : void 0;
        }
    );
}
function ju(e, t) {
    let n = 0;
    const r = V0(50, 250);
    return (i) => {
        const o = i.loaded,
            s = i.lengthComputable ? i.total : void 0,
            a = o - n,
            c = r(a),
            u = o <= s;
        n = o;
        const f = {
            loaded: o,
            total: s,
            progress: s ? o / s : void 0,
            bytes: a,
            rate: c || void 0,
            estimated: c && s && u ? (s - o) / c : void 0,
            event: i,
        };
        (f[t ? "download" : "upload"] = !0), e(f);
    };
}
const U0 = typeof XMLHttpRequest < "u",
    H0 =
        U0 &&
        function (e) {
            return new Promise(function (n, r) {
                let i = e.data;
                const o = At.from(e.headers).normalize(),
                    s = e.responseType;
                let a;
                function c() {
                    e.cancelToken && e.cancelToken.unsubscribe(a),
                        e.signal && e.signal.removeEventListener("abort", a);
                }
                N.isFormData(i) &&
                    (ft.isStandardBrowserEnv ||
                        ft.isStandardBrowserWebWorkerEnv) &&
                    o.setContentType(!1);
                let u = new XMLHttpRequest();
                if (e.auth) {
                    const y = e.auth.username || "",
                        _ = e.auth.password
                            ? unescape(encodeURIComponent(e.auth.password))
                            : "";
                    o.set("Authorization", "Basic " + btoa(y + ":" + _));
                }
                const f = vp(e.baseURL, e.url);
                u.open(
                    e.method.toUpperCase(),
                    pp(f, e.params, e.paramsSerializer),
                    !0
                ),
                    (u.timeout = e.timeout);
                function h() {
                    if (!u) return;
                    const y = At.from(
                            "getAllResponseHeaders" in u &&
                                u.getAllResponseHeaders()
                        ),
                        E = {
                            data:
                                !s || s === "text" || s === "json"
                                    ? u.responseText
                                    : u.response,
                            status: u.status,
                            statusText: u.statusText,
                            headers: y,
                            config: e,
                            request: u,
                        };
                    $0(
                        function (m) {
                            n(m), c();
                        },
                        function (m) {
                            r(m), c();
                        },
                        E
                    ),
                        (u = null);
                }
                if (
                    ("onloadend" in u
                        ? (u.onloadend = h)
                        : (u.onreadystatechange = function () {
                              !u ||
                                  u.readyState !== 4 ||
                                  (u.status === 0 &&
                                      !(
                                          u.responseURL &&
                                          u.responseURL.indexOf("file:") === 0
                                      )) ||
                                  setTimeout(h);
                          }),
                    (u.onabort = function () {
                        !u ||
                            (r(new H("Request aborted", H.ECONNABORTED, e, u)),
                            (u = null));
                    }),
                    (u.onerror = function () {
                        r(new H("Network Error", H.ERR_NETWORK, e, u)),
                            (u = null);
                    }),
                    (u.ontimeout = function () {
                        let _ = e.timeout
                            ? "timeout of " + e.timeout + "ms exceeded"
                            : "timeout exceeded";
                        const E = e.transitional || hp;
                        e.timeoutErrorMessage && (_ = e.timeoutErrorMessage),
                            r(
                                new H(
                                    _,
                                    E.clarifyTimeoutError
                                        ? H.ETIMEDOUT
                                        : H.ECONNABORTED,
                                    e,
                                    u
                                )
                            ),
                            (u = null);
                    }),
                    ft.isStandardBrowserEnv)
                ) {
                    const y =
                        (e.withCredentials || j0(f)) &&
                        e.xsrfCookieName &&
                        M0.read(e.xsrfCookieName);
                    y && o.set(e.xsrfHeaderName, y);
                }
                i === void 0 && o.setContentType(null),
                    "setRequestHeader" in u &&
                        N.forEach(o.toJSON(), function (_, E) {
                            u.setRequestHeader(E, _);
                        }),
                    N.isUndefined(e.withCredentials) ||
                        (u.withCredentials = !!e.withCredentials),
                    s && s !== "json" && (u.responseType = e.responseType),
                    typeof e.onDownloadProgress == "function" &&
                        u.addEventListener(
                            "progress",
                            ju(e.onDownloadProgress, !0)
                        ),
                    typeof e.onUploadProgress == "function" &&
                        u.upload &&
                        u.upload.addEventListener(
                            "progress",
                            ju(e.onUploadProgress)
                        ),
                    (e.cancelToken || e.signal) &&
                        ((a = (y) => {
                            !u ||
                                (r(!y || y.type ? new Oi(null, e, u) : y),
                                u.abort(),
                                (u = null));
                        }),
                        e.cancelToken && e.cancelToken.subscribe(a),
                        e.signal &&
                            (e.signal.aborted
                                ? a()
                                : e.signal.addEventListener("abort", a)));
                const v = B0(f);
                if (v && ft.protocols.indexOf(v) === -1) {
                    r(
                        new H(
                            "Unsupported protocol " + v + ":",
                            H.ERR_BAD_REQUEST,
                            e
                        )
                    );
                    return;
                }
                u.send(i || null);
            });
        },
    fo = { http: m0, xhr: H0 };
N.forEach(fo, (e, t) => {
    if (e) {
        try {
            Object.defineProperty(e, "name", { value: t });
        } catch {}
        Object.defineProperty(e, "adapterName", { value: t });
    }
});
const W0 = {
    getAdapter: (e) => {
        e = N.isArray(e) ? e : [e];
        const { length: t } = e;
        let n, r;
        for (
            let i = 0;
            i < t &&
            ((n = e[i]), !(r = N.isString(n) ? fo[n.toLowerCase()] : n));
            i++
        );
        if (!r)
            throw r === !1
                ? new H(
                      `Adapter ${n} is not supported by the environment`,
                      "ERR_NOT_SUPPORT"
                  )
                : new Error(
                      N.hasOwnProp(fo, n)
                          ? `Adapter '${n}' is not available in the build`
                          : `Unknown adapter '${n}'`
                  );
        if (!N.isFunction(r)) throw new TypeError("adapter is not a function");
        return r;
    },
    adapters: fo,
};
function Gs(e) {
    if (
        (e.cancelToken && e.cancelToken.throwIfRequested(),
        e.signal && e.signal.aborted)
    )
        throw new Oi(null, e);
}
function Bu(e) {
    return (
        Gs(e),
        (e.headers = At.from(e.headers)),
        (e.data = Ys.call(e, e.transformRequest)),
        ["post", "put", "patch"].indexOf(e.method) !== -1 &&
            e.headers.setContentType("application/x-www-form-urlencoded", !1),
        W0.getAdapter(e.adapter || Ka.adapter)(e).then(
            function (r) {
                return (
                    Gs(e),
                    (r.data = Ys.call(e, e.transformResponse, r)),
                    (r.headers = At.from(r.headers)),
                    r
                );
            },
            function (r) {
                return (
                    gp(r) ||
                        (Gs(e),
                        r &&
                            r.response &&
                            ((r.response.data = Ys.call(
                                e,
                                e.transformResponse,
                                r.response
                            )),
                            (r.response.headers = At.from(
                                r.response.headers
                            )))),
                    Promise.reject(r)
                );
            }
        )
    );
}
const Vu = (e) => (e instanceof At ? e.toJSON() : e);
function mr(e, t) {
    t = t || {};
    const n = {};
    function r(u, f, h) {
        return N.isPlainObject(u) && N.isPlainObject(f)
            ? N.merge.call({ caseless: h }, u, f)
            : N.isPlainObject(f)
            ? N.merge({}, f)
            : N.isArray(f)
            ? f.slice()
            : f;
    }
    function i(u, f, h) {
        if (N.isUndefined(f)) {
            if (!N.isUndefined(u)) return r(void 0, u, h);
        } else return r(u, f, h);
    }
    function o(u, f) {
        if (!N.isUndefined(f)) return r(void 0, f);
    }
    function s(u, f) {
        if (N.isUndefined(f)) {
            if (!N.isUndefined(u)) return r(void 0, u);
        } else return r(void 0, f);
    }
    function a(u, f, h) {
        if (h in t) return r(u, f);
        if (h in e) return r(void 0, u);
    }
    const c = {
        url: o,
        method: o,
        data: o,
        baseURL: s,
        transformRequest: s,
        transformResponse: s,
        paramsSerializer: s,
        timeout: s,
        timeoutMessage: s,
        withCredentials: s,
        adapter: s,
        responseType: s,
        xsrfCookieName: s,
        xsrfHeaderName: s,
        onUploadProgress: s,
        onDownloadProgress: s,
        decompress: s,
        maxContentLength: s,
        maxBodyLength: s,
        beforeRedirect: s,
        transport: s,
        httpAgent: s,
        httpsAgent: s,
        cancelToken: s,
        socketPath: s,
        responseEncoding: s,
        validateStatus: a,
        headers: (u, f) => i(Vu(u), Vu(f), !0),
    };
    return (
        N.forEach(Object.keys(e).concat(Object.keys(t)), function (f) {
            const h = c[f] || i,
                v = h(e[f], t[f], f);
            (N.isUndefined(v) && h !== a) || (n[f] = v);
        }),
        n
    );
}
const _p = "1.3.4",
    Ya = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
    (e, t) => {
        Ya[e] = function (r) {
            return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
        };
    }
);
const Uu = {};
Ya.transitional = function (t, n, r) {
    function i(o, s) {
        return (
            "[Axios v" +
            _p +
            "] Transitional option '" +
            o +
            "'" +
            s +
            (r ? ". " + r : "")
        );
    }
    return (o, s, a) => {
        if (t === !1)
            throw new H(
                i(s, " has been removed" + (n ? " in " + n : "")),
                H.ERR_DEPRECATED
            );
        return (
            n &&
                !Uu[s] &&
                ((Uu[s] = !0),
                console.warn(
                    i(
                        s,
                        " has been deprecated since v" +
                            n +
                            " and will be removed in the near future"
                    )
                )),
            t ? t(o, s, a) : !0
        );
    };
};
function K0(e, t, n) {
    if (typeof e != "object")
        throw new H("options must be an object", H.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let i = r.length;
    for (; i-- > 0; ) {
        const o = r[i],
            s = t[o];
        if (s) {
            const a = e[o],
                c = a === void 0 || s(a, o, e);
            if (c !== !0)
                throw new H(
                    "option " + o + " must be " + c,
                    H.ERR_BAD_OPTION_VALUE
                );
            continue;
        }
        if (n !== !0) throw new H("Unknown option " + o, H.ERR_BAD_OPTION);
    }
}
const Pl = { assertOptions: K0, validators: Ya },
    Ft = Pl.validators;
class Po {
    constructor(t) {
        (this.defaults = t),
            (this.interceptors = { request: new Fu(), response: new Fu() });
    }
    request(t, n) {
        typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
            (n = mr(this.defaults, n));
        const { transitional: r, paramsSerializer: i, headers: o } = n;
        r !== void 0 &&
            Pl.assertOptions(
                r,
                {
                    silentJSONParsing: Ft.transitional(Ft.boolean),
                    forcedJSONParsing: Ft.transitional(Ft.boolean),
                    clarifyTimeoutError: Ft.transitional(Ft.boolean),
                },
                !1
            ),
            i !== void 0 &&
                Pl.assertOptions(
                    i,
                    { encode: Ft.function, serialize: Ft.function },
                    !0
                ),
            (n.method = (
                n.method ||
                this.defaults.method ||
                "get"
            ).toLowerCase());
        let s;
        (s = o && N.merge(o.common, o[n.method])),
            s &&
                N.forEach(
                    ["delete", "get", "head", "post", "put", "patch", "common"],
                    (_) => {
                        delete o[_];
                    }
                ),
            (n.headers = At.concat(s, o));
        const a = [];
        let c = !0;
        this.interceptors.request.forEach(function (E) {
            (typeof E.runWhen == "function" && E.runWhen(n) === !1) ||
                ((c = c && E.synchronous), a.unshift(E.fulfilled, E.rejected));
        });
        const u = [];
        this.interceptors.response.forEach(function (E) {
            u.push(E.fulfilled, E.rejected);
        });
        let f,
            h = 0,
            v;
        if (!c) {
            const _ = [Bu.bind(this), void 0];
            for (
                _.unshift.apply(_, a),
                    _.push.apply(_, u),
                    v = _.length,
                    f = Promise.resolve(n);
                h < v;

            )
                f = f.then(_[h++], _[h++]);
            return f;
        }
        v = a.length;
        let y = n;
        for (h = 0; h < v; ) {
            const _ = a[h++],
                E = a[h++];
            try {
                y = _(y);
            } catch (P) {
                E.call(this, P);
                break;
            }
        }
        try {
            f = Bu.call(this, y);
        } catch (_) {
            return Promise.reject(_);
        }
        for (h = 0, v = u.length; h < v; ) f = f.then(u[h++], u[h++]);
        return f;
    }
    getUri(t) {
        t = mr(this.defaults, t);
        const n = vp(t.baseURL, t.url);
        return pp(n, t.params, t.paramsSerializer);
    }
}
N.forEach(["delete", "get", "head", "options"], function (t) {
    Po.prototype[t] = function (n, r) {
        return this.request(
            mr(r || {}, { method: t, url: n, data: (r || {}).data })
        );
    };
});
N.forEach(["post", "put", "patch"], function (t) {
    function n(r) {
        return function (o, s, a) {
            return this.request(
                mr(a || {}, {
                    method: t,
                    headers: r ? { "Content-Type": "multipart/form-data" } : {},
                    url: o,
                    data: s,
                })
            );
        };
    }
    (Po.prototype[t] = n()), (Po.prototype[t + "Form"] = n(!0));
});
const po = Po;
class Ga {
    constructor(t) {
        if (typeof t != "function")
            throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function (o) {
            n = o;
        });
        const r = this;
        this.promise.then((i) => {
            if (!r._listeners) return;
            let o = r._listeners.length;
            for (; o-- > 0; ) r._listeners[o](i);
            r._listeners = null;
        }),
            (this.promise.then = (i) => {
                let o;
                const s = new Promise((a) => {
                    r.subscribe(a), (o = a);
                }).then(i);
                return (
                    (s.cancel = function () {
                        r.unsubscribe(o);
                    }),
                    s
                );
            }),
            t(function (o, s, a) {
                r.reason || ((r.reason = new Oi(o, s, a)), n(r.reason));
            });
    }
    throwIfRequested() {
        if (this.reason) throw this.reason;
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return;
        }
        this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
    unsubscribe(t) {
        if (!this._listeners) return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1);
    }
    static source() {
        let t;
        return {
            token: new Ga(function (i) {
                t = i;
            }),
            cancel: t,
        };
    }
}
const Y0 = Ga;
function G0(e) {
    return function (n) {
        return e.apply(null, n);
    };
}
function Q0(e) {
    return N.isObject(e) && e.isAxiosError === !0;
}
const bl = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
};
Object.entries(bl).forEach(([e, t]) => {
    bl[t] = e;
});
const q0 = bl;
function yp(e) {
    const t = new po(e),
        n = ep(po.prototype.request, t);
    return (
        N.extend(n, po.prototype, t, { allOwnKeys: !0 }),
        N.extend(n, t, null, { allOwnKeys: !0 }),
        (n.create = function (i) {
            return yp(mr(e, i));
        }),
        n
    );
}
const he = yp(Ka);
he.Axios = po;
he.CanceledError = Oi;
he.CancelToken = Y0;
he.isCancel = gp;
he.VERSION = _p;
he.toFormData = us;
he.AxiosError = H;
he.Cancel = he.CanceledError;
he.all = function (t) {
    return Promise.all(t);
};
he.spread = G0;
he.isAxiosError = Q0;
he.mergeConfig = mr;
he.AxiosHeaders = At;
he.formToJSON = (e) => mp(N.isHTMLForm(e) ? new FormData(e) : e);
he.HttpStatusCode = q0;
he.default = he;
const ae = he;
window.axios = ae;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
function X0(e) {
    return e &&
        e.__esModule &&
        Object.prototype.hasOwnProperty.call(e, "default")
        ? e.default
        : e;
}
var I = { exports: {} },
    B = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pi = Symbol.for("react.element"),
    J0 = Symbol.for("react.portal"),
    Z0 = Symbol.for("react.fragment"),
    ew = Symbol.for("react.strict_mode"),
    tw = Symbol.for("react.profiler"),
    nw = Symbol.for("react.provider"),
    rw = Symbol.for("react.context"),
    iw = Symbol.for("react.forward_ref"),
    ow = Symbol.for("react.suspense"),
    sw = Symbol.for("react.memo"),
    lw = Symbol.for("react.lazy"),
    Hu = Symbol.iterator;
function aw(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Hu && e[Hu]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var Ep = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    wp = Object.assign,
    Np = {};
function kr(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Np),
        (this.updater = n || Ep);
}
kr.prototype.isReactComponent = {};
kr.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
kr.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Sp() {}
Sp.prototype = kr.prototype;
function Qa(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Np),
        (this.updater = n || Ep);
}
var qa = (Qa.prototype = new Sp());
qa.constructor = Qa;
wp(qa, kr.prototype);
qa.isPureReactComponent = !0;
var Wu = Array.isArray,
    Cp = Object.prototype.hasOwnProperty,
    Xa = { current: null },
    xp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tp(e, t, n) {
    var r,
        i = {},
        o = null,
        s = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (s = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
            Cp.call(t, r) && !xp.hasOwnProperty(r) && (i[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1) i.children = n;
    else if (1 < a) {
        for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
        i.children = c;
    }
    if (e && e.defaultProps)
        for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
    return {
        $$typeof: Pi,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: Xa.current,
    };
}
function cw(e, t) {
    return {
        $$typeof: Pi,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
    };
}
function Ja(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Pi;
}
function uw(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var Ku = /\/+/g;
function Qs(e, t) {
    return typeof e == "object" && e !== null && e.key != null
        ? uw("" + e.key)
        : t.toString(36);
}
function ho(e, t, n, r, i) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var s = !1;
    if (e === null) s = !0;
    else
        switch (o) {
            case "string":
            case "number":
                s = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case Pi:
                    case J0:
                        s = !0;
                }
        }
    if (s)
        return (
            (s = e),
            (i = i(s)),
            (e = r === "" ? "." + Qs(s, 0) : r),
            Wu(i)
                ? ((n = ""),
                  e != null && (n = e.replace(Ku, "$&/") + "/"),
                  ho(i, t, n, "", function (u) {
                      return u;
                  }))
                : i != null &&
                  (Ja(i) &&
                      (i = cw(
                          i,
                          n +
                              (!i.key || (s && s.key === i.key)
                                  ? ""
                                  : ("" + i.key).replace(Ku, "$&/") + "/") +
                              e
                      )),
                  t.push(i)),
            1
        );
    if (((s = 0), (r = r === "" ? "." : r + ":"), Wu(e)))
        for (var a = 0; a < e.length; a++) {
            o = e[a];
            var c = r + Qs(o, a);
            s += ho(o, t, n, c, i);
        }
    else if (((c = aw(e)), typeof c == "function"))
        for (e = c.call(e), a = 0; !(o = e.next()).done; )
            (o = o.value), (c = r + Qs(o, a++)), (s += ho(o, t, n, c, i));
    else if (o === "object")
        throw (
            ((t = String(e)),
            Error(
                "Objects are not valid as a React child (found: " +
                    (t === "[object Object]"
                        ? "object with keys {" + Object.keys(e).join(", ") + "}"
                        : t) +
                    "). If you meant to render a collection of children, use an array instead."
            ))
        );
    return s;
}
function Ui(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return (
        ho(e, r, "", "", function (o) {
            return t.call(n, o, i++);
        }),
        r
    );
}
function dw(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 2), (e._result = n));
                }
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var Oe = { current: null },
    mo = { transition: null },
    fw = {
        ReactCurrentDispatcher: Oe,
        ReactCurrentBatchConfig: mo,
        ReactCurrentOwner: Xa,
    };
B.Children = {
    map: Ui,
    forEach: function (e, t, n) {
        Ui(
            e,
            function () {
                t.apply(this, arguments);
            },
            n
        );
    },
    count: function (e) {
        var t = 0;
        return (
            Ui(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            Ui(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!Ja(e))
            throw Error(
                "React.Children.only expected to receive a single React element child."
            );
        return e;
    },
};
B.Component = kr;
B.Fragment = Z0;
B.Profiler = tw;
B.PureComponent = Qa;
B.StrictMode = ew;
B.Suspense = ow;
B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fw;
B.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
                e +
                "."
        );
    var r = wp({}, e.props),
        i = e.key,
        o = e.ref,
        s = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((o = t.ref), (s = Xa.current)),
            t.key !== void 0 && (i = "" + t.key),
            e.type && e.type.defaultProps)
        )
            var a = e.type.defaultProps;
        for (c in t)
            Cp.call(t, c) &&
                !xp.hasOwnProperty(c) &&
                (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
    }
    var c = arguments.length - 2;
    if (c === 1) r.children = n;
    else if (1 < c) {
        a = Array(c);
        for (var u = 0; u < c; u++) a[u] = arguments[u + 2];
        r.children = a;
    }
    return { $$typeof: Pi, type: e.type, key: i, ref: o, props: r, _owner: s };
};
B.createContext = function (e) {
    return (
        (e = {
            $$typeof: rw,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: nw, _context: e }),
        (e.Consumer = e)
    );
};
B.createElement = Tp;
B.createFactory = function (e) {
    var t = Tp.bind(null, e);
    return (t.type = e), t;
};
B.createRef = function () {
    return { current: null };
};
B.forwardRef = function (e) {
    return { $$typeof: iw, render: e };
};
B.isValidElement = Ja;
B.lazy = function (e) {
    return { $$typeof: lw, _payload: { _status: -1, _result: e }, _init: dw };
};
B.memo = function (e, t) {
    return { $$typeof: sw, type: e, compare: t === void 0 ? null : t };
};
B.startTransition = function (e) {
    var t = mo.transition;
    mo.transition = {};
    try {
        e();
    } finally {
        mo.transition = t;
    }
};
B.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
};
B.useCallback = function (e, t) {
    return Oe.current.useCallback(e, t);
};
B.useContext = function (e) {
    return Oe.current.useContext(e);
};
B.useDebugValue = function () {};
B.useDeferredValue = function (e) {
    return Oe.current.useDeferredValue(e);
};
B.useEffect = function (e, t) {
    return Oe.current.useEffect(e, t);
};
B.useId = function () {
    return Oe.current.useId();
};
B.useImperativeHandle = function (e, t, n) {
    return Oe.current.useImperativeHandle(e, t, n);
};
B.useInsertionEffect = function (e, t) {
    return Oe.current.useInsertionEffect(e, t);
};
B.useLayoutEffect = function (e, t) {
    return Oe.current.useLayoutEffect(e, t);
};
B.useMemo = function (e, t) {
    return Oe.current.useMemo(e, t);
};
B.useReducer = function (e, t, n) {
    return Oe.current.useReducer(e, t, n);
};
B.useRef = function (e) {
    return Oe.current.useRef(e);
};
B.useState = function (e) {
    return Oe.current.useState(e);
};
B.useSyncExternalStore = function (e, t, n) {
    return Oe.current.useSyncExternalStore(e, t, n);
};
B.useTransition = function () {
    return Oe.current.useTransition();
};
B.version = "18.2.0";
(function (e) {
    e.exports = B;
})(I);
const un = X0(I.exports);
var _t = {},
    Ap = { exports: {} },
    Ve = {},
    kp = { exports: {} },
    Op = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(S, L) {
        var M = S.length;
        S.push(L);
        e: for (; 0 < M; ) {
            var K = (M - 1) >>> 1,
                Y = S[K];
            if (0 < i(Y, L)) (S[K] = L), (S[M] = Y), (M = K);
            else break e;
        }
    }
    function n(S) {
        return S.length === 0 ? null : S[0];
    }
    function r(S) {
        if (S.length === 0) return null;
        var L = S[0],
            M = S.pop();
        if (M !== L) {
            S[0] = M;
            e: for (var K = 0, Y = S.length, F = Y >>> 1; K < F; ) {
                var b = 2 * (K + 1) - 1,
                    q = S[b],
                    ee = b + 1,
                    Ce = S[ee];
                if (0 > i(q, M))
                    ee < Y && 0 > i(Ce, q)
                        ? ((S[K] = Ce), (S[ee] = M), (K = ee))
                        : ((S[K] = q), (S[b] = M), (K = b));
                else if (ee < Y && 0 > i(Ce, M))
                    (S[K] = Ce), (S[ee] = M), (K = ee);
                else break e;
            }
        }
        return L;
    }
    function i(S, L) {
        var M = S.sortIndex - L.sortIndex;
        return M !== 0 ? M : S.id - L.id;
    }
    if (
        typeof performance == "object" &&
        typeof performance.now == "function"
    ) {
        var o = performance;
        e.unstable_now = function () {
            return o.now();
        };
    } else {
        var s = Date,
            a = s.now();
        e.unstable_now = function () {
            return s.now() - a;
        };
    }
    var c = [],
        u = [],
        f = 1,
        h = null,
        v = 3,
        y = !1,
        _ = !1,
        E = !1,
        P = typeof setTimeout == "function" ? setTimeout : null,
        m = typeof clearTimeout == "function" ? clearTimeout : null,
        p = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function g(S) {
        for (var L = n(u); L !== null; ) {
            if (L.callback === null) r(u);
            else if (L.startTime <= S)
                r(u), (L.sortIndex = L.expirationTime), t(c, L);
            else break;
            L = n(u);
        }
    }
    function w(S) {
        if (((E = !1), g(S), !_))
            if (n(c) !== null) (_ = !0), Q(C);
            else {
                var L = n(u);
                L !== null && oe(w, L.startTime - S);
            }
    }
    function C(S, L) {
        (_ = !1), E && ((E = !1), m(k), (k = -1)), (y = !0);
        var M = v;
        try {
            for (
                g(L), h = n(c);
                h !== null && (!(h.expirationTime > L) || (S && !z()));

            ) {
                var K = h.callback;
                if (typeof K == "function") {
                    (h.callback = null), (v = h.priorityLevel);
                    var Y = K(h.expirationTime <= L);
                    (L = e.unstable_now()),
                        typeof Y == "function"
                            ? (h.callback = Y)
                            : h === n(c) && r(c),
                        g(L);
                } else r(c);
                h = n(c);
            }
            if (h !== null) var F = !0;
            else {
                var b = n(u);
                b !== null && oe(w, b.startTime - L), (F = !1);
            }
            return F;
        } finally {
            (h = null), (v = M), (y = !1);
        }
    }
    var T = !1,
        O = null,
        k = -1,
        $ = 5,
        D = -1;
    function z() {
        return !(e.unstable_now() - D < $);
    }
    function V() {
        if (O !== null) {
            var S = e.unstable_now();
            D = S;
            var L = !0;
            try {
                L = O(!0, S);
            } finally {
                L ? U() : ((T = !1), (O = null));
            }
        } else T = !1;
    }
    var U;
    if (typeof p == "function")
        U = function () {
            p(V);
        };
    else if (typeof MessageChannel < "u") {
        var le = new MessageChannel(),
            de = le.port2;
        (le.port1.onmessage = V),
            (U = function () {
                de.postMessage(null);
            });
    } else
        U = function () {
            P(V, 0);
        };
    function Q(S) {
        (O = S), T || ((T = !0), U());
    }
    function oe(S, L) {
        k = P(function () {
            S(e.unstable_now());
        }, L);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (S) {
            S.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            _ || y || ((_ = !0), Q(C));
        }),
        (e.unstable_forceFrameRate = function (S) {
            0 > S || 125 < S
                ? console.error(
                      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : ($ = 0 < S ? Math.floor(1e3 / S) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return v;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(c);
        }),
        (e.unstable_next = function (S) {
            switch (v) {
                case 1:
                case 2:
                case 3:
                    var L = 3;
                    break;
                default:
                    L = v;
            }
            var M = v;
            v = L;
            try {
                return S();
            } finally {
                v = M;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (S, L) {
            switch (S) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    S = 3;
            }
            var M = v;
            v = S;
            try {
                return L();
            } finally {
                v = M;
            }
        }),
        (e.unstable_scheduleCallback = function (S, L, M) {
            var K = e.unstable_now();
            switch (
                (typeof M == "object" && M !== null
                    ? ((M = M.delay),
                      (M = typeof M == "number" && 0 < M ? K + M : K))
                    : (M = K),
                S)
            ) {
                case 1:
                    var Y = -1;
                    break;
                case 2:
                    Y = 250;
                    break;
                case 5:
                    Y = 1073741823;
                    break;
                case 4:
                    Y = 1e4;
                    break;
                default:
                    Y = 5e3;
            }
            return (
                (Y = M + Y),
                (S = {
                    id: f++,
                    callback: L,
                    priorityLevel: S,
                    startTime: M,
                    expirationTime: Y,
                    sortIndex: -1,
                }),
                M > K
                    ? ((S.sortIndex = M),
                      t(u, S),
                      n(c) === null &&
                          S === n(u) &&
                          (E ? (m(k), (k = -1)) : (E = !0), oe(w, M - K)))
                    : ((S.sortIndex = Y), t(c, S), _ || y || ((_ = !0), Q(C))),
                S
            );
        }),
        (e.unstable_shouldYield = z),
        (e.unstable_wrapCallback = function (S) {
            var L = v;
            return function () {
                var M = v;
                v = L;
                try {
                    return S.apply(this, arguments);
                } finally {
                    v = M;
                }
            };
        });
})(Op);
(function (e) {
    e.exports = Op;
})(kp);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pp = I.exports,
    Be = kp.exports;
function A(e) {
    for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
            n = 1;
        n < arguments.length;
        n++
    )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
}
var bp = new Set(),
    oi = {};
function In(e, t) {
    gr(e, t), gr(e + "Capture", t);
}
function gr(e, t) {
    for (oi[e] = t, e = 0; e < t.length; e++) bp.add(t[e]);
}
var Pt = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
    ),
    Ll = Object.prototype.hasOwnProperty,
    pw =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Yu = {},
    Gu = {};
function hw(e) {
    return Ll.call(Gu, e)
        ? !0
        : Ll.call(Yu, e)
        ? !1
        : pw.test(e)
        ? (Gu[e] = !0)
        : ((Yu[e] = !0), !1);
}
function mw(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r
                ? !1
                : n !== null
                ? !n.acceptsBooleans
                : ((e = e.toLowerCase().slice(0, 5)),
                  e !== "data-" && e !== "aria-");
        default:
            return !1;
    }
}
function gw(e, t, n, r) {
    if (t === null || typeof t > "u" || mw(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function Pe(e, t, n, r, i, o, s) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = s);
}
var ye = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        ye[e] = new Pe(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
].forEach(function (e) {
    var t = e[0];
    ye[t] = new Pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    ye[e] = new Pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
].forEach(function (e) {
    ye[e] = new Pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        ye[e] = new Pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    ye[e] = new Pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    ye[e] = new Pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    ye[e] = new Pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    ye[e] = new Pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Za = /[\-:]([a-z])/g;
function ec(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Za, ec);
        ye[t] = new Pe(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Za, ec);
        ye[t] = new Pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(Za, ec);
    ye[t] = new Pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    ye[e] = new Pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ye.xlinkHref = new Pe(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
    ye[e] = new Pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function tc(e, t, n, r) {
    var i = ye.hasOwnProperty(t) ? ye[t] : null;
    (i !== null
        ? i.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (gw(t, n, i, r) && (n = null),
        r || i === null
            ? hw(t) &&
              (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
            : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                  ? e.removeAttribute(t)
                  : ((i = i.type),
                    (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var $t = Pp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Hi = Symbol.for("react.element"),
    Hn = Symbol.for("react.portal"),
    Wn = Symbol.for("react.fragment"),
    nc = Symbol.for("react.strict_mode"),
    Dl = Symbol.for("react.profiler"),
    Lp = Symbol.for("react.provider"),
    Dp = Symbol.for("react.context"),
    rc = Symbol.for("react.forward_ref"),
    Rl = Symbol.for("react.suspense"),
    Il = Symbol.for("react.suspense_list"),
    ic = Symbol.for("react.memo"),
    jt = Symbol.for("react.lazy"),
    Rp = Symbol.for("react.offscreen"),
    Qu = Symbol.iterator;
function Rr(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Qu && e[Qu]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var ie = Object.assign,
    qs;
function Vr(e) {
    if (qs === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            qs = (t && t[1]) || "";
        }
    return (
        `
` +
        qs +
        e
    );
}
var Xs = !1;
function Js(e, t) {
    if (!e || Xs) return "";
    Xs = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                    set: function () {
                        throw Error();
                    },
                }),
                typeof Reflect == "object" && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (u) {
                    var r = u;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (u) {
                    r = u;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (u) {
                r = u;
            }
            e();
        }
    } catch (u) {
        if (u && r && typeof u.stack == "string") {
            for (
                var i = u.stack.split(`
`),
                    o = r.stack.split(`
`),
                    s = i.length - 1,
                    a = o.length - 1;
                1 <= s && 0 <= a && i[s] !== o[a];

            )
                a--;
            for (; 1 <= s && 0 <= a; s--, a--)
                if (i[s] !== o[a]) {
                    if (s !== 1 || a !== 1)
                        do
                            if ((s--, a--, 0 > a || i[s] !== o[a])) {
                                var c =
                                    `
` + i[s].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                        c.includes("<anonymous>") &&
                                        (c = c.replace(
                                            "<anonymous>",
                                            e.displayName
                                        )),
                                    c
                                );
                            }
                        while (1 <= s && 0 <= a);
                    break;
                }
        }
    } finally {
        (Xs = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? Vr(e) : "";
}
function vw(e) {
    switch (e.tag) {
        case 5:
            return Vr(e.type);
        case 16:
            return Vr("Lazy");
        case 13:
            return Vr("Suspense");
        case 19:
            return Vr("SuspenseList");
        case 0:
        case 2:
        case 15:
            return (e = Js(e.type, !1)), e;
        case 11:
            return (e = Js(e.type.render, !1)), e;
        case 1:
            return (e = Js(e.type, !0)), e;
        default:
            return "";
    }
}
function $l(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case Wn:
            return "Fragment";
        case Hn:
            return "Portal";
        case Dl:
            return "Profiler";
        case nc:
            return "StrictMode";
        case Rl:
            return "Suspense";
        case Il:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case Dp:
                return (e.displayName || "Context") + ".Consumer";
            case Lp:
                return (e._context.displayName || "Context") + ".Provider";
            case rc:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ""),
                        (e =
                            e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case ic:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : $l(e.type) || "Memo"
                );
            case jt:
                (t = e._payload), (e = e._init);
                try {
                    return $l(e(t));
                } catch {}
        }
    return null;
}
function _w(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ""),
                t.displayName ||
                    (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
            );
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return $l(t);
        case 8:
            return t === nc ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t;
    }
    return null;
}
function on(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return "";
    }
}
function Ip(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
    );
}
function yw(e) {
    var t = Ip(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
    ) {
        var i = n.get,
            o = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return i.call(this);
                },
                set: function (s) {
                    (r = "" + s), o.call(this, s);
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (s) {
                    r = "" + s;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                },
            }
        );
    }
}
function Wi(e) {
    e._valueTracker || (e._valueTracker = yw(e));
}
function $p(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return (
        e && (r = Ip(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function bo(e) {
    if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
        return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function Ml(e, t) {
    var n = t.checked;
    return ie({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n != null ? n : e._wrapperState.initialChecked,
    });
}
function qu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = on(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === "checkbox" || t.type === "radio"
                    ? t.checked != null
                    : t.value != null,
        });
}
function Mp(e, t) {
    (t = t.checked), t != null && tc(e, "checked", t, !1);
}
function Fl(e, t) {
    Mp(e, t);
    var n = on(t.value),
        r = t.type;
    if (n != null)
        r === "number"
            ? ((n === 0 && e.value === "") || e.value != n) &&
              (e.value = "" + n)
            : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return;
    }
    t.hasOwnProperty("value")
        ? zl(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && zl(e, t.type, on(t.defaultValue)),
        t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked);
}
function Xu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
            !(
                (r !== "submit" && r !== "reset") ||
                (t.value !== void 0 && t.value !== null)
            )
        )
            return;
        (t = "" + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
    }
    (n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n);
}
function zl(e, t, n) {
    (t !== "number" || bo(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ur = Array.isArray;
function nr(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            (i = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== i && (e[n].selected = i),
                i && r && (e[n].defaultSelected = !0);
    } else {
        for (n = "" + on(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                (e[i].selected = !0), r && (e[i].defaultSelected = !0);
                return;
            }
            t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
    }
}
function jl(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(A(91));
    return ie({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
    });
}
function Ju(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(A(92));
            if (Ur(n)) {
                if (1 < n.length) throw Error(A(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: on(n) };
}
function Fp(e, t) {
    var n = on(t.value),
        r = on(t.defaultValue);
    n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r);
}
function Zu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
}
function zp(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function Bl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? zp(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
}
var Ki,
    jp = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, i) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, i);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
            e.innerHTML = t;
        else {
            for (
                Ki = Ki || document.createElement("div"),
                    Ki.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = Ki.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function si(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Gr = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
    },
    Ew = ["Webkit", "ms", "Moz", "O"];
Object.keys(Gr).forEach(function (e) {
    Ew.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Gr[t] = Gr[e]);
    });
});
function Bp(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n ||
          typeof t != "number" ||
          t === 0 ||
          (Gr.hasOwnProperty(e) && Gr[e])
        ? ("" + t).trim()
        : t + "px";
}
function Vp(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = Bp(n, t[n], r);
            n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, i) : (e[n] = i);
        }
}
var ww = ie(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    }
);
function Vl(e, t) {
    if (t) {
        if (ww[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(A(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(A(60));
            if (
                typeof t.dangerouslySetInnerHTML != "object" ||
                !("__html" in t.dangerouslySetInnerHTML)
            )
                throw Error(A(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(A(62));
    }
}
function Ul(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
var Hl = null;
function oc(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var Wl = null,
    rr = null,
    ir = null;
function ed(e) {
    if ((e = Di(e))) {
        if (typeof Wl != "function") throw Error(A(280));
        var t = e.stateNode;
        t && ((t = vs(t)), Wl(e.stateNode, e.type, t));
    }
}
function Up(e) {
    rr ? (ir ? ir.push(e) : (ir = [e])) : (rr = e);
}
function Hp() {
    if (rr) {
        var e = rr,
            t = ir;
        if (((ir = rr = null), ed(e), t))
            for (e = 0; e < t.length; e++) ed(t[e]);
    }
}
function Wp(e, t) {
    return e(t);
}
function Kp() {}
var Zs = !1;
function Yp(e, t, n) {
    if (Zs) return e(t, n);
    Zs = !0;
    try {
        return Wp(e, t, n);
    } finally {
        (Zs = !1), (rr !== null || ir !== null) && (Kp(), Hp());
    }
}
function li(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = vs(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) ||
                ((e = e.type),
                (r = !(
                    e === "button" ||
                    e === "input" ||
                    e === "select" ||
                    e === "textarea"
                ))),
                (e = !r);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(A(231, t, typeof n));
    return n;
}
var Kl = !1;
if (Pt)
    try {
        var Ir = {};
        Object.defineProperty(Ir, "passive", {
            get: function () {
                Kl = !0;
            },
        }),
            window.addEventListener("test", Ir, Ir),
            window.removeEventListener("test", Ir, Ir);
    } catch {
        Kl = !1;
    }
function Nw(e, t, n, r, i, o, s, a, c) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u);
    } catch (f) {
        this.onError(f);
    }
}
var Qr = !1,
    Lo = null,
    Do = !1,
    Yl = null,
    Sw = {
        onError: function (e) {
            (Qr = !0), (Lo = e);
        },
    };
function Cw(e, t, n, r, i, o, s, a, c) {
    (Qr = !1), (Lo = null), Nw.apply(Sw, arguments);
}
function xw(e, t, n, r, i, o, s, a, c) {
    if ((Cw.apply(this, arguments), Qr)) {
        if (Qr) {
            var u = Lo;
            (Qr = !1), (Lo = null);
        } else throw Error(A(198));
        Do || ((Do = !0), (Yl = u));
    }
}
function $n(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function Gp(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (
            (t === null &&
                ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
        )
            return t.dehydrated;
    }
    return null;
}
function td(e) {
    if ($n(e) !== e) throw Error(A(188));
}
function Tw(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = $n(e)), t === null)) throw Error(A(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null) break;
        var o = i.alternate;
        if (o === null) {
            if (((r = i.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (i.child === o.child) {
            for (o = i.child; o; ) {
                if (o === n) return td(i), e;
                if (o === r) return td(i), t;
                o = o.sibling;
            }
            throw Error(A(188));
        }
        if (n.return !== r.return) (n = i), (r = o);
        else {
            for (var s = !1, a = i.child; a; ) {
                if (a === n) {
                    (s = !0), (n = i), (r = o);
                    break;
                }
                if (a === r) {
                    (s = !0), (r = i), (n = o);
                    break;
                }
                a = a.sibling;
            }
            if (!s) {
                for (a = o.child; a; ) {
                    if (a === n) {
                        (s = !0), (n = o), (r = i);
                        break;
                    }
                    if (a === r) {
                        (s = !0), (r = o), (n = i);
                        break;
                    }
                    a = a.sibling;
                }
                if (!s) throw Error(A(189));
            }
        }
        if (n.alternate !== r) throw Error(A(190));
    }
    if (n.tag !== 3) throw Error(A(188));
    return n.stateNode.current === n ? e : t;
}
function Qp(e) {
    return (e = Tw(e)), e !== null ? qp(e) : null;
}
function qp(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = qp(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Xp = Be.unstable_scheduleCallback,
    nd = Be.unstable_cancelCallback,
    Aw = Be.unstable_shouldYield,
    kw = Be.unstable_requestPaint,
    ce = Be.unstable_now,
    Ow = Be.unstable_getCurrentPriorityLevel,
    sc = Be.unstable_ImmediatePriority,
    Jp = Be.unstable_UserBlockingPriority,
    Ro = Be.unstable_NormalPriority,
    Pw = Be.unstable_LowPriority,
    Zp = Be.unstable_IdlePriority,
    ps = null,
    mt = null;
function bw(e) {
    if (mt && typeof mt.onCommitFiberRoot == "function")
        try {
            mt.onCommitFiberRoot(
                ps,
                e,
                void 0,
                (e.current.flags & 128) === 128
            );
        } catch {}
}
var it = Math.clz32 ? Math.clz32 : Rw,
    Lw = Math.log,
    Dw = Math.LN2;
function Rw(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Lw(e) / Dw) | 0)) | 0;
}
var Yi = 64,
    Gi = 4194304;
function Hr(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function Io(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        o = e.pingedLanes,
        s = n & 268435455;
    if (s !== 0) {
        var a = s & ~i;
        a !== 0 ? (r = Hr(a)) : ((o &= s), o !== 0 && (r = Hr(o)));
    } else (s = n & ~i), s !== 0 ? (r = Hr(s)) : o !== 0 && (r = Hr(o));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        (t & i) === 0 &&
        ((i = r & -r),
        (o = t & -t),
        i >= o || (i === 16 && (o & 4194240) !== 0))
    )
        return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
            (n = 31 - it(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
    return r;
}
function Iw(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function $w(e, t) {
    for (
        var n = e.suspendedLanes,
            r = e.pingedLanes,
            i = e.expirationTimes,
            o = e.pendingLanes;
        0 < o;

    ) {
        var s = 31 - it(o),
            a = 1 << s,
            c = i[s];
        c === -1
            ? ((a & n) === 0 || (a & r) !== 0) && (i[s] = Iw(a, t))
            : c <= t && (e.expiredLanes |= a),
            (o &= ~a);
    }
}
function Gl(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function eh() {
    var e = Yi;
    return (Yi <<= 1), (Yi & 4194240) === 0 && (Yi = 64), e;
}
function el(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function bi(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - it(t)),
        (e[t] = n);
}
function Mw(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - it(n),
            o = 1 << i;
        (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
    }
}
function lc(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - it(n),
            i = 1 << r;
        (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
    }
}
var G = 0;
function th(e) {
    return (
        (e &= -e),
        1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
}
var nh,
    ac,
    rh,
    ih,
    oh,
    Ql = !1,
    Qi = [],
    Kt = null,
    Yt = null,
    Gt = null,
    ai = new Map(),
    ci = new Map(),
    Vt = [],
    Fw =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " "
        );
function rd(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            Kt = null;
            break;
        case "dragenter":
        case "dragleave":
            Yt = null;
            break;
        case "mouseover":
        case "mouseout":
            Gt = null;
            break;
        case "pointerover":
        case "pointerout":
            ai.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            ci.delete(t.pointerId);
    }
}
function $r(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: o,
              targetContainers: [i],
          }),
          t !== null && ((t = Di(t)), t !== null && ac(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
}
function zw(e, t, n, r, i) {
    switch (t) {
        case "focusin":
            return (Kt = $r(Kt, e, t, n, r, i)), !0;
        case "dragenter":
            return (Yt = $r(Yt, e, t, n, r, i)), !0;
        case "mouseover":
            return (Gt = $r(Gt, e, t, n, r, i)), !0;
        case "pointerover":
            var o = i.pointerId;
            return ai.set(o, $r(ai.get(o) || null, e, t, n, r, i)), !0;
        case "gotpointercapture":
            return (
                (o = i.pointerId),
                ci.set(o, $r(ci.get(o) || null, e, t, n, r, i)),
                !0
            );
    }
    return !1;
}
function sh(e) {
    var t = En(e.target);
    if (t !== null) {
        var n = $n(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Gp(n)), t !== null)) {
                    (e.blockedOn = t),
                        oh(e.priority, function () {
                            rh(n);
                        });
                    return;
                }
            } else if (
                t === 3 &&
                n.stateNode.current.memoizedState.isDehydrated
            ) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function go(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = ql(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (Hl = r), n.target.dispatchEvent(r), (Hl = null);
        } else return (t = Di(n)), t !== null && ac(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function id(e, t, n) {
    go(e) && n.delete(t);
}
function jw() {
    (Ql = !1),
        Kt !== null && go(Kt) && (Kt = null),
        Yt !== null && go(Yt) && (Yt = null),
        Gt !== null && go(Gt) && (Gt = null),
        ai.forEach(id),
        ci.forEach(id);
}
function Mr(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        Ql ||
            ((Ql = !0),
            Be.unstable_scheduleCallback(Be.unstable_NormalPriority, jw)));
}
function ui(e) {
    function t(i) {
        return Mr(i, e);
    }
    if (0 < Qi.length) {
        Mr(Qi[0], e);
        for (var n = 1; n < Qi.length; n++) {
            var r = Qi[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        Kt !== null && Mr(Kt, e),
            Yt !== null && Mr(Yt, e),
            Gt !== null && Mr(Gt, e),
            ai.forEach(t),
            ci.forEach(t),
            n = 0;
        n < Vt.length;
        n++
    )
        (r = Vt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Vt.length && ((n = Vt[0]), n.blockedOn === null); )
        sh(n), n.blockedOn === null && Vt.shift();
}
var or = $t.ReactCurrentBatchConfig,
    $o = !0;
function Bw(e, t, n, r) {
    var i = G,
        o = or.transition;
    or.transition = null;
    try {
        (G = 1), cc(e, t, n, r);
    } finally {
        (G = i), (or.transition = o);
    }
}
function Vw(e, t, n, r) {
    var i = G,
        o = or.transition;
    or.transition = null;
    try {
        (G = 4), cc(e, t, n, r);
    } finally {
        (G = i), (or.transition = o);
    }
}
function cc(e, t, n, r) {
    if ($o) {
        var i = ql(e, t, n, r);
        if (i === null) ul(e, t, r, Mo, n), rd(e, r);
        else if (zw(i, e, t, n, r)) r.stopPropagation();
        else if ((rd(e, r), t & 4 && -1 < Fw.indexOf(e))) {
            for (; i !== null; ) {
                var o = Di(i);
                if (
                    (o !== null && nh(o),
                    (o = ql(e, t, n, r)),
                    o === null && ul(e, t, r, Mo, n),
                    o === i)
                )
                    break;
                i = o;
            }
            i !== null && r.stopPropagation();
        } else ul(e, t, r, null, n);
    }
}
var Mo = null;
function ql(e, t, n, r) {
    if (((Mo = null), (e = oc(r)), (e = En(e)), e !== null))
        if (((t = $n(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Gp(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (Mo = e), null;
}
function lh(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (Ow()) {
                case sc:
                    return 1;
                case Jp:
                    return 4;
                case Ro:
                case Pw:
                    return 16;
                case Zp:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var Ht = null,
    uc = null,
    vo = null;
function ah() {
    if (vo) return vo;
    var e,
        t = uc,
        n = t.length,
        r,
        i = "value" in Ht ? Ht.value : Ht.textContent,
        o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var s = n - e;
    for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
    return (vo = i.slice(e, 1 < r ? 1 - r : void 0));
}
function _o(e) {
    var t = e.keyCode;
    return (
        "charCode" in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function qi() {
    return !0;
}
function od() {
    return !1;
}
function Ue(e) {
    function t(n, r, i, o, s) {
        (this._reactName = n),
            (this._targetInst = i),
            (this.type = r),
            (this.nativeEvent = o),
            (this.target = s),
            (this.currentTarget = null);
        for (var a in e)
            e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
        return (
            (this.isDefaultPrevented = (
                o.defaultPrevented != null
                    ? o.defaultPrevented
                    : o.returnValue === !1
            )
                ? qi
                : od),
            (this.isPropagationStopped = od),
            this
        );
    }
    return (
        ie(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != "unknown" &&
                          (n.returnValue = !1),
                    (this.isDefaultPrevented = qi));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" &&
                          (n.cancelBubble = !0),
                    (this.isPropagationStopped = qi));
            },
            persist: function () {},
            isPersistent: qi,
        }),
        t
    );
}
var Or = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    dc = Ue(Or),
    Li = ie({}, Or, { view: 0, detail: 0 }),
    Uw = Ue(Li),
    tl,
    nl,
    Fr,
    hs = ie({}, Li, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: fc,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return "movementX" in e
                ? e.movementX
                : (e !== Fr &&
                      (Fr && e.type === "mousemove"
                          ? ((tl = e.screenX - Fr.screenX),
                            (nl = e.screenY - Fr.screenY))
                          : (nl = tl = 0),
                      (Fr = e)),
                  tl);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : nl;
        },
    }),
    sd = Ue(hs),
    Hw = ie({}, hs, { dataTransfer: 0 }),
    Ww = Ue(Hw),
    Kw = ie({}, Li, { relatedTarget: 0 }),
    rl = Ue(Kw),
    Yw = ie({}, Or, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Gw = Ue(Yw),
    Qw = ie({}, Or, {
        clipboardData: function (e) {
            return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
        },
    }),
    qw = Ue(Qw),
    Xw = ie({}, Or, { data: 0 }),
    ld = Ue(Xw),
    Jw = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
    },
    Zw = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
    },
    e1 = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
    };
function t1(e) {
    var t = this.nativeEvent;
    return t.getModifierState
        ? t.getModifierState(e)
        : (e = e1[e])
        ? !!t[e]
        : !1;
}
function fc() {
    return t1;
}
var n1 = ie({}, Li, {
        key: function (e) {
            if (e.key) {
                var t = Jw[e.key] || e.key;
                if (t !== "Unidentified") return t;
            }
            return e.type === "keypress"
                ? ((e = _o(e)), e === 13 ? "Enter" : String.fromCharCode(e))
                : e.type === "keydown" || e.type === "keyup"
                ? Zw[e.keyCode] || "Unidentified"
                : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: fc,
        charCode: function (e) {
            return e.type === "keypress" ? _o(e) : 0;
        },
        keyCode: function (e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === "keypress"
                ? _o(e)
                : e.type === "keydown" || e.type === "keyup"
                ? e.keyCode
                : 0;
        },
    }),
    r1 = Ue(n1),
    i1 = ie({}, hs, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    ad = Ue(i1),
    o1 = ie({}, Li, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: fc,
    }),
    s1 = Ue(o1),
    l1 = ie({}, Or, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    a1 = Ue(l1),
    c1 = ie({}, hs, {
        deltaX: function (e) {
            return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                ? -e.wheelDeltaX
                : 0;
        },
        deltaY: function (e) {
            return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                ? -e.wheelDeltaY
                : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    u1 = Ue(c1),
    d1 = [9, 13, 27, 32],
    pc = Pt && "CompositionEvent" in window,
    qr = null;
Pt && "documentMode" in document && (qr = document.documentMode);
var f1 = Pt && "TextEvent" in window && !qr,
    ch = Pt && (!pc || (qr && 8 < qr && 11 >= qr)),
    cd = String.fromCharCode(32),
    ud = !1;
function uh(e, t) {
    switch (e) {
        case "keyup":
            return d1.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function dh(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Kn = !1;
function p1(e, t) {
    switch (e) {
        case "compositionend":
            return dh(t);
        case "keypress":
            return t.which !== 32 ? null : ((ud = !0), cd);
        case "textInput":
            return (e = t.data), e === cd && ud ? null : e;
        default:
            return null;
    }
}
function h1(e, t) {
    if (Kn)
        return e === "compositionend" || (!pc && uh(e, t))
            ? ((e = ah()), (vo = uc = Ht = null), (Kn = !1), e)
            : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (
                !(t.ctrlKey || t.altKey || t.metaKey) ||
                (t.ctrlKey && t.altKey)
            ) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case "compositionend":
            return ch && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var m1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function dd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!m1[e.type] : t === "textarea";
}
function fh(e, t, n, r) {
    Up(r),
        (t = Fo(t, "onChange")),
        0 < t.length &&
            ((n = new dc("onChange", "change", null, n, r)),
            e.push({ event: n, listeners: t }));
}
var Xr = null,
    di = null;
function g1(e) {
    Sh(e, 0);
}
function ms(e) {
    var t = Qn(e);
    if ($p(t)) return e;
}
function v1(e, t) {
    if (e === "change") return t;
}
var ph = !1;
if (Pt) {
    var il;
    if (Pt) {
        var ol = "oninput" in document;
        if (!ol) {
            var fd = document.createElement("div");
            fd.setAttribute("oninput", "return;"),
                (ol = typeof fd.oninput == "function");
        }
        il = ol;
    } else il = !1;
    ph = il && (!document.documentMode || 9 < document.documentMode);
}
function pd() {
    Xr && (Xr.detachEvent("onpropertychange", hh), (di = Xr = null));
}
function hh(e) {
    if (e.propertyName === "value" && ms(di)) {
        var t = [];
        fh(t, di, e, oc(e)), Yp(g1, t);
    }
}
function _1(e, t, n) {
    e === "focusin"
        ? (pd(), (Xr = t), (di = n), Xr.attachEvent("onpropertychange", hh))
        : e === "focusout" && pd();
}
function y1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return ms(di);
}
function E1(e, t) {
    if (e === "click") return ms(t);
}
function w1(e, t) {
    if (e === "input" || e === "change") return ms(t);
}
function N1(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var st = typeof Object.is == "function" ? Object.is : N1;
function fi(e, t) {
    if (st(e, t)) return !0;
    if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
    )
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!Ll.call(t, i) || !st(e[i], t[i])) return !1;
    }
    return !0;
}
function hd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function md(e, t) {
    var n = hd(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = hd(n);
    }
}
function mh(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
            ? mh(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
            ? !!(e.compareDocumentPosition(t) & 16)
            : !1
        : !1;
}
function gh() {
    for (var e = window, t = bo(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = bo(e.document);
    }
    return t;
}
function hc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === "input" &&
            (e.type === "text" ||
                e.type === "search" ||
                e.type === "tel" ||
                e.type === "url" ||
                e.type === "password")) ||
            t === "textarea" ||
            e.contentEditable === "true")
    );
}
function S1(e) {
    var t = gh(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        mh(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && hc(n)) {
            if (
                ((t = r.start),
                (e = r.end),
                e === void 0 && (e = t),
                "selectionStart" in n)
            )
                (n.selectionStart = t),
                    (n.selectionEnd = Math.min(e, n.value.length));
            else if (
                ((e =
                    ((t = n.ownerDocument || document) && t.defaultView) ||
                    window),
                e.getSelection)
            ) {
                e = e.getSelection();
                var i = n.textContent.length,
                    o = Math.min(r.start, i);
                (r = r.end === void 0 ? o : Math.min(r.end, i)),
                    !e.extend && o > r && ((i = r), (r = o), (o = i)),
                    (i = md(n, o));
                var s = md(n, r);
                i &&
                    s &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== i.node ||
                        e.anchorOffset !== i.offset ||
                        e.focusNode !== s.node ||
                        e.focusOffset !== s.offset) &&
                    ((t = t.createRange()),
                    t.setStart(i.node, i.offset),
                    e.removeAllRanges(),
                    o > r
                        ? (e.addRange(t), e.extend(s.node, s.offset))
                        : (t.setEnd(s.node, s.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
            typeof n.focus == "function" && n.focus(), n = 0;
            n < t.length;
            n++
        )
            (e = t[n]),
                (e.element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
    }
}
var C1 = Pt && "documentMode" in document && 11 >= document.documentMode,
    Yn = null,
    Xl = null,
    Jr = null,
    Jl = !1;
function gd(e, t, n) {
    var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Jl ||
        Yn == null ||
        Yn !== bo(r) ||
        ((r = Yn),
        "selectionStart" in r && hc(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                  (r.ownerDocument && r.ownerDocument.defaultView) ||
                  window
              ).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
              })),
        (Jr && fi(Jr, r)) ||
            ((Jr = r),
            (r = Fo(Xl, "onSelect")),
            0 < r.length &&
                ((t = new dc("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = Yn))));
}
function Xi(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
    );
}
var Gn = {
        animationend: Xi("Animation", "AnimationEnd"),
        animationiteration: Xi("Animation", "AnimationIteration"),
        animationstart: Xi("Animation", "AnimationStart"),
        transitionend: Xi("Transition", "TransitionEnd"),
    },
    sl = {},
    vh = {};
Pt &&
    ((vh = document.createElement("div").style),
    "AnimationEvent" in window ||
        (delete Gn.animationend.animation,
        delete Gn.animationiteration.animation,
        delete Gn.animationstart.animation),
    "TransitionEvent" in window || delete Gn.transitionend.transition);
function gs(e) {
    if (sl[e]) return sl[e];
    if (!Gn[e]) return e;
    var t = Gn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in vh) return (sl[e] = t[n]);
    return e;
}
var _h = gs("animationend"),
    yh = gs("animationiteration"),
    Eh = gs("animationstart"),
    wh = gs("transitionend"),
    Nh = new Map(),
    vd =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " "
        );
function dn(e, t) {
    Nh.set(e, t), In(t, [e]);
}
for (var ll = 0; ll < vd.length; ll++) {
    var al = vd[ll],
        x1 = al.toLowerCase(),
        T1 = al[0].toUpperCase() + al.slice(1);
    dn(x1, "on" + T1);
}
dn(_h, "onAnimationEnd");
dn(yh, "onAnimationIteration");
dn(Eh, "onAnimationStart");
dn("dblclick", "onDoubleClick");
dn("focusin", "onFocus");
dn("focusout", "onBlur");
dn(wh, "onTransitionEnd");
gr("onMouseEnter", ["mouseout", "mouseover"]);
gr("onMouseLeave", ["mouseout", "mouseover"]);
gr("onPointerEnter", ["pointerout", "pointerover"]);
gr("onPointerLeave", ["pointerout", "pointerover"]);
In(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
        " "
    )
);
In(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
    )
);
In("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
In(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
In(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
In(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Wr =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " "
        ),
    A1 = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(Wr)
    );
function _d(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), xw(r, t, void 0, e), (e.currentTarget = null);
}
function Sh(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var s = r.length - 1; 0 <= s; s--) {
                    var a = r[s],
                        c = a.instance,
                        u = a.currentTarget;
                    if (((a = a.listener), c !== o && i.isPropagationStopped()))
                        break e;
                    _d(i, a, u), (o = c);
                }
            else
                for (s = 0; s < r.length; s++) {
                    if (
                        ((a = r[s]),
                        (c = a.instance),
                        (u = a.currentTarget),
                        (a = a.listener),
                        c !== o && i.isPropagationStopped())
                    )
                        break e;
                    _d(i, a, u), (o = c);
                }
        }
    }
    if (Do) throw ((e = Yl), (Do = !1), (Yl = null), e);
}
function J(e, t) {
    var n = t[ra];
    n === void 0 && (n = t[ra] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Ch(t, e, 2, !1), n.add(r));
}
function cl(e, t, n) {
    var r = 0;
    t && (r |= 4), Ch(n, e, r, t);
}
var Ji = "_reactListening" + Math.random().toString(36).slice(2);
function pi(e) {
    if (!e[Ji]) {
        (e[Ji] = !0),
            bp.forEach(function (n) {
                n !== "selectionchange" &&
                    (A1.has(n) || cl(n, !1, e), cl(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Ji] || ((t[Ji] = !0), cl("selectionchange", !1, t));
    }
}
function Ch(e, t, n, r) {
    switch (lh(t)) {
        case 1:
            var i = Bw;
            break;
        case 4:
            i = Vw;
            break;
        default:
            i = cc;
    }
    (n = i.bind(null, t, n, e)),
        (i = void 0),
        !Kl ||
            (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
            (i = !0),
        r
            ? i !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: i })
                : e.addEventListener(t, n, !0)
            : i !== void 0
            ? e.addEventListener(t, n, { passive: i })
            : e.addEventListener(t, n, !1);
}
function ul(e, t, n, r, i) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
        e: for (;;) {
            if (r === null) return;
            var s = r.tag;
            if (s === 3 || s === 4) {
                var a = r.stateNode.containerInfo;
                if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
                if (s === 4)
                    for (s = r.return; s !== null; ) {
                        var c = s.tag;
                        if (
                            (c === 3 || c === 4) &&
                            ((c = s.stateNode.containerInfo),
                            c === i || (c.nodeType === 8 && c.parentNode === i))
                        )
                            return;
                        s = s.return;
                    }
                for (; a !== null; ) {
                    if (((s = En(a)), s === null)) return;
                    if (((c = s.tag), c === 5 || c === 6)) {
                        r = o = s;
                        continue e;
                    }
                    a = a.parentNode;
                }
            }
            r = r.return;
        }
    Yp(function () {
        var u = o,
            f = oc(n),
            h = [];
        e: {
            var v = Nh.get(e);
            if (v !== void 0) {
                var y = dc,
                    _ = e;
                switch (e) {
                    case "keypress":
                        if (_o(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        y = r1;
                        break;
                    case "focusin":
                        (_ = "focus"), (y = rl);
                        break;
                    case "focusout":
                        (_ = "blur"), (y = rl);
                        break;
                    case "beforeblur":
                    case "afterblur":
                        y = rl;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        y = sd;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        y = Ww;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        y = s1;
                        break;
                    case _h:
                    case yh:
                    case Eh:
                        y = Gw;
                        break;
                    case wh:
                        y = a1;
                        break;
                    case "scroll":
                        y = Uw;
                        break;
                    case "wheel":
                        y = u1;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        y = qw;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        y = ad;
                }
                var E = (t & 4) !== 0,
                    P = !E && e === "scroll",
                    m = E ? (v !== null ? v + "Capture" : null) : v;
                E = [];
                for (var p = u, g; p !== null; ) {
                    g = p;
                    var w = g.stateNode;
                    if (
                        (g.tag === 5 &&
                            w !== null &&
                            ((g = w),
                            m !== null &&
                                ((w = li(p, m)),
                                w != null && E.push(hi(p, w, g)))),
                        P)
                    )
                        break;
                    p = p.return;
                }
                0 < E.length &&
                    ((v = new y(v, _, null, n, f)),
                    h.push({ event: v, listeners: E }));
            }
        }
        if ((t & 7) === 0) {
            e: {
                if (
                    ((v = e === "mouseover" || e === "pointerover"),
                    (y = e === "mouseout" || e === "pointerout"),
                    v &&
                        n !== Hl &&
                        (_ = n.relatedTarget || n.fromElement) &&
                        (En(_) || _[bt]))
                )
                    break e;
                if (
                    (y || v) &&
                    ((v =
                        f.window === f
                            ? f
                            : (v = f.ownerDocument)
                            ? v.defaultView || v.parentWindow
                            : window),
                    y
                        ? ((_ = n.relatedTarget || n.toElement),
                          (y = u),
                          (_ = _ ? En(_) : null),
                          _ !== null &&
                              ((P = $n(_)),
                              _ !== P || (_.tag !== 5 && _.tag !== 6)) &&
                              (_ = null))
                        : ((y = null), (_ = u)),
                    y !== _)
                ) {
                    if (
                        ((E = sd),
                        (w = "onMouseLeave"),
                        (m = "onMouseEnter"),
                        (p = "mouse"),
                        (e === "pointerout" || e === "pointerover") &&
                            ((E = ad),
                            (w = "onPointerLeave"),
                            (m = "onPointerEnter"),
                            (p = "pointer")),
                        (P = y == null ? v : Qn(y)),
                        (g = _ == null ? v : Qn(_)),
                        (v = new E(w, p + "leave", y, n, f)),
                        (v.target = P),
                        (v.relatedTarget = g),
                        (w = null),
                        En(f) === u &&
                            ((E = new E(m, p + "enter", _, n, f)),
                            (E.target = g),
                            (E.relatedTarget = P),
                            (w = E)),
                        (P = w),
                        y && _)
                    )
                        t: {
                            for (E = y, m = _, p = 0, g = E; g; g = zn(g)) p++;
                            for (g = 0, w = m; w; w = zn(w)) g++;
                            for (; 0 < p - g; ) (E = zn(E)), p--;
                            for (; 0 < g - p; ) (m = zn(m)), g--;
                            for (; p--; ) {
                                if (
                                    E === m ||
                                    (m !== null && E === m.alternate)
                                )
                                    break t;
                                (E = zn(E)), (m = zn(m));
                            }
                            E = null;
                        }
                    else E = null;
                    y !== null && yd(h, v, y, E, !1),
                        _ !== null && P !== null && yd(h, P, _, E, !0);
                }
            }
            e: {
                if (
                    ((v = u ? Qn(u) : window),
                    (y = v.nodeName && v.nodeName.toLowerCase()),
                    y === "select" || (y === "input" && v.type === "file"))
                )
                    var C = v1;
                else if (dd(v))
                    if (ph) C = w1;
                    else {
                        C = y1;
                        var T = _1;
                    }
                else
                    (y = v.nodeName) &&
                        y.toLowerCase() === "input" &&
                        (v.type === "checkbox" || v.type === "radio") &&
                        (C = E1);
                if (C && (C = C(e, u))) {
                    fh(h, C, n, f);
                    break e;
                }
                T && T(e, v, u),
                    e === "focusout" &&
                        (T = v._wrapperState) &&
                        T.controlled &&
                        v.type === "number" &&
                        zl(v, "number", v.value);
            }
            switch (((T = u ? Qn(u) : window), e)) {
                case "focusin":
                    (dd(T) || T.contentEditable === "true") &&
                        ((Yn = T), (Xl = u), (Jr = null));
                    break;
                case "focusout":
                    Jr = Xl = Yn = null;
                    break;
                case "mousedown":
                    Jl = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    (Jl = !1), gd(h, n, f);
                    break;
                case "selectionchange":
                    if (C1) break;
                case "keydown":
                case "keyup":
                    gd(h, n, f);
            }
            var O;
            if (pc)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var k = "onCompositionStart";
                            break e;
                        case "compositionend":
                            k = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            k = "onCompositionUpdate";
                            break e;
                    }
                    k = void 0;
                }
            else
                Kn
                    ? uh(e, n) && (k = "onCompositionEnd")
                    : e === "keydown" &&
                      n.keyCode === 229 &&
                      (k = "onCompositionStart");
            k &&
                (ch &&
                    n.locale !== "ko" &&
                    (Kn || k !== "onCompositionStart"
                        ? k === "onCompositionEnd" && Kn && (O = ah())
                        : ((Ht = f),
                          (uc = "value" in Ht ? Ht.value : Ht.textContent),
                          (Kn = !0))),
                (T = Fo(u, k)),
                0 < T.length &&
                    ((k = new ld(k, e, null, n, f)),
                    h.push({ event: k, listeners: T }),
                    O
                        ? (k.data = O)
                        : ((O = dh(n)), O !== null && (k.data = O)))),
                (O = f1 ? p1(e, n) : h1(e, n)) &&
                    ((u = Fo(u, "onBeforeInput")),
                    0 < u.length &&
                        ((f = new ld(
                            "onBeforeInput",
                            "beforeinput",
                            null,
                            n,
                            f
                        )),
                        h.push({ event: f, listeners: u }),
                        (f.data = O)));
        }
        Sh(h, t);
    });
}
function hi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function Fo(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var i = e,
            o = i.stateNode;
        i.tag === 5 &&
            o !== null &&
            ((i = o),
            (o = li(e, n)),
            o != null && r.unshift(hi(e, o, i)),
            (o = li(e, t)),
            o != null && r.push(hi(e, o, i))),
            (e = e.return);
    }
    return r;
}
function zn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function yd(e, t, n, r, i) {
    for (var o = t._reactName, s = []; n !== null && n !== r; ) {
        var a = n,
            c = a.alternate,
            u = a.stateNode;
        if (c !== null && c === r) break;
        a.tag === 5 &&
            u !== null &&
            ((a = u),
            i
                ? ((c = li(n, o)), c != null && s.unshift(hi(n, c, a)))
                : i || ((c = li(n, o)), c != null && s.push(hi(n, c, a)))),
            (n = n.return);
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
}
var k1 = /\r\n?/g,
    O1 = /\u0000|\uFFFD/g;
function Ed(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            k1,
            `
`
        )
        .replace(O1, "");
}
function Zi(e, t, n) {
    if (((t = Ed(t)), Ed(e) !== t && n)) throw Error(A(425));
}
function zo() {}
var Zl = null,
    ea = null;
function ta(e, t) {
    return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var na = typeof setTimeout == "function" ? setTimeout : void 0,
    P1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    wd = typeof Promise == "function" ? Promise : void 0,
    b1 =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof wd < "u"
            ? function (e) {
                  return wd.resolve(null).then(e).catch(L1);
              }
            : na;
function L1(e) {
    setTimeout(function () {
        throw e;
    });
}
function dl(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
            if (((n = i.data), n === "/$")) {
                if (r === 0) {
                    e.removeChild(i), ui(t);
                    return;
                }
                r--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = i;
    } while (n);
    ui(t);
}
function Qt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
            if (t === "/$") return null;
        }
    }
    return e;
}
function Nd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--;
            } else n === "/$" && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var Pr = Math.random().toString(36).slice(2),
    dt = "__reactFiber$" + Pr,
    mi = "__reactProps$" + Pr,
    bt = "__reactContainer$" + Pr,
    ra = "__reactEvents$" + Pr,
    D1 = "__reactListeners$" + Pr,
    R1 = "__reactHandles$" + Pr;
function En(e) {
    var t = e[dt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[bt] || n[dt])) {
            if (
                ((n = t.alternate),
                t.child !== null || (n !== null && n.child !== null))
            )
                for (e = Nd(e); e !== null; ) {
                    if ((n = e[dt])) return n;
                    e = Nd(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function Di(e) {
    return (
        (e = e[dt] || e[bt]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
    );
}
function Qn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(A(33));
}
function vs(e) {
    return e[mi] || null;
}
var ia = [],
    qn = -1;
function fn(e) {
    return { current: e };
}
function Z(e) {
    0 > qn || ((e.current = ia[qn]), (ia[qn] = null), qn--);
}
function X(e, t) {
    qn++, (ia[qn] = e.current), (e.current = t);
}
var sn = {},
    Se = fn(sn),
    De = fn(!1),
    kn = sn;
function vr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return sn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        o;
    for (o in n) i[o] = t[o];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
    );
}
function Re(e) {
    return (e = e.childContextTypes), e != null;
}
function jo() {
    Z(De), Z(Se);
}
function Sd(e, t, n) {
    if (Se.current !== sn) throw Error(A(168));
    X(Se, t), X(De, n);
}
function xh(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(A(108, _w(e) || "Unknown", i));
    return ie({}, n, r);
}
function Bo(e) {
    return (
        (e =
            ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
            sn),
        (kn = Se.current),
        X(Se, e),
        X(De, De.current),
        !0
    );
}
function Cd(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(A(169));
    n
        ? ((e = xh(e, t, kn)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          Z(De),
          Z(Se),
          X(Se, e))
        : Z(De),
        X(De, n);
}
var Et = null,
    _s = !1,
    fl = !1;
function Th(e) {
    Et === null ? (Et = [e]) : Et.push(e);
}
function I1(e) {
    (_s = !0), Th(e);
}
function pn() {
    if (!fl && Et !== null) {
        fl = !0;
        var e = 0,
            t = G;
        try {
            var n = Et;
            for (G = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (Et = null), (_s = !1);
        } catch (i) {
            throw (Et !== null && (Et = Et.slice(e + 1)), Xp(sc, pn), i);
        } finally {
            (G = t), (fl = !1);
        }
    }
    return null;
}
var Xn = [],
    Jn = 0,
    Vo = null,
    Uo = 0,
    He = [],
    We = 0,
    On = null,
    Nt = 1,
    St = "";
function gn(e, t) {
    (Xn[Jn++] = Uo), (Xn[Jn++] = Vo), (Vo = e), (Uo = t);
}
function Ah(e, t, n) {
    (He[We++] = Nt), (He[We++] = St), (He[We++] = On), (On = e);
    var r = Nt;
    e = St;
    var i = 32 - it(r) - 1;
    (r &= ~(1 << i)), (n += 1);
    var o = 32 - it(t) + i;
    if (30 < o) {
        var s = i - (i % 5);
        (o = (r & ((1 << s) - 1)).toString(32)),
            (r >>= s),
            (i -= s),
            (Nt = (1 << (32 - it(t) + i)) | (n << i) | r),
            (St = o + e);
    } else (Nt = (1 << o) | (n << i) | r), (St = e);
}
function mc(e) {
    e.return !== null && (gn(e, 1), Ah(e, 1, 0));
}
function gc(e) {
    for (; e === Vo; )
        (Vo = Xn[--Jn]), (Xn[Jn] = null), (Uo = Xn[--Jn]), (Xn[Jn] = null);
    for (; e === On; )
        (On = He[--We]),
            (He[We] = null),
            (St = He[--We]),
            (He[We] = null),
            (Nt = He[--We]),
            (He[We] = null);
}
var Fe = null,
    Me = null,
    te = !1,
    rt = null;
function kh(e, t) {
    var n = Ke(5, null, null, 0);
    (n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function xd(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t =
                    t.nodeType !== 1 ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t),
                t !== null
                    ? ((e.stateNode = t), (Fe = e), (Me = Qt(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Fe = e), (Me = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = On !== null ? { id: Nt, overflow: St } : null),
                      (e.memoizedState = {
                          dehydrated: t,
                          treeContext: n,
                          retryLane: 1073741824,
                      }),
                      (n = Ke(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Fe = e),
                      (Me = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function oa(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function sa(e) {
    if (te) {
        var t = Me;
        if (t) {
            var n = t;
            if (!xd(e, t)) {
                if (oa(e)) throw Error(A(418));
                t = Qt(n.nextSibling);
                var r = Fe;
                t && xd(e, t)
                    ? kh(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (te = !1), (Fe = e));
            }
        } else {
            if (oa(e)) throw Error(A(418));
            (e.flags = (e.flags & -4097) | 2), (te = !1), (Fe = e);
        }
    }
}
function Td(e) {
    for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
        e = e.return;
    Fe = e;
}
function eo(e) {
    if (e !== Fe) return !1;
    if (!te) return Td(e), (te = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== "head" && t !== "body" && !ta(e.type, e.memoizedProps))),
        t && (t = Me))
    ) {
        if (oa(e)) throw (Oh(), Error(A(418)));
        for (; t; ) kh(e, t), (t = Qt(t.nextSibling));
    }
    if ((Td(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(A(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Me = Qt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            Me = null;
        }
    } else Me = Fe ? Qt(e.stateNode.nextSibling) : null;
    return !0;
}
function Oh() {
    for (var e = Me; e; ) e = Qt(e.nextSibling);
}
function _r() {
    (Me = Fe = null), (te = !1);
}
function vc(e) {
    rt === null ? (rt = [e]) : rt.push(e);
}
var $1 = $t.ReactCurrentBatchConfig;
function tt(e, t) {
    if (e && e.defaultProps) {
        (t = ie({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
var Ho = fn(null),
    Wo = null,
    Zn = null,
    _c = null;
function yc() {
    _c = Zn = Wo = null;
}
function Ec(e) {
    var t = Ho.current;
    Z(Ho), (e._currentValue = t);
}
function la(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function sr(e, t) {
    (Wo = e),
        (_c = Zn = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            ((e.lanes & t) !== 0 && (Le = !0), (e.firstContext = null));
}
function qe(e) {
    var t = e._currentValue;
    if (_c !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), Zn === null)) {
            if (Wo === null) throw Error(A(308));
            (Zn = e), (Wo.dependencies = { lanes: 0, firstContext: e });
        } else Zn = Zn.next = e;
    return t;
}
var wn = null;
function wc(e) {
    wn === null ? (wn = [e]) : wn.push(e);
}
function Ph(e, t, n, r) {
    var i = t.interleaved;
    return (
        i === null ? ((n.next = n), wc(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        Lt(e, r)
    );
}
function Lt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var Bt = !1;
function Nc(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function bh(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
            });
}
function kt(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
    };
}
function qt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (W & 2) !== 0)) {
        var i = r.pending;
        return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            Lt(e, n)
        );
    }
    return (
        (i = r.interleaved),
        i === null ? ((t.next = t), wc(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        Lt(e, n)
    );
}
function yo(e, t, n) {
    if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), lc(e, n);
    }
}
function Ad(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
            o = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var s = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
            } while (n !== null);
            o === null ? (i = o = t) : (o = o.next = t);
        } else i = o = t;
        (n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects,
        }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
}
function Ko(e, t, n, r) {
    var i = e.updateQueue;
    Bt = !1;
    var o = i.firstBaseUpdate,
        s = i.lastBaseUpdate,
        a = i.shared.pending;
    if (a !== null) {
        i.shared.pending = null;
        var c = a,
            u = c.next;
        (c.next = null), s === null ? (o = u) : (s.next = u), (s = c);
        var f = e.alternate;
        f !== null &&
            ((f = f.updateQueue),
            (a = f.lastBaseUpdate),
            a !== s &&
                (a === null ? (f.firstBaseUpdate = u) : (a.next = u),
                (f.lastBaseUpdate = c)));
    }
    if (o !== null) {
        var h = i.baseState;
        (s = 0), (f = u = c = null), (a = o);
        do {
            var v = a.lane,
                y = a.eventTime;
            if ((r & v) === v) {
                f !== null &&
                    (f = f.next =
                        {
                            eventTime: y,
                            lane: 0,
                            tag: a.tag,
                            payload: a.payload,
                            callback: a.callback,
                            next: null,
                        });
                e: {
                    var _ = e,
                        E = a;
                    switch (((v = t), (y = n), E.tag)) {
                        case 1:
                            if (((_ = E.payload), typeof _ == "function")) {
                                h = _.call(y, h, v);
                                break e;
                            }
                            h = _;
                            break e;
                        case 3:
                            _.flags = (_.flags & -65537) | 128;
                        case 0:
                            if (
                                ((_ = E.payload),
                                (v =
                                    typeof _ == "function"
                                        ? _.call(y, h, v)
                                        : _),
                                v == null)
                            )
                                break e;
                            h = ie({}, h, v);
                            break e;
                        case 2:
                            Bt = !0;
                    }
                }
                a.callback !== null &&
                    a.lane !== 0 &&
                    ((e.flags |= 64),
                    (v = i.effects),
                    v === null ? (i.effects = [a]) : v.push(a));
            } else
                (y = {
                    eventTime: y,
                    lane: v,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null,
                }),
                    f === null ? ((u = f = y), (c = h)) : (f = f.next = y),
                    (s |= v);
            if (((a = a.next), a === null)) {
                if (((a = i.shared.pending), a === null)) break;
                (v = a),
                    (a = v.next),
                    (v.next = null),
                    (i.lastBaseUpdate = v),
                    (i.shared.pending = null);
            }
        } while (1);
        if (
            (f === null && (c = h),
            (i.baseState = c),
            (i.firstBaseUpdate = u),
            (i.lastBaseUpdate = f),
            (t = i.shared.interleaved),
            t !== null)
        ) {
            i = t;
            do (s |= i.lane), (i = i.next);
            while (i !== t);
        } else o === null && (i.shared.lanes = 0);
        (bn |= s), (e.lanes = s), (e.memoizedState = h);
    }
}
function kd(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (((r.callback = null), (r = n), typeof i != "function"))
                    throw Error(A(191, i));
                i.call(r);
            }
        }
}
var Lh = new Pp.Component().refs;
function aa(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : ie({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ys = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? $n(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = ke(),
            i = Jt(e),
            o = kt(r, i);
        (o.payload = t),
            n != null && (o.callback = n),
            (t = qt(e, o, i)),
            t !== null && (ot(t, e, i, r), yo(t, e, i));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = ke(),
            i = Jt(e),
            o = kt(r, i);
        (o.tag = 1),
            (o.payload = t),
            n != null && (o.callback = n),
            (t = qt(e, o, i)),
            t !== null && (ot(t, e, i, r), yo(t, e, i));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = ke(),
            r = Jt(e),
            i = kt(n, r);
        (i.tag = 2),
            t != null && (i.callback = t),
            (t = qt(e, i, r)),
            t !== null && (ot(t, e, r, n), yo(t, e, r));
    },
};
function Od(e, t, n, r, i, o, s) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(r, o, s)
            : t.prototype && t.prototype.isPureReactComponent
            ? !fi(n, r) || !fi(i, o)
            : !0
    );
}
function Dh(e, t, n) {
    var r = !1,
        i = sn,
        o = t.contextType;
    return (
        typeof o == "object" && o !== null
            ? (o = qe(o))
            : ((i = Re(t) ? kn : Se.current),
              (r = t.contextTypes),
              (o = (r = r != null) ? vr(e, i) : sn)),
        (t = new t(n, o)),
        (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = ys),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = i),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
    );
}
function Pd(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
            t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && ys.enqueueReplaceState(t, t.state, null);
}
function ca(e, t, n, r) {
    var i = e.stateNode;
    (i.props = n), (i.state = e.memoizedState), (i.refs = Lh), Nc(e);
    var o = t.contextType;
    typeof o == "object" && o !== null
        ? (i.context = qe(o))
        : ((o = Re(t) ? kn : Se.current), (i.context = vr(e, o))),
        (i.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (aa(e, t, o, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function" ||
            (typeof i.UNSAFE_componentWillMount != "function" &&
                typeof i.componentWillMount != "function") ||
            ((t = i.state),
            typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" &&
                i.UNSAFE_componentWillMount(),
            t !== i.state && ys.enqueueReplaceState(i, i.state, null),
            Ko(e, n, i, r),
            (i.state = e.memoizedState)),
        typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function zr(e, t, n) {
    if (
        ((e = n.ref),
        e !== null && typeof e != "function" && typeof e != "object")
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(A(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(A(147, e));
            var i = r,
                o = "" + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == "function" &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (s) {
                      var a = i.refs;
                      a === Lh && (a = i.refs = {}),
                          s === null ? delete a[o] : (a[o] = s);
                  }),
                  (t._stringRef = o),
                  t);
        }
        if (typeof e != "string") throw Error(A(284));
        if (!n._owner) throw Error(A(290, e));
    }
    return e;
}
function to(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            A(
                31,
                e === "[object Object]"
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : e
            )
        ))
    );
}
function bd(e) {
    var t = e._init;
    return t(e._payload);
}
function Rh(e) {
    function t(m, p) {
        if (e) {
            var g = m.deletions;
            g === null ? ((m.deletions = [p]), (m.flags |= 16)) : g.push(p);
        }
    }
    function n(m, p) {
        if (!e) return null;
        for (; p !== null; ) t(m, p), (p = p.sibling);
        return null;
    }
    function r(m, p) {
        for (m = new Map(); p !== null; )
            p.key !== null ? m.set(p.key, p) : m.set(p.index, p),
                (p = p.sibling);
        return m;
    }
    function i(m, p) {
        return (m = Zt(m, p)), (m.index = 0), (m.sibling = null), m;
    }
    function o(m, p, g) {
        return (
            (m.index = g),
            e
                ? ((g = m.alternate),
                  g !== null
                      ? ((g = g.index), g < p ? ((m.flags |= 2), p) : g)
                      : ((m.flags |= 2), p))
                : ((m.flags |= 1048576), p)
        );
    }
    function s(m) {
        return e && m.alternate === null && (m.flags |= 2), m;
    }
    function a(m, p, g, w) {
        return p === null || p.tag !== 6
            ? ((p = yl(g, m.mode, w)), (p.return = m), p)
            : ((p = i(p, g)), (p.return = m), p);
    }
    function c(m, p, g, w) {
        var C = g.type;
        return C === Wn
            ? f(m, p, g.props.children, w, g.key)
            : p !== null &&
              (p.elementType === C ||
                  (typeof C == "object" &&
                      C !== null &&
                      C.$$typeof === jt &&
                      bd(C) === p.type))
            ? ((w = i(p, g.props)), (w.ref = zr(m, p, g)), (w.return = m), w)
            : ((w = xo(g.type, g.key, g.props, null, m.mode, w)),
              (w.ref = zr(m, p, g)),
              (w.return = m),
              w);
    }
    function u(m, p, g, w) {
        return p === null ||
            p.tag !== 4 ||
            p.stateNode.containerInfo !== g.containerInfo ||
            p.stateNode.implementation !== g.implementation
            ? ((p = El(g, m.mode, w)), (p.return = m), p)
            : ((p = i(p, g.children || [])), (p.return = m), p);
    }
    function f(m, p, g, w, C) {
        return p === null || p.tag !== 7
            ? ((p = xn(g, m.mode, w, C)), (p.return = m), p)
            : ((p = i(p, g)), (p.return = m), p);
    }
    function h(m, p, g) {
        if ((typeof p == "string" && p !== "") || typeof p == "number")
            return (p = yl("" + p, m.mode, g)), (p.return = m), p;
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
                case Hi:
                    return (
                        (g = xo(p.type, p.key, p.props, null, m.mode, g)),
                        (g.ref = zr(m, null, p)),
                        (g.return = m),
                        g
                    );
                case Hn:
                    return (p = El(p, m.mode, g)), (p.return = m), p;
                case jt:
                    var w = p._init;
                    return h(m, w(p._payload), g);
            }
            if (Ur(p) || Rr(p))
                return (p = xn(p, m.mode, g, null)), (p.return = m), p;
            to(m, p);
        }
        return null;
    }
    function v(m, p, g, w) {
        var C = p !== null ? p.key : null;
        if ((typeof g == "string" && g !== "") || typeof g == "number")
            return C !== null ? null : a(m, p, "" + g, w);
        if (typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
                case Hi:
                    return g.key === C ? c(m, p, g, w) : null;
                case Hn:
                    return g.key === C ? u(m, p, g, w) : null;
                case jt:
                    return (C = g._init), v(m, p, C(g._payload), w);
            }
            if (Ur(g) || Rr(g)) return C !== null ? null : f(m, p, g, w, null);
            to(m, g);
        }
        return null;
    }
    function y(m, p, g, w, C) {
        if ((typeof w == "string" && w !== "") || typeof w == "number")
            return (m = m.get(g) || null), a(p, m, "" + w, C);
        if (typeof w == "object" && w !== null) {
            switch (w.$$typeof) {
                case Hi:
                    return (
                        (m = m.get(w.key === null ? g : w.key) || null),
                        c(p, m, w, C)
                    );
                case Hn:
                    return (
                        (m = m.get(w.key === null ? g : w.key) || null),
                        u(p, m, w, C)
                    );
                case jt:
                    var T = w._init;
                    return y(m, p, g, T(w._payload), C);
            }
            if (Ur(w) || Rr(w))
                return (m = m.get(g) || null), f(p, m, w, C, null);
            to(p, w);
        }
        return null;
    }
    function _(m, p, g, w) {
        for (
            var C = null, T = null, O = p, k = (p = 0), $ = null;
            O !== null && k < g.length;
            k++
        ) {
            O.index > k ? (($ = O), (O = null)) : ($ = O.sibling);
            var D = v(m, O, g[k], w);
            if (D === null) {
                O === null && (O = $);
                break;
            }
            e && O && D.alternate === null && t(m, O),
                (p = o(D, p, k)),
                T === null ? (C = D) : (T.sibling = D),
                (T = D),
                (O = $);
        }
        if (k === g.length) return n(m, O), te && gn(m, k), C;
        if (O === null) {
            for (; k < g.length; k++)
                (O = h(m, g[k], w)),
                    O !== null &&
                        ((p = o(O, p, k)),
                        T === null ? (C = O) : (T.sibling = O),
                        (T = O));
            return te && gn(m, k), C;
        }
        for (O = r(m, O); k < g.length; k++)
            ($ = y(O, m, k, g[k], w)),
                $ !== null &&
                    (e &&
                        $.alternate !== null &&
                        O.delete($.key === null ? k : $.key),
                    (p = o($, p, k)),
                    T === null ? (C = $) : (T.sibling = $),
                    (T = $));
        return (
            e &&
                O.forEach(function (z) {
                    return t(m, z);
                }),
            te && gn(m, k),
            C
        );
    }
    function E(m, p, g, w) {
        var C = Rr(g);
        if (typeof C != "function") throw Error(A(150));
        if (((g = C.call(g)), g == null)) throw Error(A(151));
        for (
            var T = (C = null), O = p, k = (p = 0), $ = null, D = g.next();
            O !== null && !D.done;
            k++, D = g.next()
        ) {
            O.index > k ? (($ = O), (O = null)) : ($ = O.sibling);
            var z = v(m, O, D.value, w);
            if (z === null) {
                O === null && (O = $);
                break;
            }
            e && O && z.alternate === null && t(m, O),
                (p = o(z, p, k)),
                T === null ? (C = z) : (T.sibling = z),
                (T = z),
                (O = $);
        }
        if (D.done) return n(m, O), te && gn(m, k), C;
        if (O === null) {
            for (; !D.done; k++, D = g.next())
                (D = h(m, D.value, w)),
                    D !== null &&
                        ((p = o(D, p, k)),
                        T === null ? (C = D) : (T.sibling = D),
                        (T = D));
            return te && gn(m, k), C;
        }
        for (O = r(m, O); !D.done; k++, D = g.next())
            (D = y(O, m, k, D.value, w)),
                D !== null &&
                    (e &&
                        D.alternate !== null &&
                        O.delete(D.key === null ? k : D.key),
                    (p = o(D, p, k)),
                    T === null ? (C = D) : (T.sibling = D),
                    (T = D));
        return (
            e &&
                O.forEach(function (V) {
                    return t(m, V);
                }),
            te && gn(m, k),
            C
        );
    }
    function P(m, p, g, w) {
        if (
            (typeof g == "object" &&
                g !== null &&
                g.type === Wn &&
                g.key === null &&
                (g = g.props.children),
            typeof g == "object" && g !== null)
        ) {
            switch (g.$$typeof) {
                case Hi:
                    e: {
                        for (var C = g.key, T = p; T !== null; ) {
                            if (T.key === C) {
                                if (((C = g.type), C === Wn)) {
                                    if (T.tag === 7) {
                                        n(m, T.sibling),
                                            (p = i(T, g.props.children)),
                                            (p.return = m),
                                            (m = p);
                                        break e;
                                    }
                                } else if (
                                    T.elementType === C ||
                                    (typeof C == "object" &&
                                        C !== null &&
                                        C.$$typeof === jt &&
                                        bd(C) === T.type)
                                ) {
                                    n(m, T.sibling),
                                        (p = i(T, g.props)),
                                        (p.ref = zr(m, T, g)),
                                        (p.return = m),
                                        (m = p);
                                    break e;
                                }
                                n(m, T);
                                break;
                            } else t(m, T);
                            T = T.sibling;
                        }
                        g.type === Wn
                            ? ((p = xn(g.props.children, m.mode, w, g.key)),
                              (p.return = m),
                              (m = p))
                            : ((w = xo(
                                  g.type,
                                  g.key,
                                  g.props,
                                  null,
                                  m.mode,
                                  w
                              )),
                              (w.ref = zr(m, p, g)),
                              (w.return = m),
                              (m = w));
                    }
                    return s(m);
                case Hn:
                    e: {
                        for (T = g.key; p !== null; ) {
                            if (p.key === T)
                                if (
                                    p.tag === 4 &&
                                    p.stateNode.containerInfo ===
                                        g.containerInfo &&
                                    p.stateNode.implementation ===
                                        g.implementation
                                ) {
                                    n(m, p.sibling),
                                        (p = i(p, g.children || [])),
                                        (p.return = m),
                                        (m = p);
                                    break e;
                                } else {
                                    n(m, p);
                                    break;
                                }
                            else t(m, p);
                            p = p.sibling;
                        }
                        (p = El(g, m.mode, w)), (p.return = m), (m = p);
                    }
                    return s(m);
                case jt:
                    return (T = g._init), P(m, p, T(g._payload), w);
            }
            if (Ur(g)) return _(m, p, g, w);
            if (Rr(g)) return E(m, p, g, w);
            to(m, g);
        }
        return (typeof g == "string" && g !== "") || typeof g == "number"
            ? ((g = "" + g),
              p !== null && p.tag === 6
                  ? (n(m, p.sibling), (p = i(p, g)), (p.return = m), (m = p))
                  : (n(m, p), (p = yl(g, m.mode, w)), (p.return = m), (m = p)),
              s(m))
            : n(m, p);
    }
    return P;
}
var yr = Rh(!0),
    Ih = Rh(!1),
    Ri = {},
    gt = fn(Ri),
    gi = fn(Ri),
    vi = fn(Ri);
function Nn(e) {
    if (e === Ri) throw Error(A(174));
    return e;
}
function Sc(e, t) {
    switch ((X(vi, t), X(gi, e), X(gt, Ri), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Bl(null, "");
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = Bl(t, e));
    }
    Z(gt), X(gt, t);
}
function Er() {
    Z(gt), Z(gi), Z(vi);
}
function $h(e) {
    Nn(vi.current);
    var t = Nn(gt.current),
        n = Bl(t, e.type);
    t !== n && (X(gi, e), X(gt, n));
}
function Cc(e) {
    gi.current === e && (Z(gt), Z(gi));
}
var ne = fn(0);
function Yo(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated),
                n === null || n.data === "$?" || n.data === "$!")
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var pl = [];
function xc() {
    for (var e = 0; e < pl.length; e++)
        pl[e]._workInProgressVersionPrimary = null;
    pl.length = 0;
}
var Eo = $t.ReactCurrentDispatcher,
    hl = $t.ReactCurrentBatchConfig,
    Pn = 0,
    re = null,
    fe = null,
    me = null,
    Go = !1,
    Zr = !1,
    _i = 0,
    M1 = 0;
function Ee() {
    throw Error(A(321));
}
function Tc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!st(e[n], t[n])) return !1;
    return !0;
}
function Ac(e, t, n, r, i, o) {
    if (
        ((Pn = o),
        (re = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Eo.current = e === null || e.memoizedState === null ? B1 : V1),
        (e = n(r, i)),
        Zr)
    ) {
        o = 0;
        do {
            if (((Zr = !1), (_i = 0), 25 <= o)) throw Error(A(301));
            (o += 1),
                (me = fe = null),
                (t.updateQueue = null),
                (Eo.current = U1),
                (e = n(r, i));
        } while (Zr);
    }
    if (
        ((Eo.current = Qo),
        (t = fe !== null && fe.next !== null),
        (Pn = 0),
        (me = fe = re = null),
        (Go = !1),
        t)
    )
        throw Error(A(300));
    return e;
}
function kc() {
    var e = _i !== 0;
    return (_i = 0), e;
}
function ut() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
    };
    return me === null ? (re.memoizedState = me = e) : (me = me.next = e), me;
}
function Xe() {
    if (fe === null) {
        var e = re.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = fe.next;
    var t = me === null ? re.memoizedState : me.next;
    if (t !== null) (me = t), (fe = e);
    else {
        if (e === null) throw Error(A(310));
        (fe = e),
            (e = {
                memoizedState: fe.memoizedState,
                baseState: fe.baseState,
                baseQueue: fe.baseQueue,
                queue: fe.queue,
                next: null,
            }),
            me === null ? (re.memoizedState = me = e) : (me = me.next = e);
    }
    return me;
}
function yi(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function ml(e) {
    var t = Xe(),
        n = t.queue;
    if (n === null) throw Error(A(311));
    n.lastRenderedReducer = e;
    var r = fe,
        i = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (i !== null) {
            var s = i.next;
            (i.next = o.next), (o.next = s);
        }
        (r.baseQueue = i = o), (n.pending = null);
    }
    if (i !== null) {
        (o = i.next), (r = r.baseState);
        var a = (s = null),
            c = null,
            u = o;
        do {
            var f = u.lane;
            if ((Pn & f) === f)
                c !== null &&
                    (c = c.next =
                        {
                            lane: 0,
                            action: u.action,
                            hasEagerState: u.hasEagerState,
                            eagerState: u.eagerState,
                            next: null,
                        }),
                    (r = u.hasEagerState ? u.eagerState : e(r, u.action));
            else {
                var h = {
                    lane: f,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null,
                };
                c === null ? ((a = c = h), (s = r)) : (c = c.next = h),
                    (re.lanes |= f),
                    (bn |= f);
            }
            u = u.next;
        } while (u !== null && u !== o);
        c === null ? (s = r) : (c.next = a),
            st(r, t.memoizedState) || (Le = !0),
            (t.memoizedState = r),
            (t.baseState = s),
            (t.baseQueue = c),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        i = e;
        do (o = i.lane), (re.lanes |= o), (bn |= o), (i = i.next);
        while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function gl(e) {
    var t = Xe(),
        n = t.queue;
    if (n === null) throw Error(A(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        o = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var s = (i = i.next);
        do (o = e(o, s.action)), (s = s.next);
        while (s !== i);
        st(o, t.memoizedState) || (Le = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o);
    }
    return [o, r];
}
function Mh() {}
function Fh(e, t) {
    var n = re,
        r = Xe(),
        i = t(),
        o = !st(r.memoizedState, i);
    if (
        (o && ((r.memoizedState = i), (Le = !0)),
        (r = r.queue),
        Oc(Bh.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (me !== null && me.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
            Ei(9, jh.bind(null, n, r, i, t), void 0, null),
            ge === null)
        )
            throw Error(A(349));
        (Pn & 30) !== 0 || zh(n, t, i);
    }
    return i;
}
function zh(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = re.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (re.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function jh(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), Vh(t) && Uh(e);
}
function Bh(e, t, n) {
    return n(function () {
        Vh(t) && Uh(e);
    });
}
function Vh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !st(e, n);
    } catch {
        return !0;
    }
}
function Uh(e) {
    var t = Lt(e, 1);
    t !== null && ot(t, e, 1, -1);
}
function Ld(e) {
    var t = ut();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: yi,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = j1.bind(null, re, e)),
        [t.memoizedState, e]
    );
}
function Ei(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = re.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (re.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e))),
        e
    );
}
function Hh() {
    return Xe().memoizedState;
}
function wo(e, t, n, r) {
    var i = ut();
    (re.flags |= e),
        (i.memoizedState = Ei(1 | t, n, void 0, r === void 0 ? null : r));
}
function Es(e, t, n, r) {
    var i = Xe();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (fe !== null) {
        var s = fe.memoizedState;
        if (((o = s.destroy), r !== null && Tc(r, s.deps))) {
            i.memoizedState = Ei(t, n, o, r);
            return;
        }
    }
    (re.flags |= e), (i.memoizedState = Ei(1 | t, n, o, r));
}
function Dd(e, t) {
    return wo(8390656, 8, e, t);
}
function Oc(e, t) {
    return Es(2048, 8, e, t);
}
function Wh(e, t) {
    return Es(4, 2, e, t);
}
function Kh(e, t) {
    return Es(4, 4, e, t);
}
function Yh(e, t) {
    if (typeof t == "function")
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function Gh(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null), Es(4, 4, Yh.bind(null, t, e), n)
    );
}
function Pc() {}
function Qh(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Tc(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function qh(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Tc(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Xh(e, t, n) {
    return (Pn & 21) === 0
        ? (e.baseState && ((e.baseState = !1), (Le = !0)),
          (e.memoizedState = n))
        : (st(n, t) ||
              ((n = eh()), (re.lanes |= n), (bn |= n), (e.baseState = !0)),
          t);
}
function F1(e, t) {
    var n = G;
    (G = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = hl.transition;
    hl.transition = {};
    try {
        e(!1), t();
    } finally {
        (G = n), (hl.transition = r);
    }
}
function Jh() {
    return Xe().memoizedState;
}
function z1(e, t, n) {
    var r = Jt(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        }),
        Zh(e))
    )
        em(t, n);
    else if (((n = Ph(e, t, n, r)), n !== null)) {
        var i = ke();
        ot(n, e, r, i), tm(n, t, r);
    }
}
function j1(e, t, n) {
    var r = Jt(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        };
    if (Zh(e)) em(t, i);
    else {
        var o = e.alternate;
        if (
            e.lanes === 0 &&
            (o === null || o.lanes === 0) &&
            ((o = t.lastRenderedReducer), o !== null)
        )
            try {
                var s = t.lastRenderedState,
                    a = o(s, n);
                if (((i.hasEagerState = !0), (i.eagerState = a), st(a, s))) {
                    var c = t.interleaved;
                    c === null
                        ? ((i.next = i), wc(t))
                        : ((i.next = c.next), (c.next = i)),
                        (t.interleaved = i);
                    return;
                }
            } catch {
            } finally {
            }
        (n = Ph(e, t, i, r)),
            n !== null && ((i = ke()), ot(n, e, r, i), tm(n, t, r));
    }
}
function Zh(e) {
    var t = e.alternate;
    return e === re || (t !== null && t === re);
}
function em(e, t) {
    Zr = Go = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
}
function tm(e, t, n) {
    if ((n & 4194240) !== 0) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), lc(e, n);
    }
}
var Qo = {
        readContext: qe,
        useCallback: Ee,
        useContext: Ee,
        useEffect: Ee,
        useImperativeHandle: Ee,
        useInsertionEffect: Ee,
        useLayoutEffect: Ee,
        useMemo: Ee,
        useReducer: Ee,
        useRef: Ee,
        useState: Ee,
        useDebugValue: Ee,
        useDeferredValue: Ee,
        useTransition: Ee,
        useMutableSource: Ee,
        useSyncExternalStore: Ee,
        useId: Ee,
        unstable_isNewReconciler: !1,
    },
    B1 = {
        readContext: qe,
        useCallback: function (e, t) {
            return (ut().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: qe,
        useEffect: Dd,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                wo(4194308, 4, Yh.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return wo(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return wo(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = ut();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = ut();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = z1.bind(null, re, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = ut();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: Ld,
        useDebugValue: Pc,
        useDeferredValue: function (e) {
            return (ut().memoizedState = e);
        },
        useTransition: function () {
            var e = Ld(!1),
                t = e[0];
            return (e = F1.bind(null, e[1])), (ut().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = re,
                i = ut();
            if (te) {
                if (n === void 0) throw Error(A(407));
                n = n();
            } else {
                if (((n = t()), ge === null)) throw Error(A(349));
                (Pn & 30) !== 0 || zh(r, t, n);
            }
            i.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
                (i.queue = o),
                Dd(Bh.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                Ei(9, jh.bind(null, r, o, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = ut(),
                t = ge.identifierPrefix;
            if (te) {
                var n = St,
                    r = Nt;
                (n = (r & ~(1 << (32 - it(r) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = _i++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":");
            } else (n = M1++), (t = ":" + t + "r" + n.toString(32) + ":");
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    V1 = {
        readContext: qe,
        useCallback: Qh,
        useContext: qe,
        useEffect: Oc,
        useImperativeHandle: Gh,
        useInsertionEffect: Wh,
        useLayoutEffect: Kh,
        useMemo: qh,
        useReducer: ml,
        useRef: Hh,
        useState: function () {
            return ml(yi);
        },
        useDebugValue: Pc,
        useDeferredValue: function (e) {
            var t = Xe();
            return Xh(t, fe.memoizedState, e);
        },
        useTransition: function () {
            var e = ml(yi)[0],
                t = Xe().memoizedState;
            return [e, t];
        },
        useMutableSource: Mh,
        useSyncExternalStore: Fh,
        useId: Jh,
        unstable_isNewReconciler: !1,
    },
    U1 = {
        readContext: qe,
        useCallback: Qh,
        useContext: qe,
        useEffect: Oc,
        useImperativeHandle: Gh,
        useInsertionEffect: Wh,
        useLayoutEffect: Kh,
        useMemo: qh,
        useReducer: gl,
        useRef: Hh,
        useState: function () {
            return gl(yi);
        },
        useDebugValue: Pc,
        useDeferredValue: function (e) {
            var t = Xe();
            return fe === null
                ? (t.memoizedState = e)
                : Xh(t, fe.memoizedState, e);
        },
        useTransition: function () {
            var e = gl(yi)[0],
                t = Xe().memoizedState;
            return [e, t];
        },
        useMutableSource: Mh,
        useSyncExternalStore: Fh,
        useId: Jh,
        unstable_isNewReconciler: !1,
    };
function wr(e, t) {
    try {
        var n = "",
            r = t;
        do (n += vw(r)), (r = r.return);
        while (r);
        var i = n;
    } catch (o) {
        i =
            `
Error generating stack: ` +
            o.message +
            `
` +
            o.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
}
function vl(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n != null ? n : null,
        digest: t != null ? t : null,
    };
}
function ua(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var H1 = typeof WeakMap == "function" ? WeakMap : Map;
function nm(e, t, n) {
    (n = kt(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            Xo || ((Xo = !0), (Ea = r)), ua(e, t);
        }),
        n
    );
}
function rm(e, t, n) {
    (n = kt(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        (n.payload = function () {
            return r(i);
        }),
            (n.callback = function () {
                ua(e, t);
            });
    }
    var o = e.stateNode;
    return (
        o !== null &&
            typeof o.componentDidCatch == "function" &&
            (n.callback = function () {
                ua(e, t),
                    typeof r != "function" &&
                        (Xt === null ? (Xt = new Set([this])) : Xt.add(this));
                var s = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: s !== null ? s : "",
                });
            }),
        n
    );
}
function Rd(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new H1();
        var i = new Set();
        r.set(t, i);
    } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
    i.has(n) || (i.add(n), (e = iN.bind(null, e, t, n)), t.then(e, e));
}
function Id(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated !== null : !0)),
            t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function $d(e, t, n, r, i) {
    return (e.mode & 1) === 0
        ? (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                    (n.alternate === null
                        ? (n.tag = 17)
                        : ((t = kt(-1, 1)), (t.tag = 2), qt(n, t, 1))),
                (n.lanes |= 1)),
          e)
        : ((e.flags |= 65536), (e.lanes = i), e);
}
var W1 = $t.ReactCurrentOwner,
    Le = !1;
function xe(e, t, n, r) {
    t.child = e === null ? Ih(t, null, n, r) : yr(t, e.child, n, r);
}
function Md(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return (
        sr(t, i),
        (r = Ac(e, t, n, r, o, i)),
        (n = kc()),
        e !== null && !Le
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              Dt(e, t, i))
            : (te && n && mc(t), (t.flags |= 1), xe(e, t, r, i), t.child)
    );
}
function Fd(e, t, n, r, i) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" &&
            !Fc(o) &&
            o.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = o), im(e, t, o, r, i))
            : ((e = xo(n.type, null, r, t, t.mode, i)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((o = e.child), (e.lanes & i) === 0)) {
        var s = o.memoizedProps;
        if (
            ((n = n.compare),
            (n = n !== null ? n : fi),
            n(s, r) && e.ref === t.ref)
        )
            return Dt(e, t, i);
    }
    return (
        (t.flags |= 1),
        (e = Zt(o, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function im(e, t, n, r, i) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (fi(o, r) && e.ref === t.ref)
            if (((Le = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
                (e.flags & 131072) !== 0 && (Le = !0);
            else return (t.lanes = e.lanes), Dt(e, t, i);
    }
    return da(e, t, n, r, i);
}
function om(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if ((t.mode & 1) === 0)
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                X(tr, $e),
                ($e |= n);
        else {
            if ((n & 1073741824) === 0)
                return (
                    (e = o !== null ? o.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null,
                    }),
                    (t.updateQueue = null),
                    X(tr, $e),
                    ($e |= e),
                    null
                );
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                (r = o !== null ? o.baseLanes : n),
                X(tr, $e),
                ($e |= r);
        }
    else
        o !== null
            ? ((r = o.baseLanes | n), (t.memoizedState = null))
            : (r = n),
            X(tr, $e),
            ($e |= r);
    return xe(e, t, i, n), t.child;
}
function sm(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function da(e, t, n, r, i) {
    var o = Re(n) ? kn : Se.current;
    return (
        (o = vr(t, o)),
        sr(t, i),
        (n = Ac(e, t, n, r, o, i)),
        (r = kc()),
        e !== null && !Le
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              Dt(e, t, i))
            : (te && r && mc(t), (t.flags |= 1), xe(e, t, n, i), t.child)
    );
}
function zd(e, t, n, r, i) {
    if (Re(n)) {
        var o = !0;
        Bo(t);
    } else o = !1;
    if ((sr(t, i), t.stateNode === null))
        No(e, t), Dh(t, n, r), ca(t, n, r, i), (r = !0);
    else if (e === null) {
        var s = t.stateNode,
            a = t.memoizedProps;
        s.props = a;
        var c = s.context,
            u = n.contextType;
        typeof u == "object" && u !== null
            ? (u = qe(u))
            : ((u = Re(n) ? kn : Se.current), (u = vr(t, u)));
        var f = n.getDerivedStateFromProps,
            h =
                typeof f == "function" ||
                typeof s.getSnapshotBeforeUpdate == "function";
        h ||
            (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
                typeof s.componentWillReceiveProps != "function") ||
            ((a !== r || c !== u) && Pd(t, s, r, u)),
            (Bt = !1);
        var v = t.memoizedState;
        (s.state = v),
            Ko(t, r, s, i),
            (c = t.memoizedState),
            a !== r || v !== c || De.current || Bt
                ? (typeof f == "function" &&
                      (aa(t, n, f, r), (c = t.memoizedState)),
                  (a = Bt || Od(t, n, a, r, v, c, u))
                      ? (h ||
                            (typeof s.UNSAFE_componentWillMount != "function" &&
                                typeof s.componentWillMount != "function") ||
                            (typeof s.componentWillMount == "function" &&
                                s.componentWillMount(),
                            typeof s.UNSAFE_componentWillMount == "function" &&
                                s.UNSAFE_componentWillMount()),
                        typeof s.componentDidMount == "function" &&
                            (t.flags |= 4194308))
                      : (typeof s.componentDidMount == "function" &&
                            (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = c)),
                  (s.props = r),
                  (s.state = c),
                  (s.context = u),
                  (r = a))
                : (typeof s.componentDidMount == "function" &&
                      (t.flags |= 4194308),
                  (r = !1));
    } else {
        (s = t.stateNode),
            bh(e, t),
            (a = t.memoizedProps),
            (u = t.type === t.elementType ? a : tt(t.type, a)),
            (s.props = u),
            (h = t.pendingProps),
            (v = s.context),
            (c = n.contextType),
            typeof c == "object" && c !== null
                ? (c = qe(c))
                : ((c = Re(n) ? kn : Se.current), (c = vr(t, c)));
        var y = n.getDerivedStateFromProps;
        (f =
            typeof y == "function" ||
            typeof s.getSnapshotBeforeUpdate == "function") ||
            (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
                typeof s.componentWillReceiveProps != "function") ||
            ((a !== h || v !== c) && Pd(t, s, r, c)),
            (Bt = !1),
            (v = t.memoizedState),
            (s.state = v),
            Ko(t, r, s, i);
        var _ = t.memoizedState;
        a !== h || v !== _ || De.current || Bt
            ? (typeof y == "function" &&
                  (aa(t, n, y, r), (_ = t.memoizedState)),
              (u = Bt || Od(t, n, u, r, v, _, c) || !1)
                  ? (f ||
                        (typeof s.UNSAFE_componentWillUpdate != "function" &&
                            typeof s.componentWillUpdate != "function") ||
                        (typeof s.componentWillUpdate == "function" &&
                            s.componentWillUpdate(r, _, c),
                        typeof s.UNSAFE_componentWillUpdate == "function" &&
                            s.UNSAFE_componentWillUpdate(r, _, c)),
                    typeof s.componentDidUpdate == "function" && (t.flags |= 4),
                    typeof s.getSnapshotBeforeUpdate == "function" &&
                        (t.flags |= 1024))
                  : (typeof s.componentDidUpdate != "function" ||
                        (a === e.memoizedProps && v === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof s.getSnapshotBeforeUpdate != "function" ||
                        (a === e.memoizedProps && v === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = _)),
              (s.props = r),
              (s.state = _),
              (s.context = c),
              (r = u))
            : (typeof s.componentDidUpdate != "function" ||
                  (a === e.memoizedProps && v === e.memoizedState) ||
                  (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != "function" ||
                  (a === e.memoizedProps && v === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return fa(e, t, n, r, o, i);
}
function fa(e, t, n, r, i, o) {
    sm(e, t);
    var s = (t.flags & 128) !== 0;
    if (!r && !s) return i && Cd(t, n, !1), Dt(e, t, o);
    (r = t.stateNode), (W1.current = t);
    var a =
        s && typeof n.getDerivedStateFromError != "function"
            ? null
            : r.render();
    return (
        (t.flags |= 1),
        e !== null && s
            ? ((t.child = yr(t, e.child, null, o)),
              (t.child = yr(t, null, a, o)))
            : xe(e, t, a, o),
        (t.memoizedState = r.state),
        i && Cd(t, n, !0),
        t.child
    );
}
function lm(e) {
    var t = e.stateNode;
    t.pendingContext
        ? Sd(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Sd(e, t.context, !1),
        Sc(e, t.containerInfo);
}
function jd(e, t, n, r, i) {
    return _r(), vc(i), (t.flags |= 256), xe(e, t, n, r), t.child;
}
var pa = { dehydrated: null, treeContext: null, retryLane: 0 };
function ha(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function am(e, t, n) {
    var r = t.pendingProps,
        i = ne.current,
        o = !1,
        s = (t.flags & 128) !== 0,
        a;
    if (
        ((a = s) ||
            (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
        a
            ? ((o = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (i |= 1),
        X(ne, i & 1),
        e === null)
    )
        return (
            sa(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? ((t.mode & 1) === 0
                      ? (t.lanes = 1)
                      : e.data === "$!"
                      ? (t.lanes = 8)
                      : (t.lanes = 1073741824),
                  null)
                : ((s = r.children),
                  (e = r.fallback),
                  o
                      ? ((r = t.mode),
                        (o = t.child),
                        (s = { mode: "hidden", children: s }),
                        (r & 1) === 0 && o !== null
                            ? ((o.childLanes = 0), (o.pendingProps = s))
                            : (o = Ss(s, r, 0, null)),
                        (e = xn(e, r, n, null)),
                        (o.return = t),
                        (e.return = t),
                        (o.sibling = e),
                        (t.child = o),
                        (t.child.memoizedState = ha(n)),
                        (t.memoizedState = pa),
                        e)
                      : bc(t, s))
        );
    if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
        return K1(e, t, s, r, a, i, n);
    if (o) {
        (o = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling);
        var c = { mode: "hidden", children: r.children };
        return (
            (s & 1) === 0 && t.child !== i
                ? ((r = t.child),
                  (r.childLanes = 0),
                  (r.pendingProps = c),
                  (t.deletions = null))
                : ((r = Zt(i, c)),
                  (r.subtreeFlags = i.subtreeFlags & 14680064)),
            a !== null
                ? (o = Zt(a, o))
                : ((o = xn(o, s, n, null)), (o.flags |= 2)),
            (o.return = t),
            (r.return = t),
            (r.sibling = o),
            (t.child = r),
            (r = o),
            (o = t.child),
            (s = e.child.memoizedState),
            (s =
                s === null
                    ? ha(n)
                    : {
                          baseLanes: s.baseLanes | n,
                          cachePool: null,
                          transitions: s.transitions,
                      }),
            (o.memoizedState = s),
            (o.childLanes = e.childLanes & ~n),
            (t.memoizedState = pa),
            r
        );
    }
    return (
        (o = e.child),
        (e = o.sibling),
        (r = Zt(o, { mode: "visible", children: r.children })),
        (t.mode & 1) === 0 && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
            ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function bc(e, t) {
    return (
        (t = Ss({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function no(e, t, n, r) {
    return (
        r !== null && vc(r),
        yr(t, e.child, null, n),
        (e = bc(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function K1(e, t, n, r, i, o, s) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = vl(Error(A(422)))), no(e, t, s, r))
            : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = r.fallback),
              (i = t.mode),
              (r = Ss({ mode: "visible", children: r.children }, i, 0, null)),
              (o = xn(o, i, s, null)),
              (o.flags |= 2),
              (r.return = t),
              (o.return = t),
              (r.sibling = o),
              (t.child = r),
              (t.mode & 1) !== 0 && yr(t, e.child, null, s),
              (t.child.memoizedState = ha(s)),
              (t.memoizedState = pa),
              o);
    if ((t.mode & 1) === 0) return no(e, t, s, null);
    if (i.data === "$!") {
        if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
        return (
            (r = a), (o = Error(A(419))), (r = vl(o, r, void 0)), no(e, t, s, r)
        );
    }
    if (((a = (s & e.childLanes) !== 0), Le || a)) {
        if (((r = ge), r !== null)) {
            switch (s & -s) {
                case 4:
                    i = 2;
                    break;
                case 16:
                    i = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    i = 32;
                    break;
                case 536870912:
                    i = 268435456;
                    break;
                default:
                    i = 0;
            }
            (i = (i & (r.suspendedLanes | s)) !== 0 ? 0 : i),
                i !== 0 &&
                    i !== o.retryLane &&
                    ((o.retryLane = i), Lt(e, i), ot(r, e, i, -1));
        }
        return Mc(), (r = vl(Error(A(421)))), no(e, t, s, r);
    }
    return i.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = oN.bind(null, e)),
          (i._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (Me = Qt(i.nextSibling)),
          (Fe = t),
          (te = !0),
          (rt = null),
          e !== null &&
              ((He[We++] = Nt),
              (He[We++] = St),
              (He[We++] = On),
              (Nt = e.id),
              (St = e.overflow),
              (On = t)),
          (t = bc(t, r.children)),
          (t.flags |= 4096),
          t);
}
function Bd(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), la(e.return, t, n);
}
function _l(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null
        ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: i,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = i));
}
function cm(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        o = r.tail;
    if ((xe(e, t, r.children, n), (r = ne.current), (r & 2) !== 0))
        (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && (e.flags & 128) !== 0)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && Bd(e, n, t);
                else if (e.tag === 19) Bd(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        r &= 1;
    }
    if ((X(ne, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
        switch (i) {
            case "forwards":
                for (n = t.child, i = null; n !== null; )
                    (e = n.alternate),
                        e !== null && Yo(e) === null && (i = n),
                        (n = n.sibling);
                (n = i),
                    n === null
                        ? ((i = t.child), (t.child = null))
                        : ((i = n.sibling), (n.sibling = null)),
                    _l(t, !1, i, n, o);
                break;
            case "backwards":
                for (n = null, i = t.child, t.child = null; i !== null; ) {
                    if (((e = i.alternate), e !== null && Yo(e) === null)) {
                        t.child = i;
                        break;
                    }
                    (e = i.sibling), (i.sibling = n), (n = i), (i = e);
                }
                _l(t, !0, n, null, o);
                break;
            case "together":
                _l(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function No(e, t) {
    (t.mode & 1) === 0 &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Dt(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
        (bn |= t.lanes),
        (n & t.childLanes) === 0)
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(A(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Zt(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling),
                (n = n.sibling = Zt(e, e.pendingProps)),
                (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function Y1(e, t, n) {
    switch (t.tag) {
        case 3:
            lm(t), _r();
            break;
        case 5:
            $h(t);
            break;
        case 1:
            Re(t.type) && Bo(t);
            break;
        case 4:
            Sc(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            X(Ho, r._currentValue), (r._currentValue = i);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (X(ne, ne.current & 1), (t.flags |= 128), null)
                    : (n & t.child.childLanes) !== 0
                    ? am(e, t, n)
                    : (X(ne, ne.current & 1),
                      (e = Dt(e, t, n)),
                      e !== null ? e.sibling : null);
            X(ne, ne.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
                if (r) return cm(e, t, n);
                t.flags |= 128;
            }
            if (
                ((i = t.memoizedState),
                i !== null &&
                    ((i.rendering = null),
                    (i.tail = null),
                    (i.lastEffect = null)),
                X(ne, ne.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), om(e, t, n);
    }
    return Dt(e, t, n);
}
var um, ma, dm, fm;
um = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
ma = function () {};
dm = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        (e = t.stateNode), Nn(gt.current);
        var o = null;
        switch (n) {
            case "input":
                (i = Ml(e, i)), (r = Ml(e, r)), (o = []);
                break;
            case "select":
                (i = ie({}, i, { value: void 0 })),
                    (r = ie({}, r, { value: void 0 })),
                    (o = []);
                break;
            case "textarea":
                (i = jl(e, i)), (r = jl(e, r)), (o = []);
                break;
            default:
                typeof i.onClick != "function" &&
                    typeof r.onClick == "function" &&
                    (e.onclick = zo);
        }
        Vl(n, r);
        var s;
        n = null;
        for (u in i)
            if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
                if (u === "style") {
                    var a = i[u];
                    for (s in a)
                        a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
                } else
                    u !== "dangerouslySetInnerHTML" &&
                        u !== "children" &&
                        u !== "suppressContentEditableWarning" &&
                        u !== "suppressHydrationWarning" &&
                        u !== "autoFocus" &&
                        (oi.hasOwnProperty(u)
                            ? o || (o = [])
                            : (o = o || []).push(u, null));
        for (u in r) {
            var c = r[u];
            if (
                ((a = i != null ? i[u] : void 0),
                r.hasOwnProperty(u) && c !== a && (c != null || a != null))
            )
                if (u === "style")
                    if (a) {
                        for (s in a)
                            !a.hasOwnProperty(s) ||
                                (c && c.hasOwnProperty(s)) ||
                                (n || (n = {}), (n[s] = ""));
                        for (s in c)
                            c.hasOwnProperty(s) &&
                                a[s] !== c[s] &&
                                (n || (n = {}), (n[s] = c[s]));
                    } else n || (o || (o = []), o.push(u, n)), (n = c);
                else
                    u === "dangerouslySetInnerHTML"
                        ? ((c = c ? c.__html : void 0),
                          (a = a ? a.__html : void 0),
                          c != null && a !== c && (o = o || []).push(u, c))
                        : u === "children"
                        ? (typeof c != "string" && typeof c != "number") ||
                          (o = o || []).push(u, "" + c)
                        : u !== "suppressContentEditableWarning" &&
                          u !== "suppressHydrationWarning" &&
                          (oi.hasOwnProperty(u)
                              ? (c != null &&
                                    u === "onScroll" &&
                                    J("scroll", e),
                                o || a === c || (o = []))
                              : (o = o || []).push(u, c));
        }
        n && (o = o || []).push("style", n);
        var u = o;
        (t.updateQueue = u) && (t.flags |= 4);
    }
};
fm = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function jr(e, t) {
    if (!te)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null; )
                    n.alternate !== null && (r = n), (n = n.sibling);
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function we(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags & 14680064),
                (r |= i.flags & 14680064),
                (i.return = e),
                (i = i.sibling);
    else
        for (i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags),
                (r |= i.flags),
                (i.return = e),
                (i = i.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function G1(e, t, n) {
    var r = t.pendingProps;
    switch ((gc(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return we(t), null;
        case 1:
            return Re(t.type) && jo(), we(t), null;
        case 3:
            return (
                (r = t.stateNode),
                Er(),
                Z(De),
                Z(Se),
                xc(),
                r.pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (eo(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated &&
                              (t.flags & 256) === 0) ||
                          ((t.flags |= 1024),
                          rt !== null && (Sa(rt), (rt = null)))),
                ma(e, t),
                we(t),
                null
            );
        case 5:
            Cc(t);
            var i = Nn(vi.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                dm(e, t, n, r, i),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(A(166));
                    return we(t), null;
                }
                if (((e = Nn(gt.current)), eo(t))) {
                    (r = t.stateNode), (n = t.type);
                    var o = t.memoizedProps;
                    switch (
                        ((r[dt] = t), (r[mi] = o), (e = (t.mode & 1) !== 0), n)
                    ) {
                        case "dialog":
                            J("cancel", r), J("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            J("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (i = 0; i < Wr.length; i++) J(Wr[i], r);
                            break;
                        case "source":
                            J("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            J("error", r), J("load", r);
                            break;
                        case "details":
                            J("toggle", r);
                            break;
                        case "input":
                            qu(r, o), J("invalid", r);
                            break;
                        case "select":
                            (r._wrapperState = { wasMultiple: !!o.multiple }),
                                J("invalid", r);
                            break;
                        case "textarea":
                            Ju(r, o), J("invalid", r);
                    }
                    Vl(n, o), (i = null);
                    for (var s in o)
                        if (o.hasOwnProperty(s)) {
                            var a = o[s];
                            s === "children"
                                ? typeof a == "string"
                                    ? r.textContent !== a &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          Zi(r.textContent, a, e),
                                      (i = ["children", a]))
                                    : typeof a == "number" &&
                                      r.textContent !== "" + a &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          Zi(r.textContent, a, e),
                                      (i = ["children", "" + a]))
                                : oi.hasOwnProperty(s) &&
                                  a != null &&
                                  s === "onScroll" &&
                                  J("scroll", r);
                        }
                    switch (n) {
                        case "input":
                            Wi(r), Xu(r, o, !0);
                            break;
                        case "textarea":
                            Wi(r), Zu(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = zo);
                    }
                    (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (s = i.nodeType === 9 ? i : i.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = zp(n)),
                        e === "http://www.w3.org/1999/xhtml"
                            ? n === "script"
                                ? ((e = s.createElement("div")),
                                  (e.innerHTML = "<script></script>"),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == "string"
                                ? (e = s.createElement(n, { is: r.is }))
                                : ((e = s.createElement(n)),
                                  n === "select" &&
                                      ((s = e),
                                      r.multiple
                                          ? (s.multiple = !0)
                                          : r.size && (s.size = r.size)))
                            : (e = s.createElementNS(e, n)),
                        (e[dt] = t),
                        (e[mi] = r),
                        um(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((s = Ul(n, r)), n)) {
                            case "dialog":
                                J("cancel", e), J("close", e), (i = r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                J("load", e), (i = r);
                                break;
                            case "video":
                            case "audio":
                                for (i = 0; i < Wr.length; i++) J(Wr[i], e);
                                i = r;
                                break;
                            case "source":
                                J("error", e), (i = r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                J("error", e), J("load", e), (i = r);
                                break;
                            case "details":
                                J("toggle", e), (i = r);
                                break;
                            case "input":
                                qu(e, r), (i = Ml(e, r)), J("invalid", e);
                                break;
                            case "option":
                                i = r;
                                break;
                            case "select":
                                (e._wrapperState = {
                                    wasMultiple: !!r.multiple,
                                }),
                                    (i = ie({}, r, { value: void 0 })),
                                    J("invalid", e);
                                break;
                            case "textarea":
                                Ju(e, r), (i = jl(e, r)), J("invalid", e);
                                break;
                            default:
                                i = r;
                        }
                        Vl(n, i), (a = i);
                        for (o in a)
                            if (a.hasOwnProperty(o)) {
                                var c = a[o];
                                o === "style"
                                    ? Vp(e, c)
                                    : o === "dangerouslySetInnerHTML"
                                    ? ((c = c ? c.__html : void 0),
                                      c != null && jp(e, c))
                                    : o === "children"
                                    ? typeof c == "string"
                                        ? (n !== "textarea" || c !== "") &&
                                          si(e, c)
                                        : typeof c == "number" && si(e, "" + c)
                                    : o !== "suppressContentEditableWarning" &&
                                      o !== "suppressHydrationWarning" &&
                                      o !== "autoFocus" &&
                                      (oi.hasOwnProperty(o)
                                          ? c != null &&
                                            o === "onScroll" &&
                                            J("scroll", e)
                                          : c != null && tc(e, o, c, s));
                            }
                        switch (n) {
                            case "input":
                                Wi(e), Xu(e, r, !1);
                                break;
                            case "textarea":
                                Wi(e), Zu(e);
                                break;
                            case "option":
                                r.value != null &&
                                    e.setAttribute("value", "" + on(r.value));
                                break;
                            case "select":
                                (e.multiple = !!r.multiple),
                                    (o = r.value),
                                    o != null
                                        ? nr(e, !!r.multiple, o, !1)
                                        : r.defaultValue != null &&
                                          nr(
                                              e,
                                              !!r.multiple,
                                              r.defaultValue,
                                              !0
                                          );
                                break;
                            default:
                                typeof i.onClick == "function" &&
                                    (e.onclick = zo);
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return we(t), null;
        case 6:
            if (e && t.stateNode != null) fm(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(A(166));
                if (((n = Nn(vi.current)), Nn(gt.current), eo(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[dt] = t),
                        (o = r.nodeValue !== n) && ((e = Fe), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                Zi(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !==
                                    !0 &&
                                    Zi(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    o && (t.flags |= 4);
                } else
                    (r = (
                        n.nodeType === 9 ? n : n.ownerDocument
                    ).createTextNode(r)),
                        (r[dt] = t),
                        (t.stateNode = r);
            }
            return we(t), null;
        case 13:
            if (
                (Z(ne),
                (r = t.memoizedState),
                e === null ||
                    (e.memoizedState !== null &&
                        e.memoizedState.dehydrated !== null))
            ) {
                if (
                    te &&
                    Me !== null &&
                    (t.mode & 1) !== 0 &&
                    (t.flags & 128) === 0
                )
                    Oh(), _r(), (t.flags |= 98560), (o = !1);
                else if (((o = eo(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!o) throw Error(A(318));
                        if (
                            ((o = t.memoizedState),
                            (o = o !== null ? o.dehydrated : null),
                            !o)
                        )
                            throw Error(A(317));
                        o[dt] = t;
                    } else
                        _r(),
                            (t.flags & 128) === 0 && (t.memoizedState = null),
                            (t.flags |= 4);
                    we(t), (o = !1);
                } else rt !== null && (Sa(rt), (rt = null)), (o = !0);
                if (!o) return t.flags & 65536 ? t : null;
            }
            return (t.flags & 128) !== 0
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      (t.mode & 1) !== 0 &&
                          (e === null || (ne.current & 1) !== 0
                              ? pe === 0 && (pe = 3)
                              : Mc())),
                  t.updateQueue !== null && (t.flags |= 4),
                  we(t),
                  null);
        case 4:
            return (
                Er(),
                ma(e, t),
                e === null && pi(t.stateNode.containerInfo),
                we(t),
                null
            );
        case 10:
            return Ec(t.type._context), we(t), null;
        case 17:
            return Re(t.type) && jo(), we(t), null;
        case 19:
            if ((Z(ne), (o = t.memoizedState), o === null)) return we(t), null;
            if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
                if (r) jr(o, !1);
                else {
                    if (pe !== 0 || (e !== null && (e.flags & 128) !== 0))
                        for (e = t.child; e !== null; ) {
                            if (((s = Yo(e)), s !== null)) {
                                for (
                                    t.flags |= 128,
                                        jr(o, !1),
                                        r = s.updateQueue,
                                        r !== null &&
                                            ((t.updateQueue = r),
                                            (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (o = n),
                                        (e = r),
                                        (o.flags &= 14680066),
                                        (s = o.alternate),
                                        s === null
                                            ? ((o.childLanes = 0),
                                              (o.lanes = e),
                                              (o.child = null),
                                              (o.subtreeFlags = 0),
                                              (o.memoizedProps = null),
                                              (o.memoizedState = null),
                                              (o.updateQueue = null),
                                              (o.dependencies = null),
                                              (o.stateNode = null))
                                            : ((o.childLanes = s.childLanes),
                                              (o.lanes = s.lanes),
                                              (o.child = s.child),
                                              (o.subtreeFlags = 0),
                                              (o.deletions = null),
                                              (o.memoizedProps =
                                                  s.memoizedProps),
                                              (o.memoizedState =
                                                  s.memoizedState),
                                              (o.updateQueue = s.updateQueue),
                                              (o.type = s.type),
                                              (e = s.dependencies),
                                              (o.dependencies =
                                                  e === null
                                                      ? null
                                                      : {
                                                            lanes: e.lanes,
                                                            firstContext:
                                                                e.firstContext,
                                                        })),
                                        (n = n.sibling);
                                return X(ne, (ne.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    o.tail !== null &&
                        ce() > Nr &&
                        ((t.flags |= 128),
                        (r = !0),
                        jr(o, !1),
                        (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = Yo(s)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            jr(o, !0),
                            o.tail === null &&
                                o.tailMode === "hidden" &&
                                !s.alternate &&
                                !te)
                        )
                            return we(t), null;
                    } else
                        2 * ce() - o.renderingStartTime > Nr &&
                            n !== 1073741824 &&
                            ((t.flags |= 128),
                            (r = !0),
                            jr(o, !1),
                            (t.lanes = 4194304));
                o.isBackwards
                    ? ((s.sibling = t.child), (t.child = s))
                    : ((n = o.last),
                      n !== null ? (n.sibling = s) : (t.child = s),
                      (o.last = s));
            }
            return o.tail !== null
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = ce()),
                  (t.sibling = null),
                  (n = ne.current),
                  X(ne, r ? (n & 1) | 2 : n & 1),
                  t)
                : (we(t), null);
        case 22:
        case 23:
            return (
                $c(),
                (r = t.memoizedState !== null),
                e !== null &&
                    (e.memoizedState !== null) !== r &&
                    (t.flags |= 8192),
                r && (t.mode & 1) !== 0
                    ? ($e & 1073741824) !== 0 &&
                      (we(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : we(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(A(156, t.tag));
}
function Q1(e, t) {
    switch ((gc(t), t.tag)) {
        case 1:
            return (
                Re(t.type) && jo(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                Er(),
                Z(De),
                Z(Se),
                xc(),
                (e = t.flags),
                (e & 65536) !== 0 && (e & 128) === 0
                    ? ((t.flags = (e & -65537) | 128), t)
                    : null
            );
        case 5:
            return Cc(t), null;
        case 13:
            if (
                (Z(ne),
                (e = t.memoizedState),
                e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(A(340));
                _r();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return Z(ne), null;
        case 4:
            return Er(), null;
        case 10:
            return Ec(t.type._context), null;
        case 22:
        case 23:
            return $c(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var ro = !1,
    Ne = !1,
    q1 = typeof WeakSet == "function" ? WeakSet : Set,
    R = null;
function er(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (r) {
                se(e, t, r);
            }
        else n.current = null;
}
function ga(e, t, n) {
    try {
        n();
    } catch (r) {
        se(e, t, r);
    }
}
var Vd = !1;
function X1(e, t) {
    if (((Zl = $o), (e = gh()), hc(e))) {
        if ("selectionStart" in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset,
                        o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType, o.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var s = 0,
                        a = -1,
                        c = -1,
                        u = 0,
                        f = 0,
                        h = e,
                        v = null;
                    t: for (;;) {
                        for (
                            var y;
                            h !== n ||
                                (i !== 0 && h.nodeType !== 3) ||
                                (a = s + i),
                                h !== o ||
                                    (r !== 0 && h.nodeType !== 3) ||
                                    (c = s + r),
                                h.nodeType === 3 && (s += h.nodeValue.length),
                                (y = h.firstChild) !== null;

                        )
                            (v = h), (h = y);
                        for (;;) {
                            if (h === e) break t;
                            if (
                                (v === n && ++u === i && (a = s),
                                v === o && ++f === r && (c = s),
                                (y = h.nextSibling) !== null)
                            )
                                break;
                            (h = v), (v = h.parentNode);
                        }
                        h = y;
                    }
                    n = a === -1 || c === -1 ? null : { start: a, end: c };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (
        ea = { focusedElem: e, selectionRange: n }, $o = !1, R = t;
        R !== null;

    )
        if (
            ((t = R),
            (e = t.child),
            (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
            (e.return = t), (R = e);
        else
            for (; R !== null; ) {
                t = R;
                try {
                    var _ = t.alternate;
                    if ((t.flags & 1024) !== 0)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (_ !== null) {
                                    var E = _.memoizedProps,
                                        P = _.memoizedState,
                                        m = t.stateNode,
                                        p = m.getSnapshotBeforeUpdate(
                                            t.elementType === t.type
                                                ? E
                                                : tt(t.type, E),
                                            P
                                        );
                                    m.__reactInternalSnapshotBeforeUpdate = p;
                                }
                                break;
                            case 3:
                                var g = t.stateNode.containerInfo;
                                g.nodeType === 1
                                    ? (g.textContent = "")
                                    : g.nodeType === 9 &&
                                      g.documentElement &&
                                      g.removeChild(g.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(A(163));
                        }
                } catch (w) {
                    se(t, t.return, w);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (R = e);
                    break;
                }
                R = t.return;
            }
    return (_ = Vd), (Vd = !1), _;
}
function ei(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var i = (r = r.next);
        do {
            if ((i.tag & e) === e) {
                var o = i.destroy;
                (i.destroy = void 0), o !== void 0 && ga(t, n, o);
            }
            i = i.next;
        } while (i !== r);
    }
}
function ws(e, t) {
    if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
    ) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function va(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == "function" ? t(e) : (t.current = e);
    }
}
function pm(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), pm(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
                (delete t[dt],
                delete t[mi],
                delete t[ra],
                delete t[D1],
                delete t[R1])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function hm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ud(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || hm(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function _a(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                      ? ((t = n.parentNode), t.insertBefore(e, n))
                      : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = zo));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (_a(e, t, n), e = e.sibling; e !== null; )
            _a(e, t, n), (e = e.sibling);
}
function ya(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (ya(e, t, n), e = e.sibling; e !== null; )
            ya(e, t, n), (e = e.sibling);
}
var ve = null,
    nt = !1;
function zt(e, t, n) {
    for (n = n.child; n !== null; ) mm(e, t, n), (n = n.sibling);
}
function mm(e, t, n) {
    if (mt && typeof mt.onCommitFiberUnmount == "function")
        try {
            mt.onCommitFiberUnmount(ps, n);
        } catch {}
    switch (n.tag) {
        case 5:
            Ne || er(n, t);
        case 6:
            var r = ve,
                i = nt;
            (ve = null),
                zt(e, t, n),
                (ve = r),
                (nt = i),
                ve !== null &&
                    (nt
                        ? ((e = ve),
                          (n = n.stateNode),
                          e.nodeType === 8
                              ? e.parentNode.removeChild(n)
                              : e.removeChild(n))
                        : ve.removeChild(n.stateNode));
            break;
        case 18:
            ve !== null &&
                (nt
                    ? ((e = ve),
                      (n = n.stateNode),
                      e.nodeType === 8
                          ? dl(e.parentNode, n)
                          : e.nodeType === 1 && dl(e, n),
                      ui(e))
                    : dl(ve, n.stateNode));
            break;
        case 4:
            (r = ve),
                (i = nt),
                (ve = n.stateNode.containerInfo),
                (nt = !0),
                zt(e, t, n),
                (ve = r),
                (nt = i);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !Ne &&
                ((r = n.updateQueue),
                r !== null && ((r = r.lastEffect), r !== null))
            ) {
                i = r = r.next;
                do {
                    var o = i,
                        s = o.destroy;
                    (o = o.tag),
                        s !== void 0 &&
                            ((o & 2) !== 0 || (o & 4) !== 0) &&
                            ga(n, t, s),
                        (i = i.next);
                } while (i !== r);
            }
            zt(e, t, n);
            break;
        case 1:
            if (
                !Ne &&
                (er(n, t),
                (r = n.stateNode),
                typeof r.componentWillUnmount == "function")
            )
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (a) {
                    se(n, t, a);
                }
            zt(e, t, n);
            break;
        case 21:
            zt(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((Ne = (r = Ne) || n.memoizedState !== null),
                  zt(e, t, n),
                  (Ne = r))
                : zt(e, t, n);
            break;
        default:
            zt(e, t, n);
    }
}
function Hd(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new q1()),
            t.forEach(function (r) {
                var i = sN.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(i, i));
            });
    }
}
function et(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var o = e,
                    s = t,
                    a = s;
                e: for (; a !== null; ) {
                    switch (a.tag) {
                        case 5:
                            (ve = a.stateNode), (nt = !1);
                            break e;
                        case 3:
                            (ve = a.stateNode.containerInfo), (nt = !0);
                            break e;
                        case 4:
                            (ve = a.stateNode.containerInfo), (nt = !0);
                            break e;
                    }
                    a = a.return;
                }
                if (ve === null) throw Error(A(160));
                mm(o, s, i), (ve = null), (nt = !1);
                var c = i.alternate;
                c !== null && (c.return = null), (i.return = null);
            } catch (u) {
                se(i, t, u);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) gm(t, e), (t = t.sibling);
}
function gm(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((et(t, e), ct(e), r & 4)) {
                try {
                    ei(3, e, e.return), ws(3, e);
                } catch (E) {
                    se(e, e.return, E);
                }
                try {
                    ei(5, e, e.return);
                } catch (E) {
                    se(e, e.return, E);
                }
            }
            break;
        case 1:
            et(t, e), ct(e), r & 512 && n !== null && er(n, n.return);
            break;
        case 5:
            if (
                (et(t, e),
                ct(e),
                r & 512 && n !== null && er(n, n.return),
                e.flags & 32)
            ) {
                var i = e.stateNode;
                try {
                    si(i, "");
                } catch (E) {
                    se(e, e.return, E);
                }
            }
            if (r & 4 && ((i = e.stateNode), i != null)) {
                var o = e.memoizedProps,
                    s = n !== null ? n.memoizedProps : o,
                    a = e.type,
                    c = e.updateQueue;
                if (((e.updateQueue = null), c !== null))
                    try {
                        a === "input" &&
                            o.type === "radio" &&
                            o.name != null &&
                            Mp(i, o),
                            Ul(a, s);
                        var u = Ul(a, o);
                        for (s = 0; s < c.length; s += 2) {
                            var f = c[s],
                                h = c[s + 1];
                            f === "style"
                                ? Vp(i, h)
                                : f === "dangerouslySetInnerHTML"
                                ? jp(i, h)
                                : f === "children"
                                ? si(i, h)
                                : tc(i, f, h, u);
                        }
                        switch (a) {
                            case "input":
                                Fl(i, o);
                                break;
                            case "textarea":
                                Fp(i, o);
                                break;
                            case "select":
                                var v = i._wrapperState.wasMultiple;
                                i._wrapperState.wasMultiple = !!o.multiple;
                                var y = o.value;
                                y != null
                                    ? nr(i, !!o.multiple, y, !1)
                                    : v !== !!o.multiple &&
                                      (o.defaultValue != null
                                          ? nr(
                                                i,
                                                !!o.multiple,
                                                o.defaultValue,
                                                !0
                                            )
                                          : nr(
                                                i,
                                                !!o.multiple,
                                                o.multiple ? [] : "",
                                                !1
                                            ));
                        }
                        i[mi] = o;
                    } catch (E) {
                        se(e, e.return, E);
                    }
            }
            break;
        case 6:
            if ((et(t, e), ct(e), r & 4)) {
                if (e.stateNode === null) throw Error(A(162));
                (i = e.stateNode), (o = e.memoizedProps);
                try {
                    i.nodeValue = o;
                } catch (E) {
                    se(e, e.return, E);
                }
            }
            break;
        case 3:
            if (
                (et(t, e),
                ct(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    ui(t.containerInfo);
                } catch (E) {
                    se(e, e.return, E);
                }
            break;
        case 4:
            et(t, e), ct(e);
            break;
        case 13:
            et(t, e),
                ct(e),
                (i = e.child),
                i.flags & 8192 &&
                    ((o = i.memoizedState !== null),
                    (i.stateNode.isHidden = o),
                    !o ||
                        (i.alternate !== null &&
                            i.alternate.memoizedState !== null) ||
                        (Rc = ce())),
                r & 4 && Hd(e);
            break;
        case 22:
            if (
                ((f = n !== null && n.memoizedState !== null),
                e.mode & 1
                    ? ((Ne = (u = Ne) || f), et(t, e), (Ne = u))
                    : et(t, e),
                ct(e),
                r & 8192)
            ) {
                if (
                    ((u = e.memoizedState !== null),
                    (e.stateNode.isHidden = u) && !f && (e.mode & 1) !== 0)
                )
                    for (R = e, f = e.child; f !== null; ) {
                        for (h = R = f; R !== null; ) {
                            switch (((v = R), (y = v.child), v.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    ei(4, v, v.return);
                                    break;
                                case 1:
                                    er(v, v.return);
                                    var _ = v.stateNode;
                                    if (
                                        typeof _.componentWillUnmount ==
                                        "function"
                                    ) {
                                        (r = v), (n = v.return);
                                        try {
                                            (t = r),
                                                (_.props = t.memoizedProps),
                                                (_.state = t.memoizedState),
                                                _.componentWillUnmount();
                                        } catch (E) {
                                            se(r, n, E);
                                        }
                                    }
                                    break;
                                case 5:
                                    er(v, v.return);
                                    break;
                                case 22:
                                    if (v.memoizedState !== null) {
                                        Kd(h);
                                        continue;
                                    }
                            }
                            y !== null ? ((y.return = v), (R = y)) : Kd(h);
                        }
                        f = f.sibling;
                    }
                e: for (f = null, h = e; ; ) {
                    if (h.tag === 5) {
                        if (f === null) {
                            f = h;
                            try {
                                (i = h.stateNode),
                                    u
                                        ? ((o = i.style),
                                          typeof o.setProperty == "function"
                                              ? o.setProperty(
                                                    "display",
                                                    "none",
                                                    "important"
                                                )
                                              : (o.display = "none"))
                                        : ((a = h.stateNode),
                                          (c = h.memoizedProps.style),
                                          (s =
                                              c != null &&
                                              c.hasOwnProperty("display")
                                                  ? c.display
                                                  : null),
                                          (a.style.display = Bp("display", s)));
                            } catch (E) {
                                se(e, e.return, E);
                            }
                        }
                    } else if (h.tag === 6) {
                        if (f === null)
                            try {
                                h.stateNode.nodeValue = u
                                    ? ""
                                    : h.memoizedProps;
                            } catch (E) {
                                se(e, e.return, E);
                            }
                    } else if (
                        ((h.tag !== 22 && h.tag !== 23) ||
                            h.memoizedState === null ||
                            h === e) &&
                        h.child !== null
                    ) {
                        (h.child.return = h), (h = h.child);
                        continue;
                    }
                    if (h === e) break e;
                    for (; h.sibling === null; ) {
                        if (h.return === null || h.return === e) break e;
                        f === h && (f = null), (h = h.return);
                    }
                    f === h && (f = null),
                        (h.sibling.return = h.return),
                        (h = h.sibling);
                }
            }
            break;
        case 19:
            et(t, e), ct(e), r & 4 && Hd(e);
            break;
        case 21:
            break;
        default:
            et(t, e), ct(e);
    }
}
function ct(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (hm(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(A(160));
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (si(i, ""), (r.flags &= -33));
                    var o = Ud(e);
                    ya(e, o, i);
                    break;
                case 3:
                case 4:
                    var s = r.stateNode.containerInfo,
                        a = Ud(e);
                    _a(e, a, s);
                    break;
                default:
                    throw Error(A(161));
            }
        } catch (c) {
            se(e, e.return, c);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function J1(e, t, n) {
    (R = e), vm(e);
}
function vm(e, t, n) {
    for (var r = (e.mode & 1) !== 0; R !== null; ) {
        var i = R,
            o = i.child;
        if (i.tag === 22 && r) {
            var s = i.memoizedState !== null || ro;
            if (!s) {
                var a = i.alternate,
                    c = (a !== null && a.memoizedState !== null) || Ne;
                a = ro;
                var u = Ne;
                if (((ro = s), (Ne = c) && !u))
                    for (R = i; R !== null; )
                        (s = R),
                            (c = s.child),
                            s.tag === 22 && s.memoizedState !== null
                                ? Yd(i)
                                : c !== null
                                ? ((c.return = s), (R = c))
                                : Yd(i);
                for (; o !== null; ) (R = o), vm(o), (o = o.sibling);
                (R = i), (ro = a), (Ne = u);
            }
            Wd(e);
        } else
            (i.subtreeFlags & 8772) !== 0 && o !== null
                ? ((o.return = i), (R = o))
                : Wd(e);
    }
}
function Wd(e) {
    for (; R !== null; ) {
        var t = R;
        if ((t.flags & 8772) !== 0) {
            var n = t.alternate;
            try {
                if ((t.flags & 8772) !== 0)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            Ne || ws(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !Ne)
                                if (n === null) r.componentDidMount();
                                else {
                                    var i =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : tt(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        i,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate
                                    );
                                }
                            var o = t.updateQueue;
                            o !== null && kd(t, o, r);
                            break;
                        case 3:
                            var s = t.updateQueue;
                            if (s !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                kd(t, s, n);
                            }
                            break;
                        case 5:
                            var a = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = a;
                                var c = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        c.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        c.src && (n.src = c.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var u = t.alternate;
                                if (u !== null) {
                                    var f = u.memoizedState;
                                    if (f !== null) {
                                        var h = f.dehydrated;
                                        h !== null && ui(h);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(A(163));
                    }
                Ne || (t.flags & 512 && va(t));
            } catch (v) {
                se(t, t.return, v);
            }
        }
        if (t === e) {
            R = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (R = n);
            break;
        }
        R = t.return;
    }
}
function Kd(e) {
    for (; R !== null; ) {
        var t = R;
        if (t === e) {
            R = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (R = n);
            break;
        }
        R = t.return;
    }
}
function Yd(e) {
    for (; R !== null; ) {
        var t = R;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        ws(4, t);
                    } catch (c) {
                        se(t, n, c);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var i = t.return;
                        try {
                            r.componentDidMount();
                        } catch (c) {
                            se(t, i, c);
                        }
                    }
                    var o = t.return;
                    try {
                        va(t);
                    } catch (c) {
                        se(t, o, c);
                    }
                    break;
                case 5:
                    var s = t.return;
                    try {
                        va(t);
                    } catch (c) {
                        se(t, s, c);
                    }
            }
        } catch (c) {
            se(t, t.return, c);
        }
        if (t === e) {
            R = null;
            break;
        }
        var a = t.sibling;
        if (a !== null) {
            (a.return = t.return), (R = a);
            break;
        }
        R = t.return;
    }
}
var Z1 = Math.ceil,
    qo = $t.ReactCurrentDispatcher,
    Lc = $t.ReactCurrentOwner,
    Ge = $t.ReactCurrentBatchConfig,
    W = 0,
    ge = null,
    ue = null,
    _e = 0,
    $e = 0,
    tr = fn(0),
    pe = 0,
    wi = null,
    bn = 0,
    Ns = 0,
    Dc = 0,
    ti = null,
    be = null,
    Rc = 0,
    Nr = 1 / 0,
    yt = null,
    Xo = !1,
    Ea = null,
    Xt = null,
    io = !1,
    Wt = null,
    Jo = 0,
    ni = 0,
    wa = null,
    So = -1,
    Co = 0;
function ke() {
    return (W & 6) !== 0 ? ce() : So !== -1 ? So : (So = ce());
}
function Jt(e) {
    return (e.mode & 1) === 0
        ? 1
        : (W & 2) !== 0 && _e !== 0
        ? _e & -_e
        : $1.transition !== null
        ? (Co === 0 && (Co = eh()), Co)
        : ((e = G),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : lh(e.type))),
          e);
}
function ot(e, t, n, r) {
    if (50 < ni) throw ((ni = 0), (wa = null), Error(A(185)));
    bi(e, n, r),
        ((W & 2) === 0 || e !== ge) &&
            (e === ge && ((W & 2) === 0 && (Ns |= n), pe === 4 && Ut(e, _e)),
            Ie(e, r),
            n === 1 &&
                W === 0 &&
                (t.mode & 1) === 0 &&
                ((Nr = ce() + 500), _s && pn()));
}
function Ie(e, t) {
    var n = e.callbackNode;
    $w(e, t);
    var r = Io(e, e === ge ? _e : 0);
    if (r === 0)
        n !== null && nd(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && nd(n), t === 1))
            e.tag === 0 ? I1(Gd.bind(null, e)) : Th(Gd.bind(null, e)),
                b1(function () {
                    (W & 6) === 0 && pn();
                }),
                (n = null);
        else {
            switch (th(r)) {
                case 1:
                    n = sc;
                    break;
                case 4:
                    n = Jp;
                    break;
                case 16:
                    n = Ro;
                    break;
                case 536870912:
                    n = Zp;
                    break;
                default:
                    n = Ro;
            }
            n = xm(n, _m.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function _m(e, t) {
    if (((So = -1), (Co = 0), (W & 6) !== 0)) throw Error(A(327));
    var n = e.callbackNode;
    if (lr() && e.callbackNode !== n) return null;
    var r = Io(e, e === ge ? _e : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Zo(e, r);
    else {
        t = r;
        var i = W;
        W |= 2;
        var o = Em();
        (ge !== e || _e !== t) && ((yt = null), (Nr = ce() + 500), Cn(e, t));
        do
            try {
                nN();
                break;
            } catch (a) {
                ym(e, a);
            }
        while (1);
        yc(),
            (qo.current = o),
            (W = i),
            ue !== null ? (t = 0) : ((ge = null), (_e = 0), (t = pe));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((i = Gl(e)), i !== 0 && ((r = i), (t = Na(e, i)))),
            t === 1)
        )
            throw ((n = wi), Cn(e, 0), Ut(e, r), Ie(e, ce()), n);
        if (t === 6) Ut(e, r);
        else {
            if (
                ((i = e.current.alternate),
                (r & 30) === 0 &&
                    !eN(i) &&
                    ((t = Zo(e, r)),
                    t === 2 &&
                        ((o = Gl(e)), o !== 0 && ((r = o), (t = Na(e, o)))),
                    t === 1))
            )
                throw ((n = wi), Cn(e, 0), Ut(e, r), Ie(e, ce()), n);
            switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(A(345));
                case 2:
                    vn(e, be, yt);
                    break;
                case 3:
                    if (
                        (Ut(e, r),
                        (r & 130023424) === r &&
                            ((t = Rc + 500 - ce()), 10 < t))
                    ) {
                        if (Io(e, 0) !== 0) break;
                        if (((i = e.suspendedLanes), (i & r) !== r)) {
                            ke(), (e.pingedLanes |= e.suspendedLanes & i);
                            break;
                        }
                        e.timeoutHandle = na(vn.bind(null, e, be, yt), t);
                        break;
                    }
                    vn(e, be, yt);
                    break;
                case 4:
                    if ((Ut(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, i = -1; 0 < r; ) {
                        var s = 31 - it(r);
                        (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
                    }
                    if (
                        ((r = i),
                        (r = ce() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                ? 480
                                : 1080 > r
                                ? 1080
                                : 1920 > r
                                ? 1920
                                : 3e3 > r
                                ? 3e3
                                : 4320 > r
                                ? 4320
                                : 1960 * Z1(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = na(vn.bind(null, e, be, yt), r);
                        break;
                    }
                    vn(e, be, yt);
                    break;
                case 5:
                    vn(e, be, yt);
                    break;
                default:
                    throw Error(A(329));
            }
        }
    }
    return Ie(e, ce()), e.callbackNode === n ? _m.bind(null, e) : null;
}
function Na(e, t) {
    var n = ti;
    return (
        e.current.memoizedState.isDehydrated && (Cn(e, t).flags |= 256),
        (e = Zo(e, t)),
        e !== 2 && ((t = be), (be = n), t !== null && Sa(t)),
        e
    );
}
function Sa(e) {
    be === null ? (be = e) : be.push.apply(be, e);
}
function eN(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        o = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!st(o(), i)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function Ut(e, t) {
    for (
        t &= ~Dc,
            t &= ~Ns,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - it(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function Gd(e) {
    if ((W & 6) !== 0) throw Error(A(327));
    lr();
    var t = Io(e, 0);
    if ((t & 1) === 0) return Ie(e, ce()), null;
    var n = Zo(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Gl(e);
        r !== 0 && ((t = r), (n = Na(e, r)));
    }
    if (n === 1) throw ((n = wi), Cn(e, 0), Ut(e, t), Ie(e, ce()), n);
    if (n === 6) throw Error(A(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        vn(e, be, yt),
        Ie(e, ce()),
        null
    );
}
function Ic(e, t) {
    var n = W;
    W |= 1;
    try {
        return e(t);
    } finally {
        (W = n), W === 0 && ((Nr = ce() + 500), _s && pn());
    }
}
function Ln(e) {
    Wt !== null && Wt.tag === 0 && (W & 6) === 0 && lr();
    var t = W;
    W |= 1;
    var n = Ge.transition,
        r = G;
    try {
        if (((Ge.transition = null), (G = 1), e)) return e();
    } finally {
        (G = r), (Ge.transition = n), (W = t), (W & 6) === 0 && pn();
    }
}
function $c() {
    ($e = tr.current), Z(tr);
}
function Cn(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), P1(n)), ue !== null))
        for (n = ue.return; n !== null; ) {
            var r = n;
            switch ((gc(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && jo();
                    break;
                case 3:
                    Er(), Z(De), Z(Se), xc();
                    break;
                case 5:
                    Cc(r);
                    break;
                case 4:
                    Er();
                    break;
                case 13:
                    Z(ne);
                    break;
                case 19:
                    Z(ne);
                    break;
                case 10:
                    Ec(r.type._context);
                    break;
                case 22:
                case 23:
                    $c();
            }
            n = n.return;
        }
    if (
        ((ge = e),
        (ue = e = Zt(e.current, null)),
        (_e = $e = t),
        (pe = 0),
        (wi = null),
        (Dc = Ns = bn = 0),
        (be = ti = null),
        wn !== null)
    ) {
        for (t = 0; t < wn.length; t++)
            if (((n = wn[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var i = r.next,
                    o = n.pending;
                if (o !== null) {
                    var s = o.next;
                    (o.next = i), (r.next = s);
                }
                n.pending = r;
            }
        wn = null;
    }
    return e;
}
function ym(e, t) {
    do {
        var n = ue;
        try {
            if ((yc(), (Eo.current = Qo), Go)) {
                for (var r = re.memoizedState; r !== null; ) {
                    var i = r.queue;
                    i !== null && (i.pending = null), (r = r.next);
                }
                Go = !1;
            }
            if (
                ((Pn = 0),
                (me = fe = re = null),
                (Zr = !1),
                (_i = 0),
                (Lc.current = null),
                n === null || n.return === null)
            ) {
                (pe = 1), (wi = t), (ue = null);
                break;
            }
            e: {
                var o = e,
                    s = n.return,
                    a = n,
                    c = t;
                if (
                    ((t = _e),
                    (a.flags |= 32768),
                    c !== null &&
                        typeof c == "object" &&
                        typeof c.then == "function")
                ) {
                    var u = c,
                        f = a,
                        h = f.tag;
                    if (
                        (f.mode & 1) === 0 &&
                        (h === 0 || h === 11 || h === 15)
                    ) {
                        var v = f.alternate;
                        v
                            ? ((f.updateQueue = v.updateQueue),
                              (f.memoizedState = v.memoizedState),
                              (f.lanes = v.lanes))
                            : ((f.updateQueue = null),
                              (f.memoizedState = null));
                    }
                    var y = Id(s);
                    if (y !== null) {
                        (y.flags &= -257),
                            $d(y, s, a, o, t),
                            y.mode & 1 && Rd(o, u, t),
                            (t = y),
                            (c = u);
                        var _ = t.updateQueue;
                        if (_ === null) {
                            var E = new Set();
                            E.add(c), (t.updateQueue = E);
                        } else _.add(c);
                        break e;
                    } else {
                        if ((t & 1) === 0) {
                            Rd(o, u, t), Mc();
                            break e;
                        }
                        c = Error(A(426));
                    }
                } else if (te && a.mode & 1) {
                    var P = Id(s);
                    if (P !== null) {
                        (P.flags & 65536) === 0 && (P.flags |= 256),
                            $d(P, s, a, o, t),
                            vc(wr(c, a));
                        break e;
                    }
                }
                (o = c = wr(c, a)),
                    pe !== 4 && (pe = 2),
                    ti === null ? (ti = [o]) : ti.push(o),
                    (o = s);
                do {
                    switch (o.tag) {
                        case 3:
                            (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                            var m = nm(o, c, t);
                            Ad(o, m);
                            break e;
                        case 1:
                            a = c;
                            var p = o.type,
                                g = o.stateNode;
                            if (
                                (o.flags & 128) === 0 &&
                                (typeof p.getDerivedStateFromError ==
                                    "function" ||
                                    (g !== null &&
                                        typeof g.componentDidCatch ==
                                            "function" &&
                                        (Xt === null || !Xt.has(g))))
                            ) {
                                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                                var w = rm(o, a, t);
                                Ad(o, w);
                                break e;
                            }
                    }
                    o = o.return;
                } while (o !== null);
            }
            Nm(n);
        } catch (C) {
            (t = C), ue === n && n !== null && (ue = n = n.return);
            continue;
        }
        break;
    } while (1);
}
function Em() {
    var e = qo.current;
    return (qo.current = Qo), e === null ? Qo : e;
}
function Mc() {
    (pe === 0 || pe === 3 || pe === 2) && (pe = 4),
        ge === null ||
            ((bn & 268435455) === 0 && (Ns & 268435455) === 0) ||
            Ut(ge, _e);
}
function Zo(e, t) {
    var n = W;
    W |= 2;
    var r = Em();
    (ge !== e || _e !== t) && ((yt = null), Cn(e, t));
    do
        try {
            tN();
            break;
        } catch (i) {
            ym(e, i);
        }
    while (1);
    if ((yc(), (W = n), (qo.current = r), ue !== null)) throw Error(A(261));
    return (ge = null), (_e = 0), pe;
}
function tN() {
    for (; ue !== null; ) wm(ue);
}
function nN() {
    for (; ue !== null && !Aw(); ) wm(ue);
}
function wm(e) {
    var t = Cm(e.alternate, e, $e);
    (e.memoizedProps = e.pendingProps),
        t === null ? Nm(e) : (ue = t),
        (Lc.current = null);
}
function Nm(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), (t.flags & 32768) === 0)) {
            if (((n = G1(n, t, $e)), n !== null)) {
                ue = n;
                return;
            }
        } else {
            if (((n = Q1(n, t)), n !== null)) {
                (n.flags &= 32767), (ue = n);
                return;
            }
            if (e !== null)
                (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (pe = 6), (ue = null);
                return;
            }
        }
        if (((t = t.sibling), t !== null)) {
            ue = t;
            return;
        }
        ue = t = e;
    } while (t !== null);
    pe === 0 && (pe = 5);
}
function vn(e, t, n) {
    var r = G,
        i = Ge.transition;
    try {
        (Ge.transition = null), (G = 1), rN(e, t, n, r);
    } finally {
        (Ge.transition = i), (G = r);
    }
    return null;
}
function rN(e, t, n, r) {
    do lr();
    while (Wt !== null);
    if ((W & 6) !== 0) throw Error(A(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(A(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var o = n.lanes | n.childLanes;
    if (
        (Mw(e, o),
        e === ge && ((ue = ge = null), (_e = 0)),
        ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
            io ||
            ((io = !0),
            xm(Ro, function () {
                return lr(), null;
            })),
        (o = (n.flags & 15990) !== 0),
        (n.subtreeFlags & 15990) !== 0 || o)
    ) {
        (o = Ge.transition), (Ge.transition = null);
        var s = G;
        G = 1;
        var a = W;
        (W |= 4),
            (Lc.current = null),
            X1(e, n),
            gm(n, e),
            S1(ea),
            ($o = !!Zl),
            (ea = Zl = null),
            (e.current = n),
            J1(n),
            kw(),
            (W = a),
            (G = s),
            (Ge.transition = o);
    } else e.current = n;
    if (
        (io && ((io = !1), (Wt = e), (Jo = i)),
        (o = e.pendingLanes),
        o === 0 && (Xt = null),
        bw(n.stateNode),
        Ie(e, ce()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (i = t[n]),
                r(i.value, { componentStack: i.stack, digest: i.digest });
    if (Xo) throw ((Xo = !1), (e = Ea), (Ea = null), e);
    return (
        (Jo & 1) !== 0 && e.tag !== 0 && lr(),
        (o = e.pendingLanes),
        (o & 1) !== 0 ? (e === wa ? ni++ : ((ni = 0), (wa = e))) : (ni = 0),
        pn(),
        null
    );
}
function lr() {
    if (Wt !== null) {
        var e = th(Jo),
            t = Ge.transition,
            n = G;
        try {
            if (((Ge.transition = null), (G = 16 > e ? 16 : e), Wt === null))
                var r = !1;
            else {
                if (((e = Wt), (Wt = null), (Jo = 0), (W & 6) !== 0))
                    throw Error(A(331));
                var i = W;
                for (W |= 4, R = e.current; R !== null; ) {
                    var o = R,
                        s = o.child;
                    if ((R.flags & 16) !== 0) {
                        var a = o.deletions;
                        if (a !== null) {
                            for (var c = 0; c < a.length; c++) {
                                var u = a[c];
                                for (R = u; R !== null; ) {
                                    var f = R;
                                    switch (f.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            ei(8, f, o);
                                    }
                                    var h = f.child;
                                    if (h !== null) (h.return = f), (R = h);
                                    else
                                        for (; R !== null; ) {
                                            f = R;
                                            var v = f.sibling,
                                                y = f.return;
                                            if ((pm(f), f === u)) {
                                                R = null;
                                                break;
                                            }
                                            if (v !== null) {
                                                (v.return = y), (R = v);
                                                break;
                                            }
                                            R = y;
                                        }
                                }
                            }
                            var _ = o.alternate;
                            if (_ !== null) {
                                var E = _.child;
                                if (E !== null) {
                                    _.child = null;
                                    do {
                                        var P = E.sibling;
                                        (E.sibling = null), (E = P);
                                    } while (E !== null);
                                }
                            }
                            R = o;
                        }
                    }
                    if ((o.subtreeFlags & 2064) !== 0 && s !== null)
                        (s.return = o), (R = s);
                    else
                        e: for (; R !== null; ) {
                            if (((o = R), (o.flags & 2048) !== 0))
                                switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        ei(9, o, o.return);
                                }
                            var m = o.sibling;
                            if (m !== null) {
                                (m.return = o.return), (R = m);
                                break e;
                            }
                            R = o.return;
                        }
                }
                var p = e.current;
                for (R = p; R !== null; ) {
                    s = R;
                    var g = s.child;
                    if ((s.subtreeFlags & 2064) !== 0 && g !== null)
                        (g.return = s), (R = g);
                    else
                        e: for (s = p; R !== null; ) {
                            if (((a = R), (a.flags & 2048) !== 0))
                                try {
                                    switch (a.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            ws(9, a);
                                    }
                                } catch (C) {
                                    se(a, a.return, C);
                                }
                            if (a === s) {
                                R = null;
                                break e;
                            }
                            var w = a.sibling;
                            if (w !== null) {
                                (w.return = a.return), (R = w);
                                break e;
                            }
                            R = a.return;
                        }
                }
                if (
                    ((W = i),
                    pn(),
                    mt && typeof mt.onPostCommitFiberRoot == "function")
                )
                    try {
                        mt.onPostCommitFiberRoot(ps, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            (G = n), (Ge.transition = t);
        }
    }
    return !1;
}
function Qd(e, t, n) {
    (t = wr(n, t)),
        (t = nm(e, t, 1)),
        (e = qt(e, t, 1)),
        (t = ke()),
        e !== null && (bi(e, 1, t), Ie(e, t));
}
function se(e, t, n) {
    if (e.tag === 3) Qd(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Qd(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof r.componentDidCatch == "function" &&
                        (Xt === null || !Xt.has(r)))
                ) {
                    (e = wr(n, e)),
                        (e = rm(t, e, 1)),
                        (t = qt(t, e, 1)),
                        (e = ke()),
                        t !== null && (bi(t, 1, e), Ie(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function iN(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = ke()),
        (e.pingedLanes |= e.suspendedLanes & n),
        ge === e &&
            (_e & n) === n &&
            (pe === 4 ||
            (pe === 3 && (_e & 130023424) === _e && 500 > ce() - Rc)
                ? Cn(e, 0)
                : (Dc |= n)),
        Ie(e, t);
}
function Sm(e, t) {
    t === 0 &&
        ((e.mode & 1) === 0
            ? (t = 1)
            : ((t = Gi), (Gi <<= 1), (Gi & 130023424) === 0 && (Gi = 4194304)));
    var n = ke();
    (e = Lt(e, t)), e !== null && (bi(e, t, n), Ie(e, n));
}
function oN(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), Sm(e, n);
}
function sN(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(A(314));
    }
    r !== null && r.delete(t), Sm(e, n);
}
var Cm;
Cm = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || De.current) Le = !0;
        else {
            if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
                return (Le = !1), Y1(e, t, n);
            Le = (e.flags & 131072) !== 0;
        }
    else (Le = !1), te && (t.flags & 1048576) !== 0 && Ah(t, Uo, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            No(e, t), (e = t.pendingProps);
            var i = vr(t, Se.current);
            sr(t, n), (i = Ac(null, t, r, e, i, n));
            var o = kc();
            return (
                (t.flags |= 1),
                typeof i == "object" &&
                i !== null &&
                typeof i.render == "function" &&
                i.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      Re(r) ? ((o = !0), Bo(t)) : (o = !1),
                      (t.memoizedState =
                          i.state !== null && i.state !== void 0
                              ? i.state
                              : null),
                      Nc(t),
                      (i.updater = ys),
                      (t.stateNode = i),
                      (i._reactInternals = t),
                      ca(t, r, e, n),
                      (t = fa(null, t, r, !0, o, n)))
                    : ((t.tag = 0),
                      te && o && mc(t),
                      xe(null, t, i, n),
                      (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (No(e, t),
                    (e = t.pendingProps),
                    (i = r._init),
                    (r = i(r._payload)),
                    (t.type = r),
                    (i = t.tag = aN(r)),
                    (e = tt(r, e)),
                    i)
                ) {
                    case 0:
                        t = da(null, t, r, e, n);
                        break e;
                    case 1:
                        t = zd(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Md(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Fd(null, t, r, tt(r.type, e), n);
                        break e;
                }
                throw Error(A(306, r, ""));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : tt(r, i)),
                da(e, t, r, i, n)
            );
        case 1:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : tt(r, i)),
                zd(e, t, r, i, n)
            );
        case 3:
            e: {
                if ((lm(t), e === null)) throw Error(A(387));
                (r = t.pendingProps),
                    (o = t.memoizedState),
                    (i = o.element),
                    bh(e, t),
                    Ko(t, r, null, n);
                var s = t.memoizedState;
                if (((r = s.element), o.isDehydrated))
                    if (
                        ((o = {
                            element: r,
                            isDehydrated: !1,
                            cache: s.cache,
                            pendingSuspenseBoundaries:
                                s.pendingSuspenseBoundaries,
                            transitions: s.transitions,
                        }),
                        (t.updateQueue.baseState = o),
                        (t.memoizedState = o),
                        t.flags & 256)
                    ) {
                        (i = wr(Error(A(423)), t)), (t = jd(e, t, r, n, i));
                        break e;
                    } else if (r !== i) {
                        (i = wr(Error(A(424)), t)), (t = jd(e, t, r, n, i));
                        break e;
                    } else
                        for (
                            Me = Qt(t.stateNode.containerInfo.firstChild),
                                Fe = t,
                                te = !0,
                                rt = null,
                                n = Ih(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((_r(), r === i)) {
                        t = Dt(e, t, n);
                        break e;
                    }
                    xe(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                $h(t),
                e === null && sa(t),
                (r = t.type),
                (i = t.pendingProps),
                (o = e !== null ? e.memoizedProps : null),
                (s = i.children),
                ta(r, i)
                    ? (s = null)
                    : o !== null && ta(r, o) && (t.flags |= 32),
                sm(e, t),
                xe(e, t, s, n),
                t.child
            );
        case 6:
            return e === null && sa(t), null;
        case 13:
            return am(e, t, n);
        case 4:
            return (
                Sc(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = yr(t, null, r, n)) : xe(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : tt(r, i)),
                Md(e, t, r, i, n)
            );
        case 7:
            return xe(e, t, t.pendingProps, n), t.child;
        case 8:
            return xe(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return xe(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (i = t.pendingProps),
                    (o = t.memoizedProps),
                    (s = i.value),
                    X(Ho, r._currentValue),
                    (r._currentValue = s),
                    o !== null)
                )
                    if (st(o.value, s)) {
                        if (o.children === i.children && !De.current) {
                            t = Dt(e, t, n);
                            break e;
                        }
                    } else
                        for (
                            o = t.child, o !== null && (o.return = t);
                            o !== null;

                        ) {
                            var a = o.dependencies;
                            if (a !== null) {
                                s = o.child;
                                for (var c = a.firstContext; c !== null; ) {
                                    if (c.context === r) {
                                        if (o.tag === 1) {
                                            (c = kt(-1, n & -n)), (c.tag = 2);
                                            var u = o.updateQueue;
                                            if (u !== null) {
                                                u = u.shared;
                                                var f = u.pending;
                                                f === null
                                                    ? (c.next = c)
                                                    : ((c.next = f.next),
                                                      (f.next = c)),
                                                    (u.pending = c);
                                            }
                                        }
                                        (o.lanes |= n),
                                            (c = o.alternate),
                                            c !== null && (c.lanes |= n),
                                            la(o.return, n, t),
                                            (a.lanes |= n);
                                        break;
                                    }
                                    c = c.next;
                                }
                            } else if (o.tag === 10)
                                s = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (((s = o.return), s === null))
                                    throw Error(A(341));
                                (s.lanes |= n),
                                    (a = s.alternate),
                                    a !== null && (a.lanes |= n),
                                    la(s, n, t),
                                    (s = o.sibling);
                            } else s = o.child;
                            if (s !== null) s.return = o;
                            else
                                for (s = o; s !== null; ) {
                                    if (s === t) {
                                        s = null;
                                        break;
                                    }
                                    if (((o = s.sibling), o !== null)) {
                                        (o.return = s.return), (s = o);
                                        break;
                                    }
                                    s = s.return;
                                }
                            o = s;
                        }
                xe(e, t, i.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (i = t.type),
                (r = t.pendingProps.children),
                sr(t, n),
                (i = qe(i)),
                (r = r(i)),
                (t.flags |= 1),
                xe(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (i = tt(r, t.pendingProps)),
                (i = tt(r.type, i)),
                Fd(e, t, r, i, n)
            );
        case 15:
            return im(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : tt(r, i)),
                No(e, t),
                (t.tag = 1),
                Re(r) ? ((e = !0), Bo(t)) : (e = !1),
                sr(t, n),
                Dh(t, r, i),
                ca(t, r, i, n),
                fa(null, t, r, !0, e, n)
            );
        case 19:
            return cm(e, t, n);
        case 22:
            return om(e, t, n);
    }
    throw Error(A(156, t.tag));
};
function xm(e, t) {
    return Xp(e, t);
}
function lN(e, t, n, r) {
    (this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
                null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
                null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function Ke(e, t, n, r) {
    return new lN(e, t, n, r);
}
function Fc(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function aN(e) {
    if (typeof e == "function") return Fc(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === rc)) return 11;
        if (e === ic) return 14;
    }
    return 2;
}
function Zt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Ke(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
            t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function xo(e, t, n, r, i, o) {
    var s = 2;
    if (((r = e), typeof e == "function")) Fc(e) && (s = 1);
    else if (typeof e == "string") s = 5;
    else
        e: switch (e) {
            case Wn:
                return xn(n.children, i, o, t);
            case nc:
                (s = 8), (i |= 8);
                break;
            case Dl:
                return (
                    (e = Ke(12, n, t, i | 2)),
                    (e.elementType = Dl),
                    (e.lanes = o),
                    e
                );
            case Rl:
                return (
                    (e = Ke(13, n, t, i)),
                    (e.elementType = Rl),
                    (e.lanes = o),
                    e
                );
            case Il:
                return (
                    (e = Ke(19, n, t, i)),
                    (e.elementType = Il),
                    (e.lanes = o),
                    e
                );
            case Rp:
                return Ss(n, i, o, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case Lp:
                            s = 10;
                            break e;
                        case Dp:
                            s = 9;
                            break e;
                        case rc:
                            s = 11;
                            break e;
                        case ic:
                            s = 14;
                            break e;
                        case jt:
                            (s = 16), (r = null);
                            break e;
                    }
                throw Error(A(130, e == null ? e : typeof e, ""));
        }
    return (
        (t = Ke(s, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = o),
        t
    );
}
function xn(e, t, n, r) {
    return (e = Ke(7, e, r, t)), (e.lanes = n), e;
}
function Ss(e, t, n, r) {
    return (
        (e = Ke(22, e, r, t)),
        (e.elementType = Rp),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function yl(e, t, n) {
    return (e = Ke(6, e, null, t)), (e.lanes = n), e;
}
function El(e, t, n) {
    return (
        (t = Ke(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
        }),
        t
    );
}
function cN(e, t, n, r, i) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
                null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = el(0)),
        (this.expirationTimes = el(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = el(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null);
}
function zc(e, t, n, r, i, o, s, a, c) {
    return (
        (e = new cN(e, t, n, a, c)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Ke(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        Nc(o),
        e
    );
}
function uN(e, t, n) {
    var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Hn,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
    };
}
function Tm(e) {
    if (!e) return sn;
    e = e._reactInternals;
    e: {
        if ($n(e) !== e || e.tag !== 1) throw Error(A(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Re(t.type)) {
                        t =
                            t.stateNode
                                .__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(A(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Re(n)) return xh(e, n, t);
    }
    return t;
}
function Am(e, t, n, r, i, o, s, a, c) {
    return (
        (e = zc(n, r, !0, e, i, o, s, a, c)),
        (e.context = Tm(null)),
        (n = e.current),
        (r = ke()),
        (i = Jt(n)),
        (o = kt(r, i)),
        (o.callback = t != null ? t : null),
        qt(n, o, i),
        (e.current.lanes = i),
        bi(e, i, r),
        Ie(e, r),
        e
    );
}
function Cs(e, t, n, r) {
    var i = t.current,
        o = ke(),
        s = Jt(i);
    return (
        (n = Tm(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = kt(o, s)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = qt(i, t, s)),
        e !== null && (ot(e, i, s, o), yo(e, i, s)),
        s
    );
}
function es(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function qd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function jc(e, t) {
    qd(e, t), (e = e.alternate) && qd(e, t);
}
function dN() {
    return null;
}
var km =
    typeof reportError == "function"
        ? reportError
        : function (e) {
              console.error(e);
          };
function Bc(e) {
    this._internalRoot = e;
}
xs.prototype.render = Bc.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(A(409));
    Cs(e, t, null, null);
};
xs.prototype.unmount = Bc.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Ln(function () {
            Cs(null, e, null, null);
        }),
            (t[bt] = null);
    }
};
function xs(e) {
    this._internalRoot = e;
}
xs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = ih();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Vt.length && t !== 0 && t < Vt[n].priority; n++);
        Vt.splice(n, 0, e), n === 0 && sh(e);
    }
};
function Vc(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ts(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
                e.nodeValue !== " react-mount-point-unstable "))
    );
}
function Xd() {}
function fN(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var o = r;
            r = function () {
                var u = es(s);
                o.call(u);
            };
        }
        var s = Am(t, r, e, 0, null, !1, !1, "", Xd);
        return (
            (e._reactRootContainer = s),
            (e[bt] = s.current),
            pi(e.nodeType === 8 ? e.parentNode : e),
            Ln(),
            s
        );
    }
    for (; (i = e.lastChild); ) e.removeChild(i);
    if (typeof r == "function") {
        var a = r;
        r = function () {
            var u = es(c);
            a.call(u);
        };
    }
    var c = zc(e, 0, !1, null, null, !1, !1, "", Xd);
    return (
        (e._reactRootContainer = c),
        (e[bt] = c.current),
        pi(e.nodeType === 8 ? e.parentNode : e),
        Ln(function () {
            Cs(t, c, n, r);
        }),
        c
    );
}
function As(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
        var s = o;
        if (typeof i == "function") {
            var a = i;
            i = function () {
                var c = es(s);
                a.call(c);
            };
        }
        Cs(t, s, e, i);
    } else s = fN(n, t, e, i, r);
    return es(s);
}
nh = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Hr(t.pendingLanes);
                n !== 0 &&
                    (lc(t, n | 1),
                    Ie(t, ce()),
                    (W & 6) === 0 && ((Nr = ce() + 500), pn()));
            }
            break;
        case 13:
            Ln(function () {
                var r = Lt(e, 1);
                if (r !== null) {
                    var i = ke();
                    ot(r, e, 1, i);
                }
            }),
                jc(e, 1);
    }
};
ac = function (e) {
    if (e.tag === 13) {
        var t = Lt(e, 134217728);
        if (t !== null) {
            var n = ke();
            ot(t, e, 134217728, n);
        }
        jc(e, 134217728);
    }
};
rh = function (e) {
    if (e.tag === 13) {
        var t = Jt(e),
            n = Lt(e, t);
        if (n !== null) {
            var r = ke();
            ot(n, e, t, r);
        }
        jc(e, t);
    }
};
ih = function () {
    return G;
};
oh = function (e, t) {
    var n = G;
    try {
        return (G = e), t();
    } finally {
        G = n;
    }
};
Wl = function (e, t, n) {
    switch (t) {
        case "input":
            if ((Fl(e, n), (t = n.name), n.type === "radio" && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        "input[name=" +
                            JSON.stringify("" + t) +
                            '][type="radio"]'
                    ),
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var i = vs(r);
                        if (!i) throw Error(A(90));
                        $p(r), Fl(r, i);
                    }
                }
            }
            break;
        case "textarea":
            Fp(e, n);
            break;
        case "select":
            (t = n.value), t != null && nr(e, !!n.multiple, t, !1);
    }
};
Wp = Ic;
Kp = Ln;
var pN = { usingClientEntryPoint: !1, Events: [Di, Qn, vs, Up, Hp, Ic] },
    Br = {
        findFiberByHostInstance: En,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom",
    },
    hN = {
        bundleType: Br.bundleType,
        version: Br.version,
        rendererPackageName: Br.rendererPackageName,
        rendererConfig: Br.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: $t.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = Qp(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Br.findFiberByHostInstance || dN,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var oo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!oo.isDisabled && oo.supportsFiber)
        try {
            (ps = oo.inject(hN)), (mt = oo);
        } catch {}
}
Ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pN;
Ve.createPortal = function (e, t) {
    var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Vc(t)) throw Error(A(200));
    return uN(e, t, null, n);
};
Ve.createRoot = function (e, t) {
    if (!Vc(e)) throw Error(A(299));
    var n = !1,
        r = "",
        i = km;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = zc(e, 1, !1, null, null, n, !1, r, i)),
        (e[bt] = t.current),
        pi(e.nodeType === 8 ? e.parentNode : e),
        new Bc(t)
    );
};
Ve.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function"
            ? Error(A(188))
            : ((e = Object.keys(e).join(",")), Error(A(268, e)));
    return (e = Qp(t)), (e = e === null ? null : e.stateNode), e;
};
Ve.flushSync = function (e) {
    return Ln(e);
};
Ve.hydrate = function (e, t, n) {
    if (!Ts(t)) throw Error(A(200));
    return As(null, e, t, !0, n);
};
Ve.hydrateRoot = function (e, t, n) {
    if (!Vc(e)) throw Error(A(405));
    var r = (n != null && n.hydratedSources) || null,
        i = !1,
        o = "",
        s = km;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (i = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
        (t = Am(t, null, e, 1, n != null ? n : null, i, !1, o, s)),
        (e[bt] = t.current),
        pi(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (i = n._getVersion),
                (i = i(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, i])
                    : t.mutableSourceEagerHydrationData.push(n, i);
    return new xs(t);
};
Ve.render = function (e, t, n) {
    if (!Ts(t)) throw Error(A(200));
    return As(null, e, t, !1, n);
};
Ve.unmountComponentAtNode = function (e) {
    if (!Ts(e)) throw Error(A(40));
    return e._reactRootContainer
        ? (Ln(function () {
              As(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[bt] = null);
              });
          }),
          !0)
        : !1;
};
Ve.unstable_batchedUpdates = Ic;
Ve.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!Ts(n)) throw Error(A(200));
    if (e == null || e._reactInternals === void 0) throw Error(A(38));
    return As(e, t, n, !1, r);
};
Ve.version = "18.2.0-next-9e3b772b8-20220608";
(function (e) {
    function t() {
        if (
            !(
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
            )
        )
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
            } catch (n) {
                console.error(n);
            }
    }
    t(), (e.exports = Ve);
})(Ap);
var Jd = Ap.exports;
(_t.createRoot = Jd.createRoot), (_t.hydrateRoot = Jd.hydrateRoot);
var Uc = { exports: {} },
    ks = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mN = I.exports,
    gN = Symbol.for("react.element"),
    vN = Symbol.for("react.fragment"),
    _N = Object.prototype.hasOwnProperty,
    yN =
        mN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    EN = { key: !0, ref: !0, __self: !0, __source: !0 };
function Om(e, t, n) {
    var r,
        i = {},
        o = null,
        s = null;
    n !== void 0 && (o = "" + n),
        t.key !== void 0 && (o = "" + t.key),
        t.ref !== void 0 && (s = t.ref);
    for (r in t) _N.call(t, r) && !EN.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: gN,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: yN.current,
    };
}
ks.Fragment = vN;
ks.jsx = Om;
ks.jsxs = Om;
(function (e) {
    e.exports = ks;
})(Uc);
const l = Uc.exports.jsx,
    d = Uc.exports.jsxs;
function wN() {
    return d("footer", {
        className: "footer",
        children: [
            l("img", {
                width: "150",
                src: "/img/png/logo.png",
                alt: "logo Stampee",
            }),
            d("div", {
                className:
                    "wrapper grid grid--3-var-footer footer--border-white",
                children: [
                    d("section", {
                        children: [
                            l("h2", { children: "Acc\xE8s rapides" }),
                            d("ul", {
                                className: "footer__menu",
                                children: [
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Actualit\xE9s",
                                        }),
                                    }),
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children:
                                                "La philat\xE9lie, c'est la vie",
                                        }),
                                    }),
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Biographie du Lord",
                                        }),
                                    }),
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Historique familial",
                                        }),
                                    }),
                                ],
                            }),
                            d("ul", {
                                className:
                                    "wrapper--header menu__sous-menu menu__sous-menu--footer",
                                children: [
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            href: "",
                                            children: "Se connecter",
                                        }),
                                    }),
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            href: "",
                                            children: "Devenir membre",
                                        }),
                                    }),
                                ],
                            }),
                            l("br", {}),
                            l("small", {
                                children:
                                    "\xA9 Stampee 2022, Tous droits r\xE9serv\xE9s",
                            }),
                        ],
                    }),
                    d("section", {
                        children: [
                            l("h2", {
                                children:
                                    "Abonnez-vous \xE0 notre infolettre !",
                            }),
                            l("p", {
                                className: "tile__text tile__text--white",
                                children:
                                    "Prenez connaissance en avance de toutes nos nouveaut\xE9s et profiter d'offres exceptionnels !",
                            }),
                            l("form", {
                                action: "#",
                                method: "POST",
                                children: d("div", {
                                    className: "input-bar",
                                    children: [
                                        l("input", {
                                            className: "input-bar__input",
                                            type: "text",
                                            id: "input-bar-footer",
                                            name: "input-bar",
                                            placeholder:
                                                "Entrez votre courriel",
                                        }),
                                        l("div", {
                                            className: "input-bar__text",
                                            children: l("p", {
                                                children: "S'abonner",
                                            }),
                                        }),
                                    ],
                                }),
                            }),
                            l("i", {
                                className:
                                    "fab fa-brands fa-facebook-square fa-lg icone-social",
                            }),
                            l("i", {
                                className:
                                    "fab fa-brands fa-twitter-square fa-lg icone-social",
                            }),
                            l("i", {
                                className:
                                    "fab fa-instagram fa-lg icone-social",
                            }),
                        ],
                    }),
                    d("section", {
                        children: [
                            l("h2", { children: "Contact & support" }),
                            d("ul", {
                                className: "footer__menu",
                                children: [
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Termes et conditions",
                                        }),
                                    }),
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Aide",
                                        }),
                                    }),
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Contactez le webmestre",
                                        }),
                                    }),
                                    l("li", {
                                        className:
                                            "menu__item menu__item--footer",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Contactez-nous",
                                        }),
                                    }),
                                ],
                            }),
                            d("address", {
                                children: [
                                    d("p", {
                                        children: [
                                            "1748 Princes St, Richmond ",
                                            l("br", {}),
                                            " TW9 1ED, Royaume-Uni",
                                        ],
                                    }),
                                    l("p", {
                                        children: l("a", {
                                            href: "tel:442089402218",
                                            children: "+442089402218",
                                        }),
                                    }),
                                    l("p", {
                                        children: l("a", {
                                            href: "mailto:contact.info@stampee.co.uk",
                                            children:
                                                "contact.info@stampee.co.uk",
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
document.getElementById("footer") &&
    _t
        .createRoot(document.getElementById("footer"))
        .render(l(un.StrictMode, { children: l(wN, {}) }));
function NN() {
    return l("div", {
        children: l("nav", {
            className: "menu",
            children: d("ul", {
                className: "menu__list menu__list--principal",
                children: [
                    d("li", {
                        className: "menu__item menu__item--principal",
                        children: [
                            l("a", {
                                className: "menu__link",
                                href: "/catalogue",
                                children: "Catalogue d'ench\xE8res",
                            }),
                            d("ul", {
                                className: "menu__dropdown",
                                children: [
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "/catalogue",
                                            children: "En cours",
                                        }),
                                    }),
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "catalogue-enchere.html",
                                            children: "Archive",
                                        }),
                                    }),
                                ],
                            }),
                            l("img", {
                                className: "icone-dropdown-arrow",
                                src: "/img/png/icone-dropdown-arrow.png",
                                alt: "fleche dropwdown",
                            }),
                        ],
                    }),
                    d("li", {
                        className: "menu__item menu__item--principal",
                        children: [
                            l("a", {
                                className: "menu__link",
                                href: "#",
                                children: "Fonctionnement",
                            }),
                            d("ul", {
                                className: "menu__dropdown",
                                children: [
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Termes et conditions",
                                        }),
                                    }),
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Aide",
                                        }),
                                    }),
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Contactez le webmestre",
                                        }),
                                    }),
                                ],
                            }),
                            l("img", {
                                className: "icone-dropdown-arrow",
                                src: "/img/png/icone-dropdown-arrow.png",
                                alt: "fleche dropwdown",
                            }),
                        ],
                    }),
                    d("li", {
                        className: "menu__item menu__item--principal",
                        children: [
                            l("a", {
                                className: "menu__link",
                                href: "",
                                children:
                                    "\xC0 propos de Lord R\xE9ginald Stampee III",
                            }),
                            d("ul", {
                                className: "menu__dropdown",
                                children: [
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children:
                                                "La philat\xE9lie, c'est la vie.",
                                        }),
                                    }),
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Biographie du Lord",
                                        }),
                                    }),
                                    l("li", {
                                        className: "menu__item",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Historique familial",
                                        }),
                                    }),
                                ],
                            }),
                            l("img", {
                                className: "icone-dropdown-arrow",
                                src: "/img/png/icone-dropdown-arrow.png",
                                alt: "fleche dropwdown",
                            }),
                        ],
                    }),
                    l("li", {
                        className:
                            "menu__item menu__item--principal menu__border",
                        children: l("a", {
                            className: "menu__link",
                            href: "#",
                            children: "contactez-nous",
                        }),
                    }),
                ],
            }),
        }),
    });
}
document.getElementById("nav") &&
    _t
        .createRoot(document.getElementById("nav"))
        .render(l(un.StrictMode, { children: l(NN, {}) }));
function SN() {
    return d("div", {
        children: [
            d("div", {
                className: "hero hero--accueil",
                children: [
                    d("div", {
                        className: "wrapper wrapper--hero",
                        children: [
                            l("h1", {
                                className: "hero__text",
                                children: "Bienvenue sur Stampee",
                            }),
                            l("h2", {
                                className: "hero__text--sous-titre",
                                children:
                                    "Une plateforme d'ench\xE8re d'exception",
                            }),
                            d("p", {
                                className:
                                    "hero__text hero__text--text-courant",
                                children: [
                                    "Participer \xE0 une ench\xE8re n\u2019aura jamais \xE9t\xE9 aussi simple et rapide ! ",
                                    l("br", {}),
                                    " D\xE9couvrez d\xE8s maintenant notre s\xE9lection.",
                                ],
                            }),
                            l("a", {
                                className: "btn",
                                href: "catalogue-enchere.html",
                                children: "Voir toute les ench\xE8res",
                            }),
                        ],
                    }),
                    d("div", {
                        className: "grid grid--hero",
                        children: [
                            d("div", {
                                className: "bg bg--blue",
                                children: [
                                    l("h2", {
                                        className: "bg--blue-title",
                                        children: "Comment \xE7a marche ?",
                                    }),
                                    d("p", {
                                        className: "hero__text",
                                        children: [
                                            "Aqu\xE9rissez des timbres en quelques \xE9tapes :",
                                            " ",
                                        ],
                                    }),
                                    d("ul", {
                                        children: [
                                            d("li", {
                                                children: [
                                                    l("strong", {
                                                        children: "1.",
                                                    }),
                                                    " Connectez-vous ou inscrivez-vous",
                                                ],
                                            }),
                                            d("li", {
                                                children: [
                                                    l("strong", {
                                                        children: "2.",
                                                    }),
                                                    " Utilisez la recherche avanc\xE9 pour trouver la perle rare",
                                                ],
                                            }),
                                            d("li", {
                                                className:
                                                    "hero__text--text-courant-var",
                                                children: [
                                                    l("strong", {
                                                        children: "3.",
                                                    }),
                                                    " Misez et suivez vos ench\xE8res favorites facilement",
                                                ],
                                            }),
                                        ],
                                    }),
                                    l("a", {
                                        className: "link--border",
                                        href: "#",
                                        children: "En savoir plus",
                                    }),
                                    l("img", {
                                        className: "icone-link-arrow",
                                        src: "/img/png/icone-link-arrow.png",
                                        alt: "icone fleche link",
                                    }),
                                ],
                            }),
                            d("div", {
                                className: "bg bg--grey",
                                children: [
                                    l("h2", {
                                        children:
                                            "D\xE9couvrez les coups de coeur du Lord",
                                    }),
                                    d("p", {
                                        className:
                                            "hero__text--text-courant-var",
                                        children: [
                                            "Rep\xE9rez l'icone",
                                            " ",
                                            l("img", {
                                                className: "icone-coup-coeur",
                                                src: "/img/png/icone-coup-de-coeur.png",
                                                alt: "icone coup de coeur lord",
                                            }),
                                            " ",
                                            "afin de trouver les ench\xE8res favorites de notre expert !",
                                        ],
                                    }),
                                    l("a", {
                                        className: "link--border-blue",
                                        href: "#",
                                        children: "Voir tous les favoris",
                                    }),
                                    l("img", {
                                        className: "icone-link-arrow",
                                        src: "/img/png/icone-link-arrow-blue.png",
                                        alt: "icone fleche link",
                                    }),
                                ],
                            }),
                            d("div", {
                                className: "bg bg--white",
                                children: [
                                    l("h2", {
                                        children: "Pas encore inscrit(e) ? ",
                                    }),
                                    l("p", {
                                        className: "hero__text--text-courant",
                                        children:
                                            "Misez et profitez pleinement de Stampee en tant que membre inscrit !",
                                    }),
                                    d("div", {
                                        className: "btn__container",
                                        children: [
                                            l("a", {
                                                className: "btn btn--orange",
                                                href: "#",
                                                children: "Devenir membre",
                                            }),
                                            l("a", {
                                                className: "btn",
                                                href: "#",
                                                children: "Se connecter",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            d("div", {
                className: "wrapper",
                children: [
                    d("section", {
                        children: [
                            l("h2", { children: "Offres en vedette" }),
                            d("div", {
                                className: "grid grid--5",
                                children: [
                                    d("div", {
                                        className: "tile bg--tile",
                                        children: [
                                            d("div", {
                                                className: "tile__container",
                                                children: [
                                                    d("div", {
                                                        children: [
                                                            d("p", {
                                                                className:
                                                                    "tile__lot",
                                                                children: [
                                                                    "Lot #",
                                                                    l(
                                                                        "strong",
                                                                        {
                                                                            children:
                                                                                "23",
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                            l("p", {
                                                                className:
                                                                    "tile__lot tile__lot--red",
                                                                children: l(
                                                                    "strong",
                                                                    {
                                                                        children:
                                                                            "14d-8h-56m-2s",
                                                                    }
                                                                ),
                                                            }),
                                                        ],
                                                    }),
                                                    l("img", {
                                                        className:
                                                            "icone-coup-coeur",
                                                        src: "/img/png/icone-coup-de-coeur.png",
                                                        alt: "icone coup de coeur lord",
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "tile__wrapper",
                                                children: [
                                                    l("div", {
                                                        className:
                                                            "tile__img-wrapper",
                                                        children: l("a", {
                                                            href: "enchere.html",
                                                            children: l("img", {
                                                                className:
                                                                    "tile__img",
                                                                src: "/img/jpg/hero-enchere.jpg",
                                                                alt: "Image d'une ench\xE8re'",
                                                            }),
                                                        }),
                                                    }),
                                                    l("h3", {
                                                        children:
                                                            "CYPRUS 95 LH",
                                                    }),
                                                    d("p", {
                                                        className: "tile__text",
                                                        children: [
                                                            "Mise courante | ",
                                                            l("span", {
                                                                children:
                                                                    "1\xA0offre",
                                                            }),
                                                        ],
                                                    }),
                                                    l("span", {
                                                        children: "10.50$",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__text-small",
                                                        children: l("small", {
                                                            children:
                                                                "derni\xE8re offre par user2022",
                                                        }),
                                                    }),
                                                    l("a", {
                                                        className:
                                                            "btn tile__btn",
                                                        href: "enchere.html",
                                                        children: "Miser",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    d("div", {
                                        className: "tile bg--tile",
                                        children: [
                                            l("div", {
                                                className: "tile__container",
                                                children: d("div", {
                                                    children: [
                                                        d("p", {
                                                            className:
                                                                "tile__lot",
                                                            children: [
                                                                "Lot #",
                                                                l("strong", {
                                                                    children:
                                                                        "102",
                                                                }),
                                                            ],
                                                        }),
                                                        l("p", {
                                                            className:
                                                                "tile__lot tile__lot--red",
                                                            children: l(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "1d-7h-06m-28s",
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            d("div", {
                                                className: "tile__wrapper",
                                                children: [
                                                    l("div", {
                                                        className:
                                                            "tile__img-wrapper",
                                                        children: l("img", {
                                                            className:
                                                                "tile__img",
                                                            src: "/img/jpg/encheres/timbre-2.jpg",
                                                            alt: "Image d'une ench\xE8re'",
                                                        }),
                                                    }),
                                                    l("h3", {
                                                        children:
                                                            "US California Scott #1",
                                                    }),
                                                    d("p", {
                                                        className: "tile__text",
                                                        children: [
                                                            "Mise courante | ",
                                                            l("span", {
                                                                children:
                                                                    "5\xA0offres",
                                                            }),
                                                        ],
                                                    }),
                                                    l("span", {
                                                        children: "259.00$",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__text-small",
                                                        children: l("small", {
                                                            children:
                                                                "derni\xE8re offre par user2022",
                                                        }),
                                                    }),
                                                    l("a", {
                                                        className:
                                                            "btn tile__btn",
                                                        href: "enchere.html",
                                                        children: "Miser",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    d("div", {
                                        className: "tile bg--tile",
                                        children: [
                                            l("div", {
                                                className: "tile__container",
                                                children: d("div", {
                                                    children: [
                                                        d("p", {
                                                            className:
                                                                "tile__lot",
                                                            children: [
                                                                "Lot #",
                                                                l("strong", {
                                                                    children:
                                                                        "45",
                                                                }),
                                                            ],
                                                        }),
                                                        l("p", {
                                                            className:
                                                                "tile__lot tile__lot--red",
                                                            children: l(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "9d-1h-40m-24s",
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            d("div", {
                                                className: "tile__wrapper",
                                                children: [
                                                    l("div", {
                                                        className:
                                                            "tile__img-wrapper",
                                                        children: l("img", {
                                                            className:
                                                                "tile__img",
                                                            src: "/img/jpg/encheres/timbre-3.jpg",
                                                            alt: "Image d'une ench\xE8re",
                                                        }),
                                                    }),
                                                    l("h3", {
                                                        children:
                                                            "USA 1857 Scott #36 Used. Deep color",
                                                    }),
                                                    d("p", {
                                                        className: "tile__text",
                                                        children: [
                                                            "Mise courante | ",
                                                            l("span", {
                                                                children:
                                                                    "10\xA0offres",
                                                            }),
                                                        ],
                                                    }),
                                                    l("span", {
                                                        children: "79.00$",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__text-small",
                                                        children: l("small", {
                                                            children:
                                                                "derni\xE8re offre par user2022",
                                                        }),
                                                    }),
                                                    l("a", {
                                                        className:
                                                            "btn tile__btn",
                                                        href: "enchere.html",
                                                        children: "Miser",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    d("div", {
                                        className: "tile bg--tile",
                                        children: [
                                            d("div", {
                                                className: "tile__container",
                                                children: [
                                                    d("div", {
                                                        children: [
                                                            d("p", {
                                                                className:
                                                                    "tile__lot",
                                                                children: [
                                                                    "Lot #",
                                                                    l(
                                                                        "strong",
                                                                        {
                                                                            children:
                                                                                "121",
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                            l("p", {
                                                                className:
                                                                    "tile__lot tile__lot--red",
                                                                children: l(
                                                                    "strong",
                                                                    {
                                                                        children:
                                                                            "10h-50m-05s",
                                                                    }
                                                                ),
                                                            }),
                                                        ],
                                                    }),
                                                    l("img", {
                                                        className:
                                                            "icone-coup-coeur",
                                                        src: "/img/png/icone-coup-de-coeur.png",
                                                        alt: "icone coup de coeur lord",
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "tile__wrapper",
                                                children: [
                                                    l("div", {
                                                        className:
                                                            "tile__img-wrapper",
                                                        children: l("img", {
                                                            className:
                                                                "tile__img",
                                                            src: "/img/jpg/encheres/timbre-4.jpg",
                                                            alt: "Image d'une ench\xE8re",
                                                        }),
                                                    }),
                                                    l("h3", {
                                                        children:
                                                            "AFFORDABLE GENUINE SCOTT USED SET",
                                                    }),
                                                    d("p", {
                                                        className: "tile__text",
                                                        children: [
                                                            "Mise courante | ",
                                                            l("span", {
                                                                children:
                                                                    "2\xA0offres",
                                                            }),
                                                        ],
                                                    }),
                                                    l("span", {
                                                        children: "150.00$",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__text-small",
                                                        children: l("small", {
                                                            children:
                                                                "derni\xE8re offre par user2022",
                                                        }),
                                                    }),
                                                    l("a", {
                                                        className:
                                                            "btn tile__btn",
                                                        href: "enchere.html",
                                                        children: "Miser",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    d("div", {
                                        className: "tile bg--tile",
                                        children: [
                                            l("div", {
                                                className: "tile__container",
                                                children: d("div", {
                                                    children: [
                                                        d("p", {
                                                            className:
                                                                "tile__lot",
                                                            children: [
                                                                "Lot #",
                                                                l("strong", {
                                                                    children:
                                                                        "67",
                                                                }),
                                                            ],
                                                        }),
                                                        l("p", {
                                                            className:
                                                                "tile__lot tile__lot--red",
                                                            children: l(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "21d-11h-12m-11s",
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            d("div", {
                                                className: "tile__wrapper",
                                                children: [
                                                    l("div", {
                                                        className:
                                                            "tile__img-wrapper",
                                                        children: l("img", {
                                                            className:
                                                                "tile__img",
                                                            src: "/img/jpg/encheres/timbre-5.jpg",
                                                            alt: "Image d'une ench\xE8re",
                                                        }),
                                                    }),
                                                    l("h3", {
                                                        children:
                                                            "Used 50\xA2 XF Well Centered GEM With PFC Graded",
                                                    }),
                                                    d("p", {
                                                        className: "tile__text",
                                                        children: [
                                                            "Mise courante | ",
                                                            l("span", {
                                                                children:
                                                                    "Aucune\xA0offre",
                                                            }),
                                                        ],
                                                    }),
                                                    l("span", {
                                                        children: "10.00$",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__text-small",
                                                        children: l("small", {
                                                            children:
                                                                "derni\xE8re offre par user2022",
                                                        }),
                                                    }),
                                                    l("a", {
                                                        className:
                                                            "btn tile__btn",
                                                        href: "enchere.html",
                                                        children: "Miser",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    d("section", {
                        children: [
                            l("h2", { children: "Cat\xE9gories" }),
                            d("div", {
                                className: "grid grid--3",
                                children: [
                                    d("div", {
                                        className: "tile tile--center bg--tile",
                                        children: [
                                            l("div", {
                                                className:
                                                    "tile__img-container tile__img-container--first",
                                                children: l("h3", {
                                                    children:
                                                        "Les plus populaire",
                                                }),
                                            }),
                                            l("a", {
                                                className: "btn",
                                                href: "#",
                                                children: "Voir tout",
                                            }),
                                        ],
                                    }),
                                    d("div", {
                                        className: "tile tile--center bg--tile",
                                        children: [
                                            l("div", {
                                                className:
                                                    "tile__img-container tile__img-container--second",
                                                children: l("h3", {
                                                    children:
                                                        "Bient\xF4t termin\xE9es",
                                                }),
                                            }),
                                            l("a", {
                                                className: "btn",
                                                href: "#",
                                                children: "Voir tout",
                                            }),
                                        ],
                                    }),
                                    d("div", {
                                        className: "tile tile--center bg--tile",
                                        children: [
                                            l("div", {
                                                className:
                                                    "tile__img-container tile__img-container--third",
                                                children: l("h3", {
                                                    children:
                                                        "Nouvelles offres",
                                                }),
                                            }),
                                            l("a", {
                                                className: "btn",
                                                href: "#",
                                                children: "Voir tout",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            l("section", {
                className: "bg--blue",
                children: d("div", {
                    className: "wrapper",
                    children: [
                        l("h2", {
                            className: "bg--blue-title",
                            children: "Actualit\xE9s",
                        }),
                        l("h3", {
                            className: "bg--blue-title",
                            children: "R\xE9cemment publi\xE9",
                        }),
                        d("div", {
                            className: "grid grid--3-var",
                            children: [
                                d("div", {
                                    className: "tile bg--tile-white",
                                    children: [
                                        l("small", {
                                            children: "Publi\xE9 le 06/04/2022",
                                        }),
                                        d("div", {
                                            className: "tile__container",
                                            children: [
                                                l("img", {
                                                    src: "/img/jpg/actualites/article-1.jpg",
                                                    alt: "Image du premier article",
                                                }),
                                                l("a", {
                                                    className: "btn",
                                                    href: "#",
                                                    children: "Lire l'article",
                                                }),
                                            ],
                                        }),
                                        l("h4", {
                                            children:
                                                "Comment j'ai appris \xE0 regarder les timbres",
                                        }),
                                        l("small", {
                                            children:
                                                "Par Lord R\xE9ginald Stampee",
                                        }),
                                        l("p", {
                                            children:
                                                "Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Sit amet cursus sit amet. Leo vel orci porta non pulvinar neque laoreet. Risus sed vulputate...",
                                        }),
                                    ],
                                }),
                                d("div", {
                                    className: "tile bg--tile-white",
                                    children: [
                                        l("small", {
                                            children: "Publi\xE9 le 05/04/2022",
                                        }),
                                        d("div", {
                                            className: "tile__container",
                                            children: [
                                                l("img", {
                                                    src: "/img/jpg/actualites/article-2.jpg",
                                                    alt: "Image du deuxi\xE8me article",
                                                }),
                                                l("a", {
                                                    className: "btn",
                                                    href: "#",
                                                    children: "Lire l'article",
                                                }),
                                            ],
                                        }),
                                        l("h4", {
                                            children:
                                                "Paradis des ench\xE8res - Une heure \xE0 Londre",
                                        }),
                                        l("small", {
                                            children:
                                                "Par Lord R\xE9ginald Stampee",
                                        }),
                                        l("p", {
                                            children:
                                                "Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Sit amet cursus sit amet. Leo vel orci porta non pulvinar neque laoreet. Risus sed vulputate...",
                                        }),
                                    ],
                                }),
                                d("div", {
                                    className: "tile tile--no-bg",
                                    children: [
                                        l("a", {
                                            href: "#",
                                            children: d("div", {
                                                className:
                                                    "tile__container bg--no-bg",
                                                children: [
                                                    l("img", {
                                                        width: "75",
                                                        src: "/img/png/icone-timbre.png",
                                                        alt: "Icone d'un timbre",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "link--border",
                                                        children: "Timbres",
                                                    }),
                                                    l("img", {
                                                        className:
                                                            "icone-link-arrow",
                                                        src: "/img/png/icone-link-arrow.png",
                                                        alt: "icone fleche link",
                                                    }),
                                                ],
                                            }),
                                        }),
                                        l("a", {
                                            href: "#",
                                            children: d("div", {
                                                className:
                                                    "tile__container bg--no-bg",
                                                children: [
                                                    l("img", {
                                                        width: "75",
                                                        src: "/img/png/icone-enchere.png",
                                                        alt: "Icone d'un marteau",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "link--border",
                                                        children: "Ench\xE8res",
                                                    }),
                                                    l("img", {
                                                        className:
                                                            "icone-link-arrow",
                                                        src: "/img/png/icone-link-arrow.png",
                                                        alt: "icone fleche link",
                                                    }),
                                                ],
                                            }),
                                        }),
                                        l("a", {
                                            href: "#",
                                            children: d("div", {
                                                className:
                                                    "tile__container bg--no-bg bg--no-bg-border",
                                                children: [
                                                    l("img", {
                                                        width: "75",
                                                        src: "/img/png/icone-bridge.png",
                                                        alt: "Icone d'un jeu de carte",
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "link--border",
                                                        children: "Bridge",
                                                    }),
                                                    l("img", {
                                                        className:
                                                            "icone-link-arrow",
                                                        src: "/img/png/icone-link-arrow.png",
                                                        alt: "icone fleche link",
                                                    }),
                                                ],
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            l("div", {
                className: "wrapper",
                children: d("section", {
                    children: [
                        l("h2", { children: "Notre mission" }),
                        d("div", {
                            className: "grid grid--2",
                            children: [
                                l("div", {
                                    className: "tile bg--tile",
                                    children: d("div", {
                                        className: "tile__container-text-img",
                                        children: [
                                            l("img", {
                                                className:
                                                    "tile__img tile__img-container tile__img--border",
                                                src: "/img/jpg/lord-stampee.jpg",
                                                alt: "Image du Lord",
                                            }),
                                            d("div", {
                                                className:
                                                    "tile__container-text",
                                                children: [
                                                    l("h3", {
                                                        children:
                                                            "Une plateforme pour les passionn\xE9(e)s",
                                                    }),
                                                    l("p", {
                                                        children:
                                                            "Lord Reginald Stampee, duc de Worcessteshear et philat\xE9liste depuis sa tendre enfance au milieu des ann\xE9es cinquante, Venenatis urna cursuse nunc scelerisque viverra mauris in. Dolor sit amet consectetur adipiscing purus sit. Vel pharetra vel turpis nunc eget lorem dolor sed. Vitae congue",
                                                    }),
                                                    l("a", {
                                                        className: "btn",
                                                        href: "#",
                                                        children:
                                                            "Lire la suite",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                                d("div", {
                                    className: "tile tile--center bg--tile",
                                    children: [
                                        l("div", {
                                            className:
                                                "tile__img-container bg--blue",
                                            children: l("p", {
                                                className: "tile--center-text",
                                                children:
                                                    "Notre \xE9quipe est toujours pr\xEAte \xE0 r\xE9pondre \xE0 vos questions dans les plus bref d\xE9lais !",
                                            }),
                                        }),
                                        l("a", {
                                            className: "btn",
                                            href: "#",
                                            children: "Contactez-nous",
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}
document.getElementById("home") &&
    _t
        .createRoot(document.getElementById("home"))
        .render(l(un.StrictMode, { children: l(SN, {}) }));
function Ni({
    currentPage: e,
    totalPages: t,
    onPageChange: n,
    changeClass: r,
}) {
    const i = [];
    for (let s = 1; s <= t; s++) i.push(s);
    const o = (s) => {
        s >= 1 && s <= t && n(s);
    };
    return [
        d("div", {
            className:
                r === "true"
                    ? "menu__nav-page menu__nav-page-wrapper"
                    : "menu__nav-page menu__nav-page--var",
            children: [
                l("div", {
                    className: `${e === 1 ? "disabled" : ""}`,
                    onClick: () => o(e - 1),
                    disabled: e === 1,
                    children: l("img", {
                        width: "10",
                        src: "/img/png/icone-link-arrow-blue-left.png",
                        alt: "fleche dropwdown",
                    }),
                }),
                i.map((s) =>
                    l(
                        "div",
                        {
                            className: `pagination-btn ${
                                s === e ? "active" : ""
                            }`,
                            onClick: () => o(s),
                            children: l("a", {
                                children: l("span", { children: s }),
                            }),
                        },
                        s
                    )
                ),
                l("div", {
                    className: `${e === t ? "disabled" : ""}`,
                    onClick: () => o(e + 1),
                    disabled: e === t,
                    children: l("img", {
                        width: "10",
                        src: "/img/png/icone-link-arrow-blue.png",
                        alt: "fleche dropwdown",
                    }),
                }),
            ],
        }),
    ];
}
document.getElementById("pagination") &&
    _t
        .createRoot(document.getElementById("pagination"))
        .render(l(un.StrictMode, { children: l(Ni, {}) }));
function CN() {
    const [e, t] = I.exports.useState(1),
        n = (F) => {
            t(F);
            const b = 10,
                q = (F - 1) * b,
                ee = q + b,
                Ce = r.slice(q, ee);
            s(Ce);
        },
        [r, i] = I.exports.useState([]),
        [o, s] = I.exports.useState([]),
        [a, c] = I.exports.useState(),
        u = a % 10 !== 0 ? a / 10 + 1 : a / 10,
        [f, h] = I.exports.useState([]),
        v = (F) => {
            f.includes(F) ? h(f.filter((b) => b !== F)) : h([...f, F]);
        },
        [y, _] = I.exports.useState([]),
        E = (F) => {
            y.includes(F) ? _(y.filter((b) => b !== F)) : _([...y, F]);
        },
        [P, m] = I.exports.useState(0),
        [p, g] = I.exports.useState(0),
        w = (F) => {
            m(parseInt(F.target.value));
        },
        C = (F) => {
            g(parseInt(F.target.value));
        },
        [T, O] = I.exports.useState(1900),
        [k, $] = I.exports.useState(2023),
        D = (F) => {
            isNaN(parseInt(F.target.value))
                ? O(1900)
                : O(parseInt(F.target.value));
        },
        z = (F) => {
            $(parseInt(F.target.value));
        };
    I.exports.useEffect(() => {
        ae.get("/getAllBids").then((F) => {
            s(F.data.slice(0, 10)), i(F.data);
        });
    }, []),
        I.exports.useEffect(() => {
            ae.get("/getBidsCount").then((F) => {
                c(F.data);
            });
        }, []);
    const [V, U] = I.exports.useState(""),
        le = (F) => {
            U(F.target.value);
        },
        de = (F) => {
            F.preventDefault(),
                h([]),
                _([]),
                ae.get("/getAllBids").then((b) => {
                    s(b.data.slice(0, 10));
                }),
                U("Tous les pays");
        },
        Q = (F) => {
            F.preventDefault();
            const b = {
                selectedCategoriesConditions: f,
                selectedCategoriesTypes: y,
                minAnnee: T,
                maxAnnee: k,
                minPrix: P,
                maxPrix: p,
                selectedOption: V,
            };
            ae.post("/enchere/filter", b).then((q) => {
                console.log(
                    "\u8FD9\u662F\u540E\u7AEF\u8FD4\u56DE\u6765\u7684\u6570\u636E",
                    q.data
                ),
                    s(q.data);
            });
        },
        oe = (F) => {
            if (
                (console.log(F.target.value), F.target.value == "decroissant")
            ) {
                const b = [...o].sort(
                    (q, ee) => ee.reservePrice - q.reservePrice
                );
                s(b);
            } else if (F.target.value == "croissant") {
                const b = [...o].sort(
                    (q, ee) => q.reservePrice - ee.reservePrice
                );
                s(b);
            } else F.target.value == "tous" && s(r);
        },
        [S, L] = I.exports.useState(!1),
        M = () => {
            L(!0),
                document.documentElement.classList.add("overflow-y--hidden"),
                document.body.classList.add("overflow-y--hidden");
        },
        K = () => {
            document.documentElement.classList.remove("overflow-y--hidden"),
                document.body.classList.remove("overflow-y--hidden"),
                L(!1);
        },
        Y = (F) => {
            F.propertyName === "left" &&
                document
                    .getElementById("searchbar")
                    .classList.replace("menu--transition", "menu--close");
        };
    return d("div", {
        children: [
            l("div", {
                className: "hero hero--page-interieure",
                children: d("div", {
                    className: "wrapper",
                    children: [
                        l("h1", {
                            className: "hero__text",
                            children: "Parcourez nos ench\xE8res",
                        }),
                        l("h2", {
                            className: "hero__text--sous-titre",
                            children: "Trouvez la perle rare",
                        }),
                        l("a", {
                            className: "btn",
                            href: "#",
                            children: "Fonctionnement",
                        }),
                        l("a", {
                            className: "btn",
                            href: "#",
                            children: "Certification",
                        }),
                    ],
                }),
            }),
            d("div", {
                className: "menu-secondaire",
                children: [
                    d("div", {
                        className: "wrapper wrapper--menu-secondaire",
                        children: [
                            d("ul", {
                                className: "menu-secondaire__container",
                                children: [
                                    l("li", {
                                        className:
                                            "menu__item menu__item--principal",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "/catalogue",
                                            children: "En cours",
                                        }),
                                    }),
                                    l("li", {
                                        className:
                                            "menu__item menu__item--principal",
                                        children: l("a", {
                                            className: "menu__link",
                                            href: "#",
                                            children: "Archive",
                                        }),
                                    }),
                                ],
                            }),
                            d("select", {
                                className: "menu-secondaire__select",
                                "aria-label": "select-sort-order",
                                defaultValue: "Trier",
                                onChange: oe,
                                children: [
                                    l("option", {
                                        disabled: !0,
                                        children: "Trier",
                                    }),
                                    l("option", {
                                        value: "tous",
                                        children: "Tous",
                                    }),
                                    d("option", {
                                        value: "decroissant",
                                        children: [
                                            "Prix d\xE9croissant \xA0 \xA0\xA0\xA0\xA0",
                                            " ",
                                        ],
                                    }),
                                    l("option", {
                                        value: "croissant",
                                        children: "Prix croissant",
                                    }),
                                ],
                            }),
                            d("div", {
                                className:
                                    "wrapper--header menu-secondaire__icone",
                                children: [
                                    l("div", {
                                        className: "btn",
                                        children: l("img", {
                                            src: "/img/png/icone-gallery-1.png",
                                            alt: "gallerie vertical",
                                        }),
                                    }),
                                    l("div", {
                                        className: "btn",
                                        children: l("img", {
                                            src: "/img/png/icone-gallery-2.png",
                                            alt: "gallerie horizontal",
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    d("button", {
                        className: "burger burger-search btn",
                        "aria-label": "burger",
                        "data-js-search": !0,
                        onClick: M,
                        children: [
                            "Recherche Avanc\xE9e",
                            l("img", {
                                width: "5",
                                src: "/img/png/icone-link-arrow.png",
                                alt: "fleche dropwdown",
                            }),
                        ],
                    }),
                ],
            }),
            l(Ni, {
                currentPage: e,
                totalPages: u,
                onPageChange: n,
                changeClass: "true",
            }),
            d("div", {
                className: "wrapper gallery",
                children: [
                    d("div", {
                        className: "wrapper--header",
                        children: [
                            d("div", {
                                className: "search-bar search-bar--desktop",
                                children: [
                                    l("h2", {
                                        children: "Recherche Avanc\xE9e",
                                    }),
                                    d("form", {
                                        method: "GET",
                                        children: [
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children: "Condition",
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    f.includes(
                                                                        "Parfaite"
                                                                    ),
                                                                onChange: () =>
                                                                    v(
                                                                        "Parfaite"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Parfaite",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    f.includes(
                                                                        "Excellente"
                                                                    ),
                                                                onChange: () =>
                                                                    v(
                                                                        "Excellente"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Excellente",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    f.includes(
                                                                        "Bonne"
                                                                    ),
                                                                onChange: () =>
                                                                    v("Bonne"),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Bonne",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    f.includes(
                                                                        "Moyenne"
                                                                    ),
                                                                onChange: () =>
                                                                    v(
                                                                        "Moyenne"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Moyenne",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    f.includes(
                                                                        "Endommag\xE9"
                                                                    ),
                                                                onChange: () =>
                                                                    v(
                                                                        "Endommag\xE9"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Endommag\xE9",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children:
                                                            "Pays d'origine",
                                                    }),
                                                    d("select", {
                                                        "aria-label":
                                                            "select-country",
                                                        value: V,
                                                        onChange: le,
                                                        children: [
                                                            l("option", {
                                                                defaultValue:
                                                                    !0,
                                                                value: "tous",
                                                                children:
                                                                    "Tous les pays",
                                                            }),
                                                            l("option", {
                                                                value: "Royaume-Uni",
                                                                children:
                                                                    "Royaume-Uni",
                                                            }),
                                                            l("option", {
                                                                value: "\xC9tats-unis",
                                                                children:
                                                                    "\xC9tats-unis",
                                                            }),
                                                            l("option", {
                                                                value: "Canada",
                                                                children:
                                                                    "Canada",
                                                            }),
                                                            l("option", {
                                                                value: "Australie",
                                                                children:
                                                                    "Australie",
                                                            }),
                                                            l("option", {
                                                                value: "Chine",
                                                                children:
                                                                    "Chine",
                                                            }),
                                                            l("option", {
                                                                value: "France",
                                                                children:
                                                                    "France",
                                                            }),
                                                            l("option", {
                                                                value: "Espagne",
                                                                children:
                                                                    "Espagne",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children: "Prix",
                                                    }),
                                                    d("div", {
                                                        className:
                                                            "wrapper--header",
                                                        children: [
                                                            d("div", {
                                                                className:
                                                                    "wrapper--header",
                                                                children: [
                                                                    l("input", {
                                                                        type: "number",
                                                                        placeholder:
                                                                            "00.00",
                                                                        value: P,
                                                                        onChange:
                                                                            w,
                                                                    }),
                                                                    l("span", {
                                                                        children:
                                                                            "$\xA0-",
                                                                    }),
                                                                ],
                                                            }),
                                                            d("div", {
                                                                className:
                                                                    "wrapper--header",
                                                                children: [
                                                                    l("input", {
                                                                        type: "number",
                                                                        "aria-label":
                                                                            "input-price",
                                                                        value: p,
                                                                        onChange:
                                                                            C,
                                                                    }),
                                                                    l("span", {
                                                                        children:
                                                                            "$",
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children: "Type",
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    y.includes(
                                                                        "G\xE9n\xE9ral"
                                                                    ),
                                                                onChange: () =>
                                                                    E(
                                                                        "G\xE9n\xE9ral"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "G\xE9n\xE9ral",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    y.includes(
                                                                        "Courrier A\xE9rien"
                                                                    ),
                                                                onChange: () =>
                                                                    E(
                                                                        "Courrier A\xE9rien"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Courrier A\xE9rien",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    y.includes(
                                                                        "Livret"
                                                                    ),
                                                                onChange: () =>
                                                                    E("Livret"),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Livret",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    y.includes(
                                                                        "Port d\xFB"
                                                                    ),
                                                                onChange: () =>
                                                                    E(
                                                                        "Port d\xFB"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Port d\xFB",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    y.includes(
                                                                        "Carte postale"
                                                                    ),
                                                                onChange: () =>
                                                                    E(
                                                                        "Carte postale"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Carte postale",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    y.includes(
                                                                        "Semi postal"
                                                                    ),
                                                                onChange: () =>
                                                                    E(
                                                                        "Semi postal"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Semi postal",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    y.includes(
                                                                        "Entier postal"
                                                                    ),
                                                                onChange: () =>
                                                                    E(
                                                                        "Entier postal"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Entier postal",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children:
                                                            "Ann\xE9e d'\xE9mission",
                                                    }),
                                                    d("div", {
                                                        className:
                                                            "wrapper--header",
                                                        children: [
                                                            d("div", {
                                                                className:
                                                                    "wrapper--header",
                                                                children: [
                                                                    l("input", {
                                                                        type: "number",
                                                                        "aria-label":
                                                                            "input-year-min",
                                                                        value: T,
                                                                        onChange:
                                                                            D,
                                                                    }),
                                                                    l("span", {
                                                                        children:
                                                                            "-",
                                                                    }),
                                                                ],
                                                            }),
                                                            l("input", {
                                                                type: "number",
                                                                "aria-label":
                                                                    "input-year-max",
                                                                value: k,
                                                                onChange: z,
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            l("div", {
                                                className: "wrapper--header",
                                                children: d("div", {
                                                    children: [
                                                        d("a", {
                                                            className:
                                                                "btn btn--text-icone default",
                                                            onClick: de,
                                                            children: [
                                                                "Par d\xE9faut",
                                                                l("img", {
                                                                    width: "15",
                                                                    src: "/img/png/icone-round-arrow-orange.png",
                                                                    alt: "icone fleche par defaut",
                                                                }),
                                                            ],
                                                        }),
                                                        l("a", {
                                                            className:
                                                                "btn btn--text-icone",
                                                            href: "#",
                                                            onClick: Q,
                                                            children:
                                                                "Chercher",
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            d("aside", {
                                id: "searchbar",
                                className: `menu__mobile--white menu__mobile menu ${
                                    S ? "menu--open" : "menu--close"
                                }`,
                                "aria-label": "aside-search-close",
                                "data-js-search-bar": !0,
                                onTransitionEnd: Y,
                                children: [
                                    l("div", {
                                        className: "menu__close--wrapper",
                                        "data-js-close-search-bar": !0,
                                        children: l("button", {
                                            className: "menu__close",
                                            "aria-label":
                                                "aside-search-close-btn",
                                            onClick: K,
                                        }),
                                    }),
                                    l("div", {
                                        className:
                                            "search-bar search-bar--mobile",
                                        children: d("form", {
                                            method: "GET",
                                            children: [
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Condition",
                                                        }),
                                                        d("select", {
                                                            "aria-label":
                                                                "select-condition",
                                                            children: [
                                                                l("option", {
                                                                    defaultValue:
                                                                        !0,
                                                                    value: "tous",
                                                                    children:
                                                                        "Tous",
                                                                }),
                                                                l("option", {
                                                                    value: "parfaite",
                                                                    children:
                                                                        "Parfaite",
                                                                }),
                                                                l("option", {
                                                                    value: "excellente",
                                                                    children:
                                                                        "excellente",
                                                                }),
                                                                l("option", {
                                                                    value: "bonne",
                                                                    children:
                                                                        "Bonne",
                                                                }),
                                                                l("option", {
                                                                    value: "moyenne",
                                                                    children:
                                                                        "Moyenne",
                                                                }),
                                                                l("option", {
                                                                    value: "endommage",
                                                                    children:
                                                                        "Endommag\xE9",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Pays d'origine",
                                                        }),
                                                        d("select", {
                                                            "aria-label":
                                                                "mobile-select-country",
                                                            children: [
                                                                l("option", {
                                                                    defaultValue:
                                                                        !0,
                                                                    value: "tous",
                                                                    children:
                                                                        "Tous les pays",
                                                                }),
                                                                l("option", {
                                                                    value: "royaume-uni",
                                                                    children:
                                                                        "Royaume-Uni",
                                                                }),
                                                                l("option", {
                                                                    value: "etats-unis",
                                                                    children:
                                                                        "\xC9tats-unis",
                                                                }),
                                                                l("option", {
                                                                    value: "canada",
                                                                    children:
                                                                        "Canada",
                                                                }),
                                                                l("option", {
                                                                    value: "australie",
                                                                    children:
                                                                        "Australie",
                                                                }),
                                                                l("option", {
                                                                    value: "chine",
                                                                    children:
                                                                        "Chine",
                                                                }),
                                                                l("option", {
                                                                    value: "france",
                                                                    children:
                                                                        "France",
                                                                }),
                                                                l("option", {
                                                                    value: "espagne",
                                                                    children:
                                                                        "Espagne",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children: "Prix",
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "wrapper--header",
                                                            children: [
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                name: "prix",
                                                                                placeholder:
                                                                                    "00.00",
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "$\xA0-",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                name: "prix",
                                                                                "aria-label":
                                                                                    "mobile-input-price",
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "$",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children: "Type",
                                                        }),
                                                        d("select", {
                                                            "aria-label":
                                                                "select-type",
                                                            children: [
                                                                l("option", {
                                                                    defaultValue:
                                                                        !0,
                                                                    value: "tous",
                                                                    children:
                                                                        "Tous",
                                                                }),
                                                                l("option", {
                                                                    value: "general",
                                                                    children:
                                                                        "G\xE9n\xE9ral",
                                                                }),
                                                                l("option", {
                                                                    value: "courier",
                                                                    children:
                                                                        "Courier",
                                                                }),
                                                                l("option", {
                                                                    value: "livret",
                                                                    children:
                                                                        "Livret",
                                                                }),
                                                                l("option", {
                                                                    value: "port-du",
                                                                    children:
                                                                        "Port d\xFB",
                                                                }),
                                                                l("option", {
                                                                    value: "carte-postale",
                                                                    children:
                                                                        "Carte postale",
                                                                }),
                                                                l("option", {
                                                                    value: "semi-postal",
                                                                    children:
                                                                        "Semi postal",
                                                                }),
                                                                l("option", {
                                                                    value: "entier-postal",
                                                                    children:
                                                                        "Entier postal",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Ann\xE9e d'\xE9mission",
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "wrapper--header",
                                                            children: [
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                name: "annee",
                                                                                "aria-label":
                                                                                    "mobile-input-year-min",
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "-",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                l("input", {
                                                                    type: "number",
                                                                    name: "annee",
                                                                    "aria-label":
                                                                        "mobile-input-year-max",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Dimensions (pouces)",
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "wrapper--header",
                                                            children: [
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                name: "dimension",
                                                                                placeholder:
                                                                                    "00.00",
                                                                                "aria-label":
                                                                                    "mobile-input-dimension-height",
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "-",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                l("input", {
                                                                    type: "number",
                                                                    name: "dimension",
                                                                    "aria-label":
                                                                        "mobile-input-dimension-width",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                l("div", {
                                                    className:
                                                        "wrapper--header-mobile",
                                                    children: d("div", {
                                                        children: [
                                                            d("a", {
                                                                className:
                                                                    "btn btn--text-icone default",
                                                                children: [
                                                                    "Par d\xE9faut",
                                                                    l("img", {
                                                                        src: "/img/png/icone-round-arrow-orange.png",
                                                                        alt: "icone fleche par defaut",
                                                                    }),
                                                                ],
                                                            }),
                                                            l("a", {
                                                                className:
                                                                    "btn btn--text-icone",
                                                                href: "#",
                                                                children:
                                                                    "Chercher",
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                            d("div", {
                                className: "wrapper--gallery",
                                children: [
                                    d("p", {
                                        className: "gallery__text",
                                        children: [
                                            o.length,
                                            " ench\xE8res trouv\xE9es |",
                                            " ",
                                            (e - 1) * 10,
                                            " -",
                                            " ",
                                            e * 10 > a ? a : e * 10,
                                            " ",
                                            "de ",
                                            a,
                                        ],
                                    }),
                                    l("div", {
                                        className: "grid grid--5-var",
                                        children: o.map((F) =>
                                            d(
                                                "div",
                                                {
                                                    className: "tile bg--tile",
                                                    children: [
                                                        d("div", {
                                                            className:
                                                                "tile__container",
                                                            children: [
                                                                d("div", {
                                                                    children: [
                                                                        d("p", {
                                                                            className:
                                                                                "tile__lot",
                                                                            children:
                                                                                [
                                                                                    "Lot #",
                                                                                    l(
                                                                                        "strong",
                                                                                        {
                                                                                            children:
                                                                                                F.id,
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }),
                                                                        l("p", {
                                                                            className:
                                                                                "tile__lot tile__lot--red",
                                                                            children:
                                                                                l(
                                                                                    "strong",
                                                                                    {
                                                                                        children:
                                                                                            "14d-8h-56m-2s",
                                                                                    }
                                                                                ),
                                                                        }),
                                                                    ],
                                                                }),
                                                                l("img", {
                                                                    className:
                                                                        "icone-coup-coeur",
                                                                    src: "/img/png/icone-coup-de-coeur.png",
                                                                    alt: "icone coup de coeur lord",
                                                                }),
                                                            ],
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "tile__wrapper",
                                                            children: [
                                                                l("div", {
                                                                    className:
                                                                        "tile__img-wrapper",
                                                                    children: l(
                                                                        "a",
                                                                        {
                                                                            href: "enchere.html",
                                                                            children:
                                                                                l(
                                                                                    "img",
                                                                                    {
                                                                                        className:
                                                                                            "tile__img",
                                                                                        src: F.imageURL,
                                                                                        alt: "Image d'une ench\xE8re'",
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                }),
                                                                l("h3", {
                                                                    children:
                                                                        F.name,
                                                                }),
                                                                d("p", {
                                                                    className:
                                                                        "tile__text",
                                                                    children: [
                                                                        "Mise courante |",
                                                                        " ",
                                                                        d(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        F.auctionCount,
                                                                                        "\xA0offre",
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                d("span", {
                                                                    children: [
                                                                        F.reservePrice,
                                                                        "$",
                                                                    ],
                                                                }),
                                                                l("p", {
                                                                    className:
                                                                        "tile__text-small",
                                                                    children: l(
                                                                        "small",
                                                                        {
                                                                            children:
                                                                                "derni\xE8re offre par user2022",
                                                                        }
                                                                    ),
                                                                }),
                                                                l("a", {
                                                                    className:
                                                                        "btn tile__btn",
                                                                    href: `/enchere/${F.id}`,
                                                                    children:
                                                                        "Miser",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                },
                                                F.id
                                            )
                                        ),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    d("div", {
                        className: "wrapper--header-page",
                        children: [
                            l(Ni, {
                                currentPage: e,
                                totalPages: u,
                                onPageChange: n,
                                changeClass: "false",
                            }),
                            d("p", {
                                className: "gallery__text gallery__text--right",
                                children: [
                                    o.length,
                                    " ench\xE8res trouv\xE9es |",
                                    " ",
                                    (e - 1) * 10,
                                    " -",
                                    " ",
                                    e * 10 > a ? a : e * 10,
                                    " ",
                                    "de ",
                                    a,
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
document.getElementById("catalogue") &&
    _t
        .createRoot(document.getElementById("catalogue"))
        .render(l(un.StrictMode, { children: l(CN, {}) }));
function xN() {
    const e = window.location.pathname.split("/").pop(),
        [t, n] = I.exports.useState([]),
        [r, i] = I.exports.useState(null),
        [o, s] = I.exports.useState(""),
        [a, c] = I.exports.useState(""),
        [u, f] = I.exports.useState("");
    I.exports.useEffect(() => {
        ae.get(`/getOneBid/${e}`).then((k) => {
            n(k.data[0]),
                s(parseFloat(k.data[0].reservePrice)),
                c(parseFloat(k.data[0].reservePrice) + 0.5);
        });
    }, []);
    const h = new Date(),
        v = h.getFullYear(),
        y = h.getMonth() + 1,
        _ = h.getDate(),
        E = h.getHours(),
        P = h.getMinutes(),
        m = h.getSeconds(),
        p = `${v}-${String(y).padStart(2, "0")}-${String(_).padStart(
            2,
            "0"
        )} ${String(E).padStart(2, "0")}:${String(P).padStart(2, "0")}:${String(
            m
        ).padStart(2, "0")}`,
        g =
            new Date(t.endDate).getTime() > new Date(p).getTime()
                ? w(t.endDate, p)
                : "Ferm\xE9";
    function w(k, $) {
        const D = new Date(k).getTime(),
            z = new Date($).getTime();
        let V = Math.abs(z - D);
        const U = Math.floor(V / (1e3 * 60 * 60 * 24));
        V -= U * 1e3 * 60 * 60 * 24;
        const le = Math.floor(V / (1e3 * 60 * 60));
        V -= le * 1e3 * 60 * 60;
        const de = Math.floor(V / (1e3 * 60));
        V -= de * 1e3 * 60;
        const Q = Math.floor(V / 1e3);
        return { days: U, hours: le, minutes: de, seconds: Q };
    }
    const C = (k) => {
        f(parseFloat(k.target.value));
    };
    I.exports.useEffect(() => {
        !isNaN(u) && u >= o + 0.5 && s(u);
    }, [u, o]);
    function T(k) {
        k.preventDefault(),
            ae.get("/checkUser").then(($) => {
                $.data
                    ? (i($.data),
                      ae
                          .patch(`/enchere/miser/${t.id}`, { reservePrice: o })
                          .then((D) => {
                              ae.get(`/getOneBid/${e}`).then((z) => {
                                  n(z.data[0]),
                                      s(parseFloat(z.data[0].reservePrice));
                              });
                          }))
                    : (window.location.pathname = "/login");
            });
    }
    function O(k) {
        k.preventDefault(),
            ae.get("/checkUser").then(($) => {
                $.data
                    ? (i($.data),
                      ae
                          .patch(`/enchere/miser/${t.id}`, { reservePrice: a })
                          .then((D) => {
                              ae.get(`/getOneBid/${e}`).then((z) => {
                                  n(z.data[0]),
                                      c(
                                          parseFloat(z.data[0].reservePrice) +
                                              0.5
                                      ),
                                      s(parseFloat(z.data[0].reservePrice));
                              });
                          }))
                    : (window.location.pathname = "/login");
            });
    }
    return d("div", {
        children: [
            l("div", {
                className: "hero hero--enchere",
                children: d("div", {
                    className: "wrapper",
                    children: [
                        d("h2", {
                            children: [
                                "Lot #",
                                t.id,
                                " | ",
                                l("span", { children: t.status }),
                                l("img", {
                                    className: "icone-coup-coeur",
                                    src: "/img/png/icone-coup-de-coeur.png",
                                    alt: "icone coup de coeur lord",
                                }),
                            ],
                        }),
                        l("h1", { children: t.name }),
                    ],
                }),
            }),
            l("section", {
                className: "bg--grey-var",
                children: d("div", {
                    className: "wrapper",
                    children: [
                        d("div", {
                            className: "link wrapper--header ",
                            children: [
                                l("img", {
                                    className: "icone-link-arrow",
                                    src: "/img/png/icone-link-arrow-blue-left.png",
                                    alt: "icone fleche link",
                                }),
                                l("a", {
                                    className: "link--border-blue",
                                    href: "/catalogue",
                                    children: "Retour au catalogue",
                                }),
                            ],
                        }),
                        d("div", {
                            className: "pannels",
                            children: [
                                l("div", {
                                    className: "gallery__container",
                                    children: l("div", {
                                        className:
                                            "tile__img-wrapper tile__img-wrapper--enchere",
                                        children: l("img", {
                                            className: "tile__img",
                                            src: t.imageURL,
                                            alt: "Image d'une ench\xE8re'",
                                        }),
                                    }),
                                }),
                                d("div", {
                                    className: "pannels--container",
                                    children: [
                                        d("div", {
                                            className:
                                                "pannel__detail wrapper--header",
                                            children: [
                                                d("div", {
                                                    className: "pannel__nav",
                                                    children: [
                                                        d("div", {
                                                            children: [
                                                                l("img", {
                                                                    width: "25",
                                                                    src: "/img/png/icone-eye.png",
                                                                    alt: "icone d\xE9tail",
                                                                }),
                                                                l("p", {
                                                                    children:
                                                                        "D\xE9tails",
                                                                }),
                                                            ],
                                                        }),
                                                        d("div", {
                                                            children: [
                                                                l("img", {
                                                                    width: "25",
                                                                    src: "/img/png/icone-round-arrow.png",
                                                                    alt: "icone historique",
                                                                }),
                                                                l("p", {
                                                                    children:
                                                                        "Historique",
                                                                }),
                                                            ],
                                                        }),
                                                        d("div", {
                                                            children: [
                                                                l("img", {
                                                                    width: "25",
                                                                    src: "/img/png/icone-profil.png",
                                                                    alt: "icone vendeur",
                                                                }),
                                                                l("p", {
                                                                    children:
                                                                        "Vendeur",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("div", {
                                                    className: "pannel__text",
                                                    "data-js-pannel": !0,
                                                    children: [
                                                        d("p", {
                                                            className:
                                                                "tile__text",
                                                            children: [
                                                                "Mise courante |",
                                                                " ",
                                                                d("strong", {
                                                                    children: [
                                                                        t.auctionCount,
                                                                        " offre",
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                        d("h2", {
                                                            children: [
                                                                t.reservePrice,
                                                                "$",
                                                            ],
                                                        }),
                                                        l("p", {
                                                            className:
                                                                "tile__text-small",
                                                            children: l(
                                                                "small",
                                                                {}
                                                            ),
                                                        }),
                                                        d("p", {
                                                            children: [
                                                                l("strong", {
                                                                    children:
                                                                        "Description",
                                                                }),
                                                                " :",
                                                                " ",
                                                                t.description,
                                                            ],
                                                        }),
                                                        d("p", {
                                                            children: [
                                                                l("strong", {
                                                                    children:
                                                                        "Type",
                                                                }),
                                                                " : ",
                                                                t.type,
                                                            ],
                                                        }),
                                                        d("p", {
                                                            children: [
                                                                l("strong", {
                                                                    children:
                                                                        "Condition",
                                                                }),
                                                                " :",
                                                                " ",
                                                                t.conditions,
                                                            ],
                                                        }),
                                                        d("p", {
                                                            children: [
                                                                l("strong", {
                                                                    children:
                                                                        "Format",
                                                                }),
                                                                " :",
                                                                " ",
                                                                t.dimensions,
                                                            ],
                                                        }),
                                                        d("p", {
                                                            children: [
                                                                l("strong", {
                                                                    children:
                                                                        "Ann\xE9e d'\xE9mission",
                                                                }),
                                                                " :",
                                                                " ",
                                                                t.creationDate,
                                                            ],
                                                        }),
                                                        d("p", {
                                                            children: [
                                                                l("strong", {
                                                                    children:
                                                                        "Pays d'origine",
                                                                }),
                                                                " :",
                                                                " ",
                                                                t.country,
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                l("div", {
                                                    className:
                                                        "pannel__text pannel__hidden",
                                                    "data-js-pannel": !0,
                                                    children: l("p", {
                                                        children: "Historique",
                                                    }),
                                                }),
                                                l("div", {
                                                    className:
                                                        "pannel__text pannel__hidden",
                                                    "data-js-pannel": !0,
                                                    children: l("p", {
                                                        children: "Vendeur",
                                                    }),
                                                }),
                                            ],
                                        }),
                                        d("div", {
                                            className: "pannel__form grid",
                                            children: [
                                                d("div", {
                                                    children: [
                                                        l("p", {
                                                            children:
                                                                "Ferme dans",
                                                        }),
                                                        l("p", {
                                                            className:
                                                                "tile__lot tile__lot--red",
                                                            children: l(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        g ==
                                                                        "Ferm\xE9"
                                                                            ? "Ferm\xE9"
                                                                            : `${g.days}d-${g.hours}
                                            h-${g.minutes}m-
                                            ${g.seconds}s`,
                                                                }
                                                            ),
                                                        }),
                                                        d("small", {
                                                            children: [
                                                                "D\xE9but: ",
                                                                t.startDate,
                                                                " | 00H00",
                                                            ],
                                                        }),
                                                        l("br", {}),
                                                        d("small", {
                                                            children: [
                                                                "Fin: ",
                                                                t.endDate,
                                                                " | 00H00",
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("div", {
                                                    className:
                                                        "grid grid--3-btn",
                                                    children: [
                                                        l("input", {
                                                            type: "number",
                                                            onChange: C,
                                                            placeholder: o,
                                                        }),
                                                        l("a", {
                                                            className: "btn",
                                                            onClick: T,
                                                            style: {
                                                                pointerEvents:
                                                                    u >=
                                                                    parseFloat(
                                                                        t.reservePrice
                                                                    ) +
                                                                        0.5
                                                                        ? "auto"
                                                                        : "none",
                                                            },
                                                            children: "Miser",
                                                        }),
                                                        l("a", {
                                                            className: "btn",
                                                            onClick: O,
                                                            children: "Min",
                                                        }),
                                                    ],
                                                }),
                                                d("ul", {
                                                    children: [
                                                        l("li", {
                                                            children:
                                                                "Pays d'envoi : Royaume-Uni",
                                                        }),
                                                        l("li", {
                                                            children:
                                                                "Livraison internationale gratuite",
                                                        }),
                                                        l("li", {
                                                            children:
                                                                "Certification garantie",
                                                        }),
                                                    ],
                                                }),
                                                l("img", {
                                                    width: "150",
                                                    src: "/img/png/icone-payment.png",
                                                    alt: "icone options paiement",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            l("div", {
                className: "wrapper",
                children: d("section", {
                    children: [
                        d("div", {
                            className: "link wrapper--header ",
                            children: [
                                l("h2", {
                                    children: "Dans la m\xEAme cat\xE9gorie",
                                }),
                                l("a", {
                                    className: "link--border-blue",
                                    href: "#",
                                    children: "Tout\xA0afficher",
                                }),
                                l("img", {
                                    className: "icone-link-arrow",
                                    src: "/img/png/icone-link-arrow-blue.png",
                                    alt: "icone fleche link",
                                }),
                            ],
                        }),
                        d("div", {
                            className: "grid grid--5-second-var",
                            children: [
                                d("div", {
                                    className: "tile bg--tile",
                                    children: [
                                        d("div", {
                                            className: "tile__container",
                                            children: [
                                                d("div", {
                                                    children: [
                                                        d("p", {
                                                            className:
                                                                "tile__lot",
                                                            children: [
                                                                "Lot #",
                                                                l("strong", {
                                                                    children:
                                                                        "01",
                                                                }),
                                                            ],
                                                        }),
                                                        l("p", {
                                                            className:
                                                                "tile__lot tile__lot--red",
                                                            children: l(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "14d-8h-56m-2s",
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                l("img", {
                                                    className:
                                                        "icone-coup-coeur",
                                                    src: "/img/png/icone-coup-de-coeur.png",
                                                    alt: "icone coup de coeur lord",
                                                }),
                                            ],
                                        }),
                                        d("div", {
                                            className: "tile__wrapper",
                                            children: [
                                                l("div", {
                                                    className:
                                                        "tile__img-wrapper",
                                                    children: l("img", {
                                                        className: "tile__img",
                                                        src: "/img/jpg/encheres/timbre-1.jpg",
                                                        alt: "Image d'une ench\xE8re'",
                                                    }),
                                                }),
                                                l("h3", {
                                                    children:
                                                        "Gold Coast 115-27-LH",
                                                }),
                                                d("p", {
                                                    className: "tile__text",
                                                    children: [
                                                        "Mise courante | ",
                                                        l("span", {
                                                            children: "1 offre",
                                                        }),
                                                    ],
                                                }),
                                                l("span", {
                                                    children: "350.00$",
                                                }),
                                                l("p", {
                                                    className:
                                                        "tile__text-small",
                                                    children: l("small", {
                                                        children:
                                                            "derni\xE8re offre par user2022",
                                                    }),
                                                }),
                                                l("a", {
                                                    className: "btn tile__btn",
                                                    href: "enchere.html",
                                                    children: "Miser",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                d("div", {
                                    className: "tile bg--tile",
                                    children: [
                                        l("div", {
                                            className: "tile__container",
                                            children: d("div", {
                                                children: [
                                                    d("p", {
                                                        className: "tile__lot",
                                                        children: [
                                                            "Lot #",
                                                            l("strong", {
                                                                children: "102",
                                                            }),
                                                        ],
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__lot tile__lot--red",
                                                        children: l("strong", {
                                                            children:
                                                                "1d-7h-06m-28s",
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                        d("div", {
                                            className: "tile__wrapper",
                                            children: [
                                                l("div", {
                                                    className:
                                                        "tile__img-wrapper",
                                                    children: l("img", {
                                                        className: "tile__img",
                                                        src: "/img/jpg/encheres/timbre-2.jpg",
                                                        alt: "Image d'une ench\xE8re'",
                                                    }),
                                                }),
                                                l("h3", {
                                                    children:
                                                        "US California Scott #1",
                                                }),
                                                d("p", {
                                                    className: "tile__text",
                                                    children: [
                                                        "Mise courante | ",
                                                        l("span", {
                                                            children:
                                                                "5 offres",
                                                        }),
                                                    ],
                                                }),
                                                l("span", {
                                                    children: "259.00$",
                                                }),
                                                l("p", {
                                                    className:
                                                        "tile__text-small",
                                                    children: l("small", {
                                                        children:
                                                            "derni\xE8re offre par user2022",
                                                    }),
                                                }),
                                                l("a", {
                                                    className: "btn tile__btn",
                                                    href: "enchere.html",
                                                    children: "Miser",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                d("div", {
                                    className: "tile bg--tile",
                                    children: [
                                        l("div", {
                                            className: "tile__container",
                                            children: d("div", {
                                                children: [
                                                    d("p", {
                                                        className: "tile__lot",
                                                        children: [
                                                            "Lot #",
                                                            l("strong", {
                                                                children: "45",
                                                            }),
                                                        ],
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__lot tile__lot--red",
                                                        children: l("strong", {
                                                            children:
                                                                "9d-1h-40m-24s",
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                        d("div", {
                                            className: "tile__wrapper",
                                            children: [
                                                l("div", {
                                                    className:
                                                        "tile__img-wrapper",
                                                    children: l("img", {
                                                        className: "tile__img",
                                                        src: "/img/jpg/encheres/timbre-3.jpg",
                                                        alt: "Image d'une ench\xE8re",
                                                    }),
                                                }),
                                                l("h3", {
                                                    children:
                                                        "USA 1857 Scott #36 Used. Deep color",
                                                }),
                                                d("p", {
                                                    className: "tile__text",
                                                    children: [
                                                        "Mise courante | ",
                                                        l("span", {
                                                            children:
                                                                "10 offres",
                                                        }),
                                                    ],
                                                }),
                                                l("span", {
                                                    children: "79.00$",
                                                }),
                                                l("p", {
                                                    className:
                                                        "tile__text-small",
                                                    children: l("small", {
                                                        children:
                                                            "derni\xE8re offre par user2022",
                                                    }),
                                                }),
                                                l("a", {
                                                    className: "btn tile__btn",
                                                    href: "enchere.html",
                                                    children: "Miser",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                d("div", {
                                    className: "tile bg--tile",
                                    children: [
                                        d("div", {
                                            className: "tile__container",
                                            children: [
                                                d("div", {
                                                    children: [
                                                        d("p", {
                                                            className:
                                                                "tile__lot",
                                                            children: [
                                                                "Lot #",
                                                                l("strong", {
                                                                    children:
                                                                        "121",
                                                                }),
                                                            ],
                                                        }),
                                                        l("p", {
                                                            className:
                                                                "tile__lot tile__lot--red",
                                                            children: l(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "10h-50m-05s",
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                l("img", {
                                                    className:
                                                        "icone-coup-coeur",
                                                    src: "/img/png/icone-coup-de-coeur.png",
                                                    alt: "icone coup de coeur lord",
                                                }),
                                            ],
                                        }),
                                        d("div", {
                                            className: "tile__wrapper",
                                            children: [
                                                l("div", {
                                                    className:
                                                        "tile__img-wrapper",
                                                    children: l("img", {
                                                        className: "tile__img",
                                                        src: "/img/jpg/encheres/timbre-4.jpg",
                                                        alt: "Image d'une ench\xE8re",
                                                    }),
                                                }),
                                                l("h3", {
                                                    children:
                                                        "AFFORDABLE GENUINE SCOTT USED SET",
                                                }),
                                                d("p", {
                                                    className: "tile__text",
                                                    children: [
                                                        "Mise courante | ",
                                                        l("span", {
                                                            children:
                                                                "2 offres",
                                                        }),
                                                    ],
                                                }),
                                                l("span", {
                                                    children: "150.00$",
                                                }),
                                                l("p", {
                                                    className:
                                                        "tile__text-small",
                                                    children: l("small", {
                                                        children:
                                                            "derni\xE8re offre par user2022",
                                                    }),
                                                }),
                                                l("a", {
                                                    className: "btn tile__btn",
                                                    href: "enchere.html",
                                                    children: "Miser",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                d("div", {
                                    className: "tile bg--tile",
                                    children: [
                                        l("div", {
                                            className: "tile__container",
                                            children: d("div", {
                                                children: [
                                                    d("p", {
                                                        className: "tile__lot",
                                                        children: [
                                                            "Lot #",
                                                            l("strong", {
                                                                children: "67",
                                                            }),
                                                        ],
                                                    }),
                                                    l("p", {
                                                        className:
                                                            "tile__lot tile__lot--red",
                                                        children: l("strong", {
                                                            children:
                                                                "21d-11h-12m-11s",
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                        d("div", {
                                            className: "tile__wrapper",
                                            children: [
                                                l("div", {
                                                    className:
                                                        "tile__img-wrapper",
                                                    children: l("img", {
                                                        className: "tile__img",
                                                        src: "/img/jpg/encheres/timbre-5.jpg",
                                                        alt: "Image d'une ench\xE8re",
                                                    }),
                                                }),
                                                l("h3", {
                                                    children:
                                                        "Used 50\xA2 XF Well Centered GEM With PFC Graded",
                                                }),
                                                d("p", {
                                                    className: "tile__text",
                                                    children: [
                                                        "Mise courante | ",
                                                        l("span", {
                                                            children:
                                                                "Aucune offre",
                                                        }),
                                                    ],
                                                }),
                                                l("span", {
                                                    children: "10.00$",
                                                }),
                                                l("p", {
                                                    className:
                                                        "tile__text-small",
                                                    children: l("small", {
                                                        children:
                                                            "derni\xE8re offre par user2022",
                                                    }),
                                                }),
                                                l("a", {
                                                    className: "btn tile__btn",
                                                    href: "enchere.html",
                                                    children: "Miser",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}
document.getElementById("enchere") &&
    _t
        .createRoot(document.getElementById("enchere"))
        .render(l(un.StrictMode, { children: l(xN, {}) }));
function TN() {
    const [e, t] = I.exports.useState(10),
        [n, r] = I.exports.useState(10),
        [i, o] = I.exports.useState("2023-06-10"),
        [s, a] = I.exports.useState(0),
        [c, u] = I.exports.useState(""),
        [f, h] = I.exports.useState("Canada"),
        [v, y] = I.exports.useState("2023-06-10"),
        [_, E] = I.exports.useState("2023-06-17"),
        [P, m] = I.exports.useState("oui"),
        [p, g] = I.exports.useState("stampName"),
        [w, C] = I.exports.useState("2003-06-17"),
        [T, O] = I.exports.useState("2cm x 3cm"),
        [k, $] = I.exports.useState("Excellente"),
        [D, z] = I.exports.useState("Available"),
        [V, U] = I.exports.useState("Yes"),
        [le, de] = I.exports.useState(
            "Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
        ),
        [Q, oe] = I.exports.useState("Regular"),
        [S, L] = I.exports.useState("");
    I.exports.useEffect(() => {
        ae.get("/getUser").then((b) => {
            u(b.data.id);
        });
    }, []);
    const [M, K] = I.exports.useState(null);
    return l("div", {
        className: "container",
        children: d("div", {
            children: [
                l("div", {
                    className: "returnLogo",
                    children: l("a", {
                        href: "/home",
                        children: l("img", {
                            width: "200",
                            className: "returnImg",
                            src: "/img/png/logo.png",
                            alt: "logo Stampee",
                        }),
                    }),
                }),
                l("form", {
                    onSubmit: async (b) => {
                        b.preventDefault();
                        const q = {
                            country: f,
                            startingprice: e,
                            reservePrice: n,
                            bidTime: i,
                            auctionCount: s,
                            bidderId: c,
                            startDate: v,
                            endDate: _,
                            favorites: P,
                            name: p,
                            creationDate: w,
                            dimensions: T,
                            conditions: k,
                            status: D,
                            certified: V,
                            description: le,
                            imageURL: S,
                            type: Q,
                        };
                        if ((console.log(q), M)) {
                            const ee = new FormData();
                            ee.append("image", M);
                            try {
                                const Ce = await ae.post("/uploadImage", ee, {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                });
                                console.log(
                                    "\u4E0A\u4F20\u6210\u529F\uFF01",
                                    Ce.data
                                );
                            } catch (Ce) {
                                console.error(
                                    "\u4E0A\u4F20\u5931\u8D25\uFF01",
                                    Ce
                                );
                            }
                        }
                        console.log(q.imageURL),
                            ae.post("/uploadFormData", q).then((ee) => {
                                console.log(ee.data),
                                    (window.location.pathname = "/listePrive");
                            }),
                            console.log(q);
                    },
                    encType: "multipart/form-data",
                    children: d("div", {
                        className: "formContainer",
                        children: [
                            d("div", {
                                className: "box-container",
                                children: [
                                    d("div", {
                                        className: "formContainer--div",
                                        children: [
                                            l("input", {
                                                type: "hidden",
                                                id: "bidderId",
                                                value: c,
                                                onChange: (b) =>
                                                    u(b.target.value),
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "startDate",
                                                        children: "startDate:",
                                                    }),
                                                    l("input", {
                                                        type: "date",
                                                        id: "startDate",
                                                        value: v,
                                                        onChange: (b) =>
                                                            y(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "endDate",
                                                        children: "endDate:",
                                                    }),
                                                    l("input", {
                                                        type: "date",
                                                        id: "endDate",
                                                        value: _,
                                                        onChange: (b) =>
                                                            E(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "favorites",
                                                        children: "favorites:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "favorites",
                                                        value: P,
                                                        onChange: (b) =>
                                                            m(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "name",
                                                        children: "name:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "name",
                                                        value: p,
                                                        onChange: (b) =>
                                                            g(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "creationDate",
                                                        children:
                                                            "creationDate:",
                                                    }),
                                                    l("input", {
                                                        type: "date",
                                                        id: "creationDate",
                                                        value: w,
                                                        onChange: (b) =>
                                                            C(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "bidTime",
                                                        children: "bidTime:",
                                                    }),
                                                    l("input", {
                                                        type: "date",
                                                        id: "bidTime",
                                                        value: i,
                                                        onChange: (b) =>
                                                            o(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor:
                                                            "startingprice",
                                                        children:
                                                            "startingprice:",
                                                    }),
                                                    l("input", {
                                                        type: "number",
                                                        id: "startingprice",
                                                        value: e,
                                                        onChange: (b) =>
                                                            t(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "reservePrice",
                                                        children:
                                                            "reservePrice:",
                                                    }),
                                                    l("input", {
                                                        type: "number",
                                                        id: "reservePrice",
                                                        value: n,
                                                        onChange: (b) =>
                                                            r(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            l("div", {
                                                className: "form-group",
                                                children: l("input", {
                                                    type: "file",
                                                    onChange: (b) => {
                                                        K(b.target.files[0]),
                                                            L(
                                                                `\\img\\jpg\\encheres\\${b.target.files[0].name}`
                                                            );
                                                    },
                                                }),
                                            }),
                                        ],
                                    }),
                                    d("div", {
                                        className: "formContainer--div",
                                        children: [
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "dimensions",
                                                        children: "dimensions:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "dimensions",
                                                        value: T,
                                                        onChange: (b) =>
                                                            O(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "conditions",
                                                        children: "conditions:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "conditions",
                                                        value: k,
                                                        onChange: (b) =>
                                                            $(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "status",
                                                        children: "status:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "status",
                                                        value: D,
                                                        onChange: (b) =>
                                                            z(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "certified",
                                                        children: "certified:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "certified",
                                                        value: V,
                                                        onChange: (b) =>
                                                            U(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "type",
                                                        children: "type:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "type",
                                                        value: Q,
                                                        onChange: (b) =>
                                                            oe(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "auctionCount",
                                                        children:
                                                            "auctionCount:",
                                                    }),
                                                    l("input", {
                                                        type: "number",
                                                        id: "auctionCount",
                                                        value: s,
                                                        onChange: (b) =>
                                                            a(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "country",
                                                        children: "pays:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "country",
                                                        value: f,
                                                        onChange: (b) =>
                                                            h(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "type",
                                                        children: "Type:",
                                                    }),
                                                    l("input", {
                                                        type: "text",
                                                        id: "type",
                                                        value: Q,
                                                        onChange: (b) =>
                                                            h(b.target.value),
                                                    }),
                                                ],
                                            }),
                                            d("div", {
                                                className: "form-group",
                                                children: [
                                                    l("label", {
                                                        className: "labelForm",
                                                        htmlFor: "description",
                                                        children:
                                                            "description:",
                                                    }),
                                                    l("textarea", {
                                                        id: "description",
                                                        value: le,
                                                        onChange: (b) =>
                                                            de(b.target.value),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            l("button", {
                                className: "blue",
                                children: "Publier",
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
}
document.getElementById("publish") &&
    _t
        .createRoot(document.getElementById("publish"))
        .render(l(un.StrictMode, { children: l(TN, {}) }));
function AN() {
    const [e, t] = I.exports.useState([]),
        [n, r] = I.exports.useState([]),
        [i, o] = I.exports.useState(1),
        s = (S) => {
            o(S);
            const L = 10,
                M = (S - 1) * L,
                K = M + L,
                Y = e.slice(M, K);
            r(Y);
        },
        [a, c] = I.exports.useState(),
        u = a % 10 !== 0 ? a / 10 + 1 : a / 10;
    I.exports.useEffect(() => {
        ae.get("/getBidsPrive").then((S) => {
            r(S.data.slice(0, 10)), t(S.data);
        });
    }, []);
    const f = (S) => {
        console.log(S),
            ae.delete(`/deleteBid/${S.id}`).then((L) => {
                ae.get("/getBidsPrive").then((M) => {
                    r(M.data);
                });
            });
    };
    I.exports.useEffect(() => {
        ae.get("/getBidsPriveCount").then((S) => {
            c(S.data);
        });
    }, []);
    const [h, v] = I.exports.useState([]),
        y = (S) => {
            h.includes(S) ? v(h.filter((L) => L !== S)) : v([...h, S]);
        },
        [_, E] = I.exports.useState([]),
        P = (S) => {
            _.includes(S) ? E(_.filter((L) => L !== S)) : E([..._, S]);
        },
        [m, p] = I.exports.useState(0),
        [g, w] = I.exports.useState(0),
        C = (S) => {
            p(parseInt(S.target.value));
        },
        T = (S) => {
            w(parseInt(S.target.value));
        },
        [O, k] = I.exports.useState(1900),
        [$, D] = I.exports.useState(2023),
        z = (S) => {
            isNaN(parseInt(S.target.value))
                ? k(1900)
                : k(parseInt(S.target.value));
        },
        V = (S) => {
            D(parseInt(S.target.value));
        },
        [U, le] = I.exports.useState(""),
        de = (S) => {
            le(S.target.value);
        },
        Q = (S) => {
            S.preventDefault(),
                v([]),
                E([]),
                ae.get("/getBidsPrive").then((L) => {
                    console.log(L.data), r(L.data.slice(0, 10));
                }),
                le("Tous les pays");
        },
        oe = (S) => {
            S.preventDefault(), console.log("1");
            const L = {
                selectedCategoriesConditions: h,
                selectedCategoriesTypes: _,
                minAnnee: O,
                maxAnnee: $,
                minPrix: m,
                maxPrix: g,
                selectedOption: U,
            };
            ae.post("/enchere/filterPrive", L).then((M) => {
                console.log(
                    "\u8FD9\u662F\u540E\u7AEF\u8FD4\u56DE\u6765\u7684\u6570\u636E",
                    M.data
                ),
                    r(M.data);
            });
        };
    return d("div", {
        children: [
            l("div", {
                className: "hero hero--page-interieure",
                children: d("div", {
                    className: "wrapper",
                    children: [
                        l("h1", {
                            className: "hero__text",
                            children: "Parcourez nos ench\xE8res",
                        }),
                        l("h2", {
                            className: "hero__text--sous-titre",
                            children: "Trouvez la perle rare",
                        }),
                        l("a", {
                            className: "btn",
                            href: "#",
                            children: "Fonctionnement",
                        }),
                        l("a", {
                            className: "btn",
                            href: "#",
                            children: "Certification",
                        }),
                    ],
                }),
            }),
            l("div", {
                className: "menu-secondaire",
                children: d("div", {
                    className: "wrapper wrapper--menu-secondaire",
                    children: [
                        d("ul", {
                            className: "menu-secondaire__container",
                            children: [
                                l("li", {
                                    className:
                                        "menu__item menu__item--principal",
                                    children: l("a", {
                                        className: "menu__link",
                                        href: "#",
                                        children: "En cours",
                                    }),
                                }),
                                l("li", {
                                    className:
                                        "menu__item menu__item--principal",
                                    children: l("a", {
                                        className: "menu__link",
                                        href: "#",
                                        children: "Archive",
                                    }),
                                }),
                            ],
                        }),
                        d("select", {
                            className: "menu-secondaire__select",
                            "aria-label": "select-sort-order",
                            defaultValue: "Trier",
                            children: [
                                l("option", {
                                    disabled: !0,
                                    children: "Trier",
                                }),
                                l("option", {
                                    value: "tous",
                                    children: "Tous",
                                }),
                                l("option", {
                                    value: "decroissant",
                                    children: "Prix d\xE9croissant",
                                }),
                                l("option", {
                                    value: "croissant",
                                    children: "Prix croissant",
                                }),
                                l("option", {
                                    value: "popularite",
                                    children: "Par popularit\xE9",
                                }),
                                l("option", {
                                    value: "nouvellement-liste",
                                    children: "Nouvellement list\xE9e",
                                }),
                                l("option", {
                                    value: "termine-bientot",
                                    children: "Se terminant bient\xF4t",
                                }),
                            ],
                        }),
                        d("div", {
                            className: "wrapper--header menu-secondaire__icone",
                            children: [
                                l("div", {
                                    className: "btn",
                                    children: l("img", {
                                        src: "/img/png/icone-gallery-1.png",
                                        alt: "gallerie vertical",
                                    }),
                                }),
                                l("div", {
                                    className: "btn",
                                    children: l("img", {
                                        src: "/img/png/icone-gallery-2.png",
                                        alt: "gallerie horizontal",
                                    }),
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            l(Ni, {
                currentPage: i,
                totalPages: u,
                onPageChange: s,
                changeClass: "true",
            }),
            d("div", {
                className: "wrapper gallery",
                children: [
                    d("div", {
                        className: "wrapper--header",
                        children: [
                            d("div", {
                                className: "search-bar search-bar--desktop",
                                children: [
                                    l("h2", {
                                        children: "Recherche Avanc\xE9e",
                                    }),
                                    d("form", {
                                        method: "GET",
                                        children: [
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children: "Condition",
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    h.includes(
                                                                        "Parfaite"
                                                                    ),
                                                                onChange: () =>
                                                                    y(
                                                                        "Parfaite"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Parfaite",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    h.includes(
                                                                        "Excellente"
                                                                    ),
                                                                onChange: () =>
                                                                    y(
                                                                        "Excellente"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Excellente",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    h.includes(
                                                                        "Bonne"
                                                                    ),
                                                                onChange: () =>
                                                                    y("Bonne"),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Bonne",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    h.includes(
                                                                        "Moyenne"
                                                                    ),
                                                                onChange: () =>
                                                                    y(
                                                                        "Moyenne"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Moyenne",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    h.includes(
                                                                        "Endommag\xE9"
                                                                    ),
                                                                onChange: () =>
                                                                    y(
                                                                        "Endommag\xE9"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Endommag\xE9",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children:
                                                            "Pays d'origine",
                                                    }),
                                                    d("select", {
                                                        "aria-label":
                                                            "select-country",
                                                        value: U,
                                                        onChange: de,
                                                        children: [
                                                            l("option", {
                                                                defaultValue:
                                                                    !0,
                                                                value: "tous",
                                                                children:
                                                                    "Tous les pays",
                                                            }),
                                                            l("option", {
                                                                value: "royaume-uni",
                                                                children:
                                                                    "Royaume-Uni",
                                                            }),
                                                            l("option", {
                                                                value: "etats-unis",
                                                                children:
                                                                    "\xC9tats-unis",
                                                            }),
                                                            l("option", {
                                                                value: "canada",
                                                                children:
                                                                    "Canada",
                                                            }),
                                                            l("option", {
                                                                value: "australie",
                                                                children:
                                                                    "Australie",
                                                            }),
                                                            l("option", {
                                                                value: "chine",
                                                                children:
                                                                    "Chine",
                                                            }),
                                                            l("option", {
                                                                value: "france",
                                                                children:
                                                                    "France",
                                                            }),
                                                            l("option", {
                                                                value: "espagne",
                                                                children:
                                                                    "Espagne",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children: "Prix",
                                                    }),
                                                    d("div", {
                                                        className:
                                                            "wrapper--header",
                                                        children: [
                                                            d("div", {
                                                                className:
                                                                    "wrapper--header",
                                                                children: [
                                                                    l("input", {
                                                                        type: "number",
                                                                        placeholder:
                                                                            "00.00",
                                                                        value: m,
                                                                        onChange:
                                                                            C,
                                                                    }),
                                                                    l("span", {
                                                                        children:
                                                                            "$\xA0-",
                                                                    }),
                                                                ],
                                                            }),
                                                            d("div", {
                                                                className:
                                                                    "wrapper--header",
                                                                children: [
                                                                    l("input", {
                                                                        type: "number",
                                                                        "aria-label":
                                                                            "input-price",
                                                                        value: g,
                                                                        onChange:
                                                                            T,
                                                                    }),
                                                                    l("span", {
                                                                        children:
                                                                            "$",
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children: "Type",
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    _.includes(
                                                                        "G\xE9n\xE9ral"
                                                                    ),
                                                                onChange: () =>
                                                                    P(
                                                                        "G\xE9n\xE9ral"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "G\xE9n\xE9ral",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    _.includes(
                                                                        "Courrier A\xE9rien"
                                                                    ),
                                                                onChange: () =>
                                                                    P(
                                                                        "Courrier A\xE9rien"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Courrier A\xE9rien",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    _.includes(
                                                                        "Livret"
                                                                    ),
                                                                onChange: () =>
                                                                    P("Livret"),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Livret",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    _.includes(
                                                                        "Port d\xFB"
                                                                    ),
                                                                onChange: () =>
                                                                    P(
                                                                        "Port d\xFB"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Port d\xFB",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    _.includes(
                                                                        "Carte postale"
                                                                    ),
                                                                onChange: () =>
                                                                    P(
                                                                        "Carte postale"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Carte postale",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    _.includes(
                                                                        "Semi postal"
                                                                    ),
                                                                onChange: () =>
                                                                    P(
                                                                        "Semi postal"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Semi postal",
                                                            }),
                                                        ],
                                                    }),
                                                    d("div", {
                                                        children: [
                                                            l("input", {
                                                                type: "checkbox",
                                                                checked:
                                                                    _.includes(
                                                                        "Entier postal"
                                                                    ),
                                                                onChange: () =>
                                                                    P(
                                                                        "Entier postal"
                                                                    ),
                                                            }),
                                                            l("label", {
                                                                children:
                                                                    "Entier postal",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            d("section", {
                                                children: [
                                                    l("h3", {
                                                        children:
                                                            "Ann\xE9e d'\xE9mission",
                                                    }),
                                                    d("div", {
                                                        className:
                                                            "wrapper--header",
                                                        children: [
                                                            d("div", {
                                                                className:
                                                                    "wrapper--header",
                                                                children: [
                                                                    l("input", {
                                                                        type: "number",
                                                                        "aria-label":
                                                                            "input-year-min",
                                                                        value: O,
                                                                        onChange:
                                                                            z,
                                                                    }),
                                                                    l("span", {
                                                                        children:
                                                                            "-",
                                                                    }),
                                                                ],
                                                            }),
                                                            l("input", {
                                                                type: "number",
                                                                "aria-label":
                                                                    "input-year-max",
                                                                value: $,
                                                                onChange: V,
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            l("div", {
                                                className: "wrapper--header",
                                                children: d("div", {
                                                    className: "wrapperButton",
                                                    children: [
                                                        d("a", {
                                                            className:
                                                                "btn btn--text-icone default",
                                                            onClick: Q,
                                                            children: [
                                                                "Par d\xE9faut",
                                                                l("img", {
                                                                    width: "15",
                                                                    src: "/img/png/icone-round-arrow-orange.png",
                                                                    alt: "icone fleche par defaut",
                                                                }),
                                                            ],
                                                        }),
                                                        l("a", {
                                                            className:
                                                                "btn btn--text-icone",
                                                            href: "#",
                                                            onClick: oe,
                                                            children:
                                                                "Chercher",
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            d("aside", {
                                className:
                                    "menu__mobile menu--close menu__mobile--white",
                                "aria-label": "aside-search-close",
                                "data-js-search-bar": !0,
                                children: [
                                    l("div", {
                                        className: "menu__close--wrapper",
                                        "data-js-close-search-bar": !0,
                                        children: l("button", {
                                            className: "menu__close",
                                            "aria-label":
                                                "aside-search-close-btn",
                                        }),
                                    }),
                                    l("div", {
                                        className:
                                            "search-bar search-bar--mobile",
                                        children: d("form", {
                                            method: "GET",
                                            children: [
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Condition",
                                                        }),
                                                        d("select", {
                                                            "aria-label":
                                                                "select-condition",
                                                            children: [
                                                                l("option", {
                                                                    defaultValue:
                                                                        !0,
                                                                    value: "tous",
                                                                    children:
                                                                        "Tous",
                                                                }),
                                                                l("option", {
                                                                    value: "parfaite",
                                                                    children:
                                                                        "Parfaite",
                                                                }),
                                                                l("option", {
                                                                    value: "excellente",
                                                                    children:
                                                                        "excellente",
                                                                }),
                                                                l("option", {
                                                                    value: "bonne",
                                                                    children:
                                                                        "Bonne",
                                                                }),
                                                                l("option", {
                                                                    value: "moyenne",
                                                                    children:
                                                                        "Moyenne",
                                                                }),
                                                                l("option", {
                                                                    value: "endommage",
                                                                    children:
                                                                        "Endommag\xE9",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Pays d'origine",
                                                        }),
                                                        d("select", {
                                                            "aria-label":
                                                                "select-country",
                                                            value: U,
                                                            onChange: de,
                                                            children: [
                                                                l("option", {
                                                                    defaultValue:
                                                                        !0,
                                                                    value: "tous",
                                                                    children:
                                                                        "Tous les pays",
                                                                }),
                                                                l("option", {
                                                                    value: "royaume-uni",
                                                                    children:
                                                                        "Royaume-Uni",
                                                                }),
                                                                l("option", {
                                                                    value: "etats-unis",
                                                                    children:
                                                                        "\xC9tats-unis",
                                                                }),
                                                                l("option", {
                                                                    value: "canada",
                                                                    children:
                                                                        "Canada",
                                                                }),
                                                                l("option", {
                                                                    value: "australie",
                                                                    children:
                                                                        "Australie",
                                                                }),
                                                                l("option", {
                                                                    value: "chine",
                                                                    children:
                                                                        "Chine",
                                                                }),
                                                                l("option", {
                                                                    value: "france",
                                                                    children:
                                                                        "France",
                                                                }),
                                                                l("option", {
                                                                    value: "espagne",
                                                                    children:
                                                                        "Espagne",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children: "Prix",
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "wrapper--header",
                                                            children: [
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                name: "prix",
                                                                                placeholder:
                                                                                    "00.00",
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "$\xA0-",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                name: "prix",
                                                                                "aria-label":
                                                                                    "mobile-input-price",
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "$",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children: "Type",
                                                        }),
                                                        d("select", {
                                                            "aria-label":
                                                                "select-type",
                                                            children: [
                                                                l("option", {
                                                                    defaultValue:
                                                                        !0,
                                                                    value: "tous",
                                                                    children:
                                                                        "Tous",
                                                                }),
                                                                l("option", {
                                                                    value: "general",
                                                                    children:
                                                                        "G\xE9n\xE9ral",
                                                                }),
                                                                l("option", {
                                                                    value: "courier",
                                                                    children:
                                                                        "Courier",
                                                                }),
                                                                l("option", {
                                                                    value: "livret",
                                                                    children:
                                                                        "Livret",
                                                                }),
                                                                l("option", {
                                                                    value: "port-du",
                                                                    children:
                                                                        "Port d\xFB",
                                                                }),
                                                                l("option", {
                                                                    value: "carte-postale",
                                                                    children:
                                                                        "Carte postale",
                                                                }),
                                                                l("option", {
                                                                    value: "semi-postal",
                                                                    children:
                                                                        "Semi postal",
                                                                }),
                                                                l("option", {
                                                                    value: "entier-postal",
                                                                    children:
                                                                        "Entier postal",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Ann\xE9e d'\xE9mission",
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "wrapper--header",
                                                            children: [
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                "aria-label":
                                                                                    "input-year-min",
                                                                                value: O,
                                                                                onChange:
                                                                                    z,
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "-",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                l("input", {
                                                                    type: "number",
                                                                    "aria-label":
                                                                        "input-year-max",
                                                                    value: $,
                                                                    onChange: V,
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                d("section", {
                                                    children: [
                                                        l("h3", {
                                                            children:
                                                                "Dimensions (pouces)",
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "wrapper--header",
                                                            children: [
                                                                d("div", {
                                                                    className:
                                                                        "wrapper--header",
                                                                    children: [
                                                                        l(
                                                                            "input",
                                                                            {
                                                                                type: "number",
                                                                                name: "dimension",
                                                                                placeholder:
                                                                                    "00.00",
                                                                                "aria-label":
                                                                                    "mobile-input-dimension-height",
                                                                            }
                                                                        ),
                                                                        l(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    "-",
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                l("input", {
                                                                    type: "number",
                                                                    name: "dimension",
                                                                    "aria-label":
                                                                        "mobile-input-dimension-width",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                l("div", {
                                                    className:
                                                        "wrapper--header-mobile",
                                                    children: d("div", {
                                                        children: [
                                                            d("a", {
                                                                className:
                                                                    "btn btn--text-icone default",
                                                                onClick: Q,
                                                                children: [
                                                                    "Par d\xE9faut",
                                                                    l("img", {
                                                                        src: "/img/png/icone-round-arrow-orange.png",
                                                                        alt: "icone fleche par defaut",
                                                                    }),
                                                                ],
                                                            }),
                                                            l("a", {
                                                                className:
                                                                    "btn btn--text-icone",
                                                                href: "#",
                                                                onClick: oe,
                                                                children:
                                                                    "Chercher",
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                            d("div", {
                                className: "wrapper--gallery",
                                children: [
                                    l("p", {
                                        className: "gallery__text",
                                        children:
                                            "142 ench\xE8res trouv\xE9es | 0 - 20 de 142",
                                    }),
                                    l("div", {
                                        className: "grid grid--5-var",
                                        children: n.map((S) =>
                                            d(
                                                "div",
                                                {
                                                    className: "tile bg--tile",
                                                    children: [
                                                        d("div", {
                                                            className:
                                                                "tile__container",
                                                            children: [
                                                                d("div", {
                                                                    children: [
                                                                        d("p", {
                                                                            className:
                                                                                "tile__lot",
                                                                            children:
                                                                                [
                                                                                    "Lot #",
                                                                                    l(
                                                                                        "strong",
                                                                                        {
                                                                                            children:
                                                                                                S.id,
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }),
                                                                        l("p", {
                                                                            className:
                                                                                "tile__lot tile__lot--red",
                                                                            children:
                                                                                l(
                                                                                    "strong",
                                                                                    {
                                                                                        children:
                                                                                            "14d-8h-56m-2s",
                                                                                    }
                                                                                ),
                                                                        }),
                                                                    ],
                                                                }),
                                                                l("img", {
                                                                    className:
                                                                        "icone-coup-coeur",
                                                                    src: "/img/png/icone-coup-de-coeur.png",
                                                                    alt: "icone coup de coeur lord",
                                                                }),
                                                            ],
                                                        }),
                                                        d("div", {
                                                            className:
                                                                "tile__wrapper",
                                                            children: [
                                                                l("div", {
                                                                    className:
                                                                        "tile__img-wrapper",
                                                                    children: l(
                                                                        "a",
                                                                        {
                                                                            href: "enchere.html",
                                                                            children:
                                                                                l(
                                                                                    "img",
                                                                                    {
                                                                                        className:
                                                                                            "tile__img",
                                                                                        src: S.imageURL,
                                                                                        alt: "Image d'une ench\xE8re'",
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                }),
                                                                l("h3", {
                                                                    children:
                                                                        S.name,
                                                                }),
                                                                d("p", {
                                                                    className:
                                                                        "tile__text",
                                                                    children: [
                                                                        "Mise courante |",
                                                                        " ",
                                                                        d(
                                                                            "span",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        S.auctionCount,
                                                                                        "\xA0offre",
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                l("span", {
                                                                    children:
                                                                        "10.50$",
                                                                }),
                                                                l("p", {
                                                                    className:
                                                                        "tile__text-small",
                                                                    children: l(
                                                                        "small",
                                                                        {
                                                                            children:
                                                                                "derni\xE8re offre par user2022",
                                                                        }
                                                                    ),
                                                                }),
                                                                l("a", {
                                                                    className:
                                                                        "btn tile__btn",
                                                                    onClick:
                                                                        () => {
                                                                            f(
                                                                                S
                                                                            );
                                                                        },
                                                                    children:
                                                                        "Supprimer",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                },
                                                S.id
                                            )
                                        ),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    d("div", {
                        className: "wrapper--header-page",
                        children: [
                            l(Ni, {
                                currentPage: i,
                                totalPages: u,
                                onPageChange: s,
                                changeClass: "false",
                            }),
                            l("p", {
                                className: "gallery__text gallery__text--right",
                                children:
                                    "142 ench\xE8res trouv\xE9es | 0 - 20 de 142",
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
document.getElementById("listePrive") &&
    _t
        .createRoot(document.getElementById("listePrive"))
        .render(l(un.StrictMode, { children: l(AN, {}) }));
