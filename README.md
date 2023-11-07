
![Logo](https://cdn.discordapp.com/attachments/881006618911858728/1171491780047413360/LogoApp.png?ex=655cdfbd&is=654a6abd&hm=16f6eb6ef6a047865656f23cdeefbdd477e9e4e6504221ae86354a6a305fa1b4&)


# KMUTTLiB

Library reservation application of King Mongkut's University of Technology Thonburi (Developing and submitting app proposals)
- iOS
- Android (Minimum version required Android 10)


## Features

- Live previews
- Fullscreen mode
- Cross platform
- Guest mode

## Functional Requirements

- Making a reservation
- Viewing the status of all rooms
- Cancellation of reservation
- Verification of room using GPS location
- Refreshing


## Screenshots

![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171506208109240350/iphone15pro.png?ex=655ced2d&is=654a782d&hm=206ce74b84d210017ce426863f07979d0a72826a067e297cd42684e9d346d6ed&)
![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171506285510918254/iphone15pro.png?ex=655ced40&is=654a7840&hm=ae00623b704f3161100ee3f172dcb79176691c9b50fd16fd33933270e3703f9b&)
![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171506289243857057/iphone15pro-1.png?ex=655ced40&is=654a7840&hm=c2d0c86de23dc25f6d1fd0abaadaddf401980e440d7eee43c6427e53abeb89be&)
![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171506296403525775/iphone15pro-3.png?ex=655ced42&is=654a7842&hm=3a92fae50e6aecec15b277da85b8aa12eb11266836fee1a6906d551034b673ac&)



## Installation & Run Locally

Clone the project

```bash
  git clone https://github.com/stalemoon/LibraryReservationApp
```

Go to the project directory

```bash
  cd LibraryReservationApp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npx expo start
```




## Deployment using Node Server API


Clone this project

```bash
  git clone https://github.com/Dustae/KMRoomProject/tree/node-server
```

Go to the project directory

```bash
  cd KMRoomProject-node-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Download Expo Go in AppStore or PlayStore

![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171501244439855155/IMG_1523.png?ex=655ce88e&is=654a738e&hm=c35c469f484644aba61a572ced4b7bb3aa2cc6a03fff3a481bcaab8fdea22171&)

Open Application
- iOS (Camera to scan QR code)
- Android (Scan QR code above with Expo Go)
## Authors

- [@stalemoon](https://github.com/stalemoon)

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Red | ![#0a192f](https://via.placeholder.com/10/fe4914?text=+) #fe4914 |
| Orange | ![#ff8a00](https://via.placeholder.com/10/ff8a00?text=+) #f8f8f8 |
| Yellow | ![#ff9f24](https://via.placeholder.com/10/ff9f24?text=+) #ff9f24 |
| Gray | ![#666666](https://via.placeholder.com/10/666666?text=+) #666666 |
| Green | ![#32ba7c](https://via.placeholder.com/10/32ba7c?text=+) #32ba7c |


## API Reference 

#### Reserve Room

```http
  POST /api/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Booking_Description` | `string` | Your Description |
| `Booking_Status` | `string` | Reserved (Auto) |
| `Booking_date` | `string` | DD/MM/YYYY (A.D.)|
| `Booking_period` | `string` | HH:MM - HH:MM (24 hrs format)|
| `Booking_for` | `string` | Course code ID, example: CPE334 |
| `Room_ID` | `string` | KM3 (Auto) |
| `User_Email` | `string` | user@kmutt.ac.th (Auto) |
| `User_1` | `string` | Student name |
| `User_2` | `string` | Student name |
| `User_3` | `string` | Student name |
| `User_4` | `string` | Student name |
| `User_5` | `string` | Student name |
| `User_6` | `string` | Student name |




## Documentation for more API using and example

[Documentation - How to use API 101](https://docs.google.com/document/d/1dC5JWV9HT-HIpCAzfBsqHsgxLx_gNk3i8VClYncfTZA/)


## Tech Stack

**Client:** React, React-Native, Expo, 

**Server:** Node.js, Axios


## Support

For support, email thanawan.sutt@kmutt.ac.th

