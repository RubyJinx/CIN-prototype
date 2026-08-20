const events = [
  {
    id: "grip",
    title: "Grip, Clip, Climb",
    host: "Climbing Club",
    date: "August 18, 2026",
    dateShort: "Aug 18, 2026",
    day: 18,
    time: "10:00 AM - 4:00 PM",
    timeShort: "10:00 AM",
    location: "CWU Recreation Center",
    category: "recreation",
    timeOfDay: "morning",
    description: "Grip, Clip, Climb is a climbing event where students can participate, meet other students, and connect with the Climbing Club.",
    accessibility: "Prototype example: Contact the hosting organization for accommodation information.",
    submitted: false
  },
  {
    id: "welcome",
    title: "Wildcat Welcome Social",
    host: "Campus Activities",
    date: "August 20, 2026",
    dateShort: "Aug 20, 2026",
    day: 20,
    time: "5:00 PM - 7:00 PM",
    timeShort: "5:00 PM",
    location: "SURC Ballroom",
    category: "social",
    timeOfDay: "evening",
    description: "Meet other Wildcats, learn about campus activities, and connect with student organizations at a casual welcome event.",
    accessibility: "",
    submitted: false
  },
  {
    id: "career",
    title: "Student Career Meetup",
    host: "Career Services",
    date: "August 21, 2026",
    dateShort: "Aug 21, 2026",
    day: 21,
    time: "2:00 PM - 4:00 PM",
    timeShort: "2:00 PM",
    location: "Samuelson 104",
    category: "career",
    timeOfDay: "afternoon",
    description: "A casual networking event for students who want to learn about internships, campus jobs, and career resources.",
    accessibility: "",
    submitted: false
  }
];

const organizations = [
  {
    id: "climbing",
    name: "Climbing Club",
    category: "recreation",
    categoryLabel: "Sports & Recreation",
    description: "The Climbing Club connects CWU students who are interested in climbing, outdoor recreation, skill-building, and meeting other students.",
    meeting: "Tuesdays • 6:00 PM • SURC 137",
    contact: "climbingclub@example.edu",
    featuredEvent: "grip"
  },
  {
    id: "gaming",
    name: "CWU Gaming Club",
    category: "recreation",
    categoryLabel: "Recreation",
    description: "A student community for casual and competitive gaming, tabletop nights, and social events.",
    meeting: "Thursdays • 7:00 PM • SURC 201",
    contact: "gamingclub@example.edu",
    featuredEvent: null
  },
  {
    id: "ai",
    name: "AI & Emerging Tech Club",
    category: "academic",
    categoryLabel: "Academic",
    description: "Students exploring artificial intelligence, emerging technologies, projects, and career pathways.",
    meeting: "Wednesdays • 5:30 PM • Samuelson 116",
    contact: "aitech@example.edu",
    featuredEvent: null
  },
  {
    id: "arts",
    name: "Wildcat Arts Collective",
    category: "arts",
    categoryLabel: "Arts & Culture",
    description: "A creative student organization for art, design, performance, and collaborative campus projects.",
    meeting: "Mondays • 4:00 PM • Randall Hall",
    contact: "artscollective@example.edu",
    featuredEvent: null
  }
];

let currentEventId = "grip";
let currentOrgId = "climbing";
let latestSubmittedEventId = null;

const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".bottom-nav button");

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));

  navButtons.forEach(btn => {
    const tab = btn.dataset.tab;
    const activeTab =
      id === "event-detail" || id === "calendar" || id === "submit-event" || id === "event-submitted" ? "events" :
      id === "organization-detail" || id === "interest" ? "organizations" :
      id;
    btn.classList.toggle("active", tab === activeTab);
  });

  closeDrawer();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDrawer() {
  const drawer = document.getElementById("drawer");
  const scrim = document.getElementById("drawerScrim");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  document.getElementById("menuBtn").setAttribute("aria-expanded", "true");
}

function closeDrawer() {
  const drawer = document.getElementById("drawer");
  const scrim = document.getElementById("drawerScrim");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
  document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
}

document.getElementById("menuBtn").addEventListener("click", openDrawer);
document.getElementById("closeMenuBtn").addEventListener("click", closeDrawer);
document.getElementById("drawerScrim").addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

