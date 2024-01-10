# DTU Event Tracking Application (Client)

## Description

The main point of the "DTU Event Tracking Application" project lies in providing a convenient and effective solution to address the problems and limitations in promoting student participation in extracurricular activities and student programs. This project will:
- Be a mobile app, running on the Android or iOS platform. It is built using [React native](https://reactnative.dev).
- The software is designed for users who are students, student union members and club leaders. It is built using [ReactJS](https://react.dev).

## Installation

- Clone the repository

```bash
git clone https://github.com/lopk11223399/DTUTrackingEvent.git
```

- Run `npm install` in the client_web(webstite) directory

```bash
cd client_web
npm install
```

- Run `npm install` in the DTUTrackingEve_ver2.0(mobile) directory

```bash
cd DTUTrackingEve_ver2.0
npm install
```

## Usage

- Run the website in development mode
1. Open folder `client_web/src/axios.js`
2. Change baseURL: `'http://localhost:3000/api/v1'` of server and save file `axios.js`
3. Run the website

```bash
cd client_web
npm run dev
```

- Run the application for mobile in development mode
1. Open folder `DTUTrackingEve_ver2.0/src/axios.js`
2. Change by IPv4 baseURL: `'http://192.168.23.240:3000/api/v1'` of server and save file `axios.js` ([How to get ipv4 address](https://www.avg.com/en/signal/find-ip-address))
3. Mobile device, download `Expo`
4. Run the application for mobile

```bash
cd DTUTrackingEve_ver2.0
npm start
```

5. open QR scan in the device, scan to run the application on the phone

## Authors (C1SE29)

- [Phan Nhat Hoang](https://github.com/lopk11223399)
- [Nguyen Trung Hieu](https://github.com/heloqua1103)
- [Nguyen Nhu Ngoc](https://github.com/Nocnocday)
- [Nguyen Dinh Loi](https://github.com/loinguyen45)
