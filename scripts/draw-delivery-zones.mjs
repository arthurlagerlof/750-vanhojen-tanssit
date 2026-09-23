import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(
  __dirname,
  "delivery-zones.generated.json",
);

const PORT = 3456;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Delivery Zone Editor</title>

  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />

  <style>
    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      height: 100%;
      font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    body {
      display: flex;
      flex-direction: column;
      background: #071b35;
    }

    #toolbar {
      z-index: 1000;
      padding: 14px 18px;
      color: white;
      background: #071b35;
      border-bottom: 1px solid rgba(255,255,255,.15);
    }

    #toolbar h1 {
      margin: 0 0 5px;
      font-size: 18px;
    }

    #toolbar p {
      margin: 0 0 12px;
      color: #aeb9c6;
      font-size: 13px;
      line-height: 1.5;
    }

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    button {
      border: 0;
      border-radius: 999px;
      padding: 9px 15px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
    }

    button:hover {
      filter: brightness(1.08);
    }

    button.active {
      outline: 3px solid rgba(214,182,106,.45);
    }

    #keskusta {
      background: #d6b66a;
      color: #071b35;
    }

    #lahialue {
      background: #542d2c;
      color: white;
    }

    #seutu {
      background: #718096;
      color: white;
    }

    #finish {
      background: #f6f1e7;
      color: #071b35;
    }

    #undo {
      background: white;
      color: #071b35;
    }

    #deletePolygon {
      background: #9f3b3b;
      color: white;
    }

    #clearZone {
      background: #6b2525;
      color: white;
    }

    #save {
      background: #d6b66a;
      color: #071b35;
    }

    #status {
      margin-top: 10px;
      font-size: 13px;
      color: #d6b66a;
    }

    #counts {
      margin-top: 5px;
      color: #8290a0;
      font-size: 12px;
    }

    #map {
      flex: 1;
      min-height: 0;
    }

    .leaflet-container {
      background: #d9e2e8;
    }
  </style>
</head>

