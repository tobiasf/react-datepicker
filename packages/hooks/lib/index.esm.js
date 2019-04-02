import {useMemo as e, useState as t, useCallback as r} from 'react'
var n = function(e) {
  var t = new Date(e.getTime()),
    r = t.getTimezoneOffset()
  return t.setSeconds(0, 0), 6e4 * r + (t.getTime() % 6e4)
}
var a = function(e) {
    return e instanceof Date
  },
  u = 36e5,
  o = 6e4,
  i = 2,
  s = /[T ]/,
  c = /:/,
  f = /^(\d{2})$/,
  d = [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/],
  l = /^(\d{4})/,
  g = [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/],
  v = /^-(\d{2})$/,
  D = /^-?(\d{3})$/,
  m = /^-?(\d{2})-?(\d{2})$/,
  h = /^-?W(\d{2})$/,
  y = /^-?W(\d{2})-?(\d{1})$/,
  M = /^(\d{2}([.,]\d*)?)$/,
  T = /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  p = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  S = /([Z+-].*)$/,
  Y = /^(Z)$/,
  w = /^([+-])(\d{2})$/,
  F = /^([+-])(\d{2}):?(\d{2})$/
function x(e, t, r) {
  ;(t = t || 0), (r = r || 0)
  var n = new Date(0)
  n.setUTCFullYear(e, 0, 4)
  var a = 7 * t + r + 1 - (n.getUTCDay() || 7)
  return n.setUTCDate(n.getUTCDate() + a), n
}
var b = function(e, t) {
  if (a(e)) return new Date(e.getTime())
  if ('string' != typeof e) return new Date(e)
  var r = (t || {}).additionalDigits
  r = null == r ? i : Number(r)
  var b = (function(e) {
      var t,
        r = {},
        n = e.split(s)
      if ((c.test(n[0]) ? ((r.date = null), (t = n[0])) : ((r.date = n[0]), (t = n[1])), t)) {
        var a = S.exec(t)
        a ? ((r.time = t.replace(a[1], '')), (r.timezone = a[1])) : (r.time = t)
      }
      return r
    })(e),
    H = (function(e, t) {
      var r,
        n = d[t],
        a = g[t]
      if ((r = l.exec(e) || a.exec(e))) {
        var u = r[1]
        return {year: parseInt(u, 10), restDateString: e.slice(u.length)}
      }
      if ((r = f.exec(e) || n.exec(e))) {
        var o = r[1]
        return {year: 100 * parseInt(o, 10), restDateString: e.slice(o.length)}
      }
      return {year: null}
    })(b.date, r),
    k = H.year,
    I = (function(e, t) {
      if (null === t) return null
      var r, n, a, u
      if (0 === e.length) return (n = new Date(0)).setUTCFullYear(t), n
      if ((r = v.exec(e)))
        return (n = new Date(0)), (a = parseInt(r[1], 10) - 1), n.setUTCFullYear(t, a), n
      if ((r = D.exec(e))) {
        n = new Date(0)
        var o = parseInt(r[1], 10)
        return n.setUTCFullYear(t, 0, o), n
      }
      if ((r = m.exec(e))) {
        ;(n = new Date(0)), (a = parseInt(r[1], 10) - 1)
        var i = parseInt(r[2], 10)
        return n.setUTCFullYear(t, a, i), n
      }
      if ((r = h.exec(e))) return (u = parseInt(r[1], 10) - 1), x(t, u)
      if ((r = y.exec(e))) {
        u = parseInt(r[1], 10) - 1
        var s = parseInt(r[2], 10) - 1
        return x(t, u, s)
      }
      return null
    })(H.restDateString, k)
  if (I) {
    var O,
      $ = I.getTime(),
      W = 0
    if (
      (b.time &&
        (W = (function(e) {
          var t, r, n
          if ((t = M.exec(e))) return ((r = parseFloat(t[1].replace(',', '.'))) % 24) * u
          if ((t = T.exec(e)))
            return (
              (r = parseInt(t[1], 10)),
              (n = parseFloat(t[2].replace(',', '.'))),
              (r % 24) * u + n * o
            )
          if ((t = p.exec(e))) {
            ;(r = parseInt(t[1], 10)), (n = parseInt(t[2], 10))
            var a = parseFloat(t[3].replace(',', '.'))
            return (r % 24) * u + n * o + 1e3 * a
          }
          return null
        })(b.time)),
      b.timezone)
    )
      (z = b.timezone),
        (O =
          ((C = Y.exec(z))
            ? 0
            : (C = w.exec(z))
            ? ((X = 60 * parseInt(C[2], 10)), '+' === C[1] ? -X : X)
            : (C = F.exec(z))
            ? ((X = 60 * parseInt(C[2], 10) + parseInt(C[3], 10)), '+' === C[1] ? -X : X)
            : 0) * o)
    else {
      var A = $ + W,
        E = new Date(A)
      O = n(E)
      var G = new Date(A)
      G.setDate(E.getDate() + 1)
      var N = n(G) - n(E)
      N > 0 && (O += N)
    }
    return new Date($ + W + O)
  }
  var z, C, X
  return new Date(e)
}
var H = function(e) {
  var t = b(e),
    r = new Date(0)
  return r.setFullYear(t.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r
}
var k = function(e) {
    var t = b(e)
    return t.setHours(0, 0, 0, 0), t
  },
  I = 6e4,
  O = 864e5
var $ = function(e, t) {
  var r = k(e),
    n = k(t),
    a = r.getTime() - r.getTimezoneOffset() * I,
    u = n.getTime() - n.getTimezoneOffset() * I
  return Math.round((a - u) / O)
}
var W = function(e) {
  var t = b(e)
  return $(t, H(t)) + 1
}
var A = function(e, t) {
  var r = (t && Number(t.weekStartsOn)) || 0,
    n = b(e),
    a = n.getDay(),
    u = (a < r ? 7 : 0) + a - r
  return n.setDate(n.getDate() - u), n.setHours(0, 0, 0, 0), n
}
var E = function(e) {
  return A(e, {weekStartsOn: 1})
}
var G = function(e) {
  var t = b(e),
    r = t.getFullYear(),
    n = new Date(0)
  n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0)
  var a = E(n),
    u = new Date(0)
  u.setFullYear(r, 0, 4), u.setHours(0, 0, 0, 0)
  var o = E(u)
  return t.getTime() >= a.getTime() ? r + 1 : t.getTime() >= o.getTime() ? r : r - 1
}
var N = function(e) {
    var t = G(e),
      r = new Date(0)
    return r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), E(r)
  },
  z = 6048e5
