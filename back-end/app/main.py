from fastapi import FastAPI, WebSocket
from fastapi.responses import JSONResponse
import asyncio
import random
from datetime import datetime
import json

app = FastAPI()

# Load robot data from the JSON file
with open('fake_robot_data.json', 'r') as file:
    robots = json.load(file)

@app.get("/robots")
def get_robots():
    """REST endpoint to fetch the robot data."""
    return JSONResponse(content=robots)

@app.websocket("/ws/robots")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates."""
    await websocket.accept()
    while True:
        for robot in robots:
            # Randomly update robot status and metrics
            robot["Online/Offline"] = random.choice([True, False])
            robot["Battery Percentage"] = max(0, random.randint(robot["Battery Percentage"] - 5, robot["Battery Percentage"] + 5))
            robot["CPU Usage"] = random.randint(1, 100)
            robot["RAM Consumption"] = random.randint(1, 10000)
            robot["Last Updated"] = datetime.utcnow().isoformat()
            robot["Location Coordinates"] = [
                random.uniform(-90, 90),
                random.uniform(-180, 180)
            ]
        await websocket.send_json(robots)
        await asyncio.sleep(5)
