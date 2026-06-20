(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // kodox-source.jsx
  var require_kodox_source = __commonJS({
    "kodox-source.jsx"() {
      var { useState, useRef, useEffect } = React;
      var today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      var fmt = (d) => {
        try {
          const x = new Date(d);
          return isNaN(x) ? "" : `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
        } catch (e) {
          return "";
        }
      };
      var addDays = (d, n) => {
        const r = new Date(d);
        r.setDate(r.getDate() + n);
        return r;
      };
      var diffDays = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
      var wkLabel = (d) => {
        const s = new Date(d), e = addDays(s, 6);
        return `${s.toLocaleDateString("en-US", { month: "short", day: "numeric" })} \u2013 ${e.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      };
      var uid = () => Date.now() + Math.floor(Math.random() * 99999);
      var todayStr = fmt(today);
      var $c = (amt) => "$" + Number(amt || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      var pct = (a, b) => b > 0 ? Math.min(100, Math.round(a / b * 100)) : 0;
      function guessTrade(t) {
        t = (t || "").toLowerCase();
        if (/concrete|pour|slab|footing|cmu|masonry/.test(t)) return "Concrete";
        if (/steel|erect|bolt|beam|column|struct/.test(t)) return "Steel";
        if (/frame|framing|stud|wood|lumber/.test(t)) return "Framing";
        if (/roof|tpo|membrane|shingle|flash/.test(t)) return "Roofing";
        if (/electric|conduit|panel|wire|light/.test(t)) return "Electrical";
        if (/plumb|pipe|drain|sanitary|domestic/.test(t)) return "Plumbing";
        if (/mech|hvac|duct|air handler/.test(t)) return "MEP";
        if (/drywall|gypsum|hang|tape|paint/.test(t)) return "Drywall";
        if (/site|grade|demo|excav|pave|earthwork/.test(t)) return "Sitework";
        if (/finish|tile|floor|carpet|millwork/.test(t)) return "Finishes";
        return "General";
      }
      function autoStatus(s, e, p) {
        if (!s) return "Not Started";
        const pn = Number(p) || 0;
        if (pn >= 100) return "Complete";
        if (e && /* @__PURE__ */ new Date(e + "T00:00:00") < today) return "Delayed";
        if (/* @__PURE__ */ new Date(s + "T00:00:00") > today) return "Not Started";
        return "On Track";
      }
      function excelDateToISO(v) {
        if (!v && v !== 0) return "";
        if (typeof v === "number") {
          if (v < 1) return "";
          const d2 = new Date(Date.UTC(1899, 11, 30) + v * 864e5);
          return d2.getUTCFullYear() + "-" + String(d2.getUTCMonth() + 1).padStart(2, "0") + "-" + String(d2.getUTCDate()).padStart(2, "0");
        }
        const s = String(v).trim();
        if (!s) return "";
        if (/^\d{5}$/.test(s)) {
          const n = Number(s);
          if (n > 59) {
            const d2 = new Date(Date.UTC(1899, 11, 30) + n * 864e5);
            return d2.getUTCFullYear() + "-" + String(d2.getUTCMonth() + 1).padStart(2, "0") + "-" + String(d2.getUTCDate()).padStart(2, "0");
          }
        }
        let m;
        m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (m) {
          const d2 = new Date(+m[1], +m[2] - 1, +m[3]);
          return isNaN(d2) ? "" : fmtP(d2);
        }
        m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (m) {
          const d2 = new Date(+m[3], +m[1] - 1, +m[2]);
          return isNaN(d2) ? "" : fmtP(d2);
        }
        m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
        if (m) {
          const d2 = new Date(+("20" + m[3]), +m[1] - 1, +m[2]);
          return isNaN(d2) ? "" : fmtP(d2);
        }
        m = s.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
        if (m) {
          const d2 = new Date(+m[1], +m[2] - 1, +m[3]);
          return isNaN(d2) ? "" : fmtP(d2);
        }
        m = s.match(/^(\d{1,2})[- ]([A-Za-z]{3,9})[- ](\d{2,4})$/);
        if (m) {
          const yr = m[3].length === 2 ? "20" + m[3] : m[3];
          const d2 = /* @__PURE__ */ new Date(m[2] + " " + m[1] + " " + yr);
          return isNaN(d2) ? "" : fmtP(d2);
        }
        m = s.match(/^(\d{4})(\d{2})(\d{2})$/);
        if (m) {
          const d2 = new Date(+m[1], +m[2] - 1, +m[3]);
          return isNaN(d2) ? "" : fmtP(d2);
        }
        const d = new Date(s);
        return isNaN(d) ? "" : fmtP(d);
      }
      function fmtP(d) {
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      }
      var SC = {
        "On Track": { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
        "At Risk": { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
        "Delayed": { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
        "Complete": { bg: "#e0e7ff", text: "#3730a3", dot: "#6366f1" },
        "Not Started": { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" },
        "Open": { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
        "In Review": { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
        "Approved": { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
        "Rejected": { bg: "#fce7f3", text: "#9d174d", dot: "#ec4899" },
        "Answered": { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
        "Pending": { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
        "Closed": { bg: "#e0e7ff", text: "#3730a3", dot: "#6366f1" },
        "Scheduled": { bg: "#e0e7ff", text: "#3730a3", dot: "#818cf8" },
        "Delivered": { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
        "Partial": { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
        "Cancelled": { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" },
        "Resolved": { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
        "Active": { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
        "On Rent": { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
        "Off Rent": { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" },
        "Reserved": { bg: "#e0e7ff", text: "#3730a3", dot: "#818cf8" },
        "Breakdown": { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
        "Over Budget": { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
        "Under Budget": { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
        "On Budget": { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" }
      };
      var TRADES = ["General", "Concrete", "Framing", "MEP", "Drywall", "Roofing", "Finishes", "Sitework", "Steel", "Electrical", "Plumbing", "Other"];
      var WEATHER = ["Clear", "Partly Cloudy", "Overcast", "Rain", "Heavy Rain", "Wind", "Snow", "Fog"];
      var PRIO = { High: { dot: "#ef4444", bg: "#fee2e2", text: "#991b1b" }, Medium: { dot: "#f59e0b", bg: "#fef3c7", text: "#92400e" }, Low: { dot: "#10b981", bg: "#d1fae5", text: "#065f46" } };
      var DELAY_TYPES = ["Weather", "Owner Decision", "Design Change", "Material Shortage", "Labor Shortage", "Subcontractor", "Inspection Hold", "RFI Pending", "Permit", "Differing Site Condition", "Force Majeure", "Other"];
      var EQUIP_TYPES = ["Crane", "Excavator", "Loader", "Forklift", "Boom Lift", "Scissor Lift", "Telehandler", "Compactor", "Generator", "Pump", "Concrete Pump", "Man Lift", "Skid Steer", "Bulldozer", "Grader", "Dump Truck", "Concrete Mixer", "Compressor", "Welder", "Light Tower", "Other"];
      var COST_CATEGORIES = ["Labor", "Materials", "Subcontractor", "Equipment", "General Conditions", "Overhead", "Contingency", "Other"];
      var STORE = "fieldos_v4";
      var loadStore = () => {
        try {
          const r = localStorage.getItem(STORE);
          return r ? JSON.parse(r) : null;
        } catch (e) {
          return null;
        }
      };
      var saveStore = (d) => {
        try {
          localStorage.setItem(STORE, JSON.stringify(d));
        } catch (e) {
        }
      };
      function usePersist(key, seed) {
        const st = loadStore();
        const [val, setVal] = useState(st && st[key] !== void 0 ? st[key] : seed);
        return [val, setVal];
      }
      var toCSV = (rows, cols) => [cols.join(","), ...rows.map((r) => cols.map((c) => `"${String(r[c] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
      var dlCSV = (csv, fn) => {
        const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })), download: fn });
        a.click();
      };
      var REPORT_COLORS = {
        headerBg: "#1c2333",
        headerText: "#ffffff",
        subBg: "#2d3748",
        subText: "#e2e8f0",
        accent: "#4a90a4",
        // muted steel blue
        accentLight: "#e8f4f8",
        colHead: "#f0f4f7",
        colText: "#374151",
        border: "#d1d8e0",
        rowAlt: "#f8fafc",
        rowNorm: "#ffffff",
        textMuted: "#6b7280",
        green: "#276749",
        greenBg: "#f0fff4",
        red: "#9b2335",
        redBg: "#fff5f5",
        orange: "#92400e",
        orangeBg: "#fffbeb",
        purple: "#5b21b6",
        purpleBg: "#f5f3ff"
      };
      function statusStyle(status) {
        const map = {
          "On Track": { bg: "#f0fff4", color: "#276749", border: "#c6f6d5" },
          "Complete": { bg: "#ebf8ff", color: "#2c5282", border: "#bee3f8" },
          "Approved": { bg: "#f0fff4", color: "#276749", border: "#c6f6d5" },
          "Delivered": { bg: "#f0fff4", color: "#276749", border: "#c6f6d5" },
          "Answered": { bg: "#f0fff4", color: "#276749", border: "#c6f6d5" },
          "Resolved": { bg: "#f0fff4", color: "#276749", border: "#c6f6d5" },
          "On Rent": { bg: "#f0fff4", color: "#276749", border: "#c6f6d5" },
          "At Risk": { bg: "#fffbeb", color: "#92400e", border: "#fef3c7" },
          "Pending": { bg: "#fffbeb", color: "#92400e", border: "#fef3c7" },
          "In Review": { bg: "#fffbeb", color: "#92400e", border: "#fef3c7" },
          "Partial": { bg: "#fffbeb", color: "#92400e", border: "#fef3c7" },
          "Delayed": { bg: "#fff5f5", color: "#9b2335", border: "#fed7d7" },
          "Open": { bg: "#fff5f5", color: "#9b2335", border: "#fed7d7" },
          "Rejected": { bg: "#fff5f5", color: "#9b2335", border: "#fed7d7" },
          "Active": { bg: "#fff5f5", color: "#9b2335", border: "#fed7d7" },
          "Breakdown": { bg: "#fff5f5", color: "#9b2335", border: "#fed7d7" },
          "Closed": { bg: "#f5f3ff", color: "#5b21b6", border: "#e9d5ff" },
          "Not Started": { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb" },
          "Cancelled": { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb" },
          "Off Rent": { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb" }
        };
        const s = map[status] || { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb" };
        return `background:${s.bg};color:${s.color};border:1px solid ${s.border};padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;white-space:nowrap;`;
      }
      function priorityStyle(p) {
        if (p === "High") return "background:#fff5f5;color:#9b2335;border:1px solid #fed7d7;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;";
        if (p === "Medium") return "background:#fffbeb;color:#92400e;border:1px solid #fef3c7;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;";
        return "background:#f0fff4;color:#276749;border:1px solid #c6f6d5;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;";
      }
      function buildReport({ title, subtitle, reportDate, sections, summaryCards, companyName: companyName2 }) {
        const co = companyName2 || "BuildCo Construction";
        const dt = reportDate || (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        const cardsHTML = summaryCards && summaryCards.length ? `
    <div style="display:grid;grid-template-columns:repeat(${Math.min(summaryCards.length, 4)},1fr);gap:12px;margin-bottom:24px;">
      ${summaryCards.map((c) => `
        <div style="background:#ffffff;border:1px solid ${REPORT_COLORS.border};border-radius:6px;padding:14px 16px;border-top:3px solid ${REPORT_COLORS.accent};">
          <div style="font-size:10px;color:${REPORT_COLORS.textMuted};font-weight:700;letter-spacing:.8px;margin-bottom:6px;text-transform:uppercase;">${c.label}</div>
          <div style="font-size:22px;font-weight:700;color:${REPORT_COLORS.headerBg};font-family:'Courier New',monospace;">${c.value}</div>
          ${c.sub ? `<div style="font-size:11px;color:${REPORT_COLORS.textMuted};margin-top:3px;">${c.sub}</div>` : ""}
        </div>
      `).join("")}
    </div>` : "";
        const sectionsHTML = sections.map((sec) => {
          if (!sec.rows || !sec.rows.length) return `
      <div style="margin-bottom:24px;">
        <div style="font-size:13px;font-weight:700;color:${REPORT_COLORS.headerBg};border-bottom:2px solid ${REPORT_COLORS.accent};padding-bottom:6px;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px;">${sec.title}</div>
        <div style="padding:20px;text-align:center;color:${REPORT_COLORS.textMuted};font-size:12px;border:1px solid ${REPORT_COLORS.border};border-radius:4px;">No records found.</div>
      </div>`;
          const theadCells = sec.cols.map(
            (c) => `<th style="padding:9px 12px;text-align:left;background:${REPORT_COLORS.colHead};color:${REPORT_COLORS.colText};font-size:10px;font-weight:700;letter-spacing:.6px;border-bottom:2px solid ${REPORT_COLORS.border};white-space:nowrap;text-transform:uppercase;">${c.label}</th>`
          ).join("");
          const tbodyRows = sec.rows.map((row, ri) => {
            const cells = sec.cols.map((col) => {
              let val = row[col.key] ?? "";
              let cellStyle = `padding:8px 12px;font-size:12px;color:${REPORT_COLORS.colText};border-bottom:1px solid ${REPORT_COLORS.border};vertical-align:middle;`;
              let inner = String(val);
              if (col.type === "status") {
                inner = `<span style="${statusStyle(val)}">${val || "\u2014"}</span>`;
              } else if (col.type === "priority") {
                inner = `<span style="${priorityStyle(val)}">${val || "\u2014"}</span>`;
              } else if (col.type === "currency") {
                inner = `<span style="font-family:'Courier New',monospace;font-weight:600;">${val ? "$" + Number(val).toLocaleString("en-US", { minimumFractionDigits: 2 }) : "\u2014"}</span>`;
              } else if (col.type === "variance") {
                const n = Number(val) || 0;
                const color = n >= 0 ? REPORT_COLORS.green : REPORT_COLORS.red;
                inner = `<span style="font-family:'Courier New',monospace;font-weight:700;color:${color};">${n >= 0 ? "+" : ""}${n >= 0 ? "$" : "\u2212$"}${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>`;
              } else if (col.type === "pct") {
                const n = Number(val) || 0;
                inner = `<div style="display:flex;align-items:center;gap:8px;">
            <div style="width:60px;background:#e5e7eb;border-radius:3px;height:6px;overflow:hidden;">
              <div style="width:${Math.min(100, n)}%;height:100%;background:${n >= 100 ? REPORT_COLORS.green : REPORT_COLORS.accent};border-radius:3px;"></div>
            </div>
            <span style="font-size:11px;font-weight:600;color:${REPORT_COLORS.colText};">${n}%</span>
          </div>`;
              } else if (col.type === "date") {
                inner = val ? `<span style="font-family:'Courier New',monospace;font-size:11px;color:${REPORT_COLORS.textMuted};">${val}</span>` : "\u2014";
              } else if (col.type === "overdue") {
                const isOverdue = val && val < (/* @__PURE__ */ new Date()).toISOString().split("T")[0] && row.status !== "Complete" && row.status !== "Closed" && row.status !== "Resolved";
                inner = val ? `<span style="font-family:'Courier New',monospace;font-size:11px;color:${isOverdue ? "#9b2335" : "#374151"};font-weight:${isOverdue ? 700 : 400};">${val}${isOverdue ? " \u26A0" : ""}</span>` : "\u2014";
              } else if (col.type === "bold") {
                inner = `<strong style="color:${REPORT_COLORS.headerBg};">${val || "\u2014"}</strong>`;
              } else if (col.type === "mono") {
                inner = `<span style="font-family:'Courier New',monospace;font-size:11px;">${val || "\u2014"}</span>`;
              } else if (col.type === "notice") {
                const color = val === "Yes" ? REPORT_COLORS.green : val === "Pending" ? "#92400e" : REPORT_COLORS.red;
                inner = val ? `<span style="font-weight:600;color:${color};">${val}</span>` : "\u2014";
              }
              if (!inner || inner === "") inner = `<span style="color:${REPORT_COLORS.textMuted};">\u2014</span>`;
              return `<td style="${cellStyle}">${inner}</td>`;
            }).join("");
            const bg = ri % 2 === 0 ? REPORT_COLORS.rowNorm : REPORT_COLORS.rowAlt;
            return `<tr style="background:${bg};">${cells}</tr>`;
          }).join("");
          return `
      <div style="margin-bottom:28px;">
        <div style="font-size:12px;font-weight:700;color:${REPORT_COLORS.headerBg};border-bottom:2px solid ${REPORT_COLORS.accent};padding-bottom:7px;margin-bottom:0;text-transform:uppercase;letter-spacing:.6px;">${sec.title} <span style="font-weight:400;color:${REPORT_COLORS.textMuted};font-size:11px;">(${sec.rows.length} record${sec.rows.length !== 1 ? "s" : ""})</span></div>
        <div style="overflow-x:auto;border:1px solid ${REPORT_COLORS.border};border-top:none;border-radius:0 0 5px 5px;">
          <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
            <thead><tr>${theadCells}</tr></thead>
            <tbody>${tbodyRows}</tbody>
          </table>
        </div>
        ${sec.note ? `<div style="margin-top:6px;font-size:10px;color:${REPORT_COLORS.textMuted};font-style:italic;">* ${sec.note}</div>` : ""}
      </div>`;
        }).join("");
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${title} \u2013 ${dt}</title>
<link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAABkwUlEQVR4nO19d3gdxfX2e2Zm9xY1y924YkwzHdMD2KImlEAIEqlASLAJCZAQfl9ICJEvIb1BQolND4QEiZpQA8YWEMBg0zEdbGxsq3fdu7szc74/ZvdaGEy1SJD1Po8sS7p32z1n5tT3AEMYwqYHAoCTTjqpTPy3r2QIQ/hvYkgBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJY0gBhrBJYzApADEzMbPo/1W73s/v91VbWysQTxAZKNTV1ckPc03v9bX+sZlrhXsOtWLDXwN7f0P4lINo4OSDmTfqwUms04EPc+xY0TdVFEckqf/2lXxcMDMREZ999rnXfvbIL0zT1oQ6DAUAGGtg2RKRYFjAS/kAAEEEIoKSCiQJRlsEQYB0xrerViwX8y+55IwHH7z/idraWpHL5exGulRiZkFEpu7GW2t32HHng7q6e4zvSyliIbbGwGgDz1MAM0hKKCXAhmHZwFoGAWwtq9Ly0vCVF1/0/nnrzbdcOm/e73jJPI+IogV/Pu7X2+48ZT/b2RFamZEgBukQDGLPE9ShS5tOv/ylb+dyuaa6umpZU1NvNtL9fSrxqVeAZLV+4OH/7BIYu91++81EFIVgAFpHkFKBiMBsIXoltI6gpAchBQiAZYBhoaRERcVmeOCBB/D6629MB/DEokWLBICNoQBF4b/qr/+4YNrW257R2d2DIChAqCxgNAp9efi+D6EUevMBPKWQTaUAEDQbGEMwlpH2fYB0cN1f/5padN99r7/03DN1zNWSaE507wU1vz1gRO9ZWHwHwBaABKwFkh3NWoytGImLv77bdn/c+tuH1dRc+vrC2lpVlcvpjXCPn0p86hUggRCi9647/2Wam9fqTCarUr4Pay2klAjDEIVCAUSEUEcoyWSBeBewxiCVScP3fGy19ba6salZ+X5q9Ma6rtgsEURkbrzl9osmTZn6nUcefThqbWkVmUwGRAxj3A6UzZZCCKfUUkqwZUjlQWsNozULKUW2JNt6zWV/aX1x2fNpNvprXb09bxLV446Lq3920LDOs0zDA9pYTZAKHEQQUgJCgNmCCeDeZXbLrVdvffY+Ry4Y98fzDqv6/k9fWLiwVlVVbZpKMGgUgASJ8ophMpspQSqVkswMISSIBKTykC1VUFIh0hEymQzCQgAhBKSnkE6n3f8FsZJC+r4aszGuKRZ+IiLzj5v+OX/K1C1OfvDBBt3e1u6NGTsWQhDCMILnEbLZEnieB2MMfD8FZosgKCCMQgiAS0oylMlme6+67LJoxYrl6V132+eQRfff+YqxjLsu+lLukNTan+CBh7VVSgmZhrUEEh5IMBiAAIPZAsPLZbBylZkkb59y4rYHLfJ///2jqqpyj/LCWkWboBIMGkdIRxF0GMarpSmu+swMJSWkEIAgKKVAgqA8hdLycmSzJVBKIQwCFIIAOopAQkwAgNGjR/NHvZ7EySQi/seN/7x286lTT25ouF/ne3vVsIoKsLXIFwLk8wVYa0Ek4HwBAbZuR9DaIswHrDyfMtls4erL5oWvvfpiaostph5y/4I7XtGWcfe86p8dmlnzU/GfBh1BKBIEjjTIWhBb2MgCArCRAUcWHGmIkqwM1q41Ex+/bfQJk9r+fdlVP5xFVTnNC2sHzYL4QTFoFMBaA60jFIICG2ugtYbneQAArTUIhGwmg5KSEmTSGfipDJRU8D0FthZaa1hria2FjqJJAFBfX/+RFKC2tlb87Gc/s0Qk6278Z93ESZO/9uADD2itWQnpIQidshGcqUNgMDMKhQL6enugwxBghjGGyyrKKZVOdV92ycWdL7/8EsaPH1/10IMPvGIZuOtPXzz/ELn6J/z4wzpMp5VQEgA5m99asLGANSBtQL4EewosJWA0pJSy0Nhixz56W9lR2bfunvfn73yRqnJ6ybzZ3sb7VP73MWgUAAxi952NMbDWwhgDIkIqlYJSCkpISClhjEUmk4FSEp7yIEhASQXhDBYYa1TxqB8StbW14rzzzrPW2lT9bXfdvNmECcc+9OCiKAgC5fs+jLVgAGVlZZBSwloDIRUKhTyCoADPk+jN96Kvr9dms2kqKytd9Y/rrr5r+Ruvl06YMP5zjz366LOWgbt/f9ivPytXnMOPPqK1UFIIgmUL1hZsAavdas/M7i6EAPkpQCiAAdYaqiQlCnljRy2+PXXssNYbr7/6R1/bbc78aFPaCQaNAhjDYAtmdjIrhIDWzqQNwxDGGBjLYMuw1gLEMEajUCg40yjlIZPNwhqDMIo63VGrP9TzSYSfmUtu+de9/xxeOeLIhQvvj9iwB2YU8r1QglBWUgqnpAaZTNpFqIgABqIoAgOWhBTZTKbtynmXdr3w/PN7jhm72WcfX7x4sQVw728P/uOh2ab/Z59+ShsvraQggiCQBcAMKAGSzuQDACsACGdikSQwM8iTYAGojC+iwNrhi2+zh3svX3vj33783X7m0KBPmA0aBQAxSyWJmYVSCr7vg4igtYbylBMItiACUp4CGwshBIzW0GGEdCoNASccsPZDf/DV1XUyl8vZiRMnVt7yr3/fU1lZcciDDyzUQRB6DIaQEiQVlO9Beso5pAB8Pw0lBCwzokgjCLXNZktFZXn5mnkXX7T41Vdf2WLKlMlff2Lp4ocsgHvOm/Wng1Lt37NPPKmNn3I2f799SkgJAYAkQaQkpCdAzIDRAAwIDPgKDICUBNiAhBCBFlT+8B3m83juz3f940c/oaqcZq4e8Kz4fxuDRgGsNZBSIp1Oo1AoFH2AIAgQhRGUlIiiCD09vTDGQghCb28vIqOLKyUIEII+tN1TV1cn6+trzMyZM0deeMkV/05nM59ZtOh+nUlnlBASkTFQ0gmi53lulWdGJpuBMRG6e3pABJCA9VO+kILWXnHZX9auWLF8r3HjxlQ98vDDDzKABefve9EhFe2n2aef0MbzFBG7FZ8BGAaIwAJgsDuepwDfOf1kLKC18wmMddmNyIIjC2s0pKcoVBnhPbRAHxou/dldfzvrd0T1hrmWamsHj5ysj0+7rUeILVy2KGVmeL5PRICONILAhTrDMHRmjyB4nucc0NjkEFLCaI2eKAIJYmstW5MkR+vf9wLq6upkTU2N+cIXvjb6ayd87V4p5I4PNCzS6XRKRVEI3/cRRS4iVV5eDmMMtDbwPcD3gHxfHxiAtdaWlpYK3/NWXXXZvBtWrlx58oQpk454/OGHH2EAC36676UHVHSfope9oLkkrYjdnTMYzACRiJ3f+A9Cgq11iTCRLOQMGOucJaXARIAxsWkkINhSoJRSjy7Sn51hf/BQ3Q+HEeW+5WqHNmpW/H8Gg0azhRAKAIJCAcZY2DiyY4wBM8NY99llUxkXgsznnS0MwE+lQCAEYWS11pEQ4gNt+7W1taqmpsYcc8xXJs/57ikLUpnUjosffVgrKVUhX0ChUIAgIAwKIBD6+vLQWsfx/xBdnZ3uGggWEMJTatWlF/+58ObKlV8bOXL0YY/FK/9DP/vMxQekmk/Bc88XyPdJAkYRGUUwgsgoJY2UMJLYSLCRUhpBbIQ1RhIbYa1haw0MOxNIEmA1yBqnHEqAjUl8ZVivREWLG/RnWh795sP1/3cjUbX3s1zODsb6ocF0QywFIdKR2/LJxfyFECBBYBcjQiF0cfcoity7COjt6XUKYRlERPgAxXC1tbUql8vp6q99bdpJs0++PwgK2z/00EO6fFiFSvkppPy0O19QQMWwYfAzGYRRiEI+D08qeEohiEJEUWTLS8tENu2v/vMFf3yrualp5MQJmx379NNL/3P2VyZV3nn2rjd+pqTr1MIrryJPMh0ZKyMLGQIyAGQEyIhZagOpmaUWJCOwjCIrDZM0lmRkIH0YSdYYTpxjIkBbZ0IJuNIJa1wUlS3Yzyr92AN671ULv7i0btIdtnp2RS6Xs3V11XKgPsD/Bj7tJlAR1lhXQiAkBAjS913CSygwsRN4yzB6XWjUGIMoipyDbC0EQUqppGV+TzegtnahyuWq9LdO/d52Rx31hbt7e7snPLn0cZPKZFRPTw+UVEilPBAxIAhSSYRBAWwsVCqNfD6flGHY8ophwrJdfvGf/mh6evu2Hztm3IGLFy9eDEBE3cEuz7/a9NTlV61amS2TZmyJfSoy1ldSsIRFWqDPF1SQEpDGoC0Uw2RKCGMsAAEhIH2CyQhu32oEPnfU9pnZpFkHgVEycXvYAgULSAHBAEfGBQgsg7NlKnhiid61UDjoqaP3X3DmuNMPr6n5U+NgKqIbNAoQxaaF53kIwxC+p5BKZRFFETzPg5dxv092BqUUoihyvgEzlPKgjUugwW7Y1E2E/5TTztzl8MM+f1e+r2fMS8ueNxUVldIYjcBGICHAYJSWlgJECMIADEZ5RTmCMIQFkO/pNaNGj5JS0Mo//uH3C8J84SubjRtTtXjx4sUzZ85UDQ0N+vf/arwfwP0AgEYD4P1k7j3/futfye/78pb4niesiSIWUgnnCFkGCwKkAEITh1AZRAairEwFzz+ndwoKMy7e59CFv6k8+4iaml8NmiK6QaMAJKiY+PI8DwRGGAYQQoLB0DoqFsdZa9Hd3Q0iQEoJECEMA0ShtpGOCBsI/dUuXKhyVVX6O2ectffBhx5+Rz7fXfncs88Y30/J7u4u+L6PlOfFJpiAsRZSuaI2MMFYi6AQINTalpWUyr6e7tevuHxed1gIjh41euzMxYsfeTwRfgBggObORNHk2G70h0/MAcDzTaC53wFTTc/31YF+09Hb0i8yJZ4OQkgJkIUFMYNDA1gqZhQhBchqiLISFaxYbrYJ/7XtT3Y49IHRv/zh4VU/yj09GIroBo0CKCmh2dn2SilYENhqpKSrrUdcYSmEcPVBSkG7kgAoT8Eai76+XmuN7Xu3xpJ58+Z5c6qqopO//f2ZVbMO+ldr89qyl19+yZRmS2UQFCCEgO/7roozPj5Jgd7eXqT9FJgZ3V3dCIPAVI4YLisrKhaen5vbSIIOHTduwkGPPvrgE/2FHwAIYDRgowhYrgHEtVCUC3/5t3Sm7+it6YKstDrIs5QCxBQnyJRwCmsJCAxADCYGpUtkYc0aM9X+c/wp0z+3oGJe7vCqqtrFn/YiukHjBBNbKKEglYSQBLYWRhtEOkIYRohCVxYQBAGsdVEiQS6JFIUGDEYqlQaDpVnPBJo3b543Z86c6Nunfe+QAw+suqO1rans2eeesSUlJZJhARCy2Syy2SwAOAWMC9oIBGNcWYaOIjNy1CiZUur5X/wst5AZe40YPurgdxP+AQBTDpprob56R/7CPz4Unt9RYJXywYbgylatM4dgXMacKd4M2YIEIDJZmW9qs1OevG3EN7Iv33/J/DOP+LQX0Q0aBWB2JQ7WWFjjisuscU6vi/qExdIIYwykEPA8P44GMfxUCkIKlkJ41M8ESoT/9P/7yREHHHDoP9vaWktefeUVW1FWIcBOkZRS0FojCAru+FojiiKEhQBKCoRhgEI+byZOnCSzmdRDv/31L5+Koui0ESMqDn/iicVLPwHhLyJRgp88Fpx76ZPmtGYrRCpN0NoySLjIkLWANoAxTiEsA8aALEP6aVHoytuxj9ySPVa9dtsVf/n+1z7NSvCpvOh3gyBCxK6+JimLdi2FriMsMYGMcRljGf8+KY+GZVuazaZTqRSMNW0AcMIJtd6cOXMKp3//x1/YZ8+9bmhqXK2WL19uPc8T+Xwf0pk0tDEgBtLpNCKt4Xs+gnCdshWCAIKELq+oUJb1ol/+7Lz/APjK8OHDDnzqqaeWzZw5U82a1WC/850PF16sqam3+AjFesA6JaBccFFryOJ7u8kLJmSAQt5YKUiwtcWiUgAgw2DBIGFdZC2dEoW+wI567F5Uz5h1bellpw6nqtyfXGfaR7+u/wYGhQLU1tbiX7ffBbdhu0/NT6Vg2e0EAJxJBBT9gDB0WVoSAsZaXVpSqlYsf+PclSve4LLy0mGtLY2CiApn/bD2+F123eWqVauWU3NTEyulRLLqe8oDM5BJp13bJRiRDgFigOBCrkLo4SMrVW9P95O/+/UvFgshvjxmzKhDnnzyyVcByIaGBt3QAHyQrPPGBOWgl8yGt9v88E9Z+Cu+OUPVTy6DV+izViklONIAx3VGHJtBFHeWwUKllAit5rKH7zFH733IhXdd+d0RRBfVftqUYFAoAIBiVtfzFIRUcZNJnP4nZ9RIKV1SjDnuE2akUqmImb2mprUXXHbpRecDwKRJU/8fEdkz/+8nJ+2w045XNDWutmvXrEU6nRZKuUeWCLyUAlJK9OX7oIR0O4Jw1aiQHGVLy7x8vm/hBb//9b+k9L5bWTnmkCefXPoaAMWAIQBnf2ffrUbtPn28ZWIRMkGmoA1QjP8YDS2dVZKWadj2Nl752ONLLqlf1oN15SAfGrvNRxQ7xrcFHh05Z3txy9RyyhS6jRXMgiRAlmBJAAZgNoCiWDEMhBAUSE94D9+tP7vnAT+994rZFUTzv8dcK4Ac6MOXVX3iGDQKgLiSMwpDCGlBcQZYQEAQEIWBY4Ng4XYJVykalZSUek2Na6+97NKLvl9bW6uGDx8uzzjjjHvP/nHt7G2mbzfvrZUrTEtLiygpKaFCoQDP81xkJ5OGDjVSqbRrtFey6HsISFhjo8rK4V6oo3/97te/+ZWU6vyRI4cf/OyzS1+HE22NumqJmnqjnn/9wu/O8D8bFgogKMBLu8hL0rUvyZUqEEESoTAihb9H7fsBeKiuGqKm/n0TBBt+ajnohTOhqhqCe3rb5GHf20vdOm04VQQ9bASRBNgl9ACwjkkItAHAYAKkFKSRVvI/C/RBu+XPePj6b1cQ5U5yCYaPrpyfFAaNAti4qyppKE+a3nUUIYpcsZgnJSJtkM5mQUSapPRaWppvm3fpn75RV1cnn3/+eXHGGWcE/+/suTtvve2281atfNM0Nq4V5eUVFIYhpJTQWsP3fTAzpJDxJ8wgCGgTAMwIAqMrK4d5vb09d//y/Ll/LSur+FpZWck3n3322TfghN8JbL0ze/Itbb3+0ketH/RpS1IJTxZDt66IT4K1BYEhyFo1YqJI+RtPsKoaoOfNgDdnqVnUYenI82apuqmlYmzYB0MMSUlEiFy+hXVcYMcua0xCwvhpZR59WO+9e/7ExVfPKb+u0//Gn9qG91AuB/wPK8GgUQAwx1WNEpYZZC0MuQyvkgrGGhgwlOdBa609z1fdXV3/vnzeRdW1tbX8/PPPq1wuF57+vR9+f9rWW/1hxYo3TEd7uygrKydjDIQUSPsp6LjbzJMejHW9x0op51wr50+Ul5Wqnr6uG3I/Oecb48ZtdkFpafaCl19++e3CD2BRk3NYrJSdOu0LKBIWUgAW5MTdhXTZAh6gNUOxRkgk8hs5ZjRnKSK3E+gHlSeq/t9u/O/plWJimIcWnlDEABsLtsZlia2FFRJkNNgAsACn0ko/+XS4x7TwmMf/0/ko3bvqt+6YGyeXMRAYNGFQEdv0OozAxm3RioTrtAKDQLCGkc/nNQmh8vneJcuefeJYZtYAVC6XC7//gx//cKtttvnDG6+/Yjo7O4Tn+WStLbYVBkGAvr4+AEChUIAx65rv8/k8wjCKKisqVdDXd2PuJ+d8bezYCXv4lcNqX3nllRewnvD3hxTULYSrxUEUgQINRAZkNGwYAdqA2EJYA2EsBAGe2vitu8lOcM3L4YtfvzuqeayZGv1SUiYylq2TcmIGkXRP1ABQCqRcpxmxhSESWL7CVrQ2ZTb6BQ4ABo0CgFGs67HGJb20sYgijSjSMC75ZUrLSlUUBS91tTd/7uGHH+6eO3eul8vlwtPO/PE52++4/a9WrnzdtLW1CiEEeZ7njqMjRDqEkM6fgLXwPOnItdZVTutMOuM1rl39t9pzf1yz2WaT9vB98fKKZcvWwj3ndwj/ovh7wKKCjQFrDRhXmGYBmMgCxoIjl5gijqs3rYXS0YA8xjlLEdVVQz7Rhke//wjt+kwzP54qF4KlsCQlmAmI4lwBu9ITsoj7DgAhAZRnRFmp+lQUyw0KBZg7dy5btgwAUilIpcDs+HBcxxSDjbG+70sdhmua16w67O9//3vLaaddmMrlcuG3T/vBeVOmTD7/hReW6TCIRHl5BUVR5BpnhCuzSKdSCIMw7t21KOQL6OvrdTQqJHR5ebnq6myf9+tfnv+12bNnq5Ejhz395ptvroFzBN+1ui6u7SEd6ZQNnfBT3L5JzI7cTdvipyR8FRfsW2AArYqaepjamVAPr8yv3uNm1PzrDdHsp6WwlhmRARsTc5ISbJxFJyJASTgOFgbMh28r/W9gUCjAbrvtpqxlX0oJY92qTySc4LuGc/Y9nwTR2uHDSve8+eabX7/wwgtTf/7zGcGp3/3++dtvN/3cVW++rtvb26SxlnSkQRCwcTONEAJBPkAYBMXmGqMNyAKeVLq0rFQVCr0X/vbXvzilrq5Ozp8/Xz/zzDO9eJ8oyPPOB2BjnY/JQiCpziQB+BkBSinXxOI6/kHKdX7pje0ErIdcA3R1NWQYBMu/fLuueqZRNPnEcMGoxCFm11TDFvAkkqgztEWJ70Rr1oBe5cfHoHCCe3p60ql0SSaKNLO1JGJB8pSjQYm0ZgOI7rZOc/11dx41b968eXPmzAlO/e4Pzp80eeI5Lz7/nNYMlc2UIN+Xh5CEsrKyYlgVRFBSQhgq5g+kp5hIGKGUalzz1h/+dMHvfxC3R/ZPAn2g6IevqIs8AWguEllBCLfQS+EUwDA4VgRYgvoEPrr6ehdPIIreaAlKFCo1sTUMIcCRqw8iRWClwCa+NnLXLD4lS+un5DLfG2PHjmVyni4sM2Rc8am1LhJeCZeZHe+n0t+dM2dOdOYPfvTHrbfe8pw3XntNt3Z0Km0iBIU+CKxrXI9Cjci9H0K4sopQa+TzeQbDlJaWqs6O1t9sQPjfF3NnOdOo12A0M8DaEoxFnEkDwCBjwEKApQBbuBCktVDqkykdEgLsw5/se6ScRlrYiMGW4BZ/gaQ/GZYA7eqG1EbhFB54DAoF6OnpsZZhpFIEcllhIWWRFsVqDU9KFlK2rl2z8uRzzqn93WbjN/vesuef1ToKVcrzEAURrAXS2Sy01ujq6nKZYs8HmNGX74O2FtYYhiCTzWZVT2f7ry7+84U/jHuDP2z6n+R5sMC0VI/BZoi0s6sd/7lziG3Sv2tdqFFQTHSLgXQB3gZrQSFkmRSiOFbDRtZF2iSBicChBsXkFMyuMV99SraAQWEClZaWivb2bklESPkeolBDG+0Ib6UEScmGWZSWlT7/u99dWCOV+u6TTz6htTGqpKQEYAsBASZy/KA6crsIGGwtwiCEZYYWmtOplC0tKVNNTWvO/cslF52fsELgwyd7XC2FV9iqT8sdWAcMgpMyE2eBPQGO1nVscWighHHO5ifzybEQYEivMghJwMZWDrkGH2EsIMkFhHTkeIZEXHry6dgABscOAMCFJHldz29iq2utASLR19eHtJ/ap6O767vPPves9X1feZ6HMIqgIw2pRMLHCSlc0quQL6CzswsAQCQ4irRNZ7My39f7vb9cctH5H3HlT+AKDDLYDkKVCEmGLQiW41i7W0mTknyho1iuPlDP/sYA1QI0ceKkymxGHWkAHxFAzJCxA2wNYMM4PBubZxzTsoSSh/IAnySEUDDWsrEWzBbWMqR0vb9gN1iivaNDLXthmTVGC7db+K523zg7n8CQAKSQyIcBtImgrYXWhtOpFGezWdnR1nLaH3776wsTVgh89DS/E2MWSioBhoAJ441ESEDE7AxRTGQV17kKZrABCgNvAskcYKPIfk163heGe3aVu152LZ9CxkQSFmwJQoo4R+FsoRJFwYBf4UbAoDCBACCp27WWWUkXkjNxyyOR6xdO+T6YILS1IK0hSSCbySA0jj+oJFsCrTX6+vqglIIUClpra9iSVFJ0trZ848rL5109e/ZsL5fLfexMFANQHqaScMxelJBRxEIORxcEjgBS8TsMAK2R/rgnf39Ydyl8kBAiHbJgOA4jt8qTiwLZCGBisECcu3BOcIfmioG/xI+PQbMDuGSMi5xwzAFKcTFZUs6gtYYkgi9VHK5zNCqlmSxSfgq9vb3FlkmtDYjZZtJpSvkp297e9qUrL593dW1trZo/f/5GS8Mqgc0Yws3/4tguilmerYajPFTkjHFed5+fAId5PGOJtgbIWAZBwjm9INgoJiGWsclvYuU1AEAQ8hMy1D4mBo0CWGtc+XM8D8xx4zgliKLI9efGvEEypkVxKxmK7HFRpN1ILSHA1lhjIiKC6e7u+uIV8y+9IV75N5bx4TLXgkdawwDFjM4G4MjGYUW43wOOrsQwbGjBJAE1oJu3AIARIzabJqTYkgRxoFnB8WbB6NjD1QxhAbIWMAyj45uKE9afBgwaE8hVD1NcKsOQ0tGiCyGKJdJEBBIEbQ0IgCLR770o1vYIFjaVTgsiCteuXl19yy31/5w9e7Y3btw4k0yl3BiXTAAExJg4dFt0gAEBE1nHWRI7mIiTYa70aMDjoAKA9YTdUUopiKyGEBIm7gmIKdYhRMymt+4ZWgNAMz4t9HGfEj19b/i+z0TEzBaR1tDWwFoNz1NviwgxMyJj4mSla4201s0JSEqeoyi0vucJIuoLCoUjb7ml/p+x2WNyuZx159kos36dEhGVuuA/FZNLxrj6JRtHVqxxjqUVVCw9HmAbyABQLMRXXPOQC38CcXekcVlHZnbhYUMu/s9wNpwQUEL8z/YA9MegUIC2trYMGFlrXecXG4MgCIvzt3TM0mCMcfR/1oKtU5YoCtHX1wetNdhY4/m+kEq1d7Q3H3rllfP/XVtbq5YtW8YA7HHHHTdl7Nixo4iIq6s/FkcmAeCTAU8RKkgQdMRkNLvRBESw2sXSOZ5yyhHDauH8goHtL5EAeNSocXuRkEe7q5VgthrEsEzg2BdwddkCJOD4g0ScjmeDvnAoDPqJIZ/PKxArx/TmKEqcTR8hTBgiYp/MGONCd3HMPxlQZ9ga4SkJoL2zvePQv//97w8lwn/jjTeaVKpiyrDK0f+58qpr79133x0q6+vrTV1d3cfa6R8ahRQJkWUwtAWZKF7hDcPzOU7EASZiVyFhLYicmfQJ2K5J8REYFAgT9bk8iQsxA4y47cJVbsRNbAwAltEXoXTgL/HjY1AoQFlZGRtj2MY5ACGdXBYpUYAiEW4i9EmdEBGBCYaElL7nNxd6+w7+29+ufjwR/vr6elNeXj5l/5n7LmDmzbLZkp3O/8Wl9x188MGja2pqPqoSEAAEurKSiCqsJQhhIH0G3Aw7hIH7zja2KsAQbIskzgPUDlAEEx0OAsUTaKQhKCiCEAQlAUluLoGJXRHLgNVxUZCQSIv/3TbI/hgUCgAAYehyUsnw62RIXsIOkRBnObvfhUYBgJlNJpORRuvVTS1rD7r++muWzpy5TvhTqYop++w7a8E222wztbOzw1x99VXaGtr1h2efe98+Bx202UdUAufKet4wIUTal8SSiDieYYakCZ0p7mWLq0GTPMHAtgPQuHHjsgB2EUKAQCwIFX0W5RAAE5Exrtw/CBlB3KwDy7DseobB/UiF/scxKBSgt9dRdrjel8S3dKRXyf+p3weSKIcxxkgppdVmTWdb08E3/eMfz8ycOVONHu2Ev2LMmM0PPqRqwbQttpja3tZqUqmUtNaqyy+/TIdhtMMvz51733HHHTfxo+4EVohKIQSMZS6OONIMox3jglCAEAxtnMwbnTRiDZgJRABMX5/vCxJ98TNjEGd7Q1uaRKNs7AB7yu0EYCruVkYD0MW6uf95DAoFAHrh+PBFvLKTG4AXx/cTOnQhRJESnZmN53myr69vdVtr+4H//Oc/l82cOVMBQH19vRk+fPi2n9lt7/unTp02dfWaNaYQBDIIAkgpkUr56rq/XavzQbjtySef+kB1dfW0mpoaU1v7gekBCQAM2UrHLwQ2ml3GVxCkJyCVi6qYgGEjQOvY6ZQxkecAIp0uDAOwf3KtEuRFECkwIBNbnwmeIihJSApXgTgbzPy2wX3/yxgkClACAop2fTLhKDF9griTS8p4TrC1Rkopoyh6q7mp5aBbb73hhSSq09DQoCsrK7ffZ79Z922xxdQpb61+yygppe/78SR3xLkFqGuuvtp0dnVPOeXUMxZ885vf3jaXy+kPoQQwLKa50KGjkossI7RAZAlau6I3Qa4MQrPLBBvDrm8YA+IECABsDPYQUoxktoaZCURx65pzxq3mfqPHGDZ2gpUHRNpRiqohH+CTRC8sLKw1OjF7tNYIoxAAYJ25gzAMEQShyWayUmvzanNT2/733XfnC9XV1bKpqYkaGhr0qFHjd9pnn5n3bj55881aWlqMklJ6nlc0mwoFN/vLGoZSStbV/8N0dXVOOuHE4++fM2fOTk4JFn5QJeiNnUxyyTuG1QwdN50TA6wEJBhKMaIQMCEGcnV1WTiIV60xLwEk4+Ri3gO6iAgEYhYEC0YUuUI4GzHC0LUvG00uUkX2UzFxfpAoAGBdAD2y1nLcBVbkCWU4SpNCoWBJkAzD8I3urt6DFiy44/X+K39JybAd99t/3/u23HqrsY1r1xgAsr/TnNQWufMZKKWQSqXltdddZ1atWjX268d/8+6zzvrRjrlclV648AMpwQhXnuFCKsYQIu1CoWHE0KEFRQaFAiEKXNV1aOJitIFxgu306dNVS8uaJ6yxJxtj+2B10F0IewsR91gSsHC2PywhDAlRxBBxA1sQEEi6HcJoJ1uLBuQyNx4GTSlEPNckE0YRI7b7ATd53a1csJ7vUxAEj0XoPejOO//ZXV1dLevr6xmAnTRp6md23GnnW8ZPmDCyuanJKM+TidkUc4gW64o8zw3CSNjiUp4n//a3v5mvH3/82OO+dNx9UspDq6qqnly4cKGqqqpaX1QJgJ0wYULGaHscMWCZhSVnArFw46ytY0SBF2eFNQgmAiQYRhMQDcgCK5YtWxaOHDlyK6VkSdana7o4u98h26lt9t0hzd2rX4dmt2VZBoygOERLMMwuF6AZUWhhBjhMu7EwaBQgLoe2lIQu4rAngKJDLK0lX0n77LPLDkZ19W31jpqQt9lmh7222nrrf2y9zdajVqxYEVltPD/lF8uoPc+D53lFanVjtCuXlgpBGMDzPIwePVr+89bbzJGf//yoo75w9AIh6KiqqqoH30UJCIAtFMQwpexEIQDLRGHIUDHjCcHGtwP0xR0HQrmEEyyBYZDZ6PI/UwENeuLEyd8n6Z0/rKIsa/0K7D0yxAU7N2P4irfQzY4DKIoAqQBPMqzl2F9xDW6hBqUtEBkuA4BZH3Gs0yeFwWMCsYVlNjKuQUmSXM7xVVDKE1EUQnn+XptP3eKmKY8/9TsAZubMmbK8PLNqi6kT91qx4vXrM+m0R4KixOSRcVItyRwn/3edZi71n8wmy2Qz8pbbbjHPPfdc5ecOP+LOX/7ytwdUVb3DHLIAVEvLm2sk0a1EAtbCCOEEnAlgQQjiEgjDQBRnXEML5CMGS4mN2BBALvrVoKdM3aq2tGL4H0aNHpWl0tF2/2klfNFuXZx9+XW0dQWAIAjBIAmEhiCFiwIpHzDMMJZgmSAlQXr/24KfYJDsACUQIiJBFBpjMkkOIOkDSHYCKRU6OzttaWlptNn48d9TvnyloaHhEgCrHnvsMQD42rHHfsWrGFZe3dnZGQHwVEyylZhSnudBRxH8dAaGLaQS8IREGEaQUsL3fHnHHXdYpVTprKqqO37xi19/saqq6s5k0kz/qybmRrbWZVUtI9AECUYUlx0H1oUX0x4QaEaoAY8AY3mjMcPNnDlTNjQ06G2mb1/rp7Jzy8pKdSTL5GfGFERuymtIPfcKCsZCSIEgdIO2lRBIK0Y8XAdKAUoRrGVYychrIP+p4IUbNDtALwCwEDIrhKDiuKR+JQ9JVhiACMPQnzhpQphJZ3/pedmdiAjTp0/3mRlvvPHSV3v7ev+VyWQ9ItKJGdSfeZqEQBiFkERQMV2KUgphGIKtReWwYWLhwvvtU08/nT7woENv/dMl8z43Z86caN68eYnhkqR07zLWQggIJVyYUVvXXBJpQkow0tLZ2/GG4wrjtN4YTjAlo5mmb79jbUlpxdyRIyo1p4fL/caHdN6UNyGeexltPQxjxbpLZoKIa5Q86XatwBJC7a69oAE/JbnCl5+KtvhBoQAlJSWJgFIS+4+iqDgNPlEGay1834e1TIVCoHbaacfM5MmT5jHzqGXLXghnzZolly59InrmqaXHFoLCQj+VVkEYaq01jNYIwgBhGMacQSHCIIASbuySEAJKyeLOo6QSixbebxcvfkTtNmP3f/7+gj9/ZT0lgACatdasjRVMAMVJJsMEFbMrMBE0A4iZBxlwdIRafywTI1n5d9x5t9ryYSPmDq+s1DY9Uh4yMaBzxryM8JmXkLeASrmWx3xEMAB8DzBgGGZYiluAjYWJ+5RTHnFLIaK1eVPyca7vk8KgUAAHgjHGBIHrxU7GofZ3hAGsUwpjRRAE8jP7fmbPLbbY6h6Ahzc0PKBnztxfLVu2LHxp0bNHdnV2NEjPVwzSjmdIIIibbERcWqGNRhAEiKIQnufB931oR56FVCotFiy4jx98oEHuvvuef/vjny46cc6cOVGxbILzebbWGsMIQzbkenmsZTAJcGhgA0NWCNi075rBjAFba7kv+uj00MnKv9Muu/+kpKxibkVZmebsSPnZcT10ZvnTiJ5/HSE7DtzuAqM3RFypQTAGiEBgQYgMEBrEEStGxoNth5C/XBrhhpfD+QBQ88lOfvrQGBQKkM8LdsJuCkTEidmTNMG8LYMrBIzRIALCMBLWst1r7723nzRp878DXO6UYKZ6pvGZ3p7uFw+3UdCQTqcUM+ukj6B/oR2AoqMcRRHy+XxR+fr6+lBaWi4eW7wYDz6wyO6992eu+vOf/zK7pqYmXLhwofIbO1cbxvISX6BUkpSaxDCfxLhSUIUEVfoQY7MsKjwSpQpiZAaUkRDlaZ8aI/NRms6pn/CfU1pW8bNhFRU68ofJg8d20HfKnkH+hTfRy45/1DKg4zlhvmL4ArBxNCrSgNHsaK8tIytg3+wB/eFp2JV9/NV/tdi6WkDUv/94+/8qBoUTbPwoRSQ8IpLG6GJRXCL4yf+NMfEAa1msDeru7hbZkhK79z6fOYiNuXrlW28e39DQ0BvnCHr32To4crOdd1+QSad2L3T3aOUpVZwZADcnIJ1OFyNBURQVp1ECbtUsKSmhp558ElJ6dvc99px32WVX26qqqsuZ2QwfP7U9CBkPNfLrfRomrdg3QDYfIVOmqLEkje6eApeEzFkIKusrwC+1fcgI7viwzykxe3aesfvZ5WXDz8+WZnUgyuThY5rpm+oZdDzzFiIpIQVDCqBgAF8S0p6z+QMLKMmQgqDhbH9jgRJJdnkf6JIXwa/lcdyDnfammYDKfWL8dR8dn5aivQ1BALDbbrvzlsZGLxKRGDdunGvMS0iu4qmQRIRUKlVUiiTBlWR3S0tLI9/3vSWLH7tu2YvPfhOArq6upvr6erP77ruPmLT5lvd4ypthdKQBqP5Vp8mKn4xOCoIAqVQq7kmWSKfdeTs62nmHnXayBxxwiHzyiSXf//4Zp16wxdZbz7Lt7W1vNDW9CLdaSgCZ+Ks5/p2AC3yWAsgCsLNnYM38pR+4IIgS4d9llz1/WFpe8auyshJtUyPkkeNb6Ot2CdqWrUIkHTWjr5xtH1mgJEWw2vERCeXaIQ07fyRggCzZVXnQJS+wXVmgmgc6zc0zAG/pABUrbSQQAD7ppJPKBoUJRERsrWFr7Tscw6QMOjFboiiKh1oH8XQXVyjX29urSsvKeM+997oegEmEv7a2Vjz++OOt3R0th/T19j6vlHLmUHGHoaISJSUYySwxl4MQxckyqVSann7yKfHvu+80u+62+x///OdLf/raSy8tWtHa+owghIJg4u+dgrBWEIx0BXFWEPoEoYkIywl480MIf3Hln7H7PueUV1b+qqSsXAeqQh49sZG+5T+JnldWgX3pKu/YrfR5S8gogtWMyDBMTFFnCRDECAwjI2BX5kEXvgC7stfWPNBpbp4JqP9x4X8bBoUCAAG0mwjP/ev+gXVJq8QhDoKgGBp1w6y56Cv09fUSfLEa/ezWXC5nq6ur5b///e+2zo6ez4ZB+BIJobQ2xkWWTDFHsH6yLNltEpMpLqmg5557Vtx37916+o475f544aVzrTFYcP9CZRm0/pdxvSbFn5kh+IN/bkWbf7c99vlxeUXF+eUVFVqrUvmlSc10Apai+ekVsJ4Ek0tmRXClzr5lWMMItItMeZJdqQYDeU1IEeyLnaALX4Rd22tqHujBzTMAr+FTYPb0x6DwAQCA2YKZrPMDTNE06d8RluQDEuFMWiYTwY0iDVj21z92fX29iX2CVTNnzjxoWOXo+0iKrbU2BmDpzs9FQfc8z80liFswE3MpoWYpKyuj5555VnZ39+gjjjyqdt78y0VVVdVP47KJdyXara115urcueC5c0Fz5767+bru97VYtGiRaGho0HvstX9tWVn5XC/l61CWyhOntdOxhafRtmw1kFKItIUQQEyP6ppcYpIHz21yMNaVQYSGUe7BPttN4k/LEPSGOOqBHtwzE1ANn6KVP8HgUIBUCpSPQCRlEpnp3waZKEMSuUlMlIQ9OlEAbQxKvPS7xtf7K8F++x1y8IhRwxqU521e6OszylMy2QV8P4UgCIp+h++nQIRiI07iJyil6NWXX1J33fEvfdjhR5x7xVXXyKqqqnM2oAScy7mf3dRRcPz93RC/LwcAdtdd96ktyZbOlV5KG69CnrjZSvpS4Vl0vLoGIiMRhq4ZTVoARMh4jDAigBgkXJ2PBeCx2w0qU2yf7RbiwheQ7wzNMQ1duCde+T91wg8MFgUIACFIANzDzFlmlv37gaWUxdU5Efj+ocsEnlJuF9gA+inBygMPPPCzZRUjFyjPm6B1ZIQQ0lqLQiFfPF/Sgebq40UxR5D8raSkFC+/9JJktvrzRx3948uv/Kuoqqr6ETNLIrIAMGLEiNIvHjRl9HbbjErdWxjV0zxuQjC2O/ALo4frEdN3LgAV6Hj6kdSw/fcOup9b6gevNfsRIMozabv6roe+6UHU+mUlWqWy8uuTmqm69ym0vtYEykpEEWCJoRlQkpBRbgY2U+wlWoJhN4M5jIAyj+zSLiH+8iL6eo05qqEL930KHN73xKBQgFQKKBRgSSBrjBFJ9AdYV8TW3+zp3xQPvH23SPvvsIDehn5K8PI++1QdNGLk8IWe74+LwtBorWVi6wMu7+B5HrQ2xR0hccSTGqNsNksvv/iS+kff3/UXj605e/6VV6WI6ExmFltuueVm7e0943zYqVuMTh9ZLVs+awqNXr68xPfCN6z39NICKQ+RgK8eXBxGhn07nDxJxFZrMkeWpoyJrKRIpWQrhr20BK1vNAFZiULEMOzaK5UEwIzewEV4fOHi+xG7FkfLhDKf7ZPtJP7yKnfntThyUQcaPq1mT38MCgUIgphaEAgApGL6wqKgJ7Z3f6c0EUYA6N9FFjm6RL+pqWmDtSz19fXGOZcLX9p//wMPrxw14l4h5QhobZVSwpk4Hmw8SDuVSsFai+7u7mIoNtkJmBl+Ko03Xn9d3XJzvf7CF475/vzLr8gS0SnMvJqIVl10w9rHL7rhyVd/sBVm/W5njOjpAwwBKYmscANkECaFaR7iSS2AMbBCujkWIKCPAetJ6IDjVZ4dwZwkhJHzrmFd/J8tI+sDPZZQrmAebiZ57XLusMYetqjDPhIL/6fK4X03DIooUCrlFMAY05uYFzHrw9tKIvqHKhMkwpi8NlWW1unS0r1eC4L3LDVoaGjQM2fOVA88sODJ1sbmQ9miNZPJCiGETZzvxAxLvgshik006XT6bY55SUkJVixfoW65+eZoy2nbzPnjhZdcSUR23ux5XvX06f7um5Utv/hleuK7T4o3tZBRARI9QtouSO60knuF5F4luQuSO43kLqs4L6UoKIUwJdENBS2kI7ZC3HdAgBDrGB6EJJAQSHmAUISukDDMg1naBXnl62jpsvbQe9oxaIQfGCQKAABwdWPCGPM2IU8EsH/os3+bY+IPJP2+zY2t2ZJUySFyTep9i80SJXjooYVLe7q7DmW23VIqYa21jqLd+R9BEBQzxf2vhZkRhiGM0UUi3+XLl3t///v1UeXw4d84+ye1l8+ZPyeqnjvXPL66u/XX07j64lfsJZe8hmvL0hx6sK4lkZikYFKSyVombZmYLTnGOQsTMQjWNdQLco32iOOpxBDkqFcIrvAttC4OnJUw9zWRvPRlNAphD3mwDY8NJuEHBokCxCYQAFEh+vXtFqM7/eqCkp0h8QkcwWu8a1gLG4ZWKDUiTK1JqP3eM1ueKMHChf9e2pPvPjKKol4plWBmmzjBCTcpgKIPkvxcZK2OTTSlFF577TXv/vvu1VMmb/7NM8/60dUJ79AZryKaPQ5/Pud58/rc5/CYIBLEriBNCOfAJlWjQnC8w7jqUili4dauddH3XHQn1M7ZdTkwC2MtggjIEJvHOyD/vpzX9LI96O4WPDnYhB8YJAoQm0CwzG+QFEUH0yW6HJKdoL9vkCAKo+Lftthu6yYlSPhBMOqDnj9Rgvvuvruhp7vrCEHUK4QkHUU24R5N/IEkcVYoFIqhUfd7W5xj4Ps+Vq1cqR5qaIi2mLrFCd857XvXx7xDYv4a5E8agT/99gX76G+X8VVSwnoKHDLYWBeqDOO+glDHtJDM8UglghJxRWdMtmXZ2fyRBSLtOrpGZ2AebCF52atYZUgd9Eg7nhuMwg8MEgUAHN05mMuj9ZJdwDpmuH6McG/LCgMxd2gY6kcXPbwXCTFdStn7Yc7f0NCgZ8yY4TU0LFhUKOSPttZEEIKstTaKwuL8AmNssTyj/84UhmFsDrnr81MptLa2eEuXPB5NnDT5yyedfMr1Me8QXdmK7t/vhZ/+7AX+xd/X0Pm+IMsaVHB1gLAgFAxijqFY2OOB7hAEbYG8djsH4pp+bRmBAVIE8+/VJP/6Gq2WSh14f1u4bLAKPzBoFCAFgFkIGg3nDL9tte+PROD6N8nEAknMyLd3tH0dwJ7M2Q895G3p0qXRzJkz1T333HFfV0/HUUbryLrolAXeRsn4NrrGIucn1vUyMzM838dbb73lPbV0aTRx4uQvf+krx9flcjlZW1srfvAoQkl49YzHjX/mU/yqB/RJIoqYWMe9uQwgSMhrCShYcqUNBCQz7UILhJYRGUJlGnphI8krXuPlKd/sv6AlfLkakINV+IFBowABrGEi0FOC1g1mSCIsCRyTw7r8QOIDOKEDlFKpdCb9FBF1MkfD4rd9qIrZomPc0HB3e1vr0YJIK+W56R0x+pdTJwqZXFfikDMz8n19AIC33nrLe/rJJ6IttphWfdyXvnprLpdT1dXV2JdnqsNG4U9/fYNv/8PrPH9Yhtp8yWTiER5hPGkpjHcDInYrvWYwXMzfGMfFW6qgb3sL6q8r+NVUxh54dzNeqwbk/3o9/8fFIFEAgMGW2bQwwNYaa4yxzhEly8w2FkDLbC0AK4Qofnd/IysIJgzDMULI4Z5nPzLvQqIES5YsvougvwjASCmJmY211sahUpsAgA2CwAohrJTKCkE2iiKrjbGRjqzyPNvZ2SlffeXlYMuttjns2Oov3VRfX0+LeJG5sxlrvzSNz/v1C/zaGU/xyylFXUSgwDCTQHFmteuGdt+ZCdq4EgjDQFmK9L+boK5/nZ8LpK1a0ITXNwXhBwaPAnhCSTKWDwJDCiGF53nC932hlC+klMLzfAFASKmEUkoIIQS5sZJCKfc7Y2zKGru953nC8S98dCQ+wb333vuv7t7uY6xlLYSUUkohpRRCCKGUJ4hIEJHwfXd9lq0wxgo3m4vi1ymRTmdEc3Nz6vnnn8PkKVscccSRX7idiCQA+tur3F1diWtveYM7Tn0cga8oX6KItAUXLDiyYGPB3QVwIWIuGHBvCLaWUaqgb3+L1HWv84tlKT7ksTas2lSEHxgkmWAb2JTvp6SOok5jTJsgQczMIMDENjURMVtmEAsbsxqAGSQJvvKJBLEQVKaU2l1rbVmpj90stHTp0mjGjBneo/954F977rnfl8sryn5NRDDWCqO1m2xJMp5e6cKxOoqKpplUCkIQjGEUCnkAQOOaNZROpcMtttjikOrqLy9+5pknZr30EnXXt6PzpK255saX7N//D7TNBbtihGQMC4xrZ0x8AhDBWNcIlFXQd66GuuENfrY0xYfe04I1m5LwA4NEASJwKQEthXzh4HyqcxkAZDIZXvL4UiAe3YZ11ZXx/2fQjBnAksVLMWPGDOTzeRpWXlIeBvm/KS91iNVmo9B6LF26NKqtrRW5XO4mALfOmDFDLF26NLkmzJgxI3kd+v+MpcBSLF3/cDxjxgz6+/XX0GmnnTZ6+PARP956m+1vmjhx4rcqKyvfurK+vvvCafzFM17lb5f5tPuOFXR0oFEQAqUEzjNQgHAdXmSZuzWNXdLKz07O8kHXNaJpUxP+wQACgC23227bbbbZZq+NccBR06eXbrfjrku22GL6Z+NfbZSJn7W1tQNibn7uc5/bYe+99z0aqJbV7lpJEDDRF9+flsHDU1J4YPM0PTIlhf9M9PHQeB8PTfKpYYJP9++YpRu+NgajAaB6I93npwQEACeddFLZf/tCNjYSIaOP8AXACem0adNS06ZNK+93rI2Fj3Jd7/rFzLSBqTQuphvPFnivr/Xfswlh0CkAYeM59J8qYYh3lne75vdVomTH+IQu9X8Jg04BNjb67QpDGIQoKsCgcIIHAJ8KZuMhfHwMljzAEIbwkTCkAEPYpDGkAEPYpDGgPkBdXZ2srq7ekDNpiOjD2tq0cOFCOWvWrA2+oL6+nmtqav7ryZyFtTPVrAE8/iIAs3INhob8lU0DtbW1Yn3WtyEAtbVDu/hHwMBGgeLUv7300ksP23nnnXfp6+uzRCTienjreZ544oknbjrrrLNeTF77Xserq6uT8aru33XXXd8uKysrCcOQent7M5lMJh83tuthw4aVPPbYY03f/e53L2Vm+xF2mI0Fr/4bW357XCXKCqFla0DFCXhJWWYithaA734nrHXDdoX7+9taGbR21G1SsRACnaFd8cXnx96WyzX01FVXy5r6+v/6rvdpxIAsqcysiEgvXLjwxlmzZn2xt7e3yMKWzNm67rrrTvz6179+zQZGiRaR/H327NmTZs+efe0OO+ywv6c8MNb1+xIR0uk0XnjhhcZHH330KytWrFgEOF7Pgbi/90BcZ1Qx7IWvitZtygLhJkvEf7HsulEEXCrWUsxFGL/GwP1McakQwSmDRdzOFf8sHIvzC1HJU79tmfjFq25e8vrCWqiq3OBtXNnIIMTs0APqAxBRVxRFuqenp0gp7vu+TqVSipnfr+OKYoY0/bvf/e7AY4455pqJEyeOb25sipTnEQgQQlhBRMzwlixZct1+++13KoDumBfoHat/XV2dHDVq1EZR+lmzZr2HD9OpVeivQZcek4+YpWSy1p1WEIHi8aIEV7LgSHoYbN1ob5KOhNZyPH40ZmeTyaguIhAzb+vldz5nBP6z5ex9jqnKPfwI10LReyjBxrz/d+Mwra6ulqeeeuq7Hr+5uflD+Wbvda2LFi2yG2txG1AFCIJARlGkAEAppYxxjeHKYYMfRG1trZg7dy4Tkb755pu/vddee/25oqJCtra2GuV7XtxSaCoqKvzW1la79PGlZx151JG/JyLccMMNkoje8aCZWbzb7z8O3sN8Y22Y4QPCE7Bx84kUACRg3Jg5R08iAaMBNgQZzwiLtICU8dDsmLFBKYKxTAwIZkGwQBRYswW1jj2pHAtGfmvqVyn3+i1cC0E5rH9NFM9C2Gj3H7ebvm2hqa+vN/Hs5XdF/Bm8r+DGC9gnYtINeCa4P0lU/zbEDSGx93O5nLj//vsv2XPPPU8pFArc0dFhpZQybnHU5eXl6s0331xx1113nXT66affz8wSgH2XB0fxA7V/+MMfPjNhwoQt8vm8+0VMVtWfJzRhdk4oDIVwnJ5JL6/neez7vj3vvPPuyOVyHfEu9Y5zKk+NgGdUKmJAxWaPZGfmGAaUG4IHAjwPbi2N/QLfjY93f0/K3ZjgMVCIGFZYVgQSBBmG1o5ubsx8IVt+0/iTNjsVudXz+itBbW2tOO+88ywR4ZprrjmioqJieE9PDycDxRMayf5TbRL0p5iMPz+OyX3zX/nKV24iIo4jfZaI+Pzzzz9yl112GdPU1JSX0hEVK6U4k8lQR0dHGxHdHitBPAb8HUgUla+88sqjKioqKsIwZBtvn1prPWbMmJIHH3zwlZ///OeLPoj/+H4YaBOoKPD9hak/j35/JPb+YYcdNvb888+/brvttjuws7NTa62l53kiiiL2fd+Wl5erJ5988t7f//73x9fX169duHChIqJ32/qLwn/bbbf9eLfdZvy8vLzibQq4Po8/gCJtejLkov8ADKM1SkpLMX369GUXX3zxF4noxXfxY4Ln2uma9l4xgiLTnrdUqjxKWQj22Hbltc1IKYRhC2MBKQXiS4CFc5SZAUhnEllrCSwKaeYRk0vp0M3KoILIMoOINUSvFXZkoVtsBX3BxOkT6lblVrUxQHNra+m8886zzKwWLVp02e67734i4KY6Mq2bbQagOD4q6VdOGvP79y4n31OpFJ544om7TzjhhK/U1NS0z5s3z2NmffHFF/eNnzDhD4cddlhZa0sr/JTvmLgjx34xfvz43xDRD/stVsUPIt71QUT2zjvvvGjfz+z7Hc/3ikwZWmuMGDECTzzxRGNJScmRzExz5879cAL5SYGZFQDcdddd13R1dfHKlSujt956i1euXMlr1qyJ2tra+Prrr/8y4IQeTlAVAPzmN7/Z+4UXXlheKBR49erV0VtvvcVr1qzh1atX6/b2dm5uauK77777N4gd+A2UBANAssiJRYsWXZ7P57m1tdWsXbs2Wr16dbR27dpw7dq1YVNTU9jY2Bg2NjaGra2txZ+bm5vDlpaW4t+am5vDpqamaPXq1XrNmjVhoVDgl19+ufmSSy45IL7nTyQcee4O6f2WH6Oawy9L23OctD3VgruqhTVflvbVGq99xx1LRgNAXXW1BIADDzxwxDPPPLPAWstNTU1RY2Nj1NraGsX3E7a0tIQtLS1hU1NT2NbWVvy5tbU1bG5uDtesWRO+9dZbYVNTU9jU1BQ1NzdHzc3NITPzc8899/Spp546DVj3OXzrq9+a8Nxzzy01xnBzc3O+sbFRr1m9JmpsbIyCIOCHH3r44vh5UdIjUVtbK2JuV/znP/+5JooiXr16ddjU1BStXbs2Wrt2bb5QKPBjjz22cKeddhqWvP9jPMZPvhguWVWSnSBZfZqbmwUzGyLSdXV1s/fYY48Lhw8fnm5qajKe5ykAMMboYcOGqTVr1nQ88sgjs48//vj6eAUQG3CsiJmppqYmfeaZZ96wxx57HNnS0qKjKJLxiCNWSpEQAslX/90qWe3WJ9EKwzChO5RtbW1mzJgxIw877LC7rr/++i8BuLVfuDa14JjhF04ZpipZgKENRcbYDAvxhvZenbWmsRazACz7EEmsJhBGQ1B94cGdKr2bvjgJc0IDDesWDhsxwbIQwk23qK6r45//4hdjDj744H9vt912O7a0tGhrbfI8OZ1Ov80EjGcWvI0uPkHCn5rP51kpRcYYrF27Vk+dusWOp59++oPbbbfd56urq5fU1dX5NTU1q5577bmDL7nkklu33Xbb/dra2iIi8mJyYL3bHjNObWhoKCeibwgh9MKFC9UBBxygc7mc/+CDD9bvsssun29ra9PWWi/mUdXDhg1LP/HEE7fvs88+NQDydXV17+rnfRQMuAIk5o4bUG2LfDhhGIKZhZQyrKmpEQ0NDb/bfvvtzzTGoLOz0yZ8+0RkKyoq1Msvv/xsfX39l375y18ui8OsBniHswcAqK2tJSKyP/jBD8aOHDnyyMbGRhMLPyWU5CtWrOguFAp9vu+T53kMrDOB+lOZx0JC1louKysbU1pamgiJ7OrqCseMGeOPGTPmK0R0y5IlSwScle+N013HT404A0OAAULN8FOMLuO/QA04hxc5K+NDPcuZUFwLcdt/YBFTOiZRIcMAx1Ht+BnbefPm7brVVlvtuGbNmgiA56jaNYQQtGrVqvZCoRBKKUkIwf1JhZOEY0ztSL7vszZGDCsvH5XJZN15AdXZ2RluvfVWY1944YXPE9HjCxcutHV1dfK4445r23XXXQ99+OGH6/bYY48jWltbdRAECoBqb++I9txzz689/vjjw77whS/UVFVV5ceMGVNy11133bzddtsd0tzcHBGRB4A9zzPpdFo98sgj8w844IBThBB87rnnbmjR+0gYUAVIVtP+RFT9VlVFRParX/3qhNNPP/2q7bbb7qCOjg6jtRZCCBE7nNb3fbF06dIbZs2a9S0APe9h778bbD6fL2Sz2bSUkq21NpvNilWrVi0755xzDrnjjju68QFKCSorK0V7e7u99NJLa4444ojLAVhrHXNDGIYMYH0WOSaBtqDAY3pCZjCIAFPBLLWxHR/qIa4HysHeelASLSLnN8fMbgYWpf1eO3z48J44CSljJ96UlZXJp5566q5vfetbx7/88ssRNrCI9EdFRYXs7Oy0N9944w8POPDAHwdhaGI7XnR397C1Np+8NqFw/NnPfpbfZ599jrrvvvuu3meffb5ujNHx4BKvvb0t2nnnnY+4+eab/3333Xd/75BDDrlg2rRp+zY2NmoppcfMLKVkIlINDQ2/+PznP39OYmJ+kCjSh8GA262JgxmGIQAUSaAKhULLxfMu3v3cc899ZJtttjmotbVVW2tlEh5lZuN5nnjggQcumTVr1peYOV9dXS3fK2m2PtLp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"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:Arial,'Helvetica Neue',sans-serif;background:#f0f4f7;color:#374151;font-size:13px;}
  @media print{
    body{background:#fff;}
    .no-print{display:none!important;}
    .page-break{page-break-before:always;}
    @page{margin:0.6in;}
  }
</style>
</head>
<body>
<div style="max-width:1100px;margin:0 auto;padding:28px 24px;">

  <!-- PRINT BAR -->
  <div class="no-print" style="background:#1c2333;color:#e2e8f0;padding:10px 18px;border-radius:6px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:13px;font-weight:600;">\u{1F4C4} Professional Report \u2013 Ready to Print or Save as PDF</span>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()" style="background:#4a90a4;border:none;color:#fff;padding:7px 16px;border-radius:5px;cursor:pointer;font-size:12px;font-weight:600;">\u{1F5A8} Print / Save PDF</button>
      <button onclick="window.close()" style="background:#374151;border:none;color:#e2e8f0;padding:7px 14px;border-radius:5px;cursor:pointer;font-size:12px;">\u2715 Close</button>
    </div>
  </div>

  <!-- HEADER -->
  <div style="background:${REPORT_COLORS.headerBg};color:#ffffff;padding:22px 28px;border-radius:6px 6px 0 0;margin-bottom:0;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <div style="font-size:10px;letter-spacing:2px;color:#94a3b8;font-weight:600;margin-bottom:4px;text-transform:uppercase;">KoDox Systems LLC \xB7 Construction Management Report</div>
        <div style="font-size:22px;font-weight:700;letter-spacing:-.3px;margin-bottom:2px;">${title}</div>
        ${subtitle ? `<div style="font-size:13px;color:#94a3b8;margin-top:4px;">${subtitle}</div>` : ""}
      </div>
      <div style="text-align:right;">
        <div style="font-size:14px;font-weight:700;color:#e2e8f0;">${co}</div>
        <div style="font-size:11px;color:#64748b;margin-top:3px;">Prepared: ${dt}</div>
        <div style="font-size:10px;color:#475569;margin-top:2px;">CONFIDENTIAL</div>
      </div>
    </div>
  </div>

  <!-- ACCENT BAR -->
  <div style="height:4px;background:linear-gradient(90deg,${REPORT_COLORS.accent},#6ba5b8,#a0c4d0);margin-bottom:20px;border-radius:0 0 3px 3px;"></div>

  ${cardsHTML}
  ${sectionsHTML}

  <!-- FOOTER -->
  <div style="border-top:1px solid ${REPORT_COLORS.border};margin-top:28px;padding-top:14px;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:10px;color:${REPORT_COLORS.textMuted};">${co} \xB7 KoDox Systems LLC \xB7 v4.0</div>
    <div style="font-size:10px;color:${REPORT_COLORS.textMuted};">Generated ${dt} \xB7 CONFIDENTIAL</div>
  </div>

</div>
</body>
</html>`;
      }
      function openReport(html) {
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, "_blank");
        if (!win) alert("Please allow pop-ups to view the report.");
      }
      function reportDailyLogs(logs, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const rows = logs.sort((a, b) => b.date.localeCompare(a.date));
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const enriched = rows.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const html = buildReport({
          title: "Daily Field Log Report",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Log Entries", value: rows.length },
            { label: "Date Range", value: rows.length ? `${rows[rows.length - 1].date} \u2013 ${rows[0].date}` : "\u2014" },
            { label: "Projects Covered", value: [...new Set(rows.map((r) => r.projectId))].length },
            { label: "Total Man-Hours", value: rows.reduce((s, r) => s + (Number(r.totalHoursDay) || Number(r.crewCount) || 0), 0) + " hrs" }
          ],
          sections: [{
            title: "Daily Log Entries",
            rows: enriched,
            note: "All field conditions, work performed, and safety notes as recorded by superintendent.",
            cols: [
              { key: "date", label: "Date", type: "date" },
              { key: "projectName", label: "Project", type: "bold" },
              { key: "location", label: "Location / Area", type: "text" },
              { key: "weather", label: "Weather", type: "text" },
              { key: "tempLow", label: "Low \xB0F", type: "text" },
              { key: "tempHigh", label: "High \xB0F", type: "text" },
              { key: "superintendent", label: "Superintendent", type: "text" },
              { key: "foreman", label: "Foreman", type: "text" },
              { key: "companyName", label: "Company", type: "text" },
              { key: "manpower", label: "Manpower", type: "text" },
              { key: "hoursWorked", label: "Hrs/Worker", type: "text" },
              { key: "totalHoursDay", label: "Total Man-Hrs", type: "text" },
              { key: "workPerformed", label: "Work Performed", type: "text" },
              { key: "rentalEquipUsed", label: "Rental Equip. Used", type: "text" },
              { key: "rentalHoursUsed", label: "Equip. Hours", type: "text" },
              { key: "rentalInspectionTime", label: "Insp. Time", type: "text" },
              { key: "rentalComments", label: "Equip. Comments", type: "text" },
              { key: "visitors", label: "Visitors / Insp.", type: "text" },
              { key: "delays", label: "Delays / Issues", type: "text" },
              { key: "safety", label: "Safety Notes", type: "text" },
              { key: "notes", label: "Additional Notes", type: "text" }
            ]
          }]
        });
        openReport(html);
      }
      function reportDelays(delays2, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const rows = delays2.sort((a, b) => b.dateReported.localeCompare(a.dateReported));
        const enriched = rows.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const totalDays = rows.reduce((s, r) => s + (Number(r.daysLost) || 0), 0);
        const totalCost = rows.reduce((s, r) => s + (Number(r.costImpact) || 0), 0);
        const active = rows.filter((r) => r.status === "Active").length;
        const html = buildReport({
          title: "Delay Log Report",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Delays Logged", value: rows.length },
            { label: "Active Delays", value: active, sub: "currently impacting schedule" },
            { label: "Total Days Lost", value: totalDays + " days", sub: "cumulative schedule impact" },
            { label: "Total Cost Impact", value: totalCost ? "$" + Number(totalCost).toLocaleString() : "$0", sub: "documented cost claims" }
          ],
          sections: [
            {
              title: "Active & Pending Delays",
              rows: enriched.filter((r) => r.status === "Active" || r.status === "Pending"),
              note: "These delays are currently impacting the project schedule and may support time extension claims.",
              cols: [
                { key: "dateReported", label: "Date Reported", type: "date" },
                { key: "projectName", label: "Project", type: "bold" },
                { key: "delayType", label: "Delay Type", type: "text" },
                { key: "description", label: "Description", type: "text" },
                { key: "trade", label: "Trade", type: "text" },
                { key: "reportedBy", label: "Reported By", type: "text" },
                { key: "daysLost", label: "Days Lost", type: "text" },
                { key: "revisedCompletion", label: "Revised Completion", type: "overdue" },
                { key: "noticeGiven", label: "Notice Given", type: "notice" },
                { key: "costImpact", label: "Cost Impact", type: "currency" },
                { key: "status", label: "Status", type: "status" },
                { key: "notes", label: "Notes", type: "text" }
              ]
            },
            {
              title: "Resolved & Closed Delays",
              rows: enriched.filter((r) => r.status === "Resolved" || r.status === "Closed"),
              cols: [
                { key: "dateReported", label: "Date Reported", type: "date" },
                { key: "projectName", label: "Project", type: "bold" },
                { key: "delayType", label: "Delay Type", type: "text" },
                { key: "description", label: "Description", type: "text" },
                { key: "trade", label: "Trade", type: "text" },
                { key: "daysLost", label: "Days Lost", type: "text" },
                { key: "noticeGiven", label: "Notice Given", type: "notice" },
                { key: "costImpact", label: "Cost Impact", type: "currency" },
                { key: "status", label: "Status", type: "status" },
                { key: "resolution", label: "Resolution", type: "text" }
              ]
            }
          ]
        });
        openReport(html);
      }
      function reportTracker(tasks, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const rows = tasks.filter((t) => t.startDate);
        const enriched = rows.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const complete = rows.filter((t) => t.status === "Complete").length;
        const delayed = rows.filter((t) => t.status === "Delayed").length;
        const avgPct = rows.length ? Math.round(rows.reduce((s, t) => s + (Number(t.pct) || 0), 0) / rows.length) : 0;
        const trades = [...new Set(rows.map((r) => r.trade))].sort();
        const sections = trades.map((trade) => ({
          title: trade + " Activities",
          rows: enriched.filter((r) => r.trade === trade).sort((a, b) => a.startDate.localeCompare(b.startDate)),
          cols: [
            { key: "actId", label: "ID", type: "mono" },
            { key: "projectName", label: "Project", type: "bold" },
            { key: "description", label: "Activity", type: "text" },
            { key: "assignee", label: "Assignee", type: "text" },
            { key: "startDate", label: "Start", type: "date" },
            { key: "endDate", label: "Finish", type: "overdue" },
            { key: "duration", label: "Dur (days)", type: "text" },
            { key: "pct", label: "% Complete", type: "pct" },
            { key: "status", label: "Status", type: "status" },
            { key: "notes", label: "Notes", type: "text" }
          ]
        }));
        const html = buildReport({
          title: "Project Activity Tracker",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Activities", value: rows.length },
            { label: "Complete", value: complete, sub: `${Math.round(complete / Math.max(1, rows.length) * 100)}% of total` },
            { label: "Delayed", value: delayed, sub: "require attention" },
            { label: "Avg % Complete", value: avgPct + "%", sub: "across all activities" }
          ],
          sections
        });
        openReport(html);
      }
      function reportLookahead(tasks, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const todayD = /* @__PURE__ */ new Date();
        todayD.setHours(0, 0, 0, 0);
        const fmtD = (d) => {
          const x = new Date(d);
          return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
        };
        const addD = (d, n) => {
          const r = new Date(d);
          r.setDate(r.getDate() + n);
          return r;
        };
        const allSections = [];
        for (let wi = 0; wi < 6; wi++) {
          const wStart = fmtD(addD(todayD, wi * 7));
          const wEnd = fmtD(addD(todayD, wi * 7 + 6));
          const s = new Date(wStart), e = new Date(wEnd);
          const label = `${s.toLocaleDateString("en-US", { month: "short", day: "numeric" })} \u2013 ${e.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
          const wTasks = tasks.filter((t) => {
            if (selProj && t.projectId !== selProj) return false;
            return t.startDate && t.endDate && t.startDate <= wEnd && t.endDate >= wStart;
          });
          const enriched = wTasks.map((r) => ({ ...r, projectName: pN(r.projectId) }));
          allSections.push({
            title: `Week ${wi + 1}${wi === 0 ? " (Current Week)" : ""}: ${label}`,
            rows: enriched.sort((a, b) => a.startDate.localeCompare(b.startDate)),
            cols: [
              { key: "projectName", label: "Project", type: "bold" },
              { key: "trade", label: "Trade", type: "text" },
              { key: "actId", label: "Activity ID", type: "mono" },
              { key: "description", label: "Activity", type: "text" },
              { key: "assignee", label: "Assignee", type: "text" },
              { key: "startDate", label: "Start", type: "date" },
              { key: "endDate", label: "Finish", type: "overdue" },
              { key: "pct", label: "% Complete", type: "pct" },
              { key: "status", label: "Status", type: "status" },
              { key: "notes", label: "Notes", type: "text" }
            ]
          });
        }
        const allWeekTasks = allSections.reduce((s, sec) => s + sec.rows.length, 0);
        const html = buildReport({
          title: "6-Week Look-Ahead Schedule",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Activities", value: allWeekTasks, sub: "next 6 weeks" },
            { label: "This Week", value: allSections[0].rows.length, sub: "activities starting" },
            { label: "Projects", value: [...new Set(tasks.filter((t) => selProj ? t.projectId === selProj : true).map((t) => t.projectId))].length },
            { label: "Report Date", value: todayD.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
          ],
          sections: allSections
        });
        openReport(html);
      }
      function reportPunchList(punchList, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const enriched = punchList.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const open = punchList.filter((r) => r.status === "Open").length;
        const html = buildReport({
          title: "Punch List Report",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Items", value: punchList.length },
            { label: "Open", value: open, sub: "require action" },
            { label: "High Priority", value: punchList.filter((r) => r.priority === "High").length, sub: "items" },
            { label: "Complete", value: punchList.filter((r) => r.status === "Complete" || r.status === "Closed").length, sub: "items" }
          ],
          sections: [
            {
              title: "Open Items",
              rows: enriched.filter((r) => r.status === "Open" || r.status === "In Review").sort((a, b) => a.dueDate ? a.dueDate.localeCompare(b.dueDate || "") : 0),
              note: "Items require completion before final inspection sign-off.",
              cols: [{ key: "projectName", label: "Project", type: "bold" }, { key: "area", label: "Area / Unit", type: "text" }, { key: "trade", label: "Trade", type: "text" }, { key: "description", label: "Description", type: "text" }, { key: "assignee", label: "Assignee", type: "text" }, { key: "dueDate", label: "Due Date", type: "overdue" }, { key: "priority", label: "Priority", type: "priority" }, { key: "status", label: "Status", type: "status" }, { key: "notes", label: "Notes", type: "text" }]
            },
            {
              title: "Completed & Closed Items",
              rows: enriched.filter((r) => r.status === "Complete" || r.status === "Closed"),
              cols: [{ key: "projectName", label: "Project", type: "bold" }, { key: "area", label: "Area", type: "text" }, { key: "trade", label: "Trade", type: "text" }, { key: "description", label: "Description", type: "text" }, { key: "assignee", label: "Assignee", type: "text" }, { key: "dueDate", label: "Due Date", type: "date" }, { key: "status", label: "Status", type: "status" }]
            }
          ]
        });
        openReport(html);
      }
      function reportRFIs(rfis, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const enriched = rfis.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const html = buildReport({
          title: "Request for Information (RFI) Log",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total RFIs", value: rfis.length },
            { label: "Open / Pending", value: rfis.filter((r) => r.status === "Open" || r.status === "Pending").length, sub: "awaiting response" },
            { label: "Answered", value: rfis.filter((r) => r.status === "Answered").length },
            { label: "Closed", value: rfis.filter((r) => r.status === "Closed").length }
          ],
          sections: [
            {
              title: "Open & Pending RFIs",
              rows: enriched.filter((r) => r.status === "Open" || r.status === "Pending").sort((a, b) => a.dueDate ? a.dueDate.localeCompare(b.dueDate || "") : 0),
              note: "RFIs awaiting response. Overdue dates highlighted.",
              cols: [{ key: "rfiNumber", label: "RFI #", type: "bold" }, { key: "projectName", label: "Project", type: "text" }, { key: "subject", label: "Subject", type: "text" }, { key: "submittedBy", label: "Submitted By", type: "text" }, { key: "submittedDate", label: "Submitted", type: "date" }, { key: "dueDate", label: "Due Date", type: "overdue" }, { key: "status", label: "Status", type: "status" }, { key: "notes", label: "Notes", type: "text" }]
            },
            {
              title: "Answered & Closed RFIs",
              rows: enriched.filter((r) => r.status === "Answered" || r.status === "Closed"),
              cols: [{ key: "rfiNumber", label: "RFI #", type: "bold" }, { key: "projectName", label: "Project", type: "text" }, { key: "subject", label: "Subject", type: "text" }, { key: "submittedDate", label: "Submitted", type: "date" }, { key: "answeredDate", label: "Answered", type: "date" }, { key: "answeredBy", label: "Answered By", type: "text" }, { key: "status", label: "Status", type: "status" }, { key: "response", label: "Response", type: "text" }]
            }
          ]
        });
        openReport(html);
      }
      function reportSubmittals(submittals, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const enriched = submittals.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const html = buildReport({
          title: "Submittal Log",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Submittals", value: submittals.length },
            { label: "In Review", value: submittals.filter((r) => r.status === "In Review").length, sub: "awaiting response" },
            { label: "Approved", value: submittals.filter((r) => r.status === "Approved").length },
            { label: "Rejected", value: submittals.filter((r) => r.status === "Rejected").length, sub: "require resubmission" }
          ],
          sections: [{
            title: "All Submittals",
            rows: enriched.sort((a, b) => a.requiredDate ? a.requiredDate.localeCompare(b.requiredDate || "") : 0),
            note: "Submittals sorted by required date. Overdue dates highlighted in red.",
            cols: [{ key: "specSection", label: "Spec \xA7", type: "mono" }, { key: "projectName", label: "Project", type: "bold" }, { key: "description", label: "Description", type: "text" }, { key: "submittedBy", label: "Submitted By", type: "text" }, { key: "reviewer", label: "Reviewer", type: "text" }, { key: "submittedDate", label: "Submitted", type: "date" }, { key: "requiredDate", label: "Required By", type: "overdue" }, { key: "returnedDate", label: "Returned", type: "date" }, { key: "status", label: "Status", type: "status" }, { key: "notes", label: "Notes", type: "text" }]
          }]
        });
        openReport(html);
      }
      function reportRental(rental, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const enriched = rental.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const active = rental.filter((r) => r.status === "On Rent");
        const totalCost = rental.reduce((s, r) => s + (Number(r.totalCost) || 0), 0);
        const html = buildReport({
          title: "Rental Equipment Log",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Rentals", value: rental.length },
            { label: "Currently On Rent", value: active.length, sub: "active rentals" },
            { label: "Combined Daily Rate", value: "$" + active.reduce((s, r) => s + Number(r.dailyRate || 0), 0).toLocaleString(), sub: "per day" },
            { label: "Total Est. Cost", value: "$" + totalCost.toLocaleString(), sub: "all rentals" }
          ],
          sections: [
            {
              title: "Active Rentals",
              rows: enriched.filter((r) => r.status === "On Rent" || r.status === "Reserved"),
              cols: [{ key: "projectName", label: "Project", type: "bold" }, { key: "equipName", label: "Equipment", type: "text" }, { key: "equipType", label: "Type", type: "text" }, { key: "vendor", label: "Vendor", type: "text" }, { key: "poNumber", label: "PO #", type: "mono" }, { key: "serialNo", label: "Serial/Unit #", type: "mono" }, { key: "rentStart", label: "Rent Start", type: "date" }, { key: "rentEnd", label: "Rent End", type: "overdue" }, { key: "dailyRate", label: "Daily Rate", type: "currency" }, { key: "weeklyRate", label: "Weekly Rate", type: "currency" }, { key: "totalCost", label: "Est. Total", type: "currency" }, { key: "jobsite", label: "Jobsite", type: "text" }, { key: "fuelType", label: "Fuel", type: "text" }, { key: "status", label: "Status", type: "status" }, { key: "notes", label: "Notes", type: "text" }]
            },
            {
              title: "Off Rent / Returned",
              rows: enriched.filter((r) => r.status === "Off Rent" || r.status === "Cancelled"),
              cols: [{ key: "projectName", label: "Project", type: "bold" }, { key: "equipName", label: "Equipment", type: "text" }, { key: "vendor", label: "Vendor", type: "text" }, { key: "rentStart", label: "Start", type: "date" }, { key: "rentEnd", label: "End", type: "date" }, { key: "totalCost", label: "Final Cost", type: "currency" }, { key: "returnCondition", label: "Return Condition", type: "text" }, { key: "status", label: "Status", type: "status" }]
            }
          ]
        });
        openReport(html);
      }
      function reportFinancials(costCodes, transactions, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const totalBudget = costCodes.reduce((s, c) => s + Number(c.budgeted || 0), 0);
        const totalSpent = costCodes.reduce((s, c) => s + Number(c.spent || 0), 0);
        const totalVar = totalBudget - totalSpent;
        const enrichedCC = costCodes.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const enrichedTx = transactions.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const html = buildReport({
          title: "Project Financial Report",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Budget", value: "$" + totalBudget.toLocaleString("en-US", { minimumFractionDigits: 2 }) },
            { label: "Total Spent", value: "$" + totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 }), sub: `${totalBudget > 0 ? Math.round(totalSpent / totalBudget * 100) : 0}% of budget` },
            { label: "Variance", value: (totalVar >= 0 ? "+$" : "-$") + Math.abs(totalVar).toLocaleString("en-US", { minimumFractionDigits: 2 }), sub: totalVar >= 0 ? "under budget" : "OVER BUDGET" },
            { label: "Cost Codes", value: costCodes.filter((c) => Number(c.spent || 0) > Number(c.budgeted || 0)).length + " over budget", sub: "of " + costCodes.length + " total" }
          ],
          sections: [
            {
              title: "Cost Code Budget Summary",
              rows: enrichedCC.sort((a, b) => a.code ? a.code.localeCompare(b.code || "") : 0),
              note: "Variance shown as positive (under budget) or negative (over budget).",
              cols: [{ key: "code", label: "Cost Code", type: "mono" }, { key: "projectName", label: "Project", type: "bold" }, { key: "description", label: "Description", type: "text" }, { key: "category", label: "Category", type: "text" }, { key: "budgeted", label: "Budget", type: "currency" }, { key: "committed", label: "Committed", type: "currency" }, { key: "spent", label: "Spent", type: "currency" }, { key: "variance", label: "Variance", type: "variance" }, { key: "status", label: "Status", type: "status" }, { key: "notes", label: "Notes", type: "text" }]
            },
            {
              title: "Transaction Log",
              rows: enrichedTx.sort((a, b) => (b.date || "").localeCompare(a.date || "")),
              cols: [{ key: "date", label: "Date", type: "date" }, { key: "projectName", label: "Project", type: "bold" }, { key: "description", label: "Description", type: "text" }, { key: "vendor", label: "Vendor", type: "text" }, { key: "category", label: "Category", type: "text" }, { key: "type", label: "Type", type: "text" }, { key: "amount", label: "Amount", type: "currency" }, { key: "notes", label: "Notes", type: "text" }]
            }
          ]
        });
        openReport(html);
      }
      function reportActionItems(actionItems, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const enriched = actionItems.map((r) => ({ ...r, projectName: pN(r.projectId) }));
        const todayStr2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const html = buildReport({
          title: "Action Item Report",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total Items", value: actionItems.length },
            { label: "Open", value: actionItems.filter((r) => r.status === "Open").length, sub: "require action" },
            { label: "Overdue", value: actionItems.filter((r) => r.status === "Open" && r.dueDate < todayStr2).length, sub: "past due date" },
            { label: "Closed", value: actionItems.filter((r) => r.status === "Closed").length }
          ],
          sections: [
            {
              title: "Open Action Items",
              rows: enriched.filter((r) => r.status === "Open" || r.status === "In Review").sort((a, b) => a.dueDate ? a.dueDate.localeCompare(b.dueDate || "") : 0),
              note: "Action items sorted by due date. Items past due date are highlighted.",
              cols: [{ key: "projectName", label: "Project", type: "bold" }, { key: "description", label: "Description", type: "text" }, { key: "assignedTo", label: "Assigned To", type: "text" }, { key: "dueDate", label: "Due Date", type: "overdue" }, { key: "priority", label: "Priority", type: "priority" }, { key: "status", label: "Status", type: "status" }, { key: "notes", label: "Notes", type: "text" }]
            },
            {
              title: "Closed Items",
              rows: enriched.filter((r) => r.status === "Closed"),
              cols: [{ key: "projectName", label: "Project", type: "bold" }, { key: "description", label: "Description", type: "text" }, { key: "assignedTo", label: "Assigned To", type: "text" }, { key: "dueDate", label: "Due Date", type: "date" }, { key: "status", label: "Status", type: "status" }, { key: "notes", label: "Notes", type: "text" }]
            }
          ]
        });
        openReport(html);
      }
      function reportJSA(jsas2, projects, selProj, companyName2) {
        const proj = selProj ? projects.find((p) => p.id === selProj) : null;
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const enriched = jsas2.map((r) => ({ ...r, projectName: pN(r.projectId) })).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
        const highRisk = jsas2.filter((j) => j.riskLevel === "High").length;
        const html = buildReport({
          title: "Job Safety Analysis (JSA) Report",
          subtitle: proj ? proj.name : "All Projects",
          companyName: companyName2,
          summaryCards: [
            { label: "Total JSAs", value: jsas2.length },
            { label: "High Risk", value: highRisk, sub: "require extra controls" },
            { label: "Active", value: jsas2.filter((j) => j.status === "Active" || j.status === "Open").length },
            { label: "Completed", value: jsas2.filter((j) => j.status === "Completed").length }
          ],
          sections: [
            {
              title: "High Risk JSAs",
              rows: enriched.filter((r) => r.riskLevel === "High"),
              note: "High risk tasks require additional review and sign-off before work begins.",
              cols: [
                { key: "jsaNumber", label: "JSA #", type: "bold" },
                { key: "projectName", label: "Project", type: "text" },
                { key: "date", label: "Date", type: "date" },
                { key: "location", label: "Location / Area", type: "text" },
                { key: "taskDescription", label: "Task / Work", type: "text" },
                { key: "supervisor", label: "Supervisor", type: "text" },
                { key: "company", label: "Company", type: "text" },
                { key: "crew", label: "Crew", type: "text" },
                { key: "riskLevel", label: "Risk", type: "status" },
                { key: "hazards", label: "Hazards", type: "text" },
                { key: "controls", label: "Controls", type: "text" },
                { key: "ppeRequired", label: "PPE Required", type: "text" },
                { key: "emergency", label: "Emergency Proc.", type: "text" },
                { key: "reviewedBy", label: "Reviewed By", type: "text" },
                { key: "signatures", label: "Crew Signatures", type: "text" },
                { key: "status", label: "Status", type: "status" },
                { key: "notes", label: "Notes", type: "text" }
              ]
            },
            {
              title: "Medium & Low Risk JSAs",
              rows: enriched.filter((r) => r.riskLevel !== "High"),
              cols: [
                { key: "jsaNumber", label: "JSA #", type: "bold" },
                { key: "projectName", label: "Project", type: "text" },
                { key: "date", label: "Date", type: "date" },
                { key: "location", label: "Location / Area", type: "text" },
                { key: "taskDescription", label: "Task / Work", type: "text" },
                { key: "supervisor", label: "Supervisor", type: "text" },
                { key: "company", label: "Company", type: "text" },
                { key: "riskLevel", label: "Risk", type: "status" },
                { key: "hazards", label: "Hazards", type: "text" },
                { key: "controls", label: "Controls", type: "text" },
                { key: "ppeRequired", label: "PPE Required", type: "text" },
                { key: "status", label: "Status", type: "status" }
              ]
            }
          ]
        });
        openReport(html);
      }
      function parseCSVText(text) {
        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 2) return [];
        const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
        return lines.slice(1).map((line) => {
          const vals = [];
          let cur = "", inQ = false;
          for (const ch of line) {
            if (ch === '"') inQ = !inQ;
            else if (ch === "," && !inQ) {
              vals.push(cur);
              cur = "";
            } else cur += ch;
          }
          vals.push(cur);
          return Object.fromEntries(headers.map((h, i) => [h, (vals[i] || "").replace(/^"|"$/g, "")]));
        }).filter((r) => Object.values(r).some((v) => v));
      }
      function parseXLSX(buf) {
        try {
          const wb = XLSX.read(buf, { type: "array", cellDates: false });
          const ws = wb.Sheets[wb.SheetNames[0]];
          return XLSX.utils.sheet_to_json(ws, { defval: "", raw: true });
        } catch (e) {
          return [];
        }
      }
      function parseScheduleRows(rawRows) {
        if (!rawRows || !rawRows.length) return [];
        const headers = Object.keys(rawRows[0]);
        const find = (...cands) => headers.find((h) => cands.some((c) => h.toLowerCase().replace(/[\s_\-.]/g, "").includes(c.toLowerCase().replace(/[\s_\-.]/g, ""))));
        const isP6 = headers.some((h) => /early\s*start|early\s*finish|remaining\s*dur|budgeted\s*unit/i.test(h));
        const isMSP = headers.some((h) => /unique\s*id|outline\s*number|predecessors|resource\s*names/i.test(h));
        const isProcore = headers.some((h) => /procore|wbs\s*code|spec\s*section|submittal/i.test(h));
        const cId = isP6 ? find("activityid", "activity id") : isMSP ? find("id", "uniqueid", "task id") : find("activityid", "id", "wbsid", "taskid", "itemno", "wbs code");
        const cName = isP6 ? find("activityname", "activity name") : isMSP ? find("name", "task name", "taskname") : find("activityname", "taskname", "task name", "activity name", "name", "description", "task", "workitem", "scope", "item description");
        const cStart = isP6 ? find("earlystart", "early start", "plannedstart", "planned start", "baselinestart") : isMSP ? find("start", "start date") : find("start", "startdate", "plannedstart", "earlystart", "baselinestart", "begin", "scheduled start");
        const cEnd = isP6 ? find("earlyfinish", "early finish", "plannedfinish", "planned finish", "baselinefinish") : isMSP ? find("finish", "finish date") : find("finish", "end", "finishdate", "enddate", "plannedfinish", "earlyfinish", "due", "scheduled finish");
        const cDur = isP6 ? find("originalduration", "original duration", "remainingduration", "budgetedlaborunits") : isMSP ? find("duration") : find("duration", "dur", "days", "calendardays", "workdays");
        const cPct = find("percentcomplete", "complete", "progress", "pct", "%complete", "percentdone", "physicalpercent", "percent complete");
        const cTrade = find("trade", "subcontractor", "sub", "discipline", "responsibility", "resource names", "primaryresource");
        const cAssign = find("assignee", "assigned", "resource", "foreman", "responsible", "resource names");
        const cNotes = find("notes", "comment", "remarks", "note", "activitystatus");
        const cLaborHrs = isP6 ? find("budgetedlaborunits", "budgeted labor units", "remaininglaborunits") : null;
        const sourceLabel = isP6 ? "Primavera P6" : isMSP ? "MS Project" : isProcore ? "Procore" : "Excel/CSV";
        return rawRows.map((row, i) => {
          const name = cName ? String(row[cName] || "").trim() : "";
          if (!name || name.toLowerCase() === "activity name" || name.toLowerCase() === "description") return null;
          const rawS = cStart ? row[cStart] : null, rawE = cEnd ? row[cEnd] : null;
          const p = Number(String(cPct ? row[cPct] || 0 : 0).replace(/[^0-9.]/g, "")) || 0;
          const dur = Number(String(cDur ? row[cDur] || 0 : 0).replace(/[^0-9.]/g, "")) || 0;
          const tradeRaw = cTrade ? String(row[cTrade] || "").trim() : "";
          let sISO = excelDateToISO(rawS), eISO = excelDateToISO(rawE);
          if (sISO && !eISO && dur > 0) eISO = fmt(addDays(/* @__PURE__ */ new Date(sISO + "T00:00:00"), dur));
          if (!sISO && eISO && dur > 0) sISO = fmt(addDays(/* @__PURE__ */ new Date(eISO + "T00:00:00"), -dur));
          const trade = tradeRaw ? TRADES.includes(tradeRaw) ? tradeRaw : guessTrade(tradeRaw + " " + name) : guessTrade(name);
          const p6LaborHrs = cLaborHrs ? parseFloat(String(row[cLaborHrs] || 0).replace(/[^0-9.]/g, "")) || 0 : 0;
          const durCalc = dur || (sISO && eISO ? diffDays(sISO, eISO) : 0);
          const isMechPlumb = /plumb|pipe|drain|sanit|domestic|fixture|water|sewer|hvac|duct|mech|air|heat|cool|chiller|boiler|pump|sprinkler|fire\s*protect/i.test(name);
          const mcaaEst = isMechPlumb && !p6LaborHrs ? estimateMCAA(name, durCalc) : { hours: 0, basis: "" };
          const laborHrs = p6LaborHrs || mcaaEst.hours || 0;
          const crewInfo = laborHrs && durCalc ? calcCrew(laborHrs, durCalc, 8) : { workers: 0, workersExact: 0 };
          return { id: uid(), actId: cId ? String(row[cId] || i + 1) : String(i + 1), description: name, trade, assignee: cAssign ? String(row[cAssign] || "").trim() : "", startDate: sISO, endDate: eISO, duration: durCalc, pct: Math.min(100, Math.max(0, p)), status: autoStatus(sISO, eISO, p), notes: cNotes ? String(row[cNotes] || "").trim() : "", projectId: null, imported: true, sourceFormat: sourceLabel, totalLaborHours: Math.round(laborHrs * 10) / 10, laborBasis: p6LaborHrs ? "P6 Budgeted Labor Units" : mcaaEst.basis, workersPerDay: crewInfo.workers, workersExact: crewInfo.workersExact, mcaaCalculated: isMechPlumb && !p6LaborHrs && laborHrs > 0 };
        }).filter(Boolean);
      }
      function parseCostCodeRows(rawRows) {
        if (!rawRows || !rawRows.length) return [];
        const headers = Object.keys(rawRows[0]);
        const find = (...cands) => headers.find((h) => cands.some((c) => h.toLowerCase().replace(/[\s_\-.]/g, "").includes(c.toLowerCase().replace(/[\s_\-.]/g, ""))));
        const cCode = find("costcode", "code", "code#", "wbs", "id", "number");
        const cDesc = find("description", "name", "title", "activity", "scope", "item");
        const cBudget = find("budget", "budgetedamount", "value", "amount", "originalbudget", "contractamount");
        const cCommit = find("committed", "commitment", "po", "purchaseorder", "subcontract", "contracted");
        const cSpent = find("spent", "actual", "actualcost", "paid", "invoiced", "expenditure");
        const cCat = find("category", "type", "division", "phase", "csi", "trade");
        const cNotes = find("notes", "note", "comment", "remarks");
        return rawRows.map((row, i) => {
          const code = cCode ? String(row[cCode] || "").trim() : String(i + 1);
          const desc = cDesc ? String(row[cDesc] || "").trim() : "";
          if (!code && !desc) return null;
          const clean = (v) => Number(String(v || "0").replace(/[$,\s]/g, "")) || 0;
          const budgeted = clean(cBudget ? row[cBudget] : 0);
          const committed = clean(cCommit ? row[cCommit] : 0);
          const spent = clean(cSpent ? row[cSpent] : 0);
          const catRaw = cCat ? String(row[cCat] || "").trim() : "";
          const category = COST_CATEGORIES.includes(catRaw) ? catRaw : "Other";
          const variance = budgeted - spent;
          const status = budgeted === 0 ? "On Budget" : spent > budgeted ? "Over Budget" : spent / budgeted > 0.9 ? "At Risk" : "Under Budget";
          return { id: uid(), code, description: desc || code, category, budgeted, committed, spent, variance, status, notes: cNotes ? String(row[cNotes] || "").trim() : "", projectId: null, imported: true };
        }).filter(Boolean);
      }
      var Pill = ({ status }) => {
        const c = SC[status] || SC["Not Started"];
        return /* @__PURE__ */ React.createElement("span", { style: { background: c.bg, color: c.text, padding: "2px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block" } }), status);
      };
      var PrioB = ({ p }) => {
        const c = PRIO[p] || PRIO.Medium;
        return /* @__PURE__ */ React.createElement("span", { style: { background: c.bg, color: c.text, padding: "2px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700 } }, p);
      };
      var mkStyles = (dark) => ({
        iS: { background: dark ? "#0f1117" : "#f8fafc", border: `1px solid ${dark ? "#2a3150" : "#cbd5e1"}`, color: dark ? "#e2e8f0" : "#0f172a", padding: "8px 11px", borderRadius: 8, fontSize: 13, width: "100%", fontFamily: "inherit" },
        lS: { fontSize: 10, color: dark ? "#4a5580" : "#64748b", fontWeight: 700, marginBottom: 3, display: "block", letterSpacing: 0.6 },
        card: { background: dark ? "#161b27" : "#ffffff", border: `1px solid ${dark ? "#232940" : "#e2e8f0"}`, borderRadius: 13 },
        btnP: { background: "linear-gradient(135deg,#3b82f6,#2563eb)", border: "none", color: "#fff", padding: "8px 15px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
        btnS: { background: dark ? "#1a2035" : "#f1f5f9", border: `1px solid ${dark ? "#2a3150" : "#cbd5e1"}`, color: dark ? "#94a3b8" : "#475569", padding: "8px 13px", borderRadius: 8, cursor: "pointer", fontSize: 13 },
        btnW: { background: "linear-gradient(135deg,#7c3aed,#5b21b6)", border: "none", color: "#fff", padding: "8px 15px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
        btnG: { background: "linear-gradient(135deg,#10b981,#059669)", border: "none", color: "#fff", padding: "8px 15px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
        tHead: { background: dark ? "#0f1117" : "#f8fafc", borderBottom: `1px solid ${dark ? "#1e2538" : "#e2e8f0"}` },
        tRow: { borderBottom: `1px solid ${dark ? "#151a28" : "#f1f5f9"}` },
        mono: { fontFamily: "'DM Mono',monospace", fontSize: 11 },
        text: { color: dark ? "#e2e8f0" : "#0f172a" },
        text2: { color: dark ? "#94a3b8" : "#475569" },
        text3: { color: dark ? "#4a5580" : "#94a3b8" },
        text4: { color: dark ? "#5a6480" : "#64748b" }
      });
      var NAV = [
        { id: "dashboard", icon: "\u26A1", label: "Dashboard" },
        { divider: "DAILY OPERATIONS" },
        { id: "dailylogs", icon: "\u{1F4CB}", label: "Daily Logs" },
        { id: "fitterreport", icon: "\u{1F527}", label: "Fitter Report" },
        { id: "foremanreport", icon: "\u{1F4CB}", label: "Foreman Daily Report" },
        { id: "jsa", icon: "\u{1F9BA}", label: "Job Safety Analysis" },
        { id: "equipinsp", icon: "\u{1F50D}", label: "Equipment Inspections" },
        { divider: "PROJECT SUPERINTENDENT" },
        { id: "tracker", icon: "\u{1F4CA}", label: "Project Tracker" },
        { id: "lookahead", icon: "\u{1F4C5}", label: "6-Week Look-Ahead" },
        { id: "tasks", icon: "\u2611\uFE0F", label: "Tasks" },
        { id: "punchlist", icon: "\u{1F534}", label: "Punch List" },
        { id: "manpower", icon: "\u{1F477}", label: "Manpower Report" },
        { id: "delays", icon: "\u23F0", label: "Delay Log" },
        { id: "rental", icon: "\u{1F3D7}", label: "Rental Equipment Log" },
        { id: "model3d", icon: "\u{1F3E2}", label: "3D Project Model" },
        { id: "reports", icon: "\u{1F4CA}", label: "Reports Hub" },
        { divider: "PROJECT MANAGEMENT" },
        { id: "schedule", icon: "\u{1F4E5}", label: "Schedule Import" },
        { id: "contracts", icon: "\u{1F4DC}", label: "Contracts & Proposals" },
        { id: "financials", icon: "\u{1F4B0}", label: "Financials" },
        { id: "costcodes", icon: "\u{1F4D1}", label: "Cost Codes" },
        { id: "changeorders", icon: "\u{1F504}", label: "Change Orders" },
        { id: "purchaseorders", icon: "\u{1F4CB}", label: "Purchase Orders" },
        { id: "rfis", icon: "\u2753", label: "RFIs" },
        { id: "submittals", icon: "\u{1F4C4}", label: "Submittals" },
        { id: "bom", icon: "\u{1F4CB}", label: "Bill of Materials" },
        { id: "actions", icon: "\u26A1", label: "Action Items" },
        { divider: "PROJECT WAR ROOM" },
        { id: "meetings", icon: "\u{1F5E3}", label: "Meetings" },
        { divider: "SAFETY MANAGEMENT" },
        { id: "safetyinsp", icon: "\u{1F50D}", label: "Safety Inspections" },
        { id: "safetyobs", icon: "\u{1F441}", label: "Safety Observations" },
        { id: "safetyforms", icon: "\u{1F4DD}", label: "Safety Forms" },
        { id: "ppeinventory", icon: "\u{1F9E4}", label: "PPE Inventory" },
        { divider: "QUALITY MANAGEMENT" },
        { id: "qualityinsp", icon: "\u2705", label: "Quality Inspections" },
        { id: "qualityobs", icon: "\u{1F50E}", label: "Quality Observations" },
        { id: "qualityforms", icon: "\u{1F4CB}", label: "Quality Forms" },
        { divider: "PROCUREMENT" },
        { id: "materials", icon: "\u{1F69A}", label: "Material Delivery" },
        { id: "inventory", icon: "\u{1F5C3}", label: "Materials Inventory" },
        { id: "equipment", icon: "\u{1F69B}", label: "Equipment Deliveries" },
        { id: "toolinventory", icon: "\u{1F528}", label: "Tool Inventory" },
        { divider: "PROJECT DOCS" },
        { id: "drawings", icon: "\u{1F4DC}", label: "Drawings" },
        { id: "projspecs", icon: "\u{1F4D0}", label: "Project Specifications" },
        { id: "projdocs", icon: "\u{1F5C2}", label: "Project Documents" },
        { id: "projforms", icon: "\u{1F5C3}", label: "Project Forms" },
        { id: "projdir", icon: "\u{1F4D2}", label: "Project Directory" },
        { divider: "ADMIN" },
        { id: "instructions", icon: "\u{1F4D6}", label: "How To Guide" },
        { id: "projects", icon: "\u{1F3D7}", label: "Projects" },
        { id: "cloudsync", icon: "\u2601\uFE0F", label: "Cloud Sync" },
        { id: "settings", icon: "\u2699\uFE0F", label: "Settings" }
      ];
      function AIAssistant({
        open,
        onClose,
        projects,
        tasks,
        dailyLogs,
        rfis,
        submittals,
        punchList,
        costCodes,
        changeOrders,
        inventory: inventory2,
        actionItems,
        delays: delays2,
        safetyInsp: safetyInsp2,
        jsas: jsas2,
        rental,
        S,
        darkMode,
        pN,
        companyName: companyName2
      }) {
        const [apiKey, setApiKey] = useState(() => localStorage.getItem("kodox_ai_key") || "");
        const [keyInput, setKeyInput] = useState("");
        const [showKey, setShowKey] = useState(false);
        const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hi! I'm your KoDox AI assistant powered by Claude.\n\nI have full access to your live project data. Try asking:\n\u2022 Which projects are over budget?\n\u2022 Summarize this week's daily logs\n\u2022 What RFIs are overdue?\n\u2022 Draft a delay notice for the owner\n\u2022 How many man-hours this month?\n\u2022 List open punch items by trade" }]);
        const [input, setInput] = useState("");
        const [loading, setLoading] = useState(false);
        const endRef = React.useRef(null);
        const inputRef = React.useRef(null);
        const dark = darkMode;
        React.useEffect(() => {
          if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
        }, [msgs]);
        React.useEffect(() => {
          if (open && inputRef.current) setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
        }, [open]);
        function saveKey() {
          if (keyInput.trim()) {
            localStorage.setItem("kodox_ai_key", keyInput.trim());
            setApiKey(keyInput.trim());
            setKeyInput("");
            setShowKey(false);
          }
        }
        function clearKey() {
          localStorage.removeItem("kodox_ai_key");
          setApiKey("");
          setMsgs([{ role: "assistant", content: "API key removed. Add a new key to continue." }]);
        }
        function buildContext() {
          const pN2 = (id) => projects.find((p) => p.id === id)?.name || "Unknown";
          const todayStr2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const budgets = projects.map((proj) => {
            const codes = costCodes.filter((c) => c.projectId === proj.id);
            const bud = codes.reduce((s, c) => s + Number(c.budgeted || 0), 0);
            const sp = codes.reduce((s, c) => s + Number(c.spent || 0), 0);
            return { project: proj.name, budget: "$" + bud.toLocaleString(), spent: "$" + sp.toLocaleString(), over: sp > bud && bud > 0, pct: bud > 0 ? Math.round(sp / bud * 100) + "% used" : "N/A" };
          });
          const recentLogs = dailyLogs.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7).map((l) => ({
            date: l.date,
            project: pN2(l.projectId),
            superintendent: l.superintendent || "\u2014",
            foreman: l.foreman || "\u2014",
            company: l.companyName || "\u2014",
            manpower: Number(l.manpower || l.crewCount || 0),
            manHours: Number(l.totalHoursDay || 0),
            workPerformed: (l.workPerformed || "").slice(0, 150),
            delays: l.delays && l.delays !== "None" ? l.delays : null
          }));
          const openRfis = rfis.filter((r) => r.status !== "Answered" && r.status !== "Closed").map((r) => ({
            number: r.rfiNumber,
            project: pN2(r.projectId),
            subject: r.subject,
            dueDate: r.dueDate,
            status: r.status,
            overdue: r.dueDate && r.dueDate < todayStr2
          }));
          const overdSubs = submittals.filter((s) => s.requiredDate && s.requiredDate < todayStr2 && s.status !== "Approved").map((s) => ({
            project: pN2(s.projectId),
            description: s.description,
            specSection: s.specSection,
            requiredDate: s.requiredDate,
            reviewer: s.reviewer
          }));
          const openPunch = punchList.filter((p) => p.status === "Open").slice(0, 20).map((p) => ({
            project: pN2(p.projectId),
            area: p.area,
            trade: p.trade,
            description: p.description,
            assignee: p.assignee,
            priority: p.priority
          }));
          const pendCOs = (changeOrders || []).filter((c) => c.status === "Pending" || c.status === "Under Review").map((c) => ({
            number: c.coNumber,
            project: pN2(c.projectId),
            title: c.title,
            amount: "$" + Number(c.amount || 0).toLocaleString(),
            status: c.status
          }));
          const lowInv = inventory2.filter((i) => Number(i.qtyOnHand || 0) <= Number(i.reorderPoint || 0)).map((i) => ({
            item: i.itemName,
            qty: i.qtyOnHand,
            unit: i.unit,
            project: pN2(i.projectId),
            outOfStock: Number(i.qtyOnHand || 0) === 0
          }));
          const activeDelays = delays2.filter((d) => d.status === "Active").map((d) => ({
            project: pN2(d.projectId),
            cause: d.cause,
            daysLost: d.daysLost
          }));
          const thisMonth = todayStr2.slice(0, 7);
          const mLogs = dailyLogs.filter((l) => l.date.startsWith(thisMonth));
          const mHours = mLogs.reduce((s, l) => s + Number(l.totalHoursDay || 0), 0);
          const schedule = { total: tasks.length, complete: tasks.filter((t) => t.status === "Complete").length, delayed: tasks.filter((t) => t.status === "Delayed").length, onTrack: tasks.filter((t) => t.status === "On Track").length };
          return "You are KoDox AI, an expert construction project management assistant embedded in the KoDox Command Center.\n\nCOMPANY: " + (companyName2 || "KoDox Systems LLC") + "\nTODAY: " + todayStr2 + "\nPROJECTS: " + projects.length + "\n\nBUDGET STATUS:\n" + JSON.stringify(budgets, null, 2) + "\n\nSCHEDULE:\n" + JSON.stringify(schedule, null, 2) + "\n\nMANPOWER THIS MONTH: " + mHours + " man-hours across " + mLogs.length + " logs\n\nRECENT DAILY LOGS (last 7):\n" + JSON.stringify(recentLogs, null, 2) + "\n\nOPEN RFIs (" + openRfis.length + "):\n" + JSON.stringify(openRfis, null, 2) + "\n\nOVERDUE SUBMITTALS (" + overdSubs.length + "):\n" + JSON.stringify(overdSubs, null, 2) + "\n\nOPEN PUNCH ITEMS (" + openPunch.length + "):\n" + JSON.stringify(openPunch, null, 2) + "\n\nPENDING CHANGE ORDERS (" + pendCOs.length + "):\n" + JSON.stringify(pendCOs, null, 2) + "\n\nLOW/OUT OF STOCK (" + lowInv.length + "):\n" + JSON.stringify(lowInv, null, 2) + "\n\nACTIVE DELAYS (" + activeDelays.length + "):\n" + JSON.stringify(activeDelays, null, 2) + "\n\nInstructions: Answer questions about the data above precisely. When drafting documents, format them professionally. Be concise. Use construction industry terminology. Flag critical issues proactively.";
        }
        async function send() {
          if (!input.trim() || loading) return;
          const userMsg = { role: "user", content: input.trim() };
          const newMsgs = [...msgs, userMsg];
          setMsgs(newMsgs);
          setInput("");
          setLoading(true);
          try {
            const res = await fetch("https://claudeproxy-rkvcepcpza-uc.a.run.app", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, system: buildContext(), messages: newMsgs.filter((_, i) => i > 0 || newMsgs[0].role === "user").map((m) => ({ role: m.role, content: m.content })) })
            });
            if (!res.ok) {
              const e = await res.json();
              throw new Error(e.error && e.error.message || "Error " + res.status);
            }
            const data = await res.json();
            setMsgs((p) => [...p, { role: "assistant", content: data.content?.[0]?.text || "No response." }]);
          } catch (e) {
            setMsgs((p) => [...p, { role: "assistant", content: "Error: " + e.message }]);
          } finally {
            setLoading(false);
          }
        }
        const SUGGESTIONS = ["Which projects are over budget?", "Summarize this week's daily logs", "What RFIs are overdue?", "How many man-hours this month?", "List open punch items by trade", "Draft a delay notice for owner", "What submittals need attention?", "Summarize active delays"];
        if (!open) return null;
        const iS2 = { flex: 1, background: dark ? "#161b27" : "#f8fafc", border: "1px solid " + (dark ? "#2a3150" : "#d1d8e0"), borderRadius: 10, padding: "9px 12px", fontSize: 12, color: dark ? "#e2e8f0" : "#1c2333", resize: "none", fontFamily: "inherit", lineHeight: 1.5, outline: "none" };
        return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px,100vw)", background: dark ? "#0d1117" : "#ffffff", boxShadow: "-4px 0 24px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", zIndex: 500, borderLeft: "1px solid " + (dark ? "#1e2538" : "#e2e8f0") } }, /* @__PURE__ */ React.createElement("div", { style: { background: dark ? "#1c2333" : "#1E5A8C", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#FF8A00,#cc6a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 } }, "\u2728"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#fff" } }, "KoDox AI"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,0.6)" } }, "Powered by Claude \xB7 Live project data"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowKey((v) => !v), title: "API Key", style: { background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: 6, cursor: "pointer", fontSize: 13 } }, "\u{1F511}"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMsgs([{ role: "assistant", content: "Chat cleared. How can I help?" }]), title: "Clear", style: { background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: 6, cursor: "pointer", fontSize: 13 } }, "\u{1F5D1}"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: 6, cursor: "pointer", fontSize: 16 } }, "\u2715"))), showKey && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: dark ? "#161b27" : "#f8fafc", borderBottom: "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#FF8A00", marginBottom: 6 } }, "Anthropic API Key"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: dark ? "#4a5580" : "#6b7280", marginBottom: 8, lineHeight: 1.5 } }, "Get your key at ", /* @__PURE__ */ React.createElement("a", { href: "https://console.anthropic.com", target: "_blank", rel: "noreferrer", style: { color: "#60a5fa" } }, "console.anthropic.com"), ". Stored locally in your browser only."), apiKey && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#10b981", marginBottom: 6 } }, "Key saved: ...", apiKey.slice(-8), " ", /* @__PURE__ */ React.createElement("button", { onClick: clearKey, style: { background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 10, marginLeft: 4 } }, "Remove")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("input", { value: keyInput, onChange: (e) => setKeyInput(e.target.value), onKeyDown: (e) => e.key === "Enter" && saveKey(), placeholder: "sk-ant-api03-...", style: { flex: 1, background: dark ? "#0d1117" : "#fff", border: "1px solid " + (dark ? "#2a3150" : "#d1d8e0"), borderRadius: 6, padding: "6px 10px", fontSize: 12, color: dark ? "#e2e8f0" : "#1c2333" } }), /* @__PURE__ */ React.createElement("button", { onClick: saveKey, style: { background: "#FF8A00", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 } }, "Save"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "14px 14px 0" } }, msgs.map((msg, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 14, display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" } }, msg.role === "assistant" && /* @__PURE__ */ React.createElement("div", { style: { width: 26, height: 26, borderRadius: 6, background: "linear-gradient(135deg,#FF8A00,#cc6a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, marginRight: 8, marginTop: 2 } }, "\u2728"), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "85%", padding: "10px 13px", borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px", background: msg.role === "user" ? "#1E5A8C" : dark ? "#161b27" : "#f8fafc", color: msg.role === "user" ? "#fff" : dark ? "#e2e8f0" : "#1c2333", border: msg.role === "user" ? "none" : "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" } }, msg.content))), loading && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 26, height: 26, borderRadius: 6, background: "linear-gradient(135deg,#FF8A00,#cc6a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 } }, "\u2728"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 13px", borderRadius: "2px 12px 12px 12px", background: dark ? "#161b27" : "#f8fafc", border: "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), display: "flex", gap: 4, alignItems: "center" } }, [0, 1, 2].map((j) => /* @__PURE__ */ React.createElement("div", { key: j, style: { width: 7, height: 7, borderRadius: "50%", background: "#FF8A00", animation: `kdpulse 1.2s ease-in-out ${j * 0.2}s infinite` } })))), /* @__PURE__ */ React.createElement("div", { ref: endRef })), msgs.length <= 1 && /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: dark ? "#4a5580" : "#94a3b8", fontWeight: 600, marginBottom: 7, letterSpacing: 0.5, textTransform: "uppercase" } }, "Quick Questions"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } }, SUGGESTIONS.slice(0, 6).map((s, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => setInput(s), style: { background: dark ? "#161b27" : "#f8fafc", border: "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), color: dark ? "#94a3b8" : "#475569", padding: "4px 9px", borderRadius: 20, fontSize: 10, cursor: "pointer", whiteSpace: "nowrap" } }, s)))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", borderTop: "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), flexShrink: 0, background: dark ? "#0d1117" : "#fff" } }, false, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("textarea", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }, placeholder: "Ask anything about your projects... (Enter to send)", rows: 2, style: iS2 }), /* @__PURE__ */ React.createElement("button", { onClick: send, disabled: loading || !input.trim(), style: { background: loading || !input.trim() ? "#374151" : "linear-gradient(135deg,#FF8A00,#cc6a00)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 10, cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontSize: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" } }, loading ? "\u23F3" : "\u27A4")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: dark ? "#2a3150" : "#cbd5e1", marginTop: 5, textAlign: "center" } }, "Enter to send \xB7 Data stays in your browser \xB7 Powered by Anthropic Claude")));
      }
      var MCAA = {
        // ── PIPE (hours per linear foot by diameter) ─────────────────
        pipe: {
          // Schedule 40 Steel — threaded
          "steel_threaded": { 0.75: 0.08, 1: 0.1, 1.25: 0.12, 1.5: 0.14, 2: 0.18, 2.5: 0.24, 3: 0.3, 4: 0.4, 6: 0.6, 8: 0.85, 10: 1.1, 12: 1.4 },
          // Schedule 40 Steel — welded
          "steel_welded": { 0.75: 0.12, 1: 0.15, 1.25: 0.18, 1.5: 0.22, 2: 0.28, 2.5: 0.36, 3: 0.45, 4: 0.6, 6: 0.9, 8: 1.25, 10: 1.6, 12: 2 },
          // Copper — soldered
          "copper": { 0.375: 0.05, 0.5: 0.06, 0.75: 0.07, 1: 0.09, 1.25: 0.11, 1.5: 0.13, 2: 0.17, 2.5: 0.22, 3: 0.28, 4: 0.38, 6: 0.58 },
          // CPVC
          "cpvc": { 0.5: 0.05, 0.75: 0.06, 1: 0.08, 1.25: 0.1, 1.5: 0.12, 2: 0.16, 3: 0.24, 4: 0.32 },
          // PVC (DWV)
          "pvc": { 1.5: 0.08, 2: 0.1, 3: 0.15, 4: 0.2, 6: 0.32, 8: 0.44, 10: 0.58, 12: 0.72 },
          // Cast iron — no hub
          "cast_iron": { 1.5: 0.12, 2: 0.15, 3: 0.22, 4: 0.3, 6: 0.48, 8: 0.66, 10: 0.86, 12: 1.08 },
          // Stainless — welded
          "stainless": { 0.5: 0.15, 0.75: 0.18, 1: 0.22, 1.5: 0.28, 2: 0.36, 3: 0.55, 4: 0.75, 6: 1.1 }
        },
        // ── FITTINGS (hours per fitting) ─────────────────────────────
        fittings: {
          "elbow_90": { 0.75: 0.25, 1: 0.3, 1.5: 0.4, 2: 0.55, 3: 0.9, 4: 1.3, 6: 2, 8: 2.8, 10: 3.8, 12: 5 },
          "tee": { 0.75: 0.35, 1: 0.45, 1.5: 0.6, 2: 0.8, 3: 1.25, 4: 1.8, 6: 2.8, 8: 4, 10: 5.5, 12: 7 },
          "valve_gate": { 0.75: 0.3, 1: 0.4, 1.5: 0.55, 2: 0.75, 3: 1.2, 4: 1.75, 6: 2.8, 8: 4.2 },
          "valve_ball": { 0.5: 0.2, 0.75: 0.25, 1: 0.35, 1.5: 0.5, 2: 0.7, 3: 1.15, 4: 1.7 },
          "reducer": { 0.75: 0.2, 1: 0.25, 1.5: 0.35, 2: 0.5, 3: 0.8, 4: 1.15, 6: 1.8 }
        },
        // ── FIXTURES & EQUIPMENT (hours per unit) ─────────────────────
        fixtures: {
          "water_closet": 5.5,
          "urinal": 4,
          "lavatory": 3.5,
          "sink_kitchen": 4,
          "sink_service": 5,
          "shower": 6,
          "bathtub": 7,
          "floor_drain": 2.5,
          "drinking_fountain": 3.5,
          "water_heater_elec": 6,
          "water_heater_gas": 8,
          "water_heater_commercial": 16,
          "boiler_small": 40,
          "boiler_medium": 80,
          "boiler_large": 160,
          "pump_small": 8,
          "pump_medium": 16,
          "pump_large": 32,
          "backflow_preventer": 4,
          "pressure_regulator": 3,
          "expansion_tank": 2,
          "hose_bibb": 1.5,
          "cleanout": 1,
          "roof_drain": 3,
          "grease_trap_small": 8,
          "grease_trap_large": 24,
          "rpz": 6,
          "detector_check": 8
        },
        // ── HVAC / MECHANICAL (hours per unit) ───────────────────────
        hvac: {
          "ahu_small": 24,
          "ahu_medium": 48,
          "ahu_large": 96,
          "rtu_small": 16,
          "rtu_medium": 32,
          "rtu_large": 64,
          "fan_coil": 8,
          "unit_heater": 6,
          "cabinet_heater": 5,
          "chiller_small": 80,
          "chiller_medium": 160,
          "chiller_large": 320,
          "cooling_tower_small": 40,
          "cooling_tower_large": 120,
          "vav_box": 4,
          "vav_box_with_reheat": 6,
          "damper_fire": 2,
          "damper_smoke": 3,
          // Ductwork (hours per lf by width)
          "duct_round_6": 0.06,
          "duct_round_8": 0.08,
          "duct_round_10": 0.1,
          "duct_round_12": 0.13,
          "duct_rect_12x12": 0.12,
          "duct_rect_24x12": 0.18,
          "duct_rect_36x12": 0.24,
          "duct_rect_48x24": 0.35
        },
        // ── INSULATION (hours per lf) ─────────────────────────────────
        insulation: {
          "pipe_1in_fiberglass": { 0.75: 0.05, 1: 0.06, 1.5: 0.07, 2: 0.08, 3: 0.1, 4: 0.13, 6: 0.18, 8: 0.24 },
          "pipe_2in_fiberglass": { 0.75: 0.07, 1: 0.08, 1.5: 0.09, 2: 0.11, 3: 0.14, 4: 0.18, 6: 0.25, 8: 0.33 }
        }
      };
      function App() {
        const [tab2, setTab] = useState("dashboard");
        const [authUser, setAuthUser] = useState((function() {
          try {
            var u = sessionStorage.getItem("kodox_user");
            if (u) return JSON.parse(u);
            return { email: "preview@kodox.com", role: "Superintendent", company: "KoDox" };
          } catch (e) {
            return { email: "preview@kodox.com", role: "Superintendent", company: "KoDox" };
          }
        })());
        const [authLoading, setAuthLoading] = useState(false);
        const [authError, setAuthError] = useState("");
        const userRole = authUser && authUser.role || "Superintendent";
        const userCompany2 = authUser && authUser.company || "KoDox";
        const userEmail2 = authUser && authUser.email || "";
        const isAdmin = userRole === "Admin" || userRole === "Superintendent" || userRole === "COO";
        const isExternal2 = userRole === "GC" || userRole === "Owner" || userRole === "Subcontractor" || userRole === "Engineer";
        const isInternal = !isExternal2;
        const [loginEmail, setLoginEmail] = useState("");
        const [loginPass, setLoginPass] = useState("");
        const [loginLoading, setLoginLoading] = useState(false);
        const [darkMode, setDarkMode] = usePersist("darkMode", true);
        const [aiOpen2, setAiOpen2] = useState(false);
        const [showPOD, setShowPOD] = useState(false);
        useEffect(() => {
          const stored = localStorage.getItem("kodox_auth_token");
          const storedUser = localStorage.getItem("kodox_auth_user");
          if (stored && storedUser) {
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + (window.KODOX_API_KEY || ""), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken: stored })
            }).then((r) => r.json()).then((d) => {
              if (d && d.users && d.users.length > 0) {
                setAuthUser(JSON.parse(storedUser));
                if (window.KoDoxFirebase) {
                  window.KoDoxFirebase._token = stored;
                }
              } else {
                localStorage.removeItem("kodox_auth_token");
                localStorage.removeItem("kodox_auth_user");
              }
              setAuthLoading(false);
            }).catch(() => {
              setAuthUser(JSON.parse(storedUser));
              if (window.KoDoxFirebase) {
                window.KoDoxFirebase._token = stored;
              }
              setAuthLoading(false);
            });
          } else {
            setAuthLoading(false);
          }
        }, []);
        function doLogin() {
          if (!loginEmail || !loginPass) {
            setAuthError("Please enter email and password.");
            return;
          }
          setLoginLoading(true);
          setAuthError("");
          if (window.KoDoxFirebase && window.KoDoxFirebase.signIn) {
            window.KoDoxFirebase.signIn(loginEmail, loginPass).then((u) => {
              const user = { email: u.email || loginEmail, uid: u.localId || u.uid };
              setAuthUser(user);
              localStorage.setItem("kodox_auth_token", u.idToken || "");
              localStorage.setItem("kodox_auth_user", JSON.stringify(user));
              setLoginLoading(false);
            }).catch((e) => {
              setAuthError("Invalid email or password. Please try again.");
              setLoginLoading(false);
            });
          } else {
            setAuthError("Authentication service unavailable.");
            setLoginLoading(false);
          }
        }
        function doLogout() {
          setAuthUser(null);
          localStorage.removeItem("kodox_auth_token");
          localStorage.removeItem("kodox_auth_user");
          if (window.KoDoxFirebase) {
            window.KoDoxFirebase._token = null;
            window.KoDoxFirebase._uid = null;
          }
        }
        const [mobMenu2, setMobMenu2] = useState(false);
        const [projects, setProjects] = usePersist("projects", []);
        const [tasks, setTasks] = usePersist("tasks", []);
        const [dailyLogs, setDailyLogs] = usePersist("dailyLogs", []);
        const [fitterReports, setFitterReports] = usePersist("fitterReports", []);
        const [punchList, setPunchList] = usePersist("punchList", []);
        const [actionItems, setActionItems] = usePersist("actionItems", []);
        const [meetings, setMeetings] = usePersist("meetings", []);
        const [equipment, setEquipment] = usePersist("equipment", []);
        const [rental, setRental] = usePersist("rental", []);
        const [materials, setMaterials2] = usePersist("materials", []);
        const [submittals, setSubmittals] = usePersist("submittals", []);
        const [rfis, setRfis] = usePersist("rfis", []);
        const [delays2, setDelays] = usePersist("delays", []);
        const [costCodes, setCostCodes] = usePersist("costCodes", []);
        const [transactions, setTransactions2] = usePersist("transactions", []);
        const [inventory2, setInventory] = usePersist("inventory", []);
        const [bom, setBOM] = usePersist("bom", []);
        const [manpowerEntries, setManpowerEntries] = usePersist("manpowerEntries", []);
        const [ppeInventory, setPPEInventory] = usePersist("ppeInventory", []);
        const [toolInventory, setToolInventory] = usePersist("toolInventory", []);
        const [jsas2, setJsas] = usePersist("jsas", []);
        const [foremanReports, setForemanReports] = usePersist("foremanReports", []);
        const [equipInsp, setEquipInsp] = usePersist("equipInsp", []);
        const [safetyInsp2, setSafetyInsp] = usePersist("safetyInsp", []);
        const [safetyObs, setSafetyObs] = usePersist("safetyObs", []);
        const [safetyForms, setSafetyForms] = usePersist("safetyForms", []);
        const [qualityInsp, setQualityInsp] = usePersist("qualityInsp", []);
        const [qualityObs, setQualityObs] = usePersist("qualityObs", []);
        const [qualityForms, setQualityForms] = usePersist("qualityForms", []);
        const [projDocs, setProjDocs] = usePersist("projDocs", []);
        const [projDir, setProjDir] = usePersist("projDir", []);
        const [projSpecs, setProjSpecs] = usePersist("projSpecs", []);
        const [projForms, setProjForms] = usePersist("projForms", []);
        const [drawings, setDrawings] = usePersist("drawings", []);
        const [changeOrders, setChangeOrders] = usePersist("changeOrders", []);
        const [purchaseOrders, setPurchaseOrders] = usePersist("purchaseOrders", []);
        const [settings, setSettings] = usePersist("settings", { companyName: "KoDox Systems LLC", superintendent: "", phone: "", email: "", address: "", licenseNum: "" });
        const [selProj, setSelProj] = useState(null);
        const [modal, setModal] = useState(null);
        const [editTgt, setEditTgt] = useState(null);
        const [search, setSearch] = useState("");
        const [toast, setToast] = useState(null);
        const [importStep, setImportStep] = useState(1);
        const [importRows, setImportRows] = useState([]);
        const [importProjId, setImportProjId] = useState("");
        const [importMsg, setImportMsg] = useState("");
        const [importMode, setImportMode] = useState("schedule");
        const schedRef = useRef(), costRef = useRef();
        useEffect(() => {
          document.body.className = darkMode ? "dark" : "light";
        }, [darkMode]);
        useEffect(() => {
          const a = document.querySelector("aside");
          if (a) {
            if (mobMenu2) a.classList.add("mob-open");
            else a.classList.remove("mob-open");
          }
        }, [mobMenu2]);
        useEffect(() => {
          saveStore({ darkMode, projects, tasks, dailyLogs, fitterReports, punchList, actionItems, equipment, rental, materials, submittals, rfis, delays: delays2, costCodes, transactions, inventory: inventory2, jsas: jsas2, safetyInsp: safetyInsp2, safetyObs, safetyForms, qualityInsp, qualityObs, qualityForms, projDocs, projDir, projSpecs, projForms, ppeInventory, manpowerEntries, bom, drawings, changeOrders, settings });
        }, [darkMode, projects, tasks, dailyLogs, punchList, actionItems, equipment, rental, materials, submittals, rfis, delays2, costCodes, transactions, inventory2, jsas2]);
        const S = mkStyles(darkMode);
        const showToast = (msg, type = "success") => {
          setToast({ msg, type });
          setTimeout(() => setToast(null), 3500);
        };
        const openAdd = (t) => {
          setEditTgt(null);
          setModal(t);
        };
        const openEdit = (t, item) => {
          setEditTgt(item);
          setModal(t);
        };
        const close = () => {
          setModal(null);
          setEditTgt(null);
        };
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const filt = (arr) => arr.filter((x) => (!selProj || x.projectId === selProj) && (!search || JSON.stringify(x).toLowerCase().includes(search.toLowerCase())));
        const todayDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const alertCounts = {
          tasks: tasks.filter((t) => t.status !== "Complete" && t.status !== "Done" && t.dueDate && t.dueDate < todayDate).length,
          rfis: rfis.filter((r) => r.status !== "Closed" && r.status !== "Answered" && r.dueDate && r.dueDate < todayDate).length,
          punchlist: punchList.filter((p) => p.status !== "Complete" && p.status !== "Done" && p.status !== "Closed" && p.createdAt && /* @__PURE__ */ new Date() - new Date(p.createdAt) > 30 * 864e5).length,
          submittals: submittals.filter((s) => s.status === "Overdue" || (s.status === "Submitted" || s.status === "In Review") && s.dueDate && s.dueDate < todayDate).length,
          delays: delays2.filter((d) => d.status === "Open" || !d.status).length
        };
        const totalAlerts = Object.values(alertCounts).reduce((s, v) => s + v, 0);
        const af = (arr) => arr.filter((x) => !selProj || x.projectId === selProj);
        const exp = (arr, cols, name) => {
          dlCSV(toCSV(arr, cols), name + ".csv");
          showToast(name + " exported");
        };
        const [companyName2, setCompanyName] = usePersist("companyName", "Your Company");
        const weeks = Array.from({ length: 6 }, (_, i) => ({ label: wkLabel(addDays(today, i * 7)), start: fmt(addDays(today, i * 7)), end: fmt(addDays(today, i * 7 + 6)) }));
        const byWeek = (s, e) => tasks.filter((t) => (!selProj || t.projectId === selProj) && t.startDate && t.endDate && t.startDate <= e && t.endDate >= s);
        function saveRec(setter, data) {
          setter((l) => data.id && l.some((x) => x.id === data.id) ? l.map((x) => x.id === data.id ? data : x) : [...l, { ...data, id: data.id || uid() }]);
          close();
          showToast("Saved");
          scheduleAutoSync();
        }
        function scheduleAutoSync() {
          if (!window.KoDoxFirebase || !window.KoDoxFirebase._token) return;
          if (window._kodoxSyncTimer) clearTimeout(window._kodoxSyncTimer);
          window._kodoxSyncTimer = setTimeout(function() {
            const uid2 = window.KoDoxFirebase._uid || localStorage.getItem("kodox_uid");
            if (!uid2) return;
            const state = window._kodoxLastState;
            if (!state) return;
            window.KoDoxFirebase.save(uid2, state).then(function() {
              console.log("Auto-synced to Firebase");
            }).catch(function(e) {
              console.warn("Auto-sync failed:", e.message);
            });
          }, 5e3);
        }
        function delRec(setter, id) {
          setter((l) => l.filter((x) => x.id !== id));
        }
        function clearAll() {
          if (!window.confirm("Reset ALL data?")) return;
          localStorage.removeItem(STORE);
          window.location.reload();
        }
        function handleSchedFile(e) {
          const file = e.target.files[0];
          if (!file) return;
          setImportMsg("Reading\u2026");
          const ext = file.name.split(".").pop().toLowerCase();
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              let rows = ext === "csv" || ext === "txt" ? parseCSVText(ev.target.result) : parseXLSX(new Uint8Array(ev.target.result));
              const parsed = parseScheduleRows(rows);
              if (!parsed.length) {
                setImportMsg("\u274C No valid rows found. Check headers.");
                return;
              }
              setImportRows(parsed);
              setImportStep(2);
              setImportMode("schedule");
              setImportMsg(`\u2705 Found ${parsed.length} activities.`);
            } catch (err) {
              setImportMsg("\u274C " + err.message);
            }
          };
          ext === "csv" || ext === "txt" ? reader.readAsText(file) : reader.readAsArrayBuffer(file);
          e.target.value = "";
        }
        function handleCostFile(e) {
          const file = e.target.files[0];
          if (!file) return;
          setImportMsg("Reading\u2026");
          const ext = file.name.split(".").pop().toLowerCase();
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              let rows = ext === "csv" || ext === "txt" ? parseCSVText(ev.target.result) : parseXLSX(new Uint8Array(ev.target.result));
              const parsed = parseCostCodeRows(rows);
              if (!parsed.length) {
                setImportMsg("\u274C No valid cost codes found.");
                return;
              }
              setImportRows(parsed);
              setImportStep(2);
              setImportMode("costcode");
              setImportMsg(`\u2705 Found ${parsed.length} cost codes.`);
            } catch (err) {
              setImportMsg("\u274C " + err.message);
            }
          };
          ext === "csv" || ext === "txt" ? reader.readAsText(file) : reader.readAsArrayBuffer(file);
          e.target.value = "";
        }
        function commitImport() {
          if (!importProjId) {
            showToast("Select a project first", "error");
            return;
          }
          const pid = Number(importProjId);
          if (importMode === "schedule") {
            const enriched = importRows.map((r) => {
              const isMechPlumb = /plumb|pipe|drain|sanit|domestic|fixture|water|sewer|hvac|duct|mech|air|heat|cool|chiller|boiler|pump|sprinkler|fire\s*protect|mech/i.test(r.description || "");
              if (isMechPlumb) {
                const dur = r.duration || diffDays(r.startDate, r.endDate) || 1;
                const est = estimateMCAA(r.description, dur);
                const crew = calcCrew(est.hours, dur, 8);
                return {
                  ...r,
                  projectId: pid,
                  id: uid(),
                  imported: true,
                  totalLaborHours: est.hours,
                  laborBasis: est.basis,
                  workersPerDay: crew.workers,
                  workersExact: crew.workersExact,
                  mcaaCalculated: est.hours > 0
                };
              }
              return { ...r, projectId: pid, id: uid(), imported: true };
            });
            const base = tasks.filter((t) => t.projectId !== pid || !t.imported);
            setTasks([...base, ...enriched]);
            setSelProj(pid);
            const mechCount = enriched.filter((t) => t.mcaaCalculated).length;
            const totalHrs = enriched.reduce((s, t) => s + (t.totalLaborHours || 0), 0);
            showToast(`${enriched.length} activities imported \u2192 Project Tracker & 6-Week Look-Ahead updated${mechCount > 0 ? ` \xB7 ${mechCount} MCAA labor estimates (${Math.round(totalHrs)} total hrs)` : ""}`);
            setTimeout(() => setTab("tracker"), 600);
          } else {
            const base = costCodes.filter((c) => c.projectId !== pid || !c.imported);
            setCostCodes([...base, ...importRows.map((r) => ({ ...r, projectId: pid, id: uid(), imported: true }))]);
            showToast(`${importRows.length} cost codes imported`);
          }
          setImportStep(4);
        }
        function resetImport() {
          setImportStep(1);
          setImportRows([]);
          setImportProjId("");
          setImportMsg("");
        }
        const trackerTasks = filt(tasks).filter((t) => t.startDate);
        const tradeGroups = TRADES.reduce((acc, tr) => {
          const g = trackerTasks.filter((t) => t.trade === tr);
          if (g.length) acc[tr] = g;
          return acc;
        }, {});
        const allPT = tasks.filter((t) => selProj ? t.projectId === selProj : true).filter((t) => t.startDate);
        const minD = allPT.length ? allPT.reduce((m, t) => t.startDate < m ? t.startDate : m, allPT[0].startDate) : todayStr;
        const maxD = allPT.length ? allPT.reduce((m, t) => (t.endDate || t.startDate) > m ? t.endDate || t.startDate : m, allPT[0].startDate) : fmt(addDays(today, 180));
        const tSpan = Math.max(1, diffDays(minD, maxD));
        const projCodes = filt(costCodes);
        const totalBudget = projCodes.reduce((s, c) => s + Number(c.budgeted || 0), 0);
        const totalCommitted = projCodes.reduce((s, c) => s + Number(c.committed || 0), 0);
        const totalSpent = projCodes.reduce((s, c) => s + Number(c.spent || 0), 0);
        const totalVariance = totalBudget - totalSpent;
        const projTx = filt(transactions);
        const totalTxSpent = projTx.reduce((s, t) => s + Number(t.amount || 0), 0);
        const activeRental = af(rental).filter((r) => r.status === "On Rent");
        const totalRentalCost = activeRental.reduce((s, r) => s + Number(r.dailyRate || 0) * Math.max(1, diffDays(r.rentStart || todayStr, r.rentEnd || todayStr)), 0);
        const pCol = { k: "projectId", l: "PROJECT", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { color: "#60a5fa", fontWeight: 600, fontSize: 12 } }, pN(v)) };
        function LT({ cols, rows, onEdit, onDel }) {
          return /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, cols.map((c) => /* @__PURE__ */ React.createElement("th", { key: c.k, style: { padding: "10px 13px", textAlign: "left", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 10, letterSpacing: 0.6, whiteSpace: "nowrap" } }, c.l)), /* @__PURE__ */ React.createElement("th", { style: { padding: "10px 13px", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 10 } }, "ACTIONS"))), /* @__PURE__ */ React.createElement("tbody", null, !rows.length && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: cols.length + 1, style: { padding: 32, textAlign: "center", color: darkMode ? "#3a4060" : "#94a3b8", fontSize: 13 } }, "No records yet. Click + to add.")), rows.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.id, style: S.tRow, onMouseEnter: (e) => e.currentTarget.style.background = darkMode ? "#1a1f2e" : "#f8fafc", onMouseLeave: (e) => e.currentTarget.style.background = "" }, cols.map((c) => /* @__PURE__ */ React.createElement("td", { key: c.k, style: { padding: "9px 13px", ...S.text2, maxWidth: 220, wordBreak: "break-word", lineHeight: 1.4 } }, c.r ? c.r(row[c.k], row) : row[c.k] || "\u2014")), /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 13px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => onEdit(row), style: { background: darkMode ? "#1e2940" : "#e0e7ff", border: "none", color: "#60a5fa", padding: "4px 9px", borderRadius: 6, cursor: "pointer", fontSize: 11 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => onDel(row.id), style: { background: darkMode ? "#2a1a1a" : "#fee2e2", border: "none", color: "#ef4444", padding: "4px 9px", borderRadius: 6, cursor: "pointer", fontSize: 11 } }, "Del"))))))));
        }
        const iS = S.iS, lS = S.lS;
        function FField({ label, full, children }) {
          return /* @__PURE__ */ React.createElement("div", { style: { gridColumn: full ? "1/-1" : "auto" } }, /* @__PURE__ */ React.createElement("label", { style: lS }, label), children);
        }
        function FIn({ value, onChange, type = "text", placeholder = "" }) {
          return /* @__PURE__ */ React.createElement("input", { type, value: value || "", onChange, placeholder, style: iS });
        }
        function FSel({ value, onChange, options }) {
          return /* @__PURE__ */ React.createElement("select", { value: value || "", onChange, style: iS }, options.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o)));
        }
        function FTA({ value, onChange, rows = 2 }) {
          return /* @__PURE__ */ React.createElement("textarea", { defaultValue: value || "", onBlur: onChange, rows, style: { ...iS, resize: "vertical" } });
        }
        function PSel({ value, onChange }) {
          return /* @__PURE__ */ React.createElement("select", { value: value || "", onChange, style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select Project \u2014"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)));
        }
        function CodeSel({ value, onChange }) {
          const opts = filt(costCodes);
          return /* @__PURE__ */ React.createElement("select", { value: value || "", onChange, style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select Cost Code \u2014"), opts.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id, value: c.id }, c.code, " \u2013 ", c.description)));
        }
        const SvBtn = ({ onClick, label }) => /* @__PURE__ */ React.createElement("button", { onClick, style: S.btnP }, "Save ", label);
        const CxBtn = ({ onClick }) => /* @__PURE__ */ React.createElement("button", { onClick, style: { ...S.btnS } }, "Cancel");
        const statCard = (label, val, sub, color) => /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "linear-gradient(135deg,#161b27,#1a2035)" : "#ffffff", border: `1px solid ${darkMode ? "#2a3150" : "#e2e8f0"}`, borderRadius: 13, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 4 } }, label.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color, fontFamily: "'DM Mono',monospace" } }, val), sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, sub));
        return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'DM Sans',sans-serif", background: darkMode ? "#0f1117" : "#f0f4f8", minHeight: "100vh", ...S.text, display: "flex" } }, /* @__PURE__ */ React.createElement("aside", { style: { width: 210, background: darkMode ? "#0b0e18" : "#1e293b", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 14px 12px", borderBottom: `1px solid ${darkMode ? "#1a1f2e" : "#334155"}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("img", { src: "data:image/png;base64,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rF27Vk+dusWOp59++oPbbbfd56urq5fU1dX5NTU1q5577bmDL7nkklu33Xbb/dra2iIi8mJyYL3bHjNObWhoKCeibwgh9MKFC9UBBxygc7mc/+CDD9bvsssun29ra9PWWi/mUdXDhg1LP/HEE7fvs88+NQDydXV17+rnfRQMuAIk5o4bUG2LfDhhGIKZhZQyrKmpEQ0NDb/bfvvtzzTGoLOz0yZ8+0RkKyoq1Msvv/xsfX39l375y18ui8OsBniHswcAqK2tJSKyP/jBD8aOHDnyyMbGRhMLPyWU5CtWrOguFAp9vu+T53kMrDOB+lOZx0JC1louKysbU1pamgiJ7OrqCseMGeOPGTPmK0R0y5IlSwScle+N013HT404A0OAAULN8FOMLuO/QA04hxc5K+NDPcuZUFwLcdt/YBFTOiZRIcMAx1Ht+BnbefPm7brVVlvtuGbNmgiA56jaNYQQtGrVqvZCoRBKKUkIwf1JhZOEY0ztSL7vszZGDCsvH5XJZN15AdXZ2RluvfVWY1944YXPE9HjCxcutHV1dfK4445r23XXXQ99+OGH6/bYY48jWltbdRAECoBqb++I9txzz689/vjjw77whS/UVFVV5ceMGVNy11133bzddtsd0tzcHBGRB4A9zzPpdFo98sgj8w844IBThBB87rnnbmjR+0gYUAVIVtP+RFT9VlVFRParX/3qhNNPP/2q7bbb7qCOjg6jtRZCCBE7nNb3fbF06dIbZs2a9S0APe9h778bbD6fL2Sz2bSUkq21NpvNilWrVi0755xzDrnjjju68QFKCSorK0V7e7u99NJLa4444ojLAVhrHXNDGIYMYH0WOSaBtqDAY3pCZjCIAFPBLLWxHR/qIa4HysHeelASLSLnN8fMbgYWpf1eO3z48J44CSljJ96UlZXJp5566q5vfetbx7/88ssRNrCI9EdFRYXs7Oy0N9944w8POPDAHwdhaGI7XnR397C1Np+8NqFw/NnPfpbfZ599jrrvvvuu3meffb5ujNHx4BKvvb0t2nnnnY+4+eab/3333Xd/75BDDrlg2rRp+zY2NmoppcfMLKVkIlINDQ2/+PznP39OYmJ+kCjSh8GA262JgxmGIQAUSaAKhULLxfMu3v3cc899ZJtttjmotbVVW2tlEh5lZuN5nnjggQcumTVr1peYOV9dXS3fK2m2PtLp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", width: "52", height: "52", alt: "KoDox", style: { width: 52, height: 52, borderRadius: 10, flexShrink: 0, objectFit: "contain" } }))), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 10px 3px" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search...",
            style: { background: "#0f1117", border: "1px solid " + (search ? "#FF8A00" : "#2a3150"), color: "#e2e8f0", padding: "5px 9px", borderRadius: 7, fontSize: 11, width: "100%", fontFamily: "inherit", outline: "none" }
          }
        ), search && /* @__PURE__ */ React.createElement("button", { onClick: () => setSearch(""), style: { position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 12, padding: 0, lineHeight: 1 } }, "x"), search.length > 1 && (() => {
          const q = search.toLowerCase();
          const results = [];
          const add = (items, tab3, icon, getLabel, getSub) => {
            (items || []).filter((x) => JSON.stringify(x).toLowerCase().includes(q)).slice(0, 3).forEach((x) => {
              results.push({ tab: tab3, icon, label: getLabel(x), sub: getSub(x), item: x });
            });
          };
          add(dailyLogs, "dailylogs", "log", "Daily Log", "Daily Logs", (x) => x.date + " - " + ((x.workPerformed || "").slice(0, 40) || "Daily Log"), (x) => x.location || "");
          add(rfis, "rfis", "rfis", "RFIs", (x) => "RFI " + x.number + ": " + (x.subject || x.description || "").slice(0, 35), (x) => x.status || "");
          add(submittals, "submittals", "submittals", "Submittals", (x) => (x.number || "") + " " + (x.title || "").slice(0, 35), (x) => x.status || "");
          add(punchList, "punchlist", "punch", "Punch List", (x) => (x.description || "").slice(0, 40), (x) => x.status || "");
          add(tasks, "tasks", "tasks", "Tasks", (x) => (x.name || x.title || "").slice(0, 40), (x) => x.status || "");
          add(bom, "bom", "bom", "BOM", (x) => (x.description || "").slice(0, 40), (x) => x.status || "");
          add(jsas2, "jsa", "jsa", "JSA", (x) => ("JSA " + x.jsaNumber + ": " + (x.taskDescription || "")).slice(0, 40), (x) => x.status || "");
          add(drawings, "drawings", "draw", "Drawings", (x) => ((x.drawingNumber || "") + " " + (x.title || "")).slice(0, 40), (x) => x.status || "");
          add(projects, "projects", "proj", "Projects", (x) => (x.name || "").slice(0, 40), (x) => x.status || "");
          if (!results.length) return null;
          return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "100%", left: 0, right: 0, background: "#0d1520", border: "1px solid rgba(255,138,0,0.3)", borderRadius: 8, marginTop: 4, zIndex: 999, maxHeight: 300, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" } }, results.map((r, i) => /* @__PURE__ */ React.createElement(
            "div",
            {
              key: i,
              onClick: () => {
                setTab(r.tab);
                setSearch("");
              },
              style: { padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", display: "flex", flexDirection: "column", gap: 2 },
              onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,138,0,0.08)",
              onMouseLeave: (e) => e.currentTarget.style.background = ""
            },
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: "#e2e8f0" } }, r.label),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "rgba(255,138,0,0.7)", textTransform: "uppercase", letterSpacing: 1 } }, r.tab, " ", r.sub && "- " + r.sub)
          )));
        })())), /* @__PURE__ */ React.createElement("nav", { style: { flex: 1, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 1 } }, NAV.map((n, i) => n.divider ? /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "12px 12px 4px", fontSize: 9, fontWeight: 700, color: "rgba(255,138,0,0.6)", letterSpacing: 1.4, textTransform: "uppercase" } }, n.divider) : /* @__PURE__ */ React.createElement("button", { key: n.id, onClick: () => {
          setTab(n.id);
          setMobMenu2(false);
        }, style: { display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer", textAlign: "left", width: "100%", background: tab2 === n.id ? "#1e2940" : "transparent", color: tab2 === n.id ? "#60a5fa" : "#94a3b8", fontWeight: tab2 === n.id ? 600 : 400, fontSize: 12, borderLeft: tab2 === n.id ? "3px solid #3b82f6" : "3px solid transparent" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11 } }, n.icon), n.label, alertCounts[n.id] > 0 && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 99, minWidth: 16, textAlign: "center" } }, alertCounts[n.id])))), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px", borderTop: `1px solid ${darkMode ? "#1a1f2e" : "#334155"}`, fontSize: 9, color: "#4a5580" } }, projects.length, " Projects \xB7 ", tasks.length, " Activities \xB7 ", authUser && authUser.email || "KoDox Systems LLC", /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#10b981", fontSize: 8, fontWeight: 700 } }, "\u25CF AUTO-SAVED"), /* @__PURE__ */ React.createElement("button", { onClick: clearAll, style: { fontSize: 11, fontWeight: 700, color: "#fff", background: "#dc2626", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 6, marginTop: 4, width: "100%" } }, "\u{1F5D1} Reset All Data")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#FF8A00,#cc6a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 } }, (userEmail2 || "K")[0].toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 600, color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, userRole), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#4a5568", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, userCompany2))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          sessionStorage.removeItem("kodox_token");
          sessionStorage.removeItem("kodox_user");
          window.location.replace("index.html");
        }, style: { width: "100%", padding: "6px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: 1 } }, "SIGN OUT")))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 } }, /* @__PURE__ */ React.createElement("header", { style: { background: darkMode ? "#0d1019" : "#ffffff", borderBottom: `1px solid ${darkMode ? "#1a1f2e" : "#e2e8f0"}`, padding: "11px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setMobMenu2((v) => !v), className: "kd-burger", style: { display: "none", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#e8edf5", width: 40, height: 40, borderRadius: 8, fontSize: 20, alignItems: "center", justifyContent: "center" } }, "\u2630"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("img", { src: "data:image/png;base64,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rF27Vk+dusWOp59++oPbbbfd56urq5fU1dX5NTU1q5577bmDL7nkklu33Xbb/dra2iIi8mJyYL3bHjNObWhoKCeibwgh9MKFC9UBBxygc7mc/+CDD9bvsssun29ra9PWWi/mUdXDhg1LP/HEE7fvs88+NQDydXV17+rnfRQMuAIk5o4bUG2LfDhhGIKZhZQyrKmpEQ0NDb/bfvvtzzTGoLOz0yZ8+0RkKyoq1Msvv/xsfX39l375y18ui8OsBniHswcAqK2tJSKyP/jBD8aOHDnyyMbGRhMLPyWU5CtWrOguFAp9vu+T53kMrDOB+lOZx0JC1louKysbU1pamgiJ7OrqCseMGeOPGTPmK0R0y5IlSwScle+N013HT404A0OAAULN8FOMLuO/QA04hxc5K+NDPcuZUFwLcdt/YBFTOiZRIcMAx1Ht+BnbefPm7brVVlvtuGbNmgiA56jaNYQQtGrVqvZCoRBKKUkIwf1JhZOEY0ztSL7vszZGDCsvH5XJZN15AdXZ2RluvfVWY1944YXPE9HjCxcutHV1dfK4445r23XXXQ99+OGH6/bYY48jWltbdRAECoBqb++I9txzz689/vjjw77whS/UVFVV5ceMGVNy11133bzddtsd0tzcHBGRB4A9zzPpdFo98sgj8w844IBThBB87rnnbmjR+0gYUAVIVtP+RFT9VlVFRParX/3qhNNPP/2q7bbb7qCOjg6jtRZCCBE7nNb3fbF06dIbZs2a9S0APe9h778bbD6fL2Sz2bSUkq21NpvNilWrVi0755xzDrnjjju68QFKCSorK0V7e7u99NJLa4444ojLAVhrHXNDGIYMYH0WOSaBtqDAY3pCZjCIAFPBLLWxHR/qIa4HysHeelASLSLnN8fMbgYWpf1eO3z48J44CSljJ96UlZXJp5566q5vfetbx7/88ssRNrCI9EdFRYXs7Oy0N9944w8POPDAHwdhaGI7XnR397C1Np+8NqFw/NnPfpbfZ599jrrvvvuu3meffb5ujNHx4BKvvb0t2nnnnY+4+eab/3333Xd/75BDDrlg2rRp+zY2NmoppcfMLKVkIlINDQ2/+PznP39OYmJ+kCjSh8GA262JgxmGIQAUSaAKhULLxfMu3v3cc899ZJtttjmotbVVW2tlEh5lZuN5nnjggQcumTVr1peYOV9dXS3fK2m2PtLp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", width: "52", height: "52", alt: "KoDox", style: { width: 52, height: 52, borderRadius: 10, flexShrink: 0, objectFit: "contain" } }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, marginTop: 1 } }, today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, totalAlerts > 0 && /* @__PURE__ */ React.createElement("div", { onClick: () => setTab("dashboard"), style: { padding: "3px 10px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, "bell"), totalAlerts), /* @__PURE__ */ React.createElement("button", { onClick: () => setDarkMode((d) => !d), style: { background: darkMode ? "#1e2538" : "#f1f5f9", border: `1px solid ${darkMode ? "#2a3150" : "#e2e8f0"}`, color: darkMode ? "#e2e8f0" : "#475569", padding: "4px 9px", borderRadius: 7, cursor: "pointer", fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 } }, darkMode ? "\u2600\uFE0F Light" : "\u{1F319} Dark"), /* @__PURE__ */ React.createElement("button", { onClick: () => setAiOpen2((v) => !v), style: { background: aiOpen2 ? "linear-gradient(135deg,#FF8A00,#cc6a00)" : "linear-gradient(135deg,#1E5A8C,#0e3d63)", border: "none", color: "#fff", padding: "4px 12px", borderRadius: 7, cursor: "pointer", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 } }, "\u2728 AI"), aiOpen2 && React.createElement(AIAssistant, { open: aiOpen2, onClose: () => setAiOpen2(false), projects, tasks, dailyLogs, rfis, submittals, punchList, costCodes, changeOrders: changeOrders || [], inventory: inventory2, actionItems, delays: delays2, safetyInsp: safetyInsp2, jsas: jsas2, rental, S, darkMode, pN, companyName: companyName2 }), /* @__PURE__ */ React.createElement("input", { value: companyName2, onChange: (e) => setCompanyName(e.target.value), placeholder: "Company Name", title: "Sets company name on reports", style: { ...S.iS, width: 180, fontSize: 11, padding: "5px 9px" } }), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("schedule"), style: S.btnW }, "\u{1F4E5} Import Schedule"), /* @__PURE__ */ React.createElement("select", { value: selProj || "", onChange: (e) => setSelProj(e.target.value ? Number(e.target.value) : null), style: { ...S.iS, width: "auto", fontSize: 12, padding: "6px 10px" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "All Projects"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "18px", flex: 1, overflowY: "auto" } }, tab2 === "dashboard" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowPOD(true), style: { ...S.btnP, padding: "8px 18px", fontSize: 12 } }, "Daily Briefing")), /* @__PURE__ */ React.createElement(ProjectOverview, { projects, tasks, dailyLogs, rfis, submittals, punchList, costCodes, changeOrders, rental, actionItems, S, darkMode, pN, selProj, setTab, today, todayStr })), tab2 === "instructions" && /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, ...S.text, marginBottom: 6 } }, "\u{1F4D6} KoDox Setup & User Guide"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3, lineHeight: 1.7 } }, "Follow these steps in order to get your project fully set up. Each step feeds into the next \u2014 your schedule populates the tracker, the tracker feeds the 6-week look-ahead, and manpower is calculated automatically using MCAA labor unit tables. Take your time with each step and your project will run itself.")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#FF8A00,#cc6a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "0"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Logging In & Getting Access"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Before you can do anything you need to be logged in"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "Requesting Access (New Users)"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "kodoxsystems.com"), " in your browser"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Request Access"), " at the bottom of the login screen"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Fill in your name, email, company, and role \u2014 then tap Submit"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Your administrator will receive your request and add your account"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Once approved you will receive your login credentials"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontWeight: 700, ...S.text, marginBottom: 6 } }, "Signing In"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Enter your ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "email and password"), " and tap Sign In"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Your session stays active while your browser tab is open"), /* @__PURE__ */ React.createElement("div", null, "\u2192 To sign out tap the ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "SIGN OUT"), " button at the bottom of the left sidebar"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(255,138,0,0.08)" : "#fff7ed", borderRadius: 8, border: "1px solid rgba(255,138,0,0.2)", fontSize: 12, color: "#FF8A00" } }, "\u{1F4A1} The app only works when accessed from kodoxsystems.com over HTTPS. The downloaded file is for offline reference only \u2014 data does not save offline."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#FF8A00,#cc6a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "1"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Create Your Project"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Start here \u2014 every other section links to a project"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "ADMIN \u2192 Projects"), " in the left sidebar"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "+ New Project")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Fill in the following fields:"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "8px 0", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Project Name"), " \u2014 Full official project name as it appears on the contract"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Project Number"), " \u2014 Your company's internal job number"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Start Date"), " \u2014 Contract start date"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "End Date"), " \u2014 Contract completion date"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Owner"), " \u2014 Project owner or client name"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "General Contractor"), " \u2014 GC company name"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Superintendent"), " \u2014 Your name"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Contract Value"), " \u2014 Total contract amount in dollars"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Status"), " \u2014 Set to Active"))), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Save Project")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(255,138,0,0.08)" : "#fff7ed", borderRadius: 8, border: "1px solid rgba(255,138,0,0.2)", fontSize: 12, color: "#FF8A00" } }, "\u{1F4A1} Always create the project first. Every log entry, RFI, submittal, daily log, and cost code links to a project. Without a project nothing saves correctly."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#FF8A00,#cc6a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "2"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Upload Contract & Project Proposal"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Store your key project documents for easy access"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT MANAGEMENT \u2192 Contracts & Proposals")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Make sure your project is selected in the top dropdown"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Upload Executed Contract"), " and select your signed contract PDF"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Upload Project Proposal"), " and select your original bid document"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Both documents are stored securely and can be downloaded anytime"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(59,130,246,0.08)" : "#eff6ff", borderRadius: 8, border: "1px solid rgba(59,130,246,0.2)", fontSize: 12, color: "#3b82f6" } }, "\u{1F4A1} Supported formats: PDF, DOC, DOCX. Maximum file size: 10MB per document. These documents are for reference only and do not auto-populate other sections."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #3b82f6" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "3"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Import Your Project Schedule"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "This is the most important import \u2014 it drives the tracker, look-ahead, and manpower"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "How to Export Your Schedule"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "8px 0 12px", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "From Primavera P6:"), " File \u2192 Export \u2192 Spreadsheet \u2014 XLS \u2192 Select activities \u2192 Export"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "From MS Project:"), " File \u2192 Save As \u2192 Excel Workbook (.xlsx)"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "From Procore:"), " Schedule \u2192 Export \u2192 CSV or Excel"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "From Excel:"), " Save your schedule as .CSV or .XLSX with column headers"))), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "Required Columns in Your Export File"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "8px 0 12px", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Activity ID"), " \u2014 Unique activity number (e.g. A1010, 1000, MECH-001)"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Activity Name / Description"), " \u2014 What the work is"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Start Date"), " \u2014 Planned start date (MM/DD/YYYY or YYYY-MM-DD)"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Finish Date"), " \u2014 Planned finish date"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Duration"), " \u2014 Number of work days"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "% Complete"), " \u2014 Current completion percentage (0-100)"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#f59e0b" } }, "Recommended: Trade / Discipline"), " \u2014 Used to group activities by trade"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#f59e0b" } }, "Recommended: Labor Units"), " \u2014 Man-hours budgeted for the activity"))), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "How to Import"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT MANAGEMENT \u2192 Schedule Import")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Select your project from the dropdown at the top"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Choose File"), " and select your exported schedule file (CSV or XLSX)"), /* @__PURE__ */ React.createElement("div", null, "\u2192 The app auto-detects column names from P6, MSP, Procore, or any Excel format"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Review the preview table \u2014 verify activity names, dates, and durations look correct"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Import Activities"), " to complete the import"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(59,130,246,0.08)" : "#eff6ff", borderRadius: 8, border: "1px solid rgba(59,130,246,0.2)", fontSize: 12, color: "#3b82f6" } }, "\u{1F4A1} After a successful import the app automatically populates:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "\u2022 Project Tracker"), " \u2014 all activities with status, % complete, and Gantt bars", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "\u2022 6-Week Look-Ahead"), " \u2014 activities starting in the next 6 weeks, grouped by week", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "\u2022 Manpower Report"), " \u2014 estimated crew sizes calculated using MCAA labor unit tables", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "\u2022 Daily Briefing"), " \u2014 today's activities appear automatically in your morning briefing"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #3b82f6" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "4"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Set Up Labor Rates (MCAA)"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Required for accurate manpower cost calculations"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "ADMIN \u2192 Settings")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Scroll to the ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Labor Rates"), " section"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Enter your current hourly rates for each trade:"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "8px 0", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Journeyman Pipefitter"), " \u2014 Straight time hourly rate including fringes"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Welder"), " \u2014 Straight time hourly rate including fringes"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Helper / Apprentice"), " \u2014 Straight time hourly rate including fringes"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Foreman"), " \u2014 Straight time hourly rate including fringes"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "General Foreman"), " \u2014 Straight time hourly rate including fringes"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Superintendent"), " \u2014 Daily rate for cost tracking"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Per Diem"), " \u2014 Daily per diem rate per employee if applicable"))), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Save Settings")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(59,130,246,0.08)" : "#eff6ff", borderRadius: 8, border: "1px solid rgba(59,130,246,0.2)", fontSize: 12, color: "#3b82f6" } }, "\u{1F4A1} These rates are used to automatically calculate daily labor cost in the Manpower Report. The MCAA labor unit tables built into the app use these rates to estimate crew requirements based on your schedule activities. Set them once \u2014 they apply everywhere."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #10b981" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "5"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Import Cost Codes & Budget"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Links your budget to activities for real-time cost tracking"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "Prepare Your Cost Code File"), /* @__PURE__ */ React.createElement("div", null, "Create a CSV or Excel file with the following columns:"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "8px 0 12px", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Cost Code"), " \u2014 Your company cost code number (e.g. 15100, MECH-PIPE)"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Description"), " \u2014 What the cost code covers"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Category"), " \u2014 Labor, Material, Equipment, Subcontract, or Other"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Budgeted"), " \u2014 Total budgeted dollar amount for this code"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#f59e0b" } }, "Optional: Spent"), " \u2014 Amount already spent if migrating from another system"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#f59e0b" } }, "Optional: Unit"), " \u2014 Unit of measure (LF, EA, TON, HR)"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#f59e0b" } }, "Optional: Notes"), " \u2014 Any additional notes"))), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "How to Import"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT MANAGEMENT \u2192 Cost Codes")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Import Cost Codes"), " and select your file"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Review the preview and tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Import")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Or tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "+ Add Cost Code"), " to enter manually one at a time"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(16,185,129,0.08)" : "#ecfdf5", borderRadius: 8, border: "1px solid rgba(16,185,129,0.2)", fontSize: 12, color: "#10b981" } }, "\u{1F4A1} Once cost codes are imported the ", /* @__PURE__ */ React.createElement("strong", null, "Financials dashboard"), " automatically shows budget vs spent, variance per cost code, category breakdown charts, and your overall project burn rate. Approved Change Orders post to Financials automatically."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #10b981" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "6"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Add Rental Equipment"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Track all equipment on rent with daily rates and costs"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT SUPERINTENDENT \u2192 Rental Equipment")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "+ Add Equipment"), " for each piece of rental equipment"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Fill in the following for each item:"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "8px 0", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Equipment Name"), " \u2014 e.g. 60-Ton Crane, Forklift, Aerial Lift"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Vendor"), " \u2014 Rental company name"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Daily Rate"), " \u2014 Cost per day in dollars"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "On Rent Date"), " \u2014 Date equipment arrived on site"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Expected Off Rent"), " \u2014 Planned return date"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PO Number"), " \u2014 Purchase order number if applicable"))), /* @__PURE__ */ React.createElement("div", null, "\u2192 The app automatically calculates total cost based on days on rent \xD7 daily rate"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(16,185,129,0.08)" : "#ecfdf5", borderRadius: 8, border: "1px solid rgba(16,185,129,0.2)", fontSize: 12, color: "#10b981" } }, "\u{1F4A1} Rental equipment costs appear in the Financials section and are factored into your daily burn rate. Update the off-rent date as soon as equipment leaves the job to keep costs accurate."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #f59e0b" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "7"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Daily Operations \u2014 Your Morning Routine"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "What to do every single day on the job"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "Every Morning"), /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Daily Briefing"), " \u2014 Tap the orange Daily Briefing button at the top of the screen. It reads out your full morning briefing including today's activities, crew counts, deliveries scheduled, inspections due, open RFIs, and punch list items. You can listen to it, print it, or save as PDF for your pre-job meeting."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "JSA (Job Safety Analysis)"), " \u2014 Before any work begins go to DAILY OPERATIONS \u2192 JSA. Select the work type (Hot Work, Confined Space, Working at Height, Overhead Lifting, or Pipe Threading), review the hazard table with your crew, and have everyone sign on digitally. This is your legal documentation that the safety briefing occurred."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontWeight: 700, ...S.text, marginBottom: 6 } }, "Every Day"), /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Manpower Report"), " \u2014 Go to PROJECT SUPERINTENDENT \u2192 Manpower Report. Use the + and - buttons to log your actual crew count by trade for the day. The app automatically calculates total man-hours worked and posts the labor cost to Financials using your saved rates."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Daily Logs"), " \u2014 Go to DAILY OPERATIONS \u2192 Daily Logs and tap + New Log. Fill in weather conditions, work performed, delays encountered, visitors on site, equipment used, and safety incidents. Attach photos directly from your phone. This is your legal daily record \u2014 do not skip it."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Fitter Report"), " \u2014 If you have pipefitters on site go to DAILY OPERATIONS \u2192 Fitter Report. Log pipe footage installed, welds completed, hangers set, fittings made, and instrumentation installed. This tracks production against your schedule."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Project Tracker"), " \u2014 Update the % complete on any activities that progressed today. Go to PROJECT SUPERINTENDENT \u2192 Project Tracker and tap Edit on any activity. Keep this current \u2014 it drives your 6-week look-ahead and your daily briefing."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(245,158,11,0.08)" : "#fffbeb", borderRadius: 8, border: "1px solid rgba(245,158,11,0.2)", fontSize: 12, color: "#d97706" } }, "\u{1F4A1} All data saves automatically as you type. Use ADMIN \u2192 Cloud Sync to back up everything to Firebase and access from any device."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #8b5cf6" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "8"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Managing RFIs & Submittals"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Track every question and document with automatic overdue alerts"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "RFIs (Requests for Information)"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT MANAGEMENT \u2192 RFIs")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "+ New RFI"), " and fill in the RFI number, subject, question, submitted date, and who it is directed to"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Set ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Visibility"), " to External if the GC needs to see it, or Internal if it is for your records only"), /* @__PURE__ */ React.createElement("div", null, "\u2192 The app automatically tracks business days from submission date:"), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 14px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "6px 0", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0", fontSize: 12, ...S.text2 } }, /* @__PURE__ */ React.createElement("div", null, "\u{1F7E1} ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Yellow flag at 7 business days"), " \u2014 RFI is approaching overdue"), /* @__PURE__ */ React.createElement("div", null, "\u{1F534} ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Red flag at 10 business days"), " \u2014 RFI is overdue, follow up immediately")), /* @__PURE__ */ React.createElement("div", null, "\u2192 When the GC responds tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Edit"), " on the RFI and update the status to Answered and log the response"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontWeight: 700, ...S.text, marginBottom: 6 } }, "Submittals"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT MANAGEMENT \u2192 Submittals")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "+ New Submittal"), " and fill in the spec section, description, submitted date, required return date, and reviewer"), /* @__PURE__ */ React.createElement("div", null, "\u2192 The app tracks business days and alerts you:"), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 14px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "6px 0", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0", fontSize: 12, ...S.text2 } }, /* @__PURE__ */ React.createElement("div", null, "\u{1F7E1} ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Yellow flag at 14 business days"), " \u2014 Submittal is approaching overdue"), /* @__PURE__ */ React.createElement("div", null, "\u{1F534} ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Red flag at 21 business days"), " \u2014 Submittal is overdue, escalate immediately")), /* @__PURE__ */ React.createElement("div", null, "\u2192 When a submittal comes back tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "\u2713 Approve"), " to mark it approved or ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "\u21A9 R&R"), " to mark it Revise and Resubmit with a reason"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #8b5cf6" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "9"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Internal vs External Visibility"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Control exactly what other companies can see"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", null, "All documents in KoDox are ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Internal Only by default"), " \u2014 meaning only your company can see them. Nothing is shared with the GC, owner, or subcontractors unless you explicitly choose to share it."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, "\u2192 To share an item with external users open it and set ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Visibility \u2192 External")), /* @__PURE__ */ React.createElement("div", null, "\u2192 The app will ask you to enter your ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "password to confirm"), " before sharing \u2014 this prevents accidental shares"), /* @__PURE__ */ React.createElement("div", null, "\u2192 To unshare set Visibility back to Internal \u2014 your password is required again"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, "Items that can be shared externally:"), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 14px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, margin: "6px 0", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0", fontSize: 12, ...S.text2, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("div", null, "\u2705 RFIs \u2014 Share specific RFIs with the GC for their response"), /* @__PURE__ */ React.createElement("div", null, "\u2705 Submittals \u2014 Share submittal status with reviewers"), /* @__PURE__ */ React.createElement("div", null, "\u2705 Change Orders \u2014 Share approved COs with the owner"), /* @__PURE__ */ React.createElement("div", null, "\u2705 Action Items \u2014 Share open items that require GC input"), /* @__PURE__ */ React.createElement("div", null, "\u{1F512} Daily Logs \u2014 Always Internal. The GC does not need your daily field records."), /* @__PURE__ */ React.createElement("div", null, "\u{1F512} Financials \u2014 Always Internal. Your budget is proprietary."), /* @__PURE__ */ React.createElement("div", null, "\u{1F512} Manpower \u2014 Always Internal. Your crew costs are proprietary.")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(139,92,246,0.08)" : "#f5f3ff", borderRadius: 8, border: "1px solid rgba(139,92,246,0.2)", fontSize: 12, color: "#8b5cf6" } }, "\u{1F4A1} When a GC or Owner user logs in they see a clean External Portal showing only the items you have shared with them. They cannot see anything marked Internal."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #0ea5e9" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "10"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Drawings \u2014 Markup & Version Control"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Upload, view, mark up, and manage drawing revisions"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, marginBottom: 6 } }, "Adding Drawings"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT DOCS \u2192 Drawings")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "+ Add Drawing"), " and enter the drawing number, title, discipline, revision, date, and status"), /* @__PURE__ */ React.createElement("div", null, "\u2192 After saving tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "\u2B06 Upload"), " in the File column to attach the PDF or image file"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap the drawing number to open the full-screen viewer"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontWeight: 700, ...S.text, marginBottom: 6 } }, "Adding Markups"), /* @__PURE__ */ React.createElement("div", null, "\u2192 In the viewer tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "\u{1F4CD} Pin"), " in the toolbar to enter markup mode"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Tap anywhere on the drawing to place a pin"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Select the pin type (RFI, Punch, Note, Issue, or Approved) and add your note"), /* @__PURE__ */ React.createElement("div", null, "\u2192 You can link a pin directly to an existing RFI or punch list item \u2014 tap it later to jump straight to that item"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Each markup shows who added it and when \u2014 only the creator or an admin can delete it"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontWeight: 700, ...S.text, marginBottom: 6 } }, "Uploading a New Revision"), /* @__PURE__ */ React.createElement("div", null, "\u2192 In the drawings table tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "+ Rev"), " on any drawing"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Enter the new revision label (e.g. Rev B), describe what changed, and upload the new file"), /* @__PURE__ */ React.createElement("div", null, "\u2192 All previous revisions are automatically marked ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#ef4444" } }, "SUPERSEDED"), " \u2014 anyone opening an old revision sees a large red warning banner and a button to switch to the current revision"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(14,165,233,0.08)" : "#f0f9ff", borderRadius: 8, border: "1px solid rgba(14,165,233,0.2)", fontSize: 12, color: "#0ea5e9" } }, "\u{1F4A1} Never let your crew work off superseded drawings. The red SUPERSEDED banner is designed to be impossible to miss. Always upload new revisions immediately when you receive them."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text, marginBottom: 16 } }, "\u26A1 Quick Reference \u2014 Where to Find Everything"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, [
          ["DAILY OPERATIONS", "Daily Logs, Fitter Report, JSA"],
          ["DAILY BRIEFING", "Orange button at top of screen"],
          ["PROJECT SUPERINTENDENT", "Tracker, Look-Ahead, Manpower, Punch List, Delays, Rental Equipment"],
          ["PROJECT MANAGEMENT", "Schedule Import, Financials, Cost Codes, Change Orders, POs, RFIs, Submittals, BOM, Action Items, Contracts"],
          ["SAFETY MANAGEMENT", "Safety Inspections, Observations, Safety Forms, Tool & PPE Inventory"],
          ["QUALITY MANAGEMENT", "Quality Inspections, Observations, Quality Forms"],
          ["PROJECT DOCS", "Documents, Directory, Specs, Drawings, Project Forms"],
          ["ADMIN", "How To Guide, Projects, Cloud Sync, Settings"]
        ].map(([section, items]) => /* @__PURE__ */ React.createElement("div", { key: section, style: { padding: "10px 14px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, section), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text2, lineHeight: 1.6 } }, items))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text, marginBottom: 14 } }, "\u{1F4A1} Pro Tips"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, [
          ["Always select your project first", "Before entering any data make sure the correct project is selected in the project dropdown at the top of each section. Data entered without a project selected will not appear in your reports."],
          ["Keep your schedule current", "The Project Tracker drives your Daily Briefing, 6-Week Look-Ahead, and Manpower Report. Update % complete daily for accurate reports."],
          ["Use Cloud Sync daily", "Go to ADMIN \u2192 Cloud Sync and tap Push to Cloud every day. This backs up your data to Firebase and lets you access it from any device."],
          ["Export reports before owner meetings", "Every section has a PDF export button. Generate your Daily Briefing, Manpower Report, and Financial Summary before any owner or GC meeting."],
          ["Log delays immediately", "When a delay occurs go to PROJECT SUPERINTENDENT \u2192 Delay Log and record it the same day with the cause, days lost, and cost impact. This protects you legally."],
          ["Keep RFIs and submittals updated", "An unanswered RFI past 10 business days needs immediate escalation. Set your email notifications and check the alerts on the dashboard every morning."]
        ].map(([title, text]) => /* @__PURE__ */ React.createElement("div", { key: title, style: { padding: "12px 14px", background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, "\u2192 ", title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, lineHeight: 1.6 } }, text))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, borderLeft: "4px solid #0ea5e9" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "10"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text } }, "Upload Your 3D Project Model"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Store your BIM model or link to your external viewer"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9, marginLeft: 50 } }, /* @__PURE__ */ React.createElement("div", null, "\u2192 Go to ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "PROJECT SUPERINTENDENT \u2192 3D Project Model")), /* @__PURE__ */ React.createElement("div", null, "\u2192 Choose ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Upload File"), " to upload a GLB, GLTF, OBJ, IFC, or ZIP file (max 50MB)"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Or choose ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "External Link"), " and paste your BIM360, Navisworks, Matterport, or Trimble Connect URL"), /* @__PURE__ */ React.createElement("div", null, "\u2192 Once saved tap ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "\u{1F680} Open Model"), " to launch your 3D viewer instantly"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", background: darkMode ? "rgba(14,165,233,0.08)" : "#f0f9ff", borderRadius: 8, border: "1px solid rgba(14,165,233,0.2)", fontSize: 12, color: "#0ea5e9" } }, "\u{1F4A1} Full in-browser 3D viewer with markup capability is coming in a future update. For now store your file or link here for one-tap access from the job site."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, border: "1px solid rgba(16,185,129,0.3)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#10b981", marginBottom: 14 } }, "\u2705 What Populates Automatically Today"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, [
          ["Schedule Import", "Project Tracker populated with all activities and dates"],
          ["Schedule Import", "6-Week Look-Ahead auto-filters next 6 weeks of work"],
          ["Schedule Import", "Manpower estimates via MCAA labor unit tables"],
          ["Schedule Import", "Daily Briefing shows today's active activities"],
          ["Labor Rates Set", "Manpower Report calculates daily labor cost"],
          ["Manpower Logged", "Labor costs post to Financials automatically"],
          ["Change Order Approved", "Amount posts to Financials budget"],
          ["RFI Submitted", "Business day counter starts, alerts at 7 and 10 days"],
          ["Submittal Submitted", "Business day counter starts, alerts at 14 and 21 days"],
          ["New Drawing Revision", "Previous revisions marked SUPERSEDED automatically"]
        ].map(function(item, i) {
          return /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "8px 12px", background: darkMode ? "rgba(16,185,129,0.05)" : "#f0fdf4", borderRadius: 7, border: "1px solid rgba(16,185,129,0.15)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#10b981", marginBottom: 2 } }, item[0], " \u2192"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text2, lineHeight: 1.5 } }, item[1]));
        }))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 14, border: "1px solid rgba(245,158,11,0.3)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#f59e0b", marginBottom: 14 } }, "\u26A0\uFE0F What Requires Manual Entry Today"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text2, lineHeight: 1.9 } }, /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Bill of Materials (BOM)"), " \u2014 Must be entered manually or extracted from spec sections using the AI text tool. Auto-generation from drawings is a future feature."), /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Actual Manpower Hours"), " \u2014 You log your actual daily crew count. MCAA tables provide estimates but actual hours require your daily input."), /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Cost Code Spending"), " \u2014 Material and subcontract costs must be entered manually. Labor posts automatically from manpower."), /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "RFIs and Submittals"), " \u2014 Must be created manually as they arise. The app tracks and alerts but does not auto-create them."), /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Daily Logs"), " \u2014 Must be filled out daily. The app provides the structure but you provide the field data."), /* @__PURE__ */ React.createElement("div", null, "\u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Punch List Items"), " \u2014 Must be entered as deficiencies are identified during inspections."))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, border: "1px solid rgba(255,138,0,0.3)", background: darkMode ? "rgba(255,138,0,0.03)" : "#fff7ed" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24 } }, "\u{1F680}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#FF8A00" } }, "Coming Soon \u2014 Features Rolling Out"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "In active development \u2014 releasing in upcoming updates"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, [
          ["\u{1F916} AI-Powered BOM Generation", "Upload drawings and specs \u2014 AI reads them and auto-generates your full Bill of Materials with quantities and material types"],
          ["\u{1F4CA} Auto Manpower from Schedule", "Upload schedule and get a full manpower plan by trade and week using MCAA tables \u2014 no manual input needed"],
          ["\u{1F4F1} Native Mobile App", "Full iOS and Android app with offline mode, push notifications, and camera integration"],
          ["\u{1F3D7} In-Browser 3D Viewer", "View, rotate, and mark up your 3D model inside KoDox with links from RFIs and punch items to model locations"],
          ["\u{1F514} Email & Push Notifications", "Automatic alerts when RFIs go overdue, submittals are due, and deliveries are scheduled"],
          ["\u{1F465} Full Multi-Company Accounts", "Company accounts with user management, role-based access, and a GC portal for each project"],
          ["\u{1F4B3} QuickBooks & Sage Integration", "Direct sync \u2014 labor, change orders, and POs post automatically to your accounting software"],
          ["\u{1F4CB} Auto Contract Data Extraction", "Upload your executed contract and key dates, milestones, and liquidated damages populate automatically"],
          ["\u{1F504} Procore & Primavera Sync", "Two-way sync so schedule updates flow automatically between systems"],
          ["\u{1F4C8} Executive Dashboard", "Multi-project view for COOs showing all projects, budgets, manpower, and schedule health in one screen"],
          ["\u{1F4E7} Microsoft Outlook & Google Workspace Integration", "Connect your Outlook or Gmail \u2014 pull project emails into KoDox by project, send daily reports and RFIs directly from KoDox, and push Look-Ahead milestones straight into your Outlook or Google Calendar"],
          ["\u{1F4F7} JSA Timestamped Sign-In/Out Photos", "Camera capture when crew signs in and out on the JSA \u2014 date and time stamped automatically, included in JSA exports and the Reports Hub"],
          ["\u{1F4F1} Push Notifications", "Automatic alerts when RFIs go overdue, submittals are due, delays are logged, or punch items are assigned"],
          ["\u{1F3D7} Subcontractor Portal", "Let subs log their own fitter reports and JSAs \u2014 superintendent reviews and approves before they post"],
          ["\u{1F4CD} Jobsite Photo Library", "Attach photos to daily logs, punch items, and inspections with GPS tagging and timestamp"],
          ["\u{1F324} Auto Weather Pull", "Auto-populate weather on daily logs based on jobsite location \u2014 no manual entry needed"]
        ].map(function(item, i) {
          return /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "12px 14px", background: darkMode ? "rgba(255,255,255,0.03)" : "#fff", borderRadius: 8, border: darkMode ? "1px solid rgba(255,138,0,0.15)" : "1px solid rgba(255,138,0,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, item[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, lineHeight: 1.5 } }, item[1]));
        })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, padding: "10px 14px", background: "rgba(255,138,0,0.08)", borderRadius: 8, fontSize: 12, color: "#FF8A00", textAlign: "center", fontWeight: 600 } }, "Have a feature request? Contact us at kodoxsystems.com"))), tab2 === "contracts" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F4DC} Contracts & Proposals"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Upload and store your executed contract and project proposal for this project")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } }, [
          { key: "contract", label: "Executed Contract", icon: "\u{1F4CB}", desc: "The fully executed contract agreement for this project" },
          { key: "proposal", label: "Project Proposal", icon: "\u{1F4C4}", desc: "The original project proposal or bid document" }
        ].map(function(item) {
          var stored = localStorage.getItem("kodox_" + item.key + "_" + selProj);
          var storedName = localStorage.getItem("kodox_" + item.key + "_name_" + selProj);
          return /* @__PURE__ */ React.createElement("div", { key: item.key, style: { ...S.card, padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 12 } }, item.icon), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text, marginBottom: 6 } }, item.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 16, lineHeight: 1.5 } }, item.desc), stored ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: darkMode ? "rgba(16,185,129,0.08)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#10b981", marginBottom: 2 } }, "\u2713 Document Uploaded"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, storedName || "Document")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("a", { href: stored, download: storedName || item.label, style: { ...S.btnP, textDecoration: "none", fontSize: 12, padding: "8px 16px" } }, "\u2B07 Download"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
            if (window.confirm("Remove this document?")) {
              localStorage.removeItem("kodox_" + item.key + "_" + selProj);
              localStorage.removeItem("kodox_" + item.key + "_name_" + selProj);
              showToast("Document removed");
            }
          }, style: { ...S.btnS, fontSize: 12, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Remove"))) : /* @__PURE__ */ React.createElement("label", { style: { display: "block", border: "2px dashed rgba(255,138,0,0.3)", borderRadius: 12, padding: "28px 20px", textAlign: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, item.icon), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, ...S.text, marginBottom: 4 } }, "Tap to Upload ", item.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, "PDF, DOC, DOCX \u2014 Max 10MB"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".pdf,.doc,.docx", style: { display: "none" }, onChange: (e) => {
            var file = e.target.files[0];
            if (!file) return;
            if (file.size > 10 * 1024 * 1024) {
              showToast("File must be under 10MB");
              return;
            }
            var reader = new FileReader();
            reader.onload = function(ev) {
              localStorage.setItem("kodox_" + item.key + "_" + selProj, ev.target.result);
              localStorage.setItem("kodox_" + item.key + "_name_" + selProj, file.name);
              showToast(item.label + " uploaded \u2713");
            };
            reader.readAsDataURL(file);
            e.target.value = "";
          } })));
        }))), tab2 === "schedule" && /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 780, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
          resetImport();
          setImportMode("schedule");
        }, style: { ...S.btnP, opacity: importMode === "schedule" ? 1 : 0.5 } }, "\u{1F4E5} Schedule Import"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          resetImport();
          setImportMode("costcode");
          setTab("costcodes");
        }, style: { ...S.btnW, opacity: importMode === "costcode" ? 1 : 0.5 } }, "\u{1F4D1} Cost Code Import \u2192")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", marginBottom: 20, alignItems: "center" } }, ["Upload File", "Select Project", "Preview", "Done"].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s, style: { flex: 1, display: "flex", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: importStep > i + 1 ? "#3b82f6" : importStep === i + 1 ? "#1e3a5f" : "#1a2035", border: `2px solid ${importStep >= i + 1 ? "#3b82f6" : "#2a3150"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: importStep >= i + 1 ? "#fff" : "#4a5580" } }, importStep > i + 1 ? "\u2713" : i + 1), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: importStep === i + 1 ? "#60a5fa" : "#4a5580" } }, s)), i < 3 && /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 2, background: importStep > i + 1 ? "#3b82f6" : "#1e2538", marginBottom: 16 } })))), importStep === 1 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4 } }, "\u{1F4E5} Import Project Schedule"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 16 } }, "Upload CSV or Excel from Primavera P6, MS Project, Procore, Fieldwire, or any scheduling tool. Auto-detects column names."), /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "#0f1117" : "#f8fafc", border: "2px dashed #2a3150", borderRadius: 10, padding: "26px 18px", textAlign: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 6 } }, "\u{1F4C2}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginBottom: 3 } }, "Choose your schedule file"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 12 } }, "CSV \xB7 XLSX \xB7 XLS from P6, MS Project, Procore, Excel"), /* @__PURE__ */ React.createElement("input", { ref: schedRef, type: "file", accept: ".csv,.xlsx,.xls,.txt", style: { display: "none" }, onChange: handleSchedFile }), /* @__PURE__ */ React.createElement("button", { onClick: () => schedRef.current.click(), style: S.btnP }, "Choose File")), importMsg && /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 12px", borderRadius: 7, background: importMsg.startsWith("\u274C") ? "#2a1a1a" : "#0f2a1a", color: importMsg.startsWith("\u274C") ? "#f87171" : "#6ee7b7", fontSize: 12 } }, importMsg), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, padding: "12px 14px", background: darkMode ? "#0f1117" : "#f8fafc", borderRadius: 8, border: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, fontSize: 11, ...S.text3 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 5, fontSize: 9, letterSpacing: 0.5 } }, "AUTO-DETECTED COLUMNS (any order)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 } }, ["Activity Name / Task Name / Description", "Start / Start Date / Early Start / Planned Start", "Finish / End / End Date / Planned Finish", "Duration / Dur / Days", "% Complete / Percent Complete / Progress", "Trade / Subcontractor / Discipline", "Assignee / Resource / Foreman", "Notes / Comments / Remarks"].map((c) => /* @__PURE__ */ React.createElement("div", { key: c }, "\u2022 ", c))))), importStep === 2 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4 } }, "\u{1F3D7} Assign to Project"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 14 } }, importMsg), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "ASSIGN ", importRows.length, " ", importMode === "schedule" ? "ACTIVITIES" : "COST CODES", " TO PROJECT"), /* @__PURE__ */ React.createElement("select", { value: importProjId, onChange: (e) => setImportProjId(e.target.value), style: { ...S.iS, fontSize: 13, padding: "9px 11px" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select a Project \u2014"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), !projects.length && /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 12px", background: "#1a2035", borderRadius: 7, fontSize: 11, color: "#f59e0b", marginBottom: 10 } }, "\u26A0 No projects. ", /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setTab("projects");
          setTimeout(() => openAdd("project"), 100);
        }, style: { background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: 11 } }, "Create one first \u2192")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: resetImport, style: S.btnS }, "\u2190 Back"), /* @__PURE__ */ React.createElement("button", { onClick: () => setImportStep(3), disabled: !importProjId, style: { ...S.btnP, opacity: importProjId ? 1 : 0.4 } }, "Preview \u2192"))), importStep === 3 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4 } }, "\u{1F441} Preview \u2014 ", importRows.length, " ", importMode === "schedule" ? "Activities" : "Cost Codes"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 14 } }, "Review auto-detected data below. Click Import to populate your system."), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto", maxHeight: 320, overflowY: "auto", borderRadius: 8, border: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11 } }, /* @__PURE__ */ React.createElement("thead", { style: { position: "sticky", top: 0 } }, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, importMode === "schedule" ? ["#", "Activity", "Trade", "Start", "End", "Dur", "% Done", "Status"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "7px 10px", textAlign: "left", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 9 } }, h)) : ["Code", "Description", "Category", "Budget", "Committed", "Spent", "Variance", "Status"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "7px 10px", textAlign: "left", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 9 } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, importRows.map((r) => /* @__PURE__ */ React.createElement("tr", { key: r.id, style: S.tRow, onMouseEnter: (e) => e.currentTarget.style.background = darkMode ? "#1a1f2e" : "#f8fafc", onMouseLeave: (e) => e.currentTarget.style.background = "" }, importMode === "schedule" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", ...S.text3, fontFamily: "monospace", fontSize: 10 } }, r.actId), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontWeight: 500, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.description), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", ...S.text2 } }, r.trade), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, ...S.text3 } }, r.startDate || "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, ...S.text3 } }, r.endDate || "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, ...S.text3 } }, r.duration > 0 ? r.duration + "d" : "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, color: "#10b981" } }, r.pct, "%"), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px" } }, /* @__PURE__ */ React.createElement(Pill, { status: r.status }))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, color: "#818cf8" } }, r.code), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.description), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", ...S.text2 } }, r.category), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, color: "#10b981" } }, $c(r.budgeted)), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, color: "#60a5fa" } }, $c(r.committed)), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, color: "#f59e0b" } }, $c(r.spent)), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px", fontFamily: "monospace", fontSize: 10, color: r.variance >= 0 ? "#10b981" : "#ef4444" } }, r.variance >= 0 ? "+" : "", $c(r.variance)), /* @__PURE__ */ React.createElement("td", { style: { padding: "5px 10px" } }, /* @__PURE__ */ React.createElement(Pill, { status: r.status })))))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setImportStep(2), style: S.btnS }, "\u2190 Back"), /* @__PURE__ */ React.createElement("button", { onClick: commitImport, style: S.btnG }, "\u2705 Import ", importRows.length, " ", importMode === "schedule" ? "Activities" : "Cost Codes"))), importStep === 4 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 32, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "\u2705"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 4 } }, "Import Successful!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 20 } }, importRows.length, " ", importMode === "schedule" ? "activities imported \u2014 check your Project Tracker and 6-Week Look-Ahead" : "cost codes imported \u2014 check your Financials and Cost Codes tabs", "."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } }, importMode === "schedule" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("tracker"), style: S.btnP }, "\u{1F4CA} View Tracker"), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("lookahead"), style: S.btnW }, "\u{1F4C5} 6-Week Look-Ahead")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("financials"), style: S.btnP }, "\u{1F4B0} View Financials"), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("costcodes"), style: S.btnW }, "\u{1F4D1} View Cost Codes")), /* @__PURE__ */ React.createElement("button", { onClick: resetImport, style: S.btnS }, "Import Another")))), tab2 === "tracker" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3 } }, trackerTasks.length, " activities \xB7 ", Object.keys(tradeGroups).length, " trades"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("schedule"), style: S.btnW }, "\u{1F4E5} Re-Import"), /* @__PURE__ */ React.createElement("button", { onClick: () => reportTracker(filt(tasks), projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("task"), style: S.btnP }, "+ Add Activity"))), !trackerTasks.length ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: 50, ...S.text3 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, "\u{1F4E5}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, marginBottom: 5, ...S.text } }, "No activities yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, marginBottom: 14 } }, "Import your schedule or add manually."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("schedule"), style: S.btnW }, "\u{1F4E5} Import Schedule"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("task"), style: S.btnP }, "+ Add Manually"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, Object.entries(tradeGroups).map(([trade, tTasks]) => {
          const done = tTasks.filter((t) => t.status === "Complete").length;
          const delayed = tTasks.filter((t) => t.status === "Delayed").length;
          const avgPct = Math.round(tTasks.reduce((s, t) => s + (Number(t.pct) || 0), 0) / tTasks.length);
          return /* @__PURE__ */ React.createElement("div", { key: trade, style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "#0f1117" : "#f8fafc", borderBottom: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 13 } }, trade), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, tTasks.length, " activities"), delayed > 0 && /* @__PURE__ */ React.createElement("span", { style: { background: "#fee2e2", color: "#991b1b", padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700 } }, "\u26A0 ", delayed, " delayed")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, done, "/", tTasks.length, " complete"), /* @__PURE__ */ React.createElement("div", { style: { width: 80 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 9, ...S.text3, marginBottom: 2 } }, /* @__PURE__ */ React.createElement("span", null, "Progress"), /* @__PURE__ */ React.createElement("span", { style: { color: "#60a5fa" } }, avgPct, "%")), /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "#0f1117" : "#e2e8f0", borderRadius: 3, height: 4, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${avgPct}%`, height: "100%", background: "linear-gradient(90deg,#3b82f6,#8b5cf6)", borderRadius: 3 } }))))), tTasks.map((t) => {
            const bS = t.startDate ? Math.max(0, diffDays(minD, t.startDate) / tSpan * 100) : 0;
            const bW = t.startDate && t.endDate ? Math.max(0.5, diffDays(t.startDate, t.endDate) / tSpan * 100) : 0;
            const c = SC[t.status] || SC["Not Started"];
            const ov = t.endDate && t.endDate < todayStr && t.status !== "Complete";
            return /* @__PURE__ */ React.createElement("div", { key: t.id, style: { padding: "8px 14px", borderBottom: `1px solid ${darkMode ? "#0f1117" : "#f1f5f9"}`, display: "grid", gridTemplateColumns: "minmax(200px,280px) 1fr auto", gap: 10, alignItems: "center" }, onMouseEnter: (e) => e.currentTarget.style.background = darkMode ? "#1a1f2e" : "#f8fafc", onMouseLeave: (e) => e.currentTarget.style.background = "" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 500, color: ov ? "#f87171" : "inherit", marginBottom: 1, lineHeight: 1.4, wordBreak: "break-word" } }, t.description), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, display: "flex", gap: 7, flexWrap: "wrap" } }, t.assignee && /* @__PURE__ */ React.createElement("span", null, t.assignee), t.startDate && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace" } }, t.startDate, "\u2192", t.endDate || "?"), t.totalLaborHours > 0 && /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00", fontWeight: 600, fontFamily: "monospace" } }, t.totalLaborHours, "hrs"), t.workersPerDay > 0 && /* @__PURE__ */ React.createElement("span", { style: { color: "#10b981", fontWeight: 600 } }, t.workersPerDay, "w/day"), ov && /* @__PURE__ */ React.createElement("span", { style: { color: "#ef4444", fontWeight: 700 } }, "OVERDUE"))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 16, background: darkMode ? "#0f1117" : "#e2e8f0", borderRadius: 3, overflow: "hidden" } }, todayStr >= minD && todayStr <= maxD && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: `${diffDays(minD, todayStr) / tSpan * 100}%`, top: 0, bottom: 0, width: 1, background: "#ef4444", zIndex: 2 } }), bW > 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: `${bS}%`, width: `${bW}%`, height: "100%", background: c.dot, opacity: 0.85, borderRadius: 2, minWidth: 2 } }, bW > 10 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 3, top: "50%", transform: "translateY(-50%)", fontSize: 8, color: "#fff", fontWeight: 700 } }, t.pct > 0 ? t.pct + "%" : ""))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, alignItems: "center" } }, /* @__PURE__ */ React.createElement(Pill, { status: t.status }), /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit("task", t), style: { background: darkMode ? "#1e2940" : "#e0e7ff", border: "none", color: "#60a5fa", padding: "3px 7px", borderRadius: 4, cursor: "pointer", fontSize: 9 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => delRec(setTasks, t.id), style: { background: darkMode ? "#2a1a1a" : "#fee2e2", border: "none", color: "#ef4444", padding: "3px 7px", borderRadius: 4, cursor: "pointer", fontSize: 9 } }, "Del")));
          }));
        }))), tab2 === "lookahead" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 14, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3 } }, byWeek(fmt(today), fmt(addDays(today, 41))).length, " activities in next 6 weeks"), /* @__PURE__ */ React.createElement("button", { onClick: () => reportLookahead(tasks, projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 8 } }, weeks.map((w, wi) => {
          const wt = byWeek(w.start, w.end);
          const byTr = {};
          wt.forEach((t) => {
            if (!byTr[t.trade]) byTr[t.trade] = [];
            byTr[t.trade].push(t);
          });
          return /* @__PURE__ */ React.createElement("div", { key: wi, style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { background: wi === 0 ? "linear-gradient(135deg,#1e3a5f,#1a2e4a)" : darkMode ? "#0f1117" : "#f8fafc", borderBottom: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 1 } }, "WEEK ", wi + 1, wi === 0 ? " \xB7 NOW" : ""), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 600, color: wi === 0 ? "#60a5fa" : darkMode ? "#94a3b8" : "#475569" } }, w.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, marginTop: 1 } }, wt.length, " activit", wt.length === 1 ? "y" : "ies")), /* @__PURE__ */ React.createElement("div", { style: { padding: 6, display: "flex", flexDirection: "column", gap: 4, minHeight: 80 } }, !wt.length && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, textAlign: "center", padding: "12px 0" } }, "No activities"), Object.entries(byTr).map(([trade, tArr]) => /* @__PURE__ */ React.createElement("div", { key: trade }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, ...S.text3, fontWeight: 700, letterSpacing: 0.5, padding: "3px 0 2px" } }, trade.toUpperCase()), tArr.map((t) => {
            const c = SC[t.status] || SC["Not Started"];
            const ov = t.endDate && t.endDate < todayStr && t.status !== "Complete";
            return /* @__PURE__ */ React.createElement("div", { key: t.id, style: { background: darkMode ? "#0a0d14" : "#f8fafc", border: `1px solid ${c.dot}33`, borderLeft: `3px solid ${ov ? "#ef4444" : c.dot}`, borderRadius: 6, padding: "5px 7px", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 600, marginBottom: 1, color: ov ? "#f87171" : darkMode ? "#d1d9f0" : "#0f172a", lineHeight: 1.4, wordBreak: "break-word" } }, t.description), t.assignee && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, marginBottom: 2 } }, t.assignee), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement(Pill, { status: t.status }), t.pct > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8, color: "#10b981", fontFamily: "monospace" } }, t.pct, "%")), t.pct > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 3, background: darkMode ? "#1e2538" : "#e2e8f0", borderRadius: 2, height: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${t.pct}%`, height: "100%", background: "#10b981", borderRadius: 2 } })));
          })))));
        }))), tab2 === "financials" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 } }, statCard("Total Budget", $c(totalBudget), "original contract", "#3b82f6"), statCard("Committed", $c(totalCommitted), "PO + subcontracts", "#8b5cf6"), statCard("Total Spent", $c(totalSpent), `${pct(totalSpent, totalBudget)}% of budget`, "#f59e0b"), statCard("Variance", totalVariance >= 0 ? "+" + $c(totalVariance) : "-" + $c(Math.abs(totalVariance)), totalVariance >= 0 ? "under budget" : "OVER BUDGET", totalVariance >= 0 ? "#10b981" : "#ef4444")), projCodes.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", null, "Budget vs. Actual by Category"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, fontSize: 10 } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, background: "#1E5A8C", display: "inline-block", borderRadius: 2, marginRight: 4 } }), "Budget"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, background: "#10b981", display: "inline-block", borderRadius: 2, marginRight: 4 } }), "Spent"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, background: "#ef4444", display: "inline-block", borderRadius: 2, marginRight: 4 } }), "Over Budget"))), COST_CATEGORIES.filter((cat) => projCodes.some((c) => c.category === cat)).map((cat) => {
          const cc = projCodes.filter((c) => c.category === cat);
          const bud = cc.reduce((s, c) => s + Number(c.budgeted || 0), 0);
          const sp = cc.reduce((s, c) => s + Number(c.spent || 0), 0);
          const maxV = Math.max(bud, sp, 1);
          const budW = Math.round(bud / maxV * 100);
          const spW = Math.round(sp / maxV * 100);
          const over = sp > bud;
          return /* @__PURE__ */ React.createElement("div", { key: cat, style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 600, ...S.text } }, cat), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontFamily: "monospace", ...S.text3 } }, $c(sp), " / ", $c(bud), over && /* @__PURE__ */ React.createElement("span", { style: { color: "#ef4444", fontWeight: 700, marginLeft: 6 } }, "OVER"))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 9, background: darkMode ? "#1a2035" : "#f1f5f9", borderRadius: 5, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, height: "100%", width: budW + "%", background: darkMode ? "rgba(30,90,140,0.4)" : "rgba(30,90,140,0.2)", borderRadius: 5 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, height: "100%", width: spW + "%", background: over ? "#ef4444" : "#10b981", borderRadius: 5, opacity: 0.85 } })));
        })), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "11px 16px", borderBottom: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, fontWeight: 600, fontSize: 13, display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", null, "Budget vs. Spent by Category"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("transaction"), style: S.btnP }, "+ Log Transaction")), COST_CATEGORIES.map((cat) => {
          const catCodes = projCodes.filter((c) => c.category === cat);
          if (!catCodes.length) return null;
          const bud = catCodes.reduce((s, c) => s + Number(c.budgeted || 0), 0);
          const com = catCodes.reduce((s, c) => s + Number(c.committed || 0), 0);
          const sp = catCodes.reduce((s, c) => s + Number(c.spent || 0), 0);
          const p = pct(sp, bud);
          return /* @__PURE__ */ React.createElement("div", { key: cat, style: { padding: "12px 16px", borderBottom: `1px solid ${darkMode ? "#151a28" : "#f1f5f9"}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, cat), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, fontSize: 11, fontFamily: "monospace" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#3b82f6" } }, "Budget: ", $c(bud)), /* @__PURE__ */ React.createElement("span", { style: { color: "#8b5cf6" } }, "Committed: ", $c(com)), /* @__PURE__ */ React.createElement("span", { style: { color: "#f59e0b" } }, "Spent: ", $c(sp)), /* @__PURE__ */ React.createElement("span", { style: { color: sp > bud ? "#ef4444" : "#10b981" } }, "Var: ", sp > bud ? "-" : "+", $c(Math.abs(bud - sp))))), /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "#0f1117" : "#e2e8f0", borderRadius: 5, height: 8, overflow: "hidden", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${Math.min(100, pct(com, bud))}%`, height: "100%", background: "#8b5cf633", position: "absolute" } }), /* @__PURE__ */ React.createElement("div", { style: { width: `${Math.min(100, p)}%`, height: "100%", background: p > 100 ? "#ef4444" : p > 85 ? "#f59e0b" : "#3b82f6", borderRadius: 5 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 9, ...S.text3, marginTop: 3 } }, /* @__PURE__ */ React.createElement("span", null, p, "% spent"), /* @__PURE__ */ React.createElement("span", null, catCodes.length, " cost codes")));
        }), !projCodes.length && /* @__PURE__ */ React.createElement("div", { style: { padding: 24, textAlign: "center", fontSize: 12, ...S.text3 } }, "No cost codes. ", /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("costcodes"), style: { background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: 12 } }, "Import cost codes \u2192"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "11px 16px", borderBottom: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, fontWeight: 600, fontSize: 13, display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", null, "Transaction Log (", projTx.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportFinancials(projCodes, projTx, projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("transaction"), style: S.btnP }, "+ Log Transaction"))), /* @__PURE__ */ React.createElement(LT, { rows: projTx.sort((a, b) => (b.date || "").localeCompare(a.date || "")), onEdit: (t) => openEdit("transaction", t), onDel: (id) => delRec(setTransactions2, id), cols: [
          pCol,
          { k: "date", l: "DATE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, ...S.text3 } }, v) },
          { k: "description", l: "DESCRIPTION" },
          { k: "vendor", l: "VENDOR" },
          { k: "category", l: "CATEGORY" },
          { k: "type", l: "TYPE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: v === "Credit" ? "#10b981" : "#f59e0b", fontWeight: 600 } }, v) },
          { k: "amount", l: "AMOUNT", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#60a5fa", fontWeight: 700 } }, $c(v)) },
          { k: "notes", l: "NOTES" }
        ] }))), tab2 === "costcodes" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, statCard("Cost Codes", projCodes.length, "", "#3b82f6"), statCard("Total Budget", $c(totalBudget), "", "#8b5cf6"), statCard("Total Spent", $c(totalSpent), `${pct(totalSpent, totalBudget)}% used`, "#f59e0b"), statCard("Over Budget", projCodes.filter((c) => Number(c.spent || 0) > Number(c.budgeted || 0)).length, "cost codes over", "#ef4444")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("input", { ref: costRef, type: "file", accept: ".csv,.xlsx,.xls", style: { display: "none" }, onChange: (e) => {
          setTab("schedule");
          handleCostFile(e);
          setImportMode("costcode");
        } }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setTab("schedule");
          resetImport();
          setImportMode("costcode");
        }, style: S.btnW }, "\u{1F4D1} Import Cost Codes"), /* @__PURE__ */ React.createElement("button", { onClick: () => exp(projCodes, ["code", "description", "category", "budgeted", "committed", "spent", "variance", "status", "notes", "projectId"], "cost_codes"), style: S.btnS }, "\u2B07 Export"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("costcode"), style: S.btnP }, "+ Add Cost Code")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: projCodes, onEdit: (c) => openEdit("costcode", c), onDel: (id) => delRec(setCostCodes, id), cols: [
          pCol,
          { k: "code", l: "CODE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#818cf8", fontWeight: 700 } }, v) },
          { k: "description", l: "DESCRIPTION" },
          { k: "category", l: "CATEGORY" },
          { k: "budgeted", l: "BUDGET", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#3b82f6", fontWeight: 600 } }, $c(v)) },
          { k: "committed", l: "COMMITTED", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#8b5cf6" } }, $c(v)) },
          { k: "spent", l: "SPENT", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#f59e0b" } }, $c(v)) },
          { k: "variance", l: "VARIANCE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: Number(v) >= 0 ? "#10b981" : "#ef4444", fontWeight: 700 } }, Number(v) >= 0 ? "+" : "", $c(v)) },
          { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) },
          { k: "notes", l: "NOTES" }
        ] }))), tab2 === "model3d" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F3E2} 3D Project Model"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Upload your 3D model file or link to your BIM360, Navisworks, or Matterport viewer")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text, marginBottom: 6 } }, "\u{1F4C1} Upload 3D Model File"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 14, lineHeight: 1.6 } }, "Supported: GLB, GLTF, OBJ, IFC, ZIP \u2014 Max 50MB"), (() => {
          var stored3d = localStorage.getItem("kodox_3d_" + selProj);
          var stored3dName = localStorage.getItem("kodox_3d_name_" + selProj);
          if (stored3d) {
            return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: darkMode ? "rgba(16,185,129,0.08)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#10b981", marginBottom: 2 } }, "\u2713 Model Uploaded"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, stored3dName || "3D Model")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("a", { href: stored3d, download: stored3dName || "model", style: { ...S.btnP, textDecoration: "none", fontSize: 12, padding: "8px 16px" } }, "\u2B07 Download"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
              if (window.confirm("Remove this 3D model?")) {
                localStorage.removeItem("kodox_3d_" + selProj);
                localStorage.removeItem("kodox_3d_name_" + selProj);
                showToast("Removed");
              }
            }, style: { ...S.btnS, fontSize: 12, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Remove")));
          }
          return /* @__PURE__ */ React.createElement("label", { style: { display: "block", border: "2px dashed rgba(255,138,0,0.3)", borderRadius: 12, padding: "28px 20px", textAlign: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 8 } }, "\u{1F3E2}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, ...S.text, marginBottom: 4 } }, "Tap to Upload 3D Model"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, "GLB, GLTF, OBJ, IFC, ZIP \u2014 Max 50MB"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".glb,.gltf,.obj,.ifc,.zip", style: { display: "none" }, onChange: (e) => {
            var file = e.target.files[0];
            if (!file) return;
            if (file.size > 50 * 1024 * 1024) {
              showToast("File must be under 50MB");
              return;
            }
            var reader = new FileReader();
            reader.onload = function(ev) {
              localStorage.setItem("kodox_3d_" + selProj, ev.target.result);
              localStorage.setItem("kodox_3d_name_" + selProj, file.name);
              showToast("3D model uploaded \u2713");
            };
            reader.readAsDataURL(file);
            e.target.value = "";
          } }));
        })()), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text, marginBottom: 6 } }, "\u{1F517} Link to External Viewer"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 14, lineHeight: 1.6 } }, "BIM360, Navisworks, Matterport, Trimble Connect, Procore BIM"), (() => {
          var link3d = localStorage.getItem("kodox_3d_link_" + selProj);
          if (link3d) {
            return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: darkMode ? "rgba(16,185,129,0.08)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#10b981", marginBottom: 2 } }, "\u2713 Link Saved"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, wordBreak: "break-all" } }, link3d)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("a", { href: link3d, target: "_blank", rel: "noreferrer", style: { ...S.btnP, textDecoration: "none", fontSize: 12, padding: "8px 16px" } }, "\u{1F680} Open Model"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
              localStorage.removeItem("kodox_3d_link_" + selProj);
              showToast("Link removed");
            }, style: { ...S.btnS, fontSize: 12, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Remove")));
          }
          return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Model URL"), /* @__PURE__ */ React.createElement("input", { id: "m3d-url", placeholder: "https://acc.autodesk.com/... or Matterport link", style: { ...S.iS, marginBottom: 10 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
            var url = document.getElementById("m3d-url").value.trim();
            if (!url || !url.startsWith("http")) {
              alert("Please enter a valid URL starting with https://");
              return;
            }
            localStorage.setItem("kodox_3d_link_" + selProj, url);
            showToast("Link saved \u2713");
          }, style: S.btnP }, "Save Link"));
        })())), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 14, border: "1px solid rgba(255,138,0,0.2)", background: darkMode ? "rgba(255,138,0,0.04)" : "#fff7ed" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#FF8A00", marginBottom: 4 } }, "\u{1F680} Coming Soon"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, lineHeight: 1.6 } }, "Full in-browser 3D viewer with markup, clash detection notes, and direct links from RFIs and punch items to model locations."))), tab2 === "rental" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, statCard("Total Rentals", af(rental).length, "", "#3b82f6"), statCard("On Rent", activeRental.length, "currently active", "#10b981"), statCard("Est. Daily Cost", $c(activeRental.reduce((s, r) => s + Number(r.dailyRate || 0), 0)), "combined", "#f59e0b"), statCard("Est. Total Cost", $c(af(rental).reduce((s, r) => s + Number(r.totalCost || 0), 0)), "all rentals", "#8b5cf6")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportRental(filt(rental), projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("rental"), style: S.btnP }, "+ Add Rental")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(rental), onEdit: (r) => openEdit("rental", r), onDel: (id) => delRec(setRental, id), cols: [
          pCol,
          { k: "equipName", l: "EQUIPMENT" },
          { k: "equipType", l: "TYPE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { background: darkMode ? "#1e2940" : "#e0e7ff", color: "#818cf8", padding: "2px 7px", borderRadius: 5, fontSize: 11 } }, v) },
          { k: "vendor", l: "VENDOR / RENTAL CO" },
          { k: "poNumber", l: "PO #", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#818cf8" } }, v) },
          { k: "rentStart", l: "RENT START", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, ...S.text3 } }, v) },
          { k: "rentEnd", l: "RENT END", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: v && v < todayStr ? "#ef4444" : darkMode ? "#5a6480" : "#64748b" } }, v || "\u2014") },
          { k: "dailyRate", l: "DAILY RATE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#10b981", fontWeight: 600 } }, $c(v)) },
          { k: "totalCost", l: "TOTAL COST", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#f59e0b", fontWeight: 600 } }, $c(v)) },
          { k: "jobsite", l: "JOBSITE / LOCATION" },
          { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) },
          { k: "notes", l: "NOTES" }
        ] }))), tab2 === "projects" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => exp(projects, ["id", "name", "location", "owner", "gc", "startDate", "endDate", "budget", "spent", "status", "completion"], "projects"), style: S.btnS }, "\u2B07 Export"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("project"), style: S.btnP }, "+ New Project")), !projects.length && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", ...S.text3, padding: 50, fontSize: 12 } }, "No projects yet. Click ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#60a5fa" } }, "+ New Project"), " to start."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 12 } }, projects.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { ...S.card, padding: 15, cursor: "pointer" }, onClick: () => {
          setSelProj(p.id);
          setTab("tracker");
        } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 13 } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, marginTop: 1 } }, p.location)), /* @__PURE__ */ React.createElement(Pill, { status: p.status })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 9 } }, [["Owner", p.owner], ["GC", p.gc], ["Start", p.startDate], ["End", p.endDate], ["Budget", p.budget ? $c(Number(p.budget)) : "\u2014"], ["Spent", p.spent ? $c(Number(p.spent)) : "\u2014"]].map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { background: darkMode ? "#0f1117" : "#f8fafc", borderRadius: 6, padding: "5px 8px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, ...S.text3, marginBottom: 1 } }, k.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { ...S.text2, fontWeight: 500, fontSize: 11 } }, v || "\u2014")))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, display: "flex", justifyContent: "space-between", ...S.text3, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", null, "Completion"), /* @__PURE__ */ React.createElement("span", { style: { color: "#60a5fa", fontWeight: 600 } }, p.completion || 0, "%")), /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "#0f1117" : "#e2e8f0", borderRadius: 4, height: 5, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${p.completion || 0}%`, height: "100%", background: "linear-gradient(90deg,#3b82f6,#8b5cf6)", borderRadius: 4 } })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 7, fontSize: 10, color: "#3b82f6", textAlign: "right" } }, "View tracker \u2192"))))), tab2 === "tasks" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => exp(filt(tasks), ["actId", "projectId", "trade", "description", "assignee", "startDate", "endDate", "duration", "pct", "status", "notes"], "tasks"), style: S.btnS }, "\u2B07 Export"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("task"), style: S.btnP }, "+ New Task")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(tasks), onEdit: (t) => openEdit("task", t), onDel: (id) => delRec(setTasks, id), cols: [pCol, { k: "actId", l: "ID", r: (v) => v ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: "#818cf8" } }, v) : null }, { k: "trade", l: "TRADE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { ...S.text2 } }, v) }, { k: "description", l: "DESCRIPTION" }, { k: "assignee", l: "ASSIGNEE" }, { k: "startDate", l: "START", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "endDate", l: "END", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "pct", l: "% DONE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: "#10b981" } }, v || 0, "%") }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "notes", l: "NOTES" }] }))), tab2 === "dailylogs" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportDailyLogs(filt(dailyLogs), projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("dailylog"), style: S.btnP }, "+ New Daily Log")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, !filt(dailyLogs).length && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 12 } }, "\u{1F4CB}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 600, ...S.text, marginBottom: 8 } }, "No Daily Logs Yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3, marginBottom: 20 } }, `Click "+ New Daily Log" to log today's work, manpower, and progress.`), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("dailylog"), style: S.btnP }, "+ New Daily Log")), filt(dailyLogs).sort((a, b) => b.date.localeCompare(a.date)).map((log) => /* @__PURE__ */ React.createElement("div", { key: log.id, style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "#0f1117" : "#f8fafc", borderBottom: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, fontSize: 13, color: "#60a5fa", fontFamily: "monospace" } }, log.date), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 12 } }, pN(log.projectId)), /* @__PURE__ */ React.createElement("span", { style: { background: darkMode ? "#1e2940" : "#e0e7ff", padding: "1px 7px", borderRadius: 5, fontSize: 10, ...S.text2 } }, log.weather), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text3 } }, "\u{1F321} ", log.tempLow, "\xB0\u2013", log.tempHigh, "\xB0F"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text3 } }, "\u{1F477} ", log.manpower || log.crewCount || 0, " workers \xB7 ", log.totalHoursDay || 0, " man-hrs")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => printDailyLog(log, projects, companyName2), style: { background: darkMode ? "#0f2a1a" : "#d1fae5", border: "none", color: "#10b981", padding: "4px 8px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Print"), /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit("dailylog", log), style: { background: darkMode ? "#1e2940" : "#e0e7ff", border: "none", color: "#60a5fa", padding: "4px 8px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => delRec(setDailyLogs, log.id), style: { background: darkMode ? "#2a1a1a" : "#fee2e2", border: "none", color: "#ef4444", padding: "4px 8px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Del"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, [["Work Performed", log.workPerformed, true], ["Location / Area", log.location, true], ["Foreman", log.foreman, false], ["Company", log.companyName, false], ["Manpower", log.manpower ? log.manpower + " workers" : null, false], ["Hours Worked", log.hoursWorked ? log.hoursWorked + " hrs/worker" : null, false], ["Total Man-Hours", log.totalHoursDay ? log.totalHoursDay + " hrs" : null, false], ["Rental Equipment", log.rentalEquipUsed, true], ["Equipment Hours", log.rentalHoursUsed ? log.rentalHoursUsed + " hrs" : null, false], ["Inspection Time", log.rentalInspectionTime, false], ["Equipment Comments", log.rentalComments, true], ["Visitors", log.visitors, false], ["Delays", log.delays, false], ["Safety", log.safety, false], ["Notes", log.notes, true]].filter(([, v]) => v).map(([k, v, full]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { gridColumn: full ? "1/-1" : "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, ...S.text3, fontWeight: 700, marginBottom: 2 } }, k.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, v || "\u2014")))))), !filt(dailyLogs).length && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", ...S.text3, padding: 36, fontSize: 12 } }, "No daily logs yet."))), tab2 === "delays" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, statCard("Total", filt(delays2).length, "", "#94a3b8"), statCard("Active", filt(delays2).filter((d) => d.status === "Active").length, "", "#ef4444"), statCard("Days Lost", filt(delays2).reduce((s, d) => s + (Number(d.daysLost) || 0), 0), "", "#f59e0b"), statCard("Resolved", filt(delays2).filter((d) => d.status === "Resolved").length, "", "#10b981")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportDelays(filt(delays2), projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("delay"), style: S.btnP }, "+ Log Delay")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(delays2).sort((a, b) => (b.dateReported || "").localeCompare(a.dateReported || "")), onEdit: (item) => openEdit("delay", item), onDel: (id) => delRec(setDelays, id), cols: [pCol, { k: "dateReported", l: "DATE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "delayType", l: "TYPE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { background: darkMode ? "#1e2940" : "#e0e7ff", ...S.text2, padding: "1px 6px", borderRadius: 4, fontSize: 10 } }, v) }, { k: "description", l: "DESCRIPTION" }, { k: "trade", l: "TRADE" }, { k: "daysLost", l: "DAYS", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: Number(v) > 0 ? "#ef4444" : darkMode ? "#5a6480" : "#64748b", fontWeight: 700 } }, v || 0) }, { k: "noticeGiven", l: "NOTICE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: v === "Yes" ? "#10b981" : "#ef4444" } }, v || "No") }, { k: "costImpact", l: "COST", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: "#f59e0b" } }, v ? "$" + Number(v).toLocaleString() : "\u2014") }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "notes", l: "NOTES" }] }))), tab2 === "punchlist" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportPunchList(filt(punchList), projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("punch"), style: S.btnP }, "+ New Item")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(punchList), onEdit: (item) => openEdit("punch", item), onDel: (id) => delRec(setPunchList, id), cols: [pCol, { k: "area", l: "AREA" }, { k: "trade", l: "TRADE" }, { k: "description", l: "DESCRIPTION" }, { k: "assignee", l: "ASSIGNEE" }, { k: "dueDate", l: "DUE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: v < todayStr ? "#ef4444" : darkMode ? "#5a6480" : "#64748b" } }, v) }, { k: "priority", l: "PRIORITY", r: (v) => /* @__PURE__ */ React.createElement(PrioB, { p: v }) }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "notes", l: "NOTES" }] }))), tab2 === "bom" && /* @__PURE__ */ React.createElement(BOMTab, { S, darkMode, projects, bom, setBOM, selProj, costCodes }), tab2 === "actions" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportActionItems(filt(actionItems), projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("action"), style: S.btnP }, "+ New Action Item")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(actionItems), onEdit: (item) => openEdit("action", item), onDel: (id) => delRec(setActionItems, id), cols: [pCol, { k: "description", l: "DESCRIPTION" }, { k: "assignedTo", l: "ASSIGNED TO" }, { k: "dueDate", l: "DUE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: v < todayStr ? "#ef4444" : darkMode ? "#5a6480" : "#64748b" } }, v) }, { k: "priority", l: "PRIORITY", r: (v) => /* @__PURE__ */ React.createElement(PrioB, { p: v }) }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "notes", l: "NOTES" }] }))), tab2 === "equipment" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => exp(filt(equipment), ["projectId", "equipment", "vendor", "deliveryDate", "returnDate", "status", "notes"], "equipment"), style: S.btnS }, "\u2B07 Export"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("equip"), style: S.btnP }, "+ New Delivery")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(equipment), onEdit: (item) => openEdit("equip", item), onDel: (id) => delRec(setEquipment, id), cols: [pCol, { k: "equipment", l: "EQUIPMENT" }, { k: "vendor", l: "VENDOR" }, { k: "deliveryDate", l: "DELIVERY", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "returnDate", l: "RETURN", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "notes", l: "NOTES" }] }))), tab2 === "purchaseorders" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: purchaseOrders, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setPurchaseOrders, selProj }), tab2 === "meetings" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: meetings, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setMeetings, selProj }), tab2 === "materials" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => exp(filt(materials), ["projectId", "material", "vendor", "poNumber", "expectedDate", "actualDate", "status", "location", "notes"], "materials"), style: S.btnS }, "\u2B07 Export"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("material"), style: S.btnP }, "+ New Delivery")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(materials), onEdit: (item) => openEdit("material", item), onDel: (id) => delRec(setMaterials2, id), cols: [pCol, { k: "material", l: "MATERIAL" }, { k: "vendor", l: "VENDOR" }, { k: "poNumber", l: "PO #", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: "#818cf8" } }, v) }, { k: "expectedDate", l: "EXPECTED", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "actualDate", l: "RECEIVED", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: v ? "#10b981" : darkMode ? "#3a4060" : "#94a3b8" } }, v || "\u2014") }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "location", l: "LOCATION" }, { k: "notes", l: "NOTES" }] }))), tab2 === "inventory" && (() => {
          const inv = filt(inventory2);
          const lowStock = inv.filter((i) => Number(i.qtyOnHand || 0) <= Number(i.reorderPoint || 0) && Number(i.qtyOnHand || 0) > 0);
          const outOfStock = inv.filter((i) => Number(i.qtyOnHand || 0) === 0);
          const ok = inv.filter((i) => Number(i.qtyOnHand || 0) > Number(i.reorderPoint || 0));
          return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 } }, [
            { l: "Total Items", v: inv.length, c: darkMode ? "#94a3b8" : "#475569" },
            { l: "In Stock", v: ok.length, c: "#10b981" },
            { l: "Low Stock", v: lowStock.length, c: "#FF8A00" },
            { l: "Out of Stock", v: outOfStock.length, c: "#ef4444" }
          ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.l, style: { background: darkMode ? "linear-gradient(135deg,#161b27,#1a2035)" : "#ffffff", border: `1px solid ${darkMode ? "#2a3150" : "#e2e8f0"}`, borderRadius: 13, padding: "13px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 4 } }, s.l.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: s.c, fontFamily: "monospace" } }, s.v)))), (lowStock.length > 0 || outOfStock.length > 0) && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14, padding: "10px 16px", background: "rgba(255,138,0,0.1)", border: "1px solid rgba(255,138,0,0.4)", borderLeft: "4px solid #FF8A00", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#FF8A00" } }, "Inventory Alert"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text2 } }, outOfStock.length > 0 && /* @__PURE__ */ React.createElement("span", { style: { color: "#ef4444", fontWeight: 600 } }, outOfStock.length, " item", outOfStock.length !== 1 ? "s" : "", " out of stock. "), lowStock.length > 0 && /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00" } }, lowStock.length, " item", lowStock.length !== 1 ? "s" : "", " at or below reorder point.")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, ["All", "Low Stock", "Out of Stock", "In Stock"].map((f2) => /* @__PURE__ */ React.createElement("button", { key: f2, onClick: () => {
          }, style: { fontSize: 10, padding: "4px 10px", borderRadius: 6, border: `1px solid ${darkMode ? "#2a3150" : "#e2e8f0"}`, background: darkMode ? "#1a2035" : "#f8fafc", ...S.text2, cursor: "pointer" } }, f2))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => exp(inv, ["projectId", "itemName", "category", "sku", "unit", "qtyOnHand", "qtyOrdered", "reorderPoint", "location", "supplier", "unitCost", "totalValue", "lastUpdated", "notes"], "inventory"), style: S.btnS }, "\u2B07 Export"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("inventory"), style: S.btnP }, "+ Add Item"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["PROJECT", "ITEM / MATERIAL", "CATEGORY", "SKU", "UNIT", "QTY ON HAND", "REORDER PT", "QTY ORDERED", "LOCATION", "SUPPLIER", "UNIT COST", "TOTAL VALUE", "LAST UPDATED", "NOTES", "ACTIONS"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "10px 12px", textAlign: "left", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 9, letterSpacing: 0.6, whiteSpace: "nowrap" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, !inv.length && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 15, style: { padding: 36, textAlign: "center", ...S.text3, fontSize: 13 } }, "No inventory items yet. Click ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FF8A00" } }, "+ Add Item"), " to start tracking.")), inv.map((item) => {
            const qty = Number(item.qtyOnHand || 0);
            const rp = Number(item.reorderPoint || 0);
            const isOut = qty === 0;
            const isLow = qty > 0 && qty <= rp;
            const isOk = qty > rp;
            const statusColor = isOut ? "#ef4444" : isLow ? "#FF8A00" : "#10b981";
            const rowBg = isOut ? darkMode ? "rgba(239,68,68,0.06)" : "#fff5f5" : isLow ? darkMode ? "rgba(255,138,0,0.06)" : "#fffbeb" : "";
            const totalVal = (qty * (Number(item.unitCost) || 0)).toFixed(2);
            return /* @__PURE__ */ React.createElement(
              "tr",
              {
                key: item.id,
                style: { ...S.tRow, background: rowBg },
                onMouseEnter: (e) => e.currentTarget.style.background = darkMode ? "#1a1f2e" : "#f8fafc",
                onMouseLeave: (e) => e.currentTarget.style.background = rowBg
              },
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2, fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#60a5fa", fontWeight: 600 } }, pN(item.projectId))),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", maxWidth: 180 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, ...S.text, fontSize: 12 } }, item.itemName || "\u2014"), (isOut || isLow) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: statusColor, marginTop: 1 } }, isOut ? "\u25CF OUT OF STOCK" : "\u25CF LOW STOCK")),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2, fontSize: 11 } }, item.category || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 10, color: "#818cf8" } }, item.sku || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text3, fontSize: 11 } }, item.unit || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: isOut ? "rgba(239,68,68,0.12)" : isLow ? "rgba(255,138,0,0.12)" : "rgba(16,185,129,0.08)", padding: "4px 10px", borderRadius: 7, border: `1px solid ${isOut ? "rgba(239,68,68,0.3)" : isLow ? "rgba(255,138,0,0.4)" : "rgba(16,185,129,0.2)"}` } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: statusColor, fontFamily: "monospace" } }, qty), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, ...S.text3 } }, item.unit || ""))),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: darkMode ? "#4a5580" : "#94a3b8" } }, rp),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: "#818cf8" } }, item.qtyOrdered || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2, fontSize: 11 } }, item.location || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2, fontSize: 11 } }, item.supplier || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: "#10b981" } }, item.unitCost ? "$" + Number(item.unitCost).toFixed(2) : "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: "#60a5fa" } }, item.unitCost ? "$" + totalVal : "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 10, ...S.text3 } }, item.lastUpdated || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2, fontSize: 11, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, item.notes || "\u2014"),
              /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit("inventory", item), style: { background: darkMode ? "#1e2940" : "#e0e7ff", border: "none", color: "#60a5fa", padding: "3px 8px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => setInventory((l) => l.map((x) => x.id === item.id ? { ...x, qtyOnHand: String(Math.max(0, qty - 1)), lastUpdated: todayStr } : x)), style: { background: darkMode ? "#2a1a1a" : "#fee2e2", border: "none", color: "#ef4444", padding: "3px 7px", borderRadius: 5, cursor: "pointer", fontSize: 10, fontWeight: 700 }, title: "Use 1" }, "-1"), /* @__PURE__ */ React.createElement("button", { onClick: () => setInventory((l) => l.map((x) => x.id === item.id ? { ...x, qtyOnHand: String(qty + 1), lastUpdated: todayStr } : x)), style: { background: darkMode ? "#0f2a1a" : "#d1fae5", border: "none", color: "#10b981", padding: "3px 7px", borderRadius: 5, cursor: "pointer", fontSize: 10, fontWeight: 700 }, title: "Add 1" }, "+1"), /* @__PURE__ */ React.createElement("button", { onClick: () => delRec(setInventory, item.id), style: { background: darkMode ? "#2a1a1a" : "#fee2e2", border: "none", color: "#ef4444", padding: "3px 7px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Del")))
            );
          }))))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", gap: 16, fontSize: 10, ...S.text3 } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { color: "#10b981", fontWeight: 700 } }, "\u25CF"), " In Stock \u2014 above reorder point"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00", fontWeight: 700 } }, "\u25CF"), " Low Stock \u2014 at or below reorder point"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { color: "#ef4444", fontWeight: 700 } }, "\u25CF"), " Out of Stock \u2014 qty = 0"), /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", ...S.text3 } }, "Use +1 / -1 buttons to quickly adjust quantities")));
        })(), tab2 === "submittals" && /* @__PURE__ */ React.createElement("div", null, (() => {
          const subs = filt(submittals);
          const ov = subs.filter((s) => s.requiredDate && s.requiredDate < todayStr && s.status !== "Approved" && s.status !== "Void");
          const inRev = subs.filter((s) => s.status === "In Review" || s.status === "Submitted");
          const appr = subs.filter((s) => s.status === "Approved");
          const dtw = subs.filter((s) => s.requiredDate && s.requiredDate >= todayStr && s.requiredDate <= fmt(addDays(today, 7)) && s.status !== "Approved");
          return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 10 } }, [["Total", subs.length, "#94a3b8"], ["Overdue", ov.length, "#ef4444"], ["Due This Week", dtw.length, "#f59e0b"], ["Approved", appr.length, "#10b981"]].map(([l, v, c]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { ...S.card, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, marginBottom: 3, textTransform: "uppercase" } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: c } }, v)))), ov.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8, padding: "7px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderLeft: "4px solid #ef4444", borderRadius: 7, fontSize: 11 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: "#ef4444" } }, "\u{1F534} ", ov.length, " OVERDUE submittal", ov.length !== 1 ? "s" : "", " \u2014 21+ business days with no approval.")), inRev.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", borderBottom: "1px solid " + (darkMode ? "#1e2538" : "#e2e8f0"), fontWeight: 700, fontSize: 11 } }, "Ball in Court \u2014 ", inRev.length, " Awaiting Response"), inRev.map((s) => {
            const dOut = s.submittedDate ? Math.floor((today - new Date(s.submittedDate)) / 864e5) : null;
            const isOD = s.requiredDate && s.requiredDate < todayStr;
            return /* @__PURE__ */ React.createElement("div", { key: s.id, style: { padding: "7px 12px", borderBottom: "1px solid " + (darkMode ? "#151a28" : "#f1f5f9"), display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 600, ...S.text } }, s.specSection ? "\xA7" + s.specSection + " \u2014 " : "", s.description || "\u2014"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3, marginLeft: 6 } }, "Reviewer: ", s.reviewer || "\u2014")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, dOut !== null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: dOut >= 21 ? "#ef4444" : dOut >= 14 ? "#f59e0b" : "#94a3b8" } }, dOut, "bd", dOut >= 21 ? " \u{1F534}" : dOut >= 14 ? " \u{1F7E1}" : ""), isOD && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: 3 } }, "OVERDUE"), /* @__PURE__ */ React.createElement(Pill, { status: s.status }), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
              e.stopPropagation();
              setSubmittals((l) => l.map((r) => r.id === s.id ? { ...r, status: "Approved", approvedDate: todayStr, approvedBy: currentUser } : r));
              showToast("Submittal Approved \u2713");
            }, style: { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981", padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: "pointer" } }, "\u2713 Approve"), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
              e.stopPropagation();
              var reason = prompt("Reason for Revise & Resubmit:");
              if (!reason) return;
              setSubmittals((l) => l.map((r) => r.id === s.id ? { ...r, status: "Revise & Resubmit", rrDate: todayStr, rrReason: reason, rrBy: currentUser } : r));
              showToast("Marked Revise & Resubmit");
            }, style: { background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b", padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: "pointer" } }, "\u21A9 R&R")));
          })));
        })(), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportSubmittals(filt(submittals), projects, selProj, companyName2), style: S.btnS }, "Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("submittal"), style: S.btnP }, "+ New Submittal")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(submittals), onEdit: (item) => openEdit("submittal", item), onDel: (id) => delRec(setSubmittals, id), cols: [pCol, { k: "specSection", l: "SPEC \xA7", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: "#818cf8" } }, v) }, { k: "description", l: "DESCRIPTION" }, { k: "submittedBy", l: "BY" }, { k: "submittedDate", l: "SUBMITTED", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "requiredDate", l: "REQUIRED BY", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: v < todayStr ? "#ef4444" : darkMode ? "#5a6480" : "#64748b" } }, v) }, { k: "submittedDate", l: "DAYS OUT", r: (v) => {
          if (!v) return React.createElement("span", null, "\u2014");
          var d = new Date(v), count = 0, end = /* @__PURE__ */ new Date();
          while (d < end) {
            d.setDate(d.getDate() + 1);
            var dow = d.getDay();
            if (dow !== 0 && dow !== 6) count++;
          }
          return React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700, color: count >= 21 ? "#ef4444" : count >= 14 ? "#f59e0b" : "#94a3b8" } }, count + "bd" + (count >= 21 ? " \u{1F534}" : count >= 14 ? " \u{1F7E1}" : ""));
        } }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "returnedDate", l: "RETURNED", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: v ? "#10b981" : darkMode ? "#3a4060" : "#94a3b8" } }, v || "\u2014") }, { k: "reviewer", l: "REVIEWER" }, { k: "reviewerEmail", l: "REVIEWER EMAIL" }, { k: "reviewerNotes", l: "REVIEWER NOTES" }, { k: "approvedDate", l: "APPROVED DATE", r: (v) => v ? React.createElement("span", { style: { color: "#10b981", fontFamily: "monospace", fontSize: 10 } }, v) : React.createElement("span", null, "\u2014") }, { k: "rrReason", l: "R&R REASON" }, { k: "notes", l: "NOTES" }] }))), tab2 === "rfis" && /* @__PURE__ */ React.createElement("div", null, (() => {
          const rList = filt(rfis);
          const ov = rList.filter((r) => r.dueDate && r.dueDate < todayStr && r.status !== "Answered" && r.status !== "Closed");
          const openR = rList.filter((r) => r.status === "Open" || r.status === "In Review");
          const ans = rList.filter((r) => r.status === "Answered" || r.status === "Closed");
          const dtw = rList.filter((r) => r.dueDate && r.dueDate >= todayStr && r.dueDate <= fmt(addDays(today, 7)) && r.status !== "Answered");
          return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 10 } }, [["Total", rList.length, "#94a3b8"], ["Overdue", ov.length, "#ef4444"], ["Due This Week", dtw.length, "#f59e0b"], ["Answered", ans.length, "#10b981"]].map(([l, v, c]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { ...S.card, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, marginBottom: 3, textTransform: "uppercase" } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: c } }, v)))), ov.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8, padding: "7px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderLeft: "4px solid #ef4444", borderRadius: 7, fontSize: 11 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: "#ef4444" } }, "\u{1F534} ", ov.length, " OVERDUE RFI", ov.length !== 1 ? "s" : "", " \u2014 10+ business days with no response.")), openR.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", borderBottom: "1px solid " + (darkMode ? "#1e2538" : "#e2e8f0"), fontWeight: 700, fontSize: 11 } }, "Ball in Court \u2014 ", openR.length, " Open RFI", openR.length !== 1 ? "s" : ""), openR.map((r) => {
            const dOut = (function() {
              if (!r.submittedDate) return null;
              var d = new Date(r.submittedDate), count = 0, end = today;
              while (d < end) {
                d.setDate(d.getDate() + 1);
                var dow = d.getDay();
                if (dow !== 0 && dow !== 6) count++;
              }
              return count;
            })();
            const isOD = r.dueDate && r.dueDate < todayStr;
            return /* @__PURE__ */ React.createElement("div", { key: r.id, style: { padding: "7px 12px", borderBottom: "1px solid " + (darkMode ? "#151a28" : "#f1f5f9"), display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: "#818cf8", fontFamily: "monospace", marginRight: 6 } }, "#", r.rfiNumber || "\u2014"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 600, ...S.text } }, r.subject || "\u2014"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3, marginLeft: 6 } }, "To: ", r.answeredBy || "\u2014")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, dOut !== null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: dOut >= 10 ? "#ef4444" : dOut >= 7 ? "#f59e0b" : "#94a3b8" } }, dOut, "bd", dOut >= 10 ? " \u{1F534}" : dOut >= 7 ? " \u{1F7E1}" : ""), r.dueDate && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontFamily: "monospace", color: isOD ? "#ef4444" : darkMode ? "#5a6480" : "#64748b" } }, "Due: ", r.dueDate), isOD && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: 3 } }, "OVERDUE"), /* @__PURE__ */ React.createElement(Pill, { status: r.status })));
          })));
        })(), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => reportRFIs(filt(rfis), projects, selProj, companyName2), style: S.btnS }, "Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("rfi"), style: S.btnP }, "+ New RFI")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(LT, { rows: filt(rfis), onEdit: (item) => openEdit("rfi", item), onDel: (id) => delRec(setRfis, id), cols: [pCol, { k: "rfiNumber", l: "RFI #", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: "#818cf8", fontWeight: 700 } }, v) }, { k: "subject", l: "SUBJECT" }, { k: "submittedBy", l: "BY" }, { k: "submittedDate", l: "SUBMITTED", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, ...S.text3 } }, v) }, { k: "dueDate", l: "DUE", r: (v) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 10, color: v < todayStr ? "#ef4444" : darkMode ? "#5a6480" : "#64748b" } }, v) }, { k: "submittedDate", l: "DAYS OPEN", r: (v, row) => {
          if (!v) return /* @__PURE__ */ React.createElement("span", null, "\u2014");
          var d = new Date(v), count = 0, end = /* @__PURE__ */ new Date();
          while (d < end) {
            d.setDate(d.getDate() + 1);
            var dow = d.getDay();
            if (dow !== 0 && dow !== 6) count++;
          }
          return /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700, color: count >= 10 ? "#ef4444" : count >= 7 ? "#f59e0b" : "#94a3b8" } }, count, "bd", count >= 10 ? " \u{1F534}" : count >= 7 ? " \u{1F7E1}" : "");
        } }, { k: "status", l: "STATUS", r: (v) => /* @__PURE__ */ React.createElement(Pill, { status: v }) }, { k: "answeredBy", l: "ANSWERED BY" }, { k: "response", l: "RESPONSE" }, { k: "notes", l: "NOTES" }, { k: "sharedExternal", l: "VISIBILITY", r: (v, row) => {
          const isShared = row.sharedExternal === true;
          return React.createElement("button", {
            onClick: function(e) {
              e.stopPropagation();
              if (isShared) {
                var pw = prompt("Enter your password to unshare this RFI:");
                if (!pw) return;
                fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5dVASmYRpDfcQd4OmV-wD5k1NsLOW7FA", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: userEmail2, password: pw, returnSecureToken: false })
                }).then(function(r) {
                  return r.json();
                }).then(function(d) {
                  if (d.idToken || d.localId) {
                    setRfis(function(l) {
                      return l.map(function(r2) {
                        return r2.id === row.id ? Object.assign({}, r2, { sharedExternal: false }) : r2;
                      });
                    });
                    showToast("RFI moved to Internal only");
                  } else {
                    alert("Incorrect password. Access denied.");
                  }
                }).catch(function() {
                  alert("Connection error. Try again.");
                });
              } else {
                var pw = prompt("Enter your password to share this RFI externally:");
                if (!pw) return;
                fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5dVASmYRpDfcQd4OmV-wD5k1NsLOW7FA", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: userEmail2, password: pw, returnSecureToken: false })
                }).then(function(r) {
                  return r.json();
                }).then(function(d) {
                  if (d.idToken || d.localId) {
                    setRfis(function(l) {
                      return l.map(function(r2) {
                        return r2.id === row.id ? Object.assign({}, r2, { sharedExternal: true }) : r2;
                      });
                    });
                    showToast("RFI shared externally \u2713");
                  } else {
                    alert("Incorrect password. Access denied.");
                  }
                }).catch(function() {
                  alert("Connection error. Try again.");
                });
              }
            },
            style: {
              fontSize: 9,
              fontWeight: 700,
              cursor: "pointer",
              padding: "3px 8px",
              borderRadius: 4,
              background: isShared ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
              border: isShared ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.1)",
              color: isShared ? "#10b981" : "#64748b",
              whiteSpace: "nowrap"
            }
          }, isShared ? "\u{1F310} External" : "\u{1F512} Internal");
        } }] }))), tab2 === "fitterreport" && /* @__PURE__ */ React.createElement(FitterReport, { S, darkMode, projects, fitterReports, setFitterReports, selProj, companyName: companyName2 }), tab2 === "foremanreport" && /* @__PURE__ */ React.createElement(ForemanDailyReport, { S, darkMode, projects, fitterReports, setFitterReports, foremanReports, setForemanReports, selProj, companyName: companyName2 }), tab2 === "reports" && /* @__PURE__ */ React.createElement(ReportsHub, { S, darkMode, projects, selProj, companyName: companyName2, dailyLogs, fitterReports, foremanReports, manpowerEntries, delays: delays2, punchList, rfis, submittals, safetyInsp: safetyInsp2, safetyObs, qualityInsp, qualityObs, equipInsp, jsas: jsas2 }), tab2 === "equipinsp" && /* @__PURE__ */ React.createElement(EquipmentInspections, { S, darkMode, projects, equipInsp, setEquipInsp, selProj }), tab2 === "jsa" && (() => {
          const jsaList = filt(jsas2);
          const jsaCols = ["jsaNumber", "projectId", "date", "location", "taskDescription", "supervisor", "company", "crew", "status", "riskLevel", "ppeRequired", "hazards", "controls", "emergency", "reviewedBy", "signatures", "notes"];
          return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, [
            { l: "Total JSAs", v: jsaList.length, c: darkMode ? "#94a3b8" : "#475569" },
            { l: "Open / Active", v: jsaList.filter((j) => j.status === "Active" || j.status === "Open").length, c: "#10b981" },
            { l: "High Risk", v: jsaList.filter((j) => j.riskLevel === "High").length, c: "#ef4444" },
            { l: "Completed", v: jsaList.filter((j) => j.status === "Completed").length, c: "#818cf8" }
          ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.l, style: { background: darkMode ? "linear-gradient(135deg,#161b27,#1a2035)" : "#ffffff", border: `1px solid ${darkMode ? "#2a3150" : "#e2e8f0"}`, borderRadius: 13, padding: "13px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 4 } }, s.l.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: s.c, fontFamily: "monospace" } }, s.v)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3 } }, "Job Safety Analysis forms \u2014 document hazards, controls and crew sign-off before work begins"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7 } }, /* @__PURE__ */ React.createElement("label", { style: { ...S.btnS, display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer", padding: "8px 13px", borderRadius: 8, fontSize: 13 } }, "\u2B06 Import CSV", /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".csv", style: { display: "none" }, onChange: (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
              try {
                const lines = ev.target.result.trim().split(/\r?\n/);
                const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
                const rows = lines.slice(1).map((line) => {
                  const vals = [];
                  let cur = "", inQ = false;
                  for (const ch of line) {
                    if (ch === '"') inQ = !inQ;
                    else if (ch === "," && !inQ) {
                      vals.push(cur);
                      cur = "";
                    } else cur += ch;
                  }
                  vals.push(cur);
                  const obj = { id: uid() };
                  headers.forEach((h, i) => {
                    obj[h] = (vals[i] || "").replace(/^"|"$/g, "");
                  });
                  if (obj.projectId) obj.projectId = Number(obj.projectId);
                  return obj;
                }).filter((r) => r.jsaNumber || r.taskDescription);
                setJsas((l) => [...l, ...rows]);
                showToast(`${rows.length} JSAs imported`);
              } catch (err) {
                showToast("Import failed: " + err.message, "error");
              }
            };
            reader.readAsText(file);
            e.target.value = "";
          } })), /* @__PURE__ */ React.createElement("button", { onClick: () => exp(jsaList, jsaCols, "jsa_log"), style: S.btnS }, "\u2B07 Export CSV"), /* @__PURE__ */ React.createElement("button", { onClick: () => reportJSA(jsaList, projects, selProj, companyName2), style: S.btnS }, "\u{1F4C4} Export Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("jsa"), style: { ...S.btnP, background: "linear-gradient(135deg,#FF8A00,#cc6a00)" } }, "\u{1F9BA} New JSA"))), !jsaList.length && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: 50, ...S.text3 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, "\u{1F9BA}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, marginBottom: 5, ...S.text } }, "No JSAs yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, marginBottom: 16 } }, "Create a Job Safety Analysis before work begins each day to document hazards and controls."), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("jsa"), style: { ...S.btnP, background: "linear-gradient(135deg,#FF8A00,#cc6a00)" } }, "\u{1F9BA} Create First JSA")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, jsaList.sort((a, b) => (b.date || "").localeCompare(a.date || "")).map((jsa) => {
            const riskColors = { High: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" }, Medium: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" }, Low: { bg: "#d1fae5", text: "#065f46", dot: "#10b981" } };
            const rc = riskColors[jsa.riskLevel] || riskColors.Medium;
            return /* @__PURE__ */ React.createElement("div", { key: jsa.id, style: { ...S.card, overflow: "hidden", borderLeft: `4px solid ${rc.dot}` } }, /* @__PURE__ */ React.createElement("div", { style: { background: darkMode ? "#0f1117" : "#f8fafc", borderBottom: `1px solid ${darkMode ? "#1e2538" : "#e2e8f0"}`, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 800, fontSize: 13, color: "#FF8A00", fontFamily: "monospace" } }, jsa.jsaNumber || "JSA-????"), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 13 } }, pN(jsa.projectId)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, ...S.text3 } }, jsa.date), /* @__PURE__ */ React.createElement("span", { style: { background: rc.bg, color: rc.text, padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: rc.dot, display: "inline-block" } }), jsa.riskLevel || "Medium", " Risk"), /* @__PURE__ */ React.createElement(Pill, { status: jsa.status || "Active" })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit("jsa", jsa), style: { background: darkMode ? "#1e2940" : "#e0e7ff", border: "none", color: "#60a5fa", padding: "4px 9px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => delRec(setJsas, jsa.id), style: { background: darkMode ? "#2a1a1a" : "#fee2e2", border: "none", color: "#ef4444", padding: "4px 9px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Del"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "TASK / WORK DESCRIPTION"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text, fontWeight: 600 } }, jsa.taskDescription || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "LOCATION / AREA"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, jsa.location || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "SUPERVISOR / FOREMAN"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, jsa.supervisor || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "COMPANY"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, jsa.company || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "CREW MEMBERS"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, jsa.crew || "\u2014"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#ef4444", fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "\u26A0 IDENTIFIED HAZARDS"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 1.5 } }, jsa.hazards || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#10b981", fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "\u2705 CONTROLS / MITIGATION"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 1.5 } }, jsa.controls || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "PPE REQUIRED"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, jsa.ppeRequired || "\u2014"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#ef4444", fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "\u{1F6A8} EMERGENCY PROCEDURES"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 1.5 } }, jsa.emergency || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "REVIEWED BY"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, jsa.reviewedBy || "\u2014")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "CREW SIGNATURES"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2, lineHeight: 1.5 } }, jsa.signatures || "\u2014")), jsa.notes && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "NOTES"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, jsa.notes)))));
          })));
        })(), tab2 === "safetyinsp" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: safetyInsp2, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setSafetyInsp, selProj }), tab2 === "safetyobs" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: safetyObs, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setSafetyObs, selProj }), tab2 === "safetyforms" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: safetyForms, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast }), tab2 === "toolinventory" && /* @__PURE__ */ React.createElement(ToolInventory, { S, darkMode, projects, toolInventory, setToolInventory, selProj }), tab2 === "ppeinventory" && /* @__PURE__ */ React.createElement(PPEInventory, { S, darkMode, projects, ppeInventory, setPPEInventory, selProj }), tab2 === "qualityinsp" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: qualityInsp, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast }), tab2 === "qualityobs" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: qualityObs, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setQualityObs, selProj }), tab2 === "qualityforms" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: qualityForms, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setQualityForms, selProj }), tab2 === "projdocs" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: projDocs, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast }), tab2 === "projdir" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: projDir, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast }), tab2 === "projspecs" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: projSpecs, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setProjSpecs, selProj }), tab2 === "projforms" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: projForms, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setProjForms, selProj }), tab2 === "drawings" && /* @__PURE__ */ React.createElement(DrawingsTab, { S, darkMode, projects, drawings, setDrawings, selProj, openAdd, openEdit, pN, filt, exp, showToast, rfis, punchList, authUser }), tab2 === "changeorders" && /* @__PURE__ */ React.createElement(NewSecTab, { tab: tab2, data: changeOrders, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData: setChangeOrders, selProj }), tab2 === "manpower" && /* @__PURE__ */ React.createElement(ManpowerTab, { dailyLogs, projects, S, darkMode, pN, companyName: settings && settings.companyName || companyName2, manpowerEntries, setManpowerEntries, selProj }), tab2 === "overview" && /* @__PURE__ */ React.createElement(ProjectOverview, { projects, tasks, dailyLogs, rfis, submittals, punchList, costCodes, changeOrders, rental, actionItems, S, darkMode, pN, selProj, setTab, today, todayStr }), (() => {
          window._kodoxLastState = { darkMode, projects, tasks, dailyLogs, fitterReports, punchList, actionItems, equipment, rental, bom, materials, submittals, rfis, delays: delays2, costCodes, transactions, inventory: inventory2, jsas: jsas2, safetyInsp: safetyInsp2, safetyObs, safetyForms, qualityInsp, qualityObs, qualityForms, projDocs, projDir, projSpecs, projForms, drawings, changeOrders, manpowerEntries, ppeInventory, settings };
          return null;
        })(), tab2 === "cloudsync" && /* @__PURE__ */ React.createElement(FirebaseSync, { S, darkMode, allState: { darkMode, projects, tasks, dailyLogs, fitterReports, punchList, actionItems, equipment, rental, bom, materials, submittals, rfis, delays: delays2, costCodes, transactions, inventory: inventory2, jsas: jsas2, safetyInsp: safetyInsp2, safetyObs, safetyForms, qualityInsp, qualityObs, qualityForms, projDocs, projDir, projSpecs, projForms, drawings, changeOrders, manpowerEntries, ppeInventory, settings }, allSetters: { projects: setProjects, tasks: setTasks, dailyLogs: setDailyLogs, fitterReports: setFitterReports, punchList: setPunchList, actionItems: setActionItems, equipment: setEquipment, rental: setRental, bom: setBOM, materials: setMaterials2, submittals: setSubmittals, rfis: setRfis, delays: setDelays, costCodes: setCostCodes, transactions: setTransactions2, inventory: setInventory, jsas: setJsas, safetyInsp: setSafetyInsp, safetyObs: setSafetyObs, safetyForms: setSafetyForms, qualityInsp: setQualityInsp, qualityObs: setQualityObs, qualityForms: setQualityForms, projDocs: setProjDocs, projDir: setProjDir, projSpecs: setProjSpecs, projForms: setProjForms, drawings: setDrawings, changeOrders: setChangeOrders, manpowerEntries: setManpowerEntries, ppeInventory: setPPEInventory, settings: setSettings } }), tab2 === "settings" && /* @__PURE__ */ React.createElement(
          SettingsTab,
          {
            settings,
            setSettings,
            S,
            darkMode,
            allState: { darkMode, projects, tasks, dailyLogs, punchList, actionItems, equipment, rental, materials, submittals, rfis, delays: delays2, costCodes, transactions, inventory: inventory2, jsas: jsas2, safetyInsp: safetyInsp2, safetyObs, safetyForms, qualityInsp, qualityObs, qualityForms, projDocs, projDir, projSpecs, projForms, drawings, changeOrders, settings },
            allSetters: { projects: setProjects, tasks: setTasks, dailyLogs: setDailyLogs, punchList: setPunchList, actionItems: setActionItems, equipment: setEquipment, rental: setRental, materials: setMaterials2, submittals: setSubmittals, rfis: setRfis, delays: setDelays, costCodes: setCostCodes, transactions: setTransactions2, inventory: setInventory, jsas: setJsas, safetyInsp: setSafetyInsp, safetyObs: setSafetyObs, safetyForms: setSafetyForms, qualityInsp: setQualityInsp, qualityObs: setQualityObs, qualityForms: setQualityForms, projDocs: setProjDocs, projDir: setProjDir, projSpecs: setProjSpecs, projForms: setProjForms, drawings: setDrawings, changeOrders: setChangeOrders, settings: setSettings }
          }
        ))), showPOD && /* @__PURE__ */ React.createElement(PlanOfDay, { S, darkMode, tasks, dailyLogs, equipment, rental, materials, safetyInsp: safetyInsp2, qualityInsp, jsas: jsas2, rfis, submittals, manpowerEntries, punchList, actionItems, delays: delays2, selProj, pN, setTab, todayStr, settings, onClose: () => setShowPOD(false) }), modal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }, onClick: (e) => {
          if (e.target === e.currentTarget) close();
        } }, /* @__PURE__ */ React.createElement("div", { key: modal, style: { background: darkMode ? "#161b27" : "#ffffff", border: `1px solid ${darkMode ? "#2a3150" : "#e2e8f0"}`, borderRadius: 16, padding: 24, width: 600, maxHeight: "92vh", overflowY: "auto" }, onTouchStart: (e) => e.stopPropagation() }, modal === "project" && /* @__PURE__ */ React.createElement(ProjForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setProjects, d), onCancel: close }), modal === "task" && /* @__PURE__ */ React.createElement(TaskForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setTasks, d), onCancel: close }), modal === "dailylog" && /* @__PURE__ */ React.createElement(DailyLogForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => {
          saveRec(setDailyLogs, d);
          if (Number(d.manpower || 0) > 0) {
            const dateKey = d.date;
            const projKey = String(d.projectId || "");
            const exists = (manpowerEntries || []).some((e) => e.date === dateKey && String(e.projectId) === projKey);
            if (!exists) {
              const uid2 = () => Math.random().toString(36).slice(2, 9);
              const autoEntry = {
                id: uid2(),
                date: dateKey,
                projectId: d.projectId || "",
                superintendent: d.superintendent || "",
                foreman: d.foreman || "",
                company: d.companyName || "",
                shift: "Day",
                notes: "Auto-created from Daily Log",
                tradeLines: d.tradeBreakdown ? d.tradeBreakdown.split(",").map((t) => {
                  const m = t.trim().match(/^(\d+)\s+(.+)$/);
                  return m ? { id: uid2(), trade: m[2].trim(), workers: Number(m[1]), hours: Number(d.hoursWorked || 8) } : { id: uid2(), trade: t.trim() || "General", workers: Number(d.manpower || 0), hours: Number(d.hoursWorked || 8) };
                }) : [{ id: uid2(), trade: "General Labor", workers: Number(d.manpower || 0), hours: Number(d.hoursWorked || 8) }]
              };
              setManpowerEntries((l) => [...l, autoEntry]);
              showToast("Manpower entry auto-created");
            }
          }
        }, onCancel: close }), modal === "delay" && /* @__PURE__ */ React.createElement(DelayForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => {
          saveRec(setDelays, d);
          const todayStr2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const projKey2 = String(d.projectId || "");
          setDailyLogs((logs) => logs.map((log) => {
            if (log.date === todayStr2 && String(log.projectId) === projKey2) {
              const delayNote = d.description || (d.cause || "Delay logged");
              const existing = log.delays && log.delays !== "None" ? log.delays : "";
              const updated = existing ? existing + "; " + delayNote : delayNote;
              return { ...log, delays: updated };
            }
            return log;
          }));
        }, onCancel: close }), modal === "punch" && /* @__PURE__ */ React.createElement(PunchForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setPunchList, d), onCancel: close }), modal === "action" && /* @__PURE__ */ React.createElement(ActionForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setActionItems, d), onCancel: close }), modal === "rental" && /* @__PURE__ */ React.createElement(RentalForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setRental, d), onCancel: close }), modal === "equip" && /* @__PURE__ */ React.createElement(EquipForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setEquipment, d), onCancel: close }), modal === "material" && /* @__PURE__ */ React.createElement(MatForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setMaterials2, d), onCancel: close }), modal === "inventory" && /* @__PURE__ */ React.createElement(InventoryForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setInventory, d), onCancel: close }), modal === "submittal" && /* @__PURE__ */ React.createElement(SubForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setSubmittals, d), onCancel: close }), modal === "rfi" && /* @__PURE__ */ React.createElement(RFIForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => {
          saveRec(setRfis, d);
          if ((d.status === "Answered" || d.status === "Closed") && (!editTgt || editTgt.status !== "Answered")) {
            if (d.submittalRef) {
              setSubmittals((subs) => subs.map(
                (s) => s.number === d.submittalRef || s.id === d.submittalRef ? { ...s, notes: (s.notes || "") + (s.notes ? "; " : "") + "Related RFI " + d.number + " answered" } : s
              ));
              showToast("RFI linked to submittal");
            }
          }
        }, onCancel: close }), modal === "jsa" && /* @__PURE__ */ React.createElement(JSAForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setJsas, d), onCancel: close }), ["safetyinsp", "safetyobs", "safetyforms", "qualityinsp", "qualityobs", "qualityforms", "projdocs", "projdir", "projspecs", "projforms", "drawings", "changeorders", "purchaseorders", "meetings"].includes(modal) && /* @__PURE__ */ React.createElement(SForm, { iS, S, projects, initial: editTgt, tab: modal, onSave: (d) => {
          const m = { safetyinsp: setSafetyInsp, safetyobs: setSafetyObs, safetyforms: setSafetyForms, qualityinsp: setQualityInsp, qualityobs: setQualityObs, qualityforms: setQualityForms, projdocs: setProjDocs, projdir: setProjDir, projspecs: setProjSpecs, projforms: setProjForms, drawings: setDrawings, changeorders: setChangeOrders, purchaseorders: setPurchaseOrders, meetings: setMeetings };
          if (modal === "changeorders" && d.status === "Approved" && (!editTgt || editTgt.status !== "Approved")) {
            const uid5 = () => Math.random().toString(36).slice(2, 9);
            setTransactions2((t) => [{ id: uid5(), projectId: d.projectId || "", date: d.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0], type: "Income", category: "Change Order", description: "CO Approved: " + (d.title || d.number || "Change Order"), amount: Number(d.amount || d.value || 0).toFixed(2), vendor: "", notes: "Auto-posted from CO: " + (d.number || "") }, ...t]);
            showToast("Change Order posted to Financials");
          }
          saveRec(m[modal], d);
        }, onCancel: close }), modal === "costcode" && /* @__PURE__ */ React.createElement(CostCodeForm, { iS, lS, S, projects, initial: editTgt, onSave: (d) => saveRec(setCostCodes, d), onCancel: close }), modal === "transaction" && /* @__PURE__ */ React.createElement(TransactionForm, { iS, lS, S, projects, costCodes, initial: editTgt, onSave: (d) => saveRec(setTransactions2, d), onCancel: close }))), toast && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", bottom: 18, right: 18, background: toast.type === "error" ? "#7f1d1d" : "#134e2e", border: `1px solid ${toast.type === "error" ? "#ef4444" : "#10b981"}`, color: "#e2e8f0", padding: "10px 15px", borderRadius: 10, fontSize: 13, fontWeight: 500, zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,.5)" } }, toast.type === "error" ? "\u274C" : "\u2705", " ", toast.msg));
      }
      function FF({ label, full, children }) {
        return /* @__PURE__ */ React.createElement("div", { style: { gridColumn: full ? "1/-1" : "auto" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, color: "#4a5580", fontWeight: 700, marginBottom: 3, display: "block", letterSpacing: 0.6 } }, label), children);
      }
      function mkForms(iS) {
        const FIn = ({ v, u, type = "text", ph = "" }) => /* @__PURE__ */ React.createElement("input", { type, defaultValue: v || "", onBlur: u, placeholder: ph, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", style: iS });
        const FSel = ({ v, u, opts }) => /* @__PURE__ */ React.createElement("select", { value: v || "", onChange: u, style: iS }, opts.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o)));
        const FTA = ({ v, u, rows = 2 }) => /* @__PURE__ */ React.createElement("textarea", { defaultValue: v || "", onBlur: u, rows, autoComplete: "off", autoCorrect: "off", spellCheck: "false", style: { ...iS, resize: "vertical" } });
        const PSel = ({ projects, v, u }) => /* @__PURE__ */ React.createElement("select", { value: v || "", onChange: u, style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select Project \u2014"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)));
        return { FIn, FSel, FTA, PSel };
      }
      function FormShell({ title, S, onSave, onCancel, label, children }) {
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 14 } }, title), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, children), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: onSave, style: S.btnP }, "Save ", label)));
      }
      function ProjForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { name: "", location: "", owner: "", gc: "", startDate: fmt(today), endDate: fmt(addDays(today, 365)), budget: "", spent: "0", status: "Not Started", completion: "0" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Project`, S, onSave: () => onSave({ ...f, budget: Number(f.budget || 0), spent: Number(f.spent || 0), completion: Number(f.completion || 0), id: f.id || uid() }), onCancel, label: "Project" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT NAME", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.name, u: u("name") })), /* @__PURE__ */ React.createElement(FF, { label: "LOCATION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.location, u: u("location") })), /* @__PURE__ */ React.createElement(FF, { label: "OWNER / CLIENT" }, /* @__PURE__ */ React.createElement(FIn, { v: f.owner, u: u("owner") })), /* @__PURE__ */ React.createElement(FF, { label: "GENERAL CONTRACTOR" }, /* @__PURE__ */ React.createElement(FIn, { v: f.gc, u: u("gc") })), /* @__PURE__ */ React.createElement(FF, { label: "START DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.startDate, u: u("startDate") })), /* @__PURE__ */ React.createElement(FF, { label: "COMPLETION DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.endDate, u: u("endDate") })), /* @__PURE__ */ React.createElement(FF, { label: "CONTRACT VALUE ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.budget, u: u("budget") })), /* @__PURE__ */ React.createElement(FF, { label: "AMOUNT SPENT ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.spent, u: u("spent") })), /* @__PURE__ */ React.createElement(FF, { label: "% COMPLETE" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.completion, u: u("completion") })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Not Started", "On Track", "At Risk", "Delayed", "Complete"] })));
      }
      function TaskForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", actId: "", trade: "General", description: "", assignee: "", startDate: fmt(today), endDate: fmt(addDays(today, 7)), duration: "", pct: "0", status: "Not Started", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Activity`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), pct: Number(f.pct || 0), id: f.id || uid() }), onCancel, label: "Activity" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "ACTIVITY ID" }, /* @__PURE__ */ React.createElement(FIn, { v: f.actId, u: u("actId"), ph: "e.g. A1050" })), /* @__PURE__ */ React.createElement(FF, { label: "TRADE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.trade, u: u("trade"), opts: TRADES })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Not Started", "On Track", "At Risk", "Delayed", "Complete"] })), /* @__PURE__ */ React.createElement(FF, { label: "DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.description, u: u("description") })), /* @__PURE__ */ React.createElement(FF, { label: "ASSIGNEE / FOREMAN" }, /* @__PURE__ */ React.createElement(FIn, { v: f.assignee, u: u("assignee") })), /* @__PURE__ */ React.createElement(FF, { label: "% COMPLETE" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.pct, u: u("pct") })), /* @__PURE__ */ React.createElement(FF, { label: "START DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.startDate, u: u("startDate") })), /* @__PURE__ */ React.createElement(FF, { label: "END DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.endDate, u: u("endDate") })), /* @__PURE__ */ React.createElement(FF, { label: "DURATION (days)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.duration, u: u("duration") })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement(FF, { label: "DOCUMENT LINK", full: true }, /* @__PURE__ */ React.createElement("input", { type: "url", value: f.documentUrl || "", onChange: u("documentUrl"), placeholder: "https://", style: { ...iS, marginBottom: 4 } }), f.documentUrl && /* @__PURE__ */ React.createElement("a", { href: f.documentUrl, target: "_blank", rel: "noreferrer", style: { fontSize: 11, color: "#3b82f6", display: "block" } }, "Open link")));
      }
      function DailyLogForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const dark = document.body.classList.contains("dark");
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const d = {
          projectId: projects[0] && projects[0].id || "",
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          weather: "Clear",
          tempHigh: "",
          tempLow: "",
          humidity: "",
          windSpeed: "",
          superintendent: "",
          foreman: "",
          companyName: "",
          manpower: "",
          hoursWorked: "",
          totalHoursDay: "",
          tradeBreakdown: "",
          location: "",
          workPerformed: "",
          materialDeliveries: "",
          visitors: "",
          delays: "None",
          safetyIncident: "No",
          safetyIncidentDesc: "",
          safety: "",
          notes: "",
          rentalEquipUsed: "",
          rentalHoursUsed: "",
          rentalInspectionTime: "",
          rentalComments: "",
          superintendentSig: "",
          signedAt: "",
          meetings: "",
          photos: []
        };
        const [f, sf] = useState({ ...d, ...initial, photos: initial && initial.photos || [] });
        const u = function(k) {
          return function(e) {
            var v = e.target.value;
            sf(function(p) {
              return Object.assign({}, p, { [k]: v });
            });
          };
        };
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        const photoRef = React.useRef();
        const [signing, setSigning] = useState(false);
        const [sigName, setSigName] = useState("");
        const [fetchingWeather, setFetchingWeather] = useState(false);
        const [aiWriting, setAiWriting] = useState(false);
        async function aiWriteReport() {
          const hasData = f.manpower || f.tradeBreakdown || f.location || f.materialDeliveries || f.delays && f.delays !== "None" || f.visitors || f.safety || f.notes;
          if (!hasData) {
            alert("Fill in at least one field first (manpower, location, trade breakdown, deliveries, delays, visitors, or safety notes) so the AI has something real to work from.");
            return;
          }
          setAiWriting(true);
          try {
            const ctx = `Project manpower: ${f.manpower || "unknown"} workers, ${f.hoursWorked || "unknown"} hrs each. Trade breakdown: ${f.tradeBreakdown || "not specified"}. Location/Area: ${f.location || "not specified"}. Weather: ${f.weather || "Clear"}, ${f.tempLow || ""}-${f.tempHigh || ""}F. Material deliveries: ${f.materialDeliveries || "none"}. Delays: ${f.delays || "None"}. Visitors: ${f.visitors || "none"}. Safety notes: ${f.safety || "none"}. Existing notes from super: ${f.workPerformed || f.notes || "(none)"}`;
            const res = await fetch("https://claudeproxy-rkvcepcpza-uc.a.run.app", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 500,
                system: "You are a construction superintendent's assistant. Write a concise, professional 'Work Performed Today' narrative paragraph for a daily field log, using ONLY the data given. Do not invent specifics (trades, quantities, tasks) that aren't in the data. If a field is missing, simply omit it rather than guessing. Use plain, factual, third-person field-report language. No headers, no bullet points, just 2-4 sentences of solid prose suitable for a legal daily record.",
                messages: [{ role: "user", content: ctx }]
              })
            });
            const data = await res.json();
            const text = data.content?.[0]?.text;
            if (text) sf((p) => ({ ...p, workPerformed: text.trim() }));
            else alert("AI did not return a response. Try again.");
          } catch (e) {
            alert("AI Error: " + e.message);
          } finally {
            setAiWriting(false);
          }
        }
        function handlePhotos2(e) {
          const files = Array.from(e.target.files);
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => sf((p) => ({ ...p, photos: [...p.photos || [], { name: file.name, data: ev.target.result, size: file.size }] }));
            reader.readAsDataURL(file);
          });
          e.target.value = "";
        }
        function removePhoto2(idx) {
          sf((p) => ({ ...p, photos: p.photos.filter((_, i) => i !== idx) }));
        }
        function fetchWeather() {
          setFetchingWeather(true);
          if (!navigator.geolocation) {
            showWeatherFallback();
            return;
          }
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const lat = pos.coords.latitude.toFixed(2);
              const lon = pos.coords.longitude.toFixed(2);
              fetch("https://wttr.in/" + lat + "," + lon + "?format=j1").then((r) => {
                if (!r.ok) throw new Error("bad response");
                return r.json();
              }).then((data) => {
                setFetchingWeather(false);
                const cur = data.current_condition && data.current_condition[0];
                if (!cur) {
                  showWeatherFallback();
                  return;
                }
                sf((p) => ({
                  ...p,
                  weather: cur.weatherDesc && cur.weatherDesc[0] ? cur.weatherDesc[0].value : p.weather,
                  tempHigh: cur.temp_F || p.tempHigh,
                  tempLow: cur.temp_F || p.tempLow,
                  humidity: cur.humidity || p.humidity,
                  windSpeed: cur.windspeedMiles || p.windSpeed
                }));
              }).catch(() => {
                setFetchingWeather(false);
                showWeatherFallback();
              });
            },
            () => {
              setFetchingWeather(false);
              showWeatherFallback();
            }
          );
        }
        function showWeatherFallback() {
          setFetchingWeather(false);
          alert("Could not auto-fetch weather. Please enter manually.");
        }
        function signLog() {
          if (!sigName.trim()) {
            alert("Please enter your name to sign.");
            return;
          }
          sf((p) => ({ ...p, superintendentSig: sigName, signedAt: (/* @__PURE__ */ new Date()).toLocaleString() }));
          setSigning(false);
          setSigName("");
        }
        const secStyle = { gridColumn: "1/-1", marginTop: 10, marginBottom: 4, paddingBottom: 5, borderBottom: "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#FF8A00" };
        return /* @__PURE__ */ React.createElement("div", { style: { width: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 14 } }, f.id ? "Edit" : "New", " Daily Log"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Project Information"), /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.date, u: u("date") })), /* @__PURE__ */ React.createElement(FF, { label: "LOCATION / AREA", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.location, u: u("location"), ph: "e.g. Level 3 - Mechanical Room" })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Weather Conditions"), /* @__PURE__ */ React.createElement(FF, { label: "CONDITIONS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.weather, u: u("weather"), opts: WEATHER })), /* @__PURE__ */ React.createElement(FF, { label: "HIGH TEMP (F)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.tempHigh, u: u("tempHigh"), ph: "85" })), /* @__PURE__ */ React.createElement(FF, { label: "LOW TEMP (F)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.tempLow, u: u("tempLow"), ph: "65" })), /* @__PURE__ */ React.createElement(FF, { label: "HUMIDITY %" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.humidity, u: u("humidity"), ph: "60" })), /* @__PURE__ */ React.createElement(FF, { label: "WIND SPEED" }, /* @__PURE__ */ React.createElement(FIn, { v: f.windSpeed, u: u("windSpeed"), ph: "e.g. 10 mph" })), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: fetchWeather, style: { ...S.btnS, fontSize: 11, padding: "5px 12px" } }, fetchingWeather ? "Fetching..." : "Auto-Fetch Weather")), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Personnel"), /* @__PURE__ */ React.createElement(FF, { label: "SUPERINTENDENT" }, /* @__PURE__ */ React.createElement(FIn, { v: f.superintendent, u: u("superintendent") })), /* @__PURE__ */ React.createElement(FF, { label: "FOREMAN" }, /* @__PURE__ */ React.createElement(FIn, { v: f.foreman, u: u("foreman") })), /* @__PURE__ */ React.createElement(FF, { label: "COMPANY NAME", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.companyName, u: u("companyName"), ph: "Subcontractor or company on site" })), /* @__PURE__ */ React.createElement(FF, { label: "MANPOWER (# of workers)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.manpower, u: u("manpower"), ph: "0" })), /* @__PURE__ */ React.createElement(FF, { label: "HOURS WORKED (per worker)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.hoursWorked, u: u("hoursWorked"), ph: "0" })), /* @__PURE__ */ React.createElement(FF, { label: "TOTAL MAN-HOURS" }, /* @__PURE__ */ React.createElement("div", { style: { ...iS, background: dark ? "#0a0e18" : "#f0f4f8", color: "#FF8A00", fontWeight: 700, fontFamily: "monospace", cursor: "default" } }, f.totalHoursDay || "0", " hrs")), /* @__PURE__ */ React.createElement(FF, { label: "TRADE BREAKDOWN", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.tradeBreakdown, u: u("tradeBreakdown"), ph: "e.g. 4 Pipefitters, 2 Laborers, 1 Welder" })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Work Performed"), /* @__PURE__ */ React.createElement(FF, { label: "WORK PERFORMED TODAY", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.workPerformed, u: u("workPerformed"), rows: 4 }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: aiWriteReport, disabled: aiWriting, style: { marginTop: 6, background: aiWriting ? "#374151" : "linear-gradient(135deg,#FF8A00,#cc6a00)", border: "none", color: "#fff", padding: "7px 14px", borderRadius: 7, cursor: aiWriting ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 } }, aiWriting ? "\u2728 Writing..." : "\u2728 Write My Report with AI")), /* @__PURE__ */ React.createElement(FF, { label: "MATERIAL DELIVERIES TODAY", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.materialDeliveries, u: u("materialDeliveries"), ph: "e.g. 200ft 4in carbon steel pipe, 20 clevis hangers" })), /* @__PURE__ */ React.createElement(FF, { label: "VISITORS / INSPECTIONS", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.visitors, u: u("visitors") })), /* @__PURE__ */ React.createElement(FF, { label: "MEETINGS TODAY", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.meetings, u: u("meetings"), ph: "e.g. 9am Safety Kickoff" })), /* @__PURE__ */ React.createElement(FF, { label: "DELAYS / ISSUES", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.delays, u: u("delays") })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Safety"), /* @__PURE__ */ React.createElement(FF, { label: "SAFETY INCIDENT TODAY" }, /* @__PURE__ */ React.createElement(FSel, { v: f.safetyIncident, u: u("safetyIncident"), opts: ["No", "Near Miss", "First Aid", "Recordable", "Property Damage"] })), f.safetyIncident !== "No" && /* @__PURE__ */ React.createElement(FF, { label: "INCIDENT DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.safetyIncidentDesc, u: u("safetyIncidentDesc"), rows: 2 })), /* @__PURE__ */ React.createElement(FF, { label: "SAFETY NOTES / TOOLBOX TOPIC", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.safety, u: u("safety") })), /* @__PURE__ */ React.createElement(FF, { label: "ADDITIONAL NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Rental Equipment"), /* @__PURE__ */ React.createElement(FF, { label: "EQUIPMENT USED TODAY", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.rentalEquipUsed, u: u("rentalEquipUsed"), ph: "e.g. CAT 320, Boom Lift #4" })), /* @__PURE__ */ React.createElement(FF, { label: "HOURS USED" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.rentalHoursUsed, u: u("rentalHoursUsed"), ph: "0" })), /* @__PURE__ */ React.createElement(FF, { label: "INSPECTION TIME" }, /* @__PURE__ */ React.createElement(FIn, { v: f.rentalInspectionTime, u: u("rentalInspectionTime"), ph: "e.g. 07:00 AM" })), /* @__PURE__ */ React.createElement(FF, { label: "EQUIPMENT COMMENTS", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.rentalComments, u: u("rentalComments"), rows: 2 })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Site Photos"), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("input", { ref: photoRef, type: "file", accept: "image/*", multiple: true, capture: "environment", style: { display: "none" }, onChange: handlePhotos2 }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => {
          photoRef.current.removeAttribute("capture");
          photoRef.current.click();
        }, style: { ...S.btnP, fontSize: 11, padding: "6px 12px" } }, "Upload Photos"), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => {
          photoRef.current.setAttribute("capture", "environment");
          photoRef.current.click();
        }, style: { ...S.btnS, fontSize: 11, padding: "6px 12px" } }, "Take Photo"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: dark ? "#4a5580" : "#94a3b8", alignSelf: "center" } }, f.photos && f.photos.length || 0, " photo", f.photos && f.photos.length !== 1 ? "s" : "", " attached")), f.photos && f.photos.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr))", gap: 8 } }, f.photos.map((ph, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid " + (dark ? "#2a3150" : "#e2e8f0"), background: dark ? "#0f1117" : "#f8fafc" } }, /* @__PURE__ */ React.createElement("img", { src: ph.data, alt: ph.name, style: { width: "100%", height: 80, objectFit: "cover", display: "block" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "3px 5px", fontSize: 9, color: dark ? "#4a5580" : "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, ph.name), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => removePhoto2(i), style: { position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", background: "rgba(239,68,68,0.9)", border: "none", color: "#fff", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 } }, "x"))))), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Superintendent Sign-Off"), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, f.superintendentSig ? /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: dark ? "rgba(16,185,129,0.08)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#10b981" } }, "Signed by: ", f.superintendentSig), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: dark ? "#4a5580" : "#94a3b8", marginTop: 2 } }, f.signedAt)), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => sf((p) => ({ ...p, superintendentSig: "", signedAt: "" })), style: { ...S.btnS, fontSize: 10, padding: "4px 9px", color: "#ef4444" } }, "Remove")) : signing ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { defaultValue: sigName, onBlur: (e) => setSigName(e.target.value), placeholder: "Type your full name to sign", style: { ...iS, flex: 1 } }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: signLog, style: { ...S.btnP, fontSize: 11, padding: "6px 12px" } }, "Sign"), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => {
          setSigning(false);
          setSigName("");
        }, style: { ...S.btnS, fontSize: 11, padding: "6px 12px" } }, "Cancel")) : /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setSigning(true), style: { ...S.btnS, fontSize: 11, padding: "6px 14px" } }, "Sign Log as Superintendent"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 18, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: () => onSave({ ...f, projectId: Number(f.projectId), totalHoursDay: String((Number(f.manpower) || 0) * (Number(f.hoursWorked) || 0)), id: f.id || uid2() }), style: S.btnP }, "Save Log")));
      }
      function RentalForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", equipName: "", equipType: "Excavator", vendor: "", serialNo: "", poNumber: "", rentStart: fmt(today), rentEnd: "", dailyRate: "", weeklyRate: "", monthlyRate: "", totalCost: "", jobsite: "", fuelType: "Diesel", status: "On Rent", returnCondition: "", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Rental Equipment`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), dailyRate: Number(f.dailyRate || 0), weeklyRate: Number(f.weeklyRate || 0), monthlyRate: Number(f.monthlyRate || 0), totalCost: Number(f.totalCost || 0), id: f.id || uid() }), onCancel, label: "Rental" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "EQUIPMENT NAME / DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.equipName, u: u("equipName"), ph: "e.g. CAT 320 Excavator" })), /* @__PURE__ */ React.createElement(FF, { label: "EQUIPMENT TYPE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.equipType, u: u("equipType"), opts: EQUIP_TYPES })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["On Rent", "Off Rent", "Reserved", "Breakdown", "Cancelled"] })), /* @__PURE__ */ React.createElement(FF, { label: "VENDOR / RENTAL COMPANY" }, /* @__PURE__ */ React.createElement(FIn, { v: f.vendor, u: u("vendor") })), /* @__PURE__ */ React.createElement(FF, { label: "PO / RENTAL AGREEMENT #" }, /* @__PURE__ */ React.createElement(FIn, { v: f.poNumber, u: u("poNumber") })), /* @__PURE__ */ React.createElement(FF, { label: "SERIAL / UNIT NUMBER" }, /* @__PURE__ */ React.createElement(FIn, { v: f.serialNo, u: u("serialNo") })), /* @__PURE__ */ React.createElement(FF, { label: "FUEL TYPE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.fuelType, u: u("fuelType"), opts: ["Diesel", "Gas", "Electric", "Hybrid", "N/A"] })), /* @__PURE__ */ React.createElement(FF, { label: "RENT START DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.rentStart, u: u("rentStart") })), /* @__PURE__ */ React.createElement(FF, { label: "RENT END / OFF-RENT DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.rentEnd, u: u("rentEnd") })), /* @__PURE__ */ React.createElement(FF, { label: "DAILY RATE ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.dailyRate, u: u("dailyRate") })), /* @__PURE__ */ React.createElement(FF, { label: "WEEKLY RATE ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.weeklyRate, u: u("weeklyRate") })), /* @__PURE__ */ React.createElement(FF, { label: "MONTHLY RATE ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.monthlyRate, u: u("monthlyRate") })), /* @__PURE__ */ React.createElement(FF, { label: "TOTAL ESTIMATED COST ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.totalCost, u: u("totalCost") })), /* @__PURE__ */ React.createElement(FF, { label: "JOBSITE / LOCATION" }, /* @__PURE__ */ React.createElement(FIn, { v: f.jobsite, u: u("jobsite") })), /* @__PURE__ */ React.createElement(FF, { label: "RETURN CONDITION" }, /* @__PURE__ */ React.createElement(FIn, { v: f.returnCondition, u: u("returnCondition"), ph: "e.g. Good, Damaged" })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement(FF, { label: "DOCUMENT LINK", full: true }, /* @__PURE__ */ React.createElement("input", { type: "url", value: f.documentUrl || "", onChange: u("documentUrl"), placeholder: "https://", style: { ...iS, marginBottom: 4 } }), f.documentUrl && /* @__PURE__ */ React.createElement("a", { href: f.documentUrl, target: "_blank", rel: "noreferrer", style: { fontSize: 11, color: "#3b82f6", display: "block" } }, "Open link")));
      }
      function DelayForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", dateReported: fmt(today), delayType: "Weather", description: "", trade: "General", reportedBy: "", daysLost: "0", revisedCompletion: "", noticeGiven: "No", costImpact: "", status: "Active", resolution: "", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "Log"} Delay`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid() }), onCancel, label: "Delay" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "DATE REPORTED" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.dateReported, u: u("dateReported") })), /* @__PURE__ */ React.createElement(FF, { label: "DELAY TYPE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.delayType, u: u("delayType"), opts: DELAY_TYPES })), /* @__PURE__ */ React.createElement(FF, { label: "DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.description, u: u("description"), rows: 2 })), /* @__PURE__ */ React.createElement(FF, { label: "TRADE IMPACTED" }, /* @__PURE__ */ React.createElement(FSel, { v: f.trade, u: u("trade"), opts: TRADES })), /* @__PURE__ */ React.createElement(FF, { label: "REPORTED BY" }, /* @__PURE__ */ React.createElement(FIn, { v: f.reportedBy, u: u("reportedBy") })), /* @__PURE__ */ React.createElement(FF, { label: "DAYS LOST" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.daysLost, u: u("daysLost") })), /* @__PURE__ */ React.createElement(FF, { label: "REVISED COMPLETION" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.revisedCompletion, u: u("revisedCompletion") })), /* @__PURE__ */ React.createElement(FF, { label: "WRITTEN NOTICE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.noticeGiven, u: u("noticeGiven"), opts: ["No", "Yes", "Pending"] })), /* @__PURE__ */ React.createElement(FF, { label: "COST IMPACT ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.costImpact, u: u("costImpact") })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Active", "Pending", "Resolved", "Closed"] })), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement(FF, { label: "RESOLUTION / MITIGATION", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.resolution, u: u("resolution") })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement(FF, { label: "VISIBILITY", full: true }, /* @__PURE__ */ React.createElement(FSel, { v: f.sharedExternal ? "External" : "Internal", u: (v) => u("sharedExternal")(v === "External"), opts: ["Internal", "External"] })), f.sharedExternal && /* @__PURE__ */ React.createElement(FF, { label: "", full: true }, /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 6, fontSize: 11, color: "#10b981" } }, "\u{1F310} This RFI will be visible to external users (GC, Owner, etc.)")));
      }
      function PunchForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", area: "", trade: "General", description: "", assignee: "", dueDate: fmt(addDays(today, 7)), priority: "High", status: "Open", notes: "", photos: [] };
        const [f, sf] = useState({ ...d, ...initial, photos: initial && initial.photos || [] });
        const u = function(k) {
          return function(e) {
            var v = e.target.value;
            sf(function(p) {
              return Object.assign({}, p, { [k]: v });
            });
          };
        };
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        const photoRef = React.useRef();
        const dark = document.body.classList.contains("dark");
        function punchHandlePhotos(e) {
          Array.from(e.target.files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => sf((p) => ({ ...p, photos: [...p.photos || [], { name: file.name, data: ev.target.result }] }));
            reader.readAsDataURL(file);
          });
          e.target.value = "";
        }
        function punchRemovePhoto(i) {
          sf((p) => ({ ...p, photos: p.photos.filter((_, x) => x !== i) }));
        }
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Punch Item`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid() }), onCancel, label: "Item" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "AREA / UNIT" }, /* @__PURE__ */ React.createElement(FIn, { v: f.area, u: u("area") })), /* @__PURE__ */ React.createElement(FF, { label: "TRADE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.trade, u: u("trade"), opts: TRADES })), /* @__PURE__ */ React.createElement(FF, { label: "DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.description, u: u("description") })), /* @__PURE__ */ React.createElement(FF, { label: "ASSIGNEE" }, /* @__PURE__ */ React.createElement(FIn, { v: f.assignee, u: u("assignee") })), /* @__PURE__ */ React.createElement(FF, { label: "DUE DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.dueDate, u: u("dueDate") })), /* @__PURE__ */ React.createElement(FF, { label: "PRIORITY" }, /* @__PURE__ */ React.createElement(FSel, { v: f.priority, u: u("priority"), opts: ["High", "Medium", "Low"] })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Open", "In Review", "Complete", "Closed"] })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement(FF, { label: "PHOTOS", full: true }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", { ref: photoRef, type: "file", accept: "image/*", multiple: true, capture: "environment", style: { display: "none" }, onChange: handlePhotos }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => {
          photoRef.current.removeAttribute("capture");
          photoRef.current.click();
        }, style: { ...S.btnP, fontSize: 11, padding: "5px 11px" } }, "Upload"), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => {
          photoRef.current.setAttribute("capture", "environment");
          photoRef.current.click();
        }, style: { ...S.btnS, fontSize: 11, padding: "5px 11px" } }, "Camera"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: dark ? "#4a5580" : "#94a3b8", alignSelf: "center" } }, f.photos && f.photos.length || 0, " photo", f.photos && f.photos.length !== 1 ? "s" : "")), f.photos && f.photos.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(80px,1fr))", gap: 6 } }, f.photos.map((ph, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { position: "relative", borderRadius: 6, overflow: "hidden", border: "1px solid " + (dark ? "#2a3150" : "#e2e8f0") } }, /* @__PURE__ */ React.createElement("img", { src: ph.data, alt: ph.name, style: { width: "100%", height: 70, objectFit: "cover", display: "block" } }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => removePhoto(i), style: { position: "absolute", top: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "rgba(239,68,68,0.9)", border: "none", color: "#fff", fontSize: 9, cursor: "pointer", lineHeight: 1 } }, "x")))))));
      }
      function ActionForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", description: "", assignedTo: "", dueDate: fmt(addDays(today, 3)), priority: "Medium", status: "Open", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Action Item`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid() }), onCancel, label: "Action" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.description, u: u("description") })), /* @__PURE__ */ React.createElement(FF, { label: "ASSIGNED TO" }, /* @__PURE__ */ React.createElement(FIn, { v: f.assignedTo, u: u("assignedTo") })), /* @__PURE__ */ React.createElement(FF, { label: "DUE DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.dueDate, u: u("dueDate") })), /* @__PURE__ */ React.createElement(FF, { label: "PRIORITY" }, /* @__PURE__ */ React.createElement(FSel, { v: f.priority, u: u("priority"), opts: ["High", "Medium", "Low"] })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Open", "In Review", "Closed"] })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement(FF, { label: "VISIBILITY", full: true }, /* @__PURE__ */ React.createElement("select", { value: f.sharedExternal ? "External" : "Internal", onChange: (e) => sf((p) => ({ ...p, sharedExternal: e.target.value === "External" })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "Internal" }, "\u{1F512} Internal Only"), /* @__PURE__ */ React.createElement("option", { value: "External" }, "\u{1F310} Share Externally"))));
      }
      function EquipForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", equipment: "", vendor: "", deliveryDate: fmt(today), returnDate: fmt(addDays(today, 14)), status: "Scheduled", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Equipment Delivery`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid() }), onCancel, label: "Equipment" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "EQUIPMENT", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.equipment, u: u("equipment") })), /* @__PURE__ */ React.createElement(FF, { label: "VENDOR" }, /* @__PURE__ */ React.createElement(FIn, { v: f.vendor, u: u("vendor") })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Scheduled", "Delivered", "Partial", "Cancelled"] })), /* @__PURE__ */ React.createElement(FF, { label: "DELIVERY DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.deliveryDate, u: u("deliveryDate") })), /* @__PURE__ */ React.createElement(FF, { label: "RETURN DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.returnDate, u: u("returnDate") })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })));
      }
      function MatForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", material: "", vendor: "", poNumber: "", expectedDate: fmt(addDays(today, 3)), actualDate: "", status: "Pending", location: "", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Material Delivery`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid() }), onCancel, label: "Delivery" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "MATERIAL", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.material, u: u("material") })), /* @__PURE__ */ React.createElement(FF, { label: "VENDOR" }, /* @__PURE__ */ React.createElement(FIn, { v: f.vendor, u: u("vendor") })), /* @__PURE__ */ React.createElement(FF, { label: "PO NUMBER" }, /* @__PURE__ */ React.createElement(FIn, { v: f.poNumber, u: u("poNumber") })), /* @__PURE__ */ React.createElement(FF, { label: "EXPECTED DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.expectedDate, u: u("expectedDate") })), /* @__PURE__ */ React.createElement(FF, { label: "DATE RECEIVED" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.actualDate, u: u("actualDate") })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Pending", "Scheduled", "Delivered", "Partial", "Cancelled"] })), /* @__PURE__ */ React.createElement(FF, { label: "DELIVERY LOCATION" }, /* @__PURE__ */ React.createElement(FIn, { v: f.location, u: u("location") })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })));
      }
      function SubForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", specSection: "", description: "", submittedBy: "", submittedDate: fmt(today), requiredDate: fmt(addDays(today, 14)), status: "In Review", returnedDate: "", reviewer: "", notes: "", documentUrl: "", sharedExternal: false };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Submittal`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid() }), onCancel, label: "Submittal" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "SPEC SECTION" }, /* @__PURE__ */ React.createElement(FIn, { v: f.specSection, u: u("specSection"), ph: "e.g. 03300" })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Not Started", "In Review", "Approved", "Rejected"] })), /* @__PURE__ */ React.createElement(FF, { label: "DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.description, u: u("description") })), /* @__PURE__ */ React.createElement(FF, { label: "SUBMITTED BY" }, /* @__PURE__ */ React.createElement(FIn, { v: f.submittedBy, u: u("submittedBy") })), /* @__PURE__ */ React.createElement(FF, { label: "REVIEWER" }, /* @__PURE__ */ React.createElement(FIn, { v: f.reviewer, u: u("reviewer") })), /* @__PURE__ */ React.createElement(FF, { label: "SUBMITTED DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.submittedDate, u: u("submittedDate") })), /* @__PURE__ */ React.createElement(FF, { label: "REQUIRED BY" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.requiredDate, u: u("requiredDate") })), /* @__PURE__ */ React.createElement(FF, { label: "RETURNED DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.returnedDate, u: u("returnedDate") })), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement(FF, { label: "VISIBILITY", full: true }, /* @__PURE__ */ React.createElement("select", { value: f.sharedExternal ? "External" : "Internal", onChange: (e) => sf((p) => ({ ...p, sharedExternal: e.target.value === "External" })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "Internal" }, "\u{1F512} Internal Only"), /* @__PURE__ */ React.createElement("option", { value: "External" }, "\u{1F310} Share Externally"))));
      }
      function RFIForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", rfiNumber: "", subject: "", submittedBy: "", submittedDate: fmt(today), dueDate: fmt(addDays(today, 10)), status: "Open", answeredDate: "", answeredBy: "", response: "", notes: "", documentUrl: "", sharedExternal: false };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} RFI`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid() }), onCancel, label: "RFI" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "RFI NUMBER" }, /* @__PURE__ */ React.createElement(FIn, { v: f.rfiNumber, u: u("rfiNumber"), ph: "e.g. RFI-001" })), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: ["Open", "Pending", "Answered", "Closed"] })), /* @__PURE__ */ React.createElement(FF, { label: "SUBJECT", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.subject, u: u("subject") })), /* @__PURE__ */ React.createElement(FF, { label: "SUBMITTED BY" }, /* @__PURE__ */ React.createElement(FIn, { v: f.submittedBy, u: u("submittedBy") })), /* @__PURE__ */ React.createElement(FF, { label: "SUBMITTED DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.submittedDate, u: u("submittedDate") })), /* @__PURE__ */ React.createElement(FF, { label: "DUE DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.dueDate, u: u("dueDate") })), /* @__PURE__ */ React.createElement(FF, { label: "ANSWERED DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.answeredDate, u: u("answeredDate") })), /* @__PURE__ */ React.createElement(FF, { label: "ANSWERED BY" }, /* @__PURE__ */ React.createElement(FIn, { v: f.answeredBy, u: u("answeredBy") })), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement(FF, { label: "RESPONSE", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.response, u: u("response") })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })), /* @__PURE__ */ React.createElement(FF, { label: "VISIBILITY", full: true }, /* @__PURE__ */ React.createElement("select", { value: f.sharedExternal ? "External" : "Internal", onChange: (e) => sf((p) => ({ ...p, sharedExternal: e.target.value === "External" })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "Internal" }, "\u{1F512} Internal Only"), /* @__PURE__ */ React.createElement("option", { value: "External" }, "\u{1F310} Share Externally"))));
      }
      function CostCodeForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", code: "", description: "", category: "Labor", budgeted: "", committed: "0", spent: "0", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        const bud = Number(f.budgeted || 0), sp = Number(f.spent || 0);
        const variance = bud - sp;
        const status = bud === 0 ? "On Budget" : sp > bud ? "Over Budget" : sp / bud > 0.9 ? "At Risk" : "Under Budget";
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Cost Code`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), budgeted: Number(f.budgeted || 0), committed: Number(f.committed || 0), spent: Number(f.spent || 0), variance, status, id: f.id || uid() }), onCancel, label: "Cost Code" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "COST CODE" }, /* @__PURE__ */ React.createElement(FIn, { v: f.code, u: u("code"), ph: "e.g. 03-300" })), /* @__PURE__ */ React.createElement(FF, { label: "CATEGORY" }, /* @__PURE__ */ React.createElement(FSel, { v: f.category, u: u("category"), opts: COST_CATEGORIES })), /* @__PURE__ */ React.createElement(FF, { label: "DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.description, u: u("description") })), /* @__PURE__ */ React.createElement(FF, { label: "BUDGETED AMOUNT ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.budgeted, u: u("budgeted") })), /* @__PURE__ */ React.createElement(FF, { label: "COMMITTED ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.committed, u: u("committed") })), /* @__PURE__ */ React.createElement(FF, { label: "AMOUNT SPENT ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.spent, u: u("spent") })), /* @__PURE__ */ React.createElement(FF, { label: "VARIANCE" }, /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 11px", borderRadius: 8, background: variance >= 0 ? "#0f2a1a" : "#2a1a1a", color: variance >= 0 ? "#6ee7b7" : "#f87171", fontSize: 13, fontFamily: "monospace", fontWeight: 700 } }, variance >= 0 ? "+" : "", variance >= 0 ? "$" : "\u2013$", Math.abs(variance).toLocaleString())), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })));
      }
      function TransactionForm({ iS, lS, S, projects, costCodes, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", date: fmt(today), description: "", vendor: "", category: "Labor", type: "Expense", amount: "", costCodeId: "", notes: "" };
        const [f, sf] = useState({ ...d, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        const projCodes = costCodes.filter((c) => c.projectId === Number(f.projectId));
        return /* @__PURE__ */ React.createElement(FormShell, { title: `${f.id ? "Edit" : "New"} Transaction`, S, onSave: () => onSave({ ...f, projectId: Number(f.projectId), amount: Number(f.amount || 0), id: f.id || uid() }), onCancel, label: "Transaction" }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.date, u: u("date") })), /* @__PURE__ */ React.createElement(FF, { label: "TYPE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.type, u: u("type"), opts: ["Expense", "Credit", "Adjustment"] })), /* @__PURE__ */ React.createElement(FF, { label: "CATEGORY" }, /* @__PURE__ */ React.createElement(FSel, { v: f.category, u: u("category"), opts: COST_CATEGORIES })), /* @__PURE__ */ React.createElement(FF, { label: "DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.description, u: u("description") })), /* @__PURE__ */ React.createElement(FF, { label: "VENDOR / PAYEE" }, /* @__PURE__ */ React.createElement(FIn, { v: f.vendor, u: u("vendor") })), /* @__PURE__ */ React.createElement(FF, { label: "AMOUNT ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.amount, u: u("amount") })), /* @__PURE__ */ React.createElement(FF, { label: "COST CODE" }, projCodes.length ? /* @__PURE__ */ React.createElement("select", { value: f.costCodeId || "", onChange: u("costCodeId"), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 None \u2014"), projCodes.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id, value: c.id }, c.code, " \u2013 ", c.description))) : /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 11px", borderRadius: 8, background: "#1a2035", color: "#5a6480", fontSize: 12 } }, "Import cost codes first")), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") })));
      }
      var INVENTORY_CATEGORIES = ["Concrete", "Steel / Rebar", "Lumber / Framing", "Fasteners", "Electrical", "Plumbing", "HVAC / Mechanical", "Finishes", "Waterproofing", "Safety / PPE", "Tools / Small Equipment", "Adhesives / Sealants", "Insulation", "Roofing", "Site / Civil", "Other"];
      var INVENTORY_UNITS = ["Each", "LF (Linear Feet)", "SF (Square Feet)", "CY (Cubic Yards)", "Tons", "Lbs", "Gallons", "Bags", "Boxes", "Rolls", "Sheets", "Bundles", "Pallets", "Sets", "Other"];
      function InventoryForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const d = { projectId: projects[0] && projects[0].id || "", itemName: "", category: "Other", sku: "", unit: "Each", qtyOnHand: "0", reorderPoint: "5", qtyOrdered: "", location: "", supplier: "", unitCost: "", notes: "", lastUpdated: fmt(today) };
        const [f, sf] = useState({ ...d, ...initial });
        const u = function(k) {
          return function(e) {
            var v = e.target.value;
            sf(function(p) {
              return Object.assign({}, p, { [k]: v });
            });
          };
        };
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        const qty = Number(f.qtyOnHand || 0), rp = Number(f.reorderPoint || 0);
        const isOut = qty === 0, isLow = qty > 0 && qty <= rp;
        const statusColor = isOut ? "#ef4444" : isLow ? "#FF8A00" : "#10b981";
        const statusLabel = isOut ? "OUT OF STOCK" : isLow ? "LOW STOCK \u2014 AT OR BELOW REORDER POINT" : "IN STOCK";
        const totalVal = (qty * (Number(f.unitCost) || 0)).toFixed(2);
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 14 } }, f.id ? "Edit" : "New", " Inventory Item"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14, padding: "8px 14px", borderRadius: 9, border: `1px solid ${statusColor}44`, background: `${statusColor}11`, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, fontWeight: 900, color: statusColor, fontFamily: "monospace" } }, qty), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: statusColor } }, statusLabel), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#6a7880" } }, "Reorder point: ", rp, " ", f.unit || "", " \xB7 Total value: $", totalVal))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "ITEM NAME / MATERIAL", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.itemName, u: u("itemName"), ph: 'e.g. 1/2" Rebar, 3/4 Plywood, PVC 4" Pipe' })), /* @__PURE__ */ React.createElement(FF, { label: "CATEGORY" }, /* @__PURE__ */ React.createElement(FSel, { v: f.category, u: u("category"), opts: INVENTORY_CATEGORIES })), /* @__PURE__ */ React.createElement(FF, { label: "SKU / PART NUMBER" }, /* @__PURE__ */ React.createElement(FIn, { v: f.sku, u: u("sku"), ph: "e.g. STL-RB-12-20" })), /* @__PURE__ */ React.createElement(FF, { label: "UNIT OF MEASURE" }, /* @__PURE__ */ React.createElement(FSel, { v: f.unit, u: u("unit"), opts: INVENTORY_UNITS })), /* @__PURE__ */ React.createElement(FF, { label: "SUPPLIER / VENDOR" }, /* @__PURE__ */ React.createElement(FIn, { v: f.supplier, u: u("supplier") })), /* @__PURE__ */ React.createElement(FF, { label: "QTY ON HAND" }, /* @__PURE__ */ React.createElement("input", { type: "number", defaultValue: f.qtyOnHand || "", onBlur: u("qtyOnHand"), min: "0", style: { ...iS, fontWeight: 700, fontSize: 15, color: statusColor, borderColor: statusColor + "66" } })), /* @__PURE__ */ React.createElement(FF, { label: "REORDER POINT (alert when at or below)" }, /* @__PURE__ */ React.createElement("input", { type: "number", defaultValue: f.reorderPoint || "", onBlur: u("reorderPoint"), min: "0", style: { ...iS, borderColor: "#FF8A00aa" } })), /* @__PURE__ */ React.createElement(FF, { label: "QTY ORDERED / ON ORDER" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.qtyOrdered, u: u("qtyOrdered"), ph: "0" })), /* @__PURE__ */ React.createElement(FF, { label: "UNIT COST ($)" }, /* @__PURE__ */ React.createElement(FIn, { type: "number", v: f.unitCost, u: u("unitCost"), ph: "0.00" })), /* @__PURE__ */ React.createElement(FF, { label: "STORAGE LOCATION", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.location, u: u("location"), ph: "e.g. Laydown Yard A, Trailer 2, Level 4 Storage" })), /* @__PURE__ */ React.createElement(FF, { label: "LAST UPDATED" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.lastUpdated, u: u("lastUpdated") })), /* @__PURE__ */ React.createElement(FF, { label: "NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: () => onSave({ ...f, projectId: Number(f.projectId), unitCost: Number(f.unitCost || 0), lastUpdated: fmt(today), id: f.id || uid() }), style: S.btnP }, "Save Item")));
      }
      var JSA_RISK = ["Low", "Medium", "High"];
      var JSA_STATUS = ["Open", "Active", "On Hold", "Completed", "Cancelled"];
      var PPE_OPTIONS = ["Hard Hat", "Safety Vest", "Safety Glasses", "Steel-Toe Boots", "Gloves", "Hearing Protection", "Respirator", "Face Shield", "Fall Protection Harness", "High-Visibility Vest", "Dust Mask", "Chemical Resistant Gloves", "Welding Helmet", "Knee Pads", "Cut-Resistant Gloves"];
      function JSAForm({ iS, lS, S, projects, initial, onSave, onCancel }) {
        const dark = document.body.classList.contains("dark");
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const d = {
          projectId: projects[0] && projects[0].id || "",
          jsaNumber: "JSA-" + String(Date.now()).slice(-4),
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          location: "",
          taskDescription: "",
          supervisor: "",
          company: "",
          crew: "",
          riskLevel: "Medium",
          status: "Active",
          ppeRequired: "",
          steps: [{ id: uid2(), step: "", hazards: "", controls: "", risk: "Medium" }],
          emergency: "Call 911. Notify superintendent immediately. Nearest hospital: ___. Muster point: ___.",
          reviewedBy: "",
          crewSignons: [],
          crewSignoffs: [],
          notes: ""
        };
        const [f, sf] = useState({
          ...d,
          ...initial,
          steps: initial && initial.steps || d.steps,
          crewSignons: initial && initial.crewSignons || [],
          crewSignoffs: initial && initial.crewSignoffs || []
        });
        const u = function(k) {
          return function(e) {
            var v = e.target.value;
            sf(function(p) {
              return Object.assign({}, p, { [k]: v });
            });
          };
        };
        const { FIn, FSel, FTA, PSel } = mkForms(iS);
        const [newSignonName, setNewSignonName] = useState("");
        const [newSigName, setNewSigName] = useState("");
        const [showTemplates, setShowTemplates] = useState(false);
        const TEMPLATES = {
          "Hot Work": {
            taskDescription: "Welding, cutting, or grinding operations producing heat or sparks.",
            steps: [
              { id: uid2(), step: "Inspect work area for flammables", hazards: "Fire, explosion from flammable materials nearby", controls: "Remove or wet down all flammables within 35ft. Post fire watch.", risk: "High" },
              { id: uid2(), step: "Set up welding equipment", hazards: "Electric shock, arc flash, UV radiation", controls: "Inspect cables, use proper PPE - welding helmet, gloves, jacket. Ground equipment.", risk: "High" },
              { id: uid2(), step: "Perform hot work", hazards: "Fire, burns, fumes, UV exposure", controls: "Fire watch posted. Ventilation adequate. Hot work permit issued.", risk: "High" },
              { id: uid2(), step: "Post-work inspection", hazards: "Smoldering materials, hidden fire", controls: "Fire watch remain 30 min after work stops. Inspect area for hot spots.", risk: "Medium" }
            ]
          },
          "Working at Height": {
            taskDescription: "Work performed above 6 feet requiring fall protection.",
            steps: [
              { id: uid2(), step: "Inspect fall protection equipment", hazards: "Equipment failure causing fall", controls: "Inspect harness, lanyard, anchor points before use. Tag out defective equipment.", risk: "High" },
              { id: uid2(), step: "Set up work platform or ladder", hazards: "Unstable platform, ladder slip", controls: "Secure ladder base and top. Barricade below. 3-point contact on ladder.", risk: "High" },
              { id: uid2(), step: "Perform elevated work", hazards: "Falls, dropped tools/materials", controls: "100% tie-off above 6ft. Tool lanyards required. Hard hats for workers below.", risk: "High" },
              { id: uid2(), step: "Descend and secure area", hazards: "Falls during descent", controls: "Face ladder when descending. Lower tools separately. Remove barricades when complete.", risk: "Medium" }
            ]
          },
          "Pipe Threading": {
            taskDescription: "Threading and cutting pipe using power threading machine.",
            steps: [
              { id: uid2(), step: "Set up threading machine", hazards: "Pinch points, cutting oil spills, trip hazards", controls: "Secure machine. Set up oil pan. Keep area clear. Inspect chuck and dies.", risk: "Medium" },
              { id: uid2(), step: "Load and secure pipe", hazards: "Pipe drop, pinch points from chuck", controls: "Use pipe stands. Keep hands clear of chuck. Secure pipe properly before starting.", risk: "Medium" },
              { id: uid2(), step: "Thread pipe", hazards: "Cuts from sharp threads, oil splash, noise", controls: "Cut-resistant gloves. Safety glasses. Apply oil continuously. Hearing protection if needed.", risk: "Medium" },
              { id: uid2(), step: "Clean up", hazards: "Slips from oil, cuts from sharp threads", controls: "Clean oil immediately. Use thread protectors. Dispose of cuttings properly.", risk: "Low" }
            ]
          },
          "Confined Space": {
            taskDescription: "Entry into permit-required confined space.",
            steps: [
              { id: uid2(), step: "Atmospheric testing", hazards: "Toxic atmosphere, oxygen deficiency, explosive gas", controls: "Test O2, CO, H2S, LEL before entry. Calibrate meter. Document results.", risk: "High" },
              { id: uid2(), step: "Isolation and lockout", hazards: "Unexpected flow, energy release", controls: "LOTO all energy sources. Blank all lines. Verify zero energy state.", risk: "High" },
              { id: uid2(), step: "Entry with attendant", hazards: "Engulfment, atmospheric hazards, entrapment", controls: "Permit issued. Attendant outside. Retrieval system ready. Communication established.", risk: "High" },
              { id: uid2(), step: "Rescue plan", hazards: "Worker incapacitation requiring rescue", controls: "Non-entry rescue system in place. Emergency services notified. Attendant trained.", risk: "High" }
            ]
          },
          "Overhead Lifting": {
            taskDescription: "Rigging and lifting operations using crane or hoist.",
            steps: [
              { id: uid2(), step: "Pre-lift planning", hazards: "Overload, improper rigging, structural failure", controls: "Calculate load weight. Verify crane capacity. Inspect all rigging. Lift plan signed.", risk: "High" },
              { id: uid2(), step: "Inspect rigging", hazards: "Equipment failure during lift", controls: "Inspect slings, shackles, hooks. Verify certification dates. Tag out damaged equipment.", risk: "High" },
              { id: uid2(), step: "Perform lift", hazards: "Dropped load, swing, contact with personnel", controls: "Exclusion zone barricaded. Taglines used. No personnel under load. Spotter assigned.", risk: "High" },
              { id: uid2(), step: "Set load", hazards: "Unstable load, pinch points", controls: "Guide load with taglines. Keep hands clear. Verify stable placement before releasing.", risk: "Medium" }
            ]
          }
        };
        function jsaLoadTemplate(name) {
          const t = TEMPLATES[name];
          sf((p) => ({ ...p, taskDescription: t.taskDescription, steps: t.steps.map((s) => ({ ...s, id: uid2() })) }));
          setShowTemplates(false);
        }
        function addStep() {
          sf((p) => ({ ...p, steps: [...p.steps, { id: uid2(), step: "", hazards: "", controls: "", risk: "Medium" }] }));
        }
        function removeStep(id) {
          sf((p) => ({ ...p, steps: p.steps.filter((s) => s.id !== id) }));
        }
        function updateStep(id, key, val) {
          sf((p) => ({ ...p, steps: p.steps.map((s) => s.id === id ? { ...s, [key]: val } : s) }));
        }
        function addSignon() {
          if (!newSignonName.trim()) {
            alert("Enter a name to sign on.");
            return;
          }
          sf((p) => ({ ...p, crewSignons: [...p.crewSignons, { name: newSignonName.trim(), signedAt: (/* @__PURE__ */ new Date()).toLocaleString() }] }));
          setNewSignonName("");
        }
        function removeSignon(i) {
          sf((p) => ({ ...p, crewSignons: p.crewSignons.filter((_, x) => x !== i) }));
        }
        function addSignoff() {
          if (!newSigName.trim()) {
            alert("Enter a name to sign off.");
            return;
          }
          sf((p) => ({ ...p, crewSignoffs: [...p.crewSignoffs, { name: newSigName.trim(), signedAt: (/* @__PURE__ */ new Date()).toLocaleString() }] }));
          setNewSigName("");
        }
        function removeSignoff(i) {
          sf((p) => ({ ...p, crewSignoffs: p.crewSignoffs.filter((_, x) => x !== i) }));
        }
        const [ppeChecked, setPpeChecked] = useState(() => {
          const existing = (initial && initial.ppeRequired || "").split(",").map((s) => s.trim()).filter(Boolean);
          return PPE_OPTIONS.reduce((acc, p) => ({ ...acc, [p]: existing.includes(p) }), {});
        });
        function togglePpe(item) {
          setPpeChecked((prev) => {
            const next = { ...prev, [item]: !prev[item] };
            const selected = PPE_OPTIONS.filter((p) => next[p]).join(", ");
            sf((f2) => ({ ...f2, ppeRequired: selected }));
            return next;
          });
        }
        const riskColor = { Low: "#10b981", Medium: "#f59e0b", High: "#ef4444" }[f.riskLevel] || "#f59e0b";
        const secStyle = { gridColumn: "1/-1", marginTop: 12, marginBottom: 4, paddingBottom: 5, borderBottom: "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#FF8A00" };
        return /* @__PURE__ */ React.createElement("div", { style: { width: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text } }, f.id ? "Edit" : "New", " Job Safety Analysis"), /* @__PURE__ */ React.createElement("div", { style: { background: riskColor + "22", border: "1px solid " + riskColor + "66", color: riskColor, padding: "4px 12px", borderRadius: 7, fontSize: 11, fontWeight: 700 } }, f.riskLevel, " Risk")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: secStyle }, "JSA Information"), /* @__PURE__ */ React.createElement(FF, { label: "PROJECT", full: true }, /* @__PURE__ */ React.createElement(PSel, { projects, v: f.projectId, u: u("projectId") })), /* @__PURE__ */ React.createElement(FF, { label: "JSA NUMBER" }, /* @__PURE__ */ React.createElement(FIn, { v: f.jsaNumber, u: u("jsaNumber"), ph: "JSA-0001" })), /* @__PURE__ */ React.createElement(FF, { label: "DATE" }, /* @__PURE__ */ React.createElement(FIn, { type: "date", v: f.date, u: u("date") })), /* @__PURE__ */ React.createElement(FF, { label: "OVERALL RISK LEVEL" }, /* @__PURE__ */ React.createElement("select", { value: f.riskLevel, onChange: u("riskLevel"), style: { ...iS, borderColor: riskColor, fontWeight: 700, color: riskColor } }, JSA_RISK.map((r) => /* @__PURE__ */ React.createElement("option", { key: r, value: r }, r)))), /* @__PURE__ */ React.createElement(FF, { label: "STATUS" }, /* @__PURE__ */ React.createElement(FSel, { v: f.status, u: u("status"), opts: JSA_STATUS })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Task and Location"), /* @__PURE__ */ React.createElement(FF, { label: "LOCATION / AREA", full: true }, /* @__PURE__ */ React.createElement(FIn, { v: f.location, u: u("location"), ph: "e.g. Level 3 - Grid B4 - Mechanical Room" })), /* @__PURE__ */ React.createElement(FF, { label: "TASK / WORK DESCRIPTION", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.taskDescription, u: u("taskDescription"), rows: 2 })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Personnel"), /* @__PURE__ */ React.createElement(FF, { label: "SUPERVISOR / FOREMAN" }, /* @__PURE__ */ React.createElement(FIn, { v: f.supervisor, u: u("supervisor") })), /* @__PURE__ */ React.createElement(FF, { label: "COMPANY" }, /* @__PURE__ */ React.createElement(FIn, { v: f.company, u: u("company") })), /* @__PURE__ */ React.createElement(FF, { label: "CREW MEMBERS", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.crew, u: u("crew"), rows: 2 })), /* @__PURE__ */ React.createElement("div", { style: { ...secStyle, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", null, "Step-by-Step Hazard Analysis"), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setShowTemplates((v) => !v), style: { ...S.btnS, padding: "2px 10px", fontSize: 10, color: "#FF8A00", border: "1px solid rgba(255,138,0,0.4)" } }, "Load Template")), showTemplates && /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1", display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 } }, Object.keys(TEMPLATES).map((name) => /* @__PURE__ */ React.createElement("button", { key: name, onClick: () => jsaLoadTemplate(name), style: { ...S.btnS, padding: "5px 12px", fontSize: 11, color: "#FF8A00", border: "1px solid rgba(255,138,0,0.4)" } }, name))), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "28px 1fr 1fr 1fr 80px 28px", gap: 6, marginBottom: 6, padding: "0 4px" } }, ["#", "Task Step", "Hazards Identified", "Controls / Mitigation", "Risk", ""].map((h) => /* @__PURE__ */ React.createElement("div", { key: h, style: { fontSize: 9, fontWeight: 700, color: "rgba(255,138,0,0.7)", letterSpacing: 0.8, textTransform: "uppercase" } }, h))), f.steps.map((step, i) => {
          const rc = { Low: "#10b981", Medium: "#f59e0b", High: "#ef4444" }[step.risk] || "#f59e0b";
          return /* @__PURE__ */ React.createElement("div", { key: step.id, style: { display: "grid", gridTemplateColumns: "28px 1fr 1fr 1fr 80px 28px", gap: 6, marginBottom: 8, alignItems: "start", padding: "8px", background: dark ? "rgba(255,255,255,0.02)" : "#f8fafc", borderRadius: 8, border: "1px solid " + (dark ? "rgba(255,255,255,0.05)" : "#e2e8f0") } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#FF8A00", fontFamily: "monospace", paddingTop: 6, textAlign: "center" } }, i + 1), /* @__PURE__ */ React.createElement("textarea", { defaultValue: step.step, onBlur: (e) => updateStep(step.id, "step", e.target.value), rows: 2, placeholder: "Describe the task step...", style: { ...iS, resize: "vertical", fontSize: 11 } }), /* @__PURE__ */ React.createElement("textarea", { defaultValue: step.hazards, onBlur: (e) => updateStep(step.id, "hazards", e.target.value), rows: 2, placeholder: "What could go wrong?", style: { ...iS, resize: "vertical", fontSize: 11, borderColor: "rgba(239,68,68,0.3)" } }), /* @__PURE__ */ React.createElement("textarea", { defaultValue: step.controls, onBlur: (e) => updateStep(step.id, "controls", e.target.value), rows: 2, placeholder: "How will we prevent it?", style: { ...iS, resize: "vertical", fontSize: 11, borderColor: "rgba(16,185,129,0.3)" } }), /* @__PURE__ */ React.createElement("select", { value: step.risk || "Medium", onChange: (e) => updateStep(step.id, "risk", e.target.value), style: { ...iS, fontSize: 11, fontWeight: 700, color: rc, borderColor: rc + "88", padding: "5px 6px" } }, /* @__PURE__ */ React.createElement("option", { value: "Low" }, "Low"), /* @__PURE__ */ React.createElement("option", { value: "Medium" }, "Medium"), /* @__PURE__ */ React.createElement("option", { value: "High" }, "High")), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => removeStep(step.id), style: { width: 24, height: 24, borderRadius: 4, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4 } }, "x"));
        }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: addStep, style: { ...S.btnS, width: "100%", fontSize: 11, padding: "7px 0" } }, "+ Add Step")), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "PPE Required"), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 6 } }, PPE_OPTIONS.map((item) => /* @__PURE__ */ React.createElement("label", { key: item, style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 7, border: "1px solid " + (ppeChecked[item] ? "#FF8A00" : dark ? "#2a3150" : "#e2e8f0"), background: ppeChecked[item] ? dark ? "rgba(255,138,0,0.1)" : "#fff8f0" : dark ? "#0f1117" : "#f8fafc", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: !!ppeChecked[item], onChange: () => togglePpe(item), style: { accentColor: "#FF8A00", width: 14, height: 14 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: ppeChecked[item] ? 700 : 400, color: ppeChecked[item] ? "#FF8A00" : dark ? "#94a3b8" : "#475569" } }, item)))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 10, ...S.text3 } }, "Selected: ", f.ppeRequired || "None")), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Emergency Procedures"), /* @__PURE__ */ React.createElement(FF, { label: "EMERGENCY RESPONSE PLAN", full: true }, /* @__PURE__ */ React.createElement("textarea", { defaultValue: f.emergency || "", onBlur: u("emergency"), rows: 3, style: { ...iS, resize: "vertical", borderColor: "rgba(239,68,68,0.3)" } })), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Crew Sign-On"), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 10 } }, "Each crew member signs on at the start of shift confirming they are fit for duty and aware of site hazards."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { defaultValue: newSignonName, onBlur: (e) => setNewSignonName(e.target.value), placeholder: "Type full name to sign on", style: { ...iS, flex: 1 }, onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addSignon();
          }
        } }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: addSignon, style: { ...S.btnP, padding: "7px 16px", fontSize: 12 } }, "Sign On")), f.crewSignons.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8, marginBottom: 8 } }, f.crewSignons.map((sig, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "8px 12px", background: dark ? "rgba(59,130,246,0.08)" : "#eff6ff", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#3b82f6" } }, sig.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, marginTop: 2 } }, "Signed on: ", sig.signedAt)), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => removeSignon(i), style: { background: "none", border: "none", color: "rgba(255,255,255,0.25)", cursor: "pointer", fontSize: 12, padding: 0 } }, "x")))), f.crewSignons.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 8 } }, "No sign-ons yet.")), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Crew Sign-Off"), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 10 } }, "Each crew member confirms they have read, understood, and will comply with this JSA."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { defaultValue: newSigName, onBlur: (e) => setNewSigName(e.target.value), placeholder: "Type full name to sign off", style: { ...iS, flex: 1 }, onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addSignoff();
          }
        } }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: addSignoff, style: { ...S.btnP, padding: "7px 16px", fontSize: 12 } }, "Sign")), f.crewSignoffs.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8 } }, f.crewSignoffs.map((sig, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "8px 12px", background: dark ? "rgba(16,185,129,0.08)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#10b981" } }, sig.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, marginTop: 2 } }, sig.signedAt)), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => removeSignoff(i), style: { background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 12, padding: 0 } }, "x")))), f.crewSignoffs.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, "No signatures yet.")), /* @__PURE__ */ React.createElement("div", { style: secStyle }, "Review"), /* @__PURE__ */ React.createElement(FF, { label: "REVIEWED BY (Superintendent / Safety Officer)" }, /* @__PURE__ */ React.createElement(FIn, { v: f.reviewedBy, u: u("reviewedBy") })), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement(FF, { label: "ADDITIONAL NOTES", full: true }, /* @__PURE__ */ React.createElement(FTA, { v: f.notes, u: u("notes") }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 18, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid2() }), style: { ...S.btnP, background: "linear-gradient(135deg,#FF8A00,#cc6a00)" } }, "Save JSA")));
      }
      var SCFG = {
        safetyinsp: { icon: "\u{1F50D}", label: "Safety Inspections", color: "#10b981", csv: ["projectId", "date", "number", "type", "location", "inspector", "company", "findings", "violations", "correctiveActions", "dueDate", "status", "notes"], cols: [{ k: "number", l: "INSP #" }, { k: "date", l: "DATE" }, { k: "type", l: "TYPE" }, { k: "location", l: "LOCATION" }, { k: "inspector", l: "INSPECTOR" }, { k: "company", l: "COMPANY" }, { k: "findings", l: "FINDINGS" }, { k: "violations", l: "VIOLATIONS" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }, { k: "documentUrl", l: "LINK" }], fields: [{ k: "number", l: "INSPECTION #", t: "text", ph: "SINSP-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "type", l: "TYPE", t: "sel", opts: ["General Safety", "Fire Safety", "Fall Protection", "Electrical", "PPE", "Equipment", "Scaffolding", "OSHA Compliance", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Open", "In Progress", "Passed", "Failed", "Closed"], f: false }, { k: "location", l: "LOCATION / AREA", t: "text", f: true }, { k: "inspector", l: "INSPECTOR", t: "text", f: false }, { k: "company", l: "COMPANY", t: "text", f: false }, { k: "findings", l: "FINDINGS", t: "ta", rows: 3, f: true }, { k: "violations", l: "VIOLATIONS", t: "ta", rows: 2, f: true }, { k: "correctiveActions", l: "CORRECTIVE ACTIONS", t: "ta", rows: 2, f: true }, { k: "dueDate", l: "DUE DATE", t: "date", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        safetyobs: { icon: "\u{1F441}", label: "Safety Observations", color: "#f59e0b", csv: ["projectId", "date", "number", "type", "location", "observer", "company", "description", "actionTaken", "status", "notes"], cols: [{ k: "number", l: "OBS #" }, { k: "date", l: "DATE" }, { k: "type", l: "TYPE" }, { k: "location", l: "LOCATION" }, { k: "observer", l: "OBSERVER" }, { k: "company", l: "COMPANY" }, { k: "description", l: "DESCRIPTION" }, { k: "actionTaken", l: "ACTION TAKEN" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "OBS #", t: "text", ph: "SOBS-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "type", l: "TYPE", t: "sel", opts: ["Safe Act", "At-Risk Behavior", "Unsafe Condition", "Near Miss", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Open", "Acknowledged", "Resolved", "Closed"], f: false }, { k: "location", l: "LOCATION", t: "text", f: true }, { k: "observer", l: "OBSERVED BY", t: "text", f: false }, { k: "company", l: "COMPANY", t: "text", f: false }, { k: "description", l: "DESCRIPTION", t: "ta", rows: 3, f: true }, { k: "actionTaken", l: "ACTION TAKEN", t: "ta", rows: 2, f: true }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        safetyforms: { icon: "\u{1F4DD}", label: "Safety Forms", color: "#6366f1", csv: ["projectId", "date", "number", "formType", "title", "completedBy", "company", "status", "notes"], cols: [{ k: "number", l: "FORM #" }, { k: "date", l: "DATE" }, { k: "formType", l: "TYPE" }, { k: "title", l: "TITLE" }, { k: "completedBy", l: "COMPLETED BY" }, { k: "company", l: "COMPANY" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "FORM #", t: "text", ph: "SFRM-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "formType", l: "FORM TYPE", t: "sel", opts: ["Toolbox Talk", "Incident Report", "Near Miss", "Hot Work Permit", "Confined Space Permit", "LOTO", "First Aid Report", "Safety Meeting Minutes", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Draft", "Submitted", "Approved", "On File"], f: false }, { k: "title", l: "TITLE", t: "text", ph: "e.g. Fall Protection Toolbox Talk", f: true }, { k: "completedBy", l: "COMPLETED BY", t: "text", f: false }, { k: "company", l: "COMPANY", t: "text", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 3, f: true }, { k: "documentUrl", l: "DOCUMENT LINK", t: "url", ph: "https://", f: true }] },
        qualityinsp: { icon: "\u2705", label: "Quality Inspections", color: "#3b82f6", csv: ["projectId", "date", "number", "type", "location", "inspector", "trade", "specSection", "result", "deficiencies", "correctiveActions", "dueDate", "status", "notes"], cols: [{ k: "number", l: "INSP #" }, { k: "date", l: "DATE" }, { k: "type", l: "TYPE" }, { k: "location", l: "LOCATION" }, { k: "inspector", l: "INSPECTOR" }, { k: "trade", l: "TRADE" }, { k: "specSection", l: "SPEC" }, { k: "result", l: "RESULT" }, { k: "deficiencies", l: "DEFICIENCIES" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "INSPECTION #", t: "text", ph: "QINSP-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "type", l: "TYPE", t: "sel", opts: ["In-Process", "Pre-Installation", "Final", "Mock-Up", "Special Inspection", "Third Party", "Concrete Pour", "Weld", "Waterproofing", "MEP Rough-In", "Other"], f: false }, { k: "result", l: "RESULT", t: "sel", opts: ["Pass", "Fail", "Conditional Pass", "Pending"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Open", "Closed", "Approved", "Rejected"], f: false }, { k: "location", l: "LOCATION", t: "text", f: true }, { k: "inspector", l: "INSPECTOR", t: "text", f: false }, { k: "trade", l: "TRADE", t: "text", f: false }, { k: "specSection", l: "SPEC SECTION", t: "text", ph: "e.g. 03300", f: false }, { k: "deficiencies", l: "DEFICIENCIES", t: "ta", rows: 3, f: true }, { k: "correctiveActions", l: "CORRECTIVE ACTIONS", t: "ta", rows: 2, f: true }, { k: "dueDate", l: "DUE DATE", t: "date", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        qualityobs: { icon: "\u{1F50E}", label: "Quality Observations", color: "#8b5cf6", csv: ["projectId", "date", "number", "type", "location", "observer", "trade", "description", "actionRequired", "dueDate", "status", "notes"], cols: [{ k: "number", l: "OBS #" }, { k: "date", l: "DATE" }, { k: "type", l: "TYPE" }, { k: "location", l: "LOCATION" }, { k: "observer", l: "OBSERVER" }, { k: "trade", l: "TRADE" }, { k: "description", l: "DESCRIPTION" }, { k: "actionRequired", l: "ACTION REQUIRED" }, { k: "dueDate", l: "DUE" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "OBS #", t: "text", ph: "QOBS-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "type", l: "TYPE", t: "sel", opts: ["Deficiency", "Non-Conformance", "Best Practice", "Rework Required", "Hold Point", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Open", "In Progress", "Resolved", "Closed"], f: false }, { k: "location", l: "LOCATION", t: "text", f: true }, { k: "observer", l: "OBSERVED BY", t: "text", f: false }, { k: "trade", l: "TRADE", t: "text", f: false }, { k: "description", l: "DESCRIPTION", t: "ta", rows: 3, f: true }, { k: "actionRequired", l: "ACTION REQUIRED", t: "ta", rows: 2, f: true }, { k: "dueDate", l: "DUE DATE", t: "date", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        qualityforms: { icon: "\u{1F4CB}", label: "Quality Forms", color: "#06b6d4", csv: ["projectId", "date", "number", "formType", "title", "specSection", "preparedBy", "approvedBy", "status", "notes"], cols: [{ k: "number", l: "FORM #" }, { k: "date", l: "DATE" }, { k: "formType", l: "TYPE" }, { k: "title", l: "TITLE" }, { k: "specSection", l: "SPEC" }, { k: "preparedBy", l: "PREPARED BY" }, { k: "approvedBy", l: "APPROVED BY" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "FORM #", t: "text", ph: "QFRM-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "formType", l: "FORM TYPE", t: "sel", opts: ["Mock-Up Approval", "Material Approval", "Test Report", "NCR", "Corrective Action", "Concrete Test", "Commissioning", "Warranty", "As-Built", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Draft", "Under Review", "Approved", "Rejected", "On File"], f: false }, { k: "title", l: "TITLE", t: "text", ph: "e.g. Concrete Mix Design Approval", f: true }, { k: "specSection", l: "SPEC SECTION", t: "text", ph: "e.g. 03300", f: false }, { k: "preparedBy", l: "PREPARED BY", t: "text", f: false }, { k: "approvedBy", l: "APPROVED BY", t: "text", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 3, f: true }] },
        projdocs: { icon: "\u{1F5C2}", label: "Project Documents", color: "#64748b", csv: ["projectId", "date", "number", "docType", "title", "revision", "author", "company", "status", "notes"], cols: [{ k: "number", l: "DOC #" }, { k: "date", l: "DATE" }, { k: "docType", l: "TYPE" }, { k: "title", l: "TITLE" }, { k: "revision", l: "REV" }, { k: "author", l: "AUTHOR" }, { k: "company", l: "COMPANY" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "DOC #", t: "text", ph: "DOC-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "docType", l: "DOCUMENT TYPE", t: "sel", opts: ["Drawing", "Specification", "Contract", "Change Order", "Meeting Minutes", "Transmittal", "Letter", "Report", "Permit", "Warranty", "As-Built", "Shop Drawing", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Current", "Under Review", "Approved", "Superseded", "Archived"], f: false }, { k: "title", l: "TITLE", t: "text", ph: "e.g. Structural Foundation Drawings", f: true }, { k: "revision", l: "REVISION", t: "text", ph: "Rev B", f: false }, { k: "author", l: "AUTHOR", t: "text", f: false }, { k: "company", l: "COMPANY", t: "text", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }, { k: "documentUrl", l: "DOCUMENT LINK", t: "url", ph: "https://", f: true }] },
        projdir: { icon: "\u{1F4D2}", label: "Project Directory", color: "#0891b2", csv: ["projectId", "name", "title", "company", "role", "phone", "mobile", "email", "license", "notes"], cols: [{ k: "name", l: "NAME" }, { k: "title", l: "TITLE" }, { k: "company", l: "COMPANY" }, { k: "role", l: "ROLE" }, { k: "phone", l: "PHONE" }, { k: "mobile", l: "MOBILE" }, { k: "email", l: "EMAIL" }, { k: "license", l: "LICENSE" }, { k: "notes", l: "NOTES" }], fields: [{ k: "name", l: "FULL NAME", t: "text", ph: "John Smith", f: false }, { k: "title", l: "JOB TITLE", t: "text", ph: "Project Manager", f: false }, { k: "company", l: "COMPANY", t: "text", f: false }, { k: "role", l: "ROLE", t: "sel", opts: ["Owner", "Owner Rep", "Architect", "Engineer", "General Contractor", "Superintendent", "Subcontractor", "Supplier", "Inspector", "Authority Having Jurisdiction", "Other"], f: false }, { k: "phone", l: "OFFICE PHONE", t: "text", ph: "(555) 000-0000", f: false }, { k: "mobile", l: "MOBILE", t: "text", ph: "(555) 000-0000", f: false }, { k: "email", l: "EMAIL", t: "text", ph: "name@company.com", f: true }, { k: "license", l: "LICENSE / CERT #", t: "text", f: true }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        projspecs: { icon: "\u{1F4D0}", label: "Project Specifications", color: "#7c3aed", csv: ["projectId", "specSection", "division", "title", "trade", "revision", "approvedProduct", "manufacturer", "substitutionStatus", "status", "notes"], cols: [{ k: "specSection", l: "SPEC" }, { k: "title", l: "TITLE" }, { k: "trade", l: "TRADE" }, { k: "revision", l: "REV" }, { k: "approvedProduct", l: "APPROVED PRODUCT" }, { k: "manufacturer", l: "MANUFACTURER" }, { k: "substitutionStatus", l: "SUBSTITUTION" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "specSection", l: "SPEC SECTION #", t: "text", ph: "e.g. 03300", f: false }, { k: "division", l: "DIVISION", t: "sel", opts: ["Div 01 - General", "Div 03 - Concrete", "Div 04 - Masonry", "Div 05 - Metals", "Div 06 - Wood", "Div 07 - Thermal", "Div 08 - Openings", "Div 09 - Finishes", "Div 22 - Plumbing", "Div 23 - HVAC", "Div 26 - Electrical", "Div 31 - Earthwork", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Pending", "Approved", "Approved as Noted", "Rejected", "Superseded"], f: false }, { k: "title", l: "TITLE", t: "text", ph: "e.g. Cast-in-Place Concrete", f: true }, { k: "trade", l: "TRADE", t: "text", f: false }, { k: "revision", l: "REVISION", t: "text", ph: "Rev A", f: false }, { k: "approvedProduct", l: "APPROVED PRODUCT", t: "text", f: true }, { k: "manufacturer", l: "MANUFACTURER", t: "text", f: false }, { k: "substitutionStatus", l: "SUBSTITUTION STATUS", t: "sel", opts: ["N/A", "Requested", "Approved", "Rejected"], f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        purchaseorders: { icon: "\u{1F4CB}", label: "Purchase Orders", color: "#8b5cf6", csv: ["projectId", "date", "poNumber", "vendor", "description", "amount", "status", "deliveryDate", "documentUrl", "notes"], cols: [{ k: "poNumber", l: "PO #" }, { k: "date", l: "DATE" }, { k: "vendor", l: "VENDOR" }, { k: "description", l: "DESCRIPTION" }, { k: "amount", l: "AMOUNT" }, { k: "status", l: "STATUS" }, { k: "deliveryDate", l: "DELIVERY" }, { k: "documentUrl", l: "LINK" }], fields: [{ k: "poNumber", l: "PO NUMBER", t: "text", ph: "PO-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "vendor", l: "VENDOR", t: "text", ph: "Vendor name", f: false }, { k: "description", l: "DESCRIPTION", t: "text", ph: "Material or service description", f: true }, { k: "amount", l: "AMOUNT ($)", t: "number", ph: "0.00", f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Draft", "Submitted", "Approved", "Ordered", "Partial Delivery", "Delivered", "Cancelled", "On Hold"], f: false }, { k: "deliveryDate", l: "EXPECTED DELIVERY", t: "date", f: false }, { k: "documentUrl", l: "DOCUMENT LINK", t: "url", ph: "https://", f: true }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        changeorders: { icon: "\u{1F504}", label: "Change Orders", color: "#06b6d4", csv: ["projectId", "date", "coNumber", "type", "title", "amount", "submittedBy", "company", "status", "approvedDate", "notes"], cols: [{ k: "coNumber", l: "CO #" }, { k: "date", l: "DATE" }, { k: "type", l: "TYPE" }, { k: "title", l: "TITLE" }, { k: "amount", l: "AMOUNT" }, { k: "submittedBy", l: "BY" }, { k: "company", l: "COMPANY" }, { k: "status", l: "STATUS" }, { k: "approvedDate", l: "APPROVED" }, { k: "notes", l: "NOTES" }], fields: [{ k: "coNumber", l: "CO NUMBER", t: "text", ph: "CO-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "type", l: "TYPE", t: "sel", opts: ["Owner Change Order", "Subcontractor CO", "PCO", "RFP", "Bulletin", "Force Account", "Claim", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Pending", "Under Review", "Approved", "Rejected", "Executed", "On Hold", "Closed"], f: false }, { k: "title", l: "TITLE", t: "text", ph: "e.g. Add Emergency Lighting Level 3", f: true }, { k: "amount", l: "AMOUNT ($)", t: "number", ph: "0.00", f: false }, { k: "submittedBy", l: "SUBMITTED BY", t: "text", f: false }, { k: "company", l: "COMPANY", t: "text", f: false }, { k: "approvedDate", l: "APPROVED DATE", t: "date", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 3, f: true }, { k: "sharedExternal", l: "VISIBILITY", t: "sel", opts: ["Internal", "External"], f: false }] },
        drawings: { icon: "\u{1F4DC}", label: "Drawings", color: "#0ea5e9", csv: ["projectId", "drawingNumber", "title", "discipline", "revision", "date", "status", "issuedBy", "issuedTo", "scale", "sheetSize", "fileName", "notes", "documentUrl"], cols: [{ k: "drawingNumber", l: "DWG #" }, { k: "title", l: "TITLE" }, { k: "discipline", l: "DISCIPLINE" }, { k: "revision", l: "REV" }, { k: "date", l: "DATE" }, { k: "status", l: "STATUS" }, { k: "issuedBy", l: "ISSUED BY" }, { k: "issuedTo", l: "ISSUED TO" }, { k: "fileName", l: "FILE NAME" }, { k: "notes", l: "NOTES" }], fields: [{ k: "drawingNumber", l: "DRAWING NUMBER", t: "text", ph: "A-101", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "discipline", l: "DISCIPLINE", t: "sel", opts: ["Architectural", "Structural", "Civil", "Mechanical", "Electrical", "Plumbing", "Fire Protection", "Landscape", "Survey", "Geotechnical", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Issued for Construction", "Issued for Bid", "Issued for Review", "For Record Only", "Superseded", "Void", "As-Built"], f: false }, { k: "title", l: "DRAWING TITLE", t: "text", ph: "e.g. Floor Plan - Level 1", f: true }, { k: "revision", l: "REVISION", t: "text", ph: "e.g. Rev 0, Rev A", f: false }, { k: "scale", l: "SCALE", t: "text", ph: "e.g. 1/4 inch = 1 ft", f: false }, { k: "sheetSize", l: "SHEET SIZE", t: "sel", opts: ["ARCH D (24x36)", "ARCH E (30x42)", "ARCH E1 (30x42)", "ANSI D (22x34)", "ANSI E (34x44)", "11x17", "8.5x11", "Other"], f: false }, { k: "issuedBy", l: "ISSUED BY", t: "text", ph: "Architect / Engineer firm", f: false }, { k: "issuedTo", l: "ISSUED TO", t: "text", ph: "GC / Subcontractor", f: false }, { k: "fileName", l: "FILE NAME / LOCATION", t: "text", ph: "e.g. A-101_FloorPlan_Rev0.pdf", f: true }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] },
        projforms: { icon: "\u{1F5C3}", label: "Project Forms", color: "#FF8A00", csv: ["projectId", "date", "number", "formType", "title", "amount", "submittedBy", "company", "status", "dueDate", "notes"], cols: [{ k: "number", l: "FORM #" }, { k: "date", l: "DATE" }, { k: "formType", l: "TYPE" }, { k: "title", l: "TITLE" }, { k: "amount", l: "AMOUNT" }, { k: "submittedBy", l: "SUBMITTED BY" }, { k: "company", l: "COMPANY" }, { k: "dueDate", l: "DUE" }, { k: "status", l: "STATUS" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "FORM #", t: "text", ph: "PCO-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "formType", l: "FORM TYPE", t: "sel", opts: ["Change Order", "PCO", "Request for Change", "T&M Ticket", "Field Directive", "Bulletin", "Notice to Proceed", "Delay Notice", "Claim Notice", "Backcharge", "Lien Waiver", "Payment Application", "Work Authorization", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Draft", "Submitted", "Under Review", "Approved", "Rejected", "Executed", "Closed"], f: false }, { k: "title", l: "TITLE", t: "text", ph: "e.g. Add Electrical Circuits Level 3", f: true }, { k: "amount", l: "AMOUNT ($)", t: "number", ph: "0.00", f: false }, { k: "submittedBy", l: "SUBMITTED BY", t: "text", f: false }, { k: "company", l: "COMPANY", t: "text", f: false }, { k: "dueDate", l: "RESPONSE DUE", t: "date", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 3, f: true }] },
        meetings: { icon: "\u{1F5E3}", label: "Meetings", color: "#FF8A00", csv: ["projectId", "date", "number", "type", "location", "attendees", "teamsLink", "agenda", "discussionNotes", "actionItemsNoted", "nextMeetingDate", "status", "notes"], cols: [{ k: "number", l: "MTG #" }, { k: "date", l: "DATE" }, { k: "type", l: "TYPE" }, { k: "location", l: "LOCATION" }, { k: "attendees", l: "ATTENDEES" }, { k: "teamsLink", l: "TEAMS LINK" }, { k: "status", l: "STATUS" }, { k: "nextMeetingDate", l: "NEXT MTG" }, { k: "notes", l: "NOTES" }], fields: [{ k: "number", l: "MEETING #", t: "text", ph: "MTG-001", f: false }, { k: "date", l: "DATE", t: "date", f: false }, { k: "type", l: "TYPE", t: "sel", opts: ["OAC (Owner/Architect/Contractor)", "Coordination", "Safety", "Pull Plan / Last Planner", "Pre-Construction", "Subcontractor", "Progress", "Other"], f: false }, { k: "status", l: "STATUS", t: "sel", opts: ["Scheduled", "Completed", "Cancelled"], f: false }, { k: "location", l: "LOCATION", t: "text", ph: "e.g. Site Trailer, Zoom", f: false }, { k: "attendees", l: "ATTENDEES", t: "ta", rows: 2, ph: "Names and companies", f: true }, { k: "teamsLink", l: "TEAMS MEETING LINK", t: "text", ph: "https://teams.microsoft.com/l/meetup-join/", f: false }, { k: "agenda", l: "AGENDA", t: "ta", rows: 3, f: true }, { k: "discussionNotes", l: "DISCUSSION NOTES / MINUTES", t: "ta", rows: 5, f: true }, { k: "actionItemsNoted", l: "ACTION ITEMS NOTED", t: "ta", rows: 3, ph: "What needs follow-up \u2014 track these on the Action Items page", f: true }, { k: "nextMeetingDate", l: "NEXT MEETING DATE", t: "date", f: false }, { k: "notes", l: "NOTES", t: "ta", rows: 2, f: true }] }
      };
      function NewSecTab({ tab: tab2, data, S, darkMode, pN, filt, exp, openAdd, openEdit, showToast, setData, selProj }) {
        const cfg = SCFG[tab2];
        if (!cfg) return null;
        const rows = filt(data);
        const iRef = React.useRef();
        function doImport(e) {
          const f = e.target.files[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = function(ev) {
            try {
              const ls = ev.target.result.trim().split(/\r?\n/);
              const hs = ls[0].split(",").map(function(h) {
                return h.trim().replace(/^"|"$/g, "");
              });
              const rows2 = ls.slice(1).map(function(line) {
                const vs = [];
                let cur = "", q = false;
                for (let i = 0; i < line.length; i++) {
                  const c = line[i];
                  if (c === '"') q = !q;
                  else if (c === "," && !q) {
                    vs.push(cur);
                    cur = "";
                  } else cur += c;
                }
                vs.push(cur);
                const o = { id: uid() };
                hs.forEach(function(h, i) {
                  o[h] = (vs[i] || "").replace(/^"|"$/g, "");
                });
                if (o.projectId) o.projectId = Number(o.projectId);
                return o;
              }).filter(function(o) {
                return Object.values(o).some(function(v) {
                  return v;
                });
              });
              if (setData) setData((l) => [...l, ...rows2]);
              showToast(rows2.length + " imported");
            } catch (err) {
              showToast("Import failed", "error");
            }
          };
          r.readAsText(f);
          e.target.value = "";
        }
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 22 } }, cfg.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700 } }, cfg.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, rows.length, " record", rows.length !== 1 ? "s" : ""))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("label", { style: { ...S.btnS, display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer", padding: "8px 13px", borderRadius: 8, fontSize: 13 } }, "\u2B06 Import CSV", /* @__PURE__ */ React.createElement("input", { ref: iRef, type: "file", accept: ".csv", style: { display: "none" }, onChange: doImport })), /* @__PURE__ */ React.createElement("button", { onClick: () => exp(rows, cfg.csv, tab2 + "_export"), style: S.btnS }, "\u2B07 Export CSV"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd(tab2), style: { ...S.btnP, background: cfg.color } }, "+ New"))), tab2 === "projdir" && rows.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10, marginBottom: 14 } }, rows.map((row) => /* @__PURE__ */ React.createElement("div", { key: row.id, style: { ...S.card, padding: "13px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, ...S.text } }, row.name || "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, row.title || "", row.title && row.company ? " \xB7 " : "", row.company || "")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: darkMode ? "rgba(96,165,250,0.12)" : "#eff6ff", color: "#3b82f6", flexShrink: 0 } }, row.role || "\u2014")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } }, row.mobile && /* @__PURE__ */ React.createElement("a", { href: "tel:" + row.mobile, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#10b981", fontWeight: 600, textDecoration: "none", padding: "5px 8px", background: darkMode ? "rgba(16,185,129,0.08)" : "#f0fdf4", borderRadius: 6 } }, "Mobile: ", row.mobile), row.phone && /* @__PURE__ */ React.createElement("a", { href: "tel:" + row.phone, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#60a5fa", textDecoration: "none", padding: "5px 8px", background: darkMode ? "rgba(96,165,250,0.08)" : "#eff6ff", borderRadius: 6 } }, "Office: ", row.phone), row.email && /* @__PURE__ */ React.createElement("a", { href: "mailto:" + row.email, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#818cf8", textDecoration: "none", padding: "5px 8px", background: darkMode ? "rgba(129,140,248,0.08)" : "#f5f3ff", borderRadius: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, "Email: ", row.email)), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit(tab2, row), style: { background: darkMode ? "#1e2940" : "#e0e7ff", border: "none", color: "#60a5fa", padding: "3px 9px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Edit"))))), rows.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "44px 20px", ...S.text3, borderRadius: 13, border: `1px dashed ${darkMode ? "#2a3150" : "#e2e8f0"}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 30, marginBottom: 8 } }, cfg.icon), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, ...S.text, marginBottom: 8 } }, "No ", cfg.label, " yet"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd(tab2), style: { ...S.btnP, background: cfg.color } }, "+ Add First")) : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, /* @__PURE__ */ React.createElement("th", { style: { padding: "9px 12px", textAlign: "left", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 9 } }, "PROJECT"), cfg.cols.map((c) => /* @__PURE__ */ React.createElement("th", { key: c.k, style: { padding: "9px 12px", textAlign: "left", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 9, whiteSpace: "nowrap" } }, c.l)), /* @__PURE__ */ React.createElement("th", { style: { padding: "9px 12px", color: darkMode ? "#4a5580" : "#64748b", fontWeight: 700, fontSize: 9 } }, "ACTIONS"))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((row) => /* @__PURE__ */ React.createElement(
          "tr",
          {
            key: row.id,
            style: S.tRow,
            onMouseEnter: (e) => e.currentTarget.style.background = darkMode ? "#1a1f2e" : "#f8fafc",
            onMouseLeave: (e) => e.currentTarget.style.background = ""
          },
          /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", fontSize: 11 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#60a5fa", fontWeight: 600 } }, pN(row.projectId))),
          cfg.cols.map((c) => /* @__PURE__ */ React.createElement("td", { key: c.k, style: { padding: "8px 12px", ...S.text2, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 11 } }, (() => {
            const v = row[c.k];
            if (!v) return "\u2014";
            if (typeof v === "string" && (v.startsWith("http://") || v.startsWith("https://"))) return /* @__PURE__ */ React.createElement("a", { href: v, target: "_blank", rel: "noreferrer", onClick: (e) => e.stopPropagation(), style: { color: "#3b82f6", fontSize: 11, textDecoration: "none", fontWeight: 600 } }, "Open");
            return v;
          })())),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit(tab2, row), style: { background: darkMode ? "#1e2940" : "#e0e7ff", border: "none", color: "#60a5fa", padding: "4px 9px", borderRadius: 5, cursor: "pointer", fontSize: 10 } }, "Edit")))
        )))))));
      }
      function SForm({ iS, S, projects, initial, onSave, onCancel, tab: tab2 }) {
        const cfg = SCFG[tab2];
        if (!cfg) return null;
        const dark = document.body.classList.contains("dark");
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const defs = { projectId: projects[0] && projects[0].id || "", date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] };
        (cfg.fields || []).forEach((fd) => {
          if (defs[fd.k] === void 0) defs[fd.k] = "";
        });
        const [f, sf] = useState({ ...defs, ...initial });
        const u = (k) => (e) => sf((p) => ({ ...p, [k]: e.target.value }));
        const lb = { fontSize: 10, color: dark ? "#4a5580" : "#64748b", fontWeight: 700, marginBottom: 3, display: "block", letterSpacing: 0.6 };
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", null, cfg.icon), f.id ? "Edit" : "New", " ", cfg.label), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("label", { style: lb }, "PROJECT"), /* @__PURE__ */ React.createElement("select", { value: f.projectId || "", onChange: u("projectId"), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Select Project"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), (cfg.fields || []).map((fd) => /* @__PURE__ */ React.createElement("div", { key: fd.k, style: { gridColumn: fd.f ? "1/-1" : "auto" } }, /* @__PURE__ */ React.createElement("label", { style: lb }, fd.l), fd.t === "sel" ? /* @__PURE__ */ React.createElement("select", { value: f[fd.k] || "", onChange: u(fd.k), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Select"), (fd.opts || []).map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o))) : fd.t === "ta" ? /* @__PURE__ */ React.createElement("textarea", { defaultValue: f[fd.k] || "", onBlur: u(fd.k), rows: fd.rows || 2, placeholder: fd.ph || "", style: { ...iS, resize: "vertical" } }) : /* @__PURE__ */ React.createElement("input", { type: fd.t || "text", value: f[fd.k] || "", onChange: u(fd.k), placeholder: fd.ph || "", style: iS })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: () => onSave({ ...f, projectId: Number(f.projectId), id: f.id || uid2() }), style: S.btnP }, "Save")));
      }
      function exportAllData(store) {
        const j = JSON.stringify(store, null, 2);
        const b = new Blob([j], { type: "application/json" });
        const u = URL.createObjectURL(b);
        const a = document.createElement("a");
        a.href = u;
        a.download = "KoDox_Backup_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".json";
        a.click();
        URL.revokeObjectURL(u);
      }
      function importAllData(file, cb) {
        const r = new FileReader();
        r.onload = (ev) => {
          try {
            cb(JSON.parse(ev.target.result));
          } catch (e) {
            alert("Invalid backup: " + e.message);
          }
        };
        r.readAsText(file);
      }
      function printDailyLog(log, projects, companyName2) {
        const pN = (id) => projects.find((p) => p.id === id)?.name || "\u2014";
        const co = companyName2 || "KoDox Systems LLC";
        const photos = log.photos || [];
        const photoHTML = photos.length ? photos.map((ph) => '<div style="display:inline-block;margin:4px;border-radius:5px;overflow:hidden;border:1px solid #e2e8f0;"><img src="' + ph.data + '" style="width:150px;height:110px;object-fit:cover;display:block;"/><div style="padding:2px 6px;font-size:9px;color:#6b7280;">' + ph.name + "</div></div>").join("") : "";
        const sec = (l, v, bc) => v ? '<div style="margin-bottom:10px;"><div style="font-size:9px;font-weight:700;color:#6b7280;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px;">' + l + '</div><div style="font-size:12px;line-height:1.5;padding:8px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;border-left:3px solid ' + (bc || "#1E5A8C") + ';">' + v + "</div></div>" : "";
        const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Daily Log ' + log.date + '</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;font-size:12px;color:#1c2333;}.np{display:block;}@media print{.np{display:none!important;}@page{margin:.4in;}}table{width:100%;border-collapse:collapse;}td,th{padding:6px 10px;border:1px solid #d1d8e0;font-size:11px;}th{background:#f0f4f7;font-weight:700;text-align:left;font-size:10px;text-transform:uppercase;}</style></head><body><div style="max-width:750px;margin:0 auto;padding:20px;"><div class="np" style="background:#1c2333;color:#e2e8f0;padding:9px 16px;border-radius:6px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;"><span style="font-weight:600;">Daily Log ' + log.date + '</span><div style="display:flex;gap:8px;"><button onclick="window.print()" style="background:#FF8A00;border:none;color:#fff;padding:6px 14px;border-radius:5px;cursor:pointer;font-weight:700;">Print/PDF</button><button onclick="window.close()" style="background:#374151;border:none;color:#e2e8f0;padding:6px 12px;border-radius:5px;cursor:pointer;">Close</button></div></div><div style="background:#1c2333;color:#fff;padding:16px 20px;border-radius:6px 6px 0 0;display:flex;justify-content:space-between;align-items:center;"><div><div style="font-size:10px;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">Daily Field Log</div><div style="font-size:20px;font-weight:700;">' + log.date + '</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">' + pN(log.projectId) + '</div></div><div style="text-align:right;"><div style="font-size:13px;font-weight:700;">' + co + "</div>" + (log.totalHoursDay ? '<div style="font-size:16px;font-weight:800;color:#FF8A00;">' + log.totalHoursDay + " Man-Hrs</div>" : "") + '</div></div><div style="height:3px;background:linear-gradient(90deg,#1E5A8C,#FF8A00,#1E5A8C);margin-bottom:16px;"></div><table style="margin-bottom:14px;"><tr><th>Weather</th><td>' + (log.weather || "\u2014") + " " + (log.tempLow || "") + "\u2014" + (log.tempHigh || "") + "F</td><th>Location</th><td>" + (log.location || "\u2014") + "</td></tr><tr><th>Superintendent</th><td>" + (log.superintendent || "\u2014") + "</td><th>Foreman</th><td>" + (log.foreman || "\u2014") + "</td></tr><tr><th>Company</th><td>" + (log.companyName || "\u2014") + "</td><th>Manpower</th><td>" + (log.manpower || "\u2014") + " workers x " + (log.hoursWorked || "\u2014") + " hrs = " + (log.totalHoursDay || "\u2014") + " man-hrs</td></tr></table>" + sec("Work Performed", log.workPerformed) + sec("Rental Equipment", log.rentalEquipUsed && log.rentalEquipUsed + (log.rentalHoursUsed ? " \xB7 " + log.rentalHoursUsed + " hrs" : "")) + sec("Delays / Issues", log.delays && log.delays !== "None" ? log.delays : null, "#ef4444") + sec("Visitors", log.visitors) + sec("Safety Notes", log.safety) + sec("Notes", log.notes) + (photos.length ? '<div style="margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0;"><div style="font-size:9px;font-weight:700;color:#6b7280;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">PHOTOS</div>' + photoHTML + "</div>" : "") + '<div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:20px;"><div style="border-top:1px solid #1c2333;padding-top:6px;font-size:10px;color:#6b7280;">Superintendent Signature / Date</div><div style="border-top:1px solid #1c2333;padding-top:6px;font-size:10px;color:#6b7280;">Reviewed By / Date</div></div><div style="margin-top:14px;border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;"><span>' + co + "</span><span>Daily Log \xB7 " + log.date + " \xB7 CONFIDENTIAL</span></div></div></body></html>";
        const w = window.open("", "_blank", "width=800,height=900");
        w.document.write(html);
        w.document.close();
      }
      function SettingsTab({ settings, setSettings, S, darkMode, allState, allSetters }) {
        const [s, ss2] = useState({ ...settings });
        const u = (k) => (e) => ss2((p) => ({ ...p, [k]: e.target.value }));
        const dark = darkMode;
        const iS2 = { background: dark ? "rgba(6,9,20,0.8)" : "#ffffff", border: dark ? "1px solid rgba(255,138,0,0.18)" : "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: dark ? "#f1f5f9" : "#0f172a", width: "100%", fontFamily: "Inter,sans-serif" };
        const lb = { fontSize: 10, color: dark ? "rgba(255,138,0,0.8)" : "#FF8A00", fontWeight: 700, marginBottom: 5, display: "block", letterSpacing: 1, textTransform: "uppercase" };
        const impRef = React.useRef();
        const [pwState, setPwState] = useState({ cur: "", n1: "", n2: "", msg: "" });
        function settingsDoImport(e) {
          const file = e.target.files[0];
          if (!file) return;
          if (!window.confirm("Replace ALL data with backup?")) return;
          importAllData(file, (data) => {
            if (allSetters) Object.entries(allSetters).forEach(([k, fn]) => {
              if (data[k] !== void 0) fn(data[k]);
            });
            alert("Restored!");
          });
          e.target.value = "";
        }
        function saveSettings() {
          setSettings(s);
          alert("Settings saved!");
        }
        function changePw() {
          const stored = localStorage.getItem("kodox_pw") || "kodox2026";
          if (pwState.cur !== stored) {
            setPwState((p) => ({ ...p, msg: "Current password incorrect." }));
            return;
          }
          if (!pwState.n1 || pwState.n1.length < 4) {
            setPwState((p) => ({ ...p, msg: "New password must be at least 4 characters." }));
            return;
          }
          if (pwState.n1 !== pwState.n2) {
            setPwState((p) => ({ ...p, msg: "New passwords do not match." }));
            return;
          }
          localStorage.setItem("kodox_pw", pwState.n1);
          setPwState({ cur: "", n1: "", n2: "", msg: "\u2705 Password updated successfully!" });
          setTimeout(() => setPwState((p) => ({ ...p, msg: "" })), 3e3);
        }
        const sectionHdr = (label) => /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#FF8A00", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid rgba(255,138,0,0.2)" } }, label);
        return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 780, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, ...S.text, marginBottom: 6 } }, "\u2699\uFE0F Settings"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3 } }, "Manage your company profile, app preferences, security, and data.")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 16 } }, sectionHdr("\u{1F3E2} Company Information"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("label", { style: lb }, "Company Name"), /* @__PURE__ */ React.createElement("input", { value: s.companyName || "", onChange: u("companyName"), placeholder: "KoDox Mechanical LLC", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Superintendent"), /* @__PURE__ */ React.createElement("input", { value: s.superintendent || "", onChange: u("superintendent"), placeholder: "James Hargrove", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Project Manager"), /* @__PURE__ */ React.createElement("input", { value: s.projectManager || "", onChange: u("projectManager"), placeholder: "PM Name", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Phone"), /* @__PURE__ */ React.createElement("input", { value: s.phone || "", onChange: u("phone"), placeholder: "(555) 000-0000", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Email"), /* @__PURE__ */ React.createElement("input", { value: s.email || "", onChange: u("email"), placeholder: "super@company.com", style: iS2 })), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("label", { style: lb }, "Address"), /* @__PURE__ */ React.createElement("input", { value: s.address || "", onChange: u("address"), placeholder: "123 Main St, Houston TX 77001", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "License Number"), /* @__PURE__ */ React.createElement("input", { value: s.licenseNum || "", onChange: u("licenseNum"), placeholder: "TX-M-000000", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "State"), /* @__PURE__ */ React.createElement("input", { value: s.state || "", onChange: u("state"), placeholder: "TX", style: iS2 }))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: saveSettings, style: { ...S.btnP } }, "\u{1F4BE} Save Company Info"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 16 } }, sectionHdr("\u{1F4C4} Report Defaults"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 14, lineHeight: 1.6 } }, "These values appear on all exported reports and PDF documents."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Report Header \u2014 Company"), /* @__PURE__ */ React.createElement("input", { value: s.companyName || "", onChange: u("companyName"), placeholder: "Company name on reports", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Prepared By"), /* @__PURE__ */ React.createElement("input", { value: s.superintendent || "", onChange: u("superintendent"), placeholder: "Superintendent name", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Report Footer Text"), /* @__PURE__ */ React.createElement("input", { value: s.reportFooter || "", onChange: u("reportFooter"), placeholder: "e.g. Confidential \u2014 Do Not Distribute", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Default Work Hours/Day"), /* @__PURE__ */ React.createElement("input", { value: s.hoursPerDay || "8", onChange: u("hoursPerDay"), placeholder: "8", style: iS2 }))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: saveSettings, style: { ...S.btnP } }, "\u{1F4BE} Save Report Defaults"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 16 } }, sectionHdr("\u{1F3A8} App Preferences"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Default Trade / Discipline"), /* @__PURE__ */ React.createElement("select", { value: s.defaultTrade || "", onChange: u("defaultTrade"), style: iS2 }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select \u2014"), /* @__PURE__ */ React.createElement("option", null, "Plumbing"), /* @__PURE__ */ React.createElement("option", null, "MEP"), /* @__PURE__ */ React.createElement("option", null, "HVAC"), /* @__PURE__ */ React.createElement("option", null, "Electrical"), /* @__PURE__ */ React.createElement("option", null, "General"), /* @__PURE__ */ React.createElement("option", null, "Concrete"), /* @__PURE__ */ React.createElement("option", null, "Steel"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Work Hours Per Day"), /* @__PURE__ */ React.createElement("select", { value: s.hoursPerDay || "8", onChange: u("hoursPerDay"), style: iS2 }, /* @__PURE__ */ React.createElement("option", { value: "8" }, "8 Hours"), /* @__PURE__ */ React.createElement("option", { value: "9" }, "9 Hours"), /* @__PURE__ */ React.createElement("option", { value: "10" }, "10 Hours"), /* @__PURE__ */ React.createElement("option", { value: "12" }, "12 Hours"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Currency"), /* @__PURE__ */ React.createElement("select", { value: s.currency || "USD", onChange: u("currency"), style: iS2 }, /* @__PURE__ */ React.createElement("option", { value: "USD" }, "USD \u2014 US Dollar"), /* @__PURE__ */ React.createElement("option", { value: "CAD" }, "CAD \u2014 Canadian Dollar"), /* @__PURE__ */ React.createElement("option", { value: "MXN" }, "MXN \u2014 Mexican Peso"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Date Format"), /* @__PURE__ */ React.createElement("select", { value: s.dateFormat || "MM/DD/YYYY", onChange: u("dateFormat"), style: iS2 }, /* @__PURE__ */ React.createElement("option", null, "MM/DD/YYYY"), /* @__PURE__ */ React.createElement("option", null, "DD/MM/YYYY"), /* @__PURE__ */ React.createElement("option", null, "YYYY-MM-DD")))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: saveSettings, style: { ...S.btnP } }, "Save Preferences"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 20, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, ...S.text, marginBottom: 4 } }, "Craft and Management Rates"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 16 } }, "Set the hourly rate and daily per diem for each role. Used when posting labor costs to Financials."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Role"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase" } }, "Rate ($/hr)"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#3b82f6", letterSpacing: 1, textTransform: "uppercase" } }, "Per Diem ($/day)")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, ...S.text3, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, marginTop: 4, paddingBottom: 4, borderBottom: "1px solid rgba(255,255,255,0.06)" } }, "Field Trades"), [
          { role: "Pipefitter", rk: "laborRatePipefitter", dk: "perDiemPipefitter", rph: "85", dph: "75" },
          { role: "Welder", rk: "laborRateWelder", dk: "perDiemWelder", rph: "95", dph: "75" },
          { role: "Helper/Laborer", rk: "laborRateHelper", dk: "perDiemHelper", rph: "55", dph: "65" },
          { role: "Foreman", rk: "laborRateForeman", dk: "perDiemForeman", rph: "90", dph: "85" },
          { role: "Default", rk: "laborRateDefault", dk: "perDiemDefault", rph: "65", dph: "75" }
        ].map((f) => /* @__PURE__ */ React.createElement("div", { key: f.role, style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, ...S.text } }, f.role), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00", fontSize: 12 } }, "$"), /* @__PURE__ */ React.createElement("input", { type: "number", value: s[f.rk] || "", onChange: u(f.rk), placeholder: f.rph, style: { ...iS2, padding: "6px 8px", fontSize: 12 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#3b82f6", fontSize: 12 } }, "$"), /* @__PURE__ */ React.createElement("input", { type: "number", value: s[f.dk] || "", onChange: u(f.dk), placeholder: f.dph, style: { ...iS2, padding: "6px 8px", fontSize: 12 } })))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, ...S.text3, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, marginTop: 16, paddingBottom: 4, borderBottom: "1px solid rgba(255,255,255,0.06)" } }, "Management"), [
          { role: "Project Manager", rk: "laborRatePM", dk: "perDiemPM", rph: "120", dph: "150" },
          { role: "Asst Project Manager", rk: "laborRateAPM", dk: "perDiemAPM", rph: "95", dph: "125" },
          { role: "General Superintendent", rk: "laborRateGS", dk: "perDiemGS", rph: "110", dph: "135" },
          { role: "Asst Superintendent", rk: "laborRateAS", dk: "perDiemAS", rph: "90", dph: "110" },
          { role: "Safety Manager", rk: "laborRateSM", dk: "perDiemSM", rph: "95", dph: "120" },
          { role: "Quality Manager", rk: "laborRateQM", dk: "perDiemQM", rph: "95", dph: "120" }
        ].map((f) => /* @__PURE__ */ React.createElement("div", { key: f.role, style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, ...S.text } }, f.role), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00", fontSize: 12 } }, "$"), /* @__PURE__ */ React.createElement("input", { type: "number", value: s[f.rk] || "", onChange: u(f.rk), placeholder: f.rph, style: { ...iS2, padding: "6px 8px", fontSize: 12 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#3b82f6", fontSize: 12 } }, "$"), /* @__PURE__ */ React.createElement("input", { type: "number", value: s[f.dk] || "", onChange: u(f.dk), placeholder: f.dph, style: { ...iS2, padding: "6px 8px", fontSize: 12 } })))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setSettings(s);
          localStorage.setItem("kodox_labor_rates", JSON.stringify({
            default: Number(s.laborRateDefault || 65),
            pipefitter: Number(s.laborRatePipefitter || 85),
            welder: Number(s.laborRateWelder || 95),
            helper: Number(s.laborRateHelper || 55),
            foreman: Number(s.laborRateForeman || 90),
            pm: Number(s.laborRatePM || 120),
            apm: Number(s.laborRateAPM || 95),
            gs: Number(s.laborRateGS || 110),
            as: Number(s.laborRateAS || 90),
            sm: Number(s.laborRateSM || 95),
            qm: Number(s.laborRateQM || 95)
          }));
          localStorage.setItem("kodox_per_diem_rates", JSON.stringify({
            default: Number(s.perDiemDefault || 75),
            pipefitter: Number(s.perDiemPipefitter || 75),
            welder: Number(s.perDiemWelder || 75),
            helper: Number(s.perDiemHelper || 65),
            foreman: Number(s.perDiemForeman || 85),
            pm: Number(s.perDiemPM || 150),
            apm: Number(s.perDiemAPM || 125),
            gs: Number(s.perDiemGS || 135),
            as: Number(s.perDiemAS || 110),
            sm: Number(s.perDiemSM || 120),
            qm: Number(s.perDiemQM || 120)
          }));
          alert("Rates saved!");
        }, style: { ...S.btnP, width: "100%", padding: "10px" } }, "Save All Rates"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 16 } }, sectionHdr("\u2728 AI Assistant"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 14, lineHeight: 1.6 } }, "The AI Assistant is powered by Anthropic Claude. Enter your API key to enable it. Your key is stored locally on your device only \u2014 never sent to any server other than Anthropic.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Get a free API key at ", /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00", fontWeight: 600 } }, "console.anthropic.com"), " \u2192 API Keys \u2192 Create Key"), (() => {
          const [key, setKey] = useState(localStorage.getItem("kodox_ai_key") || "");
          const [show, setShow] = useState(false);
          const [saved, setSaved] = useState(!!localStorage.getItem("kodox_ai_key"));
          return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("label", { style: lb }, "Anthropic API Key"), /* @__PURE__ */ React.createElement("input", { type: show ? "text" : "password", value: key, onChange: (e) => setKey(e.target.value), placeholder: "sk-ant-api03-...", style: iS2 })), /* @__PURE__ */ React.createElement("button", { onClick: () => setShow((v) => !v), style: { ...S.btnS, padding: "9px 14px", flexShrink: 0 } }, show ? "Hide" : "Show")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
            if (!key.trim()) {
              alert("Please enter an API key.");
              return;
            }
            localStorage.setItem("kodox_ai_key", key.trim());
            setSaved(true);
            alert("API key saved! Click \u2728 AI Assistant in the header to start chatting.");
          }, style: { ...S.btnP } }, "\u{1F4BE} Save API Key"), saved && /* @__PURE__ */ React.createElement("button", { onClick: () => {
            if (window.confirm("Remove API key?")) {
              localStorage.removeItem("kodox_ai_key");
              setKey("");
              setSaved(false);
            }
          }, style: { ...S.btnS, color: "#ef4444", border: "1px solid rgba(239,68,68,0.4)" } }, "Remove Key")), saved && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 12, color: "#10b981" } }, "\u2705 API key saved \u2014 AI Assistant is active"));
        })()), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 16 } }, sectionHdr("\u{1F510} Security"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 14, lineHeight: 1.6 } }, "Change the app login password. Default password is ", /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "monospace", color: "#FF8A00", fontWeight: 600 } }, "kodox2026")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Current Password"), /* @__PURE__ */ React.createElement("input", { type: "password", value: pwState.cur, onChange: (e) => setPwState((p) => ({ ...p, cur: e.target.value })), placeholder: "Current password", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "New Password"), /* @__PURE__ */ React.createElement("input", { type: "password", value: pwState.n1, onChange: (e) => setPwState((p) => ({ ...p, n1: e.target.value })), placeholder: "New password", style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lb }, "Confirm New Password"), /* @__PURE__ */ React.createElement("input", { type: "password", value: pwState.n2, onChange: (e) => setPwState((p) => ({ ...p, n2: e.target.value })), placeholder: "Confirm password", style: iS2 }))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" } }, pwState.msg && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: pwState.msg.startsWith("\u2705") ? "#10b981" : "#ef4444" } }, pwState.msg), /* @__PURE__ */ React.createElement("button", { onClick: changePw, style: { ...S.btnP, marginLeft: "auto" } }, "\u{1F510} Update Password"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 16 } }, sectionHdr("\u{1F4BE} Data Backup & Restore"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 16, lineHeight: 1.6 } }, "Export all your data as a JSON backup file. Use this to save your work or transfer to another device."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: 16, background: dark ? "rgba(16,185,129,0.08)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#10b981", marginBottom: 6 } }, "\u{1F4E5} Export Backup"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 10 } }, "Download all projects, tasks, logs, and settings as a JSON file."), /* @__PURE__ */ React.createElement("button", { onClick: () => exportAllData(allState), style: { ...S.btnG, width: "100%" } }, "Download Backup")), /* @__PURE__ */ React.createElement("div", { style: { padding: 16, background: dark ? "rgba(59,130,246,0.08)" : "#eff6ff", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#3b82f6", marginBottom: 6 } }, "\u{1F4E4} Restore from Backup"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 10 } }, "Warning: replaces all current data with the backup file."), /* @__PURE__ */ React.createElement("label", { style: { ...S.btnS, width: "100%", display: "block", textAlign: "center", cursor: "pointer", padding: "9px 0", borderRadius: 8, color: "#3b82f6", border: "1px solid rgba(59,130,246,0.4)" } }, "Choose Backup File", /* @__PURE__ */ React.createElement("input", { ref: impRef, type: "file", accept: ".json", style: { display: "none" }, onChange: settingsDoImport }))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, marginBottom: 16, border: "1px solid rgba(239,68,68,0.3)" } }, sectionHdr("\u26A0\uFE0F Reset Application"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 16, lineHeight: 1.7 } }, "Permanently deletes ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#ef4444" } }, "ALL data"), " \u2014 every project, task, daily log, budget entry, RFI, submittal, drawing, and setting. ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "This cannot be undone."), " Export a backup first."), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          if (window.confirm("DELETE ALL DATA?\n\nThis will permanently erase everything.\n\nThis CANNOT be undone.")) {
            if (window.confirm("Final confirmation \u2014 click OK to delete everything and restart.")) {
              try {
                localStorage.clear();
              } catch (e) {
              }
              try {
                indexedDB.deleteDatabase("KoDoxIDB");
              } catch (e) {
              }
              window.location.reload();
            }
          }
        }, style: { background: "linear-gradient(135deg,#ef4444,#b91c1c)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, boxShadow: "0 2px 12px rgba(239,68,68,0.3)" } }, "\u{1F5D1} Reset App \u2014 Delete All Data")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24 } }, sectionHdr("\u2139\uFE0F App Information"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12 } }, [
          ["Application", "KoDox Command Center"],
          ["Version", "v4.0 \u2014 Field Operations"],
          ["Build", "2026 Edition"],
          ["Platform", "Progressive Web App"],
          ["Storage", "Local + IndexedDB"],
          ["Support", "kodoxsystems.com"]
        ].map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { padding: "10px 12px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 7, border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 } }, k), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, ...S.text } }, v))))));
      }
      function ManpowerTab({ dailyLogs, projects, S, darkMode, pN, companyName: companyName2, manpowerEntries, setManpowerEntries, selProj }) {
        const dark = darkMode;
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const [df, sdf] = useState(fmt(new Date(today.getTime() - 30 * 864e5)));
        const [dt, sdt] = useState(fmt(today));
        const [gb, sgb] = useState("trade");
        const [modal, setModal] = useState(false);
        const [form, setForm] = useState({});
        const [savedTemplates, setSavedTemplates] = useState([]);
        const [showTemplates, setShowTemplates] = useState(false);
        const [templateName, setTemplateName] = useState("");
        const TRADES2 = [
          "Pipefitter",
          "Welder",
          "Helper / Laborer",
          "Fire Watch",
          "Spotter",
          "Controls Tech",
          "Operator",
          "Plumber",
          "HVAC Tech",
          "Electrician",
          "Ironworker",
          "Carpenter",
          "Superintendent",
          "Foreman",
          "Inspector",
          "Safety Officer",
          "QC Inspector",
          "Other"
        ];
        const blankCrew = {
          id: "",
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          projectId: projects[0] && projects[0].id || "",
          superintendent: "",
          foreman: "",
          company: "",
          shift: "Day",
          tradeLines: [
            { id: uid2(), trade: "Pipefitter", workers: 0, hours: 8 }
          ],
          notes: ""
        };
        const filt2 = (manpowerEntries || []).filter(
          (e) => (!selProj || e.projectId === selProj) && e.date >= df && e.date <= dt
        );
        const logEntries = dailyLogs.filter(
          (l) => (!selProj || l.projectId === selProj) && l.date >= df && l.date <= dt && (l.manpower || l.crewCount)
        );
        const totalWorkers = filt2.reduce((s, e) => s + (e.tradeLines || []).reduce((ss2, tl) => ss2 + Number(tl.workers || 0), 0), 0) + logEntries.reduce((s, l) => s + Number(l.manpower || l.crewCount || 0), 0);
        const totalHours = filt2.reduce((s, e) => s + (e.tradeLines || []).reduce((ss2, tl) => ss2 + Number(tl.workers || 0) * Number(tl.hours || 8), 0), 0) + logEntries.reduce((s, l) => s + Number(l.totalHoursDay || 0), 0);
        const dayMap = {};
        filt2.forEach((e) => {
          const w = (e.tradeLines || []).reduce((s, tl) => s + Number(tl.workers || 0), 0);
          if (!dayMap[e.date]) dayMap[e.date] = 0;
          dayMap[e.date] += w;
        });
        logEntries.forEach((l) => {
          if (!dayMap[l.date]) dayMap[l.date] = 0;
          dayMap[l.date] += Number(l.manpower || l.crewCount || 0);
        });
        const peakDay = Object.entries(dayMap).sort((a, b) => b[1] - a[1])[0];
        const avgPerDay = Object.keys(dayMap).length > 0 ? (totalWorkers / Object.keys(dayMap).length).toFixed(1) : 0;
        const tradeMap = {};
        filt2.forEach((e) => {
          (e.tradeLines || []).forEach((tl) => {
            const t = tl.trade || "Other";
            if (!tradeMap[t]) tradeMap[t] = { workers: 0, hours: 0 };
            tradeMap[t].workers += Number(tl.workers || 0);
            tradeMap[t].hours += Number(tl.workers || 0) * Number(tl.hours || 8);
          });
        });
        function mpAdd() {
          const yesterday = filt2.sort((a, b) => b.date.localeCompare(a.date))[0];
          setForm({
            ...blankCrew,
            id: "",
            date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            tradeLines: yesterday ? yesterday.tradeLines.map((tl) => ({ ...tl, id: uid2(), workers: tl.workers })) : [{ id: uid2(), trade: "Pipefitter", workers: 0, hours: 8 }]
          });
          setModal(true);
        }
        function mpEdit(e) {
          setForm({ ...e, tradeLines: e.tradeLines.map((tl) => ({ ...tl })) });
          setModal(true);
        }
        function mpDel(id) {
          if (window.confirm("Delete this crew entry?")) setManpowerEntries((l) => l.filter((x) => x.id !== id));
        }
        function addTradeLine() {
          setForm((p) => ({ ...p, tradeLines: [...p.tradeLines, { id: uid2(), trade: "Pipefitter", workers: 0, hours: 8 }] }));
        }
        function removeTradeLine(id) {
          setForm((p) => ({ ...p, tradeLines: p.tradeLines.filter((tl) => tl.id !== id) }));
        }
        function updateTrade(id, key, val) {
          setForm((p) => ({ ...p, tradeLines: p.tradeLines.map((tl) => tl.id === id ? { ...tl, [key]: val } : tl) }));
        }
        function adjustWorkers(id, delta) {
          setForm((p) => ({ ...p, tradeLines: p.tradeLines.map((tl) => tl.id === id ? { ...tl, workers: Math.max(0, Number(tl.workers || 0) + delta) } : tl) }));
        }
        function saveTemplate() {
          if (!templateName.trim()) {
            alert("Enter a template name.");
            return;
          }
          const tmpl = { id: uid2(), name: templateName, tradeLines: form.tradeLines.map((tl) => ({ ...tl })) };
          setSavedTemplates((t) => [...t, tmpl]);
          setTemplateName("");
          setShowTemplates(false);
        }
        function loadTemplate(tmpl) {
          setForm((p) => ({ ...p, tradeLines: tmpl.tradeLines.map((tl) => ({ ...tl, id: uid2() })) }));
          setShowTemplates(false);
        }
        function mpSave() {
          const hasWorkers = form.tradeLines.some((tl) => Number(tl.workers || 0) > 0);
          if (!form.date) {
            alert("Date is required.");
            return;
          }
          if (!hasWorkers) {
            alert("At least one trade must have workers > 0.");
            return;
          }
          const rec = { ...form, id: form.id || uid2(), projectId: form.projectId || selProj || "" };
          setManpowerEntries((l) => form.id ? l.map((x) => x.id === rec.id ? rec : x) : [rec, ...l]);
          if (typeof setTransactions === "function" && rec.tradeLines) {
            const totalHrs = rec.tradeLines.reduce(function(s, tl) {
              return s + Number(tl.workers || 0) * Number(tl.hours || 8);
            }, 0);
            if (totalHrs > 0) {
              const uid4 = () => Math.random().toString(36).slice(2, 9);
              const sr = JSON.parse(localStorage.getItem("kodox_labor_rates") || "{}");
              const totalCost = rec.tradeLines.reduce(function(sum, tl) {
                const hrs = Number(tl.workers || 0) * Number(tl.hours || 8);
                const t = (tl.trade || "").toLowerCase();
                const rate = t.includes("weld") ? Number(sr.welder || 95) : t.includes("help") || t.includes("labor") ? Number(sr.helper || 55) : t.includes("foreman") ? Number(sr.foreman || 90) : t.includes("fitter") || t.includes("pipe") ? Number(sr.pipefitter || 85) : Number(sr.default || 65);
                return sum + hrs * rate;
              }, 0);
              setTransactions(function(t) {
                return [{ id: uid4(), projectId: rec.projectId || "", date: rec.date, type: "Expense", category: "Labor", description: "Crew labor - " + rec.date + (rec.company ? " (" + rec.company + ")" : ""), amount: totalCost.toFixed(2), vendor: rec.company || "", notes: rec.tradeLines.filter(function(tl) {
                  return Number(tl.workers || 0) > 0;
                }).map(function(tl) {
                  return tl.workers + "x " + tl.trade;
                }).join(", ") + " = " + totalHrs + " hrs" }, ...t];
              });
            }
          }
          setModal(false);
        }
        const modalTotal = form.tradeLines ? form.tradeLines.reduce((s, tl) => s + Number(tl.workers || 0), 0) : 0;
        const modalHours = form.tradeLines ? form.tradeLines.reduce((s, tl) => s + Number(tl.workers || 0) * Number(tl.hours || 8), 0) : 0;
        const iS2 = { background: dark ? "#0f1117" : "#fff", border: "1px solid " + (dark ? "#2a3150" : "#e2e8f0"), borderRadius: 8, padding: "8px 11px", fontSize: 13, color: dark ? "#e2e8f0" : "#1c2333" };
        function doExport() {
          const rows = [["Date", "Shift", "Superintendent", "Foreman", "Company", "Trade", "Workers", "Hrs/Worker", "Man-Hours"]];
          filt2.sort((a2, b2) => b2.date.localeCompare(a2.date)).forEach((e) => {
            (e.tradeLines || []).filter((tl) => Number(tl.workers || 0) > 0).forEach((tl) => {
              rows.push([e.date, e.shift || "Day", e.superintendent || "", e.foreman || "", e.company || "", tl.trade, tl.workers, tl.hours || 8, Number(tl.workers || 0) * Number(tl.hours || 8)]);
            });
          });
          const csv = rows.map((r) => r.map((c) => '"' + c + '"').join(",")).join("\n");
          const b = new Blob([csv], { type: "text/csv" });
          const u = URL.createObjectURL(b);
          const a = document.createElement("a");
          a.href = u;
          a.download = "manpower_crew_report.csv";
          a.click();
          URL.revokeObjectURL(u);
        }
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "Manpower Report"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Daily crew sheets with full trade breakdown")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: doExport, style: S.btnS }, "Export CSV"), /* @__PURE__ */ React.createElement("button", { onClick: mpAdd, style: S.btnP }, "+ New Crew Sheet"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, ...S.text3, fontWeight: 700, display: "block", marginBottom: 3 } }, "FROM"), /* @__PURE__ */ React.createElement("input", { type: "date", value: df, onChange: (e) => sdf(e.target.value), style: iS2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, ...S.text3, fontWeight: 700, display: "block", marginBottom: 3 } }, "TO"), /* @__PURE__ */ React.createElement("input", { type: "date", value: dt, onChange: (e) => sdt(e.target.value), style: iS2 })))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Total Workers"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, totalWorkers)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #3b82f6" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Total Man-Hours"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#3b82f6", fontFamily: "monospace" } }, totalHours.toFixed(0))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #10b981" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Avg Workers/Day"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#10b981", fontFamily: "monospace" } }, avgPerDay)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #8b5cf6" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Peak Day"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#8b5cf6", fontFamily: "monospace" } }, peakDay ? peakDay[1] + " workers" : "--"), peakDay && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, marginTop: 2 } }, peakDay[0]))), Object.keys(tradeMap).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 16, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, ...S.text, marginBottom: 12 } }, "Trade Breakdown"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, Object.entries(tradeMap).sort((a, b) => b[1].workers - a[1].workers).map(([trade, v]) => /* @__PURE__ */ React.createElement("div", { key: trade, style: { padding: "8px 14px", background: dark ? "rgba(255,138,0,0.08)" : "rgba(255,138,0,0.06)", border: "1px solid rgba(255,138,0,0.2)", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00" } }, trade), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, ...S.text, fontFamily: "monospace" } }, v.workers), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3 } }, v.hours.toFixed(0), " hrs"))))), !filt2.length ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3, marginBottom: 20 } }, `No crew sheets in this date range. Click "+ New Crew Sheet" to log today's crew.`), /* @__PURE__ */ React.createElement("button", { onClick: mpAdd, style: S.btnP }, "+ New Crew Sheet")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, filt2.sort((a, b) => b.date.localeCompare(a.date)).map((entry) => {
          const entryTotal = (entry.tradeLines || []).reduce((s, tl) => s + Number(tl.workers || 0), 0);
          const entryHours = (entry.tradeLines || []).reduce((s, tl) => s + Number(tl.workers || 0) * Number(tl.hours || 8), 0);
          return /* @__PURE__ */ React.createElement("div", { key: entry.id, style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: dark ? "#0f1117" : "#f8fafc", borderBottom: "1px solid " + (dark ? "#1e2538" : "#e2e8f0"), display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "monospace", fontWeight: 700, color: "#FF8A00", fontSize: 13 } }, entry.date), entry.shift && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: "rgba(255,138,0,0.1)", color: "#FF8A00", padding: "2px 7px", borderRadius: 4, fontWeight: 700 } }, entry.shift), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text } }, pN(entry.projectId) || "No Project"), entry.company && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text2 } }, entry.company), entry.superintendent && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, "Supt: ", entry.superintendent), entry.foreman && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, "Foreman: ", entry.foreman)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, entryTotal, " workers"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, entryHours.toFixed(0), " man-hrs")), /* @__PURE__ */ React.createElement("button", { onClick: () => mpEdit(entry), style: { ...S.btnS, padding: "4px 10px", fontSize: 11 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => mpDel(entry.id), style: { ...S.btnS, padding: "4px 10px", fontSize: 11, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Del"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, (entry.tradeLines || []).filter((tl) => Number(tl.workers || 0) > 0).map((tl, i) => /* @__PURE__ */ React.createElement("div", { key: tl.id || i, style: { display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: dark ? "rgba(255,255,255,0.03)" : "#f1f5f9", borderRadius: 6, border: "1px solid " + (dark ? "rgba(255,255,255,0.06)" : "#e2e8f0") } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#FF8A00", minWidth: 16, textAlign: "center", fontFamily: "monospace" } }, tl.workers), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text } }, tl.trade), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3 } }, "x ", tl.hours || 8, "h")))), entry.notes && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 11, ...S.text3 } }, "Note: ", entry.notes)));
        })), modal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 680, maxHeight: "92vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text } }, form.id ? "Edit" : "New", " Crew Sheet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, modalTotal, " workers / ", modalHours.toFixed(0), " hrs")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: form.date || "", onChange: (e) => setForm((p) => ({ ...p, date: e.target.value })), style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Project"), /* @__PURE__ */ React.createElement("select", { value: form.projectId || "", onChange: (e) => setForm((p) => ({ ...p, projectId: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Select --"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Shift"), /* @__PURE__ */ React.createElement("select", { value: form.shift || "Day", onChange: (e) => setForm((p) => ({ ...p, shift: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", null, "Day"), /* @__PURE__ */ React.createElement("option", null, "Night"), /* @__PURE__ */ React.createElement("option", null, "Overtime")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Superintendent"), /* @__PURE__ */ React.createElement("input", { value: form.superintendent || "", onChange: (e) => setForm((p) => ({ ...p, superintendent: e.target.value })), placeholder: "Name", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Foreman"), /* @__PURE__ */ React.createElement("input", { value: form.foreman || "", onChange: (e) => setForm((p) => ({ ...p, foreman: e.target.value })), placeholder: "Name", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Company"), /* @__PURE__ */ React.createElement("input", { value: form.company || "", onChange: (e) => setForm((p) => ({ ...p, company: e.target.value })), placeholder: "Company name", style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 } }, "Templates:"), savedTemplates.map((tmpl) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: tmpl.id,
            onClick: () => loadTemplate(tmpl),
            style: { ...S.btnS, padding: "3px 10px", fontSize: 11, color: "#FF8A00", border: "1px solid rgba(255,138,0,0.4)" }
          },
          tmpl.name
        )), showTemplates ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { value: templateName, onChange: (e) => setTemplateName(e.target.value), placeholder: "Template name", style: { ...S.iS, padding: "4px 8px", fontSize: 11, width: 140 } }), /* @__PURE__ */ React.createElement("button", { onClick: saveTemplate, style: { ...S.btnP, padding: "4px 10px", fontSize: 11 } }, "Save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowTemplates(false), style: { ...S.btnS, padding: "4px 8px", fontSize: 11 } }, "x")) : /* @__PURE__ */ React.createElement("button", { onClick: () => setShowTemplates(true), style: { ...S.btnS, padding: "3px 10px", fontSize: 11 } }, "+ Save as Template")), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8, fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase" } }, "Crew by Trade"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 } }, (form.tradeLines || []).map((tl, i) => /* @__PURE__ */ React.createElement("div", { key: tl.id, style: { display: "grid", gridTemplateColumns: "1fr 120px 80px 36px", gap: 8, alignItems: "center", padding: "10px 12px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 8, border: "1px solid " + (dark ? "rgba(255,255,255,0.06)" : "#e2e8f0") } }, /* @__PURE__ */ React.createElement("select", { value: tl.trade || "Pipefitter", onChange: (e) => updateTrade(tl.id, "trade", e.target.value), style: { ...S.iS, padding: "6px 10px", fontSize: 12 } }, TRADES2.map((t) => /* @__PURE__ */ React.createElement("option", { key: t }, t))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => adjustWorkers(tl.id, -1), style: { width: 28, height: 28, borderRadius: 6, background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.3)", color: "#FF8A00", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, "-"), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            value: tl.workers || 0,
            onChange: (e) => updateTrade(tl.id, "workers", Math.max(0, Number(e.target.value))),
            style: { ...S.iS, width: 44, padding: "5px 6px", fontSize: 14, fontWeight: 700, textAlign: "center", color: "#FF8A00", fontFamily: "monospace" }
          }
        ), /* @__PURE__ */ React.createElement("button", { onClick: () => adjustWorkers(tl.id, 1), style: { width: 28, height: 28, borderRadius: 6, background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.3)", color: "#FF8A00", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, "+")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            value: tl.hours || 8,
            onChange: (e) => updateTrade(tl.id, "hours", e.target.value),
            style: { ...S.iS, width: "100%", padding: "6px 8px", fontSize: 12, textAlign: "center" }
          }
        ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3, whiteSpace: "nowrap" } }, "hrs")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: "#3b82f6", fontFamily: "monospace" } }, (Number(tl.workers || 0) * Number(tl.hours || 8)).toFixed(0)), /* @__PURE__ */ React.createElement("button", { onClick: () => removeTradeLine(tl.id), style: { width: 24, height: 24, borderRadius: 4, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, "x"))))), /* @__PURE__ */ React.createElement("button", { onClick: addTradeLine, style: { ...S.btnS, width: "100%", marginBottom: 16, fontSize: 12, padding: "8px 0" } }, "+ Add Trade"), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: dark ? "rgba(255,138,0,0.08)" : "rgba(255,138,0,0.06)", border: "1px solid rgba(255,138,0,0.25)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3 } }, "Total Crew"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, modalTotal), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3 } }, "Workers")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: "#3b82f6", fontFamily: "monospace" } }, modalHours.toFixed(0)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3 } }, "Man-Hours")))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Notes"), /* @__PURE__ */ React.createElement("input", { value: form.notes || "", onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })), placeholder: "Any notes for this crew sheet...", style: S.iS })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setModal(false), style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: mpSave, style: S.btnP }, "Save Crew Sheet")))));
      }
      function ProjectOverview({ projects, tasks, dailyLogs, rfis, submittals, punchList, costCodes, changeOrders, rental, actionItems, S, darkMode, pN, selProj, setTab, today: today2, todayStr: todayStr2 }) {
        const dark = darkMode;
        const filt2 = (arr) => selProj ? arr.filter((x) => x.projectId === selProj || x.projectId === Number(selProj)) : arr;
        const projBudget = projects.map((proj) => {
          const codes = costCodes.filter((c) => c.projectId === proj.id);
          const budgeted = codes.reduce((s, c) => s + Number(c.budgeted || 0), 0);
          const spent = codes.reduce((s, c) => s + Number(c.spent || 0), 0);
          const committed = codes.reduce((s, c) => s + Number(c.committed || 0), 0);
          const pct2 = budgeted > 0 ? Math.min(110, Math.round(spent / budgeted * 100)) : 0;
          return { id: proj.id, name: proj.name, budgeted, spent, committed, pct: pct2, over: spent > budgeted && budgeted > 0 };
        });
        const projSchedule = projects.map((proj) => {
          const pt = tasks.filter((t) => t.projectId === proj.id);
          const complete = pt.filter((t) => t.status === "Complete").length;
          const delayed = pt.filter((t) => t.status === "Delayed").length;
          const atRisk = pt.filter((t) => t.status === "At Risk").length;
          const onTrack = pt.filter((t) => t.status === "On Track" || t.status === "Not Started").length;
          return { name: proj.name, total: pt.length, complete, delayed, atRisk, onTrack, pct: pt.length > 0 ? Math.round(complete / pt.length * 100) : 0 };
        });
        const last30 = [];
        for (let i = 29; i >= 0; i--) {
          const d = new Date(today2);
          d.setDate(d.getDate() - i);
          const ds = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
          const dayLogs = filt2(dailyLogs).filter((l) => l.date === ds);
          const workers = dayLogs.reduce((s, l) => s + Number(l.manpower || l.crewCount || 0), 0);
          last30.push({ date: ds, label: d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" }), workers });
        }
        const maxWorkers = Math.max(...last30.map((d) => d.workers), 1);
        const rfiList = filt2(rfis);
        const rfiOpen = rfiList.filter((r) => r.status === "Open").length;
        const rfiReview = rfiList.filter((r) => r.status === "In Review").length;
        const rfiAnswered = rfiList.filter((r) => r.status === "Answered" || r.status === "Closed").length;
        const rfiTotal = rfiList.length || 1;
        const subList = filt2(submittals);
        const subPend = subList.filter((s) => s.status === "Submitted" || s.status === "In Review").length;
        const subAppr = subList.filter((s) => s.status === "Approved").length;
        const subOpen = subList.length - subPend - subAppr;
        const subTotal = subList.length || 1;
        const punchList2 = filt2(punchList).filter((p) => p.status === "Open");
        const punchByTrade = {};
        punchList2.forEach((p) => {
          const t = p.trade || "Other";
          punchByTrade[t] = (punchByTrade[t] || 0) + 1;
        });
        const punchSorted = Object.entries(punchByTrade).sort((a, b) => b[1] - a[1]).slice(0, 6);
        const maxPunch = Math.max(...punchSorted.map(([, v]) => v), 1);
        const coList = filt2(changeOrders);
        const coPending = coList.filter((c) => c.status === "Pending" || c.status === "Under Review").length;
        const coApproved = coList.filter((c) => c.status === "Approved" || c.status === "Executed").length;
        const coTotal = coList.reduce((s, c) => s + Number(c.amount || 0), 0);
        const weeklyMP = [];
        for (let w = 3; w >= 0; w--) {
          const wStart = new Date(today2);
          wStart.setDate(wStart.getDate() - w * 7 - 6);
          const wEnd = new Date(today2);
          wEnd.setDate(wEnd.getDate() - w * 7);
          const fmt2 = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
          const ws = fmt2(wStart), we = fmt2(wEnd);
          const wLogs = filt2(dailyLogs).filter((l) => l.date >= ws && l.date <= we);
          const wHours = wLogs.reduce((s, l) => s + Number(l.totalHoursDay || 0), 0);
          weeklyMP.push({ label: "W" + (4 - w), hours: wHours });
        }
        const maxWeekHours = Math.max(...weeklyMP.map((w) => w.hours), 1);
        const CHART_COLORS = ["#1E5A8C", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899", "#ef4444", "#FF8A00"];
        const cardStyle = { ...S.card, padding: "16px 18px" };
        const titleStyle = { fontSize: 11, fontWeight: 700, color: dark ? "#FF8A00" : "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 };
        function DonutChart({ segments, size = 120, stroke = 18, label, sub }) {
          const r = (size - stroke) / 2;
          const circ = 2 * Math.PI * r;
          const cx = size / 2, cy = size / 2;
          let offset = 0;
          const total = segments.reduce((s, sg) => s + sg.value, 0) || 1;
          return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: size, height: size, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: size, height: size, style: { transform: "rotate(-90deg)" } }, /* @__PURE__ */ React.createElement("circle", { cx, cy, r, fill: "none", stroke: dark ? "#1a2035" : "#f1f5f9", strokeWidth: stroke }), segments.map((sg, i) => {
            const dash = circ * (sg.value / total);
            const el = /* @__PURE__ */ React.createElement("circle", { key: i, cx, cy, r, fill: "none", stroke: sg.color, strokeWidth: stroke, strokeDasharray: dash + " " + (circ - dash), strokeDashoffset: -offset, strokeLinecap: "butt" });
            offset += dash;
            return el;
          })), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: label && label.length > 6 ? 13 : 16, fontWeight: 800, color: dark ? "#e2e8f0" : "#1c2333", lineHeight: 1 } }, label), sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: dark ? "#4a5580" : "#94a3b8", marginTop: 2 } }, sub)));
        }
        function Legend({ items }) {
          return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5, justifyContent: "center" } }, items.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: 2, background: item.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text2 } }, item.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontFamily: "monospace", fontWeight: 600, ...S.text, marginLeft: "auto" } }, item.value))));
        }
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text } }, "Project Overview"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Visual summary across all active projects \xB7 ", (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, projects.length, " project", projects.length !== 1 ? "s" : "", " \xB7 ", filt2(tasks).length, " activities \xB7 ", filt2(dailyLogs).length, " logs")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, [
          { label: "Total Budget", value: "$" + projBudget.reduce((s, p) => s + p.budgeted, 0).toLocaleString(), sub: projBudget.filter((p) => p.over).length + " projects over budget", color: "#1E5A8C" },
          { label: "Total Spent", value: "$" + projBudget.reduce((s, p) => s + p.spent, 0).toLocaleString(), sub: projBudget.length > 0 ? Math.round(projBudget.reduce((s, p) => s + p.spent, 0) / Math.max(projBudget.reduce((s, p) => s + p.budgeted, 0), 1) * 100) + "% of budget" : "\u2014", color: "#8b5cf6" },
          { label: "Open Punch Items", value: filt2(punchList).filter((p) => p.status === "Open").length, sub: "across all projects", color: "#ec4899" },
          { label: "Pending COs", value: coPending, sub: "$" + coTotal.toLocaleString() + " total CO value", color: "#06b6d4" }
        ].map((k) => /* @__PURE__ */ React.createElement("div", { key: k.label, style: { ...cardStyle, borderTop: `3px solid ${k.color}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 0.8, marginBottom: 5, textTransform: "uppercase" } }, k.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 700, fontFamily: "monospace", color: k.color, marginBottom: 3 } }, k.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, k.sub)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Budget vs. Spent by Project"), projBudget.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, textAlign: "center", padding: 20 } }, "No cost code data yet") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, projBudget.map((p, i) => {
          const spW = Math.min(100, p.pct);
          const comW = Math.min(100, p.budgeted > 0 ? Math.round(p.committed / p.budgeted * 100) : 0);
          return /* @__PURE__ */ React.createElement("div", { key: p.id }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3, alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 600, ...S.text, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontFamily: "monospace", color: p.over ? "#ef4444" : "#10b981" } }, "$", p.spent.toLocaleString(), " / $", p.budgeted.toLocaleString())), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 12, background: dark ? "#1a2035" : "#f1f5f9", borderRadius: 6, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, height: "100%", width: comW + "%", background: CHART_COLORS[i % CHART_COLORS.length] + "33", borderRadius: 6 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, height: "100%", width: spW + "%", background: p.over ? "#ef4444" : CHART_COLORS[i % CHART_COLORS.length], borderRadius: 6, transition: "width .3s" } }, spW > 15 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", fontSize: 8, color: "#fff", fontWeight: 700 } }, p.pct, "%"))));
        }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 4, fontSize: 10, ...S.text3 } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "#1E5A8C", marginRight: 4 } }), "Spent"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "#1E5A8C33", marginRight: 4 } }), "Committed"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "#ef4444", marginRight: 4 } }), "Over Budget")))), /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Schedule Health by Project"), projSchedule.every((p) => p.total === 0) ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, textAlign: "center", padding: 20 } }, "No schedule activities yet") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, projSchedule.filter((p) => p.total > 0).map((p, i) => /* @__PURE__ */ React.createElement("div", { key: p.name }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3, alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 600, ...S.text, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3 } }, p.complete, "/", p.total, " complete \xB7 ", p.pct, "%")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", height: 12, borderRadius: 6, overflow: "hidden", background: dark ? "#1a2035" : "#f1f5f9" } }, p.complete > 0 && /* @__PURE__ */ React.createElement("div", { style: { width: p.complete / p.total * 100 + "%", background: "#10b981", transition: "width .3s" }, title: "Complete: " + p.complete }), p.onTrack > 0 && /* @__PURE__ */ React.createElement("div", { style: { width: p.onTrack / p.total * 100 + "%", background: "#1E5A8C", transition: "width .3s" }, title: "On Track: " + p.onTrack }), p.atRisk > 0 && /* @__PURE__ */ React.createElement("div", { style: { width: p.atRisk / p.total * 100 + "%", background: "#f59e0b", transition: "width .3s" }, title: "At Risk: " + p.atRisk }), p.delayed > 0 && /* @__PURE__ */ React.createElement("div", { style: { width: p.delayed / p.total * 100 + "%", background: "#ef4444", transition: "width .3s" }, title: "Delayed: " + p.delayed })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 4, fontSize: 10, ...S.text3, flexWrap: "wrap" } }, [["#10b981", "Complete"], ["#1E5A8C", "On Track"], ["#f59e0b", "At Risk"], ["#ef4444", "Delayed"]].map(([c, l]) => /* @__PURE__ */ React.createElement("span", { key: l }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: c, marginRight: 4 } }), l)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Manpower Trend \u2014 Last 30 Days"), maxWorkers === 1 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, textAlign: "center", padding: 20 } }, "No daily log manpower data yet") : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("svg", { width: "100%", height: 100, viewBox: "0 0 " + last30.length * 14 + " 100", preserveAspectRatio: "none", style: { display: "block" } }, [0, 25, 50, 75, 100].map((y) => /* @__PURE__ */ React.createElement("line", { key: y, x1: 0, y1: 100 - y, x2: last30.length * 14, y2: 100 - y, stroke: dark ? "#1a2035" : "#f1f5f9", strokeWidth: "1" })), /* @__PURE__ */ React.createElement(
          "polyline",
          {
            points: last30.map((d, i) => i * 14 + 7 + "," + (100 - Math.round(d.workers / maxWorkers * 95))).join(" "),
            fill: "none",
            stroke: "#1E5A8C",
            strokeWidth: "2",
            strokeLinejoin: "round"
          }
        ), /* @__PURE__ */ React.createElement(
          "polygon",
          {
            points: "0,100 " + last30.map((d, i) => i * 14 + 7 + "," + (100 - Math.round(d.workers / maxWorkers * 95))).join(" ") + " " + (last30.length * 14 - 7) + ",100",
            fill: "#1E5A8C",
            opacity: "0.1"
          }
        ), last30.filter((d) => d.workers > 0).map((d, i) => {
          const idx = last30.indexOf(d);
          return /* @__PURE__ */ React.createElement("circle", { key: i, cx: idx * 14 + 7, cy: 100 - Math.round(d.workers / maxWorkers * 95), r: 3, fill: "#1E5A8C" });
        })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, ...S.text3 } }, /* @__PURE__ */ React.createElement("span", null, last30[0].label), /* @__PURE__ */ React.createElement("span", null, "Peak: ", maxWorkers, " workers"), /* @__PURE__ */ React.createElement("span", null, last30[last30.length - 1].label)))), /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "RFI Status"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
          DonutChart,
          {
            size: 90,
            stroke: 14,
            label: rfiList.length,
            sub: "total",
            segments: [
              { value: rfiOpen, color: "#f59e0b" },
              { value: rfiReview, color: "#3b82f6" },
              { value: rfiAnswered, color: "#10b981" }
            ]
          }
        ), /* @__PURE__ */ React.createElement(Legend, { items: [
          { label: "Open", value: rfiOpen, color: "#f59e0b" },
          { label: "In Review", value: rfiReview, color: "#3b82f6" },
          { label: "Answered", value: rfiAnswered, color: "#10b981" }
        ] })), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("rfis"), style: { marginTop: 10, fontSize: 10, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0 } }, "View RFIs \u2192")), /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Submittal Status"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
          DonutChart,
          {
            size: 90,
            stroke: 14,
            label: subList.length,
            sub: "total",
            segments: [
              { value: subOpen, color: "#94a3b8" },
              { value: subPend, color: "#8b5cf6" },
              { value: subAppr, color: "#10b981" }
            ]
          }
        ), /* @__PURE__ */ React.createElement(Legend, { items: [
          { label: "Not Submitted", value: subOpen, color: "#94a3b8" },
          { label: "In Review", value: subPend, color: "#8b5cf6" },
          { label: "Approved", value: subAppr, color: "#10b981" }
        ] })), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("submittals"), style: { marginTop: 10, fontSize: 10, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0 } }, "View Submittals \u2192"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Open Punch Items by Trade"), punchSorted.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, textAlign: "center", padding: 20 } }, "No open punch items") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, punchSorted.map(([trade, count], i) => /* @__PURE__ */ React.createElement("div", { key: trade }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text2 } }, trade), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontFamily: "monospace", fontWeight: 600, color: CHART_COLORS[i % CHART_COLORS.length] } }, count)), /* @__PURE__ */ React.createElement("div", { style: { height: 7, background: dark ? "#1a2035" : "#f1f5f9", borderRadius: 4, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: count / maxPunch * 100 + "%", background: CHART_COLORS[i % CHART_COLORS.length], borderRadius: 4 } })))), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("punchlist"), style: { marginTop: 4, fontSize: 10, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" } }, "View Punch List \u2192"))), /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Weekly Man-Hours"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 8, height: 80, marginBottom: 6 } }, weeklyMP.map((w, i) => {
          const h = maxWeekHours > 0 ? Math.round(w.hours / maxWeekHours * 72) : 0;
          return /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, fontFamily: "monospace", color: dark ? "#4a5580" : "#94a3b8", marginBottom: 2 } }, w.hours > 0 ? w.hours : ""), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: h || 2, background: i === 3 ? "#FF8A00" : "#1E5A8C", borderRadius: "3px 3px 0 0", minHeight: 2, transition: "height .3s" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3 } }, w.label));
        })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, textAlign: "center" } }, "Total last 4 weeks: ", /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: "#FF8A00" } }, weeklyMP.reduce((s, w) => s + w.hours, 0), " hrs")), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("manpower"), style: { marginTop: 6, fontSize: 10, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0 } }, "Full Manpower Report \u2192")), /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Change Order Summary"), coList.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, textAlign: "center", padding: 20 } }, "No change orders yet") : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 } }, [
          { label: "Pending / Under Review", value: coPending, color: "#f59e0b" },
          { label: "Approved / Executed", value: coApproved, color: "#10b981" },
          { label: "Rejected / Closed", value: coList.filter((c) => c.status === "Rejected" || c.status === "Closed").length, color: "#94a3b8" }
        ].map((item) => /* @__PURE__ */ React.createElement("div", { key: item.label, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 6, borderLeft: `3px solid ${item.color}` } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text2 } }, item.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: item.color } }, item.value)))), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 10px", background: dark ? "rgba(6,182,212,0.08)" : "#f0fdff", borderRadius: 6, border: "1px solid rgba(6,182,212,0.3)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, marginBottom: 2 } }, "TOTAL CO VALUE"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "monospace", color: "#06b6d4" } }, "$", coTotal.toLocaleString())), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("changeorders"), style: { marginTop: 8, fontSize: 10, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0 } }, "View Change Orders \u2192")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Recent Daily Logs"), filt2(dailyLogs).length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, textAlign: "center", padding: 20 } }, "No daily logs yet") : /* @__PURE__ */ React.createElement("div", null, filt2(dailyLogs).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((log) => /* @__PURE__ */ React.createElement("div", { key: log.id, style: { padding: "8px 0", borderBottom: "1px solid " + (dark ? "#151a28" : "#f1f5f9"), display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, ...S.text } }, log.date, " \xB7 ", pN(log.projectId)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, log.superintendent || "\u2014", " \xB7 ", log.companyName || "\u2014")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, log.totalHoursDay && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#FF8A00", fontFamily: "monospace" } }, log.totalHoursDay, " hrs"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, log.manpower || "0", " workers")))), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("dailylogs"), style: { marginTop: 8, fontSize: 10, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0 } }, "All Daily Logs \u2192"))), /* @__PURE__ */ React.createElement("div", { style: cardStyle }, /* @__PURE__ */ React.createElement("div", { style: titleStyle }, "Recent Activity"), (() => {
          const events = [];
          filt2(rfis).filter((r) => r.submittedDate).sort((a, b) => b.submittedDate.localeCompare(a.submittedDate)).slice(0, 2).forEach((r) => events.push({ date: r.submittedDate, icon: "\u2753", color: "#f59e0b", text: "RFI #" + r.rfiNumber + " \u2014 " + r.subject, sub: pN(r.projectId) }));
          filt2(submittals).filter((s) => s.submittedDate).sort((a, b) => b.submittedDate.localeCompare(a.submittedDate)).slice(0, 2).forEach((s) => events.push({ date: s.submittedDate, icon: "\u{1F4C4}", color: "#8b5cf6", text: "Submittal: " + s.description, sub: pN(s.projectId) }));
          filt2(punchList).filter((p) => p.status === "Complete").slice(0, 2).forEach((p) => events.push({ date: p.dueDate || todayStr2, icon: "\u2705", color: "#10b981", text: "Punch closed: " + p.description, sub: pN(p.projectId) }));
          filt2(changeOrders).filter((c) => c.date).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2).forEach((c) => events.push({ date: c.date, icon: "\u{1F504}", color: "#06b6d4", text: "CO " + c.coNumber + " \u2014 " + c.title, sub: "$" + Number(c.amount || 0).toLocaleString() }));
          filt2(actionItems).filter((a) => a.status === "Closed").slice(0, 2).forEach((a) => events.push({ date: a.dueDate || todayStr2, icon: "\u26A1", color: "#ec4899", text: "Action closed: " + a.description, sub: pN(a.projectId) }));
          const sorted = events.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
          if (!sorted.length) return /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, textAlign: "center", padding: 20 } }, "No recent activity");
          return sorted.map((ev, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "7px 0", borderBottom: "1px solid " + (dark ? "#151a28" : "#f1f5f9"), display: "flex", gap: 8, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, flexShrink: 0 } }, ev.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 500, ...S.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, ev.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, ev.sub, " \xB7 ", ev.date))));
        })())));
        function renderAI() {
          return React.createElement(AIAssistant, { open: aiOpen, onClose: () => setAiOpen(false), projects, tasks, dailyLogs, rfis, submittals, punchList, costCodes, changeOrders: changeOrders || [], inventory, actionItems, delays, safetyInsp, jsas, rental, S, darkMode, pN, companyName });
        }
        if (isExternal) return React.createElement(
          "div",
          { style: { minHeight: "100vh", background: darkMode ? "#060914" : "#f1f5f9", fontFamily: "Inter,sans-serif" } },
          React.createElement(
            "div",
            { style: { background: darkMode ? "#0d1520" : "#fff", borderBottom: "1px solid " + (darkMode ? "rgba(255,138,0,0.2)" : "#e2e8f0"), padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" } },
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", gap: 12 } },
              React.createElement(
                "div",
                { style: { fontSize: 18, fontWeight: 900, color: "#e2e8f0", fontFamily: "'Arial Black',Impact,sans-serif" } },
                "Ko",
                React.createElement("span", { style: { color: "#FF8A00" } }, "D"),
                "ox"
              ),
              React.createElement("div", { style: { fontSize: 11, color: "#64748b" } }, userCompany + " \u2014 External Portal")
            ),
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", gap: 10 } },
              React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "Signed in as " + userEmail),
              React.createElement("button", {
                onClick: function() {
                  sessionStorage.removeItem("kodox_token");
                  sessionStorage.removeItem("kodox_user");
                  window.location.replace("index.html");
                },
                style: { fontSize: 11, fontWeight: 700, color: "#ef4444", background: "transparent", border: "1px solid rgba(239,68,68,0.3)", padding: "5px 12px", borderRadius: 6, cursor: "pointer" }
              }, "Sign Out")
            )
          ),
          React.createElement(
            "div",
            { style: { maxWidth: 1100, margin: "0 auto", padding: "24px 16px" } },
            React.createElement("div", { style: { fontSize: 13, color: "#64748b", marginBottom: 20 } }, "Showing documents shared by the project team. Contact your superintendent to request additional access."),
            React.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" } },
              ["RFIs", "Submittals", "Change Orders", "Action Items"].map(function(label, i) {
                var keys = ["rfis", "submittals", "changeorders", "actions"];
                var active = tab === keys[i];
                return React.createElement("button", {
                  key: label,
                  onClick: function() {
                    setTab(keys[i]);
                  },
                  style: {
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: active ? 700 : 500,
                    fontSize: 13,
                    background: active ? "linear-gradient(135deg,#FF8A00,#cc6a00)" : "rgba(255,255,255,0.06)",
                    color: active ? "#fff" : darkMode ? "#94a3b8" : "#64748b"
                  }
                }, label);
              })
            ),
            // RFIs
            tab === "rfis" && React.createElement(
              "div",
              { style: { background: darkMode ? "#0d1520" : "#fff", borderRadius: 12, border: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), overflow: "hidden" } },
              React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), fontWeight: 700, fontSize: 14, color: darkMode ? "#e2e8f0" : "#1e293b" } }, "Shared RFIs"),
              rfis.filter(function(r) {
                return r.sharedExternal === true;
              }).length === 0 ? React.createElement("div", { style: { padding: 32, textAlign: "center", color: "#64748b", fontSize: 13 } }, "No RFIs have been shared with you yet.") : rfis.filter(function(r) {
                return r.sharedExternal === true;
              }).map(function(r) {
                return React.createElement(
                  "div",
                  { key: r.id, style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.04)" : "#f1f5f9") } },
                  React.createElement(
                    "div",
                    { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" } },
                    React.createElement(
                      "div",
                      null,
                      React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#818cf8", fontFamily: "monospace", marginRight: 8 } }, "#" + (r.rfiNumber || "\u2014")),
                      React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" } }, r.subject || "\u2014")
                    ),
                    React.createElement(
                      "span",
                      { style: {
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: r.status === "Answered" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                        color: r.status === "Answered" ? "#10b981" : "#f59e0b",
                        border: "1px solid " + (r.status === "Answered" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)")
                      } },
                      r.status || "Open"
                    )
                  ),
                  React.createElement(
                    "div",
                    { style: { display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" } },
                    r.submittedDate && React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "Submitted: " + r.submittedDate),
                    r.dueDate && React.createElement("span", { style: { fontSize: 11, color: r.dueDate < todayStr2 ? "#ef4444" : "#64748b" } }, "Due: " + r.dueDate),
                    r.answeredBy && React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "To: " + r.answeredBy)
                  ),
                  r.response && React.createElement("div", { style: { marginTop: 8, padding: "8px 12px", background: darkMode ? "rgba(16,185,129,0.06)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 6, fontSize: 12, color: darkMode ? "#a7f3d0" : "#065f46" } }, "Response: " + r.response),
                  r.notes && React.createElement("div", { style: { marginTop: 6, fontSize: 11, color: "#64748b" } }, r.notes)
                );
              })
            ),
            // Submittals
            tab === "submittals" && React.createElement(
              "div",
              { style: { background: darkMode ? "#0d1520" : "#fff", borderRadius: 12, border: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), overflow: "hidden" } },
              React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), fontWeight: 700, fontSize: 14, color: darkMode ? "#e2e8f0" : "#1e293b" } }, "Shared Submittals"),
              submittals.filter(function(s) {
                return s.sharedExternal === true;
              }).length === 0 ? React.createElement("div", { style: { padding: 32, textAlign: "center", color: "#64748b", fontSize: 13 } }, "No submittals have been shared with you yet.") : submittals.filter(function(s) {
                return s.sharedExternal === true;
              }).map(function(s) {
                return React.createElement(
                  "div",
                  { key: s.id, style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.04)" : "#f1f5f9") } },
                  React.createElement(
                    "div",
                    { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" } },
                    React.createElement(
                      "div",
                      null,
                      React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#818cf8", fontFamily: "monospace", marginRight: 8 } }, s.specSection || "\u2014"),
                      React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" } }, s.description || "\u2014")
                    ),
                    React.createElement(
                      "span",
                      { style: {
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: s.status === "Approved" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                        color: s.status === "Approved" ? "#10b981" : "#f59e0b",
                        border: "1px solid " + (s.status === "Approved" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)")
                      } },
                      s.status || "Pending"
                    )
                  ),
                  React.createElement(
                    "div",
                    { style: { display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" } },
                    s.submittedDate && React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "Submitted: " + s.submittedDate),
                    s.requiredDate && React.createElement("span", { style: { fontSize: 11, color: s.requiredDate < todayStr2 ? "#ef4444" : "#64748b" } }, "Required: " + s.requiredDate),
                    s.reviewer && React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "Reviewer: " + s.reviewer)
                  ),
                  s.notes && React.createElement("div", { style: { marginTop: 6, fontSize: 11, color: "#64748b" } }, s.notes)
                );
              })
            ),
            // Change Orders
            tab === "changeorders" && React.createElement(
              "div",
              { style: { background: darkMode ? "#0d1520" : "#fff", borderRadius: 12, border: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), overflow: "hidden" } },
              React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), fontWeight: 700, fontSize: 14, color: darkMode ? "#e2e8f0" : "#1e293b" } }, "Shared Change Orders"),
              changeOrders.filter(function(c) {
                return c.sharedExternal === "External";
              }).length === 0 ? React.createElement("div", { style: { padding: 32, textAlign: "center", color: "#64748b", fontSize: 13 } }, "No change orders have been shared with you yet.") : changeOrders.filter(function(c) {
                return c.sharedExternal === "External";
              }).map(function(c) {
                return React.createElement(
                  "div",
                  { key: c.id, style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.04)" : "#f1f5f9") } },
                  React.createElement(
                    "div",
                    { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" } },
                    React.createElement(
                      "div",
                      null,
                      React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#818cf8", fontFamily: "monospace", marginRight: 8 } }, c.coNumber || "\u2014"),
                      React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" } }, c.title || "\u2014")
                    ),
                    React.createElement(
                      "span",
                      { style: {
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: c.status === "Approved" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                        color: c.status === "Approved" ? "#10b981" : "#f59e0b",
                        border: "1px solid " + (c.status === "Approved" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)")
                      } },
                      c.status || "Pending"
                    )
                  ),
                  React.createElement(
                    "div",
                    { style: { display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" } },
                    c.date && React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "Date: " + c.date),
                    c.amount && React.createElement("span", { style: { fontSize: 11, fontWeight: 600, color: "#10b981" } }, "Amount: $" + Number(c.amount).toLocaleString()),
                    c.type && React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "Type: " + c.type)
                  ),
                  c.notes && React.createElement("div", { style: { marginTop: 6, fontSize: 11, color: "#64748b" } }, c.notes)
                );
              })
            ),
            // Action Items
            tab === "actions" && React.createElement(
              "div",
              { style: { background: darkMode ? "#0d1520" : "#fff", borderRadius: 12, border: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), overflow: "hidden" } },
              React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"), fontWeight: 700, fontSize: 14, color: darkMode ? "#e2e8f0" : "#1e293b" } }, "Shared Action Items"),
              actionItems.filter(function(a) {
                return a.sharedExternal === "External";
              }).length === 0 ? React.createElement("div", { style: { padding: 32, textAlign: "center", color: "#64748b", fontSize: 13 } }, "No action items have been shared with you yet.") : actionItems.filter(function(a) {
                return a.sharedExternal === "External";
              }).map(function(a) {
                return React.createElement(
                  "div",
                  { key: a.id, style: { padding: "12px 16px", borderBottom: "1px solid " + (darkMode ? "rgba(255,255,255,0.04)" : "#f1f5f9") } },
                  React.createElement(
                    "div",
                    { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" } },
                    React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" } }, a.action || a.description || "\u2014"),
                    React.createElement(
                      "span",
                      { style: {
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: a.status === "Closed" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                        color: a.status === "Closed" ? "#10b981" : "#f59e0b",
                        border: "1px solid " + (a.status === "Closed" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)")
                      } },
                      a.status || "Open"
                    )
                  ),
                  React.createElement(
                    "div",
                    { style: { display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" } },
                    a.owner && React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, "Owner: " + a.owner),
                    a.dueDate && React.createElement("span", { style: { fontSize: 11, color: a.dueDate < todayStr2 ? "#ef4444" : "#64748b" } }, "Due: " + a.dueDate)
                  )
                );
              })
            )
          )
        );
        return React.createElement(
          React.Fragment,
          null,
          aiOpen && React.createElement(AIAssistant, { open: aiOpen, onClose: () => setAiOpen(false), projects, tasks, dailyLogs, rfis, submittals, punchList, costCodes, changeOrders: changeOrders || [], inventory, actionItems, delays, safetyInsp, jsas, rental, S, darkMode, pN, companyName }),
          mobMenu && React.createElement("div", { onClick: () => setMobMenu(false), style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 299 } }),
          React.createElement("button", { onClick: () => setAiOpen((v) => !v), title: "KoDox AI Assistant", style: { position: "fixed", bottom: 24, right: 24, width: 52, height: 52, borderRadius: "50%", background: aiOpen ? "#1e293b" : "linear-gradient(135deg,#FF8A00,#cc6a00)", border: aiOpen ? "2px solid #FF8A00" : "none", color: "#fff", fontSize: 22, cursor: "pointer", boxShadow: "0 4px 20px rgba(255,138,0,0.4)", zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center" } }, aiOpen ? "\u2715" : "\u2728")
        );
      }
      function estimateMCAA(description, durationDays) {
        const d = (description || "").toLowerCase();
        let hours = 0;
        let basis = "";
        const pipeMatch = d.match(/(\d+(?:\.\d+)?)["\s]*(?:inch|in|")?[\s-]*(steel|copper|cpvc|pvc|cast[\s-]iron|stainless|carbon)/);
        const lfMatch = d.match(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:lf|l\.f\.|linear\s*f(?:eet|t|oot))/i);
        if (pipeMatch && lfMatch) {
          const dia = parseFloat(pipeMatch[1]);
          const mat = pipeMatch[2].replace(/[\s-]/g, "_");
          const lf = parseFloat(lfMatch[1].replace(/,/g, ""));
          const matKey = mat.includes("steel") ? d.includes("weld") ? "steel_welded" : "steel_threaded" : mat.includes("copper") ? "copper" : mat.includes("cpvc") ? "cpvc" : mat.includes("pvc") ? "pvc" : mat.includes("cast") ? "cast_iron" : mat.includes("stainless") ? "stainless" : "steel_threaded";
          const table = MCAA.pipe[matKey] || MCAA.pipe["steel_threaded"];
          const sizes = Object.keys(table).map(Number).sort((a, b) => a - b);
          const closest = sizes.reduce((p, c) => Math.abs(c - dia) < Math.abs(p - dia) ? c : p);
          hours = lf * (table[closest] || 0.2);
          basis = `${lf}LF \xD7 ${dia}" ${matKey.replace(/_/g, " ")} @ ${table[closest]} hrs/LF`;
        }
        if (!hours) {
          const fixMap = [
            [/water\s*closet|wc\b|toilet/, "water_closet"],
            [/urinal/, "urinal"],
            [/lavator|lav\b/, "lavatory"],
            [/kitchen\s*sink/, "sink_kitchen"],
            [/service\s*sink|mop\s*sink/, "sink_service"],
            [/shower/, "shower"],
            [/bathtub|tub\b/, "bathtub"],
            [/floor\s*drain/, "floor_drain"],
            [/drinking\s*fountain|bubbler/, "drinking_fountain"],
            [/water\s*heater.*electric/, "water_heater_elec"],
            [/water\s*heater.*gas/, "water_heater_gas"],
            [/commercial.*water\s*heater|water\s*heater.*commercial/, "water_heater_commercial"],
            [/boiler.*small|small.*boiler/, "boiler_small"],
            [/boiler.*medium|medium.*boiler/, "boiler_medium"],
            [/boiler.*large|large.*boiler/, "boiler_large"],
            [/pump.*small|small.*pump|condensate\s*pump/, "pump_small"],
            [/pump.*medium|circulation\s*pump/, "pump_medium"],
            [/pump.*large|large.*pump/, "pump_large"],
            [/backflow/, "backflow_preventer"],
            [/pressure.*regulat|prv\b/, "pressure_regulator"],
            [/expansion\s*tank/, "expansion_tank"],
            [/hose\s*bibb|hose\s*bib/, "hose_bibb"],
            [/cleanout/, "cleanout"],
            [/roof\s*drain/, "roof_drain"],
            [/grease\s*trap.*large|large.*grease/, "grease_trap_large"],
            [/grease\s*trap/, "grease_trap_small"],
            [/rpz|reduced\s*pressure/, "rpz"]
          ];
          const qtyMatch = d.match(/(\d+)\s*(?:ea|each|unit|pcs?)?/);
          const qty = qtyMatch ? parseInt(qtyMatch[1]) : 1;
          for (const [rx, key] of fixMap) {
            if (rx.test(d) && MCAA.fixtures[key]) {
              hours = qty * MCAA.fixtures[key];
              basis = `${qty} \xD7 ${key.replace(/_/g, " ")} @ ${MCAA.fixtures[key]} hrs/ea`;
              break;
            }
          }
        }
        if (!hours) {
          const hvacMap = [
            [/air\s*handl.*small|ahu.*small|small.*ahu/, "ahu_small"],
            [/air\s*handl.*medium|ahu.*medium/, "ahu_medium"],
            [/air\s*handl.*large|ahu.*large/, "ahu_large"],
            [/roof.*unit.*small|rtu.*small|small.*rtu/, "rtu_small"],
            [/roof.*unit|rtu\b/, "rtu_medium"],
            [/fan\s*coil|fcu\b/, "fan_coil"],
            [/unit\s*heater/, "unit_heater"],
            [/vav.*reheat|reheat.*vav/, "vav_box_with_reheat"],
            [/vav\b/, "vav_box"],
            [/chiller.*small/, "chiller_small"],
            [/chiller.*medium|chiller\b/, "chiller_medium"],
            [/chiller.*large/, "chiller_large"],
            [/cooling\s*tower.*large/, "cooling_tower_large"],
            [/cooling\s*tower/, "cooling_tower_small"],
            [/fire\s*damper/, "damper_fire"],
            [/smoke\s*damper/, "damper_smoke"]
          ];
          const qtyM = d.match(/(\d+)\s*(?:ea|each|unit)?/);
          const qty = qtyM ? parseInt(qtyM[1]) : 1;
          for (const [rx, key] of hvacMap) {
            if (rx.test(d) && MCAA.hvac[key]) {
              hours = qty * MCAA.hvac[key];
              basis = `${qty} \xD7 ${key.replace(/_/g, " ")} @ ${MCAA.hvac[key]} hrs/ea`;
              break;
            }
          }
        }
        if (!hours && durationDays > 0) {
          const isPlumb = /plumb|pipe|drain|sanit|domestic|fixture|water|sewer/.test(d);
          const isMech = /hvac|duct|mech|air|heat|cool|chiller|boiler|pump/.test(d);
          const dailyHrs = isPlumb ? 40 : isMech ? 48 : 32;
          hours = durationDays * dailyHrs * 0.5;
          basis = `Duration-based: ${durationDays}d \xD7 ${dailyHrs / 2} hrs/d (estimated)`;
        }
        return { hours: Math.round(hours * 10) / 10, basis };
      }
      function calcCrew(totalHours, durationDays, hoursPerDay) {
        hoursPerDay = hoursPerDay || 8;
        if (!totalHours || !durationDays) return { workers: 0, totalHours: 0 };
        const workersNeeded = totalHours / (durationDays * hoursPerDay);
        return {
          workers: Math.ceil(workersNeeded),
          workersExact: Math.round(workersNeeded * 10) / 10,
          totalHours,
          laborDays: Math.round(totalHours / hoursPerDay * 10) / 10
        };
      }
      function EquipmentInspections({ S, darkMode, projects, equipInsp, setEquipInsp, selProj }) {
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const dark = darkMode;
        const iS = S.iS;
        const lS = S.lS;
        const EQUIP_TYPES2 = ["Lull / Telehandler", "Forklift", "Scissor Lift", "Boom Lift", "Welding Machine", "Company Truck", "Other"];
        const CONDITIONS = ["Good - No Issues", "Fair - Minor Issues", "Poor - Needs Repair", "Out of Service - Do Not Use"];
        const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        function getWeekStart(d) {
          const dt = /* @__PURE__ */ new Date(d + "T12:00:00");
          const day = dt.getDay();
          const diff = dt.getDate() - (day === 0 ? 6 : day - 1);
          dt.setDate(diff);
          return dt.toISOString().split("T")[0];
        }
        function getWeekDates(ws) {
          const dates = [];
          const base = /* @__PURE__ */ new Date(ws + "T12:00:00");
          for (let i = 0; i < 7; i++) {
            const d = new Date(base);
            d.setDate(d.getDate() + i);
            dates.push(d.toISOString().split("T")[0]);
          }
          return dates;
        }
        function weekLabel(ws) {
          const d = getWeekDates(ws);
          const fmt2 = (s) => {
            const [, m, day] = s.split("-");
            return m + "/" + day;
          };
          return fmt2(d[0]) + " \u2013 " + fmt2(d[6]);
        }
        const today2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const [selectedWeek, setSelectedWeek] = useState(getWeekStart(today2));
        const [modal, setModal] = useState(false);
        const [form, setForm] = useState({});
        const [filterType, setFilterType] = useState("All");
        function changeWeek(delta) {
          const d = /* @__PURE__ */ new Date(selectedWeek + "T12:00:00");
          d.setDate(d.getDate() + delta * 7);
          setSelectedWeek(d.toISOString().split("T")[0]);
        }
        const filt = (arr) => arr.filter((x) => (!selProj || x.projectId === selProj) && (filterType === "All" || x.equipType === filterType));
        const weekDates = getWeekDates(selectedWeek);
        const weekInspections = filt(equipInsp).filter((x) => getWeekStart(x.date) === selectedWeek);
        const uniqueEquip = [...new Set(weekInspections.map((x) => (x.equipType || "") + "||" + (x.equipNum || "")))].filter(Boolean).map((k) => {
          const [t, n] = k.split("||");
          return { type: t, num: n };
        });
        const blank = { id: "", date: today2, projectId: selProj || "", equipType: EQUIP_TYPES2[0], equipNum: "", inspectedBy: "", hoursUsed: "", condition: CONDITIONS[0], oilOk: "", hydraulicsOk: "", tiresOk: "", lightsOk: "", hornOk: "", fireExtOk: "", safetyDevicesOk: "", fuelLevel: "", companyLogoOk: "", annualInspOk: "", userManualOk: "", notes: "" };
        function openNew(date, equipType, equipNum) {
          setForm({ ...blank, date: date || today2, equipType: equipType || EQUIP_TYPES2[0], equipNum: equipNum || "" });
          setModal(true);
        }
        function openEdit(r) {
          setForm({ ...r });
          setModal(true);
        }
        function del(id) {
          if (window.confirm("Delete inspection?")) setEquipInsp((l) => l.filter((x) => x.id !== id));
        }
        function save() {
          if (!form.equipNum || !form.inspectedBy) {
            alert("Equipment # and Inspected By are required.");
            return;
          }
          const rec = { ...form, id: form.id || uid2(), projectId: form.projectId || selProj || "" };
          setEquipInsp((l) => form.id ? l.map((x) => x.id === rec.id ? rec : x) : [rec, ...l]);
          setModal(false);
        }
        const condColor = (c) => {
          if (!c) return "#64748b";
          if (c.includes("Good")) return "#10b981";
          if (c.includes("Fair")) return "#f59e0b";
          if (c.includes("Poor")) return "#ef4444";
          if (c.includes("Out")) return "#7c3aed";
          return "#64748b";
        };
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F50D} Equipment Inspections"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Daily pre-use inspections \u2014 weekly chart view")), /* @__PURE__ */ React.createElement("button", { onClick: () => openNew(today2), style: S.btnP }, "+ New Inspection")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => changeWeek(-1), style: { ...S.btnS, padding: "6px 12px", fontSize: 13 } }, "\u25C0"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, ...S.text, fontSize: 14, minWidth: 140, textAlign: "center" } }, "Week of ", weekLabel(selectedWeek)), /* @__PURE__ */ React.createElement("button", { onClick: () => changeWeek(1), style: { ...S.btnS, padding: "6px 12px", fontSize: 13 } }, "\u25B6"), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedWeek(getWeekStart(today2)), style: { ...S.btnS, padding: "5px 10px", fontSize: 11 } }, "This Week"), /* @__PURE__ */ React.createElement("select", { value: filterType, onChange: (e) => setFilterType(e.target.value), style: { ...iS, minWidth: 160, fontSize: 12 } }, /* @__PURE__ */ React.createElement("option", { value: "All" }, "All Equipment Types"), EQUIP_TYPES2.map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t)))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", minWidth: 700 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, /* @__PURE__ */ React.createElement("th", { style: { padding: "8px 12px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", minWidth: 160 } }, "Equipment"), DAYS.map((d, i) => /* @__PURE__ */ React.createElement("th", { key: d, style: { padding: "8px 8px", textAlign: "center", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", background: weekDates[i] === today2 ? "rgba(255,138,0,0.08)" : "" } }, /* @__PURE__ */ React.createElement("div", null, d), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 400, opacity: 0.7 } }, weekDates[i] ? weekDates[i].slice(5).replace("-", "/") : ""))))), /* @__PURE__ */ React.createElement("tbody", null, uniqueEquip.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 8, style: { padding: "32px", textAlign: "center", ...S.text3, fontSize: 12 } }, "No inspections this week. Click + New Inspection to add one.")), uniqueEquip.map(({ type, num }) => /* @__PURE__ */ React.createElement(
          "tr",
          {
            key: type + num,
            style: S.tRow,
            onMouseEnter: (e) => e.currentTarget.style.background = dark ? "rgba(255,138,0,0.04)" : "rgba(255,138,0,0.02)",
            onMouseLeave: (e) => e.currentTarget.style.background = ""
          },
          /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, ...S.text } }, type), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, "#", num)),
          weekDates.map((date) => {
            const insp = weekInspections.find((x) => x.date === date && x.equipType === type && x.equipNum === num);
            return /* @__PURE__ */ React.createElement("td", { key: date, style: { padding: "5px 4px", textAlign: "center", background: date === today2 ? "rgba(255,138,0,0.04)" : "" } }, insp ? /* @__PURE__ */ React.createElement("div", { onClick: () => openEdit(insp), style: { cursor: "pointer", padding: "4px 6px", borderRadius: 6, background: condColor(insp.condition) + "22", border: "1px solid " + condColor(insp.condition) + "55", display: "inline-block", minWidth: 60 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: condColor(insp.condition) } }, insp.condition ? insp.condition.split(" - ")[0] : "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, ...S.text3 } }, insp.inspectedBy ? insp.inspectedBy.split(" ")[0] : ""), insp.hoursUsed ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "#FF8A00" } }, insp.hoursUsed, "h") : null) : /* @__PURE__ */ React.createElement("button", { onClick: () => openNew(date, type, num), style: { background: "none", border: "1px dashed " + (dark ? "#2a3150" : "#cbd5e1"), color: dark ? "#334155" : "#94a3b8", borderRadius: 6, padding: "6px 8px", cursor: "pointer", fontSize: 11, width: "100%" } }, "+"));
          })
        )))))), filt(equipInsp).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", fontSize: 11, fontWeight: 700, ...S.text, borderBottom: "1px solid " + (dark ? "#1a2035" : "#e2e8f0") } }, "All Inspections (Recent First)"), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["Date", "Equipment", "#", "Inspected By", "Hrs", "Condition", "Notes", ""].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "7px 10px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, filt(equipInsp).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 50).map((r) => /* @__PURE__ */ React.createElement(
          "tr",
          {
            key: r.id,
            style: S.tRow,
            onMouseEnter: (e) => e.currentTarget.style.background = dark ? "rgba(255,138,0,0.04)" : "rgba(255,138,0,0.02)",
            onMouseLeave: (e) => e.currentTarget.style.background = ""
          },
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontSize: 11, ...S.text } }, r.date),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontSize: 11, ...S.text } }, r.equipType),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontSize: 11, ...S.text3 } }, "#", r.equipNum),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontSize: 11, ...S.text } }, r.inspectedBy),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontSize: 11, color: "#FF8A00", fontFamily: "monospace" } }, r.hoursUsed || "\u2014"),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px" } }, /* @__PURE__ */ React.createElement("span", { style: { padding: "2px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, background: condColor(r.condition) + "22", color: condColor(r.condition) } }, r.condition ? r.condition.split(" - ")[0] : "\u2014")),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontSize: 10, ...S.text3, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.notes || "\u2014"),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit(r), style: { ...S.btnS, padding: "3px 8px", fontSize: 11 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(r.id), style: { ...S.btnS, padding: "3px 8px", fontSize: 11, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Del")))
        )))))), modal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 620, maxHeight: "92vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text, marginBottom: 18 } }, form.id ? "Edit" : "New", " Equipment Inspection"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: form.date || "", onChange: (e) => setForm((p) => ({ ...p, date: e.target.value })), style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Project"), /* @__PURE__ */ React.createElement("select", { value: form.projectId || "", onChange: (e) => setForm((p) => ({ ...p, projectId: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select \u2014"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Equipment Type"), /* @__PURE__ */ React.createElement("select", { value: form.equipType || EQUIP_TYPES2[0], onChange: (e) => setForm((p) => ({ ...p, equipType: e.target.value })), style: iS }, EQUIP_TYPES2.map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Equipment # / Unit #"), /* @__PURE__ */ React.createElement("input", { value: form.equipNum || "", onChange: (e) => setForm((p) => ({ ...p, equipNum: e.target.value })), placeholder: "e.g. L-04, T-12", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Inspected By"), /* @__PURE__ */ React.createElement("input", { value: form.inspectedBy || "", onChange: (e) => setForm((p) => ({ ...p, inspectedBy: e.target.value })), placeholder: "Full name", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Hours Used Today"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hoursUsed || "", onChange: (e) => setForm((p) => ({ ...p, hoursUsed: e.target.value })), placeholder: "0", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "Equipment Condition"), /* @__PURE__ */ React.createElement("select", { value: form.condition || CONDITIONS[0], onChange: (e) => setForm((p) => ({ ...p, condition: e.target.value })), style: { ...iS, borderColor: condColor(form.condition) + "88", fontWeight: 700, color: condColor(form.condition) } }, CONDITIONS.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c)))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "Pre-Use Checklist"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 } }, [["oilOk", "Oil / Fluid Levels"], ["hydraulicsOk", "Hydraulics / Hoses"], ["tiresOk", "Tires / Tracks"], ["lightsOk", "Lights & Warning Devices"], ["hornOk", "Horn"], ["fireExtOk", "Fire Extinguisher"], ["safetyDevicesOk", "Safety Devices / Guards"], ["fuelLevel", "Fuel Level"], ["companyLogoOk", "Company Renting Logo Installed"], ["annualInspOk", "Mfg. Annual Inspection Placard"], ["userManualOk", "Equipment User Manual On-Site"]].map(([key, label]) => /* @__PURE__ */ React.createElement("div", { key }, /* @__PURE__ */ React.createElement("label", { style: lS }, label), /* @__PURE__ */ React.createElement("select", { value: form[key] || "", onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Check \u2014"), /* @__PURE__ */ React.createElement("option", { value: "Yes" }, "\u2713 OK"), /* @__PURE__ */ React.createElement("option", { value: "No" }, "\u2717 Not OK"), /* @__PURE__ */ React.createElement("option", { value: "N/A" }, "N/A"))))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "Condition Notes / Defects"), /* @__PURE__ */ React.createElement("textarea", { value: form.notes || "", onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })), rows: 3, placeholder: "Describe any issues, defects, or items requiring attention...", style: { ...iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setModal(false), style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: save, style: S.btnP }, "Save Inspection")))));
      }
      function ReportsHub({ S, darkMode, projects, selProj, companyName: companyName2, dailyLogs, fitterReports, foremanReports, manpowerEntries, delays: delays2, punchList, rfis, submittals, safetyInsp: safetyInsp2, safetyObs, qualityInsp, qualityObs, equipInsp, jsas: jsas2 }) {
        const dark = darkMode;
        const iS = S.iS;
        const lS = S.lS;
        const n = (v) => Number(v) || 0;
        const now = /* @__PURE__ */ new Date();
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
        const today2 = now.toISOString().split("T")[0];
        const [dateFrom, setDateFrom] = useState(firstOfMonth);
        const [dateTo, setDateTo] = useState(today2);
        const [selProjId, setSelProjId] = useState(selProj || "");
        const REPORT_OPTIONS = [
          { id: "dailylogs", label: "Daily Logs", icon: "\u{1F4CB}" },
          { id: "fitterreports", label: "Fitter Reports", icon: "\u{1F527}" },
          { id: "foremanreports", label: "Foreman Daily Reports", icon: "\u{1F4CB}" },
          { id: "manpower", label: "Manpower Report", icon: "\u{1F477}" },
          { id: "delays", label: "Delay Log", icon: "\u23F0" },
          { id: "punchlist", label: "Punch List", icon: "\u{1F534}" },
          { id: "rfis", label: "RFIs", icon: "\u2753" },
          { id: "submittals", label: "Submittals", icon: "\u{1F4C4}" },
          { id: "safetyinsp", label: "Safety Inspections", icon: "\u{1F50D}" },
          { id: "safetyobs", label: "Safety Observations", icon: "\u{1F441}" },
          { id: "qualityinsp", label: "Quality Inspections", icon: "\u2705" },
          { id: "qualityobs", label: "Quality Observations", icon: "\u{1F4DD}" },
          { id: "equipinsp", label: "Equipment Inspections", icon: "\u{1F50D}" },
          { id: "jsa", label: "Job Safety Analysis", icon: "\u{1F9BA}" }
        ];
        const [selected, setSelected] = useState(new Set(REPORT_OPTIONS.map((r) => r.id)));
        function toggleAll() {
          if (selected.size === REPORT_OPTIONS.length) setSelected(/* @__PURE__ */ new Set());
          else setSelected(new Set(REPORT_OPTIONS.map((r) => r.id)));
        }
        function toggle(id) {
          setSelected((prev) => {
            const s = new Set(prev);
            s.has(id) ? s.delete(id) : s.add(id);
            return s;
          });
        }
        const inRange = (date) => date && date >= dateFrom && date <= dateTo;
        const inProj = (id) => !selProjId || id === selProjId;
        const pN = (id) => (projects.find((p) => p.id === id) || {}).name || "\u2014";
        const fmt2 = (d) => {
          if (!d) return "\u2014";
          const [y, m, day] = d.split("-");
          return m + "/" + day + "/" + y;
        };
        const counts = {
          dailylogs: dailyLogs.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          fitterreports: fitterReports.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          foremanreports: foremanReports.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          manpower: manpowerEntries.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          delays: delays2.filter((r) => inRange(r.dateReported) && inProj(r.projectId)).length,
          punchlist: punchList.filter((r) => inProj(r.projectId)).length,
          rfis: rfis.filter((r) => inRange(r.dateSubmitted || r.date) && inProj(r.projectId)).length,
          submittals: submittals.filter((r) => inRange(r.dateSubmitted || r.date) && inProj(r.projectId)).length,
          safetyinsp: safetyInsp2.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          safetyobs: safetyObs.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          qualityinsp: qualityInsp.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          qualityobs: qualityObs.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          equipinsp: equipInsp.filter((r) => inRange(r.date) && inProj(r.projectId)).length,
          jsa: jsas2.filter((r) => inRange(r.date) && inProj(r.projectId)).length
        };
        function generateReport() {
          const co = companyName2 || "";
          const projName = selProjId ? pN(selProjId) : "All Projects";
          const rangeLabel = fmt2(dateFrom) + " \u2013 " + fmt2(dateTo);
          const css = `*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;font-size:12px;color:#1c2333;}.np{display:block;}@media print{.np{display:none!important;}@page{margin:.4in;}.pb{page-break-before:always;}}table{width:100%;border-collapse:collapse;}td,th{padding:6px 10px;border:1px solid #d1d8e0;font-size:11px;}th{background:#f0f4f7;font-weight:700;text-align:left;font-size:10px;text-transform:uppercase;}.sec-hdr{background:#1c2333;color:#fff;padding:10px 16px;font-size:13px;font-weight:700;margin:20px 0 10px;border-radius:6px;display:flex;justify-content:space-between;align-items:center;}.badge{font-size:10px;background:rgba(255,138,0,0.2);color:#FF8A00;padding:2px 8px;border-radius:4px;font-weight:700;}.pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;}`;
          const header = `<div style="background:#1c2333;color:#fff;padding:16px 20px;border-radius:6px 6px 0 0;display:flex;justify-content:space-between;align-items:center;margin-bottom:0;"><div><div style="font-size:10px;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">Project Report Package</div><div style="font-size:22px;font-weight:700;">${projName}</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">${rangeLabel}</div></div><div style="text-align:right;"><div style="font-size:14px;font-weight:700;">${co}</div><div style="font-size:11px;color:#94a3b8;margin-top:4px;">Generated: ${fmt2(today2)}</div></div></div><div style="height:4px;background:linear-gradient(90deg,#1E5A8C,#FF8A00,#1E5A8C);margin-bottom:20px;"></div>`;
          const secHdr = (title, count, color) => `<div class="sec-hdr"><span>${title}</span><span class="badge">${count} records</span></div>`;
          const statusColor = (s) => {
            const m = { Open: "#ef4444", Active: "#ef4444", Closed: "#10b981", Resolved: "#10b981", Complete: "#10b981", Approved: "#10b981", "In Review": "#f59e0b", Pending: "#f59e0b", Draft: "#94a3b8" };
            return m[s] || "#64748b";
          };
          let sections = "";
          if (selected.has("dailylogs")) {
            const rows = dailyLogs.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => b.date.localeCompare(a.date));
            if (rows.length) {
              sections += secHdr("\u{1F4CB} Daily Logs", rows.length);
              sections += `<table><tr><th>Date</th><th>Project</th><th>Superintendent</th><th>Foreman</th><th>Weather</th><th>Manpower</th><th>Man-Hrs</th><th>Work Performed</th><th>Delays</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date}</td><td>${pN(r.projectId)}</td><td>${r.superintendent || "\u2014"}</td><td>${r.foreman || "\u2014"}</td><td>${r.weather || "\u2014"} ${r.tempLow || ""}${r.tempHigh ? "\u2013" + r.tempHigh + "\xB0F" : ""}</td><td style="text-align:center;">${r.manpower || "\u2014"}</td><td style="text-align:center;font-weight:700;color:#FF8A00;">${r.totalHoursDay || "\u2014"}</td><td style="max-width:200px;">${r.workPerformed || "\u2014"}</td><td style="color:${r.delays && r.delays !== "None" ? "#ef4444" : "inherit"};">${r.delays || "\u2014"}</td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("fitterreports")) {
            const rows = fitterReports.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => b.date.localeCompare(a.date));
            if (rows.length) {
              const totalLF = rows.reduce((s, r) => s + n(r.pipeLF), 0);
              const totalWelds = rows.reduce((s, r) => s + n(r.weldCount), 0);
              const totalHrs = rows.reduce((s, r) => s + n(r.hoursWorked), 0);
              const totalHangers = rows.reduce((s, r) => s + n(r.hangerCount), 0);
              sections += secHdr("\u{1F527} Fitter Reports", rows.length);
              sections += `<table style="margin-bottom:8px;background:#fff8f0;"><tr><th>Total Pipe LF</th><td style="font-weight:700;color:#10b981;">${totalLF.toFixed(0)} LF</td><th>Total Welds</th><td style="font-weight:700;color:#f59e0b;">${totalWelds}</td><th>Total Hangers</th><td style="font-weight:700;color:#8b5cf6;">${totalHangers}</td><th>Total Man-Hrs</th><td style="font-weight:700;color:#FF8A00;">${totalHrs}</td></tr></table>`;
              sections += `<table><tr><th>Date</th><th>Fitter</th><th>Foreman</th><th>Company</th><th>Area</th><th>Material/Size</th><th>LF</th><th>Welds</th><th>Hangers</th><th>Hrs</th><th>Work Performed</th><th>Obstacles</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date}</td><td style="font-weight:600;">${r.fitterName || "\u2014"}</td><td>${r.foreman || "\u2014"}</td><td>${r.company || "\u2014"}</td><td>${r.area || "\u2014"}</td><td>${r.pipeMaterial || ""} ${r.pipeSize || ""}</td><td style="font-weight:700;color:#10b981;">${r.pipeLF || "\u2014"}</td><td style="color:#f59e0b;font-weight:700;">${r.weldCount || "\u2014"}</td><td style="color:#8b5cf6;font-weight:700;">${r.hangerCount || "\u2014"}</td><td>${r.totalManHours || r.hoursWorked || "\u2014"}${r.shiftHours ? " (" + r.shiftHours + "h)" : ""}</td><td style="max-width:180px;">${r.workPerformed || "\u2014"}</td><td style="color:#ef4444;max-width:120px;">${r.obstaclesDelays || "\u2014"}</td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("foremanreports")) {
            const rows = foremanReports.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => b.date.localeCompare(a.date));
            if (rows.length) {
              sections += secHdr("\u{1F4CB} Foreman Daily Entries", rows.length);
              sections += `<table><tr><th>Date</th><th>Foreman</th><th>Company</th><th>Shift</th><th>Manpower</th><th>Man-Hrs</th><th>Pipe LF</th><th>Welds</th><th>Hangers</th><th>Work Direction</th><th>Issues</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date}</td><td style="font-weight:600;">${r.foremanName || "\u2014"}</td><td>${r.company || "\u2014"}</td><td>${r.shift || "\u2014"}</td><td style="text-align:center;">${r.totalManpower || "\u2014"}</td><td style="font-weight:700;color:#FF8A00;">${r.totalHours || "\u2014"}</td><td style="color:#10b981;font-weight:700;">${r.pipeLF || "\u2014"}</td><td style="color:#f59e0b;font-weight:700;">${r.weldCount || "\u2014"}</td><td style="color:#8b5cf6;font-weight:700;">${r.hangerCount || "\u2014"}</td><td style="max-width:160px;">${r.workDirection || "\u2014"}</td><td style="color:#ef4444;max-width:120px;">${r.issuesEncountered || "\u2014"}</td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("manpower")) {
            const rows = manpowerEntries.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => b.date.localeCompare(a.date));
            if (rows.length) {
              const totalMP = rows.reduce((s, r) => (r.tradeLines || []).reduce((ss2, tl) => ss2 + n(tl.workers), 0) + s, 0);
              const totalMH = rows.reduce((s, r) => (r.tradeLines || []).reduce((ss2, tl) => ss2 + n(tl.workers) * n(tl.hours || 8), 0) + s, 0);
              sections += secHdr("\u{1F477} Manpower Report", rows.length);
              sections += `<table style="margin-bottom:8px;background:#fff8f0;"><tr><th>Total Workers</th><td style="font-weight:700;color:#3b82f6;">${totalMP}</td><th>Total Man-Hours</th><td style="font-weight:700;color:#FF8A00;">${totalMH}</td></tr></table>`;
              sections += `<table><tr><th>Date</th><th>Project</th><th>Shift</th><th>Superintendent</th><th>Foreman</th><th>Trade</th><th>Workers</th><th>Hrs/Worker</th><th>Man-Hrs</th></tr>${rows.flatMap((r) => (r.tradeLines || []).filter((tl) => n(tl.workers) > 0).map((tl) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date}</td><td>${pN(r.projectId)}</td><td>${r.shift || "\u2014"}</td><td>${r.superintendent || "\u2014"}</td><td>${r.foreman || "\u2014"}</td><td>${tl.trade || "\u2014"}</td><td style="text-align:center;font-weight:700;color:#3b82f6;">${tl.workers}</td><td style="text-align:center;">${tl.hours || 8}</td><td style="text-align:center;font-weight:700;color:#FF8A00;">${n(tl.workers) * n(tl.hours || 8)}</td></tr>`)).join("")}</table>`;
            }
          }
          if (selected.has("delays")) {
            const rows = delays2.filter((r) => inRange(r.dateReported) && inProj(r.projectId)).sort((a, b) => (b.dateReported || "").localeCompare(a.dateReported || ""));
            if (rows.length) {
              const totalDays = rows.reduce((s, r) => s + n(r.daysLost), 0);
              sections += secHdr("\u23F0 Delay Log", rows.length);
              sections += `<table style="margin-bottom:8px;background:#fff8f0;"><tr><th>Total Delays</th><td style="font-weight:700;color:#ef4444;">${rows.length}</td><th>Total Days Lost</th><td style="font-weight:700;color:#f59e0b;">${totalDays}</td></tr></table>`;
              sections += `<table><tr><th>Date</th><th>Project</th><th>Type</th><th>Description</th><th>Trade</th><th>Days Lost</th><th>Notice Given</th><th>Cost Impact</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.dateReported || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.delayType || "\u2014"}</td><td>${r.description || "\u2014"}</td><td>${r.trade || "\u2014"}</td><td style="font-weight:700;color:#ef4444;text-align:center;">${r.daysLost || 0}</td><td style="color:${r.noticeGiven === "Yes" ? "#10b981" : "#ef4444"};">${r.noticeGiven || "No"}</td><td style="color:#f59e0b;">${r.costImpact ? "$" + Number(r.costImpact).toLocaleString() : "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("punchlist")) {
            const rows = punchList.filter((r) => inProj(r.projectId)).sort((a, b) => (a.status || "").localeCompare(b.status || ""));
            if (rows.length) {
              sections += secHdr("\u{1F534} Punch List", rows.length);
              sections += `<table><tr><th>Project</th><th>Area</th><th>Trade</th><th>Description</th><th>Assignee</th><th>Due Date</th><th>Priority</th><th>Status</th></tr>${rows.map((r) => `<tr><td>${pN(r.projectId)}</td><td>${r.area || "\u2014"}</td><td>${r.trade || "\u2014"}</td><td>${r.description || "\u2014"}</td><td>${r.assignee || "\u2014"}</td><td style="white-space:nowrap;font-family:monospace;color:${r.dueDate < today2 ? "#ef4444" : "inherit"};">${r.dueDate || "\u2014"}</td><td>${r.priority || "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("rfis")) {
            const rows = rfis.filter((r) => inRange(r.dateSubmitted || r.date) && inProj(r.projectId)).sort((a, b) => (b.dateSubmitted || b.date || "").localeCompare(a.dateSubmitted || a.date || ""));
            if (rows.length) {
              sections += secHdr("\u2753 RFIs", rows.length);
              sections += `<table><tr><th>Date</th><th>RFI #</th><th>Project</th><th>Subject</th><th>From</th><th>To</th><th>Due</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.dateSubmitted || r.date || "\u2014"}</td><td style="font-weight:700;color:#FF8A00;">${r.rfiNumber || r.number || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.subject || r.description || "\u2014"}</td><td>${r.from || r.submittedBy || "\u2014"}</td><td>${r.to || r.assignedTo || "\u2014"}</td><td style="font-family:monospace;color:${(r.dueDate || r.due) < today2 ? "#ef4444" : "inherit"};">${r.dueDate || r.due || "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("submittals")) {
            const rows = submittals.filter((r) => inRange(r.dateSubmitted || r.date) && inProj(r.projectId)).sort((a, b) => (b.dateSubmitted || b.date || "").localeCompare(a.dateSubmitted || a.date || ""));
            if (rows.length) {
              sections += secHdr("\u{1F4C4} Submittals", rows.length);
              sections += `<table><tr><th>Date</th><th>Submittal #</th><th>Project</th><th>Description</th><th>Trade</th><th>Due</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.dateSubmitted || r.date || "\u2014"}</td><td style="font-weight:700;color:#FF8A00;">${r.submittalNumber || r.number || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.description || r.subject || "\u2014"}</td><td>${r.trade || "\u2014"}</td><td style="font-family:monospace;color:${(r.dueDate || r.due) < today2 ? "#ef4444" : "inherit"};">${r.dueDate || r.due || "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("safetyinsp")) {
            const rows = safetyInsp2.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
            if (rows.length) {
              sections += secHdr("\u{1F50D} Safety Inspections", rows.length);
              sections += `<table><tr><th>Date</th><th>Project</th><th>Type</th><th>Inspector</th><th>Risk Level</th><th>Findings</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.inspectionType || r.type || "\u2014"}</td><td>${r.inspector || r.inspectedBy || "\u2014"}</td><td style="color:${r.riskLevel === "High" ? "#ef4444" : r.riskLevel === "Medium" ? "#f59e0b" : "#10b981"};font-weight:700;">${r.riskLevel || "\u2014"}</td><td>${r.findings || r.notes || "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("safetyobs")) {
            const rows = safetyObs.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
            if (rows.length) {
              sections += secHdr("\u{1F441} Safety Observations", rows.length);
              sections += `<table><tr><th>Date</th><th>Project</th><th>Observer</th><th>Type</th><th>Description</th><th>Corrective Action</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.observer || r.observedBy || "\u2014"}</td><td>${r.observationType || r.type || "\u2014"}</td><td>${r.description || r.observation || "\u2014"}</td><td>${r.correctiveAction || "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("qualityinsp")) {
            const rows = qualityInsp.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
            if (rows.length) {
              sections += secHdr("\u2705 Quality Inspections", rows.length);
              sections += `<table><tr><th>Date</th><th>Project</th><th>Type</th><th>Inspector</th><th>Area</th><th>Result</th><th>Notes</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.inspectionType || r.type || "\u2014"}</td><td>${r.inspector || r.inspectedBy || "\u2014"}</td><td>${r.area || r.location || "\u2014"}</td><td style="font-weight:700;color:${r.result === "Pass" || r.result === "Passed" ? "#10b981" : "#ef4444"};">${r.result || "\u2014"}</td><td>${r.notes || r.findings || "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("qualityobs")) {
            const rows = qualityObs.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
            if (rows.length) {
              sections += secHdr("\u{1F4DD} Quality Observations", rows.length);
              sections += `<table><tr><th>Date</th><th>Project</th><th>Observer</th><th>Area</th><th>Description</th><th>Action Required</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.observer || r.observedBy || "\u2014"}</td><td>${r.area || r.location || "\u2014"}</td><td>${r.description || r.observation || "\u2014"}</td><td>${r.correctiveAction || r.actionRequired || "\u2014"}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("equipinsp")) {
            const rows = equipInsp.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => b.date.localeCompare(a.date));
            if (rows.length) {
              const condColor = (c) => {
                if (!c) return "#64748b";
                if (c.includes("Good")) return "#10b981";
                if (c.includes("Fair")) return "#f59e0b";
                if (c.includes("Poor")) return "#ef4444";
                if (c.includes("Out")) return "#7c3aed";
                return "#64748b";
              };
              sections += secHdr("\u{1F50D} Equipment Inspections", rows.length);
              sections += `<table><tr><th>Date</th><th>Equipment</th><th>#</th><th>Inspected By</th><th>Hours</th><th>Oil</th><th>Hydraulics</th><th>Tires</th><th>Lights</th><th>Horn</th><th>Fire Ext</th><th>Condition</th><th>Notes</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date}</td><td>${r.equipType || "\u2014"}</td><td>${r.equipNum || "\u2014"}</td><td>${r.inspectedBy || "\u2014"}</td><td style="text-align:center;">${r.hoursUsed || "\u2014"}</td><td style="text-align:center;color:${r.oilOk === "Yes" ? "#10b981" : "#ef4444"};">${r.oilOk || "\u2014"}</td><td style="text-align:center;color:${r.hydraulicsOk === "Yes" ? "#10b981" : "#ef4444"};">${r.hydraulicsOk || "\u2014"}</td><td style="text-align:center;color:${r.tiresOk === "Yes" ? "#10b981" : "#ef4444"};">${r.tiresOk || "\u2014"}</td><td style="text-align:center;color:${r.lightsOk === "Yes" ? "#10b981" : "#ef4444"};">${r.lightsOk || "\u2014"}</td><td style="text-align:center;color:${r.hornOk === "Yes" ? "#10b981" : "#ef4444"};">${r.hornOk || "\u2014"}</td><td style="text-align:center;color:${r.fireExtOk === "Yes" ? "#10b981" : "#ef4444"};">${r.fireExtOk || "\u2014"}</td><td><span class="pill" style="background:${condColor(r.condition)}22;color:${condColor(r.condition)};">${r.condition ? r.condition.split(" - ")[0] : "\u2014"}</span></td><td style="max-width:140px;">${r.notes || "\u2014"}</td></tr>`).join("")}</table>`;
            }
          }
          if (selected.has("jsa")) {
            const rows = jsas2.filter((r) => inRange(r.date) && inProj(r.projectId)).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
            if (rows.length) {
              sections += secHdr("\u{1F9BA} Job Safety Analysis", rows.length);
              sections += `<table><tr><th>Date</th><th>Project</th><th>JSA #</th><th>Task</th><th>Supervisor</th><th>Risk Level</th><th>Crew Signed In</th><th>Status</th></tr>${rows.map((r) => `<tr><td style="white-space:nowrap;font-family:monospace;">${r.date || "\u2014"}</td><td>${pN(r.projectId)}</td><td>${r.jsaNumber || "\u2014"}</td><td>${r.taskDescription || r.task || "\u2014"}</td><td>${r.supervisor || "\u2014"}</td><td style="color:${r.riskLevel === "High" ? "#ef4444" : r.riskLevel === "Medium" ? "#f59e0b" : "#10b981"};font-weight:700;">${r.riskLevel || "\u2014"}</td><td style="text-align:center;">${(r.crewSignons || []).length}</td><td><span class="pill" style="background:${statusColor(r.status)}22;color:${statusColor(r.status)};">${r.status || "\u2014"}</span></td></tr>`).join("")}</table>`;
              const jsaWithPhotos = rows.filter((r) => (r.crewSignons || []).some((s) => s.signInPhoto) || (r.crewSignoffs || []).some((s) => s.signOutPhoto));
              if (jsaWithPhotos.length) {
                sections += `<div style="margin-top:12px;padding:12px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;"><div style="font-size:10px;font-weight:700;color:#FF8A00;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">JSA SIGN-IN/OUT PHOTOS</div>`;
                jsaWithPhotos.forEach((r) => {
                  sections += `<div style="margin-bottom:12px;"><div style="font-size:11px;font-weight:700;color:#1c2333;margin-bottom:6px;">JSA #${r.jsaNumber || "\u2014"} \u2014 ${r.date} \u2014 ${r.taskDescription || ""}</div><div style="display:flex;flex-wrap:wrap;gap:8px;">`;
                  (r.crewSignons || []).forEach((s) => {
                    if (s.signInPhoto) sections += `<div style="text-align:center;"><img src="${s.signInPhoto}" style="width:100px;height:75px;object-fit:cover;border-radius:5px;border:2px solid #3b82f6;display:block;"/><div style="font-size:9px;color:#3b82f6;margin-top:2px;font-weight:700;">IN: ${s.name}</div><div style="font-size:8px;color:#64748b;">${s.signedAt || ""}</div></div>`;
                  });
                  (r.crewSignoffs || []).forEach((s) => {
                    if (s.signOutPhoto) sections += `<div style="text-align:center;"><img src="${s.signOutPhoto}" style="width:100px;height:75px;object-fit:cover;border-radius:5px;border:2px solid #10b981;display:block;"/><div style="font-size:9px;color:#10b981;margin-top:2px;font-weight:700;">OUT: ${s.name}</div><div style="font-size:8px;color:#64748b;">${s.signedAt || ""}</div></div>`;
                  });
                  sections += "</div></div>";
                });
                sections += "</div>";
              }
            }
          }
          if (!sections) {
            alert("No data found for the selected filters and date range.");
            return;
          }
          const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Report Package \u2014 ${projName} \u2014 ${rangeLabel}</title><style>${css}</style></head><body><div style="max-width:960px;margin:0 auto;padding:20px;"><div class="np" style="background:#1c2333;color:#e2e8f0;padding:9px 16px;border-radius:6px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;"><span style="font-weight:600;">Report Package \u2014 ${projName} \u2014 ${rangeLabel}</span><div style="display:flex;gap:8px;"><button onclick="window.print()" style="background:#FF8A00;border:none;color:#fff;padding:6px 14px;border-radius:5px;cursor:pointer;font-weight:700;">Print / PDF</button><button onclick="window.close()" style="background:#374151;border:none;color:#e2e8f0;padding:6px 12px;border-radius:5px;cursor:pointer;">Close</button></div></div>${header}${sections}<div style="margin-top:24px;border-top:1px solid #e2e8f0;padding-top:10px;display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;"><span>${co}</span><span>Report Package \xB7 ${rangeLabel} \xB7 CONFIDENTIAL</span></div></div></body></html>`;
          const w = window.open("", "_blank", "width=1100,height=800");
          w.document.write(html);
          w.document.close();
        }
        const totalSelected = REPORT_OPTIONS.filter((r) => selected.has(r.id) && counts[r.id] > 0).reduce((s, r) => s + counts[r.id], 0);
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F4CA} Reports Hub"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Select reports, set date range, generate one combined document")), /* @__PURE__ */ React.createElement("button", { onClick: generateReport, style: { ...S.btnP, padding: "10px 24px", fontSize: 14, fontWeight: 700 } }, "\u{1F5A8} Generate Report")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px 18px", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Project"), /* @__PURE__ */ React.createElement("select", { value: selProjId, onChange: (e) => setSelProjId(e.target.value), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "All Projects"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "From Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: dateFrom, onChange: (e) => setDateFrom(e.target.value), style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "To Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: dateTo, onChange: (e) => setDateTo(e.target.value), style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" } }, [
          ["This Week", () => {
            const d = /* @__PURE__ */ new Date();
            const mon = new Date(d);
            mon.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
            setDateFrom(mon.toISOString().split("T")[0]);
            setDateTo(today2);
          }],
          ["This Month", () => {
            setDateFrom(firstOfMonth);
            setDateTo(today2);
          }],
          ["Last Month", () => {
            const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const e = new Date(now.getFullYear(), now.getMonth(), 0);
            setDateFrom(d.toISOString().split("T")[0]);
            setDateTo(e.toISOString().split("T")[0]);
          }],
          ["Last 30 Days", () => {
            const d = /* @__PURE__ */ new Date();
            d.setDate(d.getDate() - 30);
            setDateFrom(d.toISOString().split("T")[0]);
            setDateTo(today2);
          }],
          ["Last 90 Days", () => {
            const d = /* @__PURE__ */ new Date();
            d.setDate(d.getDate() - 90);
            setDateFrom(d.toISOString().split("T")[0]);
            setDateTo(today2);
          }],
          ["This Year", () => {
            setDateFrom(now.getFullYear() + "-01-01");
            setDateTo(today2);
          }]
        ].map(([l, fn]) => /* @__PURE__ */ React.createElement("button", { key: l, onClick: fn, style: { ...S.btnS, padding: "4px 10px", fontSize: 11 } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px 18px", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text } }, "Select Reports to Include"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text3 } }, selected.size, " of ", REPORT_OPTIONS.length, " selected \xB7 ", totalSelected, " records"), /* @__PURE__ */ React.createElement("button", { onClick: toggleAll, style: { ...S.btnS, padding: "4px 12px", fontSize: 11 } }, selected.size === REPORT_OPTIONS.length ? "Deselect All" : "Select All"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 } }, REPORT_OPTIONS.map((r) => {
          const isSelected = selected.has(r.id);
          const count = counts[r.id] || 0;
          return /* @__PURE__ */ React.createElement("div", { key: r.id, onClick: () => toggle(r.id), style: {
            padding: "10px 12px",
            borderRadius: 8,
            cursor: "pointer",
            border: "2px solid " + (isSelected ? "#FF8A00" : dark ? "#1e2538" : "#e2e8f0"),
            background: isSelected ? dark ? "rgba(255,138,0,0.08)" : "#fff8f0" : dark ? "rgba(255,255,255,0.02)" : "#fafafa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "all .15s"
          } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 16, height: 16, borderRadius: 4, border: "2px solid " + (isSelected ? "#FF8A00" : dark ? "#334155" : "#cbd5e1"), background: isSelected ? "#FF8A00" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, isSelected && /* @__PURE__ */ React.createElement("span", { style: { color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1 } }, "\u2713")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: isSelected ? 700 : 400, ...S.text } }, r.icon, " ", r.label)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 4, background: count > 0 ? isSelected ? "rgba(255,138,0,0.15)" : "rgba(100,116,139,0.1)" : "transparent", color: count > 0 ? isSelected ? "#FF8A00" : dark ? "#64748b" : "#94a3b8" : dark ? "#334155" : "#cbd5e1" } }, count > 0 ? count : "\u2014"));
        }))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "20px 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: generateReport, style: { ...S.btnP, padding: "12px 40px", fontSize: 15, fontWeight: 700 } }, "\u{1F5A8} Generate Report Package"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 8 } }, "Opens a single printable document with all selected sections. Use Print / PDF to save.")));
      }
      function ForemanDailyReport({ S, darkMode, projects, fitterReports, setFitterReports, foremanReports, setForemanReports, selProj, companyName: companyName2 }) {
        const dark = darkMode;
        const iS = S.iS;
        const lS = S.lS;
        const n = (v) => Number(v) || 0;
        const fmt2 = (d) => {
          if (!d) return "\u2014";
          const [y, m, day] = d.split("-");
          return m + "/" + day + "/" + y;
        };
        const today2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const [selDate, setSelDate] = useState(today2);
        const [selForeman, setSelForeman] = useState("");
        const [editNoteFor, setEditNoteFor] = useState(null);
        const [noteVal, setNoteVal] = useState("");
        const [overallNote, setOverallNote] = useState("");
        const [editingOverall, setEditingOverall] = useState(false);
        const [overallNoteVal, setOverallNoteVal] = useState("");
        const [foremanModal, setForemanModal] = useState(false);
        const [foremanForm, setForemanForm] = useState({});
        const projReports = fitterReports.filter((r) => !selProj || r.projectId === selProj);
        const foremen = [...new Set(projReports.map((r) => (r.foreman || "").trim()).filter(Boolean))].sort();
        const dayReports = projReports.filter(
          (r) => r.date === selDate && (selForeman ? (r.foreman || "").trim() === selForeman : true)
        );
        const totals = {
          pipeLF: dayReports.reduce((s, r) => s + n(r.pipeLF), 0),
          welds: dayReports.reduce((s, r) => s + n(r.weldCount), 0),
          threads: dayReports.reduce((s, r) => s + n(r.threadCount), 0),
          fittings: dayReports.reduce((s, r) => s + n(r.fittingsInstalled), 0),
          hangers: dayReports.reduce((s, r) => s + n(r.hangerCount), 0),
          hrs: dayReports.reduce((s, r) => s + n(r.totalManHours || r.hoursWorked), 0),
          hFloorBase: dayReports.reduce((s, r) => s + n(r.hFloorBase), 0),
          hClevis: dayReports.reduce((s, r) => s + n(r.hClevis), 0),
          hTrapeze: dayReports.reduce((s, r) => s + n(r.hTrapeze), 0),
          hShoe: dayReports.reduce((s, r) => s + n(r.hShoe), 0),
          hSaddle: dayReports.reduce((s, r) => s + n(r.hSaddle), 0),
          hClamp: dayReports.reduce((s, r) => s + n(r.hClamp), 0),
          hUBolt: dayReports.reduce((s, r) => s + n(r.hUBolt), 0),
          hTrunnion: dayReports.reduce((s, r) => s + n(r.hTrunnion), 0),
          hSpring: dayReports.reduce((s, r) => s + n(r.hSpring), 0),
          anchorBolts: dayReports.reduce((s, r) => s + n(r.anchorBoltsQty), 0),
          instrTempTx: dayReports.reduce((s, r) => s + n(r.instrTempTx), 0),
          instrPressGauge: dayReports.reduce((s, r) => s + n(r.instrPressGauge), 0),
          instrDPTx: dayReports.reduce((s, r) => s + n(r.instrDPTx), 0),
          instrFlowMeter: dayReports.reduce((s, r) => s + n(r.instrFlowMeter), 0),
          instrRegulator: dayReports.reduce((s, r) => s + n(r.instrRegulator), 0),
          instrMagFlow: dayReports.reduce((s, r) => s + n(r.instrMagFlow), 0),
          instrLevelTx: dayReports.reduce((s, r) => s + n(r.instrLevelTx), 0),
          instrOther: dayReports.reduce((s, r) => s + n(r.instrOther), 0),
          manpower: dayReports.reduce((s, r) => {
            let mp = 1;
            if ((r.welderName || "").trim()) mp++;
            if ((r.laborName || "").trim()) mp++;
            if ((r.fireWatchName || "").trim()) mp++;
            if ((r.spotterName || "").trim()) mp++;
            return s + mp;
          }, 0)
        };
        const hangerTotal = totals.hFloorBase + totals.hClevis + totals.hTrapeze + totals.hShoe + totals.hSaddle + totals.hClamp + totals.hUBolt + totals.hTrunnion + totals.hSpring;
        const instrTotal = totals.instrTempTx + totals.instrPressGauge + totals.instrDPTx + totals.instrFlowMeter + totals.instrRegulator + totals.instrMagFlow + totals.instrLevelTx + totals.instrOther;
        function saveFitterNote(reportId) {
          setFitterReports((l) => l.map((r) => r.id === reportId ? { ...r, foremanNote: noteVal } : r));
          setEditNoteFor(null);
        }
        const foremanBlank = {
          id: "",
          date: selDate,
          projectId: selProj || "",
          foremanName: selForeman || "",
          company: "",
          shift: "Day",
          totalManpower: "",
          totalHours: "",
          pipeLF: "",
          pipeMaterial: "",
          pipeSize: "",
          fittingsInstalled: "",
          hangerCount: "",
          weldCount: "",
          threadCount: "",
          hFloorBase: "",
          hClevis: "",
          hTrapeze: "",
          hShoe: "",
          hSaddle: "",
          hClamp: "",
          hUBolt: "",
          hTrunnion: "",
          hSpring: "",
          anchorBoltsQty: "",
          instrTempTx: "",
          instrPressGauge: "",
          instrDPTx: "",
          instrFlowMeter: "",
          instrRegulator: "",
          instrMagFlow: "",
          instrLevelTx: "",
          instrOther: "",
          workDirection: "",
          gcCommunications: "",
          issuesEncountered: "",
          safetyNotes: "",
          notes: ""
        };
        function openForemanForm() {
          setForemanForm({ ...foremanBlank, date: selDate, foremanName: selForeman || "", projectId: selProj || "" });
          setForemanModal(true);
        }
        function editForemanEntry(r) {
          setForemanForm({ ...r });
          setForemanModal(true);
        }
        function delForemanEntry(id) {
          if (window.confirm("Delete this foreman entry?")) setForemanReports((l) => l.filter((x) => x.id !== id));
        }
        function saveForemanEntry() {
          if (!foremanForm.foremanName || !foremanForm.date) {
            alert("Foreman name and date are required.");
            return;
          }
          const rec = { ...foremanForm, id: foremanForm.id || uid2(), projectId: foremanForm.projectId || selProj || "" };
          setForemanReports((l) => foremanForm.id ? l.map((x) => x.id === rec.id ? rec : x) : [rec, ...l]);
          setForemanModal(false);
        }
        function printForemanReport() {
          const pN = (id) => (projects.find((p) => p.id === id) || {}).name || "\u2014";
          const fmt22 = (d) => {
            if (!d) return "\u2014";
            const [y, m, day] = d.split("-");
            return m + "/" + day + "/" + y;
          };
          const n2 = (v) => Number(v) || 0;
          const t2 = totals;
          const sfEntries = foremanReports.filter((x) => x.date === selDate && (selForeman ? x.foremanName === selForeman : true) && (!selProj || x.projectId === selProj));
          const combinedLF = t2.pipeLF + sfEntries.reduce((s, x) => s + n2(x.pipeLF), 0);
          const combinedHangers = t2.hangers + sfEntries.reduce((s, x) => s + n2(x.hangerCount), 0);
          const combinedWelds = t2.welds + sfEntries.reduce((s, x) => s + n2(x.weldCount), 0);
          const combinedHrs = t2.hrs + sfEntries.reduce((s, x) => s + n2(x.totalHours), 0);
          const combinedMP = t2.manpower + sfEntries.reduce((s, x) => s + n2(x.totalManpower), 0);
          const sec = (title, val, color) => val ? `<div style="margin-bottom:10px;padding:8px 12px;border-left:3px solid ${color || "#FF8A00"};background:#f8fafc;border-radius:0 6px 6px 0;"><div style="font-size:9px;font-weight:700;color:${color || "#FF8A00"};letter-spacing:1px;text-transform:uppercase;margin-bottom:3px;">${title}</div><div style="font-size:11px;color:#1c2333;line-height:1.5;">${val}</div></div>` : "";
          const statTD = (l, v, c) => `<td style="padding:8px 10px;text-align:center;"><div style="font-size:9px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">${l}</div><div style="font-size:18px;font-weight:800;color:${c};font-family:monospace;">${v}</div></td>`;
          const fitterRows = dayReports.map((r) => `
      <div style="margin-bottom:12px;padding:12px 14px;border:1px solid #e2e8f0;border-left:3px solid #FF8A00;border-radius:6px;background:#fff;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <div><strong style="font-size:13px;">${r.fitterName || "\u2014"}</strong><span style="font-size:11px;color:#64748b;margin-left:8px;">${[r.company, r.shift ? r.shift + " Shift" : null, r.area ? "Area: " + r.area : null].filter(Boolean).join(" \xB7 ")}</span></div>
          <div style="font-size:13px;font-weight:800;color:#FF8A00;">${r.totalManHours || r.hoursWorked || 0} man-hrs</div>${r.shiftHours ? `<div style="font-size:10px;color:#94a3b8;">${r.shiftHours}h shift</div>` : ""}
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:11px;">
          <tr>
            ${r.pipeLF ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Pipe LF:</strong> ${r.pipeLF} ${r.pipeMaterial || ""} ${r.pipeSize || ""}</td>` : ""}
            ${r.weldCount ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Welds:</strong> ${r.weldCount}</td>` : ""}
            ${r.hangerCount ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Hangers:</strong> ${r.hangerCount}</td>` : ""}
            ${r.fittingsInstalled ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Fittings:</strong> ${r.fittingsInstalled}</td>` : ""}
          </tr>
        </table>
        ${r.workPerformed ? `<div style="font-size:11px;color:#374151;margin-bottom:4px;"><strong>Work:</strong> ${r.workPerformed}</div>` : ""}
        ${r.obstaclesDelays ? `<div style="font-size:11px;color:#ef4444;"><strong>Obstacles:</strong> ${r.obstaclesDelays}</div>` : ""}
        ${r.foremanNote ? `<div style="font-size:11px;color:#1d4ed8;margin-top:4px;"><strong>Foreman Note:</strong> ${r.foremanNote}</div>` : ""}
      </div>`).join("");
          const sfRows = sfEntries.map((x) => `
      <div style="margin-bottom:12px;padding:12px 14px;border:1px solid #e2e8f0;border-left:3px solid #3b82f6;border-radius:6px;background:#fff;">
        <div style="font-size:11px;font-weight:700;color:#3b82f6;margin-bottom:6px;">FOREMAN DIRECT ENTRY</div>
        ${x.pipeLF || x.hangerCount || x.weldCount ? `<table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:11px;"><tr>${x.pipeLF ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Pipe LF:</strong> ${x.pipeLF}</td>` : ""}${x.weldCount ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Welds:</strong> ${x.weldCount}</td>` : ""}${x.hangerCount ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Hangers:</strong> ${x.hangerCount}</td>` : ""}${x.totalManpower ? `<td style="padding:3px 8px;border:1px solid #e2e8f0;"><strong>Manpower:</strong> ${x.totalManpower}</td>` : ""}</tr></table>` : ""}
        ${x.workDirection ? `<div style="font-size:11px;margin-bottom:4px;"><strong>Work Direction:</strong> ${x.workDirection}</div>` : ""}
        ${x.gcCommunications ? `<div style="font-size:11px;margin-bottom:4px;"><strong>GC Communications:</strong> ${x.gcCommunications}</div>` : ""}
        ${x.issuesEncountered ? `<div style="font-size:11px;color:#ef4444;margin-bottom:4px;"><strong>Issues:</strong> ${x.issuesEncountered}</div>` : ""}
        ${x.notes ? `<div style="font-size:11px;color:#64748b;"><strong>Notes:</strong> ${x.notes}</div>` : ""}
      </div>`).join("");
          const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Foreman Daily Report - ${selForeman || "All"} - ${selDate}</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;font-size:12px;color:#1c2333;}.np{display:block;}@media print{.np{display:none!important;}@page{margin:.4in;}}</style></head><body><div style="max-width:760px;margin:0 auto;padding:20px;"><div class="np" style="background:#1c2333;color:#e2e8f0;padding:9px 16px;border-radius:6px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;"><span style="font-weight:600;">Foreman Daily Report \u2014 ${selForeman || "All Foremen"} \u2014 ${fmt22(selDate)}</span><div style="display:flex;gap:8px;"><button onclick="window.print()" style="background:#FF8A00;border:none;color:#fff;padding:6px 14px;border-radius:5px;cursor:pointer;font-weight:700;">Print / PDF</button><button onclick="window.close()" style="background:#374151;border:none;color:#e2e8f0;padding:6px 12px;border-radius:5px;cursor:pointer;">Close</button></div></div><div style="background:#1c2333;color:#fff;padding:16px 20px;border-radius:6px 6px 0 0;display:flex;justify-content:space-between;align-items:center;"><div><div style="font-size:10px;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">Foreman Daily Report</div><div style="font-size:20px;font-weight:700;">${selForeman || "All Foremen"}</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">${fmt22(selDate)} \xB7 ${pN(selProj || "")}</div></div><div style="text-align:right;"><div style="font-size:13px;font-weight:700;">${companyName2 || ""}</div></div></div><div style="height:3px;background:linear-gradient(90deg,#1E5A8C,#FF8A00,#1E5A8C);margin-bottom:16px;"></div><table style="width:100%;border-collapse:collapse;margin-bottom:16px;background:#f8fafc;"><tr>${statTD("Fitters", dayReports.length, "#FF8A00")}${statTD("Manpower", combinedMP, "#3b82f6")}${statTD("Pipe LF", combinedLF.toFixed(0) + " LF", "#10b981")}${statTD("Hangers", combinedHangers, "#8b5cf6")}${statTD("Welds", combinedWelds, "#f59e0b")}${statTD("Man-Hrs", combinedHrs, "#06b6d4")}</tr></table>${dayReports.length ? `<div style="font-size:10px;font-weight:700;color:#FF8A00;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;border-bottom:2px solid #FF8A00;padding-bottom:6px;">FITTER REPORTS (${dayReports.length})</div>${fitterRows}` : ""}${sfRows ? `<div style="font-size:10px;font-weight:700;color:#3b82f6;letter-spacing:1px;text-transform:uppercase;margin:16px 0 10px;border-bottom:2px solid #3b82f6;padding-bottom:6px;">FOREMAN DIRECT ENTRIES</div>${sfRows}` : ""}${overallNote ? sec("Overall Foreman Notes", overallNote, "#FF8A00") : ""}<div style="margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:24px;"><div style="border-top:1px solid #1c2333;padding-top:6px;font-size:10px;color:#6b7280;">Foreman Signature / Date</div><div style="border-top:1px solid #1c2333;padding-top:6px;font-size:10px;color:#6b7280;">Superintendent Signature / Date</div></div><div style="margin-top:14px;border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;"><span>${companyName2 || ""}</span><span>Foreman Daily Report \xB7 ${fmt22(selDate)} \xB7 CONFIDENTIAL</span></div></div></body></html>`;
          const w = window.open("", "_blank", "width=960,height=750");
          w.document.write(html);
          w.document.close();
        }
        const secHdr = { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid " + (dark ? "#1e2538" : "#e2e8f0") };
        const statBox = (label, val, color, unit) => /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: color + "11", borderRadius: 8, border: "1px solid " + color + "33", textAlign: "center", borderTop: "3px solid " + color } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color, fontFamily: "JetBrains Mono,monospace" } }, val, unit && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 400, marginLeft: 3 } }, unit)));
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F4CB} Foreman Daily Report"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Auto-aggregates fitter reports by foreman and date")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: openForemanForm, style: S.btnS }, "+ My Entry"), /* @__PURE__ */ React.createElement("button", { onClick: printForemanReport, style: { ...S.btnS, color: "#3b82f6", border: "1px solid rgba(59,130,246,0.4)" } }, "\u{1F5A8} Print / PDF"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", marginBottom: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: selDate, onChange: (e) => setSelDate(e.target.value), style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Foreman"), /* @__PURE__ */ React.createElement("select", { value: selForeman, onChange: (e) => setSelForeman(e.target.value), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 All Foremen \u2014"), foremen.map((f) => /* @__PURE__ */ React.createElement("option", { key: f, value: f }, f))))), dayReports.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 12 } }, "\u{1F4CB}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text, marginBottom: 6 } }, "No fitter reports found"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3 } }, "for ", fmt2(selDate), selForeman ? " \u2014 Foreman: " + selForeman : "", "."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 8 } }, "Fitter reports with an assigned foreman will appear here automatically.")), dayReports.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10, marginBottom: 20 } }, statBox("Fitters", dayReports.length, "#FF8A00"), statBox("Manpower", totals.manpower, "#3b82f6"), statBox("Pipe LF", totals.pipeLF.toFixed(0), "#10b981", "LF"), statBox("Hangers", totals.hangers, "#8b5cf6"), statBox("Welds", totals.welds, "#f59e0b"), statBox("Man-Hrs", totals.hrs, "#06b6d4")), (() => {
          const sfEntries = foremanReports.filter((x) => x.date === selDate && (selForeman ? x.foremanName === selForeman : true) && (!selProj || x.projectId === selProj));
          return sfEntries.length > 0 ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { ...secHdr, color: "#3b82f6", borderBottomColor: dark ? "#1e2538" : "#dbeafe" } }, "Foreman Direct Entries \u2014 ", fmt2(selDate)), sfEntries.map((x) => /* @__PURE__ */ React.createElement("div", { key: x.id, style: { ...S.card, padding: "14px 16px", marginBottom: 10, borderLeft: "3px solid #3b82f6" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, ...S.text } }, x.foremanName, " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3, fontWeight: 400 } }, "\u2014 Direct Entry")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, [x.company, x.shift ? x.shift + " Shift" : null].filter(Boolean).join(" \xB7 "))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => editForemanEntry(x), style: { ...S.btnS, padding: "3px 10px", fontSize: 11 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => delForemanEntry(x.id), style: { ...S.btnS, padding: "3px 10px", fontSize: 11, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Del"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 } }, Number(x.totalManpower) > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 10px", background: "rgba(59,130,246,0.1)", borderRadius: 6, border: "1px solid rgba(59,130,246,0.3)", fontSize: 11, color: "#3b82f6", fontWeight: 600 } }, "Manpower: ", x.totalManpower), Number(x.totalHours) > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 10px", background: "rgba(6,182,212,0.1)", borderRadius: 6, border: "1px solid rgba(6,182,212,0.3)", fontSize: 11, color: "#06b6d4", fontWeight: 600 } }, "Hours: ", x.totalHours), Number(x.pipeLF) > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 10px", background: "rgba(16,185,129,0.1)", borderRadius: 6, border: "1px solid rgba(16,185,129,0.3)", fontSize: 11, color: "#10b981", fontWeight: 600 } }, "Pipe: ", x.pipeLF, " LF"), Number(x.weldCount) > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 10px", background: "rgba(245,158,11,0.1)", borderRadius: 6, border: "1px solid rgba(245,158,11,0.3)", fontSize: 11, color: "#f59e0b", fontWeight: 600 } }, "Welds: ", x.weldCount), Number(x.hangerCount) > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 10px", background: "rgba(139,92,246,0.1)", borderRadius: 6, border: "1px solid rgba(139,92,246,0.3)", fontSize: 11, color: "#8b5cf6", fontWeight: 600 } }, "Hangers: ", x.hangerCount)), x.workDirection && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 5, padding: "5px 8px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 5 } }, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "Work Direction:"), " ", x.workDirection), x.gcCommunications && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 5, padding: "5px 8px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 5 } }, /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, "GC Comms:"), " ", x.gcCommunications), x.issuesEncountered && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#ef4444", marginBottom: 5, padding: "5px 8px", background: "rgba(239,68,68,0.06)", borderRadius: 5, border: "1px solid rgba(239,68,68,0.2)" } }, "\u26A0 Issues: ", x.issuesEncountered), x.safetyNotes && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#f59e0b", padding: "5px 8px", background: "rgba(245,158,11,0.06)", borderRadius: 5, border: "1px solid rgba(245,158,11,0.2)" } }, "\u{1F9BA} Safety: ", x.safetyNotes)))) : null;
        })(), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: secHdr }, "Individual Fitter Reports \u2014 ", fmt2(selDate), selForeman ? " | Foreman: " + selForeman : ""), dayReports.sort((a, b) => (a.fitterName || "").localeCompare(b.fitterName || "")).map((r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { ...S.card, padding: "14px 16px", marginBottom: 12, borderLeft: "3px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text } }, r.fitterName || "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, [r.company, r.shift ? r.shift + " Shift" : null, r.area ? "Area: " + r.area : null].filter(Boolean).join(" \xB7 ")), r.systemDescription && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "System: ", r.systemDescription)), /* @__PURE__ */ React.createElement("div", { style: { padding: "6px 12px", background: dark ? "rgba(255,138,0,0.08)" : "#fff8f0", borderRadius: 8, border: "1px solid rgba(255,138,0,0.2)", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Man-Hrs"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, r.totalManHours || r.hoursWorked || 0), r.shiftHours && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3 } }, r.shiftHours, "h shift"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 } }, [["Pipe LF", r.pipeLF, "#10b981"], ["Welds", r.weldCount, "#f59e0b"], ["Threads", r.threadCount, "#3b82f6"], ["Fittings", r.fittingsInstalled, "#8b5cf6"], ["Hangers", r.hangerCount, "#06b6d4"]].map(
          ([l, v, c]) => n(v) > 0 ? /* @__PURE__ */ React.createElement("div", { key: l, style: { padding: "4px 10px", background: c + "11", borderRadius: 6, border: "1px solid " + c + "33", textAlign: "center", minWidth: 60 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, ...S.text3, letterSpacing: 0.5, textTransform: "uppercase" } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: c, fontFamily: "monospace" } }, v)) : null
        ), r.pipeMaterial && n(r.pipeLF) > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 10px", background: "rgba(100,116,139,0.1)", borderRadius: 6, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, ...S.text3, textTransform: "uppercase" } }, "Material"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, ...S.text } }, r.pipeMaterial, r.pipeSize ? " " + r.pipeSize : ""))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 } }, r.welderName && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, padding: "2px 8px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 5, color: "#f59e0b" } }, "Welder: ", r.welderName), r.laborName && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, padding: "2px 8px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 5, color: "#3b82f6" } }, "Labor: ", r.laborName), r.fireWatchName && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, padding: "2px 8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 5, color: "#ef4444" } }, "Fire Watch: ", r.fireWatchName), r.spotterName && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, padding: "2px 8px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 5, color: "#8b5cf6" } }, "Spotter: ", r.spotterName)), r.workPerformed && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 6, padding: "6px 10px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 6, lineHeight: 1.5 } }, r.workPerformed), r.obstaclesDelays && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#ef4444", marginBottom: 6, padding: "6px 10px", background: "rgba(239,68,68,0.06)", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)" } }, "\u26A0 Obstacles/Delays: ", r.obstaclesDelays), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, padding: "8px 10px", background: dark ? "rgba(255,138,0,0.05)" : "#fff8f0", borderRadius: 8, border: "1px solid rgba(255,138,0,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, marginBottom: 4 } }, "FOREMAN NOTE"), editNoteFor === r.id ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("textarea", { value: noteVal, onChange: (e) => setNoteVal(e.target.value), rows: 2, placeholder: "Add foreman notes for this fitter...", style: { ...iS, width: "100%", fontSize: 11, marginBottom: 6, resize: "vertical" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => saveFitterNote(r.id), style: { ...S.btnP, padding: "4px 12px", fontSize: 11 } }, "Save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditNoteFor(null), style: { ...S.btnS, padding: "4px 10px", fontSize: 11 } }, "Cancel"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text, flex: 1, lineHeight: 1.5 } }, r.foremanNote || /* @__PURE__ */ React.createElement("span", { style: { ...S.text3, fontStyle: "italic" } }, "No foreman notes added")), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setEditNoteFor(r.id);
          setNoteVal(r.foremanNote || "");
        }, style: { ...S.btnS, padding: "3px 10px", fontSize: 10, flexShrink: 0 } }, r.foremanNote ? "Edit" : "+ Note")))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 20, border: "2px solid rgba(255,138,0,0.35)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00" } }, "\u{1F4CB}"), "Foreman Daily Summary \u2014 ", fmt2(selDate), selForeman ? " | " + selForeman : ""), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: dark ? "rgba(255,138,0,0.08)" : "#fff8f0", borderRadius: 8, border: "1px solid rgba(255,138,0,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Total Fitters Under"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, dayReports.length)), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: dark ? "rgba(59,130,246,0.08)" : "#eff6ff", borderRadius: 8, border: "1px solid rgba(59,130,246,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Total Manpower"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#3b82f6", fontFamily: "monospace" } }, totals.manpower)), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: dark ? "rgba(16,185,129,0.08)" : "#f0fdf4", borderRadius: 8, border: "1px solid rgba(16,185,129,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Total Pipe Installed"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#10b981", fontFamily: "monospace" } }, totals.pipeLF.toFixed(0), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, "LF"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: dark ? "rgba(139,92,246,0.08)" : "#faf5ff", borderRadius: 8, border: "1px solid rgba(139,92,246,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Total Hangers / Supports"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#8b5cf6", fontFamily: "monospace" } }, totals.hangers)), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: dark ? "rgba(245,158,11,0.08)" : "#fffbeb", borderRadius: 8, border: "1px solid rgba(245,158,11,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Total Welds"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#f59e0b", fontFamily: "monospace" } }, totals.welds)), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: dark ? "rgba(6,182,212,0.08)" : "#ecfeff", borderRadius: 8, border: "1px solid rgba(6,182,212,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Total Man-Hours"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#06b6d4", fontFamily: "monospace" } }, totals.hrs))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid " + (dark ? "#1e2538" : "#e2e8f0") } }, totals.threads > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "5px 12px", background: "rgba(59,130,246,0.1)", borderRadius: 6, fontSize: 11, color: "#3b82f6", fontWeight: 600 } }, "Threaded Joints: ", totals.threads), totals.fittings > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "5px 12px", background: "rgba(139,92,246,0.1)", borderRadius: 6, fontSize: 11, color: "#8b5cf6", fontWeight: 600 } }, "Fittings: ", totals.fittings), totals.anchorBolts > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "5px 12px", background: "rgba(255,138,0,0.1)", borderRadius: 6, fontSize: 11, color: "#FF8A00", fontWeight: 600 } }, "Anchor Bolts: ", totals.anchorBolts)), hangerTotal > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: secHdr }, "Hanger Breakdown"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 6 } }, [["Floor Base / Steel", totals.hFloorBase], ["Clevis", totals.hClevis], ["Trapeze", totals.hTrapeze], ["Shoe", totals.hShoe], ["Saddle", totals.hSaddle], ["Clamp", totals.hClamp], ["U-Bolt", totals.hUBolt], ["Trunnion", totals.hTrunnion], ["Spring", totals.hSpring]].filter(([, v]) => v > 0).map(([l, v]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text3 } }, l), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "#8b5cf6", fontFamily: "monospace" } }, v))))), instrTotal > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: secHdr }, "Instrumentation"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 6 } }, [["Temp Transmitters", totals.instrTempTx], ["Pressure Gauges", totals.instrPressGauge], ["DP Transmitters", totals.instrDPTx], ["Flow Meters", totals.instrFlowMeter], ["Regulators", totals.instrRegulator], ["Mag Flow", totals.instrMagFlow], ["Level TX", totals.instrLevelTx], ["Other", totals.instrOther]].filter(([, v]) => v > 0).map(([l, v]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text3 } }, l), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "#06b6d4", fontFamily: "monospace" } }, v))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: secHdr }, "Overall Foreman Notes \u2014 ", fmt2(selDate)), editingOverall ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("textarea", { value: overallNoteVal, onChange: (e) => setOverallNoteVal(e.target.value), rows: 4, placeholder: "Overall observations, instructions, issues for the day...", style: { ...iS, width: "100%", resize: "vertical", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setOverallNote(overallNoteVal);
          setEditingOverall(false);
        }, style: { ...S.btnP, padding: "6px 16px", fontSize: 12 } }, "Save Notes"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingOverall(false), style: { ...S.btnS, padding: "6px 14px", fontSize: 12 } }, "Cancel"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text, flex: 1, lineHeight: 1.6 } }, overallNote || /* @__PURE__ */ React.createElement("span", { style: { ...S.text3, fontStyle: "italic" } }, "No overall notes for this date")), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setEditingOverall(true);
          setOverallNoteVal(overallNote);
        }, style: { ...S.btnP, padding: "6px 14px", fontSize: 11, flexShrink: 0 } }, overallNote ? "Edit Notes" : "+ Add Notes"))))), foremanModal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 680, maxHeight: "92vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, ...S.text, marginBottom: 18 } }, foremanForm.id ? "Edit" : "New", " Foreman Entry \u2014 ", fmt2(foremanForm.date || selDate)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: foremanForm.date || "", onChange: (e) => setForemanForm((p) => ({ ...p, date: e.target.value })), style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Foreman Name"), /* @__PURE__ */ React.createElement("input", { value: foremanForm.foremanName || "", onChange: (e) => setForemanForm((p) => ({ ...p, foremanName: e.target.value })), placeholder: "Foreman name", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Company"), /* @__PURE__ */ React.createElement("input", { value: foremanForm.company || "", onChange: (e) => setForemanForm((p) => ({ ...p, company: e.target.value })), placeholder: "Company", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Project"), /* @__PURE__ */ React.createElement("select", { value: foremanForm.projectId || "", onChange: (e) => setForemanForm((p) => ({ ...p, projectId: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select \u2014"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Shift"), /* @__PURE__ */ React.createElement("select", { value: foremanForm.shift || "Day", onChange: (e) => setForemanForm((p) => ({ ...p, shift: e.target.value })), style: iS }, ["Day", "Night", "Swing"].map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Total Manpower"), /* @__PURE__ */ React.createElement("input", { type: "number", value: foremanForm.totalManpower || "", onChange: (e) => setForemanForm((p) => ({ ...p, totalManpower: e.target.value })), placeholder: "# of workers", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "Production (for crew not submitting fitter reports)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Pipe LF"), /* @__PURE__ */ React.createElement("input", { type: "number", value: foremanForm.pipeLF || "", onChange: (e) => setForemanForm((p) => ({ ...p, pipeLF: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Welds"), /* @__PURE__ */ React.createElement("input", { type: "number", value: foremanForm.weldCount || "", onChange: (e) => setForemanForm((p) => ({ ...p, weldCount: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Hangers"), /* @__PURE__ */ React.createElement("input", { type: "number", value: foremanForm.hangerCount || "", onChange: (e) => setForemanForm((p) => ({ ...p, hangerCount: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Fittings"), /* @__PURE__ */ React.createElement("input", { type: "number", value: foremanForm.fittingsInstalled || "", onChange: (e) => setForemanForm((p) => ({ ...p, fittingsInstalled: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Threads"), /* @__PURE__ */ React.createElement("input", { type: "number", value: foremanForm.threadCount || "", onChange: (e) => setForemanForm((p) => ({ ...p, threadCount: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Total Man-Hours"), /* @__PURE__ */ React.createElement("input", { type: "number", value: foremanForm.totalHours || "", onChange: (e) => setForemanForm((p) => ({ ...p, totalHours: e.target.value })), placeholder: "0", style: iS })))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#3b82f6", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "Narrative"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Work Direction Given"), /* @__PURE__ */ React.createElement("textarea", { value: foremanForm.workDirection || "", onChange: (e) => setForemanForm((p) => ({ ...p, workDirection: e.target.value })), rows: 3, placeholder: "What work did you direct today...", style: { ...iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "GC Communications"), /* @__PURE__ */ React.createElement("textarea", { value: foremanForm.gcCommunications || "", onChange: (e) => setForemanForm((p) => ({ ...p, gcCommunications: e.target.value })), rows: 3, placeholder: "Meetings, RFIs, directives...", style: { ...iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Issues / Obstacles"), /* @__PURE__ */ React.createElement("textarea", { value: foremanForm.issuesEncountered || "", onChange: (e) => setForemanForm((p) => ({ ...p, issuesEncountered: e.target.value })), rows: 3, placeholder: "Problems encountered...", style: { ...iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Safety Notes"), /* @__PURE__ */ React.createElement("textarea", { value: foremanForm.safetyNotes || "", onChange: (e) => setForemanForm((p) => ({ ...p, safetyNotes: e.target.value })), rows: 3, placeholder: "Safety observations, incidents...", style: { ...iS, resize: "vertical" } })))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "Additional Notes"), /* @__PURE__ */ React.createElement("textarea", { value: foremanForm.notes || "", onChange: (e) => setForemanForm((p) => ({ ...p, notes: e.target.value })), rows: 3, placeholder: "Any other notes...", style: { ...iS, width: "100%", resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setForemanModal(false), style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: saveForemanEntry, style: S.btnP }, "Save Entry")))));
      }
      function FitterReport({ S, darkMode, projects, fitterReports, setFitterReports, selProj, companyName: companyName2 }) {
        const [modal, setModal] = useState(false);
        const [form, setForm] = useState({});
        const blank = {
          id: "",
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          projectId: "",
          fitterName: "",
          foreman: "",
          company: "",
          shift: "Day",
          shiftHours: "10",
          totalManHours: "",
          welderName: "",
          laborName: "",
          fireWatchName: "",
          spotterName: "",
          pipeMaterial: "",
          pipeSize: "",
          pipeLF: "",
          fittingsInstalled: "",
          hangerCount: "",
          weldCount: "",
          threadCount: "",
          area: "",
          hFloorBase: "",
          hClevis: "",
          hTrapeze: "",
          hShoe: "",
          hSaddle: "",
          hClamp: "",
          hUBolt: "",
          hTrunnion: "",
          hSpring: "",
          hGuidedRigid: "",
          hWithWearPad: "",
          hSeismic: "Non-Seismic",
          systemDescription: "",
          workPerformed: "",
          obstaclesDelays: "",
          anchorBoltsQty: "",
          anchorBoltLength: "",
          anchorBoltDepth: "",
          anchorBoltDia: "",
          anchorBoltType: "",
          instrTempTx: "",
          instrPressGauge: "",
          instrDPTx: "",
          instrFlowMeter: "",
          instrRegulator: "",
          instrMagFlow: "",
          instrLevelTx: "",
          instrOther: "",
          safetyIncidents: "No",
          notes: ""
        };
        const filt2 = (arr) => arr.filter((x) => !selProj || x.projectId === selProj);
        const reports = filt2(fitterReports).sort((a, b) => b.date.localeCompare(a.date));
        const totalLF = reports.reduce((s, r) => s + Number(r.pipeLF || 0), 0);
        const totalWelds = reports.reduce((s, r) => s + Number(r.weldCount || 0), 0);
        const totalHrs = reports.reduce((s, r) => s + Number(r.hoursWorked || 0), 0);
        function openAdd() {
          setForm({ ...blank });
          setModal(true);
        }
        function openEdit(r) {
          setForm({ ...r });
          setModal(true);
        }
        function del(id) {
          if (window.confirm("Delete this report?")) setFitterReports((l) => l.filter((x) => x.id !== id));
        }
        function save() {
          if (!form.fitterName || !form.date) {
            alert("Fitter name and date are required.");
            return;
          }
          const uid2 = () => Math.random().toString(36).slice(2, 9);
          const rec = { ...form, id: form.id || uid2(), projectId: form.projectId || selProj || "" };
          setFitterReports((l) => form.id ? l.map((x) => x.id === rec.id ? rec : x) : [rec, ...l]);
          setModal(false);
        }
        function printFitterReport(r) {
          const pN = (id) => (projects.find((p) => p.id === id) || {}).name || "\u2014";
          const row = (label, val) => val ? `<tr><th>${label}</th><td>${val}</td></tr>` : "";
          const sec = (title, val, color) => val ? `<div style="margin-bottom:12px;padding:10px 12px;border-left:3px solid ${color || "#FF8A00"};background:#f8fafc;border-radius:0 6px 6px 0;"><div style="font-size:9px;font-weight:700;color:${color || "#FF8A00"};letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">${title}</div><div style="font-size:12px;color:#1c2333;line-height:1.6;">${val}</div></div>` : "";
          const hangers = [["Floor Base/Steel", r.hFloorBase], ["Clevis", r.hClevis], ["Trapeze", r.hTrapeze], ["Shoe", r.hShoe], ["Saddle", r.hSaddle], ["Clamp", r.hClamp], ["U-Bolt", r.hUBolt], ["Trunnion", r.hTrunnion], ["Spring", r.hSpring]].filter(([, v]) => Number(v) > 0);
          const instr = [["Temp TX", r.instrTempTx], ["Press Gauge", r.instrPressGauge], ["DP TX", r.instrDPTx], ["Flow Meter", r.instrFlowMeter], ["Regulator", r.instrRegulator], ["Mag Flow", r.instrMagFlow], ["Level TX", r.instrLevelTx], ["Other", r.instrOther]].filter(([, v]) => Number(v) > 0);
          const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Fitter Report - ${r.fitterName} - ${r.date}</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;font-size:12px;color:#1c2333;}.np{display:block;}@media print{.np{display:none!important;}@page{margin:.4in;}}table{width:100%;border-collapse:collapse;}td,th{padding:6px 10px;border:1px solid #d1d8e0;font-size:11px;}th{background:#f0f4f7;font-weight:700;text-align:left;font-size:10px;text-transform:uppercase;width:160px;}</style></head><body><div style="max-width:750px;margin:0 auto;padding:20px;"><div class="np" style="background:#1c2333;color:#e2e8f0;padding:9px 16px;border-radius:6px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;"><span style="font-weight:600;">Fitter Report \u2014 ${r.fitterName} \u2014 ${r.date}</span><div style="display:flex;gap:8px;"><button onclick="window.print()" style="background:#FF8A00;border:none;color:#fff;padding:6px 14px;border-radius:5px;cursor:pointer;font-weight:700;">Print / PDF</button><button onclick="window.close()" style="background:#374151;border:none;color:#e2e8f0;padding:6px 12px;border-radius:5px;cursor:pointer;">Close</button></div></div><div style="background:#1c2333;color:#fff;padding:16px 20px;border-radius:6px 6px 0 0;display:flex;justify-content:space-between;align-items:center;"><div><div style="font-size:10px;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">Fitter Daily Report</div><div style="font-size:20px;font-weight:700;">${r.fitterName}</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">${r.date} \xB7 ${pN(r.projectId)}</div></div><div style="text-align:right;"><div style="font-size:13px;font-weight:700;">${companyName2 || ""}</div>${r.totalManHours ? `<div style="font-size:18px;font-weight:800;color:#FF8A00;">${r.totalManHours} Man-Hrs</div><div style="font-size:11px;color:#94a3b8;">${r.shiftHours}h shift</div>` : r.hoursWorked ? `<div style="font-size:18px;font-weight:800;color:#FF8A00;">${r.hoursWorked} Hrs</div>` : ""}</div></div><div style="height:3px;background:linear-gradient(90deg,#1E5A8C,#FF8A00,#1E5A8C);margin-bottom:16px;"></div><table style="margin-bottom:14px;">${row("Foreman", r.foreman)}${row("Company", r.company)}${row("Shift", r.shift)}${row("Area", r.area)}${row("System", r.systemDescription)}</table><table style="margin-bottom:14px;"><tr><th>Pipe Material</th><td>${r.pipeMaterial || "\u2014"}</td><th>Pipe Size</th><td>${r.pipeSize || "\u2014"}</td></tr><tr><th>Pipe LF</th><td style="font-weight:700;color:#FF8A00;">${r.pipeLF || "\u2014"}</td><th>Fittings</th><td>${r.fittingsInstalled || "\u2014"}</td></tr><tr><th>Welds</th><td style="font-weight:700;color:#10b981;">${r.weldCount || "\u2014"}</td><th>Threads</th><td>${r.threadCount || "\u2014"}</td></tr><tr><th>Hangers Total</th><td>${r.hangerCount || "\u2014"}</td><th>Shift Hours</th><td>${r.shiftHours || r.hoursWorked || "\u2014"} hrs \xB7 <strong style="color:#FF8A00;">${r.totalManHours || "\u2014"} man-hrs total</strong></td></tr></table>${hangers.length ? `<div style="margin-bottom:12px;"><div style="font-size:9px;font-weight:700;color:#8b5cf6;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">HANGER DETAIL</div><table>${hangers.map(([l, v]) => `<tr><th>${l}</th><td>${v}</td></tr>`).join("")}</table></div>` : ""}<table style="margin-bottom:14px;"><tr><th>Welder</th><td>${r.welderName || "\u2014"}</td><th>Labor</th><td>${r.laborName || "\u2014"}</td></tr><tr><th>Fire Watch</th><td>${r.fireWatchName || "\u2014"}</td><th>Spotter</th><td>${r.spotterName || "\u2014"}</td></tr></table>${instr.length ? `<div style="margin-bottom:12px;"><div style="font-size:9px;font-weight:700;color:#06b6d4;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">INSTRUMENTATION</div><table>${instr.map(([l, v]) => `<tr><th>${l}</th><td>${v}</td></tr>`).join("")}</table></div>` : ""}${sec("Work Performed", r.workPerformed, "#FF8A00")}${sec("Obstacles / Delays", r.obstaclesDelays, "#ef4444")}${r.foremanNote ? sec("Foreman Notes", r.foremanNote, "#3b82f6") : ""}${sec("Notes", r.notes, "#64748b")}<div style="margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:24px;"><div style="border-top:1px solid #1c2333;padding-top:6px;font-size:10px;color:#6b7280;">Fitter Signature / Date</div><div style="border-top:1px solid #1c2333;padding-top:6px;font-size:10px;color:#6b7280;">Foreman Signature / Date</div></div><div style="margin-top:14px;border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;"><span>${companyName2 || ""}</span><span>Fitter Report \xB7 ${r.date} \xB7 CONFIDENTIAL</span></div></div></body></html>`;
          const w = window.open("", "_blank", "width=900,height=700");
          w.document.write(html);
          w.document.close();
        }
        const dark = darkMode;
        const iS = S.iS;
        const lS = S.lS;
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F527} Fitter Report"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Daily production tracking for pipefitters and plumbers")), /* @__PURE__ */ React.createElement("button", { onClick: openAdd, style: S.btnP }, "+ New Fitter Report")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Total Reports"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#FF8A00", fontFamily: "JetBrains Mono,monospace" } }, reports.length)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #3b82f6" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Total Pipe LF"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#3b82f6", fontFamily: "JetBrains Mono,monospace" } }, totalLF.toFixed(0), " LF")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #10b981" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Total Welds"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#10b981", fontFamily: "JetBrains Mono,monospace" } }, totalWelds))), !reports.length ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center", ...S.text3 } }, 'No fitter reports yet. Click "+ New Fitter Report" to add one.') : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["Date", "Fitter", "Company", "Area", "Material / Size", "LF", "Welds", "Hrs", ""].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 12px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, reports.map((r, i) => /* @__PURE__ */ React.createElement(
          "tr",
          {
            key: r.id,
            style: { ...S.tRow },
            onMouseEnter: (e) => e.currentTarget.style.background = dark ? "rgba(255,138,0,0.05)" : "rgba(255,138,0,0.03)",
            onMouseLeave: (e) => e.currentTarget.style.background = ""
          },
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text, whiteSpace: "nowrap" } }, r.date),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, fontWeight: 600, ...S.text } }, r.fitterName),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, r.company || "\u2014"),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.area || r.systemDescription || "\u2014"),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, r.pipeSize ? (r.pipeMaterial + " " + r.pipeSize).trim() : "\u2014"),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, fontWeight: 700, color: "#FF8A00", fontFamily: "monospace" } }, r.pipeLF || "\u2014"),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, fontWeight: 700, color: "#10b981", fontFamily: "monospace" } }, r.weldCount || "\u2014"),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, r.totalManHours || r.hoursWorked || "\u2014", " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, ...S.text3 } }, r.totalManHours && r.shiftHours ? "(" + r.shiftHours + "h shift)" : "")),
          /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit(r), style: { ...S.btnS, padding: "4px 10px", fontSize: 11 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => printFitterReport(r), style: { ...S.btnS, padding: "4px 10px", fontSize: 11, color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)" } }, "Print"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(r.id), style: { ...S.btnS, padding: "4px 10px", fontSize: 11, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Del")))
        )))))), modal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 720, maxHeight: "90vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text, marginBottom: 20 } }, form.id ? "Edit" : "New", " Fitter Report"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: form.date || "", onChange: (e) => setForm((p) => ({ ...p, date: e.target.value })), style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Fitter Name"), /* @__PURE__ */ React.createElement("input", { value: form.fitterName || "", onChange: (e) => setForm((p) => ({ ...p, fitterName: e.target.value })), placeholder: "Full name", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Company"), /* @__PURE__ */ React.createElement("input", { value: form.company || "", onChange: (e) => setForm((p) => ({ ...p, company: e.target.value })), placeholder: "Employer", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Welder Name"), /* @__PURE__ */ React.createElement("input", { value: form.welderName || "", onChange: (e) => {
          const v = e.target.value;
          setForm((p) => {
            const crew = 1 + (v.trim() ? 1 : 0) + (p.laborName && p.laborName.trim() ? 1 : 0) + (p.fireWatchName && p.fireWatchName.trim() ? 1 : 0) + (p.spotterName && p.spotterName.trim() ? 1 : 0);
            return { ...p, welderName: v, totalManHours: p.shiftHours ? (crew * Number(p.shiftHours)).toFixed(1) : "" };
          });
        }, placeholder: "Welder", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Labor Name"), /* @__PURE__ */ React.createElement("input", { value: form.laborName || "", onChange: (e) => {
          const v = e.target.value;
          setForm((p) => {
            const crew = 1 + (p.welderName && p.welderName.trim() ? 1 : 0) + (v.trim() ? 1 : 0) + (p.fireWatchName && p.fireWatchName.trim() ? 1 : 0) + (p.spotterName && p.spotterName.trim() ? 1 : 0);
            return { ...p, laborName: v, totalManHours: p.shiftHours ? (crew * Number(p.shiftHours)).toFixed(1) : "" };
          });
        }, placeholder: "Laborer", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Fire Watch Name"), /* @__PURE__ */ React.createElement("input", { value: form.fireWatchName || "", onChange: (e) => {
          const v = e.target.value;
          setForm((p) => {
            const crew = 1 + (p.welderName && p.welderName.trim() ? 1 : 0) + (p.laborName && p.laborName.trim() ? 1 : 0) + (v.trim() ? 1 : 0) + (p.spotterName && p.spotterName.trim() ? 1 : 0);
            return { ...p, fireWatchName: v, totalManHours: p.shiftHours ? (crew * Number(p.shiftHours)).toFixed(1) : "" };
          });
        }, placeholder: "Fire watch", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Spotter Name"), /* @__PURE__ */ React.createElement("input", { value: form.spotterName || "", onChange: (e) => {
          const v = e.target.value;
          setForm((p) => {
            const crew = 1 + (p.welderName && p.welderName.trim() ? 1 : 0) + (p.laborName && p.laborName.trim() ? 1 : 0) + (p.fireWatchName && p.fireWatchName.trim() ? 1 : 0) + (v.trim() ? 1 : 0);
            return { ...p, spotterName: v, totalManHours: p.shiftHours ? (crew * Number(p.shiftHours)).toFixed(1) : "" };
          });
        }, placeholder: "Spotter", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Project"), /* @__PURE__ */ React.createElement("select", { value: form.projectId || "", onChange: (e) => setForm((p) => ({ ...p, projectId: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select Project \u2014"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Foreman"), /* @__PURE__ */ React.createElement("input", { value: form.foreman || "", onChange: (e) => setForm((p) => ({ ...p, foreman: e.target.value })), placeholder: "Foreman name", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Shift"), /* @__PURE__ */ React.createElement("select", { value: form.shift || "Day", onChange: (e) => setForm((p) => ({ ...p, shift: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", null, "Day"), /* @__PURE__ */ React.createElement("option", null, "Night"), /* @__PURE__ */ React.createElement("option", null, "Overtime")))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingTop: 4 } }, "Hanger Types Installed"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Floor Base / Steel"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hFloorBase || "", onChange: (e) => setForm((p) => ({ ...p, hFloorBase: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Clevis Hangers"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hClevis || "", onChange: (e) => setForm((p) => ({ ...p, hClevis: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Trapeze Hangers"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hTrapeze || "", onChange: (e) => setForm((p) => ({ ...p, hTrapeze: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Shoe Support"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hShoe || "", onChange: (e) => setForm((p) => ({ ...p, hShoe: e.target.value })), placeholder: "0", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Saddle Support"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hSaddle || "", onChange: (e) => setForm((p) => ({ ...p, hSaddle: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Clamp Support"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hClamp || "", onChange: (e) => setForm((p) => ({ ...p, hClamp: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "U-Bolt Support"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hUBolt || "", onChange: (e) => setForm((p) => ({ ...p, hUBolt: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Trunnion"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hTrunnion || "", onChange: (e) => setForm((p) => ({ ...p, hTrunnion: e.target.value })), placeholder: "0", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Spring Support"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hSpring || "", onChange: (e) => setForm((p) => ({ ...p, hSpring: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Guided or Rigid"), /* @__PURE__ */ React.createElement("select", { value: form.hGuidedRigid || "", onChange: (e) => setForm((p) => ({ ...p, hGuidedRigid: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select \u2014"), /* @__PURE__ */ React.createElement("option", null, "Guided"), /* @__PURE__ */ React.createElement("option", null, "Rigid"), /* @__PURE__ */ React.createElement("option", null, "Both"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Wear Pad"), /* @__PURE__ */ React.createElement("select", { value: form.hWithWearPad || "", onChange: (e) => setForm((p) => ({ ...p, hWithWearPad: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select \u2014"), /* @__PURE__ */ React.createElement("option", null, "With Wear Pad"), /* @__PURE__ */ React.createElement("option", null, "Without Wear Pad")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Seismic Support"), /* @__PURE__ */ React.createElement("select", { value: form.hSeismic || "Non-Seismic", onChange: (e) => setForm((p) => ({ ...p, hSeismic: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", null, "Non-Seismic"), /* @__PURE__ */ React.createElement("option", null, "Seismic Support Installed"), /* @__PURE__ */ React.createElement("option", null, "Seismic Bracing \u2014 Longitudinal"), /* @__PURE__ */ React.createElement("option", null, "Seismic Bracing \u2014 Transverse"), /* @__PURE__ */ React.createElement("option", null, "Seismic Bracing \u2014 Both")))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingTop: 4 } }, "Pipe Production"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Material"), /* @__PURE__ */ React.createElement("select", { value: form.pipeMaterial || "", onChange: (e) => setForm((p) => ({ ...p, pipeMaterial: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select \u2014"), /* @__PURE__ */ React.createElement("option", null, "Carbon Steel"), /* @__PURE__ */ React.createElement("option", null, "Stainless Steel"), /* @__PURE__ */ React.createElement("option", null, "Copper"), /* @__PURE__ */ React.createElement("option", null, "Cast Iron"), /* @__PURE__ */ React.createElement("option", null, "CPVC"), /* @__PURE__ */ React.createElement("option", null, "PVC"), /* @__PURE__ */ React.createElement("option", null, "HDPE"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Pipe Size"), /* @__PURE__ */ React.createElement("input", { value: form.pipeSize || "", onChange: (e) => setForm((p) => ({ ...p, pipeSize: e.target.value })), placeholder: 'e.g. 4"', style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Linear Feet"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.pipeLF || "", onChange: (e) => setForm((p) => ({ ...p, pipeLF: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Hours of Shift"), /* @__PURE__ */ React.createElement("input", { type: "number", step: "0.5", value: form.shiftHours || "", onChange: (e) => {
          const hrs = e.target.value;
          const crew = 1 + (form.welderName && form.welderName.trim() ? 1 : 0) + (form.laborName && form.laborName.trim() ? 1 : 0) + (form.fireWatchName && form.fireWatchName.trim() ? 1 : 0) + (form.spotterName && form.spotterName.trim() ? 1 : 0);
          setForm((p) => ({ ...p, shiftHours: hrs, totalManHours: hrs ? (crew * Number(hrs)).toFixed(1) : "" }));
        }, placeholder: "10", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Total Man-Hours"), /* @__PURE__ */ React.createElement("div", { style: { ...iS, background: dark ? "rgba(255,138,0,0.06)" : "#fff8f0", border: "1px solid rgba(255,138,0,0.3)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: "#FF8A00", fontFamily: "monospace", fontSize: 14 } }, form.totalManHours || "\u2014"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, ...S.text3 } }, (() => {
          const crew = 1 + (form.welderName && form.welderName.trim() ? 1 : 0) + (form.laborName && form.laborName.trim() ? 1 : 0) + (form.fireWatchName && form.fireWatchName.trim() ? 1 : 0) + (form.spotterName && form.spotterName.trim() ? 1 : 0);
          return crew + " \xD7 " + (form.shiftHours || 0) + "h";
        })())))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Welds Made"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.weldCount || "", onChange: (e) => setForm((p) => ({ ...p, weldCount: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Threaded Joints"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.threadCount || "", onChange: (e) => setForm((p) => ({ ...p, threadCount: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Hangers"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.hangerCount || "", onChange: (e) => setForm((p) => ({ ...p, hangerCount: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Fittings"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.fittingsInstalled || "", onChange: (e) => setForm((p) => ({ ...p, fittingsInstalled: e.target.value })), placeholder: "0", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Area / Location"), /* @__PURE__ */ React.createElement("input", { value: form.area || "", onChange: (e) => setForm((p) => ({ ...p, area: e.target.value })), placeholder: "e.g. Level 2 Mech Room", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "System"), /* @__PURE__ */ React.createElement("input", { value: form.systemDescription || "", onChange: (e) => setForm((p) => ({ ...p, systemDescription: e.target.value })), placeholder: "e.g. CHW Supply Main", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "Work Performed"), /* @__PURE__ */ React.createElement("textarea", { defaultValue: form.workPerformed || "", onBlur: (e) => setForm((p) => ({ ...p, workPerformed: e.target.value })), rows: 3, placeholder: "Describe the work completed today...", style: { ...iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "Obstacles / Delays"), /* @__PURE__ */ React.createElement("textarea", { defaultValue: form.obstaclesDelays || "", onBlur: (e) => setForm((p) => ({ ...p, obstaclesDelays: e.target.value })), rows: 2, placeholder: "Any issues or delays...", style: { ...iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingTop: 4 } }, "Instrumentation Installed"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Temp Transmitters"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrTempTx || "", onChange: (e) => setForm((p) => ({ ...p, instrTempTx: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Pressure Gauges"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrPressGauge || "", onChange: (e) => setForm((p) => ({ ...p, instrPressGauge: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "DP Transmitters"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrDPTx || "", onChange: (e) => setForm((p) => ({ ...p, instrDPTx: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Flow Meters"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrFlowMeter || "", onChange: (e) => setForm((p) => ({ ...p, instrFlowMeter: e.target.value })), placeholder: "0", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Regulators"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrRegulator || "", onChange: (e) => setForm((p) => ({ ...p, instrRegulator: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Mag Flow Meters"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrMagFlow || "", onChange: (e) => setForm((p) => ({ ...p, instrMagFlow: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Level Transmitters"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrLevelTx || "", onChange: (e) => setForm((p) => ({ ...p, instrLevelTx: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Other (describe below)"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.instrOther || "", onChange: (e) => setForm((p) => ({ ...p, instrOther: e.target.value })), placeholder: "0", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingTop: 4 } }, "Anchor Bolts Installed"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Qty Installed"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.anchorBoltsQty || "", onChange: (e) => setForm((p) => ({ ...p, anchorBoltsQty: e.target.value })), placeholder: "0", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Diameter"), /* @__PURE__ */ React.createElement("input", { value: form.anchorBoltDia || "", onChange: (e) => setForm((p) => ({ ...p, anchorBoltDia: e.target.value })), placeholder: 'e.g. 3/4"', style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Length"), /* @__PURE__ */ React.createElement("input", { value: form.anchorBoltLength || "", onChange: (e) => setForm((p) => ({ ...p, anchorBoltLength: e.target.value })), placeholder: 'e.g. 6"', style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Embedment Depth"), /* @__PURE__ */ React.createElement("input", { value: form.anchorBoltDepth || "", onChange: (e) => setForm((p) => ({ ...p, anchorBoltDepth: e.target.value })), placeholder: 'e.g. 4.5"', style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Type"), /* @__PURE__ */ React.createElement("select", { value: form.anchorBoltType || "", onChange: (e) => setForm((p) => ({ ...p, anchorBoltType: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Select \u2014"), /* @__PURE__ */ React.createElement("option", null, "Wedge Anchor"), /* @__PURE__ */ React.createElement("option", null, "Sleeve Anchor"), /* @__PURE__ */ React.createElement("option", null, "Drop-In Anchor"), /* @__PURE__ */ React.createElement("option", null, "Epoxy / Chemical"), /* @__PURE__ */ React.createElement("option", null, "Screw Anchor"), /* @__PURE__ */ React.createElement("option", null, "Cast-In-Place")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Safety Incidents"), /* @__PURE__ */ React.createElement("select", { value: form.safetyIncidents || "No", onChange: (e) => setForm((p) => ({ ...p, safetyIncidents: e.target.value })), style: iS }, /* @__PURE__ */ React.createElement("option", { value: "No" }, "No Incidents"), /* @__PURE__ */ React.createElement("option", { value: "Near Miss" }, "Near Miss"), /* @__PURE__ */ React.createElement("option", { value: "First Aid" }, "First Aid"), /* @__PURE__ */ React.createElement("option", { value: "Recordable" }, "Recordable"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Notes"), /* @__PURE__ */ React.createElement("input", { value: form.notes || "", onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })), placeholder: "Additional notes...", style: iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setModal(false), style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: save, style: S.btnP }, "Save Report")))));
      }
      function DrawingsTab({ S, darkMode, projects, drawings, setDrawings, selProj, openAdd, openEdit, pN, filt, exp, showToast, rfis, punchList, authUser }) {
        const dark = darkMode;
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const today2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const currentUser2 = authUser && authUser.email || "Unknown";
        const [viewer, setViewer] = useState(null);
        const [tool, setTool] = useState("pin");
        const [addPinModal, setAddPinModal] = useState(null);
        const [pinForm, setPinForm] = useState({ type: "RFI", number: "", note: "", linkedId: "" });
        const [viewRevModal, setViewRevModal] = useState(null);
        const [uploadRevModal, setUploadRevModal] = useState(null);
        const [revForm, setRevForm] = useState({ revision: "", description: "" });
        const [filterDiscipline, setFilterDiscipline] = useState("All");
        const [filterStatus, setFilterStatus] = useState("All");
        const PIN_TYPES = {
          "RFI": { color: "#3b82f6", icon: "\u2753" },
          "Punch": { color: "#ef4444", icon: "\u{1F534}" },
          "Note": { color: "#f59e0b", icon: "\u{1F4DD}" },
          "Issue": { color: "#8b5cf6", icon: "\u26A0\uFE0F" },
          "Approved": { color: "#10b981", icon: "\u2705" }
        };
        function getRevisions(drawingNumber) {
          return drawings.filter((d) => d.drawingNumber === drawingNumber).sort((a, b) => (a.revision || "").localeCompare(b.revision || ""));
        }
        function getLatestRevision(drawingNumber) {
          const revs = getRevisions(drawingNumber);
          return revs[revs.length - 1] || null;
        }
        function isCurrentRevision(drawing) {
          const latest = getLatestRevision(drawing.drawingNumber);
          return latest && latest.id === drawing.id;
        }
        function getUniqueDrawings() {
          const seen = {};
          const rows = filt(drawings);
          rows.forEach((d) => {
            if (!seen[d.drawingNumber]) {
              seen[d.drawingNumber] = [];
            }
            seen[d.drawingNumber].push(d);
          });
          return Object.values(seen).map((revs) => revs.sort((a, b) => (a.revision || "").localeCompare(b.revision || "")).pop());
        }
        const uniqueDrawings = getUniqueDrawings().filter((d) => filterDiscipline === "All" || d.discipline === filterDiscipline).filter((d) => filterStatus === "All" || d.status === filterStatus).sort((a, b) => (a.drawingNumber || "").localeCompare(b.drawingNumber || ""));
        const disciplines = [...new Set(drawings.map((d) => d.discipline).filter(Boolean))];
        const statuses = [...new Set(drawings.map((d) => d.status).filter(Boolean))];
        function handleFileUpload(e, row) {
          const file = e.target.files[0];
          if (!file) return;
          if (file.size > 15 * 1024 * 1024) {
            showToast("File must be under 15MB", "error");
            return;
          }
          const reader = new FileReader();
          reader.onload = (ev) => {
            setDrawings((l) => l.map((d) => d.id === row.id ? { ...d, fileData: ev.target.result, fileName: file.name, fileType: file.type } : d));
            showToast("Drawing uploaded");
            if (viewer && viewer.id === row.id) setViewer((v) => ({ ...v, fileData: ev.target.result, fileName: file.name, fileType: file.type }));
          };
          reader.readAsDataURL(file);
          e.target.value = "";
        }
        function handleNewRevisionFile(e) {
          const file = e.target.files[0];
          if (!file) return;
          if (file.size > 15 * 1024 * 1024) {
            showToast("File must be under 15MB", "error");
            return;
          }
          const reader = new FileReader();
          reader.onload = (ev) => {
            setRevForm((p) => ({ ...p, fileData: ev.target.result, fileName: file.name, fileType: file.type }));
          };
          reader.readAsDataURL(file);
          e.target.value = "";
        }
        function saveNewRevision() {
          if (!revForm.revision.trim()) {
            alert("Revision label is required (e.g. Rev B)");
            return;
          }
          if (!revForm.fileData) {
            alert("Please upload a file for the new revision.");
            return;
          }
          const base = uploadRevModal;
          setDrawings((l) => l.map((d) => {
            if (d.drawingNumber === base.drawingNumber && d.id !== base.id) {
              return { ...d, status: "Superseded", isSuperseded: true };
            }
            if (d.drawingNumber === base.drawingNumber && d.id === base.id) {
              return { ...d, status: "Superseded", isSuperseded: true };
            }
            return d;
          }));
          const newRev = {
            ...base,
            id: uid2(),
            revision: revForm.revision.trim(),
            date: today2,
            status: "Issued for Construction",
            isSuperseded: false,
            fileData: revForm.fileData,
            fileName: revForm.fileName,
            fileType: revForm.fileType,
            revisionNote: revForm.description || "",
            uploadedBy: currentUser2,
            uploadedAt: today2,
            annotations: []
            // fresh markups for new revision
          };
          setDrawings((l) => [...l, newRev]);
          setUploadRevModal(null);
          setRevForm({ revision: "", description: "" });
          showToast("New revision uploaded \u2014 previous revisions marked superseded");
        }
        function handleViewerClick(e) {
          if (tool !== "pin") return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(2);
          const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(2);
          setAddPinModal({ x, y, drawingId: viewer.id });
          setPinForm({ type: "RFI", number: "", note: "", linkedId: "" });
        }
        function savePin() {
          if (!addPinModal) return;
          const pin = {
            id: uid2(),
            x: addPinModal.x,
            y: addPinModal.y,
            type: pinForm.type,
            number: pinForm.number,
            note: pinForm.note,
            linkedId: pinForm.linkedId || "",
            color: PIN_TYPES[pinForm.type]?.color || "#ef4444",
            icon: PIN_TYPES[pinForm.type]?.icon || "\u{1F4CD}",
            createdAt: today2,
            createdBy: currentUser2
          };
          setDrawings((l) => l.map(
            (d) => d.id === addPinModal.drawingId ? { ...d, annotations: [...d.annotations || [], pin] } : d
          ));
          if (viewer && viewer.id === addPinModal.drawingId) {
            setViewer((v) => ({ ...v, annotations: [...v.annotations || [], pin] }));
          }
          setAddPinModal(null);
          showToast("Markup saved");
        }
        function removePin(drawingId, pinId, createdBy) {
          if (createdBy !== currentUser2 && currentUser2 !== "kodoxsystemsllc@gmail.com") {
            alert("You can only delete your own markups. Contact an admin to remove others.");
            return;
          }
          setDrawings((l) => l.map(
            (d) => d.id === drawingId ? { ...d, annotations: (d.annotations || []).filter((p) => p.id !== pinId) } : d
          ));
          if (viewer && viewer.id === drawingId) {
            setViewer((v) => ({ ...v, annotations: (v.annotations || []).filter((p) => p.id !== pinId) }));
          }
        }
        function handlePinLink(pin, setTab) {
          if (!pin.linkedId) return;
          if (pin.type === "RFI") {
            setTab("rfis");
          } else if (pin.type === "Punch") {
            setTab("punchlist");
          }
        }
        const STATUS_COLORS = {
          "Issued for Construction": "#10b981",
          "For Review": "#f59e0b",
          "Preliminary": "#3b82f6",
          "Superseded": "#ef4444",
          "Void": "#6b7280",
          "Approved": "#10b981",
          "As-Built": "#8b5cf6"
        };
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F4DC} Drawings"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, uniqueDrawings.length, " drawing", uniqueDrawings.length !== 1 ? "s" : "", " \xB7 ", drawings.filter((d) => d.isSuperseded).length, " superseded revisions archived")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => exp(drawings, ["drawingNumber", "title", "discipline", "revision", "date", "status", "issuedBy", "fileName", "notes"], "drawings_export"), style: S.btnS }, "\u2B07 Export CSV"), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("drawings"), style: { ...S.btnP, background: "#0ea5e9" } }, "+ Add Drawing"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 12, marginBottom: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("select", { value: filterDiscipline, onChange: (e) => setFilterDiscipline(e.target.value), style: { ...S.iS, padding: "5px 10px", fontSize: 12, minWidth: 160 } }, /* @__PURE__ */ React.createElement("option", { value: "All" }, "All Disciplines"), disciplines.map((d) => /* @__PURE__ */ React.createElement("option", { key: d }, d))), /* @__PURE__ */ React.createElement("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), style: { ...S.iS, padding: "5px 10px", fontSize: 12, minWidth: 160 } }, /* @__PURE__ */ React.createElement("option", { value: "All" }, "All Statuses"), statuses.map((s) => /* @__PURE__ */ React.createElement("option", { key: s }, s))), (filterDiscipline !== "All" || filterStatus !== "All") && /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setFilterDiscipline("All");
          setFilterStatus("All");
        }, style: { ...S.btnS, padding: "4px 10px", fontSize: 11, color: "#ef4444" } }, "Clear"), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", fontSize: 11, ...S.text3 } }, uniqueDrawings.length, " shown")), !uniqueDrawings.length ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 12 } }, "\u{1F4DC}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 600, ...S.text, marginBottom: 8 } }, "No Drawings Yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3, marginBottom: 20 } }, "Add drawings to your log and upload PDF or image files to enable markup."), /* @__PURE__ */ React.createElement("button", { onClick: () => openAdd("drawings"), style: { ...S.btnP, background: "#0ea5e9" } }, "+ Add First Drawing")) : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["DWG #", "TITLE", "DISCIPLINE", "LATEST REV", "DATE", "STATUS", "REVISIONS", "FILE", "MARKUPS", "ACTIONS"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 12px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, uniqueDrawings.map((row) => {
          const revCount = getRevisions(row.drawingNumber).length;
          const sc2 = STATUS_COLORS[row.status] || "#64748b";
          const pins = row.annotations || [];
          return /* @__PURE__ */ React.createElement(
            "tr",
            {
              key: row.id,
              style: { ...S.tRow, cursor: "pointer" },
              onMouseEnter: (e) => e.currentTarget.style.background = dark ? "rgba(255,138,0,0.05)" : "rgba(14,165,233,0.04)",
              onMouseLeave: (e) => e.currentTarget.style.background = ""
            },
            /* @__PURE__ */ React.createElement("td", { onClick: () => setViewer(row), style: { padding: "9px 12px", fontWeight: 700, color: "#0ea5e9", fontFamily: "monospace", fontSize: 12 } }, row.drawingNumber || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { onClick: () => setViewer(row), style: { padding: "9px 12px", ...S.text, fontWeight: 500, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, row.title || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { onClick: () => setViewer(row), style: { padding: "9px 12px", ...S.text2 } }, row.discipline || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { onClick: () => setViewer(row), style: { padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.4)", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 800 } }, "\u2713 ", row.revision || "Rev 0")),
            /* @__PURE__ */ React.createElement("td", { onClick: () => setViewer(row), style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 11, ...S.text2 } }, row.date || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { onClick: () => setViewer(row), style: { padding: "9px 12px" } }, row.status ? /* @__PURE__ */ React.createElement("span", { style: { background: sc2 + "18", color: sc2, border: `1px solid ${sc2}40`, padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" } }, row.status) : "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, revCount > 1 ? /* @__PURE__ */ React.createElement(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setViewRevModal(row.drawingNumber);
                },
                style: { ...S.btnS, padding: "3px 9px", fontSize: 10, color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.4)" }
              },
              revCount,
              " revs"
            ) : /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, ...S.text3 } }, "1 rev")),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, row.fileData ? /* @__PURE__ */ React.createElement("button", { onClick: () => setViewer(row), style: { ...S.btnS, padding: "3px 9px", fontSize: 10, color: "#10b981", border: "1px solid rgba(16,185,129,0.4)" } }, "\u{1F4C4} View") : /* @__PURE__ */ React.createElement("label", { style: { ...S.btnS, padding: "3px 9px", fontSize: 10, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 } }, "\u2B06 Upload", /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".pdf,image/*", style: { display: "none" }, onChange: (e) => handleFileUpload(e, row) }))),
            /* @__PURE__ */ React.createElement("td", { onClick: () => setViewer(row), style: { padding: "9px 12px" } }, pins.length > 0 ? /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(255,138,0,0.1)", color: "#FF8A00", border: "1px solid rgba(255,138,0,0.3)", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700 } }, pins.length) : /* @__PURE__ */ React.createElement("span", { style: { ...S.text3, fontSize: 11 } }, "\u2014")),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
              e.stopPropagation();
              openEdit("drawings", row);
            }, style: { ...S.btnS, padding: "4px 9px", fontSize: 10 } }, "Edit"), /* @__PURE__ */ React.createElement(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setUploadRevModal(row);
                  setRevForm({ revision: "", description: "", fileData: null, fileName: "", fileType: "" });
                },
                style: { ...S.btnS, padding: "4px 9px", fontSize: 10, color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.4)" }
              },
              "+ Rev"
            )))
          );
        }))))), viewRevModal && (() => {
          const revs = getRevisions(viewRevModal).slice().reverse();
          return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text, marginBottom: 4 } }, "Revision History \u2014 ", viewRevModal), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 20 } }, "All revisions for this drawing. Latest is marked CURRENT."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, revs.map((rev, i) => {
            const isCurrent = i === 0;
            return /* @__PURE__ */ React.createElement("div", { key: rev.id, style: { padding: "12px 16px", borderRadius: 10, border: `1px solid ${isCurrent ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.3)"}`, background: isCurrent ? dark ? "rgba(16,185,129,0.08)" : "#f0fdf4" : dark ? "rgba(239,68,68,0.06)" : "#fff5f5" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 800, fontSize: 14, fontFamily: "monospace", ...S.text } }, rev.revision || "Rev 0"), isCurrent ? /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.4)", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 800 } }, "\u2713 CURRENT") : /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700 } }, "SUPERSEDED")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, rev.fileData && /* @__PURE__ */ React.createElement("button", { onClick: () => {
              setViewRevModal(null);
              setViewer(rev);
            }, style: { ...S.btnS, padding: "4px 9px", fontSize: 10 } }, "View"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, "Date: ", rev.date || "\u2014", " \xB7 Uploaded by: ", rev.uploadedBy || "\u2014"), rev.revisionNote && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text2, marginTop: 4 } }, "Note: ", rev.revisionNote), rev.issuedBy && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Issued by: ", rev.issuedBy), (rev.annotations || []).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#FF8A00", marginTop: 4 } }, (rev.annotations || []).length, " markup", (rev.annotations || []).length !== 1 ? "s" : "", " on this revision"));
          })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 20, display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setViewRevModal(null), style: S.btnS }, "Close"))));
        })(), uploadRevModal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 500 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text, marginBottom: 4 } }, "Upload New Revision"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 20 } }, "Drawing: ", /* @__PURE__ */ React.createElement("strong", { style: { ...S.text } }, uploadRevModal.drawingNumber, " \u2014 ", uploadRevModal.title)), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, fontSize: 12, color: "#ef4444", marginBottom: 16 } }, "\u26A0\uFE0F Uploading a new revision will mark ", /* @__PURE__ */ React.createElement("strong", null, uploadRevModal.revision || "Rev 0"), " and all previous revisions as ", /* @__PURE__ */ React.createElement("strong", null, "SUPERSEDED"), ". This cannot be undone."), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "New Revision Label"), /* @__PURE__ */ React.createElement("input", { value: revForm.revision || "", onChange: (e) => setRevForm((p) => ({ ...p, revision: e.target.value })), placeholder: "e.g. Rev B, Rev C, Rev 2", style: S.iS })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Revision Note (what changed)"), /* @__PURE__ */ React.createElement("input", { value: revForm.description || "", onChange: (e) => setRevForm((p) => ({ ...p, description: e.target.value })), placeholder: "e.g. Updated pipe routing on Level 3", style: S.iS })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Upload New Revision File (PDF or Image)"), /* @__PURE__ */ React.createElement("label", { style: { ...S.btnS, display: "block", textAlign: "center", cursor: "pointer", padding: "10px 0", borderRadius: 8, color: revForm.fileData ? "#10b981" : "#3b82f6", border: `1px solid ${revForm.fileData ? "rgba(16,185,129,0.4)" : "rgba(59,130,246,0.4)"}` } }, revForm.fileData ? "\u2713 " + revForm.fileName : "\u2B06 Choose File", /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".pdf,image/*", style: { display: "none" }, onChange: handleNewRevisionFile }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setUploadRevModal(null);
          setRevForm({ revision: "", description: "", fileData: null });
        }, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: saveNewRevision, style: { ...S.btnP, background: "linear-gradient(135deg,#8b5cf6,#6d28d9)" } }, "Upload New Revision")))), viewer && (() => {
          const isCurrent = isCurrentRevision(viewer);
          const allRevs = getRevisions(viewer.drawingNumber);
          const currentIdx = allRevs.findIndex((r) => r.id === viewer.id);
          return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 300, display: "flex", flexDirection: "column" } }, !isCurrent && /* @__PURE__ */ React.createElement("div", { style: { background: "#991b1b", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#fff" } }, "SUPERSEDED REVISION \u2014 DO NOT USE FOR CONSTRUCTION"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#fca5a5" } }, "This is ", viewer.revision || "Rev 0", " and has been superseded. Switch to the current revision below."))), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => setViewer(getLatestRevision(viewer.drawingNumber)),
              style: { background: "#fff", border: "none", color: "#991b1b", padding: "7px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 800, flexShrink: 0 }
            },
            "\u2192 Switch to Current"
          )), /* @__PURE__ */ React.createElement("div", { style: { background: "#0f172a", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, flexWrap: "wrap", borderBottom: "1px solid rgba(255,138,0,0.2)" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setViewer(null), style: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600 } }, "\u2715 Close"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "#fff", fontSize: 13, flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#0ea5e9", fontFamily: "monospace" } }, viewer.drawingNumber), /* @__PURE__ */ React.createElement("span", { style: { color: "rgba(255,255,255,0.5)", margin: "0 8px" } }, "\xB7"), viewer.title, /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 8, background: isCurrent ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)", color: isCurrent ? "#10b981" : "#ef4444", padding: "1px 7px", borderRadius: 4, fontSize: 10, fontWeight: 700 } }, viewer.revision || "Rev 0", " ", isCurrent ? "\xB7 CURRENT" : "\xB7 SUPERSEDED")), allRevs.length > 1 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "rgba(255,255,255,0.4)" } }, "REVISION:"), /* @__PURE__ */ React.createElement(
            "select",
            {
              value: viewer.id,
              onChange: (e) => {
                const rev = allRevs.find((r) => r.id === e.target.value);
                if (rev) setViewer(rev);
              },
              style: { background: "#1e293b", border: "1px solid rgba(255,255,255,0.15)", color: "#e2e8f0", padding: "4px 8px", borderRadius: 6, fontSize: 11 }
            },
            allRevs.slice().reverse().map((r) => /* @__PURE__ */ React.createElement("option", { key: r.id, value: r.id }, r.revision || "Rev 0", " ", r.id === getLatestRevision(viewer.drawingNumber)?.id ? "(Current)" : "(Superseded)"))
          )), viewer.fileData && isCurrent && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "rgba(255,255,255,0.4)", marginRight: 4 } }, "MARKUP:"), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => setTool(tool === "pin" ? "" : "pin"),
              style: { background: tool === "pin" ? "rgba(255,138,0,0.25)" : "rgba(255,255,255,0.06)", border: tool === "pin" ? "1px solid rgba(255,138,0,0.6)" : "1px solid rgba(255,255,255,0.1)", color: tool === "pin" ? "#FF8A00" : "#94a3b8", padding: "5px 11px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: tool === "pin" ? 700 : 400 }
            },
            "\u{1F4CD} Pin"
          ), (viewer.annotations || []).length > 0 && /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => {
                if (window.confirm("Clear ALL markups on this revision?")) setViewer((v) => {
                  const updated = { ...v, annotations: [] };
                  setDrawings((l) => l.map((d) => d.id === v.id ? updated : d));
                  return updated;
                });
              },
              style: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "5px 11px", borderRadius: 6, cursor: "pointer", fontSize: 11 }
            },
            "\u{1F5D1} Clear All"
          )), !viewer.fileData && /* @__PURE__ */ React.createElement("label", { style: { background: "linear-gradient(135deg,#0ea5e9,#0284c7)", border: "none", color: "#fff", padding: "7px 16px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 } }, "\u2B06 Upload Drawing File", /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".pdf,image/*", style: { display: "none" }, onChange: (e) => handleFileUpload(e, viewer) }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflow: "auto", display: "flex", gap: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, position: "relative", overflow: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 16 } }, viewer.fileData ? /* @__PURE__ */ React.createElement(
            "div",
            {
              style: { position: "relative", display: "inline-block", cursor: tool === "pin" && isCurrent ? "crosshair" : "default" },
              onClick: isCurrent ? handleViewerClick : void 0
            },
            viewer.fileType === "application/pdf" ? /* @__PURE__ */ React.createElement("iframe", { src: viewer.fileData, style: { width: "min(900px,90vw)", height: "80vh", border: "none", borderRadius: 8, display: "block" }, title: viewer.title }) : /* @__PURE__ */ React.createElement("img", { src: viewer.fileData, alt: viewer.title, style: { maxWidth: "min(900px,90vw)", maxHeight: "80vh", display: "block", borderRadius: 8, userSelect: "none" } }),
            viewer.fileType !== "application/pdf" && (viewer.annotations || []).map((pin) => /* @__PURE__ */ React.createElement(
              "div",
              {
                key: pin.id,
                title: `${pin.type}${pin.number ? " #" + pin.number : ""}: ${pin.note} \u2014 Added by ${pin.createdBy || "Unknown"}`,
                style: { position: "absolute", left: pin.x + "%", top: pin.y + "%", transform: "translate(-50%,-100%)", cursor: "pointer", zIndex: 10 },
                onClick: (e) => {
                  e.stopPropagation();
                }
              },
              /* @__PURE__ */ React.createElement("div", { style: { background: pin.color, color: "#fff", borderRadius: "50% 50% 50% 0", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, boxShadow: "0 2px 8px rgba(0,0,0,0.4)", border: "2px solid rgba(255,255,255,0.8)" } }, pin.icon),
              pin.number && /* @__PURE__ */ React.createElement("div", { style: { background: pin.color, color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 3, marginTop: 2, whiteSpace: "nowrap", textAlign: "center" } }, pin.type, " ", pin.number)
            ))
          ) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, color: "rgba(255,255,255,0.4)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 60 } }, "\u{1F4DC}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)" } }, "No file uploaded yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, "Upload a PDF or image to view and mark up this drawing"))), /* @__PURE__ */ React.createElement("div", { style: { width: 270, background: "#0d1117", borderLeft: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "rgba(255,138,0,0.8)", letterSpacing: 1, textTransform: "uppercase" } }, "Markups"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 } }, (viewer.annotations || []).length, " annotation", (viewer.annotations || []).length !== 1 ? "s" : "", " on ", viewer.revision || "Rev 0"), !isCurrent && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#ef4444", marginTop: 4, fontWeight: 700 } }, "\u26A0\uFE0F Viewing superseded revision")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "8px 0" } }, !(viewer.annotations || []).length ? /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 14px", fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", lineHeight: 1.6 } }, viewer.fileData && isCurrent ? "Click the drawing to place a pin markup." : viewer.fileData ? "Cannot add markups to superseded revisions." : "Upload a file to add markups.") : (viewer.annotations || []).map((pin) => /* @__PURE__ */ React.createElement("div", { key: pin.id, style: { padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 16, height: 16, borderRadius: "50%", background: pin.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 } }, pin.icon), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: pin.color } }, pin.type, pin.number ? " #" + pin.number : ""), /* @__PURE__ */ React.createElement("button", { onClick: () => removePin(viewer.id, pin.id, pin.createdBy), style: { marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.25)", cursor: "pointer", fontSize: 12, padding: 0 } }, "\u2715")), pin.note && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,0.45)", marginLeft: 23, lineHeight: 1.5 } }, pin.note), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "rgba(255,255,255,0.2)", marginLeft: 23, marginTop: 3 } }, pin.createdAt, " \xB7 ", pin.createdBy || "Unknown"), pin.linkedId && /* @__PURE__ */ React.createElement("div", { style: { marginLeft: 23, marginTop: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "rgba(59,130,246,0.2)", color: "#60a5fa", padding: "1px 6px", borderRadius: 4, fontWeight: 600 } }, "\u{1F517} Linked to ", pin.type, " #", pin.number))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 8, letterSpacing: 0.8, textTransform: "uppercase" } }, "Pin Types"), Object.entries(PIN_TYPES).map(([type, cfg]) => /* @__PURE__ */ React.createElement("div", { key: type, style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 12, height: 12, borderRadius: "50%", background: cfg.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "rgba(255,255,255,0.4)" } }, cfg.icon, " ", type)))))));
        })(), addPinModal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 20, width: "100%", maxWidth: 400 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, ...S.text, marginBottom: 16 } }, "Add Markup Pin"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Pin Type"), /* @__PURE__ */ React.createElement("select", { value: pinForm.type, onChange: (e) => setPinForm((p) => ({ ...p, type: e.target.value, linkedId: "" })), style: S.iS }, Object.keys(PIN_TYPES).map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, PIN_TYPES[t].icon, " ", t)))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Number / Reference"), /* @__PURE__ */ React.createElement("input", { value: pinForm.number, onChange: (e) => setPinForm((p) => ({ ...p, number: e.target.value })), placeholder: "e.g. RFI-003 or Punch #12", style: S.iS })), (pinForm.type === "RFI" || pinForm.type === "Punch") && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Link to Existing ", pinForm.type, " (optional)"), /* @__PURE__ */ React.createElement("select", { value: pinForm.linkedId, onChange: (e) => setPinForm((p) => ({ ...p, linkedId: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 No link \u2014"), pinForm.type === "RFI" && (rfis || []).map((r) => /* @__PURE__ */ React.createElement("option", { key: r.id, value: r.id }, "RFI #", r.rfiNumber, " \u2014 ", r.subject)), pinForm.type === "Punch" && (punchList || []).filter((p) => p.status !== "Complete").map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, "#", p.id.slice(0, 6), " \u2014 ", p.description))), pinForm.linkedId && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#10b981", marginTop: 4 } }, "\u2713 Tapping this pin will open the linked ", pinForm.type)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Note"), /* @__PURE__ */ React.createElement("textarea", { defaultValue: pinForm.note, onChange: (e) => setPinForm((p) => ({ ...p, note: e.target.value })), rows: 3, placeholder: "Describe the issue or note...", style: { ...S.iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, marginBottom: 14 } }, "Adding as: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FF8A00" } }, currentUser2)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAddPinModal(null), style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: savePin, style: S.btnP }, "\u{1F4CD} Place Pin")))));
      }
      function ToolInventory({ S, darkMode, projects, toolInventory, setToolInventory, selProj }) {
        var uid2 = function() {
          return Math.random().toString(36).slice(2, 9);
        };
        var blank = { id: "", projectId: "", toolName: "", category: "", make: "", model: "", serialNumber: "", assetTag: "", companyToolId: "", quantity: "1", condition: "Good", status: "Available", assignedTo: "", location: "", purchaseDate: "", purchasePrice: "", lastInspection: "", nextInspection: "", notes: "" };
        var tiState = useState(false);
        var tiModal = tiState[0];
        var setTiModal = tiState[1];
        var tiFormState = useState(blank);
        var tiForm = tiFormState[0];
        var setTiForm = tiFormState[1];
        var CATS = ["Power Tools", "Hand Tools", "Measuring & Layout", "Welding Equipment", "Pipe Tools", "Lifting & Rigging", "Safety Equipment", "Test Equipment", "Electrical Tools", "Cutting Equipment", "Other"];
        var STATS = ["Available", "In Use", "In Repair", "Out of Service", "Calibration Due", "Lost/Stolen"];
        var CONDS = ["Excellent", "Good", "Fair", "Poor", "Needs Repair"];
        var statColor = { "Available": "#10b981", "In Use": "#3b82f6", "In Repair": "#f59e0b", "Out of Service": "#ef4444", "Calibration Due": "#f59e0b", "Lost/Stolen": "#ef4444" };
        var rows = (toolInventory || []).filter(function(x) {
          return !selProj || x.projectId === selProj;
        }).sort(function(a, b) {
          return (a.toolName || "").localeCompare(b.toolName || "");
        });
        var iS = S.iS;
        var lS = S.lS;
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "\u{1F528} Tool Inventory"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, rows.length, " tool", rows.length !== 1 ? "s" : "", " \xB7 ", rows.filter(function(r) {
          return r.status === "Available";
        }).length, " available")), /* @__PURE__ */ React.createElement("button", { onClick: function() {
          setTiForm({ ...blank, projectId: selProj || "" });
          setTiModal(true);
        }, style: S.btnP }, "+ Add Tool")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 } }, [["Total", rows.length, "#94a3b8"], ["Available", rows.filter(function(r) {
          return r.status === "Available";
        }).length, "#10b981"], ["In Use", rows.filter(function(r) {
          return r.status === "In Use";
        }).length, "#3b82f6"], ["Need Attention", rows.filter(function(r) {
          return r.status === "In Repair" || r.status === "Calibration Due" || r.status === "Out of Service";
        }).length, "#f59e0b"]].map(function(item) {
          return /* @__PURE__ */ React.createElement("div", { key: item[0], style: { ...S.card, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, marginBottom: 3, textTransform: "uppercase" } }, item[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 700, fontFamily: "monospace", color: item[2] } }, item[1]));
        })), !rows.length ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 12 } }, "\u{1F528}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 600, ...S.text, marginBottom: 8 } }, "No Tools Yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3, marginBottom: 20 } }, "Add tools to track inventory, assignments, and inspection schedules."), /* @__PURE__ */ React.createElement("button", { onClick: function() {
          setTiForm({ ...blank, projectId: selProj || "" });
          setTiModal(true);
        }, style: S.btnP }, "+ Add First Tool")) : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["TOOL NAME", "COMPANY TOOL ID", "CATEGORY", "MAKE/MODEL", "SERIAL #", "QTY", "CONDITION", "STATUS", "ASSIGNED TO", "ACTIONS"].map(function(h) {
          return /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 12px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap" } }, h);
        }))), /* @__PURE__ */ React.createElement("tbody", null, rows.map(function(r) {
          return /* @__PURE__ */ React.createElement(
            "tr",
            {
              key: r.id,
              style: S.tRow,
              onMouseEnter: function(e) {
                e.currentTarget.style.background = darkMode ? "rgba(255,138,0,0.04)" : "rgba(255,138,0,0.02)";
              },
              onMouseLeave: function(e) {
                e.currentTarget.style.background = "";
              }
            },
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontWeight: 600, ...S.text } }, r.toolName || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: "#FF8A00", fontWeight: 700 } }, r.companyToolId || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2 } }, r.category || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text3, fontSize: 11 } }, [r.make, r.model].filter(Boolean).join(" ") || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontFamily: "monospace", fontSize: 11, ...S.text3 } }, r.serialNumber || r.assetTag || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2, textAlign: "center" } }, r.quantity || "1"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text2 } }, r.condition || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, r.status ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: (statColor[r.status] || "#64748b") + "18", color: statColor[r.status] || "#64748b", border: "1px solid " + (statColor[r.status] || "#64748b") + "40" } }, r.status) : "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", ...S.text3, fontSize: 11 } }, r.assignedTo || "\u2014"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("button", { onClick: function() {
              setTiForm({ ...r });
              setTiModal(true);
            }, style: { ...S.btnS, padding: "4px 9px", fontSize: 10 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: function() {
              if (window.confirm("Delete this tool?")) setToolInventory(function(l) {
                return l.filter(function(x) {
                  return x.id !== r.id;
                });
              });
            }, style: { ...S.btnS, padding: "4px 9px", fontSize: 10, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Del")))
          );
        }))))), tiModal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }, onClick: function(e) {
          if (e.target === e.currentTarget) setTiModal(false);
        } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text, marginBottom: 20 } }, tiForm.id ? "Edit Tool" : "Add Tool"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "Tool Name *"), /* @__PURE__ */ React.createElement("input", { value: tiForm.toolName || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, toolName: e.target.value };
          });
        }, placeholder: "e.g. Ridgid 300 Pipe Threader", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Category"), /* @__PURE__ */ React.createElement("select", { value: tiForm.category || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, category: e.target.value };
          });
        }, style: iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Select..."), CATS.map(function(c) {
          return /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c);
        }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Status"), /* @__PURE__ */ React.createElement("select", { value: tiForm.status || "Available", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, status: e.target.value };
          });
        }, style: iS }, STATS.map(function(s) {
          return /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s);
        }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Make"), /* @__PURE__ */ React.createElement("input", { value: tiForm.make || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, make: e.target.value };
          });
        }, placeholder: "e.g. Ridgid", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Model"), /* @__PURE__ */ React.createElement("input", { value: tiForm.model || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, model: e.target.value };
          });
        }, placeholder: "e.g. 300 Compact", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Serial Number"), /* @__PURE__ */ React.createElement("input", { value: tiForm.serialNumber || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, serialNumber: e.target.value };
          });
        }, style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Company Tool ID"), /* @__PURE__ */ React.createElement("input", { value: tiForm.companyToolId || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, companyToolId: e.target.value };
          });
        }, placeholder: "e.g. KDX-0042", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Asset Tag"), /* @__PURE__ */ React.createElement("input", { value: tiForm.assetTag || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, assetTag: e.target.value };
          });
        }, style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Quantity"), /* @__PURE__ */ React.createElement("input", { type: "number", value: tiForm.quantity || "1", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, quantity: e.target.value };
          });
        }, min: "1", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Condition"), /* @__PURE__ */ React.createElement("select", { value: tiForm.condition || "Good", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, condition: e.target.value };
          });
        }, style: iS }, CONDS.map(function(c) {
          return /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c);
        }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Assigned To"), /* @__PURE__ */ React.createElement("input", { value: tiForm.assignedTo || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, assignedTo: e.target.value };
          });
        }, placeholder: "Name or crew", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Location"), /* @__PURE__ */ React.createElement("input", { value: tiForm.location || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, location: e.target.value };
          });
        }, placeholder: "Job trailer, Level 3...", style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Last Inspection"), /* @__PURE__ */ React.createElement("input", { type: "date", value: tiForm.lastInspection || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, lastInspection: e.target.value };
          });
        }, style: iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lS }, "Next Inspection Due"), /* @__PURE__ */ React.createElement("input", { type: "date", value: tiForm.nextInspection || "", onChange: function(e) {
          setTiForm(function(p) {
            return { ...p, nextInspection: e.target.value };
          });
        }, style: iS })), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("label", { style: lS }, "Notes"), /* @__PURE__ */ React.createElement("textarea", { defaultValue: tiForm.notes || "", onBlur: function(e) {
          setTiForm(function(p) {
            return { ...p, notes: e.target.value };
          });
        }, rows: 2, style: { ...iS, resize: "vertical" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 } }, /* @__PURE__ */ React.createElement("button", { onClick: function() {
          setTiModal(false);
        }, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: function() {
          if (!tiForm.toolName) {
            alert("Tool name is required.");
            return;
          }
          if (tiForm.id) {
            setToolInventory(function(l) {
              return l.map(function(r) {
                return r.id === tiForm.id ? tiForm : r;
              });
            });
          } else {
            setToolInventory(function(l) {
              return [...l, { ...tiForm, id: uid2() }];
            });
          }
          setTiModal(false);
        }, style: S.btnP }, tiForm.id ? "Save Changes" : "Add Tool")))));
      }
      function PPEInventory({ S, darkMode, projects, ppeInventory, setPPEInventory, selProj }) {
        const [modal, setModal] = useState(false);
        const [form, setForm] = useState({});
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const blank = {
          id: "",
          projectId: "",
          itemName: "",
          category: "",
          make: "",
          model: "",
          size: "",
          color: "",
          quantity: "",
          quantityMin: "",
          condition: "Good",
          status: "In Stock",
          assignedTo: "",
          location: "",
          purchaseDate: "",
          expiryDate: "",
          certificationRequired: "No",
          certificationNumber: "",
          lastInspection: "",
          nextInspection: "",
          notes: ""
        };
        const filt2 = (arr) => arr.filter((x) => !selProj || x.projectId === selProj);
        const rows = filt2(ppeInventory).sort((a, b) => (a.itemName || "").localeCompare(b.itemName || ""));
        const CATEGORIES = [
          "Head Protection",
          "Eye Protection",
          "Face Protection",
          "Hearing Protection",
          "Respiratory Protection",
          "Hand Protection",
          "Foot Protection",
          "Fall Protection",
          "High Visibility",
          "Body Protection",
          "Welding PPE",
          "Chemical Protection",
          "Other"
        ];
        const CONDITIONS = ["New", "Good", "Fair", "Needs Replacement", "Expired"];
        const STATUSES = ["In Stock", "In Use", "Low Stock", "Out of Stock", "Expired", "Retired"];
        const STATUS_COLOR = {
          "In Stock": "#10b981",
          "In Use": "#3b82f6",
          "Low Stock": "#f59e0b",
          "Out of Stock": "#ef4444",
          "Expired": "#dc2626",
          "Retired": "#6b7280"
        };
        function tiAdd() {
          setForm({ ...blank, id: "" });
          setModal(true);
        }
        function tiEdit(r) {
          setForm({ ...r });
          setModal(true);
        }
        function tiDel(id) {
          if (window.confirm("Delete this PPE item?")) setPPEInventory((l) => l.filter((x) => x.id !== id));
        }
        function tiSave() {
          if (!form.itemName) {
            alert("Item name is required.");
            return;
          }
          const rec = { ...form, id: form.id || uid2(), projectId: form.projectId || selProj || "" };
          setPPEInventory((l) => form.id ? l.map((x) => x.id === rec.id ? rec : x) : [rec, ...l]);
          setModal(false);
        }
        const total = rows.length;
        const inStock = rows.filter((r) => r.status === "In Stock").length;
        const lowStock = rows.filter((r) => r.status === "Low Stock").length;
        const expired = rows.filter((r) => r.status === "Expired" || r.condition === "Expired").length;
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "PPE Inventory"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Track all personal protective equipment on site")), /* @__PURE__ */ React.createElement("button", { onClick: tiAdd, style: S.btnP }, "+ Add PPE Item")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Total Items"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, total)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #10b981" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "In Stock"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#10b981", fontFamily: "monospace" } }, inStock)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #f59e0b" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Low Stock"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#f59e0b", fontFamily: "monospace" } }, lowStock)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #ef4444" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Expired"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#ef4444", fontFamily: "monospace" } }, expired))), !rows.length ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3, marginBottom: 20 } }, "No PPE items yet. Click Add PPE Item to get started."), /* @__PURE__ */ React.createElement("button", { onClick: tiAdd, style: S.btnP }, "+ Add First PPE Item")) : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["Item", "Category", "Make / Model", "Size", "Qty", "Min Qty", "Condition", "Status", "Assigned To", "Expiry", ""].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 12px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((r, i) => {
          const sc2 = STATUS_COLOR[r.status] || "#6b7280";
          const isLow = r.quantityMin && Number(r.quantity || 0) <= Number(r.quantityMin || 0);
          const isExp = r.expiryDate && new Date(r.expiryDate) < /* @__PURE__ */ new Date();
          return /* @__PURE__ */ React.createElement(
            "tr",
            {
              key: r.id,
              style: { ...S.tRow, background: isExp ? "rgba(239,68,68,0.05)" : isLow ? "rgba(245,158,11,0.05)" : "" },
              onMouseEnter: (e) => e.currentTarget.style.background = darkMode ? "rgba(255,138,0,0.05)" : "rgba(255,138,0,0.03)",
              onMouseLeave: (e) => e.currentTarget.style.background = isExp ? "rgba(239,68,68,0.05)" : isLow ? "rgba(245,158,11,0.05)" : ""
            },
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontWeight: 600, ...S.text } }, r.itemName),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, r.category || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, [r.make, r.model].filter(Boolean).join(" ") || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, r.size || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 13, fontWeight: 700, color: isLow ? "#f59e0b" : "#FF8A00", fontFamily: "monospace" } }, r.quantity || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2, fontFamily: "monospace" } }, r.quantityMin || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, r.condition || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, r.status ? /* @__PURE__ */ React.createElement("span", { style: { background: sc2 + "22", color: sc2, border: "1px solid " + sc2 + "44", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" } }, r.status) : "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 12, ...S.text2 } }, r.assignedTo || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px", fontSize: 11, fontFamily: "monospace", color: isExp ? "#ef4444" : S.text2.color } }, r.expiryDate || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => tiEdit(r), style: { ...S.btnS, padding: "4px 9px", fontSize: 10 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => tiDel(r.id), style: { ...S.btnS, padding: "4px 9px", fontSize: 10, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Del")))
          );
        }))))), modal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 700, maxHeight: "90vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text, marginBottom: 20 } }, form.id ? "Edit" : "New", " PPE Item"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Item Name"), /* @__PURE__ */ React.createElement("input", { value: form.itemName || "", onChange: (e) => setForm((p) => ({ ...p, itemName: e.target.value })), placeholder: "e.g. Hard Hat, Safety Glasses, Harness", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Category"), /* @__PURE__ */ React.createElement("select", { value: form.category || "", onChange: (e) => setForm((p) => ({ ...p, category: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Select --"), CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Make / Brand"), /* @__PURE__ */ React.createElement("input", { value: form.make || "", onChange: (e) => setForm((p) => ({ ...p, make: e.target.value })), placeholder: "e.g. MSA, 3M, Honeywell", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Model"), /* @__PURE__ */ React.createElement("input", { value: form.model || "", onChange: (e) => setForm((p) => ({ ...p, model: e.target.value })), placeholder: "Model number", style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Size"), /* @__PURE__ */ React.createElement("input", { value: form.size || "", onChange: (e) => setForm((p) => ({ ...p, size: e.target.value })), placeholder: "e.g. L, XL, One Size", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Color"), /* @__PURE__ */ React.createElement("input", { value: form.color || "", onChange: (e) => setForm((p) => ({ ...p, color: e.target.value })), placeholder: "e.g. Orange, Yellow", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Quantity on Hand"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.quantity || "", onChange: (e) => setForm((p) => ({ ...p, quantity: e.target.value })), placeholder: "0", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Minimum Quantity"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.quantityMin || "", onChange: (e) => setForm((p) => ({ ...p, quantityMin: e.target.value })), placeholder: "Reorder at", style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Condition"), /* @__PURE__ */ React.createElement("select", { value: form.condition || "Good", onChange: (e) => setForm((p) => ({ ...p, condition: e.target.value })), style: S.iS }, CONDITIONS.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Status"), /* @__PURE__ */ React.createElement("select", { value: form.status || "In Stock", onChange: (e) => setForm((p) => ({ ...p, status: e.target.value })), style: S.iS }, STATUSES.map((s) => /* @__PURE__ */ React.createElement("option", { key: s }, s)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Project"), /* @__PURE__ */ React.createElement("select", { value: form.projectId || "", onChange: (e) => setForm((p) => ({ ...p, projectId: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Select --"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Assigned To / Location"), /* @__PURE__ */ React.createElement("input", { value: form.assignedTo || "", onChange: (e) => setForm((p) => ({ ...p, assignedTo: e.target.value })), placeholder: "Person or storage location", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Storage Location"), /* @__PURE__ */ React.createElement("input", { value: form.location || "", onChange: (e) => setForm((p) => ({ ...p, location: e.target.value })), placeholder: "e.g. Job trailer, Cabinet 3", style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Purchase Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: form.purchaseDate || "", onChange: (e) => setForm((p) => ({ ...p, purchaseDate: e.target.value })), style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Expiry / Replace By Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: form.expiryDate || "", onChange: (e) => setForm((p) => ({ ...p, expiryDate: e.target.value })), style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Certification Required"), /* @__PURE__ */ React.createElement("select", { value: form.certificationRequired || "No", onChange: (e) => setForm((p) => ({ ...p, certificationRequired: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", null, "No"), /* @__PURE__ */ React.createElement("option", null, "Yes"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Certification Number"), /* @__PURE__ */ React.createElement("input", { value: form.certificationNumber || "", onChange: (e) => setForm((p) => ({ ...p, certificationNumber: e.target.value })), placeholder: "Cert #", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Last Inspection Date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: form.lastInspection || "", onChange: (e) => setForm((p) => ({ ...p, lastInspection: e.target.value })), style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Notes"), /* @__PURE__ */ React.createElement("textarea", { defaultValue: form.notes || "", onBlur: (e) => setForm((p) => ({ ...p, notes: e.target.value })), rows: 3, placeholder: "Inspection notes, usage restrictions, special requirements...", style: { ...S.iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setModal(false), style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: tiSave, style: S.btnP }, "Save PPE Item")))));
      }
      function BOMTab({ S, darkMode, projects, bom, setBOM, selProj, costCodes }) {
        const dark = darkMode;
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const [modal, setModal] = useState(false);
        const [form, setForm] = useState({});
        const [filterCat, setFilterCat] = useState("All");
        const [filterSystem, setFilterSystem] = useState("All");
        const [showImport, setShowImport] = useState(false);
        const [showAIBOM, setShowAIBOM] = useState(false);
        const [importText, setImportText] = useState("");
        const CATEGORIES = [
          "Pipe",
          "Fittings",
          "Flanges",
          "Valves",
          "Specialties",
          "Hangers & Supports",
          "Insulation",
          "Equipment",
          "Instrumentation",
          "Electrical",
          "Civil / Structural",
          "Other"
        ];
        const SYSTEMS = [
          "Chilled Water Supply",
          "Chilled Water Return",
          "Heating Hot Water Supply",
          "Heating Hot Water Return",
          "Condenser Water Supply",
          "Condenser Water Return",
          "Domestic Cold Water",
          "Domestic Hot Water",
          "Domestic Hot Water Return",
          "Natural Gas",
          "Steam",
          "Condensate Return",
          "Fire Protection",
          "Storm Drainage",
          "Sanitary Drainage",
          "Compressed Air",
          "Fuel Oil",
          "Refrigerant",
          "Process",
          "Other"
        ];
        const PIPE_SIZES = ['1/2"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"', '2-1/2"', '3"', '4"', '5"', '6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', '24"', "N/A"];
        const MATERIALS = ["Carbon Steel", "Stainless Steel 304", "Stainless Steel 316", "Copper", "Cast Iron", "Ductile Iron", "CPVC", "PVC", "HDPE", "Galvanized Steel", "Black Steel", "Chrome Steel", "Alloy", "Other"];
        const UNITS = ["LF", "EA", "FT", "IN", "SQ FT", "LB", "GAL", "TON", "SET", "LOT"];
        const STATUS_OPTS = ["Not Started", "In Procurement", "On Order", "Partial Delivery", "Delivered", "Installed", "N/A"];
        const blank = {
          id: "",
          projectId: projects[0] && projects[0].id || "",
          category: "Pipe",
          system: "",
          description: "",
          spec: "",
          size: "",
          material: "",
          quantity: "",
          unit: "LF",
          unitCost: "",
          totalCost: "",
          vendor: "",
          partNumber: "",
          submittalRef: "",
          drawingRef: "",
          laborUnits: "",
          laborHours: "",
          status: "Not Started",
          notes: ""
        };
        const filt2 = (bom || []).filter(
          (b) => (!selProj || b.projectId === selProj) && (filterCat === "All" || b.category === filterCat) && (filterSystem === "All" || b.system === filterSystem)
        );
        const totalItems = filt2.length;
        const totalCost = filt2.reduce((s, b) => s + Number(b.totalCost || 0), 0);
        const totalLaborHrs = filt2.reduce((s, b) => s + Number(b.laborHours || 0), 0);
        const delivered = filt2.filter((b) => b.status === "Delivered" || b.status === "Installed").length;
        const catMap = {};
        filt2.forEach((b) => {
          const c = b.category || "Other";
          if (!catMap[c]) catMap[c] = { count: 0, cost: 0 };
          catMap[c].count++;
          catMap[c].cost += Number(b.totalCost || 0);
        });
        function bomAdd() {
          setForm({ ...blank, id: "" });
          setModal(true);
        }
        function bomEdit(b) {
          setForm({ ...b });
          setModal(true);
        }
        function bomDel(id) {
          if (window.confirm("Delete this BOM item?")) setBOM((l) => l.filter((x) => x.id !== id));
        }
        function bomSave() {
          if (!form.description) {
            alert("Description is required.");
            return;
          }
          const qty = Number(form.quantity || 0);
          const uc = Number(form.unitCost || 0);
          const tc = qty * uc > 0 ? qty * uc : Number(form.totalCost || 0);
          const rec = {
            ...form,
            id: form.id || uid2(),
            projectId: form.projectId || selProj || "",
            totalCost: tc.toFixed(2),
            laborHours: form.laborUnits && form.quantity ? (Number(form.laborUnits || 0) * Number(form.quantity || 0)).toFixed(1) : form.laborHours || ""
          };
          setBOM((l) => {
            const updated = form.id ? l.map((x) => x.id === rec.id ? rec : x) : [rec, ...l];
            if (rec.status === "Delivered" && (!form.id || form.status !== "Delivered")) {
              const uid3 = () => Math.random().toString(36).slice(2, 9);
              const delivery = {
                id: uid3(),
                projectId: rec.projectId || "",
                date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                material: rec.description || "",
                quantity: rec.quantity || "",
                unit: rec.unit || "EA",
                vendor: rec.vendor || "",
                condition: "Good",
                status: "Accepted",
                notes: "Auto-created from BOM: " + rec.description
              };
              setMaterials((m) => [delivery, ...m]);
            }
            return updated;
          });
          setModal(false);
        }
        const TEMPLATES = {
          "Chilled Water System": [
            { category: "Pipe", system: "Chilled Water Supply", description: '4" Carbon Steel Pipe Sch 40', size: '4"', material: "Carbon Steel", unit: "LF", status: "Not Started" },
            { category: "Pipe", system: "Chilled Water Return", description: '4" Carbon Steel Pipe Sch 40', size: '4"', material: "Carbon Steel", unit: "LF", status: "Not Started" },
            { category: "Fittings", system: "Chilled Water Supply", description: '4" 90 Degree Elbow BW Sch 40', size: '4"', material: "Carbon Steel", unit: "EA", status: "Not Started" },
            { category: "Valves", system: "Chilled Water Supply", description: '4" Butterfly Valve Lug Type 200psi', size: '4"', material: "Carbon Steel", unit: "EA", status: "Not Started" },
            { category: "Hangers & Supports", system: "Chilled Water Supply", description: '4" Clevis Hanger Fig 260', size: '4"', material: "Carbon Steel", unit: "EA", status: "Not Started" },
            { category: "Insulation", system: "Chilled Water Supply", description: '4" Pipe Insulation 1.5" Fiberglass', size: '4"', material: "Fiberglass", unit: "LF", status: "Not Started" }
          ],
          "Domestic Water": [
            { category: "Pipe", system: "Domestic Cold Water", description: '2" Type L Copper Pipe', size: '2"', material: "Copper", unit: "LF", status: "Not Started" },
            { category: "Pipe", system: "Domestic Hot Water", description: '2" Type L Copper Pipe', size: '2"', material: "Copper", unit: "LF", status: "Not Started" },
            { category: "Fittings", system: "Domestic Cold Water", description: '2" Copper 90 Elbow', size: '2"', material: "Copper", unit: "EA", status: "Not Started" },
            { category: "Valves", system: "Domestic Cold Water", description: '2" Ball Valve Full Port Bronze', size: '2"', material: "Bronze", unit: "EA", status: "Not Started" },
            { category: "Specialties", system: "Domestic Hot Water", description: "Water Heater Commercial 100 Gal", size: "N/A", material: "Steel", unit: "EA", status: "Not Started" }
          ],
          "Natural Gas": [
            { category: "Pipe", system: "Natural Gas", description: '2" Black Steel Pipe Sch 40', size: '2"', material: "Black Steel", unit: "LF", status: "Not Started" },
            { category: "Fittings", system: "Natural Gas", description: '2" 90 Degree Elbow Black Screwed', size: '2"', material: "Black Steel", unit: "EA", status: "Not Started" },
            { category: "Valves", system: "Natural Gas", description: '2" Gas Ball Valve Full Port', size: '2"', material: "Steel", unit: "EA", status: "Not Started" }
          ]
        };
        function bomLoadTemplate(name) {
          const items = TEMPLATES[name];
          const proj = selProj || projects[0] && projects[0].id || "";
          const newItems = items.map((item) => ({ ...blank, ...item, id: uid2(), projectId: proj, quantity: "", unitCost: "", totalCost: "" }));
          setBOM((l) => [...l, ...newItems]);
          setShowImport(false);
        }
        function doImportText() {
          if (!importText.trim()) {
            alert("Paste CSV or tab-delimited data first.");
            return;
          }
          const lines = importText.trim().split(/\r?\n/);
          const headers = lines[0].split(/\t|,/).map((h) => h.trim().toLowerCase().replace(/[^a-z]/g, ""));
          const imported = lines.slice(1).map((line) => {
            const vals = line.split(/\t|,/);
            const obj = { ...blank, id: uid2(), projectId: selProj || projects[0] && projects[0].id || "" };
            headers.forEach((h, i) => {
              if (h === "description") obj.description = vals[i]?.trim() || "";
              if (h === "category") obj.category = vals[i]?.trim() || "Pipe";
              if (h === "size") obj.size = vals[i]?.trim() || "";
              if (h === "material") obj.material = vals[i]?.trim() || "";
              if (h === "quantity" || h === "qty") obj.quantity = vals[i]?.trim() || "";
              if (h === "unit") obj.unit = vals[i]?.trim() || "EA";
              if (h === "unitcost" || h === "cost") obj.unitCost = vals[i]?.trim() || "";
              if (h === "system") obj.system = vals[i]?.trim() || "";
              if (h === "vendor") obj.vendor = vals[i]?.trim() || "";
              if (h === "notes") obj.notes = vals[i]?.trim() || "";
            });
            return obj;
          }).filter((o) => o.description);
          setBOM((l) => [...l, ...imported]);
          setImportText("");
          setShowImport(false);
          alert(imported.length + " items imported");
        }
        function bomExport() {
          const rows = [["Category", "System", "Description", "Spec", "Size", "Material", "Qty", "Unit", "Unit Cost", "Total Cost", "Labor Units", "Labor Hours", "Vendor", "Part #", "Submittal Ref", "Drawing Ref", "Status", "Notes"]];
          filt2.forEach((b) => rows.push([b.category || "", b.system || "", b.description || "", b.spec || "", b.size || "", b.material || "", b.quantity || "", b.unit || "", b.unitCost || "", b.totalCost || "", b.laborUnits || "", b.laborHours || "", b.vendor || "", b.partNumber || "", b.submittalRef || "", b.drawingRef || "", b.status || "", b.notes || ""]));
          const csv = rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\n");
          const bl = new Blob([csv], { type: "text/csv" });
          const u = URL.createObjectURL(bl);
          const a = document.createElement("a");
          a.href = u;
          a.download = "bom_export.csv";
          a.click();
          URL.revokeObjectURL(u);
        }
        const STATUS_COLOR = { "Not Started": "#64748b", "In Procurement": "#f59e0b", "On Order": "#3b82f6", "Partial Delivery": "#8b5cf6", "Delivered": "#10b981", "Installed": "#10b981", "N/A": "#64748b" };
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text } }, "Bill of Materials"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginTop: 2 } }, "Full material takeoff linked to systems, cost codes and labor")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: bomExport, style: S.btnS }, "Export CSV"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowImport((v) => !v), style: { ...S.btnS, color: "#3b82f6", border: "1px solid rgba(59,130,246,0.4)" } }, "Import / Templates"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAIBOM(true), style: { ...S.btnS, color: "#FF8A00", border: "1px solid rgba(255,138,0,0.4)", background: "rgba(255,138,0,0.06)" } }, "AI Extract"), /* @__PURE__ */ React.createElement("button", { onClick: bomAdd, style: S.btnP }, "+ Add Item"))), showImport && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 20, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, ...S.text, marginBottom: 14 } }, "Load Template or Import Data"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, ...S.text3, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "Quick Templates"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, Object.keys(TEMPLATES).map((name) => /* @__PURE__ */ React.createElement("button", { key: name, onClick: () => bomLoadTemplate(name), style: { ...S.btnS, color: "#FF8A00", border: "1px solid rgba(255,138,0,0.4)", padding: "6px 14px", fontSize: 12 } }, name)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, ...S.text3, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Paste CSV or Tab-Delimited Data"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 8 } }, "Columns: description, category, size, material, quantity, unit, unitCost, system, vendor, notes"), /* @__PURE__ */ React.createElement("textarea", { value: importText, onChange: (e) => setImportText(e.target.value), rows: 6, placeholder: 'description,category,size,material,quantity,unit,unitCost\n4" CS Pipe Sch40,Pipe,4",Carbon Steel,450,LF,8.50\n4" 90 Elbow BW,Fittings,4",Carbon Steel,12,EA,45.00', style: { ...S.iS, resize: "vertical", fontFamily: "monospace", fontSize: 11, width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setShowImport(false);
          setImportText("");
        }, style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: doImportText, style: S.btnP }, "Import Data")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Total Items"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#FF8A00", fontFamily: "monospace" } }, totalItems)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #10b981" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Material Cost"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: "#10b981", fontFamily: "monospace" } }, "$", totalCost.toLocaleString(void 0, { minimumFractionDigits: 0, maximumFractionDigits: 0 }))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #3b82f6" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Labor Hours"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#3b82f6", fontFamily: "monospace" } }, totalLaborHrs.toFixed(0))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", borderTop: "3px solid #8b5cf6" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Delivered / Installed"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#8b5cf6", fontFamily: "monospace" } }, delivered, "/", totalItems))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 12, marginBottom: 14, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, ...S.text3, letterSpacing: 0.8, textTransform: "uppercase" } }, "Filter:"), /* @__PURE__ */ React.createElement("select", { value: filterCat, onChange: (e) => setFilterCat(e.target.value), style: { ...S.iS, padding: "5px 10px", fontSize: 12, minWidth: 160 } }, /* @__PURE__ */ React.createElement("option", { value: "All" }, "All Categories"), CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c))), /* @__PURE__ */ React.createElement("select", { value: filterSystem, onChange: (e) => setFilterSystem(e.target.value), style: { ...S.iS, padding: "5px 10px", fontSize: 12, minWidth: 180 } }, /* @__PURE__ */ React.createElement("option", { value: "All" }, "All Systems"), SYSTEMS.map((s) => /* @__PURE__ */ React.createElement("option", { key: s }, s))), (filterCat !== "All" || filterSystem !== "All") && /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setFilterCat("All");
          setFilterSystem("All");
        }, style: { ...S.btnS, padding: "4px 10px", fontSize: 11, color: "#ef4444" } }, "Clear Filters"), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", fontSize: 11, ...S.text3 } }, filt2.length, " items shown")), Object.keys(catMap).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, ...S.text, marginBottom: 10 } }, "By Category"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, Object.entries(catMap).sort((a, b) => b[1].cost - a[1].cost).map(([cat, v]) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: cat,
            onClick: () => setFilterCat(cat === "All" ? "All" : cat),
            style: { padding: "6px 12px", background: filterCat === cat ? "rgba(255,138,0,0.15)" : "transparent", border: "1px solid rgba(255,138,0,0.25)", borderRadius: 6, cursor: "pointer", textAlign: "left" }
          },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#FF8A00" } }, cat),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3 } }, v.count, " items", v.cost > 0 ? " | $" + v.cost.toLocaleString(void 0, { maximumFractionDigits: 0 }) : "")
        )))), !filt2.length ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text3, marginBottom: 20 } }, 'No BOM items yet. Use a template, import CSV data, or click "+ Add Item" to build your material list.'), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowImport(true), style: { ...S.btnS, color: "#3b82f6", border: "1px solid rgba(59,130,246,0.4)" } }, "Load Template"), /* @__PURE__ */ React.createElement("button", { onClick: bomAdd, style: S.btnP }, "+ Add Item"))) : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["CAT", "SYSTEM", "DESCRIPTION", "SIZE", "MATERIAL", "QTY", "UNIT", "UNIT $", "TOTAL $", "LABOR HRS", "STATUS", ""].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "8px 10px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, filt2.map((b, i) => {
          const sc2 = STATUS_COLOR[b.status] || "#64748b";
          return /* @__PURE__ */ React.createElement(
            "tr",
            {
              key: b.id,
              style: { ...S.tRow, background: i % 2 === 0 ? "transparent" : dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" },
              onMouseEnter: (e) => e.currentTarget.style.background = dark ? "rgba(255,138,0,0.05)" : "rgba(255,138,0,0.03)",
              onMouseLeave: (e) => e.currentTarget.style.background = ""
            },
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 10, fontWeight: 700, color: "#FF8A00", whiteSpace: "nowrap" } }, b.category || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 10, ...S.text2, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, b.system || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", ...S.text, fontWeight: 500, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, title: b.description }, b.description || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 11, fontFamily: "monospace", fontWeight: 700, ...S.text, whiteSpace: "nowrap" } }, b.size || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 10, ...S.text2, whiteSpace: "nowrap" } }, b.material || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 12, fontWeight: 700, color: "#FF8A00", fontFamily: "monospace", whiteSpace: "nowrap" } }, b.quantity || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 10, ...S.text2 } }, b.unit || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 11, fontFamily: "monospace", ...S.text2 } }, b.unitCost ? "$" + Number(b.unitCost).toFixed(2) : "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 11, fontWeight: 700, color: "#10b981", fontFamily: "monospace", whiteSpace: "nowrap" } }, b.totalCost ? "$" + Number(b.totalCost).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px", fontSize: 11, fontFamily: "monospace", color: "#3b82f6" } }, b.laborHours || "--"),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("span", { style: { background: sc2 + "22", color: sc2, border: "1px solid " + sc2 + "44", padding: "2px 7px", borderRadius: 99, fontSize: 9, fontWeight: 700, whiteSpace: "nowrap" } }, b.status || "--")),
            /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => bomEdit(b), style: { ...S.btnS, padding: "3px 8px", fontSize: 10 } }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => bomDel(b.id), style: { ...S.btnS, padding: "3px 8px", fontSize: 10, color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } }, "Del")))
          );
        })), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", { style: { background: dark ? "rgba(255,138,0,0.08)" : "rgba(255,138,0,0.05)", borderTop: "2px solid rgba(255,138,0,0.3)" } }, /* @__PURE__ */ React.createElement("td", { colSpan: 7, style: { padding: "9px 10px", fontSize: 11, fontWeight: 700, color: "#FF8A00" } }, "TOTALS (", filt2.length, " items)"), /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 10px" } }), /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 10px", fontSize: 12, fontWeight: 800, color: "#10b981", fontFamily: "monospace" } }, "$", totalCost.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })), /* @__PURE__ */ React.createElement("td", { style: { padding: "9px 10px", fontSize: 12, fontWeight: 800, color: "#3b82f6", fontFamily: "monospace" } }, totalLaborHrs.toFixed(0)), /* @__PURE__ */ React.createElement("td", { colSpan: 2 })))))), modal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 760, maxHeight: "92vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text, marginBottom: 20 } }, form.id ? "Edit" : "Add", " BOM Item"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Project"), /* @__PURE__ */ React.createElement("select", { value: form.projectId || "", onChange: (e) => setForm((p) => ({ ...p, projectId: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Select --"), projects.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Category"), /* @__PURE__ */ React.createElement("select", { value: form.category || "Pipe", onChange: (e) => setForm((p) => ({ ...p, category: e.target.value })), style: S.iS }, CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "System"), /* @__PURE__ */ React.createElement("select", { value: form.system || "", onChange: (e) => setForm((p) => ({ ...p, system: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Select --"), SYSTEMS.map((s) => /* @__PURE__ */ React.createElement("option", { key: s }, s))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Description"), /* @__PURE__ */ React.createElement("input", { value: form.description || "", onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })), placeholder: 'e.g. 4" Carbon Steel Pipe Sch 40 ASTM A53', style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Spec Section"), /* @__PURE__ */ React.createElement("input", { value: form.spec || "", onChange: (e) => setForm((p) => ({ ...p, spec: e.target.value })), placeholder: "e.g. 22 11 16", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Pipe / Item Size"), /* @__PURE__ */ React.createElement("select", { value: form.size || "", onChange: (e) => setForm((p) => ({ ...p, size: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Select --"), PIPE_SIZES.map((s) => /* @__PURE__ */ React.createElement("option", { key: s }, s)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Material"), /* @__PURE__ */ React.createElement("select", { value: form.material || "", onChange: (e) => setForm((p) => ({ ...p, material: e.target.value })), style: S.iS }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Select --"), MATERIALS.map((m) => /* @__PURE__ */ React.createElement("option", { key: m }, m)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Vendor / Manufacturer"), /* @__PURE__ */ React.createElement("input", { value: form.vendor || "", onChange: (e) => setForm((p) => ({ ...p, vendor: e.target.value })), placeholder: "e.g. Victaulic, Nibco", style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Quantity"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.quantity || "", onChange: (e) => setForm((p) => ({ ...p, quantity: e.target.value })), placeholder: "0", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Unit"), /* @__PURE__ */ React.createElement("select", { value: form.unit || "EA", onChange: (e) => setForm((p) => ({ ...p, unit: e.target.value })), style: S.iS }, UNITS.map((u) => /* @__PURE__ */ React.createElement("option", { key: u }, u)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Unit Cost ($)"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.unitCost || "", onChange: (e) => setForm((p) => ({ ...p, unitCost: e.target.value })), placeholder: "0.00", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Total Cost ($)"), /* @__PURE__ */ React.createElement("div", { style: { ...S.iS, background: dark ? "#0a0e18" : "#f0f4f8", color: "#10b981", fontWeight: 700, fontFamily: "monospace" } }, "$", (Number(form.quantity || 0) * Number(form.unitCost || 0) || Number(form.totalCost || 0)).toFixed(2)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Labor Units (per unit)"), /* @__PURE__ */ React.createElement("input", { type: "number", value: form.laborUnits || "", onChange: (e) => setForm((p) => ({ ...p, laborUnits: e.target.value })), placeholder: "0.0", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Estimated Labor Hours"), /* @__PURE__ */ React.createElement("div", { style: { ...S.iS, background: dark ? "#0a0e18" : "#f0f4f8", color: "#3b82f6", fontWeight: 700, fontFamily: "monospace" } }, (Number(form.laborUnits || 0) * Number(form.quantity || 0)).toFixed(1), " hrs")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Submittal Ref"), /* @__PURE__ */ React.createElement("input", { value: form.submittalRef || "", onChange: (e) => setForm((p) => ({ ...p, submittalRef: e.target.value })), placeholder: "e.g. SUB-042", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Drawing Ref"), /* @__PURE__ */ React.createElement("input", { value: form.drawingRef || "", onChange: (e) => setForm((p) => ({ ...p, drawingRef: e.target.value })), placeholder: "e.g. P-101 Rev B", style: S.iS }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Part Number"), /* @__PURE__ */ React.createElement("input", { value: form.partNumber || "", onChange: (e) => setForm((p) => ({ ...p, partNumber: e.target.value })), placeholder: "Manufacturer part #", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Status"), /* @__PURE__ */ React.createElement("select", { value: form.status || "Not Started", onChange: (e) => setForm((p) => ({ ...p, status: e.target.value })), style: S.iS }, STATUS_OPTS.map((s) => /* @__PURE__ */ React.createElement("option", { key: s }, s))))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Notes"), /* @__PURE__ */ React.createElement("textarea", { defaultValue: form.notes || "", onBlur: (e) => setForm((p) => ({ ...p, notes: e.target.value })), rows: 2, placeholder: "Spec notes, substitution info, special requirements...", style: { ...S.iS, resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setModal(false), style: S.btnS }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: bomSave, style: S.btnP }, "Save Item")))), showAIBOM && /* @__PURE__ */ React.createElement(AIBOMModal, { S, darkMode, projects, selProj, setBOM, onClose: () => setShowAIBOM(false) }));
      }
      function FirebaseSync({ allState, allSetters, darkMode, S }) {
        const [fbStatus, setFbStatus] = useState(window.KoDoxFirebase && window.KoDoxFirebase.connected ? "connected" : "disconnected");
        const [fbUser, setFbUser] = useState(null);
        const [fbEmail, setFbEmail] = useState("");
        const [fbPass, setFbPass] = useState("");
        const [fbConfig, setFbConfig] = useState(localStorage.getItem("kodox_firebase_config") || "");
        const [syncing, setSyncing] = useState(false);
        const [lastSync, setLastSync] = useState(null);
        const [authMode, setAuthMode] = useState("signin");
        const [fbError, setFbError] = useState("");
        const dark = darkMode;
        function fbInitAuth() {
          if (window.KoDoxFirebase && window.KoDoxFirebase.auth) {
            window.KoDoxFirebase.onAuthChange(function(user) {
              setFbUser(user);
              if (user) setFbStatus("signed-in");
              else setFbStatus("connected");
            });
          }
        }
        function fbSaveConfig() {
          setFbStatus("connected");
          setFbError("");
          fbInitAuth();
        }
        function fbSignIn() {
          setFbError("Signing in...");
          window.KoDoxFirebase.signIn(fbEmail, fbPass).then(function(r) {
            localStorage.setItem("kodox_email", fbEmail);
            setFbUser(r.user);
            setFbStatus("signed-in");
            setFbError("");
          }).catch(function(e) {
            setFbError(e.message);
          });
        }
        function fbSignUp() {
          setFbError("Creating account...");
          window.KoDoxFirebase.signUp(fbEmail, fbPass).then(function(r) {
            localStorage.setItem("kodox_email", fbEmail);
            setFbUser(r.user);
            setFbStatus("signed-in");
            setFbError("");
          }).catch(function(e) {
            setFbError(e.message);
          });
        }
        function fbSignOut() {
          window.KoDoxFirebase.signOut().then(function() {
            setFbUser(null);
            setFbStatus("connected");
          });
        }
        function fbPush() {
          if (!fbUser) return;
          setSyncing(true);
          window.KoDoxFirebase.save(fbUser.uid, allState).then(function() {
            setSyncing(false);
            setLastSync((/* @__PURE__ */ new Date()).toLocaleTimeString());
          }).catch(function(e) {
            setSyncing(false);
            setFbError(e.message);
          });
        }
        function fbPull() {
          if (!fbUser) return;
          setSyncing(true);
          window.KoDoxFirebase.load(fbUser.uid).then(function(data) {
            setSyncing(false);
            if (data && allSetters) {
              Object.keys(allSetters).forEach(function(k) {
                if (data[k] !== void 0) allSetters[k](data[k]);
              });
              setLastSync((/* @__PURE__ */ new Date()).toLocaleTimeString());
            }
          }).catch(function(e) {
            setSyncing(false);
            setFbError(e.message);
          });
        }
        const sc2 = fbStatus === "signed-in" ? "#10b981" : fbStatus === "connected" ? "#f59e0b" : "#6b7280";
        const sl = fbStatus === "signed-in" ? "Synced - " + (fbUser ? fbUser.email : "") : fbStatus === "connected" ? "Connected - Not Signed In" : "Not Connected";
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, ...S.text, marginBottom: 6 } }, "Firebase Cloud Sync"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text3, marginBottom: 20 } }, "Sync your data across devices in real time."), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 12, height: 12, borderRadius: "50%", background: sc2, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: sc2 } }, sl), lastSync && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, marginTop: 2 } }, "Last sync: ", lastSync)), fbStatus === "signed-in" && /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: fbPush, style: { ...S.btnP, padding: "6px 14px", fontSize: 12 } }, syncing ? "Syncing..." : "Push Data"), /* @__PURE__ */ React.createElement("button", { onClick: fbPull, style: { ...S.btnS, padding: "6px 14px", fontSize: 12, color: "#3b82f6" } }, syncing ? "Loading..." : "Pull Data"), /* @__PURE__ */ React.createElement("button", { onClick: fbSignOut, style: { ...S.btnS, padding: "6px 14px", fontSize: 12 } }, "Sign Out"))), fbError && /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, fontSize: 12, color: "#ef4444", marginBottom: 14 } }, fbError), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 20, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, "Step 1 - Firebase Config"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 12 } }, "Paste your Firebase config object below then tap Connect."), /* @__PURE__ */ React.createElement("textarea", { value: fbConfig, onChange: (e) => setFbConfig(e.target.value), rows: 8, placeholder: "paste config here", style: { ...S.iS, fontFamily: "monospace", fontSize: 11, resize: "vertical", width: "100%", marginBottom: 10 } }), /* @__PURE__ */ React.createElement("button", { onClick: fbSaveConfig, style: S.btnP }, "Connect to Firebase")), fbStatus !== "disconnected" && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 20, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 12 } }, "Step 2 - Sign In"), fbStatus === "signed-in" ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, ...S.text } }, "Signed in as ", /* @__PURE__ */ React.createElement("strong", null, fbUser ? fbUser.email : "")), /* @__PURE__ */ React.createElement("button", { onClick: fbSignOut, style: { ...S.btnS, padding: "5px 12px", fontSize: 11 } }, "Sign Out")) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAuthMode("signin"), style: { ...S.btnS, flex: 1, color: authMode === "signin" ? "#FF8A00" : "", border: authMode === "signin" ? "1px solid rgba(255,138,0,0.5)" : "" } }, "Sign In"), /* @__PURE__ */ React.createElement("button", { onClick: () => setAuthMode("signup"), style: { ...S.btnS, flex: 1, color: authMode === "signup" ? "#FF8A00" : "", border: authMode === "signup" ? "1px solid rgba(255,138,0,0.5)" : "" } }, "Create Account")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Email"), /* @__PURE__ */ React.createElement("input", { type: "email", value: fbEmail, onChange: (e) => setFbEmail(e.target.value), placeholder: "you@email.com", style: S.iS })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: S.lS }, "Password"), /* @__PURE__ */ React.createElement("input", { type: "password", value: fbPass, onChange: (e) => setFbPass(e.target.value), placeholder: "Password", style: S.iS }))), /* @__PURE__ */ React.createElement("button", { onClick: authMode === "signin" ? fbSignIn : fbSignUp, style: S.btnP }, authMode === "signin" ? "Sign In" : "Create Account"))), fbStatus === "signed-in" && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 10 } }, "Step 3 - Sync Data"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: dark ? "rgba(16,185,129,0.08)" : "#f0fdf4", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#10b981", marginBottom: 6 } }, "Push to Cloud"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, marginBottom: 10 } }, "Save all local data to Firebase"), /* @__PURE__ */ React.createElement("button", { onClick: fbPush, style: { ...S.btnP, width: "100%", fontSize: 11 } }, syncing ? "Syncing..." : "Push Data")), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: dark ? "rgba(59,130,246,0.08)" : "#eff6ff", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#3b82f6", marginBottom: 6 } }, "Pull from Cloud"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, ...S.text3, marginBottom: 10 } }, "Load latest data from another device"), /* @__PURE__ */ React.createElement("button", { onClick: fbPull, style: { ...S.btnS, width: "100%", fontSize: 11, color: "#3b82f6", border: "1px solid rgba(59,130,246,0.4)" } }, syncing ? "Loading..." : "Pull Data")))));
      }
      function AIBOMModal({ S, darkMode, projects, selProj, setBOM, onClose }) {
        const [specText, setSpecText] = useState("");
        const [pdfFiles, setPdfFiles] = useState([]);
        const [uploadingPdf, setUploadingPdf] = useState(false);
        const [loading, setLoading] = useState(false);
        const [preview, setPreview] = useState([]);
        const [error, setError] = useState("");
        const [step, setStep] = useState(1);
        const uid2 = () => Math.random().toString(36).slice(2, 9);
        const dark = darkMode;
        const pdfInputRef = React.useRef();
        function handlePdfSelect(e) {
          const files = Array.from(e.target.files || []);
          if (!files.length) return;
          const totalExisting = pdfFiles.reduce((s, f) => s + f.size, 0);
          setError("");
          let runningTotal = totalExisting;
          setUploadingPdf(true);
          const readers = files.map((file) => new Promise((resolve, reject) => {
            if (file.type !== "application/pdf") {
              reject("'" + file.name + "' is not a PDF.");
              return;
            }
            runningTotal += file.size;
            if (runningTotal > 30 * 1024 * 1024) {
              reject("Combined PDFs exceed 30MB. Upload fewer/smaller files.");
              return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => resolve({ name: file.name, size: file.size, base64: ev.target.result.split(",")[1] });
            reader.onerror = () => reject("Could not read '" + file.name + "'.");
            reader.readAsDataURL(file);
          }));
          Promise.all(readers).then((results) => {
            setPdfFiles((prev) => [...prev, ...results]);
            setUploadingPdf(false);
          }).catch((err) => {
            setError(typeof err === "string" ? err : "Could not read one or more files.");
            setUploadingPdf(false);
          });
        }
        function removePdf(idx) {
          setPdfFiles((prev) => prev.filter((_, i) => i !== idx));
        }
        function clearAllPdfs() {
          setPdfFiles([]);
          if (pdfInputRef.current) pdfInputRef.current.value = "";
        }
        const SYSTEM_PROMPT = `You are a mechanical/piping construction estimator. 
You may be given one or more documents: drawings, specifications, and/or contract documents, plus optional pasted text.
Cross-reference all provided documents together \u2014 drawings often show quantities and routing, specs define materials and standards, contracts may define scope boundaries.
Extract every material item required to construct the scope shown, and return ONLY a JSON array.
Each item must have these exact fields:
- description: full material description
- category: one of [Pipe, Fittings, Flanges, Valves, Specialties, Hangers & Supports, Insulation, Equipment, Instrumentation, Other]
- size: pipe or item size (e.g. "4"", "2-1/2"", "N/A")
- material: material type (e.g. "Carbon Steel", "Copper", "Stainless Steel 304", "Cast Iron")
- quantity: numeric quantity only
- unit: one of [LF, EA, FT, SQ FT, LB, SET, LOT]
- unitCost: leave blank as ""
- system: best guess at system (e.g. "Chilled Water Supply", "Domestic Cold Water", "Natural Gas", "Steam", "Fire Protection", etc.)
- notes: any spec section, standard, or schedule reference

Return ONLY valid JSON array, no explanation, no markdown, no backticks.
Example: [{"description":"4" Sch 40 CS Pipe","category":"Pipe","size":"4"","material":"Carbon Steel","quantity":"200","unit":"LF","unitCost":"","system":"Chilled Water Supply","notes":"ASTM A53"}]`;
        function runAI() {
          if (!specText.trim() && pdfFiles.length === 0) {
            setError("Paste some text or upload at least one PDF (drawings, spec, or contract) first.");
            return;
          }
          setLoading(true);
          setError("");
          setPreview([]);
          const userContent = [];
          pdfFiles.forEach((f) => {
            userContent.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: f.base64 } });
          });
          userContent.push({ type: "text", text: "Extract all materials needed to construct the scope shown across the attached document(s) and/or text below. Read each document thoroughly, including all pages, sections, and schedules. Cross-reference drawings against specs/contract where multiple documents are provided.\n\n" + (specText.trim() || "(see attached document(s))") });
          fetch("https://claudeproxy-rkvcepcpza-uc.a.run.app", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-6",
              max_tokens: 4096,
              system: SYSTEM_PROMPT,
              messages: [{ role: "user", content: userContent }]
            })
          }).then((r) => r.json()).then((data) => {
            setLoading(false);
            if (data.error) {
              setError("API error: " + data.error.message);
              return;
            }
            if (!data.content || !data.content[0]) {
              setError("No response from AI. Please try again.");
              return;
            }
            let text = data.content[0].text.trim();
            text = text.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```\s*$/, "").trim();
            try {
              const items = JSON.parse(text);
              if (!Array.isArray(items) || items.length === 0) {
                setError("No materials found. Try pasting more detailed spec text.");
                return;
              }
              setPreview(items);
              setStep(2);
            } catch (e) {
              setError("Could not parse response. Try again with clearer spec text.");
            }
          }).catch((e) => {
            setLoading(false);
            setError("Network error: " + e.message);
          });
        }
        function addToBOM() {
          const proj = selProj || projects[0] && projects[0].id || "";
          const newItems = preview.map((item) => ({
            id: uid2(),
            projectId: proj,
            category: item.category || "Other",
            system: item.system || "",
            description: item.description || "",
            spec: item.notes || "",
            size: item.size || "",
            material: item.material || "",
            quantity: item.quantity || "",
            unit: item.unit || "EA",
            unitCost: item.unitCost || "",
            totalCost: "",
            vendor: "",
            partNumber: "",
            submittalRef: "",
            drawingRef: "",
            laborUnits: "",
            laborHours: "",
            status: "Not Started",
            notes: item.notes || ""
          }));
          setBOM((l) => [...l, ...newItems]);
          onClose();
        }
        const CAT_COLOR = {
          "Pipe": "#3b82f6",
          "Fittings": "#8b5cf6",
          "Flanges": "#6366f1",
          "Valves": "#ef4444",
          "Specialties": "#f59e0b",
          "Hangers & Supports": "#10b981",
          "Insulation": "#14b8a6",
          "Equipment": "#FF8A00",
          "Instrumentation": "#ec4899",
          "Other": "#64748b"
        };
        return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: 24, width: "100%", maxWidth: 700, maxHeight: "92vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, ...S.text } }, "AI BOM Assistant"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginTop: 2 } }, "Paste spec text - Claude extracts your material list automatically")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "3px 10px", background: "rgba(255,138,0,0.12)", border: "1px solid rgba(255,138,0,0.3)", borderRadius: 99, fontSize: 10, fontWeight: 700, color: "#FF8A00" } }, "Step ", step, " of 2"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { ...S.btnS, padding: "4px 10px", fontSize: 11 } }, "Close"))), error && /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, fontSize: 12, color: "#ef4444", marginBottom: 16 } }, error), step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, ...S.text3, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "Upload Drawings, Spec Sections, and/or Contract (PDF)"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: "application/pdf", multiple: true, ref: pdfInputRef, onChange: handlePdfSelect, style: { display: "none" } }), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => pdfInputRef.current.click(),
            disabled: uploadingPdf,
            style: { ...S.btnS, padding: "10px 20px", fontSize: 13, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }
          },
          uploadingPdf ? "Reading PDF(s)..." : "\u{1F4C4} Upload PDF(s)"
        ), pdfFiles.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, pdfFiles.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#10b981", fontWeight: 700 } }, "\u2713 ", f.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, ...S.text3 } }, (f.size / 1024 / 1024).toFixed(1), " MB"), /* @__PURE__ */ React.createElement("button", { onClick: () => removePdf(i), style: { ...S.btnS, padding: "3px 10px", fontSize: 11, marginLeft: "auto" } }, "Remove"))), /* @__PURE__ */ React.createElement("button", { onClick: clearAllPdfs, style: { ...S.btnS, padding: "4px 10px", fontSize: 11 } }, "Clear All")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 14, lineHeight: 1.6 } }, "Upload drawings, spec sections, and/or contract documents together (multiple PDFs supported). Claude will cross-reference all of them and extract every material line item \u2014 pipe, fittings, valves, hangers, insulation, equipment, etc. Combined max 30MB."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, ...S.text3, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "Or Paste Spec Text / Material List"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3, marginBottom: 10, lineHeight: 1.7 } }, "Works with: spec sections, submittal schedules, scope of work text, CSV takeoffs, or any text listing materials and quantities. Can be used alone or combined with the PDFs above."), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            value: specText,
            onChange: (e) => setSpecText(e.target.value),
            rows: 8,
            placeholder: 'Example:\n\nSection 22 11 16 - Domestic Water Piping\n\nFurnish and install the following:\n- 200 LF of 2" Type L copper pipe\n- 45 each 2" copper 90-degree elbows\n- 12 each 2" full port ball valves\n\nOr paste a CSV:\n4" Sch 40 CS Pipe, 450, LF\n4" 90 Elbow BW, 24, EA',
            style: { ...S.iS, resize: "vertical", fontFamily: "monospace", fontSize: 11, width: "100%", marginBottom: 14, minHeight: 140 }
          }
        ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, specText.length, " chars", pdfFiles.length ? " + " + pdfFiles.length + " PDF(s) attached" : ""), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: runAI,
            disabled: loading || !specText.trim() && pdfFiles.length === 0,
            style: { ...S.btnP, padding: "8px 20px", fontSize: 13, opacity: loading || !specText.trim() && pdfFiles.length === 0 ? 0.5 : 1 }
          },
          loading ? "Analyzing..." : "Extract Materials with AI"
        )), loading && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, padding: "12px 16px", background: "rgba(255,138,0,0.06)", border: "1px solid rgba(255,138,0,0.2)", borderRadius: 8, fontSize: 12, ...S.text3, textAlign: "center" } }, "Claude is reading your document(s) and extracting materials. This can take a minute or two for large or multiple documents...")), step === 2 && preview.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, ...S.text } }, preview.length, " items extracted"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setStep(1);
          setPreview([]);
        }, style: { ...S.btnS, padding: "4px 10px", fontSize: 11 } }, "Back")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, overflow: "hidden", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto", maxHeight: 340, overflowY: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: S.tHead }, ["CAT", "DESCRIPTION", "SIZE", "MATERIAL", "QTY", "UNIT", "SYSTEM"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "7px 10px", textAlign: "left", ...S.text3, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap", position: "sticky", top: 0, background: dark ? "#0d1117" : "#f8fafc" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, preview.map((item, i) => {
          const cc = CAT_COLOR[item.category] || "#64748b";
          return /* @__PURE__ */ React.createElement("tr", { key: i, style: { ...S.tRow } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px" } }, /* @__PURE__ */ React.createElement("span", { style: { background: cc + "22", color: cc, border: "1px solid " + cc + "44", padding: "2px 7px", borderRadius: 99, fontSize: 9, fontWeight: 700, whiteSpace: "nowrap" } }, item.category)), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", ...S.text, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, title: item.description }, item.description), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontFamily: "monospace", fontWeight: 700, ...S.text, whiteSpace: "nowrap" } }, item.size || "--"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", ...S.text2, whiteSpace: "nowrap" } }, item.material || "--"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontWeight: 700, color: "#FF8A00", fontFamily: "monospace" } }, item.quantity || "--"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", ...S.text2 } }, item.unit || "--"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", fontSize: 10, ...S.text3, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, item.system || "--"));
        }))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, fontSize: 11, ...S.text3, marginBottom: 16, lineHeight: 1.7 } }, "Review the items above. You can edit quantities, costs and details after adding to your BOM. All items will be added to your current project."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setStep(1);
          setPreview([]);
          setSpecText("");
        }, style: S.btnS }, "Start Over"), /* @__PURE__ */ React.createElement("button", { onClick: addToBOM, style: { ...S.btnP, background: "linear-gradient(135deg,#10b981,#059669)", fontSize: 13, padding: "8px 20px" } }, "Add ", preview.length, " Items to BOM")))));
      }
      function PlanOfDay({ S, darkMode, tasks, dailyLogs, equipment, rental, materials, safetyInsp: safetyInsp2, qualityInsp, jsas: jsas2, rfis, submittals, manpowerEntries, punchList, actionItems, delays: delays2, selProj, pN, setTab, onClose, todayStr: todayStr2, settings }) {
        const td = todayStr2 || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const [speaking, setSpeaking] = useState(false);
        const [speechDone, setSpeechDone] = useState(false);
        const [exporting, setExporting] = useState(false);
        const todayEquip = (equipment || []).filter((e) => e.deliveryDate === td || e.date === td);
        const todayMats = (materials || []).filter((m) => m.date === td || m.deliveryDate === td);
        const todayRent = (rental || []).filter((r) => r.date === td || r.deliveryDate === td);
        const todaySI = (safetyInsp2 || []).filter((i) => i.date === td || i.dueDate === td);
        const todayQI = (qualityInsp || []).filter((i) => i.date === td || i.dueDate === td);
        const todayRFIs = (rfis || []).filter((r) => r.dueDate === td && r.status !== "Answered" && r.status !== "Closed");
        const todaySubs = (submittals || []).filter((s) => s.requiredDate === td && s.status !== "Approved");
        const todayLA = (tasks || []).filter((t) => (!selProj || t.projectId === selProj) && t.startDate === td && t.status !== "Complete");
        const todayLog = (dailyLogs || []).find((l) => l.date === td) || {};
        const openPunch = (punchList || []).filter((p) => (!selProj || p.projectId === selProj) && p.status !== "Complete" && p.priority === "High");
        const openActions = (actionItems || []).filter((a) => (!selProj || a.projectId === selProj) && a.dueDate <= td && a.status !== "Complete");
        const yd = (() => {
          const d = /* @__PURE__ */ new Date(td + "T12:00:00");
          d.setDate(d.getDate() - 1);
          return d.toISOString().split("T")[0];
        })();
        const mp = (manpowerEntries || []).find((e) => (!selProj || e.projectId === selProj) && e.date === td) || (manpowerEntries || []).find((e) => (!selProj || e.projectId === selProj) && e.date === yd) || null;
        const lines = (mp && mp.tradeLines || []).filter((t) => Number(t.workers || 0) > 0);
        const totW = lines.reduce((s, t) => s + Number(t.workers || 0), 0);
        const totH = lines.reduce((s, t) => s + Number(t.workers || 0) * Number(t.hours || 8), 0);
        const ydLog = (dailyLogs || []).find((l) => l.date === yd) || {};
        const activeDelays = (delays2 || []).filter((d) => (!selProj || d.projectId === selProj) && (d.status === "Active" || d.status === "Open"));
        const todayWeather = todayLog.weather || "";
        const todayTemp = todayLog.tempHigh || todayLog.tempLow ? (todayLog.tempLow || "") + (todayLog.tempHigh ? " / " + todayLog.tempHigh + "\xB0F" : "\xB0F") : "";
        const todaySiteWalks = todayLog.visitors && (todayLog.visitors.toLowerCase().includes("walk") || todayLog.visitors.toLowerCase().includes("tour")) ? todayLog.visitors : "";
        const ydSafety = ydLog.safety && ydLog.safety.toLowerCase() !== "none" && ydLog.safety.trim() ? ydLog.safety : "";
        const ydDelays = ydLog.delays && ydLog.delays.toLowerCase() !== "none" && ydLog.delays.trim() ? ydLog.delays : "";
        const rates = JSON.parse(localStorage.getItem("kodox_labor_rates") || "{}");
        const estCost = lines.reduce((s, t) => {
          const tr = (t.trade || "").toLowerCase();
          const r = tr.includes("pipe") ? rates.pipefitter : tr.includes("weld") ? rates.welder : tr.includes("fore") ? rates.foreman : tr.includes("help") || tr.includes("labor") ? rates.helper : rates.default || 65;
          return s + Number(t.workers || 0) * Number(t.hours || 8) * (r || 65);
        }, 0);
        const dl = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
        const greetHour = (/* @__PURE__ */ new Date()).getHours();
        const greet = greetHour < 12 ? "Good morning" : greetHour < 17 ? "Good afternoon" : "Good evening";
        function buildScript() {
          const p = [];
          p.push(greet + ". Here is your plan of the day for " + dl + ".");
          if (totW > 0) p.push("You have " + totW + " workers on site today for a total of " + totH + " man hours.");
          else p.push("No crew sheet found for today.");
          if (estCost > 0) p.push("Estimated labor cost today is $" + Math.round(estCost).toLocaleString() + ".");
          if (todayLA.length > 0) p.push("The 6 week look ahead shows " + todayLA.length + " activit" + (todayLA.length === 1 ? "y" : "ies") + " starting today.");
          const eq = todayEquip.length + todayRent.length;
          if (eq > 0) p.push("You have " + eq + " equipment deliver" + (eq === 1 ? "y" : "ies") + " scheduled.");
          if (todayMats.length > 0) p.push("There are " + todayMats.length + " material deliver" + (todayMats.length === 1 ? "y" : "ies") + " expected.");
          const ins = todaySI.length + todayQI.length;
          if (ins > 0) p.push("You have " + ins + " inspection" + (ins === 1 ? "" : "s") + " scheduled today.");
          if (todayRFIs.length > 0) p.push("There are " + todayRFIs.length + " RFI" + (todayRFIs.length === 1 ? "" : "s") + " due today.");
          if (todaySubs.length > 0) p.push(todaySubs.length + " submittal" + (todaySubs.length === 1 ? "" : "s") + " are due today.");
          if (openPunch.length > 0) p.push("There are " + openPunch.length + " high priority punch list items open.");
          if (openActions.length > 0) p.push(openActions.length + " action item" + (openActions.length === 1 ? "" : "s") + " are overdue.");
          if (todayWeather) p.push("Weather today: " + todayWeather + (todayTemp ? " " + todayTemp : "") + ".");
          if (activeDelays.length > 0) p.push("There are " + activeDelays.length + " active delay" + (activeDelays.length > 1 ? "s" : "") + " on this project.");
          if (ydSafety) p.push("Safety note from yesterday: " + ydSafety + ".");
          if (ydDelays) p.push("Scope or delay from yesterday: " + ydDelays + ".");
          if (todayLog.visitors) p.push("Scheduled visitors and site walks: " + todayLog.visitors + ".");
          if (todayLog.meetings) p.push("Meetings today: " + todayLog.meetings + ".");
          p.push("That is your plan of the day. Have a safe and productive day.");
          return p.join(" ");
        }
        function speak() {
          if (!window.speechSynthesis) {
            alert("Text to speech not supported on this browser.");
            return;
          }
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(buildScript());
          utter.rate = 0.92;
          utter.pitch = 1;
          utter.volume = 1;
          const voices = window.speechSynthesis.getVoices();
          const pref = voices.find((v) => v.name.includes("Samantha") || v.name.includes("Google US") || v.name.includes("Microsoft David") || v.name.includes("Alex"));
          if (pref) utter.voice = pref;
          utter.onstart = () => {
            setSpeaking(true);
            setSpeechDone(false);
          };
          utter.onend = () => {
            setSpeaking(false);
            setSpeechDone(true);
          };
          utter.onerror = () => setSpeaking(false);
          window.speechSynthesis.speak(utter);
        }
        function stopSpeak() {
          window.speechSynthesis && window.speechSynthesis.cancel();
          setSpeaking(false);
        }
        function buildPrintHTML() {
          const secHTML = (title, items, color) => items.length === 0 ? "" : '<div class="section"><div class="sec-hdr" style="background:' + color + '">' + title.toUpperCase() + "</div>" + items.map((it) => '<div class="item">' + it + "</div>").join("") + "</div>";
          const tradeRows = lines.map((t) => '<div class="trade-row"><span>' + t.trade + '</span><span style="color:#FF8A00;font-weight:700">' + t.workers + " workers x " + t.hours + "hrs</span></div>").join("");
          return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Plan of the Day - ' + td + '</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;font-size:11px;color:#1a1a1a;padding:20px;}.header{background:#0f1a2e;color:white;padding:16px 20px;margin-bottom:16px;border-radius:4px;}.header .lbl{font-size:8px;font-weight:700;color:#FF8A00;letter-spacing:3px;text-transform:uppercase;}.header .ttl{font-size:18px;font-weight:800;margin-top:4px;}.header .sub{font-size:10px;color:#aab;margin-top:2px;}.summary{background:#f5f7fa;border-left:4px solid #FF8A00;padding:12px 14px;margin-bottom:14px;border-radius:0 4px 4px 0;font-size:11px;line-height:1.7;color:#2a2a2a;}.sum-lbl{font-size:8px;font-weight:700;color:#FF8A00;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;}.grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px;}.stat{background:#f0f4ff;border-radius:4px;padding:8px 10px;text-align:center;}.sl{font-size:8px;color:#888;letter-spacing:1px;text-transform:uppercase;}.sv{font-size:20px;font-weight:900;color:#FF8A00;}.section{margin-bottom:12px;page-break-inside:avoid;}.sec-hdr{color:white;font-size:9px;font-weight:700;padding:4px 8px;border-radius:3px 3px 0 0;letter-spacing:1px;}.item{font-size:10px;padding:4px 8px;border-bottom:1px solid #eee;color:#333;}.trade-row{display:flex;justify-content:space-between;padding:4px 8px;border-bottom:1px solid #eee;font-size:10px;}.footer{margin-top:20px;padding-top:10px;border-top:1px solid #ddd;font-size:9px;color:#999;display:flex;justify-content:space-between;}@media print{body{padding:10px;}@page{margin:12mm;}}</style></head><body><div class="header"><div class="lbl">KoDox Systems | Plan of the Day</div><div class="ttl">' + dl + '</div><div class="sub">Generated: ' + (/* @__PURE__ */ new Date()).toLocaleString() + '</div></div><div class="summary"><div class="sum-lbl">Morning Summary</div>' + buildScript() + "</div>" + (totW > 0 ? '<div class="grid"><div class="stat"><div class="sl">Workers</div><div class="sv">' + totW + '</div></div><div class="stat"><div class="sl">Man-Hours</div><div class="sv">' + totH + "</div></div>" + (estCost > 0 ? '<div class="stat"><div class="sl">Est Cost</div><div class="sv" style="font-size:14px">$' + Math.round(estCost).toLocaleString() + "</div></div>" : "") + '</div><div class="section"><div class="sec-hdr" style="background:#1e3a5f">CREW BREAKDOWN</div>' + tradeRows + "</div>" : "") + secHTML("6-Week Look-Ahead Starting Today", todayLA.map((t) => t.description || t.trade || "Activity"), "#1e4a8c") + secHTML("Equipment Deliveries", [...todayEquip, ...todayRent].map((e) => (e.equipment || e.description || "Equipment") + (e.vendor ? " - " + e.vendor : "")), "#5b21b6") + secHTML("Material Deliveries", todayMats.map((m) => (m.material || m.description || "Material") + (m.vendor ? " - " + m.vendor : "")), "#065f46") + secHTML("Inspections", [...todaySI.map((i) => "Safety: " + (i.type || "Inspection") + (i.inspector ? " - " + i.inspector : "")), ...todayQI.map((i) => "Quality: " + (i.type || "Inspection") + (i.inspector ? " - " + i.inspector : ""))], "#991b1b") + secHTML("RFIs Due Today", todayRFIs.map((r) => "RFI " + (r.rfiNumber || r.number || "") + ": " + (r.subject || "")), "#991b1b") + secHTML("Submittals Due", todaySubs.map((s) => s.description || "Submittal"), "#6b21a8") + secHTML("High Priority Punch List", openPunch.map((p) => p.description || "Punch item"), "#92400e") + (todayLog.visitors ? '<div class="section"><div class="sec-hdr" style="background:#0e7490">SCHEDULED VISITORS</div><div class="item">' + todayLog.visitors + "</div></div>" : "") + (todayLog.meetings ? '<div class="section"><div class="sec-hdr" style="background:#92400e">MEETINGS TODAY</div><div class="item">' + todayLog.meetings + "</div></div>" : "") + '<div class="footer"><span>KoDox Systems | Superintendent Command Center</span><span>CONFIDENTIAL - Internal Use Only</span></div></body></html>';
        }
        function doPrint() {
          const w = window.open("", "_blank");
          if (!w) {
            alert("Please allow popups to print.");
            return;
          }
          w.document.write(buildPrintHTML());
          w.document.close();
          w.focus();
          setTimeout(() => {
            w.print();
          }, 500);
        }
        function doPDF() {
          setExporting(true);
          try {
            const jsPDF = window.jspdf && window.jspdf.jsPDF;
            if (!jsPDF) {
              alert("PDF library loading. Please wait a moment and try again.");
              setExporting(false);
              return;
            }
            const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
            const pw = doc.internal.pageSize.getWidth();
            const ph = doc.internal.pageSize.getHeight();
            let y = 18;
            const margin = 18;
            const cw = pw - margin * 2;
            const lh = 6;
            const newPage = () => {
              doc.addPage();
              y = 18;
            };
            const chk = () => {
              if (y > ph - 20) newPage();
            };
            doc.setFillColor(15, 26, 46);
            doc.rect(0, 0, pw, 28, "F");
            doc.setTextColor(255, 138, 0);
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.text("KODOX SYSTEMS  |  PLAN OF THE DAY", margin, 10);
            doc.setTextColor(230, 230, 230);
            doc.setFontSize(14);
            doc.text(dl, margin, 20);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 170);
            doc.text("Generated: " + (/* @__PURE__ */ new Date()).toLocaleString(), pw - margin, 20, { align: "right" });
            y = 36;
            const secHdr = (title, rgb) => {
              chk();
              doc.setFillColor(...rgb);
              doc.rect(margin, y, cw, 7, "F");
              doc.setTextColor(255, 255, 255);
              doc.setFontSize(9);
              doc.setFont("helvetica", "bold");
              doc.text(title.toUpperCase(), margin + 3, y + 5);
              y += 10;
            };
            const txt = (t, indent) => {
              chk();
              doc.setTextColor(40, 40, 40);
              doc.setFontSize(9);
              doc.setFont("helvetica", "normal");
              const ls = doc.splitTextToSize((indent ? "  - " : "") + t, cw - (indent ? 4 : 0));
              ls.forEach((l) => {
                chk();
                doc.text(l, margin + (indent ? 4 : 0), y);
                y += lh;
              });
            };
            const kv = (k, v, rgb) => {
              chk();
              doc.setFont("helvetica", "bold");
              doc.setTextColor(80, 80, 80);
              doc.setFontSize(9);
              const kw = doc.getTextWidth(k + ": ");
              doc.text(k + ": ", margin, y);
              doc.setFont("helvetica", "normal");
              if (rgb) doc.setTextColor(...rgb);
              else doc.setTextColor(40, 40, 40);
              doc.text(String(v), margin + kw, y);
              y += lh;
            };
            doc.setFillColor(245, 247, 250);
            doc.setDrawColor(255, 138, 0);
            doc.setLineWidth(0.5);
            doc.roundedRect(margin, y, cw, 30, 2, 2, "FD");
            doc.setTextColor(255, 138, 0);
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.text("MORNING SUMMARY", margin + 4, y + 6);
            doc.setTextColor(40, 40, 40);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            const sl = doc.splitTextToSize(buildScript(), cw - 8);
            sl.slice(0, 3).forEach((l, i) => {
              doc.text(l, margin + 4, y + 12 + i * 6);
            });
            y += 34;
            if (totW > 0) {
              secHdr("Manpower - " + (mp && mp.date === td ? "Today" : "Projected"), [30, 60, 100]);
              kv("Total Workers", totW, [200, 80, 0]);
              kv("Total Man-Hours", totH, [200, 80, 0]);
              if (estCost > 0) kv("Est. Labor Cost", "$" + Math.round(estCost).toLocaleString(), [200, 80, 0]);
              lines.forEach((t) => txt(t.trade + ": " + t.workers + " workers x " + t.hours + "hrs", true));
              y += 2;
            }
            if (todayLA.length > 0) {
              secHdr("6-Week Look-Ahead Starting Today", [30, 90, 160]);
              todayLA.forEach((t) => txt(t.description || t.trade || "Activity", true));
              y += 2;
            }
            const eq = [...todayEquip, ...todayRent];
            if (eq.length > 0) {
              secHdr("Equipment Deliveries", [80, 50, 150]);
              eq.forEach((e) => txt((e.equipment || e.description || "Equipment") + (e.vendor ? " - " + e.vendor : ""), true));
              y += 2;
            }
            if (todayMats.length > 0) {
              secHdr("Material Deliveries", [20, 130, 100]);
              todayMats.forEach((m) => txt(m.material || m.description || "Material", true));
              y += 2;
            }
            const ins = [...todaySI.map((i) => "Safety: " + (i.type || "Inspection")), ...todayQI.map((i) => "Quality: " + (i.type || "Inspection"))];
            if (ins.length > 0) {
              secHdr("Inspections Scheduled", [180, 40, 40]);
              ins.forEach((i) => txt(i, true));
              y += 2;
            }
            if (todayRFIs.length > 0) {
              secHdr("RFIs Due Today", [180, 40, 40]);
              todayRFIs.forEach((r) => txt("RFI " + (r.rfiNumber || r.number || "") + ": " + (r.subject || ""), true));
              y += 2;
            }
            if (todaySubs.length > 0) {
              secHdr("Submittals Due", [100, 40, 160]);
              todaySubs.forEach((s) => txt(s.description || "Submittal", true));
              y += 2;
            }
            if (openPunch.length > 0) {
              secHdr("High Priority Punch List", [180, 120, 20]);
              openPunch.slice(0, 10).forEach((p) => txt(p.description || "Punch item", true));
              y += 2;
            }
            if (todayLog.visitors) {
              secHdr("Scheduled Visitors", [0, 130, 180]);
              txt(todayLog.visitors, false);
              y += 2;
            }
            if (todayLog.meetings) {
              secHdr("Meetings Today", [200, 80, 0]);
              txt(todayLog.meetings, false);
              y += 2;
            }
            const tp = doc.internal.getNumberOfPages();
            for (let i = 1; i <= tp; i++) {
              doc.setPage(i);
              doc.setFillColor(15, 26, 46);
              doc.rect(0, ph - 12, pw, 12, "F");
              doc.setTextColor(100, 100, 120);
              doc.setFontSize(8);
              doc.text("KoDox Systems  |  Superintendent Command Center  |  CONFIDENTIAL", margin, ph - 4);
              doc.text("Page " + i + " of " + tp, pw - margin, ph - 4, { align: "right" });
            }
            doc.save("POD_" + td + ".pdf");
          } catch (e) {
            alert("PDF error: " + e.message);
          }
          setExporting(false);
        }
        const row = (label, items, color, tab2) => items.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", cursor: tab2 ? "pointer" : "default", marginBottom: 6 }, onClick: tab2 ? () => {
          setTab(tab2);
          onClose();
        } : void 0 }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, ...S.text } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { background: color + "22", color, border: "1px solid " + color + "44", borderRadius: 99, padding: "1px 8px", fontSize: 10, fontWeight: 700 } }, items.length), tab2 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, ...S.text3 } }, "tap"))), items.slice(0, 3).map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 11, ...S.text3, padding: "3px 0", borderTop: "1px solid rgba(255,255,255,0.05)" } }, it)), items.length > 3 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color, marginTop: 3 } }, "+", items.length - 3, " more"));
        return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", maxWidth: 600, maxHeight: "92vh", display: "flex", flexDirection: "column", padding: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#0f1a2e,#1a2a40)", padding: "14px 16px", borderBottom: "1px solid rgba(255,138,0,0.3)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#FF8A00", letterSpacing: 3, textTransform: "uppercase" } }, "Plan of the Day"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 800, ...S.text, marginTop: 2 } }, dl)), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { ...S.btnS, padding: "5px 12px", fontSize: 11 } }, "Close")), /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", padding: "12px 12px 20px", flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px 16px", marginBottom: 12, background: darkMode ? "linear-gradient(135deg,#0d1520,#111d2e)" : "linear-gradient(135deg,#f0f4ff,#e8f0ff)", border: "1px solid rgba(255,138,0,0.25)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#FF8A00", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 } }, "Morning Briefing"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, ...S.text, lineHeight: 1.7, marginBottom: 14 } }, greet, ". ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FF8A00" } }, dl), ".", " ", todayWeather ? /* @__PURE__ */ React.createElement("span", null, "Weather: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#0ea5e9" } }, todayWeather, todayTemp ? " \xB7 " + todayTemp : ""), ". ") : null, totW > 0 ? /* @__PURE__ */ React.createElement("span", null, "You have ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FF8A00" } }, totW, " workers"), " on site (", totH, " man-hrs). ") : /* @__PURE__ */ React.createElement("span", null, "No crew sheet yet. "), activeDelays.length > 0 && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#ef4444" } }, activeDelays.length, " active delay", activeDelays.length > 1 ? "s" : ""), " on this project. "), todayEquip.length + todayRent.length > 0 && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#8b5cf6" } }, todayEquip.length + todayRent.length, " equipment"), " deliver", todayEquip.length + todayRent.length === 1 ? "y" : "ies", " expected. "), todayMats.length > 0 && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#10b981" } }, todayMats.length, " material"), " deliver", todayMats.length === 1 ? "y" : "ies", " expected. "), todaySI.length + todayQI.length > 0 && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#ef4444" } }, todaySI.length + todayQI.length, " inspection", todaySI.length + todayQI.length > 1 ? "s" : ""), " scheduled. "), todayRFIs.length > 0 && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#ef4444" } }, todayRFIs.length, " RFI", todayRFIs.length > 1 ? "s" : ""), " due today. "), openPunch.length > 0 && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "#f59e0b" } }, openPunch.length, " high-priority punch"), " item", openPunch.length > 1 ? "s" : "", " open. "), todayLog.meetings && /* @__PURE__ */ React.createElement("span", null, "Meetings: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#0ea5e9" } }, todayLog.meetings), ". "), ydSafety && /* @__PURE__ */ React.createElement("span", null, "Yesterday safety note: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#ef4444" } }, ydSafety), ". "), ydDelays && /* @__PURE__ */ React.createElement("span", null, "Yesterday delay: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#f59e0b" } }, ydDelays), ". "), estCost > 0 && /* @__PURE__ */ React.createElement("span", null, "Est. labor cost: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FF8A00" } }, "$", Math.round(estCost).toLocaleString()), ".")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, !speaking ? /* @__PURE__ */ React.createElement("button", { onClick: speak, style: { ...S.btnP, padding: "9px 14px", fontSize: 12, flex: 1, minWidth: 120 } }, speechDone ? "Play Again" : "Listen") : /* @__PURE__ */ React.createElement("button", { onClick: stopSpeak, style: { ...S.btnP, padding: "9px 14px", fontSize: 12, flex: 1, minWidth: 120, background: "#7f1d1d" } }, "Stop"), /* @__PURE__ */ React.createElement("button", { onClick: doPrint, style: { ...S.btnS, padding: "9px 14px", fontSize: 12, flex: 1, minWidth: 80 } }, "Print"), /* @__PURE__ */ React.createElement("button", { onClick: doPDF, disabled: exporting, style: { ...S.btnS, padding: "9px 14px", fontSize: 12, flex: 1, minWidth: 100 } }, exporting ? "Saving..." : "Save PDF")), speaking && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#FF8A00", marginTop: 8, textAlign: "center" } }, "Reading briefing...")), mp ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, cursor: "pointer" }, onClick: () => {
          setTab("manpower");
          onClose();
        } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, ...S.text } }, "Manpower ", mp.date === td ? "Today" : "(Projected)"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, ...S.text3 } }, "tap to view")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr" + (estCost > 0 ? " 1fr" : ""), gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(255,138,0,0.1)", borderRadius: 6, padding: "6px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Workers"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 900, color: "#FF8A00" } }, totW)), /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(255,138,0,0.1)", borderRadius: 6, padding: "6px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Man-Hours"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 900, color: "#FF8A00" } }, totH)), estCost > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(255,138,0,0.1)", borderRadius: 6, padding: "6px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, ...S.text3, letterSpacing: 1, textTransform: "uppercase" } }, "Est. Cost"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: "#FF8A00" } }, "$", Math.round(estCost).toLocaleString()))), lines.map((t, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", fontSize: 11, padding: "3px 0", borderTop: "1px solid rgba(255,255,255,0.05)", ...S.text } }, /* @__PURE__ */ React.createElement("span", null, t.trade), /* @__PURE__ */ React.createElement("span", { style: { color: "#FF8A00", fontWeight: 700 } }, t.workers, " x ", t.hours, "hrs")))) : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, fontSize: 11, ...S.text3 } }, "No crew sheet yet. Add in Manpower Report."), row("6-Week Look-Ahead Starting Today", todayLA.map((t) => t.description || t.trade || "Activity"), "#3b82f6", "lookahead"), row("Equipment Deliveries Today", [...todayEquip, ...todayRent].map((e) => e.equipment || e.description || "Equipment"), "#8b5cf6", "equipment"), row("Material Deliveries Today", todayMats.map((m) => m.material || m.description || "Material"), "#10b981", "materials"), row("Inspections Scheduled", [...todaySI.map((i) => "Safety: " + (i.type || "Inspection")), ...todayQI.map((i) => "Quality: " + (i.type || "Inspection"))], "#ef4444", "safetyinsp"), row("RFIs Due Today", todayRFIs.map((r) => "RFI " + (r.rfiNumber || r.number || "") + ": " + (r.subject || "")), "#ef4444", "rfis"), row("Submittals Due Today", todaySubs.map((s) => s.description || "Submittal"), "#8b5cf6", "submittals"), row("High Priority Punch List", openPunch.map((p) => p.description || "Punch item"), "#f59e0b", "punchlist"), row("Overdue Action Items", openActions.map((a) => a.description || "Action item"), "#ef4444", "actionitems"), todayWeather && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, borderLeft: "3px solid #0ea5e9" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, "\u{1F324} Weather Today"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, todayWeather, todayTemp ? " \xB7 " + todayTemp : "", todayLog.humidity ? " \xB7 Humidity: " + todayLog.humidity : "", todayLog.windSpeed ? " \xB7 Wind: " + todayLog.windSpeed : "")), activeDelays.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, borderLeft: "3px solid #ef4444" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, cursor: "pointer" }, onClick: () => {
          setTab("delays");
          onClose();
        } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, ...S.text } }, "\u23F0 Active Delays"), /* @__PURE__ */ React.createElement("span", { style: { background: "#ef444422", color: "#ef4444", border: "1px solid #ef444444", borderRadius: 99, padding: "1px 8px", fontSize: 10, fontWeight: 700 } }, activeDelays.length)), activeDelays.slice(0, 3).map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 11, ...S.text3, padding: "3px 0", borderTop: "1px solid rgba(255,255,255,0.05)" } }, d.delayType || "Delay", d.daysLost ? " \xB7 " + d.daysLost + " day" + (d.daysLost > 1 ? "s" : "") + " lost" : "", d.description ? " \xB7 " + d.description : "")), activeDelays.length > 3 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#ef4444", marginTop: 3 } }, "+", activeDelays.length - 3, " more")), ydSafety && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, borderLeft: "3px solid #ef4444" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, "\u26A0 Safety Note from Yesterday"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, ydSafety)), ydDelays && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, borderLeft: "3px solid #f59e0b" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, "\u{1F4CB} Scope / Delay from Yesterday"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, ydDelays)), todayLog.visitors && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, borderLeft: "3px solid #06b6d4" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, "\u{1F465} Scheduled Visitors / Site Walks"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, todayLog.visitors)), todayLog.meetings && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px 12px", marginBottom: 8, borderLeft: "3px solid #FF8A00" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, ...S.text, marginBottom: 4 } }, "\u{1F4C5} Meetings Today"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, ...S.text3 } }, todayLog.meetings)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setTab("dashboard");
          onClose();
        }, style: { ...S.btnP, flex: 1 } }, "Dashboard"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
          setTab("dailylogs");
          onClose();
        }, style: { ...S.btnS, flex: 1 } }, "Daily Log")))));
      }
      var root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(React.createElement(App));
    }
  });
  require_kodox_source();
})();
