import { useEffect } from "react";
import { API_BASE } from "../config";

export default function ChartPage() {
  useEffect(() => {
    let googleLoaded = false;
    let chartData = null;

    function tryDraw() {
      if (googleLoaded && chartData) {
        drawChart(chartData);
      }
    }

    // Load Google Charts script dynamically (only once)
    if (!window.google || !window.google.charts) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => {
        window.google.charts.load("current", { packages: ["corechart"] });
        window.google.charts.setOnLoadCallback(() => {
          googleLoaded = true;
          tryDraw();
        });
      };
      document.body.appendChild(script);
    } else {
      // already loaded
      window.google.charts.load("current", { packages: ["corechart"] });
      window.google.charts.setOnLoadCallback(() => {
        googleLoaded = true;
        tryDraw();
      });
    }

    // Fetch chart data from your backend
    fetch(`${API_BASE}/getChartData.php`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          chartData = json.data;
          tryDraw();
        } else {
          console.error("Chart API error:", json);
        }
      })
      .catch((err) => {
        console.error("Failed to load chart data", err);
      });

    function drawChart(rows) {
      // rows = [{ shoe_size: 38, count: 12 }, ...]
      const dataArray = [
        ["Shoe Size", "Number of users"],
        ...rows.map((r) => [r.shoe_size.toString(), r.count]),
      ];

      const data = window.google.visualization.arrayToDataTable(dataArray);

      const options = {
        title: "Shoe Size Frequency",
        backgroundColor: "transparent",
        legend: { position: "bottom", textStyle: { color: "#EEEEEE" } },
        titleTextStyle: { color: "#EEEEEE", fontSize: 18 },
        hAxis: {
          title: "Shoe size (EU)",
          textStyle: { color: "#EEEEEE" },
          titleTextStyle: { color: "#EEEEEE" },
        },
        vAxis: {
          title: "Number of users",
          textStyle: { color: "#EEEEEE" },
          titleTextStyle: { color: "#EEEEEE" },
          minValue: 0,
        },
      };

      const chart = new window.google.visualization.ColumnChart(
        document.getElementById("chart_div")
      );

      chart.draw(data, options);
    }
  }, []);

  return (
    <div className="page">
      <div className="home-content" style={{ maxWidth: "700px", width: "100%" }}>
        <h1>Shoe Size Frequency</h1>
        <p>
          This bar chart shows the shoe size (EU sizes) of each user in the database.
        </p>
        <div
          id="chart_div"
          style={{
            width: "100%",
            height: "400px",
            marginTop: "1.5rem",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "20px",
            padding: "1rem",
          }}
        ></div>
      </div>
    </div>
  );
}