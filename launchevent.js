/*
 * Radiant Care Health – company email signature add-on for Outlook.
 * Adds the company signature as soon as someone starts a new email, reply or forward,
 * so it sits directly under what they type.
 *
 * ======================== STAFF LIST ========================
 * To add or change someone, copy one line and edit it.
 * email   = their work email (any capitals are fine)
 * name    = shown in bold
 * title   = shown under the name (leave "" to hide)
 * mobile  = shown after "M" (leave "" to hide the mobile)
 */
var STAFF = [
  { email: "arsany@radiantcarehealth.com.au",    name: "Arsany Shehata",  title: "Director",                   mobile: "0401 642 897" },
  { email: "stephanie@radiantcarehealth.com.au", name: "Stephanie Kilta", title: "Principal Physiotherapist",  mobile: "0422 538 055" },
  { email: "mau@radiantcarehealth.com.au",       name: "Mau Imo",         title: "Physiotherapist",            mobile: "0481 579 248" },
  { email: "saba@radiantcarehealth.com.au",      name: "Saba Shafiq",     title: "Physiotherapist",            mobile: "0424 393 220" },
  { email: "mahia@radiantcarehealth.com.au",     name: "Mahia Mahia",     title: "Physiotherapist",            mobile: "" },
  { email: "admin@radiantcarehealth.com.au",     name: "",                title: "Admin Team",                 mobile: "" }
];

/* ======================== CHRISTMAS ========================
 * The Christmas logo is used from 1 December to 6 January every year (automatic, no yearly change needed).
 */
var CHRISTMAS_START = { month: 12, day: 1 };  // 1 December
var CHRISTMAS_END   = { month: 1,  day: 6 };  // 6 January (inclusive)

/* ======================== COMPANY DETAILS ======================== */
var COMPANY = {
  phone: "9001 8584",
  logo: "https://radiantcarehealth.com.au/wp-content/uploads/2024/02/Radiant-Care-Health-Logo-1536x431.png",
  logoWidth: 170,
  christmasLogo: "https://radiantcarehealth.com.au/wp-content/uploads/2026/10/rch-email-signature-christmas.jpg",
  christmasLogoWidth: 230,
  booking: "https://radiantcarehealth.splose.com/online-booking/db0ad05f-8aee-4342-8527-50892ce3f154",
  website: "https://www.radiantcarehealth.com.au",
  instagram: "https://www.instagram.com/radiantcarehealth",
  facebook: "https://www.facebook.com/profile.php?id=61567372168467",
  domain: "radiantcarehealth.com.au"
};

/* ===================== (no need to edit below) ===================== */