document.addEventListener("click", (event) => {
  const goTrigger = event.target.closest("[data-go]");
  if (goTrigger) {
    showScreen(goTrigger.dataset.go);
    return;
  }

  const eventTrigger = event.target.closest("[data-event]");
  if (eventTrigger) {
    openEvent(eventTrigger.dataset.event);
    return;
  }

  const orgTrigger = event.target.closest("[data-org]");
  if (orgTrigger) {
    openOrganization(orgTrigger.dataset.org);
  }
});

function openEvent(id) {
  currentEventId = id;
  const item = events.find(event => event.id === id);
  if (!item) return;

  document.getElementById("eventDetailTitle").textContent = item.title;
  const hostOrg = organizations.find(
    org => org.name.toLowerCase() === item.host.toLowerCase()
  );
  const hostMarkup = hostOrg
    ? `<button class="inline-link" data-org="${hostOrg.id}" aria-label="View ${item.host} organization page">${item.host}</button>`
    : item.host;

  document.getElementById("eventDetailCard").innerHTML = `
    <strong>Hosted by: ${hostMarkup}</strong>
    <div>${item.date}</div>
    <div>${item.time}</div>
    <div>${item.location}</div>

    <h3>About This Event:</h3>
    <p>${item.description}</p>

    ${item.accessibility ? `<h3>Accessibility / Accommodations:</h3><p>${item.accessibility}</p>` : ""}
    ${item.flyerName ? `<h3>Event Flyer:</h3><p>${item.flyerName} <em>(prototype filename only)</em></p>` : ""}
    ${item.submitted ? `<p><strong>Prototype-submitted event:</strong> This event was added during the current browser session.</p>` : ""}
  `;
  document.getElementById("statusMessage").textContent = "";
  showScreen("event-detail");
}

function openOrganization(id) {
  currentOrgId = id;
  const org = organizations.find(item => item.id === id);
  if (!org) return;

  const featured = events.find(event => event.id === org.featuredEvent);

  document.getElementById("orgDetailTitle").textContent = org.name;
  document.getElementById("orgDetailCard").innerHTML = `
    <strong>${org.categoryLabel}</strong>

    <h3>About This Organization:</h3>
    <p>${org.description}</p>

    <h3>Meeting Information:</h3>
    <p>${org.meeting}</p>

    <h3>Contact:</h3>
    <p>${org.contact}</p>

    ${
      featured
        ? `<h3>Upcoming Event:</h3>
           <p><strong>${featured.title}</strong><br />${featured.dateShort} • ${featured.timeShort}</p>
           <button class="mini-btn" data-event="${featured.id}">View Event →</button>`
        : ""
    }
  `;
  showScreen("organization-detail");
}

function renderEvents(list = events) {
  const container = document.getElementById("eventList");
  const empty = document.getElementById("eventEmpty");

  container.innerHTML = list.map(item => `
    <article class="event-card">
      <strong>${item.title}</strong>
      <div class="card-meta">${item.host}</div>
      <div class="card-meta">${item.dateShort} • ${item.timeShort}</div>
      <div class="card-meta">${item.location}</div>
      ${item.submitted ? `<div class="card-meta"><em>Prototype-submitted event</em></div>` : ""}
      <button class="mini-btn" data-event="${item.id}">View Event →</button>
    </article>
  `).join("");

  empty.hidden = list.length !== 0;
}

