/* Andrew Urquhart : Client-Side Request Object for javascript : http://andrewu.co.uk/tools/request/
COPYRIGHT:You are free to use this script for any use you wish if this comment is left intact. Feel free to enhance the script and send me the updated version. Please don't redistribute. This script is provided as is,with no warranty of any kind. Use it at your own risk. Copyright Andrew Urquhart; VERSION:#1.41 2007-06-28 18:10 UTC*/
function RObj(ea) {
    var LS = "";
    var QS = new Object();
    var un = "undefined";
    var x = null;
    var f = "function";
    var n = "number";
    var r = "string";
    var e1 = "ERROR:Index out of range in\r\nRequest.QueryString";
    var e2 = "ERROR:Wrong number of arguments or invalid property assignment\r\nRequest.QueryString";
    var e3 = "ERROR:Object doesn't support this property or method\r\nRequest.QueryString.Key";
    var dU = window.decodeURIComponent ? 1 : 0;
    function Err(arg) {
        if (ea) {
            alert("Request Object:\r\n" + arg)
        }
    }
    ;function URID(t) {
        var d = "";
        if (t) {
            for (var i = 0; i < t.length; ++i) {
                var c = t.charAt(i);
                d += (c == "+" ? " " : c)
            }
        }
        return (dU ? decodeURIComponent(d) : unescape(d))
    }
    ;function OL(o) {
        var l = 0;
        for (var i in o) {
            if (typeof o[i] != f) {
                l++
            }
        }
        ;return l
    }
    ;function AK(key) {
        var auk = true;
        for (var u in QS) {
            if (typeof QS[u] != f && u.toString().toLowerCase() == key.toLowerCase()) {
                auk = false;
                return u
            }
        }
        if (auk) {
            QS[key] = new Object();
            QS[key].toString = function() {
                return TS(QS[key])
            }
            ;
            QS[key].Count = function() {
                return OL(QS[key])
            }
            ;
            QS[key].Count.toString = function() {
                return OL(QS[key]).toString()
            }
            ;
            QS[key].Item = function(e) {
                if (typeof e == un) {
                    return QS[key]
                } else {
                    if (typeof e == n) {
                        var a = QS[key][Math.ceil(e)];
                        if (typeof a == un) {
                            Err(e1 + "(\"" + key + "\").Item(" + e + ")")
                        }
                        ;return a
                    } else {
                        Err("ERROR:Expecting numeric input in\r\nRequest.QueryString(\"" + key + "\").Item(\"" + e + "\")")
                    }
                }
            }
            ;
            QS[key].Item.toString = function(e) {
                if (typeof e == un) {
                    return QS[key].toString()
                } else {
                    var a = QS[key][e];
                    if (typeof a == un) {
                        Err(e1 + "(\"" + key + "\").Item(" + e + ")")
                    }
                    ;return a.toString()
                }
            }
            ;
            QS[key].Key = function(e) {
                var t = typeof e;
                if (t == r) {
                    var a = QS[key][e];
                    return (typeof a != un && a && a.toString() ? e : "")
                } else {
                    Err(e3 + "(" + (e ? e : "") + ")")
                }
            }
            ;
            QS[key].Key.toString = function() {
                return x
            }
        }
        ;return key
    }
    ;function AVTK(key, val) {
        if (key != "") {
            var key = AK(key);
            var l = OL(QS[key]);
            QS[key][l + 1] = val
        }
    }
    ;function TS(o) {
        var s = "";
        for (var i in o) {
            var ty = typeof o[i];
            if (ty == "object") {
                s += TS(o[i])
            } else if (ty != f) {
                s += o[i] + ", "
            }
        }
        ;var l = s.length;
        if (l > 1) {
            return (s.substring(0, l - 2))
        }
        return (s == "" ? x : s)
    }
    ;function KM(k, o) {
        var k = k.toLowerCase();
        for (var u in o) {
            if (typeof o[u] != f && u.toString().toLowerCase() == k) {
                return u
            }
        }
    }
    if (window.location && window.location.search) {
        LS = window.location.search;
        var l = LS.length;
        if (l > 0) {
            LS = LS.substring(1, l);
            var preAmpAt = 0;
            var ampAt = -1;
            var eqAt = -1;
            var k = 0;
            var skip = false;
            for (var i = 0; i < l; ++i) {
                var c = LS.charAt(i);
                if (LS.charAt(preAmpAt) == "=" || (preAmpAt == 0 && i == 0 && c == "=")) {
                    skip = true
                }
                if (c == "=" && eqAt == -1 && !skip) {
                    eqAt = i
                }
                if (c == "&" && ampAt == -1) {
                    if (eqAt != -1) {
                        ampAt = i
                    }
                    if (skip) {
                        preAmpAt = i + 1
                    }
                    ;skip = false
                }
                if (ampAt > eqAt) {
                    AVTK(URID(LS.substring(preAmpAt, eqAt)), URID(LS.substring(eqAt + 1, ampAt)));
                    preAmpAt = ampAt + 1;
                    eqAt = ampAt = -1;
                    ++k
                }
            }
            if (LS.charAt(preAmpAt) != "=" && (preAmpAt != 0 || i != 0 || c != "=")) {
                if (preAmpAt != l) {
                    if (eqAt != -1) {
                        AVTK(URID(LS.substring(preAmpAt, eqAt)), URID(LS.substring(eqAt + 1, l)))
                    } else if (preAmpAt != l - 1) {
                        AVTK(URID(LS.substring(preAmpAt, l)), "")
                    }
                }
                if (l == 1) {
                    AVTK(LS.substring(0, 1), "")
                }
            }
        }
    }
    ;var TC = OL(QS);
    if (!TC) {
        TC = 0
    }
    ;QS.toString = function() {
        return LS.toString()
    }
    ;
    QS.Count = function() {
        return (TC ? TC : 0)
    }
    ;
    QS.Count.toString = function() {
        return (TC ? TC.toString() : "0")
    }
    ;
    QS.Item = function(e) {
        if (typeof e == un) {
            return LS
        } else {
            if (typeof e == n) {
                var e = Math.ceil(e);
                var c = 0;
                for (var i in QS) {
                    if (typeof QS[i] != f && ++c == e) {
                        return QS[i]
                    }
                }
                ;Err(e1 + "().Item(" + e + ")")
            } else {
                return QS[KM(e, QS)]
            }
        }
        ;return x
    }
    ;
    QS.Item.toString = function() {
        return LS.toString()
    }
    ;
    QS.Key = function(e) {
        var t = typeof e;
        if (t == n) {
            var e = Math.ceil(e);
            var c = 0;
            for (var i in QS) {
                if (typeof QS[i] != f && ++c == e) {
                    return i
                }
            }
        } else if (t == r) {
            var e = KM(e, QS);
            var a = QS[e];
            return (typeof a != un && a && a.toString() ? e : "")
        } else {
            Err(e2 + "().Key(" + (e ? e : "") + ")")
        }
        ;Err(e1 + "().Item(" + e + ")")
    }
    ;
    QS.Key.toString = function() {
        Err(e2 + "().Key")
    }
    ;
    this.QueryString = function(k) {
        if (typeof k == un) {
            return QS
        } else {
            if (typeof k == n) {
                return QS.Item(k)
            }
            ;var k = KM(k, QS);
            if (typeof QS[k] == un) {
                t = new Object();
                t.Count = function() {
                    return 0
                }
                ;
                t.Count.toString = function() {
                    return "0"
                }
                ;
                t.toString = function() {
                    return x
                }
                ;
                t.Item = function(e) {
                    return x
                }
                ;
                t.Item.toString = function() {
                    return x
                }
                ;
                t.Key = function(e) {
                    Err(e3 + "(" + (e ? e : "") + ")")
                }
                ;
                t.Key.toString = function() {
                    return x
                }
                ;
                return t
            } else {
                return QS[k]
            }
        }
    }
    ;
    this.QueryString.toString = function() {
        return LS.toString()
    }
    ;
    this.QueryString.Count = function() {
        return (TC ? TC : 0)
    }
    ;
    this.QueryString.Count.toString = function() {
        return (TC ? TC.toString() : "0")
    }
    ;
    this.QueryString.Item = function(e) {
        if (typeof e == un) {
            return LS.toString()
        } else {
            if (typeof e == n) {
                var e = Math.ceil(e);
                var c = 0;
                for (var i in QS) {
                    if (typeof QS[i] != f && ++c == e) {
                        return QS[i]
                    }
                }
                ;Err(e1 + ".Item(" + e + ")")
            } else {
                return QS[KM(e, QS)]
            }
        }
        if (typeof e == n) {
            Err(e1 + ".Item(" + e + ")")
        }
        ;return x
    }
    ;
    this.QueryString.Item.toString = function() {
        return LS.toString()
    }
    ;
    this.QueryString.Key = function(e) {
        var t = typeof e;
        if (t == n) {
            var e = Math.ceil(e);
            var c = 0;
            for (var i in QS) {
                if (typeof QS[i] == "object" && (++c == e)) {
                    return i
                }
            }
        } else if (t == r) {
            var e = KM(e, QS);
            var a = QS[e];
            return (typeof a != un && a && a.toString() ? e : "")
        } else {
            Err(e2 + ".Key(" + (e ? e : "") + ")")
        }
        ;Err(e1 + ".Item(" + e + ")")
    }
    ;
    this.QueryString.Key.toString = function() {
        Err(e2 + ".Key")
    }
    ;
    this.Version = 1.4;
    this.Author = "Andrew Urquhart (http://andrewu.co.uk)"
}
;var Request = new RObj(false);