<body>
  <div id="toolbar">
    <h1>Delivery zone editor</h1>

    <p>
      Select a zone and draw one or more polygons.
      Each polygon is independent, so separate areas such as
      Turku centre, Kaarina centre or Hirvensalo can be drawn
      separately.
    </p>

    <div class="buttons">
      <button id="keskusta">
        1 · Keskusta
      </button>

      <button id="lahialue">
        2 · Lähialue
      </button>

      <button id="seutu">
        3 · Seutu
      </button>

      <button id="finish">
        Finish polygon
      </button>

      <button id="undo">
        Undo point
      </button>

      <button id="deletePolygon">
        Delete last polygon
      </button>

      <button id="clearZone">
        Clear zone
      </button>

      <button id="save">
        Save coordinates
      </button>
    </div>

    <div id="status">
      Select a zone to begin.
    </div>

    <div id="counts"></div>
  </div>

  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <script>
    const map = L.map("map").setView(
      [60.43, 22.32],
      11
    );

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(map);

    const zones = {
      keskusta: {
        name: "Keskusta",
        color: "#d6b66a",
        polygons: [],
        currentPoints: [],
        layerGroup: L.layerGroup().addTo(map),
      },

      lahialue: {
        name: "Lähialue",
        color: "#542d2c",
        polygons: [],
        currentPoints: [],
        layerGroup: L.layerGroup().addTo(map),
      },

      seutu: {
        name: "Seutu",
        color: "#718096",
        polygons: [],
        currentPoints: [],
        layerGroup: L.layerGroup().addTo(map),
      },
    };

    let activeZone = null;

    const buttons = {
      keskusta: document.getElementById("keskusta"),
      lahialue: document.getElementById("lahialue"),
      seutu: document.getElementById("seutu"),
    };

    const status = document.getElementById("status");
    const counts = document.getElementById("counts");

    function selectZone(zoneId) {
      activeZone = zoneId;

      Object.values(buttons).forEach((button) => {
        button.classList.remove("active");
      });

      buttons[zoneId].classList.add("active");

      status.textContent =
        "Selected: " +
        zones[zoneId].name +
        ". Click the map to start a polygon.";

      updateCounts();
    }

    buttons.keskusta.onclick = () =>
      selectZone("keskusta");

    buttons.lahialue.onclick = () =>
      selectZone("lahialue");

    buttons.seutu.onclick = () =>
      selectZone("seutu");

    function updateCounts() {
      if (!activeZone) {
        counts.textContent = "";
        return;
      }

      const zone = zones[activeZone];

      counts.textContent =
        zone.name +
        ": " +
        zone.polygons.length +
        " finished polygon(s), " +
        zone.currentPoints.length +
        " point(s) in current polygon.";
    }

    function redrawZone(zoneId) {
      const zone = zones[zoneId];

      zone.layerGroup.clearLayers();

      zone.polygons.forEach((polygon) => {
        L.polygon(
          polygon,
          {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.28,
            weight: 3,
          }
        ).addTo(zone.layerGroup);
      });

      if (zone.currentPoints.length > 0) {
        zone.currentPoints.forEach(
          (point, index) => {
            L.circleMarker(
              point,
              {
                radius: index === 0 ? 7 : 4,
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 1,
                weight: 2,
              }
            ).addTo(zone.layerGroup);
          }
        );

        if (zone.currentPoints.length >= 2) {
          L.polyline(
            zone.currentPoints,
            {
              color: zone.color,
              weight: 2,
              dashArray: "6 6",
            }
          ).addTo(zone.layerGroup);
        }
      }

      updateCounts();
    }

    function finishPolygon() {
      if (!activeZone) {
        status.textContent =
          "Select a zone first.";
        return;
      }

      const zone = zones[activeZone];

      if (zone.currentPoints.length < 3) {
        status.textContent =
          "A polygon needs at least 3 points.";
        return;
      }

      zone.polygons.push([
        ...zone.currentPoints,
      ]);

      zone.currentPoints = [];

      redrawZone(activeZone);

      status.textContent =
        zone.name +
        ": polygon finished. You can start another one.";
    }

    document
      .getElementById("finish")
      .addEventListener(
        "click",
        finishPolygon,
      );

    document
      .getElementById("undo")
      .addEventListener(
        "click",
        () => {
          if (!activeZone) return;

          const zone = zones[activeZone];

          if (zone.currentPoints.length === 0) {
            status.textContent =
              "There are no points to undo.";
            return;
          }

          zone.currentPoints.pop();

          redrawZone(activeZone);

          status.textContent =
            "Last point removed.";
        }
      );

    document
      .getElementById("deletePolygon")
      .addEventListener(
        "click",
        () => {
          if (!activeZone) return;

          const zone = zones[activeZone];

          if (zone.currentPoints.length > 0) {
            zone.currentPoints = [];

            redrawZone(activeZone);

            status.textContent =
              "Current unfinished polygon cleared.";

            return;
          }

          if (zone.polygons.length === 0) {
            status.textContent =
              "There are no polygons to delete.";
            return;
          }

          zone.polygons.pop();

          redrawZone(activeZone);

          status.textContent =
            "Last finished polygon deleted.";
        }
      );

    document
      .getElementById("clearZone")
      .addEventListener(
        "click",
        () => {
          if (!activeZone) return;

          const zone = zones[activeZone];

          zone.polygons = [];
          zone.currentPoints = [];

          redrawZone(activeZone);

          status.textContent =
            zone.name +
            " cleared completely.";
        }
      );

    map.on("click", (event) => {
      if (!activeZone) {
        status.textContent =
          "Select Keskusta, Lähialue or Seutu first.";
        return;
      }

      const zone = zones[activeZone];

      zone.currentPoints.push([
        event.latlng.lat,
        event.latlng.lng,
      ]);

      redrawZone(activeZone);

      status.textContent =
        zone.name +
        ": point added. Continue drawing or click Finish polygon.";
    });

    document
      .getElementById("save")
      .addEventListener(
        "click",
        async () => {
          const output = {
            version: 2,
            coordinateSystem: "WGS84",

            zones: Object.fromEntries(
              Object.entries(zones).map(
                ([id, zone]) => [
                  id,
                  {
                    name: zone.name,
                    polygons: zone.polygons,
                  },
                ]
              )
            ),
          };

          try {
            const response = await fetch(
              "/save",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(output),
              }
            );

            const result =
              await response.json();

            if (!response.ok) {
              throw new Error(
                result.error ||
                "Save failed."
              );
            }

            status.textContent =
              "Saved successfully to " +
              result.path;
          } catch (error) {
            status.textContent =
              "Save failed: " +
              error.message;
          }
        }
      );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "1") {
          selectZone("keskusta");
        }

        if (event.key === "2") {
          selectZone("lahialue");
        }

        if (event.key === "3") {
          selectZone("seutu");
        }

        if (
          event.key === "Backspace" ||
          event.key === "z"
        ) {
          document
            .getElementById("undo")
            .click();
        }

        if (event.key === "Enter") {
          finishPolygon();
        }
      }
    );

    selectZone("keskusta");
  </script>
</body>
</html>`;

const server = http.createServer(
  (request, response) => {
    if (
      request.method === "GET" &&
      request.url === "/"
    ) {
      response.writeHead(200, {
        "Content-Type":
          "text/html; charset=utf-8",
      });

      response.end(html);
      return;
    }

    if (
      request.method === "POST" &&
      request.url === "/save"
    ) {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
      });

      request.on("end", () => {
        try {
          const parsed = JSON.parse(body);

          fs.writeFileSync(
            outputPath,
            JSON.stringify(
              parsed,
              null,
              2,
            ),
            "utf8",
          );

          response.writeHead(200, {
            "Content-Type":
              "application/json; charset=utf-8",
          });

          response.end(
            JSON.stringify({
              success: true,
              path: outputPath,
            }),
          );
        } catch (error) {
          response.writeHead(400, {
            "Content-Type":
              "application/json; charset=utf-8",
          });

          response.end(
            JSON.stringify({
              success: false,
              error: error.message,
            }),
          );
        }
      });

      return;
    }

    response.writeHead(404);
    response.end("Not found");
  },
);

server.listen(PORT, () => {
  console.log("");
  console.log(
    "Delivery zone editor running at:",
  );
  console.log(
    "http://localhost:" + PORT,
  );
  console.log("");
  console.log(
    "Output will be saved to:",
  );
  console.log(outputPath);
  console.log("");
});