function getFilteredEvents() {
  const search = document.getElementById("eventSearch").value.trim().toLowerCase();
  const categories = [...document.querySelectorAll(".category-filter:checked")].map(el => el.value);
  const times = [...document.querySelectorAll(".time-filter:checked")].map(el => el.value);
  const date = document.querySelector('input[name="dateFilter"]:checked').value;

  return events.filter(item => {
    const haystack = `${item.title} ${item.host} ${item.location}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    const matchesCategory = categories.length === 0 || categories.includes(item.category);
    const matchesTime = times.length === 0 || times.includes(item.timeOfDay);

    let matchesDate = true;
    if (date === "today") matchesDate = item.day === 18;
    if (date === "week") matchesDate = item.day >= 18 && item.day <= 24;
    if (date === "month") matchesDate = true;

    return matchesSearch && matchesCategory && matchesTime && matchesDate;
  });
}

document.getElementById("eventSearch").addEventListener("input", () => renderEvents(getFilteredEvents()));

document.getElementById("filtersBtn").addEventListener("click", () => {
  const panel = document.getElementById("filtersPanel");
  const isOpen = !panel.hidden;
  panel.hidden = isOpen;
  document.getElementById("filtersBtn").setAttribute("aria-expanded", String(!isOpen));
});

document.getElementById("applyFiltersBtn").addEventListener("click", () => {
  renderEvents(getFilteredEvents());
  document.getElementById("filtersPanel").hidden = true;
  document.getElementById("filtersBtn").setAttribute("aria-expanded", "false");
});

document.getElementById("clearFiltersBtn").addEventListener("click", () => {
  document.querySelectorAll(".category-filter, .time-filter").forEach(el => el.checked = false);
  document.querySelector('input[name="dateFilter"][value="all"]').checked = true;
  renderEvents();
});

function renderOrganizations(list = organizations) {
  const container = document.getElementById("orgList");
  const empty = document.getElementById("orgEmpty");

  container.innerHTML = list.map(org => `
    <article class="org-card">
      <strong>${org.name}</strong>
      <div class="card-meta">${org.categoryLabel}</div>
      <p>${org.description}</p>
      <button class="mini-btn" data-org="${org.id}">View Organization →</button>
    </article>
  `).join("");

  empty.hidden = list.length !== 0;
}

function getFilteredOrganizations() {
  const search = document.getElementById("orgSearch").value.trim().toLowerCase();
  const categories = [...document.querySelectorAll(".org-category-filter:checked")].map(el => el.value);

  return organizations.filter(org => {
    const haystack = `${org.name} ${org.categoryLabel} ${org.description}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    const matchesCategory = categories.length === 0 || categories.includes(org.category);
    return matchesSearch && matchesCategory;
  });
}

document.getElementById("orgSearch").addEventListener("input", () => renderOrganizations(getFilteredOrganizations()));

document.getElementById("orgFiltersBtn").addEventListener("click", () => {
  const panel = document.getElementById("orgFiltersPanel");
  const isOpen = !panel.hidden;
  panel.hidden = isOpen;
  document.getElementById("orgFiltersBtn").setAttribute("aria-expanded", String(!isOpen));
});

document.getElementById("applyOrgFiltersBtn").addEventListener("click", () => {
  renderOrganizations(getFilteredOrganizations());
  document.getElementById("orgFiltersPanel").hidden = true;
  document.getElementById("orgFiltersBtn").setAttribute("aria-expanded", "false");
});

document.getElementById("clearOrgFiltersBtn").addEventListener("click", () => {
  document.querySelectorAll(".org-category-filter").forEach(el => el.checked = false);
  renderOrganizations();
});

document.getElementById("rsvpBtn").addEventListener("click", () => {
  const event = events.find(item => item.id === currentEventId);
  document.getElementById("statusMessage").textContent =
    `RSVP recorded for ${event.title} in prototype testing.`;
});

document.getElementById("calendarBtn").addEventListener("click", () => {
  const event = events.find(item => item.id === currentEventId);
  document.getElementById("statusMessage").textContent =
    `${event.title} was added to the prototype calendar.`;
});

document.getElementById("interestBtn").addEventListener("click", () => showScreen("interest"));

document.getElementById("interestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const org = organizations.find(item => item.id === currentOrgId);
  document.getElementById("interestFormStatus").textContent =
    `✓ Your interest in ${org.name} has been recorded for prototype testing.`;
  e.target.reset();
});

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDay = 6;

  let html = weekdays.map(day => `<div class="weekday">${day}</div>`).join("");
  for (let i = 0; i < startDay; i++) html += `<div></div>`;

  for (let day = 1; day <= 31; day++) {
    const hasEvent = events.some(item => item.day === day);
    html += `
      <button class="calendar-day ${hasEvent ? "has-event" : ""}" data-calendar-day="${day}">
        ${day}
      </button>
    `;
  }

  grid.innerHTML = html;
}

document.getElementById("calendarGrid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-calendar-day]");
  if (!btn) return;

  document.querySelectorAll(".calendar-day").forEach(day => day.classList.remove("selected"));
  btn.classList.add("selected");

  const day = Number(btn.dataset.calendarDay);
  const dayEvents = events.filter(item => item.day === day);
  const details = document.getElementById("calendarDayDetails");

  if (dayEvents.length === 0) {
    details.innerHTML = `<strong>August ${day}</strong><p>No CIN events are listed for this day.</p>`;
    return;
  }

  details.innerHTML = `
    <strong>August ${day}</strong>
    ${dayEvents.map(item => `
      <p>
        <strong>${item.title}</strong><br />
        ${item.timeShort}<br />
        ${item.location}<br />
        <button class="mini-btn" data-event="${item.id}">View Event →</button>
      </p>
    `).join("")}
  `;
});