var C = function(e) {
  var t = b(e),
    r = E(t).getTime() - N(t).getTime()
  return Math.round(r / z) + 1
}
var X = function(e) {
  if (a(e)) return !isNaN(e)
  throw new TypeError(toString.call(e) + ' is not an instance of Date')
}
var Z = [
  'M',
  'MM',
  'Q',
  'D',
  'DD',
  'DDD',
  'DDDD',
  'd',
  'E',
  'W',
  'WW',
  'YY',
  'YYYY',
  'GG',
  'GGGG',
  'H',
  'HH',
  'h',
  'hh',
  'm',
  'mm',
  's',
  'ss',
  'S',
  'SS',
  'SSS',
  'Z',
  'ZZ',
  'X',
  'x',
]
var U = function(e) {
  var t = []
  for (var r in e) e.hasOwnProperty(r) && t.push(r)
  var n = Z.concat(t)
    .sort()
    .reverse()
  return new RegExp('(\\[[^\\[]*\\])|(\\\\)?(' + n.join('|') + '|.)', 'g')
}
var J = function() {
    var e = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      t = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      r = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      n = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      a = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      u = ['AM', 'PM'],
      o = ['am', 'pm'],
      i = ['a.m.', 'p.m.'],
      s = {
        MMM: function(t) {
          return e[t.getMonth()]
        },
        MMMM: function(e) {
          return t[e.getMonth()]
        },
        dd: function(e) {
          return r[e.getDay()]
        },
        ddd: function(e) {
          return n[e.getDay()]
        },
        dddd: function(e) {
          return a[e.getDay()]
        },
        A: function(e) {
          return e.getHours() / 12 >= 1 ? u[1] : u[0]
        },
        a: function(e) {
          return e.getHours() / 12 >= 1 ? o[1] : o[0]
        },
        aa: function(e) {
          return e.getHours() / 12 >= 1 ? i[1] : i[0]
        },
      }
    return (
      ['M', 'D', 'DDD', 'd', 'Q', 'W'].forEach(function(e) {
        s[e + 'o'] = function(t, r) {
          return (function(e) {
            var t = e % 100
            if (t > 20 || t < 10)
              switch (t % 10) {
                case 1:
                  return e + 'st'
                case 2:
                  return e + 'nd'
                case 3:
                  return e + 'rd'
              }
            return e + 'th'
          })(r[e](t))
        }
      }),
      {formatters: s, formattingTokensRegExp: U(s)}
    )
  },
  R = {
    distanceInWords: (function() {
      var e = {
        lessThanXSeconds: {one: 'less than a second', other: 'less than {{count}} seconds'},
        xSeconds: {one: '1 second', other: '{{count}} seconds'},
        halfAMinute: 'half a minute',
        lessThanXMinutes: {one: 'less than a minute', other: 'less than {{count}} minutes'},
        xMinutes: {one: '1 minute', other: '{{count}} minutes'},
        aboutXHours: {one: 'about 1 hour', other: 'about {{count}} hours'},
        xHours: {one: '1 hour', other: '{{count}} hours'},
        xDays: {one: '1 day', other: '{{count}} days'},
        aboutXMonths: {one: 'about 1 month', other: 'about {{count}} months'},
        xMonths: {one: '1 month', other: '{{count}} months'},
        aboutXYears: {one: 'about 1 year', other: 'about {{count}} years'},
        xYears: {one: '1 year', other: '{{count}} years'},
        overXYears: {one: 'over 1 year', other: 'over {{count}} years'},
        almostXYears: {one: 'almost 1 year', other: 'almost {{count}} years'},
      }
      return {
        localize: function(t, r, n) {
          var a
          return (
            (n = n || {}),
            (a =
              'string' == typeof e[t]
                ? e[t]
                : 1 === r
                ? e[t].one
                : e[t].other.replace('{{count}}', r)),
            n.addSuffix ? (n.comparison > 0 ? 'in ' + a : a + ' ago') : a
          )
        },
      }
    })(),
    format: J(),
  }