function rchEscape(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function rchIsChristmas(date) {
  var m = date.getMonth() + 1, d = date.getDate();
  var afterStart = (m > CHRISTMAS_START.month) || (m === CHRISTMAS_START.month && d >= CHRISTMAS_START.day);
  var beforeEnd = (m < CHRISTMAS_END.month) || (m === CHRISTMAS_END.month && d <= CHRISTMAS_END.day);
  // The season crosses New Year, so either side counts.
  return afterStart || beforeEnd;
}

function rchFindPerson(email, fallbackName) {
  var e = String(email || "").toLowerCase();
  for (var i = 0; i < STAFF.length; i++) {
    if (STAFF[i].email.toLowerCase() === e) return STAFF[i];
  }
  // Not in the list yet: still give them the signature with their Outlook name, no title/mobile.
  return { email: email, name: fallbackName || "", title: "", mobile: "" };
}

function rchBuildSignature(person, date) {
  var xmas = rchIsChristmas(date || new Date());
  var logo = xmas ? COMPANY.christmasLogo : COMPANY.logo;
  var logoW = xmas ? COMPANY.christmasLogoWidth : COMPANY.logoWidth;
  var email = rchEscape(String(person.email || "").toLowerCase());
  // Outline buttons are built as table cells (Outlook copies borders on links onto extra boxes).
  var cell = "border:1px solid #2B4A6F;border-radius:4px;padding:4px 10px;";
  var link = "color:#2B4A6F;font-family:Segoe UI,Arial,sans-serif;font-size:9pt;font-weight:600;text-decoration:none;";
  var gap = '<td style="width:6px;font-size:1px;line-height:1px;">&nbsp;</td>';
  function btn(url, label) { return '<td style="' + cell + '"><a href="' + url + '" style="' + link + '">' + label + "</a></td>"; }

  var top = "Kind regards,<br><br>";
  if (person.name) top += '<b style="font-size:12pt;">' + rchEscape(person.name) + "</b>";
  if (person.name && person.title) top += "<br>";
  if (person.title) top += '<span style="color:#2B4A6F;">' + rchEscape(person.title) + "</span>";

  var phones = '<b style="color:#2B4A6F;">P</b> ' + rchEscape(COMPANY.phone);
  if (person.mobile) phones += ' &nbsp;|&nbsp; <b style="color:#2B4A6F;">M</b> ' + rchEscape(person.mobile);

  return '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Segoe UI,Arial,sans-serif;font-size:10pt;color:#222222;line-height:1.45;">' +
    '<tr><td style="padding-top:12px;">' + top + "</td></tr>" +
    '<tr><td style="padding:8px 0;border-bottom:2px solid #F5A623;"><img src="' + logo + '" width="' + logoW + '" alt="Radiant Care Health" style="display:block;border:0;"></td></tr>' +
    '<tr><td style="padding-top:8px;font-size:9.5pt;">' + phones + "<br>" +
    '<a href="mailto:' + email + '" style="color:#222222;text-decoration:underline;">' + email + "</a><br>" +
    '<a href="https://maps.google.com/?q=136%20Schotters%20Rd%2C%20Mernda%20VIC%203754" style="color:#555555;text-decoration:none;"><b style="color:#2B4A6F;">Mernda</b> <span style="color:#555555;">136 Schotters Rd</span></a><br>' +
    '<a href="https://maps.google.com/?q=224A%20Broadway%2C%20Reservoir%20VIC%203073" style="color:#555555;text-decoration:none;"><b style="color:#2B4A6F;">Reservoir</b> <span style="color:#555555;">224A Broadway</span></a>' +
    '<table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;"><tr><td style="background:#F5A623;border-radius:4px;padding:5px 12px;">' +
    '<a href="' + COMPANY.booking + '" style="color:#ffffff;font-family:Segoe UI,Arial,sans-serif;font-size:9pt;font-weight:bold;text-decoration:none;">Book an appointment</a></td></tr></table>' +
    '<table cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;"><tr>' +
    btn(COMPANY.website, "Website") + gap + btn(COMPANY.instagram, "Instagram") + gap + btn(COMPANY.facebook, "Facebook") +
    "</tr></table></td></tr>" +
    '<tr><td style="padding-top:10px;font-size:7.5pt;color:#888888;line-height:1.35;"><i>This e-mail message and accompanying data may contain information that is confidential and subject to privilege. If you are not the intended recipient, you are notified that any use, dissemination, distribution or copying of this message or data is prohibited. If you have received this e-mail in error please notify us immediately and delete all material pertaining to this e-mail.</i></td></tr></table>';
}

// Works out which address the email is being sent from (handles admin@ and other shared addresses).
function rchGetSender(item, callback) {
  var profile = Office.context.mailbox.userProfile || {};
  var fallback = { email: profile.emailAddress, name: profile.displayName };
  try {
    if (item && item.from && typeof item.from.getAsync === "function") {
      item.from.getAsync(function (res) {
        if (res.status === Office.AsyncResultStatus.Succeeded && res.value && res.value.emailAddress) {
          callback({ email: res.value.emailAddress, name: res.value.displayName || fallback.name });
        } else {
          callback(fallback);
        }
      });
      return;
    }
  } catch (e) { /* fall through */ }
  callback(fallback);
}

function rchApplySignature(event) {
  var item = Office.context.mailbox.item;
  var done = function () { try { event.completed(); } catch (e) {} };
  rchGetSender(item, function (sender) {
    // Only add the signature for company addresses.
    if (!sender.email || String(sender.email).toLowerCase().indexOf("@" + COMPANY.domain) === -1) { done(); return; }
    var html = rchBuildSignature(rchFindPerson(sender.email, sender.name), new Date());
    item.body.setSignatureAsync(html, { coercionType: Office.CoercionType.Html }, function () {
      // Stop Outlook also adding the person's own saved signature (prevents doubles).
      if (typeof item.disableClientSignatureAsync === "function") {
        item.disableClientSignatureAsync(function () { done(); });
      } else {
        done();
      }
    });
  });
}

function onNewMessageComposeHandler(event) { rchApplySignature(event); }
function onMessageFromChangedHandler(event) { rchApplySignature(event); }

// Tell Office the add-on has loaded (needed in Outlook on the web and the phone app).
if (typeof Office !== "undefined" && typeof Office.onReady === "function") { Office.onReady(); }

// Connect the functions to the events named in the manifest.
if (typeof Office !== "undefined" && Office.actions && typeof Office.actions.associate === "function") {
  Office.actions.associate("onNewMessageComposeHandler", onNewMessageComposeHandler);
  Office.actions.associate("onMessageFromChangedHandler", onMessageFromChangedHandler);
}

// Allows local testing outside Outlook.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { rchBuildSignature: rchBuildSignature, rchIsChristmas: rchIsChristmas, rchFindPerson: rchFindPerson,
    onNewMessageComposeHandler: onNewMessageComposeHandler, STAFF: STAFF };
}
