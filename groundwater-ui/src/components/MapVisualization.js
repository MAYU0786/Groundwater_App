"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Box, Typography, Paper, useTheme } from "@mui/material"
import L from "leaflet"

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Component to set the view of the map
function SetViewOnLoad({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

// Generate sample data points for the heatmap
const generateSamplePoints = (center, count = 20) => {
  const points = []
  for (let i = 0; i < count; i++) {
    // Random offset from center
    const latOffset = (Math.random() - 0.5) * 0.2
    const lngOffset = (Math.random() - 0.5) * 0.2

    // Random groundwater level (deeper in some areas)
    const level = 10 - Math.sqrt(Math.pow(latOffset, 2) + Math.pow(lngOffset, 2)) * 50 + (Math.random() - 0.5) * 2

    points.push({
      position: [center[0] + latOffset, center[1] + lngOffset],
      level: level,
    })
  }
  return points
}

const MapVisualization = () => {
  const theme = useTheme()
  const [position, setPosition] = useState([40.7128, -74.006]) // Default to New York
  const [dataPoints, setDataPoints] = useState([])
  const [selectedPoint, setSelectedPoint] = useState(null)

  useEffect(() => {
    // Generate sample data points when the component mounts
    setDataPoints(generateSamplePoints(position))
  }, [position])

  // Function to get color based on groundwater level
  const getColor = (level) => {
    if (level > 12) return "#1a237e" // Very high - dark blue
    if (level > 10) return "#303f9f" // High - blue
    if (level > 8) return "#7986cb" // Medium-high - light blue
    if (level > 6) return "#81c784" // Medium - light green
    if (level > 4) return "#fff176" // Medium-low - yellow
    if (level > 2) return "#ffb74d" // Low - orange
    return "#e57373" // Very low - red
  }

  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={12}
        style={{ height: "100%", width: "100%", borderRadius: theme.shape.borderRadius }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Main marker for the selected location */}
        <Marker position={position}>
          <Popup>
            Selected location <br /> Groundwater level: 10m
          </Popup>
        </Marker>

        {/* Data points with color coding */}
        {dataPoints.map((point, index) => (
          <CircleMarker
            key={index}
            center={point.position}
            radius={8}
            pathOptions={{
              fillColor: getColor(point.level),
              color: "white",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8,
            }}
            eventHandlers={{
              click: () => {
                setSelectedPoint(point)
              },
            }}
          >
            <Popup>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Groundwater Level: {point.level.toFixed(1)}m
              </Typography>
            </Popup>
          </CircleMarker>
        ))}

        <SetViewOnLoad center={position} zoom={12} />
      </MapContainer>

      {/* Legend */}
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          zIndex: 1000,
          p: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", mb: 0.5 }}>
          Groundwater Level
        </Typography>
        {[
          { level: ">12m", color: "#1a237e" },
          { level: "10-12m", color: "#303f9f" },
          { level: "8-10m", color: "#7986cb" },
          { level: "6-8m", color: "#81c784" },
          { level: "4-6m", color: "#fff176" },
          { level: "2-4m", color: "#ffb74d" },
          { level: "<2m", color: "#e57373" },
        ].map((item, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <Typography variant="caption">{item.level}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  )
}

export default MapVisualization;