document.getElementById("globalSearchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = document.getElementById("globalSearch").value.trim();
  const query = raw.toLowerCase();

  const matchedEvents = events.filter(item =>
    `${item.title} ${item.host} ${item.location} ${item.description}`.toLowerCase().includes(query)
  );

  const matchedOrgs = organizations.filter(org =>
    `${org.name} ${org.categoryLabel} ${org.description}`.toLowerCase().includes(query)
  );

  const results = document.getElementById("globalResults");
  document.getElementById("searchSummary").textContent =
    query ? `Results for “${raw}”` : "Showing all results";

  results.innerHTML = `
    <h2 class="result-group-title">Events</h2>
    ${matchedEvents.length
      ? matchedEvents.map(item => `
          <article class="event-card">
            <strong>${item.title}</strong>
            <div>${item.dateShort} • ${item.timeShort}</div>
            <div>${item.location}</div>
            <button class="mini-btn" data-event="${item.id}">View Event →</button>
          </article>
        `).join("")
      : "<p>No matching events.</p>"
    }

    <h2 class="result-group-title">Organizations</h2>
    ${matchedOrgs.length
      ? matchedOrgs.map(org => `
          <article class="org-card">
            <strong>${org.name}</strong>
            <div>${org.categoryLabel}</div>
            <button class="mini-btn" data-org="${org.id}">View Organization →</button>
          </article>
        `).join("")
      : "<p>No matching organizations.</p>"
    }
  `;

  showScreen("search-results");
});

function inferTimeOfDay(time24) {
  const hour = Number(time24.split(":")[0]);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function formatTime(time24) {
  const [h, m] = time24.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

function formatDate(dateValue) {
  const date = new Date(`${dateValue}T12:00:00`);
  return {
    long: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    short: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    day: date.getDate()
  };
}

document.getElementById("submitEventForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const dateInfo = formatDate(form.eventDate.value);
  const startFormatted = formatTime(form.startTime.value);
  const endFormatted = form.endTime.value ? formatTime(form.endTime.value) : "";
  const category = form.eventCategory.value;
  const flyerFile = form.eventFlyer.files && form.eventFlyer.files[0]
    ? form.eventFlyer.files[0]
    : null;
  const id = `submitted-${Date.now()}`;

  const newEvent = {
    id,
    title: form.eventName.value.trim(),
    host: form.hostingOrganization.value.trim(),
    date: dateInfo.long,
    dateShort: dateInfo.short,
    day: dateInfo.day,
    time: endFormatted ? `${startFormatted} - ${endFormatted}` : startFormatted,
    timeShort: startFormatted,
    location: form.eventLocation.value.trim(),
    category,
    timeOfDay: inferTimeOfDay(form.startTime.value),
    description: form.eventDescription.value.trim(),
    accessibility: form.accessibilityInfo.value.trim(),
    flyerName: flyerFile ? flyerFile.name : "",
    contactEmail: form.contactEmail.value.trim(),
    submitted: true
  };

  events.push(newEvent);
  latestSubmittedEventId = id;

  renderEvents();
  renderCalendar();

  document.getElementById("submittedEventSummary").innerHTML = `
    <strong>${newEvent.title}</strong>
    <div>${newEvent.host}</div>
    <div>${newEvent.dateShort} • ${newEvent.timeShort}</div>
    <div>${newEvent.location}</div>
    ${newEvent.flyerName ? `<div><strong>Flyer selected:</strong> ${newEvent.flyerName}</div>` : ""}
  `;

  form.reset();
  showScreen("event-submitted");
});

document.getElementById("viewSubmittedEventBtn").addEventListener("click", () => {
  if (!latestSubmittedEventId) return showScreen("events");
  openEvent(latestSubmittedEventId);
});

document.getElementById("submitAnotherBtn").addEventListener("click", () => {
  showScreen("submit-event");
});

renderEvents();
renderOrganizations();
renderCalendar();
showScreen("home");
