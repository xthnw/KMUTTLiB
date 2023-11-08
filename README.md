![Logo](https://cdn.discordapp.com/attachments/881006618911858728/1171510399594659880/Asset_2_1.png?ex=655cf114&is=654a7c14&hm=06600ce82f7fe5691db1d6a124af10b820e37c5804280749bd1d003923e2ae80&)


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

![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171509283179995247/iphone15pro.png?ex=655cf00a&is=654a7b0a&hm=36c1cc1c315111b6de6bae8eaf3ccfea7bb7c47e06bcd9aa7552a63f361b09d5&)
![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171509283704287322/iphone15pro-1.png?ex=655cf00a&is=654a7b0a&hm=28ae65892531b0f3baa2ebf51aa11b8b0cdf3e0cc7f2413828c74e3b249e4088&)
![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171509284408934400/iphone15pro-2.png?ex=655cf00a&is=654a7b0a&hm=b59d8cdda238c61de57c0864595a9004aed0a789348aa7d852109a3492e8a488&)
![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171509285042266292/iphone15pro-3.png?ex=655cf00b&is=654a7b0b&hm=e624034418ef98e95b197cf96c12a784ce9c0784551346d3cd9151d188362b79&)
![App Screenshot](https://cdn.discordapp.com/attachments/881006618911858728/1171509286006951947/iphone15pro-4.png?ex=655cf00b&is=654a7b0b&hm=fab2a5763504dc97ab83bee75ef0b405584ee8a2d476cc5975cd975a967be489&)



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

