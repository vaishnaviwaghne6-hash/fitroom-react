# Fitroom – AI Dress Recommendation Simulation (React + Vite)

## Run
```
npm install
npm run dev        # http://localhost:5173  (camera works on localhost)
npm run build      # production build in /dist
```

## Structure
```
src/
  main.jsx              entry
  App.jsx               steps, state, search, recommendation engine
  data.js               dress catalog, sizes, materials, climate/occasion tables
  utils.js              fabric analysis (colour, texture, sheen from video frames)
  draw.js               canvas drawing: garments, models, mirror room
  components/
    Capture.jsx         camera record / fabric upload + analysis
    TryOn.jsx           dummy model, mirror room, camera or photo try-on
    Thumb.jsx           rendered dress thumbnails
  styles.css
```

## Flow
1. Select dress (Female / Male model, search any dress)
2. Size S / M / L / XL (or estimate from height and weight)
3. Material
4. Capture fabric: record 6 s with camera, or upload a fabric photo
5. Try-on: dummy model in mirror room, your camera, or your own photo

## Notes
- Models and dresses are drawn with canvas code (semi-realistic, not photographs).
- Auto-align uses the browser FaceDetector API (Chrome only); otherwise align manually.
- Scores and size estimates are for demonstration.
