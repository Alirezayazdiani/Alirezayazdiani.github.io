'use strict';
(function () {
  /** Active drag session shared across widgets (single window listeners). */
  var timelineDrag = null;

  function parseYmd(s) {
    var parts = String(s).split('-');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function clamp(n, lo, hi) {
    return Math.min(Math.max(n, lo), hi);
  }

  function formatRange(d0, d1) {
    var o = { year: 'numeric', month: 'short', day: 'numeric' };
    return d0.toLocaleDateString(undefined, o) + ' – ' + d1.toLocaleDateString(undefined, o);
  }

  /** Local calendar YYYY-MM-DD for inclusive comparisons */
  function toYmdLocal(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function startOfDayLocal(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function onTimelinePointerMove(ev) {
    if (!timelineDrag) return;
    ev.preventDefault();

    var ctx = timelineDrag.ctx;
    var pct = pctFromClientX(ctx.track, ev.clientX);
    var mw = minWidthPct(ctx.span);

    if (timelineDrag.type === 'left') {
      setRangeFromPct(ctx, clamp(pct, 0, ctx.endPct - mw), ctx.endPct);
    } else if (timelineDrag.type === 'right') {
      setRangeFromPct(ctx, ctx.startPct, clamp(pct, ctx.startPct + mw, 100));
    } else if (timelineDrag.type === 'pan') {
      var delta = pct - timelineDrag.originPct;
      var ns = timelineDrag.s0 + delta;
      var ne = timelineDrag.e0 + delta;
      if (ns < 0) {
        ne -= ns;
        ns = 0;
      }
      if (ne > 100) {
        ns -= ne - 100;
        ne = 100;
      }
      if (ne - ns >= mw) {
        ctx.startPct = ns;
        ctx.endPct = ne;
        applyBrush(ctx);
      }
    }
  }

  function onTimelinePointerEnd(ev) {
    if (!timelineDrag || ev.pointerId !== timelineDrag.pointerId) return;
    try {
      if (timelineDrag.el && timelineDrag.el.releasePointerCapture) {
        timelineDrag.el.releasePointerCapture(ev.pointerId);
      }
    } catch (_) {
      /* ignore */
    }
    timelineDrag = null;
    document.body.classList.remove('news-timeline-dragging');
  }

  function pctFromClientX(track, clientX) {
    var rect = track.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  /** Minimum brush width as % of track (avoid zero-width). */
  function minWidthPct(spanMs) {
    return clamp((30 * 86400000 * 100) / spanMs, 2, 45);
  }

  function setRangeFromPct(ctx, s, e) {
    var mw = minWidthPct(ctx.span);
    s = clamp(s, 0, 100 - mw);
    e = clamp(e, s + mw, 100);
    ctx.startPct = s;
    ctx.endPct = e;
    applyBrush(ctx);
  }

  function timeAtPct(ctx, pct) {
    return ctx.minT + (ctx.span * clamp(pct, 0, 100)) / 100;
  }

  function applyBrush(ctx) {
    var brush = ctx.brush,
      statusEl = ctx.statusEl,
      list = ctx.list,
      rows = ctx.rows;
    brush.style.left = ctx.startPct + '%';
    brush.style.width = ctx.endPct - ctx.startPct + '%';

    var d0 = new Date(timeAtPct(ctx, ctx.startPct));
    var d1 = new Date(timeAtPct(ctx, ctx.endPct));
    if (statusEl) statusEl.textContent = formatRange(startOfDayLocal(d0), startOfDayLocal(d1));

    var ymdMin = toYmdLocal(startOfDayLocal(d0));
    var ymdMax = toYmdLocal(startOfDayLocal(d1));

    var any = false;
    rows.forEach(function (tr) {
      var ymd = tr.getAttribute('data-news-date');
      var show = ymd >= ymdMin && ymd <= ymdMax;
      tr.style.display = show ? '' : 'none';
      if (show) any = true;
    });

    var empty = list.querySelector('.news-timeline-empty-state');
    if (empty) empty.hidden = any;
  }

  function initWidget(widget) {
    var track = widget.querySelector('.news-timeline-track');
    var brush = widget.querySelector('.news-timeline-brush');
    var statusEl = widget.querySelector('.news-timeline-status');
    var resetBtn = widget.querySelector('.news-timeline-reset');
    var list = widget.closest('.news')?.querySelector('#news-list') || document.getElementById('news-list');

    if (!track || !brush || !list) return;

    var rows = Array.prototype.slice.call(list.querySelectorAll('tr[data-news-date]'));
    if (rows.length === 0) {
      widget.hidden = true;
      return;
    }

    var dates = rows.map(function (r) {
      return parseYmd(r.getAttribute('data-news-date')).getTime();
    });
    var minT = Math.min.apply(null, dates);
    var maxT = Math.max.apply(null, dates);
    var span = Math.max(maxT - minT, 86400000);

    var ctx = {
      widget: widget,
      track: track,
      brush: brush,
      statusEl: statusEl,
      list: list,
      rows: rows,
      minT: minT,
      span: span,
      startPct: 0,
      endPct: 100,
    };

    brush.addEventListener(
      'keydown',
      function (ev) {
        var step = 2;
        if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') {
          setRangeFromPct(ctx, ctx.startPct - step, ctx.endPct - step);
          ev.preventDefault();
        } else if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') {
          setRangeFromPct(ctx, ctx.startPct + step, ctx.endPct + step);
          ev.preventDefault();
        }
      },
      true,
    );

    function beginDrag(kind, pointerId, el, extra) {
      timelineDrag = { type: kind, pointerId: pointerId, el: el, ctx: ctx };
      if (extra) Object.assign(timelineDrag, extra);
      document.body.classList.add('news-timeline-dragging');
    }

    widget
      .querySelector('.news-timeline-handle-l')
      .addEventListener('pointerdown', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        beginDrag('left', ev.pointerId, ev.target);
        ev.target.setPointerCapture(ev.pointerId);
      });

    widget
      .querySelector('.news-timeline-handle-r')
      .addEventListener('pointerdown', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        beginDrag('right', ev.pointerId, ev.target);
        ev.target.setPointerCapture(ev.pointerId);
      });

    widget.querySelector('.news-timeline-pan').addEventListener('pointerdown', function (ev) {
      ev.preventDefault();
      beginDrag('pan', ev.pointerId, ev.currentTarget, {
        originPct: pctFromClientX(track, ev.clientX),
        s0: ctx.startPct,
        e0: ctx.endPct,
      });
      ev.currentTarget.setPointerCapture(ev.pointerId);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        ctx.startPct = 0;
        ctx.endPct = 100;
        applyBrush(ctx);
      });
    }

    var rail = track.querySelector('.news-timeline-rail');
    if (rail) {
      rail.addEventListener('pointerdown', function (ev) {
        ev.preventDefault();
        var pct = pctFromClientX(track, ev.clientX);
        var mid = (ctx.startPct + ctx.endPct) / 2;
        var mw = minWidthPct(ctx.span);
        if (pct < mid) {
          setRangeFromPct(ctx, clamp(pct, 0, ctx.endPct - mw), ctx.endPct);
        } else {
          setRangeFromPct(ctx, ctx.startPct, clamp(pct, ctx.startPct + mw, 100));
        }
      });
    }

    applyBrush(ctx);
  }

  window.addEventListener('pointermove', onTimelinePointerMove, { passive: false });
  window.addEventListener('pointerup', onTimelinePointerEnd);
  window.addEventListener('pointercancel', onTimelinePointerEnd);

  function init() {
    document.querySelectorAll('[data-news-timeline-widget]').forEach(initWidget);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