var B = {
  M: function(e) {
    return e.getMonth() + 1
  },
  MM: function(e) {
    return Q(e.getMonth() + 1, 2)
  },
  Q: function(e) {
    return Math.ceil((e.getMonth() + 1) / 3)
  },
  D: function(e) {
    return e.getDate()
  },
  DD: function(e) {
    return Q(e.getDate(), 2)
  },
  DDD: function(e) {
    return W(e)
  },
  DDDD: function(e) {
    return Q(W(e), 3)
  },
  d: function(e) {
    return e.getDay()
  },
  E: function(e) {
    return e.getDay() || 7
  },
  W: function(e) {
    return C(e)
  },
  WW: function(e) {
    return Q(C(e), 2)
  },
  YY: function(e) {
    return Q(e.getFullYear(), 4).substr(2)
  },
  YYYY: function(e) {
    return Q(e.getFullYear(), 4)
  },
  GG: function(e) {
    return String(G(e)).substr(2)
  },
  GGGG: function(e) {
    return G(e)
  },
  H: function(e) {
    return e.getHours()
  },
  HH: function(e) {
    return Q(e.getHours(), 2)
  },
  h: function(e) {
    var t = e.getHours()
    return 0 === t ? 12 : t > 12 ? t % 12 : t
  },
  hh: function(e) {
    return Q(B.h(e), 2)
  },
  m: function(e) {
    return e.getMinutes()
  },
  mm: function(e) {
    return Q(e.getMinutes(), 2)
  },
  s: function(e) {
    return e.getSeconds()
  },
  ss: function(e) {
    return Q(e.getSeconds(), 2)
  },
  S: function(e) {
    return Math.floor(e.getMilliseconds() / 100)
  },
  SS: function(e) {
    return Q(Math.floor(e.getMilliseconds() / 10), 2)
  },
  SSS: function(e) {
    return Q(e.getMilliseconds(), 3)
  },
  Z: function(e) {
    return P(e.getTimezoneOffset(), ':')
  },
  ZZ: function(e) {
    return P(e.getTimezoneOffset())
  },
  X: function(e) {
    return Math.floor(e.getTime() / 1e3)
  },
  x: function(e) {
    return e.getTime()
  },
}
function P(e, t) {
  t = t || ''
  var r = e > 0 ? '-' : '+',
    n = Math.abs(e),
    a = n % 60
  return r + Q(Math.floor(n / 60), 2) + t + Q(a, 2)
}
function Q(e, t) {
  for (var r = Math.abs(e).toString(); r.length < t; ) r = '0' + r
  return r
}
var L = function(e, t, r) {
  var n = t ? String(t) : 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    a = (r || {}).locale,
    u = R.format.formatters,
    o = R.format.formattingTokensRegExp
  a &&
    a.format &&
    a.format.formatters &&
    ((u = a.format.formatters),
    a.format.formattingTokensRegExp && (o = a.format.formattingTokensRegExp))
  var i = b(e)
  return X(i)
    ? (function(e, t, r) {
        var n,
          a,
          u,
          o = e.match(r),
          i = o.length
        for (n = 0; n < i; n++)
          (a = t[o[n]] || B[o[n]]),
            (o[n] =
              a || ((u = o[n]).match(/\[[\s\S]/) ? u.replace(/^\[|]$/g, '') : u.replace(/\\/g, '')))
        return function(e) {
          for (var t = '', r = 0; r < i; r++)
            o[r] instanceof Function ? (t += o[r](e, B)) : (t += o[r])
          return t
        }
      })(n, u, o)(i)
    : 'Invalid Date'
}
var j = function(e, t) {
  var r = b(e),
    n = Number(t)
  return r.setDate(r.getDate() + n), r
}
var q = function(e, t, r) {
  var n = b(e),
    a = void 0 !== r ? r : 1,
    u = b(t).getTime()
  if (n.getTime() > u) throw new Error('The first date cannot be after the second date')
  var o = [],
    i = n
  for (i.setHours(0, 0, 0, 0); i.getTime() <= u; ) o.push(b(i)), i.setDate(i.getDate() + a)
  return o
}
var K = function(e) {
  var t = b(e),
    r = t.getMonth()
  return t.setFullYear(t.getFullYear(), r + 1, 0), t.setHours(23, 59, 59, 999), t
}
var V = function(e, t) {
  var r = (t && Number(t.weekStartsOn)) || 0,
    n = b(e),
    a = n.getDay(),
    u = 6 + (a < r ? -7 : 0) - (a - r)
  return n.setDate(n.getDate() + u), n.setHours(23, 59, 59, 999), n
}
var _ = function(e) {
  return b(e).getDay()
}
var ee = function(e) {
  var t = b(e)
  return t.setDate(1), t.setHours(0, 0, 0, 0), t
}
function te(e) {
  var t = void 0 === e ? {} : e,
    r = t.weekStartsOn,
    n = void 0 === r ? 1 : r,
    a = t.weekDayFormat,
    u =
      void 0 === a
        ? function(e) {
            return L(e, 'dd')
          }
        : a,
    o = new Date()
  return q(j(A(o), n), j(V(o), n)).reduce(function(e, t) {
    return e.push(u(t)), e
  }, [])
}
function re(e) {
  var t = e.year,
    r = e.month,
    n = e.weekStartsOn,
    a = void 0 === n ? 1 : n,
    u = e.dayFormat,
    o =
      void 0 === u
        ? function(e) {
            return L(e, 'DD')
          }
        : u,
    i = new Date(t, r),
    s = ee(i),
    c = _(s),
    f = K(i),
    d = Array.from(Array(c >= a ? c - a : a).keys()).fill(0),
    l = q(s, f).map(function(e) {
      return {date: e, day: o(e)}
    })
  return d.concat(l)
}
function ne(t) {
  var r = t.year,
    n = t.month,
    a = t.weekStartsOn,
    u = void 0 === a ? 1 : a,
    o = t.dayFormat,
    i =
      void 0 === o
        ? function(e) {
            return L(e, 'DD')
          }
        : o,
    s = t.weekDayFormat,
    c =
      void 0 === s
        ? function(e) {
            return L(e, 'dd')
          }
        : s,
    f = t.monthLabelFormat,
    d =
      void 0 === f
        ? function(e) {
            return L(e, 'MMMM YYYY')
          }
        : f
  return {
    days: e(
      function() {
        return re({year: r, month: n, weekStartsOn: u, dayFormat: i})
      },
      [r, n, u],
    ),
    weekDays: e(
      function() {
        return te({weekStartsOn: u, weekDayFormat: c})
      },
      [u],
    ),
    monthLabel: d(new Date(r, n)),
  }
}
var ae = function(e, t) {
  var r = b(e),
    n = b(t)
  return r.getTime() < n.getTime()
}
var ue = function(e, t) {
  var r = b(e),
    n = b(t)
  return r.getTime() > n.getTime()
}
var oe = function(e, t, r) {
  var n = b(e).getTime(),
    a = b(t).getTime(),
    u = b(r).getTime()
  if (a > u) throw new Error('The start of the range cannot be after the end of the range')
  return n >= a && n <= u
}
var ie = function(e, t) {
  var r = k(e),
    n = k(t)
  return r.getTime() === n.getTime()
}
var se = function(e) {
  return b(e).getFullYear()
}
var ce = function(e) {
  return b(e).getMonth()
}
var fe = function() {
  return k(new Date())
}
var de = function(e) {
  var t = b(e),
    r = t.getFullYear(),
    n = t.getMonth(),
    a = new Date(0)
  return a.setFullYear(r, n + 1, 0), a.setHours(0, 0, 0, 0), a.getDate()
}
var le = function(e, t) {
  var r = b(e),
    n = Number(t),
    a = r.getMonth() + n,
    u = new Date(0)
  u.setFullYear(r.getFullYear(), a, 1), u.setHours(0, 0, 0, 0)
  var o = de(u)
  return r.setMonth(a, Math.min(o, r.getDate())), r
}
function ge(e, t, r) {
  return !(!t || !r) && oe(e, t, r)
}
function ve(e, t, r) {
  return !!((t && ie(e, t)) || (r && ie(e, r)))
}
function De(e, t, r, n) {
  return !!((t && ae(e, t)) || (r && ue(e, r)) || (n && n(e)))
}
function me(e) {
  var t = ee(e)
  return {year: se(t), month: ce(t), date: t}
}
function he() {
  return me(fe())
}
function ye(e, t) {
  var r = t ? me(t) : he(),
    n = r.date,
    a = [r]
  return (
    e > 1 &&
      (a = Array.from(Array(e - 1).keys()).reduce(function(e) {
        return (n = le(e[e.length - 1].date, 1)), e.concat([me(n)])
      }, a)),
    a
  )
}
function Me(e, t, r) {
  var n = e[r > 0 ? e.length - 1 : 0].date
  return Array.from(Array(t).keys()).reduce(function(e) {
    return (n = le(n, r)), e.concat([me(n)])
  }, [])
}
function Te(e, t, r) {
  return e && 'string' == typeof t ? L(e, t) : e && 'function' == typeof t ? t(e) : r
}
var pe = 'startDate',
  Se = 'endDate'
function Ye(e) {
  var n = e.startDate,
    a = e.endDate,
    u = e.focusedInput,
    o = e.minBookingDate,
    i = e.maxBookingDate,
    s = e.onDateChange,
    c = e.numberOfMonths,
    f = void 0 === c ? 2 : c,
    d = e.firstDayOfWeek,
    l = void 0 === d ? 1 : d,
    g = t(function() {
      return ye(f, n)
    }),
    v = g[0],
    D = g[1],
    m = r(
      function(e) {
        return ge(e, n, a)
      },
      [n, a],
    ),
    h = r(
      function(e) {
        return ve(e, n, a)
      },
      [n, a],
    ),
    y = r(
      function(e) {
        return De(e, o, i)
      },
      [o, i],
    )
  return {
    firstDayOfWeek: l,
    activeMonths: v,
    isDateSelected: m,
    isStartOrEndDate: h,
    isDateBlocked: y,
    numberOfMonths: f,
    onResetDates: function() {
      s({startDate: null, endDate: null, focusedInput: pe})
    },
    onDaySelect: function(e) {
      ;(u === Se && n && ae(e, n)) || (u === pe && a && ue(e, a))
        ? s({endDate: null, startDate: e, focusedInput: Se})
        : u === pe
        ? s({endDate: a, startDate: e, focusedInput: Se})
        : u === Se && n && !ae(e, n) && s({startDate: n, endDate: e, focusedInput: null})
    },
    goToPreviousMonths: function() {
      D(Me(v, f, -1))
    },
    goToNextMonths: function() {
      D(Me(v, f, 1))
    },
  }
}
export {
  Se as END_DATE,
  pe as START_DATE,
  he as getCurrentYearMonthAndDate,
  me as getDateMonthAndYear,
  re as getDays,
  ye as getInitialMonths,
  Te as getInputValue,
  te as getWeekDays,
  De as isDateBlocked,
  ge as isDateSelected,
  ve as isStartOrEndDate,
  Ye as useDatepicker,
  ne as useMonth,
}
